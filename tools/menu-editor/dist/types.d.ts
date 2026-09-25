/**
 * 数据模型：项目 → 页面 → 条目。
 * 该模型是「C 页面函数」的声明式镜像：代码生成器把每个页面展开为一个
 * `void page_N(void)` 函数，把每个条目展开为一行绘制调用（可选的绑定调用在其上方）。
 */
export declare const SCHEMA_VERSION = 1;
export type ItemKind = 'text' | 'number' | 'switch' | 'button' | 'submenu' | 'back' | 'slider' | 'progress' | 'chart' | 'xbm' | 'textarea' | 'board';
export type IntVarType = 'uint8' | 'uint16' | 'uint32' | 'int8' | 'int16' | 'int32' | 'int';
export type NumVarType = IntVarType | 'float' | 'double';
export type ChartKind = 'line' | 'point' | 'bar';
export type SelectorKind = 'default' | 'rotundity' | 'square';
export interface ItemBase {
    id: string;
    kind: ItemKind;
    /** 编辑器内显示名（仅工具内部使用，不生成到 C 代码） */
    label: string;
}
export interface TextItem extends ItemBase {
    kind: 'text';
    /** 文本或 printf 格式串（支持 \n 多行） */
    text: string;
    /** 1 = 正常，2 = 二倍大 */
    scale: 1 | 2;
}
export interface NumberItem extends ItemBase {
    kind: 'number';
    text: string;
    scale: 1 | 2;
    /** 绑定的变量 id（Project.variables）；null = 纯显示（不绑定附加值） */
    varId: string | null;
    /** true = 绑定附加值可编辑；false = 只用 printf 显示变量值 */
    editable: boolean;
}
export interface SwitchItem extends ItemBase {
    kind: 'switch';
    text: string;
    scale: 1 | 2;
    /** 绑定的变量 id（须为 uint8 类型） */
    varId: string | null;
    openValue: number;
    onText: string;
    offText: string;
}
export interface ButtonItem extends ItemBase {
    kind: 'button';
    text: string;
    scale: 1 | 2;
    cbName: string;
    buttonId: number;
}
export interface SubmenuItem extends ItemBase {
    kind: 'submenu';
    text: string;
    scale: 1 | 2;
    targetPageId: string | null;
}
export interface BackItem extends ItemBase {
    kind: 'back';
    text: string;
    scale: 1 | 2;
}
export interface SliderItem extends ItemBase {
    kind: 'slider';
    /** 绑定的变量 id（须为整型） */
    varId: string | null;
}
export interface ProgressItem extends ItemBase {
    kind: 'progress';
    /** 绑定的变量 id（须为整型） */
    varId: string | null;
}
export interface ChartItem extends ItemBase {
    kind: 'chart';
    chartKind: ChartKind;
    /** 数据点数 */
    dataLen: number;
    /** 项高度（像素），一般取行高 × 行数 */
    height: number;
    /** 预览用示例数据模式 */
    sample: 'sine' | 'ramp' | 'noise';
    min?: number;
    max?: number;
}
export interface XbmItem extends ItemBase {
    kind: 'xbm';
    name: string;
    w: number;
    h: number;
    /** XBM 位序（LSB first），按行打包；bits[i] 为字节 */
    bits: number[];
}
export interface TextAreaItem extends ItemBase {
    kind: 'textarea';
    content: string;
    /** 项高度（像素） */
    height: number;
    /** true = u8g2_MenuDrawTextArea_bind（上下键滚动） */
    bindScroll: boolean;
    lineSpacing: number;
}
export interface BoardItem extends ItemBase {
    kind: 'board';
    w: number;
    h: number;
    cbName: string;
}
export type Item = TextItem | NumberItem | SwitchItem | ButtonItem | SubmenuItem | BackItem | SliderItem | ProgressItem | ChartItem | XbmItem | TextAreaItem | BoardItem;
export interface Page {
    id: string;
    name: string;
    /** 生成的 C 函数名（如 page_main）；空则自动 page_0/1/2... */
    fnName: string;
    items: Item[];
    /** 页面函数开头的用户代码（USER CODE BEGIN page_<fnName>） */
    userCodePre: string;
}
/** 可绑定附加值的全局变量（菜单加减数值时读写的目标） */
export interface Variable {
    id: string;
    /** C 变量名 */
    name: string;
    /** 库可绑定的类型：uint8/16/32、int8/16/32、int、float、double */
    type: NumVarType;
    initialValue: number;
    min: number;
    max: number;
    /** 默认步长（附加值 adjValue） */
    step: number;
}
export interface Project {
    version: number;
    name: string;
    width: number;
    height: number;
    /** u8g2 字体名 */
    font: string;
    selector: SelectorKind;
    selectorLeftMargin: number;
    selectorTopMargin: number;
    selectorLineSpacing: number;
    /** 跑马灯速度（像素/步，u8g2_MenuSetPositionOffsetSpe） */
    marqueeSpeed: number;
    /** 跑马灯停留字符数（u8g2_MenuSetPositionOffsetStrHeaderLen） */
    marqueeHeaderLen: number;
    /** 勾选重写的弱定义函数名（见 WEAK_HOOKS）；未勾选的沿用库默认实现 */
    weakHooks: string[];
    /** 全局变量池：条目按 id 引用绑定 */
    variables: Variable[];
    pages: Page[];
}
/** 弱定义函数目录：勾选后在生成代码中输出骨架并替换库的默认行为 */
export interface WeakHook {
    /** 函数名（与 u8g2_menu_weak.c 一致） */
    fn: string;
    /** 面板中的短标签 */
    label: string;
    /** 面板中的用途说明（面向不熟悉库的用户） */
    desc: string;
    /** 完整声明（生成 .c 用） */
    decl: string;
    /** 函数体内对参数的 (void) 消警语句 */
    bodyArgs: string;
    /** 非 void 返回时，默认 return 语句及其语义注释 */
    retNote?: string;
}
export declare const WEAK_HOOKS: WeakHook[];
export declare const KIND_LABELS: Record<ItemKind, string>;
export declare const KIND_ICON: Record<ItemKind, string>;
/** 支持的 u8g2 字体（WASM 预览与代码生成共用同一份清单） */
export declare const FONTS: {
    id: string;
    label: string;
}[];
export declare function isIntType(t: NumVarType): t is IntVarType;
