import type { Item, ItemKind, Page, Project, XbmItem, Variable, ChartBuffer } from './types';
export declare function genId(prefix: string): string;
export declare function createVariable(partial?: Partial<Variable>): Variable;
export declare function createChartBuffer(partial?: Partial<ChartBuffer>): ChartBuffer;
/** 唯一缓冲区名：base, base_2, base_3... */
export declare function uniqueBufName(existing: ChartBuffer[], base: string): string;
/** 唯一变量名：base, base_2, base_3... */
export declare function uniqueVarName(existing: Variable[], base: string): string;
export declare function createItem(kind: ItemKind): Item;
export declare function createXbm(w: number, h: number): XbmItem & {
    label: string;
};
export declare function createPage(name: string): Page;
export declare function createProject(): Project;
export declare function cloneProject(p: Project): Project;
export interface CallbackRef {
    pageId: string;
    itemId: string;
    /** 引用处的显示名：页面名 / 条目名 */
    pageName: string;
    label: string;
}
export interface CallbackResource {
    /** 回调函数名（同时作为聚合键） */
    name: string;
    /** 被按钮附加值使用 */
    asButton: boolean;
    /** 被画板条目使用 */
    asBoard: boolean;
    refs: CallbackRef[];
}
/** 收集工程内所有回调函数资源（按钮附加值回调 + 画板回调），按名字聚合 */
export declare function collectCallbacks(project: Project): CallbackResource[];
