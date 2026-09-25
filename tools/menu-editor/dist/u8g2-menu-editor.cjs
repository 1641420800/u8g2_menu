"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const ce=require("zustand/vanilla"),h=require("lit-html"),me=`/* u8g2-menu-editor 样式（前缀 ume-） */
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

/* ---------- 工具栏 ---------- */
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

/* ---------- 主体三栏 ---------- */
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

/* ---------- 树 ---------- */
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

/* ---------- 预览 ---------- */
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

/* ---------- 属性/样式面板 ---------- */
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

/* ---------- XBM 编辑器 ---------- */
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

/* ---------- 对话框 ---------- */
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
`;let Q=0;function G(r){return Q=(Q+1)%1e9,`${r}_${Date.now().toString(36)}_${Q.toString(36)}`}function P(r){const t={id:G("it"),label:""};switch(r){case"text":return{...t,kind:r,text:"菜单项",scale:1};case"number":return{...t,kind:r,text:"v:%d",scale:1,varType:"int32",varName:"var_value",step:1,min:0,max:100,decimals:1,initialValue:50};case"switch":return{...t,kind:r,text:"s:%s",scale:1,varName:"var_switch",openValue:1,onText:"on",offText:"off",initialValue:0};case"button":return{...t,kind:r,text:"执行操作",scale:1,cbName:"btn_action_cb",buttonId:1};case"submenu":return{...t,kind:r,text:"下一级",scale:1,targetPageId:null};case"back":return{...t,kind:r,text:"返回",scale:1};case"slider":return{...t,kind:r,varName:"var_slider",step:2,min:0,max:100,initialValue:50};case"progress":return{...t,kind:r,varName:"var_prog",step:2,min:0,max:100,initialValue:70};case"chart":return{...t,kind:r,chartKind:"line",dataLen:24,height:32,sample:"sine"};case"xbm":return de(16,16);case"textarea":return{...t,kind:r,content:`这是一段较长的说明文本，
会自动换行并支持滚动浏览。`,height:40,bindScroll:!0,lineSpacing:0};case"board":return{...t,kind:r,w:64,h:32,cbName:"board_cb"}}}function de(r,t){const e=Math.ceil(r/8);return{id:G("it"),kind:"xbm",label:"",name:"icon",w:r,h:t,bits:new Array(e*t).fill(0)}}function ae(r){return{id:G("pg"),name:r,fnName:"",items:[],userCodePre:""}}function H(r,t){return{...r,...t}}function pe(){const r=ae("主页");r.items=[H(P("text"),{text:"u8g2_menu"}),H(P("submenu"),{text:"系统设置"}),H(P("button"),{text:"关于",cbName:"btn_about_cb"})];const t=ae("设置");t.items=[H(P("number"),{text:"音量:%d"}),H(P("switch"),{text:"开关:%s"}),P("slider"),P("back")];const e={version:1,name:"我的菜单",width:128,height:64,font:"u8g2_font_wqy12_t_gb2312",selector:"rotundity",selectorLeftMargin:16,selectorTopMargin:0,selectorLineSpacing:0,marqueeSpeed:.2,marqueeHeaderLen:5,pages:[r,t]};return r.items[1].targetPageId=t.id,e}function be(r){return structuredClone(r)}const he=800;function le(){let r=null,t=0;return ce.createStore()((e,s)=>({project:pe(),selection:{pageId:null,itemId:null},past:[],future:[],dirty:!1,update:(a,c)=>{const i=Date.now(),n=!!c&&c===r&&i-t<he;r=c??null,t=i,e(l=>{const b=be(l.project);return a(b),{project:b,dirty:!0,past:n?l.past:[...l.past.slice(-99),l.project],future:[]}})},undo:()=>{e(a=>a.past.length?{project:a.past[a.past.length-1],past:a.past.slice(0,-1),future:[a.project,...a.future.slice(0,99)],dirty:!0}:a)},redo:()=>{e(a=>{if(!a.future.length)return a;const[c,...i]=a.future;return{project:c,past:[...a.past,a.project],future:i,dirty:!0}})},select:(a,c=null)=>e({selection:{pageId:a,itemId:c}}),addPage:a=>{const c={id:G("pg"),name:a??`页面${s().project.pages.length+1}`,fnName:"",items:[],userCodePre:""};return s().update(i=>{i.pages.push(c)}),e({selection:{pageId:c.id,itemId:null}}),c},removePage:a=>{s().update(i=>{i.pages=i.pages.filter(n=>n.id!==a);for(const n of i.pages)for(const l of n.items)l.kind==="submenu"&&l.targetPageId===a&&(l.targetPageId=null)});const{selection:c}=s();c.pageId===a&&e({selection:{pageId:null,itemId:null}})},movePage:(a,c)=>{s().update(i=>{const n=i.pages.findIndex(b=>b.id===a),l=n+c;n<0||l<0||l>=i.pages.length||([i.pages[n],i.pages[l]]=[i.pages[l],i.pages[n]])})},updatePage:(a,c)=>{s().update(i=>{const n=i.pages.find(l=>l.id===a);n&&Object.assign(n,c)})},addItem:(a,c)=>{var l;const i=c??s().selection.pageId??((l=s().project.pages[0])==null?void 0:l.id);if(!i)return null;const n=ge(a);return s().update(b=>{const u=b.pages.find(o=>o.id===i);u==null||u.items.push(n)}),e({selection:{pageId:i,itemId:n.id}}),n},removeItem:(a,c)=>{s().update(n=>{const l=n.pages.find(b=>b.id===a);l&&(l.items=l.items.filter(b=>b.id!==c))});const{selection:i}=s();i.itemId===c&&e({selection:{pageId:a,itemId:null}})},moveItem:(a,c,i)=>{s().update(n=>{const l=n.pages.find(o=>o.id===a);if(!l)return;const b=l.items.findIndex(o=>o.id===c),u=b+i;b<0||u<0||u>=l.items.length||([l.items[b],l.items[u]]=[l.items[u],l.items[b]])})},duplicateItem:(a,c)=>{let i=null;s().update(n=>{const l=n.pages.find(u=>u.id===a);if(!l)return;const b=l.items.findIndex(u=>u.id===c);b<0||(i=structuredClone(l.items[b]),i.id=G("it"),l.items.splice(b+1,0,i))}),i&&e({selection:{pageId:a,itemId:i.id}})},updateItem:(a,c,i,n)=>{s().update(l=>{const b=l.pages.find(o=>o.id===a),u=b==null?void 0:b.items.find(o=>o.id===c);u&&Object.assign(u,i)},n)}}))}le();function ge(r){return P(r)}const ee=1,Z={text:"文本",number:"数值",switch:"开关",button:"按钮",submenu:"子页面",back:"返回上级",slider:"滑块条",progress:"进度条",chart:"图表",xbm:"位图 XBM",textarea:"文本区",board:"自绘板"},fe={text:"T",number:"#",switch:"◉",button:"⏎",submenu:"→",back:"←",slider:"▭",progress:"▬",chart:"∿",xbm:"▦",textarea:"¶",board:"✎"},xe=[{id:"u8g2_font_5x7_tf",label:"5x7 (ASCII)"},{id:"u8g2_font_6x10_tf",label:"6x10 (ASCII)"},{id:"u8g2_font_6x12_tf",label:"6x12 (ASCII)"},{id:"u8g2_font_7x13_tf",label:"7x13 (ASCII)"},{id:"u8g2_font_8x13_tf",label:"8x13 (ASCII)"},{id:"u8g2_font_9x15_tf",label:"9x15 (ASCII)"},{id:"u8g2_font_9x18_tf",label:"9x18 (ASCII)"},{id:"u8g2_font_10x20_tf",label:"10x20 (ASCII)"},{id:"u8g2_font_wqy12_t_gb2312",label:"文泉驿 12 (中文)"},{id:"u8g2_font_wqy13_t_gb2312",label:"文泉驿 13 (中文)"},{id:"u8g2_font_wqy14_t_gb2312",label:"文泉驿 14 (中文)"},{id:"u8g2_font_wqy16_t_gb2312",label:"文泉驿 16 (中文)"}];class q extends Error{}function ne(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function C(r,t){return typeof r=="string"?r:t}function T(r,t){return typeof r=="number"&&Number.isFinite(r)?r:t}const ve=["text","number","switch","button","submenu","back","slider","progress","chart","xbm","textarea","board"];function $e(r){if(!ne(r))throw new q("条目格式错误");const t=r.kind;if(typeof t!="string"||!ve.includes(t))throw new q(`未知条目类型: ${String(t)}`);const e=structuredClone(r);switch(e.id=C(r.id,""),e.id||(e.id=`it_${Math.random().toString(36).slice(2,10)}`),e.label=C(r.label,""),t){case"text":case"number":case"switch":case"button":case"submenu":case"back":e.text=C(r.text,""),e.scale=r.scale===2?2:1;break}return e}function _e(r){if(!ne(r))throw new q("页面格式错误");const t=Array.isArray(r.items)?r.items.map($e):[];return{id:C(r.id,"")||`pg_${Math.random().toString(36).slice(2,10)}`,name:C(r.name,"未命名页面"),fnName:C(r.fnName,""),items:t,userCodePre:C(r.userCodePre,"")}}function te(r){let t;if(typeof r=="string")try{t=JSON.parse(r)}catch{throw new q("JSON 解析失败")}else t=r;if(!ne(t))throw new q("不是有效的工程文件");const e=t,s=T(e.version,0);if(s>ee)throw new q(`工程版本 v${s} 高于当前支持的 v${ee}，请升级编辑器`);const a=Array.isArray(e.pages)?e.pages.map(_e):[];if(!a.length)throw new q("工程至少需要一个页面");const c=["default","rotundity","square"].includes(e.selector)?e.selector:"rotundity";return{version:ee,name:C(e.name,"未命名工程"),width:T(e.width,128),height:T(e.height,64),font:C(e.font,"u8g2_font_wqy12_t_gb2312"),selector:c,selectorLeftMargin:T(e.selectorLeftMargin,16),selectorTopMargin:T(e.selectorTopMargin,0),selectorLineSpacing:T(e.selectorLineSpacing,0),marqueeSpeed:T(e.marqueeSpeed,.2),marqueeHeaderLen:T(e.marqueeHeaderLen,5),pages:a}}function re(r){return JSON.stringify(r,null,2)}const we={uint8:"uint8_t",uint16:"uint16_t",uint32:"uint32_t",int8:"int8_t",int16:"int16_t",int32:"int32_t",int:"int",float:"float",double:"double"};function F(r,t="anon"){let e=r.trim().replace(/[^A-Za-z0-9_]/g,"_");return(!e||/^[0-9]/.test(e))&&(e=`_${e}`),e||t}function X(r){return r.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r\n?/g,"\\n").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function K(r){if(!Number.isFinite(r))return"0.0f";const t=r.toString();return/[-.]|e/i.test(t)?`${t}f`:`${t}.0f`}function ye(r){const t=new Map;if(!r)return t;const e=/\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;let s;for(;(s=e.exec(r))!==null;)t.set(s[1],s[2]);return t}function U(r,t,e){const s=t.has(r)?t.get(r):"";return`${e}/* USER CODE BEGIN ${r} */${s}${e}/* USER CODE END ${r} */`}function se(r,t){const e=[],s=ye((t==null?void 0:t.c)??""),a=r.pages.map((m,g)=>m.fnName&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(m.fnName)?m.fnName:`page_${g}`),c=new Map,i=(m,g,d,k,p)=>{const w=c.get(m);if(w){w.type!==g&&e.push(`变量 "${m}" 被多个不同类型的条目引用（${w.type} / ${g}），以首个定义为准`);return}c.set(m,{name:m,type:g,init:d,isFloat:k,owner:p})},n=new Map,l=new Set,b=[],u=[],o=[],x=[],I=[],A=new Set,E=new Map;let D=0,B=0;for(const m of r.pages)for(const g of m.items)switch(g.kind){case"number":{const d=g;if(!d.varName){e.push(`存在未命名变量条目（页面 ${m.name}），已跳过绑定`);break}const k=d.varType==="float"||d.varType==="double"?K(d.initialValue):String(Math.trunc(d.initialValue));i(d.varName,we[d.varType],k,d.varType==="float"||d.varType==="double",g),/%[-+ #0]*[a-zA-Z]/.test(d.text)||e.push(`数值条目 "${m.name}/${d.varName}" 的显示文本不含格式化占位符（如 %d）`);break}case"switch":{const d=g;if(!d.varName){e.push(`存在未命名开关条目（页面 ${m.name}），已跳过绑定`);break}i(d.varName,"uint8_t",String(Math.trunc(d.initialValue)),!1,g),/%[-+ #0]*s/.test(d.text)||e.push(`开关条目 "${d.varName}" 的显示文本建议包含 %s 用于显示 on/off`);break}case"slider":case"progress":{const d=g;if(!d.varName){e.push(`存在未命名${g.kind==="slider"?"滑块":"进度"}条目（页面 ${m.name}）`);break}i(d.varName,"int",String(Math.trunc(d.initialValue)),!1,g);break}case"button":{const d=F(g.cbName,"btn_cb");n.has(d)||n.set(d,g.buttonId);break}case"board":l.add(F(g.cbName,"board_cb"));break;case"chart":{const d=D++;b.push(`#define CHART${d}_LEN ${Math.max(2,Math.trunc(g.dataLen))}`,`static float chart${d}_data[CHART${d}_LEN];`,`static float chart${d}_dis[CHART${d}_LEN];`,`static u8g2_chart_t chart${d};`,`static uint8_t chart${d}_inited = 0;`);const k=g.sample==="sine"?`chart${d}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);`:g.sample==="ramp"?`chart${d}_data[i] = (float)i;`:`chart${d}_data[i] = (float)((i * 37) % CHART${d}_LEN);`,p=`chart${d}_fill`,w=(s.get(p)??"").trim()!=="";u.push([`    if (!chart${d}_inited) {`,`        chart${d}_inited = 1;`,`        u8g2_chart_init(&chart${d}, chart${d}_data, chart${d}_dis, CHART${d}_LEN);`,U(p,s,"        "),...w?[]:[`        for (uint16_t i = 0; i < CHART${d}_LEN; ++i) { ${k} }`],"    }"].join(`
`));break}case"xbm":{let d=F(g.name,"icon");for(;A.has(d);)d=`${d}_2`;A.add(d),E.set(g.id,d);const k=g.bits.length,p=g.bits.map(w=>`0x${(w&255).toString(16).padStart(2,"0")}`).join(", ");o.push(`static const uint8_t menu_xbm_${d}[${k}] = { ${p} };`);break}case"textarea":{const d=B++;x.push(`static char ta${d}_text[] = "${X(g.content)}";`,`static u8g2_menu_textArea_t ta${d};`,`static uint8_t ta${d}_inited = 0;`),I.push(`    if (!ta${d}_inited) {`,`        ta${d}_inited = 1;`,`        u8g2_textArea_init(&ta${d}, ta${d}_text);`,`        u8g2_textArea_setLineSpacing(&ta${d}, ${Math.max(0,Math.trunc(g.lineSpacing))});`,"    }");break}}const j=(m,g)=>{if(!m)return"";const d=`"${X(m)}"`;return g===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${d});`:`u8g2_MenuUTF8Printf(${d});`},J=(m,g,d)=>{const k=`"${X(m)}"`;return g===2?`u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${k}, ${d});`:`u8g2_MenuUTF8Printf(${k}, ${d});`};let O=0,N=0;const W=(m,g)=>{const d=[],k=`${g.name}`;switch(m.kind){case"text":{const p=j(m.text,m.scale);p&&d.push(`    ${p}`);break}case"number":{const p=m;if(!c.has(p.varName))break;const w=p.varType==="float"||p.varType==="double"?`u8g2_MenuItemValue_${p.varType}(&${p.varName}, ${K(p.step)}, ${K(p.min)}, ${K(p.max)});`:`u8g2_MenuItemValue_${p.varType}(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`;d.push(`    ${w}`),d.push(`    ${J(p.text,p.scale,p.varName)}`);break}case"switch":{const p=m;if(!c.has(p.varName))break;d.push(`    u8g2_MenuItemValue_switch(&${p.varName}, ${Math.trunc(p.openValue)});`),d.push(`    ${J(p.text,p.scale,`${p.varName} ? "${X(p.onText)}" : "${X(p.offText)}"`)}`);break}case"button":{const p=F(m.cbName,"btn_cb");d.push(`    u8g2_MenuItem_button(${p}, ${Math.trunc(m.buttonId)});`);const w=j(m.text,m.scale);w&&d.push(`    ${w}`);break}case"submenu":{if(!m.targetPageId){e.push(`页面 ${k} 的子页面条目 "${m.text||m.label||m.id}" 未指定目标页面，已按普通文本生成`);const z=j(m.text,m.scale);z&&d.push(`    ${z}`);break}const p=r.pages.findIndex(z=>z.id===m.targetPageId);if(p<0){e.push(`页面 ${k} 的子页面条目目标无效`);break}d.push(`    u8g2_MenuItem_menu_enter(${a[p]});`);const w=j(m.text,m.scale);w&&d.push(`    ${w}`);break}case"back":{d.push("    u8g2_MenuItem_menu_back();");const p=j(m.text,m.scale);p&&d.push(`    ${p}`);break}case"slider":{const p=m;if(!c.has(p.varName))break;d.push(`    u8g2_MenuDrawItemSlider_bind(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`);break}case"progress":{const p=m;if(!c.has(p.varName))break;d.push(`    u8g2_MenuDrawItemProgressBar_bind(&${p.varName}, ${Math.trunc(p.step)}, ${Math.trunc(p.min)}, ${Math.trunc(p.max)});`);break}case"chart":{const p=O++;d.push(...u[p].split(`
`));const w=m.chartKind==="point"?"Point":m.chartKind==="bar"?"Bar":"Line",z=m.min!==void 0&&m.max!==void 0?`${K(m.max)}, ${K(m.min)}`:"0, 0";d.push(`    u8g2_MenuDrawItem${w}Chart(&chart${p}, ${Math.max(4,Math.trunc(m.height))}, ${z});`);break}case"xbm":d.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(m.w)}, ${Math.trunc(m.h)}, menu_xbm_${E.get(m.id)??F(m.name,"icon")});`);break;case"textarea":{const p=N++;d.push(...I[p].split(`
`));const w=m.bindScroll?"u8g2_MenuDrawTextArea_bind":"u8g2_MenuDrawTextArea";d.push(`    ${w}(&ta${p}, ${Math.max(10,Math.trunc(m.height))});`);break}case"board":{const p=F(m.cbName,"board_cb");d.push(`    u8g2_MenuDrawItemBoard(${p}, ${Math.max(1,Math.trunc(m.w))}, ${Math.max(1,Math.trunc(m.h))});`);break}}return d},f=[];f.push("/**"),f.push(` * 由 u8g2-menu-editor 自动生成，工程: ${r.name}`),f.push(" * 重新生成时，USER CODE 区域内的手写内容会被保留。"),f.push(" */"),f.push('#include "menu_pages.h"'),f.push('#include "u8g2_menu.h"'),b.length&&f.push("#include <math.h>"),f.push(""),f.push(U("includes",s,"")),f.push(""),f.push("/* ======================== 变量定义 ======================== */"),f.push(U("variables",s,""));for(const m of c.values())f.push(`${m.type} ${m.name} = ${m.init};`);if(f.push(""),(b.length||x.length||o.length)&&(f.push("/* ======================== 页面资源 ======================== */"),f.push(...b,...x,...o),f.push("")),n.size||l.size){f.push("/* ======================== 回调函数 ======================== */"),f.push(U("callbacks",s,""));for(const[m]of n)f.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID)`),f.push("{"),f.push(U(`cb_${m}`,s,"    ")),f.push("}"),f.push("");for(const m of l)f.push(`void ${m}(u8g2_t *u8g2)`),f.push("{"),f.push(U(`cb_${m}`,s,"    ")),f.push("}"),f.push("")}f.push("/* ======================== 页面函数 ======================== */"),f.push(""),r.pages.forEach((m,g)=>{f.push(`/* 页面: ${m.name} */`),f.push(`void ${a[g]}(void)`),f.push("{"),f.push(U(`page_${a[g]}_pre`,s,"    "));for(const d of m.items)f.push(...W(d,m));f.push("}"),f.push("")});const _=[];if(_.push("#ifndef MENU_PAGES_H"),_.push("#define MENU_PAGES_H"),_.push(""),_.push('#include "u8g2_menu.h"'),_.push(""),_.push("/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */"),a.forEach((m,g)=>_.push(`void ${m}(void);   /* ${r.pages[g].name} */`)),_.push(""),c.size){_.push("/* 可编辑变量（在条目绑定中使用） */");for(const m of c.values())_.push(`extern ${m.type} ${m.name};`);_.push("")}if(n.size||l.size){_.push("/* 用户回调 */");for(const[m]of n)_.push(`void ${m}(u8g2_menu_t *menu, uint8_t ID);`);for(const m of l)_.push(`void ${m}(u8g2_t *u8g2);`);_.push("")}_.push("#endif /* MENU_PAGES_H */");const v=f.join(`
`).replace(/\n{3,}/g,`


`),y=_.join(`
`);return{c:`${v}
`,h:`${y}
`,warnings:e}}var M=(r=>(r[r.None=0]="None",r[r.Up=1]="Up",r[r.Down=2]="Down",r[r.Enter=3]="Enter",r[r.Return=4]="Return",r[r.Add=5]="Add",r[r.Sub=6]="Sub",r))(M||{});const ke=8192/8;function Se(r){return new Promise((t,e)=>{const s=document.createElement("script");s.src=r,s.onload=()=>t(),s.onerror=()=>e(new Error(`预览引擎脚本加载失败: ${r}`)),document.head.appendChild(s)})}class Me{constructor(t,e={}){this.mod=null,this.img=null,this.raf=0,this.lastT=0,this.running=!1,this.fontIndexCache=new Map,this.structSig="",this.lastKnownPage=0,this.canvas=document.createElement("canvas"),this.canvas.width=128,this.canvas.height=64,this.canvas.className="ume-preview-canvas",t.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.events=e}async load(t){if(this.mod)return;const e=window;e.U8G2MenuPreview||await Se(t);const s=e.U8G2MenuPreview;if(!s)throw new Error("U8G2MenuPreview 未找到（检查 wasmUrl）");this.mod=await s({locateFile:c=>t.replace(/[^/\\]*$/,"")+c}),this.mod.ccall("em_init",null,["number","number"],[128,64]);const a=this.mod._em_font_count_export();for(let c=0;c<a;c++){const i=this.mod._em_font_name(c);this.fontIndexCache.set(this.mod.UTF8ToString(i),c)}this.start()}get ready(){return!!this.mod}get currentPage(){return this.lastKnownPage}fontIndex(t){return this.fontIndexCache.get(t)??0}signature(t){return JSON.stringify(t.pages.map(e=>({n:e.items.length,k:e.items.map(s=>s.kind).join(","),res:e.items.map(s=>s.kind==="chart"?`${s.dataLen}|${s.sample}`:s.kind==="xbm"?`${s.w}x${s.h}`:s.kind==="textarea"?Math.ceil(s.content.length/64):"").join(",")})))}sync(t){const e=this.mod;if(!e)return;const s=this.signature(t);s!==this.structSig&&(e.ccall("em_reset_dynamic",null,[],[]),this.structSig=s);const a=c=>Math.trunc(Number.isFinite(c)?c:0);t.pages.forEach((c,i)=>{e.ccall("em_page_begin",null,["number"],[i]),c.items.forEach((n,l)=>{const b=["number","number"];switch(n.kind){case"text":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,0,0,n.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[i,l,n.text]);break;case"number":{const u={uint8:0,uint16:1,uint32:2,int8:3,int16:4,int32:5,int:6,float:7,double:8}[n.varType],o=n.varType==="float"||n.varType==="double"?Math.round(n.initialValue):a(n.initialValue);e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,1,u,n.scale,0,0,0,0,0,o,a(n.step),a(n.min),a(n.max),-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[i,l,n.text]);break}case"switch":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,2,0,n.scale,0,0,a(n.openValue),0,0,a(n.initialValue),0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[i,l,n.text]),e.ccall("em_item_swtext",null,["number","number","string","string"],[i,l,n.onText,n.offText]);break;case"button":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,3,0,n.scale,0,0,0,a(n.buttonId),0,0,0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[i,l,n.text]);break;case"submenu":{const u=t.pages.findIndex(o=>o.id===n.targetPageId);e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,4,0,n.scale,0,0,0,0,0,0,0,0,0,u,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[i,l,n.text]);break}case"back":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,5,0,n.scale,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0]),e.ccall("em_item_text",null,["number","number","string"],[i,l,n.text]);break;case"slider":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,6,0,1,0,0,0,0,0,a(n.initialValue),a(n.step),a(n.min),a(n.max),-1,0,0,0,0,0]);break;case"progress":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,7,0,1,0,0,0,0,0,a(n.initialValue),a(n.step),a(n.min),a(n.max),-1,0,0,0,0,0]);break;case"chart":{const u={sine:0,ramp:1,noise:2}[n.sample],o=n.min!==void 0&&n.max!==void 0?1:0;e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,8,0,1,{line:0,point:1,bar:2}[n.chartKind],0,0,0,o,u,0,o?a(n.min):0,o?a(n.max):0,-1,0,0,a(n.height),a(n.dataLen),0]);break}case"xbm":{e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,9,0,1,0,0,0,0,0,0,0,0,0,-1,a(n.w),a(n.h),0,0,0]);const u=e._em_scratch(n.bits.length);u&&(e.HEAPU8.set(new Uint8Array(n.bits),u),e._em_item_bits(i,l,u,n.bits.length));break}case"textarea":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,10,0,1,0,n.bindScroll?1:0,0,0,0,0,0,0,0,-1,0,0,a(n.height),0,a(n.lineSpacing)]),e.ccall("em_item_text",null,["number","number","string"],[i,l,n.content]);break;case"board":e.ccall("em_page_item",null,[...b,"number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"],[i,l,11,0,1,0,0,0,0,0,0,0,0,0,-1,a(n.w),a(n.h),0,0,0]);break}}),e.ccall("em_page_end",null,["number","number"],[i,c.items.length])}),e.ccall("em_pages_commit",null,["number"],[t.pages.length]),e.ccall("em_set_style",null,["number","number","number","number","number","number","number"],[this.fontIndex(t.font),{default:0,rotundity:1,square:2}[t.selector],a(t.selectorLeftMargin),a(t.selectorTopMargin),a(t.selectorLineSpacing),t.marqueeSpeed,t.marqueeHeaderLen])}start(){if(this.running)return;this.running=!0,this.lastT=performance.now();const t=e=>{if(!this.running)return;const s=Math.min(100,Math.round(e-this.lastT));this.lastT=e,this.renderFrame(s),this.raf=requestAnimationFrame(t)};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}renderFrame(t){var n,l;const e=this.mod;if(!e)return;const s=e._em_frame(t);if(!s)return;this.img||(this.img=this.ctx.createImageData(128,64));const a=e.HEAPU8.subarray(s,s+ke),c=this.img.data;c.fill(255);for(let b=0;b<64;b++){const u=(b>>3)*128,o=1<<(b&7);let x=b*128*4;for(let I=0;I<128;I++)a[u+I]&o&&(c[x]=17,c[x+1]=24,c[x+2]=39),x+=4}this.ctx.putImageData(this.img,0,0);const i=e._em_get_current_page();i!==this.lastKnownPage&&(this.lastKnownPage=i,(l=(n=this.events).onPageChanged)==null||l.call(n,i))}key(t){var e;(e=this.mod)==null||e.ccall("em_key",null,["number"],[t])}getInt(t,e){var s;return((s=this.mod)==null?void 0:s._em_get_ipool(t*64+e))??0}getSwitch(t,e){var s;return((s=this.mod)==null?void 0:s._em_get_upool(t*64+e))??0}destroy(){this.stop(),this.canvas.remove(),this.mod=null}}const Ie=Object.keys(Z);function Ee(r,t,e,s){const a=r.getState(),c=e.label||"text"in e&&e.text||Z[e.kind],i=n=>l=>{l.stopPropagation(),r.getState().moveItem(t.id,e.id,n)};return h.html`<div class="ume-item-row ${s?"selected":""}"
    @click=${()=>r.getState().select(t.id,e.id)}>
    <span class="ume-item-icon">${fe[e.kind]}</span>
    <span class="ume-item-name" title=${c}>${c}</span>
    <button class="ume-mini" title="上移" @click=${i(-1)}>↑</button>
    <button class="ume-mini" title="下移" @click=${i(1)}>↓</button>
    <button class="ume-mini" title="复制" @click=${n=>{n.stopPropagation(),a.duplicateItem(t.id,e.id)}}>⧉</button>
    <button class="ume-mini" title="删除" @click=${n=>{n.stopPropagation(),a.removeItem(t.id,e.id)}}>✕</button>
  </div>`}function Ne(r,t){const e=r.getState();return h.html`<select class="ume-mini" style="width:auto"
    title="添加条目"
    @change=${s=>{const a=s.target.value;a&&e.addItem(a,t.id),s.target.value=""}}>
    <option value="">＋条目</option>
    ${Ie.map(s=>h.html`<option value=${s}>${Z[s]}</option>`)}
  </select>`}function Ce(r,t){const{project:e,selection:s}=t.getState(),a=c=>{const i=t.getState(),n=s.pageId===c.id;return h.html`<div class="ume-page">
      <div class="ume-page-head ${n?"selected":""}"
        @click=${()=>t.getState().select(c.id,null)}>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${c.name}</span>
        <button class="ume-mini" title="上移页面" @click=${l=>{l.stopPropagation(),i.movePage(c.id,-1)}}>↑</button>
        <button class="ume-mini" title="下移页面" @click=${l=>{l.stopPropagation(),i.movePage(c.id,1)}}>↓</button>
        <button class="ume-mini" title="删除页面"
          @click=${l=>{if(l.stopPropagation(),e.pages.length<=1){alert("至少保留一个页面");return}confirm(`删除页面 "${c.name}"？`)&&i.removePage(c.id)}}>✕</button>
      </div>
      ${n?h.html`<div class="ume-page-items">
        ${c.items.length?c.items.map(l=>Ee(t,c,l,s.itemId===l.id)):h.html`<div class="ume-empty-hint">暂无条目，点击下方添加</div>`}
        <div style="padding:2px 6px">${Ne(t,c)}</div>
      </div>`:h.nothing}
    </div>`};h.render(h.html`
    <div class="ume-panel-title">
      页面 / 条目 (${e.pages.length})
      <button class="ume-mini" title="新增页面" @click=${()=>Te(t)}>＋ 页面</button>
    </div>
    ${e.pages.map(a)}
  `,r)}function Te(r){const t=prompt("页面名称:",`页面${r.getState().project.pages.length+1}`);t!==null&&r.getState().addPage(t||void 0)}function S(r,t,e,s=""){return h.html`<div class="ume-field">
    <label>${r}</label>
    <input type="text" .value=${t??""} placeholder=${s}
      @change=${a=>e(a.target.value)} />
  </div>`}function $(r,t,e,s=1){return h.html`<div class="ume-field">
    <label>${r}</label>
    <input type="number" .value=${String(t)} step=${String(s)}
      @change=${a=>{const c=parseFloat(a.target.value);e(Number.isFinite(c)?c:0)}} />
  </div>`}function L(r,t,e,s){return h.html`<div class="ume-field">
    <label>${r}</label>
    <select @change=${a=>s(a.target.value)}>
      ${e.map(a=>h.html`<option value=${a.value} ?selected=${a.value===t}>${a.label}</option>`)}
    </select>
  </div>`}function Pe(r,t,e){return h.html`<div class="ume-checkbox">
    <input type="checkbox" ?checked=${t}
      @change=${s=>e(s.target.checked)} />
    <span>${r}</span>
  </div>`}function ie(r,t,e,s=!1){return h.html`<div class="ume-field wide">
    <label>${r}</label>
    <textarea style=${s?"font-family:Consolas,monospace":""}
      @change=${a=>e(a.target.value)}>${t??""}</textarea>
  </div>`}function Y(r,t,e="text/plain"){const s=new Blob([t],{type:`${e};charset=utf-8`}),a=document.createElement("a");a.href=URL.createObjectURL(s),a.download=r,a.click(),setTimeout(()=>URL.revokeObjectURL(a.href),5e3)}const Le=[{value:"uint8",label:"uint8"},{value:"uint16",label:"uint16"},{value:"uint32",label:"uint32"},{value:"int8",label:"int8"},{value:"int16",label:"int16"},{value:"int32",label:"int32"},{value:"int",label:"int"}],Ae=[...Le,{value:"float",label:"float"},{value:"double",label:"double"}];function De(r,t,e){const{project:s,selection:a}=t.getState(),c=s.pages.find(u=>u.id===a.pageId)??null,i=(c==null?void 0:c.items.find(u=>u.id===a.itemId))??null,n=(u,o)=>t.getState().updateItem(c.id,i.id,u,o);let l=h.html`<div class="ume-empty-hint">在左侧选择页面或条目</div>`,b="属性";if(c&&!i)b="页面属性",l=h.html`
      ${S("名称",c.name,u=>t.getState().updatePage(c.id,{name:u}))}
      ${S("C 函数名",c.fnName,u=>t.getState().updatePage(c.id,{fnName:u}),"留空自动 page_N")}
      ${ie("用户代码",c.userCodePre,u=>t.getState().updatePage(c.id,{userCodePre:u}),!0)}
      <div class="ume-hint">生成于页面函数开头（USER CODE 保留区）</div>
    `;else if(c&&i)switch(b=`${Z[i.kind]}`,i.kind){case"text":l=h.html`
          ${S("文本/格式",i.text,u=>n({text:u},`text-${i.id}`))}
          ${L("大小",String(i.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],u=>n({scale:Number(u)}))}
          <div class="ume-hint">支持 printf 占位符与 \n 多行</div>
        `;break;case"number":{const u=i,o=u.varType==="float"||u.varType==="double";l=h.html`
          ${L("变量类型",u.varType,Ae,x=>n({varType:x}))}
          ${S("变量名",u.varName,x=>n({varName:x}))}
          ${S("显示文本",u.text,x=>n({text:x},`text-${i.id}`))}
          ${$("步长",u.step,x=>n({step:x}),"any")}
          ${$("最小值",u.min,x=>n({min:x}),"any")}
          ${$("最大值",u.max,x=>n({max:x}),"any")}
          ${$("初始值",u.initialValue,x=>n({initialValue:x}),"any")}
          ${o?$("小数位",u.decimals,x=>n({decimals:Math.max(0,Math.trunc(x))})):h.nothing}
          ${L("大小",String(u.scale),[{value:"1",label:"正常"},{value:"2",label:"二倍大"}],x=>n({scale:Number(x)}))}
          <div class="ume-hint">int 建议 %d/%u，float 建议 %.Nf</div>
        `;break}case"switch":{const u=i;l=h.html`
          ${S("变量名",u.varName,o=>n({varName:o}))}
          ${S("显示文本",u.text,o=>n({text:o},`text-${i.id}`))}
          ${$("openValue",u.openValue,o=>n({openValue:Math.max(0,Math.trunc(o))}))}
          ${S('"开"文本',u.onText,o=>n({onText:o}))}
          ${S('"关"文本',u.offText,o=>n({offText:o}))}
          ${$("初始值",u.initialValue,o=>n({initialValue:Math.trunc(o)}))}
        `;break}case"button":{const u=i;l=h.html`
          ${S("显示文本",u.text,o=>n({text:o},`text-${i.id}`))}
          ${S("回调函数名",u.cbName,o=>n({cbName:o}))}
          ${$("ID",u.buttonId,o=>n({buttonId:Math.trunc(o)}))}
          <div class="ume-hint">回调骨架将生成到 USER CODE 区</div>
        `;break}case"submenu":{const u=i;l=h.html`
          ${S("显示文本",u.text,o=>n({text:o},`text-${i.id}`))}
          ${L("目标页面",u.targetPageId??"",[{value:"",label:"（未设置）"},...s.pages.filter(o=>o.id!==c.id).map(o=>({value:o.id,label:o.name}))],o=>n({targetPageId:o||null}))}
          <div class="ume-hint">确认键进入目标页面；子页面内建议添加"返回上级"条目用于返回</div>
        `;break}case"back":{l=h.html`
          ${S("显示文本",i.text,u=>n({text:u},`text-${i.id}`))}
          <div class="ume-hint">生成 u8g2_MenuItem_menu_back()，确认键返回上级页面</div>
        `;break}case"slider":case"progress":{const u=i;l=h.html`
          ${S("变量名 (int)",u.varName,o=>n({varName:o}))}
          ${$("步长",u.step,o=>n({step:Math.trunc(o)}))}
          ${$("最小值",u.min,o=>n({min:Math.trunc(o)}))}
          ${$("最大值",u.max,o=>n({max:Math.trunc(o)}))}
          ${$("初始值",u.initialValue,o=>n({initialValue:Math.trunc(o)}))}
          <div class="ume-hint">绑定 u8g2_MenuDrawItem${u.kind==="slider"?"Slider":"ProgressBar"}_bind</div>
        `;break}case"chart":{const u=i;l=h.html`
          ${L("类型",u.chartKind,[{value:"line",label:"折线图"},{value:"point",label:"散点图"},{value:"bar",label:"柱状图"}],o=>n({chartKind:o}))}
          ${$("数据点数",u.dataLen,o=>n({dataLen:Math.max(2,Math.trunc(o))}))}
          ${$("高度(px)",u.height,o=>n({height:Math.max(8,Math.trunc(o))}))}
          ${L("示例数据",u.sample,[{value:"sine",label:"正弦"},{value:"ramp",label:"斜坡"},{value:"noise",label:"伪随机"}],o=>n({sample:o}))}
          ${$("量程上限",u.max??0,o=>n({max:o||void 0}),"any")}
          ${$("量程下限",u.min??0,o=>n({min:o||void 0}),"any")}
          <div class="ume-hint">上下限均填 0 表示自动量程；真实数据在 USER CODE 区填充</div>
        `;break}case"xbm":{const u=i;l=h.html`
          ${S("数组名",u.name,o=>n({name:o}))}
          ${$("宽(px)",u.w,o=>n({w:Math.min(128,Math.max(1,Math.trunc(o)))}))}
          ${$("高(px)",u.h,o=>n({h:Math.min(64,Math.max(1,Math.trunc(o)))}))}
          <div class="ume-field"><label></label>
            <button class="ume-btn sm" @click=${()=>e.openXbmEditor(c.id,u.id)}>编辑位图…</button>
          </div>
          <div class="ume-hint">${u.bits.length} 字节，XBM 行序 LSB</div>
        `;break}case"textarea":{const u=i;l=h.html`
          ${ie("文本内容",u.content,o=>n({content:o}))}
          ${$("高度(px)",u.height,o=>n({height:Math.max(10,Math.trunc(o))}))}
          ${$("行间距",u.lineSpacing,o=>n({lineSpacing:Math.max(0,Math.trunc(o))}))}
          ${Pe("上下键滚动 (bind)",u.bindScroll,o=>n({bindScroll:o}))}
        `;break}case"board":{const u=i;l=h.html`
          ${$("宽(px)",u.w,o=>n({w:Math.max(1,Math.trunc(o))}))}
          ${$("高(px)",u.h,o=>n({h:Math.max(1,Math.trunc(o))}))}
          ${S("回调函数名",u.cbName,o=>n({cbName:o}))}
          <div class="ume-hint">预览中显示占位框；实际内容由回调函数绘制（USER CODE 区）</div>
        `;break}}h.render(h.html`
    <div class="ume-panel-title">属性 ${b!=="属性"?h.html`<span class="ume-kind-badge">${b}</span>`:h.nothing}</div>
    ${l}
  `,r)}function je(r,t){const{project:e}=t.getState(),s=(a,c)=>t.getState().update(i=>{Object.assign(i,a)},c);h.render(h.html`
    <div class="ume-panel-title">工程</div>
    ${S("工程名",e.name,a=>s({name:a}))}
    <div class="ume-field">
      <label>分辨率</label>
      <span style="flex:1;font-size:12px;color:var(--ume-dim)">
        ${e.width}×${e.height}
        ${e.width!==128||e.height!==64?"（预览固定 128×64，生成代码使用此值）":""}
      </span>
    </div>

    <div class="ume-panel-title">样式</div>
    ${L("字体",e.font,xe.map(a=>({value:a.id,label:a.label})),a=>s({font:a}))}
    ${L("选择器",e.selector,[{value:"default",label:"默认 (反色行)"},{value:"rotundity",label:"圆形"},{value:"square",label:"方形"}],a=>s({selector:a}))}
    ${$("左边距",e.selectorLeftMargin,a=>s({selectorLeftMargin:Math.max(0,Math.trunc(a))}))}
    ${$("顶边距",e.selectorTopMargin,a=>s({selectorTopMargin:Math.max(0,Math.trunc(a))}))}
    ${$("行间距",e.selectorLineSpacing,a=>s({selectorLineSpacing:Math.max(0,Math.trunc(a))}))}
    ${$("跑马灯速度",e.marqueeSpeed,a=>s({marqueeSpeed:a}),.05)}
    ${$("跑马灯停留",e.marqueeHeaderLen,a=>s({marqueeHeaderLen:a}),.5)}
    <div class="ume-hint">跑马灯: 超宽的选中行自动滚动（字符/步 与 停留字符数）</div>
  `,r)}function Ue(r,t){const e=a=>{let c;const i=()=>{c&&(clearInterval(c),c=void 0)};return{down:n=>{n.preventDefault(),t.key(a),i(),c=window.setInterval(()=>t.key(a),180)},up:i}},s=(a,c,i)=>{const n=e(a);return h.html`<button class="ume-key" title=${i}
      @pointerdown=${n.down} @pointerup=${n.up} @pointerleave=${n.up}>${c}</button>`};h.render(h.html`
    <div class="ume-preview-wrap" tabindex="0"
      @keydown=${a=>{const i={ArrowUp:M.Up,ArrowDown:M.Down,Enter:M.Enter,Escape:M.Return,Backspace:M.Return,"+":M.Add,"-":M.Sub,"=":M.Add,_:M.Sub}[a.key];i!==void 0&&(a.preventDefault(),t.key(i))}}>
      ${t.canvas}
    </div>
    <div class="ume-keybar">
      ${s(M.Up,"▲","上 MENU_Key_Up")}
      ${s(M.Down,"▼","下 MENU_Key_Down")}
      ${s(M.Enter,"OK","确认 MENU_Key_Enter")}
      ${s(M.Return,"⌫","返回 MENU_Key_Return")}
      ${s(M.Add,"＋","加 MENU_Key_Add")}
      ${s(M.Sub,"－","减 MENU_Key_Sub")}
    </div>
    <div class="ume-preview-meta">
      <span>键盘 ↑↓ 确认 返回 ＋/－ 亦可操作</span>
      <span id="ume-live-page"></span>
      <span id="ume-live-value"></span>
    </div>
  `,r)}let V=null,R="c";function Re(r,t){V=t,qe(r)}function qe(r){if(!V)return;const t=R==="c"?V.c:V.h,e=document.createElement("div");e.className="ume-modal-mask",e.addEventListener("click",a=>{a.target===e&&ue(e)});const s=()=>{h.render(h.html`
      <div class="ume-modal wide">
        <div class="ume-modal-head">
          <span>生成 C 代码</span>
          <button class="ume-mini" @click=${()=>ue(e)}>✕</button>
        </div>
        <div class="ume-modal-body">
          ${V.warnings.length?h.html`
            <div style="margin-bottom:8px">
              ${V.warnings.map(a=>h.html`<div class="ume-warn">⚠ ${a}</div>`)}
            </div>`:h.nothing}
          <div class="ume-code-tabs">
            <button class="ume-btn sm ${R==="c"?"primary":""}" @click=${()=>{R="c",s()}}>menu_pages.c</button>
            <button class="ume-btn sm ${R==="h"?"primary":""}" @click=${()=>{R="h",s()}}>menu_pages.h</button>
          </div>
          <div class="ume-code-view">${t}</div>
        </div>
        <div class="ume-modal-foot">
          <button class="ume-btn" @click=${()=>{navigator.clipboard.writeText(t).then(()=>Oe(e,"已复制到剪贴板"))}}>复制</button>
          <button class="ume-btn primary" @click=${()=>{Y(R==="c"?"menu_pages.c":"menu_pages.h",t)}}>下载 ${R==="c"?"menu_pages.c":"menu_pages.h"}</button>
        </div>
      </div>
    `,e)};s(),r.appendChild(e)}function ue(r){r.remove()}function Oe(r,t){const e=r.closest(".ume")??document.body;let s=e.querySelector(".ume-toast");s||(s=document.createElement("div"),s.className="ume-toast",e.appendChild(s)),s.textContent=t,s.classList.add("show"),setTimeout(()=>s.classList.remove("show"),1600)}function ze(r,t,e,s){const c=t.getState().project.pages.find(v=>v.id===e),i=c==null?void 0:c.items.find(v=>v.id===s);if(!i||i.kind!=="xbm")return;const n=i;let l=n.w,b=n.h,u=[...n.bits];const o=()=>Math.ceil(l/8),x=document.createElement("div");x.className="ume-modal-mask",x.addEventListener("click",v=>{v.target===x&&_()});const I=(v,y)=>{const m=y*o()+(v>>3);return m<u.length?!!(u[m]>>(v&7)&1):!1},A=(v,y,m)=>{const g=y*o()+(v>>3);u[g]=m?u[g]|1<<(v&7):u[g]&~(1<<(v&7))},E=(v,y)=>{const m=Math.ceil(l/8),g=Math.ceil(v/8),d=new Array(g*y).fill(0);for(let k=0;k<Math.min(b,y);k++)for(let p=0;p<Math.min(l,v);p++){const w=k*m+(p>>3);w<u.length&&u[w]>>(p&7)&1&&(d[k*g+(p>>3)]|=1<<(p&7))}l=v,b=y,u=d};let D=!1,B=!0;const j=(v,y)=>m=>{m.preventDefault(),D=!0,B=!I(v,y),A(v,y,B),N()},J=(v,y)=>()=>{D&&(A(v,y,B),N())},O=()=>{D=!1},N=()=>{h.render(f(),x)},W=()=>{const v=[];for(let y=0;y<b;y++)for(let m=0;m<l;m++)v.push(h.html`<button class="ume-xbm-cell ${I(m,y)?"on":""}"
          data-x=${m} data-y=${y}
          @pointerdown=${j(m,y)}
          @pointerenter=${J(m,y)}></button>`);return v},f=()=>h.html`
    <div class="ume-modal">
      <div class="ume-modal-head">
        <span>位图编辑器 <span class="ume-kind-badge">${l}×${b}</span></span>
        <button class="ume-mini" @click=${_}>✕</button>
      </div>
      <div class="ume-modal-body"
        @pointerup=${O}
        @pointerleave=${O}>
        <div class="ume-field">
          <label>宽/高</label>
          <input type="number" style="width:64px" .value=${String(l)} min="1" max="128"
            @change=${v=>{E(oe(+v.target.value,1,128),b),N()}} />
          <input type="number" style="width:64px" .value=${String(b)} min="1" max="64"
            @change=${v=>{E(l,oe(+v.target.value,1,64)),N()}} />
          <button class="ume-btn sm" @click=${()=>{u=u.map(()=>0),N()}}>清空</button>
          <button class="ume-btn sm" @click=${()=>{u=u.map(v=>~v&255),N()}}>反相</button>
        </div>
        <div class="ume-xbm-grid" style="grid-template-columns:repeat(${l}, 14px)">${W()}</div>
        <div class="ume-hint">拖拽绘制；生成数组名 menu_xbm_${n.name}（XBM 行序 LSB）</div>
      </div>
      <div class="ume-modal-foot">
        <button class="ume-btn" @click=${_}>取消</button>
        <button class="ume-btn primary" @click=${()=>{t.getState().updateItem(e,s,{w:l,h:b,bits:[...u]}),_()}}>应用</button>
      </div>
    </div>
  `;function _(){x.remove(),document.removeEventListener("pointerup",O)}document.addEventListener("pointerup",O),N(),r.appendChild(x)}function oe(r,t,e){return Number.isFinite(r)?Math.min(e,Math.max(t,Math.trunc(r))):t}const Fe="prebuilt/u8g2-menu-preview.js";class Ke{constructor(t,e={}){var u;if(this.store=le(),this.renderScheduled=!1,this.lastExport=null,this.destroyed=!1,this.container=t,this.opts={persistKey:"default",...e},t.classList.add("ume"),!document.getElementById("ume-style")){const o=document.createElement("style");o.id="ume-style",o.textContent=me,document.head.appendChild(o)}const s=this.opts.persistKey?localStorage.getItem(`ume_autosave_${this.opts.persistKey}`):null,a=this.opts.data??s??void 0;if(a!==void 0)try{this.store.setState({project:te(a)})}catch(o){console.warn("[u8g2-menu-editor] 初始数据无效，使用示例工程:",o)}const c=this.opts.persistKey?localStorage.getItem(`ume_last_c_${this.opts.persistKey}`):null,i=this.opts.persistKey?localStorage.getItem(`ume_last_h_${this.opts.persistKey}`):null;c&&i&&(this.lastExport={c,h:i}),t.innerHTML=`
      <div class="ume-toolbar">
        <span class="ume-title">⬒ u8g2_menu 编辑器</span>
        <button class="ume-btn sm" data-act="add-page">＋页面</button>
        <button class="ume-btn sm" data-act="undo">撤销</button>
        <button class="ume-btn sm" data-act="redo">重做</button>
        <span class="ume-sep"></span>
        <button class="ume-btn sm" data-act="import">导入 JSON</button>
        <button class="ume-btn sm" data-act="export-json">导出 JSON</button>
        <span class="ume-spacer"></span>
        <button class="ume-btn primary sm" data-act="generate">⚡ 生成 C 代码</button>
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
    `;const n=o=>t.querySelector(o);this.els={left:n(".ume-left"),center:n(".ume-center"),right:n(".ume-right"),styleEl:n('[data-role="style"]'),propEl:n('[data-role="prop"]'),toolbarUndo:n('[data-act="undo"]'),toolbarRedo:n('[data-act="redo"]')};const l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column",l.style.alignItems="center",l.style.gap="10px",this.els.center.appendChild(l),this.preview=new Me(l,{onPageChanged:o=>this.onPreviewPageChanged(o)});const b=document.createElement("div");this.els.center.appendChild(b),Ue(b,this.preview),this.preview.load(this.opts.wasmUrl??Fe).then(()=>{this.preview.sync(this.store.getState().project),this.scheduleRender()}).catch(o=>{console.error(o);const x=document.createElement("div");x.className="ume-warn",x.textContent=`预览引擎加载失败: ${o.message}。编辑功能不受影响。`,this.els.center.prepend(x)}),t.querySelector('[data-act="add-page"]').addEventListener("click",()=>{const o=prompt("页面名称:",`页面${this.store.getState().project.pages.length+1}`);o!==null&&this.store.getState().addPage(o||void 0)}),this.els.toolbarUndo.addEventListener("click",()=>this.store.getState().undo()),this.els.toolbarRedo.addEventListener("click",()=>this.store.getState().redo()),t.querySelector('[data-act="export-json"]').addEventListener("click",()=>{Y(`${this.store.getState().project.name||"menu-project"}.json`,re(this.store.getState().project),"application/json")}),t.querySelector('[data-act="import"]').addEventListener("click",()=>{n('[data-role="file"]').click()}),n('[data-role="file"]').addEventListener("change",o=>{var I;const x=(I=o.target.files)==null?void 0:I[0];x&&(x.text().then(A=>{try{const E=te(A);this.store.getState().update(D=>{Object.assign(D,E)}),this.scheduleRender()}catch(E){alert(`导入失败: ${E.message}`)}}),o.target.value="")}),t.querySelector('[data-act="generate"]').addEventListener("click",()=>this.generate()),this.onKeyDown=this.onKeyDown.bind(this),document.addEventListener("keydown",this.onKeyDown),this.store.getState().select(((u=this.store.getState().project.pages[0])==null?void 0:u.id)??null,null),this.store.subscribe(()=>{this.preview.sync(this.store.getState().project),this.persist(),this.scheduleRender(),this.notifyChange()}),this.scheduleRender(),this.persist(),window.setInterval(()=>{this.destroyed||this.updateLiveInfo()},300)}getData(){return structuredClone(this.store.getState().project)}loadData(t){var s;const e=te(t);this.store.getState().update(a=>{Object.assign(a,e)}),this.store.getState().select(((s=e.pages[0])==null?void 0:s.id)??null,null)}generate(){var s,a;const t=this.lastExport,e=se(this.store.getState().project,t??void 0);return this.lastExport={c:e.c,h:e.h},this.opts.persistKey&&(localStorage.setItem(`ume_last_c_${this.opts.persistKey}`,e.c),localStorage.setItem(`ume_last_h_${this.opts.persistKey}`,e.h)),Re(this.container,e),(a=(s=this.opts).onExport)==null||a.call(s,e),e}downloadC(){const t=se(this.store.getState().project,this.lastExport??void 0);this.lastExport={c:t.c,h:t.h},Y("menu_pages.c",t.c),Y("menu_pages.h",t.h)}destroy(){this.destroyed=!0,document.removeEventListener("keydown",this.onKeyDown),this.preview.destroy(),this.container.innerHTML=""}onKeyDown(t){const e=t.target;e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="z"?(t.preventDefault(),t.shiftKey?this.store.getState().redo():this.store.getState().undo()):(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="y"&&(t.preventDefault(),this.store.getState().redo()))}onPreviewPageChanged(t){const e=this.store.getState().project.pages[t];e&&this.store.getState().select(e.id,null)}persist(){!this.opts.persistKey||this.destroyed||(clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>{try{localStorage.setItem(`ume_autosave_${this.opts.persistKey}`,re(this.store.getState().project))}catch{}},400))}notifyChange(){this.opts.onChange&&(clearTimeout(this.changeTimer),this.changeTimer=window.setTimeout(()=>{this.opts.onChange(structuredClone(this.store.getState().project))},300))}scheduleRender(){this.renderScheduled||(this.renderScheduled=!0,requestAnimationFrame(()=>{if(this.renderScheduled=!1,this.destroyed)return;const t=this.store.getState();Ce(this.els.left,this.store),je(this.els.styleEl,this.store),De(this.els.propEl,this.store,{openXbmEditor:(e,s)=>ze(this.container,this.store,e,s)}),this.els.toolbarUndo.disabled=t.past.length===0,this.els.toolbarRedo.disabled=t.future.length===0,this.updateLiveInfo()}))}updateLiveInfo(){var c;const t=document.getElementById("ume-live-page"),e=document.getElementById("ume-live-value"),s=this.store.getState(),a=this.store.getState().project.pages.findIndex(i=>i.id===s.selection.pageId);if(t&&a>=0){const i=this.preview.currentPage;t.textContent=`预览页: ${((c=this.store.getState().project.pages[i])==null?void 0:c.name)??"?"}`}if(e&&a>=0&&s.selection.itemId){const i=s.project.pages[a],n=i.items.findIndex(b=>b.id===s.selection.itemId),l=i.items[n];if(l&&"varName"in l){const b=l.kind==="switch"?this.preview.getSwitch(a,n):this.preview.getInt(a,n);e.textContent=`${l.varName} = ${b}`}else e.textContent=""}}}exports.MenuEditor=Ke;exports.MenuKey=M;
//# sourceMappingURL=u8g2-menu-editor.cjs.map
