import type {
  Item, ItemKind, Page, Project, XbmItem, NumberItem, ChartItem, BoardItem,
} from './types';

let idSeq = 0;
export function genId(prefix: string): string {
  idSeq = (idSeq + 1) % 1e9;
  return `${prefix}_${Date.now().toString(36)}_${idSeq.toString(36)}`;
}

export function createItem(kind: ItemKind): Item {
  const base = { id: genId('it'), label: '' };
  switch (kind) {
    case 'text':
      return { ...base, kind, text: '菜单项', scale: 1 };
    case 'number':
      return {
        ...base, kind, text: 'v:%d', scale: 1,
        varType: 'int32', varName: 'var_value', step: 1, min: 0, max: 100,
        decimals: 1, initialValue: 50,
      } satisfies NumberItem;
    case 'switch':
      return {
        ...base, kind, text: 's:%s', scale: 1,
        varName: 'var_switch', openValue: 1, onText: 'on', offText: 'off', initialValue: 0,
      };
    case 'button':
      return { ...base, kind, text: '执行操作', scale: 1, cbName: 'btn_action_cb', buttonId: 1 };
    case 'submenu':
      return { ...base, kind, text: '下一级', scale: 1, targetPageId: null };
    case 'back':
      return { ...base, kind, text: '返回', scale: 1 };
    case 'slider':
      return { ...base, kind, varName: 'var_slider', step: 2, min: 0, max: 100, initialValue: 50 };
    case 'progress':
      return { ...base, kind, varName: 'var_prog', step: 2, min: 0, max: 100, initialValue: 70 };
    case 'chart':
      return {
        ...base, kind, chartKind: 'line', dataLen: 24, height: 32, sample: 'sine',
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
    id: genId('it'), kind: 'xbm', label: '',
    name: 'icon', w, h, bits: new Array(bytes * h).fill(0),
  };
}

export function createPage(name: string): Page {
  return { id: genId('pg'), name, fnName: '', items: [], userCodePre: '' };
}

/** 覆盖条目的公共字段（类型收窄辅助） */
function withFields<T extends Item>(it: Item, patch: Partial<T>): T {
  return { ...it, ...patch } as T;
}

export function createProject(): Project {
  const main = createPage('主页');
  main.items = [
    withFields(createItem('text'), { text: 'u8g2_menu' }),
    withFields(createItem('submenu'), { text: '系统设置' }),
    withFields(createItem('button'), { text: '关于', cbName: 'btn_about_cb' }),
  ];
  const settings = createPage('设置');
  settings.items = [
    withFields(createItem('number'), { text: '音量:%d' }),
    withFields(createItem('switch'), { text: '开关:%s' }),
    createItem('slider'),
    createItem('back'),
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
    pages: [main, settings],
  };
  // 子页面指向
  (main.items[1] as { targetPageId: string | null }).targetPageId = settings.id;
  return proj;
}

/** 递归查找所有子页面引用（用于删除页面时的保护） */
export function findSubmenuRefs(project: Project, pageId: string): { page: Page; item: Item }[] {
  const refs: { page: Page; item: Item }[] = [];
  for (const p of project.pages) {
    for (const it of p.items) {
      if (it.kind === 'submenu' && it.targetPageId === pageId) refs.push({ page: p, item: it });
    }
  }
  return refs;
}

export function cloneProject(p: Project): Project {
  return structuredClone(p);
}
