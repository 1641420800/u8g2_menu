import { html, type TemplateResult } from 'lit-html';

export function textField(
  label: string, value: string,
  oncommit: (v: string) => void,
  placeholder = '',
): TemplateResult {
  return html`<div class="ume-field">
    <label>${label}</label>
    <input type="text" .value=${value ?? ''} placeholder=${placeholder}
      @change=${(e: Event) => oncommit((e.target as HTMLInputElement).value)} />
  </div>`;
}

export function numField(
  label: string, value: number,
  oncommit: (v: number) => void,
  step: number | 'any' = 1,
): TemplateResult {
  return html`<div class="ume-field">
    <label>${label}</label>
    <input type="number" .value=${String(value)} step=${String(step)}
      @change=${(e: Event) => {
        const v = parseFloat((e.target as HTMLInputElement).value);
        oncommit(Number.isFinite(v) ? v : 0);
      }} />
  </div>`;
}

export function selectField<T extends string>(
  label: string, value: T,
  options: { value: T; label: string }[],
  oncommit: (v: T) => void,
): TemplateResult {
  return html`<div class="ume-field">
    <label>${label}</label>
    <select @change=${(e: Event) => oncommit((e.target as HTMLSelectElement).value as T)}>
      ${options.map((o) => html`<option value=${o.value} ?selected=${o.value === value}>${o.label}</option>`)}
    </select>
  </div>`;
}

export function checkField(
  label: string, checked: boolean,
  oncommit: (v: boolean) => void,
): TemplateResult {
  return html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${checked}
      @change=${(e: Event) => oncommit((e.target as HTMLInputElement).checked)} />
    <span>${label}</span>
  </div>`;
}

export function areaField(
  label: string, value: string,
  oncommit: (v: string) => void,
  mono = false,
): TemplateResult {
  return html`<div class="ume-field wide">
    <label>${label}</label>
    <textarea style=${mono ? 'font-family:Consolas,monospace' : ''}
      @change=${(e: Event) => oncommit((e.target as HTMLTextAreaElement).value)}>${value ?? ''}</textarea>
  </div>`;
}

export function download(name: string, content: string, mime = 'text/plain'): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
