import { createStore as je } from "zustand/vanilla";
import { render as ae, html as x, nothing as D } from "lit-html";
const Fe = `/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;
let he = 0;
function R(i) {
  return he = (he + 1) % 1e9, `${i}_${Date.now().toString(36)}_${he.toString(36)}`;
}
function me(i) {
  return {
    id: R("vb"),
    name: "var_new",
    type: "int32",
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
    ...i
  };
}
function Te(i) {
  return {
    id: R("buf"),
    name: "buf_new",
    dataLen: 32,
    sample: "sine",
    ...i
  };
}
function ze(i, t) {
  const e = new Set(i.map((r) => r.name));
  if (!e.has(t)) return t;
  let n = 2;
  for (; e.has(`${t}_${n}`); ) n++;
  return `${t}_${n}`;
}
function Oe(i, t) {
  const e = new Set(i.map((r) => r.name));
  if (!e.has(t)) return t;
  let n = 2;
  for (; e.has(`${t}_${n}`); ) n++;
  return `${t}_${n}`;
}
function X(i) {
  const t = { id: R("it"), label: "", bind: { type: "none" } };
  switch (i) {
    case "text":
      return { ...t, kind: i, text: "菜单项", scale: 1, displayVarId: null };
    case "slider":
      return { ...t, kind: i, position: 50 };
    case "progress":
      return { ...t, kind: i, position: 50 };
    case "chart":
      return {
        ...t,
        kind: i,
        sources: [],
        height: 32
      };
    case "xbm":
      return Re(16, 16);
    case "textarea":
      return {
        ...t,
        kind: i,
        content: `这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,
        height: 40,
        bindScroll: !0,
        lineSpacing: 0
      };
    case "board":
      return { ...t, kind: i, w: 64, h: 32, cbName: "board_cb" };
  }
}
function Re(i, t) {
  const e = Math.ceil(i / 8);
  return {
    id: R("it"),
    kind: "xbm",
    label: "",
    bind: { type: "none" },
    name: "icon",
    w: i,
    h: t,
    bits: new Array(e * t).fill(0)
  };
}
function be(i) {
  return { id: R("pg"), name: i, fnName: "", items: [], userCodePre: "" };
}
function ce(i, t) {
  return { ...i, ...t };
}
function W(i, t) {
  return { ...i, ...t };
}
function qe() {
  const i = [
    me({ name: "var_value", type: "int32", initialValue: 50, min: 0, max: 100, step: 1 }),
    me({ name: "var_switch", type: "uint8", initialValue: 0, min: 0, max: 1, step: 1 }),
    me({ name: "var_slider", type: "int32", initialValue: 50, min: 0, max: 100, step: 2 })
  ], t = [
    Te({ name: "buf_demo", dataLen: 32, sample: "sine" })
  ], e = be("主页");
  e.items = [
    ce(X("text"), { text: "u8g2_menu" }),
    W(X("text"), { text: "系统设置", bind: { type: "submenu", targetPageId: null } }),
    W(X("text"), { text: "关于", bind: { type: "button", cbName: "btn_about_cb", buttonId: 1 } })
  ];
  const n = be("设置");
  n.items = [
    W(ce(X("text"), { text: "音量:%d" }), { bind: { type: "value", varId: i[0].id } }),
    W(ce(X("text"), { text: "开关:%s" }), {
      bind: { type: "switch", varId: i[1].id, openValue: 1, onText: "on", offText: "off" }
    }),
    W(X("slider"), { bind: { type: "value", varId: i[2].id } }),
    W(X("text"), { text: "图表", bind: { type: "submenu", targetPageId: null } }),
    W(X("text"), { text: "返回", bind: { type: "back" } })
  ];
  const r = be("图表");
  r.items = [
    ce(X("chart"), {
      height: 36,
      sources: [{ bufferId: t[0].id, chartKind: "line" }]
    }),
    W(X("text"), { text: "返回", bind: { type: "back" } })
  ];
  const s = {
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
    variables: i,
    chartBuffers: t,
    pages: [e, n, r]
  };
  return e.items[1].bind.targetPageId = n.id, n.items[3].bind.targetPageId = r.id, s;
}
function He(i) {
  return structuredClone(i);
}
const Xe = 800;
function Ae() {
  let i = null, t = 0;
  return je()((e, n) => ({
    project: qe(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (r, s) => {
      const a = Date.now(), o = !!s && s === i && a - t < Xe;
      i = s ?? null, t = a, e((l) => {
        const c = He(l.project);
        return r(c), {
          project: c,
          dirty: !0,
          past: o ? l.past : [...l.past.slice(-99), l.project],
          future: []
        };
      });
    },
    undo: () => {
      e((r) => r.past.length ? {
        project: r.past[r.past.length - 1],
        past: r.past.slice(0, -1),
        future: [r.project, ...r.future.slice(0, 99)],
        dirty: !0
      } : r);
    },
    redo: () => {
      e((r) => {
        if (!r.future.length) return r;
        const [s, ...a] = r.future;
        return {
          project: s,
          past: [...r.past, r.project],
          future: a,
          dirty: !0
        };
      });
    },
    select: (r, s = null) => e({ selection: { pageId: r, itemId: s } }),
    addPage: (r) => {
      const s = { id: R("pg"), name: r ?? `页面${n().project.pages.length + 1}`, fnName: "", items: [], userCodePre: "" };
      return n().update((a) => {
        a.pages.push(s);
      }), e({ selection: { pageId: s.id, itemId: null } }), s;
    },
    removePage: (r) => {
      n().update((a) => {
        a.pages = a.pages.filter((o) => o.id !== r);
        for (const o of a.pages)
          for (const l of o.items)
            l.bind.type === "submenu" && l.bind.targetPageId === r && (l.bind.targetPageId = null);
      });
      const { selection: s } = n();
      s.pageId === r && e({ selection: { pageId: null, itemId: null } });
    },
    movePage: (r, s) => {
      n().update((a) => {
        const o = a.pages.findIndex((c) => c.id === r), l = o + s;
        o < 0 || l < 0 || l >= a.pages.length || ([a.pages[o], a.pages[l]] = [a.pages[l], a.pages[o]]);
      });
    },
    updatePage: (r, s) => {
      n().update((a) => {
        const o = a.pages.find((l) => l.id === r);
        o && Object.assign(o, s);
      });
    },
    addItem: (r, s) => {
      var l;
      const a = s ?? n().selection.pageId ?? ((l = n().project.pages[0]) == null ? void 0 : l.id);
      if (!a) return null;
      const o = Ze(r);
      return n().update((c) => {
        const u = c.pages.find((m) => m.id === a);
        u == null || u.items.push(o);
      }), e({ selection: { pageId: a, itemId: o.id } }), o;
    },
    removeItem: (r, s) => {
      n().update((o) => {
        const l = o.pages.find((c) => c.id === r);
        l && (l.items = l.items.filter((c) => c.id !== s));
      });
      const { selection: a } = n();
      a.itemId === s && e({ selection: { pageId: r, itemId: null } });
    },
    moveItem: (r, s, a) => {
      n().update((o) => {
        const l = o.pages.find((m) => m.id === r);
        if (!l) return;
        const c = l.items.findIndex((m) => m.id === s), u = c + a;
        c < 0 || u < 0 || u >= l.items.length || ([l.items[c], l.items[u]] = [l.items[u], l.items[c]]);
      });
    },
    duplicateItem: (r, s) => {
      let a = null;
      n().update((o) => {
        const l = o.pages.find((u) => u.id === r);
        if (!l) return;
        const c = l.items.findIndex((u) => u.id === s);
        c < 0 || (a = structuredClone(l.items[c]), a.id = R("it"), l.items.splice(c + 1, 0, a));
      }), a && e({ selection: { pageId: r, itemId: a.id } });
    },
    updateItem: (r, s, a, o) => {
      n().update((l) => {
        const c = l.pages.find((m) => m.id === r), u = c == null ? void 0 : c.items.find((m) => m.id === s);
        u && Object.assign(u, a);
      }, o);
    },
    addVariable: (r) => {
      let s = null;
      return n().update((a) => {
        a.variables = a.variables ?? [];
        const o = Oe(a.variables, (r == null ? void 0 : r.name) ?? "var_new");
        s = me({ ...r, name: o }), a.variables.push(s);
      }), s;
    },
    removeVariable: (r) => {
      let s = 0;
      for (const a of n().project.pages)
        for (const o of a.items)
          "varId" in o && o.varId === r && s++;
      return s > 0 ? s : (n().update((a) => {
        a.variables = (a.variables ?? []).filter((o) => o.id !== r);
      }), 0);
    },
    updateVariable: (r, s, a) => {
      n().update((o) => {
        const l = (o.variables ?? []).find((c) => c.id === r);
        l && Object.assign(l, s);
      }, a);
    },
    addChartBuffer: (r) => {
      let s = null;
      return n().update((a) => {
        a.chartBuffers = a.chartBuffers ?? [];
        const o = ze(a.chartBuffers, (r == null ? void 0 : r.name) ?? "buf_new");
        s = Te({ ...r, name: o }), a.chartBuffers.push(s);
      }), s;
    },
    removeChartBuffer: (r) => {
      let s = 0;
      for (const a of n().project.pages)
        for (const o of a.items)
          o.kind === "chart" && o.sources.some((l) => l.bufferId === r) && s++;
      return s > 0 ? s : (n().update((a) => {
        a.chartBuffers = (a.chartBuffers ?? []).filter((o) => o.id !== r);
      }), 0);
    },
    updateChartBuffer: (r, s, a) => {
      n().update((o) => {
        const l = (o.chartBuffers ?? []).find((c) => c.id === r);
        l && Object.assign(l, s);
      }, a);
    }
  }));
}
Ae();
function Ze(i) {
  return X(i);
}
const ge = 1, ie = [
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
], fe = {
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
}, pe = {
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
class ne extends Error {
}
const Ve = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int", "float", "double"]), Pe = /* @__PURE__ */ new Set(["line", "point", "bar"]), Le = /* @__PURE__ */ new Set(["sine", "ramp", "noise", "none"]);
function se(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function P(i, t) {
  return typeof i == "string" ? i : t;
}
function E(i, t) {
  return typeof i == "number" && Number.isFinite(i) ? i : t;
}
const Je = ["text", "slider", "progress", "chart", "xbm", "textarea", "board"], We = ["number", "switch", "button", "submenu", "back"], Qe = ["none", "value", "switch", "button", "submenu", "back"];
function et(i) {
  if (!se(i)) throw new ne("条目格式错误");
  const t = P(i.kind, "");
  if (!(Je.includes(t) || We.includes(t)))
    throw new ne(`未知条目类型: ${String(t)}`);
  const e = structuredClone(i);
  switch (e.id = P(i.id, ""), e.id || (e.id = `it_${Math.random().toString(36).slice(2, 10)}`), e.label = P(i.label, ""), t) {
    case "text":
    case "number":
    case "switch":
    case "button":
    case "submenu":
    case "back":
      e.text = P(i.text, ""), e.scale = i.scale === 2 ? 2 : 1;
      break;
  }
  return e;
}
function tt(i) {
  for (const t of i)
    for (const e of t.items) {
      const n = e;
      if (!(n.bind && se(n.bind) && Qe.includes(P(n.bind.type, "none")))) {
        switch (n.kind) {
          case "number": {
            const r = n.varId ?? null;
            n.editable === !1 ? (n.kind = "text", n.displayVarId = r, n.bind = { type: "none" }) : (n.kind = "text", n.displayVarId = null, n.bind = { type: "value", varId: r });
            break;
          }
          case "switch":
            n.kind = "text", n.displayVarId = null, n.bind = {
              type: "switch",
              varId: n.varId ?? null,
              openValue: E(n.openValue, 1),
              onText: P(n.onText, "on"),
              offText: P(n.offText, "off")
            };
            break;
          case "button":
            n.kind = "text", n.displayVarId = null, n.bind = { type: "button", cbName: P(n.cbName, "btn_cb"), buttonId: E(n.buttonId, 1) };
            break;
          case "submenu":
            n.kind = "text", n.displayVarId = null, n.bind = { type: "submenu", targetPageId: n.targetPageId ?? null };
            break;
          case "back":
            n.kind = "text", n.displayVarId = null, n.bind = { type: "back" };
            break;
          case "slider":
          case "progress":
            n.bind = n.varId ? { type: "value", varId: n.varId } : { type: "none" }, n.position === void 0 && (n.position = 50);
            break;
          default:
            n.bind = { type: "none" }, n.kind === "text" && n.displayVarId === void 0 && (n.displayVarId = null);
            break;
        }
        delete n.varId, delete n.varName, delete n.varType, delete n.editable, delete n.step, delete n.min, delete n.max, delete n.initialValue, delete n.decimals, n.kind !== "board" && (delete n.cbName, delete n.buttonId), delete n.openValue, delete n.onText, delete n.offText, delete n.targetPageId;
      }
    }
}
function nt(i) {
  if (!se(i)) throw new ne("页面格式错误");
  const t = Array.isArray(i.items) ? i.items.map(et) : [];
  return {
    id: P(i.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: P(i.name, "未命名页面"),
    fnName: P(i.fnName, ""),
    items: t,
    userCodePre: P(i.userCodePre, "")
  };
}
function at(i) {
  if (!se(i)) return null;
  const t = P(i.type, "int32");
  return {
    id: P(i.id, "") || R("vb"),
    name: P(i.name, ""),
    type: Ve.has(t) ? t : "int32",
    initialValue: E(i.initialValue, 0),
    min: E(i.min, 0),
    max: E(i.max, 100),
    step: E(i.step, 1)
  };
}
function it(i) {
  if (!se(i)) return null;
  const t = P(i.sample, "sine");
  return {
    id: P(i.id, "") || R("buf"),
    name: P(i.name, ""),
    dataLen: Math.min(512, Math.max(2, Math.trunc(E(i.dataLen, 32)))),
    sample: Le.has(t) ? t : "sine"
  };
}
function st(i) {
  const t = /* @__PURE__ */ new Map(), e = [], n = (r, s) => {
    let a = t.get(r);
    return a || (a = s(), t.set(r, a), e.push(a)), a;
  };
  for (const r of i)
    for (const s of r.items) {
      const a = s;
      switch (s.kind) {
        case "number":
          if (a.varId === void 0 || a.varId === null) {
            const l = typeof a.varName == "string" && a.varName ? a.varName : "var_unnamed", c = n(l, () => ({
              id: R("vb"),
              name: l,
              type: Ve.has(String(a.varType)) ? String(a.varType) : "int32",
              initialValue: E(a.initialValue, 0),
              min: E(a.min, 0),
              max: E(a.max, 100),
              step: E(a.step, 1)
            }));
            s.varId = c.id;
          }
          a.editable === void 0 && (s.editable = !0), delete a.varName, delete a.varType, delete a.step, delete a.min, delete a.max, delete a.initialValue, delete a.decimals;
          break;
        case "slider":
        case "progress":
          if (a.varId === void 0 || a.varId === null) {
            const l = typeof a.varName == "string" && a.varName ? a.varName : "var_unnamed", c = n(l, () => ({
              id: R("vb"),
              name: l,
              type: "int",
              initialValue: E(a.initialValue, 0),
              min: E(a.min, 0),
              max: E(a.max, 100),
              step: E(a.step, 1)
            }));
            s.varId = c.id;
          }
          delete a.varName, delete a.step, delete a.min, delete a.max, delete a.initialValue;
          break;
        case "switch":
          if (a.varId === void 0 || a.varId === null) {
            const l = typeof a.varName == "string" && a.varName ? a.varName : "var_unnamed", c = n(l, () => ({
              id: R("vb"),
              name: l,
              type: "uint8",
              initialValue: E(a.initialValue, 0),
              min: 0,
              max: 1,
              step: 1
            }));
            s.varId = c.id;
          }
          delete a.varName, delete a.initialValue;
          break;
      }
    }
  return e;
}
function ve(i) {
  let t;
  if (typeof i == "string")
    try {
      t = JSON.parse(i);
    } catch {
      throw new ne("JSON 解析失败");
    }
  else
    t = i;
  if (!se(t)) throw new ne("不是有效的工程文件");
  const e = t, n = E(e.version, 0);
  if (n > ge)
    throw new ne(`工程版本 v${n} 高于当前支持的 v${ge}，请升级编辑器`);
  const r = Array.isArray(e.pages) ? e.pages.map(nt) : [];
  if (!r.length) throw new ne("工程至少需要一个页面");
  const s = ["default", "rotundity", "square"].includes(e.selector) ? e.selector : "rotundity", a = new Set(ie.map((u) => u.fn)), o = Array.isArray(e.weakHooks) ? [...new Set(e.weakHooks.filter((u) => typeof u == "string" && a.has(u)))] : [];
  let l;
  Array.isArray(e.variables) ? l = e.variables.map(at).filter((u) => !!u) : l = st(r);
  let c;
  return Array.isArray(e.chartBuffers) ? c = e.chartBuffers.map(it).filter((u) => !!u) : c = rt(r), tt(r), ot(r, c), {
    version: ge,
    name: P(e.name, "未命名工程"),
    width: E(e.width, 128),
    height: E(e.height, 64),
    font: P(e.font, "u8g2_font_wqy12_t_gb2312"),
    selector: s,
    selectorLeftMargin: E(e.selectorLeftMargin, 16),
    selectorTopMargin: E(e.selectorTopMargin, 0),
    selectorLineSpacing: E(e.selectorLineSpacing, 0),
    marqueeSpeed: E(e.marqueeSpeed, 0.2),
    marqueeHeaderLen: E(e.marqueeHeaderLen, 5),
    weakHooks: o,
    fontSubset: t.fontSubset === !0,
    fontExtra: P(t.fontExtra, ""),
    variables: l,
    chartBuffers: c,
    pages: r
  };
}
function rt(i) {
  const t = [];
  let e = 0;
  const n = () => {
    const r = {
      id: R("buf"),
      name: `buf_chart_${++e}`,
      dataLen: 32,
      sample: "sine"
    };
    return t.push(r), r;
  };
  for (const r of i)
    for (const s of r.items) {
      if (s.kind !== "chart") continue;
      const a = s;
      if (Array.isArray(a.sources)) continue;
      const o = n();
      o.dataLen = Math.min(512, Math.max(2, Math.trunc(E(a.dataLen, 32))));
      const l = P(a.sample, "sine");
      Le.has(l) && (o.sample = l);
      const c = P(a.chartKind, "line"), u = {
        bufferId: o.id,
        chartKind: Pe.has(c) ? c : "line"
      };
      a.max !== void 0 && a.max !== null && (u.max = E(a.max, 0)), a.min !== void 0 && a.min !== null && (u.min = E(a.min, 0)), s.sources = [u], a.height === void 0 && (s.height = 32), delete a.chartKind, delete a.dataLen, delete a.sample, delete a.max, delete a.min;
    }
  return t;
}
function ot(i, t) {
  const e = new Set(t.map((n) => n.id));
  for (const n of i)
    for (const r of n.items) {
      if (r.kind !== "chart") continue;
      const s = r;
      Array.isArray(s.sources) || (s.sources = []), r.sources = r.sources.filter((a) => e.has(a.bufferId)).map((a) => ({
        bufferId: a.bufferId,
        chartKind: Pe.has(a.chartKind) ? a.chartKind : "line",
        min: a.min,
        max: a.max
      })), typeof s.height != "number" && (s.height = 32);
    }
}
function Ee(i) {
  return JSON.stringify(i, null, 2);
}
const ut = {
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
function J(i, t = "anon") {
  let e = i.trim().replace(/[^A-Za-z0-9_]/g, "_");
  return (!e || /^[0-9]/.test(e)) && (e = `_${e}`), e || t;
}
function re(i) {
  return i.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function Q(i) {
  if (!Number.isFinite(i)) return "0.0f";
  const t = i.toString();
  return /[-.]|e/i.test(t) ? `${t}f` : `${t}.0f`;
}
function lt(i, t, e) {
  return e === "ramp" ? `${i}[i] = (float)i;` : e === "noise" ? `${i}[i] = (float)((i * 37) % ${t});` : `${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`;
}
function ct(i) {
  const t = /* @__PURE__ */ new Map();
  if (!i) return t;
  const e = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let n;
  for (; (n = e.exec(i)) !== null; ) t.set(n[1], n[2]);
  return t;
}
function H(i, t, e) {
  const n = t.has(i) ? t.get(i) : "";
  return `${e}/* USER CODE BEGIN ${i} */${n}${e}/* USER CODE END ${i} */`;
}
const dt = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]);
function Me(i, t, e) {
  const n = [], r = ct((t == null ? void 0 : t.c) ?? ""), s = i.pages.map((d, y) => d.fnName && /^[A-Za-z_][A-Za-z0-9_]*$/.test(d.fnName) ? d.fnName : `page_${y}`), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const d of i.variables ?? []) {
    if (!d.name) {
      n.push("存在未命名变量，已跳过");
      continue;
    }
    if (a.has(d.name)) {
      n.push(`变量名 "${d.name}" 重复，以第一个为准`);
      continue;
    }
    /^[A-Za-z_][A-Za-z0-9_]*$/.test(d.name) || n.push(`变量名 "${d.name}" 不是合法的 C 标识符，已清洗为 "${J(d.name)}"`);
    const y = J(d.name, "var"), h = d.type === "float" || d.type === "double", I = {
      name: y,
      srcType: d.type,
      type: ut[d.type],
      init: h ? Q(d.initialValue) : String(Math.trunc(d.initialValue)),
      isFloat: h,
      step: d.step,
      min: d.min,
      max: d.max
    };
    a.set(y, I), o.set(d.id, I);
  }
  const l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set(), u = [], m = /* @__PURE__ */ new Map();
  for (const d of i.chartBuffers ?? []) {
    if (!d.name) {
      n.push("存在未命名数据源缓冲区，已跳过");
      continue;
    }
    const y = J(d.name, "buf");
    if ([...m.values()].some((j) => j.name === y)) {
      n.push(`缓冲区名 "${d.name}" 与其它缓冲区重名，已跳过`);
      continue;
    }
    const h = Math.max(2, Math.trunc(d.dataLen)), I = `${y.toUpperCase()}_LEN`;
    m.set(d.id, { name: y, lenMacro: I, len: h });
    const N = `fill_${y}`, K = (r.get(N) ?? "").trim() !== "";
    u.push(
      `#define ${I} ${h}`,
      `static float ${y}[${I}];`,
      `static uint8_t ${y}_filled = 0;`,
      `static void ${y}_fill(void)`,
      "{",
      H(N, r, "    "),
      ...d.sample !== "none" && !K ? [`    for (uint16_t i = 0; i < ${I}; ++i) { ${lt(y, h, d.sample)} }`] : [],
      "}"
    );
  }
  const $ = [], g = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map();
  {
    let d = 0, y = 0;
    const h = (I) => {
      const N = m.get(I);
      return N ? (w.has(I) || w.set(I, `        if (!${N.name}_filled) { ${N.name}_filled = 1; ${N.name}_fill(); }`), w.get(I)) : "";
    };
    for (const I of i.pages)
      for (const N of I.items) {
        if (N.kind !== "chart") continue;
        const K = N.sources.filter((T) => m.has(T.bufferId));
        if (N.sources.length && !K.length) {
          n.push(`页面 ${I.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);
          continue;
        }
        if (!K.length) {
          n.push(`页面 ${I.name} 的图表条目未绑定数据源，已跳过`);
          continue;
        }
        const j = Math.max(4, Math.trunc(N.height)), Z = [];
        for (const T of K) {
          const L = m.get(T.bufferId), _ = `chart${d++}`;
          $.push(
            `static float ${_}_dis[${L.lenMacro}];`,
            `static u8g2_chart_t ${_};`
          ), Z.push({ name: _, s: T, b: L });
        }
        if (Z.length === 1) {
          const { name: T, s: L, b: _ } = Z[0];
          $.push(`static uint8_t ${T}_inited = 0;`), g.set(N.id, [
            `    if (!${T}_inited) {`,
            `        ${T}_inited = 1;`,
            `        u8g2_chart_init(&${T}, ${_.name}, ${T}_dis, ${_.lenMacro});`,
            h(L.bufferId),
            "    }"
          ]);
          const M = L.chartKind === "point" ? "Point" : L.chartKind === "bar" ? "Bar" : "Line", ue = L.min !== void 0 && L.max !== void 0 ? `${Q(L.max)}, ${Q(L.min)}` : "0, 0";
          v.set(N.id, `    u8g2_MenuDrawItem${M}Chart(&${T}, ${j}, ${ue});`);
        } else {
          const T = `chart_layers_${y++}`;
          $.push(
            `static u8g2_menu_drawChart_t ${T}[${Z.length}];`,
            `static uint8_t ${T}_inited = 0;`
          );
          const L = [
            `    if (!${T}_inited) {`,
            `        ${T}_inited = 1;`
          ];
          Z.forEach(({ name: _, s: M, b: ue }, le) => {
            L.push(`        u8g2_chart_init(&${_}, ${ue.name}, ${_}_dis, ${ue.lenMacro});`), L.push(h(M.bufferId));
            const Ue = M.chartKind === "point" ? "u8g2_drawPointChart" : M.chartKind === "bar" ? "u8g2_drawBarChart" : "u8g2_drawLineChart", Se = M.min !== void 0 && M.max !== void 0 ? `${Q(M.max)}, ${Q(M.min)}` : "0, 0";
            L.push(`        ${T}[${le}].drawChart = ${Ue};`), L.push(`        ${T}[${le}].chart = &${_};`), L.push(`        ${T}[${le}].max = ${Se.split(", ")[0]};`), L.push(`        ${T}[${le}].min = ${Se.split(", ")[1]};`);
          }), L.push("    }"), g.set(N.id, L), v.set(N.id, `    u8g2_MenuDrawItemChart(${T}, ${Z.length}, ${j});`);
        }
      }
  }
  const b = [], f = [], S = [], C = /* @__PURE__ */ new Set(), z = /* @__PURE__ */ new Map();
  let O = 0;
  for (const d of i.pages)
    for (const y of d.items) {
      if (y.bind.type === "button") {
        const h = J(y.bind.cbName, "btn_cb");
        l.has(h) || l.set(h, y.bind.buttonId);
      }
      switch (y.kind) {
        case "board":
          c.add(J(y.cbName, "board_cb"));
          break;
        case "xbm": {
          let h = J(y.name, "icon");
          for (; C.has(h); ) h = `${h}_2`;
          C.add(h), z.set(y.id, h);
          const I = y.bits.length, N = y.bits.map((K) => `0x${(K & 255).toString(16).padStart(2, "0")}`).join(", ");
          b.push(`static const uint8_t menu_xbm_${h}[${I}] = { ${N} };`);
          break;
        }
        case "textarea": {
          const h = O++;
          f.push(
            `static char ta${h}_text[] = "${re(y.content)}";`,
            `static u8g2_menu_textArea_t ta${h};`,
            `static uint8_t ta${h}_inited = 0;`
          ), S.push(
            `    if (!ta${h}_inited) {`,
            `        ta${h}_inited = 1;`,
            `        u8g2_textArea_init(&ta${h}, ta${h}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${h}, ${Math.max(0, Math.trunc(y.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
    }
  const G = (d, y) => {
    if (!d) return "";
    const h = `"${re(d)}"`;
    return y === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${h});` : `u8g2_MenuUTF8Printf(${h});`;
  }, A = (d, y, h) => {
    const I = `"${re(d)}"`;
    return y === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${I}, ${h});` : `u8g2_MenuUTF8Printf(${I}, ${h});`;
  };
  let V = 0;
  const k = (d, y) => {
    const h = [], I = `${y.name}`, N = (_) => {
      if (!_) return null;
      const M = o.get(_);
      return M || n.push(`页面 ${I} 的条目引用了已删除的变量，已按普通文本生成`), M ?? null;
    }, K = d.bind;
    let j = null, Z = null, T = "on", L = "off";
    switch (K.type) {
      case "value": {
        const _ = N(K.varId);
        if (_) {
          j = _;
          const M = _.isFloat ? `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Q(_.step)}, ${Q(_.min)}, ${Q(_.max)});` : `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;
          h.push(`    ${M}`);
        }
        break;
      }
      case "switch": {
        const _ = N(K.varId);
        _ && _.srcType !== "uint8" ? n.push(`开关附加值绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`) : _ && (Z = _, T = K.onText, L = K.offText, h.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(K.openValue)});`));
        break;
      }
      case "button": {
        const _ = J(K.cbName, "btn_cb");
        h.push(`    u8g2_MenuItem_button(${_}, ${Math.trunc(K.buttonId)});`);
        break;
      }
      case "submenu": {
        const _ = i.pages.findIndex((M) => M.id === K.targetPageId);
        !K.targetPageId || _ < 0 ? n.push(`页面 ${I} 的条目 "${d.label || "未命名"}" 附加值目标页面无效，已按普通文本生成`) : h.push(`    u8g2_MenuItem_menu_enter(${s[_]});`);
        break;
      }
      case "back":
        h.push("    u8g2_MenuItem_menu_back();");
        break;
    }
    switch (d.kind) {
      case "text": {
        if (j)
          h.push(`    ${A(d.text, d.scale, j.name)}`), /%[-+ #0]*[a-zA-Z]/.test(d.text) || n.push(`页面 ${I} 的数值附加值条目显示文本不含格式化占位符（如 %d）`);
        else if (Z)
          h.push(`    ${A(d.text, d.scale, `${Z.name} ? "${re(T)}" : "${re(L)}"`)}`), /%[-+ #0]*s/.test(d.text) || n.push("开关附加值条目的显示文本建议包含 %s 用于显示 on/off");
        else if (K.type === "none" && d.displayVarId) {
          const _ = N(d.displayVarId);
          if (_)
            h.push(`    ${A(d.text, d.scale, _.name)}`), /%[-+ #0]*[a-zA-Z]/.test(d.text) || n.push(`页面 ${I} 的显示条目文本不含格式化占位符（如 %d）`);
          else {
            n.push(`页面 ${I} 的显示条目引用了已删除的变量，已按普通文本生成`);
            const M = G(d.text, d.scale);
            M && h.push(`    ${M}`);
          }
        } else if (/%[-+ #0]*[a-zA-Z]/.test(d.text)) {
          n.push(`页面 ${I} 的文本条目含占位符但未绑定变量/显示变量，占位符已移除`);
          const _ = G(d.text.replace(/%[-+ #0]*[a-zA-Z]/g, ""), d.scale);
          _ && h.push(`    ${_}`);
        } else {
          const _ = G(d.text, d.scale);
          _ && h.push(`    ${_}`);
        }
        break;
      }
      case "slider":
      case "progress": {
        const _ = d.kind === "slider" ? "Slider" : "ProgressBar";
        if (j) {
          if (!dt.has(j.srcType)) {
            n.push(`滑块/进度条附加值的变量 "${j.name}" 须为整型（当前 ${j.srcType}），已按静态显示生成`), h.push(`    u8g2_MenuDrawItem${_}(${(d.position / 100).toFixed(2)}f);`);
            break;
          }
          h.push(`    u8g2_MenuDrawItem${_}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`);
        } else {
          const M = Math.min(100, Math.max(0, d.position));
          h.push(`    u8g2_MenuDrawItem${_}(${(M / 100).toFixed(2)}f);`);
        }
        break;
      }
      case "chart": {
        const _ = g.get(d.id), M = v.get(d.id);
        if (!_ || !M) break;
        h.push(..._), h.push(M);
        break;
      }
      case "xbm":
        h.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(d.w)}, ${Math.trunc(d.h)}, menu_xbm_${z.get(d.id) ?? J(d.name, "icon")});`);
        break;
      case "textarea": {
        const _ = V++;
        h.push(...S[_].split(`
`));
        const M = d.bindScroll ? "u8g2_MenuDrawTextArea_bind" : "u8g2_MenuDrawTextArea";
        h.push(`    ${M}(&ta${_}, ${Math.max(10, Math.trunc(d.height))});`);
        break;
      }
      case "board": {
        const _ = J(d.cbName, "board_cb");
        h.push(`    u8g2_MenuDrawItemBoard(${_}, ${Math.max(1, Math.trunc(d.w))}, ${Math.max(1, Math.trunc(d.h))});`);
        break;
      }
    }
    return h;
  }, p = [];
  p.push("/**"), p.push(` * 由 u8g2-menu-editor 自动生成，工程: ${i.name}`), p.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), p.push(" *"), p.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："), p.push(` *   u8g2_SetFont(&u8g2, ${e ? "menu_font" : i.font});`), s.forEach((d, y) => p.push(` *   void ${d}(void);   /* 页面: ${i.pages[y].name} */`));
  for (const d of a.values()) p.push(` *   extern ${d.type} ${d.name};`);
  for (const [d] of l) p.push(` *   void ${d}(u8g2_menu_t *menu, uint8_t ID);`);
  for (const d of c) p.push(` *   void ${d}(u8g2_t *u8g2);`);
  p.push(" */"), p.push('#include "u8g2_menu.h"'), (i.chartBuffers ?? []).some((d) => d.sample === "sine") && p.push("#include <math.h>"), p.push(""), p.push(H("includes", r, "")), p.push(""), s.forEach((d) => p.push(`void ${d}(void);`)), p.push(""), p.push("/* ======================== 变量定义 ======================== */"), p.push(H("variables", r, ""));
  for (const d of a.values()) p.push(`${d.type} ${d.name} = ${d.init};`);
  if (p.push(""), e) {
    p.push("/* ======================== 字体（现场取模） ======================== */"), p.push("/* 仅包含工程文本用到的字形（含 ASCII 95 个 + 额外字符），"), p.push(" * main.c 里 u8g2_SetFont(&u8g2, menu_font) 即可使用；"), p.push(' * 若运行时输出超出此字符集的中文，请在编辑器"额外包含字符"里补充后重新生成。 */');
    const d = [];
    for (let y = 0; y < e.length; y += 16)
      d.push("  " + [...e.slice(y, y + 16)].map((h) => `0x${h.toString(16).padStart(2, "0")}`).join(", ") + ",");
    p.push(`const uint8_t menu_font[${e.length}] U8G2_FONT_SECTION("menu_font") = {`), p.push(...d), p.push("};"), p.push("");
  }
  if ((u.length || $.length || f.length || b.length) && (p.push("/* ======================== 页面资源 ======================== */"), p.push(...u, ...$, ...f, ...b), p.push("")), l.size || c.size) {
    p.push("/* ======================== 回调函数 ======================== */"), p.push(H("callbacks", r, ""));
    for (const [d] of l)
      p.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID)`), p.push("{"), p.push(H(`cb_${d}`, r, "    ")), p.push("}"), p.push("");
    for (const d of c)
      p.push(`void ${d}(u8g2_t *u8g2)`), p.push("{"), p.push(H(`cb_${d}`, r, "    ")), p.push("}"), p.push("");
  }
  const U = (i.weakHooks ?? []).map((d) => ie.find((y) => y.fn === d)).filter((d) => !!d);
  if (U.length || r.has("weak") || ie.some((d) => (r.get(`weak_${d.fn}`) ?? "").trim())) {
    p.push("/* ==================== 弱定义函数重写 ==================== */"), p.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"), p.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");
    const y = ie.filter((h) => {
      var I;
      return !((I = i.weakHooks) != null && I.includes(h.fn)) && (r.get(`weak_${h.fn}`) ?? "").trim();
    }).map((h) => [
      `#if 0   /* 已取消勾选 ${h.fn}，手写内容保留于此；重新勾选后恢复编译 */`,
      `${h.decl}`,
      "{",
      H(`weak_${h.fn}`, r, "    "),
      "}",
      "#endif"
    ].join(`
`)).join(`
`);
    p.push(y ? `${H("weak", r, "").replace(/\n$/, "")}
${y}
` : H("weak", r, "")), p.push("");
    for (const h of U) {
      p.push(`/* ${h.label}: ${h.desc} */`), p.push(`${h.decl}`), p.push("{"), p.push(H(`weak_${h.fn}`, r, "    "));
      const I = h.bodyArgs.split(`
`).map((N) => `    ${N}`);
      h.retNote && I.push(`    ${h.retNote}`), p.push(...I), p.push("}"), p.push("");
    }
  }
  return p.push("/* ======================== 页面函数 ======================== */"), p.push(""), i.pages.forEach((d, y) => {
    p.push(`/* 页面: ${d.name} */`), p.push(`void ${s[y]}(void)`), p.push("{"), p.push(H(`page_${s[y]}_pre`, r, "    "));
    for (const h of d.items) p.push(...k(h, d));
    p.push("}"), p.push("");
  }), { c: `${p.join(`
`).replace(/\n{3,}/g, `


`)}
`, warnings: n };
}
function mt(i) {
  return {
    raw: i.slice(0, 23),
    glyphCnt: i[0],
    startUpperA: i[17] << 8 | i[18],
    startLowerA: i[19] << 8 | i[20],
    startUnicode: i[21] << 8 | i[22]
  };
}
function Be(i, t, e) {
  const n = [], r = [], s = [...t].sort((g, v) => g - v);
  for (const g of s) {
    const v = e(g);
    !v || !v.length || (g <= 255 ? n.push({ encoding: g, entry: v }) : r.push({ encoding: g, entry: v }));
  }
  if (!n.length && !r.length) return null;
  const a = n.length + r.length;
  let o = 0;
  for (const g of n) o += g.entry.length;
  o += 2;
  let l = 4;
  for (const g of r) l += g.entry.length;
  l += 2;
  const c = mt(i), u = new Uint8Array(23 + o + l);
  u.set(c.raw, 0), u[0] = a, u[17] = 0, u[18] = 0, u[19] = 0, u[20] = 0, u[21] = 0, u[22] = 0;
  let m = 23;
  for (const g of n) {
    if (g.encoding === 65) {
      const v = m - 23;
      u[17] = v >> 8 & 255, u[18] = v & 255;
    }
    if (g.encoding === 97) {
      const v = m - 23;
      u[19] = v >> 8 & 255, u[20] = v & 255;
    }
    u.set(g.entry, m), m += g.entry.length;
  }
  u[m] = 0, u[m + 1] = 0, m += 2;
  const $ = m - 23;
  u[21] = $ >> 8 & 255, u[22] = $ & 255, u[m] = 0, u[m + 1] = 4, u[m + 2] = 255, u[m + 3] = 255, m += 4;
  for (const g of r)
    u.set(g.entry, m), m += g.entry.length;
  return u[m] = 0, u[m + 1] = 0, u;
}
function pt(i) {
  return [...i].map((t) => t.codePointAt(0)).filter((t) => Number.isFinite(t));
}
function ft() {
  const i = [];
  for (let t = 32; t <= 126; t++) i.push(t);
  return i;
}
function oe(i, t) {
  const e = new Set(ft()), n = (r) => {
    for (const s of pt(r)) e.add(s);
  };
  for (const r of i.pages)
    for (const s of r.items)
      s.kind === "text" && n(s.text), s.kind === "textarea" && n(s.content), s.bind.type === "switch" && (n(s.bind.onText), n(s.bind.offText));
  return n(t), e.delete(10), e.delete(13), e;
}
function De(i) {
  let t = 0, e = 0;
  for (const n of i) n <= 126 ? t++ : e++;
  return { total: i.size, ascii: t, cjk: e };
}
var F = /* @__PURE__ */ ((i) => (i[i.None = 0] = "None", i[i.Up = 1] = "Up", i[i.Down = 2] = "Down", i[i.Enter = 3] = "Enter", i[i.Return = 4] = "Return", i[i.Add = 5] = "Add", i[i.Sub = 6] = "Sub", i))(F || {});
const ht = 8192 / 8;
function bt(i) {
  return new Promise((t, e) => {
    const n = document.createElement("script");
    n.src = i, n.onload = () => t(), n.onerror = () => e(new Error(`预览引擎脚本加载失败: ${i}`)), document.head.appendChild(n);
  });
}
class gt {
  constructor(t, e = {}) {
    this.mod = null, this.img = null, this.raf = 0, this.lastT = 0, this.running = !1, this.fontIndexCache = /* @__PURE__ */ new Map(), this.structSig = "", this.fontSig = null, this.lastKnownPage = 0, this.canvas = document.createElement("canvas"), this.canvas.width = 128, this.canvas.height = 64, this.canvas.className = "ume-preview-canvas", t.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.events = e;
  }
  /** 加载 WASM 引擎（幂等） */
  async load(t) {
    if (this.mod) return;
    const e = window;
    e.U8G2MenuPreview || await bt(t);
    const n = e.U8G2MenuPreview;
    if (!n) throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");
    this.mod = await n({
      locateFile: (s) => t.replace(/[^/\\]*$/, "") + s
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const r = this.mod._em_font_count_export();
    for (let s = 0; s < r; s++) {
      const a = this.mod._em_font_name(s);
      this.fontIndexCache.set(this.mod.UTF8ToString(a), s);
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
    return JSON.stringify({
      bufs: (t.chartBuffers ?? []).map((e) => `${e.name}|${e.dataLen}|${e.sample}`),
      pages: t.pages.map((e) => ({
        n: e.items.length,
        k: e.items.map((n) => n.kind).join(","),
        res: e.items.map((n) => n.kind === "chart" ? (n.sources ?? []).map((r) => `${r.bufferId}|${r.chartKind}|${r.min ?? "a"}|${r.max ?? "a"}`).join(">") : n.kind === "xbm" ? `${n.w}x${n.h}` : n.kind === "textarea" ? Math.ceil(n.content.length / 64) : "").join(",")
      }))
    });
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(t) {
    const e = this.mod;
    if (!e) return;
    const n = this.signature(t);
    n !== this.structSig && (e.ccall("em_reset_dynamic", null, [], []), this.structSig = n);
    const r = (u) => Math.trunc(Number.isFinite(u) ? u : 0), s = { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }, a = { text: 0, slider: 1, progress: 2, chart: 3, xbm: 4, textarea: 5, board: 6 }, o = { none: 0, value: 1, switch: 2, button: 3, submenu: 4, back: 5 }, l = { sine: 0, ramp: 1, noise: 2, none: 3 }, c = (u) => u ? (t.variables ?? []).findIndex((m) => m.id === u) : -1;
    if ((t.variables ?? []).forEach((u, m) => {
      e.ccall(
        "em_var_define",
        null,
        ["number", "number", "number", "number", "number", "number"],
        [m, s[u.type], r(u.initialValue), r(u.step), r(u.min), r(u.max)]
      );
    }), (t.chartBuffers ?? []).forEach((u, m) => {
      e.ccall(
        "em_buf_define",
        null,
        ["number", "number", "number"],
        [m, r(u.dataLen), l[u.sample]]
      );
    }), t.pages.forEach((u, m) => {
      e.ccall("em_page_begin", null, ["number"], [m]), u.items.forEach(($, g) => {
        const v = () => {
          const w = $.bind;
          if (w.type === "none") return;
          const b = w.type === "value" || w.type === "switch", f = b ? (t.variables ?? []).find((S) => S.id === w.varId) : void 0;
          e.ccall(
            "em_page_bind",
            null,
            ["number", "number", "number", "number", "number", "number", "number", "number"],
            [
              m,
              g,
              o[w.type],
              b && f ? s[f.type] : 0,
              w.type === "switch" ? r(w.openValue) : 0,
              w.type === "button" ? r(w.buttonId) : 0,
              w.type === "submenu" ? t.pages.findIndex((S) => S.id === w.targetPageId) : -1,
              b && f ? c(f.id) : -1
            ]
          );
        };
        switch ($.kind) {
          case "text":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [
                m,
                g,
                a.text,
                $.scale,
                0,
                0,
                0,
                $.displayVarId ? c($.displayVarId) : -1,
                -1
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [m, g, $.text]), v();
            break;
          case "slider":
          case "progress":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, g, a[$.kind], 1, 0, 0, 0, -1, -1]
            ), v();
            break;
          case "chart":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, g, a.chart, 1, r($.height), 0, 0, -1, -1]
            );
            for (const w of $.sources ?? [])
              e.ccall(
                "em_item_chart_add",
                null,
                ["number", "number", "number", "number", "number", "number", "number"],
                [
                  m,
                  g,
                  (t.chartBuffers ?? []).findIndex((b) => b.id === w.bufferId),
                  { line: 0, point: 1, bar: 2 }[w.chartKind],
                  w.min !== void 0 && w.max !== void 0 ? 1 : 0,
                  w.max ?? 0,
                  w.min ?? 0
                ]
              );
            v();
            break;
          case "xbm":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, g, a.xbm, 1, 0, r($.w), r($.h), -1, -1]
            );
            {
              const w = e._em_scratch($.bits.length);
              w && (e.HEAPU8.set(new Uint8Array($.bits), w), e._em_item_bits(m, g, w, $.bits.length));
            }
            v();
            break;
          case "textarea":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, g, a.textarea, 1, r($.height), 0, 0, -1, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [m, g, $.content]), v();
            break;
          case "board":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, g, a.board, 1, 0, r($.w), r($.h), -1, -1]
            ), v();
            break;
        }
      }), e.ccall("em_page_end", null, ["number", "number"], [m, u.items.length]);
    }), e.ccall("em_pages_commit", null, ["number"], [t.pages.length]), e.ccall(
      "em_set_style",
      null,
      ["number", "number", "number", "number", "number", "number", "number"],
      [
        this.fontIndex(t.font),
        { default: 0, rotundity: 1, square: 2 }[t.selector],
        r(t.selectorLeftMargin),
        r(t.selectorTopMargin),
        r(t.selectorLineSpacing),
        t.marqueeSpeed,
        t.marqueeHeaderLen
      ]
    ), t.fontSubset) {
      const u = oe(t, t.fontExtra), m = t.font + "|" + [...u].sort(($, g) => $ - g).join(",");
      if (m !== this.fontSig) {
        this.fontSig = m;
        const $ = this.fontIndex(t.font), g = (b) => {
          const f = this.mod, S = f.ccall("em_scratch", "number", ["number"], [64]), C = f.ccall(
            "em_font_glyph",
            "number",
            ["number", "number", "number", "number"],
            [$, b, 64, S]
          );
          return C ? f.HEAPU8.slice(S, S + C) : null;
        }, v = this.getFontBytes($), w = v ? Be(v, u, g) : null;
        w && this.useCustomFont(w);
      }
    } else this.fontSig !== null && (this.fontSig = null);
  }
  start() {
    if (this.running) return;
    this.running = !0, this.lastT = performance.now();
    const t = (e) => {
      if (!this.running) return;
      const n = Math.min(100, Math.round(e - this.lastT));
      this.lastT = e, this.renderFrame(n), this.raf = requestAnimationFrame(t);
    };
    this.raf = requestAnimationFrame(t);
  }
  stop() {
    this.running = !1, cancelAnimationFrame(this.raf);
  }
  renderFrame(t) {
    var o, l;
    const e = this.mod;
    if (!e) return;
    const n = e._em_frame(t);
    if (!n) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const r = e.HEAPU8.subarray(n, n + ht), s = this.img.data;
    s.fill(255);
    for (let c = 0; c < 64; c++) {
      const u = (c >> 3) * 128, m = 1 << (c & 7);
      let $ = c * 128 * 4;
      for (let g = 0; g < 128; g++)
        r[u + g] & m && (s[$] = 17, s[$ + 1] = 24, s[$ + 2] = 39), $ += 4;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const a = e._em_get_current_page();
    a !== this.lastKnownPage && (this.lastKnownPage = a, (l = (o = this.events).onPageChanged) == null || l.call(o, a));
  }
  key(t) {
    var e;
    (e = this.mod) == null || e.ccall("em_key", null, ["number"], [t]);
  }
  /** 预览跳转到指定页（不经过子页面链路） */
  navTo(t) {
    var e;
    (e = this.mod) == null || e.ccall("em_nav", null, ["number"], [t]);
  }
  /** 读取内置字体原始字节（现场取模的源数据） */
  getFontBytes(t) {
    const e = this.mod;
    if (!e) return null;
    const n = e.ccall("em_font_data", "number", ["number"], [t]), r = e.ccall("em_font_data_len", "number", ["number"], [t]);
    return !n || !r ? null : e.HEAPU8.slice(n, n + r);
  }
  /** 字形拉取器：从 WASM 真库逐字获取原始条目（与渲染同一路径） */
  glyphFetcher(t) {
    const e = this.mod;
    return e ? (n) => {
      const r = e.ccall("em_scratch", "number", ["number"], [64]), s = e.ccall(
        "em_font_glyph",
        "number",
        ["number", "number", "number", "number"],
        [t, n, 64, r]
      );
      return s ? e.HEAPU8.slice(r, r + s) : null;
    } : null;
  }
  /** 加载自定义（子集）字体并切换；超出槽位容量返回 false */
  useCustomFont(t) {
    const e = this.mod;
    if (!e) return !1;
    const n = e.ccall("em_custom_font_ptr", "number", [], []), r = e.ccall("em_custom_font_max", "number", [], []);
    return t.length > r ? !1 : (e.HEAPU8.set(t, n), e.ccall("em_set_custom_font", null, ["number"], [t.length]), !0);
  }
  /** 读取值池槽位的实时值（绑定变量的条目：槽位 = 变量在池中的下标） */
  getInt(t) {
    var e;
    return ((e = this.mod) == null ? void 0 : e._em_get_ipool(t)) ?? 0;
  }
  getSwitch(t) {
    var e;
    return ((e = this.mod) == null ? void 0 : e._em_get_upool(t)) ?? 0;
  }
  destroy() {
    this.stop(), this.canvas.remove(), this.mod = null;
  }
}
const vt = Object.keys(fe);
function xt(i, t, e, n) {
  const r = i.getState(), s = e.label || "text" in e && e.text || fe[e.kind], a = e.bind.type !== "none" ? ` · ${pe[e.bind.type]}` : "", o = (l) => (c) => {
    c.stopPropagation(), i.getState().moveItem(t.id, e.id, l);
  };
  return x`<div class="ume-item-row ${n ? "selected" : ""}"
    @click=${() => i.getState().select(t.id, e.id)}>
    <span class="ume-item-icon">${Ye[e.kind]}</span>
    <span class="ume-item-name" title=${s + a}>${s}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(l) => {
    l.stopPropagation(), r.duplicateItem(t.id, e.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(l) => {
    l.stopPropagation(), r.removeItem(t.id, e.id);
  }}>✕</button>
  </div>`;
}
function $t(i, t) {
  const e = i.getState();
  return x`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(n) => {
    const r = n.target.value;
    r && e.addItem(r, t.id), n.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${vt.map((n) => x`<option value=${n}>${fe[n]}</option>`)}
  </select>`;
}
function _t(i, t) {
  const { project: e, selection: n } = t.getState(), r = (s) => {
    const a = t.getState(), o = n.pageId === s.id;
    return x`<div class="ume-page">
      <div class="ume-page-head ${o ? "selected" : ""}"
        @click=${() => t.getState().select(s.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(l) => {
      l.stopPropagation(), a.movePage(s.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(l) => {
      l.stopPropagation(), a.movePage(s.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(l) => {
      if (l.stopPropagation(), e.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${s.name}"？`) && a.removePage(s.id);
    }}>✕</button>
      </div>
      ${o ? x`<div class="ume-page-items">
        ${s.items.length ? s.items.map((l) => xt(t, s, l, n.itemId === l.id)) : x`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${$t(t, s)}</div>
      </div>` : D}
    </div>`;
  };
  ae(x`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => yt(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(r)}
  `, i);
}
function yt(i) {
  const t = prompt("页面名称:", `页面${i.getState().project.pages.length + 1}`);
  t !== null && i.getState().addPage(t || void 0);
}
function q(i, t, e, n = "") {
  return x`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${t ?? ""} placeholder=${n}
      @change=${(r) => e(r.target.value)} />
  </div>`;
}
function B(i, t, e, n = 1) {
  return x`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(t)} step=${String(n)}
      @change=${(r) => {
    const s = parseFloat(r.target.value);
    e(Number.isFinite(s) ? s : 0);
  }} />
  </div>`;
}
function Y(i, t, e, n) {
  return x`<div class="ume-field">
    <label>${i}</label>
    <select @change=${(r) => n(r.target.value)}>
      ${e.map((r) => x`<option value=${r.value} ?selected=${r.value === t}>${r.label}</option>`)}
    </select>
  </div>`;
}
function ke(i, t, e) {
  return x`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${(n) => e(n.target.checked)} />
    <span>${i}</span>
  </div>`;
}
function wt(i, t, e, n = !1) {
  return x`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${n ? "font-family:Consolas,monospace" : ""}
      @change=${(r) => e(r.target.value)}>${t ?? ""}</textarea>
  </div>`;
}
function Ie(i, t, e = "text/plain") {
  const n = new Blob([t], { type: `${e};charset=utf-8` }), r = document.createElement("a");
  r.href = URL.createObjectURL(n), r.download = i, r.click(), setTimeout(() => URL.revokeObjectURL(r.href), 5e3);
}
let xe = null;
const Ke = {
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
function $e(i, t, e, n) {
  const r = [
    { value: "", label: "（未绑定）" },
    ...e.map((a) => ({ value: a.id, label: `${a.name} : ${Ke[a.type] ?? a.type}` }))
  ], s = t ? e.some((a) => a.id === t) : !1;
  return x`
    ${Y(i, t ?? "", r, (a) => n(a || null))}
    ${t && !s ? x`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>` : D}
    ${e.length === 0 ? x`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>` : D}
  `;
}
function _e(i, t) {
  return x`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
    const e = i.getState().addVariable();
    t(e);
  }}>＋ 新建变量并绑定</button>
  </div>`;
}
function ye(i) {
  return i ? x`<div class="ume-hint">
    ${i.name} : ${Ke[i.type] ?? i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>` : x`${D}`;
}
function kt(i, t, e) {
  const { project: n, selection: r } = t.getState(), s = n.pages.find((g) => g.id === r.pageId) ?? null, a = (s == null ? void 0 : s.items.find((g) => g.id === r.itemId)) ?? null, o = n.variables ?? [], l = n.chartBuffers ?? [], c = (g, v) => t.getState().updateItem(s.id, a.id, g, v), u = (g) => c({ bind: g });
  let m = x`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, $ = "";
  if (s && !a)
    $ = "页面属性", m = x`
      ${q("名称", s.name, (g) => t.getState().updatePage(s.id, { name: g }))}
      ${q("C 函数名", s.fnName, (g) => t.getState().updatePage(s.id, { fnName: g }), "留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;
  else if (s && a) {
    (a.bind.type === "value" || a.bind.type === "switch") && a.bind.varId && (xe = a.bind.varId), $ = `${fe[a.kind]}${a.bind.type !== "none" ? ` + ${pe[a.bind.type]}` : ""}`;
    let g = x``;
    switch (a.kind) {
      case "text": {
        const b = a, f = o.find((S) => S.id === b.displayVarId);
        g = x`
          ${q("文本/格式", b.text, (S) => c({ text: S }, `text-${b.id}`))}
          ${Y("大小", String(b.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (S) => c({ scale: Number(S) }))}
          ${a.bind.type === "none" ? x`
            ${$e("显示变量", b.displayVarId, o, (S) => c({ displayVarId: S }))}
            ${f ? D : _e(t, (S) => c({ displayVarId: S.id }))}
            ${ye(f)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>` : D}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const b = a;
        g = x`
          ${a.bind.type === "none" ? x`
            ${B("静态位置(%)", b.position, (f) => c({ position: Math.min(100, Math.max(0, Math.trunc(f))) }))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>` : D}
        `;
        break;
      }
      case "chart": {
        const b = a, f = (C) => c({ sources: C }), S = (C, z) => {
          const O = l.find((A) => A.id === C.bufferId), G = C.min === void 0 || C.max === void 0;
          return x`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(O == null ? void 0 : O.name) ?? "(无效)"}</span>
              <span class="ume-var-meta">${{ line: "折线", point: "散点", bar: "柱状" }[C.chartKind] ?? C.chartKind}${G ? " · 自动量程" : ` · ${C.min}~${C.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${() => f(b.sources.filter((A, V) => V !== z))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${Y("缓冲区", C.bufferId, l.map((A) => ({ value: A.id, label: `${A.name} (${A.dataLen}点)` })), (A) => f(b.sources.map((V, k) => k === z ? { ...V, bufferId: A } : V)))}
              ${Y("绘制", C.chartKind, [
            { value: "line", label: "折线" },
            { value: "point", label: "散点" },
            { value: "bar", label: "柱状" }
          ], (A) => f(b.sources.map((V, k) => k === z ? { ...V, chartKind: A } : V)))}
              ${ke("自动量程", G, (A) => f(b.sources.map((V, k) => k === z ? { ...V, min: A ? void 0 : 0, max: A ? void 0 : 100 } : V)))}
              ${G ? D : x`
                ${B("量程上限", C.max ?? 100, (A) => f(b.sources.map((V, k) => k === z ? { ...V, max: A } : V)), "any")}
                ${B("量程下限", C.min ?? 0, (A) => f(b.sources.map((V, k) => k === z ? { ...V, min: A } : V)), "any")}`}
            </div>
          </div>`;
        };
        g = x`
          ${B("高度(px)", b.height, (C) => c({ height: Math.max(4, Math.trunc(C)) }))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(b.sources ?? []).map(S)}
              ${(b.sources ?? []).length === 0 ? x`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>` : D}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(b.sources ?? []).length >= 4}
                @click=${() => {
          if (!l.length) {
            const C = t.getState().addChartBuffer();
            f([...b.sources ?? [], { bufferId: C.id, chartKind: "line" }]);
            return;
          }
          f([...b.sources ?? [], { bufferId: l[0].id, chartKind: "line" }]);
        }}>＋ 添加数据源${(b.sources ?? []).length > 0 ? "（叠加）" : ""}</button>
              ${l.length ? D : x`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;
        break;
      }
      case "xbm": {
        const b = a;
        g = x`
          ${q("数组名", b.name, (f) => c({ name: f }))}
          ${B("宽(px)", b.w, (f) => c({ w: Math.min(128, Math.max(1, Math.trunc(f))) }))}
          ${B("高(px)", b.h, (f) => c({ h: Math.min(64, Math.max(1, Math.trunc(f))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => e.openXbmEditor(s.id, b.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${b.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const b = a;
        g = x`
          ${wt("文本内容", b.content, (f) => c({ content: f }))}
          ${B("高度(px)", b.height, (f) => c({ height: Math.max(10, Math.trunc(f)) }))}
          ${B("行间距", b.lineSpacing, (f) => c({ lineSpacing: Math.max(0, Math.trunc(f)) }))}
          ${ke("上下键滚动 (bind)", b.bindScroll, (f) => c({ bindScroll: f }))}
        `;
        break;
      }
      case "board": {
        const b = a;
        g = x`
          ${B("宽(px)", b.w, (f) => c({ w: Math.max(1, Math.trunc(f)) }))}
          ${B("高(px)", b.h, (f) => c({ h: Math.max(1, Math.trunc(f)) }))}
          ${q("回调函数名", b.cbName, (f) => c({ cbName: f }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
    const v = a.bind;
    let w = x``;
    switch (v.type) {
      case "none":
        w = x`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;
        break;
      case "value": {
        const b = o.find((f) => f.id === v.varId);
        w = x`
          ${$e("变量", v.varId, o, (f) => u({ type: "value", varId: f }))}
          ${b ? D : _e(t, (f) => u({ type: "value", varId: f.id }))}
          ${ye(b)}
          ${a.kind === "text" ? x`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>` : D}
        `;
        break;
      }
      case "switch": {
        const b = o.filter((f) => f.type === "uint8").find((f) => f.id === v.varId) ?? o.find((f) => f.id === v.varId);
        w = x`
          ${$e("变量 (uint8)", v.varId, o.filter((f) => f.type === "uint8"), (f) => u({ type: "switch", varId: f, openValue: v.openValue, onText: v.onText, offText: v.offText }))}
          ${b ? D : _e(t, (f) => u({ type: "switch", varId: f.id, openValue: v.openValue, onText: v.onText, offText: v.offText }))}
          ${ye(b)}
          ${B("openValue", v.openValue, (f) => u({ type: "switch", varId: v.varId, openValue: Math.max(0, Math.trunc(f)), onText: v.onText, offText: v.offText }))}
          ${q('"开"文本', v.onText, (f) => u({ type: "switch", varId: v.varId, openValue: v.openValue, onText: f, offText: v.offText }))}
          ${q('"关"文本', v.offText, (f) => u({ type: "switch", varId: v.varId, openValue: v.openValue, onText: v.onText, offText: f }))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case "button":
        w = x`
          ${q("回调函数名", v.cbName, (b) => u({ type: "button", cbName: b, buttonId: v.buttonId }))}
          ${B("ID", v.buttonId, (b) => u({ type: "button", cbName: v.cbName, buttonId: Math.trunc(b) }))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;
        break;
      case "submenu":
        w = x`
          ${Y("目标页面", v.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...n.pages.filter((b) => b.id !== s.id).map((b) => ({ value: b.id, label: b.name }))
        ], (b) => u({ type: "submenu", targetPageId: b || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;
        break;
      case "back":
        w = x`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;
        break;
    }
    m = x`
      <div class="ume-panel-title">绘制</div>
      ${g}
      <div class="ume-panel-title">附加值</div>
      ${Y("类型", v.type, Object.keys(pe).map((b) => ({ value: b, label: pe[b] })), (b) => {
      const f = a.bind;
      u(b === "value" ? { type: "value", varId: f.type === "value" || f.type === "switch" ? f.varId : xe } : b === "switch" ? { type: "switch", varId: f.type === "value" || f.type === "switch" ? f.varId : xe, openValue: 1, onText: "on", offText: "off" } : b === "button" ? { type: "button", cbName: "btn_action_cb", buttonId: 1 } : b === "submenu" ? { type: "submenu", targetPageId: f.type === "submenu" ? f.targetPageId : null } : { type: "none" });
    })}
      ${w}
    `;
  }
  ae(x`
    ${$ ? x`<div class="ume-panel-title"><span class="ume-kind-badge">${$}</span></div>` : D}
    ${m}
  `, i);
}
let de = null, we = null;
const It = [
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
function St(i, t) {
  const e = t.variables ?? [], n = (s) => {
    de = de === s ? null : s;
  }, r = (s) => {
    const a = de === s.id, o = (m, $) => i.getState().updateVariable(s.id, m, $), l = s.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name), c = e.filter((m) => m.name === s.name).length > 1, u = Et(t, s.id);
    return x`<div class="ume-var-item ${a ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => n(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name || "(未命名)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${u ? ` · ${u} 处引用` : ""}</span>
        <button class="ume-mini" title="删除变量" @click=${(m) => {
      m.stopPropagation();
      const $ = i.getState().removeVariable(s.id);
      $ > 0 && alert(`该变量被 ${$} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`);
    }}>✕</button>
      </div>
      ${a ? x`<div class="ume-var-edit">
        ${q("变量名", s.name, (m) => o({ name: m.trim() }, `vn-${s.id}`))}
        ${l ? x`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>` : D}
        ${c ? x`<div class="ume-warn">变量名重复，生成时以第一个为准</div>` : D}
        ${Y("类型", s.type, It, (m) => o({ type: m }))}
        ${B("初始值", s.initialValue, (m) => o({ initialValue: m }, `vi-${s.id}`), "any")}
        ${B("最小值", s.min, (m) => o({ min: m }, `vmin-${s.id}`), "any")}
        ${B("最大值", s.max, (m) => o({ max: m }, `vmax-${s.id}`), "any")}
        ${B("步长", s.step, (m) => o({ step: m }, `vs-${s.id}`), "any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>` : D}
    </div>`;
  };
  return x`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${() => {
    de = i.getState().addVariable().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(r) : x`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `;
}
function Et(i, t) {
  let e = 0;
  for (const n of i.pages)
    for (const r of n.items)
      "varId" in r && r.varId === t && e++;
  return e;
}
function Mt(i, t) {
  const e = t.chartBuffers ?? [], n = (s) => {
    let a = 0;
    for (const o of t.pages)
      for (const l of o.items)
        l.kind === "chart" && l.sources.some((c) => c.bufferId === s) && a++;
    return a;
  }, r = (s) => {
    const a = we === s.id, o = (u, m) => i.getState().updateChartBuffer(s.id, u, m), l = s.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name), c = n(s.id);
    return x`<div class="ume-var-item ${a ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => {
      we = a ? null : s.id;
    }}>
        <span class="ume-var-name" title=${s.name}>${s.name || "(未命名)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{ sine: "正弦", ramp: "斜坡", noise: "伪随机", none: "手动填充" }[s.sample]}${c ? ` · ${c} 处引用` : ""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${(u) => {
      u.stopPropagation();
      const m = i.getState().removeChartBuffer(s.id);
      m > 0 && alert(`该缓冲区被 ${m} 个图表条目的数据源引用，请先在条目里移除数据源再删除`);
    }}>✕</button>
      </div>
      ${a ? x`<div class="ume-var-edit">
        ${q("数组名", s.name, (u) => o({ name: u.trim() }, `bn-${s.id}`))}
        ${l ? x`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>` : D}
        ${B("点数", s.dataLen, (u) => o({ dataLen: Math.min(512, Math.max(2, Math.trunc(u))) }, `bl-${s.id}`))}
        ${Y("示例填充", s.sample, [
      { value: "sine", label: "正弦（演示）" },
      { value: "ramp", label: "斜坡（演示）" },
      { value: "noise", label: "伪随机（演示）" },
      { value: "none", label: "不填充（全部手写）" }
    ], (u) => o({ sample: u }))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>` : D}
    </div>`;
  };
  return x`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${() => {
    we = i.getState().addChartBuffer().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(r) : x`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `;
}
function Ct(i, t) {
  const { project: e } = t.getState();
  ae(x`
    ${St(t, e)}
    ${Mt(t, e)}
  `, i);
}
function Nt(i, t) {
  const { project: e } = t.getState(), n = (o, l) => t.getState().update((c) => {
    Object.assign(c, o);
  }, l), r = e.weakHooks ?? [], s = (o, l) => {
    t.getState().update((c) => {
      const u = c.weakHooks ?? [];
      c.weakHooks = l ? [.../* @__PURE__ */ new Set([...u, o])] : u.filter((m) => m !== o);
    });
  }, a = x`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${r.length}/${ie.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${ie.map((o) => x`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote ? "（返回 1 = 事件已处理 / 0 = 交给库）" : ""}`}>
              <input type="checkbox" ?checked=${r.includes(o.fn)}
                @change=${(l) => s(o.fn, l.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;
  ae(x`
    <div class="ume-panel-title">工程</div>
    ${q("工程名", e.name, (o) => n({ name: o }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width !== 128 || e.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${Y(
    "字体",
    e.font,
    Ge.map((o) => ({ value: o.id, label: o.label })),
    (o) => n({ font: o })
  )}
    ${ke("中文现场取模（仅包含用到的字形）", e.fontSubset, (o) => n({ fontSubset: o }))}
    ${e.fontSubset ? x`
      ${q("额外包含字符", e.fontExtra, (o) => n({ fontExtra: o }))}
      ${(() => {
    const o = De(oe(e, e.fontExtra));
    return x`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`;
  })()}` : D}
    ${Y("选择器", e.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (o) => n({ selector: o }))}
    ${B("左边距", e.selectorLeftMargin, (o) => n({ selectorLeftMargin: Math.max(0, Math.trunc(o)) }))}
    ${B("顶边距", e.selectorTopMargin, (o) => n({ selectorTopMargin: Math.max(0, Math.trunc(o)) }))}
    ${B("行间距", e.selectorLineSpacing, (o) => n({ selectorLineSpacing: Math.max(0, Math.trunc(o)) }))}
    ${B("跑马灯速度", e.marqueeSpeed, (o) => n({ marqueeSpeed: o }), 0.05)}
    ${B("跑马灯停留", e.marqueeHeaderLen, (o) => n({ marqueeHeaderLen: o }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `, i);
}
function Tt(i, t) {
  const e = (r) => {
    let s;
    const a = () => {
      s && (clearInterval(s), s = void 0);
    };
    return {
      down: (o) => {
        o.preventDefault(), t.key(r), a(), s = window.setInterval(() => t.key(r), 180);
      },
      up: a
    };
  }, n = (r, s, a) => {
    const o = e(r);
    return x`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`;
  };
  ae(x`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(r) => {
    const a = {
      ArrowUp: F.Up,
      ArrowDown: F.Down,
      Enter: F.Enter,
      Escape: F.Return,
      Backspace: F.Return,
      "+": F.Add,
      "-": F.Sub,
      "=": F.Add,
      _: F.Sub
    }[r.key];
    a !== void 0 && (r.preventDefault(), t.key(a));
  }}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${n(F.Up, "▲", "上 MENU_Key_Up")}
      ${n(F.Down, "▼", "下 MENU_Key_Down")}
      ${n(F.Enter, "OK", "确认 MENU_Key_Enter")}
      ${n(F.Return, "⌫", "返回 MENU_Key_Return")}
      ${n(F.Add, "＋", "加 MENU_Key_Add")}
      ${n(F.Sub, "－", "减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `, i);
}
let te = null;
function At(i, t) {
  te = t, i.querySelectorAll(":scope > .ume-modal-mask").forEach((e) => e.remove()), Vt(i);
}
function Vt(i) {
  if (!te) return;
  const t = document.createElement("div");
  t.className = "ume-modal-mask", t.addEventListener("click", (e) => {
    e.target === t && Ce(t);
  }), ae(x`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${() => Ce(t)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${te.warnings.length ? x`
          <div style="margin-bottom:8px">
            ${te.warnings.map((e) => x`<div class="ume-warn">⚠ ${e}</div>`)}
          </div>` : D}
        <div class="ume-code-view">${te.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${() => {
    navigator.clipboard.writeText(te.c).then(() => Pt(t, "已复制到剪贴板"));
  }}>复制</button>
        <button class="ume-btn primary" @click=${() => {
    Ie("menu_pages.c", te.c);
  }}>下载 menu_pages.c</button>
      </div>
    </div>
  `, t), i.appendChild(t);
}
function Ce(i) {
  i.remove();
}
function Pt(i, t) {
  const e = i.closest(".ume") ?? document.body;
  let n = e.querySelector(".ume-toast");
  n || (n = document.createElement("div"), n.className = "ume-toast", e.appendChild(n)), n.textContent = t, n.classList.add("show"), setTimeout(() => n.classList.remove("show"), 1600);
}
function Lt(i, t, e, n) {
  const s = t.getState().project.pages.find((k) => k.id === e), a = s == null ? void 0 : s.items.find((k) => k.id === n);
  if (!a || a.kind !== "xbm") return;
  const o = a;
  let l = o.w, c = o.h, u = [...o.bits];
  const m = () => Math.ceil(l / 8), $ = document.createElement("div");
  $.className = "ume-modal-mask", $.addEventListener("click", (k) => {
    k.target === $ && V();
  });
  const g = (k, p) => {
    const U = p * m() + (k >> 3);
    return U < u.length ? !!(u[U] >> (k & 7) & 1) : !1;
  }, v = (k, p, U) => {
    const ee = p * m() + (k >> 3);
    u[ee] = U ? u[ee] | 1 << (k & 7) : u[ee] & ~(1 << (k & 7));
  }, w = (k, p) => {
    const U = Math.ceil(l / 8), ee = Math.ceil(k / 8), d = new Array(ee * p).fill(0);
    for (let y = 0; y < Math.min(c, p); y++)
      for (let h = 0; h < Math.min(l, k); h++) {
        const I = y * U + (h >> 3);
        I < u.length && u[I] >> (h & 7) & 1 && (d[y * ee + (h >> 3)] |= 1 << (h & 7));
      }
    l = k, c = p, u = d;
  };
  let b = !1, f = !0;
  const S = (k, p) => (U) => {
    U.preventDefault(), b = !0, f = !g(k, p), v(k, p, f), O();
  }, C = (k, p) => () => {
    b && (v(k, p, f), O());
  }, z = () => {
    b = !1;
  }, O = () => {
    ae(A(), $);
  }, G = () => {
    const k = [];
    for (let p = 0; p < c; p++)
      for (let U = 0; U < l; U++)
        k.push(x`<button class="ume-xbm-cell ${g(U, p) ? "on" : ""}"
          data-x=${U} data-y=${p}
          @pointerdown=${S(U, p)}
          @pointerenter=${C(U, p)}></button>`);
    return k;
  }, A = () => x`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${c}</span></span>
        <button class="ume-mini" @click=${V}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${z}
        @pointerleave=${z}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${(k) => {
    w(Ne(+k.target.value, 1, 128), c), O();
  }} />
          <input type="number" style="width:64px" .value=${String(c)} min="1" max="64"
            @change=${(k) => {
    w(l, Ne(+k.target.value, 1, 64)), O();
  }} />
          <button class="ume-btn sm" @click=${() => {
    u = u.map(() => 0), O();
  }}>清空</button>
          <button class="ume-btn sm" @click=${() => {
    u = u.map((k) => ~k & 255), O();
  }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${G()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${V}>取消</button>
        <button class="ume-btn primary" @click=${() => {
    t.getState().updateItem(e, n, { w: l, h: c, bits: [...u] }), V();
  }}>应用</button>
      </div>
    </div>
  `;
  function V() {
    $.remove(), document.removeEventListener("pointerup", z);
  }
  document.addEventListener("pointerup", z), O(), i.appendChild($);
}
function Ne(i, t, e) {
  return Number.isFinite(i) ? Math.min(e, Math.max(t, Math.trunc(i))) : t;
}
const Bt = "prebuilt/u8g2-menu-preview.js";
class Ut {
  constructor(t, e = {}) {
    var c;
    if (this.store = Ae(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.container = t, this.opts = { persistKey: "default", ...e }, t.classList.add("ume"), !document.getElementById("ume-style")) {
      const u = document.createElement("style");
      u.id = "ume-style", u.textContent = Fe, document.head.appendChild(u);
    }
    const n = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, r = this.opts.data ?? n ?? void 0;
    if (r !== void 0)
      try {
        this.store.setState({ project: ve(r) });
      } catch (u) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", u);
      }
    const s = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null;
    s && (this.lastExport = { c: s }), t.innerHTML = `
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
    const a = (u) => t.querySelector(u);
    this.els = {
      left: a(".ume-left"),
      center: a(".ume-center"),
      right: a(".ume-right"),
      propEl: a('[data-role="prop"]'),
      resEl: a('[data-role="res"]'),
      setEl: a('[data-role="set"]'),
      toolbarUndo: a('[data-act="undo"]'),
      toolbarRedo: a('[data-act="redo"]')
    };
    const o = document.createElement("div");
    o.style.display = "flex", o.style.flexDirection = "column", o.style.alignItems = "center", o.style.gap = "10px", this.els.center.appendChild(o), this.preview = new gt(o, {
      onPageChanged: (u) => this.onPreviewPageChanged(u)
    });
    const l = document.createElement("div");
    this.els.center.appendChild(l), Tt(l, this.preview), this.preview.load(this.opts.wasmUrl ?? Bt).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((u) => {
      console.error(u);
      const m = document.createElement("div");
      m.className = "ume-warn", m.textContent = `预览引擎加载失败: ${u.message}。编辑功能不受影响。`, this.els.center.prepend(m);
    }), t.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const u = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      u !== null && this.store.getState().addPage(u || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), t.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      Ie(
        `${this.store.getState().project.name || "menu-project"}.json`,
        Ee(this.store.getState().project),
        "application/json"
      );
    }), t.querySelector('[data-act="import"]').addEventListener("click", () => {
      a('[data-role="file"]').click();
    }), a('[data-role="file"]').addEventListener("change", (u) => {
      var $;
      const m = ($ = u.target.files) == null ? void 0 : $[0];
      m && (m.text().then((g) => {
        try {
          const v = ve(g);
          this.store.getState().update((w) => {
            Object.assign(w, v);
          }), this.scheduleRender();
        } catch (v) {
          alert(`导入失败: ${v.message}`);
        }
      }), u.target.value = "");
    }), t.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate()), this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((c = this.store.getState().project.pages[0]) == null ? void 0 : c.id) ?? null, null), this.store.subscribe(() => {
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
    var n;
    const e = ve(t);
    this.store.getState().update((r) => {
      Object.assign(r, e);
    }), this.store.getState().select(((n = e.pages[0]) == null ? void 0 : n.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var a, o;
    const t = this.lastExport, e = this.store.getState().project;
    let n, r = 0;
    if (e.fontSubset && this.preview.ready) {
      const l = oe(e, e.fontExtra), c = this.buildFontSubset(e, l);
      c ? (n = c, r = c.length, this.preview.useCustomFont(c)) : console.warn("[u8g2-menu-editor] 现场取模失败：字符集未命中任何字形");
    }
    const s = Me(e, t ?? void 0, n);
    if (n) {
      const l = De(oe(e, e.fontExtra));
      s.warnings.unshift(`现场取模：收录 ${l.total} 个字符（ASCII ${l.ascii} + 扩展 ${l.cjk}），字体数组 ${r} 字节。运行时若输出超出字符集的中文，请在设置里补充额外字符`);
    }
    return this.lastExport = { c: s.c }, this.opts.persistKey && localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, s.c), At(this.container, s), (o = (a = this.opts).onExport) == null || o.call(a, s), s;
  }
  downloadC() {
    const t = this.store.getState().project;
    let e;
    t.fontSubset && this.preview.ready && (e = this.buildFontSubset(t, oe(t, t.fontExtra)), e && this.preview.useCustomFont(e));
    const n = Me(t, this.lastExport ?? void 0, e);
    this.lastExport = { c: n.c }, Ie("menu_pages.c", n.c);
  }
  /** 现场取模：从 WASM 真库逐字拉取字形，生成子集字体 */
  buildFontSubset(t, e) {
    const n = this.preview.fontIndex(t.font), r = this.preview.getFontBytes(n), s = this.preview.glyphFetcher(n);
    if (!(!r || !s))
      return Be(r, e, s) ?? void 0;
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
          Ee(this.store.getState().project)
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
      _t(this.els.left, this.store), Nt(this.els.setEl, this.store), Ct(this.els.resEl, this.store), kt(this.els.propEl, this.store, {
        openXbmEditor: (e, n) => Lt(this.container, this.store, e, n)
      }), this.els.toolbarUndo.disabled = t.past.length === 0, this.els.toolbarRedo.disabled = t.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var s;
    const t = document.getElementById("ume-live-value"), e = document.getElementById("ume-page-jump"), n = this.store.getState(), r = this.store.getState().project.pages.findIndex((a) => a.id === n.selection.pageId);
    if (e) {
      const a = n.project.pages, o = a.map((c) => c.name).join("|");
      e.dataset.sig !== o && (e.dataset.sig = o, e.innerHTML = "", a.forEach((c, u) => {
        const m = document.createElement("option");
        m.value = String(u), m.textContent = `${u + 1}. ${c.name}`, e.appendChild(m);
      }), e.onchange = () => {
        const c = parseInt(e.value, 10);
        Number.isFinite(c) && this.preview.navTo(c);
      });
      const l = this.preview.currentPage;
      document.activeElement !== e && e.value !== String(l) && (e.value = String(l));
    }
    if (t && r >= 0 && n.selection.itemId) {
      const a = n.project.pages[r], o = a.items.findIndex((g) => g.id === n.selection.itemId), l = a.items[o], c = l == null ? void 0 : l.bind, u = (c == null ? void 0 : c.type) === "value" || (c == null ? void 0 : c.type) === "switch" ? c.varId : null, m = (l == null ? void 0 : l.kind) === "text" && (c == null ? void 0 : c.type) === "none" ? l.displayVarId : null, $ = u ?? m;
      if (l && $) {
        const g = (n.project.variables ?? []).findIndex((S) => S.id === $), v = g >= 0 ? g : r * 64 + o, b = (c == null ? void 0 : c.type) === "switch" ? this.preview.getSwitch(v) : this.preview.getInt(v), f = (s = (n.project.variables ?? []).find((S) => S.id === $)) == null ? void 0 : s.name;
        t.textContent = `${f ?? l.kind} = ${b}`;
      } else
        t.textContent = "";
    }
  }
}
export {
  Ut as MenuEditor,
  F as MenuKey
};
//# sourceMappingURL=u8g2-menu-editor.js.map
