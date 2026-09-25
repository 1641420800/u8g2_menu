import { html, render } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type { XbmItem } from '../types';

/**
 * XBM 位图编辑器：像素网格 + 拖拽绘制 + 尺寸调整。
 * 位序与 XBM 一致：byte[y * ceil(w/8) + (x >> 3)] 的 bit (x & 7)（LSB 在前）。
 */
export function openXbmEditor(host: HTMLElement, store: EditorStoreApi, pageId: string, itemId: string): void {
  const state = store.getState();
  const page = state.project.pages.find((p) => p.id === pageId);
  const item = page?.items.find((i) => i.id === itemId);
  if (!item || item.kind !== 'xbm') return;
  const xbm = item as XbmItem;

  let w = xbm.w;
  let h = xbm.h;
  let bits = [...xbm.bits];
  const bytesPerRow = () => Math.ceil(w / 8);

  const mask = document.createElement('div');
  mask.className = 'ume-modal-mask';
  mask.addEventListener('click', (e) => { if (e.target === mask) close(); });

  const at = (x: number, y: number): boolean => {
    const i = y * bytesPerRow() + (x >> 3);
    return i < bits.length ? !!((bits[i] >> (x & 7)) & 1) : false;
  };
  const set = (x: number, y: number, on: boolean) => {
    const i = y * bytesPerRow() + (x >> 3);
    bits[i] = on ? (bits[i] | (1 << (x & 7))) : (bits[i] & ~(1 << (x & 7)));
  };

  const resize = (nw: number, nh: number) => {
    const oldBpr = Math.ceil(w / 8);
    const newBpr = Math.ceil(nw / 8);
    const next = new Array(newBpr * nh).fill(0);
    for (let y = 0; y < Math.min(h, nh); y++) {
      for (let x = 0; x < Math.min(w, nw); x++) {
        const oldI = y * oldBpr + (x >> 3);
        if (oldI < bits.length && ((bits[oldI] >> (x & 7)) & 1)) {
          next[y * newBpr + (x >> 3)] |= 1 << (x & 7);
        }
      }
    }
    w = nw; h = nh; bits = next;
  };

  let drawing = false;
  let drawOn = true;

  const cellDown = (x: number, y: number) => (e: PointerEvent) => {
    e.preventDefault();
    drawing = true;
    drawOn = !at(x, y);
    set(x, y, drawOn);
    refresh();
  };
  const cellMove = (x: number, y: number) => () => {
    if (drawing) { set(x, y, drawOn); refresh(); }
  };
  const endDraw = () => { drawing = false; };

  const refresh = () => {
    render(body(), mask);
  };

  const cells = () => {
    const out = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        out.push(html`<button class="ume-xbm-cell ${at(x, y) ? 'on' : ''}"
          data-x=${x} data-y=${y}
          @pointerdown=${cellDown(x, y)}
          @pointerenter=${cellMove(x, y)}></button>`);
      }
    }
    return out;
  };

  const body = () => html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${w}×${h}</span></span>
        <button class="ume-mini" @click=${close}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${endDraw}
        @pointerleave=${endDraw}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(w)} min="1" max="128"
            @change=${(e: Event) => { resize(clamp(+(e.target as HTMLInputElement).value, 1, 128), h); refresh(); }} />
          <input type="number" style="width:64px" .value=${String(h)} min="1" max="64"
            @change=${(e: Event) => { resize(w, clamp(+(e.target as HTMLInputElement).value, 1, 64)); refresh(); }} />
          <button class="ume-btn sm" @click=${() => { bits = bits.map(() => 0); refresh(); }}>清空</button>
          <button class="ume-btn sm" @click=${() => { bits = bits.map((b) => ~b & 0xff); refresh(); }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${w}, 14px)">${cells()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${xbm.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${close}>取消</button>
        <button class="ume-btn primary" @click=${() => {
          store.getState().updateItem(pageId, itemId, { w, h, bits: [...bits] } as Partial<XbmItem>);
          close();
        }}>应用</button>
      </div>
    </div>
  `;

  function close() { mask.remove(); document.removeEventListener('pointerup', endDraw); }
  document.addEventListener('pointerup', endDraw);
  refresh();
  host.appendChild(mask);
}

function clamp(v: number, min: number, max: number): number {
  return Number.isFinite(v) ? Math.min(max, Math.max(min, Math.trunc(v))) : min;
}
