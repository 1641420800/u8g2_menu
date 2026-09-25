import { createStore, type StoreApi } from 'zustand/vanilla';
import type { Item, ItemKind, Page, Project, Variable } from './types';
import { createProject, cloneProject, genId, createItem, createVariable, uniqueVarName } from './model';

export interface Selection {
  pageId: string | null;
  itemId: string | null;
}

interface EditorState {
  project: Project;
  selection: Selection;
  past: Project[];
  future: Project[];
  /** 脏标记：有未导出/未保存的修改 */
  dirty: boolean;
}

export interface EditorStore extends EditorState {
  /** 通用提交：mutate(state.project)。coalesceKey 相同且间隔 < 800ms 时合并历史 */
  update: (mutate: (p: Project) => void, coalesceKey?: string) => void;
  undo: () => void;
  redo: () => void;
  select: (pageId: string | null, itemId?: string | null) => void;

  addPage: (name?: string) => Page;
  removePage: (pageId: string) => void;
  movePage: (pageId: string, dir: -1 | 1) => void;
  updatePage: (pageId: string, patch: Partial<Page>) => void;

  addItem: (kind: ItemKind, pageId?: string) => Item | null;
  removeItem: (pageId: string, itemId: string) => void;
  moveItem: (pageId: string, itemId: string, dir: -1 | 1) => void;
  duplicateItem: (pageId: string, itemId: string) => void;
  updateItem: (pageId: string, itemId: string, patch: Partial<Item>, coalesceKey?: string) => void;

  /** 新建变量（自动唯一命名），返回新变量 */
  addVariable: (partial?: Partial<Variable>) => Variable;
  /** 删除变量；被条目引用时返回引用数且不删除 */
  removeVariable: (varId: string) => number;
  updateVariable: (varId: string, patch: Partial<Variable>, coalesceKey?: string) => void;
}

const COALESCE_MS = 800;

export function createEditorStore() {
  let lastCoalesceKey: string | null = null;
  let lastCoalesceTime = 0;

  return createStore<EditorStore>()((set, get) => ({
  project: createProject(),
  selection: { pageId: null, itemId: null },
  past: [],
  future: [],
  dirty: false,

  update: (mutate, coalesceKey) => {
    const now = Date.now();
    const merge = !!coalesceKey
      && coalesceKey === lastCoalesceKey
      && now - lastCoalesceTime < COALESCE_MS;
    lastCoalesceKey = coalesceKey ?? null;
    lastCoalesceTime = now;

    set((s) => {
      const next = cloneProject(s.project);
      mutate(next);
      return {
        project: next,
        dirty: true,
        past: merge ? s.past : [...s.past.slice(-99), s.project],
        future: [],
      };
    });
  },

  undo: () => {
    set((s) => {
      if (!s.past.length) return s;
      const prev = s.past[s.past.length - 1];
      return {
        project: prev,
        past: s.past.slice(0, -1),
        future: [s.project, ...s.future.slice(0, 99)],
        dirty: true,
      };
    });
  },

  redo: () => {
    set((s) => {
      if (!s.future.length) return s;
      const [next, ...rest] = s.future;
      return {
        project: next,
        past: [...s.past, s.project],
        future: rest,
        dirty: true,
      };
    });
  },

  select: (pageId, itemId = null) => set({ selection: { pageId, itemId } }),

  addPage: (name) => {
    const page: Page = { id: genId('pg'), name: name ?? `页面${get().project.pages.length + 1}`, fnName: '', items: [], userCodePre: '' };
    get().update((p) => { p.pages.push(page); });
    set({ selection: { pageId: page.id, itemId: null } });
    return page;
  },

  removePage: (pageId) => {
    get().update((p) => {
      p.pages = p.pages.filter((pg) => pg.id !== pageId);
      // 清理指向该页面的子页面引用
      for (const pg of p.pages) {
        for (const it of pg.items) {
          if (it.kind === 'submenu' && it.targetPageId === pageId) it.targetPageId = null;
        }
      }
    });
    const { selection } = get();
    if (selection.pageId === pageId) set({ selection: { pageId: null, itemId: null } });
  },

  movePage: (pageId, dir) => {
    get().update((p) => {
      const i = p.pages.findIndex((pg) => pg.id === pageId);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= p.pages.length) return;
      [p.pages[i], p.pages[j]] = [p.pages[j], p.pages[i]];
    });
  },

  updatePage: (pageId, patch) => {
    get().update((p) => {
      const pg = p.pages.find((x) => x.id === pageId);
      if (pg) Object.assign(pg, patch);
    });
  },

  addItem: (kind, pageId) => {
    const target = pageId ?? get().selection.pageId ?? get().project.pages[0]?.id;
    if (!target) return null;
    const item = newItem(kind);
    get().update((p) => {
      const pg = p.pages.find((x) => x.id === target);
      pg?.items.push(item);
    });
    set({ selection: { pageId: target, itemId: item.id } });
    return item;
  },

  removeItem: (pageId, itemId) => {
    get().update((p) => {
      const pg = p.pages.find((x) => x.id === pageId);
      if (pg) pg.items = pg.items.filter((it) => it.id !== itemId);
    });
    const { selection } = get();
    if (selection.itemId === itemId) set({ selection: { pageId, itemId: null } });
  },

  moveItem: (pageId, itemId, dir) => {
    get().update((p) => {
      const pg = p.pages.find((x) => x.id === pageId);
      if (!pg) return;
      const i = pg.items.findIndex((it) => it.id === itemId);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= pg.items.length) return;
      [pg.items[i], pg.items[j]] = [pg.items[j], pg.items[i]];
    });
  },

  duplicateItem: (pageId, itemId) => {
    let copied: Item | null = null;
    get().update((p) => {
      const pg = p.pages.find((x) => x.id === pageId);
      if (!pg) return;
      const i = pg.items.findIndex((it) => it.id === itemId);
      if (i < 0) return;
      copied = structuredClone(pg.items[i]);
      (copied as Item).id = genId('it');
      pg.items.splice(i + 1, 0, copied);
    });
    if (copied) set({ selection: { pageId, itemId: (copied as Item).id } });
  },

  updateItem: (pageId, itemId, patch, coalesceKey) => {
    get().update((p) => {
      const pg = p.pages.find((x) => x.id === pageId);
      const it = pg?.items.find((x) => x.id === itemId);
      if (it) Object.assign(it, patch);
    }, coalesceKey);
  },

  addVariable: (partial) => {
    let created: Variable | null = null;
    get().update((p) => {
      p.variables = p.variables ?? [];
      const name = uniqueVarName(p.variables, partial?.name ?? 'var_new');
      created = createVariable({ ...partial, name });
      p.variables.push(created);
    });
    return created!;
  },

  removeVariable: (varId) => {
    let refs = 0;
    for (const pg of get().project.pages) {
      for (const it of pg.items) {
        if ('varId' in it && it.varId === varId) refs++;
      }
    }
    if (refs > 0) return refs;
    get().update((p) => {
      p.variables = (p.variables ?? []).filter((v) => v.id !== varId);
    });
    return 0;
  },

  updateVariable: (varId, patch, coalesceKey) => {
    get().update((p) => {
      const v = (p.variables ?? []).find((x) => x.id === varId);
      if (v) Object.assign(v, patch);
    }, coalesceKey);
  },
  }));
}

/** 默认单例（多数集成场景只有一个编辑器实例） */
export const store = createEditorStore();

export type EditorStoreApi = StoreApi<EditorStore>;

function newItem(kind: ItemKind): Item {
  return createItem(kind);
}
