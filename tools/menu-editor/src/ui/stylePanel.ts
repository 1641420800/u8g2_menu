import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type { Project } from '../types';
import { FONTS } from '../types';
import { numField, selectField, textField } from './common';

export function renderStyle(
  el: HTMLElement, store: EditorStoreApi,
  preview: { showMsgbox(text: string, timeout: number): void; closeMsgbox(): void; ready: boolean },
): void {
  const { project } = store.getState();
  const up = (patch: Partial<Project>, key?: string) => store.getState().update((p) => { Object.assign(p, patch); }, key);

  const msgboxRow: TemplateResult = html`
    <div class="ume-panel-title">消息框预览</div>
    <div class="ume-field">
      <label>文本</label>
      <input type="text" value="操作成功" id="ume-msgbox-text" />
    </div>
    <div class="ume-field">
      <label>超时(ms)</label>
      <input type="number" value="3000" id="ume-msgbox-timeout" min="0" step="100" />
      <button class="ume-btn sm" @click=${() => {
        const text = (el.querySelector('#ume-msgbox-text') as HTMLInputElement).value;
        const t = parseInt((el.querySelector('#ume-msgbox-timeout') as HTMLInputElement).value, 10) || 0;
        preview.showMsgbox(text, t);
      }} ?disabled=${!preview.ready}>显示</button>
      <button class="ume-btn sm" @click=${() => preview.closeMsgbox()} ?disabled=${!preview.ready}>关闭</div>
    </div>
  `;

  render(html`
    <div class="ume-panel-title">工程</div>
    ${textField('工程名', project.name, (v) => up({ name: v }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${project.width}×${project.height}
        ${project.width !== 128 || project.height !== 64
          ? '（预览固定 128×64，生成代码使用此值）' : ''}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${selectField('字体', project.font, FONTS.map((f) => ({ value: f.id, label: f.label })),
      (v) => up({ font: v }))}
    ${selectField('选择器', project.selector, [
      { value: 'default', label: '默认 (反色行)' },
      { value: 'rotundity', label: '圆形' },
      { value: 'square', label: '方形' },
    ], (v) => up({ selector: v }))}
    ${numField('左边距', project.selectorLeftMargin, (v) => up({ selectorLeftMargin: Math.max(0, Math.trunc(v)) }))}
    ${numField('顶边距', project.selectorTopMargin, (v) => up({ selectorTopMargin: Math.max(0, Math.trunc(v)) }))}
    ${numField('行间距', project.selectorLineSpacing, (v) => up({ selectorLineSpacing: Math.max(0, Math.trunc(v)) }))}
    ${numField('跑马灯速度', project.marqueeSpeed, (v) => up({ marqueeSpeed: v }), 0.05)}
    ${numField('跑马灯停留', project.marqueeHeaderLen, (v) => up({ marqueeHeaderLen: v }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>
    ${selectField('图层包裹', project.layerWrap, [
      { value: 'none', label: '不使用' },
      { value: 'AND', label: 'AND' }, { value: 'OR', label: 'OR' },
      { value: 'XOR', label: 'XOR' }, { value: 'XNOR', label: 'XNOR' },
    ], (v) => up({ layerWrap: v as Project['layerWrap'] }))}
    ${project.layerWrap !== 'none'
      ? html`<div class="ume-warn">库的图层模块 (u8g2_menu_layer.c) 存在已知编译问题，使用前请先修复；预览中不生效。</div>`
      : nothing}
    ${msgboxRow}
  `, el);
}

export function nothingUnused(): void { void nothing; }
