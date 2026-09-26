"use strict";var U8G2MenuEditor=(()=>{var Be=Object.defineProperty;var Ut=Object.getOwnPropertyDescriptor;var Dt=Object.getOwnPropertyNames;var Ft=Object.prototype.hasOwnProperty;var Ot=(i,e)=>{for(var t in e)Be(i,t,{get:e[t],enumerable:!0})},zt=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Dt(e))!Ft.call(i,r)&&r!==t&&Be(i,r,{get:()=>e[r],enumerable:!(n=Ut(e,r))||n.enumerable});return i};var qt=i=>zt(Be({},"__esModule",{value:!0}),i);var Mn={};Ot(Mn,{MenuEditor:()=>rt,MenuKey:()=>Ce});var it=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;var st=i=>{let e,t=new Set,n=(d,l)=>{let c=typeof d=="function"?d(e):d;if(!Object.is(c,e)){let x=e;e=l??(typeof c!="object"||c===null)?c:Object.assign({},e,c),t.forEach(b=>b(e,x))}},r=()=>e,o={setState:n,getState:r,getInitialState:()=>u,subscribe:d=>(t.add(d),()=>t.delete(d))},u=e=i(n,r,o);return o},ot=i=>i?st(i):st;var Le=0;function U(i){return Le=(Le+1)%1e9,`${i}_${Date.now().toString(36)}_${Le.toString(36)}`}function fe(i){return{id:U("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...i}}function Ke(i){return{id:U("buf"),name:"buf_new",dataLen:32,sample:"sine",...i}}function ut(i,e){let t=new Set(i.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function lt(i,e){let t=new Set(i.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function z(i){let e={id:U("it"),label:"",bind:{type:"none"}};switch(i){case"text":return{...e,kind:i,text:"\u83DC\u5355\u9879",scale:1,displayVarId:null};case"slider":return{...e,kind:i,position:50};case"progress":return{...e,kind:i,position:50};case"chart":return{...e,kind:i,sources:[],height:32};case"xbm":return Xt(16,16);case"textarea":return{...e,kind:i,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:i,w:64,h:32,cbName:"board_cb"}}}function Xt(i,e){let t=Math.ceil(i/8);return{id:U("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:i,h:e,bits:new Array(t*e).fill(0)}}function He(i){return{id:U("pg"),name:i,fnName:"",items:[],userCodePre:""}}function Se(i,e){return{...i,...e}}function ee(i,e){return{...i,...e}}function dt(){let i=[fe({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),fe({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),fe({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[Ke({name:"buf_demo",dataLen:32,sample:"sine"})],t=He("\u4E3B\u9875");t.items=[Se(z("text"),{text:"u8g2_menu"}),ee(z("text"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E",bind:{type:"submenu",targetPageId:null}}),ee(z("text"),{text:"\u5173\u4E8E",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];let n=He("\u8BBE\u7F6E");n.items=[ee(Se(z("text"),{text:"\u97F3\u91CF:%d"}),{bind:{type:"value",varId:i[0].id}}),ee(Se(z("text"),{text:"\u5F00\u5173:%s"}),{bind:{type:"switch",varId:i[1].id,openValue:1,onText:"on",offText:"off"}}),ee(z("slider"),{bind:{type:"value",varId:i[2].id}}),ee(z("text"),{text:"\u56FE\u8868",bind:{type:"submenu",targetPageId:null}}),ee(z("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let r=He("\u56FE\u8868");r.items=[Se(z("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),ee(z("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:i,chartBuffers:e,pages:[t,n,r]};return t.items[1].bind.targetPageId=n.id,n.items[3].bind.targetPageId=r.id,s}function ct(i){return structuredClone(i)}var Wt=800;function Re(){let i=null,e=0;return ot()((t,n)=>({project:dt(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{let a=Date.now(),o=!!s&&s===i&&a-e<Wt;i=s??null,e=a,t(u=>{let d=ct(u.project);return r(d),{project:d,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{t(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{t(r=>{if(!r.future.length)return r;let[s,...a]=r.future;return{project:s,past:[...r.past,r.project],future:a,dirty:!0}})},select:(r,s=null)=>t({selection:{pageId:r,itemId:s}}),addPage:r=>{let s={id:U("pg"),name:r??`\u9875\u9762${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(a=>{a.pages.push(s)}),t({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{n().update(a=>{a.pages=a.pages.filter(o=>o.id!==r);for(let o of a.pages)for(let u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});let{selection:s}=n();s.pageId===r&&t({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{n().update(a=>{let o=a.pages.findIndex(d=>d.id===r),u=o+s;o<0||u<0||u>=a.pages.length||([a.pages[o],a.pages[u]]=[a.pages[u],a.pages[o]])})},updatePage:(r,s)=>{n().update(a=>{let o=a.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{let a=s??n().selection.pageId??n().project.pages[0]?.id;if(!a)return null;let o=Zt(r);return n().update(u=>{u.pages.find(l=>l.id===a)?.items.push(o)}),t({selection:{pageId:a,itemId:o.id}}),o},removeItem:(r,s)=>{n().update(o=>{let u=o.pages.find(d=>d.id===r);u&&(u.items=u.items.filter(d=>d.id!==s))});let{selection:a}=n();a.itemId===s&&t({selection:{pageId:r,itemId:null}})},moveItem:(r,s,a)=>{n().update(o=>{let u=o.pages.find(c=>c.id===r);if(!u)return;let d=u.items.findIndex(c=>c.id===s),l=d+a;d<0||l<0||l>=u.items.length||([u.items[d],u.items[l]]=[u.items[l],u.items[d]])})},duplicateItem:(r,s)=>{let a=null;n().update(o=>{let u=o.pages.find(l=>l.id===r);if(!u)return;let d=u.items.findIndex(l=>l.id===s);d<0||(a=structuredClone(u.items[d]),a.id=U("it"),u.items.splice(d+1,0,a))}),a&&t({selection:{pageId:r,itemId:a.id}})},updateItem:(r,s,a,o)=>{n().update(u=>{let l=u.pages.find(c=>c.id===r)?.items.find(c=>c.id===s);l&&Object.assign(l,a)},o)},addVariable:r=>{let s=null;return n().update(a=>{a.variables=a.variables??[];let o=lt(a.variables,r?.name??"var_new");s=fe({...r,name:o}),a.variables.push(s)}),s},removeVariable:r=>{let s=0;for(let a of n().project.pages)for(let o of a.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(n().update(a=>{a.variables=(a.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,a)=>{n().update(o=>{let u=(o.variables??[]).find(d=>d.id===r);u&&Object.assign(u,s)},a)},addChartBuffer:r=>{let s=null;return n().update(a=>{a.chartBuffers=a.chartBuffers??[];let o=ut(a.chartBuffers,r?.name??"buf_new");s=Ke({...r,name:o}),a.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(let a of n().project.pages)for(let o of a.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(n().update(a=>{a.chartBuffers=(a.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,a)=>{n().update(o=>{let u=(o.chartBuffers??[]).find(d=>d.id===r);u&&Object.assign(u,s)},a)}}))}var Hn=Re();function Zt(i){return z(i)}var Y=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],le={text:"\u6587\u672C",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},mt={text:"T",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},de={none:"\u65E0",value:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE"};var je=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var J=class extends Error{},pt=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),ft=new Set(["line","point","bar"]),gt=new Set(["sine","ramp","noise","none"]);function ce(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function L(i,e){return typeof i=="string"?i:e}function E(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}var Gt=["text","slider","progress","chart","xbm","textarea","board"],Yt=["number","switch","button","submenu","back"],Jt=["none","value","switch","button","submenu","back"];function Qt(i){if(!ce(i))throw new J("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=L(i.kind,"");if(!(Gt.includes(e)||Yt.includes(e)))throw new J(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(i);switch(t.id=L(i.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=L(i.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=L(i.text,""),t.scale=i.scale===2?2:1;break}return t}function en(i){for(let e of i)for(let t of e.items){let n=t;if(!(n.bind&&ce(n.bind)&&Jt.includes(L(n.bind.type,"none")))){switch(n.kind){case"number":{let r=n.varId??null;n.editable===!1?(n.kind="text",n.displayVarId=r,n.bind={type:"none"}):(n.kind="text",n.displayVarId=null,n.bind={type:"value",varId:r});break}case"switch":n.kind="text",n.displayVarId=null,n.bind={type:"switch",varId:n.varId??null,openValue:E(n.openValue,1),onText:L(n.onText,"on"),offText:L(n.offText,"off")};break;case"button":n.kind="text",n.displayVarId=null,n.bind={type:"button",cbName:L(n.cbName,"btn_cb"),buttonId:E(n.buttonId,1)};break;case"submenu":n.kind="text",n.displayVarId=null,n.bind={type:"submenu",targetPageId:n.targetPageId??null};break;case"back":n.kind="text",n.displayVarId=null,n.bind={type:"back"};break;case"slider":case"progress":n.bind=n.varId?{type:"value",varId:n.varId}:{type:"none"},n.position===void 0&&(n.position=50);break;default:n.bind={type:"none"},n.kind==="text"&&n.displayVarId===void 0&&(n.displayVarId=null);break}delete n.varId,delete n.varName,delete n.varType,delete n.editable,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals,n.kind!=="board"&&(delete n.cbName,delete n.buttonId),delete n.openValue,delete n.onText,delete n.offText,delete n.targetPageId}}}function tn(i){if(!ce(i))throw new J("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(i.items)?i.items.map(Qt):[];return{id:L(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:L(i.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:L(i.fnName,""),items:e,userCodePre:L(i.userCodePre,"")}}function nn(i){if(!ce(i))return null;let e=L(i.type,"int32");return{id:L(i.id,"")||U("vb"),name:L(i.name,""),type:pt.has(e)?e:"int32",initialValue:E(i.initialValue,0),min:E(i.min,0),max:E(i.max,100),step:E(i.step,1)}}function rn(i){if(!ce(i))return null;let e=L(i.sample,"sine");return{id:L(i.id,"")||U("buf"),name:L(i.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(E(i.dataLen,32)))),sample:gt.has(e)?e:"sine"}}function an(i){let e=new Map,t=[],n=(r,s)=>{let a=e.get(r);return a||(a=s(),e.set(r,a),t.push(a)),a};for(let r of i)for(let s of r.items){let a=s;switch(s.kind){case"number":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",d=n(u,()=>({id:U("vb"),name:u,type:pt.has(String(a.varType))?String(a.varType):"int32",initialValue:E(a.initialValue,0),min:E(a.min,0),max:E(a.max,100),step:E(a.step,1)}));s.varId=d.id}a.editable===void 0&&(s.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",d=n(u,()=>({id:U("vb"),name:u,type:"int",initialValue:E(a.initialValue,0),min:E(a.min,0),max:E(a.max,100),step:E(a.step,1)}));s.varId=d.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",d=n(u,()=>({id:U("vb"),name:u,type:"uint8",initialValue:E(a.initialValue,0),min:0,max:1,step:1}));s.varId=d.id}delete a.varName,delete a.initialValue;break;default:break}}return t}function Ae(i){let e;if(typeof i=="string")try{e=JSON.parse(i)}catch{throw new J("JSON \u89E3\u6790\u5931\u8D25")}else e=i;if(!ce(e))throw new J("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,n=E(t.version,0);if(n>1)throw new J(`\u5DE5\u7A0B\u7248\u672C v${n} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);n<1&&void 0;let r=Array.isArray(t.pages)?t.pages.map(tn):[];if(!r.length)throw new J("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",a=new Set(Y.map(l=>l.fn)),o=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(l=>typeof l=="string"&&a.has(l)))]:[],u;Array.isArray(t.variables)?u=t.variables.map(nn).filter(l=>!!l):u=an(r);let d;return Array.isArray(t.chartBuffers)?d=t.chartBuffers.map(rn).filter(l=>!!l):d=sn(r),en(r),on(r,d),{version:1,name:L(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:E(t.width,128),height:E(t.height,64),font:L(t.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:E(t.selectorLeftMargin,16),selectorTopMargin:E(t.selectorTopMargin,0),selectorLineSpacing:E(t.selectorLineSpacing,0),marqueeSpeed:E(t.marqueeSpeed,.2),marqueeHeaderLen:E(t.marqueeHeaderLen,5),weakHooks:o,fontSubset:e.fontSubset===!0,fontExtra:L(e.fontExtra,""),variables:u,chartBuffers:d,pages:r}}function sn(i){let e=[],t=0,n=()=>{let r={id:U("buf"),name:`buf_chart_${++t}`,dataLen:32,sample:"sine"};return e.push(r),r};for(let r of i)for(let s of r.items){if(s.kind!=="chart")continue;let a=s;if(Array.isArray(a.sources))continue;let o=n();o.dataLen=Math.min(512,Math.max(2,Math.trunc(E(a.dataLen,32))));let u=L(a.sample,"sine");gt.has(u)&&(o.sample=u);let d=L(a.chartKind,"line"),l={bufferId:o.id,chartKind:ft.has(d)?d:"line"};a.max!==void 0&&a.max!==null&&(l.max=E(a.max,0)),a.min!==void 0&&a.min!==null&&(l.min=E(a.min,0)),s.sources=[l],a.height===void 0&&(s.height=32),delete a.chartKind,delete a.dataLen,delete a.sample,delete a.max,delete a.min}return e}function on(i,e){let t=new Set(e.map(n=>n.id));for(let n of i)for(let r of n.items){if(r.kind!=="chart")continue;let s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(a=>t.has(a.bufferId)).map(a=>({bufferId:a.bufferId,chartKind:ft.has(a.chartKind)?a.chartKind:"line",min:a.min,max:a.max})),typeof s.height!="number"&&(s.height=32)}}function Ue(i){return JSON.stringify(i,null,2)}var un={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function Q(i,e="anon"){let t=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function ge(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function te(i){if(!Number.isFinite(i))return"0.0f";let e=i.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function ln(i,e,t){return t==="ramp"?`${i}[i] = (float)i;`:t==="noise"?`${i}[i] = (float)((i * 37) % ${e});`:`${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function dn(i){let e=new Map;if(!i)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,n;for(;(n=t.exec(i))!==null;)e.set(n[1],n[2]);return e}function W(i,e,t){let n=e.has(i)?e.get(i):"";return`${t}/* USER CODE BEGIN ${i} */${n}${t}/* USER CODE END ${i} */`}var cn=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function De(i,e,t){let n=[],r=dn(e?.c??""),s=i.pages.map((m,y)=>m.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName)?m.fnName:`page_${y}`),a=new Map,o=new Map;for(let m of i.variables??[]){if(!m.name){n.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}if(a.has(m.name)){n.push(`\u53D8\u91CF\u540D "${m.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(m.name)||n.push(`\u53D8\u91CF\u540D "${m.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${Q(m.name)}"`);let y=Q(m.name,"var"),g=m.type==="float"||m.type==="double",S={name:y,srcType:m.type,type:un[m.type],init:g?te(m.initialValue):String(Math.trunc(m.initialValue)),isFloat:g,step:m.step,min:m.min,max:m.max};a.set(y,S),o.set(m.id,S)}let u=new Map,d=new Set,l=[],c=new Map;for(let m of i.chartBuffers??[]){if(!m.name){n.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");continue}let y=Q(m.name,"buf");if([...c.values()].some(j=>j.name===y)){n.push(`\u7F13\u51B2\u533A\u540D "${m.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let g=Math.max(2,Math.trunc(m.dataLen)),S=`${y.toUpperCase()}_LEN`;c.set(m.id,{name:y,lenMacro:S,len:g});let P=`fill_${y}`,K=(r.get(P)??"").trim()!=="";l.push(`#define ${S} ${g}`,`static float ${y}[${S}];`,`static uint8_t ${y}_filled = 0;`,`static void ${y}_fill(void)`,"{",W(P,r,"    "),...m.sample!=="none"&&!K?[`    for (uint16_t i = 0; i < ${S}; ++i) { ${ln(y,g,m.sample)} }`]:[],"}")}let x=[],b=new Map,$=new Map,w=new Map;{let m=0,y=0,g=S=>{let P=c.get(S);return P?(w.has(S)||w.set(S,`        if (!${P.name}_filled) { ${P.name}_filled = 1; ${P.name}_fill(); }`),w.get(S)):""};for(let S of i.pages)for(let P of S.items){if(P.kind!=="chart")continue;let K=P.sources.filter(C=>c.has(C.bufferId));if(P.sources.length&&!K.length){n.push(`\u9875\u9762 ${S.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!K.length){n.push(`\u9875\u9762 ${S.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let j=Math.max(4,Math.trunc(P.height)),Z=[];for(let C of K){let H=c.get(C.bufferId),_=`chart${m++}`;x.push(`static float ${_}_dis[${H.lenMacro}];`,`static u8g2_chart_t ${_};`),Z.push({name:_,s:C,b:H})}if(Z.length===1){let{name:C,s:H,b:_}=Z[0];x.push(`static uint8_t ${C}_inited = 0;`),b.set(P.id,[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`,`        u8g2_chart_init(&${C}, ${_.name}, ${C}_dis, ${_.lenMacro});`,g(H.bufferId),"    }"]);let A=H.chartKind==="point"?"Point":H.chartKind==="bar"?"Bar":"Line",we=H.min!==void 0&&H.max!==void 0?`${te(H.max)}, ${te(H.min)}`:"0, 0";$.set(P.id,`    u8g2_MenuDrawItem${A}Chart(&${C}, ${j}, ${we});`)}else{let C=`chart_layers_${y++}`;x.push(`static u8g2_menu_drawChart_t ${C}[${Z.length}];`,`static uint8_t ${C}_inited = 0;`);let H=[`    if (!${C}_inited) {`,`        ${C}_inited = 1;`];Z.forEach(({name:_,s:A,b:we},ke)=>{H.push(`        u8g2_chart_init(&${_}, ${we.name}, ${_}_dis, ${we.lenMacro});`),H.push(g(A.bufferId));let jt=A.chartKind==="point"?"u8g2_drawPointChart":A.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",at=A.min!==void 0&&A.max!==void 0?`${te(A.max)}, ${te(A.min)}`:"0, 0";H.push(`        ${C}[${ke}].drawChart = ${jt};`),H.push(`        ${C}[${ke}].chart = &${_};`),H.push(`        ${C}[${ke}].max = ${at.split(", ")[0]};`),H.push(`        ${C}[${ke}].min = ${at.split(", ")[1]};`)}),H.push("    }"),b.set(P.id,H),$.set(P.id,`    u8g2_MenuDrawItemChart(${C}, ${Z.length}, ${j});`)}}}let h=[],p=[],M=[],T=new Set,D=new Map,X=0;for(let m of i.pages)for(let y of m.items){if(y.bind.type==="button"){let g=Q(y.bind.cbName,"btn_cb");u.has(g)||u.set(g,y.bind.buttonId)}switch(y.kind){case"board":d.add(Q(y.cbName,"board_cb"));break;case"xbm":{let g=Q(y.name,"icon");for(;T.has(g);)g=`${g}_2`;T.add(g),D.set(y.id,g);let S=y.bits.length,P=y.bits.map(K=>`0x${(K&255).toString(16).padStart(2,"0")}`).join(", ");h.push(`static const uint8_t menu_xbm_${g}[${S}] = { ${P} };`);break}case"textarea":{let g=X++;p.push(`static char ta${g}_text[] = "${ge(y.content)}";`,`static u8g2_menu_textArea_t ta${g};`,`static uint8_t ta${g}_inited = 0;`),M.push(`    if (!ta${g}_inited) {`,`        ta${g}_inited = 1;`,`        u8g2_textArea_init(&ta${g}, ta${g}_text);`,`        u8g2_textArea_setLineSpacing(&ta${g}, ${Math.max(0,Math.trunc(y.lineSpacing))});`,"    }");break}default:break}}let G=(m,y)=>{if(!m)return"";let g=`"${ge(m)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${g});`:`u8g2_MenuUTF8Printf(${g});`},N=(m,y,g)=>{let S=`"${ge(m)}"`;return y===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${S}, ${g});`:`u8g2_MenuUTF8Printf(${S}, ${g});`},B=0,k=(m,y)=>{let g=[],S=`${y.name}`,P=_=>{if(!_)return null;let A=o.get(_);return A||n.push(`\u9875\u9762 ${S} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),A??null},K=m.bind,j=null,Z=null,C="on",H="off";switch(K.type){case"value":{let _=P(K.varId);if(_){j=_;let A=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${te(_.step)}, ${te(_.min)}, ${te(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;g.push(`    ${A}`)}break}case"switch":{let _=P(K.varId);_&&_.srcType!=="uint8"?n.push(`\u5F00\u5173\u9644\u52A0\u503C\u7ED1\u5B9A\u7684\u53D8\u91CF "${_.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${_.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`):_&&(Z=_,C=K.onText,H=K.offText,g.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(K.openValue)});`));break}case"button":{let _=Q(K.cbName,"btn_cb");g.push(`    u8g2_MenuItem_button(${_}, ${Math.trunc(K.buttonId)});`);break}case"submenu":{let _=i.pages.findIndex(A=>A.id===K.targetPageId);!K.targetPageId||_<0?n.push(`\u9875\u9762 ${S} \u7684\u6761\u76EE "${m.label||"\u672A\u547D\u540D"}" \u9644\u52A0\u503C\u76EE\u6807\u9875\u9762\u65E0\u6548\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`):g.push(`    u8g2_MenuItem_menu_enter(${s[_]});`);break}case"back":g.push("    u8g2_MenuItem_menu_back();");break;default:break}switch(m.kind){case"text":{if(j)g.push(`    ${N(m.text,m.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(m.text)||n.push(`\u9875\u9762 ${S} \u7684\u6570\u503C\u9644\u52A0\u503C\u6761\u76EE\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(Z)g.push(`    ${N(m.text,m.scale,`${Z.name} ? "${ge(C)}" : "${ge(H)}"`)}`),/%[-+ #0]*s/.test(m.text)||n.push("\u5F00\u5173\u9644\u52A0\u503C\u6761\u76EE\u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off");else if(K.type==="none"&&m.displayVarId){let _=P(m.displayVarId);if(_)g.push(`    ${N(m.text,m.scale,_.name)}`),/%[-+ #0]*[a-zA-Z]/.test(m.text)||n.push(`\u9875\u9762 ${S} \u7684\u663E\u793A\u6761\u76EE\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else{n.push(`\u9875\u9762 ${S} \u7684\u663E\u793A\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let A=G(m.text,m.scale);A&&g.push(`    ${A}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(m.text)){n.push(`\u9875\u9762 ${S} \u7684\u6587\u672C\u6761\u76EE\u542B\u5360\u4F4D\u7B26\u4F46\u672A\u7ED1\u5B9A\u53D8\u91CF/\u663E\u793A\u53D8\u91CF\uFF0C\u5360\u4F4D\u7B26\u5DF2\u79FB\u9664`);let _=G(m.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),m.scale);_&&g.push(`    ${_}`)}else{let _=G(m.text,m.scale);_&&g.push(`    ${_}`)}break}case"slider":case"progress":{let _=m.kind==="slider"?"Slider":"ProgressBar";if(j){if(!cn.has(j.srcType)){n.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u9644\u52A0\u503C\u7684\u53D8\u91CF "${j.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${j.srcType}\uFF09\uFF0C\u5DF2\u6309\u9759\u6001\u663E\u793A\u751F\u6210`),g.push(`    u8g2_MenuDrawItem${_}(${(m.position/100).toFixed(2)}f);`);break}g.push(`    u8g2_MenuDrawItem${_}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{let A=Math.min(100,Math.max(0,m.position));g.push(`    u8g2_MenuDrawItem${_}(${(A/100).toFixed(2)}f);`)}break}case"chart":{let _=b.get(m.id),A=$.get(m.id);if(!_||!A)break;g.push(..._),g.push(A);break}case"xbm":g.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${D.get(m.id)??Q(m.name,"icon")});`);break;case"textarea":{let _=B++;g.push(...M[_].split(`
`));let A=m.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";g.push(`    ${A}(&ta${_}, ${Math.max(10,Math.trunc(m.height))});`);break}case"board":{let _=Q(m.cbName,"board_cb");g.push(`    u8g2_MenuDrawItemBoard(${_}, ${Math.max(1,Math.trunc(m.w))}, ${Math.max(1,Math.trunc(m.h))});`);break}}return g},f=[];f.push("/**"),f.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${i.name}`),f.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),f.push(" *"),f.push(" * main.c \u91CC\u4F7F\u7528\u4EE5\u4E0B\u7B26\u53F7\u65F6\uFF0C\u76F4\u63A5 extern\uFF08\u6216\u590D\u5236\u4E0B\u9762\u58F0\u660E\uFF09\uFF1A"),f.push(` *   u8g2_SetFont(&u8g2, ${t?"menu_font":i.font});`),s.forEach((m,y)=>f.push(` *   void ${m}(void);   /* \u9875\u9762: ${i.pages[y].name} */`));for(let m of a.values())f.push(` *   extern ${m.type} ${m.name};`);for(let[m]of u)f.push(` *   void ${m}(u8g2_menu_t *menu, uint8_t ID);`);for(let m of d)f.push(` *   void ${m}(u8g2_t *u8g2);`);f.push(" */"),f.push('#include "u8g2_menu.h"'),(i.chartBuffers??[]).some(m=>m.sample==="sine")&&f.push("#include <math.h>"),f.push(""),f.push(W("includes",r,"")),f.push(""),s.forEach(m=>f.push(`void ${m}(void);`)),f.push(""),f.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),f.push(W("variables",r,""));for(let m of a.values())f.push(`${m.type} ${m.name} = ${m.init};`);if(f.push(""),t){f.push("/* ======================== \u5B57\u4F53\uFF08\u73B0\u573A\u53D6\u6A21\uFF09 ======================== */"),f.push("/* \u4EC5\u5305\u542B\u5DE5\u7A0B\u6587\u672C\u7528\u5230\u7684\u5B57\u5F62\uFF08\u542B ASCII 95 \u4E2A + \u989D\u5916\u5B57\u7B26\uFF09\uFF0C"),f.push(" * main.c \u91CC u8g2_SetFont(&u8g2, menu_font) \u5373\u53EF\u4F7F\u7528\uFF1B"),f.push(' * \u82E5\u8FD0\u884C\u65F6\u8F93\u51FA\u8D85\u51FA\u6B64\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u7F16\u8F91\u5668"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u8865\u5145\u540E\u91CD\u65B0\u751F\u6210\u3002 */');let m=[];for(let y=0;y<t.length;y+=16)m.push("  "+[...t.slice(y,y+16)].map(g=>`0x${g.toString(16).padStart(2,"0")}`).join(", ")+",");f.push(`const uint8_t menu_font[${t.length}] U8G2_FONT_SECTION("menu_font") = {`),f.push(...m),f.push("};"),f.push("")}if((l.length||x.length||p.length||h.length)&&(f.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),f.push(...l,...x,...p,...h),f.push("")),u.size||d.size){f.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),f.push(W("callbacks",r,""));for(let[m]of u)f.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`),f.push("{"),f.push(W(`cb_${m}`,r,"    ")),f.push("}"),f.push("");for(let m of d)f.push(`void ${m}(u8g2_t *u8g2)`),f.push("{"),f.push(W(`cb_${m}`,r,"    ")),f.push("}"),f.push("")}let R=(i.weakHooks??[]).map(m=>Y.find(y=>y.fn===m)).filter(m=>!!m);if(R.length||r.has("weak")||Y.some(m=>(r.get(`weak_${m.fn}`)??"").trim())){f.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),f.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),f.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let y=Y.filter(g=>!i.weakHooks?.includes(g.fn)&&(r.get(`weak_${g.fn}`)??"").trim()).map(g=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${g.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${g.decl}`,"{",W(`weak_${g.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);f.push(y?`${W("weak",r,"").replace(/\n$/,"")}
${y}
`:W("weak",r,"")),f.push("");for(let g of R){f.push(`/* ${g.label}: ${g.desc} */`),f.push(`${g.decl}`),f.push("{"),f.push(W(`weak_${g.fn}`,r,"    "));let S=g.bodyArgs.split(`
`).map(P=>`    ${P}`);g.retNote&&S.push(`    ${g.retNote}`),f.push(...S),f.push("}"),f.push("")}}return f.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),f.push(""),i.pages.forEach((m,y)=>{f.push(`/* \u9875\u9762: ${m.name} */`),f.push(`void ${s[y]}(void)`),f.push("{"),f.push(W(`page_${s[y]}_pre`,r,"    "));for(let g of m.items)f.push(...k(g,m));f.push("}"),f.push("")}),{c:`${f.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:n}}function mn(i){return{raw:i.slice(0,23),glyphCnt:i[0],startUpperA:i[17]<<8|i[18],startLowerA:i[19]<<8|i[20],startUnicode:i[21]<<8|i[22]}}function Te(i,e,t){let n=[],r=[],s=[...e].sort((b,$)=>b-$);for(let b of s){let $=t(b);!$||!$.length||(b<=255?n.push({encoding:b,entry:$}):r.push({encoding:b,entry:$}))}if(!n.length&&!r.length)return null;let a=n.length+r.length,o=0;for(let b of n)o+=b.entry.length;o+=2;let u=4;for(let b of r)u+=b.entry.length;u+=2;let d=mn(i),l=new Uint8Array(23+o+u);l.set(d.raw,0),l[0]=a,l[17]=0,l[18]=0,l[19]=0,l[20]=0,l[21]=0,l[22]=0;let c=23;for(let b of n){if(b.encoding===65){let $=c-23;l[17]=$>>8&255,l[18]=$&255}if(b.encoding===97){let $=c-23;l[19]=$>>8&255,l[20]=$&255}l.set(b.entry,c),c+=b.entry.length}l[c]=0,l[c+1]=0,c+=2;let x=c-23;l[21]=x>>8&255,l[22]=x&255,l[c]=0,l[c+1]=4,l[c+2]=255,l[c+3]=255,c+=4;for(let b of r)l.set(b.entry,c),c+=b.entry.length;return l[c]=0,l[c+1]=0,l}function ht(i){return[...i].map(e=>e.codePointAt(0)).filter(e=>Number.isFinite(e))}function bt(){let i=[];for(let e=32;e<=126;e++)i.push(e);return i}function ne(i,e){let t=new Set(bt()),n=r=>{for(let s of ht(r))t.add(s)};for(let r of i.pages)for(let s of r.items)s.kind==="text"&&n(s.text),s.kind==="textarea"&&n(s.content),s.bind.type==="switch"&&(n(s.bind.onText),n(s.bind.offText));return n(e),t.delete(10),t.delete(13),t}function Me(i){let e=0,t=0;for(let n of i)n<=126?e++:t++;return{total:i.size,ascii:e,cjk:t}}var Ce=(o=>(o[o.None=0]="None",o[o.Up=1]="Up",o[o.Down=2]="Down",o[o.Enter=3]="Enter",o[o.Return=4]="Return",o[o.Add=5]="Add",o[o.Sub=6]="Sub",o))(Ce||{});var pn=128*64/8;function fn(i){return new Promise((e,t)=>{let n=document.createElement("script");n.src=i,n.onload=()=>e(),n.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${i}`)),document.head.appendChild(n)})}var Pe=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.fontSig=null;this.lastKnownPage=0;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await fn(e);let n=t.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await n({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let r=this.mod._em_font_count_export();for(let s=0;s<r;s++){let a=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(a),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(t=>`${t.name}|${t.dataLen}|${t.sample}`),pages:e.pages.map(t=>({n:t.items.length,k:t.items.map(n=>n.kind).join(","),res:t.items.map(n=>n.kind==="chart"?(n.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")}))})}sync(e){let t=this.mod;if(!t)return;let n=this.signature(e);n!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);let r=l=>Math.trunc(Number.isFinite(l)?l:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},a={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},d=l=>l?(e.variables??[]).findIndex(c=>c.id===l):-1;if((e.variables??[]).forEach((l,c)=>{t.ccall("em_var_define",null,["number","number","number","number","number","number"],[c,s[l.type],r(l.initialValue),r(l.step),r(l.min),r(l.max)])}),(e.chartBuffers??[]).forEach((l,c)=>{t.ccall("em_buf_define",null,["number","number","number"],[c,r(l.dataLen),u[l.sample]])}),e.pages.forEach((l,c)=>{t.ccall("em_page_begin",null,["number"],[c]),l.items.forEach((x,b)=>{let $=()=>{let w=x.bind;if(w.type==="none")return;let h=w.type==="value"||w.type==="switch",p=h?(e.variables??[]).find(M=>M.id===w.varId):void 0;t.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[c,b,o[w.type],h&&p?s[p.type]:0,w.type==="switch"?r(w.openValue):0,w.type==="button"?r(w.buttonId):0,w.type==="submenu"?e.pages.findIndex(M=>M.id===w.targetPageId):-1,h&&p?d(p.id):-1])};switch(x.kind){case"text":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,b,a.text,x.scale,0,0,0,x.displayVarId?d(x.displayVarId):-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[c,b,x.text]),$();break;case"slider":case"progress":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,b,a[x.kind],1,0,0,0,-1,-1]),$();break;case"chart":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,b,a.chart,1,r(x.height),0,0,-1,-1]);for(let w of x.sources??[])t.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[c,b,(e.chartBuffers??[]).findIndex(h=>h.id===w.bufferId),{line:0,point:1,bar:2}[w.chartKind],w.min!==void 0&&w.max!==void 0?1:0,w.max??0,w.min??0]);$();break;case"xbm":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,b,a.xbm,1,0,r(x.w),r(x.h),-1,-1]);{let w=t._em_scratch(x.bits.length);w&&(t.HEAPU8.set(new Uint8Array(x.bits),w),t._em_item_bits(c,b,w,x.bits.length))}$();break;case"textarea":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,b,a.textarea,1,r(x.height),0,0,-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[c,b,x.content]),$();break;case"board":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,b,a.board,1,0,r(x.w),r(x.h),-1,-1]),$();break}}),t.ccall("em_page_end",null,["number","number"],[c,l.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],r(e.selectorLeftMargin),r(e.selectorTopMargin),r(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen]),e.fontSubset){let l=ne(e,e.fontExtra),c=e.font+"|"+[...l].sort((x,b)=>x-b).join(",");if(c!==this.fontSig){this.fontSig=c;let x=this.fontIndex(e.font),b=h=>{let p=this.mod,M=p.ccall("em_scratch","number",["number"],[64]),T=p.ccall("em_font_glyph","number",["number","number","number","number"],[x,h,64,M]);return T?p.HEAPU8.slice(M,M+T):null},$=this.getFontBytes(x),w=$?Te($,l,b):null;w&&this.useCustomFont(w)}}else this.fontSig!==null&&(this.fontSig=null)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let n=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(n),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let n=t._em_frame(e);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));let r=t.HEAPU8.subarray(n,n+pn),s=this.img.data;s.fill(255);for(let o=0;o<64;o++){let u=(o>>3)*128,d=1<<(o&7),l=o*128*4;for(let c=0;c<128;c++)r[u+c]&d&&(s[l]=17,s[l+1]=24,s[l+2]=39),l+=4}this.ctx.putImageData(this.img,0,0);let a=t._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,this.events.onPageChanged?.(a))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getFontBytes(e){let t=this.mod;if(!t)return null;let n=t.ccall("em_font_data","number",["number"],[e]),r=t.ccall("em_font_data_len","number",["number"],[e]);return!n||!r?null:t.HEAPU8.slice(n,n+r)}glyphFetcher(e){let t=this.mod;return t?n=>{let r=t.ccall("em_scratch","number",["number"],[64]),s=t.ccall("em_font_glyph","number",["number","number","number","number"],[e,n,64,r]);return s?t.HEAPU8.slice(r,r+s):null}:null}useCustomFont(e){let t=this.mod;if(!t)return!1;let n=t.ccall("em_custom_font_ptr","number",[],[]),r=t.ccall("em_custom_font_max","number",[],[]);return e.length>r?!1:(t.HEAPU8.set(e,n),t.ccall("em_set_custom_font",null,["number"],[e.length]),!0)}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Ze=globalThis,vt=i=>i,Ve=Ze.trustedTypes,xt=Ve?Ve.createPolicy("lit-html",{createHTML:i=>i}):void 0,kt="$lit$",re=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+re,gn=`<${St}>`,oe=document,be=()=>oe.createComment(""),ve=i=>i===null||typeof i!="object"&&typeof i!="function",Ge=Array.isArray,hn=i=>Ge(i)||typeof i?.[Symbol.iterator]=="function",Fe=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,_t=/>/g,ie=RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,It=/"/g,Et=/^(?:script|style|textarea|title)$/i,Ye=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),v=Ye(1),Jn=Ye(2),Qn=Ye(3),xe=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),wt=new WeakMap,se=oe.createTreeWalker(oe,129);function At(i,e){if(!Ge(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(e):e}var bn=(i,e)=>{let t=i.length-1,n=[],r,s=e===2?"<svg>":e===3?"<math>":"",a=he;for(let o=0;o<t;o++){let u=i[o],d,l,c=-1,x=0;for(;x<u.length&&(a.lastIndex=x,l=a.exec(u),l!==null);)x=a.lastIndex,a===he?l[1]==="!--"?a=$t:l[1]!==void 0?a=_t:l[2]!==void 0?(Et.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=ie):l[3]!==void 0&&(a=ie):a===ie?l[0]===">"?(a=r??he,c=-1):l[1]===void 0?c=-2:(c=a.lastIndex-l[2].length,d=l[1],a=l[3]===void 0?ie:l[3]==='"'?It:yt):a===It||a===yt?a=ie:a===$t||a===_t?a=he:(a=ie,r=void 0);let b=a===ie&&i[o+1].startsWith("/>")?" ":"";s+=a===he?u+gn:c>=0?(n.push(d),u.slice(0,c)+kt+u.slice(c)+re+b):u+re+(c===-2?o:b)}return[At(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},$e=class i{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let s=0,a=0,o=e.length-1,u=this.parts,[d,l]=bn(e,t);if(this.el=i.createElement(d,n),se.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=se.nextNode())!==null&&u.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(kt)){let x=l[a++],b=r.getAttribute(c).split(re),$=/([.?@])?(.*)/.exec(x);u.push({type:1,index:s,name:$[2],strings:b,ctor:$[1]==="."?ze:$[1]==="?"?qe:$[1]==="@"?Xe:pe}),r.removeAttribute(c)}else c.startsWith(re)&&(u.push({type:6,index:s}),r.removeAttribute(c));if(Et.test(r.tagName)){let c=r.textContent.split(re),x=c.length-1;if(x>0){r.textContent=Ve?Ve.emptyScript:"";for(let b=0;b<x;b++)r.append(c[b],be()),se.nextNode(),u.push({type:2,index:++s});r.append(c[x],be())}}}else if(r.nodeType===8)if(r.data===St)u.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(re,c+1))!==-1;)u.push({type:7,index:s}),c+=re.length-1}s++}}static createElement(e,t){let n=oe.createElement("template");return n.innerHTML=e,n}};function me(i,e,t=i,n){if(e===xe)return e;let r=n!==void 0?t._$Co?.[n]:t._$Cl,s=ve(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,n)),n!==void 0?(t._$Co??=[])[n]=r:t._$Cl=r),r!==void 0&&(e=me(i,r._$AS(i,e.values),r,n)),e}var Oe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??oe).importNode(t,!0);se.currentNode=r;let s=se.nextNode(),a=0,o=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new _e(s,s.nextSibling,this,e):u.type===1?d=new u.ctor(s,u.name,u.strings,this,e):u.type===6&&(d=new We(s,this,e)),this._$AV.push(d),u=n[++o]}a!==u?.index&&(s=se.nextNode(),a++)}return se.currentNode=oe,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},_e=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=me(this,e,t),ve(e)?e===I||e==null||e===""?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==xe&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):hn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&ve(this._$AH)?this._$AA.nextSibling.data=e:this.T(oe.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=$e.createElement(At(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new Oe(r,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(e){let t=wt.get(e.strings);return t===void 0&&wt.set(e.strings,t=new $e(e)),t}k(e){Ge(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,r=0;for(let s of e)r===t.length?t.push(n=new i(this.O(be()),this.O(be()),this,this.options)):n=t[r],n._$AI(s),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=vt(e).nextSibling;vt(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},pe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,s){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=I}_$AI(e,t=this,n,r){let s=this.strings,a=!1;if(s===void 0)e=me(this,e,t,0),a=!ve(e)||e!==this._$AH&&e!==xe,a&&(this._$AH=e);else{let o=e,u,d;for(e=s[0],u=0;u<s.length-1;u++)d=me(this,o[n+u],t,u),d===xe&&(d=this._$AH[u]),a||=!ve(d)||d!==this._$AH[u],d===I?e=I:e!==I&&(e+=(d??"")+s[u+1]),this._$AH[u]=d}a&&!r&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ze=class extends pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}},qe=class extends pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}},Xe=class extends pe{constructor(e,t,n,r,s){super(e,t,n,r,s),this.type=5}_$AI(e,t=this){if((e=me(this,e,t,0)??I)===xe)return;let n=this._$AH,r=e===I&&n!==I||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==I&&(n===I||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},We=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){me(this,e)}};var vn=Ze.litHtmlPolyfillSupport;vn?.($e,_e),(Ze.litHtmlVersions??=[]).push("3.3.3");var O=(i,e,t)=>{let n=t?.renderBefore??e,r=n._$litPart$;if(r===void 0){let s=t?.renderBefore??null;n._$litPart$=r=new _e(e.insertBefore(be(),s),s,void 0,t??{})}return r._$AI(i),r};var xn=Object.keys(le);function $n(i,e,t,n){let r=i.getState(),s=t.label||"text"in t&&t.text||le[t.kind],a=t.bind.type!=="none"?` \xB7 ${de[t.bind.type]}`:"",o=u=>d=>{d.stopPropagation(),i.getState().moveItem(e.id,t.id,u)};return v`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>i.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${mt[t.kind]}</span>
    <span class="ume-item-name" title=${s+a}>${s}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function _n(i,e){let t=i.getState();return v`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{let r=n.target.value;r&&t.addItem(r,e.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${xn.map(n=>v`<option value=${n}>${le[n]}</option>`)}
  </select>`}function Tt(i,e){let{project:t,selection:n}=e.getState(),r=s=>{let a=e.getState(),o=n.pageId===s.id;return v`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&a.removePage(s.id)}}>✕</button>
      </div>
      ${o?v`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>$n(e,s,u,n.itemId===u.id)):v`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${_n(e,s)}</div>
      </div>`:I}
    </div>`};O(v`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>yn(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(r)}
  `,i)}function yn(i){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${i.getState().project.pages.length+1}`);e!==null&&i.getState().addPage(e||void 0)}function F(i,e,t,n=""){return v`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${e??""} placeholder=${n}
      @change=${r=>t(r.target.value)} />
  </div>`}function V(i,e,t,n=1){return v`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(e)} step=${String(n)}
      @change=${r=>{let s=parseFloat(r.target.value);t(Number.isFinite(s)?s:0)}} />
  </div>`}function q(i,e,t,n){return v`<div class="ume-field">
    <label>${i}</label>
    <select @change=${r=>n(r.target.value)}>
      ${t.map(r=>v`<option value=${r.value} ?selected=${r.value===e}>${r.label}</option>`)}
    </select>
  </div>`}function ye(i,e,t){return v`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${n=>t(n.target.checked)} />
    <span>${i}</span>
  </div>`}function Mt(i,e,t,n=!1){return v`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${r=>t(r.target.value)}>${e??""}</textarea>
  </div>`}function Ie(i,e,t="text/plain"){let n=new Blob([e],{type:`${t};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=i,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}var Je=null,Pt={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function Qe(i,e,t,n){let r=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...t.map(a=>({value:a.id,label:`${a.name} : ${Pt[a.type]??a.type}`}))],s=e?t.some(a=>a.id===e):!1;return v`
    ${q(i,e??"",r,a=>n(a||null))}
    ${e&&!s?v`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:I}
    ${t.length===0?v`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:I}
  `}function et(i,e){return v`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let t=i.getState().addVariable();e(t)}}>＋ 新建变量并绑定</button>
  </div>`}function tt(i){return i?v`<div class="ume-hint">
    ${i.name} : ${Pt[i.type]??i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>`:v`${I}`}function Ct(i,e,t){let{project:n,selection:r}=e.getState(),s=n.pages.find(b=>b.id===r.pageId)??null,a=s?.items.find(b=>b.id===r.itemId)??null,o=n.variables??[],u=n.chartBuffers??[],d=(b,$)=>e.getState().updateItem(s.id,a.id,b,$),l=b=>d({bind:b}),c=v`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,x="";if(s&&!a)x="\u9875\u9762\u5C5E\u6027",c=v`
      ${F("\u540D\u79F0",s.name,b=>e.getState().updatePage(s.id,{name:b}))}
      ${F("C \u51FD\u6570\u540D",s.fnName,b=>e.getState().updatePage(s.id,{fnName:b}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&a){(a.bind.type==="value"||a.bind.type==="switch")&&a.bind.varId&&(Je=a.bind.varId),x=`${le[a.kind]}${a.bind.type!=="none"?` + ${de[a.bind.type]}`:""}`;let b=v``;switch(a.kind){case"text":{let h=a,p=o.find(M=>M.id===h.displayVarId);b=v`
          ${F("\u6587\u672C/\u683C\u5F0F",h.text,M=>d({text:M},`text-${h.id}`))}
          ${q("\u5927\u5C0F",String(h.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],M=>d({scale:Number(M)}))}
          ${a.bind.type==="none"?v`
            ${Qe("\u663E\u793A\u53D8\u91CF",h.displayVarId,o,M=>d({displayVarId:M}))}
            ${p?I:et(e,M=>d({displayVarId:M.id}))}
            ${tt(p)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:I}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{let h=a;b=v`
          ${a.bind.type==="none"?v`
            ${V("\u9759\u6001\u4F4D\u7F6E(%)",h.position,p=>d({position:Math.min(100,Math.max(0,Math.trunc(p)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:I}
        `;break}case"chart":{let h=a,p=T=>d({sources:T}),M=(T,D)=>{let X=u.find(N=>N.id===T.bufferId),G=T.min===void 0||T.max===void 0;return v`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${X?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[T.chartKind]??T.chartKind}${G?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${T.min}~${T.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>p(h.sources.filter((N,B)=>B!==D))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${q("\u7F13\u51B2\u533A",T.bufferId,u.map(N=>({value:N.id,label:`${N.name} (${N.dataLen}\u70B9)`})),N=>p(h.sources.map((B,k)=>k===D?{...B,bufferId:N}:B)))}
              ${q("\u7ED8\u5236",T.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],N=>p(h.sources.map((B,k)=>k===D?{...B,chartKind:N}:B)))}
              ${ye("\u81EA\u52A8\u91CF\u7A0B",G,N=>p(h.sources.map((B,k)=>k===D?{...B,min:N?void 0:0,max:N?void 0:100}:B)))}
              ${G?I:v`
                ${V("\u91CF\u7A0B\u4E0A\u9650",T.max??100,N=>p(h.sources.map((B,k)=>k===D?{...B,max:N}:B)),"any")}
                ${V("\u91CF\u7A0B\u4E0B\u9650",T.min??0,N=>p(h.sources.map((B,k)=>k===D?{...B,min:N}:B)),"any")}`}
            </div>
          </div>`};b=v`
          ${V("\u9AD8\u5EA6(px)",h.height,T=>d({height:Math.max(4,Math.trunc(T))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(h.sources??[]).map(M)}
              ${(h.sources??[]).length===0?v`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:I}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(h.sources??[]).length>=4}
                @click=${()=>{if(!u.length){let T=e.getState().addChartBuffer();p([...h.sources??[],{bufferId:T.id,chartKind:"line"}]);return}p([...h.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(h.sources??[]).length>0?"\uFF08\u53E0\u52A0\uFF09":""}</button>
              ${u.length?I:v`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{let h=a;b=v`
          ${F("\u6570\u7EC4\u540D",h.name,p=>d({name:p}))}
          ${V("\u5BBD(px)",h.w,p=>d({w:Math.min(128,Math.max(1,Math.trunc(p)))}))}
          ${V("\u9AD8(px)",h.h,p=>d({h:Math.min(64,Math.max(1,Math.trunc(p)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(s.id,h.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${h.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let h=a;b=v`
          ${Mt("\u6587\u672C\u5185\u5BB9",h.content,p=>d({content:p}))}
          ${V("\u9AD8\u5EA6(px)",h.height,p=>d({height:Math.max(10,Math.trunc(p))}))}
          ${V("\u884C\u95F4\u8DDD",h.lineSpacing,p=>d({lineSpacing:Math.max(0,Math.trunc(p))}))}
          ${ye("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",h.bindScroll,p=>d({bindScroll:p}))}
        `;break}case"board":{let h=a;b=v`
          ${V("\u5BBD(px)",h.w,p=>d({w:Math.max(1,Math.trunc(p))}))}
          ${V("\u9AD8(px)",h.h,p=>d({h:Math.max(1,Math.trunc(p))}))}
          ${F("\u56DE\u8C03\u51FD\u6570\u540D",h.cbName,p=>d({cbName:p}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}let $=a.bind,w=v``;switch($.type){case"none":w=v`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{let h=o.find(p=>p.id===$.varId);w=v`
          ${Qe("\u53D8\u91CF",$.varId,o,p=>l({type:"value",varId:p}))}
          ${h?I:et(e,p=>l({type:"value",varId:p.id}))}
          ${tt(h)}
          ${a.kind==="text"?v`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:I}
        `;break}case"switch":{let h=o.filter(p=>p.type==="uint8").find(p=>p.id===$.varId)??o.find(p=>p.id===$.varId);w=v`
          ${Qe("\u53D8\u91CF (uint8)",$.varId,o.filter(p=>p.type==="uint8"),p=>l({type:"switch",varId:p,openValue:$.openValue,onText:$.onText,offText:$.offText}))}
          ${h?I:et(e,p=>l({type:"switch",varId:p.id,openValue:$.openValue,onText:$.onText,offText:$.offText}))}
          ${tt(h)}
          ${V("openValue",$.openValue,p=>l({type:"switch",varId:$.varId,openValue:Math.max(0,Math.trunc(p)),onText:$.onText,offText:$.offText}))}
          ${F('"\u5F00"\u6587\u672C',$.onText,p=>l({type:"switch",varId:$.varId,openValue:$.openValue,onText:p,offText:$.offText}))}
          ${F('"\u5173"\u6587\u672C',$.offText,p=>l({type:"switch",varId:$.varId,openValue:$.openValue,onText:$.onText,offText:p}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":w=v`
          ${F("\u56DE\u8C03\u51FD\u6570\u540D",$.cbName,h=>l({type:"button",cbName:h,buttonId:$.buttonId}))}
          ${V("ID",$.buttonId,h=>l({type:"button",cbName:$.cbName,buttonId:Math.trunc(h)}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":w=v`
          ${q("\u76EE\u6807\u9875\u9762",$.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...n.pages.filter(h=>h.id!==s.id).map(h=>({value:h.id,label:h.name}))],h=>l({type:"submenu",targetPageId:h||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":w=v`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}c=v`
      <div class="ume-panel-title">绘制</div>
      ${b}
      <div class="ume-panel-title">附加值</div>
      ${q("\u7C7B\u578B",$.type,Object.keys(de).map(h=>({value:h,label:de[h]})),h=>{let p=a.bind;l(h==="value"?{type:"value",varId:p.type==="value"||p.type==="switch"?p.varId:Je}:h==="switch"?{type:"switch",varId:p.type==="value"||p.type==="switch"?p.varId:Je,openValue:1,onText:"on",offText:"off"}:h==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:h==="submenu"?{type:"submenu",targetPageId:p.type==="submenu"?p.targetPageId:null}:{type:"none"})})}
      ${w}
    `}O(v`
    ${x?v`<div class="ume-panel-title"><span class="ume-kind-badge">${x}</span></div>`:I}
    ${c}
  `,i)}var Ne=null,nt=null,In=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function wn(i,e){let t=e.variables??[],n=s=>{Ne=Ne===s?null:s},r=s=>{let a=Ne===s.id,o=(c,x)=>i.getState().updateVariable(s.id,c,x),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=t.filter(c=>c.name===s.name).length>1,l=kn(e,s.id);return v`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${l?` \xB7 ${l} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${c=>{c.stopPropagation();let x=i.getState().removeVariable(s.id);x>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${x} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?v`<div class="ume-var-edit">
        ${F("\u53D8\u91CF\u540D",s.name,c=>o({name:c.trim()},`vn-${s.id}`))}
        ${u?v`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:I}
        ${d?v`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:I}
        ${q("\u7C7B\u578B",s.type,In,c=>o({type:c}))}
        ${V("\u521D\u59CB\u503C",s.initialValue,c=>o({initialValue:c},`vi-${s.id}`),"any")}
        ${V("\u6700\u5C0F\u503C",s.min,c=>o({min:c},`vmin-${s.id}`),"any")}
        ${V("\u6700\u5927\u503C",s.max,c=>o({max:c},`vmax-${s.id}`),"any")}
        ${V("\u6B65\u957F",s.step,c=>o({step:c},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:I}
    </div>`};return v`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{Ne=i.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):v`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function kn(i,e){let t=0;for(let n of i.pages)for(let r of n.items)"varId"in r&&r.varId===e&&t++;return t}function Sn(i,e){let t=e.chartBuffers??[],n=s=>{let a=0;for(let o of e.pages)for(let u of o.items)u.kind==="chart"&&u.sources.some(d=>d.bufferId===s)&&a++;return a},r=s=>{let a=nt===s.id,o=(l,c)=>i.getState().updateChartBuffer(s.id,l,c),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),d=n(s.id);return v`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>{nt=a?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[s.sample]}${d?` \xB7 ${d} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${l=>{l.stopPropagation();let c=i.getState().removeChartBuffer(s.id);c>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${c} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?v`<div class="ume-var-edit">
        ${F("\u6570\u7EC4\u540D",s.name,l=>o({name:l.trim()},`bn-${s.id}`))}
        ${u?v`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:I}
        ${V("\u70B9\u6570",s.dataLen,l=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(l)))},`bl-${s.id}`))}
        ${q("\u793A\u4F8B\u586B\u5145",s.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],l=>o({sample:l}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:I}
    </div>`};return v`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{nt=i.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):v`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Vt(i,e){let{project:t}=e.getState();O(v`
    ${wn(e,t)}
    ${Sn(e,t)}
  `,i)}function Nt(i,e){let{project:t}=e.getState(),n=(o,u)=>e.getState().update(d=>{Object.assign(d,o)},u),r=t.weakHooks??[],s=(o,u)=>{e.getState().update(d=>{let l=d.weakHooks??[];d.weakHooks=u?[...new Set([...l,o])]:l.filter(c=>c!==o)})},a=v`
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
    ${ye("\u4E2D\u6587\u73B0\u573A\u53D6\u6A21\uFF08\u4EC5\u5305\u542B\u7528\u5230\u7684\u5B57\u5F62\uFF09",t.fontSubset,o=>n({fontSubset:o}))}
    ${t.fontSubset?v`
      ${F("\u989D\u5916\u5305\u542B\u5B57\u7B26",t.fontExtra,o=>n({fontExtra:o}))}
      ${(()=>{let o=Me(ne(t,t.fontExtra));return v`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:I}
    ${q("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],o=>n({selector:o}))}
    ${V("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,o=>n({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${V("\u9876\u8FB9\u8DDD",t.selectorTopMargin,o=>n({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${V("\u884C\u95F4\u8DDD",t.selectorLineSpacing,o=>n({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${V("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,o=>n({marqueeSpeed:o}),.05)}
    ${V("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,o=>n({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `,i)}function Bt(i,e){let t=r=>{let s,a=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),e.key(r),a(),s=window.setInterval(()=>e.key(r),180)},up:a}},n=(r,s,a)=>{let o=t(r);return v`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};O(v`
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
  `,i)}var ue=null;function Ht(i,e){ue=e,i.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),En(i)}function En(i){if(!ue)return;let e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",t=>{t.target===e&&Lt(e)}),O(v`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Lt(e)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${ue.warnings.length?v`
          <div style="margin-bottom:8px">
            ${ue.warnings.map(t=>v`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:I}
        <div class="ume-code-view">${ue.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(ue.c).then(()=>An(e,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{Ie("menu_pages.c",ue.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,e),i.appendChild(e)}function Lt(i){i.remove()}function An(i,e){let t=i.closest(".ume")??document.body,n=t.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",t.appendChild(n)),n.textContent=e,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function Rt(i,e,t,n){let a=e.getState().project.pages.find(k=>k.id===t)?.items.find(k=>k.id===n);if(!a||a.kind!=="xbm")return;let o=a,u=o.w,d=o.h,l=[...o.bits],c=()=>Math.ceil(u/8),x=document.createElement("div");x.className="ume-modal-mask",x.addEventListener("click",k=>{k.target===x&&B()});let b=(k,f)=>{let R=f*c()+(k>>3);return R<l.length?!!(l[R]>>(k&7)&1):!1},$=(k,f,R)=>{let ae=f*c()+(k>>3);l[ae]=R?l[ae]|1<<(k&7):l[ae]&~(1<<(k&7))},w=(k,f)=>{let R=Math.ceil(u/8),ae=Math.ceil(k/8),m=new Array(ae*f).fill(0);for(let y=0;y<Math.min(d,f);y++)for(let g=0;g<Math.min(u,k);g++){let S=y*R+(g>>3);S<l.length&&l[S]>>(g&7)&1&&(m[y*ae+(g>>3)]|=1<<(g&7))}u=k,d=f,l=m},h=!1,p=!0,M=(k,f)=>R=>{R.preventDefault(),h=!0,p=!b(k,f),$(k,f,p),X()},T=(k,f)=>()=>{h&&($(k,f,p),X())},D=()=>{h=!1},X=()=>{O(N(),x)},G=()=>{let k=[];for(let f=0;f<d;f++)for(let R=0;R<u;R++)k.push(v`<button class="ume-xbm-cell ${b(R,f)?"on":""}"
          data-x=${R} data-y=${f}
          @pointerdown=${M(R,f)}
          @pointerenter=${T(R,f)}></button>`);return k},N=()=>v`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${d}</span></span>
        <button class="ume-mini" @click=${B}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${D}
        @pointerleave=${D}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${k=>{w(Kt(+k.target.value,1,128),d),X()}} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${k=>{w(u,Kt(+k.target.value,1,64)),X()}} />
          <button class="ume-btn sm" @click=${()=>{l=l.map(()=>0),X()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{l=l.map(k=>~k&255),X()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${G()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${B}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,n,{w:u,h:d,bits:[...l]}),B()}}>应用</button>
      </div>
    </div>
  `;function B(){x.remove(),document.removeEventListener("pointerup",D)}document.addEventListener("pointerup",D),X(),i.appendChild(x)}function Kt(i,e,t){return Number.isFinite(i)?Math.min(t,Math.max(e,Math.trunc(i))):e}var Tn="prebuilt/u8g2-menu-preview.js",rt=class{constructor(e,t={}){this.store=Re();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let d=document.createElement("style");d.id="ume-style",d.textContent=it,document.head.appendChild(d)}let n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??n??void 0;if(r!==void 0)try{this.store.setState({project:Ae(r)})}catch(d){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",d)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),e.innerHTML=`
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
    `;let a=d=>e.querySelector(d);this.els={left:a(".ume-left"),center:a(".ume-center"),right:a(".ume-right"),propEl:a('[data-role="prop"]'),resEl:a('[data-role="res"]'),setEl:a('[data-role="set"]'),toolbarUndo:a('[data-act="undo"]'),toolbarRedo:a('[data-act="redo"]')};let o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new Pe(o,{onPageChanged:d=>this.onPreviewPageChanged(d)});let u=document.createElement("div");this.els.center.appendChild(u),Bt(u,this.preview),this.preview.load(this.opts.wasmUrl??Tn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(d=>{console.error(d);let l=document.createElement("div");l.className="ume-warn",l.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${d.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(l)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let d=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);d!==null&&this.store.getState().addPage(d||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{Ie(`${this.store.getState().project.name||"menu-project"}.json`,Ue(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{a('[data-role="file"]').click()}),a('[data-role="file"]').addEventListener("change",d=>{let l=d.target.files?.[0];l&&(l.text().then(c=>{try{let x=Ae(c);this.store.getState().update(b=>{Object.assign(b,x)}),this.scheduleRender()}catch(x){alert(`\u5BFC\u5165\u5931\u8D25: ${x.message}`)}}),d.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=Ae(e);this.store.getState().update(n=>{Object.assign(n,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.lastExport,t=this.store.getState().project,n,r=0;if(t.fontSubset&&this.preview.ready){let a=ne(t,t.fontExtra),o=this.buildFontSubset(t,a);o?(n=o,r=o.length,this.preview.useCustomFont(o)):console.warn("[u8g2-menu-editor] \u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u5B57\u7B26\u96C6\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62")}let s=De(t,e??void 0,n);if(n){let a=Me(ne(t,t.fontExtra));s.warnings.unshift(`\u73B0\u573A\u53D6\u6A21\uFF1A\u6536\u5F55 ${a.total} \u4E2A\u5B57\u7B26\uFF08ASCII ${a.ascii} + \u6269\u5C55 ${a.cjk}\uFF09\uFF0C\u5B57\u4F53\u6570\u7EC4 ${r} \u5B57\u8282\u3002\u8FD0\u884C\u65F6\u82E5\u8F93\u51FA\u8D85\u51FA\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u91CC\u8865\u5145\u989D\u5916\u5B57\u7B26`)}return this.lastExport={c:s.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,s.c),Ht(this.container,s),this.opts.onExport?.(s),s}downloadC(){let e=this.store.getState().project,t;e.fontSubset&&this.preview.ready&&(t=this.buildFontSubset(e,ne(e,e.fontExtra)),t&&this.preview.useCustomFont(t));let n=De(e,this.lastExport??void 0,t);this.lastExport={c:n.c},Ie("menu_pages.c",n.c)}buildFontSubset(e,t){let n=this.preview.fontIndex(e.font),r=this.preview.getFontBytes(n),s=this.preview.glyphFetcher(n);if(!(!r||!s))return Te(r,t,s)??void 0}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ue(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();Tt(this.els.left,this.store),Nt(this.els.setEl,this.store),Vt(this.els.resEl,this.store),Ct(this.els.propEl,this.store,{openXbmEditor:(t,n)=>Rt(this.container,this.store,t,n)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),t=document.getElementById("ume-page-jump"),n=this.store.getState(),r=this.store.getState().project.pages.findIndex(s=>s.id===n.selection.pageId);if(t){let s=n.project.pages,a=s.map(u=>u.name).join("|");t.dataset.sig!==a&&(t.dataset.sig=a,t.innerHTML="",s.forEach((u,d)=>{let l=document.createElement("option");l.value=String(d),l.textContent=`${d+1}. ${u.name}`,t.appendChild(l)}),t.onchange=()=>{let u=parseInt(t.value,10);Number.isFinite(u)&&this.preview.navTo(u)});let o=this.preview.currentPage;document.activeElement!==t&&t.value!==String(o)&&(t.value=String(o))}if(e&&r>=0&&n.selection.itemId){let s=n.project.pages[r],a=s.items.findIndex(x=>x.id===n.selection.itemId),o=s.items[a],u=o?.bind,d=u?.type==="value"||u?.type==="switch"?u.varId:null,l=o?.kind==="text"&&u?.type==="none"?o.displayVarId:null,c=d??l;if(o&&c){let x=(n.project.variables??[]).findIndex(p=>p.id===c),b=x>=0?x:r*64+a,w=u?.type==="switch"?this.preview.getSwitch(b):this.preview.getInt(b),h=(n.project.variables??[]).find(p=>p.id===c)?.name;e.textContent=`${h??o.kind} = ${w}`}else e.textContent=""}}};return qt(Mn);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
