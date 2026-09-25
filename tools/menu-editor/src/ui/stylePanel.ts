import { html, render } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type { Project } from '../types';
import { FONTS } from '../types';
import { numField, selectField, textField } from './common';

export function renderStyle(el: HTMLElement, store: EditorStoreApi): void {
  const { project } = store.getState();
  const up = (patch: Partial<Project>, key?: string) => store.getState().update((p) => { Object.assign(p, patch); }, key);

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
  `, el);
}
