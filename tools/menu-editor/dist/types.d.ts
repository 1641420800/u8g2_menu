/**
 * 数据模型：项目 → 页面 → 条目。
 * 该模型是「C 页面函数」的声明式镜像：代码生成器把每个页面展开为一个
 * `void page_N(void)` 函数，把每个条目展开为一行绘制调用（可选的绑定调用在其上方）。
 */
export declare const SCHEMA_VERSION = 1;
export type IntVarType = 'uint8' | 'uint16' | 'uint32' | 'int8' | 'int16' | 'int32' | 'int';
export type NumVarType = IntVarType | 'float' | 'double';
export type ChartKind = 'line' | 'point' | 'bar';
export type SelectorKind = 'default' | 'rotundity' | 'square';
/** 附加值（绘制前附加的绑定调用；none = 纯显示行） */
export type Bind = {
    type: 'none';
} | {
    type: 'value';
    varId: string | null;
} | {
    type: 'switch';
    varId: string | null;
    openValue: number;
    onText: string;
    offText: string;
} | {
    type: 'button';
    cbName: string;
    buttonId: number;
} | {
    type: 'submenu';
    targetPageId: string | null;
} | {
    type: 'back';
};
export type BindType = Bind['type'];
/** 绘制类型（创建条目时选择） */
export type ItemKind = 'text' | 'slider' | 'progress' | 'chart' | 'xbm' | 'textarea' | 'board';
export interface ItemBase {
    id: string;
    kind: ItemKind;
    /** 编辑器内显示名（仅工具内部使用，不生成到 C 代码） */
    label: string;
    /** 附加值：绘制前的绑定，可与任意绘制类型组合 */
    bind: Bind;
}
export interface TextItem extends ItemBase {
    kind: 'text';
    /** 文本或 printf 格式串（支持 \n 多行） */
    text: string;
    /** 1 = 正常，2 = 二倍大 */
    scale: 1 | 2;
    /** 无附加值时的 printf 显示变量（只读展示；有附加值时忽略此字段，直接显示被绑定的值） */
    displayVarId: string | null;
}
export interface SliderItem extends ItemBase {
    kind: 'slider';
    /** 无附加值时的静态显示位置（0~100） */
    position: number;
}
export interface ProgressItem extends ItemBase {
    kind: 'progress';
    /** 无附加值时的静态显示位置（0~100） */
    position: number;
}
export interface ChartSource {
    /** 数据源缓冲区 id（Project.chartBuffers） */
    bufferId: string;
    chartKind: ChartKind;
    /** 固定量程；都省略 = 自动量程 */
    min?: number;
    max?: number;
}
export interface ChartItem extends ItemBase {
    kind: 'chart';
    /** 叠加的数据源列表（1 个 = 单图表；多个 = 同区域叠加绘制） */
    sources: ChartSource[];
    /** 项高度（像素） */
    height: number;
}
/** 手动创建的图表数据源缓冲区（float 数组，多个图表条目可共用） */
export interface ChartBuffer {
    id: string;
    /** C 数组名 */
    name: string;
    /** 数据点数 */
    dataLen: number;
    /** 预览/示例填充模式；none = 完全由用户代码填充 */
    sample: 'sine' | 'ramp' | 'noise' | 'none';
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
export type Item = TextItem | SliderItem | ProgressItem | ChartItem | XbmItem | TextAreaItem | BoardItem;
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
    /** 中文字体现场取模：生成仅含用到的字形的精简字体数组 */
    fontSubset: boolean;
    /** 现场取模额外包含的字符（覆盖运行时动态输出的中文） */
    fontExtra: string;
    /** 全局变量池：条目按 id 引用绑定 */
    variables: Variable[];
    /** 图表数据源缓冲区池：图表条目按 id 引用，可多图表共用 */
    chartBuffers: ChartBuffer[];
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
/** 附加值类型标签 */
export declare const BIND_LABELS: Record<BindType, string>;
export declare const BIND_ICON: Record<BindType, string>;
/** 支持的 u8g2 字体（WASM 预览与代码生成共用同一份清单） */
export declare const FONTS: {
    id: string;
    label: string;
}[];
export declare function isIntType(t: NumVarType): t is IntVarType;
