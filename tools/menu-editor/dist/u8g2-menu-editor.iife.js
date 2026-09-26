"use strict";var U8G2MenuEditor=(()=>{var je=Object.defineProperty;var Jt=Object.getOwnPropertyDescriptor;var Qt=Object.getOwnPropertyNames;var en=Object.prototype.hasOwnProperty;var tn=(i,e)=>{for(var a in e)je(i,a,{get:e[a],enumerable:!0})},nn=(i,e,a,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Qt(e))!en.call(i,r)&&r!==a&&je(i,r,{get:()=>e[r],enumerable:!(t=Jt(e,r))||t.enumerable});return i};var an=i=>nn(je({},"__esModule",{value:!0}),i);var jn={};tn(jn,{MenuEditor:()=>lt,MenuKey:()=>Le});var ct=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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

/* ---------- \u5DE5\u5177\u680F ---------- */
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

/* ---------- \u4E3B\u4F53\u4E09\u680F ---------- */
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

/* ---------- \u6811 ---------- */
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

/* ---------- \u9884\u89C8 ---------- */
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

/* ---------- \u5C5E\u6027/\u6837\u5F0F\u9762\u677F ---------- */
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

/* ---------- XBM \u7F16\u8F91\u5668 ---------- */
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

/* ---------- \u5BF9\u8BDD\u6846 ---------- */
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

/* ---------- \u5F31\u5B9A\u4E49\u51FD\u6570\u52FE\u9009\u533A ---------- */
.ume-details { margin: 8px 0; border: 1px solid var(--ume-border); border-radius: 8px; background: #fbfcfe; }
.ume-details summary { padding: 7px 10px; font-weight: 600; cursor: pointer; font-size: 12px; user-select: none; }
.ume-details[open] summary { border-bottom: 1px solid var(--ume-border); }
.ume-weak-list { padding: 6px 10px; max-height: 320px; overflow-y: auto; }
.ume-weak-item { margin: 9px 0; }
.ume-weak-name { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; }
.ume-weak-desc { font-size: 11px; color: var(--ume-dim); margin: 2px 0 0 22px; line-height: 1.45; }
/* ---------- \u53D8\u91CF\u7BA1\u7406\u533A ---------- */
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
/* ---------- \u53F3\u680F Tab ---------- */
.ume-tabs { display: flex; gap: 2px; margin: -10px -10px 10px; padding: 4px 8px 0; border-bottom: 1px solid var(--ume-border); background: var(--ume-panel); }
.ume-tabs button { border: none; border-bottom: 2px solid transparent; background: transparent; padding: 6px 14px 5px; font: inherit; font-size: 12px; color: var(--ume-dim); cursor: pointer; }
.ume-tabs button:hover { color: var(--ume-text); }
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`;var mt=i=>{let e,a=new Set,t=(l,d)=>{let c=typeof l=="function"?l(e):l;if(!Object.is(c,e)){let p=e;e=d??(typeof c!="object"||c===null)?c:Object.assign({},e,c),a.forEach(f=>f(e,p))}},r=()=>e,o={setState:t,getState:r,getInitialState:()=>u,subscribe:l=>(a.add(l),()=>a.delete(l))},u=e=i(t,r,o);return o},pt=i=>i?mt(i):mt;var Q=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],ae={text:"\u6587\u672C",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},ft={text:"T",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},de={none:"\u65E0",value:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE"};var De=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var Ue=0;function U(i){return Ue=(Ue+1)%1e9,`${i}_${Date.now().toString(36)}_${Ue.toString(36)}`}function ge(i){return{id:U("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...i}}function Oe(i){return{id:U("buf"),name:"buf_new",dataLen:32,sample:"sine",...i}}function gt(i,e){let a=new Set(i.map(r=>r.name));if(!a.has(e))return e;let t=2;for(;a.has(`${e}_${t}`);)t++;return`${e}_${t}`}function ht(i,e){let a=new Set(i.map(r=>r.name));if(!a.has(e))return e;let t=2;for(;a.has(`${e}_${t}`);)t++;return`${e}_${t}`}function X(i){let e={id:U("it"),label:"",bind:{type:"none"}};switch(i){case"text":return{...e,kind:i,text:"\u83DC\u5355\u9879",scale:1,displayVarId:null};case"slider":return{...e,kind:i,position:50};case"progress":return{...e,kind:i,position:50};case"chart":return{...e,kind:i,sources:[],height:32};case"xbm":return rn(16,16);case"textarea":return{...e,kind:i,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:i,w:64,h:32,cbName:"board_cb"}}}function rn(i,e){let a=Math.ceil(i/8);return{id:U("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:i,h:e,bits:new Array(a*e).fill(0)}}function Fe(i){return{id:U("pg"),name:i,fnName:"",items:[]}}function Te(i,e){return{...i,...e}}function re(i,e){return{...i,...e}}function bt(){let i=[ge({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),ge({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),ge({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[Oe({name:"buf_demo",dataLen:32,sample:"sine"})],a=Fe("\u4E3B\u9875");a.items=[Te(X("text"),{text:"u8g2_menu"}),re(X("text"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E",bind:{type:"submenu",targetPageId:null}}),re(X("text"),{text:"\u5173\u4E8E",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];let t=Fe("\u8BBE\u7F6E");t.items=[re(Te(X("text"),{text:"\u97F3\u91CF:%d"}),{bind:{type:"value",varId:i[0].id}}),re(Te(X("text"),{text:"\u5F00\u5173:%s"}),{bind:{type:"switch",varId:i[1].id,openValue:1,onText:"on",offText:"off"}}),re(X("slider"),{bind:{type:"value",varId:i[2].id}}),re(X("text"),{text:"\u56FE\u8868",bind:{type:"submenu",targetPageId:null}}),re(X("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let r=Fe("\u56FE\u8868");r.items=[Te(X("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),re(X("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:i,chartBuffers:e,pages:[a,t,r]};return a.items[1].bind.targetPageId=t.id,t.items[3].bind.targetPageId=r.id,s}function vt(i){return structuredClone(i)}function xt(i){let e=new Map,a=(t,r,s,n)=>{if(!t)return;let o=e.get(t);o||(o={name:t,asButton:!1,asBoard:!1,refs:[]},e.set(t,o)),r==="button"?o.asButton=!0:o.asBoard=!0,o.refs.push({pageId:s.id,itemId:n.id,pageName:s.name,label:n.label||("text"in n?n.text:"")||ae[n.kind]})};for(let t of i.pages)for(let r of t.items)r.bind.type==="button"&&a(r.bind.cbName,"button",t,r),r.kind==="board"&&a(r.cbName,"board",t,r);return[...e.values()].sort((t,r)=>t.name.localeCompare(r.name))}var sn=800;function $t(){let i=null,e=0;return pt()((a,t)=>({project:bt(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{let n=Date.now(),o=!!s&&s===i&&n-e<sn;i=s??null,e=n,a(u=>{let l=vt(u.project);return r(l),{project:l,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{a(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{a(r=>{if(!r.future.length)return r;let[s,...n]=r.future;return{project:s,past:[...r.past,r.project],future:n,dirty:!0}})},select:(r,s=null)=>a({selection:{pageId:r,itemId:s}}),addPage:r=>{let s={id:U("pg"),name:r??`\u9875\u9762${t().project.pages.length+1}`,fnName:"",items:[]};return t().update(n=>{n.pages.push(s)}),a({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{t().update(n=>{n.pages=n.pages.filter(o=>o.id!==r);for(let o of n.pages)for(let u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});let{selection:s}=t();s.pageId===r&&a({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{t().update(n=>{let o=n.pages.findIndex(l=>l.id===r),u=o+s;o<0||u<0||u>=n.pages.length||([n.pages[o],n.pages[u]]=[n.pages[u],n.pages[o]])})},updatePage:(r,s)=>{t().update(n=>{let o=n.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{let n=s??t().selection.pageId??t().project.pages[0]?.id;if(!n)return null;let o=X(r);return t().update(u=>{u.pages.find(d=>d.id===n)?.items.push(o)}),a({selection:{pageId:n,itemId:o.id}}),o},removeItem:(r,s)=>{t().update(o=>{let u=o.pages.find(l=>l.id===r);u&&(u.items=u.items.filter(l=>l.id!==s))});let{selection:n}=t();n.itemId===s&&a({selection:{pageId:r,itemId:null}})},moveItem:(r,s,n)=>{t().update(o=>{let u=o.pages.find(c=>c.id===r);if(!u)return;let l=u.items.findIndex(c=>c.id===s),d=l+n;l<0||d<0||d>=u.items.length||([u.items[l],u.items[d]]=[u.items[d],u.items[l]])})},duplicateItem:(r,s)=>{let n=null;t().update(o=>{let u=o.pages.find(d=>d.id===r);if(!u)return;let l=u.items.findIndex(d=>d.id===s);l<0||(n=structuredClone(u.items[l]),n.id=U("it"),u.items.splice(l+1,0,n))}),n&&a({selection:{pageId:r,itemId:n.id}})},updateItem:(r,s,n,o)=>{t().update(u=>{let d=u.pages.find(c=>c.id===r)?.items.find(c=>c.id===s);d&&Object.assign(d,n)},o)},addVariable:r=>{let s=null;return t().update(n=>{n.variables=n.variables??[];let o=ht(n.variables,r?.name??"var_new");s=ge({...r,name:o}),n.variables.push(s)}),s},removeVariable:r=>{let s=0;for(let n of t().project.pages)for(let o of n.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(t().update(n=>{n.variables=(n.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,n)=>{t().update(o=>{let u=(o.variables??[]).find(l=>l.id===r);u&&Object.assign(u,s)},n)},addChartBuffer:r=>{let s=null;return t().update(n=>{n.chartBuffers=n.chartBuffers??[];let o=gt(n.chartBuffers,r?.name??"buf_new");s=Oe({...r,name:o}),n.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(let n of t().project.pages)for(let o of n.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(t().update(n=>{n.chartBuffers=(n.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,n)=>{t().update(o=>{let u=(o.chartBuffers??[]).find(l=>l.id===r);u&&Object.assign(u,s)},n)}}))}var ee=class extends Error{},_t=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),yt=new Set(["line","point","bar"]),wt=new Set(["sine","ramp","noise","none"]);function ce(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function R(i,e){return typeof i=="string"?i:e}function M(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}var on=["text","slider","progress","chart","xbm","textarea","board"],un=["number","switch","button","submenu","back"],ln=["none","value","switch","button","submenu","back"];function dn(i){if(!ce(i))throw new ee("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=R(i.kind,"");if(!(on.includes(e)||un.includes(e)))throw new ee(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let a=structuredClone(i);switch(a.id=R(i.id,""),a.id||(a.id=`it_${Math.random().toString(36).slice(2,10)}`),a.label=R(i.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":a.text=R(i.text,""),a.scale=i.scale===2?2:1;break}return a}function cn(i){for(let e of i)for(let a of e.items){let t=a;if(!(t.bind&&ce(t.bind)&&ln.includes(R(t.bind.type,"none")))){switch(t.kind){case"number":{let r=t.varId??null;t.editable===!1?(t.kind="text",t.displayVarId=r,t.bind={type:"none"}):(t.kind="text",t.displayVarId=null,t.bind={type:"value",varId:r});break}case"switch":t.kind="text",t.displayVarId=null,t.bind={type:"switch",varId:t.varId??null,openValue:M(t.openValue,1),onText:R(t.onText,"on"),offText:R(t.offText,"off")};break;case"button":t.kind="text",t.displayVarId=null,t.bind={type:"button",cbName:R(t.cbName,"btn_cb"),buttonId:M(t.buttonId,1)};break;case"submenu":t.kind="text",t.displayVarId=null,t.bind={type:"submenu",targetPageId:t.targetPageId??null};break;case"back":t.kind="text",t.displayVarId=null,t.bind={type:"back"};break;case"slider":case"progress":t.bind=t.varId?{type:"value",varId:t.varId}:{type:"none"},t.position===void 0&&(t.position=50);break;default:t.bind={type:"none"},t.kind==="text"&&t.displayVarId===void 0&&(t.displayVarId=null);break}delete t.varId,delete t.varName,delete t.varType,delete t.editable,delete t.step,delete t.min,delete t.max,delete t.initialValue,delete t.decimals,t.kind!=="board"&&(delete t.cbName,delete t.buttonId),delete t.openValue,delete t.onText,delete t.offText,delete t.targetPageId}}}function mn(i){if(!ce(i))throw new ee("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(i.items)?i.items.map(dn):[];return{id:R(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:R(i.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:R(i.fnName,""),items:e}}function pn(i){if(!ce(i))return null;let e=R(i.type,"int32");return{id:R(i.id,"")||U("vb"),name:R(i.name,""),type:_t.has(e)?e:"int32",initialValue:M(i.initialValue,0),min:M(i.min,0),max:M(i.max,100),step:M(i.step,1)}}function fn(i){if(!ce(i))return null;let e=R(i.sample,"sine");return{id:R(i.id,"")||U("buf"),name:R(i.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(M(i.dataLen,32)))),sample:wt.has(e)?e:"sine"}}function gn(i){let e=new Map,a=[],t=(r,s)=>{let n=e.get(r);return n||(n=s(),e.set(r,n),a.push(n)),n};for(let r of i)for(let s of r.items){let n=s;switch(s.kind){case"number":if(n.varId===void 0||n.varId===null){let u=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=t(u,()=>({id:U("vb"),name:u,type:_t.has(String(n.varType))?String(n.varType):"int32",initialValue:M(n.initialValue,0),min:M(n.min,0),max:M(n.max,100),step:M(n.step,1)}));s.varId=l.id}n.editable===void 0&&(s.editable=!0),delete n.varName,delete n.varType,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals;break;case"slider":case"progress":if(n.varId===void 0||n.varId===null){let u=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=t(u,()=>({id:U("vb"),name:u,type:"int",initialValue:M(n.initialValue,0),min:M(n.min,0),max:M(n.max,100),step:M(n.step,1)}));s.varId=l.id}delete n.varName,delete n.step,delete n.min,delete n.max,delete n.initialValue;break;case"switch":if(n.varId===void 0||n.varId===null){let u=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=t(u,()=>({id:U("vb"),name:u,type:"uint8",initialValue:M(n.initialValue,0),min:0,max:1,step:1}));s.varId=l.id}delete n.varName,delete n.initialValue;break;default:break}}return a}function Me(i){let e;if(typeof i=="string")try{e=JSON.parse(i)}catch{throw new ee("JSON \u89E3\u6790\u5931\u8D25")}else e=i;if(!ce(e))throw new ee("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let a=e,t=M(a.version,0);if(t>1)throw new ee(`\u5DE5\u7A0B\u7248\u672C v${t} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);let r=Array.isArray(a.pages)?a.pages.map(mn):[];if(!r.length)throw new ee("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(a.selector)?a.selector:"rotundity",n=new Set(Q.map(d=>d.fn)),o=Array.isArray(a.weakHooks)?[...new Set(a.weakHooks.filter(d=>typeof d=="string"&&n.has(d)))]:[],u;Array.isArray(a.variables)?u=a.variables.map(pn).filter(d=>!!d):u=gn(r);let l;return Array.isArray(a.chartBuffers)?l=a.chartBuffers.map(fn).filter(d=>!!d):l=hn(r),cn(r),bn(r,l),{version:1,name:R(a.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:M(a.width,128),height:M(a.height,64),font:R(a.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:M(a.selectorLeftMargin,16),selectorTopMargin:M(a.selectorTopMargin,0),selectorLineSpacing:M(a.selectorLineSpacing,0),marqueeSpeed:M(a.marqueeSpeed,.2),marqueeHeaderLen:M(a.marqueeHeaderLen,5),weakHooks:o,fontSubset:e.fontSubset===!0,fontExtra:R(e.fontExtra,""),variables:u,chartBuffers:l,pages:r}}function hn(i){let e=[],a=0,t=()=>{let r={id:U("buf"),name:`buf_chart_${++a}`,dataLen:32,sample:"sine"};return e.push(r),r};for(let r of i)for(let s of r.items){if(s.kind!=="chart")continue;let n=s;if(Array.isArray(n.sources))continue;let o=t();o.dataLen=Math.min(512,Math.max(2,Math.trunc(M(n.dataLen,32))));let u=R(n.sample,"sine");wt.has(u)&&(o.sample=u);let l=R(n.chartKind,"line"),d={bufferId:o.id,chartKind:yt.has(l)?l:"line"};n.max!==void 0&&n.max!==null&&(d.max=M(n.max,0)),n.min!==void 0&&n.min!==null&&(d.min=M(n.min,0)),s.sources=[d],n.height===void 0&&(s.height=32),delete n.chartKind,delete n.dataLen,delete n.sample,delete n.max,delete n.min}return e}function bn(i,e){let a=new Set(e.map(t=>t.id));for(let t of i)for(let r of t.items){if(r.kind!=="chart")continue;let s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(n=>a.has(n.bufferId)).map(n=>({bufferId:n.bufferId,chartKind:yt.has(n.chartKind)?n.chartKind:"line",min:n.min,max:n.max})),typeof s.height!="number"&&(s.height=32)}}function qe(i){return JSON.stringify(i,null,2)}var vn={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function Z(i,e="anon"){let a=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!a||/^[0-9]/.test(a))&&(a=`_${a}`),a||e}var Ce=/^[A-Za-z_][A-Za-z0-9_]*$/,It=new Set(["auto","break","case","char","const","continue","default","do","double","else","enum","extern","float","for","goto","if","inline","int","long","register","restrict","return","short","signed","sizeof","static","struct","switch","typedef","union","unsigned","void","volatile","while","_Bool","_Complex","_Imaginary"]);function Pe(i){return Ce.test(i)&&!It.has(i)}function he(i,e,a,t){let r=i;if(It.has(r)&&(r=`${r}_`,a.push(`${t} "${i}" \u662F C \u5173\u952E\u5B57\uFF0C\u751F\u6210\u540D\u6539\u4E3A "${r}"`)),!e.has(r))return e.add(r),r;let s=2;for(;e.has(`${r}_${s}`);)s++;let n=`${r}_${s}`;return a.push(`${t} "${i}" \u4E0E\u5176\u4ED6\u751F\u6210\u7B26\u53F7\u51B2\u7A81\uFF08\u9875\u9762\u51FD\u6570/\u53D8\u91CF/\u7F13\u51B2\u533A/\u5B57\u4F53\u6570\u7EC4\uFF09\uFF0C\u5DF2\u6539\u4E3A "${n}"`),e.add(n),n}function be(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function ie(i){if(!Number.isFinite(i))return"0.0f";let e=i.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function xn(i,e,a){return a==="ramp"?`${i}[i] = (float)i;`:a==="noise"?`${i}[i] = (float)((i * 37) % ${e});`:`${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function $n(i){let e=new Map;if(!i)return e;let a=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,t;for(;(t=a.exec(i))!==null;)e.set(t[1],t[2]);return e}function G(i,e,a){let t=e.has(i)?e.get(i):"";return`${a}/* USER CODE BEGIN ${i} */${t}${a}/* USER CODE END ${i} */`}var _n=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function kt(i,e,a){let t=[],r=$n(e?.c??""),s=new Set;a&&s.add("menu_font");let n=[];i.pages.forEach((m,w)=>{let x=`page_${w}`;m.fnName&&(Ce.test(m.fnName)?x=m.fnName:t.push(`\u9875\u9762 "${m.name}" \u7684\u51FD\u6570\u540D "${m.fnName}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u56DE\u9000\u4E3A page_${w}`)),n.push(he(x,s,t,`\u9875\u9762 "${m.name}" \u7684\u51FD\u6570\u540D`))});let o=new Map,u=new Map;for(let m of i.variables??[]){if(!m.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}Ce.test(m.name)||t.push(`\u53D8\u91CF\u540D "${m.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${Z(m.name)}"`);let w=Z(m.name,"var");if(o.has(w)){t.push(`\u53D8\u91CF\u540D "${m.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}let x=he(w,s,t,`\u53D8\u91CF\u540D "${w}"`),S=m.type==="float"||m.type==="double",A={name:x,srcType:m.type,type:vn[m.type],init:S?ie(m.initialValue):String(Math.trunc(m.initialValue)),isFloat:S,step:m.step,min:m.min,max:m.max};o.set(x,A),u.set(m.id,A)}let l=new Map,d=new Set,c=[],p=new Map,f=new Set;(i.chartBuffers??[]).forEach((m,w)=>{if(!m.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");return}Ce.test(m.name)||t.push(`\u7F13\u51B2\u533A\u540D "${m.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${Z(m.name)}"`);let x=Z(m.name,"buf");if(f.has(x)){t.push(`\u7F13\u51B2\u533A\u540D "${m.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);return}f.add(x);let S=he(x,s,t,`\u7F13\u51B2\u533A\u540D "${x}"`),A=Math.max(2,Math.trunc(m.dataLen)),B=`${S.toUpperCase()}_LEN`;p.set(m.id,{name:S,lenMacro:B,len:A});let j=`fill_${S}`;if(!(r.get(j)??"").trim()){let T=r.get(`chart${w}_fill`);T&&T.trim()&&(r.set(j,T),t.push(`\u5DF2\u5C06\u65E7\u7248 chart${w}_fill \u624B\u5199\u5185\u5BB9\u8FC1\u79FB\u81F3 ${j}\uFF08\u540E\u7EED\u8BF7\u76F4\u63A5\u5728\u8BE5\u533A\u5185\u7EF4\u62A4\uFF09`))}let W=(r.get(j)??"").trim()!=="";c.push(`#define ${B} ${A}`,`static float ${S}[${B}];`,`static uint8_t ${S}_filled = 0;`,`static void ${S}_fill(void)`,"{",G(j,r,"    "),...m.sample!=="none"&&!W?[`    for (uint16_t i = 0; i < ${B}; ++i) { ${xn(S,A,m.sample)} }`]:[],"}")});let b=[],y=new Map,v=new Map,h=new Map;{let m=0,w=0,x=S=>{let A=p.get(S);return A?(h.has(S)||h.set(S,`        if (!${A.name}_filled) { ${A.name}_filled = 1; ${A.name}_fill(); }`),h.get(S)):""};for(let S of i.pages)for(let A of S.items){if(A.kind!=="chart")continue;let B=A.sources.filter(T=>p.has(T.bufferId));if(A.sources.length&&!B.length){t.push(`\u9875\u9762 ${S.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!B.length){t.push(`\u9875\u9762 ${S.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let j=Math.max(4,Math.trunc(A.height)),W=[];for(let T of B){let L=p.get(T.bufferId),_=`chart${m++}`;b.push(`static float ${_}_dis[${L.lenMacro}];`,`static u8g2_chart_t ${_};`),W.push({name:_,s:T,b:L})}if(W.length===1){let{name:T,s:L,b:_}=W[0];b.push(`static uint8_t ${T}_inited = 0;`),y.set(A.id,[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`,`        u8g2_chart_init(&${T}, ${_.name}, ${T}_dis, ${_.lenMacro});`,x(L.bufferId),"    }"]);let E=L.chartKind==="point"?"Point":L.chartKind==="bar"?"Bar":"Line",Ee=L.min!==void 0&&L.max!==void 0?`${ie(L.max)}, ${ie(L.min)}`:"0, 0";v.set(A.id,`    u8g2_MenuDrawItem${E}Chart(&${T}, ${j}, ${Ee});`)}else{let T=`chart_layers_${w++}`;b.push(`static u8g2_menu_drawChart_t ${T}[${W.length}];`,`static uint8_t ${T}_inited = 0;`);let L=[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`];W.forEach(({name:_,s:E,b:Ee},Ae)=>{L.push(`        u8g2_chart_init(&${_}, ${Ee.name}, ${_}_dis, ${Ee.lenMacro});`),L.push(x(E.bufferId));let Gt=E.chartKind==="point"?"u8g2_drawPointChart":E.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",dt=E.min!==void 0&&E.max!==void 0?`${ie(E.max)}, ${ie(E.min)}`:"0, 0";L.push(`        ${T}[${Ae}].drawChart = ${Gt};`),L.push(`        ${T}[${Ae}].chart = &${_};`),L.push(`        ${T}[${Ae}].max = ${dt.split(", ")[0]};`),L.push(`        ${T}[${Ae}].min = ${dt.split(", ")[1]};`)}),L.push("    }"),y.set(A.id,L),v.set(A.id,`    u8g2_MenuDrawItemChart(${T}, ${W.length}, ${j});`)}}}let H=[],N=[],O=[],q=new Set,te=new Map,K=0;for(let m of i.pages)for(let w of m.items){if(w.bind.type==="button"){let x=Z(w.bind.cbName,"btn_cb");l.has(x)||l.set(x,w.bind.buttonId)}switch(w.kind){case"board":d.add(Z(w.cbName,"board_cb"));break;case"xbm":{let x=Z(w.name,"icon");for(;q.has(x);)x=`${x}_2`;q.add(x),te.set(w.id,x);let S=w.bits.length,A=w.bits.map(B=>`0x${(B&255).toString(16).padStart(2,"0")}`).join(", ");H.push(`static const uint8_t menu_xbm_${x}[${S}] = { ${A} };`);break}case"textarea":{let x=K++;N.push(`static char ta${x}_text[] = "${be(w.content)}";`,`static u8g2_menu_textArea_t ta${x};`,`static uint8_t ta${x}_inited = 0;`),O.push(`    if (!ta${x}_inited) {`,`        ta${x}_inited = 1;`,`        u8g2_textArea_init(&ta${x}, ta${x}_text);`,`        u8g2_textArea_setLineSpacing(&ta${x}, ${Math.max(0,Math.trunc(w.lineSpacing))});`,"    }");break}default:break}}let C=new Map,k=new Map;for(let m of l.keys())C.set(m,he(m,s,t,`\u6309\u94AE\u56DE\u8C03\u540D "${m}"`));for(let m of d)k.set(m,he(m,s,t,`\u81EA\u7ED8\u677F\u56DE\u8C03\u540D "${m}"`));let V=(m,w)=>{if(!m)return"";let x=`"${be(m)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${x});`:`u8g2_MenuUTF8Printf(${x});`},D=(m,w,x)=>{let S=`"${be(m)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${S}, ${x});`:`u8g2_MenuUTF8Printf(${S}, ${x});`},ne=0,Se=(m,w)=>{let x=[],S=`${w.name}`,A=_=>{if(!_)return null;let E=u.get(_);return E||t.push(`\u9875\u9762 ${S} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),E??null},B=m.bind,j=null,W=null,T="on",L="off";switch(B.type){case"value":{let _=A(B.varId);if(_){j=_;let E=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${ie(_.step)}, ${ie(_.min)}, ${ie(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;x.push(`    ${E}`)}break}case"switch":{let _=A(B.varId);_&&_.srcType!=="uint8"?t.push(`\u5F00\u5173\u9644\u52A0\u503C\u7ED1\u5B9A\u7684\u53D8\u91CF "${_.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${_.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`):_&&(W=_,T=B.onText,L=B.offText,x.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(B.openValue)});`));break}case"button":{let _=Z(B.cbName,"btn_cb"),E=C.get(_)??_;x.push(`    u8g2_MenuItem_button(${E}, ${Math.trunc(B.buttonId)});`);break}case"submenu":{let _=i.pages.findIndex(E=>E.id===B.targetPageId);!B.targetPageId||_<0?t.push(`\u9875\u9762 ${S} \u7684\u6761\u76EE "${m.label||"\u672A\u547D\u540D"}" \u9644\u52A0\u503C\u76EE\u6807\u9875\u9762\u65E0\u6548\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`):x.push(`    u8g2_MenuItem_menu_enter(${n[_]});`);break}case"back":x.push("    u8g2_MenuItem_menu_back();");break;default:break}switch(m.kind){case"text":{if(j)x.push(`    ${D(m.text,m.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(m.text)||t.push(`\u9875\u9762 ${S} \u7684\u6570\u503C\u9644\u52A0\u503C\u6761\u76EE\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(W)x.push(`    ${D(m.text,m.scale,`${W.name} ? "${be(T)}" : "${be(L)}"`)}`),/%[-+ #0]*s/.test(m.text)||t.push("\u5F00\u5173\u9644\u52A0\u503C\u6761\u76EE\u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off");else if(B.type==="none"&&m.displayVarId){let _=A(m.displayVarId);if(_)x.push(`    ${D(m.text,m.scale,_.name)}`),/%[-+ #0]*[a-zA-Z]/.test(m.text)||t.push(`\u9875\u9762 ${S} \u7684\u663E\u793A\u6761\u76EE\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else{t.push(`\u9875\u9762 ${S} \u7684\u663E\u793A\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let E=V(m.text,m.scale);E&&x.push(`    ${E}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(m.text)){t.push(`\u9875\u9762 ${S} \u7684\u6587\u672C\u6761\u76EE\u542B\u5360\u4F4D\u7B26\u4F46\u672A\u7ED1\u5B9A\u53D8\u91CF/\u663E\u793A\u53D8\u91CF\uFF0C\u5360\u4F4D\u7B26\u5DF2\u79FB\u9664`);let _=V(m.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),m.scale);_&&x.push(`    ${_}`)}else{let _=V(m.text,m.scale);_&&x.push(`    ${_}`)}break}case"slider":case"progress":{let _=m.kind==="slider"?"Slider":"ProgressBar";if(j){if(!_n.has(j.srcType)){t.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u9644\u52A0\u503C\u7684\u53D8\u91CF "${j.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${j.srcType}\uFF09\uFF0C\u5DF2\u6309\u9759\u6001\u663E\u793A\u751F\u6210`),x.push(`    u8g2_MenuDrawItem${_}(${(m.position/100).toFixed(2)}f);`);break}x.push(`    u8g2_MenuDrawItem${_}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{let E=Math.min(100,Math.max(0,m.position));x.push(`    u8g2_MenuDrawItem${_}(${(E/100).toFixed(2)}f);`)}break}case"chart":{let _=y.get(m.id),E=v.get(m.id);if(!_||!E)break;x.push(..._),x.push(E);break}case"xbm":x.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${te.get(m.id)??Z(m.name,"icon")});`);break;case"textarea":{let _=ne++;x.push(...O[_].split(`
`));let E=m.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";x.push(`    ${E}(&ta${_}, ${Math.max(10,Math.trunc(m.height))});`);break}case"board":{let _=Z(m.cbName,"board_cb"),E=k.get(_)??_;x.push(`    u8g2_MenuDrawItemBoard(${E}, ${Math.max(1,Math.trunc(m.w))}, ${Math.max(1,Math.trunc(m.h))});`);break}}return x},$=[];$.push("/**"),$.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${i.name}`),$.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),$.push(" *"),$.push(" * main.c \u91CC\u4F7F\u7528\u4EE5\u4E0B\u7B26\u53F7\u65F6\uFF0C\u76F4\u63A5 extern\uFF08\u6216\u590D\u5236\u4E0B\u9762\u58F0\u660E\uFF09\uFF1A"),$.push(` *   u8g2_SetFont(&u8g2, ${a?"menu_font":i.font});`),n.forEach((m,w)=>$.push(` *   void ${m}(void);   /* \u9875\u9762: ${i.pages[w].name} */`));for(let m of o.values())$.push(` *   extern ${m.type} ${m.name};`);for(let m of C.values())$.push(` *   void ${m}(u8g2_menu_t *menu, uint8_t ID);`);for(let m of k.values())$.push(` *   void ${m}(u8g2_t *u8g2);`);$.push(" */"),$.push('#include "u8g2_menu.h"'),(i.chartBuffers??[]).some(m=>m.sample==="sine")&&$.push("#include <math.h>"),$.push(""),$.push(G("includes",r,"")),$.push(""),n.forEach(m=>$.push(`void ${m}(void);`)),$.push(""),$.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),$.push(G("variables",r,""));for(let m of o.values())$.push(`${m.type} ${m.name} = ${m.init};`);if($.push(""),a){$.push("/* ======================== \u5B57\u4F53\uFF08\u73B0\u573A\u53D6\u6A21\uFF09 ======================== */"),$.push("/* \u4EC5\u5305\u542B\u5DE5\u7A0B\u6587\u672C\u7528\u5230\u7684\u5B57\u5F62\uFF08\u542B ASCII 95 \u4E2A + \u989D\u5916\u5B57\u7B26\uFF09\uFF0C"),$.push(" * main.c \u91CC u8g2_SetFont(&u8g2, menu_font) \u5373\u53EF\u4F7F\u7528\uFF1B"),$.push(' * \u82E5\u8FD0\u884C\u65F6\u8F93\u51FA\u8D85\u51FA\u6B64\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u7F16\u8F91\u5668"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u8865\u5145\u540E\u91CD\u65B0\u751F\u6210\u3002 */');let m=[];for(let w=0;w<a.length;w+=16)m.push("  "+[...a.slice(w,w+16)].map(x=>`0x${x.toString(16).padStart(2,"0")}`).join(", ")+",");$.push(`const uint8_t menu_font[${a.length}] U8G2_FONT_SECTION("menu_font") = {`),$.push(...m),$.push("};"),$.push("")}if((c.length||b.length||N.length||H.length)&&($.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),$.push(...c,...b,...N,...H),$.push("")),l.size||d.size){$.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),$.push(G("callbacks",r,""));for(let[m]of l){let w=C.get(m);$.push(`void ${w}(u8g2_menu_t *menu, uint8_t ID)`),$.push("{"),$.push(G(`cb_${w}`,r,"    ")),$.push("}"),$.push("")}for(let m of d){let w=k.get(m);$.push(`void ${w}(u8g2_t *u8g2)`),$.push("{"),$.push(G(`cb_${w}`,r,"    ")),$.push("}"),$.push("")}}let J=(i.weakHooks??[]).map(m=>Q.find(w=>w.fn===m)).filter(m=>!!m);if(J.length||r.has("weak")||Q.some(m=>(r.get(`weak_${m.fn}`)??"").trim())){$.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),$.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),$.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let w=Q.filter(x=>!i.weakHooks?.includes(x.fn)&&(r.get(`weak_${x.fn}`)??"").trim()).map(x=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${x.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${x.decl}`,"{",G(`weak_${x.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);$.push(w?`${G("weak",r,"").replace(/\n$/,"")}
${w}
`:G("weak",r,"")),$.push("");for(let x of J){$.push(`/* ${x.label}: ${x.desc} */`),$.push(`${x.decl}`),$.push("{"),$.push(G(`weak_${x.fn}`,r,"    "));let S=x.bodyArgs.split(`
`).map(A=>`    ${A}`);x.retNote&&S.push(`    ${x.retNote}`),$.push(...S),$.push("}"),$.push("")}}return $.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),$.push(""),i.pages.forEach((m,w)=>{$.push(`/* \u9875\u9762: ${m.name} */`),$.push(`void ${n[w]}(void)`),$.push("{"),$.push(G(`page_${n[w]}_pre`,r,"    "));for(let x of m.items)$.push(...Se(x,m));$.push("}"),$.push("")}),{c:`${$.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:t}}function yn(i){return{raw:i.slice(0,23),glyphCnt:i[0],startUpperA:i[17]<<8|i[18],startLowerA:i[19]<<8|i[20],startUnicode:i[21]<<8|i[22]}}function Ne(i,e,a){let t=[],r=[],s=[],n=[...e].sort((b,y)=>b-y);for(let b of n){let y=a(b);if(!y||!y.length){s.push(b);continue}b<=255?t.push({encoding:b,entry:y}):r.push({encoding:b,entry:y})}if(!t.length&&!r.length)return null;let o=t.length+r.length,u=0;for(let b of t)u+=b.entry.length;u+=2;let l=4;for(let b of r)l+=b.entry.length;l+=2;let d=yn(i),c=new Uint8Array(23+u+l);c.set(d.raw,0),c[0]=o,c[17]=0,c[18]=0,c[19]=0,c[20]=0,c[21]=0,c[22]=0;let p=23;for(let b of t){if(b.encoding===65){let y=p-23;c[17]=y>>8&255,c[18]=y&255}if(b.encoding===97){let y=p-23;c[19]=y>>8&255,c[20]=y&255}c.set(b.entry,p),p+=b.entry.length}c[p]=0,c[p+1]=0,p+=2;let f=p-23;c[21]=f>>8&255,c[22]=f&255,c[p]=0,c[p+1]=4,c[p+2]=255,c[p+3]=255,p+=4;for(let b of r)c.set(b.entry,p),p+=b.entry.length;return c[p]=0,c[p+1]=0,{font:c,included:o,missing:s}}function St(i){return[...i].map(e=>e.codePointAt(0)).filter(e=>Number.isFinite(e))}function Et(){let i=[];for(let e=32;e<=126;e++)i.push(e);return i}function me(i,e){let a=new Set(Et()),t=r=>{for(let s of St(r))a.add(s)};for(let r of i.pages)for(let s of r.items)s.kind==="text"&&t(s.text),s.kind==="textarea"&&t(s.content),s.bind.type==="switch"&&(t(s.bind.onText),t(s.bind.offText));return t(e),a.delete(10),a.delete(13),a}function Ve(i){let e=0,a=0;for(let t of i)t<=126?e++:a++;return{total:i.size,ascii:e,cjk:a}}var Le=(o=>(o[o.None=0]="None",o[o.Up=1]="Up",o[o.Down=2]="Down",o[o.Enter=3]="Enter",o[o.Return=4]="Return",o[o.Add=5]="Add",o[o.Sub=6]="Sub",o))(Le||{}),At=64;var wn=128*64/8;function In(i){return new Promise((e,a)=>{let t=document.createElement("script");t.src=i,t.onload=()=>e(),t.onerror=()=>a(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${i}`)),document.head.appendChild(t)})}var Be=class{constructor(e,a={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.fontSig=null;this.lastKnownPage=0;this.fontApplyWarning=null;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=a}async load(e){if(this.mod)return;let a=window;a.U8G2MenuPreview||await In(e);let t=a.U8G2MenuPreview;if(!t)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await t({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let r=this.mod._em_font_count_export();for(let s=0;s<r;s++){let n=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(n),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(a=>`${a.name}|${a.dataLen}|${a.sample}`),pages:e.pages.map(a=>({n:a.items.length,k:a.items.map(t=>t.kind).join(","),res:a.items.map(t=>t.kind==="chart"?(t.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):t.kind==="xbm"?`${t.w}x${t.h}`:t.kind==="textarea"?Math.ceil(t.content.length/64):"").join(",")}))})}sync(e){let a=this.mod;if(!a)return;let t=this.signature(e);t!==this.structSig&&(a.ccall("em_reset_dynamic",null,[],[]),this.structSig=t);let r=d=>Math.trunc(Number.isFinite(d)?d:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},n={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},l=d=>d?(e.variables??[]).findIndex(c=>c.id===d):-1;if((e.variables??[]).forEach((d,c)=>{a.ccall("em_var_define",null,["number","number","number","number","number","number"],[c,s[d.type],r(d.initialValue),r(d.step),r(d.min),r(d.max)])}),(e.chartBuffers??[]).forEach((d,c)=>{a.ccall("em_buf_define",null,["number","number","number"],[c,r(d.dataLen),u[d.sample]])}),e.pages.forEach((d,c)=>{a.ccall("em_page_begin",null,["number"],[c]),d.items.forEach((p,f)=>{let b=()=>{let y=p.bind;if(y.type==="none")return;let v=y.type==="value"||y.type==="switch",h=v?(e.variables??[]).find(H=>H.id===y.varId):void 0;a.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[c,f,o[y.type],v&&h?s[h.type]:0,y.type==="switch"?r(y.openValue):0,y.type==="button"?r(y.buttonId):0,y.type==="submenu"?e.pages.findIndex(H=>H.id===y.targetPageId):-1,v&&h?l(h.id):-1]),y.type==="switch"&&a.ccall("em_item_switch_text",null,["number","number","string","string"],[c,f,y.onText,y.offText])};switch(p.kind){case"text":a.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,f,n.text,p.scale,0,0,0,p.displayVarId?l(p.displayVarId):-1,-1]),a.ccall("em_item_text",null,["number","number","string"],[c,f,p.text]),b();break;case"slider":case"progress":a.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,f,n[p.kind],1,0,0,0,-1,-1]),b();break;case"chart":a.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,f,n.chart,1,r(p.height),0,0,-1,-1]);for(let y of p.sources??[])a.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[c,f,(e.chartBuffers??[]).findIndex(v=>v.id===y.bufferId),{line:0,point:1,bar:2}[y.chartKind],y.min!==void 0&&y.max!==void 0?1:0,y.max??0,y.min??0]);b();break;case"xbm":a.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,f,n.xbm,1,0,r(p.w),r(p.h),-1,-1]);{let y=a._em_scratch(p.bits.length);y&&(a.HEAPU8.set(new Uint8Array(p.bits),y),a._em_item_bits(c,f,y,p.bits.length))}b();break;case"textarea":a.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,f,n.textarea,1,r(p.height),0,0,-1,-1]),a.ccall("em_item_text",null,["number","number","string"],[c,f,p.content]),b();break;case"board":a.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,f,n.board,1,0,r(p.w),r(p.h),-1,-1]),b();break}}),a.ccall("em_page_end",null,["number","number"],[c,d.items.length])}),a.ccall("em_pages_commit",null,["number"],[e.pages.length]),a.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],r(e.selectorLeftMargin),r(e.selectorTopMargin),r(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen]),e.fontSubset){let d=me(e,e.fontExtra),c=e.font+"|"+[...d].sort((p,f)=>p-f).join(",");c!==this.fontSig&&(this.fontSig=c,this.applyFontSubset(this.fontIndex(e.font),d))}else this.fontSig!==null&&(this.fontSig=null,this.fontApplyWarning=null)}applyFontSubset(e,a){this.fontApplyWarning=null;let t=this.getFontBytes(e),r=this.glyphFetcher(e),s=t&&r?Ne(t,a,r):null;if(!s){this.fontApplyWarning="\u73B0\u573A\u53D6\u6A21\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62\uFF0C\u9884\u89C8\u4F7F\u7528\u5185\u7F6E\u5B57\u4F53";return}this.useCustomFont(s.font)||(this.fontApplyWarning=`\u5B50\u96C6\u5B57\u4F53 ${s.font.length} \u5B57\u8282\u8D85\u8FC7\u9884\u89C8\u69FD\u4F4D\u5BB9\u91CF\uFF0C\u9884\u89C8\u5DF2\u56DE\u9000\u5168\u5B57\u5E93\uFF08\u5BFC\u51FA\u7684 menu_font \u6570\u7EC4\u4E0D\u53D7\u5F71\u54CD\uFF09`)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=a=>{if(!this.running)return;let t=Math.min(100,Math.round(a-this.lastT));this.lastT=a,this.renderFrame(t),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let a=this.mod;if(!a)return;let t=a._em_frame(e);if(!t)return;this.img||(this.img=this.ctx.createImageData(128,64));let r=a.HEAPU8.subarray(t,t+wn),s=this.img.data;s.fill(255);for(let o=0;o<64;o++){let u=(o>>3)*128,l=1<<(o&7),d=o*128*4;for(let c=0;c<128;c++)r[u+c]&l&&(s[d]=17,s[d+1]=24,s[d+2]=39),d+=4}this.ctx.putImageData(this.img,0,0);let n=a._em_get_current_page();n!==this.lastKnownPage&&(this.lastKnownPage=n,this.events.onPageChanged?.(n))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getFontBytes(e){let a=this.mod;if(!a)return null;let t=a.ccall("em_font_data","number",["number"],[e]),r=a.ccall("em_font_data_len","number",["number"],[e]);return!t||!r?null:a.HEAPU8.slice(t,t+r)}glyphFetcher(e){let a=this.mod;return a?t=>{let r=a.ccall("em_scratch","number",["number"],[64]),s=a.ccall("em_font_glyph","number",["number","number","number","number"],[e,t,64,r]);return s?a.HEAPU8.slice(r,r+s):null}:null}useCustomFont(e){let a=this.mod;if(!a)return!1;let t=a.ccall("em_custom_font_ptr","number",[],[]),r=a.ccall("em_custom_font_max","number",[],[]);return e.length>r?!1:(a.HEAPU8.set(e,t),a.ccall("em_set_custom_font",null,["number"],[e.length]),!0)}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Qe=globalThis,Tt=i=>i,Re=Qe.trustedTypes,Mt=Re?Re.createPolicy("lit-html",{createHTML:i=>i}):void 0,Lt="$lit$",se=`lit$${Math.random().toFixed(9).slice(2)}$`,Rt="?"+se,kn=`<${Rt}>`,le=document,xe=()=>le.createComment(""),$e=i=>i===null||typeof i!="object"&&typeof i!="function",et=Array.isArray,Sn=i=>et(i)||typeof i?.[Symbol.iterator]=="function",We=`[ 	
\f\r]`,ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ct=/-->/g,Pt=/>/g,oe=RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,Vt=/"/g,Ht=/^(?:script|style|textarea|title)$/i,tt=i=>(e,...a)=>({_$litType$:i,strings:e,values:a}),g=tt(1),ua=tt(2),la=tt(3),_e=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),Bt=new WeakMap,ue=le.createTreeWalker(le,129);function Kt(i,e){if(!et(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(e):e}var En=(i,e)=>{let a=i.length-1,t=[],r,s=e===2?"<svg>":e===3?"<math>":"",n=ve;for(let o=0;o<a;o++){let u=i[o],l,d,c=-1,p=0;for(;p<u.length&&(n.lastIndex=p,d=n.exec(u),d!==null);)p=n.lastIndex,n===ve?d[1]==="!--"?n=Ct:d[1]!==void 0?n=Pt:d[2]!==void 0?(Ht.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=oe):d[3]!==void 0&&(n=oe):n===oe?d[0]===">"?(n=r??ve,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,l=d[1],n=d[3]===void 0?oe:d[3]==='"'?Vt:Nt):n===Vt||n===Nt?n=oe:n===Ct||n===Pt?n=ve:(n=oe,r=void 0);let f=n===oe&&i[o+1].startsWith("/>")?" ":"";s+=n===ve?u+kn:c>=0?(t.push(l),u.slice(0,c)+Lt+u.slice(c)+se+f):u+se+(c===-2?o:f)}return[Kt(i,s+(i[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]},ye=class i{constructor({strings:e,_$litType$:a},t){let r;this.parts=[];let s=0,n=0,o=e.length-1,u=this.parts,[l,d]=En(e,a);if(this.el=i.createElement(l,t),ue.currentNode=this.el.content,a===2||a===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=ue.nextNode())!==null&&u.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(Lt)){let p=d[n++],f=r.getAttribute(c).split(se),b=/([.?@])?(.*)/.exec(p);u.push({type:1,index:s,name:b[2],strings:f,ctor:b[1]==="."?Ze:b[1]==="?"?Ye:b[1]==="@"?Ge:fe}),r.removeAttribute(c)}else c.startsWith(se)&&(u.push({type:6,index:s}),r.removeAttribute(c));if(Ht.test(r.tagName)){let c=r.textContent.split(se),p=c.length-1;if(p>0){r.textContent=Re?Re.emptyScript:"";for(let f=0;f<p;f++)r.append(c[f],xe()),ue.nextNode(),u.push({type:2,index:++s});r.append(c[p],xe())}}}else if(r.nodeType===8)if(r.data===Rt)u.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(se,c+1))!==-1;)u.push({type:7,index:s}),c+=se.length-1}s++}}static createElement(e,a){let t=le.createElement("template");return t.innerHTML=e,t}};function pe(i,e,a=i,t){if(e===_e)return e;let r=t!==void 0?a._$Co?.[t]:a._$Cl,s=$e(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,a,t)),t!==void 0?(a._$Co??=[])[t]=r:a._$Cl=r),r!==void 0&&(e=pe(i,r._$AS(i,e.values),r,t)),e}var Xe=class{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:a},parts:t}=this._$AD,r=(e?.creationScope??le).importNode(a,!0);ue.currentNode=r;let s=ue.nextNode(),n=0,o=0,u=t[0];for(;u!==void 0;){if(n===u.index){let l;u.type===2?l=new we(s,s.nextSibling,this,e):u.type===1?l=new u.ctor(s,u.name,u.strings,this,e):u.type===6&&(l=new Je(s,this,e)),this._$AV.push(l),u=t[++o]}n!==u?.index&&(s=ue.nextNode(),n++)}return ue.currentNode=le,r}p(e){let a=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,a),a+=t.strings.length-2):t._$AI(e[a])),a++}},we=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,a,t,r){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,a=this._$AM;return a!==void 0&&e?.nodeType===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=pe(this,e,a),$e(e)?e===I||e==null||e===""?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==_e&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Sn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&$e(this._$AH)?this._$AA.nextSibling.data=e:this.T(le.createTextNode(e)),this._$AH=e}$(e){let{values:a,_$litType$:t}=e,r=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=ye.createElement(Kt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(a);else{let s=new Xe(r,this),n=s.u(this.options);s.p(a),this.T(n),this._$AH=s}}_$AC(e){let a=Bt.get(e.strings);return a===void 0&&Bt.set(e.strings,a=new ye(e)),a}k(e){et(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,t,r=0;for(let s of e)r===a.length?a.push(t=new i(this.O(xe()),this.O(xe()),this,this.options)):t=a[r],t._$AI(s),r++;r<a.length&&(this._$AR(t&&t._$AB.nextSibling,r),a.length=r)}_$AR(e=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);e!==this._$AB;){let t=Tt(e).nextSibling;Tt(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},fe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,t,r,s){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=a,this._$AM=r,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=I}_$AI(e,a=this,t,r){let s=this.strings,n=!1;if(s===void 0)e=pe(this,e,a,0),n=!$e(e)||e!==this._$AH&&e!==_e,n&&(this._$AH=e);else{let o=e,u,l;for(e=s[0],u=0;u<s.length-1;u++)l=pe(this,o[t+u],a,u),l===_e&&(l=this._$AH[u]),n||=!$e(l)||l!==this._$AH[u],l===I?e=I:e!==I&&(e+=(l??"")+s[u+1]),this._$AH[u]=l}n&&!r&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ze=class extends fe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}},Ye=class extends fe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}},Ge=class extends fe{constructor(e,a,t,r,s){super(e,a,t,r,s),this.type=5}_$AI(e,a=this){if((e=pe(this,e,a,0)??I)===_e)return;let t=this._$AH,r=e===I&&t!==I||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,s=e!==I&&(t===I||r);r&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Je=class{constructor(e,a,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){pe(this,e)}};var An=Qe.litHtmlPolyfillSupport;An?.(ye,we),(Qe.litHtmlVersions??=[]).push("3.3.3");var z=(i,e,a)=>{let t=a?.renderBefore??e,r=t._$litPart$;if(r===void 0){let s=a?.renderBefore??null;t._$litPart$=r=new we(e.insertBefore(xe(),s),s,void 0,a??{})}return r._$AI(i),r};var Tn=Object.keys(ae);function Mn(i,e,a,t){let r=i.getState(),s=a.label||"text"in a&&a.text||ae[a.kind],n=a.bind.type!=="none"?` \xB7 ${de[a.bind.type]}`:"",o=u=>l=>{l.stopPropagation(),i.getState().moveItem(e.id,a.id,u)};return g`<div class="ume-item-row ${t?"selected":""}"
    @click=${()=>i.getState().select(e.id,a.id)}>
    <span class="ume-item-icon">${ft[a.kind]}</span>
    <span class="ume-item-name" title=${s+n}>${s}${n}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(e.id,a.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(e.id,a.id)}}>✕</button>
  </div>`}function Cn(i,e){let a=i.getState();return g`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${t=>{let r=t.target.value;r&&a.addItem(r,e.id),t.target.value=""}}>
    <option value="">＋条目</option>
    ${Tn.map(t=>g`<option value=${t}>${ae[t]}</option>`)}
  </select>`}function jt(i,e){let{project:a,selection:t}=e.getState(),r=s=>{let n=e.getState(),o=t.pageId===s.id;return g`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),n.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),n.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),a.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&n.removePage(s.id)}}>✕</button>
      </div>
      ${o?g`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>Mn(e,s,u,t.itemId===u.id)):g`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Cn(e,s)}</div>
      </div>`:I}
    </div>`};z(g`
    <div class="ume-panel-title">
      页面 / 条目 (${a.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Pn(e)}>＋ 页面</button>
    </div>
    ${a.pages.map(r)}
  `,i)}function Pn(i){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${i.getState().project.pages.length+1}`);e!==null&&i.getState().addPage(e||void 0)}function F(i,e,a,t=""){return g`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${e??""} placeholder=${t}
      @change=${r=>a(r.target.value)} />
  </div>`}function P(i,e,a,t=1){return g`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(e)} step=${String(t)}
      @change=${r=>{let s=parseFloat(r.target.value);a(Number.isFinite(s)?s:0)}} />
  </div>`}function Y(i,e,a,t){return g`<div class="ume-field">
    <label>${i}</label>
    <select @change=${r=>t(r.target.value)}>
      ${a.map(r=>g`<option value=${r.value} ?selected=${r.value===e}>${r.label}</option>`)}
    </select>
  </div>`}function Ie(i,e,a){return g`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${t=>a(t.target.checked)} />
    <span>${i}</span>
  </div>`}function Dt(i,e,a,t=!1){return g`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${t?"font-family:Consolas,monospace":""}
      @change=${r=>a(r.target.value)}>${e??""}</textarea>
  </div>`}function ke(i,e,a="text/plain"){let t=new Blob([e],{type:`${a};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(t),r.download=i,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}var nt=null,Ut={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function at(i,e,a,t){let r=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...a.map(n=>({value:n.id,label:`${n.name} : ${Ut[n.type]??n.type}`}))],s=e?a.some(n=>n.id===e):!1;return g`
    ${Y(i,e??"",r,n=>t(n||null))}
    ${e&&!s?g`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:I}
    ${a.length===0?g`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:I}
  `}function rt(i,e){return g`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let a=i.getState().addVariable();e(a)}}>＋ 新建变量并绑定</button>
  </div>`}function it(i){return i?g`<div class="ume-hint">
    ${i.name} : ${Ut[i.type]??i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>`:g`${I}`}function Ft(i,e,a){let{project:t,selection:r}=e.getState(),s=t.pages.find(f=>f.id===r.pageId)??null,n=s?.items.find(f=>f.id===r.itemId)??null,o=t.variables??[],u=t.chartBuffers??[],l=(f,b)=>e.getState().updateItem(s.id,n.id,f,b),d=f=>l({bind:f}),c=g`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,p="";if(s&&!n)p="\u9875\u9762\u5C5E\u6027",c=g`
      ${F("\u540D\u79F0",s.name,f=>e.getState().updatePage(s.id,{name:f}))}
      ${F("C \u51FD\u6570\u540D",s.fnName,f=>e.getState().updatePage(s.id,{fnName:f}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&n){(n.bind.type==="value"||n.bind.type==="switch")&&n.bind.varId&&(nt=n.bind.varId),p=`${ae[n.kind]}${n.bind.type!=="none"?` + ${de[n.bind.type]}`:""}`;let f=g``;switch(n.kind){case"text":{let v=n,h=o.find(H=>H.id===v.displayVarId);f=g`
          ${F("\u6587\u672C/\u683C\u5F0F",v.text,H=>l({text:H},`text-${v.id}`))}
          ${Y("\u5927\u5C0F",String(v.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],H=>l({scale:Number(H)}))}
          ${n.bind.type==="none"?g`
            ${at("\u663E\u793A\u53D8\u91CF",v.displayVarId,o,H=>l({displayVarId:H}))}
            ${h?I:rt(e,H=>l({displayVarId:H.id}))}
            ${it(h)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:I}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{let v=n;f=g`
          ${n.bind.type==="none"?g`
            ${P("\u9759\u6001\u4F4D\u7F6E(%)",v.position,h=>l({position:Math.min(100,Math.max(0,Math.trunc(h)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:I}
        `;break}case"chart":{let v=n,h=N=>l({sources:N}),H=(N,O)=>{let q=u.find(K=>K.id===N.bufferId),te=N.min===void 0||N.max===void 0;return g`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${q?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[N.chartKind]??N.chartKind}${te?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${N.min}~${N.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>h(v.sources.filter((K,C)=>C!==O))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${Y("\u7F13\u51B2\u533A",N.bufferId,u.map(K=>({value:K.id,label:`${K.name} (${K.dataLen}\u70B9)`})),K=>h(v.sources.map((C,k)=>k===O?{...C,bufferId:K}:C)))}
              ${Y("\u7ED8\u5236",N.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],K=>h(v.sources.map((C,k)=>k===O?{...C,chartKind:K}:C)))}
              ${Ie("\u81EA\u52A8\u91CF\u7A0B",te,K=>h(v.sources.map((C,k)=>k===O?{...C,min:K?void 0:0,max:K?void 0:100}:C)))}
              ${te?I:g`
                ${P("\u91CF\u7A0B\u4E0A\u9650",N.max??100,K=>h(v.sources.map((C,k)=>k===O?{...C,max:K}:C)),"any")}
                ${P("\u91CF\u7A0B\u4E0B\u9650",N.min??0,K=>h(v.sources.map((C,k)=>k===O?{...C,min:K}:C)),"any")}`}
            </div>
          </div>`};f=g`
          ${P("\u9AD8\u5EA6(px)",v.height,N=>l({height:Math.max(4,Math.trunc(N))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(v.sources??[]).map(H)}
              ${(v.sources??[]).length===0?g`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:I}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(v.sources??[]).length>=4}
                @click=${()=>{if(!u.length){let N=e.getState().addChartBuffer();h([...v.sources??[],{bufferId:N.id,chartKind:"line"}]);return}h([...v.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(v.sources??[]).length>0?"\uFF08\u53E0\u52A0\uFF09":""}</button>
              ${u.length?I:g`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{let v=n;f=g`
          ${F("\u6570\u7EC4\u540D",v.name,h=>l({name:h}))}
          ${P("\u5BBD(px)",v.w,h=>l({w:Math.min(128,Math.max(1,Math.trunc(h)))}))}
          ${P("\u9AD8(px)",v.h,h=>l({h:Math.min(64,Math.max(1,Math.trunc(h)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>a.openXbmEditor(s.id,v.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${v.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let v=n;f=g`
          ${Dt("\u6587\u672C\u5185\u5BB9",v.content,h=>l({content:h}))}
          ${P("\u9AD8\u5EA6(px)",v.height,h=>l({height:Math.max(10,Math.trunc(h))}))}
          ${P("\u884C\u95F4\u8DDD",v.lineSpacing,h=>l({lineSpacing:Math.max(0,Math.trunc(h))}))}
          ${Ie("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",v.bindScroll,h=>l({bindScroll:h}))}
        `;break}case"board":{let v=n;f=g`
          ${P("\u5BBD(px)",v.w,h=>l({w:Math.max(1,Math.trunc(h))}))}
          ${P("\u9AD8(px)",v.h,h=>l({h:Math.max(1,Math.trunc(h))}))}
          ${F("\u56DE\u8C03\u51FD\u6570\u540D",v.cbName,h=>l({cbName:h}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}let b=n.bind,y=g``;switch(b.type){case"none":y=g`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{let v=o.find(h=>h.id===b.varId);y=g`
          ${at("\u53D8\u91CF",b.varId,o,h=>d({type:"value",varId:h}))}
          ${v?I:rt(e,h=>d({type:"value",varId:h.id}))}
          ${it(v)}
          ${n.kind==="text"?g`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:I}
        `;break}case"switch":{let v=o.filter(h=>h.type==="uint8").find(h=>h.id===b.varId)??o.find(h=>h.id===b.varId);y=g`
          ${at("\u53D8\u91CF (uint8)",b.varId,o.filter(h=>h.type==="uint8"),h=>d({type:"switch",varId:h,openValue:b.openValue,onText:b.onText,offText:b.offText}))}
          ${v?I:rt(e,h=>d({type:"switch",varId:h.id,openValue:b.openValue,onText:b.onText,offText:b.offText}))}
          ${it(v)}
          ${P("openValue",b.openValue,h=>d({type:"switch",varId:b.varId,openValue:Math.max(0,Math.trunc(h)),onText:b.onText,offText:b.offText}))}
          ${F('"\u5F00"\u6587\u672C',b.onText,h=>d({type:"switch",varId:b.varId,openValue:b.openValue,onText:h,offText:b.offText}))}
          ${F('"\u5173"\u6587\u672C',b.offText,h=>d({type:"switch",varId:b.varId,openValue:b.openValue,onText:b.onText,offText:h}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":y=g`
          ${F("\u56DE\u8C03\u51FD\u6570\u540D",b.cbName,v=>d({type:"button",cbName:v,buttonId:b.buttonId}))}
          ${P("ID",b.buttonId,v=>d({type:"button",cbName:b.cbName,buttonId:Math.max(0,Math.trunc(v))}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":y=g`
          ${Y("\u76EE\u6807\u9875\u9762",b.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...t.pages.filter(v=>v.id!==s.id).map(v=>({value:v.id,label:v.name}))],v=>d({type:"submenu",targetPageId:v||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":y=g`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}c=g`
      <div class="ume-panel-title">绘制</div>
      ${f}
      <div class="ume-panel-title">附加值</div>
      ${Y("\u7C7B\u578B",b.type,Object.keys(de).map(v=>({value:v,label:de[v]})),v=>{let h=n.bind;d(v==="value"?{type:"value",varId:h.type==="value"||h.type==="switch"?h.varId:nt}:v==="switch"?{type:"switch",varId:h.type==="value"||h.type==="switch"?h.varId:nt,openValue:1,onText:"on",offText:"off"}:v==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:v==="submenu"?{type:"submenu",targetPageId:h.type==="submenu"?h.targetPageId:null}:{type:"none"})})}
      ${y}
    `}z(g`
    ${p?g`<div class="ume-panel-title"><span class="ume-kind-badge">${p}</span></div>`:I}
    ${c}
  `,i)}var He=null,st=null,ot=null,Ot="",Nn=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function Vn(i,e,a){let t=e.variables??[],r=n=>{He=He===n?null:n,a()},s=n=>{let o=He===n.id,u=(f,b)=>i.getState().updateVariable(n.id,f,b),l=n.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(n.name),d=n.name&&!l&&!Pe(n.name),c=t.filter(f=>f.name===n.name).length>1,p=Bn(e,n.id);return g`<div class="ume-var-item ${o?"editing":""}">
      <div class="ume-var-row" @click=${()=>r(n.id)}>
        <span class="ume-var-name" title=${n.name}>${n.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${n.type} · ${n.min}~${n.max} · 步${n.step}${p?` \xB7 ${p} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${f=>{f.stopPropagation();let b=i.getState().removeVariable(n.id);b>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${b} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${o?g`<div class="ume-var-edit">
        ${F("\u53D8\u91CF\u540D",n.name,f=>u({name:f.trim()},`vn-${n.id}`))}
        ${l?g`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:I}
        ${d?g`<div class="ume-warn">变量名是 C 关键字，生成的代码会自动改名（如 ${n.name}_），建议换个名字</div>`:I}
        ${c?g`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:I}
        ${Y("\u7C7B\u578B",n.type,Nn,f=>u({type:f}))}
        ${P("\u521D\u59CB\u503C",n.initialValue,f=>u({initialValue:f},`vi-${n.id}`),"any")}
        ${P("\u6700\u5C0F\u503C",n.min,f=>u({min:f},`vmin-${n.id}`),"any")}
        ${P("\u6700\u5927\u503C",n.max,f=>u({max:f},`vmax-${n.id}`),"any")}
        ${P("\u6B65\u957F",n.step,f=>u({step:f},`vs-${n.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:I}
    </div>`};return g`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{He=i.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(s):g`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function Bn(i,e){let a=0;for(let t of i.pages)for(let r of t.items)"varId"in r&&r.varId===e&&a++;return a}function Ln(i,e,a){let t=e.chartBuffers??[],r=n=>{let o=0;for(let u of e.pages)for(let l of u.items)l.kind==="chart"&&l.sources.some(d=>d.bufferId===n)&&o++;return o},s=n=>{let o=st===n.id,u=(p,f)=>i.getState().updateChartBuffer(n.id,p,f),l=n.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(n.name),d=n.name&&!l&&!Pe(n.name),c=r(n.id);return g`<div class="ume-var-item ${o?"editing":""}">
      <div class="ume-var-row" @click=${()=>{st=o?null:n.id,a()}}>
        <span class="ume-var-name" title=${n.name}>${n.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${n.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[n.sample]}${c?` \xB7 ${c} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${p=>{p.stopPropagation();let f=i.getState().removeChartBuffer(n.id);f>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${f} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${o?g`<div class="ume-var-edit">
        ${F("\u6570\u7EC4\u540D",n.name,p=>u({name:p.trim()},`bn-${n.id}`))}
        ${l?g`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:I}
        ${d?g`<div class="ume-warn">数组名是 C 关键字，生成的代码会自动改名（如 ${n.name}_），建议换个名字</div>`:I}
        ${P("\u70B9\u6570",n.dataLen,p=>u({dataLen:Math.min(512,Math.max(2,Math.trunc(p)))},`bl-${n.id}`))}
        ${Y("\u793A\u4F8B\u586B\u5145",n.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],p=>u({sample:p}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:I}
    </div>`};return g`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{st=i.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(s):g`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Rn(i,e,a){let t=xt(e),r=(n,o)=>{let u=o.trim();!u||u===n||(i.getState().update(l=>{for(let d of l.pages)for(let c of d.items)c.bind.type==="button"&&c.bind.cbName===n&&(c.bind.cbName=u),c.kind==="board"&&c.cbName===n&&(c.cbName=u)},`cbname-${Ot}`),ot=u)},s=n=>{let o=ot===n.name,u=n.asButton&&n.asBoard?"\u6309\u94AE+\u753B\u677F":n.asButton?"\u6309\u94AE":"\u753B\u677F",l=n.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(n.name),d=n.name&&!l&&!Pe(n.name);return g`<div class="ume-var-item ${o?"editing":""}">
      <div class="ume-var-row" @click=${()=>{ot=o?null:n.name,Ot=n.name,a()}}>
        <span class="ume-var-name" title=${n.name}>${n.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${u} · ${n.refs.length} 处引用</span>
      </div>
      ${o?g`<div class="ume-var-edit">
        ${F("\u56DE\u8C03\u51FD\u6570\u540D",n.name,c=>r(n.name,c))}
        ${l?g`<div class="ume-warn">回调名不是合法的 C 标识符，生成时会自动清洗</div>`:I}
        ${d?g`<div class="ume-warn">回调名是 C 关键字，生成的代码会自动改名（如 ${n.name}_），建议换个名字</div>`:I}
        ${n.asButton?g`<div class="ume-hint">按钮签名：void ${n.name}(u8g2_menu_t *menu, uint8_t ID) —— 选中该条目时任意按键触发</div>`:I}
        ${n.asBoard?g`<div class="ume-hint">画板签名：void ${n.name}(u8g2_t *u8g2) —— 在指定宽高内用 u8g2 画图</div>`:I}
        <div class="ume-hint">回调逻辑写在生成的 menu_pages.c 的 cb_${Z(n.name)} USER CODE 区内（重新生成保留）</div>
        <div class="ume-hint">引用此回调的条目（点击定位到属性面板）：</div>
        ${n.refs.map(c=>g`<div class="ume-cb-ref" title="点击定位"
          @click=${()=>i.getState().select(c.pageId,c.itemId)}>${c.pageName} / ${c.label}</div>`)}
      </div>`:I}
    </div>`};return g`
    <div class="ume-panel-title">回调函数 (${t.length})</div>
    ${t.length?t.map(s):g`<div class="ume-empty-hint">
      按钮附加值与画板条目的回调函数会自动收集到这里：
      统一改名、查看 C 签名、点击引用定位到条目。
    </div>`}
  `}function ut(i,e){let{project:a}=e.getState(),t=()=>ut(i,e);z(g`
    ${Vn(e,a,t)}
    ${Ln(e,a,t)}
    ${Rn(e,a,t)}
  `,i)}function zt(i,e){let{project:a}=e.getState(),t=(o,u)=>e.getState().update(l=>{Object.assign(l,o)},u),r=a.weakHooks??[],s=(o,u)=>{e.getState().update(l=>{let d=l.weakHooks??[];l.weakHooks=u?[...new Set([...d,o])]:d.filter(c=>c!==o)})},n=g`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${r.length}/${Q.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${Q.map(o=>g`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote?"\uFF08\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u5904\u7406 / 0 = \u4EA4\u7ED9\u5E93\uFF09":""}`}>
              <input type="checkbox" ?checked=${r.includes(o.fn)}
                @change=${u=>s(o.fn,u.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;z(g`
    <div class="ume-panel-title">工程</div>
    ${F("\u5DE5\u7A0B\u540D",a.name,o=>t({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${a.width}×${a.height}
        ${a.width!==128||a.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${Y("\u5B57\u4F53",a.font,De.map(o=>({value:o.id,label:o.label})),o=>t({font:o}))}
    ${Ie("\u4E2D\u6587\u73B0\u573A\u53D6\u6A21\uFF08\u4EC5\u5305\u542B\u7528\u5230\u7684\u5B57\u5F62\uFF09",a.fontSubset,o=>t({fontSubset:o}))}
    ${a.fontSubset?g`
      ${F("\u989D\u5916\u5305\u542B\u5B57\u7B26",a.fontExtra,o=>t({fontExtra:o}))}
      ${(()=>{let o=Ve(me(a,a.fontExtra));return g`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:I}
    ${Y("\u9009\u62E9\u5668",a.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],o=>t({selector:o}))}
    ${P("\u5DE6\u8FB9\u8DDD",a.selectorLeftMargin,o=>t({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u9876\u8FB9\u8DDD",a.selectorTopMargin,o=>t({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u884C\u95F4\u8DDD",a.selectorLineSpacing,o=>t({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${P("\u8DD1\u9A6C\u706F\u901F\u5EA6",a.marqueeSpeed,o=>t({marqueeSpeed:Math.max(0,o)}),.05)}
    ${P("\u8DD1\u9A6C\u706F\u505C\u7559",a.marqueeHeaderLen,o=>t({marqueeHeaderLen:Math.max(0,o)}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${n}
  `,i)}function qt(i,e){let a=r=>{let s,n=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),e.key(r),n(),s=window.setInterval(()=>e.key(r),180)},up:n}},t=(r,s,n)=>{let o=a(r);return g`<button class="ume-key" title=${n}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};z(g`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${r=>{let n={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[r.key];n!==void 0&&(r.preventDefault(),e.key(n))}}>
      ${e.canvas}
    </div>
    <div class="ume-keybar">
      ${t(1,"\u25B2","\u4E0A MENU_Key_Up")}
      ${t(2,"\u25BC","\u4E0B MENU_Key_Down")}
      ${t(3,"OK","\u786E\u8BA4 MENU_Key_Enter")}
      ${t(4,"\u232B","\u8FD4\u56DE MENU_Key_Return")}
      ${t(5,"\uFF0B","\u52A0 MENU_Key_Add")}
      ${t(6,"\uFF0D","\u51CF MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,i)}function Xt(i,e){i.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove());let a=document.createElement("div");a.className="ume-modal-mask",a.addEventListener("click",t=>{t.target===a&&Wt(a)}),z(g`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Wt(a)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${e.warnings.length?g`
          <div style="margin-bottom:8px">
            ${e.warnings.map(t=>g`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:I}
        <div class="ume-code-view">${e.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(e.c).then(()=>Hn(a,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{ke("menu_pages.c",e.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,a),i.appendChild(a)}function Wt(i){i.remove()}function Hn(i,e){let a=i.closest(".ume")??document.body,t=a.querySelector(".ume-toast");t||(t=document.createElement("div"),t.className="ume-toast",a.appendChild(t)),t.textContent=e,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),1600)}function Yt(i,e,a,t){let n=e.getState().project.pages.find(k=>k.id===a)?.items.find(k=>k.id===t);if(!n||n.kind!=="xbm")return;let o=n,u=o.w,l=o.h,d=[...o.bits],c=()=>Math.ceil(u/8),p=document.createElement("div");p.className="ume-modal-mask",p.addEventListener("click",k=>{k.target===p&&C()});let f=(k,V)=>{let D=V*c()+(k>>3);return D<d.length?!!(d[D]>>(k&7)&1):!1},b=(k,V,D)=>{let ne=V*c()+(k>>3);d[ne]=D?d[ne]|1<<(k&7):d[ne]&~(1<<(k&7))},y=(k,V)=>{let D=Math.ceil(u/8),ne=Math.ceil(k/8),Se=new Array(ne*V).fill(0);for(let $=0;$<Math.min(l,V);$++)for(let J=0;J<Math.min(u,k);J++){let Ke=$*D+(J>>3);Ke<d.length&&d[Ke]>>(J&7)&1&&(Se[$*ne+(J>>3)]|=1<<(J&7))}u=k,l=V,d=Se},v=!1,h=!0,H=(k,V)=>D=>{D.preventDefault(),v=!0,h=!f(k,V),b(k,V,h),q()},N=(k,V)=>()=>{v&&(b(k,V,h),q())},O=()=>{v=!1},q=()=>{z(K(),p)},te=()=>{let k=[];for(let V=0;V<l;V++)for(let D=0;D<u;D++)k.push(g`<button class="ume-xbm-cell ${f(D,V)?"on":""}"
          data-x=${D} data-y=${V}
          @pointerdown=${H(D,V)}
          @pointerenter=${N(D,V)}></button>`);return k},K=()=>g`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${l}</span></span>
        <button class="ume-mini" @click=${C}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${O}
        @pointerleave=${O}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${k=>{y(Zt(+k.target.value,1,128),l),q()}} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${k=>{y(u,Zt(+k.target.value,1,64)),q()}} />
          <button class="ume-btn sm" @click=${()=>{d=d.map(()=>0),q()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{d=d.map(k=>~k&255),q()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${te()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${C}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(a,t,{w:u,h:l,bits:[...d]}),C()}}>应用</button>
      </div>
    </div>
  `;function C(){p.remove(),document.removeEventListener("pointerup",O)}document.addEventListener("pointerup",O),q(),i.appendChild(p)}function Zt(i,e,a){return Number.isFinite(i)?Math.min(a,Math.max(e,Math.trunc(i))):e}var Kn="prebuilt/u8g2-menu-preview.js",lt=class{constructor(e,a={}){this.store=$t();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;this.activateRightTab=()=>{};if(this.container=e,this.opts={persistKey:"default",...a},e.classList.add("ume"),!document.getElementById("ume-style")){let p=document.createElement("style");p.id="ume-style",p.textContent=ct,document.head.appendChild(p)}let t=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??t??void 0;if(r!==void 0)try{this.store.setState({project:Me(r)})}catch(p){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",p)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),e.innerHTML=`
      <div class="ume-toolbar">
        <span class="ume-title">\u2B12 u8g2_menu \u7F16\u8F91\u5668</span>
        <button class="ume-btn sm" data-act="add-page">\uFF0B\u9875\u9762</button>
        <button class="ume-btn sm" data-act="undo">\u64A4\u9500</button>
        <button class="ume-btn sm" data-act="redo">\u91CD\u505A</button>
        <span class="ume-sep"></span>
        <button class="ume-btn sm" data-act="import">\u5BFC\u5165 JSON</button>
        <button class="ume-btn sm" data-act="export-json">\u5BFC\u51FA JSON</button>
        <span class="ume-spacer"></span>
        <button class="ume-btn primary sm" data-act="generate">\u26A1 \u751F\u6210 C \u4EE3\u7801</button>
      </div>
      <div class="ume-main">
        <div class="ume-left"></div>
        <div class="ume-center"></div>
        <div class="ume-right">
          <div class="ume-tabs">
            <button data-tab="prop" class="active">\u5C5E\u6027</button>
            <button data-tab="res">\u8D44\u6E90</button>
            <button data-tab="set">\u8BBE\u7F6E</button>
          </div>
          <div data-role="prop"></div>
          <div data-role="res" style="display:none"></div>
          <div data-role="set" style="display:none"></div>
        </div>
      </div>
      <input type="file" accept=".json,application/json" style="display:none" data-role="file">
    `;let n=p=>e.querySelector(p);this.els={left:n(".ume-left"),center:n(".ume-center"),right:n(".ume-right"),propEl:n('[data-role="prop"]'),resEl:n('[data-role="res"]'),setEl:n('[data-role="set"]'),toolbarUndo:n('[data-act="undo"]'),toolbarRedo:n('[data-act="redo"]')};let o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new Be(o,{onPageChanged:p=>this.onPreviewPageChanged(p)});let u=document.createElement("div");this.els.center.appendChild(u),qt(u,this.preview),this.preview.load(this.opts.wasmUrl??Kn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(p=>{console.error(p);let f=document.createElement("div");f.className="ume-warn",f.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${p.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(f)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let p=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);p!==null&&this.store.getState().addPage(p||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{ke(`${this.store.getState().project.name||"menu-project"}.json`,qe(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{n('[data-role="file"]').click()}),n('[data-role="file"]').addEventListener("change",p=>{let f=p.target.files?.[0];f&&(f.text().then(b=>{try{let y=Me(b);this.store.getState().update(v=>{Object.assign(v,y)}),this.scheduleRender()}catch(y){alert(`\u5BFC\u5165\u5931\u8D25: ${y.message}`)}}),p.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate());let l=e.querySelectorAll(".ume-tabs button"),d=p=>{l.forEach(f=>f.classList.toggle("active",f.dataset.tab===p)),this.els.propEl.style.display=p==="prop"?"":"none",this.els.resEl.style.display=p==="res"?"":"none",this.els.setEl.style.display=p==="set"?"":"none"};l.forEach(p=>{p.addEventListener("click",()=>d(p.dataset.tab??"prop"))}),this.activateRightTab=d,this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null);let c=null;this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange();let p=this.store.getState().selection.itemId;p&&p!==c&&this.activateRightTab("prop"),c=p}),this.scheduleRender(),this.persist(),this.liveTimer=window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let a=Me(e);this.store.getState().update(t=>{Object.assign(t,a)}),this.store.getState().select(a.pages[0]?.id??null,null)}generate(){let e=this.produceCode();return Xt(this.container,e),this.opts.onExport?.(e),e}downloadC(){let e=this.produceCode();ke("menu_pages.c",e.c)}produceCode(){let e=this.lastExport,a=this.store.getState().project,t,r=[];if(a.fontSubset){if(!this.preview.ready)r.push("\u73B0\u573A\u53D6\u6A21\u9700\u8981\u9884\u89C8\u5F15\u64CE\uFF0C\u5F53\u524D\u5F15\u64CE\u4E0D\u53EF\u7528\uFF1A\u672C\u6B21\u672A\u751F\u6210 menu_font\uFF0C\u4EE3\u7801\u5C06\u5F15\u7528\u5185\u7F6E\u5B57\u4F53");else{let o=me(a,a.fontExtra),u=this.buildFontSubset(a,o);if("error"in u)r.push(`${u.error}\uFF0C\u672C\u6B21\u6309\u5185\u7F6E\u5B57\u4F53\u751F\u6210`);else{t=u.result.font;let l=Ve(o);if(r.push(`\u73B0\u573A\u53D6\u6A21\uFF1A\u6536\u5F55 ${l.total} \u4E2A\u5B57\u7B26\uFF08ASCII ${l.ascii} + \u6269\u5C55 ${l.cjk}\uFF09\uFF0C\u5B57\u4F53\u6570\u7EC4 ${u.result.font.length} \u5B57\u8282\u3002\u8FD0\u884C\u65F6\u82E5\u8F93\u51FA\u8D85\u51FA\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u91CC\u8865\u5145\u989D\u5916\u5B57\u7B26`),u.result.included>255&&r.push(`\u5B50\u96C6\u5B57\u5F62\u6570 ${u.result.included} \u8D85\u8FC7 255\uFF1A\u5B57\u4F53\u5934 glyph_cnt \u5B57\u6BB5\u5C06\u56DE\u7ED5\uFF08\u8BB0\u5F55\u4E3A ${u.result.included&255}\uFF09\uFF0C\u5982\u9047\u6E32\u67D3\u5F02\u5E38\u8BF7\u5728"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u7CBE\u7B80`),u.result.missing.length){let d=u.result.missing.slice(0,5).map(c=>String.fromCodePoint(c)).join(" ");r.push(`\u5B57\u7B26\u96C6\u4E2D ${u.result.missing.length} \u4E2A\u5B57\u7B26\u672A\u5728\u6E90\u5B57\u4F53\u4E2D\u627E\u5230\uFF08\u5982 ${d}\uFF09\uFF0C\u8FD0\u884C\u65F6\u8FD9\u4E9B\u5B57\u7B26\u65E0\u6CD5\u663E\u793A`)}}}let n=this.preview.fontApplyWarning;n&&r.push(n)}let s=kt(a,e??void 0,t);return s.warnings.unshift(...r),this.lastExport={c:s.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,s.c),s}buildFontSubset(e,a){let t=this.preview.fontIndex(e.font),r=this.preview.getFontBytes(t),s=this.preview.glyphFetcher(t);if(!r||!s)return{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u65E0\u6CD5\u8BFB\u53D6\u6E90\u5B57\u4F53\u6570\u636E"};let n=Ne(r,a,s);return n?{result:n}:{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u5B57\u7B26\u96C6\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62"}}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.liveTimer!==void 0&&window.clearInterval(this.liveTimer),clearTimeout(this.saveTimer),clearTimeout(this.changeTimer),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let a=e.target;a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let a=this.store.getState().project.pages[e];a&&this.store.getState().select(a.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,qe(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();jt(this.els.left,this.store),zt(this.els.setEl,this.store),ut(this.els.resEl,this.store),Ft(this.els.propEl,this.store,{openXbmEditor:(a,t)=>Yt(this.container,this.store,a,t)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),a=document.getElementById("ume-page-jump"),t=this.store.getState(),r=this.store.getState().project.pages.findIndex(s=>s.id===t.selection.pageId);if(a){let s=t.project.pages,n=s.map(u=>u.name).join("|");a.dataset.sig!==n&&(a.dataset.sig=n,a.innerHTML="",s.forEach((u,l)=>{let d=document.createElement("option");d.value=String(l),d.textContent=`${l+1}. ${u.name}`,a.appendChild(d)}),a.onchange=()=>{let u=parseInt(a.value,10);Number.isFinite(u)&&this.preview.navTo(u)});let o=this.preview.currentPage;document.activeElement!==a&&a.value!==String(o)&&(a.value=String(o))}if(e&&r>=0&&t.selection.itemId){let s=t.project.pages[r],n=s.items.findIndex(p=>p.id===t.selection.itemId),o=s.items[n],u=o?.bind,l=u?.type==="value"||u?.type==="switch"?u.varId:null,d=o?.kind==="text"&&u?.type==="none"?o.displayVarId:null,c=l??d;if(o&&c){let p=(t.project.variables??[]).findIndex(h=>h.id===c),f=p>=0?p:r*At+n,y=u?.type==="switch"?this.preview.getSwitch(f):this.preview.getInt(f),v=(t.project.variables??[]).find(h=>h.id===c)?.name;e.textContent=`${v??o.kind} = ${y}`}else e.textContent=""}}};return an(jn);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
