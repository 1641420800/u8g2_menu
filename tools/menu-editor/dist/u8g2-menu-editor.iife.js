"use strict";var U8G2MenuEditor=(()=>{var Ke=Object.defineProperty;var Yt=Object.getOwnPropertyDescriptor;var Zt=Object.getOwnPropertyNames;var Gt=Object.prototype.hasOwnProperty;var Jt=(a,e)=>{for(var n in e)Ke(a,n,{get:e[n],enumerable:!0})},Qt=(a,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Zt(e))!Gt.call(a,r)&&r!==n&&Ke(a,r,{get:()=>e[r],enumerable:!(t=Yt(e,r))||t.enumerable});return a};var en=a=>Qt(Ke({},"__esModule",{value:!0}),a);var Ln={};Jt(Ln,{MenuEditor:()=>ot,MenuKey:()=>Be});var lt=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-tabs button.active { color: var(--ume-accent); border-bottom-color: var(--ume-accent); font-weight: 600; }`;var dt=a=>{let e,n=new Set,t=(l,d)=>{let c=typeof l=="function"?l(e):l;if(!Object.is(c,e)){let m=e;e=d??(typeof c!="object"||c===null)?c:Object.assign({},e,c),n.forEach($=>$(e,m))}},r=()=>e,o={setState:t,getState:r,getInitialState:()=>u,subscribe:l=>(n.add(l),()=>n.delete(l))},u=e=a(t,r,o);return o},ct=a=>a?dt(a):dt;var je=0;function D(a){return je=(je+1)%1e9,`${a}_${Date.now().toString(36)}_${je.toString(36)}`}function ge(a){return{id:D("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...a}}function De(a){return{id:D("buf"),name:"buf_new",dataLen:32,sample:"sine",...a}}function mt(a,e){let n=new Set(a.map(r=>r.name));if(!n.has(e))return e;let t=2;for(;n.has(`${e}_${t}`);)t++;return`${e}_${t}`}function pt(a,e){let n=new Set(a.map(r=>r.name));if(!n.has(e))return e;let t=2;for(;n.has(`${e}_${t}`);)t++;return`${e}_${t}`}function X(a){let e={id:D("it"),label:"",bind:{type:"none"}};switch(a){case"text":return{...e,kind:a,text:"\u83DC\u5355\u9879",scale:1,displayVarId:null};case"slider":return{...e,kind:a,position:50};case"progress":return{...e,kind:a,position:50};case"chart":return{...e,kind:a,sources:[],height:32};case"xbm":return tn(16,16);case"textarea":return{...e,kind:a,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:a,w:64,h:32,cbName:"board_cb"}}}function tn(a,e){let n=Math.ceil(a/8);return{id:D("it"),kind:"xbm",label:"",bind:{type:"none"},name:"icon",w:a,h:e,bits:new Array(n*e).fill(0)}}function Ue(a){return{id:D("pg"),name:a,fnName:"",items:[]}}function Te(a,e){return{...a,...e}}function re(a,e){return{...a,...e}}function ft(){let a=[ge({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),ge({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),ge({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=[De({name:"buf_demo",dataLen:32,sample:"sine"})],n=Ue("\u4E3B\u9875");n.items=[Te(X("text"),{text:"u8g2_menu"}),re(X("text"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E",bind:{type:"submenu",targetPageId:null}}),re(X("text"),{text:"\u5173\u4E8E",bind:{type:"button",cbName:"btn_about_cb",buttonId:1}})];let t=Ue("\u8BBE\u7F6E");t.items=[re(Te(X("text"),{text:"\u97F3\u91CF:%d"}),{bind:{type:"value",varId:a[0].id}}),re(Te(X("text"),{text:"\u5F00\u5173:%s"}),{bind:{type:"switch",varId:a[1].id,openValue:1,onText:"on",offText:"off"}}),re(X("slider"),{bind:{type:"value",varId:a[2].id}}),re(X("text"),{text:"\u56FE\u8868",bind:{type:"submenu",targetPageId:null}}),re(X("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let r=Ue("\u56FE\u8868");r.items=[Te(X("chart"),{height:36,sources:[{bufferId:e[0].id,chartKind:"line"}]}),re(X("text"),{text:"\u8FD4\u56DE",bind:{type:"back"}})];let s={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],fontSubset:!0,fontExtra:"",variables:a,chartBuffers:e,pages:[n,t,r]};return n.items[1].bind.targetPageId=t.id,t.items[3].bind.targetPageId=r.id,s}function gt(a){return structuredClone(a)}var nn=800;function ht(){let a=null,e=0;return ct()((n,t)=>({project:ft(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(r,s)=>{let i=Date.now(),o=!!s&&s===a&&i-e<nn;a=s??null,e=i,n(u=>{let l=gt(u.project);return r(l),{project:l,dirty:!0,past:o?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{n(r=>r.past.length?{project:r.past[r.past.length-1],past:r.past.slice(0,-1),future:[r.project,...r.future.slice(0,99)],dirty:!0}:r)},redo:()=>{n(r=>{if(!r.future.length)return r;let[s,...i]=r.future;return{project:s,past:[...r.past,r.project],future:i,dirty:!0}})},select:(r,s=null)=>n({selection:{pageId:r,itemId:s}}),addPage:r=>{let s={id:D("pg"),name:r??`\u9875\u9762${t().project.pages.length+1}`,fnName:"",items:[]};return t().update(i=>{i.pages.push(s)}),n({selection:{pageId:s.id,itemId:null}}),s},removePage:r=>{t().update(i=>{i.pages=i.pages.filter(o=>o.id!==r);for(let o of i.pages)for(let u of o.items)u.bind.type==="submenu"&&u.bind.targetPageId===r&&(u.bind.targetPageId=null)});let{selection:s}=t();s.pageId===r&&n({selection:{pageId:null,itemId:null}})},movePage:(r,s)=>{t().update(i=>{let o=i.pages.findIndex(l=>l.id===r),u=o+s;o<0||u<0||u>=i.pages.length||([i.pages[o],i.pages[u]]=[i.pages[u],i.pages[o]])})},updatePage:(r,s)=>{t().update(i=>{let o=i.pages.find(u=>u.id===r);o&&Object.assign(o,s)})},addItem:(r,s)=>{let i=s??t().selection.pageId??t().project.pages[0]?.id;if(!i)return null;let o=X(r);return t().update(u=>{u.pages.find(d=>d.id===i)?.items.push(o)}),n({selection:{pageId:i,itemId:o.id}}),o},removeItem:(r,s)=>{t().update(o=>{let u=o.pages.find(l=>l.id===r);u&&(u.items=u.items.filter(l=>l.id!==s))});let{selection:i}=t();i.itemId===s&&n({selection:{pageId:r,itemId:null}})},moveItem:(r,s,i)=>{t().update(o=>{let u=o.pages.find(c=>c.id===r);if(!u)return;let l=u.items.findIndex(c=>c.id===s),d=l+i;l<0||d<0||d>=u.items.length||([u.items[l],u.items[d]]=[u.items[d],u.items[l]])})},duplicateItem:(r,s)=>{let i=null;t().update(o=>{let u=o.pages.find(d=>d.id===r);if(!u)return;let l=u.items.findIndex(d=>d.id===s);l<0||(i=structuredClone(u.items[l]),i.id=D("it"),u.items.splice(l+1,0,i))}),i&&n({selection:{pageId:r,itemId:i.id}})},updateItem:(r,s,i,o)=>{t().update(u=>{let d=u.pages.find(c=>c.id===r)?.items.find(c=>c.id===s);d&&Object.assign(d,i)},o)},addVariable:r=>{let s=null;return t().update(i=>{i.variables=i.variables??[];let o=pt(i.variables,r?.name??"var_new");s=ge({...r,name:o}),i.variables.push(s)}),s},removeVariable:r=>{let s=0;for(let i of t().project.pages)for(let o of i.items)"varId"in o&&o.varId===r&&s++;return s>0?s:(t().update(i=>{i.variables=(i.variables??[]).filter(o=>o.id!==r)}),0)},updateVariable:(r,s,i)=>{t().update(o=>{let u=(o.variables??[]).find(l=>l.id===r);u&&Object.assign(u,s)},i)},addChartBuffer:r=>{let s=null;return t().update(i=>{i.chartBuffers=i.chartBuffers??[];let o=mt(i.chartBuffers,r?.name??"buf_new");s=De({...r,name:o}),i.chartBuffers.push(s)}),s},removeChartBuffer:r=>{let s=0;for(let i of t().project.pages)for(let o of i.items)o.kind==="chart"&&o.sources.some(u=>u.bufferId===r)&&s++;return s>0?s:(t().update(i=>{i.chartBuffers=(i.chartBuffers??[]).filter(o=>o.id!==r)}),0)},updateChartBuffer:(r,s,i)=>{t().update(o=>{let u=(o.chartBuffers??[]).find(l=>l.id===r);u&&Object.assign(u,s)},i)}}))}var Q=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],le={text:"\u6587\u672C",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},bt={text:"T",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},de={none:"\u65E0",value:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE"};var Fe=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var ee=class extends Error{},vt=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]),xt=new Set(["line","point","bar"]),$t=new Set(["sine","ramp","noise","none"]);function ce(a){return typeof a=="object"&&a!==null&&!Array.isArray(a)}function H(a,e){return typeof a=="string"?a:e}function M(a,e){return typeof a=="number"&&Number.isFinite(a)?a:e}var rn=["text","slider","progress","chart","xbm","textarea","board"],an=["number","switch","button","submenu","back"],sn=["none","value","switch","button","submenu","back"];function on(a){if(!ce(a))throw new ee("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=H(a.kind,"");if(!(rn.includes(e)||an.includes(e)))throw new ee(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let n=structuredClone(a);switch(n.id=H(a.id,""),n.id||(n.id=`it_${Math.random().toString(36).slice(2,10)}`),n.label=H(a.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":n.text=H(a.text,""),n.scale=a.scale===2?2:1;break}return n}function un(a){for(let e of a)for(let n of e.items){let t=n;if(!(t.bind&&ce(t.bind)&&sn.includes(H(t.bind.type,"none")))){switch(t.kind){case"number":{let r=t.varId??null;t.editable===!1?(t.kind="text",t.displayVarId=r,t.bind={type:"none"}):(t.kind="text",t.displayVarId=null,t.bind={type:"value",varId:r});break}case"switch":t.kind="text",t.displayVarId=null,t.bind={type:"switch",varId:t.varId??null,openValue:M(t.openValue,1),onText:H(t.onText,"on"),offText:H(t.offText,"off")};break;case"button":t.kind="text",t.displayVarId=null,t.bind={type:"button",cbName:H(t.cbName,"btn_cb"),buttonId:M(t.buttonId,1)};break;case"submenu":t.kind="text",t.displayVarId=null,t.bind={type:"submenu",targetPageId:t.targetPageId??null};break;case"back":t.kind="text",t.displayVarId=null,t.bind={type:"back"};break;case"slider":case"progress":t.bind=t.varId?{type:"value",varId:t.varId}:{type:"none"},t.position===void 0&&(t.position=50);break;default:t.bind={type:"none"},t.kind==="text"&&t.displayVarId===void 0&&(t.displayVarId=null);break}delete t.varId,delete t.varName,delete t.varType,delete t.editable,delete t.step,delete t.min,delete t.max,delete t.initialValue,delete t.decimals,t.kind!=="board"&&(delete t.cbName,delete t.buttonId),delete t.openValue,delete t.onText,delete t.offText,delete t.targetPageId}}}function ln(a){if(!ce(a))throw new ee("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(a.items)?a.items.map(on):[];return{id:H(a.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:H(a.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:H(a.fnName,""),items:e}}function dn(a){if(!ce(a))return null;let e=H(a.type,"int32");return{id:H(a.id,"")||D("vb"),name:H(a.name,""),type:vt.has(e)?e:"int32",initialValue:M(a.initialValue,0),min:M(a.min,0),max:M(a.max,100),step:M(a.step,1)}}function cn(a){if(!ce(a))return null;let e=H(a.sample,"sine");return{id:H(a.id,"")||D("buf"),name:H(a.name,""),dataLen:Math.min(512,Math.max(2,Math.trunc(M(a.dataLen,32)))),sample:$t.has(e)?e:"sine"}}function mn(a){let e=new Map,n=[],t=(r,s)=>{let i=e.get(r);return i||(i=s(),e.set(r,i),n.push(i)),i};for(let r of a)for(let s of r.items){let i=s;switch(s.kind){case"number":if(i.varId===void 0||i.varId===null){let u=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",l=t(u,()=>({id:D("vb"),name:u,type:vt.has(String(i.varType))?String(i.varType):"int32",initialValue:M(i.initialValue,0),min:M(i.min,0),max:M(i.max,100),step:M(i.step,1)}));s.varId=l.id}i.editable===void 0&&(s.editable=!0),delete i.varName,delete i.varType,delete i.step,delete i.min,delete i.max,delete i.initialValue,delete i.decimals;break;case"slider":case"progress":if(i.varId===void 0||i.varId===null){let u=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",l=t(u,()=>({id:D("vb"),name:u,type:"int",initialValue:M(i.initialValue,0),min:M(i.min,0),max:M(i.max,100),step:M(i.step,1)}));s.varId=l.id}delete i.varName,delete i.step,delete i.min,delete i.max,delete i.initialValue;break;case"switch":if(i.varId===void 0||i.varId===null){let u=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",l=t(u,()=>({id:D("vb"),name:u,type:"uint8",initialValue:M(i.initialValue,0),min:0,max:1,step:1}));s.varId=l.id}delete i.varName,delete i.initialValue;break;default:break}}return n}function Me(a){let e;if(typeof a=="string")try{e=JSON.parse(a)}catch{throw new ee("JSON \u89E3\u6790\u5931\u8D25")}else e=a;if(!ce(e))throw new ee("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let n=e,t=M(n.version,0);if(t>1)throw new ee(`\u5DE5\u7A0B\u7248\u672C v${t} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);let r=Array.isArray(n.pages)?n.pages.map(ln):[];if(!r.length)throw new ee("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let s=["default","rotundity","square"].includes(n.selector)?n.selector:"rotundity",i=new Set(Q.map(d=>d.fn)),o=Array.isArray(n.weakHooks)?[...new Set(n.weakHooks.filter(d=>typeof d=="string"&&i.has(d)))]:[],u;Array.isArray(n.variables)?u=n.variables.map(dn).filter(d=>!!d):u=mn(r);let l;return Array.isArray(n.chartBuffers)?l=n.chartBuffers.map(cn).filter(d=>!!d):l=pn(r),un(r),fn(r,l),{version:1,name:H(n.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:M(n.width,128),height:M(n.height,64),font:H(n.font,"u8g2_font_wqy12_t_gb2312"),selector:s,selectorLeftMargin:M(n.selectorLeftMargin,16),selectorTopMargin:M(n.selectorTopMargin,0),selectorLineSpacing:M(n.selectorLineSpacing,0),marqueeSpeed:M(n.marqueeSpeed,.2),marqueeHeaderLen:M(n.marqueeHeaderLen,5),weakHooks:o,fontSubset:e.fontSubset===!0,fontExtra:H(e.fontExtra,""),variables:u,chartBuffers:l,pages:r}}function pn(a){let e=[],n=0,t=()=>{let r={id:D("buf"),name:`buf_chart_${++n}`,dataLen:32,sample:"sine"};return e.push(r),r};for(let r of a)for(let s of r.items){if(s.kind!=="chart")continue;let i=s;if(Array.isArray(i.sources))continue;let o=t();o.dataLen=Math.min(512,Math.max(2,Math.trunc(M(i.dataLen,32))));let u=H(i.sample,"sine");$t.has(u)&&(o.sample=u);let l=H(i.chartKind,"line"),d={bufferId:o.id,chartKind:xt.has(l)?l:"line"};i.max!==void 0&&i.max!==null&&(d.max=M(i.max,0)),i.min!==void 0&&i.min!==null&&(d.min=M(i.min,0)),s.sources=[d],i.height===void 0&&(s.height=32),delete i.chartKind,delete i.dataLen,delete i.sample,delete i.max,delete i.min}return e}function fn(a,e){let n=new Set(e.map(t=>t.id));for(let t of a)for(let r of t.items){if(r.kind!=="chart")continue;let s=r;Array.isArray(s.sources)||(s.sources=[]),r.sources=r.sources.filter(i=>n.has(i.bufferId)).map(i=>({bufferId:i.bufferId,chartKind:xt.has(i.chartKind)?i.chartKind:"line",min:i.min,max:i.max})),typeof s.height!="number"&&(s.height=32)}}function ze(a){return JSON.stringify(a,null,2)}var gn={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function G(a,e="anon"){let n=a.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!n||/^[0-9]/.test(n))&&(n=`_${n}`),n||e}var Ce=/^[A-Za-z_][A-Za-z0-9_]*$/,_t=new Set(["auto","break","case","char","const","continue","default","do","double","else","enum","extern","float","for","goto","if","inline","int","long","register","restrict","return","short","signed","sizeof","static","struct","switch","typedef","union","unsigned","void","volatile","while","_Bool","_Complex","_Imaginary"]);function qe(a){return Ce.test(a)&&!_t.has(a)}function he(a,e,n,t){let r=a;if(_t.has(r)&&(r=`${r}_`,n.push(`${t} "${a}" \u662F C \u5173\u952E\u5B57\uFF0C\u751F\u6210\u540D\u6539\u4E3A "${r}"`)),!e.has(r))return e.add(r),r;let s=2;for(;e.has(`${r}_${s}`);)s++;let i=`${r}_${s}`;return n.push(`${t} "${a}" \u4E0E\u5176\u4ED6\u751F\u6210\u7B26\u53F7\u51B2\u7A81\uFF08\u9875\u9762\u51FD\u6570/\u53D8\u91CF/\u7F13\u51B2\u533A/\u5B57\u4F53\u6570\u7EC4\uFF09\uFF0C\u5DF2\u6539\u4E3A "${i}"`),e.add(i),i}function be(a){return a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function ie(a){if(!Number.isFinite(a))return"0.0f";let e=a.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function hn(a,e,n){return n==="ramp"?`${a}[i] = (float)i;`:n==="noise"?`${a}[i] = (float)((i * 37) % ${e});`:`${a}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`}function bn(a){let e=new Map;if(!a)return e;let n=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,t;for(;(t=n.exec(a))!==null;)e.set(t[1],t[2]);return e}function Z(a,e,n){let t=e.has(a)?e.get(a):"";return`${n}/* USER CODE BEGIN ${a} */${t}${n}/* USER CODE END ${a} */`}var vn=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function yt(a,e,n){let t=[],r=bn(e?.c??""),s=new Set;n&&s.add("menu_font");let i=[];a.pages.forEach((p,w)=>{let h=`page_${w}`;p.fnName&&(Ce.test(p.fnName)?h=p.fnName:t.push(`\u9875\u9762 "${p.name}" \u7684\u51FD\u6570\u540D "${p.fnName}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u56DE\u9000\u4E3A page_${w}`)),i.push(he(h,s,t,`\u9875\u9762 "${p.name}" \u7684\u51FD\u6570\u540D`))});let o=new Map,u=new Map;for(let p of a.variables??[]){if(!p.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}Ce.test(p.name)||t.push(`\u53D8\u91CF\u540D "${p.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${G(p.name)}"`);let w=G(p.name,"var");if(o.has(w)){t.push(`\u53D8\u91CF\u540D "${p.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}let h=he(w,s,t,`\u53D8\u91CF\u540D "${w}"`),k=p.type==="float"||p.type==="double",A={name:h,srcType:p.type,type:gn[p.type],init:k?ie(p.initialValue):String(Math.trunc(p.initialValue)),isFloat:k,step:p.step,min:p.min,max:p.max};o.set(h,A),u.set(p.id,A)}let l=new Map,d=new Set,c=[],m=new Map,$=new Set;(a.chartBuffers??[]).forEach((p,w)=>{if(!p.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u6570\u636E\u6E90\u7F13\u51B2\u533A\uFF0C\u5DF2\u8DF3\u8FC7");return}Ce.test(p.name)||t.push(`\u7F13\u51B2\u533A\u540D "${p.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${G(p.name)}"`);let h=G(p.name,"buf");if($.has(h)){t.push(`\u7F13\u51B2\u533A\u540D "${p.name}" \u4E0E\u5176\u5B83\u7F13\u51B2\u533A\u91CD\u540D\uFF0C\u5DF2\u8DF3\u8FC7`);return}$.add(h);let k=he(h,s,t,`\u7F13\u51B2\u533A\u540D "${h}"`),A=Math.max(2,Math.trunc(p.dataLen)),B=`${k.toUpperCase()}_LEN`;m.set(p.id,{name:k,lenMacro:B,len:A});let j=`fill_${k}`;if(!(r.get(j)??"").trim()){let T=r.get(`chart${w}_fill`);T&&T.trim()&&(r.set(j,T),t.push(`\u5DF2\u5C06\u65E7\u7248 chart${w}_fill \u624B\u5199\u5185\u5BB9\u8FC1\u79FB\u81F3 ${j}\uFF08\u540E\u7EED\u8BF7\u76F4\u63A5\u5728\u8BE5\u533A\u5185\u7EF4\u62A4\uFF09`))}let W=(r.get(j)??"").trim()!=="";c.push(`#define ${B} ${A}`,`static float ${k}[${B}];`,`static uint8_t ${k}_filled = 0;`,`static void ${k}_fill(void)`,"{",Z(j,r,"    "),...p.sample!=="none"&&!W?[`    for (uint16_t i = 0; i < ${B}; ++i) { ${hn(k,A,p.sample)} }`]:[],"}")});let v=[],y=new Map,g=new Map,f=new Map;{let p=0,w=0,h=k=>{let A=m.get(k);return A?(f.has(k)||f.set(k,`        if (!${A.name}_filled) { ${A.name}_filled = 1; ${A.name}_fill(); }`),f.get(k)):""};for(let k of a.pages)for(let A of k.items){if(A.kind!=="chart")continue;let B=A.sources.filter(T=>m.has(T.bufferId));if(A.sources.length&&!B.length){t.push(`\u9875\u9762 ${k.name} \u7684\u56FE\u8868\u6761\u76EE\u6570\u636E\u6E90\u65E0\u6548\uFF08\u7F13\u51B2\u533A\u4E0D\u5B58\u5728\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);continue}if(!B.length){t.push(`\u9875\u9762 ${k.name} \u7684\u56FE\u8868\u6761\u76EE\u672A\u7ED1\u5B9A\u6570\u636E\u6E90\uFF0C\u5DF2\u8DF3\u8FC7`);continue}let j=Math.max(4,Math.trunc(A.height)),W=[];for(let T of B){let L=m.get(T.bufferId),_=`chart${p++}`;v.push(`static float ${_}_dis[${L.lenMacro}];`,`static u8g2_chart_t ${_};`),W.push({name:_,s:T,b:L})}if(W.length===1){let{name:T,s:L,b:_}=W[0];v.push(`static uint8_t ${T}_inited = 0;`),y.set(A.id,[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`,`        u8g2_chart_init(&${T}, ${_.name}, ${T}_dis, ${_.lenMacro});`,h(L.bufferId),"    }"]);let E=L.chartKind==="point"?"Point":L.chartKind==="bar"?"Bar":"Line",Ee=L.min!==void 0&&L.max!==void 0?`${ie(L.max)}, ${ie(L.min)}`:"0, 0";g.set(A.id,`    u8g2_MenuDrawItem${E}Chart(&${T}, ${j}, ${Ee});`)}else{let T=`chart_layers_${w++}`;v.push(`static u8g2_menu_drawChart_t ${T}[${W.length}];`,`static uint8_t ${T}_inited = 0;`);let L=[`    if (!${T}_inited) {`,`        ${T}_inited = 1;`];W.forEach(({name:_,s:E,b:Ee},Ae)=>{L.push(`        u8g2_chart_init(&${_}, ${Ee.name}, ${_}_dis, ${Ee.lenMacro});`),L.push(h(E.bufferId));let Xt=E.chartKind==="point"?"u8g2_drawPointChart":E.chartKind==="bar"?"u8g2_drawBarChart":"u8g2_drawLineChart",ut=E.min!==void 0&&E.max!==void 0?`${ie(E.max)}, ${ie(E.min)}`:"0, 0";L.push(`        ${T}[${Ae}].drawChart = ${Xt};`),L.push(`        ${T}[${Ae}].chart = &${_};`),L.push(`        ${T}[${Ae}].max = ${ut.split(", ")[0]};`),L.push(`        ${T}[${Ae}].min = ${ut.split(", ")[1]};`)}),L.push("    }"),y.set(A.id,L),g.set(A.id,`    u8g2_MenuDrawItemChart(${T}, ${W.length}, ${j});`)}}}let R=[],V=[],F=[],q=new Set,te=new Map,K=0;for(let p of a.pages)for(let w of p.items){if(w.bind.type==="button"){let h=G(w.bind.cbName,"btn_cb");l.has(h)||l.set(h,w.bind.buttonId)}switch(w.kind){case"board":d.add(G(w.cbName,"board_cb"));break;case"xbm":{let h=G(w.name,"icon");for(;q.has(h);)h=`${h}_2`;q.add(h),te.set(w.id,h);let k=w.bits.length,A=w.bits.map(B=>`0x${(B&255).toString(16).padStart(2,"0")}`).join(", ");R.push(`static const uint8_t menu_xbm_${h}[${k}] = { ${A} };`);break}case"textarea":{let h=K++;V.push(`static char ta${h}_text[] = "${be(w.content)}";`,`static u8g2_menu_textArea_t ta${h};`,`static uint8_t ta${h}_inited = 0;`),F.push(`    if (!ta${h}_inited) {`,`        ta${h}_inited = 1;`,`        u8g2_textArea_init(&ta${h}, ta${h}_text);`,`        u8g2_textArea_setLineSpacing(&ta${h}, ${Math.max(0,Math.trunc(w.lineSpacing))});`,"    }");break}default:break}}let C=new Map,I=new Map;for(let p of l.keys())C.set(p,he(p,s,t,`\u6309\u94AE\u56DE\u8C03\u540D "${p}"`));for(let p of d)I.set(p,he(p,s,t,`\u81EA\u7ED8\u677F\u56DE\u8C03\u540D "${p}"`));let N=(p,w)=>{if(!p)return"";let h=`"${be(p)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${h});`:`u8g2_MenuUTF8Printf(${h});`},U=(p,w,h)=>{let k=`"${be(p)}"`;return w===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${k}, ${h});`:`u8g2_MenuUTF8Printf(${k}, ${h});`},ne=0,ke=(p,w)=>{let h=[],k=`${w.name}`,A=_=>{if(!_)return null;let E=u.get(_);return E||t.push(`\u9875\u9762 ${k} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),E??null},B=p.bind,j=null,W=null,T="on",L="off";switch(B.type){case"value":{let _=A(B.varId);if(_){j=_;let E=_.isFloat?`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${ie(_.step)}, ${ie(_.min)}, ${ie(_.max)});`:`u8g2_MenuItemValue_${_.srcType}(&${_.name}, ${Math.trunc(_.step)}, ${Math.trunc(_.min)}, ${Math.trunc(_.max)});`;h.push(`    ${E}`)}break}case"switch":{let _=A(B.varId);_&&_.srcType!=="uint8"?t.push(`\u5F00\u5173\u9644\u52A0\u503C\u7ED1\u5B9A\u7684\u53D8\u91CF "${_.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${_.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`):_&&(W=_,T=B.onText,L=B.offText,h.push(`    u8g2_MenuItemValue_switch(&${_.name}, ${Math.trunc(B.openValue)});`));break}case"button":{let _=G(B.cbName,"btn_cb"),E=C.get(_)??_;h.push(`    u8g2_MenuItem_button(${E}, ${Math.trunc(B.buttonId)});`);break}case"submenu":{let _=a.pages.findIndex(E=>E.id===B.targetPageId);!B.targetPageId||_<0?t.push(`\u9875\u9762 ${k} \u7684\u6761\u76EE "${p.label||"\u672A\u547D\u540D"}" \u9644\u52A0\u503C\u76EE\u6807\u9875\u9762\u65E0\u6548\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`):h.push(`    u8g2_MenuItem_menu_enter(${i[_]});`);break}case"back":h.push("    u8g2_MenuItem_menu_back();");break;default:break}switch(p.kind){case"text":{if(j)h.push(`    ${U(p.text,p.scale,j.name)}`),/%[-+ #0]*[a-zA-Z]/.test(p.text)||t.push(`\u9875\u9762 ${k} \u7684\u6570\u503C\u9644\u52A0\u503C\u6761\u76EE\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(W)h.push(`    ${U(p.text,p.scale,`${W.name} ? "${be(T)}" : "${be(L)}"`)}`),/%[-+ #0]*s/.test(p.text)||t.push("\u5F00\u5173\u9644\u52A0\u503C\u6761\u76EE\u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off");else if(B.type==="none"&&p.displayVarId){let _=A(p.displayVarId);if(_)h.push(`    ${U(p.text,p.scale,_.name)}`),/%[-+ #0]*[a-zA-Z]/.test(p.text)||t.push(`\u9875\u9762 ${k} \u7684\u663E\u793A\u6761\u76EE\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else{t.push(`\u9875\u9762 ${k} \u7684\u663E\u793A\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let E=N(p.text,p.scale);E&&h.push(`    ${E}`)}}else if(/%[-+ #0]*[a-zA-Z]/.test(p.text)){t.push(`\u9875\u9762 ${k} \u7684\u6587\u672C\u6761\u76EE\u542B\u5360\u4F4D\u7B26\u4F46\u672A\u7ED1\u5B9A\u53D8\u91CF/\u663E\u793A\u53D8\u91CF\uFF0C\u5360\u4F4D\u7B26\u5DF2\u79FB\u9664`);let _=N(p.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),p.scale);_&&h.push(`    ${_}`)}else{let _=N(p.text,p.scale);_&&h.push(`    ${_}`)}break}case"slider":case"progress":{let _=p.kind==="slider"?"Slider":"ProgressBar";if(j){if(!vn.has(j.srcType)){t.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u9644\u52A0\u503C\u7684\u53D8\u91CF "${j.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${j.srcType}\uFF09\uFF0C\u5DF2\u6309\u9759\u6001\u663E\u793A\u751F\u6210`),h.push(`    u8g2_MenuDrawItem${_}(${(p.position/100).toFixed(2)}f);`);break}h.push(`    u8g2_MenuDrawItem${_}_bind(&${j.name}, ${Math.trunc(j.step)}, ${Math.trunc(j.min)}, ${Math.trunc(j.max)});`)}else{let E=Math.min(100,Math.max(0,p.position));h.push(`    u8g2_MenuDrawItem${_}(${(E/100).toFixed(2)}f);`)}break}case"chart":{let _=y.get(p.id),E=g.get(p.id);if(!_||!E)break;h.push(..._),h.push(E);break}case"xbm":h.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(p.w)}, ${Math.trunc(p.h)}, menu_xbm_${te.get(p.id)??G(p.name,"icon")});`);break;case"textarea":{let _=ne++;h.push(...F[_].split(`
`));let E=p.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";h.push(`    ${E}(&ta${_}, ${Math.max(10,Math.trunc(p.height))});`);break}case"board":{let _=G(p.cbName,"board_cb"),E=I.get(_)??_;h.push(`    u8g2_MenuDrawItemBoard(${E}, ${Math.max(1,Math.trunc(p.w))}, ${Math.max(1,Math.trunc(p.h))});`);break}}return h},x=[];x.push("/**"),x.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${a.name}`),x.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),x.push(" *"),x.push(" * main.c \u91CC\u4F7F\u7528\u4EE5\u4E0B\u7B26\u53F7\u65F6\uFF0C\u76F4\u63A5 extern\uFF08\u6216\u590D\u5236\u4E0B\u9762\u58F0\u660E\uFF09\uFF1A"),x.push(` *   u8g2_SetFont(&u8g2, ${n?"menu_font":a.font});`),i.forEach((p,w)=>x.push(` *   void ${p}(void);   /* \u9875\u9762: ${a.pages[w].name} */`));for(let p of o.values())x.push(` *   extern ${p.type} ${p.name};`);for(let p of C.values())x.push(` *   void ${p}(u8g2_menu_t *menu, uint8_t ID);`);for(let p of I.values())x.push(` *   void ${p}(u8g2_t *u8g2);`);x.push(" */"),x.push('#include "u8g2_menu.h"'),(a.chartBuffers??[]).some(p=>p.sample==="sine")&&x.push("#include <math.h>"),x.push(""),x.push(Z("includes",r,"")),x.push(""),i.forEach(p=>x.push(`void ${p}(void);`)),x.push(""),x.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),x.push(Z("variables",r,""));for(let p of o.values())x.push(`${p.type} ${p.name} = ${p.init};`);if(x.push(""),n){x.push("/* ======================== \u5B57\u4F53\uFF08\u73B0\u573A\u53D6\u6A21\uFF09 ======================== */"),x.push("/* \u4EC5\u5305\u542B\u5DE5\u7A0B\u6587\u672C\u7528\u5230\u7684\u5B57\u5F62\uFF08\u542B ASCII 95 \u4E2A + \u989D\u5916\u5B57\u7B26\uFF09\uFF0C"),x.push(" * main.c \u91CC u8g2_SetFont(&u8g2, menu_font) \u5373\u53EF\u4F7F\u7528\uFF1B"),x.push(' * \u82E5\u8FD0\u884C\u65F6\u8F93\u51FA\u8D85\u51FA\u6B64\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u7F16\u8F91\u5668"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u8865\u5145\u540E\u91CD\u65B0\u751F\u6210\u3002 */');let p=[];for(let w=0;w<n.length;w+=16)p.push("  "+[...n.slice(w,w+16)].map(h=>`0x${h.toString(16).padStart(2,"0")}`).join(", ")+",");x.push(`const uint8_t menu_font[${n.length}] U8G2_FONT_SECTION("menu_font") = {`),x.push(...p),x.push("};"),x.push("")}if((c.length||v.length||V.length||R.length)&&(x.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),x.push(...c,...v,...V,...R),x.push("")),l.size||d.size){x.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),x.push(Z("callbacks",r,""));for(let[p]of l){let w=C.get(p);x.push(`void ${w}(u8g2_menu_t *menu, uint8_t ID)`),x.push("{"),x.push(Z(`cb_${w}`,r,"    ")),x.push("}"),x.push("")}for(let p of d){let w=I.get(p);x.push(`void ${w}(u8g2_t *u8g2)`),x.push("{"),x.push(Z(`cb_${w}`,r,"    ")),x.push("}"),x.push("")}}let J=(a.weakHooks??[]).map(p=>Q.find(w=>w.fn===p)).filter(p=>!!p);if(J.length||r.has("weak")||Q.some(p=>(r.get(`weak_${p.fn}`)??"").trim())){x.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),x.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),x.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let w=Q.filter(h=>!a.weakHooks?.includes(h.fn)&&(r.get(`weak_${h.fn}`)??"").trim()).map(h=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${h.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${h.decl}`,"{",Z(`weak_${h.fn}`,r,"    "),"}","#endif"].join(`
`)).join(`
`);x.push(w?`${Z("weak",r,"").replace(/\n$/,"")}
${w}
`:Z("weak",r,"")),x.push("");for(let h of J){x.push(`/* ${h.label}: ${h.desc} */`),x.push(`${h.decl}`),x.push("{"),x.push(Z(`weak_${h.fn}`,r,"    "));let k=h.bodyArgs.split(`
`).map(A=>`    ${A}`);h.retNote&&k.push(`    ${h.retNote}`),x.push(...k),x.push("}"),x.push("")}}return x.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),x.push(""),a.pages.forEach((p,w)=>{x.push(`/* \u9875\u9762: ${p.name} */`),x.push(`void ${i[w]}(void)`),x.push("{"),x.push(Z(`page_${i[w]}_pre`,r,"    "));for(let h of p.items)x.push(...ke(h,p));x.push("}"),x.push("")}),{c:`${x.join(`
`).replace(/\n{3,}/g,`


`)}
`,warnings:t}}function xn(a){return{raw:a.slice(0,23),glyphCnt:a[0],startUpperA:a[17]<<8|a[18],startLowerA:a[19]<<8|a[20],startUnicode:a[21]<<8|a[22]}}function Pe(a,e,n){let t=[],r=[],s=[],i=[...e].sort((v,y)=>v-y);for(let v of i){let y=n(v);if(!y||!y.length){s.push(v);continue}v<=255?t.push({encoding:v,entry:y}):r.push({encoding:v,entry:y})}if(!t.length&&!r.length)return null;let o=t.length+r.length,u=0;for(let v of t)u+=v.entry.length;u+=2;let l=4;for(let v of r)l+=v.entry.length;l+=2;let d=xn(a),c=new Uint8Array(23+u+l);c.set(d.raw,0),c[0]=o,c[17]=0,c[18]=0,c[19]=0,c[20]=0,c[21]=0,c[22]=0;let m=23;for(let v of t){if(v.encoding===65){let y=m-23;c[17]=y>>8&255,c[18]=y&255}if(v.encoding===97){let y=m-23;c[19]=y>>8&255,c[20]=y&255}c.set(v.entry,m),m+=v.entry.length}c[m]=0,c[m+1]=0,m+=2;let $=m-23;c[21]=$>>8&255,c[22]=$&255,c[m]=0,c[m+1]=4,c[m+2]=255,c[m+3]=255,m+=4;for(let v of r)c.set(v.entry,m),m+=v.entry.length;return c[m]=0,c[m+1]=0,{font:c,included:o,missing:s}}function wt(a){return[...a].map(e=>e.codePointAt(0)).filter(e=>Number.isFinite(e))}function It(){let a=[];for(let e=32;e<=126;e++)a.push(e);return a}function me(a,e){let n=new Set(It()),t=r=>{for(let s of wt(r))n.add(s)};for(let r of a.pages)for(let s of r.items)s.kind==="text"&&t(s.text),s.kind==="textarea"&&t(s.content),s.bind.type==="switch"&&(t(s.bind.onText),t(s.bind.offText));return t(e),n.delete(10),n.delete(13),n}function Ve(a){let e=0,n=0;for(let t of a)t<=126?e++:n++;return{total:a.size,ascii:e,cjk:n}}var Be=(o=>(o[o.None=0]="None",o[o.Up=1]="Up",o[o.Down=2]="Down",o[o.Enter=3]="Enter",o[o.Return=4]="Return",o[o.Add=5]="Add",o[o.Sub=6]="Sub",o))(Be||{}),St=64;var $n=128*64/8;function _n(a){return new Promise((e,n)=>{let t=document.createElement("script");t.src=a,t.onload=()=>e(),t.onerror=()=>n(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${a}`)),document.head.appendChild(t)})}var Ne=class{constructor(e,n={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.fontSig=null;this.lastKnownPage=0;this.fontApplyWarning=null;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=n}async load(e){if(this.mod)return;let n=window;n.U8G2MenuPreview||await _n(e);let t=n.U8G2MenuPreview;if(!t)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await t({locateFile:s=>e.replace(/[^/\\]*$/,"")+s}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let r=this.mod._em_font_count_export();for(let s=0;s<r;s++){let i=this.mod._em_font_name(s);this.fontIndexCache.set(this.mod.UTF8ToString(i),s)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify({bufs:(e.chartBuffers??[]).map(n=>`${n.name}|${n.dataLen}|${n.sample}`),pages:e.pages.map(n=>({n:n.items.length,k:n.items.map(t=>t.kind).join(","),res:n.items.map(t=>t.kind==="chart"?(t.sources??[]).map(r=>`${r.bufferId}|${r.chartKind}|${r.min??"a"}|${r.max??"a"}`).join(">"):t.kind==="xbm"?`${t.w}x${t.h}`:t.kind==="textarea"?Math.ceil(t.content.length/64):"").join(",")}))})}sync(e){let n=this.mod;if(!n)return;let t=this.signature(e);t!==this.structSig&&(n.ccall("em_reset_dynamic",null,[],[]),this.structSig=t);let r=d=>Math.trunc(Number.isFinite(d)?d:0),s={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8},i={text:0,slider:1,progress:2,chart:3,xbm:4,textarea:5,board:6},o={none:0,value:1,switch:2,button:3,submenu:4,back:5},u={sine:0,ramp:1,noise:2,none:3},l=d=>d?(e.variables??[]).findIndex(c=>c.id===d):-1;if((e.variables??[]).forEach((d,c)=>{n.ccall("em_var_define",null,["number","number","number","number","number","number"],[c,s[d.type],r(d.initialValue),r(d.step),r(d.min),r(d.max)])}),(e.chartBuffers??[]).forEach((d,c)=>{n.ccall("em_buf_define",null,["number","number","number"],[c,r(d.dataLen),u[d.sample]])}),e.pages.forEach((d,c)=>{n.ccall("em_page_begin",null,["number"],[c]),d.items.forEach((m,$)=>{let v=()=>{let y=m.bind;if(y.type==="none")return;let g=y.type==="value"||y.type==="switch",f=g?(e.variables??[]).find(R=>R.id===y.varId):void 0;n.ccall("em_page_bind",null,["number","number","number","number","number","number","number","number"],[c,$,o[y.type],g&&f?s[f.type]:0,y.type==="switch"?r(y.openValue):0,y.type==="button"?r(y.buttonId):0,y.type==="submenu"?e.pages.findIndex(R=>R.id===y.targetPageId):-1,g&&f?l(f.id):-1])};switch(m.kind){case"text":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,i.text,m.scale,0,0,0,m.displayVarId?l(m.displayVarId):-1,-1]),n.ccall("em_item_text",null,["number","number","string"],[c,$,m.text]),v();break;case"slider":case"progress":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,i[m.kind],1,0,0,0,-1,-1]),v();break;case"chart":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,i.chart,1,r(m.height),0,0,-1,-1]);for(let y of m.sources??[])n.ccall("em_item_chart_add",null,["number","number","number","number","number","number","number"],[c,$,(e.chartBuffers??[]).findIndex(g=>g.id===y.bufferId),{line:0,point:1,bar:2}[y.chartKind],y.min!==void 0&&y.max!==void 0?1:0,y.max??0,y.min??0]);v();break;case"xbm":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,i.xbm,1,0,r(m.w),r(m.h),-1,-1]);{let y=n._em_scratch(m.bits.length);y&&(n.HEAPU8.set(new Uint8Array(m.bits),y),n._em_item_bits(c,$,y,m.bits.length))}v();break;case"textarea":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,i.textarea,1,r(m.height),0,0,-1,-1]),n.ccall("em_item_text",null,["number","number","string"],[c,$,m.content]),v();break;case"board":n.ccall("em_page_item",null,["number","number","number","number","number","number","number","number","number"],[c,$,i.board,1,0,r(m.w),r(m.h),-1,-1]),v();break}}),n.ccall("em_page_end",null,["number","number"],[c,d.items.length])}),n.ccall("em_pages_commit",null,["number"],[e.pages.length]),n.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],r(e.selectorLeftMargin),r(e.selectorTopMargin),r(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen]),e.fontSubset){let d=me(e,e.fontExtra),c=e.font+"|"+[...d].sort((m,$)=>m-$).join(",");c!==this.fontSig&&(this.fontSig=c,this.applyFontSubset(this.fontIndex(e.font),d))}else this.fontSig!==null&&(this.fontSig=null,this.fontApplyWarning=null)}applyFontSubset(e,n){this.fontApplyWarning=null;let t=this.getFontBytes(e),r=this.glyphFetcher(e),s=t&&r?Pe(t,n,r):null;if(!s){this.fontApplyWarning="\u73B0\u573A\u53D6\u6A21\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62\uFF0C\u9884\u89C8\u4F7F\u7528\u5185\u7F6E\u5B57\u4F53";return}this.useCustomFont(s.font)||(this.fontApplyWarning=`\u5B50\u96C6\u5B57\u4F53 ${s.font.length} \u5B57\u8282\u8D85\u8FC7\u9884\u89C8\u69FD\u4F4D\u5BB9\u91CF\uFF0C\u9884\u89C8\u5DF2\u56DE\u9000\u5168\u5B57\u5E93\uFF08\u5BFC\u51FA\u7684 menu_font \u6570\u7EC4\u4E0D\u53D7\u5F71\u54CD\uFF09`)}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=n=>{if(!this.running)return;let t=Math.min(100,Math.round(n-this.lastT));this.lastT=n,this.renderFrame(t),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let n=this.mod;if(!n)return;let t=n._em_frame(e);if(!t)return;this.img||(this.img=this.ctx.createImageData(128,64));let r=n.HEAPU8.subarray(t,t+$n),s=this.img.data;s.fill(255);for(let o=0;o<64;o++){let u=(o>>3)*128,l=1<<(o&7),d=o*128*4;for(let c=0;c<128;c++)r[u+c]&l&&(s[d]=17,s[d+1]=24,s[d+2]=39),d+=4}this.ctx.putImageData(this.img,0,0);let i=n._em_get_current_page();i!==this.lastKnownPage&&(this.lastKnownPage=i,this.events.onPageChanged?.(i))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getFontBytes(e){let n=this.mod;if(!n)return null;let t=n.ccall("em_font_data","number",["number"],[e]),r=n.ccall("em_font_data_len","number",["number"],[e]);return!t||!r?null:n.HEAPU8.slice(t,t+r)}glyphFetcher(e){let n=this.mod;return n?t=>{let r=n.ccall("em_scratch","number",["number"],[64]),s=n.ccall("em_font_glyph","number",["number","number","number","number"],[e,t,64,r]);return s?n.HEAPU8.slice(r,r+s):null}:null}useCustomFont(e){let n=this.mod;if(!n)return!1;let t=n.ccall("em_custom_font_ptr","number",[],[]),r=n.ccall("em_custom_font_max","number",[],[]);return e.length>r?!1:(n.HEAPU8.set(e,t),n.ccall("em_set_custom_font",null,["number"],[e.length]),!0)}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Qe=globalThis,kt=a=>a,Le=Qe.trustedTypes,Et=Le?Le.createPolicy("lit-html",{createHTML:a=>a}):void 0,Vt="$lit$",ae=`lit$${Math.random().toFixed(9).slice(2)}$`,Nt="?"+ae,yn=`<${Nt}>`,ue=document,xe=()=>ue.createComment(""),$e=a=>a===null||typeof a!="object"&&typeof a!="function",et=Array.isArray,wn=a=>et(a)||typeof a?.[Symbol.iterator]=="function",We=`[ 	
\f\r]`,ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,Tt=/>/g,se=RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mt=/'/g,Ct=/"/g,Bt=/^(?:script|style|textarea|title)$/i,tt=a=>(e,...n)=>({_$litType$:a,strings:e,values:n}),b=tt(1),rr=tt(2),ir=tt(3),_e=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Pt=new WeakMap,oe=ue.createTreeWalker(ue,129);function Lt(a,e){if(!et(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Et!==void 0?Et.createHTML(e):e}var In=(a,e)=>{let n=a.length-1,t=[],r,s=e===2?"<svg>":e===3?"<math>":"",i=ve;for(let o=0;o<n;o++){let u=a[o],l,d,c=-1,m=0;for(;m<u.length&&(i.lastIndex=m,d=i.exec(u),d!==null);)m=i.lastIndex,i===ve?d[1]==="!--"?i=At:d[1]!==void 0?i=Tt:d[2]!==void 0?(Bt.test(d[2])&&(r=RegExp("</"+d[2],"g")),i=se):d[3]!==void 0&&(i=se):i===se?d[0]===">"?(i=r??ve,c=-1):d[1]===void 0?c=-2:(c=i.lastIndex-d[2].length,l=d[1],i=d[3]===void 0?se:d[3]==='"'?Ct:Mt):i===Ct||i===Mt?i=se:i===At||i===Tt?i=ve:(i=se,r=void 0);let $=i===se&&a[o+1].startsWith("/>")?" ":"";s+=i===ve?u+yn:c>=0?(t.push(l),u.slice(0,c)+Vt+u.slice(c)+ae+$):u+ae+(c===-2?o:$)}return[Lt(a,s+(a[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]},ye=class a{constructor({strings:e,_$litType$:n},t){let r;this.parts=[];let s=0,i=0,o=e.length-1,u=this.parts,[l,d]=In(e,n);if(this.el=a.createElement(l,t),oe.currentNode=this.el.content,n===2||n===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=oe.nextNode())!==null&&u.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(Vt)){let m=d[i++],$=r.getAttribute(c).split(ae),v=/([.?@])?(.*)/.exec(m);u.push({type:1,index:s,name:v[2],strings:$,ctor:v[1]==="."?Ye:v[1]==="?"?Ze:v[1]==="@"?Ge:fe}),r.removeAttribute(c)}else c.startsWith(ae)&&(u.push({type:6,index:s}),r.removeAttribute(c));if(Bt.test(r.tagName)){let c=r.textContent.split(ae),m=c.length-1;if(m>0){r.textContent=Le?Le.emptyScript:"";for(let $=0;$<m;$++)r.append(c[$],xe()),oe.nextNode(),u.push({type:2,index:++s});r.append(c[m],xe())}}}else if(r.nodeType===8)if(r.data===Nt)u.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(ae,c+1))!==-1;)u.push({type:7,index:s}),c+=ae.length-1}s++}}static createElement(e,n){let t=ue.createElement("template");return t.innerHTML=e,t}};function pe(a,e,n=a,t){if(e===_e)return e;let r=t!==void 0?n._$Co?.[t]:n._$Cl,s=$e(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(a),r._$AT(a,n,t)),t!==void 0?(n._$Co??=[])[t]=r:n._$Cl=r),r!==void 0&&(e=pe(a,r._$AS(a,e.values),r,t)),e}var Xe=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:n},parts:t}=this._$AD,r=(e?.creationScope??ue).importNode(n,!0);oe.currentNode=r;let s=oe.nextNode(),i=0,o=0,u=t[0];for(;u!==void 0;){if(i===u.index){let l;u.type===2?l=new we(s,s.nextSibling,this,e):u.type===1?l=new u.ctor(s,u.name,u.strings,this,e):u.type===6&&(l=new Je(s,this,e)),this._$AV.push(l),u=t[++o]}i!==u?.index&&(s=oe.nextNode(),i++)}return oe.currentNode=ue,r}p(e){let n=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,n),n+=t.strings.length-2):t._$AI(e[n])),n++}},we=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,t,r){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=pe(this,e,n),$e(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==_e&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):wn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&$e(this._$AH)?this._$AA.nextSibling.data=e:this.T(ue.createTextNode(e)),this._$AH=e}$(e){let{values:n,_$litType$:t}=e,r=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=ye.createElement(Lt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(n);else{let s=new Xe(r,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(e){let n=Pt.get(e.strings);return n===void 0&&Pt.set(e.strings,n=new ye(e)),n}k(e){et(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,t,r=0;for(let s of e)r===n.length?n.push(t=new a(this.O(xe()),this.O(xe()),this,this.options)):t=n[r],t._$AI(s),r++;r<n.length&&(this._$AR(t&&t._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){let t=kt(e).nextSibling;kt(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},fe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,t,r,s){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=S}_$AI(e,n=this,t,r){let s=this.strings,i=!1;if(s===void 0)e=pe(this,e,n,0),i=!$e(e)||e!==this._$AH&&e!==_e,i&&(this._$AH=e);else{let o=e,u,l;for(e=s[0],u=0;u<s.length-1;u++)l=pe(this,o[t+u],n,u),l===_e&&(l=this._$AH[u]),i||=!$e(l)||l!==this._$AH[u],l===S?e=S:e!==S&&(e+=(l??"")+s[u+1]),this._$AH[u]=l}i&&!r&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ye=class extends fe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}},Ze=class extends fe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}},Ge=class extends fe{constructor(e,n,t,r,s){super(e,n,t,r,s),this.type=5}_$AI(e,n=this){if((e=pe(this,e,n,0)??S)===_e)return;let t=this._$AH,r=e===S&&t!==S||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,s=e!==S&&(t===S||r);r&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Je=class{constructor(e,n,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){pe(this,e)}};var Sn=Qe.litHtmlPolyfillSupport;Sn?.(ye,we),(Qe.litHtmlVersions??=[]).push("3.3.3");var z=(a,e,n)=>{let t=n?.renderBefore??e,r=t._$litPart$;if(r===void 0){let s=n?.renderBefore??null;t._$litPart$=r=new we(e.insertBefore(xe(),s),s,void 0,n??{})}return r._$AI(a),r};var kn=Object.keys(le);function En(a,e,n,t){let r=a.getState(),s=n.label||"text"in n&&n.text||le[n.kind],i=n.bind.type!=="none"?` \xB7 ${de[n.bind.type]}`:"",o=u=>l=>{l.stopPropagation(),a.getState().moveItem(e.id,n.id,u)};return b`<div class="ume-item-row ${t?"selected":""}"
    @click=${()=>a.getState().select(e.id,n.id)}>
    <span class="ume-item-icon">${bt[n.kind]}</span>
    <span class="ume-item-name" title=${s+i}>${s}${i}</span>
    <button class="ume-mini" title="上移" @click=${o(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${o(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${u=>{u.stopPropagation(),r.duplicateItem(e.id,n.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${u=>{u.stopPropagation(),r.removeItem(e.id,n.id)}}>✕</button>
  </div>`}function An(a,e){let n=a.getState();return b`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${t=>{let r=t.target.value;r&&n.addItem(r,e.id),t.target.value=""}}>
    <option value="">＋条目</option>
    ${kn.map(t=>b`<option value=${t}>${le[t]}</option>`)}
  </select>`}function Ht(a,e){let{project:n,selection:t}=e.getState(),r=s=>{let i=e.getState(),o=t.pageId===s.id;return b`<div class="ume-page">
      <div class="ume-page-head ${o?"selected":""}"
        @click=${()=>e.getState().select(s.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${s.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),i.movePage(s.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),i.movePage(s.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),n.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${s.name}"\uFF1F`)&&i.removePage(s.id)}}>✕</button>
      </div>
      ${o?b`<div class="ume-page-items">
        ${s.items.length?s.items.map(u=>En(e,s,u,t.itemId===u.id)):b`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${An(e,s)}</div>
      </div>`:S}
    </div>`};z(b`
    <div class="ume-panel-title">
      页面 / 条目 (${n.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Tn(e)}>＋ 页面</button>
    </div>
    ${n.pages.map(r)}
  `,a)}function Tn(a){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${a.getState().project.pages.length+1}`);e!==null&&a.getState().addPage(e||void 0)}function O(a,e,n,t=""){return b`<div class="ume-field">
    <label>${a}</label>
    <input type="text" .value=${e??""} placeholder=${t}
      @change=${r=>n(r.target.value)} />
  </div>`}function P(a,e,n,t=1){return b`<div class="ume-field">
    <label>${a}</label>
    <input type="number" .value=${String(e)} step=${String(t)}
      @change=${r=>{let s=parseFloat(r.target.value);n(Number.isFinite(s)?s:0)}} />
  </div>`}function Y(a,e,n,t){return b`<div class="ume-field">
    <label>${a}</label>
    <select @change=${r=>t(r.target.value)}>
      ${n.map(r=>b`<option value=${r.value} ?selected=${r.value===e}>${r.label}</option>`)}
    </select>
  </div>`}function Ie(a,e,n){return b`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${t=>n(t.target.checked)} />
    <span>${a}</span>
  </div>`}function Rt(a,e,n,t=!1){return b`<div class="ume-field wide">
    <label>${a}</label>
    <textarea style=${t?"font-family:Consolas,monospace":""}
      @change=${r=>n(r.target.value)}>${e??""}</textarea>
  </div>`}function Se(a,e,n="text/plain"){let t=new Blob([e],{type:`${n};charset=utf-8`}),r=document.createElement("a");r.href=URL.createObjectURL(t),r.download=a,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),5e3)}var nt=null,Kt={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function rt(a,e,n,t){let r=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...n.map(i=>({value:i.id,label:`${i.name} : ${Kt[i.type]??i.type}`}))],s=e?n.some(i=>i.id===e):!1;return b`
    ${Y(a,e??"",r,i=>t(i||null))}
    ${e&&!s?b`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:S}
    ${n.length===0?b`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:S}
  `}function it(a,e){return b`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let n=a.getState().addVariable();e(n)}}>＋ 新建变量并绑定</button>
  </div>`}function at(a){return a?b`<div class="ume-hint">
    ${a.name} : ${Kt[a.type]??a.type}，范围 ${a.min}~${a.max}，步长 ${a.step}，初值 ${a.initialValue}
    （在「资源」页修改变量）
  </div>`:b`${S}`}function jt(a,e,n){let{project:t,selection:r}=e.getState(),s=t.pages.find($=>$.id===r.pageId)??null,i=s?.items.find($=>$.id===r.itemId)??null,o=t.variables??[],u=t.chartBuffers??[],l=($,v)=>e.getState().updateItem(s.id,i.id,$,v),d=$=>l({bind:$}),c=b`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,m="";if(s&&!i)m="\u9875\u9762\u5C5E\u6027",c=b`
      ${O("\u540D\u79F0",s.name,$=>e.getState().updatePage(s.id,{name:$}))}
      ${O("C \u51FD\u6570\u540D",s.fnName,$=>e.getState().updatePage(s.id,{fnName:$}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      <div class="ume-hint">页面内的手写 C 代码请到生成的 menu_pages.c 的 USER CODE 区填写（重新生成时保留），编辑器不提供代码编辑</div>
    `;else if(s&&i){(i.bind.type==="value"||i.bind.type==="switch")&&i.bind.varId&&(nt=i.bind.varId),m=`${le[i.kind]}${i.bind.type!=="none"?` + ${de[i.bind.type]}`:""}`;let $=b``;switch(i.kind){case"text":{let g=i,f=o.find(R=>R.id===g.displayVarId);$=b`
          ${O("\u6587\u672C/\u683C\u5F0F",g.text,R=>l({text:R},`text-${g.id}`))}
          ${Y("\u5927\u5C0F",String(g.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],R=>l({scale:Number(R)}))}
          ${i.bind.type==="none"?b`
            ${rt("\u663E\u793A\u53D8\u91CF",g.displayVarId,o,R=>l({displayVarId:R}))}
            ${f?S:it(e,R=>l({displayVarId:R.id}))}
            ${at(f)}
            <div class="ume-hint">只读展示变量值（如传感器数据）；有附加值时直接显示被绑定的值</div>`:S}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break}case"slider":case"progress":{let g=i;$=b`
          ${i.bind.type==="none"?b`
            ${P("\u9759\u6001\u4F4D\u7F6E(%)",g.position,f=>l({position:Math.min(100,Math.max(0,Math.trunc(f)))}))}
            <div class="ume-hint">无附加值时显示静态位置；绑定数值变量后由变量值驱动</div>`:S}
        `;break}case"chart":{let g=i,f=V=>l({sources:V}),R=(V,F)=>{let q=u.find(K=>K.id===V.bufferId),te=V.min===void 0||V.max===void 0;return b`<div class="ume-var-item">
            <div class="ume-var-row">
              <span class="ume-var-name">${q?.name??"(\u65E0\u6548)"}</span>
              <span class="ume-var-meta">${{line:"\u6298\u7EBF",point:"\u6563\u70B9",bar:"\u67F1\u72B6"}[V.chartKind]??V.chartKind}${te?" \xB7 \u81EA\u52A8\u91CF\u7A0B":` \xB7 ${V.min}~${V.max}`}</span>
              <button class="ume-mini" title="移除该数据源" @click=${()=>f(g.sources.filter((K,C)=>C!==F))}>✕</button>
            </div>
            <div class="ume-var-edit">
              ${Y("\u7F13\u51B2\u533A",V.bufferId,u.map(K=>({value:K.id,label:`${K.name} (${K.dataLen}\u70B9)`})),K=>f(g.sources.map((C,I)=>I===F?{...C,bufferId:K}:C)))}
              ${Y("\u7ED8\u5236",V.chartKind,[{value:"line",label:"\u6298\u7EBF"},{value:"point",label:"\u6563\u70B9"},{value:"bar",label:"\u67F1\u72B6"}],K=>f(g.sources.map((C,I)=>I===F?{...C,chartKind:K}:C)))}
              ${Ie("\u81EA\u52A8\u91CF\u7A0B",te,K=>f(g.sources.map((C,I)=>I===F?{...C,min:K?void 0:0,max:K?void 0:100}:C)))}
              ${te?S:b`
                ${P("\u91CF\u7A0B\u4E0A\u9650",V.max??100,K=>f(g.sources.map((C,I)=>I===F?{...C,max:K}:C)),"any")}
                ${P("\u91CF\u7A0B\u4E0B\u9650",V.min??0,K=>f(g.sources.map((C,I)=>I===F?{...C,min:K}:C)),"any")}`}
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
        `;break}case"xbm":{let g=i;$=b`
          ${O("\u6570\u7EC4\u540D",g.name,f=>l({name:f}))}
          ${P("\u5BBD(px)",g.w,f=>l({w:Math.min(128,Math.max(1,Math.trunc(f)))}))}
          ${P("\u9AD8(px)",g.h,f=>l({h:Math.min(64,Math.max(1,Math.trunc(f)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>n.openXbmEditor(s.id,g.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${g.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let g=i;$=b`
          ${Rt("\u6587\u672C\u5185\u5BB9",g.content,f=>l({content:f}))}
          ${P("\u9AD8\u5EA6(px)",g.height,f=>l({height:Math.max(10,Math.trunc(f))}))}
          ${P("\u884C\u95F4\u8DDD",g.lineSpacing,f=>l({lineSpacing:Math.max(0,Math.trunc(f))}))}
          ${Ie("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",g.bindScroll,f=>l({bindScroll:f}))}
        `;break}case"board":{let g=i;$=b`
          ${P("\u5BBD(px)",g.w,f=>l({w:Math.max(1,Math.trunc(f))}))}
          ${P("\u9AD8(px)",g.h,f=>l({h:Math.max(1,Math.trunc(f))}))}
          ${O("\u56DE\u8C03\u51FD\u6570\u540D",g.cbName,f=>l({cbName:f}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}let v=i.bind,y=b``;switch(v.type){case"none":y=b`<div class="ume-hint">纯显示行。附加值是绘制前附加的绑定（数值编辑/开关/按钮/子页面跳转/返回），可与任意绘制类型组合。</div>`;break;case"value":{let g=o.find(f=>f.id===v.varId);y=b`
          ${rt("\u53D8\u91CF",v.varId,o,f=>d({type:"value",varId:f}))}
          ${g?S:it(e,f=>d({type:"value",varId:f.id}))}
          ${at(g)}
          ${i.kind==="text"?b`<div class="ume-hint">显示文本即 printf 格式串（如 音量:%d），确认后用 ＋/－ 键编辑</div>`:S}
        `;break}case"switch":{let g=o.filter(f=>f.type==="uint8").find(f=>f.id===v.varId)??o.find(f=>f.id===v.varId);y=b`
          ${rt("\u53D8\u91CF (uint8)",v.varId,o.filter(f=>f.type==="uint8"),f=>d({type:"switch",varId:f,openValue:v.openValue,onText:v.onText,offText:v.offText}))}
          ${g?S:it(e,f=>d({type:"switch",varId:f.id,openValue:v.openValue,onText:v.onText,offText:v.offText}))}
          ${at(g)}
          ${P("openValue",v.openValue,f=>d({type:"switch",varId:v.varId,openValue:Math.max(0,Math.trunc(f)),onText:v.onText,offText:v.offText}))}
          ${O('"\u5F00"\u6587\u672C',v.onText,f=>d({type:"switch",varId:v.varId,openValue:v.openValue,onText:f,offText:v.offText}))}
          ${O('"\u5173"\u6587\u672C',v.offText,f=>d({type:"switch",varId:v.varId,openValue:v.openValue,onText:v.onText,offText:f}))}
          <div class="ume-hint">开关需要 uint8 类型变量；显示文本含 %s 用于显示开/关</div>
        `;break}case"button":y=b`
          ${O("\u56DE\u8C03\u51FD\u6570\u540D",v.cbName,g=>d({type:"button",cbName:g,buttonId:v.buttonId}))}
          ${P("ID",v.buttonId,g=>d({type:"button",cbName:v.cbName,buttonId:Math.max(0,Math.trunc(g))}))}
          <div class="ume-hint">确认键触发回调（骨架生成到 USER CODE 区，逻辑在 IDE 里写）</div>
        `;break;case"submenu":y=b`
          ${Y("\u76EE\u6807\u9875\u9762",v.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...t.pages.filter(g=>g.id!==s.id).map(g=>({value:g.id,label:g.name}))],g=>d({type:"submenu",targetPageId:g||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内加一个「附加值=返回」的条目用于返回</div>
        `;break;case"back":y=b`<div class="ume-hint">确认键返回上级页面（u8g2_MenuItem_menu_back）</div>`;break}c=b`
      <div class="ume-panel-title">绘制</div>
      ${$}
      <div class="ume-panel-title">附加值</div>
      ${Y("\u7C7B\u578B",v.type,Object.keys(de).map(g=>({value:g,label:de[g]})),g=>{let f=i.bind;d(g==="value"?{type:"value",varId:f.type==="value"||f.type==="switch"?f.varId:nt}:g==="switch"?{type:"switch",varId:f.type==="value"||f.type==="switch"?f.varId:nt,openValue:1,onText:"on",offText:"off"}:g==="button"?{type:"button",cbName:"btn_action_cb",buttonId:1}:g==="submenu"?{type:"submenu",targetPageId:f.type==="submenu"?f.targetPageId:null}:{type:"none"})})}
      ${y}
    `}z(b`
    ${m?b`<div class="ume-panel-title"><span class="ume-kind-badge">${m}</span></div>`:S}
    ${c}
  `,a)}var He=null,st=null,Mn=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function Cn(a,e){let n=e.variables??[],t=s=>{He=He===s?null:s},r=s=>{let i=He===s.id,o=(m,$)=>a.getState().updateVariable(s.id,m,$),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),l=s.name&&!u&&!qe(s.name),d=n.filter(m=>m.name===s.name).length>1,c=Pn(e,s.id);return b`<div class="ume-var-item ${i?"editing":""}">
      <div class="ume-var-row" @click=${()=>t(s.id)}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.type} · ${s.min}~${s.max} · 步${s.step}${c?` \xB7 ${c} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${m=>{m.stopPropagation();let $=a.getState().removeVariable(s.id);$>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${$} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${i?b`<div class="ume-var-edit">
        ${O("\u53D8\u91CF\u540D",s.name,m=>o({name:m.trim()},`vn-${s.id}`))}
        ${u?b`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:S}
        ${l?b`<div class="ume-warn">变量名是 C 关键字，生成的代码会自动改名（如 ${s.name}_），建议换个名字</div>`:S}
        ${d?b`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:S}
        ${Y("\u7C7B\u578B",s.type,Mn,m=>o({type:m}))}
        ${P("\u521D\u59CB\u503C",s.initialValue,m=>o({initialValue:m},`vi-${s.id}`),"any")}
        ${P("\u6700\u5C0F\u503C",s.min,m=>o({min:m},`vmin-${s.id}`),"any")}
        ${P("\u6700\u5927\u503C",s.max,m=>o({max:m},`vmax-${s.id}`),"any")}
        ${P("\u6B65\u957F",s.step,m=>o({step:m},`vs-${s.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:S}
    </div>`};return b`
    <div class="ume-panel-title">
      变量 (${n.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{He=a.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${n.length?n.map(r):b`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function Pn(a,e){let n=0;for(let t of a.pages)for(let r of t.items)"varId"in r&&r.varId===e&&n++;return n}function Vn(a,e){let n=e.chartBuffers??[],t=s=>{let i=0;for(let o of e.pages)for(let u of o.items)u.kind==="chart"&&u.sources.some(l=>l.bufferId===s)&&i++;return i},r=s=>{let i=st===s.id,o=(c,m)=>a.getState().updateChartBuffer(s.id,c,m),u=s.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(s.name),l=s.name&&!u&&!qe(s.name),d=t(s.id);return b`<div class="ume-var-item ${i?"editing":""}">
      <div class="ume-var-row" @click=${()=>{st=i?null:s.id}}>
        <span class="ume-var-name" title=${s.name}>${s.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${s.dataLen} 点 · ${{sine:"\u6B63\u5F26",ramp:"\u659C\u5761",noise:"\u4F2A\u968F\u673A",none:"\u624B\u52A8\u586B\u5145"}[s.sample]}${d?` \xB7 ${d} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除缓冲区" @click=${c=>{c.stopPropagation();let m=a.getState().removeChartBuffer(s.id);m>0&&alert(`\u8BE5\u7F13\u51B2\u533A\u88AB ${m} \u4E2A\u56FE\u8868\u6761\u76EE\u7684\u6570\u636E\u6E90\u5F15\u7528\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u79FB\u9664\u6570\u636E\u6E90\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${i?b`<div class="ume-var-edit">
        ${O("\u6570\u7EC4\u540D",s.name,c=>o({name:c.trim()},`bn-${s.id}`))}
        ${u?b`<div class="ume-warn">数组名不是合法的 C 标识符，生成时会自动清洗</div>`:S}
        ${l?b`<div class="ume-warn">数组名是 C 关键字，生成的代码会自动改名（如 ${s.name}_），建议换个名字</div>`:S}
        ${P("\u70B9\u6570",s.dataLen,c=>o({dataLen:Math.min(512,Math.max(2,Math.trunc(c)))},`bl-${s.id}`))}
        ${Y("\u793A\u4F8B\u586B\u5145",s.sample,[{value:"sine",label:"\u6B63\u5F26\uFF08\u6F14\u793A\uFF09"},{value:"ramp",label:"\u659C\u5761\uFF08\u6F14\u793A\uFF09"},{value:"noise",label:"\u4F2A\u968F\u673A\uFF08\u6F14\u793A\uFF09"},{value:"none",label:"\u4E0D\u586B\u5145\uFF08\u5168\u90E8\u624B\u5199\uFF09"}],c=>o({sample:c}))}
        <div class="ume-hint">真实数据在生成的 buf_xxx_fill() 或主循环里写 buf_xxx[i]；dis 显示缓冲由生成器自动分配</div>
      </div>`:S}
    </div>`};return b`
    <div class="ume-panel-title">
      数据源缓冲区 (${n.length})
      <button class="ume-mini" title="新建缓冲区" @click=${()=>{st=a.getState().addChartBuffer().id}}>＋ 新建</button>
    </div>
    ${n.length?n.map(r):b`<div class="ume-empty-hint">
      图表的数据源缓冲区（float 数组）。手动创建后，在图表条目的属性里绑定——
      多个图表条目可共用同一缓冲区，多个缓冲区可叠加显示。
    </div>`}
  `}function Ut(a,e){let{project:n}=e.getState();z(b`
    ${Cn(e,n)}
    ${Vn(e,n)}
  `,a)}function Dt(a,e){let{project:n}=e.getState(),t=(o,u)=>e.getState().update(l=>{Object.assign(l,o)},u),r=n.weakHooks??[],s=(o,u)=>{e.getState().update(l=>{let d=l.weakHooks??[];l.weakHooks=u?[...new Set([...d,o])]:d.filter(c=>c!==o)})},i=b`
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
    ${O("\u5DE5\u7A0B\u540D",n.name,o=>t({name:o}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${n.width}×${n.height}
        ${n.width!==128||n.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${Y("\u5B57\u4F53",n.font,Fe.map(o=>({value:o.id,label:o.label})),o=>t({font:o}))}
    ${Ie("\u4E2D\u6587\u73B0\u573A\u53D6\u6A21\uFF08\u4EC5\u5305\u542B\u7528\u5230\u7684\u5B57\u5F62\uFF09",n.fontSubset,o=>t({fontSubset:o}))}
    ${n.fontSubset?b`
      ${O("\u989D\u5916\u5305\u542B\u5B57\u7B26",n.fontExtra,o=>t({fontExtra:o}))}
      ${(()=>{let o=Ve(me(n,n.fontExtra));return b`<div class="ume-hint">当前收录 ${o.total} 个字符（ASCII ${o.ascii} + 中文等扩展 ${o.cjk}）；
        运行时输出超出字符集的中文将无法显示，可在上面补充额外字符后重新生成</div>`})()}`:S}
    ${Y("\u9009\u62E9\u5668",n.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],o=>t({selector:o}))}
    ${P("\u5DE6\u8FB9\u8DDD",n.selectorLeftMargin,o=>t({selectorLeftMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u9876\u8FB9\u8DDD",n.selectorTopMargin,o=>t({selectorTopMargin:Math.max(0,Math.trunc(o))}))}
    ${P("\u884C\u95F4\u8DDD",n.selectorLineSpacing,o=>t({selectorLineSpacing:Math.max(0,Math.trunc(o))}))}
    ${P("\u8DD1\u9A6C\u706F\u901F\u5EA6",n.marqueeSpeed,o=>t({marqueeSpeed:Math.max(0,o)}),.05)}
    ${P("\u8DD1\u9A6C\u706F\u505C\u7559",n.marqueeHeaderLen,o=>t({marqueeHeaderLen:Math.max(0,o)}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${i}
  `,a)}function Ft(a,e){let n=r=>{let s,i=()=>{s&&(clearInterval(s),s=void 0)};return{down:o=>{o.preventDefault(),e.key(r),i(),s=window.setInterval(()=>e.key(r),180)},up:i}},t=(r,s,i)=>{let o=n(r);return b`<button class="ume-key" title=${i}
      @pointerdown=${o.down} @pointerup=${o.up} @pointerleave=${o.up}>${s}</button>`};z(b`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${r=>{let i={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[r.key];i!==void 0&&(r.preventDefault(),e.key(i))}}>
      ${e.canvas}
    </div>
    <div class="ume-keybar">
      ${t(1,"\u25B2","\u4E0A MENU_Key_Up")}
      ${t(2,"\u25BC","\u4E0B MENU_Key_Down")}
      ${t(3,"OK","\u786E\u8BA4 MENU_Key_Enter")}
      ${t(4,"\u232B","\u8FD4\u56DE MENU_Key_Return")}
      ${t(5,"\uFF0B","\u52A0 MENU_Key_Add")}
      ${t(6,"\uFF0D","\u51CF MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <select id="ume-page-jump" title="预览跳转到指定页" style="max-width:120px"></select>
      <span id="ume-live-value"></span>
    </div>
  `,a)}function zt(a,e){a.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove());let n=document.createElement("div");n.className="ume-modal-mask",n.addEventListener("click",t=>{t.target===n&&Ot(n)}),z(b`
    <div class="ume-modal wide">
      <div class="ume-modal-head">
        <span>生成 C 代码（单文件 menu_pages.c）</span>
        <button class="ume-mini" @click=${()=>Ot(n)}>✕</button>
      </div>
      <div class="ume-modal-body">
        ${e.warnings.length?b`
          <div style="margin-bottom:8px">
            ${e.warnings.map(t=>b`<div class="ume-warn">⚠ ${t}</div>`)}
          </div>`:S}
        <div class="ume-code-view">${e.c}</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(e.c).then(()=>Nn(n,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
        <button class="ume-btn primary" @click=${()=>{Se("menu_pages.c",e.c)}}>下载 menu_pages.c</button>
      </div>
    </div>
  `,n),a.appendChild(n)}function Ot(a){a.remove()}function Nn(a,e){let n=a.closest(".ume")??document.body,t=n.querySelector(".ume-toast");t||(t=document.createElement("div"),t.className="ume-toast",n.appendChild(t)),t.textContent=e,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),1600)}function Wt(a,e,n,t){let i=e.getState().project.pages.find(I=>I.id===n)?.items.find(I=>I.id===t);if(!i||i.kind!=="xbm")return;let o=i,u=o.w,l=o.h,d=[...o.bits],c=()=>Math.ceil(u/8),m=document.createElement("div");m.className="ume-modal-mask",m.addEventListener("click",I=>{I.target===m&&C()});let $=(I,N)=>{let U=N*c()+(I>>3);return U<d.length?!!(d[U]>>(I&7)&1):!1},v=(I,N,U)=>{let ne=N*c()+(I>>3);d[ne]=U?d[ne]|1<<(I&7):d[ne]&~(1<<(I&7))},y=(I,N)=>{let U=Math.ceil(u/8),ne=Math.ceil(I/8),ke=new Array(ne*N).fill(0);for(let x=0;x<Math.min(l,N);x++)for(let J=0;J<Math.min(u,I);J++){let Re=x*U+(J>>3);Re<d.length&&d[Re]>>(J&7)&1&&(ke[x*ne+(J>>3)]|=1<<(J&7))}u=I,l=N,d=ke},g=!1,f=!0,R=(I,N)=>U=>{U.preventDefault(),g=!0,f=!$(I,N),v(I,N,f),q()},V=(I,N)=>()=>{g&&(v(I,N,f),q())},F=()=>{g=!1},q=()=>{z(K(),m)},te=()=>{let I=[];for(let N=0;N<l;N++)for(let U=0;U<u;U++)I.push(b`<button class="ume-xbm-cell ${$(U,N)?"on":""}"
          data-x=${U} data-y=${N}
          @pointerdown=${R(U,N)}
          @pointerenter=${V(U,N)}></button>`);return I},K=()=>b`
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
            @change=${I=>{y(qt(+I.target.value,1,128),l),q()}} />
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="64"
            @change=${I=>{y(u,qt(+I.target.value,1,64)),q()}} />
          <button class="ume-btn sm" @click=${()=>{d=d.map(()=>0),q()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{d=d.map(I=>~I&255),q()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${te()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${o.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${C}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(n,t,{w:u,h:l,bits:[...d]}),C()}}>应用</button>
      </div>
    </div>
  `;function C(){m.remove(),document.removeEventListener("pointerup",F)}document.addEventListener("pointerup",F),q(),a.appendChild(m)}function qt(a,e,n){return Number.isFinite(a)?Math.min(n,Math.max(e,Math.trunc(a))):e}var Bn="prebuilt/u8g2-menu-preview.js",ot=class{constructor(e,n={}){this.store=ht();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;this.activateRightTab=()=>{};if(this.container=e,this.opts={persistKey:"default",...n},e.classList.add("ume"),!document.getElementById("ume-style")){let m=document.createElement("style");m.id="ume-style",m.textContent=lt,document.head.appendChild(m)}let t=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,r=this.opts.data??t??void 0;if(r!==void 0)try{this.store.setState({project:Me(r)})}catch(m){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",m)}let s=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null;s&&(this.lastExport={c:s}),e.innerHTML=`
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
    `;let i=m=>e.querySelector(m);this.els={left:i(".ume-left"),center:i(".ume-center"),right:i(".ume-right"),propEl:i('[data-role="prop"]'),resEl:i('[data-role="res"]'),setEl:i('[data-role="set"]'),toolbarUndo:i('[data-act="undo"]'),toolbarRedo:i('[data-act="redo"]')};let o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.alignItems="center",o.style.gap="10px",this.els.center.appendChild(o),this.preview=new Ne(o,{onPageChanged:m=>this.onPreviewPageChanged(m)});let u=document.createElement("div");this.els.center.appendChild(u),Ft(u,this.preview),this.preview.load(this.opts.wasmUrl??Bn).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(m=>{console.error(m);let $=document.createElement("div");$.className="ume-warn",$.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${m.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend($)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let m=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);m!==null&&this.store.getState().addPage(m||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{Se(`${this.store.getState().project.name||"menu-project"}.json`,ze(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{i('[data-role="file"]').click()}),i('[data-role="file"]').addEventListener("change",m=>{let $=m.target.files?.[0];$&&($.text().then(v=>{try{let y=Me(v);this.store.getState().update(g=>{Object.assign(g,y)}),this.scheduleRender()}catch(y){alert(`\u5BFC\u5165\u5931\u8D25: ${y.message}`)}}),m.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate());let l=e.querySelectorAll(".ume-tabs button"),d=m=>{l.forEach($=>$.classList.toggle("active",$.dataset.tab===m)),this.els.propEl.style.display=m==="prop"?"":"none",this.els.resEl.style.display=m==="res"?"":"none",this.els.setEl.style.display=m==="set"?"":"none"};l.forEach(m=>{m.addEventListener("click",()=>d(m.dataset.tab??"prop"))}),this.activateRightTab=d,this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null);let c=null;this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange();let m=this.store.getState().selection.itemId;m&&m!==c&&this.activateRightTab("prop"),c=m}),this.scheduleRender(),this.persist(),this.liveTimer=window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let n=Me(e);this.store.getState().update(t=>{Object.assign(t,n)}),this.store.getState().select(n.pages[0]?.id??null,null)}generate(){let e=this.produceCode();return zt(this.container,e),this.opts.onExport?.(e),e}downloadC(){let e=this.produceCode();Se("menu_pages.c",e.c)}produceCode(){let e=this.lastExport,n=this.store.getState().project,t,r=[];if(n.fontSubset){if(!this.preview.ready)r.push("\u73B0\u573A\u53D6\u6A21\u9700\u8981\u9884\u89C8\u5F15\u64CE\uFF0C\u5F53\u524D\u5F15\u64CE\u4E0D\u53EF\u7528\uFF1A\u672C\u6B21\u672A\u751F\u6210 menu_font\uFF0C\u4EE3\u7801\u5C06\u5F15\u7528\u5185\u7F6E\u5B57\u4F53");else{let o=me(n,n.fontExtra),u=this.buildFontSubset(n,o);if("error"in u)r.push(`${u.error}\uFF0C\u672C\u6B21\u6309\u5185\u7F6E\u5B57\u4F53\u751F\u6210`);else{t=u.result.font;let l=Ve(o);if(r.push(`\u73B0\u573A\u53D6\u6A21\uFF1A\u6536\u5F55 ${l.total} \u4E2A\u5B57\u7B26\uFF08ASCII ${l.ascii} + \u6269\u5C55 ${l.cjk}\uFF09\uFF0C\u5B57\u4F53\u6570\u7EC4 ${u.result.font.length} \u5B57\u8282\u3002\u8FD0\u884C\u65F6\u82E5\u8F93\u51FA\u8D85\u51FA\u5B57\u7B26\u96C6\u7684\u4E2D\u6587\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u91CC\u8865\u5145\u989D\u5916\u5B57\u7B26`),u.result.included>255&&r.push(`\u5B50\u96C6\u5B57\u5F62\u6570 ${u.result.included} \u8D85\u8FC7 255\uFF1A\u5B57\u4F53\u5934 glyph_cnt \u5B57\u6BB5\u5C06\u56DE\u7ED5\uFF08\u8BB0\u5F55\u4E3A ${u.result.included&255}\uFF09\uFF0C\u5982\u9047\u6E32\u67D3\u5F02\u5E38\u8BF7\u5728"\u989D\u5916\u5305\u542B\u5B57\u7B26"\u91CC\u7CBE\u7B80`),u.result.missing.length){let d=u.result.missing.slice(0,5).map(c=>String.fromCodePoint(c)).join(" ");r.push(`\u5B57\u7B26\u96C6\u4E2D ${u.result.missing.length} \u4E2A\u5B57\u7B26\u672A\u5728\u6E90\u5B57\u4F53\u4E2D\u627E\u5230\uFF08\u5982 ${d}\uFF09\uFF0C\u8FD0\u884C\u65F6\u8FD9\u4E9B\u5B57\u7B26\u65E0\u6CD5\u663E\u793A`)}}}let i=this.preview.fontApplyWarning;i&&r.push(i)}let s=yt(n,e??void 0,t);return s.warnings.unshift(...r),this.lastExport={c:s.c},this.opts.persistKey&&localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,s.c),s}buildFontSubset(e,n){let t=this.preview.fontIndex(e.font),r=this.preview.getFontBytes(t),s=this.preview.glyphFetcher(t);if(!r||!s)return{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u65E0\u6CD5\u8BFB\u53D6\u6E90\u5B57\u4F53\u6570\u636E"};let i=Pe(r,n,s);return i?{result:i}:{error:"\u73B0\u573A\u53D6\u6A21\u5931\u8D25\uFF1A\u5B57\u7B26\u96C6\u672A\u547D\u4E2D\u4EFB\u4F55\u5B57\u5F62"}}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.liveTimer!==void 0&&window.clearInterval(this.liveTimer),clearTimeout(this.saveTimer),clearTimeout(this.changeTimer),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let n=e.target;n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let n=this.store.getState().project.pages[e];n&&this.store.getState().select(n.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,ze(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();Ht(this.els.left,this.store),Dt(this.els.setEl,this.store),Ut(this.els.resEl,this.store),jt(this.els.propEl,this.store,{openXbmEditor:(n,t)=>Wt(this.container,this.store,n,t)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),n=document.getElementById("ume-page-jump"),t=this.store.getState(),r=this.store.getState().project.pages.findIndex(s=>s.id===t.selection.pageId);if(n){let s=t.project.pages,i=s.map(u=>u.name).join("|");n.dataset.sig!==i&&(n.dataset.sig=i,n.innerHTML="",s.forEach((u,l)=>{let d=document.createElement("option");d.value=String(l),d.textContent=`${l+1}. ${u.name}`,n.appendChild(d)}),n.onchange=()=>{let u=parseInt(n.value,10);Number.isFinite(u)&&this.preview.navTo(u)});let o=this.preview.currentPage;document.activeElement!==n&&n.value!==String(o)&&(n.value=String(o))}if(e&&r>=0&&t.selection.itemId){let s=t.project.pages[r],i=s.items.findIndex(m=>m.id===t.selection.itemId),o=s.items[i],u=o?.bind,l=u?.type==="value"||u?.type==="switch"?u.varId:null,d=o?.kind==="text"&&u?.type==="none"?o.displayVarId:null,c=l??d;if(o&&c){let m=(t.project.variables??[]).findIndex(f=>f.id===c),$=m>=0?m:r*St+i,y=u?.type==="switch"?this.preview.getSwitch($):this.preview.getInt($),g=(t.project.variables??[]).find(f=>f.id===c)?.name;e.textContent=`${g??o.kind} = ${y}`}else e.textContent=""}}};return en(Ln);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
