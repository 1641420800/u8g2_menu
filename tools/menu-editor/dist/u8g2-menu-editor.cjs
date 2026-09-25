"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const de=require("zustand/vanilla"),g=require("lit-html"),pe=`/* u8g2-menu-editor 样式（前缀 ume-） */
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
.ume-weak-desc { font-size: 11px; color: var(--ume-dim); margin: 2px 0 0 22px; line-height: 1.45; }`;let te=0;function W(a){return te=(te+1)%1e9,`${a}_${Date.now().toString(36)}_${te.toString(36)}`}function A(a){const n={id:W("it"),label:""};switch(a){case"text":return{...n,kind:a,text:"菜单项",scale:1};case"number":return{...n,kind:a,text:"v:%d",scale:1,varType:"int32",varName:"var_value",step:1,min:0,max:100,decimals:1,initialValue:50};case"switch":return{...n,kind:a,text:"s:%s",scale:1,varName:"var_switch",openValue:1,onText:"on",offText:"off",initialValue:0};case"button":return{...n,kind:a,text:"执行操作",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...n,kind:a,text:"下一级",scale:1,targetPageId:null};case"back":return{...n,kind:a,text:"返回",scale:1};case"slider":return{...n,kind:a,varName:"var_slider",step:2,min:0,max:100,initialValue:50};case"progress":return{...n,kind:a,varName:"var_prog",step:2,min:0,max:100,initialValue:70};case"chart":return{...n,kind:a,chartKind:"line",dataLen:24,height:32,sample:"sine"};case"xbm":return be(16,16);case"textarea":return{...n,kind:a,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...n,kind:a,w:64,h:32,cbName:"board_cb"}}}function be(a,n){const e=Math.ceil(a/8);return{id:W("it"),kind:"xbm",label:"",name:"icon",w:a,h:n,bits:new Array(e*n).fill(0)}}function se(a){return{id:W("pg"),name:a,fnName:"",items:[],userCodePre:""}}function G(a,n){return{...a,...n}}function he(){const a=se("主页");a.items=[G(A("text"),{text:"u8g2_menu"}),G(A("submenu"),{text:"系统设置"}),G(A("button"),{text:"关于",cbName:"btn_about_cb"})];const n=se("设置");n.items=[G(A("number"),{text:"音量:%d"}),G(A("switch"),{text:"开关:%s"}),A("slider"),A("back")];const e={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],pages:[a,n]};return a.items[1].targetPageId=n.id,e}function ge(a){return structuredClone(a)}const fe=800;function me(){let a=null,n=0;return de.createStore()((e,r)=>({project:he(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(s,c)=>{const u=Date.now(),t=!!c&&c===a&&u-n<fe;a=c??null,n=u,e(i=>{const p=ge(i.project);return s(p),{project:p,dirty:!0,past:t?i.past:[...i.past.slice(-99),i.project],future:[]}})},undo:()=>{e(s=>s.past.length?{project:s.past[s.past.length-1],past:s.past.slice(0,-1),future:[s.project,...s.future.slice(0,99)],dirty:!0}:s)},redo:()=>{e(s=>{if(!s.future.length)return s;const[c,...u]=s.future;return{project:c,past:[...s.past,s.project],future:u,dirty:!0}})},select:(s,c=null)=>e({selection:{pageId:s,itemId:c}}),addPage:s=>{const c={id:W("pg"),name:s??`页面${r().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return r().update(u=>{u.pages.push(c)}),e({selection:{pageId:c.id,itemId:null}}),c},removePage:s=>{r().update(u=>{u.pages=u.pages.filter(t=>t.id!==s);for(const t of u.pages)for(const i of t.items)i.kind==="submenu"&&i.targetPageId===s&&(i.targetPageId=null)});const{selection:c}=r();c.pageId===s&&e({selection:{pageId:null,itemId:null}})},movePage:(s,c)=>{r().update(u=>{const t=u.pages.findIndex(p=>p.id===s),i=t+c;t<0||i<0||i>=u.pages.length||([u.pages[t],u.pages[i]]=[u.pages[i],u.pages[t]])})},updatePage:(s,c)=>{r().update(u=>{const t=u.pages.find(i=>i.id===s);t&&Object.assign(t,c)})},addItem:(s,c)=>{var i;const u=c??r().selection.pageId??((i=r().project.pages[0])==null?void 0:i.id);if(!u)return null;const t=ve(s);return r().update(p=>{const o=p.pages.find(l=>l.id===u);o==null||o.items.push(t)}),e({selection:{pageId:u,itemId:t.id}}),t},removeItem:(s,c)=>{r().update(t=>{const i=t.pages.find(p=>p.id===s);i&&(i.items=i.items.filter(p=>p.id!==c))});const{selection:u}=r();u.itemId===c&&e({selection:{pageId:s,itemId:null}})},moveItem:(s,c,u)=>{r().update(t=>{const i=t.pages.find(l=>l.id===s);if(!i)return;const p=i.items.findIndex(l=>l.id===c),o=p+u;p<0||o<0||o>=i.items.length||([i.items[p],i.items[o]]=[i.items[o],i.items[p]])})},duplicateItem:(s,c)=>{let u=null;r().update(t=>{const i=t.pages.find(o=>o.id===s);if(!i)return;const p=i.items.findIndex(o=>o.id===c);p<0||(u=structuredClone(i.items[p]),u.id=W("it"),i.items.splice(p+1,0,u))}),u&&e({selection:{pageId:s,itemId:u.id}})},updateItem:(s,c,u,t)=>{r().update(i=>{const p=i.pages.find(l=>l.id===s),o=p==null?void 0:p.items.find(l=>l.id===c);o&&Object.assign(o,u)},t)}}))}me();function ve(a){return A(a)}const ne=1,B=[{fn:"u8g2_menuItemEnter_weak",label:"光标进入某行",desc:"选中行切换到新行号的瞬间触发。适合做提示音、联动外设等。",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"光标离开某行",desc:"光标离开某一行时触发（item = 离开的行号）。",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"数值加一步",desc:'正在编辑的值被"加"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"数值减一步",desc:'正在编辑的值被"减"一步后触发（p = 变量地址）。',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"数值变化（推荐）",desc:"值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"按键事件（可改键）",desc:"任意按键触发。修改 *u8g2_menuKeyValue 可以把某个键替换成其他功能。",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"字符输入",desc:"字符串编辑条目（u8g2_MenuItem_str）收到字符时触发，可修改 *c 过滤输入。",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"事件过滤器",desc:"事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"自定义按键",desc:"MENU_Key_USER_1~6 按下时触发；默认 6 个功能键（上下/确认/返回/加/减）不会进入这里。",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"按键拦截",desc:'任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"按键预处理（改键映射）",desc:'按键分发前修改键值。注意：重写它会覆盖库默认的"编辑状态下 上/下/确认 → 加/减/返回"映射，需自行处理。',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],Q={text:"文本",number:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回上级",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},xe={text:"T",number:"#",switch:"◉",button:"⏎",submenu:"→",back:"←",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},_e=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class R extends Error{}function re(a){return typeof a=="object"&&a!==null&&!Array.isArray(a)}function T(a,n){return typeof a=="string"?a:n}function P(a,n){return typeof a=="number"&&Number.isFinite(a)?a:n}const $e=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function we(a){if(!re(a))throw new R("条目格式错误");const n=a.kind;if(typeof n!="string"||!$e.includes(n))throw new R(`未知条目类型: ${String(n)}`);const e=structuredClone(a);switch(e.id=T(a.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=T(a.label,""),n){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=T(a.text,""),e.scale=a.scale===2?2:1;break}return e}function ye(a){if(!re(a))throw new R("页面格式错误");const n=Array.isArray(a.items)?a.items.map(we):[];return{id:T(a.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:T(a.name,"未命名页面"),fnName:T(a.fnName,""),items:n,userCodePre:T(a.userCodePre,"")}}function ae(a){let n;if(typeof a=="string")try{n=JSON.parse(a)}catch{throw new R("JSON 解析失败")}else n=a;if(!re(n))throw new R("不是有效的工程文件");const e=n,r=P(e.version,0);if(r>ne)throw new R(`工程版本 v${r} 高于当前支持的 v${ne}，请升级编辑器`);const s=Array.isArray(e.pages)?e.pages.map(ye):[];if(!s.length)throw new R("工程至少需要一个页面");const c=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity",u=new Set(B.map(i=>i.fn)),t=Array.isArray(e.weakHooks)?[...new Set(e.weakHooks.filter(i=>typeof i=="string"&&u.has(i)))]:[];return{version:ne,name:T(e.name,"未命名工程"),width:P(e.width,128),height:P(e.height,64),font:T(e.font,"u8g2_font_wqy12_t_gb2312"),selector:c,selectorLeftMargin:P(e.selectorLeftMargin,16),selectorTopMargin:P(e.selectorTopMargin,0),selectorLineSpacing:P(e.selectorLineSpacing,0),marqueeSpeed:P(e.marqueeSpeed,.2),marqueeHeaderLen:P(e.marqueeHeaderLen,5),weakHooks:t,pages:s}}function ie(a){return JSON.stringify(a,null,2)}const ke={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function z(a,n="anon"){let e=a.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||n}function J(a){return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function O(a){if(!Number.isFinite(a))return"0.0f";const n=a.toString();return/[-.]|e/i.test(n)?`${n}f`:`${n}.0f`}function Se(a){const n=new Map;if(!a)return n;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let r;for(;(r=e.exec(a))!==null;)n.set(r[1],r[2]);return n}function I(a,n,e){const r=n.has(a)?n.get(a):"";return`${e}/* USER CODE BEGIN ${a} */${r}${e}/* USER CODE END ${a} */`}function ue(a,n){const e=[],r=Se((n==null?void 0:n.c)??""),s=a.pages.map((d,v)=>d.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.fnName)?d.fnName:`page_${v}`),c=new Map,u=(d,v,m,$,b)=>{const y=c.get(d);if(y){y.type!==v&&e.push(`变量 "${d}" 被多个不同类型的条目引用（${y.type} / ${v}），以首个定义为准`);return}c.set(d,{name:d,type:v,init:m,isFloat:$,owner:b})},t=new Map,i=new Set,p=[],o=[],l=[],x=[],E=[],D=new Set,N=new Map;let U=0,X=0;for(const d of a.pages)for(const v of d.items)switch(v.kind){case"number":{const m=v;if(!m.varName){e.push(`存在未命名变量条目（页面 ${d.name}），已跳过绑定`);break}const $=m.varType==="float"||m.varType==="double"?O(m.initialValue):String(Math.trunc(m.initialValue));u(m.varName,ke[m.varType],$,m.varType==="float"||m.varType==="double",v),/%[-+ #0]*[a-zA-Z]/.test(m.text)||e.push(`数值条目 "${d.name}/${m.varName}" 的显示文本不含格式化占位符（如 %d）`);break}case"switch":{const m=v;if(!m.varName){e.push(`存在未命名开关条目（页面 ${d.name}），已跳过绑定`);break}u(m.varName,"uint8_t",String(Math.trunc(m.initialValue)),!1,v),/%[-+ #0]*s/.test(m.text)||e.push(`开关条目 "${m.varName}" 的显示文本建议包含 %s 用于显示 on/off`);break}case"slider":case"progress":{const m=v;if(!m.varName){e.push(`存在未命名${v.kind==="slider"?"滑块":"进度"}条目（页面 ${d.name}）`);break}u(m.varName,"int",String(Math.trunc(m.initialValue)),!1,v);break}case"button":{const m=z(v.cbName,"btn_cb");t.has(m)||t.set(m,v.buttonId);break}case"board":i.add(z(v.cbName,"board_cb"));break;case"chart":{const m=U++;p.push(`#define CHART${m}_LEN ${Math.max(2,Math.trunc(v.dataLen))}`,`static float chart${m}_data[CHART${m}_LEN];`,`static float chart${m}_dis[CHART${m}_LEN];`,`static u8g2_chart_t chart${m};`,`static uint8_t chart${m}_inited = 0;`);const $=v.sample==="sine"?`chart${m}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);`:v.sample==="ramp"?`chart${m}_data[i] = (float)i;`:`chart${m}_data[i] = (float)((i * 37) % CHART${m}_LEN);`,b=`chart${m}_fill`,y=(r.get(b)??"").trim()!=="";o.push([`    if (!chart${m}_inited) {`,`        chart${m}_inited = 1;`,`        u8g2_chart_init(&chart${m}, chart${m}_data, chart${m}_dis, CHART${m}_LEN);`,I(b,r,"        "),...y?[]:[`        for (uint16_t i = 0; i < CHART${m}_LEN; ++i) { ${$} }`],"    }"].join(`
`));break}case"xbm":{let m=z(v.name,"icon");for(;D.has(m);)m=`${m}_2`;D.add(m),N.set(v.id,m);const $=v.bits.length,b=v.bits.map(y=>`0x${(y&255).toString(16).padStart(2,"0")}`).join(", ");l.push(`static const uint8_t menu_xbm_${m}[${$}] = { ${b} };`);break}case"textarea":{const m=X++;x.push(`static char ta${m}_text[] = "${J(v.content)}";`,`static u8g2_menu_textArea_t ta${m};`,`static uint8_t ta${m}_inited = 0;`),E.push(`    if (!ta${m}_inited) {`,`        ta${m}_inited = 1;`,`        u8g2_textArea_init(&ta${m}, ta${m}_text);`,`        u8g2_textArea_setLineSpacing(&ta${m}, ${Math.max(0,Math.trunc(v.lineSpacing))});`,"    }");break}}const j=(d,v)=>{if(!d)return"";const m=`"${J(d)}"`;return v===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${m});`:`u8g2_MenuUTF8Printf(${m});`},Y=(d,v,m)=>{const $=`"${J(d)}"`;return v===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${$}, ${m});`:`u8g2_MenuUTF8Printf(${$}, ${m});`};let H=0,C=0;const ee=(d,v)=>{const m=[],$=`${v.name}`;switch(d.kind){case"text":{const b=j(d.text,d.scale);b&&m.push(`    ${b}`);break}case"number":{const b=d;if(!c.has(b.varName))break;const y=b.varType==="float"||b.varType==="double"?`u8g2_MenuItemValue_${b.varType}(&${b.varName}, ${O(b.step)}, ${O(b.min)}, ${O(b.max)});`:`u8g2_MenuItemValue_${b.varType}(&${b.varName}, ${Math.trunc(b.step)}, ${Math.trunc(b.min)}, ${Math.trunc(b.max)});`;m.push(`    ${y}`),m.push(`    ${Y(b.text,b.scale,b.varName)}`);break}case"switch":{const b=d;if(!c.has(b.varName))break;m.push(`    u8g2_MenuItemValue_switch(&${b.varName}, ${Math.trunc(b.openValue)});`),m.push(`    ${Y(b.text,b.scale,`${b.varName} ? "${J(b.onText)}" : "${J(b.offText)}"`)}`);break}case"button":{const b=z(d.cbName,"btn_cb");m.push(`    u8g2_MenuItem_button(${b}, ${Math.trunc(d.buttonId)});`);const y=j(d.text,d.scale);y&&m.push(`    ${y}`);break}case"submenu":{if(!d.targetPageId){e.push(`页面 ${$} 的子页面条目 "${d.text||d.label||d.id}" 未指定目标页面，已按普通文本生成`);const q=j(d.text,d.scale);q&&m.push(`    ${q}`);break}const b=a.pages.findIndex(q=>q.id===d.targetPageId);if(b<0){e.push(`页面 ${$} 的子页面条目目标无效`);break}m.push(`    u8g2_MenuItem_menu_enter(${s[b]});`);const y=j(d.text,d.scale);y&&m.push(`    ${y}`);break}case"back":{m.push("    u8g2_MenuItem_menu_back();");const b=j(d.text,d.scale);b&&m.push(`    ${b}`);break}case"slider":{const b=d;if(!c.has(b.varName))break;m.push(`    u8g2_MenuDrawItemSlider_bind(&${b.varName}, ${Math.trunc(b.step)}, ${Math.trunc(b.min)}, ${Math.trunc(b.max)});`);break}case"progress":{const b=d;if(!c.has(b.varName))break;m.push(`    u8g2_MenuDrawItemProgressBar_bind(&${b.varName}, ${Math.trunc(b.step)}, ${Math.trunc(b.min)}, ${Math.trunc(b.max)});`);break}case"chart":{const b=H++;m.push(...o[b].split(`
`));const y=d.chartKind==="point"?"Point":d.chartKind==="bar"?"Bar":"Line",q=d.min!==void 0&&d.max!==void 0?`${O(d.max)}, ${O(d.min)}`:"0, 0";m.push(`    u8g2_MenuDrawItem${y}Chart(&chart${b}, ${Math.max(4,Math.trunc(d.height))}, ${q});`);break}case"xbm":m.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(d.w)}, ${Math.trunc(d.h)}, menu_xbm_${N.get(d.id)??z(d.name,"icon")});`);break;case"textarea":{const b=C++;m.push(...E[b].split(`
`));const y=d.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";m.push(`    ${y}(&ta${b}, ${Math.max(10,Math.trunc(d.height))});`);break}case"board":{const b=z(d.cbName,"board_cb");m.push(`    u8g2_MenuDrawItemBoard(${b}, ${Math.max(1,Math.trunc(d.w))}, ${Math.max(1,Math.trunc(d.h))});`);break}}return m},h=[];h.push("/**"),h.push(` * 由 u8g2-menu-editor 自动生成，工程: ${a.name}`),h.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),h.push(" */"),h.push('#include "menu_pages.h"'),h.push('#include "u8g2_menu.h"'),p.length&&h.push("#include <math.h>"),h.push(""),h.push(I("includes",r,"")),h.push(""),h.push("/* ======================== 变量定义 ======================== */"),h.push(I("variables",r,""));for(const d of c.values())h.push(`${d.type} ${d.name} = ${d.init};`);if(h.push(""),(p.length||x.length||l.length)&&(h.push("/* ======================== 页面资源 ======================== */"),h.push(...p,...x,...l),h.push("")),t.size||i.size){h.push("/* ======================== 回调函数 ======================== */"),h.push(I("callbacks",r,""));for(const[d]of t)h.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID)`),h.push("{"),h.push(I(`cb_${d}`,r,"    ")),h.push("}"),h.push("");for(const d of i)h.push(`void ${d}(u8g2_t *u8g2)`),h.push("{"),h.push(I(`cb_${d}`,r,"    ")),h.push("}"),h.push("")}const K=(a.weakHooks??[]).map(d=>B.find(v=>v.fn===d)).filter(d=>!!d);if(K.length||r.has("weak")||B.some(d=>(r.get(`weak_${d.fn}`)??"").trim())){h.push("/* ==================== 弱定义函数重写 ==================== */"),h.push("/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，"),h.push(" * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */");const v=B.filter(m=>{var $;return!(($=a.weakHooks)!=null&&$.includes(m.fn))&&(r.get(`weak_${m.fn}`)??"").trim()}).map(m=>[`#if 0   /* 已取消勾选 ${m.fn}，手写内容保留于此；重新勾选后恢复编译 */`,`${m.decl}`,"{",I(`weak_${m.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);h.push(v?`${I("weak",r,"").replace(/\n$/,"")}
${v}
`:I("weak",r,"")),h.push("");for(const m of K){h.push(`/* ${m.label}: ${m.desc} */`),h.push(`${m.decl}`),h.push("{"),h.push(I(`weak_${m.fn}`,r,"    "));const $=m.bodyArgs.split(`
`).map(b=>`    ${b}`);m.retNote&&$.push(`    ${m.retNote}`),h.push(...$),h.push("}"),h.push("")}}h.push("/* ======================== 页面函数 ======================== */"),h.push(""),a.pages.forEach((d,v)=>{h.push(`/* 页面: ${d.name} */`),h.push(`void ${s[v]}(void)`),h.push("{"),h.push(I(`page_${s[v]}_pre`,r,"    "));for(const m of d.items)h.push(...ee(m,d));h.push("}"),h.push("")});const f=[];if(f.push("#ifndef MENU_PAGES_H"),f.push("#define MENU_PAGES_H"),f.push(""),f.push('#include "u8g2_menu.h"'),f.push(""),f.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"),s.forEach((d,v)=>f.push(`void ${d}(void);   /* ${a.pages[v].name} */`)),f.push(""),c.size){f.push("/* 可编辑变量（在条目绑定中使用） */");for(const d of c.values())f.push(`extern ${d.type} ${d.name};`);f.push("")}if(t.size||i.size){f.push("/* 用户回调 */");for(const[d]of t)f.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID);`);for(const d of i)f.push(`void ${d}(u8g2_t *u8g2);`);f.push("")}f.push("#endif /* MENU_PAGES_H */");const w=h.join(`
`).replace(/\n{3,}/g,`


`),k=f.join(`
`);return{c:`${w}
`,h:`${k}
`,warnings:e}}var M=(a=>(a[a.None=0]="None",a[a.Up=1]="Up",a[a.Down=2]="Down",a[a.Enter=3]="Enter",a[a.Return=4]="Return",a[a.Add=5]="Add",a[a.Sub=6]="Sub",a))(M||{});const Me=8192/8;function Ee(a){return new Promise((n,e)=>{const r=document.createElement("script");r.src=a,r.onload=()=>n(),r.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${a}`)),document.head.appendChild(r)})}class Ie{constructor(n,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.lastKnownPage=0,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",n.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(n){if(this.mod)return;const e=window;e.U8G2MenuPreview||await Ee(n);const r=e.U8G2MenuPreview;if(!r)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await r({locateFile:c=>n.replace(/[^/\\]*$/,"")+c}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const s=this.mod._em_font_count_export();for(let c=0;c<s;c++){const u=this.mod._em_font_name(c);this.fontIndexCache.set(this.mod.UTF8ToString(u),c)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(n){return this.fontIndexCache.get(n)??0}signature(n){return JSON.stringify(n.pages.map(e=>({n:e.items.length,k:e.items.map(r=>r.kind).join(","),res:e.items.map(r=>r.kind==="chart"?`${r.dataLen}|${r.sample}`:r.kind==="xbm"?`${r.w}x${r.h}`:r.kind==="textarea"?Math.ceil(r.content.length/64):"").join(",")})))}sync(n){const e=this.mod;if(!e)return;const r=this.signature(n);r!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=r);const s=c=>Math.trunc(Number.isFinite(c)?c:0);n.pages.forEach((c,u)=>{e.ccall("em_page_begin",null,["number"],[u]),c.items.forEach((t,i)=>{const p=["number","number"];switch(t.kind){case"text":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,0,0,t.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[u,i,t.text]);break;case"number":{const o={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[t.varType],l=t.varType==="float"||t.varType==="double"?Math.round(t.initialValue):s(t.initialValue);e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,1,o,t.scale,0,0,0,0,0,l,s(t.step),s(t.min),s(t.max),-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[u,i,t.text]);break}case"switch":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,2,0,t.scale,0,0,s(t.openValue),0,0,s(t.initialValue),0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[u,i,t.text]),e.ccall("em_item_swtext",null,["number","number","string","string"],[u,i,t.onText,t.offText]);break;case"button":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,3,0,t.scale,0,0,0,s(t.buttonId),0,0,0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[u,i,t.text]);break;case"submenu":{const o=n.pages.findIndex(l=>l.id===t.targetPageId);e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,4,0,t.scale,0,0,0,0,0,0,0,0,0,o,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[u,i,t.text]);break}case"back":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,5,0,t.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[u,i,t.text]);break;case"slider":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,6,0,1,0,0,0,0,0,s(t.initialValue),s(t.step),s(t.min),s(t.max),-1,0,0,0,0,0]);break;case"progress":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,7,0,1,0,0,0,0,0,s(t.initialValue),s(t.step),s(t.min),s(t.max),-1,0,0,0,0,0]);break;case"chart":{const o={sine:0,ramp:1,noise:2}[t.sample],l=t.min!==void 0&&t.max!==void 0?1:0;e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,8,0,1,{line:0,point:1,bar:2}[t.chartKind],0,0,0,l,o,0,l?s(t.min):0,l?s(t.max):0,-1,0,0,s(t.height),s(t.dataLen),0]);break}case"xbm":{e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,9,0,1,0,0,0,0,0,0,0,0,0,-1,s(t.w),s(t.h),0,0,0]);const o=e._em_scratch(t.bits.length);o&&(e.HEAPU8.set(new Uint8Array(t.bits),o),e._em_item_bits(u,i,o,t.bits.length));break}case"textarea":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,10,0,1,0,t.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,s(t.height),0,s(t.lineSpacing)]),e.ccall("em_item_text",null,["number","number","string"],[u,i,t.content]);break;case"board":e.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,i,11,0,1,0,0,0,0,0,0,0,0,0,-1,s(t.w),s(t.h),0,0,0]);break}}),e.ccall("em_page_end",null,["number","number"],[u,c.items.length])}),e.ccall("em_pages_commit",null,["number"],[n.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(n.font),{default:0,rotundity:1,square:2}[n.selector],s(n.selectorLeftMargin),s(n.selectorTopMargin),s(n.selectorLineSpacing),n.marqueeSpeed,n.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const n=e=>{if(!this.running)return;const r=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(r),this.raf=requestAnimationFrame(n)};this.raf=requestAnimationFrame(n)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(n){var t,i;const e=this.mod;if(!e)return;const r=e._em_frame(n);if(!r)return;this.img||(this.img=this.ctx.createImageData(128,64));const s=e.HEAPU8.subarray(r,r+Me),c=this.img.data;c.fill(255);for(let p=0;p<64;p++){const o=(p>>3)*128,l=1<<(p&7);let x=p*128*4;for(let E=0;E<128;E++)s[o+E]&l&&(c[x]=17,c[x+1]=24,c[x+2]=39),x+=4}this.ctx.putImageData(this.img,0,0);const u=e._em_get_current_page();u!==this.lastKnownPage&&(this.lastKnownPage=u,(i=(t=this.events).onPageChanged)==null||i.call(t,u))}key(n){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[n])}getInt(n,e){var r;return((r=this.mod)==null?void 0:r._em_get_ipool(n*64+e))??0}getSwitch(n,e){var r;return((r=this.mod)==null?void 0:r._em_get_upool(n*64+e))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const Ne=Object.keys(Q);function Ce(a,n,e,r){const s=a.getState(),c=e.label||"text"in e&&e.text||Q[e.kind],u=t=>i=>{i.stopPropagation(),a.getState().moveItem(n.id,e.id,t)};return g.html`<div class="ume-item-row ${r?"selected":""}"
    @click=${()=>a.getState().select(n.id,e.id)}>
    <span class="ume-item-icon">${xe[e.kind]}</span>
    <span class="ume-item-name" title=${c}>${c}</span>
    <button class="ume-mini" title="上移" @click=${u(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${u(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${t=>{t.stopPropagation(),s.duplicateItem(n.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${t=>{t.stopPropagation(),s.removeItem(n.id,e.id)}}>✕</button>
  </div>`}function Te(a,n){const e=a.getState();return g.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${r=>{const s=r.target.value;s&&e.addItem(s,n.id),r.target.value=""}}>
    <option value="">＋条目</option>
    ${Ne.map(r=>g.html`<option value=${r}>${Q[r]}</option>`)}
  </select>`}function Pe(a,n){const{project:e,selection:r}=n.getState(),s=c=>{const u=n.getState(),t=r.pageId===c.id;return g.html`<div class="ume-page">
      <div class="ume-page-head ${t?"selected":""}"
        @click=${()=>n.getState().select(c.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${c.name}</span>
        <button class="ume-mini" title="上移页面" @click=${i=>{i.stopPropagation(),u.movePage(c.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${i=>{i.stopPropagation(),u.movePage(c.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${i=>{if(i.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${c.name}"？`)&&u.removePage(c.id)}}>✕</button>
      </div>
      ${t?g.html`<div class="ume-page-items">
        ${c.items.length?c.items.map(i=>Ce(n,c,i,r.itemId===i.id)):g.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Te(n,c)}</div>
      </div>`:g.nothing}
    </div>`};g.render(g.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Ae(n)}>＋ 页面</button>
    </div>
    ${e.pages.map(s)}
  `,a)}function Ae(a){const n=prompt("页面名称:",`页面${a.getState().project.pages.length+1}`);n!==null&&a.getState().addPage(n||void 0)}function S(a,n,e,r=""){return g.html`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${n??""} placeholder=${r}
      @change=${s=>e(s.target.value)} />
  </div>`}function _(a,n,e,r=1){return g.html`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(n)} step=${String(r)}
      @change=${s=>{const c=parseFloat(s.target.value);e(Number.isFinite(c)?c:0)}} />
  </div>`}function L(a,n,e,r){return g.html`<div class="ume-field">
    <label>${a}</label>
    <select @change=${s=>r(s.target.value)}>
      ${e.map(s=>g.html`<option value=${s.value} ?selected=${s.value===n}>${s.label}</option>`)}
    </select>
  </div>`}function Le(a,n,e){return g.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${n}
      @change=${r=>e(r.target.checked)} />
    <span>${a}</span>
  </div>`}function oe(a,n,e,r=!1){return g.html`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${r?"font-family:Consolas,monospace":""}
      @change=${s=>e(s.target.value)}>${n??""}</textarea>
  </div>`}function Z(a,n,e="text/plain"){const r=new Blob([n],{type:`${e};charset=utf-8`}),s=document.createElement("a");s.href=URL.createObjectURL(r),s.download=a,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),5e3)}const De=[{value:"uint8",label:"uint8"},{value:"uint16",label:"uint16"},{value:"uint32",label:"uint32"},{value:"int8",label:"int8"},{value:"int16",label:"int16"},{value:"int32",label:"int32"},{value:"int",label:"int"}],Ue=[...De,{value:"float",label:"float"},{value:"double",label:"double"}];function je(a,n,e){const{project:r,selection:s}=n.getState(),c=r.pages.find(o=>o.id===s.pageId)??null,u=(c==null?void 0:c.items.find(o=>o.id===s.itemId))??null,t=(o,l)=>n.getState().updateItem(c.id,u.id,o,l);let i=g.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,p="属性";if(c&&!u)p="页面属性",i=g.html`
      ${S("名称",c.name,o=>n.getState().updatePage(c.id,{name:o}))}
      ${S("C 函数名",c.fnName,o=>n.getState().updatePage(c.id,{fnName:o}),"留空自动 page_N")}
      ${oe("用户代码",c.userCodePre,o=>n.getState().updatePage(c.id,{userCodePre:o}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(c&&u)switch(p=`${Q[u.kind]}`,u.kind){case"text":i=g.html`
          ${S("文本/格式",u.text,o=>t({text:o},`text-${u.id}`))}
          ${L("大小",String(u.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],o=>t({scale:Number(o)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{const o=u,l=o.varType==="float"||o.varType==="double";i=g.html`
          ${L("变量类型",o.varType,Ue,x=>t({varType:x}))}
          ${S("变量名",o.varName,x=>t({varName:x}))}
          ${S("显示文本",o.text,x=>t({text:x},`text-${u.id}`))}
          ${_("步长",o.step,x=>t({step:x}),"any")}
          ${_("最小值",o.min,x=>t({min:x}),"any")}
          ${_("最大值",o.max,x=>t({max:x}),"any")}
          ${_("初始值",o.initialValue,x=>t({initialValue:x}),"any")}
          ${l?_("小数位",o.decimals,x=>t({decimals:Math.max(0,Math.trunc(x))})):g.nothing}
          ${L("大小",String(o.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],x=>t({scale:Number(x)}))}
          <div class="ume-hint">int 建议 %d/%u，float 建议 %.Nf</div>
        `;break}case"switch":{const o=u;i=g.html`
          ${S("变量名",o.varName,l=>t({varName:l}))}
          ${S("显示文本",o.text,l=>t({text:l},`text-${u.id}`))}
          ${_("openValue",o.openValue,l=>t({openValue:Math.max(0,Math.trunc(l))}))}
          ${S('"开"文本',o.onText,l=>t({onText:l}))}
          ${S('"关"文本',o.offText,l=>t({offText:l}))}
          ${_("初始值",o.initialValue,l=>t({initialValue:Math.trunc(l)}))}
        `;break}case"button":{const o=u;i=g.html`
          ${S("显示文本",o.text,l=>t({text:l},`text-${u.id}`))}
          ${S("回调函数名",o.cbName,l=>t({cbName:l}))}
          ${_("ID",o.buttonId,l=>t({buttonId:Math.trunc(l)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{const o=u;i=g.html`
          ${S("显示文本",o.text,l=>t({text:l},`text-${u.id}`))}
          ${L("目标页面",o.targetPageId??"",[{value:"",label:"（未设置）"},...r.pages.filter(l=>l.id!==c.id).map(l=>({value:l.id,label:l.name}))],l=>t({targetPageId:l||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{i=g.html`
          ${S("显示文本",u.text,o=>t({text:o},`text-${u.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{const o=u;i=g.html`
          ${S("变量名 (int)",o.varName,l=>t({varName:l}))}
          ${_("步长",o.step,l=>t({step:Math.trunc(l)}))}
          ${_("最小值",o.min,l=>t({min:Math.trunc(l)}))}
          ${_("最大值",o.max,l=>t({max:Math.trunc(l)}))}
          ${_("初始值",o.initialValue,l=>t({initialValue:Math.trunc(l)}))}
          <div class="ume-hint">绑定 u8g2_MenuDrawItem${o.kind==="slider"?"Slider":"ProgressBar"}_bind</div>
        `;break}case"chart":{const o=u;i=g.html`
          ${L("类型",o.chartKind,[{value:"line",label:"折线图"},{value:"point",label:"散点图"},{value:"bar",label:"柱状图"}],l=>t({chartKind:l}))}
          ${_("数据点数",o.dataLen,l=>t({dataLen:Math.max(2,Math.trunc(l))}))}
          ${_("高度(px)",o.height,l=>t({height:Math.max(8,Math.trunc(l))}))}
          ${L("示例数据",o.sample,[{value:"sine",label:"正弦"},{value:"ramp",label:"斜坡"},{value:"noise",label:"伪随机"}],l=>t({sample:l}))}
          ${_("量程上限",o.max??0,l=>t({max:l||void 0}),"any")}
          ${_("量程下限",o.min??0,l=>t({min:l||void 0}),"any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;break}case"xbm":{const o=u;i=g.html`
          ${S("数组名",o.name,l=>t({name:l}))}
          ${_("宽(px)",o.w,l=>t({w:Math.min(128,Math.max(1,Math.trunc(l)))}))}
          ${_("高(px)",o.h,l=>t({h:Math.min(64,Math.max(1,Math.trunc(l)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(c.id,o.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${o.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const o=u;i=g.html`
          ${oe("文本内容",o.content,l=>t({content:l}))}
          ${_("高度(px)",o.height,l=>t({height:Math.max(10,Math.trunc(l))}))}
          ${_("行间距",o.lineSpacing,l=>t({lineSpacing:Math.max(0,Math.trunc(l))}))}
          ${Le("上下键滚动 (bind)",o.bindScroll,l=>t({bindScroll:l}))}
        `;break}case"board":{const o=u;i=g.html`
          ${_("宽(px)",o.w,l=>t({w:Math.max(1,Math.trunc(l))}))}
          ${_("高(px)",o.h,l=>t({h:Math.max(1,Math.trunc(l))}))}
          ${S("回调函数名",o.cbName,l=>t({cbName:l}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}g.render(g.html`
    <div class="ume-panel-title">属性 ${p!=="属性"?g.html`<span class="ume-kind-badge">${p}</span>`:g.nothing}</div>
    ${i}
  `,a)}function Ke(a,n){const{project:e}=n.getState(),r=(t,i)=>n.getState().update(p=>{Object.assign(p,t)},i),s=e.weakHooks??[],c=(t,i)=>{n.getState().update(p=>{const o=p.weakHooks??[];p.weakHooks=i?[...new Set([...o,t])]:o.filter(l=>l!==t)})},u=g.html`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${s.length}/${B.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${B.map(t=>g.html`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${t.fn}${t.retNote?"（返回 1 = 事件已处理 / 0 = 交给库）":""}`}>
              <input type="checkbox" ?checked=${s.includes(t.fn)}
                @change=${i=>c(t.fn,i.target.checked)} />
              <span>${t.label}</span>
            </div>
            <div class="ume-weak-desc">${t.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;g.render(g.html`
    <div class="ume-panel-title">工程</div>
    ${S("工程名",e.name,t=>r({name:t}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width!==128||e.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${L("字体",e.font,_e.map(t=>({value:t.id,label:t.label})),t=>r({font:t}))}
    ${L("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],t=>r({selector:t}))}
    ${_("左边距",e.selectorLeftMargin,t=>r({selectorLeftMargin:Math.max(0,Math.trunc(t))}))}
    ${_("顶边距",e.selectorTopMargin,t=>r({selectorTopMargin:Math.max(0,Math.trunc(t))}))}
    ${_("行间距",e.selectorLineSpacing,t=>r({selectorLineSpacing:Math.max(0,Math.trunc(t))}))}
    ${_("跑马灯速度",e.marqueeSpeed,t=>r({marqueeSpeed:t}),.05)}
    ${_("跑马灯停留",e.marqueeHeaderLen,t=>r({marqueeHeaderLen:t}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${u}
    ${g.nothing}
  `,a)}function Ve(a,n){const e=s=>{let c;const u=()=>{c&&(clearInterval(c),c=void 0)};return{down:t=>{t.preventDefault(),n.key(s),u(),c=window.setInterval(()=>n.key(s),180)},up:u}},r=(s,c,u)=>{const t=e(s);return g.html`<button class="ume-key" title=${u}
      @pointerdown=${t.down} @pointerup=${t.up} @pointerleave=${t.up}>${c}</button>`};g.render(g.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${s=>{const u={ArrowUp:M.Up,ArrowDown:M.Down,Enter:M.Enter,Escape:M.Return,Backspace:M.Return,"+":M.Add,"-":M.Sub,"=":M.Add,_:M.Sub}[s.key];u!==void 0&&(s.preventDefault(),n.key(u))}}>
      ${n.canvas}
    </div>
    <div class="ume-keybar">
      ${r(M.Up,"▲","上 MENU_Key_Up")}
      ${r(M.Down,"▼","下 MENU_Key_Down")}
      ${r(M.Enter,"OK","确认 MENU_Key_Enter")}
      ${r(M.Return,"⌫","返回 MENU_Key_Return")}
      ${r(M.Add,"＋","加 MENU_Key_Add")}
      ${r(M.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <span id="ume-live-page"></span>
      <span id="ume-live-value"></span>
    </div>
  `,a)}let F=null,V="c";function Re(a,n){F=n,a.querySelectorAll(":scope > .ume-modal-mask").forEach(e=>e.remove()),He(a)}function He(a){if(!F)return;const n=V==="c"?F.c:F.h,e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",s=>{s.target===e&&le(e)});const r=()=>{g.render(g.html`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>le(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${F.warnings.length?g.html`
            <div style="margin-bottom:8px">
              ${F.warnings.map(s=>g.html`<div class="ume-warn">⚠ ${s}</div>`)}
            </div>`:g.nothing}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${V==="c"?"primary":""}" @click=${()=>{V="c",r()}}>menu_pages.c</button>
            <button class="ume-btn sm ${V==="h"?"primary":""}" @click=${()=>{V="h",r()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${n}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(n).then(()=>qe(e,"已复制到剪贴板"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{Z(V==="c"?"menu_pages.c":"menu_pages.h",n)}}>下载 ${V==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,e)};r(),a.appendChild(e)}function le(a){a.remove()}function qe(a,n){const e=a.closest(".ume")??document.body;let r=e.querySelector(".ume-toast");r||(r=document.createElement("div"),r.className="ume-toast",e.appendChild(r)),r.textContent=n,r.classList.add("show"),setTimeout(()=>r.classList.remove("show"),1600)}function ze(a,n,e,r){const c=n.getState().project.pages.find(f=>f.id===e),u=c==null?void 0:c.items.find(f=>f.id===r);if(!u||u.kind!=="xbm")return;const t=u;let i=t.w,p=t.h,o=[...t.bits];const l=()=>Math.ceil(i/8),x=document.createElement("div");x.className="ume-modal-mask",x.addEventListener("click",f=>{f.target===x&&K()});const E=(f,w)=>{const k=w*l()+(f>>3);return k<o.length?!!(o[k]>>(f&7)&1):!1},D=(f,w,k)=>{const d=w*l()+(f>>3);o[d]=k?o[d]|1<<(f&7):o[d]&~(1<<(f&7))},N=(f,w)=>{const k=Math.ceil(i/8),d=Math.ceil(f/8),v=new Array(d*w).fill(0);for(let m=0;m<Math.min(p,w);m++)for(let $=0;$<Math.min(i,f);$++){const b=m*k+($>>3);b<o.length&&o[b]>>($&7)&1&&(v[m*d+($>>3)]|=1<<($&7))}i=f,p=w,o=v};let U=!1,X=!0;const j=(f,w)=>k=>{k.preventDefault(),U=!0,X=!E(f,w),D(f,w,X),C()},Y=(f,w)=>()=>{U&&(D(f,w,X),C())},H=()=>{U=!1},C=()=>{g.render(h(),x)},ee=()=>{const f=[];for(let w=0;w<p;w++)for(let k=0;k<i;k++)f.push(g.html`<button class="ume-xbm-cell ${E(k,w)?"on":""}"
          data-x=${k} data-y=${w}
          @pointerdown=${j(k,w)}
          @pointerenter=${Y(k,w)}></button>`);return f},h=()=>g.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${i}×${p}</span></span>
        <button class="ume-mini" @click=${K}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${H}
        @pointerleave=${H}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(i)} min="1" max="128"
            @change=${f=>{N(ce(+f.target.value,1,128),p),C()}} />
          <input type="number" style="width:64px" .value=${String(p)} min="1" max="64"
            @change=${f=>{N(i,ce(+f.target.value,1,64)),C()}} />
          <button class="ume-btn sm" @click=${()=>{o=o.map(()=>0),C()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{o=o.map(f=>~f&255),C()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${i}, 14px)">${ee()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${t.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${K}>取消</button>
        <button class="ume-btn primary" @click=${()=>{n.getState().updateItem(e,r,{w:i,h:p,bits:[...o]}),K()}}>应用</button>
      </div>
    </div>
  `;function K(){x.remove(),document.removeEventListener("pointerup",H)}document.addEventListener("pointerup",H),C(),a.appendChild(x)}function ce(a,n,e){return Number.isFinite(a)?Math.min(e,Math.max(n,Math.trunc(a))):n}const Oe="prebuilt/u8g2-menu-preview.js";class Fe{constructor(n,e={}){var o;if(this.store=me(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.container=n,this.opts={persistKey:"default",...e},n.classList.add("ume"),!document.getElementById("ume-style")){const l=document.createElement("style");l.id="ume-style",l.textContent=pe,document.head.appendChild(l)}const r=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,s=this.opts.data??r??void 0;if(s!==void 0)try{this.store.setState({project:ae(s)})}catch(l){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",l)}const c=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,u=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;c&&u&&(this.lastExport={c,h:u}),n.innerHTML=`
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
    `;const t=l=>n.querySelector(l);this.els={left:t(".ume-left"),center:t(".ume-center"),right:t(".ume-right"),styleEl:t('[data-role="style"]'),propEl:t('[data-role="prop"]'),toolbarUndo:t('[data-act="undo"]'),toolbarRedo:t('[data-act="redo"]')};const i=document.createElement("div");i.style.display="flex",i.style.flexDirection="column",i.style.alignItems="center",i.style.gap="10px",this.els.center.appendChild(i),this.preview=new Ie(i,{onPageChanged:l=>this.onPreviewPageChanged(l)});const p=document.createElement("div");this.els.center.appendChild(p),Ve(p,this.preview),this.preview.load(this.opts.wasmUrl??Oe).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(l=>{console.error(l);const x=document.createElement("div");x.className="ume-warn",x.textContent=`预览引擎加载失败: ${l.message}。编辑功能不受影响。`,this.els.center.prepend(x)}),n.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const l=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);l!==null&&this.store.getState().addPage(l||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),n.querySelector('[data-act="export-json"]').addEventListener("click",()=>{Z(`${this.store.getState().project.name||"menu-project"}.json`,ie(this.store.getState().project),"application/json")}),n.querySelector('[data-act="import"]').addEventListener("click",()=>{t('[data-role="file"]').click()}),t('[data-role="file"]').addEventListener("change",l=>{var E;const x=(E=l.target.files)==null?void 0:E[0];x&&(x.text().then(D=>{try{const N=ae(D);this.store.getState().update(U=>{Object.assign(U,N)}),this.scheduleRender()}catch(N){alert(`导入失败: ${N.message}`)}}),l.target.value="")}),n.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(((o=this.store.getState().project.pages[0])==null?void 0:o.id)??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(n){var r;const e=ae(n);this.store.getState().update(s=>{Object.assign(s,e)}),this.store.getState().select(((r=e.pages[0])==null?void 0:r.id)??null,null)}generate(){var r,s;const n=this.lastExport,e=ue(this.store.getState().project,n??void 0);return this.lastExport={c:e.c,h:e.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,e.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,e.h)),Re(this.container,e),(s=(r=this.opts).onExport)==null||s.call(r,e),e}downloadC(){const n=ue(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:n.c,h:n.h},Z("menu_pages.c",n.c),Z("menu_pages.h",n.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(n){const e=n.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="z"?(n.preventDefault(),n.shiftKey?this.store.getState().redo():this.store.getState().undo()):(n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="y"&&(n.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(n){const e=this.store.getState().project.pages[n];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,ie(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const n=this.store.getState();Pe(this.els.left,this.store),Ke(this.els.styleEl,this.store),je(this.els.propEl,this.store,{openXbmEditor:(e,r)=>ze(this.container,this.store,e,r)}),this.els.toolbarUndo.disabled=n.past.length===0,this.els.toolbarRedo.disabled=n.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var c;const n=document.getElementById("ume-live-page"),e=document.getElementById("ume-live-value"),r=this.store.getState(),s=this.store.getState().project.pages.findIndex(u=>u.id===r.selection.pageId);if(n&&s>=0){const u=this.preview.currentPage;n.textContent=`预览页: ${((c=this.store.getState().project.pages[u])==null?void 0:c.name)??"?"}`}if(e&&s>=0&&r.selection.itemId){const u=r.project.pages[s],t=u.items.findIndex(p=>p.id===r.selection.itemId),i=u.items[t];if(i&&"varName"in i){const p=i.kind==="switch"?this.preview.getSwitch(s,t):this.preview.getInt(s,t);e.textContent=`${i.varName} = ${p}`}else e.textContent=""}}}exports.MenuEditor=Fe;exports.MenuKey=M;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
