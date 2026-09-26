import type { Item, NumberItem, Page, Project, SwitchItem, NumVarType, ChartBuffer, ChartSource } from './types';
import { WEAK_HOOKS } from './types';

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

/** 数据源缓冲区的示例填充语句（在 buf_<name>_fill 助手内使用） */
function bufSampleLine(name: string, len: number, sample: ChartBuffer['sample']): string {
  if (sample === 'ramp') return `${name}[i] = (float)i;`;
  if (sample === 'noise') return `${name}[i] = (float)((i * 37) % ${len});`;
  return `${name}[i] = 50.0f + 40.0f * sinf(i * 0.5f);`;
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
  /** 编辑器类型（生成绑定调用用） */
  srcType: NumVarType;
  /** C 类型名 */
  type: string;
  init: string;
  isFloat: boolean;
  step: number;
  min: number;
  max: number;
}

const INT_TYPES: ReadonlySet<string> = new Set(['uint8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'int']);

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

  // ---------- 变量池（条目按 varId 引用） ----------
  const vars = new Map<string, VarDef>();       // name -> def（定义去重）
  const varById = new Map<string, VarDef>();    // id -> def（条目解析）
  for (const v of project.variables ?? []) {
    if (!v.name) { warnings.push('存在未命名变量，已跳过'); continue; }
    if (vars.has(v.name)) { warnings.push(`变量名 "${v.name}" 重复，以第一个为准`); continue; }
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(v.name)) {
      warnings.push(`变量名 "${v.name}" 不是合法的 C 标识符，已清洗为 "${toCIdent(v.name)}"`);
    }
    const name = toCIdent(v.name, 'var');
    const isFloat = v.type === 'float' || v.type === 'double';
    const def: VarDef = {
      name,
      srcType: v.type,
      type: C_TYPE[v.type],
      init: isFloat ? floatLit(v.initialValue) : String(Math.trunc(v.initialValue)),
      isFloat,
      step: v.step,
      min: v.min,
      max: v.max,
    };
    vars.set(name, def);
    varById.set(v.id, def);
  }

  // ---------- 回调收集（去重） ----------
  const buttonCbs = new Map<string, number>();   // cbName -> buttonId(首个)
  const boardCbs = new Set<string>();

  // ---------- 图表：数据源缓冲区（手动创建）+ 每条目叠加层（dis 自动生成） ----------
  const bufDefs: string[] = [];                  // 缓冲区数组 + 填充助手
  const bufById = new Map<string, { name: string; lenMacro: string; len: number }>();
  for (const b of project.chartBuffers ?? []) {
    if (!b.name) { warnings.push('存在未命名数据源缓冲区，已跳过'); continue; }
    const name = toCIdent(b.name, 'buf');
    if ([...bufById.values()].some((x) => x.name === name)) {
      warnings.push(`缓冲区名 "${b.name}" 与其它缓冲区重名，已跳过`);
      continue;
    }
    const len = Math.max(2, Math.trunc(b.dataLen));
    const lenMacro = `${name.toUpperCase()}_LEN`;
    bufById.set(b.id, { name, lenMacro, len });
    const blockName = `fill_${name}`;
    const hasUserFill = (cBlocks.get(blockName) ?? '').trim() !== '';
    bufDefs.push(
      `#define ${lenMacro} ${len}`,
      `static float ${name}[${lenMacro}];`,
      `static uint8_t ${name}_filled = 0;`,
      `static void ${name}_fill(void)`,
      `{`,
      userBlock(blockName, cBlocks, '    '),
      ...(b.sample !== 'none' && !hasUserFill
        ? [`    for (uint16_t i = 0; i < ${lenMacro}; ++i) { ${bufSampleLine(name, len, b.sample)} }`]
        : []),
      `}`,
    );
  }

  const chartRes: string[] = [];                 // dis 数组 + chart 结构 + layers
  const chartInitByItem = new Map<string, string[]>();  // itemId -> init-once 块
  const chartDrawByItem = new Map<string, string>();    // itemId -> 绘制调用
  const bufFillGuards = new Map<string, string>();      // bufferId -> 守卫调用行
  {
    let chartIdx = 0;
    let layerIdx = 0;
    const fillGuard = (bufId: string): string => {
      const b = bufById.get(bufId);
      if (!b) return '';
      if (!bufFillGuards.has(bufId)) {
        bufFillGuards.set(bufId, `        if (!${b.name}_filled) { ${b.name}_filled = 1; ${b.name}_fill(); }`);
      }
      return bufFillGuards.get(bufId)!;
    };
    for (const pg of project.pages) {
      for (const it of pg.items) {
        if (it.kind !== 'chart') continue;
        const sources = it.sources.filter((s) => bufById.has(s.bufferId));
        if (it.sources.length && !sources.length) {
          warnings.push(`页面 ${pg.name} 的图表条目数据源无效（缓冲区不存在），已跳过`);
          continue;
        }
        if (!sources.length) {
          warnings.push(`页面 ${pg.name} 的图表条目未绑定数据源，已跳过`);
          continue;
        }
        const h = Math.max(4, Math.trunc(it.height));
        // 每个数据源：dis 数组 + chart 结构（自动生成）
        const structs: { name: string; s: ChartSource; b: { name: string; lenMacro: string } }[] = [];
        for (const s of sources) {
          const b = bufById.get(s.bufferId)!;
          const cname = `chart${chartIdx++}`;
          chartRes.push(
            `static float ${cname}_dis[${b.lenMacro}];`,
            `static u8g2_chart_t ${cname};`,
          );
          structs.push({ name: cname, s, b });
        }
        if (structs.length === 1) {
          // 单源：与库示例一致的简洁写法
          const { name: cname, s, b } = structs[0];
          chartRes.push(`static uint8_t ${cname}_inited = 0;`);
          chartInitByItem.set(it.id, [
            `    if (!${cname}_inited) {`,
            `        ${cname}_inited = 1;`,
            `        u8g2_chart_init(&${cname}, ${b.name}, ${cname}_dis, ${b.lenMacro});`,
            fillGuard(s.bufferId),
            `    }`,
          ]);
          const fn = s.chartKind === 'point' ? 'Point' : s.chartKind === 'bar' ? 'Bar' : 'Line';
          const range = (s.min !== undefined && s.max !== undefined)
            ? `${floatLit(s.max)}, ${floatLit(s.min)}` : '0, 0';
          chartDrawByItem.set(it.id, `    u8g2_MenuDrawItem${fn}Chart(&${cname}, ${h}, ${range});`);
        } else {
          // 多源叠加：u8g2_MenuDrawItemChart(数组, N, h) 同区域依次绘制
          const layers = `chart_layers_${layerIdx++}`;
          chartRes.push(
            `static u8g2_menu_drawChart_t ${layers}[${structs.length}];`,
            `static uint8_t ${layers}_inited = 0;`,
          );
          const init: string[] = [
            `    if (!${layers}_inited) {`,
            `        ${layers}_inited = 1;`,
          ];
          structs.forEach(({ name: cname, s, b }, si) => {
            init.push(`        u8g2_chart_init(&${cname}, ${b.name}, ${cname}_dis, ${b.lenMacro});`);
            init.push(fillGuard(s.bufferId));
            const fn = s.chartKind === 'point' ? 'u8g2_drawPointChart' : s.chartKind === 'bar' ? 'u8g2_drawBarChart' : 'u8g2_drawLineChart';
            const range = (s.min !== undefined && s.max !== undefined)
              ? `${floatLit(s.max)}, ${floatLit(s.min)}` : '0, 0';
            init.push(`        ${layers}[${si}].drawChart = ${fn};`);
            init.push(`        ${layers}[${si}].chart = &${cname};`);
            init.push(`        ${layers}[${si}].max = ${range.split(', ')[0]};`);
            init.push(`        ${layers}[${si}].min = ${range.split(', ')[1]};`);
          });
          init.push(`    }`);
          chartInitByItem.set(it.id, init);
          chartDrawByItem.set(it.id, `    u8g2_MenuDrawItemChart(${layers}, ${structs.length}, ${h});`);
        }
      }
    }
  }

  // ---------- 文本区 / XBM 资源 ----------
  const xbmDefs: string[] = [];
  const textAreas: string[] = [];
  const taInits: string[] = [];
  const xbmNames = new Set<string>();
  const xbmNameById = new Map<string, string>();

  let taIdx = 0;

  for (const pg of project.pages) {
    for (const it of pg.items) {
      switch (it.kind) {
        case 'button': {
          const cb = toCIdent(it.cbName, 'btn_cb');
          if (!buttonCbs.has(cb)) buttonCbs.set(cb, it.buttonId);
          break;
        }
        case 'board':
          boardCbs.add(toCIdent(it.cbName, 'board_cb'));
          break;
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

  let taCursor = 0;

  const genItem = (it: Item, pg: Page): string[] => {
    const lines: string[] = [];
    const pgLabel = `${pg.name}`;
    const resolveVar = (varId: string | null): VarDef | null => {
      if (!varId) return null;
      const v = varById.get(varId);
      if (!v) warnings.push(`页面 ${pgLabel} 的条目引用了已删除的变量，已按普通文本生成`);
      return v ?? null;
    };
    switch (it.kind) {
      case 'text': {
        const code = drawText(it.text, it.scale);
        if (code) lines.push(`    ${code}`);
        break;
      }
      case 'number': {
        const n = it as NumberItem;
        const v = resolveVar(n.varId);
        if (v && n.editable !== false) {
          const bind = v.isFloat
            ? `u8g2_MenuItemValue_${v.srcType}(&${v.name}, ${floatLit(v.step)}, ${floatLit(v.min)}, ${floatLit(v.max)});`
            : `u8g2_MenuItemValue_${v.srcType}(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`;
          lines.push(`    ${bind}`);
        }
        if (v) {
          lines.push(`    ${drawTextWithArg(n.text, n.scale, v.name)}`);
          if (n.editable !== false && !/%[-+ #0]*[a-zA-Z]/.test(n.text)) {
            warnings.push(`数值条目 "${pgLabel}" 的显示文本不含格式化占位符（如 %d）`);
          }
        } else if (/%[-+ #0]*[a-zA-Z]/.test(n.text)) {
          warnings.push(`页面 ${pgLabel} 的数值条目未绑定变量但文本含占位符，已按普通文本生成`);
          const code = drawText(n.text.replace(/%[-+ #0]*[a-zA-Z]/g, ''), n.scale);
          if (code) lines.push(`    ${code}`);
        } else {
          const code = drawText(n.text, n.scale);
          if (code) lines.push(`    ${code}`);
        }
        break;
      }
      case 'switch': {
        const s = it as SwitchItem;
        const v = resolveVar(s.varId);
        if (v) {
          if (v.srcType !== 'uint8') {
            warnings.push(`开关条目绑定的变量 "${v.name}" 应为 uint8 类型（当前 ${v.srcType}），已跳过绑定`);
            const code = drawText(s.text, s.scale);
            if (code) lines.push(`    ${code}`);
            break;
          }
          lines.push(`    u8g2_MenuItemValue_switch(&${v.name}, ${Math.trunc(s.openValue)});`);
          lines.push(`    ${drawTextWithArg(s.text, s.scale, `${v.name} ? "${cstr(s.onText)}" : "${cstr(s.offText)}"`)}`);
          if (!/%[-+ #0]*s/.test(s.text)) {
            warnings.push(`开关条目 "${v.name}" 的显示文本建议包含 %s 用于显示 on/off`);
          }
        } else {
          const code = drawText(s.text, s.scale);
          if (code) lines.push(`    ${code}`);
        }
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
      case 'slider':
      case 'progress': {
        const v = resolveVar(it.varId);
        if (!v) {
          warnings.push(`页面 ${pgLabel} 的${it.kind === 'slider' ? '滑块' : '进度'}条目未绑定变量，已跳过`);
          break;
        }
        if (!INT_TYPES.has(v.srcType)) {
          warnings.push(`滑块/进度条绑定的变量 "${v.name}" 须为整型（当前 ${v.srcType}），已跳过`);
          break;
        }
        const fn = it.kind === 'slider' ? 'Slider' : 'ProgressBar';
        lines.push(`    u8g2_MenuDrawItem${fn}_bind(&${v.name}, ${Math.trunc(v.step)}, ${Math.trunc(v.min)}, ${Math.trunc(v.max)});`);
        break;
      }
      case 'chart': {
        const init = chartInitByItem.get(it.id);
        const draw = chartDrawByItem.get(it.id);
        if (!init || !draw) break;
        lines.push(...init);
        lines.push(draw);
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
  if ((project.chartBuffers ?? []).some((b) => b.sample === 'sine')) cParts.push(`#include <math.h>`);
  cParts.push('');
  cParts.push(userBlock('includes', cBlocks, ''));
  cParts.push('');

  // 变量
  cParts.push(`/* ======================== 变量定义 ======================== */`);
  cParts.push(userBlock('variables', cBlocks, ''));
  for (const v of vars.values()) cParts.push(`${v.type} ${v.name} = ${v.init};`);
  cParts.push('');

  // 资源（数据源缓冲区/图表/文本区/XBM）
  if (bufDefs.length || chartRes.length || textAreas.length || xbmDefs.length) {
    cParts.push(`/* ======================== 页面资源 ======================== */`);
    cParts.push(...bufDefs, ...chartRes, ...textAreas, ...xbmDefs);
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

  // 弱定义函数重写
  const selectedHooks = (project.weakHooks ?? [])
    .map((fn) => WEAK_HOOKS.find((h) => h.fn === fn))
    .filter((h): h is NonNullable<typeof h> => !!h);
  if (selectedHooks.length || cBlocks.has('weak') || WEAK_HOOKS.some((h) => (cBlocks.get(`weak_${h.fn}`) ?? '').trim())) {
    cParts.push(`/* ==================== 弱定义函数重写 ==================== */`);
    cParts.push(`/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，`);
    cParts.push(` * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */`);
    // 未勾选但留有手写内容的函数：以 #if 0 形式保留（保留 USER CODE 标记，
    // 保证再次勾选时手写内容能取回），避免手写代码丢失
    const disabled = WEAK_HOOKS.filter((h) => !project.weakHooks?.includes(h.fn)
      && (cBlocks.get(`weak_${h.fn}`) ?? '').trim());
    const disabledText = disabled.map((h) => [
      `#if 0   /* 已取消勾选 ${h.fn}，手写内容保留于此；重新勾选后恢复编译 */`,
      `${h.decl}`,
      `{`,
      userBlock(`weak_${h.fn}`, cBlocks, '    '),
      `}`,
      `#endif`,
    ].join('\n')).join('\n');
    cParts.push(disabledText ? `${userBlock('weak', cBlocks, '').replace(/\n$/, '')}\n${disabledText}\n` : userBlock('weak', cBlocks, ''));
    cParts.push('');
    for (const hook of selectedHooks) {
      cParts.push(`/* ${hook.label}: ${hook.desc} */`);
      cParts.push(`${hook.decl}`);
      cParts.push(`{`);
      cParts.push(userBlock(`weak_${hook.fn}`, cBlocks, '    '));
      const body: string[] = hook.bodyArgs.split('\n').map((l) => `    ${l}`);
      if (hook.retNote) body.push(`    ${hook.retNote}`);
      cParts.push(...body);
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
