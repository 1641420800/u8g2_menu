"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const Pe=require("zustand/vanilla"),p=require("lit-html"),Le=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;let ce=0;function R(i){return ce=(ce+1)%1e9,`${i}_${Date.now().toString(36)}_${ce.toString(36)}`}function ue(i){return{id:R("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...i}}function Me(i){return{id:R("buf"),name:"buf_new",dataLen:32,sample:"sine",...i}}function Be(i,t){const e=new Set(i.map(r=>r.name));if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`}function De(i,t){const e=new Set(i.map(r=>r.name));if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`}function F(i){const t={id:R("it"),label:"",bind:{type:"none"}};switch(i){case"text":return{...t,kind:i,text:"菜单项",scale:1,displayVarId:null};case"slider":return{...t,kind:i,position:50};case"progress":return{...t,kind:i,position:50};case"chart":return{...t,kind:i,sources:[],height:32};case"xbm":return Ke(16,16);case"textarea":return{...t,kind:i,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...t,kind:i,w:64,h:32,cbName:"board_cb"}}}function Ke(i,t){const e=Math.ceil(i/8);return{id:R("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:i,h:t,bits:new Array(e*t).fill(0)}}function me(i){return{id:R("pg"),name:i,fnName:"",items:[],userCodePre:""}}function re(i,t){return{...i,...t}}function J(i,t){return{...i,...t}}function je(){const i=[ue({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),ue({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),ue({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],t=[Me({name:"buf_demo",dataLen:32,sample:"sine"})],e=me("主页");e.items=[re(F("text"),{text:"u8g2_menu"}),J(F("text"),{text:"系统设置",bind:{type:"submenu",targetPageId:null}}),J(F("text"),{text:"关于",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];const n=me("设置");n.items=[J(re(F("text"),{text:"音量:%d"}),{bind:{type:"value",varId:i[0].id}}),J(re(F("text"),{text:"开关:%s"}),{bind:{type:"switch",varId:i[1].id,openValue:1,onText:"on",offText:"off"}}),J(F("slider"),{bind:{type:"value",varId:i[2].id}}),J(F("text"),{text:"图表",bind:{type:"submenu",targetPageId:null}}),J(F("text"),{text:"返回",bind:{type:"back"}})];const r=me("图表");r.items=[re(F("chart"),{height:36,sources:[{bufferId:t[0].id,chartKind:"line"}]}),J(F("text"),{text:"返回",bind:{type:"back"}})];const s={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:i,chartBuffers:t,pages:[e,n,r]};return e.items[1].bind.targetPageId=n.id,n.items[3].bind.targetPageId=r.id,s}function Ue(i){return structuredClone(i)}const ze=800;function Ee(){let i=null,t=0;return Pe.createStore()((e,n)=>({project:je(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{const a=Date.now(),o=!!s&&s===i&&a-t<ze;i=s??null,t=a,e(u=>{const d=Ue(u.project);return r(d),{project:d,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{e(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{e(r=>{if(!r.future.length)return r;const[s,...a]=r.future;return{project:s,past:[...r.past,r.project],future:a,dirty:!0}})},select:(r,s=null)=>e({selection:{pageId:r,itemId:s}}),addPage:r=>{const s={id:R("pg"),name:r??`页面${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(a=>{a.pages.push(s)}),e({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{n().update(a=>{a.pages=a.pages.filter(o=>o.id!==r);for(const o of a.pages)for(const u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});const{selection:s}=n();s.pageId===r&&e({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{n().update(a=>{const o=a.pages.findIndex(d=>d.id===r),u=o+s;o<0||u<0||u>=a.pages.length||([a.pages[o],a.pages[u]]=[a.pages[u],a.pages[o]])})},updatePage:(r,s)=>{n().update(a=>{const o=a.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{var u;const a=s??n().selection.pageId??((u=n().project.pages[0])==null?void 0:u.id);if(!a)return null;const o=Oe(r);return n().update(d=>{const l=d.pages.find(h=>h.id===a);l==null||l.items.push(o)}),e({selection:{pageId:a,itemId:o.id}}),o},removeItem:(r,s)=>{n().update(o=>{const u=o.pages.find(d=>d.id===r);u&&(u.items=u.items.filter(d=>d.id!==s))});const{selection:a}=n();a.itemId===s&&e({selection:{pageId:r,itemId:null}})},moveItem:(r,s,a)=>{n().update(o=>{const u=o.pages.find(h=>h.id===r);if(!u)return;const d=u.items.findIndex(h=>h.id===s),l=d+a;d<0||l<0||l>=u.items.length||([u.items[d],u.items[l]]=[u.items[l],u.items[d]])})},duplicateItem:(r,s)=>{let a=null;n().update(o=>{const u=o.pages.find(l=>l.id===r);if(!u)return;const d=u.items.findIndex(l=>l.id===s);d<0||(a=structuredClone(u.items[d]),a.id=R("it"),u.items.splice(d+1,0,a))}),a&&e({selection:{pageId:r,itemId:a.id}})},updateItem:(r,s,a,o)=>{n().update(u=>{const d=u.pages.find(h=>h.id===r),l=d==null?void 0:d.items.find(h=>h.id===s);l&&Object.assign(l,a)},o)},addVariable:r=>{let s=null;return n().update(a=>{a.variables=a.variables??[];const o=De(a.variables,(r==null?void 0:r.name)??"var_new");s=ue({...r,name:o}),a.variables.push(s)}),s},removeVariable:r=>{let s=0;for(const a of n().project.pages)for(const o of a.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(n().update(a=>{a.variables=(a.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,a)=>{n().update(o=>{const u=(o.variables??[]).find(d=>d.id===r);u&&Object.assign(u,s)},a)},addChartBuffer:r=>{let s=null;return n().update(a=>{a.chartBuffers=a.chartBuffers??[];const o=Be(a.chartBuffers,(r==null?void 0:r.name)??"buf_new");s=Me({...r,name:o}),a.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(const a of n().project.pages)for(const o of a.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(n().update(a=>{a.chartBuffers=(a.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,a)=>{n().update(o=>{const u=(o.chartBuffers??[]).find(d=>d.id===r);u&&Object.assign(u,s)},a)}}))}Ee();function Oe(i){return F(i)}const pe=1,te=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],de={text:"文本",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},Re={text:"T",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},le={none:"无",value:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回"},qe=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class ee extends Error{}const Ce=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),Ve=new Set(["line","point","bar"]),Ne=new Set(["sine","ramp","noise","none"]);function ne(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function L(i,t){return typeof i=="string"?i:t}function S(i,t){return typeof i=="number"&&Number.isFinite(i)?i:t}const Fe=["text","slider","progress","chart","xbm","textarea","board"],He=["number","switch","button","submenu","back"],Xe=["none","value","switch","button","submenu","back"];function Ze(i){if(!ne(i))throw new ee("条目格式错误");const t=L(i.kind,"");if(!(Fe.includes(t)||He.includes(t)))throw new ee(`未知条目类型: ${String(t)}`);const e=structuredClone(i);switch(e.id=L(i.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=L(i.label,""),t){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=L(i.text,""),e.scale=i.scale===2?2:1;break}return e}function Ye(i){for(const t of i)for(const e of t.items){const n=e;if(!(n.bind&&ne(n.bind)&&Xe.includes(L(n.bind.type,"none")))){switch(n.kind){case"number":{const r=n.varId??null;n.editable===!1?(n.kind="text",n.displayVarId=r,n.bind={type:"none"}):(n.kind="text",n.displayVarId=null,n.bind={type:"value",varId:r});break}case"switch":n.kind="text",n.displayVarId=null,n.bind={type:"switch",varId:n.varId??null,openValue:S(n.openValue,1),onText:L(n.onText,"on"),offText:L(n.offText,"off")};break;case"button":n.kind="text",n.displayVarId=null,n.bind={type:"button",cbName:L(n.cbName,"btn_cb"),buttonId:S(n.buttonId,1)};break;case"submenu":n.kind="text",n.displayVarId=null,n.bind={type:"submenu",targetPageId:n.targetPageId??null};break;case"back":n.kind="text",n.displayVarId=null,n.bind={type:"back"};break;case"slider":case"progress":n.bind=n.varId?{type:"value",varId:n.varId}:{type:"none"},n.position===void 0&&(n.position=50);break;default:n.bind={type:"none"},n.kind==="text"&&n.displayVarId===void 0&&(n.displayVarId=null);break}delete n.varId,delete n.varName,delete n.varType,delete n.editable,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals,n.kind!=="board"&&(delete n.cbName,delete n.buttonId),delete n.openValue,delete n.onText,delete n.offText,delete n.targetPageId}}}function Ge(i){if(!ne(i))throw new ee("页面格式错误");const t=Array.isArray(i.items)?i.items.map(Ze):[];return{id:L(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:L(i.name,"未命名页面"),fnName:L(i.fnName,""),items:t,userCodePre:L(i.userCodePre,"")}}function Je(i){if(!ne(i))return null;const t=L(i.type,"int32");return{id:L(i.id,"")||R("vb"),name:L(i.name,""),type:Ce.has(t)?t:"int32",initialValue:S(i.initialValue,0),min:S(i.min,0),max:S(i.max,100),step:S(i.step,1)}}function We(i){if(!ne(i))return null;const t=L(i.sample,"sine");return{id:L(i.id,"")||R("buf"),name:L(i.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(S(i.dataLen,32)))),sample:Ne.has(t)?t:"sine"}}function Qe(i){const t=new Map,e=[],n=(r,s)=>{let a=t.get(r);return a||(a=s(),t.set(r,a),e.push(a)),a};for(const r of i)for(const s of r.items){const a=s;switch(s.kind){case"number":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",d=n(u,()=>({id:R("vb"),name:u,type:Ce.has(String(a.varType))?String(a.varType):"int32",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));s.varId=d.id}a.editable===void 0&&(s.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",d=n(u,()=>({id:R("vb"),name:u,type:"int",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));s.varId=d.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){const u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",d=n(u,()=>({id:R("vb"),name:u,type:"uint8",initialValue:S(a.initialValue,0),min:0,max:1,step:1}));s.varId=d.id}delete a.varName,delete a.initialValue;break}}return e}function he(i){let t;if(typeof i=="string")try{t=JSON.parse(i)}catch{throw new ee("JSON 解析失败")}else t=i;if(!ne(t))throw new ee("不是有效的工程文件");const e=t,n=S(e.version,0);if(n>pe)throw new ee(`工程版本 v${n} 高于当前支持的 v${pe}，请升级编辑器`);const r=Array.isArray(e.pages)?e.pages.map(Ge):[];if(!r.length)throw new ee("工程至少需要一个页面");const s=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity",a=new Set(te.map(l=>l.fn)),o=Array.isArray(e.weakHooks)?[...new Set(e.weakHooks.filter(l=>typeof l=="string"&&a.has(l)))]:[];let u;Array.isArray(e.variables)?u=e.variables.map(Je).filter(l=>!!l):u=Qe(r);let d;return Array.isArray(e.chartBuffers)?d=e.chartBuffers.map(We).filter(l=>!!l):d=et(r),Ye(r),tt(r,d),{version:pe,name:L(e.name,"未命名工程"),width:S(e.width,128),height:S(e.height,64),font:L(e.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:S(e.selectorLeftMargin,16),selectorTopMargin:S(e.selectorTopMargin,0),selectorLineSpacing:S(e.selectorLineSpacing,0),marqueeSpeed:S(e.marqueeSpeed,.2),marqueeHeaderLen:S(e.marqueeHeaderLen,5),weakHooks:o,variables:u,chartBuffers:d,pages:r}}function et(i){const t=[];let e=0;const n=()=>{const r={id:R("buf"),name:`buf_chart_${++e}`,dataLen:32,sample:"sine"};return t.push(r),r};for(const r of i)for(const s of r.items){if(s.kind!=="chart")continue;const a=s;if(Array.isArray(a.sources))continue;const o=n();o.dataLen=Math.min(512,Math.max(2,Math.trunc(S(a.dataLen,32))));const u=L(a.sample,"sine");Ne.has(u)&&(o.sample=u);const d=L(a.chartKind,"line"),l={bufferId:o.id,chartKind:Ve.has(d)?d:"line"};a.max!==void 0&&a.max!==null&&(l.max=S(a.max,0)),a.min!==void 0&&a.min!==null&&(l.min=S(a.min,0)),s.sources=[l],a.height===void 0&&(s.height=32),delete a.chartKind,delete a.dataLen,delete a.sample,delete a.max,delete a.min}return t}function tt(i,t){const e=new Set(t.map(n=>n.id));for(const n of i)for(const r of n.items){if(r.kind!=="chart")continue;const s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(a=>e.has(a.bufferId)).map(a=>({bufferId:a.bufferId,chartKind:Ve.has(a.chartKind)?a.chartKind:"line",min:a.min,max:a.max})),typeof s.height!="number"&&(s.height=32)}}function ye(i){return JSON.stringify(i,null,2)}const nt={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function G(i,t="anon"){let e=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||t}function ae(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function W(i){if(!Number.isFinite(i))return"0.0f";const t=i.toString();return/[-.]|e/i.test(t)?`${t}f`:`${t}.0f`}function at(i,t,e){return e==="ramp"?`${i}[i] = (float)i;`:e==="noise"?`${i}[i] = (float)((i * 37) % ${t});`:`${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function it(i){const t=new Map;if(!i)return t;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let n;for(;(n=e.exec(i))!==null;)t.set(n[1],n[2]);return t}function q(i,t,e){const n=t.has(i)?t.get(i):"";return`${e}/* USER CODE BEGIN ${i} */${n}${e}/* USER CODE END ${i} */`}const st=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function we(i,t){const e=[],n=it((t==null?void 0:t.c)??""),r=i.pages.map((c,y)=>c.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.fnName)?c.fnName:`page_${y}`),s=new Map,a=new Map;for(const c of i.variables??[]){if(!c.name){e.push("存在未命名变量，已跳过");continue}if(s.has(c.name)){e.push(`变量名 "${c.name}" 重复，以第一个为准`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.name)||e.push(`变量名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${G(c.name)}"`);const y=G(c.name,"var"),b=c.type==="float"||c.type==="double",w={name:y,srcType:c.type,type:nt[c.type],init:b?W(c.initialValue):String(Math.trunc(c.initialValue)),isFloat:b,step:c.step,min:c.min,max:c.max};s.set(y,w),a.set(c.id,w)}const o=new Map,u=new Set,d=[],l=new Map;for(const c of i.chartBuffers??[]){if(!c.name){e.push("存在未命名数据源缓冲区，已跳过");continue}const y=G(c.name,"buf");if([...l.values()].some(U=>U.name===y)){e.push(`缓冲区名 "${c.name}" 与其它缓冲区重名，已跳过`);continue}const b=Math.max(2,Math.trunc(c.dataLen)),w=`${y.toUpperCase()}_LEN`;l.set(c.id,{name:y,lenMacro:w,len:b});const I=`fill_${y}`,D=(n.get(I)??"").trim()!=="";d.push(`#define ${w} ${b}`,`static float ${y}[${w}];`,`static uint8_t ${y}_filled = 0;`,`static void ${y}_fill(void)`,"{",q(I,n,"    "),...c.sample!=="none"&&!D?[`    for (uint16_t i = 0; i < ${w}; ++i) { ${at(y,b,c.sample)} }`]:[],"}")}const h=[],$=new Map,_=new Map,x=new Map;{let c=0,y=0;const b=w=>{const I=l.get(w);return I?(x.has(w)||x.set(w,`        if (!${I.name}_filled) { ${I.name}_filled = 1; ${I.name}_fill(); }`),x.get(w)):""};for(const w of i.pages)for(const I of w.items){if(I.kind!=="chart")continue;const D=I.sources.filter(C=>l.has(C.bufferId));if(I.sources.length&&!D.length){e.push(`页面 ${w.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);continue}if(!D.length){e.push(`页面 ${w.name} 的图表条目未绑定数据源，已跳过`);continue}const U=Math.max(4,Math.trunc(I.height)),X=[];for(const C of D){const A=l.get(C.bufferId),v=`chart${c++}`;h.push(`static float ${v}_dis[${A.lenMacro}];`,`static u8g2_chart_t ${v};`),X.push({name:v,s:C,b:A})}if(X.length===1){const{name:C,s:A,b:v}=X[0];h.push(`static uint8_t ${C}_inited = 0;`),$.set(I.id,[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`,`        u8g2_chart_init(&${C}, ${v.name}, ${C}_dis, ${v.lenMacro});`,b(A.bufferId),"    }"]);const M=A.chartKind==="point"?"Point":A.chartKind==="bar"?"Bar":"Line",ie=A.min!==void 0&&A.max!==void 0?`${W(A.max)}, ${W(A.min)}`:"0, 0";_.set(I.id,`    u8g2_MenuDrawItem${M}Chart(&${C}, ${U}, ${ie});`)}else{const C=`chart_layers_${y++}`;h.push(`static u8g2_menu_drawChart_t ${C}[${X.length}];`,`static uint8_t ${C}_inited = 0;`);const A=[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`];X.forEach(({name:v,s:M,b:ie},se)=>{A.push(`        u8g2_chart_init(&${v}, ${ie.name}, ${v}_dis, ${ie.lenMacro});`),A.push(b(M.bufferId));const Ae=M.chartKind==="point"?"u8g2_drawPointChart":M.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",_e=M.min!==void 0&&M.max!==void 0?`${W(M.max)}, ${W(M.min)}`:"0, 0";A.push(`        ${C}[${se}].drawChart = ${Ae};`),A.push(`        ${C}[${se}].chart = &${v};`),A.push(`        ${C}[${se}].max = ${_e.split(", ")[0]};`),A.push(`        ${C}[${se}].min = ${_e.split(", ")[1]};`)}),A.push("    }"),$.set(I.id,A),_.set(I.id,`    u8g2_MenuDrawItemChart(${C}, ${X.length}, ${U});`)}}}const k=[],g=[],f=[],E=new Set,N=new Map;let O=0;for(const c of i.pages)for(const y of c.items){if(y.bind.type==="button"){const b=G(y.bind.cbName,"btn_cb");o.has(b)||o.set(b,y.bind.buttonId)}switch(y.kind){case"board":u.add(G(y.cbName,"board_cb"));break;case"xbm":{let b=G(y.name,"icon");for(;E.has(b);)b=`${b}_2`;E.add(b),N.set(y.id,b);const w=y.bits.length,I=y.bits.map(D=>`0x${(D&255).toString(16).padStart(2,"0")}`).join(", ");k.push(`static const uint8_t menu_xbm_${b}[${w}] = { ${I} };`);break}case"textarea":{const b=O++;g.push(`static char ta${b}_text[] = "${ae(y.content)}";`,`static u8g2_menu_textArea_t ta${b};`,`static uint8_t ta${b}_inited = 0;`),f.push(`    if (!ta${b}_inited) {`,`        ta${b}_inited = 1;`,`        u8g2_textArea_init(&ta${b}, ta${b}_text);`,`        u8g2_textArea_setLineSpacing(&ta${b}, ${Math.max(0,Math.trunc(y.lineSpacing))});`,"    }");break}}}const z=(c,y)=>{if(!c)return"";const b=`"${ae(c)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${b});`:`u8g2_MenuUTF8Printf(${b});`},Y=(c,y,b)=>{const w=`"${ae(c)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${b});`:`u8g2_MenuUTF8Printf(${w}, ${b});`};let B=0;const V=(c,y)=>{const b=[],w=`${y.name}`,I=v=>{if(!v)return null;const M=a.get(v);return M||e.push(`页面 ${w} 的条目引用了已删除的变量，已按普通文本生成`),M??null},D=c.bind;let U=null,X=null,C="on",A="off";switch(D.type){case"value":{const v=I(D.varId);if(v){U=v;const M=v.isFloat?`u8g2_MenuItemValue_${v.srcType}(&${v.name}, ${W(v.step)}, ${W(v.min)}, ${W(v.max)});`:`u8g2_MenuItemValue_${v.srcType}(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`;b.push(`    ${M}`)}break}case"switch":{const v=I(D.varId);v&&v.srcType!=="uint8"?e.push(`开关附加值绑定的变量 "${v.name}" 应为 uint8 类型（当前 ${v.srcType}），已跳过绑定`):v&&(X=v,C=D.onText,A=D.offText,b.push(`    u8g2_MenuItemValue_switch(&${v.name}, ${Math.trunc(D.openValue)});`));break}case"button":{const v=G(D.cbName,"btn_cb");b.push(`    u8g2_MenuItem_button(${v}, ${Math.trunc(D.buttonId)});`);break}case"submenu":{const v=i.pages.findIndex(M=>M.id===D.targetPageId);!D.targetPageId||v<0?e.push(`页面 ${w} 的条目 "${c.label||"未命名"}" 附加值目标页面无效，已按普通文本生成`):b.push(`    u8g2_MenuItem_menu_enter(${r[v]});`);break}case"back":b.push("    u8g2_MenuItem_menu_back();");break}switch(c.kind){case"text":{if(U)b.push(`    ${Y(c.text,c.scale,U.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||e.push(`页面 ${w} 的数值附加值条目显示文本不含格式化占位符（如 %d）`);else if(X)b.push(`    ${Y(c.text,c.scale,`${X.name} ? "${ae(C)}" : "${ae(A)}"`)}`),/%[-+ #0]*s/.test(c.text)||e.push("开关附加值条目的显示文本建议包含 %s 用于显示 on/off");else if(D.type==="none"&&c.displayVarId){const v=I(c.displayVarId);if(v)b.push(`    ${Y(c.text,c.scale,v.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||e.push(`页面 ${w} 的显示条目文本不含格式化占位符（如 %d）`);else{e.push(`页面 ${w} 的显示条目引用了已删除的变量，已按普通文本生成`);const M=z(c.text,c.scale);M&&b.push(`    ${M}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(c.text)){e.push(`页面 ${w} 的文本条目含占位符但未绑定变量/显示变量，占位符已移除`);const v=z(c.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),c.scale);v&&b.push(`    ${v}`)}else{const v=z(c.text,c.scale);v&&b.push(`    ${v}`)}break}case"slider":case"progress":{const v=c.kind==="slider"?"Slider":"ProgressBar";if(U){if(!st.has(U.srcType)){e.push(`滑块/进度条附加值的变量 "${U.name}" 须为整型（当前 ${U.srcType}），已按静态显示生成`),b.push(`    u8g2_MenuDrawItem${v}(${(c.position/100).toFixed(2)}f);`);break}b.push(`    u8g2_MenuDrawItem${v}_bind(&${U.name}, ${Math.trunc(U.step)}, ${Math.trunc(U.min)}, ${Math.trunc(U.max)});`)}else{const M=Math.min(100,Math.max(0,c.position));b.push(`    u8g2_MenuDrawItem${v}(${(M/100).toFixed(2)}f);`)}break}case"chart":{const v=$.get(c.id),M=_.get(c.id);if(!v||!M)break;b.push(...v),b.push(M);break}case"xbm":b.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${N.get(c.id)??G(c.name,"icon")});`);break;case"textarea":{const v=B++;b.push(...f[v].split(`
`));const M=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";b.push(`    ${M}(&ta${v}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{const v=G(c.cbName,"board_cb");b.push(`    u8g2_MenuDrawItemBoard(${v}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return b},m=[];m.push("/**"),m.push(` * 由 u8g2-menu-editor 自动生成，工程: ${i.name}`),m.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),m.push(" *"),m.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："),r.forEach((c,y)=>m.push(` *   void ${c}(void);   /* 页面: ${i.pages[y].name} */`));for(const c of s.values())m.push(` *   extern ${c.type} ${c.name};`);for(const[c]of o)m.push(` *   void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(const c of u)m.push(` *   void ${c}(u8g2_t *u8g2);`);m.push(" */"),m.push('#include "u8g2_menu.h"'),(i.chartBuffers??[]).some(c=>c.sample==="sine")&&m.push("#include <math.h>"),m.push(""),m.push(q("includes",n,"")),m.push(""),r.forEach(c=>m.push(`void ${c}(void);`)),m.push(""),m.push("/* ======================== 变量定义 ======================== */"),m.push(q("variables",n,""));for(const c of s.values())m.push(`${c.type} ${c.name} = ${c.init};`);if(m.push(""),(d.length||h.length||g.length||k.length)&&(m.push("/* ======================== 页面资源 ======================== */"),m.push(...d,...h,...g,...k),m.push("")),o.size||u.size){m.push("/* ======================== 回调函数 ======================== */"),m.push(q("callbacks",n,""));for(const[c]of o)m.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID)`),m.push("{"),m.push(q(`cb_${c}`,n,"    ")),m.push("}"),m.push("");for(const c of u)m.push(`void ${c}(u8g2_t *u8g2)`),m.push("{"),m.push(q(`cb_${c}`,n,"    ")),m.push("}"),m.push("")}const T=(i.weakHooks??[]).map(c=>te.find(y=>y.fn===c)).filter(c=>!!c);if(T.length||n.has("weak")||te.some(c=>(n.get(`weak_${c.fn}`)??"").trim())){m.push("/* ==================== 弱定义函数重写 ==================== */"),m.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),m.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const y=te.filter(b=>{var w;return!((w=i.weakHooks)!=null&&w.includes(b.fn))&&(n.get(`weak_${b.fn}`)??"").trim()}).map(b=>[`#if 0   /* 已取消勾选 ${b.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${b.decl}`,"{",q(`weak_${b.fn}`,n,"    "),"}","#endif"].join(`
`)).join(`
`);m.push(y?`${q("weak",n,"").replace(/\n$/,"")}
${y}
`:q("weak",n,"")),m.push("");for(const b of T){m.push(`/* ${b.label}: ${b.desc} */`),m.push(`${b.decl}`),m.push("{"),m.push(q(`weak_${b.fn}`,n,"    "));const w=b.bodyArgs.split(`
`).map(I=>`    ${I}`);b.retNote&&w.push(`    ${b.retNote}`),m.push(...w),m.push("}"),m.push("")}}return m.push("/* ======================== 页面函数 ======================== */"),m.push(""),i.pages.forEach((c,y)=>{m.push(`/* 页面: ${c.name} */`),m.push(`void ${r[y]}(void)`),m.push("{"),m.push(q(`page_${r[y]}_pre`,n,"    "));for(const b of c.items)m.push(...V(b,c));m.push("}"),m.push("")}),{c:`${m.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:e}}var K=(i=>(i[i.None=0]="None",i[i.Up=1]="Up",i[i.Down=2]="Down",i[i.Enter=3]="Enter",i[i.Return=4]="Return",i[i.Add=5]="Add",i[i.Sub=6]="Sub",i))(K||{});const rt=8192/8;function ot(i){return new Promise((t,e)=>{const n=document.createElement("script");n.src=i,n.onload=()=>t(),n.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${i}`)),document.head.appendChild(n)})}class ut{constructor(t,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.lastKnownPage=0,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(t){if(this.mod)return;const e=window;e.U8G2MenuPreview||await ot(t);const n=e.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await n({locateFile:s=>t.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const r=this.mod._em_font_count_export();for(let s=0;s<r;s++){const a=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(a),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(t){return this.fontIndexCache.get(t)??0}signature(t){return JSON.stringify({bufs:(t.chartBuffers??[]).map(e=>`${e.name}|${e.dataLen}|${e.sample}`),pages:t.pages.map(e=>({n:e.items.length,k:e.items.map(n=>n.kind).join(","),res:e.items.map(n=>n.kind==="chart"?(n.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")}))})}sync(t){const e=this.mod;if(!e)return;const n=this.signature(t);n!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);const r=l=>Math.trunc(Number.isFinite(l)?l:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},a={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},d=l=>l?(t.variables??[]).findIndex(h=>h.id===l):-1;(t.variables??[]).forEach((l,h)=>{e.ccall("em_var_define",null,["number","number","number","number","number","number"],[h,s[l.type],r(l.initialValue),r(l.step),r(l.min),r(l.max)])}),(t.chartBuffers??[]).forEach((l,h)=>{e.ccall("em_buf_define",null,["number","number","number"],[h,r(l.dataLen),u[l.sample]])}),t.pages.forEach((l,h)=>{e.ccall("em_page_begin",null,["number"],[h]),l.items.forEach(($,_)=>{const x=()=>{const k=$.bind;if(k.type==="none")return;const g=k.type==="value"||k.type==="switch",f=g?(t.variables??[]).find(E=>E.id===k.varId):void 0;e.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[h,_,o[k.type],g&&f?s[f.type]:0,k.type==="switch"?r(k.openValue):0,k.type==="button"?r(k.buttonId):0,k.type==="submenu"?t.pages.findIndex(E=>E.id===k.targetPageId):-1,g&&f?d(f.id):-1])};switch($.kind){case"text":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[h,_,a.text,$.scale,0,0,0,$.displayVarId?d($.displayVarId):-1,-1]),e.ccall("em_item_text",null,["number","number","string"],[h,_,$.text]),x();break;case"slider":case"progress":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[h,_,a[$.kind],1,0,0,0,-1,-1]),x();break;case"chart":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[h,_,a.chart,1,r($.height),0,0,-1,-1]);for(const k of $.sources??[])e.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[h,_,(t.chartBuffers??[]).findIndex(g=>g.id===k.bufferId),{line:0,point:1,bar:2}[k.chartKind],k.min!==void 0&&k.max!==void 0?1:0,k.max??0,k.min??0]);x();break;case"xbm":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[h,_,a.xbm,1,0,r($.w),r($.h),-1,-1]);{const k=e._em_scratch($.bits.length);k&&(e.HEAPU8.set(new Uint8Array($.bits),k),e._em_item_bits(h,_,k,$.bits.length))}x();break;case"textarea":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[h,_,a.textarea,1,r($.height),0,0,-1,-1]),e.ccall("em_item_text",null,["number","number","string"],[h,_,$.content]),x();break;case"board":e.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[h,_,a.board,1,0,r($.w),r($.h),-1,-1]),x();break}}),e.ccall("em_page_end",null,["number","number"],[h,l.items.length])}),e.ccall("em_pages_commit",null,["number"],[t.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(t.font),{default:0,rotundity:1,square:2}[t.selector],r(t.selectorLeftMargin),r(t.selectorTopMargin),r(t.selectorLineSpacing),t.marqueeSpeed,t.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const t=e=>{if(!this.running)return;const n=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(n),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(t){var o,u;const e=this.mod;if(!e)return;const n=e._em_frame(t);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));const r=e.HEAPU8.subarray(n,n+rt),s=this.img.data;s.fill(255);for(let d=0;d<64;d++){const l=(d>>3)*128,h=1<<(d&7);let $=d*128*4;for(let _=0;_<128;_++)r[l+_]&h&&(s[$]=17,s[$+1]=24,s[$+2]=39),$+=4}this.ctx.putImageData(this.img,0,0);const a=e._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,(u=(o=this.events).onPageChanged)==null||u.call(o,a))}key(t){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[t])}navTo(t){var e;(e=this.mod)==null||e.ccall("em_nav",null,["number"],[t])}getInt(t){var e;return((e=this.mod)==null?void 0:e._em_get_ipool(t))??0}getSwitch(t){var e;return((e=this.mod)==null?void 0:e._em_get_upool(t))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const lt=Object.keys(de);function dt(i,t,e,n){const r=i.getState(),s=e.label||"text"in e&&e.text||de[e.kind],a=e.bind.type!=="none"?` · ${le[e.bind.type]}`:"",o=u=>d=>{d.stopPropagation(),i.getState().moveItem(t.id,e.id,u)};return p.html`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>i.getState().select(t.id,e.id)}>
    <span class="ume-item-icon">${Re[e.kind]}</span>
    <span class="ume-item-name" title=${s+a}>${s}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(t.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(t.id,e.id)}}>✕</button>
  </div>`}function ct(i,t){const e=i.getState();return p.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{const r=n.target.value;r&&e.addItem(r,t.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${lt.map(n=>p.html`<option value=${n}>${de[n]}</option>`)}
  </select>`}function mt(i,t){const{project:e,selection:n}=t.getState(),r=s=>{const a=t.getState(),o=n.pageId===s.id;return p.html`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>t.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${s.name}"？`)&&a.removePage(s.id)}}>✕</button>
      </div>
      ${o?p.html`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>dt(t,s,u,n.itemId===u.id)):p.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${ct(t,s)}</div>
      </div>`:p.nothing}
    </div>`};p.render(p.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>pt(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(r)}
  `,i)}function pt(i){const t=prompt("页面名称:",`页面${i.getState().project.pages.length+1}`);t!==null&&i.getState().addPage(t||void 0)}function H(i,t,e,n=""){return p.html`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${t??""} placeholder=${n}
      @change=${r=>e(r.target.value)} />
  </div>`}function P(i,t,e,n=1){return p.html`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(t)} step=${String(n)}
      @change=${r=>{const s=parseFloat(r.target.value);e(Number.isFinite(s)?s:0)}} />
  </div>`}function Z(i,t,e,n){return p.html`<div class="ume-field">
    <label>${i}</label>
    <select @change=${r=>n(r.target.value)}>
      ${e.map(r=>p.html`<option value=${r.value} ?selected=${r.value===t}>${r.label}</option>`)}
    </select>
  </div>`}function ke(i,t,e){return p.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${n=>e(n.target.checked)} />
    <span>${i}</span>
  </div>`}function ht(i,t,e,n=!1){return p.html`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${r=>e(r.target.value)}>${t??""}</textarea>
  </div>`}function $e(i,t,e="text/plain"){const n=new Blob([t],{type:`${e};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=i,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}let fe=null;const Te={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function be(i,t,e,n){const r=[{value:"",label:"（未绑定）"},...e.map(a=>({value:a.id,label:`${a.name} : ${Te[a.type]??a.type}`}))],s=t?e.some(a=>a.id===t):!1;return p.html`
    ${Z(i,t??"",r,a=>n(a||null))}
    ${t&&!s?p.html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:p.nothing}
    ${e.length===0?p.html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:p.nothing}
  `}function ge(i,t){return p.html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{const e=i.getState().addVariable();t(e)}}>＋ 新建变量并绑定</button>
  </div>`}function ve(i){return i?p.html`<div class="ume-hint">
    ${i.name} : ${Te[i.type]??i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>`:p.html`${p.nothing}`}function ft(i,t,e){const{project:n,selection:r}=t.getState(),s=n.pages.find(_=>_.id===r.pageId)??null,a=(s==null?void 0:s.items.find(_=>_.id===r.itemId))??null,o=n.variables??[],u=n.chartBuffers??[],d=(_,x)=>t.getState().updateItem(s.id,a.id,_,x),l=_=>d({bind:_});let h=p.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,$="";if(s&&!a)$="页面属性",h=p.html`
      ${H("名称",s.name,_=>t.getState().updatePage(s.id,{name:_}))}
      ${H("C 函数名",s.fnName,_=>t.getState().updatePage(s.id,{fnName:_}),"留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&a){(a.bind.type==="value"||a.bind.type==="switch")&&a.bind.varId&&(fe=a.bind.varId),$=`${de[a.kind]}${a.bind.type!=="none"?` + ${le[a.bind.type]}`:""}`;let _=p.html``;switch(a.kind){case"text":{const g=a,f=o.find(E=>E.id===g.displayVarId);_=p.html`
          ${H("文本/格式",g.text,E=>d({text:E},`text-${g.id}`))}
          ${Z("大小",String(g.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],E=>d({scale:Number(E)}))}
          ${a.bind.type==="none"?p.html`
            ${be("显示变量",g.displayVarId,o,E=>d({displayVarId:E}))}
            ${f?p.nothing:ge(t,E=>d({displayVarId:E.id}))}
            ${ve(f)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:p.nothing}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{const g=a;_=p.html`
          ${a.bind.type==="none"?p.html`
            ${P("静态位置(%)",g.position,f=>d({position:Math.min(100,Math.max(0,Math.trunc(f)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:p.nothing}
        `;break}case"chart":{const g=a,f=N=>d({sources:N}),E=(N,O)=>{const z=u.find(B=>B.id===N.bufferId),Y=N.min===void 0||N.max===void 0;return p.html`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(z==null?void 0:z.name)??"(无效)"}</span>
              <span class="ume-var-meta">${{line:"折线",point:"散点",bar:"柱状"}[N.chartKind]??N.chartKind}${Y?" · 自动量程":` · ${N.min}~${N.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>f(g.sources.filter((B,V)=>V!==O))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${Z("缓冲区",N.bufferId,u.map(B=>({value:B.id,label:`${B.name} (${B.dataLen}点)`})),B=>f(g.sources.map((V,m)=>m===O?{...V,bufferId:B}:V)))}
              ${Z("绘制",N.chartKind,[{value:"line",label:"折线"},{value:"point",label:"散点"},{value:"bar",label:"柱状"}],B=>f(g.sources.map((V,m)=>m===O?{...V,chartKind:B}:V)))}
              ${ke("自动量程",Y,B=>f(g.sources.map((V,m)=>m===O?{...V,min:B?void 0:0,max:B?void 0:100}:V)))}
              ${Y?p.nothing:p.html`
                ${P("量程上限",N.max??100,B=>f(g.sources.map((V,m)=>m===O?{...V,max:B}:V)),"any")}
                ${P("量程下限",N.min??0,B=>f(g.sources.map((V,m)=>m===O?{...V,min:B}:V)),"any")}`}
            </div>
          </div>`};_=p.html`
          ${P("高度(px)",g.height,N=>d({height:Math.max(4,Math.trunc(N))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(g.sources??[]).map(E)}
              ${(g.sources??[]).length===0?p.html`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:p.nothing}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(g.sources??[]).length>=4}
                @click=${()=>{if(!u.length){const N=t.getState().addChartBuffer();f([...g.sources??[],{bufferId:N.id,chartKind:"line"}]);return}f([...g.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(g.sources??[]).length>0?"（叠加）":""}</button>
              ${u.length?p.nothing:p.html`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{const g=a;_=p.html`
          ${H("数组名",g.name,f=>d({name:f}))}
          ${P("宽(px)",g.w,f=>d({w:Math.min(128,Math.max(1,Math.trunc(f)))}))}
          ${P("高(px)",g.h,f=>d({h:Math.min(64,Math.max(1,Math.trunc(f)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(s.id,g.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${g.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const g=a;_=p.html`
          ${ht("文本内容",g.content,f=>d({content:f}))}
          ${P("高度(px)",g.height,f=>d({height:Math.max(10,Math.trunc(f))}))}
          ${P("行间距",g.lineSpacing,f=>d({lineSpacing:Math.max(0,Math.trunc(f))}))}
          ${ke("上下键滚动 (bind)",g.bindScroll,f=>d({bindScroll:f}))}
        `;break}case"board":{const g=a;_=p.html`
          ${P("宽(px)",g.w,f=>d({w:Math.max(1,Math.trunc(f))}))}
          ${P("高(px)",g.h,f=>d({h:Math.max(1,Math.trunc(f))}))}
          ${H("回调函数名",g.cbName,f=>d({cbName:f}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}const x=a.bind;let k=p.html``;switch(x.type){case"none":k=p.html`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{const g=o.find(f=>f.id===x.varId);k=p.html`
          ${be("变量",x.varId,o,f=>l({type:"value",varId:f}))}
          ${g?p.nothing:ge(t,f=>l({type:"value",varId:f.id}))}
          ${ve(g)}
          ${a.kind==="text"?p.html`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:p.nothing}
        `;break}case"switch":{const g=o.filter(f=>f.type==="uint8").find(f=>f.id===x.varId)??o.find(f=>f.id===x.varId);k=p.html`
          ${be("变量 (uint8)",x.varId,o.filter(f=>f.type==="uint8"),f=>l({type:"switch",varId:f,openValue:x.openValue,onText:x.onText,offText:x.offText}))}
          ${g?p.nothing:ge(t,f=>l({type:"switch",varId:f.id,openValue:x.openValue,onText:x.onText,offText:x.offText}))}
          ${ve(g)}
          ${P("openValue",x.openValue,f=>l({type:"switch",varId:x.varId,openValue:Math.max(0,Math.trunc(f)),onText:x.onText,offText:x.offText}))}
          ${H('"开"文本',x.onText,f=>l({type:"switch",varId:x.varId,openValue:x.openValue,onText:f,offText:x.offText}))}
          ${H('"关"文本',x.offText,f=>l({type:"switch",varId:x.varId,openValue:x.openValue,onText:x.onText,offText:f}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":k=p.html`
          ${H("回调函数名",x.cbName,g=>l({type:"button",cbName:g,buttonId:x.buttonId}))}
          ${P("ID",x.buttonId,g=>l({type:"button",cbName:x.cbName,buttonId:Math.trunc(g)}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":k=p.html`
          ${Z("目标页面",x.targetPageId??"",[{value:"",label:"（未设置）"},...n.pages.filter(g=>g.id!==s.id).map(g=>({value:g.id,label:g.name}))],g=>l({type:"submenu",targetPageId:g||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":k=p.html`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}h=p.html`
      <div class="ume-panel-title">绘制</div>
      ${_}
      <div class="ume-panel-title">附加值</div>
      ${Z("类型",x.type,Object.keys(le).map(g=>({value:g,label:le[g]})),g=>{const f=a.bind;l(g==="value"?{type:"value",varId:f.type==="value"||f.type==="switch"?f.varId:fe}:g==="switch"?{type:"switch",varId:f.type==="value"||f.type==="switch"?f.varId:fe,openValue:1,onText:"on",offText:"off"}:g==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:g==="submenu"?{type:"submenu",targetPageId:f.type==="submenu"?f.targetPageId:null}:{type:"none"})})}
      ${k}
    `}p.render(p.html`
    ${$?p.html`<div class="ume-panel-title"><span class="ume-kind-badge">${$}</span></div>`:p.nothing}
    ${h}
  `,i)}let oe=null,xe=null;const bt=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (小数)"},{value:"double",label:"double (小数)"}];function gt(i,t){const e=t.variables??[],n=s=>{oe=oe===s?null:s},r=s=>{const a=oe===s.id,o=(h,$)=>i.getState().updateVariable(s.id,h,$),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=e.filter(h=>h.name===s.name).length>1,l=vt(t,s.id);return p.html`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(未命名)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${l?` · ${l} 处引用`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${h=>{h.stopPropagation();const $=i.getState().removeVariable(s.id);$>0&&alert(`该变量被 ${$} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`)}}>✕</button>
      </div>
      ${a?p.html`<div class="ume-var-edit">
        ${H("变量名",s.name,h=>o({name:h.trim()},`vn-${s.id}`))}
        ${u?p.html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:p.nothing}
        ${d?p.html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:p.nothing}
        ${Z("类型",s.type,bt,h=>o({type:h}))}
        ${P("初始值",s.initialValue,h=>o({initialValue:h},`vi-${s.id}`),"any")}
        ${P("最小值",s.min,h=>o({min:h},`vmin-${s.id}`),"any")}
        ${P("最大值",s.max,h=>o({max:h},`vmax-${s.id}`),"any")}
        ${P("步长",s.step,h=>o({step:h},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:p.nothing}
    </div>`};return p.html`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{oe=i.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(r):p.html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function vt(i,t){let e=0;for(const n of i.pages)for(const r of n.items)"varId"in r&&r.varId===t&&e++;return e}function xt(i,t){const e=t.chartBuffers??[],n=s=>{let a=0;for(const o of t.pages)for(const u of o.items)u.kind==="chart"&&u.sources.some(d=>d.bufferId===s)&&a++;return a},r=s=>{const a=xe===s.id,o=(l,h)=>i.getState().updateChartBuffer(s.id,l,h),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=n(s.id);return p.html`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>{xe=a?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(未命名)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"正弦",ramp:"斜坡",noise:"伪随机",none:"手动填充"}[s.sample]}${d?` · ${d} 处引用`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${l=>{l.stopPropagation();const h=i.getState().removeChartBuffer(s.id);h>0&&alert(`该缓冲区被 ${h} 个图表条目的数据源引用，请先在条目里移除数据源再删除`)}}>✕</button>
      </div>
      ${a?p.html`<div class="ume-var-edit">
        ${H("数组名",s.name,l=>o({name:l.trim()},`bn-${s.id}`))}
        ${u?p.html`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:p.nothing}
        ${P("点数",s.dataLen,l=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(l)))},`bl-${s.id}`))}
        ${Z("示例填充",s.sample,[{value:"sine",label:"正弦（演示）"},{value:"ramp",label:"斜坡（演示）"},{value:"noise",label:"伪随机（演示）"},{value:"none",label:"不填充（全部手写）"}],l=>o({sample:l}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:p.nothing}
    </div>`};return p.html`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{xe=i.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(r):p.html`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function $t(i,t){const{project:e}=t.getState();p.render(p.html`
    ${gt(t,e)}
    ${xt(t,e)}
  `,i)}function _t(i,t){const{project:e}=t.getState(),n=(o,u)=>t.getState().update(d=>{Object.assign(d,o)},u),r=e.weakHooks??[],s=(o,u)=>{t.getState().update(d=>{const l=d.weakHooks??[];d.weakHooks=u?[...new Set([...l,o])]:l.filter(h=>h!==o)})},a=p.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${r.length}/${te.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${te.map(o=>p.html`
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
  `;p.render(p.html`
    <div class="ume-panel-title">工程</div>
    ${H("工程名",e.name,o=>n({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width!==128||e.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${Z("字体",e.font,qe.map(o=>({value:o.id,label:o.label})),o=>n({font:o}))}
    ${Z("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],o=>n({selector:o}))}
    ${P("左边距",e.selectorLeftMargin,o=>n({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${P("顶边距",e.selectorTopMargin,o=>n({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${P("行间距",e.selectorLineSpacing,o=>n({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${P("跑马灯速度",e.marqueeSpeed,o=>n({marqueeSpeed:o}),.05)}
    ${P("跑马灯停留",e.marqueeHeaderLen,o=>n({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `,i)}function yt(i,t){const e=r=>{let s;const a=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),t.key(r),a(),s=window.setInterval(()=>t.key(r),180)},up:a}},n=(r,s,a)=>{const o=e(r);return p.html`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};p.render(p.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${r=>{const a={ArrowUp:K.Up,ArrowDown:K.Down,Enter:K.Enter,Escape:K.Return,Backspace:K.Return,"+":K.Add,"-":K.Sub,"=":K.Add,_:K.Sub}[r.key];a!==void 0&&(r.preventDefault(),t.key(a))}}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${n(K.Up,"▲","上 MENU_Key_Up")}
      ${n(K.Down,"▼","下 MENU_Key_Down")}
      ${n(K.Enter,"OK","确认 MENU_Key_Enter")}
      ${n(K.Return,"⌫","返回 MENU_Key_Return")}
      ${n(K.Add,"＋","加 MENU_Key_Add")}
      ${n(K.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,i)}let Q=null;function wt(i,t){Q=t,i.querySelectorAll(":scope > .ume-modal-mask").forEach(e=>e.remove()),kt(i)}function kt(i){if(!Q)return;const t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",e=>{e.target===t&&Ie(t)}),p.render(p.html`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Ie(t)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${Q.warnings.length?p.html`
          <div style="margin-bottom:8px">
            ${Q.warnings.map(e=>p.html`<div class="ume-warn">⚠ ${e}</div>`)}
          </div>`:p.nothing}
        <div class="ume-code-view">${Q.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(Q.c).then(()=>It(t,"已复制到剪贴板"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{$e("menu_pages.c",Q.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,t),i.appendChild(t)}function Ie(i){i.remove()}function It(i,t){const e=i.closest(".ume")??document.body;let n=e.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",e.appendChild(n)),n.textContent=t,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function St(i,t,e,n){const s=t.getState().project.pages.find(m=>m.id===e),a=s==null?void 0:s.items.find(m=>m.id===n);if(!a||a.kind!=="xbm")return;const o=a;let u=o.w,d=o.h,l=[...o.bits];const h=()=>Math.ceil(u/8),$=document.createElement("div");$.className="ume-modal-mask",$.addEventListener("click",m=>{m.target===$&&V()});const _=(m,T)=>{const j=T*h()+(m>>3);return j<l.length?!!(l[j]>>(m&7)&1):!1},x=(m,T,j)=>{const c=T*h()+(m>>3);l[c]=j?l[c]|1<<(m&7):l[c]&~(1<<(m&7))},k=(m,T)=>{const j=Math.ceil(u/8),c=Math.ceil(m/8),y=new Array(c*T).fill(0);for(let b=0;b<Math.min(d,T);b++)for(let w=0;w<Math.min(u,m);w++){const I=b*j+(w>>3);I<l.length&&l[I]>>(w&7)&1&&(y[b*c+(w>>3)]|=1<<(w&7))}u=m,d=T,l=y};let g=!1,f=!0;const E=(m,T)=>j=>{j.preventDefault(),g=!0,f=!_(m,T),x(m,T,f),z()},N=(m,T)=>()=>{g&&(x(m,T,f),z())},O=()=>{g=!1},z=()=>{p.render(B(),$)},Y=()=>{const m=[];for(let T=0;T<d;T++)for(let j=0;j<u;j++)m.push(p.html`<button class="ume-xbm-cell ${_(j,T)?"on":""}"
          data-x=${j} data-y=${T}
          @pointerdown=${E(j,T)}
          @pointerenter=${N(j,T)}></button>`);return m},B=()=>p.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${d}</span></span>
        <button class="ume-mini" @click=${V}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${O}
        @pointerleave=${O}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${m=>{k(Se(+m.target.value,1,128),d),z()}} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${m=>{k(u,Se(+m.target.value,1,64)),z()}} />
          <button class="ume-btn sm" @click=${()=>{l=l.map(()=>0),z()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{l=l.map(m=>~m&255),z()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${Y()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${V}>取消</button>
        <button class="ume-btn primary" @click=${()=>{t.getState().updateItem(e,n,{w:u,h:d,bits:[...l]}),V()}}>应用</button>
      </div>
    </div>
  `;function V(){$.remove(),document.removeEventListener("pointerup",O)}document.addEventListener("pointerup",O),z(),i.appendChild($)}function Se(i,t,e){return Number.isFinite(i)?Math.min(e,Math.max(t,Math.trunc(i))):t}const Mt="prebuilt/u8g2-menu-preview.js";class Et{constructor(t,e={}){var d;if(this.store=Ee(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.container=t,this.opts={persistKey:"default",...e},t.classList.add("ume"),!document.getElementById("ume-style")){const l=document.createElement("style");l.id="ume-style",l.textContent=Le,document.head.appendChild(l)}const n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??n??void 0;if(r!==void 0)try{this.store.setState({project:he(r)})}catch(l){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",l)}const s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),t.innerHTML=`
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
    `;const a=l=>t.querySelector(l);this.els={left:a(".ume-left"),center:a(".ume-center"),right:a(".ume-right"),propEl:a('[data-role="prop"]'),resEl:a('[data-role="res"]'),setEl:a('[data-role="set"]'),toolbarUndo:a('[data-act="undo"]'),toolbarRedo:a('[data-act="redo"]')};const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new ut(o,{onPageChanged:l=>this.onPreviewPageChanged(l)});const u=document.createElement("div");this.els.center.appendChild(u),yt(u,this.preview),this.preview.load(this.opts.wasmUrl??Mt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(l=>{console.error(l);const h=document.createElement("div");h.className="ume-warn",h.textContent=`预览引擎加载失败: ${l.message}。编辑功能不受影响。`,this.els.center.prepend(h)}),t.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const l=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);l!==null&&this.store.getState().addPage(l||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),t.querySelector('[data-act="export-json"]').addEventListener("click",()=>{$e(`${this.store.getState().project.name||"menu-project"}.json`,ye(this.store.getState().project),"application/json")}),t.querySelector('[data-act="import"]').addEventListener("click",()=>{a('[data-role="file"]').click()}),a('[data-role="file"]').addEventListener("change",l=>{var $;const h=($=l.target.files)==null?void 0:$[0];h&&(h.text().then(_=>{try{const x=he(_);this.store.getState().update(k=>{Object.assign(k,x)}),this.scheduleRender()}catch(x){alert(`导入失败: ${x.message}`)}}),l.target.value="")}),t.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(((d=this.store.getState().project.pages[0])==null?void 0:d.id)??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(t){var n;const e=he(t);this.store.getState().update(r=>{Object.assign(r,e)}),this.store.getState().select(((n=e.pages[0])==null?void 0:n.id)??null,null)}generate(){var n,r;const t=this.lastExport,e=we(this.store.getState().project,t??void 0);return this.lastExport={c:e.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,e.c),wt(this.container,e),(r=(n=this.opts).onExport)==null||r.call(n,e),e}downloadC(){const t=we(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:t.c},$e("menu_pages.c",t.c)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(t){const e=t.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"?(t.preventDefault(),t.shiftKey?this.store.getState().redo():this.store.getState().undo()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="y"&&(t.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(t){const e=this.store.getState().project.pages[t];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,ye(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const t=this.store.getState();mt(this.els.left,this.store),_t(this.els.setEl,this.store),$t(this.els.resEl,this.store),ft(this.els.propEl,this.store,{openXbmEditor:(e,n)=>St(this.container,this.store,e,n)}),this.els.toolbarUndo.disabled=t.past.length===0,this.els.toolbarRedo.disabled=t.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var s;const t=document.getElementById("ume-live-value"),e=document.getElementById("ume-page-jump"),n=this.store.getState(),r=this.store.getState().project.pages.findIndex(a=>a.id===n.selection.pageId);if(e){const a=n.project.pages,o=a.map(d=>d.name).join("|");e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML="",a.forEach((d,l)=>{const h=document.createElement("option");h.value=String(l),h.textContent=`${l+1}. ${d.name}`,e.appendChild(h)}),e.onchange=()=>{const d=parseInt(e.value,10);Number.isFinite(d)&&this.preview.navTo(d)});const u=this.preview.currentPage;document.activeElement!==e&&e.value!==String(u)&&(e.value=String(u))}if(t&&r>=0&&n.selection.itemId){const a=n.project.pages[r],o=a.items.findIndex(_=>_.id===n.selection.itemId),u=a.items[o],d=u==null?void 0:u.bind,l=(d==null?void 0:d.type)==="value"||(d==null?void 0:d.type)==="switch"?d.varId:null,h=(u==null?void 0:u.kind)==="text"&&(d==null?void 0:d.type)==="none"?u.displayVarId:null,$=l??h;if(u&&$){const _=(n.project.variables??[]).findIndex(E=>E.id===$),x=_>=0?_:r*64+o,g=(d==null?void 0:d.type)==="switch"?this.preview.getSwitch(x):this.preview.getInt(x),f=(s=(n.project.variables??[]).find(E=>E.id===$))==null?void 0:s.name;t.textContent=`${f??u.kind} = ${g}`}else t.textContent=""}}}exports.MenuEditor=Et;exports.MenuKey=K;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
