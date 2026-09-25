import { type StoreApi } from 'zustand/vanilla';
import type { Item, ItemKind, Page, Project } from './types';
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
}
export declare function createEditorStore(): StoreApi<EditorStore>;
/** 默认单例（多数集成场景只有一个编辑器实例） */
export declare const store: StoreApi<EditorStore>;
export type EditorStoreApi = StoreApi<EditorStore>;
export {};
