"use strict";var U8G2MenuEditor=(()=>{var xe=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var ct=Object.getOwnPropertyNames;var dt=Object.prototype.hasOwnProperty;var pt=(i,e)=>{for(var t in e)xe(i,t,{get:e[t],enumerable:!0})},gt=(i,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of ct(e))!dt.call(i,a)&&a!==t&&xe(i,a,{get:()=>e[a],enumerable:!(r=lt(e,a))||r.enumerable});return i};var bt=i=>gt(xe({},"__esModule",{value:!0}),i);var Vt={};pt(Vt,{MenuEditor:()=>Ke,MenuKey:()=>he});var je=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-weak-desc { font-size: 11px; color: var(--ume-dim); margin: 2px 0 0 22px; line-height: 1.45; }`;var Re=i=>{let e,t=new Set,r=(p,o)=>{let l=typeof p=="function"?p(e):p;if(!Object.is(l,e)){let x=e;e=o??(typeof l!="object"||l===null)?l:Object.assign({},e,l),t.forEach(I=>I(e,x))}},a=()=>e,n={setState:r,getState:a,getInitialState:()=>s,subscribe:p=>(t.add(p),()=>t.delete(p))},s=e=i(r,a,n);return n},Ve=i=>i?Re(i):Re;var _e=0;function X(i){return _e=(_e+1)%1e9,`${i}_${Date.now().toString(36)}_${_e.toString(36)}`}function C(i){let e={id:X("it"),label:""};switch(i){case"text":return{...e,kind:i,text:"\u83DC\u5355\u9879",scale:1};case"number":return{...e,kind:i,text:"v:%d",scale:1,varType:"int32",varName:"var_value",step:1,min:0,max:100,decimals:1,initialValue:50};case"switch":return{...e,kind:i,text:"s:%s",scale:1,varName:"var_switch",openValue:1,onText:"on",offText:"off",initialValue:0};case"button":return{...e,kind:i,text:"\u6267\u884C\u64CD\u4F5C",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...e,kind:i,text:"\u4E0B\u4E00\u7EA7",scale:1,targetPageId:null};case"back":return{...e,kind:i,text:"\u8FD4\u56DE",scale:1};case"slider":return{...e,kind:i,varName:"var_slider",step:2,min:0,max:100,initialValue:50};case"progress":return{...e,kind:i,varName:"var_prog",step:2,min:0,max:100,initialValue:70};case"chart":return{...e,kind:i,chartKind:"line",dataLen:24,height:32,sample:"sine"};case"xbm":return ht(16,16);case"textarea":return{...e,kind:i,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:i,w:64,h:32,cbName:"board_cb"}}}function ht(i,e){let t=Math.ceil(i/8);return{id:X("it"),kind:"xbm",label:"",name:"icon",w:i,h:e,bits:new Array(t*e).fill(0)}}function Ue(i){return{id:X("pg"),name:i,fnName:"",items:[],userCodePre:""}}function ae(i,e){return{...i,...e}}function De(){let i=Ue("\u4E3B\u9875");i.items=[ae(C("text"),{text:"u8g2_menu"}),ae(C("submenu"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E"}),ae(C("button"),{text:"\u5173\u4E8E",cbName:"btn_about_cb"})];let e=Ue("\u8BBE\u7F6E");e.items=[ae(C("number"),{text:"\u97F3\u91CF:%d"}),ae(C("switch"),{text:"\u5F00\u5173:%s"}),C("slider"),C("back")];let t={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],pages:[i,e]};return i.items[1].targetPageId=e.id,t}function Be(i){return structuredClone(i)}var ft=800;function $e(){let i=null,e=0;return Ve()((t,r)=>({project:De(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(a,m)=>{let u=Date.now(),n=!!m&&m===i&&u-e<ft;i=m??null,e=u,t(s=>{let p=Be(s.project);return a(p),{project:p,dirty:!0,past:n?s.past:[...s.past.slice(-99),s.project],future:[]}})},undo:()=>{t(a=>a.past.length?{project:a.past[a.past.length-1],past:a.past.slice(0,-1),future:[a.project,...a.future.slice(0,99)],dirty:!0}:a)},redo:()=>{t(a=>{if(!a.future.length)return a;let[m,...u]=a.future;return{project:m,past:[...a.past,a.project],future:u,dirty:!0}})},select:(a,m=null)=>t({selection:{pageId:a,itemId:m}}),addPage:a=>{let m={id:X("pg"),name:a??`\u9875\u9762${r().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return r().update(u=>{u.pages.push(m)}),t({selection:{pageId:m.id,itemId:null}}),m},removePage:a=>{r().update(u=>{u.pages=u.pages.filter(n=>n.id!==a);for(let n of u.pages)for(let s of n.items)s.kind==="submenu"&&s.targetPageId===a&&(s.targetPageId=null)});let{selection:m}=r();m.pageId===a&&t({selection:{pageId:null,itemId:null}})},movePage:(a,m)=>{r().update(u=>{let n=u.pages.findIndex(p=>p.id===a),s=n+m;n<0||s<0||s>=u.pages.length||([u.pages[n],u.pages[s]]=[u.pages[s],u.pages[n]])})},updatePage:(a,m)=>{r().update(u=>{let n=u.pages.find(s=>s.id===a);n&&Object.assign(n,m)})},addItem:(a,m)=>{let u=m??r().selection.pageId??r().project.pages[0]?.id;if(!u)return null;let n=vt(a);return r().update(s=>{s.pages.find(o=>o.id===u)?.items.push(n)}),t({selection:{pageId:u,itemId:n.id}}),n},removeItem:(a,m)=>{r().update(n=>{let s=n.pages.find(p=>p.id===a);s&&(s.items=s.items.filter(p=>p.id!==m))});let{selection:u}=r();u.itemId===m&&t({selection:{pageId:a,itemId:null}})},moveItem:(a,m,u)=>{r().update(n=>{let s=n.pages.find(l=>l.id===a);if(!s)return;let p=s.items.findIndex(l=>l.id===m),o=p+u;p<0||o<0||o>=s.items.length||([s.items[p],s.items[o]]=[s.items[o],s.items[p]])})},duplicateItem:(a,m)=>{let u=null;r().update(n=>{let s=n.pages.find(o=>o.id===a);if(!s)return;let p=s.items.findIndex(o=>o.id===m);p<0||(u=structuredClone(s.items[p]),u.id=X("it"),s.items.splice(p+1,0,u))}),u&&t({selection:{pageId:a,itemId:u.id}})},updateItem:(a,m,u,n)=>{r().update(s=>{let o=s.pages.find(l=>l.id===a)?.items.find(l=>l.id===m);o&&Object.assign(o,u)},n)}}))}var zt=$e();function vt(i){return C(i)}var L=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],W={text:"\u6587\u672C",number:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE\u4E0A\u7EA7",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},Oe={text:"T",number:"#",switch:"\u25C9",button:"\u23CE",submenu:"\u2192",back:"\u2190",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},ye=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var H=class extends Error{};function we(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function K(i,e){return typeof i=="string"?i:e}function j(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}var xt=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function _t(i){if(!we(i))throw new H("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=i.kind;if(typeof e!="string"||!xt.includes(e))throw new H(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(i);switch(t.id=K(i.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=K(i.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=K(i.text,""),t.scale=i.scale===2?2:1;break}return t}function $t(i){if(!we(i))throw new H("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(i.items)?i.items.map(_t):[];return{id:K(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:K(i.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:K(i.fnName,""),items:e,userCodePre:K(i.userCodePre,"")}}function ge(i){let e;if(typeof i=="string")try{e=JSON.parse(i)}catch{throw new H("JSON \u89E3\u6790\u5931\u8D25")}else e=i;if(!we(e))throw new H("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,r=j(t.version,0);if(r>1)throw new H(`\u5DE5\u7A0B\u7248\u672C v${r} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);r<1&&void 0;let a=Array.isArray(t.pages)?t.pages.map($t):[];if(!a.length)throw new H("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let m=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",u=new Set(L.map(s=>s.fn)),n=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(s=>typeof s=="string"&&u.has(s)))]:[];return{version:1,name:K(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:j(t.width,128),height:j(t.height,64),font:K(t.font,"u8g2_font_wqy12_t_gb2312"),selector:m,selectorLeftMargin:j(t.selectorLeftMargin,16),selectorTopMargin:j(t.selectorTopMargin,0),selectorLineSpacing:j(t.selectorLineSpacing,0),marqueeSpeed:j(t.marqueeSpeed,.2),marqueeHeaderLen:j(t.marqueeHeaderLen,5),weakHooks:n,pages:a}}function Ie(i){return JSON.stringify(i,null,2)}var yt={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function G(i,e="anon"){let t=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function ie(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function Y(i){if(!Number.isFinite(i))return"0.0f";let e=i.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function wt(i){let e=new Map;if(!i)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,r;for(;(r=t.exec(i))!==null;)e.set(r[1],r[2]);return e}function T(i,e,t){let r=e.has(i)?e.get(i):"";return`${t}/* USER CODE BEGIN ${i} */${r}${t}/* USER CODE END ${i} */`}function ke(i,e){let t=[],r=wt(e?.c??""),a=i.pages.map((d,f)=>d.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(d.fnName)?d.fnName:`page_${f}`),m=new Map,u=(d,f,c,y,g)=>{let k=m.get(d);if(k){k.type!==f&&t.push(`\u53D8\u91CF "${d}" \u88AB\u591A\u4E2A\u4E0D\u540C\u7C7B\u578B\u7684\u6761\u76EE\u5F15\u7528\uFF08${k.type} / ${f}\uFF09\uFF0C\u4EE5\u9996\u4E2A\u5B9A\u4E49\u4E3A\u51C6`);return}m.set(d,{name:d,type:f,init:c,isFloat:y,owner:g})},n=new Map,s=new Set,p=[],o=[],l=[],x=[],I=[],A=new Set,te=new Map,ne=0,re=0;for(let d of i.pages)for(let f of d.items)switch(f.kind){case"number":{let c=f;if(!c.varName){t.push(`\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\u6761\u76EE\uFF08\u9875\u9762 ${d.name}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`);break}let y=c.varType==="float"||c.varType==="double"?Y(c.initialValue):String(Math.trunc(c.initialValue));u(c.varName,yt[c.varType],y,c.varType==="float"||c.varType==="double",f),/%[-+ #0]*[a-zA-Z]/.test(c.text)||t.push(`\u6570\u503C\u6761\u76EE "${d.name}/${c.varName}" \u7684\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);break}case"switch":{let c=f;if(!c.varName){t.push(`\u5B58\u5728\u672A\u547D\u540D\u5F00\u5173\u6761\u76EE\uFF08\u9875\u9762 ${d.name}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`);break}u(c.varName,"uint8_t",String(Math.trunc(c.initialValue)),!1,f),/%[-+ #0]*s/.test(c.text)||t.push(`\u5F00\u5173\u6761\u76EE "${c.varName}" \u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off`);break}case"slider":case"progress":{let c=f;if(!c.varName){t.push(`\u5B58\u5728\u672A\u547D\u540D${f.kind==="slider"?"\u6ED1\u5757":"\u8FDB\u5EA6"}\u6761\u76EE\uFF08\u9875\u9762 ${d.name}\uFF09`);break}u(c.varName,"int",String(Math.trunc(c.initialValue)),!1,f);break}case"button":{let c=G(f.cbName,"btn_cb");n.has(c)||n.set(c,f.buttonId);break}case"board":s.add(G(f.cbName,"board_cb"));break;case"chart":{let c=ne++;p.push(`#define CHART${c}_LEN ${Math.max(2,Math.trunc(f.dataLen))}`,`static float chart${c}_data[CHART${c}_LEN];`,`static float chart${c}_dis[CHART${c}_LEN];`,`static u8g2_chart_t chart${c};`,`static uint8_t chart${c}_inited = 0;`);let y=f.sample==="sine"?`chart${c}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);`:f.sample==="ramp"?`chart${c}_data[i] = (float)i;`:`chart${c}_data[i] = (float)((i * 37) % CHART${c}_LEN);`,g=`chart${c}_fill`,k=(r.get(g)??"").trim()!=="";o.push([`    if (!chart${c}_inited) {`,`        chart${c}_inited = 1;`,`        u8g2_chart_init(&chart${c}, chart${c}_data, chart${c}_dis, CHART${c}_LEN);`,T(g,r,"        "),...k?[]:[`        for (uint16_t i = 0; i < CHART${c}_LEN; ++i) { ${y} }`],"    }"].join(`
`));break}case"xbm":{let c=G(f.name,"icon");for(;A.has(c);)c=`${c}_2`;A.add(c),te.set(f.id,c);let y=f.bits.length,g=f.bits.map(k=>`0x${(k&255).toString(16).padStart(2,"0")}`).join(", ");l.push(`static const uint8_t menu_xbm_${c}[${y}] = { ${g} };`);break}case"textarea":{let c=re++;x.push(`static char ta${c}_text[] = "${ie(f.content)}";`,`static u8g2_menu_textArea_t ta${c};`,`static uint8_t ta${c}_inited = 0;`),I.push(`    if (!ta${c}_inited) {`,`        ta${c}_inited = 1;`,`        u8g2_textArea_init(&ta${c}, ta${c}_text);`,`        u8g2_textArea_setLineSpacing(&ta${c}, ${Math.max(0,Math.trunc(f.lineSpacing))});`,"    }");break}default:break}let V=(d,f)=>{if(!d)return"";let c=`"${ie(d)}"`;return f===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${c});`:`u8g2_MenuUTF8Printf(${c});`},de=(d,f,c)=>{let y=`"${ie(d)}"`;return f===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${y}, ${c});`:`u8g2_MenuUTF8Printf(${y}, ${c});`},q=0,P=0,ve=(d,f)=>{let c=[],y=`${f.name}`;switch(d.kind){case"text":{let g=V(d.text,d.scale);g&&c.push(`    ${g}`);break}case"number":{let g=d;if(!m.has(g.varName))break;let k=g.varType==="float"||g.varType==="double"?`u8g2_MenuItemValue_${g.varType}(&${g.varName}, ${Y(g.step)}, ${Y(g.min)}, ${Y(g.max)});`:`u8g2_MenuItemValue_${g.varType}(&${g.varName}, ${Math.trunc(g.step)}, ${Math.trunc(g.min)}, ${Math.trunc(g.max)});`;c.push(`    ${k}`),c.push(`    ${de(g.text,g.scale,g.varName)}`);break}case"switch":{let g=d;if(!m.has(g.varName))break;c.push(`    u8g2_MenuItemValue_switch(&${g.varName}, ${Math.trunc(g.openValue)});`),c.push(`    ${de(g.text,g.scale,`${g.varName} ? "${ie(g.onText)}" : "${ie(g.offText)}"`)}`);break}case"button":{let g=G(d.cbName,"btn_cb");c.push(`    u8g2_MenuItem_button(${g}, ${Math.trunc(d.buttonId)});`);let k=V(d.text,d.scale);k&&c.push(`    ${k}`);break}case"submenu":{if(!d.targetPageId){t.push(`\u9875\u9762 ${y} \u7684\u5B50\u9875\u9762\u6761\u76EE "${d.text||d.label||d.id}" \u672A\u6307\u5B9A\u76EE\u6807\u9875\u9762\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let z=V(d.text,d.scale);z&&c.push(`    ${z}`);break}let g=i.pages.findIndex(z=>z.id===d.targetPageId);if(g<0){t.push(`\u9875\u9762 ${y} \u7684\u5B50\u9875\u9762\u6761\u76EE\u76EE\u6807\u65E0\u6548`);break}c.push(`    u8g2_MenuItem_menu_enter(${a[g]});`);let k=V(d.text,d.scale);k&&c.push(`    ${k}`);break}case"back":{c.push("    u8g2_MenuItem_menu_back();");let g=V(d.text,d.scale);g&&c.push(`    ${g}`);break}case"slider":{let g=d;if(!m.has(g.varName))break;c.push(`    u8g2_MenuDrawItemSlider_bind(&${g.varName}, ${Math.trunc(g.step)}, ${Math.trunc(g.min)}, ${Math.trunc(g.max)});`);break}case"progress":{let g=d;if(!m.has(g.varName))break;c.push(`    u8g2_MenuDrawItemProgressBar_bind(&${g.varName}, ${Math.trunc(g.step)}, ${Math.trunc(g.min)}, ${Math.trunc(g.max)});`);break}case"chart":{let g=q++;c.push(...o[g].split(`
`));let k=d.chartKind==="point"?"Point":d.chartKind==="bar"?"Bar":"Line",z=d.min!==void 0&&d.max!==void 0?`${Y(d.max)}, ${Y(d.min)}`:"0, 0";c.push(`    u8g2_MenuDrawItem${k}Chart(&chart${g}, ${Math.max(4,Math.trunc(d.height))}, ${z});`);break}case"xbm":c.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(d.w)}, ${Math.trunc(d.h)}, menu_xbm_${te.get(d.id)??G(d.name,"icon")});`);break;case"textarea":{let g=P++;c.push(...I[g].split(`
`));let k=d.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";c.push(`    ${k}(&ta${g}, ${Math.max(10,Math.trunc(d.height))});`);break}case"board":{let g=G(d.cbName,"board_cb");c.push(`    u8g2_MenuDrawItemBoard(${g}, ${Math.max(1,Math.trunc(d.w))}, ${Math.max(1,Math.trunc(d.h))});`);break}}return c},b=[];b.push("/**"),b.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${i.name}`),b.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),b.push(" */"),b.push('#include "menu_pages.h"'),b.push('#include "u8g2_menu.h"'),p.length&&b.push("#include <math.h>"),b.push(""),b.push(T("includes",r,"")),b.push(""),b.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),b.push(T("variables",r,""));for(let d of m.values())b.push(`${d.type} ${d.name} = ${d.init};`);if(b.push(""),(p.length||x.length||l.length)&&(b.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),b.push(...p,...x,...l),b.push("")),n.size||s.size){b.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),b.push(T("callbacks",r,""));for(let[d]of n)b.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID)`),b.push("{"),b.push(T(`cb_${d}`,r,"    ")),b.push("}"),b.push("");for(let d of s)b.push(`void ${d}(u8g2_t *u8g2)`),b.push("{"),b.push(T(`cb_${d}`,r,"    ")),b.push("}"),b.push("")}let U=(i.weakHooks??[]).map(d=>L.find(f=>f.fn===d)).filter(d=>!!d);if(U.length||r.has("weak")||L.some(d=>(r.get(`weak_${d.fn}`)??"").trim())){b.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),b.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),b.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let f=L.filter(c=>!i.weakHooks?.includes(c.fn)&&(r.get(`weak_${c.fn}`)??"").trim()).map(c=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${c.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${c.decl}`,"{",T(`weak_${c.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);b.push(f?`${T("weak",r,"").replace(/\n$/,"")}
${f}
`:T("weak",r,"")),b.push("");for(let c of U){b.push(`/* ${c.label}: ${c.desc} */`),b.push(`${c.decl}`),b.push("{"),b.push(T(`weak_${c.fn}`,r,"    "));let y=c.bodyArgs.split(`
`).map(g=>`    ${g}`);c.retNote&&y.push(`    ${c.retNote}`),b.push(...y),b.push("}"),b.push("")}}b.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),b.push(""),i.pages.forEach((d,f)=>{b.push(`/* \u9875\u9762: ${d.name} */`),b.push(`void ${a[f]}(void)`),b.push("{"),b.push(T(`page_${a[f]}_pre`,r,"    "));for(let c of d.items)b.push(...ve(c,d));b.push("}"),b.push("")});let h=[];if(h.push("#ifndef MENU_PAGES_H"),h.push("#define MENU_PAGES_H"),h.push(""),h.push('#include "u8g2_menu.h"'),h.push(""),h.push("/* \u9875\u9762\u5165\u53E3\u3002\u9996\u4E2A\u9875\u9762\u4F5C\u4E3A u8g2_CreateMenu \u7684\u521D\u59CB\u9875\u9762\u3002 */"),a.forEach((d,f)=>h.push(`void ${d}(void);   /* ${i.pages[f].name} */`)),h.push(""),m.size){h.push("/* \u53EF\u7F16\u8F91\u53D8\u91CF\uFF08\u5728\u6761\u76EE\u7ED1\u5B9A\u4E2D\u4F7F\u7528\uFF09 */");for(let d of m.values())h.push(`extern ${d.type} ${d.name};`);h.push("")}if(n.size||s.size){h.push("/* \u7528\u6237\u56DE\u8C03 */");for(let[d]of n)h.push(`void ${d}(u8g2_menu_t *menu, uint8_t ID);`);for(let d of s)h.push(`void ${d}(u8g2_t *u8g2);`);h.push("")}h.push("#endif /* MENU_PAGES_H */");let w=b.join(`
`).replace(/\n{3,}/g,`


`),E=h.join(`
`);return{c:`${w}
`,h:`${E}
`,warnings:t}}var he=(n=>(n[n.None=0]="None",n[n.Up=1]="Up",n[n.Down=2]="Down",n[n.Enter=3]="Enter",n[n.Return=4]="Return",n[n.Add=5]="Add",n[n.Sub=6]="Sub",n))(he||{});var It=128*64/8;function kt(i){return new Promise((e,t)=>{let r=document.createElement("script");r.src=i,r.onload=()=>e(),r.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${i}`)),document.head.appendChild(r)})}var be=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.lastKnownPage=0;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await kt(e);let r=t.U8G2MenuPreview;if(!r)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await r({locateFile:m=>e.replace(/[^/\\]*$/,"")+m}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let a=this.mod._em_font_count_export();for(let m=0;m<a;m++){let u=this.mod._em_font_name(m);this.fontIndexCache.set(this.mod.UTF8ToString(u),m)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify(e.pages.map(t=>({n:t.items.length,k:t.items.map(r=>r.kind).join(","),res:t.items.map(r=>r.kind==="chart"?`${r.dataLen}|${r.sample}`:r.kind==="xbm"?`${r.w}x${r.h}`:r.kind==="textarea"?Math.ceil(r.content.length/64):"").join(",")})))}sync(e){let t=this.mod;if(!t)return;let r=this.signature(e);r!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=r);let a=m=>Math.trunc(Number.isFinite(m)?m:0);e.pages.forEach((m,u)=>{t.ccall("em_page_begin",null,["number"],[u]),m.items.forEach((n,s)=>{let p=["number","number"];switch(n.kind){case"text":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,0,0,n.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[u,s,n.text]);break;case"number":{let o={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[n.varType],l=n.varType==="float"||n.varType==="double"?Math.round(n.initialValue):a(n.initialValue);t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,1,o,n.scale,0,0,0,0,0,l,a(n.step),a(n.min),a(n.max),-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[u,s,n.text]);break}case"switch":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,2,0,n.scale,0,0,a(n.openValue),0,0,a(n.initialValue),0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[u,s,n.text]),t.ccall("em_item_swtext",null,["number","number","string","string"],[u,s,n.onText,n.offText]);break;case"button":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,3,0,n.scale,0,0,0,a(n.buttonId),0,0,0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[u,s,n.text]);break;case"submenu":{let o=e.pages.findIndex(l=>l.id===n.targetPageId);t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,4,0,n.scale,0,0,0,0,0,0,0,0,0,o,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[u,s,n.text]);break}case"back":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,5,0,n.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[u,s,n.text]);break;case"slider":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,6,0,1,0,0,0,0,0,a(n.initialValue),a(n.step),a(n.min),a(n.max),-1,0,0,0,0,0]);break;case"progress":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,7,0,1,0,0,0,0,0,a(n.initialValue),a(n.step),a(n.min),a(n.max),-1,0,0,0,0,0]);break;case"chart":{let o={sine:0,ramp:1,noise:2}[n.sample],l=n.min!==void 0&&n.max!==void 0?1:0;t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,8,0,1,{line:0,point:1,bar:2}[n.chartKind],0,0,0,l,o,0,l?a(n.min):0,l?a(n.max):0,-1,0,0,a(n.height),a(n.dataLen),0]);break}case"xbm":{t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,9,0,1,0,0,0,0,0,0,0,0,0,-1,a(n.w),a(n.h),0,0,0]);let o=t._em_scratch(n.bits.length);o&&(t.HEAPU8.set(new Uint8Array(n.bits),o),t._em_item_bits(u,s,o,n.bits.length));break}case"textarea":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,10,0,1,0,n.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,a(n.height),0,a(n.lineSpacing)]),t.ccall("em_item_text",null,["number","number","string"],[u,s,n.content]);break;case"board":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,s,11,0,1,0,0,0,0,0,0,0,0,0,-1,a(n.w),a(n.h),0,0,0]);break}}),t.ccall("em_page_end",null,["number","number"],[u,m.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],a(e.selectorLeftMargin),a(e.selectorTopMargin),a(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let r=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(r),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let r=t._em_frame(e);if(!r)return;this.img||(this.img=this.ctx.createImageData(128,64));let a=t.HEAPU8.subarray(r,r+It),m=this.img.data;m.fill(255);for(let n=0;n<64;n++){let s=(n>>3)*128,p=1<<(n&7),o=n*128*4;for(let l=0;l<128;l++)a[s+l]&p&&(m[o]=17,m[o+1]=24,m[o+2]=39),o+=4}this.ctx.putImageData(this.img,0,0);let u=t._em_get_current_page();u!==this.lastKnownPage&&(this.lastKnownPage=u,this.events.onPageChanged?.(u))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}getInt(e,t){return this.mod?._em_get_ipool(e*64+t)??0}getSwitch(e,t){return this.mod?._em_get_upool(e*64+t)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Pe=globalThis,Fe=i=>i,fe=Pe.trustedTypes,qe=fe?fe.createPolicy("lit-html",{createHTML:i=>i}):void 0,Je="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,Ze="?"+R,St=`<${Ze}>`,O=document,oe=()=>O.createComment(""),ue=i=>i===null||typeof i!="object"&&typeof i!="function",Ce=Array.isArray,Et=i=>Ce(i)||typeof i?.[Symbol.iterator]=="function",Se=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ze=/-->/g,Xe=/>/g,D=RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),We=/'/g,Ge=/"/g,Qe=/^(?:script|style|textarea|title)$/i,Le=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),v=Le(1),tn=Le(2),nn=Le(3),me=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Ye=new WeakMap,B=O.createTreeWalker(O,129);function et(i,e){if(!Ce(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return qe!==void 0?qe.createHTML(e):e}var At=(i,e)=>{let t=i.length-1,r=[],a,m=e===2?"<svg>":e===3?"<math>":"",u=se;for(let n=0;n<t;n++){let s=i[n],p,o,l=-1,x=0;for(;x<s.length&&(u.lastIndex=x,o=u.exec(s),o!==null);)x=u.lastIndex,u===se?o[1]==="!--"?u=ze:o[1]!==void 0?u=Xe:o[2]!==void 0?(Qe.test(o[2])&&(a=RegExp("</"+o[2],"g")),u=D):o[3]!==void 0&&(u=D):u===D?o[0]===">"?(u=a??se,l=-1):o[1]===void 0?l=-2:(l=u.lastIndex-o[2].length,p=o[1],u=o[3]===void 0?D:o[3]==='"'?Ge:We):u===Ge||u===We?u=D:u===ze||u===Xe?u=se:(u=D,a=void 0);let I=u===D&&i[n+1].startsWith("/>")?" ":"";m+=u===se?s+St:l>=0?(r.push(p),s.slice(0,l)+Je+s.slice(l)+R+I):s+R+(l===-2?n:I)}return[et(i,m+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},le=class i{constructor({strings:e,_$litType$:t},r){let a;this.parts=[];let m=0,u=0,n=e.length-1,s=this.parts,[p,o]=At(e,t);if(this.el=i.createElement(p,r),B.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(a=B.nextNode())!==null&&s.length<n;){if(a.nodeType===1){if(a.hasAttributes())for(let l of a.getAttributeNames())if(l.endsWith(Je)){let x=o[u++],I=a.getAttribute(l).split(R),A=/([.?@])?(.*)/.exec(x);s.push({type:1,index:m,name:A[2],strings:I,ctor:A[1]==="."?Ae:A[1]==="?"?Me:A[1]==="@"?Te:Z}),a.removeAttribute(l)}else l.startsWith(R)&&(s.push({type:6,index:m}),a.removeAttribute(l));if(Qe.test(a.tagName)){let l=a.textContent.split(R),x=l.length-1;if(x>0){a.textContent=fe?fe.emptyScript:"";for(let I=0;I<x;I++)a.append(l[I],oe()),B.nextNode(),s.push({type:2,index:++m});a.append(l[x],oe())}}}else if(a.nodeType===8)if(a.data===Ze)s.push({type:2,index:m});else{let l=-1;for(;(l=a.data.indexOf(R,l+1))!==-1;)s.push({type:7,index:m}),l+=R.length-1}m++}}static createElement(e,t){let r=O.createElement("template");return r.innerHTML=e,r}};function J(i,e,t=i,r){if(e===me)return e;let a=r!==void 0?t._$Co?.[r]:t._$Cl,m=ue(e)?void 0:e._$litDirective$;return a?.constructor!==m&&(a?._$AO?.(!1),m===void 0?a=void 0:(a=new m(i),a._$AT(i,t,r)),r!==void 0?(t._$Co??=[])[r]=a:t._$Cl=a),a!==void 0&&(e=J(i,a._$AS(i,e.values),a,r)),e}var Ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,a=(e?.creationScope??O).importNode(t,!0);B.currentNode=a;let m=B.nextNode(),u=0,n=0,s=r[0];for(;s!==void 0;){if(u===s.index){let p;s.type===2?p=new ce(m,m.nextSibling,this,e):s.type===1?p=new s.ctor(m,s.name,s.strings,this,e):s.type===6&&(p=new Ne(m,this,e)),this._$AV.push(p),s=r[++n]}u!==s?.index&&(m=B.nextNode(),u++)}return B.currentNode=O,a}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},ce=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,a){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),ue(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==me&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Et(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$&&ue(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=le.createElement(et(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(t);else{let m=new Ee(a,this),u=m.u(this.options);m.p(t),this.T(u),this._$AH=m}}_$AC(e){let t=Ye.get(e.strings);return t===void 0&&Ye.set(e.strings,t=new le(e)),t}k(e){Ce(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,a=0;for(let m of e)a===t.length?t.push(r=new i(this.O(oe()),this.O(oe()),this,this.options)):r=t[a],r._$AI(m),a++;a<t.length&&(this._$AR(r&&r._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=Fe(e).nextSibling;Fe(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,a,m){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=m,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=$}_$AI(e,t=this,r,a){let m=this.strings,u=!1;if(m===void 0)e=J(this,e,t,0),u=!ue(e)||e!==this._$AH&&e!==me,u&&(this._$AH=e);else{let n=e,s,p;for(e=m[0],s=0;s<m.length-1;s++)p=J(this,n[r+s],t,s),p===me&&(p=this._$AH[s]),u||=!ue(p)||p!==this._$AH[s],p===$?e=$:e!==$&&(e+=(p??"")+m[s+1]),this._$AH[s]=p}u&&!a&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ae=class extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}},Me=class extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$)}},Te=class extends Z{constructor(e,t,r,a,m){super(e,t,r,a,m),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??$)===me)return;let r=this._$AH,a=e===$&&r!==$||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,m=e!==$&&(r===$||a);a&&this.element.removeEventListener(this.name,this,r),m&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ne=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}};var Mt=Pe.litHtmlPolyfillSupport;Mt?.(le,ce),(Pe.litHtmlVersions??=[]).push("3.3.3");var M=(i,e,t)=>{let r=t?.renderBefore??e,a=r._$litPart$;if(a===void 0){let m=t?.renderBefore??null;r._$litPart$=a=new ce(e.insertBefore(oe(),m),m,void 0,t??{})}return a._$AI(i),a};var Tt=Object.keys(W);function Nt(i,e,t,r){let a=i.getState(),m=t.label||"text"in t&&t.text||W[t.kind],u=n=>s=>{s.stopPropagation(),i.getState().moveItem(e.id,t.id,n)};return v`<div class="ume-item-row ${r?"selected":""}"
    @click=${()=>i.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${Oe[t.kind]}</span>
    <span class="ume-item-name" title=${m}>${m}</span>
    <button class="ume-mini" title="上移" @click=${u(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${u(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${n=>{n.stopPropagation(),a.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${n=>{n.stopPropagation(),a.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function Pt(i,e){let t=i.getState();return v`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${r=>{let a=r.target.value;a&&t.addItem(a,e.id),r.target.value=""}}>
    <option value="">＋条目</option>
    ${Tt.map(r=>v`<option value=${r}>${W[r]}</option>`)}
  </select>`}function tt(i,e){let{project:t,selection:r}=e.getState(),a=m=>{let u=e.getState(),n=r.pageId===m.id;return v`<div class="ume-page">
      <div class="ume-page-head ${n?"selected":""}"
        @click=${()=>e.getState().select(m.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${m.name}</span>
        <button class="ume-mini" title="上移页面" @click=${s=>{s.stopPropagation(),u.movePage(m.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${s=>{s.stopPropagation(),u.movePage(m.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${s=>{if(s.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${m.name}"\uFF1F`)&&u.removePage(m.id)}}>✕</button>
      </div>
      ${n?v`<div class="ume-page-items">
        ${m.items.length?m.items.map(s=>Nt(e,m,s,r.itemId===s.id)):v`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Pt(e,m)}</div>
      </div>`:$}
    </div>`};M(v`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Ct(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(a)}
  `,i)}function Ct(i){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${i.getState().project.pages.length+1}`);e!==null&&i.getState().addPage(e||void 0)}function S(i,e,t,r=""){return v`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${e??""} placeholder=${r}
      @change=${a=>t(a.target.value)} />
  </div>`}function _(i,e,t,r=1){return v`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(e)} step=${String(r)}
      @change=${a=>{let m=parseFloat(a.target.value);t(Number.isFinite(m)?m:0)}} />
  </div>`}function N(i,e,t,r){return v`<div class="ume-field">
    <label>${i}</label>
    <select @change=${a=>r(a.target.value)}>
      ${t.map(a=>v`<option value=${a.value} ?selected=${a.value===e}>${a.label}</option>`)}
    </select>
  </div>`}function nt(i,e,t){return v`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${r=>t(r.target.checked)} />
    <span>${i}</span>
  </div>`}function He(i,e,t,r=!1){return v`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${r?"font-family:Consolas,monospace":""}
      @change=${a=>t(a.target.value)}>${e??""}</textarea>
  </div>`}function Q(i,e,t="text/plain"){let r=new Blob([e],{type:`${t};charset=utf-8`}),a=document.createElement("a");a.href=URL.createObjectURL(r),a.download=i,a.click(),setTimeout(()=>URL.revokeObjectURL(a.href),5e3)}var Lt=[{value:"uint8",label:"uint8"},{value:"uint16",label:"uint16"},{value:"uint32",label:"uint32"},{value:"int8",label:"int8"},{value:"int16",label:"int16"},{value:"int32",label:"int32"},{value:"int",label:"int"}],Ht=[...Lt,{value:"float",label:"float"},{value:"double",label:"double"}];function rt(i,e,t){let{project:r,selection:a}=e.getState(),m=r.pages.find(o=>o.id===a.pageId)??null,u=m?.items.find(o=>o.id===a.itemId)??null,n=(o,l)=>e.getState().updateItem(m.id,u.id,o,l),s=v`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,p="\u5C5E\u6027";if(m&&!u)p="\u9875\u9762\u5C5E\u6027",s=v`
      ${S("\u540D\u79F0",m.name,o=>e.getState().updatePage(m.id,{name:o}))}
      ${S("C \u51FD\u6570\u540D",m.fnName,o=>e.getState().updatePage(m.id,{fnName:o}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      ${He("\u7528\u6237\u4EE3\u7801",m.userCodePre,o=>e.getState().updatePage(m.id,{userCodePre:o}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(m&&u)switch(p=`${W[u.kind]}`,u.kind){case"text":s=v`
          ${S("\u6587\u672C/\u683C\u5F0F",u.text,o=>n({text:o},`text-${u.id}`))}
          ${N("\u5927\u5C0F",String(u.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],o=>n({scale:Number(o)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{let o=u,l=o.varType==="float"||o.varType==="double";s=v`
          ${N("\u53D8\u91CF\u7C7B\u578B",o.varType,Ht,x=>n({varType:x}))}
          ${S("\u53D8\u91CF\u540D",o.varName,x=>n({varName:x}))}
          ${S("\u663E\u793A\u6587\u672C",o.text,x=>n({text:x},`text-${u.id}`))}
          ${_("\u6B65\u957F",o.step,x=>n({step:x}),"any")}
          ${_("\u6700\u5C0F\u503C",o.min,x=>n({min:x}),"any")}
          ${_("\u6700\u5927\u503C",o.max,x=>n({max:x}),"any")}
          ${_("\u521D\u59CB\u503C",o.initialValue,x=>n({initialValue:x}),"any")}
          ${l?_("\u5C0F\u6570\u4F4D",o.decimals,x=>n({decimals:Math.max(0,Math.trunc(x))})):$}
          ${N("\u5927\u5C0F",String(o.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],x=>n({scale:Number(x)}))}
          <div class="ume-hint">int 建议 %d/%u，float 建议 %.Nf</div>
        `;break}case"switch":{let o=u;s=v`
          ${S("\u53D8\u91CF\u540D",o.varName,l=>n({varName:l}))}
          ${S("\u663E\u793A\u6587\u672C",o.text,l=>n({text:l},`text-${u.id}`))}
          ${_("openValue",o.openValue,l=>n({openValue:Math.max(0,Math.trunc(l))}))}
          ${S('"\u5F00"\u6587\u672C',o.onText,l=>n({onText:l}))}
          ${S('"\u5173"\u6587\u672C',o.offText,l=>n({offText:l}))}
          ${_("\u521D\u59CB\u503C",o.initialValue,l=>n({initialValue:Math.trunc(l)}))}
        `;break}case"button":{let o=u;s=v`
          ${S("\u663E\u793A\u6587\u672C",o.text,l=>n({text:l},`text-${u.id}`))}
          ${S("\u56DE\u8C03\u51FD\u6570\u540D",o.cbName,l=>n({cbName:l}))}
          ${_("ID",o.buttonId,l=>n({buttonId:Math.trunc(l)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{let o=u;s=v`
          ${S("\u663E\u793A\u6587\u672C",o.text,l=>n({text:l},`text-${u.id}`))}
          ${N("\u76EE\u6807\u9875\u9762",o.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...r.pages.filter(l=>l.id!==m.id).map(l=>({value:l.id,label:l.name}))],l=>n({targetPageId:l||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{s=v`
          ${S("\u663E\u793A\u6587\u672C",u.text,o=>n({text:o},`text-${u.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{let o=u;s=v`
          ${S("\u53D8\u91CF\u540D (int)",o.varName,l=>n({varName:l}))}
          ${_("\u6B65\u957F",o.step,l=>n({step:Math.trunc(l)}))}
          ${_("\u6700\u5C0F\u503C",o.min,l=>n({min:Math.trunc(l)}))}
          ${_("\u6700\u5927\u503C",o.max,l=>n({max:Math.trunc(l)}))}
          ${_("\u521D\u59CB\u503C",o.initialValue,l=>n({initialValue:Math.trunc(l)}))}
          <div class="ume-hint">绑定 u8g2_MenuDrawItem${o.kind==="slider"?"Slider":"ProgressBar"}_bind</div>
        `;break}case"chart":{let o=u;s=v`
          ${N("\u7C7B\u578B",o.chartKind,[{value:"line",label:"\u6298\u7EBF\u56FE"},{value:"point",label:"\u6563\u70B9\u56FE"},{value:"bar",label:"\u67F1\u72B6\u56FE"}],l=>n({chartKind:l}))}
          ${_("\u6570\u636E\u70B9\u6570",o.dataLen,l=>n({dataLen:Math.max(2,Math.trunc(l))}))}
          ${_("\u9AD8\u5EA6(px)",o.height,l=>n({height:Math.max(8,Math.trunc(l))}))}
          ${N("\u793A\u4F8B\u6570\u636E",o.sample,[{value:"sine",label:"\u6B63\u5F26"},{value:"ramp",label:"\u659C\u5761"},{value:"noise",label:"\u4F2A\u968F\u673A"}],l=>n({sample:l}))}
          ${_("\u91CF\u7A0B\u4E0A\u9650",o.max??0,l=>n({max:l||void 0}),"any")}
          ${_("\u91CF\u7A0B\u4E0B\u9650",o.min??0,l=>n({min:l||void 0}),"any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;break}case"xbm":{let o=u;s=v`
          ${S("\u6570\u7EC4\u540D",o.name,l=>n({name:l}))}
          ${_("\u5BBD(px)",o.w,l=>n({w:Math.min(128,Math.max(1,Math.trunc(l)))}))}
          ${_("\u9AD8(px)",o.h,l=>n({h:Math.min(64,Math.max(1,Math.trunc(l)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(m.id,o.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${o.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let o=u;s=v`
          ${He("\u6587\u672C\u5185\u5BB9",o.content,l=>n({content:l}))}
          ${_("\u9AD8\u5EA6(px)",o.height,l=>n({height:Math.max(10,Math.trunc(l))}))}
          ${_("\u884C\u95F4\u8DDD",o.lineSpacing,l=>n({lineSpacing:Math.max(0,Math.trunc(l))}))}
          ${nt("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",o.bindScroll,l=>n({bindScroll:l}))}
        `;break}case"board":{let o=u;s=v`
          ${_("\u5BBD(px)",o.w,l=>n({w:Math.max(1,Math.trunc(l))}))}
          ${_("\u9AD8(px)",o.h,l=>n({h:Math.max(1,Math.trunc(l))}))}
          ${S("\u56DE\u8C03\u51FD\u6570\u540D",o.cbName,l=>n({cbName:l}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}M(v`
    <div class="ume-panel-title">属性 ${p!=="\u5C5E\u6027"?v`<span class="ume-kind-badge">${p}</span>`:$}</div>
    ${s}
  `,i)}function at(i,e){let{project:t}=e.getState(),r=(n,s)=>e.getState().update(p=>{Object.assign(p,n)},s),a=t.weakHooks??[],m=(n,s)=>{e.getState().update(p=>{let o=p.weakHooks??[];p.weakHooks=s?[...new Set([...o,n])]:o.filter(l=>l!==n)})},u=v`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${a.length}/${L.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${L.map(n=>v`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${n.fn}${n.retNote?"\uFF08\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u5904\u7406 / 0 = \u4EA4\u7ED9\u5E93\uFF09":""}`}>
              <input type="checkbox" ?checked=${a.includes(n.fn)}
                @change=${s=>m(n.fn,s.target.checked)} />
              <span>${n.label}</span>
            </div>
            <div class="ume-weak-desc">${n.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;M(v`
    <div class="ume-panel-title">工程</div>
    ${S("\u5DE5\u7A0B\u540D",t.name,n=>r({name:n}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${N("\u5B57\u4F53",t.font,ye.map(n=>({value:n.id,label:n.label})),n=>r({font:n}))}
    ${N("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],n=>r({selector:n}))}
    ${_("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,n=>r({selectorLeftMargin:Math.max(0,Math.trunc(n))}))}
    ${_("\u9876\u8FB9\u8DDD",t.selectorTopMargin,n=>r({selectorTopMargin:Math.max(0,Math.trunc(n))}))}
    ${_("\u884C\u95F4\u8DDD",t.selectorLineSpacing,n=>r({selectorLineSpacing:Math.max(0,Math.trunc(n))}))}
    ${_("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,n=>r({marqueeSpeed:n}),.05)}
    ${_("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,n=>r({marqueeHeaderLen:n}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${u}
    ${$}
  `,i)}function it(i,e){let t=a=>{let m,u=()=>{m&&(clearInterval(m),m=void 0)};return{down:n=>{n.preventDefault(),e.key(a),u(),m=window.setInterval(()=>e.key(a),180)},up:u}},r=(a,m,u)=>{let n=t(a);return v`<button class="ume-key" title=${u}
      @pointerdown=${n.down} @pointerup=${n.up} @pointerleave=${n.up}>${m}</button>`};M(v`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${a=>{let u={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[a.key];u!==void 0&&(a.preventDefault(),e.key(u))}}>
      ${e.canvas}
    </div>
    <div class="ume-keybar">
      ${r(1,"\u25B2","\u4E0A MENU_Key_Up")}
      ${r(2,"\u25BC","\u4E0B MENU_Key_Down")}
      ${r(3,"OK","\u786E\u8BA4 MENU_Key_Enter")}
      ${r(4,"\u232B","\u8FD4\u56DE MENU_Key_Return")}
      ${r(5,"\uFF0B","\u52A0 MENU_Key_Add")}
      ${r(6,"\uFF0D","\u51CF MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <span id="ume-live-page"></span>
      <span id="ume-live-value"></span>
    </div>
  `,i)}var ee=null,F="c";function ot(i,e){ee=e,i.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),Kt(i)}function Kt(i){if(!ee)return;let e=F==="c"?ee.c:ee.h,t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",a=>{a.target===t&&st(t)});let r=()=>{M(v`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>st(t)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${ee.warnings.length?v`
            <div style="margin-bottom:8px">
              ${ee.warnings.map(a=>v`<div class="ume-warn">⚠ ${a}</div>`)}
            </div>`:$}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${F==="c"?"primary":""}" @click=${()=>{F="c",r()}}>menu_pages.c</button>
            <button class="ume-btn sm ${F==="h"?"primary":""}" @click=${()=>{F="h",r()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${e}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(e).then(()=>jt(t,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{Q(F==="c"?"menu_pages.c":"menu_pages.h",e)}}>下载 ${F==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,t)};r(),i.appendChild(t)}function st(i){i.remove()}function jt(i,e){let t=i.closest(".ume")??document.body,r=t.querySelector(".ume-toast");r||(r=document.createElement("div"),r.className="ume-toast",t.appendChild(r)),r.textContent=e,r.classList.add("show"),setTimeout(()=>r.classList.remove("show"),1600)}function mt(i,e,t,r){let u=e.getState().project.pages.find(h=>h.id===t)?.items.find(h=>h.id===r);if(!u||u.kind!=="xbm")return;let n=u,s=n.w,p=n.h,o=[...n.bits],l=()=>Math.ceil(s/8),x=document.createElement("div");x.className="ume-modal-mask",x.addEventListener("click",h=>{h.target===x&&U()});let I=(h,w)=>{let E=w*l()+(h>>3);return E<o.length?!!(o[E]>>(h&7)&1):!1},A=(h,w,E)=>{let d=w*l()+(h>>3);o[d]=E?o[d]|1<<(h&7):o[d]&~(1<<(h&7))},te=(h,w)=>{let E=Math.ceil(s/8),d=Math.ceil(h/8),f=new Array(d*w).fill(0);for(let c=0;c<Math.min(p,w);c++)for(let y=0;y<Math.min(s,h);y++){let g=c*E+(y>>3);g<o.length&&o[g]>>(y&7)&1&&(f[c*d+(y>>3)]|=1<<(y&7))}s=h,p=w,o=f},ne=!1,re=!0,V=(h,w)=>E=>{E.preventDefault(),ne=!0,re=!I(h,w),A(h,w,re),P()},de=(h,w)=>()=>{ne&&(A(h,w,re),P())},q=()=>{ne=!1},P=()=>{M(b(),x)},ve=()=>{let h=[];for(let w=0;w<p;w++)for(let E=0;E<s;E++)h.push(v`<button class="ume-xbm-cell ${I(E,w)?"on":""}"
          data-x=${E} data-y=${w}
          @pointerdown=${V(E,w)}
          @pointerenter=${de(E,w)}></button>`);return h},b=()=>v`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${s}×${p}</span></span>
        <button class="ume-mini" @click=${U}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${q}
        @pointerleave=${q}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(s)} min="1" max="128"
            @change=${h=>{te(ut(+h.target.value,1,128),p),P()}} />
          <input type="number" style="width:64px" .value=${String(p)} min="1" max="64"
            @change=${h=>{te(s,ut(+h.target.value,1,64)),P()}} />
          <button class="ume-btn sm" @click=${()=>{o=o.map(()=>0),P()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{o=o.map(h=>~h&255),P()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${s}, 14px)">${ve()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${n.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${U}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,r,{w:s,h:p,bits:[...o]}),U()}}>应用</button>
      </div>
    </div>
  `;function U(){x.remove(),document.removeEventListener("pointerup",q)}document.addEventListener("pointerup",q),P(),i.appendChild(x)}function ut(i,e,t){return Number.isFinite(i)?Math.min(t,Math.max(e,Math.trunc(i))):e}var Rt="prebuilt/u8g2-menu-preview.js",Ke=class{constructor(e,t={}){this.store=$e();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let o=document.createElement("style");o.id="ume-style",o.textContent=je,document.head.appendChild(o)}let r=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,a=this.opts.data??r??void 0;if(a!==void 0)try{this.store.setState({project:ge(a)})}catch(o){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",o)}let m=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,u=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;m&&u&&(this.lastExport={c:m,h:u}),e.innerHTML=`
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
          <div data-role="style"></div>
          <div data-role="prop"></div>
        </div>
      </div>
      <input type="file" accept=".json,application/json" style="display:none" data-role="file">
    `;let n=o=>e.querySelector(o);this.els={left:n(".ume-left"),center:n(".ume-center"),right:n(".ume-right"),styleEl:n('[data-role="style"]'),propEl:n('[data-role="prop"]'),toolbarUndo:n('[data-act="undo"]'),toolbarRedo:n('[data-act="redo"]')};let s=document.createElement("div");s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.gap="10px",this.els.center.appendChild(s),this.preview=new be(s,{onPageChanged:o=>this.onPreviewPageChanged(o)});let p=document.createElement("div");this.els.center.appendChild(p),it(p,this.preview),this.preview.load(this.opts.wasmUrl??Rt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(o=>{console.error(o);let l=document.createElement("div");l.className="ume-warn",l.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${o.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(l)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let o=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);o!==null&&this.store.getState().addPage(o||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{Q(`${this.store.getState().project.name||"menu-project"}.json`,Ie(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{n('[data-role="file"]').click()}),n('[data-role="file"]').addEventListener("change",o=>{let l=o.target.files?.[0];l&&(l.text().then(x=>{try{let I=ge(x);this.store.getState().update(A=>{Object.assign(A,I)}),this.scheduleRender()}catch(I){alert(`\u5BFC\u5165\u5931\u8D25: ${I.message}`)}}),o.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=ge(e);this.store.getState().update(r=>{Object.assign(r,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.lastExport,t=ke(this.store.getState().project,e??void 0);return this.lastExport={c:t.c,h:t.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,t.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,t.h)),ot(this.container,t),this.opts.onExport?.(t),t}downloadC(){let e=ke(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:e.c,h:e.h},Q("menu_pages.c",e.c),Q("menu_pages.h",e.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ie(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();tt(this.els.left,this.store),at(this.els.styleEl,this.store),rt(this.els.propEl,this.store,{openXbmEditor:(t,r)=>mt(this.container,this.store,t,r)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-page"),t=document.getElementById("ume-live-value"),r=this.store.getState(),a=this.store.getState().project.pages.findIndex(m=>m.id===r.selection.pageId);if(e&&a>=0){let m=this.preview.currentPage;e.textContent=`\u9884\u89C8\u9875: ${this.store.getState().project.pages[m]?.name??"?"}`}if(t&&a>=0&&r.selection.itemId){let m=r.project.pages[a],u=m.items.findIndex(s=>s.id===r.selection.itemId),n=m.items[u];if(n&&"varName"in n){let s=n.kind==="switch"?this.preview.getSwitch(a,u):this.preview.getInt(a,u);t.textContent=`${n.varName} = ${s}`}else t.textContent=""}}};return bt(Vt);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
