"use strict";var U8G2MenuEditor=(()=>{var Le=Object.defineProperty;var Ut=Object.getOwnPropertyDescriptor;var Dt=Object.getOwnPropertyNames;var Ft=Object.prototype.hasOwnProperty;var Ot=(a,e)=>{for(var t in e)Le(a,t,{get:e[t],enumerable:!0})},zt=(a,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Dt(e))!Ft.call(a,r)&&r!==t&&Le(a,r,{get:()=>e[r],enumerable:!(n=Ut(e,r))||n.enumerable});return a};var qt=a=>zt(Le({},"__esModule",{value:!0}),a);var Mn={};Ot(Mn,{MenuEditor:()=>nt,MenuKey:()=>Ce});var it=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }
/* ---------- \u53F3\u680F Tab ---------- */
.ume-tabs { display: flex; gap: 2px; margin: -10px -10px 10px; padding: 4px 8px 0; border-bottom: 1px solid var(--ume-border); background: var(--ume-panel); }
.ume-tabs button { border: none; border-bottom: 2px solid transparent; background: transparent; padding: 6px 14px 5px; font: inherit; font-size: 12px; color: var(--ume-dim); cursor: pointer; }
.ume-tabs button:hover { color: var(--ume-text); }
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`;var at=a=>{let e,t=new Set,n=(c,d)=>{let l=typeof c=="function"?c(e):c;if(!Object.is(l,e)){let p=e;e=d??(typeof l!="object"||l===null)?l:Object.assign({},e,l),t.forEach($=>$(e,p))}},r=()=>e,o={setState:n,getState:r,getInitialState:()=>u,subscribe:c=>(t.add(c),()=>t.delete(c))},u=e=a(n,r,o);return o},st=a=>a?at(a):at;var Be=0;function U(a){return Be=(Be+1)%1e9,`${a}_${Date.now().toString(36)}_${Be.toString(36)}`}function fe(a){return{id:U("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...a}}function Re(a){return{id:U("buf"),name:"buf_new",dataLen:32,sample:"sine",...a}}function ot(a,e){let t=new Set(a.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function ut(a,e){let t=new Set(a.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function z(a){let e={id:U("it"),label:"",bind:{type:"none"}};switch(a){case"text":return{...e,kind:a,text:"\u83DC\u5355\u9879",scale:1,displayVarId:null};case"slider":return{...e,kind:a,position:50};case"progress":return{...e,kind:a,position:50};case"chart":return{...e,kind:a,sources:[],height:32};case"xbm":return Wt(16,16);case"textarea":return{...e,kind:a,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:a,w:64,h:32,cbName:"board_cb"}}}function Wt(a,e){let t=Math.ceil(a/8);return{id:U("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:a,h:e,bits:new Array(t*e).fill(0)}}function He(a){return{id:U("pg"),name:a,fnName:"",items:[],userCodePre:""}}function Se(a,e){return{...a,...e}}function ee(a,e){return{...a,...e}}function lt(){let a=[fe({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),fe({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),fe({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[Re({name:"buf_demo",dataLen:32,sample:"sine"})],t=He("\u4E3B\u9875");t.items=[Se(z("text"),{text:"u8g2_menu"}),ee(z("text"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E",bind:{type:"submenu",targetPageId:null}}),ee(z("text"),{text:"\u5173\u4E8E",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];let n=He("\u8BBE\u7F6E");n.items=[ee(Se(z("text"),{text:"\u97F3\u91CF:%d"}),{bind:{type:"value",varId:a[0].id}}),ee(Se(z("text"),{text:"\u5F00\u5173:%s"}),{bind:{type:"switch",varId:a[1].id,openValue:1,onText:"on",offText:"off"}}),ee(z("slider"),{bind:{type:"value",varId:a[2].id}}),ee(z("text"),{text:"\u56FE\u8868",bind:{type:"submenu",targetPageId:null}}),ee(z("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let r=He("\u56FE\u8868");r.items=[Se(z("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),ee(z("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:a,chartBuffers:e,pages:[t,n,r]};return t.items[1].bind.targetPageId=n.id,n.items[3].bind.targetPageId=r.id,s}function dt(a){return structuredClone(a)}var Xt=800;function Ke(){let a=null,e=0;return st()((t,n)=>({project:lt(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{let i=Date.now(),o=!!s&&s===a&&i-e<Xt;a=s??null,e=i,t(u=>{let c=dt(u.project);return r(c),{project:c,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{t(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{t(r=>{if(!r.future.length)return r;let[s,...i]=r.future;return{project:s,past:[...r.past,r.project],future:i,dirty:!0}})},select:(r,s=null)=>t({selection:{pageId:r,itemId:s}}),addPage:r=>{let s={id:U("pg"),name:r??`\u9875\u9762${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(i=>{i.pages.push(s)}),t({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{n().update(i=>{i.pages=i.pages.filter(o=>o.id!==r);for(let o of i.pages)for(let u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});let{selection:s}=n();s.pageId===r&&t({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{n().update(i=>{let o=i.pages.findIndex(c=>c.id===r),u=o+s;o<0||u<0||u>=i.pages.length||([i.pages[o],i.pages[u]]=[i.pages[u],i.pages[o]])})},updatePage:(r,s)=>{n().update(i=>{let o=i.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{let i=s??n().selection.pageId??n().project.pages[0]?.id;if(!i)return null;let o=Zt(r);return n().update(u=>{u.pages.find(d=>d.id===i)?.items.push(o)}),t({selection:{pageId:i,itemId:o.id}}),o},removeItem:(r,s)=>{n().update(o=>{let u=o.pages.find(c=>c.id===r);u&&(u.items=u.items.filter(c=>c.id!==s))});let{selection:i}=n();i.itemId===s&&t({selection:{pageId:r,itemId:null}})},moveItem:(r,s,i)=>{n().update(o=>{let u=o.pages.find(l=>l.id===r);if(!u)return;let c=u.items.findIndex(l=>l.id===s),d=c+i;c<0||d<0||d>=u.items.length||([u.items[c],u.items[d]]=[u.items[d],u.items[c]])})},duplicateItem:(r,s)=>{let i=null;n().update(o=>{let u=o.pages.find(d=>d.id===r);if(!u)return;let c=u.items.findIndex(d=>d.id===s);c<0||(i=structuredClone(u.items[c]),i.id=U("it"),u.items.splice(c+1,0,i))}),i&&t({selection:{pageId:r,itemId:i.id}})},updateItem:(r,s,i,o)=>{n().update(u=>{let d=u.pages.find(l=>l.id===r)?.items.find(l=>l.id===s);d&&Object.assign(d,i)},o)},addVariable:r=>{let s=null;return n().update(i=>{i.variables=i.variables??[];let o=ut(i.variables,r?.name??"var_new");s=fe({...r,name:o}),i.variables.push(s)}),s},removeVariable:r=>{let s=0;for(let i of n().project.pages)for(let o of i.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(n().update(i=>{i.variables=(i.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,i)=>{n().update(o=>{let u=(o.variables??[]).find(c=>c.id===r);u&&Object.assign(u,s)},i)},addChartBuffer:r=>{let s=null;return n().update(i=>{i.chartBuffers=i.chartBuffers??[];let o=ot(i.chartBuffers,r?.name??"buf_new");s=Re({...r,name:o}),i.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(let i of n().project.pages)for(let o of i.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(n().update(i=>{i.chartBuffers=(i.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,i)=>{n().update(o=>{let u=(o.chartBuffers??[]).find(c=>c.id===r);u&&Object.assign(u,s)},i)}}))}var Hn=Ke();function Zt(a){return z(a)}var Y=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],ue={text:"\u6587\u672C",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},ct={text:"T",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},le={none:"\u65E0",value:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE"};var je=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var J=class extends Error{},mt=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),pt=new Set(["line","point","bar"]),ft=new Set(["sine","ramp","noise","none"]);function de(a){return typeof a=="object"&&a!==null&&!Array.isArray(a)}function N(a,e){return typeof a=="string"?a:e}function E(a,e){return typeof a=="number"&&Number.isFinite(a)?a:e}var Gt=["text","slider","progress","chart","xbm","textarea","board"],Yt=["number","switch","button","submenu","back"],Jt=["none","value","switch","button","submenu","back"];function Qt(a){if(!de(a))throw new J("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=N(a.kind,"");if(!(Gt.includes(e)||Yt.includes(e)))throw new J(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(a);switch(t.id=N(a.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=N(a.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=N(a.text,""),t.scale=a.scale===2?2:1;break}return t}function en(a){for(let e of a)for(let t of e.items){let n=t;if(!(n.bind&&de(n.bind)&&Jt.includes(N(n.bind.type,"none")))){switch(n.kind){case"number":{let r=n.varId??null;n.editable===!1?(n.kind="text",n.displayVarId=r,n.bind={type:"none"}):(n.kind="text",n.displayVarId=null,n.bind={type:"value",varId:r});break}case"switch":n.kind="text",n.displayVarId=null,n.bind={type:"switch",varId:n.varId??null,openValue:E(n.openValue,1),onText:N(n.onText,"on"),offText:N(n.offText,"off")};break;case"button":n.kind="text",n.displayVarId=null,n.bind={type:"button",cbName:N(n.cbName,"btn_cb"),buttonId:E(n.buttonId,1)};break;case"submenu":n.kind="text",n.displayVarId=null,n.bind={type:"submenu",targetPageId:n.targetPageId??null};break;case"back":n.kind="text",n.displayVarId=null,n.bind={type:"back"};break;case"slider":case"progress":n.bind=n.varId?{type:"value",varId:n.varId}:{type:"none"},n.position===void 0&&(n.position=50);break;default:n.bind={type:"none"},n.kind==="text"&&n.displayVarId===void 0&&(n.displayVarId=null);break}delete n.varId,delete n.varName,delete n.varType,delete n.editable,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals,n.kind!=="board"&&(delete n.cbName,delete n.buttonId),delete n.openValue,delete n.onText,delete n.offText,delete n.targetPageId}}}function tn(a){if(!de(a))throw new J("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(a.items)?a.items.map(Qt):[];return{id:N(a.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:N(a.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:N(a.fnName,""),items:e,userCodePre:N(a.userCodePre,"")}}function nn(a){if(!de(a))return null;let e=N(a.type,"int32");return{id:N(a.id,"")||U("vb"),name:N(a.name,""),type:mt.has(e)?e:"int32",initialValue:E(a.initialValue,0),min:E(a.min,0),max:E(a.max,100),step:E(a.step,1)}}function rn(a){if(!de(a))return null;let e=N(a.sample,"sine");return{id:N(a.id,"")||U("buf"),name:N(a.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(E(a.dataLen,32)))),sample:ft.has(e)?e:"sine"}}function an(a){let e=new Map,t=[],n=(r,s)=>{let i=e.get(r);return i||(i=s(),e.set(r,i),t.push(i)),i};for(let r of a)for(let s of r.items){let i=s;switch(s.kind){case"number":if(i.varId===void 0||i.varId===null){let u=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",c=n(u,()=>({id:U("vb"),name:u,type:mt.has(String(i.varType))?String(i.varType):"int32",initialValue:E(i.initialValue,0),min:E(i.min,0),max:E(i.max,100),step:E(i.step,1)}));s.varId=c.id}i.editable===void 0&&(s.editable=!0),delete i.varName,delete i.varType,delete i.step,delete i.min,delete i.max,delete i.initialValue,delete i.decimals;break;case"slider":case"progress":if(i.varId===void 0||i.varId===null){let u=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",c=n(u,()=>({id:U("vb"),name:u,type:"int",initialValue:E(i.initialValue,0),min:E(i.min,0),max:E(i.max,100),step:E(i.step,1)}));s.varId=c.id}delete i.varName,delete i.step,delete i.min,delete i.max,delete i.initialValue;break;case"switch":if(i.varId===void 0||i.varId===null){let u=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",c=n(u,()=>({id:U("vb"),name:u,type:"uint8",initialValue:E(i.initialValue,0),min:0,max:1,step:1}));s.varId=c.id}delete i.varName,delete i.initialValue;break;default:break}}return t}function Ae(a){let e;if(typeof a=="string")try{e=JSON.parse(a)}catch{throw new J("JSON \u89E3\u6790\u5931\u8D25")}else e=a;if(!de(e))throw new J("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,n=E(t.version,0);if(n>1)throw new J(`\u5DE5\u7A0B\u7248\u672C v${n} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);n<1&&void 0;let r=Array.isArray(t.pages)?t.pages.map(tn):[];if(!r.length)throw new J("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",i=new Set(Y.map(d=>d.fn)),o=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(d=>typeof d=="string"&&i.has(d)))]:[],u;Array.isArray(t.variables)?u=t.variables.map(nn).filter(d=>!!d):u=an(r);let c;return Array.isArray(t.chartBuffers)?c=t.chartBuffers.map(rn).filter(d=>!!d):c=sn(r),en(r),on(r,c),{version:1,name:N(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:E(t.width,128),height:E(t.height,64),font:N(t.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:E(t.selectorLeftMargin,16),selectorTopMargin:E(t.selectorTopMargin,0),selectorLineSpacing:E(t.selectorLineSpacing,0),marqueeSpeed:E(t.marqueeSpeed,.2),marqueeHeaderLen:E(t.marqueeHeaderLen,5),weakHooks:o,fontSubset:e.fontSubset===!0,fontExtra:N(e.fontExtra,""),variables:u,chartBuffers:c,pages:r}}function sn(a){let e=[],t=0,n=()=>{let r={id:U("buf"),name:`buf_chart_${++t}`,dataLen:32,sample:"sine"};return e.push(r),r};for(let r of a)for(let s of r.items){if(s.kind!=="chart")continue;let i=s;if(Array.isArray(i.sources))continue;let o=n();o.dataLen=Math.min(512,Math.max(2,Math.trunc(E(i.dataLen,32))));let u=N(i.sample,"sine");ft.has(u)&&(o.sample=u);let c=N(i.chartKind,"line"),d={bufferId:o.id,chartKind:pt.has(c)?c:"line"};i.max!==void 0&&i.max!==null&&(d.max=E(i.max,0)),i.min!==void 0&&i.min!==null&&(d.min=E(i.min,0)),s.sources=[d],i.height===void 0&&(s.height=32),delete i.chartKind,delete i.dataLen,delete i.sample,delete i.max,delete i.min}return e}function on(a,e){let t=new Set(e.map(n=>n.id));for(let n of a)for(let r of n.items){if(r.kind!=="chart")continue;let s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(i=>t.has(i.bufferId)).map(i=>({bufferId:i.bufferId,chartKind:pt.has(i.chartKind)?i.chartKind:"line",min:i.min,max:i.max})),typeof s.height!="number"&&(s.height=32)}}function Ue(a){return JSON.stringify(a,null,2)}var un={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function Q(a,e="anon"){let t=a.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function ge(a){return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function te(a){if(!Number.isFinite(a))return"0.0f";let e=a.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function ln(a,e,t){return t==="ramp"?`${a}[i] = (float)i;`:t==="noise"?`${a}[i] = (float)((i * 37) % ${e});`:`${a}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function dn(a){let e=new Map;if(!a)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,n;for(;(n=t.exec(a))!==null;)e.set(n[1],n[2]);return e}function X(a,e,t){let n=e.has(a)?e.get(a):"";return`${t}/* USER CODE BEGIN ${a} */${n}${t}/* USER CODE END ${a} */`}var cn=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function gt(a,e,t){let n=[],r=dn(e?.c??""),s=a.pages.map((m,I)=>m.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName)?m.fnName:`page_${I}`),i=new Map,o=new Map;for(let m of a.variables??[]){if(!m.name){n.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}if(i.has(m.name)){n.push(`\u53D8\u91CF\u540D "${m.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(m.name)||n.push(`\u53D8\u91CF\u540D "${m.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${Q(m.name)}"`);let I=Q(m.name,"var"),h=m.type==="float"||m.type==="double",S={name:I,srcType:m.type,type:un[m.type],init:h?te(m.initialValue):String(Math.trunc(m.initialValue)),isFloat:h,step:m.step,min:m.min,max:m.max};i.set(I,S),o.set(m.id,S)}let u=new Map,c=new Set,d=[],l=new Map;for(let m of a.chartBuffers??[]){if(!m.name){n.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");continue}let I=Q(m.name,"buf");if([...l.values()].some(j=>j.name===I)){n.push(`\u7F13\u51B2\u533A\u540D "${m.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let h=Math.max(2,Math.trunc(m.dataLen)),S=`${I.toUpperCase()}_LEN`;l.set(m.id,{name:I,lenMacro:S,len:h});let T=`fill_${I}`,R=(r.get(T)??"").trim()!=="";d.push(`#define ${S} ${h}`,`static float ${I}[${S}];`,`static uint8_t ${I}_filled = 0;`,`static void ${I}_fill(void)`,"{",X(T,r,"    "),...m.sample!=="none"&&!R?[`    for (uint16_t i = 0; i < ${S}; ++i) { ${ln(I,h,m.sample)} }`]:[],"}")}let p=[],$=new Map,x=new Map,_=new Map;{let m=0,I=0,h=S=>{let T=l.get(S);return T?(_.has(S)||_.set(S,`        if (!${T.name}_filled) { ${T.name}_filled = 1; ${T.name}_fill(); }`),_.get(S)):""};for(let S of a.pages)for(let T of S.items){if(T.kind!=="chart")continue;let R=T.sources.filter(M=>l.has(M.bufferId));if(T.sources.length&&!R.length){n.push(`\u9875\u9762 ${S.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!R.length){n.push(`\u9875\u9762 ${S.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let j=Math.max(4,Math.trunc(T.height)),Z=[];for(let M of R){let B=l.get(M.bufferId),y=`chart${m++}`;p.push(`static float ${y}_dis[${B.lenMacro}];`,`static u8g2_chart_t ${y};`),Z.push({name:y,s:M,b:B})}if(Z.length===1){let{name:M,s:B,b:y}=Z[0];p.push(`static uint8_t ${M}_inited = 0;`),$.set(T.id,[`    if (!${M}_inited) {`,`        ${M}_inited = 1;`,`        u8g2_chart_init(&${M}, ${y.name}, ${M}_dis, ${y.lenMacro});`,h(B.bufferId),"    }"]);let A=B.chartKind==="point"?"Point":B.chartKind==="bar"?"Bar":"Line",we=B.min!==void 0&&B.max!==void 0?`${te(B.max)}, ${te(B.min)}`:"0, 0";x.set(T.id,`    u8g2_MenuDrawItem${A}Chart(&${M}, ${j}, ${we});`)}else{let M=`chart_layers_${I++}`;p.push(`static u8g2_menu_drawChart_t ${M}[${Z.length}];`,`static uint8_t ${M}_inited = 0;`);let B=[`    if (!${M}_inited) {`,`        ${M}_inited = 1;`];Z.forEach(({name:y,s:A,b:we},ke)=>{B.push(`        u8g2_chart_init(&${y}, ${we.name}, ${y}_dis, ${we.lenMacro});`),B.push(h(A.bufferId));let jt=A.chartKind==="point"?"u8g2_drawPointChart":A.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",rt=A.min!==void 0&&A.max!==void 0?`${te(A.max)}, ${te(A.min)}`:"0, 0";B.push(`        ${M}[${ke}].drawChart = ${jt};`),B.push(`        ${M}[${ke}].chart = &${y};`),B.push(`        ${M}[${ke}].max = ${rt.split(", ")[0]};`),B.push(`        ${M}[${ke}].min = ${rt.split(", ")[1]};`)}),B.push("    }"),$.set(T.id,B),x.set(T.id,`    u8g2_MenuDrawItemChart(${M}, ${Z.length}, ${j});`)}}}let b=[],g=[],H=[],L=new Set,D=new Map,W=0;for(let m of a.pages)for(let I of m.items){if(I.bind.type==="button"){let h=Q(I.bind.cbName,"btn_cb");u.has(h)||u.set(h,I.bind.buttonId)}switch(I.kind){case"board":c.add(Q(I.cbName,"board_cb"));break;case"xbm":{let h=Q(I.name,"icon");for(;L.has(h);)h=`${h}_2`;L.add(h),D.set(I.id,h);let S=I.bits.length,T=I.bits.map(R=>`0x${(R&255).toString(16).padStart(2,"0")}`).join(", ");b.push(`static const uint8_t menu_xbm_${h}[${S}] = { ${T} };`);break}case"textarea":{let h=W++;g.push(`static char ta${h}_text[] = "${ge(I.content)}";`,`static u8g2_menu_textArea_t ta${h};`,`static uint8_t ta${h}_inited = 0;`),H.push(`    if (!ta${h}_inited) {`,`        ta${h}_inited = 1;`,`        u8g2_textArea_init(&ta${h}, ta${h}_text);`,`        u8g2_textArea_setLineSpacing(&ta${h}, ${Math.max(0,Math.trunc(I.lineSpacing))});`,"    }");break}default:break}}let G=(m,I)=>{if(!m)return"";let h=`"${ge(m)}"`;return I===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${h});`:`u8g2_MenuUTF8Printf(${h});`},C=(m,I,h)=>{let S=`"${ge(m)}"`;return I===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${S}, ${h});`:`u8g2_MenuUTF8Printf(${S}, ${h});`},V=0,k=(m,I)=>{let h=[],S=`${I.name}`,T=y=>{if(!y)return null;let A=o.get(y);return A||n.push(`\u9875\u9762 ${S} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),A??null},R=m.bind,j=null,Z=null,M="on",B="off";switch(R.type){case"value":{let y=T(R.varId);if(y){j=y;let A=y.isFloat?`u8g2_MenuItemValue_${y.srcType}(&${y.name}, ${te(y.step)}, ${te(y.min)}, ${te(y.max)});`:`u8g2_MenuItemValue_${y.srcType}(&${y.name}, ${Math.trunc(y.step)}, ${Math.trunc(y.min)}, ${Math.trunc(y.max)});`;h.push(`    ${A}`)}break}case"switch":{let y=T(R.varId);y&&y.srcType!=="uint8"?n.push(`\u5F00\u5173\u9644\u52A0\u503C\u7ED1\u5B9A\u7684\u53D8\u91CF "${y.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${y.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`):y&&(Z=y,M=R.onText,B=R.offText,h.push(`    u8g2_MenuItemValue_switch(&${y.name}, ${Math.trunc(R.openValue)});`));break}case"button":{let y=Q(R.cbName,"btn_cb");h.push(`    u8g2_MenuItem_button(${y}, ${Math.trunc(R.buttonId)});`);break}case"submenu":{let y=a.pages.findIndex(A=>A.id===R.targetPageId);!R.targetPageId||y<0?n.push(`\u9875\u9762 ${S} \u7684\u6761\u76EE "${m.label||"\u672A\u547D\u540D"}" \u9644\u52A0\u503C\u76EE\u6807\u9875\u9762\u65E0\u6548\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`):h.push(`    u8g2_MenuItem_menu_enter(${s[y]});`);break}case"back":h.push("    u8g2_MenuItem_menu_back();");break;default:break}switch(m.kind){case"text":{if(j)h.push(`    ${C(m.text,m.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(m.text)||n.push(`\u9875\u9762 ${S} \u7684\u6570\u503C\u9644\u52A0\u503C\u6761\u76EE\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(Z)h.push(`    ${C(m.text,m.scale,`${Z.name} ? "${ge(M)}" : "${ge(B)}"`)}`),/%[-+ #0]*s/.test(m.text)||n.push("\u5F00\u5173\u9644\u52A0\u503C\u6761\u76EE\u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off");else if(R.type==="none"&&m.displayVarId){let y=T(m.displayVarId);if(y)h.push(`    ${C(m.text,m.scale,y.name)}`),/%[-+ #0]*[a-zA-Z]/.test(m.text)||n.push(`\u9875\u9762 ${S} \u7684\u663E\u793A\u6761\u76EE\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else{n.push(`\u9875\u9762 ${S} \u7684\u663E\u793A\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let A=G(m.text,m.scale);A&&h.push(`    ${A}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(m.text)){n.push(`\u9875\u9762 ${S} \u7684\u6587\u672C\u6761\u76EE\u542B\u5360\u4F4D\u7B26\u4F46\u672A\u7ED1\u5B9A\u53D8\u91CF/\u663E\u793A\u53D8\u91CF\uFF0C\u5360\u4F4D\u7B26\u5DF2\u79FB\u9664`);let y=G(m.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),m.scale);y&&h.push(`    ${y}`)}else{let y=G(m.text,m.scale);y&&h.push(`    ${y}`)}break}case"slider":case"progress":{let y=m.kind==="slider"?"Slider":"ProgressBar";if(j){if(!cn.has(j.srcType)){n.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u9644\u52A0\u503C\u7684\u53D8\u91CF "${j.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${j.srcType}\uFF09\uFF0C\u5DF2\u6309\u9759\u6001\u663E\u793A\u751F\u6210`),h.push(`    u8g2_MenuDrawItem${y}(${(m.position/100).toFixed(2)}f);`);break}h.push(`    u8g2_MenuDrawItem${y}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{let A=Math.min(100,Math.max(0,m.position));h.push(`    u8g2_MenuDrawItem${y}(${(A/100).toFixed(2)}f);`)}break}case"chart":{let y=$.get(m.id),A=x.get(m.id);if(!y||!A)break;h.push(...y),h.push(A);break}case"xbm":h.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${D.get(m.id)??Q(m.name,"icon")});`);break;case"textarea":{let y=V++;h.push(...H[y].split(`
`));let A=m.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";h.push(`    ${A}(&ta${y}, ${Math.max(10,Math.trunc(m.height))});`);break}case"board":{let y=Q(m.cbName,"board_cb");h.push(`    u8g2_MenuDrawItemBoard(${y}, ${Math.max(1,Math.trunc(m.w))}, ${Math.max(1,Math.trunc(m.h))});`);break}}return h},f=[];f.push("/**"),f.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${a.name}`),f.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),f.push(" *"),f.push(" * main.c \u91CC\u4F7F\u7528\u4EE5\u4E0B\u7B26\u53F7\u65F6\uFF0C\u76F4\u63A5 extern\uFF08\u6216\u590D\u5236\u4E0B\u9762\u58F0\u660E\uFF09\uFF1A"),f.push(` *   u8g2_SetFont(&u8g2, ${t?"menu_font":a.font});`),s.forEach((m,I)=>f.push(` *   void ${m}(void);   /* \u9875\u9762: ${a.pages[I].name} */`));for(let m of i.values())f.push(` *   extern ${m.type} ${m.name};`);for(let[m]of u)f.push(` *   void ${m}(u8g2_menu_t *menu, uint8_t ID);`);for(let m of c)f.push(` *   void ${m}(u8g2_t *u8g2);`);f.push(" */"),f.push('#include "u8g2_menu.h"'),(a.chartBuffers??[]).some(m=>m.sample==="sine")&&f.push("#include <math.h>"),f.push(""),f.push(X("includes",r,"")),f.push(""),s.forEach(m=>f.push(`void ${m}(void);`)),f.push(""),f.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),f.push(X("variables",r,""));for(let m of i.values())f.push(`${m.type} ${m.name} = ${m.init};`);if(f.push(""),t){f.push("/* ======================== \u5B57\u4F53\uFF08\u73B0\u573A\u53D6\u6A21\uFF09 ======================== */"),f.push("/* \u4EC5\u5305\u542B\u5DE5\u7A0B\u6587\u672C\u7528\u5230\u7684\u5B57\u5F62\uFF08\u542B ASCII 95 \u4E2A + \u989D\u5916\u5B57\u7B26\uFF09\uFF0C"),f.push(" * main.c \u91CC u8g2_SetFont(&u8g2, menu_font) \u5373\u53EF\u4F7F\u7528\uFF1B"),f.push(' * \u82E5\u8FD0\u884C\u65F6\u8F93\u51FA\u8D85\u51FA\u6B64\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u7F16\u8F91\u5668"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u8865\u5145\u540E\u91CD\u65B0\u751F\u6210\u3002 */');let m=[];for(let I=0;I<t.length;I+=16)m.push("  "+[...t.slice(I,I+16)].map(h=>`0x${h.toString(16).padStart(2,"0")}`).join(", ")+",");f.push(`const uint8_t menu_font[${t.length}] U8G2_FONT_SECTION("menu_font") = {`),f.push(...m),f.push("};"),f.push("")}if((d.length||p.length||g.length||b.length)&&(f.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),f.push(...d,...p,...g,...b),f.push("")),u.size||c.size){f.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),f.push(X("callbacks",r,""));for(let[m]of u)f.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`),f.push("{"),f.push(X(`cb_${m}`,r,"    ")),f.push("}"),f.push("");for(let m of c)f.push(`void ${m}(u8g2_t *u8g2)`),f.push("{"),f.push(X(`cb_${m}`,r,"    ")),f.push("}"),f.push("")}let K=(a.weakHooks??[]).map(m=>Y.find(I=>I.fn===m)).filter(m=>!!m);if(K.length||r.has("weak")||Y.some(m=>(r.get(`weak_${m.fn}`)??"").trim())){f.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),f.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),f.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let I=Y.filter(h=>!a.weakHooks?.includes(h.fn)&&(r.get(`weak_${h.fn}`)??"").trim()).map(h=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${h.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${h.decl}`,"{",X(`weak_${h.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);f.push(I?`${X("weak",r,"").replace(/\n$/,"")}
${I}
`:X("weak",r,"")),f.push("");for(let h of K){f.push(`/* ${h.label}: ${h.desc} */`),f.push(`${h.decl}`),f.push("{"),f.push(X(`weak_${h.fn}`,r,"    "));let S=h.bodyArgs.split(`
`).map(T=>`    ${T}`);h.retNote&&S.push(`    ${h.retNote}`),f.push(...S),f.push("}"),f.push("")}}return f.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),f.push(""),a.pages.forEach((m,I)=>{f.push(`/* \u9875\u9762: ${m.name} */`),f.push(`void ${s[I]}(void)`),f.push("{"),f.push(X(`page_${s[I]}_pre`,r,"    "));for(let h of m.items)f.push(...k(h,m));f.push("}"),f.push("")}),{c:`${f.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:n}}function mn(a){return{raw:a.slice(0,23),glyphCnt:a[0],startUpperA:a[17]<<8|a[18],startLowerA:a[19]<<8|a[20],startUnicode:a[21]<<8|a[22]}}function Te(a,e,t){let n=[],r=[],s=[],i=[...e].sort((x,_)=>x-_);for(let x of i){let _=t(x);if(!_||!_.length){s.push(x);continue}x<=255?n.push({encoding:x,entry:_}):r.push({encoding:x,entry:_})}if(!n.length&&!r.length)return null;let o=n.length+r.length,u=0;for(let x of n)u+=x.entry.length;u+=2;let c=4;for(let x of r)c+=x.entry.length;c+=2;let d=mn(a),l=new Uint8Array(23+u+c);l.set(d.raw,0),l[0]=o,l[17]=0,l[18]=0,l[19]=0,l[20]=0,l[21]=0,l[22]=0;let p=23;for(let x of n){if(x.encoding===65){let _=p-23;l[17]=_>>8&255,l[18]=_&255}if(x.encoding===97){let _=p-23;l[19]=_>>8&255,l[20]=_&255}l.set(x.entry,p),p+=x.entry.length}l[p]=0,l[p+1]=0,p+=2;let $=p-23;l[21]=$>>8&255,l[22]=$&255,l[p]=0,l[p+1]=4,l[p+2]=255,l[p+3]=255,p+=4;for(let x of r)l.set(x.entry,p),p+=x.entry.length;return l[p]=0,l[p+1]=0,{font:l,included:o,missing:s}}function ht(a){return[...a].map(e=>e.codePointAt(0)).filter(e=>Number.isFinite(e))}function bt(){let a=[];for(let e=32;e<=126;e++)a.push(e);return a}function ce(a,e){let t=new Set(bt()),n=r=>{for(let s of ht(r))t.add(s)};for(let r of a.pages)for(let s of r.items)s.kind==="text"&&n(s.text),s.kind==="textarea"&&n(s.content),s.bind.type==="switch"&&(n(s.bind.onText),n(s.bind.offText));return n(e),t.delete(10),t.delete(13),t}function Me(a){let e=0,t=0;for(let n of a)n<=126?e++:t++;return{total:a.size,ascii:e,cjk:t}}var Ce=(o=>(o[o.None=0]="None",o[o.Up=1]="Up",o[o.Down=2]="Down",o[o.Enter=3]="Enter",o[o.Return=4]="Return",o[o.Add=5]="Add",o[o.Sub=6]="Sub",o))(Ce||{});var pn=128*64/8;function fn(a){return new Promise((e,t)=>{let n=document.createElement("script");n.src=a,n.onload=()=>e(),n.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${a}`)),document.head.appendChild(n)})}var Pe=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.fontSig=null;this.lastKnownPage=0;this.fontApplyWarning=null;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await fn(e);let n=t.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await n({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let r=this.mod._em_font_count_export();for(let s=0;s<r;s++){let i=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(i),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(t=>`${t.name}|${t.dataLen}|${t.sample}`),pages:e.pages.map(t=>({n:t.items.length,k:t.items.map(n=>n.kind).join(","),res:t.items.map(n=>n.kind==="chart"?(n.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")}))})}sync(e){let t=this.mod;if(!t)return;let n=this.signature(e);n!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);let r=d=>Math.trunc(Number.isFinite(d)?d:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},i={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},c=d=>d?(e.variables??[]).findIndex(l=>l.id===d):-1;if((e.variables??[]).forEach((d,l)=>{t.ccall("em_var_define",null,["number","number","number","number","number","number"],[l,s[d.type],r(d.initialValue),r(d.step),r(d.min),r(d.max)])}),(e.chartBuffers??[]).forEach((d,l)=>{t.ccall("em_buf_define",null,["number","number","number"],[l,r(d.dataLen),u[d.sample]])}),e.pages.forEach((d,l)=>{t.ccall("em_page_begin",null,["number"],[l]),d.items.forEach((p,$)=>{let x=()=>{let _=p.bind;if(_.type==="none")return;let b=_.type==="value"||_.type==="switch",g=b?(e.variables??[]).find(H=>H.id===_.varId):void 0;t.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[l,$,o[_.type],b&&g?s[g.type]:0,_.type==="switch"?r(_.openValue):0,_.type==="button"?r(_.buttonId):0,_.type==="submenu"?e.pages.findIndex(H=>H.id===_.targetPageId):-1,b&&g?c(g.id):-1])};switch(p.kind){case"text":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[l,$,i.text,p.scale,0,0,0,p.displayVarId?c(p.displayVarId):-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[l,$,p.text]),x();break;case"slider":case"progress":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[l,$,i[p.kind],1,0,0,0,-1,-1]),x();break;case"chart":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[l,$,i.chart,1,r(p.height),0,0,-1,-1]);for(let _ of p.sources??[])t.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[l,$,(e.chartBuffers??[]).findIndex(b=>b.id===_.bufferId),{line:0,point:1,bar:2}[_.chartKind],_.min!==void 0&&_.max!==void 0?1:0,_.max??0,_.min??0]);x();break;case"xbm":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[l,$,i.xbm,1,0,r(p.w),r(p.h),-1,-1]);{let _=t._em_scratch(p.bits.length);_&&(t.HEAPU8.set(new Uint8Array(p.bits),_),t._em_item_bits(l,$,_,p.bits.length))}x();break;case"textarea":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[l,$,i.textarea,1,r(p.height),0,0,-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[l,$,p.content]),x();break;case"board":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[l,$,i.board,1,0,r(p.w),r(p.h),-1,-1]),x();break}}),t.ccall("em_page_end",null,["number","number"],[l,d.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],r(e.selectorLeftMargin),r(e.selectorTopMargin),r(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen]),e.fontSubset){let d=ce(e,e.fontExtra),l=e.font+"|"+[...d].sort((p,$)=>p-$).join(",");l!==this.fontSig&&(this.fontSig=l,this.applyFontSubset(this.fontIndex(e.font),d))}else this.fontSig!==null&&(this.fontSig=null,this.fontApplyWarning=null)}applyFontSubset(e,t){this.fontApplyWarning=null;let n=this.getFontBytes(e),r=this.glyphFetcher(e),s=n&&r?Te(n,t,r):null;if(!s){this.fontApplyWarning="\u73B0\u573A\u53D6\u6A21\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62\uFF0C\u9884\u89C8\u4F7F\u7528\u5185\u7F6E\u5B57\u4F53";return}this.useCustomFont(s.font)||(this.fontApplyWarning=`\u5B50\u96C6\u5B57\u4F53 ${s.font.length} \u5B57\u8282\u8D85\u8FC7\u9884\u89C8\u69FD\u4F4D\u5BB9\u91CF\uFF0C\u9884\u89C8\u5DF2\u56DE\u9000\u5168\u5B57\u5E93\uFF08\u5BFC\u51FA\u7684 menu_font \u6570\u7EC4\u4E0D\u53D7\u5F71\u54CD\uFF09`)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let n=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(n),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let n=t._em_frame(e);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));let r=t.HEAPU8.subarray(n,n+pn),s=this.img.data;s.fill(255);for(let o=0;o<64;o++){let u=(o>>3)*128,c=1<<(o&7),d=o*128*4;for(let l=0;l<128;l++)r[u+l]&c&&(s[d]=17,s[d+1]=24,s[d+2]=39),d+=4}this.ctx.putImageData(this.img,0,0);let i=t._em_get_current_page();i!==this.lastKnownPage&&(this.lastKnownPage=i,this.events.onPageChanged?.(i))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getFontBytes(e){let t=this.mod;if(!t)return null;let n=t.ccall("em_font_data","number",["number"],[e]),r=t.ccall("em_font_data_len","number",["number"],[e]);return!n||!r?null:t.HEAPU8.slice(n,n+r)}glyphFetcher(e){let t=this.mod;return t?n=>{let r=t.ccall("em_scratch","number",["number"],[64]),s=t.ccall("em_font_glyph","number",["number","number","number","number"],[e,n,64,r]);return s?t.HEAPU8.slice(r,r+s):null}:null}useCustomFont(e){let t=this.mod;if(!t)return!1;let n=t.ccall("em_custom_font_ptr","number",[],[]),r=t.ccall("em_custom_font_max","number",[],[]);return e.length>r?!1:(t.HEAPU8.set(e,n),t.ccall("em_set_custom_font",null,["number"],[e.length]),!0)}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Xe=globalThis,vt=a=>a,Ve=Xe.trustedTypes,xt=Ve?Ve.createPolicy("lit-html",{createHTML:a=>a}):void 0,kt="$lit$",ne=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+ne,gn=`<${St}>`,se=document,be=()=>se.createComment(""),ve=a=>a===null||typeof a!="object"&&typeof a!="function",Ze=Array.isArray,hn=a=>Ze(a)||typeof a?.[Symbol.iterator]=="function",De=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,yt=/>/g,ie=RegExp(`>|${De}(?:([^\\s"'>=/]+)(${De}*=${De}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,It=/"/g,Et=/^(?:script|style|textarea|title)$/i,Ge=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),v=Ge(1),Jn=Ge(2),Qn=Ge(3),xe=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),wt=new WeakMap,ae=se.createTreeWalker(se,129);function At(a,e){if(!Ze(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(e):e}var bn=(a,e)=>{let t=a.length-1,n=[],r,s=e===2?"<svg>":e===3?"<math>":"",i=he;for(let o=0;o<t;o++){let u=a[o],c,d,l=-1,p=0;for(;p<u.length&&(i.lastIndex=p,d=i.exec(u),d!==null);)p=i.lastIndex,i===he?d[1]==="!--"?i=$t:d[1]!==void 0?i=yt:d[2]!==void 0?(Et.test(d[2])&&(r=RegExp("</"+d[2],"g")),i=ie):d[3]!==void 0&&(i=ie):i===ie?d[0]===">"?(i=r??he,l=-1):d[1]===void 0?l=-2:(l=i.lastIndex-d[2].length,c=d[1],i=d[3]===void 0?ie:d[3]==='"'?It:_t):i===It||i===_t?i=ie:i===$t||i===yt?i=he:(i=ie,r=void 0);let $=i===ie&&a[o+1].startsWith("/>")?" ":"";s+=i===he?u+gn:l>=0?(n.push(c),u.slice(0,l)+kt+u.slice(l)+ne+$):u+ne+(l===-2?o:$)}return[At(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},$e=class a{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let s=0,i=0,o=e.length-1,u=this.parts,[c,d]=bn(e,t);if(this.el=a.createElement(c,n),ae.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=ae.nextNode())!==null&&u.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let l of r.getAttributeNames())if(l.endsWith(kt)){let p=d[i++],$=r.getAttribute(l).split(ne),x=/([.?@])?(.*)/.exec(p);u.push({type:1,index:s,name:x[2],strings:$,ctor:x[1]==="."?Oe:x[1]==="?"?ze:x[1]==="@"?qe:pe}),r.removeAttribute(l)}else l.startsWith(ne)&&(u.push({type:6,index:s}),r.removeAttribute(l));if(Et.test(r.tagName)){let l=r.textContent.split(ne),p=l.length-1;if(p>0){r.textContent=Ve?Ve.emptyScript:"";for(let $=0;$<p;$++)r.append(l[$],be()),ae.nextNode(),u.push({type:2,index:++s});r.append(l[p],be())}}}else if(r.nodeType===8)if(r.data===St)u.push({type:2,index:s});else{let l=-1;for(;(l=r.data.indexOf(ne,l+1))!==-1;)u.push({type:7,index:s}),l+=ne.length-1}s++}}static createElement(e,t){let n=se.createElement("template");return n.innerHTML=e,n}};function me(a,e,t=a,n){if(e===xe)return e;let r=n!==void 0?t._$Co?.[n]:t._$Cl,s=ve(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(a),r._$AT(a,t,n)),n!==void 0?(t._$Co??=[])[n]=r:t._$Cl=r),r!==void 0&&(e=me(a,r._$AS(a,e.values),r,n)),e}var Fe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??se).importNode(t,!0);ae.currentNode=r;let s=ae.nextNode(),i=0,o=0,u=n[0];for(;u!==void 0;){if(i===u.index){let c;u.type===2?c=new ye(s,s.nextSibling,this,e):u.type===1?c=new u.ctor(s,u.name,u.strings,this,e):u.type===6&&(c=new We(s,this,e)),this._$AV.push(c),u=n[++o]}i!==u?.index&&(s=ae.nextNode(),i++)}return ae.currentNode=se,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},ye=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=me(this,e,t),ve(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==xe&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):hn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==w&&ve(this._$AH)?this._$AA.nextSibling.data=e:this.T(se.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=$e.createElement(At(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new Fe(r,this),i=s.u(this.options);s.p(t),this.T(i),this._$AH=s}}_$AC(e){let t=wt.get(e.strings);return t===void 0&&wt.set(e.strings,t=new $e(e)),t}k(e){Ze(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,r=0;for(let s of e)r===t.length?t.push(n=new a(this.O(be()),this.O(be()),this,this.options)):n=t[r],n._$AI(s),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=vt(e).nextSibling;vt(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},pe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,s){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=w}_$AI(e,t=this,n,r){let s=this.strings,i=!1;if(s===void 0)e=me(this,e,t,0),i=!ve(e)||e!==this._$AH&&e!==xe,i&&(this._$AH=e);else{let o=e,u,c;for(e=s[0],u=0;u<s.length-1;u++)c=me(this,o[n+u],t,u),c===xe&&(c=this._$AH[u]),i||=!ve(c)||c!==this._$AH[u],c===w?e=w:e!==w&&(e+=(c??"")+s[u+1]),this._$AH[u]=c}i&&!r&&this.j(e)}j(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Oe=class extends pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===w?void 0:e}},ze=class extends pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==w)}},qe=class extends pe{constructor(e,t,n,r,s){super(e,t,n,r,s),this.type=5}_$AI(e,t=this){if((e=me(this,e,t,0)??w)===xe)return;let n=this._$AH,r=e===w&&n!==w||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==w&&(n===w||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},We=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){me(this,e)}};var vn=Xe.litHtmlPolyfillSupport;vn?.($e,ye),(Xe.litHtmlVersions??=[]).push("3.3.3");var O=(a,e,t)=>{let n=t?.renderBefore??e,r=n._$litPart$;if(r===void 0){let s=t?.renderBefore??null;n._$litPart$=r=new ye(e.insertBefore(be(),s),s,void 0,t??{})}return r._$AI(a),r};var xn=Object.keys(ue);function $n(a,e,t,n){let r=a.getState(),s=t.label||"text"in t&&t.text||ue[t.kind],i=t.bind.type!=="none"?` \xB7 ${le[t.bind.type]}`:"",o=u=>c=>{c.stopPropagation(),a.getState().moveItem(e.id,t.id,u)};return v`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>a.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${ct[t.kind]}</span>
    <span class="ume-item-name" title=${s+i}>${s}${i}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function yn(a,e){let t=a.getState();return v`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{let r=n.target.value;r&&t.addItem(r,e.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${xn.map(n=>v`<option value=${n}>${ue[n]}</option>`)}
  </select>`}function Tt(a,e){let{project:t,selection:n}=e.getState(),r=s=>{let i=e.getState(),o=n.pageId===s.id;return v`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),i.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),i.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&i.removePage(s.id)}}>✕</button>
      </div>
      ${o?v`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>$n(e,s,u,n.itemId===u.id)):v`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${yn(e,s)}</div>
      </div>`:w}
    </div>`};O(v`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>_n(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(r)}
  `,a)}function _n(a){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${a.getState().project.pages.length+1}`);e!==null&&a.getState().addPage(e||void 0)}function F(a,e,t,n=""){return v`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${e??""} placeholder=${n}
      @change=${r=>t(r.target.value)} />
  </div>`}function P(a,e,t,n=1){return v`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(e)} step=${String(n)}
      @change=${r=>{let s=parseFloat(r.target.value);t(Number.isFinite(s)?s:0)}} />
  </div>`}function q(a,e,t,n){return v`<div class="ume-field">
    <label>${a}</label>
    <select @change=${r=>n(r.target.value)}>
      ${t.map(r=>v`<option value=${r.value} ?selected=${r.value===e}>${r.label}</option>`)}
    </select>
  </div>`}function _e(a,e,t){return v`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${n=>t(n.target.checked)} />
    <span>${a}</span>
  </div>`}function Mt(a,e,t,n=!1){return v`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${r=>t(r.target.value)}>${e??""}</textarea>
  </div>`}function Ie(a,e,t="text/plain"){let n=new Blob([e],{type:`${t};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=a,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}var Ye=null,Pt={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function Je(a,e,t,n){let r=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...t.map(i=>({value:i.id,label:`${i.name} : ${Pt[i.type]??i.type}`}))],s=e?t.some(i=>i.id===e):!1;return v`
    ${q(a,e??"",r,i=>n(i||null))}
    ${e&&!s?v`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:w}
    ${t.length===0?v`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:w}
  `}function Qe(a,e){return v`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let t=a.getState().addVariable();e(t)}}>＋ 新建变量并绑定</button>
  </div>`}function et(a){return a?v`<div class="ume-hint">
    ${a.name} : ${Pt[a.type]??a.type}，范围 ${a.min}~${a.max}，步长 ${a.step}，初值 ${a.initialValue}
    （在「资源」页修改变量）
  </div>`:v`${w}`}function Ct(a,e,t){let{project:n,selection:r}=e.getState(),s=n.pages.find($=>$.id===r.pageId)??null,i=s?.items.find($=>$.id===r.itemId)??null,o=n.variables??[],u=n.chartBuffers??[],c=($,x)=>e.getState().updateItem(s.id,i.id,$,x),d=$=>c({bind:$}),l=v`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,p="";if(s&&!i)p="\u9875\u9762\u5C5E\u6027",l=v`
      ${F("\u540D\u79F0",s.name,$=>e.getState().updatePage(s.id,{name:$}))}
      ${F("C \u51FD\u6570\u540D",s.fnName,$=>e.getState().updatePage(s.id,{fnName:$}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&i){(i.bind.type==="value"||i.bind.type==="switch")&&i.bind.varId&&(Ye=i.bind.varId),p=`${ue[i.kind]}${i.bind.type!=="none"?` + ${le[i.bind.type]}`:""}`;let $=v``;switch(i.kind){case"text":{let b=i,g=o.find(H=>H.id===b.displayVarId);$=v`
          ${F("\u6587\u672C/\u683C\u5F0F",b.text,H=>c({text:H},`text-${b.id}`))}
          ${q("\u5927\u5C0F",String(b.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],H=>c({scale:Number(H)}))}
          ${i.bind.type==="none"?v`
            ${Je("\u663E\u793A\u53D8\u91CF",b.displayVarId,o,H=>c({displayVarId:H}))}
            ${g?w:Qe(e,H=>c({displayVarId:H.id}))}
            ${et(g)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:w}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{let b=i;$=v`
          ${i.bind.type==="none"?v`
            ${P("\u9759\u6001\u4F4D\u7F6E(%)",b.position,g=>c({position:Math.min(100,Math.max(0,Math.trunc(g)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:w}
        `;break}case"chart":{let b=i,g=L=>c({sources:L}),H=(L,D)=>{let W=u.find(C=>C.id===L.bufferId),G=L.min===void 0||L.max===void 0;return v`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${W?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[L.chartKind]??L.chartKind}${G?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${L.min}~${L.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>g(b.sources.filter((C,V)=>V!==D))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${q("\u7F13\u51B2\u533A",L.bufferId,u.map(C=>({value:C.id,label:`${C.name} (${C.dataLen}\u70B9)`})),C=>g(b.sources.map((V,k)=>k===D?{...V,bufferId:C}:V)))}
              ${q("\u7ED8\u5236",L.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],C=>g(b.sources.map((V,k)=>k===D?{...V,chartKind:C}:V)))}
              ${_e("\u81EA\u52A8\u91CF\u7A0B",G,C=>g(b.sources.map((V,k)=>k===D?{...V,min:C?void 0:0,max:C?void 0:100}:V)))}
              ${G?w:v`
                ${P("\u91CF\u7A0B\u4E0A\u9650",L.max??100,C=>g(b.sources.map((V,k)=>k===D?{...V,max:C}:V)),"any")}
                ${P("\u91CF\u7A0B\u4E0B\u9650",L.min??0,C=>g(b.sources.map((V,k)=>k===D?{...V,min:C}:V)),"any")}`}
            </div>
          </div>`};$=v`
          ${P("\u9AD8\u5EA6(px)",b.height,L=>c({height:Math.max(4,Math.trunc(L))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(b.sources??[]).map(H)}
              ${(b.sources??[]).length===0?v`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:w}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(b.sources??[]).length>=4}
                @click=${()=>{if(!u.length){let L=e.getState().addChartBuffer();g([...b.sources??[],{bufferId:L.id,chartKind:"line"}]);return}g([...b.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(b.sources??[]).length>0?"\uFF08\u53E0\u52A0\uFF09":""}</button>
              ${u.length?w:v`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{let b=i;$=v`
          ${F("\u6570\u7EC4\u540D",b.name,g=>c({name:g}))}
          ${P("\u5BBD(px)",b.w,g=>c({w:Math.min(128,Math.max(1,Math.trunc(g)))}))}
          ${P("\u9AD8(px)",b.h,g=>c({h:Math.min(64,Math.max(1,Math.trunc(g)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(s.id,b.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${b.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let b=i;$=v`
          ${Mt("\u6587\u672C\u5185\u5BB9",b.content,g=>c({content:g}))}
          ${P("\u9AD8\u5EA6(px)",b.height,g=>c({height:Math.max(10,Math.trunc(g))}))}
          ${P("\u884C\u95F4\u8DDD",b.lineSpacing,g=>c({lineSpacing:Math.max(0,Math.trunc(g))}))}
          ${_e("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",b.bindScroll,g=>c({bindScroll:g}))}
        `;break}case"board":{let b=i;$=v`
          ${P("\u5BBD(px)",b.w,g=>c({w:Math.max(1,Math.trunc(g))}))}
          ${P("\u9AD8(px)",b.h,g=>c({h:Math.max(1,Math.trunc(g))}))}
          ${F("\u56DE\u8C03\u51FD\u6570\u540D",b.cbName,g=>c({cbName:g}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}let x=i.bind,_=v``;switch(x.type){case"none":_=v`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{let b=o.find(g=>g.id===x.varId);_=v`
          ${Je("\u53D8\u91CF",x.varId,o,g=>d({type:"value",varId:g}))}
          ${b?w:Qe(e,g=>d({type:"value",varId:g.id}))}
          ${et(b)}
          ${i.kind==="text"?v`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:w}
        `;break}case"switch":{let b=o.filter(g=>g.type==="uint8").find(g=>g.id===x.varId)??o.find(g=>g.id===x.varId);_=v`
          ${Je("\u53D8\u91CF (uint8)",x.varId,o.filter(g=>g.type==="uint8"),g=>d({type:"switch",varId:g,openValue:x.openValue,onText:x.onText,offText:x.offText}))}
          ${b?w:Qe(e,g=>d({type:"switch",varId:g.id,openValue:x.openValue,onText:x.onText,offText:x.offText}))}
          ${et(b)}
          ${P("openValue",x.openValue,g=>d({type:"switch",varId:x.varId,openValue:Math.max(0,Math.trunc(g)),onText:x.onText,offText:x.offText}))}
          ${F('"\u5F00"\u6587\u672C',x.onText,g=>d({type:"switch",varId:x.varId,openValue:x.openValue,onText:g,offText:x.offText}))}
          ${F('"\u5173"\u6587\u672C',x.offText,g=>d({type:"switch",varId:x.varId,openValue:x.openValue,onText:x.onText,offText:g}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":_=v`
          ${F("\u56DE\u8C03\u51FD\u6570\u540D",x.cbName,b=>d({type:"button",cbName:b,buttonId:x.buttonId}))}
          ${P("ID",x.buttonId,b=>d({type:"button",cbName:x.cbName,buttonId:Math.trunc(b)}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":_=v`
          ${q("\u76EE\u6807\u9875\u9762",x.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...n.pages.filter(b=>b.id!==s.id).map(b=>({value:b.id,label:b.name}))],b=>d({type:"submenu",targetPageId:b||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":_=v`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}l=v`
      <div class="ume-panel-title">绘制</div>
      ${$}
      <div class="ume-panel-title">附加值</div>
      ${q("\u7C7B\u578B",x.type,Object.keys(le).map(b=>({value:b,label:le[b]})),b=>{let g=i.bind;d(b==="value"?{type:"value",varId:g.type==="value"||g.type==="switch"?g.varId:Ye}:b==="switch"?{type:"switch",varId:g.type==="value"||g.type==="switch"?g.varId:Ye,openValue:1,onText:"on",offText:"off"}:b==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:b==="submenu"?{type:"submenu",targetPageId:g.type==="submenu"?g.targetPageId:null}:{type:"none"})})}
      ${_}
    `}O(v`
    ${p?v`<div class="ume-panel-title"><span class="ume-kind-badge">${p}</span></div>`:w}
    ${l}
  `,a)}var Ne=null,tt=null,In=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function wn(a,e){let t=e.variables??[],n=s=>{Ne=Ne===s?null:s},r=s=>{let i=Ne===s.id,o=(l,p)=>a.getState().updateVariable(s.id,l,p),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),c=t.filter(l=>l.name===s.name).length>1,d=kn(e,s.id);return v`<div class="ume-var-item ${i?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${d?` \xB7 ${d} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${l=>{l.stopPropagation();let p=a.getState().removeVariable(s.id);p>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${p} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${i?v`<div class="ume-var-edit">
        ${F("\u53D8\u91CF\u540D",s.name,l=>o({name:l.trim()},`vn-${s.id}`))}
        ${u?v`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:w}
        ${c?v`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:w}
        ${q("\u7C7B\u578B",s.type,In,l=>o({type:l}))}
        ${P("\u521D\u59CB\u503C",s.initialValue,l=>o({initialValue:l},`vi-${s.id}`),"any")}
        ${P("\u6700\u5C0F\u503C",s.min,l=>o({min:l},`vmin-${s.id}`),"any")}
        ${P("\u6700\u5927\u503C",s.max,l=>o({max:l},`vmax-${s.id}`),"any")}
        ${P("\u6B65\u957F",s.step,l=>o({step:l},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:w}
    </div>`};return v`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{Ne=a.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):v`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function kn(a,e){let t=0;for(let n of a.pages)for(let r of n.items)"varId"in r&&r.varId===e&&t++;return t}function Sn(a,e){let t=e.chartBuffers??[],n=s=>{let i=0;for(let o of e.pages)for(let u of o.items)u.kind==="chart"&&u.sources.some(c=>c.bufferId===s)&&i++;return i},r=s=>{let i=tt===s.id,o=(d,l)=>a.getState().updateChartBuffer(s.id,d,l),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),c=n(s.id);return v`<div class="ume-var-item ${i?"editing":""}">
      <div class="ume-var-row" @click=${()=>{tt=i?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[s.sample]}${c?` \xB7 ${c} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${d=>{d.stopPropagation();let l=a.getState().removeChartBuffer(s.id);l>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${l} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${i?v`<div class="ume-var-edit">
        ${F("\u6570\u7EC4\u540D",s.name,d=>o({name:d.trim()},`bn-${s.id}`))}
        ${u?v`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:w}
        ${P("\u70B9\u6570",s.dataLen,d=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(d)))},`bl-${s.id}`))}
        ${q("\u793A\u4F8B\u586B\u5145",s.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],d=>o({sample:d}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:w}
    </div>`};return v`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{tt=a.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):v`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Vt(a,e){let{project:t}=e.getState();O(v`
    ${wn(e,t)}
    ${Sn(e,t)}
  `,a)}function Nt(a,e){let{project:t}=e.getState(),n=(o,u)=>e.getState().update(c=>{Object.assign(c,o)},u),r=t.weakHooks??[],s=(o,u)=>{e.getState().update(c=>{let d=c.weakHooks??[];c.weakHooks=u?[...new Set([...d,o])]:d.filter(l=>l!==o)})},i=v`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${r.length}/${Y.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${Y.map(o=>v`
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
  `;O(v`
    <div class="ume-panel-title">工程</div>
    ${F("\u5DE5\u7A0B\u540D",t.name,o=>n({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${q("\u5B57\u4F53",t.font,je.map(o=>({value:o.id,label:o.label})),o=>n({font:o}))}
    ${_e("\u4E2D\u6587\u73B0\u573A\u53D6\u6A21\uFF08\u4EC5\u5305\u542B\u7528\u5230\u7684\u5B57\u5F62\uFF09",t.fontSubset,o=>n({fontSubset:o}))}
    ${t.fontSubset?v`
      ${F("\u989D\u5916\u5305\u542B\u5B57\u7B26",t.fontExtra,o=>n({fontExtra:o}))}
      ${(()=>{let o=Me(ce(t,t.fontExtra));return v`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:w}
    ${q("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],o=>n({selector:o}))}
    ${P("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,o=>n({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u9876\u8FB9\u8DDD",t.selectorTopMargin,o=>n({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u884C\u95F4\u8DDD",t.selectorLineSpacing,o=>n({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${P("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,o=>n({marqueeSpeed:o}),.05)}
    ${P("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,o=>n({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${i}
  `,a)}function Lt(a,e){let t=r=>{let s,i=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),e.key(r),i(),s=window.setInterval(()=>e.key(r),180)},up:i}},n=(r,s,i)=>{let o=t(r);return v`<button class="ume-key" title=${i}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};O(v`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${r=>{let i={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[r.key];i!==void 0&&(r.preventDefault(),e.key(i))}}>
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
  `,a)}var oe=null;function Ht(a,e){oe=e,a.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),En(a)}function En(a){if(!oe)return;let e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",t=>{t.target===e&&Bt(e)}),O(v`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Bt(e)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${oe.warnings.length?v`
          <div style="margin-bottom:8px">
            ${oe.warnings.map(t=>v`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:w}
        <div class="ume-code-view">${oe.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(oe.c).then(()=>An(e,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{Ie("menu_pages.c",oe.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,e),a.appendChild(e)}function Bt(a){a.remove()}function An(a,e){let t=a.closest(".ume")??document.body,n=t.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",t.appendChild(n)),n.textContent=e,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function Kt(a,e,t,n){let i=e.getState().project.pages.find(k=>k.id===t)?.items.find(k=>k.id===n);if(!i||i.kind!=="xbm")return;let o=i,u=o.w,c=o.h,d=[...o.bits],l=()=>Math.ceil(u/8),p=document.createElement("div");p.className="ume-modal-mask",p.addEventListener("click",k=>{k.target===p&&V()});let $=(k,f)=>{let K=f*l()+(k>>3);return K<d.length?!!(d[K]>>(k&7)&1):!1},x=(k,f,K)=>{let re=f*l()+(k>>3);d[re]=K?d[re]|1<<(k&7):d[re]&~(1<<(k&7))},_=(k,f)=>{let K=Math.ceil(u/8),re=Math.ceil(k/8),m=new Array(re*f).fill(0);for(let I=0;I<Math.min(c,f);I++)for(let h=0;h<Math.min(u,k);h++){let S=I*K+(h>>3);S<d.length&&d[S]>>(h&7)&1&&(m[I*re+(h>>3)]|=1<<(h&7))}u=k,c=f,d=m},b=!1,g=!0,H=(k,f)=>K=>{K.preventDefault(),b=!0,g=!$(k,f),x(k,f,g),W()},L=(k,f)=>()=>{b&&(x(k,f,g),W())},D=()=>{b=!1},W=()=>{O(C(),p)},G=()=>{let k=[];for(let f=0;f<c;f++)for(let K=0;K<u;K++)k.push(v`<button class="ume-xbm-cell ${$(K,f)?"on":""}"
          data-x=${K} data-y=${f}
          @pointerdown=${H(K,f)}
          @pointerenter=${L(K,f)}></button>`);return k},C=()=>v`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${c}</span></span>
        <button class="ume-mini" @click=${V}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${D}
        @pointerleave=${D}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${k=>{_(Rt(+k.target.value,1,128),c),W()}} />
          <input type="number" style="width:64px" .value=${String(c)} min="1" max="64"
            @change=${k=>{_(u,Rt(+k.target.value,1,64)),W()}} />
          <button class="ume-btn sm" @click=${()=>{d=d.map(()=>0),W()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{d=d.map(k=>~k&255),W()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${G()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${V}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,n,{w:u,h:c,bits:[...d]}),V()}}>应用</button>
      </div>
    </div>
  `;function V(){p.remove(),document.removeEventListener("pointerup",D)}document.addEventListener("pointerup",D),W(),a.appendChild(p)}function Rt(a,e,t){return Number.isFinite(a)?Math.min(t,Math.max(e,Math.trunc(a))):e}var Tn="prebuilt/u8g2-menu-preview.js",nt=class{constructor(e,t={}){this.store=Ke();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;this.activateRightTab=()=>{};if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let p=document.createElement("style");p.id="ume-style",p.textContent=it,document.head.appendChild(p)}let n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??n??void 0;if(r!==void 0)try{this.store.setState({project:Ae(r)})}catch(p){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",p)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),e.innerHTML=`
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
    `;let i=p=>e.querySelector(p);this.els={left:i(".ume-left"),center:i(".ume-center"),right:i(".ume-right"),propEl:i('[data-role="prop"]'),resEl:i('[data-role="res"]'),setEl:i('[data-role="set"]'),toolbarUndo:i('[data-act="undo"]'),toolbarRedo:i('[data-act="redo"]')};let o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new Pe(o,{onPageChanged:p=>this.onPreviewPageChanged(p)});let u=document.createElement("div");this.els.center.appendChild(u),Lt(u,this.preview),this.preview.load(this.opts.wasmUrl??Tn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(p=>{console.error(p);let $=document.createElement("div");$.className="ume-warn",$.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${p.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend($)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let p=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);p!==null&&this.store.getState().addPage(p||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{Ie(`${this.store.getState().project.name||"menu-project"}.json`,Ue(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{i('[data-role="file"]').click()}),i('[data-role="file"]').addEventListener("change",p=>{let $=p.target.files?.[0];$&&($.text().then(x=>{try{let _=Ae(x);this.store.getState().update(b=>{Object.assign(b,_)}),this.scheduleRender()}catch(_){alert(`\u5BFC\u5165\u5931\u8D25: ${_.message}`)}}),p.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate());let c=e.querySelectorAll(".ume-tabs button"),d=p=>{c.forEach($=>$.classList.toggle("active",$.dataset.tab===p)),this.els.propEl.style.display=p==="prop"?"":"none",this.els.resEl.style.display=p==="res"?"":"none",this.els.setEl.style.display=p==="set"?"":"none"};c.forEach(p=>{p.addEventListener("click",()=>d(p.dataset.tab??"prop"))}),this.activateRightTab=d,this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null);let l=null;this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange();let p=this.store.getState().selection.itemId;p&&p!==l&&this.activateRightTab("prop"),l=p}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=Ae(e);this.store.getState().update(n=>{Object.assign(n,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.produceCode();return Ht(this.container,e),this.opts.onExport?.(e),e}downloadC(){let e=this.produceCode();Ie("menu_pages.c",e.c)}produceCode(){let e=this.lastExport,t=this.store.getState().project,n,r=[];if(t.fontSubset){if(!this.preview.ready)r.push("\u73B0\u573A\u53D6\u6A21\u9700\u8981\u9884\u89C8\u5F15\u64CE\uFF0C\u5F53\u524D\u5F15\u64CE\u4E0D\u53EF\u7528\uFF1A\u672C\u6B21\u672A\u751F\u6210 menu_font\uFF0C\u4EE3\u7801\u5C06\u5F15\u7528\u5185\u7F6E\u5B57\u4F53");else{let o=ce(t,t.fontExtra),u=this.buildFontSubset(t,o);if("error"in u)r.push(`${u.error}\uFF0C\u672C\u6B21\u6309\u5185\u7F6E\u5B57\u4F53\u751F\u6210`);else{n=u.result.font;let c=Me(o);if(r.push(`\u73B0\u573A\u53D6\u6A21\uFF1A\u6536\u5F55 ${c.total} \u4E2A\u5B57\u7B26\uFF08ASCII ${c.ascii} + \u6269\u5C55 ${c.cjk}\uFF09\uFF0C\u5B57\u4F53\u6570\u7EC4 ${u.result.font.length} \u5B57\u8282\u3002\u8FD0\u884C\u65F6\u82E5\u8F93\u51FA\u8D85\u51FA\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u91CC\u8865\u5145\u989D\u5916\u5B57\u7B26`),u.result.included>255&&r.push(`\u5B50\u96C6\u5B57\u5F62\u6570 ${u.result.included} \u8D85\u8FC7 255\uFF1A\u5B57\u4F53\u5934 glyph_cnt \u5B57\u6BB5\u5C06\u56DE\u7ED5\uFF08\u8BB0\u5F55\u4E3A ${u.result.included&255}\uFF09\uFF0C\u5982\u9047\u6E32\u67D3\u5F02\u5E38\u8BF7\u5728"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u7CBE\u7B80`),u.result.missing.length){let d=u.result.missing.slice(0,5).map(l=>String.fromCodePoint(l)).join(" ");r.push(`\u5B57\u7B26\u96C6\u4E2D ${u.result.missing.length} \u4E2A\u5B57\u7B26\u672A\u5728\u6E90\u5B57\u4F53\u4E2D\u627E\u5230\uFF08\u5982 ${d}\uFF09\uFF0C\u8FD0\u884C\u65F6\u8FD9\u4E9B\u5B57\u7B26\u65E0\u6CD5\u663E\u793A`)}}}let i=this.preview.fontApplyWarning;i&&r.push(i)}let s=gt(t,e??void 0,n);return s.warnings.unshift(...r),this.lastExport={c:s.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,s.c),s}buildFontSubset(e,t){let n=this.preview.fontIndex(e.font),r=this.preview.getFontBytes(n),s=this.preview.glyphFetcher(n);if(!r||!s)return{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u65E0\u6CD5\u8BFB\u53D6\u6E90\u5B57\u4F53\u6570\u636E"};let i=Te(r,t,s);return i?{result:i}:{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u5B57\u7B26\u96C6\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62"}}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ue(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();Tt(this.els.left,this.store),Nt(this.els.setEl,this.store),Vt(this.els.resEl,this.store),Ct(this.els.propEl,this.store,{openXbmEditor:(t,n)=>Kt(this.container,this.store,t,n)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),t=document.getElementById("ume-page-jump"),n=this.store.getState(),r=this.store.getState().project.pages.findIndex(s=>s.id===n.selection.pageId);if(t){let s=n.project.pages,i=s.map(u=>u.name).join("|");t.dataset.sig!==i&&(t.dataset.sig=i,t.innerHTML="",s.forEach((u,c)=>{let d=document.createElement("option");d.value=String(c),d.textContent=`${c+1}. ${u.name}`,t.appendChild(d)}),t.onchange=()=>{let u=parseInt(t.value,10);Number.isFinite(u)&&this.preview.navTo(u)});let o=this.preview.currentPage;document.activeElement!==t&&t.value!==String(o)&&(t.value=String(o))}if(e&&r>=0&&n.selection.itemId){let s=n.project.pages[r],i=s.items.findIndex(p=>p.id===n.selection.itemId),o=s.items[i],u=o?.bind,c=u?.type==="value"||u?.type==="switch"?u.varId:null,d=o?.kind==="text"&&u?.type==="none"?o.displayVarId:null,l=c??d;if(o&&l){let p=(n.project.variables??[]).findIndex(g=>g.id===l),$=p>=0?p:r*64+i,_=u?.type==="switch"?this.preview.getSwitch($):this.preview.getInt($),b=(n.project.variables??[]).find(g=>g.id===l)?.name;e.textContent=`${b??o.kind} = ${_}`}else e.textContent=""}}};return qt(Mn);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
