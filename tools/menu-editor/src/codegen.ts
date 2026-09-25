import type { Item, NumberItem, Page, Project, SwitchItem, NumVarType } from './types';

export interface CodegenResult {
  c: string;
  h: string;
  warnings: string[];
}

const C_TYPE: Record<NumVarType, string> = {
  uint8: 'uint8_t', uint16: 'uint16_t', uint32: 'uint32_t',
  int8: 'int8_t', int16: 'int16_t', int32: 'int32_t',
  int: 'int', float: 'float', double: 'double',
};

export function toCIdent(s: string, fallback = 'anon'): string {
  let out = s.trim().replace(/[^A-Za-z0-9_]/g, '_');
  if (!out || /^[0-9]/.test(out)) out = `_${out}`;
  return out || fallback;
}

export function cstr(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r\n?/g, '\\n')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');
}

function floatLit(v: number): string {
  if (!Number.isFinite(v)) return '0.0f';
  const s = v.toString();
  return /[-.]|e/i.test(s) ? `${s}f` : `${s}.0f`;
}

/** 提取旧文件里 USER CODE 区内容（按标记名索引） */
export function extractUserBlocks(text: string): Map<string, string> {
  const map = new Map<string, string>();
  if (!text) return map;
  const re = /\/\* USER CODE BEGIN ([\w.]+) \*\/([\s\S]*?)\/\* USER CODE END \1 \*\//g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) map.set(m[1], m[2]);
  return map;
}

function userBlock(name: string, preserved: Map<string, string>, indent: string): string {
  const inner = preserved.has(name) ? preserved.get(name)! : '';
  return `${indent}/* USER CODE BEGIN ${name} */${inner}${indent}/* USER CODE END ${name} */`;
}

interface VarDef {
  name: string;
  type: string;
  init: string;
  isFloat: boolean;
  /** 来源条目 id（冲突提示用） */
  owner: Item;
}

