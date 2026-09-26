import type { Project, Page, Item, Variable, NumVarType, ChartBuffer } from './types';
import { SCHEMA_VERSION, WEAK_HOOKS } from './types';
import { genId } from './model';

export class SchemaError extends Error {}

const VAR_TYPES: ReadonlySet<string> = new Set(['uint8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'int', 'float', 'double']);
const CHART_KINDS: ReadonlySet<string> = new Set(['line', 'point', 'bar']);
const SAMPLES: ReadonlySet<string> = new Set(['sine', 'ramp', 'noise', 'none']);

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function str(v: unknown, fallback: string): string {
  return typeof v === 'string' ? v : fallback;
}
function num(v: unknown, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}

const KINDS = ['text', 'number', 'switch', 'button', 'submenu', 'back', 'slider', 'progress', 'chart', 'xbm', 'textarea', 'board'] as const;

type LooseItem = Item & { text?: string; scale?: number };

function parseItem(raw: unknown): Item {
  if (!isObj(raw)) throw new SchemaError('条目格式错误');
  const kind = raw.kind as Item['kind'];
  if (typeof kind !== 'string' || !(KINDS as readonly string[]).includes(kind)) {
    throw new SchemaError(`未知条目类型: ${String(kind)}`);
  }
  // 采用「已知字段白名单 + 类型修正」的宽容策略，未识别字段丢弃
  const it = structuredClone(raw) as unknown as LooseItem;
  it.id = str(raw.id, '');
  if (!it.id) it.id = `it_${Math.random().toString(36).slice(2, 10)}`;
  it.label = str(raw.label, '');
  switch (kind) {
    case 'text':
    case 'number':
    case 'switch':
    case 'button':
    case 'submenu':
    case 'back':
      it.text = str(raw.text, '');
      it.scale = raw.scale === 2 ? 2 : 1;
      break;
  }
  return it;
}

function parsePage(raw: unknown): Page {
  if (!isObj(raw)) throw new SchemaError('页面格式错误');
  const items = Array.isArray(raw.items) ? raw.items.map(parseItem) : [];
  return {
    id: str(raw.id, '') || `pg_${Math.random().toString(36).slice(2, 10)}`,
    name: str(raw.name, '未命名页面'),
    fnName: str(raw.fnName, ''),
    items,
    userCodePre: str(raw.userCodePre, ''),
  };
}

function parseVariable(raw: unknown): Variable | null {
  if (!isObj(raw)) return null;
  const type = str(raw.type, 'int32');
  return {
    id: str(raw.id, '') || genId('vb'),
    name: str(raw.name, ''),
    type: (VAR_TYPES.has(type) ? type : 'int32') as NumVarType,
    initialValue: num(raw.initialValue, 0),
    min: num(raw.min, 0),
    max: num(raw.max, 100),
    step: num(raw.step, 1),
  };
}

function parseChartBuffer(raw: unknown): ChartBuffer | null {
  if (!isObj(raw)) return null;
  const sample = str(raw.sample, 'sine');
  return {
    id: str(raw.id, '') || genId('buf'),
    name: str(raw.name, ''),
    dataLen: Math.min(512, Math.max(2, Math.trunc(num(raw.dataLen, 32)))),
    sample: (SAMPLES.has(sample) ? sample : 'sine') as ChartBuffer['sample'],
  };
}

/**
 * 旧版工程迁移：条目自带 varName/varType/step/min/max/initialValue，
 * 统一收敛为变量池 + varId 引用，并删除条目上的旧字段。
 */
function migrateLegacyItems(pages: Page[]): Variable[] {
  const byName = new Map<string, Variable>();
  const list: Variable[] = [];
  const ensure = (name: string, make: () => Variable): Variable => {
    let v = byName.get(name);
    if (!v) {
      v = make();
      byName.set(name, v);
      list.push(v);
    }
    return v;
  };
  for (const pg of pages) {
    for (const it of pg.items) {
      const raw = it as unknown as Record<string, unknown>;
      switch (it.kind) {
        case 'number':
          if (raw.varId === undefined || raw.varId === null) {
            const name = typeof raw.varName === 'string' && raw.varName ? raw.varName : 'var_unnamed';
            const v = ensure(name, () => ({
              id: genId('vb'),
              name,
              type: (VAR_TYPES.has(String(raw.varType)) ? String(raw.varType) : 'int32') as NumVarType,
              initialValue: num(raw.initialValue, 0),
              min: num(raw.min, 0),
              max: num(raw.max, 100),
              step: num(raw.step, 1),
            }));
            (it as { varId?: string | null }).varId = v.id;
          }
          if (raw.editable === undefined) (it as { editable?: boolean }).editable = true;
          delete raw.varName; delete raw.varType; delete raw.step;
          delete raw.min; delete raw.max; delete raw.initialValue; delete raw.decimals;
          break;
        case 'slider':
        case 'progress':
          if (raw.varId === undefined || raw.varId === null) {
            const name = typeof raw.varName === 'string' && raw.varName ? raw.varName : 'var_unnamed';
            const v = ensure(name, () => ({
              id: genId('vb'),
              name,
              type: 'int' as NumVarType,
              initialValue: num(raw.initialValue, 0),
              min: num(raw.min, 0),
              max: num(raw.max, 100),
              step: num(raw.step, 1),
            }));
            (it as { varId?: string | null }).varId = v.id;
          }
          delete raw.varName; delete raw.step; delete raw.min; delete raw.max; delete raw.initialValue;
          break;
        case 'switch':
          if (raw.varId === undefined || raw.varId === null) {
            const name = typeof raw.varName === 'string' && raw.varName ? raw.varName : 'var_unnamed';
            const v = ensure(name, () => ({
              id: genId('vb'),
              name,
              type: 'uint8' as NumVarType,
              initialValue: num(raw.initialValue, 0),
              min: 0,
              max: 1,
              step: 1,
            }));
            (it as { varId?: string | null }).varId = v.id;
          }
          delete raw.varName; delete raw.initialValue;
          break;
        default:
          break;
      }
    }
  }
  return list;
}

/** 解析并校验工程 JSON（宽容：缺失字段给默认值，多余字段丢弃） */
export function parseProject(json: string | unknown): Project {
  let raw: unknown;
  if (typeof json === 'string') {
    try { raw = JSON.parse(json); } catch { throw new SchemaError('JSON 解析失败'); }
  } else {
    raw = json;
  }
  if (!isObj(raw)) throw new SchemaError('不是有效的工程文件');
  const r: Record<string, unknown> = raw;
  const version = num(r.version, 0);
  if (version > SCHEMA_VERSION) {
    throw new SchemaError(`工程版本 v${version} 高于当前支持的 v${SCHEMA_VERSION}，请升级编辑器`);
  }
  if (version < SCHEMA_VERSION) migrate(r, version);

  const pages = Array.isArray(r.pages) ? r.pages.map(parsePage) : [];
  if (!pages.length) throw new SchemaError('工程至少需要一个页面');

  const selector = ['default', 'rotundity', 'square'].includes(r.selector as string)
    ? r.selector as Project['selector'] : 'rotundity';

  // 弱函数勾选：仅保留目录中的已知函数名
  const known = new Set(WEAK_HOOKS.map((h) => h.fn));
  const weakHooks = Array.isArray(r.weakHooks)
    ? [...new Set(r.weakHooks.filter((n): n is string => typeof n === 'string' && known.has(n)))]
    : [];

  // 变量池：显式 variables 字段优先；旧工程从条目字段自动迁移
  let variables: Variable[];
  if (Array.isArray(r.variables)) {
    variables = r.variables.map(parseVariable).filter((v): v is Variable => !!v);
  } else {
    variables = migrateLegacyItems(pages);
  }

  // 图表数据源缓冲区：显式字段优先；旧图表条目（自带 chartKind/dataLen）自动迁移
  let chartBuffers: ChartBuffer[];
  if (Array.isArray(r.chartBuffers)) {
    chartBuffers = r.chartBuffers.map(parseChartBuffer).filter((v): v is ChartBuffer => !!v);
  } else {
    chartBuffers = migrateLegacyCharts(pages);
  }

  return {
    version: SCHEMA_VERSION,
    name: str(r.name, '未命名工程'),
    width: num(r.width, 128),
    height: num(r.height, 64),
    font: str(r.font, 'u8g2_font_wqy12_t_gb2312'),
    selector,
    selectorLeftMargin: num(r.selectorLeftMargin, 16),
    selectorTopMargin: num(r.selectorTopMargin, 0),
    selectorLineSpacing: num(r.selectorLineSpacing, 0),
    marqueeSpeed: num(r.marqueeSpeed, 0.2),
    marqueeHeaderLen: num(r.marqueeHeaderLen, 5),
    weakHooks,
    variables,
    chartBuffers,
    pages,
  };
}

/** 旧版图表条目迁移：chartKind/dataLen/sample/min/max 收敛为缓冲区 + 数据源 */
function migrateLegacyCharts(pages: Page[]): ChartBuffer[] {
  const buffers: ChartBuffer[] = [];
  let seq = 0;
  const newBuf = (): ChartBuffer => {
    const b: ChartBuffer = {
      id: genId('buf'),
      name: `buf_chart_${++seq}`,
      dataLen: 32,
      sample: 'sine',
    };
    buffers.push(b);
    return b;
  };
  for (const pg of pages) {
    for (const it of pg.items) {
      if (it.kind !== 'chart') continue;
      const raw = it as unknown as Record<string, unknown>;
      if (Array.isArray(raw.sources)) continue; // 已是新模型
      const buf = newBuf();
      buf.dataLen = Math.min(512, Math.max(2, Math.trunc(num(raw.dataLen, 32))));
      const sample = str(raw.sample, 'sine');
      if (SAMPLES.has(sample)) buf.sample = sample as ChartBuffer['sample'];
      const kind = str(raw.chartKind, 'line');
      const src: Record<string, unknown> = {
        bufferId: buf.id,
        chartKind: CHART_KINDS.has(kind) ? kind : 'line',
      };
      if (raw.max !== undefined && raw.max !== null) src.max = num(raw.max, 0);
      if (raw.min !== undefined && raw.min !== null) src.min = num(raw.min, 0);
      (it as { sources?: unknown[]; height?: number }).sources = [src];
      if (raw.height === undefined) (it as { height?: number }).height = 32;
      delete raw.chartKind; delete raw.dataLen; delete raw.sample;
      delete raw.max; delete raw.min;
    }
  }
  return buffers;
}

/** 历史版本迁移（当前仅 v1，占位） */
function migrate(_raw: Record<string, unknown>, _from: number): void {
  return;
}

export function serializeProject(p: Project): string {
  return JSON.stringify(p, null, 2);
}
