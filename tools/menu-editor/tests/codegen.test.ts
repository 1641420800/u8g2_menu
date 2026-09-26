import { describe, it, expect } from 'vitest';
import { generateCode, extractUserBlocks, toCIdent, cstr, isCIdentifier } from '../src/codegen';
import { createProject, createVariable, createChartBuffer, createPage } from '../src/model';
import type { Project, Bind } from '../src/types';
import { parseProject, serializeProject } from '../src/schema';

/** 快捷构造一个文本条目 */
function textItem(id: string, text: string, bind: Bind = { type: 'none' }, displayVarId: string | null = null) {
  return { id, kind: 'text' as const, label: '', text, scale: 1 as const, displayVarId, bind };
}

describe('codegen', () => {
  it('为默认示例工程生成页面函数/变量/原型声明', () => {
    const proj = createProject();
    const { c, warnings } = generateCode(proj);
    expect(c).toContain('void page_0(void)');
    expect(c).toContain('void page_2(void)');
    expect(c).toContain('u8g2_MenuUTF8Printf("u8g2_menu");');
    // 文本条目 + 子页面附加值 → menu_enter；按钮附加值 → button
    expect(c).toContain('u8g2_MenuItem_menu_enter(page_1);');
    expect(c).toContain('u8g2_MenuItem_button(btn_about_cb, 1);');
    // 数值附加值：绑定在显示之前
    expect(c).toMatch(/u8g2_MenuItemValue_int32\(&var_value, 1, 0, 100\);[\s\S]*?u8g2_MenuUTF8Printf\("音量:%d", var_value\);/);
    // 开关附加值
    expect(c).toContain('u8g2_MenuItemValue_switch(&var_switch, 1);');
    expect(c).toContain('var_switch ? "on" : "off"');
    // 变量定义
    expect(c).toMatch(/int32_t var_value = 50;/);
    expect(c).toMatch(/uint8_t var_switch = 0;/);
    expect(c).toMatch(/int32_t var_slider = 50;/);
    // 回调骨架 + USER CODE
    expect(c).toContain('void btn_about_cb(u8g2_menu_t *menu, uint8_t ID)');
    expect(c).toContain('/* USER CODE BEGIN cb_btn_about_cb */');
    // 单文件：页面原型前置声明 + main.c extern 速查注释
    expect(c).toMatch(/void page_0\(void\);[\s\S]*void page_0\(void\)/);
    expect(c).toContain(' *   extern int32_t var_value;');
    expect(warnings).toEqual([]);
  });

  it('返回附加值生成 menu_back', () => {
    const proj = createProject();
    const { c } = generateCode(proj);
    expect(c).toMatch(/u8g2_MenuItem_menu_back\(\);[\s\S]*?u8g2_MenuUTF8Printf\("返回"\);/);
  });

  it('滑块条 + 数值附加值使用 Slider_bind', () => {
    const proj = createProject();
    const { c } = generateCode(proj);
    expect(c).toContain('u8g2_MenuDrawItemSlider_bind(&var_slider, 2, 0, 100);');
  });

  it('滑块条无附加值生成静态位置显示', () => {
    const proj = createProject();
    const pg = createPage('静态滑条');
    pg.items = [{ id: 's1', kind: 'slider', label: '', position: 30, bind: { type: 'none' } }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('u8g2_MenuDrawItemSlider(0.30f);');
  });

  it('浮点变量用 float 字面量，附加值按 varId 绑定', () => {
    const proj = createProject();
    const v = createVariable({
      name: 'var_f', type: 'float', initialValue: 12.5, min: 0, max: 100, step: 0.1,
    });
    proj.variables.push(v);
    const pg = createPage('浮点');
    pg.items = [{
      id: 'x1', kind: 'text', label: '', text: 'f:%.1f', scale: 1, displayVarId: null,
      bind: { type: 'value', varId: v.id },
    }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('float var_f = 12.5f;');
    expect(c).toContain('u8g2_MenuItemValue_float(&var_f, 0.1f, 0.0f, 100.0f);');
  });

  it('只显示条目（无附加值 + 显示变量）不生成绑定调用', () => {
    const proj = createProject();
    const pg = createPage('只读');
    const v = proj.variables[0];
    pg.items = [textItem('x1', '状态:%d', { type: 'none' }, v.id)];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('u8g2_MenuUTF8Printf("状态:%d", var_value);');
    const pgBody = c.slice(c.indexOf('void page_3'), c.indexOf('}', c.indexOf('void page_3')));
    expect(pgBody).not.toContain('u8g2_MenuItemValue_');
  });

  it('滑块附加值绑定浮点变量给出警告并按静态显示生成', () => {
    const proj = createProject();
    const v = createVariable({ name: 'var_f', type: 'float' });
    proj.variables.push(v);
    const pg = createPage('滑块');
    pg.items = [{ id: 's1', kind: 'slider', label: '', position: 50, bind: { type: 'value', varId: v.id } }];
    proj.pages.push(pg);
    const { c, warnings } = generateCode(proj);
    expect(warnings.some((w) => w.includes('须为整型'))).toBe(true);
    expect(c).toContain('u8g2_MenuDrawItemSlider(0.50f);');
  });

  it('XBM 条目生成数组与绘制调用', () => {
    const proj = createProject();
    const pg = createPage('位图');
    pg.items = [{
      id: 'x1', kind: 'xbm', label: '', name: 'icon', w: 8, h: 2, bits: [0xff, 0x81], bind: { type: 'none' },
    }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('static const uint8_t menu_xbm_icon[2] = { 0xff, 0x81 };');
    expect(c).toContain('u8g2_MenuDrawItemXBMP(8, 2, menu_xbm_icon);');
  });

  it('图表：单数据源生成缓冲区定义 + init + 绘制', () => {
    const proj = createProject();
    proj.pages = proj.pages.slice(0, 2); // 去掉演示图表页，隔离编号
    const pg = createPage('图表');
    pg.items = [{
      id: 'c1', kind: 'chart', label: '', height: 32, bind: { type: 'none' },
      sources: [{ bufferId: proj.chartBuffers[0].id, chartKind: 'line' }],
    }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('#define BUF_DEMO_LEN 32');
    expect(c).toContain('static float buf_demo[BUF_DEMO_LEN];');
    expect(c).toContain('u8g2_chart_init(&chart0, buf_demo, chart0_dis, BUF_DEMO_LEN);');
    expect(c).toContain('u8g2_MenuDrawItemLineChart(&chart0, 32, 0, 0);');
    expect(c).toContain('static void buf_demo_fill(void)');
    expect(c).toContain('if (!buf_demo_filled) { buf_demo_filled = 1; buf_demo_fill(); }');
  });

  it('图表：多数据源叠加生成 drawChart 数组 + MenuDrawItemChart', () => {
    const proj = createProject();
    proj.pages = proj.pages.slice(0, 2);
    const b2 = createChartBuffer({ name: 'buf_humi', dataLen: 24, sample: 'noise' });
    proj.chartBuffers.push(b2);
    const pg = createPage('叠加');
    pg.items = [{
      id: 'c1', kind: 'chart', label: '', height: 40, bind: { type: 'none' },
      sources: [
        { bufferId: proj.chartBuffers[0].id, chartKind: 'line' },
        { bufferId: b2.id, chartKind: 'point', min: 0, max: 50 },
      ],
    }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('static u8g2_menu_drawChart_t chart_layers_0[2];');
    expect(c).toContain('chart_layers_0[0].drawChart = u8g2_drawLineChart;');
    expect(c).toContain('chart_layers_0[1].drawChart = u8g2_drawPointChart;');
    expect(c).toContain('chart_layers_0[1].max = 50.0f;');
    expect(c).toContain('u8g2_MenuDrawItemChart(chart_layers_0, 2, 40);');
  });

  it('多个图表条目共用同一缓冲区', () => {
    const proj = createProject();
    proj.pages = proj.pages.slice(0, 2);
    const pg = createPage('共用');
    pg.items = [
      { id: 'c1', kind: 'chart', label: '', height: 30, bind: { type: 'none' }, sources: [{ bufferId: proj.chartBuffers[0].id, chartKind: 'line' }] },
      { id: 'c2', kind: 'chart', label: '', height: 30, bind: { type: 'none' }, sources: [{ bufferId: proj.chartBuffers[0].id, chartKind: 'bar' }] },
    ];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c.match(/static float buf_demo\[BUF_DEMO_LEN\];/g)?.length).toBe(1);
    expect(c).toContain('u8g2_chart_init(&chart0, buf_demo, chart0_dis, BUF_DEMO_LEN);');
    expect(c).toContain('u8g2_chart_init(&chart1, buf_demo, chart1_dis, BUF_DEMO_LEN);');
  });

  it('再次生成时 USER CODE 区内容被保留', () => {
    const proj = createProject();
    const first = generateCode(proj);
    const modified = first.c.replace(
      '/* USER CODE BEGIN cb_btn_about_cb */',
      '/* USER CODE BEGIN cb_btn_about_cb */\n    // 用户手写代码\n    OLED_LOG("about");',
    );
    const second = generateCode(proj, { c: modified });
    expect(second.c).toContain('OLED_LOG("about");');
    expect(second.c).toContain('/* USER CODE END cb_btn_about_cb */');
  });

  it('用户手写的缓冲区填充会替换默认示例数据', () => {
    const proj = createProject();
    proj.pages = proj.pages.slice(0, 2);
    const pg = createPage('图表');
    pg.items = [{
      id: 'c1', kind: 'chart', label: '', height: 20, bind: { type: 'none' },
      sources: [{ bufferId: proj.chartBuffers[0].id, chartKind: 'bar' }],
    }];
    proj.pages.push(pg);
    const first = generateCode(proj);
    const modified = first.c.replace(
      '/* USER CODE BEGIN fill_buf_demo */',
      '/* USER CODE BEGIN fill_buf_demo */\n    for (int i = 0; i < BUF_DEMO_LEN; i++) buf_demo[i] = adc[i];',
    );
    const second = generateCode(proj, { c: modified });
    expect(second.c).toContain('adc[i];');
    expect(second.c).not.toContain('(i * 37) % BUF_DEMO_LEN');
  });

  it('子页面附加值未指定目标给出警告', () => {
    const proj = createProject();
    (proj.pages[0].items[1].bind as { targetPageId: string | null }).targetPageId = null;
    const { warnings } = generateCode(proj);
    expect(warnings.length).toBe(1);
    expect(warnings[0]).toContain('目标页面无效');
  });

  it('勾选弱函数生成骨架（含返回值语义注释）', () => {
    const proj = createProject();
    proj.weakHooks = ['u8g2_menuValueChange_weak', 'menuEventKey_weak'];
    const { c } = generateCode(proj);
    expect(c).toContain('/* ==================== 弱定义函数重写 ==================== */');
    expect(c).toContain('void u8g2_menuValueChange_weak(void *p)');
    expect(c).toContain('/* USER CODE BEGIN weak_u8g2_menuValueChange_weak */');
    expect(c).toContain('(void)p;');
    expect(c).toContain('uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)');
    expect(c).toContain('return 0;');
    expect(c).not.toContain('u8g2_menuItemEnter_weak(u8g2_menu_t');
  });

  it('取消勾选后手写弱函数内容以 #if 0 保留', () => {
    const proj = createProject();
    proj.weakHooks = ['u8g2_menuValueChange_weak'];
    const first = generateCode(proj);
    const modified = first.c.replace(
      '/* USER CODE BEGIN weak_u8g2_menuValueChange_weak */',
      '/* USER CODE BEGIN weak_u8g2_menuValueChange_weak */\n    set_volume_from_menu();',
    );
    proj.weakHooks = [];
    const second = generateCode(proj, { c: modified });
    expect(second.c).toContain('#if 0');
    expect(second.c).toContain('set_volume_from_menu();');
    expect(second.c).not.toContain('/* 数值变化（推荐）:');
    proj.weakHooks = ['u8g2_menuValueChange_weak'];
    const third = generateCode(proj, { c: second.c });
    expect(third.c).toContain('/* 数值变化（推荐）:');
    expect(third.c).toContain('set_volume_from_menu();');
  });

  it('变量名为 C 关键字时自动改名并警告', () => {
    const proj = createProject();
    const v = createVariable({ name: 'switch', type: 'int', initialValue: 1, min: 0, max: 9, step: 1 });
    proj.variables.push(v);
    const pg = createPage('关键字');
    pg.items = [textItem('k1', 'k:%d', { type: 'value', varId: v.id })];
    proj.pages.push(pg);
    const { c, warnings } = generateCode(proj);
    expect(c).toContain('int switch_ = 1;');
    expect(c).toContain('u8g2_MenuItemValue_int(&switch_, 1, 0, 9);');
    expect(c).toContain('u8g2_MenuUTF8Printf("k:%d", switch_);');
    expect(warnings.some((w) => w.includes('C 关键字') && w.includes('switch_'))).toBe(true);
  });

  it('页面函数名非法时回退 page_N 并警告', () => {
    const proj = createProject();
    proj.pages[0].fnName = '9bad name';
    const { c, warnings } = generateCode(proj);
    expect(warnings.some((w) => w.includes('不是合法的 C 标识符') && w.includes('page_0'))).toBe(true);
    expect(c).toContain('void page_0(void)');
  });

  it('页面函数名重复时自动去重并警告，跳转引用跟随改名', () => {
    const proj = createProject();
    proj.pages[0].fnName = 'same';
    proj.pages[1].fnName = 'same';
    const { c, warnings } = generateCode(proj);
    expect(c).toContain('void same(void)');
    expect(c).toContain('void same_2(void)');
    // 主页的子页面条目跳到 pages[1]，应引用去重后的名字
    expect(c).toContain('u8g2_MenuItem_menu_enter(same_2);');
    expect(warnings.some((w) => w.includes('与其他生成符号冲突'))).toBe(true);
  });

  it('回调名与页面函数重名时回调自动改名', () => {
    const proj = createProject();
    proj.pages[2].fnName = 'btn_about_cb';
    const { c, warnings } = generateCode(proj);
    expect(c).toContain('void btn_about_cb(void)');
    expect(c).toContain('void btn_about_cb_2(u8g2_menu_t *menu, uint8_t ID)');
    expect(c).toContain('u8g2_MenuItem_button(btn_about_cb_2, 1);');
    expect(warnings.some((w) => w.includes('btn_about_cb_2'))).toBe(true);
  });

  it('旧版 chart<N>_fill 手写内容按序迁移到缓冲区填充区', () => {
    const proj = createProject();
    proj.pages = proj.pages.slice(0, 2);
    const pg = createPage('图表');
    pg.items = [{
      id: 'c1', kind: 'chart', label: '', height: 20, bind: { type: 'none' },
      sources: [{ bufferId: proj.chartBuffers[0].id, chartKind: 'line' }],
    }];
    proj.pages.push(pg);
    const legacyC = [
      'static void chart0_fill(void)',
      '{',
      '/* USER CODE BEGIN chart0_fill */',
      '    for (uint16_t i = 0; i < BUF_DEMO_LEN; ++i) { buf_demo[i] = sensor[i]; }',
      '/* USER CODE END chart0_fill */',
      '}',
    ].join('\n');
    const { c, warnings } = generateCode(proj, { c: legacyC });
    expect(c).toContain('buf_demo[i] = sensor[i];');
    expect(c).toContain('/* USER CODE BEGIN fill_buf_demo */');
    expect(c).not.toContain('% BUF_DEMO_LEN'); // 示例填充被手写内容替换
    expect(warnings.some((w) => w.includes('chart0_fill') && w.includes('fill_buf_demo'))).toBe(true);
  });

  it('现场取模时名为 menu_font 的变量自动避让字体数组', () => {
    const proj = createProject();
    proj.variables.push(createVariable({ name: 'menu_font', type: 'uint8', initialValue: 0, min: 0, max: 255, step: 1 }));
    const fake = new Uint8Array(64).fill(0x11);
    const { c, warnings } = generateCode(proj, undefined, fake);
    expect(c).toContain('uint8_t menu_font_2 = 0;');
    expect(c).toContain('const uint8_t menu_font[64]');
    expect(warnings.some((w) => w.includes('menu_font_2'))).toBe(true);
  });
});

describe('helpers', () => {
  it('toCIdent 清洗非法字符', () => {
    expect(toCIdent('my var!')).toBe('my_var_');
    expect(toCIdent('2abc')).toBe('_2abc');
    expect(toCIdent('')).toBe('_');
  });
  it('isCIdentifier 拒绝关键字与非法形式', () => {
    expect(isCIdentifier('ok_name')).toBe(true);
    expect(isCIdentifier('switch')).toBe(false);
    expect(isCIdentifier('2x')).toBe(false);
    expect(isCIdentifier('a-b')).toBe(false);
  });
  it('cstr 转义引号与换行', () => {
    expect(cstr('a"b')).toBe('a\\"b');
    expect(cstr('a\\nb')).toBe('a\\\\nb');
    expect(cstr('a\\\\b')).toBe('a\\\\\\\\b');
  });
  it('extractUserBlocks 提取成对标记', () => {
    const text = 'x\n/* USER CODE BEGIN foo */\nAAA\n/* USER CODE END foo */\ny';
    const map = extractUserBlocks(text);
    expect(map.get('foo')).toContain('AAA');
  });
});

describe('schema roundtrip & migration', () => {
  it('序列化-解析后结构一致', () => {
    const proj: Project = createProject();
    const back = parseProject(serializeProject(proj));
    expect(back.pages.length).toBe(proj.pages.length);
    expect(back.pages[0].items[1].bind.type).toBe('submenu');
    expect((back.pages[0].items[1].bind as { targetPageId: string | null }).targetPageId)
      .toBe(proj.pages[1].id);
    expect(back.variables.map((v) => v.name)).toEqual(['var_value', 'var_switch', 'var_slider']);
  });

  it('旧版工程（绘制与附加值未分离）自动迁移', () => {
    const legacy = {
      version: 1,
      name: '旧工程',
      pages: [{
        id: 'p0', name: '主页', fnName: '', userCodePre: '',
        items: [
          { id: 'i0', kind: 'number', label: '', text: 'v:%d', scale: 1, varName: 'vol', varType: 'uint16', step: 5, min: 10, max: 200, initialValue: 66 },
          { id: 'i1', kind: 'switch', label: '', text: 's:%s', scale: 1, varName: 'flag', openValue: 1, onText: 'on', offText: 'off', initialValue: 1 },
          { id: 'i2', kind: 'slider', label: '', varName: 'pos', step: 3, min: 0, max: 90, initialValue: 45 },
          { id: 'i3', kind: 'button', label: '', text: '关于', scale: 1, cbName: 'btn_x', buttonId: 2 },
          { id: 'i4', kind: 'submenu', label: '', text: '下级', scale: 1, targetPageId: null },
          { id: 'i5', kind: 'back', label: '', text: '返回', scale: 1 },
        ],
      }],
    };
    const proj = parseProject(legacy);
    // 类型全部迁移为绘制类型
    expect(proj.pages[0].items.map((i) => i.kind))
      .toEqual(['text', 'text', 'slider', 'text', 'text', 'text']);
    // 附加值正确分离
    const [n, sw, sl, btn, sm, bk] = proj.pages[0].items;
    expect(n.bind).toEqual({ type: 'value', varId: proj.variables[0].id });
    expect(sw.bind).toEqual({
      type: 'switch', varId: proj.variables[1].id, openValue: 1, onText: 'on', offText: 'off',
    });
    expect(sl.bind).toEqual({ type: 'value', varId: proj.variables[2].id });
    expect(btn.bind).toEqual({ type: 'button', cbName: 'btn_x', buttonId: 2 });
    expect(sm.bind).toEqual({ type: 'submenu', targetPageId: null });
    expect(bk.bind).toEqual({ type: 'back' });
    // 迁移后生成的绑定参数来自变量
    const { c } = generateCode(proj);
    expect(c).toMatch(/uint16_t vol = 66;/);
    expect(c).toContain('u8g2_MenuItemValue_uint16(&vol, 5, 10, 200);');
    expect(c).toContain('u8g2_MenuDrawItemSlider_bind(&pos, 3, 0, 90);');
  });
});
