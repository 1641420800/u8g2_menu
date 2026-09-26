"use strict";var U8G2MenuEditor=(()=>{var Me=Object.defineProperty;var Bt=Object.getOwnPropertyDescriptor;var Lt=Object.getOwnPropertyNames;var Ht=Object.prototype.hasOwnProperty;var Kt=(i,e)=>{for(var t in e)Me(i,t,{get:e[t],enumerable:!0})},Rt=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Lt(e))!Ht.call(i,r)&&r!==t&&Me(i,r,{get:()=>e[r],enumerable:!(n=Bt(e,r))||n.enumerable});return i};var jt=i=>Rt(Me({},"__esModule",{value:!0}),i);var In={};Kt(In,{MenuEditor:()=>Qe,MenuKey:()=>Ee});var tt=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;var nt=i=>{let e,t=new Set,n=(l,d)=>{let m=typeof l=="function"?l(e):l;if(!Object.is(m,e)){let x=e;e=d??(typeof m!="object"||m===null)?m:Object.assign({},e,m),t.forEach($=>$(e,x))}},r=()=>e,o={setState:n,getState:r,getInitialState:()=>u,subscribe:l=>(t.add(l),()=>t.delete(l))},u=e=i(n,r,o);return o},at=i=>i?nt(i):nt;var Pe=0;function D(i){return Pe=(Pe+1)%1e9,`${i}_${Date.now().toString(36)}_${Pe.toString(36)}`}function me(i){return{id:D("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...i}}function Ve(i){return{id:D("buf"),name:"buf_new",dataLen:32,sample:"sine",...i}}function it(i,e){let t=new Set(i.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function rt(i,e){let t=new Set(i.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function q(i){let e={id:D("it"),label:"",bind:{type:"none"}};switch(i){case"text":return{...e,kind:i,text:"\u83DC\u5355\u9879",scale:1,displayVarId:null};case"slider":return{...e,kind:i,position:50};case"progress":return{...e,kind:i,position:50};case"chart":return{...e,kind:i,sources:[],height:32};case"xbm":return Dt(16,16);case"textarea":return{...e,kind:i,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:i,w:64,h:32,cbName:"board_cb"}}}function Dt(i,e){let t=Math.ceil(i/8);return{id:D("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:i,h:e,bits:new Array(t*e).fill(0)}}function Ce(i){return{id:D("pg"),name:i,fnName:"",items:[],userCodePre:""}}function Ie(i,e){return{...i,...e}}function ee(i,e){return{...i,...e}}function st(){let i=[me({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),me({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),me({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[Ve({name:"buf_demo",dataLen:32,sample:"sine"})],t=Ce("\u4E3B\u9875");t.items=[Ie(q("text"),{text:"u8g2_menu"}),ee(q("text"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E",bind:{type:"submenu",targetPageId:null}}),ee(q("text"),{text:"\u5173\u4E8E",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];let n=Ce("\u8BBE\u7F6E");n.items=[ee(Ie(q("text"),{text:"\u97F3\u91CF:%d"}),{bind:{type:"value",varId:i[0].id}}),ee(Ie(q("text"),{text:"\u5F00\u5173:%s"}),{bind:{type:"switch",varId:i[1].id,openValue:1,onText:"on",offText:"off"}}),ee(q("slider"),{bind:{type:"value",varId:i[2].id}}),ee(q("text"),{text:"\u56FE\u8868",bind:{type:"submenu",targetPageId:null}}),ee(q("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let r=Ce("\u56FE\u8868");r.items=[Ie(q("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),ee(q("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:i,chartBuffers:e,pages:[t,n,r]};return t.items[1].bind.targetPageId=n.id,n.items[3].bind.targetPageId=r.id,s}function ot(i){return structuredClone(i)}var Ut=800;function Ne(){let i=null,e=0;return at()((t,n)=>({project:st(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{let a=Date.now(),o=!!s&&s===i&&a-e<Ut;i=s??null,e=a,t(u=>{let l=ot(u.project);return r(l),{project:l,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{t(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{t(r=>{if(!r.future.length)return r;let[s,...a]=r.future;return{project:s,past:[...r.past,r.project],future:a,dirty:!0}})},select:(r,s=null)=>t({selection:{pageId:r,itemId:s}}),addPage:r=>{let s={id:D("pg"),name:r??`\u9875\u9762${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(a=>{a.pages.push(s)}),t({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{n().update(a=>{a.pages=a.pages.filter(o=>o.id!==r);for(let o of a.pages)for(let u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});let{selection:s}=n();s.pageId===r&&t({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{n().update(a=>{let o=a.pages.findIndex(l=>l.id===r),u=o+s;o<0||u<0||u>=a.pages.length||([a.pages[o],a.pages[u]]=[a.pages[u],a.pages[o]])})},updatePage:(r,s)=>{n().update(a=>{let o=a.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{let a=s??n().selection.pageId??n().project.pages[0]?.id;if(!a)return null;let o=Ot(r);return n().update(u=>{u.pages.find(d=>d.id===a)?.items.push(o)}),t({selection:{pageId:a,itemId:o.id}}),o},removeItem:(r,s)=>{n().update(o=>{let u=o.pages.find(l=>l.id===r);u&&(u.items=u.items.filter(l=>l.id!==s))});let{selection:a}=n();a.itemId===s&&t({selection:{pageId:r,itemId:null}})},moveItem:(r,s,a)=>{n().update(o=>{let u=o.pages.find(m=>m.id===r);if(!u)return;let l=u.items.findIndex(m=>m.id===s),d=l+a;l<0||d<0||d>=u.items.length||([u.items[l],u.items[d]]=[u.items[d],u.items[l]])})},duplicateItem:(r,s)=>{let a=null;n().update(o=>{let u=o.pages.find(d=>d.id===r);if(!u)return;let l=u.items.findIndex(d=>d.id===s);l<0||(a=structuredClone(u.items[l]),a.id=D("it"),u.items.splice(l+1,0,a))}),a&&t({selection:{pageId:r,itemId:a.id}})},updateItem:(r,s,a,o)=>{n().update(u=>{let d=u.pages.find(m=>m.id===r)?.items.find(m=>m.id===s);d&&Object.assign(d,a)},o)},addVariable:r=>{let s=null;return n().update(a=>{a.variables=a.variables??[];let o=rt(a.variables,r?.name??"var_new");s=me({...r,name:o}),a.variables.push(s)}),s},removeVariable:r=>{let s=0;for(let a of n().project.pages)for(let o of a.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(n().update(a=>{a.variables=(a.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,a)=>{n().update(o=>{let u=(o.variables??[]).find(l=>l.id===r);u&&Object.assign(u,s)},a)},addChartBuffer:r=>{let s=null;return n().update(a=>{a.chartBuffers=a.chartBuffers??[];let o=it(a.chartBuffers,r?.name??"buf_new");s=Ve({...r,name:o}),a.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(let a of n().project.pages)for(let o of a.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(n().update(a=>{a.chartBuffers=(a.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,a)=>{n().update(o=>{let u=(o.chartBuffers??[]).find(l=>l.id===r);u&&Object.assign(u,s)},a)}}))}var Mn=Ne();function Ot(i){return q(i)}var G=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],oe={text:"\u6587\u672C",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},ut={text:"T",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},ue={none:"\u65E0",value:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE"};var Be=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var J=class extends Error{},lt=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),dt=new Set(["line","point","bar"]),ct=new Set(["sine","ramp","noise","none"]);function le(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function B(i,e){return typeof i=="string"?i:e}function E(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}var Ft=["text","slider","progress","chart","xbm","textarea","board"],zt=["number","switch","button","submenu","back"],qt=["none","value","switch","button","submenu","back"];function Xt(i){if(!le(i))throw new J("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=B(i.kind,"");if(!(Ft.includes(e)||zt.includes(e)))throw new J(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(i);switch(t.id=B(i.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=B(i.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=B(i.text,""),t.scale=i.scale===2?2:1;break}return t}function Wt(i){for(let e of i)for(let t of e.items){let n=t;if(!(n.bind&&le(n.bind)&&qt.includes(B(n.bind.type,"none")))){switch(n.kind){case"number":{let r=n.varId??null;n.editable===!1?(n.kind="text",n.displayVarId=r,n.bind={type:"none"}):(n.kind="text",n.displayVarId=null,n.bind={type:"value",varId:r});break}case"switch":n.kind="text",n.displayVarId=null,n.bind={type:"switch",varId:n.varId??null,openValue:E(n.openValue,1),onText:B(n.onText,"on"),offText:B(n.offText,"off")};break;case"button":n.kind="text",n.displayVarId=null,n.bind={type:"button",cbName:B(n.cbName,"btn_cb"),buttonId:E(n.buttonId,1)};break;case"submenu":n.kind="text",n.displayVarId=null,n.bind={type:"submenu",targetPageId:n.targetPageId??null};break;case"back":n.kind="text",n.displayVarId=null,n.bind={type:"back"};break;case"slider":case"progress":n.bind=n.varId?{type:"value",varId:n.varId}:{type:"none"},n.position===void 0&&(n.position=50);break;default:n.bind={type:"none"},n.kind==="text"&&n.displayVarId===void 0&&(n.displayVarId=null);break}delete n.varId,delete n.varName,delete n.varType,delete n.editable,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals,n.kind!=="board"&&(delete n.cbName,delete n.buttonId),delete n.openValue,delete n.onText,delete n.offText,delete n.targetPageId}}}function Zt(i){if(!le(i))throw new J("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(i.items)?i.items.map(Xt):[];return{id:B(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:B(i.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:B(i.fnName,""),items:e,userCodePre:B(i.userCodePre,"")}}function Yt(i){if(!le(i))return null;let e=B(i.type,"int32");return{id:B(i.id,"")||D("vb"),name:B(i.name,""),type:lt.has(e)?e:"int32",initialValue:E(i.initialValue,0),min:E(i.min,0),max:E(i.max,100),step:E(i.step,1)}}function Gt(i){if(!le(i))return null;let e=B(i.sample,"sine");return{id:B(i.id,"")||D("buf"),name:B(i.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(E(i.dataLen,32)))),sample:ct.has(e)?e:"sine"}}function Jt(i){let e=new Map,t=[],n=(r,s)=>{let a=e.get(r);return a||(a=s(),e.set(r,a),t.push(a)),a};for(let r of i)for(let s of r.items){let a=s;switch(s.kind){case"number":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:D("vb"),name:u,type:lt.has(String(a.varType))?String(a.varType):"int32",initialValue:E(a.initialValue,0),min:E(a.min,0),max:E(a.max,100),step:E(a.step,1)}));s.varId=l.id}a.editable===void 0&&(s.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:D("vb"),name:u,type:"int",initialValue:E(a.initialValue,0),min:E(a.min,0),max:E(a.max,100),step:E(a.step,1)}));s.varId=l.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:D("vb"),name:u,type:"uint8",initialValue:E(a.initialValue,0),min:0,max:1,step:1}));s.varId=l.id}delete a.varName,delete a.initialValue;break;default:break}}return t}function ke(i){let e;if(typeof i=="string")try{e=JSON.parse(i)}catch{throw new J("JSON \u89E3\u6790\u5931\u8D25")}else e=i;if(!le(e))throw new J("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,n=E(t.version,0);if(n>1)throw new J(`\u5DE5\u7A0B\u7248\u672C v${n} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);n<1&&void 0;let r=Array.isArray(t.pages)?t.pages.map(Zt):[];if(!r.length)throw new J("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",a=new Set(G.map(d=>d.fn)),o=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(d=>typeof d=="string"&&a.has(d)))]:[],u;Array.isArray(t.variables)?u=t.variables.map(Yt).filter(d=>!!d):u=Jt(r);let l;return Array.isArray(t.chartBuffers)?l=t.chartBuffers.map(Gt).filter(d=>!!d):l=Qt(r),Wt(r),en(r,l),{version:1,name:B(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:E(t.width,128),height:E(t.height,64),font:B(t.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:E(t.selectorLeftMargin,16),selectorTopMargin:E(t.selectorTopMargin,0),selectorLineSpacing:E(t.selectorLineSpacing,0),marqueeSpeed:E(t.marqueeSpeed,.2),marqueeHeaderLen:E(t.marqueeHeaderLen,5),weakHooks:o,variables:u,chartBuffers:l,pages:r}}function Qt(i){let e=[],t=0,n=()=>{let r={id:D("buf"),name:`buf_chart_${++t}`,dataLen:32,sample:"sine"};return e.push(r),r};for(let r of i)for(let s of r.items){if(s.kind!=="chart")continue;let a=s;if(Array.isArray(a.sources))continue;let o=n();o.dataLen=Math.min(512,Math.max(2,Math.trunc(E(a.dataLen,32))));let u=B(a.sample,"sine");ct.has(u)&&(o.sample=u);let l=B(a.chartKind,"line"),d={bufferId:o.id,chartKind:dt.has(l)?l:"line"};a.max!==void 0&&a.max!==null&&(d.max=E(a.max,0)),a.min!==void 0&&a.min!==null&&(d.min=E(a.min,0)),s.sources=[d],a.height===void 0&&(s.height=32),delete a.chartKind,delete a.dataLen,delete a.sample,delete a.max,delete a.min}return e}function en(i,e){let t=new Set(e.map(n=>n.id));for(let n of i)for(let r of n.items){if(r.kind!=="chart")continue;let s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(a=>t.has(a.bufferId)).map(a=>({bufferId:a.bufferId,chartKind:dt.has(a.chartKind)?a.chartKind:"line",min:a.min,max:a.max})),typeof s.height!="number"&&(s.height=32)}}function Le(i){return JSON.stringify(i,null,2)}var tn={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function Q(i,e="anon"){let t=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function pe(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function te(i){if(!Number.isFinite(i))return"0.0f";let e=i.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function nn(i,e,t){return t==="ramp"?`${i}[i] = (float)i;`:t==="noise"?`${i}[i] = (float)((i * 37) % ${e});`:`${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function an(i){let e=new Map;if(!i)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,n;for(;(n=t.exec(i))!==null;)e.set(n[1],n[2]);return e}function W(i,e,t){let n=e.has(i)?e.get(i):"";return`${t}/* USER CODE BEGIN ${i} */${n}${t}/* USER CODE END ${i} */`}var rn=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function He(i,e){let t=[],n=an(e?.c??""),r=i.pages.map((c,y)=>c.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.fnName)?c.fnName:`page_${y}`),s=new Map,a=new Map;for(let c of i.variables??[]){if(!c.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}if(s.has(c.name)){t.push(`\u53D8\u91CF\u540D "${c.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.name)||t.push(`\u53D8\u91CF\u540D "${c.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${Q(c.name)}"`);let y=Q(c.name,"var"),g=c.type==="float"||c.type==="double",k={name:y,srcType:c.type,type:tn[c.type],init:g?te(c.initialValue):String(Math.trunc(c.initialValue)),isFloat:g,step:c.step,min:c.min,max:c.max};s.set(y,k),a.set(c.id,k)}let o=new Map,u=new Set,l=[],d=new Map;for(let c of i.chartBuffers??[]){if(!c.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");continue}let y=Q(c.name,"buf");if([...d.values()].some(j=>j.name===y)){t.push(`\u7F13\u51B2\u533A\u540D "${c.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let g=Math.max(2,Math.trunc(c.dataLen)),k=`${y.toUpperCase()}_LEN`;d.set(c.id,{name:y,lenMacro:k,len:g});let S=`fill_${y}`,K=(n.get(S)??"").trim()!=="";l.push(`#define ${k} ${g}`,`static float ${y}[${k}];`,`static uint8_t ${y}_filled = 0;`,`static void ${y}_fill(void)`,"{",W(S,n,"    "),...c.sample!=="none"&&!K?[`    for (uint16_t i = 0; i < ${k}; ++i) { ${nn(y,g,c.sample)} }`]:[],"}")}let m=[],x=new Map,$=new Map,_=new Map;{let c=0,y=0,g=k=>{let S=d.get(k);return S?(_.has(k)||_.set(k,`        if (!${S.name}_filled) { ${S.name}_filled = 1; ${S.name}_fill(); }`),_.get(k)):""};for(let k of i.pages)for(let S of k.items){if(S.kind!=="chart")continue;let K=S.sources.filter(A=>d.has(A.bufferId));if(S.sources.length&&!K.length){t.push(`\u9875\u9762 ${k.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!K.length){t.push(`\u9875\u9762 ${k.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let j=Math.max(4,Math.trunc(S.height)),Z=[];for(let A of K){let N=d.get(A.bufferId),v=`chart${c++}`;m.push(`static float ${v}_dis[${N.lenMacro}];`,`static u8g2_chart_t ${v};`),Z.push({name:v,s:A,b:N})}if(Z.length===1){let{name:A,s:N,b:v}=Z[0];m.push(`static uint8_t ${A}_inited = 0;`),x.set(S.id,[`    if (!${A}_inited) {`,`        ${A}_inited = 1;`,`        u8g2_chart_init(&${A}, ${v.name}, ${A}_dis, ${v.lenMacro});`,g(N.bufferId),"    }"]);let T=N.chartKind==="point"?"Point":N.chartKind==="bar"?"Bar":"Line",_e=N.min!==void 0&&N.max!==void 0?`${te(N.max)}, ${te(N.min)}`:"0, 0";$.set(S.id,`    u8g2_MenuDrawItem${T}Chart(&${A}, ${j}, ${_e});`)}else{let A=`chart_layers_${y++}`;m.push(`static u8g2_menu_drawChart_t ${A}[${Z.length}];`,`static uint8_t ${A}_inited = 0;`);let N=[`    if (!${A}_inited) {`,`        ${A}_inited = 1;`];Z.forEach(({name:v,s:T,b:_e},ye)=>{N.push(`        u8g2_chart_init(&${v}, ${_e.name}, ${v}_dis, ${_e.lenMacro});`),N.push(g(T.bufferId));let Nt=T.chartKind==="point"?"u8g2_drawPointChart":T.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",et=T.min!==void 0&&T.max!==void 0?`${te(T.max)}, ${te(T.min)}`:"0, 0";N.push(`        ${A}[${ye}].drawChart = ${Nt};`),N.push(`        ${A}[${ye}].chart = &${v};`),N.push(`        ${A}[${ye}].max = ${et.split(", ")[0]};`),N.push(`        ${A}[${ye}].min = ${et.split(", ")[1]};`)}),N.push("    }"),x.set(S.id,N),$.set(S.id,`    u8g2_MenuDrawItemChart(${A}, ${Z.length}, ${j});`)}}}let w=[],h=[],f=[],H=new Set,C=new Map,U=0;for(let c of i.pages)for(let y of c.items){if(y.bind.type==="button"){let g=Q(y.bind.cbName,"btn_cb");o.has(g)||o.set(g,y.bind.buttonId)}switch(y.kind){case"board":u.add(Q(y.cbName,"board_cb"));break;case"xbm":{let g=Q(y.name,"icon");for(;H.has(g);)g=`${g}_2`;H.add(g),C.set(y.id,g);let k=y.bits.length,S=y.bits.map(K=>`0x${(K&255).toString(16).padStart(2,"0")}`).join(", ");w.push(`static const uint8_t menu_xbm_${g}[${k}] = { ${S} };`);break}case"textarea":{let g=U++;h.push(`static char ta${g}_text[] = "${pe(y.content)}";`,`static u8g2_menu_textArea_t ta${g};`,`static uint8_t ta${g}_inited = 0;`),f.push(`    if (!ta${g}_inited) {`,`        ta${g}_inited = 1;`,`        u8g2_textArea_init(&ta${g}, ta${g}_text);`,`        u8g2_textArea_setLineSpacing(&ta${g}, ${Math.max(0,Math.trunc(y.lineSpacing))});`,"    }");break}default:break}}let O=(c,y)=>{if(!c)return"";let g=`"${pe(c)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${g});`:`u8g2_MenuUTF8Printf(${g});`},Y=(c,y,g)=>{let k=`"${pe(c)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${k}, ${g});`:`u8g2_MenuUTF8Printf(${k}, ${g});`},L=0,P=(c,y)=>{let g=[],k=`${y.name}`,S=v=>{if(!v)return null;let T=a.get(v);return T||t.push(`\u9875\u9762 ${k} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),T??null},K=c.bind,j=null,Z=null,A="on",N="off";switch(K.type){case"value":{let v=S(K.varId);if(v){j=v;let T=v.isFloat?`u8g2_MenuItemValue_${v.srcType}(&${v.name}, ${te(v.step)}, ${te(v.min)}, ${te(v.max)});`:`u8g2_MenuItemValue_${v.srcType}(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`;g.push(`    ${T}`)}break}case"switch":{let v=S(K.varId);v&&v.srcType!=="uint8"?t.push(`\u5F00\u5173\u9644\u52A0\u503C\u7ED1\u5B9A\u7684\u53D8\u91CF "${v.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${v.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`):v&&(Z=v,A=K.onText,N=K.offText,g.push(`    u8g2_MenuItemValue_switch(&${v.name}, ${Math.trunc(K.openValue)});`));break}case"button":{let v=Q(K.cbName,"btn_cb");g.push(`    u8g2_MenuItem_button(${v}, ${Math.trunc(K.buttonId)});`);break}case"submenu":{let v=i.pages.findIndex(T=>T.id===K.targetPageId);!K.targetPageId||v<0?t.push(`\u9875\u9762 ${k} \u7684\u6761\u76EE "${c.label||"\u672A\u547D\u540D"}" \u9644\u52A0\u503C\u76EE\u6807\u9875\u9762\u65E0\u6548\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`):g.push(`    u8g2_MenuItem_menu_enter(${r[v]});`);break}case"back":g.push("    u8g2_MenuItem_menu_back();");break;default:break}switch(c.kind){case"text":{if(j)g.push(`    ${Y(c.text,c.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||t.push(`\u9875\u9762 ${k} \u7684\u6570\u503C\u9644\u52A0\u503C\u6761\u76EE\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(Z)g.push(`    ${Y(c.text,c.scale,`${Z.name} ? "${pe(A)}" : "${pe(N)}"`)}`),/%[-+ #0]*s/.test(c.text)||t.push("\u5F00\u5173\u9644\u52A0\u503C\u6761\u76EE\u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off");else if(K.type==="none"&&c.displayVarId){let v=S(c.displayVarId);if(v)g.push(`    ${Y(c.text,c.scale,v.name)}`),/%[-+ #0]*[a-zA-Z]/.test(c.text)||t.push(`\u9875\u9762 ${k} \u7684\u663E\u793A\u6761\u76EE\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else{t.push(`\u9875\u9762 ${k} \u7684\u663E\u793A\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let T=O(c.text,c.scale);T&&g.push(`    ${T}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(c.text)){t.push(`\u9875\u9762 ${k} \u7684\u6587\u672C\u6761\u76EE\u542B\u5360\u4F4D\u7B26\u4F46\u672A\u7ED1\u5B9A\u53D8\u91CF/\u663E\u793A\u53D8\u91CF\uFF0C\u5360\u4F4D\u7B26\u5DF2\u79FB\u9664`);let v=O(c.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),c.scale);v&&g.push(`    ${v}`)}else{let v=O(c.text,c.scale);v&&g.push(`    ${v}`)}break}case"slider":case"progress":{let v=c.kind==="slider"?"Slider":"ProgressBar";if(j){if(!rn.has(j.srcType)){t.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u9644\u52A0\u503C\u7684\u53D8\u91CF "${j.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${j.srcType}\uFF09\uFF0C\u5DF2\u6309\u9759\u6001\u663E\u793A\u751F\u6210`),g.push(`    u8g2_MenuDrawItem${v}(${(c.position/100).toFixed(2)}f);`);break}g.push(`    u8g2_MenuDrawItem${v}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{let T=Math.min(100,Math.max(0,c.position));g.push(`    u8g2_MenuDrawItem${v}(${(T/100).toFixed(2)}f);`)}break}case"chart":{let v=x.get(c.id),T=$.get(c.id);if(!v||!T)break;g.push(...v),g.push(T);break}case"xbm":g.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${C.get(c.id)??Q(c.name,"icon")});`);break;case"textarea":{let v=L++;g.push(...f[v].split(`
`));let T=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";g.push(`    ${T}(&ta${v}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{let v=Q(c.cbName,"board_cb");g.push(`    u8g2_MenuDrawItemBoard(${v}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return g},p=[];p.push("/**"),p.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${i.name}`),p.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),p.push(" *"),p.push(" * main.c \u91CC\u4F7F\u7528\u4EE5\u4E0B\u7B26\u53F7\u65F6\uFF0C\u76F4\u63A5 extern\uFF08\u6216\u590D\u5236\u4E0B\u9762\u58F0\u660E\uFF09\uFF1A"),r.forEach((c,y)=>p.push(` *   void ${c}(void);   /* \u9875\u9762: ${i.pages[y].name} */`));for(let c of s.values())p.push(` *   extern ${c.type} ${c.name};`);for(let[c]of o)p.push(` *   void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(let c of u)p.push(` *   void ${c}(u8g2_t *u8g2);`);p.push(" */"),p.push('#include "u8g2_menu.h"'),(i.chartBuffers??[]).some(c=>c.sample==="sine")&&p.push("#include <math.h>"),p.push(""),p.push(W("includes",n,"")),p.push(""),r.forEach(c=>p.push(`void ${c}(void);`)),p.push(""),p.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),p.push(W("variables",n,""));for(let c of s.values())p.push(`${c.type} ${c.name} = ${c.init};`);if(p.push(""),(l.length||m.length||h.length||w.length)&&(p.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),p.push(...l,...m,...h,...w),p.push("")),o.size||u.size){p.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),p.push(W("callbacks",n,""));for(let[c]of o)p.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID)`),p.push("{"),p.push(W(`cb_${c}`,n,"    ")),p.push("}"),p.push("");for(let c of u)p.push(`void ${c}(u8g2_t *u8g2)`),p.push("{"),p.push(W(`cb_${c}`,n,"    ")),p.push("}"),p.push("")}let V=(i.weakHooks??[]).map(c=>G.find(y=>y.fn===c)).filter(c=>!!c);if(V.length||n.has("weak")||G.some(c=>(n.get(`weak_${c.fn}`)??"").trim())){p.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),p.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),p.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let y=G.filter(g=>!i.weakHooks?.includes(g.fn)&&(n.get(`weak_${g.fn}`)??"").trim()).map(g=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${g.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${g.decl}`,"{",W(`weak_${g.fn}`,n,"    "),"}","#endif"].join(`
`)).join(`
`);p.push(y?`${W("weak",n,"").replace(/\n$/,"")}
${y}
`:W("weak",n,"")),p.push("");for(let g of V){p.push(`/* ${g.label}: ${g.desc} */`),p.push(`${g.decl}`),p.push("{"),p.push(W(`weak_${g.fn}`,n,"    "));let k=g.bodyArgs.split(`
`).map(S=>`    ${S}`);g.retNote&&k.push(`    ${g.retNote}`),p.push(...k),p.push("}"),p.push("")}}return p.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),p.push(""),i.pages.forEach((c,y)=>{p.push(`/* \u9875\u9762: ${c.name} */`),p.push(`void ${r[y]}(void)`),p.push("{"),p.push(W(`page_${r[y]}_pre`,n,"    "));for(let g of c.items)p.push(...P(g,c));p.push("}"),p.push("")}),{c:`${p.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:t}}var Ee=(o=>(o[o.None=0]="None",o[o.Up=1]="Up",o[o.Down=2]="Down",o[o.Enter=3]="Enter",o[o.Return=4]="Return",o[o.Add=5]="Add",o[o.Sub=6]="Sub",o))(Ee||{});var sn=128*64/8;function on(i){return new Promise((e,t)=>{let n=document.createElement("script");n.src=i,n.onload=()=>e(),n.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${i}`)),document.head.appendChild(n)})}var Se=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.lastKnownPage=0;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await on(e);let n=t.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await n({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let r=this.mod._em_font_count_export();for(let s=0;s<r;s++){let a=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(a),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(t=>`${t.name}|${t.dataLen}|${t.sample}`),pages:e.pages.map(t=>({n:t.items.length,k:t.items.map(n=>n.kind).join(","),res:t.items.map(n=>n.kind==="chart"?(n.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")}))})}sync(e){let t=this.mod;if(!t)return;let n=this.signature(e);n!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);let r=d=>Math.trunc(Number.isFinite(d)?d:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},a={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},l=d=>d?(e.variables??[]).findIndex(m=>m.id===d):-1;(e.variables??[]).forEach((d,m)=>{t.ccall("em_var_define",null,["number","number","number","number","number","number"],[m,s[d.type],r(d.initialValue),r(d.step),r(d.min),r(d.max)])}),(e.chartBuffers??[]).forEach((d,m)=>{t.ccall("em_buf_define",null,["number","number","number"],[m,r(d.dataLen),u[d.sample]])}),e.pages.forEach((d,m)=>{t.ccall("em_page_begin",null,["number"],[m]),d.items.forEach((x,$)=>{let _=()=>{let w=x.bind;if(w.type==="none")return;let h=w.type==="value"||w.type==="switch",f=h?(e.variables??[]).find(H=>H.id===w.varId):void 0;t.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[m,$,o[w.type],h&&f?s[f.type]:0,w.type==="switch"?r(w.openValue):0,w.type==="button"?r(w.buttonId):0,w.type==="submenu"?e.pages.findIndex(H=>H.id===w.targetPageId):-1,h&&f?l(f.id):-1])};switch(x.kind){case"text":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,$,a.text,x.scale,0,0,0,x.displayVarId?l(x.displayVarId):-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[m,$,x.text]),_();break;case"slider":case"progress":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,$,a[x.kind],1,0,0,0,-1,-1]),_();break;case"chart":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,$,a.chart,1,r(x.height),0,0,-1,-1]);for(let w of x.sources??[])t.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[m,$,(e.chartBuffers??[]).findIndex(h=>h.id===w.bufferId),{line:0,point:1,bar:2}[w.chartKind],w.min!==void 0&&w.max!==void 0?1:0,w.max??0,w.min??0]);_();break;case"xbm":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,$,a.xbm,1,0,r(x.w),r(x.h),-1,-1]);{let w=t._em_scratch(x.bits.length);w&&(t.HEAPU8.set(new Uint8Array(x.bits),w),t._em_item_bits(m,$,w,x.bits.length))}_();break;case"textarea":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,$,a.textarea,1,r(x.height),0,0,-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[m,$,x.content]),_();break;case"board":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[m,$,a.board,1,0,r(x.w),r(x.h),-1,-1]),_();break}}),t.ccall("em_page_end",null,["number","number"],[m,d.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],r(e.selectorLeftMargin),r(e.selectorTopMargin),r(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let n=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(n),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let n=t._em_frame(e);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));let r=t.HEAPU8.subarray(n,n+sn),s=this.img.data;s.fill(255);for(let o=0;o<64;o++){let u=(o>>3)*128,l=1<<(o&7),d=o*128*4;for(let m=0;m<128;m++)r[u+m]&l&&(s[d]=17,s[d+1]=24,s[d+2]=39),d+=4}this.ctx.putImageData(this.img,0,0);let a=t._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,this.events.onPageChanged?.(a))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Fe=globalThis,mt=i=>i,Te=Fe.trustedTypes,pt=Te?Te.createPolicy("lit-html",{createHTML:i=>i}):void 0,xt="$lit$",ne=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+ne,un=`<${$t}>`,re=document,ge=()=>re.createComment(""),he=i=>i===null||typeof i!="object"&&typeof i!="function",ze=Array.isArray,ln=i=>ze(i)||typeof i?.[Symbol.iterator]=="function",Ke=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,gt=/>/g,ae=RegExp(`>|${Ke}(?:([^\\s"'>=/]+)(${Ke}*=${Ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,bt=/"/g,_t=/^(?:script|style|textarea|title)$/i,qe=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),b=qe(1),jn=qe(2),Dn=qe(3),be=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),vt=new WeakMap,ie=re.createTreeWalker(re,129);function yt(i,e){if(!ze(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(e):e}var dn=(i,e)=>{let t=i.length-1,n=[],r,s=e===2?"<svg>":e===3?"<math>":"",a=fe;for(let o=0;o<t;o++){let u=i[o],l,d,m=-1,x=0;for(;x<u.length&&(a.lastIndex=x,d=a.exec(u),d!==null);)x=a.lastIndex,a===fe?d[1]==="!--"?a=ft:d[1]!==void 0?a=gt:d[2]!==void 0?(_t.test(d[2])&&(r=RegExp("</"+d[2],"g")),a=ae):d[3]!==void 0&&(a=ae):a===ae?d[0]===">"?(a=r??fe,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,l=d[1],a=d[3]===void 0?ae:d[3]==='"'?bt:ht):a===bt||a===ht?a=ae:a===ft||a===gt?a=fe:(a=ae,r=void 0);let $=a===ae&&i[o+1].startsWith("/>")?" ":"";s+=a===fe?u+un:m>=0?(n.push(l),u.slice(0,m)+xt+u.slice(m)+ne+$):u+ne+(m===-2?o:$)}return[yt(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},ve=class i{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let s=0,a=0,o=e.length-1,u=this.parts,[l,d]=dn(e,t);if(this.el=i.createElement(l,n),ie.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=ie.nextNode())!==null&&u.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let m of r.getAttributeNames())if(m.endsWith(xt)){let x=d[a++],$=r.getAttribute(m).split(ne),_=/([.?@])?(.*)/.exec(x);u.push({type:1,index:s,name:_[2],strings:$,ctor:_[1]==="."?je:_[1]==="?"?De:_[1]==="@"?Ue:ce}),r.removeAttribute(m)}else m.startsWith(ne)&&(u.push({type:6,index:s}),r.removeAttribute(m));if(_t.test(r.tagName)){let m=r.textContent.split(ne),x=m.length-1;if(x>0){r.textContent=Te?Te.emptyScript:"";for(let $=0;$<x;$++)r.append(m[$],ge()),ie.nextNode(),u.push({type:2,index:++s});r.append(m[x],ge())}}}else if(r.nodeType===8)if(r.data===$t)u.push({type:2,index:s});else{let m=-1;for(;(m=r.data.indexOf(ne,m+1))!==-1;)u.push({type:7,index:s}),m+=ne.length-1}s++}}static createElement(e,t){let n=re.createElement("template");return n.innerHTML=e,n}};function de(i,e,t=i,n){if(e===be)return e;let r=n!==void 0?t._$Co?.[n]:t._$Cl,s=he(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,n)),n!==void 0?(t._$Co??=[])[n]=r:t._$Cl=r),r!==void 0&&(e=de(i,r._$AS(i,e.values),r,n)),e}var Re=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??re).importNode(t,!0);ie.currentNode=r;let s=ie.nextNode(),a=0,o=0,u=n[0];for(;u!==void 0;){if(a===u.index){let l;u.type===2?l=new xe(s,s.nextSibling,this,e):u.type===1?l=new u.ctor(s,u.name,u.strings,this,e):u.type===6&&(l=new Oe(s,this,e)),this._$AV.push(l),u=n[++o]}a!==u?.index&&(s=ie.nextNode(),a++)}return ie.currentNode=re,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},xe=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=de(this,e,t),he(e)?e===I||e==null||e===""?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==be&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ln(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&he(this._$AH)?this._$AA.nextSibling.data=e:this.T(re.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ve.createElement(yt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new Re(r,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(e){let t=vt.get(e.strings);return t===void 0&&vt.set(e.strings,t=new ve(e)),t}k(e){ze(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,r=0;for(let s of e)r===t.length?t.push(n=new i(this.O(ge()),this.O(ge()),this,this.options)):n=t[r],n._$AI(s),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=mt(e).nextSibling;mt(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ce=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,s){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=I}_$AI(e,t=this,n,r){let s=this.strings,a=!1;if(s===void 0)e=de(this,e,t,0),a=!he(e)||e!==this._$AH&&e!==be,a&&(this._$AH=e);else{let o=e,u,l;for(e=s[0],u=0;u<s.length-1;u++)l=de(this,o[n+u],t,u),l===be&&(l=this._$AH[u]),a||=!he(l)||l!==this._$AH[u],l===I?e=I:e!==I&&(e+=(l??"")+s[u+1]),this._$AH[u]=l}a&&!r&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},je=class extends ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}},De=class extends ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}},Ue=class extends ce{constructor(e,t,n,r,s){super(e,t,n,r,s),this.type=5}_$AI(e,t=this){if((e=de(this,e,t,0)??I)===be)return;let n=this._$AH,r=e===I&&n!==I||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==I&&(n===I||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Oe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){de(this,e)}};var cn=Fe.litHtmlPolyfillSupport;cn?.(ve,xe),(Fe.litHtmlVersions??=[]).push("3.3.3");var F=(i,e,t)=>{let n=t?.renderBefore??e,r=n._$litPart$;if(r===void 0){let s=t?.renderBefore??null;n._$litPart$=r=new xe(e.insertBefore(ge(),s),s,void 0,t??{})}return r._$AI(i),r};var mn=Object.keys(oe);function pn(i,e,t,n){let r=i.getState(),s=t.label||"text"in t&&t.text||oe[t.kind],a=t.bind.type!=="none"?` \xB7 ${ue[t.bind.type]}`:"",o=u=>l=>{l.stopPropagation(),i.getState().moveItem(e.id,t.id,u)};return b`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>i.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${ut[t.kind]}</span>
    <span class="ume-item-name" title=${s+a}>${s}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function fn(i,e){let t=i.getState();return b`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{let r=n.target.value;r&&t.addItem(r,e.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${mn.map(n=>b`<option value=${n}>${oe[n]}</option>`)}
  </select>`}function It(i,e){let{project:t,selection:n}=e.getState(),r=s=>{let a=e.getState(),o=n.pageId===s.id;return b`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&a.removePage(s.id)}}>✕</button>
      </div>
      ${o?b`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>pn(e,s,u,n.itemId===u.id)):b`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${fn(e,s)}</div>
      </div>`:I}
    </div>`};F(b`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>gn(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(r)}
  `,i)}function gn(i){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${i.getState().project.pages.length+1}`);e!==null&&i.getState().addPage(e||void 0)}function z(i,e,t,n=""){return b`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${e??""} placeholder=${n}
      @change=${r=>t(r.target.value)} />
  </div>`}function M(i,e,t,n=1){return b`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(e)} step=${String(n)}
      @change=${r=>{let s=parseFloat(r.target.value);t(Number.isFinite(s)?s:0)}} />
  </div>`}function X(i,e,t,n){return b`<div class="ume-field">
    <label>${i}</label>
    <select @change=${r=>n(r.target.value)}>
      ${t.map(r=>b`<option value=${r.value} ?selected=${r.value===e}>${r.label}</option>`)}
    </select>
  </div>`}function Xe(i,e,t){return b`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${n=>t(n.target.checked)} />
    <span>${i}</span>
  </div>`}function wt(i,e,t,n=!1){return b`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${r=>t(r.target.value)}>${e??""}</textarea>
  </div>`}function $e(i,e,t="text/plain"){let n=new Blob([e],{type:`${t};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=i,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}var We=null,kt={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function Ze(i,e,t,n){let r=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...t.map(a=>({value:a.id,label:`${a.name} : ${kt[a.type]??a.type}`}))],s=e?t.some(a=>a.id===e):!1;return b`
    ${X(i,e??"",r,a=>n(a||null))}
    ${e&&!s?b`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:I}
    ${t.length===0?b`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:I}
  `}function Ye(i,e){return b`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let t=i.getState().addVariable();e(t)}}>＋ 新建变量并绑定</button>
  </div>`}function Ge(i){return i?b`<div class="ume-hint">
    ${i.name} : ${kt[i.type]??i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>`:b`${I}`}function St(i,e,t){let{project:n,selection:r}=e.getState(),s=n.pages.find($=>$.id===r.pageId)??null,a=s?.items.find($=>$.id===r.itemId)??null,o=n.variables??[],u=n.chartBuffers??[],l=($,_)=>e.getState().updateItem(s.id,a.id,$,_),d=$=>l({bind:$}),m=b`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,x="";if(s&&!a)x="\u9875\u9762\u5C5E\u6027",m=b`
      ${z("\u540D\u79F0",s.name,$=>e.getState().updatePage(s.id,{name:$}))}
      ${z("C \u51FD\u6570\u540D",s.fnName,$=>e.getState().updatePage(s.id,{fnName:$}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&a){(a.bind.type==="value"||a.bind.type==="switch")&&a.bind.varId&&(We=a.bind.varId),x=`${oe[a.kind]}${a.bind.type!=="none"?` + ${ue[a.bind.type]}`:""}`;let $=b``;switch(a.kind){case"text":{let h=a,f=o.find(H=>H.id===h.displayVarId);$=b`
          ${z("\u6587\u672C/\u683C\u5F0F",h.text,H=>l({text:H},`text-${h.id}`))}
          ${X("\u5927\u5C0F",String(h.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],H=>l({scale:Number(H)}))}
          ${a.bind.type==="none"?b`
            ${Ze("\u663E\u793A\u53D8\u91CF",h.displayVarId,o,H=>l({displayVarId:H}))}
            ${f?I:Ye(e,H=>l({displayVarId:H.id}))}
            ${Ge(f)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:I}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{let h=a;$=b`
          ${a.bind.type==="none"?b`
            ${M("\u9759\u6001\u4F4D\u7F6E(%)",h.position,f=>l({position:Math.min(100,Math.max(0,Math.trunc(f)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:I}
        `;break}case"chart":{let h=a,f=C=>l({sources:C}),H=(C,U)=>{let O=u.find(L=>L.id===C.bufferId),Y=C.min===void 0||C.max===void 0;return b`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${O?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[C.chartKind]??C.chartKind}${Y?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${C.min}~${C.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>f(h.sources.filter((L,P)=>P!==U))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${X("\u7F13\u51B2\u533A",C.bufferId,u.map(L=>({value:L.id,label:`${L.name} (${L.dataLen}\u70B9)`})),L=>f(h.sources.map((P,p)=>p===U?{...P,bufferId:L}:P)))}
              ${X("\u7ED8\u5236",C.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],L=>f(h.sources.map((P,p)=>p===U?{...P,chartKind:L}:P)))}
              ${Xe("\u81EA\u52A8\u91CF\u7A0B",Y,L=>f(h.sources.map((P,p)=>p===U?{...P,min:L?void 0:0,max:L?void 0:100}:P)))}
              ${Y?I:b`
                ${M("\u91CF\u7A0B\u4E0A\u9650",C.max??100,L=>f(h.sources.map((P,p)=>p===U?{...P,max:L}:P)),"any")}
                ${M("\u91CF\u7A0B\u4E0B\u9650",C.min??0,L=>f(h.sources.map((P,p)=>p===U?{...P,min:L}:P)),"any")}`}
            </div>
          </div>`};$=b`
          ${M("\u9AD8\u5EA6(px)",h.height,C=>l({height:Math.max(4,Math.trunc(C))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(h.sources??[]).map(H)}
              ${(h.sources??[]).length===0?b`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:I}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(h.sources??[]).length>=4}
                @click=${()=>{if(!u.length){let C=e.getState().addChartBuffer();f([...h.sources??[],{bufferId:C.id,chartKind:"line"}]);return}f([...h.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(h.sources??[]).length>0?"\uFF08\u53E0\u52A0\uFF09":""}</button>
              ${u.length?I:b`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{let h=a;$=b`
          ${z("\u6570\u7EC4\u540D",h.name,f=>l({name:f}))}
          ${M("\u5BBD(px)",h.w,f=>l({w:Math.min(128,Math.max(1,Math.trunc(f)))}))}
          ${M("\u9AD8(px)",h.h,f=>l({h:Math.min(64,Math.max(1,Math.trunc(f)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(s.id,h.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${h.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let h=a;$=b`
          ${wt("\u6587\u672C\u5185\u5BB9",h.content,f=>l({content:f}))}
          ${M("\u9AD8\u5EA6(px)",h.height,f=>l({height:Math.max(10,Math.trunc(f))}))}
          ${M("\u884C\u95F4\u8DDD",h.lineSpacing,f=>l({lineSpacing:Math.max(0,Math.trunc(f))}))}
          ${Xe("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",h.bindScroll,f=>l({bindScroll:f}))}
        `;break}case"board":{let h=a;$=b`
          ${M("\u5BBD(px)",h.w,f=>l({w:Math.max(1,Math.trunc(f))}))}
          ${M("\u9AD8(px)",h.h,f=>l({h:Math.max(1,Math.trunc(f))}))}
          ${z("\u56DE\u8C03\u51FD\u6570\u540D",h.cbName,f=>l({cbName:f}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}let _=a.bind,w=b``;switch(_.type){case"none":w=b`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{let h=o.find(f=>f.id===_.varId);w=b`
          ${Ze("\u53D8\u91CF",_.varId,o,f=>d({type:"value",varId:f}))}
          ${h?I:Ye(e,f=>d({type:"value",varId:f.id}))}
          ${Ge(h)}
          ${a.kind==="text"?b`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:I}
        `;break}case"switch":{let h=o.filter(f=>f.type==="uint8").find(f=>f.id===_.varId)??o.find(f=>f.id===_.varId);w=b`
          ${Ze("\u53D8\u91CF (uint8)",_.varId,o.filter(f=>f.type==="uint8"),f=>d({type:"switch",varId:f,openValue:_.openValue,onText:_.onText,offText:_.offText}))}
          ${h?I:Ye(e,f=>d({type:"switch",varId:f.id,openValue:_.openValue,onText:_.onText,offText:_.offText}))}
          ${Ge(h)}
          ${M("openValue",_.openValue,f=>d({type:"switch",varId:_.varId,openValue:Math.max(0,Math.trunc(f)),onText:_.onText,offText:_.offText}))}
          ${z('"\u5F00"\u6587\u672C',_.onText,f=>d({type:"switch",varId:_.varId,openValue:_.openValue,onText:f,offText:_.offText}))}
          ${z('"\u5173"\u6587\u672C',_.offText,f=>d({type:"switch",varId:_.varId,openValue:_.openValue,onText:_.onText,offText:f}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":w=b`
          ${z("\u56DE\u8C03\u51FD\u6570\u540D",_.cbName,h=>d({type:"button",cbName:h,buttonId:_.buttonId}))}
          ${M("ID",_.buttonId,h=>d({type:"button",cbName:_.cbName,buttonId:Math.trunc(h)}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":w=b`
          ${X("\u76EE\u6807\u9875\u9762",_.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...n.pages.filter(h=>h.id!==s.id).map(h=>({value:h.id,label:h.name}))],h=>d({type:"submenu",targetPageId:h||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":w=b`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}m=b`
      <div class="ume-panel-title">绘制</div>
      ${$}
      <div class="ume-panel-title">附加值</div>
      ${X("\u7C7B\u578B",_.type,Object.keys(ue).map(h=>({value:h,label:ue[h]})),h=>{let f=a.bind;d(h==="value"?{type:"value",varId:f.type==="value"||f.type==="switch"?f.varId:We}:h==="switch"?{type:"switch",varId:f.type==="value"||f.type==="switch"?f.varId:We,openValue:1,onText:"on",offText:"off"}:h==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:h==="submenu"?{type:"submenu",targetPageId:f.type==="submenu"?f.targetPageId:null}:{type:"none"})})}
      ${w}
    `}F(b`
    ${x?b`<div class="ume-panel-title"><span class="ume-kind-badge">${x}</span></div>`:I}
    ${m}
  `,i)}var Ae=null,Je=null,hn=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function bn(i,e){let t=e.variables??[],n=s=>{Ae=Ae===s?null:s},r=s=>{let a=Ae===s.id,o=(m,x)=>i.getState().updateVariable(s.id,m,x),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),l=t.filter(m=>m.name===s.name).length>1,d=vn(e,s.id);return b`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${d?` \xB7 ${d} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${m=>{m.stopPropagation();let x=i.getState().removeVariable(s.id);x>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${x} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?b`<div class="ume-var-edit">
        ${z("\u53D8\u91CF\u540D",s.name,m=>o({name:m.trim()},`vn-${s.id}`))}
        ${u?b`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:I}
        ${l?b`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:I}
        ${X("\u7C7B\u578B",s.type,hn,m=>o({type:m}))}
        ${M("\u521D\u59CB\u503C",s.initialValue,m=>o({initialValue:m},`vi-${s.id}`),"any")}
        ${M("\u6700\u5C0F\u503C",s.min,m=>o({min:m},`vmin-${s.id}`),"any")}
        ${M("\u6700\u5927\u503C",s.max,m=>o({max:m},`vmax-${s.id}`),"any")}
        ${M("\u6B65\u957F",s.step,m=>o({step:m},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:I}
    </div>`};return b`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{Ae=i.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):b`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function vn(i,e){let t=0;for(let n of i.pages)for(let r of n.items)"varId"in r&&r.varId===e&&t++;return t}function xn(i,e){let t=e.chartBuffers??[],n=s=>{let a=0;for(let o of e.pages)for(let u of o.items)u.kind==="chart"&&u.sources.some(l=>l.bufferId===s)&&a++;return a},r=s=>{let a=Je===s.id,o=(d,m)=>i.getState().updateChartBuffer(s.id,d,m),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),l=n(s.id);return b`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>{Je=a?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[s.sample]}${l?` \xB7 ${l} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${d=>{d.stopPropagation();let m=i.getState().removeChartBuffer(s.id);m>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${m} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?b`<div class="ume-var-edit">
        ${z("\u6570\u7EC4\u540D",s.name,d=>o({name:d.trim()},`bn-${s.id}`))}
        ${u?b`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:I}
        ${M("\u70B9\u6570",s.dataLen,d=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(d)))},`bl-${s.id}`))}
        ${X("\u793A\u4F8B\u586B\u5145",s.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],d=>o({sample:d}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:I}
    </div>`};return b`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{Je=i.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):b`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Et(i,e){let{project:t}=e.getState();F(b`
    ${bn(e,t)}
    ${xn(e,t)}
  `,i)}function Tt(i,e){let{project:t}=e.getState(),n=(o,u)=>e.getState().update(l=>{Object.assign(l,o)},u),r=t.weakHooks??[],s=(o,u)=>{e.getState().update(l=>{let d=l.weakHooks??[];l.weakHooks=u?[...new Set([...d,o])]:d.filter(m=>m!==o)})},a=b`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${r.length}/${G.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${G.map(o=>b`
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
  `;F(b`
    <div class="ume-panel-title">工程</div>
    ${z("\u5DE5\u7A0B\u540D",t.name,o=>n({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${X("\u5B57\u4F53",t.font,Be.map(o=>({value:o.id,label:o.label})),o=>n({font:o}))}
    ${X("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],o=>n({selector:o}))}
    ${M("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,o=>n({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${M("\u9876\u8FB9\u8DDD",t.selectorTopMargin,o=>n({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${M("\u884C\u95F4\u8DDD",t.selectorLineSpacing,o=>n({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${M("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,o=>n({marqueeSpeed:o}),.05)}
    ${M("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,o=>n({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `,i)}function At(i,e){let t=r=>{let s,a=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),e.key(r),a(),s=window.setInterval(()=>e.key(r),180)},up:a}},n=(r,s,a)=>{let o=t(r);return b`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};F(b`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${r=>{let a={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[r.key];a!==void 0&&(r.preventDefault(),e.key(a))}}>
      ${e.canvas}
    </div>
    <div class="ume-keybar">
      ${n(1,"\u25B2","\u4E0A MENU_Key_Up")}
      ${n(2,"\u25BC","\u4E0B MENU_Key_Down")}
      ${n(3,"OK","\u786E\u8BA4 MENU_Key_Enter")}
      ${n(4,"\u232B","\u8FD4\u56DE MENU_Key_Return")}
      ${n(5,"\uFF0B","\u52A0 MENU_Key_Add")}
      ${n(6,"\uFF0D","\u51CF MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,i)}var se=null;function Pt(i,e){se=e,i.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),$n(i)}function $n(i){if(!se)return;let e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",t=>{t.target===e&&Mt(e)}),F(b`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Mt(e)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${se.warnings.length?b`
          <div style="margin-bottom:8px">
            ${se.warnings.map(t=>b`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:I}
        <div class="ume-code-view">${se.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(se.c).then(()=>_n(e,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{$e("menu_pages.c",se.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,e),i.appendChild(e)}function Mt(i){i.remove()}function _n(i,e){let t=i.closest(".ume")??document.body,n=t.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",t.appendChild(n)),n.textContent=e,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function Vt(i,e,t,n){let a=e.getState().project.pages.find(p=>p.id===t)?.items.find(p=>p.id===n);if(!a||a.kind!=="xbm")return;let o=a,u=o.w,l=o.h,d=[...o.bits],m=()=>Math.ceil(u/8),x=document.createElement("div");x.className="ume-modal-mask",x.addEventListener("click",p=>{p.target===x&&P()});let $=(p,V)=>{let R=V*m()+(p>>3);return R<d.length?!!(d[R]>>(p&7)&1):!1},_=(p,V,R)=>{let c=V*m()+(p>>3);d[c]=R?d[c]|1<<(p&7):d[c]&~(1<<(p&7))},w=(p,V)=>{let R=Math.ceil(u/8),c=Math.ceil(p/8),y=new Array(c*V).fill(0);for(let g=0;g<Math.min(l,V);g++)for(let k=0;k<Math.min(u,p);k++){let S=g*R+(k>>3);S<d.length&&d[S]>>(k&7)&1&&(y[g*c+(k>>3)]|=1<<(k&7))}u=p,l=V,d=y},h=!1,f=!0,H=(p,V)=>R=>{R.preventDefault(),h=!0,f=!$(p,V),_(p,V,f),O()},C=(p,V)=>()=>{h&&(_(p,V,f),O())},U=()=>{h=!1},O=()=>{F(L(),x)},Y=()=>{let p=[];for(let V=0;V<l;V++)for(let R=0;R<u;R++)p.push(b`<button class="ume-xbm-cell ${$(R,V)?"on":""}"
          data-x=${R} data-y=${V}
          @pointerdown=${H(R,V)}
          @pointerenter=${C(R,V)}></button>`);return p},L=()=>b`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${l}</span></span>
        <button class="ume-mini" @click=${P}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${U}
        @pointerleave=${U}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${p=>{w(Ct(+p.target.value,1,128),l),O()}} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${p=>{w(u,Ct(+p.target.value,1,64)),O()}} />
          <button class="ume-btn sm" @click=${()=>{d=d.map(()=>0),O()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{d=d.map(p=>~p&255),O()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${Y()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${P}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,n,{w:u,h:l,bits:[...d]}),P()}}>应用</button>
      </div>
    </div>
  `;function P(){x.remove(),document.removeEventListener("pointerup",U)}document.addEventListener("pointerup",U),O(),i.appendChild(x)}function Ct(i,e,t){return Number.isFinite(i)?Math.min(t,Math.max(e,Math.trunc(i))):e}var yn="prebuilt/u8g2-menu-preview.js",Qe=class{constructor(e,t={}){this.store=Ne();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let l=document.createElement("style");l.id="ume-style",l.textContent=tt,document.head.appendChild(l)}let n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??n??void 0;if(r!==void 0)try{this.store.setState({project:ke(r)})}catch(l){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",l)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),e.innerHTML=`
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
    `;let a=l=>e.querySelector(l);this.els={left:a(".ume-left"),center:a(".ume-center"),right:a(".ume-right"),propEl:a('[data-role="prop"]'),resEl:a('[data-role="res"]'),setEl:a('[data-role="set"]'),toolbarUndo:a('[data-act="undo"]'),toolbarRedo:a('[data-act="redo"]')};let o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new Se(o,{onPageChanged:l=>this.onPreviewPageChanged(l)});let u=document.createElement("div");this.els.center.appendChild(u),At(u,this.preview),this.preview.load(this.opts.wasmUrl??yn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(l=>{console.error(l);let d=document.createElement("div");d.className="ume-warn",d.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${l.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(d)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let l=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);l!==null&&this.store.getState().addPage(l||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{$e(`${this.store.getState().project.name||"menu-project"}.json`,Le(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{a('[data-role="file"]').click()}),a('[data-role="file"]').addEventListener("change",l=>{let d=l.target.files?.[0];d&&(d.text().then(m=>{try{let x=ke(m);this.store.getState().update($=>{Object.assign($,x)}),this.scheduleRender()}catch(x){alert(`\u5BFC\u5165\u5931\u8D25: ${x.message}`)}}),l.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=ke(e);this.store.getState().update(n=>{Object.assign(n,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.lastExport,t=He(this.store.getState().project,e??void 0);return this.lastExport={c:t.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,t.c),Pt(this.container,t),this.opts.onExport?.(t),t}downloadC(){let e=He(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:e.c},$e("menu_pages.c",e.c)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Le(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();It(this.els.left,this.store),Tt(this.els.setEl,this.store),Et(this.els.resEl,this.store),St(this.els.propEl,this.store,{openXbmEditor:(t,n)=>Vt(this.container,this.store,t,n)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),t=document.getElementById("ume-page-jump"),n=this.store.getState(),r=this.store.getState().project.pages.findIndex(s=>s.id===n.selection.pageId);if(t){let s=n.project.pages,a=s.map(u=>u.name).join("|");t.dataset.sig!==a&&(t.dataset.sig=a,t.innerHTML="",s.forEach((u,l)=>{let d=document.createElement("option");d.value=String(l),d.textContent=`${l+1}. ${u.name}`,t.appendChild(d)}),t.onchange=()=>{let u=parseInt(t.value,10);Number.isFinite(u)&&this.preview.navTo(u)});let o=this.preview.currentPage;document.activeElement!==t&&t.value!==String(o)&&(t.value=String(o))}if(e&&r>=0&&n.selection.itemId){let s=n.project.pages[r],a=s.items.findIndex(x=>x.id===n.selection.itemId),o=s.items[a],u=o?.bind,l=u?.type==="value"||u?.type==="switch"?u.varId:null,d=o?.kind==="text"&&u?.type==="none"?o.displayVarId:null,m=l??d;if(o&&m){let x=(n.project.variables??[]).findIndex(f=>f.id===m),$=x>=0?x:r*64+a,w=u?.type==="switch"?this.preview.getSwitch($):this.preview.getInt($),h=(n.project.variables??[]).find(f=>f.id===m)?.name;e.textContent=`${h??o.kind} = ${w}`}else e.textContent=""}}};return jt(In);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
