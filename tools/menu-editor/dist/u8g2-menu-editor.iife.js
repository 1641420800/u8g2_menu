"use strict";var U8G2MenuEditor=(()=>{var we=Object.defineProperty;var _t=Object.getOwnPropertyDescriptor;var $t=Object.getOwnPropertyNames;var yt=Object.prototype.hasOwnProperty;var wt=(r,e)=>{for(var t in e)we(r,t,{get:e[t],enumerable:!0})},It=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of $t(e))!yt.call(r,a)&&a!==t&&we(r,a,{get:()=>e[a],enumerable:!(n=_t(e,a))||n.enumerable});return r};var kt=r=>It(we({},"__esModule",{value:!0}),r);var en={};wt(en,{MenuEditor:()=>Fe,MenuKey:()=>xe});var ze=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
.ume-var-edit { padding: 6px 8px; border-top: 1px solid var(--ume-border); }`;var qe=r=>{let e,t=new Set,n=(d,l)=>{let m=typeof d=="function"?d(e):d;if(!Object.is(m,e)){let g=e;e=l??(typeof m!="object"||m===null)?m:Object.assign({},e,m),t.forEach(x=>x(e,g))}},a=()=>e,s={setState:n,getState:a,getInitialState:()=>u,subscribe:d=>(t.add(d),()=>t.delete(d))},u=e=r(n,a,s);return s},Xe=r=>r?qe(r):qe;var Ie=0;function N(r){return Ie=(Ie+1)%1e9,`${r}_${Date.now().toString(36)}_${Ie.toString(36)}`}function se(r){return{id:N("vb"),name:"var_new",type:"int32",initialValue:0,min:0,max:100,step:1,...r}}function Ze(r,e){let t=new Set(r.map(a=>a.name));if(!t.has(e))return e;let n=2;for(;t.has(`${e}_${n}`);)n++;return`${e}_${n}`}function R(r){let e={id:N("it"),label:""};switch(r){case"text":return{...e,kind:r,text:"\u83DC\u5355\u9879",scale:1};case"number":return{...e,kind:r,text:"v:%d",scale:1,varId:null,editable:!0};case"switch":return{...e,kind:r,text:"s:%s",scale:1,varId:null,openValue:1,onText:"on",offText:"off"};case"button":return{...e,kind:r,text:"\u6267\u884C\u64CD\u4F5C",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...e,kind:r,text:"\u4E0B\u4E00\u7EA7",scale:1,targetPageId:null};case"back":return{...e,kind:r,text:"\u8FD4\u56DE",scale:1};case"slider":return{...e,kind:r,varId:null};case"progress":return{...e,kind:r,varId:null};case"chart":return{...e,kind:r,chartKind:"line",dataLen:24,height:32,sample:"sine"};case"xbm":return St(16,16);case"textarea":return{...e,kind:r,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:r,w:64,h:32,cbName:"board_cb"}}}function St(r,e){let t=Math.ceil(r/8);return{id:N("it"),kind:"xbm",label:"",name:"icon",w:r,h:e,bits:new Array(t*e).fill(0)}}function We(r){return{id:N("pg"),name:r,fnName:"",items:[],userCodePre:""}}function Y(r,e){return{...r,...e}}function Ye(){let r=[se({name:"var_value",type:"int32",initialValue:50,min:0,max:100,step:1}),se({name:"var_switch",type:"uint8",initialValue:0,min:0,max:1,step:1}),se({name:"var_slider",type:"int32",initialValue:50,min:0,max:100,step:2})],e=We("\u4E3B\u9875");e.items=[Y(R("text"),{text:"u8g2_menu"}),Y(R("submenu"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E"}),Y(R("button"),{text:"\u5173\u4E8E",cbName:"btn_about_cb"})];let t=We("\u8BBE\u7F6E");t.items=[Y(R("number"),{text:"\u97F3\u91CF:%d",varId:r[0].id}),Y(R("switch"),{text:"\u5F00\u5173:%s",varId:r[1].id}),Y(R("slider"),{varId:r[2].id}),R("back")];let n={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,weakHooks:[],variables:r,pages:[e,t]};return e.items[1].targetPageId=t.id,n}function Ge(r){return structuredClone(r)}var Et=800;function ke(){let r=null,e=0;return Xe()((t,n)=>({project:Ye(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(a,o)=>{let i=Date.now(),s=!!o&&o===r&&i-e<Et;r=o??null,e=i,t(u=>{let d=Ge(u.project);return a(d),{project:d,dirty:!0,past:s?u.past:[...u.past.slice(-99),u.project],future:[]}})},undo:()=>{t(a=>a.past.length?{project:a.past[a.past.length-1],past:a.past.slice(0,-1),future:[a.project,...a.future.slice(0,99)],dirty:!0}:a)},redo:()=>{t(a=>{if(!a.future.length)return a;let[o,...i]=a.future;return{project:o,past:[...a.past,a.project],future:i,dirty:!0}})},select:(a,o=null)=>t({selection:{pageId:a,itemId:o}}),addPage:a=>{let o={id:N("pg"),name:a??`\u9875\u9762${n().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return n().update(i=>{i.pages.push(o)}),t({selection:{pageId:o.id,itemId:null}}),o},removePage:a=>{n().update(i=>{i.pages=i.pages.filter(s=>s.id!==a);for(let s of i.pages)for(let u of s.items)u.kind==="submenu"&&u.targetPageId===a&&(u.targetPageId=null)});let{selection:o}=n();o.pageId===a&&t({selection:{pageId:null,itemId:null}})},movePage:(a,o)=>{n().update(i=>{let s=i.pages.findIndex(d=>d.id===a),u=s+o;s<0||u<0||u>=i.pages.length||([i.pages[s],i.pages[u]]=[i.pages[u],i.pages[s]])})},updatePage:(a,o)=>{n().update(i=>{let s=i.pages.find(u=>u.id===a);s&&Object.assign(s,o)})},addItem:(a,o)=>{let i=o??n().selection.pageId??n().project.pages[0]?.id;if(!i)return null;let s=At(a);return n().update(u=>{u.pages.find(l=>l.id===i)?.items.push(s)}),t({selection:{pageId:i,itemId:s.id}}),s},removeItem:(a,o)=>{n().update(s=>{let u=s.pages.find(d=>d.id===a);u&&(u.items=u.items.filter(d=>d.id!==o))});let{selection:i}=n();i.itemId===o&&t({selection:{pageId:a,itemId:null}})},moveItem:(a,o,i)=>{n().update(s=>{let u=s.pages.find(m=>m.id===a);if(!u)return;let d=u.items.findIndex(m=>m.id===o),l=d+i;d<0||l<0||l>=u.items.length||([u.items[d],u.items[l]]=[u.items[l],u.items[d]])})},duplicateItem:(a,o)=>{let i=null;n().update(s=>{let u=s.pages.find(l=>l.id===a);if(!u)return;let d=u.items.findIndex(l=>l.id===o);d<0||(i=structuredClone(u.items[d]),i.id=N("it"),u.items.splice(d+1,0,i))}),i&&t({selection:{pageId:a,itemId:i.id}})},updateItem:(a,o,i,s)=>{n().update(u=>{let l=u.pages.find(m=>m.id===a)?.items.find(m=>m.id===o);l&&Object.assign(l,i)},s)},addVariable:a=>{let o=null;return n().update(i=>{i.variables=i.variables??[];let s=Ze(i.variables,a?.name??"var_new");o=se({...a,name:s}),i.variables.push(o)}),o},removeVariable:a=>{let o=0;for(let i of n().project.pages)for(let s of i.items)"varId"in s&&s.varId===a&&o++;return o>0?o:(n().update(i=>{i.variables=(i.variables??[]).filter(s=>s.id!==a)}),0)},updateVariable:(a,o,i)=>{n().update(s=>{let u=(s.variables??[]).find(d=>d.id===a);u&&Object.assign(u,o)},i)}}))}var un=ke();function At(r){return R(r)}var B=[{fn:"u8g2_menuItemEnter_weak",label:"\u5149\u6807\u8FDB\u5165\u67D0\u884C",desc:"\u9009\u4E2D\u884C\u5207\u6362\u5230\u65B0\u884C\u53F7\u7684\u77AC\u95F4\u89E6\u53D1\u3002\u9002\u5408\u505A\u63D0\u793A\u97F3\u3001\u8054\u52A8\u5916\u8BBE\u7B49\u3002",decl:"void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuItemLeave_weak",label:"\u5149\u6807\u79BB\u5F00\u67D0\u884C",desc:"\u5149\u6807\u79BB\u5F00\u67D0\u4E00\u884C\u65F6\u89E6\u53D1\uFF08item = \u79BB\u5F00\u7684\u884C\u53F7\uFF09\u3002",decl:"void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)",bodyArgs:`(void)u8g2_menu;
    (void)item;`},{fn:"u8g2_menuValueAdd_weak",label:"\u6570\u503C\u52A0\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u52A0"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueAdd_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueSub_weak",label:"\u6570\u503C\u51CF\u4E00\u6B65",desc:'\u6B63\u5728\u7F16\u8F91\u7684\u503C\u88AB"\u51CF"\u4E00\u6B65\u540E\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002',decl:"void u8g2_menuValueSub_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuValueChange_weak",label:"\u6570\u503C\u53D8\u5316\uFF08\u63A8\u8350\uFF09",desc:"\u503C\u88AB\u52A0\u6216\u51CF\u4E4B\u540E\u90FD\u4F1A\u89E6\u53D1\uFF08p = \u53D8\u91CF\u5730\u5740\uFF09\u3002\u60F3\u628A\u6539\u52A8\u5B9E\u65F6\u5199\u5165\u786C\u4EF6\uFF08DAC/PWM/\u97F3\u91CF\uFF09\u7528\u8FD9\u4E2A\u5373\u53EF\u3002",decl:"void u8g2_menuValueChange_weak(void *p)",bodyArgs:"(void)p;"},{fn:"u8g2_menuKeyEvent_weak",label:"\u6309\u952E\u4E8B\u4EF6\uFF08\u53EF\u6539\u952E\uFF09",desc:"\u4EFB\u610F\u6309\u952E\u89E6\u53D1\u3002\u4FEE\u6539 *u8g2_menuKeyValue \u53EF\u4EE5\u628A\u67D0\u4E2A\u952E\u66FF\u6362\u6210\u5176\u4ED6\u529F\u80FD\u3002",decl:"void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"u8g2_menuCharEvent_weak",label:"\u5B57\u7B26\u8F93\u5165",desc:"\u5B57\u7B26\u4E32\u7F16\u8F91\u6761\u76EE\uFF08u8g2_MenuItem_str\uFF09\u6536\u5230\u5B57\u7B26\u65F6\u89E6\u53D1\uFF0C\u53EF\u4FEE\u6539 *c \u8FC7\u6EE4\u8F93\u5165\u3002",decl:"void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c)",bodyArgs:`(void)u8g2_menu;
    (void)c;`},{fn:"menuEventUserHandle_weak",label:"\u4E8B\u4EF6\u8FC7\u6EE4\u5668",desc:"\u4E8B\u4EF6\u961F\u5217\u5206\u53D1\u524D\u8C03\u7528\u3002\u8FD4\u56DE 1 = \u8BE5\u4E8B\u4EF6\u7531\u4F60\u5904\u7406\uFF0C\u5E93\u4E0D\u518D\u5904\u7406\uFF1B\u8FD4\u56DE 0 = \u4EA4\u7ED9\u5E93\u3002",decl:"uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)",bodyArgs:`(void)u8g2_menu;
    (void)eventItem;`,retNote:"return 0;"},{fn:"menuEventUserKey_weak",label:"\u81EA\u5B9A\u4E49\u6309\u952E",desc:"MENU_Key_USER_1~6 \u6309\u4E0B\u65F6\u89E6\u53D1\uFF1B\u9ED8\u8BA4 6 \u4E2A\u529F\u80FD\u952E\uFF08\u4E0A\u4E0B/\u786E\u8BA4/\u8FD4\u56DE/\u52A0/\u51CF\uFF09\u4E0D\u4F1A\u8FDB\u5165\u8FD9\u91CC\u3002",decl:"void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`},{fn:"menuEventKey_weak",label:"\u6309\u952E\u62E6\u622A",desc:'\u4EFB\u610F\u6309\u952E\u7684"\u6700\u524D\u54E8"\u3002\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u88AB\u4F60\u5904\u7406\uFF08\u53EF\u505A\u5168\u5C40\u5FEB\u6377\u952E\uFF09\uFF1B\u8FD4\u56DE 0 = \u7EE7\u7EED\u4EA4\u7ED9\u5E93\u5206\u53D1\u3002',decl:"uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`,retNote:"return 0;"},{fn:"menuEventKeyPre_weak",label:"\u6309\u952E\u9884\u5904\u7406\uFF08\u6539\u952E\u6620\u5C04\uFF09",desc:'\u6309\u952E\u5206\u53D1\u524D\u4FEE\u6539\u952E\u503C\u3002\u6CE8\u610F\uFF1A\u91CD\u5199\u5B83\u4F1A\u8986\u76D6\u5E93\u9ED8\u8BA4\u7684"\u7F16\u8F91\u72B6\u6001\u4E0B \u4E0A/\u4E0B/\u786E\u8BA4 \u2192 \u52A0/\u51CF/\u8FD4\u56DE"\u6620\u5C04\uFF0C\u9700\u81EA\u884C\u5904\u7406\u3002',decl:"void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)",bodyArgs:`(void)u8g2_menu;
    (void)u8g2_menuKeyValue;`}],G={text:"\u6587\u672C",number:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE\u4E0A\u7EA7",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},Je={text:"T",number:"#",switch:"\u25C9",button:"\u23CE",submenu:"\u2192",back:"\u2190",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},Se=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var D=class extends Error{},Qe=new Set(["uint8","uint16","uint32","int8","int16","int32","int","float","double"]);function he(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function C(r,e){return typeof r=="string"?r:e}function E(r,e){return typeof r=="number"&&Number.isFinite(r)?r:e}var Tt=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function Mt(r){if(!he(r))throw new D("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=r.kind;if(typeof e!="string"||!Tt.includes(e))throw new D(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(r);switch(t.id=C(r.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=C(r.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=C(r.text,""),t.scale=r.scale===2?2:1;break}return t}function Pt(r){if(!he(r))throw new D("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(r.items)?r.items.map(Mt):[];return{id:C(r.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:C(r.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:C(r.fnName,""),items:e,userCodePre:C(r.userCodePre,"")}}function Nt(r){if(!he(r))return null;let e=C(r.type,"int32");return{id:C(r.id,"")||N("vb"),name:C(r.name,""),type:Qe.has(e)?e:"int32",initialValue:E(r.initialValue,0),min:E(r.min,0),max:E(r.max,100),step:E(r.step,1)}}function Ct(r){let e=new Map,t=[],n=(a,o)=>{let i=e.get(a);return i||(i=o(),e.set(a,i),t.push(i)),i};for(let a of r)for(let o of a.items){let i=o;switch(o.kind){case"number":if(i.varId===void 0||i.varId===null){let s=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",u=n(s,()=>({id:N("vb"),name:s,type:Qe.has(String(i.varType))?String(i.varType):"int32",initialValue:E(i.initialValue,0),min:E(i.min,0),max:E(i.max,100),step:E(i.step,1)}));o.varId=u.id}i.editable===void 0&&(o.editable=!0),delete i.varName,delete i.varType,delete i.step,delete i.min,delete i.max,delete i.initialValue,delete i.decimals;break;case"slider":case"progress":if(i.varId===void 0||i.varId===null){let s=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",u=n(s,()=>({id:N("vb"),name:s,type:"int",initialValue:E(i.initialValue,0),min:E(i.min,0),max:E(i.max,100),step:E(i.step,1)}));o.varId=u.id}delete i.varName,delete i.step,delete i.min,delete i.max,delete i.initialValue;break;case"switch":if(i.varId===void 0||i.varId===null){let s=typeof i.varName=="string"&&i.varName?i.varName:"var_unnamed",u=n(s,()=>({id:N("vb"),name:s,type:"uint8",initialValue:E(i.initialValue,0),min:0,max:1,step:1}));o.varId=u.id}delete i.varName,delete i.initialValue;break;default:break}}return t}function fe(r){let e;if(typeof r=="string")try{e=JSON.parse(r)}catch{throw new D("JSON \u89E3\u6790\u5931\u8D25")}else e=r;if(!he(e))throw new D("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,n=E(t.version,0);if(n>1)throw new D(`\u5DE5\u7A0B\u7248\u672C v${n} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);n<1&&void 0;let a=Array.isArray(t.pages)?t.pages.map(Pt):[];if(!a.length)throw new D("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let o=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity",i=new Set(B.map(d=>d.fn)),s=Array.isArray(t.weakHooks)?[...new Set(t.weakHooks.filter(d=>typeof d=="string"&&i.has(d)))]:[],u;return Array.isArray(t.variables)?u=t.variables.map(Nt).filter(d=>!!d):u=Ct(a),{version:1,name:C(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:E(t.width,128),height:E(t.height,64),font:C(t.font,"u8g2_font_wqy12_t_gb2312"),selector:o,selectorLeftMargin:E(t.selectorLeftMargin,16),selectorTopMargin:E(t.selectorTopMargin,0),selectorLineSpacing:E(t.selectorLineSpacing,0),marqueeSpeed:E(t.marqueeSpeed,.2),marqueeHeaderLen:E(t.marqueeHeaderLen,5),weakHooks:s,variables:u,pages:a}}function Ee(r){return JSON.stringify(r,null,2)}var Lt={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function U(r,e="anon"){let t=r.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function oe(r){return r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function J(r){if(!Number.isFinite(r))return"0.0f";let e=r.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function Vt(r){let e=new Map;if(!r)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,n;for(;(n=t.exec(r))!==null;)e.set(n[1],n[2]);return e}function H(r,e,t){let n=e.has(r)?e.get(r):"";return`${t}/* USER CODE BEGIN ${r} */${n}${t}/* USER CODE END ${r} */`}var Ht=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]);function Ae(r,e){let t=[],n=Vt(e?.c??""),a=r.pages.map((c,_)=>c.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.fnName)?c.fnName:`page_${_}`),o=new Map,i=new Map;for(let c of r.variables??[]){if(!c.name){t.push("\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7");continue}if(o.has(c.name)){t.push(`\u53D8\u91CF\u540D "${c.name}" \u91CD\u590D\uFF0C\u4EE5\u7B2C\u4E00\u4E2A\u4E3A\u51C6`);continue}/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.name)||t.push(`\u53D8\u91CF\u540D "${c.name}" \u4E0D\u662F\u5408\u6CD5\u7684 C \u6807\u8BC6\u7B26\uFF0C\u5DF2\u6E05\u6D17\u4E3A "${U(c.name)}"`);let _=U(c.name,"var"),p=c.type==="float"||c.type==="double",w={name:_,srcType:c.type,type:Lt[c.type],init:p?J(c.initialValue):String(Math.trunc(c.initialValue)),isFloat:p,step:c.step,min:c.min,max:c.max};o.set(_,w),i.set(c.id,w)}let s=new Map,u=new Set,d=[],l=[],m=[],g=[],x=[],k=new Set,re=new Map,ae=0,ie=0;for(let c of r.pages)for(let _ of c.items)switch(_.kind){case"button":{let p=U(_.cbName,"btn_cb");s.has(p)||s.set(p,_.buttonId);break}case"board":u.add(U(_.cbName,"board_cb"));break;case"chart":{let p=ae++;d.push(`#define CHART${p}_LEN ${Math.max(2,Math.trunc(_.dataLen))}`,`static float chart${p}_data[CHART${p}_LEN];`,`static float chart${p}_dis[CHART${p}_LEN];`,`static u8g2_chart_t chart${p};`,`static uint8_t chart${p}_inited = 0;`);let w=_.sample==="sine"?`chart${p}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);`:_.sample==="ramp"?`chart${p}_data[i] = (float)i;`:`chart${p}_data[i] = (float)((i * 37) % CHART${p}_LEN);`,P=`chart${p}_fill`,b=(n.get(P)??"").trim()!=="";l.push([`    if (!chart${p}_inited) {`,`        chart${p}_inited = 1;`,`        u8g2_chart_init(&chart${p}, chart${p}_data, chart${p}_dis, CHART${p}_LEN);`,H(P,n,"        "),...b?[]:[`        for (uint16_t i = 0; i < CHART${p}_LEN; ++i) { ${w} }`],"    }"].join(`
`));break}case"xbm":{let p=U(_.name,"icon");for(;k.has(p);)p=`${p}_2`;k.add(p),re.set(_.id,p);let w=_.bits.length,P=_.bits.map(b=>`0x${(b&255).toString(16).padStart(2,"0")}`).join(", ");m.push(`static const uint8_t menu_xbm_${p}[${w}] = { ${P} };`);break}case"textarea":{let p=ie++;g.push(`static char ta${p}_text[] = "${oe(_.content)}";`,`static u8g2_menu_textArea_t ta${p};`,`static uint8_t ta${p}_inited = 0;`),x.push(`    if (!ta${p}_inited) {`,`        ta${p}_inited = 1;`,`        u8g2_textArea_init(&ta${p}, ta${p}_text);`,`        u8g2_textArea_setLineSpacing(&ta${p}, ${Math.max(0,Math.trunc(_.lineSpacing))});`,"    }");break}default:break}let V=(c,_)=>{if(!c)return"";let p=`"${oe(c)}"`;return _===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${p});`:`u8g2_MenuUTF8Printf(${p});`},ge=(c,_,p)=>{let w=`"${oe(c)}"`;return _===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${w}, ${p});`:`u8g2_MenuUTF8Printf(${w}, ${p});`},Z=0,K=0,ye=(c,_)=>{let p=[],w=`${_.name}`,P=b=>{if(!b)return null;let $=i.get(b);return $||t.push(`\u9875\u9762 ${w} \u7684\u6761\u76EE\u5F15\u7528\u4E86\u5DF2\u5220\u9664\u7684\u53D8\u91CF\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`),$??null};switch(c.kind){case"text":{let b=V(c.text,c.scale);b&&p.push(`    ${b}`);break}case"number":{let b=c,$=P(b.varId);if($&&b.editable!==!1){let A=$.isFloat?`u8g2_MenuItemValue_${$.srcType}(&${$.name}, ${J($.step)}, ${J($.min)}, ${J($.max)});`:`u8g2_MenuItemValue_${$.srcType}(&${$.name}, ${Math.trunc($.step)}, ${Math.trunc($.min)}, ${Math.trunc($.max)});`;p.push(`    ${A}`)}if($)p.push(`    ${ge(b.text,b.scale,$.name)}`),b.editable!==!1&&!/%[-+ #0]*[a-zA-Z]/.test(b.text)&&t.push(`\u6570\u503C\u6761\u76EE "${w}" \u7684\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);else if(/%[-+ #0]*[a-zA-Z]/.test(b.text)){t.push(`\u9875\u9762 ${w} \u7684\u6570\u503C\u6761\u76EE\u672A\u7ED1\u5B9A\u53D8\u91CF\u4F46\u6587\u672C\u542B\u5360\u4F4D\u7B26\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let A=V(b.text.replace(/%[-+ #0]*[a-zA-Z]/g,""),b.scale);A&&p.push(`    ${A}`)}else{let A=V(b.text,b.scale);A&&p.push(`    ${A}`)}break}case"switch":{let b=c,$=P(b.varId);if($){if($.srcType!=="uint8"){t.push(`\u5F00\u5173\u6761\u76EE\u7ED1\u5B9A\u7684\u53D8\u91CF "${$.name}" \u5E94\u4E3A uint8 \u7C7B\u578B\uFF08\u5F53\u524D ${$.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`);let A=V(b.text,b.scale);A&&p.push(`    ${A}`);break}p.push(`    u8g2_MenuItemValue_switch(&${$.name}, ${Math.trunc(b.openValue)});`),p.push(`    ${ge(b.text,b.scale,`${$.name} ? "${oe(b.onText)}" : "${oe(b.offText)}"`)}`),/%[-+ #0]*s/.test(b.text)||t.push(`\u5F00\u5173\u6761\u76EE "${$.name}" \u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off`)}else{let A=V(b.text,b.scale);A&&p.push(`    ${A}`)}break}case"button":{let b=U(c.cbName,"btn_cb");p.push(`    u8g2_MenuItem_button(${b}, ${Math.trunc(c.buttonId)});`);let $=V(c.text,c.scale);$&&p.push(`    ${$}`);break}case"submenu":{if(!c.targetPageId){t.push(`\u9875\u9762 ${w} \u7684\u5B50\u9875\u9762\u6761\u76EE "${c.text||c.label||c.id}" \u672A\u6307\u5B9A\u76EE\u6807\u9875\u9762\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let A=V(c.text,c.scale);A&&p.push(`    ${A}`);break}let b=r.pages.findIndex(A=>A.id===c.targetPageId);if(b<0){t.push(`\u9875\u9762 ${w} \u7684\u5B50\u9875\u9762\u6761\u76EE\u76EE\u6807\u65E0\u6548`);break}p.push(`    u8g2_MenuItem_menu_enter(${a[b]});`);let $=V(c.text,c.scale);$&&p.push(`    ${$}`);break}case"back":{p.push("    u8g2_MenuItem_menu_back();");let b=V(c.text,c.scale);b&&p.push(`    ${b}`);break}case"slider":case"progress":{let b=P(c.varId);if(!b){t.push(`\u9875\u9762 ${w} \u7684${c.kind==="slider"?"\u6ED1\u5757":"\u8FDB\u5EA6"}\u6761\u76EE\u672A\u7ED1\u5B9A\u53D8\u91CF\uFF0C\u5DF2\u8DF3\u8FC7`);break}if(!Ht.has(b.srcType)){t.push(`\u6ED1\u5757/\u8FDB\u5EA6\u6761\u7ED1\u5B9A\u7684\u53D8\u91CF "${b.name}" \u987B\u4E3A\u6574\u578B\uFF08\u5F53\u524D ${b.srcType}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7`);break}let $=c.kind==="slider"?"Slider":"ProgressBar";p.push(`    u8g2_MenuDrawItem${$}_bind(&${b.name}, ${Math.trunc(b.step)}, ${Math.trunc(b.min)}, ${Math.trunc(b.max)});`);break}case"chart":{let b=Z++;p.push(...l[b].split(`
`));let $=c.chartKind==="point"?"Point":c.chartKind==="bar"?"Bar":"Line",A=c.min!==void 0&&c.max!==void 0?`${J(c.max)}, ${J(c.min)}`:"0, 0";p.push(`    u8g2_MenuDrawItem${$}Chart(&chart${b}, ${Math.max(4,Math.trunc(c.height))}, ${A});`);break}case"xbm":p.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${re.get(c.id)??U(c.name,"icon")});`);break;case"textarea":{let b=K++;p.push(...x[b].split(`
`));let $=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";p.push(`    ${$}(&ta${b}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{let b=U(c.cbName,"board_cb");p.push(`    u8g2_MenuDrawItemBoard(${b}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return p},f=[];f.push("/**"),f.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${r.name}`),f.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),f.push(" */"),f.push('#include "menu_pages.h"'),f.push('#include "u8g2_menu.h"'),d.length&&f.push("#include <math.h>"),f.push(""),f.push(H("includes",n,"")),f.push(""),f.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),f.push(H("variables",n,""));for(let c of o.values())f.push(`${c.type} ${c.name} = ${c.init};`);if(f.push(""),(d.length||g.length||m.length)&&(f.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),f.push(...d,...g,...m),f.push("")),s.size||u.size){f.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),f.push(H("callbacks",n,""));for(let[c]of s)f.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID)`),f.push("{"),f.push(H(`cb_${c}`,n,"    ")),f.push("}"),f.push("");for(let c of u)f.push(`void ${c}(u8g2_t *u8g2)`),f.push("{"),f.push(H(`cb_${c}`,n,"    ")),f.push("}"),f.push("")}let F=(r.weakHooks??[]).map(c=>B.find(_=>_.fn===c)).filter(c=>!!c);if(F.length||n.has("weak")||B.some(c=>(n.get(`weak_${c.fn}`)??"").trim())){f.push("/* ==================== \u5F31\u5B9A\u4E49\u51FD\u6570\u91CD\u5199 ==================== */"),f.push("/* \u4EE5\u4E0B\u51FD\u6570\u4E0E\u5E93 u8g2_menu_weak.c \u4E2D\u7684\u5F31\u5B9A\u4E49\u540C\u540D\uFF0C"),f.push(" * \u94FE\u63A5\u65F6\u5C06\u81EA\u52A8\u66FF\u6362\u5E93\u7684\u9ED8\u8BA4\u884C\u4E3A\uFF1B\u53D6\u6D88\u52FE\u9009\u5373\u53EF\u6062\u590D\u9ED8\u8BA4\u3002 */");let _=B.filter(p=>!r.weakHooks?.includes(p.fn)&&(n.get(`weak_${p.fn}`)??"").trim()).map(p=>[`#if 0   /* \u5DF2\u53D6\u6D88\u52FE\u9009 ${p.fn}\uFF0C\u624B\u5199\u5185\u5BB9\u4FDD\u7559\u4E8E\u6B64\uFF1B\u91CD\u65B0\u52FE\u9009\u540E\u6062\u590D\u7F16\u8BD1 */`,`${p.decl}`,"{",H(`weak_${p.fn}`,n,"    "),"}","#endif"].join(`
`)).join(`
`);f.push(_?`${H("weak",n,"").replace(/\n$/,"")}
${_}
`:H("weak",n,"")),f.push("");for(let p of F){f.push(`/* ${p.label}: ${p.desc} */`),f.push(`${p.decl}`),f.push("{"),f.push(H(`weak_${p.fn}`,n,"    "));let w=p.bodyArgs.split(`
`).map(P=>`    ${P}`);p.retNote&&w.push(`    ${p.retNote}`),f.push(...w),f.push("}"),f.push("")}}f.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),f.push(""),r.pages.forEach((c,_)=>{f.push(`/* \u9875\u9762: ${c.name} */`),f.push(`void ${a[_]}(void)`),f.push("{"),f.push(H(`page_${a[_]}_pre`,n,"    "));for(let p of c.items)f.push(...ye(p,c));f.push("}"),f.push("")});let v=[];if(v.push("#ifndef MENU_PAGES_H"),v.push("#define MENU_PAGES_H"),v.push(""),v.push('#include "u8g2_menu.h"'),v.push(""),v.push("/* \u9875\u9762\u5165\u53E3\u3002\u9996\u4E2A\u9875\u9762\u4F5C\u4E3A u8g2_CreateMenu \u7684\u521D\u59CB\u9875\u9762\u3002 */"),a.forEach((c,_)=>v.push(`void ${c}(void);   /* ${r.pages[_].name} */`)),v.push(""),o.size){v.push("/* \u53EF\u7F16\u8F91\u53D8\u91CF\uFF08\u5728\u6761\u76EE\u7ED1\u5B9A\u4E2D\u4F7F\u7528\uFF09 */");for(let c of o.values())v.push(`extern ${c.type} ${c.name};`);v.push("")}if(s.size||u.size){v.push("/* \u7528\u6237\u56DE\u8C03 */");for(let[c]of s)v.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(let c of u)v.push(`void ${c}(u8g2_t *u8g2);`);v.push("")}v.push("#endif /* MENU_PAGES_H */");let S=f.join(`
`).replace(/\n{3,}/g,`


`),T=v.join(`
`);return{c:`${S}
`,h:`${T}
`,warnings:t}}function Te(r,e){return e?r.get(e)??null:null}var xe=(s=>(s[s.None=0]="None",s[s.Up=1]="Up",s[s.Down=2]="Down",s[s.Enter=3]="Enter",s[s.Return=4]="Return",s[s.Add=5]="Add",s[s.Sub=6]="Sub",s))(xe||{});var jt=128*64/8;function Kt(r){return new Promise((e,t)=>{let n=document.createElement("script");n.src=r,n.onload=()=>e(),n.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${r}`)),document.head.appendChild(n)})}var ve=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.lastKnownPage=0;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await Kt(e);let n=t.U8G2MenuPreview;if(!n)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await n({locateFile:o=>e.replace(/[^/\\]*$/,"")+o}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let a=this.mod._em_font_count_export();for(let o=0;o<a;o++){let i=this.mod._em_font_name(o);this.fontIndexCache.set(this.mod.UTF8ToString(i),o)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify(e.pages.map(t=>({n:t.items.length,k:t.items.map(n=>n.kind).join(","),res:t.items.map(n=>n.kind==="chart"?`${n.dataLen}|${n.sample}`:n.kind==="xbm"?`${n.w}x${n.h}`:n.kind==="textarea"?Math.ceil(n.content.length/64):"").join(",")})))}sync(e){let t=this.mod;if(!t)return;let n=this.signature(e);n!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=n);let a=s=>Math.trunc(Number.isFinite(s)?s:0),o=s=>s?(e.variables??[]).findIndex(u=>u.id===s):-1,i=new Map((e.variables??[]).map(s=>[s.id,s]));e.pages.forEach((s,u)=>{t.ccall("em_page_begin",null,["number"],[u]),s.items.forEach((d,l)=>{let m=["number","number"];switch(d.kind){case"text":t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,0,0,d.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[u,l,d.text]);break;case"number":{let g=Te(i,d.varId);t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,1,g?{uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[g.type]:0,d.scale,0,0,0,0,0,g?a(g.initialValue):0,g?a(g.step):0,g?a(g.min):0,g?a(g.max):0,-1,0,0,0,0,d.editable===!1?1:0,o(d.varId)]),t.ccall("em_item_text",null,["number","number","string"],[u,l,d.text]);break}case"switch":{let g=Te(i,d.varId);t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,2,0,d.scale,0,0,a(d.openValue),0,0,g?a(g.initialValue):0,0,0,0,-1,0,0,0,0,0,o(d.varId)]),t.ccall("em_item_text",null,["number","number","string"],[u,l,d.text]),t.ccall("em_item_swtext",null,["number","number","string","string"],[u,l,d.onText,d.offText]);break}case"button":t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,3,0,d.scale,0,0,0,a(d.buttonId),0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[u,l,d.text]);break;case"submenu":{let g=e.pages.findIndex(x=>x.id===d.targetPageId);t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,4,0,d.scale,0,0,0,0,0,0,0,0,0,g,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[u,l,d.text]);break}case"back":t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,5,0,d.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,-1]),t.ccall("em_item_text",null,["number","number","string"],[u,l,d.text]);break;case"slider":case"progress":{let g=Te(i,d.varId),x=d.kind==="slider"?5:6;t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,x,0,1,0,0,0,0,0,g?a(g.initialValue):0,g?a(g.step):0,g?a(g.min):0,g?a(g.max):0,-1,0,0,0,0,0,o(d.varId)]);break}case"chart":{let g={sine:0,ramp:1,noise:2}[d.sample],x=d.min!==void 0&&d.max!==void 0?1:0;t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,8,0,1,{line:0,point:1,bar:2}[d.chartKind],0,0,0,x,g,0,x?a(d.min):0,x?a(d.max):0,-1,0,0,a(d.height),a(d.dataLen),0]);break}case"xbm":{t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,9,0,1,0,0,0,0,0,0,0,0,0,-1,a(d.w),a(d.h),0,0,0,-1]);let g=t._em_scratch(d.bits.length);g&&(t.HEAPU8.set(new Uint8Array(d.bits),g),t._em_item_bits(u,l,g,d.bits.length));break}case"textarea":t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,10,0,1,0,d.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,a(d.height),0,a(d.lineSpacing),-1]),t.ccall("em_item_text",null,["number","number","string"],[u,l,d.content]);break;case"board":t.ccall("em_page_item",null,[...m,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[u,l,11,0,1,0,0,0,0,0,0,0,0,0,-1,a(d.w),a(d.h),0,0,0,-1]);break}}),t.ccall("em_page_end",null,["number","number"],[u,s.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],a(e.selectorLeftMargin),a(e.selectorTopMargin),a(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let n=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(n),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let n=t._em_frame(e);if(!n)return;this.img||(this.img=this.ctx.createImageData(128,64));let a=t.HEAPU8.subarray(n,n+jt),o=this.img.data;o.fill(255);for(let s=0;s<64;s++){let u=(s>>3)*128,d=1<<(s&7),l=s*128*4;for(let m=0;m<128;m++)a[u+m]&d&&(o[l]=17,o[l+1]=24,o[l+2]=39),l+=4}this.ctx.putImageData(this.img,0,0);let i=t._em_get_current_page();i!==this.lastKnownPage&&(this.lastKnownPage=i,this.events.onPageChanged?.(i))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}navTo(e){this.mod?.ccall("em_nav",null,["number"],[e])}getInt(e){return this.mod?._em_get_ipool(e)??0}getSwitch(e){return this.mod?._em_get_upool(e)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var He=globalThis,et=r=>r,_e=He.trustedTypes,tt=_e?_e.createPolicy("lit-html",{createHTML:r=>r}):void 0,ot="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,ut="?"+O,Rt=`<${ut}>`,X=document,le=()=>X.createComment(""),me=r=>r===null||typeof r!="object"&&typeof r!="function",je=Array.isArray,Bt=r=>je(r)||typeof r?.[Symbol.iterator]=="function",Me=`[ 	
\f\r]`,ue=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,rt=/>/g,z=RegExp(`>|${Me}(?:([^\\s"'>=/]+)(${Me}*=${Me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,it=/"/g,lt=/^(?:script|style|textarea|title)$/i,Ke=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),h=Ke(1),vn=Ke(2),xn=Ke(3),de=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),st=new WeakMap,q=X.createTreeWalker(X,129);function mt(r,e){if(!je(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(e):e}var Dt=(r,e)=>{let t=r.length-1,n=[],a,o=e===2?"<svg>":e===3?"<math>":"",i=ue;for(let s=0;s<t;s++){let u=r[s],d,l,m=-1,g=0;for(;g<u.length&&(i.lastIndex=g,l=i.exec(u),l!==null);)g=i.lastIndex,i===ue?l[1]==="!--"?i=nt:l[1]!==void 0?i=rt:l[2]!==void 0?(lt.test(l[2])&&(a=RegExp("</"+l[2],"g")),i=z):l[3]!==void 0&&(i=z):i===z?l[0]===">"?(i=a??ue,m=-1):l[1]===void 0?m=-2:(m=i.lastIndex-l[2].length,d=l[1],i=l[3]===void 0?z:l[3]==='"'?it:at):i===it||i===at?i=z:i===nt||i===rt?i=ue:(i=z,a=void 0);let x=i===z&&r[s+1].startsWith("/>")?" ":"";o+=i===ue?u+Rt:m>=0?(n.push(d),u.slice(0,m)+ot+u.slice(m)+O+x):u+O+(m===-2?s:x)}return[mt(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},ce=class r{constructor({strings:e,_$litType$:t},n){let a;this.parts=[];let o=0,i=0,s=e.length-1,u=this.parts,[d,l]=Dt(e,t);if(this.el=r.createElement(d,n),q.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(a=q.nextNode())!==null&&u.length<s;){if(a.nodeType===1){if(a.hasAttributes())for(let m of a.getAttributeNames())if(m.endsWith(ot)){let g=l[i++],x=a.getAttribute(m).split(O),k=/([.?@])?(.*)/.exec(g);u.push({type:1,index:o,name:k[2],strings:x,ctor:k[1]==="."?Ne:k[1]==="?"?Ce:k[1]==="@"?Le:ee}),a.removeAttribute(m)}else m.startsWith(O)&&(u.push({type:6,index:o}),a.removeAttribute(m));if(lt.test(a.tagName)){let m=a.textContent.split(O),g=m.length-1;if(g>0){a.textContent=_e?_e.emptyScript:"";for(let x=0;x<g;x++)a.append(m[x],le()),q.nextNode(),u.push({type:2,index:++o});a.append(m[g],le())}}}else if(a.nodeType===8)if(a.data===ut)u.push({type:2,index:o});else{let m=-1;for(;(m=a.data.indexOf(O,m+1))!==-1;)u.push({type:7,index:o}),m+=O.length-1}o++}}static createElement(e,t){let n=X.createElement("template");return n.innerHTML=e,n}};function Q(r,e,t=r,n){if(e===de)return e;let a=n!==void 0?t._$Co?.[n]:t._$Cl,o=me(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),o===void 0?a=void 0:(a=new o(r),a._$AT(r,t,n)),n!==void 0?(t._$Co??=[])[n]=a:t._$Cl=a),a!==void 0&&(e=Q(r,a._$AS(r,e.values),a,n)),e}var Pe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,a=(e?.creationScope??X).importNode(t,!0);q.currentNode=a;let o=q.nextNode(),i=0,s=0,u=n[0];for(;u!==void 0;){if(i===u.index){let d;u.type===2?d=new pe(o,o.nextSibling,this,e):u.type===1?d=new u.ctor(o,u.name,u.strings,this,e):u.type===6&&(d=new Ve(o,this,e)),this._$AV.push(d),u=n[++s]}i!==u?.index&&(o=q.nextNode(),i++)}return q.currentNode=X,a}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},pe=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,a){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),me(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==de&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Bt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&me(this._$AH)?this._$AA.nextSibling.data=e:this.T(X.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,a=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ce.createElement(mt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===a)this._$AH.p(t);else{let o=new Pe(a,this),i=o.u(this.options);o.p(t),this.T(i),this._$AH=o}}_$AC(e){let t=st.get(e.strings);return t===void 0&&st.set(e.strings,t=new ce(e)),t}k(e){je(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,a=0;for(let o of e)a===t.length?t.push(n=new r(this.O(le()),this.O(le()),this,this.options)):n=t[a],n._$AI(o),a++;a<t.length&&(this._$AR(n&&n._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=et(e).nextSibling;et(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,a,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=y}_$AI(e,t=this,n,a){let o=this.strings,i=!1;if(o===void 0)e=Q(this,e,t,0),i=!me(e)||e!==this._$AH&&e!==de,i&&(this._$AH=e);else{let s=e,u,d;for(e=o[0],u=0;u<o.length-1;u++)d=Q(this,s[n+u],t,u),d===de&&(d=this._$AH[u]),i||=!me(d)||d!==this._$AH[u],d===y?e=y:e!==y&&(e+=(d??"")+o[u+1]),this._$AH[u]=d}i&&!a&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ne=class extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}},Ce=class extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}},Le=class extends ee{constructor(e,t,n,a,o){super(e,t,n,a,o),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??y)===de)return;let n=this._$AH,a=e===y&&n!==y||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==y&&(n===y||a);a&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ve=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}};var Ut=He.litHtmlPolyfillSupport;Ut?.(ce,pe),(He.litHtmlVersions??=[]).push("3.3.3");var L=(r,e,t)=>{let n=t?.renderBefore??e,a=n._$litPart$;if(a===void 0){let o=t?.renderBefore??null;n._$litPart$=a=new pe(e.insertBefore(le(),o),o,void 0,t??{})}return a._$AI(r),a};var Ot=Object.keys(G);function Ft(r,e,t,n){let a=r.getState(),o=t.label||"text"in t&&t.text||G[t.kind],i=s=>u=>{u.stopPropagation(),r.getState().moveItem(e.id,t.id,s)};return h`<div class="ume-item-row ${n?"selected":""}"
    @click=${()=>r.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${Je[t.kind]}</span>
    <span class="ume-item-name" title=${o}>${o}</span>
    <button class="ume-mini" title="上移" @click=${i(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${i(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${s=>{s.stopPropagation(),a.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${s=>{s.stopPropagation(),a.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function zt(r,e){let t=r.getState();return h`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${n=>{let a=n.target.value;a&&t.addItem(a,e.id),n.target.value=""}}>
    <option value="">＋条目</option>
    ${Ot.map(n=>h`<option value=${n}>${G[n]}</option>`)}
  </select>`}function dt(r,e){let{project:t,selection:n}=e.getState(),a=o=>{let i=e.getState(),s=n.pageId===o.id;return h`<div class="ume-page">
      <div class="ume-page-head ${s?"selected":""}"
        @click=${()=>e.getState().select(o.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${o.name}</span>
        <button class="ume-mini" title="上移页面" @click=${u=>{u.stopPropagation(),i.movePage(o.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${u=>{u.stopPropagation(),i.movePage(o.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${u=>{if(u.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${o.name}"\uFF1F`)&&i.removePage(o.id)}}>✕</button>
      </div>
      ${s?h`<div class="ume-page-items">
        ${o.items.length?o.items.map(u=>Ft(e,o,u,n.itemId===u.id)):h`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${zt(e,o)}</div>
      </div>`:y}
    </div>`};L(h`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>qt(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(a)}
  `,r)}function qt(r){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${r.getState().project.pages.length+1}`);e!==null&&r.getState().addPage(e||void 0)}function M(r,e,t,n=""){return h`<div class="ume-field">
    <label>${r}</label>
    <input type="text" .value=${e??""} placeholder=${n}
      @change=${a=>t(a.target.value)} />
  </div>`}function I(r,e,t,n=1){return h`<div class="ume-field">
    <label>${r}</label>
    <input type="number" .value=${String(e)} step=${String(n)}
      @change=${a=>{let o=parseFloat(a.target.value);t(Number.isFinite(o)?o:0)}} />
  </div>`}function j(r,e,t,n){return h`<div class="ume-field">
    <label>${r}</label>
    <select @change=${a=>n(a.target.value)}>
      ${t.map(a=>h`<option value=${a.value} ?selected=${a.value===e}>${a.label}</option>`)}
    </select>
  </div>`}function Re(r,e,t){return h`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${n=>t(n.target.checked)} />
    <span>${r}</span>
  </div>`}function Be(r,e,t,n=!1){return h`<div class="ume-field wide">
    <label>${r}</label>
    <textarea style=${n?"font-family:Consolas,monospace":""}
      @change=${a=>t(a.target.value)}>${e??""}</textarea>
  </div>`}function te(r,e,t="text/plain"){let n=new Blob([e],{type:`${t};charset=utf-8`}),a=document.createElement("a");a.href=URL.createObjectURL(n),a.download=r,a.click(),setTimeout(()=>URL.revokeObjectURL(a.href),5e3)}var Xt=new Set(["uint8","uint16","uint32","int8","int16","int32","int"]),ct={uint8:"uint8",uint16:"uint16",uint32:"uint32",int8:"int8",int16:"int16",int32:"int32",int:"int",float:"float",double:"double"};function De(r,e,t,n){let a=[{value:"",label:"\uFF08\u672A\u7ED1\u5B9A\uFF09"},...t.map(i=>({value:i.id,label:`${i.name} : ${ct[i.type]??i.type}`}))],o=e?t.some(i=>i.id===e):!1;return h`
    ${j(r,e??"",a,i=>n(i||null))}
    ${e&&!o?h`<div class="ume-warn">绑定的变量已被删除，请重新选择</div>`:y}
    ${t.length===0?h`<div class="ume-hint">还没有变量——点下方"新建变量"创建一个</div>`:y}
  `}function Ue(r,e,t){return h`<div class="ume-field"><label></label>
    <button class="ume-btn sm" @click=${()=>{let n=r.getState().addVariable();r.getState().updateItem(e,t,{varId:n.id})}}>＋ 新建变量并绑定</button>
  </div>`}function Oe(r){return r?h`<div class="ume-hint">
    ${r.name} : ${ct[r.type]??r.type}，范围 ${r.min}~${r.max}，步长 ${r.step}，初值 ${r.initialValue}
    （在右侧「变量」区修改）
  </div>`:h`${y}`}function pt(r,e,t){let{project:n,selection:a}=e.getState(),o=n.pages.find(l=>l.id===a.pageId)??null,i=o?.items.find(l=>l.id===a.itemId)??null,s=(l,m)=>e.getState().updateItem(o.id,i.id,l,m),u=h`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,d="\u5C5E\u6027";if(o&&!i)d="\u9875\u9762\u5C5E\u6027",u=h`
      ${M("\u540D\u79F0",o.name,l=>e.getState().updatePage(o.id,{name:l}))}
      ${M("C \u51FD\u6570\u540D",o.fnName,l=>e.getState().updatePage(o.id,{fnName:l}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      ${Be("\u7528\u6237\u4EE3\u7801",o.userCodePre,l=>e.getState().updatePage(o.id,{userCodePre:l}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(o&&i)switch(d=`${G[i.kind]}`,i.kind){case"text":u=h`
          ${M("\u6587\u672C/\u683C\u5F0F",i.text,l=>s({text:l},`text-${i.id}`))}
          ${j("\u5927\u5C0F",String(i.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],l=>s({scale:Number(l)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{let l=i,m=n.variables??[],g=m.find(k=>k.id===l.varId),x=g&&(g.type==="float"||g.type==="double")?"float/double \u63A8\u8350\u683C\u5F0F %.1f / %.2f":"\u6574\u6570\u63A8\u8350\u683C\u5F0F %d\uFF08\u65E0\u7B26\u53F7\u7528 %u\uFF09";u=h`
          ${De("\u7ED1\u5B9A\u53D8\u91CF",l.varId,m,k=>s({varId:k}))}
          ${g?y:Ue(e,o.id,l.id)}
          ${Re("\u53EF\u7F16\u8F91\uFF08\u7ED1\u5B9A\u9644\u52A0\u503C\uFF0C\u53D6\u6D88\u5219\u4EC5\u663E\u793A\uFF09",l.editable!==!1,k=>s({editable:k}))}
          ${Oe(g)}
          ${M("\u663E\u793A\u6587\u672C",l.text,k=>s({text:k},`text-${i.id}`))}
          ${j("\u5927\u5C0F",String(l.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],k=>s({scale:Number(k)}))}
          <div class="ume-hint">${x}；文本支持 \n 多行</div>
        `;break}case"switch":{let l=i,m=(n.variables??[]).filter(x=>x.type==="uint8"),g=m.find(x=>x.id===l.varId)??(n.variables??[]).find(x=>x.id===l.varId);u=h`
          ${De("\u7ED1\u5B9A\u53D8\u91CF",l.varId,m,x=>s({varId:x}))}
          ${g?y:Ue(e,o.id,l.id)}
          ${Oe(g)}
          ${M("\u663E\u793A\u6587\u672C",l.text,x=>s({text:x},`text-${i.id}`))}
          ${I("openValue",l.openValue,x=>s({openValue:Math.max(0,Math.trunc(x))}))}
          ${M('"\u5F00"\u6587\u672C',l.onText,x=>s({onText:x}))}
          ${M('"\u5173"\u6587\u672C',l.offText,x=>s({offText:x}))}
          <div class="ume-hint">开关需要 uint8 类型变量；文本含 %s 用于显示开/关</div>
        `;break}case"button":{let l=i;u=h`
          ${M("\u663E\u793A\u6587\u672C",l.text,m=>s({text:m},`text-${i.id}`))}
          ${M("\u56DE\u8C03\u51FD\u6570\u540D",l.cbName,m=>s({cbName:m}))}
          ${I("ID",l.buttonId,m=>s({buttonId:Math.trunc(m)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{let l=i;u=h`
          ${M("\u663E\u793A\u6587\u672C",l.text,m=>s({text:m},`text-${i.id}`))}
          ${j("\u76EE\u6807\u9875\u9762",l.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...n.pages.filter(m=>m.id!==o.id).map(m=>({value:m.id,label:m.name}))],m=>s({targetPageId:m||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{u=h`
          ${M("\u663E\u793A\u6587\u672C",i.text,l=>s({text:l},`text-${i.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{let l=(n.variables??[]).filter(g=>Xt.has(g.type)),m=l.find(g=>g.id===i.varId)??(n.variables??[]).find(g=>g.id===i.varId);u=h`
          ${De("\u7ED1\u5B9A\u53D8\u91CF",i.varId,l,g=>s({varId:g}))}
          ${m?y:Ue(e,o.id,i.id)}
          ${Oe(m)}
          <div class="ume-hint">滑块/进度条需要整型变量；绑定后由库的 Slider/ProgressBar_bind 绘制与编辑</div>
        `;break}case"chart":{let l=i;u=h`
          ${j("\u7C7B\u578B",l.chartKind,[{value:"line",label:"\u6298\u7EBF\u56FE"},{value:"point",label:"\u6563\u70B9\u56FE"},{value:"bar",label:"\u67F1\u72B6\u56FE"}],m=>s({chartKind:m}))}
          ${I("\u6570\u636E\u70B9\u6570",l.dataLen,m=>s({dataLen:Math.max(2,Math.trunc(m))}))}
          ${I("\u9AD8\u5EA6(px)",l.height,m=>s({height:Math.max(8,Math.trunc(m))}))}
          ${j("\u793A\u4F8B\u6570\u636E",l.sample,[{value:"sine",label:"\u6B63\u5F26"},{value:"ramp",label:"\u659C\u5761"},{value:"noise",label:"\u4F2A\u968F\u673A"}],m=>s({sample:m}))}
          ${I("\u91CF\u7A0B\u4E0A\u9650",l.max??0,m=>s({max:m||void 0}),"any")}
          ${I("\u91CF\u7A0B\u4E0B\u9650",l.min??0,m=>s({min:m||void 0}),"any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;break}case"xbm":{let l=i;u=h`
          ${M("\u6570\u7EC4\u540D",l.name,m=>s({name:m}))}
          ${I("\u5BBD(px)",l.w,m=>s({w:Math.min(128,Math.max(1,Math.trunc(m)))}))}
          ${I("\u9AD8(px)",l.h,m=>s({h:Math.min(64,Math.max(1,Math.trunc(m)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(o.id,l.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${l.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let l=i;u=h`
          ${Be("\u6587\u672C\u5185\u5BB9",l.content,m=>s({content:m}))}
          ${I("\u9AD8\u5EA6(px)",l.height,m=>s({height:Math.max(10,Math.trunc(m))}))}
          ${I("\u884C\u95F4\u8DDD",l.lineSpacing,m=>s({lineSpacing:Math.max(0,Math.trunc(m))}))}
          ${Re("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",l.bindScroll,m=>s({bindScroll:m}))}
        `;break}case"board":{let l=i;u=h`
          ${I("\u5BBD(px)",l.w,m=>s({w:Math.max(1,Math.trunc(m))}))}
          ${I("\u9AD8(px)",l.h,m=>s({h:Math.max(1,Math.trunc(m))}))}
          ${M("\u56DE\u8C03\u51FD\u6570\u540D",l.cbName,m=>s({cbName:m}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}L(h`
    <div class="ume-panel-title">属性 ${d!=="\u5C5E\u6027"?h`<span class="ume-kind-badge">${d}</span>`:y}</div>
    ${u}
  `,r)}var $e=null,Wt=[{value:"uint8",label:"uint8 (0~255)"},{value:"int8",label:"int8 (-128~127)"},{value:"uint16",label:"uint16 (0~65535)"},{value:"int16",label:"int16 (-32768~32767)"},{value:"uint32",label:"uint32"},{value:"int32",label:"int32"},{value:"int",label:"int"},{value:"float",label:"float (\u5C0F\u6570)"},{value:"double",label:"double (\u5C0F\u6570)"}];function Zt(r,e){let t=e.variables??[],n=o=>{$e=$e===o?null:o},a=o=>{let i=$e===o.id,s=(m,g)=>r.getState().updateVariable(o.id,m,g),u=o.name&&!/^[A-Za-z_][A-Za-z0-9_]*$/.test(o.name),d=t.filter(m=>m.name===o.name).length>1,l=Yt(e,o.id);return h`<div class="ume-var-item ${i?"editing":""}">
      <div class="ume-var-row" @click=${()=>n(o.id)}>
        <span class="ume-var-name" title=${o.name}>${o.name||"(\u672A\u547D\u540D)"}</span>
        <span class="ume-var-meta">${o.type} · ${o.min}~${o.max} · 步${o.step}${l?` \xB7 ${l} \u5904\u5F15\u7528`:""}</span>
        <button class="ume-mini" title="删除变量" @click=${m=>{m.stopPropagation();let g=r.getState().removeVariable(o.id);g>0&&alert(`\u8BE5\u53D8\u91CF\u88AB ${g} \u4E2A\u6761\u76EE\u7ED1\u5B9A\uFF0C\u8BF7\u5148\u5728\u6761\u76EE\u91CC\u89E3\u7ED1\uFF08\u6539\u4E3A"\u672A\u7ED1\u5B9A"\uFF09\u518D\u5220\u9664`)}}>✕</button>
      </div>
      ${i?h`<div class="ume-var-edit">
        ${M("\u53D8\u91CF\u540D",o.name,m=>s({name:m.trim()},`vn-${o.id}`))}
        ${u?h`<div class="ume-warn">变量名不是合法的 C 标识符（字母/数字/下划线，不能以数字开头），生成时会自动清洗</div>`:y}
        ${d?h`<div class="ume-warn">变量名重复，生成时以第一个为准</div>`:y}
        ${j("\u7C7B\u578B",o.type,Wt,m=>s({type:m}))}
        ${I("\u521D\u59CB\u503C",o.initialValue,m=>s({initialValue:m},`vi-${o.id}`),"any")}
        ${I("\u6700\u5C0F\u503C",o.min,m=>s({min:m},`vmin-${o.id}`),"any")}
        ${I("\u6700\u5927\u503C",o.max,m=>s({max:m},`vmax-${o.id}`),"any")}
        ${I("\u6B65\u957F",o.step,m=>s({step:m},`vs-${o.id}`),"any")}
        <div class="ume-hint">条目引用按 id 跟随：修改变量名后，所有绑定它的条目自动同步</div>
      </div>`:y}
    </div>`};return h`
    <div class="ume-panel-title">
      变量 (${t.length})
      <button class="ume-mini" title="新建变量" @click=${()=>{$e=r.getState().addVariable().id}}>＋ 新建</button>
    </div>
    ${t.length?t.map(a):h`<div class="ume-empty-hint">
      先在这里创建变量，再在数值/开关/滑块条目的属性里绑定。
      变量保存类型、范围、步长与初始值，可被多个条目共用。
    </div>`}
  `}function Yt(r,e){let t=0;for(let n of r.pages)for(let a of n.items)"varId"in a&&a.varId===e&&t++;return t}function gt(r,e){let{project:t}=e.getState(),n=(s,u)=>e.getState().update(d=>{Object.assign(d,s)},u),a=t.weakHooks??[],o=(s,u)=>{e.getState().update(d=>{let l=d.weakHooks??[];d.weakHooks=u?[...new Set([...l,s])]:l.filter(m=>m!==s)})},i=h`
    <details class="ume-details">
      <summary>弱定义函数重写（已选 ${a.length}/${B.length}）</summary>
      <div class="ume-weak-list">
        <div class="ume-hint">
          勾选后，生成的 menu_pages.c 会出现同名函数骨架，链接时替换库的默认行为；
          取消勾选即恢复库默认（手写内容会以 #if 0 保留）。鼠标悬停函数名可看参数说明。
        </div>
        ${B.map(s=>h`
          <div class="ume-weak-item">
            <div class="ume-weak-name" title=${`${s.fn}${s.retNote?"\uFF08\u8FD4\u56DE 1 = \u4E8B\u4EF6\u5DF2\u5904\u7406 / 0 = \u4EA4\u7ED9\u5E93\uFF09":""}`}>
              <input type="checkbox" ?checked=${a.includes(s.fn)}
                @change=${u=>o(s.fn,u.target.checked)} />
              <span>${s.label}</span>
            </div>
            <div class="ume-weak-desc">${s.desc}</div>
          </div>
        `)}
      </div>
    </details>
  `;L(h`
    <div class="ume-panel-title">工程</div>
    ${M("\u5DE5\u7A0B\u540D",t.name,s=>n({name:s}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    ${Zt(e,t)}

    <div class="ume-panel-title">样式</div>
    ${j("\u5B57\u4F53",t.font,Se.map(s=>({value:s.id,label:s.label})),s=>n({font:s}))}
    ${j("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],s=>n({selector:s}))}
    ${I("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,s=>n({selectorLeftMargin:Math.max(0,Math.trunc(s))}))}
    ${I("\u9876\u8FB9\u8DDD",t.selectorTopMargin,s=>n({selectorTopMargin:Math.max(0,Math.trunc(s))}))}
    ${I("\u884C\u95F4\u8DDD",t.selectorLineSpacing,s=>n({selectorLineSpacing:Math.max(0,Math.trunc(s))}))}
    ${I("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,s=>n({marqueeSpeed:s}),.05)}
    ${I("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,s=>n({marqueeHeaderLen:s}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>

    <div class="ume-panel-title">进阶</div>
    ${i}
    ${y}
  `,r)}function bt(r,e){let t=a=>{let o,i=()=>{o&&(clearInterval(o),o=void 0)};return{down:s=>{s.preventDefault(),e.key(a),i(),o=window.setInterval(()=>e.key(a),180)},up:i}},n=(a,o,i)=>{let s=t(a);return h`<button class="ume-key" title=${i}
      @pointerdown=${s.down} @pointerup=${s.up} @pointerleave=${s.up}>${o}</button>`};L(h`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${a=>{let i={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[a.key];i!==void 0&&(a.preventDefault(),e.key(i))}}>
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
  `,r)}var ne=null,W="c";function ft(r,e){ne=e,r.querySelectorAll(":scope > .ume-modal-mask").forEach(t=>t.remove()),Gt(r)}function Gt(r){if(!ne)return;let e=W==="c"?ne.c:ne.h,t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",a=>{a.target===t&&ht(t)});let n=()=>{L(h`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>ht(t)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${ne.warnings.length?h`
            <div style="margin-bottom:8px">
              ${ne.warnings.map(a=>h`<div class="ume-warn">⚠ ${a}</div>`)}
            </div>`:y}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${W==="c"?"primary":""}" @click=${()=>{W="c",n()}}>menu_pages.c</button>
            <button class="ume-btn sm ${W==="h"?"primary":""}" @click=${()=>{W="h",n()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${e}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(e).then(()=>Jt(t,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{te(W==="c"?"menu_pages.c":"menu_pages.h",e)}}>下载 ${W==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,t)};n(),r.appendChild(t)}function ht(r){r.remove()}function Jt(r,e){let t=r.closest(".ume")??document.body,n=t.querySelector(".ume-toast");n||(n=document.createElement("div"),n.className="ume-toast",t.appendChild(n)),n.textContent=e,n.classList.add("show"),setTimeout(()=>n.classList.remove("show"),1600)}function xt(r,e,t,n){let i=e.getState().project.pages.find(v=>v.id===t)?.items.find(v=>v.id===n);if(!i||i.kind!=="xbm")return;let s=i,u=s.w,d=s.h,l=[...s.bits],m=()=>Math.ceil(u/8),g=document.createElement("div");g.className="ume-modal-mask",g.addEventListener("click",v=>{v.target===g&&F()});let x=(v,S)=>{let T=S*m()+(v>>3);return T<l.length?!!(l[T]>>(v&7)&1):!1},k=(v,S,T)=>{let c=S*m()+(v>>3);l[c]=T?l[c]|1<<(v&7):l[c]&~(1<<(v&7))},re=(v,S)=>{let T=Math.ceil(u/8),c=Math.ceil(v/8),_=new Array(c*S).fill(0);for(let p=0;p<Math.min(d,S);p++)for(let w=0;w<Math.min(u,v);w++){let P=p*T+(w>>3);P<l.length&&l[P]>>(w&7)&1&&(_[p*c+(w>>3)]|=1<<(w&7))}u=v,d=S,l=_},ae=!1,ie=!0,V=(v,S)=>T=>{T.preventDefault(),ae=!0,ie=!x(v,S),k(v,S,ie),K()},ge=(v,S)=>()=>{ae&&(k(v,S,ie),K())},Z=()=>{ae=!1},K=()=>{L(f(),g)},ye=()=>{let v=[];for(let S=0;S<d;S++)for(let T=0;T<u;T++)v.push(h`<button class="ume-xbm-cell ${x(T,S)?"on":""}"
          data-x=${T} data-y=${S}
          @pointerdown=${V(T,S)}
          @pointerenter=${ge(T,S)}></button>`);return v},f=()=>h`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${u}×${d}</span></span>
        <button class="ume-mini" @click=${F}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${Z}
        @pointerleave=${Z}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(u)} min="1" max="128"
            @change=${v=>{re(vt(+v.target.value,1,128),d),K()}} />
          <input type="number" style="width:64px" .value=${String(d)} min="1" max="64"
            @change=${v=>{re(u,vt(+v.target.value,1,64)),K()}} />
          <button class="ume-btn sm" @click=${()=>{l=l.map(()=>0),K()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{l=l.map(v=>~v&255),K()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${u}, 14px)">${ye()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${s.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${F}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,n,{w:u,h:d,bits:[...l]}),F()}}>应用</button>
      </div>
    </div>
  `;function F(){g.remove(),document.removeEventListener("pointerup",Z)}document.addEventListener("pointerup",Z),K(),r.appendChild(g)}function vt(r,e,t){return Number.isFinite(r)?Math.min(t,Math.max(e,Math.trunc(r))):e}var Qt="prebuilt/u8g2-menu-preview.js",Fe=class{constructor(e,t={}){this.store=ke();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let l=document.createElement("style");l.id="ume-style",l.textContent=ze,document.head.appendChild(l)}let n=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,a=this.opts.data??n??void 0;if(a!==void 0)try{this.store.setState({project:fe(a)})}catch(l){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",l)}let o=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,i=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;o&&i&&(this.lastExport={c:o,h:i}),e.innerHTML=`
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
    `;let s=l=>e.querySelector(l);this.els={left:s(".ume-left"),center:s(".ume-center"),right:s(".ume-right"),styleEl:s('[data-role="style"]'),propEl:s('[data-role="prop"]'),toolbarUndo:s('[data-act="undo"]'),toolbarRedo:s('[data-act="redo"]')};let u=document.createElement("div");u.style.display="flex",u.style.flexDirection="column",u.style.alignItems="center",u.style.gap="10px",this.els.center.appendChild(u),this.preview=new ve(u,{onPageChanged:l=>this.onPreviewPageChanged(l)});let d=document.createElement("div");this.els.center.appendChild(d),bt(d,this.preview),this.preview.load(this.opts.wasmUrl??Qt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(l=>{console.error(l);let m=document.createElement("div");m.className="ume-warn",m.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${l.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(m)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let l=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);l!==null&&this.store.getState().addPage(l||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{te(`${this.store.getState().project.name||"menu-project"}.json`,Ee(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{s('[data-role="file"]').click()}),s('[data-role="file"]').addEventListener("change",l=>{let m=l.target.files?.[0];m&&(m.text().then(g=>{try{let x=fe(g);this.store.getState().update(k=>{Object.assign(k,x)}),this.scheduleRender()}catch(x){alert(`\u5BFC\u5165\u5931\u8D25: ${x.message}`)}}),l.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=fe(e);this.store.getState().update(n=>{Object.assign(n,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.lastExport,t=Ae(this.store.getState().project,e??void 0);return this.lastExport={c:t.c,h:t.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,t.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,t.h)),ft(this.container,t),this.opts.onExport?.(t),t}downloadC(){let e=Ae(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:e.c,h:e.h},te("menu_pages.c",e.c),te("menu_pages.h",e.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,Ee(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();dt(this.els.left,this.store),gt(this.els.styleEl,this.store),pt(this.els.propEl,this.store,{openXbmEditor:(t,n)=>xt(this.container,this.store,t,n)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-value"),t=document.getElementById("ume-page-jump"),n=this.store.getState(),a=this.store.getState().project.pages.findIndex(o=>o.id===n.selection.pageId);if(t){let o=n.project.pages,i=o.map(u=>u.name).join("|");t.dataset.sig!==i&&(t.dataset.sig=i,t.innerHTML="",o.forEach((u,d)=>{let l=document.createElement("option");l.value=String(d),l.textContent=`${d+1}. ${u.name}`,t.appendChild(l)}),t.onchange=()=>{let u=parseInt(t.value,10);Number.isFinite(u)&&this.preview.navTo(u)});let s=this.preview.currentPage;document.activeElement!==t&&t.value!==String(s)&&(t.value=String(s))}if(e&&a>=0&&n.selection.itemId){let o=n.project.pages[a],i=o.items.findIndex(u=>u.id===n.selection.itemId),s=o.items[i];if(s&&"varId"in s){let u=s.varId?(n.project.variables??[]).findIndex(g=>g.id===s.varId):-1,d=u>=0?u:a*64+i,l=s.kind==="switch"?this.preview.getSwitch(d):this.preview.getInt(d),m=(n.project.variables??[]).find(g=>g.id===s.varId)?.name;e.textContent=`${m??s.kind} = ${l}`}else e.textContent=""}}};return kt(en);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
