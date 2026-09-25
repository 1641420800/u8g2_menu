import type { EditorStoreApi } from '../store';
export interface XbmEditorHost {
    openXbmEditor(pageId: string, itemId: string): void;
}
export declare function renderProperty(el: HTMLElement, store: EditorStoreApi, xbmHost: XbmEditorHost): void;
