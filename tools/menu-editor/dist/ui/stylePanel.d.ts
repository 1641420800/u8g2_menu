import type { EditorStoreApi } from '../store';
export declare function renderStyle(el: HTMLElement, store: EditorStoreApi, preview: {
    showMsgbox(text: string, timeout: number): void;
    closeMsgbox(): void;
    ready: boolean;
}): void;
export declare function nothingUnused(): void;
