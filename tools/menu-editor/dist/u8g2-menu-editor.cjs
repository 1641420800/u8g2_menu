"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const Be=require("zustand/vanilla"),p=require("lit-html"),Ve=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;let pe=0;function j(a){return pe=(pe+1)%1e9,`${a}_${Date.now().toString(36)}_${pe.toString(36)}`}function le(a){return{id:j("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...a}}function Ce(a){return{id:j("buf"),name:"buf_new",dataLen:32,sample:"sine",...a}}function Ke(a,t){const e=new Set(a.map(u=>u.name));if(!e.has(t))return t;let r=2;for(;e.has(`${t}_${r}`);)r++;return`${t}_${r}`}function De(a,t){const e=new Set(a.map(u=>u.name));if(!e.has(t))return t;let r=2;for(;e.has(`${t}_${r}`);)r++;return`${t}_${r}`}function R(a){const t={id:j("it"),label:""};switch(a){case"text":return{...t,kind:a,text:"菜单项",scale:1};case"number":return{...t,kind:a,text:"v:%d",scale:1,varId:null,editable:!0};case"switch":return{...t,kind:a,text:"s:%s",scale:1,varId:null,openValue:1,onText:"on",offText:"off"};case"button":return{...t,kind:a,text:"执行操作",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...t,kind:a,text:"下一级",scale:1,targetPageId:null};case"back":return{...t,kind:a,text:"返回",scale:1};case"slider":return{...t,kind:a,varId:null};case"progress":return{...t,kind:a,varId:null};case"chart":return{...t,kind:a,sources:[],height:32};case"xbm":return Ue(16,16);case"textarea":return{...t,kind:a,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...t,kind:a,w:64,h:32,cbName:"board_cb"}}}function Ue(a,t){const e=Math.ceil(a/8);return{id:j("it"),kind:"xbm",label:"",name:"icon",w:a,h:t,bits:new Array(e*t).fill(0)}}function be(a){return{id:j("pg"),name:a,fnName:"",items:[],userCodePre:""}}function G(a,t){return{...a,...t}}function je(){const a=[le({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),le({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),le({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],t=[Ce({name:"buf_demo",dataLen:32,sample:"sine"})],e=be("主页");e.items=[G(R("text"),{text:"u8g2_menu"}),G(R("submenu"),{text:"系统设置"}),G(R("button"),{text:"关于",cbName:"btn_about_cb"})];const r=be("设置");r.items=[G(R("number"),{text:"音量:%d",varId:a[0].id}),G(R("switch"),{text:"开关:%s",varId:a[1].id}),G(R("slider"),{varId:a[2].id}),G(R("submenu"),{text:"图表"}),R("back")];const u=be("图表");u.items=[G(R("chart"),{height:36,sources:[{bufferId:t[0].id,chartKind:"line"}]}),R("back")];const i={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:a,chartBuffers:t,pages:[e,r,u]};return e.items[1].targetPageId=r.id,r.items[3].targetPageId=u.id,i}function ze(a){return structuredClone(a)}const Re=800;function Ne(){let a=null,t=0;return Be.createStore()((e,r)=>({project:je(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(u,i)=>{const n=Date.now(),o=!!i&&i===a&&n-t<Re;a=i??null,t=n,e(l=>{const m=ze(l.project);return u(m),{project:m,dirty:!0,past:o?l.past:[...l.past.slice(-99),l.project],future:[]}})},undo:()=>{e(u=>u.past.length?{project:u.past[u.past.length-1],past:u.past.slice(0,-1),future:[u.project,...u.future.slice(0,99)],dirty:!0}:u)},redo:()=>{e(u=>{if(!u.future.length)return u;const[i,...n]=u.future;return{project:i,past:[...u.past,u.project],future:n,dirty:!0}})},select:(u,i=null)=>e({selection:{pageId:u,itemId:i}}),addPage:u=>{const i={id:j("pg"),name:u??`页面${r().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return r().update(n=>{n.pages.push(i)}),e({selection:{pageId:i.id,itemId:null}}),i},removePage:u=>{r().update(n=>{n.pages=n.pages.filter(o=>o.id!==u);for(const o of n.pages)for(const l of o.items)l.kind==="submenu"&&l.targetPageId===u&&(l.targetPageId=null)});const{selection:i}=r();i.pageId===u&&e({selection:{pageId:null,itemId:null}})},movePage:(u,i)=>{r().update(n=>{const o=n.pages.findIndex(m=>m.id===u),l=o+i;o<0||l<0||l>=n.pages.length||([n.pages[o],n.pages[l]]=[n.pages[l],n.pages[o]])})},updatePage:(u,i)=>{r().update(n=>{const o=n.pages.find(l=>l.id===u);o&&Object.assign(o,i)})},addItem:(u,i)=>{var l;const n=i??r().selection.pageId??((l=r().project.pages[0])==null?void 0:l.id);if(!n)return null;const o=qe(u);return r().update(m=>{const s=m.pages.find(c=>c.id===n);s==null||s.items.push(o)}),e({selection:{pageId:n,itemId:o.id}}),o},removeItem:(u,i)=>{r().update(o=>{const l=o.pages.find(m=>m.id===u);l&&(l.items=l.items.filter(m=>m.id!==i))});const{selection:n}=r();n.itemId===i&&e({selection:{pageId:u,itemId:null}})},moveItem:(u,i,n)=>{r().update(o=>{const l=o.pages.find(c=>c.id===u);if(!l)return;const m=l.items.findIndex(c=>c.id===i),s=m+n;m<0||s<0||s>=l.items.length||([l.items[m],l.items[s]]=[l.items[s],l.items[m]])})},duplicateItem:(u,i)=>{let n=null;r().update(o=>{const l=o.pages.find(s=>s.id===u);if(!l)return;const m=l.items.findIndex(s=>s.id===i);m<0||(n=structuredClone(l.items[m]),n.id=j("it"),l.items.splice(m+1,0,n))}),n&&e({selection:{pageId:u,itemId:n.id}})},updateItem:(u,i,n,o)=>{r().update(l=>{const m=l.pages.find(c=>c.id===u),s=m==null?void 0:m.items.find(c=>c.id===i);s&&Object.assign(s,n)},o)},addVariable:u=>{let i=null;return r().update(n=>{n.variables=n.variables??[];const o=De(n.variables,(u==null?void 0:u.name)??"var_new");i=le({...u,name:o}),n.variables.push(i)}),i},removeVariable:u=>{let i=0;for(const n of r().project.pages)for(const o of n.items)"varId"in o&&o.varId===u&&i++;return i>0?i:(r().update(n=>{n.variables=(n.variables??[]).filter(o=>o.id!==u)}),0)},updateVariable:(u,i,n)=>{r().update(o=>{const l=(o.variables??[]).find(m=>m.id===u);l&&Object.assign(l,i)},n)},addChartBuffer:u=>{let i=null;return r().update(n=>{n.chartBuffers=n.chartBuffers??[];const o=Ke(n.chartBuffers,(u==null?void 0:u.name)??"buf_new");i=Ce({...u,name:o}),n.chartBuffers.push(i)}),i},removeChartBuffer:u=>{let i=0;for(const n of r().project.pages)for(const o of n.items)o.kind==="chart"&&o.sources.some(l=>l.bufferId===u)&&i++;return i>0?i:(r().update(n=>{n.chartBuffers=(n.chartBuffers??[]).filter(o=>o.id!==u)}),0)},updateChartBuffer:(u,i,n)=>{r().update(o=>{const l=(o.chartBuffers??[]).find(m=>m.id===u);l&&Object.assign(l,i)},n)}}))}Ne();function qe(a){return R(a)}const he=1,te=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],me={text:"文本",number:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回上级",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},Oe={text:"T",number:"#",switch:"◉",button:"⏎",submenu:"→",back:"←",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},He=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class W extends Error{}const Pe=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),Fe=new Set(["line","point","bar"]),Ae=new Set(["sine","ramp","noise","none"]);function ae(a){return typeof a=="object"&&a!==null&&!Array.isArray(a)}function V(a,t){return typeof a=="string"?a:t}function I(a,t){return typeof a=="number"&&Number.isFinite(a)?a:t}const Xe=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function Ze(a){if(!ae(a))throw new W("条目格式错误");const t=a.kind;if(typeof t!="string"||!Xe.includes(t))throw new W(`未知条目类型: ${String(t)}`);const e=structuredClone(a);switch(e.id=V(a.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=V(a.label,""),t){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=V(a.text,""),e.scale=a.scale===2?2:1;break}return e}function Ge(a){if(!ae(a))throw new W("页面格式错误");const t=Array.isArray(a.items)?a.items.map(Ze):[];return{id:V(a.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:V(a.name,"未命名页面"),fnName:V(a.fnName,""),items:t,userCodePre:V(a.userCodePre,"")}}function Ye(a){if(!ae(a))return null;const t=V(a.type,"int32");return{id:V(a.id,"")||j("vb"),name:V(a.name,""),type:Pe.has(t)?t:"int32",initialValue:I(a.initialValue,0),min:I(a.min,0),max:I(a.max,100),step:I(a.step,1)}}function Je(a){if(!ae(a))return null;const t=V(a.sample,"sine");return{id:V(a.id,"")||j("buf"),name:V(a.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(I(a.dataLen,32)))),sample:Ae.has(t)?t:"sine"}}function We(a){const t=new Map,e=[],r=(u,i)=>{let n=t.get(u);return n||(n=i(),t.set(u,n),e.push(n)),n};for(const u of a)for(const i of u.items){const n=i;switch(i.kind){case"number":if(n.varId===void 0||n.varId===null){const o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=r(o,()=>({id:j("vb"),name:o,type:Pe.has(String(n.varType))?String(n.varType):"int32",initialValue:I(n.initialValue,0),min:I(n.min,0),max:I(n.max,100),step:I(n.step,1)}));i.varId=l.id}n.editable===void 0&&(i.editable=!0),delete n.varName,delete n.varType,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals;break;case"slider":case"progress":if(n.varId===void 0||n.varId===null){const o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=r(o,()=>({id:j("vb"),name:o,type:"int",initialValue:I(n.initialValue,0),min:I(n.min,0),max:I(n.max,100),step:I(n.step,1)}));i.varId=l.id}delete n.varName,delete n.step,delete n.min,delete n.max,delete n.initialValue;break;case"switch":if(n.varId===void 0||n.varId===null){const o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=r(o,()=>({id:j("vb"),name:o,type:"uint8",initialValue:I(n.initialValue,0),min:0,max:1,step:1}));i.varId=l.id}delete n.varName,delete n.initialValue;break}}return e}function fe(a){let t;if(typeof a=="string")try{t=JSON.parse(a)}catch{throw new W("JSON 解析失败")}else t=a;if(!ae(t))throw new W("不是有效的工程文件");const e=t,r=I(e.version,0);if(r>he)throw new W(`工程版本 v${r} 高于当前支持的 v${he}，请升级编辑器`);const u=Array.isArray(e.pages)?e.pages.map(Ge):[];if(!u.length)throw new W("工程至少需要一个页面");const i=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity",n=new Set(te.map(s=>s.fn)),o=Array.isArray(e.weakHooks)?[...new Set(e.weakHooks.filter(s=>typeof s=="string"&&n.has(s)))]:[];let l;Array.isArray(e.variables)?l=e.variables.map(Ye).filter(s=>!!s):l=We(u);let m;return Array.isArray(e.chartBuffers)?m=e.chartBuffers.map(Je).filter(s=>!!s):m=Qe(u),{version:he,name:V(e.name,"未命名工程"),width:I(e.width,128),height:I(e.height,64),font:V(e.font,"u8g2_font_wqy12_t_gb2312"),selector:i,selectorLeftMargin:I(e.selectorLeftMargin,16),selectorTopMargin:I(e.selectorTopMargin,0),selectorLineSpacing:I(e.selectorLineSpacing,0),marqueeSpeed:I(e.marqueeSpeed,.2),marqueeHeaderLen:I(e.marqueeHeaderLen,5),weakHooks:o,variables:l,chartBuffers:m,pages:u}}function Qe(a){const t=[];let e=0;const r=()=>{const u={id:j("buf"),name:`buf_chart_${++e}`,dataLen:32,sample:"sine"};return t.push(u),u};for(const u of a)for(const i of u.items){if(i.kind!=="chart")continue;const n=i;if(Array.isArray(n.sources))continue;const o=r();o.dataLen=Math.min(512,Math.max(2,Math.trunc(I(n.dataLen,32))));const l=V(n.sample,"sine");Ae.has(l)&&(o.sample=l);const m=V(n.chartKind,"line"),s={bufferId:o.id,chartKind:Fe.has(m)?m:"line"};n.max!==void 0&&n.max!==null&&(s.max=I(n.max,0)),n.min!==void 0&&n.min!==null&&(s.min=I(n.min,0)),i.sources=[s],n.height===void 0&&(i.height=32),delete n.chartKind,delete n.dataLen,delete n.sample,delete n.max,delete n.min}return t}function ke(a){return JSON.stringify(a,null,2)}const et={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function X(a,t="anon"){let e=a.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||t}function ne(a){return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function Y(a){if(!Number.isFinite(a))return"0.0f";const t=a.toString();return/[-.]|e/i.test(t)?`${t}f`:`${t}.0f`}function tt(a,t,e){return e==="ramp"?`${a}[i] = (float)i;`:e==="noise"?`${a}[i] = (float)((i * 37) % ${t});`:`${a}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function nt(a){const t=new Map;if(!a)return t;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let r;for(;(r=e.exec(a))!==null;)t.set(r[1],r[2]);return t}function z(a,t,e){const r=t.has(a)?t.get(a):"";return`${e}/* USER CODE BEGIN ${a} */${r}${e}/* USER CODE END ${a} */`}const at=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function Ie(a,t){const e=[],r=nt((t==null?void 0:t.c)??""),u=a.pages.map((d,x)=>d.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.fnName)?d.fnName:`page_${x}`),i=new Map,n=new Map;for(const d of a.variables??[]){if(!d.name){e.push("存在未命名变量，已跳过");continue}if(i.has(d.name)){e.push(`变量名 "${d.name}" 重复，以第一个为准`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.name)||e.push(`变量名 "${d.name}" 不是合法的 C 标识符，已清洗为 "${X(d.name)}"`);const x=X(d.name,"var"),h=d.type==="float"||d.type==="double",w={name:x,srcType:d.type,type:et[d.type],init:h?Y(d.initialValue):String(Math.trunc(d.initialValue)),isFloat:h,step:d.step,min:d.min,max:d.max};i.set(x,w),n.set(d.id,w)}const o=new Map,l=new Set,m=[],s=new Map;for(const d of a.chartBuffers??[]){if(!d.name){e.push("存在未命名数据源缓冲区，已跳过");continue}const x=X(d.name,"buf");if([...s.values()].some(_=>_.name===x)){e.push(`缓冲区名 "${d.name}" 与其它缓冲区重名，已跳过`);continue}const h=Math.max(2,Math.trunc(d.dataLen)),w=`${x.toUpperCase()}_LEN`;s.set(d.id,{name:x,lenMacro:w,len:h});const S=`fill_${x}`,v=(r.get(S)??"").trim()!=="";m.push(`#define ${w} ${h}`,`static float ${x}[${w}];`,`static uint8_t ${x}_filled = 0;`,`static void ${x}_fill(void)`,"{",z(S,r,"    "),...d.sample!=="none"&&!v?[`    for (uint16_t i = 0; i < ${w}; ++i) { ${tt(x,h,d.sample)} }`]:[],"}")}const c=[],g=new Map,f=new Map,$=new Map;{let d=0,x=0;const h=w=>{const S=s.get(w);return S?($.has(w)||$.set(w,`        if (!${S.name}_filled) { ${S.name}_filled = 1; ${S.name}_fill(); }`),$.get(w)):""};for(const w of a.pages)for(const S of w.items){if(S.kind!=="chart")continue;const v=S.sources.filter(N=>s.has(N.bufferId));if(S.sources.length&&!v.length){e.push(`页面 ${w.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);continue}if(!v.length){e.push(`页面 ${w.name} 的图表条目未绑定数据源，已跳过`);continue}const _=Math.max(4,Math.trunc(S.height)),k=[];for(const N of v){const A=s.get(N.bufferId),O=`chart${d++}`;c.push(`static float ${O}_dis[${A.lenMacro}];`,`static u8g2_chart_t ${O};`),k.push({name:O,s:N,b:A})}if(k.length===1){const{name:N,s:A,b:O}=k[0];c.push(`static uint8_t ${N}_inited = 0;`),g.set(S.id,[`    if (!${N}_inited) {`,`        ${N}_inited = 1;`,`        u8g2_chart_init(&${N}, ${O.name}, ${N}_dis, ${O.lenMacro});`,h(A.bufferId),"    }"]);const F=A.chartKind==="point"?"Point":A.chartKind==="bar"?"Bar":"Line",re=A.min!==void 0&&A.max!==void 0?`${Y(A.max)}, ${Y(A.min)}`:"0, 0";f.set(S.id,`    u8g2_MenuDrawItem${F}Chart(&${N}, ${_}, ${re});`)}else{const N=`chart_layers_${x++}`;c.push(`static u8g2_menu_drawChart_t ${N}[${k.length}];`,`static uint8_t ${N}_inited = 0;`);const A=[`    if (!${N}_inited) {`,`        ${N}_inited = 1;`];k.forEach(({name:O,s:F,b:re},ue)=>{A.push(`        u8g2_chart_init(&${O}, ${re.name}, ${O}_dis, ${re.lenMacro});`),A.push(h(F.bufferId));const Te=F.chartKind==="point"?"u8g2_drawPointChart":F.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",ye=F.min!==void 0&&F.max!==void 0?`${Y(F.max)}, ${Y(F.min)}`:"0, 0";A.push(`        ${N}[${ue}].drawChart = ${Te};`),A.push(`        ${N}[${ue}].chart = &${O};`),A.push(`        ${N}[${ue}].max = ${ye.split(", ")[0]};`),A.push(`        ${N}[${ue}].min = ${ye.split(", ")[1]};`)}),A.push("    }"),g.set(S.id,A),f.set(S.id,`    u8g2_MenuDrawItemChart(${N}, ${k.length}, ${_});`)}}}const L=[],U=[],q=[],M=new Set,C=new Map;let K=0;for(const d of a.pages)for(const x of d.items)switch(x.kind){case"button":{const h=X(x.cbName,"btn_cb");o.has(h)||o.set(h,x.buttonId);break}case"board":l.add(X(x.cbName,"board_cb"));break;case"xbm":{let h=X(x.name,"icon");for(;M.has(h);)h=`${h}_2`;M.add(h),C.set(x.id,h);const w=x.bits.length,S=x.bits.map(v=>`0x${(v&255).toString(16).padStart(2,"0")}`).join(", ");L.push(`static const uint8_t menu_xbm_${h}[${w}] = { ${S} };`);break}case"textarea":{const h=K++;U.push(`static char ta${h}_text[] = "${ne(x.content)}";`,`static u8g2_menu_textArea_t ta${h};`,`static uint8_t ta${h}_inited = 0;`),q.push(`    if (!ta${h}_inited) {`,`        ta${h}_inited = 1;`,`        u8g2_textArea_init(&ta${h}, ta${h}_text);`,`        u8g2_textArea_setLineSpacing(&ta${h}, ${Math.max(0,Math.trunc(x.lineSpacing))});`,"    }");break}}const T=(d,x)=>{if(!d)return"";const h=`"${ne(d)}"`;return x===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${h});`:`u8g2_MenuUTF8Printf(${h});`},ie=(d,x,h)=>{const w=`"${ne(d)}"`;return x===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${h});`:`u8g2_MenuUTF8Printf(${w}, ${h});`};let de=0;const Q=(d,x)=>{const h=[],w=`${x.name}`,S=v=>{if(!v)return null;const _=n.get(v);return _||e.push(`页面 ${w} 的条目引用了已删除的变量，已按普通文本生成`),_??null};switch(d.kind){case"text":{const v=T(d.text,d.scale);v&&h.push(`    ${v}`);break}case"number":{const v=d,_=S(v.varId);if(_&&v.editable!==!1){const k=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Y(_.step)}, ${Y(_.min)}, ${Y(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;h.push(`    ${k}`)}if(_)h.push(`    ${ie(v.text,v.scale,_.name)}`),v.editable!==!1&&!/%[-+ #0]*[a-zA-Z]/.test(v.text)&&e.push(`数值条目 "${w}" 的显示文本不含格式化占位符（如 %d）`);else if(/%[-+ #0]*[a-zA-Z]/.test(v.text)){e.push(`页面 ${w} 的数值条目未绑定变量但文本含占位符，已按普通文本生成`);const k=T(v.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),v.scale);k&&h.push(`    ${k}`)}else{const k=T(v.text,v.scale);k&&h.push(`    ${k}`)}break}case"switch":{const v=d,_=S(v.varId);if(_){if(_.srcType!=="uint8"){e.push(`开关条目绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`);const k=T(v.text,v.scale);k&&h.push(`    ${k}`);break}h.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(v.openValue)});`),h.push(`    ${ie(v.text,v.scale,`${_.name} ? "${ne(v.onText)}" : "${ne(v.offText)}"`)}`),/%[-+ #0]*s/.test(v.text)||e.push(`开关条目 "${_.name}" 的显示文本建议包含 %s 用于显示 on/off`)}else{const k=T(v.text,v.scale);k&&h.push(`    ${k}`)}break}case"button":{const v=X(d.cbName,"btn_cb");h.push(`    u8g2_MenuItem_button(${v}, ${Math.trunc(d.buttonId)});`);const _=T(d.text,d.scale);_&&h.push(`    ${_}`);break}case"submenu":{if(!d.targetPageId){e.push(`页面 ${w} 的子页面条目 "${d.text||d.label||d.id}" 未指定目标页面，已按普通文本生成`);const k=T(d.text,d.scale);k&&h.push(`    ${k}`);break}const v=a.pages.findIndex(k=>k.id===d.targetPageId);if(v<0){e.push(`页面 ${w} 的子页面条目目标无效`);break}h.push(`    u8g2_MenuItem_menu_enter(${u[v]});`);const _=T(d.text,d.scale);_&&h.push(`    ${_}`);break}case"back":{h.push("    u8g2_MenuItem_menu_back();");const v=T(d.text,d.scale);v&&h.push(`    ${v}`);break}case"slider":case"progress":{const v=S(d.varId);if(!v){e.push(`页面 ${w} 的${d.kind==="slider"?"滑块":"进度"}条目未绑定变量，已跳过`);break}if(!at.has(v.srcType)){e.push(`滑块/进度条绑定的变量 "${v.name}" 须为整型（当前 ${v.srcType}），已跳过`);break}const _=d.kind==="slider"?"Slider":"ProgressBar";h.push(`    u8g2_MenuDrawItem${_}_bind(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`);break}case"chart":{const v=g.get(d.id),_=f.get(d.id);if(!v||!_)break;h.push(...v),h.push(_);break}case"xbm":h.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(d.w)}, ${Math.trunc(d.h)}, menu_xbm_${C.get(d.id)??X(d.name,"icon")});`);break;case"textarea":{const v=de++;h.push(...q[v].split(`
`));const _=d.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";h.push(`    ${_}(&ta${v}, ${Math.max(10,Math.trunc(d.height))});`);break}case"board":{const v=X(d.cbName,"board_cb");h.push(`    u8g2_MenuDrawItemBoard(${v}, ${Math.max(1,Math.trunc(d.w))}, ${Math.max(1,Math.trunc(d.h))});`);break}}return h},b=[];b.push("/**"),b.push(` * 由 u8g2-menu-editor 自动生成，工程: ${a.name}`),b.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),b.push(" */"),b.push('#include "menu_pages.h"'),b.push('#include "u8g2_menu.h"'),(a.chartBuffers??[]).some(d=>d.sample==="sine")&&b.push("#include <math.h>"),b.push(""),b.push(z("includes",r,"")),b.push(""),b.push("/* ======================== 变量定义 ======================== */"),b.push(z("variables",r,""));for(const d of i.values())b.push(`${d.type} ${d.name} = ${d.init};`);if(b.push(""),(m.length||c.length||U.length||L.length)&&(b.push("/* ======================== 页面资源 ======================== */"),b.push(...m,...c,...U,...L),b.push("")),o.size||l.size){b.push("/* ======================== 回调函数 ======================== */"),b.push(z("callbacks",r,""));for(const[d]of o)b.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID)`),b.push("{"),b.push(z(`cb_${d}`,r,"    ")),b.push("}"),b.push("");for(const d of l)b.push(`void ${d}(u8g2_t *u8g2)`),b.push("{"),b.push(z(`cb_${d}`,r,"    ")),b.push("}"),b.push("")}const E=(a.weakHooks??[]).map(d=>te.find(x=>x.fn===d)).filter(d=>!!d);if(E.length||r.has("weak")||te.some(d=>(r.get(`weak_${d.fn}`)??"").trim())){b.push("/* ==================== 弱定义函数重写 ==================== */"),b.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),b.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const x=te.filter(h=>{var w;return!((w=a.weakHooks)!=null&&w.includes(h.fn))&&(r.get(`weak_${h.fn}`)??"").trim()}).map(h=>[`#if 0   /* 已取消勾选 ${h.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${h.decl}`,"{",z(`weak_${h.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);b.push(x?`${z("weak",r,"").replace(/\n$/,"")}
${x}
`:z("weak",r,"")),b.push("");for(const h of E){b.push(`/* ${h.label}: ${h.desc} */`),b.push(`${h.decl}`),b.push("{"),b.push(z(`weak_${h.fn}`,r,"    "));const w=h.bodyArgs.split(`
`).map(S=>`    ${S}`);h.retNote&&w.push(`    ${h.retNote}`),b.push(...w),b.push("}"),b.push("")}}b.push("/* ======================== 页面函数 ======================== */"),b.push(""),a.pages.forEach((d,x)=>{b.push(`/* 页面: ${d.name} */`),b.push(`void ${u[x]}(void)`),b.push("{"),b.push(z(`page_${u[x]}_pre`,r,"    "));for(const h of d.items)b.push(...Q(h,d));b.push("}"),b.push("")});const y=[];if(y.push("#ifndef MENU_PAGES_H"),y.push("#define MENU_PAGES_H"),y.push(""),y.push('#include "u8g2_menu.h"'),y.push(""),y.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"),u.forEach((d,x)=>y.push(`void ${d}(void);   /* ${a.pages[x].name} */`)),y.push(""),i.size){y.push("/* 可编辑变量（在条目绑定中使用） */");for(const d of i.values())y.push(`extern ${d.type} ${d.name};`);y.push("")}if(o.size||l.size){y.push("/* 用户回调 */");for(const[d]of o)y.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID);`);for(const d of l)y.push(`void ${d}(u8g2_t *u8g2);`);y.push("")}y.push("#endif /* MENU_PAGES_H */");const Z=b.join(`
`).replace(/\n{3,}/g,`


`),se=y.join(`
`);return{c:`${Z}
`,h:`${se}
`,warnings:e}}function ge(a,t){return t?a.get(t)??null:null}var B=(a=>(a[a.None=0]="None",a[a.Up=1]="Up",a[a.Down=2]="Down",a[a.Enter=3]="Enter",a[a.Return=4]="Return",a[a.Add=5]="Add",a[a.Sub=6]="Sub",a))(B||{});const it=8192/8;function st(a){return new Promise((t,e)=>{const r=document.createElement("script");r.src=a,r.onload=()=>t(),r.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${a}`)),document.head.appendChild(r)})}class rt{constructor(t,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.lastKnownPage=0,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(t){if(this.mod)return;const e=window;e.U8G2MenuPreview||await st(t);const r=e.U8G2MenuPreview;if(!r)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await r({locateFile:i=>t.replace(/[^/\\]*$/,"")+i}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const u=this.mod._em_font_count_export();for(let i=0;i<u;i++){const n=this.mod._em_font_name(i);this.fontIndexCache.set(this.mod.UTF8ToString(n),i)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(t){return this.fontIndexCache.get(t)??0}signature(t){return JSON.stringify({bufs:(t.chartBuffers??[]).map(e=>`${e.name}|${e.dataLen}|${e.sample}`),pages:t.pages.map(e=>({n:e.items.length,k:e.items.map(r=>r.kind).join(","),res:e.items.map(r=>r.kind==="chart"?(r.sources??[]).map(u=>`${u.bufferId}|${u.chartKind}|${u.min??"a"}|${u.max??"a"}`).join(">"):r.kind==="xbm"?`${r.w}x${r.h}`:r.kind==="textarea"?Math.ceil(r.content.length/64):"").join(",")}))})}sync(t){const e=this.mod;if(!e)return;const r=this.signature(t);r!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=r);const u=l=>Math.trunc(Number.isFinite(l)?l:0),i=l=>l?(t.variables??[]).findIndex(m=>m.id===l):-1,n=new Map((t.variables??[]).map(l=>[l.id,l]));(t.chartBuffers??[]).forEach((l,m)=>{e.ccall("em_buf_define",null,["number","number","number"],[m,u(l.dataLen),{sine:0,ramp:1,noise:2,none:3}[l.sample]])});const o=l=>(t.chartBuffers??[]).findIndex(m=>m.id===l);t.pages.forEach((l,m)=>{e.ccall("em_page_begin",null,["number"],[m]),l.items.forEach((s,c)=>{const g=["number","number"];switch(s.kind){case"text":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,0,0,s.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,s.text]);break;case"number":{const f=ge(n,s.varId);e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,1,f?{uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[f.type]:0,s.scale,0,0,0,0,0,f?u(f.initialValue):0,f?u(f.step):0,f?u(f.min):0,f?u(f.max):0,-1,0,0,0,0,s.editable===!1?1:0,i(s.varId)]),e.ccall("em_item_text",null,["number","number","string"],[m,c,s.text]);break}case"switch":{const f=ge(n,s.varId);e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,2,0,s.scale,0,0,u(s.openValue),0,0,f?u(f.initialValue):0,0,0,0,-1,0,0,0,0,0,i(s.varId)]),e.ccall("em_item_text",null,["number","number","string"],[m,c,s.text]),e.ccall("em_item_swtext",null,["number","number","string","string"],[m,c,s.onText,s.offText]);break}case"button":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,3,0,s.scale,0,0,0,u(s.buttonId),0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,s.text]);break;case"submenu":{const f=t.pages.findIndex($=>$.id===s.targetPageId);e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,4,0,s.scale,0,0,0,0,0,0,0,0,0,f,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,s.text]);break}case"back":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,5,0,s.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,s.text]);break;case"slider":case"progress":{const f=ge(n,s.varId),$=s.kind==="slider"?5:6;e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,$,0,1,0,0,0,0,0,f?u(f.initialValue):0,f?u(f.step):0,f?u(f.min):0,f?u(f.max):0,-1,0,0,0,0,0,i(s.varId)]);break}case"chart":{e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,8,0,1,0,0,0,0,0,0,0,0,0,-1,0,0,u(s.height),0,0,-1]);for(const f of s.sources??[]){const $=f.min!==void 0&&f.max!==void 0?1:0;e.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[m,c,o(f.bufferId),{line:0,point:1,bar:2}[f.chartKind],$,$?f.max??0:0,$?f.min??0:0])}break}case"xbm":{e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,9,0,1,0,0,0,0,0,0,0,0,0,-1,u(s.w),u(s.h),0,0,0,-1]);const f=e._em_scratch(s.bits.length);f&&(e.HEAPU8.set(new Uint8Array(s.bits),f),e._em_item_bits(m,c,f,s.bits.length));break}case"textarea":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,10,0,1,0,s.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,u(s.height),0,u(s.lineSpacing),-1]),e.ccall("em_item_text",null,["number","number","string"],[m,c,s.content]);break;case"board":e.ccall("em_page_item",null,[...g,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[m,c,11,0,1,0,0,0,0,0,0,0,0,0,-1,u(s.w),u(s.h),0,0,0,-1]);break}}),e.ccall("em_page_end",null,["number","number"],[m,l.items.length])}),e.ccall("em_pages_commit",null,["number"],[t.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(t.font),{default:0,rotundity:1,square:2}[t.selector],u(t.selectorLeftMargin),u(t.selectorTopMargin),u(t.selectorLineSpacing),t.marqueeSpeed,t.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const t=e=>{if(!this.running)return;const r=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(r),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(t){var o,l;const e=this.mod;if(!e)return;const r=e._em_frame(t);if(!r)return;this.img||(this.img=this.ctx.createImageData(128,64));const u=e.HEAPU8.subarray(r,r+it),i=this.img.data;i.fill(255);for(let m=0;m<64;m++){const s=(m>>3)*128,c=1<<(m&7);let g=m*128*4;for(let f=0;f<128;f++)u[s+f]&c&&(i[g]=17,i[g+1]=24,i[g+2]=39),g+=4}this.ctx.putImageData(this.img,0,0);const n=e._em_get_current_page();n!==this.lastKnownPage&&(this.lastKnownPage=n,(l=(o=this.events).onPageChanged)==null||l.call(o,n))}key(t){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[t])}navTo(t){var e;(e=this.mod)==null||e.ccall("em_nav",null,["number"],[t])}getInt(t){var e;return((e=this.mod)==null?void 0:e._em_get_ipool(t))??0}getSwitch(t){var e;return((e=this.mod)==null?void 0:e._em_get_upool(t))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const ut=Object.keys(me);function ot(a,t,e,r){const u=a.getState(),i=e.label||"text"in e&&e.text||me[e.kind],n=o=>l=>{l.stopPropagation(),a.getState().moveItem(t.id,e.id,o)};return p.html`<div class="ume-item-row ${r?"selected":""}"
    @click=${()=>a.getState().select(t.id,e.id)}>
    <span class="ume-item-icon">${Oe[e.kind]}</span>
    <span class="ume-item-name" title=${i}>${i}</span>
    <button class="ume-mini" title="上移" @click=${n(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${n(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${o=>{o.stopPropagation(),u.duplicateItem(t.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${o=>{o.stopPropagation(),u.removeItem(t.id,e.id)}}>✕</button>
  </div>`}function lt(a,t){const e=a.getState();return p.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${r=>{const u=r.target.value;u&&e.addItem(u,t.id),r.target.value=""}}>
    <option value="">＋条目</option>
    ${ut.map(r=>p.html`<option value=${r}>${me[r]}</option>`)}
  </select>`}function ct(a,t){const{project:e,selection:r}=t.getState(),u=i=>{const n=t.getState(),o=r.pageId===i.id;return p.html`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>t.getState().select(i.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${i.name}</span>
        <button class="ume-mini" title="上移页面" @click=${l=>{l.stopPropagation(),n.movePage(i.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${l=>{l.stopPropagation(),n.movePage(i.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${l=>{if(l.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${i.name}"？`)&&n.removePage(i.id)}}>✕</button>
      </div>
      ${o?p.html`<div class="ume-page-items">
        ${i.items.length?i.items.map(l=>ot(t,i,l,r.itemId===l.id)):p.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${lt(t,i)}</div>
      </div>`:p.nothing}
    </div>`};p.render(p.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>mt(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(u)}
  `,a)}function mt(a){const t=prompt("页面名称:",`页面${a.getState().project.pages.length+1}`);t!==null&&a.getState().addPage(t||void 0)}function D(a,t,e,r=""){return p.html`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${t??""} placeholder=${r}
      @change=${u=>e(u.target.value)} />
  </div>`}function P(a,t,e,r=1){return p.html`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(t)} step=${String(r)}
      @change=${u=>{const i=parseFloat(u.target.value);e(Number.isFinite(i)?i:0)}} />
  </div>`}function H(a,t,e,r){return p.html`<div class="ume-field">
    <label>${a}</label>
    <select @change=${u=>r(u.target.value)}>
      ${e.map(u=>p.html`<option value=${u.value} ?selected=${u.value===t}>${u.label}</option>`)}
    </select>
  </div>`}function ve(a,t,e){return p.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${r=>e(r.target.checked)} />
    <span>${a}</span>
  </div>`}function Se(a,t,e,r=!1){return p.html`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${r?"font-family:Consolas,monospace":""}
      @change=${u=>e(u.target.value)}>${t??""}</textarea>
  </div>`}function ce(a,t,e="text/plain"){const r=new Blob([t],{type:`${e};charset=utf-8`}),u=document.createElement("a");u.href=URL.createObjectURL(r),u.download=a,u.click(),setTimeout(()=>URL.revokeObjectURL(u.href),5e3)}const dt=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]),Le={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function xe(a,t,e,r){const u=[{value:"",label:"（未绑定）"},...e.map(n=>({value:n.id,label:`${n.name} : ${Le[n.type]??n.type}`}))],i=t?e.some(n=>n.id===t):!1;return p.html`
    ${H(a,t??"",u,n=>r(n||null))}
    ${t&&!i?p.html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:p.nothing}
    ${e.length===0?p.html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:p.nothing}
  `}function $e(a,t,e){return p.html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{const r=a.getState().addVariable();a.getState().updateItem(t,e,{varId:r.id})}}>＋ 新建变量并绑定</button>
  </div>`}function _e(a){return a?p.html`<div class="ume-hint">
    ${a.name} : ${Le[a.type]??a.type}，范围 ${a.min}~${a.max}，步长 ${a.step}，初值 ${a.initialValue}
    （在右侧「变量」区修改）
  </div>`:p.html`${p.nothing}`}function pt(a,t,e){const{project:r,selection:u}=t.getState(),i=r.pages.find(s=>s.id===u.pageId)??null,n=(i==null?void 0:i.items.find(s=>s.id===u.itemId))??null,o=(s,c)=>t.getState().updateItem(i.id,n.id,s,c);let l=p.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,m="属性";if(i&&!n)m="页面属性",l=p.html`
      ${D("名称",i.name,s=>t.getState().updatePage(i.id,{name:s}))}
      ${D("C 函数名",i.fnName,s=>t.getState().updatePage(i.id,{fnName:s}),"留空自动 page_N")}
      ${Se("用户代码",i.userCodePre,s=>t.getState().updatePage(i.id,{userCodePre:s}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(i&&n)switch(m=`${me[n.kind]}`,n.kind){case"text":l=p.html`
          ${D("文本/格式",n.text,s=>o({text:s},`text-${n.id}`))}
          ${H("大小",String(n.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],s=>o({scale:Number(s)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{const s=n,c=r.variables??[],g=c.find($=>$.id===s.varId),f=g&&(g.type==="float"||g.type==="double")?"float/double 推荐格式 %.1f / %.2f":"整数推荐格式 %d（无符号用 %u）";l=p.html`
          ${xe("绑定变量",s.varId,c,$=>o({varId:$}))}
          ${g?p.nothing:$e(t,i.id,s.id)}
          ${ve("可编辑（绑定附加值，取消则仅显示）",s.editable!==!1,$=>o({editable:$}))}
          ${_e(g)}
          ${D("显示文本",s.text,$=>o({text:$},`text-${n.id}`))}
          ${H("大小",String(s.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],$=>o({scale:Number($)}))}
          <div class="ume-hint">${f}；文本支持 \n 多行</div>
        `;break}case"switch":{const s=n,c=(r.variables??[]).filter(f=>f.type==="uint8"),g=c.find(f=>f.id===s.varId)??(r.variables??[]).find(f=>f.id===s.varId);l=p.html`
          ${xe("绑定变量",s.varId,c,f=>o({varId:f}))}
          ${g?p.nothing:$e(t,i.id,s.id)}
          ${_e(g)}
          ${D("显示文本",s.text,f=>o({text:f},`text-${n.id}`))}
          ${P("openValue",s.openValue,f=>o({openValue:Math.max(0,Math.trunc(f))}))}
          ${D('"开"文本',s.onText,f=>o({onText:f}))}
          ${D('"关"文本',s.offText,f=>o({offText:f}))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;break}case"button":{const s=n;l=p.html`
          ${D("显示文本",s.text,c=>o({text:c},`text-${n.id}`))}
          ${D("回调函数名",s.cbName,c=>o({cbName:c}))}
          ${P("ID",s.buttonId,c=>o({buttonId:Math.trunc(c)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{const s=n;l=p.html`
          ${D("显示文本",s.text,c=>o({text:c},`text-${n.id}`))}
          ${H("目标页面",s.targetPageId??"",[{value:"",label:"（未设置）"},...r.pages.filter(c=>c.id!==i.id).map(c=>({value:c.id,label:c.name}))],c=>o({targetPageId:c||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{l=p.html`
          ${D("显示文本",n.text,s=>o({text:s},`text-${n.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{const s=(r.variables??[]).filter(g=>dt.has(g.type)),c=s.find(g=>g.id===n.varId)??(r.variables??[]).find(g=>g.id===n.varId);l=p.html`
          ${xe("绑定变量",n.varId,s,g=>o({varId:g}))}
          ${c?p.nothing:$e(t,i.id,n.id)}
          ${_e(c)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;break}case"chart":{const s=n,c=r.chartBuffers??[],g=$=>o({sources:$}),f=($,L)=>{const U=c.find(M=>M.id===$.bufferId),q=$.min===void 0||$.max===void 0;return p.html`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(U==null?void 0:U.name)??"(无效)"}</span>
              <span class="ume-var-meta">${{line:"折线",point:"散点",bar:"柱状"}[$.chartKind]??$.chartKind}${q?" · 自动量程":` · ${$.min}~${$.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>g(s.sources.filter((M,C)=>C!==L))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${H("缓冲区",$.bufferId,c.map(M=>({value:M.id,label:`${M.name} (${M.dataLen}点)`})),M=>g(s.sources.map((C,K)=>K===L?{...C,bufferId:M}:C)))}
              ${H("绘制",$.chartKind,[{value:"line",label:"折线"},{value:"point",label:"散点"},{value:"bar",label:"柱状"}],M=>g(s.sources.map((C,K)=>K===L?{...C,chartKind:M}:C)))}
              ${ve("自动量程",q,M=>g(s.sources.map((C,K)=>K===L?{...C,min:M?void 0:0,max:M?void 0:100}:C)))}
              ${q?p.nothing:p.html`
                ${P("量程上限",$.max??100,M=>g(s.sources.map((C,K)=>K===L?{...C,max:M}:C)),"any")}
                ${P("量程下限",$.min??0,M=>g(s.sources.map((C,K)=>K===L?{...C,min:M}:C)),"any")}`}
            </div>
          </div>`};l=p.html`
          ${P("高度(px)",s.height,$=>o({height:Math.max(4,Math.trunc($))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(s.sources??[]).map(f)}
              ${(s.sources??[]).length===0?p.html`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:p.nothing}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(s.sources??[]).length>=4}
                @click=${()=>{if(!c.length){const $=t.getState().addChartBuffer();g([...s.sources??[],{bufferId:$.id,chartKind:"line"}]);return}g([...s.sources??[],{bufferId:c[0].id,chartKind:"line"}])}}>＋ 添加数据源${(s.sources??[]).length>0?"（叠加）":""}</button>
              ${c.length?p.nothing:p.html`<div class="ume-hint">将自动新建数据源缓冲区（在右侧「数据源」区可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{const s=n;l=p.html`
          ${D("数组名",s.name,c=>o({name:c}))}
          ${P("宽(px)",s.w,c=>o({w:Math.min(128,Math.max(1,Math.trunc(c)))}))}
          ${P("高(px)",s.h,c=>o({h:Math.min(64,Math.max(1,Math.trunc(c)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(i.id,s.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${s.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const s=n;l=p.html`
          ${Se("文本内容",s.content,c=>o({content:c}))}
          ${P("高度(px)",s.height,c=>o({height:Math.max(10,Math.trunc(c))}))}
          ${P("行间距",s.lineSpacing,c=>o({lineSpacing:Math.max(0,Math.trunc(c))}))}
          ${ve("上下键滚动 (bind)",s.bindScroll,c=>o({bindScroll:c}))}
        `;break}case"board":{const s=n;l=p.html`
          ${P("宽(px)",s.w,c=>o({w:Math.max(1,Math.trunc(c))}))}
          ${P("高(px)",s.h,c=>o({h:Math.max(1,Math.trunc(c))}))}
          ${D("回调函数名",s.cbName,c=>o({cbName:c}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}p.render(p.html`
    <div class="ume-panel-title">属性 ${m!=="属性"?p.html`<span class="ume-kind-badge">${m}</span>`:p.nothing}</div>
    ${l}
  `,a)}let oe=null,we=null;const bt=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (小数)"},{value:"double",label:"double (小数)"}];function ht(a,t){const e=t.variables??[],r=i=>{oe=oe===i?null:i},u=i=>{const n=oe===i.id,o=(c,g)=>a.getState().updateVariable(i.id,c,g),l=i.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(i.name),m=e.filter(c=>c.name===i.name).length>1,s=ft(t,i.id);return p.html`<div class="ume-var-item ${n?"editing":""}">
      <div class="ume-var-row" @click=${()=>r(i.id)}>
        <span class="ume-var-name" title=${i.name}>${i.name||"(未命名)"}</span>
        <span class="ume-var-meta">${i.type} · ${i.min}~${i.max} · 步${i.step}${s?` · ${s} 处引用`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${c=>{c.stopPropagation();const g=a.getState().removeVariable(i.id);g>0&&alert(`该变量被 ${g} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`)}}>✕</button>
      </div>
      ${n?p.html`<div class="ume-var-edit">
        ${D("变量名",i.name,c=>o({name:c.trim()},`vn-${i.id}`))}
        ${l?p.html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:p.nothing}
        ${m?p.html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:p.nothing}
        ${H("类型",i.type,bt,c=>o({type:c}))}
        ${P("初始值",i.initialValue,c=>o({initialValue:c},`vi-${i.id}`),"any")}
        ${P("最小值",i.min,c=>o({min:c},`vmin-${i.id}`),"any")}
        ${P("最大值",i.max,c=>o({max:c},`vmax-${i.id}`),"any")}
        ${P("步长",i.step,c=>o({step:c},`vs-${i.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:p.nothing}
    </div>`};return p.html`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{oe=a.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(u):p.html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function ft(a,t){let e=0;for(const r of a.pages)for(const u of r.items)"varId"in u&&u.varId===t&&e++;return e}function gt(a,t){const e=t.chartBuffers??[],r=i=>{let n=0;for(const o of t.pages)for(const l of o.items)l.kind==="chart"&&l.sources.some(m=>m.bufferId===i)&&n++;return n},u=i=>{const n=we===i.id,o=(s,c)=>a.getState().updateChartBuffer(i.id,s,c),l=i.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(i.name),m=r(i.id);return p.html`<div class="ume-var-item ${n?"editing":""}">
      <div class="ume-var-row" @click=${()=>{we=n?null:i.id}}>
        <span class="ume-var-name" title=${i.name}>${i.name||"(未命名)"}</span>
        <span class="ume-var-meta">${i.dataLen} 点 · ${{sine:"正弦",ramp:"斜坡",noise:"伪随机",none:"手动填充"}[i.sample]}${m?` · ${m} 处引用`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${s=>{s.stopPropagation();const c=a.getState().removeChartBuffer(i.id);c>0&&alert(`该缓冲区被 ${c} 个图表条目的数据源引用，请先在条目里移除数据源再删除`)}}>✕</button>
      </div>
      ${n?p.html`<div class="ume-var-edit">
        ${D("数组名",i.name,s=>o({name:s.trim()},`bn-${i.id}`))}
        ${l?p.html`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:p.nothing}
        ${P("点数",i.dataLen,s=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(s)))},`bl-${i.id}`))}
        ${H("示例填充",i.sample,[{value:"sine",label:"正弦（演示）"},{value:"ramp",label:"斜坡（演示）"},{value:"noise",label:"伪随机（演示）"},{value:"none",label:"不填充（全部手写）"}],s=>o({sample:s}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:p.nothing}
    </div>`};return p.html`
    <div class="ume-panel-title">
      数据源缓冲区 (${e.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{we=a.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(u):p.html`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function vt(a,t){const{project:e}=t.getState(),r=(o,l)=>t.getState().update(m=>{Object.assign(m,o)},l),u=e.weakHooks??[],i=(o,l)=>{t.getState().update(m=>{const s=m.weakHooks??[];m.weakHooks=l?[...new Set([...s,o])]:s.filter(c=>c!==o)})},n=p.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${u.length}/${te.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${te.map(o=>p.html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote?"（返回 1 = 事件已处理 / 0 = 交给库）":""}`}>
              <input type="checkbox" ?checked=${u.includes(o.fn)}
                @change=${l=>i(o.fn,l.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;p.render(p.html`
    <div class="ume-panel-title">工程</div>
    ${D("工程名",e.name,o=>r({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width!==128||e.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    ${ht(t,e)}
    ${gt(t,e)}

    <div class="ume-panel-title">样式</div>
    ${H("字体",e.font,He.map(o=>({value:o.id,label:o.label})),o=>r({font:o}))}
    ${H("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],o=>r({selector:o}))}
    ${P("左边距",e.selectorLeftMargin,o=>r({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${P("顶边距",e.selectorTopMargin,o=>r({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${P("行间距",e.selectorLineSpacing,o=>r({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${P("跑马灯速度",e.marqueeSpeed,o=>r({marqueeSpeed:o}),.05)}
    ${P("跑马灯停留",e.marqueeHeaderLen,o=>r({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${n}
    ${p.nothing}
  `,a)}function xt(a,t){const e=u=>{let i;const n=()=>{i&&(clearInterval(i),i=void 0)};return{down:o=>{o.preventDefault(),t.key(u),n(),i=window.setInterval(()=>t.key(u),180)},up:n}},r=(u,i,n)=>{const o=e(u);return p.html`<button class="ume-key" title=${n}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${i}</button>`};p.render(p.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${u=>{const n={ArrowUp:B.Up,ArrowDown:B.Down,Enter:B.Enter,Escape:B.Return,Backspace:B.Return,"+":B.Add,"-":B.Sub,"=":B.Add,_:B.Sub}[u.key];n!==void 0&&(u.preventDefault(),t.key(n))}}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${r(B.Up,"▲","上 MENU_Key_Up")}
      ${r(B.Down,"▼","下 MENU_Key_Down")}
      ${r(B.Enter,"OK","确认 MENU_Key_Enter")}
      ${r(B.Return,"⌫","返回 MENU_Key_Return")}
      ${r(B.Add,"＋","加 MENU_Key_Add")}
      ${r(B.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,a)}let ee=null,J="c";function $t(a,t){ee=t,a.querySelectorAll(":scope > .ume-modal-mask").forEach(e=>e.remove()),_t(a)}function _t(a){if(!ee)return;const t=J==="c"?ee.c:ee.h,e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",u=>{u.target===e&&Me(e)});const r=()=>{p.render(p.html`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>Me(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${ee.warnings.length?p.html`
            <div style="margin-bottom:8px">
              ${ee.warnings.map(u=>p.html`<div class="ume-warn">⚠ ${u}</div>`)}
            </div>`:p.nothing}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${J==="c"?"primary":""}" @click=${()=>{J="c",r()}}>menu_pages.c</button>
            <button class="ume-btn sm ${J==="h"?"primary":""}" @click=${()=>{J="h",r()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${t}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(t).then(()=>wt(e,"已复制到剪贴板"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{ce(J==="c"?"menu_pages.c":"menu_pages.h",t)}}>下载 ${J==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,e)};r(),a.appendChild(e)}function Me(a){a.remove()}function wt(a,t){const e=a.closest(".ume")??document.body;let r=e.querySelector(".ume-toast");r||(r=document.createElement("div"),r.className="ume-toast",e.appendChild(r)),r.textContent=t,r.classList.add("show"),setTimeout(()=>r.classList.remove("show"),1600)}function yt(a,t,e,r){const i=t.getState().project.pages.find(b=>b.id===e),n=i==null?void 0:i.items.find(b=>b.id===r);if(!n||n.kind!=="xbm")return;const o=n;let l=o.w,m=o.h,s=[...o.bits];const c=()=>Math.ceil(l/8),g=document.createElement("div");g.className="ume-modal-mask",g.addEventListener("click",b=>{b.target===g&&Q()});const f=(b,E)=>{const y=E*c()+(b>>3);return y<s.length?!!(s[y]>>(b&7)&1):!1},$=(b,E,y)=>{const Z=E*c()+(b>>3);s[Z]=y?s[Z]|1<<(b&7):s[Z]&~(1<<(b&7))},L=(b,E)=>{const y=Math.ceil(l/8),Z=Math.ceil(b/8),se=new Array(Z*E).fill(0);for(let d=0;d<Math.min(m,E);d++)for(let x=0;x<Math.min(l,b);x++){const h=d*y+(x>>3);h<s.length&&s[h]>>(x&7)&1&&(se[d*Z+(x>>3)]|=1<<(x&7))}l=b,m=E,s=se};let U=!1,q=!0;const M=(b,E)=>y=>{y.preventDefault(),U=!0,q=!f(b,E),$(b,E,q),T()},C=(b,E)=>()=>{U&&($(b,E,q),T())},K=()=>{U=!1},T=()=>{p.render(de(),g)},ie=()=>{const b=[];for(let E=0;E<m;E++)for(let y=0;y<l;y++)b.push(p.html`<button class="ume-xbm-cell ${f(y,E)?"on":""}"
          data-x=${y} data-y=${E}
          @pointerdown=${M(y,E)}
          @pointerenter=${C(y,E)}></button>`);return b},de=()=>p.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${m}</span></span>
        <button class="ume-mini" @click=${Q}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${K}
        @pointerleave=${K}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${b=>{L(Ee(+b.target.value,1,128),m),T()}} />
          <input type="number" style="width:64px" .value=${String(m)} min="1" max="64"
            @change=${b=>{L(l,Ee(+b.target.value,1,64)),T()}} />
          <button class="ume-btn sm" @click=${()=>{s=s.map(()=>0),T()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{s=s.map(b=>~b&255),T()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${ie()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${Q}>取消</button>
        <button class="ume-btn primary" @click=${()=>{t.getState().updateItem(e,r,{w:l,h:m,bits:[...s]}),Q()}}>应用</button>
      </div>
    </div>
  `;function Q(){g.remove(),document.removeEventListener("pointerup",K)}document.addEventListener("pointerup",K),T(),a.appendChild(g)}function Ee(a,t,e){return Number.isFinite(a)?Math.min(e,Math.max(t,Math.trunc(a))):t}const kt="prebuilt/u8g2-menu-preview.js";class It{constructor(t,e={}){var s;if(this.store=Ne(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.container=t,this.opts={persistKey:"default",...e},t.classList.add("ume"),!document.getElementById("ume-style")){const c=document.createElement("style");c.id="ume-style",c.textContent=Ve,document.head.appendChild(c)}const r=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,u=this.opts.data??r??void 0;if(u!==void 0)try{this.store.setState({project:fe(u)})}catch(c){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",c)}const i=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,n=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;i&&n&&(this.lastExport={c:i,h:n}),t.innerHTML=`
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
    `;const o=c=>t.querySelector(c);this.els={left:o(".ume-left"),center:o(".ume-center"),right:o(".ume-right"),styleEl:o('[data-role="style"]'),propEl:o('[data-role="prop"]'),toolbarUndo:o('[data-act="undo"]'),toolbarRedo:o('[data-act="redo"]')};const l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column",l.style.alignItems="center",l.style.gap="10px",this.els.center.appendChild(l),this.preview=new rt(l,{onPageChanged:c=>this.onPreviewPageChanged(c)});const m=document.createElement("div");this.els.center.appendChild(m),xt(m,this.preview),this.preview.load(this.opts.wasmUrl??kt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(c=>{console.error(c);const g=document.createElement("div");g.className="ume-warn",g.textContent=`预览引擎加载失败: ${c.message}。编辑功能不受影响。`,this.els.center.prepend(g)}),t.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const c=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);c!==null&&this.store.getState().addPage(c||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),t.querySelector('[data-act="export-json"]').addEventListener("click",()=>{ce(`${this.store.getState().project.name||"menu-project"}.json`,ke(this.store.getState().project),"application/json")}),t.querySelector('[data-act="import"]').addEventListener("click",()=>{o('[data-role="file"]').click()}),o('[data-role="file"]').addEventListener("change",c=>{var f;const g=(f=c.target.files)==null?void 0:f[0];g&&(g.text().then($=>{try{const L=fe($);this.store.getState().update(U=>{Object.assign(U,L)}),this.scheduleRender()}catch(L){alert(`导入失败: ${L.message}`)}}),c.target.value="")}),t.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(((s=this.store.getState().project.pages[0])==null?void 0:s.id)??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(t){var r;const e=fe(t);this.store.getState().update(u=>{Object.assign(u,e)}),this.store.getState().select(((r=e.pages[0])==null?void 0:r.id)??null,null)}generate(){var r,u;const t=this.lastExport,e=Ie(this.store.getState().project,t??void 0);return this.lastExport={c:e.c,h:e.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,e.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,e.h)),$t(this.container,e),(u=(r=this.opts).onExport)==null||u.call(r,e),e}downloadC(){const t=Ie(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:t.c,h:t.h},ce("menu_pages.c",t.c),ce("menu_pages.h",t.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(t){const e=t.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"?(t.preventDefault(),t.shiftKey?this.store.getState().redo():this.store.getState().undo()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="y"&&(t.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(t){const e=this.store.getState().project.pages[t];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,ke(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const t=this.store.getState();ct(this.els.left,this.store),vt(this.els.styleEl,this.store),pt(this.els.propEl,this.store,{openXbmEditor:(e,r)=>yt(this.container,this.store,e,r)}),this.els.toolbarUndo.disabled=t.past.length===0,this.els.toolbarRedo.disabled=t.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var i;const t=document.getElementById("ume-live-value"),e=document.getElementById("ume-page-jump"),r=this.store.getState(),u=this.store.getState().project.pages.findIndex(n=>n.id===r.selection.pageId);if(e){const n=r.project.pages,o=n.map(m=>m.name).join("|");e.dataset.sig!==o&&(e.dataset.sig=o,e.innerHTML="",n.forEach((m,s)=>{const c=document.createElement("option");c.value=String(s),c.textContent=`${s+1}. ${m.name}`,e.appendChild(c)}),e.onchange=()=>{const m=parseInt(e.value,10);Number.isFinite(m)&&this.preview.navTo(m)});const l=this.preview.currentPage;document.activeElement!==e&&e.value!==String(l)&&(e.value=String(l))}if(t&&u>=0&&r.selection.itemId){const n=r.project.pages[u],o=n.items.findIndex(m=>m.id===r.selection.itemId),l=n.items[o];if(l&&"varId"in l){const m=l.varId?(r.project.variables??[]).findIndex(f=>f.id===l.varId):-1,s=m>=0?m:u*64+o,c=l.kind==="switch"?this.preview.getSwitch(s):this.preview.getInt(s),g=(i=(r.project.variables??[]).find(f=>f.id===l.varId))==null?void 0:i.name;t.textContent=`${g??l.kind} = ${c}`}else t.textContent=""}}}exports.MenuEditor=It;exports.MenuKey=B;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
