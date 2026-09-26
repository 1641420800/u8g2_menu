/**
 * 字符集扫描：收集工程内所有会显示出来的文字编码。
 * 覆盖：文本条目（含 printf 格式串）、文本区内容、开关 on/off 文本；
 * 另固定保留 ASCII 可打印集（数字/字母/标点，printf 输出数值必需）。
 */
import type { Project } from '../types';
export declare function scanCharset(project: Project, extra: string): Set<number>;
/** 统计信息（设置面板展示用） */
export declare function charsetStats(set: Set<number>): {
    total: number;
    ascii: number;
    cjk: number;
};
