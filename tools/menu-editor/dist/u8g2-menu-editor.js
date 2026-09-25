import { createStore as de } from "zustand/vanilla";
import { render as B, html as x, nothing as G } from "lit-html";
const pe = `/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-msgbox-row { display: flex; gap: 6px; align-items: center; }
.ume-msgbox-row input[type="text"] { width: 160px; }

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
`;
let te = 0;
function J(a) {
  return te = (te + 1) % 1e9, `${a}_${Date.now().toString(36)}_${te.toString(36)}`;
}
function L(a) {
  const t = { id: J("it"), label: "" };
  switch (a) {
    case "text":
      return { ...t, kind: a, text: "菜单项", scale: 1 };
    case "number":
      return {
        ...t,
        kind: a,
        text: "v:%d",
        scale: 1,
        varType: "int32",
        varName: "var_value",
        step: 1,
        min: 0,
        max: 100,
        decimals: 1,
        initialValue: 50
      };
    case "switch":
      return {
        ...t,
        kind: a,
        text: "s:%s",
        scale: 1,
        varName: "var_switch",
        openValue: 1,
        onText: "on",
        offText: "off",
        initialValue: 0
      };
    case "button":
      return { ...t, kind: a, text: "执行操作", scale: 1, cbName: "btn_action_cb", buttonId: 1 };
    case "submenu":
      return { ...t, kind: a, text: "下一级", scale: 1, targetPageId: null };
    case "back":
      return { ...t, kind: a, text: "返回", scale: 1 };
    case "slider":
      return { ...t, kind: a, varName: "var_slider", step: 2, min: 0, max: 100, initialValue: 50 };
    case "progress":
      return { ...t, kind: a, varName: "var_prog", step: 2, min: 0, max: 100, initialValue: 70 };
    case "chart":
      return {
        ...t,
        kind: a,
        chartKind: "line",
        dataLen: 24,
        height: 32,
        sample: "sine"
      };
    case "xbm":
      return be(16, 16);
    case "textarea":
      return {
        ...t,
        kind: a,
        content: `这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,
        height: 40,
        bindScroll: !0,
        lineSpacing: 0
      };
    case "board":
      return { ...t, kind: a, w: 64, h: 32, cbName: "board_cb" };
  }
}
function be(a, t) {
  const e = Math.ceil(a / 8);
  return {
    id: J("it"),
    kind: "xbm",
    label: "",
    name: "icon",
    w: a,
    h: t,
    bits: new Array(e * t).fill(0)
  };
}
function se(a) {
  return { id: J("pg"), name: a, fnName: "", items: [], userCodePre: "" };
}
function X(a, t) {
  return { ...a, ...t };
}
function he() {
  const a = se("主页");
  a.items = [
    X(L("text"), { text: "u8g2_menu" }),
    X(L("submenu"), { text: "系统设置" }),
    X(L("button"), { text: "关于", cbName: "btn_about_cb" })
  ];
  const t = se("设置");
  t.items = [
    X(L("number"), { text: "音量:%d" }),
    X(L("switch"), { text: "开关:%s" }),
    L("slider"),
    L("back")
  ];
  const e = {
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
    layerWrap: "none",
    pages: [a, t]
  };
  return a.items[1].targetPageId = t.id, e;
}
function ge(a) {
  return structuredClone(a);
}
const fe = 800;
function me() {
  let a = null, t = 0;
  return de()((e, s) => ({
    project: he(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (i, c) => {
      const r = Date.now(), n = !!c && c === a && r - t < fe;
      a = c ?? null, t = r, e((o) => {
        const b = ge(o.project);
        return i(b), {
          project: b,
          dirty: !0,
          past: n ? o.past : [...o.past.slice(-99), o.project],
          future: []
        };
      });
    },
    undo: () => {
      e((i) => i.past.length ? {
        project: i.past[i.past.length - 1],
        past: i.past.slice(0, -1),
        future: [i.project, ...i.future.slice(0, 99)],
        dirty: !0
      } : i);
    },
    redo: () => {
      e((i) => {
        if (!i.future.length) return i;
        const [c, ...r] = i.future;
        return {
          project: c,
          past: [...i.past, i.project],
          future: r,
          dirty: !0
        };
      });
    },
    select: (i, c = null) => e({ selection: { pageId: i, itemId: c } }),
    addPage: (i) => {
      const c = { id: J("pg"), name: i ?? `页面${s().project.pages.length + 1}`, fnName: "", items: [], userCodePre: "" };
      return s().update((r) => {
        r.pages.push(c);
      }), e({ selection: { pageId: c.id, itemId: null } }), c;
    },
    removePage: (i) => {
      s().update((r) => {
        r.pages = r.pages.filter((n) => n.id !== i);
        for (const n of r.pages)
          for (const o of n.items)
            o.kind === "submenu" && o.targetPageId === i && (o.targetPageId = null);
      });
      const { selection: c } = s();
      c.pageId === i && e({ selection: { pageId: null, itemId: null } });
    },
    movePage: (i, c) => {
      s().update((r) => {
        const n = r.pages.findIndex((b) => b.id === i), o = n + c;
        n < 0 || o < 0 || o >= r.pages.length || ([r.pages[n], r.pages[o]] = [r.pages[o], r.pages[n]]);
      });
    },
    updatePage: (i, c) => {
      s().update((r) => {
        const n = r.pages.find((o) => o.id === i);
        n && Object.assign(n, c);
      });
    },
    addItem: (i, c) => {
      var o;
      const r = c ?? s().selection.pageId ?? ((o = s().project.pages[0]) == null ? void 0 : o.id);
      if (!r) return null;
      const n = xe(i);
      return s().update((b) => {
        const u = b.pages.find((l) => l.id === r);
        u == null || u.items.push(n);
      }), e({ selection: { pageId: r, itemId: n.id } }), n;
    },
    removeItem: (i, c) => {
      s().update((n) => {
        const o = n.pages.find((b) => b.id === i);
        o && (o.items = o.items.filter((b) => b.id !== c));
      });
      const { selection: r } = s();
      r.itemId === c && e({ selection: { pageId: i, itemId: null } });
    },
    moveItem: (i, c, r) => {
      s().update((n) => {
        const o = n.pages.find((l) => l.id === i);
        if (!o) return;
        const b = o.items.findIndex((l) => l.id === c), u = b + r;
        b < 0 || u < 0 || u >= o.items.length || ([o.items[b], o.items[u]] = [o.items[u], o.items[b]]);
      });
    },
    duplicateItem: (i, c) => {
      let r = null;
      s().update((n) => {
        const o = n.pages.find((u) => u.id === i);
        if (!o) return;
        const b = o.items.findIndex((u) => u.id === c);
        b < 0 || (r = structuredClone(o.items[b]), r.id = J("it"), o.items.splice(b + 1, 0, r));
      }), r && e({ selection: { pageId: i, itemId: r.id } });
    },
    updateItem: (i, c, r, n) => {
      s().update((o) => {
        const b = o.pages.find((l) => l.id === i), u = b == null ? void 0 : b.items.find((l) => l.id === c);
        u && Object.assign(u, r);
      }, n);
    }
  }));
}
me();
function xe(a) {
  return L(a);
}
const ne = 1, Q = {
  text: "文本",
  number: "数值",
  switch: "开关",
  button: "按钮",
  submenu: "子页面",
  back: "返回上级",
  slider: "滑块条",
  progress: "进度条",
  chart: "图表",
  xbm: "位图 XBM",
  textarea: "文本区",
  board: "自绘板"
}, ve = {
  text: "T",
  number: "#",
  switch: "◉",
  button: "⏎",
  submenu: "→",
  back: "←",
  slider: "▭",
  progress: "▬",
  chart: "∿",
  xbm: "▦",
  textarea: "¶",
  board: "✎"
}, $e = [
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
class O extends Error {
}
function re(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function T(a, t) {
  return typeof a == "string" ? a : t;
}
function P(a, t) {
  return typeof a == "number" && Number.isFinite(a) ? a : t;
}
const _e = ["text", "number", "switch", "button", "submenu", "back", "slider", "progress", "chart", "xbm", "textarea", "board"];
function we(a) {
  if (!re(a)) throw new O("条目格式错误");
  const t = a.kind;
  if (typeof t != "string" || !_e.includes(t))
    throw new O(`未知条目类型: ${String(t)}`);
  const e = structuredClone(a);
  switch (e.id = T(a.id, ""), e.id || (e.id = `it_${Math.random().toString(36).slice(2, 10)}`), e.label = T(a.label, ""), t) {
    case "text":
    case "number":
    case "switch":
    case "button":
    case "submenu":
    case "back":
      e.text = T(a.text, ""), e.scale = a.scale === 2 ? 2 : 1;
      break;
  }
  return e;
}
function ye(a) {
  if (!re(a)) throw new O("页面格式错误");
  const t = Array.isArray(a.items) ? a.items.map(we) : [];
  return {
    id: T(a.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: T(a.name, "未命名页面"),
    fnName: T(a.fnName, ""),
    items: t,
    userCodePre: T(a.userCodePre, "")
  };
}
function ae(a) {
  let t;
  if (typeof a == "string")
    try {
      t = JSON.parse(a);
    } catch {
      throw new O("JSON 解析失败");
    }
  else
    t = a;
  if (!re(t)) throw new O("不是有效的工程文件");
  const e = t, s = P(e.version, 0);
  if (s > ne)
    throw new O(`工程版本 v${s} 高于当前支持的 v${ne}，请升级编辑器`);
  const i = Array.isArray(e.pages) ? e.pages.map(ye) : [];
  if (!i.length) throw new O("工程至少需要一个页面");
  const c = ["default", "rotundity", "square"].includes(e.selector) ? e.selector : "rotundity", r = ["none", "AND", "OR", "XOR", "XNOR"].includes(e.layerWrap) ? e.layerWrap : "none";
  return {
    version: ne,
    name: T(e.name, "未命名工程"),
    width: P(e.width, 128),
    height: P(e.height, 64),
    font: T(e.font, "u8g2_font_wqy12_t_gb2312"),
    selector: c,
    selectorLeftMargin: P(e.selectorLeftMargin, 16),
    selectorTopMargin: P(e.selectorTopMargin, 0),
    selectorLineSpacing: P(e.selectorLineSpacing, 0),
    marqueeSpeed: P(e.marqueeSpeed, 0.2),
    marqueeHeaderLen: P(e.marqueeHeaderLen, 5),
    layerWrap: r,
    pages: i
  };
}
function ie(a) {
  return JSON.stringify(a, null, 2);
}
const ke = {
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
function F(a, t = "anon") {
  let e = a.trim().replace(/[^A-Za-z0-9_]/g, "_");
  return (!e || /^[0-9]/.test(e)) && (e = `_${e}`), e || t;
}
function W(a) {
  return a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function V(a) {
  if (!Number.isFinite(a)) return "0.0f";
  const t = a.toString();
  return /[-.]|e/i.test(t) ? `${t}f` : `${t}.0f`;
}
function Se(a) {
  const t = /* @__PURE__ */ new Map();
  if (!a) return t;
  const e = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let s;
  for (; (s = e.exec(a)) !== null; ) t.set(s[1], s[2]);
  return t;
}
function j(a, t, e) {
  const s = t.has(a) ? t.get(a) : "";
  return `${e}/* USER CODE BEGIN ${a} */${s}${e}/* USER CODE END ${a} */`;
}
function ue(a, t) {
  const e = [], s = Se((t == null ? void 0 : t.c) ?? ""), i = a.pages.map((m, g) => m.fnName && /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName) ? m.fnName : `page_${g}`), c = /* @__PURE__ */ new Map(), r = (m, g, d, k, p) => {
    const w = c.get(m);
    if (w) {
      w.type !== g && e.push(`变量 "${m}" 被多个不同类型的条目引用（${w.type} / ${g}），以首个定义为准`);
      return;
    }
    c.set(m, { name: m, type: g, init: d, isFloat: k, owner: p });
  }, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), b = [], u = [], l = [], f = [], I = [], A = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Map();
  let D = 0, H = 0;
  for (const m of a.pages)
    for (const g of m.items)
      switch (g.kind) {
        case "number": {
          const d = g;
          if (!d.varName) {
            e.push(`存在未命名变量条目（页面 ${m.name}），已跳过绑定`);
            break;
          }
          const k = d.varType === "float" || d.varType === "double" ? V(d.initialValue) : String(Math.trunc(d.initialValue));
          r(d.varName, ke[d.varType], k, d.varType === "float" || d.varType === "double", g), /%[-+ #0]*[a-zA-Z]/.test(d.text) || e.push(`数值条目 "${m.name}/${d.varName}" 的显示文本不含格式化占位符（如 %d）`);
          break;
        }
        case "switch": {
          const d = g;
          if (!d.varName) {
            e.push(`存在未命名开关条目（页面 ${m.name}），已跳过绑定`);
            break;
          }
          r(d.varName, "uint8_t", String(Math.trunc(d.initialValue)), !1, g), /%[-+ #0]*s/.test(d.text) || e.push(`开关条目 "${d.varName}" 的显示文本建议包含 %s 用于显示 on/off`);
          break;
        }
        case "slider":
        case "progress": {
          const d = g;
          if (!d.varName) {
            e.push(`存在未命名${g.kind === "slider" ? "滑块" : "进度"}条目（页面 ${m.name}）`);
            break;
          }
          r(d.varName, "int", String(Math.trunc(d.initialValue)), !1, g);
          break;
        }
        case "button": {
          const d = F(g.cbName, "btn_cb");
          n.has(d) || n.set(d, g.buttonId);
          break;
        }
        case "board":
          o.add(F(g.cbName, "board_cb"));
          break;
        case "chart": {
          const d = D++;
          b.push(
            `#define CHART${d}_LEN ${Math.max(2, Math.trunc(g.dataLen))}`,
            `static float chart${d}_data[CHART${d}_LEN];`,
            `static float chart${d}_dis[CHART${d}_LEN];`,
            `static u8g2_chart_t chart${d};`,
            `static uint8_t chart${d}_inited = 0;`
          );
          const k = g.sample === "sine" ? `chart${d}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);` : g.sample === "ramp" ? `chart${d}_data[i] = (float)i;` : `chart${d}_data[i] = (float)((i * 37) % CHART${d}_LEN);`, p = `chart${d}_fill`, w = (s.get(p) ?? "").trim() !== "";
          u.push([
            `    if (!chart${d}_inited) {`,
            `        chart${d}_inited = 1;`,
            `        u8g2_chart_init(&chart${d}, chart${d}_data, chart${d}_dis, CHART${d}_LEN);`,
            j(p, s, "        "),
            ...w ? [] : [`        for (uint16_t i = 0; i < CHART${d}_LEN; ++i) { ${k} }`],
            "    }"
          ].join(`
`));
          break;
        }
        case "xbm": {
          let d = F(g.name, "icon");
          for (; A.has(d); ) d = `${d}_2`;
          A.add(d), E.set(g.id, d);
          const k = g.bits.length, p = g.bits.map((w) => `0x${(w & 255).toString(16).padStart(2, "0")}`).join(", ");
          l.push(`static const uint8_t menu_xbm_${d}[${k}] = { ${p} };`);
          break;
        }
        case "textarea": {
          const d = H++;
          f.push(
            `static char ta${d}_text[] = "${W(g.content)}";`,
            `static u8g2_menu_textArea_t ta${d};`,
            `static uint8_t ta${d}_inited = 0;`
          ), I.push(
            `    if (!ta${d}_inited) {`,
            `        ta${d}_inited = 1;`,
            `        u8g2_textArea_init(&ta${d}, ta${d}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${d}, ${Math.max(0, Math.trunc(g.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
  const U = (m, g) => {
    if (!m) return "";
    const d = `"${W(m)}"`;
    return g === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${d});` : `u8g2_MenuUTF8Printf(${d});`;
  }, Y = (m, g, d) => {
    const k = `"${W(m)}"`;
    return g === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${k}, ${d});` : `u8g2_MenuUTF8Printf(${k}, ${d});`;
  };
  let q = 0, N = 0;
  const ee = (m, g) => {
    const d = [], k = `${g.name}`;
    switch (m.kind) {
      case "text": {
        const p = U(m.text, m.scale);
        p && d.push(`    ${p}`);
        break;
      }
      case "number": {
        const p = m;
        if (!c.has(p.varName)) break;
        const w = p.varType === "float" || p.varType === "double" ? `u8g2_MenuItemValue_${p.varType}(&${p.varName}, ${V(p.step)}, ${V(p.min)}, ${V(p.max)});` : `u8g2_MenuItemValue_${p.varType}(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`;
        d.push(`    ${w}`), d.push(`    ${Y(p.text, p.scale, p.varName)}`);
        break;
      }
      case "switch": {
        const p = m;
        if (!c.has(p.varName)) break;
        d.push(`    u8g2_MenuItemValue_switch(&${p.varName}, ${Math.trunc(p.openValue)});`), d.push(`    ${Y(p.text, p.scale, `${p.varName} ? "${W(p.onText)}" : "${W(p.offText)}"`)}`);
        break;
      }
      case "button": {
        const p = F(m.cbName, "btn_cb");
        d.push(`    u8g2_MenuItem_button(${p}, ${Math.trunc(m.buttonId)});`);
        const w = U(m.text, m.scale);
        w && d.push(`    ${w}`);
        break;
      }
      case "submenu": {
        if (!m.targetPageId) {
          e.push(`页面 ${k} 的子页面条目 "${m.text || m.label || m.id}" 未指定目标页面，已按普通文本生成`);
          const z = U(m.text, m.scale);
          z && d.push(`    ${z}`);
          break;
        }
        const p = a.pages.findIndex((z) => z.id === m.targetPageId);
        if (p < 0) {
          e.push(`页面 ${k} 的子页面条目目标无效`);
          break;
        }
        d.push(`    u8g2_MenuItem_menu(${i[p]});`);
        const w = U(m.text, m.scale);
        w && d.push(`    ${w}`);
        break;
      }
      case "back": {
        d.push("    u8g2_MenuItem_menu_back();");
        const p = U(m.text, m.scale);
        p && d.push(`    ${p}`);
        break;
      }
      case "slider": {
        const p = m;
        if (!c.has(p.varName)) break;
        d.push(`    u8g2_MenuDrawItemSlider_bind(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`);
        break;
      }
      case "progress": {
        const p = m;
        if (!c.has(p.varName)) break;
        d.push(`    u8g2_MenuDrawItemProgressBar_bind(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`);
        break;
      }
      case "chart": {
        const p = q++;
        d.push(...u[p].split(`
`));
        const w = m.chartKind === "point" ? "Point" : m.chartKind === "bar" ? "Bar" : "Line", z = m.min !== void 0 && m.max !== void 0 ? `${V(m.max)}, ${V(m.min)}` : "0, 0";
        d.push(`    u8g2_MenuDrawItem${w}Chart(&chart${p}, ${Math.max(4, Math.trunc(m.height))}, ${z});`);
        break;
      }
      case "xbm":
        d.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${E.get(m.id) ?? F(m.name, "icon")});`);
        break;
      case "textarea": {
        const p = N++;
        d.push(...I[p].split(`
`));
        const w = m.bindScroll ? "u8g2_MenuDrawTextArea_bind" : "u8g2_MenuDrawTextArea";
        d.push(`    ${w}(&ta${p}, ${Math.max(10, Math.trunc(m.height))});`);
        break;
      }
      case "board": {
        const p = F(m.cbName, "board_cb");
        d.push(`    u8g2_MenuDrawItemBoard(${p}, ${Math.max(1, Math.trunc(m.w))}, ${Math.max(1, Math.trunc(m.h))});`);
        break;
      }
    }
    return d;
  }, h = [];
  h.push("/**"), h.push(` * 由 u8g2-menu-editor 自动生成，工程: ${a.name}`), h.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), h.push(" */"), h.push('#include "menu_pages.h"'), h.push('#include "u8g2_menu.h"'), b.length && h.push("#include <math.h>"), h.push(""), h.push(j("includes", s, "")), h.push(""), h.push("/* ======================== 变量定义 ======================== */"), h.push(j("variables", s, ""));
  for (const m of c.values()) h.push(`${m.type} ${m.name} = ${m.init};`);
  if (h.push(""), (b.length || f.length || l.length) && (h.push("/* ======================== 页面资源 ======================== */"), h.push(...b, ...f, ...l), h.push("")), n.size || o.size) {
    h.push("/* ======================== 回调函数 ======================== */"), h.push(j("callbacks", s, ""));
    for (const [m] of n)
      h.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`), h.push("{"), h.push(j(`cb_${m}`, s, "    ")), h.push("}"), h.push("");
    for (const m of o)
      h.push(`void ${m}(u8g2_t *u8g2)`), h.push("{"), h.push(j(`cb_${m}`, s, "    ")), h.push("}"), h.push("");
  }
  h.push("/* ======================== 页面函数 ======================== */"), a.layerWrap !== "none" && (h.push(`/* 注意: 本工程启用了图层包裹 (${a.layerWrap})。`), h.push(" * 库的图层模块存在已知问题，使用前请确认 src/u8g2_menu_layer.c 可正常编译。 */")), h.push(""), a.pages.forEach((m, g) => {
    h.push(`/* 页面: ${m.name} */`), h.push(`void ${i[g]}(void)`), h.push("{"), h.push(j(`page_${i[g]}_pre`, s, "    ")), a.layerWrap !== "none" && h.push("    u8g2_MenuStartLayer(u8g2_MenuGetU8g2(u8g2_MenuGetCurrentMenu()));");
    for (const d of m.items) h.push(...ee(d, m));
    a.layerWrap !== "none" && h.push(`    u8g2_MenuEndLayer(Layer${a.layerWrap});`), h.push("}"), h.push("");
  });
  const _ = [];
  if (_.push("#ifndef MENU_PAGES_H"), _.push("#define MENU_PAGES_H"), _.push(""), _.push('#include "u8g2_menu.h"'), _.push(""), _.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"), i.forEach((m, g) => _.push(`void ${m}(void);   /* ${a.pages[g].name} */`)), _.push(""), c.size) {
    _.push("/* 可编辑变量（在条目绑定中使用） */");
    for (const m of c.values()) _.push(`extern ${m.type} ${m.name};`);
    _.push("");
  }
  if (n.size || o.size) {
    _.push("/* 用户回调 */");
    for (const [m] of n) _.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID);`);
    for (const m of o) _.push(`void ${m}(u8g2_t *u8g2);`);
    _.push("");
  }
  _.push("#endif /* MENU_PAGES_H */");
  const v = h.join(`
