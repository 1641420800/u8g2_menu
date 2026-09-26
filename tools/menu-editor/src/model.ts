import type {
  Item, ItemKind, Page, Project, XbmItem, TextItem, SliderItem, ProgressItem,
  ChartItem, BoardItem, Variable, ChartBuffer,
} from './types';

let idSeq = 0;
export function genId(prefix: string): string {
  idSeq = (idSeq + 1) % 1e9;
  return `${prefix}_${Date.now().toString(36)}_${idSeq.toString(36)}`;
}

export function createVariable(partial?: Partial<Variable>): Variable {
  return {
    id: genId('vb'),
    name: 'var_new',
    type: 'int32',
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
    ...partial,
  };
}

export function createChartBuffer(partial?: Partial<ChartBuffer>): ChartBuffer {
  return {
    id: genId('buf'),
    name: 'buf_new',
    dataLen: 32,
    sample: 'sine',
    ...partial,
  };
}

/** 唯一缓冲区名：base, base_2, base_3... */
export function uniqueBufName(existing: ChartBuffer[], base: string): string {
  const used = new Set(existing.map((v) => v.name));
  if (!used.has(base)) return base;
  let i = 2;
  while (used.has(`${base}_${i}`)) i++;
  return `${base}_${i}`;
}

/** 唯一变量名：base, base_2, base_3... */
export function uniqueVarName(existing: Variable[], base: string): string {
  const used = new Set(existing.map((v) => v.name));
  if (!used.has(base)) return base;
  let i = 2;
  while (used.has(`${base}_${i}`)) i++;
  return `${base}_${i}`;
}

export function createItem(kind: ItemKind): Item {
  const base = { id: genId('it'), label: '', bind: { type: 'none' } as Item['bind'] };
  switch (kind) {
    case 'text':
      return { ...base, kind, text: '菜单项', scale: 1, displayVarId: null } satisfies TextItem;
    case 'slider':
      return { ...base, kind, position: 50 } satisfies SliderItem;
    case 'progress':
      return { ...base, kind, position: 50 } satisfies ProgressItem;
    case 'chart':
      return {
        ...base, kind, sources: [], height: 32,
      } satisfies ChartItem;
    case 'xbm':
      return createXbm(16, 16);
    case 'textarea':
      return {
        ...base, kind, content: '这是一段较长的说明文本，\n会自动换行并支持滚动浏览。',
        height: 40, bindScroll: true, lineSpacing: 0,
      };
    case 'board':
      return { ...base, kind, w: 64, h: 32, cbName: 'board_cb' } satisfies BoardItem;
  }
}

export function createXbm(w: number, h: number): XbmItem & { label: string } {
  const bytes = Math.ceil(w / 8);
  return {
    id: genId('it'), kind: 'xbm', label: '', bind: { type: 'none' },
    name: 'icon', w, h, bits: new Array(bytes * h).fill(0),
  };
}

export function createPage(name: string): Page {
  return { id: genId('pg'), name, fnName: '', items: [] };
}

/** 覆盖条目的公共字段（类型收窄辅助） */
function withFields<T extends Item>(it: Item, patch: Partial<T>): T {
  return { ...it, ...patch } as T;
}

/** 设置条目附加值（withFields 的别名，语义区分用） */
function withBind<T extends Item>(it: Item, patch: Partial<T>): T {
  return { ...it, ...patch } as T;
}

export function createProject(): Project {
  const variables: Variable[] = [
    createVariable({ name: 'var_value', type: 'int32', initialValue: 50, min: 0, max: 100, step: 1 }),
    createVariable({ name: 'var_switch', type: 'uint8', initialValue: 0, min: 0, max: 1, step: 1 }),
    createVariable({ name: 'var_slider', type: 'int32', initialValue: 50, min: 0, max: 100, step: 2 }),
  ];
  const chartBuffers: ChartBuffer[] = [
    createChartBuffer({ name: 'buf_demo', dataLen: 32, sample: 'sine' }),
  ];
  const main = createPage('主页');
  main.items = [
    withFields(createItem('text'), { text: 'u8g2_menu' }),
    withBind(createItem('text'), { text: '系统设置', bind: { type: 'submenu', targetPageId: null } }),
    withBind(createItem('text'), { text: '关于', bind: { type: 'button', cbName: 'btn_about_cb', buttonId: 1 } }),
  ];
  const settings = createPage('设置');
  settings.items = [
    withBind(withFields(createItem('text'), { text: '音量:%d' }), { bind: { type: 'value', varId: variables[0].id } }),
    withBind(withFields(createItem('text'), { text: '开关:%s' }), {
      bind: { type: 'switch', varId: variables[1].id, openValue: 1, onText: 'on', offText: 'off' },
    }),
    withBind(createItem('slider'), { bind: { type: 'value', varId: variables[2].id } }),
    withBind(createItem('text'), { text: '图表', bind: { type: 'submenu', targetPageId: null } }),
    withBind(createItem('text'), { text: '返回', bind: { type: 'back' } }),
  ];
  const chartPage = createPage('图表');
  chartPage.items = [
    withFields(createItem('chart'), {
      height: 36,
      sources: [{ bufferId: chartBuffers[0].id, chartKind: 'line' }],
    }),
    withBind(createItem('text'), { text: '返回', bind: { type: 'back' } }),
  ];
  const proj: Project = {
    version: 1,
    name: '我的菜单',
    width: 128,
    height: 64,
    font: 'u8g2_font_wqy12_t_gb2312',
    selector: 'rotundity',
    selectorLeftMargin: 16,
    selectorTopMargin: 0,
    selectorLineSpacing: 0,
    marqueeSpeed: 0.2,
    marqueeHeaderLen: 5,
    weakHooks: [],
    fontSubset: true,
    fontExtra: '',
    variables,
    chartBuffers,
    pages: [main, settings, chartPage],
  };
  // 子页面指向
  (main.items[1].bind as { targetPageId: string | null }).targetPageId = settings.id;
  (settings.items[3].bind as { targetPageId: string | null }).targetPageId = chartPage.id;
  return proj;
}

export function cloneProject(p: Project): Project {
  return structuredClone(p);
}
