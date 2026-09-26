// 从内置 u8g2_fonts.c 提取测试 fixture 字体字节（一次性，产物入 tests/fixtures/）
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const SRC = 'C:/Users/win/Documents/AiderDesk/u8g2_menu/example/1.menu_demo_create/HARDWARE/U8g2_V2.0.0/u8g2_fonts.c';
const OUT_DIR = new URL('../tests/fixtures/', import.meta.url);

const src = readFileSync(SRC, 'latin1');
function extract(name) {
  const start = src.indexOf(`const uint8_t ${name}[`);
  if (start < 0) throw new Error('not found: ' + name);
  const q0 = src.indexOf('"', src.indexOf('=', start));
  const end = src.indexOf('";', q0);
  const out = [];
  let i = q0 + 1;
  while (i < end) {
    const c = src[i];
    if (c === '\\') {
      const n = src[i + 1];
      if (n === 'x') { out.push(parseInt(src.slice(i + 2, i + 4), 16)); i += 4; continue; }
      if (n >= '0' && n <= '7') {
        let j = i + 1;
        let v = 0;
        while (j < src.length && src[j] >= '0' && src[j] <= '7' && j - i <= 3) {
          v = v * 8 + (src.charCodeAt(j) - 48);
          j++;
        }
        out.push(v & 255);
        i = j;
        continue;
      }
      out.push(n.charCodeAt(0));
      i += 2;
      continue;
    }
    out.push(src.charCodeAt(i));
    i++;
  }
  return Buffer.from(out);
}

mkdirSync(OUT_DIR, { recursive: true });
for (const name of ['u8g2_font_5x7_tf', 'u8g2_font_wqy12_t_gb2312']) {
  const buf = extract(name);
  writeFileSync(new URL(`./${name}.bin`, OUT_DIR), buf);
  console.log(name, buf.length, 'bytes');
}
