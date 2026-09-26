import type { Project } from '../types';
import { FONTS } from '../types';
import { scanCharset } from '../fonts/charset';
import { subsetFont } from '../fonts/u8g2font';

/** u8g2_menu 按键枚举值（与 u8g2_menu.h 对应） */
export enum MenuKey {
  None = 0, Up = 1, Down = 2, Enter = 3, Return = 4, Add = 5, Sub = 6,
}

/** 每页条目值池槽位上限，须与 wasm/editor_shim.c 的 EM_MAX_ITEMS 保持一致 */
export const EM_MAX_ITEMS = 64;

export const MENU_KEY_NAMES: Record<number, string> = {
  [MenuKey.Up]: '上', [MenuKey.Down]: '下', [MenuKey.Enter]: '确认',
  [MenuKey.Return]: '返回', [MenuKey.Add]: '加', [MenuKey.Sub]: '减',
};

interface PreviewModule {
  ccall: (ident: string, ret: string | null, argTypes: string[], args: unknown[]) => unknown;
  HEAPU8: Uint8Array;
  _em_frame: (ms: number) => number;
  _em_get_ipool: (slot: number) => number;
  _em_get_upool: (slot: number) => number;
  _em_get_current_page: () => number;
  _em_scratch: (len: number) => number;
  _em_item_bits: (p: number, i: number, ptr: number, len: number) => void;
  _em_font_count_export: () => number;
  _em_font_name: (i: number) => number; // returns char* offset
  _em_get_fpool: (slot: number, out: number) => number;
  _em_get_dpool: (slot: number, out: number) => number;
  UTF8ToString: (ptr: number) => string;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;
  setValue: (ptr: number, value: number, type: string) => void;
}

export interface PreviewEvents {
  /** 预览内发生了子页面跳转（同步左侧树高亮） */
  onPageChanged?: (page: number) => void;
  /** 预览内按钮条目被触发 */
  onButton?: (buttonId: number) => void;
}

const FB_BYTES = 128 * 64 / 8;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`预览引擎脚本加载失败: ${src}`));
    document.head.appendChild(s);
  });
}

export class WasmPreview {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mod: PreviewModule | null = null;
  private img: ImageData | null = null;
  private raf = 0;
  private lastT = 0;
  private running = false;
  private fontIndexCache = new Map<string, number>();
  private structSig = '';
  private fontSig: string | null = null;
  private events: PreviewEvents;
  private lastKnownPage = 0;
  /** 预览侧子集字体未能应用时的提示（生成代码时并入警告）；null = 应用正常或未开启取模 */
  fontApplyWarning: string | null = null;

