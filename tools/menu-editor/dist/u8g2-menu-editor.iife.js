"use strict";var U8G2MenuEditor=(()=>{var fe=Object.defineProperty;var ut=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var lt=Object.prototype.hasOwnProperty;var ct=(i,e)=>{for(var t in e)fe(i,t,{get:e[t],enumerable:!0})},dt=(i,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of mt(e))!lt.call(i,n)&&n!==t&&fe(i,n,{get:()=>e[n],enumerable:!(a=ut(e,n))||a.enumerable});return i};var pt=i=>dt(fe({},"__esModule",{value:!0}),i);var Rt={};ct(Rt,{MenuEditor:()=>Le,MenuKey:()=>be});var He=`/* u8g2-menu-editor \u6837\u5F0F\uFF08\u524D\u7F00 ume-\uFF09 */
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
`;var je=i=>{let e,t=new Set,a=(p,o)=>{let l=typeof p=="function"?p(e):p;if(!Object.is(l,e)){let f=e;e=o??(typeof l!="object"||l===null)?l:Object.assign({},e,l),t.forEach(S=>S(e,f))}},n=()=>e,r={setState:a,getState:n,getInitialState:()=>m,subscribe:p=>(t.add(p),()=>t.delete(p))},m=e=i(a,n,r);return r},Re=i=>i?je(i):je;var xe=0;function q(i){return xe=(xe+1)%1e9,`${i}_${Date.now().toString(36)}_${xe.toString(36)}`}function P(i){let e={id:q("it"),label:""};switch(i){case"text":return{...e,kind:i,text:"\u83DC\u5355\u9879",scale:1};case"number":return{...e,kind:i,text:"v:%d",scale:1,varType:"int32",varName:"var_value",step:1,min:0,max:100,decimals:1,initialValue:50};case"switch":return{...e,kind:i,text:"s:%s",scale:1,varName:"var_switch",openValue:1,onText:"on",offText:"off",initialValue:0};case"button":return{...e,kind:i,text:"\u6267\u884C\u64CD\u4F5C",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...e,kind:i,text:"\u4E0B\u4E00\u7EA7",scale:1,targetPageId:null};case"back":return{...e,kind:i,text:"\u8FD4\u56DE",scale:1};case"slider":return{...e,kind:i,varName:"var_slider",step:2,min:0,max:100,initialValue:50};case"progress":return{...e,kind:i,varName:"var_prog",step:2,min:0,max:100,initialValue:70};case"chart":return{...e,kind:i,chartKind:"line",dataLen:24,height:32,sample:"sine"};case"xbm":return bt(16,16);case"textarea":return{...e,kind:i,content:`\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u8BF4\u660E\u6587\u672C\uFF0C
\u4F1A\u81EA\u52A8\u6362\u884C\u5E76\u652F\u6301\u6EDA\u52A8\u6D4F\u89C8\u3002`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...e,kind:i,w:64,h:32,cbName:"board_cb"}}}function bt(i,e){let t=Math.ceil(i/8);return{id:q("it"),kind:"xbm",label:"",name:"icon",w:i,h:e,bits:new Array(t*e).fill(0)}}function De(i){return{id:q("pg"),name:i,fnName:"",items:[],userCodePre:""}}function ne(i,e){return{...i,...e}}function Be(){let i=De("\u4E3B\u9875");i.items=[ne(P("text"),{text:"u8g2_menu"}),ne(P("submenu"),{text:"\u7CFB\u7EDF\u8BBE\u7F6E"}),ne(P("button"),{text:"\u5173\u4E8E",cbName:"btn_about_cb"})];let e=De("\u8BBE\u7F6E");e.items=[ne(P("number"),{text:"\u97F3\u91CF:%d"}),ne(P("switch"),{text:"\u5F00\u5173:%s"}),P("slider"),P("back")];let t={version:1,name:"\u6211\u7684\u83DC\u5355",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,pages:[i,e]};return i.items[1].targetPageId=e.id,t}function Ue(i){return structuredClone(i)}var gt=800;function ve(){let i=null,e=0;return Re()((t,a)=>({project:Be(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(n,u)=>{let s=Date.now(),r=!!u&&u===i&&s-e<gt;i=u??null,e=s,t(m=>{let p=Ue(m.project);return n(p),{project:p,dirty:!0,past:r?m.past:[...m.past.slice(-99),m.project],future:[]}})},undo:()=>{t(n=>n.past.length?{project:n.past[n.past.length-1],past:n.past.slice(0,-1),future:[n.project,...n.future.slice(0,99)],dirty:!0}:n)},redo:()=>{t(n=>{if(!n.future.length)return n;let[u,...s]=n.future;return{project:u,past:[...n.past,n.project],future:s,dirty:!0}})},select:(n,u=null)=>t({selection:{pageId:n,itemId:u}}),addPage:n=>{let u={id:q("pg"),name:n??`\u9875\u9762${a().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return a().update(s=>{s.pages.push(u)}),t({selection:{pageId:u.id,itemId:null}}),u},removePage:n=>{a().update(s=>{s.pages=s.pages.filter(r=>r.id!==n);for(let r of s.pages)for(let m of r.items)m.kind==="submenu"&&m.targetPageId===n&&(m.targetPageId=null)});let{selection:u}=a();u.pageId===n&&t({selection:{pageId:null,itemId:null}})},movePage:(n,u)=>{a().update(s=>{let r=s.pages.findIndex(p=>p.id===n),m=r+u;r<0||m<0||m>=s.pages.length||([s.pages[r],s.pages[m]]=[s.pages[m],s.pages[r]])})},updatePage:(n,u)=>{a().update(s=>{let r=s.pages.find(m=>m.id===n);r&&Object.assign(r,u)})},addItem:(n,u)=>{let s=u??a().selection.pageId??a().project.pages[0]?.id;if(!s)return null;let r=ht(n);return a().update(m=>{m.pages.find(o=>o.id===s)?.items.push(r)}),t({selection:{pageId:s,itemId:r.id}}),r},removeItem:(n,u)=>{a().update(r=>{let m=r.pages.find(p=>p.id===n);m&&(m.items=m.items.filter(p=>p.id!==u))});let{selection:s}=a();s.itemId===u&&t({selection:{pageId:n,itemId:null}})},moveItem:(n,u,s)=>{a().update(r=>{let m=r.pages.find(l=>l.id===n);if(!m)return;let p=m.items.findIndex(l=>l.id===u),o=p+s;p<0||o<0||o>=m.items.length||([m.items[p],m.items[o]]=[m.items[o],m.items[p]])})},duplicateItem:(n,u)=>{let s=null;a().update(r=>{let m=r.pages.find(o=>o.id===n);if(!m)return;let p=m.items.findIndex(o=>o.id===u);p<0||(s=structuredClone(m.items[p]),s.id=q("it"),m.items.splice(p+1,0,s))}),s&&t({selection:{pageId:n,itemId:s.id}})},updateItem:(n,u,s,r)=>{a().update(m=>{let o=m.pages.find(l=>l.id===n)?.items.find(l=>l.id===u);o&&Object.assign(o,s)},r)}}))}var Ot=ve();function ht(i){return P(i)}var z={text:"\u6587\u672C",number:"\u6570\u503C",switch:"\u5F00\u5173",button:"\u6309\u94AE",submenu:"\u5B50\u9875\u9762",back:"\u8FD4\u56DE\u4E0A\u7EA7",slider:"\u6ED1\u5757\u6761",progress:"\u8FDB\u5EA6\u6761",chart:"\u56FE\u8868",xbm:"\u4F4D\u56FE XBM",textarea:"\u6587\u672C\u533A",board:"\u81EA\u7ED8\u677F"},Ke={text:"T",number:"#",switch:"\u25C9",button:"\u23CE",submenu:"\u2192",back:"\u2190",slider:"\u25AD",progress:"\u25AC",chart:"\u223F",xbm:"\u25A6",textarea:"\xB6",board:"\u270E"},$e=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"\u6587\u6CC9\u9A7F 12 (\u4E2D\u6587)"},{id:"u8g2_font_wqy13_t_gb2312",label:"\u6587\u6CC9\u9A7F 13 (\u4E2D\u6587)"},{id:"u8g2_font_wqy14_t_gb2312",label:"\u6587\u6CC9\u9A7F 14 (\u4E2D\u6587)"},{id:"u8g2_font_wqy16_t_gb2312",label:"\u6587\u6CC9\u9A7F 16 (\u4E2D\u6587)"}];var C=class extends Error{};function _e(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function L(i,e){return typeof i=="string"?i:e}function H(i,e){return typeof i=="number"&&Number.isFinite(i)?i:e}var ft=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function xt(i){if(!_e(i))throw new C("\u6761\u76EE\u683C\u5F0F\u9519\u8BEF");let e=i.kind;if(typeof e!="string"||!ft.includes(e))throw new C(`\u672A\u77E5\u6761\u76EE\u7C7B\u578B: ${String(e)}`);let t=structuredClone(i);switch(t.id=L(i.id,""),t.id||(t.id=`it_${Math.random().toString(36).slice(2,10)}`),t.label=L(i.label,""),e){case"text":case"number":case"switch":case"button":case"submenu":case"back":t.text=L(i.text,""),t.scale=i.scale===2?2:1;break}return t}function vt(i){if(!_e(i))throw new C("\u9875\u9762\u683C\u5F0F\u9519\u8BEF");let e=Array.isArray(i.items)?i.items.map(xt):[];return{id:L(i.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:L(i.name,"\u672A\u547D\u540D\u9875\u9762"),fnName:L(i.fnName,""),items:e,userCodePre:L(i.userCodePre,"")}}function de(i){let e;if(typeof i=="string")try{e=JSON.parse(i)}catch{throw new C("JSON \u89E3\u6790\u5931\u8D25")}else e=i;if(!_e(e))throw new C("\u4E0D\u662F\u6709\u6548\u7684\u5DE5\u7A0B\u6587\u4EF6");let t=e,a=H(t.version,0);if(a>1)throw new C(`\u5DE5\u7A0B\u7248\u672C v${a} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7684 v${1}\uFF0C\u8BF7\u5347\u7EA7\u7F16\u8F91\u5668`);a<1&&void 0;let n=Array.isArray(t.pages)?t.pages.map(vt):[];if(!n.length)throw new C("\u5DE5\u7A0B\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u9875\u9762");let u=["default","rotundity","square"].includes(t.selector)?t.selector:"rotundity";return{version:1,name:L(t.name,"\u672A\u547D\u540D\u5DE5\u7A0B"),width:H(t.width,128),height:H(t.height,64),font:L(t.font,"u8g2_font_wqy12_t_gb2312"),selector:u,selectorLeftMargin:H(t.selectorLeftMargin,16),selectorTopMargin:H(t.selectorTopMargin,0),selectorLineSpacing:H(t.selectorLineSpacing,0),marqueeSpeed:H(t.marqueeSpeed,.2),marqueeHeaderLen:H(t.marqueeHeaderLen,5),pages:n}}function ye(i){return JSON.stringify(i,null,2)}var $t={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function X(i,e="anon"){let t=i.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!t||/^[0-9]/.test(t))&&(t=`_${t}`),t||e}function re(i){return i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function W(i){if(!Number.isFinite(i))return"0.0f";let e=i.toString();return/[-.]|e/i.test(e)?`${e}f`:`${e}.0f`}function _t(i){let e=new Map;if(!i)return e;let t=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g,a;for(;(a=t.exec(i))!==null;)e.set(a[1],a[2]);return e}function D(i,e,t){let a=e.has(i)?e.get(i):"";return`${t}/* USER CODE BEGIN ${i} */${a}${t}/* USER CODE END ${i} */`}function Ie(i,e){let t=[],a=_t(e?.c??""),n=i.pages.map((c,g)=>c.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(c.fnName)?c.fnName:`page_${g}`),u=new Map,s=(c,g,d,k,b)=>{let I=u.get(c);if(I){I.type!==g&&t.push(`\u53D8\u91CF "${c}" \u88AB\u591A\u4E2A\u4E0D\u540C\u7C7B\u578B\u7684\u6761\u76EE\u5F15\u7528\uFF08${I.type} / ${g}\uFF09\uFF0C\u4EE5\u9996\u4E2A\u5B9A\u4E49\u4E3A\u51C6`);return}u.set(c,{name:c,type:g,init:d,isFloat:k,owner:b})},r=new Map,m=new Set,p=[],o=[],l=[],f=[],S=[],M=new Set,Q=new Map,ee=0,te=0;for(let c of i.pages)for(let g of c.items)switch(g.kind){case"number":{let d=g;if(!d.varName){t.push(`\u5B58\u5728\u672A\u547D\u540D\u53D8\u91CF\u6761\u76EE\uFF08\u9875\u9762 ${c.name}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`);break}let k=d.varType==="float"||d.varType==="double"?W(d.initialValue):String(Math.trunc(d.initialValue));s(d.varName,$t[d.varType],k,d.varType==="float"||d.varType==="double",g),/%[-+ #0]*[a-zA-Z]/.test(d.text)||t.push(`\u6570\u503C\u6761\u76EE "${c.name}/${d.varName}" \u7684\u663E\u793A\u6587\u672C\u4E0D\u542B\u683C\u5F0F\u5316\u5360\u4F4D\u7B26\uFF08\u5982 %d\uFF09`);break}case"switch":{let d=g;if(!d.varName){t.push(`\u5B58\u5728\u672A\u547D\u540D\u5F00\u5173\u6761\u76EE\uFF08\u9875\u9762 ${c.name}\uFF09\uFF0C\u5DF2\u8DF3\u8FC7\u7ED1\u5B9A`);break}s(d.varName,"uint8_t",String(Math.trunc(d.initialValue)),!1,g),/%[-+ #0]*s/.test(d.text)||t.push(`\u5F00\u5173\u6761\u76EE "${d.varName}" \u7684\u663E\u793A\u6587\u672C\u5EFA\u8BAE\u5305\u542B %s \u7528\u4E8E\u663E\u793A on/off`);break}case"slider":case"progress":{let d=g;if(!d.varName){t.push(`\u5B58\u5728\u672A\u547D\u540D${g.kind==="slider"?"\u6ED1\u5757":"\u8FDB\u5EA6"}\u6761\u76EE\uFF08\u9875\u9762 ${c.name}\uFF09`);break}s(d.varName,"int",String(Math.trunc(d.initialValue)),!1,g);break}case"button":{let d=X(g.cbName,"btn_cb");r.has(d)||r.set(d,g.buttonId);break}case"board":m.add(X(g.cbName,"board_cb"));break;case"chart":{let d=ee++;p.push(`#define CHART${d}_LEN ${Math.max(2,Math.trunc(g.dataLen))}`,`static float chart${d}_data[CHART${d}_LEN];`,`static float chart${d}_dis[CHART${d}_LEN];`,`static u8g2_chart_t chart${d};`,`static uint8_t chart${d}_inited = 0;`);let k=g.sample==="sine"?`chart${d}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);`:g.sample==="ramp"?`chart${d}_data[i] = (float)i;`:`chart${d}_data[i] = (float)((i * 37) % CHART${d}_LEN);`,b=`chart${d}_fill`,I=(a.get(b)??"").trim()!=="";o.push([`    if (!chart${d}_inited) {`,`        chart${d}_inited = 1;`,`        u8g2_chart_init(&chart${d}, chart${d}_data, chart${d}_dis, CHART${d}_LEN);`,D(b,a,"        "),...I?[]:[`        for (uint16_t i = 0; i < CHART${d}_LEN; ++i) { ${k} }`],"    }"].join(`
`));break}case"xbm":{let d=X(g.name,"icon");for(;M.has(d);)d=`${d}_2`;M.add(d),Q.set(g.id,d);let k=g.bits.length,b=g.bits.map(I=>`0x${(I&255).toString(16).padStart(2,"0")}`).join(", ");l.push(`static const uint8_t menu_xbm_${d}[${k}] = { ${b} };`);break}case"textarea":{let d=te++;f.push(`static char ta${d}_text[] = "${re(g.content)}";`,`static u8g2_menu_textArea_t ta${d};`,`static uint8_t ta${d}_inited = 0;`),S.push(`    if (!ta${d}_inited) {`,`        ta${d}_inited = 1;`,`        u8g2_textArea_init(&ta${d}, ta${d}_text);`,`        u8g2_textArea_setLineSpacing(&ta${d}, ${Math.max(0,Math.trunc(g.lineSpacing))});`,"    }");break}default:break}let R=(c,g)=>{if(!c)return"";let d=`"${re(c)}"`;return g===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${d});`:`u8g2_MenuUTF8Printf(${d});`},le=(c,g,d)=>{let k=`"${re(c)}"`;return g===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${k}, ${d});`:`u8g2_MenuUTF8Printf(${k}, ${d});`},F=0,N=0,he=(c,g)=>{let d=[],k=`${g.name}`;switch(c.kind){case"text":{let b=R(c.text,c.scale);b&&d.push(`    ${b}`);break}case"number":{let b=c;if(!u.has(b.varName))break;let I=b.varType==="float"||b.varType==="double"?`u8g2_MenuItemValue_${b.varType}(&${b.varName}, ${W(b.step)}, ${W(b.min)}, ${W(b.max)});`:`u8g2_MenuItemValue_${b.varType}(&${b.varName}, ${Math.trunc(b.step)}, ${Math.trunc(b.min)}, ${Math.trunc(b.max)});`;d.push(`    ${I}`),d.push(`    ${le(b.text,b.scale,b.varName)}`);break}case"switch":{let b=c;if(!u.has(b.varName))break;d.push(`    u8g2_MenuItemValue_switch(&${b.varName}, ${Math.trunc(b.openValue)});`),d.push(`    ${le(b.text,b.scale,`${b.varName} ? "${re(b.onText)}" : "${re(b.offText)}"`)}`);break}case"button":{let b=X(c.cbName,"btn_cb");d.push(`    u8g2_MenuItem_button(${b}, ${Math.trunc(c.buttonId)});`);let I=R(c.text,c.scale);I&&d.push(`    ${I}`);break}case"submenu":{if(!c.targetPageId){t.push(`\u9875\u9762 ${k} \u7684\u5B50\u9875\u9762\u6761\u76EE "${c.text||c.label||c.id}" \u672A\u6307\u5B9A\u76EE\u6807\u9875\u9762\uFF0C\u5DF2\u6309\u666E\u901A\u6587\u672C\u751F\u6210`);let O=R(c.text,c.scale);O&&d.push(`    ${O}`);break}let b=i.pages.findIndex(O=>O.id===c.targetPageId);if(b<0){t.push(`\u9875\u9762 ${k} \u7684\u5B50\u9875\u9762\u6761\u76EE\u76EE\u6807\u65E0\u6548`);break}d.push(`    u8g2_MenuItem_menu_enter(${n[b]});`);let I=R(c.text,c.scale);I&&d.push(`    ${I}`);break}case"back":{d.push("    u8g2_MenuItem_menu_back();");let b=R(c.text,c.scale);b&&d.push(`    ${b}`);break}case"slider":{let b=c;if(!u.has(b.varName))break;d.push(`    u8g2_MenuDrawItemSlider_bind(&${b.varName}, ${Math.trunc(b.step)}, ${Math.trunc(b.min)}, ${Math.trunc(b.max)});`);break}case"progress":{let b=c;if(!u.has(b.varName))break;d.push(`    u8g2_MenuDrawItemProgressBar_bind(&${b.varName}, ${Math.trunc(b.step)}, ${Math.trunc(b.min)}, ${Math.trunc(b.max)});`);break}case"chart":{let b=F++;d.push(...o[b].split(`
`));let I=c.chartKind==="point"?"Point":c.chartKind==="bar"?"Bar":"Line",O=c.min!==void 0&&c.max!==void 0?`${W(c.max)}, ${W(c.min)}`:"0, 0";d.push(`    u8g2_MenuDrawItem${I}Chart(&chart${b}, ${Math.max(4,Math.trunc(c.height))}, ${O});`);break}case"xbm":d.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(c.w)}, ${Math.trunc(c.h)}, menu_xbm_${Q.get(c.id)??X(c.name,"icon")});`);break;case"textarea":{let b=N++;d.push(...S[b].split(`
`));let I=c.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";d.push(`    ${I}(&ta${b}, ${Math.max(10,Math.trunc(c.height))});`);break}case"board":{let b=X(c.cbName,"board_cb");d.push(`    u8g2_MenuDrawItemBoard(${b}, ${Math.max(1,Math.trunc(c.w))}, ${Math.max(1,Math.trunc(c.h))});`);break}}return d},x=[];x.push("/**"),x.push(` * \u7531 u8g2-menu-editor \u81EA\u52A8\u751F\u6210\uFF0C\u5DE5\u7A0B: ${i.name}`),x.push(" * \u91CD\u65B0\u751F\u6210\u65F6\uFF0CUSER CODE \u533A\u57DF\u5185\u7684\u624B\u5199\u5185\u5BB9\u4F1A\u88AB\u4FDD\u7559\u3002"),x.push(" */"),x.push('#include "menu_pages.h"'),x.push('#include "u8g2_menu.h"'),p.length&&x.push("#include <math.h>"),x.push(""),x.push(D("includes",a,"")),x.push(""),x.push("/* ======================== \u53D8\u91CF\u5B9A\u4E49 ======================== */"),x.push(D("variables",a,""));for(let c of u.values())x.push(`${c.type} ${c.name} = ${c.init};`);if(x.push(""),(p.length||f.length||l.length)&&(x.push("/* ======================== \u9875\u9762\u8D44\u6E90 ======================== */"),x.push(...p,...f,...l),x.push("")),r.size||m.size){x.push("/* ======================== \u56DE\u8C03\u51FD\u6570 ======================== */"),x.push(D("callbacks",a,""));for(let[c]of r)x.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID)`),x.push("{"),x.push(D(`cb_${c}`,a,"    ")),x.push("}"),x.push("");for(let c of m)x.push(`void ${c}(u8g2_t *u8g2)`),x.push("{"),x.push(D(`cb_${c}`,a,"    ")),x.push("}"),x.push("")}x.push("/* ======================== \u9875\u9762\u51FD\u6570 ======================== */"),x.push(""),i.pages.forEach((c,g)=>{x.push(`/* \u9875\u9762: ${c.name} */`),x.push(`void ${n[g]}(void)`),x.push("{"),x.push(D(`page_${n[g]}_pre`,a,"    "));for(let d of c.items)x.push(...he(d,c));x.push("}"),x.push("")});let y=[];if(y.push("#ifndef MENU_PAGES_H"),y.push("#define MENU_PAGES_H"),y.push(""),y.push('#include "u8g2_menu.h"'),y.push(""),y.push("/* \u9875\u9762\u5165\u53E3\u3002\u9996\u4E2A\u9875\u9762\u4F5C\u4E3A u8g2_CreateMenu \u7684\u521D\u59CB\u9875\u9762\u3002 */"),n.forEach((c,g)=>y.push(`void ${c}(void);   /* ${i.pages[g].name} */`)),y.push(""),u.size){y.push("/* \u53EF\u7F16\u8F91\u53D8\u91CF\uFF08\u5728\u6761\u76EE\u7ED1\u5B9A\u4E2D\u4F7F\u7528\uFF09 */");for(let c of u.values())y.push(`extern ${c.type} ${c.name};`);y.push("")}if(r.size||m.size){y.push("/* \u7528\u6237\u56DE\u8C03 */");for(let[c]of r)y.push(`void ${c}(u8g2_menu_t *menu, uint8_t ID);`);for(let c of m)y.push(`void ${c}(u8g2_t *u8g2);`);y.push("")}y.push("#endif /* MENU_PAGES_H */");let v=x.join(`
`).replace(/\n{3,}/g,`


`),w=y.join(`
`);return{c:`${v}
`,h:`${w}
`,warnings:t}}var be=(r=>(r[r.None=0]="None",r[r.Up=1]="Up",r[r.Down=2]="Down",r[r.Enter=3]="Enter",r[r.Return=4]="Return",r[r.Add=5]="Add",r[r.Sub=6]="Sub",r))(be||{});var yt=128*64/8;function It(i){return new Promise((e,t)=>{let a=document.createElement("script");a.src=i,a.onload=()=>e(),a.onerror=()=>t(new Error(`\u9884\u89C8\u5F15\u64CE\u811A\u672C\u52A0\u8F7D\u5931\u8D25: ${i}`)),document.head.appendChild(a)})}var pe=class{constructor(e,t={}){this.mod=null;this.img=null;this.raf=0;this.lastT=0;this.running=!1;this.fontIndexCache=new Map;this.structSig="";this.lastKnownPage=0;this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",e.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=t}async load(e){if(this.mod)return;let t=window;t.U8G2MenuPreview||await It(e);let a=t.U8G2MenuPreview;if(!a)throw new Error("U8G2MenuPreview \u672A\u627E\u5230\uFF08\u68C0\u67E5 wasmUrl\uFF09");this.mod=await a({locateFile:u=>e.replace(/[^/\\]*$/,"")+u}),this.mod.ccall("em_init",null,["number","number"],[128,64]);let n=this.mod._em_font_count_export();for(let u=0;u<n;u++){let s=this.mod._em_font_name(u);this.fontIndexCache.set(this.mod.UTF8ToString(s),u)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(e){return this.fontIndexCache.get(e)??0}signature(e){return JSON.stringify(e.pages.map(t=>({n:t.items.length,k:t.items.map(a=>a.kind).join(","),res:t.items.map(a=>a.kind==="chart"?`${a.dataLen}|${a.sample}`:a.kind==="xbm"?`${a.w}x${a.h}`:a.kind==="textarea"?Math.ceil(a.content.length/64):"").join(",")})))}sync(e){let t=this.mod;if(!t)return;let a=this.signature(e);a!==this.structSig&&(t.ccall("em_reset_dynamic",null,[],[]),this.structSig=a);let n=u=>Math.trunc(Number.isFinite(u)?u:0);e.pages.forEach((u,s)=>{t.ccall("em_page_begin",null,["number"],[s]),u.items.forEach((r,m)=>{let p=["number","number"];switch(r.kind){case"text":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,0,0,r.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[s,m,r.text]);break;case"number":{let o={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[r.varType],l=r.varType==="float"||r.varType==="double"?Math.round(r.initialValue):n(r.initialValue);t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,1,o,r.scale,0,0,0,0,0,l,n(r.step),n(r.min),n(r.max),-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[s,m,r.text]);break}case"switch":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,2,0,r.scale,0,0,n(r.openValue),0,0,n(r.initialValue),0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[s,m,r.text]),t.ccall("em_item_swtext",null,["number","number","string","string"],[s,m,r.onText,r.offText]);break;case"button":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,3,0,r.scale,0,0,0,n(r.buttonId),0,0,0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[s,m,r.text]);break;case"submenu":{let o=e.pages.findIndex(l=>l.id===r.targetPageId);t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,4,0,r.scale,0,0,0,0,0,0,0,0,0,o,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[s,m,r.text]);break}case"back":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,5,0,r.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),t.ccall("em_item_text",null,["number","number","string"],[s,m,r.text]);break;case"slider":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,6,0,1,0,0,0,0,0,n(r.initialValue),n(r.step),n(r.min),n(r.max),-1,0,0,0,0,0]);break;case"progress":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,7,0,1,0,0,0,0,0,n(r.initialValue),n(r.step),n(r.min),n(r.max),-1,0,0,0,0,0]);break;case"chart":{let o={sine:0,ramp:1,noise:2}[r.sample],l=r.min!==void 0&&r.max!==void 0?1:0;t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,8,0,1,{line:0,point:1,bar:2}[r.chartKind],0,0,0,l,o,0,l?n(r.min):0,l?n(r.max):0,-1,0,0,n(r.height),n(r.dataLen),0]);break}case"xbm":{t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,9,0,1,0,0,0,0,0,0,0,0,0,-1,n(r.w),n(r.h),0,0,0]);let o=t._em_scratch(r.bits.length);o&&(t.HEAPU8.set(new Uint8Array(r.bits),o),t._em_item_bits(s,m,o,r.bits.length));break}case"textarea":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,10,0,1,0,r.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,n(r.height),0,n(r.lineSpacing)]),t.ccall("em_item_text",null,["number","number","string"],[s,m,r.content]);break;case"board":t.ccall("em_page_item",null,[...p,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[s,m,11,0,1,0,0,0,0,0,0,0,0,0,-1,n(r.w),n(r.h),0,0,0]);break}}),t.ccall("em_page_end",null,["number","number"],[s,u.items.length])}),t.ccall("em_pages_commit",null,["number"],[e.pages.length]),t.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(e.font),{default:0,rotundity:1,square:2}[e.selector],n(e.selectorLeftMargin),n(e.selectorTopMargin),n(e.selectorLineSpacing),e.marqueeSpeed,e.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();let e=t=>{if(!this.running)return;let a=Math.min(100,Math.round(t-this.lastT));this.lastT=t,this.renderFrame(a),this.raf=requestAnimationFrame(e)};this.raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(e){let t=this.mod;if(!t)return;let a=t._em_frame(e);if(!a)return;this.img||(this.img=this.ctx.createImageData(128,64));let n=t.HEAPU8.subarray(a,a+yt),u=this.img.data;u.fill(255);for(let r=0;r<64;r++){let m=(r>>3)*128,p=1<<(r&7),o=r*128*4;for(let l=0;l<128;l++)n[m+l]&p&&(u[o]=17,u[o+1]=24,u[o+2]=39),o+=4}this.ctx.putImageData(this.img,0,0);let s=t._em_get_current_page();s!==this.lastKnownPage&&(this.lastKnownPage=s,this.events.onPageChanged?.(s))}key(e){this.mod?.ccall("em_key",null,["number"],[e])}getInt(e,t){return this.mod?._em_get_ipool(e*64+t)??0}getSwitch(e,t){return this.mod?._em_get_upool(e*64+t)??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}};var Te=globalThis,Ve=i=>i,ge=Te.trustedTypes,Fe=ge?ge.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ge="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,Ye="?"+j,wt=`<${Ye}>`,K=document,ie=()=>K.createComment(""),se=i=>i===null||typeof i!="object"&&typeof i!="function",Ne=Array.isArray,St=i=>Ne(i)||typeof i?.[Symbol.iterator]=="function",we=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Oe=/-->/g,qe=/>/g,B=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Xe=/"/g,Je=/^(?:script|style|textarea|title)$/i,Pe=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),h=Pe(1),Zt=Pe(2),Qt=Pe(3),oe=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),We=new WeakMap,U=K.createTreeWalker(K,129);function Ze(i,e){if(!Ne(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fe!==void 0?Fe.createHTML(e):e}var Et=(i,e)=>{let t=i.length-1,a=[],n,u=e===2?"<svg>":e===3?"<math>":"",s=ae;for(let r=0;r<t;r++){let m=i[r],p,o,l=-1,f=0;for(;f<m.length&&(s.lastIndex=f,o=s.exec(m),o!==null);)f=s.lastIndex,s===ae?o[1]==="!--"?s=Oe:o[1]!==void 0?s=qe:o[2]!==void 0?(Je.test(o[2])&&(n=RegExp("</"+o[2],"g")),s=B):o[3]!==void 0&&(s=B):s===B?o[0]===">"?(s=n??ae,l=-1):o[1]===void 0?l=-2:(l=s.lastIndex-o[2].length,p=o[1],s=o[3]===void 0?B:o[3]==='"'?Xe:ze):s===Xe||s===ze?s=B:s===Oe||s===qe?s=ae:(s=B,n=void 0);let S=s===B&&i[r+1].startsWith("/>")?" ":"";u+=s===ae?m+wt:l>=0?(a.push(p),m.slice(0,l)+Ge+m.slice(l)+j+S):m+j+(l===-2?r:S)}return[Ze(i,u+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},ue=class i{constructor({strings:e,_$litType$:t},a){let n;this.parts=[];let u=0,s=0,r=e.length-1,m=this.parts,[p,o]=Et(e,t);if(this.el=i.createElement(p,a),U.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(n=U.nextNode())!==null&&m.length<r;){if(n.nodeType===1){if(n.hasAttributes())for(let l of n.getAttributeNames())if(l.endsWith(Ge)){let f=o[s++],S=n.getAttribute(l).split(j),M=/([.?@])?(.*)/.exec(f);m.push({type:1,index:u,name:M[2],strings:S,ctor:M[1]==="."?Ee:M[1]==="?"?ke:M[1]==="@"?Me:Y}),n.removeAttribute(l)}else l.startsWith(j)&&(m.push({type:6,index:u}),n.removeAttribute(l));if(Je.test(n.tagName)){let l=n.textContent.split(j),f=l.length-1;if(f>0){n.textContent=ge?ge.emptyScript:"";for(let S=0;S<f;S++)n.append(l[S],ie()),U.nextNode(),m.push({type:2,index:++u});n.append(l[f],ie())}}}else if(n.nodeType===8)if(n.data===Ye)m.push({type:2,index:u});else{let l=-1;for(;(l=n.data.indexOf(j,l+1))!==-1;)m.push({type:7,index:u}),l+=j.length-1}u++}}static createElement(e,t){let a=K.createElement("template");return a.innerHTML=e,a}};function G(i,e,t=i,a){if(e===oe)return e;let n=a!==void 0?t._$Co?.[a]:t._$Cl,u=se(e)?void 0:e._$litDirective$;return n?.constructor!==u&&(n?._$AO?.(!1),u===void 0?n=void 0:(n=new u(i),n._$AT(i,t,a)),a!==void 0?(t._$Co??=[])[a]=n:t._$Cl=n),n!==void 0&&(e=G(i,n._$AS(i,e.values),n,a)),e}var Se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,n=(e?.creationScope??K).importNode(t,!0);U.currentNode=n;let u=U.nextNode(),s=0,r=0,m=a[0];for(;m!==void 0;){if(s===m.index){let p;m.type===2?p=new me(u,u.nextSibling,this,e):m.type===1?p=new m.ctor(u,m.name,m.strings,this,e):m.type===6&&(p=new Ae(u,this,e)),this._$AV.push(p),m=a[++r]}s!==m?.index&&(u=U.nextNode(),s++)}return U.currentNode=K,n}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},me=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,n){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),se(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==oe&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):St(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&se(this._$AH)?this._$AA.nextSibling.data=e:this.T(K.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,n=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=ue.createElement(Ze(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===n)this._$AH.p(t);else{let u=new Se(n,this),s=u.u(this.options);u.p(t),this.T(s),this._$AH=u}}_$AC(e){let t=We.get(e.strings);return t===void 0&&We.set(e.strings,t=new ue(e)),t}k(e){Ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,n=0;for(let u of e)n===t.length?t.push(a=new i(this.O(ie()),this.O(ie()),this,this.options)):a=t[n],a._$AI(u),n++;n<t.length&&(this._$AR(a&&a._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=Ve(e).nextSibling;Ve(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,n,u){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=u,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=_}_$AI(e,t=this,a,n){let u=this.strings,s=!1;if(u===void 0)e=G(this,e,t,0),s=!se(e)||e!==this._$AH&&e!==oe,s&&(this._$AH=e);else{let r=e,m,p;for(e=u[0],m=0;m<u.length-1;m++)p=G(this,r[a+m],t,m),p===oe&&(p=this._$AH[m]),s||=!se(p)||p!==this._$AH[m],p===_?e=_:e!==_&&(e+=(p??"")+u[m+1]),this._$AH[m]=p}s&&!n&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ee=class extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}},ke=class extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}},Me=class extends Y{constructor(e,t,a,n,u){super(e,t,a,n,u),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??_)===oe)return;let a=this._$AH,n=e===_&&a!==_||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,u=e!==_&&(a===_||n);n&&this.element.removeEventListener(this.name,this,a),u&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ae=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}};var kt=Te.litHtmlPolyfillSupport;kt?.(ue,me),(Te.litHtmlVersions??=[]).push("3.3.3");var A=(i,e,t)=>{let a=t?.renderBefore??e,n=a._$litPart$;if(n===void 0){let u=t?.renderBefore??null;a._$litPart$=n=new me(e.insertBefore(ie(),u),u,void 0,t??{})}return n._$AI(i),n};var Mt=Object.keys(z);function At(i,e,t,a){let n=i.getState(),u=t.label||"text"in t&&t.text||z[t.kind],s=r=>m=>{m.stopPropagation(),i.getState().moveItem(e.id,t.id,r)};return h`<div class="ume-item-row ${a?"selected":""}"
    @click=${()=>i.getState().select(e.id,t.id)}>
    <span class="ume-item-icon">${Ke[t.kind]}</span>
    <span class="ume-item-name" title=${u}>${u}</span>
    <button class="ume-mini" title="上移" @click=${s(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${s(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${r=>{r.stopPropagation(),n.duplicateItem(e.id,t.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${r=>{r.stopPropagation(),n.removeItem(e.id,t.id)}}>✕</button>
  </div>`}function Tt(i,e){let t=i.getState();return h`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${a=>{let n=a.target.value;n&&t.addItem(n,e.id),a.target.value=""}}>
    <option value="">＋条目</option>
    ${Mt.map(a=>h`<option value=${a}>${z[a]}</option>`)}
  </select>`}function Qe(i,e){let{project:t,selection:a}=e.getState(),n=u=>{let s=e.getState(),r=a.pageId===u.id;return h`<div class="ume-page">
      <div class="ume-page-head ${r?"selected":""}"
        @click=${()=>e.getState().select(u.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${u.name}</span>
        <button class="ume-mini" title="上移页面" @click=${m=>{m.stopPropagation(),s.movePage(u.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${m=>{m.stopPropagation(),s.movePage(u.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${m=>{if(m.stopPropagation(),t.pages.length<=1){alert("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u9762");return}confirm(`\u5220\u9664\u9875\u9762 "${u.name}"\uFF1F`)&&s.removePage(u.id)}}>✕</button>
      </div>
      ${r?h`<div class="ume-page-items">
        ${u.items.length?u.items.map(m=>At(e,u,m,a.itemId===m.id)):h`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Tt(e,u)}</div>
      </div>`:_}
    </div>`};A(h`
    <div class="ume-panel-title">
      页面 / 条目 (${t.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Nt(e)}>＋ 页面</button>
    </div>
    ${t.pages.map(n)}
  `,i)}function Nt(i){let e=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${i.getState().project.pages.length+1}`);e!==null&&i.getState().addPage(e||void 0)}function E(i,e,t,a=""){return h`<div class="ume-field">
    <label>${i}</label>
    <input type="text" .value=${e??""} placeholder=${a}
      @change=${n=>t(n.target.value)} />
  </div>`}function $(i,e,t,a=1){return h`<div class="ume-field">
    <label>${i}</label>
    <input type="number" .value=${String(e)} step=${String(a)}
      @change=${n=>{let u=parseFloat(n.target.value);t(Number.isFinite(u)?u:0)}} />
  </div>`}function T(i,e,t,a){return h`<div class="ume-field">
    <label>${i}</label>
    <select @change=${n=>a(n.target.value)}>
      ${t.map(n=>h`<option value=${n.value} ?selected=${n.value===e}>${n.label}</option>`)}
    </select>
  </div>`}function et(i,e,t){return h`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${e}
      @change=${a=>t(a.target.checked)} />
    <span>${i}</span>
  </div>`}function Ce(i,e,t,a=!1){return h`<div class="ume-field wide">
    <label>${i}</label>
    <textarea style=${a?"font-family:Consolas,monospace":""}
      @change=${n=>t(n.target.value)}>${e??""}</textarea>
  </div>`}function J(i,e,t="text/plain"){let a=new Blob([e],{type:`${t};charset=utf-8`}),n=document.createElement("a");n.href=URL.createObjectURL(a),n.download=i,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),5e3)}var Pt=[{value:"uint8",label:"uint8"},{value:"uint16",label:"uint16"},{value:"uint32",label:"uint32"},{value:"int8",label:"int8"},{value:"int16",label:"int16"},{value:"int32",label:"int32"},{value:"int",label:"int"}],Ct=[...Pt,{value:"float",label:"float"},{value:"double",label:"double"}];function tt(i,e,t){let{project:a,selection:n}=e.getState(),u=a.pages.find(o=>o.id===n.pageId)??null,s=u?.items.find(o=>o.id===n.itemId)??null,r=(o,l)=>e.getState().updateItem(u.id,s.id,o,l),m=h`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,p="\u5C5E\u6027";if(u&&!s)p="\u9875\u9762\u5C5E\u6027",m=h`
      ${E("\u540D\u79F0",u.name,o=>e.getState().updatePage(u.id,{name:o}))}
      ${E("C \u51FD\u6570\u540D",u.fnName,o=>e.getState().updatePage(u.id,{fnName:o}),"\u7559\u7A7A\u81EA\u52A8 page_N")}
      ${Ce("\u7528\u6237\u4EE3\u7801",u.userCodePre,o=>e.getState().updatePage(u.id,{userCodePre:o}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(u&&s)switch(p=`${z[s.kind]}`,s.kind){case"text":m=h`
          ${E("\u6587\u672C/\u683C\u5F0F",s.text,o=>r({text:o},`text-${s.id}`))}
          ${T("\u5927\u5C0F",String(s.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],o=>r({scale:Number(o)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{let o=s,l=o.varType==="float"||o.varType==="double";m=h`
          ${T("\u53D8\u91CF\u7C7B\u578B",o.varType,Ct,f=>r({varType:f}))}
          ${E("\u53D8\u91CF\u540D",o.varName,f=>r({varName:f}))}
          ${E("\u663E\u793A\u6587\u672C",o.text,f=>r({text:f},`text-${s.id}`))}
          ${$("\u6B65\u957F",o.step,f=>r({step:f}),"any")}
          ${$("\u6700\u5C0F\u503C",o.min,f=>r({min:f}),"any")}
          ${$("\u6700\u5927\u503C",o.max,f=>r({max:f}),"any")}
          ${$("\u521D\u59CB\u503C",o.initialValue,f=>r({initialValue:f}),"any")}
          ${l?$("\u5C0F\u6570\u4F4D",o.decimals,f=>r({decimals:Math.max(0,Math.trunc(f))})):_}
          ${T("\u5927\u5C0F",String(o.scale),[{value:"1",label:"\u6B63\u5E38"},{value:"2",label:"\u4E8C\u500D\u5927"}],f=>r({scale:Number(f)}))}
          <div class="ume-hint">int 建议 %d/%u，float 建议 %.Nf</div>
        `;break}case"switch":{let o=s;m=h`
          ${E("\u53D8\u91CF\u540D",o.varName,l=>r({varName:l}))}
          ${E("\u663E\u793A\u6587\u672C",o.text,l=>r({text:l},`text-${s.id}`))}
          ${$("openValue",o.openValue,l=>r({openValue:Math.max(0,Math.trunc(l))}))}
          ${E('"\u5F00"\u6587\u672C',o.onText,l=>r({onText:l}))}
          ${E('"\u5173"\u6587\u672C',o.offText,l=>r({offText:l}))}
          ${$("\u521D\u59CB\u503C",o.initialValue,l=>r({initialValue:Math.trunc(l)}))}
        `;break}case"button":{let o=s;m=h`
          ${E("\u663E\u793A\u6587\u672C",o.text,l=>r({text:l},`text-${s.id}`))}
          ${E("\u56DE\u8C03\u51FD\u6570\u540D",o.cbName,l=>r({cbName:l}))}
          ${$("ID",o.buttonId,l=>r({buttonId:Math.trunc(l)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{let o=s;m=h`
          ${E("\u663E\u793A\u6587\u672C",o.text,l=>r({text:l},`text-${s.id}`))}
          ${T("\u76EE\u6807\u9875\u9762",o.targetPageId??"",[{value:"",label:"\uFF08\u672A\u8BBE\u7F6E\uFF09"},...a.pages.filter(l=>l.id!==u.id).map(l=>({value:l.id,label:l.name}))],l=>r({targetPageId:l||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{m=h`
          ${E("\u663E\u793A\u6587\u672C",s.text,o=>r({text:o},`text-${s.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{let o=s;m=h`
          ${E("\u53D8\u91CF\u540D (int)",o.varName,l=>r({varName:l}))}
          ${$("\u6B65\u957F",o.step,l=>r({step:Math.trunc(l)}))}
          ${$("\u6700\u5C0F\u503C",o.min,l=>r({min:Math.trunc(l)}))}
          ${$("\u6700\u5927\u503C",o.max,l=>r({max:Math.trunc(l)}))}
          ${$("\u521D\u59CB\u503C",o.initialValue,l=>r({initialValue:Math.trunc(l)}))}
          <div class="ume-hint">绑定 u8g2_MenuDrawItem${o.kind==="slider"?"Slider":"ProgressBar"}_bind</div>
        `;break}case"chart":{let o=s;m=h`
          ${T("\u7C7B\u578B",o.chartKind,[{value:"line",label:"\u6298\u7EBF\u56FE"},{value:"point",label:"\u6563\u70B9\u56FE"},{value:"bar",label:"\u67F1\u72B6\u56FE"}],l=>r({chartKind:l}))}
          ${$("\u6570\u636E\u70B9\u6570",o.dataLen,l=>r({dataLen:Math.max(2,Math.trunc(l))}))}
          ${$("\u9AD8\u5EA6(px)",o.height,l=>r({height:Math.max(8,Math.trunc(l))}))}
          ${T("\u793A\u4F8B\u6570\u636E",o.sample,[{value:"sine",label:"\u6B63\u5F26"},{value:"ramp",label:"\u659C\u5761"},{value:"noise",label:"\u4F2A\u968F\u673A"}],l=>r({sample:l}))}
          ${$("\u91CF\u7A0B\u4E0A\u9650",o.max??0,l=>r({max:l||void 0}),"any")}
          ${$("\u91CF\u7A0B\u4E0B\u9650",o.min??0,l=>r({min:l||void 0}),"any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;break}case"xbm":{let o=s;m=h`
          ${E("\u6570\u7EC4\u540D",o.name,l=>r({name:l}))}
          ${$("\u5BBD(px)",o.w,l=>r({w:Math.min(128,Math.max(1,Math.trunc(l)))}))}
          ${$("\u9AD8(px)",o.h,l=>r({h:Math.min(64,Math.max(1,Math.trunc(l)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>t.openXbmEditor(u.id,o.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${o.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{let o=s;m=h`
          ${Ce("\u6587\u672C\u5185\u5BB9",o.content,l=>r({content:l}))}
          ${$("\u9AD8\u5EA6(px)",o.height,l=>r({height:Math.max(10,Math.trunc(l))}))}
          ${$("\u884C\u95F4\u8DDD",o.lineSpacing,l=>r({lineSpacing:Math.max(0,Math.trunc(l))}))}
          ${et("\u4E0A\u4E0B\u952E\u6EDA\u52A8 (bind)",o.bindScroll,l=>r({bindScroll:l}))}
        `;break}case"board":{let o=s;m=h`
          ${$("\u5BBD(px)",o.w,l=>r({w:Math.max(1,Math.trunc(l))}))}
          ${$("\u9AD8(px)",o.h,l=>r({h:Math.max(1,Math.trunc(l))}))}
          ${E("\u56DE\u8C03\u51FD\u6570\u540D",o.cbName,l=>r({cbName:l}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}A(h`
    <div class="ume-panel-title">属性 ${p!=="\u5C5E\u6027"?h`<span class="ume-kind-badge">${p}</span>`:_}</div>
    ${m}
  `,i)}function nt(i,e){let{project:t}=e.getState(),a=(n,u)=>e.getState().update(s=>{Object.assign(s,n)},u);A(h`
    <div class="ume-panel-title">工程</div>
    ${E("\u5DE5\u7A0B\u540D",t.name,n=>a({name:n}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${t.width}×${t.height}
        ${t.width!==128||t.height!==64?"\uFF08\u9884\u89C8\u56FA\u5B9A 128\xD764\uFF0C\u751F\u6210\u4EE3\u7801\u4F7F\u7528\u6B64\u503C\uFF09":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${T("\u5B57\u4F53",t.font,$e.map(n=>({value:n.id,label:n.label})),n=>a({font:n}))}
    ${T("\u9009\u62E9\u5668",t.selector,[{value:"default",label:"\u9ED8\u8BA4 (\u53CD\u8272\u884C)"},{value:"rotundity",label:"\u5706\u5F62"},{value:"square",label:"\u65B9\u5F62"}],n=>a({selector:n}))}
    ${$("\u5DE6\u8FB9\u8DDD",t.selectorLeftMargin,n=>a({selectorLeftMargin:Math.max(0,Math.trunc(n))}))}
    ${$("\u9876\u8FB9\u8DDD",t.selectorTopMargin,n=>a({selectorTopMargin:Math.max(0,Math.trunc(n))}))}
    ${$("\u884C\u95F4\u8DDD",t.selectorLineSpacing,n=>a({selectorLineSpacing:Math.max(0,Math.trunc(n))}))}
    ${$("\u8DD1\u9A6C\u706F\u901F\u5EA6",t.marqueeSpeed,n=>a({marqueeSpeed:n}),.05)}
    ${$("\u8DD1\u9A6C\u706F\u505C\u7559",t.marqueeHeaderLen,n=>a({marqueeHeaderLen:n}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>
  `,i)}function rt(i,e){let t=n=>{let u,s=()=>{u&&(clearInterval(u),u=void 0)};return{down:r=>{r.preventDefault(),e.key(n),s(),u=window.setInterval(()=>e.key(n),180)},up:s}},a=(n,u,s)=>{let r=t(n);return h`<button class="ume-key" title=${s}
      @pointerdown=${r.down} @pointerup=${r.up} @pointerleave=${r.up}>${u}</button>`};A(h`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${n=>{let s={ArrowUp:1,ArrowDown:2,Enter:3,Escape:4,Backspace:4,"+":5,"-":6,"=":5,_:6}[n.key];s!==void 0&&(n.preventDefault(),e.key(s))}}>
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
      <span id="ume-live-page"></span>
      <span id="ume-live-value"></span>
    </div>
  `,i)}var Z=null,V="c";function it(i,e){Z=e,Lt(i)}function Lt(i){if(!Z)return;let e=V==="c"?Z.c:Z.h,t=document.createElement("div");t.className="ume-modal-mask",t.addEventListener("click",n=>{n.target===t&&at(t)});let a=()=>{A(h`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>at(t)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${Z.warnings.length?h`
            <div style="margin-bottom:8px">
              ${Z.warnings.map(n=>h`<div class="ume-warn">⚠ ${n}</div>`)}
            </div>`:_}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${V==="c"?"primary":""}" @click=${()=>{V="c",a()}}>menu_pages.c</button>
            <button class="ume-btn sm ${V==="h"?"primary":""}" @click=${()=>{V="h",a()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${e}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(e).then(()=>Ht(t,"\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{J(V==="c"?"menu_pages.c":"menu_pages.h",e)}}>下载 ${V==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,t)};a(),i.appendChild(t)}function at(i){i.remove()}function Ht(i,e){let t=i.closest(".ume")??document.body,a=t.querySelector(".ume-toast");a||(a=document.createElement("div"),a.className="ume-toast",t.appendChild(a)),a.textContent=e,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),1600)}function ot(i,e,t,a){let s=e.getState().project.pages.find(v=>v.id===t)?.items.find(v=>v.id===a);if(!s||s.kind!=="xbm")return;let r=s,m=r.w,p=r.h,o=[...r.bits],l=()=>Math.ceil(m/8),f=document.createElement("div");f.className="ume-modal-mask",f.addEventListener("click",v=>{v.target===f&&y()});let S=(v,w)=>{let c=w*l()+(v>>3);return c<o.length?!!(o[c]>>(v&7)&1):!1},M=(v,w,c)=>{let g=w*l()+(v>>3);o[g]=c?o[g]|1<<(v&7):o[g]&~(1<<(v&7))},Q=(v,w)=>{let c=Math.ceil(m/8),g=Math.ceil(v/8),d=new Array(g*w).fill(0);for(let k=0;k<Math.min(p,w);k++)for(let b=0;b<Math.min(m,v);b++){let I=k*c+(b>>3);I<o.length&&o[I]>>(b&7)&1&&(d[k*g+(b>>3)]|=1<<(b&7))}m=v,p=w,o=d},ee=!1,te=!0,R=(v,w)=>c=>{c.preventDefault(),ee=!0,te=!S(v,w),M(v,w,te),N()},le=(v,w)=>()=>{ee&&(M(v,w,te),N())},F=()=>{ee=!1},N=()=>{A(x(),f)},he=()=>{let v=[];for(let w=0;w<p;w++)for(let c=0;c<m;c++)v.push(h`<button class="ume-xbm-cell ${S(c,w)?"on":""}"
          data-x=${c} data-y=${w}
          @pointerdown=${R(c,w)}
          @pointerenter=${le(c,w)}></button>`);return v},x=()=>h`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${m}×${p}</span></span>
        <button class="ume-mini" @click=${y}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${F}
        @pointerleave=${F}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(m)} min="1" max="128"
            @change=${v=>{Q(st(+v.target.value,1,128),p),N()}} />
          <input type="number" style="width:64px" .value=${String(p)} min="1" max="64"
            @change=${v=>{Q(m,st(+v.target.value,1,64)),N()}} />
          <button class="ume-btn sm" @click=${()=>{o=o.map(()=>0),N()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{o=o.map(v=>~v&255),N()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${m}, 14px)">${he()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${r.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${y}>取消</button>
        <button class="ume-btn primary" @click=${()=>{e.getState().updateItem(t,a,{w:m,h:p,bits:[...o]}),y()}}>应用</button>
      </div>
    </div>
  `;function y(){f.remove(),document.removeEventListener("pointerup",F)}document.addEventListener("pointerup",F),N(),i.appendChild(f)}function st(i,e,t){return Number.isFinite(i)?Math.min(t,Math.max(e,Math.trunc(i))):e}var jt="prebuilt/u8g2-menu-preview.js",Le=class{constructor(e,t={}){this.store=ve();this.renderScheduled=!1;this.lastExport=null;this.destroyed=!1;if(this.container=e,this.opts={persistKey:"default",...t},e.classList.add("ume"),!document.getElementById("ume-style")){let o=document.createElement("style");o.id="ume-style",o.textContent=He,document.head.appendChild(o)}let a=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,n=this.opts.data??a??void 0;if(n!==void 0)try{this.store.setState({project:de(n)})}catch(o){console.warn("[u8g2-menu-editor] \u521D\u59CB\u6570\u636E\u65E0\u6548\uFF0C\u4F7F\u7528\u793A\u4F8B\u5DE5\u7A0B:",o)}let u=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,s=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;u&&s&&(this.lastExport={c:u,h:s}),e.innerHTML=`
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
    `;let r=o=>e.querySelector(o);this.els={left:r(".ume-left"),center:r(".ume-center"),right:r(".ume-right"),styleEl:r('[data-role="style"]'),propEl:r('[data-role="prop"]'),toolbarUndo:r('[data-act="undo"]'),toolbarRedo:r('[data-act="redo"]')};let m=document.createElement("div");m.style.display="flex",m.style.flexDirection="column",m.style.alignItems="center",m.style.gap="10px",this.els.center.appendChild(m),this.preview=new pe(m,{onPageChanged:o=>this.onPreviewPageChanged(o)});let p=document.createElement("div");this.els.center.appendChild(p),rt(p,this.preview),this.preview.load(this.opts.wasmUrl??jt).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(o=>{console.error(o);let l=document.createElement("div");l.className="ume-warn",l.textContent=`\u9884\u89C8\u5F15\u64CE\u52A0\u8F7D\u5931\u8D25: ${o.message}\u3002\u7F16\u8F91\u529F\u80FD\u4E0D\u53D7\u5F71\u54CD\u3002`,this.els.center.prepend(l)}),e.querySelector('[data-act="add-page"]').addEventListener("click",()=>{let o=prompt("\u9875\u9762\u540D\u79F0:",`\u9875\u9762${this.store.getState().project.pages.length+1}`);o!==null&&this.store.getState().addPage(o||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),e.querySelector('[data-act="export-json"]').addEventListener("click",()=>{J(`${this.store.getState().project.name||"menu-project"}.json`,ye(this.store.getState().project),"application/json")}),e.querySelector('[data-act="import"]').addEventListener("click",()=>{r('[data-role="file"]').click()}),r('[data-role="file"]').addEventListener("change",o=>{let l=o.target.files?.[0];l&&(l.text().then(f=>{try{let S=de(f);this.store.getState().update(M=>{Object.assign(M,S)}),this.scheduleRender()}catch(S){alert(`\u5BFC\u5165\u5931\u8D25: ${S.message}`)}}),o.target.value="")}),e.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(this.store.getState().project.pages[0]?.id??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(e){let t=de(e);this.store.getState().update(a=>{Object.assign(a,t)}),this.store.getState().select(t.pages[0]?.id??null,null)}generate(){let e=this.lastExport,t=Ie(this.store.getState().project,e??void 0);return this.lastExport={c:t.c,h:t.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,t.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,t.h)),it(this.container,t),this.opts.onExport?.(t),t}downloadC(){let e=Ie(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:e.c,h:e.h},J("menu_pages.c",e.c),J("menu_pages.h",e.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(e){let t=e.target;t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"?(e.preventDefault(),e.shiftKey?this.store.getState().redo():this.store.getState().undo()):(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"&&(e.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(e){let t=this.store.getState().project.pages[e];t&&this.store.getState().select(t.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,ye(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;let e=this.store.getState();Qe(this.els.left,this.store),nt(this.els.styleEl,this.store),tt(this.els.propEl,this.store,{openXbmEditor:(t,a)=>ot(this.container,this.store,t,a)}),this.els.toolbarUndo.disabled=e.past.length===0,this.els.toolbarRedo.disabled=e.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){let e=document.getElementById("ume-live-page"),t=document.getElementById("ume-live-value"),a=this.store.getState(),n=this.store.getState().project.pages.findIndex(u=>u.id===a.selection.pageId);if(e&&n>=0){let u=this.preview.currentPage;e.textContent=`\u9884\u89C8\u9875: ${this.store.getState().project.pages[u]?.name??"?"}`}if(t&&n>=0&&a.selection.itemId){let u=a.project.pages[n],s=u.items.findIndex(m=>m.id===a.selection.itemId),r=u.items[s];if(r&&"varName"in r){let m=r.kind==="switch"?this.preview.getSwitch(n,s):this.preview.getInt(n,s);t.textContent=`${r.varName} = ${m}`}else t.textContent=""}}};return pt(Rt);})();
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
