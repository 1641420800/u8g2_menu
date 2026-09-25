import { UME_CSS } from './ui/styles';
import { createEditorStore, type EditorStoreApi } from './store';
import { parseProject, serializeProject } from './schema';
import { generateCode, type CodegenResult } from './codegen';
import { WasmPreview, MenuKey } from './preview/preview';
import type { Project } from './types';
import { renderTree } from './ui/tree';
import { renderProperty } from './ui/property';
import { renderStyle } from './ui/stylePanel';
import { renderPreviewPane } from './ui/previewPane';
import { showExportDialog } from './ui/exportDialog';
import { openXbmEditor } from './ui/xbmEditor';
import { download } from './ui/common';

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
    styleEl: HTMLElement; propEl: HTMLElement;
    toolbarUndo: HTMLButtonElement; toolbarRedo: HTMLButtonElement;
  };
  private renderScheduled = false;
  private saveTimer: number | undefined;
  private changeTimer: number | undefined;
  private lastExport: { c: string; h: string } | null = null;
  private destroyed = false;

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
    const lastH = this.opts.persistKey
      ? localStorage.getItem(`ume_last_h_${this.opts.persistKey}`) : null;
    if (lastC && lastH) this.lastExport = { c: lastC, h: lastH };

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
          <div data-role="style"></div>
          <div data-role="prop"></div>
        </div>
      </div>
      <input type="file" accept=".json,application/json" style="display:none" data-role="file">
    `;

    const $ = <T extends HTMLElement>(sel: string): T => container.querySelector(sel) as T;
    this.els = {
      left: $('.ume-left'),
      center: $('.ume-center'),
      right: $('.ume-right'),
      styleEl: $('[data-role="style"]'),
      propEl: $('[data-role="prop"]'),
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

    // 快捷键
    this.onKeyDown = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.onKeyDown);

    // 初始选中第一页
    this.store.getState().select(this.store.getState().project.pages[0]?.id ?? null, null);

    // 订阅渲染
    this.store.subscribe(() => {
      this.preview.sync(this.store.getState().project);
      this.persist();
      this.scheduleRender();
      this.notifyChange();
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
    const prev = this.lastExport;
    const result = generateCode(this.store.getState().project, prev ?? undefined);
    this.lastExport = { c: result.c, h: result.h };
    if (this.opts.persistKey) {
      localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, result.c);
      localStorage.setItem(`ume_last_h_${this.opts.persistKey}`, result.h);
    }
    showExportDialog(this.container, result);
    this.opts.onExport?.(result);
    return result;
  }

  downloadC(): void {
    const r = generateCode(this.store.getState().project, this.lastExport ?? undefined);
    this.lastExport = { c: r.c, h: r.h };
    download('menu_pages.c', r.c);
    download('menu_pages.h', r.h);
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
      renderStyle(this.els.styleEl, this.store, this.preview);
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
    const pageEl = document.getElementById('ume-live-page');
    const valEl = document.getElementById('ume-live-value');
    const st = this.store.getState();
    const pageIdx = this.store.getState().project.pages.findIndex((p) => p.id === st.selection.pageId);
    if (pageEl && pageIdx >= 0) {
      const cur = this.preview.currentPage;
      pageEl.textContent = `预览页: ${this.store.getState().project.pages[cur]?.name ?? '?'}`;
    }
    if (valEl && pageIdx >= 0 && st.selection.itemId) {
      const page = st.project.pages[pageIdx];
      const idx = page.items.findIndex((i) => i.id === st.selection.itemId);
      const item = page.items[idx];
      if (item && ('varName' in item)) {
        const v = item.kind === 'switch'
          ? this.preview.getSwitch(pageIdx, idx)
          : this.preview.getInt(pageIdx, idx);
        valEl.textContent = `${item.varName} = ${v}`;
      } else {
        valEl.textContent = '';
      }
    }
  }
}

export { MenuKey };
