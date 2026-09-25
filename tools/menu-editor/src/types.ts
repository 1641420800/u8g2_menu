/**
 * 数据模型：项目 → 页面 → 条目。
 * 该模型是「C 页面函数」的声明式镜像：代码生成器把每个页面展开为一个
 * `void page_N(void)` 函数，把每个条目展开为一行绘制调用（可选的绑定调用在其上方）。
 */

export const SCHEMA_VERSION = 1;

export type ItemKind =
  | 'text'      // 文本行（可含 printf 格式化占位符，纯文本时即静态文本）
  | 'number'    // 数值编辑项：u8g2_MenuItemValue_* + 文本显示
  | 'switch'    // 开关项：u8g2_MenuItemValue_switch + 文本显示（%s 替换 on/off 文本）
  | 'button'    // 按钮回调项：u8g2_MenuItem_button
  | 'submenu'   // 子页面项：u8g2_MenuItem_menu
  | 'back'      // 返回上级项：u8g2_MenuItem_menu_back
  | 'slider'    // 滑块条：u8g2_MenuDrawItemSlider_bind
  | 'progress'  // 进度条：u8g2_MenuDrawItemProgressBar_bind
  | 'chart'     // 图表项：u8g2_MenuDrawItem{Line,Point,Bar}Chart
  | 'xbm'       // 位图项：u8g2_MenuDrawItemXBMP
  | 'textarea'  // 多行文本区：u8g2_MenuDrawTextArea(_bind)
  | 'board';    // 自绘板：u8g2_MenuDrawItemBoard（用户手写回调）

export type IntVarType = 'uint8' | 'uint16' | 'uint32' | 'int8' | 'int16' | 'int32' | 'int';
export type NumVarType = IntVarType | 'float' | 'double';
export type ChartKind = 'line' | 'point' | 'bar';
export type SelectorKind = 'default' | 'rotundity' | 'square';
export type LayerMode = 'AND' | 'OR' | 'XOR' | 'XNOR';

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
  text: string;            // 例："v:%d"，含一个占位符
  scale: 1 | 2;
  varType: NumVarType;
  varName: string;
  step: number;            // adjValue
  min: number;
  max: number;
  /** float/double 显示小数位（生成 %.Nf 用） */
  decimals: number;
  initialValue: number;
}

export interface SwitchItem extends ItemBase {
  kind: 'switch';
  text: string;            // 例："s:%s"
  scale: 1 | 2;
  varName: string;
  openValue: number;
  onText: string;          // 例："on"
  offText: string;         // 例："off"
  initialValue: number;
}

export interface ButtonItem extends ItemBase {
  kind: 'button';
  text: string;
  scale: 1 | 2;
  cbName: string;          // 回调函数名（生成骨架 + USER CODE 区）
  buttonId: number;        // u8g2_MenuButton_cb 的 ID
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
  varName: string;
  step: number;
  min: number;
  max: number;
  initialValue: number;
}

export interface ProgressItem extends ItemBase {
  kind: 'progress';
  varName: string;
  step: number;
  min: number;
  max: number;
  initialValue: number;
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
  min?: number;   // 固定范围（不填则自动）
  max?: number;
}

export interface XbmItem extends ItemBase {
  kind: 'xbm';
  name: string;            // 生成的数组名：menu_xbm_<name>
  w: number;
  h: number;
  /** XBM 位序（LSB first），按行打包；bits[i] 为字节 */
  bits: number[];
}

export interface TextAreaItem extends ItemBase {
  kind: 'textarea';
  content: string;         // 多行文本
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
  /** 占位：预览中无法执行用户代码，仅示意 */
}

export type Item =
  | TextItem | NumberItem | SwitchItem | ButtonItem | SubmenuItem | BackItem
  | SliderItem | ProgressItem | ChartItem | XbmItem | TextAreaItem | BoardItem;

export interface Page {
  id: string;
  name: string;            // 仅编辑器显示
  /** 生成的 C 函数名（如 page_main）；空则自动 page_0/1/2... */
  fnName: string;
  items: Item[];
  /** 页面函数开头的用户代码（USER CODE BEGIN page_<fnName>） */
  userCodePre: string;
}

export interface Project {
  version: number;
  name: string;
  width: number;           // 屏幕宽（像素）
  height: number;          // 屏幕高（像素）
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
  /** 整页图层包裹（u8g2_MenuStartLayer/EndLayer）；none = 不使用 */
  layerWrap: LayerMode | 'none';
  pages: Page[];
}

/** 预览/样式面板使用的消息框测试参数 */
export interface MsgboxTest {
  text: string;
  timeoutMs: number;       // 0 = U8G2_MENU_INFINITE_TIMEOUT（不自动关闭）
}

export const KIND_LABELS: Record<ItemKind, string> = {
  text: '文本',
  number: '数值',
  switch: '开关',
  button: '按钮',
  submenu: '子页面',
  back: '返回上级',
  slider: '滑块条',
  progress: '进度条',
  chart: '图表',
  xbm: '位图 XBM',
  textarea: '文本区',
  board: '自绘板',
};

export const KIND_ICON: Record<ItemKind, string> = {
  text: 'T',
  number: '#',
  switch: '◉',
  button: '⏎',
  submenu: '→',
  back: '←',
  slider: '▭',
  progress: '▬',
  chart: '∿',
  xbm: '▦',
  textarea: '¶',
  board: '✎',
};

/** 支持的 u8g2 字体（WASM 预览与代码生成共用同一份清单） */
export const FONTS: { id: string; label: string }[] = [
  { id: 'u8g2_font_5x7_tf', label: '5x7 (ASCII)' },
  { id: 'u8g2_font_6x10_tf', label: '6x10 (ASCII)' },
  { id: 'u8g2_font_6x12_tf', label: '6x12 (ASCII)' },
  { id: 'u8g2_font_7x13_tf', label: '7x13 (ASCII)' },
  { id: 'u8g2_font_8x13_tf', label: '8x13 (ASCII)' },
  { id: 'u8g2_font_9x15_tf', label: '9x15 (ASCII)' },
  { id: 'u8g2_font_9x18_tf', label: '9x18 (ASCII)' },
  { id: 'u8g2_font_10x20_tf', label: '10x20 (ASCII)' },
  { id: 'u8g2_font_wqy12_t_gb2312', label: '文泉驿 12 (中文)' },
  { id: 'u8g2_font_wqy13_t_gb2312', label: '文泉驿 13 (中文)' },
  { id: 'u8g2_font_wqy14_t_gb2312', label: '文泉驿 14 (中文)' },
  { id: 'u8g2_font_wqy16_t_gb2312', label: '文泉驿 16 (中文)' },
];

export function isIntType(t: NumVarType): t is IntVarType {
  return t !== 'float' && t !== 'double';
}
