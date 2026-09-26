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
export declare function getWord(b: Uint8Array, off: number): number;
/** 从 WASM 读取的源字体字节中提取 23 字节头信息（仅用度量字段） */
export declare function readHeader(font: Uint8Array): FontHeader;
/**
 * 生成 u8g2 格式子集字体。
 * @param sourceFont 源字体字节（供头部度量；字形经 fetcher 获取）
 * @param unicodes 需要收录的编码集合
 * @returns 子集字体字节；一个字形都没拿到时返回 null
 */
export declare function subsetFont(sourceFont: Uint8Array, unicodes: Set<number>, fetcher: GlyphFetcher): Uint8Array | null;
/** 从 UTF-8 字符串取编码集合 */
export declare function charsOf(s: string): number[];
/** 固定保留的 ASCII 可打印集（数字/字母/标点，printf 输出必需） */
export declare function asciiPrintable(): number[];
