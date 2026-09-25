import type { Project } from '../types';
import { FONTS } from '../types';
/** u8g2_menu 按键枚举值（与 u8g2_menu.h 对应） */
export declare enum MenuKey {
    None = 0,
    Up = 1,
    Down = 2,
    Enter = 3,
    Return = 4,
    Add = 5,
    Sub = 6
}
export declare const MENU_KEY_NAMES: Record<number, string>;
export interface PreviewEvents {
    /** 预览内发生了子页面跳转（同步左侧树高亮） */
    onPageChanged?: (page: number) => void;
    /** 预览内按钮条目被触发 */
    onButton?: (buttonId: number) => void;
}
export declare class WasmPreview {
    readonly canvas: HTMLCanvasElement;
    private ctx;
    private mod;
    private img;
    private raf;
    private lastT;
    private running;
    private fontIndexCache;
    private structSig;
    private events;
    private lastKnownPage;
    constructor(container: HTMLElement, events?: PreviewEvents);
    /** 加载 WASM 引擎（幂等） */
    load(wasmUrl: string): Promise<void>;
    get ready(): boolean;
    /** 预览当前所在页（用户在预览里跳转子页面后由此得知） */
    get currentPage(): number;
    fontIndex(name: string): number;
    /** 结构签名：只有页面/条目结构或资源尺寸变化才重置资源池（保留预览中的编辑值） */
    private signature;
    /** 全量同步编辑器模型到预览引擎 */
    sync(project: Project): void;
    start(): void;
    stop(): void;
    private renderFrame;
    key(k: MenuKey): void;
    /** 读取预览中某槽位的实时值（数值/滑条/进度条条目） */
    getInt(page: number, idx: number): number;
    getSwitch(page: number, idx: number): number;
    destroy(): void;
}
export { FONTS };
