import { html, render } from 'lit-html';
import { WasmPreview, MenuKey } from '../preview/preview';

export function renderPreviewPane(
  el: HTMLElement,
  preview: WasmPreview,
): void {
  const hold = (key: MenuKey) => {
    let timer: number | undefined;
    const stop = () => { if (timer) { clearInterval(timer); timer = undefined; } };
    return {
      down: (e: PointerEvent) => {
        e.preventDefault();
        preview.key(key);
        stop();
        timer = window.setInterval(() => preview.key(key), 180);
      },
      up: stop,
    };
  };

  const draw = (key: MenuKey, label: string, title: string) => {
    const h = hold(key);
    return html`<button class="ume-key" title=${title}
      @pointerdown=${h.down} @pointerup=${h.up} @pointerleave=${h.up}>${label}</button>`;
  };

  render(html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(e: KeyboardEvent) => {
        const map: Record<string, MenuKey> = {
          ArrowUp: MenuKey.Up, ArrowDown: MenuKey.Down, Enter: MenuKey.Enter,
          Escape: MenuKey.Return, Backspace: MenuKey.Return,
          '+': MenuKey.Add, '-': MenuKey.Sub, '=': MenuKey.Add, '_': MenuKey.Sub,
        };
        const k = map[e.key];
        if (k !== undefined) { e.preventDefault(); preview.key(k); }
      }}>
      ${preview.canvas}
    </div>
    <div class="ume-keybar">
      ${draw(MenuKey.Up, '▲', '上 MENU_Key_Up')}
      ${draw(MenuKey.Down, '▼', '下 MENU_Key_Down')}
      ${draw(MenuKey.Enter, 'OK', '确认 MENU_Key_Enter')}
      ${draw(MenuKey.Return, '⌫', '返回 MENU_Key_Return')}
      ${draw(MenuKey.Add, '＋', '加 MENU_Key_Add')}
      ${draw(MenuKey.Sub, '－', '减 MENU_Key_Sub')}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <span id="ume-live-page"></span>
      <span id="ume-live-value"></span>
    </div>
  `, el);
}
