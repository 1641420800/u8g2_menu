import { type TemplateResult } from 'lit-html';
export declare function textField(label: string, value: string, oncommit: (v: string) => void, placeholder?: string): TemplateResult;
export declare function numField(label: string, value: number, oncommit: (v: number) => void, step?: number | 'any'): TemplateResult;
export declare function selectField<T extends string>(label: string, value: T, options: {
    value: T;
    label: string;
}[], oncommit: (v: T) => void): TemplateResult;
export declare function checkField(label: string, checked: boolean, oncommit: (v: boolean) => void): TemplateResult;
export declare function areaField(label: string, value: string, oncommit: (v: string) => void, mono?: boolean): TemplateResult;
export declare function download(name: string, content: string, mime?: string): void;
