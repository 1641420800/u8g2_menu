import type { Project } from '../types';
import { FONTS } from '../types';

/** u8g2_menu 按键枚举值（与 u8g2_menu.h 对应） */
export enum MenuKey {
  None = 0, Up = 1, Down = 2, Enter = 3, Return = 4, Add = 5, Sub = 6,
}

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
  private events: PreviewEvents;
  private lastKnownPage = 0;

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
    return JSON.stringify(p.pages.map((pg) => ({
      n: pg.items.length,
      k: pg.items.map((it) => it.kind).join(','),
      res: pg.items.map((it) => {
        if (it.kind === 'chart') return `${it.dataLen}|${it.sample}`;
        if (it.kind === 'xbm') return `${it.w}x${it.h}`;
        if (it.kind === 'textarea') return Math.ceil(it.content.length / 64);
        return '';
      }).join(','),
    })));
  }

  /** 全量同步编辑器模型到预览引擎 */
  sync(project: Project): void {
    const mod = this.mod;
    if (!mod) return;
    const sig = this.signature(project);
    if (sig !== this.structSig) {
      mod.ccall('em_reset_dynamic', null, [], []);
      this.structSig = sig;
    }

    const intT = (v: number) => Math.trunc(Number.isFinite(v) ? v : 0);
    project.pages.forEach((pg, pi) => {
      mod.ccall('em_page_begin', null, ['number'], [pi]);
      pg.items.forEach((it, ii) => {
        const slotBase = ['number', 'number'];
        switch (it.kind) {
          case 'text':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 0, 0, it.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]);
            mod.ccall('em_item_text', null, ['number', 'number', 'string'], [pi, ii, it.text]);
            break;
          case 'number': {
            const vt = { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }[it.varType];
            const sample = it.varType === 'float' || it.varType === 'double'
              ? Math.round(it.initialValue) : intT(it.initialValue);
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 1, vt, it.scale, 0, 0, 0, 0, 0, sample, intT(it.step), intT(it.min), intT(it.max), -1, 0, 0, 0, 0, 0]);
            mod.ccall('em_item_text', null, ['number', 'number', 'string'], [pi, ii, it.text]);
            break;
          }
          case 'switch':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 2, 0, it.scale, 0, 0, intT(it.openValue), 0, 0, intT(it.initialValue), 0, 0, 0, -1, 0, 0, 0, 0, 0]);
            mod.ccall('em_item_text', null, ['number', 'number', 'string'], [pi, ii, it.text]);
            mod.ccall('em_item_swtext', null, ['number', 'number', 'string', 'string'],
              [pi, ii, it.onText, it.offText]);
            break;
          case 'button':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 3, 0, it.scale, 0, 0, 0, intT(it.buttonId), 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]);
            mod.ccall('em_item_text', null, ['number', 'number', 'string'], [pi, ii, it.text]);
            break;
          case 'submenu': {
            const target = project.pages.findIndex((p) => p.id === it.targetPageId);
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 4, 0, it.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, target, 0, 0, 0, 0, 0]);
            mod.ccall('em_item_text', null, ['number', 'number', 'string'], [pi, ii, it.text]);
            break;
          }
          case 'back':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 5, 0, it.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]);
            mod.ccall('em_item_text', null, ['number', 'number', 'string'], [pi, ii, it.text]);
            break;
          case 'slider':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 6, 0, 1, 0, 0, 0, 0, 0, intT(it.initialValue), intT(it.step), intT(it.min), intT(it.max), -1, 0, 0, 0, 0, 0]);
            break;
          case 'progress':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 7, 0, 1, 0, 0, 0, 0, 0, intT(it.initialValue), intT(it.step), intT(it.min), intT(it.max), -1, 0, 0, 0, 0, 0]);
            break;
          case 'chart': {
            const sample = { sine: 0, ramp: 1, noise: 2 }[it.sample];
            const fixed = it.min !== undefined && it.max !== undefined ? 1 : 0;
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 8, 0, 1, { line: 0, point: 1, bar: 2 }[it.chartKind], 0, 0, 0, fixed,
                sample, 0, fixed ? intT(it.min!) : 0, fixed ? intT(it.max!) : 0, -1, 0, 0,
                intT(it.height), intT(it.dataLen), 0]);
            break;
          }
          case 'xbm': {
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, intT(it.w), intT(it.h), 0, 0, 0]);
            // 写位图数据到 scratch 再拷贝
            const ptr = mod._em_scratch(it.bits.length);
            if (ptr) {
              mod.HEAPU8.set(new Uint8Array(it.bits), ptr);
              mod._em_item_bits(pi, ii, ptr, it.bits.length);
            }
            break;
          }
          case 'textarea':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 10, 0, 1, 0, it.bindScroll ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, intT(it.height), 0, intT(it.lineSpacing)]);
            mod.ccall('em_item_text', null, ['number', 'number', 'string'], [pi, ii, it.content]);
            break;
          case 'board':
            mod.ccall('em_page_item', null, [...slotBase,
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number', 'number', 'number', 'number', 'number', 'number',
              'number', 'number'],
              [pi, ii, 11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, intT(it.w), intT(it.h), 0, 0, 0]);
            break;
        }
      });
      mod.ccall('em_page_end', null, ['number', 'number'], [pi, pg.items.length]);
    });
    mod.ccall('em_pages_commit', null, ['number'], [project.pages.length]);

    // 样式
    mod.ccall('em_set_style', null,
      ['number', 'number', 'number', 'number', 'number', 'number', 'number'],
      [this.fontIndex(project.font),
        { default: 0, rotundity: 1, square: 2 }[project.selector],
        intT(project.selectorLeftMargin), intT(project.selectorTopMargin),
        intT(project.selectorLineSpacing), project.marqueeSpeed, project.marqueeHeaderLen]);
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

  /** 读取预览中某槽位的实时值（数值/滑条/进度条条目） */
  getInt(page: number, idx: number): number {
    return this.mod?._em_get_ipool(page * 64 + idx) ?? 0;
  }

  getSwitch(page: number, idx: number): number {
    return this.mod?._em_get_upool(page * 64 + idx) ?? 0;
  }

  destroy(): void {
    this.stop();
    this.canvas.remove();
    this.mod = null;
  }
}

export { FONTS };
