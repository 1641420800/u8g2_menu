import type { Item, ItemKind, Page, Project, XbmItem, Variable } from './types';
export declare function genId(prefix: string): string;
export declare function createVariable(partial?: Partial<Variable>): Variable;
/** 唯一变量名：base, base_2, base_3... */
export declare function uniqueVarName(existing: Variable[], base: string): string;
export declare function createItem(kind: ItemKind): Item;
export declare function createXbm(w: number, h: number): XbmItem & {
    label: string;
};
export declare function createPage(name: string): Page;
export declare function createProject(): Project;
/** 递归查找所有子页面引用（用于删除页面时的保护） */
export declare function findSubmenuRefs(project: Project, pageId: string): {
    page: Page;
    item: Item;
}[];
export declare function cloneProject(p: Project): Project;
