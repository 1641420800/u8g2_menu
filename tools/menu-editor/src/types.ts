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
  /** 勾选重写的弱定义函数名（见 WEAK_HOOKS）；未勾选的沿用库默认实现 */
  weakHooks: string[];
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

export const WEAK_HOOKS: WeakHook[] = [
  {
    fn: 'u8g2_menuItemEnter_weak',
    label: '光标进入某行',
    desc: '选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。',
    decl: 'void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)',
    bodyArgs: '(void)u8g2_menu;\n    (void)item;',
  },
  {
    fn: 'u8g2_menuItemLeave_weak',
    label: '光标离开某行',
    desc: '光标离开某一行时触发（item = 离开的行号）。',
    decl: 'void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)',
    bodyArgs: '(void)u8g2_menu;\n    (void)item;',
  },
  {
    fn: 'u8g2_menuValueAdd_weak',
    label: '数值加一步',
    desc: '正在编辑的值被"加"一步后触发（p = 变量地址）。',
    decl: 'void u8g2_menuValueAdd_weak(void *p)',
    bodyArgs: '(void)p;',
  },
  {
    fn: 'u8g2_menuValueSub_weak',
    label: '数值减一步',
    desc: '正在编辑的值被"减"一步后触发（p = 变量地址）。',
    decl: 'void u8g2_menuValueSub_weak(void *p)',
    bodyArgs: '(void)p;',
  },
  {
    fn: 'u8g2_menuValueChange_weak',
    label: '数值变化（推荐）',
    desc: '值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。',
    decl: 'void u8g2_menuValueChange_weak(void *p)',
    bodyArgs: '(void)p;',
  },
  {
    fn: 'u8g2_menuKeyEvent_weak',
    label: '按键事件（可改键）',
    desc: '任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。',
    decl: 'void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)',
    bodyArgs: '(void)u8g2_menu;\n    (void)u8g2_menuKeyValue;',
  },
  {
    fn: 'u8g2_menuCharEvent_weak',
    label: '字符输入',
    desc: '字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。',
    decl: 'void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)',
    bodyArgs: '(void)u8g2_menu;\n    (void)c;',
  },
  {
    fn: 'menuEventUserHandle_weak',
    label: '事件过滤器',
    desc: '事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。',
    decl: 'uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)',
    bodyArgs: '(void)u8g2_menu;\n    (void)eventItem;',
    retNote: 'return 0;',
  },
  {
    fn: 'menuEventUserKey_weak',
    label: '自定义按键',
    desc: 'MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。',
    decl: 'void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)',
    bodyArgs: '(void)u8g2_menu;\n    (void)u8g2_menuKeyValue;',
  },
  {
    fn: 'menuEventKey_weak',
    label: '按键拦截',
    desc: '任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',
    decl: 'uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)',
    bodyArgs: '(void)u8g2_menu;\n    (void)u8g2_menuKeyValue;',
    retNote: 'return 0;',
  },
  {
    fn: 'menuEventKeyPre_weak',
    label: '按键预处理（改键映射）',
    desc: '按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',
    decl: 'void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)',
    bodyArgs: '(void)u8g2_menu;\n    (void)u8g2_menuKeyValue;',
  },
];

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