`).replace(/\n{3,}/g, `


`), y = _.join(`
`);
  return { c: `${v}
`, h: `${y}
`, warnings: e };
}
var M = /* @__PURE__ */ ((a) => (a[a.None = 0] = "None", a[a.Up = 1] = "Up", a[a.Down = 2] = "Down", a[a.Enter = 3] = "Enter", a[a.Return = 4] = "Return", a[a.Add = 5] = "Add", a[a.Sub = 6] = "Sub", a))(M || {});
const Me = 8192 / 8;
function Ie(a) {
  return new Promise((t, e) => {
    const s = document.createElement("script");
    s.src = a, s.onload = () => t(), s.onerror = () => e(new Error(`预览引擎脚本加载失败: ${a}`)), document.head.appendChild(s);
  });
}
class Ee {
  constructor(t, e = {}) {
    this.mod = null, this.img = null, this.raf = 0, this.lastT = 0, this.running = !1, this.fontIndexCache = /* @__PURE__ */ new Map(), this.structSig = "", this.lastKnownPage = 0, this.canvas = document.createElement("canvas"), this.canvas.width = 128, this.canvas.height = 64, this.canvas.className = "ume-preview-canvas", t.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.events = e;
  }
  /** 加载 WASM 引擎（幂等） */
  async load(t) {
    if (this.mod) return;
    const e = window;
    e.U8G2MenuPreview || await Ie(t);
    const s = e.U8G2MenuPreview;
    if (!s) throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");
    this.mod = await s({
      locateFile: (c) => t.replace(/[^/\\]*$/, "") + c
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const i = this.mod._em_font_count_export();
    for (let c = 0; c < i; c++) {
      const r = this.mod._em_font_name(c);
      this.fontIndexCache.set(this.mod.UTF8ToString(r), c);
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
  fontIndex(t) {
    return this.fontIndexCache.get(t) ?? 0;
  }
  /** 结构签名：只有页面/条目结构或资源尺寸变化才重置资源池（保留预览中的编辑值） */
  signature(t) {
    return JSON.stringify(t.pages.map((e) => ({
      n: e.items.length,
      k: e.items.map((s) => s.kind).join(","),
      res: e.items.map((s) => s.kind === "chart" ? `${s.dataLen}|${s.sample}` : s.kind === "xbm" ? `${s.w}x${s.h}` : s.kind === "textarea" ? Math.ceil(s.content.length / 64) : "").join(",")
    })));
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(t) {
    const e = this.mod;
    if (!e) return;
    const s = this.signature(t);
    s !== this.structSig && (e.ccall("em_reset_dynamic", null, [], []), this.structSig = s);
    const i = (c) => Math.trunc(Number.isFinite(c) ? c : 0);
    t.pages.forEach((c, r) => {
      e.ccall("em_page_begin", null, ["number"], [r]), c.items.forEach((n, o) => {
        const b = ["number", "number"];
        switch (n.kind) {
          case "text":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 0, 0, n.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [r, o, n.text]);
            break;
          case "number": {
            const u = { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }[n.varType], l = n.varType === "float" || n.varType === "double" ? Math.round(n.initialValue) : i(n.initialValue);
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 1, u, n.scale, 0, 0, 0, 0, 0, l, i(n.step), i(n.min), i(n.max), -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [r, o, n.text]);
            break;
          }
          case "switch":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 2, 0, n.scale, 0, 0, i(n.openValue), 0, 0, i(n.initialValue), 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [r, o, n.text]), e.ccall(
              "em_item_swtext",
              null,
              ["number", "number", "string", "string"],
              [r, o, n.onText, n.offText]
            );
            break;
          case "button":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 3, 0, n.scale, 0, 0, 0, i(n.buttonId), 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [r, o, n.text]);
            break;
          case "submenu": {
            const u = t.pages.findIndex((l) => l.id === n.targetPageId);
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 4, 0, n.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, u, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [r, o, n.text]);
            break;
          }
          case "back":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 5, 0, n.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [r, o, n.text]);
            break;
          case "slider":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 6, 0, 1, 0, 0, 0, 0, 0, i(n.initialValue), i(n.step), i(n.min), i(n.max), -1, 0, 0, 0, 0, 0]
            );
            break;
          case "progress":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 7, 0, 1, 0, 0, 0, 0, 0, i(n.initialValue), i(n.step), i(n.min), i(n.max), -1, 0, 0, 0, 0, 0]
            );
            break;
          case "chart": {
            const u = { sine: 0, ramp: 1, noise: 2 }[n.sample], l = n.min !== void 0 && n.max !== void 0 ? 1 : 0;
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [
                r,
                o,
                8,
                0,
                1,
                { line: 0, point: 1, bar: 2 }[n.chartKind],
                0,
                0,
                0,
                l,
                u,
                0,
                l ? i(n.min) : 0,
                l ? i(n.max) : 0,
                -1,
                0,
                0,
                i(n.height),
                i(n.dataLen),
                0
              ]
            );
            break;
          }
          case "xbm": {
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, i(n.w), i(n.h), 0, 0, 0]
            );
            const u = e._em_scratch(n.bits.length);
            u && (e.HEAPU8.set(new Uint8Array(n.bits), u), e._em_item_bits(r, o, u, n.bits.length));
            break;
          }
          case "textarea":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 10, 0, 1, 0, n.bindScroll ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, i(n.height), 0, i(n.lineSpacing)]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [r, o, n.content]);
            break;
          case "board":
            e.ccall(
              "em_page_item",
              null,
              [
                ...b,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
                "number"
              ],
              [r, o, 11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, i(n.w), i(n.h), 0, 0, 0]
            );
            break;
        }
      }), e.ccall("em_page_end", null, ["number", "number"], [r, c.items.length]);
    }), e.ccall("em_pages_commit", null, ["number"], [t.pages.length]), e.ccall(
      "em_set_style",
      null,
      ["number", "number", "number", "number", "number", "number", "number"],
      [
        this.fontIndex(t.font),
        { default: 0, rotundity: 1, square: 2 }[t.selector],
        i(t.selectorLeftMargin),
        i(t.selectorTopMargin),
        i(t.selectorLineSpacing),
        t.marqueeSpeed,
        t.marqueeHeaderLen
      ]
    );
  }
  start() {
    if (this.running) return;
    this.running = !0, this.lastT = performance.now();
    const t = (e) => {
      if (!this.running) return;
      const s = Math.min(100, Math.round(e - this.lastT));
      this.lastT = e, this.renderFrame(s), this.raf = requestAnimationFrame(t);
    };
    this.raf = requestAnimationFrame(t);
  }
  stop() {
    this.running = !1, cancelAnimationFrame(this.raf);
  }
  renderFrame(t) {
    var n, o;
    const e = this.mod;
    if (!e) return;
    const s = e._em_frame(t);
    if (!s) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const i = e.HEAPU8.subarray(s, s + Me), c = this.img.data;
    c.fill(255);
    for (let b = 0; b < 64; b++) {
      const u = (b >> 3) * 128, l = 1 << (b & 7);
      let f = b * 128 * 4;
      for (let I = 0; I < 128; I++)
        i[u + I] & l && (c[f] = 17, c[f + 1] = 24, c[f + 2] = 39), f += 4;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const r = e._em_get_current_page();
    r !== this.lastKnownPage && (this.lastKnownPage = r, (o = (n = this.events).onPageChanged) == null || o.call(n, r));
  }
  key(t) {
    var e;
    (e = this.mod) == null || e.ccall("em_key", null, ["number"], [t]);
  }
  showMsgbox(t, e) {
    var s;
    (s = this.mod) == null || s.ccall("em_msgbox", null, ["string", "number"], [t, e]);
  }
  closeMsgbox() {
    var t;
    (t = this.mod) == null || t.ccall("em_msgbox_close", null, [], []);
  }
  /** 读取预览中某槽位的实时值（数值/滑条/进度条条目） */
  getInt(t, e) {
    var s;
    return ((s = this.mod) == null ? void 0 : s._em_get_ipool(t * 64 + e)) ?? 0;
  }
  getSwitch(t, e) {
    var s;
    return ((s = this.mod) == null ? void 0 : s._em_get_upool(t * 64 + e)) ?? 0;
  }
  destroy() {
    this.stop(), this.canvas.remove(), this.mod = null;
  }
}
const Ne = Object.keys(Q);
function Ce(a, t, e, s) {
  const i = a.getState(), c = e.label || "text" in e && e.text || Q[e.kind], r = (n) => (o) => {
    o.stopPropagation(), a.getState().moveItem(t.id, e.id, n);
  };
  return x`<div class="ume-item-row ${s ? "selected" : ""}"
    @click=${() => a.getState().select(t.id, e.id)}>
    <span class="ume-item-icon">${ve[e.kind]}</span>
    <span class="ume-item-name" title=${c}>${c}</span>
    <button class="ume-mini" title="上移" @click=${r(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${r(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(n) => {
    n.stopPropagation(), i.duplicateItem(t.id, e.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(n) => {
    n.stopPropagation(), i.removeItem(t.id, e.id);
  }}>✕</button>
  </div>`;
}
function Te(a, t) {
  const e = a.getState();
  return x`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(s) => {
    const i = s.target.value;
    i && e.addItem(i, t.id), s.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${Ne.map((s) => x`<option value=${s}>${Q[s]}</option>`)}
  </select>`;
}
function Pe(a, t) {
  const { project: e, selection: s } = t.getState(), i = (c) => {
    const r = t.getState(), n = s.pageId === c.id;
    return x`<div class="ume-page">
      <div class="ume-page-head ${n ? "selected" : ""}"
        @click=${() => t.getState().select(c.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${c.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(o) => {
      o.stopPropagation(), r.movePage(c.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(o) => {
      o.stopPropagation(), r.movePage(c.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(o) => {
      if (o.stopPropagation(), e.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${c.name}"？`) && r.removePage(c.id);
    }}>✕</button>
      </div>
      ${n ? x`<div class="ume-page-items">
        ${c.items.length ? c.items.map((o) => Ce(t, c, o, s.itemId === o.id)) : x`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Te(t, c)}</div>
      </div>` : G}
    </div>`;
  };
  B(x`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => Le(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(i)}
  `, a);
}
function Le(a) {
  const t = prompt("页面名称:", `页面${a.getState().project.pages.length + 1}`);
  t !== null && a.getState().addPage(t || void 0);
}
function S(a, t, e, s = "") {
  return x`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${t ?? ""} placeholder=${s}
      @change=${(i) => e(i.target.value)} />
  </div>`;
}
function $(a, t, e, s = 1) {
  return x`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(t)} step=${String(s)}
      @change=${(i) => {
    const c = parseFloat(i.target.value);
    e(Number.isFinite(c) ? c : 0);
  }} />
  </div>`;
}
function C(a, t, e, s) {
  return x`<div class="ume-field">
    <label>${a}</label>
    <select @change=${(i) => s(i.target.value)}>
      ${e.map((i) => x`<option value=${i.value} ?selected=${i.value === t}>${i.label}</option>`)}
    </select>
  </div>`;
}
function Ae(a, t, e) {
  return x`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${(s) => e(s.target.checked)} />
    <span>${a}</span>
  </div>`;
}
function oe(a, t, e, s = !1) {
  return x`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${s ? "font-family:Consolas,monospace" : ""}
      @change=${(i) => e(i.target.value)}>${t ?? ""}</textarea>
  </div>`;
}
function Z(a, t, e = "text/plain") {
  const s = new Blob([t], { type: `${e};charset=utf-8` }), i = document.createElement("a");
  i.href = URL.createObjectURL(s), i.download = a, i.click(), setTimeout(() => URL.revokeObjectURL(i.href), 5e3);
}
const De = [
  { value: "uint8", label: "uint8" },
  { value: "uint16", label: "uint16" },
  { value: "uint32", label: "uint32" },
  { value: "int8", label: "int8" },
  { value: "int16", label: "int16" },
  { value: "int32", label: "int32" },
  { value: "int", label: "int" }
], Ue = [
  ...De,
  { value: "float", label: "float" },
  { value: "double", label: "double" }
];
function je(a, t, e) {
  const { project: s, selection: i } = t.getState(), c = s.pages.find((u) => u.id === i.pageId) ?? null, r = (c == null ? void 0 : c.items.find((u) => u.id === i.itemId)) ?? null, n = (u, l) => t.getState().updateItem(c.id, r.id, u, l);
  let o = x`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, b = "属性";
  if (c && !r)
    b = "页面属性", o = x`
      ${S("名称", c.name, (u) => t.getState().updatePage(c.id, { name: u }))}
      ${S("C 函数名", c.fnName, (u) => t.getState().updatePage(c.id, { fnName: u }), "留空自动 page_N")}
      ${oe("用户代码", c.userCodePre, (u) => t.getState().updatePage(c.id, { userCodePre: u }), !0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;
  else if (c && r)
    switch (b = `${Q[r.kind]}`, r.kind) {
      case "text":
        o = x`
          ${S("文本/格式", r.text, (u) => n({ text: u }, `text-${r.id}`))}
          ${C("大小", String(r.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (u) => n({ scale: Number(u) }))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      case "number": {
        const u = r, l = u.varType === "float" || u.varType === "double";
        o = x`
          ${C("变量类型", u.varType, Ue, (f) => n({ varType: f }))}
          ${S("变量名", u.varName, (f) => n({ varName: f }))}
          ${S("显示文本", u.text, (f) => n({ text: f }, `text-${r.id}`))}
          ${$("步长", u.step, (f) => n({ step: f }), "any")}
          ${$("最小值", u.min, (f) => n({ min: f }), "any")}
          ${$("最大值", u.max, (f) => n({ max: f }), "any")}
          ${$("初始值", u.initialValue, (f) => n({ initialValue: f }), "any")}
          ${l ? $("小数位", u.decimals, (f) => n({ decimals: Math.max(0, Math.trunc(f)) })) : G}
          ${C("大小", String(u.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (f) => n({ scale: Number(f) }))}
          <div class="ume-hint">int 建议 %d/%u，float 建议 %.Nf</div>
        `;
        break;
      }
      case "switch": {
        const u = r;
        o = x`
          ${S("变量名", u.varName, (l) => n({ varName: l }))}
          ${S("显示文本", u.text, (l) => n({ text: l }, `text-${r.id}`))}
          ${$("openValue", u.openValue, (l) => n({ openValue: Math.max(0, Math.trunc(l)) }))}
          ${S('"开"文本', u.onText, (l) => n({ onText: l }))}
          ${S('"关"文本', u.offText, (l) => n({ offText: l }))}
          ${$("初始值", u.initialValue, (l) => n({ initialValue: Math.trunc(l) }))}
        `;
        break;
      }
      case "button": {
        const u = r;
        o = x`
          ${S("显示文本", u.text, (l) => n({ text: l }, `text-${r.id}`))}
          ${S("回调函数名", u.cbName, (l) => n({ cbName: l }))}
          ${$("ID", u.buttonId, (l) => n({ buttonId: Math.trunc(l) }))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;
        break;
      }
      case "submenu": {
        const u = r;
        o = x`
          ${S("显示文本", u.text, (l) => n({ text: l }, `text-${r.id}`))}
          ${C("目标页面", u.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...s.pages.filter((l) => l.id !== c.id).map((l) => ({ value: l.id, label: l.name }))
        ], (l) => n({ targetPageId: l || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;
        break;
      }
      case "back": {
        o = x`
          ${S("显示文本", r.text, (u) => n({ text: u }, `text-${r.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const u = r;
        o = x`
          ${S("变量名 (int)", u.varName, (l) => n({ varName: l }))}
          ${$("步长", u.step, (l) => n({ step: Math.trunc(l) }))}
          ${$("最小值", u.min, (l) => n({ min: Math.trunc(l) }))}
          ${$("最大值", u.max, (l) => n({ max: Math.trunc(l) }))}
          ${$("初始值", u.initialValue, (l) => n({ initialValue: Math.trunc(l) }))}
          <div class="ume-hint">绑定 u8g2_MenuDrawItem${u.kind === "slider" ? "Slider" : "ProgressBar"}_bind</div>
        `;
        break;
      }
      case "chart": {
        const u = r;
        o = x`
          ${C("类型", u.chartKind, [
          { value: "line", label: "折线图" },
          { value: "point", label: "散点图" },
          { value: "bar", label: "柱状图" }
        ], (l) => n({ chartKind: l }))}
          ${$("数据点数", u.dataLen, (l) => n({ dataLen: Math.max(2, Math.trunc(l)) }))}
          ${$("高度(px)", u.height, (l) => n({ height: Math.max(8, Math.trunc(l)) }))}
          ${C("示例数据", u.sample, [
          { value: "sine", label: "正弦" },
          { value: "ramp", label: "斜坡" },
          { value: "noise", label: "伪随机" }
        ], (l) => n({ sample: l }))}
          ${$("量程上限", u.max ?? 0, (l) => n({ max: l || void 0 }), "any")}
          ${$("量程下限", u.min ?? 0, (l) => n({ min: l || void 0 }), "any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;
        break;
      }
      case "xbm": {
        const u = r;
        o = x`
          ${S("数组名", u.name, (l) => n({ name: l }))}
          ${$("宽(px)", u.w, (l) => n({ w: Math.min(128, Math.max(1, Math.trunc(l))) }))}
          ${$("高(px)", u.h, (l) => n({ h: Math.min(64, Math.max(1, Math.trunc(l))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => e.openXbmEditor(c.id, u.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${u.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const u = r;
        o = x`
          ${oe("文本内容", u.content, (l) => n({ content: l }))}
          ${$("高度(px)", u.height, (l) => n({ height: Math.max(10, Math.trunc(l)) }))}
          ${$("行间距", u.lineSpacing, (l) => n({ lineSpacing: Math.max(0, Math.trunc(l)) }))}
          ${Ae("上下键滚动 (bind)", u.bindScroll, (l) => n({ bindScroll: l }))}
        `;
        break;
      }
      case "board": {
        const u = r;
        o = x`
          ${$("宽(px)", u.w, (l) => n({ w: Math.max(1, Math.trunc(l)) }))}
          ${$("高(px)", u.h, (l) => n({ h: Math.max(1, Math.trunc(l)) }))}
          ${S("回调函数名", u.cbName, (l) => n({ cbName: l }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
  B(x`
    <div class="ume-panel-title">属性 ${b !== "属性" ? x`<span class="ume-kind-badge">${b}</span>` : G}</div>
    ${o}
  `, a);
}
function Re(a, t, e) {
  const { project: s } = t.getState(), i = (r, n) => t.getState().update((o) => {
    Object.assign(o, r);
  }, n), c = x`
    <div class="ume-panel-title">消息框预览</div>
    <div class="ume-field">
      <label>文本</label>
      <input type="text" value="操作成功" id="ume-msgbox-text" />
    </div>
    <div class="ume-field">
      <label>超时(ms)</label>
      <input type="number" value="3000" id="ume-msgbox-timeout" min="0" step="100" />
      <button class="ume-btn sm" @click=${() => {
    const r = a.querySelector("#ume-msgbox-text").value, n = parseInt(a.querySelector("#ume-msgbox-timeout").value, 10) || 0;
    e.showMsgbox(r, n);
  }} ?disabled=${!e.ready}>显示</button>
      <button class="ume-btn sm" @click=${() => e.closeMsgbox()} ?disabled=${!e.ready}>关闭</div>
    </div>
  `;
  B(x`
    <div class="ume-panel-title">工程</div>
    ${S("工程名", s.name, (r) => i({ name: r }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${s.width}×${s.height}
        ${s.width !== 128 || s.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${C(
    "字体",
    s.font,
    $e.map((r) => ({ value: r.id, label: r.label })),
    (r) => i({ font: r })
  )}
    ${C("选择器", s.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (r) => i({ selector: r }))}
    ${$("左边距", s.selectorLeftMargin, (r) => i({ selectorLeftMargin: Math.max(0, Math.trunc(r)) }))}
    ${$("顶边距", s.selectorTopMargin, (r) => i({ selectorTopMargin: Math.max(0, Math.trunc(r)) }))}
    ${$("行间距", s.selectorLineSpacing, (r) => i({ selectorLineSpacing: Math.max(0, Math.trunc(r)) }))}
    ${$("跑马灯速度", s.marqueeSpeed, (r) => i({ marqueeSpeed: r }), 0.05)}
    ${$("跑马灯停留", s.marqueeHeaderLen, (r) => i({ marqueeHeaderLen: r }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>
    ${C("图层包裹", s.layerWrap, [
    { value: "none", label: "不使用" },
    { value: "AND", label: "AND" },
    { value: "OR", label: "OR" },
    { value: "XOR", label: "XOR" },
    { value: "XNOR", label: "XNOR" }
  ], (r) => i({ layerWrap: r }))}
    ${s.layerWrap !== "none" ? x`<div class="ume-warn">库的图层模块 (u8g2_menu_layer.c) 存在已知编译问题，使用前请先修复；预览中不生效。</div>` : G}
    ${c}
  `, a);
}
function Oe(a, t) {
  const e = (i) => {
    let c;
    const r = () => {
      c && (clearInterval(c), c = void 0);
    };
    return {
      down: (n) => {
        n.preventDefault(), t.key(i), r(), c = window.setInterval(() => t.key(i), 180);
      },
      up: r
    };
  }, s = (i, c, r) => {
    const n = e(i);
    return x`<button class="ume-key" title=${r}
      @pointerdown=${n.down} @pointerup=${n.up} @pointerleave=${n.up}>${c}</button>`;
  };
  B(x`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(i) => {
    const r = {
      ArrowUp: M.Up,
      ArrowDown: M.Down,
      Enter: M.Enter,
      Escape: M.Return,
      Backspace: M.Return,
      "+": M.Add,
      "-": M.Sub,
      "=": M.Add,
      _: M.Sub
    }[i.key];
    r !== void 0 && (i.preventDefault(), t.key(r));
  }}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${s(M.Up, "▲", "上 MENU_Key_Up")}
      ${s(M.Down, "▼", "下 MENU_Key_Down")}
      ${s(M.Enter, "OK", "确认 MENU_Key_Enter")}
      ${s(M.Return, "⌫", "返回 MENU_Key_Return")}
      ${s(M.Add, "＋", "加 MENU_Key_Add")}
      ${s(M.Sub, "－", "减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <span id="ume-live-page"></span>
      <span id="ume-live-value"></span>
    </div>
  `, a);
}
let K = null, R = "c";
function qe(a, t) {
  K = t, ze(a);
}
function ze(a) {
  if (!K) return;
  const t = R === "c" ? K.c : K.h, e = document.createElement("div");
  e.className = "ume-modal-mask", e.addEventListener("click", (i) => {
    i.target === e && le(e);
  });
  const s = () => {
    B(x`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${() => le(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${K.warnings.length ? x`
            <div style="margin-bottom:8px">
              ${K.warnings.map((i) => x`<div class="ume-warn">⚠ ${i}</div>`)}
            </div>` : G}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${R === "c" ? "primary" : ""}" @click=${() => {
      R = "c", s();
    }}>menu_pages.c</button>
            <button class="ume-btn sm ${R === "h" ? "primary" : ""}" @click=${() => {
      R = "h", s();
    }}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${t}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${() => {
      navigator.clipboard.writeText(t).then(() => Fe(e, "已复制到剪贴板"));
    }}>复制</button>
          <button class="ume-btn primary" @click=${() => {
      Z(R === "c" ? "menu_pages.c" : "menu_pages.h", t);
    }}>下载 ${R === "c" ? "menu_pages.c" : "menu_pages.h"}</button>
        </div>
      </div>
    `, e);
  };
  s(), a.appendChild(e);
}
function le(a) {
  a.remove();
}
function Fe(a, t) {
  const e = a.closest(".ume") ?? document.body;
  let s = e.querySelector(".ume-toast");
  s || (s = document.createElement("div"), s.className = "ume-toast", e.appendChild(s)), s.textContent = t, s.classList.add("show"), setTimeout(() => s.classList.remove("show"), 1600);
}
function Ve(a, t, e, s) {
  const c = t.getState().project.pages.find((v) => v.id === e), r = c == null ? void 0 : c.items.find((v) => v.id === s);
  if (!r || r.kind !== "xbm") return;
  const n = r;
  let o = n.w, b = n.h, u = [...n.bits];
  const l = () => Math.ceil(o / 8), f = document.createElement("div");
  f.className = "ume-modal-mask", f.addEventListener("click", (v) => {
    v.target === f && _();
  });
  const I = (v, y) => {
    const m = y * l() + (v >> 3);
    return m < u.length ? !!(u[m] >> (v & 7) & 1) : !1;
  }, A = (v, y, m) => {
    const g = y * l() + (v >> 3);
    u[g] = m ? u[g] | 1 << (v & 7) : u[g] & ~(1 << (v & 7));
  }, E = (v, y) => {
    const m = Math.ceil(o / 8), g = Math.ceil(v / 8), d = new Array(g * y).fill(0);
    for (let k = 0; k < Math.min(b, y); k++)
      for (let p = 0; p < Math.min(o, v); p++) {
        const w = k * m + (p >> 3);
        w < u.length && u[w] >> (p & 7) & 1 && (d[k * g + (p >> 3)] |= 1 << (p & 7));
      }
    o = v, b = y, u = d;
  };
  let D = !1, H = !0;
  const U = (v, y) => (m) => {
    m.preventDefault(), D = !0, H = !I(v, y), A(v, y, H), N();
  }, Y = (v, y) => () => {
    D && (A(v, y, H), N());
  }, q = () => {
    D = !1;
  }, N = () => {
    B(h(), f);
  }, ee = () => {
    const v = [];
    for (let y = 0; y < b; y++)
      for (let m = 0; m < o; m++)
        v.push(x`<button class="ume-xbm-cell ${I(m, y) ? "on" : ""}"
          data-x=${m} data-y=${y}
          @pointerdown=${U(m, y)}
          @pointerenter=${Y(m, y)}></button>`);
    return v;
  }, h = () => x`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${o}×${b}</span></span>
        <button class="ume-mini" @click=${_}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${q}
        @pointerleave=${q}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(o)} min="1" max="128"
            @change=${(v) => {
    E(ce(+v.target.value, 1, 128), b), N();
  }} />
          <input type="number" style="width:64px" .value=${String(b)} min="1" max="64"
            @change=${(v) => {
    E(o, ce(+v.target.value, 1, 64)), N();
  }} />
          <button class="ume-btn sm" @click=${() => {
    u = u.map(() => 0), N();
  }}>清空</button>
          <button class="ume-btn sm" @click=${() => {
    u = u.map((v) => ~v & 255), N();
  }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${o}, 14px)">${ee()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${n.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${_}>取消</button>
        <button class="ume-btn primary" @click=${() => {
    t.getState().updateItem(e, s, { w: o, h: b, bits: [...u] }), _();
  }}>应用</button>
      </div>
    </div>
  `;
  function _() {
    f.remove(), document.removeEventListener("pointerup", q);
  }
  document.addEventListener("pointerup", q), N(), a.appendChild(f);
}
function ce(a, t, e) {
  return Number.isFinite(a) ? Math.min(e, Math.max(t, Math.trunc(a))) : t;
}
const Ke = "prebuilt/u8g2-menu-preview.js";
class Xe {
  constructor(t, e = {}) {
    var u;
    if (this.store = me(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.container = t, this.opts = { persistKey: "default", ...e }, t.classList.add("ume"), !document.getElementById("ume-style")) {
      const l = document.createElement("style");
      l.id = "ume-style", l.textContent = pe, document.head.appendChild(l);
    }
    const s = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, i = this.opts.data ?? s ?? void 0;
    if (i !== void 0)
      try {
        this.store.setState({ project: ae(i) });
      } catch (l) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", l);
      }
    const c = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null, r = this.opts.persistKey ? localStorage.getItem(`ume_last_h_${this.opts.persistKey}`) : null;
    c && r && (this.lastExport = { c, h: r }), t.innerHTML = `
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
          <div data-role="style"></div>
          <div data-role="prop"></div>
        </div>
      </div>
      <input type="file" accept=".json,application/json" style="display:none" data-role="file">
    `;
    const n = (l) => t.querySelector(l);
    this.els = {
      left: n(".ume-left"),
      center: n(".ume-center"),
      right: n(".ume-right"),
      styleEl: n('[data-role="style"]'),
      propEl: n('[data-role="prop"]'),
      toolbarUndo: n('[data-act="undo"]'),
      toolbarRedo: n('[data-act="redo"]')
    };
    const o = document.createElement("div");
    o.style.display = "flex", o.style.flexDirection = "column", o.style.alignItems = "center", o.style.gap = "10px", this.els.center.appendChild(o), this.preview = new Ee(o, {
      onPageChanged: (l) => this.onPreviewPageChanged(l)
    });
    const b = document.createElement("div");
    this.els.center.appendChild(b), Oe(b, this.preview), this.preview.load(this.opts.wasmUrl ?? Ke).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((l) => {
      console.error(l);
      const f = document.createElement("div");
      f.className = "ume-warn", f.textContent = `预览引擎加载失败: ${l.message}。编辑功能不受影响。`, this.els.center.prepend(f);
    }), t.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const l = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      l !== null && this.store.getState().addPage(l || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), t.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      Z(
        `${this.store.getState().project.name || "menu-project"}.json`,
        ie(this.store.getState().project),
        "application/json"
      );
    }), t.querySelector('[data-act="import"]').addEventListener("click", () => {
      n('[data-role="file"]').click();
    }), n('[data-role="file"]').addEventListener("change", (l) => {
      var I;
      const f = (I = l.target.files) == null ? void 0 : I[0];
      f && (f.text().then((A) => {
        try {
          const E = ae(A);
          this.store.getState().update((D) => {
            Object.assign(D, E);
          }), this.scheduleRender();
        } catch (E) {
          alert(`导入失败: ${E.message}`);
        }
      }), l.target.value = "");
    }), t.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate()), this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((u = this.store.getState().project.pages[0]) == null ? void 0 : u.id) ?? null, null), this.store.subscribe(() => {
      this.preview.sync(this.store.getState().project), this.persist(), this.scheduleRender(), this.notifyChange();
    }), this.scheduleRender(), this.persist(), window.setInterval(() => {
      this.destroyed || this.updateLiveInfo();
    }, 300);
  }
  /* ---------------- 公共 API ---------------- */
  getData() {
    return structuredClone(this.store.getState().project);
  }
  loadData(t) {
    var s;
    const e = ae(t);
    this.store.getState().update((i) => {
      Object.assign(i, e);
    }), this.store.getState().select(((s = e.pages[0]) == null ? void 0 : s.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var s, i;
    const t = this.lastExport, e = ue(this.store.getState().project, t ?? void 0);
    return this.lastExport = { c: e.c, h: e.h }, this.opts.persistKey && (localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, e.c), localStorage.setItem(`ume_last_h_${this.opts.persistKey}`, e.h)), qe(this.container, e), (i = (s = this.opts).onExport) == null || i.call(s, e), e;
  }
  downloadC() {
    const t = ue(this.store.getState().project, this.lastExport ?? void 0);
    this.lastExport = { c: t.c, h: t.h }, Z("menu_pages.c", t.c), Z("menu_pages.h", t.h);
  }
  destroy() {
    this.destroyed = !0, document.removeEventListener("keydown", this.onKeyDown), this.preview.destroy(), this.container.innerHTML = "";
  }
  /* ---------------- 内部 ---------------- */
  onKeyDown(t) {
    const e = t.target;
    e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" || ((t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" ? (t.preventDefault(), t.shiftKey ? this.store.getState().redo() : this.store.getState().undo()) : (t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "y" && (t.preventDefault(), this.store.getState().redo()));
  }
  onPreviewPageChanged(t) {
    const e = this.store.getState().project.pages[t];
    e && this.store.getState().select(e.id, null);
  }
  persist() {
    !this.opts.persistKey || this.destroyed || (clearTimeout(this.saveTimer), this.saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(
          `ume_autosave_${this.opts.persistKey}`,
          ie(this.store.getState().project)
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
      const t = this.store.getState();
      Pe(this.els.left, this.store), Re(this.els.styleEl, this.store, this.preview), je(this.els.propEl, this.store, {
        openXbmEditor: (e, s) => Ve(this.container, this.store, e, s)
      }), this.els.toolbarUndo.disabled = t.past.length === 0, this.els.toolbarRedo.disabled = t.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var c;
    const t = document.getElementById("ume-live-page"), e = document.getElementById("ume-live-value"), s = this.store.getState(), i = this.store.getState().project.pages.findIndex((r) => r.id === s.selection.pageId);
    if (t && i >= 0) {
      const r = this.preview.currentPage;
      t.textContent = `预览页: ${((c = this.store.getState().project.pages[r]) == null ? void 0 : c.name) ?? "?"}`;
    }
    if (e && i >= 0 && s.selection.itemId) {
      const r = s.project.pages[i], n = r.items.findIndex((b) => b.id === s.selection.itemId), o = r.items[n];
      if (o && "varName" in o) {
        const b = o.kind === "switch" ? this.preview.getSwitch(i, n) : this.preview.getInt(i, n);
        e.textContent = `${o.varName} = ${b}`;
      } else
        e.textContent = "";
    }
  }
}
export {
  Xe as MenuEditor,
  M as MenuKey
};
//# sourceMappingURL=u8g2-menu-editor.js.map
