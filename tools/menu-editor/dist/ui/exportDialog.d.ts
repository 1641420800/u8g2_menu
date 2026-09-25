export interface ExportResult {
    c: string;
    h: string;
    warnings: string[];
}
export declare function showExportDialog(host: HTMLElement, result: ExportResult): void;
