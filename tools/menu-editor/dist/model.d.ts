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
/** 附加值引用查找（用于删除页面时的保护） */
export declare function findSubmenuRefs(project: Project, pageId: string): {
    page: Page;
    item: Item;
}[];
export declare function cloneProject(p: Project): Project;
