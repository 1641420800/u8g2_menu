import type { Project } from './types';
export declare class SchemaError extends Error {
}
/** 解析并校验工程 JSON（宽容：缺失字段给默认值，多余字段丢弃） */
export declare function parseProject(json: string | unknown): Project;
export declare function serializeProject(p: Project): string;
