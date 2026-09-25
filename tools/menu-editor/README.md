# u8g2-menu-editor

[u8g2_menu](../../../) 的可视化菜单编辑器：**编辑结构 → 真库实时预览 → 一键生成 C 代码**。

像 Chart.js 一样集成：零框架依赖的纯 TypeScript 库，两个 `<script>` 标签即可嵌入任何项目，也提供 ESM/CJS 包供打包器使用。

```
┌──────────┬───────────────────────┬──────────────┐
│ 页面/条目 │   128×64 真库预览      │ 样式 / 属性   │
│ 树形编辑  │   （WASM 执行 u8g2 +   │ 面板         │
│          │    u8g2_menu 本体）    │              │
└──────────┴───────────────────────┴──────────────┘
```

## 特性

- **条目类型全覆盖**：文本(含 printf 格式/二倍大)、数值编辑(uint8..double)、开关、按钮回调、子页面、返回上级、滑块条、进度条、折线/散点/柱状图表、XBM 位图（内置像素编辑器）、多行文本区、自绘板占位
- **弱定义函数勾选**：11 个库弱函数（光标进出、数值增减/变化、改键、按键拦截、自定义按键等）按需勾选，每项带新手向用途说明；生成对应函数骨架，取消勾选自动恢复库默认（手写内容以 `#if 0` 保留）
- **像素级预览**：预览引擎由 Emscripten 把本仓库的 `u8g2_menu` 与 `u8g2` 源码编译为 WASM。编辑器的声明式条目表经 C shim 调用与生成代码**完全相同的库函数路径**——预览即真机行为，含选择器样式、跑马灯、动画、滚动条
- **一键生成 C 代码**：`menu_pages.c/.h`，CubeMX 风格 `USER CODE BEGIN/END` 保留区，再次生成不覆盖手写回调；图表填充、自绘板、按钮回调均生成骨架
- **工程文件**：带版本的 JSON，导入/导出/localStorage 自动保存；撤销/重做

## 集成方式

### 方式一：script 标签（无构建链）

```html
<link> <!-- 不需要，样式自动注入 -->
<script src="u8g2-menu-editor.iife.js"></script>
<div id="editor" style="height: 640px"></div>
<script>
  const editor = new U8G2MenuEditor.MenuEditor(document.getElementById('editor'), {
    wasmUrl: 'prebuilt/u8g2-menu-preview.js',  // 预览引擎（.js+.wasm 需同目录）
    persistKey: 'my-app',                       // localStorage 自动保存键
    onChange: (data) => {},                     // 模型变化
    onExport: ({ c, h, warnings }) => {},       // 生成代码
  });
  // editor.getData() / loadData(json) / generate() / downloadC() / destroy()
</script>
```

### 方式二：npm + 打包器

```js
import { MenuEditor } from 'u8g2-menu-editor';
const editor = new MenuEditor(el, { wasmUrl: 'prebuilt/u8g2-menu-preview.js' });
```

## 数据模型

```jsonc
{
  "version": 1,
  "width": 128, "height": 64,
  "font": "u8g2_font_wqy12_t_gb2312",
  "selector": "rotundity",            // default | rotundity | square
  "marqueeSpeed": 0.2, "marqueeHeaderLen": 5,
  "weakHooks": ["u8g2_menuValueChange_weak"],
  "pages": [
    {
      "name": "主页", "fnName": "",
      "items": [
        { "kind": "submenu", "text": "系统设置", "targetPageId": "…" },
        { "kind": "number", "text": "音量:%d", "varType": "int32",
          "varName": "vol", "step": 2, "min": 0, "max": 100, "initialValue": 50 },
        { "kind": "switch", "text": "开关:%s", "onText": "on", "offText": "off", … }
      ],
      "userCodePre": ""
    }
  ]
}
```

## 生成代码约定

- 每个页面 → `void page_N(void)`（或自定义 `fnName`）；每个条目 → 一行绘制调用，绑定调用（`u8g2_MenuItemValue_*`）在其正上方，与库的附加值协议一致
- 变量：首个引用处定类型，去重后 `extern` 到 `.h`
- 保留区标记：`variables` / `includes` / `callbacks` / `cb_<回调名>` / `weak_<弱函数名>` / `page_<fn>_pre` / `chart<N>_fill`
- 图表：`static` 数据 + init-once，默认示例数据可用 `chart<N>_fill` 区替换（替换后不再生成示例填充）
- 弱函数：勾选的函数生成同名强定义（替换 `u8g2_menu_weak.c` 默认实现）；取消勾选后其 USER CODE 内容以 `#if 0` 形式保留，重新勾选即恢复

## 预览引擎

```
tools/menu-editor/wasm/
├── editor_shim.c     # 条目表 → 真实库 API 调用
├── extract-fonts.mjs # 从内置 u8g2_fonts.c 提取 12 款字体（ASCII ×8 + 文泉驿中文 ×4）
└── build.sh          # 本机 emcc 优先，否则 docker emscripten/emsdk
```

重建（库源码或 shim 变更后）：

```bash
bash tools/menu-editor/wasm/build.sh   # 产物写入 tools/menu-editor/prebuilt/
```

GitHub Actions（`.github/workflows/build-wasm.yml`）会在 `src/u8g2_menu*.c/h` 变化时自动重建并提交。

## 已知限制

- 预览分辨率固定 128×64（WASM 内置 ssd1306 驱动）；工程分辨率可改，仅影响生成代码注释
- 自绘板（board）与图表真实数据需在 USER CODE 区手写，预览中显示占位框/示例数据
- 文本区预览内容上限 256 字节

## 开发

```bash
cd tools/menu-editor
npm install
npm test        # vitest
npm run build   # ESM/CJS + IIFE → dist/
npm run demo    # 打开 demo/（端口 5183）
```
