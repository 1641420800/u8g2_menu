/**
 * u8g2 字体现场取模（子集器）。
 *
 * 字形数据源：WASM 预览引擎内的 u8g2 真库（em_font_glyph 导出）。
 * 不在 JS 侧解析字体文件格式——库的走查逻辑（含加速指针/查找表的字体特异性）
 * 由 C 侧与渲染时完全一致的代码路径给出，杜绝两套实现漂移。
 *
 * 子集输出格式（u8g2 标准布局）：
 *   [23 字节头（照抄源字体的 bits_per_* 与 max/ascent 等度量字段，patch glyph_cnt 与
 *    start_pos_upper_A / lower_a / unicode）]
 *   ASCII 段：条目 [编码:1][大小:1][数据...]，终止 [0,0]
 *   Unicode 段：单条目查找表 [delta=4][0xFFFF] + 条目 [unicode:2][大小:1][数据...]，终止 [0,0]
 */

export interface GlyphFetcher {
  /** 返回字形完整条目字节；null = 源字体无此字形 */
  (encoding: number): Uint8Array | null;
}

export interface FontHeader {
  /** 照抄源字体的前 23 字节头 */
  raw: Uint8Array;
  glyphCnt: number;
  startUpperA: number;
  startLowerA: number;
  startUnicode: number;
}

/** u8g2_font_get_word（大端） */
export function getWord(b: Uint8Array, off: number): number {
  return (b[off] << 8) | b[off + 1];
}

/** 从 WASM 读取的源字体字节中提取 23 字节头信息（仅用度量字段） */
export function readHeader(font: Uint8Array): FontHeader {
  return {
    raw: font.slice(0, 23),
    glyphCnt: font[0],
    startUpperA: (font[17] << 8) | font[18],
    startLowerA: (font[19] << 8) | font[20],
    startUnicode: (font[21] << 8) | font[22],
  };
}

/**
 * 生成 u8g2 格式子集字体。
 * @param sourceFont 源字体字节（供头部度量；字形经 fetcher 获取）
 * @param unicodes 需要收录的编码集合
 * @returns 子集字体字节；一个字形都没拿到时返回 null
 */
export function subsetFont(
  sourceFont: Uint8Array,
  unicodes: Set<number>,
  fetcher: GlyphFetcher,
): Uint8Array | null {
  const ascii: { encoding: number; entry: Uint8Array }[] = [];
  const unicode: { encoding: number; entry: Uint8Array }[] = [];
  const sorted = [...unicodes].sort((a, b) => a - b);
  for (const enc of sorted) {
    const entry = fetcher(enc);
    if (!entry || !entry.length) continue;
    if (enc <= 255) ascii.push({ encoding: enc, entry });
    else unicode.push({ encoding: enc, entry });
  }
  if (!ascii.length && !unicode.length) return null;

  const total = ascii.length + unicode.length;
  // ASCII 段大小
  let asciiLen = 0;
  for (const g of ascii) asciiLen += g.entry.length;
  asciiLen += 2; // 终止
  // Unicode 段大小：表 4 + 条目 + 终止 2
  let unicodeLen = 4;
  for (const g of unicode) unicodeLen += g.entry.length;
  unicodeLen += 2;

  const header = readHeader(sourceFont);
  const out = new Uint8Array(23 + asciiLen + unicodeLen);
  // 头部度量字段照抄（bits_per_*、max_char_*、x/y_offset、ascent/descent——解码必需）
  out.set(header.raw, 0);
  out[0] = total; // glyph_cnt
  // start_pos_* 待段布局确定后 patch（先清零）
  out[17] = 0; out[18] = 0;
  out[19] = 0; out[20] = 0;
  out[21] = 0; out[22] = 0;

  // ASCII 段
  let p = 23;
  for (const g of ascii) {
    if (g.encoding === 0x41) { const off = p - 23; out[17] = (off >> 8) & 0xff; out[18] = off & 0xff; }
    if (g.encoding === 0x61) { const off = p - 23; out[19] = (off >> 8) & 0xff; out[20] = off & 0xff; }
    out.set(g.entry, p);
    p += g.entry.length;
  }
  out[p] = 0; out[p + 1] = 0; // ASCII 终止
  p += 2;

  // Unicode 段：单条目查找表 [delta=4][0xFFFF] + 线性条目
  const startUnicode = p - 23;
  out[21] = (startUnicode >> 8) & 0xff;
  out[22] = startUnicode & 0xff;
  out[p] = 0x00; out[p + 1] = 0x04; // delta = 4（表长）
  out[p + 2] = 0xff; out[p + 3] = 0xff; // bound = 0xffff
  p += 4;
  for (const g of unicode) {
    out.set(g.entry, p);
    p += g.entry.length;
  }
  out[p] = 0; out[p + 1] = 0; // unicode 终止
  return out;
}

/** 从 UTF-8 字符串取编码集合 */
export function charsOf(s: string): number[] {
  return [...s].map((c) => c.codePointAt(0)!).filter((n) => Number.isFinite(n));
}

/** 固定保留的 ASCII 可打印集（数字/字母/标点，printf 输出必需） */
export function asciiPrintable(): number[] {
  const out: number[] = [];
  for (let c = 0x20; c <= 0x7e; c++) out.push(c);
  return out;
}
