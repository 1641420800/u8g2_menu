"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const Ke=require("zustand/vanilla"),f=require("lit-html"),Ue=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`;let pe=0;function O(i){return pe=(pe+1)%1e9,`${i}_${Date.now().toString(36)}_${pe.toString(36)}`}function ce(i){return{id:O("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...i}}function Ce(i){return{id:O("buf"),name:"buf_new",dataLen:32,sample:"sine",...i}}function je(i,t){const e=new Set(i.map(r=>r.name));if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`}function Fe(i,t){const e=new Set(i.map(r=>r.name));if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`}function H(i){const t={id:O("it"),label:"",bind:{type:"none"}};switch(i){case"text":return{...t,kind:i,text:"菜单项",scale:1,displayVarId:null};case"slider":return{...t,kind:i,position:50};case"progress":return{...t,kind:i,position:50};case"chart":return{...t,kind:i,sources:[],height:32};case"xbm":return ze(16,16);case"textarea":return{...t,kind:i,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...t,kind:i,w:64,h:32,cbName:"board_cb"}}}function ze(i,t){const e=Math.ceil(i/8);return{id:O("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:i,h:t,bits:new Array(e*t).fill(0)}}function fe(i){return{id:O("pg"),name:i,fnName:"",items:[],userCodePre:""}}function ue(i,t){return{...i,...t}}function J(i,t){return{...i,...t}}function Oe(){const i=[ce({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),ce({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),ce({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],t=[Ce({name:"buf_demo",dataLen:32,sample:"sine"})],e=fe("主页");e.items=[ue(H("text"),{text:"u8g2_menu"}),J(H("text"),{text:"系统设置",bind:{type:"submenu",targetPageId:null}}),J(H("text"),{text:"关于",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];const n=fe("设置");n.items=[J(ue(H("text"),{text:"音量:%d"}),{bind:{type:"value",varId:i[0].id}}),J(ue(H("text"),{text:"开关:%s"}),{bind:{type:"switch",varId:i[1].id,openValue:1,onText:"on",offText:"off"}}),J(H("slider"),{bind:{type:"value",varId:i[2].id}}),J(H("text"),{text:"图表",bind:{type:"submenu",targetPageId:null}}),J(H("text"),{text:"返回",bind:{type:"back"}})];const r=fe("图表");r.items=[ue(H("chart"),{height:36,sources:[{bufferId:t[0].id,chartKind:"line"}]}),J(H("text"),{text:"返回",bind:{type:"back"}})];const s={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:i,chartBuffers:t,pages:[e,n,r]};return e.items[1].bind.targetPageId=n.id,n.items[3].bind.targetPageId=r.id,s}function Re(i){return structuredClone(i)}const qe=800;function Te(){let i=null,t=0;return Ke.createStore()((e,n)=>({project:Oe(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{const a=Date.now(),o=!!s&&s===i&&a-t<qe;i=s??null,t=a,e(u=>{const c=Re(u.project);return r(c),{project:c,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{e(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{e(r=>{if(!r.future.length)return r;const[s,...a]=r.future;return{project:s,past:[...r.past,r.project],future:a,dirty:!0}})},select:(r,s=null)=>e({selection:{pageId:r,itemId:s}}),addPage:r=>{const s={id:O("pg"),name:r??`页面${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(a=>{a.pages.push(s)}),e({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{n().update(a=>{a.pages=a.pages.filter(o=>o.id!==r);for(const o of a.pages)for(const u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});const{selection:s}=n();s.pageId===r&&e({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{n().update(a=>{const o=a.pages.findIndex(c=>c.id===r),u=o+s;o<0||u<0||u>=a.pages.length||([a.pages[o],a.pages[u]]=[a.pages[u],a.pages[o]])})},updatePage:(r,s)=>{n().update(a=>{const o=a.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{var u;const a=s??n().selection.pageId??((u=n().project.pages[0])==null?void 0:u.id);if(!a)return null;const o=He(r);return n().update(c=>{const l=c.pages.find(p=>p.id===a);l==null||l.items.push(o)}),e({selection:{pageId:a,itemId:o.id}}),o},removeItem:(r,s)=>{n().update(o=>{const u=o.pages.find(c=>c.id===r);u&&(u.items=u.items.filter(c=>c.id!==s))});const{selection:a}=n();a.itemId===s&&e({selection:{pageId:r,itemId:null}})},moveItem:(r,s,a)=>{n().update(o=>{const u=o.pages.find(p=>p.id===r);if(!u)return;const c=u.items.findIndex(p=>p.id===s),l=c+a;c<0||l<0||l>=u.items.length||([u.items[c],u.items[l]]=[u.items[l],u.items[c]])})},duplicateItem:(r,s)=>{let a=null;n().update(o=>{const u=o.pages.find(l=>l.id===r);if(!u)return;const c=u.items.findIndex(l=>l.id===s);c<0||(a=structuredClone(u.items[c]),a.id=O("it"),u.items.splice(c+1,0,a))}),a&&e({selection:{pageId:r,itemId:a.id}})},updateItem:(r,s,a,o)=>{n().update(u=>{const c=u.pages.find(p=>p.id===r),l=c==null?void 0:c.items.find(p=>p.id===s);l&&Object.assign(l,a)},o)},addVariable:r=>{let s=null;return n().update(a=>{a.variables=a.variables??[];const o=Fe(a.variables,(r==null?void 0:r.name)??"var_new");s=ce({...r,name:o}),a.variables.push(s)}),s},removeVariable:r=>{let s=0;for(const a of n().project.pages)for(const o of a.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(n().update(a=>{a.variables=(a.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,a)=>{n().update(o=>{const u=(o.variables??[]).find(c=>c.id===r);u&&Object.assign(u,s)},a)},addChartBuffer:r=>{let s=null;return n().update(a=>{a.chartBuffers=a.chartBuffers??[];const o=je(a.chartBuffers,(r==null?void 0:r.name)??"buf_new");s=Ce({...r,name:o}),a.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(const a of n().project.pages)for(const o of a.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(n().update(a=>{a.chartBuffers=(a.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,a)=>{n().update(o=>{const u=(o.chartBuffers??[]).find(c=>c.id===r);u&&Object.assign(u,s)},a)}}))}Te();function He(i){return H(i)}const he=1,ne=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],me={text:"文本",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},Xe={text:"T",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},de={none:"无",value:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回"},Ze=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class te extends Error{}const Ne=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),Ae=new Set(["line","point","bar"]),Ve=new Set(["sine","ramp","noise","none"]);function ae(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function P(i,t){return typeof i=="string"?i:t}function E(i,t){return typeof i=="number"&&Number.isFinite(i)?i:t}const Ye=["text","slider","progress","chart","xbm","textarea","board"],Ge=["number","switch","button","submenu","back"],Je=["none","value","switch","button","submenu","back"];function We(i){if(!ae(i))throw new te("条目格式错误");const t=P(i.kind,"");if(!(Ye.includes(t)||Ge.includes(t)))throw new te(`未知条目类型: ${String(t)}`);const e=structuredClone(i);switch(e.id=P(i.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=P(i.label,""),t){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=P(i.text,""),e.scale=i.scale===2?2:1;break}return e}function Qe(i){for(const t of i)for(const e of t.items){const n=e;if(!(n.bind&&ae(n.bind)&&Je.includes(P(n.bind.type,"none")))){switch(n.kind){case"number":{const r=n.varId??null;n.editable===!1?(n.kind="text",n.displayVarId=r,n.bind={type:"none"}):(n.kind="text",n.displayVarId=null,n.bind={type:"value",varId:r});break}case"switch":n.kind="text",n.displayVarId=null,n.bind={type:"switch",varId:n.varId??null,openValue:E(n.openValue,1),onText:P(n.onText,"on"),offText:P(n.offText,"off")};break;case"button":n.kind="text",n.displayVarId=null,n.bind={type:"button",cbName:P(n.cbName,"btn_cb"),buttonId:E(n.buttonId,1)};break;case"submenu":n.kind="text",n.displayVarId=null,n.bind={type:"submenu",targetPageId:n.targetPageId??null};break;case"back":n.kind="text",n.displayVarId=null,n.bind={type:"back"};break;case"slider":case"progress":n.bind=n.varId?{type:"value",varId:n.varId}:{type:"none"},n.position===void 0&&(n.position=50);break;default:n.bind={type:"none"},n.kind==="text"&&n.displayVarId===void 0&&(n.displayVarId=null);break}delete n.varId,delete n.varName,delete n.varType,delete n.editable,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals,n.kind!=="board"&&(delete n.cbName,delete n.buttonId),delete n.openValue,delete n.onText,delete n.offText,delete n.targetPageId}}}function et(i){if(!ae(i))throw new te("页面格式错误");const t=Array.isArray(i.items)?i.items.map(We):[];return{id:P(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:P(i.name,"未命名页面"),fnName:P(i.fnName,""),items:t,userCodePre:P(i.userCodePre,"")}}function tt(i){if(!ae(i))return null;const t=P(i.type,"int32");return{id:P(i.id,"")||O("vb"),name:P(i.name,""),type:Ne.has(t)?t:"int32",initialValue:E(i.initialValue,0),min:E(i.min,0),max:E(i.max,100),step:E(i.step,1)}}function nt(i){if(!ae(i))return null;const t=P(i.sample,"sine");return{id:P(i.id,"")||O("buf"),name:P(i.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(E(i.dataLen,32)))),sample:Ve.has(t)?t:"sine"}}function at(i){const t=new Map,e=[],n=(r,s)=>{let a=t.get(r);return a||(a=s(),t.set(r,a),e.push(a)),a};for(const r of i)for(const s of r.items){const a=s;switch(s.kind){case"number":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",c=n(u,()=>({id:O("vb"),name:u,type:Ne.has(String(a.varType))?String(a.varType):"int32",initialValue:E(a.initialValue,0),min:E(a.min,0),max:E(a.max,100),step:E(a.step,1)}));s.varId=c.id}a.editable===void 0&&(s.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",c=n(u,()=>({id:O("vb"),name:u,type:"int",initialValue:E(a.initialValue,0),min:E(a.min,0),max:E(a.max,100),step:E(a.step,1)}));s.varId=c.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",c=n(u,()=>({id:O("vb"),name:u,type:"uint8",initialValue:E(a.initialValue,0),min:0,max:1,step:1}));s.varId=c.id}delete a.varName,delete a.initialValue;break}}return e}function be(i){let t;if(typeof i=="string")try{t=JSON.parse(i)}catch{throw new te("JSON 解析失败")}else t=i;if(!ae(t))throw new te("不是有效的工程文件");const e=t,n=E(e.version,0);if(n>he)throw new te(`工程版本 v${n} 高于当前支持的 v${he}，请升级编辑器`);const r=Array.isArray(e.pages)?e.pages.map(et):[];if(!r.length)throw new te("工程至少需要一个页面");const s=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity",a=new Set(ne.map(l=>l.fn)),o=Array.isArray(e.weakHooks)?[...new Set(e.weakHooks.filter(l=>typeof l=="string"&&a.has(l)))]:[];let u;Array.isArray(e.variables)?u=e.variables.map(tt).filter(l=>!!l):u=at(r);let c;return Array.isArray(e.chartBuffers)?c=e.chartBuffers.map(nt).filter(l=>!!l):c=it(r),Qe(r),st(r,c),{version:he,name:P(e.name,"未命名工程"),width:E(e.width,128),height:E(e.height,64),font:P(e.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:E(e.selectorLeftMargin,16),selectorTopMargin:E(e.selectorTopMargin,0),selectorLineSpacing:E(e.selectorLineSpacing,0),marqueeSpeed:E(e.marqueeSpeed,.2),marqueeHeaderLen:E(e.marqueeHeaderLen,5),weakHooks:o,fontSubset:t.fontSubset===!0,fontExtra:P(t.fontExtra,""),variables:u,chartBuffers:c,pages:r}}function it(i){const t=[];let e=0;const n=()=>{const r={id:O("buf"),name:`buf_chart_${++e}`,dataLen:32,sample:"sine"};return t.push(r),r};for(const r of i)for(const s of r.items){if(s.kind!=="chart")continue;const a=s;if(Array.isArray(a.sources))continue;const o=n();o.dataLen=Math.min(512,Math.max(2,Math.trunc(E(a.dataLen,32))));const u=P(a.sample,"sine");Ve.has(u)&&(o.sample=u);const c=P(a.chartKind,"line"),l={bufferId:o.id,chartKind:Ae.has(c)?c:"line"};a.max!==void 0&&a.max!==null&&(l.max=E(a.max,0)),a.min!==void 0&&a.min!==null&&(l.min=E(a.min,0)),s.sources=[l],a.height===void 0&&(s.height=32),delete a.chartKind,delete a.dataLen,delete a.sample,delete a.max,delete a.min}return t}function st(i,t){const e=new Set(t.map(n=>n.id));for(const n of i)for(const r of n.items){if(r.kind!=="chart")continue;const s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(a=>e.has(a.bufferId)).map(a=>({bufferId:a.bufferId,chartKind:Ae.has(a.chartKind)?a.chartKind:"line",min:a.min,max:a.max})),typeof s.height!="number"&&(s.height=32)}}function Ie(i){return JSON.stringify(i,null,2)}const rt={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function G(i,t="anon"){let e=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||t}function ie(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function W(i){if(!Number.isFinite(i))return"0.0f";const t=i.toString();return/[-.]|e/i.test(t)?`${t}f`:`${t}.0f`}function ot(i,t,e){return e==="ramp"?`${i}[i] = (float)i;`:e==="noise"?`${i}[i] = (float)((i * 37) % ${t});`:`${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function ut(i){const t=new Map;if(!i)return t;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let n;for(;(n=e.exec(i))!==null;)t.set(n[1],n[2]);return t}function q(i,t,e){const n=t.has(i)?t.get(i):"";return`${e}/* USER CODE BEGIN ${i} */${n}${e}/* USER CODE END ${i} */`}const lt=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function Se(i,t,e){const n=[],r=ut((t==null?void 0:t.c)??""),s=i.pages.map((d,y)=>d.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.fnName)?d.fnName:`page_${y}`),a=new Map,o=new Map;for(const d of i.variables??[]){if(!d.name){n.push("存在未命名变量，已跳过");continue}if(a.has(d.name)){n.push(`变量名 "${d.name}" 重复，以第一个为准`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.name)||n.push(`变量名 "${d.name}" 不是合法的 C 标识符，已清洗为 "${G(d.name)}"`);const y=G(d.name,"var"),g=d.type==="float"||d.type==="double",I={name:y,srcType:d.type,type:rt[d.type],init:g?W(d.initialValue):String(Math.trunc(d.initialValue)),isFloat:g,step:d.step,min:d.min,max:d.max};a.set(y,I),o.set(d.id,I)}const u=new Map,c=new Set,l=[],p=new Map;for(const d of i.chartBuffers??[]){if(!d.name){n.push("存在未命名数据源缓冲区，已跳过");continue}const y=G(d.name,"buf");if([...p.values()].some(j=>j.name===y)){n.push(`缓冲区名 "${d.name}" 与其它缓冲区重名，已跳过`);continue}const g=Math.max(2,Math.trunc(d.dataLen)),I=`${y.toUpperCase()}_LEN`;p.set(d.id,{name:y,lenMacro:I,len:g});const T=`fill_${y}`,D=(r.get(T)??"").trim()!=="";l.push(`#define ${I} ${g}`,`static float ${y}[${I}];`,`static uint8_t ${y}_filled = 0;`,`static void ${y}_fill(void)`,"{",q(T,r,"    "),...d.sample!=="none"&&!D?[`    for (uint16_t i = 0; i < ${I}; ++i) { ${ot(y,g,d.sample)} }`]:[],"}")}const $=[],m=new Map,x=new Map,w=new Map;{let d=0,y=0;const g=I=>{const T=p.get(I);return T?(w.has(I)||w.set(I,`        if (!${T.name}_filled) { ${T.name}_filled = 1; ${T.name}_fill(); }`),w.get(I)):""};for(const I of i.pages)for(const T of I.items){if(T.kind!=="chart")continue;const D=T.sources.filter(N=>p.has(N.bufferId));if(T.sources.length&&!D.length){n.push(`页面 ${I.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);continue}if(!D.length){n.push(`页面 ${I.name} 的图表条目未绑定数据源，已跳过`);continue}const j=Math.max(4,Math.trunc(T.height)),X=[];for(const N of D){const L=p.get(N.bufferId),_=`chart${d++}`;$.push(`static float ${_}_dis[${L.lenMacro}];`,`static u8g2_chart_t ${_};`),X.push({name:_,s:N,b:L})}if(X.length===1){const{name:N,s:L,b:_}=X[0];$.push(`static uint8_t ${N}_inited = 0;`),m.set(T.id,[`    if (!${N}_inited) {`,`        ${N}_inited = 1;`,`        u8g2_chart_init(&${N}, ${_.name}, ${N}_dis, ${_.lenMacro});`,g(L.bufferId),"    }"]);const M=L.chartKind==="point"?"Point":L.chartKind==="bar"?"Bar":"Line",re=L.min!==void 0&&L.max!==void 0?`${W(L.max)}, ${W(L.min)}`:"0, 0";x.set(T.id,`    u8g2_MenuDrawItem${M}Chart(&${N}, ${j}, ${re});`)}else{const N=`chart_layers_${y++}`;$.push(`static u8g2_menu_drawChart_t ${N}[${X.length}];`,`static uint8_t ${N}_inited = 0;`);const L=[`    if (!${N}_inited) {`,`        ${N}_inited = 1;`];X.forEach(({name:_,s:M,b:re},oe)=>{L.push(`        u8g2_chart_init(&${_}, ${re.name}, ${_}_dis, ${re.lenMacro});`),L.push(g(M.bufferId));const De=M.chartKind==="point"?"u8g2_drawPointChart":M.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",ke=M.min!==void 0&&M.max!==void 0?`${W(M.max)}, ${W(M.min)}`:"0, 0";L.push(`        ${N}[${oe}].drawChart = ${De};`),L.push(`        ${N}[${oe}].chart = &${_};`),L.push(`        ${N}[${oe}].max = ${ke.split(", ")[0]};`),L.push(`        ${N}[${oe}].min = ${ke.split(", ")[1]};`)}),L.push("    }"),m.set(T.id,L),x.set(T.id,`    u8g2_MenuDrawItemChart(${N}, ${X.length}, ${j});`)}}}const v=[],h=[],S=[],C=new Set,F=new Map;let z=0;for(const d of i.pages)for(const y of d.items){if(y.bind.type==="button"){const g=G(y.bind.cbName,"btn_cb");u.has(g)||u.set(g,y.bind.buttonId)}switch(y.kind){case"board":c.add(G(y.cbName,"board_cb"));break;case"xbm":{let g=G(y.name,"icon");for(;C.has(g);)g=`${g}_2`;C.add(g),F.set(y.id,g);const I=y.bits.length,T=y.bits.map(D=>`0x${(D&255).toString(16).padStart(2,"0")}`).join(", ");v.push(`static const uint8_t menu_xbm_${g}[${I}] = { ${T} };`);break}case"textarea":{const g=z++;h.push(`static char ta${g}_text[] = "${ie(y.content)}";`,`static u8g2_menu_textArea_t ta${g};`,`static uint8_t ta${g}_inited = 0;`),S.push(`    if (!ta${g}_inited) {`,`        ta${g}_inited = 1;`,`        u8g2_textArea_init(&ta${g}, ta${g}_text);`,`        u8g2_textArea_setLineSpacing(&ta${g}, ${Math.max(0,Math.trunc(y.lineSpacing))});`,"    }");break}}}const Y=(d,y)=>{if(!d)return"";const g=`"${ie(d)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${g});`:`u8g2_MenuUTF8Printf(${g});`},A=(d,y,g)=>{const I=`"${ie(d)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${I}, ${g});`:`u8g2_MenuUTF8Printf(${I}, ${g});`};let V=0;const k=(d,y)=>{const g=[],I=`${y.name}`,T=_=>{if(!_)return null;const M=o.get(_);return M||n.push(`页面 ${I} 的条目引用了已删除的变量，已按普通文本生成`),M??null},D=d.bind;let j=null,X=null,N="on",L="off";switch(D.type){case"value":{const _=T(D.varId);if(_){j=_;const M=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${W(_.step)}, ${W(_.min)}, ${W(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;g.push(`    ${M}`)}break}case"switch":{const _=T(D.varId);_&&_.srcType!=="uint8"?n.push(`开关附加值绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`):_&&(X=_,N=D.onText,L=D.offText,g.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(D.openValue)});`));break}case"button":{const _=G(D.cbName,"btn_cb");g.push(`    u8g2_MenuItem_button(${_}, ${Math.trunc(D.buttonId)});`);break}case"submenu":{const _=i.pages.findIndex(M=>M.id===D.targetPageId);!D.targetPageId||_<0?n.push(`页面 ${I} 的条目 "${d.label||"未命名"}" 附加值目标页面无效，已按普通文本生成`):g.push(`    u8g2_MenuItem_menu_enter(${s[_]});`);break}case"back":g.push("    u8g2_MenuItem_menu_back();");break}switch(d.kind){case"text":{if(j)g.push(`    ${A(d.text,d.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(d.text)||n.push(`页面 ${I} 的数值附加值条目显示文本不含格式化占位符（如 %d）`);else if(X)g.push(`    ${A(d.text,d.scale,`${X.name} ? "${ie(N)}" : "${ie(L)}"`)}`),/%[-+ #0]*s/.test(d.text)||n.push("开关附加值条目的显示文本建议包含 %s 用于显示 on/off");else if(D.type==="none"&&d.displayVarId){const _=T(d.displayVarId);if(_)g.push(`    ${A(d.text,d.scale,_.name)}`),/%[-+ #0]*[a-zA-Z]/.test(d.text)||n.push(`页面 ${I} 的显示条目文本不含格式化占位符（如 %d）`);else{n.push(`页面 ${I} 的显示条目引用了已删除的变量，已按普通文本生成`);const M=Y(d.text,d.scale);M&&g.push(`    ${M}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(d.text)){n.push(`页面 ${I} 的文本条目含占位符但未绑定变量/显示变量，占位符已移除`);const _=Y(d.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),d.scale);_&&g.push(`    ${_}`)}else{const _=Y(d.text,d.scale);_&&g.push(`    ${_}`)}break}case"slider":case"progress":{const _=d.kind==="slider"?"Slider":"ProgressBar";if(j){if(!lt.has(j.srcType)){n.push(`滑块/进度条附加值的变量 "${j.name}" 须为整型（当前 ${j.srcType}），已按静态显示生成`),g.push(`    u8g2_MenuDrawItem${_}(${(d.position/100).toFixed(2)}f);`);break}g.push(`    u8g2_MenuDrawItem${_}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{const M=Math.min(100,Math.max(0,d.position));g.push(`    u8g2_MenuDrawItem${_}(${(M/100).toFixed(2)}f);`)}break}case"chart":{const _=m.get(d.id),M=x.get(d.id);if(!_||!M)break;g.push(..._),g.push(M);break}case"xbm":g.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(d.w)}, ${Math.trunc(d.h)}, menu_xbm_${F.get(d.id)??G(d.name,"icon")});`);break;case"textarea":{const _=V++;g.push(...S[_].split(`
`));const M=d.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";g.push(`    ${M}(&ta${_}, ${Math.max(10,Math.trunc(d.height))});`);break}case"board":{const _=G(d.cbName,"board_cb");g.push(`    u8g2_MenuDrawItemBoard(${_}, ${Math.max(1,Math.trunc(d.w))}, ${Math.max(1,Math.trunc(d.h))});`);break}}return g},b=[];b.push("/**"),b.push(` * 由 u8g2-menu-editor 自动生成，工程: ${i.name}`),b.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),b.push(" *"),b.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："),b.push(` *   u8g2_SetFont(&u8g2, ${e?"menu_font":i.font});`),s.forEach((d,y)=>b.push(` *   void ${d}(void);   /* 页面: ${i.pages[y].name} */`));for(const d of a.values())b.push(` *   extern ${d.type} ${d.name};`);for(const[d]of u)b.push(` *   void ${d}(u8g2_menu_t *menu, uint8_t ID);`);for(const d of c)b.push(` *   void ${d}(u8g2_t *u8g2);`);b.push(" */"),b.push('#include "u8g2_menu.h"'),(i.chartBuffers??[]).some(d=>d.sample==="sine")&&b.push("#include <math.h>"),b.push(""),b.push(q("includes",r,"")),b.push(""),s.forEach(d=>b.push(`void ${d}(void);`)),b.push(""),b.push("/* ======================== 变量定义 ======================== */"),b.push(q("variables",r,""));for(const d of a.values())b.push(`${d.type} ${d.name} = ${d.init};`);if(b.push(""),e){b.push("/* ======================== 字体（现场取模） ======================== */"),b.push("/* 仅包含工程文本用到的字形（含 ASCII 95 个 + 额外字符），"),b.push(" * main.c 里 u8g2_SetFont(&u8g2, menu_font) 即可使用；"),b.push(' * 若运行时输出超出此字符集的中文，请在编辑器"额外包含字符"里补充后重新生成。 */');const d=[];for(let y=0;y<e.length;y+=16)d.push("  "+[...e.slice(y,y+16)].map(g=>`0x${g.toString(16).padStart(2,"0")}`).join(", ")+",");b.push(`const uint8_t menu_font[${e.length}] U8G2_FONT_SECTION("menu_font") = {`),b.push(...d),b.push("};"),b.push("")}if((l.length||$.length||h.length||v.length)&&(b.push("/* ======================== 页面资源 ======================== */"),b.push(...l,...$,...h,...v),b.push("")),u.size||c.size){b.push("/* ======================== 回调函数 ======================== */"),b.push(q("callbacks",r,""));for(const[d]of u)b.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID)`),b.push("{"),b.push(q(`cb_${d}`,r,"    ")),b.push("}"),b.push("");for(const d of c)b.push(`void ${d}(u8g2_t *u8g2)`),b.push("{"),b.push(q(`cb_${d}`,r,"    ")),b.push("}"),b.push("")}const K=(i.weakHooks??[]).map(d=>ne.find(y=>y.fn===d)).filter(d=>!!d);if(K.length||r.has("weak")||ne.some(d=>(r.get(`weak_${d.fn}`)??"").trim())){b.push("/* ==================== 弱定义函数重写 ==================== */"),b.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),b.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const y=ne.filter(g=>{var I;return!((I=i.weakHooks)!=null&&I.includes(g.fn))&&(r.get(`weak_${g.fn}`)??"").trim()}).map(g=>[`#if 0   /* 已取消勾选 ${g.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${g.decl}`,"{",q(`weak_${g.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);b.push(y?`${q("weak",r,"").replace(/\n$/,"")}
${y}
`:q("weak",r,"")),b.push("");for(const g of K){b.push(`/* ${g.label}: ${g.desc} */`),b.push(`${g.decl}`),b.push("{"),b.push(q(`weak_${g.fn}`,r,"    "));const I=g.bodyArgs.split(`
`).map(T=>`    ${T}`);g.retNote&&I.push(`    ${g.retNote}`),b.push(...I),b.push("}"),b.push("")}}return b.push("/* ======================== 页面函数 ======================== */"),b.push(""),i.pages.forEach((d,y)=>{b.push(`/* 页面: ${d.name} */`),b.push(`void ${s[y]}(void)`),b.push("{"),b.push(q(`page_${s[y]}_pre`,r,"    "));for(const g of d.items)b.push(...k(g,d));b.push("}"),b.push("")}),{c:`${b.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:n}}function ct(i){return{raw:i.slice(0,23),glyphCnt:i[0],startUpperA:i[17]<<8|i[18],startLowerA:i[19]<<8|i[20],startUnicode:i[21]<<8|i[22]}}function Pe(i,t,e){const n=[],r=[],s=[...t].sort((m,x)=>m-x);for(const m of s){const x=e(m);!x||!x.length||(m<=255?n.push({encoding:m,entry:x}):r.push({encoding:m,entry:x}))}if(!n.length&&!r.length)return null;const a=n.length+r.length;let o=0;for(const m of n)o+=m.entry.length;o+=2;let u=4;for(const m of r)u+=m.entry.length;u+=2;const c=ct(i),l=new Uint8Array(23+o+u);l.set(c.raw,0),l[0]=a,l[17]=0,l[18]=0,l[19]=0,l[20]=0,l[21]=0,l[22]=0;let p=23;for(const m of n){if(m.encoding===65){const x=p-23;l[17]=x>>8&255,l[18]=x&255}if(m.encoding===97){const x=p-23;l[19]=x>>8&255,l[20]=x&255}l.set(m.entry,p),p+=m.entry.length}l[p]=0,l[p+1]=0,p+=2;const $=p-23;l[21]=$>>8&255,l[22]=$&255,l[p]=0,l[p+1]=4,l[p+2]=255,l[p+3]=255,p+=4;for(const m of r)l.set(m.entry,p),p+=m.entry.length;return l[p]=0,l[p+1]=0,l}function dt(i){return[...i].map(t=>t.codePointAt(0)).filter(t=>Number.isFinite(t))}function mt(){const i=[];for(let t=32;t<=126;t++)i.push(t);return i}function se(i,t){const e=new Set(mt()),n=r=>{for(const s of dt(r))e.add(s)};for(const r of i.pages)for(const s of r.items)s.kind==="text"&&n(s.text),s.kind==="textarea"&&n(s.content),s.bind.type==="switch"&&(n(s.bind.onText),n(s.bind.offText));return n(t),e.delete(10),e.delete(13),e}function Le(i){let t=0,e=0;for(const n of i)n<=126?t++:e++;return{total:i.size,ascii:t,cjk:e}}var U=(i=>(i[i.None=0]="None",i[i.Up=1]="Up",i[i.Down=2]="Down",i[i.Enter=3]="Enter",i[i.Return=4]="Return",i[i.Add=5]="Add",i[i.Sub=6]="Sub",i))(U||{});const pt=8192/8;function ft(i){return new Promise((t,e)=>{const n=document.createElement("script");n.src=i,n.onload=()=>t(),n.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${i}`)),document.head.appendChild(n)})}class ht{constructor(t,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.fontSig=null,this.lastKnownPage=0,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(t){if(this.mod)return;const e=window;e.U8G2MenuPreview||await ft(t);const n=e.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await n({locateFile:s=>t.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const r=this.mod._em_font_count_export();for(let s=0;s<r;s++){const a=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(a),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(t){return this.fontIndexCache.get(t)??0}signature(t){return JSON.stringify({bufs:(t.chartBuffers??[]).map(e=>`${e.name}|${e.dataLen}|${e.sample}`),pages:t.pages.map(e=>({n:e.items.length,k:e.items.map(n=>n.kind).join(","),res:e.items.map(n=>n.kind==="chart"?(n.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")}))})}sync(t){const e=this.mod;if(!e)return;const n=this.signature(t);n!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);const r=l=>Math.trunc(Number.isFinite(l)?l:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},a={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},c=l=>l?(t.variables??[]).findIndex(p=>p.id===l):-1;if((t.variables??[]).forEach((l,p)=>{e.ccall("em_var_define",null,["number","number","number","number","number","number"],[p,s[l.type],r(l.initialValue),r(l.step),r(l.min),r(l.max)])}),(t.chartBuffers??[]).forEach((l,p)=>{e.ccall("em_buf_define",null,["number","number","number"],[p,r(l.dataLen),u[l.sample]])}),t.pages.forEach((l,p)=>{e.ccall("em_page_begin",null,["number"],[p]),l.items.forEach(($,m)=>{const x=()=>{const w=$.bind;if(w.type==="none")return;const v=w.type==="value"||w.type==="switch",h=v?(t.variables??[]).find(S=>S.id===w.varId):void 0;e.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[p,m,o[w.type],v&&h?s[h.type]:0,w.type==="switch"?r(w.openValue):0,w.type==="button"?r(w.buttonId):0,w.type==="submenu"?t.pages.findIndex(S=>S.id===w.targetPageId):-1,v&&h?c(h.id):-1])};switch($.kind){case"text":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[p,m,a.text,$.scale,0,0,0,$.displayVarId?c($.displayVarId):-1,-1]),e.ccall("em_item_text",null,["number","number","string"],[p,m,$.text]),x();break;case"slider":case"progress":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[p,m,a[$.kind],1,0,0,0,-1,-1]),x();break;case"chart":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[p,m,a.chart,1,r($.height),0,0,-1,-1]);for(const w of $.sources??[])e.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[p,m,(t.chartBuffers??[]).findIndex(v=>v.id===w.bufferId),{line:0,point:1,bar:2}[w.chartKind],w.min!==void 0&&w.max!==void 0?1:0,w.max??0,w.min??0]);x();break;case"xbm":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[p,m,a.xbm,1,0,r($.w),r($.h),-1,-1]);{const w=e._em_scratch($.bits.length);w&&(e.HEAPU8.set(new Uint8Array($.bits),w),e._em_item_bits(p,m,w,$.bits.length))}x();break;case"textarea":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[p,m,a.textarea,1,r($.height),0,0,-1,-1]),e.ccall("em_item_text",null,["number","number","string"],[p,m,$.content]),x();break;case"board":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[p,m,a.board,1,0,r($.w),r($.h),-1,-1]),x();break}}),e.ccall("em_page_end",null,["number","number"],[p,l.items.length])}),e.ccall("em_pages_commit",null,["number"],[t.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(t.font),{default:0,rotundity:1,square:2}[t.selector],r(t.selectorLeftMargin),r(t.selectorTopMargin),r(t.selectorLineSpacing),t.marqueeSpeed,t.marqueeHeaderLen]),t.fontSubset){const l=se(t,t.fontExtra),p=t.font+"|"+[...l].sort(($,m)=>$-m).join(",");if(p!==this.fontSig){this.fontSig=p;const $=this.fontIndex(t.font),m=v=>{const h=this.mod,S=h.ccall("em_scratch","number",["number"],[64]),C=h.ccall("em_font_glyph","number",["number","number","number","number"],[$,v,64,S]);return C?h.HEAPU8.slice(S,S+C):null},x=this.getFontBytes($),w=x?Pe(x,l,m):null;w&&this.useCustomFont(w)}}else this.fontSig!==null&&(this.fontSig=null)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const t=e=>{if(!this.running)return;const n=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(n),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(t){var o,u;const e=this.mod;if(!e)return;const n=e._em_frame(t);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));const r=e.HEAPU8.subarray(n,n+pt),s=this.img.data;s.fill(255);for(let c=0;c<64;c++){const l=(c>>3)*128,p=1<<(c&7);let $=c*128*4;for(let m=0;m<128;m++)r[l+m]&p&&(s[$]=17,s[$+1]=24,s[$+2]=39),$+=4}this.ctx.putImageData(this.img,0,0);const a=e._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,(u=(o=this.events).onPageChanged)==null||u.call(o,a))}key(t){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[t])}navTo(t){var e;(e=this.mod)==null||e.ccall("em_nav",null,["number"],[t])}getFontBytes(t){const e=this.mod;if(!e)return null;const n=e.ccall("em_font_data","number",["number"],[t]),r=e.ccall("em_font_data_len","number",["number"],[t]);return!n||!r?null:e.HEAPU8.slice(n,n+r)}glyphFetcher(t){const e=this.mod;return e?n=>{const r=e.ccall("em_scratch","number",["number"],[64]),s=e.ccall("em_font_glyph","number",["number","number","number","number"],[t,n,64,r]);return s?e.HEAPU8.slice(r,r+s):null}:null}useCustomFont(t){const e=this.mod;if(!e)return!1;const n=e.ccall("em_custom_font_ptr","number",[],[]),r=e.ccall("em_custom_font_max","number",[],[]);return t.length>r?!1:(e.HEAPU8.set(t,n),e.ccall("em_set_custom_font",null,["number"],[t.length]),!0)}getInt(t){var e;return((e=this.mod)==null?void 0:e._em_get_ipool(t))??0}getSwitch(t){var e;return((e=this.mod)==null?void 0:e._em_get_upool(t))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const bt=Object.keys(me);function gt(i,t,e,n){const r=i.getState(),s=e.label||"text"in e&&e.text||me[e.kind],a=e.bind.type!=="none"?` · ${de[e.bind.type]}`:"",o=u=>c=>{c.stopPropagation(),i.getState().moveItem(t.id,e.id,u)};return f.html`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>i.getState().select(t.id,e.id)}>
    <span class="ume-item-icon">${Xe[e.kind]}</span>
    <span class="ume-item-name" title=${s+a}>${s}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(t.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(t.id,e.id)}}>✕</button>
  </div>`}function vt(i,t){const e=i.getState();return f.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{const r=n.target.value;r&&e.addItem(r,t.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${bt.map(n=>f.html`<option value=${n}>${me[n]}</option>`)}
  </select>`}function xt(i,t){const{project:e,selection:n}=t.getState(),r=s=>{const a=t.getState(),o=n.pageId===s.id;return f.html`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>t.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${s.name}"？`)&&a.removePage(s.id)}}>✕</button>
      </div>
      ${o?f.html`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>gt(t,s,u,n.itemId===u.id)):f.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${vt(t,s)}</div>
      </div>`:f.nothing}
    </div>`};f.render(f.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>$t(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(r)}
  `,i)}function $t(i){const t=prompt("页面名称:",`页面${i.getState().project.pages.length+1}`);t!==null&&i.getState().addPage(t||void 0)}function R(i,t,e,n=""){return f.html`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${t??""} placeholder=${n}
      @change=${r=>e(r.target.value)} />
  </div>`}function B(i,t,e,n=1){return f.html`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(t)} step=${String(n)}
      @change=${r=>{const s=parseFloat(r.target.value);e(Number.isFinite(s)?s:0)}} />
  </div>`}function Z(i,t,e,n){return f.html`<div class="ume-field">
    <label>${i}</label>
    <select @change=${r=>n(r.target.value)}>
      ${e.map(r=>f.html`<option value=${r.value} ?selected=${r.value===t}>${r.label}</option>`)}
    </select>
  </div>`}function ye(i,t,e){return f.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${n=>e(n.target.checked)} />
    <span>${i}</span>
  </div>`}function _t(i,t,e,n=!1){return f.html`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${r=>e(r.target.value)}>${t??""}</textarea>
  </div>`}function we(i,t,e="text/plain"){const n=new Blob([t],{type:`${e};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=i,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}let ge=null;const Be={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function ve(i,t,e,n){const r=[{value:"",label:"（未绑定）"},...e.map(a=>({value:a.id,label:`${a.name} : ${Be[a.type]??a.type}`}))],s=t?e.some(a=>a.id===t):!1;return f.html`
    ${Z(i,t??"",r,a=>n(a||null))}
    ${t&&!s?f.html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:f.nothing}
    ${e.length===0?f.html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:f.nothing}
  `}function xe(i,t){return f.html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{const e=i.getState().addVariable();t(e)}}>＋ 新建变量并绑定</button>
  </div>`}function $e(i){return i?f.html`<div class="ume-hint">
    ${i.name} : ${Be[i.type]??i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>`:f.html`${f.nothing}`}function yt(i,t,e){const{project:n,selection:r}=t.getState(),s=n.pages.find(m=>m.id===r.pageId)??null,a=(s==null?void 0:s.items.find(m=>m.id===r.itemId))??null,o=n.variables??[],u=n.chartBuffers??[],c=(m,x)=>t.getState().updateItem(s.id,a.id,m,x),l=m=>c({bind:m});let p=f.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,$="";if(s&&!a)$="页面属性",p=f.html`
      ${R("名称",s.name,m=>t.getState().updatePage(s.id,{name:m}))}
      ${R("C 函数名",s.fnName,m=>t.getState().updatePage(s.id,{fnName:m}),"留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&a){(a.bind.type==="value"||a.bind.type==="switch")&&a.bind.varId&&(ge=a.bind.varId),$=`${me[a.kind]}${a.bind.type!=="none"?` + ${de[a.bind.type]}`:""}`;let m=f.html``;switch(a.kind){case"text":{const v=a,h=o.find(S=>S.id===v.displayVarId);m=f.html`
          ${R("文本/格式",v.text,S=>c({text:S},`text-${v.id}`))}
          ${Z("大小",String(v.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],S=>c({scale:Number(S)}))}
          ${a.bind.type==="none"?f.html`
            ${ve("显示变量",v.displayVarId,o,S=>c({displayVarId:S}))}
            ${h?f.nothing:xe(t,S=>c({displayVarId:S.id}))}
            ${$e(h)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:f.nothing}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{const v=a;m=f.html`
          ${a.bind.type==="none"?f.html`
            ${B("静态位置(%)",v.position,h=>c({position:Math.min(100,Math.max(0,Math.trunc(h)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:f.nothing}
        `;break}case"chart":{const v=a,h=C=>c({sources:C}),S=(C,F)=>{const z=u.find(A=>A.id===C.bufferId),Y=C.min===void 0||C.max===void 0;return f.html`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(z==null?void 0:z.name)??"(无效)"}</span>
              <span class="ume-var-meta">${{line:"折线",point:"散点",bar:"柱状"}[C.chartKind]??C.chartKind}${Y?" · 自动量程":` · ${C.min}~${C.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>h(v.sources.filter((A,V)=>V!==F))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${Z("缓冲区",C.bufferId,u.map(A=>({value:A.id,label:`${A.name} (${A.dataLen}点)`})),A=>h(v.sources.map((V,k)=>k===F?{...V,bufferId:A}:V)))}
              ${Z("绘制",C.chartKind,[{value:"line",label:"折线"},{value:"point",label:"散点"},{value:"bar",label:"柱状"}],A=>h(v.sources.map((V,k)=>k===F?{...V,chartKind:A}:V)))}
              ${ye("自动量程",Y,A=>h(v.sources.map((V,k)=>k===F?{...V,min:A?void 0:0,max:A?void 0:100}:V)))}
              ${Y?f.nothing:f.html`
                ${B("量程上限",C.max??100,A=>h(v.sources.map((V,k)=>k===F?{...V,max:A}:V)),"any")}
                ${B("量程下限",C.min??0,A=>h(v.sources.map((V,k)=>k===F?{...V,min:A}:V)),"any")}`}
            </div>
          </div>`};m=f.html`
          ${B("高度(px)",v.height,C=>c({height:Math.max(4,Math.trunc(C))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(v.sources??[]).map(S)}
              ${(v.sources??[]).length===0?f.html`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:f.nothing}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(v.sources??[]).length>=4}
                @click=${()=>{if(!u.length){const C=t.getState().addChartBuffer();h([...v.sources??[],{bufferId:C.id,chartKind:"line"}]);return}h([...v.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(v.sources??[]).length>0?"（叠加）":""}</button>
              ${u.length?f.nothing:f.html`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{const v=a;m=f.html`
          ${R("数组名",v.name,h=>c({name:h}))}
          ${B("宽(px)",v.w,h=>c({w:Math.min(128,Math.max(1,Math.trunc(h)))}))}
          ${B("高(px)",v.h,h=>c({h:Math.min(64,Math.max(1,Math.trunc(h)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(s.id,v.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${v.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const v=a;m=f.html`
          ${_t("文本内容",v.content,h=>c({content:h}))}
          ${B("高度(px)",v.height,h=>c({height:Math.max(10,Math.trunc(h))}))}
          ${B("行间距",v.lineSpacing,h=>c({lineSpacing:Math.max(0,Math.trunc(h))}))}
          ${ye("上下键滚动 (bind)",v.bindScroll,h=>c({bindScroll:h}))}
        `;break}case"board":{const v=a;m=f.html`
          ${B("宽(px)",v.w,h=>c({w:Math.max(1,Math.trunc(h))}))}
          ${B("高(px)",v.h,h=>c({h:Math.max(1,Math.trunc(h))}))}
          ${R("回调函数名",v.cbName,h=>c({cbName:h}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}const x=a.bind;let w=f.html``;switch(x.type){case"none":w=f.html`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{const v=o.find(h=>h.id===x.varId);w=f.html`
          ${ve("变量",x.varId,o,h=>l({type:"value",varId:h}))}
          ${v?f.nothing:xe(t,h=>l({type:"value",varId:h.id}))}
          ${$e(v)}
          ${a.kind==="text"?f.html`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:f.nothing}
        `;break}case"switch":{const v=o.filter(h=>h.type==="uint8").find(h=>h.id===x.varId)??o.find(h=>h.id===x.varId);w=f.html`
          ${ve("变量 (uint8)",x.varId,o.filter(h=>h.type==="uint8"),h=>l({type:"switch",varId:h,openValue:x.openValue,onText:x.onText,offText:x.offText}))}
          ${v?f.nothing:xe(t,h=>l({type:"switch",varId:h.id,openValue:x.openValue,onText:x.onText,offText:x.offText}))}
          ${$e(v)}
          ${B("openValue",x.openValue,h=>l({type:"switch",varId:x.varId,openValue:Math.max(0,Math.trunc(h)),onText:x.onText,offText:x.offText}))}
          ${R('"开"文本',x.onText,h=>l({type:"switch",varId:x.varId,openValue:x.openValue,onText:h,offText:x.offText}))}
          ${R('"关"文本',x.offText,h=>l({type:"switch",varId:x.varId,openValue:x.openValue,onText:x.onText,offText:h}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":w=f.html`
          ${R("回调函数名",x.cbName,v=>l({type:"button",cbName:v,buttonId:x.buttonId}))}
          ${B("ID",x.buttonId,v=>l({type:"button",cbName:x.cbName,buttonId:Math.trunc(v)}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":w=f.html`
          ${Z("目标页面",x.targetPageId??"",[{value:"",label:"（未设置）"},...n.pages.filter(v=>v.id!==s.id).map(v=>({value:v.id,label:v.name}))],v=>l({type:"submenu",targetPageId:v||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":w=f.html`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}p=f.html`
      <div class="ume-panel-title">绘制</div>
      ${m}
      <div class="ume-panel-title">附加值</div>
      ${Z("类型",x.type,Object.keys(de).map(v=>({value:v,label:de[v]})),v=>{const h=a.bind;l(v==="value"?{type:"value",varId:h.type==="value"||h.type==="switch"?h.varId:ge}:v==="switch"?{type:"switch",varId:h.type==="value"||h.type==="switch"?h.varId:ge,openValue:1,onText:"on",offText:"off"}:v==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:v==="submenu"?{type:"submenu",targetPageId:h.type==="submenu"?h.targetPageId:null}:{type:"none"})})}
      ${w}
    `}f.render(f.html`
    ${$?f.html`<div class="ume-panel-title"><span class="ume-kind-badge">${$}</span></div>`:f.nothing}
    ${p}
  `,i)}let le=null,_e=null;const wt=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (小数)"},{value:"double",label:"double (小数)"}];function kt(i,t){const e=t.variables??[],n=s=>{le=le===s?null:s},r=s=>{const a=le===s.id,o=(p,$)=>i.getState().updateVariable(s.id,p,$),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),c=e.filter(p=>p.name===s.name).length>1,l=It(t,s.id);return f.html`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(未命名)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${l?` · ${l} 处引用`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${p=>{p.stopPropagation();const $=i.getState().removeVariable(s.id);$>0&&alert(`该变量被 ${$} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`)}}>✕</button>
      </div>
      ${a?f.html`<div class="ume-var-edit">
        ${R("变量名",s.name,p=>o({name:p.trim()},`vn-${s.id}`))}
        ${u?f.html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:f.nothing}
        ${c?f.html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:f.nothing}
        ${Z("类型",s.type,wt,p=>o({type:p}))}
        ${B("初始值",s.initialValue,p=>o({initialValue:p},`vi-${s.id}`),"any")}
        ${B("最小值",s.min,p=>o({min:p},`vmin-${s.id}`),"any")}
        ${B("最大值",s.max,p=>o({max:p},`vmax-${s.id}`),"any")}
        ${B("步长",s.step,p=>o({step:p},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:f.nothing}
    </div>`};return f.html`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{le=i.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(r):f.html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function It(i,t){let e=0;for(const n of i.pages)for(const r of n.items)"varId"in r&&r.varId===t&&e++;return e}function St(i,t){const e=t.chartBuffers??[],n=s=>{let a=0;for(const o of t.pages)for(const u of o.items)u.kind==="chart"&&u.sources.some(c=>c.bufferId===s)&&a++;return a},r=s=>{const a=_e===s.id,o=(l,p)=>i.getState().updateChartBuffer(s.id,l,p),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),c=n(s.id);return f.html`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>{_e=a?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(未命名)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"正弦",ramp:"斜坡",noise:"伪随机",none:"手动填充"}[s.sample]}${c?` · ${c} 处引用`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${l=>{l.stopPropagation();const p=i.getState().removeChartBuffer(s.id);p>0&&alert(`该缓冲区被 ${p} 个图表条目的数据源引用，请先在条目里移除数据源再删除`)}}>✕</button>
      </div>
      ${a?f.html`<div class="ume-var-edit">
        ${R("数组名",s.name,l=>o({name:l.trim()},`bn-${s.id}`))}
        ${u?f.html`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:f.nothing}
        ${B("点数",s.dataLen,l=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(l)))},`bl-${s.id}`))}
        ${Z("示例填充",s.sample,[{value:"sine",label:"正弦（演示）"},{value:"ramp",label:"斜坡（演示）"},{value:"noise",label:"伪随机（演示）"},{value:"none",label:"不填充（全部手写）"}],l=>o({sample:l}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:f.nothing}
    </div>`};return f.html`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{_e=i.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(r):f.html`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Et(i,t){const{project:e}=t.getState();f.render(f.html`
    ${kt(t,e)}
    ${St(t,e)}
  `,i)}function Mt(i,t){const{project:e}=t.getState(),n=(o,u)=>t.getState().update(c=>{Object.assign(c,o)},u),r=e.weakHooks??[],s=(o,u)=>{t.getState().update(c=>{const l=c.weakHooks??[];c.weakHooks=u?[...new Set([...l,o])]:l.filter(p=>p!==o)})},a=f.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${r.length}/${ne.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${ne.map(o=>f.html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote?"（返回 1 = 事件已处理 / 0 = 交给库）":""}`}>
              <input type="checkbox" ?checked=${r.includes(o.fn)}
                @change=${u=>s(o.fn,u.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;f.render(f.html`
    <div class="ume-panel-title">工程</div>
    ${R("工程名",e.name,o=>n({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width!==128||e.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${Z("字体",e.font,Ze.map(o=>({value:o.id,label:o.label})),o=>n({font:o}))}
    ${ye("中文现场取模（仅包含用到的字形）",e.fontSubset,o=>n({fontSubset:o}))}
    ${e.fontSubset?f.html`
      ${R("额外包含字符",e.fontExtra,o=>n({fontExtra:o}))}
      ${(()=>{const o=Le(se(e,e.fontExtra));return f.html`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:f.nothing}
    ${Z("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],o=>n({selector:o}))}
    ${B("左边距",e.selectorLeftMargin,o=>n({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${B("顶边距",e.selectorTopMargin,o=>n({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${B("行间距",e.selectorLineSpacing,o=>n({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${B("跑马灯速度",e.marqueeSpeed,o=>n({marqueeSpeed:o}),.05)}
    ${B("跑马灯停留",e.marqueeHeaderLen,o=>n({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `,i)}function Ct(i,t){const e=r=>{let s;const a=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),t.key(r),a(),s=window.setInterval(()=>t.key(r),180)},up:a}},n=(r,s,a)=>{const o=e(r);return f.html`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};f.render(f.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${r=>{const a={ArrowUp:U.Up,ArrowDown:U.Down,Enter:U.Enter,Escape:U.Return,Backspace:U.Return,"+":U.Add,"-":U.Sub,"=":U.Add,_:U.Sub}[r.key];a!==void 0&&(r.preventDefault(),t.key(a))}}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${n(U.Up,"▲","上 MENU_Key_Up")}
      ${n(U.Down,"▼","下 MENU_Key_Down")}
      ${n(U.Enter,"OK","确认 MENU_Key_Enter")}
      ${n(U.Return,"⌫","返回 MENU_Key_Return")}
      ${n(U.Add,"＋","加 MENU_Key_Add")}
      ${n(U.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,i)}let ee=null;function Tt(i,t){ee=t,i.querySelectorAll(":scope > .ume-modal-mask").forEach(e=>e.remove()),Nt(i)}function Nt(i){if(!ee)return;const t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",e=>{e.target===t&&Ee(t)}),f.render(f.html`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Ee(t)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${ee.warnings.length?f.html`
          <div style="margin-bottom:8px">
            ${ee.warnings.map(e=>f.html`<div class="ume-warn">⚠ ${e}</div>`)}
          </div>`:f.nothing}
        <div class="ume-code-view">${ee.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(ee.c).then(()=>At(t,"已复制到剪贴板"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{we("menu_pages.c",ee.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,t),i.appendChild(t)}function Ee(i){i.remove()}function At(i,t){const e=i.closest(".ume")??document.body;let n=e.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",e.appendChild(n)),n.textContent=t,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function Vt(i,t,e,n){const s=t.getState().project.pages.find(k=>k.id===e),a=s==null?void 0:s.items.find(k=>k.id===n);if(!a||a.kind!=="xbm")return;const o=a;let u=o.w,c=o.h,l=[...o.bits];const p=()=>Math.ceil(u/8),$=document.createElement("div");$.className="ume-modal-mask",$.addEventListener("click",k=>{k.target===$&&V()});const m=(k,b)=>{const K=b*p()+(k>>3);return K<l.length?!!(l[K]>>(k&7)&1):!1},x=(k,b,K)=>{const Q=b*p()+(k>>3);l[Q]=K?l[Q]|1<<(k&7):l[Q]&~(1<<(k&7))},w=(k,b)=>{const K=Math.ceil(u/8),Q=Math.ceil(k/8),d=new Array(Q*b).fill(0);for(let y=0;y<Math.min(c,b);y++)for(let g=0;g<Math.min(u,k);g++){const I=y*K+(g>>3);I<l.length&&l[I]>>(g&7)&1&&(d[y*Q+(g>>3)]|=1<<(g&7))}u=k,c=b,l=d};let v=!1,h=!0;const S=(k,b)=>K=>{K.preventDefault(),v=!0,h=!m(k,b),x(k,b,h),z()},C=(k,b)=>()=>{v&&(x(k,b,h),z())},F=()=>{v=!1},z=()=>{f.render(A(),$)},Y=()=>{const k=[];for(let b=0;b<c;b++)for(let K=0;K<u;K++)k.push(f.html`<button class="ume-xbm-cell ${m(K,b)?"on":""}"
          data-x=${K} data-y=${b}
          @pointerdown=${S(K,b)}
          @pointerenter=${C(K,b)}></button>`);return k},A=()=>f.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${c}</span></span>
        <button class="ume-mini" @click=${V}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${F}
        @pointerleave=${F}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${k=>{w(Me(+k.target.value,1,128),c),z()}} />
          <input type="number" style="width:64px" .value=${String(c)} min="1" max="64"
            @change=${k=>{w(u,Me(+k.target.value,1,64)),z()}} />
          <button class="ume-btn sm" @click=${()=>{l=l.map(()=>0),z()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{l=l.map(k=>~k&255),z()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${Y()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${V}>取消</button>
        <button class="ume-btn primary" @click=${()=>{t.getState().updateItem(e,n,{w:u,h:c,bits:[...l]}),V()}}>应用</button>
      </div>
    </div>
  `;function V(){$.remove(),document.removeEventListener("pointerup",F)}document.addEventListener("pointerup",F),z(),i.appendChild($)}function Me(i,t,e){return Number.isFinite(i)?Math.min(e,Math.max(t,Math.trunc(i))):t}const Pt="prebuilt/u8g2-menu-preview.js";class Lt{constructor(t,e={}){var $;if(this.store=Te(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.activateRightTab=()=>{},this.container=t,this.opts={persistKey:"default",...e},t.classList.add("ume"),!document.getElementById("ume-style")){const m=document.createElement("style");m.id="ume-style",m.textContent=Ue,document.head.appendChild(m)}const n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??n??void 0;if(r!==void 0)try{this.store.setState({project:be(r)})}catch(m){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",m)}const s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),t.innerHTML=`
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
    `;const a=m=>t.querySelector(m);this.els={left:a(".ume-left"),center:a(".ume-center"),right:a(".ume-right"),propEl:a('[data-role="prop"]'),resEl:a('[data-role="res"]'),setEl:a('[data-role="set"]'),toolbarUndo:a('[data-act="undo"]'),toolbarRedo:a('[data-act="redo"]')};const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new ht(o,{onPageChanged:m=>this.onPreviewPageChanged(m)});const u=document.createElement("div");this.els.center.appendChild(u),Ct(u,this.preview),this.preview.load(this.opts.wasmUrl??Pt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(m=>{console.error(m);const x=document.createElement("div");x.className="ume-warn",x.textContent=`预览引擎加载失败: ${m.message}。编辑功能不受影响。`,this.els.center.prepend(x)}),t.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const m=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);m!==null&&this.store.getState().addPage(m||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),t.querySelector('[data-act="export-json"]').addEventListener("click",()=>{we(`${this.store.getState().project.name||"menu-project"}.json`,Ie(this.store.getState().project),"application/json")}),t.querySelector('[data-act="import"]').addEventListener("click",()=>{a('[data-role="file"]').click()}),a('[data-role="file"]').addEventListener("change",m=>{var w;const x=(w=m.target.files)==null?void 0:w[0];x&&(x.text().then(v=>{try{const h=be(v);this.store.getState().update(S=>{Object.assign(S,h)}),this.scheduleRender()}catch(h){alert(`导入失败: ${h.message}`)}}),m.target.value="")}),t.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate());const c=t.querySelectorAll(".ume-tabs button"),l=m=>{c.forEach(x=>x.classList.toggle("active",x.dataset.tab===m)),this.els.propEl.style.display=m==="prop"?"":"none",this.els.resEl.style.display=m==="res"?"":"none",this.els.setEl.style.display=m==="set"?"":"none"};c.forEach(m=>{m.addEventListener("click",()=>l(m.dataset.tab??"prop"))}),this.activateRightTab=l,this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select((($=this.store.getState().project.pages[0])==null?void 0:$.id)??null,null);let p=null;this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange();const m=this.store.getState().selection.itemId;m&&m!==p&&this.activateRightTab("prop"),p=m}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(t){var n;const e=be(t);this.store.getState().update(r=>{Object.assign(r,e)}),this.store.getState().select(((n=e.pages[0])==null?void 0:n.id)??null,null)}generate(){var a,o;const t=this.lastExport,e=this.store.getState().project;let n,r=0;if(e.fontSubset&&this.preview.ready){const u=se(e,e.fontExtra),c=this.buildFontSubset(e,u);c?(n=c,r=c.length,this.preview.useCustomFont(c)):console.warn("[u8g2-menu-editor] 现场取模失败：字符集未命中任何字形")}const s=Se(e,t??void 0,n);if(n){const u=Le(se(e,e.fontExtra));s.warnings.unshift(`现场取模：收录 ${u.total} 个字符（ASCII ${u.ascii} + 扩展 ${u.cjk}），字体数组 ${r} 字节。运行时若输出超出字符集的中文，请在设置里补充额外字符`)}return this.lastExport={c:s.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,s.c),Tt(this.container,s),(o=(a=this.opts).onExport)==null||o.call(a,s),s}downloadC(){const t=this.store.getState().project;let e;t.fontSubset&&this.preview.ready&&(e=this.buildFontSubset(t,se(t,t.fontExtra)),e&&this.preview.useCustomFont(e));const n=Se(t,this.lastExport??void 0,e);this.lastExport={c:n.c},we("menu_pages.c",n.c)}buildFontSubset(t,e){const n=this.preview.fontIndex(t.font),r=this.preview.getFontBytes(n),s=this.preview.glyphFetcher(n);if(!(!r||!s))return Pe(r,e,s)??void 0}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(t){const e=t.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"?(t.preventDefault(),t.shiftKey?this.store.getState().redo():this.store.getState().undo()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="y"&&(t.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(t){const e=this.store.getState().project.pages[t];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ie(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const t=this.store.getState();xt(this.els.left,this.store),Mt(this.els.setEl,this.store),Et(this.els.resEl,this.store),yt(this.els.propEl,this.store,{openXbmEditor:(e,n)=>Vt(this.container,this.store,e,n)}),this.els.toolbarUndo.disabled=t.past.length===0,this.els.toolbarRedo.disabled=t.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var s;const t=document.getElementById("ume-live-value"),e=document.getElementById("ume-page-jump"),n=this.store.getState(),r=this.store.getState().project.pages.findIndex(a=>a.id===n.selection.pageId);if(e){const a=n.project.pages,o=a.map(c=>c.name).join("|");e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML="",a.forEach((c,l)=>{const p=document.createElement("option");p.value=String(l),p.textContent=`${l+1}. ${c.name}`,e.appendChild(p)}),e.onchange=()=>{const c=parseInt(e.value,10);Number.isFinite(c)&&this.preview.navTo(c)});const u=this.preview.currentPage;document.activeElement!==e&&e.value!==String(u)&&(e.value=String(u))}if(t&&r>=0&&n.selection.itemId){const a=n.project.pages[r],o=a.items.findIndex(m=>m.id===n.selection.itemId),u=a.items[o],c=u==null?void 0:u.bind,l=(c==null?void 0:c.type)==="value"||(c==null?void 0:c.type)==="switch"?c.varId:null,p=(u==null?void 0:u.kind)==="text"&&(c==null?void 0:c.type)==="none"?u.displayVarId:null,$=l??p;if(u&&$){const m=(n.project.variables??[]).findIndex(S=>S.id===$),x=m>=0?m:r*64+o,v=(c==null?void 0:c.type)==="switch"?this.preview.getSwitch(x):this.preview.getInt(x),h=(s=(n.project.variables??[]).find(S=>S.id===$))==null?void 0:s.name;t.textContent=`${h??u.kind} = ${v}`}else t.textContent=""}}}exports.MenuEditor=Lt;exports.MenuKey=U;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
