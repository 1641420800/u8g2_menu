import { createStore as de } from "zustand/vanilla";
import { render as B, html as x, nothing as W } from "lit-html";
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
function J(r) {
  return te = (te + 1) % 1e9, `${r}_${Date.now().toString(36)}_${te.toString(36)}`;
}
function P(r) {
  const t = { id: J("it"), label: "" };
  switch (r) {
    case "text":
      return { ...t, kind: r, text: "菜单项", scale: 1 };
    case "number":
      return {
        ...t,
        kind: r,
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
        kind: r,
        text: "s:%s",
        scale: 1,
        varName: "var_switch",
        openValue: 1,
        onText: "on",
        offText: "off",
        initialValue: 0
      };
    case "button":
      return { ...t, kind: r, text: "执行操作", scale: 1, cbName: "btn_action_cb", buttonId: 1 };
    case "submenu":
      return { ...t, kind: r, text: "下一级", scale: 1, targetPageId: null };
    case "back":
      return { ...t, kind: r, text: "返回", scale: 1 };
    case "slider":
      return { ...t, kind: r, varName: "var_slider", step: 2, min: 0, max: 100, initialValue: 50 };
    case "progress":
      return { ...t, kind: r, varName: "var_prog", step: 2, min: 0, max: 100, initialValue: 70 };
    case "chart":
      return {
        ...t,
        kind: r,
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
        kind: r,
        content: `这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,
        height: 40,
        bindScroll: !0,
        lineSpacing: 0
      };
    case "board":
      return { ...t, kind: r, w: 64, h: 32, cbName: "board_cb" };
  }
}
function be(r, t) {
  const e = Math.ceil(r / 8);
  return {
    id: J("it"),
    kind: "xbm",
    label: "",
    name: "icon",
    w: r,
    h: t,
    bits: new Array(e * t).fill(0)
  };
}
function se(r) {
  return { id: J("pg"), name: r, fnName: "", items: [], userCodePre: "" };
}
function X(r, t) {
  return { ...r, ...t };
}
function he() {
  const r = se("主页");
  r.items = [
    X(P("text"), { text: "u8g2_menu" }),
    X(P("submenu"), { text: "系统设置" }),
    X(P("button"), { text: "关于", cbName: "btn_about_cb" })
  ];
  const t = se("设置");
  t.items = [
    X(P("number"), { text: "音量:%d" }),
    X(P("switch"), { text: "开关:%s" }),
    P("slider"),
    P("back")
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
    pages: [r, t]
  };
  return r.items[1].targetPageId = t.id, e;
}
function ge(r) {
  return structuredClone(r);
}
const fe = 800;
function me() {
  let r = null, t = 0;
  return de()((e, s) => ({
    project: he(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (a, l) => {
      const i = Date.now(), n = !!l && l === r && i - t < fe;
      r = l ?? null, t = i, e((c) => {
        const b = ge(c.project);
        return a(b), {
          project: b,
          dirty: !0,
          past: n ? c.past : [...c.past.slice(-99), c.project],
          future: []
        };
      });
    },
    undo: () => {
      e((a) => a.past.length ? {
        project: a.past[a.past.length - 1],
        past: a.past.slice(0, -1),
        future: [a.project, ...a.future.slice(0, 99)],
        dirty: !0
      } : a);
    },
    redo: () => {
      e((a) => {
        if (!a.future.length) return a;
        const [l, ...i] = a.future;
        return {
          project: l,
          past: [...a.past, a.project],
          future: i,
          dirty: !0
        };
      });
    },
    select: (a, l = null) => e({ selection: { pageId: a, itemId: l } }),
    addPage: (a) => {
      const l = { id: J("pg"), name: a ?? `页面${s().project.pages.length + 1}`, fnName: "", items: [], userCodePre: "" };
      return s().update((i) => {
        i.pages.push(l);
      }), e({ selection: { pageId: l.id, itemId: null } }), l;
    },
    removePage: (a) => {
      s().update((i) => {
        i.pages = i.pages.filter((n) => n.id !== a);
        for (const n of i.pages)
          for (const c of n.items)
            c.kind === "submenu" && c.targetPageId === a && (c.targetPageId = null);
      });
      const { selection: l } = s();
      l.pageId === a && e({ selection: { pageId: null, itemId: null } });
    },
    movePage: (a, l) => {
      s().update((i) => {
        const n = i.pages.findIndex((b) => b.id === a), c = n + l;
        n < 0 || c < 0 || c >= i.pages.length || ([i.pages[n], i.pages[c]] = [i.pages[c], i.pages[n]]);
      });
    },
    updatePage: (a, l) => {
      s().update((i) => {
        const n = i.pages.find((c) => c.id === a);
        n && Object.assign(n, l);
      });
    },
    addItem: (a, l) => {
      var c;
      const i = l ?? s().selection.pageId ?? ((c = s().project.pages[0]) == null ? void 0 : c.id);
      if (!i) return null;
      const n = xe(a);
      return s().update((b) => {
        const o = b.pages.find((u) => u.id === i);
        o == null || o.items.push(n);
      }), e({ selection: { pageId: i, itemId: n.id } }), n;
    },
    removeItem: (a, l) => {
      s().update((n) => {
        const c = n.pages.find((b) => b.id === a);
        c && (c.items = c.items.filter((b) => b.id !== l));
      });
      const { selection: i } = s();
      i.itemId === l && e({ selection: { pageId: a, itemId: null } });
    },
    moveItem: (a, l, i) => {
      s().update((n) => {
        const c = n.pages.find((u) => u.id === a);
        if (!c) return;
        const b = c.items.findIndex((u) => u.id === l), o = b + i;
        b < 0 || o < 0 || o >= c.items.length || ([c.items[b], c.items[o]] = [c.items[o], c.items[b]]);
      });
    },
    duplicateItem: (a, l) => {
      let i = null;
      s().update((n) => {
        const c = n.pages.find((o) => o.id === a);
        if (!c) return;
        const b = c.items.findIndex((o) => o.id === l);
        b < 0 || (i = structuredClone(c.items[b]), i.id = J("it"), c.items.splice(b + 1, 0, i));
      }), i && e({ selection: { pageId: a, itemId: i.id } });
    },
    updateItem: (a, l, i, n) => {
      s().update((c) => {
        const b = c.pages.find((u) => u.id === a), o = b == null ? void 0 : b.items.find((u) => u.id === l);
        o && Object.assign(o, i);
      }, n);
    }
  }));
}
me();
function xe(r) {
  return P(r);
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
class q extends Error {
}
function re(r) {
  return typeof r == "object" && r !== null && !Array.isArray(r);
}
function C(r, t) {
  return typeof r == "string" ? r : t;
}
function T(r, t) {
  return typeof r == "number" && Number.isFinite(r) ? r : t;
}
const _e = ["text", "number", "switch", "button", "submenu", "back", "slider", "progress", "chart", "xbm", "textarea", "board"];
function we(r) {
  if (!re(r)) throw new q("条目格式错误");
  const t = r.kind;
  if (typeof t != "string" || !_e.includes(t))
    throw new q(`未知条目类型: ${String(t)}`);
  const e = structuredClone(r);
  switch (e.id = C(r.id, ""), e.id || (e.id = `it_${Math.random().toString(36).slice(2, 10)}`), e.label = C(r.label, ""), t) {
    case "text":
    case "number":
    case "switch":
    case "button":
    case "submenu":
    case "back":
      e.text = C(r.text, ""), e.scale = r.scale === 2 ? 2 : 1;
      break;
  }
  return e;
}
function ye(r) {
  if (!re(r)) throw new q("页面格式错误");
  const t = Array.isArray(r.items) ? r.items.map(we) : [];
  return {
    id: C(r.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: C(r.name, "未命名页面"),
    fnName: C(r.fnName, ""),
    items: t,
    userCodePre: C(r.userCodePre, "")
  };
}
function ae(r) {
  let t;
  if (typeof r == "string")
    try {
      t = JSON.parse(r);
    } catch {
      throw new q("JSON 解析失败");
    }
  else
    t = r;
  if (!re(t)) throw new q("不是有效的工程文件");
  const e = t, s = T(e.version, 0);
  if (s > ne)
    throw new q(`工程版本 v${s} 高于当前支持的 v${ne}，请升级编辑器`);
  const a = Array.isArray(e.pages) ? e.pages.map(ye) : [];
  if (!a.length) throw new q("工程至少需要一个页面");
  const l = ["default", "rotundity", "square"].includes(e.selector) ? e.selector : "rotundity";
  return {
    version: ne,
    name: C(e.name, "未命名工程"),
    width: T(e.width, 128),
    height: T(e.height, 64),
    font: C(e.font, "u8g2_font_wqy12_t_gb2312"),
    selector: l,
    selectorLeftMargin: T(e.selectorLeftMargin, 16),
    selectorTopMargin: T(e.selectorTopMargin, 0),
    selectorLineSpacing: T(e.selectorLineSpacing, 0),
    marqueeSpeed: T(e.marqueeSpeed, 0.2),
    marqueeHeaderLen: T(e.marqueeHeaderLen, 5),
    pages: a
  };
}
function ie(r) {
  return JSON.stringify(r, null, 2);
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
function O(r, t = "anon") {
  let e = r.trim().replace(/[^A-Za-z0-9_]/g, "_");
  return (!e || /^[0-9]/.test(e)) && (e = `_${e}`), e || t;
}
function G(r) {
  return r.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function V(r) {
  if (!Number.isFinite(r)) return "0.0f";
  const t = r.toString();
  return /[-.]|e/i.test(t) ? `${t}f` : `${t}.0f`;
}
function Se(r) {
  const t = /* @__PURE__ */ new Map();
  if (!r) return t;
  const e = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let s;
  for (; (s = e.exec(r)) !== null; ) t.set(s[1], s[2]);
  return t;
}
function U(r, t, e) {
  const s = t.has(r) ? t.get(r) : "";
  return `${e}/* USER CODE BEGIN ${r} */${s}${e}/* USER CODE END ${r} */`;
}
function oe(r, t) {
  const e = [], s = Se((t == null ? void 0 : t.c) ?? ""), a = r.pages.map((m, h) => m.fnName && /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName) ? m.fnName : `page_${h}`), l = /* @__PURE__ */ new Map(), i = (m, h, d, k, p) => {
    const w = l.get(m);
    if (w) {
      w.type !== h && e.push(`变量 "${m}" 被多个不同类型的条目引用（${w.type} / ${h}），以首个定义为准`);
      return;
    }
    l.set(m, { name: m, type: h, init: d, isFloat: k, owner: p });
  }, n = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set(), b = [], o = [], u = [], f = [], I = [], A = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Map();
  let D = 0, H = 0;
  for (const m of r.pages)
    for (const h of m.items)
      switch (h.kind) {
        case "number": {
          const d = h;
          if (!d.varName) {
            e.push(`存在未命名变量条目（页面 ${m.name}），已跳过绑定`);
            break;
          }
          const k = d.varType === "float" || d.varType === "double" ? V(d.initialValue) : String(Math.trunc(d.initialValue));
          i(d.varName, ke[d.varType], k, d.varType === "float" || d.varType === "double", h), /%[-+ #0]*[a-zA-Z]/.test(d.text) || e.push(`数值条目 "${m.name}/${d.varName}" 的显示文本不含格式化占位符（如 %d）`);
          break;
        }
        case "switch": {
          const d = h;
          if (!d.varName) {
            e.push(`存在未命名开关条目（页面 ${m.name}），已跳过绑定`);
            break;
          }
          i(d.varName, "uint8_t", String(Math.trunc(d.initialValue)), !1, h), /%[-+ #0]*s/.test(d.text) || e.push(`开关条目 "${d.varName}" 的显示文本建议包含 %s 用于显示 on/off`);
          break;
        }
        case "slider":
        case "progress": {
          const d = h;
          if (!d.varName) {
            e.push(`存在未命名${h.kind === "slider" ? "滑块" : "进度"}条目（页面 ${m.name}）`);
            break;
          }
          i(d.varName, "int", String(Math.trunc(d.initialValue)), !1, h);
          break;
        }
        case "button": {
          const d = O(h.cbName, "btn_cb");
          n.has(d) || n.set(d, h.buttonId);
          break;
        }
        case "board":
          c.add(O(h.cbName, "board_cb"));
          break;
        case "chart": {
          const d = D++;
          b.push(
            `#define CHART${d}_LEN ${Math.max(2, Math.trunc(h.dataLen))}`,
            `static float chart${d}_data[CHART${d}_LEN];`,
            `static float chart${d}_dis[CHART${d}_LEN];`,
            `static u8g2_chart_t chart${d};`,
            `static uint8_t chart${d}_inited = 0;`
          );
          const k = h.sample === "sine" ? `chart${d}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);` : h.sample === "ramp" ? `chart${d}_data[i] = (float)i;` : `chart${d}_data[i] = (float)((i * 37) % CHART${d}_LEN);`, p = `chart${d}_fill`, w = (s.get(p) ?? "").trim() !== "";
          o.push([
            `    if (!chart${d}_inited) {`,
            `        chart${d}_inited = 1;`,
            `        u8g2_chart_init(&chart${d}, chart${d}_data, chart${d}_dis, CHART${d}_LEN);`,
            U(p, s, "        "),
            ...w ? [] : [`        for (uint16_t i = 0; i < CHART${d}_LEN; ++i) { ${k} }`],
            "    }"
          ].join(`
`));
          break;
        }
        case "xbm": {
          let d = O(h.name, "icon");
          for (; A.has(d); ) d = `${d}_2`;
          A.add(d), E.set(h.id, d);
          const k = h.bits.length, p = h.bits.map((w) => `0x${(w & 255).toString(16).padStart(2, "0")}`).join(", ");
          u.push(`static const uint8_t menu_xbm_${d}[${k}] = { ${p} };`);
          break;
        }
        case "textarea": {
          const d = H++;
          f.push(
            `static char ta${d}_text[] = "${G(h.content)}";`,
            `static u8g2_menu_textArea_t ta${d};`,
            `static uint8_t ta${d}_inited = 0;`
          ), I.push(
            `    if (!ta${d}_inited) {`,
            `        ta${d}_inited = 1;`,
            `        u8g2_textArea_init(&ta${d}, ta${d}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${d}, ${Math.max(0, Math.trunc(h.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
  const j = (m, h) => {
    if (!m) return "";
    const d = `"${G(m)}"`;
    return h === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${d});` : `u8g2_MenuUTF8Printf(${d});`;
  }, Y = (m, h, d) => {
    const k = `"${G(m)}"`;
    return h === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${k}, ${d});` : `u8g2_MenuUTF8Printf(${k}, ${d});`;
  };
  let z = 0, N = 0;
  const ee = (m, h) => {
    const d = [], k = `${h.name}`;
    switch (m.kind) {
      case "text": {
        const p = j(m.text, m.scale);
        p && d.push(`    ${p}`);
        break;
      }
      case "number": {
        const p = m;
        if (!l.has(p.varName)) break;
        const w = p.varType === "float" || p.varType === "double" ? `u8g2_MenuItemValue_${p.varType}(&${p.varName}, ${V(p.step)}, ${V(p.min)}, ${V(p.max)});` : `u8g2_MenuItemValue_${p.varType}(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`;
        d.push(`    ${w}`), d.push(`    ${Y(p.text, p.scale, p.varName)}`);
        break;
      }
      case "switch": {
        const p = m;
        if (!l.has(p.varName)) break;
        d.push(`    u8g2_MenuItemValue_switch(&${p.varName}, ${Math.trunc(p.openValue)});`), d.push(`    ${Y(p.text, p.scale, `${p.varName} ? "${G(p.onText)}" : "${G(p.offText)}"`)}`);
        break;
      }
      case "button": {
        const p = O(m.cbName, "btn_cb");
        d.push(`    u8g2_MenuItem_button(${p}, ${Math.trunc(m.buttonId)});`);
        const w = j(m.text, m.scale);
        w && d.push(`    ${w}`);
        break;
      }
      case "submenu": {
        if (!m.targetPageId) {
          e.push(`页面 ${k} 的子页面条目 "${m.text || m.label || m.id}" 未指定目标页面，已按普通文本生成`);
          const F = j(m.text, m.scale);
          F && d.push(`    ${F}`);
          break;
        }
        const p = r.pages.findIndex((F) => F.id === m.targetPageId);
        if (p < 0) {
          e.push(`页面 ${k} 的子页面条目目标无效`);
          break;
        }
        d.push(`    u8g2_MenuItem_menu_enter(${a[p]});`);
        const w = j(m.text, m.scale);
        w && d.push(`    ${w}`);
        break;
      }
      case "back": {
        d.push("    u8g2_MenuItem_menu_back();");
        const p = j(m.text, m.scale);
        p && d.push(`    ${p}`);
        break;
      }
      case "slider": {
        const p = m;
        if (!l.has(p.varName)) break;
        d.push(`    u8g2_MenuDrawItemSlider_bind(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`);
        break;
      }
      case "progress": {
        const p = m;
        if (!l.has(p.varName)) break;
        d.push(`    u8g2_MenuDrawItemProgressBar_bind(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`);
        break;
      }
      case "chart": {
        const p = z++;
        d.push(...o[p].split(`
`));
        const w = m.chartKind === "point" ? "Point" : m.chartKind === "bar" ? "Bar" : "Line", F = m.min !== void 0 && m.max !== void 0 ? `${V(m.max)}, ${V(m.min)}` : "0, 0";
        d.push(`    u8g2_MenuDrawItem${w}Chart(&chart${p}, ${Math.max(4, Math.trunc(m.height))}, ${F});`);
        break;
      }
      case "xbm":
        d.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${E.get(m.id) ?? O(m.name, "icon")});`);
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
        const p = O(m.cbName, "board_cb");
        d.push(`    u8g2_MenuDrawItemBoard(${p}, ${Math.max(1, Math.trunc(m.w))}, ${Math.max(1, Math.trunc(m.h))});`);
        break;
      }
    }
    return d;
  }, g = [];
  g.push("/**"), g.push(` * 由 u8g2-menu-editor 自动生成，工程: ${r.name}`), g.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), g.push(" */"), g.push('#include "menu_pages.h"'), g.push('#include "u8g2_menu.h"'), b.length && g.push("#include <math.h>"), g.push(""), g.push(U("includes", s, "")), g.push(""), g.push("/* ======================== 变量定义 ======================== */"), g.push(U("variables", s, ""));
  for (const m of l.values()) g.push(`${m.type} ${m.name} = ${m.init};`);
  if (g.push(""), (b.length || f.length || u.length) && (g.push("/* ======================== 页面资源 ======================== */"), g.push(...b, ...f, ...u), g.push("")), n.size || c.size) {
    g.push("/* ======================== 回调函数 ======================== */"), g.push(U("callbacks", s, ""));
    for (const [m] of n)
      g.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`), g.push("{"), g.push(U(`cb_${m}`, s, "    ")), g.push("}"), g.push("");
    for (const m of c)
      g.push(`void ${m}(u8g2_t *u8g2)`), g.push("{"), g.push(U(`cb_${m}`, s, "    ")), g.push("}"), g.push("");
  }
  g.push("/* ======================== 页面函数 ======================== */"), g.push(""), r.pages.forEach((m, h) => {
    g.push(`/* 页面: ${m.name} */`), g.push(`void ${a[h]}(void)`), g.push("{"), g.push(U(`page_${a[h]}_pre`, s, "    "));
    for (const d of m.items) g.push(...ee(d, m));
    g.push("}"), g.push("");
  });
  const _ = [];
  if (_.push("#ifndef MENU_PAGES_H"), _.push("#define MENU_PAGES_H"), _.push(""), _.push('#include "u8g2_menu.h"'), _.push(""), _.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"), a.forEach((m, h) => _.push(`void ${m}(void);   /* ${r.pages[h].name} */`)), _.push(""), l.size) {
    _.push("/* 可编辑变量（在条目绑定中使用） */");
    for (const m of l.values()) _.push(`extern ${m.type} ${m.name};`);
    _.push("");
  }
  if (n.size || c.size) {
    _.push("/* 用户回调 */");
    for (const [m] of n) _.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID);`);
    for (const m of c) _.push(`void ${m}(u8g2_t *u8g2);`);
    _.push("");
  }
  _.push("#endif /* MENU_PAGES_H */");
  const v = g.join(`
`).replace(/\n{3,}/g, `


`), y = _.join(`
`);
  return { c: `${v}
`, h: `${y}
`, warnings: e };
}
var M = /* @__PURE__ */ ((r) => (r[r.None = 0] = "None", r[r.Up = 1] = "Up", r[r.Down = 2] = "Down", r[r.Enter = 3] = "Enter", r[r.Return = 4] = "Return", r[r.Add = 5] = "Add", r[r.Sub = 6] = "Sub", r))(M || {});
const Me = 8192 / 8;
function Ie(r) {
  return new Promise((t, e) => {
    const s = document.createElement("script");
    s.src = r, s.onload = () => t(), s.onerror = () => e(new Error(`预览引擎脚本加载失败: ${r}`)), document.head.appendChild(s);
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
      locateFile: (l) => t.replace(/[^/\\]*$/, "") + l
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const a = this.mod._em_font_count_export();
    for (let l = 0; l < a; l++) {
      const i = this.mod._em_font_name(l);
      this.fontIndexCache.set(this.mod.UTF8ToString(i), l);
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
    const a = (l) => Math.trunc(Number.isFinite(l) ? l : 0);
    t.pages.forEach((l, i) => {
      e.ccall("em_page_begin", null, ["number"], [i]), l.items.forEach((n, c) => {
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
              [i, c, 0, 0, n.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [i, c, n.text]);
            break;
          case "number": {
            const o = { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }[n.varType], u = n.varType === "float" || n.varType === "double" ? Math.round(n.initialValue) : a(n.initialValue);
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
              [i, c, 1, o, n.scale, 0, 0, 0, 0, 0, u, a(n.step), a(n.min), a(n.max), -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [i, c, n.text]);
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
              [i, c, 2, 0, n.scale, 0, 0, a(n.openValue), 0, 0, a(n.initialValue), 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [i, c, n.text]), e.ccall(
              "em_item_swtext",
              null,
              ["number", "number", "string", "string"],
              [i, c, n.onText, n.offText]
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
              [i, c, 3, 0, n.scale, 0, 0, 0, a(n.buttonId), 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [i, c, n.text]);
            break;
          case "submenu": {
            const o = t.pages.findIndex((u) => u.id === n.targetPageId);
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
              [i, c, 4, 0, n.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, o, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [i, c, n.text]);
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
              [i, c, 5, 0, n.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [i, c, n.text]);
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
              [i, c, 6, 0, 1, 0, 0, 0, 0, 0, a(n.initialValue), a(n.step), a(n.min), a(n.max), -1, 0, 0, 0, 0, 0]
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
              [i, c, 7, 0, 1, 0, 0, 0, 0, 0, a(n.initialValue), a(n.step), a(n.min), a(n.max), -1, 0, 0, 0, 0, 0]
            );
            break;
          case "chart": {
            const o = { sine: 0, ramp: 1, noise: 2 }[n.sample], u = n.min !== void 0 && n.max !== void 0 ? 1 : 0;
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
                i,
                c,
                8,
                0,
                1,
                { line: 0, point: 1, bar: 2 }[n.chartKind],
                0,
                0,
                0,
                u,
                o,
                0,
                u ? a(n.min) : 0,
                u ? a(n.max) : 0,
                -1,
                0,
                0,
                a(n.height),
                a(n.dataLen),
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
              [i, c, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, a(n.w), a(n.h), 0, 0, 0]
            );
            const o = e._em_scratch(n.bits.length);
            o && (e.HEAPU8.set(new Uint8Array(n.bits), o), e._em_item_bits(i, c, o, n.bits.length));
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
              [i, c, 10, 0, 1, 0, n.bindScroll ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, a(n.height), 0, a(n.lineSpacing)]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [i, c, n.content]);
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
              [i, c, 11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, a(n.w), a(n.h), 0, 0, 0]
            );
            break;
        }
      }), e.ccall("em_page_end", null, ["number", "number"], [i, l.items.length]);
    }), e.ccall("em_pages_commit", null, ["number"], [t.pages.length]), e.ccall(
      "em_set_style",
      null,
      ["number", "number", "number", "number", "number", "number", "number"],
      [
        this.fontIndex(t.font),
        { default: 0, rotundity: 1, square: 2 }[t.selector],
        a(t.selectorLeftMargin),
        a(t.selectorTopMargin),
        a(t.selectorLineSpacing),
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
    var n, c;
    const e = this.mod;
    if (!e) return;
    const s = e._em_frame(t);
    if (!s) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const a = e.HEAPU8.subarray(s, s + Me), l = this.img.data;
    l.fill(255);
    for (let b = 0; b < 64; b++) {
      const o = (b >> 3) * 128, u = 1 << (b & 7);
      let f = b * 128 * 4;
      for (let I = 0; I < 128; I++)
        a[o + I] & u && (l[f] = 17, l[f + 1] = 24, l[f + 2] = 39), f += 4;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const i = e._em_get_current_page();
    i !== this.lastKnownPage && (this.lastKnownPage = i, (c = (n = this.events).onPageChanged) == null || c.call(n, i));
  }
  key(t) {
    var e;
    (e = this.mod) == null || e.ccall("em_key", null, ["number"], [t]);
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
function Ce(r, t, e, s) {
  const a = r.getState(), l = e.label || "text" in e && e.text || Q[e.kind], i = (n) => (c) => {
    c.stopPropagation(), r.getState().moveItem(t.id, e.id, n);
  };
  return x`<div class="ume-item-row ${s ? "selected" : ""}"
    @click=${() => r.getState().select(t.id, e.id)}>
    <span class="ume-item-icon">${ve[e.kind]}</span>
    <span class="ume-item-name" title=${l}>${l}</span>
    <button class="ume-mini" title="上移" @click=${i(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${i(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(n) => {
    n.stopPropagation(), a.duplicateItem(t.id, e.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(n) => {
    n.stopPropagation(), a.removeItem(t.id, e.id);
  }}>✕</button>
  </div>`;
}
function Te(r, t) {
  const e = r.getState();
  return x`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(s) => {
    const a = s.target.value;
    a && e.addItem(a, t.id), s.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${Ne.map((s) => x`<option value=${s}>${Q[s]}</option>`)}
  </select>`;
}
function Pe(r, t) {
  const { project: e, selection: s } = t.getState(), a = (l) => {
    const i = t.getState(), n = s.pageId === l.id;
    return x`<div class="ume-page">
      <div class="ume-page-head ${n ? "selected" : ""}"
        @click=${() => t.getState().select(l.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${l.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(c) => {
      c.stopPropagation(), i.movePage(l.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(c) => {
      c.stopPropagation(), i.movePage(l.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(c) => {
      if (c.stopPropagation(), e.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${l.name}"？`) && i.removePage(l.id);
    }}>✕</button>
      </div>
      ${n ? x`<div class="ume-page-items">
        ${l.items.length ? l.items.map((c) => Ce(t, l, c, s.itemId === c.id)) : x`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Te(t, l)}</div>
      </div>` : W}
    </div>`;
  };
  B(x`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => Le(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(a)}
  `, r);
}
function Le(r) {
  const t = prompt("页面名称:", `页面${r.getState().project.pages.length + 1}`);
  t !== null && r.getState().addPage(t || void 0);
}
function S(r, t, e, s = "") {
  return x`<div class="ume-field">
    <label>${r}</label>
    <input type="text" .value=${t ?? ""} placeholder=${s}
      @change=${(a) => e(a.target.value)} />
  </div>`;
}
function $(r, t, e, s = 1) {
  return x`<div class="ume-field">
    <label>${r}</label>
    <input type="number" .value=${String(t)} step=${String(s)}
      @change=${(a) => {
    const l = parseFloat(a.target.value);
    e(Number.isFinite(l) ? l : 0);
  }} />
  </div>`;
}
function L(r, t, e, s) {
  return x`<div class="ume-field">
    <label>${r}</label>
    <select @change=${(a) => s(a.target.value)}>
      ${e.map((a) => x`<option value=${a.value} ?selected=${a.value === t}>${a.label}</option>`)}
    </select>
  </div>`;
}
function Ae(r, t, e) {
  return x`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${(s) => e(s.target.checked)} />
    <span>${r}</span>
  </div>`;
}
function ue(r, t, e, s = !1) {
  return x`<div class="ume-field wide">
    <label>${r}</label>
    <textarea style=${s ? "font-family:Consolas,monospace" : ""}
      @change=${(a) => e(a.target.value)}>${t ?? ""}</textarea>
  </div>`;
}
function Z(r, t, e = "text/plain") {
  const s = new Blob([t], { type: `${e};charset=utf-8` }), a = document.createElement("a");
  a.href = URL.createObjectURL(s), a.download = r, a.click(), setTimeout(() => URL.revokeObjectURL(a.href), 5e3);
}
const De = [
  { value: "uint8", label: "uint8" },
  { value: "uint16", label: "uint16" },
  { value: "uint32", label: "uint32" },
  { value: "int8", label: "int8" },
  { value: "int16", label: "int16" },
  { value: "int32", label: "int32" },
  { value: "int", label: "int" }
], je = [
  ...De,
  { value: "float", label: "float" },
  { value: "double", label: "double" }
];
function Ue(r, t, e) {
  const { project: s, selection: a } = t.getState(), l = s.pages.find((o) => o.id === a.pageId) ?? null, i = (l == null ? void 0 : l.items.find((o) => o.id === a.itemId)) ?? null, n = (o, u) => t.getState().updateItem(l.id, i.id, o, u);
  let c = x`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, b = "属性";
  if (l && !i)
    b = "页面属性", c = x`
      ${S("名称", l.name, (o) => t.getState().updatePage(l.id, { name: o }))}
      ${S("C 函数名", l.fnName, (o) => t.getState().updatePage(l.id, { fnName: o }), "留空自动 page_N")}
      ${ue("用户代码", l.userCodePre, (o) => t.getState().updatePage(l.id, { userCodePre: o }), !0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;
  else if (l && i)
    switch (b = `${Q[i.kind]}`, i.kind) {
      case "text":
        c = x`
          ${S("文本/格式", i.text, (o) => n({ text: o }, `text-${i.id}`))}
          ${L("大小", String(i.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (o) => n({ scale: Number(o) }))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      case "number": {
        const o = i, u = o.varType === "float" || o.varType === "double";
        c = x`
          ${L("变量类型", o.varType, je, (f) => n({ varType: f }))}
          ${S("变量名", o.varName, (f) => n({ varName: f }))}
          ${S("显示文本", o.text, (f) => n({ text: f }, `text-${i.id}`))}
          ${$("步长", o.step, (f) => n({ step: f }), "any")}
          ${$("最小值", o.min, (f) => n({ min: f }), "any")}
          ${$("最大值", o.max, (f) => n({ max: f }), "any")}
          ${$("初始值", o.initialValue, (f) => n({ initialValue: f }), "any")}
          ${u ? $("小数位", o.decimals, (f) => n({ decimals: Math.max(0, Math.trunc(f)) })) : W}
          ${L("大小", String(o.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (f) => n({ scale: Number(f) }))}
          <div class="ume-hint">int 建议 %d/%u，float 建议 %.Nf</div>
        `;
        break;
      }
      case "switch": {
        const o = i;
        c = x`
          ${S("变量名", o.varName, (u) => n({ varName: u }))}
          ${S("显示文本", o.text, (u) => n({ text: u }, `text-${i.id}`))}
          ${$("openValue", o.openValue, (u) => n({ openValue: Math.max(0, Math.trunc(u)) }))}
          ${S('"开"文本', o.onText, (u) => n({ onText: u }))}
          ${S('"关"文本', o.offText, (u) => n({ offText: u }))}
          ${$("初始值", o.initialValue, (u) => n({ initialValue: Math.trunc(u) }))}
        `;
        break;
      }
      case "button": {
        const o = i;
        c = x`
          ${S("显示文本", o.text, (u) => n({ text: u }, `text-${i.id}`))}
          ${S("回调函数名", o.cbName, (u) => n({ cbName: u }))}
          ${$("ID", o.buttonId, (u) => n({ buttonId: Math.trunc(u) }))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;
        break;
      }
      case "submenu": {
        const o = i;
        c = x`
          ${S("显示文本", o.text, (u) => n({ text: u }, `text-${i.id}`))}
          ${L("目标页面", o.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...s.pages.filter((u) => u.id !== l.id).map((u) => ({ value: u.id, label: u.name }))
        ], (u) => n({ targetPageId: u || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;
        break;
      }
      case "back": {
        c = x`
          ${S("显示文本", i.text, (o) => n({ text: o }, `text-${i.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const o = i;
        c = x`
          ${S("变量名 (int)", o.varName, (u) => n({ varName: u }))}
          ${$("步长", o.step, (u) => n({ step: Math.trunc(u) }))}
          ${$("最小值", o.min, (u) => n({ min: Math.trunc(u) }))}
          ${$("最大值", o.max, (u) => n({ max: Math.trunc(u) }))}
          ${$("初始值", o.initialValue, (u) => n({ initialValue: Math.trunc(u) }))}
          <div class="ume-hint">绑定 u8g2_MenuDrawItem${o.kind === "slider" ? "Slider" : "ProgressBar"}_bind</div>
        `;
        break;
      }
      case "chart": {
        const o = i;
        c = x`
          ${L("类型", o.chartKind, [
          { value: "line", label: "折线图" },
          { value: "point", label: "散点图" },
          { value: "bar", label: "柱状图" }
        ], (u) => n({ chartKind: u }))}
          ${$("数据点数", o.dataLen, (u) => n({ dataLen: Math.max(2, Math.trunc(u)) }))}
          ${$("高度(px)", o.height, (u) => n({ height: Math.max(8, Math.trunc(u)) }))}
          ${L("示例数据", o.sample, [
          { value: "sine", label: "正弦" },
          { value: "ramp", label: "斜坡" },
          { value: "noise", label: "伪随机" }
        ], (u) => n({ sample: u }))}
          ${$("量程上限", o.max ?? 0, (u) => n({ max: u || void 0 }), "any")}
          ${$("量程下限", o.min ?? 0, (u) => n({ min: u || void 0 }), "any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;
        break;
      }
      case "xbm": {
        const o = i;
        c = x`
          ${S("数组名", o.name, (u) => n({ name: u }))}
          ${$("宽(px)", o.w, (u) => n({ w: Math.min(128, Math.max(1, Math.trunc(u))) }))}
          ${$("高(px)", o.h, (u) => n({ h: Math.min(64, Math.max(1, Math.trunc(u))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => e.openXbmEditor(l.id, o.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${o.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const o = i;
        c = x`
          ${ue("文本内容", o.content, (u) => n({ content: u }))}
          ${$("高度(px)", o.height, (u) => n({ height: Math.max(10, Math.trunc(u)) }))}
          ${$("行间距", o.lineSpacing, (u) => n({ lineSpacing: Math.max(0, Math.trunc(u)) }))}
          ${Ae("上下键滚动 (bind)", o.bindScroll, (u) => n({ bindScroll: u }))}
        `;
        break;
      }
      case "board": {
        const o = i;
        c = x`
          ${$("宽(px)", o.w, (u) => n({ w: Math.max(1, Math.trunc(u)) }))}
          ${$("高(px)", o.h, (u) => n({ h: Math.max(1, Math.trunc(u)) }))}
          ${S("回调函数名", o.cbName, (u) => n({ cbName: u }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
  B(x`
    <div class="ume-panel-title">属性 ${b !== "属性" ? x`<span class="ume-kind-badge">${b}</span>` : W}</div>
    ${c}
  `, r);
}
function Re(r, t) {
  const { project: e } = t.getState(), s = (a, l) => t.getState().update((i) => {
    Object.assign(i, a);
  }, l);
  B(x`
    <div class="ume-panel-title">工程</div>
    ${S("工程名", e.name, (a) => s({ name: a }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width !== 128 || e.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${L(
    "字体",
    e.font,
    $e.map((a) => ({ value: a.id, label: a.label })),
    (a) => s({ font: a })
  )}
    ${L("选择器", e.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (a) => s({ selector: a }))}
    ${$("左边距", e.selectorLeftMargin, (a) => s({ selectorLeftMargin: Math.max(0, Math.trunc(a)) }))}
    ${$("顶边距", e.selectorTopMargin, (a) => s({ selectorTopMargin: Math.max(0, Math.trunc(a)) }))}
    ${$("行间距", e.selectorLineSpacing, (a) => s({ selectorLineSpacing: Math.max(0, Math.trunc(a)) }))}
    ${$("跑马灯速度", e.marqueeSpeed, (a) => s({ marqueeSpeed: a }), 0.05)}
    ${$("跑马灯停留", e.marqueeHeaderLen, (a) => s({ marqueeHeaderLen: a }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>
  `, r);
}
function qe(r, t) {
  const e = (a) => {
    let l;
    const i = () => {
      l && (clearInterval(l), l = void 0);
    };
    return {
      down: (n) => {
        n.preventDefault(), t.key(a), i(), l = window.setInterval(() => t.key(a), 180);
      },
      up: i
    };
  }, s = (a, l, i) => {
    const n = e(a);
    return x`<button class="ume-key" title=${i}
      @pointerdown=${n.down} @pointerup=${n.up} @pointerleave=${n.up}>${l}</button>`;
  };
  B(x`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(a) => {
    const i = {
      ArrowUp: M.Up,
      ArrowDown: M.Down,
      Enter: M.Enter,
      Escape: M.Return,
      Backspace: M.Return,
      "+": M.Add,
      "-": M.Sub,
      "=": M.Add,
      _: M.Sub
    }[a.key];
    i !== void 0 && (a.preventDefault(), t.key(i));
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
  `, r);
}
let K = null, R = "c";
function ze(r, t) {
  K = t, Fe(r);
}
function Fe(r) {
  if (!K) return;
  const t = R === "c" ? K.c : K.h, e = document.createElement("div");
  e.className = "ume-modal-mask", e.addEventListener("click", (a) => {
    a.target === e && ce(e);
  });
  const s = () => {
    B(x`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${() => ce(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${K.warnings.length ? x`
            <div style="margin-bottom:8px">
              ${K.warnings.map((a) => x`<div class="ume-warn">⚠ ${a}</div>`)}
            </div>` : W}
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
      navigator.clipboard.writeText(t).then(() => Oe(e, "已复制到剪贴板"));
    }}>复制</button>
          <button class="ume-btn primary" @click=${() => {
      Z(R === "c" ? "menu_pages.c" : "menu_pages.h", t);
    }}>下载 ${R === "c" ? "menu_pages.c" : "menu_pages.h"}</button>
        </div>
      </div>
    `, e);
  };
  s(), r.appendChild(e);
}
function ce(r) {
  r.remove();
}
function Oe(r, t) {
  const e = r.closest(".ume") ?? document.body;
  let s = e.querySelector(".ume-toast");
  s || (s = document.createElement("div"), s.className = "ume-toast", e.appendChild(s)), s.textContent = t, s.classList.add("show"), setTimeout(() => s.classList.remove("show"), 1600);
}
function Ve(r, t, e, s) {
  const l = t.getState().project.pages.find((v) => v.id === e), i = l == null ? void 0 : l.items.find((v) => v.id === s);
  if (!i || i.kind !== "xbm") return;
  const n = i;
  let c = n.w, b = n.h, o = [...n.bits];
  const u = () => Math.ceil(c / 8), f = document.createElement("div");
  f.className = "ume-modal-mask", f.addEventListener("click", (v) => {
    v.target === f && _();
  });
  const I = (v, y) => {
    const m = y * u() + (v >> 3);
    return m < o.length ? !!(o[m] >> (v & 7) & 1) : !1;
  }, A = (v, y, m) => {
    const h = y * u() + (v >> 3);
    o[h] = m ? o[h] | 1 << (v & 7) : o[h] & ~(1 << (v & 7));
  }, E = (v, y) => {
    const m = Math.ceil(c / 8), h = Math.ceil(v / 8), d = new Array(h * y).fill(0);
    for (let k = 0; k < Math.min(b, y); k++)
      for (let p = 0; p < Math.min(c, v); p++) {
        const w = k * m + (p >> 3);
        w < o.length && o[w] >> (p & 7) & 1 && (d[k * h + (p >> 3)] |= 1 << (p & 7));
      }
    c = v, b = y, o = d;
  };
  let D = !1, H = !0;
  const j = (v, y) => (m) => {
    m.preventDefault(), D = !0, H = !I(v, y), A(v, y, H), N();
  }, Y = (v, y) => () => {
    D && (A(v, y, H), N());
  }, z = () => {
    D = !1;
  }, N = () => {
    B(g(), f);
  }, ee = () => {
    const v = [];
    for (let y = 0; y < b; y++)
      for (let m = 0; m < c; m++)
        v.push(x`<button class="ume-xbm-cell ${I(m, y) ? "on" : ""}"
          data-x=${m} data-y=${y}
          @pointerdown=${j(m, y)}
          @pointerenter=${Y(m, y)}></button>`);
    return v;
  }, g = () => x`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${c}×${b}</span></span>
        <button class="ume-mini" @click=${_}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${z}
        @pointerleave=${z}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(c)} min="1" max="128"
            @change=${(v) => {
    E(le(+v.target.value, 1, 128), b), N();
  }} />
          <input type="number" style="width:64px" .value=${String(b)} min="1" max="64"
            @change=${(v) => {
    E(c, le(+v.target.value, 1, 64)), N();
  }} />
          <button class="ume-btn sm" @click=${() => {
    o = o.map(() => 0), N();
  }}>清空</button>
          <button class="ume-btn sm" @click=${() => {
    o = o.map((v) => ~v & 255), N();
  }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${c}, 14px)">${ee()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${n.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${_}>取消</button>
        <button class="ume-btn primary" @click=${() => {
    t.getState().updateItem(e, s, { w: c, h: b, bits: [...o] }), _();
  }}>应用</button>
      </div>
    </div>
  `;
  function _() {
    f.remove(), document.removeEventListener("pointerup", z);
  }
  document.addEventListener("pointerup", z), N(), r.appendChild(f);
}
function le(r, t, e) {
  return Number.isFinite(r) ? Math.min(e, Math.max(t, Math.trunc(r))) : t;
}
const Ke = "prebuilt/u8g2-menu-preview.js";
class Xe {
  constructor(t, e = {}) {
    var o;
    if (this.store = me(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.container = t, this.opts = { persistKey: "default", ...e }, t.classList.add("ume"), !document.getElementById("ume-style")) {
      const u = document.createElement("style");
      u.id = "ume-style", u.textContent = pe, document.head.appendChild(u);
    }
    const s = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, a = this.opts.data ?? s ?? void 0;
    if (a !== void 0)
      try {
        this.store.setState({ project: ae(a) });
      } catch (u) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", u);
      }
    const l = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null, i = this.opts.persistKey ? localStorage.getItem(`ume_last_h_${this.opts.persistKey}`) : null;
    l && i && (this.lastExport = { c: l, h: i }), t.innerHTML = `
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
    const n = (u) => t.querySelector(u);
    this.els = {
      left: n(".ume-left"),
      center: n(".ume-center"),
      right: n(".ume-right"),
      styleEl: n('[data-role="style"]'),
      propEl: n('[data-role="prop"]'),
      toolbarUndo: n('[data-act="undo"]'),
      toolbarRedo: n('[data-act="redo"]')
    };
    const c = document.createElement("div");
    c.style.display = "flex", c.style.flexDirection = "column", c.style.alignItems = "center", c.style.gap = "10px", this.els.center.appendChild(c), this.preview = new Ee(c, {
      onPageChanged: (u) => this.onPreviewPageChanged(u)
    });
    const b = document.createElement("div");
    this.els.center.appendChild(b), qe(b, this.preview), this.preview.load(this.opts.wasmUrl ?? Ke).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((u) => {
      console.error(u);
      const f = document.createElement("div");
      f.className = "ume-warn", f.textContent = `预览引擎加载失败: ${u.message}。编辑功能不受影响。`, this.els.center.prepend(f);
    }), t.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const u = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      u !== null && this.store.getState().addPage(u || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), t.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      Z(
        `${this.store.getState().project.name || "menu-project"}.json`,
        ie(this.store.getState().project),
        "application/json"
      );
    }), t.querySelector('[data-act="import"]').addEventListener("click", () => {
      n('[data-role="file"]').click();
    }), n('[data-role="file"]').addEventListener("change", (u) => {
      var I;
      const f = (I = u.target.files) == null ? void 0 : I[0];
      f && (f.text().then((A) => {
        try {
          const E = ae(A);
          this.store.getState().update((D) => {
            Object.assign(D, E);
          }), this.scheduleRender();
        } catch (E) {
          alert(`导入失败: ${E.message}`);
        }
      }), u.target.value = "");
    }), t.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate()), this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((o = this.store.getState().project.pages[0]) == null ? void 0 : o.id) ?? null, null), this.store.subscribe(() => {
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
    this.store.getState().update((a) => {
      Object.assign(a, e);
    }), this.store.getState().select(((s = e.pages[0]) == null ? void 0 : s.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var s, a;
    const t = this.lastExport, e = oe(this.store.getState().project, t ?? void 0);
    return this.lastExport = { c: e.c, h: e.h }, this.opts.persistKey && (localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, e.c), localStorage.setItem(`ume_last_h_${this.opts.persistKey}`, e.h)), ze(this.container, e), (a = (s = this.opts).onExport) == null || a.call(s, e), e;
  }
  downloadC() {
    const t = oe(this.store.getState().project, this.lastExport ?? void 0);
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
      Pe(this.els.left, this.store), Re(this.els.styleEl, this.store), Ue(this.els.propEl, this.store, {
        openXbmEditor: (e, s) => Ve(this.container, this.store, e, s)
      }), this.els.toolbarUndo.disabled = t.past.length === 0, this.els.toolbarRedo.disabled = t.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var l;
    const t = document.getElementById("ume-live-page"), e = document.getElementById("ume-live-value"), s = this.store.getState(), a = this.store.getState().project.pages.findIndex((i) => i.id === s.selection.pageId);
    if (t && a >= 0) {
      const i = this.preview.currentPage;
      t.textContent = `预览页: ${((l = this.store.getState().project.pages[i]) == null ? void 0 : l.name) ?? "?"}`;
    }
    if (e && a >= 0 && s.selection.itemId) {
      const i = s.project.pages[a], n = i.items.findIndex((b) => b.id === s.selection.itemId), c = i.items[n];
      if (c && "varName" in c) {
        const b = c.kind === "switch" ? this.preview.getSwitch(a, n) : this.preview.getInt(a, n);
        e.textContent = `${c.varName} = ${b}`;
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
