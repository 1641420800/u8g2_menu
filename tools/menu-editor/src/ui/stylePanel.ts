import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type { Project } from '../types';
import { FONTS, WEAK_HOOKS } from '../types';
import { numField, selectField, textField } from './common';

export function renderStyle(el: HTMLElement, store: EditorStoreApi): void {
  const { project } = store.getState();
  const up = (patch: Partial<Project>, key?: string) => store.getState().update((p) => { Object.assign(p, patch); }, key);

  const selected = project.weakHooks ?? [];
  // 在 mutator 中读取最新列表：快速连续勾选（同一渲染帧内）不会互相覆盖
  const toggleWeak = (fn: string, checked: boolean) => {
    store.getState().update((p) => {
      const cur = p.weakHooks ?? [];
      p.weakHooks = checked ? [...new Set([...cur, fn])] : cur.filter((n) => n !== fn);
    });
  };

  const weakList: TemplateResult = html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${selected.length}/${WEAK_HOOKS.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${WEAK_HOOKS.map((h) => html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${h.fn}${h.retNote ? '（返回 1 = 事件已处理 / 0 = 交给库）' : ''}`}>
              <input type="checkbox" ?checked=${selected.includes(h.fn)}
                @change=${(e: Event) => toggleWeak(h.fn, (e.target as HTMLInputElement).checked)} />
              <span>${h.label}</span>
            </div>
            <div class="ume-weak-desc">${h.desc}</div>
          </div>
        `)}
      </div>
    </details>
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

    <div class="ume-panel-title">进阶</div>
    ${weakList}
    ${nothing}
  `, el);
}
