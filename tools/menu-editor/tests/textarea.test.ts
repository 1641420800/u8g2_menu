import { describe, it, expect } from 'vitest';
import { generateCode } from '../src/codegen';
import type { Project } from '../src/types';

/** 回归：文本区条目必须生成完整的 init 块 + 绘制调用（曾因 taInits 展开错误丢失中间行） */
describe('回归: textarea 生成', () => {
  it('init 块完整、括号配对、资源声明齐全', () => {
    const proj = {
      version: 1,
      name: '复现',
      width: 128, height: 64,
      font: 'u8g2_font_5x7_tf',
      selector: 'rotundity' as const,
      selectorLeftMargin: 16, selectorTopMargin: 0, selectorLineSpacing: 0,
      marqueeSpeed: 0.2, marqueeHeaderLen: 5,
      weakHooks: [], fontSubset: false, fontExtra: '',
      variables: [], chartBuffers: [],
      pages: [{
        id: 'p0', name: '主页', fnName: '', userCodePre: '',
        items: [
          { id: 't0', kind: 'text', label: '', text: 'u8g2_menu', scale: 1 as const, displayVarId: null, bind: { type: 'none' as const } },
          { id: 'ta0', kind: 'textarea', label: '', bind: { type: 'none' as const },
            content: '说明文本', height: 40, bindScroll: true, lineSpacing: 2 },
        ],
      }],
    };
    const { c, warnings } = generateCode(proj as unknown as Project);
    expect(c).toContain('static char ta0_text[] = "说明文本";');
    expect(c).toContain('if (!ta0_inited) {');
    expect(c).toContain('ta0_inited = 1;');
    expect(c).toContain('u8g2_textArea_init(&ta0, ta0_text);');
    expect(c).toContain('u8g2_textArea_setLineSpacing(&ta0, 2);');
    expect(c).toContain('u8g2_MenuDrawTextArea_bind(&ta0, 40);');
    // if 块必须闭合：init 行之后应出现 "    }" 再是绘制行
    const body = c.slice(c.indexOf('void page_0(void)\n'));
    const initIdx = body.indexOf('if (!ta0_inited) {');
    const closeIdx = body.indexOf('    }', initIdx);
    const drawIdx = body.indexOf('u8g2_MenuDrawTextArea_bind', initIdx);
    expect(closeIdx).toBeGreaterThan(initIdx);
    expect(drawIdx).toBeGreaterThan(closeIdx);
    // 括号平衡
    const opens = (body.match(/\{/g) || []).length;
    const closes = (body.match(/\}/g) || []).length;
    expect(opens).toBe(closes);
    expect(warnings).toEqual([]);
  });
});
