/**
 * 字符集扫描：收集工程内所有会显示出来的文字编码。
 * 覆盖：文本条目（含 printf 格式串）、文本区内容、开关 on/off 文本；
 * 另固定保留 ASCII 可打印集（数字/字母/标点，printf 输出数值必需）。
 */
import type { Project } from '../types';
import { asciiPrintable, charsOf } from './u8g2font';

export function scanCharset(project: Project, extra: string): Set<number> {
  const set = new Set<number>(asciiPrintable());
  const add = (s: string) => { for (const n of charsOf(s)) set.add(n); };
  for (const pg of project.pages) {
    for (const it of pg.items) {
      if (it.kind === 'text') add(it.text);
      if (it.kind === 'textarea') add(it.content);
      if (it.bind.type === 'switch') { add(it.bind.onText); add(it.bind.offText); }
    }
  }
  add(extra);
  set.delete(0x0a); set.delete(0x0d); // 换行不是字形
  return set;
}

/** 统计信息（设置面板展示用） */
export function charsetStats(set: Set<number>): { total: number; ascii: number; cjk: number } {
  let ascii = 0;
  let cjk = 0;
  for (const n of set) (n <= 0x7e ? ascii++ : cjk++);
  return { total: set.size, ascii, cjk };
}
