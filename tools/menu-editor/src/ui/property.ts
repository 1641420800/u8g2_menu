import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type {
  Item, NumberItem, SwitchItem, ButtonItem, SubmenuItem, ChartItem,
  XbmItem, TextAreaItem, BoardItem, Variable,
} from '../types';
import { KIND_LABELS } from '../types';
import { numField, textField, selectField, checkField, areaField } from './common';

export interface XbmEditorHost {
  openXbmEditor(pageId: string, itemId: string): void;
}

const INT_SET = new Set(['uint8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'int']);
const TYPE_LABEL: Record<string, string> = {
  uint8: 'uint8', uint16: 'uint16', uint32: 'uint32', int8: 'int8', int16: 'int16',
  int32: 'int32', int: 'int', float: 'float', double: 'double',
};

/** 变量绑定下拉：list 为候选（已按类型过滤），bind 为空时显示占位 */
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

/** 新建变量快捷按钮：创建 int32 默认变量并立即绑定到条目 */
function quickCreateVar(store: EditorStoreApi, pageId: string, itemId: string): TemplateResult {
  return html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
      const v = store.getState().addVariable();
      store.getState().updateItem(pageId, itemId, { varId: v.id } as Partial<Item>);
    }}>＋ 新建变量并绑定</button>
  </div>`;
}

/** 绑定变量的参数摘要（提示在范围/步长于右侧「变量」区修改） */
function varInfo(v: Variable | undefined): TemplateResult {
  if (!v) return html`${nothing}`;
  return html`<div class="ume-hint">
    ${v.name} : ${TYPE_LABEL[v.type] ?? v.type}，范围 ${v.min}~${v.max}，步长 ${v.step}，初值 ${v.initialValue}
    （在右侧「变量」区修改）
  </div>`;
}

export function renderProperty(
  el: HTMLElement, store: EditorStoreApi, xbmHost: XbmEditorHost,
): void {
  const { project, selection } = store.getState();
  const page = project.pages.find((p) => p.id === selection.pageId) ?? null;
  const item = page?.items.find((i) => i.id === selection.itemId) ?? null;

  const upItem = (patch: Partial<Item>, key?: string) =>
    store.getState().updateItem(page!.id, item!.id, patch, key);

  let body: TemplateResult = html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`;
  let title = '属性';

  if (page && !item) {
    title = `页面属性`;
    body = html`
      ${textField('名称', page.name, (v) => store.getState().updatePage(page.id, { name: v }))}
      ${textField('C 函数名', page.fnName, (v) => store.getState().updatePage(page.id, { fnName: v }), '留空自动 page_N')}
      ${areaField('用户代码', page.userCodePre, (v) => store.getState().updatePage(page.id, { userCodePre: v }), true)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;
  } else if (page && item) {
    title = `${KIND_LABELS[item.kind]}`;
    switch (item.kind) {
      case 'text':
        body = html`
          ${textField('文本/格式', item.text, (v) => upItem({ text: v }, `text-${item.id}`))}
          ${selectField('大小', String(item.scale) as '1' | '2', [
            { value: '1', label: '正常' }, { value: '2', label: '二倍大' },
          ], (v) => upItem({ scale: Number(v) as 1 | 2 }))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      case 'number': {
        const n = item as NumberItem;
        const vars = project.variables ?? [];
        const v = vars.find((x) => x.id === n.varId);
        const fmtHint = v && (v.type === 'float' || v.type === 'double')
          ? 'float/double 推荐格式 %.1f / %.2f'
          : '整数推荐格式 %d（无符号用 %u）';
        body = html`
          ${varSelect('绑定变量', n.varId, vars, (vid) => upItem({ varId: vid } as Partial<Item>))}
          ${!v ? quickCreateVar(store, page.id, n.id) : nothing}
          ${checkField('可编辑（绑定附加值，取消则仅显示）', n.editable !== false, (c) => upItem({ editable: c } as Partial<Item>))}
          ${varInfo(v)}
          ${textField('显示文本', n.text, (v2) => upItem({ text: v2 }, `text-${item.id}`))}
          ${selectField('大小', String(n.scale) as '1' | '2', [
            { value: '1', label: '正常' }, { value: '2', label: '二倍大' },
          ], (v2) => upItem({ scale: Number(v2) as 1 | 2 }))}
          <div class="ume-hint">${fmtHint}；文本支持 \n 多行</div>
        `;
        break;
      }
      case 'switch': {
        const s = item as SwitchItem;
        const vars = (project.variables ?? []).filter((x) => x.type === 'uint8');
        const v = vars.find((x) => x.id === s.varId) ?? (project.variables ?? []).find((x) => x.id === s.varId);
        body = html`
          ${varSelect('绑定变量', s.varId, vars, (vid) => upItem({ varId: vid } as Partial<Item>))}
          ${!v ? quickCreateVar(store, page.id, s.id) : nothing}
          ${varInfo(v)}
          ${textField('显示文本', s.text, (v2) => upItem({ text: v2 }, `text-${item.id}`))}
          ${numField('openValue', s.openValue, (v2) => upItem({ openValue: Math.max(0, Math.trunc(v2)) }))}
          ${textField('"开"文本', s.onText, (v2) => upItem({ onText: v2 }))}
          ${textField('"关"文本', s.offText, (v2) => upItem({ offText: v2 }))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case 'button': {
        const b = item as ButtonItem;
        body = html`
          ${textField('显示文本', b.text, (v) => upItem({ text: v }, `text-${item.id}`))}
          ${textField('回调函数名', b.cbName, (v) => upItem({ cbName: v }))}
          ${numField('ID', b.buttonId, (v) => upItem({ buttonId: Math.trunc(v) }))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;
        break;
      }
      case 'submenu': {
        const sm = item as SubmenuItem;
        body = html`
          ${textField('显示文本', sm.text, (v) => upItem({ text: v }, `text-${item.id}`))}
          ${selectField('目标页面', sm.targetPageId ?? '', [
            { value: '', label: '（未设置）' },
            ...project.pages.filter((p) => p.id !== page.id).map((p) => ({ value: p.id, label: p.name })),
          ], (v) => upItem({ targetPageId: v || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;
        break;
      }
      case 'back': {
        body = html`
          ${textField('显示文本', item.text, (v) => upItem({ text: v }, `text-${item.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;
        break;
      }
      case 'slider':
      case 'progress': {
        const vars = (project.variables ?? []).filter((x) => INT_SET.has(x.type));
        const v = vars.find((x) => x.id === item.varId) ?? (project.variables ?? []).find((x) => x.id === item.varId);
        body = html`
          ${varSelect('绑定变量', item.varId, vars, (vid) => upItem({ varId: vid } as Partial<Item>))}
          ${!v ? quickCreateVar(store, page.id, item.id) : nothing}
          ${varInfo(v)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;
        break;
      }
      case 'chart': {
        const c = item as ChartItem;
        body = html`
          ${selectField('类型', c.chartKind, [
            { value: 'line', label: '折线图' }, { value: 'point', label: '散点图' }, { value: 'bar', label: '柱状图' },
          ], (v) => upItem({ chartKind: v }))}
          ${numField('数据点数', c.dataLen, (v) => upItem({ dataLen: Math.max(2, Math.trunc(v)) }))}
          ${numField('高度(px)', c.height, (v) => upItem({ height: Math.max(8, Math.trunc(v)) }))}
          ${selectField('示例数据', c.sample, [
            { value: 'sine', label: '正弦' }, { value: 'ramp', label: '斜坡' }, { value: 'noise', label: '伪随机' },
          ], (v) => upItem({ sample: v }))}
          ${numField('量程上限', c.max ?? 0, (v) => upItem({ max: v || undefined }), 'any')}
          ${numField('量程下限', c.min ?? 0, (v) => upItem({ min: v || undefined }), 'any')}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;
        break;
      }
      case 'xbm': {
        const x = item as XbmItem;
        body = html`
          ${textField('数组名', x.name, (v) => upItem({ name: v }))}
          ${numField('宽(px)', x.w, (v) => upItem({ w: Math.min(128, Math.max(1, Math.trunc(v))) }))}
          ${numField('高(px)', x.h, (v) => upItem({ h: Math.min(64, Math.max(1, Math.trunc(v))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => xbmHost.openXbmEditor(page.id, x.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${x.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case 'textarea': {
        const t = item as TextAreaItem;
        body = html`
          ${areaField('文本内容', t.content, (v) => upItem({ content: v }))}
          ${numField('高度(px)', t.height, (v) => upItem({ height: Math.max(10, Math.trunc(v)) }))}
          ${numField('行间距', t.lineSpacing, (v) => upItem({ lineSpacing: Math.max(0, Math.trunc(v)) }))}
          ${checkField('上下键滚动 (bind)', t.bindScroll, (v) => upItem({ bindScroll: v }))}
        `;
        break;
      }
      case 'board': {
        const b = item as BoardItem;
        body = html`
          ${numField('宽(px)', b.w, (v) => upItem({ w: Math.max(1, Math.trunc(v)) }))}
          ${numField('高(px)', b.h, (v) => upItem({ h: Math.max(1, Math.trunc(v)) }))}
          ${textField('回调函数名', b.cbName, (v) => upItem({ cbName: v }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
  }

  render(html`
    <div class="ume-panel-title">属性 ${title !== '属性' ? html`<span class="ume-kind-badge">${title}</span>` : nothing}</div>
    ${body}
  `, el);
}
