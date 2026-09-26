/** 模型层纯函数测试：回调函数资源收集 */
import { describe, it, expect } from 'vitest';
import { collectCallbacks } from '../src/model';
import { createProject, createPage } from '../src/model';
import type { Bind } from '../src/types';

describe('collectCallbacks', () => {
  it('默认工程收集到按钮回调（含引用定位信息）', () => {
    const proj = createProject();
    const cbs = collectCallbacks(proj);
    expect(cbs.length).toBe(1);
    expect(cbs[0].name).toBe('btn_about_cb');
    expect(cbs[0].asButton).toBe(true);
    expect(cbs[0].asBoard).toBe(false);
    expect(cbs[0].refs.length).toBe(1);
    expect(cbs[0].refs[0].pageName).toBe('主页');
    expect(cbs[0].refs[0].label).toBe('关于');
  });

  it('画板回调与按钮回调按名字聚合，同名合并且标记双类型', () => {
    const proj = createProject();
    const bind: Bind = { type: 'button', cbName: 'shared_cb', buttonId: 1 };
    const pg = createPage('混合');
    pg.items = [
      { id: 'b1', kind: 'board', label: '', w: 64, h: 32, cbName: 'shared_cb', bind: { type: 'none' } },
      { id: 't1', kind: 'text', label: '', text: '动作', scale: 1, displayVarId: null, bind },
      { id: 'b2', kind: 'board', label: '', w: 32, h: 16, cbName: 'other_cb', bind: { type: 'none' } },
    ];
    proj.pages.push(pg);
    const cbs = collectCallbacks(proj);
    const shared = cbs.find((c) => c.name === 'shared_cb')!;
    expect(shared.asButton).toBe(true);
    expect(shared.asBoard).toBe(true);
    expect(shared.refs.length).toBe(2); // 画板 + 按钮
    expect(cbs.find((c) => c.name === 'other_cb')!.asBoard).toBe(true);
    expect(cbs.find((c) => c.name === 'btn_about_cb')).toBeTruthy();
    // 按名字排序稳定
    const names = cbs.map((c) => c.name);
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names);
  });

  it('条目显示名回退顺序：label > 文本 > 类型标签', () => {
    const proj = createProject();
    proj.pages = [createPage('独立')];
    proj.pages[0].items = [{
      id: 'b1', kind: 'board', label: '', w: 64, h: 32, cbName: 'board_cb', bind: { type: 'none' },
    }];
    const cbs = collectCallbacks(proj);
    expect(cbs[0].refs[0].label).toBe('自绘板'); // KIND_LABELS 回退
  });
});
