import { html, render, nothing } from 'lit-html';
import { download } from './common';

export interface ExportResult {
  c: string;
  h: string;
  warnings: string[];
}

let current: ExportResult | null = null;
let tab: 'c' | 'h' = 'c';

export function showExportDialog(host: HTMLElement, result: ExportResult): void {
  current = result;
  // 重复触发时先关闭已打开的对话框，避免蒙层叠加
  host.querySelectorAll(':scope > .ume-modal-mask').forEach((m) => m.remove());
  openDialog(host);
}

function openDialog(host: HTMLElement): void {
  if (!current) return;
  const code = tab === 'c' ? current.c : current.h;
  const mask = document.createElement('div');
  mask.className = 'ume-modal-mask';
  mask.addEventListener('click', (e) => { if (e.target === mask) close(mask); });

  const draw = () => {
    render(html`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${() => close(mask)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${current!.warnings.length ? html`
            <div style="margin-bottom:8px">
              ${current!.warnings.map((w) => html`<div class="ume-warn">⚠ ${w}</div>`)}
            </div>` : nothing}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${tab === 'c' ? 'primary' : ''}" @click=${() => { tab = 'c'; draw(); }}>menu_pages.c</button>
            <button class="ume-btn sm ${tab === 'h' ? 'primary' : ''}" @click=${() => { tab = 'h'; draw(); }}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${code}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${() => {
            navigator.clipboard.writeText(code).then(() => toast(mask, '已复制到剪贴板'));
          }}>复制</button>
          <button class="ume-btn primary" @click=${() => {
            download(tab === 'c' ? 'menu_pages.c' : 'menu_pages.h', code);
          }}>下载 ${tab === 'c' ? 'menu_pages.c' : 'menu_pages.h'}</button>
        </div>
      </div>
    `, mask);
  };
  draw();
  host.appendChild(mask);
}

function close(mask: HTMLElement): void {
  mask.remove();
}

function toast(mask: HTMLElement, text: string): void {
  const host = mask.closest('.ume') ?? document.body;
  let t = host.querySelector('.ume-toast') as HTMLElement | null;
  if (!t) {
    t = document.createElement('div');
    t.className = 'ume-toast';
    host.appendChild(t);
  }
  t.textContent = text;
  t.classList.add('show');
  setTimeout(() => t!.classList.remove('show'), 1600);
}
