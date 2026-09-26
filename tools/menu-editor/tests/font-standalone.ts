// 字体子集测试的独立运行版（不依赖 vitest；逻辑与 tests/font.test.ts 一致）
import { subsetFont, getWord, type GlyphFetcher } from '../src/fonts/u8g2font';
import { scanCharset, charsetStats } from '../src/fonts/charset';
import { createProject } from '../src/model';
import { generateCode } from '../src/codegen';

let pass = 0;
let fail = 0;
function t(name: string, fn: () => void) {
  try { fn(); pass++; console.log('  ✓', name); } catch (e) { fail++; console.log('  ×', name, '\n    ', (e as Error).message); }
}
function expect(actual: unknown) {
  return {
    toBe: (exp: unknown) => { if (actual !== exp) throw new Error(`expected ${String(exp)}, got ${String(actual)}`); },
    toEqual: (exp: unknown) => {
      const a = JSON.stringify(Array.from(actual as Iterable<number>));
      const b = JSON.stringify(Array.from(exp as Iterable<number>));
      if (a !== b) throw new Error(`expected ${b}, got ${a}`);
    },
    toBeNull: () => { if (actual !== null) throw new Error(`expected null, got value`); },
  };
}

function makeMiniFont(): Uint8Array {
  const head = new Uint8Array(23);
  head[0] = 4; head[1] = 0; head[2] = 2; head[3] = 2;
  head[4] = 4; head[5] = 4; head[6] = 5; head[7] = 5; head[8] = 5;
  head[9] = 8; head[10] = 13;
  const g0 = [0x30, 6, 0xaa, 0xbb, 0xcc, 0xdd];
  const g9 = [0x39, 7, 0x11, 0x22, 0x33, 0x44, 0x55];
  const ascii = [...g0, ...g9, 0, 0];
  const table = [0x00, 0x04, 0xff, 0xff];
  // unicode 条目 size 字节 = 条目总长（含 [unicode:2][size:1] 头，u8g2 语义）
  const gCai = [0x83, 0xdc, 11, 1, 2, 3, 4, 5, 6, 7, 8];        // '菜' 总长 11
  const gDan = [0x53, 0x55, 12, 9, 8, 7, 6, 5, 4, 3, 2, 1];     // '单' 总长 12
  const unicode = [...table, ...gCai, ...gDan, 0, 0];
  const out = new Uint8Array(23 + ascii.length + unicode.length);
  out.set(head, 0);
  out.set(ascii, 23);
  out.set(unicode, 23 + ascii.length);
  out[21] = (ascii.length) >> 8;
  out[22] = ascii.length & 0xff;
  return out;
}

const MINI = makeMiniFont();

function miniFetcher(font: Uint8Array): GlyphFetcher {
  return (encoding: number): Uint8Array | null => {
    let p = 23;
    if (encoding <= 255) {
      for (;;) {
        if (font[p + 1] === 0) return null;
        if (font[p] === encoding) return font.slice(p, p + font[p + 1]);
        p += font[p + 1];
      }
    }
    const table = 23 + getWord(font, 21);
    p = table + getWord(font, table);
    for (;;) {
      const u = getWord(font, p);
      if (u === 0) return null;
      const size = font[p + 2];
      if (u === encoding) return font.slice(p, p + size);
      p += size;
    }
  };
}

console.log('子集生成（手工最小字体）');
t('ASCII 子集：条目保真 + 终止符', () => {
  const src = miniFetcher(MINI);
  const sub = subsetFont(MINI, new Set([0x30, 0x39]), src)!;
  if (sub[0] !== 2) throw new Error('glyph_cnt=' + sub[0]);
  let p = 23;
  const back = miniFetcher(sub);
  for (const enc of [0x30, 0x39]) {
    const size = sub[p + 1];
    if (sub[p] !== enc) throw new Error('enc mismatch');
    expect(sub.slice(p, p + size)).toEqual(src(enc));
    expect(back(enc)).toEqual(src(enc));
    p += size;
  }
  if (sub[p] !== 0) throw new Error('missing terminator');
});
t('中文子集：unicode 段单条目表 + 可读回', () => {
  const src = miniFetcher(MINI);
  const sub = subsetFont(MINI, new Set([0x83dc, 0x5355]), src)!;
  if (sub[0] !== 2) throw new Error('glyph_cnt=' + sub[0]);
  const startUnicode = getWord(sub, 21); // 相对数据段
  if (getWord(sub, 23 + startUnicode) !== 4) throw new Error('delta!=' + getWord(sub, 23 + startUnicode));
  if (getWord(sub, 23 + startUnicode + 2) !== 0xffff) throw new Error('bound!=0xffff');
  const back = miniFetcher(sub);
  for (const enc of [0x83dc, 0x5355]) expect(back(enc)).toEqual(src(enc));
});
t('混合子集：glyph_cnt=4 + start_pos 修补', () => {
  const src = miniFetcher(MINI);
  const sub = subsetFont(MINI, new Set([0x30, 0x39, 0x83dc, 0x5355]), src)!;
  if (sub[0] !== 4) throw new Error('glyph_cnt=' + sub[0]);
  if (getWord(sub, 17) !== 0) throw new Error('upperA!=0');
  if (getWord(sub, 19) !== 0) throw new Error('lowerA!=0');
  if (getWord(sub, 21) !== 15) throw new Error('startUnicode=' + getWord(sub, 21));
});
t('全部未命中返回 null', () => {
  const src = miniFetcher(MINI);
  const r = subsetFont(MINI, new Set([0x4e2d]), src);
  expect(r).toBeNull();
});

console.log('字符集扫描');
t('收集文本/开关文案 + ASCII 基线 + 额外字符', () => {
  const proj = createProject();
  (proj.pages[0].items[0] as { text: string }).text = '主页温度:%d';
  for (const pg of proj.pages) {
    for (const it of pg.items) {
      if (it.bind.type === 'switch') (it.bind as { onText: string }).onText = '开启';
    }
  }
  const set = scanCharset(proj, '℃Ω');
  for (const c of '主页温度开启℃Ω%') {
    if (!set.has(c.codePointAt(0)!)) throw new Error('missing ' + c);
  }
  if (!set.has(0x30)) throw new Error('missing 0');
  if (set.has(0x0a)) throw new Error('newline should be excluded');
  const stats = charsetStats(set);
  if (stats.total !== stats.ascii + stats.cjk) throw new Error('stats mismatch');
});

console.log('生成代码');
t('fontSubset 时输出 menu_font 数组与 SetFont 速查', () => {
  const proj = createProject();
  proj.fontSubset = true;
  const fake = new Uint8Array(300).fill(0x55);
  const { c } = generateCode(proj, undefined, fake);
  if (!c.includes('const uint8_t menu_font[300] U8G2_FONT_SECTION("menu_font") = {')) throw new Error('no menu_font');
  if (!c.includes('u8g2_SetFont(&u8g2, menu_font)')) throw new Error('no SetFont ref');
  if (!c.includes('0x55,')) throw new Error('no data');
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
