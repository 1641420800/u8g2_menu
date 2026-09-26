"use strict";var U8G2MenuEditor=(()=>{var Ce=Object.defineProperty;var Bt=Object.getOwnPropertyDescriptor;var Lt=Object.getOwnPropertyNames;var Vt=Object.prototype.hasOwnProperty;var Ht=(n,e)=>{for(var t in e)Ce(n,t,{get:e[t],enumerable:!0})},Kt=(n,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Lt(e))!Vt.call(n,i)&&i!==t&&Ce(n,i,{get:()=>e[i],enumerable:!(r=Bt(e,i))||r.enumerable});return n};var Rt=n=>Kt(Ce({},"__esModule",{value:!0}),n);var $n={};Ht($n,{MenuEditor:()=>tt,MenuKey:()=>Ee});var rt=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;var at=n=>{let e,t=new Set,r=(d,o)=>{let m=typeof d=="function"?d(e):d;if(!Object.is(m,e)){let f=e;e=o??(typeof m!="object"||m===null)?m:Object.assign({},e,m),t.forEach(b=>b(e,f))}},i=()=>e,u={setState:r,getState:i,getInitialState:()=>l,subscribe:d=>(t.add(d),()=>t.delete(d))},l=e=n(r,i,u);return u},it=n=>n?at(n):at;var Ne=0;function K(n){return Ne=(Ne+1)%1e9,`${n}_${Date.now().toString(36)}_${Ne.toString(36)}`}function de(n){return{id:K("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...n}}function Le(n){return{id:K("buf"),name:"buf_new",dataLen:32,sample:"sine",...n}}function st(n,e){let t=new Set(n.map(i=>i.name));if(!t.has(e))return e;let r=2;for(;t.has(`${e}_${r}`);)r++;return`${e}_${r}`}function ot(n,e){let t=new Set(n.map(i=>i.name));if(!t.has(e))return e;let r=2;for(;t.has(`${e}_${r}`);)r++;return`${e}_${r}`}function j(n){let e={id:K("it"),label:""};switch(n){case"text":return{...e,kind:n,text:"\u83DC\u5355\u9879",scale:1};case"number":return{...e,kind:n,text:"v:%d",scale:1,varId:null,editable:!0};case"switch":return{...e,kind:n,text:"s:%s",scale:1,varId:null,openValue:1,onText:"on",offText:"off"};case"button":return{...e,kind:n,text:"\u6267\u884C\u64CD\u4F5C",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...e,kind:n,text:"\u4E0B\u4E00\u7EA7",scale:1,targetPageId:null};case"back":return{...e,kind:n,text:"\u8FD4\u56DE",scale:1};case"slider":return{...e,kind:n,varId:null};case"progress":return{...e,kind:n,varId:null};case"chart":return{...e,kind:n,sources:[],height:32};case"xbm":return jt(16,16);case"textarea":return{...e,kind:n,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:n,w:64,h:32,cbName:"board_cb"}}}function jt(n,e){let t=Math.ceil(n/8);return{id:K("it"),kind:"xbm",label:"",name:"icon",w:n,h:e,bits:new Array(t*e).fill(0)}}function Be(n){return{id:K("pg"),name:n,fnName:"",items:[],userCodePre:""}}function J(n,e){return{...n,...e}}function ut(){let n=[de({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),de({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),de({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[Le({name:"buf_demo",dataLen:32,sample:"sine"})],t=Be("\u4E3B\u9875");t.items=[J(j("text"),{text:"u8g2_menu"}),J(j("submenu"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E"}),J(j("button"),{text:"\u5173\u4E8E",cbName:"btn_about_cb"})];let r=Be("\u8BBE\u7F6E");r.items=[J(j("number"),{text:"\u97F3\u91CF:%d",varId:n[0].id}),J(j("switch"),{text:"\u5F00\u5173:%s",varId:n[1].id}),J(j("slider"),{varId:n[2].id}),J(j("submenu"),{text:"\u56FE\u8868"}),j("back")];let i=Be("\u56FE\u8868");i.items=[J(j("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),j("back")];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:n,chartBuffers:e,pages:[t,r,i]};return t.items[1].targetPageId=r.id,r.items[3].targetPageId=i.id,s}function lt(n){return structuredClone(n)}var Dt=800;function Ve(){let n=null,e=0;return it()((t,r)=>({project:ut(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(i,s)=>{let a=Date.now(),u=!!s&&s===n&&a-e<Dt;n=s??null,e=a,t(l=>{let d=lt(l.project);return i(d),{project:d,dirty:!0,past:u?l.past:[...l.past.slice(-99),l.project],future:[]}})},undo:()=>{t(i=>i.past.length?{project:i.past[i.past.length-1],past:i.past.slice(0,-1),future:[i.project,...i.future.slice(0,99)],dirty:!0}:i)},redo:()=>{t(i=>{if(!i.future.length)return i;let[s,...a]=i.future;return{project:s,past:[...i.past,i.project],future:a,dirty:!0}})},select:(i,s=null)=>t({selection:{pageId:i,itemId:s}}),addPage:i=>{let s={id:K("pg"),name:i??`\u9875\u9762${r().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return r().update(a=>{a.pages.push(s)}),t({selection:{pageId:s.id,itemId:null}}),s},removePage:i=>{r().update(a=>{a.pages=a.pages.filter(u=>u.id!==i);for(let u of a.pages)for(let l of u.items)l.kind==="submenu"&&l.targetPageId===i&&(l.targetPageId=null)});let{selection:s}=r();s.pageId===i&&t({selection:{pageId:null,itemId:null}})},movePage:(i,s)=>{r().update(a=>{let u=a.pages.findIndex(d=>d.id===i),l=u+s;u<0||l<0||l>=a.pages.length||([a.pages[u],a.pages[l]]=[a.pages[l],a.pages[u]])})},updatePage:(i,s)=>{r().update(a=>{let u=a.pages.find(l=>l.id===i);u&&Object.assign(u,s)})},addItem:(i,s)=>{let a=s??r().selection.pageId??r().project.pages[0]?.id;if(!a)return null;let u=Ut(i);return r().update(l=>{l.pages.find(o=>o.id===a)?.items.push(u)}),t({selection:{pageId:a,itemId:u.id}}),u},removeItem:(i,s)=>{r().update(u=>{let l=u.pages.find(d=>d.id===i);l&&(l.items=l.items.filter(d=>d.id!==s))});let{selection:a}=r();a.itemId===s&&t({selection:{pageId:i,itemId:null}})},moveItem:(i,s,a)=>{r().update(u=>{let l=u.pages.find(m=>m.id===i);if(!l)return;let d=l.items.findIndex(m=>m.id===s),o=d+a;d<0||o<0||o>=l.items.length||([l.items[d],l.items[o]]=[l.items[o],l.items[d]])})},duplicateItem:(i,s)=>{let a=null;r().update(u=>{let l=u.pages.find(o=>o.id===i);if(!l)return;let d=l.items.findIndex(o=>o.id===s);d<0||(a=structuredClone(l.items[d]),a.id=K("it"),l.items.splice(d+1,0,a))}),a&&t({selection:{pageId:i,itemId:a.id}})},updateItem:(i,s,a,u)=>{r().update(l=>{let o=l.pages.find(m=>m.id===i)?.items.find(m=>m.id===s);o&&Object.assign(o,a)},u)},addVariable:i=>{let s=null;return r().update(a=>{a.variables=a.variables??[];let u=ot(a.variables,i?.name??"var_new");s=de({...i,name:u}),a.variables.push(s)}),s},removeVariable:i=>{let s=0;for(let a of r().project.pages)for(let u of a.items)"varId"in u&&u.varId===i&&s++;return s>0?s:(r().update(a=>{a.variables=(a.variables??[]).filter(u=>u.id!==i)}),0)},updateVariable:(i,s,a)=>{r().update(u=>{let l=(u.variables??[]).find(d=>d.id===i);l&&Object.assign(l,s)},a)},addChartBuffer:i=>{let s=null;return r().update(a=>{a.chartBuffers=a.chartBuffers??[];let u=st(a.chartBuffers,i?.name??"buf_new");s=Le({...i,name:u}),a.chartBuffers.push(s)}),s},removeChartBuffer:i=>{let s=0;for(let a of r().project.pages)for(let u of a.items)u.kind==="chart"&&u.sources.some(l=>l.bufferId===i)&&s++;return s>0?s:(r().update(a=>{a.chartBuffers=(a.chartBuffers??[]).filter(u=>u.id!==i)}),0)},updateChartBuffer:(i,s,a)=>{r().update(u=>{let l=(u.chartBuffers??[]).find(d=>d.id===i);l&&Object.assign(l,s)},a)}}))}var En=Ve();function Ut(n){return j(n)}var W=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],se={text:"\u6587\u672C",number:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE\u4E0A\u7EA7",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},mt={text:"T",number:"#",switch:"\u25C9",button:"\u23CE",submenu:"\u2192",back:"\u2190",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},He=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var Z=class extends Error{},dt=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),Ot=new Set(["line","point","bar"]),ct=new Set(["sine","ramp","noise","none"]);function ce(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function V(n,e){return typeof n=="string"?n:e}function S(n,e){return typeof n=="number"&&Number.isFinite(n)?n:e}var Ft=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function zt(n){if(!ce(n))throw new Z("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=n.kind;if(typeof e!="string"||!Ft.includes(e))throw new Z(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(n);switch(t.id=V(n.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=V(n.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=V(n.text,""),t.scale=n.scale===2?2:1;break}return t}function qt(n){if(!ce(n))throw new Z("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(n.items)?n.items.map(zt):[];return{id:V(n.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:V(n.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:V(n.fnName,""),items:e,userCodePre:V(n.userCodePre,"")}}function Xt(n){if(!ce(n))return null;let e=V(n.type,"int32");return{id:V(n.id,"")||K("vb"),name:V(n.name,""),type:dt.has(e)?e:"int32",initialValue:S(n.initialValue,0),min:S(n.min,0),max:S(n.max,100),step:S(n.step,1)}}function Wt(n){if(!ce(n))return null;let e=V(n.sample,"sine");return{id:V(n.id,"")||K("buf"),name:V(n.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(S(n.dataLen,32)))),sample:ct.has(e)?e:"sine"}}function Zt(n){let e=new Map,t=[],r=(i,s)=>{let a=e.get(i);return a||(a=s(),e.set(i,a),t.push(a)),a};for(let i of n)for(let s of i.items){let a=s;switch(s.kind){case"number":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=r(u,()=>({id:K("vb"),name:u,type:dt.has(String(a.varType))?String(a.varType):"int32",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));s.varId=l.id}a.editable===void 0&&(s.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=r(u,()=>({id:K("vb"),name:u,type:"int",initialValue:S(a.initialValue,0),min:S(a.min,0),max:S(a.max,100),step:S(a.step,1)}));s.varId=l.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=r(u,()=>({id:K("vb"),name:u,type:"uint8",initialValue:S(a.initialValue,0),min:0,max:1,step:1}));s.varId=l.id}delete a.varName,delete a.initialValue;break;default:break}}return t}function ke(n){let e;if(typeof n=="string")try{e=JSON.parse(n)}catch{throw new Z("JSON \u89E3\u6790\u5931\u8D25")}else e=n;if(!ce(e))throw new Z("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,r=S(t.version,0);if(r>1)throw new Z(`\u5DE5\u7A0B\u7248\u672C v${r} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);r<1&&void 0;let i=Array.isArray(t.pages)?t.pages.map(qt):[];if(!i.length)throw new Z("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",a=new Set(W.map(o=>o.fn)),u=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(o=>typeof o=="string"&&a.has(o)))]:[],l;Array.isArray(t.variables)?l=t.variables.map(Xt).filter(o=>!!o):l=Zt(i);let d;return Array.isArray(t.chartBuffers)?d=t.chartBuffers.map(Wt).filter(o=>!!o):d=Gt(i),{version:1,name:V(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:S(t.width,128),height:S(t.height,64),font:V(t.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:S(t.selectorLeftMargin,16),selectorTopMargin:S(t.selectorTopMargin,0),selectorLineSpacing:S(t.selectorLineSpacing,0),marqueeSpeed:S(t.marqueeSpeed,.2),marqueeHeaderLen:S(t.marqueeHeaderLen,5),weakHooks:u,variables:l,chartBuffers:d,pages:i}}function Gt(n){let e=[],t=0,r=()=>{let i={id:K("buf"),name:`buf_chart_${++t}`,dataLen:32,sample:"sine"};return e.push(i),i};for(let i of n)for(let s of i.items){if(s.kind!=="chart")continue;let a=s;if(Array.isArray(a.sources))continue;let u=r();u.dataLen=Math.min(512,Math.max(2,Math.trunc(S(a.dataLen,32))));let l=V(a.sample,"sine");ct.has(l)&&(u.sample=l);let d=V(a.chartKind,"line"),o={bufferId:u.id,chartKind:Ot.has(d)?d:"line"};a.max!==void 0&&a.max!==null&&(o.max=S(a.max,0)),a.min!==void 0&&a.min!==null&&(o.min=S(a.min,0)),s.sources=[o],a.height===void 0&&(s.height=32),delete a.chartKind,delete a.dataLen,delete a.sample,delete a.max,delete a.min}return e}function Ke(n){return JSON.stringify(n,null,2)}var Yt={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function G(n,e="anon"){let t=n.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function pe(n){return n.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function Q(n){if(!Number.isFinite(n))return"0.0f";let e=n.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function Jt(n,e,t){return t==="ramp"?`${n}[i] = (float)i;`:t==="noise"?`${n}[i] = (float)((i * 37) % ${e});`:`${n}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function Qt(n){let e=new Map;if(!n)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,r;for(;(r=t.exec(n))!==null;)e.set(r[1],r[2]);return e}function O(n,e,t){let r=e.has(n)?e.get(n):"";return`${t}/* USER CODE BEGIN ${n} */${r}${t}/* USER CODE END ${n} */`}var en=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function Re(n,e){let t=[],r=Qt(e?.c??""),i=n.pages.map((c,$)=>c.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.fnName)?c.fnName:`page_${$}`),s=new Map,a=new Map;for(let c of n.variables??[]){if(!c.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}if(s.has(c.name)){t.push(`\u53D8\u91CF\u540D "${c.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.name)||t.push(`\u53D8\u91CF\u540D "${c.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${G(c.name)}"`);let $=G(c.name,"var"),g=c.type==="float"||c.type==="double",I={name:$,srcType:c.type,type:Yt[c.type],init:g?Q(c.initialValue):String(Math.trunc(c.initialValue)),isFloat:g,step:c.step,min:c.min,max:c.max};s.set($,I),a.set(c.id,I)}let u=new Map,l=new Set,d=[],o=new Map;for(let c of n.chartBuffers??[]){if(!c.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");continue}let $=G(c.name,"buf");if([...o.values()].some(_=>_.name===$)){t.push(`\u7F13\u51B2\u533A\u540D "${c.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let g=Math.max(2,Math.trunc(c.dataLen)),I=`${$.toUpperCase()}_LEN`;o.set(c.id,{name:$,lenMacro:I,len:g});let E=`fill_${$}`,v=(r.get(E)??"").trim()!=="";d.push(`#define ${I} ${g}`,`static float ${$}[${I}];`,`static uint8_t ${$}_filled = 0;`,`static void ${$}_fill(void)`,"{",O(E,r,"    "),...c.sample!=="none"&&!v?[`    for (uint16_t i = 0; i < ${I}; ++i) { ${Jt($,g,c.sample)} }`]:[],"}")}let m=[],f=new Map,b=new Map,x=new Map;{let c=0,$=0,g=I=>{let E=o.get(I);return E?(x.has(I)||x.set(I,`        if (!${E.name}_filled) { ${E.name}_filled = 1; ${E.name}_fill(); }`),x.get(I)):""};for(let I of n.pages)for(let E of I.items){if(E.kind!=="chart")continue;let v=E.sources.filter(C=>o.has(C.bufferId));if(E.sources.length&&!v.length){t.push(`\u9875\u9762 ${I.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!v.length){t.push(`\u9875\u9762 ${I.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let _=Math.max(4,Math.trunc(E.height)),k=[];for(let C of v){let N=o.get(C.bufferId),z=`chart${c++}`;m.push(`static float ${z}_dis[${N.lenMacro}];`,`static u8g2_chart_t ${z};`),k.push({name:z,s:C,b:N})}if(k.length===1){let{name:C,s:N,b:z}=k[0];m.push(`static uint8_t ${C}_inited = 0;`),f.set(E.id,[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`,`        u8g2_chart_init(&${C}, ${z.name}, ${C}_dis, ${z.lenMacro});`,g(N.bufferId),"    }"]);let X=N.chartKind==="point"?"Point":N.chartKind==="bar"?"Bar":"Line",ye=N.min!==void 0&&N.max!==void 0?`${Q(N.max)}, ${Q(N.min)}`:"0, 0";b.set(E.id,`    u8g2_MenuDrawItem${X}Chart(&${C}, ${_}, ${ye});`)}else{let C=`chart_layers_${$++}`;m.push(`static u8g2_menu_drawChart_t ${C}[${k.length}];`,`static uint8_t ${C}_inited = 0;`);let N=[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`];k.forEach(({name:z,s:X,b:ye},we)=>{N.push(`        u8g2_chart_init(&${z}, ${ye.name}, ${z}_dis, ${ye.lenMacro});`),N.push(g(X.bufferId));let Nt=X.chartKind==="point"?"u8g2_drawPointChart":X.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",nt=X.min!==void 0&&X.max!==void 0?`${Q(X.max)}, ${Q(X.min)}`:"0, 0";N.push(`        ${C}[${we}].drawChart = ${Nt};`),N.push(`        ${C}[${we}].chart = &${z};`),N.push(`        ${C}[${we}].max = ${nt.split(", ")[0]};`),N.push(`        ${C}[${we}].min = ${nt.split(", ")[1]};`)}),N.push("    }"),f.set(E.id,N),b.set(E.id,`    u8g2_MenuDrawItemChart(${C}, ${k.length}, ${_});`)}}}let R=[],q=[],F=[],M=new Set,P=new Map,H=0;for(let c of n.pages)for(let $ of c.items)switch($.kind){case"button":{let g=G($.cbName,"btn_cb");u.has(g)||u.set(g,$.buttonId);break}case"board":l.add(G($.cbName,"board_cb"));break;case"xbm":{let g=G($.name,"icon");for(;M.has(g);)g=`${g}_2`;M.add(g),P.set($.id,g);let I=$.bits.length,E=$.bits.map(v=>`0x${(v&255).toString(16).padStart(2,"0")}`).join(", ");R.push(`static const uint8_t menu_xbm_${g}[${I}] = { ${E} };`);break}case"textarea":{let g=H++;q.push(`static char ta${g}_text[] = "${pe($.content)}";`,`static u8g2_menu_textArea_t ta${g};`,`static uint8_t ta${g}_inited = 0;`),F.push(`    if (!ta${g}_inited) {`,`        ta${g}_inited = 1;`,`        u8g2_textArea_init(&ta${g}, ta${g}_text);`,`        u8g2_textArea_setLineSpacing(&ta${g}, ${Math.max(0,Math.trunc($.lineSpacing))});`,"    }");break}default:break}let L=(c,$)=>{if(!c)return"";let g=`"${pe(c)}"`;return $===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${g});`:`u8g2_MenuUTF8Printf(${g});`},$e=(c,$,g)=>{let I=`"${pe(c)}"`;return $===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${I}, ${g});`:`u8g2_MenuUTF8Printf(${I}, ${g});`},Pe=0,ie=(c,$)=>{let g=[],I=`${$.name}`,E=v=>{if(!v)return null;let _=a.get(v);return _||t.push(`\u9875\u9762 ${I} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),_??null};switch(c.kind){case"text":{let v=L(c.text,c.scale);v&&g.push(`    ${v}`);break}case"number":{let v=c,_=E(v.varId);if(_&&v.editable!==!1){let k=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Q(_.step)}, ${Q(_.min)}, ${Q(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;g.push(`    ${k}`)}if(_)g.push(`    ${$e(v.text,v.scale,_.name)}`),v.editable!==!1&&!/%[-+ #0]*[a-zA-Z]/.test(v.text)&&t.push(`\u6570\u503C\u6761\u76EE "${I}" \u7684\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(/%[-+ #0]*[a-zA-Z]/.test(v.text)){t.push(`\u9875\u9762 ${I} \u7684\u6570\u503C\u6761\u76EE\u672A\u7ED1\u5B9A\u53D8\u91CF\u4F46\u6587\u672C\u542B\u5360\u4F4D\u7B26\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let k=L(v.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),v.scale);k&&g.push(`    ${k}`)}else{let k=L(v.text,v.scale);k&&g.push(`    ${k}`)}break}case"switch":{let v=c,_=E(v.varId);if(_){if(_.srcType!=="uint8"){t.push(`\u5F00\u5173\u6761\u76EE\u7ED1\u5B9A\u7684\u53D8\u91CF "${_.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${_.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`);let k=L(v.text,v.scale);k&&g.push(`    ${k}`);break}g.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(v.openValue)});`),g.push(`    ${$e(v.text,v.scale,`${_.name} ? "${pe(v.onText)}" : "${pe(v.offText)}"`)}`),/%[-+ #0]*s/.test(v.text)||t.push(`\u5F00\u5173\u6761\u76EE "${_.name}" \u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off`)}else{let k=L(v.text,v.scale);k&&g.push(`    ${k}`)}break}case"button":{let v=G(c.cbName,"btn_cb");g.push(`    u8g2_MenuItem_button(${v}, ${Math.trunc(c.buttonId)});`);let _=L(c.text,c.scale);_&&g.push(`    ${_}`);break}case"submenu":{if(!c.targetPageId){t.push(`\u9875\u9762 ${I} \u7684\u5B50\u9875\u9762\u6761\u76EE "${c.text||c.label||c.id}" \u672A\u6307\u5B9A\u76EE\u6807\u9875\u9762\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let k=L(c.text,c.scale);k&&g.push(`    ${k}`);break}let v=n.pages.findIndex(k=>k.id===c.targetPageId);if(v<0){t.push(`\u9875\u9762 ${I} \u7684\u5B50\u9875\u9762\u6761\u76EE\u76EE\u6807\u65E0\u6548`);break}g.push(`    u8g2_MenuItem_menu_enter(${i[v]});`);let _=L(c.text,c.scale);_&&g.push(`    ${_}`);break}case"back":{g.push("    u8g2_MenuItem_menu_back();");let v=L(c.text,c.scale);v&&g.push(`    ${v}`);break}case"slider":case"progress":{let v=E(c.varId);if(!v){t.push(`\u9875\u9762 ${I} \u7684${c.kind==="slider"?"\u6ED1\u5757":"\u8FDB\u5EA6"}\u6761\u76EE\u672A\u7ED1\u5B9A\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7`);break}if(!en.has(v.srcType)){t.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u7ED1\u5B9A\u7684\u53D8\u91CF "${v.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${v.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);break}let _=c.kind==="slider"?"Slider":"ProgressBar";g.push(`    u8g2_MenuDrawItem${_}_bind(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`);break}case"chart":{let v=f.get(c.id),_=b.get(c.id);if(!v||!_)break;g.push(...v),g.push(_);break}case"xbm":g.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${P.get(c.id)??G(c.name,"icon")});`);break;case"textarea":{let v=Pe++;g.push(...F[v].split(`
`));let _=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";g.push(`    ${_}(&ta${v}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{let v=G(c.cbName,"board_cb");g.push(`    u8g2_MenuDrawItemBoard(${v}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return g},p=[];p.push("/**"),p.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${n.name}`),p.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),p.push(" */"),p.push('#include "menu_pages.h"'),p.push('#include "u8g2_menu.h"'),(n.chartBuffers??[]).some(c=>c.sample==="sine")&&p.push("#include <math.h>"),p.push(""),p.push(O("includes",r,"")),p.push(""),p.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),p.push(O("variables",r,""));for(let c of s.values())p.push(`${c.type} ${c.name} = ${c.init};`);if(p.push(""),(d.length||m.length||q.length||R.length)&&(p.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),p.push(...d,...m,...q,...R),p.push("")),u.size||l.size){p.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),p.push(O("callbacks",r,""));for(let[c]of u)p.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID)`),p.push("{"),p.push(O(`cb_${c}`,r,"    ")),p.push("}"),p.push("");for(let c of l)p.push(`void ${c}(u8g2_t *u8g2)`),p.push("{"),p.push(O(`cb_${c}`,r,"    ")),p.push("}"),p.push("")}let T=(n.weakHooks??[]).map(c=>W.find($=>$.fn===c)).filter(c=>!!c);if(T.length||r.has("weak")||W.some(c=>(r.get(`weak_${c.fn}`)??"").trim())){p.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),p.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),p.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let $=W.filter(g=>!n.weakHooks?.includes(g.fn)&&(r.get(`weak_${g.fn}`)??"").trim()).map(g=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${g.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${g.decl}`,"{",O(`weak_${g.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);p.push($?`${O("weak",r,"").replace(/\n$/,"")}
${$}
`:O("weak",r,"")),p.push("");for(let g of T){p.push(`/* ${g.label}: ${g.desc} */`),p.push(`${g.decl}`),p.push("{"),p.push(O(`weak_${g.fn}`,r,"    "));let I=g.bodyArgs.split(`
`).map(E=>`    ${E}`);g.retNote&&I.push(`    ${g.retNote}`),p.push(...I),p.push("}"),p.push("")}}p.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),p.push(""),n.pages.forEach((c,$)=>{p.push(`/* \u9875\u9762: ${c.name} */`),p.push(`void ${i[$]}(void)`),p.push("{"),p.push(O(`page_${i[$]}_pre`,r,"    "));for(let g of c.items)p.push(...ie(g,c));p.push("}"),p.push("")});let w=[];if(w.push("#ifndef MENU_PAGES_H"),w.push("#define MENU_PAGES_H"),w.push(""),w.push('#include "u8g2_menu.h"'),w.push(""),w.push("/* \u9875\u9762\u5165\u53E3\u3002\u9996\u4E2A\u9875\u9762\u4F5C\u4E3A u8g2_CreateMenu \u7684\u521D\u59CB\u9875\u9762\u3002 */"),i.forEach((c,$)=>w.push(`void ${c}(void);   /* ${n.pages[$].name} */`)),w.push(""),s.size){w.push("/* \u53EF\u7F16\u8F91\u53D8\u91CF\uFF08\u5728\u6761\u76EE\u7ED1\u5B9A\u4E2D\u4F7F\u7528\uFF09 */");for(let c of s.values())w.push(`extern ${c.type} ${c.name};`);w.push("")}if(u.size||l.size){w.push("/* \u7528\u6237\u56DE\u8C03 */");for(let[c]of u)w.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(let c of l)w.push(`void ${c}(u8g2_t *u8g2);`);w.push("")}w.push("#endif /* MENU_PAGES_H */");let Y=p.join(`
`).replace(/\n{3,}/g,`


`),_e=w.join(`
`);return{c:`${Y}
`,h:`${_e}
`,warnings:t}}function je(n,e){return e?n.get(e)??null:null}var Ee=(u=>(u[u.None=0]="None",u[u.Up=1]="Up",u[u.Down=2]="Down",u[u.Enter=3]="Enter",u[u.Return=4]="Return",u[u.Add=5]="Add",u[u.Sub=6]="Sub",u))(Ee||{});var tn=128*64/8;function nn(n){return new Promise((e,t)=>{let r=document.createElement("script");r.src=n,r.onload=()=>e(),r.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${n}`)),document.head.appendChild(r)})}var Se=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.lastKnownPage=0;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await nn(e);let r=t.U8G2MenuPreview;if(!r)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await r({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let i=this.mod._em_font_count_export();for(let s=0;s<i;s++){let a=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(a),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(t=>`${t.name}|${t.dataLen}|${t.sample}`),pages:e.pages.map(t=>({n:t.items.length,k:t.items.map(r=>r.kind).join(","),res:t.items.map(r=>r.kind==="chart"?(r.sources??[]).map(i=>`${i.bufferId}|${i.chartKind}|${i.min??"a"}|${i.max??"a"}`).join(">"):r.kind==="xbm"?`${r.w}x${r.h}`:r.kind==="textarea"?Math.ceil(r.content.length/64):"").join(",")}))})}sync(e){let t=this.mod;if(!t)return;let r=this.signature(e);r!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=r);let i=l=>Math.trunc(Number.isFinite(l)?l:0),s=l=>l?(e.variables??[]).findIndex(d=>d.id===l):-1,a=new Map((e.variables??[]).map(l=>[l.id,l]));(e.chartBuffers??[]).forEach((l,d)=>{t.ccall("em_buf_define",null,["number","number","number"],[d,i(l.dataLen),{sine:0,ramp:1,noise:2,none:3}[l.sample]])});let u=l=>(e.chartBuffers??[]).findIndex(d=>d.id===l);e.pages.forEach((l,d)=>{t.ccall("em_page_begin",null,["number"],[d]),l.items.forEach((o,m)=>{let f=["number","number"];switch(o.kind){case"text":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,0,0,o.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,o.text]);break;case"number":{let b=je(a,o.varId);t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,1,b?{uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[b.type]:0,o.scale,0,0,0,0,0,b?i(b.initialValue):0,b?i(b.step):0,b?i(b.min):0,b?i(b.max):0,-1,0,0,0,0,o.editable===!1?1:0,s(o.varId)]),t.ccall("em_item_text",null,["number","number","string"],[d,m,o.text]);break}case"switch":{let b=je(a,o.varId);t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,2,0,o.scale,0,0,i(o.openValue),0,0,b?i(b.initialValue):0,0,0,0,-1,0,0,0,0,0,s(o.varId)]),t.ccall("em_item_text",null,["number","number","string"],[d,m,o.text]),t.ccall("em_item_swtext",null,["number","number","string","string"],[d,m,o.onText,o.offText]);break}case"button":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,3,0,o.scale,0,0,0,i(o.buttonId),0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,o.text]);break;case"submenu":{let b=e.pages.findIndex(x=>x.id===o.targetPageId);t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,4,0,o.scale,0,0,0,0,0,0,0,0,0,b,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,o.text]);break}case"back":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,5,0,o.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,o.text]);break;case"slider":case"progress":{let b=je(a,o.varId),x=o.kind==="slider"?5:6;t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,x,0,1,0,0,0,0,0,b?i(b.initialValue):0,b?i(b.step):0,b?i(b.min):0,b?i(b.max):0,-1,0,0,0,0,0,s(o.varId)]);break}case"chart":{t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,8,0,1,0,0,0,0,0,0,0,0,0,-1,0,0,i(o.height),0,0,-1]);for(let b of o.sources??[]){let x=b.min!==void 0&&b.max!==void 0?1:0;t.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[d,m,u(b.bufferId),{line:0,point:1,bar:2}[b.chartKind],x,x?b.max??0:0,x?b.min??0:0])}break}case"xbm":{t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,9,0,1,0,0,0,0,0,0,0,0,0,-1,i(o.w),i(o.h),0,0,0,-1]);let b=t._em_scratch(o.bits.length);b&&(t.HEAPU8.set(new Uint8Array(o.bits),b),t._em_item_bits(d,m,b,o.bits.length));break}case"textarea":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,10,0,1,0,o.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,i(o.height),0,i(o.lineSpacing),-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,o.content]);break;case"board":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,11,0,1,0,0,0,0,0,0,0,0,0,-1,i(o.w),i(o.h),0,0,0,-1]);break}}),t.ccall("em_page_end",null,["number","number"],[d,l.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],i(e.selectorLeftMargin),i(e.selectorTopMargin),i(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let r=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(r),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let r=t._em_frame(e);if(!r)return;this.img||(this.img=this.ctx.createImageData(128,64));let i=t.HEAPU8.subarray(r,r+tn),s=this.img.data;s.fill(255);for(let u=0;u<64;u++){let l=(u>>3)*128,d=1<<(u&7),o=u*128*4;for(let m=0;m<128;m++)i[l+m]&d&&(s[o]=17,s[o+1]=24,s[o+2]=39),o+=4}this.ctx.putImageData(this.img,0,0);let a=t._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,this.events.onPageChanged?.(a))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Xe=globalThis,pt=n=>n,Ae=Xe.trustedTypes,gt=Ae?Ae.createPolicy("lit-html",{createHTML:n=>n}):void 0,$t="$lit$",ee=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+ee,rn=`<${_t}>`,re=document,be=()=>re.createComment(""),fe=n=>n===null||typeof n!="object"&&typeof n!="function",We=Array.isArray,an=n=>We(n)||typeof n?.[Symbol.iterator]=="function",De=`[ 	
\f\r]`,ge=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,ft=/>/g,te=RegExp(`>|${De}(?:([^\\s"'>=/]+)(${De}*=${De}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,vt=/"/g,yt=/^(?:script|style|textarea|title)$/i,Ze=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=Ze(1),Hn=Ze(2),Kn=Ze(3),he=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),xt=new WeakMap,ne=re.createTreeWalker(re,129);function wt(n,e){if(!We(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(e):e}var sn=(n,e)=>{let t=n.length-1,r=[],i,s=e===2?"<svg>":e===3?"<math>":"",a=ge;for(let u=0;u<t;u++){let l=n[u],d,o,m=-1,f=0;for(;f<l.length&&(a.lastIndex=f,o=a.exec(l),o!==null);)f=a.lastIndex,a===ge?o[1]==="!--"?a=bt:o[1]!==void 0?a=ft:o[2]!==void 0?(yt.test(o[2])&&(i=RegExp("</"+o[2],"g")),a=te):o[3]!==void 0&&(a=te):a===te?o[0]===">"?(a=i??ge,m=-1):o[1]===void 0?m=-2:(m=a.lastIndex-o[2].length,d=o[1],a=o[3]===void 0?te:o[3]==='"'?vt:ht):a===vt||a===ht?a=te:a===bt||a===ft?a=ge:(a=te,i=void 0);let b=a===te&&n[u+1].startsWith("/>")?" ":"";s+=a===ge?l+rn:m>=0?(r.push(d),l.slice(0,m)+$t+l.slice(m)+ee+b):l+ee+(m===-2?u:b)}return[wt(n,s+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},ve=class n{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let s=0,a=0,u=e.length-1,l=this.parts,[d,o]=sn(e,t);if(this.el=n.createElement(d,r),ne.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(i=ne.nextNode())!==null&&l.length<u;){if(i.nodeType===1){if(i.hasAttributes())for(let m of i.getAttributeNames())if(m.endsWith($t)){let f=o[a++],b=i.getAttribute(m).split(ee),x=/([.?@])?(.*)/.exec(f);l.push({type:1,index:s,name:x[2],strings:b,ctor:x[1]==="."?Oe:x[1]==="?"?Fe:x[1]==="@"?ze:ue}),i.removeAttribute(m)}else m.startsWith(ee)&&(l.push({type:6,index:s}),i.removeAttribute(m));if(yt.test(i.tagName)){let m=i.textContent.split(ee),f=m.length-1;if(f>0){i.textContent=Ae?Ae.emptyScript:"";for(let b=0;b<f;b++)i.append(m[b],be()),ne.nextNode(),l.push({type:2,index:++s});i.append(m[f],be())}}}else if(i.nodeType===8)if(i.data===_t)l.push({type:2,index:s});else{let m=-1;for(;(m=i.data.indexOf(ee,m+1))!==-1;)l.push({type:7,index:s}),m+=ee.length-1}s++}}static createElement(e,t){let r=re.createElement("template");return r.innerHTML=e,r}};function oe(n,e,t=n,r){if(e===he)return e;let i=r!==void 0?t._$Co?.[r]:t._$Cl,s=fe(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(n),i._$AT(n,t,r)),r!==void 0?(t._$Co??=[])[r]=i:t._$Cl=i),i!==void 0&&(e=oe(n,i._$AS(n,e.values),i,r)),e}var Ue=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??re).importNode(t,!0);ne.currentNode=i;let s=ne.nextNode(),a=0,u=0,l=r[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new xe(s,s.nextSibling,this,e):l.type===1?d=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(d=new qe(s,this,e)),this._$AV.push(d),l=r[++u]}a!==l?.index&&(s=ne.nextNode(),a++)}return ne.currentNode=re,i}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},xe=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=oe(this,e,t),fe(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==he&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):an(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&fe(this._$AH)?this._$AA.nextSibling.data=e:this.T(re.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=ve.createElement(wt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{let s=new Ue(i,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(e){let t=xt.get(e.strings);return t===void 0&&xt.set(e.strings,t=new ve(e)),t}k(e){We(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,i=0;for(let s of e)i===t.length?t.push(r=new n(this.O(be()),this.O(be()),this,this.options)):r=t[i],r._$AI(s),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=pt(e).nextSibling;pt(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ue=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,s){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=y}_$AI(e,t=this,r,i){let s=this.strings,a=!1;if(s===void 0)e=oe(this,e,t,0),a=!fe(e)||e!==this._$AH&&e!==he,a&&(this._$AH=e);else{let u=e,l,d;for(e=s[0],l=0;l<s.length-1;l++)d=oe(this,u[r+l],t,l),d===he&&(d=this._$AH[l]),a||=!fe(d)||d!==this._$AH[l],d===y?e=y:e!==y&&(e+=(d??"")+s[l+1]),this._$AH[l]=d}a&&!i&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Oe=class extends ue{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}},Fe=class extends ue{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}},ze=class extends ue{constructor(e,t,r,i,s){super(e,t,r,i,s),this.type=5}_$AI(e,t=this){if((e=oe(this,e,t,0)??y)===he)return;let r=this._$AH,i=e===y&&r!==y||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==y&&(r===y||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},qe=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){oe(this,e)}};var on=Xe.litHtmlPolyfillSupport;on?.(ve,xe),(Xe.litHtmlVersions??=[]).push("3.3.3");var D=(n,e,t)=>{let r=t?.renderBefore??e,i=r._$litPart$;if(i===void 0){let s=t?.renderBefore??null;r._$litPart$=i=new xe(e.insertBefore(be(),s),s,void 0,t??{})}return i._$AI(n),i};var un=Object.keys(se);function ln(n,e,t,r){let i=n.getState(),s=t.label||"text"in t&&t.text||se[t.kind],a=u=>l=>{l.stopPropagation(),n.getState().moveItem(e.id,t.id,u)};return h`<div class="ume-item-row ${r?"selected":""}"
    @click=${()=>n.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${mt[t.kind]}</span>
    <span class="ume-item-name" title=${s}>${s}</span>
    <button class="ume-mini" title="上移" @click=${a(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${a(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),i.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),i.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function mn(n,e){let t=n.getState();return h`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${r=>{let i=r.target.value;i&&t.addItem(i,e.id),r.target.value=""}}>
    <option value="">＋条目</option>
    ${un.map(r=>h`<option value=${r}>${se[r]}</option>`)}
  </select>`}function It(n,e){let{project:t,selection:r}=e.getState(),i=s=>{let a=e.getState(),u=r.pageId===s.id;return h`<div class="ume-page">
      <div class="ume-page-head ${u?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${l=>{l.stopPropagation(),a.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${l=>{l.stopPropagation(),a.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${l=>{if(l.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&a.removePage(s.id)}}>✕</button>
      </div>
      ${u?h`<div class="ume-page-items">
        ${s.items.length?s.items.map(l=>ln(e,s,l,r.itemId===l.id)):h`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${mn(e,s)}</div>
      </div>`:y}
    </div>`};D(h`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>dn(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(i)}
  `,n)}function dn(n){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${n.getState().project.pages.length+1}`);e!==null&&n.getState().addPage(e||void 0)}function B(n,e,t,r=""){return h`<div class="ume-field">
    <label>${n}</label>
    <input type="text" .value=${e??""} placeholder=${r}
      @change=${i=>t(i.target.value)} />
  </div>`}function A(n,e,t,r=1){return h`<div class="ume-field">
    <label>${n}</label>
    <input type="number" .value=${String(e)} step=${String(r)}
      @change=${i=>{let s=parseFloat(i.target.value);t(Number.isFinite(s)?s:0)}} />
  </div>`}function U(n,e,t,r){return h`<div class="ume-field">
    <label>${n}</label>
    <select @change=${i=>r(i.target.value)}>
      ${t.map(i=>h`<option value=${i.value} ?selected=${i.value===e}>${i.label}</option>`)}
    </select>
  </div>`}function Me(n,e,t){return h`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${r=>t(r.target.checked)} />
    <span>${n}</span>
  </div>`}function Ge(n,e,t,r=!1){return h`<div class="ume-field wide">
    <label>${n}</label>
    <textarea style=${r?"font-family:Consolas,monospace":""}
      @change=${i=>t(i.target.value)}>${e??""}</textarea>
  </div>`}function le(n,e,t="text/plain"){let r=new Blob([e],{type:`${t};charset=utf-8`}),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download=n,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3)}var cn=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]),kt={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function Ye(n,e,t,r){let i=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...t.map(a=>({value:a.id,label:`${a.name} : ${kt[a.type]??a.type}`}))],s=e?t.some(a=>a.id===e):!1;return h`
    ${U(n,e??"",i,a=>r(a||null))}
    ${e&&!s?h`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:y}
    ${t.length===0?h`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:y}
  `}function Je(n,e,t){return h`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let r=n.getState().addVariable();n.getState().updateItem(e,t,{varId:r.id})}}>＋ 新建变量并绑定</button>
  </div>`}function Qe(n){return n?h`<div class="ume-hint">
    ${n.name} : ${kt[n.type]??n.type}，范围 ${n.min}~${n.max}，步长 ${n.step}，初值 ${n.initialValue}
    （在右侧「变量」区修改）
  </div>`:h`${y}`}function St(n,e,t){let{project:r,selection:i}=e.getState(),s=r.pages.find(o=>o.id===i.pageId)??null,a=s?.items.find(o=>o.id===i.itemId)??null,u=(o,m)=>e.getState().updateItem(s.id,a.id,o,m),l=h`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,d="\u5C5E\u6027";if(s&&!a)d="\u9875\u9762\u5C5E\u6027",l=h`
      ${B("\u540D\u79F0",s.name,o=>e.getState().updatePage(s.id,{name:o}))}
      ${B("C \u51FD\u6570\u540D",s.fnName,o=>e.getState().updatePage(s.id,{fnName:o}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      ${Ge("\u7528\u6237\u4EE3\u7801",s.userCodePre,o=>e.getState().updatePage(s.id,{userCodePre:o}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(s&&a)switch(d=`${se[a.kind]}`,a.kind){case"text":l=h`
          ${B("\u6587\u672C/\u683C\u5F0F",a.text,o=>u({text:o},`text-${a.id}`))}
          ${U("\u5927\u5C0F",String(a.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],o=>u({scale:Number(o)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{let o=a,m=r.variables??[],f=m.find(x=>x.id===o.varId),b=f&&(f.type==="float"||f.type==="double")?"float/double \u63A8\u8350\u683C\u5F0F %.1f / %.2f":"\u6574\u6570\u63A8\u8350\u683C\u5F0F %d\uFF08\u65E0\u7B26\u53F7\u7528 %u\uFF09";l=h`
          ${Ye("\u7ED1\u5B9A\u53D8\u91CF",o.varId,m,x=>u({varId:x}))}
          ${f?y:Je(e,s.id,o.id)}
          ${Me("\u53EF\u7F16\u8F91\uFF08\u7ED1\u5B9A\u9644\u52A0\u503C\uFF0C\u53D6\u6D88\u5219\u4EC5\u663E\u793A\uFF09",o.editable!==!1,x=>u({editable:x}))}
          ${Qe(f)}
          ${B("\u663E\u793A\u6587\u672C",o.text,x=>u({text:x},`text-${a.id}`))}
          ${U("\u5927\u5C0F",String(o.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],x=>u({scale:Number(x)}))}
          <div class="ume-hint">${b}；文本支持 \n 多行</div>
        `;break}case"switch":{let o=a,m=(r.variables??[]).filter(b=>b.type==="uint8"),f=m.find(b=>b.id===o.varId)??(r.variables??[]).find(b=>b.id===o.varId);l=h`
          ${Ye("\u7ED1\u5B9A\u53D8\u91CF",o.varId,m,b=>u({varId:b}))}
          ${f?y:Je(e,s.id,o.id)}
          ${Qe(f)}
          ${B("\u663E\u793A\u6587\u672C",o.text,b=>u({text:b},`text-${a.id}`))}
          ${A("openValue",o.openValue,b=>u({openValue:Math.max(0,Math.trunc(b))}))}
          ${B('"\u5F00"\u6587\u672C',o.onText,b=>u({onText:b}))}
          ${B('"\u5173"\u6587\u672C',o.offText,b=>u({offText:b}))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;break}case"button":{let o=a;l=h`
          ${B("\u663E\u793A\u6587\u672C",o.text,m=>u({text:m},`text-${a.id}`))}
          ${B("\u56DE\u8C03\u51FD\u6570\u540D",o.cbName,m=>u({cbName:m}))}
          ${A("ID",o.buttonId,m=>u({buttonId:Math.trunc(m)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{let o=a;l=h`
          ${B("\u663E\u793A\u6587\u672C",o.text,m=>u({text:m},`text-${a.id}`))}
          ${U("\u76EE\u6807\u9875\u9762",o.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...r.pages.filter(m=>m.id!==s.id).map(m=>({value:m.id,label:m.name}))],m=>u({targetPageId:m||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{l=h`
          ${B("\u663E\u793A\u6587\u672C",a.text,o=>u({text:o},`text-${a.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{let o=(r.variables??[]).filter(f=>cn.has(f.type)),m=o.find(f=>f.id===a.varId)??(r.variables??[]).find(f=>f.id===a.varId);l=h`
          ${Ye("\u7ED1\u5B9A\u53D8\u91CF",a.varId,o,f=>u({varId:f}))}
          ${m?y:Je(e,s.id,a.id)}
          ${Qe(m)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;break}case"chart":{let o=a,m=r.chartBuffers??[],f=x=>u({sources:x}),b=(x,R)=>{let q=m.find(M=>M.id===x.bufferId),F=x.min===void 0||x.max===void 0;return h`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${q?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[x.chartKind]??x.chartKind}${F?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${x.min}~${x.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>f(o.sources.filter((M,P)=>P!==R))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${U("\u7F13\u51B2\u533A",x.bufferId,m.map(M=>({value:M.id,label:`${M.name} (${M.dataLen}\u70B9)`})),M=>f(o.sources.map((P,H)=>H===R?{...P,bufferId:M}:P)))}
              ${U("\u7ED8\u5236",x.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],M=>f(o.sources.map((P,H)=>H===R?{...P,chartKind:M}:P)))}
              ${Me("\u81EA\u52A8\u91CF\u7A0B",F,M=>f(o.sources.map((P,H)=>H===R?{...P,min:M?void 0:0,max:M?void 0:100}:P)))}
              ${F?y:h`
                ${A("\u91CF\u7A0B\u4E0A\u9650",x.max??100,M=>f(o.sources.map((P,H)=>H===R?{...P,max:M}:P)),"any")}
                ${A("\u91CF\u7A0B\u4E0B\u9650",x.min??0,M=>f(o.sources.map((P,H)=>H===R?{...P,min:M}:P)),"any")}`}
            </div>
          </div>`};l=h`
          ${A("\u9AD8\u5EA6(px)",o.height,x=>u({height:Math.max(4,Math.trunc(x))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(o.sources??[]).map(b)}
              ${(o.sources??[]).length===0?h`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:y}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(o.sources??[]).length>=4}
                @click=${()=>{if(!m.length){let x=e.getState().addChartBuffer();f([...o.sources??[],{bufferId:x.id,chartKind:"line"}]);return}f([...o.sources??[],{bufferId:m[0].id,chartKind:"line"}])}}>＋ 添加数据源${(o.sources??[]).length>0?"\uFF08\u53E0\u52A0\uFF09":""}</button>
              ${m.length?y:h`<div class="ume-hint">将自动新建数据源缓冲区（在右侧「数据源」区可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{let o=a;l=h`
          ${B("\u6570\u7EC4\u540D",o.name,m=>u({name:m}))}
          ${A("\u5BBD(px)",o.w,m=>u({w:Math.min(128,Math.max(1,Math.trunc(m)))}))}
          ${A("\u9AD8(px)",o.h,m=>u({h:Math.min(64,Math.max(1,Math.trunc(m)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(s.id,o.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${o.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let o=a;l=h`
          ${Ge("\u6587\u672C\u5185\u5BB9",o.content,m=>u({content:m}))}
          ${A("\u9AD8\u5EA6(px)",o.height,m=>u({height:Math.max(10,Math.trunc(m))}))}
          ${A("\u884C\u95F4\u8DDD",o.lineSpacing,m=>u({lineSpacing:Math.max(0,Math.trunc(m))}))}
          ${Me("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",o.bindScroll,m=>u({bindScroll:m}))}
        `;break}case"board":{let o=a;l=h`
          ${A("\u5BBD(px)",o.w,m=>u({w:Math.max(1,Math.trunc(m))}))}
          ${A("\u9AD8(px)",o.h,m=>u({h:Math.max(1,Math.trunc(m))}))}
          ${B("\u56DE\u8C03\u51FD\u6570\u540D",o.cbName,m=>u({cbName:m}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}D(h`
    <div class="ume-panel-title">属性 ${d!=="\u5C5E\u6027"?h`<span class="ume-kind-badge">${d}</span>`:y}</div>
    ${l}
  `,n)}var Te=null,et=null,pn=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function gn(n,e){let t=e.variables??[],r=s=>{Te=Te===s?null:s},i=s=>{let a=Te===s.id,u=(m,f)=>n.getState().updateVariable(s.id,m,f),l=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=t.filter(m=>m.name===s.name).length>1,o=bn(e,s.id);return h`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>r(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${o?` \xB7 ${o} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${m=>{m.stopPropagation();let f=n.getState().removeVariable(s.id);f>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${f} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?h`<div class="ume-var-edit">
        ${B("\u53D8\u91CF\u540D",s.name,m=>u({name:m.trim()},`vn-${s.id}`))}
        ${l?h`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:y}
        ${d?h`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:y}
        ${U("\u7C7B\u578B",s.type,pn,m=>u({type:m}))}
        ${A("\u521D\u59CB\u503C",s.initialValue,m=>u({initialValue:m},`vi-${s.id}`),"any")}
        ${A("\u6700\u5C0F\u503C",s.min,m=>u({min:m},`vmin-${s.id}`),"any")}
        ${A("\u6700\u5927\u503C",s.max,m=>u({max:m},`vmax-${s.id}`),"any")}
        ${A("\u6B65\u957F",s.step,m=>u({step:m},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:y}
    </div>`};return h`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{Te=n.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(i):h`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function bn(n,e){let t=0;for(let r of n.pages)for(let i of r.items)"varId"in i&&i.varId===e&&t++;return t}function fn(n,e){let t=e.chartBuffers??[],r=s=>{let a=0;for(let u of e.pages)for(let l of u.items)l.kind==="chart"&&l.sources.some(d=>d.bufferId===s)&&a++;return a},i=s=>{let a=et===s.id,u=(o,m)=>n.getState().updateChartBuffer(s.id,o,m),l=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=r(s.id);return h`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>{et=a?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[s.sample]}${d?` \xB7 ${d} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${o=>{o.stopPropagation();let m=n.getState().removeChartBuffer(s.id);m>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${m} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?h`<div class="ume-var-edit">
        ${B("\u6570\u7EC4\u540D",s.name,o=>u({name:o.trim()},`bn-${s.id}`))}
        ${l?h`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:y}
        ${A("\u70B9\u6570",s.dataLen,o=>u({dataLen:Math.min(512,Math.max(2,Math.trunc(o)))},`bl-${s.id}`))}
        ${U("\u793A\u4F8B\u586B\u5145",s.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],o=>u({sample:o}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:y}
    </div>`};return h`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{et=n.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(i):h`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Et(n,e){let{project:t}=e.getState(),r=(u,l)=>e.getState().update(d=>{Object.assign(d,u)},l),i=t.weakHooks??[],s=(u,l)=>{e.getState().update(d=>{let o=d.weakHooks??[];d.weakHooks=l?[...new Set([...o,u])]:o.filter(m=>m!==u)})},a=h`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${i.length}/${W.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${W.map(u=>h`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${u.fn}${u.retNote?"\uFF08\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u5904\u7406 / 0 = \u4EA4\u7ED9\u5E93\uFF09":""}`}>
              <input type="checkbox" ?checked=${i.includes(u.fn)}
                @change=${l=>s(u.fn,l.target.checked)} />
              <span>${u.label}</span>
            </div>
            <div class="ume-weak-desc">${u.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;D(h`
    <div class="ume-panel-title">工程</div>
    ${B("\u5DE5\u7A0B\u540D",t.name,u=>r({name:u}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    ${gn(e,t)}
    ${fn(e,t)}

    <div class="ume-panel-title">样式</div>
    ${U("\u5B57\u4F53",t.font,He.map(u=>({value:u.id,label:u.label})),u=>r({font:u}))}
    ${U("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],u=>r({selector:u}))}
    ${A("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,u=>r({selectorLeftMargin:Math.max(0,Math.trunc(u))}))}
    ${A("\u9876\u8FB9\u8DDD",t.selectorTopMargin,u=>r({selectorTopMargin:Math.max(0,Math.trunc(u))}))}
    ${A("\u884C\u95F4\u8DDD",t.selectorLineSpacing,u=>r({selectorLineSpacing:Math.max(0,Math.trunc(u))}))}
    ${A("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,u=>r({marqueeSpeed:u}),.05)}
    ${A("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,u=>r({marqueeHeaderLen:u}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
    ${y}
  `,n)}function At(n,e){let t=i=>{let s,a=()=>{s&&(clearInterval(s),s=void 0)};return{down:u=>{u.preventDefault(),e.key(i),a(),s=window.setInterval(()=>e.key(i),180)},up:a}},r=(i,s,a)=>{let u=t(i);return h`<button class="ume-key" title=${a}
      @pointerdown=${u.down} @pointerup=${u.up} @pointerleave=${u.up}>${s}</button>`};D(h`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${i=>{let a={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[i.key];a!==void 0&&(i.preventDefault(),e.key(a))}}>
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
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,n)}var me=null,ae="c";function Tt(n,e){me=e,n.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),hn(n)}function hn(n){if(!me)return;let e=ae==="c"?me.c:me.h,t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",i=>{i.target===t&&Mt(t)});let r=()=>{D(h`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>Mt(t)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${me.warnings.length?h`
            <div style="margin-bottom:8px">
              ${me.warnings.map(i=>h`<div class="ume-warn">⚠ ${i}</div>`)}
            </div>`:y}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${ae==="c"?"primary":""}" @click=${()=>{ae="c",r()}}>menu_pages.c</button>
            <button class="ume-btn sm ${ae==="h"?"primary":""}" @click=${()=>{ae="h",r()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${e}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(e).then(()=>vn(t,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{le(ae==="c"?"menu_pages.c":"menu_pages.h",e)}}>下载 ${ae==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,t)};r(),n.appendChild(t)}function Mt(n){n.remove()}function vn(n,e){let t=n.closest(".ume")??document.body,r=t.querySelector(".ume-toast");r||(r=document.createElement("div"),r.className="ume-toast",t.appendChild(r)),r.textContent=e,r.classList.add("show"),setTimeout(()=>r.classList.remove("show"),1600)}function Ct(n,e,t,r){let a=e.getState().project.pages.find(p=>p.id===t)?.items.find(p=>p.id===r);if(!a||a.kind!=="xbm")return;let u=a,l=u.w,d=u.h,o=[...u.bits],m=()=>Math.ceil(l/8),f=document.createElement("div");f.className="ume-modal-mask",f.addEventListener("click",p=>{p.target===f&&ie()});let b=(p,T)=>{let w=T*m()+(p>>3);return w<o.length?!!(o[w]>>(p&7)&1):!1},x=(p,T,w)=>{let Y=T*m()+(p>>3);o[Y]=w?o[Y]|1<<(p&7):o[Y]&~(1<<(p&7))},R=(p,T)=>{let w=Math.ceil(l/8),Y=Math.ceil(p/8),_e=new Array(Y*T).fill(0);for(let c=0;c<Math.min(d,T);c++)for(let $=0;$<Math.min(l,p);$++){let g=c*w+($>>3);g<o.length&&o[g]>>($&7)&1&&(_e[c*Y+($>>3)]|=1<<($&7))}l=p,d=T,o=_e},q=!1,F=!0,M=(p,T)=>w=>{w.preventDefault(),q=!0,F=!b(p,T),x(p,T,F),L()},P=(p,T)=>()=>{q&&(x(p,T,F),L())},H=()=>{q=!1},L=()=>{D(Pe(),f)},$e=()=>{let p=[];for(let T=0;T<d;T++)for(let w=0;w<l;w++)p.push(h`<button class="ume-xbm-cell ${b(w,T)?"on":""}"
          data-x=${w} data-y=${T}
          @pointerdown=${M(w,T)}
          @pointerenter=${P(w,T)}></button>`);return p},Pe=()=>h`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${d}</span></span>
        <button class="ume-mini" @click=${ie}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${H}
        @pointerleave=${H}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${p=>{R(Pt(+p.target.value,1,128),d),L()}} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${p=>{R(l,Pt(+p.target.value,1,64)),L()}} />
          <button class="ume-btn sm" @click=${()=>{o=o.map(()=>0),L()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{o=o.map(p=>~p&255),L()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${$e()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${u.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${ie}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,r,{w:l,h:d,bits:[...o]}),ie()}}>应用</button>
      </div>
    </div>
  `;function ie(){f.remove(),document.removeEventListener("pointerup",H)}document.addEventListener("pointerup",H),L(),n.appendChild(f)}function Pt(n,e,t){return Number.isFinite(n)?Math.min(t,Math.max(e,Math.trunc(n))):e}var xn="prebuilt/u8g2-menu-preview.js",tt=class{constructor(e,t={}){this.store=Ve();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let o=document.createElement("style");o.id="ume-style",o.textContent=rt,document.head.appendChild(o)}let r=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,i=this.opts.data??r??void 0;if(i!==void 0)try{this.store.setState({project:ke(i)})}catch(o){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",o)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,a=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;s&&a&&(this.lastExport={c:s,h:a}),e.innerHTML=`
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
    `;let u=o=>e.querySelector(o);this.els={left:u(".ume-left"),center:u(".ume-center"),right:u(".ume-right"),styleEl:u('[data-role="style"]'),propEl:u('[data-role="prop"]'),toolbarUndo:u('[data-act="undo"]'),toolbarRedo:u('[data-act="redo"]')};let l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column",l.style.alignItems="center",l.style.gap="10px",this.els.center.appendChild(l),this.preview=new Se(l,{onPageChanged:o=>this.onPreviewPageChanged(o)});let d=document.createElement("div");this.els.center.appendChild(d),At(d,this.preview),this.preview.load(this.opts.wasmUrl??xn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(o=>{console.error(o);let m=document.createElement("div");m.className="ume-warn",m.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${o.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(m)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let o=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);o!==null&&this.store.getState().addPage(o||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{le(`${this.store.getState().project.name||"menu-project"}.json`,Ke(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{u('[data-role="file"]').click()}),u('[data-role="file"]').addEventListener("change",o=>{let m=o.target.files?.[0];m&&(m.text().then(f=>{try{let b=ke(f);this.store.getState().update(x=>{Object.assign(x,b)}),this.scheduleRender()}catch(b){alert(`\u5BFC\u5165\u5931\u8D25: ${b.message}`)}}),o.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=ke(e);this.store.getState().update(r=>{Object.assign(r,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.lastExport,t=Re(this.store.getState().project,e??void 0);return this.lastExport={c:t.c,h:t.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,t.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,t.h)),Tt(this.container,t),this.opts.onExport?.(t),t}downloadC(){let e=Re(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:e.c,h:e.h},le("menu_pages.c",e.c),le("menu_pages.h",e.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ke(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();It(this.els.left,this.store),Et(this.els.styleEl,this.store),St(this.els.propEl,this.store,{openXbmEditor:(t,r)=>Ct(this.container,this.store,t,r)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),t=document.getElementById("ume-page-jump"),r=this.store.getState(),i=this.store.getState().project.pages.findIndex(s=>s.id===r.selection.pageId);if(t){let s=r.project.pages,a=s.map(l=>l.name).join("|");t.dataset.sig!==a&&(t.dataset.sig=a,t.innerHTML="",s.forEach((l,d)=>{let o=document.createElement("option");o.value=String(d),o.textContent=`${d+1}. ${l.name}`,t.appendChild(o)}),t.onchange=()=>{let l=parseInt(t.value,10);Number.isFinite(l)&&this.preview.navTo(l)});let u=this.preview.currentPage;document.activeElement!==t&&t.value!==String(u)&&(t.value=String(u))}if(e&&i>=0&&r.selection.itemId){let s=r.project.pages[i],a=s.items.findIndex(l=>l.id===r.selection.itemId),u=s.items[a];if(u&&"varId"in u){let l=u.varId?(r.project.variables??[]).findIndex(f=>f.id===u.varId):-1,d=l>=0?l:i*64+a,o=u.kind==="switch"?this.preview.getSwitch(d):this.preview.getInt(d),m=(r.project.variables??[]).find(f=>f.id===u.varId)?.name;e.textContent=`${m??u.kind} = ${o}`}else e.textContent=""}}};return Rt($n);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
