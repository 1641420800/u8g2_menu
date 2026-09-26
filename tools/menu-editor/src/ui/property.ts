import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type {
  Item, TextItem, ChartItem, ChartSource, XbmItem, TextAreaItem, BoardItem,
  Bind, Variable,
} from '../types';
import { KIND_LABELS, BIND_LABELS } from '../types';
import { numField, textField, selectField, checkField, areaField } from './common';

/** 记住最近一次绑定的变量：附加值在无/数值/开关间切换时不丢绑定 */
let lastBoundVarId: string | null = null;

export interface XbmEditorHost {
  openXbmEditor(pageId: string, itemId: string): void;
}

const TYPE_LABEL: Record<string, string> = {
  uint8: 'uint8', uint16: 'uint16', uint32: 'uint32', int8: 'int8', int16: 'int16',
  int32: 'int32', int: 'int', float: 'float', double: 'double',
};

/** 变量绑定下拉：list 为候选（已按类型过滤） */
function varSelect(
  label: string, current: string | null,
  list: Variable[], onBind: (varId: string | null) => void,
): TemplateResult {
  const options = [
    { value: '', label: '（未绑定）' },
    ...list.map((v) => ({ value: v.id, label: `${v.name} : ${TYPE_LABEL[v.type] ?? v.type}` })),
  ];
  const found = current ? list.some((v) => v.id === current) : false;
  return html`
    ${selectField(label, current ?? '', options, (v) => onBind(v || null))}
    ${current && !found ? html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>` : nothing}
    ${list.length === 0 ? html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>` : nothing}
  `;
}

