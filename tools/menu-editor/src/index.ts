import { UME_CSS } from './ui/styles';
import { createEditorStore, type EditorStoreApi } from './store';
import { parseProject, serializeProject } from './schema';
import { generateCode, type CodegenResult } from './codegen';
import { WasmPreview, MenuKey, EM_MAX_ITEMS } from './preview/preview';
import type { Project } from './types';
import { renderTree } from './ui/tree';
import { renderProperty } from './ui/property';
import { renderSettings, renderResources } from './ui/stylePanel';
import { renderPreviewPane } from './ui/previewPane';
import { showExportDialog } from './ui/exportDialog';
import { openXbmEditor } from './ui/xbmEditor';
import { download } from './ui/common';
import { scanCharset, charsetStats } from './fonts/charset';
import { subsetFont, type SubsetResult } from './fonts/u8g2font';

export interface MenuEditorOptions {
  /** 初始工程数据（JSON 字符串或对象）；缺省时尝试 localStorage 恢复，再缺省用内置示例 */
  data?: unknown;
  /** 预览引擎脚本地址（u8g2-menu-preview.js，同目录需有 .wasm） */
  wasmUrl?: string;
  /** localStorage 自动保存键；传 null 关闭持久化 */
  persistKey?: string | null;
  /** 模型变化回调（防抖 300ms） */
  onChange?: (data: Project) => void;
  /** 生成代码回调 */
  onExport?: (result: CodegenResult) => void;
}

const DEFAULT_WASM_URL = 'prebuilt/u8g2-menu-preview.js';

export class MenuEditor {
  private store: EditorStoreApi = createEditorStore();
  private container: HTMLElement;
  private opts: MenuEditorOptions;
  private preview: WasmPreview;
  private els: {
    left: HTMLElement; center: HTMLElement; right: HTMLElement;
    propEl: HTMLElement; resEl: HTMLElement; setEl: HTMLElement;
    toolbarUndo: HTMLButtonElement; toolbarRedo: HTMLButtonElement;
  };
  private renderScheduled = false;
  private saveTimer: number | undefined;
  private changeTimer: number | undefined;
  private lastExport: { c: string } | null = null;
  private destroyed = false;
  private activateRightTab: (key: string) => void = () => {};

