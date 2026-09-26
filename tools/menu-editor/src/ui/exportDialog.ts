import { html, render, nothing } from 'lit-html';
import { download } from './common';

export interface ExportResult {
  c: string;
  warnings: string[];
}

export function showExportDialog(host: HTMLElement, result: ExportResult): void {
  // 重复触发时先关闭已打开的对话框，避免蒙层叠加
  host.querySelectorAll(':scope > .ume-modal-mask').forEach((m) => m.remove());
  const mask = document.createElement('div');
  mask.className = 'ume-modal-mask';
  mask.addEventListener('click', (e) => { if (e.target === mask) close(mask); });

  render(html`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${() => close(mask)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${result.warnings.length ? html`
          <div style="margin-bottom:8px">
            ${result.warnings.map((w) => html`<div class="ume-warn">⚠ ${w}</div>`)}
          </div>` : nothing}
        <div class="ume-code-view">${result.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${() => {
          navigator.clipboard.writeText(result.c).then(() => toast(mask, '已复制到剪贴板'));
        }}>复制</button>
        <button class="ume-btn primary" @click=${() => {
          download('menu_pages.c', result.c);
        }}>下载 menu_pages.c</button>
      </div>
    </div>
  `, mask);
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
