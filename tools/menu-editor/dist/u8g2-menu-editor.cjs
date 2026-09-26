"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const He=require("zustand/vanilla"),d=require("lit-html"),We=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
/* ---------- 右栏 Tab ---------- */
.ume-tabs { display: flex; gap: 2px; margin: -10px -10px 10px; padding: 4px 8px 0; border-bottom: 1px solid var(--ume-border); background: var(--ume-panel); }
.ume-tabs button { border: none; border-bottom: 2px solid transparent; background: transparent; padding: 6px 14px 5px; font: inherit; font-size: 12px; color: var(--ume-dim); cursor: pointer; }
.ume-tabs button:hover { color: var(--ume-text); }
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`,ge=1,ae=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],oe={text:"文本",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},Xe={text:"T",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},pe={none:"无",value:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回"},Ze=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];let ve=0;function q(s){return ve=(ve+1)%1e9,`${s}_${Date.now().toString(36)}_${ve.toString(36)}`}function fe(s){return{id:q("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...s}}function Be(s){return{id:q("buf"),name:"buf_new",dataLen:32,sample:"sine",...s}}function Ye(s,a){const n=new Set(s.map(i=>i.name));if(!n.has(a))return a;let t=2;for(;n.has(`${a}_${t}`);)t++;return`${a}_${t}`}function Ge(s,a){const n=new Set(s.map(i=>i.name));if(!n.has(a))return a;let t=2;for(;n.has(`${a}_${t}`);)t++;return`${a}_${t}`}function X(s){const a={id:q("it"),label:"",bind:{type:"none"}};switch(s){case"text":return{...a,kind:s,text:"菜单项",scale:1,displayVarId:null};case"slider":return{...a,kind:s,position:50};case"progress":return{...a,kind:s,position:50};case"chart":return{...a,kind:s,sources:[],height:32};case"xbm":return Je(16,16);case"textarea":return{...a,kind:s,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...a,kind:s,w:64,h:32,cbName:"board_cb"}}}function Je(s,a){const n=Math.ceil(s/8);return{id:q("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:s,h:a,bits:new Array(n*a).fill(0)}}function xe(s){return{id:q("pg"),name:s,fnName:"",items:[]}}function de(s,a){return{...s,...a}}function ee(s,a){return{...s,...a}}function Qe(){const s=[fe({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),fe({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),fe({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],a=[Be({name:"buf_demo",dataLen:32,sample:"sine"})],n=xe("主页");n.items=[de(X("text"),{text:"u8g2_menu"}),ee(X("text"),{text:"系统设置",bind:{type:"submenu",targetPageId:null}}),ee(X("text"),{text:"关于",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];const t=xe("设置");t.items=[ee(de(X("text"),{text:"音量:%d"}),{bind:{type:"value",varId:s[0].id}}),ee(de(X("text"),{text:"开关:%s"}),{bind:{type:"switch",varId:s[1].id,openValue:1,onText:"on",offText:"off"}}),ee(X("slider"),{bind:{type:"value",varId:s[2].id}}),ee(X("text"),{text:"图表",bind:{type:"submenu",targetPageId:null}}),ee(X("text"),{text:"返回",bind:{type:"back"}})];const i=xe("图表");i.items=[de(X("chart"),{height:36,sources:[{bufferId:a[0].id,chartKind:"line"}]}),ee(X("text"),{text:"返回",bind:{type:"back"}})];const r={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:s,chartBuffers:a,pages:[n,t,i]};return n.items[1].bind.targetPageId=t.id,t.items[3].bind.targetPageId=i.id,r}function et(s){return structuredClone(s)}function tt(s){const a=new Map,n=(t,i,r,e)=>{if(!t)return;let o=a.get(t);o||(o={name:t,asButton:!1,asBoard:!1,refs:[]},a.set(t,o)),i==="button"?o.asButton=!0:o.asBoard=!0,o.refs.push({pageId:r.id,itemId:e.id,pageName:r.name,label:e.label||("text"in e?e.text:"")||oe[e.kind]})};for(const t of s.pages)for(const i of t.items)i.bind.type==="button"&&n(i.bind.cbName,"button",t,i),i.kind==="board"&&n(i.cbName,"board",t,i);return[...a.values()].sort((t,i)=>t.name.localeCompare(i.name))}const nt=800;function at(){let s=null,a=0;return He.createStore()((n,t)=>({project:Qe(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(i,r)=>{const e=Date.now(),o=!!r&&r===s&&e-a<nt;s=r??null,a=e,n(u=>{const l=et(u.project);return i(l),{project:l,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{n(i=>i.past.length?{project:i.past[i.past.length-1],past:i.past.slice(0,-1),future:[i.project,...i.future.slice(0,99)],dirty:!0}:i)},redo:()=>{n(i=>{if(!i.future.length)return i;const[r,...e]=i.future;return{project:r,past:[...i.past,i.project],future:e,dirty:!0}})},select:(i,r=null)=>n({selection:{pageId:i,itemId:r}}),addPage:i=>{const r={id:q("pg"),name:i??`页面${t().project.pages.length+1}`,fnName:"",items:[]};return t().update(e=>{e.pages.push(r)}),n({selection:{pageId:r.id,itemId:null}}),r},removePage:i=>{t().update(e=>{e.pages=e.pages.filter(o=>o.id!==i);for(const o of e.pages)for(const u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===i&&(u.bind.targetPageId=null)});const{selection:r}=t();r.pageId===i&&n({selection:{pageId:null,itemId:null}})},movePage:(i,r)=>{t().update(e=>{const o=e.pages.findIndex(l=>l.id===i),u=o+r;o<0||u<0||u>=e.pages.length||([e.pages[o],e.pages[u]]=[e.pages[u],e.pages[o]])})},updatePage:(i,r)=>{t().update(e=>{const o=e.pages.find(u=>u.id===i);o&&Object.assign(o,r)})},addItem:(i,r)=>{var u;const e=r??t().selection.pageId??((u=t().project.pages[0])==null?void 0:u.id);if(!e)return null;const o=X(i);return t().update(l=>{const m=l.pages.find(f=>f.id===e);m==null||m.items.push(o)}),n({selection:{pageId:e,itemId:o.id}}),o},removeItem:(i,r)=>{t().update(o=>{const u=o.pages.find(l=>l.id===i);u&&(u.items=u.items.filter(l=>l.id!==r))});const{selection:e}=t();e.itemId===r&&n({selection:{pageId:i,itemId:null}})},moveItem:(i,r,e)=>{t().update(o=>{const u=o.pages.find(f=>f.id===i);if(!u)return;const l=u.items.findIndex(f=>f.id===r),m=l+e;l<0||m<0||m>=u.items.length||([u.items[l],u.items[m]]=[u.items[m],u.items[l]])})},duplicateItem:(i,r)=>{let e=null;t().update(o=>{const u=o.pages.find(m=>m.id===i);if(!u)return;const l=u.items.findIndex(m=>m.id===r);l<0||(e=structuredClone(u.items[l]),e.id=q("it"),u.items.splice(l+1,0,e))}),e&&n({selection:{pageId:i,itemId:e.id}})},updateItem:(i,r,e,o)=>{t().update(u=>{const l=u.pages.find(f=>f.id===i),m=l==null?void 0:l.items.find(f=>f.id===r);m&&Object.assign(m,e)},o)},addVariable:i=>{let r=null;return t().update(e=>{e.variables=e.variables??[];const o=Ge(e.variables,(i==null?void 0:i.name)??"var_new");r=fe({...i,name:o}),e.variables.push(r)}),r},removeVariable:i=>{let r=0;for(const e of t().project.pages)for(const o of e.items)"varId"in o&&o.varId===i&&r++;return r>0?r:(t().update(e=>{e.variables=(e.variables??[]).filter(o=>o.id!==i)}),0)},updateVariable:(i,r,e)=>{t().update(o=>{const u=(o.variables??[]).find(l=>l.id===i);u&&Object.assign(u,r)},e)},addChartBuffer:i=>{let r=null;return t().update(e=>{e.chartBuffers=e.chartBuffers??[];const o=Ye(e.chartBuffers,(i==null?void 0:i.name)??"buf_new");r=Be({...i,name:o}),e.chartBuffers.push(r)}),r},removeChartBuffer:i=>{let r=0;for(const e of t().project.pages)for(const o of e.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===i)&&r++;return r>0?r:(t().update(e=>{e.chartBuffers=(e.chartBuffers??[]).filter(o=>o.id!==i)}),0)},updateChartBuffer:(i,r,e)=>{t().update(o=>{const u=(o.chartBuffers??[]).find(l=>l.id===i);u&&Object.assign(u,r)},e)}}))}class ne extends Error{}const Ke=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),De=new Set(["line","point","bar"]),Ue=new Set(["sine","ramp","noise","none"]);function ie(s){return typeof s=="object"&&s!==null&&!Array.isArray(s)}function K(s,a){return typeof s=="string"?s:a}function T(s,a){return typeof s=="number"&&Number.isFinite(s)?s:a}const it=["text","slider","progress","chart","xbm","textarea","board"],st=["number","switch","button","submenu","back"],rt=["none","value","switch","button","submenu","back"];function ot(s){if(!ie(s))throw new ne("条目格式错误");const a=K(s.kind,"");if(!(it.includes(a)||st.includes(a)))throw new ne(`未知条目类型: ${String(a)}`);const n=structuredClone(s);switch(n.id=K(s.id,""),n.id||(n.id=`it_${Math.random().toString(36).slice(2,10)}`),n.label=K(s.label,""),a){case"text":case"number":case"switch":case"button":case"submenu":case"back":n.text=K(s.text,""),n.scale=s.scale===2?2:1;break}return n}function ut(s){for(const a of s)for(const n of a.items){const t=n;if(!(t.bind&&ie(t.bind)&&rt.includes(K(t.bind.type,"none")))){switch(t.kind){case"number":{const i=t.varId??null;t.editable===!1?(t.kind="text",t.displayVarId=i,t.bind={type:"none"}):(t.kind="text",t.displayVarId=null,t.bind={type:"value",varId:i});break}case"switch":t.kind="text",t.displayVarId=null,t.bind={type:"switch",varId:t.varId??null,openValue:T(t.openValue,1),onText:K(t.onText,"on"),offText:K(t.offText,"off")};break;case"button":t.kind="text",t.displayVarId=null,t.bind={type:"button",cbName:K(t.cbName,"btn_cb"),buttonId:T(t.buttonId,1)};break;case"submenu":t.kind="text",t.displayVarId=null,t.bind={type:"submenu",targetPageId:t.targetPageId??null};break;case"back":t.kind="text",t.displayVarId=null,t.bind={type:"back"};break;case"slider":case"progress":t.bind=t.varId?{type:"value",varId:t.varId}:{type:"none"},t.position===void 0&&(t.position=50);break;default:t.bind={type:"none"},t.kind==="text"&&t.displayVarId===void 0&&(t.displayVarId=null);break}delete t.varId,delete t.varName,delete t.varType,delete t.editable,delete t.step,delete t.min,delete t.max,delete t.initialValue,delete t.decimals,t.kind!=="board"&&(delete t.cbName,delete t.buttonId),delete t.openValue,delete t.onText,delete t.offText,delete t.targetPageId}}}function lt(s){if(!ie(s))throw new ne("页面格式错误");const a=Array.isArray(s.items)?s.items.map(ot):[];return{id:K(s.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:K(s.name,"未命名页面"),fnName:K(s.fnName,""),items:a}}function ct(s){if(!ie(s))return null;const a=K(s.type,"int32");return{id:K(s.id,"")||q("vb"),name:K(s.name,""),type:Ke.has(a)?a:"int32",initialValue:T(s.initialValue,0),min:T(s.min,0),max:T(s.max,100),step:T(s.step,1)}}function dt(s){if(!ie(s))return null;const a=K(s.sample,"sine");return{id:K(s.id,"")||q("buf"),name:K(s.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(T(s.dataLen,32)))),sample:Ue.has(a)?a:"sine"}}function mt(s){const a=new Map,n=[],t=(i,r)=>{let e=a.get(i);return e||(e=r(),a.set(i,e),n.push(e)),e};for(const i of s)for(const r of i.items){const e=r;switch(r.kind){case"number":if(e.varId===void 0||e.varId===null){const u=typeof e.varName=="string"&&e.varName?e.varName:"var_unnamed",l=t(u,()=>({id:q("vb"),name:u,type:Ke.has(String(e.varType))?String(e.varType):"int32",initialValue:T(e.initialValue,0),min:T(e.min,0),max:T(e.max,100),step:T(e.step,1)}));r.varId=l.id}e.editable===void 0&&(r.editable=!0),delete e.varName,delete e.varType,delete e.step,delete e.min,delete e.max,delete e.initialValue,delete e.decimals;break;case"slider":case"progress":if(e.varId===void 0||e.varId===null){const u=typeof e.varName=="string"&&e.varName?e.varName:"var_unnamed",l=t(u,()=>({id:q("vb"),name:u,type:"int",initialValue:T(e.initialValue,0),min:T(e.min,0),max:T(e.max,100),step:T(e.step,1)}));r.varId=l.id}delete e.varName,delete e.step,delete e.min,delete e.max,delete e.initialValue;break;case"switch":if(e.varId===void 0||e.varId===null){const u=typeof e.varName=="string"&&e.varName?e.varName:"var_unnamed",l=t(u,()=>({id:q("vb"),name:u,type:"uint8",initialValue:T(e.initialValue,0),min:0,max:1,step:1}));r.varId=l.id}delete e.varName,delete e.initialValue;break}}return n}function $e(s){let a;if(typeof s=="string")try{a=JSON.parse(s)}catch{throw new ne("JSON 解析失败")}else a=s;if(!ie(a))throw new ne("不是有效的工程文件");const n=a,t=T(n.version,0);if(t>ge)throw new ne(`工程版本 v${t} 高于当前支持的 v${ge}，请升级编辑器`);const i=Array.isArray(n.pages)?n.pages.map(lt):[];if(!i.length)throw new ne("工程至少需要一个页面");const r=["default","rotundity","square"].includes(n.selector)?n.selector:"rotundity",e=new Set(ae.map(m=>m.fn)),o=Array.isArray(n.weakHooks)?[...new Set(n.weakHooks.filter(m=>typeof m=="string"&&e.has(m)))]:[];let u;Array.isArray(n.variables)?u=n.variables.map(ct).filter(m=>!!m):u=mt(i);let l;return Array.isArray(n.chartBuffers)?l=n.chartBuffers.map(dt).filter(m=>!!m):l=pt(i),ut(i),ft(i,l),{version:ge,name:K(n.name,"未命名工程"),width:T(n.width,128),height:T(n.height,64),font:K(n.font,"u8g2_font_wqy12_t_gb2312"),selector:r,selectorLeftMargin:T(n.selectorLeftMargin,16),selectorTopMargin:T(n.selectorTopMargin,0),selectorLineSpacing:T(n.selectorLineSpacing,0),marqueeSpeed:T(n.marqueeSpeed,.2),marqueeHeaderLen:T(n.marqueeHeaderLen,5),weakHooks:o,fontSubset:a.fontSubset===!0,fontExtra:K(a.fontExtra,""),variables:u,chartBuffers:l,pages:i}}function pt(s){const a=[];let n=0;const t=()=>{const i={id:q("buf"),name:`buf_chart_${++n}`,dataLen:32,sample:"sine"};return a.push(i),i};for(const i of s)for(const r of i.items){if(r.kind!=="chart")continue;const e=r;if(Array.isArray(e.sources))continue;const o=t();o.dataLen=Math.min(512,Math.max(2,Math.trunc(T(e.dataLen,32))));const u=K(e.sample,"sine");Ue.has(u)&&(o.sample=u);const l=K(e.chartKind,"line"),m={bufferId:o.id,chartKind:De.has(l)?l:"line"};e.max!==void 0&&e.max!==null&&(m.max=T(e.max,0)),e.min!==void 0&&e.min!==null&&(m.min=T(e.min,0)),r.sources=[m],e.height===void 0&&(r.height=32),delete e.chartKind,delete e.dataLen,delete e.sample,delete e.max,delete e.min}return a}function ft(s,a){const n=new Set(a.map(t=>t.id));for(const t of s)for(const i of t.items){if(i.kind!=="chart")continue;const r=i;Array.isArray(r.sources)||(r.sources=[]),i.sources=i.sources.filter(e=>n.has(e.bufferId)).map(e=>({bufferId:e.bufferId,chartKind:De.has(e.chartKind)?e.chartKind:"line",min:e.min,max:e.max})),typeof r.height!="number"&&(r.height=32)}}function Ae(s){return JSON.stringify(s,null,2)}const ht={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function Z(s,a="anon"){let n=s.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!n||/^[0-9]/.test(n))&&(n=`_${n}`),n||a}const he=/^[A-Za-z_][A-Za-z0-9_]*$/,Fe=new Set(["auto","break","case","char","const","continue","default","do","double","else","enum","extern","float","for","goto","if","inline","int","long","register","restrict","return","short","signed","sizeof","static","struct","switch","typedef","union","unsigned","void","volatile","while","_Bool","_Complex","_Imaginary"]);function Ce(s){return he.test(s)&&!Fe.has(s)}function se(s,a,n,t){let i=s;if(Fe.has(i)&&(i=`${i}_`,n.push(`${t} "${s}" 是 C 关键字，生成名改为 "${i}"`)),!a.has(i))return a.add(i),i;let r=2;for(;a.has(`${i}_${r}`);)r++;const e=`${i}_${r}`;return n.push(`${t} "${s}" 与其他生成符号冲突（页面函数/变量/缓冲区/字体数组），已改为 "${e}"`),a.add(e),e}function re(s){return s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function te(s){if(!Number.isFinite(s))return"0.0f";const a=s.toString();return/[-.]|e/i.test(a)?`${a}f`:`${a}.0f`}function bt(s,a,n){return n==="ramp"?`${s}[i] = (float)i;`:n==="noise"?`${s}[i] = (float)((i * 37) % ${a});`:`${s}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function gt(s){const a=new Map;if(!s)return a;const n=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let t;for(;(t=n.exec(s))!==null;)a.set(t[1],t[2]);return a}function W(s,a,n){const t=a.has(s)?a.get(s):"";return`${n}/* USER CODE BEGIN ${s} */${t}${n}/* USER CODE END ${s} */`}const vt=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function xt(s,a,n){const t=[],i=gt((a==null?void 0:a.c)??""),r=new Set;n&&r.add("menu_font");const e=[];s.pages.forEach((c,w)=>{let x=`page_${w}`;c.fnName&&(he.test(c.fnName)?x=c.fnName:t.push(`页面 "${c.name}" 的函数名 "${c.fnName}" 不是合法的 C 标识符，已回退为 page_${w}`)),e.push(se(x,r,t,`页面 "${c.name}" 的函数名`))});const o=new Map,u=new Map;for(const c of s.variables??[]){if(!c.name){t.push("存在未命名变量，已跳过");continue}he.test(c.name)||t.push(`变量名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${Z(c.name)}"`);const w=Z(c.name,"var");if(o.has(w)){t.push(`变量名 "${c.name}" 重复，以第一个为准`);continue}const x=se(w,r,t,`变量名 "${w}"`),I=c.type==="float"||c.type==="double",E={name:x,srcType:c.type,type:ht[c.type],init:I?te(c.initialValue):String(Math.trunc(c.initialValue)),isFloat:I,step:c.step,min:c.min,max:c.max};o.set(x,E),u.set(c.id,E)}const l=new Map,m=new Set,f=[],g=new Map,p=new Set;(s.chartBuffers??[]).forEach((c,w)=>{if(!c.name){t.push("存在未命名数据源缓冲区，已跳过");return}he.test(c.name)||t.push(`缓冲区名 "${c.name}" 不是合法的 C 标识符，已清洗为 "${Z(c.name)}"`);const x=Z(c.name,"buf");if(p.has(x)){t.push(`缓冲区名 "${c.name}" 与其它缓冲区重名，已跳过`);return}p.add(x);const I=se(x,r,t,`缓冲区名 "${x}"`),E=Math.max(2,Math.trunc(c.dataLen)),L=`${I.toUpperCase()}_LEN`;g.set(c.id,{name:I,lenMacro:L,len:E});const U=`fill_${I}`;if(!(i.get(U)??"").trim()){const M=i.get(`chart${w}_fill`);M&&M.trim()&&(i.set(U,M),t.push(`已将旧版 chart${w}_fill 手写内容迁移至 ${U}（后续请直接在该区内维护）`))}const H=(i.get(U)??"").trim()!=="";f.push(`#define ${L} ${E}`,`static float ${I}[${L}];`,`static uint8_t ${I}_filled = 0;`,`static void ${I}_fill(void)`,"{",W(U,i,"    "),...c.sample!=="none"&&!H?[`    for (uint16_t i = 0; i < ${L}; ++i) { ${bt(I,E,c.sample)} }`]:[],"}")});const h=[],y=new Map,v=new Map,b=new Map;{let c=0,w=0;const x=I=>{const E=g.get(I);return E?(b.has(I)||b.set(I,`        if (!${E.name}_filled) { ${E.name}_filled = 1; ${E.name}_fill(); }`),b.get(I)):""};for(const I of s.pages)for(const E of I.items){if(E.kind!=="chart")continue;const L=E.sources.filter(M=>g.has(M.bufferId));if(E.sources.length&&!L.length){t.push(`页面 ${I.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);continue}if(!L.length){t.push(`页面 ${I.name} 的图表条目未绑定数据源，已跳过`);continue}const U=Math.max(4,Math.trunc(E.height)),H=[];for(const M of L){const P=g.get(M.bufferId),_=`chart${c++}`;h.push(`static float ${_}_dis[${P.lenMacro}];`,`static u8g2_chart_t ${_};`),H.push({name:_,s:M,b:P})}if(H.length===1){const{name:M,s:P,b:_}=H[0];h.push(`static uint8_t ${M}_inited = 0;`),y.set(E.id,[`    if (!${M}_inited) {`,`        ${M}_inited = 1;`,`        u8g2_chart_init(&${M}, ${_.name}, ${M}_dis, ${_.lenMacro});`,x(P.bufferId),"    }"]);const S=P.chartKind==="point"?"Point":P.chartKind==="bar"?"Bar":"Line",le=P.min!==void 0&&P.max!==void 0?`${te(P.max)}, ${te(P.min)}`:"0, 0";v.set(E.id,`    u8g2_MenuDrawItem${S}Chart(&${M}, ${U}, ${le});`)}else{const M=`chart_layers_${w++}`;h.push(`static u8g2_menu_drawChart_t ${M}[${H.length}];`,`static uint8_t ${M}_inited = 0;`);const P=[`    if (!${M}_inited) {`,`        ${M}_inited = 1;`];H.forEach(({name:_,s:S,b:le},ce)=>{P.push(`        u8g2_chart_init(&${_}, ${le.name}, ${_}_dis, ${le.lenMacro});`),P.push(x(S.bufferId));const qe=S.chartKind==="point"?"u8g2_drawPointChart":S.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",Ne=S.min!==void 0&&S.max!==void 0?`${te(S.max)}, ${te(S.min)}`:"0, 0";P.push(`        ${M}[${ce}].drawChart = ${qe};`),P.push(`        ${M}[${ce}].chart = &${_};`),P.push(`        ${M}[${ce}].max = ${Ne.split(", ")[0]};`),P.push(`        ${M}[${ce}].min = ${Ne.split(", ")[1]};`)}),P.push("    }"),y.set(E.id,P),v.set(E.id,`    u8g2_MenuDrawItemChart(${M}, ${H.length}, ${U});`)}}}const C=[],A=[],R=[],z=new Set,J=new Map;let D=0;for(const c of s.pages)for(const w of c.items){if(w.bind.type==="button"){const x=Z(w.bind.cbName,"btn_cb");l.has(x)||l.set(x,w.bind.buttonId)}switch(w.kind){case"board":m.add(Z(w.cbName,"board_cb"));break;case"xbm":{let x=Z(w.name,"icon");for(;z.has(x);)x=`${x}_2`;z.add(x),J.set(w.id,x);const I=w.bits.length,E=w.bits.map(L=>`0x${(L&255).toString(16).padStart(2,"0")}`).join(", ");C.push(`static const uint8_t menu_xbm_${x}[${I}] = { ${E} };`);break}case"textarea":{const x=D++;A.push(`static char ta${x}_text[] = "${re(w.content)}";`,`static u8g2_menu_textArea_t ta${x};`,`static uint8_t ta${x}_inited = 0;`),R.push(`    if (!ta${x}_inited) {`,`        ta${x}_inited = 1;`,`        u8g2_textArea_init(&ta${x}, ta${x}_text);`,`        u8g2_textArea_setLineSpacing(&ta${x}, ${Math.max(0,Math.trunc(w.lineSpacing))});`,"    }");break}}}const N=new Map,k=new Map;for(const c of l.keys())N.set(c,se(c,r,t,`按钮回调名 "${c}"`));for(const c of m)k.set(c,se(c,r,t,`自绘板回调名 "${c}"`));const V=(c,w)=>{if(!c)return"";const x=`"${re(c)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${x});`:`u8g2_MenuUTF8Printf(${x});`},F=(c,w,x)=>{const I=`"${re(c)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${I}, ${x});`:`u8g2_MenuUTF8Printf(${I}, ${x});`};let Q=0;const ue=(c,w)=>{const x=[],I=`${w.name}`,E=_=>{if(!_)return null;const S=u.get(_);return S||t.push(`页面 ${I} 的条目引用了已删除的变量，已按普通文本生成`),S??null},L=c.bind;let U=null,H=null,M="on",P="off";switch(L.type){case"value":{const _=E(L.varId);if(_){U=_;const S=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${te(_.step)}, ${te(_.min)}, ${te(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;x.push(`    ${S}`)}break}case"switch":{const _=E(L.varId);_&&_.srcType!=="uint8"?t.push(`开关附加值绑定的变量 "${_.name}" 应为 uint8 类型（当前 ${_.srcType}），已跳过绑定`):_&&(H=_,M=L.onText,P=L.offText,x.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(L.openValue)});`));break}case"button":{const _=Z(L.cbName,"btn_cb"),S=N.get(_)??_;x.push(`    u8g2_MenuItem_button(${S}, ${Math.trunc(L.buttonId)});`);break}case"submenu":{const _=s.pages.findIndex(S=>S.id===L.targetPageId);!L.targetPageId||_<0?t.push(`页面 ${I} 的条目 "${c.label||"未命名"}" 附加值目标页面无效，已按普通文本生成`):x.push(`    u8g2_MenuItem_menu_enter(${e[_]});`);break}case"back":x.push("    u8g2_MenuItem_menu_back();");break}switch(c.kind){case"text":{if(U)x.push(`    ${F(c.text,c.scale,U.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||t.push(`页面 ${I} 的数值附加值条目显示文本不含格式化占位符（如 %d）`);else if(H)x.push(`    ${F(c.text,c.scale,`${H.name} ? "${re(M)}" : "${re(P)}"`)}`),/%[-+ #0]*s/.test(c.text)||t.push("开关附加值条目的显示文本建议包含 %s 用于显示 on/off");else if(L.type==="none"&&c.displayVarId){const _=E(c.displayVarId);if(_)x.push(`    ${F(c.text,c.scale,_.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||t.push(`页面 ${I} 的显示条目文本不含格式化占位符（如 %d）`);else{t.push(`页面 ${I} 的显示条目引用了已删除的变量，已按普通文本生成`);const S=V(c.text,c.scale);S&&x.push(`    ${S}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(c.text)){t.push(`页面 ${I} 的文本条目含占位符但未绑定变量/显示变量，占位符已移除`);const _=V(c.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),c.scale);_&&x.push(`    ${_}`)}else{const _=V(c.text,c.scale);_&&x.push(`    ${_}`)}break}case"slider":case"progress":{const _=c.kind==="slider"?"Slider":"ProgressBar";if(U){if(!vt.has(U.srcType)){t.push(`滑块/进度条附加值的变量 "${U.name}" 须为整型（当前 ${U.srcType}），已按静态显示生成`),x.push(`    u8g2_MenuDrawItem${_}(${(c.position/100).toFixed(2)}f);`);break}x.push(`    u8g2_MenuDrawItem${_}_bind(&${U.name}, ${Math.trunc(U.step)}, ${Math.trunc(U.min)}, ${Math.trunc(U.max)});`)}else{const S=Math.min(100,Math.max(0,c.position));x.push(`    u8g2_MenuDrawItem${_}(${(S/100).toFixed(2)}f);`)}break}case"chart":{const _=y.get(c.id),S=v.get(c.id);if(!_||!S)break;x.push(..._),x.push(S);break}case"xbm":x.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${J.get(c.id)??Z(c.name,"icon")});`);break;case"textarea":{const _=Q++;x.push(...R[_].split(`
`));const S=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";x.push(`    ${S}(&ta${_}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{const _=Z(c.cbName,"board_cb"),S=k.get(_)??_;x.push(`    u8g2_MenuDrawItemBoard(${S}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return x},$=[];$.push("/**"),$.push(` * 由 u8g2-menu-editor 自动生成，工程: ${s.name}`),$.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),$.push(" *"),$.push(" * main.c 里使用以下符号时，直接 extern（或复制下面声明）："),$.push(` *   u8g2_SetFont(&u8g2, ${n?"menu_font":s.font});`),e.forEach((c,w)=>$.push(` *   void ${c}(void);   /* 页面: ${s.pages[w].name} */`));for(const c of o.values())$.push(` *   extern ${c.type} ${c.name};`);for(const c of N.values())$.push(` *   void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(const c of k.values())$.push(` *   void ${c}(u8g2_t *u8g2);`);$.push(" */"),$.push('#include "u8g2_menu.h"'),(s.chartBuffers??[]).some(c=>c.sample==="sine")&&$.push("#include <math.h>"),$.push(""),$.push(W("includes",i,"")),$.push(""),e.forEach(c=>$.push(`void ${c}(void);`)),$.push(""),$.push("/* ======================== 变量定义 ======================== */"),$.push(W("variables",i,""));for(const c of o.values())$.push(`${c.type} ${c.name} = ${c.init};`);if($.push(""),n){$.push("/* ======================== 字体（现场取模） ======================== */"),$.push("/* 仅包含工程文本用到的字形（含 ASCII 95 个 + 额外字符），"),$.push(" * main.c 里 u8g2_SetFont(&u8g2, menu_font) 即可使用；"),$.push(' * 若运行时输出超出此字符集的中文，请在编辑器"额外包含字符"里补充后重新生成。 */');const c=[];for(let w=0;w<n.length;w+=16)c.push("  "+[...n.slice(w,w+16)].map(x=>`0x${x.toString(16).padStart(2,"0")}`).join(", ")+",");$.push(`const uint8_t menu_font[${n.length}] U8G2_FONT_SECTION("menu_font") = {`),$.push(...c),$.push("};"),$.push("")}if((f.length||h.length||A.length||C.length)&&($.push("/* ======================== 页面资源 ======================== */"),$.push(...f,...h,...A,...C),$.push("")),l.size||m.size){$.push("/* ======================== 回调函数 ======================== */"),$.push(W("callbacks",i,""));for(const[c]of l){const w=N.get(c);$.push(`void ${w}(u8g2_menu_t *menu, uint8_t ID)`),$.push("{"),$.push(W(`cb_${w}`,i,"    ")),$.push("}"),$.push("")}for(const c of m){const w=k.get(c);$.push(`void ${w}(u8g2_t *u8g2)`),$.push("{"),$.push(W(`cb_${w}`,i,"    ")),$.push("}"),$.push("")}}const G=(s.weakHooks??[]).map(c=>ae.find(w=>w.fn===c)).filter(c=>!!c);if(G.length||i.has("weak")||ae.some(c=>(i.get(`weak_${c.fn}`)??"").trim())){$.push("/* ==================== 弱定义函数重写 ==================== */"),$.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),$.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const w=ae.filter(x=>{var I;return!((I=s.weakHooks)!=null&&I.includes(x.fn))&&(i.get(`weak_${x.fn}`)??"").trim()}).map(x=>[`#if 0   /* 已取消勾选 ${x.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${x.decl}`,"{",W(`weak_${x.fn}`,i,"    "),"}","#endif"].join(`
`)).join(`
`);$.push(w?`${W("weak",i,"").replace(/\n$/,"")}
${w}
`:W("weak",i,"")),$.push("");for(const x of G){$.push(`/* ${x.label}: ${x.desc} */`),$.push(`${x.decl}`),$.push("{"),$.push(W(`weak_${x.fn}`,i,"    "));const I=x.bodyArgs.split(`
`).map(E=>`    ${E}`);x.retNote&&I.push(`    ${x.retNote}`),$.push(...I),$.push("}"),$.push("")}}return $.push("/* ======================== 页面函数 ======================== */"),$.push(""),s.pages.forEach((c,w)=>{$.push(`/* 页面: ${c.name} */`),$.push(`void ${e[w]}(void)`),$.push("{"),$.push(W(`page_${e[w]}_pre`,i,"    "));for(const x of c.items)$.push(...ue(x,c));$.push("}"),$.push("")}),{c:`${$.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:t}}function $t(s){return{raw:s.slice(0,23),glyphCnt:s[0],startUpperA:s[17]<<8|s[18],startLowerA:s[19]<<8|s[20],startUnicode:s[21]<<8|s[22]}}function je(s,a,n){const t=[],i=[],r=[],e=[...a].sort((h,y)=>h-y);for(const h of e){const y=n(h);if(!y||!y.length){r.push(h);continue}h<=255?t.push({encoding:h,entry:y}):i.push({encoding:h,entry:y})}if(!t.length&&!i.length)return null;const o=t.length+i.length;let u=0;for(const h of t)u+=h.entry.length;u+=2;let l=4;for(const h of i)l+=h.entry.length;l+=2;const m=$t(s),f=new Uint8Array(23+u+l);f.set(m.raw,0),f[0]=o,f[17]=0,f[18]=0,f[19]=0,f[20]=0,f[21]=0,f[22]=0;let g=23;for(const h of t){if(h.encoding===65){const y=g-23;f[17]=y>>8&255,f[18]=y&255}if(h.encoding===97){const y=g-23;f[19]=y>>8&255,f[20]=y&255}f.set(h.entry,g),g+=h.entry.length}f[g]=0,f[g+1]=0,g+=2;const p=g-23;f[21]=p>>8&255,f[22]=p&255,f[g]=0,f[g+1]=4,f[g+2]=255,f[g+3]=255,g+=4;for(const h of i)f.set(h.entry,g),g+=h.entry.length;return f[g]=0,f[g+1]=0,{font:f,included:o,missing:r}}function _t(s){return[...s].map(a=>a.codePointAt(0)).filter(a=>Number.isFinite(a))}function yt(){const s=[];for(let a=32;a<=126;a++)s.push(a);return s}function Te(s,a){const n=new Set(yt()),t=i=>{for(const r of _t(i))n.add(r)};for(const i of s.pages)for(const r of i.items)r.kind==="text"&&t(r.text),r.kind==="textarea"&&t(r.content),r.bind.type==="switch"&&(t(r.bind.onText),t(r.bind.offText));return t(a),n.delete(10),n.delete(13),n}function Re(s){let a=0,n=0;for(const t of s)t<=126?a++:n++;return{total:s.size,ascii:a,cjk:n}}var j=(s=>(s[s.None=0]="None",s[s.Up=1]="Up",s[s.Down=2]="Down",s[s.Enter=3]="Enter",s[s.Return=4]="Return",s[s.Add=5]="Add",s[s.Sub=6]="Sub",s))(j||{});const wt=64,kt=8192/8;function It(s){return new Promise((a,n)=>{const t=document.createElement("script");t.src=s,t.onload=()=>a(),t.onerror=()=>n(new Error(`预览引擎脚本加载失败: ${s}`)),document.head.appendChild(t)})}class St{constructor(a,n={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.fontSig=null,this.lastKnownPage=0,this.fontApplyWarning=null,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",a.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=n}async load(a){if(this.mod)return;const n=window;n.U8G2MenuPreview||await It(a);const t=n.U8G2MenuPreview;if(!t)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await t({locateFile:r=>a.replace(/[^/\\]*$/,"")+r}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const i=this.mod._em_font_count_export();for(let r=0;r<i;r++){const e=this.mod._em_font_name(r);this.fontIndexCache.set(this.mod.UTF8ToString(e),r)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(a){return this.fontIndexCache.get(a)??0}signature(a){return JSON.stringify({bufs:(a.chartBuffers??[]).map(n=>`${n.name}|${n.dataLen}|${n.sample}`),pages:a.pages.map(n=>({n:n.items.length,k:n.items.map(t=>t.kind).join(","),res:n.items.map(t=>t.kind==="chart"?(t.sources??[]).map(i=>`${i.bufferId}|${i.chartKind}|${i.min??"a"}|${i.max??"a"}`).join(">"):t.kind==="xbm"?`${t.w}x${t.h}`:t.kind==="textarea"?Math.ceil(t.content.length/64):"").join(",")}))})}sync(a){const n=this.mod;if(!n)return;const t=this.signature(a);t!==this.structSig&&(n.ccall("em_reset_dynamic",null,[],[]),this.structSig=t);const i=m=>Math.trunc(Number.isFinite(m)?m:0),r={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},e={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},l=m=>m?(a.variables??[]).findIndex(f=>f.id===m):-1;if((a.variables??[]).forEach((m,f)=>{n.ccall("em_var_define",null,["number","number","number","number","number","number"],[f,r[m.type],i(m.initialValue),i(m.step),i(m.min),i(m.max)])}),(a.chartBuffers??[]).forEach((m,f)=>{n.ccall("em_buf_define",null,["number","number","number"],[f,i(m.dataLen),u[m.sample]])}),a.pages.forEach((m,f)=>{n.ccall("em_page_begin",null,["number"],[f]),m.items.forEach((g,p)=>{const h=()=>{const y=g.bind;if(y.type==="none")return;const v=y.type==="value"||y.type==="switch",b=v?(a.variables??[]).find(C=>C.id===y.varId):void 0;n.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[f,p,o[y.type],v&&b?r[b.type]:0,y.type==="switch"?i(y.openValue):0,y.type==="button"?i(y.buttonId):0,y.type==="submenu"?a.pages.findIndex(C=>C.id===y.targetPageId):-1,v&&b?l(b.id):-1]),y.type==="switch"&&n.ccall("em_item_switch_text",null,["number","number","string","string"],[f,p,y.onText,y.offText])};switch(g.kind){case"text":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[f,p,e.text,g.scale,0,0,0,g.displayVarId?l(g.displayVarId):-1,-1]),n.ccall("em_item_text",null,["number","number","string"],[f,p,g.text]),h();break;case"slider":case"progress":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[f,p,e[g.kind],1,0,0,0,-1,-1]),h();break;case"chart":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[f,p,e.chart,1,i(g.height),0,0,-1,-1]);for(const y of g.sources??[])n.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[f,p,(a.chartBuffers??[]).findIndex(v=>v.id===y.bufferId),{line:0,point:1,bar:2}[y.chartKind],y.min!==void 0&&y.max!==void 0?1:0,y.max??0,y.min??0]);h();break;case"xbm":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[f,p,e.xbm,1,0,i(g.w),i(g.h),-1,-1]);{const y=n._em_scratch(g.bits.length);y&&(n.HEAPU8.set(new Uint8Array(g.bits),y),n._em_item_bits(f,p,y,g.bits.length))}h();break;case"textarea":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[f,p,e.textarea,1,i(g.height),0,0,-1,-1]),n.ccall("em_item_text",null,["number","number","string"],[f,p,g.content]),h();break;case"board":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[f,p,e.board,1,0,i(g.w),i(g.h),-1,-1]),h();break}}),n.ccall("em_page_end",null,["number","number"],[f,m.items.length])}),n.ccall("em_pages_commit",null,["number"],[a.pages.length]),n.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(a.font),{default:0,rotundity:1,square:2}[a.selector],i(a.selectorLeftMargin),i(a.selectorTopMargin),i(a.selectorLineSpacing),a.marqueeSpeed,a.marqueeHeaderLen]),a.fontSubset){const m=Te(a,a.fontExtra),f=a.font+"|"+[...m].sort((g,p)=>g-p).join(",");f!==this.fontSig&&(this.fontSig=f,this.applyFontSubset(this.fontIndex(a.font),m))}else this.fontSig!==null&&(this.fontSig=null,this.fontApplyWarning=null)}applyFontSubset(a,n){this.fontApplyWarning=null;const t=this.getFontBytes(a),i=this.glyphFetcher(a),r=t&&i?je(t,n,i):null;if(!r){this.fontApplyWarning="现场取模未命中任何字形，预览使用内置字体";return}this.useCustomFont(r.font)||(this.fontApplyWarning=`子集字体 ${r.font.length} 字节超过预览槽位容量，预览已回退全字库（导出的 menu_font 数组不受影响）`)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const a=n=>{if(!this.running)return;const t=Math.min(100,Math.round(n-this.lastT));this.lastT=n,this.renderFrame(t),this.raf=requestAnimationFrame(a)};this.raf=requestAnimationFrame(a)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(a){var o,u;const n=this.mod;if(!n)return;const t=n._em_frame(a);if(!t)return;this.img||(this.img=this.ctx.createImageData(128,64));const i=n.HEAPU8.subarray(t,t+kt),r=this.img.data;r.fill(255);for(let l=0;l<64;l++){const m=(l>>3)*128,f=1<<(l&7);let g=l*128*4;for(let p=0;p<128;p++)i[m+p]&f&&(r[g]=17,r[g+1]=24,r[g+2]=39),g+=4}this.ctx.putImageData(this.img,0,0);const e=n._em_get_current_page();e!==this.lastKnownPage&&(this.lastKnownPage=e,(u=(o=this.events).onPageChanged)==null||u.call(o,e))}key(a){var n;(n=this.mod)==null||n.ccall("em_key",null,["number"],[a])}navTo(a){var n;(n=this.mod)==null||n.ccall("em_nav",null,["number"],[a])}getFontBytes(a){const n=this.mod;if(!n)return null;const t=n.ccall("em_font_data","number",["number"],[a]),i=n.ccall("em_font_data_len","number",["number"],[a]);return!t||!i?null:n.HEAPU8.slice(t,t+i)}glyphFetcher(a){const n=this.mod;return n?t=>{const i=n.ccall("em_scratch","number",["number"],[64]),r=n.ccall("em_font_glyph","number",["number","number","number","number"],[a,t,64,i]);return r?n.HEAPU8.slice(i,i+r):null}:null}useCustomFont(a){const n=this.mod;if(!n)return!1;const t=n.ccall("em_custom_font_ptr","number",[],[]),i=n.ccall("em_custom_font_max","number",[],[]);return a.length>i?!1:(n.HEAPU8.set(a,t),n.ccall("em_set_custom_font",null,["number"],[a.length]),!0)}getInt(a){var n;return((n=this.mod)==null?void 0:n._em_get_ipool(a))??0}getSwitch(a){var n;return((n=this.mod)==null?void 0:n._em_get_upool(a))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const Et=Object.keys(oe);function Mt(s,a,n,t){const i=s.getState(),r=n.label||"text"in n&&n.text||oe[n.kind],e=n.bind.type!=="none"?` · ${pe[n.bind.type]}`:"",o=u=>l=>{l.stopPropagation(),s.getState().moveItem(a.id,n.id,u)};return d.html`<div class="ume-item-row ${t?"selected":""}"
    @click=${()=>s.getState().select(a.id,n.id)}>
    <span class="ume-item-icon">${Xe[n.kind]}</span>
    <span class="ume-item-name" title=${r+e}>${r}${e}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),i.duplicateItem(a.id,n.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),i.removeItem(a.id,n.id)}}>✕</button>
  </div>`}function Ct(s,a){const n=s.getState();return d.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${t=>{const i=t.target.value;i&&n.addItem(i,a.id),t.target.value=""}}>
    <option value="">＋条目</option>
    ${Et.map(t=>d.html`<option value=${t}>${oe[t]}</option>`)}
  </select>`}function Tt(s,a){const{project:n,selection:t}=a.getState(),i=r=>{const e=a.getState(),o=t.pageId===r.id;return d.html`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>a.getState().select(r.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${r.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),e.movePage(r.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),e.movePage(r.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),n.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${r.name}"？`)&&e.removePage(r.id)}}>✕</button>
      </div>
      ${o?d.html`<div class="ume-page-items">
        ${r.items.length?r.items.map(u=>Mt(a,r,u,t.itemId===u.id)):d.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Ct(a,r)}</div>
      </div>`:d.nothing}
    </div>`};d.render(d.html`
    <div class="ume-panel-title">
      页面 / 条目 (${n.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Nt(a)}>＋ 页面</button>
    </div>
    ${n.pages.map(i)}
  `,s)}function Nt(s){const a=prompt("页面名称:",`页面${s.getState().project.pages.length+1}`);a!==null&&s.getState().addPage(a||void 0)}function O(s,a,n,t=""){return d.html`<div class="ume-field">
    <label>${s}</label>
    <input type="text" .value=${a??""} placeholder=${t}
      @change=${i=>n(i.target.value)} />
  </div>`}function B(s,a,n,t=1){return d.html`<div class="ume-field">
    <label>${s}</label>
    <input type="number" .value=${String(a)} step=${String(t)}
      @change=${i=>{const r=parseFloat(i.target.value);n(Number.isFinite(r)?r:0)}} />
  </div>`}function Y(s,a,n,t){return d.html`<div class="ume-field">
    <label>${s}</label>
    <select @change=${i=>t(i.target.value)}>
      ${n.map(i=>d.html`<option value=${i.value} ?selected=${i.value===a}>${i.label}</option>`)}
    </select>
  </div>`}function Ee(s,a,n){return d.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${a}
      @change=${t=>n(t.target.checked)} />
    <span>${s}</span>
  </div>`}function At(s,a,n,t=!1){return d.html`<div class="ume-field wide">
    <label>${s}</label>
    <textarea style=${t?"font-family:Consolas,monospace":""}
      @change=${i=>n(i.target.value)}>${a??""}</textarea>
  </div>`}function Me(s,a,n="text/plain"){const t=new Blob([a],{type:`${n};charset=utf-8`}),i=document.createElement("a");i.href=URL.createObjectURL(t),i.download=s,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3)}let _e=null;const ze={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function ye(s,a,n,t){const i=[{value:"",label:"（未绑定）"},...n.map(e=>({value:e.id,label:`${e.name} : ${ze[e.type]??e.type}`}))],r=a?n.some(e=>e.id===a):!1;return d.html`
    ${Y(s,a??"",i,e=>t(e||null))}
    ${a&&!r?d.html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:d.nothing}
    ${n.length===0?d.html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:d.nothing}
  `}function we(s,a){return d.html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{const n=s.getState().addVariable();a(n)}}>＋ 新建变量并绑定</button>
  </div>`}function ke(s){return s?d.html`<div class="ume-hint">
    ${s.name} : ${ze[s.type]??s.type}，范围 ${s.min}~${s.max}，步长 ${s.step}，初值 ${s.initialValue}
    （在「资源」页修改变量）
  </div>`:d.html`${d.nothing}`}function Vt(s,a,n){const{project:t,selection:i}=a.getState(),r=t.pages.find(p=>p.id===i.pageId)??null,e=(r==null?void 0:r.items.find(p=>p.id===i.itemId))??null,o=t.variables??[],u=t.chartBuffers??[],l=(p,h)=>a.getState().updateItem(r.id,e.id,p,h),m=p=>l({bind:p});let f=d.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,g="";if(r&&!e)g="页面属性",f=d.html`
      ${O("名称",r.name,p=>a.getState().updatePage(r.id,{name:p}))}
      ${O("C 函数名",r.fnName,p=>a.getState().updatePage(r.id,{fnName:p}),"留空自动 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(r&&e){(e.bind.type==="value"||e.bind.type==="switch")&&e.bind.varId&&(_e=e.bind.varId),g=`${oe[e.kind]}${e.bind.type!=="none"?` + ${pe[e.bind.type]}`:""}`;let p=d.html``;switch(e.kind){case"text":{const v=e,b=o.find(C=>C.id===v.displayVarId);p=d.html`
          ${O("文本/格式",v.text,C=>l({text:C},`text-${v.id}`))}
          ${Y("大小",String(v.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],C=>l({scale:Number(C)}))}
          ${e.bind.type==="none"?d.html`
            ${ye("显示变量",v.displayVarId,o,C=>l({displayVarId:C}))}
            ${b?d.nothing:we(a,C=>l({displayVarId:C.id}))}
            ${ke(b)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:d.nothing}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{const v=e;p=d.html`
          ${e.bind.type==="none"?d.html`
            ${B("静态位置(%)",v.position,b=>l({position:Math.min(100,Math.max(0,Math.trunc(b)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:d.nothing}
        `;break}case"chart":{const v=e,b=A=>l({sources:A}),C=(A,R)=>{const z=u.find(D=>D.id===A.bufferId),J=A.min===void 0||A.max===void 0;return d.html`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${(z==null?void 0:z.name)??"(无效)"}</span>
              <span class="ume-var-meta">${{line:"折线",point:"散点",bar:"柱状"}[A.chartKind]??A.chartKind}${J?" · 自动量程":` · ${A.min}~${A.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>b(v.sources.filter((D,N)=>N!==R))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${Y("缓冲区",A.bufferId,u.map(D=>({value:D.id,label:`${D.name} (${D.dataLen}点)`})),D=>b(v.sources.map((N,k)=>k===R?{...N,bufferId:D}:N)))}
              ${Y("绘制",A.chartKind,[{value:"line",label:"折线"},{value:"point",label:"散点"},{value:"bar",label:"柱状"}],D=>b(v.sources.map((N,k)=>k===R?{...N,chartKind:D}:N)))}
              ${Ee("自动量程",J,D=>b(v.sources.map((N,k)=>k===R?{...N,min:D?void 0:0,max:D?void 0:100}:N)))}
              ${J?d.nothing:d.html`
                ${B("量程上限",A.max??100,D=>b(v.sources.map((N,k)=>k===R?{...N,max:D}:N)),"any")}
                ${B("量程下限",A.min??0,D=>b(v.sources.map((N,k)=>k===R?{...N,min:D}:N)),"any")}`}
            </div>
          </div>`};p=d.html`
          ${B("高度(px)",v.height,A=>l({height:Math.max(4,Math.trunc(A))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(v.sources??[]).map(C)}
              ${(v.sources??[]).length===0?d.html`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:d.nothing}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(v.sources??[]).length>=4}
                @click=${()=>{if(!u.length){const A=a.getState().addChartBuffer();b([...v.sources??[],{bufferId:A.id,chartKind:"line"}]);return}b([...v.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(v.sources??[]).length>0?"（叠加）":""}</button>
              ${u.length?d.nothing:d.html`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{const v=e;p=d.html`
          ${O("数组名",v.name,b=>l({name:b}))}
          ${B("宽(px)",v.w,b=>l({w:Math.min(128,Math.max(1,Math.trunc(b)))}))}
          ${B("高(px)",v.h,b=>l({h:Math.min(64,Math.max(1,Math.trunc(b)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>n.openXbmEditor(r.id,v.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${v.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const v=e;p=d.html`
          ${At("文本内容",v.content,b=>l({content:b}))}
          ${B("高度(px)",v.height,b=>l({height:Math.max(10,Math.trunc(b))}))}
          ${B("行间距",v.lineSpacing,b=>l({lineSpacing:Math.max(0,Math.trunc(b))}))}
          ${Ee("上下键滚动 (bind)",v.bindScroll,b=>l({bindScroll:b}))}
        `;break}case"board":{const v=e;p=d.html`
          ${B("宽(px)",v.w,b=>l({w:Math.max(1,Math.trunc(b))}))}
          ${B("高(px)",v.h,b=>l({h:Math.max(1,Math.trunc(b))}))}
          ${O("回调函数名",v.cbName,b=>l({cbName:b}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}const h=e.bind;let y=d.html``;switch(h.type){case"none":y=d.html`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{const v=o.find(b=>b.id===h.varId);y=d.html`
          ${ye("变量",h.varId,o,b=>m({type:"value",varId:b}))}
          ${v?d.nothing:we(a,b=>m({type:"value",varId:b.id}))}
          ${ke(v)}
          ${e.kind==="text"?d.html`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:d.nothing}
        `;break}case"switch":{const v=o.filter(b=>b.type==="uint8").find(b=>b.id===h.varId)??o.find(b=>b.id===h.varId);y=d.html`
          ${ye("变量 (uint8)",h.varId,o.filter(b=>b.type==="uint8"),b=>m({type:"switch",varId:b,openValue:h.openValue,onText:h.onText,offText:h.offText}))}
          ${v?d.nothing:we(a,b=>m({type:"switch",varId:b.id,openValue:h.openValue,onText:h.onText,offText:h.offText}))}
          ${ke(v)}
          ${B("openValue",h.openValue,b=>m({type:"switch",varId:h.varId,openValue:Math.max(0,Math.trunc(b)),onText:h.onText,offText:h.offText}))}
          ${O('"开"文本',h.onText,b=>m({type:"switch",varId:h.varId,openValue:h.openValue,onText:b,offText:h.offText}))}
          ${O('"关"文本',h.offText,b=>m({type:"switch",varId:h.varId,openValue:h.openValue,onText:h.onText,offText:b}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":y=d.html`
          ${O("回调函数名",h.cbName,v=>m({type:"button",cbName:v,buttonId:h.buttonId}))}
          ${B("ID",h.buttonId,v=>m({type:"button",cbName:h.cbName,buttonId:Math.max(0,Math.trunc(v))}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":y=d.html`
          ${Y("目标页面",h.targetPageId??"",[{value:"",label:"（未设置）"},...t.pages.filter(v=>v.id!==r.id).map(v=>({value:v.id,label:v.name}))],v=>m({type:"submenu",targetPageId:v||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":y=d.html`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}f=d.html`
      <div class="ume-panel-title">绘制</div>
      ${p}
      <div class="ume-panel-title">附加值</div>
      ${Y("类型",h.type,Object.keys(pe).map(v=>({value:v,label:pe[v]})),v=>{const b=e.bind;m(v==="value"?{type:"value",varId:b.type==="value"||b.type==="switch"?b.varId:_e}:v==="switch"?{type:"switch",varId:b.type==="value"||b.type==="switch"?b.varId:_e,openValue:1,onText:"on",offText:"off"}:v==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:v==="submenu"?{type:"submenu",targetPageId:b.type==="submenu"?b.targetPageId:null}:{type:"none"})})}
      ${y}
    `}d.render(d.html`
    ${g?d.html`<div class="ume-panel-title"><span class="ume-kind-badge">${g}</span></div>`:d.nothing}
    ${f}
  `,s)}let me=null,Ie=null,Se=null,Ve="";const Lt=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (小数)"},{value:"double",label:"double (小数)"}];function Pt(s,a,n){const t=a.variables??[],i=e=>{me=me===e?null:e,n()},r=e=>{const o=me===e.id,u=(p,h)=>s.getState().updateVariable(e.id,p,h),l=e.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.name),m=e.name&&!l&&!Ce(e.name),f=t.filter(p=>p.name===e.name).length>1,g=Bt(a,e.id);return d.html`<div class="ume-var-item ${o?"editing":""}">
      <div class="ume-var-row" @click=${()=>i(e.id)}>
        <span class="ume-var-name" title=${e.name}>${e.name||"(未命名)"}</span>
        <span class="ume-var-meta">${e.type} · ${e.min}~${e.max} · 步${e.step}${g?` · ${g} 处引用`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${p=>{p.stopPropagation();const h=s.getState().removeVariable(e.id);h>0&&alert(`该变量被 ${h} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`)}}>✕</button>
      </div>
      ${o?d.html`<div class="ume-var-edit">
        ${O("变量名",e.name,p=>u({name:p.trim()},`vn-${e.id}`))}
        ${l?d.html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:d.nothing}
        ${m?d.html`<div class="ume-warn">变量名是 C 关键字，生成的代码会自动改名（如 ${e.name}_），建议换个名字</div>`:d.nothing}
        ${f?d.html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:d.nothing}
        ${Y("类型",e.type,Lt,p=>u({type:p}))}
        ${B("初始值",e.initialValue,p=>u({initialValue:p},`vi-${e.id}`),"any")}
        ${B("最小值",e.min,p=>u({min:p},`vmin-${e.id}`),"any")}
        ${B("最大值",e.max,p=>u({max:p},`vmax-${e.id}`),"any")}
        ${B("步长",e.step,p=>u({step:p},`vs-${e.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:d.nothing}
    </div>`};return d.html`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{me=s.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):d.html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function Bt(s,a){let n=0;for(const t of s.pages)for(const i of t.items)"varId"in i&&i.varId===a&&n++;return n}function Kt(s,a,n){const t=a.chartBuffers??[],i=e=>{let o=0;for(const u of a.pages)for(const l of u.items)l.kind==="chart"&&l.sources.some(m=>m.bufferId===e)&&o++;return o},r=e=>{const o=Ie===e.id,u=(g,p)=>s.getState().updateChartBuffer(e.id,g,p),l=e.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.name),m=e.name&&!l&&!Ce(e.name),f=i(e.id);return d.html`<div class="ume-var-item ${o?"editing":""}">
      <div class="ume-var-row" @click=${()=>{Ie=o?null:e.id,n()}}>
        <span class="ume-var-name" title=${e.name}>${e.name||"(未命名)"}</span>
        <span class="ume-var-meta">${e.dataLen} 点 · ${{sine:"正弦",ramp:"斜坡",noise:"伪随机",none:"手动填充"}[e.sample]}${f?` · ${f} 处引用`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${g=>{g.stopPropagation();const p=s.getState().removeChartBuffer(e.id);p>0&&alert(`该缓冲区被 ${p} 个图表条目的数据源引用，请先在条目里移除数据源再删除`)}}>✕</button>
      </div>
      ${o?d.html`<div class="ume-var-edit">
        ${O("数组名",e.name,g=>u({name:g.trim()},`bn-${e.id}`))}
        ${l?d.html`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:d.nothing}
        ${m?d.html`<div class="ume-warn">数组名是 C 关键字，生成的代码会自动改名（如 ${e.name}_），建议换个名字</div>`:d.nothing}
        ${B("点数",e.dataLen,g=>u({dataLen:Math.min(512,Math.max(2,Math.trunc(g)))},`bl-${e.id}`))}
        ${Y("示例填充",e.sample,[{value:"sine",label:"正弦（演示）"},{value:"ramp",label:"斜坡（演示）"},{value:"noise",label:"伪随机（演示）"},{value:"none",label:"不填充（全部手写）"}],g=>u({sample:g}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:d.nothing}
    </div>`};return d.html`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{Ie=s.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):d.html`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Dt(s,a,n){const t=tt(a),i=(e,o)=>{const u=o.trim();!u||u===e||(s.getState().update(l=>{for(const m of l.pages)for(const f of m.items)f.bind.type==="button"&&f.bind.cbName===e&&(f.bind.cbName=u),f.kind==="board"&&f.cbName===e&&(f.cbName=u)},`cbname-${Ve}`),Se=u)},r=e=>{const o=Se===e.name,u=e.asButton&&e.asBoard?"按钮+画板":e.asButton?"按钮":"画板",l=e.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(e.name),m=e.name&&!l&&!Ce(e.name);return d.html`<div class="ume-var-item ${o?"editing":""}">
      <div class="ume-var-row" @click=${()=>{Se=o?null:e.name,Ve=e.name,n()}}>
        <span class="ume-var-name" title=${e.name}>${e.name||"(未命名)"}</span>
        <span class="ume-var-meta">${u} · ${e.refs.length} 处引用</span>
      </div>
      ${o?d.html`<div class="ume-var-edit">
        ${O("回调函数名",e.name,f=>i(e.name,f))}
        ${l?d.html`<div class="ume-warn">回调名不是合法的 C 标识符，生成时会自动清洗</div>`:d.nothing}
        ${m?d.html`<div class="ume-warn">回调名是 C 关键字，生成的代码会自动改名（如 ${e.name}_），建议换个名字</div>`:d.nothing}
        ${e.asButton?d.html`<div class="ume-hint">按钮签名：void ${e.name}(u8g2_menu_t *menu, uint8_t ID) —— 选中该条目时任意按键触发</div>`:d.nothing}
        ${e.asBoard?d.html`<div class="ume-hint">画板签名：void ${e.name}(u8g2_t *u8g2) —— 在指定宽高内用 u8g2 画图</div>`:d.nothing}
        <div class="ume-hint">回调逻辑写在生成的 menu_pages.c 的 cb_${Z(e.name)} USER CODE 区内（重新生成保留）</div>
        <div class="ume-hint">引用此回调的条目（点击定位到属性面板）：</div>
        ${e.refs.map(f=>d.html`<div class="ume-cb-ref" title="点击定位"
          @click=${()=>s.getState().select(f.pageId,f.itemId)}>${f.pageName} / ${f.label}</div>`)}
      </div>`:d.nothing}
    </div>`};return d.html`
    <div class="ume-panel-title">回调函数 (${t.length})</div>
    ${t.length?t.map(r):d.html`<div class="ume-empty-hint">
      按钮附加值与画板条目的回调函数会自动收集到这里：
      统一改名、查看 C 签名、点击引用定位到条目。
    </div>`}
  `}function Oe(s,a){const{project:n}=a.getState(),t=()=>Oe(s,a);d.render(d.html`
    ${Pt(a,n,t)}
    ${Kt(a,n,t)}
    ${Dt(a,n,t)}
  `,s)}function Ut(s,a){const{project:n}=a.getState(),t=(o,u)=>a.getState().update(l=>{Object.assign(l,o)},u),i=n.weakHooks??[],r=(o,u)=>{a.getState().update(l=>{const m=l.weakHooks??[];l.weakHooks=u?[...new Set([...m,o])]:m.filter(f=>f!==o)})},e=d.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${i.length}/${ae.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${ae.map(o=>d.html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote?"（返回 1 = 事件已处理 / 0 = 交给库）":""}`}>
              <input type="checkbox" ?checked=${i.includes(o.fn)}
                @change=${u=>r(o.fn,u.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;d.render(d.html`
    <div class="ume-panel-title">工程</div>
    ${O("工程名",n.name,o=>t({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${n.width}×${n.height}
        ${n.width!==128||n.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${Y("字体",n.font,Ze.map(o=>({value:o.id,label:o.label})),o=>t({font:o}))}
    ${Ee("中文现场取模（仅包含用到的字形）",n.fontSubset,o=>t({fontSubset:o}))}
    ${n.fontSubset?d.html`
      ${O("额外包含字符",n.fontExtra,o=>t({fontExtra:o}))}
      ${(()=>{const o=Re(Te(n,n.fontExtra));return d.html`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:d.nothing}
    ${Y("选择器",n.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],o=>t({selector:o}))}
    ${B("左边距",n.selectorLeftMargin,o=>t({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${B("顶边距",n.selectorTopMargin,o=>t({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${B("行间距",n.selectorLineSpacing,o=>t({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${B("跑马灯速度",n.marqueeSpeed,o=>t({marqueeSpeed:Math.max(0,o)}),.05)}
    ${B("跑马灯停留",n.marqueeHeaderLen,o=>t({marqueeHeaderLen:Math.max(0,o)}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${e}
  `,s)}function Ft(s,a){const n=i=>{let r;const e=()=>{r&&(clearInterval(r),r=void 0)};return{down:o=>{o.preventDefault(),a.key(i),e(),r=window.setInterval(()=>a.key(i),180)},up:e}},t=(i,r,e)=>{const o=n(i);return d.html`<button class="ume-key" title=${e}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${r}</button>`};d.render(d.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${i=>{const e={ArrowUp:j.Up,ArrowDown:j.Down,Enter:j.Enter,Escape:j.Return,Backspace:j.Return,"+":j.Add,"-":j.Sub,"=":j.Add,_:j.Sub}[i.key];e!==void 0&&(i.preventDefault(),a.key(e))}}>
      ${a.canvas}
    </div>
    <div class="ume-keybar">
      ${t(j.Up,"▲","上 MENU_Key_Up")}
      ${t(j.Down,"▼","下 MENU_Key_Down")}
      ${t(j.Enter,"OK","确认 MENU_Key_Enter")}
      ${t(j.Return,"⌫","返回 MENU_Key_Return")}
      ${t(j.Add,"＋","加 MENU_Key_Add")}
      ${t(j.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,s)}function jt(s,a){s.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove());const n=document.createElement("div");n.className="ume-modal-mask",n.addEventListener("click",t=>{t.target===n&&Le(n)}),d.render(d.html`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Le(n)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${a.warnings.length?d.html`
          <div style="margin-bottom:8px">
            ${a.warnings.map(t=>d.html`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:d.nothing}
        <div class="ume-code-view">${a.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(a.c).then(()=>Rt(n,"已复制到剪贴板"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{Me("menu_pages.c",a.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,n),s.appendChild(n)}function Le(s){s.remove()}function Rt(s,a){const n=s.closest(".ume")??document.body;let t=n.querySelector(".ume-toast");t||(t=document.createElement("div"),t.className="ume-toast",n.appendChild(t)),t.textContent=a,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),1600)}function zt(s,a,n,t){const r=a.getState().project.pages.find(k=>k.id===n),e=r==null?void 0:r.items.find(k=>k.id===t);if(!e||e.kind!=="xbm")return;const o=e;let u=o.w,l=o.h,m=[...o.bits];const f=()=>Math.ceil(u/8),g=document.createElement("div");g.className="ume-modal-mask",g.addEventListener("click",k=>{k.target===g&&N()});const p=(k,V)=>{const F=V*f()+(k>>3);return F<m.length?!!(m[F]>>(k&7)&1):!1},h=(k,V,F)=>{const Q=V*f()+(k>>3);m[Q]=F?m[Q]|1<<(k&7):m[Q]&~(1<<(k&7))},y=(k,V)=>{const F=Math.ceil(u/8),Q=Math.ceil(k/8),ue=new Array(Q*V).fill(0);for(let $=0;$<Math.min(l,V);$++)for(let G=0;G<Math.min(u,k);G++){const be=$*F+(G>>3);be<m.length&&m[be]>>(G&7)&1&&(ue[$*Q+(G>>3)]|=1<<(G&7))}u=k,l=V,m=ue};let v=!1,b=!0;const C=(k,V)=>F=>{F.preventDefault(),v=!0,b=!p(k,V),h(k,V,b),z()},A=(k,V)=>()=>{v&&(h(k,V,b),z())},R=()=>{v=!1},z=()=>{d.render(D(),g)},J=()=>{const k=[];for(let V=0;V<l;V++)for(let F=0;F<u;F++)k.push(d.html`<button class="ume-xbm-cell ${p(F,V)?"on":""}"
          data-x=${F} data-y=${V}
          @pointerdown=${C(F,V)}
          @pointerenter=${A(F,V)}></button>`);return k},D=()=>d.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${l}</span></span>
        <button class="ume-mini" @click=${N}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${R}
        @pointerleave=${R}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${k=>{y(Pe(+k.target.value,1,128),l),z()}} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${k=>{y(u,Pe(+k.target.value,1,64)),z()}} />
          <button class="ume-btn sm" @click=${()=>{m=m.map(()=>0),z()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{m=m.map(k=>~k&255),z()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${J()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${N}>取消</button>
        <button class="ume-btn primary" @click=${()=>{a.getState().updateItem(n,t,{w:u,h:l,bits:[...m]}),N()}}>应用</button>
      </div>
    </div>
  `;function N(){g.remove(),document.removeEventListener("pointerup",R)}document.addEventListener("pointerup",R),z(),s.appendChild(g)}function Pe(s,a,n){return Number.isFinite(s)?Math.min(n,Math.max(a,Math.trunc(s))):a}const Ot="prebuilt/u8g2-menu-preview.js";class qt{constructor(a,n={}){var g;if(this.store=at(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.activateRightTab=()=>{},this.container=a,this.opts={persistKey:"default",...n},a.classList.add("ume"),!document.getElementById("ume-style")){const p=document.createElement("style");p.id="ume-style",p.textContent=We,document.head.appendChild(p)}const t=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,i=this.opts.data??t??void 0;if(i!==void 0)try{this.store.setState({project:$e(i)})}catch(p){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",p)}const r=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;r&&(this.lastExport={c:r}),a.innerHTML=`
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
    `;const e=p=>a.querySelector(p);this.els={left:e(".ume-left"),center:e(".ume-center"),right:e(".ume-right"),propEl:e('[data-role="prop"]'),resEl:e('[data-role="res"]'),setEl:e('[data-role="set"]'),toolbarUndo:e('[data-act="undo"]'),toolbarRedo:e('[data-act="redo"]')};const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new St(o,{onPageChanged:p=>this.onPreviewPageChanged(p)});const u=document.createElement("div");this.els.center.appendChild(u),Ft(u,this.preview),this.preview.load(this.opts.wasmUrl??Ot).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(p=>{console.error(p);const h=document.createElement("div");h.className="ume-warn",h.textContent=`预览引擎加载失败: ${p.message}。编辑功能不受影响。`,this.els.center.prepend(h)}),a.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const p=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);p!==null&&this.store.getState().addPage(p||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),a.querySelector('[data-act="export-json"]').addEventListener("click",()=>{Me(`${this.store.getState().project.name||"menu-project"}.json`,Ae(this.store.getState().project),"application/json")}),a.querySelector('[data-act="import"]').addEventListener("click",()=>{e('[data-role="file"]').click()}),e('[data-role="file"]').addEventListener("change",p=>{var y;const h=(y=p.target.files)==null?void 0:y[0];h&&(h.text().then(v=>{try{const b=$e(v);this.store.getState().update(C=>{Object.assign(C,b)}),this.scheduleRender()}catch(b){alert(`导入失败: ${b.message}`)}}),p.target.value="")}),a.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate());const l=a.querySelectorAll(".ume-tabs button"),m=p=>{l.forEach(h=>h.classList.toggle("active",h.dataset.tab===p)),this.els.propEl.style.display=p==="prop"?"":"none",this.els.resEl.style.display=p==="res"?"":"none",this.els.setEl.style.display=p==="set"?"":"none"};l.forEach(p=>{p.addEventListener("click",()=>m(p.dataset.tab??"prop"))}),this.activateRightTab=m,this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(((g=this.store.getState().project.pages[0])==null?void 0:g.id)??null,null);let f=null;this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange();const p=this.store.getState().selection.itemId;p&&p!==f&&this.activateRightTab("prop"),f=p}),this.scheduleRender(),this.persist(),this.liveTimer=window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(a){var t;const n=$e(a);this.store.getState().update(i=>{Object.assign(i,n)}),this.store.getState().select(((t=n.pages[0])==null?void 0:t.id)??null,null)}generate(){var n,t;const a=this.produceCode();return jt(this.container,a),(t=(n=this.opts).onExport)==null||t.call(n,a),a}downloadC(){const a=this.produceCode();Me("menu_pages.c",a.c)}produceCode(){const a=this.lastExport,n=this.store.getState().project;let t;const i=[];if(n.fontSubset){if(!this.preview.ready)i.push("现场取模需要预览引擎，当前引擎不可用：本次未生成 menu_font，代码将引用内置字体");else{const o=Te(n,n.fontExtra),u=this.buildFontSubset(n,o);if("error"in u)i.push(`${u.error}，本次按内置字体生成`);else{t=u.result.font;const l=Re(o);if(i.push(`现场取模：收录 ${l.total} 个字符（ASCII ${l.ascii} + 扩展 ${l.cjk}），字体数组 ${u.result.font.length} 字节。运行时若输出超出字符集的中文，请在设置里补充额外字符`),u.result.included>255&&i.push(`子集字形数 ${u.result.included} 超过 255：字体头 glyph_cnt 字段将回绕（记录为 ${u.result.included&255}），如遇渲染异常请在"额外包含字符"里精简`),u.result.missing.length){const m=u.result.missing.slice(0,5).map(f=>String.fromCodePoint(f)).join(" ");i.push(`字符集中 ${u.result.missing.length} 个字符未在源字体中找到（如 ${m}），运行时这些字符无法显示`)}}}const e=this.preview.fontApplyWarning;e&&i.push(e)}const r=xt(n,a??void 0,t);return r.warnings.unshift(...i),this.lastExport={c:r.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,r.c),r}buildFontSubset(a,n){const t=this.preview.fontIndex(a.font),i=this.preview.getFontBytes(t),r=this.preview.glyphFetcher(t);if(!i||!r)return{error:"现场取模失败：无法读取源字体数据"};const e=je(i,n,r);return e?{result:e}:{error:"现场取模失败：字符集未命中任何字形"}}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.liveTimer!==void 0&&window.clearInterval(this.liveTimer),clearTimeout(this.saveTimer),clearTimeout(this.changeTimer),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(a){const n=a.target;n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT"||((a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="z"?(a.preventDefault(),a.shiftKey?this.store.getState().redo():this.store.getState().undo()):(a.ctrlKey||a.metaKey)&&a.key.toLowerCase()==="y"&&(a.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(a){const n=this.store.getState().project.pages[a];n&&this.store.getState().select(n.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ae(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const a=this.store.getState();Tt(this.els.left,this.store),Ut(this.els.setEl,this.store),Oe(this.els.resEl,this.store),Vt(this.els.propEl,this.store,{openXbmEditor:(n,t)=>zt(this.container,this.store,n,t)}),this.els.toolbarUndo.disabled=a.past.length===0,this.els.toolbarRedo.disabled=a.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var r;const a=document.getElementById("ume-live-value"),n=document.getElementById("ume-page-jump"),t=this.store.getState(),i=this.store.getState().project.pages.findIndex(e=>e.id===t.selection.pageId);if(n){const e=t.project.pages,o=e.map(l=>l.name).join("|");n.dataset.sig!==o&&(n.dataset.sig=o,n.innerHTML="",e.forEach((l,m)=>{const f=document.createElement("option");f.value=String(m),f.textContent=`${m+1}. ${l.name}`,n.appendChild(f)}),n.onchange=()=>{const l=parseInt(n.value,10);Number.isFinite(l)&&this.preview.navTo(l)});const u=this.preview.currentPage;document.activeElement!==n&&n.value!==String(u)&&(n.value=String(u))}if(a&&i>=0&&t.selection.itemId){const e=t.project.pages[i],o=e.items.findIndex(p=>p.id===t.selection.itemId),u=e.items[o],l=u==null?void 0:u.bind,m=(l==null?void 0:l.type)==="value"||(l==null?void 0:l.type)==="switch"?l.varId:null,f=(u==null?void 0:u.kind)==="text"&&(l==null?void 0:l.type)==="none"?u.displayVarId:null,g=m??f;if(u&&g){const p=(t.project.variables??[]).findIndex(C=>C.id===g),h=p>=0?p:i*wt+o,v=(l==null?void 0:l.type)==="switch"?this.preview.getSwitch(h):this.preview.getInt(h),b=(r=(t.project.variables??[]).find(C=>C.id===g))==null?void 0:r.name;a.textContent=`${b??u.kind} = ${v}`}else a.textContent=""}}}exports.MenuEditor=qt;exports.MenuKey=j;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
