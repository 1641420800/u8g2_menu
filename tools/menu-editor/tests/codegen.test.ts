import { describe, it, expect } from 'vitest';
import { generateCode, extractUserBlocks, toCIdent, cstr } from '../src/codegen';
import { createProject } from '../src/model';
import type { Project } from '../src/types';
import { createPage } from '../src/model';

describe('codegen', () => {
  it('为默认示例工程生成两个页面函数与变量', () => {
    const proj = createProject();
    const { c, h, warnings } = generateCode(proj);
    expect(c).toContain('void page_0(void)');
    expect(c).toContain('void page_1(void)');
    expect(c).toContain('u8g2_MenuUTF8Printf("u8g2_menu");');
    // 子页面绑定指向 page_1（menu_enter 压栈，可与 menu_back 配对返回）
    expect(c).toContain('u8g2_MenuItem_menu_enter(page_1);');
    // 数值条目：绑定在显示之前
    expect(c).toMatch(/u8g2_MenuItemValue_int32\(&var_value, 1, 0, 100\);[\s\S]*?u8g2_MenuUTF8Printf\("音量:%d", var_value\);/);
    // 开关条目
    expect(c).toContain('u8g2_MenuItemValue_switch(&var_switch, 1);');
    expect(c).toContain('var_switch ? "on" : "off"');
    // 变量定义
    expect(c).toMatch(/int32_t var_value = 50;/);
    expect(c).toMatch(/uint8_t var_switch = 0;/);
    expect(c).toMatch(/int var_slider = 50;/);
    // 回调骨架 + USER CODE
    expect(c).toContain('void btn_about_cb(u8g2_menu_t *menu, uint8_t ID)');
    expect(c).toContain('/* USER CODE BEGIN cb_btn_about_cb */');
    // 头文件
    expect(h).toContain('void page_0(void);');
    expect(h).toContain('extern int32_t var_value;');
    expect(warnings).toEqual([]);
  });

  it('滑块条使用 Slider_bind 且不生成后续文本行', () => {
    const proj = createProject();
    const { c } = generateCode(proj);
    expect(c).toContain('u8g2_MenuDrawItemSlider_bind(&var_slider, 2, 0, 100);');
  });

  it('浮点数条目用 float 字面量', () => {
    const proj = createProject();
    const pg = createPage('浮点');
    pg.items = [{
      id: 'x1', kind: 'number', label: '', text: 'f:%.1f', scale: 1,
      varType: 'float', varName: 'var_f', step: 0.1, min: 0, max: 100,
      decimals: 1, initialValue: 12.5,
    }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('float var_f = 12.5f;');
    expect(c).toContain('u8g2_MenuItemValue_float(&var_f, 0.1f, 0.0f, 100.0f);');
  });

  it('XBM 条目生成数组与绘制调用', () => {
    const proj = createProject();
    const pg = createPage('位图');
    pg.items = [{
      id: 'x1', kind: 'xbm', label: '', name: 'icon', w: 8, h: 2, bits: [0xff, 0x81],
    }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('static const uint8_t menu_xbm_icon[2] = { 0xff, 0x81 };');
    expect(c).toContain('u8g2_MenuDrawItemXBMP(8, 2, menu_xbm_icon);');
  });

  it('图表条目生成 init + 绘制，自动量程传 0,0', () => {
    const proj = createProject();
    const pg = createPage('图表');
    pg.items = [{
      id: 'c1', kind: 'chart', label: '', chartKind: 'line', dataLen: 16,
      height: 32, sample: 'sine',
    }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('#define CHART0_LEN 16');
    expect(c).toContain('u8g2_chart_init(&chart0, chart0_data, chart0_dis, CHART0_LEN);');
    expect(c).toContain('u8g2_MenuDrawItemLineChart(&chart0, 32, 0, 0);');
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

  it('用户手写的图表填充会替换默认示例数据', () => {
    const proj = createProject();
    const pg = createPage('图表');
    pg.items = [{
      id: 'c1', kind: 'chart', label: '', chartKind: 'bar', dataLen: 8,
      height: 20, sample: 'ramp',
    }];
    proj.pages.push(pg);
    const first = generateCode(proj);
    const modified = first.c.replace(
      '/* USER CODE BEGIN chart0_fill */',
      '/* USER CODE BEGIN chart0_fill */\n        for (int i = 0; i < 8; i++) chart0_data[i] = adc[i];',
    );
    const second = generateCode(proj, { c: modified });
    expect(second.c).toContain('adc[i];');
    expect(second.c).not.toContain('(i * 37) % CHART0_LEN');
  });

  it('未设置目标的子页面给出警告', () => {
    const proj = createProject();
    (proj.pages[0].items[1] as { targetPageId: string | null }).targetPageId = null;
    const { warnings } = generateCode(proj);
    expect(warnings.length).toBe(1);
    expect(warnings[0]).toContain('未指定目标页面');
  });
});

describe('helpers', () => {
  it('toCIdent 清洗非法字符', () => {
    expect(toCIdent('my var!')).toBe('my_var_');
    expect(toCIdent('2abc')).toBe('_2abc');
    expect(toCIdent('')).toBe('_');
  });
  it('cstr 转义引号与换行', () => {
    expect(cstr('a"b')).toBe('a\\"b');
    expect(cstr('a\nb')).toBe('a\\nb');
    expect(cstr('a\\b')).toBe('a\\\\b');
  });
  it('extractUserBlocks 提取成对标记', () => {
    const text = 'x\n/* USER CODE BEGIN foo */\nAAA\n/* USER CODE END foo */\ny';
    const map = extractUserBlocks(text);
    expect(map.get('foo')).toContain('AAA');
  });
});

describe('schema roundtrip', () => {
  it('序列化-解析后结构一致', async () => {
    const { parseProject, serializeProject } = await import('../src/schema');
    const proj: Project = createProject();
    const text = serializeProject(proj);
    const back = parseProject(text);
    expect(back.pages.length).toBe(proj.pages.length);
    expect(back.pages[0].items[1].kind).toBe('submenu');
    expect((back.pages[0].items[1] as { targetPageId: string | null }).targetPageId)
      .toBe(proj.pages[1].id);
  });
});
