import { createStore as ke } from "zustand/vanilla";
import { render as J, html as f, nothing as P } from "lit-html";
const Se = `/* u8g2-menu-editor 样式（前缀 ume-） */
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
let ue = 0;
function D(n) {
  return ue = (ue + 1) % 1e9, `${n}_${Date.now().toString(36)}_${ue.toString(36)}`;
}
function ne(n) {
  return {
    id: D("vb"),
    name: "var_new",
    type: "int32",
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
    ...n
  };
}
function Ie(n, t) {
  const e = new Set(n.map((u) => u.name));
  if (!e.has(t)) return t;
  let r = 2;
  for (; e.has(`${t}_${r}`); ) r++;
  return `${t}_${r}`;
}
function z(n) {
  const t = { id: D("it"), label: "" };
  switch (n) {
    case "text":
      return { ...t, kind: n, text: "菜单项", scale: 1 };
    case "number":
      return {
        ...t,
        kind: n,
        text: "v:%d",
        scale: 1,
        varId: null,
        editable: !0
      };
    case "switch":
      return {
        ...t,
        kind: n,
        text: "s:%s",
        scale: 1,
        varId: null,
        openValue: 1,
        onText: "on",
        offText: "off"
      };
    case "button":
      return { ...t, kind: n, text: "执行操作", scale: 1, cbName: "btn_action_cb", buttonId: 1 };
    case "submenu":
      return { ...t, kind: n, text: "下一级", scale: 1, targetPageId: null };
    case "back":
      return { ...t, kind: n, text: "返回", scale: 1 };
    case "slider":
      return { ...t, kind: n, varId: null };
    case "progress":
      return { ...t, kind: n, varId: null };
    case "chart":
      return {
        ...t,
        kind: n,
        chartKind: "line",
        dataLen: 24,
        height: 32,
        sample: "sine"
      };
    case "xbm":
      return Ee(16, 16);
    case "textarea":
      return {
        ...t,
        kind: n,
        content: `这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,
        height: 40,
        bindScroll: !0,
        lineSpacing: 0
      };
    case "board":
      return { ...t, kind: n, w: 64, h: 32, cbName: "board_cb" };
  }
}
function Ee(n, t) {
  const e = Math.ceil(n / 8);
  return {
    id: D("it"),
    kind: "xbm",
    label: "",
    name: "icon",
    w: n,
    h: t,
    bits: new Array(e * t).fill(0)
  };
}
function be(n) {
  return { id: D("pg"), name: n, fnName: "", items: [], userCodePre: "" };
}
function X(n, t) {
  return { ...n, ...t };
}
function Me() {
  const n = [
    ne({ name: "var_value", type: "int32", initialValue: 50, min: 0, max: 100, step: 1 }),
    ne({ name: "var_switch", type: "uint8", initialValue: 0, min: 0, max: 1, step: 1 }),
    ne({ name: "var_slider", type: "int32", initialValue: 50, min: 0, max: 100, step: 2 })
  ], t = be("主页");
  t.items = [
    X(z("text"), { text: "u8g2_menu" }),
    X(z("submenu"), { text: "系统设置" }),
    X(z("button"), { text: "关于", cbName: "btn_about_cb" })
  ];
  const e = be("设置");
  e.items = [
    X(z("number"), { text: "音量:%d", varId: n[0].id }),
    X(z("switch"), { text: "开关:%s", varId: n[1].id }),
    X(z("slider"), { varId: n[2].id }),
    z("back")
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
    variables: n,
    pages: [t, e]
  };
  return t.items[1].targetPageId = e.id, r;
}
function Ne(n) {
  return structuredClone(n);
}
const Ce = 800;
function $e() {
  let n = null, t = 0;
  return ke()((e, r) => ({
    project: Me(),
    selection: { pageId: null, itemId: null },
    past: [],
    future: [],
    dirty: !1,
    update: (u, s) => {
      const i = Date.now(), a = !!s && s === n && i - t < Ce;
      n = s ?? null, t = i, e((o) => {
        const d = Ne(o.project);
        return u(d), {
          project: d,
          dirty: !0,
          past: a ? o.past : [...o.past.slice(-99), o.project],
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
        const [s, ...i] = u.future;
        return {
          project: s,
          past: [...u.past, u.project],
          future: i,
          dirty: !0
        };
      });
    },
    select: (u, s = null) => e({ selection: { pageId: u, itemId: s } }),
    addPage: (u) => {
      const s = { id: D("pg"), name: u ?? `页面${r().project.pages.length + 1}`, fnName: "", items: [], userCodePre: "" };
      return r().update((i) => {
        i.pages.push(s);
      }), e({ selection: { pageId: s.id, itemId: null } }), s;
    },
    removePage: (u) => {
      r().update((i) => {
        i.pages = i.pages.filter((a) => a.id !== u);
        for (const a of i.pages)
          for (const o of a.items)
            o.kind === "submenu" && o.targetPageId === u && (o.targetPageId = null);
      });
      const { selection: s } = r();
      s.pageId === u && e({ selection: { pageId: null, itemId: null } });
    },
    movePage: (u, s) => {
      r().update((i) => {
        const a = i.pages.findIndex((d) => d.id === u), o = a + s;
        a < 0 || o < 0 || o >= i.pages.length || ([i.pages[a], i.pages[o]] = [i.pages[o], i.pages[a]]);
      });
    },
    updatePage: (u, s) => {
      r().update((i) => {
        const a = i.pages.find((o) => o.id === u);
        a && Object.assign(a, s);
      });
    },
    addItem: (u, s) => {
      var o;
      const i = s ?? r().selection.pageId ?? ((o = r().project.pages[0]) == null ? void 0 : o.id);
      if (!i) return null;
      const a = Ae(u);
      return r().update((d) => {
        const l = d.pages.find((c) => c.id === i);
        l == null || l.items.push(a);
      }), e({ selection: { pageId: i, itemId: a.id } }), a;
    },
    removeItem: (u, s) => {
      r().update((a) => {
        const o = a.pages.find((d) => d.id === u);
        o && (o.items = o.items.filter((d) => d.id !== s));
      });
      const { selection: i } = r();
      i.itemId === s && e({ selection: { pageId: u, itemId: null } });
    },
    moveItem: (u, s, i) => {
      r().update((a) => {
        const o = a.pages.find((c) => c.id === u);
        if (!o) return;
        const d = o.items.findIndex((c) => c.id === s), l = d + i;
        d < 0 || l < 0 || l >= o.items.length || ([o.items[d], o.items[l]] = [o.items[l], o.items[d]]);
      });
    },
    duplicateItem: (u, s) => {
      let i = null;
      r().update((a) => {
        const o = a.pages.find((l) => l.id === u);
        if (!o) return;
        const d = o.items.findIndex((l) => l.id === s);
        d < 0 || (i = structuredClone(o.items[d]), i.id = D("it"), o.items.splice(d + 1, 0, i));
      }), i && e({ selection: { pageId: u, itemId: i.id } });
    },
    updateItem: (u, s, i, a) => {
      r().update((o) => {
        const d = o.pages.find((c) => c.id === u), l = d == null ? void 0 : d.items.find((c) => c.id === s);
        l && Object.assign(l, i);
      }, a);
    },
    addVariable: (u) => {
      let s = null;
      return r().update((i) => {
        i.variables = i.variables ?? [];
        const a = Ie(i.variables, (u == null ? void 0 : u.name) ?? "var_new");
        s = ne({ ...u, name: a }), i.variables.push(s);
      }), s;
    },
    removeVariable: (u) => {
      let s = 0;
      for (const i of r().project.pages)
        for (const a of i.items)
          "varId" in a && a.varId === u && s++;
      return s > 0 ? s : (r().update((i) => {
        i.variables = (i.variables ?? []).filter((a) => a.id !== u);
      }), 0);
    },
    updateVariable: (u, s, i) => {
      r().update((a) => {
        const o = (a.variables ?? []).find((d) => d.id === u);
        o && Object.assign(o, s);
      }, i);
    }
  }));
}
$e();
function Ae(n) {
  return z(n);
}
const oe = 1, Y = [
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
], ie = {
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
}, Pe = {
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
}, Te = [
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
class B extends Error {
}
const we = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int", "float", "double"]);
function re(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function T(n, t) {
  return typeof n == "string" ? n : t;
}
function I(n, t) {
  return typeof n == "number" && Number.isFinite(n) ? n : t;
}
const Le = ["text", "number", "switch", "button", "submenu", "back", "slider", "progress", "chart", "xbm", "textarea", "board"];
function Ve(n) {
  if (!re(n)) throw new B("条目格式错误");
  const t = n.kind;
  if (typeof t != "string" || !Le.includes(t))
    throw new B(`未知条目类型: ${String(t)}`);
  const e = structuredClone(n);
  switch (e.id = T(n.id, ""), e.id || (e.id = `it_${Math.random().toString(36).slice(2, 10)}`), e.label = T(n.label, ""), t) {
    case "text":
    case "number":
    case "switch":
    case "button":
    case "submenu":
    case "back":
      e.text = T(n.text, ""), e.scale = n.scale === 2 ? 2 : 1;
      break;
  }
  return e;
}
function De(n) {
  if (!re(n)) throw new B("页面格式错误");
  const t = Array.isArray(n.items) ? n.items.map(Ve) : [];
  return {
    id: T(n.id, "") || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: T(n.name, "未命名页面"),
    fnName: T(n.fnName, ""),
    items: t,
    userCodePre: T(n.userCodePre, "")
  };
}
function Ue(n) {
  if (!re(n)) return null;
  const t = T(n.type, "int32");
  return {
    id: T(n.id, "") || D("vb"),
    name: T(n.name, ""),
    type: we.has(t) ? t : "int32",
    initialValue: I(n.initialValue, 0),
    min: I(n.min, 0),
    max: I(n.max, 100),
    step: I(n.step, 1)
  };
}
function je(n) {
  const t = /* @__PURE__ */ new Map(), e = [], r = (u, s) => {
    let i = t.get(u);
    return i || (i = s(), t.set(u, i), e.push(i)), i;
  };
  for (const u of n)
    for (const s of u.items) {
      const i = s;
      switch (s.kind) {
        case "number":
          if (i.varId === void 0 || i.varId === null) {
            const a = typeof i.varName == "string" && i.varName ? i.varName : "var_unnamed", o = r(a, () => ({
              id: D("vb"),
              name: a,
              type: we.has(String(i.varType)) ? String(i.varType) : "int32",
              initialValue: I(i.initialValue, 0),
              min: I(i.min, 0),
              max: I(i.max, 100),
              step: I(i.step, 1)
            }));
            s.varId = o.id;
          }
          i.editable === void 0 && (s.editable = !0), delete i.varName, delete i.varType, delete i.step, delete i.min, delete i.max, delete i.initialValue, delete i.decimals;
          break;
        case "slider":
        case "progress":
          if (i.varId === void 0 || i.varId === null) {
            const a = typeof i.varName == "string" && i.varName ? i.varName : "var_unnamed", o = r(a, () => ({
              id: D("vb"),
              name: a,
              type: "int",
              initialValue: I(i.initialValue, 0),
              min: I(i.min, 0),
              max: I(i.max, 100),
              step: I(i.step, 1)
            }));
            s.varId = o.id;
          }
          delete i.varName, delete i.step, delete i.min, delete i.max, delete i.initialValue;
          break;
        case "switch":
          if (i.varId === void 0 || i.varId === null) {
            const a = typeof i.varName == "string" && i.varName ? i.varName : "var_unnamed", o = r(a, () => ({
              id: D("vb"),
              name: a,
              type: "uint8",
              initialValue: I(i.initialValue, 0),
              min: 0,
              max: 1,
              step: 1
            }));
            s.varId = o.id;
          }
          delete i.varName, delete i.initialValue;
          break;
      }
    }
  return e;
}
function le(n) {
  let t;
  if (typeof n == "string")
    try {
      t = JSON.parse(n);
    } catch {
      throw new B("JSON 解析失败");
    }
  else
    t = n;
  if (!re(t)) throw new B("不是有效的工程文件");
  const e = t, r = I(e.version, 0);
  if (r > oe)
    throw new B(`工程版本 v${r} 高于当前支持的 v${oe}，请升级编辑器`);
  const u = Array.isArray(e.pages) ? e.pages.map(De) : [];
  if (!u.length) throw new B("工程至少需要一个页面");
  const s = ["default", "rotundity", "square"].includes(e.selector) ? e.selector : "rotundity", i = new Set(Y.map((d) => d.fn)), a = Array.isArray(e.weakHooks) ? [...new Set(e.weakHooks.filter((d) => typeof d == "string" && i.has(d)))] : [];
  let o;
  return Array.isArray(e.variables) ? o = e.variables.map(Ue).filter((d) => !!d) : o = je(u), {
    version: oe,
    name: T(e.name, "未命名工程"),
    width: I(e.width, 128),
    height: I(e.height, 64),
    font: T(e.font, "u8g2_font_wqy12_t_gb2312"),
    selector: s,
    selectorLeftMargin: I(e.selectorLeftMargin, 16),
    selectorTopMargin: I(e.selectorTopMargin, 0),
    selectorLineSpacing: I(e.selectorLineSpacing, 0),
    marqueeSpeed: I(e.marqueeSpeed, 0.2),
    marqueeHeaderLen: I(e.marqueeHeaderLen, 5),
    weakHooks: a,
    variables: o,
    pages: u
  };
}
function he(n) {
  return JSON.stringify(n, null, 2);
}
const Ke = {
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
function R(n, t = "anon") {
  let e = n.trim().replace(/[^A-Za-z0-9_]/g, "_");
  return (!e || /^[0-9]/.test(e)) && (e = `_${e}`), e || t;
}
function Q(n) {
  return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r\n?/g, "\\n").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}
function Z(n) {
  if (!Number.isFinite(n)) return "0.0f";
  const t = n.toString();
  return /[-.]|e/i.test(t) ? `${t}f` : `${t}.0f`;
}
function Re(n) {
  const t = /* @__PURE__ */ new Map();
  if (!n) return t;
  const e = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let r;
  for (; (r = e.exec(n)) !== null; ) t.set(r[1], r[2]);
  return t;
}
function V(n, t, e) {
  const r = t.has(n) ? t.get(n) : "";
  return `${e}/* USER CODE BEGIN ${n} */${r}${e}/* USER CODE END ${n} */`;
}
const ze = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]);
function ge(n, t) {
  const e = [], r = Re((t == null ? void 0 : t.c) ?? ""), u = n.pages.map((m, _) => m.fnName && /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName) ? m.fnName : `page_${_}`), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const m of n.variables ?? []) {
    if (!m.name) {
      e.push("存在未命名变量，已跳过");
      continue;
    }
    if (s.has(m.name)) {
      e.push(`变量名 "${m.name}" 重复，以第一个为准`);
      continue;
    }
    /^[A-Za-z_][A-Za-z0-9_]*$/.test(m.name) || e.push(`变量名 "${m.name}" 不是合法的 C 标识符，已清洗为 "${R(m.name)}"`);
    const _ = R(m.name, "var"), p = m.type === "float" || m.type === "double", w = {
      name: _,
      srcType: m.type,
      type: Ke[m.type],
      init: p ? Z(m.initialValue) : String(Math.trunc(m.initialValue)),
      isFloat: p,
      step: m.step,
      min: m.min,
      max: m.max
    };
    s.set(_, w), i.set(m.id, w);
  }
  const a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set(), d = [], l = [], c = [], b = [], x = [], y = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Map();
  let H = 0, W = 0;
  for (const m of n.pages)
    for (const _ of m.items)
      switch (_.kind) {
        case "button": {
          const p = R(_.cbName, "btn_cb");
          a.has(p) || a.set(p, _.buttonId);
          break;
        }
        case "board":
          o.add(R(_.cbName, "board_cb"));
          break;
        case "chart": {
          const p = H++;
          d.push(
            `#define CHART${p}_LEN ${Math.max(2, Math.trunc(_.dataLen))}`,
            `static float chart${p}_data[CHART${p}_LEN];`,
            `static float chart${p}_dis[CHART${p}_LEN];`,
            `static u8g2_chart_t chart${p};`,
            `static uint8_t chart${p}_inited = 0;`
          );
          const w = _.sample === "sine" ? `chart${p}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);` : _.sample === "ramp" ? `chart${p}_data[i] = (float)i;` : `chart${p}_data[i] = (float)((i * 37) % CHART${p}_LEN);`, A = `chart${p}_fill`, h = (r.get(A) ?? "").trim() !== "";
          l.push([
            `    if (!chart${p}_inited) {`,
            `        chart${p}_inited = 1;`,
            `        u8g2_chart_init(&chart${p}, chart${p}_data, chart${p}_dis, CHART${p}_LEN);`,
            V(A, r, "        "),
            ...h ? [] : [`        for (uint16_t i = 0; i < CHART${p}_LEN; ++i) { ${w} }`],
            "    }"
          ].join(`
`));
          break;
        }
        case "xbm": {
          let p = R(_.name, "icon");
          for (; y.has(p); ) p = `${p}_2`;
          y.add(p), U.set(_.id, p);
          const w = _.bits.length, A = _.bits.map((h) => `0x${(h & 255).toString(16).padStart(2, "0")}`).join(", ");
          c.push(`static const uint8_t menu_xbm_${p}[${w}] = { ${A} };`);
          break;
        }
        case "textarea": {
          const p = W++;
          b.push(
            `static char ta${p}_text[] = "${Q(_.content)}";`,
            `static u8g2_menu_textArea_t ta${p};`,
            `static uint8_t ta${p}_inited = 0;`
          ), x.push(
            `    if (!ta${p}_inited) {`,
            `        ta${p}_inited = 1;`,
            `        u8g2_textArea_init(&ta${p}, ta${p}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${p}, ${Math.max(0, Math.trunc(_.lineSpacing))});`,
            "    }"
          );
          break;
        }
      }
  const L = (m, _) => {
    if (!m) return "";
    const p = `"${Q(m)}"`;
    return _ === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${p});` : `u8g2_MenuUTF8Printf(${p});`;
  }, ee = (m, _, p) => {
    const w = `"${Q(m)}"`;
    return _ === 2 ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${p});` : `u8g2_MenuUTF8Printf(${w}, ${p});`;
  };
  let F = 0, j = 0;
  const se = (m, _) => {
    const p = [], w = `${_.name}`, A = (h) => {
      if (!h) return null;
      const $ = i.get(h);
      return $ || e.push(`页面 ${w} 的条目引用了已删除的变量，已按普通文本生成`), $ ?? null;
    };
    switch (m.kind) {
      case "text": {
        const h = L(m.text, m.scale);
        h && p.push(`    ${h}`);
        break;
      }
      case "number": {
        const h = m, $ = A(h.varId);
        if ($ && h.editable !== !1) {
          const E = $.isFloat ? `u8g2_MenuItemValue_${$.srcType}(&${$.name}, ${Z($.step)}, ${Z($.min)}, ${Z($.max)});` : `u8g2_MenuItemValue_${$.srcType}(&${$.name}, ${Math.trunc($.step)}, ${Math.trunc($.min)}, ${Math.trunc($.max)});`;
          p.push(`    ${E}`);
        }
        if ($)
          p.push(`    ${ee(h.text, h.scale, $.name)}`), h.editable !== !1 && !/%[-+ #0]*[a-zA-Z]/.test(h.text) && e.push(`数值条目 "${w}" 的显示文本不含格式化占位符（如 %d）`);
        else if (/%[-+ #0]*[a-zA-Z]/.test(h.text)) {
          e.push(`页面 ${w} 的数值条目未绑定变量但文本含占位符，已按普通文本生成`);
          const E = L(h.text.replace(/%[-+ #0]*[a-zA-Z]/g, ""), h.scale);
          E && p.push(`    ${E}`);
        } else {
          const E = L(h.text, h.scale);
          E && p.push(`    ${E}`);
        }
        break;
      }
      case "switch": {
        const h = m, $ = A(h.varId);
        if ($) {
          if ($.srcType !== "uint8") {
            e.push(`开关条目绑定的变量 "${$.name}" 应为 uint8 类型（当前 ${$.srcType}），已跳过绑定`);
            const E = L(h.text, h.scale);
            E && p.push(`    ${E}`);
            break;
          }
          p.push(`    u8g2_MenuItemValue_switch(&${$.name}, ${Math.trunc(h.openValue)});`), p.push(`    ${ee(h.text, h.scale, `${$.name} ? "${Q(h.onText)}" : "${Q(h.offText)}"`)}`), /%[-+ #0]*s/.test(h.text) || e.push(`开关条目 "${$.name}" 的显示文本建议包含 %s 用于显示 on/off`);
        } else {
          const E = L(h.text, h.scale);
          E && p.push(`    ${E}`);
        }
        break;
      }
      case "button": {
        const h = R(m.cbName, "btn_cb");
        p.push(`    u8g2_MenuItem_button(${h}, ${Math.trunc(m.buttonId)});`);
        const $ = L(m.text, m.scale);
        $ && p.push(`    ${$}`);
        break;
      }
      case "submenu": {
        if (!m.targetPageId) {
          e.push(`页面 ${w} 的子页面条目 "${m.text || m.label || m.id}" 未指定目标页面，已按普通文本生成`);
          const E = L(m.text, m.scale);
          E && p.push(`    ${E}`);
          break;
        }
        const h = n.pages.findIndex((E) => E.id === m.targetPageId);
        if (h < 0) {
          e.push(`页面 ${w} 的子页面条目目标无效`);
          break;
        }
        p.push(`    u8g2_MenuItem_menu_enter(${u[h]});`);
        const $ = L(m.text, m.scale);
        $ && p.push(`    ${$}`);
        break;
      }
      case "back": {
        p.push("    u8g2_MenuItem_menu_back();");
        const h = L(m.text, m.scale);
        h && p.push(`    ${h}`);
        break;
      }
      case "slider":
      case "progress": {
        const h = A(m.varId);
        if (!h) {
          e.push(`页面 ${w} 的${m.kind === "slider" ? "滑块" : "进度"}条目未绑定变量，已跳过`);
          break;
        }
        if (!ze.has(h.srcType)) {
          e.push(`滑块/进度条绑定的变量 "${h.name}" 须为整型（当前 ${h.srcType}），已跳过`);
          break;
        }
        const $ = m.kind === "slider" ? "Slider" : "ProgressBar";
        p.push(`    u8g2_MenuDrawItem${$}_bind(&${h.name}, ${Math.trunc(h.step)}, ${Math.trunc(h.min)}, ${Math.trunc(h.max)});`);
        break;
      }
      case "chart": {
        const h = F++;
        p.push(...l[h].split(`
`));
        const $ = m.chartKind === "point" ? "Point" : m.chartKind === "bar" ? "Bar" : "Line", E = m.min !== void 0 && m.max !== void 0 ? `${Z(m.max)}, ${Z(m.min)}` : "0, 0";
        p.push(`    u8g2_MenuDrawItem${$}Chart(&chart${h}, ${Math.max(4, Math.trunc(m.height))}, ${E});`);
        break;
      }
      case "xbm":
        p.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${U.get(m.id) ?? R(m.name, "icon")});`);
        break;
      case "textarea": {
        const h = j++;
        p.push(...x[h].split(`
`));
        const $ = m.bindScroll ? "u8g2_MenuDrawTextArea_bind" : "u8g2_MenuDrawTextArea";
        p.push(`    ${$}(&ta${h}, ${Math.max(10, Math.trunc(m.height))});`);
        break;
      }
      case "board": {
        const h = R(m.cbName, "board_cb");
        p.push(`    u8g2_MenuDrawItemBoard(${h}, ${Math.max(1, Math.trunc(m.w))}, ${Math.max(1, Math.trunc(m.h))});`);
        break;
      }
    }
    return p;
  }, g = [];
  g.push("/**"), g.push(` * 由 u8g2-menu-editor 自动生成，工程: ${n.name}`), g.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"), g.push(" */"), g.push('#include "menu_pages.h"'), g.push('#include "u8g2_menu.h"'), d.length && g.push("#include <math.h>"), g.push(""), g.push(V("includes", r, "")), g.push(""), g.push("/* ======================== 变量定义 ======================== */"), g.push(V("variables", r, ""));
  for (const m of s.values()) g.push(`${m.type} ${m.name} = ${m.init};`);
  if (g.push(""), (d.length || b.length || c.length) && (g.push("/* ======================== 页面资源 ======================== */"), g.push(...d, ...b, ...c), g.push("")), a.size || o.size) {
    g.push("/* ======================== 回调函数 ======================== */"), g.push(V("callbacks", r, ""));
    for (const [m] of a)
      g.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`), g.push("{"), g.push(V(`cb_${m}`, r, "    ")), g.push("}"), g.push("");
    for (const m of o)
      g.push(`void ${m}(u8g2_t *u8g2)`), g.push("{"), g.push(V(`cb_${m}`, r, "    ")), g.push("}"), g.push("");
  }
  const O = (n.weakHooks ?? []).map((m) => Y.find((_) => _.fn === m)).filter((m) => !!m);
  if (O.length || r.has("weak") || Y.some((m) => (r.get(`weak_${m.fn}`) ?? "").trim())) {
    g.push("/* ==================== 弱定义函数重写 ==================== */"), g.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"), g.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");
    const _ = Y.filter((p) => {
      var w;
      return !((w = n.weakHooks) != null && w.includes(p.fn)) && (r.get(`weak_${p.fn}`) ?? "").trim();
    }).map((p) => [
      `#if 0   /* 已取消勾选 ${p.fn}，手写内容保留于此；重新勾选后恢复编译 */`,
      `${p.decl}`,
      "{",
      V(`weak_${p.fn}`, r, "    "),
      "}",
      "#endif"
    ].join(`
`)).join(`
`);
    g.push(_ ? `${V("weak", r, "").replace(/\n$/, "")}
${_}
` : V("weak", r, "")), g.push("");
    for (const p of O) {
      g.push(`/* ${p.label}: ${p.desc} */`), g.push(`${p.decl}`), g.push("{"), g.push(V(`weak_${p.fn}`, r, "    "));
      const w = p.bodyArgs.split(`
`).map((A) => `    ${A}`);
      p.retNote && w.push(`    ${p.retNote}`), g.push(...w), g.push("}"), g.push("");
    }
  }
  g.push("/* ======================== 页面函数 ======================== */"), g.push(""), n.pages.forEach((m, _) => {
    g.push(`/* 页面: ${m.name} */`), g.push(`void ${u[_]}(void)`), g.push("{"), g.push(V(`page_${u[_]}_pre`, r, "    "));
    for (const p of m.items) g.push(...se(p, m));
    g.push("}"), g.push("");
  });
  const v = [];
  if (v.push("#ifndef MENU_PAGES_H"), v.push("#define MENU_PAGES_H"), v.push(""), v.push('#include "u8g2_menu.h"'), v.push(""), v.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"), u.forEach((m, _) => v.push(`void ${m}(void);   /* ${n.pages[_].name} */`)), v.push(""), s.size) {
    v.push("/* 可编辑变量（在条目绑定中使用） */");
    for (const m of s.values()) v.push(`extern ${m.type} ${m.name};`);
    v.push("");
  }
  if (a.size || o.size) {
    v.push("/* 用户回调 */");
    for (const [m] of a) v.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID);`);
    for (const m of o) v.push(`void ${m}(u8g2_t *u8g2);`);
    v.push("");
  }
  v.push("#endif /* MENU_PAGES_H */");
  const k = g.join(`
`).replace(/\n{3,}/g, `


`), M = v.join(`
`);
  return { c: `${k}
`, h: `${M}
`, warnings: e };
}
function ce(n, t) {
  return t ? n.get(t) ?? null : null;
}
var N = /* @__PURE__ */ ((n) => (n[n.None = 0] = "None", n[n.Up = 1] = "Up", n[n.Down = 2] = "Down", n[n.Enter = 3] = "Enter", n[n.Return = 4] = "Return", n[n.Add = 5] = "Add", n[n.Sub = 6] = "Sub", n))(N || {});
const He = 8192 / 8;
function Oe(n) {
  return new Promise((t, e) => {
    const r = document.createElement("script");
    r.src = n, r.onload = () => t(), r.onerror = () => e(new Error(`预览引擎脚本加载失败: ${n}`)), document.head.appendChild(r);
  });
}
class qe {
  constructor(t, e = {}) {
    this.mod = null, this.img = null, this.raf = 0, this.lastT = 0, this.running = !1, this.fontIndexCache = /* @__PURE__ */ new Map(), this.structSig = "", this.lastKnownPage = 0, this.canvas = document.createElement("canvas"), this.canvas.width = 128, this.canvas.height = 64, this.canvas.className = "ume-preview-canvas", t.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.events = e;
  }
  /** 加载 WASM 引擎（幂等） */
  async load(t) {
    if (this.mod) return;
    const e = window;
    e.U8G2MenuPreview || await Oe(t);
    const r = e.U8G2MenuPreview;
    if (!r) throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");
    this.mod = await r({
      locateFile: (s) => t.replace(/[^/\\]*$/, "") + s
    }), this.mod.ccall("em_init", null, ["number", "number"], [128, 64]);
    const u = this.mod._em_font_count_export();
    for (let s = 0; s < u; s++) {
      const i = this.mod._em_font_name(s);
      this.fontIndexCache.set(this.mod.UTF8ToString(i), s);
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
      k: e.items.map((r) => r.kind).join(","),
      res: e.items.map((r) => r.kind === "chart" ? `${r.dataLen}|${r.sample}` : r.kind === "xbm" ? `${r.w}x${r.h}` : r.kind === "textarea" ? Math.ceil(r.content.length / 64) : "").join(",")
    })));
  }
  /** 全量同步编辑器模型到预览引擎 */
  sync(t) {
    const e = this.mod;
    if (!e) return;
    const r = this.signature(t);
    r !== this.structSig && (e.ccall("em_reset_dynamic", null, [], []), this.structSig = r);
    const u = (a) => Math.trunc(Number.isFinite(a) ? a : 0), s = (a) => a ? (t.variables ?? []).findIndex((o) => o.id === a) : -1, i = new Map((t.variables ?? []).map((a) => [a.id, a]));
    t.pages.forEach((a, o) => {
      e.ccall("em_page_begin", null, ["number"], [o]), a.items.forEach((d, l) => {
        const c = ["number", "number"];
        switch (d.kind) {
          case "text":
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
              [o, l, 0, 0, d.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [o, l, d.text]);
            break;
          case "number": {
            const b = ce(i, d.varId);
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
                o,
                l,
                1,
                b ? { uint8: 0, uint16: 1, uint32: 2, int8: 3, int16: 4, int32: 5, int: 6, float: 7, double: 8 }[b.type] : 0,
                d.scale,
                0,
                0,
                0,
                0,
                0,
                b ? u(b.initialValue) : 0,
                b ? u(b.step) : 0,
                b ? u(b.min) : 0,
                b ? u(b.max) : 0,
                -1,
                0,
                0,
                0,
                0,
                d.editable === !1 ? 1 : 0,
                s(d.varId)
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [o, l, d.text]);
            break;
          }
          case "switch": {
            const b = ce(i, d.varId);
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
                o,
                l,
                2,
                0,
                d.scale,
                0,
                0,
                u(d.openValue),
                0,
                0,
                b ? u(b.initialValue) : 0,
                0,
                0,
                0,
                -1,
                0,
                0,
                0,
                0,
                0,
                s(d.varId)
              ]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [o, l, d.text]), e.ccall(
              "em_item_swtext",
              null,
              ["number", "number", "string", "string"],
              [o, l, d.onText, d.offText]
            );
            break;
          }
          case "button":
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
              [o, l, 3, 0, d.scale, 0, 0, 0, u(d.buttonId), 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [o, l, d.text]);
            break;
          case "submenu": {
            const b = t.pages.findIndex((x) => x.id === d.targetPageId);
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
              [o, l, 4, 0, d.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [o, l, d.text]);
            break;
          }
          case "back":
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
              [o, l, 5, 0, d.scale, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [o, l, d.text]);
            break;
          case "slider":
          case "progress": {
            const b = ce(i, d.varId), x = d.kind === "slider" ? 5 : 6;
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
                o,
                l,
                x,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                b ? u(b.initialValue) : 0,
                b ? u(b.step) : 0,
                b ? u(b.min) : 0,
                b ? u(b.max) : 0,
                -1,
                0,
                0,
                0,
                0,
                0,
                s(d.varId)
              ]
            );
            break;
          }
          case "chart": {
            const b = { sine: 0, ramp: 1, noise: 2 }[d.sample], x = d.min !== void 0 && d.max !== void 0 ? 1 : 0;
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
                o,
                l,
                8,
                0,
                1,
                { line: 0, point: 1, bar: 2 }[d.chartKind],
                0,
                0,
                0,
                x,
                b,
                0,
                x ? u(d.min) : 0,
                x ? u(d.max) : 0,
                -1,
                0,
                0,
                u(d.height),
                u(d.dataLen),
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
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
              [o, l, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, u(d.w), u(d.h), 0, 0, 0, -1]
            );
            const b = e._em_scratch(d.bits.length);
            b && (e.HEAPU8.set(new Uint8Array(d.bits), b), e._em_item_bits(o, l, b, d.bits.length));
            break;
          }
          case "textarea":
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
              [o, l, 10, 0, 1, 0, d.bindScroll ? 1 : 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, u(d.height), 0, u(d.lineSpacing), -1]
            ), e.ccall("em_item_text", null, ["number", "number", "string"], [o, l, d.content]);
            break;
          case "board":
            e.ccall(
              "em_page_item",
              null,
              [
                ...c,
                "number",
                "number",
                "number",
                "number",
                "number",
                "number",
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
              [o, l, 11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, u(d.w), u(d.h), 0, 0, 0, -1]
            );
            break;
        }
      }), e.ccall("em_page_end", null, ["number", "number"], [o, a.items.length]);
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
    var a, o;
    const e = this.mod;
    if (!e) return;
    const r = e._em_frame(t);
    if (!r) return;
    this.img || (this.img = this.ctx.createImageData(128, 64));
    const u = e.HEAPU8.subarray(r, r + He), s = this.img.data;
    s.fill(255);
    for (let d = 0; d < 64; d++) {
      const l = (d >> 3) * 128, c = 1 << (d & 7);
      let b = d * 128 * 4;
      for (let x = 0; x < 128; x++)
        u[l + x] & c && (s[b] = 17, s[b + 1] = 24, s[b + 2] = 39), b += 4;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const i = e._em_get_current_page();
    i !== this.lastKnownPage && (this.lastKnownPage = i, (o = (a = this.events).onPageChanged) == null || o.call(a, i));
  }
  key(t) {
    var e;
    (e = this.mod) == null || e.ccall("em_key", null, ["number"], [t]);
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
const Be = Object.keys(ie);
function Fe(n, t, e, r) {
  const u = n.getState(), s = e.label || "text" in e && e.text || ie[e.kind], i = (a) => (o) => {
    o.stopPropagation(), n.getState().moveItem(t.id, e.id, a);
  };
  return f`<div class="ume-item-row ${r ? "selected" : ""}"
    @click=${() => n.getState().select(t.id, e.id)}>
    <span class="ume-item-icon">${Pe[e.kind]}</span>
    <span class="ume-item-name" title=${s}>${s}</span>
    <button class="ume-mini" title="上移" @click=${i(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${i(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${(a) => {
    a.stopPropagation(), u.duplicateItem(t.id, e.id);
  }}>⧉</button>
    <button class="ume-mini" title="删除" @click=${(a) => {
    a.stopPropagation(), u.removeItem(t.id, e.id);
  }}>✕</button>
  </div>`;
}
function Xe(n, t) {
  const e = n.getState();
  return f`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${(r) => {
    const u = r.target.value;
    u && e.addItem(u, t.id), r.target.value = "";
  }}>
    <option value="">＋条目</option>
    ${Be.map((r) => f`<option value=${r}>${ie[r]}</option>`)}
  </select>`;
}
function Ze(n, t) {
  const { project: e, selection: r } = t.getState(), u = (s) => {
    const i = t.getState(), a = r.pageId === s.id;
    return f`<div class="ume-page">
      <div class="ume-page-head ${a ? "selected" : ""}"
        @click=${() => t.getState().select(s.id, null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${(o) => {
      o.stopPropagation(), i.movePage(s.id, -1);
    }}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${(o) => {
      o.stopPropagation(), i.movePage(s.id, 1);
    }}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${(o) => {
      if (o.stopPropagation(), e.pages.length <= 1) {
        alert("至少保留一个页面");
        return;
      }
      confirm(`删除页面 "${s.name}"？`) && i.removePage(s.id);
    }}>✕</button>
      </div>
      ${a ? f`<div class="ume-page-items">
        ${s.items.length ? s.items.map((o) => Fe(t, s, o, r.itemId === o.id)) : f`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Xe(t, s)}</div>
      </div>` : P}
    </div>`;
  };
  J(f`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${() => Ge(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(u)}
  `, n);
}
function Ge(n) {
  const t = prompt("页面名称:", `页面${n.getState().project.pages.length + 1}`);
  t !== null && n.getState().addPage(t || void 0);
}
function C(n, t, e, r = "") {
  return f`<div class="ume-field">
    <label>${n}</label>
    <input type="text" .value=${t ?? ""} placeholder=${r}
      @change=${(u) => e(u.target.value)} />
  </div>`;
}
function S(n, t, e, r = 1) {
  return f`<div class="ume-field">
    <label>${n}</label>
    <input type="number" .value=${String(t)} step=${String(r)}
      @change=${(u) => {
    const s = parseFloat(u.target.value);
    e(Number.isFinite(s) ? s : 0);
  }} />
  </div>`;
}
function K(n, t, e, r) {
  return f`<div class="ume-field">
    <label>${n}</label>
    <select @change=${(u) => r(u.target.value)}>
      ${e.map((u) => f`<option value=${u.value} ?selected=${u.value === t}>${u.label}</option>`)}
    </select>
  </div>`;
}
function fe(n, t, e) {
  return f`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${(r) => e(r.target.checked)} />
    <span>${n}</span>
  </div>`;
}
function ve(n, t, e, r = !1) {
  return f`<div class="ume-field wide">
    <label>${n}</label>
    <textarea style=${r ? "font-family:Consolas,monospace" : ""}
      @change=${(u) => e(u.target.value)}>${t ?? ""}</textarea>
  </div>`;
}
function ae(n, t, e = "text/plain") {
  const r = new Blob([t], { type: `${e};charset=utf-8` }), u = document.createElement("a");
  u.href = URL.createObjectURL(r), u.download = n, u.click(), setTimeout(() => URL.revokeObjectURL(u.href), 5e3);
}
const Ye = /* @__PURE__ */ new Set(["uint8", "uint16", "uint32", "int8", "int16", "int32", "int"]), ye = {
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
function de(n, t, e, r) {
  const u = [
    { value: "", label: "（未绑定）" },
    ...e.map((i) => ({ value: i.id, label: `${i.name} : ${ye[i.type] ?? i.type}` }))
  ], s = t ? e.some((i) => i.id === t) : !1;
  return f`
    ${K(n, t ?? "", u, (i) => r(i || null))}
    ${t && !s ? f`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>` : P}
    ${e.length === 0 ? f`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>` : P}
  `;
}
function me(n, t, e) {
  return f`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${() => {
    const r = n.getState().addVariable();
    n.getState().updateItem(t, e, { varId: r.id });
  }}>＋ 新建变量并绑定</button>
  </div>`;
}
function pe(n) {
  return n ? f`<div class="ume-hint">
    ${n.name} : ${ye[n.type] ?? n.type}，范围 ${n.min}~${n.max}，步长 ${n.step}，初值 ${n.initialValue}
    （在右侧「变量」区修改）
  </div>` : f`${P}`;
}
function Je(n, t, e) {
  const { project: r, selection: u } = t.getState(), s = r.pages.find((l) => l.id === u.pageId) ?? null, i = (s == null ? void 0 : s.items.find((l) => l.id === u.itemId)) ?? null, a = (l, c) => t.getState().updateItem(s.id, i.id, l, c);
  let o = f`<div class="ume-empty-hint">在左侧选择页面或条目</div>`, d = "属性";
  if (s && !i)
    d = "页面属性", o = f`
      ${C("名称", s.name, (l) => t.getState().updatePage(s.id, { name: l }))}
      ${C("C 函数名", s.fnName, (l) => t.getState().updatePage(s.id, { fnName: l }), "留空自动 page_N")}
      ${ve("用户代码", s.userCodePre, (l) => t.getState().updatePage(s.id, { userCodePre: l }), !0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;
  else if (s && i)
    switch (d = `${ie[i.kind]}`, i.kind) {
      case "text":
        o = f`
          ${C("文本/格式", i.text, (l) => a({ text: l }, `text-${i.id}`))}
          ${K("大小", String(i.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (l) => a({ scale: Number(l) }))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;
        break;
      case "number": {
        const l = i, c = r.variables ?? [], b = c.find((y) => y.id === l.varId), x = b && (b.type === "float" || b.type === "double") ? "float/double 推荐格式 %.1f / %.2f" : "整数推荐格式 %d（无符号用 %u）";
        o = f`
          ${de("绑定变量", l.varId, c, (y) => a({ varId: y }))}
          ${b ? P : me(t, s.id, l.id)}
          ${fe("可编辑（绑定附加值，取消则仅显示）", l.editable !== !1, (y) => a({ editable: y }))}
          ${pe(b)}
          ${C("显示文本", l.text, (y) => a({ text: y }, `text-${i.id}`))}
          ${K("大小", String(l.scale), [
          { value: "1", label: "正常" },
          { value: "2", label: "二倍大" }
        ], (y) => a({ scale: Number(y) }))}
          <div class="ume-hint">${x}；文本支持 \n 多行</div>
        `;
        break;
      }
      case "switch": {
        const l = i, c = (r.variables ?? []).filter((x) => x.type === "uint8"), b = c.find((x) => x.id === l.varId) ?? (r.variables ?? []).find((x) => x.id === l.varId);
        o = f`
          ${de("绑定变量", l.varId, c, (x) => a({ varId: x }))}
          ${b ? P : me(t, s.id, l.id)}
          ${pe(b)}
          ${C("显示文本", l.text, (x) => a({ text: x }, `text-${i.id}`))}
          ${S("openValue", l.openValue, (x) => a({ openValue: Math.max(0, Math.trunc(x)) }))}
          ${C('"开"文本', l.onText, (x) => a({ onText: x }))}
          ${C('"关"文本', l.offText, (x) => a({ offText: x }))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;
        break;
      }
      case "button": {
        const l = i;
        o = f`
          ${C("显示文本", l.text, (c) => a({ text: c }, `text-${i.id}`))}
          ${C("回调函数名", l.cbName, (c) => a({ cbName: c }))}
          ${S("ID", l.buttonId, (c) => a({ buttonId: Math.trunc(c) }))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;
        break;
      }
      case "submenu": {
        const l = i;
        o = f`
          ${C("显示文本", l.text, (c) => a({ text: c }, `text-${i.id}`))}
          ${K("目标页面", l.targetPageId ?? "", [
          { value: "", label: "（未设置）" },
          ...r.pages.filter((c) => c.id !== s.id).map((c) => ({ value: c.id, label: c.name }))
        ], (c) => a({ targetPageId: c || null }))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;
        break;
      }
      case "back": {
        o = f`
          ${C("显示文本", i.text, (l) => a({ text: l }, `text-${i.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;
        break;
      }
      case "slider":
      case "progress": {
        const l = (r.variables ?? []).filter((b) => Ye.has(b.type)), c = l.find((b) => b.id === i.varId) ?? (r.variables ?? []).find((b) => b.id === i.varId);
        o = f`
          ${de("绑定变量", i.varId, l, (b) => a({ varId: b }))}
          ${c ? P : me(t, s.id, i.id)}
          ${pe(c)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;
        break;
      }
      case "chart": {
        const l = i;
        o = f`
          ${K("类型", l.chartKind, [
          { value: "line", label: "折线图" },
          { value: "point", label: "散点图" },
          { value: "bar", label: "柱状图" }
        ], (c) => a({ chartKind: c }))}
          ${S("数据点数", l.dataLen, (c) => a({ dataLen: Math.max(2, Math.trunc(c)) }))}
          ${S("高度(px)", l.height, (c) => a({ height: Math.max(8, Math.trunc(c)) }))}
          ${K("示例数据", l.sample, [
          { value: "sine", label: "正弦" },
          { value: "ramp", label: "斜坡" },
          { value: "noise", label: "伪随机" }
        ], (c) => a({ sample: c }))}
          ${S("量程上限", l.max ?? 0, (c) => a({ max: c || void 0 }), "any")}
          ${S("量程下限", l.min ?? 0, (c) => a({ min: c || void 0 }), "any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;
        break;
      }
      case "xbm": {
        const l = i;
        o = f`
          ${C("数组名", l.name, (c) => a({ name: c }))}
          ${S("宽(px)", l.w, (c) => a({ w: Math.min(128, Math.max(1, Math.trunc(c))) }))}
          ${S("高(px)", l.h, (c) => a({ h: Math.min(64, Math.max(1, Math.trunc(c))) }))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${() => e.openXbmEditor(s.id, l.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${l.bits.length} 字节，XBM 行序 LSB</div>
        `;
        break;
      }
      case "textarea": {
        const l = i;
        o = f`
          ${ve("文本内容", l.content, (c) => a({ content: c }))}
          ${S("高度(px)", l.height, (c) => a({ height: Math.max(10, Math.trunc(c)) }))}
          ${S("行间距", l.lineSpacing, (c) => a({ lineSpacing: Math.max(0, Math.trunc(c)) }))}
          ${fe("上下键滚动 (bind)", l.bindScroll, (c) => a({ bindScroll: c }))}
        `;
        break;
      }
      case "board": {
        const l = i;
        o = f`
          ${S("宽(px)", l.w, (c) => a({ w: Math.max(1, Math.trunc(c)) }))}
          ${S("高(px)", l.h, (c) => a({ h: Math.max(1, Math.trunc(c)) }))}
          ${C("回调函数名", l.cbName, (c) => a({ cbName: c }))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;
        break;
      }
    }
  J(f`
    <div class="ume-panel-title">属性 ${d !== "属性" ? f`<span class="ume-kind-badge">${d}</span>` : P}</div>
    ${o}
  `, n);
}
let te = null;
const We = [
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
function Qe(n, t) {
  const e = t.variables ?? [], r = (s) => {
    te = te === s ? null : s;
  }, u = (s) => {
    const i = te === s.id, a = (c, b) => n.getState().updateVariable(s.id, c, b), o = s.name && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name), d = e.filter((c) => c.name === s.name).length > 1, l = et(t, s.id);
    return f`<div class="ume-var-item ${i ? "editing" : ""}">
      <div class="ume-var-row" @click=${() => r(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name || "(未命名)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${l ? ` · ${l} 处引用` : ""}</span>
        <button class="ume-mini" title="删除变量" @click=${(c) => {
      c.stopPropagation();
      const b = n.getState().removeVariable(s.id);
      b > 0 && alert(`该变量被 ${b} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`);
    }}>✕</button>
      </div>
      ${i ? f`<div class="ume-var-edit">
        ${C("变量名", s.name, (c) => a({ name: c.trim() }, `vn-${s.id}`))}
        ${o ? f`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>` : P}
        ${d ? f`<div class="ume-warn">变量名重复，生成时以第一个为准</div>` : P}
        ${K("类型", s.type, We, (c) => a({ type: c }))}
        ${S("初始值", s.initialValue, (c) => a({ initialValue: c }, `vi-${s.id}`), "any")}
        ${S("最小值", s.min, (c) => a({ min: c }, `vmin-${s.id}`), "any")}
        ${S("最大值", s.max, (c) => a({ max: c }, `vmax-${s.id}`), "any")}
        ${S("步长", s.step, (c) => a({ step: c }, `vs-${s.id}`), "any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>` : P}
    </div>`;
  };
  return f`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${() => {
    te = n.getState().addVariable().id;
  }}>＋ 新建</button>
    </div>
    ${e.length ? e.map(u) : f`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `;
}
function et(n, t) {
  let e = 0;
  for (const r of n.pages)
    for (const u of r.items)
      "varId" in u && u.varId === t && e++;
  return e;
}
function tt(n, t) {
  const { project: e } = t.getState(), r = (a, o) => t.getState().update((d) => {
    Object.assign(d, a);
  }, o), u = e.weakHooks ?? [], s = (a, o) => {
    t.getState().update((d) => {
      const l = d.weakHooks ?? [];
      d.weakHooks = o ? [.../* @__PURE__ */ new Set([...l, a])] : l.filter((c) => c !== a);
    });
  }, i = f`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${u.length}/${Y.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${Y.map((a) => f`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${a.fn}${a.retNote ? "（返回 1 = 事件已处理 / 0 = 交给库）" : ""}`}>
              <input type="checkbox" ?checked=${u.includes(a.fn)}
                @change=${(o) => s(a.fn, o.target.checked)} />
              <span>${a.label}</span>
            </div>
            <div class="ume-weak-desc">${a.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;
  J(f`
    <div class="ume-panel-title">工程</div>
    ${C("工程名", e.name, (a) => r({ name: a }))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width !== 128 || e.height !== 64 ? "（预览固定 128×64，生成代码使用此值）" : ""}
      </span>
    </div>

    ${Qe(t, e)}

    <div class="ume-panel-title">样式</div>
    ${K(
    "字体",
    e.font,
    Te.map((a) => ({ value: a.id, label: a.label })),
    (a) => r({ font: a })
  )}
    ${K("选择器", e.selector, [
    { value: "default", label: "默认 (反色行)" },
    { value: "rotundity", label: "圆形" },
    { value: "square", label: "方形" }
  ], (a) => r({ selector: a }))}
    ${S("左边距", e.selectorLeftMargin, (a) => r({ selectorLeftMargin: Math.max(0, Math.trunc(a)) }))}
    ${S("顶边距", e.selectorTopMargin, (a) => r({ selectorTopMargin: Math.max(0, Math.trunc(a)) }))}
    ${S("行间距", e.selectorLineSpacing, (a) => r({ selectorLineSpacing: Math.max(0, Math.trunc(a)) }))}
    ${S("跑马灯速度", e.marqueeSpeed, (a) => r({ marqueeSpeed: a }), 0.05)}
    ${S("跑马灯停留", e.marqueeHeaderLen, (a) => r({ marqueeHeaderLen: a }), 0.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${i}
    ${P}
  `, n);
}
function nt(n, t) {
  const e = (u) => {
    let s;
    const i = () => {
      s && (clearInterval(s), s = void 0);
    };
    return {
      down: (a) => {
        a.preventDefault(), t.key(u), i(), s = window.setInterval(() => t.key(u), 180);
      },
      up: i
    };
  }, r = (u, s, i) => {
    const a = e(u);
    return f`<button class="ume-key" title=${i}
      @pointerdown=${a.down} @pointerup=${a.up} @pointerleave=${a.up}>${s}</button>`;
  };
  J(f`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${(u) => {
    const i = {
      ArrowUp: N.Up,
      ArrowDown: N.Down,
      Enter: N.Enter,
      Escape: N.Return,
      Backspace: N.Return,
      "+": N.Add,
      "-": N.Sub,
      "=": N.Add,
      _: N.Sub
    }[u.key];
    i !== void 0 && (u.preventDefault(), t.key(i));
  }}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${r(N.Up, "▲", "上 MENU_Key_Up")}
      ${r(N.Down, "▼", "下 MENU_Key_Down")}
      ${r(N.Enter, "OK", "确认 MENU_Key_Enter")}
      ${r(N.Return, "⌫", "返回 MENU_Key_Return")}
      ${r(N.Add, "＋", "加 MENU_Key_Add")}
      ${r(N.Sub, "－", "减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <span id="ume-live-page"></span>
      <span id="ume-live-value"></span>
    </div>
  `, n);
}
let G = null, q = "c";
function at(n, t) {
  G = t, n.querySelectorAll(":scope > .ume-modal-mask").forEach((e) => e.remove()), it(n);
}
function it(n) {
  if (!G) return;
  const t = q === "c" ? G.c : G.h, e = document.createElement("div");
  e.className = "ume-modal-mask", e.addEventListener("click", (u) => {
    u.target === e && xe(e);
  });
  const r = () => {
    J(f`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${() => xe(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${G.warnings.length ? f`
            <div style="margin-bottom:8px">
              ${G.warnings.map((u) => f`<div class="ume-warn">⚠ ${u}</div>`)}
            </div>` : P}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${q === "c" ? "primary" : ""}" @click=${() => {
      q = "c", r();
    }}>menu_pages.c</button>
            <button class="ume-btn sm ${q === "h" ? "primary" : ""}" @click=${() => {
      q = "h", r();
    }}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${t}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${() => {
      navigator.clipboard.writeText(t).then(() => rt(e, "已复制到剪贴板"));
    }}>复制</button>
          <button class="ume-btn primary" @click=${() => {
      ae(q === "c" ? "menu_pages.c" : "menu_pages.h", t);
    }}>下载 ${q === "c" ? "menu_pages.c" : "menu_pages.h"}</button>
        </div>
      </div>
    `, e);
  };
  r(), n.appendChild(e);
}
function xe(n) {
  n.remove();
}
function rt(n, t) {
  const e = n.closest(".ume") ?? document.body;
  let r = e.querySelector(".ume-toast");
  r || (r = document.createElement("div"), r.className = "ume-toast", e.appendChild(r)), r.textContent = t, r.classList.add("show"), setTimeout(() => r.classList.remove("show"), 1600);
}
function st(n, t, e, r) {
  const s = t.getState().project.pages.find((v) => v.id === e), i = s == null ? void 0 : s.items.find((v) => v.id === r);
  if (!i || i.kind !== "xbm") return;
  const a = i;
  let o = a.w, d = a.h, l = [...a.bits];
  const c = () => Math.ceil(o / 8), b = document.createElement("div");
  b.className = "ume-modal-mask", b.addEventListener("click", (v) => {
    v.target === b && O();
  });
  const x = (v, k) => {
    const M = k * c() + (v >> 3);
    return M < l.length ? !!(l[M] >> (v & 7) & 1) : !1;
  }, y = (v, k, M) => {
    const m = k * c() + (v >> 3);
    l[m] = M ? l[m] | 1 << (v & 7) : l[m] & ~(1 << (v & 7));
  }, U = (v, k) => {
    const M = Math.ceil(o / 8), m = Math.ceil(v / 8), _ = new Array(m * k).fill(0);
    for (let p = 0; p < Math.min(d, k); p++)
      for (let w = 0; w < Math.min(o, v); w++) {
        const A = p * M + (w >> 3);
        A < l.length && l[A] >> (w & 7) & 1 && (_[p * m + (w >> 3)] |= 1 << (w & 7));
      }
    o = v, d = k, l = _;
  };
  let H = !1, W = !0;
  const L = (v, k) => (M) => {
    M.preventDefault(), H = !0, W = !x(v, k), y(v, k, W), j();
  }, ee = (v, k) => () => {
    H && (y(v, k, W), j());
  }, F = () => {
    H = !1;
  }, j = () => {
    J(g(), b);
  }, se = () => {
    const v = [];
    for (let k = 0; k < d; k++)
      for (let M = 0; M < o; M++)
        v.push(f`<button class="ume-xbm-cell ${x(M, k) ? "on" : ""}"
          data-x=${M} data-y=${k}
          @pointerdown=${L(M, k)}
          @pointerenter=${ee(M, k)}></button>`);
    return v;
  }, g = () => f`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${o}×${d}</span></span>
        <button class="ume-mini" @click=${O}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${F}
        @pointerleave=${F}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(o)} min="1" max="128"
            @change=${(v) => {
    U(_e(+v.target.value, 1, 128), d), j();
  }} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${(v) => {
    U(o, _e(+v.target.value, 1, 64)), j();
  }} />
          <button class="ume-btn sm" @click=${() => {
    l = l.map(() => 0), j();
  }}>清空</button>
          <button class="ume-btn sm" @click=${() => {
    l = l.map((v) => ~v & 255), j();
  }}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${o}, 14px)">${se()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${a.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${O}>取消</button>
        <button class="ume-btn primary" @click=${() => {
    t.getState().updateItem(e, r, { w: o, h: d, bits: [...l] }), O();
  }}>应用</button>
      </div>
    </div>
  `;
  function O() {
    b.remove(), document.removeEventListener("pointerup", F);
  }
  document.addEventListener("pointerup", F), j(), n.appendChild(b);
}
function _e(n, t, e) {
  return Number.isFinite(n) ? Math.min(e, Math.max(t, Math.trunc(n))) : t;
}
const ut = "prebuilt/u8g2-menu-preview.js";
class ct {
  constructor(t, e = {}) {
    var l;
    if (this.store = $e(), this.renderScheduled = !1, this.lastExport = null, this.destroyed = !1, this.container = t, this.opts = { persistKey: "default", ...e }, t.classList.add("ume"), !document.getElementById("ume-style")) {
      const c = document.createElement("style");
      c.id = "ume-style", c.textContent = Se, document.head.appendChild(c);
    }
    const r = this.opts.persistKey ? localStorage.getItem(`ume_autosave_${this.opts.persistKey}`) : null, u = this.opts.data ?? r ?? void 0;
    if (u !== void 0)
      try {
        this.store.setState({ project: le(u) });
      } catch (c) {
        console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:", c);
      }
    const s = this.opts.persistKey ? localStorage.getItem(`ume_last_c_${this.opts.persistKey}`) : null, i = this.opts.persistKey ? localStorage.getItem(`ume_last_h_${this.opts.persistKey}`) : null;
    s && i && (this.lastExport = { c: s, h: i }), t.innerHTML = `
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
    const a = (c) => t.querySelector(c);
    this.els = {
      left: a(".ume-left"),
      center: a(".ume-center"),
      right: a(".ume-right"),
      styleEl: a('[data-role="style"]'),
      propEl: a('[data-role="prop"]'),
      toolbarUndo: a('[data-act="undo"]'),
      toolbarRedo: a('[data-act="redo"]')
    };
    const o = document.createElement("div");
    o.style.display = "flex", o.style.flexDirection = "column", o.style.alignItems = "center", o.style.gap = "10px", this.els.center.appendChild(o), this.preview = new qe(o, {
      onPageChanged: (c) => this.onPreviewPageChanged(c)
    });
    const d = document.createElement("div");
    this.els.center.appendChild(d), nt(d, this.preview), this.preview.load(this.opts.wasmUrl ?? ut).then(() => {
      this.preview.sync(this.store.getState().project), this.scheduleRender();
    }).catch((c) => {
      console.error(c);
      const b = document.createElement("div");
      b.className = "ume-warn", b.textContent = `预览引擎加载失败: ${c.message}。编辑功能不受影响。`, this.els.center.prepend(b);
    }), t.querySelector('[data-act="add-page"]').addEventListener("click", () => {
      const c = prompt("页面名称:", `页面${this.store.getState().project.pages.length + 1}`);
      c !== null && this.store.getState().addPage(c || void 0);
    }), this.els.toolbarUndo.addEventListener("click", () => this.store.getState().undo()), this.els.toolbarRedo.addEventListener("click", () => this.store.getState().redo()), t.querySelector('[data-act="export-json"]').addEventListener("click", () => {
      ae(
        `${this.store.getState().project.name || "menu-project"}.json`,
        he(this.store.getState().project),
        "application/json"
      );
    }), t.querySelector('[data-act="import"]').addEventListener("click", () => {
      a('[data-role="file"]').click();
    }), a('[data-role="file"]').addEventListener("change", (c) => {
      var x;
      const b = (x = c.target.files) == null ? void 0 : x[0];
      b && (b.text().then((y) => {
        try {
          const U = le(y);
          this.store.getState().update((H) => {
            Object.assign(H, U);
          }), this.scheduleRender();
        } catch (U) {
          alert(`导入失败: ${U.message}`);
        }
      }), c.target.value = "");
    }), t.querySelector('[data-act="generate"]').addEventListener("click", () => this.generate()), this.onKeyDown = this.onKeyDown.bind(this), document.addEventListener("keydown", this.onKeyDown), this.store.getState().select(((l = this.store.getState().project.pages[0]) == null ? void 0 : l.id) ?? null, null), this.store.subscribe(() => {
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
    const e = le(t);
    this.store.getState().update((u) => {
      Object.assign(u, e);
    }), this.store.getState().select(((r = e.pages[0]) == null ? void 0 : r.id) ?? null, null);
  }
  /** 生成 C 代码（保留 USER CODE），返回结果并弹出对话框 */
  generate() {
    var r, u;
    const t = this.lastExport, e = ge(this.store.getState().project, t ?? void 0);
    return this.lastExport = { c: e.c, h: e.h }, this.opts.persistKey && (localStorage.setItem(`ume_last_c_${this.opts.persistKey}`, e.c), localStorage.setItem(`ume_last_h_${this.opts.persistKey}`, e.h)), at(this.container, e), (u = (r = this.opts).onExport) == null || u.call(r, e), e;
  }
  downloadC() {
    const t = ge(this.store.getState().project, this.lastExport ?? void 0);
    this.lastExport = { c: t.c, h: t.h }, ae("menu_pages.c", t.c), ae("menu_pages.h", t.h);
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
          he(this.store.getState().project)
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
      Ze(this.els.left, this.store), tt(this.els.styleEl, this.store), Je(this.els.propEl, this.store, {
        openXbmEditor: (e, r) => st(this.container, this.store, e, r)
      }), this.els.toolbarUndo.disabled = t.past.length === 0, this.els.toolbarRedo.disabled = t.future.length === 0, this.updateLiveInfo();
    }));
  }
  updateLiveInfo() {
    var s, i;
    const t = document.getElementById("ume-live-page"), e = document.getElementById("ume-live-value"), r = this.store.getState(), u = this.store.getState().project.pages.findIndex((a) => a.id === r.selection.pageId);
    if (t && u >= 0) {
      const a = this.preview.currentPage;
      t.textContent = `预览页: ${((s = this.store.getState().project.pages[a]) == null ? void 0 : s.name) ?? "?"}`;
    }
    if (e && u >= 0 && r.selection.itemId) {
      const a = r.project.pages[u], o = a.items.findIndex((l) => l.id === r.selection.itemId), d = a.items[o];
      if (d && "varId" in d) {
        const l = d.varId ? (r.project.variables ?? []).findIndex((y) => y.id === d.varId) : -1, c = l >= 0 ? l : u * 64 + o, b = d.kind === "switch" ? this.preview.getSwitch(c) : this.preview.getInt(c), x = (i = (r.project.variables ?? []).find((y) => y.id === d.varId)) == null ? void 0 : i.name;
        e.textContent = `${x ?? d.kind} = ${b}`;
      } else
        e.textContent = "";
    }
  }
}
export {
  ct as MenuEditor,
  N as MenuKey
};
//# sourceMappingURL=u8g2-menu-editor.js.map
