import { createStore as Ke } from "zustand/vanilla";
import { render as ae, html as v, nothing as L } from "lit-html";
const De = `/* u8g2-menu-editor 样式（前缀 ume-） */
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
let fe = 0;
function z(a) {
  return fe = (fe + 1) % 1e9, `${a}_${Date.now().toString(36)}_${fe.toString(36)}`;
}
function de(a) {
  return {
    id: z("vb"),
    name: "var_new",
    type: "int32",
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
    ...a
  };
}
function Pe(a) {
  return {
    id: z("buf"),
    name: "buf_new",
    dataLen: 32,
    sample: "sine",
    ...a
  };
}
function Ue(a, t) {
  const e = new Set(a.map((u) => u.name));
  if (!e.has(t)) return t;
  let r = 2;
  for (; e.has(`${t}_${r}`); ) r++;
  return `${t}_${r}`;
}
function je(a, t) {
  const e = new Set(a.map((u) => u.name));
  if (!e.has(t)) return t;
  let r = 2;
  for (; e.has(`${t}_${r}`); ) r++;
  return `${t}_${r}`;
}
function O(a) {
  const t = { id: z("it"), label: "" };
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
      return ze(16, 16);
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
function ze(a, t) {
  const e = Math.ceil(a / 8);
  return {
    id: z("it"),
    kind: "xbm",
    label: "",
    name: "icon",
    w: a,
    h: t,
    bits: new Array(e * t).fill(0)
  };
}
function he(a) {
  return { id: z("pg"), name: a, fnName: "", items: [], userCodePre: "" };
}
function Y(a, t) {
  return { ...a, ...t };
}
function Re() {
  const a = [
    de({ name: "var_value", type: "int32", initialValue: 50, min: 0, max: 100, step: 1 }),
    de({ name: "var_switch", type: "uint8", initialValue: 0, min: 0, max: 1, step: 1 }),
    de({ name: "var_slider", type: "int32", initialValue: 50, min: 0, max: 100, step: 2 })
  ], t = [
    Pe({ name: "buf_demo", dataLen: 32, sample: "sine" })
  ], e = he("主页");
  e.items = [
    Y(O("text"), { text: "u8g2_menu" }),
    Y(O("submenu"), { text: "系统设置" }),
    Y(O("button"), { text: "关于", cbName: "btn_about_cb" })
  ];
  const r = he("设置");
  r.items = [
    Y(O("number"), { text: "音量:%d", varId: a[0].id }),
    Y(O("switch"), { text: "开关:%s", varId: a[1].id }),
    Y(O("slider"), { varId: a[2].id }),
    Y(O("submenu"), { text: "图表" }),
    O("back")
  ];
  const u = he("图表");
  u.items = [
    Y(O("chart"), {
      height: 36,
      sources: [{ bufferId: t[0].id, chartKind: "line" }]
    }),
    O("back")
  ];
  const i = {
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
    pages: [e, r, u]
  };
  return e.items[1].targetPageId = r.id, r.items[3].targetPageId = u.id, i;
}
function Oe(a) {
  return structuredClone(a);
}
const qe = 800;
function Ae() {
  let a = null, t = 0;
  return Ke()((e, r) => ({
    project: Re(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (u, i) => {
      const n = Date.now(), o = !!i && i === a && n - t < qe;
      a = i ?? null, t = n, e((l) => {
        const d = Oe(l.project);
        return u(d), {
          project: d,
          dirty: !0,
          past: o ? l.past : [...l.past.slice(-99), l.project],
          future: []
        };
      });
    },
    undo: () => {
      e((u) => u.past.length ? {
        project: u.past[u.past.length - 1],
        past: u.past.slice(0, -1),
        future: [u.project, ...u.future.slice(0, 99)],
        dirty: !0
      } : u);
    },
    redo: () => {
      e((u) => {
        if (!u.future.length) return u;
        const [i, ...n] = u.future;
        return {
          project: i,
          past: [...u.past, u.project],
          future: n,
          dirty: !0
        };
      });
    },
    select: (u, i = null) => e({ selection: { pageId: u, itemId: i } }),
    addPage: (u) => {
      const i = { id: z("pg"), name: u ?? `页面${r().project.pages.length + 1}`, fnName: "", items: [], userCodePre: "" };
      return r().update((n) => {
        n.pages.push(i);
      }), e({ selection: { pageId: i.id, itemId: null } }), i;
    },
    removePage: (u) => {
      r().update((n) => {
        n.pages = n.pages.filter((o) => o.id !== u);
        for (const o of n.pages)
          for (const l of o.items)
            l.kind === "submenu" && l.targetPageId === u && (l.targetPageId = null);
      });
      const { selection: i } = r();
      i.pageId === u && e({ selection: { pageId: null, itemId: null } });
    },
    movePage: (u, i) => {
      r().update((n) => {
        const o = n.pages.findIndex((d) => d.id === u), l = o + i;
        o < 0 || l < 0 || l >= n.pages.length || ([n.pages[o], n.pages[l]] = [n.pages[l], n.pages[o]]);
      });
    },
    updatePage: (u, i) => {
      r().update((n) => {
        const o = n.pages.find((l) => l.id === u);
        o && Object.assign(o, i);
      });
    },
    addItem: (u, i) => {
      var l;
      const n = i ?? r().selection.pageId ?? ((l = r().project.pages[0]) == null ? void 0 : l.id);
      if (!n) return null;
      const o = He(u);
      return r().update((d) => {
        const s = d.pages.find((c) => c.id === n);
        s == null || s.items.push(o);
      }), e({ selection: { pageId: n, itemId: o.id } }), o;
    },
    removeItem: (u, i) => {
      r().update((o) => {
        const l = o.pages.find((d) => d.id === u);
        l && (l.items = l.items.filter((d) => d.id !== i));
      });
      const { selection: n } = r();
      n.itemId === i && e({ selection: { pageId: u, itemId: null } });
    },
    moveItem: (u, i, n) => {
      r().update((o) => {
        const l = o.pages.find((c) => c.id === u);
        if (!l) return;
        const d = l.items.findIndex((c) => c.id === i), s = d + n;
        d < 0 || s < 0 || s >= l.items.length || ([l.items[d], l.items[s]] = [l.items[s], l.items[d]]);
      });
    },
    duplicateItem: (u, i) => {
      let n = null;
      r().update((o) => {
        const l = o.pages.find((s) => s.id === u);
        if (!l) return;
        const d = l.items.findIndex((s) => s.id === i);
        d < 0 || (n = structuredClone(l.items[d]), n.id = z("it"), l.items.splice(d + 1, 0, n));
      }), n && e({ selection: { pageId: u, itemId: n.id } });
    },
    updateItem: (u, i, n, o) => {
      r().update((l) => {
        const d = l.pages.find((c) => c.id === u), s = d == null ? void 0 : d.items.find((c) => c.id === i);
        s && Object.assign(s, n);
      }, o);
    },
    addVariable: (u) => {
      let i = null;
      return r().update((n) => {
        n.variables = n.variables ?? [];
        const o = je(n.variables, (u == null ? void 0 : u.name) ?? "var_new");
        i = de({ ...u, name: o }), n.variables.push(i);
      }), i;
    },
    removeVariable: (u) => {
      let i = 0;
      for (const n of r().project.pages)
        for (const o of n.items)
          "varId" in o && o.varId === u && i++;
      return i > 0 ? i : (r().update((n) => {
        n.variables = (n.variables ?? []).filter((o) => o.id !== u);
      }), 0);
    },
    updateVariable: (u, i, n) => {
      r().update((o) => {
        const l = (o.variables ?? []).find((d) => d.id === u);
        l && Object.assign(l, i);
      }, n);
    },
    addChartBuffer: (u) => {
      let i = null;
      return r().update((n) => {
        n.chartBuffers = n.chartBuffers ?? [];
        const o = Ue(n.chartBuffers, (u == null ? void 0 : u.name) ?? "buf_new");
        i = Pe({ ...u, name: o }), n.chartBuffers.push(i);
      }), i;
    },
    removeChartBuffer: (u) => {
      let i = 0;
      for (const n of r().project.pages)
        for (const o of n.items)
          o.kind === "chart" && o.sources.some((l) => l.bufferId === u) && i++;
      return i > 0 ? i : (r().update((n) => {
        n.chartBuffers = (n.chartBuffers ?? []).filter((o) => o.id !== u);
      }), 0);
    },
    updateChartBuffer: (u, i, n) => {
      r().update((o) => {
        const l = (o.chartBuffers ?? []).find((d) => d.id === u);
        l && Object.assign(l, i);
      }, n);
    }
  }));
}
Ae();
function He(a) {
  return O(a);
}
const ge = 1, ne = [
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
], pe = {
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
}, Fe = {
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
}, Xe = [
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
class Q extends Error {
}
const Le = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int", "float", "double"]), Ze = /* @__PURE__ */ new Set(["line", "point", "bar"]), Te = /* @__PURE__ */ new Set(["sine", "ramp", "noise", "none"]);
function se(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function V(a, t) {
  return typeof a == "string" ? a : t;
}
function I(a, t) {
  return typeof a == "number" && Number.isFinite(a) ? a : t;
}
const Ge = ["text", "number", "switch", "button", "submenu", "back", "slider", "progress", "chart", "xbm", "textarea", "board"];
function Ye(a) {
  if (!se(a)) throw new Q("条目格式错误");
  const t = a.kind;
  if (typeof t != "string" || !Ge.includes(t))
    throw new Q(`未知条目类型: ${String(t)}`);
  const e = structuredClone(a);
  switch (e.id = V(a.id, ""), e.id || (e.id = `it_${Math.random().toString(36).slice(2, 10)}`), e.label = V(a.label, ""), t) {
    case "text":
    case "number":
    case "switch":
    case "button":
    case "submenu":
    case "back":
      e.text = V(a.text, ""), e.scale = a.scale === 2 ? 2 : 1;
      break;
  }
  return e;
}
function Je(a) {
  if (!se(a)) throw new Q("页面格式错误");
  const t = Array.isArray(a.items) ? a.items.map(Ye) : [];
  return {
    id: V(a.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: V(a.name, "未命名页面"),
    fnName: V(a.fnName, ""),
    items: t,
    userCodePre: V(a.userCodePre, "")
  };
}
function We(a) {
  if (!se(a)) return null;
  const t = V(a.type, "int32");
  return {
    id: V(a.id, "") || z("vb"),
    name: V(a.name, ""),
    type: Le.has(t) ? t : "int32",
    initialValue: I(a.initialValue, 0),
    min: I(a.min, 0),
    max: I(a.max, 100),
    step: I(a.step, 1)
  };
}
function Qe(a) {
  if (!se(a)) return null;
  const t = V(a.sample, "sine");
  return {
    id: V(a.id, "") || z("buf"),
    name: V(a.name, ""),
    dataLen: Math.min(512, Math.max(2, Math.trunc(I(a.dataLen, 32)))),
    sample: Te.has(t) ? t : "sine"
  };
}
function et(a) {
  const t = /* @__PURE__ */ new Map(), e = [], r = (u, i) => {
    let n = t.get(u);
    return n || (n = i(), t.set(u, n), e.push(n)), n;
  };
  for (const u of a)
    for (const i of u.items) {
      const n = i;
      switch (i.kind) {
        case "number":
          if (n.varId === void 0 || n.varId === null) {
            const o = typeof n.varName == "string" && n.varName ? n.varName : "var_unnamed", l = r(o, () => ({
              id: z("vb"),
              name: o,
              type: Le.has(String(n.varType)) ? String(n.varType) : "int32",
              initialValue: I(n.initialValue, 0),
              min: I(n.min, 0),
              max: I(n.max, 100),
              step: I(n.step, 1)
            }));
            i.varId = l.id;
          }
          n.editable === void 0 && (i.editable = !0), delete n.varName, delete n.varType, delete n.step, delete n.min, delete n.max, delete n.initialValue, delete n.decimals;
          break;
        case "slider":
        case "progress":
          if (n.varId === void 0 || n.varId === null) {
            const o = typeof n.varName == "string" && n.varName ? n.varName : "var_unnamed", l = r(o, () => ({
              id: z("vb"),
              name: o,
              type: "int",
              initialValue: I(n.initialValue, 0),
              min: I(n.min, 0),
              max: I(n.max, 100),
              step: I(n.step, 1)
            }));
            i.varId = l.id;
          }
          delete n.varName, delete n.step, delete n.min, delete n.max, delete n.initialValue;
          break;
        case "switch":
          if (n.varId === void 0 || n.varId === null) {
            const o = typeof n.varName == "string" && n.varName ? n.varName : "var_unnamed", l = r(o, () => ({
              id: z("vb"),
              name: o,
              type: "uint8",
              initialValue: I(n.initialValue, 0),
              min: 0,
              max: 1,
              step: 1
            }));
            i.varId = l.id;
          }
          delete n.varName, delete n.initialValue;
          break;
      }
    }
  return e;
}
function ve(a) {
  let t;
  if (typeof a == "string")
    try {
      t = JSON.parse(a);
    } catch {
      throw new Q("JSON 解析失败");
    }
  else
    t = a;
  if (!se(t)) throw new Q("不是有效的工程文件");
  const e = t, r = I(e.version, 0);
  if (r > ge)
    throw new Q(`工程版本 v${r} 高于当前支持的 v${ge}，请升级编辑器`);
  const u = Array.isArray(e.pages) ? e.pages.map(Je) : [];
  if (!u.length) throw new Q("工程至少需要一个页面");
  const i = ["default", "rotundity", "square"].includes(e.selector) ? e.selector : "rotundity", n = new Set(ne.map((s) => s.fn)), o = Array.isArray(e.weakHooks) ? [...new Set(e.weakHooks.filter((s) => typeof s == "string" && n.has(s)))] : [];
  let l;
  Array.isArray(e.variables) ? l = e.variables.map(We).filter((s) => !!s) : l = et(u);
  let d;
  return Array.isArray(e.chartBuffers) ? d = e.chartBuffers.map(Qe).filter((s) => !!s) : d = tt(u), {
    version: ge,
    name: V(e.name, "未命名工程"),
    width: I(e.width, 128),
    height: I(e.height, 64),
    font: V(e.font, "u8g2_font_wqy12_t_gb2312"),
    selector: i,
    selectorLeftMargin: I(e.selectorLeftMargin, 16),
    selectorTopMargin: I(e.selectorTopMargin, 0),
    selectorLineSpacing: I(e.selectorLineSpacing, 0),
    marqueeSpeed: I(e.marqueeSpeed, 0.2),
    marqueeHeaderLen: I(e.marqueeHeaderLen, 5),
    weakHooks: o,
    variables: l,
    chartBuffers: d,
    pages: u
  };
}
function tt(a) {
  const t = [];
  let e = 0;
  const r = () => {
    const u = {
      id: z("buf"),
      name: `buf_chart_${++e}`,
      dataLen: 32,
      sample: "sine"
    };
    return t.push(u), u;
  };
  for (const u of a)
    for (const i of u.items) {
      if (i.kind !== "chart") continue;
      const n = i;
      if (Array.isArray(n.sources)) continue;
      const o = r();
      o.dataLen = Math.min(512, Math.max(2, Math.trunc(I(n.dataLen, 32))));
      const l = V(n.sample, "sine");
      Te.has(l) && (o.sample = l);
      const d = V(n.chartKind, "line"), s = {
        bufferId: o.id,
        chartKind: Ze.has(d) ? d : "line"
      };
      n.max !== void 0 && n.max !== null && (s.max = I(n.max, 0)), n.min !== void 0 && n.min !== null && (s.min = I(n.min, 0)), i.sources = [s], n.height === void 0 && (i.height = 32), delete n.chartKind, delete n.dataLen, delete n.sample, delete n.max, delete n.min;
    }
  return t;
}
function Se(a) {
  return JSON.stringify(a, null, 2);
}
const nt = {
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
function ie(a) {
  return a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function J(a) {
  if (!Number.isFinite(a)) return "0.0f";
  const t = a.toString();
  return /[-.]|e/i.test(t) ? `${t}f` : `${t}.0f`;
}
function at(a, t, e) {
  return e === "ramp" ? `${a}[i] = (float)i;` : e === "noise" ? `${a}[i] = (float)((i * 37) % ${t});` : `${a}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`;
}
function it(a) {
  const t = /* @__PURE__ */ new Map();
  if (!a) return t;
  const e = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let r;
  for (; (r = e.exec(a)) !== null; ) t.set(r[1], r[2]);
  return t;
}
function R(a, t, e) {
  const r = t.has(a) ? t.get(a) : "";
  return `${e}/* USER CODE BEGIN ${a} */${r}${e}/* USER CODE END ${a} */`;
}
const st = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]);
function Me(a, t) {
  const e = [], r = it((t == null ? void 0 : t.c) ?? ""), u = a.pages.map((m, x) => m.fnName && /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName) ? m.fnName : `page_${x}`), i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const m of a.variables ?? []) {
    if (!m.name) {
      e.push("存在未命名变量，已跳过");
      continue;
    }
    if (i.has(m.name)) {
      e.push(`变量名 "${m.name}" 重复，以第一个为准`);
      continue;
    }
    /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.name) || e.push(`变量名 "${m.name}" 不是合法的 C 标识符，已清洗为 "${Z(m.name)}"`);
    const x = Z(m.name, "var"), b = m.type === "float" || m.type === "double", w = {
      name: x,
      srcType: m.type,
      type: nt[m.type],
      init: b ? J(m.initialValue) : String(Math.trunc(m.initialValue)),
      isFloat: b,
      step: m.step,
      min: m.min,
      max: m.max
    };
    i.set(x, w), n.set(m.id, w);
  }
  const o = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), d = [], s = /* @__PURE__ */ new Map();
  for (const m of a.chartBuffers ?? []) {
    if (!m.name) {
      e.push("存在未命名数据源缓冲区，已跳过");
      continue;
    }
    const x = Z(m.name, "buf");
    if ([...s.values()].some((_) => _.name === x)) {
      e.push(`缓冲区名 "${m.name}" 与其它缓冲区重名，已跳过`);
      continue;
    }
    const b = Math.max(2, Math.trunc(m.dataLen)), w = `${x.toUpperCase()}_LEN`;
    s.set(m.id, { name: x, lenMacro: w, len: b });
    const S = `fill_${x}`, g = (r.get(S) ?? "").trim() !== "";
    d.push(
      `#define ${w} ${b}`,
      `static float ${x}[${w}];`,
      `static uint8_t ${x}_filled = 0;`,
      `static void ${x}_fill(void)`,
      "{",
      R(S, r, "    "),
      ...m.sample !== "none" && !g ? [`    for (uint16_t i = 0; i < ${w}; ++i) { ${at(x, b, m.sample)} }`] : [],
      "}"
    );
  }
  const c = [], h = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
  {
    let m = 0, x = 0;
    const b = (w) => {
      const S = s.get(w);
      return S ? ($.has(w) || $.set(w, `        if (!${S.name}_filled) { ${S.name}_filled = 1; ${S.name}_fill(); }`), $.get(w)) : "";
    };
    for (const w of a.pages)
      for (const S of w.items) {
        if (S.kind !== "chart") continue;
        const g = S.sources.filter((N) => s.has(N.bufferId));
        if (S.sources.length && !g.length) {
          e.push(`页面 ${w.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);
          continue;
        }
        if (!g.length) {
          e.push(`页面 ${w.name} 的图表条目未绑定数据源，已跳过`);
          continue;
        }
        const _ = Math.max(4, Math.trunc(S.height)), k = [];
        for (const N of g) {
          const A = s.get(N.bufferId), H = `chart${m++}`;
          c.push(
            `static float ${H}_dis[${A.lenMacro}];`,
            `static u8g2_chart_t ${H};`
          ), k.push({ name: H, s: N, b: A });
        }
        if (k.length === 1) {
          const { name: N, s: A, b: H } = k[0];
          c.push(`static uint8_t ${N}_inited = 0;`), h.set(S.id, [
            `    if (!${N}_inited) {`,
            `        ${N}_inited = 1;`,
            `        u8g2_chart_init(&${N}, ${H.name}, ${N}_dis, ${H.lenMacro});`,
            b(A.bufferId),
            "    }"
          ]);
          const X = A.chartKind === "point" ? "Point" : A.chartKind === "bar" ? "Bar" : "Line", oe = A.min !== void 0 && A.max !== void 0 ? `${J(A.max)}, ${J(A.min)}` : "0, 0";
          f.set(S.id, `    u8g2_MenuDrawItem${X}Chart(&${N}, ${_}, ${oe});`);
        } else {
          const N = `chart_layers_${x++}`;
          c.push(
            `static u8g2_menu_drawChart_t ${N}[${k.length}];`,
            `static uint8_t ${N}_inited = 0;`
          );
          const A = [
            `    if (!${N}_inited) {`,
            `        ${N}_inited = 1;`
          ];
          k.forEach(({ name: H, s: X, b: oe }, le) => {
            A.push(`        u8g2_chart_init(&${H}, ${oe.name}, ${H}_dis, ${oe.lenMacro});`), A.push(b(X.bufferId));
            const Ve = X.chartKind === "point" ? "u8g2_drawPointChart" : X.chartKind === "bar" ? "u8g2_drawBarChart" : "u8g2_drawLineChart", Ie = X.min !== void 0 && X.max !== void 0 ? `${J(X.max)}, ${J(X.min)}` : "0, 0";
            A.push(`        ${N}[${le}].drawChart = ${Ve};`), A.push(`        ${N}[${le}].chart = &${H};`), A.push(`        ${N}[${le}].max = ${Ie.split(", ")[0]};`), A.push(`        ${N}[${le}].min = ${Ie.split(", ")[1]};`);
          }), A.push("    }"), h.set(S.id, A), f.set(S.id, `    u8g2_MenuDrawItemChart(${N}, ${k.length}, ${_});`);
        }
      }
  }
  const T = [], j = [], q = [], M = /* @__PURE__ */ new Set(), C = /* @__PURE__ */ new Map();
  let K = 0;
  for (const m of a.pages)
    for (const x of m.items)
      switch (x.kind) {
        case "button": {
          const b = Z(x.cbName, "btn_cb");
          o.has(b) || o.set(b, x.buttonId);
          break;
        }
        case "board":
          l.add(Z(x.cbName, "board_cb"));
          break;
        case "xbm": {
          let b = Z(x.name, "icon");
          for (; M.has(b); ) b = `${b}_2`;
          M.add(b), C.set(x.id, b);
          const w = x.bits.length, S = x.bits.map((g) => `0x${(g & 255).toString(16).padStart(2, "0")}`).join(", ");
          T.push(`static const uint8_t menu_xbm_${b}[${w}] = { ${S} };`);
          break;
        }
        case "textarea": {
          const b = K++;
          j.push(
            `static char ta${b}_text[] = "${ie(x.content)}";`,
            `static u8g2_menu_textArea_t ta${b};`,
            `static uint8_t ta${b}_inited = 0;`
          ), q.push(
            `    if (!ta${b}_inited) {`,
            `        ta${b}_inited = 1;`,
            `        u8g2_textArea_init(&ta${b}, ta${b}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${b}, ${Math.max(0, Math.trunc(x.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
  const B = (m, x) => {
    if (!m) return "";
    const b = `"${ie(m)}"`;
    return x === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${b});` : `u8g2_MenuUTF8Printf(${b});`;
  }, re = (m, x, b) => {
    const w = `"${ie(m)}"`;
    return x === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${b});` : `u8g2_MenuUTF8Printf(${w}, ${b});`;
  };
  let be = 0;
  const ee = (m, x) => {
    const b = [], w = `${x.name}`, S = (g) => {
      if (!g) return null;
      const _ = n.get(g);
      return _ || e.push(`页面 ${w} 的条目引用了已删除的变量，已按普通文本生成`), _ ?? null;
    };
    switch (m.kind) {
      case "text": {
        const g = B(m.text, m.scale);
        g && b.push(`    ${g}`);
        break;
      }
      case "number": {
        const g = m, _ = S(g.varId);
        if (_ && g.editable !== !1) {
          const k = _.isFloat ? `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${J(_.step)}, ${J(_.min)}, ${J(_.max)});` : `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;
          b.push(`    ${k}`);
        }
        if (_)
          b.push(`    ${re(g.text, g.scale, _.name)}`), g.editable !== !1 && !/%[-+ #0]*[a-zA-Z]/.test(g.text) && e.push(`数值条目 "${w}" 的显示文本不含格式化占位符（如 %d）`);
        else if (/%[-+ #0]*[a-zA-Z]/.test(g.text)) {
          e.push(`页面 ${w} 的数值条目未绑定变量但文本含占位符，已按普通文本生成`);
          const k = B(g.text.replace(/%[-+ #0]*[a-zA-Z]/g, ""), g.scale);
          k && b.push(`    ${k}`);
        } else {
          const k = B(g.text, g.scale);
          k && b.push(`    ${k}`);
        }
        break;
      }
      case "switch": {
        const g = m, _ = S(g.varId);
        if (_) {
          if (_.srcType !== "uint8") {
            e.push(`开关条目绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`);
            const k = B(g.text, g.scale);
            k && b.push(`    ${k}`);
            break;
          }
          b.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(g.openValue)});`), b.push(`    ${re(g.text, g.scale, `${_.name} ? "${ie(g.onText)}" : "${ie(g.offText)}"`)}`), /%[-+ #0]*s/.test(g.text) || e.push(`开关条目 "${_.name}" 的显示文本建议包含 %s 用于显示 on/off`);
        } else {
          const k = B(g.text, g.scale);
          k && b.push(`    ${k}`);
        }
        break;
      }
      case "button": {
        const g = Z(m.cbName, "btn_cb");
        b.push(`    u8g2_MenuItem_button(${g}, ${Math.trunc(m.buttonId)});`);
        const _ = B(m.text, m.scale);
        _ && b.push(`    ${_}`);
        break;
      }
      case "submenu": {
        if (!m.targetPageId) {
          e.push(`页面 ${w} 的子页面条目 "${m.text || m.label || m.id}" 未指定目标页面，已按普通文本生成`);
          const k = B(m.text, m.scale);
          k && b.push(`    ${k}`);
          break;
        }
        const g = a.pages.findIndex((k) => k.id === m.targetPageId);
        if (g < 0) {
          e.push(`页面 ${w} 的子页面条目目标无效`);
          break;
        }
        b.push(`    u8g2_MenuItem_menu_enter(${u[g]});`);
        const _ = B(m.text, m.scale);
        _ && b.push(`    ${_}`);
        break;
      }
      case "back": {
        b.push("    u8g2_MenuItem_menu_back();");
        const g = B(m.text, m.scale);
        g && b.push(`    ${g}`);
        break;
      }
      case "slider":
      case "progress": {
        const g = S(m.varId);
        if (!g) {
          e.push(`页面 ${w} 的${m.kind === "slider" ? "滑块" : "进度"}条目未绑定变量，已跳过`);
          break;
        }
        if (!st.has(g.srcType)) {
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
        b.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${C.get(m.id) ?? Z(m.name, "icon")});`);
        break;
      case "textarea": {
        const g = be++;
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
  p.push("/**"), p.push(` * 由 u8g2-menu-editor 自动生成，工程: ${a.name}`), p.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), p.push(" */"), p.push('#include "menu_pages.h"'), p.push('#include "u8g2_menu.h"'), (a.chartBuffers ?? []).some((m) => m.sample === "sine") && p.push("#include <math.h>"), p.push(""), p.push(R("includes", r, "")), p.push(""), p.push("/* ======================== 变量定义 ======================== */"), p.push(R("variables", r, ""));
  for (const m of i.values()) p.push(`${m.type} ${m.name} = ${m.init};`);
  if (p.push(""), (d.length || c.length || j.length || T.length) && (p.push("/* ======================== 页面资源 ======================== */"), p.push(...d, ...c, ...j, ...T), p.push("")), o.size || l.size) {
    p.push("/* ======================== 回调函数 ======================== */"), p.push(R("callbacks", r, ""));
    for (const [m] of o)
      p.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`), p.push("{"), p.push(R(`cb_${m}`, r, "    ")), p.push("}"), p.push("");
    for (const m of l)
      p.push(`void ${m}(u8g2_t *u8g2)`), p.push("{"), p.push(R(`cb_${m}`, r, "    ")), p.push("}"), p.push("");
  }
  const E = (a.weakHooks ?? []).map((m) => ne.find((x) => x.fn === m)).filter((m) => !!m);
  if (E.length || r.has("weak") || ne.some((m) => (r.get(`weak_${m.fn}`) ?? "").trim())) {
    p.push("/* ==================== 弱定义函数重写 ==================== */"), p.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"), p.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");
    const x = ne.filter((b) => {
      var w;
      return !((w = a.weakHooks) != null && w.includes(b.fn)) && (r.get(`weak_${b.fn}`) ?? "").trim();
    }).map((b) => [
      `#if 0   /* 已取消勾选 ${b.fn}，手写内容保留于此；重新勾选后恢复编译 */`,
      `${b.decl}`,
      "{",
      R(`weak_${b.fn}`, r, "    "),
      "}",
      "#endif"
    ].join(`
`)).join(`
`);
    p.push(x ? `${R("weak", r, "").replace(/\n$/, "")}
${x}
` : R("weak", r, "")), p.push("");
    for (const b of E) {
      p.push(`/* ${b.label}: ${b.desc} */`), p.push(`${b.decl}`), p.push("{"), p.push(R(`weak_${b.fn}`, r, "    "));
      const w = b.bodyArgs.split(`
`).map((S) => `    ${S}`);
      b.retNote && w.push(`    ${b.retNote}`), p.push(...w), p.push("}"), p.push("");
    }
  }
  p.push("/* ======================== 页面函数 ======================== */"), p.push(""), a.pages.forEach((m, x) => {
    p.push(`/* 页面: ${m.name} */`), p.push(`void ${u[x]}(void)`), p.push("{"), p.push(R(`page_${u[x]}_pre`, r, "    "));
    for (const b of m.items) p.push(...ee(b, m));
    p.push("}"), p.push("");
  });
  const y = [];
  if (y.push("#ifndef MENU_PAGES_H"), y.push("#define MENU_PAGES_H"), y.push(""), y.push('#include "u8g2_menu.h"'), y.push(""), y.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"), u.forEach((m, x) => y.push(`void ${m}(void);   /* ${a.pages[x].name} */`)), y.push(""), i.size) {
    y.push("/* 可编辑变量（在条目绑定中使用） */");
    for (const m of i.values()) y.push(`extern ${m.type} ${m.name};`);
    y.push("");
  }
  if (o.size || l.size) {
    y.push("/* 用户回调 */");
    for (const [m] of o) y.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID);`);
    for (const m of l) y.push(`void ${m}(u8g2_t *u8g2);`);
    y.push("");
  }
  y.push("#endif /* MENU_PAGES_H */");
  const G = p.join(`
`).replace(/\n{3,}/g, `


`), ue = y.join(`
`);
  return { c: `${G}
`, h: `${ue}
`, warnings: e };
}
function xe(a, t) {
  return t ? a.get(t) ?? null : null;
}
var D = /* @__PURE__ */ ((a) => (a[a.None = 0] = "None", a[a.Up = 1] = "Up", a[a.Down = 2] = "Down", a[a.Enter = 3] = "Enter", a[a.Return = 4] = "Return", a[a.Add = 5] = "Add", a[a.Sub = 6] = "Sub", a))(D || {});
const rt = 8192 / 8;
function ut(a) {
  return new Promise((t, e) => {
    const r = document.createElement("script");
    r.src = a, r.onload = () => t(), r.onerror = () => e(new Error(`预览引擎脚本加载失败: ${a}`)), document.head.appendChild(r);
  });
}
class ot {
  constructor(t, e = {}) {
    this.mod = null, this.img = null, this.raf = 0, this.lastT = 0, this.running = !1, this.fontIndexCache = /* @__PURE__ */ new Map(), this.structSig = "", this.lastKnownPage = 0, this.canvas = document.createElement("canvas"), this.canvas.width = 128, this.canvas.height = 64, this.canvas.className = "ume-preview-canvas", t.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.events = e;
  }
  /** 加载 WASM 引擎（幂等） */
  async load(t) {
    if (this.mod) return;
    const e = window;
    e.U8G2MenuPreview || await ut(t);
    const r = e.U8G2MenuPreview;
    if (!r) throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");
    this.mod = await r({
      locateFile: (i) => t.replace(/[^/\\]*$/, "") + i
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const u = this.mod._em_font_count_export();
    for (let i = 0; i < u; i++) {
      const n = this.mod._em_font_name(i);
      this.fontIndexCache.set(this.mod.UTF8ToString(n), i);
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
        k: e.items.map((r) => r.kind).join(","),
        res: e.items.map((r) => r.kind === "chart" ? (r.sources ?? []).map((u) => `${u.bufferId}|${u.chartKind}|${u.min ?? "a"}|${u.max ?? "a"}`).join(">") : r.kind === "xbm" ? `${r.w}x${r.h}` : r.kind === "textarea" ? Math.ceil(r.content.length / 64) : "").join(",")
      }))
    });
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(t) {
    const e = this.mod;
    if (!e) return;
    const r = this.signature(t);
    r !== this.structSig && (e.ccall("em_reset_dynamic", null, [], []), this.structSig = r);
    const u = (l) => Math.trunc(Number.isFinite(l) ? l : 0), i = (l) => l ? (t.variables ?? []).findIndex((d) => d.id === l) : -1, n = new Map((t.variables ?? []).map((l) => [l.id, l]));
    (t.chartBuffers ?? []).forEach((l, d) => {
      e.ccall(
        "em_buf_define",
        null,
        ["number", "number", "number"],
        [d, u(l.dataLen), { sine: 0, ramp: 1, noise: 2, none: 3 }[l.sample]]
      );
    });
    const o = (l) => (t.chartBuffers ?? []).findIndex((d) => d.id === l);
    t.pages.forEach((l, d) => {
      e.ccall("em_page_begin", null, ["number"], [d]), l.items.forEach((s, c) => {
        const h = ["number", "number"];
        switch (s.kind) {
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
              [d, c, 0, 0, s.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, s.text]);
            break;
          case "number": {
            const f = xe(n, s.varId);
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
                s.scale,
                0,
                0,
                0,
                0,
                0,
                f ? u(f.initialValue) : 0,
                f ? u(f.step) : 0,
                f ? u(f.min) : 0,
                f ? u(f.max) : 0,
                -1,
                0,
                0,
                0,
                0,
                s.editable === !1 ? 1 : 0,
                i(s.varId)
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, s.text]);
            break;
          }
          case "switch": {
            const f = xe(n, s.varId);
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
                s.scale,
                0,
                0,
                u(s.openValue),
                0,
                0,
                f ? u(f.initialValue) : 0,
                0,
                0,
                0,
                -1,
                0,
                0,
                0,
                0,
                0,
                i(s.varId)
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, s.text]), e.ccall(
              "em_item_swtext",
              null,
              ["number", "number", "string", "string"],
              [d, c, s.onText, s.offText]
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
              [d, c, 3, 0, s.scale, 0, 0, 0, u(s.buttonId), 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, s.text]);
            break;
          case "submenu": {
            const f = t.pages.findIndex(($) => $.id === s.targetPageId);
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
              [d, c, 4, 0, s.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, f, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, s.text]);
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
              [d, c, 5, 0, s.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, s.text]);
            break;
          case "slider":
          case "progress": {
            const f = xe(n, s.varId), $ = s.kind === "slider" ? 5 : 6;
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
                $,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                f ? u(f.initialValue) : 0,
                f ? u(f.step) : 0,
                f ? u(f.min) : 0,
                f ? u(f.max) : 0,
                -1,
                0,
                0,
                0,
                0,
                0,
                i(s.varId)
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
              [d, c, 8, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, u(s.height), 0, 0, -1]
            );
            for (const f of s.sources ?? []) {
              const $ = f.min !== void 0 && f.max !== void 0 ? 1 : 0;
              e.ccall(
                "em_item_chart_add",
                null,
                ["number", "number", "number", "number", "number", "number", "number"],
                [
                  d,
                  c,
                  o(f.bufferId),
                  { line: 0, point: 1, bar: 2 }[f.chartKind],
                  $,
                  $ ? f.max ?? 0 : 0,
                  $ ? f.min ?? 0 : 0
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
              [d, c, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, u(s.w), u(s.h), 0, 0, 0, -1]
            );
            const f = e._em_scratch(s.bits.length);
            f && (e.HEAPU8.set(new Uint8Array(s.bits), f), e._em_item_bits(d, c, f, s.bits.length));
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
              [d, c, 10, 0, 1, 0, s.bindScroll ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, u(s.height), 0, u(s.lineSpacing), -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [d, c, s.content]);
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
              [d, c, 11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, u(s.w), u(s.h), 0, 0, 0, -1]
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
        u(t.selectorLeftMargin),
        u(t.selectorTopMargin),
        u(t.selectorLineSpacing),
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
      const r = Math.min(100, Math.round(e - this.lastT));
      this.lastT = e, this.renderFrame(r), this.raf = requestAnimationFrame(t);
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
    const r = e._em_frame(t);
    if (!r) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const u = e.HEAPU8.subarray(r, r + rt), i = this.img.data;
    i.fill(255);
    for (let d = 0; d < 64; d++) {
      const s = (d >> 3) * 128, c = 1 << (d & 7);
      let h = d * 128 * 4;
      for (let f = 0; f < 128; f++)
        u[s + f] & c && (i[h] = 17, i[h + 1] = 24, i[h + 2] = 39), h += 4;
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
const lt = Object.keys(pe);
function ct(a, t, e, r) {
  const u = a.getState(), i = e.label || "text" in e && e.text || pe[e.kind], n = (o) => (l) => {
    l.stopPropagation(), a.getState().moveItem(t.id, e.id, o);
  };
  return v`<div class="ume-item-row ${r ? "selected" : ""}"
    @click=${() => a.getState().select(t.id, e.id)}>
    <span class="ume-item-icon">${Fe[e.kind]}</span>
    <span class="ume-item-name" title=${i}>${i}</span>
    <button class="ume-mini" title="上移" @click=${n(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${n(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(o) => {
    o.stopPropagation(), u.duplicateItem(t.id, e.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(o) => {
    o.stopPropagation(), u.removeItem(t.id, e.id);
  }}>✕</button>
  </div>`;
}
function dt(a, t) {
  const e = a.getState();
  return v`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(r) => {
    const u = r.target.value;
    u && e.addItem(u, t.id), r.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${lt.map((r) => v`<option value=${r}>${pe[r]}</option>`)}
  </select>`;
}
function mt(a, t) {
  const { project: e, selection: r } = t.getState(), u = (i) => {
    const n = t.getState(), o = r.pageId === i.id;
    return v`<div class="ume-page">
      <div class="ume-page-head ${o ? "selected" : ""}"
        @click=${() => t.getState().select(i.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${i.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(l) => {
      l.stopPropagation(), n.movePage(i.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(l) => {
      l.stopPropagation(), n.movePage(i.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(l) => {
      if (l.stopPropagation(), e.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${i.name}"？`) && n.removePage(i.id);
    }}>✕</button>
      </div>
      ${o ? v`<div class="ume-page-items">
        ${i.items.length ? i.items.map((l) => ct(t, i, l, r.itemId === l.id)) : v`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${dt(t, i)}</div>
      </div>` : L}
    </div>`;
  };
  ae(v`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => pt(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(u)}
  `, a);
}
function pt(a) {
  const t = prompt("页面名称:", `页面${a.getState().project.pages.length + 1}`);
  t !== null && a.getState().addPage(t || void 0);
}
function U(a, t, e, r = "") {
  return v`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${t ?? ""} placeholder=${r}
      @change=${(u) => e(u.target.value)} />
  </div>`;
}
function P(a, t, e, r = 1) {
  return v`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(t)} step=${String(r)}
      @change=${(u) => {
    const i = parseFloat(u.target.value);
    e(Number.isFinite(i) ? i : 0);
  }} />
  </div>`;
}
function F(a, t, e, r) {
  return v`<div class="ume-field">
    <label>${a}</label>
    <select @change=${(u) => r(u.target.value)}>
      ${e.map((u) => v`<option value=${u.value} ?selected=${u.value === t}>${u.label}</option>`)}
    </select>
  </div>`;
}
function $e(a, t, e) {
  return v`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${(r) => e(r.target.checked)} />
    <span>${a}</span>
  </div>`;
}
function Ee(a, t, e, r = !1) {
  return v`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${r ? "font-family:Consolas,monospace" : ""}
      @change=${(u) => e(u.target.value)}>${t ?? ""}</textarea>
  </div>`;
}
function me(a, t, e = "text/plain") {
  const r = new Blob([t], { type: `${e};charset=utf-8` }), u = document.createElement("a");
  u.href = URL.createObjectURL(r), u.download = a, u.click(), setTimeout(() => URL.revokeObjectURL(u.href), 5e3);
}
const bt = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]), Be = {
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
function _e(a, t, e, r) {
  const u = [
    { value: "", label: "（未绑定）" },
    ...e.map((n) => ({ value: n.id, label: `${n.name} : ${Be[n.type] ?? n.type}` }))
  ], i = t ? e.some((n) => n.id === t) : !1;
  return v`
    ${F(a, t ?? "", u, (n) => r(n || null))}
    ${t && !i ? v`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>` : L}
    ${e.length === 0 ? v`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>` : L}
  `;
}
function we(a, t, e) {
  return v`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
    const r = a.getState().addVariable();
    a.getState().updateItem(t, e, { varId: r.id });
  }}>＋ 新建变量并绑定</button>
  </div>`;
}
function ye(a) {
  return a ? v`<div class="ume-hint">
    ${a.name} : ${Be[a.type] ?? a.type}，范围 ${a.min}~${a.max}，步长 ${a.step}，初值 ${a.initialValue}
    （在右侧「变量」区修改）
  </div>` : v`${L}`;
}
function ft(a, t, e) {
  const { project: r, selection: u } = t.getState(), i = r.pages.find((s) => s.id === u.pageId) ?? null, n = (i == null ? void 0 : i.items.find((s) => s.id === u.itemId)) ?? null, o = (s, c) => t.getState().updateItem(i.id, n.id, s, c);
  let l = v`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, d = "属性";
  if (i && !n)
    d = "页面属性", l = v`
      ${U("名称", i.name, (s) => t.getState().updatePage(i.id, { name: s }))}
      ${U("C 函数名", i.fnName, (s) => t.getState().updatePage(i.id, { fnName: s }), "留空自动 page_N")}
      ${Ee("用户代码", i.userCodePre, (s) => t.getState().updatePage(i.id, { userCodePre: s }), !0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;
  else if (i && n)
    switch (d = `${pe[n.kind]}`, n.kind) {
      case "text":
        l = v`
          ${U("文本/格式", n.text, (s) => o({ text: s }, `text-${n.id}`))}
          ${F("大小", String(n.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (s) => o({ scale: Number(s) }))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      case "number": {
        const s = n, c = r.variables ?? [], h = c.find(($) => $.id === s.varId), f = h && (h.type === "float" || h.type === "double") ? "float/double 推荐格式 %.1f / %.2f" : "整数推荐格式 %d（无符号用 %u）";
        l = v`
          ${_e("绑定变量", s.varId, c, ($) => o({ varId: $ }))}
          ${h ? L : we(t, i.id, s.id)}
          ${$e("可编辑（绑定附加值，取消则仅显示）", s.editable !== !1, ($) => o({ editable: $ }))}
          ${ye(h)}
          ${U("显示文本", s.text, ($) => o({ text: $ }, `text-${n.id}`))}
          ${F("大小", String(s.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], ($) => o({ scale: Number($) }))}
          <div class="ume-hint">${f}；文本支持 \n 多行</div>
        `;
        break;
      }
      case "switch": {
        const s = n, c = (r.variables ?? []).filter((f) => f.type === "uint8"), h = c.find((f) => f.id === s.varId) ?? (r.variables ?? []).find((f) => f.id === s.varId);
        l = v`
          ${_e("绑定变量", s.varId, c, (f) => o({ varId: f }))}
          ${h ? L : we(t, i.id, s.id)}
          ${ye(h)}
          ${U("显示文本", s.text, (f) => o({ text: f }, `text-${n.id}`))}
          ${P("openValue", s.openValue, (f) => o({ openValue: Math.max(0, Math.trunc(f)) }))}
          ${U('"开"文本', s.onText, (f) => o({ onText: f }))}
          ${U('"关"文本', s.offText, (f) => o({ offText: f }))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case "button": {
        const s = n;
        l = v`
          ${U("显示文本", s.text, (c) => o({ text: c }, `text-${n.id}`))}
          ${U("回调函数名", s.cbName, (c) => o({ cbName: c }))}
          ${P("ID", s.buttonId, (c) => o({ buttonId: Math.trunc(c) }))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;
        break;
      }
      case "submenu": {
        const s = n;
        l = v`
          ${U("显示文本", s.text, (c) => o({ text: c }, `text-${n.id}`))}
          ${F("目标页面", s.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...r.pages.filter((c) => c.id !== i.id).map((c) => ({ value: c.id, label: c.name }))
        ], (c) => o({ targetPageId: c || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;
        break;
      }
      case "back": {
        l = v`
          ${U("显示文本", n.text, (s) => o({ text: s }, `text-${n.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const s = (r.variables ?? []).filter((h) => bt.has(h.type)), c = s.find((h) => h.id === n.varId) ?? (r.variables ?? []).find((h) => h.id === n.varId);
        l = v`
          ${_e("绑定变量", n.varId, s, (h) => o({ varId: h }))}
          ${c ? L : we(t, i.id, n.id)}
          ${ye(c)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;
        break;
      }
      case "chart": {
        const s = n, c = r.chartBuffers ?? [], h = ($) => o({ sources: $ }), f = ($, T) => {
          const j = c.find((M) => M.id === $.bufferId), q = $.min === void 0 || $.max === void 0;
          return v`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(j == null ? void 0 : j.name) ?? "(无效)"}</span>
              <span class="ume-var-meta">${{ line: "折线", point: "散点", bar: "柱状" }[$.chartKind] ?? $.chartKind}${q ? " · 自动量程" : ` · ${$.min}~${$.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${() => h(s.sources.filter((M, C) => C !== T))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${F("缓冲区", $.bufferId, c.map((M) => ({ value: M.id, label: `${M.name} (${M.dataLen}点)` })), (M) => h(s.sources.map((C, K) => K === T ? { ...C, bufferId: M } : C)))}
              ${F("绘制", $.chartKind, [
            { value: "line", label: "折线" },
            { value: "point", label: "散点" },
            { value: "bar", label: "柱状" }
          ], (M) => h(s.sources.map((C, K) => K === T ? { ...C, chartKind: M } : C)))}
              ${$e("自动量程", q, (M) => h(s.sources.map((C, K) => K === T ? { ...C, min: M ? void 0 : 0, max: M ? void 0 : 100 } : C)))}
              ${q ? L : v`
                ${P("量程上限", $.max ?? 100, (M) => h(s.sources.map((C, K) => K === T ? { ...C, max: M } : C)), "any")}
                ${P("量程下限", $.min ?? 0, (M) => h(s.sources.map((C, K) => K === T ? { ...C, min: M } : C)), "any")}`}
            </div>
          </div>`;
        };
        l = v`
          ${P("高度(px)", s.height, ($) => o({ height: Math.max(4, Math.trunc($)) }))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(s.sources ?? []).map(f)}
              ${(s.sources ?? []).length === 0 ? v`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>` : L}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(s.sources ?? []).length >= 4}
                @click=${() => {
          if (!c.length) {
            const $ = t.getState().addChartBuffer();
            h([...s.sources ?? [], { bufferId: $.id, chartKind: "line" }]);
            return;
          }
          h([...s.sources ?? [], { bufferId: c[0].id, chartKind: "line" }]);
        }}>＋ 添加数据源${(s.sources ?? []).length > 0 ? "（叠加）" : ""}</button>
              ${c.length ? L : v`<div class="ume-hint">将自动新建数据源缓冲区（在右侧「数据源」区可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;
        break;
      }
      case "xbm": {
        const s = n;
        l = v`
          ${U("数组名", s.name, (c) => o({ name: c }))}
          ${P("宽(px)", s.w, (c) => o({ w: Math.min(128, Math.max(1, Math.trunc(c))) }))}
          ${P("高(px)", s.h, (c) => o({ h: Math.min(64, Math.max(1, Math.trunc(c))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => e.openXbmEditor(i.id, s.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${s.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const s = n;
        l = v`
          ${Ee("文本内容", s.content, (c) => o({ content: c }))}
          ${P("高度(px)", s.height, (c) => o({ height: Math.max(10, Math.trunc(c)) }))}
          ${P("行间距", s.lineSpacing, (c) => o({ lineSpacing: Math.max(0, Math.trunc(c)) }))}
          ${$e("上下键滚动 (bind)", s.bindScroll, (c) => o({ bindScroll: c }))}
        `;
        break;
      }
      case "board": {
        const s = n;
        l = v`
          ${P("宽(px)", s.w, (c) => o({ w: Math.max(1, Math.trunc(c)) }))}
          ${P("高(px)", s.h, (c) => o({ h: Math.max(1, Math.trunc(c)) }))}
          ${U("回调函数名", s.cbName, (c) => o({ cbName: c }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
  ae(v`
    <div class="ume-panel-title">属性 ${d !== "属性" ? v`<span class="ume-kind-badge">${d}</span>` : L}</div>
    ${l}
  `, a);
}
let ce = null, ke = null;
const ht = [
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
function gt(a, t) {
  const e = t.variables ?? [], r = (i) => {
    ce = ce === i ? null : i;
  }, u = (i) => {
    const n = ce === i.id, o = (c, h) => a.getState().updateVariable(i.id, c, h), l = i.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(i.name), d = e.filter((c) => c.name === i.name).length > 1, s = vt(t, i.id);
    return v`<div class="ume-var-item ${n ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => r(i.id)}>
        <span class="ume-var-name" title=${i.name}>${i.name || "(未命名)"}</span>
        <span class="ume-var-meta">${i.type} · ${i.min}~${i.max} · 步${i.step}${s ? ` · ${s} 处引用` : ""}</span>
        <button class="ume-mini" title="删除变量" @click=${(c) => {
      c.stopPropagation();
      const h = a.getState().removeVariable(i.id);
      h > 0 && alert(`该变量被 ${h} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`);
    }}>✕</button>
      </div>
      ${n ? v`<div class="ume-var-edit">
        ${U("变量名", i.name, (c) => o({ name: c.trim() }, `vn-${i.id}`))}
        ${l ? v`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>` : L}
        ${d ? v`<div class="ume-warn">变量名重复，生成时以第一个为准</div>` : L}
        ${F("类型", i.type, ht, (c) => o({ type: c }))}
        ${P("初始值", i.initialValue, (c) => o({ initialValue: c }, `vi-${i.id}`), "any")}
        ${P("最小值", i.min, (c) => o({ min: c }, `vmin-${i.id}`), "any")}
        ${P("最大值", i.max, (c) => o({ max: c }, `vmax-${i.id}`), "any")}
        ${P("步长", i.step, (c) => o({ step: c }, `vs-${i.id}`), "any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>` : L}
    </div>`;
  };
  return v`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${() => {
    ce = a.getState().addVariable().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(u) : v`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `;
}
function vt(a, t) {
  let e = 0;
  for (const r of a.pages)
    for (const u of r.items)
      "varId" in u && u.varId === t && e++;
  return e;
}
function xt(a, t) {
  const e = t.chartBuffers ?? [], r = (i) => {
    let n = 0;
    for (const o of t.pages)
      for (const l of o.items)
        l.kind === "chart" && l.sources.some((d) => d.bufferId === i) && n++;
    return n;
  }, u = (i) => {
    const n = ke === i.id, o = (s, c) => a.getState().updateChartBuffer(i.id, s, c), l = i.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(i.name), d = r(i.id);
    return v`<div class="ume-var-item ${n ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => {
      ke = n ? null : i.id;
    }}>
        <span class="ume-var-name" title=${i.name}>${i.name || "(未命名)"}</span>
        <span class="ume-var-meta">${i.dataLen} 点 · ${{ sine: "正弦", ramp: "斜坡", noise: "伪随机", none: "手动填充" }[i.sample]}${d ? ` · ${d} 处引用` : ""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${(s) => {
      s.stopPropagation();
      const c = a.getState().removeChartBuffer(i.id);
      c > 0 && alert(`该缓冲区被 ${c} 个图表条目的数据源引用，请先在条目里移除数据源再删除`);
    }}>✕</button>
      </div>
      ${n ? v`<div class="ume-var-edit">
        ${U("数组名", i.name, (s) => o({ name: s.trim() }, `bn-${i.id}`))}
        ${l ? v`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>` : L}
        ${P("点数", i.dataLen, (s) => o({ dataLen: Math.min(512, Math.max(2, Math.trunc(s))) }, `bl-${i.id}`))}
        ${F("示例填充", i.sample, [
      { value: "sine", label: "正弦（演示）" },
      { value: "ramp", label: "斜坡（演示）" },
      { value: "noise", label: "伪随机（演示）" },
      { value: "none", label: "不填充（全部手写）" }
    ], (s) => o({ sample: s }))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>` : L}
    </div>`;
  };
  return v`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${() => {
    ke = a.getState().addChartBuffer().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(u) : v`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `;
}
function $t(a, t) {
  const { project: e } = t.getState(), r = (o, l) => t.getState().update((d) => {
    Object.assign(d, o);
  }, l), u = e.weakHooks ?? [], i = (o, l) => {
    t.getState().update((d) => {
      const s = d.weakHooks ?? [];
      d.weakHooks = l ? [.../* @__PURE__ */ new Set([...s, o])] : s.filter((c) => c !== o);
    });
  }, n = v`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${u.length}/${ne.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${ne.map((o) => v`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote ? "（返回 1 = 事件已处理 / 0 = 交给库）" : ""}`}>
              <input type="checkbox" ?checked=${u.includes(o.fn)}
                @change=${(l) => i(o.fn, l.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;
  ae(v`
    <div class="ume-panel-title">工程</div>
    ${U("工程名", e.name, (o) => r({ name: o }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width !== 128 || e.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    ${gt(t, e)}
    ${xt(t, e)}

    <div class="ume-panel-title">样式</div>
    ${F(
    "字体",
    e.font,
    Xe.map((o) => ({ value: o.id, label: o.label })),
    (o) => r({ font: o })
  )}
    ${F("选择器", e.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (o) => r({ selector: o }))}
    ${P("左边距", e.selectorLeftMargin, (o) => r({ selectorLeftMargin: Math.max(0, Math.trunc(o)) }))}
    ${P("顶边距", e.selectorTopMargin, (o) => r({ selectorTopMargin: Math.max(0, Math.trunc(o)) }))}
    ${P("行间距", e.selectorLineSpacing, (o) => r({ selectorLineSpacing: Math.max(0, Math.trunc(o)) }))}
    ${P("跑马灯速度", e.marqueeSpeed, (o) => r({ marqueeSpeed: o }), 0.05)}
    ${P("跑马灯停留", e.marqueeHeaderLen, (o) => r({ marqueeHeaderLen: o }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${n}
    ${L}
  `, a);
}
function _t(a, t) {
  const e = (u) => {
    let i;
    const n = () => {
      i && (clearInterval(i), i = void 0);
    };
    return {
      down: (o) => {
        o.preventDefault(), t.key(u), n(), i = window.setInterval(() => t.key(u), 180);
      },
      up: n
    };
  }, r = (u, i, n) => {
    const o = e(u);
    return v`<button class="ume-key" title=${n}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${i}</button>`;
  };
  ae(v`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(u) => {
    const n = {
      ArrowUp: D.Up,
      ArrowDown: D.Down,
      Enter: D.Enter,
      Escape: D.Return,
      Backspace: D.Return,
      "+": D.Add,
      "-": D.Sub,
      "=": D.Add,
      _: D.Sub
    }[u.key];
    n !== void 0 && (u.preventDefault(), t.key(n));
  }}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${r(D.Up, "▲", "上 MENU_Key_Up")}
      ${r(D.Down, "▼", "下 MENU_Key_Down")}
      ${r(D.Enter, "OK", "确认 MENU_Key_Enter")}
      ${r(D.Return, "⌫", "返回 MENU_Key_Return")}
      ${r(D.Add, "＋", "加 MENU_Key_Add")}
      ${r(D.Sub, "－", "减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `, a);
}
let te = null, W = "c";
function wt(a, t) {
  te = t, a.querySelectorAll(":scope > .ume-modal-mask").forEach((e) => e.remove()), yt(a);
}
function yt(a) {
  if (!te) return;
  const t = W === "c" ? te.c : te.h, e = document.createElement("div");
  e.className = "ume-modal-mask", e.addEventListener("click", (u) => {
    u.target === e && Ce(e);
  });
  const r = () => {
    ae(v`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${() => Ce(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${te.warnings.length ? v`
            <div style="margin-bottom:8px">
              ${te.warnings.map((u) => v`<div class="ume-warn">⚠ ${u}</div>`)}
            </div>` : L}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${W === "c" ? "primary" : ""}" @click=${() => {
      W = "c", r();
    }}>menu_pages.c</button>
            <button class="ume-btn sm ${W === "h" ? "primary" : ""}" @click=${() => {
      W = "h", r();
    }}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${t}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${() => {
      navigator.clipboard.writeText(t).then(() => kt(e, "已复制到剪贴板"));
    }}>复制</button>
          <button class="ume-btn primary" @click=${() => {
      me(W === "c" ? "menu_pages.c" : "menu_pages.h", t);
    }}>下载 ${W === "c" ? "menu_pages.c" : "menu_pages.h"}</button>
        </div>
      </div>
    `, e);
  };
  r(), a.appendChild(e);
}
function Ce(a) {
  a.remove();
}
function kt(a, t) {
  const e = a.closest(".ume") ?? document.body;
  let r = e.querySelector(".ume-toast");
  r || (r = document.createElement("div"), r.className = "ume-toast", e.appendChild(r)), r.textContent = t, r.classList.add("show"), setTimeout(() => r.classList.remove("show"), 1600);
}
function It(a, t, e, r) {
  const i = t.getState().project.pages.find((p) => p.id === e), n = i == null ? void 0 : i.items.find((p) => p.id === r);
  if (!n || n.kind !== "xbm") return;
  const o = n;
  let l = o.w, d = o.h, s = [...o.bits];
  const c = () => Math.ceil(l / 8), h = document.createElement("div");
  h.className = "ume-modal-mask", h.addEventListener("click", (p) => {
    p.target === h && ee();
  });
  const f = (p, E) => {
    const y = E * c() + (p >> 3);
    return y < s.length ? !!(s[y] >> (p & 7) & 1) : !1;
  }, $ = (p, E, y) => {
    const G = E * c() + (p >> 3);
    s[G] = y ? s[G] | 1 << (p & 7) : s[G] & ~(1 << (p & 7));
  }, T = (p, E) => {
    const y = Math.ceil(l / 8), G = Math.ceil(p / 8), ue = new Array(G * E).fill(0);
    for (let m = 0; m < Math.min(d, E); m++)
      for (let x = 0; x < Math.min(l, p); x++) {
        const b = m * y + (x >> 3);
        b < s.length && s[b] >> (x & 7) & 1 && (ue[m * G + (x >> 3)] |= 1 << (x & 7));
      }
    l = p, d = E, s = ue;
  };
  let j = !1, q = !0;
  const M = (p, E) => (y) => {
    y.preventDefault(), j = !0, q = !f(p, E), $(p, E, q), B();
  }, C = (p, E) => () => {
    j && ($(p, E, q), B());
  }, K = () => {
    j = !1;
  }, B = () => {
    ae(be(), h);
  }, re = () => {
    const p = [];
    for (let E = 0; E < d; E++)
      for (let y = 0; y < l; y++)
        p.push(v`<button class="ume-xbm-cell ${f(y, E) ? "on" : ""}"
          data-x=${y} data-y=${E}
          @pointerdown=${M(y, E)}
          @pointerenter=${C(y, E)}></button>`);
    return p;
  }, be = () => v`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${d}</span></span>
        <button class="ume-mini" @click=${ee}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${K}
        @pointerleave=${K}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${(p) => {
    T(Ne(+p.target.value, 1, 128), d), B();
  }} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${(p) => {
    T(l, Ne(+p.target.value, 1, 64)), B();
  }} />
          <button class="ume-btn sm" @click=${() => {
    s = s.map(() => 0), B();
  }}>清空</button>
          <button class="ume-btn sm" @click=${() => {
    s = s.map((p) => ~p & 255), B();
  }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${re()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${ee}>取消</button>
        <button class="ume-btn primary" @click=${() => {
    t.getState().updateItem(e, r, { w: l, h: d, bits: [...s] }), ee();
  }}>应用</button>
      </div>
    </div>
  `;
  function ee() {
    h.remove(), document.removeEventListener("pointerup", K);
  }
  document.addEventListener("pointerup", K), B(), a.appendChild(h);
}
function Ne(a, t, e) {
  return Number.isFinite(a) ? Math.min(e, Math.max(t, Math.trunc(a))) : t;
}
const St = "prebuilt/u8g2-menu-preview.js";
class Ct {
  constructor(t, e = {}) {
    var s;
    if (this.store = Ae(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.container = t, this.opts = { persistKey: "default", ...e }, t.classList.add("ume"), !document.getElementById("ume-style")) {
      const c = document.createElement("style");
      c.id = "ume-style", c.textContent = De, document.head.appendChild(c);
    }
    const r = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, u = this.opts.data ?? r ?? void 0;
    if (u !== void 0)
      try {
        this.store.setState({ project: ve(u) });
      } catch (c) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", c);
      }
    const i = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null, n = this.opts.persistKey ? localStorage.getItem(`ume_last_h_${this.opts.persistKey}`) : null;
    i && n && (this.lastExport = { c: i, h: n }), t.innerHTML = `
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
    const o = (c) => t.querySelector(c);
    this.els = {
      left: o(".ume-left"),
      center: o(".ume-center"),
      right: o(".ume-right"),
      styleEl: o('[data-role="style"]'),
      propEl: o('[data-role="prop"]'),
      toolbarUndo: o('[data-act="undo"]'),
      toolbarRedo: o('[data-act="redo"]')
    };
    const l = document.createElement("div");
    l.style.display = "flex", l.style.flexDirection = "column", l.style.alignItems = "center", l.style.gap = "10px", this.els.center.appendChild(l), this.preview = new ot(l, {
      onPageChanged: (c) => this.onPreviewPageChanged(c)
    });
    const d = document.createElement("div");
    this.els.center.appendChild(d), _t(d, this.preview), this.preview.load(this.opts.wasmUrl ?? St).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((c) => {
      console.error(c);
      const h = document.createElement("div");
      h.className = "ume-warn", h.textContent = `预览引擎加载失败: ${c.message}。编辑功能不受影响。`, this.els.center.prepend(h);
    }), t.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const c = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      c !== null && this.store.getState().addPage(c || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), t.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      me(
        `${this.store.getState().project.name || "menu-project"}.json`,
        Se(this.store.getState().project),
        "application/json"
      );
    }), t.querySelector('[data-act="import"]').addEventListener("click", () => {
      o('[data-role="file"]').click();
    }), o('[data-role="file"]').addEventListener("change", (c) => {
      var f;
      const h = (f = c.target.files) == null ? void 0 : f[0];
      h && (h.text().then(($) => {
        try {
          const T = ve($);
          this.store.getState().update((j) => {
            Object.assign(j, T);
          }), this.scheduleRender();
        } catch (T) {
          alert(`导入失败: ${T.message}`);
        }
      }), c.target.value = "");
    }), t.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate()), this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((s = this.store.getState().project.pages[0]) == null ? void 0 : s.id) ?? null, null), this.store.subscribe(() => {
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
    var r;
    const e = ve(t);
    this.store.getState().update((u) => {
      Object.assign(u, e);
    }), this.store.getState().select(((r = e.pages[0]) == null ? void 0 : r.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var r, u;
    const t = this.lastExport, e = Me(this.store.getState().project, t ?? void 0);
    return this.lastExport = { c: e.c, h: e.h }, this.opts.persistKey && (localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, e.c), localStorage.setItem(`ume_last_h_${this.opts.persistKey}`, e.h)), wt(this.container, e), (u = (r = this.opts).onExport) == null || u.call(r, e), e;
  }
  downloadC() {
    const t = Me(this.store.getState().project, this.lastExport ?? void 0);
    this.lastExport = { c: t.c, h: t.h }, me("menu_pages.c", t.c), me("menu_pages.h", t.h);
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
          Se(this.store.getState().project)
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
      mt(this.els.left, this.store), $t(this.els.styleEl, this.store), ft(this.els.propEl, this.store, {
        openXbmEditor: (e, r) => It(this.container, this.store, e, r)
      }), this.els.toolbarUndo.disabled = t.past.length === 0, this.els.toolbarRedo.disabled = t.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var i;
    const t = document.getElementById("ume-live-value"), e = document.getElementById("ume-page-jump"), r = this.store.getState(), u = this.store.getState().project.pages.findIndex((n) => n.id === r.selection.pageId);
    if (e) {
      const n = r.project.pages, o = n.map((d) => d.name).join("|");
      e.dataset.sig !== o && (e.dataset.sig = o, e.innerHTML = "", n.forEach((d, s) => {
        const c = document.createElement("option");
        c.value = String(s), c.textContent = `${s + 1}. ${d.name}`, e.appendChild(c);
      }), e.onchange = () => {
        const d = parseInt(e.value, 10);
        Number.isFinite(d) && this.preview.navTo(d);
      });
      const l = this.preview.currentPage;
      document.activeElement !== e && e.value !== String(l) && (e.value = String(l));
    }
    if (t && u >= 0 && r.selection.itemId) {
      const n = r.project.pages[u], o = n.items.findIndex((d) => d.id === r.selection.itemId), l = n.items[o];
      if (l && "varId" in l) {
        const d = l.varId ? (r.project.variables ?? []).findIndex((f) => f.id === l.varId) : -1, s = d >= 0 ? d : u * 64 + o, c = l.kind === "switch" ? this.preview.getSwitch(s) : this.preview.getInt(s), h = (i = (r.project.variables ?? []).find((f) => f.id === l.varId)) == null ? void 0 : i.name;
        t.textContent = `${h ?? l.kind} = ${c}`;
      } else
        t.textContent = "";
    }
  }
}
export {
  Ct as MenuEditor,
  D as MenuKey
};
//# sourceMappingURL=u8g2-menu-editor.js.map
