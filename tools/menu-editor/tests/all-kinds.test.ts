import { describe, it, expect } from 'vitest';
import { generateCode } from '../src/codegen';
import { createProject, createVariable, createChartBuffer, createItem, createPage } from '../src/model';
import type { Project, Item } from '../src/types';
import * as fs from 'node:fs';

/**
 * 全类型编译冒烟：构造覆盖所有绘制类型 / 附加值 / 边界命名的工程，
 * 生成 C 写入 scripts/all-kinds/menu_pages.c，随后由 scripts/compile-all-kinds.sh
 * 用 Emscripten 真编译（CI/本地均可）。
 */
describe('全类型生成冒烟', () => {
  it('覆盖所有条目/附加值/边界命名并写出 C 文件', () => {
    const proj: Project = createProject();
    proj.pages = [];
    proj.weakHooks = [
      'u8g2_menuValueChange_weak', 'menuEventKey_weak', 'menuEventUserHandle_weak',
    ];

    // 变量：含关键字名 / 冲突名 / 各类型
    proj.variables = [
      createVariable({ name: 'register', type: 'uint8', initialValue: 1, min: 0, max: 2, step: 1 }),
      createVariable({ name: 'var_int', type: 'int16', initialValue: -5, min: -100, max: 100, step: 5 }),
      createVariable({ name: 'var_f', type: 'float', initialValue: 1.5, min: 0, max: 10, step: 0.5 }),
      createVariable({ name: 'page_0', type: 'int32', initialValue: 0, min: 0, max: 9, step: 1 }), // 与页面函数撞名
      createVariable({ name: 'var_only_display', type: 'int32', initialValue: 42, min: 0, max: 99, step: 1 }),
      createVariable({ name: 'var_pos', type: 'int', initialValue: 30, min: 0, max: 100, step: 5 }),
    ];
    // 缓冲区：与变量撞名 + 关键字
    proj.chartBuffers = [
      createChartBuffer({ name: 'buf_a', dataLen: 16, sample: 'sine' }),
      createChartBuffer({ name: 'buf_b', dataLen: 12, sample: 'ramp' }),
      createChartBuffer({ name: 'var_int', dataLen: 8, sample: 'none' }), // 与变量撞名
    ];

    const pMain = createPage('主页');
    pMain.fnName = 'page_main'; // 自定义函数名
    const mainItems: Item[] = [
      { ...createItem('text'), text: 'TEXT %d', displayVarId: proj.variables[4].id, bind: { type: 'none' } } as Item,
      { ...createItem('text'), text: '数值:%d', bind: { type: 'value', varId: proj.variables[2].id } } as Item,
      { ...createItem('text'), text: '开关:%s', bind: { type: 'switch', varId: proj.variables[0].id, openValue: 1, onText: 'ON', offText: 'OFF' } } as Item,
      { ...createItem('text'), text: '进入', bind: { type: 'submenu', targetPageId: null } } as Item, // 后补 pSet
      { ...createItem('text'), text: '按钮', bind: { type: 'button', cbName: 'register', buttonId: 3 } } as Item, // 关键字回调名
      { ...createItem('slider'), position: 25, bind: { type: 'value', varId: proj.variables[5].id } } as Item,
      { ...createItem('progress'), position: 60, bind: { type: 'none' } } as Item,
      { ...createItem('chart'), height: 20, bind: { type: 'none' },
        sources: [{ bufferId: proj.chartBuffers[0].id, chartKind: 'line' }] } as Item,
      { ...createItem('chart'), height: 18, bind: { type: 'none' },
        sources: [
          { bufferId: proj.chartBuffers[0].id, chartKind: 'point', min: 0, max: 100 },
          { bufferId: proj.chartBuffers[1].id, chartKind: 'bar' },
        ] } as Item,
      { ...createItem('xbm'), w: 8, h: 8, bits: new Array(8).fill(0xaa), name: 'icon_x', bind: { type: 'none' } } as Item,
      { ...createItem('textarea'), content: '多行文本\n第二行', height: 24, bindScroll: false, lineSpacing: 1, bind: { type: 'none' } } as Item,
      { ...createItem('board'), w: 32, h: 16, cbName: 'struct', bind: { type: 'none' } } as Item, // 关键字回调名
    ];
    pMain.items = mainItems;
    const pSet = createPage('设置');
    pSet.fnName = ''; // 自动命名 page_1
    pSet.items = [
      { ...createItem('text'), text: '设置页', bind: { type: 'none' } } as Item,
      { ...createItem('text'), text: '返回', bind: { type: 'back' } } as Item,
      { ...createItem('slider'), position: 50, bind: { type: 'value', varId: proj.variables[3].id } } as Item, // 撞名变量
    ];
    (pMain.items[3].bind as { targetPageId: string | null }).targetPageId = pSet.id;
    proj.pages.push(pMain, pSet);

    const { c, warnings } = generateCode(proj);
    fs.mkdirSync('scripts/all-kinds', { recursive: true });
    fs.writeFileSync('scripts/all-kinds/menu_pages.c', c);
    // 结构断言
    expect(c).toContain('u8g2_MenuItem_button(register__2, 3);');
    expect(c).toContain('void register__2(u8g2_menu_t *menu, uint8_t ID, u8g2_menuKeyValue_t key)');
    expect(c).toContain('void struct_(u8g2_t *u8g2)');
    expect(c).toContain('u8g2_MenuItem_menu_enter(page_1);');
    expect(c).toContain('u8g2_MenuDrawTextArea(&ta0, 24);');
    expect(c).toContain('u8g2_MenuDrawItemChart(chart_layers_0, 2, 18);');
    expect(c).toContain('u8g2_MenuDrawItemSlider_bind(&var_pos, 5, 0, 100);');
    expect(warnings.some((w) => w.includes('关键字'))).toBe(true);
    expect(warnings.some((w) => w.includes('%d') && w.includes('%f'))).toBe(true); // 数值:%d 配 float 变量

    fs.mkdirSync('scripts/all-kinds', { recursive: true });
    fs.writeFileSync('scripts/all-kinds/menu_pages.c', c);
  });
});
