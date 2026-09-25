import type { Project, Page, Item } from './types';
import { SCHEMA_VERSION } from './types';

export class SchemaError extends Error {}

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
    pages,
  };
}

/** 历史版本迁移（当前仅 v1，占位） */
function migrate(_raw: Record<string, unknown>, _from: number): void {
  return;
}

export function serializeProject(p: Project): string {
  return JSON.stringify(p, null, 2);
}