export function generateCode(
  project: Project,
  preserve?: { c?: string; h?: string },
): CodegenResult {
  const warnings: string[] = [];
  const cBlocks = extractUserBlocks(preserve?.c ?? '');

  // ---------- 页面函数名 ----------
  const pageFns = project.pages.map((pg, i) => {
    if (pg.fnName && /^[A-Za-z_][A-Za-z0-9_]*$/.test(pg.fnName)) return pg.fnName;
    return `page_${i}`;
  });

  // ---------- 变量收集 ----------
  const vars = new Map<string, VarDef>();
  const needVar = (name: string, type: string, init: string, isFloat: boolean, owner: Item) => {
    const existing = vars.get(name);
    if (existing) {
      if (existing.type !== type) {
        warnings.push(`变量 "${name}" 被多个不同类型的条目引用（${existing.type} / ${type}），以首个定义为准`);
      }
      return;
    }
    vars.set(name, { name, type, init, isFloat, owner });
  };

  // ---------- 回调收集（去重） ----------
  const buttonCbs = new Map<string, number>();   // cbName -> buttonId(首个)
  const boardCbs = new Set<string>();

  // ---------- 图表 / 文本区 / XBM 资源 ----------
  const charts: string[] = [];    // 生成的静态资源声明
  const chartInits: string[] = []; // 页内初始化语句
  const xbmDefs: string[] = [];
  const textAreas: string[] = [];
  const taInits: string[] = [];
  const xbmNames = new Set<string>();
  const xbmNameById = new Map<string, string>();

  let chartIdx = 0;
  let taIdx = 0;

  for (const pg of project.pages) {
    for (const it of pg.items) {
      switch (it.kind) {
        case 'number': {
          const n = it as NumberItem;
          if (!n.varName) { warnings.push(`存在未命名变量条目（页面 ${pg.name}），已跳过绑定`); break; }
          const init = n.varType === 'float' || n.varType === 'double'
            ? floatLit(n.initialValue) : String(Math.trunc(n.initialValue));
          needVar(n.varName, C_TYPE[n.varType], init, n.varType === 'float' || n.varType === 'double', it);
          if (!/%[-+ #0]*[a-zA-Z]/.test(n.text)) {
            warnings.push(`数值条目 "${pg.name}/${n.varName}" 的显示文本不含格式化占位符（如 %d）`);
          }
          break;
        }
        case 'switch': {
          const s = it as SwitchItem;
          if (!s.varName) { warnings.push(`存在未命名开关条目（页面 ${pg.name}），已跳过绑定`); break; }
          needVar(s.varName, 'uint8_t', String(Math.trunc(s.initialValue)), false, it);
          if (!/%[-+ #0]*s/.test(s.text)) {
            warnings.push(`开关条目 "${s.varName}" 的显示文本建议包含 %s 用于显示 on/off`);
          }
          break;
        }
        case 'slider':
        case 'progress': {
          const sl = it as { varName: string; initialValue: number };
          if (!sl.varName) { warnings.push(`存在未命名${it.kind === 'slider' ? '滑块' : '进度'}条目（页面 ${pg.name}）`); break; }
          needVar(sl.varName, 'int', String(Math.trunc(sl.initialValue)), false, it);
          break;
        }
        case 'button': {
          const cb = toCIdent(it.cbName, 'btn_cb');
          if (!buttonCbs.has(cb)) buttonCbs.set(cb, it.buttonId);
          break;
        }
        case 'board':
          boardCbs.add(toCIdent(it.cbName, 'board_cb'));
          break;
        case 'chart': {
          const idx = chartIdx++;
          charts.push(
            `#define CHART${idx}_LEN ${Math.max(2, Math.trunc(it.dataLen))}`,
            `static float chart${idx}_data[CHART${idx}_LEN];`,
            `static float chart${idx}_dis[CHART${idx}_LEN];`,
            `static u8g2_chart_t chart${idx};`,
            `static uint8_t chart${idx}_inited = 0;`,
          );
          const fill =
            it.sample === 'sine'
              ? `chart${idx}_data[i] = 50.0f + 40.0f * sinf(i * 0.5f);`
              : it.sample === 'ramp'
                ? `chart${idx}_data[i] = (float)i;`
                : `chart${idx}_data[i] = (float)((i * 37) % CHART${idx}_LEN);`;
          const blockName = `chart${idx}_fill`;
          const hasUserFill = (cBlocks.get(blockName) ?? '').trim() !== '';
          chartInits.push([
            `    if (!chart${idx}_inited) {`,
            `        chart${idx}_inited = 1;`,
            `        u8g2_chart_init(&chart${idx}, chart${idx}_data, chart${idx}_dis, CHART${idx}_LEN);`,
            userBlock(blockName, cBlocks, '        '),
            ...(hasUserFill ? [] : [`        for (uint16_t i = 0; i < CHART${idx}_LEN; ++i) { ${fill} }`]),
            `    }`,
          ].join('\n'));
          break;
        }
        case 'xbm': {
          let name = toCIdent(it.name, 'icon');
          while (xbmNames.has(name)) name = `${name}_2`;
          xbmNames.add(name);
          xbmNameById.set(it.id, name);
          const bytes = it.bits.length;
          const hex = it.bits.map((b) => `0x${(b & 0xff).toString(16).padStart(2, '0')}`).join(', ');
          xbmDefs.push(`static const uint8_t menu_xbm_${name}[${bytes}] = { ${hex} };`);
          break;
        }
        case 'textarea': {
          const idx = taIdx++;
          textAreas.push(
            `static char ta${idx}_text[] = "${cstr(it.content)}";`,
            `static u8g2_menu_textArea_t ta${idx};`,
            `static uint8_t ta${idx}_inited = 0;`,
          );
          taInits.push(
            `    if (!ta${idx}_inited) {`,
            `        ta${idx}_inited = 1;`,
            `        u8g2_textArea_init(&ta${idx}, ta${idx}_text);`,
            `        u8g2_textArea_setLineSpacing(&ta${idx}, ${Math.max(0, Math.trunc(it.lineSpacing))});`,
            `    }`,
          );
          break;
        }
        default:
          break;
      }
    }
  }

  // ---------- 单条目代码生成 ----------
  const drawText = (text: string, scale: 1 | 2): string => {
    if (!text) return '';
    const lit = `"${cstr(text)}"`;
    return scale === 2
      ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${lit});`
      : `u8g2_MenuUTF8Printf(${lit});`;
  };

  const drawTextWithArg = (text: string, scale: 1 | 2, arg: string): string => {
    const lit = `"${cstr(text)}"`;
    return scale === 2
      ? `u8g2_MenuPrintf(u8g2_MenuDrawUTF8X2, ${lit}, ${arg});`
      : `u8g2_MenuUTF8Printf(${lit}, ${arg});`;
  };

  let chartCursor = 0;
  let taCursor = 0;

  const genItem = (it: Item, pg: Page): string[] => {
    const lines: string[] = [];
    const pgLabel = `${pg.name}`;
    switch (it.kind) {
      case 'text': {
        const code = drawText(it.text, it.scale);
        if (code) lines.push(`    ${code}`);
        break;
      }
      case 'number': {
        const n = it as NumberItem;
        if (!vars.has(n.varName)) break;
        const bind = n.varType === 'float' || n.varType === 'double'
          ? `u8g2_MenuItemValue_${n.varType}(&${n.varName}, ${floatLit(n.step)}, ${floatLit(n.min)}, ${floatLit(n.max)});`
          : `u8g2_MenuItemValue_${n.varType}(&${n.varName}, ${Math.trunc(n.step)}, ${Math.trunc(n.min)}, ${Math.trunc(n.max)});`;
        lines.push(`    ${bind}`);
        lines.push(`    ${drawTextWithArg(n.text, n.scale, n.varName)}`);
        break;
      }
      case 'switch': {
        const s = it as SwitchItem;
        if (!vars.has(s.varName)) break;
        lines.push(`    u8g2_MenuItemValue_switch(&${s.varName}, ${Math.trunc(s.openValue)});`);
        lines.push(`    ${drawTextWithArg(s.text, s.scale, `${s.varName} ? "${cstr(s.onText)}" : "${cstr(s.offText)}"`)}`);
        break;
      }
      case 'button': {
        const cb = toCIdent(it.cbName, 'btn_cb');
        lines.push(`    u8g2_MenuItem_button(${cb}, ${Math.trunc(it.buttonId)});`);
        const code = drawText(it.text, it.scale);
        if (code) lines.push(`    ${code}`);
        break;
      }
      case 'submenu': {
        if (!it.targetPageId) {
          warnings.push(`页面 ${pgLabel} 的子页面条目 "${it.text || it.label || it.id}" 未指定目标页面，已按普通文本生成`);
          const code = drawText(it.text, it.scale);
          if (code) lines.push(`    ${code}`);
          break;
        }
        const tIdx = project.pages.findIndex((p) => p.id === it.targetPageId);
        if (tIdx < 0) {
          warnings.push(`页面 ${pgLabel} 的子页面条目目标无效`);
          break;
        }
        lines.push(`    u8g2_MenuItem_menu_enter(${pageFns[tIdx]});`);
        const code = drawText(it.text, it.scale);
        if (code) lines.push(`    ${code}`);
        break;
      }
      case 'back': {
        lines.push(`    u8g2_MenuItem_menu_back();`);
        const code = drawText(it.text, it.scale);
        if (code) lines.push(`    ${code}`);
        break;
      }
      case 'slider': {
        const sl = it as { varName: string; step: number; min: number; max: number };
        if (!vars.has(sl.varName)) break;
        lines.push(`    u8g2_MenuDrawItemSlider_bind(&${sl.varName}, ${Math.trunc(sl.step)}, ${Math.trunc(sl.min)}, ${Math.trunc(sl.max)});`);
        break;
      }
      case 'progress': {
        const pr = it as { varName: string; step: number; min: number; max: number };
        if (!vars.has(pr.varName)) break;
        lines.push(`    u8g2_MenuDrawItemProgressBar_bind(&${pr.varName}, ${Math.trunc(pr.step)}, ${Math.trunc(pr.min)}, ${Math.trunc(pr.max)});`);
        break;
      }
      case 'chart': {
        const idx = chartCursor++;
        lines.push(...chartInits[idx].split('\n'));
        const fn = it.chartKind === 'point' ? 'Point' : it.chartKind === 'bar' ? 'Bar' : 'Line';
        const range = (it.min !== undefined && it.max !== undefined)
          ? `${floatLit(it.max)}, ${floatLit(it.min)}`
          : '0, 0';
        lines.push(`    u8g2_MenuDrawItem${fn}Chart(&chart${idx}, ${Math.max(4, Math.trunc(it.height))}, ${range});`);
        break;
      }
      case 'xbm':
        lines.push(`    u8g2_MenuDrawItemXBMP(${Math.trunc(it.w)}, ${Math.trunc(it.h)}, menu_xbm_${xbmNameById.get(it.id) ?? toCIdent(it.name, 'icon')});`);
        break;
      case 'textarea': {
        const idx = taCursor++;
        lines.push(...taInits[idx].split('\n'));
        const call = it.bindScroll ? 'u8g2_MenuDrawTextArea_bind' : 'u8g2_MenuDrawTextArea';
        lines.push(`    ${call}(&ta${idx}, ${Math.max(10, Math.trunc(it.height))});`);
        break;
      }
      case 'board': {
        const cb = toCIdent(it.cbName, 'board_cb');
        lines.push(`    u8g2_MenuDrawItemBoard(${cb}, ${Math.max(1, Math.trunc(it.w))}, ${Math.max(1, Math.trunc(it.h))});`);
        break;
      }
    }
    return lines;
  };

  // ---------- 组装 .c ----------
  const cParts: string[] = [];
  cParts.push(`/**`);
  cParts.push(` * 由 u8g2-menu-editor 自动生成，工程: ${project.name}`);
  cParts.push(` * 重新生成时，USER CODE 区域内的手写内容会被保留。`);
  cParts.push(` */`);
  cParts.push(`#include "menu_pages.h"`);
  cParts.push(`#include "u8g2_menu.h"`);
  if (charts.length) cParts.push(`#include <math.h>`);
  cParts.push('');
  cParts.push(userBlock('includes', cBlocks, ''));
  cParts.push('');

  // 变量
  cParts.push(`/* ======================== 变量定义 ======================== */`);
  cParts.push(userBlock('variables', cBlocks, ''));
  for (const v of vars.values()) cParts.push(`${v.type} ${v.name} = ${v.init};`);
  cParts.push('');

  // 资源（图表/文本区/XBM）
  if (charts.length || textAreas.length || xbmDefs.length) {
    cParts.push(`/* ======================== 页面资源 ======================== */`);
    cParts.push(...charts, ...textAreas, ...xbmDefs);
    cParts.push('');
  }

  // 回调
  if (buttonCbs.size || boardCbs.size) {
    cParts.push(`/* ======================== 回调函数 ======================== */`);
    cParts.push(userBlock('callbacks', cBlocks, ''));
    for (const [cb] of buttonCbs) {
      cParts.push(`void ${cb}(u8g2_menu_t *menu, uint8_t ID)`);
      cParts.push(`{`);
      cParts.push(userBlock(`cb_${cb}`, cBlocks, '    '));
      cParts.push(`}`);
      cParts.push('');
    }
    for (const cb of boardCbs) {
      cParts.push(`void ${cb}(u8g2_t *u8g2)`);
      cParts.push(`{`);
      cParts.push(userBlock(`cb_${cb}`, cBlocks, '    '));
      cParts.push(`}`);
      cParts.push('');
    }
  }

  // 页面函数
  cParts.push(`/* ======================== 页面函数 ======================== */`);
  cParts.push('');
  project.pages.forEach((pg, i) => {
    cParts.push(`/* 页面: ${pg.name} */`);
    cParts.push(`void ${pageFns[i]}(void)`);
    cParts.push(`{`);
    cParts.push(userBlock(`page_${pageFns[i]}_pre`, cBlocks, '    '));
    for (const it of pg.items) cParts.push(...genItem(it, pg));
    cParts.push(`}`);
    cParts.push('');
  });

  // ---------- 组装 .h ----------
  const hParts: string[] = [];
  hParts.push(`#ifndef MENU_PAGES_H`);
  hParts.push(`#define MENU_PAGES_H`);
  hParts.push('');
  hParts.push(`#include "u8g2_menu.h"`);
  hParts.push('');
  hParts.push(`/* 页面入口。首个页面作为 u8g2_CreateMenu 的初始页面。 */`);
  pageFns.forEach((fn, i) => hParts.push(`void ${fn}(void);   /* ${project.pages[i].name} */`));
  hParts.push('');
  if (vars.size) {
    hParts.push(`/* 可编辑变量（在条目绑定中使用） */`);
    for (const v of vars.values()) hParts.push(`extern ${v.type} ${v.name};`);
    hParts.push('');
  }
  if (buttonCbs.size || boardCbs.size) {
    hParts.push(`/* 用户回调 */`);
    for (const [cb] of buttonCbs) hParts.push(`void ${cb}(u8g2_menu_t *menu, uint8_t ID);`);
    for (const cb of boardCbs) hParts.push(`void ${cb}(u8g2_t *u8g2);`);
    hParts.push('');
  }
  hParts.push(`#endif /* MENU_PAGES_H */`);

  const header = cParts.join('\n').replace(/\n{3,}/g, '\n\n\n');
  const hText = hParts.join('\n');

  return { c: `${header}\n`, h: `${hText}\n`, warnings };
}
