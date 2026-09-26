// 独立验证子集器输出（node 直跑，不经 vitest）
import { readFileSync } from 'node:fs';
import { subsetFont, getWord } from '../src/fonts/u8g2font';

const F5X7 = new Uint8Array(readFileSync('tests/fixtures/u8g2_font_5x7_tf.bin'));
const WQY12 = new Uint8Array(readFileSync('tests/fixtures/u8g2_font_wqy12_t_gb2312.bin'));

function makeBruteFetcher(font: Uint8Array) {
  return (encoding: number): Uint8Array | null => {
    if (encoding <= 255) {
      let p = 23;
      for (;;) {
        if (p + 1 >= font.length || font[p + 1] === 0) return null;
        if (font[p] === encoding) return font.slice(p, p + font[p + 1]);
        p += font[p + 1];
      }
    }
    return null; // 本次只验证 ASCII 路径
  };
}

const fetcher = makeBruteFetcher(F5X7);
const set = new Set([0x30, 0x39]); // 5x7 确认有的两个
const sub = subsetFont(F5X7, set, fetcher)!;
console.log('glyph_cnt:', sub[0], '(expect 2)');
console.log('head17..22:', sub[17], sub[18], sub[19], sub[20], sub[21], sub[22]);
// 走查 ASCII 段
let p = 23;
for (;;) {
  if (sub[p + 1] === 0) { console.log('ascii terminator @', p, '-> start pos ok'); break; }
  console.log('entry enc=0x' + sub[p].toString(16), 'size=' + sub[p + 1]);
  p += sub[p + 1];
}
const expectedA = -1; // 5x7 无 A
void expectedA;
// wqy12 unicode 起点
const f2 = (enc: number): Uint8Array | null => {
  // 暴力：全文件找 [encHi encLo size] 且 size 合理
  for (let off = 23; off < WQY12.length - 40; off++) {
    if (WQY12[off] === (enc >> 8) && WQY12[off + 1] === (enc & 255)) {
      const size = WQY12[off + 2];
      if (size >= 4 && size <= 40) return WQY12.slice(off, off + size);
    }
  }
  return null;
};
const set2 = new Set([0x83dc, 0x91cf]);
const sub2 = subsetFont(WQY12, set2, f2);
if (sub2) {
  console.log('wqy glyph_cnt:', sub2[0]);
  const su = getWord(sub2, 21);
  console.log('startUnicode:', su, '(expect 23 + 2 + 2 entries*?) =', 23 + 2 + 4);
  console.log('table word0:', getWord(sub2, su), '(expect 4)');
  console.log('table word1: 0x' + getWord(sub2, su + 2).toString(16), '(expect 0xffff)');
  const seg = su + 4;
  let q = seg;
  for (;;) {
    const u = getWord(sub2, q);
    if (u === 0) { console.log('unicode terminator @', q); break; }
    console.log('u entry 0x' + u.toString(16), 'size', sub2[q + 2]);
    q += sub2[q + 2];
  }
}
