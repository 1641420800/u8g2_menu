import { createStore as qe } from "zustand/vanilla";
import { render as ie, html as $, nothing as L } from "lit-html";
const He = `/* u8g2-menu-editor 样式（前缀 ume-） */
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
/* ---------- 右栏 Tab ---------- */
.ume-tabs { display: flex; gap: 2px; margin: -10px -10px 10px; padding: 4px 8px 0; border-bottom: 1px solid var(--ume-border); background: var(--ume-panel); }
.ume-tabs button { border: none; border-bottom: 2px solid transparent; background: transparent; padding: 6px 14px 5px; font: inherit; font-size: 12px; color: var(--ume-dim); cursor: pointer; }
.ume-tabs button:hover { color: var(--ume-text); }
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`;
let xe = 0;
function q(i) {
  return xe = (xe + 1) % 1e9, `${i}_${Date.now().toString(36)}_${xe.toString(36)}`;
}
function fe(i) {
  return {
    id: q("vb"),
    name: "var_new",
    type: "int32",
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
    ...i
  };
}
function Pe(i) {
  return {
    id: q("buf"),
    name: "buf_new",
    dataLen: 32,
    sample: "sine",
    ...i
  };
}
function We(i, n) {
  const e = new Set(i.map((s) => s.name));
  if (!e.has(n)) return n;
  let t = 2;
  for (; e.has(`${n}_${t}`); ) t++;
  return `${n}_${t}`;
}
function Xe(i, n) {
  const e = new Set(i.map((s) => s.name));
  if (!e.has(n)) return n;
  let t = 2;
  for (; e.has(`${n}_${t}`); ) t++;
  return `${n}_${t}`;
}
function Y(i) {
  const n = { id: q("it"), label: "", bind: { type: "none" } };
  switch (i) {
    case "text":
      return { ...n, kind: i, text: "菜单项", scale: 1, displayVarId: null };
    case "slider":
      return { ...n, kind: i, position: 50 };
    case "progress":
      return { ...n, kind: i, position: 50 };
    case "chart":
      return {
        ...n,
        kind: i,
        sources: [],
        height: 32
      };
    case "xbm":
      return Ye(16, 16);
    case "textarea":
      return {
        ...n,
        kind: i,
        content: `这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,
        height: 40,
        bindScroll: !0,
        lineSpacing: 0
      };
    case "board":
      return { ...n, kind: i, w: 64, h: 32, cbName: "board_cb" };
  }
}
function Ye(i, n) {
  const e = Math.ceil(i / 8);
  return {
    id: q("it"),
    kind: "xbm",
    label: "",
    bind: { type: "none" },
    name: "icon",
    w: i,
    h: n,
    bits: new Array(e * n).fill(0)
  };
}
function $e(i) {
  return { id: q("pg"), name: i, fnName: "", items: [] };
}
function me(i, n) {
  return { ...i, ...n };
}
function te(i, n) {
  return { ...i, ...n };
}
function Ze() {
  const i = [
    fe({ name: "var_value", type: "int32", initialValue: 50, min: 0, max: 100, step: 1 }),
    fe({ name: "var_switch", type: "uint8", initialValue: 0, min: 0, max: 1, step: 1 }),
    fe({ name: "var_slider", type: "int32", initialValue: 50, min: 0, max: 100, step: 2 })
  ], n = [
    Pe({ name: "buf_demo", dataLen: 32, sample: "sine" })
  ], e = $e("主页");
  e.items = [
    me(Y("text"), { text: "u8g2_menu" }),
    te(Y("text"), { text: "系统设置", bind: { type: "submenu", targetPageId: null } }),
    te(Y("text"), { text: "关于", bind: { type: "button", cbName: "btn_about_cb", buttonId: 1 } })
  ];
  const t = $e("设置");
  t.items = [
    te(me(Y("text"), { text: "音量:%d" }), { bind: { type: "value", varId: i[0].id } }),
    te(me(Y("text"), { text: "开关:%s" }), {
      bind: { type: "switch", varId: i[1].id, openValue: 1, onText: "on", offText: "off" }
    }),
    te(Y("slider"), { bind: { type: "value", varId: i[2].id } }),
    te(Y("text"), { text: "图表", bind: { type: "submenu", targetPageId: null } }),
    te(Y("text"), { text: "返回", bind: { type: "back" } })
  ];
  const s = $e("图表");
  s.items = [
    me(Y("chart"), {
      height: 36,
      sources: [{ bufferId: n[0].id, chartKind: "line" }]
    }),
    te(Y("text"), { text: "返回", bind: { type: "back" } })
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
    variables: i,
    chartBuffers: n,
    pages: [e, t, s]
  };
  return e.items[1].bind.targetPageId = t.id, t.items[3].bind.targetPageId = s.id, r;
}
function Ge(i) {
  return structuredClone(i);
}
const Je = 800;
function Qe() {
  let i = null, n = 0;
  return qe()((e, t) => ({
    project: Ze(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (s, r) => {
      const a = Date.now(), o = !!r && r === i && a - n < Je;
      i = r ?? null, n = a, e((u) => {
        const l = Ge(u.project);
        return s(l), {
          project: l,
          dirty: !0,
          past: o ? u.past : [...u.past.slice(-99), u.project],
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
        const [r, ...a] = s.future;
        return {
          project: r,
          past: [...s.past, s.project],
          future: a,
          dirty: !0
        };
      });
    },
    select: (s, r = null) => e({ selection: { pageId: s, itemId: r } }),
    addPage: (s) => {
      const r = { id: q("pg"), name: s ?? `页面${t().project.pages.length + 1}`, fnName: "", items: [] };
      return t().update((a) => {
        a.pages.push(r);
      }), e({ selection: { pageId: r.id, itemId: null } }), r;
    },
    removePage: (s) => {
      t().update((a) => {
        a.pages = a.pages.filter((o) => o.id !== s);
        for (const o of a.pages)
          for (const u of o.items)
            u.bind.type === "submenu" && u.bind.targetPageId === s && (u.bind.targetPageId = null);
      });
      const { selection: r } = t();
      r.pageId === s && e({ selection: { pageId: null, itemId: null } });
    },
    movePage: (s, r) => {
      t().update((a) => {
        const o = a.pages.findIndex((l) => l.id === s), u = o + r;
        o < 0 || u < 0 || u >= a.pages.length || ([a.pages[o], a.pages[u]] = [a.pages[u], a.pages[o]]);
      });
    },
    updatePage: (s, r) => {
      t().update((a) => {
        const o = a.pages.find((u) => u.id === s);
        o && Object.assign(o, r);
      });
    },
    addItem: (s, r) => {
      var u;
      const a = r ?? t().selection.pageId ?? ((u = t().project.pages[0]) == null ? void 0 : u.id);
      if (!a) return null;
      const o = Y(s);
      return t().update((l) => {
        const d = l.pages.find((m) => m.id === a);
        d == null || d.items.push(o);
      }), e({ selection: { pageId: a, itemId: o.id } }), o;
    },
    removeItem: (s, r) => {
      t().update((o) => {
        const u = o.pages.find((l) => l.id === s);
        u && (u.items = u.items.filter((l) => l.id !== r));
      });
      const { selection: a } = t();
      a.itemId === r && e({ selection: { pageId: s, itemId: null } });
    },
    moveItem: (s, r, a) => {
      t().update((o) => {
        const u = o.pages.find((m) => m.id === s);
        if (!u) return;
        const l = u.items.findIndex((m) => m.id === r), d = l + a;
        l < 0 || d < 0 || d >= u.items.length || ([u.items[l], u.items[d]] = [u.items[d], u.items[l]]);
      });
    },
    duplicateItem: (s, r) => {
      let a = null;
      t().update((o) => {
        const u = o.pages.find((d) => d.id === s);
        if (!u) return;
        const l = u.items.findIndex((d) => d.id === r);
        l < 0 || (a = structuredClone(u.items[l]), a.id = q("it"), u.items.splice(l + 1, 0, a));
      }), a && e({ selection: { pageId: s, itemId: a.id } });
    },
    updateItem: (s, r, a, o) => {
      t().update((u) => {
        const l = u.pages.find((m) => m.id === s), d = l == null ? void 0 : l.items.find((m) => m.id === r);
        d && Object.assign(d, a);
      }, o);
    },
    addVariable: (s) => {
      let r = null;
      return t().update((a) => {
        a.variables = a.variables ?? [];
        const o = Xe(a.variables, (s == null ? void 0 : s.name) ?? "var_new");
        r = fe({ ...s, name: o }), a.variables.push(r);
      }), r;
    },
    removeVariable: (s) => {
      let r = 0;
      for (const a of t().project.pages)
        for (const o of a.items)
          "varId" in o && o.varId === s && r++;
      return r > 0 ? r : (t().update((a) => {
        a.variables = (a.variables ?? []).filter((o) => o.id !== s);
      }), 0);
    },
    updateVariable: (s, r, a) => {
      t().update((o) => {
        const u = (o.variables ?? []).find((l) => l.id === s);
        u && Object.assign(u, r);
      }, a);
    },
    addChartBuffer: (s) => {
      let r = null;
      return t().update((a) => {
        a.chartBuffers = a.chartBuffers ?? [];
        const o = We(a.chartBuffers, (s == null ? void 0 : s.name) ?? "buf_new");
        r = Pe({ ...s, name: o }), a.chartBuffers.push(r);
      }), r;
    },
    removeChartBuffer: (s) => {
      let r = 0;
      for (const a of t().project.pages)
        for (const o of a.items)
          o.kind === "chart" && o.sources.some((u) => u.bufferId === s) && r++;
      return r > 0 ? r : (t().update((a) => {
        a.chartBuffers = (a.chartBuffers ?? []).filter((o) => o.id !== s);
      }), 0);
    },
    updateChartBuffer: (s, r, a) => {
      t().update((o) => {
        const u = (o.chartBuffers ?? []).find((l) => l.id === s);
        u && Object.assign(u, r);
      }, a);
    }
  }));
}
const _e = 1, se = [
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
], ge = {
  text: "文本",
  slider: "滑块条",
  progress: "进度条",
  chart: "图表",
  xbm: "位图 XBM",
  textarea: "文本区",
  board: "自绘板"
}, et = {
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
}, tt = [
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
class ae extends Error {
}
const Be = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int", "float", "double"]), De = /* @__PURE__ */ new Set(["line", "point", "bar"]), Ke = /* @__PURE__ */ new Set(["sine", "ramp", "noise", "none"]);
function re(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function K(i, n) {
  return typeof i == "string" ? i : n;
}
function T(i, n) {
  return typeof i == "number" && Number.isFinite(i) ? i : n;
}
const nt = ["text", "slider", "progress", "chart", "xbm", "textarea", "board"], at = ["number", "switch", "button", "submenu", "back"], it = ["none", "value", "switch", "button", "submenu", "back"];
function st(i) {
  if (!re(i)) throw new ae("条目格式错误");
  const n = K(i.kind, "");
  if (!(nt.includes(n) || at.includes(n)))
    throw new ae(`未知条目类型: ${String(n)}`);
  const e = structuredClone(i);
  switch (e.id = K(i.id, ""), e.id || (e.id = `it_${Math.random().toString(36).slice(2, 10)}`), e.label = K(i.label, ""), n) {
    case "text":
    case "number":
    case "switch":
    case "button":
    case "submenu":
    case "back":
      e.text = K(i.text, ""), e.scale = i.scale === 2 ? 2 : 1;
      break;
  }
  return e;
}
function rt(i) {
  for (const n of i)
    for (const e of n.items) {
      const t = e;
      if (!(t.bind && re(t.bind) && it.includes(K(t.bind.type, "none")))) {
        switch (t.kind) {
          case "number": {
            const s = t.varId ?? null;
            t.editable === !1 ? (t.kind = "text", t.displayVarId = s, t.bind = { type: "none" }) : (t.kind = "text", t.displayVarId = null, t.bind = { type: "value", varId: s });
            break;
          }
          case "switch":
            t.kind = "text", t.displayVarId = null, t.bind = {
              type: "switch",
              varId: t.varId ?? null,
              openValue: T(t.openValue, 1),
              onText: K(t.onText, "on"),
              offText: K(t.offText, "off")
            };
            break;
          case "button":
            t.kind = "text", t.displayVarId = null, t.bind = { type: "button", cbName: K(t.cbName, "btn_cb"), buttonId: T(t.buttonId, 1) };
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
function ot(i) {
  if (!re(i)) throw new ae("页面格式错误");
  const n = Array.isArray(i.items) ? i.items.map(st) : [];
  return {
    id: K(i.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: K(i.name, "未命名页面"),
    fnName: K(i.fnName, ""),
    items: n
  };
}
function ut(i) {
  if (!re(i)) return null;
  const n = K(i.type, "int32");
  return {
    id: K(i.id, "") || q("vb"),
    name: K(i.name, ""),
    type: Be.has(n) ? n : "int32",
    initialValue: T(i.initialValue, 0),
    min: T(i.min, 0),
    max: T(i.max, 100),
    step: T(i.step, 1)
  };
}
function lt(i) {
  if (!re(i)) return null;
  const n = K(i.sample, "sine");
  return {
    id: K(i.id, "") || q("buf"),
    name: K(i.name, ""),
    dataLen: Math.min(512, Math.max(2, Math.trunc(T(i.dataLen, 32)))),
    sample: Ke.has(n) ? n : "sine"
  };
}
function ct(i) {
  const n = /* @__PURE__ */ new Map(), e = [], t = (s, r) => {
    let a = n.get(s);
    return a || (a = r(), n.set(s, a), e.push(a)), a;
  };
  for (const s of i)
    for (const r of s.items) {
      const a = r;
      switch (r.kind) {
        case "number":
          if (a.varId === void 0 || a.varId === null) {
            const u = typeof a.varName == "string" && a.varName ? a.varName : "var_unnamed", l = t(u, () => ({
              id: q("vb"),
              name: u,
              type: Be.has(String(a.varType)) ? String(a.varType) : "int32",
              initialValue: T(a.initialValue, 0),
              min: T(a.min, 0),
              max: T(a.max, 100),
              step: T(a.step, 1)
            }));
            r.varId = l.id;
          }
          a.editable === void 0 && (r.editable = !0), delete a.varName, delete a.varType, delete a.step, delete a.min, delete a.max, delete a.initialValue, delete a.decimals;
          break;
        case "slider":
        case "progress":
          if (a.varId === void 0 || a.varId === null) {
            const u = typeof a.varName == "string" && a.varName ? a.varName : "var_unnamed", l = t(u, () => ({
              id: q("vb"),
              name: u,
              type: "int",
              initialValue: T(a.initialValue, 0),
              min: T(a.min, 0),
              max: T(a.max, 100),
              step: T(a.step, 1)
            }));
            r.varId = l.id;
          }
          delete a.varName, delete a.step, delete a.min, delete a.max, delete a.initialValue;
          break;
        case "switch":
          if (a.varId === void 0 || a.varId === null) {
            const u = typeof a.varName == "string" && a.varName ? a.varName : "var_unnamed", l = t(u, () => ({
              id: q("vb"),
              name: u,
              type: "uint8",
              initialValue: T(a.initialValue, 0),
              min: 0,
              max: 1,
              step: 1
            }));
            r.varId = l.id;
          }
          delete a.varName, delete a.initialValue;
          break;
      }
    }
  return e;
}
function ye(i) {
  let n;
  if (typeof i == "string")
    try {
      n = JSON.parse(i);
    } catch {
      throw new ae("JSON 解析失败");
    }
  else
    n = i;
  if (!re(n)) throw new ae("不是有效的工程文件");
  const e = n, t = T(e.version, 0);
  if (t > _e)
    throw new ae(`工程版本 v${t} 高于当前支持的 v${_e}，请升级编辑器`);
  const s = Array.isArray(e.pages) ? e.pages.map(ot) : [];
  if (!s.length) throw new ae("工程至少需要一个页面");
  const r = ["default", "rotundity", "square"].includes(e.selector) ? e.selector : "rotundity", a = new Set(se.map((d) => d.fn)), o = Array.isArray(e.weakHooks) ? [...new Set(e.weakHooks.filter((d) => typeof d == "string" && a.has(d)))] : [];
  let u;
  Array.isArray(e.variables) ? u = e.variables.map(ut).filter((d) => !!d) : u = ct(s);
  let l;
  return Array.isArray(e.chartBuffers) ? l = e.chartBuffers.map(lt).filter((d) => !!d) : l = dt(s), rt(s), mt(s, l), {
    version: _e,
    name: K(e.name, "未命名工程"),
    width: T(e.width, 128),
    height: T(e.height, 64),
    font: K(e.font, "u8g2_font_wqy12_t_gb2312"),
    selector: r,
    selectorLeftMargin: T(e.selectorLeftMargin, 16),
    selectorTopMargin: T(e.selectorTopMargin, 0),
    selectorLineSpacing: T(e.selectorLineSpacing, 0),
    marqueeSpeed: T(e.marqueeSpeed, 0.2),
    marqueeHeaderLen: T(e.marqueeHeaderLen, 5),
    weakHooks: o,
    fontSubset: n.fontSubset === !0,
    fontExtra: K(n.fontExtra, ""),
    variables: u,
    chartBuffers: l,
    pages: s
  };
}
function dt(i) {
  const n = [];
  let e = 0;
  const t = () => {
    const s = {
      id: q("buf"),
      name: `buf_chart_${++e}`,
      dataLen: 32,
      sample: "sine"
    };
    return n.push(s), s;
  };
  for (const s of i)
    for (const r of s.items) {
      if (r.kind !== "chart") continue;
      const a = r;
      if (Array.isArray(a.sources)) continue;
      const o = t();
      o.dataLen = Math.min(512, Math.max(2, Math.trunc(T(a.dataLen, 32))));
      const u = K(a.sample, "sine");
      Ke.has(u) && (o.sample = u);
      const l = K(a.chartKind, "line"), d = {
        bufferId: o.id,
        chartKind: De.has(l) ? l : "line"
      };
      a.max !== void 0 && a.max !== null && (d.max = T(a.max, 0)), a.min !== void 0 && a.min !== null && (d.min = T(a.min, 0)), r.sources = [d], a.height === void 0 && (r.height = 32), delete a.chartKind, delete a.dataLen, delete a.sample, delete a.max, delete a.min;
    }
  return n;
}
function mt(i, n) {
  const e = new Set(n.map((t) => t.id));
  for (const t of i)
    for (const s of t.items) {
      if (s.kind !== "chart") continue;
      const r = s;
      Array.isArray(r.sources) || (r.sources = []), s.sources = s.sources.filter((a) => e.has(a.bufferId)).map((a) => ({
        bufferId: a.bufferId,
        chartKind: De.has(a.chartKind) ? a.chartKind : "line",
        min: a.min,
        max: a.max
      })), typeof r.height != "number" && (r.height = 32);
    }
}
function Ne(i) {
  return JSON.stringify(i, null, 2);
}
const pt = {
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
function Z(i, n = "anon") {
  let e = i.trim().replace(/[^A-Za-z0-9_]/g, "_");
  return (!e || /^[0-9]/.test(e)) && (e = `_${e}`), e || n;
}
const be = /^[A-Za-z_][A-Za-z0-9_]*$/, Ue = /* @__PURE__ */ new Set([
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
function Fe(i) {
  return be.test(i) && !Ue.has(i);
}
function oe(i, n, e, t) {
  let s = i;
  if (Ue.has(s) && (s = `${s}_`, e.push(`${t} "${i}" 是 C 关键字，生成名改为 "${s}"`)), !n.has(s))
    return n.add(s), s;
  let r = 2;
  for (; n.has(`${s}_${r}`); ) r++;
  const a = `${s}_${r}`;
  return e.push(`${t} "${i}" 与其他生成符号冲突（页面函数/变量/缓冲区/字体数组），已改为 "${a}"`), n.add(a), a;
}
function ue(i) {
  return i.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function ne(i) {
  if (!Number.isFinite(i)) return "0.0f";
  const n = i.toString();
  return /[-.]|e/i.test(n) ? `${n}f` : `${n}.0f`;
}
function ft(i, n, e) {
  return e === "ramp" ? `${i}[i] = (float)i;` : e === "noise" ? `${i}[i] = (float)((i * 37) % ${n});` : `${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`;
}
function ht(i) {
  const n = /* @__PURE__ */ new Map();
  if (!i) return n;
  const e = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let t;
  for (; (t = e.exec(i)) !== null; ) n.set(t[1], t[2]);
  return n;
}
function X(i, n, e) {
  const t = n.has(i) ? n.get(i) : "";
  return `${e}/* USER CODE BEGIN ${i} */${t}${e}/* USER CODE END ${i} */`;
}
const bt = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]);
function gt(i, n, e) {
  const t = [], s = ht((n == null ? void 0 : n.c) ?? ""), r = /* @__PURE__ */ new Set();
  e && r.add("menu_font");
  const a = [];
  i.pages.forEach((c, w) => {
    let v = `page_${w}`;
    c.fnName && (be.test(c.fnName) ? v = c.fnName : t.push(`页面 "${c.name}" 的函数名 "${c.fnName}" 不是合法的 C 标识符，已回退为 page_${w}`)), a.push(oe(v, r, t, `页面 "${c.name}" 的函数名`));
  });
  const o = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (const c of i.variables ?? []) {
    if (!c.name) {
      t.push("存在未命名变量，已跳过");
      continue;
    }
    be.test(c.name) || t.push(`变量名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${Z(c.name)}"`);
    const w = Z(c.name, "var");
    if (o.has(w)) {
      t.push(`变量名 "${c.name}" 重复，以第一个为准`);
      continue;
    }
    const v = oe(w, r, t, `变量名 "${w}"`), I = c.type === "float" || c.type === "double", E = {
      name: v,
      srcType: c.type,
      type: pt[c.type],
      init: I ? ne(c.initialValue) : String(Math.trunc(c.initialValue)),
      isFloat: I,
      step: c.step,
      min: c.min,
      max: c.max
    };
    o.set(v, E), u.set(c.id, E);
  }
  const l = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), m = [], p = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Set();
  (i.chartBuffers ?? []).forEach((c, w) => {
    if (!c.name) {
      t.push("存在未命名数据源缓冲区，已跳过");
      return;
    }
    be.test(c.name) || t.push(`缓冲区名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${Z(c.name)}"`);
    const v = Z(c.name, "buf");
    if (f.has(v)) {
      t.push(`缓冲区名 "${c.name}" 与其它缓冲区重名，已跳过`);
      return;
    }
    f.add(v);
    const I = oe(v, r, t, `缓冲区名 "${v}"`), E = Math.max(2, Math.trunc(c.dataLen)), P = `${I.toUpperCase()}_LEN`;
    p.set(c.id, { name: I, lenMacro: P, len: E });
    const F = `fill_${I}`;
    if (!(s.get(F) ?? "").trim()) {
      const M = s.get(`chart${w}_fill`);
      M && M.trim() && (s.set(F, M), t.push(`已将旧版 chart${w}_fill 手写内容迁移至 ${F}（后续请直接在该区内维护）`));
    }
    const H = (s.get(F) ?? "").trim() !== "";
    m.push(
      `#define ${P} ${E}`,
      `static float ${I}[${P}];`,
      `static uint8_t ${I}_filled = 0;`,
      `static void ${I}_fill(void)`,
      "{",
      X(F, s, "    "),
      ...c.sample !== "none" && !H ? [`    for (uint16_t i = 0; i < ${P}; ++i) { ${ft(I, E, c.sample)} }`] : [],
      "}"
    );
  });
  const b = [], y = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  {
    let c = 0, w = 0;
    const v = (I) => {
      const E = p.get(I);
      return E ? (h.has(I) || h.set(I, `        if (!${E.name}_filled) { ${E.name}_filled = 1; ${E.name}_fill(); }`), h.get(I)) : "";
    };
    for (const I of i.pages)
      for (const E of I.items) {
        if (E.kind !== "chart") continue;
        const P = E.sources.filter((M) => p.has(M.bufferId));
        if (E.sources.length && !P.length) {
          t.push(`页面 ${I.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);
          continue;
        }
        if (!P.length) {
          t.push(`页面 ${I.name} 的图表条目未绑定数据源，已跳过`);
          continue;
        }
        const F = Math.max(4, Math.trunc(E.height)), H = [];
        for (const M of P) {
          const B = p.get(M.bufferId), _ = `chart${c++}`;
          b.push(
            `static float ${_}_dis[${B.lenMacro}];`,
            `static u8g2_chart_t ${_};`
          ), H.push({ name: _, s: M, b: B });
        }
        if (H.length === 1) {
          const { name: M, s: B, b: _ } = H[0];
          b.push(`static uint8_t ${M}_inited = 0;`), y.set(E.id, [
            `    if (!${M}_inited) {`,
            `        ${M}_inited = 1;`,
            `        u8g2_chart_init(&${M}, ${_.name}, ${M}_dis, ${_.lenMacro});`,
            v(B.bufferId),
            "    }"
          ]);
          const S = B.chartKind === "point" ? "Point" : B.chartKind === "bar" ? "Bar" : "Line", ce = B.min !== void 0 && B.max !== void 0 ? `${ne(B.max)}, ${ne(B.min)}` : "0, 0";
          g.set(E.id, `    u8g2_MenuDrawItem${S}Chart(&${M}, ${F}, ${ce});`);
        } else {
          const M = `chart_layers_${w++}`;
          b.push(
            `static u8g2_menu_drawChart_t ${M}[${H.length}];`,
            `static uint8_t ${M}_inited = 0;`
          );
          const B = [
            `    if (!${M}_inited) {`,
            `        ${M}_inited = 1;`
          ];
          H.forEach(({ name: _, s: S, b: ce }, de) => {
            B.push(`        u8g2_chart_init(&${_}, ${ce.name}, ${_}_dis, ${ce.lenMacro});`), B.push(v(S.bufferId));
            const Oe = S.chartKind === "point" ? "u8g2_drawPointChart" : S.chartKind === "bar" ? "u8g2_drawBarChart" : "u8g2_drawLineChart", Ae = S.min !== void 0 && S.max !== void 0 ? `${ne(S.max)}, ${ne(S.min)}` : "0, 0";
            B.push(`        ${M}[${de}].drawChart = ${Oe};`), B.push(`        ${M}[${de}].chart = &${_};`), B.push(`        ${M}[${de}].max = ${Ae.split(", ")[0]};`), B.push(`        ${M}[${de}].min = ${Ae.split(", ")[1]};`);
          }), B.push("    }"), y.set(E.id, B), g.set(E.id, `    u8g2_MenuDrawItemChart(${M}, ${H.length}, ${F});`);
        }
      }
  }
  const C = [], N = [], z = [], O = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Map();
  let U = 0;
  for (const c of i.pages)
    for (const w of c.items) {
      if (w.bind.type === "button") {
        const v = Z(w.bind.cbName, "btn_cb");
        l.has(v) || l.set(v, w.bind.buttonId);
      }
      switch (w.kind) {
        case "board":
          d.add(Z(w.cbName, "board_cb"));
          break;
        case "xbm": {
          let v = Z(w.name, "icon");
          for (; O.has(v); ) v = `${v}_2`;
          O.add(v), Q.set(w.id, v);
          const I = w.bits.length, E = w.bits.map((P) => `0x${(P & 255).toString(16).padStart(2, "0")}`).join(", ");
          C.push(`static const uint8_t menu_xbm_${v}[${I}] = { ${E} };`);
          break;
        }
        case "textarea": {
          const v = U++;
          N.push(
            `static char ta${v}_text[] = "${ue(w.content)}";`,
            `static u8g2_menu_textArea_t ta${v};`,
            `static uint8_t ta${v}_inited = 0;`
          ), z.push(
            `    if (!ta${v}_inited) {`,
            `        ta${v}_inited = 1;`,
            `        u8g2_textArea_init(&ta${v}, ta${v}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${v}, ${Math.max(0, Math.trunc(w.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
    }
  const A = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map();
  for (const c of l.keys()) A.set(c, oe(c, r, t, `按钮回调名 "${c}"`));
  for (const c of d) k.set(c, oe(c, r, t, `自绘板回调名 "${c}"`));
  const V = (c, w) => {
    if (!c) return "";
    const v = `"${ue(c)}"`;
    return w === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${v});` : `u8g2_MenuUTF8Printf(${v});`;
  }, j = (c, w, v) => {
    const I = `"${ue(c)}"`;
    return w === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${I}, ${v});` : `u8g2_MenuUTF8Printf(${I}, ${v});`;
  };
  let ee = 0;
  const le = (c, w) => {
    const v = [], I = `${w.name}`, E = (_) => {
      if (!_) return null;
      const S = u.get(_);
      return S || t.push(`页面 ${I} 的条目引用了已删除的变量，已按普通文本生成`), S ?? null;
    }, P = c.bind;
    let F = null, H = null, M = "on", B = "off";
    switch (P.type) {
      case "value": {
        const _ = E(P.varId);
        if (_) {
          F = _;
          const S = _.isFloat ? `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${ne(_.step)}, ${ne(_.min)}, ${ne(_.max)});` : `u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;
          v.push(`    ${S}`);
        }
        break;
      }
      case "switch": {
        const _ = E(P.varId);
        _ && _.srcType !== "uint8" ? t.push(`开关附加值绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`) : _ && (H = _, M = P.onText, B = P.offText, v.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(P.openValue)});`));
        break;
      }
      case "button": {
        const _ = Z(P.cbName, "btn_cb"), S = A.get(_) ?? _;
        v.push(`    u8g2_MenuItem_button(${S}, ${Math.trunc(P.buttonId)});`);
        break;
      }
      case "submenu": {
        const _ = i.pages.findIndex((S) => S.id === P.targetPageId);
        !P.targetPageId || _ < 0 ? t.push(`页面 ${I} 的条目 "${c.label || "未命名"}" 附加值目标页面无效，已按普通文本生成`) : v.push(`    u8g2_MenuItem_menu_enter(${a[_]});`);
        break;
      }
      case "back":
        v.push("    u8g2_MenuItem_menu_back();");
        break;
    }
    switch (c.kind) {
      case "text": {
        if (F)
          v.push(`    ${j(c.text, c.scale, F.name)}`), /%[-+ #0]*[a-zA-Z]/.test(c.text) || t.push(`页面 ${I} 的数值附加值条目显示文本不含格式化占位符（如 %d）`);
        else if (H)
          v.push(`    ${j(c.text, c.scale, `${H.name} ? "${ue(M)}" : "${ue(B)}"`)}`), /%[-+ #0]*s/.test(c.text) || t.push("开关附加值条目的显示文本建议包含 %s 用于显示 on/off");
        else if (P.type === "none" && c.displayVarId) {
          const _ = E(c.displayVarId);
          if (_)
            v.push(`    ${j(c.text, c.scale, _.name)}`), /%[-+ #0]*[a-zA-Z]/.test(c.text) || t.push(`页面 ${I} 的显示条目文本不含格式化占位符（如 %d）`);
          else {
            t.push(`页面 ${I} 的显示条目引用了已删除的变量，已按普通文本生成`);
            const S = V(c.text, c.scale);
            S && v.push(`    ${S}`);
          }
        } else if (/%[-+ #0]*[a-zA-Z]/.test(c.text)) {
          t.push(`页面 ${I} 的文本条目含占位符但未绑定变量/显示变量，占位符已移除`);
          const _ = V(c.text.replace(/%[-+ #0]*[a-zA-Z]/g, ""), c.scale);
          _ && v.push(`    ${_}`);
        } else {
          const _ = V(c.text, c.scale);
          _ && v.push(`    ${_}`);
        }
        break;
      }
      case "slider":
      case "progress": {
        const _ = c.kind === "slider" ? "Slider" : "ProgressBar";
        if (F) {
          if (!bt.has(F.srcType)) {
            t.push(`滑块/进度条附加值的变量 "${F.name}" 须为整型（当前 ${F.srcType}），已按静态显示生成`), v.push(`    u8g2_MenuDrawItem${_}(${(c.position / 100).toFixed(2)}f);`);
            break;
          }
          v.push(`    u8g2_MenuDrawItem${_}_bind(&${F.name}, ${Math.trunc(F.step)}, ${Math.trunc(F.min)}, ${Math.trunc(F.max)});`);
        } else {
          const S = Math.min(100, Math.max(0, c.position));
          v.push(`    u8g2_MenuDrawItem${_}(${(S / 100).toFixed(2)}f);`);
        }
        break;
      }
      case "chart": {
        const _ = y.get(c.id), S = g.get(c.id);
        if (!_ || !S) break;
        v.push(..._), v.push(S);
        break;
      }
      case "xbm":
        v.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${Q.get(c.id) ?? Z(c.name, "icon")});`);
        break;
      case "textarea": {
        const _ = ee++;
        v.push(...z[_].split(`
`));
        const S = c.bindScroll ? "u8g2_MenuDrawTextArea_bind" : "u8g2_MenuDrawTextArea";
        v.push(`    ${S}(&ta${_}, ${Math.max(10, Math.trunc(c.height))});`);
        break;
      }
      case "board": {
        const _ = Z(c.cbName, "board_cb"), S = k.get(_) ?? _;
        v.push(`    u8g2_MenuDrawItemBoard(${S}, ${Math.max(1, Math.trunc(c.w))}, ${Math.max(1, Math.trunc(c.h))});`);
        break;
      }
    }
    return v;
  }, x = [];
  x.push("/**"), x.push(` * 由 u8g2-menu-editor 自动生成，工程: ${i.name}`), x.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), x.push(" *"), x.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："), x.push(` *   u8g2_SetFont(&u8g2, ${e ? "menu_font" : i.font});`), a.forEach((c, w) => x.push(` *   void ${c}(void);   /* 页面: ${i.pages[w].name} */`));
  for (const c of o.values()) x.push(` *   extern ${c.type} ${c.name};`);
  for (const c of A.values()) x.push(` *   void ${c}(u8g2_menu_t *menu, uint8_t ID);`);
  for (const c of k.values()) x.push(` *   void ${c}(u8g2_t *u8g2);`);
  x.push(" */"), x.push('#include "u8g2_menu.h"'), (i.chartBuffers ?? []).some((c) => c.sample === "sine") && x.push("#include <math.h>"), x.push(""), x.push(X("includes", s, "")), x.push(""), a.forEach((c) => x.push(`void ${c}(void);`)), x.push(""), x.push("/* ======================== 变量定义 ======================== */"), x.push(X("variables", s, ""));
  for (const c of o.values()) x.push(`${c.type} ${c.name} = ${c.init};`);
  if (x.push(""), e) {
    x.push("/* ======================== 字体（现场取模） ======================== */"), x.push("/* 仅包含工程文本用到的字形（含 ASCII 95 个 + 额外字符），"), x.push(" * main.c 里 u8g2_SetFont(&u8g2, menu_font) 即可使用；"), x.push(' * 若运行时输出超出此字符集的中文，请在编辑器"额外包含字符"里补充后重新生成。 */');
    const c = [];
    for (let w = 0; w < e.length; w += 16)
      c.push("  " + [...e.slice(w, w + 16)].map((v) => `0x${v.toString(16).padStart(2, "0")}`).join(", ") + ",");
    x.push(`const uint8_t menu_font[${e.length}] U8G2_FONT_SECTION("menu_font") = {`), x.push(...c), x.push("};"), x.push("");
  }
  if ((m.length || b.length || N.length || C.length) && (x.push("/* ======================== 页面资源 ======================== */"), x.push(...m, ...b, ...N, ...C), x.push("")), l.size || d.size) {
    x.push("/* ======================== 回调函数 ======================== */"), x.push(X("callbacks", s, ""));
    for (const [c] of l) {
      const w = A.get(c);
      x.push(`void ${w}(u8g2_menu_t *menu, uint8_t ID)`), x.push("{"), x.push(X(`cb_${w}`, s, "    ")), x.push("}"), x.push("");
    }
    for (const c of d) {
      const w = k.get(c);
      x.push(`void ${w}(u8g2_t *u8g2)`), x.push("{"), x.push(X(`cb_${w}`, s, "    ")), x.push("}"), x.push("");
    }
  }
  const J = (i.weakHooks ?? []).map((c) => se.find((w) => w.fn === c)).filter((c) => !!c);
  if (J.length || s.has("weak") || se.some((c) => (s.get(`weak_${c.fn}`) ?? "").trim())) {
    x.push("/* ==================== 弱定义函数重写 ==================== */"), x.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"), x.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");
    const w = se.filter((v) => {
      var I;
      return !((I = i.weakHooks) != null && I.includes(v.fn)) && (s.get(`weak_${v.fn}`) ?? "").trim();
    }).map((v) => [
      `#if 0   /* 已取消勾选 ${v.fn}，手写内容保留于此；重新勾选后恢复编译 */`,
      `${v.decl}`,
      "{",
      X(`weak_${v.fn}`, s, "    "),
      "}",
      "#endif"
    ].join(`
`)).join(`
`);
    x.push(w ? `${X("weak", s, "").replace(/\n$/, "")}
${w}
` : X("weak", s, "")), x.push("");
    for (const v of J) {
      x.push(`/* ${v.label}: ${v.desc} */`), x.push(`${v.decl}`), x.push("{"), x.push(X(`weak_${v.fn}`, s, "    "));
      const I = v.bodyArgs.split(`
`).map((E) => `    ${E}`);
      v.retNote && I.push(`    ${v.retNote}`), x.push(...I), x.push("}"), x.push("");
    }
  }
  return x.push("/* ======================== 页面函数 ======================== */"), x.push(""), i.pages.forEach((c, w) => {
    x.push(`/* 页面: ${c.name} */`), x.push(`void ${a[w]}(void)`), x.push("{"), x.push(X(`page_${a[w]}_pre`, s, "    "));
    for (const v of c.items) x.push(...le(v, c));
    x.push("}"), x.push("");
  }), { c: `${x.join(`
`).replace(/\n{3,}/g, `


`)}
`, warnings: t };
}
function vt(i) {
  return {
    raw: i.slice(0, 23),
    glyphCnt: i[0],
    startUpperA: i[17] << 8 | i[18],
    startLowerA: i[19] << 8 | i[20],
    startUnicode: i[21] << 8 | i[22]
  };
}
function je(i, n, e) {
  const t = [], s = [], r = [], a = [...n].sort((b, y) => b - y);
  for (const b of a) {
    const y = e(b);
    if (!y || !y.length) {
      r.push(b);
      continue;
    }
    b <= 255 ? t.push({ encoding: b, entry: y }) : s.push({ encoding: b, entry: y });
  }
  if (!t.length && !s.length) return null;
  const o = t.length + s.length;
  let u = 0;
  for (const b of t) u += b.entry.length;
  u += 2;
  let l = 4;
  for (const b of s) l += b.entry.length;
  l += 2;
  const d = vt(i), m = new Uint8Array(23 + u + l);
  m.set(d.raw, 0), m[0] = o, m[17] = 0, m[18] = 0, m[19] = 0, m[20] = 0, m[21] = 0, m[22] = 0;
  let p = 23;
  for (const b of t) {
    if (b.encoding === 65) {
      const y = p - 23;
      m[17] = y >> 8 & 255, m[18] = y & 255;
    }
    if (b.encoding === 97) {
      const y = p - 23;
      m[19] = y >> 8 & 255, m[20] = y & 255;
    }
    m.set(b.entry, p), p += b.entry.length;
  }
  m[p] = 0, m[p + 1] = 0, p += 2;
  const f = p - 23;
  m[21] = f >> 8 & 255, m[22] = f & 255, m[p] = 0, m[p + 1] = 4, m[p + 2] = 255, m[p + 3] = 255, p += 4;
  for (const b of s)
    m.set(b.entry, p), p += b.entry.length;
  return m[p] = 0, m[p + 1] = 0, { font: m, included: o, missing: r };
}
function xt(i) {
  return [...i].map((n) => n.codePointAt(0)).filter((n) => Number.isFinite(n));
}
function $t() {
  const i = [];
  for (let n = 32; n <= 126; n++) i.push(n);
  return i;
}
function Te(i, n) {
  const e = new Set($t()), t = (s) => {
    for (const r of xt(s)) e.add(r);
  };
  for (const s of i.pages)
    for (const r of s.items)
      r.kind === "text" && t(r.text), r.kind === "textarea" && t(r.content), r.bind.type === "switch" && (t(r.bind.onText), t(r.bind.offText));
  return t(n), e.delete(10), e.delete(13), e;
}
function Re(i) {
  let n = 0, e = 0;
  for (const t of i) t <= 126 ? n++ : e++;
  return { total: i.size, ascii: n, cjk: e };
}
var R = /* @__PURE__ */ ((i) => (i[i.None = 0] = "None", i[i.Up = 1] = "Up", i[i.Down = 2] = "Down", i[i.Enter = 3] = "Enter", i[i.Return = 4] = "Return", i[i.Add = 5] = "Add", i[i.Sub = 6] = "Sub", i))(R || {});
const _t = 64, yt = 8192 / 8;
function wt(i) {
  return new Promise((n, e) => {
    const t = document.createElement("script");
    t.src = i, t.onload = () => n(), t.onerror = () => e(new Error(`预览引擎脚本加载失败: ${i}`)), document.head.appendChild(t);
  });
}
class kt {
  constructor(n, e = {}) {
    this.mod = null, this.img = null, this.raf = 0, this.lastT = 0, this.running = !1, this.fontIndexCache = /* @__PURE__ */ new Map(), this.structSig = "", this.fontSig = null, this.lastKnownPage = 0, this.fontApplyWarning = null, this.canvas = document.createElement("canvas"), this.canvas.width = 128, this.canvas.height = 64, this.canvas.className = "ume-preview-canvas", n.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.events = e;
  }
  /** 加载 WASM 引擎（幂等） */
  async load(n) {
    if (this.mod) return;
    const e = window;
    e.U8G2MenuPreview || await wt(n);
    const t = e.U8G2MenuPreview;
    if (!t) throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");
    this.mod = await t({
      locateFile: (r) => n.replace(/[^/\\]*$/, "") + r
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const s = this.mod._em_font_count_export();
    for (let r = 0; r < s; r++) {
      const a = this.mod._em_font_name(r);
      this.fontIndexCache.set(this.mod.UTF8ToString(a), r);
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
  fontIndex(n) {
    return this.fontIndexCache.get(n) ?? 0;
  }
  /** 结构签名：只有页面/条目结构或资源尺寸变化才重置资源池（保留预览中的编辑值） */
  signature(n) {
    return JSON.stringify({
      bufs: (n.chartBuffers ?? []).map((e) => `${e.name}|${e.dataLen}|${e.sample}`),
      pages: n.pages.map((e) => ({
        n: e.items.length,
        k: e.items.map((t) => t.kind).join(","),
        res: e.items.map((t) => t.kind === "chart" ? (t.sources ?? []).map((s) => `${s.bufferId}|${s.chartKind}|${s.min ?? "a"}|${s.max ?? "a"}`).join(">") : t.kind === "xbm" ? `${t.w}x${t.h}` : t.kind === "textarea" ? Math.ceil(t.content.length / 64) : "").join(",")
      }))
    });
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(n) {
    const e = this.mod;
    if (!e) return;
    const t = this.signature(n);
    t !== this.structSig && (e.ccall("em_reset_dynamic", null, [], []), this.structSig = t);
    const s = (d) => Math.trunc(Number.isFinite(d) ? d : 0), r = { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }, a = { text: 0, slider: 1, progress: 2, chart: 3, xbm: 4, textarea: 5, board: 6 }, o = { none: 0, value: 1, switch: 2, button: 3, submenu: 4, back: 5 }, u = { sine: 0, ramp: 1, noise: 2, none: 3 }, l = (d) => d ? (n.variables ?? []).findIndex((m) => m.id === d) : -1;
    if ((n.variables ?? []).forEach((d, m) => {
      e.ccall(
        "em_var_define",
        null,
        ["number", "number", "number", "number", "number", "number"],
        [m, r[d.type], s(d.initialValue), s(d.step), s(d.min), s(d.max)]
      );
    }), (n.chartBuffers ?? []).forEach((d, m) => {
      e.ccall(
        "em_buf_define",
        null,
        ["number", "number", "number"],
        [m, s(d.dataLen), u[d.sample]]
      );
    }), n.pages.forEach((d, m) => {
      e.ccall("em_page_begin", null, ["number"], [m]), d.items.forEach((p, f) => {
        const b = () => {
          const y = p.bind;
          if (y.type === "none") return;
          const g = y.type === "value" || y.type === "switch", h = g ? (n.variables ?? []).find((C) => C.id === y.varId) : void 0;
          e.ccall(
            "em_page_bind",
            null,
            ["number", "number", "number", "number", "number", "number", "number", "number"],
            [
              m,
              f,
              o[y.type],
              g && h ? r[h.type] : 0,
              y.type === "switch" ? s(y.openValue) : 0,
              y.type === "button" ? s(y.buttonId) : 0,
              y.type === "submenu" ? n.pages.findIndex((C) => C.id === y.targetPageId) : -1,
              g && h ? l(h.id) : -1
            ]
          ), y.type === "switch" && e.ccall(
            "em_item_switch_text",
            null,
            ["number", "number", "string", "string"],
            [m, f, y.onText, y.offText]
          );
        };
        switch (p.kind) {
          case "text":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [
                m,
                f,
                a.text,
                p.scale,
                0,
                0,
                0,
                p.displayVarId ? l(p.displayVarId) : -1,
                -1
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [m, f, p.text]), b();
            break;
          case "slider":
          case "progress":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, f, a[p.kind], 1, 0, 0, 0, -1, -1]
            ), b();
            break;
          case "chart":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, f, a.chart, 1, s(p.height), 0, 0, -1, -1]
            );
            for (const y of p.sources ?? [])
              e.ccall(
                "em_item_chart_add",
                null,
                ["number", "number", "number", "number", "number", "number", "number"],
                [
                  m,
                  f,
                  (n.chartBuffers ?? []).findIndex((g) => g.id === y.bufferId),
                  { line: 0, point: 1, bar: 2 }[y.chartKind],
                  y.min !== void 0 && y.max !== void 0 ? 1 : 0,
                  y.max ?? 0,
                  y.min ?? 0
                ]
              );
            b();
            break;
          case "xbm":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, f, a.xbm, 1, 0, s(p.w), s(p.h), -1, -1]
            );
            {
              const y = e._em_scratch(p.bits.length);
              y && (e.HEAPU8.set(new Uint8Array(p.bits), y), e._em_item_bits(m, f, y, p.bits.length));
            }
            b();
            break;
          case "textarea":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, f, a.textarea, 1, s(p.height), 0, 0, -1, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [m, f, p.content]), b();
            break;
          case "board":
            e.ccall(
              "em_page_item",
              null,
              ["number", "number", "number", "number", "number", "number", "number", "number", "number"],
              [m, f, a.board, 1, 0, s(p.w), s(p.h), -1, -1]
            ), b();
            break;
        }
      }), e.ccall("em_page_end", null, ["number", "number"], [m, d.items.length]);
    }), e.ccall("em_pages_commit", null, ["number"], [n.pages.length]), e.ccall(
      "em_set_style",
      null,
      ["number", "number", "number", "number", "number", "number", "number"],
      [
        this.fontIndex(n.font),
        { default: 0, rotundity: 1, square: 2 }[n.selector],
        s(n.selectorLeftMargin),
        s(n.selectorTopMargin),
        s(n.selectorLineSpacing),
        n.marqueeSpeed,
        n.marqueeHeaderLen
      ]
    ), n.fontSubset) {
      const d = Te(n, n.fontExtra), m = n.font + "|" + [...d].sort((p, f) => p - f).join(",");
      m !== this.fontSig && (this.fontSig = m, this.applyFontSubset(this.fontIndex(n.font), d));
    } else this.fontSig !== null && (this.fontSig = null, this.fontApplyWarning = null);
  }
  /** 应用子集字体到预览引擎；失败时记录 fontApplyWarning（供生成代码时并入警告） */
  applyFontSubset(n, e) {
    this.fontApplyWarning = null;
    const t = this.getFontBytes(n), s = this.glyphFetcher(n), r = t && s ? je(t, e, s) : null;
    if (!r) {
      this.fontApplyWarning = "现场取模未命中任何字形，预览使用内置字体";
      return;
    }
    this.useCustomFont(r.font) || (this.fontApplyWarning = `子集字体 ${r.font.length} 字节超过预览槽位容量，预览已回退全字库（导出的 menu_font 数组不受影响）`);
  }
  start() {
    if (this.running) return;
    this.running = !0, this.lastT = performance.now();
    const n = (e) => {
      if (!this.running) return;
      const t = Math.min(100, Math.round(e - this.lastT));
      this.lastT = e, this.renderFrame(t), this.raf = requestAnimationFrame(n);
    };
    this.raf = requestAnimationFrame(n);
  }
  stop() {
    this.running = !1, cancelAnimationFrame(this.raf);
  }
  renderFrame(n) {
    var o, u;
    const e = this.mod;
    if (!e) return;
    const t = e._em_frame(n);
    if (!t) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const s = e.HEAPU8.subarray(t, t + yt), r = this.img.data;
    r.fill(255);
    for (let l = 0; l < 64; l++) {
      const d = (l >> 3) * 128, m = 1 << (l & 7);
      let p = l * 128 * 4;
      for (let f = 0; f < 128; f++)
        s[d + f] & m && (r[p] = 17, r[p + 1] = 24, r[p + 2] = 39), p += 4;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const a = e._em_get_current_page();
    a !== this.lastKnownPage && (this.lastKnownPage = a, (u = (o = this.events).onPageChanged) == null || u.call(o, a));
  }
  key(n) {
    var e;
    (e = this.mod) == null || e.ccall("em_key", null, ["number"], [n]);
  }
  /** 预览跳转到指定页（不经过子页面链路） */
  navTo(n) {
    var e;
    (e = this.mod) == null || e.ccall("em_nav", null, ["number"], [n]);
  }
  /** 读取内置字体原始字节（现场取模的源数据） */
  getFontBytes(n) {
    const e = this.mod;
    if (!e) return null;
    const t = e.ccall("em_font_data", "number", ["number"], [n]), s = e.ccall("em_font_data_len", "number", ["number"], [n]);
    return !t || !s ? null : e.HEAPU8.slice(t, t + s);
  }
  /** 字形拉取器：从 WASM 真库逐字获取原始条目（与渲染同一路径） */
  glyphFetcher(n) {
    const e = this.mod;
    return e ? (t) => {
      const s = e.ccall("em_scratch", "number", ["number"], [64]), r = e.ccall(
        "em_font_glyph",
        "number",
        ["number", "number", "number", "number"],
        [n, t, 64, s]
      );
      return r ? e.HEAPU8.slice(s, s + r) : null;
    } : null;
  }
  /** 加载自定义（子集）字体并切换；超出槽位容量返回 false */
  useCustomFont(n) {
    const e = this.mod;
    if (!e) return !1;
    const t = e.ccall("em_custom_font_ptr", "number", [], []), s = e.ccall("em_custom_font_max", "number", [], []);
    return n.length > s ? !1 : (e.HEAPU8.set(n, t), e.ccall("em_set_custom_font", null, ["number"], [n.length]), !0);
  }
  /** 读取值池槽位的实时值（绑定变量的条目：槽位 = 变量在池中的下标） */
  getInt(n) {
    var e;
    return ((e = this.mod) == null ? void 0 : e._em_get_ipool(n)) ?? 0;
  }
  getSwitch(n) {
    var e;
    return ((e = this.mod) == null ? void 0 : e._em_get_upool(n)) ?? 0;
  }
  destroy() {
    this.stop(), this.canvas.remove(), this.mod = null;
  }
}
const It = Object.keys(ge);
function St(i, n, e, t) {
  const s = i.getState(), r = e.label || "text" in e && e.text || ge[e.kind], a = e.bind.type !== "none" ? ` · ${he[e.bind.type]}` : "", o = (u) => (l) => {
    l.stopPropagation(), i.getState().moveItem(n.id, e.id, u);
  };
  return $`<div class="ume-item-row ${t ? "selected" : ""}"
    @click=${() => i.getState().select(n.id, e.id)}>
    <span class="ume-item-icon">${et[e.kind]}</span>
    <span class="ume-item-name" title=${r + a}>${r}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(u) => {
    u.stopPropagation(), s.duplicateItem(n.id, e.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(u) => {
    u.stopPropagation(), s.removeItem(n.id, e.id);
  }}>✕</button>
  </div>`;
}
function Et(i, n) {
  const e = i.getState();
  return $`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(t) => {
    const s = t.target.value;
    s && e.addItem(s, n.id), t.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${It.map((t) => $`<option value=${t}>${ge[t]}</option>`)}
  </select>`;
}
function Mt(i, n) {
  const { project: e, selection: t } = n.getState(), s = (r) => {
    const a = n.getState(), o = t.pageId === r.id;
    return $`<div class="ume-page">
      <div class="ume-page-head ${o ? "selected" : ""}"
        @click=${() => n.getState().select(r.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${r.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(u) => {
      u.stopPropagation(), a.movePage(r.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(u) => {
      u.stopPropagation(), a.movePage(r.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(u) => {
      if (u.stopPropagation(), e.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${r.name}"？`) && a.removePage(r.id);
    }}>✕</button>
      </div>
      ${o ? $`<div class="ume-page-items">
        ${r.items.length ? r.items.map((u) => St(n, r, u, t.itemId === u.id)) : $`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Et(n, r)}</div>
      </div>` : L}
    </div>`;
  };
  ie($`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => Ct(n)}>＋ 页面</button>
    </div>
    ${e.pages.map(s)}
  `, i);
}
function Ct(i) {
  const n = prompt("页面名称:", `页面${i.getState().project.pages.length + 1}`);
  n !== null && i.getState().addPage(n || void 0);
}
function W(i, n, e, t = "") {
  return $`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${n ?? ""} placeholder=${t}
      @change=${(s) => e(s.target.value)} />
  </div>`;
}
function D(i, n, e, t = 1) {
  return $`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(n)} step=${String(t)}
      @change=${(s) => {
    const r = parseFloat(s.target.value);
    e(Number.isFinite(r) ? r : 0);
  }} />
  </div>`;
}
function G(i, n, e, t) {
  return $`<div class="ume-field">
    <label>${i}</label>
    <select @change=${(s) => t(s.target.value)}>
      ${e.map((s) => $`<option value=${s.value} ?selected=${s.value === n}>${s.label}</option>`)}
    </select>
  </div>`;
}
function Me(i, n, e) {
  return $`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${n}
      @change=${(t) => e(t.target.checked)} />
    <span>${i}</span>
  </div>`;
}
function Tt(i, n, e, t = !1) {
  return $`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${t ? "font-family:Consolas,monospace" : ""}
      @change=${(s) => e(s.target.value)}>${n ?? ""}</textarea>
  </div>`;
}
function Ce(i, n, e = "text/plain") {
  const t = new Blob([n], { type: `${e};charset=utf-8` }), s = document.createElement("a");
  s.href = URL.createObjectURL(t), s.download = i, s.click(), setTimeout(() => URL.revokeObjectURL(s.href), 5e3);
}
let we = null;
const ze = {
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
function ke(i, n, e, t) {
  const s = [
    { value: "", label: "（未绑定）" },
    ...e.map((a) => ({ value: a.id, label: `${a.name} : ${ze[a.type] ?? a.type}` }))
  ], r = n ? e.some((a) => a.id === n) : !1;
  return $`
    ${G(i, n ?? "", s, (a) => t(a || null))}
    ${n && !r ? $`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>` : L}
    ${e.length === 0 ? $`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>` : L}
  `;
}
function Ie(i, n) {
  return $`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
    const e = i.getState().addVariable();
    n(e);
  }}>＋ 新建变量并绑定</button>
  </div>`;
}
function Se(i) {
  return i ? $`<div class="ume-hint">
    ${i.name} : ${ze[i.type] ?? i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>` : $`${L}`;
}
function At(i, n, e) {
  const { project: t, selection: s } = n.getState(), r = t.pages.find((f) => f.id === s.pageId) ?? null, a = (r == null ? void 0 : r.items.find((f) => f.id === s.itemId)) ?? null, o = t.variables ?? [], u = t.chartBuffers ?? [], l = (f, b) => n.getState().updateItem(r.id, a.id, f, b), d = (f) => l({ bind: f });
  let m = $`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, p = "";
  if (r && !a)
    p = "页面属性", m = $`
      ${W("名称", r.name, (f) => n.getState().updatePage(r.id, { name: f }))}
      ${W("C 函数名", r.fnName, (f) => n.getState().updatePage(r.id, { fnName: f }), "留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;
  else if (r && a) {
    (a.bind.type === "value" || a.bind.type === "switch") && a.bind.varId && (we = a.bind.varId), p = `${ge[a.kind]}${a.bind.type !== "none" ? ` + ${he[a.bind.type]}` : ""}`;
    let f = $``;
    switch (a.kind) {
      case "text": {
        const g = a, h = o.find((C) => C.id === g.displayVarId);
        f = $`
          ${W("文本/格式", g.text, (C) => l({ text: C }, `text-${g.id}`))}
          ${G("大小", String(g.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (C) => l({ scale: Number(C) }))}
          ${a.bind.type === "none" ? $`
            ${ke("显示变量", g.displayVarId, o, (C) => l({ displayVarId: C }))}
            ${h ? L : Ie(n, (C) => l({ displayVarId: C.id }))}
            ${Se(h)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>` : L}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const g = a;
        f = $`
          ${a.bind.type === "none" ? $`
            ${D("静态位置(%)", g.position, (h) => l({ position: Math.min(100, Math.max(0, Math.trunc(h))) }))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>` : L}
        `;
        break;
      }
      case "chart": {
        const g = a, h = (N) => l({ sources: N }), C = (N, z) => {
          const O = u.find((U) => U.id === N.bufferId), Q = N.min === void 0 || N.max === void 0;
          return $`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(O == null ? void 0 : O.name) ?? "(无效)"}</span>
              <span class="ume-var-meta">${{ line: "折线", point: "散点", bar: "柱状" }[N.chartKind] ?? N.chartKind}${Q ? " · 自动量程" : ` · ${N.min}~${N.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${() => h(g.sources.filter((U, A) => A !== z))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${G("缓冲区", N.bufferId, u.map((U) => ({ value: U.id, label: `${U.name} (${U.dataLen}点)` })), (U) => h(g.sources.map((A, k) => k === z ? { ...A, bufferId: U } : A)))}
              ${G("绘制", N.chartKind, [
            { value: "line", label: "折线" },
            { value: "point", label: "散点" },
            { value: "bar", label: "柱状" }
          ], (U) => h(g.sources.map((A, k) => k === z ? { ...A, chartKind: U } : A)))}
              ${Me("自动量程", Q, (U) => h(g.sources.map((A, k) => k === z ? { ...A, min: U ? void 0 : 0, max: U ? void 0 : 100 } : A)))}
              ${Q ? L : $`
                ${D("量程上限", N.max ?? 100, (U) => h(g.sources.map((A, k) => k === z ? { ...A, max: U } : A)), "any")}
                ${D("量程下限", N.min ?? 0, (U) => h(g.sources.map((A, k) => k === z ? { ...A, min: U } : A)), "any")}`}
            </div>
          </div>`;
        };
        f = $`
          ${D("高度(px)", g.height, (N) => l({ height: Math.max(4, Math.trunc(N)) }))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(g.sources ?? []).map(C)}
              ${(g.sources ?? []).length === 0 ? $`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>` : L}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(g.sources ?? []).length >= 4}
                @click=${() => {
          if (!u.length) {
            const N = n.getState().addChartBuffer();
            h([...g.sources ?? [], { bufferId: N.id, chartKind: "line" }]);
            return;
          }
          h([...g.sources ?? [], { bufferId: u[0].id, chartKind: "line" }]);
        }}>＋ 添加数据源${(g.sources ?? []).length > 0 ? "（叠加）" : ""}</button>
              ${u.length ? L : $`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;
        break;
      }
      case "xbm": {
        const g = a;
        f = $`
          ${W("数组名", g.name, (h) => l({ name: h }))}
          ${D("宽(px)", g.w, (h) => l({ w: Math.min(128, Math.max(1, Math.trunc(h))) }))}
          ${D("高(px)", g.h, (h) => l({ h: Math.min(64, Math.max(1, Math.trunc(h))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => e.openXbmEditor(r.id, g.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${g.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const g = a;
        f = $`
          ${Tt("文本内容", g.content, (h) => l({ content: h }))}
          ${D("高度(px)", g.height, (h) => l({ height: Math.max(10, Math.trunc(h)) }))}
          ${D("行间距", g.lineSpacing, (h) => l({ lineSpacing: Math.max(0, Math.trunc(h)) }))}
          ${Me("上下键滚动 (bind)", g.bindScroll, (h) => l({ bindScroll: h }))}
        `;
        break;
      }
      case "board": {
        const g = a;
        f = $`
          ${D("宽(px)", g.w, (h) => l({ w: Math.max(1, Math.trunc(h)) }))}
          ${D("高(px)", g.h, (h) => l({ h: Math.max(1, Math.trunc(h)) }))}
          ${W("回调函数名", g.cbName, (h) => l({ cbName: h }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
    const b = a.bind;
    let y = $``;
    switch (b.type) {
      case "none":
        y = $`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;
        break;
      case "value": {
        const g = o.find((h) => h.id === b.varId);
        y = $`
          ${ke("变量", b.varId, o, (h) => d({ type: "value", varId: h }))}
          ${g ? L : Ie(n, (h) => d({ type: "value", varId: h.id }))}
          ${Se(g)}
          ${a.kind === "text" ? $`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>` : L}
        `;
        break;
      }
      case "switch": {
        const g = o.filter((h) => h.type === "uint8").find((h) => h.id === b.varId) ?? o.find((h) => h.id === b.varId);
        y = $`
          ${ke("变量 (uint8)", b.varId, o.filter((h) => h.type === "uint8"), (h) => d({ type: "switch", varId: h, openValue: b.openValue, onText: b.onText, offText: b.offText }))}
          ${g ? L : Ie(n, (h) => d({ type: "switch", varId: h.id, openValue: b.openValue, onText: b.onText, offText: b.offText }))}
          ${Se(g)}
          ${D("openValue", b.openValue, (h) => d({ type: "switch", varId: b.varId, openValue: Math.max(0, Math.trunc(h)), onText: b.onText, offText: b.offText }))}
          ${W('"开"文本', b.onText, (h) => d({ type: "switch", varId: b.varId, openValue: b.openValue, onText: h, offText: b.offText }))}
          ${W('"关"文本', b.offText, (h) => d({ type: "switch", varId: b.varId, openValue: b.openValue, onText: b.onText, offText: h }))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case "button":
        y = $`
          ${W("回调函数名", b.cbName, (g) => d({ type: "button", cbName: g, buttonId: b.buttonId }))}
          ${D("ID", b.buttonId, (g) => d({ type: "button", cbName: b.cbName, buttonId: Math.max(0, Math.trunc(g)) }))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;
        break;
      case "submenu":
        y = $`
          ${G("目标页面", b.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...t.pages.filter((g) => g.id !== r.id).map((g) => ({ value: g.id, label: g.name }))
        ], (g) => d({ type: "submenu", targetPageId: g || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;
        break;
      case "back":
        y = $`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;
        break;
    }
    m = $`
      <div class="ume-panel-title">绘制</div>
      ${f}
      <div class="ume-panel-title">附加值</div>
      ${G("类型", b.type, Object.keys(he).map((g) => ({ value: g, label: he[g] })), (g) => {
      const h = a.bind;
      d(g === "value" ? { type: "value", varId: h.type === "value" || h.type === "switch" ? h.varId : we } : g === "switch" ? { type: "switch", varId: h.type === "value" || h.type === "switch" ? h.varId : we, openValue: 1, onText: "on", offText: "off" } : g === "button" ? { type: "button", cbName: "btn_action_cb", buttonId: 1 } : g === "submenu" ? { type: "submenu", targetPageId: h.type === "submenu" ? h.targetPageId : null } : { type: "none" });
    })}
      ${y}
    `;
  }
  ie($`
    ${p ? $`<div class="ume-panel-title"><span class="ume-kind-badge">${p}</span></div>` : L}
    ${m}
  `, i);
}
let pe = null, Ee = null;
const Nt = [
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
function Vt(i, n) {
  const e = n.variables ?? [], t = (r) => {
    pe = pe === r ? null : r;
  }, s = (r) => {
    const a = pe === r.id, o = (p, f) => i.getState().updateVariable(r.id, p, f), u = r.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name), l = r.name && !u && !Fe(r.name), d = e.filter((p) => p.name === r.name).length > 1, m = Lt(n, r.id);
    return $`<div class="ume-var-item ${a ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => t(r.id)}>
        <span class="ume-var-name" title=${r.name}>${r.name || "(未命名)"}</span>
        <span class="ume-var-meta">${r.type} · ${r.min}~${r.max} · 步${r.step}${m ? ` · ${m} 处引用` : ""}</span>
        <button class="ume-mini" title="删除变量" @click=${(p) => {
      p.stopPropagation();
      const f = i.getState().removeVariable(r.id);
      f > 0 && alert(`该变量被 ${f} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`);
    }}>✕</button>
      </div>
      ${a ? $`<div class="ume-var-edit">
        ${W("变量名", r.name, (p) => o({ name: p.trim() }, `vn-${r.id}`))}
        ${u ? $`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>` : L}
        ${l ? $`<div class="ume-warn">变量名是 C 关键字，生成的代码会自动改名（如 ${r.name}_），建议换个名字</div>` : L}
        ${d ? $`<div class="ume-warn">变量名重复，生成时以第一个为准</div>` : L}
        ${G("类型", r.type, Nt, (p) => o({ type: p }))}
        ${D("初始值", r.initialValue, (p) => o({ initialValue: p }, `vi-${r.id}`), "any")}
        ${D("最小值", r.min, (p) => o({ min: p }, `vmin-${r.id}`), "any")}
        ${D("最大值", r.max, (p) => o({ max: p }, `vmax-${r.id}`), "any")}
        ${D("步长", r.step, (p) => o({ step: p }, `vs-${r.id}`), "any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>` : L}
    </div>`;
  };
  return $`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${() => {
    pe = i.getState().addVariable().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(s) : $`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `;
}
function Lt(i, n) {
  let e = 0;
  for (const t of i.pages)
    for (const s of t.items)
      "varId" in s && s.varId === n && e++;
  return e;
}
function Pt(i, n) {
  const e = n.chartBuffers ?? [], t = (r) => {
    let a = 0;
    for (const o of n.pages)
      for (const u of o.items)
        u.kind === "chart" && u.sources.some((l) => l.bufferId === r) && a++;
    return a;
  }, s = (r) => {
    const a = Ee === r.id, o = (m, p) => i.getState().updateChartBuffer(r.id, m, p), u = r.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name), l = r.name && !u && !Fe(r.name), d = t(r.id);
    return $`<div class="ume-var-item ${a ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => {
      Ee = a ? null : r.id;
    }}>
        <span class="ume-var-name" title=${r.name}>${r.name || "(未命名)"}</span>
        <span class="ume-var-meta">${r.dataLen} 点 · ${{ sine: "正弦", ramp: "斜坡", noise: "伪随机", none: "手动填充" }[r.sample]}${d ? ` · ${d} 处引用` : ""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${(m) => {
      m.stopPropagation();
      const p = i.getState().removeChartBuffer(r.id);
      p > 0 && alert(`该缓冲区被 ${p} 个图表条目的数据源引用，请先在条目里移除数据源再删除`);
    }}>✕</button>
      </div>
      ${a ? $`<div class="ume-var-edit">
        ${W("数组名", r.name, (m) => o({ name: m.trim() }, `bn-${r.id}`))}
        ${u ? $`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>` : L}
        ${l ? $`<div class="ume-warn">数组名是 C 关键字，生成的代码会自动改名（如 ${r.name}_），建议换个名字</div>` : L}
        ${D("点数", r.dataLen, (m) => o({ dataLen: Math.min(512, Math.max(2, Math.trunc(m))) }, `bl-${r.id}`))}
        ${G("示例填充", r.sample, [
      { value: "sine", label: "正弦（演示）" },
      { value: "ramp", label: "斜坡（演示）" },
      { value: "noise", label: "伪随机（演示）" },
      { value: "none", label: "不填充（全部手写）" }
    ], (m) => o({ sample: m }))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>` : L}
    </div>`;
  };
  return $`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${() => {
    Ee = i.getState().addChartBuffer().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(s) : $`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `;
}
function Bt(i, n) {
  const { project: e } = n.getState();
  ie($`
    ${Vt(n, e)}
    ${Pt(n, e)}
  `, i);
}
function Dt(i, n) {
  const { project: e } = n.getState(), t = (o, u) => n.getState().update((l) => {
    Object.assign(l, o);
  }, u), s = e.weakHooks ?? [], r = (o, u) => {
    n.getState().update((l) => {
      const d = l.weakHooks ?? [];
      l.weakHooks = u ? [.../* @__PURE__ */ new Set([...d, o])] : d.filter((m) => m !== o);
    });
  }, a = $`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${s.length}/${se.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${se.map((o) => $`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote ? "（返回 1 = 事件已处理 / 0 = 交给库）" : ""}`}>
              <input type="checkbox" ?checked=${s.includes(o.fn)}
                @change=${(u) => r(o.fn, u.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;
  ie($`
    <div class="ume-panel-title">工程</div>
    ${W("工程名", e.name, (o) => t({ name: o }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width !== 128 || e.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${G(
    "字体",
    e.font,
    tt.map((o) => ({ value: o.id, label: o.label })),
    (o) => t({ font: o })
  )}
    ${Me("中文现场取模（仅包含用到的字形）", e.fontSubset, (o) => t({ fontSubset: o }))}
    ${e.fontSubset ? $`
      ${W("额外包含字符", e.fontExtra, (o) => t({ fontExtra: o }))}
      ${(() => {
    const o = Re(Te(e, e.fontExtra));
    return $`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`;
  })()}` : L}
    ${G("选择器", e.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (o) => t({ selector: o }))}
    ${D("左边距", e.selectorLeftMargin, (o) => t({ selectorLeftMargin: Math.max(0, Math.trunc(o)) }))}
    ${D("顶边距", e.selectorTopMargin, (o) => t({ selectorTopMargin: Math.max(0, Math.trunc(o)) }))}
    ${D("行间距", e.selectorLineSpacing, (o) => t({ selectorLineSpacing: Math.max(0, Math.trunc(o)) }))}
    ${D("跑马灯速度", e.marqueeSpeed, (o) => t({ marqueeSpeed: Math.max(0, o) }), 0.05)}
    ${D("跑马灯停留", e.marqueeHeaderLen, (o) => t({ marqueeHeaderLen: Math.max(0, o) }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `, i);
}
function Kt(i, n) {
  const e = (s) => {
    let r;
    const a = () => {
      r && (clearInterval(r), r = void 0);
    };
    return {
      down: (o) => {
        o.preventDefault(), n.key(s), a(), r = window.setInterval(() => n.key(s), 180);
      },
      up: a
    };
  }, t = (s, r, a) => {
    const o = e(s);
    return $`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${r}</button>`;
  };
  ie($`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(s) => {
    const a = {
      ArrowUp: R.Up,
      ArrowDown: R.Down,
      Enter: R.Enter,
      Escape: R.Return,
      Backspace: R.Return,
      "+": R.Add,
      "-": R.Sub,
      "=": R.Add,
      _: R.Sub
    }[s.key];
    a !== void 0 && (s.preventDefault(), n.key(a));
  }}>
      ${n.canvas}
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
  `, i);
}
function Ut(i, n) {
  i.querySelectorAll(":scope > .ume-modal-mask").forEach((t) => t.remove());
  const e = document.createElement("div");
  e.className = "ume-modal-mask", e.addEventListener("click", (t) => {
    t.target === e && Ve(e);
  }), ie($`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${() => Ve(e)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${n.warnings.length ? $`
          <div style="margin-bottom:8px">
            ${n.warnings.map((t) => $`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>` : L}
        <div class="ume-code-view">${n.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${() => {
    navigator.clipboard.writeText(n.c).then(() => Ft(e, "已复制到剪贴板"));
  }}>复制</button>
        <button class="ume-btn primary" @click=${() => {
    Ce("menu_pages.c", n.c);
  }}>下载 menu_pages.c</button>
      </div>
    </div>
  `, e), i.appendChild(e);
}
function Ve(i) {
  i.remove();
}
function Ft(i, n) {
  const e = i.closest(".ume") ?? document.body;
  let t = e.querySelector(".ume-toast");
  t || (t = document.createElement("div"), t.className = "ume-toast", e.appendChild(t)), t.textContent = n, t.classList.add("show"), setTimeout(() => t.classList.remove("show"), 1600);
}
function jt(i, n, e, t) {
  const r = n.getState().project.pages.find((k) => k.id === e), a = r == null ? void 0 : r.items.find((k) => k.id === t);
  if (!a || a.kind !== "xbm") return;
  const o = a;
  let u = o.w, l = o.h, d = [...o.bits];
  const m = () => Math.ceil(u / 8), p = document.createElement("div");
  p.className = "ume-modal-mask", p.addEventListener("click", (k) => {
    k.target === p && A();
  });
  const f = (k, V) => {
    const j = V * m() + (k >> 3);
    return j < d.length ? !!(d[j] >> (k & 7) & 1) : !1;
  }, b = (k, V, j) => {
    const ee = V * m() + (k >> 3);
    d[ee] = j ? d[ee] | 1 << (k & 7) : d[ee] & ~(1 << (k & 7));
  }, y = (k, V) => {
    const j = Math.ceil(u / 8), ee = Math.ceil(k / 8), le = new Array(ee * V).fill(0);
    for (let x = 0; x < Math.min(l, V); x++)
      for (let J = 0; J < Math.min(u, k); J++) {
        const ve = x * j + (J >> 3);
        ve < d.length && d[ve] >> (J & 7) & 1 && (le[x * ee + (J >> 3)] |= 1 << (J & 7));
      }
    u = k, l = V, d = le;
  };
  let g = !1, h = !0;
  const C = (k, V) => (j) => {
    j.preventDefault(), g = !0, h = !f(k, V), b(k, V, h), O();
  }, N = (k, V) => () => {
    g && (b(k, V, h), O());
  }, z = () => {
    g = !1;
  }, O = () => {
    ie(U(), p);
  }, Q = () => {
    const k = [];
    for (let V = 0; V < l; V++)
      for (let j = 0; j < u; j++)
        k.push($`<button class="ume-xbm-cell ${f(j, V) ? "on" : ""}"
          data-x=${j} data-y=${V}
          @pointerdown=${C(j, V)}
          @pointerenter=${N(j, V)}></button>`);
    return k;
  }, U = () => $`
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
    y(Le(+k.target.value, 1, 128), l), O();
  }} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${(k) => {
    y(u, Le(+k.target.value, 1, 64)), O();
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
    n.getState().updateItem(e, t, { w: u, h: l, bits: [...d] }), A();
  }}>应用</button>
      </div>
    </div>
  `;
  function A() {
    p.remove(), document.removeEventListener("pointerup", z);
  }
  document.addEventListener("pointerup", z), O(), i.appendChild(p);
}
function Le(i, n, e) {
  return Number.isFinite(i) ? Math.min(e, Math.max(n, Math.trunc(i))) : n;
}
const Rt = "prebuilt/u8g2-menu-preview.js";
class qt {
  constructor(n, e = {}) {
    var p;
    if (this.store = Qe(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.activateRightTab = () => {
    }, this.container = n, this.opts = { persistKey: "default", ...e }, n.classList.add("ume"), !document.getElementById("ume-style")) {
      const f = document.createElement("style");
      f.id = "ume-style", f.textContent = He, document.head.appendChild(f);
    }
    const t = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, s = this.opts.data ?? t ?? void 0;
    if (s !== void 0)
      try {
        this.store.setState({ project: ye(s) });
      } catch (f) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", f);
      }
    const r = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null;
    r && (this.lastExport = { c: r }), n.innerHTML = `
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
    const a = (f) => n.querySelector(f);
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
    o.style.display = "flex", o.style.flexDirection = "column", o.style.alignItems = "center", o.style.gap = "10px", this.els.center.appendChild(o), this.preview = new kt(o, {
      onPageChanged: (f) => this.onPreviewPageChanged(f)
    });
    const u = document.createElement("div");
    this.els.center.appendChild(u), Kt(u, this.preview), this.preview.load(this.opts.wasmUrl ?? Rt).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((f) => {
      console.error(f);
      const b = document.createElement("div");
      b.className = "ume-warn", b.textContent = `预览引擎加载失败: ${f.message}。编辑功能不受影响。`, this.els.center.prepend(b);
    }), n.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const f = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      f !== null && this.store.getState().addPage(f || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), n.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      Ce(
        `${this.store.getState().project.name || "menu-project"}.json`,
        Ne(this.store.getState().project),
        "application/json"
      );
    }), n.querySelector('[data-act="import"]').addEventListener("click", () => {
      a('[data-role="file"]').click();
    }), a('[data-role="file"]').addEventListener("change", (f) => {
      var y;
      const b = (y = f.target.files) == null ? void 0 : y[0];
      b && (b.text().then((g) => {
        try {
          const h = ye(g);
          this.store.getState().update((C) => {
            Object.assign(C, h);
          }), this.scheduleRender();
        } catch (h) {
          alert(`导入失败: ${h.message}`);
        }
      }), f.target.value = "");
    }), n.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate());
    const l = n.querySelectorAll(".ume-tabs button"), d = (f) => {
      l.forEach((b) => b.classList.toggle("active", b.dataset.tab === f)), this.els.propEl.style.display = f === "prop" ? "" : "none", this.els.resEl.style.display = f === "res" ? "" : "none", this.els.setEl.style.display = f === "set" ? "" : "none";
    };
    l.forEach((f) => {
      f.addEventListener("click", () => d(f.dataset.tab ?? "prop"));
    }), this.activateRightTab = d, this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((p = this.store.getState().project.pages[0]) == null ? void 0 : p.id) ?? null, null);
    let m = null;
    this.store.subscribe(() => {
      this.preview.sync(this.store.getState().project), this.persist(), this.scheduleRender(), this.notifyChange();
      const f = this.store.getState().selection.itemId;
      f && f !== m && this.activateRightTab("prop"), m = f;
    }), this.scheduleRender(), this.persist(), this.liveTimer = window.setInterval(() => {
      this.destroyed || this.updateLiveInfo();
    }, 300);
  }
  /* ---------------- 公共 API ---------------- */
  getData() {
    return structuredClone(this.store.getState().project);
  }
  loadData(n) {
    var t;
    const e = ye(n);
    this.store.getState().update((s) => {
      Object.assign(s, e);
    }), this.store.getState().select(((t = e.pages[0]) == null ? void 0 : t.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var e, t;
    const n = this.produceCode();
    return Ut(this.container, n), (t = (e = this.opts).onExport) == null || t.call(e, n), n;
  }
  downloadC() {
    const n = this.produceCode();
    Ce("menu_pages.c", n.c);
  }
  /** 生成路径（generate/downloadC 共用）：现场取模 + 警告收口 + 保留 USER CODE */
  produceCode() {
    const n = this.lastExport, e = this.store.getState().project;
    let t;
    const s = [];
    if (e.fontSubset) {
      if (!this.preview.ready)
        s.push("现场取模需要预览引擎，当前引擎不可用：本次未生成 menu_font，代码将引用内置字体");
      else {
        const o = Te(e, e.fontExtra), u = this.buildFontSubset(e, o);
        if ("error" in u)
          s.push(`${u.error}，本次按内置字体生成`);
        else {
          t = u.result.font;
          const l = Re(o);
          if (s.push(`现场取模：收录 ${l.total} 个字符（ASCII ${l.ascii} + 扩展 ${l.cjk}），字体数组 ${u.result.font.length} 字节。运行时若输出超出字符集的中文，请在设置里补充额外字符`), u.result.included > 255 && s.push(`子集字形数 ${u.result.included} 超过 255：字体头 glyph_cnt 字段将回绕（记录为 ${u.result.included & 255}），如遇渲染异常请在"额外包含字符"里精简`), u.result.missing.length) {
            const d = u.result.missing.slice(0, 5).map((m) => String.fromCodePoint(m)).join(" ");
            s.push(`字符集中 ${u.result.missing.length} 个字符未在源字体中找到（如 ${d}），运行时这些字符无法显示`);
          }
        }
      }
      const a = this.preview.fontApplyWarning;
      a && s.push(a);
    }
    const r = gt(e, n ?? void 0, t);
    return r.warnings.unshift(...s), this.lastExport = { c: r.c }, this.opts.persistKey && localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, r.c), r;
  }
  /** 现场取模：从 WASM 真库逐字拉取字形，生成子集字体 */
  buildFontSubset(n, e) {
    const t = this.preview.fontIndex(n.font), s = this.preview.getFontBytes(t), r = this.preview.glyphFetcher(t);
    if (!s || !r) return { error: "现场取模失败：无法读取源字体数据" };
    const a = je(s, e, r);
    return a ? { result: a } : { error: "现场取模失败：字符集未命中任何字形" };
  }
  destroy() {
    this.destroyed = !0, document.removeEventListener("keydown", this.onKeyDown), this.liveTimer !== void 0 && window.clearInterval(this.liveTimer), clearTimeout(this.saveTimer), clearTimeout(this.changeTimer), this.preview.destroy(), this.container.innerHTML = "";
  }
  /* ---------------- 内部 ---------------- */
  onKeyDown(n) {
    const e = n.target;
    e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" || ((n.ctrlKey || n.metaKey) && n.key.toLowerCase() === "z" ? (n.preventDefault(), n.shiftKey ? this.store.getState().redo() : this.store.getState().undo()) : (n.ctrlKey || n.metaKey) && n.key.toLowerCase() === "y" && (n.preventDefault(), this.store.getState().redo()));
  }
  onPreviewPageChanged(n) {
    const e = this.store.getState().project.pages[n];
    e && this.store.getState().select(e.id, null);
  }
  persist() {
    !this.opts.persistKey || this.destroyed || (clearTimeout(this.saveTimer), this.saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(
          `ume_autosave_${this.opts.persistKey}`,
          Ne(this.store.getState().project)
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
      const n = this.store.getState();
      Mt(this.els.left, this.store), Dt(this.els.setEl, this.store), Bt(this.els.resEl, this.store), At(this.els.propEl, this.store, {
        openXbmEditor: (e, t) => jt(this.container, this.store, e, t)
      }), this.els.toolbarUndo.disabled = n.past.length === 0, this.els.toolbarRedo.disabled = n.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var r;
    const n = document.getElementById("ume-live-value"), e = document.getElementById("ume-page-jump"), t = this.store.getState(), s = this.store.getState().project.pages.findIndex((a) => a.id === t.selection.pageId);
    if (e) {
      const a = t.project.pages, o = a.map((l) => l.name).join("|");
      e.dataset.sig !== o && (e.dataset.sig = o, e.innerHTML = "", a.forEach((l, d) => {
        const m = document.createElement("option");
        m.value = String(d), m.textContent = `${d + 1}. ${l.name}`, e.appendChild(m);
      }), e.onchange = () => {
        const l = parseInt(e.value, 10);
        Number.isFinite(l) && this.preview.navTo(l);
      });
      const u = this.preview.currentPage;
      document.activeElement !== e && e.value !== String(u) && (e.value = String(u));
    }
    if (n && s >= 0 && t.selection.itemId) {
      const a = t.project.pages[s], o = a.items.findIndex((f) => f.id === t.selection.itemId), u = a.items[o], l = u == null ? void 0 : u.bind, d = (l == null ? void 0 : l.type) === "value" || (l == null ? void 0 : l.type) === "switch" ? l.varId : null, m = (u == null ? void 0 : u.kind) === "text" && (l == null ? void 0 : l.type) === "none" ? u.displayVarId : null, p = d ?? m;
      if (u && p) {
        const f = (t.project.variables ?? []).findIndex((C) => C.id === p), b = f >= 0 ? f : s * _t + o, g = (l == null ? void 0 : l.type) === "switch" ? this.preview.getSwitch(b) : this.preview.getInt(b), h = (r = (t.project.variables ?? []).find((C) => C.id === p)) == null ? void 0 : r.name;
        n.textContent = `${h ?? u.kind} = ${g}`;
      } else
        n.textContent = "";
    }
  }
}
export {
  qt as MenuEditor,
  R as MenuKey
};
//# sourceMappingURL=u8g2-menu-editor.js.map
