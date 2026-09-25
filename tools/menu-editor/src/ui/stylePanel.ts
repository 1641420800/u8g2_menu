import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type { Project, Variable } from '../types';
import { FONTS, WEAK_HOOKS } from '../types';
import { numField, selectField, textField } from './common';

/** 当前展开编辑的变量 id（跨渲染保持） */
let expandedVarId: string | null = null;

const TYPE_OPTIONS: { value: Variable['type']; label: string }[] = [
  { value: 'uint8', label: 'uint8 (0~255)' },
  { value: 'int8', label: 'int8 (-128~127)' },
  { value: 'uint16', label: 'uint16 (0~65535)' },
  { value: 'int16', label: 'int16 (-32768~32767)' },
  { value: 'uint32', label: 'uint32' },
  { value: 'int32', label: 'int32' },
  { value: 'int', label: 'int' },
  { value: 'float', label: 'float (小数)' },
  { value: 'double', label: 'double (小数)' },
];

function renderVarManager(store: EditorStoreApi, project: Project): TemplateResult {
  const vars = project.variables ?? [];
  const toggleExpand = (id: string) => { expandedVarId = expandedVarId === id ? null : id; };

  const varRow = (v: Variable): TemplateResult => {
    const editing = expandedVarId === v.id;
    const up = (patch: Partial<Variable>, key?: string) =>
      store.getState().updateVariable(v.id, patch, key);
    const nameBad = v.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(v.name);
    const nameDup = vars.filter((x) => x.name === v.name).length > 1;
    const refs = countRefs(project, v.id);

    return html`<div class="ume-var-item ${editing ? 'editing' : ''}">
      <div class="ume-var-row" @click=${() => toggleExpand(v.id)}>
        <span class="ume-var-name" title=${v.name}>${v.name || '(未命名)'}</span>
        <span class="ume-var-meta">${v.type} · ${v.min}~${v.max} · 步${v.step}${refs ? ` · ${refs} 处引用` : ''}</span>
        <button class="ume-mini" title="删除变量" @click=${(e: Event) => {
          e.stopPropagation();
          const n = store.getState().removeVariable(v.id);
          if (n > 0) alert(`该变量被 ${n} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`);
        }}>✕</button>
      </div>
      ${editing ? html`<div class="ume-var-edit">
        ${textField('变量名', v.name, (val) => up({ name: val.trim() }, `vn-${v.id}`))}
        ${nameBad ? html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>` : nothing}
        ${nameDup ? html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>` : nothing}
        ${selectField('类型', v.type, TYPE_OPTIONS, (t) => up({ type: t }))}
        ${numField('初始值', v.initialValue, (x) => up({ initialValue: x }, `vi-${v.id}`), 'any')}
        ${numField('最小值', v.min, (x) => up({ min: x }, `vmin-${v.id}`), 'any')}
        ${numField('最大值', v.max, (x) => up({ max: x }, `vmax-${v.id}`), 'any')}
        ${numField('步长', v.step, (x) => up({ step: x }, `vs-${v.id}`), 'any')}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>` : nothing}
    </div>`;
  };

  return html`
    <div class="ume-panel-title">
      变量 (${vars.length})
      <button class="ume-mini" title="新建变量" @click=${() => {
        const v = store.getState().addVariable();
        expandedVarId = v.id;
      }}>＋ 新建</button>
    </div>
    ${vars.length ? vars.map(varRow) : html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `;
}

function countRefs(project: Project, varId: string): number {
  let n = 0;
  for (const pg of project.pages) {
    for (const it of pg.items) {
      if ('varId' in it && it.varId === varId) n++;
    }
  }
  return n;
}

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

    ${renderVarManager(store, project)}

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
