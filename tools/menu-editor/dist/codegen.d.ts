import type { Project } from './types';
export interface CodegenResult {
    /** 单文件 menu_pages.c（含页面/变量/回调的 extern 速查注释） */
    c: string;
    warnings: string[];
}
export declare function toCIdent(s: string, fallback?: string): string;
/** C89/C99 关键字与保留标识符（标识符冲突检查用） */
export declare const C_KEYWORDS: ReadonlySet<string>;
/** 合法且非关键字的 C 标识符（UI 内联校验用） */
export declare function isCIdentifier(s: string): boolean;
export declare function cstr(s: string): string;
/** 提取旧文件里 USER CODE 区内容（按标记名索引） */
export declare function extractUserBlocks(text: string): Map<string, string>;
export declare function generateCode(project: Project, preserve?: {
    c?: string;
}, 
/** 现场取模：工程文本子集字体字节；提供时生成 menu_font[] 数组，否则引用所选内置字体 */
fontSubset?: Uint8Array): CodegenResult;
