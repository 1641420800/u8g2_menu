// 诊断 Unicode 表结构：用短超时安全的独立脚本
import { readFileSync } from 'node:fs';
const b = readFileSync('tests/fixtures/u8g2_font_wqy12_t_gb2312.bin');

// 关键问题：485 起的 4 字节序列是不是查找表？
// 表条目按库语义是 [delta:2][bound:2]，do-while 从表起点读，
// delta 相对『当前 chunk 指针』。我们 dump 485..600 找 0x83DC 附近的 bound：
// '菜' = 0x83DC，跳查会停在第一个 bound >= 0x83DC 的条目。
// 假如表在 485，扫描每 4 字节为 [d][bound] 找 bound ∈ [0x4e00..0x9fa5] 且递增的段落：
let runs = [];
let runStart = -1;
let prev = 0;
for (let off = 485; off < 3000; off += 4) {
  const bound = (b[off + 2] << 8) | b[off + 3];
  const isPlausible = bound >= 0x2000 && bound <= 0xffff;
  if (isPlausible && bound > prev) {
    if (runStart < 0) runStart = off;
    prev = bound;
  } else {
    if (runStart >= 0 && off - runStart >= 40) {
      runs.push([runStart, off - runStart, prev]);
    }
    runStart = -1;
    prev = 0;
  }
}
console.log('递增 bound 区段（疑似表）:', runs.slice(0, 5).map(([s, n, last]) => `@${s} len=${n} lastBound=0x${last.toString(16)}`));

// 另一角度：头 start_pos_unicode=1355。库的 font 基址是数据段（+23 后），
// 所以表应在绝对 23+1355=1378。dump 1378 附近按 [bound:2][delta:2]（交换字段序）看：
let t = 1378;
const rows = [];
for (let k = 0; k < 6; k++) {
  const f0 = (b[t] << 8) | b[t + 1];
  const f1 = (b[t + 2] << 8) | b[t + 3];
  rows.push(`@${t}: [${f0}, ${f1}] = 0x${f0.toString(16)}, 0x${f1.toString(16)}`);
  t += 4;
}
console.log(rows.join('\n'));

// 若表条目实为 [bound:2][delta:2]（bound 在前），1355/1378 哪个是表？
// 检查 1378 起是否 bound(=第一字)递增：
t = 1378;
let inc = true;
let lastB = 0;
for (let k = 0; k < 10; k++) {
  const bound = (b[t] << 8) | b[t + 1];
  if (bound <= lastB) { inc = false; break; }
  lastB = bound;
  t += 4;
}
console.log('1378 起按 [bound,delta] 读是否递增:', inc, 'lastBound=0x' + lastB.toString(16));
