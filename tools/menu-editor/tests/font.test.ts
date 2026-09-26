/**
 * u8g2 字体现场取模测试（纯结构测试）。
 *
 * fixture 用手工构造的最小字体字节（完全可控，不依赖真实字体文件）：
 * - 23 字节头 + ASCII 段（'0'、'9' 两条）+ Unicode 段（表 4B + '菜'(0x83DC) 一条 + 终止）
 * - 断言：子集输出结构正确、字节保真、头修补正确、字符集扫描、生成代码含 menu_font
 * - 真实字体的端到端验证（预览渲染 + 生成数组）在浏览器走查中覆盖
 */
import { describe, it, expect } from 'vitest';
import { subsetFont, getWord, type GlyphFetcher } from '../src/fonts/u8g2font';
import { scanCharset, charsetStats } from '../src/fonts/charset';
import { createProject } from '../src/model';
import { generateCode } from '../src/codegen';

/** 构造最小 u8g2 字体：ASCII '0'/'9' + unicode '菜'(0x83DC)/'单'(0x5355) */
function makeMiniFont(): Uint8Array {
  const head = new Uint8Array(23);
  head[0] = 4; // glyph_cnt
  head[1] = 0; // proportional
  head[2] = 2; head[3] = 2; // bits_per_0/1
  head[4] = 4; head[5] = 4; head[6] = 5; head[7] = 5; head[8] = 5;
  head[9] = 8; head[10] = 13; // max w/h
  const g0 = [0x30, 6, 0xaa, 0xbb, 0xcc, 0xdd];        // '0'
  const g9 = [0x39, 7, 0x11, 0x22, 0x33, 0x44, 0x55];  // '9'
  const ascii = [...g0, ...g9, 0, 0];
  const table = [0x00, 0x04, 0xff, 0xff]; // 单条目查找表
  const gCai = [0x83, 0xdc, 11, 1, 2, 3, 4, 5, 6, 7, 8];        // '菜' 总长 11
  const gDan = [0x53, 0x55, 12, 9, 8, 7, 6, 5, 4, 3, 2, 1];     // '单' 总长 12
  const unicode = [...table, ...gCai, ...gDan, 0, 0];
  const out = new Uint8Array(23 + ascii.length + unicode.length);
  out.set(head, 0);
  out.set(ascii, 23);
  out.set(unicode, 23 + ascii.length);
  // start_pos_unicode（相对数据段）：ascii 13 字节 + 终止 2 = 15
  out[21] = (ascii.length) >> 8;
  out[22] = ascii.length & 0xff;
  return out;
}

const MINI = makeMiniFont();

/** 与子集输出同构的 fetcher：线性扫 ASCII 段 + 跳查 unicode（mini 的表只有一条目） */
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
    p = table + getWord(font, table); // do-while 单轮效果（bound=0xffff 必命中一轮）
    for (;;) {
      const u = getWord(font, p);
      if (u === 0) return null;
      const size = font[p + 2];
      if (u === encoding) return font.slice(p, p + size);
      p += size;
    }
  };
}

describe('子集生成（手工最小字体）', () => {
  it('ASCII 子集：条目字节保真、glyph_cnt 正确、终止符存在', () => {
    const src = miniFetcher(MINI);
    const sub = subsetFont(MINI, new Set([0x30, 0x39]), src)!;
    expect(sub[0]).toBe(2);
    // 走查输出段
    let p = 23;
    const back = miniFetcher(sub);
    for (const enc of [0x30, 0x39]) {
      const size = sub[p + 1];
      expect(sub[p]).toBe(enc);
      expect(sub.slice(p, p + size)).toEqual(src(enc));
      expect(back(enc)).toEqual(src(enc));
      p += size;
    }
    expect(sub[p]).toBe(0); // 终止
  });

  it('中文子集：unicode 段为单条目表 + 条目保真 + 可读回', () => {
    const src = miniFetcher(MINI);
    const set = new Set([0x83dc, 0x5355]); // 菜 单
    const sub = subsetFont(MINI, set, src)!;
    expect(sub[0]).toBe(2);
    const startUnicode = getWord(sub, 21);
    expect(getWord(sub, 23 + startUnicode)).toBe(4); // delta
    expect(getWord(sub, 23 + startUnicode + 2)).toBe(0xffff); // bound
    const back = miniFetcher(sub);
    for (const enc of set) {
      expect(back(enc)).toEqual(src(enc));
    }
  });

  it('混合 ASCII+中文子集：头加速指针正确修补', () => {
    const src = miniFetcher(MINI);
    const sub = subsetFont(MINI, new Set([0x30, 0x39, 0x83dc, 0x5355]), src)!;
    expect(sub[0]).toBe(4);
    // 'A' 不在集内 → upperA=0；lowerA=0
    expect(getWord(sub, 17)).toBe(0);
    expect(getWord(sub, 19)).toBe(0);
    // unicode 段起点 = 23 + ascii(6+7+2=15) + 终止已在内 → 23+15=38
    expect(getWord(sub, 21)).toBe(15);
  });

  it('全部未命中返回 null', () => {
    const src = miniFetcher(MINI);
    expect(subsetFont(MINI, new Set([0x4e2d]), src)).toBeNull();
  });
});

describe('字符集扫描', () => {
  it('收集文本/文本区/开关文案 + ASCII 基线 + 额外字符', () => {
    const proj = createProject();
    (proj.pages[0].items[0] as { text: string }).text = '主页温度:%d';
    // 找到开关附加值条目，改它的 on 文案
    for (const pg of proj.pages) {
      for (const it of pg.items) {
        if (it.bind.type === 'switch') (it.bind as { onText: string }).onText = '开启';
      }
    }
    const set = scanCharset(proj, '℃Ω');
    for (const c of '主页温度开启℃Ω%') expect(set.has(c.codePointAt(0)!)).toBe(true);
    expect(set.has(0x30)).toBe(true); // '0'
    expect(set.has(0x0a)).toBe(false);
    const stats = charsetStats(set);
    expect(stats.total).toBe(stats.ascii + stats.cjk);
  });
});

describe('生成代码', () => {
  it('fontSubset 提供时输出 menu_font 数组与 SetFont 速查', () => {
    const proj = createProject();
    proj.fontSubset = true;
    const fake = new Uint8Array(300).fill(0x55);
    const { c } = generateCode(proj, undefined, fake);
    expect(c).toContain('const uint8_t menu_font[300] U8G2_FONT_SECTION("menu_font") = {');
    expect(c).toContain('u8g2_SetFont(&u8g2, menu_font)');
    expect(c).toContain('0x55,');
  });
});
