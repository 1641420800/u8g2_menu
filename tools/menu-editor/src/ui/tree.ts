import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type { Item, Page } from '../types';
import { KIND_ICON, KIND_LABELS, BIND_LABELS, type ItemKind } from '../types';

const ALL_KINDS = Object.keys(KIND_LABELS) as ItemKind[];

function itemRow(store: EditorStoreApi, page: Page, item: Item, selected: boolean): TemplateResult {
  const s = store.getState();
  const name = item.label || ('text' in item && item.text) || KIND_LABELS[item.kind];
  const bindSuffix = item.bind.type !== 'none' ? ` · ${BIND_LABELS[item.bind.type]}` : '';
  const move = (dir: -1 | 1) => (e: Event) => {
    e.stopPropagation();
    store.getState().moveItem(page.id, item.id, dir);
  };
  return html`<div class="ume-item-row ${selected ? 'selected' : ''}"
    @click=${() => store.getState().select(page.id, item.id)}>
    <span class="ume-item-icon">${KIND_ICON[item.kind]}</span>
    <span class="ume-item-name" title=${name + bindSuffix}>${name}${bindSuffix}</span>
    <button class="ume-mini" title="上移" @click=${move(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${move(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(e: Event) => { e.stopPropagation(); s.duplicateItem(page.id, item.id); }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(e: Event) => { e.stopPropagation(); s.removeItem(page.id, item.id); }}>✕</button>
  </div>`;
}

function addMenu(store: EditorStoreApi, page: Page): TemplateResult {
  const s = store.getState();
  return html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(e: Event) => {
      const kind = (e.target as HTMLSelectElement).value as ItemKind;
      if (kind) s.addItem(kind, page.id);
      (e.target as HTMLSelectElement).value = '';
    }}>
    <option value="">＋条目</option>
    ${ALL_KINDS.map((k) => html`<option value=${k}>${KIND_LABELS[k]}</option>`)}
  </select>`;
}

export function renderTree(el: HTMLElement, store: EditorStoreApi): void {
  const { project, selection } = store.getState();

  const pageNode = (pg: Page): TemplateResult => {
    const s = store.getState();
    const selected = selection.pageId === pg.id;
    return html`<div class="ume-page">
      <div class="ume-page-head ${selected ? 'selected' : ''}"
        @click=${() => store.getState().select(pg.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${pg.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(e: Event) => { e.stopPropagation(); s.movePage(pg.id, -1); }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(e: Event) => { e.stopPropagation(); s.movePage(pg.id, 1); }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(e: Event) => {
            e.stopPropagation();
            if (project.pages.length <= 1) { alert('至少保留一个页面'); return; }
            if (confirm(`删除页面 "${pg.name}"？`)) s.removePage(pg.id);
          }}>✕</button>
      </div>
      ${selected ? html`<div class="ume-page-items">
        ${pg.items.length
          ? pg.items.map((it) => itemRow(store, pg, it, selection.itemId === it.id))
          : html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${addMenu(store, pg)}</div>
      </div>` : nothing}
    </div>`;
  };

  render(html`
    <div class="ume-panel-title">
      页面 / 条目 (${project.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => s_addPage(store)}>＋ 页面</button>
    </div>
    ${project.pages.map(pageNode)}
  `, el);
}

function s_addPage(store: EditorStoreApi): void {
  const name = prompt('页面名称:', `页面${store.getState().project.pages.length + 1}`);
  if (name !== null) store.getState().addPage(name || undefined);
}

export function focusTreeItem(el: HTMLElement, itemId: string): void {
  // 目前不做滚动定位，占位以便后续扩展
  void el; void itemId;
}
