"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const we=require("zustand/vanilla"),h=require("lit-html"),ye=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;let re=0;function V(n){return re=(re+1)%1e9,`${n}_${Date.now().toString(36)}_${re.toString(36)}`}function ee(n){return{id:V("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...n}}function ke(n,t){const e=new Set(n.map(u=>u.name));if(!e.has(t))return t;let r=2;for(;e.has(`${t}_${r}`);)r++;return`${t}_${r}`}function R(n){const t={id:V("it"),label:""};switch(n){case"text":return{...t,kind:n,text:"菜单项",scale:1};case"number":return{...t,kind:n,text:"v:%d",scale:1,varId:null,editable:!0};case"switch":return{...t,kind:n,text:"s:%s",scale:1,varId:null,openValue:1,onText:"on",offText:"off"};case"button":return{...t,kind:n,text:"执行操作",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...t,kind:n,text:"下一级",scale:1,targetPageId:null};case"back":return{...t,kind:n,text:"返回",scale:1};case"slider":return{...t,kind:n,varId:null};case"progress":return{...t,kind:n,varId:null};case"chart":return{...t,kind:n,chartKind:"line",dataLen:24,height:32,sample:"sine"};case"xbm":return Se(16,16);case"textarea":return{...t,kind:n,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...t,kind:n,w:64,h:32,cbName:"board_cb"}}}function Se(n,t){const e=Math.ceil(n/8);return{id:V("it"),kind:"xbm",label:"",name:"icon",w:n,h:t,bits:new Array(e*t).fill(0)}}function de(n){return{id:V("pg"),name:n,fnName:"",items:[],userCodePre:""}}function F(n,t){return{...n,...t}}function Ie(){const n=[ee({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),ee({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),ee({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],t=de("主页");t.items=[F(R("text"),{text:"u8g2_menu"}),F(R("submenu"),{text:"系统设置"}),F(R("button"),{text:"关于",cbName:"btn_about_cb"})];const e=de("设置");e.items=[F(R("number"),{text:"音量:%d",varId:n[0].id}),F(R("switch"),{text:"开关:%s",varId:n[1].id}),F(R("slider"),{varId:n[2].id}),R("back")];const r={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:n,pages:[t,e]};return t.items[1].targetPageId=e.id,r}function Ee(n){return structuredClone(n)}const Me=800;function xe(){let n=null,t=0;return we.createStore()((e,r)=>({project:Ie(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(u,s)=>{const a=Date.now(),i=!!s&&s===n&&a-t<Me;n=s??null,t=a,e(o=>{const m=Ee(o.project);return u(m),{project:m,dirty:!0,past:i?o.past:[...o.past.slice(-99),o.project],future:[]}})},undo:()=>{e(u=>u.past.length?{project:u.past[u.past.length-1],past:u.past.slice(0,-1),future:[u.project,...u.future.slice(0,99)],dirty:!0}:u)},redo:()=>{e(u=>{if(!u.future.length)return u;const[s,...a]=u.future;return{project:s,past:[...u.past,u.project],future:a,dirty:!0}})},select:(u,s=null)=>e({selection:{pageId:u,itemId:s}}),addPage:u=>{const s={id:V("pg"),name:u??`页面${r().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return r().update(a=>{a.pages.push(s)}),e({selection:{pageId:s.id,itemId:null}}),s},removePage:u=>{r().update(a=>{a.pages=a.pages.filter(i=>i.id!==u);for(const i of a.pages)for(const o of i.items)o.kind==="submenu"&&o.targetPageId===u&&(o.targetPageId=null)});const{selection:s}=r();s.pageId===u&&e({selection:{pageId:null,itemId:null}})},movePage:(u,s)=>{r().update(a=>{const i=a.pages.findIndex(m=>m.id===u),o=i+s;i<0||o<0||o>=a.pages.length||([a.pages[i],a.pages[o]]=[a.pages[o],a.pages[i]])})},updatePage:(u,s)=>{r().update(a=>{const i=a.pages.find(o=>o.id===u);i&&Object.assign(i,s)})},addItem:(u,s)=>{var o;const a=s??r().selection.pageId??((o=r().project.pages[0])==null?void 0:o.id);if(!a)return null;const i=Ne(u);return r().update(m=>{const l=m.pages.find(c=>c.id===a);l==null||l.items.push(i)}),e({selection:{pageId:a,itemId:i.id}}),i},removeItem:(u,s)=>{r().update(i=>{const o=i.pages.find(m=>m.id===u);o&&(o.items=o.items.filter(m=>m.id!==s))});const{selection:a}=r();a.itemId===s&&e({selection:{pageId:u,itemId:null}})},moveItem:(u,s,a)=>{r().update(i=>{const o=i.pages.find(c=>c.id===u);if(!o)return;const m=o.items.findIndex(c=>c.id===s),l=m+a;m<0||l<0||l>=o.items.length||([o.items[m],o.items[l]]=[o.items[l],o.items[m]])})},duplicateItem:(u,s)=>{let a=null;r().update(i=>{const o=i.pages.find(l=>l.id===u);if(!o)return;const m=o.items.findIndex(l=>l.id===s);m<0||(a=structuredClone(o.items[m]),a.id=V("it"),o.items.splice(m+1,0,a))}),a&&e({selection:{pageId:u,itemId:a.id}})},updateItem:(u,s,a,i)=>{r().update(o=>{const m=o.pages.find(c=>c.id===u),l=m==null?void 0:m.items.find(c=>c.id===s);l&&Object.assign(l,a)},i)},addVariable:u=>{let s=null;return r().update(a=>{a.variables=a.variables??[];const i=ke(a.variables,(u==null?void 0:u.name)??"var_new");s=ee({...u,name:i}),a.variables.push(s)}),s},removeVariable:u=>{let s=0;for(const a of r().project.pages)for(const i of a.items)"varId"in i&&i.varId===u&&s++;return s>0?s:(r().update(a=>{a.variables=(a.variables??[]).filter(i=>i.id!==u)}),0)},updateVariable:(u,s,a)=>{r().update(i=>{const o=(i.variables??[]).find(m=>m.id===u);o&&Object.assign(o,s)},a)}}))}xe();function Ne(n){return R(n)}const se=1,G=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],ne={text:"文本",number:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回上级",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},Ce={text:"T",number:"#",switch:"◉",button:"⏎",submenu:"→",back:"←",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},Ae=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class O extends Error{}const _e=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]);function ae(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function P(n,t){return typeof n=="string"?n:t}function S(n,t){return typeof n=="number"&&Number.isFinite(n)?n:t}const Pe=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function Te(n){if(!ae(n))throw new O("条目格式错误");const t=n.kind;if(typeof t!="string"||!Pe.includes(t))throw new O(`未知条目类型: ${String(t)}`);const e=structuredClone(n);switch(e.id=P(n.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=P(n.label,""),t){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=P(n.text,""),e.scale=n.scale===2?2:1;break}return e}function Le(n){if(!ae(n))throw new O("页面格式错误");const t=Array.isArray(n.items)?n.items.map(Te):[];return{id:P(n.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:P(n.name,"未命名页面"),fnName:P(n.fnName,""),items:t,userCodePre:P(n.userCodePre,"")}}function Ve(n){if(!ae(n))return null;const t=P(n.type,"int32");return{id:P(n.id,"")||V("vb"),name:P(n.name,""),type:_e.has(t)?t:"int32",initialValue:S(n.initialValue,0),min:S(n.min,0),max:S(n.max,100),step:S(n.step,1)}}function je(n){const t=new Map,e=[],r=(u,s)=>{let a=t.get(u);return a||(a=s(),t.set(u,a),e.push(a)),a};for(const u of n)for(const s of u.items){const a=s;switch(s.kind){case"number":if(a.varId===void 0||a.varId===null){const i=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",o=r(i,()=>({id:V("vb"),name:i,type:_e.has(String(a.varType))?String(a.varType):"int32",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));s.varId=o.id}a.editable===void 0&&(s.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){const i=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",o=r(i,()=>({id:V("vb"),name:i,type:"int",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));s.varId=o.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){const i=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",o=r(i,()=>({id:V("vb"),name:i,type:"uint8",initialValue:S(a.initialValue,0),min:0,max:1,step:1}));s.varId=o.id}delete a.varName,delete a.initialValue;break}}return e}function ue(n){let t;if(typeof n=="string")try{t=JSON.parse(n)}catch{throw new O("JSON 解析失败")}else t=n;if(!ae(t))throw new O("不是有效的工程文件");const e=t,r=S(e.version,0);if(r>se)throw new O(`工程版本 v${r} 高于当前支持的 v${se}，请升级编辑器`);const u=Array.isArray(e.pages)?e.pages.map(Le):[];if(!u.length)throw new O("工程至少需要一个页面");const s=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity",a=new Set(G.map(m=>m.fn)),i=Array.isArray(e.weakHooks)?[...new Set(e.weakHooks.filter(m=>typeof m=="string"&&a.has(m)))]:[];let o;return Array.isArray(e.variables)?o=e.variables.map(Ve).filter(m=>!!m):o=je(u),{version:se,name:P(e.name,"未命名工程"),width:S(e.width,128),height:S(e.height,64),font:P(e.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:S(e.selectorLeftMargin,16),selectorTopMargin:S(e.selectorTopMargin,0),selectorLineSpacing:S(e.selectorLineSpacing,0),marqueeSpeed:S(e.marqueeSpeed,.2),marqueeHeaderLen:S(e.marqueeHeaderLen,5),weakHooks:i,variables:o,pages:u}}function pe(n){return JSON.stringify(n,null,2)}const De={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function K(n,t="anon"){let e=n.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||t}function J(n){return n.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function X(n){if(!Number.isFinite(n))return"0.0f";const t=n.toString();return/[-.]|e/i.test(t)?`${t}f`:`${t}.0f`}function Ue(n){const t=new Map;if(!n)return t;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let r;for(;(r=e.exec(n))!==null;)t.set(r[1],r[2]);return t}function L(n,t,e){const r=t.has(n)?t.get(n):"";return`${e}/* USER CODE BEGIN ${n} */${r}${e}/* USER CODE END ${n} */`}const Ke=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function be(n,t){const e=[],r=Ue((t==null?void 0:t.c)??""),u=n.pages.map((d,_)=>d.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.fnName)?d.fnName:`page_${_}`),s=new Map,a=new Map;for(const d of n.variables??[]){if(!d.name){e.push("存在未命名变量，已跳过");continue}if(s.has(d.name)){e.push(`变量名 "${d.name}" 重复，以第一个为准`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.name)||e.push(`变量名 "${d.name}" 不是合法的 C 标识符，已清洗为 "${K(d.name)}"`);const _=K(d.name,"var"),p=d.type==="float"||d.type==="double",w={name:_,srcType:d.type,type:De[d.type],init:p?X(d.initialValue):String(Math.trunc(d.initialValue)),isFloat:p,step:d.step,min:d.min,max:d.max};s.set(_,w),a.set(d.id,w)}const i=new Map,o=new Set,m=[],l=[],c=[],b=[],x=[],E=new Set,j=new Map;let z=0,Y=0;for(const d of n.pages)for(const _ of d.items)switch(_.kind){case"button":{const p=K(_.cbName,"btn_cb");i.has(p)||i.set(p,_.buttonId);break}case"board":o.add(K(_.cbName,"board_cb"));break;case"chart":{const p=z++;m.push(`#define CHART${p}_LEN ${Math.max(2,Math.trunc(_.dataLen))}`,`static float chart${p}_data[CHART${p}_LEN];`,`static float chart${p}_dis[CHART${p}_LEN];`,`static u8g2_chart_t chart${p};`,`static uint8_t chart${p}_inited = 0;`);const w=_.sample==="sine"?`chart${p}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);`:_.sample==="ramp"?`chart${p}_data[i] = (float)i;`:`chart${p}_data[i] = (float)((i * 37) % CHART${p}_LEN);`,A=`chart${p}_fill`,g=(r.get(A)??"").trim()!=="";l.push([`    if (!chart${p}_inited) {`,`        chart${p}_inited = 1;`,`        u8g2_chart_init(&chart${p}, chart${p}_data, chart${p}_dis, CHART${p}_LEN);`,L(A,r,"        "),...g?[]:[`        for (uint16_t i = 0; i < CHART${p}_LEN; ++i) { ${w} }`],"    }"].join(`
`));break}case"xbm":{let p=K(_.name,"icon");for(;E.has(p);)p=`${p}_2`;E.add(p),j.set(_.id,p);const w=_.bits.length,A=_.bits.map(g=>`0x${(g&255).toString(16).padStart(2,"0")}`).join(", ");c.push(`static const uint8_t menu_xbm_${p}[${w}] = { ${A} };`);break}case"textarea":{const p=Y++;b.push(`static char ta${p}_text[] = "${J(_.content)}";`,`static u8g2_menu_textArea_t ta${p};`,`static uint8_t ta${p}_inited = 0;`),x.push(`    if (!ta${p}_inited) {`,`        ta${p}_inited = 1;`,`        u8g2_textArea_init(&ta${p}, ta${p}_text);`,`        u8g2_textArea_setLineSpacing(&ta${p}, ${Math.max(0,Math.trunc(_.lineSpacing))});`,"    }");break}}const T=(d,_)=>{if(!d)return"";const p=`"${J(d)}"`;return _===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${p});`:`u8g2_MenuUTF8Printf(${p});`},W=(d,_,p)=>{const w=`"${J(d)}"`;return _===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${p});`:`u8g2_MenuUTF8Printf(${w}, ${p});`};let B=0,D=0;const ie=(d,_)=>{const p=[],w=`${_.name}`,A=g=>{if(!g)return null;const $=a.get(g);return $||e.push(`页面 ${w} 的条目引用了已删除的变量，已按普通文本生成`),$??null};switch(d.kind){case"text":{const g=T(d.text,d.scale);g&&p.push(`    ${g}`);break}case"number":{const g=d,$=A(g.varId);if($&&g.editable!==!1){const I=$.isFloat?`u8g2_MenuItemValue_${$.srcType}(&${$.name}, ${X($.step)}, ${X($.min)}, ${X($.max)});`:`u8g2_MenuItemValue_${$.srcType}(&${$.name}, ${Math.trunc($.step)}, ${Math.trunc($.min)}, ${Math.trunc($.max)});`;p.push(`    ${I}`)}if($)p.push(`    ${W(g.text,g.scale,$.name)}`),g.editable!==!1&&!/%[-+ #0]*[a-zA-Z]/.test(g.text)&&e.push(`数值条目 "${w}" 的显示文本不含格式化占位符（如 %d）`);else if(/%[-+ #0]*[a-zA-Z]/.test(g.text)){e.push(`页面 ${w} 的数值条目未绑定变量但文本含占位符，已按普通文本生成`);const I=T(g.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),g.scale);I&&p.push(`    ${I}`)}else{const I=T(g.text,g.scale);I&&p.push(`    ${I}`)}break}case"switch":{const g=d,$=A(g.varId);if($){if($.srcType!=="uint8"){e.push(`开关条目绑定的变量 "${$.name}" 应为 uint8 类型（当前 ${$.srcType}），已跳过绑定`);const I=T(g.text,g.scale);I&&p.push(`    ${I}`);break}p.push(`    u8g2_MenuItemValue_switch(&${$.name}, ${Math.trunc(g.openValue)});`),p.push(`    ${W(g.text,g.scale,`${$.name} ? "${J(g.onText)}" : "${J(g.offText)}"`)}`),/%[-+ #0]*s/.test(g.text)||e.push(`开关条目 "${$.name}" 的显示文本建议包含 %s 用于显示 on/off`)}else{const I=T(g.text,g.scale);I&&p.push(`    ${I}`)}break}case"button":{const g=K(d.cbName,"btn_cb");p.push(`    u8g2_MenuItem_button(${g}, ${Math.trunc(d.buttonId)});`);const $=T(d.text,d.scale);$&&p.push(`    ${$}`);break}case"submenu":{if(!d.targetPageId){e.push(`页面 ${w} 的子页面条目 "${d.text||d.label||d.id}" 未指定目标页面，已按普通文本生成`);const I=T(d.text,d.scale);I&&p.push(`    ${I}`);break}const g=n.pages.findIndex(I=>I.id===d.targetPageId);if(g<0){e.push(`页面 ${w} 的子页面条目目标无效`);break}p.push(`    u8g2_MenuItem_menu_enter(${u[g]});`);const $=T(d.text,d.scale);$&&p.push(`    ${$}`);break}case"back":{p.push("    u8g2_MenuItem_menu_back();");const g=T(d.text,d.scale);g&&p.push(`    ${g}`);break}case"slider":case"progress":{const g=A(d.varId);if(!g){e.push(`页面 ${w} 的${d.kind==="slider"?"滑块":"进度"}条目未绑定变量，已跳过`);break}if(!Ke.has(g.srcType)){e.push(`滑块/进度条绑定的变量 "${g.name}" 须为整型（当前 ${g.srcType}），已跳过`);break}const $=d.kind==="slider"?"Slider":"ProgressBar";p.push(`    u8g2_MenuDrawItem${$}_bind(&${g.name}, ${Math.trunc(g.step)}, ${Math.trunc(g.min)}, ${Math.trunc(g.max)});`);break}case"chart":{const g=B++;p.push(...l[g].split(`
`));const $=d.chartKind==="point"?"Point":d.chartKind==="bar"?"Bar":"Line",I=d.min!==void 0&&d.max!==void 0?`${X(d.max)}, ${X(d.min)}`:"0, 0";p.push(`    u8g2_MenuDrawItem${$}Chart(&chart${g}, ${Math.max(4,Math.trunc(d.height))}, ${I});`);break}case"xbm":p.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(d.w)}, ${Math.trunc(d.h)}, menu_xbm_${j.get(d.id)??K(d.name,"icon")});`);break;case"textarea":{const g=D++;p.push(...x[g].split(`
`));const $=d.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";p.push(`    ${$}(&ta${g}, ${Math.max(10,Math.trunc(d.height))});`);break}case"board":{const g=K(d.cbName,"board_cb");p.push(`    u8g2_MenuDrawItemBoard(${g}, ${Math.max(1,Math.trunc(d.w))}, ${Math.max(1,Math.trunc(d.h))});`);break}}return p},f=[];f.push("/**"),f.push(` * 由 u8g2-menu-editor 自动生成，工程: ${n.name}`),f.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),f.push(" */"),f.push('#include "menu_pages.h"'),f.push('#include "u8g2_menu.h"'),m.length&&f.push("#include <math.h>"),f.push(""),f.push(L("includes",r,"")),f.push(""),f.push("/* ======================== 变量定义 ======================== */"),f.push(L("variables",r,""));for(const d of s.values())f.push(`${d.type} ${d.name} = ${d.init};`);if(f.push(""),(m.length||b.length||c.length)&&(f.push("/* ======================== 页面资源 ======================== */"),f.push(...m,...b,...c),f.push("")),i.size||o.size){f.push("/* ======================== 回调函数 ======================== */"),f.push(L("callbacks",r,""));for(const[d]of i)f.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID)`),f.push("{"),f.push(L(`cb_${d}`,r,"    ")),f.push("}"),f.push("");for(const d of o)f.push(`void ${d}(u8g2_t *u8g2)`),f.push("{"),f.push(L(`cb_${d}`,r,"    ")),f.push("}"),f.push("")}const H=(n.weakHooks??[]).map(d=>G.find(_=>_.fn===d)).filter(d=>!!d);if(H.length||r.has("weak")||G.some(d=>(r.get(`weak_${d.fn}`)??"").trim())){f.push("/* ==================== 弱定义函数重写 ==================== */"),f.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),f.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const _=G.filter(p=>{var w;return!((w=n.weakHooks)!=null&&w.includes(p.fn))&&(r.get(`weak_${p.fn}`)??"").trim()}).map(p=>[`#if 0   /* 已取消勾选 ${p.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${p.decl}`,"{",L(`weak_${p.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);f.push(_?`${L("weak",r,"").replace(/\n$/,"")}
${_}
`:L("weak",r,"")),f.push("");for(const p of H){f.push(`/* ${p.label}: ${p.desc} */`),f.push(`${p.decl}`),f.push("{"),f.push(L(`weak_${p.fn}`,r,"    "));const w=p.bodyArgs.split(`
`).map(A=>`    ${A}`);p.retNote&&w.push(`    ${p.retNote}`),f.push(...w),f.push("}"),f.push("")}}f.push("/* ======================== 页面函数 ======================== */"),f.push(""),n.pages.forEach((d,_)=>{f.push(`/* 页面: ${d.name} */`),f.push(`void ${u[_]}(void)`),f.push("{"),f.push(L(`page_${u[_]}_pre`,r,"    "));for(const p of d.items)f.push(...ie(p,d));f.push("}"),f.push("")});const v=[];if(v.push("#ifndef MENU_PAGES_H"),v.push("#define MENU_PAGES_H"),v.push(""),v.push('#include "u8g2_menu.h"'),v.push(""),v.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"),u.forEach((d,_)=>v.push(`void ${d}(void);   /* ${n.pages[_].name} */`)),v.push(""),s.size){v.push("/* 可编辑变量（在条目绑定中使用） */");for(const d of s.values())v.push(`extern ${d.type} ${d.name};`);v.push("")}if(i.size||o.size){v.push("/* 用户回调 */");for(const[d]of i)v.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID);`);for(const d of o)v.push(`void ${d}(u8g2_t *u8g2);`);v.push("")}v.push("#endif /* MENU_PAGES_H */");const y=f.join(`
`).replace(/\n{3,}/g,`


`),M=v.join(`
`);return{c:`${y}
`,h:`${M}
`,warnings:e}}function oe(n,t){return t?n.get(t)??null:null}var N=(n=>(n[n.None=0]="None",n[n.Up=1]="Up",n[n.Down=2]="Down",n[n.Enter=3]="Enter",n[n.Return=4]="Return",n[n.Add=5]="Add",n[n.Sub=6]="Sub",n))(N||{});const Re=8192/8;function ze(n){return new Promise((t,e)=>{const r=document.createElement("script");r.src=n,r.onload=()=>t(),r.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${n}`)),document.head.appendChild(r)})}class He{constructor(t,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.lastKnownPage=0,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(t){if(this.mod)return;const e=window;e.U8G2MenuPreview||await ze(t);const r=e.U8G2MenuPreview;if(!r)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await r({locateFile:s=>t.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const u=this.mod._em_font_count_export();for(let s=0;s<u;s++){const a=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(a),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(t){return this.fontIndexCache.get(t)??0}signature(t){return JSON.stringify(t.pages.map(e=>({n:e.items.length,k:e.items.map(r=>r.kind).join(","),res:e.items.map(r=>r.kind==="chart"?`${r.dataLen}|${r.sample}`:r.kind==="xbm"?`${r.w}x${r.h}`:r.kind==="textarea"?Math.ceil(r.content.length/64):"").join(",")})))}sync(t){const e=this.mod;if(!e)return;const r=this.signature(t);r!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=r);const u=i=>Math.trunc(Number.isFinite(i)?i:0),s=i=>i?(t.variables??[]).findIndex(o=>o.id===i):-1,a=new Map((t.variables??[]).map(i=>[i.id,i]));t.pages.forEach((i,o)=>{e.ccall("em_page_begin",null,["number"],[o]),i.items.forEach((m,l)=>{const c=["number","number"];switch(m.kind){case"text":e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,0,0,m.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[o,l,m.text]);break;case"number":{const b=oe(a,m.varId);e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,1,b?{uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[b.type]:0,m.scale,0,0,0,0,0,b?u(b.initialValue):0,b?u(b.step):0,b?u(b.min):0,b?u(b.max):0,-1,0,0,0,0,m.editable===!1?1:0,s(m.varId)]),e.ccall("em_item_text",null,["number","number","string"],[o,l,m.text]);break}case"switch":{const b=oe(a,m.varId);e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,2,0,m.scale,0,0,u(m.openValue),0,0,b?u(b.initialValue):0,0,0,0,-1,0,0,0,0,0,s(m.varId)]),e.ccall("em_item_text",null,["number","number","string"],[o,l,m.text]),e.ccall("em_item_swtext",null,["number","number","string","string"],[o,l,m.onText,m.offText]);break}case"button":e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,3,0,m.scale,0,0,0,u(m.buttonId),0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[o,l,m.text]);break;case"submenu":{const b=t.pages.findIndex(x=>x.id===m.targetPageId);e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,4,0,m.scale,0,0,0,0,0,0,0,0,0,b,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[o,l,m.text]);break}case"back":e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,5,0,m.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),e.ccall("em_item_text",null,["number","number","string"],[o,l,m.text]);break;case"slider":case"progress":{const b=oe(a,m.varId),x=m.kind==="slider"?5:6;e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,x,0,1,0,0,0,0,0,b?u(b.initialValue):0,b?u(b.step):0,b?u(b.min):0,b?u(b.max):0,-1,0,0,0,0,0,s(m.varId)]);break}case"chart":{const b={sine:0,ramp:1,noise:2}[m.sample],x=m.min!==void 0&&m.max!==void 0?1:0;e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,8,0,1,{line:0,point:1,bar:2}[m.chartKind],0,0,0,x,b,0,x?u(m.min):0,x?u(m.max):0,-1,0,0,u(m.height),u(m.dataLen),0]);break}case"xbm":{e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,9,0,1,0,0,0,0,0,0,0,0,0,-1,u(m.w),u(m.h),0,0,0,-1]);const b=e._em_scratch(m.bits.length);b&&(e.HEAPU8.set(new Uint8Array(m.bits),b),e._em_item_bits(o,l,b,m.bits.length));break}case"textarea":e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,10,0,1,0,m.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,u(m.height),0,u(m.lineSpacing),-1]),e.ccall("em_item_text",null,["number","number","string"],[o,l,m.content]);break;case"board":e.ccall("em_page_item",null,[...c,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[o,l,11,0,1,0,0,0,0,0,0,0,0,0,-1,u(m.w),u(m.h),0,0,0,-1]);break}}),e.ccall("em_page_end",null,["number","number"],[o,i.items.length])}),e.ccall("em_pages_commit",null,["number"],[t.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(t.font),{default:0,rotundity:1,square:2}[t.selector],u(t.selectorLeftMargin),u(t.selectorTopMargin),u(t.selectorLineSpacing),t.marqueeSpeed,t.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const t=e=>{if(!this.running)return;const r=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(r),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(t){var i,o;const e=this.mod;if(!e)return;const r=e._em_frame(t);if(!r)return;this.img||(this.img=this.ctx.createImageData(128,64));const u=e.HEAPU8.subarray(r,r+Re),s=this.img.data;s.fill(255);for(let m=0;m<64;m++){const l=(m>>3)*128,c=1<<(m&7);let b=m*128*4;for(let x=0;x<128;x++)u[l+x]&c&&(s[b]=17,s[b+1]=24,s[b+2]=39),b+=4}this.ctx.putImageData(this.img,0,0);const a=e._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,(o=(i=this.events).onPageChanged)==null||o.call(i,a))}key(t){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[t])}navTo(t){var e;(e=this.mod)==null||e.ccall("em_nav",null,["number"],[t])}getInt(t){var e;return((e=this.mod)==null?void 0:e._em_get_ipool(t))??0}getSwitch(t){var e;return((e=this.mod)==null?void 0:e._em_get_upool(t))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const qe=Object.keys(ne);function Oe(n,t,e,r){const u=n.getState(),s=e.label||"text"in e&&e.text||ne[e.kind],a=i=>o=>{o.stopPropagation(),n.getState().moveItem(t.id,e.id,i)};return h.html`<div class="ume-item-row ${r?"selected":""}"
    @click=${()=>n.getState().select(t.id,e.id)}>
    <span class="ume-item-icon">${Ce[e.kind]}</span>
    <span class="ume-item-name" title=${s}>${s}</span>
    <button class="ume-mini" title="上移" @click=${a(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${a(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${i=>{i.stopPropagation(),u.duplicateItem(t.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${i=>{i.stopPropagation(),u.removeItem(t.id,e.id)}}>✕</button>
  </div>`}function Be(n,t){const e=n.getState();return h.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${r=>{const u=r.target.value;u&&e.addItem(u,t.id),r.target.value=""}}>
    <option value="">＋条目</option>
    ${qe.map(r=>h.html`<option value=${r}>${ne[r]}</option>`)}
  </select>`}function Fe(n,t){const{project:e,selection:r}=t.getState(),u=s=>{const a=t.getState(),i=r.pageId===s.id;return h.html`<div class="ume-page">
      <div class="ume-page-head ${i?"selected":""}"
        @click=${()=>t.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${o=>{o.stopPropagation(),a.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${o=>{o.stopPropagation(),a.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${o=>{if(o.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${s.name}"？`)&&a.removePage(s.id)}}>✕</button>
      </div>
      ${i?h.html`<div class="ume-page-items">
        ${s.items.length?s.items.map(o=>Oe(t,s,o,r.itemId===o.id)):h.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Be(t,s)}</div>
      </div>`:h.nothing}
    </div>`};h.render(h.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Xe(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(u)}
  `,n)}function Xe(n){const t=prompt("页面名称:",`页面${n.getState().project.pages.length+1}`);t!==null&&n.getState().addPage(t||void 0)}function C(n,t,e,r=""){return h.html`<div class="ume-field">
    <label>${n}</label>
    <input type="text" .value=${t??""} placeholder=${r}
      @change=${u=>e(u.target.value)} />
  </div>`}function k(n,t,e,r=1){return h.html`<div class="ume-field">
    <label>${n}</label>
    <input type="number" .value=${String(t)} step=${String(r)}
      @change=${u=>{const s=parseFloat(u.target.value);e(Number.isFinite(s)?s:0)}} />
  </div>`}function U(n,t,e,r){return h.html`<div class="ume-field">
    <label>${n}</label>
    <select @change=${u=>r(u.target.value)}>
      ${e.map(u=>h.html`<option value=${u.value} ?selected=${u.value===t}>${u.label}</option>`)}
    </select>
  </div>`}function he(n,t,e){return h.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${r=>e(r.target.checked)} />
    <span>${n}</span>
  </div>`}function ge(n,t,e,r=!1){return h.html`<div class="ume-field wide">
    <label>${n}</label>
    <textarea style=${r?"font-family:Consolas,monospace":""}
      @change=${u=>e(u.target.value)}>${t??""}</textarea>
  </div>`}function te(n,t,e="text/plain"){const r=new Blob([t],{type:`${e};charset=utf-8`}),u=document.createElement("a");u.href=URL.createObjectURL(r),u.download=n,u.click(),setTimeout(()=>URL.revokeObjectURL(u.href),5e3)}const Ze=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]),$e={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function le(n,t,e,r){const u=[{value:"",label:"（未绑定）"},...e.map(a=>({value:a.id,label:`${a.name} : ${$e[a.type]??a.type}`}))],s=t?e.some(a=>a.id===t):!1;return h.html`
    ${U(n,t??"",u,a=>r(a||null))}
    ${t&&!s?h.html`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:h.nothing}
    ${e.length===0?h.html`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:h.nothing}
  `}function ce(n,t,e){return h.html`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{const r=n.getState().addVariable();n.getState().updateItem(t,e,{varId:r.id})}}>＋ 新建变量并绑定</button>
  </div>`}function me(n){return n?h.html`<div class="ume-hint">
    ${n.name} : ${$e[n.type]??n.type}，范围 ${n.min}~${n.max}，步长 ${n.step}，初值 ${n.initialValue}
    （在右侧「变量」区修改）
  </div>`:h.html`${h.nothing}`}function Ge(n,t,e){const{project:r,selection:u}=t.getState(),s=r.pages.find(l=>l.id===u.pageId)??null,a=(s==null?void 0:s.items.find(l=>l.id===u.itemId))??null,i=(l,c)=>t.getState().updateItem(s.id,a.id,l,c);let o=h.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,m="属性";if(s&&!a)m="页面属性",o=h.html`
      ${C("名称",s.name,l=>t.getState().updatePage(s.id,{name:l}))}
      ${C("C 函数名",s.fnName,l=>t.getState().updatePage(s.id,{fnName:l}),"留空自动 page_N")}
      ${ge("用户代码",s.userCodePre,l=>t.getState().updatePage(s.id,{userCodePre:l}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(s&&a)switch(m=`${ne[a.kind]}`,a.kind){case"text":o=h.html`
          ${C("文本/格式",a.text,l=>i({text:l},`text-${a.id}`))}
          ${U("大小",String(a.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],l=>i({scale:Number(l)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{const l=a,c=r.variables??[],b=c.find(E=>E.id===l.varId),x=b&&(b.type==="float"||b.type==="double")?"float/double 推荐格式 %.1f / %.2f":"整数推荐格式 %d（无符号用 %u）";o=h.html`
          ${le("绑定变量",l.varId,c,E=>i({varId:E}))}
          ${b?h.nothing:ce(t,s.id,l.id)}
          ${he("可编辑（绑定附加值，取消则仅显示）",l.editable!==!1,E=>i({editable:E}))}
          ${me(b)}
          ${C("显示文本",l.text,E=>i({text:E},`text-${a.id}`))}
          ${U("大小",String(l.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],E=>i({scale:Number(E)}))}
          <div class="ume-hint">${x}；文本支持 \n 多行</div>
        `;break}case"switch":{const l=a,c=(r.variables??[]).filter(x=>x.type==="uint8"),b=c.find(x=>x.id===l.varId)??(r.variables??[]).find(x=>x.id===l.varId);o=h.html`
          ${le("绑定变量",l.varId,c,x=>i({varId:x}))}
          ${b?h.nothing:ce(t,s.id,l.id)}
          ${me(b)}
          ${C("显示文本",l.text,x=>i({text:x},`text-${a.id}`))}
          ${k("openValue",l.openValue,x=>i({openValue:Math.max(0,Math.trunc(x))}))}
          ${C('"开"文本',l.onText,x=>i({onText:x}))}
          ${C('"关"文本',l.offText,x=>i({offText:x}))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;break}case"button":{const l=a;o=h.html`
          ${C("显示文本",l.text,c=>i({text:c},`text-${a.id}`))}
          ${C("回调函数名",l.cbName,c=>i({cbName:c}))}
          ${k("ID",l.buttonId,c=>i({buttonId:Math.trunc(c)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{const l=a;o=h.html`
          ${C("显示文本",l.text,c=>i({text:c},`text-${a.id}`))}
          ${U("目标页面",l.targetPageId??"",[{value:"",label:"（未设置）"},...r.pages.filter(c=>c.id!==s.id).map(c=>({value:c.id,label:c.name}))],c=>i({targetPageId:c||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{o=h.html`
          ${C("显示文本",a.text,l=>i({text:l},`text-${a.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{const l=(r.variables??[]).filter(b=>Ze.has(b.type)),c=l.find(b=>b.id===a.varId)??(r.variables??[]).find(b=>b.id===a.varId);o=h.html`
          ${le("绑定变量",a.varId,l,b=>i({varId:b}))}
          ${c?h.nothing:ce(t,s.id,a.id)}
          ${me(c)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;break}case"chart":{const l=a;o=h.html`
          ${U("类型",l.chartKind,[{value:"line",label:"折线图"},{value:"point",label:"散点图"},{value:"bar",label:"柱状图"}],c=>i({chartKind:c}))}
          ${k("数据点数",l.dataLen,c=>i({dataLen:Math.max(2,Math.trunc(c))}))}
          ${k("高度(px)",l.height,c=>i({height:Math.max(8,Math.trunc(c))}))}
          ${U("示例数据",l.sample,[{value:"sine",label:"正弦"},{value:"ramp",label:"斜坡"},{value:"noise",label:"伪随机"}],c=>i({sample:c}))}
          ${k("量程上限",l.max??0,c=>i({max:c||void 0}),"any")}
          ${k("量程下限",l.min??0,c=>i({min:c||void 0}),"any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;break}case"xbm":{const l=a;o=h.html`
          ${C("数组名",l.name,c=>i({name:c}))}
          ${k("宽(px)",l.w,c=>i({w:Math.min(128,Math.max(1,Math.trunc(c)))}))}
          ${k("高(px)",l.h,c=>i({h:Math.min(64,Math.max(1,Math.trunc(c)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(s.id,l.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${l.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const l=a;o=h.html`
          ${ge("文本内容",l.content,c=>i({content:c}))}
          ${k("高度(px)",l.height,c=>i({height:Math.max(10,Math.trunc(c))}))}
          ${k("行间距",l.lineSpacing,c=>i({lineSpacing:Math.max(0,Math.trunc(c))}))}
          ${he("上下键滚动 (bind)",l.bindScroll,c=>i({bindScroll:c}))}
        `;break}case"board":{const l=a;o=h.html`
          ${k("宽(px)",l.w,c=>i({w:Math.max(1,Math.trunc(c))}))}
          ${k("高(px)",l.h,c=>i({h:Math.max(1,Math.trunc(c))}))}
          ${C("回调函数名",l.cbName,c=>i({cbName:c}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}h.render(h.html`
    <div class="ume-panel-title">属性 ${m!=="属性"?h.html`<span class="ume-kind-badge">${m}</span>`:h.nothing}</div>
    ${o}
  `,n)}let Q=null;const Ye=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (小数)"},{value:"double",label:"double (小数)"}];function Je(n,t){const e=t.variables??[],r=s=>{Q=Q===s?null:s},u=s=>{const a=Q===s.id,i=(c,b)=>n.getState().updateVariable(s.id,c,b),o=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),m=e.filter(c=>c.name===s.name).length>1,l=We(t,s.id);return h.html`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>r(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(未命名)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${l?` · ${l} 处引用`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${c=>{c.stopPropagation();const b=n.getState().removeVariable(s.id);b>0&&alert(`该变量被 ${b} 个条目绑定，请先在条目里解绑（改为"未绑定"）再删除`)}}>✕</button>
      </div>
      ${a?h.html`<div class="ume-var-edit">
        ${C("变量名",s.name,c=>i({name:c.trim()},`vn-${s.id}`))}
        ${o?h.html`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:h.nothing}
        ${m?h.html`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:h.nothing}
        ${U("类型",s.type,Ye,c=>i({type:c}))}
        ${k("初始值",s.initialValue,c=>i({initialValue:c},`vi-${s.id}`),"any")}
        ${k("最小值",s.min,c=>i({min:c},`vmin-${s.id}`),"any")}
        ${k("最大值",s.max,c=>i({max:c},`vmax-${s.id}`),"any")}
        ${k("步长",s.step,c=>i({step:c},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:h.nothing}
    </div>`};return h.html`
    <div class="ume-panel-title">
      变量 (${e.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{Q=n.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${e.length?e.map(u):h.html`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function We(n,t){let e=0;for(const r of n.pages)for(const u of r.items)"varId"in u&&u.varId===t&&e++;return e}function Qe(n,t){const{project:e}=t.getState(),r=(i,o)=>t.getState().update(m=>{Object.assign(m,i)},o),u=e.weakHooks??[],s=(i,o)=>{t.getState().update(m=>{const l=m.weakHooks??[];m.weakHooks=o?[...new Set([...l,i])]:l.filter(c=>c!==i)})},a=h.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${u.length}/${G.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${G.map(i=>h.html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${i.fn}${i.retNote?"（返回 1 = 事件已处理 / 0 = 交给库）":""}`}>
              <input type="checkbox" ?checked=${u.includes(i.fn)}
                @change=${o=>s(i.fn,o.target.checked)} />
              <span>${i.label}</span>
            </div>
            <div class="ume-weak-desc">${i.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;h.render(h.html`
    <div class="ume-panel-title">工程</div>
    ${C("工程名",e.name,i=>r({name:i}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width!==128||e.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    ${Je(t,e)}

    <div class="ume-panel-title">样式</div>
    ${U("字体",e.font,Ae.map(i=>({value:i.id,label:i.label})),i=>r({font:i}))}
    ${U("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],i=>r({selector:i}))}
    ${k("左边距",e.selectorLeftMargin,i=>r({selectorLeftMargin:Math.max(0,Math.trunc(i))}))}
    ${k("顶边距",e.selectorTopMargin,i=>r({selectorTopMargin:Math.max(0,Math.trunc(i))}))}
    ${k("行间距",e.selectorLineSpacing,i=>r({selectorLineSpacing:Math.max(0,Math.trunc(i))}))}
    ${k("跑马灯速度",e.marqueeSpeed,i=>r({marqueeSpeed:i}),.05)}
    ${k("跑马灯停留",e.marqueeHeaderLen,i=>r({marqueeHeaderLen:i}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
    ${h.nothing}
  `,n)}function et(n,t){const e=u=>{let s;const a=()=>{s&&(clearInterval(s),s=void 0)};return{down:i=>{i.preventDefault(),t.key(u),a(),s=window.setInterval(()=>t.key(u),180)},up:a}},r=(u,s,a)=>{const i=e(u);return h.html`<button class="ume-key" title=${a}
      @pointerdown=${i.down} @pointerup=${i.up} @pointerleave=${i.up}>${s}</button>`};h.render(h.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${u=>{const a={ArrowUp:N.Up,ArrowDown:N.Down,Enter:N.Enter,Escape:N.Return,Backspace:N.Return,"+":N.Add,"-":N.Sub,"=":N.Add,_:N.Sub}[u.key];a!==void 0&&(u.preventDefault(),t.key(a))}}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${r(N.Up,"▲","上 MENU_Key_Up")}
      ${r(N.Down,"▼","下 MENU_Key_Down")}
      ${r(N.Enter,"OK","确认 MENU_Key_Enter")}
      ${r(N.Return,"⌫","返回 MENU_Key_Return")}
      ${r(N.Add,"＋","加 MENU_Key_Add")}
      ${r(N.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,n)}let Z=null,q="c";function tt(n,t){Z=t,n.querySelectorAll(":scope > .ume-modal-mask").forEach(e=>e.remove()),nt(n)}function nt(n){if(!Z)return;const t=q==="c"?Z.c:Z.h,e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",u=>{u.target===e&&fe(e)});const r=()=>{h.render(h.html`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>fe(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${Z.warnings.length?h.html`
            <div style="margin-bottom:8px">
              ${Z.warnings.map(u=>h.html`<div class="ume-warn">⚠ ${u}</div>`)}
            </div>`:h.nothing}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${q==="c"?"primary":""}" @click=${()=>{q="c",r()}}>menu_pages.c</button>
            <button class="ume-btn sm ${q==="h"?"primary":""}" @click=${()=>{q="h",r()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${t}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(t).then(()=>at(e,"已复制到剪贴板"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{te(q==="c"?"menu_pages.c":"menu_pages.h",t)}}>下载 ${q==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,e)};r(),n.appendChild(e)}function fe(n){n.remove()}function at(n,t){const e=n.closest(".ume")??document.body;let r=e.querySelector(".ume-toast");r||(r=document.createElement("div"),r.className="ume-toast",e.appendChild(r)),r.textContent=t,r.classList.add("show"),setTimeout(()=>r.classList.remove("show"),1600)}function it(n,t,e,r){const s=t.getState().project.pages.find(v=>v.id===e),a=s==null?void 0:s.items.find(v=>v.id===r);if(!a||a.kind!=="xbm")return;const i=a;let o=i.w,m=i.h,l=[...i.bits];const c=()=>Math.ceil(o/8),b=document.createElement("div");b.className="ume-modal-mask",b.addEventListener("click",v=>{v.target===b&&H()});const x=(v,y)=>{const M=y*c()+(v>>3);return M<l.length?!!(l[M]>>(v&7)&1):!1},E=(v,y,M)=>{const d=y*c()+(v>>3);l[d]=M?l[d]|1<<(v&7):l[d]&~(1<<(v&7))},j=(v,y)=>{const M=Math.ceil(o/8),d=Math.ceil(v/8),_=new Array(d*y).fill(0);for(let p=0;p<Math.min(m,y);p++)for(let w=0;w<Math.min(o,v);w++){const A=p*M+(w>>3);A<l.length&&l[A]>>(w&7)&1&&(_[p*d+(w>>3)]|=1<<(w&7))}o=v,m=y,l=_};let z=!1,Y=!0;const T=(v,y)=>M=>{M.preventDefault(),z=!0,Y=!x(v,y),E(v,y,Y),D()},W=(v,y)=>()=>{z&&(E(v,y,Y),D())},B=()=>{z=!1},D=()=>{h.render(f(),b)},ie=()=>{const v=[];for(let y=0;y<m;y++)for(let M=0;M<o;M++)v.push(h.html`<button class="ume-xbm-cell ${x(M,y)?"on":""}"
          data-x=${M} data-y=${y}
          @pointerdown=${T(M,y)}
          @pointerenter=${W(M,y)}></button>`);return v},f=()=>h.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${o}×${m}</span></span>
        <button class="ume-mini" @click=${H}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${B}
        @pointerleave=${B}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(o)} min="1" max="128"
            @change=${v=>{j(ve(+v.target.value,1,128),m),D()}} />
          <input type="number" style="width:64px" .value=${String(m)} min="1" max="64"
            @change=${v=>{j(o,ve(+v.target.value,1,64)),D()}} />
          <button class="ume-btn sm" @click=${()=>{l=l.map(()=>0),D()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{l=l.map(v=>~v&255),D()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${o}, 14px)">${ie()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${i.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${H}>取消</button>
        <button class="ume-btn primary" @click=${()=>{t.getState().updateItem(e,r,{w:o,h:m,bits:[...l]}),H()}}>应用</button>
      </div>
    </div>
  `;function H(){b.remove(),document.removeEventListener("pointerup",B)}document.addEventListener("pointerup",B),D(),n.appendChild(b)}function ve(n,t,e){return Number.isFinite(n)?Math.min(e,Math.max(t,Math.trunc(n))):t}const rt="prebuilt/u8g2-menu-preview.js";class st{constructor(t,e={}){var l;if(this.store=xe(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.container=t,this.opts={persistKey:"default",...e},t.classList.add("ume"),!document.getElementById("ume-style")){const c=document.createElement("style");c.id="ume-style",c.textContent=ye,document.head.appendChild(c)}const r=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,u=this.opts.data??r??void 0;if(u!==void 0)try{this.store.setState({project:ue(u)})}catch(c){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",c)}const s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,a=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;s&&a&&(this.lastExport={c:s,h:a}),t.innerHTML=`
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
    `;const i=c=>t.querySelector(c);this.els={left:i(".ume-left"),center:i(".ume-center"),right:i(".ume-right"),styleEl:i('[data-role="style"]'),propEl:i('[data-role="prop"]'),toolbarUndo:i('[data-act="undo"]'),toolbarRedo:i('[data-act="redo"]')};const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new He(o,{onPageChanged:c=>this.onPreviewPageChanged(c)});const m=document.createElement("div");this.els.center.appendChild(m),et(m,this.preview),this.preview.load(this.opts.wasmUrl??rt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(c=>{console.error(c);const b=document.createElement("div");b.className="ume-warn",b.textContent=`预览引擎加载失败: ${c.message}。编辑功能不受影响。`,this.els.center.prepend(b)}),t.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const c=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);c!==null&&this.store.getState().addPage(c||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),t.querySelector('[data-act="export-json"]').addEventListener("click",()=>{te(`${this.store.getState().project.name||"menu-project"}.json`,pe(this.store.getState().project),"application/json")}),t.querySelector('[data-act="import"]').addEventListener("click",()=>{i('[data-role="file"]').click()}),i('[data-role="file"]').addEventListener("change",c=>{var x;const b=(x=c.target.files)==null?void 0:x[0];b&&(b.text().then(E=>{try{const j=ue(E);this.store.getState().update(z=>{Object.assign(z,j)}),this.scheduleRender()}catch(j){alert(`导入失败: ${j.message}`)}}),c.target.value="")}),t.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(((l=this.store.getState().project.pages[0])==null?void 0:l.id)??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(t){var r;const e=ue(t);this.store.getState().update(u=>{Object.assign(u,e)}),this.store.getState().select(((r=e.pages[0])==null?void 0:r.id)??null,null)}generate(){var r,u;const t=this.lastExport,e=be(this.store.getState().project,t??void 0);return this.lastExport={c:e.c,h:e.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,e.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,e.h)),tt(this.container,e),(u=(r=this.opts).onExport)==null||u.call(r,e),e}downloadC(){const t=be(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:t.c,h:t.h},te("menu_pages.c",t.c),te("menu_pages.h",t.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(t){const e=t.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"?(t.preventDefault(),t.shiftKey?this.store.getState().redo():this.store.getState().undo()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="y"&&(t.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(t){const e=this.store.getState().project.pages[t];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,pe(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const t=this.store.getState();Fe(this.els.left,this.store),Qe(this.els.styleEl,this.store),Ge(this.els.propEl,this.store,{openXbmEditor:(e,r)=>it(this.container,this.store,e,r)}),this.els.toolbarUndo.disabled=t.past.length===0,this.els.toolbarRedo.disabled=t.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var s;const t=document.getElementById("ume-live-value"),e=document.getElementById("ume-page-jump"),r=this.store.getState(),u=this.store.getState().project.pages.findIndex(a=>a.id===r.selection.pageId);if(e){const a=r.project.pages,i=a.map(m=>m.name).join("|");e.dataset.sig!==i&&(e.dataset.sig=i,e.innerHTML="",a.forEach((m,l)=>{const c=document.createElement("option");c.value=String(l),c.textContent=`${l+1}. ${m.name}`,e.appendChild(c)}),e.onchange=()=>{const m=parseInt(e.value,10);Number.isFinite(m)&&this.preview.navTo(m)});const o=this.preview.currentPage;document.activeElement!==e&&e.value!==String(o)&&(e.value=String(o))}if(t&&u>=0&&r.selection.itemId){const a=r.project.pages[u],i=a.items.findIndex(m=>m.id===r.selection.itemId),o=a.items[i];if(o&&"varId"in o){const m=o.varId?(r.project.variables??[]).findIndex(x=>x.id===o.varId):-1,l=m>=0?m:u*64+i,c=o.kind==="switch"?this.preview.getSwitch(l):this.preview.getInt(l),b=(s=(r.project.variables??[]).find(x=>x.id===o.varId))==null?void 0:s.name;t.textContent=`${b??o.kind} = ${c}`}else t.textContent=""}}}exports.MenuEditor=st;exports.MenuKey=N;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
