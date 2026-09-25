/**
 * 从仓库内置的 u8g2_fonts.c 中按名字提取字体定义，生成 genfonts.c
 * （避免把整个 31MB 字体库编进 WASM）
 *
 * 用法: node extract-fonts.mjs <u8g2_fonts.c> <输出:genfonts.c> <font1> <font2> ...
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , srcPath, outPath, ...fontNames] = process.argv;
if (!srcPath || !outPath || fontNames.length === 0) {
  console.error('用法: node extract-fonts.mjs <u8g2_fonts.c> <genfonts.c> <font...>');
  process.exit(1);
}

// latin1 读入保证字节保真（源文件为纯 ASCII 转义序列）
const src = readFileSync(srcPath, 'latin1');
const defs = [];

for (const name of fontNames) {
  const start = src.indexOf(`const uint8_t ${name}[`);
  if (start < 0) {
    console.error(`错误: 字体未找到: ${name}`);
    process.exit(1);
  }
  // 状态机解析相邻字符串字面量：转义感知；一个字面量的结束引号若在跳过
  // 空白后遇到下一个 '"'，说明还有后续字面量；否则即定义结束，其后为 ';'
  const eq = src.indexOf('=', start);
  let i = eq;
  let end = -1;
  while (i < src.length) {
    const c = src[i];
    if (c === '"') {
      // 引号：先处理转义（回到循环内判断）
      let j = i + 1;
      let closed = false;
      while (j < src.length) {
        const d = src[j];
        if (d === '\\') { j += 2; continue; }
        if (d === '"') { closed = true; break; }
        j += 1;
      }
      if (!closed) {
        console.error(`错误: 字面量未闭合: ${name}`);
        process.exit(1);
      }
      // closed 引号在 j，前瞻判断是否还有后续相邻字面量
      let k = j + 1;
      while (k < src.length && /\s/.test(src[k])) k += 1;
      if (src[k] === '"') {
        i = k;
        continue;
      }
      end = j;
      break;
    }
    i += 1;
  }
  if (end < 0) {
    console.error(`错误: 字体定义未闭合: ${name}`);
    process.exit(1);
  }
  const semi = src.indexOf(';', end);
  defs.push(src.slice(start, semi + 1));
}

const out = `/* 由 tools/menu-editor/wasm/extract-fonts.mjs 自动生成，勿手改 */
#include "u8g2.h"

${defs.join('\n\n')}

const uint8_t * const em_fonts[] = {
${fontNames.map((n) => `    ${n},`).join('\n')}
};

const char * const em_font_names[] = {
${fontNames.map((n) => `    "${n}",`).join('\n')}
};

const int em_font_count = ${fontNames.length};
`;

writeFileSync(outPath, out, 'latin1');
console.log(`已提取 ${fontNames.length} 个字体 -> ${outPath}`);
