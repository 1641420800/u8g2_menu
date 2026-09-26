"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const De=require("zustand/vanilla"),p=require("lit-html"),Ke=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`;let me=0;function O(i){return me=(me+1)%1e9,`${i}_${Date.now().toString(36)}_${me.toString(36)}`}function le(i){return{id:O("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...i}}function Me(i){return{id:O("buf"),name:"buf_new",dataLen:32,sample:"sine",...i}}function Ue(i,t){const e=new Set(i.map(s=>s.name));if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`}function je(i,t){const e=new Set(i.map(s=>s.name));if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`}function H(i){const t={id:O("it"),label:"",bind:{type:"none"}};switch(i){case"text":return{...t,kind:i,text:"菜单项",scale:1,displayVarId:null};case"slider":return{...t,kind:i,position:50};case"progress":return{...t,kind:i,position:50};case"chart":return{...t,kind:i,sources:[],height:32};case"xbm":return Fe(16,16);case"textarea":return{...t,kind:i,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...t,kind:i,w:64,h:32,cbName:"board_cb"}}}function Fe(i,t){const e=Math.ceil(i/8);return{id:O("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:i,h:t,bits:new Array(e*t).fill(0)}}function pe(i){return{id:O("pg"),name:i,fnName:"",items:[],userCodePre:""}}function oe(i,t){return{...i,...t}}function G(i,t){return{...i,...t}}function ze(){const i=[le({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),le({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),le({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],t=[Me({name:"buf_demo",dataLen:32,sample:"sine"})],e=pe("主页");e.items=[oe(H("text"),{text:"u8g2_menu"}),G(H("text"),{text:"系统设置",bind:{type:"submenu",targetPageId:null}}),G(H("text"),{text:"关于",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];const n=pe("设置");n.items=[G(oe(H("text"),{text:"音量:%d"}),{bind:{type:"value",varId:i[0].id}}),G(oe(H("text"),{text:"开关:%s"}),{bind:{type:"switch",varId:i[1].id,openValue:1,onText:"on",offText:"off"}}),G(H("slider"),{bind:{type:"value",varId:i[2].id}}),G(H("text"),{text:"图表",bind:{type:"submenu",targetPageId:null}}),G(H("text"),{text:"返回",bind:{type:"back"}})];const s=pe("图表");s.items=[oe(H("chart"),{height:36,sources:[{bufferId:t[0].id,chartKind:"line"}]}),G(H("text"),{text:"返回",bind:{type:"back"}})];const r={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:i,chartBuffers:t,pages:[e,n,s]};return e.items[1].bind.targetPageId=n.id,n.items[3].bind.targetPageId=s.id,r}function Oe(i){return structuredClone(i)}const Re=800;function Ce(){let i=null,t=0;return De.createStore()((e,n)=>({project:ze(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(s,r)=>{const a=Date.now(),o=!!r&&r===i&&a-t<Re;i=r??null,t=a,e(u=>{const l=Oe(u.project);return s(l),{project:l,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{e(s=>s.past.length?{project:s.past[s.past.length-1],past:s.past.slice(0,-1),future:[s.project,...s.future.slice(0,99)],dirty:!0}:s)},redo:()=>{e(s=>{if(!s.future.length)return s;const[r,...a]=s.future;return{project:r,past:[...s.past,s.project],future:a,dirty:!0}})},select:(s,r=null)=>e({selection:{pageId:s,itemId:r}}),addPage:s=>{const r={id:O("pg"),name:s??`页面${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(a=>{a.pages.push(r)}),e({selection:{pageId:r.id,itemId:null}}),r},removePage:s=>{n().update(a=>{a.pages=a.pages.filter(o=>o.id!==s);for(const o of a.pages)for(const u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===s&&(u.bind.targetPageId=null)});const{selection:r}=n();r.pageId===s&&e({selection:{pageId:null,itemId:null}})},movePage:(s,r)=>{n().update(a=>{const o=a.pages.findIndex(l=>l.id===s),u=o+r;o<0||u<0||u>=a.pages.length||([a.pages[o],a.pages[u]]=[a.pages[u],a.pages[o]])})},updatePage:(s,r)=>{n().update(a=>{const o=a.pages.find(u=>u.id===s);o&&Object.assign(o,r)})},addItem:(s,r)=>{var u;const a=r??n().selection.pageId??((u=n().project.pages[0])==null?void 0:u.id);if(!a)return null;const o=qe(s);return n().update(l=>{const d=l.pages.find(m=>m.id===a);d==null||d.items.push(o)}),e({selection:{pageId:a,itemId:o.id}}),o},removeItem:(s,r)=>{n().update(o=>{const u=o.pages.find(l=>l.id===s);u&&(u.items=u.items.filter(l=>l.id!==r))});const{selection:a}=n();a.itemId===r&&e({selection:{pageId:s,itemId:null}})},moveItem:(s,r,a)=>{n().update(o=>{const u=o.pages.find(m=>m.id===s);if(!u)return;const l=u.items.findIndex(m=>m.id===r),d=l+a;l<0||d<0||d>=u.items.length||([u.items[l],u.items[d]]=[u.items[d],u.items[l]])})},duplicateItem:(s,r)=>{let a=null;n().update(o=>{const u=o.pages.find(d=>d.id===s);if(!u)return;const l=u.items.findIndex(d=>d.id===r);l<0||(a=structuredClone(u.items[l]),a.id=O("it"),u.items.splice(l+1,0,a))}),a&&e({selection:{pageId:s,itemId:a.id}})},updateItem:(s,r,a,o)=>{n().update(u=>{const l=u.pages.find(m=>m.id===s),d=l==null?void 0:l.items.find(m=>m.id===r);d&&Object.assign(d,a)},o)},addVariable:s=>{let r=null;return n().update(a=>{a.variables=a.variables??[];const o=je(a.variables,(s==null?void 0:s.name)??"var_new");r=le({...s,name:o}),a.variables.push(r)}),r},removeVariable:s=>{let r=0;for(const a of n().project.pages)for(const o of a.items)"varId"in o&&o.varId===s&&r++;return r>0?r:(n().update(a=>{a.variables=(a.variables??[]).filter(o=>o.id!==s)}),0)},updateVariable:(s,r,a)=>{n().update(o=>{const u=(o.variables??[]).find(l=>l.id===s);u&&Object.assign(u,r)},a)},addChartBuffer:s=>{let r=null;return n().update(a=>{a.chartBuffers=a.chartBuffers??[];const o=Ue(a.chartBuffers,(s==null?void 0:s.name)??"buf_new");r=Me({...s,name:o}),a.chartBuffers.push(r)}),r},removeChartBuffer:s=>{let r=0;for(const a of n().project.pages)for(const o of a.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===s)&&r++;return r>0?r:(n().update(a=>{a.chartBuffers=(a.chartBuffers??[]).filter(o=>o.id!==s)}),0)},updateChartBuffer:(s,r,a)=>{n().update(o=>{const u=(o.chartBuffers??[]).find(l=>l.id===s);u&&Object.assign(u,r)},a)}}))}Ce();function qe(i){return H(i)}const fe=1,ne=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],de={text:"文本",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},He={text:"T",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},ce={none:"无",value:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回"},We=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class te extends Error{}const Te=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),Ae=new Set(["line","point","bar"]),Ne=new Set(["sine","ramp","noise","none"]);function ae(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function V(i,t){return typeof i=="string"?i:t}function S(i,t){return typeof i=="number"&&Number.isFinite(i)?i:t}const Xe=["text","slider","progress","chart","xbm","textarea","board"],Ze=["number","switch","button","submenu","back"],Ye=["none","value","switch","button","submenu","back"];function Ge(i){if(!ae(i))throw new te("条目格式错误");const t=V(i.kind,"");if(!(Xe.includes(t)||Ze.includes(t)))throw new te(`未知条目类型: ${String(t)}`);const e=structuredClone(i);switch(e.id=V(i.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=V(i.label,""),t){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=V(i.text,""),e.scale=i.scale===2?2:1;break}return e}function Je(i){for(const t of i)for(const e of t.items){const n=e;if(!(n.bind&&ae(n.bind)&&Ye.includes(V(n.bind.type,"none")))){switch(n.kind){case"number":{const s=n.varId??null;n.editable===!1?(n.kind="text",n.displayVarId=s,n.bind={type:"none"}):(n.kind="text",n.displayVarId=null,n.bind={type:"value",varId:s});break}case"switch":n.kind="text",n.displayVarId=null,n.bind={type:"switch",varId:n.varId??null,openValue:S(n.openValue,1),onText:V(n.onText,"on"),offText:V(n.offText,"off")};break;case"button":n.kind="text",n.displayVarId=null,n.bind={type:"button",cbName:V(n.cbName,"btn_cb"),buttonId:S(n.buttonId,1)};break;case"submenu":n.kind="text",n.displayVarId=null,n.bind={type:"submenu",targetPageId:n.targetPageId??null};break;case"back":n.kind="text",n.displayVarId=null,n.bind={type:"back"};break;case"slider":case"progress":n.bind=n.varId?{type:"value",varId:n.varId}:{type:"none"},n.position===void 0&&(n.position=50);break;default:n.bind={type:"none"},n.kind==="text"&&n.displayVarId===void 0&&(n.displayVarId=null);break}delete n.varId,delete n.varName,delete n.varType,delete n.editable,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals,n.kind!=="board"&&(delete n.cbName,delete n.buttonId),delete n.openValue,delete n.onText,delete n.offText,delete n.targetPageId}}}function Qe(i){if(!ae(i))throw new te("页面格式错误");const t=Array.isArray(i.items)?i.items.map(Ge):[];return{id:V(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:V(i.name,"未命名页面"),fnName:V(i.fnName,""),items:t,userCodePre:V(i.userCodePre,"")}}function et(i){if(!ae(i))return null;const t=V(i.type,"int32");return{id:V(i.id,"")||O("vb"),name:V(i.name,""),type:Te.has(t)?t:"int32",initialValue:S(i.initialValue,0),min:S(i.min,0),max:S(i.max,100),step:S(i.step,1)}}function tt(i){if(!ae(i))return null;const t=V(i.sample,"sine");return{id:V(i.id,"")||O("buf"),name:V(i.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(S(i.dataLen,32)))),sample:Ne.has(t)?t:"sine"}}function nt(i){const t=new Map,e=[],n=(s,r)=>{let a=t.get(s);return a||(a=r(),t.set(s,a),e.push(a)),a};for(const s of i)for(const r of s.items){const a=r;switch(r.kind){case"number":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:O("vb"),name:u,type:Te.has(String(a.varType))?String(a.varType):"int32",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));r.varId=l.id}a.editable===void 0&&(r.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:O("vb"),name:u,type:"int",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));r.varId=l.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:O("vb"),name:u,type:"uint8",initialValue:S(a.initialValue,0),min:0,max:1,step:1}));r.varId=l.id}delete a.varName,delete a.initialValue;break}}return e}function he(i){let t;if(typeof i=="string")try{t=JSON.parse(i)}catch{throw new te("JSON 解析失败")}else t=i;if(!ae(t))throw new te("不是有效的工程文件");const e=t,n=S(e.version,0);if(n>fe)throw new te(`工程版本 v${n} 高于当前支持的 v${fe}，请升级编辑器`);const s=Array.isArray(e.pages)?e.pages.map(Qe):[];if(!s.length)throw new te("工程至少需要一个页面");const r=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity",a=new Set(ne.map(d=>d.fn)),o=Array.isArray(e.weakHooks)?[...new Set(e.weakHooks.filter(d=>typeof d=="string"&&a.has(d)))]:[];let u;Array.isArray(e.variables)?u=e.variables.map(et).filter(d=>!!d):u=nt(s);let l;return Array.isArray(e.chartBuffers)?l=e.chartBuffers.map(tt).filter(d=>!!d):l=at(s),Je(s),it(s,l),{version:fe,name:V(e.name,"未命名工程"),width:S(e.width,128),height:S(e.height,64),font:V(e.font,"u8g2_font_wqy12_t_gb2312"),selector:r,selectorLeftMargin:S(e.selectorLeftMargin,16),selectorTopMargin:S(e.selectorTopMargin,0),selectorLineSpacing:S(e.selectorLineSpacing,0),marqueeSpeed:S(e.marqueeSpeed,.2),marqueeHeaderLen:S(e.marqueeHeaderLen,5),weakHooks:o,fontSubset:t.fontSubset===!0,fontExtra:V(t.fontExtra,""),variables:u,chartBuffers:l,pages:s}}function at(i){const t=[];let e=0;const n=()=>{const s={id:O("buf"),name:`buf_chart_${++e}`,dataLen:32,sample:"sine"};return t.push(s),s};for(const s of i)for(const r of s.items){if(r.kind!=="chart")continue;const a=r;if(Array.isArray(a.sources))continue;const o=n();o.dataLen=Math.min(512,Math.max(2,Math.trunc(S(a.dataLen,32))));const u=V(a.sample,"sine");Ne.has(u)&&(o.sample=u);const l=V(a.chartKind,"line"),d={bufferId:o.id,chartKind:Ae.has(l)?l:"line"};a.max!==void 0&&a.max!==null&&(d.max=S(a.max,0)),a.min!==void 0&&a.min!==null&&(d.min=S(a.min,0)),r.sources=[d],a.height===void 0&&(r.height=32),delete a.chartKind,delete a.dataLen,delete a.sample,delete a.max,delete a.min}return t}function it(i,t){const e=new Set(t.map(n=>n.id));for(const n of i)for(const s of n.items){if(s.kind!=="chart")continue;const r=s;Array.isArray(r.sources)||(r.sources=[]),s.sources=s.sources.filter(a=>e.has(a.bufferId)).map(a=>({bufferId:a.bufferId,chartKind:Ae.has(a.chartKind)?a.chartKind:"line",min:a.min,max:a.max})),typeof r.height!="number"&&(r.height=32)}}function Ie(i){return JSON.stringify(i,null,2)}const st={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function Y(i,t="anon"){let e=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||t}function ie(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function J(i){if(!Number.isFinite(i))return"0.0f";const t=i.toString();return/[-.]|e/i.test(t)?`${t}f`:`${t}.0f`}function rt(i,t,e){return e==="ramp"?`${i}[i] = (float)i;`:e==="noise"?`${i}[i] = (float)((i * 37) % ${t});`:`${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function ot(i){const t=new Map;if(!i)return t;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let n;for(;(n=e.exec(i))!==null;)t.set(n[1],n[2]);return t}function q(i,t,e){const n=t.has(i)?t.get(i):"";return`${e}/* USER CODE BEGIN ${i} */${n}${e}/* USER CODE END ${i} */`}const ut=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function lt(i,t,e){const n=[],s=ot((t==null?void 0:t.c)??""),r=i.pages.map((c,w)=>c.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.fnName)?c.fnName:`page_${w}`),a=new Map,o=new Map;for(const c of i.variables??[]){if(!c.name){n.push("存在未命名变量，已跳过");continue}if(a.has(c.name)){n.push(`变量名 "${c.name}" 重复，以第一个为准`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.name)||n.push(`变量名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${Y(c.name)}"`);const w=Y(c.name,"var"),g=c.type==="float"||c.type==="double",I={name:w,srcType:c.type,type:st[c.type],init:g?J(c.initialValue):String(Math.trunc(c.initialValue)),isFloat:g,step:c.step,min:c.min,max:c.max};a.set(w,I),o.set(c.id,I)}const u=new Map,l=new Set,d=[],m=new Map;for(const c of i.chartBuffers??[]){if(!c.name){n.push("存在未命名数据源缓冲区，已跳过");continue}const w=Y(c.name,"buf");if([...m.values()].some(j=>j.name===w)){n.push(`缓冲区名 "${c.name}" 与其它缓冲区重名，已跳过`);continue}const g=Math.max(2,Math.trunc(c.dataLen)),I=`${w.toUpperCase()}_LEN`;m.set(c.id,{name:w,lenMacro:I,len:g});const C=`fill_${w}`,D=(s.get(C)??"").trim()!=="";d.push(`#define ${I} ${g}`,`static float ${w}[${I}];`,`static uint8_t ${w}_filled = 0;`,`static void ${w}_fill(void)`,"{",q(C,s,"    "),...c.sample!=="none"&&!D?[`    for (uint16_t i = 0; i < ${I}; ++i) { ${rt(w,g,c.sample)} }`]:[],"}")}const $=[],b=new Map,v=new Map,y=new Map;{let c=0,w=0;const g=I=>{const C=m.get(I);return C?(y.has(I)||y.set(I,`        if (!${C.name}_filled) { ${C.name}_filled = 1; ${C.name}_fill(); }`),y.get(I)):""};for(const I of i.pages)for(const C of I.items){if(C.kind!=="chart")continue;const D=C.sources.filter(T=>m.has(T.bufferId));if(C.sources.length&&!D.length){n.push(`页面 ${I.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);continue}if(!D.length){n.push(`页面 ${I.name} 的图表条目未绑定数据源，已跳过`);continue}const j=Math.max(4,Math.trunc(C.height)),W=[];for(const T of D){const L=m.get(T.bufferId),_=`chart${c++}`;$.push(`static float ${_}_dis[${L.lenMacro}];`,`static u8g2_chart_t ${_};`),W.push({name:_,s:T,b:L})}if(W.length===1){const{name:T,s:L,b:_}=W[0];$.push(`static uint8_t ${T}_inited = 0;`),b.set(C.id,[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`,`        u8g2_chart_init(&${T}, ${_.name}, ${T}_dis, ${_.lenMacro});`,g(L.bufferId),"    }"]);const M=L.chartKind==="point"?"Point":L.chartKind==="bar"?"Bar":"Line",se=L.min!==void 0&&L.max!==void 0?`${J(L.max)}, ${J(L.min)}`:"0, 0";v.set(C.id,`    u8g2_MenuDrawItem${M}Chart(&${T}, ${j}, ${se});`)}else{const T=`chart_layers_${w++}`;$.push(`static u8g2_menu_drawChart_t ${T}[${W.length}];`,`static uint8_t ${T}_inited = 0;`);const L=[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`];W.forEach(({name:_,s:M,b:se},re)=>{L.push(`        u8g2_chart_init(&${_}, ${se.name}, ${_}_dis, ${se.lenMacro});`),L.push(g(M.bufferId));const Be=M.chartKind==="point"?"u8g2_drawPointChart":M.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",ke=M.min!==void 0&&M.max!==void 0?`${J(M.max)}, ${J(M.min)}`:"0, 0";L.push(`        ${T}[${re}].drawChart = ${Be};`),L.push(`        ${T}[${re}].chart = &${_};`),L.push(`        ${T}[${re}].max = ${ke.split(", ")[0]};`),L.push(`        ${T}[${re}].min = ${ke.split(", ")[1]};`)}),L.push("    }"),b.set(C.id,L),v.set(C.id,`    u8g2_MenuDrawItemChart(${T}, ${W.length}, ${j});`)}}}const x=[],h=[],E=[],P=new Set,F=new Map;let z=0;for(const c of i.pages)for(const w of c.items){if(w.bind.type==="button"){const g=Y(w.bind.cbName,"btn_cb");u.has(g)||u.set(g,w.bind.buttonId)}switch(w.kind){case"board":l.add(Y(w.cbName,"board_cb"));break;case"xbm":{let g=Y(w.name,"icon");for(;P.has(g);)g=`${g}_2`;P.add(g),F.set(w.id,g);const I=w.bits.length,C=w.bits.map(D=>`0x${(D&255).toString(16).padStart(2,"0")}`).join(", ");x.push(`static const uint8_t menu_xbm_${g}[${I}] = { ${C} };`);break}case"textarea":{const g=z++;h.push(`static char ta${g}_text[] = "${ie(w.content)}";`,`static u8g2_menu_textArea_t ta${g};`,`static uint8_t ta${g}_inited = 0;`),E.push(`    if (!ta${g}_inited) {`,`        ta${g}_inited = 1;`,`        u8g2_textArea_init(&ta${g}, ta${g}_text);`,`        u8g2_textArea_setLineSpacing(&ta${g}, ${Math.max(0,Math.trunc(w.lineSpacing))});`,"    }");break}}}const Z=(c,w)=>{if(!c)return"";const g=`"${ie(c)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${g});`:`u8g2_MenuUTF8Printf(${g});`},A=(c,w,g)=>{const I=`"${ie(c)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${I}, ${g});`:`u8g2_MenuUTF8Printf(${I}, ${g});`};let N=0;const k=(c,w)=>{const g=[],I=`${w.name}`,C=_=>{if(!_)return null;const M=o.get(_);return M||n.push(`页面 ${I} 的条目引用了已删除的变量，已按普通文本生成`),M??null},D=c.bind;let j=null,W=null,T="on",L="off";switch(D.type){case"value":{const _=C(D.varId);if(_){j=_;const M=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${J(_.step)}, ${J(_.min)}, ${J(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;g.push(`    ${M}`)}break}case"switch":{const _=C(D.varId);_&&_.srcType!=="uint8"?n.push(`开关附加值绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`):_&&(W=_,T=D.onText,L=D.offText,g.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(D.openValue)});`));break}case"button":{const _=Y(D.cbName,"btn_cb");g.push(`    u8g2_MenuItem_button(${_}, ${Math.trunc(D.buttonId)});`);break}case"submenu":{const _=i.pages.findIndex(M=>M.id===D.targetPageId);!D.targetPageId||_<0?n.push(`页面 ${I} 的条目 "${c.label||"未命名"}" 附加值目标页面无效，已按普通文本生成`):g.push(`    u8g2_MenuItem_menu_enter(${r[_]});`);break}case"back":g.push("    u8g2_MenuItem_menu_back();");break}switch(c.kind){case"text":{if(j)g.push(`    ${A(c.text,c.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||n.push(`页面 ${I} 的数值附加值条目显示文本不含格式化占位符（如 %d）`);else if(W)g.push(`    ${A(c.text,c.scale,`${W.name} ? "${ie(T)}" : "${ie(L)}"`)}`),/%[-+ #0]*s/.test(c.text)||n.push("开关附加值条目的显示文本建议包含 %s 用于显示 on/off");else if(D.type==="none"&&c.displayVarId){const _=C(c.displayVarId);if(_)g.push(`    ${A(c.text,c.scale,_.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||n.push(`页面 ${I} 的显示条目文本不含格式化占位符（如 %d）`);else{n.push(`页面 ${I} 的显示条目引用了已删除的变量，已按普通文本生成`);const M=Z(c.text,c.scale);M&&g.push(`    ${M}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(c.text)){n.push(`页面 ${I} 的文本条目含占位符但未绑定变量/显示变量，占位符已移除`);const _=Z(c.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),c.scale);_&&g.push(`    ${_}`)}else{const _=Z(c.text,c.scale);_&&g.push(`    ${_}`)}break}case"slider":case"progress":{const _=c.kind==="slider"?"Slider":"ProgressBar";if(j){if(!ut.has(j.srcType)){n.push(`滑块/进度条附加值的变量 "${j.name}" 须为整型（当前 ${j.srcType}），已按静态显示生成`),g.push(`    u8g2_MenuDrawItem${_}(${(c.position/100).toFixed(2)}f);`);break}g.push(`    u8g2_MenuDrawItem${_}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{const M=Math.min(100,Math.max(0,c.position));g.push(`    u8g2_MenuDrawItem${_}(${(M/100).toFixed(2)}f);`)}break}case"chart":{const _=b.get(c.id),M=v.get(c.id);if(!_||!M)break;g.push(..._),g.push(M);break}case"xbm":g.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${F.get(c.id)??Y(c.name,"icon")});`);break;case"textarea":{const _=N++;g.push(...E[_].split(`
`));const M=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";g.push(`    ${M}(&ta${_}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{const _=Y(c.cbName,"board_cb");g.push(`    u8g2_MenuDrawItemBoard(${_}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return g},f=[];f.push("/**"),f.push(` * 由 u8g2-menu-editor 自动生成，工程: ${i.name}`),f.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),f.push(" *"),f.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："),f.push(` *   u8g2_SetFont(&u8g2, ${e?"menu_font":i.font});`),r.forEach((c,w)=>f.push(` *   void ${c}(void);   /* 页面: ${i.pages[w].name} */`));for(const c of a.values())f.push(` *   extern ${c.type} ${c.name};`);for(const[c]of u)f.push(` *   void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(const c of l)f.push(` *   void ${c}(u8g2_t *u8g2);`);f.push(" */"),f.push('#include "u8g2_menu.h"'),(i.chartBuffers??[]).some(c=>c.sample==="sine")&&f.push("#include <math.h>"),f.push(""),f.push(q("includes",s,"")),f.push(""),r.forEach(c=>f.push(`void ${c}(void);`)),f.push(""),f.push("/* ======================== 变量定义 ======================== */"),f.push(q("variables",s,""));for(const c of a.values())f.push(`${c.type} ${c.name} = ${c.init};`);if(f.push(""),e){f.push("/* ======================== 字体（现场取模） ======================== */"),f.push("/* 仅包含工程文本用到的字形（含 ASCII 95 个 + 额外字符），"),f.push(" * main.c 里 u8g2_SetFont(&u8g2, menu_font) 即可使用；"),f.push(' * 若运行时输出超出此字符集的中文，请在编辑器"额外包含字符"里补充后重新生成。 */');const c=[];for(let w=0;w<e.length;w+=16)c.push("  "+[...e.slice(w,w+16)].map(g=>`0x${g.toString(16).padStart(2,"0")}`).join(", ")+",");f.push(`const uint8_t menu_font[${e.length}] U8G2_FONT_SECTION("menu_font") = {`),f.push(...c),f.push("};"),f.push("")}if((d.length||$.length||h.length||x.length)&&(f.push("/* ======================== 页面资源 ======================== */"),f.push(...d,...$,...h,...x),f.push("")),u.size||l.size){f.push("/* ======================== 回调函数 ======================== */"),f.push(q("callbacks",s,""));for(const[c]of u)f.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID)`),f.push("{"),f.push(q(`cb_${c}`,s,"    ")),f.push("}"),f.push("");for(const c of l)f.push(`void ${c}(u8g2_t *u8g2)`),f.push("{"),f.push(q(`cb_${c}`,s,"    ")),f.push("}"),f.push("")}const K=(i.weakHooks??[]).map(c=>ne.find(w=>w.fn===c)).filter(c=>!!c);if(K.length||s.has("weak")||ne.some(c=>(s.get(`weak_${c.fn}`)??"").trim())){f.push("/* ==================== 弱定义函数重写 ==================== */"),f.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),f.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const w=ne.filter(g=>{var I;return!((I=i.weakHooks)!=null&&I.includes(g.fn))&&(s.get(`weak_${g.fn}`)??"").trim()}).map(g=>[`#if 0   /* 已取消勾选 ${g.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${g.decl}`,"{",q(`weak_${g.fn}`,s,"    "),"}","#endif"].join(`
`)).join(`
`);f.push(w?`${q("weak",s,"").replace(/\n$/,"")}
${w}
`:q("weak",s,"")),f.push("");for(const g of K){f.push(`/* ${g.label}: ${g.desc} */`),f.push(`${g.decl}`),f.push("{"),f.push(q(`weak_${g.fn}`,s,"    "));const I=g.bodyArgs.split(`
`).map(C=>`    ${C}`);g.retNote&&I.push(`    ${g.retNote}`),f.push(...I),f.push("}"),f.push("")}}return f.push("/* ======================== 页面函数 ======================== */"),f.push(""),i.pages.forEach((c,w)=>{f.push(`/* 页面: ${c.name} */`),f.push(`void ${r[w]}(void)`),f.push("{"),f.push(q(`page_${r[w]}_pre`,s,"    "));for(const g of c.items)f.push(...k(g,c));f.push("}"),f.push("")}),{c:`${f.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:n}}function ct(i){return{raw:i.slice(0,23),glyphCnt:i[0],startUpperA:i[17]<<8|i[18],startLowerA:i[19]<<8|i[20],startUnicode:i[21]<<8|i[22]}}function Ve(i,t,e){const n=[],s=[],r=[],a=[...t].sort((v,y)=>v-y);for(const v of a){const y=e(v);if(!y||!y.length){r.push(v);continue}v<=255?n.push({encoding:v,entry:y}):s.push({encoding:v,entry:y})}if(!n.length&&!s.length)return null;const o=n.length+s.length;let u=0;for(const v of n)u+=v.entry.length;u+=2;let l=4;for(const v of s)l+=v.entry.length;l+=2;const d=ct(i),m=new Uint8Array(23+u+l);m.set(d.raw,0),m[0]=o,m[17]=0,m[18]=0,m[19]=0,m[20]=0,m[21]=0,m[22]=0;let $=23;for(const v of n){if(v.encoding===65){const y=$-23;m[17]=y>>8&255,m[18]=y&255}if(v.encoding===97){const y=$-23;m[19]=y>>8&255,m[20]=y&255}m.set(v.entry,$),$+=v.entry.length}m[$]=0,m[$+1]=0,$+=2;const b=$-23;m[21]=b>>8&255,m[22]=b&255,m[$]=0,m[$+1]=4,m[$+2]=255,m[$+3]=255,$+=4;for(const v of s)m.set(v.entry,$),$+=v.entry.length;return m[$]=0,m[$+1]=0,{font:m,included:o,missing:r}}function dt(i){return[...i].map(t=>t.codePointAt(0)).filter(t=>Number.isFinite(t))}function mt(){const i=[];for(let t=32;t<=126;t++)i.push(t);return i}function we(i,t){const e=new Set(mt()),n=s=>{for(const r of dt(s))e.add(r)};for(const s of i.pages)for(const r of s.items)r.kind==="text"&&n(r.text),r.kind==="textarea"&&n(r.content),r.bind.type==="switch"&&(n(r.bind.onText),n(r.bind.offText));return n(t),e.delete(10),e.delete(13),e}function Pe(i){let t=0,e=0;for(const n of i)n<=126?t++:e++;return{total:i.size,ascii:t,cjk:e}}var U=(i=>(i[i.None=0]="None",i[i.Up=1]="Up",i[i.Down=2]="Down",i[i.Enter=3]="Enter",i[i.Return=4]="Return",i[i.Add=5]="Add",i[i.Sub=6]="Sub",i))(U||{});const pt=8192/8;function ft(i){return new Promise((t,e)=>{const n=document.createElement("script");n.src=i,n.onload=()=>t(),n.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${i}`)),document.head.appendChild(n)})}class ht{constructor(t,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.fontSig=null,this.lastKnownPage=0,this.fontApplyWarning=null,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(t){if(this.mod)return;const e=window;e.U8G2MenuPreview||await ft(t);const n=e.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await n({locateFile:r=>t.replace(/[^/\\]*$/,"")+r}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const s=this.mod._em_font_count_export();for(let r=0;r<s;r++){const a=this.mod._em_font_name(r);this.fontIndexCache.set(this.mod.UTF8ToString(a),r)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(t){return this.fontIndexCache.get(t)??0}signature(t){return JSON.stringify({bufs:(t.chartBuffers??[]).map(e=>`${e.name}|${e.dataLen}|${e.sample}`),pages:t.pages.map(e=>({n:e.items.length,k:e.items.map(n=>n.kind).join(","),res:e.items.map(n=>n.kind==="chart"?(n.sources??[]).map(s=>`${s.bufferId}|${s.chartKind}|${s.min??"a"}|${s.max??"a"}`).join(">"):n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")}))})}sync(t){const e=this.mod;if(!e)return;const n=this.signature(t);n!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);const s=d=>Math.trunc(Number.isFinite(d)?d:0),r={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},a={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},l=d=>d?(t.variables??[]).findIndex(m=>m.id===d):-1;if((t.variables??[]).forEach((d,m)=>{e.ccall("em_var_define",null,["number","number","number","number","number","number"],[m,r[d.type],s(d.initialValue),s(d.step),s(d.min),s(d.max)])}),(t.chartBuffers??[]).forEach((d,m)=>{e.ccall("em_buf_define",null,["number","number","number"],[m,s(d.dataLen),u[d.sample]])}),t.pages.forEach((d,m)=>{e.ccall("em_page_begin",null,["number"],[m]),d.items.forEach(($,b)=>{const v=()=>{const y=$.bind;if(y.type==="none")return;const x=y.type==="value"||y.type==="switch",h=x?(t.variables??[]).find(E=>E.id===y.varId):void 0;e.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[m,b,o[y.type],x&&h?r[h.type]:0,y.type==="switch"?s(y.openValue):0,y.type==="button"?s(y.buttonId):0,y.type==="submenu"?t.pages.findIndex(E=>E.id===y.targetPageId):-1,x&&h?l(h.id):-1])};switch($.kind){case"text":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,b,a.text,$.scale,0,0,0,$.displayVarId?l($.displayVarId):-1,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,b,$.text]),v();break;case"slider":case"progress":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,b,a[$.kind],1,0,0,0,-1,-1]),v();break;case"chart":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,b,a.chart,1,s($.height),0,0,-1,-1]);for(const y of $.sources??[])e.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[m,b,(t.chartBuffers??[]).findIndex(x=>x.id===y.bufferId),{line:0,point:1,bar:2}[y.chartKind],y.min!==void 0&&y.max!==void 0?1:0,y.max??0,y.min??0]);v();break;case"xbm":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,b,a.xbm,1,0,s($.w),s($.h),-1,-1]);{const y=e._em_scratch($.bits.length);y&&(e.HEAPU8.set(new Uint8Array($.bits),y),e._em_item_bits(m,b,y,$.bits.length))}v();break;case"textarea":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,b,a.textarea,1,s($.height),0,0,-1,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,b,$.content]),v();break;case"board":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,b,a.board,1,0,s($.w),s($.h),-1,-1]),v();break}}),e.ccall("em_page_end",null,["number","number"],[m,d.items.length])}),e.ccall("em_pages_commit",null,["number"],[t.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(t.font),{default:0,rotundity:1,square:2}[t.selector],s(t.selectorLeftMargin),s(t.selectorTopMargin),s(t.selectorLineSpacing),t.marqueeSpeed,t.marqueeHeaderLen]),t.fontSubset){const d=we(t,t.fontExtra),m=t.font+"|"+[...d].sort(($,b)=>$-b).join(",");m!==this.fontSig&&(this.fontSig=m,this.applyFontSubset(this.fontIndex(t.font),d))}else this.fontSig!==null&&(this.fontSig=null,this.fontApplyWarning=null)}applyFontSubset(t,e){this.fontApplyWarning=null;const n=this.getFontBytes(t),s=this.glyphFetcher(t),r=n&&s?Ve(n,e,s):null;if(!r){this.fontApplyWarning="现场取模未命中任何字形，预览使用内置字体";return}this.useCustomFont(r.font)||(this.fontApplyWarning=`子集字体 ${r.font.length} 字节超过预览槽位容量，预览已回退全字库（导出的 menu_font 数组不受影响）`)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const t=e=>{if(!this.running)return;const n=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(n),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(t){var o,u;const e=this.mod;if(!e)return;const n=e._em_frame(t);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));const s=e.HEAPU8.subarray(n,n+pt),r=this.img.data;r.fill(255);for(let l=0;l<64;l++){const d=(l>>3)*128,m=1<<(l&7);let $=l*128*4;for(let b=0;b<128;b++)s[d+b]&m&&(r[$]=17,r[$+1]=24,r[$+2]=39),$+=4}this.ctx.putImageData(this.img,0,0);const a=e._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,(u=(o=this.events).onPageChanged)==null||u.call(o,a))}key(t){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[t])}navTo(t){var e;(e=this.mod)==null||e.ccall("em_nav",null,["number"],[t])}getFontBytes(t){const e=this.mod;if(!e)return null;const n=e.ccall("em_font_data","number",["number"],[t]),s=e.ccall("em_font_data_len","number",["number"],[t]);return!n||!s?null:e.HEAPU8.slice(n,n+s)}glyphFetcher(t){const e=this.mod;return e?n=>{const s=e.ccall("em_scratch","number",["number"],[64]),r=e.ccall("em_font_glyph","number",["number","number","number","number"],[t,n,64,s]);return r?e.HEAPU8.slice(s,s+r):null}:null}useCustomFont(t){const e=this.mod;if(!e)return!1;const n=e.ccall("em_custom_font_ptr","number",[],[]),s=e.ccall("em_custom_font_max","number",[],[]);return t.length>s?!1:(e.HEAPU8.set(t,n),e.ccall("em_set_custom_font",null,["number"],[t.length]),!0)}getInt(t){var e;return((e=this.mod)==null?void 0:e._em_get_ipool(t))??0}getSwitch(t){var e;return((e=this.mod)==null?void 0:e._em_get_upool(t))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const bt=Object.keys(de);function gt(i,t,e,n){const s=i.getState(),r=e.label||"text"in e&&e.text||de[e.kind],a=e.bind.type!=="none"?` · ${ce[e.bind.type]}`:"",o=u=>l=>{l.stopPropagation(),i.getState().moveItem(t.id,e.id,u)};return p.html`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>i.getState().select(t.id,e.id)}>
    <span class="ume-item-icon">${He[e.kind]}</span>
    <span class="ume-item-name" title=${r+a}>${r}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),s.duplicateItem(t.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),s.removeItem(t.id,e.id)}}>✕</button>
  </div>`}function vt(i,t){const e=i.getState();return p.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{const s=n.target.value;s&&e.addItem(s,t.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${bt.map(n=>p.html`<option value=${n}>${de[n]}</option>`)}
  </select>`}function xt(i,t){const{project:e,selection:n}=t.getState(),s=r=>{const a=t.getState(),o=n.pageId===r.id;return p.html`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>t.getState().select(r.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${r.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),a.movePage(r.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),a.movePage(r.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${r.name}"？`)&&a.removePage(r.id)}}>✕</button>
      </div>
      ${o?p.html`<div class="ume-page-items">
        ${r.items.length?r.items.map(u=>gt(t,r,u,n.itemId===u.id)):p.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${vt(t,r)}</div>
      </div>`:p.nothing}
    </div>`};p.render(p.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>$t(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(s)}
  `,i)}function $t(i){const t=prompt("页面名称:",`页面${i.getState().project.pages.length+1}`);t!==null&&i.getState().addPage(t||void 0)}function R(i,t,e,n=""){return p.html`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${t??""} placeholder=${n}
      @change=${s=>e(s.target.value)} />
  </div>`}function B(i,t,e,n=1){return p.html`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(t)} step=${String(n)}
      @change=${s=>{const r=parseFloat(s.target.value);e(Number.isFinite(r)?r:0)}} />
  </div>`}function X(i,t,e,n){return p.html`<div class="ume-field">
    <label>${i}</label>
    <select @change=${s=>n(s.target.value)}>
      ${e.map(s=>p.html`<option value=${s.value} ?selected=${s.value===t}>${s.label}</option>`)}
    </select>
  </div>`}function _e(i,t,e){return p.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${n=>e(n.target.checked)} />
    <span>${i}</span>
  </div>`}function _t(i,t,e,n=!1){return p.html`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${s=>e(s.target.value)}>${t??""}</textarea>
  </div>`}function ye(i,t,e="text/plain"){const n=new Blob([t],{type:`${e};charset=utf-8`}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download=i,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),5e3)}let be=null;const Le={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function ge(i,t,e,n){const s=[{value:"",label:"（未绑定）"},...e.map(a=>({value:a.id,label:`${a.name} : ${Le[a.type]??a.type}`}))],r=t?e.some(a=>a.id===t):!1;return p.html`
    ${X(i,t??"",s,a=>n(a||null))}
    ${t&&!r?p.html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:p.nothing}
    ${e.length===0?p.html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:p.nothing}
  `}function ve(i,t){return p.html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{const e=i.getState().addVariable();t(e)}}>＋ 新建变量并绑定</button>
  </div>`}function xe(i){return i?p.html`<div class="ume-hint">
    ${i.name} : ${Le[i.type]??i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>`:p.html`${p.nothing}`}function yt(i,t,e){const{project:n,selection:s}=t.getState(),r=n.pages.find(b=>b.id===s.pageId)??null,a=(r==null?void 0:r.items.find(b=>b.id===s.itemId))??null,o=n.variables??[],u=n.chartBuffers??[],l=(b,v)=>t.getState().updateItem(r.id,a.id,b,v),d=b=>l({bind:b});let m=p.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,$="";if(r&&!a)$="页面属性",m=p.html`
      ${R("名称",r.name,b=>t.getState().updatePage(r.id,{name:b}))}
      ${R("C 函数名",r.fnName,b=>t.getState().updatePage(r.id,{fnName:b}),"留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(r&&a){(a.bind.type==="value"||a.bind.type==="switch")&&a.bind.varId&&(be=a.bind.varId),$=`${de[a.kind]}${a.bind.type!=="none"?` + ${ce[a.bind.type]}`:""}`;let b=p.html``;switch(a.kind){case"text":{const x=a,h=o.find(E=>E.id===x.displayVarId);b=p.html`
          ${R("文本/格式",x.text,E=>l({text:E},`text-${x.id}`))}
          ${X("大小",String(x.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],E=>l({scale:Number(E)}))}
          ${a.bind.type==="none"?p.html`
            ${ge("显示变量",x.displayVarId,o,E=>l({displayVarId:E}))}
            ${h?p.nothing:ve(t,E=>l({displayVarId:E.id}))}
            ${xe(h)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:p.nothing}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{const x=a;b=p.html`
          ${a.bind.type==="none"?p.html`
            ${B("静态位置(%)",x.position,h=>l({position:Math.min(100,Math.max(0,Math.trunc(h)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:p.nothing}
        `;break}case"chart":{const x=a,h=P=>l({sources:P}),E=(P,F)=>{const z=u.find(A=>A.id===P.bufferId),Z=P.min===void 0||P.max===void 0;return p.html`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(z==null?void 0:z.name)??"(无效)"}</span>
              <span class="ume-var-meta">${{line:"折线",point:"散点",bar:"柱状"}[P.chartKind]??P.chartKind}${Z?" · 自动量程":` · ${P.min}~${P.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>h(x.sources.filter((A,N)=>N!==F))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${X("缓冲区",P.bufferId,u.map(A=>({value:A.id,label:`${A.name} (${A.dataLen}点)`})),A=>h(x.sources.map((N,k)=>k===F?{...N,bufferId:A}:N)))}
              ${X("绘制",P.chartKind,[{value:"line",label:"折线"},{value:"point",label:"散点"},{value:"bar",label:"柱状"}],A=>h(x.sources.map((N,k)=>k===F?{...N,chartKind:A}:N)))}
              ${_e("自动量程",Z,A=>h(x.sources.map((N,k)=>k===F?{...N,min:A?void 0:0,max:A?void 0:100}:N)))}
              ${Z?p.nothing:p.html`
                ${B("量程上限",P.max??100,A=>h(x.sources.map((N,k)=>k===F?{...N,max:A}:N)),"any")}
                ${B("量程下限",P.min??0,A=>h(x.sources.map((N,k)=>k===F?{...N,min:A}:N)),"any")}`}
            </div>
          </div>`};b=p.html`
          ${B("高度(px)",x.height,P=>l({height:Math.max(4,Math.trunc(P))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(x.sources??[]).map(E)}
              ${(x.sources??[]).length===0?p.html`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:p.nothing}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(x.sources??[]).length>=4}
                @click=${()=>{if(!u.length){const P=t.getState().addChartBuffer();h([...x.sources??[],{bufferId:P.id,chartKind:"line"}]);return}h([...x.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(x.sources??[]).length>0?"（叠加）":""}</button>
              ${u.length?p.nothing:p.html`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{const x=a;b=p.html`
          ${R("数组名",x.name,h=>l({name:h}))}
          ${B("宽(px)",x.w,h=>l({w:Math.min(128,Math.max(1,Math.trunc(h)))}))}
          ${B("高(px)",x.h,h=>l({h:Math.min(64,Math.max(1,Math.trunc(h)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(r.id,x.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${x.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const x=a;b=p.html`
          ${_t("文本内容",x.content,h=>l({content:h}))}
          ${B("高度(px)",x.height,h=>l({height:Math.max(10,Math.trunc(h))}))}
          ${B("行间距",x.lineSpacing,h=>l({lineSpacing:Math.max(0,Math.trunc(h))}))}
          ${_e("上下键滚动 (bind)",x.bindScroll,h=>l({bindScroll:h}))}
        `;break}case"board":{const x=a;b=p.html`
          ${B("宽(px)",x.w,h=>l({w:Math.max(1,Math.trunc(h))}))}
          ${B("高(px)",x.h,h=>l({h:Math.max(1,Math.trunc(h))}))}
          ${R("回调函数名",x.cbName,h=>l({cbName:h}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}const v=a.bind;let y=p.html``;switch(v.type){case"none":y=p.html`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{const x=o.find(h=>h.id===v.varId);y=p.html`
          ${ge("变量",v.varId,o,h=>d({type:"value",varId:h}))}
          ${x?p.nothing:ve(t,h=>d({type:"value",varId:h.id}))}
          ${xe(x)}
          ${a.kind==="text"?p.html`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:p.nothing}
        `;break}case"switch":{const x=o.filter(h=>h.type==="uint8").find(h=>h.id===v.varId)??o.find(h=>h.id===v.varId);y=p.html`
          ${ge("变量 (uint8)",v.varId,o.filter(h=>h.type==="uint8"),h=>d({type:"switch",varId:h,openValue:v.openValue,onText:v.onText,offText:v.offText}))}
          ${x?p.nothing:ve(t,h=>d({type:"switch",varId:h.id,openValue:v.openValue,onText:v.onText,offText:v.offText}))}
          ${xe(x)}
          ${B("openValue",v.openValue,h=>d({type:"switch",varId:v.varId,openValue:Math.max(0,Math.trunc(h)),onText:v.onText,offText:v.offText}))}
          ${R('"开"文本',v.onText,h=>d({type:"switch",varId:v.varId,openValue:v.openValue,onText:h,offText:v.offText}))}
          ${R('"关"文本',v.offText,h=>d({type:"switch",varId:v.varId,openValue:v.openValue,onText:v.onText,offText:h}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":y=p.html`
          ${R("回调函数名",v.cbName,x=>d({type:"button",cbName:x,buttonId:v.buttonId}))}
          ${B("ID",v.buttonId,x=>d({type:"button",cbName:v.cbName,buttonId:Math.trunc(x)}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":y=p.html`
          ${X("目标页面",v.targetPageId??"",[{value:"",label:"（未设置）"},...n.pages.filter(x=>x.id!==r.id).map(x=>({value:x.id,label:x.name}))],x=>d({type:"submenu",targetPageId:x||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":y=p.html`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}m=p.html`
      <div class="ume-panel-title">绘制</div>
      ${b}
      <div class="ume-panel-title">附加值</div>
      ${X("类型",v.type,Object.keys(ce).map(x=>({value:x,label:ce[x]})),x=>{const h=a.bind;d(x==="value"?{type:"value",varId:h.type==="value"||h.type==="switch"?h.varId:be}:x==="switch"?{type:"switch",varId:h.type==="value"||h.type==="switch"?h.varId:be,openValue:1,onText:"on",offText:"off"}:x==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:x==="submenu"?{type:"submenu",targetPageId:h.type==="submenu"?h.targetPageId:null}:{type:"none"})})}
      ${y}
    `}p.render(p.html`
    ${$?p.html`<div class="ume-panel-title"><span class="ume-kind-badge">${$}</span></div>`:p.nothing}
    ${m}
  `,i)}let ue=null,$e=null;const wt=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (小数)"},{value:"double",label:"double (小数)"}];function kt(i,t){const e=t.variables??[],n=r=>{ue=ue===r?null:r},s=r=>{const a=ue===r.id,o=(m,$)=>i.getState().updateVariable(r.id,m,$),u=r.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name),l=e.filter(m=>m.name===r.name).length>1,d=It(t,r.id);return p.html`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(r.id)}>
        <span class="ume-var-name" title=${r.name}>${r.name||"(未命名)"}</span>
        <span class="ume-var-meta">${r.type} · ${r.min}~${r.max} · 步${r.step}${d?` · ${d} 处引用`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${m=>{m.stopPropagation();const $=i.getState().removeVariable(r.id);$>0&&alert(`该变量被 ${$} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`)}}>✕</button>
      </div>
      ${a?p.html`<div class="ume-var-edit">
        ${R("变量名",r.name,m=>o({name:m.trim()},`vn-${r.id}`))}
        ${u?p.html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:p.nothing}
        ${l?p.html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:p.nothing}
        ${X("类型",r.type,wt,m=>o({type:m}))}
        ${B("初始值",r.initialValue,m=>o({initialValue:m},`vi-${r.id}`),"any")}
        ${B("最小值",r.min,m=>o({min:m},`vmin-${r.id}`),"any")}
        ${B("最大值",r.max,m=>o({max:m},`vmax-${r.id}`),"any")}
        ${B("步长",r.step,m=>o({step:m},`vs-${r.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:p.nothing}
    </div>`};return p.html`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{ue=i.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(s):p.html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function It(i,t){let e=0;for(const n of i.pages)for(const s of n.items)"varId"in s&&s.varId===t&&e++;return e}function St(i,t){const e=t.chartBuffers??[],n=r=>{let a=0;for(const o of t.pages)for(const u of o.items)u.kind==="chart"&&u.sources.some(l=>l.bufferId===r)&&a++;return a},s=r=>{const a=$e===r.id,o=(d,m)=>i.getState().updateChartBuffer(r.id,d,m),u=r.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name),l=n(r.id);return p.html`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>{$e=a?null:r.id}}>
        <span class="ume-var-name" title=${r.name}>${r.name||"(未命名)"}</span>
        <span class="ume-var-meta">${r.dataLen} 点 · ${{sine:"正弦",ramp:"斜坡",noise:"伪随机",none:"手动填充"}[r.sample]}${l?` · ${l} 处引用`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${d=>{d.stopPropagation();const m=i.getState().removeChartBuffer(r.id);m>0&&alert(`该缓冲区被 ${m} 个图表条目的数据源引用，请先在条目里移除数据源再删除`)}}>✕</button>
      </div>
      ${a?p.html`<div class="ume-var-edit">
        ${R("数组名",r.name,d=>o({name:d.trim()},`bn-${r.id}`))}
        ${u?p.html`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:p.nothing}
        ${B("点数",r.dataLen,d=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(d)))},`bl-${r.id}`))}
        ${X("示例填充",r.sample,[{value:"sine",label:"正弦（演示）"},{value:"ramp",label:"斜坡（演示）"},{value:"noise",label:"伪随机（演示）"},{value:"none",label:"不填充（全部手写）"}],d=>o({sample:d}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:p.nothing}
    </div>`};return p.html`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{$e=i.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(s):p.html`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Et(i,t){const{project:e}=t.getState();p.render(p.html`
    ${kt(t,e)}
    ${St(t,e)}
  `,i)}function Mt(i,t){const{project:e}=t.getState(),n=(o,u)=>t.getState().update(l=>{Object.assign(l,o)},u),s=e.weakHooks??[],r=(o,u)=>{t.getState().update(l=>{const d=l.weakHooks??[];l.weakHooks=u?[...new Set([...d,o])]:d.filter(m=>m!==o)})},a=p.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${s.length}/${ne.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${ne.map(o=>p.html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote?"（返回 1 = 事件已处理 / 0 = 交给库）":""}`}>
              <input type="checkbox" ?checked=${s.includes(o.fn)}
                @change=${u=>r(o.fn,u.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;p.render(p.html`
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
    ${X("字体",e.font,We.map(o=>({value:o.id,label:o.label})),o=>n({font:o}))}
    ${_e("中文现场取模（仅包含用到的字形）",e.fontSubset,o=>n({fontSubset:o}))}
    ${e.fontSubset?p.html`
      ${R("额外包含字符",e.fontExtra,o=>n({fontExtra:o}))}
      ${(()=>{const o=Pe(we(e,e.fontExtra));return p.html`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:p.nothing}
    ${X("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],o=>n({selector:o}))}
    ${B("左边距",e.selectorLeftMargin,o=>n({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${B("顶边距",e.selectorTopMargin,o=>n({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${B("行间距",e.selectorLineSpacing,o=>n({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${B("跑马灯速度",e.marqueeSpeed,o=>n({marqueeSpeed:o}),.05)}
    ${B("跑马灯停留",e.marqueeHeaderLen,o=>n({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `,i)}function Ct(i,t){const e=s=>{let r;const a=()=>{r&&(clearInterval(r),r=void 0)};return{down:o=>{o.preventDefault(),t.key(s),a(),r=window.setInterval(()=>t.key(s),180)},up:a}},n=(s,r,a)=>{const o=e(s);return p.html`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${r}</button>`};p.render(p.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${s=>{const a={ArrowUp:U.Up,ArrowDown:U.Down,Enter:U.Enter,Escape:U.Return,Backspace:U.Return,"+":U.Add,"-":U.Sub,"=":U.Add,_:U.Sub}[s.key];a!==void 0&&(s.preventDefault(),t.key(a))}}>
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
  `,i)}let ee=null;function Tt(i,t){ee=t,i.querySelectorAll(":scope > .ume-modal-mask").forEach(e=>e.remove()),At(i)}function At(i){if(!ee)return;const t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",e=>{e.target===t&&Se(t)}),p.render(p.html`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Se(t)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${ee.warnings.length?p.html`
          <div style="margin-bottom:8px">
            ${ee.warnings.map(e=>p.html`<div class="ume-warn">⚠ ${e}</div>`)}
          </div>`:p.nothing}
        <div class="ume-code-view">${ee.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(ee.c).then(()=>Nt(t,"已复制到剪贴板"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{ye("menu_pages.c",ee.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,t),i.appendChild(t)}function Se(i){i.remove()}function Nt(i,t){const e=i.closest(".ume")??document.body;let n=e.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",e.appendChild(n)),n.textContent=t,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function Vt(i,t,e,n){const r=t.getState().project.pages.find(k=>k.id===e),a=r==null?void 0:r.items.find(k=>k.id===n);if(!a||a.kind!=="xbm")return;const o=a;let u=o.w,l=o.h,d=[...o.bits];const m=()=>Math.ceil(u/8),$=document.createElement("div");$.className="ume-modal-mask",$.addEventListener("click",k=>{k.target===$&&N()});const b=(k,f)=>{const K=f*m()+(k>>3);return K<d.length?!!(d[K]>>(k&7)&1):!1},v=(k,f,K)=>{const Q=f*m()+(k>>3);d[Q]=K?d[Q]|1<<(k&7):d[Q]&~(1<<(k&7))},y=(k,f)=>{const K=Math.ceil(u/8),Q=Math.ceil(k/8),c=new Array(Q*f).fill(0);for(let w=0;w<Math.min(l,f);w++)for(let g=0;g<Math.min(u,k);g++){const I=w*K+(g>>3);I<d.length&&d[I]>>(g&7)&1&&(c[w*Q+(g>>3)]|=1<<(g&7))}u=k,l=f,d=c};let x=!1,h=!0;const E=(k,f)=>K=>{K.preventDefault(),x=!0,h=!b(k,f),v(k,f,h),z()},P=(k,f)=>()=>{x&&(v(k,f,h),z())},F=()=>{x=!1},z=()=>{p.render(A(),$)},Z=()=>{const k=[];for(let f=0;f<l;f++)for(let K=0;K<u;K++)k.push(p.html`<button class="ume-xbm-cell ${b(K,f)?"on":""}"
          data-x=${K} data-y=${f}
          @pointerdown=${E(K,f)}
          @pointerenter=${P(K,f)}></button>`);return k},A=()=>p.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${l}</span></span>
        <button class="ume-mini" @click=${N}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${F}
        @pointerleave=${F}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${k=>{y(Ee(+k.target.value,1,128),l),z()}} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${k=>{y(u,Ee(+k.target.value,1,64)),z()}} />
          <button class="ume-btn sm" @click=${()=>{d=d.map(()=>0),z()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{d=d.map(k=>~k&255),z()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${Z()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${N}>取消</button>
        <button class="ume-btn primary" @click=${()=>{t.getState().updateItem(e,n,{w:u,h:l,bits:[...d]}),N()}}>应用</button>
      </div>
    </div>
  `;function N(){$.remove(),document.removeEventListener("pointerup",F)}document.addEventListener("pointerup",F),z(),i.appendChild($)}function Ee(i,t,e){return Number.isFinite(i)?Math.min(e,Math.max(t,Math.trunc(i))):t}const Pt="prebuilt/u8g2-menu-preview.js";class Lt{constructor(t,e={}){var $;if(this.store=Ce(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.activateRightTab=()=>{},this.container=t,this.opts={persistKey:"default",...e},t.classList.add("ume"),!document.getElementById("ume-style")){const b=document.createElement("style");b.id="ume-style",b.textContent=Ke,document.head.appendChild(b)}const n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,s=this.opts.data??n??void 0;if(s!==void 0)try{this.store.setState({project:he(s)})}catch(b){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",b)}const r=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;r&&(this.lastExport={c:r}),t.innerHTML=`
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
    `;const a=b=>t.querySelector(b);this.els={left:a(".ume-left"),center:a(".ume-center"),right:a(".ume-right"),propEl:a('[data-role="prop"]'),resEl:a('[data-role="res"]'),setEl:a('[data-role="set"]'),toolbarUndo:a('[data-act="undo"]'),toolbarRedo:a('[data-act="redo"]')};const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new ht(o,{onPageChanged:b=>this.onPreviewPageChanged(b)});const u=document.createElement("div");this.els.center.appendChild(u),Ct(u,this.preview),this.preview.load(this.opts.wasmUrl??Pt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(b=>{console.error(b);const v=document.createElement("div");v.className="ume-warn",v.textContent=`预览引擎加载失败: ${b.message}。编辑功能不受影响。`,this.els.center.prepend(v)}),t.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const b=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);b!==null&&this.store.getState().addPage(b||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),t.querySelector('[data-act="export-json"]').addEventListener("click",()=>{ye(`${this.store.getState().project.name||"menu-project"}.json`,Ie(this.store.getState().project),"application/json")}),t.querySelector('[data-act="import"]').addEventListener("click",()=>{a('[data-role="file"]').click()}),a('[data-role="file"]').addEventListener("change",b=>{var y;const v=(y=b.target.files)==null?void 0:y[0];v&&(v.text().then(x=>{try{const h=he(x);this.store.getState().update(E=>{Object.assign(E,h)}),this.scheduleRender()}catch(h){alert(`导入失败: ${h.message}`)}}),b.target.value="")}),t.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate());const l=t.querySelectorAll(".ume-tabs button"),d=b=>{l.forEach(v=>v.classList.toggle("active",v.dataset.tab===b)),this.els.propEl.style.display=b==="prop"?"":"none",this.els.resEl.style.display=b==="res"?"":"none",this.els.setEl.style.display=b==="set"?"":"none"};l.forEach(b=>{b.addEventListener("click",()=>d(b.dataset.tab??"prop"))}),this.activateRightTab=d,this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select((($=this.store.getState().project.pages[0])==null?void 0:$.id)??null,null);let m=null;this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange();const b=this.store.getState().selection.itemId;b&&b!==m&&this.activateRightTab("prop"),m=b}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(t){var n;const e=he(t);this.store.getState().update(s=>{Object.assign(s,e)}),this.store.getState().select(((n=e.pages[0])==null?void 0:n.id)??null,null)}generate(){var e,n;const t=this.produceCode();return Tt(this.container,t),(n=(e=this.opts).onExport)==null||n.call(e,t),t}downloadC(){const t=this.produceCode();ye("menu_pages.c",t.c)}produceCode(){const t=this.lastExport,e=this.store.getState().project;let n;const s=[];if(e.fontSubset){if(!this.preview.ready)s.push("现场取模需要预览引擎，当前引擎不可用：本次未生成 menu_font，代码将引用内置字体");else{const o=we(e,e.fontExtra),u=this.buildFontSubset(e,o);if("error"in u)s.push(`${u.error}，本次按内置字体生成`);else{n=u.result.font;const l=Pe(o);if(s.push(`现场取模：收录 ${l.total} 个字符（ASCII ${l.ascii} + 扩展 ${l.cjk}），字体数组 ${u.result.font.length} 字节。运行时若输出超出字符集的中文，请在设置里补充额外字符`),u.result.included>255&&s.push(`子集字形数 ${u.result.included} 超过 255：字体头 glyph_cnt 字段将回绕（记录为 ${u.result.included&255}），如遇渲染异常请在"额外包含字符"里精简`),u.result.missing.length){const d=u.result.missing.slice(0,5).map(m=>String.fromCodePoint(m)).join(" ");s.push(`字符集中 ${u.result.missing.length} 个字符未在源字体中找到（如 ${d}），运行时这些字符无法显示`)}}}const a=this.preview.fontApplyWarning;a&&s.push(a)}const r=lt(e,t??void 0,n);return r.warnings.unshift(...s),this.lastExport={c:r.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,r.c),r}buildFontSubset(t,e){const n=this.preview.fontIndex(t.font),s=this.preview.getFontBytes(n),r=this.preview.glyphFetcher(n);if(!s||!r)return{error:"现场取模失败：无法读取源字体数据"};const a=Ve(s,e,r);return a?{result:a}:{error:"现场取模失败：字符集未命中任何字形"}}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(t){const e=t.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"?(t.preventDefault(),t.shiftKey?this.store.getState().redo():this.store.getState().undo()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="y"&&(t.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(t){const e=this.store.getState().project.pages[t];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ie(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const t=this.store.getState();xt(this.els.left,this.store),Mt(this.els.setEl,this.store),Et(this.els.resEl,this.store),yt(this.els.propEl,this.store,{openXbmEditor:(e,n)=>Vt(this.container,this.store,e,n)}),this.els.toolbarUndo.disabled=t.past.length===0,this.els.toolbarRedo.disabled=t.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var r;const t=document.getElementById("ume-live-value"),e=document.getElementById("ume-page-jump"),n=this.store.getState(),s=this.store.getState().project.pages.findIndex(a=>a.id===n.selection.pageId);if(e){const a=n.project.pages,o=a.map(l=>l.name).join("|");e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML="",a.forEach((l,d)=>{const m=document.createElement("option");m.value=String(d),m.textContent=`${d+1}. ${l.name}`,e.appendChild(m)}),e.onchange=()=>{const l=parseInt(e.value,10);Number.isFinite(l)&&this.preview.navTo(l)});const u=this.preview.currentPage;document.activeElement!==e&&e.value!==String(u)&&(e.value=String(u))}if(t&&s>=0&&n.selection.itemId){const a=n.project.pages[s],o=a.items.findIndex(b=>b.id===n.selection.itemId),u=a.items[o],l=u==null?void 0:u.bind,d=(l==null?void 0:l.type)==="value"||(l==null?void 0:l.type)==="switch"?l.varId:null,m=(u==null?void 0:u.kind)==="text"&&(l==null?void 0:l.type)==="none"?u.displayVarId:null,$=d??m;if(u&&$){const b=(n.project.variables??[]).findIndex(E=>E.id===$),v=b>=0?b:s*64+o,x=(l==null?void 0:l.type)==="switch"?this.preview.getSwitch(v):this.preview.getInt(v),h=(r=(n.project.variables??[]).find(E=>E.id===$))==null?void 0:r.name;t.textContent=`${h??u.kind} = ${x}`}else t.textContent=""}}}exports.MenuEditor=Lt;exports.MenuKey=U;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
