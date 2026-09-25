import type { EditorStoreApi } from '../store';
/**
 * XBM 位图编辑器：像素网格 + 拖拽绘制 + 尺寸调整。
 * 位序与 XBM 一致：byte[y * ceil(w/8) + (x >> 3)] 的 bit (x & 7)（LSB 在前）。
 */
export declare function openXbmEditor(host: HTMLElement, store: EditorStoreApi, pageId: string, itemId: string): void;
