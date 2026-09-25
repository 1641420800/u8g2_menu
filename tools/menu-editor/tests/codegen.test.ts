import { describe, it, expect } from 'vitest';
import { generateCode, extractUserBlocks, toCIdent, cstr } from '../src/codegen';
import { createProject, createVariable, createPage } from '../src/model';
import type { Project } from '../src/types';
import { parseProject, serializeProject } from '../src/schema';

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
    expect(c).toMatch(/int32_t var_slider = 50;/);
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

  it('浮点变量用 float 字面量，条目按 varId 绑定', () => {
    const proj = createProject();
    const v = createVariable({
      name: 'var_f', type: 'float', initialValue: 12.5, min: 0, max: 100, step: 0.1,
    });
    proj.variables.push(v);
    const pg = createPage('浮点');
    pg.items = [{ id: 'x1', kind: 'number', label: '', text: 'f:%.1f', scale: 1, varId: v.id, editable: true }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('float var_f = 12.5f;');
    expect(c).toContain('u8g2_MenuItemValue_float(&var_f, 0.1f, 0.0f, 100.0f);');
  });

  it('只显示条目（editable=false）不生成绑定调用', () => {
    const proj = createProject();
    const pg = createPage('只读');
    const v = proj.variables[0];
    pg.items = [{ id: 'x1', kind: 'number', label: '', text: '状态:%d', scale: 1, varId: v.id, editable: false }];
    proj.pages.push(pg);
    const { c } = generateCode(proj);
    expect(c).toContain('u8g2_MenuUTF8Printf("状态:%d", var_value);');
    // 不应在此条目上生成绑定（页面内无其它 number 绑定调用此变量）
    const pgBody = c.slice(c.indexOf('void page_2'), c.indexOf('}', c.indexOf('void page_2')));
    expect(pgBody).not.toContain('u8g2_MenuItemValue_');
  });

  it('滑块绑定浮点变量给出警告并跳过', () => {
    const proj = createProject();
    const v = createVariable({ name: 'var_f', type: 'float' });
    proj.variables.push(v);
    const pg = createPage('滑块');
    pg.items = [{ id: 'x1', kind: 'slider', label: '', varId: v.id }];
    proj.pages.push(pg);
    const { c, warnings } = generateCode(proj);
    expect(warnings.some((w) => w.includes('须为整型'))).toBe(true);
    expect(c).not.toContain('u8g2_MenuDrawItemSlider_bind(&var_f');
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
    // 未勾选的函数不应生成
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
    // 取消勾选后重新生成
    proj.weakHooks = [];
    const second = generateCode(proj, { c: modified });
    expect(second.c).toContain('#if 0');
    expect(second.c).toContain('set_volume_from_menu();');
    // 激活态定义（带标签注释）不再生成，仅剩 #if 0 保留块
    expect(second.c).not.toContain('/* 数值变化（推荐）:');
    // 重新勾选后恢复编译，且手写内容仍在
    proj.weakHooks = ['u8g2_menuValueChange_weak'];
    const third = generateCode(proj, { c: second.c });
    expect(third.c).toContain('/* 数值变化（推荐）:');
    expect(third.c).toContain('set_volume_from_menu();');
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
  it('序列化-解析后结构一致', () => {
    const proj: Project = createProject();
    const text = serializeProject(proj);
    const back = parseProject(text);
    expect(back.pages.length).toBe(proj.pages.length);
    expect(back.pages[0].items[1].kind).toBe('submenu');
    expect((back.pages[0].items[1] as { targetPageId: string | null }).targetPageId)
      .toBe(proj.pages[1].id);
    expect(back.variables.map((v) => v.name)).toEqual(['var_value', 'var_switch', 'var_slider']);
  });

  it('旧版工程（条目自带 varName）自动迁移为变量池', () => {
    const legacy = {
      version: 1,
      name: '旧工程',
      pages: [{
        id: 'p0', name: '主页', fnName: '',
        userCodePre: '',
        items: [
          { id: 'i0', kind: 'number', label: '', text: 'v:%d', scale: 1, varName: 'vol', varType: 'uint16', step: 5, min: 10, max: 200, initialValue: 66 },
          { id: 'i1', kind: 'switch', label: '', text: 's:%s', scale: 1, varName: 'flag', openValue: 1, onText: 'on', offText: 'off', initialValue: 1 },
          { id: 'i2', kind: 'slider', label: '', varName: 'pos', step: 3, min: 0, max: 90, initialValue: 45 },
        ],
      }],
    };
    const proj = parseProject(legacy);
    // 变量池生成三个变量，条目改用 varId 引用
    expect(proj.variables.map((v) => v.name)).toEqual(['vol', 'flag', 'pos']);
    const [n, s, sl] = proj.pages[0].items as { varId?: string; varName?: string }[];
    expect(n.varId).toBe(proj.variables[0].id);
    expect(s.varId).toBe(proj.variables[1].id);
    expect(sl.varId).toBe(proj.variables[2].id);
    expect(n.varName).toBeUndefined();
    // 迁移后绑定参数来自变量
    const { c } = generateCode(proj);
    expect(c).toMatch(/uint16_t vol = 66;/);
    expect(c).toContain('u8g2_MenuItemValue_uint16(&vol, 5, 10, 200);');
    expect(c).toContain('u8g2_MenuDrawItemSlider_bind(&pos, 3, 0, 90);');
  });
});
