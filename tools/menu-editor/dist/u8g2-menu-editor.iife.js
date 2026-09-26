"use strict";var U8G2MenuEditor=(()=>{var Me=Object.defineProperty;var Pt=Object.getOwnPropertyDescriptor;var Ct=Object.getOwnPropertyNames;var Nt=Object.prototype.hasOwnProperty;var Bt=(r,e)=>{for(var t in e)Me(r,t,{get:e[t],enumerable:!0})},Lt=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ct(e))!Nt.call(r,i)&&i!==t&&Me(r,i,{get:()=>e[i],enumerable:!(a=Pt(e,i))||a.enumerable});return r};var Vt=r=>Lt(Me({},"__esModule",{value:!0}),r);var hn={};Bt(hn,{MenuEditor:()=>Ge,MenuKey:()=>Ie});var Qe=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;var et=r=>{let e,t=new Set,a=(d,u)=>{let m=typeof d=="function"?d(e):d;if(!Object.is(m,e)){let f=e;e=u??(typeof m!="object"||m===null)?m:Object.assign({},e,m),t.forEach(b=>b(e,f))}},i=()=>e,o={setState:a,getState:i,getInitialState:()=>l,subscribe:d=>(t.add(d),()=>t.delete(d))},l=e=r(a,i,o);return o},tt=r=>r?et(r):et;var Te=0;function K(r){return Te=(Te+1)%1e9,`${r}_${Date.now().toString(36)}_${Te.toString(36)}`}function ue(r){return{id:K("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...r}}function Ce(r){return{id:K("buf"),name:"buf_new",dataLen:32,sample:"sine",...r}}function nt(r,e){let t=new Set(r.map(i=>i.name));if(!t.has(e))return e;let a=2;for(;t.has(`${e}_${a}`);)a++;return`${e}_${a}`}function rt(r,e){let t=new Set(r.map(i=>i.name));if(!t.has(e))return e;let a=2;for(;t.has(`${e}_${a}`);)a++;return`${e}_${a}`}function j(r){let e={id:K("it"),label:""};switch(r){case"text":return{...e,kind:r,text:"\u83DC\u5355\u9879",scale:1};case"number":return{...e,kind:r,text:"v:%d",scale:1,varId:null,editable:!0};case"switch":return{...e,kind:r,text:"s:%s",scale:1,varId:null,openValue:1,onText:"on",offText:"off"};case"button":return{...e,kind:r,text:"\u6267\u884C\u64CD\u4F5C",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...e,kind:r,text:"\u4E0B\u4E00\u7EA7",scale:1,targetPageId:null};case"back":return{...e,kind:r,text:"\u8FD4\u56DE",scale:1};case"slider":return{...e,kind:r,varId:null};case"progress":return{...e,kind:r,varId:null};case"chart":return{...e,kind:r,sources:[],height:32};case"xbm":return Ht(16,16);case"textarea":return{...e,kind:r,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:r,w:64,h:32,cbName:"board_cb"}}}function Ht(r,e){let t=Math.ceil(r/8);return{id:K("it"),kind:"xbm",label:"",name:"icon",w:r,h:e,bits:new Array(t*e).fill(0)}}function Pe(r){return{id:K("pg"),name:r,fnName:"",items:[],userCodePre:""}}function G(r,e){return{...r,...e}}function at(){let r=[ue({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),ue({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),ue({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[Ce({name:"buf_demo",dataLen:32,sample:"sine"})],t=Pe("\u4E3B\u9875");t.items=[G(j("text"),{text:"u8g2_menu"}),G(j("submenu"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E"}),G(j("button"),{text:"\u5173\u4E8E",cbName:"btn_about_cb"})];let a=Pe("\u8BBE\u7F6E");a.items=[G(j("number"),{text:"\u97F3\u91CF:%d",varId:r[0].id}),G(j("switch"),{text:"\u5F00\u5173:%s",varId:r[1].id}),G(j("slider"),{varId:r[2].id}),G(j("submenu"),{text:"\u56FE\u8868"}),j("back")];let i=Pe("\u56FE\u8868");i.items=[G(j("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),j("back")];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:r,chartBuffers:e,pages:[t,a,i]};return t.items[1].targetPageId=a.id,a.items[3].targetPageId=i.id,s}function it(r){return structuredClone(r)}var Kt=800;function Ne(){let r=null,e=0;return tt()((t,a)=>({project:at(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(i,s)=>{let n=Date.now(),o=!!s&&s===r&&n-e<Kt;r=s??null,e=n,t(l=>{let d=it(l.project);return i(d),{project:d,dirty:!0,past:o?l.past:[...l.past.slice(-99),l.project],future:[]}})},undo:()=>{t(i=>i.past.length?{project:i.past[i.past.length-1],past:i.past.slice(0,-1),future:[i.project,...i.future.slice(0,99)],dirty:!0}:i)},redo:()=>{t(i=>{if(!i.future.length)return i;let[s,...n]=i.future;return{project:s,past:[...i.past,i.project],future:n,dirty:!0}})},select:(i,s=null)=>t({selection:{pageId:i,itemId:s}}),addPage:i=>{let s={id:K("pg"),name:i??`\u9875\u9762${a().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return a().update(n=>{n.pages.push(s)}),t({selection:{pageId:s.id,itemId:null}}),s},removePage:i=>{a().update(n=>{n.pages=n.pages.filter(o=>o.id!==i);for(let o of n.pages)for(let l of o.items)l.kind==="submenu"&&l.targetPageId===i&&(l.targetPageId=null)});let{selection:s}=a();s.pageId===i&&t({selection:{pageId:null,itemId:null}})},movePage:(i,s)=>{a().update(n=>{let o=n.pages.findIndex(d=>d.id===i),l=o+s;o<0||l<0||l>=n.pages.length||([n.pages[o],n.pages[l]]=[n.pages[l],n.pages[o]])})},updatePage:(i,s)=>{a().update(n=>{let o=n.pages.find(l=>l.id===i);o&&Object.assign(o,s)})},addItem:(i,s)=>{let n=s??a().selection.pageId??a().project.pages[0]?.id;if(!n)return null;let o=Rt(i);return a().update(l=>{l.pages.find(u=>u.id===n)?.items.push(o)}),t({selection:{pageId:n,itemId:o.id}}),o},removeItem:(i,s)=>{a().update(o=>{let l=o.pages.find(d=>d.id===i);l&&(l.items=l.items.filter(d=>d.id!==s))});let{selection:n}=a();n.itemId===s&&t({selection:{pageId:i,itemId:null}})},moveItem:(i,s,n)=>{a().update(o=>{let l=o.pages.find(m=>m.id===i);if(!l)return;let d=l.items.findIndex(m=>m.id===s),u=d+n;d<0||u<0||u>=l.items.length||([l.items[d],l.items[u]]=[l.items[u],l.items[d]])})},duplicateItem:(i,s)=>{let n=null;a().update(o=>{let l=o.pages.find(u=>u.id===i);if(!l)return;let d=l.items.findIndex(u=>u.id===s);d<0||(n=structuredClone(l.items[d]),n.id=K("it"),l.items.splice(d+1,0,n))}),n&&t({selection:{pageId:i,itemId:n.id}})},updateItem:(i,s,n,o)=>{a().update(l=>{let u=l.pages.find(m=>m.id===i)?.items.find(m=>m.id===s);u&&Object.assign(u,n)},o)},addVariable:i=>{let s=null;return a().update(n=>{n.variables=n.variables??[];let o=rt(n.variables,i?.name??"var_new");s=ue({...i,name:o}),n.variables.push(s)}),s},removeVariable:i=>{let s=0;for(let n of a().project.pages)for(let o of n.items)"varId"in o&&o.varId===i&&s++;return s>0?s:(a().update(n=>{n.variables=(n.variables??[]).filter(o=>o.id!==i)}),0)},updateVariable:(i,s,n)=>{a().update(o=>{let l=(o.variables??[]).find(d=>d.id===i);l&&Object.assign(l,s)},n)},addChartBuffer:i=>{let s=null;return a().update(n=>{n.chartBuffers=n.chartBuffers??[];let o=nt(n.chartBuffers,i?.name??"buf_new");s=Ce({...i,name:o}),n.chartBuffers.push(s)}),s},removeChartBuffer:i=>{let s=0;for(let n of a().project.pages)for(let o of n.items)o.kind==="chart"&&o.sources.some(l=>l.bufferId===i)&&s++;return s>0?s:(a().update(n=>{n.chartBuffers=(n.chartBuffers??[]).filter(o=>o.id!==i)}),0)},updateChartBuffer:(i,s,n)=>{a().update(o=>{let l=(o.chartBuffers??[]).find(d=>d.id===i);l&&Object.assign(l,s)},n)}}))}var In=Ne();function Rt(r){return j(r)}var W=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],ie={text:"\u6587\u672C",number:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE\u4E0A\u7EA7",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},st={text:"T",number:"#",switch:"\u25C9",button:"\u23CE",submenu:"\u2192",back:"\u2190",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},Be=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var Z=class extends Error{},ot=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),jt=new Set(["line","point","bar"]),ut=new Set(["sine","ramp","noise","none"]);function le(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function L(r,e){return typeof r=="string"?r:e}function S(r,e){return typeof r=="number"&&Number.isFinite(r)?r:e}var Dt=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function Ut(r){if(!le(r))throw new Z("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=r.kind;if(typeof e!="string"||!Dt.includes(e))throw new Z(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(r);switch(t.id=L(r.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=L(r.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=L(r.text,""),t.scale=r.scale===2?2:1;break}return t}function Ot(r){if(!le(r))throw new Z("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(r.items)?r.items.map(Ut):[];return{id:L(r.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:L(r.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:L(r.fnName,""),items:e,userCodePre:L(r.userCodePre,"")}}function Ft(r){if(!le(r))return null;let e=L(r.type,"int32");return{id:L(r.id,"")||K("vb"),name:L(r.name,""),type:ot.has(e)?e:"int32",initialValue:S(r.initialValue,0),min:S(r.min,0),max:S(r.max,100),step:S(r.step,1)}}function qt(r){if(!le(r))return null;let e=L(r.sample,"sine");return{id:L(r.id,"")||K("buf"),name:L(r.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(S(r.dataLen,32)))),sample:ut.has(e)?e:"sine"}}function zt(r){let e=new Map,t=[],a=(i,s)=>{let n=e.get(i);return n||(n=s(),e.set(i,n),t.push(n)),n};for(let i of r)for(let s of i.items){let n=s;switch(s.kind){case"number":if(n.varId===void 0||n.varId===null){let o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=a(o,()=>({id:K("vb"),name:o,type:ot.has(String(n.varType))?String(n.varType):"int32",initialValue:S(n.initialValue,0),min:S(n.min,0),max:S(n.max,100),step:S(n.step,1)}));s.varId=l.id}n.editable===void 0&&(s.editable=!0),delete n.varName,delete n.varType,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals;break;case"slider":case"progress":if(n.varId===void 0||n.varId===null){let o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=a(o,()=>({id:K("vb"),name:o,type:"int",initialValue:S(n.initialValue,0),min:S(n.min,0),max:S(n.max,100),step:S(n.step,1)}));s.varId=l.id}delete n.varName,delete n.step,delete n.min,delete n.max,delete n.initialValue;break;case"switch":if(n.varId===void 0||n.varId===null){let o=typeof n.varName=="string"&&n.varName?n.varName:"var_unnamed",l=a(o,()=>({id:K("vb"),name:o,type:"uint8",initialValue:S(n.initialValue,0),min:0,max:1,step:1}));s.varId=l.id}delete n.varName,delete n.initialValue;break;default:break}}return t}function ye(r){let e;if(typeof r=="string")try{e=JSON.parse(r)}catch{throw new Z("JSON \u89E3\u6790\u5931\u8D25")}else e=r;if(!le(e))throw new Z("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,a=S(t.version,0);if(a>1)throw new Z(`\u5DE5\u7A0B\u7248\u672C v${a} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);a<1&&void 0;let i=Array.isArray(t.pages)?t.pages.map(Ot):[];if(!i.length)throw new Z("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",n=new Set(W.map(u=>u.fn)),o=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(u=>typeof u=="string"&&n.has(u)))]:[],l;Array.isArray(t.variables)?l=t.variables.map(Ft).filter(u=>!!u):l=zt(i);let d;return Array.isArray(t.chartBuffers)?d=t.chartBuffers.map(qt).filter(u=>!!u):d=Xt(i),{version:1,name:L(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:S(t.width,128),height:S(t.height,64),font:L(t.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:S(t.selectorLeftMargin,16),selectorTopMargin:S(t.selectorTopMargin,0),selectorLineSpacing:S(t.selectorLineSpacing,0),marqueeSpeed:S(t.marqueeSpeed,.2),marqueeHeaderLen:S(t.marqueeHeaderLen,5),weakHooks:o,variables:l,chartBuffers:d,pages:i}}function Xt(r){let e=[],t=0,a=()=>{let i={id:K("buf"),name:`buf_chart_${++t}`,dataLen:32,sample:"sine"};return e.push(i),i};for(let i of r)for(let s of i.items){if(s.kind!=="chart")continue;let n=s;if(Array.isArray(n.sources))continue;let o=a();o.dataLen=Math.min(512,Math.max(2,Math.trunc(S(n.dataLen,32))));let l=L(n.sample,"sine");ut.has(l)&&(o.sample=l);let d=L(n.chartKind,"line"),u={bufferId:o.id,chartKind:jt.has(d)?d:"line"};n.max!==void 0&&n.max!==null&&(u.max=S(n.max,0)),n.min!==void 0&&n.min!==null&&(u.min=S(n.min,0)),s.sources=[u],n.height===void 0&&(s.height=32),delete n.chartKind,delete n.dataLen,delete n.sample,delete n.max,delete n.min}return e}function Le(r){return JSON.stringify(r,null,2)}var Wt={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function Y(r,e="anon"){let t=r.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function me(r){return r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function J(r){if(!Number.isFinite(r))return"0.0f";let e=r.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function Zt(r,e,t){return t==="ramp"?`${r}[i] = (float)i;`:t==="noise"?`${r}[i] = (float)((i * 37) % ${e});`:`${r}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function Yt(r){let e=new Map;if(!r)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,a;for(;(a=t.exec(r))!==null;)e.set(a[1],a[2]);return e}function O(r,e,t){let a=e.has(r)?e.get(r):"";return`${t}/* USER CODE BEGIN ${r} */${a}${t}/* USER CODE END ${r} */`}var Gt=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function Ve(r,e){let t=[],a=Yt(e?.c??""),i=r.pages.map((c,$)=>c.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.fnName)?c.fnName:`page_${$}`),s=new Map,n=new Map;for(let c of r.variables??[]){if(!c.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}if(s.has(c.name)){t.push(`\u53D8\u91CF\u540D "${c.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.name)||t.push(`\u53D8\u91CF\u540D "${c.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${Y(c.name)}"`);let $=Y(c.name,"var"),g=c.type==="float"||c.type==="double",w={name:$,srcType:c.type,type:Wt[c.type],init:g?J(c.initialValue):String(Math.trunc(c.initialValue)),isFloat:g,step:c.step,min:c.min,max:c.max};s.set($,w),n.set(c.id,w)}let o=new Map,l=new Set,d=[],u=new Map;for(let c of r.chartBuffers??[]){if(!c.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");continue}let $=Y(c.name,"buf");if([...u.values()].some(_=>_.name===$)){t.push(`\u7F13\u51B2\u533A\u540D "${c.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let g=Math.max(2,Math.trunc(c.dataLen)),w=`${$.toUpperCase()}_LEN`;u.set(c.id,{name:$,lenMacro:w,len:g});let I=`fill_${$}`,v=(a.get(I)??"").trim()!=="";d.push(`#define ${w} ${g}`,`static float ${$}[${w}];`,`static uint8_t ${$}_filled = 0;`,`static void ${$}_fill(void)`,"{",O(I,a,"    "),...c.sample!=="none"&&!v?[`    for (uint16_t i = 0; i < ${w}; ++i) { ${Zt($,g,c.sample)} }`]:[],"}")}let m=[],f=new Map,b=new Map,x=new Map;{let c=0,$=0,g=w=>{let I=u.get(w);return I?(x.has(w)||x.set(w,`        if (!${I.name}_filled) { ${I.name}_filled = 1; ${I.name}_fill(); }`),x.get(w)):""};for(let w of r.pages)for(let I of w.items){if(I.kind!=="chart")continue;let v=I.sources.filter(P=>u.has(P.bufferId));if(I.sources.length&&!v.length){t.push(`\u9875\u9762 ${w.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!v.length){t.push(`\u9875\u9762 ${w.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let _=Math.max(4,Math.trunc(I.height)),k=[];for(let P of v){let C=u.get(P.bufferId),q=`chart${c++}`;m.push(`static float ${q}_dis[${C.lenMacro}];`,`static u8g2_chart_t ${q};`),k.push({name:q,s:P,b:C})}if(k.length===1){let{name:P,s:C,b:q}=k[0];m.push(`static uint8_t ${P}_inited = 0;`),f.set(I.id,[`    if (!${P}_inited) {`,`        ${P}_inited = 1;`,`        u8g2_chart_init(&${P}, ${q.name}, ${P}_dis, ${q.lenMacro});`,g(C.bufferId),"    }"]);let X=C.chartKind==="point"?"Point":C.chartKind==="bar"?"Bar":"Line",xe=C.min!==void 0&&C.max!==void 0?`${J(C.max)}, ${J(C.min)}`:"0, 0";b.set(I.id,`    u8g2_MenuDrawItem${X}Chart(&${P}, ${_}, ${xe});`)}else{let P=`chart_layers_${$++}`;m.push(`static u8g2_menu_drawChart_t ${P}[${k.length}];`,`static uint8_t ${P}_inited = 0;`);let C=[`    if (!${P}_inited) {`,`        ${P}_inited = 1;`];k.forEach(({name:q,s:X,b:xe},$e)=>{C.push(`        u8g2_chart_init(&${q}, ${xe.name}, ${q}_dis, ${xe.lenMacro});`),C.push(g(X.bufferId));let Tt=X.chartKind==="point"?"u8g2_drawPointChart":X.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",Je=X.min!==void 0&&X.max!==void 0?`${J(X.max)}, ${J(X.min)}`:"0, 0";C.push(`        ${P}[${$e}].drawChart = ${Tt};`),C.push(`        ${P}[${$e}].chart = &${q};`),C.push(`        ${P}[${$e}].max = ${Je.split(", ")[0]};`),C.push(`        ${P}[${$e}].min = ${Je.split(", ")[1]};`)}),C.push("    }"),f.set(I.id,C),b.set(I.id,`    u8g2_MenuDrawItemChart(${P}, ${k.length}, ${_});`)}}}let R=[],z=[],F=[],A=new Set,T=new Map,V=0;for(let c of r.pages)for(let $ of c.items)switch($.kind){case"button":{let g=Y($.cbName,"btn_cb");o.has(g)||o.set(g,$.buttonId);break}case"board":l.add(Y($.cbName,"board_cb"));break;case"xbm":{let g=Y($.name,"icon");for(;A.has(g);)g=`${g}_2`;A.add(g),T.set($.id,g);let w=$.bits.length,I=$.bits.map(v=>`0x${(v&255).toString(16).padStart(2,"0")}`).join(", ");R.push(`static const uint8_t menu_xbm_${g}[${w}] = { ${I} };`);break}case"textarea":{let g=V++;z.push(`static char ta${g}_text[] = "${me($.content)}";`,`static u8g2_menu_textArea_t ta${g};`,`static uint8_t ta${g}_inited = 0;`),F.push(`    if (!ta${g}_inited) {`,`        ta${g}_inited = 1;`,`        u8g2_textArea_init(&ta${g}, ta${g}_text);`,`        u8g2_textArea_setLineSpacing(&ta${g}, ${Math.max(0,Math.trunc($.lineSpacing))});`,"    }");break}default:break}let B=(c,$)=>{if(!c)return"";let g=`"${me(c)}"`;return $===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${g});`:`u8g2_MenuUTF8Printf(${g});`},ve=(c,$,g)=>{let w=`"${me(c)}"`;return $===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${g});`:`u8g2_MenuUTF8Printf(${w}, ${g});`},Ae=0,ae=(c,$)=>{let g=[],w=`${$.name}`,I=v=>{if(!v)return null;let _=n.get(v);return _||t.push(`\u9875\u9762 ${w} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),_??null};switch(c.kind){case"text":{let v=B(c.text,c.scale);v&&g.push(`    ${v}`);break}case"number":{let v=c,_=I(v.varId);if(_&&v.editable!==!1){let k=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${J(_.step)}, ${J(_.min)}, ${J(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;g.push(`    ${k}`)}if(_)g.push(`    ${ve(v.text,v.scale,_.name)}`),v.editable!==!1&&!/%[-+ #0]*[a-zA-Z]/.test(v.text)&&t.push(`\u6570\u503C\u6761\u76EE "${w}" \u7684\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(/%[-+ #0]*[a-zA-Z]/.test(v.text)){t.push(`\u9875\u9762 ${w} \u7684\u6570\u503C\u6761\u76EE\u672A\u7ED1\u5B9A\u53D8\u91CF\u4F46\u6587\u672C\u542B\u5360\u4F4D\u7B26\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let k=B(v.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),v.scale);k&&g.push(`    ${k}`)}else{let k=B(v.text,v.scale);k&&g.push(`    ${k}`)}break}case"switch":{let v=c,_=I(v.varId);if(_){if(_.srcType!=="uint8"){t.push(`\u5F00\u5173\u6761\u76EE\u7ED1\u5B9A\u7684\u53D8\u91CF "${_.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${_.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`);let k=B(v.text,v.scale);k&&g.push(`    ${k}`);break}g.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(v.openValue)});`),g.push(`    ${ve(v.text,v.scale,`${_.name} ? "${me(v.onText)}" : "${me(v.offText)}"`)}`),/%[-+ #0]*s/.test(v.text)||t.push(`\u5F00\u5173\u6761\u76EE "${_.name}" \u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off`)}else{let k=B(v.text,v.scale);k&&g.push(`    ${k}`)}break}case"button":{let v=Y(c.cbName,"btn_cb");g.push(`    u8g2_MenuItem_button(${v}, ${Math.trunc(c.buttonId)});`);let _=B(c.text,c.scale);_&&g.push(`    ${_}`);break}case"submenu":{if(!c.targetPageId){t.push(`\u9875\u9762 ${w} \u7684\u5B50\u9875\u9762\u6761\u76EE "${c.text||c.label||c.id}" \u672A\u6307\u5B9A\u76EE\u6807\u9875\u9762\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let k=B(c.text,c.scale);k&&g.push(`    ${k}`);break}let v=r.pages.findIndex(k=>k.id===c.targetPageId);if(v<0){t.push(`\u9875\u9762 ${w} \u7684\u5B50\u9875\u9762\u6761\u76EE\u76EE\u6807\u65E0\u6548`);break}g.push(`    u8g2_MenuItem_menu_enter(${i[v]});`);let _=B(c.text,c.scale);_&&g.push(`    ${_}`);break}case"back":{g.push("    u8g2_MenuItem_menu_back();");let v=B(c.text,c.scale);v&&g.push(`    ${v}`);break}case"slider":case"progress":{let v=I(c.varId);if(!v){t.push(`\u9875\u9762 ${w} \u7684${c.kind==="slider"?"\u6ED1\u5757":"\u8FDB\u5EA6"}\u6761\u76EE\u672A\u7ED1\u5B9A\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7`);break}if(!Gt.has(v.srcType)){t.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u7ED1\u5B9A\u7684\u53D8\u91CF "${v.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${v.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);break}let _=c.kind==="slider"?"Slider":"ProgressBar";g.push(`    u8g2_MenuDrawItem${_}_bind(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`);break}case"chart":{let v=f.get(c.id),_=b.get(c.id);if(!v||!_)break;g.push(...v),g.push(_);break}case"xbm":g.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${T.get(c.id)??Y(c.name,"icon")});`);break;case"textarea":{let v=Ae++;g.push(...F[v].split(`
`));let _=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";g.push(`    ${_}(&ta${v}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{let v=Y(c.cbName,"board_cb");g.push(`    u8g2_MenuDrawItemBoard(${v}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return g},p=[];p.push("/**"),p.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${r.name}`),p.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),p.push(" *"),p.push(" * main.c \u91CC\u4F7F\u7528\u4EE5\u4E0B\u7B26\u53F7\u65F6\uFF0C\u76F4\u63A5 extern\uFF08\u6216\u590D\u5236\u4E0B\u9762\u58F0\u660E\uFF09\uFF1A"),i.forEach((c,$)=>p.push(` *   void ${c}(void);   /* \u9875\u9762: ${r.pages[$].name} */`));for(let c of s.values())p.push(` *   extern ${c.type} ${c.name};`);for(let[c]of o)p.push(` *   void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(let c of l)p.push(` *   void ${c}(u8g2_t *u8g2);`);p.push(" */"),p.push('#include "u8g2_menu.h"'),(r.chartBuffers??[]).some(c=>c.sample==="sine")&&p.push("#include <math.h>"),p.push(""),p.push(O("includes",a,"")),p.push(""),i.forEach(c=>p.push(`void ${c}(void);`)),p.push(""),p.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),p.push(O("variables",a,""));for(let c of s.values())p.push(`${c.type} ${c.name} = ${c.init};`);if(p.push(""),(d.length||m.length||z.length||R.length)&&(p.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),p.push(...d,...m,...z,...R),p.push("")),o.size||l.size){p.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),p.push(O("callbacks",a,""));for(let[c]of o)p.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID)`),p.push("{"),p.push(O(`cb_${c}`,a,"    ")),p.push("}"),p.push("");for(let c of l)p.push(`void ${c}(u8g2_t *u8g2)`),p.push("{"),p.push(O(`cb_${c}`,a,"    ")),p.push("}"),p.push("")}let M=(r.weakHooks??[]).map(c=>W.find($=>$.fn===c)).filter(c=>!!c);if(M.length||a.has("weak")||W.some(c=>(a.get(`weak_${c.fn}`)??"").trim())){p.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),p.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),p.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let $=W.filter(g=>!r.weakHooks?.includes(g.fn)&&(a.get(`weak_${g.fn}`)??"").trim()).map(g=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${g.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${g.decl}`,"{",O(`weak_${g.fn}`,a,"    "),"}","#endif"].join(`
`)).join(`
`);p.push($?`${O("weak",a,"").replace(/\n$/,"")}
${$}
`:O("weak",a,"")),p.push("");for(let g of M){p.push(`/* ${g.label}: ${g.desc} */`),p.push(`${g.decl}`),p.push("{"),p.push(O(`weak_${g.fn}`,a,"    "));let w=g.bodyArgs.split(`
`).map(I=>`    ${I}`);g.retNote&&w.push(`    ${g.retNote}`),p.push(...w),p.push("}"),p.push("")}}return p.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),p.push(""),r.pages.forEach((c,$)=>{p.push(`/* \u9875\u9762: ${c.name} */`),p.push(`void ${i[$]}(void)`),p.push("{"),p.push(O(`page_${i[$]}_pre`,a,"    "));for(let g of c.items)p.push(...ae(g,c));p.push("}"),p.push("")}),{c:`${p.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:t}}function He(r,e){return e?r.get(e)??null:null}var Ie=(o=>(o[o.None=0]="None",o[o.Up=1]="Up",o[o.Down=2]="Down",o[o.Enter=3]="Enter",o[o.Return=4]="Return",o[o.Add=5]="Add",o[o.Sub=6]="Sub",o))(Ie||{});var Jt=128*64/8;function Qt(r){return new Promise((e,t)=>{let a=document.createElement("script");a.src=r,a.onload=()=>e(),a.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${r}`)),document.head.appendChild(a)})}var we=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.lastKnownPage=0;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await Qt(e);let a=t.U8G2MenuPreview;if(!a)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await a({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let i=this.mod._em_font_count_export();for(let s=0;s<i;s++){let n=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(n),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(t=>`${t.name}|${t.dataLen}|${t.sample}`),pages:e.pages.map(t=>({n:t.items.length,k:t.items.map(a=>a.kind).join(","),res:t.items.map(a=>a.kind==="chart"?(a.sources??[]).map(i=>`${i.bufferId}|${i.chartKind}|${i.min??"a"}|${i.max??"a"}`).join(">"):a.kind==="xbm"?`${a.w}x${a.h}`:a.kind==="textarea"?Math.ceil(a.content.length/64):"").join(",")}))})}sync(e){let t=this.mod;if(!t)return;let a=this.signature(e);a!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=a);let i=l=>Math.trunc(Number.isFinite(l)?l:0),s=l=>l?(e.variables??[]).findIndex(d=>d.id===l):-1,n=new Map((e.variables??[]).map(l=>[l.id,l]));(e.chartBuffers??[]).forEach((l,d)=>{t.ccall("em_buf_define",null,["number","number","number"],[d,i(l.dataLen),{sine:0,ramp:1,noise:2,none:3}[l.sample]])});let o=l=>(e.chartBuffers??[]).findIndex(d=>d.id===l);e.pages.forEach((l,d)=>{t.ccall("em_page_begin",null,["number"],[d]),l.items.forEach((u,m)=>{let f=["number","number"];switch(u.kind){case"text":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,0,0,u.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,u.text]);break;case"number":{let b=He(n,u.varId);t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,1,b?{uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[b.type]:0,u.scale,0,0,0,0,0,b?i(b.initialValue):0,b?i(b.step):0,b?i(b.min):0,b?i(b.max):0,-1,0,0,0,0,u.editable===!1?1:0,s(u.varId)]),t.ccall("em_item_text",null,["number","number","string"],[d,m,u.text]);break}case"switch":{let b=He(n,u.varId);t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,2,0,u.scale,0,0,i(u.openValue),0,0,b?i(b.initialValue):0,0,0,0,-1,0,0,0,0,0,s(u.varId)]),t.ccall("em_item_text",null,["number","number","string"],[d,m,u.text]),t.ccall("em_item_swtext",null,["number","number","string","string"],[d,m,u.onText,u.offText]);break}case"button":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,3,0,u.scale,0,0,0,i(u.buttonId),0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,u.text]);break;case"submenu":{let b=e.pages.findIndex(x=>x.id===u.targetPageId);t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,4,0,u.scale,0,0,0,0,0,0,0,0,0,b,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,u.text]);break}case"back":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,5,0,u.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,u.text]);break;case"slider":case"progress":{let b=He(n,u.varId),x=u.kind==="slider"?5:6;t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,x,0,1,0,0,0,0,0,b?i(b.initialValue):0,b?i(b.step):0,b?i(b.min):0,b?i(b.max):0,-1,0,0,0,0,0,s(u.varId)]);break}case"chart":{t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,8,0,1,0,0,0,0,0,0,0,0,0,-1,0,0,i(u.height),0,0,-1]);for(let b of u.sources??[]){let x=b.min!==void 0&&b.max!==void 0?1:0;t.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[d,m,o(b.bufferId),{line:0,point:1,bar:2}[b.chartKind],x,x?b.max??0:0,x?b.min??0:0])}break}case"xbm":{t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,9,0,1,0,0,0,0,0,0,0,0,0,-1,i(u.w),i(u.h),0,0,0,-1]);let b=t._em_scratch(u.bits.length);b&&(t.HEAPU8.set(new Uint8Array(u.bits),b),t._em_item_bits(d,m,b,u.bits.length));break}case"textarea":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,10,0,1,0,u.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,i(u.height),0,i(u.lineSpacing),-1]),t.ccall("em_item_text",null,["number","number","string"],[d,m,u.content]);break;case"board":t.ccall("em_page_item",null,[...f,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[d,m,11,0,1,0,0,0,0,0,0,0,0,0,-1,i(u.w),i(u.h),0,0,0,-1]);break}}),t.ccall("em_page_end",null,["number","number"],[d,l.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],i(e.selectorLeftMargin),i(e.selectorTopMargin),i(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let a=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(a),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let a=t._em_frame(e);if(!a)return;this.img||(this.img=this.ctx.createImageData(128,64));let i=t.HEAPU8.subarray(a,a+Jt),s=this.img.data;s.fill(255);for(let o=0;o<64;o++){let l=(o>>3)*128,d=1<<(o&7),u=o*128*4;for(let m=0;m<128;m++)i[l+m]&d&&(s[u]=17,s[u+1]=24,s[u+2]=39),u+=4}this.ctx.putImageData(this.img,0,0);let n=t._em_get_current_page();n!==this.lastKnownPage&&(this.lastKnownPage=n,this.events.onPageChanged?.(n))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Fe=globalThis,lt=r=>r,ke=Fe.trustedTypes,mt=ke?ke.createPolicy("lit-html",{createHTML:r=>r}):void 0,ft="$lit$",Q=`lit$${Math.random().toFixed(9).slice(2)}$`,ht="?"+Q,en=`<${ht}>`,ne=document,ce=()=>ne.createComment(""),pe=r=>r===null||typeof r!="object"&&typeof r!="function",qe=Array.isArray,tn=r=>qe(r)||typeof r?.[Symbol.iterator]=="function",Ke=`[ 	
\f\r]`,de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ct=/>/g,ee=RegExp(`>|${Ke}(?:([^\\s"'>=/]+)(${Ke}*=${Ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,gt=/"/g,vt=/^(?:script|style|textarea|title)$/i,ze=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),h=ze(1),Bn=ze(2),Ln=ze(3),ge=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),bt=new WeakMap,te=ne.createTreeWalker(ne,129);function xt(r,e){if(!qe(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(e):e}var nn=(r,e)=>{let t=r.length-1,a=[],i,s=e===2?"<svg>":e===3?"<math>":"",n=de;for(let o=0;o<t;o++){let l=r[o],d,u,m=-1,f=0;for(;f<l.length&&(n.lastIndex=f,u=n.exec(l),u!==null);)f=n.lastIndex,n===de?u[1]==="!--"?n=dt:u[1]!==void 0?n=ct:u[2]!==void 0?(vt.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=ee):u[3]!==void 0&&(n=ee):n===ee?u[0]===">"?(n=i??de,m=-1):u[1]===void 0?m=-2:(m=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?ee:u[3]==='"'?gt:pt):n===gt||n===pt?n=ee:n===dt||n===ct?n=de:(n=ee,i=void 0);let b=n===ee&&r[o+1].startsWith("/>")?" ":"";s+=n===de?l+en:m>=0?(a.push(d),l.slice(0,m)+ft+l.slice(m)+Q+b):l+Q+(m===-2?o:b)}return[xt(r,s+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},be=class r{constructor({strings:e,_$litType$:t},a){let i;this.parts=[];let s=0,n=0,o=e.length-1,l=this.parts,[d,u]=nn(e,t);if(this.el=r.createElement(d,a),te.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(i=te.nextNode())!==null&&l.length<o;){if(i.nodeType===1){if(i.hasAttributes())for(let m of i.getAttributeNames())if(m.endsWith(ft)){let f=u[n++],b=i.getAttribute(m).split(Q),x=/([.?@])?(.*)/.exec(f);l.push({type:1,index:s,name:x[2],strings:b,ctor:x[1]==="."?je:x[1]==="?"?De:x[1]==="@"?Ue:oe}),i.removeAttribute(m)}else m.startsWith(Q)&&(l.push({type:6,index:s}),i.removeAttribute(m));if(vt.test(i.tagName)){let m=i.textContent.split(Q),f=m.length-1;if(f>0){i.textContent=ke?ke.emptyScript:"";for(let b=0;b<f;b++)i.append(m[b],ce()),te.nextNode(),l.push({type:2,index:++s});i.append(m[f],ce())}}}else if(i.nodeType===8)if(i.data===ht)l.push({type:2,index:s});else{let m=-1;for(;(m=i.data.indexOf(Q,m+1))!==-1;)l.push({type:7,index:s}),m+=Q.length-1}s++}}static createElement(e,t){let a=ne.createElement("template");return a.innerHTML=e,a}};function se(r,e,t=r,a){if(e===ge)return e;let i=a!==void 0?t._$Co?.[a]:t._$Cl,s=pe(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(r),i._$AT(r,t,a)),a!==void 0?(t._$Co??=[])[a]=i:t._$Cl=i),i!==void 0&&(e=se(r,i._$AS(r,e.values),i,a)),e}var Re=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??ne).importNode(t,!0);te.currentNode=i;let s=te.nextNode(),n=0,o=0,l=a[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new fe(s,s.nextSibling,this,e):l.type===1?d=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(d=new Oe(s,this,e)),this._$AV.push(d),l=a[++o]}n!==l?.index&&(s=te.nextNode(),n++)}return te.currentNode=ne,i}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},fe=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=se(this,e,t),pe(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==ge&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):tn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&pe(this._$AH)?this._$AA.nextSibling.data=e:this.T(ne.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,i=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=be.createElement(xt(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{let s=new Re(i,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s}}_$AC(e){let t=bt.get(e.strings);return t===void 0&&bt.set(e.strings,t=new be(e)),t}k(e){qe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,i=0;for(let s of e)i===t.length?t.push(a=new r(this.O(ce()),this.O(ce()),this,this.options)):a=t[i],a._$AI(s),i++;i<t.length&&(this._$AR(a&&a._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=lt(e).nextSibling;lt(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,s){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=y}_$AI(e,t=this,a,i){let s=this.strings,n=!1;if(s===void 0)e=se(this,e,t,0),n=!pe(e)||e!==this._$AH&&e!==ge,n&&(this._$AH=e);else{let o=e,l,d;for(e=s[0],l=0;l<s.length-1;l++)d=se(this,o[a+l],t,l),d===ge&&(d=this._$AH[l]),n||=!pe(d)||d!==this._$AH[l],d===y?e=y:e!==y&&(e+=(d??"")+s[l+1]),this._$AH[l]=d}n&&!i&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},je=class extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}},De=class extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}},Ue=class extends oe{constructor(e,t,a,i,s){super(e,t,a,i,s),this.type=5}_$AI(e,t=this){if((e=se(this,e,t,0)??y)===ge)return;let a=this._$AH,i=e===y&&a!==y||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==y&&(a===y||i);i&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Oe=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){se(this,e)}};var rn=Fe.litHtmlPolyfillSupport;rn?.(be,fe),(Fe.litHtmlVersions??=[]).push("3.3.3");var D=(r,e,t)=>{let a=t?.renderBefore??e,i=a._$litPart$;if(i===void 0){let s=t?.renderBefore??null;a._$litPart$=i=new fe(e.insertBefore(ce(),s),s,void 0,t??{})}return i._$AI(r),i};var an=Object.keys(ie);function sn(r,e,t,a){let i=r.getState(),s=t.label||"text"in t&&t.text||ie[t.kind],n=o=>l=>{l.stopPropagation(),r.getState().moveItem(e.id,t.id,o)};return h`<div class="ume-item-row ${a?"selected":""}"
    @click=${()=>r.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${st[t.kind]}</span>
    <span class="ume-item-name" title=${s}>${s}</span>
    <button class="ume-mini" title="上移" @click=${n(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${n(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${o=>{o.stopPropagation(),i.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${o=>{o.stopPropagation(),i.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function on(r,e){let t=r.getState();return h`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${a=>{let i=a.target.value;i&&t.addItem(i,e.id),a.target.value=""}}>
    <option value="">＋条目</option>
    ${an.map(a=>h`<option value=${a}>${ie[a]}</option>`)}
  </select>`}function $t(r,e){let{project:t,selection:a}=e.getState(),i=s=>{let n=e.getState(),o=a.pageId===s.id;return h`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${l=>{l.stopPropagation(),n.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${l=>{l.stopPropagation(),n.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${l=>{if(l.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&n.removePage(s.id)}}>✕</button>
      </div>
      ${o?h`<div class="ume-page-items">
        ${s.items.length?s.items.map(l=>sn(e,s,l,a.itemId===l.id)):h`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${on(e,s)}</div>
      </div>`:y}
    </div>`};D(h`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>un(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(i)}
  `,r)}function un(r){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${r.getState().project.pages.length+1}`);e!==null&&r.getState().addPage(e||void 0)}function N(r,e,t,a=""){return h`<div class="ume-field">
    <label>${r}</label>
    <input type="text" .value=${e??""} placeholder=${a}
      @change=${i=>t(i.target.value)} />
  </div>`}function E(r,e,t,a=1){return h`<div class="ume-field">
    <label>${r}</label>
    <input type="number" .value=${String(e)} step=${String(a)}
      @change=${i=>{let s=parseFloat(i.target.value);t(Number.isFinite(s)?s:0)}} />
  </div>`}function U(r,e,t,a){return h`<div class="ume-field">
    <label>${r}</label>
    <select @change=${i=>a(i.target.value)}>
      ${t.map(i=>h`<option value=${i.value} ?selected=${i.value===e}>${i.label}</option>`)}
    </select>
  </div>`}function Se(r,e,t){return h`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${a=>t(a.target.checked)} />
    <span>${r}</span>
  </div>`}function _t(r,e,t,a=!1){return h`<div class="ume-field wide">
    <label>${r}</label>
    <textarea style=${a?"font-family:Consolas,monospace":""}
      @change=${i=>t(i.target.value)}>${e??""}</textarea>
  </div>`}function he(r,e,t="text/plain"){let a=new Blob([e],{type:`${t};charset=utf-8`}),i=document.createElement("a");i.href=URL.createObjectURL(a),i.download=r,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3)}var ln=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]),yt={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function Xe(r,e,t,a){let i=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...t.map(n=>({value:n.id,label:`${n.name} : ${yt[n.type]??n.type}`}))],s=e?t.some(n=>n.id===e):!1;return h`
    ${U(r,e??"",i,n=>a(n||null))}
    ${e&&!s?h`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:y}
    ${t.length===0?h`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:y}
  `}function We(r,e,t){return h`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let a=r.getState().addVariable();r.getState().updateItem(e,t,{varId:a.id})}}>＋ 新建变量并绑定</button>
  </div>`}function Ze(r){return r?h`<div class="ume-hint">
    ${r.name} : ${yt[r.type]??r.type}，范围 ${r.min}~${r.max}，步长 ${r.step}，初值 ${r.initialValue}
    （在右侧「变量」区修改）
  </div>`:h`${y}`}function wt(r,e,t){let{project:a,selection:i}=e.getState(),s=a.pages.find(u=>u.id===i.pageId)??null,n=s?.items.find(u=>u.id===i.itemId)??null,o=(u,m)=>e.getState().updateItem(s.id,n.id,u,m),l=h`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,d="\u5C5E\u6027";if(s&&!n)d="\u9875\u9762\u5C5E\u6027",l=h`
      ${N("\u540D\u79F0",s.name,u=>e.getState().updatePage(s.id,{name:u}))}
      ${N("C \u51FD\u6570\u540D",s.fnName,u=>e.getState().updatePage(s.id,{fnName:u}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&n)switch(d=`${ie[n.kind]}`,n.kind){case"text":l=h`
          ${N("\u6587\u672C/\u683C\u5F0F",n.text,u=>o({text:u},`text-${n.id}`))}
          ${U("\u5927\u5C0F",String(n.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],u=>o({scale:Number(u)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{let u=n,m=a.variables??[],f=m.find(x=>x.id===u.varId),b=f&&(f.type==="float"||f.type==="double")?"float/double \u63A8\u8350\u683C\u5F0F %.1f / %.2f":"\u6574\u6570\u63A8\u8350\u683C\u5F0F %d\uFF08\u65E0\u7B26\u53F7\u7528 %u\uFF09";l=h`
          ${Xe("\u7ED1\u5B9A\u53D8\u91CF",u.varId,m,x=>o({varId:x}))}
          ${f?y:We(e,s.id,u.id)}
          ${Se("\u53EF\u7F16\u8F91\uFF08\u7ED1\u5B9A\u9644\u52A0\u503C\uFF0C\u53D6\u6D88\u5219\u4EC5\u663E\u793A\uFF09",u.editable!==!1,x=>o({editable:x}))}
          ${Ze(f)}
          ${N("\u663E\u793A\u6587\u672C",u.text,x=>o({text:x},`text-${n.id}`))}
          ${U("\u5927\u5C0F",String(u.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],x=>o({scale:Number(x)}))}
          <div class="ume-hint">${b}；文本支持 \n 多行</div>
        `;break}case"switch":{let u=n,m=(a.variables??[]).filter(b=>b.type==="uint8"),f=m.find(b=>b.id===u.varId)??(a.variables??[]).find(b=>b.id===u.varId);l=h`
          ${Xe("\u7ED1\u5B9A\u53D8\u91CF",u.varId,m,b=>o({varId:b}))}
          ${f?y:We(e,s.id,u.id)}
          ${Ze(f)}
          ${N("\u663E\u793A\u6587\u672C",u.text,b=>o({text:b},`text-${n.id}`))}
          ${E("openValue",u.openValue,b=>o({openValue:Math.max(0,Math.trunc(b))}))}
          ${N('"\u5F00"\u6587\u672C',u.onText,b=>o({onText:b}))}
          ${N('"\u5173"\u6587\u672C',u.offText,b=>o({offText:b}))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;break}case"button":{let u=n;l=h`
          ${N("\u663E\u793A\u6587\u672C",u.text,m=>o({text:m},`text-${n.id}`))}
          ${N("\u56DE\u8C03\u51FD\u6570\u540D",u.cbName,m=>o({cbName:m}))}
          ${E("ID",u.buttonId,m=>o({buttonId:Math.trunc(m)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{let u=n;l=h`
          ${N("\u663E\u793A\u6587\u672C",u.text,m=>o({text:m},`text-${n.id}`))}
          ${U("\u76EE\u6807\u9875\u9762",u.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...a.pages.filter(m=>m.id!==s.id).map(m=>({value:m.id,label:m.name}))],m=>o({targetPageId:m||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{l=h`
          ${N("\u663E\u793A\u6587\u672C",n.text,u=>o({text:u},`text-${n.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{let u=(a.variables??[]).filter(f=>ln.has(f.type)),m=u.find(f=>f.id===n.varId)??(a.variables??[]).find(f=>f.id===n.varId);l=h`
          ${Xe("\u7ED1\u5B9A\u53D8\u91CF",n.varId,u,f=>o({varId:f}))}
          ${m?y:We(e,s.id,n.id)}
          ${Ze(m)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;break}case"chart":{let u=n,m=a.chartBuffers??[],f=x=>o({sources:x}),b=(x,R)=>{let z=m.find(A=>A.id===x.bufferId),F=x.min===void 0||x.max===void 0;return h`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${z?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[x.chartKind]??x.chartKind}${F?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${x.min}~${x.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>f(u.sources.filter((A,T)=>T!==R))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${U("\u7F13\u51B2\u533A",x.bufferId,m.map(A=>({value:A.id,label:`${A.name} (${A.dataLen}\u70B9)`})),A=>f(u.sources.map((T,V)=>V===R?{...T,bufferId:A}:T)))}
              ${U("\u7ED8\u5236",x.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],A=>f(u.sources.map((T,V)=>V===R?{...T,chartKind:A}:T)))}
              ${Se("\u81EA\u52A8\u91CF\u7A0B",F,A=>f(u.sources.map((T,V)=>V===R?{...T,min:A?void 0:0,max:A?void 0:100}:T)))}
              ${F?y:h`
                ${E("\u91CF\u7A0B\u4E0A\u9650",x.max??100,A=>f(u.sources.map((T,V)=>V===R?{...T,max:A}:T)),"any")}
                ${E("\u91CF\u7A0B\u4E0B\u9650",x.min??0,A=>f(u.sources.map((T,V)=>V===R?{...T,min:A}:T)),"any")}`}
            </div>
          </div>`};l=h`
          ${E("\u9AD8\u5EA6(px)",u.height,x=>o({height:Math.max(4,Math.trunc(x))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(u.sources??[]).map(b)}
              ${(u.sources??[]).length===0?h`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:y}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(u.sources??[]).length>=4}
                @click=${()=>{if(!m.length){let x=e.getState().addChartBuffer();f([...u.sources??[],{bufferId:x.id,chartKind:"line"}]);return}f([...u.sources??[],{bufferId:m[0].id,chartKind:"line"}])}}>＋ 添加数据源${(u.sources??[]).length>0?"\uFF08\u53E0\u52A0\uFF09":""}</button>
              ${m.length?y:h`<div class="ume-hint">将自动新建数据源缓冲区（在右侧「数据源」区可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{let u=n;l=h`
          ${N("\u6570\u7EC4\u540D",u.name,m=>o({name:m}))}
          ${E("\u5BBD(px)",u.w,m=>o({w:Math.min(128,Math.max(1,Math.trunc(m)))}))}
          ${E("\u9AD8(px)",u.h,m=>o({h:Math.min(64,Math.max(1,Math.trunc(m)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(s.id,u.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${u.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let u=n;l=h`
          ${_t("\u6587\u672C\u5185\u5BB9",u.content,m=>o({content:m}))}
          ${E("\u9AD8\u5EA6(px)",u.height,m=>o({height:Math.max(10,Math.trunc(m))}))}
          ${E("\u884C\u95F4\u8DDD",u.lineSpacing,m=>o({lineSpacing:Math.max(0,Math.trunc(m))}))}
          ${Se("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",u.bindScroll,m=>o({bindScroll:m}))}
        `;break}case"board":{let u=n;l=h`
          ${E("\u5BBD(px)",u.w,m=>o({w:Math.max(1,Math.trunc(m))}))}
          ${E("\u9AD8(px)",u.h,m=>o({h:Math.max(1,Math.trunc(m))}))}
          ${N("\u56DE\u8C03\u51FD\u6570\u540D",u.cbName,m=>o({cbName:m}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}D(h`
    <div class="ume-panel-title">属性 ${d!=="\u5C5E\u6027"?h`<span class="ume-kind-badge">${d}</span>`:y}</div>
    ${l}
  `,r)}var Ee=null,Ye=null,mn=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function dn(r,e){let t=e.variables??[],a=s=>{Ee=Ee===s?null:s},i=s=>{let n=Ee===s.id,o=(m,f)=>r.getState().updateVariable(s.id,m,f),l=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=t.filter(m=>m.name===s.name).length>1,u=cn(e,s.id);return h`<div class="ume-var-item ${n?"editing":""}">
      <div class="ume-var-row" @click=${()=>a(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${u?` \xB7 ${u} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${m=>{m.stopPropagation();let f=r.getState().removeVariable(s.id);f>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${f} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${n?h`<div class="ume-var-edit">
        ${N("\u53D8\u91CF\u540D",s.name,m=>o({name:m.trim()},`vn-${s.id}`))}
        ${l?h`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:y}
        ${d?h`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:y}
        ${U("\u7C7B\u578B",s.type,mn,m=>o({type:m}))}
        ${E("\u521D\u59CB\u503C",s.initialValue,m=>o({initialValue:m},`vi-${s.id}`),"any")}
        ${E("\u6700\u5C0F\u503C",s.min,m=>o({min:m},`vmin-${s.id}`),"any")}
        ${E("\u6700\u5927\u503C",s.max,m=>o({max:m},`vmax-${s.id}`),"any")}
        ${E("\u6B65\u957F",s.step,m=>o({step:m},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:y}
    </div>`};return h`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{Ee=r.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(i):h`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function cn(r,e){let t=0;for(let a of r.pages)for(let i of a.items)"varId"in i&&i.varId===e&&t++;return t}function pn(r,e){let t=e.chartBuffers??[],a=s=>{let n=0;for(let o of e.pages)for(let l of o.items)l.kind==="chart"&&l.sources.some(d=>d.bufferId===s)&&n++;return n},i=s=>{let n=Ye===s.id,o=(u,m)=>r.getState().updateChartBuffer(s.id,u,m),l=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=a(s.id);return h`<div class="ume-var-item ${n?"editing":""}">
      <div class="ume-var-row" @click=${()=>{Ye=n?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[s.sample]}${d?` \xB7 ${d} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${u=>{u.stopPropagation();let m=r.getState().removeChartBuffer(s.id);m>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${m} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${n?h`<div class="ume-var-edit">
        ${N("\u6570\u7EC4\u540D",s.name,u=>o({name:u.trim()},`bn-${s.id}`))}
        ${l?h`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:y}
        ${E("\u70B9\u6570",s.dataLen,u=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(u)))},`bl-${s.id}`))}
        ${U("\u793A\u4F8B\u586B\u5145",s.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],u=>o({sample:u}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:y}
    </div>`};return h`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{Ye=r.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(i):h`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function It(r,e){let{project:t}=e.getState(),a=(o,l)=>e.getState().update(d=>{Object.assign(d,o)},l),i=t.weakHooks??[],s=(o,l)=>{e.getState().update(d=>{let u=d.weakHooks??[];d.weakHooks=l?[...new Set([...u,o])]:u.filter(m=>m!==o)})},n=h`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${i.length}/${W.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${W.map(o=>h`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${o.fn}${o.retNote?"\uFF08\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u5904\u7406 / 0 = \u4EA4\u7ED9\u5E93\uFF09":""}`}>
              <input type="checkbox" ?checked=${i.includes(o.fn)}
                @change=${l=>s(o.fn,l.target.checked)} />
              <span>${o.label}</span>
            </div>
            <div class="ume-weak-desc">${o.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;D(h`
    <div class="ume-panel-title">工程</div>
    ${N("\u5DE5\u7A0B\u540D",t.name,o=>a({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    ${dn(e,t)}
    ${pn(e,t)}

    <div class="ume-panel-title">样式</div>
    ${U("\u5B57\u4F53",t.font,Be.map(o=>({value:o.id,label:o.label})),o=>a({font:o}))}
    ${U("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],o=>a({selector:o}))}
    ${E("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,o=>a({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${E("\u9876\u8FB9\u8DDD",t.selectorTopMargin,o=>a({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${E("\u884C\u95F4\u8DDD",t.selectorLineSpacing,o=>a({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${E("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,o=>a({marqueeSpeed:o}),.05)}
    ${E("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,o=>a({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${n}
    ${y}
  `,r)}function kt(r,e){let t=i=>{let s,n=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),e.key(i),n(),s=window.setInterval(()=>e.key(i),180)},up:n}},a=(i,s,n)=>{let o=t(i);return h`<button class="ume-key" title=${n}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};D(h`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${i=>{let n={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[i.key];n!==void 0&&(i.preventDefault(),e.key(n))}}>
      ${e.canvas}
    </div>
    <div class="ume-keybar">
      ${a(1,"\u25B2","\u4E0A MENU_Key_Up")}
      ${a(2,"\u25BC","\u4E0B MENU_Key_Down")}
      ${a(3,"OK","\u786E\u8BA4 MENU_Key_Enter")}
      ${a(4,"\u232B","\u8FD4\u56DE MENU_Key_Return")}
      ${a(5,"\uFF0B","\u52A0 MENU_Key_Add")}
      ${a(6,"\uFF0D","\u51CF MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,r)}var re=null;function Et(r,e){re=e,r.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),gn(r)}function gn(r){if(!re)return;let e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",t=>{t.target===e&&St(e)}),D(h`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>St(e)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${re.warnings.length?h`
          <div style="margin-bottom:8px">
            ${re.warnings.map(t=>h`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:y}
        <div class="ume-code-view">${re.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(re.c).then(()=>bn(e,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{he("menu_pages.c",re.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,e),r.appendChild(e)}function St(r){r.remove()}function bn(r,e){let t=r.closest(".ume")??document.body,a=t.querySelector(".ume-toast");a||(a=document.createElement("div"),a.className="ume-toast",t.appendChild(a)),a.textContent=e,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),1600)}function Mt(r,e,t,a){let n=e.getState().project.pages.find(p=>p.id===t)?.items.find(p=>p.id===a);if(!n||n.kind!=="xbm")return;let o=n,l=o.w,d=o.h,u=[...o.bits],m=()=>Math.ceil(l/8),f=document.createElement("div");f.className="ume-modal-mask",f.addEventListener("click",p=>{p.target===f&&ae()});let b=(p,M)=>{let H=M*m()+(p>>3);return H<u.length?!!(u[H]>>(p&7)&1):!1},x=(p,M,H)=>{let c=M*m()+(p>>3);u[c]=H?u[c]|1<<(p&7):u[c]&~(1<<(p&7))},R=(p,M)=>{let H=Math.ceil(l/8),c=Math.ceil(p/8),$=new Array(c*M).fill(0);for(let g=0;g<Math.min(d,M);g++)for(let w=0;w<Math.min(l,p);w++){let I=g*H+(w>>3);I<u.length&&u[I]>>(w&7)&1&&($[g*c+(w>>3)]|=1<<(w&7))}l=p,d=M,u=$},z=!1,F=!0,A=(p,M)=>H=>{H.preventDefault(),z=!0,F=!b(p,M),x(p,M,F),B()},T=(p,M)=>()=>{z&&(x(p,M,F),B())},V=()=>{z=!1},B=()=>{D(Ae(),f)},ve=()=>{let p=[];for(let M=0;M<d;M++)for(let H=0;H<l;H++)p.push(h`<button class="ume-xbm-cell ${b(H,M)?"on":""}"
          data-x=${H} data-y=${M}
          @pointerdown=${A(H,M)}
          @pointerenter=${T(H,M)}></button>`);return p},Ae=()=>h`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${d}</span></span>
        <button class="ume-mini" @click=${ae}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${V}
        @pointerleave=${V}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${p=>{R(At(+p.target.value,1,128),d),B()}} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${p=>{R(l,At(+p.target.value,1,64)),B()}} />
          <button class="ume-btn sm" @click=${()=>{u=u.map(()=>0),B()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{u=u.map(p=>~p&255),B()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${ve()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${ae}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,a,{w:l,h:d,bits:[...u]}),ae()}}>应用</button>
      </div>
    </div>
  `;function ae(){f.remove(),document.removeEventListener("pointerup",V)}document.addEventListener("pointerup",V),B(),r.appendChild(f)}function At(r,e,t){return Number.isFinite(r)?Math.min(t,Math.max(e,Math.trunc(r))):e}var fn="prebuilt/u8g2-menu-preview.js",Ge=class{constructor(e,t={}){this.store=Ne();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let d=document.createElement("style");d.id="ume-style",d.textContent=Qe,document.head.appendChild(d)}let a=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,i=this.opts.data??a??void 0;if(i!==void 0)try{this.store.setState({project:ye(i)})}catch(d){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",d)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),e.innerHTML=`
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
    `;let n=d=>e.querySelector(d);this.els={left:n(".ume-left"),center:n(".ume-center"),right:n(".ume-right"),styleEl:n('[data-role="style"]'),propEl:n('[data-role="prop"]'),toolbarUndo:n('[data-act="undo"]'),toolbarRedo:n('[data-act="redo"]')};let o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new we(o,{onPageChanged:d=>this.onPreviewPageChanged(d)});let l=document.createElement("div");this.els.center.appendChild(l),kt(l,this.preview),this.preview.load(this.opts.wasmUrl??fn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(d=>{console.error(d);let u=document.createElement("div");u.className="ume-warn",u.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${d.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(u)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let d=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);d!==null&&this.store.getState().addPage(d||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{he(`${this.store.getState().project.name||"menu-project"}.json`,Le(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{n('[data-role="file"]').click()}),n('[data-role="file"]').addEventListener("change",d=>{let u=d.target.files?.[0];u&&(u.text().then(m=>{try{let f=ye(m);this.store.getState().update(b=>{Object.assign(b,f)}),this.scheduleRender()}catch(f){alert(`\u5BFC\u5165\u5931\u8D25: ${f.message}`)}}),d.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=ye(e);this.store.getState().update(a=>{Object.assign(a,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.lastExport,t=Ve(this.store.getState().project,e??void 0);return this.lastExport={c:t.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,t.c),Et(this.container,t),this.opts.onExport?.(t),t}downloadC(){let e=Ve(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:e.c},he("menu_pages.c",e.c)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Le(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();$t(this.els.left,this.store),It(this.els.styleEl,this.store),wt(this.els.propEl,this.store,{openXbmEditor:(t,a)=>Mt(this.container,this.store,t,a)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),t=document.getElementById("ume-page-jump"),a=this.store.getState(),i=this.store.getState().project.pages.findIndex(s=>s.id===a.selection.pageId);if(t){let s=a.project.pages,n=s.map(l=>l.name).join("|");t.dataset.sig!==n&&(t.dataset.sig=n,t.innerHTML="",s.forEach((l,d)=>{let u=document.createElement("option");u.value=String(d),u.textContent=`${d+1}. ${l.name}`,t.appendChild(u)}),t.onchange=()=>{let l=parseInt(t.value,10);Number.isFinite(l)&&this.preview.navTo(l)});let o=this.preview.currentPage;document.activeElement!==t&&t.value!==String(o)&&(t.value=String(o))}if(e&&i>=0&&a.selection.itemId){let s=a.project.pages[i],n=s.items.findIndex(l=>l.id===a.selection.itemId),o=s.items[n];if(o&&"varId"in o){let l=o.varId?(a.project.variables??[]).findIndex(f=>f.id===o.varId):-1,d=l>=0?l:i*64+n,u=o.kind==="switch"?this.preview.getSwitch(d):this.preview.getInt(d),m=(a.project.variables??[]).find(f=>f.id===o.varId)?.name;e.textContent=`${m??o.kind} = ${u}`}else e.textContent=""}}};return Vt(hn);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
