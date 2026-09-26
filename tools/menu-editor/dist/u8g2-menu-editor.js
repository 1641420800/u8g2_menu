import { createStore as Xe } from "zustand/vanilla";
import { render as ie, html as g, nothing as C } from "lit-html";
const Ze = `/* u8g2-menu-editor 样式（前缀 ume-） */
.ume {
  --ume-bg: #f4f6f9;
  --ume-panel: #ffffff;
  --ume-border: #d9dfe7;
  --ume-text: #1c2430;
  --ume-dim: #67707e;
  --ume-accent: #2563eb;
  --ume-accent-soft: #e8effd;
  --ume-danger: #dc2626;
  --ume-canvas-bg: #10254d;

  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 480px;
  font: 13px/1.5 "Segoe UI", "Microsoft YaHei", system-ui, sans-serif;
  color: var(--ume-text);
  background: var(--ume-bg);
  border: 1px solid var(--ume-border);
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.ume *, .ume *::before, .ume *::after { box-sizing: border-box; }

/* ---------- 工具栏 ---------- */
.ume-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: var(--ume-panel);
  border-bottom: 1px solid var(--ume-border);
  flex-wrap: wrap;
}
.ume-toolbar .ume-title {
  font-weight: 600;
  margin-right: 6px;
  white-space: nowrap;
}
.ume-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: 1px solid var(--ume-border);
  border-radius: 6px;
  background: var(--ume-panel);
  color: var(--ume-text);
  font: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: background .12s, border-color .12s;
}
.ume-btn:hover { background: var(--ume-accent-soft); border-color: var(--ume-accent); }
.ume-btn:disabled { opacity: .45; cursor: default; background: var(--ume-panel); border-color: var(--ume-border); }
.ume-btn.primary { background: var(--ume-accent); border-color: var(--ume-accent); color: #fff; }
.ume-btn.primary:hover { background: #1d4fd8; }
.ume-btn.danger { color: var(--ume-danger); }
.ume-btn.danger:hover { background: #fdecec; border-color: var(--ume-danger); }
.ume-btn.sm { padding: 2px 7px; font-size: 12px; }
.ume-toolbar .ume-sep { width: 1px; height: 20px; background: var(--ume-border); margin: 0 4px; }
.ume-toolbar .ume-spacer { flex: 1; }

/* ---------- 主体三栏 ---------- */
.ume-main { display: flex; flex: 1; min-height: 0; }
.ume-left {
  width: 250px;
  min-width: 200px;
  border-right: 1px solid var(--ume-border);
  background: var(--ume-panel);
  overflow-y: auto;
  padding: 8px;
}
.ume-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  min-width: 300px;
  background:
    linear-gradient(90deg, var(--ume-bg) 0 12px, transparent 12px),
    radial-gradient(circle at 30% 20%, #eaf0f8 0%, var(--ume-bg) 70%);
}
.ume-right {
  width: 290px;
  min-width: 240px;
  border-left: 1px solid var(--ume-border);
  background: var(--ume-panel);
  overflow-y: auto;
  padding: 10px;
}

/* ---------- 树 ---------- */
.ume-page { margin-bottom: 6px; }
.ume-page-head {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 6px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background: #eef1f6;
}
.ume-page-head:hover { background: var(--ume-accent-soft); }
.ume-page-head.selected { background: var(--ume-accent); color: #fff; }
.ume-page-head.selected .ume-mini { color: #dbe6ff; }
.ume-page-items { padding: 2px 0 2px 14px; }
.ume-item-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 6px;
  border-radius: 6px;
  cursor: pointer;
}
.ume-item-row:hover { background: var(--ume-accent-soft); }
.ume-item-row.selected { background: var(--ume-accent-soft); outline: 1px solid var(--ume-accent); }
.ume-item-icon {
  width: 18px; height: 18px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 4px;
  background: #e3e9f2;
  font-size: 11px;
  color: #475569;
  flex: none;
}
.ume-item-row.selected .ume-item-icon { background: var(--ume-accent); color: #fff; }
.ume-item-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ume-mini {
  border: none; background: transparent; color: var(--ume-dim);
  cursor: pointer; font-size: 12px; padding: 1px 4px; border-radius: 4px;
  font-family: inherit;
}
.ume-mini:hover { background: #dbe4f0; color: var(--ume-text); }
.ume-empty-hint { color: var(--ume-dim); font-size: 12px; padding: 6px; text-align: center; }

/* ---------- 预览 ---------- */
.ume-preview-wrap {
  padding: 14px;
  background: var(--ume-canvas-bg);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(16, 37, 77, .35), inset 0 0 0 2px #0a1830;
}
.ume-preview-canvas {
  display: block;
  width: 256px;
  height: 128px;
  image-rendering: pixelated;
  background: #e8f0ff;
}
.ume-preview-meta { font-size: 12px; color: var(--ume-dim); display: flex; gap: 12px; align-items: center; }
.ume-keybar { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.ume-key {
  min-width: 44px;
  padding: 7px 10px;
  border: 1px solid var(--ume-border);
  border-radius: 8px;
  background: var(--ume-panel);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 0 var(--ume-border);
}
.ume-key:active { transform: translateY(1px); box-shadow: none; }

/* ---------- 属性/样式面板 ---------- */
.ume-panel-title {
  font-weight: 600;
  margin: 10px 0 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--ume-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ume-panel-title:first-child { margin-top: 0; }
.ume-field { display: flex; align-items: center; gap: 6px; margin: 5px 0; }
.ume-field > label { width: 72px; flex: none; color: var(--ume-dim); font-size: 12px; }
.ume-field input[type="text"], .ume-field input[type="number"], .ume-field select {
  flex: 1;
  min-width: 0;
  padding: 3px 7px;
  border: 1px solid var(--ume-border);
  border-radius: 5px;
  font: inherit;
  background: #fbfcfe;
  color: var(--ume-text);
}
.ume-field input:focus, .ume-field select:focus { outline: 1px solid var(--ume-accent); border-color: var(--ume-accent); }
.ume-field.wide { align-items: flex-start; }
.ume-field textarea {
  flex: 1;
  min-height: 64px;
  padding: 4px 7px;
  border: 1px solid var(--ume-border);
  border-radius: 5px;
  font: 12px/1.5 Consolas, monospace;
  background: #fbfcfe;
  resize: vertical;
}
.ume-checkbox { display: flex; align-items: center; gap: 6px; margin: 5px 0; font-size: 12px; color: var(--ume-dim); }
.ume-kind-badge {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  background: var(--ume-accent-soft);
  color: var(--ume-accent);
  font-weight: 600;
}
.ume-hint { font-size: 11px; color: var(--ume-dim); margin: 4px 0; }
.ume-warn { font-size: 12px; color: #b45309; background: #fef7e6; border: 1px solid #f5d48e; border-radius: 6px; padding: 6px 8px; margin: 4px 0; }

/* ---------- XBM 编辑器 ---------- */
.ume-xbm-grid {
  display: grid;
  gap: 1px;
  background: #c8d2e0;
  border: 1px solid #c8d2e0;
  width: max-content;
  margin: 8px 0;
}
.ume-xbm-cell {
  width: 14px; height: 14px;
  background: #fff;
  cursor: pointer;
  padding: 0;
  border: none;
}
.ume-xbm-cell.on { background: #10254d; }
.ume-xbm-cell:hover { outline: 1px solid var(--ume-accent); }

/* ---------- 对话框 ---------- */
.ume-modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, .45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.ume-modal {
  background: var(--ume-panel);
  border-radius: 12px;
  padding: 16px;
  width: min(760px, 92vw);
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 18px 60px rgba(15, 23, 42, .4);
}
.ume-modal.wide { width: min(980px, 94vw); }
.ume-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 15px;
}
.ume-modal-body { overflow: auto; min-height: 0; }
.ume-code-tabs { display: flex; gap: 6px; margin-bottom: 8px; }
.ume-code-view {
  background: #0f172a;
  color: #d7e3f4;
  font: 12px/1.55 Consolas, "Courier New", monospace;
  padding: 12px;
  border-radius: 8px;
  overflow: auto;
  max-height: 52vh;
  white-space: pre;
}
.ume-modal-foot { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }

/* ---------- Toast ---------- */
.ume-toast {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  background: #10254d;
  color: #fff;
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 12px;
  opacity: 0;
  transition: opacity .2s;
  pointer-events: none;
  z-index: 10000;
}
.ume-toast.show { opacity: .95; }
.ume { position: relative; }

/* ---------- 弱定义函数勾选区 ---------- */
.ume-details { margin: 8px 0; border: 1px solid var(--ume-border); border-radius: 8px; background: #fbfcfe; }
.ume-details summary { padding: 7px 10px; font-weight: 600; cursor: pointer; font-size: 12px; user-select: none; }
.ume-details[open] summary { border-bottom: 1px solid var(--ume-border); }
.ume-weak-list { padding: 6px 10px; max-height: 320px; overflow-y: auto; }
.ume-weak-item { margin: 9px 0; }
.ume-weak-name { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; }
.ume-weak-desc { font-size: 11px; color: var(--ume-dim); margin: 2px 0 0 22px; line-height: 1.45; }
/* ---------- 变量管理区 ---------- */
.ume-var-item { margin: 4px 0; border: 1px solid var(--ume-border); border-radius: 6px; background: #fbfcfe; overflow: hidden; }
.ume-var-item.editing { border-color: var(--ume-accent); }
.ume-var-row { display: flex; align-items: center; gap: 6px; padding: 4px 8px; cursor: pointer; font-family: Consolas, monospace; font-size: 11px; }
.ume-var-row:hover { background: var(--ume-accent-soft); }
.ume-var-name { font-weight: 600; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ume-var-meta { flex: 1; color: var(--ume-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }
.ume-cb-ref {
  padding: 3px 8px;
  margin: 2px 0;
  border-radius: 5px;
  background: #f1f4f9;
  font-size: 11px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ume-cb-ref:hover { background: var(--ume-accent-soft); color: var(--ume-accent); }
/* ---------- 右栏 Tab ---------- */
.ume-tabs { display: flex; gap: 2px; margin: -10px -10px 10px; padding: 4px 8px 0; border-bottom: 1px solid var(--ume-border); background: var(--ume-panel); }
.ume-tabs button { border: none; border-bottom: 2px solid transparent; background: transparent; padding: 6px 14px 5px; font: inherit; font-size: 12px; color: var(--ume-dim); cursor: pointer; }
.ume-tabs button:hover { color: var(--ume-text); }
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`, xe = 1, se = [
  {
    fn: "u8g2_menuItemEnter_weak",
    label: "光标进入某行",
    desc: "选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",
    decl: "void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",
    bodyArgs: `(void)u8g2_menu;
    (void)item;`
  },
  {
    fn: "u8g2_menuItemLeave_weak",
    label: "光标离开某行",
    desc: "光标离开某一行时触发（item = 离开的行号）。",
    decl: "void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",
    bodyArgs: `(void)u8g2_menu;
    (void)item;`
  },
  {
    fn: "u8g2_menuValueAdd_weak",
    label: "数值加一步",
    desc: '正在编辑的值被"加"一步后触发（p = 变量地址）。',
    decl: "void u8g2_menuValueAdd_weak(void *p)",
    bodyArgs: "(void)p;"
  },
  {
    fn: "u8g2_menuValueSub_weak",
    label: "数值减一步",
    desc: '正在编辑的值被"减"一步后触发（p = 变量地址）。',
    decl: "void u8g2_menuValueSub_weak(void *p)",
    bodyArgs: "(void)p;"
  },
  {
    fn: "u8g2_menuValueChange_weak",
    label: "数值变化（推荐）",
    desc: "值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",
    decl: "void u8g2_menuValueChange_weak(void *p)",
    bodyArgs: "(void)p;"
  },
  {
    fn: "u8g2_menuKeyEvent_weak",
    label: "按键事件（可改键）",
    desc: "任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",
    decl: "void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",
    bodyArgs: `(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`
  },
  {
    fn: "u8g2_menuCharEvent_weak",
    label: "字符输入",
    desc: "字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",
    decl: "void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",
    bodyArgs: `(void)u8g2_menu;
    (void)c;`
  },
  {
    fn: "menuEventUserHandle_weak",
    label: "事件过滤器",
    desc: "事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",
    decl: "uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",
    bodyArgs: `(void)u8g2_menu;
    (void)eventItem;`,
    retNote: "return 0;"
  },
  {
    fn: "menuEventUserKey_weak",
    label: "自定义按键",
    desc: "MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",
    decl: "void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",
    bodyArgs: `(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`
  },
  {
    fn: "menuEventKey_weak",
    label: "按键拦截",
    desc: '任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',
    decl: "uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",
    bodyArgs: `(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,
    retNote: "return 0;"
  },
  {
    fn: "menuEventKeyPre_weak",
    label: "按键预处理（改键映射）",
    desc: '按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',
    decl: "void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",
    bodyArgs: `(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`
  }
], le = {
  text: "文本",
  slider: "滑块条",
  progress: "进度条",
  chart: "图表",
  xbm: "位图 XBM",
  textarea: "文本区",
  board: "自绘板"
}, Ye = {
  text: "T",
  slider: "▭",
  progress: "▬",
  chart: "∿",
  xbm: "▦",
  textarea: "¶",
  board: "✎"
}, he = {
  none: "无",
  value: "数值",
  switch: "开关",
  button: "按钮",
  submenu: "子页面",
  back: "返回"
}, Ge = [
  { id: "u8g2_font_5x7_tf", label: "5x7 (ASCII)" },
  { id: "u8g2_font_6x10_tf", label: "6x10 (ASCII)" },
  { id: "u8g2_font_6x12_tf", label: "6x12 (ASCII)" },
  { id: "u8g2_font_7x13_tf", label: "7x13 (ASCII)" },
  { id: "u8g2_font_8x13_tf", label: "8x13 (ASCII)" },
  { id: "u8g2_font_9x15_tf", label: "9x15 (ASCII)" },
  { id: "u8g2_font_9x18_tf", label: "9x18 (ASCII)" },
  { id: "u8g2_font_10x20_tf", label: "10x20 (ASCII)" },
  { id: "u8g2_font_wqy12_t_gb2312", label: "文泉驿 12 (中文)" },
  { id: "u8g2_font_wqy13_t_gb2312", label: "文泉驿 13 (中文)" },
  { id: "u8g2_font_wqy14_t_gb2312", label: "文泉驿 14 (中文)" },
  { id: "u8g2_font_wqy16_t_gb2312", label: "文泉驿 16 (中文)" }
];
let $e = 0;
function H(s) {
  return $e = ($e + 1) % 1e9, `${s}_${Date.now().toString(36)}_${$e.toString(36)}`;
}
function be(s) {
  return {
    id: H("vb"),
    name: "var_new",
    type: "int32",
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
    ...s
  };
}
function Ke(s) {
  return {
    id: H("buf"),
    name: "buf_new",
    dataLen: 32,
    sample: "sine",
    ...s
  };
}
function Je(s, a) {
  const n = new Set(s.map((i) => i.name));
  if (!n.has(a)) return a;
  let t = 2;
  for (; n.has(`${a}_${t}`); ) t++;
  return `${a}_${t}`;
}
function Qe(s, a) {
  const n = new Set(s.map((i) => i.name));
  if (!n.has(a)) return a;
  let t = 2;
  for (; n.has(`${a}_${t}`); ) t++;
  return `${a}_${t}`;
}
function Z(s) {
  const a = { id: H("it"), label: "", bind: { type: "none" } };
  switch (s) {
    case "text":
      return { ...a, kind: s, text: "菜单项", scale: 1, displayVarId: null };
    case "slider":
      return { ...a, kind: s, position: 50 };
    case "progress":
      return { ...a, kind: s, position: 50 };
    case "chart":
      return {
        ...a,
        kind: s,
        sources: [],
        height: 32
      };
    case "xbm":
      return et(16, 16);
    case "textarea":
      return {
        ...a,
        kind: s,
        content: `这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,
        height: 40,
        bindScroll: !0,
        lineSpacing: 0
      };
    case "board":
      return { ...a, kind: s, w: 64, h: 32, cbName: "board_cb" };
  }
}
function et(s, a) {
  const n = Math.ceil(s / 8);
  return {
    id: H("it"),
    kind: "xbm",
    label: "",
    bind: { type: "none" },
    name: "icon",
    w: s,
    h: a,
    bits: new Array(n * a).fill(0)
  };
}
function _e(s) {
  return { id: H("pg"), name: s, fnName: "", items: [] };
}
function pe(s, a) {
  return { ...s, ...a };
}
function te(s, a) {
  return { ...s, ...a };
}
function tt() {
  const s = [
    be({ name: "var_value", type: "int32", initialValue: 50, min: 0, max: 100, step: 1 }),
    be({ name: "var_switch", type: "uint8", initialValue: 0, min: 0, max: 1, step: 1 }),
    be({ name: "var_slider", type: "int32", initialValue: 50, min: 0, max: 100, step: 2 })
  ], a = [
    Ke({ name: "buf_demo", dataLen: 32, sample: "sine" })
  ], n = _e("主页");
  n.items = [
    pe(Z("text"), { text: "u8g2_menu" }),
    te(Z("text"), { text: "系统设置", bind: { type: "submenu", targetPageId: null } }),
    te(Z("text"), { text: "关于", bind: { type: "button", cbName: "btn_about_cb", buttonId: 1 } })
  ];
  const t = _e("设置");
  t.items = [
    te(pe(Z("text"), { text: "音量:%d" }), { bind: { type: "value", varId: s[0].id } }),
    te(pe(Z("text"), { text: "开关:%s" }), {
      bind: { type: "switch", varId: s[1].id, openValue: 1, onText: "on", offText: "off" }
    }),
    te(Z("slider"), { bind: { type: "value", varId: s[2].id } }),
    te(Z("text"), { text: "图表", bind: { type: "submenu", targetPageId: null } }),
    te(Z("text"), { text: "返回", bind: { type: "back" } })
  ];
  const i = _e("图表");
  i.items = [
    pe(Z("chart"), {
      height: 36,
      sources: [{ bufferId: a[0].id, chartKind: "line" }]
    }),
    te(Z("text"), { text: "返回", bind: { type: "back" } })
  ];
  const r = {
    version: 1,
    name: "我的菜单",
    width: 128,
    height: 64,
    font: "u8g2_font_wqy12_t_gb2312",
    selector: "rotundity",
    selectorLeftMargin: 16,
    selectorTopMargin: 0,
    selectorLineSpacing: 0,
    marqueeSpeed: 0.2,
    marqueeHeaderLen: 5,
    weakHooks: [],
    fontSubset: !0,
    fontExtra: "",
    variables: s,
    chartBuffers: a,
    pages: [n, t, i]
  };
  return n.items[1].bind.targetPageId = t.id, t.items[3].bind.targetPageId = i.id, r;
}
function nt(s) {
  return structuredClone(s);
}
function at(s) {
  const a = /* @__PURE__ */ new Map(), n = (t, i, r, e) => {
    if (!t) return;
    let o = a.get(t);
    o || (o = { name: t, asButton: !1, asBoard: !1, refs: [] }, a.set(t, o)), i === "button" ? o.asButton = !0 : o.asBoard = !0, o.refs.push({
      pageId: r.id,
      itemId: e.id,
      pageName: r.name,
      label: e.label || ("text" in e ? e.text : "") || le[e.kind]
    });
  };
  for (const t of s.pages)
    for (const i of t.items)
      i.bind.type === "button" && n(i.bind.cbName, "button", t, i), i.kind === "board" && n(i.cbName, "board", t, i);
  return [...a.values()].sort((t, i) => t.name.localeCompare(i.name));
}
const it = 800;
function st() {
  let s = null, a = 0;
  return Xe()((n, t) => ({
    project: tt(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (i, r) => {
      const e = Date.now(), o = !!r && r === s && e - a < it;
      s = r ?? null, a = e, n((u) => {
        const l = nt(u.project);
        return i(l), {
          project: l,
          dirty: !0,
          past: o ? u.past : [...u.past.slice(-99), u.project],
          future: []
        };
      });
    },
    undo: () => {
      n((i) => i.past.length ? {
        project: i.past[i.past.length - 1],
        past: i.past.slice(0, -1),
        future: [i.project, ...i.future.slice(0, 99)],
        dirty: !0
      } : i);
    },
    redo: () => {
      n((i) => {
        if (!i.future.length) return i;
        const [r, ...e] = i.future;
        return {
          project: r,
          past: [...i.past, i.project],
          future: e,
          dirty: !0
        };
      });
    },
    select: (i, r = null) => n({ selection: { pageId: i, itemId: r } }),
    addPage: (i) => {
      const r = { id: H("pg"), name: i ?? `页面${t().project.pages.length + 1}`, fnName: "", items: [] };
      return t().update((e) => {
        e.pages.push(r);
      }), n({ selection: { pageId: r.id, itemId: null } }), r;
    },
    removePage: (i) => {
      t().update((e) => {
        e.pages = e.pages.filter((o) => o.id !== i);
        for (const o of e.pages)
          for (const u of o.items)
            u.bind.type === "submenu" && u.bind.targetPageId === i && (u.bind.targetPageId = null);
      });
      const { selection: r } = t();
      r.pageId === i && n({ selection: { pageId: null, itemId: null } });
    },
    movePage: (i, r) => {
      t().update((e) => {
        const o = e.pages.findIndex((l) => l.id === i), u = o + r;
        o < 0 || u < 0 || u >= e.pages.length || ([e.pages[o], e.pages[u]] = [e.pages[u], e.pages[o]]);
      });
    },
    updatePage: (i, r) => {
      t().update((e) => {
        const o = e.pages.find((u) => u.id === i);
        o && Object.assign(o, r);
      });
    },
    addItem: (i, r) => {
      var u;
      const e = r ?? t().selection.pageId ?? ((u = t().project.pages[0]) == null ? void 0 : u.id);
      if (!e) return null;
      const o = Z(i);
      return t().update((l) => {
        const d = l.pages.find((p) => p.id === e);
        d == null || d.items.push(o);
      }), n({ selection: { pageId: e, itemId: o.id } }), o;
    },
    removeItem: (i, r) => {
      t().update((o) => {
        const u = o.pages.find((l) => l.id === i);
        u && (u.items = u.items.filter((l) => l.id !== r));
      });
      const { selection: e } = t();
      e.itemId === r && n({ selection: { pageId: i, itemId: null } });
    },
    moveItem: (i, r, e) => {
      t().update((o) => {
        const u = o.pages.find((p) => p.id === i);
        if (!u) return;
        const l = u.items.findIndex((p) => p.id === r), d = l + e;
        l < 0 || d < 0 || d >= u.items.length || ([u.items[l], u.items[d]] = [u.items[d], u.items[l]]);
      });
    },
    duplicateItem: (i, r) => {
      let e = null;
      t().update((o) => {
        const u = o.pages.find((d) => d.id === i);
        if (!u) return;
        const l = u.items.findIndex((d) => d.id === r);
        l < 0 || (e = structuredClone(u.items[l]), e.id = H("it"), u.items.splice(l + 1, 0, e));
      }), e && n({ selection: { pageId: i, itemId: e.id } });
    },
    updateItem: (i, r, e, o) => {
      t().update((u) => {
        const l = u.pages.find((p) => p.id === i), d = l == null ? void 0 : l.items.find((p) => p.id === r);
        d && Object.assign(d, e);
      }, o);
    },
    addVariable: (i) => {
      let r = null;
      return t().update((e) => {
        e.variables = e.variables ?? [];
        const o = Qe(e.variables, (i == null ? void 0 : i.name) ?? "var_new");
        r = be({ ...i, name: o }), e.variables.push(r);
      }), r;
    },
    removeVariable: (i) => {
      let r = 0;
      for (const e of t().project.pages)
        for (const o of e.items)
          "varId" in o && o.varId === i && r++;
      return r > 0 ? r : (t().update((e) => {
        e.variables = (e.variables ?? []).filter((o) => o.id !== i);
      }), 0);
    },
    updateVariable: (i, r, e) => {
      t().update((o) => {
        const u = (o.variables ?? []).find((l) => l.id === i);
        u && Object.assign(u, r);
      }, e);
    },
    addChartBuffer: (i) => {
      let r = null;
      return t().update((e) => {
        e.chartBuffers = e.chartBuffers ?? [];
        const o = Je(e.chartBuffers, (i == null ? void 0 : i.name) ?? "buf_new");
        r = Ke({ ...i, name: o }), e.chartBuffers.push(r);
      }), r;
    },
    removeChartBuffer: (i) => {
      let r = 0;
      for (const e of t().project.pages)
        for (const o of e.items)
          o.kind === "chart" && o.sources.some((u) => u.bufferId === i) && r++;
      return r > 0 ? r : (t().update((e) => {
        e.chartBuffers = (e.chartBuffers ?? []).filter((o) => o.id !== i);
      }), 0);
    },
    updateChartBuffer: (i, r, e) => {
      t().update((o) => {
        const u = (o.chartBuffers ?? []).find((l) => l.id === i);
        u && Object.assign(u, r);
      }, e);
    }
  }));
}
class ae extends Error {
}
const Ue = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int", "float", "double"]), Fe = /* @__PURE__ */ new Set(["line", "point", "bar"]), je = /* @__PURE__ */ new Set(["sine", "ramp", "noise", "none"]);
function re(s) {
  return typeof s == "object" && s !== null && !Array.isArray(s);
}
function K(s, a) {
  return typeof s == "string" ? s : a;
}
function N(s, a) {
  return typeof s == "number" && Number.isFinite(s) ? s : a;
}
const rt = ["text", "slider", "progress", "chart", "xbm", "textarea", "board"], ot = ["number", "switch", "button", "submenu", "back"], ut = ["none", "value", "switch", "button", "submenu", "back"];
function lt(s) {
  if (!re(s)) throw new ae("条目格式错误");
  const a = K(s.kind, "");
  if (!(rt.includes(a) || ot.includes(a)))
    throw new ae(`未知条目类型: ${String(a)}`);
  const n = structuredClone(s);
  switch (n.id = K(s.id, ""), n.id || (n.id = `it_${Math.random().toString(36).slice(2, 10)}`), n.label = K(s.label, ""), a) {
    case "text":
    case "number":
    case "switch":
    case "button":
    case "submenu":
    case "back":
      n.text = K(s.text, ""), n.scale = s.scale === 2 ? 2 : 1;
      break;
  }
  return n;
}
function ct(s) {
  for (const a of s)
    for (const n of a.items) {
      const t = n;
      if (!(t.bind && re(t.bind) && ut.includes(K(t.bind.type, "none")))) {
        switch (t.kind) {
          case "number": {
            const i = t.varId ?? null;
            t.editable === !1 ? (t.kind = "text", t.displayVarId = i, t.bind = { type: "none" }) : (t.kind = "text", t.displayVarId = null, t.bind = { type: "value", varId: i });
            break;
          }
          case "switch":
            t.kind = "text", t.displayVarId = null, t.bind = {
              type: "switch",
              varId: t.varId ?? null,
              openValue: N(t.openValue, 1),
              onText: K(t.onText, "on"),
              offText: K(t.offText, "off")
            };
            break;
          case "button":
            t.kind = "text", t.displayVarId = null, t.bind = { type: "button", cbName: K(t.cbName, "btn_cb"), buttonId: N(t.buttonId, 1) };
            break;
          case "submenu":
            t.kind = "text", t.displayVarId = null, t.bind = { type: "submenu", targetPageId: t.targetPageId ?? null };
            break;
          case "back":
            t.kind = "text", t.displayVarId = null, t.bind = { type: "back" };
            break;
          case "slider":
          case "progress":
            t.bind = t.varId ? { type: "value", varId: t.varId } : { type: "none" }, t.position === void 0 && (t.position = 50);
            break;
          default:
            t.bind = { type: "none" }, t.kind === "text" && t.displayVarId === void 0 && (t.displayVarId = null);
            break;
        }
        delete t.varId, delete t.varName, delete t.varType, delete t.editable, delete t.step, delete t.min, delete t.max, delete t.initialValue, delete t.decimals, t.kind !== "board" && (delete t.cbName, delete t.buttonId), delete t.openValue, delete t.onText, delete t.offText, delete t.targetPageId;
      }
    }
}
function dt(s) {
  if (!re(s)) throw new ae("页面格式错误");
  const a = Array.isArray(s.items) ? s.items.map(lt) : [];
  return {
    id: K(s.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: K(s.name, "未命名页面"),
    fnName: K(s.fnName, ""),
    items: a
  };
}
function mt(s) {
  if (!re(s)) return null;
  const a = K(s.type, "int32");
  return {
    id: K(s.id, "") || H("vb"),
    name: K(s.name, ""),
    type: Ue.has(a) ? a : "int32",
    initialValue: N(s.initialValue, 0),
    min: N(s.min, 0),
    max: N(s.max, 100),
    step: N(s.step, 1)
  };
}
function pt(s) {
  if (!re(s)) return null;
  const a = K(s.sample, "sine");
  return {
    id: K(s.id, "") || H("buf"),
    name: K(s.name, ""),
    dataLen: Math.min(512, Math.max(2, Math.trunc(N(s.dataLen, 32)))),
    sample: je.has(a) ? a : "sine"
  };
}
function ft(s) {
  const a = /* @__PURE__ */ new Map(), n = [], t = (i, r) => {
    let e = a.get(i);
    return e || (e = r(), a.set(i, e), n.push(e)), e;
  };
  for (const i of s)
    for (const r of i.items) {
      const e = r;
      switch (r.kind) {
        case "number":
          if (e.varId === void 0 || e.varId === null) {
            const u = typeof e.varName == "string" && e.varName ? e.varName : "var_unnamed", l = t(u, () => ({
              id: H("vb"),
              name: u,
              type: Ue.has(String(e.varType)) ? String(e.varType) : "int32",
              initialValue: N(e.initialValue, 0),
              min: N(e.min, 0),
              max: N(e.max, 100),
              step: N(e.step, 1)
            }));
            r.varId = l.id;
          }
          e.editable === void 0 && (r.editable = !0), delete e.varName, delete e.varType, delete e.step, delete e.min, delete e.max, delete e.initialValue, delete e.decimals;
          break;
        case "slider":
        case "progress":
          if (e.varId === void 0 || e.varId === null) {
            const u = typeof e.varName == "string" && e.varName ? e.varName : "var_unnamed", l = t(u, () => ({
              id: H("vb"),
              name: u,
              type: "int",
              initialValue: N(e.initialValue, 0),
              min: N(e.min, 0),
              max: N(e.max, 100),
              step: N(e.step, 1)
            }));
            r.varId = l.id;
          }
          delete e.varName, delete e.step, delete e.min, delete e.max, delete e.initialValue;
          break;
        case "switch":
          if (e.varId === void 0 || e.varId === null) {
            const u = typeof e.varName == "string" && e.varName ? e.varName : "var_unnamed", l = t(u, () => ({
              id: H("vb"),
              name: u,
              type: "uint8",
              initialValue: N(e.initialValue, 0),
              min: 0,
              max: 1,
              step: 1
            }));
            r.varId = l.id;
          }
          delete e.varName, delete e.initialValue;
          break;
      }
    }
  return n;
}
function ye(s) {
  let a;
  if (typeof s == "string")
    try {
      a = JSON.parse(s);
    } catch {
      throw new ae("JSON 解析失败");
    }
  else
    a = s;
  if (!re(a)) throw new ae("不是有效的工程文件");
  const n = a, t = N(n.version, 0);
  if (t > xe)
    throw new ae(`工程版本 v${t} 高于当前支持的 v${xe}，请升级编辑器`);
  const i = Array.isArray(n.pages) ? n.pages.map(dt) : [];
  if (!i.length) throw new ae("工程至少需要一个页面");
  const r = ["default", "rotundity", "square"].includes(n.selector) ? n.selector : "rotundity", e = new Set(se.map((d) => d.fn)), o = Array.isArray(n.weakHooks) ? [...new Set(n.weakHooks.filter((d) => typeof d == "string" && e.has(d)))] : [];
  let u;
  Array.isArray(n.variables) ? u = n.variables.map(mt).filter((d) => !!d) : u = ft(i);
  let l;
  return Array.isArray(n.chartBuffers) ? l = n.chartBuffers.map(pt).filter((d) => !!d) : l = ht(i), ct(i), bt(i, l), {
    version: xe,
    name: K(n.name, "未命名工程"),
    width: N(n.width, 128),
    height: N(n.height, 64),
    font: K(n.font, "u8g2_font_wqy12_t_gb2312"),
    selector: r,
    selectorLeftMargin: N(n.selectorLeftMargin, 16),
    selectorTopMargin: N(n.selectorTopMargin, 0),
    selectorLineSpacing: N(n.selectorLineSpacing, 0),
    marqueeSpeed: N(n.marqueeSpeed, 0.2),
    marqueeHeaderLen: N(n.marqueeHeaderLen, 5),
    weakHooks: o,
    fontSubset: a.fontSubset === !0,
    fontExtra: K(a.fontExtra, ""),
    variables: u,
    chartBuffers: l,
    pages: i
  };
}
function ht(s) {
  const a = [];
  let n = 0;
  const t = () => {
    const i = {
      id: H("buf"),
      name: `buf_chart_${++n}`,
      dataLen: 32,
      sample: "sine"
    };
    return a.push(i), i;
  };
  for (const i of s)
    for (const r of i.items) {
      if (r.kind !== "chart") continue;
      const e = r;
      if (Array.isArray(e.sources)) continue;
      const o = t();
      o.dataLen = Math.min(512, Math.max(2, Math.trunc(N(e.dataLen, 32))));
      const u = K(e.sample, "sine");
      je.has(u) && (o.sample = u);
      const l = K(e.chartKind, "line"), d = {
        bufferId: o.id,
        chartKind: Fe.has(l) ? l : "line"
      };
      e.max !== void 0 && e.max !== null && (d.max = N(e.max, 0)), e.min !== void 0 && e.min !== null && (d.min = N(e.min, 0)), r.sources = [d], e.height === void 0 && (r.height = 32), delete e.chartKind, delete e.dataLen, delete e.sample, delete e.max, delete e.min;
    }
  return a;
}
function bt(s, a) {
  const n = new Set(a.map((t) => t.id));
  for (const t of s)
    for (const i of t.items) {
      if (i.kind !== "chart") continue;
      const r = i;
      Array.isArray(r.sources) || (r.sources = []), i.sources = i.sources.filter((e) => n.has(e.bufferId)).map((e) => ({
        bufferId: e.bufferId,
        chartKind: Fe.has(e.chartKind) ? e.chartKind : "line",
        min: e.min,
        max: e.max
      })), typeof r.height != "number" && (r.height = 32);
    }
}
function Le(s) {
  return JSON.stringify(s, null, 2);
}
const gt = {
  uint8: "uint8_t",
  uint16: "uint16_t",
  uint32: "uint32_t",
  int8: "int8_t",
  int16: "int16_t",
  int32: "int32_t",
  int: "int",
  float: "float",
  double: "double"
};
function Y(s, a = "anon") {
  let n = s.trim().replace(/[^A-Za-z0-9_]/g, "_");
  return (!n || /^[0-9]/.test(n)) && (n = `_${n}`), n || a;
}
const ge = /^[A-Za-z_][A-Za-z0-9_]*$/, Re = /* @__PURE__ */ new Set([
  "auto",
  "break",
  "case",
  "char",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extern",
  "float",
  "for",
  "goto",
  "if",
  "inline",
  "int",
  "long",
  "register",
  "restrict",
  "return",
  "short",
  "signed",
  "sizeof",
  "static",
  "struct",
  "switch",
  "typedef",
  "union",
  "unsigned",
  "void",
  "volatile",
  "while",
  "_Bool",
  "_Complex",
  "_Imaginary"
]);
function Ne(s) {
  return ge.test(s) && !Re.has(s);
}
function oe(s, a, n, t) {
  let i = s;
  if (Re.has(i) && (i = `${i}_`, n.push(`${t} "${s}" 是 C 关键字，生成名改为 "${i}"`)), !a.has(i))
    return a.add(i), i;
  let r = 2;
  for (; a.has(`${i}_${r}`); ) r++;
  const e = `${i}_${r}`;
  return n.push(`${t} "${s}" 与其他生成符号冲突（页面函数/变量/缓冲区/字体数组），已改为 "${e}"`), a.add(e), e;
}
function ue(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function ne(s) {
  if (!Number.isFinite(s)) return "0.0f";
  const a = s.toString();
  return /[-.]|e/i.test(a) ? `${a}f` : `${a}.0f`;
}
function vt(s, a, n) {
  return n === "ramp" ? `${s}[i] = (float)i;` : n === "noise" ? `${s}[i] = (float)((i * 37) % ${a});` : `${s}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`;
}
function xt(s) {
  const a = /* @__PURE__ */ new Map();
  if (!s) return a;
  const n = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let t;
  for (; (t = n.exec(s)) !== null; ) a.set(t[1], t[2]);
  return a;
}
function X(s, a, n) {
  const t = a.has(s) ? a.get(s) : "";
  return `${n}/* USER CODE BEGIN ${s} */${t}${n}/* USER CODE END ${s} */`;
}
const $t = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]);
function _t(s, a, n) {
  const t = [], i = xt((a == null ? void 0 : a.c) ?? ""), r = /* @__PURE__ */ new Set();
  n && r.add("menu_font");
  const e = [];
  s.pages.forEach((c, w) => {
    let x = `page_${w}`;
    c.fnName && (ge.test(c.fnName) ? x = c.fnName : t.push(`页面 "${c.name}" 的函数名 "${c.fnName}" 不是合法的 C 标识符，已回退为 page_${w}`)), e.push(oe(x, r, t, `页面 "${c.name}" 的函数名`));
  });
  const o = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (const c of s.variables ?? []) {
    if (!c.name) {
      t.push("存在未命名变量，已跳过");
      continue;
    }
    ge.test(c.name) || t.push(`变量名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${Y(c.name)}"`);
    const w = Y(c.name, "var");
    if (o.has(w)) {
      t.push(`变量名 "${c.name}" 重复，以第一个为准`);
      continue;
    }
    const x = oe(w, r, t, `变量名 "${w}"`), I = c.type === "float" || c.type === "double", E = {
      name: x,
      srcType: c.type,
      type: gt[c.type],
      init: I ? ne(c.initialValue) : String(Math.trunc(c.initialValue)),
      isFloat: I,
      step: c.step,
      min: c.min,
      max: c.max
    };
    o.set(x, E), u.set(c.id, E);
  }
  const l = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), p = [], b = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
  (s.chartBuffers ?? []).forEach((c, w) => {
    if (!c.name) {
      t.push("存在未命名数据源缓冲区，已跳过");
      return;
    }
    ge.test(c.name) || t.push(`缓冲区名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${Y(c.name)}"`);
    const x = Y(c.name, "buf");
    if (m.has(x)) {
      t.push(`缓冲区名 "${c.name}" 与其它缓冲区重名，已跳过`);
      return;
    }
    m.add(x);
    const I = oe(x, r, t, `缓冲区名 "${x}"`), E = Math.max(2, Math.trunc(c.dataLen)), P = `${I.toUpperCase()}_LEN`;
    b.set(c.id, { name: I, lenMacro: P, len: E });
    const F = `fill_${I}`;
    if (!(i.get(F) ?? "").trim()) {
      const M = i.get(`chart${w}_fill`);
      M && M.trim() && (i.set(F, M), t.push(`已将旧版 chart${w}_fill 手写内容迁移至 ${F}（后续请直接在该区内维护）`));
    }
    const W = (i.get(F) ?? "").trim() !== "";
    p.push(
      `#define ${P} ${E}`,
      `static float ${I}[${P}];`,
      `static uint8_t ${I}_filled = 0;`,
      `static void ${I}_fill(void)`,
      "{",
      X(F, i, "    "),
      ...c.sample !== "none" && !W ? [`    for (uint16_t i = 0; i < ${P}; ++i) { ${vt(I, E, c.sample)} }`] : [],
      "}"
    );
  });
  const f = [], y = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  {
    let c = 0, w = 0;
    const x = (I) => {
      const E = b.get(I);
      return E ? (h.has(I) || h.set(I, `        if (!${E.name}_filled) { ${E.name}_filled = 1; ${E.name}_fill(); }`), h.get(I)) : "";
    };
    for (const I of s.pages)
      for (const E of I.items) {
        if (E.kind !== "chart") continue;
        const P = E.sources.filter((M) => b.has(M.bufferId));
        if (E.sources.length && !P.length) {
          t.push(`页面 ${I.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);
          continue;
        }
        if (!P.length) {
          t.push(`页面 ${I.name} 的图表条目未绑定数据源，已跳过`);
          continue;
        }
        const F = Math.max(4, Math.trunc(E.height)), W = [];
        for (const M of P) {
          const B = b.get(M.bufferId), _ = `chart${c++}`;
          f.push(
            `static float ${_}_dis[${B.lenMacro}];`,
            `static u8g2_chart_t ${_};`
          ), W.push({ name: _, s: M, b: B });
        }
        if (W.length === 1) {
          const { name: M, s: B, b: _ } = W[0];
          f.push(`static uint8_t ${M}_inited = 0;`), y.set(E.id, [
            `    if (!${M}_inited) {`,
            `        ${M}_inited = 1;`,
            `        u8g2_chart_init(&${M}, ${_.name}, ${M}_dis, ${_.lenMacro});`,
            x(B.bufferId),
            "    }"
          ]);
          const S = B.chartKind === "point" ? "Point" : B.chartKind === "bar" ? "Bar" : "Line", de = B.min !== void 0 && B.max !== void 0 ? `${ne(B.max)}, ${ne(B.min)}` : "0, 0";
          v.set(E.id, `    u8g2_MenuDrawItem${S}Chart(&${M}, ${F}, ${de});`);
        } else {
          const M = `chart_layers_${w++}`;
          f.push(
            `static u8g2_menu_drawChart_t ${M}[${W.length}];`,
            `static uint8_t ${M}_inited = 0;`
          );
          const B = [
            `    if (!${M}_inited) {`,
            `        ${M}_inited = 1;`
          ];
          W.forEach(({ name: _, s: S, b: de }, me) => {
            B.push(`        u8g2_chart_init(&${_}, ${de.name}, ${_}_dis, ${de.lenMacro});`), B.push(x(S.bufferId));
            const We = S.chartKind === "point" ? "u8g2_drawPointChart" : S.chartKind === "bar" ? "u8g2_drawBarChart" : "u8g2_drawLineChart", Ve = S.min !== void 0 && S.max !== void 0 ? `${ne(S.max)}, ${ne(S.min)}` : "0, 0";
            B.push(`        ${M}[${me}].drawChart = ${We};`), B.push(`        ${M}[${me}].chart = &${_};`), B.push(`        ${M}[${me}].max = ${Ve.split(", ")[0]};`), B.push(`        ${M}[${me}].min = ${Ve.split(", ")[1]};`);
          }), B.push("    }"), y.set(E.id, B), v.set(E.id, `    u8g2_MenuDrawItemChart(${M}, ${W.length}, ${F});`);
        }
      }
  }
  const T = [], V = [], z = [], O = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Map();
  let U = 0;
  for (const c of s.pages)
    for (const w of c.items) {
      if (w.bind.type === "button") {
        const x = Y(w.bind.cbName, "btn_cb");
        l.has(x) || l.set(x, w.bind.buttonId);
      }
      switch (w.kind) {
        case "board":
          d.add(Y(w.cbName, "board_cb"));
          break;
        case "xbm": {
          let x = Y(w.name, "icon");
          for (; O.has(x); ) x = `${x}_2`;
          O.add(x), Q.set(w.id, x);
          const I = w.bits.length, E = w.bits.map((P) => `0x${(P & 255).toString(16).padStart(2, "0")}`).join(", ");
          T.push(`static const uint8_t menu_xbm_${x}[${I}] = { ${E} };`);
          break;
        }
        case "textarea": {
          const x = U++;
          V.push(
            `static char ta${x}_text[] = "${ue(w.content)}";`,
            `static u8g2_menu_textArea_t ta${x};`,
            `static uint8_t ta${x}_inited = 0;`
          ), z.push(
            `    if (!ta${x}_inited) {`,
            `        ta${x}_inited = 1;`,
            `        u8g2_textArea_init(&ta${x}, ta${x}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${x}, ${Math.max(0, Math.trunc(w.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
    }
  const A = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map();
  for (const c of l.keys()) A.set(c, oe(c, r, t, `按钮回调名 "${c}"`));
  for (const c of d) k.set(c, oe(c, r, t, `自绘板回调名 "${c}"`));
  const L = (c, w) => {
    if (!c) return "";
    const x = `"${ue(c)}"`;
    return w === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${x});` : `u8g2_MenuUTF8Printf(${x});`;
  }, j = (c, w, x) => {
    const I = `"${ue(c)}"`;
    return w === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${I}, ${x});` : `u8g2_MenuUTF8Printf(${I}, ${x});`;
  };
  let ee = 0;
  const ce = (c, w) => {
    const x = [], I = `${w.name}`, E = (_) => {
      if (!_) return null;
      const S = u.get(_);
      return S || t.push(`页面 ${I} 的条目引用了已删除的变量，已按普通文本生成`), S ?? null;
    }, P = c.bind;
    let F = null, W = null, M = "on", B = "off";
    switch (P.type) {
      case "value": {
        const _ = E(P.varId);
        if (_) {
          F = _;
          const S = _.isFloat ? `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${ne(_.step)}, ${ne(_.min)}, ${ne(_.max)});` : `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;
          x.push(`    ${S}`);
        }
        break;
      }
      case "switch": {
        const _ = E(P.varId);
        _ && _.srcType !== "uint8" ? t.push(`开关附加值绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`) : _ && (W = _, M = P.onText, B = P.offText, x.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(P.openValue)});`));
        break;
      }
      case "button": {
        const _ = Y(P.cbName, "btn_cb"), S = A.get(_) ?? _;
        x.push(`    u8g2_MenuItem_button(${S}, ${Math.trunc(P.buttonId)});`);
        break;
      }
      case "submenu": {
        const _ = s.pages.findIndex((S) => S.id === P.targetPageId);
        !P.targetPageId || _ < 0 ? t.push(`页面 ${I} 的条目 "${c.label || "未命名"}" 附加值目标页面无效，已按普通文本生成`) : x.push(`    u8g2_MenuItem_menu_enter(${e[_]});`);
        break;
      }
      case "back":
        x.push("    u8g2_MenuItem_menu_back();");
        break;
    }
    switch (c.kind) {
      case "text": {
        if (F)
          x.push(`    ${j(c.text, c.scale, F.name)}`), /%[-+ #0]*[a-zA-Z]/.test(c.text) || t.push(`页面 ${I} 的数值附加值条目显示文本不含格式化占位符（如 %d）`);
        else if (W)
          x.push(`    ${j(c.text, c.scale, `${W.name} ? "${ue(M)}" : "${ue(B)}"`)}`), /%[-+ #0]*s/.test(c.text) || t.push("开关附加值条目的显示文本建议包含 %s 用于显示 on/off");
        else if (P.type === "none" && c.displayVarId) {
          const _ = E(c.displayVarId);
          if (_)
            x.push(`    ${j(c.text, c.scale, _.name)}`), /%[-+ #0]*[a-zA-Z]/.test(c.text) || t.push(`页面 ${I} 的显示条目文本不含格式化占位符（如 %d）`);
          else {
            t.push(`页面 ${I} 的显示条目引用了已删除的变量，已按普通文本生成`);
            const S = L(c.text, c.scale);
            S && x.push(`    ${S}`);
          }
        } else if (/%[-+ #0]*[a-zA-Z]/.test(c.text)) {
          t.push(`页面 ${I} 的文本条目含占位符但未绑定变量/显示变量，占位符已移除`);
          const _ = L(c.text.replace(/%[-+ #0]*[a-zA-Z]/g, ""), c.scale);
          _ && x.push(`    ${_}`);
        } else {
          const _ = L(c.text, c.scale);
          _ && x.push(`    ${_}`);
        }
        break;
      }
      case "slider":
      case "progress": {
        const _ = c.kind === "slider" ? "Slider" : "ProgressBar";
        if (F) {
          if (!$t.has(F.srcType)) {
            t.push(`滑块/进度条附加值的变量 "${F.name}" 须为整型（当前 ${F.srcType}），已按静态显示生成`), x.push(`    u8g2_MenuDrawItem${_}(${(c.position / 100).toFixed(2)}f);`);
            break;
          }
          x.push(`    u8g2_MenuDrawItem${_}_bind(&${F.name}, ${Math.trunc(F.step)}, ${Math.trunc(F.min)}, ${Math.trunc(F.max)});`);
        } else {
          const S = Math.min(100, Math.max(0, c.position));
          x.push(`    u8g2_MenuDrawItem${_}(${(S / 100).toFixed(2)}f);`);
        }
        break;
      }
      case "chart": {
        const _ = y.get(c.id), S = v.get(c.id);
        if (!_ || !S) break;
        x.push(..._), x.push(S);
        break;
      }
      case "xbm":
        x.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${Q.get(c.id) ?? Y(c.name, "icon")});`);
        break;
      case "textarea": {
        const _ = ee++;
        x.push(...z[_].split(`
`));
        const S = c.bindScroll ? "u8g2_MenuDrawTextArea_bind" : "u8g2_MenuDrawTextArea";
        x.push(`    ${S}(&ta${_}, ${Math.max(10, Math.trunc(c.height))});`);
        break;
      }
      case "board": {
        const _ = Y(c.cbName, "board_cb"), S = k.get(_) ?? _;
        x.push(`    u8g2_MenuDrawItemBoard(${S}, ${Math.max(1, Math.trunc(c.w))}, ${Math.max(1, Math.trunc(c.h))});`);
        break;
      }
    }
    return x;
  }, $ = [];
  $.push("/**"), $.push(` * 由 u8g2-menu-editor 自动生成，工程: ${s.name}`), $.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), $.push(" *"), $.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："), $.push(` *   u8g2_SetFont(&u8g2, ${n ? "menu_font" : s.font});`), e.forEach((c, w) => $.push(` *   void ${c}(void);   /* 页面: ${s.pages[w].name} */`));
  for (const c of o.values()) $.push(` *   extern ${c.type} ${c.name};`);
  for (const c of A.values()) $.push(` *   void ${c}(u8g2_menu_t *menu, uint8_t ID);`);
  for (const c of k.values()) $.push(` *   void ${c}(u8g2_t *u8g2);`);
  $.push(" */"), $.push('#include "u8g2_menu.h"'), (s.chartBuffers ?? []).some((c) => c.sample === "sine") && $.push("#include <math.h>"), $.push(""), $.push(X("includes", i, "")), $.push(""), e.forEach((c) => $.push(`void ${c}(void);`)), $.push(""), $.push("/* ======================== 变量定义 ======================== */"), $.push(X("variables", i, ""));
  for (const c of o.values()) $.push(`${c.type} ${c.name} = ${c.init};`);
  if ($.push(""), n) {
    $.push("/* ======================== 字体（现场取模） ======================== */"), $.push("/* 仅包含工程文本用到的字形（含 ASCII 95 个 + 额外字符），"), $.push(" * main.c 里 u8g2_SetFont(&u8g2, menu_font) 即可使用；"), $.push(' * 若运行时输出超出此字符集的中文，请在编辑器"额外包含字符"里补充后重新生成。 */');
    const c = [];
    for (let w = 0; w < n.length; w += 16)
      c.push("  " + [...n.slice(w, w + 16)].map((x) => `0x${x.toString(16).padStart(2, "0")}`).join(", ") + ",");
    $.push(`const uint8_t menu_font[${n.length}] U8G2_FONT_SECTION("menu_font") = {`), $.push(...c), $.push("};"), $.push("");
  }
  if ((p.length || f.length || V.length || T.length) && ($.push("/* ======================== 页面资源 ======================== */"), $.push(...p, ...f, ...V, ...T), $.push("")), l.size || d.size) {
    $.push("/* ======================== 回调函数 ======================== */"), $.push(X("callbacks", i, ""));
    for (const [c] of l) {
      const w = A.get(c);
      $.push(`void ${w}(u8g2_menu_t *menu, uint8_t ID)`), $.push("{"), $.push(X(`cb_${w}`, i, "    ")), $.push("}"), $.push("");
    }
    for (const c of d) {
      const w = k.get(c);
      $.push(`void ${w}(u8g2_t *u8g2)`), $.push("{"), $.push(X(`cb_${w}`, i, "    ")), $.push("}"), $.push("");
    }
  }
  const J = (s.weakHooks ?? []).map((c) => se.find((w) => w.fn === c)).filter((c) => !!c);
  if (J.length || i.has("weak") || se.some((c) => (i.get(`weak_${c.fn}`) ?? "").trim())) {
    $.push("/* ==================== 弱定义函数重写 ==================== */"), $.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"), $.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");
    const w = se.filter((x) => {
      var I;
      return !((I = s.weakHooks) != null && I.includes(x.fn)) && (i.get(`weak_${x.fn}`) ?? "").trim();
    }).map((x) => [
      `#if 0   /* 已取消勾选 ${x.fn}，手写内容保留于此；重新勾选后恢复编译 */`,
      `${x.decl}`,
      "{",
      X(`weak_${x.fn}`, i, "    "),
      "}",
      "#endif"
    ].join(`
`)).join(`
`);
    $.push(w ? `${X("weak", i, "").replace(/\n$/, "")}
${w}
` : X("weak", i, "")), $.push("");
    for (const x of J) {
      $.push(`/* ${x.label}: ${x.desc} */`), $.push(`${x.decl}`), $.push("{"), $.push(X(`weak_${x.fn}`, i, "    "));
      const I = x.bodyArgs.split(`
`).map((E) => `    ${E}`);
      x.retNote && I.push(`    ${x.retNote}`), $.push(...I), $.push("}"), $.push("");
    }
  }
  return $.push("/* ======================== 页面函数 ======================== */"), $.push(""), s.pages.forEach((c, w) => {
    $.push(`/* 页面: ${c.name} */`), $.push(`void ${e[w]}(void)`), $.push("{"), $.push(X(`page_${e[w]}_pre`, i, "    "));
    for (const x of c.items) $.push(...ce(x, c));
    $.push("}"), $.push("");
  }), { c: `${$.join(`
`).replace(/\n{3,}/g, `


`)}
`, warnings: t };
}
function yt(s) {
  return {
    raw: s.slice(0, 23),
    glyphCnt: s[0],
    startUpperA: s[17] << 8 | s[18],
    startLowerA: s[19] << 8 | s[20],
    startUnicode: s[21] << 8 | s[22]
  };
}
function ze(s, a, n) {
  const t = [], i = [], r = [], e = [...a].sort((f, y) => f - y);
  for (const f of e) {
    const y = n(f);
    if (!y || !y.length) {
      r.push(f);
      continue;
    }
    f <= 255 ? t.push({ encoding: f, entry: y }) : i.push({ encoding: f, entry: y });
  }
  if (!t.length && !i.length) return null;
  const o = t.length + i.length;
  let u = 0;
  for (const f of t) u += f.entry.length;
  u += 2;
  let l = 4;
  for (const f of i) l += f.entry.length;
  l += 2;
  const d = yt(s), p = new Uint8Array(23 + u + l);
  p.set(d.raw, 0), p[0] = o, p[17] = 0, p[18] = 0, p[19] = 0, p[20] = 0, p[21] = 0, p[22] = 0;
  let b = 23;
  for (const f of t) {
    if (f.encoding === 65) {
      const y = b - 23;
      p[17] = y >> 8 & 255, p[18] = y & 255;
    }
    if (f.encoding === 97) {
      const y = b - 23;
      p[19] = y >> 8 & 255, p[20] = y & 255;
    }
    p.set(f.entry, b), b += f.entry.length;
  }
  p[b] = 0, p[b + 1] = 0, b += 2;
  const m = b - 23;
  p[21] = m >> 8 & 255, p[22] = m & 255, p[b] = 0, p[b + 1] = 4, p[b + 2] = 255, p[b + 3] = 255, b += 4;
  for (const f of i)
    p.set(f.entry, b), b += f.entry.length;
  return p[b] = 0, p[b + 1] = 0, { font: p, included: o, missing: r };
}
function wt(s) {
  return [...s].map((a) => a.codePointAt(0)).filter((a) => Number.isFinite(a));
}
function kt() {
  const s = [];
  for (let a = 32; a <= 126; a++) s.push(a);
  return s;
}
function Ae(s, a) {
  const n = new Set(kt()), t = (i) => {
    for (const r of wt(i)) n.add(r);
  };
  for (const i of s.pages)
    for (const r of i.items)
      r.kind === "text" && t(r.text), r.kind === "textarea" && t(r.content), r.bind.type === "switch" && (t(r.bind.onText), t(r.bind.offText));
  return t(a), n.delete(10), n.delete(13), n;
}
function Oe(s) {
  let a = 0, n = 0;
  for (const t of s) t <= 126 ? a++ : n++;
  return { total: s.size, ascii: a, cjk: n };
}
var R = /* @__PURE__ */ ((s) => (s[s.None = 0] = "None", s[s.Up = 1] = "Up", s[s.Down = 2] = "Down", s[s.Enter = 3] = "Enter", s[s.Return = 4] = "Return", s[s.Add = 5] = "Add", s[s.Sub = 6] = "Sub", s))(R || {});
const It = 64, St = 8192 / 8;
function Et(s) {
  return new Promise((a, n) => {
    const t = document.createElement("script");
    t.src = s, t.onload = () => a(), t.onerror = () => n(new Error(`预览引擎脚本加载失败: ${s}`)), document.head.appendChild(t);
  });
}
class Mt {
  constructor(a, n = {}) {
    this.mod = null, this.img = null, this.raf = 0, this.lastT = 0, this.running = !1, this.fontIndexCache = /* @__PURE__ */ new Map(), this.structSig = "", this.fontSig = null, this.lastKnownPage = 0, this.fontApplyWarning = null, this.canvas = document.createElement("canvas"), this.canvas.width = 128, this.canvas.height = 64, this.canvas.className = "ume-preview-canvas", a.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.events = n;
  }
  /** 加载 WASM 引擎（幂等） */
  async load(a) {
    if (this.mod) return;
    const n = window;
    n.U8G2MenuPreview || await Et(a);
    const t = n.U8G2MenuPreview;
    if (!t) throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");
    this.mod = await t({
      locateFile: (r) => a.replace(/[^/\\]*$/, "") + r
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const i = this.mod._em_font_count_export();
    for (let r = 0; r < i; r++) {
      const e = this.mod._em_font_name(r);
      this.fontIndexCache.set(this.mod.UTF8ToString(e), r);
    }
    this.start();
  }
  get ready() {
    return !!this.mod;
  }
  /** 预览当前所在页（用户在预览里跳转子页面后由此得知） */
  get currentPage() {
    return this.lastKnownPage;
  }
  fontIndex(a) {
    return this.fontIndexCache.get(a) ?? 0;
  }
  /** 结构签名：只有页面/条目结构或资源尺寸变化才重置资源池（保留预览中的编辑值） */
  signature(a) {
    return JSON.stringify({
      bufs: (a.chartBuffers ?? []).map((n) => `${n.name}|${n.dataLen}|${n.sample}`),
      pages: a.pages.map((n) => ({
        n: n.items.length,
        k: n.items.map((t) => t.kind).join(","),
        res: n.items.map((t) => t.kind === "chart" ? (t.sources ?? []).map((i) => `${i.bufferId}|${i.chartKind}|${i.min ?? "a"}|${i.max ?? "a"}`).join(">") : t.kind === "xbm" ? `${t.w}x${t.h}` : t.kind === "textarea" ? Math.ceil(t.content.length / 64) : "").join(",")
      }))
    });
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(a) {
    const n = this.mod;
    if (!n) return;
    const t = this.signature(a);
    t !== this.structSig && (n.ccall("em_reset_dynamic", null, [], []), this.structSig = t);
    const i = (d) => Math.trunc(Number.isFinite(d) ? d : 0), r = { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }, e = { text: 0, slider: 1, progress: 2, chart: 3, xbm: 4, textarea: 5, board: 6 }, o = { none: 0, value: 1, switch: 2, button: 3, submenu: 4, back: 5 }, u = { sine: 0, ramp: 1, noise: 2, none: 3 }, l = (d) => d ? (a.variables ?? []).findIndex((p) => p.id === d) : -1;
    if ((a.variables ?? []).forEach((d, p) => {
      n.ccall(
        "em_var_define",
        null,
        ["number", "number", "number", "number", "number", "number"],
        [p, r[d.type], i(d.initialValue), i(d.step), i(d.min), i(d.max)]
      );
    }), (a.chartBuffers ?? []).forEach((d, p) => {
      n.ccall(
        "em_buf_define",
        null,
        ["number", "number", "number"],
        [p, i(d.dataLen), u[d.sample]]
      );
    }), a.pages.forEach((d, p) => {
      n.ccall("em_page_begin", null, ["number"], [p]), d.items.forEach((b, m) => {
        const f = () => {
          const y = b.bind;
          if (y.type === "none") return;
          const v = y.type === "value" || y.type === "switch", h = v ? (a.variables ?? []).find((T) => T.id === y.varId) : void 0;
          n.ccall(
            "em_page_bind",
            null,
            ["number", "number", "number", "number", "number", "number", "number", "number"],
            [
              p,
              m,
              o[y.type],
              v && h ? r[h.type] : 0,
              y.type === "switch" ? i(y.openValue) : 0,
              y.type === "button" ? i(y.buttonId) : 0,
              y.type === "submenu" ? a.pages.findIndex((T) => T.id === y.targetPageId) : -1,
              v && h ? l(h.id) : -1
            ]
          ), y.type === "switch" && n.ccall(
            "em_item_switch_text",
            null,
            ["number", "number", "string", "string"],
            [p, m, y.onText, y.offText]
          );
        };
        switch (b.kind) {
          case "text":
            n.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [
                p,
                m,
                e.text,
                b.scale,
                0,
                0,
                0,
                b.displayVarId ? l(b.displayVarId) : -1,
                -1
              ]
            ), n.ccall("em_item_text", null, ["number", "number", "string"], [p, m, b.text]), f();
            break;
          case "slider":
          case "progress":
            n.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [p, m, e[b.kind], 1, 0, 0, 0, -1, -1]
            ), f();
            break;
          case "chart":
            n.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [p, m, e.chart, 1, i(b.height), 0, 0, -1, -1]
            );
            for (const y of b.sources ?? [])
              n.ccall(
                "em_item_chart_add",
                null,
                ["number", "number", "number", "number", "number", "number", "number"],
                [
                  p,
                  m,
                  (a.chartBuffers ?? []).findIndex((v) => v.id === y.bufferId),
                  { line: 0, point: 1, bar: 2 }[y.chartKind],
                  y.min !== void 0 && y.max !== void 0 ? 1 : 0,
                  y.max ?? 0,
                  y.min ?? 0
                ]
              );
            f();
            break;
          case "xbm":
            n.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [p, m, e.xbm, 1, 0, i(b.w), i(b.h), -1, -1]
            );
            {
              const y = n._em_scratch(b.bits.length);
              y && (n.HEAPU8.set(new Uint8Array(b.bits), y), n._em_item_bits(p, m, y, b.bits.length));
            }
            f();
            break;
          case "textarea":
            n.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [p, m, e.textarea, 1, i(b.height), 0, 0, -1, -1]
            ), n.ccall("em_item_text", null, ["number", "number", "string"], [p, m, b.content]), f();
            break;
          case "board":
            n.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [p, m, e.board, 1, 0, i(b.w), i(b.h), -1, -1]
            ), f();
            break;
        }
      }), n.ccall("em_page_end", null, ["number", "number"], [p, d.items.length]);
    }), n.ccall("em_pages_commit", null, ["number"], [a.pages.length]), n.ccall(
      "em_set_style",
      null,
      ["number", "number", "number", "number", "number", "number", "number"],
      [
        this.fontIndex(a.font),
        { default: 0, rotundity: 1, square: 2 }[a.selector],
        i(a.selectorLeftMargin),
        i(a.selectorTopMargin),
        i(a.selectorLineSpacing),
        a.marqueeSpeed,
        a.marqueeHeaderLen
      ]
    ), a.fontSubset) {
      const d = Ae(a, a.fontExtra), p = a.font + "|" + [...d].sort((b, m) => b - m).join(",");
      p !== this.fontSig && (this.fontSig = p, this.applyFontSubset(this.fontIndex(a.font), d));
    } else this.fontSig !== null && (this.fontSig = null, this.fontApplyWarning = null);
  }
  /** 应用子集字体到预览引擎；失败时记录 fontApplyWarning（供生成代码时并入警告） */
  applyFontSubset(a, n) {
    this.fontApplyWarning = null;
    const t = this.getFontBytes(a), i = this.glyphFetcher(a), r = t && i ? ze(t, n, i) : null;
    if (!r) {
      this.fontApplyWarning = "现场取模未命中任何字形，预览使用内置字体";
      return;
    }
    this.useCustomFont(r.font) || (this.fontApplyWarning = `子集字体 ${r.font.length} 字节超过预览槽位容量，预览已回退全字库（导出的 menu_font 数组不受影响）`);
  }
  start() {
    if (this.running) return;
    this.running = !0, this.lastT = performance.now();
    const a = (n) => {
      if (!this.running) return;
      const t = Math.min(100, Math.round(n - this.lastT));
      this.lastT = n, this.renderFrame(t), this.raf = requestAnimationFrame(a);
    };
    this.raf = requestAnimationFrame(a);
  }
  stop() {
    this.running = !1, cancelAnimationFrame(this.raf);
  }
  renderFrame(a) {
    var o, u;
    const n = this.mod;
    if (!n) return;
    const t = n._em_frame(a);
    if (!t) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const i = n.HEAPU8.subarray(t, t + St), r = this.img.data;
    r.fill(255);
    for (let l = 0; l < 64; l++) {
      const d = (l >> 3) * 128, p = 1 << (l & 7);
      let b = l * 128 * 4;
      for (let m = 0; m < 128; m++)
        i[d + m] & p && (r[b] = 17, r[b + 1] = 24, r[b + 2] = 39), b += 4;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const e = n._em_get_current_page();
    e !== this.lastKnownPage && (this.lastKnownPage = e, (u = (o = this.events).onPageChanged) == null || u.call(o, e));
  }
  key(a) {
    var n;
    (n = this.mod) == null || n.ccall("em_key", null, ["number"], [a]);
  }
  /** 预览跳转到指定页（不经过子页面链路） */
  navTo(a) {
    var n;
    (n = this.mod) == null || n.ccall("em_nav", null, ["number"], [a]);
  }
  /** 读取内置字体原始字节（现场取模的源数据） */
  getFontBytes(a) {
    const n = this.mod;
    if (!n) return null;
    const t = n.ccall("em_font_data", "number", ["number"], [a]), i = n.ccall("em_font_data_len", "number", ["number"], [a]);
    return !t || !i ? null : n.HEAPU8.slice(t, t + i);
  }
  /** 字形拉取器：从 WASM 真库逐字获取原始条目（与渲染同一路径） */
  glyphFetcher(a) {
    const n = this.mod;
    return n ? (t) => {
      const i = n.ccall("em_scratch", "number", ["number"], [64]), r = n.ccall(
        "em_font_glyph",
        "number",
        ["number", "number", "number", "number"],
        [a, t, 64, i]
      );
      return r ? n.HEAPU8.slice(i, i + r) : null;
    } : null;
  }
  /** 加载自定义（子集）字体并切换；超出槽位容量返回 false */
  useCustomFont(a) {
    const n = this.mod;
    if (!n) return !1;
    const t = n.ccall("em_custom_font_ptr", "number", [], []), i = n.ccall("em_custom_font_max", "number", [], []);
    return a.length > i ? !1 : (n.HEAPU8.set(a, t), n.ccall("em_set_custom_font", null, ["number"], [a.length]), !0);
  }
  /** 读取值池槽位的实时值（绑定变量的条目：槽位 = 变量在池中的下标） */
  getInt(a) {
    var n;
    return ((n = this.mod) == null ? void 0 : n._em_get_ipool(a)) ?? 0;
  }
  getSwitch(a) {
    var n;
    return ((n = this.mod) == null ? void 0 : n._em_get_upool(a)) ?? 0;
  }
  destroy() {
    this.stop(), this.canvas.remove(), this.mod = null;
  }
}
const Ct = Object.keys(le);
function Tt(s, a, n, t) {
  const i = s.getState(), r = n.label || "text" in n && n.text || le[n.kind], e = n.bind.type !== "none" ? ` · ${he[n.bind.type]}` : "", o = (u) => (l) => {
    l.stopPropagation(), s.getState().moveItem(a.id, n.id, u);
  };
  return g`<div class="ume-item-row ${t ? "selected" : ""}"
    @click=${() => s.getState().select(a.id, n.id)}>
    <span class="ume-item-icon">${Ye[n.kind]}</span>
    <span class="ume-item-name" title=${r + e}>${r}${e}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(u) => {
    u.stopPropagation(), i.duplicateItem(a.id, n.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(u) => {
    u.stopPropagation(), i.removeItem(a.id, n.id);
  }}>✕</button>
  </div>`;
}
function Nt(s, a) {
  const n = s.getState();
  return g`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(t) => {
    const i = t.target.value;
    i && n.addItem(i, a.id), t.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${Ct.map((t) => g`<option value=${t}>${le[t]}</option>`)}
  </select>`;
}
function At(s, a) {
  const { project: n, selection: t } = a.getState(), i = (r) => {
    const e = a.getState(), o = t.pageId === r.id;
    return g`<div class="ume-page">
      <div class="ume-page-head ${o ? "selected" : ""}"
        @click=${() => a.getState().select(r.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${r.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(u) => {
      u.stopPropagation(), e.movePage(r.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(u) => {
      u.stopPropagation(), e.movePage(r.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(u) => {
      if (u.stopPropagation(), n.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${r.name}"？`) && e.removePage(r.id);
    }}>✕</button>
      </div>
      ${o ? g`<div class="ume-page-items">
        ${r.items.length ? r.items.map((u) => Tt(a, r, u, t.itemId === u.id)) : g`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Nt(a, r)}</div>
      </div>` : C}
    </div>`;
  };
  ie(g`
    <div class="ume-panel-title">
      页面 / 条目 (${n.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => Vt(a)}>＋ 页面</button>
    </div>
    ${n.pages.map(i)}
  `, s);
}
function Vt(s) {
  const a = prompt("页面名称:", `页面${s.getState().project.pages.length + 1}`);
  a !== null && s.getState().addPage(a || void 0);
}
function q(s, a, n, t = "") {
  return g`<div class="ume-field">
    <label>${s}</label>
    <input type="text" .value=${a ?? ""} placeholder=${t}
      @change=${(i) => n(i.target.value)} />
  </div>`;
}
function D(s, a, n, t = 1) {
  return g`<div class="ume-field">
    <label>${s}</label>
    <input type="number" .value=${String(a)} step=${String(t)}
      @change=${(i) => {
    const r = parseFloat(i.target.value);
    n(Number.isFinite(r) ? r : 0);
  }} />
  </div>`;
}
function G(s, a, n, t) {
  return g`<div class="ume-field">
    <label>${s}</label>
    <select @change=${(i) => t(i.target.value)}>
      ${n.map((i) => g`<option value=${i.value} ?selected=${i.value === a}>${i.label}</option>`)}
    </select>
  </div>`;
}
function Ce(s, a, n) {
  return g`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${a}
      @change=${(t) => n(t.target.checked)} />
    <span>${s}</span>
  </div>`;
}
function Lt(s, a, n, t = !1) {
  return g`<div class="ume-field wide">
    <label>${s}</label>
    <textarea style=${t ? "font-family:Consolas,monospace" : ""}
      @change=${(i) => n(i.target.value)}>${a ?? ""}</textarea>
  </div>`;
}
function Te(s, a, n = "text/plain") {
  const t = new Blob([a], { type: `${n};charset=utf-8` }), i = document.createElement("a");
  i.href = URL.createObjectURL(t), i.download = s, i.click(), setTimeout(() => URL.revokeObjectURL(i.href), 5e3);
}
let we = null;
const qe = {
  uint8: "uint8",
  uint16: "uint16",
  uint32: "uint32",
  int8: "int8",
  int16: "int16",
  int32: "int32",
  int: "int",
  float: "float",
  double: "double"
};
function ke(s, a, n, t) {
  const i = [
    { value: "", label: "（未绑定）" },
    ...n.map((e) => ({ value: e.id, label: `${e.name} : ${qe[e.type] ?? e.type}` }))
  ], r = a ? n.some((e) => e.id === a) : !1;
  return g`
    ${G(s, a ?? "", i, (e) => t(e || null))}
    ${a && !r ? g`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>` : C}
    ${n.length === 0 ? g`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>` : C}
  `;
}
function Ie(s, a) {
  return g`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
    const n = s.getState().addVariable();
    a(n);
  }}>＋ 新建变量并绑定</button>
  </div>`;
}
function Se(s) {
  return s ? g`<div class="ume-hint">
    ${s.name} : ${qe[s.type] ?? s.type}，范围 ${s.min}~${s.max}，步长 ${s.step}，初值 ${s.initialValue}
    （在「资源」页修改变量）
  </div>` : g`${C}`;
}
function Pt(s, a, n) {
  const { project: t, selection: i } = a.getState(), r = t.pages.find((m) => m.id === i.pageId) ?? null, e = (r == null ? void 0 : r.items.find((m) => m.id === i.itemId)) ?? null, o = t.variables ?? [], u = t.chartBuffers ?? [], l = (m, f) => a.getState().updateItem(r.id, e.id, m, f), d = (m) => l({ bind: m });
  let p = g`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, b = "";
  if (r && !e)
    b = "页面属性", p = g`
      ${q("名称", r.name, (m) => a.getState().updatePage(r.id, { name: m }))}
      ${q("C 函数名", r.fnName, (m) => a.getState().updatePage(r.id, { fnName: m }), "留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;
  else if (r && e) {
    (e.bind.type === "value" || e.bind.type === "switch") && e.bind.varId && (we = e.bind.varId), b = `${le[e.kind]}${e.bind.type !== "none" ? ` + ${he[e.bind.type]}` : ""}`;
    let m = g``;
    switch (e.kind) {
      case "text": {
        const v = e, h = o.find((T) => T.id === v.displayVarId);
        m = g`
          ${q("文本/格式", v.text, (T) => l({ text: T }, `text-${v.id}`))}
          ${G("大小", String(v.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (T) => l({ scale: Number(T) }))}
          ${e.bind.type === "none" ? g`
            ${ke("显示变量", v.displayVarId, o, (T) => l({ displayVarId: T }))}
            ${h ? C : Ie(a, (T) => l({ displayVarId: T.id }))}
            ${Se(h)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>` : C}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const v = e;
        m = g`
          ${e.bind.type === "none" ? g`
            ${D("静态位置(%)", v.position, (h) => l({ position: Math.min(100, Math.max(0, Math.trunc(h))) }))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>` : C}
        `;
        break;
      }
      case "chart": {
        const v = e, h = (V) => l({ sources: V }), T = (V, z) => {
          const O = u.find((U) => U.id === V.bufferId), Q = V.min === void 0 || V.max === void 0;
          return g`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(O == null ? void 0 : O.name) ?? "(无效)"}</span>
              <span class="ume-var-meta">${{ line: "折线", point: "散点", bar: "柱状" }[V.chartKind] ?? V.chartKind}${Q ? " · 自动量程" : ` · ${V.min}~${V.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${() => h(v.sources.filter((U, A) => A !== z))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${G("缓冲区", V.bufferId, u.map((U) => ({ value: U.id, label: `${U.name} (${U.dataLen}点)` })), (U) => h(v.sources.map((A, k) => k === z ? { ...A, bufferId: U } : A)))}
              ${G("绘制", V.chartKind, [
            { value: "line", label: "折线" },
            { value: "point", label: "散点" },
            { value: "bar", label: "柱状" }
          ], (U) => h(v.sources.map((A, k) => k === z ? { ...A, chartKind: U } : A)))}
              ${Ce("自动量程", Q, (U) => h(v.sources.map((A, k) => k === z ? { ...A, min: U ? void 0 : 0, max: U ? void 0 : 100 } : A)))}
              ${Q ? C : g`
                ${D("量程上限", V.max ?? 100, (U) => h(v.sources.map((A, k) => k === z ? { ...A, max: U } : A)), "any")}
                ${D("量程下限", V.min ?? 0, (U) => h(v.sources.map((A, k) => k === z ? { ...A, min: U } : A)), "any")}`}
            </div>
          </div>`;
        };
        m = g`
          ${D("高度(px)", v.height, (V) => l({ height: Math.max(4, Math.trunc(V)) }))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(v.sources ?? []).map(T)}
              ${(v.sources ?? []).length === 0 ? g`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>` : C}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(v.sources ?? []).length >= 4}
                @click=${() => {
          if (!u.length) {
            const V = a.getState().addChartBuffer();
            h([...v.sources ?? [], { bufferId: V.id, chartKind: "line" }]);
            return;
          }
          h([...v.sources ?? [], { bufferId: u[0].id, chartKind: "line" }]);
        }}>＋ 添加数据源${(v.sources ?? []).length > 0 ? "（叠加）" : ""}</button>
              ${u.length ? C : g`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;
        break;
      }
      case "xbm": {
        const v = e;
        m = g`
          ${q("数组名", v.name, (h) => l({ name: h }))}
          ${D("宽(px)", v.w, (h) => l({ w: Math.min(128, Math.max(1, Math.trunc(h))) }))}
          ${D("高(px)", v.h, (h) => l({ h: Math.min(64, Math.max(1, Math.trunc(h))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => n.openXbmEditor(r.id, v.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${v.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const v = e;
        m = g`
          ${Lt("文本内容", v.content, (h) => l({ content: h }))}
          ${D("高度(px)", v.height, (h) => l({ height: Math.max(10, Math.trunc(h)) }))}
          ${D("行间距", v.lineSpacing, (h) => l({ lineSpacing: Math.max(0, Math.trunc(h)) }))}
          ${Ce("上下键滚动 (bind)", v.bindScroll, (h) => l({ bindScroll: h }))}
        `;
        break;
      }
      case "board": {
        const v = e;
        m = g`
          ${D("宽(px)", v.w, (h) => l({ w: Math.max(1, Math.trunc(h)) }))}
          ${D("高(px)", v.h, (h) => l({ h: Math.max(1, Math.trunc(h)) }))}
          ${q("回调函数名", v.cbName, (h) => l({ cbName: h }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
    const f = e.bind;
    let y = g``;
    switch (f.type) {
      case "none":
        y = g`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;
        break;
      case "value": {
        const v = o.find((h) => h.id === f.varId);
        y = g`
          ${ke("变量", f.varId, o, (h) => d({ type: "value", varId: h }))}
          ${v ? C : Ie(a, (h) => d({ type: "value", varId: h.id }))}
          ${Se(v)}
          ${e.kind === "text" ? g`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>` : C}
        `;
        break;
      }
      case "switch": {
        const v = o.filter((h) => h.type === "uint8").find((h) => h.id === f.varId) ?? o.find((h) => h.id === f.varId);
        y = g`
          ${ke("变量 (uint8)", f.varId, o.filter((h) => h.type === "uint8"), (h) => d({ type: "switch", varId: h, openValue: f.openValue, onText: f.onText, offText: f.offText }))}
          ${v ? C : Ie(a, (h) => d({ type: "switch", varId: h.id, openValue: f.openValue, onText: f.onText, offText: f.offText }))}
          ${Se(v)}
          ${D("openValue", f.openValue, (h) => d({ type: "switch", varId: f.varId, openValue: Math.max(0, Math.trunc(h)), onText: f.onText, offText: f.offText }))}
          ${q('"开"文本', f.onText, (h) => d({ type: "switch", varId: f.varId, openValue: f.openValue, onText: h, offText: f.offText }))}
          ${q('"关"文本', f.offText, (h) => d({ type: "switch", varId: f.varId, openValue: f.openValue, onText: f.onText, offText: h }))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case "button":
        y = g`
          ${q("回调函数名", f.cbName, (v) => d({ type: "button", cbName: v, buttonId: f.buttonId }))}
          ${D("ID", f.buttonId, (v) => d({ type: "button", cbName: f.cbName, buttonId: Math.max(0, Math.trunc(v)) }))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;
        break;
      case "submenu":
        y = g`
          ${G("目标页面", f.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...t.pages.filter((v) => v.id !== r.id).map((v) => ({ value: v.id, label: v.name }))
        ], (v) => d({ type: "submenu", targetPageId: v || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;
        break;
      case "back":
        y = g`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;
        break;
    }
    p = g`
      <div class="ume-panel-title">绘制</div>
      ${m}
      <div class="ume-panel-title">附加值</div>
      ${G("类型", f.type, Object.keys(he).map((v) => ({ value: v, label: he[v] })), (v) => {
      const h = e.bind;
      d(v === "value" ? { type: "value", varId: h.type === "value" || h.type === "switch" ? h.varId : we } : v === "switch" ? { type: "switch", varId: h.type === "value" || h.type === "switch" ? h.varId : we, openValue: 1, onText: "on", offText: "off" } : v === "button" ? { type: "button", cbName: "btn_action_cb", buttonId: 1 } : v === "submenu" ? { type: "submenu", targetPageId: h.type === "submenu" ? h.targetPageId : null } : { type: "none" });
    })}
      ${y}
    `;
  }
  ie(g`
    ${b ? g`<div class="ume-panel-title"><span class="ume-kind-badge">${b}</span></div>` : C}
    ${p}
  `, s);
}
let fe = null, Ee = null, Me = null, Pe = "";
const Bt = [
  { value: "uint8", label: "uint8 (0~255)" },
  { value: "int8", label: "int8 (-128~127)" },
  { value: "uint16", label: "uint16 (0~65535)" },
  { value: "int16", label: "int16 (-32768~32767)" },
  { value: "uint32", label: "uint32" },
  { value: "int32", label: "int32" },
  { value: "int", label: "int" },
  { value: "float", label: "float (小数)" },
  { value: "double", label: "double (小数)" }
];
function Dt(s, a, n) {
  const t = a.variables ?? [], i = (e) => {
    fe = fe === e ? null : e, n();
  }, r = (e) => {
    const o = fe === e.id, u = (m, f) => s.getState().updateVariable(e.id, m, f), l = e.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.name), d = e.name && !l && !Ne(e.name), p = t.filter((m) => m.name === e.name).length > 1, b = Kt(a, e.id);
    return g`<div class="ume-var-item ${o ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => i(e.id)}>
        <span class="ume-var-name" title=${e.name}>${e.name || "(未命名)"}</span>
        <span class="ume-var-meta">${e.type} · ${e.min}~${e.max} · 步${e.step}${b ? ` · ${b} 处引用` : ""}</span>
        <button class="ume-mini" title="删除变量" @click=${(m) => {
      m.stopPropagation();
      const f = s.getState().removeVariable(e.id);
      f > 0 && alert(`该变量被 ${f} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`);
    }}>✕</button>
      </div>
      ${o ? g`<div class="ume-var-edit">
        ${q("变量名", e.name, (m) => u({ name: m.trim() }, `vn-${e.id}`))}
        ${l ? g`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>` : C}
        ${d ? g`<div class="ume-warn">变量名是 C 关键字，生成的代码会自动改名（如 ${e.name}_），建议换个名字</div>` : C}
        ${p ? g`<div class="ume-warn">变量名重复，生成时以第一个为准</div>` : C}
        ${G("类型", e.type, Bt, (m) => u({ type: m }))}
        ${D("初始值", e.initialValue, (m) => u({ initialValue: m }, `vi-${e.id}`), "any")}
        ${D("最小值", e.min, (m) => u({ min: m }, `vmin-${e.id}`), "any")}
        ${D("最大值", e.max, (m) => u({ max: m }, `vmax-${e.id}`), "any")}
        ${D("步长", e.step, (m) => u({ step: m }, `vs-${e.id}`), "any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>` : C}
    </div>`;
  };
  return g`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${() => {
    fe = s.getState().addVariable().id;
  }}>＋ 新建</button>
    </div>
    ${t.length ? t.map(r) : g`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `;
}
function Kt(s, a) {
  let n = 0;
  for (const t of s.pages)
    for (const i of t.items)
      "varId" in i && i.varId === a && n++;
  return n;
}
function Ut(s, a, n) {
  const t = a.chartBuffers ?? [], i = (e) => {
    let o = 0;
    for (const u of a.pages)
      for (const l of u.items)
        l.kind === "chart" && l.sources.some((d) => d.bufferId === e) && o++;
    return o;
  }, r = (e) => {
    const o = Ee === e.id, u = (b, m) => s.getState().updateChartBuffer(e.id, b, m), l = e.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.name), d = e.name && !l && !Ne(e.name), p = i(e.id);
    return g`<div class="ume-var-item ${o ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => {
      Ee = o ? null : e.id, n();
    }}>
        <span class="ume-var-name" title=${e.name}>${e.name || "(未命名)"}</span>
        <span class="ume-var-meta">${e.dataLen} 点 · ${{ sine: "正弦", ramp: "斜坡", noise: "伪随机", none: "手动填充" }[e.sample]}${p ? ` · ${p} 处引用` : ""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${(b) => {
      b.stopPropagation();
      const m = s.getState().removeChartBuffer(e.id);
      m > 0 && alert(`该缓冲区被 ${m} 个图表条目的数据源引用，请先在条目里移除数据源再删除`);
    }}>✕</button>
      </div>
      ${o ? g`<div class="ume-var-edit">
        ${q("数组名", e.name, (b) => u({ name: b.trim() }, `bn-${e.id}`))}
        ${l ? g`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>` : C}
        ${d ? g`<div class="ume-warn">数组名是 C 关键字，生成的代码会自动改名（如 ${e.name}_），建议换个名字</div>` : C}
        ${D("点数", e.dataLen, (b) => u({ dataLen: Math.min(512, Math.max(2, Math.trunc(b))) }, `bl-${e.id}`))}
        ${G("示例填充", e.sample, [
      { value: "sine", label: "正弦（演示）" },
      { value: "ramp", label: "斜坡（演示）" },
      { value: "noise", label: "伪随机（演示）" },
      { value: "none", label: "不填充（全部手写）" }
    ], (b) => u({ sample: b }))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>` : C}
    </div>`;
  };
  return g`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${() => {
    Ee = s.getState().addChartBuffer().id;
  }}>＋ 新建</button>
    </div>
    ${t.length ? t.map(r) : g`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `;
}
function Ft(s, a, n) {
  const t = at(a), i = (e, o) => {
    const u = o.trim();
    !u || u === e || (s.getState().update((l) => {
      for (const d of l.pages)
        for (const p of d.items)
          p.bind.type === "button" && p.bind.cbName === e && (p.bind.cbName = u), p.kind === "board" && p.cbName === e && (p.cbName = u);
    }, `cbname-${Pe}`), Me = u);
  }, r = (e) => {
    const o = Me === e.name, u = e.asButton && e.asBoard ? "按钮+画板" : e.asButton ? "按钮" : "画板", l = e.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.name), d = e.name && !l && !Ne(e.name);
    return g`<div class="ume-var-item ${o ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => {
      Me = o ? null : e.name, Pe = e.name, n();
    }}>
        <span class="ume-var-name" title=${e.name}>${e.name || "(未命名)"}</span>
        <span class="ume-var-meta">${u} · ${e.refs.length} 处引用</span>
      </div>
      ${o ? g`<div class="ume-var-edit">
        ${q("回调函数名", e.name, (p) => i(e.name, p))}
        ${l ? g`<div class="ume-warn">回调名不是合法的 C 标识符，生成时会自动清洗</div>` : C}
        ${d ? g`<div class="ume-warn">回调名是 C 关键字，生成的代码会自动改名（如 ${e.name}_），建议换个名字</div>` : C}
        ${e.asButton ? g`<div class="ume-hint">按钮签名：void ${e.name}(u8g2_menu_t *menu, uint8_t ID) —— 选中该条目时任意按键触发</div>` : C}
        ${e.asBoard ? g`<div class="ume-hint">画板签名：void ${e.name}(u8g2_t *u8g2) —— 在指定宽高内用 u8g2 画图</div>` : C}
        <div class="ume-hint">回调逻辑写在生成的 menu_pages.c 的 cb_${Y(e.name)} USER CODE 区内（重新生成保留）</div>
        <div class="ume-hint">引用此回调的条目（点击定位到属性面板）：</div>
        ${e.refs.map((p) => g`<div class="ume-cb-ref" title="点击定位"
          @click=${() => s.getState().select(p.pageId, p.itemId)}>${p.pageName} / ${p.label}</div>`)}
      </div>` : C}
    </div>`;
  };
  return g`
    <div class="ume-panel-title">回调函数 (${t.length})</div>
    ${t.length ? t.map(r) : g`<div class="ume-empty-hint">
      按钮附加值与画板条目的回调函数会自动收集到这里：
      统一改名、查看 C 签名、点击引用定位到条目。
    </div>`}
  `;
}
function He(s, a) {
  const { project: n } = a.getState(), t = () => He(s, a);
  ie(g`
    ${Dt(a, n, t)}
    ${Ut(a, n, t)}
    ${Ft(a, n, t)}
  `, s);
}
function jt(s, a) {
  const { project: n } = a.getState(), t = (o, u) => a.getState().update((l) => {
    Object.assign(l, o);
  }, u), i = n.weakHooks ?? [], r = (o, u) => {
    a.getState().update((l) => {
      const d = l.weakHooks ?? [];
      l.weakHooks = u ? [.../* @__PURE__ */ new Set([...d, o])] : d.filter((p) => p !== o);
    });
  }, e = g`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${i.length}/${se.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${se.map((o) => g`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote ? "（返回 1 = 事件已处理 / 0 = 交给库）" : ""}`}>
              <input type="checkbox" ?checked=${i.includes(o.fn)}
                @change=${(u) => r(o.fn, u.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;
  ie(g`
    <div class="ume-panel-title">工程</div>
    ${q("工程名", n.name, (o) => t({ name: o }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${n.width}×${n.height}
        ${n.width !== 128 || n.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${G(
    "字体",
    n.font,
    Ge.map((o) => ({ value: o.id, label: o.label })),
    (o) => t({ font: o })
  )}
    ${Ce("中文现场取模（仅包含用到的字形）", n.fontSubset, (o) => t({ fontSubset: o }))}
    ${n.fontSubset ? g`
      ${q("额外包含字符", n.fontExtra, (o) => t({ fontExtra: o }))}
      ${(() => {
    const o = Oe(Ae(n, n.fontExtra));
    return g`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`;
  })()}` : C}
    ${G("选择器", n.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (o) => t({ selector: o }))}
    ${D("左边距", n.selectorLeftMargin, (o) => t({ selectorLeftMargin: Math.max(0, Math.trunc(o)) }))}
    ${D("顶边距", n.selectorTopMargin, (o) => t({ selectorTopMargin: Math.max(0, Math.trunc(o)) }))}
    ${D("行间距", n.selectorLineSpacing, (o) => t({ selectorLineSpacing: Math.max(0, Math.trunc(o)) }))}
    ${D("跑马灯速度", n.marqueeSpeed, (o) => t({ marqueeSpeed: Math.max(0, o) }), 0.05)}
    ${D("跑马灯停留", n.marqueeHeaderLen, (o) => t({ marqueeHeaderLen: Math.max(0, o) }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${e}
  `, s);
}
function Rt(s, a) {
  const n = (i) => {
    let r;
    const e = () => {
      r && (clearInterval(r), r = void 0);
    };
    return {
      down: (o) => {
        o.preventDefault(), a.key(i), e(), r = window.setInterval(() => a.key(i), 180);
      },
      up: e
    };
  }, t = (i, r, e) => {
    const o = n(i);
    return g`<button class="ume-key" title=${e}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${r}</button>`;
  };
  ie(g`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(i) => {
    const e = {
      ArrowUp: R.Up,
      ArrowDown: R.Down,
      Enter: R.Enter,
      Escape: R.Return,
      Backspace: R.Return,
      "+": R.Add,
      "-": R.Sub,
      "=": R.Add,
      _: R.Sub
    }[i.key];
    e !== void 0 && (i.preventDefault(), a.key(e));
  }}>
      ${a.canvas}
    </div>
    <div class="ume-keybar">
      ${t(R.Up, "▲", "上 MENU_Key_Up")}
      ${t(R.Down, "▼", "下 MENU_Key_Down")}
      ${t(R.Enter, "OK", "确认 MENU_Key_Enter")}
      ${t(R.Return, "⌫", "返回 MENU_Key_Return")}
      ${t(R.Add, "＋", "加 MENU_Key_Add")}
      ${t(R.Sub, "－", "减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `, s);
}
function zt(s, a) {
  s.querySelectorAll(":scope > .ume-modal-mask").forEach((t) => t.remove());
  const n = document.createElement("div");
  n.className = "ume-modal-mask", n.addEventListener("click", (t) => {
    t.target === n && Be(n);
  }), ie(g`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${() => Be(n)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${a.warnings.length ? g`
          <div style="margin-bottom:8px">
            ${a.warnings.map((t) => g`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>` : C}
        <div class="ume-code-view">${a.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${() => {
    navigator.clipboard.writeText(a.c).then(() => Ot(n, "已复制到剪贴板"));
  }}>复制</button>
        <button class="ume-btn primary" @click=${() => {
    Te("menu_pages.c", a.c);
  }}>下载 menu_pages.c</button>
      </div>
    </div>
  `, n), s.appendChild(n);
}
function Be(s) {
  s.remove();
}
function Ot(s, a) {
  const n = s.closest(".ume") ?? document.body;
  let t = n.querySelector(".ume-toast");
  t || (t = document.createElement("div"), t.className = "ume-toast", n.appendChild(t)), t.textContent = a, t.classList.add("show"), setTimeout(() => t.classList.remove("show"), 1600);
}
function qt(s, a, n, t) {
  const r = a.getState().project.pages.find((k) => k.id === n), e = r == null ? void 0 : r.items.find((k) => k.id === t);
  if (!e || e.kind !== "xbm") return;
  const o = e;
  let u = o.w, l = o.h, d = [...o.bits];
  const p = () => Math.ceil(u / 8), b = document.createElement("div");
  b.className = "ume-modal-mask", b.addEventListener("click", (k) => {
    k.target === b && A();
  });
  const m = (k, L) => {
    const j = L * p() + (k >> 3);
    return j < d.length ? !!(d[j] >> (k & 7) & 1) : !1;
  }, f = (k, L, j) => {
    const ee = L * p() + (k >> 3);
    d[ee] = j ? d[ee] | 1 << (k & 7) : d[ee] & ~(1 << (k & 7));
  }, y = (k, L) => {
    const j = Math.ceil(u / 8), ee = Math.ceil(k / 8), ce = new Array(ee * L).fill(0);
    for (let $ = 0; $ < Math.min(l, L); $++)
      for (let J = 0; J < Math.min(u, k); J++) {
        const ve = $ * j + (J >> 3);
        ve < d.length && d[ve] >> (J & 7) & 1 && (ce[$ * ee + (J >> 3)] |= 1 << (J & 7));
      }
    u = k, l = L, d = ce;
  };
  let v = !1, h = !0;
  const T = (k, L) => (j) => {
    j.preventDefault(), v = !0, h = !m(k, L), f(k, L, h), O();
  }, V = (k, L) => () => {
    v && (f(k, L, h), O());
  }, z = () => {
    v = !1;
  }, O = () => {
    ie(U(), b);
  }, Q = () => {
    const k = [];
    for (let L = 0; L < l; L++)
      for (let j = 0; j < u; j++)
        k.push(g`<button class="ume-xbm-cell ${m(j, L) ? "on" : ""}"
          data-x=${j} data-y=${L}
          @pointerdown=${T(j, L)}
          @pointerenter=${V(j, L)}></button>`);
    return k;
  }, U = () => g`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${l}</span></span>
        <button class="ume-mini" @click=${A}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${z}
        @pointerleave=${z}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${(k) => {
    y(De(+k.target.value, 1, 128), l), O();
  }} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${(k) => {
    y(u, De(+k.target.value, 1, 64)), O();
  }} />
          <button class="ume-btn sm" @click=${() => {
    d = d.map(() => 0), O();
  }}>清空</button>
          <button class="ume-btn sm" @click=${() => {
    d = d.map((k) => ~k & 255), O();
  }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${Q()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${A}>取消</button>
        <button class="ume-btn primary" @click=${() => {
    a.getState().updateItem(n, t, { w: u, h: l, bits: [...d] }), A();
  }}>应用</button>
      </div>
    </div>
  `;
  function A() {
    b.remove(), document.removeEventListener("pointerup", z);
  }
  document.addEventListener("pointerup", z), O(), s.appendChild(b);
}
function De(s, a, n) {
  return Number.isFinite(s) ? Math.min(n, Math.max(a, Math.trunc(s))) : a;
}
const Ht = "prebuilt/u8g2-menu-preview.js";
class Zt {
  constructor(a, n = {}) {
    var b;
    if (this.store = st(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.activateRightTab = () => {
    }, this.container = a, this.opts = { persistKey: "default", ...n }, a.classList.add("ume"), !document.getElementById("ume-style")) {
      const m = document.createElement("style");
      m.id = "ume-style", m.textContent = Ze, document.head.appendChild(m);
    }
    const t = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, i = this.opts.data ?? t ?? void 0;
    if (i !== void 0)
      try {
        this.store.setState({ project: ye(i) });
      } catch (m) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", m);
      }
    const r = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null;
    r && (this.lastExport = { c: r }), a.innerHTML = `
      <div class="ume-toolbar">
        <span class="ume-title">⬒ u8g2_menu 编辑器</span>
        <button class="ume-btn sm" data-act="add-page">＋页面</button>
        <button class="ume-btn sm" data-act="undo">撤销</button>
        <button class="ume-btn sm" data-act="redo">重做</button>
        <span class="ume-sep"></span>
        <button class="ume-btn sm" data-act="import">导入 JSON</button>
        <button class="ume-btn sm" data-act="export-json">导出 JSON</button>
        <span class="ume-spacer"></span>
        <button class="ume-btn primary sm" data-act="generate">⚡ 生成 C 代码</button>
      </div>
      <div class="ume-main">
        <div class="ume-left"></div>
        <div class="ume-center"></div>
        <div class="ume-right">
          <div class="ume-tabs">
            <button data-tab="prop" class="active">属性</button>
            <button data-tab="res">资源</button>
            <button data-tab="set">设置</button>
          </div>
          <div data-role="prop"></div>
          <div data-role="res" style="display:none"></div>
          <div data-role="set" style="display:none"></div>
        </div>
      </div>
      <input type="file" accept=".json,application/json" style="display:none" data-role="file">
    `;
    const e = (m) => a.querySelector(m);
    this.els = {
      left: e(".ume-left"),
      center: e(".ume-center"),
      right: e(".ume-right"),
      propEl: e('[data-role="prop"]'),
      resEl: e('[data-role="res"]'),
      setEl: e('[data-role="set"]'),
      toolbarUndo: e('[data-act="undo"]'),
      toolbarRedo: e('[data-act="redo"]')
    };
    const o = document.createElement("div");
    o.style.display = "flex", o.style.flexDirection = "column", o.style.alignItems = "center", o.style.gap = "10px", this.els.center.appendChild(o), this.preview = new Mt(o, {
      onPageChanged: (m) => this.onPreviewPageChanged(m)
    });
    const u = document.createElement("div");
    this.els.center.appendChild(u), Rt(u, this.preview), this.preview.load(this.opts.wasmUrl ?? Ht).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((m) => {
      console.error(m);
      const f = document.createElement("div");
      f.className = "ume-warn", f.textContent = `预览引擎加载失败: ${m.message}。编辑功能不受影响。`, this.els.center.prepend(f);
    }), a.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const m = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      m !== null && this.store.getState().addPage(m || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), a.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      Te(
        `${this.store.getState().project.name || "menu-project"}.json`,
        Le(this.store.getState().project),
        "application/json"
      );
    }), a.querySelector('[data-act="import"]').addEventListener("click", () => {
      e('[data-role="file"]').click();
    }), e('[data-role="file"]').addEventListener("change", (m) => {
      var y;
      const f = (y = m.target.files) == null ? void 0 : y[0];
      f && (f.text().then((v) => {
        try {
          const h = ye(v);
          this.store.getState().update((T) => {
            Object.assign(T, h);
          }), this.scheduleRender();
        } catch (h) {
          alert(`导入失败: ${h.message}`);
        }
      }), m.target.value = "");
    }), a.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate());
    const l = a.querySelectorAll(".ume-tabs button"), d = (m) => {
      l.forEach((f) => f.classList.toggle("active", f.dataset.tab === m)), this.els.propEl.style.display = m === "prop" ? "" : "none", this.els.resEl.style.display = m === "res" ? "" : "none", this.els.setEl.style.display = m === "set" ? "" : "none";
    };
    l.forEach((m) => {
      m.addEventListener("click", () => d(m.dataset.tab ?? "prop"));
    }), this.activateRightTab = d, this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((b = this.store.getState().project.pages[0]) == null ? void 0 : b.id) ?? null, null);
    let p = null;
    this.store.subscribe(() => {
      this.preview.sync(this.store.getState().project), this.persist(), this.scheduleRender(), this.notifyChange();
      const m = this.store.getState().selection.itemId;
      m && m !== p && this.activateRightTab("prop"), p = m;
    }), this.scheduleRender(), this.persist(), this.liveTimer = window.setInterval(() => {
      this.destroyed || this.updateLiveInfo();
    }, 300);
  }
  /* ---------------- 公共 API ---------------- */
  getData() {
    return structuredClone(this.store.getState().project);
  }
  loadData(a) {
    var t;
    const n = ye(a);
    this.store.getState().update((i) => {
      Object.assign(i, n);
    }), this.store.getState().select(((t = n.pages[0]) == null ? void 0 : t.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var n, t;
    const a = this.produceCode();
    return zt(this.container, a), (t = (n = this.opts).onExport) == null || t.call(n, a), a;
  }
  downloadC() {
    const a = this.produceCode();
    Te("menu_pages.c", a.c);
  }
  /** 生成路径（generate/downloadC 共用）：现场取模 + 警告收口 + 保留 USER CODE */
  produceCode() {
    const a = this.lastExport, n = this.store.getState().project;
    let t;
    const i = [];
    if (n.fontSubset) {
      if (!this.preview.ready)
        i.push("现场取模需要预览引擎，当前引擎不可用：本次未生成 menu_font，代码将引用内置字体");
      else {
        const o = Ae(n, n.fontExtra), u = this.buildFontSubset(n, o);
        if ("error" in u)
          i.push(`${u.error}，本次按内置字体生成`);
        else {
          t = u.result.font;
          const l = Oe(o);
          if (i.push(`现场取模：收录 ${l.total} 个字符（ASCII ${l.ascii} + 扩展 ${l.cjk}），字体数组 ${u.result.font.length} 字节。运行时若输出超出字符集的中文，请在设置里补充额外字符`), u.result.included > 255 && i.push(`子集字形数 ${u.result.included} 超过 255：字体头 glyph_cnt 字段将回绕（记录为 ${u.result.included & 255}），如遇渲染异常请在"额外包含字符"里精简`), u.result.missing.length) {
            const d = u.result.missing.slice(0, 5).map((p) => String.fromCodePoint(p)).join(" ");
            i.push(`字符集中 ${u.result.missing.length} 个字符未在源字体中找到（如 ${d}），运行时这些字符无法显示`);
          }
        }
      }
      const e = this.preview.fontApplyWarning;
      e && i.push(e);
    }
    const r = _t(n, a ?? void 0, t);
    return r.warnings.unshift(...i), this.lastExport = { c: r.c }, this.opts.persistKey && localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, r.c), r;
  }
  /** 现场取模：从 WASM 真库逐字拉取字形，生成子集字体 */
  buildFontSubset(a, n) {
    const t = this.preview.fontIndex(a.font), i = this.preview.getFontBytes(t), r = this.preview.glyphFetcher(t);
    if (!i || !r) return { error: "现场取模失败：无法读取源字体数据" };
    const e = ze(i, n, r);
    return e ? { result: e } : { error: "现场取模失败：字符集未命中任何字形" };
  }
  destroy() {
    this.destroyed = !0, document.removeEventListener("keydown", this.onKeyDown), this.liveTimer !== void 0 && window.clearInterval(this.liveTimer), clearTimeout(this.saveTimer), clearTimeout(this.changeTimer), this.preview.destroy(), this.container.innerHTML = "";
  }
  /* ---------------- 内部 ---------------- */
  onKeyDown(a) {
    const n = a.target;
    n.tagName === "INPUT" || n.tagName === "TEXTAREA" || n.tagName === "SELECT" || ((a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "z" ? (a.preventDefault(), a.shiftKey ? this.store.getState().redo() : this.store.getState().undo()) : (a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "y" && (a.preventDefault(), this.store.getState().redo()));
  }
  onPreviewPageChanged(a) {
    const n = this.store.getState().project.pages[a];
    n && this.store.getState().select(n.id, null);
  }
  persist() {
    !this.opts.persistKey || this.destroyed || (clearTimeout(this.saveTimer), this.saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(
          `ume_autosave_${this.opts.persistKey}`,
          Le(this.store.getState().project)
        );
      } catch {
      }
    }, 400));
  }
  notifyChange() {
    this.opts.onChange && (clearTimeout(this.changeTimer), this.changeTimer = window.setTimeout(() => {
      this.opts.onChange(structuredClone(this.store.getState().project));
    }, 300));
  }
  scheduleRender() {
    this.renderScheduled || (this.renderScheduled = !0, requestAnimationFrame(() => {
      if (this.renderScheduled = !1, this.destroyed) return;
      const a = this.store.getState();
      At(this.els.left, this.store), jt(this.els.setEl, this.store), He(this.els.resEl, this.store), Pt(this.els.propEl, this.store, {
        openXbmEditor: (n, t) => qt(this.container, this.store, n, t)
      }), this.els.toolbarUndo.disabled = a.past.length === 0, this.els.toolbarRedo.disabled = a.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var r;
    const a = document.getElementById("ume-live-value"), n = document.getElementById("ume-page-jump"), t = this.store.getState(), i = this.store.getState().project.pages.findIndex((e) => e.id === t.selection.pageId);
    if (n) {
      const e = t.project.pages, o = e.map((l) => l.name).join("|");
      n.dataset.sig !== o && (n.dataset.sig = o, n.innerHTML = "", e.forEach((l, d) => {
        const p = document.createElement("option");
        p.value = String(d), p.textContent = `${d + 1}. ${l.name}`, n.appendChild(p);
      }), n.onchange = () => {
        const l = parseInt(n.value, 10);
        Number.isFinite(l) && this.preview.navTo(l);
      });
      const u = this.preview.currentPage;
      document.activeElement !== n && n.value !== String(u) && (n.value = String(u));
    }
    if (a && i >= 0 && t.selection.itemId) {
      const e = t.project.pages[i], o = e.items.findIndex((m) => m.id === t.selection.itemId), u = e.items[o], l = u == null ? void 0 : u.bind, d = (l == null ? void 0 : l.type) === "value" || (l == null ? void 0 : l.type) === "switch" ? l.varId : null, p = (u == null ? void 0 : u.kind) === "text" && (l == null ? void 0 : l.type) === "none" ? u.displayVarId : null, b = d ?? p;
      if (u && b) {
        const m = (t.project.variables ?? []).findIndex((T) => T.id === b), f = m >= 0 ? m : i * It + o, v = (l == null ? void 0 : l.type) === "switch" ? this.preview.getSwitch(f) : this.preview.getInt(f), h = (r = (t.project.variables ?? []).find((T) => T.id === b)) == null ? void 0 : r.name;
        a.textContent = `${h ?? u.kind} = ${v}`;
      } else
        a.textContent = "";
    }
  }
}
export {
  Zt as MenuEditor,
  R as MenuKey
};
//# sourceMappingURL=u8g2-menu-editor.js.map
