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
    private fontSig;
    private events;
    private lastKnownPage;
    /** 预览侧子集字体未能应用时的提示（生成代码时并入警告）；null = 应用正常或未开启取模 */
    fontApplyWarning: string | null;
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
    /** 应用子集字体到预览引擎；失败时记录 fontApplyWarning（供生成代码时并入警告） */
    private applyFontSubset;
    start(): void;
    stop(): void;
    private renderFrame;
    key(k: MenuKey): void;
    /** 预览跳转到指定页（不经过子页面链路） */
    navTo(pageIdx: number): void;
    /** 读取内置字体原始字节（现场取模的源数据） */
    getFontBytes(idx: number): Uint8Array | null;
    /** 字形拉取器：从 WASM 真库逐字获取原始条目（与渲染同一路径） */
    glyphFetcher(fontIdx: number): ((encoding: number) => Uint8Array | null) | null;
    /** 加载自定义（子集）字体并切换；超出槽位容量返回 false */
    useCustomFont(bytes: Uint8Array): boolean;
    /** 读取值池槽位的实时值（绑定变量的条目：槽位 = 变量在池中的下标） */
    getInt(slot: number): number;
    getSwitch(slot: number): number;
    destroy(): void;
}
export { FONTS };