/** 新建变量快捷按钮：创建默认变量并回调 */
function quickCreateVar(
  store: EditorStoreApi, onCreated: (v: Variable) => void,
): TemplateResult {
  return html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
      const v = store.getState().addVariable();
      onCreated(v);
    }}>＋ 新建变量并绑定</button>
  </div>`;
}

/** 绑定变量的参数摘要 */
function varInfo(v: Variable | undefined): TemplateResult {
  if (!v) return html`${nothing}`;
  return html`<div class="ume-hint">
    ${v.name} : ${TYPE_LABEL[v.type] ?? v.type}，范围 ${v.min}~${v.max}，步长 ${v.step}，初值 ${v.initialValue}
    （在「资源」页修改变量）
  </div>`;
}

export function renderProperty(
  el: HTMLElement, store: EditorStoreApi, xbmHost: XbmEditorHost,
): void {
  const { project, selection } = store.getState();
  const page = project.pages.find((p) => p.id === selection.pageId) ?? null;
  const item = page?.items.find((i) => i.id === selection.itemId) ?? null;
  const vars = project.variables ?? [];
  const buffers = project.chartBuffers ?? [];

  const upItem = (patch: Partial<Item>, key?: string) =>
    store.getState().updateItem(page!.id, item!.id, patch, key);
  const setBind = (bind: Bind) => upItem({ bind } as Partial<Item>);

  let body: TemplateResult = html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`;
  let title = '';

  if (page && !item) {
    title = '页面属性';
    body = html`
      ${textField('名称', page.name, (v) => store.getState().updatePage(page.id, { name: v }))}
      ${textField('C 函数名', page.fnName, (v) => store.getState().updatePage(page.id, { fnName: v }), '留空自动 page_N')}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;
  } else if (page && item) {
    // 记住选中条目的绑定变量：附加值在 无/数值/开关 间往返切换时不丢绑定
    if ((item.bind.type === 'value' || item.bind.type === 'switch') && item.bind.varId) {
      lastBoundVarId = item.bind.varId;
    }
    title = `${KIND_LABELS[item.kind]}${item.bind.type !== 'none' ? ` + ${BIND_LABELS[item.bind.type]}` : ''}`;

    // ---------- 绘制参数（按绘制类型） ----------
    let drawBody: TemplateResult = html``;
    switch (item.kind) {
      case 'text': {
        const t = item as TextItem;
        const v = vars.find((x) => x.id === t.displayVarId);
        drawBody = html`
          ${textField('文本/格式', t.text, (v2) => upItem({ text: v2 }, `text-${t.id}`))}
          ${selectField('大小', String(t.scale) as '1' | '2', [
            { value: '1', label: '正常' }, { value: '2', label: '二倍大' },
          ], (v2) => upItem({ scale: Number(v2) as 1 | 2 }))}
          ${item.bind.type === 'none' ? html`
            ${varSelect('显示变量', t.displayVarId, vars, (vid) => upItem({ displayVarId: vid } as Partial<Item>))}
            ${!v ? quickCreateVar(store, (nv) => upItem({ displayVarId: nv.id } as Partial<Item>)) : nothing}
            ${varInfo(v)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>` : nothing}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      }
      case 'slider':
      case 'progress': {
        const p = item;
        drawBody = html`
          ${item.bind.type === 'none' ? html`
            ${numField('静态位置(%)', p.position, (v2) => upItem({ position: Math.min(100, Math.max(0, Math.trunc(v2))) }))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>` : nothing}
        `;
        break;
      }
      case 'chart': {
        const c = item as ChartItem;
        const setSources = (sources: ChartSource[]) => upItem({ sources } as Partial<Item>);
        const sourceRow = (s: ChartSource, si: number): TemplateResult => {
          const b = buffers.find((x) => x.id === s.bufferId);
          const auto = s.min === undefined || s.max === undefined;
          return html`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${b?.name ?? '(无效)'}</span>
              <span class="ume-var-meta">${({ line: '折线', point: '散点', bar: '柱状' } as Record<string, string>)[s.chartKind] ?? s.chartKind}${auto ? ' · 自动量程' : ` · ${s.min}~${s.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${() => setSources(c.sources.filter((_, i) => i !== si))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${selectField('缓冲区', s.bufferId, buffers.map((x) => ({ value: x.id, label: `${x.name} (${x.dataLen}点)` })), (vid) => setSources(c.sources.map((x, i) => i === si ? { ...x, bufferId: vid } : x)))}
              ${selectField('绘制', s.chartKind, [
                { value: 'line', label: '折线' }, { value: 'point', label: '散点' }, { value: 'bar', label: '柱状' },
              ], (k) => setSources(c.sources.map((x, i) => i === si ? { ...x, chartKind: k as ChartSource['chartKind'] } : x)))}
              ${checkField('自动量程', auto, (on) => setSources(c.sources.map((x, i) => i === si ? { ...x, min: on ? undefined : 0, max: on ? undefined : 100 } : x)))}
              ${!auto ? html`
                ${numField('量程上限', s.max ?? 100, (v2) => setSources(c.sources.map((x, i) => i === si ? { ...x, max: v2 } : x)), 'any')}
                ${numField('量程下限', s.min ?? 0, (v2) => setSources(c.sources.map((x, i) => i === si ? { ...x, min: v2 } : x)), 'any')}` : nothing}
            </div>
          </div>`;
        };
        drawBody = html`
          ${numField('高度(px)', c.height, (v2) => upItem({ height: Math.max(4, Math.trunc(v2)) }))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(c.sources ?? []).map(sourceRow)}
              ${(c.sources ?? []).length === 0 ? html`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>` : nothing}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(c.sources ?? []).length >= 4}
                @click=${() => {
                  if (!buffers.length) {
                    const b = store.getState().addChartBuffer();
                    setSources([...(c.sources ?? []), { bufferId: b.id, chartKind: 'line' }]);
                    return;
                  }
                  setSources([...(c.sources ?? []), { bufferId: buffers[0].id, chartKind: 'line' }]);
                }}>＋ 添加数据源${(c.sources ?? []).length > 0 ? '（叠加）' : ''}</button>
              ${!buffers.length ? html`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>` : nothing}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;
        break;
      }
      case 'xbm': {
        const x = item as XbmItem;
        drawBody = html`
          ${textField('数组名', x.name, (v2) => upItem({ name: v2 }))}
          ${numField('宽(px)', x.w, (v2) => upItem({ w: Math.min(128, Math.max(1, Math.trunc(v2))) }))}
          ${numField('高(px)', x.h, (v2) => upItem({ h: Math.min(64, Math.max(1, Math.trunc(v2))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => xbmHost.openXbmEditor(page.id, x.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${x.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case 'textarea': {
        const t = item as TextAreaItem;
        drawBody = html`
          ${areaField('文本内容', t.content, (v2) => upItem({ content: v2 }))}
          ${numField('高度(px)', t.height, (v2) => upItem({ height: Math.max(10, Math.trunc(v2)) }))}
          ${numField('行间距', t.lineSpacing, (v2) => upItem({ lineSpacing: Math.max(0, Math.trunc(v2)) }))}
          ${checkField('上下键滚动 (bind)', t.bindScroll, (v2) => upItem({ bindScroll: v2 }))}
        `;
        break;
      }
      case 'board': {
        const b = item as BoardItem;
        drawBody = html`
          ${numField('宽(px)', b.w, (v2) => upItem({ w: Math.max(1, Math.trunc(v2)) }))}
          ${numField('高(px)', b.h, (v2) => upItem({ h: Math.max(1, Math.trunc(v2)) }))}
          ${textField('回调函数名', b.cbName, (v2) => upItem({ cbName: v2 }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }

    // ---------- 附加值 ----------
    const b = item.bind;
    let bindBody: TemplateResult = html``;
    switch (b.type) {
      case 'none':
        bindBody = html`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;
        break;
      case 'value': {
        const v = vars.find((x) => x.id === b.varId);
        bindBody = html`
          ${varSelect('变量', b.varId, vars, (vid) => setBind({ type: 'value', varId: vid }))}
          ${!v ? quickCreateVar(store, (nv) => setBind({ type: 'value', varId: nv.id })) : nothing}
          ${varInfo(v)}
          ${item.kind === 'text' ? html`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>` : nothing}
        `;
        break;
      }
      case 'switch': {
        const v = vars.filter((x) => x.type === 'uint8').find((x) => x.id === b.varId)
          ?? vars.find((x) => x.id === b.varId);
        bindBody = html`
          ${varSelect('变量 (uint8)', b.varId, vars.filter((x) => x.type === 'uint8'), (vid) => setBind({ type: 'switch', varId: vid, openValue: b.openValue, onText: b.onText, offText: b.offText }))}
          ${!v ? quickCreateVar(store, (nv) => setBind({ type: 'switch', varId: nv.id, openValue: b.openValue, onText: b.onText, offText: b.offText })) : nothing}
          ${varInfo(v)}
          ${numField('openValue', b.openValue, (v2) => setBind({ type: 'switch', varId: b.varId, openValue: Math.max(0, Math.trunc(v2)), onText: b.onText, offText: b.offText }))}
          ${textField('"开"文本', b.onText, (v2) => setBind({ type: 'switch', varId: b.varId, openValue: b.openValue, onText: v2, offText: b.offText }))}
          ${textField('"关"文本', b.offText, (v2) => setBind({ type: 'switch', varId: b.varId, openValue: b.openValue, onText: b.onText, offText: v2 }))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case 'button':
        bindBody = html`
          ${textField('回调函数名', b.cbName, (v2) => setBind({ type: 'button', cbName: v2, buttonId: b.buttonId }))}
          ${numField('ID', b.buttonId, (v2) => setBind({ type: 'button', cbName: b.cbName, buttonId: Math.trunc(v2) }))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;
        break;
      case 'submenu':
        bindBody = html`
          ${selectField('目标页面', b.targetPageId ?? '', [
            { value: '', label: '（未设置）' },
            ...project.pages.filter((p) => p.id !== page.id).map((p) => ({ value: p.id, label: p.name })),
          ], (vid) => setBind({ type: 'submenu', targetPageId: vid || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;
        break;
      case 'back':
        bindBody = html`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;
        break;
    }

    body = html`
      <div class="ume-panel-title">绘制</div>
      ${drawBody}
      <div class="ume-panel-title">附加值</div>
      ${selectField('类型', b.type, (Object.keys(BIND_LABELS) as (keyof typeof BIND_LABELS)[])
        .map((k) => ({ value: k, label: BIND_LABELS[k] })), (t) => {
        const old = item.bind;
        // 切换附加值类型：保留可迁移的字段
        if (t === 'value') setBind({ type: 'value', varId: old.type === 'value' || old.type === 'switch' ? old.varId : lastBoundVarId });
        else if (t === 'switch') setBind({ type: 'switch', varId: old.type === 'value' || old.type === 'switch' ? old.varId : lastBoundVarId, openValue: 1, onText: 'on', offText: 'off' });
        else if (t === 'button') setBind({ type: 'button', cbName: 'btn_action_cb', buttonId: 1 });
        else if (t === 'submenu') setBind({ type: 'submenu', targetPageId: old.type === 'submenu' ? old.targetPageId : null });
        else setBind({ type: 'none' });
      })}
      ${bindBody}
    `;
  }

  render(html`
    ${title ? html`<div class="ume-panel-title"><span class="ume-kind-badge">${title}</span></div>` : nothing}
    ${body}
  `, el);
}
