import { html, render, nothing, type TemplateResult } from 'lit-html';
import type { EditorStoreApi } from '../store';
import type {
  Item, NumberItem, SwitchItem, ButtonItem, SubmenuItem, ChartItem,
  XbmItem, TextAreaItem, BoardItem, NumVarType,
} from '../types';
import { KIND_LABELS } from '../types';
import { numField, textField, selectField, checkField, areaField } from './common';

const INT_TYPES: { value: NumVarType; label: string }[] = [
  { value: 'uint8', label: 'uint8' }, { value: 'uint16', label: 'uint16' },
  { value: 'uint32', label: 'uint32' }, { value: 'int8', label: 'int8' },
  { value: 'int16', label: 'int16' }, { value: 'int32', label: 'int32' },
  { value: 'int', label: 'int' },
];
const NUM_TYPES: { value: NumVarType; label: string }[] = [
  ...INT_TYPES, { value: 'float', label: 'float' }, { value: 'double', label: 'double' },
];

export interface XbmEditorHost {
  openXbmEditor(pageId: string, itemId: string): void;
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
        const isFloat = n.varType === 'float' || n.varType === 'double';
        body = html`
          ${selectField('变量类型', n.varType, NUM_TYPES, (v) => upItem({ varType: v }))}
          ${textField('变量名', n.varName, (v) => upItem({ varName: v }))}
          ${textField('显示文本', n.text, (v) => upItem({ text: v }, `text-${item.id}`))}
          ${numField('步长', n.step, (v) => upItem({ step: v }), 'any')}
          ${numField('最小值', n.min, (v) => upItem({ min: v }), 'any')}
          ${numField('最大值', n.max, (v) => upItem({ max: v }), 'any')}
          ${numField('初始值', n.initialValue, (v) => upItem({ initialValue: v }), 'any')}
          ${isFloat ? numField('小数位', n.decimals, (v) => upItem({ decimals: Math.max(0, Math.trunc(v)) })) : nothing}
          ${selectField('大小', String(n.scale) as '1' | '2', [
            { value: '1', label: '正常' }, { value: '2', label: '二倍大' },
          ], (v) => upItem({ scale: Number(v) as 1 | 2 }))}
          <div class="ume-hint">int 建议 %d/%u，float 建议 %.Nf</div>
        `;
        break;
      }
      case 'switch': {
        const s = item as SwitchItem;
        body = html`
          ${textField('变量名', s.varName, (v) => upItem({ varName: v }))}
          ${textField('显示文本', s.text, (v) => upItem({ text: v }, `text-${item.id}`))}
          ${numField('openValue', s.openValue, (v) => upItem({ openValue: Math.max(0, Math.trunc(v)) }))}
          ${textField('"开"文本', s.onText, (v) => upItem({ onText: v }))}
          ${textField('"关"文本', s.offText, (v) => upItem({ offText: v }))}
          ${numField('初始值', s.initialValue, (v) => upItem({ initialValue: Math.trunc(v) }))}
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
        const p = item;
        body = html`
          ${textField('变量名 (int)', p.varName, (v) => upItem({ varName: v }))}
          ${numField('步长', p.step, (v) => upItem({ step: Math.trunc(v) }))}
          ${numField('最小值', p.min, (v) => upItem({ min: Math.trunc(v) }))}
          ${numField('最大值', p.max, (v) => upItem({ max: Math.trunc(v) }))}
          ${numField('初始值', p.initialValue, (v) => upItem({ initialValue: Math.trunc(v) }))}
          <div class="ume-hint">绑定 u8g2_MenuDrawItem${p.kind === 'slider' ? 'Slider' : 'ProgressBar'}_bind</div>
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