  constructor(container: HTMLElement, opts: MenuEditorOptions = {}) {
    this.container = container;
    this.opts = { persistKey: 'default', ...opts };
    container.classList.add('ume');

    // 样式注入（幂等）
    if (!document.getElementById('ume-style')) {
      const style = document.createElement('style');
      style.id = 'ume-style';
      style.textContent = UME_CSS;
      document.head.appendChild(style);
    }

    // 初始数据：显式 data > localStorage > 内置示例
    const saved = this.opts.persistKey
      ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null;
    const initial = this.opts.data ?? saved ?? undefined;
    if (initial !== undefined) {
      try {
        this.store.setState({ project: parseProject(initial) });
      } catch (err) {
        console.warn('[u8g2-menu-editor] 初始数据无效，使用示例工程:', err);
      }
    }
    const lastC = this.opts.persistKey
      ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null;
    if (lastC) this.lastExport = { c: lastC };

    // 布局
    container.innerHTML = `
      <div class="ume-toolbar">
        <span class="ume-title">⬒ u8g2_menu 编辑器</span>
        <button class="ume-btn sm" data-act="add-page">＋页面</button>
        <button class="ume-btn sm" data-act="undo">撤销</button>
        <button class="ume-btn sm" data-act="redo">重做</button>
        <span class="ume-sep"></span>
        <button class="ume-btn sm" data-act="import">导入 JSON</button>
        <button class="ume-btn sm" data-act="export-json">导出 JSON</button>
        <span class="ume-spacer"></span>
        <button class="ume-btn primary sm" data-act="generate">⚡ 生成 C 代码</button>
      </div>
      <div class="ume-main">
        <div class="ume-left"></div>
        <div class="ume-center"></div>
        <div class="ume-right">
          <div class="ume-tabs">
            <button data-tab="prop" class="active">属性</button>
            <button data-tab="res">资源</button>
            <button data-tab="set">设置</button>
          </div>
          <div data-role="prop"></div>
          <div data-role="res" style="display:none"></div>
          <div data-role="set" style="display:none"></div>
        </div>
      </div>
      <input type="file" accept=".json,application/json" style="display:none" data-role="file">
    `;

    const $ = <T extends HTMLElement>(sel: string): T => container.querySelector(sel) as T;
    this.els = {
      left: $('.ume-left'),
      center: $('.ume-center'),
      right: $('.ume-right'),
      propEl: $('[data-role="prop"]'),
      resEl: $('[data-role="res"]'),
      setEl: $('[data-role="set"]'),
      toolbarUndo: $('[data-act="undo"]'),
      toolbarRedo: $('[data-act="redo"]'),
    };

    // 预览
    const previewHost = document.createElement('div');
    previewHost.style.display = 'flex';
    previewHost.style.flexDirection = 'column';
    previewHost.style.alignItems = 'center';
    previewHost.style.gap = '10px';
    this.els.center.appendChild(previewHost);
    this.preview = new WasmPreview(previewHost, {
      onPageChanged: (pageIdx) => this.onPreviewPageChanged(pageIdx),
    });
    const keybarHost = document.createElement('div');
    this.els.center.appendChild(keybarHost);
    renderPreviewPane(keybarHost, this.preview);
    void this.preview.load(this.opts.wasmUrl ?? DEFAULT_WASM_URL)
      .then(() => { this.preview.sync(this.store.getState().project); this.scheduleRender(); })
      .catch((err) => {
        console.error(err);
        const tip = document.createElement('div');
        tip.className = 'ume-warn';
        tip.textContent = `预览引擎加载失败: ${(err as Error).message}。编辑功能不受影响。`;
        this.els.center.prepend(tip);
      });
    container.querySelector('[data-act="add-page"]')!.addEventListener('click', () => {
      const name = prompt('页面名称:', `页面${this.store.getState().project.pages.length + 1}`);
      if (name !== null) this.store.getState().addPage(name || undefined);
    });
    this.els.toolbarUndo.addEventListener('click', () => this.store.getState().undo());
    this.els.toolbarRedo.addEventListener('click', () => this.store.getState().redo());
    container.querySelector('[data-act="export-json"]')!.addEventListener('click', () => {
      download(`${this.store.getState().project.name || 'menu-project'}.json`,
        serializeProject(this.store.getState().project), 'application/json');
    });
    container.querySelector('[data-act="import"]')!.addEventListener('click', () => {
      ($('[data-role="file"]') as HTMLInputElement).click();
    });
    ($('[data-role="file"]') as HTMLInputElement).addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      file.text().then((text) => {
        try {
          const proj = parseProject(text);
          this.store.getState().update((p) => { Object.assign(p, proj); });
          this.scheduleRender();
        } catch (err) {
          alert(`导入失败: ${(err as Error).message}`);
        }
      });
      (e.target as HTMLInputElement).value = '';
    });
    container.querySelector('[data-act="generate"]')!.addEventListener('click', () => this.generate());

    // 右栏 Tab 切换（属性/资源/设置）
    const tabButtons = container.querySelectorAll<HTMLButtonElement>('.ume-tabs button');
    const activateTab = (key: string) => {
      tabButtons.forEach((b) => b.classList.toggle('active', b.dataset.tab === key));
      this.els.propEl.style.display = key === 'prop' ? '' : 'none';
      this.els.resEl.style.display = key === 'res' ? '' : 'none';
      this.els.setEl.style.display = key === 'set' ? '' : 'none';
    };
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => activateTab(btn.dataset.tab ?? 'prop'));
    });
    this.activateRightTab = activateTab;

    // 快捷键
    this.onKeyDown = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.onKeyDown);

    // 初始选中第一页
    this.store.getState().select(this.store.getState().project.pages[0]?.id ?? null, null);

    // 订阅渲染
    let lastSelectedItemId: string | null = null;
    this.store.subscribe(() => {
      this.preview.sync(this.store.getState().project);
      this.persist();
      this.scheduleRender();
      this.notifyChange();
      // 选中某个条目时自动切到属性 Tab（页面级选中不切，避免预览跳页时被打断）
      const itemId = this.store.getState().selection.itemId;
      if (itemId && itemId !== lastSelectedItemId) this.activateRightTab('prop');
      lastSelectedItemId = itemId;
    });

    this.scheduleRender();
    this.persist();
    // 预览内编辑（+/－键）不触发 store，需轮询刷新实时数值显示
    window.setInterval(() => { if (!this.destroyed) this.updateLiveInfo(); }, 300);
  }

  /* ---------------- 公共 API ---------------- */

  getData(): Project {
    return structuredClone(this.store.getState().project);
  }

  loadData(data: unknown): void {
    const proj = parseProject(data);
    this.store.getState().update((p) => { Object.assign(p, proj); });
    this.store.getState().select(proj.pages[0]?.id ?? null, null);
  }

  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate(): CodegenResult {
    const result = this.produceCode();
    showExportDialog(this.container, result);
    this.opts.onExport?.(result);
    return result;
  }

  downloadC(): void {
    const r = this.produceCode();
    download('menu_pages.c', r.c);
  }

  /** 生成路径（generate/downloadC 共用）：现场取模 + 警告收口 + 保留 USER CODE */
  private produceCode(): CodegenResult {
    const prev = this.lastExport;
    const proj = this.store.getState().project;
    let fontSubset: Uint8Array | undefined;
    const fontWarnings: string[] = [];
    if (proj.fontSubset) {
      if (!this.preview.ready) {
        fontWarnings.push('现场取模需要预览引擎，当前引擎不可用：本次未生成 menu_font，代码将引用内置字体');
      } else {
        // 预览引擎在 sync 时已应用同一子集，这里只负责导出字节与警告
        const charset = scanCharset(proj, proj.fontExtra);
        const sub = this.buildFontSubset(proj, charset);
        if ('error' in sub) {
          fontWarnings.push(`${sub.error}，本次按内置字体生成`);
        } else {
          fontSubset = sub.result.font;
          const stats = charsetStats(charset);
          fontWarnings.push(`现场取模：收录 ${stats.total} 个字符（ASCII ${stats.ascii} + 扩展 ${stats.cjk}），字体数组 ${sub.result.font.length} 字节。运行时若输出超出字符集的中文，请在设置里补充额外字符`);
          if (sub.result.included > 255) {
            fontWarnings.push(`子集字形数 ${sub.result.included} 超过 255：字体头 glyph_cnt 字段将回绕（记录为 ${sub.result.included & 0xff}），如遇渲染异常请在"额外包含字符"里精简`);
          }
          if (sub.result.missing.length) {
            const sample = sub.result.missing.slice(0, 5).map((n) => String.fromCodePoint(n)).join(' ');
            fontWarnings.push(`字符集中 ${sub.result.missing.length} 个字符未在源字体中找到（如 ${sample}），运行时这些字符无法显示`);
          }
        }
      }
      const pw = this.preview.fontApplyWarning;
      if (pw) fontWarnings.push(pw);
    }
    const result = generateCode(proj, prev ?? undefined, fontSubset);
    result.warnings.unshift(...fontWarnings);
    this.lastExport = { c: result.c };
    if (this.opts.persistKey) {
      localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, result.c);
    }
    return result;
  }

  /** 现场取模：从 WASM 真库逐字拉取字形，生成子集字体 */
  private buildFontSubset(proj: Project, charset: Set<number>):
    { result: SubsetResult } | { error: string } {
    const fontIdx = this.preview.fontIndex(proj.font);
    const srcFont = this.preview.getFontBytes(fontIdx);
    const fetcher = this.preview.glyphFetcher(fontIdx);
    if (!srcFont || !fetcher) return { error: '现场取模失败：无法读取源字体数据' };
    const sub = subsetFont(srcFont, charset, fetcher);
    if (!sub) return { error: '现场取模失败：字符集未命中任何字形' };
    return { result: sub };
  }

  destroy(): void {
    this.destroyed = true;
    document.removeEventListener('keydown', this.onKeyDown);
    this.preview.destroy();
    this.container.innerHTML = '';
  }

  /* ---------------- 内部 ---------------- */

  private onKeyDown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      e.shiftKey ? this.store.getState().redo() : this.store.getState().undo();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      this.store.getState().redo();
    }
  }

  private onPreviewPageChanged(pageIdx: number): void {
    const page = this.store.getState().project.pages[pageIdx];
    if (page) this.store.getState().select(page.id, null);
  }

  private persist(): void {
    if (!this.opts.persistKey || this.destroyed) return;
    clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,
          serializeProject(this.store.getState().project));
      } catch { /* 容量不足时忽略 */ }
    }, 400);
  }

  private notifyChange(): void {
    if (!this.opts.onChange) return;
    clearTimeout(this.changeTimer);
    this.changeTimer = window.setTimeout(() => {
      this.opts.onChange!(structuredClone(this.store.getState().project));
    }, 300);
  }

  private scheduleRender(): void {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      if (this.destroyed) return;
      const st = this.store.getState();
      renderTree(this.els.left, this.store);
      renderSettings(this.els.setEl, this.store);
      renderResources(this.els.resEl, this.store);
      renderProperty(this.els.propEl, this.store, {
        openXbmEditor: (pageId, itemId) => openXbmEditor(this.container, this.store, pageId, itemId),
      });
      // 撤销/重做按钮状态
      this.els.toolbarUndo.disabled = st.past.length === 0;
      this.els.toolbarRedo.disabled = st.future.length === 0;
      // 实时数值显示
      this.updateLiveInfo();
    });
  }

  private updateLiveInfo(): void {
    const valEl = document.getElementById('ume-live-value');
    const jump = document.getElementById('ume-page-jump') as HTMLSelectElement | null;
    const st = this.store.getState();
    const pageIdx = this.store.getState().project.pages.findIndex((p) => p.id === st.selection.pageId);

    // 「预览页」下拉：页面列表变化时重建选项，值始终跟随预览实际所在页
    if (jump) {
      const pages = st.project.pages;
      const sig = pages.map((p) => p.name).join('|');
      if (jump.dataset.sig !== sig) {
        jump.dataset.sig = sig;
        jump.innerHTML = '';
        pages.forEach((p, i) => {
          const opt = document.createElement('option');
          opt.value = String(i);
          opt.textContent = `${i + 1}. ${p.name}`;
          jump.appendChild(opt);
        });
        jump.onchange = () => {
          const target = parseInt(jump.value, 10);
          if (Number.isFinite(target)) this.preview.navTo(target);
        };
      }
      const cur = this.preview.currentPage;
      if (document.activeElement !== jump && jump.value !== String(cur)) {
        jump.value = String(cur);
      }
    }

    if (valEl && pageIdx >= 0 && st.selection.itemId) {
      const page = st.project.pages[pageIdx];
      const idx = page.items.findIndex((i) => i.id === st.selection.itemId);
      const item = page.items[idx];
      // 值池槽位与 preview.sync 一致：绑定变量按变量下标，未绑定按条目
      const bind = item?.bind;
      const boundVarId = bind?.type === 'value' || bind?.type === 'switch' ? bind.varId : null;
      const dispVarId = item?.kind === 'text' && bind?.type === 'none' ? item.displayVarId : null;
      const vid = boundVarId ?? dispVarId;
      if (item && vid) {
        const varSlot = (st.project.variables ?? []).findIndex((v) => v.id === vid);
        const slot = varSlot >= 0 ? varSlot : pageIdx * EM_MAX_ITEMS + idx;
        const isSwitch = bind?.type === 'switch';
        const v = isSwitch ? this.preview.getSwitch(slot) : this.preview.getInt(slot);
        const name = (st.project.variables ?? []).find((x) => x.id === vid)?.name;
        valEl.textContent = `${name ?? item.kind} = ${v}`;
      } else {
        valEl.textContent = '';
      }
    }
  }
}

export { MenuKey };
