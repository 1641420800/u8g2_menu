import { type CodegenResult } from './codegen';
import { MenuKey } from './preview/preview';
import type { Project } from './types';
export interface MenuEditorOptions {
    /** 初始工程数据（JSON 字符串或对象）；缺省时尝试 localStorage 恢复，再缺省用内置示例 */
    data?: unknown;
    /** 预览引擎脚本地址（u8g2-menu-preview.js，同目录需有 .wasm） */
    wasmUrl?: string;
    /** localStorage 自动保存键；传 null 关闭持久化 */
    persistKey?: string | null;
    /** 模型变化回调（防抖 300ms） */
    onChange?: (data: Project) => void;
    /** 生成代码回调 */
    onExport?: (result: CodegenResult) => void;
}
export declare class MenuEditor {
    private store;
    private container;
    private opts;
    private preview;
    private els;
    private renderScheduled;
    private saveTimer;
    private changeTimer;
    private liveTimer;
    private lastExport;
    private destroyed;
    private activateRightTab;
    constructor(container: HTMLElement, opts?: MenuEditorOptions);
    getData(): Project;
    loadData(data: unknown): void;
    /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
    generate(): CodegenResult;
    downloadC(): void;
    /** 生成路径（generate/downloadC 共用）：现场取模 + 警告收口 + 保留 USER CODE */
    private produceCode;
    /** 现场取模：从 WASM 真库逐字拉取字形，生成子集字体 */
    private buildFontSubset;
    destroy(): void;
    private onKeyDown;
    private onPreviewPageChanged;
    private persist;
    private notifyChange;
    private scheduleRender;
    private updateLiveInfo;
}
export { MenuKey };
