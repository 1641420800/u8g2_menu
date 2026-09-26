import { createStore as Pe } from "zustand/vanilla";
import { render as te, html as v, nothing as L } from "lit-html";
const Te = `/* u8g2-menu-editor 样式（前缀 ume-） */
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
let de = 0;
function U(a) {
  return de = (de + 1) % 1e9, `${a}_${Date.now().toString(36)}_${de.toString(36)}`;
}
function oe(a) {
  return {
    id: U("vb"),
    name: "var_new",
    type: "int32",
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
    ...a
  };
}
function Me(a) {
  return {
    id: U("buf"),
    name: "buf_new",
    dataLen: 32,
    sample: "sine",
    ...a
  };
}
function Be(a, t) {
  const e = new Set(a.map((s) => s.name));
  if (!e.has(t)) return t;
  let u = 2;
  for (; e.has(`${t}_${u}`); ) u++;
  return `${t}_${u}`;
}
function Ve(a, t) {
  const e = new Set(a.map((s) => s.name));
  if (!e.has(t)) return t;
  let u = 2;
  for (; e.has(`${t}_${u}`); ) u++;
  return `${t}_${u}`;
}
function O(a) {
  const t = { id: U("it"), label: "" };
  switch (a) {
    case "text":
      return { ...t, kind: a, text: "菜单项", scale: 1 };
    case "number":
      return {
        ...t,
        kind: a,
        text: "v:%d",
        scale: 1,
        varId: null,
        editable: !0
      };
    case "switch":
      return {
        ...t,
        kind: a,
        text: "s:%s",
        scale: 1,
        varId: null,
        openValue: 1,
        onText: "on",
        offText: "off"
      };
    case "button":
      return { ...t, kind: a, text: "执行操作", scale: 1, cbName: "btn_action_cb", buttonId: 1 };
    case "submenu":
      return { ...t, kind: a, text: "下一级", scale: 1, targetPageId: null };
    case "back":
      return { ...t, kind: a, text: "返回", scale: 1 };
    case "slider":
      return { ...t, kind: a, varId: null };
    case "progress":
      return { ...t, kind: a, varId: null };
    case "chart":
      return {
        ...t,
        kind: a,
        sources: [],
        height: 32
      };
    case "xbm":
      return Ke(16, 16);
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
function Ke(a, t) {
  const e = Math.ceil(a / 8);
  return {
    id: U("it"),
    kind: "xbm",
    label: "",
    name: "icon",
    w: a,
    h: t,
    bits: new Array(e * t).fill(0)
  };
}
function me(a) {
  return { id: U("pg"), name: a, fnName: "", items: [], userCodePre: "" };
}
function Y(a, t) {
  return { ...a, ...t };
}
function De() {
  const a = [
    oe({ name: "var_value", type: "int32", initialValue: 50, min: 0, max: 100, step: 1 }),
    oe({ name: "var_switch", type: "uint8", initialValue: 0, min: 0, max: 1, step: 1 }),
    oe({ name: "var_slider", type: "int32", initialValue: 50, min: 0, max: 100, step: 2 })
  ], t = [
    Me({ name: "buf_demo", dataLen: 32, sample: "sine" })
  ], e = me("主页");
  e.items = [
    Y(O("text"), { text: "u8g2_menu" }),
    Y(O("submenu"), { text: "系统设置" }),
    Y(O("button"), { text: "关于", cbName: "btn_about_cb" })
  ];
  const u = me("设置");
  u.items = [
    Y(O("number"), { text: "音量:%d", varId: a[0].id }),
    Y(O("switch"), { text: "开关:%s", varId: a[1].id }),
    Y(O("slider"), { varId: a[2].id }),
    Y(O("submenu"), { text: "图表" }),
    O("back")
  ];
  const s = me("图表");
  s.items = [
    Y(O("chart"), {
      height: 36,
      sources: [{ bufferId: t[0].id, chartKind: "line" }]
    }),
    O("back")
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
    variables: a,
    chartBuffers: t,
    pages: [e, u, s]
  };
  return e.items[1].targetPageId = u.id, u.items[3].targetPageId = s.id, r;
}
function je(a) {
  return structuredClone(a);
}
const Ue = 800;
function Ee() {
  let a = null, t = 0;
  return Pe()((e, u) => ({
    project: De(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (s, r) => {
      const n = Date.now(), o = !!r && r === a && n - t < Ue;
      a = r ?? null, t = n, e((l) => {
        const d = je(l.project);
        return s(d), {
          project: d,
          dirty: !0,
          past: o ? l.past : [...l.past.slice(-99), l.project],
          future: []
        };
      });
    },
    undo: () => {
      e((s) => s.past.length ? {
        project: s.past[s.past.length - 1],
        past: s.past.slice(0, -1),
        future: [s.project, ...s.future.slice(0, 99)],
        dirty: !0
      } : s);
    },
    redo: () => {
      e((s) => {
        if (!s.future.length) return s;
        const [r, ...n] = s.future;
        return {
          project: r,
          past: [...s.past, s.project],
          future: n,
          dirty: !0
        };
      });
    },
    select: (s, r = null) => e({ selection: { pageId: s, itemId: r } }),
    addPage: (s) => {
      const r = { id: U("pg"), name: s ?? `页面${u().project.pages.length + 1}`, fnName: "", items: [], userCodePre: "" };
      return u().update((n) => {
        n.pages.push(r);
      }), e({ selection: { pageId: r.id, itemId: null } }), r;
    },
    removePage: (s) => {
      u().update((n) => {
        n.pages = n.pages.filter((o) => o.id !== s);
        for (const o of n.pages)
          for (const l of o.items)
            l.kind === "submenu" && l.targetPageId === s && (l.targetPageId = null);
      });
      const { selection: r } = u();
      r.pageId === s && e({ selection: { pageId: null, itemId: null } });
    },
    movePage: (s, r) => {
      u().update((n) => {
        const o = n.pages.findIndex((d) => d.id === s), l = o + r;
        o < 0 || l < 0 || l >= n.pages.length || ([n.pages[o], n.pages[l]] = [n.pages[l], n.pages[o]]);
      });
    },
    updatePage: (s, r) => {
      u().update((n) => {
        const o = n.pages.find((l) => l.id === s);
        o && Object.assign(o, r);
      });
    },
    addItem: (s, r) => {
      var l;
      const n = r ?? u().selection.pageId ?? ((l = u().project.pages[0]) == null ? void 0 : l.id);
      if (!n) return null;
      const o = ze(s);
      return u().update((d) => {
        const i = d.pages.find((c) => c.id === n);
        i == null || i.items.push(o);
      }), e({ selection: { pageId: n, itemId: o.id } }), o;
    },
    removeItem: (s, r) => {
      u().update((o) => {
        const l = o.pages.find((d) => d.id === s);
        l && (l.items = l.items.filter((d) => d.id !== r));
      });
      const { selection: n } = u();
      n.itemId === r && e({ selection: { pageId: s, itemId: null } });
    },
    moveItem: (s, r, n) => {
      u().update((o) => {
        const l = o.pages.find((c) => c.id === s);
        if (!l) return;
        const d = l.items.findIndex((c) => c.id === r), i = d + n;
        d < 0 || i < 0 || i >= l.items.length || ([l.items[d], l.items[i]] = [l.items[i], l.items[d]]);
      });
    },
    duplicateItem: (s, r) => {
      let n = null;
      u().update((o) => {
        const l = o.pages.find((i) => i.id === s);
        if (!l) return;
        const d = l.items.findIndex((i) => i.id === r);
        d < 0 || (n = structuredClone(l.items[d]), n.id = U("it"), l.items.splice(d + 1, 0, n));
      }), n && e({ selection: { pageId: s, itemId: n.id } });
    },
    updateItem: (s, r, n, o) => {
      u().update((l) => {
        const d = l.pages.find((c) => c.id === s), i = d == null ? void 0 : d.items.find((c) => c.id === r);
        i && Object.assign(i, n);
      }, o);
    },
    addVariable: (s) => {
      let r = null;
      return u().update((n) => {
        n.variables = n.variables ?? [];
        const o = Ve(n.variables, (s == null ? void 0 : s.name) ?? "var_new");
        r = oe({ ...s, name: o }), n.variables.push(r);
      }), r;
    },
    removeVariable: (s) => {
      let r = 0;
      for (const n of u().project.pages)
        for (const o of n.items)
          "varId" in o && o.varId === s && r++;
      return r > 0 ? r : (u().update((n) => {
        n.variables = (n.variables ?? []).filter((o) => o.id !== s);
      }), 0);
    },
    updateVariable: (s, r, n) => {
      u().update((o) => {
        const l = (o.variables ?? []).find((d) => d.id === s);
        l && Object.assign(l, r);
      }, n);
    },
    addChartBuffer: (s) => {
      let r = null;
      return u().update((n) => {
        n.chartBuffers = n.chartBuffers ?? [];
        const o = Be(n.chartBuffers, (s == null ? void 0 : s.name) ?? "buf_new");
        r = Me({ ...s, name: o }), n.chartBuffers.push(r);
      }), r;
    },
    removeChartBuffer: (s) => {
      let r = 0;
      for (const n of u().project.pages)
        for (const o of n.items)
          o.kind === "chart" && o.sources.some((l) => l.bufferId === s) && r++;
      return r > 0 ? r : (u().update((n) => {
        n.chartBuffers = (n.chartBuffers ?? []).filter((o) => o.id !== s);
      }), 0);
    },
    updateChartBuffer: (s, r, n) => {
      u().update((o) => {
        const l = (o.chartBuffers ?? []).find((d) => d.id === s);
        l && Object.assign(l, r);
      }, n);
    }
  }));
}
Ee();
function ze(a) {
  return O(a);
}
const pe = 1, ee = [
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
}, Re = {
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
}, Oe = [
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
class W extends Error {
}
const Ce = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int", "float", "double"]), qe = /* @__PURE__ */ new Set(["line", "point", "bar"]), Ne = /* @__PURE__ */ new Set(["sine", "ramp", "noise", "none"]);
function ae(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function T(a, t) {
  return typeof a == "string" ? a : t;
}
function I(a, t) {
  return typeof a == "number" && Number.isFinite(a) ? a : t;
}
const Fe = ["text", "number", "switch", "button", "submenu", "back", "slider", "progress", "chart", "xbm", "textarea", "board"];
function He(a) {
  if (!ae(a)) throw new W("条目格式错误");
  const t = a.kind;
  if (typeof t != "string" || !Fe.includes(t))
    throw new W(`未知条目类型: ${String(t)}`);
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
function Xe(a) {
  if (!ae(a)) throw new W("页面格式错误");
  const t = Array.isArray(a.items) ? a.items.map(He) : [];
  return {
    id: T(a.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: T(a.name, "未命名页面"),
    fnName: T(a.fnName, ""),
    items: t,
    userCodePre: T(a.userCodePre, "")
  };
}
function Ze(a) {
  if (!ae(a)) return null;
  const t = T(a.type, "int32");
  return {
    id: T(a.id, "") || U("vb"),
    name: T(a.name, ""),
    type: Ce.has(t) ? t : "int32",
    initialValue: I(a.initialValue, 0),
    min: I(a.min, 0),
    max: I(a.max, 100),
    step: I(a.step, 1)
  };
}
function Ye(a) {
  if (!ae(a)) return null;
  const t = T(a.sample, "sine");
  return {
    id: T(a.id, "") || U("buf"),
    name: T(a.name, ""),
    dataLen: Math.min(512, Math.max(2, Math.trunc(I(a.dataLen, 32)))),
    sample: Ne.has(t) ? t : "sine"
  };
}
function Ge(a) {
  const t = /* @__PURE__ */ new Map(), e = [], u = (s, r) => {
    let n = t.get(s);
    return n || (n = r(), t.set(s, n), e.push(n)), n;
  };
  for (const s of a)
    for (const r of s.items) {
      const n = r;
      switch (r.kind) {
        case "number":
          if (n.varId === void 0 || n.varId === null) {
            const o = typeof n.varName == "string" && n.varName ? n.varName : "var_unnamed", l = u(o, () => ({
              id: U("vb"),
              name: o,
              type: Ce.has(String(n.varType)) ? String(n.varType) : "int32",
              initialValue: I(n.initialValue, 0),
              min: I(n.min, 0),
              max: I(n.max, 100),
              step: I(n.step, 1)
            }));
            r.varId = l.id;
          }
          n.editable === void 0 && (r.editable = !0), delete n.varName, delete n.varType, delete n.step, delete n.min, delete n.max, delete n.initialValue, delete n.decimals;
          break;
        case "slider":
        case "progress":
          if (n.varId === void 0 || n.varId === null) {
            const o = typeof n.varName == "string" && n.varName ? n.varName : "var_unnamed", l = u(o, () => ({
              id: U("vb"),
              name: o,
              type: "int",
              initialValue: I(n.initialValue, 0),
              min: I(n.min, 0),
              max: I(n.max, 100),
              step: I(n.step, 1)
            }));
            r.varId = l.id;
          }
          delete n.varName, delete n.step, delete n.min, delete n.max, delete n.initialValue;
          break;
        case "switch":
          if (n.varId === void 0 || n.varId === null) {
            const o = typeof n.varName == "string" && n.varName ? n.varName : "var_unnamed", l = u(o, () => ({
              id: U("vb"),
              name: o,
              type: "uint8",
              initialValue: I(n.initialValue, 0),
              min: 0,
              max: 1,
              step: 1
            }));
            r.varId = l.id;
          }
          delete n.varName, delete n.initialValue;
          break;
      }
    }
  return e;
}
function be(a) {
  let t;
  if (typeof a == "string")
    try {
      t = JSON.parse(a);
    } catch {
      throw new W("JSON 解析失败");
    }
  else
    t = a;
  if (!ae(t)) throw new W("不是有效的工程文件");
  const e = t, u = I(e.version, 0);
  if (u > pe)
    throw new W(`工程版本 v${u} 高于当前支持的 v${pe}，请升级编辑器`);
  const s = Array.isArray(e.pages) ? e.pages.map(Xe) : [];
  if (!s.length) throw new W("工程至少需要一个页面");
  const r = ["default", "rotundity", "square"].includes(e.selector) ? e.selector : "rotundity", n = new Set(ee.map((i) => i.fn)), o = Array.isArray(e.weakHooks) ? [...new Set(e.weakHooks.filter((i) => typeof i == "string" && n.has(i)))] : [];
  let l;
  Array.isArray(e.variables) ? l = e.variables.map(Ze).filter((i) => !!i) : l = Ge(s);
  let d;
  return Array.isArray(e.chartBuffers) ? d = e.chartBuffers.map(Ye).filter((i) => !!i) : d = Je(s), {
    version: pe,
    name: T(e.name, "未命名工程"),
    width: I(e.width, 128),
    height: I(e.height, 64),
    font: T(e.font, "u8g2_font_wqy12_t_gb2312"),
    selector: r,
    selectorLeftMargin: I(e.selectorLeftMargin, 16),
    selectorTopMargin: I(e.selectorTopMargin, 0),
    selectorLineSpacing: I(e.selectorLineSpacing, 0),
    marqueeSpeed: I(e.marqueeSpeed, 0.2),
    marqueeHeaderLen: I(e.marqueeHeaderLen, 5),
    weakHooks: o,
    variables: l,
    chartBuffers: d,
    pages: s
  };
}
function Je(a) {
  const t = [];
  let e = 0;
  const u = () => {
    const s = {
      id: U("buf"),
      name: `buf_chart_${++e}`,
      dataLen: 32,
      sample: "sine"
    };
    return t.push(s), s;
  };
  for (const s of a)
    for (const r of s.items) {
      if (r.kind !== "chart") continue;
      const n = r;
      if (Array.isArray(n.sources)) continue;
      const o = u();
      o.dataLen = Math.min(512, Math.max(2, Math.trunc(I(n.dataLen, 32))));
      const l = T(n.sample, "sine");
      Ne.has(l) && (o.sample = l);
      const d = T(n.chartKind, "line"), i = {
        bufferId: o.id,
        chartKind: qe.has(d) ? d : "line"
      };
      n.max !== void 0 && n.max !== null && (i.max = I(n.max, 0)), n.min !== void 0 && n.min !== null && (i.min = I(n.min, 0)), r.sources = [i], n.height === void 0 && (r.height = 32), delete n.chartKind, delete n.dataLen, delete n.sample, delete n.max, delete n.min;
    }
  return t;
}
function ye(a) {
  return JSON.stringify(a, null, 2);
}
const We = {
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
function Z(a, t = "anon") {
  let e = a.trim().replace(/[^A-Za-z0-9_]/g, "_");
  return (!e || /^[0-9]/.test(e)) && (e = `_${e}`), e || t;
}
function ne(a) {
  return a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function G(a) {
  if (!Number.isFinite(a)) return "0.0f";
  const t = a.toString();
  return /[-.]|e/i.test(t) ? `${t}f` : `${t}.0f`;
}
function Qe(a, t, e) {
  return e === "ramp" ? `${a}[i] = (float)i;` : e === "noise" ? `${a}[i] = (float)((i * 37) % ${t});` : `${a}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`;
}
function et(a) {
  const t = /* @__PURE__ */ new Map();
  if (!a) return t;
  const e = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let u;
  for (; (u = e.exec(a)) !== null; ) t.set(u[1], u[2]);
  return t;
}
function R(a, t, e) {
  const u = t.has(a) ? t.get(a) : "";
  return `${e}/* USER CODE BEGIN ${a} */${u}${e}/* USER CODE END ${a} */`;
}
const tt = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]);
function ke(a, t) {
  const e = [], u = et((t == null ? void 0 : t.c) ?? ""), s = a.pages.map((m, $) => m.fnName && /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName) ? m.fnName : `page_${$}`), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const m of a.variables ?? []) {
    if (!m.name) {
      e.push("存在未命名变量，已跳过");
      continue;
    }
    if (r.has(m.name)) {
      e.push(`变量名 "${m.name}" 重复，以第一个为准`);
      continue;
    }
    /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.name) || e.push(`变量名 "${m.name}" 不是合法的 C 标识符，已清洗为 "${Z(m.name)}"`);
    const $ = Z(m.name, "var"), b = m.type === "float" || m.type === "double", w = {
      name: $,
      srcType: m.type,
      type: We[m.type],
      init: b ? G(m.initialValue) : String(Math.trunc(m.initialValue)),
      isFloat: b,
      step: m.step,
      min: m.min,
      max: m.max
    };
    r.set($, w), n.set(m.id, w);
  }
  const o = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), d = [], i = /* @__PURE__ */ new Map();
  for (const m of a.chartBuffers ?? []) {
    if (!m.name) {
      e.push("存在未命名数据源缓冲区，已跳过");
      continue;
    }
    const $ = Z(m.name, "buf");
    if ([...i.values()].some((_) => _.name === $)) {
      e.push(`缓冲区名 "${m.name}" 与其它缓冲区重名，已跳过`);
      continue;
    }
    const b = Math.max(2, Math.trunc(m.dataLen)), w = `${$.toUpperCase()}_LEN`;
    i.set(m.id, { name: $, lenMacro: w, len: b });
    const y = `fill_${$}`, g = (u.get(y) ?? "").trim() !== "";
    d.push(
      `#define ${w} ${b}`,
      `static float ${$}[${w}];`,
      `static uint8_t ${$}_filled = 0;`,
      `static void ${$}_fill(void)`,
      "{",
      R(y, u, "    "),
      ...m.sample !== "none" && !g ? [`    for (uint16_t i = 0; i < ${w}; ++i) { ${Qe($, b, m.sample)} }`] : [],
      "}"
    );
  }
  const c = [], h = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map();
  {
    let m = 0, $ = 0;
    const b = (w) => {
      const y = i.get(w);
      return y ? (x.has(w) || x.set(w, `        if (!${y.name}_filled) { ${y.name}_filled = 1; ${y.name}_fill(); }`), x.get(w)) : "";
    };
    for (const w of a.pages)
      for (const y of w.items) {
        if (y.kind !== "chart") continue;
        const g = y.sources.filter((C) => i.has(C.bufferId));
        if (y.sources.length && !g.length) {
          e.push(`页面 ${w.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);
          continue;
        }
        if (!g.length) {
          e.push(`页面 ${w.name} 的图表条目未绑定数据源，已跳过`);
          continue;
        }
        const _ = Math.max(4, Math.trunc(y.height)), k = [];
        for (const C of g) {
          const A = i.get(C.bufferId), F = `chart${m++}`;
          c.push(
            `static float ${F}_dis[${A.lenMacro}];`,
            `static u8g2_chart_t ${F};`
          ), k.push({ name: F, s: C, b: A });
        }
        if (k.length === 1) {
          const { name: C, s: A, b: F } = k[0];
          c.push(`static uint8_t ${C}_inited = 0;`), h.set(y.id, [
            `    if (!${C}_inited) {`,
            `        ${C}_inited = 1;`,
            `        u8g2_chart_init(&${C}, ${F.name}, ${C}_dis, ${F.lenMacro});`,
            b(A.bufferId),
            "    }"
          ]);
          const X = A.chartKind === "point" ? "Point" : A.chartKind === "bar" ? "Bar" : "Line", re = A.min !== void 0 && A.max !== void 0 ? `${G(A.max)}, ${G(A.min)}` : "0, 0";
          f.set(y.id, `    u8g2_MenuDrawItem${X}Chart(&${C}, ${_}, ${re});`);
        } else {
          const C = `chart_layers_${$++}`;
          c.push(
            `static u8g2_menu_drawChart_t ${C}[${k.length}];`,
            `static uint8_t ${C}_inited = 0;`
          );
          const A = [
            `    if (!${C}_inited) {`,
            `        ${C}_inited = 1;`
          ];
          k.forEach(({ name: F, s: X, b: re }, se) => {
            A.push(`        u8g2_chart_init(&${F}, ${re.name}, ${F}_dis, ${re.lenMacro});`), A.push(b(X.bufferId));
            const Le = X.chartKind === "point" ? "u8g2_drawPointChart" : X.chartKind === "bar" ? "u8g2_drawBarChart" : "u8g2_drawLineChart", we = X.min !== void 0 && X.max !== void 0 ? `${G(X.max)}, ${G(X.min)}` : "0, 0";
            A.push(`        ${C}[${se}].drawChart = ${Le};`), A.push(`        ${C}[${se}].chart = &${F};`), A.push(`        ${C}[${se}].max = ${we.split(", ")[0]};`), A.push(`        ${C}[${se}].min = ${we.split(", ")[1]};`);
          }), A.push("    }"), h.set(y.id, A), f.set(y.id, `    u8g2_MenuDrawItemChart(${C}, ${k.length}, ${_});`);
        }
      }
  }
  const j = [], z = [], q = [], S = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Map();
  let B = 0;
  for (const m of a.pages)
    for (const $ of m.items)
      switch ($.kind) {
        case "button": {
          const b = Z($.cbName, "btn_cb");
          o.has(b) || o.set(b, $.buttonId);
          break;
        }
        case "board":
          l.add(Z($.cbName, "board_cb"));
          break;
        case "xbm": {
          let b = Z($.name, "icon");
          for (; S.has(b); ) b = `${b}_2`;
          S.add(b), E.set($.id, b);
          const w = $.bits.length, y = $.bits.map((g) => `0x${(g & 255).toString(16).padStart(2, "0")}`).join(", ");
          j.push(`static const uint8_t menu_xbm_${b}[${w}] = { ${y} };`);
          break;
        }
        case "textarea": {
          const b = B++;
          z.push(
            `static char ta${b}_text[] = "${ne($.content)}";`,
            `static u8g2_menu_textArea_t ta${b};`,
            `static uint8_t ta${b}_inited = 0;`
          ), q.push(
            `    if (!ta${b}_inited) {`,
            `        ta${b}_inited = 1;`,
            `        u8g2_textArea_init(&ta${b}, ta${b}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${b}, ${Math.max(0, Math.trunc($.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
  const P = (m, $) => {
    if (!m) return "";
    const b = `"${ne(m)}"`;
    return $ === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${b});` : `u8g2_MenuUTF8Printf(${b});`;
  }, ie = (m, $, b) => {
    const w = `"${ne(m)}"`;
    return $ === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${b});` : `u8g2_MenuUTF8Printf(${w}, ${b});`;
  };
  let ce = 0;
  const Q = (m, $) => {
    const b = [], w = `${$.name}`, y = (g) => {
      if (!g) return null;
      const _ = n.get(g);
      return _ || e.push(`页面 ${w} 的条目引用了已删除的变量，已按普通文本生成`), _ ?? null;
    };
    switch (m.kind) {
      case "text": {
        const g = P(m.text, m.scale);
        g && b.push(`    ${g}`);
        break;
      }
      case "number": {
        const g = m, _ = y(g.varId);
        if (_ && g.editable !== !1) {
          const k = _.isFloat ? `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${G(_.step)}, ${G(_.min)}, ${G(_.max)});` : `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;
          b.push(`    ${k}`);
        }
        if (_)
          b.push(`    ${ie(g.text, g.scale, _.name)}`), g.editable !== !1 && !/%[-+ #0]*[a-zA-Z]/.test(g.text) && e.push(`数值条目 "${w}" 的显示文本不含格式化占位符（如 %d）`);
        else if (/%[-+ #0]*[a-zA-Z]/.test(g.text)) {
          e.push(`页面 ${w} 的数值条目未绑定变量但文本含占位符，已按普通文本生成`);
          const k = P(g.text.replace(/%[-+ #0]*[a-zA-Z]/g, ""), g.scale);
          k && b.push(`    ${k}`);
        } else {
          const k = P(g.text, g.scale);
          k && b.push(`    ${k}`);
        }
        break;
      }
      case "switch": {
        const g = m, _ = y(g.varId);
        if (_) {
          if (_.srcType !== "uint8") {
            e.push(`开关条目绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`);
            const k = P(g.text, g.scale);
            k && b.push(`    ${k}`);
            break;
          }
          b.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(g.openValue)});`), b.push(`    ${ie(g.text, g.scale, `${_.name} ? "${ne(g.onText)}" : "${ne(g.offText)}"`)}`), /%[-+ #0]*s/.test(g.text) || e.push(`开关条目 "${_.name}" 的显示文本建议包含 %s 用于显示 on/off`);
        } else {
          const k = P(g.text, g.scale);
          k && b.push(`    ${k}`);
        }
        break;
      }
      case "button": {
        const g = Z(m.cbName, "btn_cb");
        b.push(`    u8g2_MenuItem_button(${g}, ${Math.trunc(m.buttonId)});`);
        const _ = P(m.text, m.scale);
        _ && b.push(`    ${_}`);
        break;
      }
      case "submenu": {
        if (!m.targetPageId) {
          e.push(`页面 ${w} 的子页面条目 "${m.text || m.label || m.id}" 未指定目标页面，已按普通文本生成`);
          const k = P(m.text, m.scale);
          k && b.push(`    ${k}`);
          break;
        }
        const g = a.pages.findIndex((k) => k.id === m.targetPageId);
        if (g < 0) {
          e.push(`页面 ${w} 的子页面条目目标无效`);
          break;
        }
        b.push(`    u8g2_MenuItem_menu_enter(${s[g]});`);
        const _ = P(m.text, m.scale);
        _ && b.push(`    ${_}`);
        break;
      }
      case "back": {
        b.push("    u8g2_MenuItem_menu_back();");
        const g = P(m.text, m.scale);
        g && b.push(`    ${g}`);
        break;
      }
      case "slider":
      case "progress": {
        const g = y(m.varId);
        if (!g) {
          e.push(`页面 ${w} 的${m.kind === "slider" ? "滑块" : "进度"}条目未绑定变量，已跳过`);
          break;
        }
        if (!tt.has(g.srcType)) {
          e.push(`滑块/进度条绑定的变量 "${g.name}" 须为整型（当前 ${g.srcType}），已跳过`);
          break;
        }
        const _ = m.kind === "slider" ? "Slider" : "ProgressBar";
        b.push(`    u8g2_MenuDrawItem${_}_bind(&${g.name}, ${Math.trunc(g.step)}, ${Math.trunc(g.min)}, ${Math.trunc(g.max)});`);
        break;
      }
      case "chart": {
        const g = h.get(m.id), _ = f.get(m.id);
        if (!g || !_) break;
        b.push(...g), b.push(_);
        break;
      }
      case "xbm":
        b.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${E.get(m.id) ?? Z(m.name, "icon")});`);
        break;
      case "textarea": {
        const g = ce++;
        b.push(...q[g].split(`
`));
        const _ = m.bindScroll ? "u8g2_MenuDrawTextArea_bind" : "u8g2_MenuDrawTextArea";
        b.push(`    ${_}(&ta${g}, ${Math.max(10, Math.trunc(m.height))});`);
        break;
      }
      case "board": {
        const g = Z(m.cbName, "board_cb");
        b.push(`    u8g2_MenuDrawItemBoard(${g}, ${Math.max(1, Math.trunc(m.w))}, ${Math.max(1, Math.trunc(m.h))});`);
        break;
      }
    }
    return b;
  }, p = [];
  p.push("/**"), p.push(` * 由 u8g2-menu-editor 自动生成，工程: ${a.name}`), p.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), p.push(" *"), p.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："), s.forEach((m, $) => p.push(` *   void ${m}(void);   /* 页面: ${a.pages[$].name} */`));
  for (const m of r.values()) p.push(` *   extern ${m.type} ${m.name};`);
  for (const [m] of o) p.push(` *   void ${m}(u8g2_menu_t *menu, uint8_t ID);`);
  for (const m of l) p.push(` *   void ${m}(u8g2_t *u8g2);`);
  p.push(" */"), p.push('#include "u8g2_menu.h"'), (a.chartBuffers ?? []).some((m) => m.sample === "sine") && p.push("#include <math.h>"), p.push(""), p.push(R("includes", u, "")), p.push(""), s.forEach((m) => p.push(`void ${m}(void);`)), p.push(""), p.push("/* ======================== 变量定义 ======================== */"), p.push(R("variables", u, ""));
  for (const m of r.values()) p.push(`${m.type} ${m.name} = ${m.init};`);
  if (p.push(""), (d.length || c.length || z.length || j.length) && (p.push("/* ======================== 页面资源 ======================== */"), p.push(...d, ...c, ...z, ...j), p.push("")), o.size || l.size) {
    p.push("/* ======================== 回调函数 ======================== */"), p.push(R("callbacks", u, ""));
    for (const [m] of o)
      p.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`), p.push("{"), p.push(R(`cb_${m}`, u, "    ")), p.push("}"), p.push("");
    for (const m of l)
      p.push(`void ${m}(u8g2_t *u8g2)`), p.push("{"), p.push(R(`cb_${m}`, u, "    ")), p.push("}"), p.push("");
  }
  const M = (a.weakHooks ?? []).map((m) => ee.find(($) => $.fn === m)).filter((m) => !!m);
  if (M.length || u.has("weak") || ee.some((m) => (u.get(`weak_${m.fn}`) ?? "").trim())) {
    p.push("/* ==================== 弱定义函数重写 ==================== */"), p.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"), p.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");
    const $ = ee.filter((b) => {
      var w;
      return !((w = a.weakHooks) != null && w.includes(b.fn)) && (u.get(`weak_${b.fn}`) ?? "").trim();
    }).map((b) => [
      `#if 0   /* 已取消勾选 ${b.fn}，手写内容保留于此；重新勾选后恢复编译 */`,
      `${b.decl}`,
      "{",
      R(`weak_${b.fn}`, u, "    "),
      "}",
      "#endif"
    ].join(`
`)).join(`
`);
    p.push($ ? `${R("weak", u, "").replace(/\n$/, "")}
${$}
` : R("weak", u, "")), p.push("");
    for (const b of M) {
      p.push(`/* ${b.label}: ${b.desc} */`), p.push(`${b.decl}`), p.push("{"), p.push(R(`weak_${b.fn}`, u, "    "));
      const w = b.bodyArgs.split(`
`).map((y) => `    ${y}`);
      b.retNote && w.push(`    ${b.retNote}`), p.push(...w), p.push("}"), p.push("");
    }
  }
  return p.push("/* ======================== 页面函数 ======================== */"), p.push(""), a.pages.forEach((m, $) => {
    p.push(`/* 页面: ${m.name} */`), p.push(`void ${s[$]}(void)`), p.push("{"), p.push(R(`page_${s[$]}_pre`, u, "    "));
    for (const b of m.items) p.push(...Q(b, m));
    p.push("}"), p.push("");
  }), { c: `${p.join(`
`).replace(/\n{3,}/g, `


`)}
`, warnings: e };
}
function fe(a, t) {
  return t ? a.get(t) ?? null : null;
}
var K = /* @__PURE__ */ ((a) => (a[a.None = 0] = "None", a[a.Up = 1] = "Up", a[a.Down = 2] = "Down", a[a.Enter = 3] = "Enter", a[a.Return = 4] = "Return", a[a.Add = 5] = "Add", a[a.Sub = 6] = "Sub", a))(K || {});
const nt = 8192 / 8;
function at(a) {
  return new Promise((t, e) => {
    const u = document.createElement("script");
    u.src = a, u.onload = () => t(), u.onerror = () => e(new Error(`预览引擎脚本加载失败: ${a}`)), document.head.appendChild(u);
  });
}
class it {
  constructor(t, e = {}) {
    this.mod = null, this.img = null, this.raf = 0, this.lastT = 0, this.running = !1, this.fontIndexCache = /* @__PURE__ */ new Map(), this.structSig = "", this.lastKnownPage = 0, this.canvas = document.createElement("canvas"), this.canvas.width = 128, this.canvas.height = 64, this.canvas.className = "ume-preview-canvas", t.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.events = e;
  }
  /** 加载 WASM 引擎（幂等） */
  async load(t) {
    if (this.mod) return;
    const e = window;
    e.U8G2MenuPreview || await at(t);
    const u = e.U8G2MenuPreview;
    if (!u) throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");
    this.mod = await u({
      locateFile: (r) => t.replace(/[^/\\]*$/, "") + r
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const s = this.mod._em_font_count_export();
    for (let r = 0; r < s; r++) {
      const n = this.mod._em_font_name(r);
      this.fontIndexCache.set(this.mod.UTF8ToString(n), r);
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
        k: e.items.map((u) => u.kind).join(","),
        res: e.items.map((u) => u.kind === "chart" ? (u.sources ?? []).map((s) => `${s.bufferId}|${s.chartKind}|${s.min ?? "a"}|${s.max ?? "a"}`).join(">") : u.kind === "xbm" ? `${u.w}x${u.h}` : u.kind === "textarea" ? Math.ceil(u.content.length / 64) : "").join(",")
      }))
    });
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(t) {
    const e = this.mod;
    if (!e) return;
    const u = this.signature(t);
    u !== this.structSig && (e.ccall("em_reset_dynamic", null, [], []), this.structSig = u);
    const s = (l) => Math.trunc(Number.isFinite(l) ? l : 0), r = (l) => l ? (t.variables ?? []).findIndex((d) => d.id === l) : -1, n = new Map((t.variables ?? []).map((l) => [l.id, l]));
    (t.chartBuffers ?? []).forEach((l, d) => {
      e.ccall(
        "em_buf_define",
        null,
        ["number", "number", "number"],
        [d, s(l.dataLen), { sine: 0, ramp: 1, noise: 2, none: 3 }[l.sample]]
      );
    });
    const o = (l) => (t.chartBuffers ?? []).findIndex((d) => d.id === l);
    t.pages.forEach((l, d) => {
      e.ccall("em_page_begin", null, ["number"], [d]), l.items.forEach((i, c) => {
        const h = ["number", "number"];
        switch (i.kind) {
          case "text":
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 0, 0, i.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, i.text]);
            break;
          case "number": {
            const f = fe(n, i.varId);
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
                d,
                c,
                1,
                f ? { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }[f.type] : 0,
                i.scale,
                0,
                0,
                0,
                0,
                0,
                f ? s(f.initialValue) : 0,
                f ? s(f.step) : 0,
                f ? s(f.min) : 0,
                f ? s(f.max) : 0,
                -1,
                0,
                0,
                0,
                0,
                i.editable === !1 ? 1 : 0,
                r(i.varId)
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, i.text]);
            break;
          }
          case "switch": {
            const f = fe(n, i.varId);
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
                d,
                c,
                2,
                0,
                i.scale,
                0,
                0,
                s(i.openValue),
                0,
                0,
                f ? s(f.initialValue) : 0,
                0,
                0,
                0,
                -1,
                0,
                0,
                0,
                0,
                0,
                r(i.varId)
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, i.text]), e.ccall(
              "em_item_swtext",
              null,
              ["number", "number", "string", "string"],
              [d, c, i.onText, i.offText]
            );
            break;
          }
          case "button":
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 3, 0, i.scale, 0, 0, 0, s(i.buttonId), 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, i.text]);
            break;
          case "submenu": {
            const f = t.pages.findIndex((x) => x.id === i.targetPageId);
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 4, 0, i.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, f, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, i.text]);
            break;
          }
          case "back":
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 5, 0, i.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, i.text]);
            break;
          case "slider":
          case "progress": {
            const f = fe(n, i.varId), x = i.kind === "slider" ? 5 : 6;
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
                d,
                c,
                x,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                f ? s(f.initialValue) : 0,
                f ? s(f.step) : 0,
                f ? s(f.min) : 0,
                f ? s(f.max) : 0,
                -1,
                0,
                0,
                0,
                0,
                0,
                r(i.varId)
              ]
            );
            break;
          }
          case "chart": {
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 8, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, s(i.height), 0, 0, -1]
            );
            for (const f of i.sources ?? []) {
              const x = f.min !== void 0 && f.max !== void 0 ? 1 : 0;
              e.ccall(
                "em_item_chart_add",
                null,
                ["number", "number", "number", "number", "number", "number", "number"],
                [
                  d,
                  c,
                  o(f.bufferId),
                  { line: 0, point: 1, bar: 2 }[f.chartKind],
                  x,
                  x ? f.max ?? 0 : 0,
                  x ? f.min ?? 0 : 0
                ]
              );
            }
            break;
          }
          case "xbm": {
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, s(i.w), s(i.h), 0, 0, 0, -1]
            );
            const f = e._em_scratch(i.bits.length);
            f && (e.HEAPU8.set(new Uint8Array(i.bits), f), e._em_item_bits(d, c, f, i.bits.length));
            break;
          }
          case "textarea":
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 10, 0, 1, 0, i.bindScroll ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, s(i.height), 0, s(i.lineSpacing), -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, i.content]);
            break;
          case "board":
            e.ccall(
              "em_page_item",
              null,
              [
                ...h,
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
              [d, c, 11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, s(i.w), s(i.h), 0, 0, 0, -1]
            );
            break;
        }
      }), e.ccall("em_page_end", null, ["number", "number"], [d, l.items.length]);
    }), e.ccall("em_pages_commit", null, ["number"], [t.pages.length]), e.ccall(
      "em_set_style",
      null,
      ["number", "number", "number", "number", "number", "number", "number"],
      [
        this.fontIndex(t.font),
        { default: 0, rotundity: 1, square: 2 }[t.selector],
        s(t.selectorLeftMargin),
        s(t.selectorTopMargin),
        s(t.selectorLineSpacing),
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
      const u = Math.min(100, Math.round(e - this.lastT));
      this.lastT = e, this.renderFrame(u), this.raf = requestAnimationFrame(t);
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
    const u = e._em_frame(t);
    if (!u) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const s = e.HEAPU8.subarray(u, u + nt), r = this.img.data;
    r.fill(255);
    for (let d = 0; d < 64; d++) {
      const i = (d >> 3) * 128, c = 1 << (d & 7);
      let h = d * 128 * 4;
      for (let f = 0; f < 128; f++)
        s[i + f] & c && (r[h] = 17, r[h + 1] = 24, r[h + 2] = 39), h += 4;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const n = e._em_get_current_page();
    n !== this.lastKnownPage && (this.lastKnownPage = n, (l = (o = this.events).onPageChanged) == null || l.call(o, n));
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
const rt = Object.keys(le);
function st(a, t, e, u) {
  const s = a.getState(), r = e.label || "text" in e && e.text || le[e.kind], n = (o) => (l) => {
    l.stopPropagation(), a.getState().moveItem(t.id, e.id, o);
  };
  return v`<div class="ume-item-row ${u ? "selected" : ""}"
    @click=${() => a.getState().select(t.id, e.id)}>
    <span class="ume-item-icon">${Re[e.kind]}</span>
    <span class="ume-item-name" title=${r}>${r}</span>
    <button class="ume-mini" title="上移" @click=${n(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${n(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(o) => {
    o.stopPropagation(), s.duplicateItem(t.id, e.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(o) => {
    o.stopPropagation(), s.removeItem(t.id, e.id);
  }}>✕</button>
  </div>`;
}
function ut(a, t) {
  const e = a.getState();
  return v`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(u) => {
    const s = u.target.value;
    s && e.addItem(s, t.id), u.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${rt.map((u) => v`<option value=${u}>${le[u]}</option>`)}
  </select>`;
}
function ot(a, t) {
  const { project: e, selection: u } = t.getState(), s = (r) => {
    const n = t.getState(), o = u.pageId === r.id;
    return v`<div class="ume-page">
      <div class="ume-page-head ${o ? "selected" : ""}"
        @click=${() => t.getState().select(r.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${r.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(l) => {
      l.stopPropagation(), n.movePage(r.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(l) => {
      l.stopPropagation(), n.movePage(r.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(l) => {
      if (l.stopPropagation(), e.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${r.name}"？`) && n.removePage(r.id);
    }}>✕</button>
      </div>
      ${o ? v`<div class="ume-page-items">
        ${r.items.length ? r.items.map((l) => st(t, r, l, u.itemId === l.id)) : v`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${ut(t, r)}</div>
      </div>` : L}
    </div>`;
  };
  te(v`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => lt(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(s)}
  `, a);
}
function lt(a) {
  const t = prompt("页面名称:", `页面${a.getState().project.pages.length + 1}`);
  t !== null && a.getState().addPage(t || void 0);
}
function D(a, t, e, u = "") {
  return v`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${t ?? ""} placeholder=${u}
      @change=${(s) => e(s.target.value)} />
  </div>`;
}
function N(a, t, e, u = 1) {
  return v`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(t)} step=${String(u)}
      @change=${(s) => {
    const r = parseFloat(s.target.value);
    e(Number.isFinite(r) ? r : 0);
  }} />
  </div>`;
}
function H(a, t, e, u) {
  return v`<div class="ume-field">
    <label>${a}</label>
    <select @change=${(s) => u(s.target.value)}>
      ${e.map((s) => v`<option value=${s.value} ?selected=${s.value === t}>${s.label}</option>`)}
    </select>
  </div>`;
}
function he(a, t, e) {
  return v`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${(u) => e(u.target.checked)} />
    <span>${a}</span>
  </div>`;
}
function ct(a, t, e, u = !1) {
  return v`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${u ? "font-family:Consolas,monospace" : ""}
      @change=${(s) => e(s.target.value)}>${t ?? ""}</textarea>
  </div>`;
}
function _e(a, t, e = "text/plain") {
  const u = new Blob([t], { type: `${e};charset=utf-8` }), s = document.createElement("a");
  s.href = URL.createObjectURL(u), s.download = a, s.click(), setTimeout(() => URL.revokeObjectURL(s.href), 5e3);
}
const dt = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]), Ae = {
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
function ge(a, t, e, u) {
  const s = [
    { value: "", label: "（未绑定）" },
    ...e.map((n) => ({ value: n.id, label: `${n.name} : ${Ae[n.type] ?? n.type}` }))
  ], r = t ? e.some((n) => n.id === t) : !1;
  return v`
    ${H(a, t ?? "", s, (n) => u(n || null))}
    ${t && !r ? v`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>` : L}
    ${e.length === 0 ? v`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>` : L}
  `;
}
function ve(a, t, e) {
  return v`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
    const u = a.getState().addVariable();
    a.getState().updateItem(t, e, { varId: u.id });
  }}>＋ 新建变量并绑定</button>
  </div>`;
}
function xe(a) {
  return a ? v`<div class="ume-hint">
    ${a.name} : ${Ae[a.type] ?? a.type}，范围 ${a.min}~${a.max}，步长 ${a.step}，初值 ${a.initialValue}
    （在右侧「变量」区修改）
  </div>` : v`${L}`;
}
function mt(a, t, e) {
  const { project: u, selection: s } = t.getState(), r = u.pages.find((i) => i.id === s.pageId) ?? null, n = (r == null ? void 0 : r.items.find((i) => i.id === s.itemId)) ?? null, o = (i, c) => t.getState().updateItem(r.id, n.id, i, c);
  let l = v`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, d = "属性";
  if (r && !n)
    d = "页面属性", l = v`
      ${D("名称", r.name, (i) => t.getState().updatePage(r.id, { name: i }))}
      ${D("C 函数名", r.fnName, (i) => t.getState().updatePage(r.id, { fnName: i }), "留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;
  else if (r && n)
    switch (d = `${le[n.kind]}`, n.kind) {
      case "text":
        l = v`
          ${D("文本/格式", n.text, (i) => o({ text: i }, `text-${n.id}`))}
          ${H("大小", String(n.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (i) => o({ scale: Number(i) }))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      case "number": {
        const i = n, c = u.variables ?? [], h = c.find((x) => x.id === i.varId), f = h && (h.type === "float" || h.type === "double") ? "float/double 推荐格式 %.1f / %.2f" : "整数推荐格式 %d（无符号用 %u）";
        l = v`
          ${ge("绑定变量", i.varId, c, (x) => o({ varId: x }))}
          ${h ? L : ve(t, r.id, i.id)}
          ${he("可编辑（绑定附加值，取消则仅显示）", i.editable !== !1, (x) => o({ editable: x }))}
          ${xe(h)}
          ${D("显示文本", i.text, (x) => o({ text: x }, `text-${n.id}`))}
          ${H("大小", String(i.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (x) => o({ scale: Number(x) }))}
          <div class="ume-hint">${f}；文本支持 \n 多行</div>
        `;
        break;
      }
      case "switch": {
        const i = n, c = (u.variables ?? []).filter((f) => f.type === "uint8"), h = c.find((f) => f.id === i.varId) ?? (u.variables ?? []).find((f) => f.id === i.varId);
        l = v`
          ${ge("绑定变量", i.varId, c, (f) => o({ varId: f }))}
          ${h ? L : ve(t, r.id, i.id)}
          ${xe(h)}
          ${D("显示文本", i.text, (f) => o({ text: f }, `text-${n.id}`))}
          ${N("openValue", i.openValue, (f) => o({ openValue: Math.max(0, Math.trunc(f)) }))}
          ${D('"开"文本', i.onText, (f) => o({ onText: f }))}
          ${D('"关"文本', i.offText, (f) => o({ offText: f }))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case "button": {
        const i = n;
        l = v`
          ${D("显示文本", i.text, (c) => o({ text: c }, `text-${n.id}`))}
          ${D("回调函数名", i.cbName, (c) => o({ cbName: c }))}
          ${N("ID", i.buttonId, (c) => o({ buttonId: Math.trunc(c) }))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;
        break;
      }
      case "submenu": {
        const i = n;
        l = v`
          ${D("显示文本", i.text, (c) => o({ text: c }, `text-${n.id}`))}
          ${H("目标页面", i.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...u.pages.filter((c) => c.id !== r.id).map((c) => ({ value: c.id, label: c.name }))
        ], (c) => o({ targetPageId: c || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;
        break;
      }
      case "back": {
        l = v`
          ${D("显示文本", n.text, (i) => o({ text: i }, `text-${n.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const i = (u.variables ?? []).filter((h) => dt.has(h.type)), c = i.find((h) => h.id === n.varId) ?? (u.variables ?? []).find((h) => h.id === n.varId);
        l = v`
          ${ge("绑定变量", n.varId, i, (h) => o({ varId: h }))}
          ${c ? L : ve(t, r.id, n.id)}
          ${xe(c)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;
        break;
      }
      case "chart": {
        const i = n, c = u.chartBuffers ?? [], h = (x) => o({ sources: x }), f = (x, j) => {
          const z = c.find((S) => S.id === x.bufferId), q = x.min === void 0 || x.max === void 0;
          return v`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(z == null ? void 0 : z.name) ?? "(无效)"}</span>
              <span class="ume-var-meta">${{ line: "折线", point: "散点", bar: "柱状" }[x.chartKind] ?? x.chartKind}${q ? " · 自动量程" : ` · ${x.min}~${x.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${() => h(i.sources.filter((S, E) => E !== j))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${H("缓冲区", x.bufferId, c.map((S) => ({ value: S.id, label: `${S.name} (${S.dataLen}点)` })), (S) => h(i.sources.map((E, B) => B === j ? { ...E, bufferId: S } : E)))}
              ${H("绘制", x.chartKind, [
            { value: "line", label: "折线" },
            { value: "point", label: "散点" },
            { value: "bar", label: "柱状" }
          ], (S) => h(i.sources.map((E, B) => B === j ? { ...E, chartKind: S } : E)))}
              ${he("自动量程", q, (S) => h(i.sources.map((E, B) => B === j ? { ...E, min: S ? void 0 : 0, max: S ? void 0 : 100 } : E)))}
              ${q ? L : v`
                ${N("量程上限", x.max ?? 100, (S) => h(i.sources.map((E, B) => B === j ? { ...E, max: S } : E)), "any")}
                ${N("量程下限", x.min ?? 0, (S) => h(i.sources.map((E, B) => B === j ? { ...E, min: S } : E)), "any")}`}
            </div>
          </div>`;
        };
        l = v`
          ${N("高度(px)", i.height, (x) => o({ height: Math.max(4, Math.trunc(x)) }))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(i.sources ?? []).map(f)}
              ${(i.sources ?? []).length === 0 ? v`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>` : L}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(i.sources ?? []).length >= 4}
                @click=${() => {
          if (!c.length) {
            const x = t.getState().addChartBuffer();
            h([...i.sources ?? [], { bufferId: x.id, chartKind: "line" }]);
            return;
          }
          h([...i.sources ?? [], { bufferId: c[0].id, chartKind: "line" }]);
        }}>＋ 添加数据源${(i.sources ?? []).length > 0 ? "（叠加）" : ""}</button>
              ${c.length ? L : v`<div class="ume-hint">将自动新建数据源缓冲区（在右侧「数据源」区可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;
        break;
      }
      case "xbm": {
        const i = n;
        l = v`
          ${D("数组名", i.name, (c) => o({ name: c }))}
          ${N("宽(px)", i.w, (c) => o({ w: Math.min(128, Math.max(1, Math.trunc(c))) }))}
          ${N("高(px)", i.h, (c) => o({ h: Math.min(64, Math.max(1, Math.trunc(c))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => e.openXbmEditor(r.id, i.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${i.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const i = n;
        l = v`
          ${ct("文本内容", i.content, (c) => o({ content: c }))}
          ${N("高度(px)", i.height, (c) => o({ height: Math.max(10, Math.trunc(c)) }))}
          ${N("行间距", i.lineSpacing, (c) => o({ lineSpacing: Math.max(0, Math.trunc(c)) }))}
          ${he("上下键滚动 (bind)", i.bindScroll, (c) => o({ bindScroll: c }))}
        `;
        break;
      }
      case "board": {
        const i = n;
        l = v`
          ${N("宽(px)", i.w, (c) => o({ w: Math.max(1, Math.trunc(c)) }))}
          ${N("高(px)", i.h, (c) => o({ h: Math.max(1, Math.trunc(c)) }))}
          ${D("回调函数名", i.cbName, (c) => o({ cbName: c }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
  te(v`
    <div class="ume-panel-title">属性 ${d !== "属性" ? v`<span class="ume-kind-badge">${d}</span>` : L}</div>
    ${l}
  `, a);
}
let ue = null, $e = null;
const pt = [
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
function bt(a, t) {
  const e = t.variables ?? [], u = (r) => {
    ue = ue === r ? null : r;
  }, s = (r) => {
    const n = ue === r.id, o = (c, h) => a.getState().updateVariable(r.id, c, h), l = r.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name), d = e.filter((c) => c.name === r.name).length > 1, i = ft(t, r.id);
    return v`<div class="ume-var-item ${n ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => u(r.id)}>
        <span class="ume-var-name" title=${r.name}>${r.name || "(未命名)"}</span>
        <span class="ume-var-meta">${r.type} · ${r.min}~${r.max} · 步${r.step}${i ? ` · ${i} 处引用` : ""}</span>
        <button class="ume-mini" title="删除变量" @click=${(c) => {
      c.stopPropagation();
      const h = a.getState().removeVariable(r.id);
      h > 0 && alert(`该变量被 ${h} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`);
    }}>✕</button>
      </div>
      ${n ? v`<div class="ume-var-edit">
        ${D("变量名", r.name, (c) => o({ name: c.trim() }, `vn-${r.id}`))}
        ${l ? v`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>` : L}
        ${d ? v`<div class="ume-warn">变量名重复，生成时以第一个为准</div>` : L}
        ${H("类型", r.type, pt, (c) => o({ type: c }))}
        ${N("初始值", r.initialValue, (c) => o({ initialValue: c }, `vi-${r.id}`), "any")}
        ${N("最小值", r.min, (c) => o({ min: c }, `vmin-${r.id}`), "any")}
        ${N("最大值", r.max, (c) => o({ max: c }, `vmax-${r.id}`), "any")}
        ${N("步长", r.step, (c) => o({ step: c }, `vs-${r.id}`), "any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>` : L}
    </div>`;
  };
  return v`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${() => {
    ue = a.getState().addVariable().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(s) : v`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `;
}
function ft(a, t) {
  let e = 0;
  for (const u of a.pages)
    for (const s of u.items)
      "varId" in s && s.varId === t && e++;
  return e;
}
function ht(a, t) {
  const e = t.chartBuffers ?? [], u = (r) => {
    let n = 0;
    for (const o of t.pages)
      for (const l of o.items)
        l.kind === "chart" && l.sources.some((d) => d.bufferId === r) && n++;
    return n;
  }, s = (r) => {
    const n = $e === r.id, o = (i, c) => a.getState().updateChartBuffer(r.id, i, c), l = r.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name), d = u(r.id);
    return v`<div class="ume-var-item ${n ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => {
      $e = n ? null : r.id;
    }}>
        <span class="ume-var-name" title=${r.name}>${r.name || "(未命名)"}</span>
        <span class="ume-var-meta">${r.dataLen} 点 · ${{ sine: "正弦", ramp: "斜坡", noise: "伪随机", none: "手动填充" }[r.sample]}${d ? ` · ${d} 处引用` : ""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${(i) => {
      i.stopPropagation();
      const c = a.getState().removeChartBuffer(r.id);
      c > 0 && alert(`该缓冲区被 ${c} 个图表条目的数据源引用，请先在条目里移除数据源再删除`);
    }}>✕</button>
      </div>
      ${n ? v`<div class="ume-var-edit">
        ${D("数组名", r.name, (i) => o({ name: i.trim() }, `bn-${r.id}`))}
        ${l ? v`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>` : L}
        ${N("点数", r.dataLen, (i) => o({ dataLen: Math.min(512, Math.max(2, Math.trunc(i))) }, `bl-${r.id}`))}
        ${H("示例填充", r.sample, [
      { value: "sine", label: "正弦（演示）" },
      { value: "ramp", label: "斜坡（演示）" },
      { value: "noise", label: "伪随机（演示）" },
      { value: "none", label: "不填充（全部手写）" }
    ], (i) => o({ sample: i }))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>` : L}
    </div>`;
  };
  return v`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${() => {
    $e = a.getState().addChartBuffer().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(s) : v`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `;
}
function gt(a, t) {
  const { project: e } = t.getState(), u = (o, l) => t.getState().update((d) => {
    Object.assign(d, o);
  }, l), s = e.weakHooks ?? [], r = (o, l) => {
    t.getState().update((d) => {
      const i = d.weakHooks ?? [];
      d.weakHooks = l ? [.../* @__PURE__ */ new Set([...i, o])] : i.filter((c) => c !== o);
    });
  }, n = v`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${s.length}/${ee.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${ee.map((o) => v`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote ? "（返回 1 = 事件已处理 / 0 = 交给库）" : ""}`}>
              <input type="checkbox" ?checked=${s.includes(o.fn)}
                @change=${(l) => r(o.fn, l.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;
  te(v`
    <div class="ume-panel-title">工程</div>
    ${D("工程名", e.name, (o) => u({ name: o }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width !== 128 || e.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    ${bt(t, e)}
    ${ht(t, e)}

    <div class="ume-panel-title">样式</div>
    ${H(
    "字体",
    e.font,
    Oe.map((o) => ({ value: o.id, label: o.label })),
    (o) => u({ font: o })
  )}
    ${H("选择器", e.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (o) => u({ selector: o }))}
    ${N("左边距", e.selectorLeftMargin, (o) => u({ selectorLeftMargin: Math.max(0, Math.trunc(o)) }))}
    ${N("顶边距", e.selectorTopMargin, (o) => u({ selectorTopMargin: Math.max(0, Math.trunc(o)) }))}
    ${N("行间距", e.selectorLineSpacing, (o) => u({ selectorLineSpacing: Math.max(0, Math.trunc(o)) }))}
    ${N("跑马灯速度", e.marqueeSpeed, (o) => u({ marqueeSpeed: o }), 0.05)}
    ${N("跑马灯停留", e.marqueeHeaderLen, (o) => u({ marqueeHeaderLen: o }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${n}
    ${L}
  `, a);
}
function vt(a, t) {
  const e = (s) => {
    let r;
    const n = () => {
      r && (clearInterval(r), r = void 0);
    };
    return {
      down: (o) => {
        o.preventDefault(), t.key(s), n(), r = window.setInterval(() => t.key(s), 180);
      },
      up: n
    };
  }, u = (s, r, n) => {
    const o = e(s);
    return v`<button class="ume-key" title=${n}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${r}</button>`;
  };
  te(v`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(s) => {
    const n = {
      ArrowUp: K.Up,
      ArrowDown: K.Down,
      Enter: K.Enter,
      Escape: K.Return,
      Backspace: K.Return,
      "+": K.Add,
      "-": K.Sub,
      "=": K.Add,
      _: K.Sub
    }[s.key];
    n !== void 0 && (s.preventDefault(), t.key(n));
  }}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${u(K.Up, "▲", "上 MENU_Key_Up")}
      ${u(K.Down, "▼", "下 MENU_Key_Down")}
      ${u(K.Enter, "OK", "确认 MENU_Key_Enter")}
      ${u(K.Return, "⌫", "返回 MENU_Key_Return")}
      ${u(K.Add, "＋", "加 MENU_Key_Add")}
      ${u(K.Sub, "－", "减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `, a);
}
let J = null;
function xt(a, t) {
  J = t, a.querySelectorAll(":scope > .ume-modal-mask").forEach((e) => e.remove()), $t(a);
}
function $t(a) {
  if (!J) return;
  const t = document.createElement("div");
  t.className = "ume-modal-mask", t.addEventListener("click", (e) => {
    e.target === t && Ie(t);
  }), te(v`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${() => Ie(t)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${J.warnings.length ? v`
          <div style="margin-bottom:8px">
            ${J.warnings.map((e) => v`<div class="ume-warn">⚠ ${e}</div>`)}
          </div>` : L}
        <div class="ume-code-view">${J.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${() => {
    navigator.clipboard.writeText(J.c).then(() => _t(t, "已复制到剪贴板"));
  }}>复制</button>
        <button class="ume-btn primary" @click=${() => {
    _e("menu_pages.c", J.c);
  }}>下载 menu_pages.c</button>
      </div>
    </div>
  `, t), a.appendChild(t);
}
function Ie(a) {
  a.remove();
}
function _t(a, t) {
  const e = a.closest(".ume") ?? document.body;
  let u = e.querySelector(".ume-toast");
  u || (u = document.createElement("div"), u.className = "ume-toast", e.appendChild(u)), u.textContent = t, u.classList.add("show"), setTimeout(() => u.classList.remove("show"), 1600);
}
function wt(a, t, e, u) {
  const r = t.getState().project.pages.find((p) => p.id === e), n = r == null ? void 0 : r.items.find((p) => p.id === u);
  if (!n || n.kind !== "xbm") return;
  const o = n;
  let l = o.w, d = o.h, i = [...o.bits];
  const c = () => Math.ceil(l / 8), h = document.createElement("div");
  h.className = "ume-modal-mask", h.addEventListener("click", (p) => {
    p.target === h && Q();
  });
  const f = (p, M) => {
    const V = M * c() + (p >> 3);
    return V < i.length ? !!(i[V] >> (p & 7) & 1) : !1;
  }, x = (p, M, V) => {
    const m = M * c() + (p >> 3);
    i[m] = V ? i[m] | 1 << (p & 7) : i[m] & ~(1 << (p & 7));
  }, j = (p, M) => {
    const V = Math.ceil(l / 8), m = Math.ceil(p / 8), $ = new Array(m * M).fill(0);
    for (let b = 0; b < Math.min(d, M); b++)
      for (let w = 0; w < Math.min(l, p); w++) {
        const y = b * V + (w >> 3);
        y < i.length && i[y] >> (w & 7) & 1 && ($[b * m + (w >> 3)] |= 1 << (w & 7));
      }
    l = p, d = M, i = $;
  };
  let z = !1, q = !0;
  const S = (p, M) => (V) => {
    V.preventDefault(), z = !0, q = !f(p, M), x(p, M, q), P();
  }, E = (p, M) => () => {
    z && (x(p, M, q), P());
  }, B = () => {
    z = !1;
  }, P = () => {
    te(ce(), h);
  }, ie = () => {
    const p = [];
    for (let M = 0; M < d; M++)
      for (let V = 0; V < l; V++)
        p.push(v`<button class="ume-xbm-cell ${f(V, M) ? "on" : ""}"
          data-x=${V} data-y=${M}
          @pointerdown=${S(V, M)}
          @pointerenter=${E(V, M)}></button>`);
    return p;
  }, ce = () => v`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${d}</span></span>
        <button class="ume-mini" @click=${Q}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${B}
        @pointerleave=${B}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${(p) => {
    j(Se(+p.target.value, 1, 128), d), P();
  }} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${(p) => {
    j(l, Se(+p.target.value, 1, 64)), P();
  }} />
          <button class="ume-btn sm" @click=${() => {
    i = i.map(() => 0), P();
  }}>清空</button>
          <button class="ume-btn sm" @click=${() => {
    i = i.map((p) => ~p & 255), P();
  }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${ie()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${Q}>取消</button>
        <button class="ume-btn primary" @click=${() => {
    t.getState().updateItem(e, u, { w: l, h: d, bits: [...i] }), Q();
  }}>应用</button>
      </div>
    </div>
  `;
  function Q() {
    h.remove(), document.removeEventListener("pointerup", B);
  }
  document.addEventListener("pointerup", B), P(), a.appendChild(h);
}
function Se(a, t, e) {
  return Number.isFinite(a) ? Math.min(e, Math.max(t, Math.trunc(a))) : t;
}
const yt = "prebuilt/u8g2-menu-preview.js";
class St {
  constructor(t, e = {}) {
    var d;
    if (this.store = Ee(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.container = t, this.opts = { persistKey: "default", ...e }, t.classList.add("ume"), !document.getElementById("ume-style")) {
      const i = document.createElement("style");
      i.id = "ume-style", i.textContent = Te, document.head.appendChild(i);
    }
    const u = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, s = this.opts.data ?? u ?? void 0;
    if (s !== void 0)
      try {
        this.store.setState({ project: be(s) });
      } catch (i) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", i);
      }
    const r = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null;
    r && (this.lastExport = { c: r }), t.innerHTML = `
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
    const n = (i) => t.querySelector(i);
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
    o.style.display = "flex", o.style.flexDirection = "column", o.style.alignItems = "center", o.style.gap = "10px", this.els.center.appendChild(o), this.preview = new it(o, {
      onPageChanged: (i) => this.onPreviewPageChanged(i)
    });
    const l = document.createElement("div");
    this.els.center.appendChild(l), vt(l, this.preview), this.preview.load(this.opts.wasmUrl ?? yt).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((i) => {
      console.error(i);
      const c = document.createElement("div");
      c.className = "ume-warn", c.textContent = `预览引擎加载失败: ${i.message}。编辑功能不受影响。`, this.els.center.prepend(c);
    }), t.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const i = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      i !== null && this.store.getState().addPage(i || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), t.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      _e(
        `${this.store.getState().project.name || "menu-project"}.json`,
        ye(this.store.getState().project),
        "application/json"
      );
    }), t.querySelector('[data-act="import"]').addEventListener("click", () => {
      n('[data-role="file"]').click();
    }), n('[data-role="file"]').addEventListener("change", (i) => {
      var h;
      const c = (h = i.target.files) == null ? void 0 : h[0];
      c && (c.text().then((f) => {
        try {
          const x = be(f);
          this.store.getState().update((j) => {
            Object.assign(j, x);
          }), this.scheduleRender();
        } catch (x) {
          alert(`导入失败: ${x.message}`);
        }
      }), i.target.value = "");
    }), t.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate()), this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((d = this.store.getState().project.pages[0]) == null ? void 0 : d.id) ?? null, null), this.store.subscribe(() => {
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
    var u;
    const e = be(t);
    this.store.getState().update((s) => {
      Object.assign(s, e);
    }), this.store.getState().select(((u = e.pages[0]) == null ? void 0 : u.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var u, s;
    const t = this.lastExport, e = ke(this.store.getState().project, t ?? void 0);
    return this.lastExport = { c: e.c }, this.opts.persistKey && localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, e.c), xt(this.container, e), (s = (u = this.opts).onExport) == null || s.call(u, e), e;
  }
  downloadC() {
    const t = ke(this.store.getState().project, this.lastExport ?? void 0);
    this.lastExport = { c: t.c }, _e("menu_pages.c", t.c);
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
          ye(this.store.getState().project)
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
      ot(this.els.left, this.store), gt(this.els.styleEl, this.store), mt(this.els.propEl, this.store, {
        openXbmEditor: (e, u) => wt(this.container, this.store, e, u)
      }), this.els.toolbarUndo.disabled = t.past.length === 0, this.els.toolbarRedo.disabled = t.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var r;
    const t = document.getElementById("ume-live-value"), e = document.getElementById("ume-page-jump"), u = this.store.getState(), s = this.store.getState().project.pages.findIndex((n) => n.id === u.selection.pageId);
    if (e) {
      const n = u.project.pages, o = n.map((d) => d.name).join("|");
      e.dataset.sig !== o && (e.dataset.sig = o, e.innerHTML = "", n.forEach((d, i) => {
        const c = document.createElement("option");
        c.value = String(i), c.textContent = `${i + 1}. ${d.name}`, e.appendChild(c);
      }), e.onchange = () => {
        const d = parseInt(e.value, 10);
        Number.isFinite(d) && this.preview.navTo(d);
      });
      const l = this.preview.currentPage;
      document.activeElement !== e && e.value !== String(l) && (e.value = String(l));
    }
    if (t && s >= 0 && u.selection.itemId) {
      const n = u.project.pages[s], o = n.items.findIndex((d) => d.id === u.selection.itemId), l = n.items[o];
      if (l && "varId" in l) {
        const d = l.varId ? (u.project.variables ?? []).findIndex((f) => f.id === l.varId) : -1, i = d >= 0 ? d : s * 64 + o, c = l.kind === "switch" ? this.preview.getSwitch(i) : this.preview.getInt(i), h = (r = (u.project.variables ?? []).find((f) => f.id === l.varId)) == null ? void 0 : r.name;
        t.textContent = `${h ?? l.kind} = ${c}`;
      } else
        t.textContent = "";
    }
  }
}
export {
  St as MenuEditor,
  K as MenuKey
};
//# sourceMappingURL=u8g2-menu-editor.js.map