  constructor(container: HTMLElement, events: PreviewEvents = {}) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 128;
    this.canvas.height = 64;
    this.canvas.className = 'ume-preview-canvas';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.events = events;
  }

  /** 加载 WASM 引擎（幂等） */
  async load(wasmUrl: string): Promise<void> {
    if (this.mod) return;
    const w = window as unknown as Record<string, unknown>;
    if (!w.U8G2MenuPreview) await loadScript(wasmUrl);
    const factory = w.U8G2MenuPreview as (cfg: object) => Promise<PreviewModule>;
    if (!factory) throw new Error('U8G2MenuPreview 未找到（检查 wasmUrl）');
    this.mod = await factory({
      locateFile: (p: string) => wasmUrl.replace(/[^/\\]*$/, '') + p,
    });
    this.mod.ccall('em_init', null, ['number', 'number'], [128, 64]);
    // 构建字体名 -> 索引 映射（不依赖编译顺序）
    const n = this.mod._em_font_count_export();
    for (let i = 0; i < n; i++) {
      const ptr = this.mod._em_font_name(i);
      this.fontIndexCache.set(this.mod.UTF8ToString(ptr), i);
    }
    this.start();
  }

  get ready(): boolean {
    return !!this.mod;
  }

  /** 预览当前所在页（用户在预览里跳转子页面后由此得知） */
  get currentPage(): number {
    return this.lastKnownPage;
  }

  fontIndex(name: string): number {
    return this.fontIndexCache.get(name) ?? 0;
  }

  /** 结构签名：只有页面/条目结构或资源尺寸变化才重置资源池（保留预览中的编辑值） */
  private signature(p: Project): string {
    return JSON.stringify({
      bufs: (p.chartBuffers ?? []).map((b) => `${b.name}|${b.dataLen}|${b.sample}`),
      pages: p.pages.map((pg) => ({
        n: pg.items.length,
        k: pg.items.map((it) => it.kind).join(','),
        res: pg.items.map((it) => {
          if (it.kind === 'chart') return (it.sources ?? []).map((s) => `${s.bufferId}|${s.chartKind}|${s.min ?? 'a'}|${s.max ?? 'a'}`).join('>');
          if (it.kind === 'xbm') return `${it.w}x${it.h}`;
          if (it.kind === 'textarea') return Math.ceil(it.content.length / 64);
          return '';
        }).join(','),
      })),
    });
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(project: Project): void {
    const mod = this.mod;
    if (!mod) return;
    const sig = this.signature(project);
    if (sig !== this.structSig) {
      mod.ccall("em_reset_dynamic", null, [], []);
      this.structSig = sig;
    }

    const intT = (v: number) => Math.trunc(Number.isFinite(v) ? v : 0);
    const VT = { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 };
    const KIND = { text: 0, slider: 1, progress: 2, chart: 3, xbm: 4, textarea: 5, board: 6 };
    const BIND = { none: 0, value: 1, switch: 2, button: 3, submenu: 4, back: 5 };
    const SAMPLE = { sine: 0, ramp: 1, noise: 2, none: 3 };
    const varSlot = (vid: string | null | undefined): number =>
      vid ? (project.variables ?? []).findIndex((v) => v.id === vid) : -1;

    // 变量定义（值池槽位 = 变量下标，多绑定共享）
    (project.variables ?? []).forEach((v, vi) => {
      mod.ccall("em_var_define", null, ["number", "number", "number", "number", "number", "number"],
        [vi, VT[v.type], intT(v.initialValue), intT(v.step), intT(v.min), intT(v.max)]);
    });

    // 数据源缓冲区定义（在页面条目之前）
    (project.chartBuffers ?? []).forEach((b, bi) => {
      mod.ccall("em_buf_define", null, ["number", "number", "number"],
        [bi, intT(b.dataLen), SAMPLE[b.sample]]);
    });

    project.pages.forEach((pg, pi) => {
      mod.ccall("em_page_begin", null, ["number"], [pi]);
      pg.items.forEach((it, ii) => {
        const setBind = () => {
          const b = it.bind;
          if (b.type === "none") return;
          const isVar = b.type === "value" || b.type === "switch";
          const v = isVar ? (project.variables ?? []).find((x) => x.id === (b as { varId: string | null }).varId) : undefined;
          mod.ccall("em_page_bind", null, ["number", "number", "number", "number", "number", "number", "number", "number"],
            [pi, ii, BIND[b.type],
              isVar && v ? VT[v.type] : 0,
              b.type === "switch" ? intT(b.openValue) : 0,
              b.type === "button" ? intT(b.buttonId) : 0,
              b.type === "submenu" ? project.pages.findIndex((p) => p.id === b.targetPageId) : -1,
              isVar && v ? varSlot(v.id) : -1]);
        };
        switch (it.kind) {
          case "text":
            mod.ccall("em_page_item", null, ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [pi, ii, KIND.text, it.scale, 0, 0, 0,
                it.displayVarId ? varSlot(it.displayVarId) : -1, -1]);
            mod.ccall("em_item_text", null, ["number", "number", "string"], [pi, ii, it.text]);
            setBind();
            break;
          case "slider":
          case "progress":
            mod.ccall("em_page_item", null, ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [pi, ii, KIND[it.kind], 1, 0, 0, 0, -1, -1]);
            setBind();
            break;
          case "chart":
            mod.ccall("em_page_item", null, ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [pi, ii, KIND.chart, 1, intT(it.height), 0, 0, -1, -1]);
            for (const s of it.sources ?? []) {
              mod.ccall("em_item_chart_add", null,
                ["number", "number", "number", "number", "number", "number", "number"],
                [pi, ii, (project.chartBuffers ?? []).findIndex((b) => b.id === s.bufferId),
                  { line: 0, point: 1, bar: 2 }[s.chartKind],
                  s.min !== undefined && s.max !== undefined ? 1 : 0,
                  s.max ?? 0, s.min ?? 0]);
            }
            setBind();
            break;
          case "xbm":
            mod.ccall("em_page_item", null, ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [pi, ii, KIND.xbm, 1, 0, intT(it.w), intT(it.h), -1, -1]);
            {
              const ptr = mod._em_scratch(it.bits.length);
              if (ptr) {
                mod.HEAPU8.set(new Uint8Array(it.bits), ptr);
                mod._em_item_bits(pi, ii, ptr, it.bits.length);
              }
            }
            setBind();
            break;
          case "textarea":
            mod.ccall("em_page_item", null, ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [pi, ii, KIND.textarea, 1, intT(it.height), 0, 0, -1, -1]);
            mod.ccall("em_item_text", null, ["number", "number", "string"], [pi, ii, it.content]);
            setBind();
            break;
          case "board":
            mod.ccall("em_page_item", null, ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [pi, ii, KIND.board, 1, 0, intT(it.w), intT(it.h), -1, -1]);
            setBind();
            break;
        }
      });
      mod.ccall("em_page_end", null, ["number", "number"], [pi, pg.items.length]);
    });
    mod.ccall("em_pages_commit", null, ["number"], [project.pages.length]);

    // 样式
    mod.ccall("em_set_style", null,
      ["number", "number", "number", "number", "number", "number", "number"],
      [this.fontIndex(project.font),
        { default: 0, rotundity: 1, square: 2 }[project.selector],
        intT(project.selectorLeftMargin), intT(project.selectorTopMargin),
        intT(project.selectorLineSpacing), project.marqueeSpeed, project.marqueeHeaderLen]);

    // 中文字体现场取模：子集字体覆盖内置字体（在 set_style 之后）
    if (project.fontSubset) {
      const charset = scanCharset(project, project.fontExtra);
      const sig = project.font + '|' + [...charset].sort((a, b) => a - b).join(',');
      if (sig !== this.fontSig) {
        this.fontSig = sig;
        this.applyFontSubset(this.fontIndex(project.font), charset);
      }
    } else if (this.fontSig !== null) {
      this.fontSig = null; // 关闭取模：下次 sync 由 set_style 恢复内置字体
      this.fontApplyWarning = null;
    }
  }

  /** 应用子集字体到预览引擎；失败时记录 fontApplyWarning（供生成代码时并入警告） */
  private applyFontSubset(fontIdx: number, charset: Set<number>): void {
    this.fontApplyWarning = null;
    const srcFont = this.getFontBytes(fontIdx);
    const fetcher = this.glyphFetcher(fontIdx);
    const sub = srcFont && fetcher ? subsetFont(srcFont, charset, fetcher) : null;
    if (!sub) {
      this.fontApplyWarning = '现场取模未命中任何字形，预览使用内置字体';
      return;
    }
    if (!this.useCustomFont(sub.font)) {
      this.fontApplyWarning = `子集字体 ${sub.font.length} 字节超过预览槽位容量，预览已回退全字库（导出的 menu_font 数组不受影响）`;
    }
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastT = performance.now();
    const loop = (t: number) => {
      if (!this.running) return;
      const ms = Math.min(100, Math.round(t - this.lastT));
      this.lastT = t;
      this.renderFrame(ms);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private renderFrame(ms: number): void {
    const mod = this.mod;
    if (!mod) return;
    const ptr = mod._em_frame(ms) as number;
    if (!ptr) return;
    if (!this.img) this.img = this.ctx.createImageData(128, 64);
    const fb = mod.HEAPU8.subarray(ptr, ptr + FB_BYTES);
    const px = this.img.data;
    px.fill(255); // RGB=白, A=255
    for (let y = 0; y < 64; y++) {
      const row = (y >> 3) * 128;
      const bit = 1 << (y & 7);
      let off = y * 128 * 4;
      for (let x = 0; x < 128; x++) {
        if (fb[row + x] & bit) {
          px[off] = 17; px[off + 1] = 24; px[off + 2] = 39; // 点亮像素 = 深墨色
        }
        off += 4;
      }
    }
    this.ctx.putImageData(this.img, 0, 0);

    // 页面跳转同步
    const page = mod._em_get_current_page();
    if (page !== this.lastKnownPage) {
      this.lastKnownPage = page;
      this.events.onPageChanged?.(page);
    }
  }

  key(k: MenuKey): void {
    this.mod?.ccall('em_key', null, ['number'], [k]);
  }

  /** 预览跳转到指定页（不经过子页面链路） */
  navTo(pageIdx: number): void {
    this.mod?.ccall('em_nav', null, ['number'], [pageIdx]);
  }

  /** 读取内置字体原始字节（现场取模的源数据） */
  getFontBytes(idx: number): Uint8Array | null {
    const mod = this.mod;
    if (!mod) return null;
    const ptr = mod.ccall('em_font_data', 'number', ['number'], [idx]) as number;
    const len = mod.ccall('em_font_data_len', 'number', ['number'], [idx]) as number;
    if (!ptr || !len) return null;
    return mod.HEAPU8.slice(ptr, ptr + len);
  }

  /** 字形拉取器：从 WASM 真库逐字获取原始条目（与渲染同一路径） */
  glyphFetcher(fontIdx: number): ((encoding: number) => Uint8Array | null) | null {
    const mod = this.mod;
    if (!mod) return null;
    return (encoding: number): Uint8Array | null => {
      const ptr = mod.ccall('em_scratch', 'number', ['number'], [64]) as number;
      const len = mod.ccall('em_font_glyph', 'number',
        ['number', 'number', 'number', 'number'], [fontIdx, encoding, 64, ptr]) as number;
      if (!len) return null;
      return mod.HEAPU8.slice(ptr, ptr + len);
    };
  }

  /** 加载自定义（子集）字体并切换；超出槽位容量返回 false */
  useCustomFont(bytes: Uint8Array): boolean {
    const mod = this.mod;
    if (!mod) return false;
    const ptr = mod.ccall('em_custom_font_ptr', 'number', [], []) as number;
    const max = mod.ccall('em_custom_font_max', 'number', [], []) as number;
    if (bytes.length > max) return false;
    mod.HEAPU8.set(bytes, ptr);
    mod.ccall('em_set_custom_font', null, ['number'], [bytes.length]);
    return true;
  }

  /** 读取值池槽位的实时值（绑定变量的条目：槽位 = 变量在池中的下标） */
  getInt(slot: number): number {
    return this.mod?._em_get_ipool(slot) ?? 0;
  }

  getSwitch(slot: number): number {
    return this.mod?._em_get_upool(slot) ?? 0;
  }

  destroy(): void {
    this.stop();
    this.canvas.remove();
    this.mod = null;
  }
}

export { FONTS };
