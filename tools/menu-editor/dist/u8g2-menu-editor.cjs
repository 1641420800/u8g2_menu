"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const Ae=require("zustand/vanilla"),b=require("lit-html"),Le=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;let le=0;function j(a){return le=(le+1)%1e9,`${a}_${Date.now().toString(36)}_${le.toString(36)}`}function se(a){return{id:j("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...a}}function Ie(a){return{id:j("buf"),name:"buf_new",dataLen:32,sample:"sine",...a}}function Pe(a,t){const e=new Set(a.map(s=>s.name));if(!e.has(t))return t;let u=2;for(;e.has(`${t}_${u}`);)u++;return`${t}_${u}`}function Te(a,t){const e=new Set(a.map(s=>s.name));if(!e.has(t))return t;let u=2;for(;e.has(`${t}_${u}`);)u++;return`${t}_${u}`}function R(a){const t={id:j("it"),label:""};switch(a){case"text":return{...t,kind:a,text:"菜单项",scale:1};case"number":return{...t,kind:a,text:"v:%d",scale:1,varId:null,editable:!0};case"switch":return{...t,kind:a,text:"s:%s",scale:1,varId:null,openValue:1,onText:"on",offText:"off"};case"button":return{...t,kind:a,text:"执行操作",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...t,kind:a,text:"下一级",scale:1,targetPageId:null};case"back":return{...t,kind:a,text:"返回",scale:1};case"slider":return{...t,kind:a,varId:null};case"progress":return{...t,kind:a,varId:null};case"chart":return{...t,kind:a,sources:[],height:32};case"xbm":return Be(16,16);case"textarea":return{...t,kind:a,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...t,kind:a,w:64,h:32,cbName:"board_cb"}}}function Be(a,t){const e=Math.ceil(a/8);return{id:j("it"),kind:"xbm",label:"",name:"icon",w:a,h:t,bits:new Array(e*t).fill(0)}}function ce(a){return{id:j("pg"),name:a,fnName:"",items:[],userCodePre:""}}function Z(a,t){return{...a,...t}}function Ve(){const a=[se({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),se({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),se({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],t=[Ie({name:"buf_demo",dataLen:32,sample:"sine"})],e=ce("主页");e.items=[Z(R("text"),{text:"u8g2_menu"}),Z(R("submenu"),{text:"系统设置"}),Z(R("button"),{text:"关于",cbName:"btn_about_cb"})];const u=ce("设置");u.items=[Z(R("number"),{text:"音量:%d",varId:a[0].id}),Z(R("switch"),{text:"开关:%s",varId:a[1].id}),Z(R("slider"),{varId:a[2].id}),Z(R("submenu"),{text:"图表"}),R("back")];const s=ce("图表");s.items=[Z(R("chart"),{height:36,sources:[{bufferId:t[0].id,chartKind:"line"}]}),R("back")];const r={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:a,chartBuffers:t,pages:[e,u,s]};return e.items[1].targetPageId=u.id,u.items[3].targetPageId=s.id,r}function Ke(a){return structuredClone(a)}const De=800;function Se(){let a=null,t=0;return Ae.createStore()((e,u)=>({project:Ve(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(s,r)=>{const n=Date.now(),o=!!r&&r===a&&n-t<De;a=r??null,t=n,e(l=>{const m=Ke(l.project);return s(m),{project:m,dirty:!0,past:o?l.past:[...l.past.slice(-99),l.project],future:[]}})},undo:()=>{e(s=>s.past.length?{project:s.past[s.past.length-1],past:s.past.slice(0,-1),future:[s.project,...s.future.slice(0,99)],dirty:!0}:s)},redo:()=>{e(s=>{if(!s.future.length)return s;const[r,...n]=s.future;return{project:r,past:[...s.past,s.project],future:n,dirty:!0}})},select:(s,r=null)=>e({selection:{pageId:s,itemId:r}}),addPage:s=>{const r={id:j("pg"),name:s??`页面${u().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return u().update(n=>{n.pages.push(r)}),e({selection:{pageId:r.id,itemId:null}}),r},removePage:s=>{u().update(n=>{n.pages=n.pages.filter(o=>o.id!==s);for(const o of n.pages)for(const l of o.items)l.kind==="submenu"&&l.targetPageId===s&&(l.targetPageId=null)});const{selection:r}=u();r.pageId===s&&e({selection:{pageId:null,itemId:null}})},movePage:(s,r)=>{u().update(n=>{const o=n.pages.findIndex(m=>m.id===s),l=o+r;o<0||l<0||l>=n.pages.length||([n.pages[o],n.pages[l]]=[n.pages[l],n.pages[o]])})},updatePage:(s,r)=>{u().update(n=>{const o=n.pages.find(l=>l.id===s);o&&Object.assign(o,r)})},addItem:(s,r)=>{var l;const n=r??u().selection.pageId??((l=u().project.pages[0])==null?void 0:l.id);if(!n)return null;const o=je(s);return u().update(m=>{const i=m.pages.find(c=>c.id===n);i==null||i.items.push(o)}),e({selection:{pageId:n,itemId:o.id}}),o},removeItem:(s,r)=>{u().update(o=>{const l=o.pages.find(m=>m.id===s);l&&(l.items=l.items.filter(m=>m.id!==r))});const{selection:n}=u();n.itemId===r&&e({selection:{pageId:s,itemId:null}})},moveItem:(s,r,n)=>{u().update(o=>{const l=o.pages.find(c=>c.id===s);if(!l)return;const m=l.items.findIndex(c=>c.id===r),i=m+n;m<0||i<0||i>=l.items.length||([l.items[m],l.items[i]]=[l.items[i],l.items[m]])})},duplicateItem:(s,r)=>{let n=null;u().update(o=>{const l=o.pages.find(i=>i.id===s);if(!l)return;const m=l.items.findIndex(i=>i.id===r);m<0||(n=structuredClone(l.items[m]),n.id=j("it"),l.items.splice(m+1,0,n))}),n&&e({selection:{pageId:s,itemId:n.id}})},updateItem:(s,r,n,o)=>{u().update(l=>{const m=l.pages.find(c=>c.id===s),i=m==null?void 0:m.items.find(c=>c.id===r);i&&Object.assign(i,n)},o)},addVariable:s=>{let r=null;return u().update(n=>{n.variables=n.variables??[];const o=Te(n.variables,(s==null?void 0:s.name)??"var_new");r=se({...s,name:o}),n.variables.push(r)}),r},removeVariable:s=>{let r=0;for(const n of u().project.pages)for(const o of n.items)"varId"in o&&o.varId===s&&r++;return r>0?r:(u().update(n=>{n.variables=(n.variables??[]).filter(o=>o.id!==s)}),0)},updateVariable:(s,r,n)=>{u().update(o=>{const l=(o.variables??[]).find(m=>m.id===s);l&&Object.assign(l,r)},n)},addChartBuffer:s=>{let r=null;return u().update(n=>{n.chartBuffers=n.chartBuffers??[];const o=Pe(n.chartBuffers,(s==null?void 0:s.name)??"buf_new");r=Ie({...s,name:o}),n.chartBuffers.push(r)}),r},removeChartBuffer:s=>{let r=0;for(const n of u().project.pages)for(const o of n.items)o.kind==="chart"&&o.sources.some(l=>l.bufferId===s)&&r++;return r>0?r:(u().update(n=>{n.chartBuffers=(n.chartBuffers??[]).filter(o=>o.id!==s)}),0)},updateChartBuffer:(s,r,n)=>{u().update(o=>{const l=(o.chartBuffers??[]).find(m=>m.id===s);l&&Object.assign(l,r)},n)}}))}Se();function je(a){return R(a)}const me=1,Q=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],ue={text:"文本",number:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回上级",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},Ue={text:"T",number:"#",switch:"◉",button:"⏎",submenu:"→",back:"←",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},ze=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class J extends Error{}const Me=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),Re=new Set(["line","point","bar"]),Ee=new Set(["sine","ramp","noise","none"]);function te(a){return typeof a=="object"&&a!==null&&!Array.isArray(a)}function T(a,t){return typeof a=="string"?a:t}function I(a,t){return typeof a=="number"&&Number.isFinite(a)?a:t}const qe=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function Oe(a){if(!te(a))throw new J("条目格式错误");const t=a.kind;if(typeof t!="string"||!qe.includes(t))throw new J(`未知条目类型: ${String(t)}`);const e=structuredClone(a);switch(e.id=T(a.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=T(a.label,""),t){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=T(a.text,""),e.scale=a.scale===2?2:1;break}return e}function Fe(a){if(!te(a))throw new J("页面格式错误");const t=Array.isArray(a.items)?a.items.map(Oe):[];return{id:T(a.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:T(a.name,"未命名页面"),fnName:T(a.fnName,""),items:t,userCodePre:T(a.userCodePre,"")}}function He(a){if(!te(a))return null;const t=T(a.type,"int32");return{id:T(a.id,"")||j("vb"),name:T(a.name,""),type:Me.has(t)?t:"int32",initialValue:I(a.initialValue,0),min:I(a.min,0),max:I(a.max,100),step:I(a.step,1)}}function Xe(a){if(!te(a))return null;const t=T(a.sample,"sine");return{id:T(a.id,"")||j("buf"),name:T(a.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(I(a.dataLen,32)))),sample:Ee.has(t)?t:"sine"}}function Ze(a){const t=new Map,e=[],u=(s,r)=>{let n=t.get(s);return n||(n=r(),t.set(s,n),e.push(n)),n};for(const s of a)for(const r of s.items){const n=r;switch(r.kind){case"number":if(n.varId===void 0||n.varId===null){const o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=u(o,()=>({id:j("vb"),name:o,type:Me.has(String(n.varType))?String(n.varType):"int32",initialValue:I(n.initialValue,0),min:I(n.min,0),max:I(n.max,100),step:I(n.step,1)}));r.varId=l.id}n.editable===void 0&&(r.editable=!0),delete n.varName,delete n.varType,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals;break;case"slider":case"progress":if(n.varId===void 0||n.varId===null){const o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=u(o,()=>({id:j("vb"),name:o,type:"int",initialValue:I(n.initialValue,0),min:I(n.min,0),max:I(n.max,100),step:I(n.step,1)}));r.varId=l.id}delete n.varName,delete n.step,delete n.min,delete n.max,delete n.initialValue;break;case"switch":if(n.varId===void 0||n.varId===null){const o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=u(o,()=>({id:j("vb"),name:o,type:"uint8",initialValue:I(n.initialValue,0),min:0,max:1,step:1}));r.varId=l.id}delete n.varName,delete n.initialValue;break}}return e}function de(a){let t;if(typeof a=="string")try{t=JSON.parse(a)}catch{throw new J("JSON 解析失败")}else t=a;if(!te(t))throw new J("不是有效的工程文件");const e=t,u=I(e.version,0);if(u>me)throw new J(`工程版本 v${u} 高于当前支持的 v${me}，请升级编辑器`);const s=Array.isArray(e.pages)?e.pages.map(Fe):[];if(!s.length)throw new J("工程至少需要一个页面");const r=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity",n=new Set(Q.map(i=>i.fn)),o=Array.isArray(e.weakHooks)?[...new Set(e.weakHooks.filter(i=>typeof i=="string"&&n.has(i)))]:[];let l;Array.isArray(e.variables)?l=e.variables.map(He).filter(i=>!!i):l=Ze(s);let m;return Array.isArray(e.chartBuffers)?m=e.chartBuffers.map(Xe).filter(i=>!!i):m=Ye(s),{version:me,name:T(e.name,"未命名工程"),width:I(e.width,128),height:I(e.height,64),font:T(e.font,"u8g2_font_wqy12_t_gb2312"),selector:r,selectorLeftMargin:I(e.selectorLeftMargin,16),selectorTopMargin:I(e.selectorTopMargin,0),selectorLineSpacing:I(e.selectorLineSpacing,0),marqueeSpeed:I(e.marqueeSpeed,.2),marqueeHeaderLen:I(e.marqueeHeaderLen,5),weakHooks:o,variables:l,chartBuffers:m,pages:s}}function Ye(a){const t=[];let e=0;const u=()=>{const s={id:j("buf"),name:`buf_chart_${++e}`,dataLen:32,sample:"sine"};return t.push(s),s};for(const s of a)for(const r of s.items){if(r.kind!=="chart")continue;const n=r;if(Array.isArray(n.sources))continue;const o=u();o.dataLen=Math.min(512,Math.max(2,Math.trunc(I(n.dataLen,32))));const l=T(n.sample,"sine");Ee.has(l)&&(o.sample=l);const m=T(n.chartKind,"line"),i={bufferId:o.id,chartKind:Re.has(m)?m:"line"};n.max!==void 0&&n.max!==null&&(i.max=I(n.max,0)),n.min!==void 0&&n.min!==null&&(i.min=I(n.min,0)),r.sources=[i],n.height===void 0&&(r.height=32),delete n.chartKind,delete n.dataLen,delete n.sample,delete n.max,delete n.min}return t}function _e(a){return JSON.stringify(a,null,2)}const Ge={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function X(a,t="anon"){let e=a.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||t}function ee(a){return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function Y(a){if(!Number.isFinite(a))return"0.0f";const t=a.toString();return/[-.]|e/i.test(t)?`${t}f`:`${t}.0f`}function Je(a,t,e){return e==="ramp"?`${a}[i] = (float)i;`:e==="noise"?`${a}[i] = (float)((i * 37) % ${t});`:`${a}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function We(a){const t=new Map;if(!a)return t;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let u;for(;(u=e.exec(a))!==null;)t.set(u[1],u[2]);return t}function z(a,t,e){const u=t.has(a)?t.get(a):"";return`${e}/* USER CODE BEGIN ${a} */${u}${e}/* USER CODE END ${a} */`}const Qe=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function we(a,t){const e=[],u=We((t==null?void 0:t.c)??""),s=a.pages.map((d,$)=>d.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.fnName)?d.fnName:`page_${$}`),r=new Map,n=new Map;for(const d of a.variables??[]){if(!d.name){e.push("存在未命名变量，已跳过");continue}if(r.has(d.name)){e.push(`变量名 "${d.name}" 重复，以第一个为准`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.name)||e.push(`变量名 "${d.name}" 不是合法的 C 标识符，已清洗为 "${X(d.name)}"`);const $=X(d.name,"var"),h=d.type==="float"||d.type==="double",w={name:$,srcType:d.type,type:Ge[d.type],init:h?Y(d.initialValue):String(Math.trunc(d.initialValue)),isFloat:h,step:d.step,min:d.min,max:d.max};r.set($,w),n.set(d.id,w)}const o=new Map,l=new Set,m=[],i=new Map;for(const d of a.chartBuffers??[]){if(!d.name){e.push("存在未命名数据源缓冲区，已跳过");continue}const $=X(d.name,"buf");if([...i.values()].some(_=>_.name===$)){e.push(`缓冲区名 "${d.name}" 与其它缓冲区重名，已跳过`);continue}const h=Math.max(2,Math.trunc(d.dataLen)),w=`${$.toUpperCase()}_LEN`;i.set(d.id,{name:$,lenMacro:w,len:h});const y=`fill_${$}`,v=(u.get(y)??"").trim()!=="";m.push(`#define ${w} ${h}`,`static float ${$}[${w}];`,`static uint8_t ${$}_filled = 0;`,`static void ${$}_fill(void)`,"{",z(y,u,"    "),...d.sample!=="none"&&!v?[`    for (uint16_t i = 0; i < ${w}; ++i) { ${Je($,h,d.sample)} }`]:[],"}")}const c=[],g=new Map,f=new Map,x=new Map;{let d=0,$=0;const h=w=>{const y=i.get(w);return y?(x.has(w)||x.set(w,`        if (!${y.name}_filled) { ${y.name}_filled = 1; ${y.name}_fill(); }`),x.get(w)):""};for(const w of a.pages)for(const y of w.items){if(y.kind!=="chart")continue;const v=y.sources.filter(C=>i.has(C.bufferId));if(y.sources.length&&!v.length){e.push(`页面 ${w.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);continue}if(!v.length){e.push(`页面 ${w.name} 的图表条目未绑定数据源，已跳过`);continue}const _=Math.max(4,Math.trunc(y.height)),k=[];for(const C of v){const A=i.get(C.bufferId),O=`chart${d++}`;c.push(`static float ${O}_dis[${A.lenMacro}];`,`static u8g2_chart_t ${O};`),k.push({name:O,s:C,b:A})}if(k.length===1){const{name:C,s:A,b:O}=k[0];c.push(`static uint8_t ${C}_inited = 0;`),g.set(y.id,[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`,`        u8g2_chart_init(&${C}, ${O.name}, ${C}_dis, ${O.lenMacro});`,h(A.bufferId),"    }"]);const H=A.chartKind==="point"?"Point":A.chartKind==="bar"?"Bar":"Line",ae=A.min!==void 0&&A.max!==void 0?`${Y(A.max)}, ${Y(A.min)}`:"0, 0";f.set(y.id,`    u8g2_MenuDrawItem${H}Chart(&${C}, ${_}, ${ae});`)}else{const C=`chart_layers_${$++}`;c.push(`static u8g2_menu_drawChart_t ${C}[${k.length}];`,`static uint8_t ${C}_inited = 0;`);const A=[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`];k.forEach(({name:O,s:H,b:ae},ie)=>{A.push(`        u8g2_chart_init(&${O}, ${ae.name}, ${O}_dis, ${ae.lenMacro});`),A.push(h(H.bufferId));const Ne=H.chartKind==="point"?"u8g2_drawPointChart":H.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",$e=H.min!==void 0&&H.max!==void 0?`${Y(H.max)}, ${Y(H.min)}`:"0, 0";A.push(`        ${C}[${ie}].drawChart = ${Ne};`),A.push(`        ${C}[${ie}].chart = &${O};`),A.push(`        ${C}[${ie}].max = ${$e.split(", ")[0]};`),A.push(`        ${C}[${ie}].min = ${$e.split(", ")[1]};`)}),A.push("    }"),g.set(y.id,A),f.set(y.id,`    u8g2_MenuDrawItemChart(${C}, ${k.length}, ${_});`)}}}const D=[],U=[],q=[],S=new Set,E=new Map;let B=0;for(const d of a.pages)for(const $ of d.items)switch($.kind){case"button":{const h=X($.cbName,"btn_cb");o.has(h)||o.set(h,$.buttonId);break}case"board":l.add(X($.cbName,"board_cb"));break;case"xbm":{let h=X($.name,"icon");for(;S.has(h);)h=`${h}_2`;S.add(h),E.set($.id,h);const w=$.bits.length,y=$.bits.map(v=>`0x${(v&255).toString(16).padStart(2,"0")}`).join(", ");D.push(`static const uint8_t menu_xbm_${h}[${w}] = { ${y} };`);break}case"textarea":{const h=B++;U.push(`static char ta${h}_text[] = "${ee($.content)}";`,`static u8g2_menu_textArea_t ta${h};`,`static uint8_t ta${h}_inited = 0;`),q.push(`    if (!ta${h}_inited) {`,`        ta${h}_inited = 1;`,`        u8g2_textArea_init(&ta${h}, ta${h}_text);`,`        u8g2_textArea_setLineSpacing(&ta${h}, ${Math.max(0,Math.trunc($.lineSpacing))});`,"    }");break}}const L=(d,$)=>{if(!d)return"";const h=`"${ee(d)}"`;return $===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${h});`:`u8g2_MenuUTF8Printf(${h});`},ne=(d,$,h)=>{const w=`"${ee(d)}"`;return $===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${h});`:`u8g2_MenuUTF8Printf(${w}, ${h});`};let oe=0;const W=(d,$)=>{const h=[],w=`${$.name}`,y=v=>{if(!v)return null;const _=n.get(v);return _||e.push(`页面 ${w} 的条目引用了已删除的变量，已按普通文本生成`),_??null};switch(d.kind){case"text":{const v=L(d.text,d.scale);v&&h.push(`    ${v}`);break}case"number":{const v=d,_=y(v.varId);if(_&&v.editable!==!1){const k=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Y(_.step)}, ${Y(_.min)}, ${Y(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;h.push(`    ${k}`)}if(_)h.push(`    ${ne(v.text,v.scale,_.name)}`),v.editable!==!1&&!/%[-+ #0]*[a-zA-Z]/.test(v.text)&&e.push(`数值条目 "${w}" 的显示文本不含格式化占位符（如 %d）`);else if(/%[-+ #0]*[a-zA-Z]/.test(v.text)){e.push(`页面 ${w} 的数值条目未绑定变量但文本含占位符，已按普通文本生成`);const k=L(v.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),v.scale);k&&h.push(`    ${k}`)}else{const k=L(v.text,v.scale);k&&h.push(`    ${k}`)}break}case"switch":{const v=d,_=y(v.varId);if(_){if(_.srcType!=="uint8"){e.push(`开关条目绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`);const k=L(v.text,v.scale);k&&h.push(`    ${k}`);break}h.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(v.openValue)});`),h.push(`    ${ne(v.text,v.scale,`${_.name} ? "${ee(v.onText)}" : "${ee(v.offText)}"`)}`),/%[-+ #0]*s/.test(v.text)||e.push(`开关条目 "${_.name}" 的显示文本建议包含 %s 用于显示 on/off`)}else{const k=L(v.text,v.scale);k&&h.push(`    ${k}`)}break}case"button":{const v=X(d.cbName,"btn_cb");h.push(`    u8g2_MenuItem_button(${v}, ${Math.trunc(d.buttonId)});`);const _=L(d.text,d.scale);_&&h.push(`    ${_}`);break}case"submenu":{if(!d.targetPageId){e.push(`页面 ${w} 的子页面条目 "${d.text||d.label||d.id}" 未指定目标页面，已按普通文本生成`);const k=L(d.text,d.scale);k&&h.push(`    ${k}`);break}const v=a.pages.findIndex(k=>k.id===d.targetPageId);if(v<0){e.push(`页面 ${w} 的子页面条目目标无效`);break}h.push(`    u8g2_MenuItem_menu_enter(${s[v]});`);const _=L(d.text,d.scale);_&&h.push(`    ${_}`);break}case"back":{h.push("    u8g2_MenuItem_menu_back();");const v=L(d.text,d.scale);v&&h.push(`    ${v}`);break}case"slider":case"progress":{const v=y(d.varId);if(!v){e.push(`页面 ${w} 的${d.kind==="slider"?"滑块":"进度"}条目未绑定变量，已跳过`);break}if(!Qe.has(v.srcType)){e.push(`滑块/进度条绑定的变量 "${v.name}" 须为整型（当前 ${v.srcType}），已跳过`);break}const _=d.kind==="slider"?"Slider":"ProgressBar";h.push(`    u8g2_MenuDrawItem${_}_bind(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`);break}case"chart":{const v=g.get(d.id),_=f.get(d.id);if(!v||!_)break;h.push(...v),h.push(_);break}case"xbm":h.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(d.w)}, ${Math.trunc(d.h)}, menu_xbm_${E.get(d.id)??X(d.name,"icon")});`);break;case"textarea":{const v=oe++;h.push(...q[v].split(`
`));const _=d.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";h.push(`    ${_}(&ta${v}, ${Math.max(10,Math.trunc(d.height))});`);break}case"board":{const v=X(d.cbName,"board_cb");h.push(`    u8g2_MenuDrawItemBoard(${v}, ${Math.max(1,Math.trunc(d.w))}, ${Math.max(1,Math.trunc(d.h))});`);break}}return h},p=[];p.push("/**"),p.push(` * 由 u8g2-menu-editor 自动生成，工程: ${a.name}`),p.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),p.push(" *"),p.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："),s.forEach((d,$)=>p.push(` *   void ${d}(void);   /* 页面: ${a.pages[$].name} */`));for(const d of r.values())p.push(` *   extern ${d.type} ${d.name};`);for(const[d]of o)p.push(` *   void ${d}(u8g2_menu_t *menu, uint8_t ID);`);for(const d of l)p.push(` *   void ${d}(u8g2_t *u8g2);`);p.push(" */"),p.push('#include "u8g2_menu.h"'),(a.chartBuffers??[]).some(d=>d.sample==="sine")&&p.push("#include <math.h>"),p.push(""),p.push(z("includes",u,"")),p.push(""),s.forEach(d=>p.push(`void ${d}(void);`)),p.push(""),p.push("/* ======================== 变量定义 ======================== */"),p.push(z("variables",u,""));for(const d of r.values())p.push(`${d.type} ${d.name} = ${d.init};`);if(p.push(""),(m.length||c.length||U.length||D.length)&&(p.push("/* ======================== 页面资源 ======================== */"),p.push(...m,...c,...U,...D),p.push("")),o.size||l.size){p.push("/* ======================== 回调函数 ======================== */"),p.push(z("callbacks",u,""));for(const[d]of o)p.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID)`),p.push("{"),p.push(z(`cb_${d}`,u,"    ")),p.push("}"),p.push("");for(const d of l)p.push(`void ${d}(u8g2_t *u8g2)`),p.push("{"),p.push(z(`cb_${d}`,u,"    ")),p.push("}"),p.push("")}const M=(a.weakHooks??[]).map(d=>Q.find($=>$.fn===d)).filter(d=>!!d);if(M.length||u.has("weak")||Q.some(d=>(u.get(`weak_${d.fn}`)??"").trim())){p.push("/* ==================== 弱定义函数重写 ==================== */"),p.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),p.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const $=Q.filter(h=>{var w;return!((w=a.weakHooks)!=null&&w.includes(h.fn))&&(u.get(`weak_${h.fn}`)??"").trim()}).map(h=>[`#if 0   /* 已取消勾选 ${h.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${h.decl}`,"{",z(`weak_${h.fn}`,u,"    "),"}","#endif"].join(`
`)).join(`
`);p.push($?`${z("weak",u,"").replace(/\n$/,"")}
${$}
`:z("weak",u,"")),p.push("");for(const h of M){p.push(`/* ${h.label}: ${h.desc} */`),p.push(`${h.decl}`),p.push("{"),p.push(z(`weak_${h.fn}`,u,"    "));const w=h.bodyArgs.split(`
`).map(y=>`    ${y}`);h.retNote&&w.push(`    ${h.retNote}`),p.push(...w),p.push("}"),p.push("")}}return p.push("/* ======================== 页面函数 ======================== */"),p.push(""),a.pages.forEach((d,$)=>{p.push(`/* 页面: ${d.name} */`),p.push(`void ${s[$]}(void)`),p.push("{"),p.push(z(`page_${s[$]}_pre`,u,"    "));for(const h of d.items)p.push(...W(h,d));p.push("}"),p.push("")}),{c:`${p.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:e}}function pe(a,t){return t?a.get(t)??null:null}var P=(a=>(a[a.None=0]="None",a[a.Up=1]="Up",a[a.Down=2]="Down",a[a.Enter=3]="Enter",a[a.Return=4]="Return",a[a.Add=5]="Add",a[a.Sub=6]="Sub",a))(P||{});const et=8192/8;function tt(a){return new Promise((t,e)=>{const u=document.createElement("script");u.src=a,u.onload=()=>t(),u.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${a}`)),document.head.appendChild(u)})}class nt{constructor(t,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.lastKnownPage=0,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(t){if(this.mod)return;const e=window;e.U8G2MenuPreview||await tt(t);const u=e.U8G2MenuPreview;if(!u)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await u({locateFile:r=>t.replace(/[^/\\]*$/,"")+r}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const s=this.mod._em_font_count_export();for(let r=0;r<s;r++){const n=this.mod._em_font_name(r);this.fontIndexCache.set(this.mod.UTF8ToString(n),r)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(t){return this.fontIndexCache.get(t)??0}signature(t){return JSON.stringify({bufs:(t.chartBuffers??[]).map(e=>`${e.name}|${e.dataLen}|${e.sample}`),pages:t.pages.map(e=>({n:e.items.length,k:e.items.map(u=>u.kind).join(","),res:e.items.map(u=>u.kind==="chart"?(u.sources??[]).map(s=>`${s.bufferId}|${s.chartKind}|${s.min??"a"}|${s.max??"a"}`).join(">"):u.kind==="xbm"?`${u.w}x${u.h}`:u.kind==="textarea"?Math.ceil(u.content.length/64):"").join(",")}))})}sync(t){const e=this.mod;if(!e)return;const u=this.signature(t);u!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=u);const s=l=>Math.trunc(Number.isFinite(l)?l:0),r=l=>l?(t.variables??[]).findIndex(m=>m.id===l):-1,n=new Map((t.variables??[]).map(l=>[l.id,l]));(t.chartBuffers??[]).forEach((l,m)=>{e.ccall("em_buf_define",null,["number","number","number"],[m,s(l.dataLen),{sine:0,ramp:1,noise:2,none:3}[l.sample]])});const o=l=>(t.chartBuffers??[]).findIndex(m=>m.id===l);t.pages.forEach((l,m)=>{e.ccall("em_page_begin",null,["number"],[m]),l.items.forEach((i,c)=>{const g=["number","number"];switch(i.kind){case"text":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,0,0,i.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,i.text]);break;case"number":{const f=pe(n,i.varId);e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,1,f?{uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[f.type]:0,i.scale,0,0,0,0,0,f?s(f.initialValue):0,f?s(f.step):0,f?s(f.min):0,f?s(f.max):0,-1,0,0,0,0,i.editable===!1?1:0,r(i.varId)]),e.ccall("em_item_text",null,["number","number","string"],[m,c,i.text]);break}case"switch":{const f=pe(n,i.varId);e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,2,0,i.scale,0,0,s(i.openValue),0,0,f?s(f.initialValue):0,0,0,0,-1,0,0,0,0,0,r(i.varId)]),e.ccall("em_item_text",null,["number","number","string"],[m,c,i.text]),e.ccall("em_item_swtext",null,["number","number","string","string"],[m,c,i.onText,i.offText]);break}case"button":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,3,0,i.scale,0,0,0,s(i.buttonId),0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,i.text]);break;case"submenu":{const f=t.pages.findIndex(x=>x.id===i.targetPageId);e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,4,0,i.scale,0,0,0,0,0,0,0,0,0,f,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,i.text]);break}case"back":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,5,0,i.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,i.text]);break;case"slider":case"progress":{const f=pe(n,i.varId),x=i.kind==="slider"?5:6;e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,x,0,1,0,0,0,0,0,f?s(f.initialValue):0,f?s(f.step):0,f?s(f.min):0,f?s(f.max):0,-1,0,0,0,0,0,r(i.varId)]);break}case"chart":{e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,8,0,1,0,0,0,0,0,0,0,0,0,-1,0,0,s(i.height),0,0,-1]);for(const f of i.sources??[]){const x=f.min!==void 0&&f.max!==void 0?1:0;e.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[m,c,o(f.bufferId),{line:0,point:1,bar:2}[f.chartKind],x,x?f.max??0:0,x?f.min??0:0])}break}case"xbm":{e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,9,0,1,0,0,0,0,0,0,0,0,0,-1,s(i.w),s(i.h),0,0,0,-1]);const f=e._em_scratch(i.bits.length);f&&(e.HEAPU8.set(new Uint8Array(i.bits),f),e._em_item_bits(m,c,f,i.bits.length));break}case"textarea":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,10,0,1,0,i.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,s(i.height),0,s(i.lineSpacing),-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,i.content]);break;case"board":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,11,0,1,0,0,0,0,0,0,0,0,0,-1,s(i.w),s(i.h),0,0,0,-1]);break}}),e.ccall("em_page_end",null,["number","number"],[m,l.items.length])}),e.ccall("em_pages_commit",null,["number"],[t.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(t.font),{default:0,rotundity:1,square:2}[t.selector],s(t.selectorLeftMargin),s(t.selectorTopMargin),s(t.selectorLineSpacing),t.marqueeSpeed,t.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const t=e=>{if(!this.running)return;const u=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(u),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(t){var o,l;const e=this.mod;if(!e)return;const u=e._em_frame(t);if(!u)return;this.img||(this.img=this.ctx.createImageData(128,64));const s=e.HEAPU8.subarray(u,u+et),r=this.img.data;r.fill(255);for(let m=0;m<64;m++){const i=(m>>3)*128,c=1<<(m&7);let g=m*128*4;for(let f=0;f<128;f++)s[i+f]&c&&(r[g]=17,r[g+1]=24,r[g+2]=39),g+=4}this.ctx.putImageData(this.img,0,0);const n=e._em_get_current_page();n!==this.lastKnownPage&&(this.lastKnownPage=n,(l=(o=this.events).onPageChanged)==null||l.call(o,n))}key(t){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[t])}navTo(t){var e;(e=this.mod)==null||e.ccall("em_nav",null,["number"],[t])}getInt(t){var e;return((e=this.mod)==null?void 0:e._em_get_ipool(t))??0}getSwitch(t){var e;return((e=this.mod)==null?void 0:e._em_get_upool(t))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const at=Object.keys(ue);function it(a,t,e,u){const s=a.getState(),r=e.label||"text"in e&&e.text||ue[e.kind],n=o=>l=>{l.stopPropagation(),a.getState().moveItem(t.id,e.id,o)};return b.html`<div class="ume-item-row ${u?"selected":""}"
    @click=${()=>a.getState().select(t.id,e.id)}>
    <span class="ume-item-icon">${Ue[e.kind]}</span>
    <span class="ume-item-name" title=${r}>${r}</span>
    <button class="ume-mini" title="上移" @click=${n(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${n(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${o=>{o.stopPropagation(),s.duplicateItem(t.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${o=>{o.stopPropagation(),s.removeItem(t.id,e.id)}}>✕</button>
  </div>`}function rt(a,t){const e=a.getState();return b.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${u=>{const s=u.target.value;s&&e.addItem(s,t.id),u.target.value=""}}>
    <option value="">＋条目</option>
    ${at.map(u=>b.html`<option value=${u}>${ue[u]}</option>`)}
  </select>`}function st(a,t){const{project:e,selection:u}=t.getState(),s=r=>{const n=t.getState(),o=u.pageId===r.id;return b.html`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>t.getState().select(r.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${r.name}</span>
        <button class="ume-mini" title="上移页面" @click=${l=>{l.stopPropagation(),n.movePage(r.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${l=>{l.stopPropagation(),n.movePage(r.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${l=>{if(l.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${r.name}"？`)&&n.removePage(r.id)}}>✕</button>
      </div>
      ${o?b.html`<div class="ume-page-items">
        ${r.items.length?r.items.map(l=>it(t,r,l,u.itemId===l.id)):b.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${rt(t,r)}</div>
      </div>`:b.nothing}
    </div>`};b.render(b.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>ut(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(s)}
  `,a)}function ut(a){const t=prompt("页面名称:",`页面${a.getState().project.pages.length+1}`);t!==null&&a.getState().addPage(t||void 0)}function K(a,t,e,u=""){return b.html`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${t??""} placeholder=${u}
      @change=${s=>e(s.target.value)} />
  </div>`}function N(a,t,e,u=1){return b.html`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(t)} step=${String(u)}
      @change=${s=>{const r=parseFloat(s.target.value);e(Number.isFinite(r)?r:0)}} />
  </div>`}function F(a,t,e,u){return b.html`<div class="ume-field">
    <label>${a}</label>
    <select @change=${s=>u(s.target.value)}>
      ${e.map(s=>b.html`<option value=${s.value} ?selected=${s.value===t}>${s.label}</option>`)}
    </select>
  </div>`}function be(a,t,e){return b.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${u=>e(u.target.checked)} />
    <span>${a}</span>
  </div>`}function ot(a,t,e,u=!1){return b.html`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${u?"font-family:Consolas,monospace":""}
      @change=${s=>e(s.target.value)}>${t??""}</textarea>
  </div>`}function xe(a,t,e="text/plain"){const u=new Blob([t],{type:`${e};charset=utf-8`}),s=document.createElement("a");s.href=URL.createObjectURL(u),s.download=a,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),5e3)}const lt=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]),Ce={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function he(a,t,e,u){const s=[{value:"",label:"（未绑定）"},...e.map(n=>({value:n.id,label:`${n.name} : ${Ce[n.type]??n.type}`}))],r=t?e.some(n=>n.id===t):!1;return b.html`
    ${F(a,t??"",s,n=>u(n||null))}
    ${t&&!r?b.html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:b.nothing}
    ${e.length===0?b.html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:b.nothing}
  `}function fe(a,t,e){return b.html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{const u=a.getState().addVariable();a.getState().updateItem(t,e,{varId:u.id})}}>＋ 新建变量并绑定</button>
  </div>`}function ge(a){return a?b.html`<div class="ume-hint">
    ${a.name} : ${Ce[a.type]??a.type}，范围 ${a.min}~${a.max}，步长 ${a.step}，初值 ${a.initialValue}
    （在右侧「变量」区修改）
  </div>`:b.html`${b.nothing}`}function ct(a,t,e){const{project:u,selection:s}=t.getState(),r=u.pages.find(i=>i.id===s.pageId)??null,n=(r==null?void 0:r.items.find(i=>i.id===s.itemId))??null,o=(i,c)=>t.getState().updateItem(r.id,n.id,i,c);let l=b.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,m="属性";if(r&&!n)m="页面属性",l=b.html`
      ${K("名称",r.name,i=>t.getState().updatePage(r.id,{name:i}))}
      ${K("C 函数名",r.fnName,i=>t.getState().updatePage(r.id,{fnName:i}),"留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(r&&n)switch(m=`${ue[n.kind]}`,n.kind){case"text":l=b.html`
          ${K("文本/格式",n.text,i=>o({text:i},`text-${n.id}`))}
          ${F("大小",String(n.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],i=>o({scale:Number(i)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{const i=n,c=u.variables??[],g=c.find(x=>x.id===i.varId),f=g&&(g.type==="float"||g.type==="double")?"float/double 推荐格式 %.1f / %.2f":"整数推荐格式 %d（无符号用 %u）";l=b.html`
          ${he("绑定变量",i.varId,c,x=>o({varId:x}))}
          ${g?b.nothing:fe(t,r.id,i.id)}
          ${be("可编辑（绑定附加值，取消则仅显示）",i.editable!==!1,x=>o({editable:x}))}
          ${ge(g)}
          ${K("显示文本",i.text,x=>o({text:x},`text-${n.id}`))}
          ${F("大小",String(i.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],x=>o({scale:Number(x)}))}
          <div class="ume-hint">${f}；文本支持 \n 多行</div>
        `;break}case"switch":{const i=n,c=(u.variables??[]).filter(f=>f.type==="uint8"),g=c.find(f=>f.id===i.varId)??(u.variables??[]).find(f=>f.id===i.varId);l=b.html`
          ${he("绑定变量",i.varId,c,f=>o({varId:f}))}
          ${g?b.nothing:fe(t,r.id,i.id)}
          ${ge(g)}
          ${K("显示文本",i.text,f=>o({text:f},`text-${n.id}`))}
          ${N("openValue",i.openValue,f=>o({openValue:Math.max(0,Math.trunc(f))}))}
          ${K('"开"文本',i.onText,f=>o({onText:f}))}
          ${K('"关"文本',i.offText,f=>o({offText:f}))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;break}case"button":{const i=n;l=b.html`
          ${K("显示文本",i.text,c=>o({text:c},`text-${n.id}`))}
          ${K("回调函数名",i.cbName,c=>o({cbName:c}))}
          ${N("ID",i.buttonId,c=>o({buttonId:Math.trunc(c)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{const i=n;l=b.html`
          ${K("显示文本",i.text,c=>o({text:c},`text-${n.id}`))}
          ${F("目标页面",i.targetPageId??"",[{value:"",label:"（未设置）"},...u.pages.filter(c=>c.id!==r.id).map(c=>({value:c.id,label:c.name}))],c=>o({targetPageId:c||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{l=b.html`
          ${K("显示文本",n.text,i=>o({text:i},`text-${n.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{const i=(u.variables??[]).filter(g=>lt.has(g.type)),c=i.find(g=>g.id===n.varId)??(u.variables??[]).find(g=>g.id===n.varId);l=b.html`
          ${he("绑定变量",n.varId,i,g=>o({varId:g}))}
          ${c?b.nothing:fe(t,r.id,n.id)}
          ${ge(c)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;break}case"chart":{const i=n,c=u.chartBuffers??[],g=x=>o({sources:x}),f=(x,D)=>{const U=c.find(S=>S.id===x.bufferId),q=x.min===void 0||x.max===void 0;return b.html`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(U==null?void 0:U.name)??"(无效)"}</span>
              <span class="ume-var-meta">${{line:"折线",point:"散点",bar:"柱状"}[x.chartKind]??x.chartKind}${q?" · 自动量程":` · ${x.min}~${x.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>g(i.sources.filter((S,E)=>E!==D))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${F("缓冲区",x.bufferId,c.map(S=>({value:S.id,label:`${S.name} (${S.dataLen}点)`})),S=>g(i.sources.map((E,B)=>B===D?{...E,bufferId:S}:E)))}
              ${F("绘制",x.chartKind,[{value:"line",label:"折线"},{value:"point",label:"散点"},{value:"bar",label:"柱状"}],S=>g(i.sources.map((E,B)=>B===D?{...E,chartKind:S}:E)))}
              ${be("自动量程",q,S=>g(i.sources.map((E,B)=>B===D?{...E,min:S?void 0:0,max:S?void 0:100}:E)))}
              ${q?b.nothing:b.html`
                ${N("量程上限",x.max??100,S=>g(i.sources.map((E,B)=>B===D?{...E,max:S}:E)),"any")}
                ${N("量程下限",x.min??0,S=>g(i.sources.map((E,B)=>B===D?{...E,min:S}:E)),"any")}`}
            </div>
          </div>`};l=b.html`
          ${N("高度(px)",i.height,x=>o({height:Math.max(4,Math.trunc(x))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(i.sources??[]).map(f)}
              ${(i.sources??[]).length===0?b.html`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:b.nothing}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(i.sources??[]).length>=4}
                @click=${()=>{if(!c.length){const x=t.getState().addChartBuffer();g([...i.sources??[],{bufferId:x.id,chartKind:"line"}]);return}g([...i.sources??[],{bufferId:c[0].id,chartKind:"line"}])}}>＋ 添加数据源${(i.sources??[]).length>0?"（叠加）":""}</button>
              ${c.length?b.nothing:b.html`<div class="ume-hint">将自动新建数据源缓冲区（在右侧「数据源」区可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{const i=n;l=b.html`
          ${K("数组名",i.name,c=>o({name:c}))}
          ${N("宽(px)",i.w,c=>o({w:Math.min(128,Math.max(1,Math.trunc(c)))}))}
          ${N("高(px)",i.h,c=>o({h:Math.min(64,Math.max(1,Math.trunc(c)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(r.id,i.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${i.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const i=n;l=b.html`
          ${ot("文本内容",i.content,c=>o({content:c}))}
          ${N("高度(px)",i.height,c=>o({height:Math.max(10,Math.trunc(c))}))}
          ${N("行间距",i.lineSpacing,c=>o({lineSpacing:Math.max(0,Math.trunc(c))}))}
          ${be("上下键滚动 (bind)",i.bindScroll,c=>o({bindScroll:c}))}
        `;break}case"board":{const i=n;l=b.html`
          ${N("宽(px)",i.w,c=>o({w:Math.max(1,Math.trunc(c))}))}
          ${N("高(px)",i.h,c=>o({h:Math.max(1,Math.trunc(c))}))}
          ${K("回调函数名",i.cbName,c=>o({cbName:c}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}b.render(b.html`
    <div class="ume-panel-title">属性 ${m!=="属性"?b.html`<span class="ume-kind-badge">${m}</span>`:b.nothing}</div>
    ${l}
  `,a)}let re=null,ve=null;const mt=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (小数)"},{value:"double",label:"double (小数)"}];function dt(a,t){const e=t.variables??[],u=r=>{re=re===r?null:r},s=r=>{const n=re===r.id,o=(c,g)=>a.getState().updateVariable(r.id,c,g),l=r.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name),m=e.filter(c=>c.name===r.name).length>1,i=pt(t,r.id);return b.html`<div class="ume-var-item ${n?"editing":""}">
      <div class="ume-var-row" @click=${()=>u(r.id)}>
        <span class="ume-var-name" title=${r.name}>${r.name||"(未命名)"}</span>
        <span class="ume-var-meta">${r.type} · ${r.min}~${r.max} · 步${r.step}${i?` · ${i} 处引用`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${c=>{c.stopPropagation();const g=a.getState().removeVariable(r.id);g>0&&alert(`该变量被 ${g} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`)}}>✕</button>
      </div>
      ${n?b.html`<div class="ume-var-edit">
        ${K("变量名",r.name,c=>o({name:c.trim()},`vn-${r.id}`))}
        ${l?b.html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:b.nothing}
        ${m?b.html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:b.nothing}
        ${F("类型",r.type,mt,c=>o({type:c}))}
        ${N("初始值",r.initialValue,c=>o({initialValue:c},`vi-${r.id}`),"any")}
        ${N("最小值",r.min,c=>o({min:c},`vmin-${r.id}`),"any")}
        ${N("最大值",r.max,c=>o({max:c},`vmax-${r.id}`),"any")}
        ${N("步长",r.step,c=>o({step:c},`vs-${r.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:b.nothing}
    </div>`};return b.html`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{re=a.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(s):b.html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function pt(a,t){let e=0;for(const u of a.pages)for(const s of u.items)"varId"in s&&s.varId===t&&e++;return e}function bt(a,t){const e=t.chartBuffers??[],u=r=>{let n=0;for(const o of t.pages)for(const l of o.items)l.kind==="chart"&&l.sources.some(m=>m.bufferId===r)&&n++;return n},s=r=>{const n=ve===r.id,o=(i,c)=>a.getState().updateChartBuffer(r.id,i,c),l=r.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(r.name),m=u(r.id);return b.html`<div class="ume-var-item ${n?"editing":""}">
      <div class="ume-var-row" @click=${()=>{ve=n?null:r.id}}>
        <span class="ume-var-name" title=${r.name}>${r.name||"(未命名)"}</span>
        <span class="ume-var-meta">${r.dataLen} 点 · ${{sine:"正弦",ramp:"斜坡",noise:"伪随机",none:"手动填充"}[r.sample]}${m?` · ${m} 处引用`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${i=>{i.stopPropagation();const c=a.getState().removeChartBuffer(r.id);c>0&&alert(`该缓冲区被 ${c} 个图表条目的数据源引用，请先在条目里移除数据源再删除`)}}>✕</button>
      </div>
      ${n?b.html`<div class="ume-var-edit">
        ${K("数组名",r.name,i=>o({name:i.trim()},`bn-${r.id}`))}
        ${l?b.html`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:b.nothing}
        ${N("点数",r.dataLen,i=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(i)))},`bl-${r.id}`))}
        ${F("示例填充",r.sample,[{value:"sine",label:"正弦（演示）"},{value:"ramp",label:"斜坡（演示）"},{value:"noise",label:"伪随机（演示）"},{value:"none",label:"不填充（全部手写）"}],i=>o({sample:i}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:b.nothing}
    </div>`};return b.html`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{ve=a.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(s):b.html`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function ht(a,t){const{project:e}=t.getState(),u=(o,l)=>t.getState().update(m=>{Object.assign(m,o)},l),s=e.weakHooks??[],r=(o,l)=>{t.getState().update(m=>{const i=m.weakHooks??[];m.weakHooks=l?[...new Set([...i,o])]:i.filter(c=>c!==o)})},n=b.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${s.length}/${Q.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${Q.map(o=>b.html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote?"（返回 1 = 事件已处理 / 0 = 交给库）":""}`}>
              <input type="checkbox" ?checked=${s.includes(o.fn)}
                @change=${l=>r(o.fn,l.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;b.render(b.html`
    <div class="ume-panel-title">工程</div>
    ${K("工程名",e.name,o=>u({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width!==128||e.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    ${dt(t,e)}
    ${bt(t,e)}

    <div class="ume-panel-title">样式</div>
    ${F("字体",e.font,ze.map(o=>({value:o.id,label:o.label})),o=>u({font:o}))}
    ${F("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],o=>u({selector:o}))}
    ${N("左边距",e.selectorLeftMargin,o=>u({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${N("顶边距",e.selectorTopMargin,o=>u({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${N("行间距",e.selectorLineSpacing,o=>u({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${N("跑马灯速度",e.marqueeSpeed,o=>u({marqueeSpeed:o}),.05)}
    ${N("跑马灯停留",e.marqueeHeaderLen,o=>u({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${n}
    ${b.nothing}
  `,a)}function ft(a,t){const e=s=>{let r;const n=()=>{r&&(clearInterval(r),r=void 0)};return{down:o=>{o.preventDefault(),t.key(s),n(),r=window.setInterval(()=>t.key(s),180)},up:n}},u=(s,r,n)=>{const o=e(s);return b.html`<button class="ume-key" title=${n}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${r}</button>`};b.render(b.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${s=>{const n={ArrowUp:P.Up,ArrowDown:P.Down,Enter:P.Enter,Escape:P.Return,Backspace:P.Return,"+":P.Add,"-":P.Sub,"=":P.Add,_:P.Sub}[s.key];n!==void 0&&(s.preventDefault(),t.key(n))}}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${u(P.Up,"▲","上 MENU_Key_Up")}
      ${u(P.Down,"▼","下 MENU_Key_Down")}
      ${u(P.Enter,"OK","确认 MENU_Key_Enter")}
      ${u(P.Return,"⌫","返回 MENU_Key_Return")}
      ${u(P.Add,"＋","加 MENU_Key_Add")}
      ${u(P.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,a)}let G=null;function gt(a,t){G=t,a.querySelectorAll(":scope > .ume-modal-mask").forEach(e=>e.remove()),vt(a)}function vt(a){if(!G)return;const t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",e=>{e.target===t&&ye(t)}),b.render(b.html`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>ye(t)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${G.warnings.length?b.html`
          <div style="margin-bottom:8px">
            ${G.warnings.map(e=>b.html`<div class="ume-warn">⚠ ${e}</div>`)}
          </div>`:b.nothing}
        <div class="ume-code-view">${G.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(G.c).then(()=>xt(t,"已复制到剪贴板"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{xe("menu_pages.c",G.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,t),a.appendChild(t)}function ye(a){a.remove()}function xt(a,t){const e=a.closest(".ume")??document.body;let u=e.querySelector(".ume-toast");u||(u=document.createElement("div"),u.className="ume-toast",e.appendChild(u)),u.textContent=t,u.classList.add("show"),setTimeout(()=>u.classList.remove("show"),1600)}function $t(a,t,e,u){const r=t.getState().project.pages.find(p=>p.id===e),n=r==null?void 0:r.items.find(p=>p.id===u);if(!n||n.kind!=="xbm")return;const o=n;let l=o.w,m=o.h,i=[...o.bits];const c=()=>Math.ceil(l/8),g=document.createElement("div");g.className="ume-modal-mask",g.addEventListener("click",p=>{p.target===g&&W()});const f=(p,M)=>{const V=M*c()+(p>>3);return V<i.length?!!(i[V]>>(p&7)&1):!1},x=(p,M,V)=>{const d=M*c()+(p>>3);i[d]=V?i[d]|1<<(p&7):i[d]&~(1<<(p&7))},D=(p,M)=>{const V=Math.ceil(l/8),d=Math.ceil(p/8),$=new Array(d*M).fill(0);for(let h=0;h<Math.min(m,M);h++)for(let w=0;w<Math.min(l,p);w++){const y=h*V+(w>>3);y<i.length&&i[y]>>(w&7)&1&&($[h*d+(w>>3)]|=1<<(w&7))}l=p,m=M,i=$};let U=!1,q=!0;const S=(p,M)=>V=>{V.preventDefault(),U=!0,q=!f(p,M),x(p,M,q),L()},E=(p,M)=>()=>{U&&(x(p,M,q),L())},B=()=>{U=!1},L=()=>{b.render(oe(),g)},ne=()=>{const p=[];for(let M=0;M<m;M++)for(let V=0;V<l;V++)p.push(b.html`<button class="ume-xbm-cell ${f(V,M)?"on":""}"
          data-x=${V} data-y=${M}
          @pointerdown=${S(V,M)}
          @pointerenter=${E(V,M)}></button>`);return p},oe=()=>b.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${m}</span></span>
        <button class="ume-mini" @click=${W}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${B}
        @pointerleave=${B}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${p=>{D(ke(+p.target.value,1,128),m),L()}} />
          <input type="number" style="width:64px" .value=${String(m)} min="1" max="64"
            @change=${p=>{D(l,ke(+p.target.value,1,64)),L()}} />
          <button class="ume-btn sm" @click=${()=>{i=i.map(()=>0),L()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{i=i.map(p=>~p&255),L()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${ne()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${W}>取消</button>
        <button class="ume-btn primary" @click=${()=>{t.getState().updateItem(e,u,{w:l,h:m,bits:[...i]}),W()}}>应用</button>
      </div>
    </div>
  `;function W(){g.remove(),document.removeEventListener("pointerup",B)}document.addEventListener("pointerup",B),L(),a.appendChild(g)}function ke(a,t,e){return Number.isFinite(a)?Math.min(e,Math.max(t,Math.trunc(a))):t}const _t="prebuilt/u8g2-menu-preview.js";class wt{constructor(t,e={}){var m;if(this.store=Se(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.container=t,this.opts={persistKey:"default",...e},t.classList.add("ume"),!document.getElementById("ume-style")){const i=document.createElement("style");i.id="ume-style",i.textContent=Le,document.head.appendChild(i)}const u=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,s=this.opts.data??u??void 0;if(s!==void 0)try{this.store.setState({project:de(s)})}catch(i){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",i)}const r=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;r&&(this.lastExport={c:r}),t.innerHTML=`
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
    `;const n=i=>t.querySelector(i);this.els={left:n(".ume-left"),center:n(".ume-center"),right:n(".ume-right"),styleEl:n('[data-role="style"]'),propEl:n('[data-role="prop"]'),toolbarUndo:n('[data-act="undo"]'),toolbarRedo:n('[data-act="redo"]')};const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new nt(o,{onPageChanged:i=>this.onPreviewPageChanged(i)});const l=document.createElement("div");this.els.center.appendChild(l),ft(l,this.preview),this.preview.load(this.opts.wasmUrl??_t).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(i=>{console.error(i);const c=document.createElement("div");c.className="ume-warn",c.textContent=`预览引擎加载失败: ${i.message}。编辑功能不受影响。`,this.els.center.prepend(c)}),t.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const i=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);i!==null&&this.store.getState().addPage(i||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),t.querySelector('[data-act="export-json"]').addEventListener("click",()=>{xe(`${this.store.getState().project.name||"menu-project"}.json`,_e(this.store.getState().project),"application/json")}),t.querySelector('[data-act="import"]').addEventListener("click",()=>{n('[data-role="file"]').click()}),n('[data-role="file"]').addEventListener("change",i=>{var g;const c=(g=i.target.files)==null?void 0:g[0];c&&(c.text().then(f=>{try{const x=de(f);this.store.getState().update(D=>{Object.assign(D,x)}),this.scheduleRender()}catch(x){alert(`导入失败: ${x.message}`)}}),i.target.value="")}),t.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(((m=this.store.getState().project.pages[0])==null?void 0:m.id)??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(t){var u;const e=de(t);this.store.getState().update(s=>{Object.assign(s,e)}),this.store.getState().select(((u=e.pages[0])==null?void 0:u.id)??null,null)}generate(){var u,s;const t=this.lastExport,e=we(this.store.getState().project,t??void 0);return this.lastExport={c:e.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,e.c),gt(this.container,e),(s=(u=this.opts).onExport)==null||s.call(u,e),e}downloadC(){const t=we(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:t.c},xe("menu_pages.c",t.c)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(t){const e=t.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"?(t.preventDefault(),t.shiftKey?this.store.getState().redo():this.store.getState().undo()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="y"&&(t.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(t){const e=this.store.getState().project.pages[t];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,_e(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const t=this.store.getState();st(this.els.left,this.store),ht(this.els.styleEl,this.store),ct(this.els.propEl,this.store,{openXbmEditor:(e,u)=>$t(this.container,this.store,e,u)}),this.els.toolbarUndo.disabled=t.past.length===0,this.els.toolbarRedo.disabled=t.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var r;const t=document.getElementById("ume-live-value"),e=document.getElementById("ume-page-jump"),u=this.store.getState(),s=this.store.getState().project.pages.findIndex(n=>n.id===u.selection.pageId);if(e){const n=u.project.pages,o=n.map(m=>m.name).join("|");e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML="",n.forEach((m,i)=>{const c=document.createElement("option");c.value=String(i),c.textContent=`${i+1}. ${m.name}`,e.appendChild(c)}),e.onchange=()=>{const m=parseInt(e.value,10);Number.isFinite(m)&&this.preview.navTo(m)});const l=this.preview.currentPage;document.activeElement!==e&&e.value!==String(l)&&(e.value=String(l))}if(t&&s>=0&&u.selection.itemId){const n=u.project.pages[s],o=n.items.findIndex(m=>m.id===u.selection.itemId),l=n.items[o];if(l&&"varId"in l){const m=l.varId?(u.project.variables??[]).findIndex(f=>f.id===l.varId):-1,i=m>=0?m:s*64+o,c=l.kind==="switch"?this.preview.getSwitch(i):this.preview.getInt(i),g=(r=(u.project.variables??[]).find(f=>f.id===l.varId))==null?void 0:r.name;t.textContent=`${g??l.kind} = ${c}`}else t.textContent=""}}}exports.MenuEditor=wt;exports.MenuKey=P;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
