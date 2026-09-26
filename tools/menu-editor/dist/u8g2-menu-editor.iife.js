"use strict";var U8G2MenuEditor=(()=>{var De=Object.defineProperty;var Zt=Object.getOwnPropertyDescriptor;var Gt=Object.getOwnPropertyNames;var Jt=Object.prototype.hasOwnProperty;var Qt=(i,e)=>{for(var t in e)De(i,t,{get:e[t],enumerable:!0})},en=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Gt(e))!Jt.call(i,r)&&r!==t&&De(i,r,{get:()=>e[r],enumerable:!(n=Zt(e,r))||n.enumerable});return i};var tn=i=>en(De({},"__esModule",{value:!0}),i);var Kn={};Qt(Kn,{MenuEditor:()=>lt,MenuKey:()=>He});var ct=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`;var mt=i=>{let e,t=new Set,n=(l,d)=>{let c=typeof l=="function"?l(e):l;if(!Object.is(c,e)){let m=e;e=d??(typeof c!="object"||c===null)?c:Object.assign({},e,c),t.forEach($=>$(e,m))}},r=()=>e,o={setState:n,getState:r,getInitialState:()=>u,subscribe:l=>(t.add(l),()=>t.delete(l))},u=e=i(n,r,o);return o},pt=i=>i?mt(i):mt;var Ue=0;function U(i){return Ue=(Ue+1)%1e9,`${i}_${Date.now().toString(36)}_${Ue.toString(36)}`}function he(i){return{id:U("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...i}}function Oe(i){return{id:U("buf"),name:"buf_new",dataLen:32,sample:"sine",...i}}function ft(i,e){let t=new Set(i.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function gt(i,e){let t=new Set(i.map(r=>r.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function X(i){let e={id:U("it"),label:"",bind:{type:"none"}};switch(i){case"text":return{...e,kind:i,text:"\u83DC\u5355\u9879",scale:1,displayVarId:null};case"slider":return{...e,kind:i,position:50};case"progress":return{...e,kind:i,position:50};case"chart":return{...e,kind:i,sources:[],height:32};case"xbm":return nn(16,16);case"textarea":return{...e,kind:i,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:i,w:64,h:32,cbName:"board_cb"}}}function nn(i,e){let t=Math.ceil(i/8);return{id:U("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:i,h:e,bits:new Array(t*e).fill(0)}}function Fe(i){return{id:U("pg"),name:i,fnName:"",items:[],userCodePre:""}}function Me(i,e){return{...i,...e}}function re(i,e){return{...i,...e}}function ht(){let i=[he({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),he({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),he({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[Oe({name:"buf_demo",dataLen:32,sample:"sine"})],t=Fe("\u4E3B\u9875");t.items=[Me(X("text"),{text:"u8g2_menu"}),re(X("text"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E",bind:{type:"submenu",targetPageId:null}}),re(X("text"),{text:"\u5173\u4E8E",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];let n=Fe("\u8BBE\u7F6E");n.items=[re(Me(X("text"),{text:"\u97F3\u91CF:%d"}),{bind:{type:"value",varId:i[0].id}}),re(Me(X("text"),{text:"\u5F00\u5173:%s"}),{bind:{type:"switch",varId:i[1].id,openValue:1,onText:"on",offText:"off"}}),re(X("slider"),{bind:{type:"value",varId:i[2].id}}),re(X("text"),{text:"\u56FE\u8868",bind:{type:"submenu",targetPageId:null}}),re(X("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let r=Fe("\u56FE\u8868");r.items=[Me(X("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),re(X("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:i,chartBuffers:e,pages:[t,n,r]};return t.items[1].bind.targetPageId=n.id,n.items[3].bind.targetPageId=r.id,s}function bt(i){return structuredClone(i)}var rn=800;function ze(){let i=null,e=0;return pt()((t,n)=>({project:ht(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{let a=Date.now(),o=!!s&&s===i&&a-e<rn;i=s??null,e=a,t(u=>{let l=bt(u.project);return r(l),{project:l,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{t(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{t(r=>{if(!r.future.length)return r;let[s,...a]=r.future;return{project:s,past:[...r.past,r.project],future:a,dirty:!0}})},select:(r,s=null)=>t({selection:{pageId:r,itemId:s}}),addPage:r=>{let s={id:U("pg"),name:r??`\u9875\u9762${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(a=>{a.pages.push(s)}),t({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{n().update(a=>{a.pages=a.pages.filter(o=>o.id!==r);for(let o of a.pages)for(let u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});let{selection:s}=n();s.pageId===r&&t({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{n().update(a=>{let o=a.pages.findIndex(l=>l.id===r),u=o+s;o<0||u<0||u>=a.pages.length||([a.pages[o],a.pages[u]]=[a.pages[u],a.pages[o]])})},updatePage:(r,s)=>{n().update(a=>{let o=a.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{let a=s??n().selection.pageId??n().project.pages[0]?.id;if(!a)return null;let o=an(r);return n().update(u=>{u.pages.find(d=>d.id===a)?.items.push(o)}),t({selection:{pageId:a,itemId:o.id}}),o},removeItem:(r,s)=>{n().update(o=>{let u=o.pages.find(l=>l.id===r);u&&(u.items=u.items.filter(l=>l.id!==s))});let{selection:a}=n();a.itemId===s&&t({selection:{pageId:r,itemId:null}})},moveItem:(r,s,a)=>{n().update(o=>{let u=o.pages.find(c=>c.id===r);if(!u)return;let l=u.items.findIndex(c=>c.id===s),d=l+a;l<0||d<0||d>=u.items.length||([u.items[l],u.items[d]]=[u.items[d],u.items[l]])})},duplicateItem:(r,s)=>{let a=null;n().update(o=>{let u=o.pages.find(d=>d.id===r);if(!u)return;let l=u.items.findIndex(d=>d.id===s);l<0||(a=structuredClone(u.items[l]),a.id=U("it"),u.items.splice(l+1,0,a))}),a&&t({selection:{pageId:r,itemId:a.id}})},updateItem:(r,s,a,o)=>{n().update(u=>{let d=u.pages.find(c=>c.id===r)?.items.find(c=>c.id===s);d&&Object.assign(d,a)},o)},addVariable:r=>{let s=null;return n().update(a=>{a.variables=a.variables??[];let o=gt(a.variables,r?.name??"var_new");s=he({...r,name:o}),a.variables.push(s)}),s},removeVariable:r=>{let s=0;for(let a of n().project.pages)for(let o of a.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(n().update(a=>{a.variables=(a.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,a)=>{n().update(o=>{let u=(o.variables??[]).find(l=>l.id===r);u&&Object.assign(u,s)},a)},addChartBuffer:r=>{let s=null;return n().update(a=>{a.chartBuffers=a.chartBuffers??[];let o=ft(a.chartBuffers,r?.name??"buf_new");s=Oe({...r,name:o}),a.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(let a of n().project.pages)for(let o of a.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(n().update(a=>{a.chartBuffers=(a.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,a)=>{n().update(o=>{let u=(o.chartBuffers??[]).find(l=>l.id===r);u&&Object.assign(u,s)},a)}}))}var qn=ze();function an(i){return X(i)}var Q=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],de={text:"\u6587\u672C",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},vt={text:"T",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},ce={none:"\u65E0",value:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE"};var qe=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var ee=class extends Error{},xt=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),$t=new Set(["line","point","bar"]),_t=new Set(["sine","ramp","noise","none"]);function me(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function B(i,e){return typeof i=="string"?i:e}function M(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}var sn=["text","slider","progress","chart","xbm","textarea","board"],on=["number","switch","button","submenu","back"],un=["none","value","switch","button","submenu","back"];function ln(i){if(!me(i))throw new ee("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=B(i.kind,"");if(!(sn.includes(e)||on.includes(e)))throw new ee(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(i);switch(t.id=B(i.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=B(i.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=B(i.text,""),t.scale=i.scale===2?2:1;break}return t}function dn(i){for(let e of i)for(let t of e.items){let n=t;if(!(n.bind&&me(n.bind)&&un.includes(B(n.bind.type,"none")))){switch(n.kind){case"number":{let r=n.varId??null;n.editable===!1?(n.kind="text",n.displayVarId=r,n.bind={type:"none"}):(n.kind="text",n.displayVarId=null,n.bind={type:"value",varId:r});break}case"switch":n.kind="text",n.displayVarId=null,n.bind={type:"switch",varId:n.varId??null,openValue:M(n.openValue,1),onText:B(n.onText,"on"),offText:B(n.offText,"off")};break;case"button":n.kind="text",n.displayVarId=null,n.bind={type:"button",cbName:B(n.cbName,"btn_cb"),buttonId:M(n.buttonId,1)};break;case"submenu":n.kind="text",n.displayVarId=null,n.bind={type:"submenu",targetPageId:n.targetPageId??null};break;case"back":n.kind="text",n.displayVarId=null,n.bind={type:"back"};break;case"slider":case"progress":n.bind=n.varId?{type:"value",varId:n.varId}:{type:"none"},n.position===void 0&&(n.position=50);break;default:n.bind={type:"none"},n.kind==="text"&&n.displayVarId===void 0&&(n.displayVarId=null);break}delete n.varId,delete n.varName,delete n.varType,delete n.editable,delete n.step,delete n.min,delete n.max,delete n.initialValue,delete n.decimals,n.kind!=="board"&&(delete n.cbName,delete n.buttonId),delete n.openValue,delete n.onText,delete n.offText,delete n.targetPageId}}}function cn(i){if(!me(i))throw new ee("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(i.items)?i.items.map(ln):[];return{id:B(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:B(i.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:B(i.fnName,""),items:e,userCodePre:B(i.userCodePre,"")}}function mn(i){if(!me(i))return null;let e=B(i.type,"int32");return{id:B(i.id,"")||U("vb"),name:B(i.name,""),type:xt.has(e)?e:"int32",initialValue:M(i.initialValue,0),min:M(i.min,0),max:M(i.max,100),step:M(i.step,1)}}function pn(i){if(!me(i))return null;let e=B(i.sample,"sine");return{id:B(i.id,"")||U("buf"),name:B(i.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(M(i.dataLen,32)))),sample:_t.has(e)?e:"sine"}}function fn(i){let e=new Map,t=[],n=(r,s)=>{let a=e.get(r);return a||(a=s(),e.set(r,a),t.push(a)),a};for(let r of i)for(let s of r.items){let a=s;switch(s.kind){case"number":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:U("vb"),name:u,type:xt.has(String(a.varType))?String(a.varType):"int32",initialValue:M(a.initialValue,0),min:M(a.min,0),max:M(a.max,100),step:M(a.step,1)}));s.varId=l.id}a.editable===void 0&&(s.editable=!0),delete a.varName,delete a.varType,delete a.step,delete a.min,delete a.max,delete a.initialValue,delete a.decimals;break;case"slider":case"progress":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:U("vb"),name:u,type:"int",initialValue:M(a.initialValue,0),min:M(a.min,0),max:M(a.max,100),step:M(a.step,1)}));s.varId=l.id}delete a.varName,delete a.step,delete a.min,delete a.max,delete a.initialValue;break;case"switch":if(a.varId===void 0||a.varId===null){let u=typeof a.varName=="string"&&a.varName?a.varName:"var_unnamed",l=n(u,()=>({id:U("vb"),name:u,type:"uint8",initialValue:M(a.initialValue,0),min:0,max:1,step:1}));s.varId=l.id}delete a.varName,delete a.initialValue;break;default:break}}return t}function Pe(i){let e;if(typeof i=="string")try{e=JSON.parse(i)}catch{throw new ee("JSON \u89E3\u6790\u5931\u8D25")}else e=i;if(!me(e))throw new ee("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,n=M(t.version,0);if(n>1)throw new ee(`\u5DE5\u7A0B\u7248\u672C v${n} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);n<1&&void 0;let r=Array.isArray(t.pages)?t.pages.map(cn):[];if(!r.length)throw new ee("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",a=new Set(Q.map(d=>d.fn)),o=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(d=>typeof d=="string"&&a.has(d)))]:[],u;Array.isArray(t.variables)?u=t.variables.map(mn).filter(d=>!!d):u=fn(r);let l;return Array.isArray(t.chartBuffers)?l=t.chartBuffers.map(pn).filter(d=>!!d):l=gn(r),dn(r),hn(r,l),{version:1,name:B(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:M(t.width,128),height:M(t.height,64),font:B(t.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:M(t.selectorLeftMargin,16),selectorTopMargin:M(t.selectorTopMargin,0),selectorLineSpacing:M(t.selectorLineSpacing,0),marqueeSpeed:M(t.marqueeSpeed,.2),marqueeHeaderLen:M(t.marqueeHeaderLen,5),weakHooks:o,fontSubset:e.fontSubset===!0,fontExtra:B(e.fontExtra,""),variables:u,chartBuffers:l,pages:r}}function gn(i){let e=[],t=0,n=()=>{let r={id:U("buf"),name:`buf_chart_${++t}`,dataLen:32,sample:"sine"};return e.push(r),r};for(let r of i)for(let s of r.items){if(s.kind!=="chart")continue;let a=s;if(Array.isArray(a.sources))continue;let o=n();o.dataLen=Math.min(512,Math.max(2,Math.trunc(M(a.dataLen,32))));let u=B(a.sample,"sine");_t.has(u)&&(o.sample=u);let l=B(a.chartKind,"line"),d={bufferId:o.id,chartKind:$t.has(l)?l:"line"};a.max!==void 0&&a.max!==null&&(d.max=M(a.max,0)),a.min!==void 0&&a.min!==null&&(d.min=M(a.min,0)),s.sources=[d],a.height===void 0&&(s.height=32),delete a.chartKind,delete a.dataLen,delete a.sample,delete a.max,delete a.min}return e}function hn(i,e){let t=new Set(e.map(n=>n.id));for(let n of i)for(let r of n.items){if(r.kind!=="chart")continue;let s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(a=>t.has(a.bufferId)).map(a=>({bufferId:a.bufferId,chartKind:$t.has(a.chartKind)?a.chartKind:"line",min:a.min,max:a.max})),typeof s.height!="number"&&(s.height=32)}}function We(i){return JSON.stringify(i,null,2)}var bn={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function G(i,e="anon"){let t=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}var Ve=/^[A-Za-z_][A-Za-z0-9_]*$/,yt=new Set(["auto","break","case","char","const","continue","default","do","double","else","enum","extern","float","for","goto","if","inline","int","long","register","restrict","return","short","signed","sizeof","static","struct","switch","typedef","union","unsigned","void","volatile","while","_Bool","_Complex","_Imaginary"]);function Xe(i){return Ve.test(i)&&!yt.has(i)}function be(i,e,t,n){let r=i;if(yt.has(r)&&(r=`${r}_`,t.push(`${n} "${i}" \u662F C \u5173\u952E\u5B57\uFF0C\u751F\u6210\u540D\u6539\u4E3A "${r}"`)),!e.has(r))return e.add(r),r;let s=2;for(;e.has(`${r}_${s}`);)s++;let a=`${r}_${s}`;return t.push(`${n} "${i}" \u4E0E\u5176\u4ED6\u751F\u6210\u7B26\u53F7\u51B2\u7A81\uFF08\u9875\u9762\u51FD\u6570/\u53D8\u91CF/\u7F13\u51B2\u533A/\u5B57\u4F53\u6570\u7EC4\uFF09\uFF0C\u5DF2\u6539\u4E3A "${a}"`),e.add(a),a}function ve(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function ie(i){if(!Number.isFinite(i))return"0.0f";let e=i.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function vn(i,e,t){return t==="ramp"?`${i}[i] = (float)i;`:t==="noise"?`${i}[i] = (float)((i * 37) % ${e});`:`${i}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function xn(i){let e=new Map;if(!i)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,n;for(;(n=t.exec(i))!==null;)e.set(n[1],n[2]);return e}function Z(i,e,t){let n=e.has(i)?e.get(i):"";return`${t}/* USER CODE BEGIN ${i} */${n}${t}/* USER CODE END ${i} */`}var $n=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function It(i,e,t){let n=[],r=xn(e?.c??""),s=new Set;t&&s.add("menu_font");let a=[];i.pages.forEach((p,I)=>{let h=`page_${I}`;p.fnName&&(Ve.test(p.fnName)?h=p.fnName:n.push(`\u9875\u9762 "${p.name}" \u7684\u51FD\u6570\u540D "${p.fnName}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u56DE\u9000\u4E3A page_${I}`)),a.push(be(h,s,n,`\u9875\u9762 "${p.name}" \u7684\u51FD\u6570\u540D`))});let o=new Map,u=new Map;for(let p of i.variables??[]){if(!p.name){n.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}Ve.test(p.name)||n.push(`\u53D8\u91CF\u540D "${p.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${G(p.name)}"`);let I=G(p.name,"var");if(o.has(I)){n.push(`\u53D8\u91CF\u540D "${p.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}let h=be(I,s,n,`\u53D8\u91CF\u540D "${I}"`),k=p.type==="float"||p.type==="double",A={name:h,srcType:p.type,type:bn[p.type],init:k?ie(p.initialValue):String(Math.trunc(p.initialValue)),isFloat:k,step:p.step,min:p.min,max:p.max};o.set(h,A),u.set(p.id,A)}let l=new Map,d=new Set,c=[],m=new Map,$=new Set;(i.chartBuffers??[]).forEach((p,I)=>{if(!p.name){n.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");return}Ve.test(p.name)||n.push(`\u7F13\u51B2\u533A\u540D "${p.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${G(p.name)}"`);let h=G(p.name,"buf");if($.has(h)){n.push(`\u7F13\u51B2\u533A\u540D "${p.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);return}$.add(h);let k=be(h,s,n,`\u7F13\u51B2\u533A\u540D "${h}"`),A=Math.max(2,Math.trunc(p.dataLen)),L=`${k.toUpperCase()}_LEN`;m.set(p.id,{name:k,lenMacro:L,len:A});let j=`fill_${k}`;if(!(r.get(j)??"").trim()){let T=r.get(`chart${I}_fill`);T&&T.trim()&&(r.set(j,T),n.push(`\u5DF2\u5C06\u65E7\u7248 chart${I}_fill \u624B\u5199\u5185\u5BB9\u8FC1\u79FB\u81F3 ${j}\uFF08\u540E\u7EED\u8BF7\u76F4\u63A5\u5728\u8BE5\u533A\u5185\u7EF4\u62A4\uFF09`))}let W=(r.get(j)??"").trim()!=="";c.push(`#define ${L} ${A}`,`static float ${k}[${L}];`,`static uint8_t ${k}_filled = 0;`,`static void ${k}_fill(void)`,"{",Z(j,r,"    "),...p.sample!=="none"&&!W?[`    for (uint16_t i = 0; i < ${L}; ++i) { ${vn(k,A,p.sample)} }`]:[],"}")});let v=[],y=new Map,g=new Map,f=new Map;{let p=0,I=0,h=k=>{let A=m.get(k);return A?(f.has(k)||f.set(k,`        if (!${A.name}_filled) { ${A.name}_filled = 1; ${A.name}_fill(); }`),f.get(k)):""};for(let k of i.pages)for(let A of k.items){if(A.kind!=="chart")continue;let L=A.sources.filter(T=>m.has(T.bufferId));if(A.sources.length&&!L.length){n.push(`\u9875\u9762 ${k.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!L.length){n.push(`\u9875\u9762 ${k.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let j=Math.max(4,Math.trunc(A.height)),W=[];for(let T of L){let H=m.get(T.bufferId),_=`chart${p++}`;v.push(`static float ${_}_dis[${H.lenMacro}];`,`static u8g2_chart_t ${_};`),W.push({name:_,s:T,b:H})}if(W.length===1){let{name:T,s:H,b:_}=W[0];v.push(`static uint8_t ${T}_inited = 0;`),y.set(A.id,[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`,`        u8g2_chart_init(&${T}, ${_.name}, ${T}_dis, ${_.lenMacro});`,h(H.bufferId),"    }"]);let E=H.chartKind==="point"?"Point":H.chartKind==="bar"?"Bar":"Line",Ae=H.min!==void 0&&H.max!==void 0?`${ie(H.max)}, ${ie(H.min)}`:"0, 0";g.set(A.id,`    u8g2_MenuDrawItem${E}Chart(&${T}, ${j}, ${Ae});`)}else{let T=`chart_layers_${I++}`;v.push(`static u8g2_menu_drawChart_t ${T}[${W.length}];`,`static uint8_t ${T}_inited = 0;`);let H=[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`];W.forEach(({name:_,s:E,b:Ae},Te)=>{H.push(`        u8g2_chart_init(&${_}, ${Ae.name}, ${_}_dis, ${Ae.lenMacro});`),H.push(h(E.bufferId));let Yt=E.chartKind==="point"?"u8g2_drawPointChart":E.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",dt=E.min!==void 0&&E.max!==void 0?`${ie(E.max)}, ${ie(E.min)}`:"0, 0";H.push(`        ${T}[${Te}].drawChart = ${Yt};`),H.push(`        ${T}[${Te}].chart = &${_};`),H.push(`        ${T}[${Te}].max = ${dt.split(", ")[0]};`),H.push(`        ${T}[${Te}].min = ${dt.split(", ")[1]};`)}),H.push("    }"),y.set(A.id,H),g.set(A.id,`    u8g2_MenuDrawItemChart(${T}, ${W.length}, ${j});`)}}}let R=[],V=[],F=[],q=new Set,te=new Map,K=0;for(let p of i.pages)for(let I of p.items){if(I.bind.type==="button"){let h=G(I.bind.cbName,"btn_cb");l.has(h)||l.set(h,I.bind.buttonId)}switch(I.kind){case"board":d.add(G(I.cbName,"board_cb"));break;case"xbm":{let h=G(I.name,"icon");for(;q.has(h);)h=`${h}_2`;q.add(h),te.set(I.id,h);let k=I.bits.length,A=I.bits.map(L=>`0x${(L&255).toString(16).padStart(2,"0")}`).join(", ");R.push(`static const uint8_t menu_xbm_${h}[${k}] = { ${A} };`);break}case"textarea":{let h=K++;V.push(`static char ta${h}_text[] = "${ve(I.content)}";`,`static u8g2_menu_textArea_t ta${h};`,`static uint8_t ta${h}_inited = 0;`),F.push(`    if (!ta${h}_inited) {`,`        ta${h}_inited = 1;`,`        u8g2_textArea_init(&ta${h}, ta${h}_text);`,`        u8g2_textArea_setLineSpacing(&ta${h}, ${Math.max(0,Math.trunc(I.lineSpacing))});`,"    }");break}default:break}}let C=new Map,w=new Map;for(let p of l.keys())C.set(p,be(p,s,n,`\u6309\u94AE\u56DE\u8C03\u540D "${p}"`));for(let p of d)w.set(p,be(p,s,n,`\u81EA\u7ED8\u677F\u56DE\u8C03\u540D "${p}"`));let N=(p,I)=>{if(!p)return"";let h=`"${ve(p)}"`;return I===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${h});`:`u8g2_MenuUTF8Printf(${h});`},D=(p,I,h)=>{let k=`"${ve(p)}"`;return I===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${k}, ${h});`:`u8g2_MenuUTF8Printf(${k}, ${h});`},ne=0,Ee=(p,I)=>{let h=[],k=`${I.name}`,A=_=>{if(!_)return null;let E=u.get(_);return E||n.push(`\u9875\u9762 ${k} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),E??null},L=p.bind,j=null,W=null,T="on",H="off";switch(L.type){case"value":{let _=A(L.varId);if(_){j=_;let E=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${ie(_.step)}, ${ie(_.min)}, ${ie(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;h.push(`    ${E}`)}break}case"switch":{let _=A(L.varId);_&&_.srcType!=="uint8"?n.push(`\u5F00\u5173\u9644\u52A0\u503C\u7ED1\u5B9A\u7684\u53D8\u91CF "${_.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${_.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`):_&&(W=_,T=L.onText,H=L.offText,h.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(L.openValue)});`));break}case"button":{let _=G(L.cbName,"btn_cb"),E=C.get(_)??_;h.push(`    u8g2_MenuItem_button(${E}, ${Math.trunc(L.buttonId)});`);break}case"submenu":{let _=i.pages.findIndex(E=>E.id===L.targetPageId);!L.targetPageId||_<0?n.push(`\u9875\u9762 ${k} \u7684\u6761\u76EE "${p.label||"\u672A\u547D\u540D"}" \u9644\u52A0\u503C\u76EE\u6807\u9875\u9762\u65E0\u6548\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`):h.push(`    u8g2_MenuItem_menu_enter(${a[_]});`);break}case"back":h.push("    u8g2_MenuItem_menu_back();");break;default:break}switch(p.kind){case"text":{if(j)h.push(`    ${D(p.text,p.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(p.text)||n.push(`\u9875\u9762 ${k} \u7684\u6570\u503C\u9644\u52A0\u503C\u6761\u76EE\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(W)h.push(`    ${D(p.text,p.scale,`${W.name} ? "${ve(T)}" : "${ve(H)}"`)}`),/%[-+ #0]*s/.test(p.text)||n.push("\u5F00\u5173\u9644\u52A0\u503C\u6761\u76EE\u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off");else if(L.type==="none"&&p.displayVarId){let _=A(p.displayVarId);if(_)h.push(`    ${D(p.text,p.scale,_.name)}`),/%[-+ #0]*[a-zA-Z]/.test(p.text)||n.push(`\u9875\u9762 ${k} \u7684\u663E\u793A\u6761\u76EE\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else{n.push(`\u9875\u9762 ${k} \u7684\u663E\u793A\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let E=N(p.text,p.scale);E&&h.push(`    ${E}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(p.text)){n.push(`\u9875\u9762 ${k} \u7684\u6587\u672C\u6761\u76EE\u542B\u5360\u4F4D\u7B26\u4F46\u672A\u7ED1\u5B9A\u53D8\u91CF/\u663E\u793A\u53D8\u91CF\uFF0C\u5360\u4F4D\u7B26\u5DF2\u79FB\u9664`);let _=N(p.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),p.scale);_&&h.push(`    ${_}`)}else{let _=N(p.text,p.scale);_&&h.push(`    ${_}`)}break}case"slider":case"progress":{let _=p.kind==="slider"?"Slider":"ProgressBar";if(j){if(!$n.has(j.srcType)){n.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u9644\u52A0\u503C\u7684\u53D8\u91CF "${j.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${j.srcType}\uFF09\uFF0C\u5DF2\u6309\u9759\u6001\u663E\u793A\u751F\u6210`),h.push(`    u8g2_MenuDrawItem${_}(${(p.position/100).toFixed(2)}f);`);break}h.push(`    u8g2_MenuDrawItem${_}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{let E=Math.min(100,Math.max(0,p.position));h.push(`    u8g2_MenuDrawItem${_}(${(E/100).toFixed(2)}f);`)}break}case"chart":{let _=y.get(p.id),E=g.get(p.id);if(!_||!E)break;h.push(..._),h.push(E);break}case"xbm":h.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(p.w)}, ${Math.trunc(p.h)}, menu_xbm_${te.get(p.id)??G(p.name,"icon")});`);break;case"textarea":{let _=ne++;h.push(...F[_].split(`
`));let E=p.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";h.push(`    ${E}(&ta${_}, ${Math.max(10,Math.trunc(p.height))});`);break}case"board":{let _=G(p.cbName,"board_cb"),E=w.get(_)??_;h.push(`    u8g2_MenuDrawItemBoard(${E}, ${Math.max(1,Math.trunc(p.w))}, ${Math.max(1,Math.trunc(p.h))});`);break}}return h},x=[];x.push("/**"),x.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${i.name}`),x.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),x.push(" *"),x.push(" * main.c \u91CC\u4F7F\u7528\u4EE5\u4E0B\u7B26\u53F7\u65F6\uFF0C\u76F4\u63A5 extern\uFF08\u6216\u590D\u5236\u4E0B\u9762\u58F0\u660E\uFF09\uFF1A"),x.push(` *   u8g2_SetFont(&u8g2, ${t?"menu_font":i.font});`),a.forEach((p,I)=>x.push(` *   void ${p}(void);   /* \u9875\u9762: ${i.pages[I].name} */`));for(let p of o.values())x.push(` *   extern ${p.type} ${p.name};`);for(let p of C.values())x.push(` *   void ${p}(u8g2_menu_t *menu, uint8_t ID);`);for(let p of w.values())x.push(` *   void ${p}(u8g2_t *u8g2);`);x.push(" */"),x.push('#include "u8g2_menu.h"'),(i.chartBuffers??[]).some(p=>p.sample==="sine")&&x.push("#include <math.h>"),x.push(""),x.push(Z("includes",r,"")),x.push(""),a.forEach(p=>x.push(`void ${p}(void);`)),x.push(""),x.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),x.push(Z("variables",r,""));for(let p of o.values())x.push(`${p.type} ${p.name} = ${p.init};`);if(x.push(""),t){x.push("/* ======================== \u5B57\u4F53\uFF08\u73B0\u573A\u53D6\u6A21\uFF09 ======================== */"),x.push("/* \u4EC5\u5305\u542B\u5DE5\u7A0B\u6587\u672C\u7528\u5230\u7684\u5B57\u5F62\uFF08\u542B ASCII 95 \u4E2A + \u989D\u5916\u5B57\u7B26\uFF09\uFF0C"),x.push(" * main.c \u91CC u8g2_SetFont(&u8g2, menu_font) \u5373\u53EF\u4F7F\u7528\uFF1B"),x.push(' * \u82E5\u8FD0\u884C\u65F6\u8F93\u51FA\u8D85\u51FA\u6B64\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u7F16\u8F91\u5668"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u8865\u5145\u540E\u91CD\u65B0\u751F\u6210\u3002 */');let p=[];for(let I=0;I<t.length;I+=16)p.push("  "+[...t.slice(I,I+16)].map(h=>`0x${h.toString(16).padStart(2,"0")}`).join(", ")+",");x.push(`const uint8_t menu_font[${t.length}] U8G2_FONT_SECTION("menu_font") = {`),x.push(...p),x.push("};"),x.push("")}if((c.length||v.length||V.length||R.length)&&(x.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),x.push(...c,...v,...V,...R),x.push("")),l.size||d.size){x.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),x.push(Z("callbacks",r,""));for(let[p]of l){let I=C.get(p);x.push(`void ${I}(u8g2_menu_t *menu, uint8_t ID)`),x.push("{"),x.push(Z(`cb_${I}`,r,"    ")),x.push("}"),x.push("")}for(let p of d){let I=w.get(p);x.push(`void ${I}(u8g2_t *u8g2)`),x.push("{"),x.push(Z(`cb_${I}`,r,"    ")),x.push("}"),x.push("")}}let J=(i.weakHooks??[]).map(p=>Q.find(I=>I.fn===p)).filter(p=>!!p);if(J.length||r.has("weak")||Q.some(p=>(r.get(`weak_${p.fn}`)??"").trim())){x.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),x.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),x.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let I=Q.filter(h=>!i.weakHooks?.includes(h.fn)&&(r.get(`weak_${h.fn}`)??"").trim()).map(h=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${h.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${h.decl}`,"{",Z(`weak_${h.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);x.push(I?`${Z("weak",r,"").replace(/\n$/,"")}
${I}
`:Z("weak",r,"")),x.push("");for(let h of J){x.push(`/* ${h.label}: ${h.desc} */`),x.push(`${h.decl}`),x.push("{"),x.push(Z(`weak_${h.fn}`,r,"    "));let k=h.bodyArgs.split(`
`).map(A=>`    ${A}`);h.retNote&&k.push(`    ${h.retNote}`),x.push(...k),x.push("}"),x.push("")}}return x.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),x.push(""),i.pages.forEach((p,I)=>{x.push(`/* \u9875\u9762: ${p.name} */`),x.push(`void ${a[I]}(void)`),x.push("{"),x.push(Z(`page_${a[I]}_pre`,r,"    "));for(let h of p.items)x.push(...Ee(h,p));x.push("}"),x.push("")}),{c:`${x.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:n}}function _n(i){return{raw:i.slice(0,23),glyphCnt:i[0],startUpperA:i[17]<<8|i[18],startLowerA:i[19]<<8|i[20],startUnicode:i[21]<<8|i[22]}}function Ne(i,e,t){let n=[],r=[],s=[],a=[...e].sort((v,y)=>v-y);for(let v of a){let y=t(v);if(!y||!y.length){s.push(v);continue}v<=255?n.push({encoding:v,entry:y}):r.push({encoding:v,entry:y})}if(!n.length&&!r.length)return null;let o=n.length+r.length,u=0;for(let v of n)u+=v.entry.length;u+=2;let l=4;for(let v of r)l+=v.entry.length;l+=2;let d=_n(i),c=new Uint8Array(23+u+l);c.set(d.raw,0),c[0]=o,c[17]=0,c[18]=0,c[19]=0,c[20]=0,c[21]=0,c[22]=0;let m=23;for(let v of n){if(v.encoding===65){let y=m-23;c[17]=y>>8&255,c[18]=y&255}if(v.encoding===97){let y=m-23;c[19]=y>>8&255,c[20]=y&255}c.set(v.entry,m),m+=v.entry.length}c[m]=0,c[m+1]=0,m+=2;let $=m-23;c[21]=$>>8&255,c[22]=$&255,c[m]=0,c[m+1]=4,c[m+2]=255,c[m+3]=255,m+=4;for(let v of r)c.set(v.entry,m),m+=v.entry.length;return c[m]=0,c[m+1]=0,{font:c,included:o,missing:s}}function wt(i){return[...i].map(e=>e.codePointAt(0)).filter(e=>Number.isFinite(e))}function St(){let i=[];for(let e=32;e<=126;e++)i.push(e);return i}function pe(i,e){let t=new Set(St()),n=r=>{for(let s of wt(r))t.add(s)};for(let r of i.pages)for(let s of r.items)s.kind==="text"&&n(s.text),s.kind==="textarea"&&n(s.content),s.bind.type==="switch"&&(n(s.bind.onText),n(s.bind.offText));return n(e),t.delete(10),t.delete(13),t}function Be(i){let e=0,t=0;for(let n of i)n<=126?e++:t++;return{total:i.size,ascii:e,cjk:t}}var He=(o=>(o[o.None=0]="None",o[o.Up=1]="Up",o[o.Down=2]="Down",o[o.Enter=3]="Enter",o[o.Return=4]="Return",o[o.Add=5]="Add",o[o.Sub=6]="Sub",o))(He||{}),kt=64;var yn=128*64/8;function In(i){return new Promise((e,t)=>{let n=document.createElement("script");n.src=i,n.onload=()=>e(),n.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${i}`)),document.head.appendChild(n)})}var Le=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.fontSig=null;this.lastKnownPage=0;this.fontApplyWarning=null;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await In(e);let n=t.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await n({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let r=this.mod._em_font_count_export();for(let s=0;s<r;s++){let a=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(a),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(t=>`${t.name}|${t.dataLen}|${t.sample}`),pages:e.pages.map(t=>({n:t.items.length,k:t.items.map(n=>n.kind).join(","),res:t.items.map(n=>n.kind==="chart"?(n.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")}))})}sync(e){let t=this.mod;if(!t)return;let n=this.signature(e);n!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);let r=d=>Math.trunc(Number.isFinite(d)?d:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},a={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},l=d=>d?(e.variables??[]).findIndex(c=>c.id===d):-1;if((e.variables??[]).forEach((d,c)=>{t.ccall("em_var_define",null,["number","number","number","number","number","number"],[c,s[d.type],r(d.initialValue),r(d.step),r(d.min),r(d.max)])}),(e.chartBuffers??[]).forEach((d,c)=>{t.ccall("em_buf_define",null,["number","number","number"],[c,r(d.dataLen),u[d.sample]])}),e.pages.forEach((d,c)=>{t.ccall("em_page_begin",null,["number"],[c]),d.items.forEach((m,$)=>{let v=()=>{let y=m.bind;if(y.type==="none")return;let g=y.type==="value"||y.type==="switch",f=g?(e.variables??[]).find(R=>R.id===y.varId):void 0;t.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[c,$,o[y.type],g&&f?s[f.type]:0,y.type==="switch"?r(y.openValue):0,y.type==="button"?r(y.buttonId):0,y.type==="submenu"?e.pages.findIndex(R=>R.id===y.targetPageId):-1,g&&f?l(f.id):-1])};switch(m.kind){case"text":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,a.text,m.scale,0,0,0,m.displayVarId?l(m.displayVarId):-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[c,$,m.text]),v();break;case"slider":case"progress":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,a[m.kind],1,0,0,0,-1,-1]),v();break;case"chart":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,a.chart,1,r(m.height),0,0,-1,-1]);for(let y of m.sources??[])t.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[c,$,(e.chartBuffers??[]).findIndex(g=>g.id===y.bufferId),{line:0,point:1,bar:2}[y.chartKind],y.min!==void 0&&y.max!==void 0?1:0,y.max??0,y.min??0]);v();break;case"xbm":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,a.xbm,1,0,r(m.w),r(m.h),-1,-1]);{let y=t._em_scratch(m.bits.length);y&&(t.HEAPU8.set(new Uint8Array(m.bits),y),t._em_item_bits(c,$,y,m.bits.length))}v();break;case"textarea":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,a.textarea,1,r(m.height),0,0,-1,-1]),t.ccall("em_item_text",null,["number","number","string"],[c,$,m.content]),v();break;case"board":t.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,a.board,1,0,r(m.w),r(m.h),-1,-1]),v();break}}),t.ccall("em_page_end",null,["number","number"],[c,d.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],r(e.selectorLeftMargin),r(e.selectorTopMargin),r(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen]),e.fontSubset){let d=pe(e,e.fontExtra),c=e.font+"|"+[...d].sort((m,$)=>m-$).join(",");c!==this.fontSig&&(this.fontSig=c,this.applyFontSubset(this.fontIndex(e.font),d))}else this.fontSig!==null&&(this.fontSig=null,this.fontApplyWarning=null)}applyFontSubset(e,t){this.fontApplyWarning=null;let n=this.getFontBytes(e),r=this.glyphFetcher(e),s=n&&r?Ne(n,t,r):null;if(!s){this.fontApplyWarning="\u73B0\u573A\u53D6\u6A21\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62\uFF0C\u9884\u89C8\u4F7F\u7528\u5185\u7F6E\u5B57\u4F53";return}this.useCustomFont(s.font)||(this.fontApplyWarning=`\u5B50\u96C6\u5B57\u4F53 ${s.font.length} \u5B57\u8282\u8D85\u8FC7\u9884\u89C8\u69FD\u4F4D\u5BB9\u91CF\uFF0C\u9884\u89C8\u5DF2\u56DE\u9000\u5168\u5B57\u5E93\uFF08\u5BFC\u51FA\u7684 menu_font \u6570\u7EC4\u4E0D\u53D7\u5F71\u54CD\uFF09`)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let n=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(n),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let n=t._em_frame(e);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));let r=t.HEAPU8.subarray(n,n+yn),s=this.img.data;s.fill(255);for(let o=0;o<64;o++){let u=(o>>3)*128,l=1<<(o&7),d=o*128*4;for(let c=0;c<128;c++)r[u+c]&l&&(s[d]=17,s[d+1]=24,s[d+2]=39),d+=4}this.ctx.putImageData(this.img,0,0);let a=t._em_get_current_page();a!==this.lastKnownPage&&(this.lastKnownPage=a,this.events.onPageChanged?.(a))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getFontBytes(e){let t=this.mod;if(!t)return null;let n=t.ccall("em_font_data","number",["number"],[e]),r=t.ccall("em_font_data_len","number",["number"],[e]);return!n||!r?null:t.HEAPU8.slice(n,n+r)}glyphFetcher(e){let t=this.mod;return t?n=>{let r=t.ccall("em_scratch","number",["number"],[64]),s=t.ccall("em_font_glyph","number",["number","number","number","number"],[e,n,64,r]);return s?t.HEAPU8.slice(r,r+s):null}:null}useCustomFont(e){let t=this.mod;if(!t)return!1;let n=t.ccall("em_custom_font_ptr","number",[],[]),r=t.ccall("em_custom_font_max","number",[],[]);return e.length>r?!1:(t.HEAPU8.set(e,n),t.ccall("em_set_custom_font",null,["number"],[e.length]),!0)}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var tt=globalThis,Et=i=>i,Re=tt.trustedTypes,At=Re?Re.createPolicy("lit-html",{createHTML:i=>i}):void 0,Nt="$lit$",ae=`lit$${Math.random().toFixed(9).slice(2)}$`,Bt="?"+ae,wn=`<${Bt}>`,ue=document,$e=()=>ue.createComment(""),_e=i=>i===null||typeof i!="object"&&typeof i!="function",nt=Array.isArray,Sn=i=>nt(i)||typeof i?.[Symbol.iterator]=="function",Ye=`[ 	
\f\r]`,xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Mt=/>/g,se=RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,Pt=/"/g,Lt=/^(?:script|style|textarea|title)$/i,rt=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),b=rt(1),or=rt(2),ur=rt(3),ye=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Vt=new WeakMap,oe=ue.createTreeWalker(ue,129);function Ht(i,e){if(!nt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return At!==void 0?At.createHTML(e):e}var kn=(i,e)=>{let t=i.length-1,n=[],r,s=e===2?"<svg>":e===3?"<math>":"",a=xe;for(let o=0;o<t;o++){let u=i[o],l,d,c=-1,m=0;for(;m<u.length&&(a.lastIndex=m,d=a.exec(u),d!==null);)m=a.lastIndex,a===xe?d[1]==="!--"?a=Tt:d[1]!==void 0?a=Mt:d[2]!==void 0?(Lt.test(d[2])&&(r=RegExp("</"+d[2],"g")),a=se):d[3]!==void 0&&(a=se):a===se?d[0]===">"?(a=r??xe,c=-1):d[1]===void 0?c=-2:(c=a.lastIndex-d[2].length,l=d[1],a=d[3]===void 0?se:d[3]==='"'?Pt:Ct):a===Pt||a===Ct?a=se:a===Tt||a===Mt?a=xe:(a=se,r=void 0);let $=a===se&&i[o+1].startsWith("/>")?" ":"";s+=a===xe?u+wn:c>=0?(n.push(l),u.slice(0,c)+Nt+u.slice(c)+ae+$):u+ae+(c===-2?o:$)}return[Ht(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Ie=class i{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let s=0,a=0,o=e.length-1,u=this.parts,[l,d]=kn(e,t);if(this.el=i.createElement(l,n),oe.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=oe.nextNode())!==null&&u.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(Nt)){let m=d[a++],$=r.getAttribute(c).split(ae),v=/([.?@])?(.*)/.exec(m);u.push({type:1,index:s,name:v[2],strings:$,ctor:v[1]==="."?Ge:v[1]==="?"?Je:v[1]==="@"?Qe:ge}),r.removeAttribute(c)}else c.startsWith(ae)&&(u.push({type:6,index:s}),r.removeAttribute(c));if(Lt.test(r.tagName)){let c=r.textContent.split(ae),m=c.length-1;if(m>0){r.textContent=Re?Re.emptyScript:"";for(let $=0;$<m;$++)r.append(c[$],$e()),oe.nextNode(),u.push({type:2,index:++s});r.append(c[m],$e())}}}else if(r.nodeType===8)if(r.data===Bt)u.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(ae,c+1))!==-1;)u.push({type:7,index:s}),c+=ae.length-1}s++}}static createElement(e,t){let n=ue.createElement("template");return n.innerHTML=e,n}};function fe(i,e,t=i,n){if(e===ye)return e;let r=n!==void 0?t._$Co?.[n]:t._$Cl,s=_e(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,n)),n!==void 0?(t._$Co??=[])[n]=r:t._$Cl=r),r!==void 0&&(e=fe(i,r._$AS(i,e.values),r,n)),e}var Ze=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??ue).importNode(t,!0);oe.currentNode=r;let s=oe.nextNode(),a=0,o=0,u=n[0];for(;u!==void 0;){if(a===u.index){let l;u.type===2?l=new we(s,s.nextSibling,this,e):u.type===1?l=new u.ctor(s,u.name,u.strings,this,e):u.type===6&&(l=new et(s,this,e)),this._$AV.push(l),u=n[++o]}a!==u?.index&&(s=oe.nextNode(),a++)}return oe.currentNode=ue,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},we=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=fe(this,e,t),_e(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==ye&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Sn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&_e(this._$AH)?this._$AA.nextSibling.data=e:this.T(ue.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ie.createElement(Ht(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new Ze(r,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(e){let t=Vt.get(e.strings);return t===void 0&&Vt.set(e.strings,t=new Ie(e)),t}k(e){nt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,r=0;for(let s of e)r===t.length?t.push(n=new i(this.O($e()),this.O($e()),this,this.options)):n=t[r],n._$AI(s),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=Et(e).nextSibling;Et(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ge=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,s){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=S}_$AI(e,t=this,n,r){let s=this.strings,a=!1;if(s===void 0)e=fe(this,e,t,0),a=!_e(e)||e!==this._$AH&&e!==ye,a&&(this._$AH=e);else{let o=e,u,l;for(e=s[0],u=0;u<s.length-1;u++)l=fe(this,o[n+u],t,u),l===ye&&(l=this._$AH[u]),a||=!_e(l)||l!==this._$AH[u],l===S?e=S:e!==S&&(e+=(l??"")+s[u+1]),this._$AH[u]=l}a&&!r&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ge=class extends ge{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}},Je=class extends ge{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}},Qe=class extends ge{constructor(e,t,n,r,s){super(e,t,n,r,s),this.type=5}_$AI(e,t=this){if((e=fe(this,e,t,0)??S)===ye)return;let n=this._$AH,r=e===S&&n!==S||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==S&&(n===S||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},et=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){fe(this,e)}};var En=tt.litHtmlPolyfillSupport;En?.(Ie,we),(tt.litHtmlVersions??=[]).push("3.3.3");var z=(i,e,t)=>{let n=t?.renderBefore??e,r=n._$litPart$;if(r===void 0){let s=t?.renderBefore??null;n._$litPart$=r=new we(e.insertBefore($e(),s),s,void 0,t??{})}return r._$AI(i),r};var An=Object.keys(de);function Tn(i,e,t,n){let r=i.getState(),s=t.label||"text"in t&&t.text||de[t.kind],a=t.bind.type!=="none"?` \xB7 ${ce[t.bind.type]}`:"",o=u=>l=>{l.stopPropagation(),i.getState().moveItem(e.id,t.id,u)};return b`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>i.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${vt[t.kind]}</span>
    <span class="ume-item-name" title=${s+a}>${s}${a}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function Mn(i,e){let t=i.getState();return b`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{let r=n.target.value;r&&t.addItem(r,e.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${An.map(n=>b`<option value=${n}>${de[n]}</option>`)}
  </select>`}function Rt(i,e){let{project:t,selection:n}=e.getState(),r=s=>{let a=e.getState(),o=n.pageId===s.id;return b`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),a.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&a.removePage(s.id)}}>✕</button>
      </div>
      ${o?b`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>Tn(e,s,u,n.itemId===u.id)):b`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Mn(e,s)}</div>
      </div>`:S}
    </div>`};z(b`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Cn(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(r)}
  `,i)}function Cn(i){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${i.getState().project.pages.length+1}`);e!==null&&i.getState().addPage(e||void 0)}function O(i,e,t,n=""){return b`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${e??""} placeholder=${n}
      @change=${r=>t(r.target.value)} />
  </div>`}function P(i,e,t,n=1){return b`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(e)} step=${String(n)}
      @change=${r=>{let s=parseFloat(r.target.value);t(Number.isFinite(s)?s:0)}} />
  </div>`}function Y(i,e,t,n){return b`<div class="ume-field">
    <label>${i}</label>
    <select @change=${r=>n(r.target.value)}>
      ${t.map(r=>b`<option value=${r.value} ?selected=${r.value===e}>${r.label}</option>`)}
    </select>
  </div>`}function Se(i,e,t){return b`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${n=>t(n.target.checked)} />
    <span>${i}</span>
  </div>`}function Kt(i,e,t,n=!1){return b`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${r=>t(r.target.value)}>${e??""}</textarea>
  </div>`}function ke(i,e,t="text/plain"){let n=new Blob([e],{type:`${t};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=i,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}var it=null,jt={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function at(i,e,t,n){let r=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...t.map(a=>({value:a.id,label:`${a.name} : ${jt[a.type]??a.type}`}))],s=e?t.some(a=>a.id===e):!1;return b`
    ${Y(i,e??"",r,a=>n(a||null))}
    ${e&&!s?b`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:S}
    ${t.length===0?b`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:S}
  `}function st(i,e){return b`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let t=i.getState().addVariable();e(t)}}>＋ 新建变量并绑定</button>
  </div>`}function ot(i){return i?b`<div class="ume-hint">
    ${i.name} : ${jt[i.type]??i.type}，范围 ${i.min}~${i.max}，步长 ${i.step}，初值 ${i.initialValue}
    （在「资源」页修改变量）
  </div>`:b`${S}`}function Dt(i,e,t){let{project:n,selection:r}=e.getState(),s=n.pages.find($=>$.id===r.pageId)??null,a=s?.items.find($=>$.id===r.itemId)??null,o=n.variables??[],u=n.chartBuffers??[],l=($,v)=>e.getState().updateItem(s.id,a.id,$,v),d=$=>l({bind:$}),c=b`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,m="";if(s&&!a)m="\u9875\u9762\u5C5E\u6027",c=b`
      ${O("\u540D\u79F0",s.name,$=>e.getState().updatePage(s.id,{name:$}))}
      ${O("C \u51FD\u6570\u540D",s.fnName,$=>e.getState().updatePage(s.id,{fnName:$}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&a){(a.bind.type==="value"||a.bind.type==="switch")&&a.bind.varId&&(it=a.bind.varId),m=`${de[a.kind]}${a.bind.type!=="none"?` + ${ce[a.bind.type]}`:""}`;let $=b``;switch(a.kind){case"text":{let g=a,f=o.find(R=>R.id===g.displayVarId);$=b`
          ${O("\u6587\u672C/\u683C\u5F0F",g.text,R=>l({text:R},`text-${g.id}`))}
          ${Y("\u5927\u5C0F",String(g.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],R=>l({scale:Number(R)}))}
          ${a.bind.type==="none"?b`
            ${at("\u663E\u793A\u53D8\u91CF",g.displayVarId,o,R=>l({displayVarId:R}))}
            ${f?S:st(e,R=>l({displayVarId:R.id}))}
            ${ot(f)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:S}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{let g=a;$=b`
          ${a.bind.type==="none"?b`
            ${P("\u9759\u6001\u4F4D\u7F6E(%)",g.position,f=>l({position:Math.min(100,Math.max(0,Math.trunc(f)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:S}
        `;break}case"chart":{let g=a,f=V=>l({sources:V}),R=(V,F)=>{let q=u.find(K=>K.id===V.bufferId),te=V.min===void 0||V.max===void 0;return b`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${q?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[V.chartKind]??V.chartKind}${te?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${V.min}~${V.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>f(g.sources.filter((K,C)=>C!==F))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${Y("\u7F13\u51B2\u533A",V.bufferId,u.map(K=>({value:K.id,label:`${K.name} (${K.dataLen}\u70B9)`})),K=>f(g.sources.map((C,w)=>w===F?{...C,bufferId:K}:C)))}
              ${Y("\u7ED8\u5236",V.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],K=>f(g.sources.map((C,w)=>w===F?{...C,chartKind:K}:C)))}
              ${Se("\u81EA\u52A8\u91CF\u7A0B",te,K=>f(g.sources.map((C,w)=>w===F?{...C,min:K?void 0:0,max:K?void 0:100}:C)))}
              ${te?S:b`
                ${P("\u91CF\u7A0B\u4E0A\u9650",V.max??100,K=>f(g.sources.map((C,w)=>w===F?{...C,max:K}:C)),"any")}
                ${P("\u91CF\u7A0B\u4E0B\u9650",V.min??0,K=>f(g.sources.map((C,w)=>w===F?{...C,min:K}:C)),"any")}`}
            </div>
          </div>`};$=b`
          ${P("\u9AD8\u5EA6(px)",g.height,V=>l({height:Math.max(4,Math.trunc(V))}))}
          <div class="ume-field wide"><label>数据源</label>
            <div style="flex:1">
              ${(g.sources??[]).map(R)}
              ${(g.sources??[]).length===0?b`<div class="ume-hint">尚未绑定数据源——点下方按钮创建并绑定</div>`:S}
              <button class="ume-btn sm" style="margin-top:4px" ?disabled=${(g.sources??[]).length>=4}
                @click=${()=>{if(!u.length){let V=e.getState().addChartBuffer();f([...g.sources??[],{bufferId:V.id,chartKind:"line"}]);return}f([...g.sources??[],{bufferId:u[0].id,chartKind:"line"}])}}>＋ 添加数据源${(g.sources??[]).length>0?"\uFF08\u53E0\u52A0\uFF09":""}</button>
              ${u.length?S:b`<div class="ume-hint">将自动新建数据源缓冲区（在「资源」页可改点名/点数/示例）</div>`}
            </div>
          </div>
          <div class="ume-hint">多个数据源在同一区域叠加绘制（最多 4 个）；示例/真实数据在生成的 buf_xxx_fill 里填充</div>
        `;break}case"xbm":{let g=a;$=b`
          ${O("\u6570\u7EC4\u540D",g.name,f=>l({name:f}))}
          ${P("\u5BBD(px)",g.w,f=>l({w:Math.min(128,Math.max(1,Math.trunc(f)))}))}
          ${P("\u9AD8(px)",g.h,f=>l({h:Math.min(64,Math.max(1,Math.trunc(f)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(s.id,g.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${g.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let g=a;$=b`
          ${Kt("\u6587\u672C\u5185\u5BB9",g.content,f=>l({content:f}))}
          ${P("\u9AD8\u5EA6(px)",g.height,f=>l({height:Math.max(10,Math.trunc(f))}))}
          ${P("\u884C\u95F4\u8DDD",g.lineSpacing,f=>l({lineSpacing:Math.max(0,Math.trunc(f))}))}
          ${Se("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",g.bindScroll,f=>l({bindScroll:f}))}
        `;break}case"board":{let g=a;$=b`
          ${P("\u5BBD(px)",g.w,f=>l({w:Math.max(1,Math.trunc(f))}))}
          ${P("\u9AD8(px)",g.h,f=>l({h:Math.max(1,Math.trunc(f))}))}
          ${O("\u56DE\u8C03\u51FD\u6570\u540D",g.cbName,f=>l({cbName:f}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}let v=a.bind,y=b``;switch(v.type){case"none":y=b`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{let g=o.find(f=>f.id===v.varId);y=b`
          ${at("\u53D8\u91CF",v.varId,o,f=>d({type:"value",varId:f}))}
          ${g?S:st(e,f=>d({type:"value",varId:f.id}))}
          ${ot(g)}
          ${a.kind==="text"?b`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:S}
        `;break}case"switch":{let g=o.filter(f=>f.type==="uint8").find(f=>f.id===v.varId)??o.find(f=>f.id===v.varId);y=b`
          ${at("\u53D8\u91CF (uint8)",v.varId,o.filter(f=>f.type==="uint8"),f=>d({type:"switch",varId:f,openValue:v.openValue,onText:v.onText,offText:v.offText}))}
          ${g?S:st(e,f=>d({type:"switch",varId:f.id,openValue:v.openValue,onText:v.onText,offText:v.offText}))}
          ${ot(g)}
          ${P("openValue",v.openValue,f=>d({type:"switch",varId:v.varId,openValue:Math.max(0,Math.trunc(f)),onText:v.onText,offText:v.offText}))}
          ${O('"\u5F00"\u6587\u672C',v.onText,f=>d({type:"switch",varId:v.varId,openValue:v.openValue,onText:f,offText:v.offText}))}
          ${O('"\u5173"\u6587\u672C',v.offText,f=>d({type:"switch",varId:v.varId,openValue:v.openValue,onText:v.onText,offText:f}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":y=b`
          ${O("\u56DE\u8C03\u51FD\u6570\u540D",v.cbName,g=>d({type:"button",cbName:g,buttonId:v.buttonId}))}
          ${P("ID",v.buttonId,g=>d({type:"button",cbName:v.cbName,buttonId:Math.trunc(g)}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":y=b`
          ${Y("\u76EE\u6807\u9875\u9762",v.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...n.pages.filter(g=>g.id!==s.id).map(g=>({value:g.id,label:g.name}))],g=>d({type:"submenu",targetPageId:g||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":y=b`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}c=b`
      <div class="ume-panel-title">绘制</div>
      ${$}
      <div class="ume-panel-title">附加值</div>
      ${Y("\u7C7B\u578B",v.type,Object.keys(ce).map(g=>({value:g,label:ce[g]})),g=>{let f=a.bind;d(g==="value"?{type:"value",varId:f.type==="value"||f.type==="switch"?f.varId:it}:g==="switch"?{type:"switch",varId:f.type==="value"||f.type==="switch"?f.varId:it,openValue:1,onText:"on",offText:"off"}:g==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:g==="submenu"?{type:"submenu",targetPageId:f.type==="submenu"?f.targetPageId:null}:{type:"none"})})}
      ${y}
    `}z(b`
    ${m?b`<div class="ume-panel-title"><span class="ume-kind-badge">${m}</span></div>`:S}
    ${c}
  `,i)}var Ke=null,ut=null,Pn=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function Vn(i,e){let t=e.variables??[],n=s=>{Ke=Ke===s?null:s},r=s=>{let a=Ke===s.id,o=(m,$)=>i.getState().updateVariable(s.id,m,$),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),l=s.name&&!u&&!Xe(s.name),d=t.filter(m=>m.name===s.name).length>1,c=Nn(e,s.id);return b`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${c?` \xB7 ${c} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${m=>{m.stopPropagation();let $=i.getState().removeVariable(s.id);$>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${$} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?b`<div class="ume-var-edit">
        ${O("\u53D8\u91CF\u540D",s.name,m=>o({name:m.trim()},`vn-${s.id}`))}
        ${u?b`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:S}
        ${l?b`<div class="ume-warn">变量名是 C 关键字，生成的代码会自动改名（如 ${s.name}_），建议换个名字</div>`:S}
        ${d?b`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:S}
        ${Y("\u7C7B\u578B",s.type,Pn,m=>o({type:m}))}
        ${P("\u521D\u59CB\u503C",s.initialValue,m=>o({initialValue:m},`vi-${s.id}`),"any")}
        ${P("\u6700\u5C0F\u503C",s.min,m=>o({min:m},`vmin-${s.id}`),"any")}
        ${P("\u6700\u5927\u503C",s.max,m=>o({max:m},`vmax-${s.id}`),"any")}
        ${P("\u6B65\u957F",s.step,m=>o({step:m},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:S}
    </div>`};return b`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{Ke=i.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):b`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function Nn(i,e){let t=0;for(let n of i.pages)for(let r of n.items)"varId"in r&&r.varId===e&&t++;return t}function Bn(i,e){let t=e.chartBuffers??[],n=s=>{let a=0;for(let o of e.pages)for(let u of o.items)u.kind==="chart"&&u.sources.some(l=>l.bufferId===s)&&a++;return a},r=s=>{let a=ut===s.id,o=(c,m)=>i.getState().updateChartBuffer(s.id,c,m),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),l=s.name&&!u&&!Xe(s.name),d=n(s.id);return b`<div class="ume-var-item ${a?"editing":""}">
      <div class="ume-var-row" @click=${()=>{ut=a?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[s.sample]}${d?` \xB7 ${d} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${c=>{c.stopPropagation();let m=i.getState().removeChartBuffer(s.id);m>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${m} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${a?b`<div class="ume-var-edit">
        ${O("\u6570\u7EC4\u540D",s.name,c=>o({name:c.trim()},`bn-${s.id}`))}
        ${u?b`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:S}
        ${l?b`<div class="ume-warn">数组名是 C 关键字，生成的代码会自动改名（如 ${s.name}_），建议换个名字</div>`:S}
        ${P("\u70B9\u6570",s.dataLen,c=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(c)))},`bl-${s.id}`))}
        ${Y("\u793A\u4F8B\u586B\u5145",s.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],c=>o({sample:c}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:S}
    </div>`};return b`
    <div class="ume-panel-title">
      数据源缓冲区 (${t.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{ut=i.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(r):b`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Ut(i,e){let{project:t}=e.getState();z(b`
    ${Vn(e,t)}
    ${Bn(e,t)}
  `,i)}function Ft(i,e){let{project:t}=e.getState(),n=(o,u)=>e.getState().update(l=>{Object.assign(l,o)},u),r=t.weakHooks??[],s=(o,u)=>{e.getState().update(l=>{let d=l.weakHooks??[];l.weakHooks=u?[...new Set([...d,o])]:d.filter(c=>c!==o)})},a=b`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${r.length}/${Q.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${Q.map(o=>b`
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
  `;z(b`
    <div class="ume-panel-title">工程</div>
    ${O("\u5DE5\u7A0B\u540D",t.name,o=>n({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${Y("\u5B57\u4F53",t.font,qe.map(o=>({value:o.id,label:o.label})),o=>n({font:o}))}
    ${Se("\u4E2D\u6587\u73B0\u573A\u53D6\u6A21\uFF08\u4EC5\u5305\u542B\u7528\u5230\u7684\u5B57\u5F62\uFF09",t.fontSubset,o=>n({fontSubset:o}))}
    ${t.fontSubset?b`
      ${O("\u989D\u5916\u5305\u542B\u5B57\u7B26",t.fontExtra,o=>n({fontExtra:o}))}
      ${(()=>{let o=Be(pe(t,t.fontExtra));return b`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:S}
    ${Y("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],o=>n({selector:o}))}
    ${P("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,o=>n({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u9876\u8FB9\u8DDD",t.selectorTopMargin,o=>n({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u884C\u95F4\u8DDD",t.selectorLineSpacing,o=>n({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${P("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,o=>n({marqueeSpeed:o}),.05)}
    ${P("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,o=>n({marqueeHeaderLen:o}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${a}
  `,i)}function Ot(i,e){let t=r=>{let s,a=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),e.key(r),a(),s=window.setInterval(()=>e.key(r),180)},up:a}},n=(r,s,a)=>{let o=t(r);return b`<button class="ume-key" title=${a}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};z(b`
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
  `,i)}var le=null;function qt(i,e){le=e,i.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),Ln(i)}function Ln(i){if(!le)return;let e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",t=>{t.target===e&&zt(e)}),z(b`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>zt(e)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${le.warnings.length?b`
          <div style="margin-bottom:8px">
            ${le.warnings.map(t=>b`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:S}
        <div class="ume-code-view">${le.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(le.c).then(()=>Hn(e,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{ke("menu_pages.c",le.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,e),i.appendChild(e)}function zt(i){i.remove()}function Hn(i,e){let t=i.closest(".ume")??document.body,n=t.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",t.appendChild(n)),n.textContent=e,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function Xt(i,e,t,n){let a=e.getState().project.pages.find(w=>w.id===t)?.items.find(w=>w.id===n);if(!a||a.kind!=="xbm")return;let o=a,u=o.w,l=o.h,d=[...o.bits],c=()=>Math.ceil(u/8),m=document.createElement("div");m.className="ume-modal-mask",m.addEventListener("click",w=>{w.target===m&&C()});let $=(w,N)=>{let D=N*c()+(w>>3);return D<d.length?!!(d[D]>>(w&7)&1):!1},v=(w,N,D)=>{let ne=N*c()+(w>>3);d[ne]=D?d[ne]|1<<(w&7):d[ne]&~(1<<(w&7))},y=(w,N)=>{let D=Math.ceil(u/8),ne=Math.ceil(w/8),Ee=new Array(ne*N).fill(0);for(let x=0;x<Math.min(l,N);x++)for(let J=0;J<Math.min(u,w);J++){let je=x*D+(J>>3);je<d.length&&d[je]>>(J&7)&1&&(Ee[x*ne+(J>>3)]|=1<<(J&7))}u=w,l=N,d=Ee},g=!1,f=!0,R=(w,N)=>D=>{D.preventDefault(),g=!0,f=!$(w,N),v(w,N,f),q()},V=(w,N)=>()=>{g&&(v(w,N,f),q())},F=()=>{g=!1},q=()=>{z(K(),m)},te=()=>{let w=[];for(let N=0;N<l;N++)for(let D=0;D<u;D++)w.push(b`<button class="ume-xbm-cell ${$(D,N)?"on":""}"
          data-x=${D} data-y=${N}
          @pointerdown=${R(D,N)}
          @pointerenter=${V(D,N)}></button>`);return w},K=()=>b`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${l}</span></span>
        <button class="ume-mini" @click=${C}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${F}
        @pointerleave=${F}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${w=>{y(Wt(+w.target.value,1,128),l),q()}} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${w=>{y(u,Wt(+w.target.value,1,64)),q()}} />
          <button class="ume-btn sm" @click=${()=>{d=d.map(()=>0),q()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{d=d.map(w=>~w&255),q()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${te()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${C}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,n,{w:u,h:l,bits:[...d]}),C()}}>应用</button>
      </div>
    </div>
  `;function C(){m.remove(),document.removeEventListener("pointerup",F)}document.addEventListener("pointerup",F),q(),i.appendChild(m)}function Wt(i,e,t){return Number.isFinite(i)?Math.min(t,Math.max(e,Math.trunc(i))):e}var Rn="prebuilt/u8g2-menu-preview.js",lt=class{constructor(e,t={}){this.store=ze();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;this.activateRightTab=()=>{};if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let m=document.createElement("style");m.id="ume-style",m.textContent=ct,document.head.appendChild(m)}let n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??n??void 0;if(r!==void 0)try{this.store.setState({project:Pe(r)})}catch(m){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",m)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),e.innerHTML=`
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
    `;let a=m=>e.querySelector(m);this.els={left:a(".ume-left"),center:a(".ume-center"),right:a(".ume-right"),propEl:a('[data-role="prop"]'),resEl:a('[data-role="res"]'),setEl:a('[data-role="set"]'),toolbarUndo:a('[data-act="undo"]'),toolbarRedo:a('[data-act="redo"]')};let o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new Le(o,{onPageChanged:m=>this.onPreviewPageChanged(m)});let u=document.createElement("div");this.els.center.appendChild(u),Ot(u,this.preview),this.preview.load(this.opts.wasmUrl??Rn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(m=>{console.error(m);let $=document.createElement("div");$.className="ume-warn",$.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${m.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend($)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let m=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);m!==null&&this.store.getState().addPage(m||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{ke(`${this.store.getState().project.name||"menu-project"}.json`,We(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{a('[data-role="file"]').click()}),a('[data-role="file"]').addEventListener("change",m=>{let $=m.target.files?.[0];$&&($.text().then(v=>{try{let y=Pe(v);this.store.getState().update(g=>{Object.assign(g,y)}),this.scheduleRender()}catch(y){alert(`\u5BFC\u5165\u5931\u8D25: ${y.message}`)}}),m.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate());let l=e.querySelectorAll(".ume-tabs button"),d=m=>{l.forEach($=>$.classList.toggle("active",$.dataset.tab===m)),this.els.propEl.style.display=m==="prop"?"":"none",this.els.resEl.style.display=m==="res"?"":"none",this.els.setEl.style.display=m==="set"?"":"none"};l.forEach(m=>{m.addEventListener("click",()=>d(m.dataset.tab??"prop"))}),this.activateRightTab=d,this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null);let c=null;this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange();let m=this.store.getState().selection.itemId;m&&m!==c&&this.activateRightTab("prop"),c=m}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=Pe(e);this.store.getState().update(n=>{Object.assign(n,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.produceCode();return qt(this.container,e),this.opts.onExport?.(e),e}downloadC(){let e=this.produceCode();ke("menu_pages.c",e.c)}produceCode(){let e=this.lastExport,t=this.store.getState().project,n,r=[];if(t.fontSubset){if(!this.preview.ready)r.push("\u73B0\u573A\u53D6\u6A21\u9700\u8981\u9884\u89C8\u5F15\u64CE\uFF0C\u5F53\u524D\u5F15\u64CE\u4E0D\u53EF\u7528\uFF1A\u672C\u6B21\u672A\u751F\u6210 menu_font\uFF0C\u4EE3\u7801\u5C06\u5F15\u7528\u5185\u7F6E\u5B57\u4F53");else{let o=pe(t,t.fontExtra),u=this.buildFontSubset(t,o);if("error"in u)r.push(`${u.error}\uFF0C\u672C\u6B21\u6309\u5185\u7F6E\u5B57\u4F53\u751F\u6210`);else{n=u.result.font;let l=Be(o);if(r.push(`\u73B0\u573A\u53D6\u6A21\uFF1A\u6536\u5F55 ${l.total} \u4E2A\u5B57\u7B26\uFF08ASCII ${l.ascii} + \u6269\u5C55 ${l.cjk}\uFF09\uFF0C\u5B57\u4F53\u6570\u7EC4 ${u.result.font.length} \u5B57\u8282\u3002\u8FD0\u884C\u65F6\u82E5\u8F93\u51FA\u8D85\u51FA\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u91CC\u8865\u5145\u989D\u5916\u5B57\u7B26`),u.result.included>255&&r.push(`\u5B50\u96C6\u5B57\u5F62\u6570 ${u.result.included} \u8D85\u8FC7 255\uFF1A\u5B57\u4F53\u5934 glyph_cnt \u5B57\u6BB5\u5C06\u56DE\u7ED5\uFF08\u8BB0\u5F55\u4E3A ${u.result.included&255}\uFF09\uFF0C\u5982\u9047\u6E32\u67D3\u5F02\u5E38\u8BF7\u5728"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u7CBE\u7B80`),u.result.missing.length){let d=u.result.missing.slice(0,5).map(c=>String.fromCodePoint(c)).join(" ");r.push(`\u5B57\u7B26\u96C6\u4E2D ${u.result.missing.length} \u4E2A\u5B57\u7B26\u672A\u5728\u6E90\u5B57\u4F53\u4E2D\u627E\u5230\uFF08\u5982 ${d}\uFF09\uFF0C\u8FD0\u884C\u65F6\u8FD9\u4E9B\u5B57\u7B26\u65E0\u6CD5\u663E\u793A`)}}}let a=this.preview.fontApplyWarning;a&&r.push(a)}let s=It(t,e??void 0,n);return s.warnings.unshift(...r),this.lastExport={c:s.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,s.c),s}buildFontSubset(e,t){let n=this.preview.fontIndex(e.font),r=this.preview.getFontBytes(n),s=this.preview.glyphFetcher(n);if(!r||!s)return{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u65E0\u6CD5\u8BFB\u53D6\u6E90\u5B57\u4F53\u6570\u636E"};let a=Ne(r,t,s);return a?{result:a}:{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u5B57\u7B26\u96C6\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62"}}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,We(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();Rt(this.els.left,this.store),Ft(this.els.setEl,this.store),Ut(this.els.resEl,this.store),Dt(this.els.propEl,this.store,{openXbmEditor:(t,n)=>Xt(this.container,this.store,t,n)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),t=document.getElementById("ume-page-jump"),n=this.store.getState(),r=this.store.getState().project.pages.findIndex(s=>s.id===n.selection.pageId);if(t){let s=n.project.pages,a=s.map(u=>u.name).join("|");t.dataset.sig!==a&&(t.dataset.sig=a,t.innerHTML="",s.forEach((u,l)=>{let d=document.createElement("option");d.value=String(l),d.textContent=`${l+1}. ${u.name}`,t.appendChild(d)}),t.onchange=()=>{let u=parseInt(t.value,10);Number.isFinite(u)&&this.preview.navTo(u)});let o=this.preview.currentPage;document.activeElement!==t&&t.value!==String(o)&&(t.value=String(o))}if(e&&r>=0&&n.selection.itemId){let s=n.project.pages[r],a=s.items.findIndex(m=>m.id===n.selection.itemId),o=s.items[a],u=o?.bind,l=u?.type==="value"||u?.type==="switch"?u.varId:null,d=o?.kind==="text"&&u?.type==="none"?o.displayVarId:null,c=l??d;if(o&&c){let m=(n.project.variables??[]).findIndex(f=>f.id===c),$=m>=0?m:r*kt+a,y=u?.type==="switch"?this.preview.getSwitch($):this.preview.getInt($),g=(n.project.variables??[]).find(f=>f.id===c)?.name;e.textContent=`${g??o.kind} = ${y}`}else e.textContent=""}}};return tn(Kn);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
