import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type { Project, Variable, ChartBuffer } from '../types';
import { FONTS, WEAK_HOOKS } from '../types';
import { isCIdentifier } from '../codegen';
import { scanCharset, charsetStats } from '../fonts/charset';
import { numField, selectField, textField, checkField } from './common';

/** 当前展开编辑的变量/缓冲区 id（跨渲染保持） */
let expandedVarId: string | null = null;
let expandedBufId: string | null = null;

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
    const nameKeyword = v.name && !nameBad && !isCIdentifier(v.name);
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
        ${nameKeyword ? html`<div class="ume-warn">变量名是 C 关键字，生成的代码会自动改名（如 ${v.name}_），建议换个名字</div>` : nothing}
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

/** 图表数据源缓冲区管理区（多个图表条目可共用，data_dis 由生成器自动分配） */
function renderBufManager(store: EditorStoreApi, project: Project): TemplateResult {
  const bufs = project.chartBuffers ?? [];
  const refsOf = (bufId: string): number => {
    let n = 0;
    for (const pg of project.pages) {
      for (const it of pg.items) {
        if (it.kind === 'chart' && it.sources.some((s) => s.bufferId === bufId)) n++;
      }
    }
    return n;
  };

  const bufRow = (b: ChartBuffer): TemplateResult => {
    const editing = expandedBufId === b.id;
    const up = (patch: Partial<ChartBuffer>, key?: string) =>
      store.getState().updateChartBuffer(b.id, patch, key);
    const nameBad = b.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(b.name);
    const nameKeyword = b.name && !nameBad && !isCIdentifier(b.name);
    const refs = refsOf(b.id);
    return html`<div class="ume-var-item ${editing ? 'editing' : ''}">
      <div class="ume-var-row" @click=${() => { expandedBufId = editing ? null : b.id; }}>
        <span class="ume-var-name" title=${b.name}>${b.name || '(未命名)'}</span>
        <span class="ume-var-meta">${b.dataLen} 点 · ${({ sine: '正弦', ramp: '斜坡', noise: '伪随机', none: '手动填充' } as Record<string, string>)[b.sample]}${refs ? ` · ${refs} 处引用` : ''}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${(e: Event) => {
          e.stopPropagation();
          const n = store.getState().removeChartBuffer(b.id);
          if (n > 0) alert(`该缓冲区被 ${n} 个图表条目的数据源引用，请先在条目里移除数据源再删除`);
        }}>✕</button>
      </div>
      ${editing ? html`<div class="ume-var-edit">
        ${textField('数组名', b.name, (val) => up({ name: val.trim() }, `bn-${b.id}`))}
        ${nameBad ? html`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>` : nothing}
        ${nameKeyword ? html`<div class="ume-warn">数组名是 C 关键字，生成的代码会自动改名（如 ${b.name}_），建议换个名字</div>` : nothing}
        ${numField('点数', b.dataLen, (x) => up({ dataLen: Math.min(512, Math.max(2, Math.trunc(x))) }, `bl-${b.id}`))}
        ${selectField('示例填充', b.sample, [
          { value: 'sine', label: '正弦（演示）' },
          { value: 'ramp', label: '斜坡（演示）' },
          { value: 'noise', label: '伪随机（演示）' },
          { value: 'none', label: '不填充（全部手写）' },
        ], (v) => up({ sample: v as ChartBuffer['sample'] }))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>` : nothing}
    </div>`;
  };

  return html`
    <div class="ume-panel-title">
      数据源缓冲区 (${bufs.length})
      <button class="ume-mini" title="新建缓冲区" @click=${() => {
        const b = store.getState().addChartBuffer();
        expandedBufId = b.id;
      }}>＋ 新建</button>
    </div>
    ${bufs.length ? bufs.map(bufRow) : html`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `;
}

/** 「资源」页：变量 + 数据源缓冲区 */
export function renderResources(el: HTMLElement, store: EditorStoreApi): void {
  const { project } = store.getState();
  render(html`
    ${renderVarManager(store, project)}
    ${renderBufManager(store, project)}
  `, el);
}

/** 「设置」页：工程/样式/弱函数 */
export function renderSettings(el: HTMLElement, store: EditorStoreApi): void {
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
    ${checkField('中文现场取模（仅包含用到的字形）', project.fontSubset, (v) => up({ fontSubset: v }))}
    ${project.fontSubset ? html`
      ${textField('额外包含字符', project.fontExtra, (v) => up({ fontExtra: v }))}
      ${(() => {
        const stats = charsetStats(scanCharset(project, project.fontExtra));
        return html`<div class="ume-hint">当前收录 ${stats.total} 个字符（ASCII ${stats.ascii} + 中文等扩展 ${stats.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`;
      })()}` : nothing}
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
  `, el);
}
