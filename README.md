# U8g2_Menu 库 API 手册与使用指南

> 版本: 2.0.0  
> 基于 U8g2 图形库的嵌入式菜单系统  
> 适用硬件: 128x64 OLED (SSD1306) / 任何 U8g2 支持的显示屏  
> 作者: Yxg  
> 仓库: https://github.com/1641420800/u8g2_menu

---

## 目录

1. [概述](#1-概述)
2. [快速开始](#2-快速开始)
3. [核心数据结构](#3-核心数据结构)
4. [菜单生命周期 API](#4-菜单生命周期-api)
5. [菜单项绘制 API](#5-菜单项绘制-api)
6. [变量绑定 API (ItemValue)](#6-变量绑定-api-itemvalue)
7. [菜单导航与选中 API](#7-菜单导航与选中-api)
8. [选择器 (Selector) API](#8-选择器-selector-api)
9. [按键处理 API](#9-按键处理-api)
10. [消息框 API](#10-消息框-api)
11. [图表 (Chart) API](#11-图表-chart-api)
12. [滑块条 & 进度条 API](#12-滑块条--进度条-api)
13. [图片 (XBM) 绘制 API](#13-图片-xbm-绘制-api)
14. [自定义画板 API](#14-自定义画板-api)
15. [记录 (Record) API](#15-记录-record-api)
16. [事件系统 API](#16-事件系统-api)
17. [动画 & 效果 API](#17-动画--效果-api)
18. [弱定义回调函数 (可重写)](#18-弱定义回调函数-可重写)
19. [宏定义 & 配置参数](#19-宏定义--配置参数)
20. [完整示例速查](#20-完整示例速查)

---

## 1. 概述

**u8g2_menu** 是一个基于 [U8g2](https://github.com/olikraus/u8g2) 构建的嵌入式菜单库，提供以下核心能力：

- **多类型菜单项**：文本（UTF-8，含超长文本自动滚动）、数值调整（int/float/switch）、按钮回调、图表、图片、自定义画板
- **交互操作**：Up/Down/Enter/Return 按键导航，数值增减，快捷字符跳转
- **动画效果**：菜单项切换平滑过渡，选中项缩放动画
- **消息框**：弹出文本或图片消息，支持自动超时关闭
- **记录功能**：自动记录菜单绘制内容到缓冲区，便于调试/日志
- **灵活选择器**：内置方形/圆形选择器，支持完全自定义
- **事件系统**：事件驱动的消息队列架构
- **图层支持**：支持多层绘制与叠加

### 依赖关系

**u8g2_menu** 依赖于 [官方 U8g2 C 语言库](https://github.com/olikraus/u8g2)，是官方 U8g2 C 语言库的一个功能组件，不可独立使用。

使用本库前需要：
1. 已集成 `u8g2.h` / `u8x8.h` 等官方 U8g2 头文件
2. 已实现 U8g2 的底层硬件初始化（IIC/SPI 等）
3. 项目中包含 `u8g2.c` / `u8x8.c` 等官方源文件进行编译

本库的所有绘制、显示输出最终均通过官方 U8g2 API 完成。

### 性能说明

| 项目 | 说明 |
|------|------|
| **已测试平台** | STM32（F103 等）、ESP32 |
| **已测试显示屏** | OLED（SSD1306 等）、MAX7219 |
| **兼容性** | U8g2 能正常运行的所有平台和显示屏，本库均可无缝衔接，无需修改任何代码 |
| **单屏菜单项数** | STM32 约 1000 项、ESP32 约 5000 项（该数据下有轻微卡顿，但不影响正常使用） |

> **图表性能优化**：`u8g2_chart_addData()` 接口内部包含数据拷贝和极值计算，效率较低。  
> 需要高效显示时，建议**手动操作数据数组**：直接向 `chart->data` 缓冲区写入新数据即可（菜单绘制图表时会自动调用 `u8g2_chart_update()` 同步显示缓冲，无需手动调用）。  
> 此外，**显示缓冲（`data_dis`）在资源受限的情况下可以共用**——多个图表实例指向同一个显示缓冲数组，以节省 RAM。

### 文件结构

| 源文件 | 功能模块 |
|--------|---------|
| `u8g2_menu.h` | 主头文件，所有API声明与配置宏 |
| `u8g2_menu.c` | 核心菜单逻辑 |
| `u8g2_meun_effect.c` | 动画效果 |
| `u8g2_meun_event.c` | 事件系统 |
| `u8g2_meun_itemValue.c` | 变量绑定/附加值 |
| `u8g2_meun_keys.c` | 按键扫描 |
| `u8g2_meun_layer.c` | 图层系统 |
| `u8g2_meun_message.c` | 消息框 |
| `u8g2_meun_selector.c` | 选择器 |
| `u8g2_meun_drawBoard.c` | 自定义画板 |
| `u8g2_meun_drawChart.c` | 图表绘制 |
| `u8g2_meun_drawPic.c` | 图片绘制 |
| `u8g2_meun_drawStr.c` | 字符串绘制 |
| `u8g2_meun_drawValueBar.c` | 滑块/进度条 |
| `u8g2_meun_weak.c` | 弱定义回调（可重写） |

---

## 2. 快速开始

### 2.1 最小化示例

```c
#include "u8g2.h"
#include "u8g2_menu.h"

u8g2_t u8g2;
u8g2_menu_t u8g2_menu;

// 菜单项绘制回调
void menuItem_1() {
    u8g2_MenuUTF8Printf("Hello");
}

void oled_display(u8g2_t *u8g2) {
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

int main(void) {
    delay_init();
    oled_u8g2_init(&u8g2);
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1);

    while(1) {
        u8g2_ClearBuffer(&u8g2);
        oled_display(&u8g2);
        u8g2_SendBuffer(&u8g2);
    }
}
```

### 2.2 标准初始化流程

```
延时初始化 → GPIO初始化 → OLED初始化(U8g2) → 设置字体 → 
创建菜单 → 定时器初始化(1ms按键扫描) → 主循环(清缓冲→绘制→发送)
```

### 2.3 必须实现的接口

| 接口 | 来源 | 说明 |
|------|------|------|
| `u8g2_ClearBuffer()` | 官方 U8g2 原生 API | 清空显存缓冲区，在主循环每次刷新前调用 |
| `u8g2_DrawMenu()` | **本库 API** | 绘制菜单（含消息框/动画），在 ClearBuffer 之后调用 |
| `u8g2_SendBuffer()` | 官方 U8g2 原生 API | 将显存缓冲区数据发送到屏幕，在主循环每次刷新后调用 |
| `u8g2_MenuKeyScannDebounce()` | **本库 API** | 按键扫描（在定时器中断中调用，实现消抖和长按检测） |
| `u8g2_MenuTime_ISR()` | **本库 API** | 时间接口（在定时器中断中调用，消息框超时/动画帧率依赖） |

---

## 3. 核心数据结构

### 3.1 `u8g2_menu_t` - 菜单主结构体

```c
typedef struct u8g2_menu_struct u8g2_menu_t;
```

核心成员（通过 API 函数访问，一般不直接操作）：

| 成员 | 类型 | 说明 |
|------|------|------|
| `u8g2` | `u8g2_t*` | 绑定的 U8g2 实例 |
| `menuItem` | `menuItem_cb` | 当前菜单项绘制回调函数 |
| `menuSelector` | `menuSelector_cb` | 选择器绘制回调函数 |
| `menuEffect` | `u8g2_menu_effect_t` | 动画效果实例 |
| `currentItem` | `u8g2_int_t` | 当前选中项索引 |
| `currentAttribute` | `MENU_Attribute_t` | 当前项属性状态 |
| `leftMarginSelector` | `u8g2_int_t` | 左边距 |
| `topMarginSelector` | `u8g2_int_t` | 顶边距 |
| `lineSpacingSelector` | `u8g2_int_t` | 行间距 |

### 3.2 `MENU_Attribute_t` - 菜单项属性枚举

```c
typedef enum {
    MENU_None = 0,        // 未选中
    MENU_Fix,             // 固定（只读，不可编辑）
    MENU_Writable,        // 可编辑
    MENU_WritableSelect   // 可编辑 + 选中编辑状态
} MENU_Attribute_t;
```

### 3.3 `MENU_V_type_t` - 菜单值类型枚举

```c
typedef enum {
    MENU_V_uint8, MENU_V_uint16, MENU_V_uint32,
    MENU_V_int8,  MENU_V_int16,  MENU_V_int32,
    MENU_V_int,   MENU_V_float,  MENU_V_double,
    MENU_V_switch, MENU_button, MENU_menu,
    MENU_menu_enter, MENU_menu_back, MENU_str, MENU_NC
} MENU_V_type_t;
```

### 3.4 `u8g2_menuKeyValue_t` - 按键类型枚举

本库定义6种默认按键 + 6路自定义按键（实际枚举为1~6分别定义，此处简写）：

```c
typedef enum {
    MENU_Key_None,     // 无按键
    MENU_Key_Up,       // 上
    MENU_Key_Down,     // 下
    MENU_Key_Enter,    // 确认
    MENU_Key_Return,   // 返回
    MENU_Key_Add,      // 加
    MENU_Key_Sub,      // 减
    MENU_Key_USER_1~6, // 自定义按键1~6
    MENU_Key_Num,      // 按键总数
} u8g2_menuKeyValue_t;
```

> **状态映射说明**：6种默认按键中，**Up / Down / Enter** 这3种按键会根据当前菜单项选中状态进行动态映射：
> - **未选中状态**（`MENU_Fix` / `MENU_Writable`）：Up = 上移导航，Down = 下移导航，Enter = 进入选中编辑状态
> - **选中编辑状态**（`MENU_WritableSelect`）：Up **映射为 Add**（附加值增加），Down **映射为 Sub**（附加值减小），Enter = 确认修改并退出选中状态
> - 其余3种默认按键（Return / Add / Sub）以及6路自定义按键（USER_1~USER_6）的行为不受选中状态影响，始终保持原始功能

### 3.5 `u8g2_menu_value_t` - 菜单值联合体

支持类型：`uint8/16/32`、`int8/16/32`、`int`、`float`、`double`、`switch`、`button`、`menu`、`str`

每个类型结构包含：`value`(值指针)、`adjValue`(步长)、`minValue`(最小值)、`maxValue`(最大值)

### 3.6 `u8g2_chart_t` - 图表数据结构

```c
struct u8g2_chart_struct {
    float *data;         // 数据缓冲（实时接收）
    float *data_dis;     // 显示缓冲（用于绘制，防闪烁）
    float data_max;      // 当前数据最大值
    float data_min;      // 当前数据最小值
    uint16_t data_len;   // 数据长度
};
```

### 3.7 `Layer_t` - 图层操作模式

```c
typedef enum {LayerAND, LayerOR, LayerXOR, LayerXNOR} Layer_t;
```

---

## 4. 菜单生命周期 API

### 4.1 创建菜单

```c
// 使用默认选择器
void u8g2_CreateMenu(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_cb menuItem);

// 使用自定义选择器
void u8g2_CreateMenu_Selector(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, 
                               menuItem_cb menuItem, menuSelector_cb menuSelector);
```

| 参数 | 说明 |
|------|------|
| `u8g2` | U8g2图形库实例指针 |
| `u8g2_menu` | 菜单实例指针 |
| `menuItem` | 默认菜单页面的绘制回调函数 |
| `menuSelector` | 自定义选择器回调函数 |

### 4.2 绘制菜单

```c
void u8g2_DrawMenu(u8g2_menu_t *u8g2_menu, u8g2_uint_t x, u8g2_uint_t y, 
                    u8g2_uint_t w, u8g2_uint_t h);
```

| 参数 | 说明 |
|------|------|
| `x, y` | 菜单绘制区域左上角坐标 |
| `w, h` | 菜单绘制区域宽度和高度 |

通常在 `u8g2_ClearBuffer()` 之后、`u8g2_SendBuffer()` 之前调用。

### 4.3 切换菜单项

```c
// 切换表项（触发切换动画）
void u8g2_MenuReplaceItem(u8g2_menu_t *u8g2_menu, menuItem_cb menuItem);

// 获取当前表项
menuItem_cb u8g2_MenuGetItem(u8g2_menu_t *u8g2_menu);
```

### 4.4 菜单位置设置

```c
// 设置菜单项位置（左边距、顶边距、行间距）
void u8g2_MenuSetPosition(u8g2_menu_t *u8g2_menu, u8g2_uint_t leftMarginSelector, 
                           u8g2_uint_t topMarginSelector, u8g2_uint_t lineSpacingSelector);

// 获取菜单项位置
u8g2_int_t u8g2_MenuGetX(u8g2_menu_t *u8g2_menu);
u8g2_int_t u8g2_MenuGetY(u8g2_menu_t *u8g2_menu);
u8g2_int_t u8g2_MenuGetH(u8g2_menu_t *u8g2_menu);
u8g2_int_t u8g2_MenuGetW(u8g2_menu_t *u8g2_menu);
```

> **注意**：`u8g2_MenuSetPosition` 必须在 `GetX/Y/H/W` 之前调用！

### 4.5 菜单项绘制区间

```c
// 菜单项绘制开始（返回当前菜单实例）
u8g2_menu_t *u8g2_MenuDrawItemStart(void);

// 设置菜单项尺寸
void u8g2_MenuDrawItemSetSize(u8g2_menu_t *menu, u8g2_uint_t width, u8g2_uint_t height);

// 菜单项绘制结束
void u8g2_MenuDrawItemEnd(u8g2_menu_t *menu);
```

### 4.6 时间接口

```c
// 菜单时间接口（必须在定时器中断中调用）
void u8g2_MenuTime_ISR(u8g2_menu_t *u8g2_menu, uint16_t ms);
```

| 参数 | 说明 |
|------|------|
| `ms` | 时间增量（毫秒），通常定时器中断周期为1ms则传入1 |

> **必须实现**：此接口影响消息框超时、动画帧率。不实现则相关功能失效。

### 4.7 快捷字符跳转

```c
void u8g2_MenuItemBindChar(char c, uint8_t selected);
```

| 参数 | 说明 |
|------|------|
| `c` | 触发跳转的字符（如 '1', 'A' 等） |
| `selected` | 跳转后是否自动选中（1=是，0=仅定位不选中） |

**使用规则**：
- 必须在菜单项绘制回调中调用
- 与显示函数写在同一行，绑定到该行
- `selected=1` 等价于跳转后延迟1帧模拟按下 Enter 键

---

## 5. 菜单项绘制 API

所有绘制函数必须在菜单项绘制回调（如 `menuItem_1()`）内部调用。

### 5.1 字符串绘制

```c
// 基础ASCII字符串
void u8g2_MenuDrawStr(char *str);
void u8g2_MenuDrawStrX2(char *str);         // 二倍大

// UTF-8字符串（支持中文/特殊字符）
void u8g2_MenuDrawUTF8(char *str);
void u8g2_MenuDrawUTF8X2(char *str);        // 二倍大

// 密码掩码显示
void u8g2_MenuDrawPassword(char *str, char mask);
void u8g2_MenuDrawPasswordX2(char *str, char mask);  // 二倍大
```

### 5.2 格式化输出

```c
// 通用格式化：指定绘制函数 + printf风格参数
void u8g2_MenuPrintf(u8g2_MenuDraw_cb u8g2_MenuDraw, const char *fmt, ...);

// 快捷UTF8格式化（等价于 u8g2_MenuPrintf(u8g2_MenuDrawUTF8, ...)）
void u8g2_MenuUTF8Printf(const char *fmt, ...);
```

**示例**：
```c
u8g2_MenuUTF8Printf("int:%d / float:%.1f / str:%s", 100, 16.5f, "test");
```

### 5.3 超长文本自动滚动

当选中的菜单项字符串宽度超出菜单可视区域时，菜单库自动启用水平滚动。可通过以下API控制滚动行为：

```c
// 获取水平偏移量
u8g2_int_t u8g2_MenuGetHorizontalOffset(u8g2_menu_t *u8g2_menu);

// 设置平移速度（值越大越快）
void u8g2_MenuSetPositionOffsetSpe(u8g2_menu_t *u8g2_menu, float spe);
float u8g2_MenuGetPositionOffsetSpe(u8g2_menu_t *u8g2_menu);

// 设置/获取平移头长度（用于均匀分配每个字符的可视时间）
void u8g2_MenuSetPositionOffsetStrHeaderLen(u8g2_menu_t *u8g2_menu, float strHeaderLen);
float u8g2_MenuGetPositionOffsetStrHeaderLen(u8g2_menu_t *u8g2_menu);
```

> **平移头概念**：虚拟的"平移头"跟随文本滚动，根据字体宽度动态调整延时，保证每个字符可视时间均匀。

---

## 6. 变量绑定 API (ItemValue)

### 6.1 核心规则

1. **绑定API必须写在对应的显示函数上方**，编辑功能绑定到该行
2. 每行仅能绑定一个API（最近的生效）
3. 显示函数是"功能载体"——即使不显示数值，编辑功能依然生效
4. 按下 **Enter** 进入编辑状态，**Up/Down** 调整数值

### 6.2 数值类型绑定

```c
void u8g2_MenuItemValue_uint8 (uint8_t *value, int8_t  adjValue, uint8_t  minValue, uint8_t  maxValue);
void u8g2_MenuItemValue_uint16(uint16_t *value, int16_t adjValue, uint16_t minValue, uint16_t maxValue);
void u8g2_MenuItemValue_uint32(uint32_t *value, int32_t adjValue, uint32_t minValue, uint32_t maxValue);
void u8g2_MenuItemValue_int8  (int8_t *value, int8_t  adjValue, int8_t  minValue, int8_t  maxValue);
void u8g2_MenuItemValue_int16 (int16_t *value, int16_t adjValue, int16_t minValue, int16_t maxValue);
void u8g2_MenuItemValue_int32 (int32_t *value, int32_t adjValue, int32_t minValue, int32_t maxValue);
void u8g2_MenuItemValue_int   (int *value, int adjValue, int minValue, int maxValue);
void u8g2_MenuItemValue_float (float *value, float adjValue, float minValue, float maxValue);
void u8g2_MenuItemValue_double(double *value, double adjValue, double minValue, double maxValue);
void u8g2_MenuItemValue_switch(uint8_t *value, uint8_t openValue);
```

| 参数 | 说明 |
|------|------|
| `value` | 待编辑的变量指针 |
| `adjValue` | 每次按键调整的步长 |
| `minValue` | 变量最小值 |
| `maxValue` | 变量最大值 |

**switch 特殊说明**：`openValue` 为开关"打开"时的取值，按 Enter 切换 0 ↔ openValue。

### 6.3 按钮绑定

```c
void u8g2_MenuItem_button(u8g2_MenuButton_cb but, uint8_t ID);
```

| 参数 | 说明 |
|------|------|
| `but` | 按钮回调函数指针 |
| `ID` | 按钮唯一标识（在回调中区分不同按钮） |

> **行为说明**：`u8g2_MenuItem_button` **仅捕获**发生的按键事件，**不进行拦截**。  
> 例如：按下 Enter（确认键）后，`u8g2_MenuItem_button` 捕获到该事件并调用回调函数，**但菜单仍会继续进入选中状态**（对应 `MENU_WritableSelect`）。  
> 如果不需要进入选中状态，需要在回调函数中自行取消选中：
> ```c
> void u8g2_MenuButton(u8g2_menu_t *u8g2_menu, uint8_t ID, u8g2_menuKeyValue_t key) {
>     // 仅在确认ID对应的是本按钮、且键值为确认键时取消选中
>     if(key == MENU_Key_Enter) {
>         u8g2_MenuItemDeSelect(u8g2_menu);
>         // ... 执行业务逻辑
>     }
> }
> ```

当按下 Enter 时触发回调，回调原型：

```c
void u8g2_MenuButton(u8g2_menu_t *u8g2_menu, uint8_t ID, u8g2_menuKeyValue_t key);
```

### 6.4 子菜单跳转绑定

```c
// 跳转到子菜单（保留返回路径）
void u8g2_MenuItem_menu(menuItem_cb menuItem);

// 跳转到子菜单（保留返回路径，效果同 menu）
void u8g2_MenuItem_menu_enter(menuItem_cb menuItem);

// 返回上一级菜单
void u8g2_MenuItem_menu_back(void);
```

**父子菜单追溯深度**：最大16层（`U8G2_MENU_TRACE_MAX_DEPTH`）。

### 6.5 字符串输入绑定

```c
void u8g2_MenuItem_str(char *str, uint16_t len);
```

| 参数 | 说明 |
|------|------|
| `str` | 输入缓冲区指针 |
| `len` | 缓冲区大小（防止越界） |

**特殊功能键**（在 `u8g2_menu.h` 中定义）：
- `U8G2_MENUKeyValue_Back '*'` : 删除缓冲区最后一个字符
- `U8G2_MENUKeyValue_Clear '#'` : 清空整个缓冲区

字符通过 `u8g2_MenuInChar()` 函数输入。

---

## 7. 菜单导航与选中 API

### 7.1 菜单项移动

```c
// 上移 i 项
void u8g2_MenuItemUpS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);
// 上移 1 项
void u8g2_MenuItemUp(u8g2_menu_t *u8g2_menu);

// 下移 i 项
void u8g2_MenuItemDownS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);
// 下移 1 项
void u8g2_MenuItemDown(u8g2_menu_t *u8g2_menu);

// 直接移动到第 i 项（从0开始）
void u8g2_MenuItemMove(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);
```

### 7.2 子菜单进入/返回

```c
// 进入子菜单（推入调用链）
void u8g2_MenuItemEnter(u8g2_menu_t *u8g2_menu, menuItem_cb menuItem);

// 返回父菜单（弹出调用链）
void u8g2_MenuItemBack(u8g2_menu_t *u8g2_menu);
```

### 7.3 选中/取消选中

```c
// 选中当前项（触发 enter 回调）
void u8g2_MenuItemSelect(u8g2_menu_t *u8g2_menu);
// 取消选中
void u8g2_MenuItemDeSelect(u8g2_menu_t *u8g2_menu);
// 获取选中状态（1=选中，0=未选中，-1=未选择）
u8g2_int_t u8g2_MenuGetItemSelect(u8g2_menu_t *u8g2_menu);
```

### 7.4 附加值增减

```c
// 附加值加 k
void u8g2_MenuItemAddS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k);
// 附加值加 1
void u8g2_MenuItemAdd(u8g2_menu_t *u8g2_menu);
// 附加值减 k
void u8g2_MenuItemSubS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k);
// 附加值减 1
void u8g2_MenuItemSub(u8g2_menu_t *u8g2_menu);
```

### 7.5 状态查询

```c
// 获取当前菜单属性状态
MENU_Attribute_t u8g2_MenuGetAttribute(u8g2_menu_t *u8g2_menu);
// 获取当前选中项索引
u8g2_uint_t u8g2_MenuGetCurrentSelection(u8g2_menu_t *u8g2_menu);
// 获取当前激活的菜单实例
u8g2_menu_t *u8g2_MenuGetCurrentMenu(void);
// 获取菜单绑定的 U8g2 实例
u8g2_t *u8g2_MenuGetU8g2(u8g2_menu_t *u8g2_menu);
```

---

## 8. 选择器 (Selector) API

选择器用于在菜单项旁边绘制选中标识。

### 8.1 内置选择器

```c
// 默认选择器
void u8g2_MenuSelector(u8g2_menu_t *u8g2_menu);
// 圆形选择器
void u8g2_MenuSelectorRotundity(u8g2_menu_t *u8g2_menu);
// 方形选择器
void u8g2_MenuSelectorSquare(u8g2_menu_t *u8g2_menu);
```

### 8.2 自定义选择器

通过 `u8g2_CreateMenu_Selector()` 创建菜单时传入自定义选择器回调。

**编写规范**：
1. 通过 `u8g2_MenuGetU8g2()` 获取 U8g2 实例（**禁止直接使用全局 u8g2**）
2. 先调用 `u8g2_MenuSetPosition()` 设置位置
3. 通过 `GetX/Y/H/W()` 获取菜单项坐标
4. 通过 `u8g2_MenuGetAttribute()` 判断菜单项状态
5. 使用 U8g2 原始 API 绘制标识

```c
// 自定义选择器示例（圆形标识，4种状态）
void u8g2_MenuSelector_User(u8g2_menu_t *u8g2_menu) {
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(u8g2_menu);
    u8g2_MenuSetPosition(u8g2_menu, 16, 0, 0);
    
    u8g2_int_t x = u8g2_MenuGetX(u8g2_menu);
    u8g2_int_t y = u8g2_MenuGetY(u8g2_menu);
    u8g2_int_t h = u8g2_MenuGetH(u8g2_menu);
    
    switch (u8g2_MenuGetAttribute(u8g2_menu)) {
    case MENU_None:         break;                              // 不绘制
    case MENU_Fix:          u8g2_DrawCircle(u8g2, x-10, y+h/2, 5, U8G2_DRAW_ALL); break;  // 空心圆
    case MENU_Writable:     u8g2_DrawCircle(u8g2, x-10, y+h/2, 2, U8G2_DRAW_ALL);        // 双圈
                            u8g2_DrawCircle(u8g2, x-10, y+h/2, 5, U8G2_DRAW_ALL); break;
    case MENU_WritableSelect: u8g2_DrawDisc(u8g2, x-10, y+h/2, 5, U8G2_DRAW_ALL); break;  // 实心圆
    }
}
```

### 8.3 选择器管理

```c
// 切换选择器
void u8g2_MenuReplaceSelector(u8g2_menu_t *u8g2_menu, menuSelector_cb menuSelector);

// 选择器记录（将当前选择器状态存入记录缓冲区）
void u8g2_MenuSelector_Record(u8g2_menu_t *u8g2_menu);

// 调用选择器
void u8g2_MenuSelectorCall(u8g2_menu_t *u8g2_menu);
```

---

## 9. 按键处理 API

### 9.1 按键扫描

```c
// 带消抖的按键扫描（推荐）
void u8g2_MenuKeyScannDebounce(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue,
                                uint8_t key, uint16_t time);

// 不带消抖的按键扫描
void u8g2_MenuKeyScann(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue,
                        uint8_t key, uint16_t time);
```

| 参数 | 说明 |
|------|------|
| `u8g2_menuKeyValue` | 按键类型（`MENU_Key_Up/Down/Enter/...`） |
| `key` | 硬件按键电平（1=按下，0=未按；需根据电路取反） |
| `time` | 扫描时间间隔（ms） |

### 9.2 字符输入

```c
// 输入字符到菜单（用于字符串输入或快捷字符跳转）
void u8g2_MenuInChar(u8g2_menu_t *u8g2_menu, char c);
```

### 9.3 按键处理

```c
// 菜单按键处理（内部调用，通常不需要直接调用）
void u8g2_MenuKeys(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue);
```

### 9.4 消抖参数配置（宏）

```c
#define MenuKey_holdTime       800   // 长按触发时间(ms)
#define MenuKey_repeatTime     200   // 长按重复触发间隔(ms)
#define MenuKey_debouncePeriod 20    // 消抖稳定检测周期(ms)
#define MenuKey_triggerHigh    18    // 触发高电平阈值
#define MenuKey_triggerLow     2     // 释放低电平阈值
```

---

## 10. 消息框 API

### 10.1 启用配置

```c
#define U8G2_MENU_MESSAGEBOX     1              // 启用消息框
#define U8G2_MENU_INFINITE_TIMEOUT UINT32_MAX   // 无限显示
```

### 10.2 显示消息框

```c
// 通用消息框 API
void u8g2_MenuDrawMessageBox(u8g2_menu_t *u8g2_menu, 
    u8g2_MenuDrawMessageBox_cb drawMessageBox, void *message,
    u8g2_uint_t messageBoxWidth, u8g2_uint_t messageBoxHeight,
    uint32_t drawMessageBoxTimer);

// 字符串消息框（快捷方式）
void u8g2_MenuDrawMessageBox_str(u8g2_menu_t *u8g2_menu, 
    const char *str, uint32_t drawMessageBoxTimer);

// XBM图片消息框（快捷方式）
void u8g2_MenuDrawMessageBox_xbm(u8g2_menu_t *u8g2_menu,
    u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap,
    uint32_t drawMessageBoxTimer);
```

| 参数 | 说明 |
|------|------|
| `drawMessageBoxTimer` | 超时时间(ms)，`U8G2_MENU_INFINITE_TIMEOUT`=永不关闭 |
| `message` | 自定义消息内容（由自定义绘制函数解析） |

### 10.3 关闭消息框

```c
void u8g2_MenuDrawMessageBoxClose(u8g2_menu_t *u8g2_menu);
```

### 10.4 消息框时间接口

```c
void u8g2_MenuMessageBoxTime_ISR(u8g2_menu_t *u8g2_menu, uint16_t ms);
```

### 10.5 消息框处理

```c
void u8g2_menuMessageBoxCall(u8g2_menu_t *u8g2_menu);
```

> **注意**：消息框超时依赖 `u8g2_MenuTime_ISR` 接口，必须在定时器中断中调用。

---

## 11. 图表 (Chart) API

### 11.1 图表初始化与数据管理

```c
// 图表初始化（关联双缓冲 + 数据长度）
void u8g2_chart_init(u8g2_chart_t *chart, float *data, float *data_dis, uint16_t data_len);

// 添加数据（自动处理缓冲循环）
void u8g2_chart_addData(u8g2_chart_t *chart, float d);

// 更新显示缓冲（同步数据缓冲到显示缓冲）
void u8g2_chart_update(u8g2_chart_t *chart);

// 手动设置数据范围
void u8g2_chart_setRange(u8g2_chart_t *chart, float max, float min);

// 自动计算数据范围
void u8g2_chart_autoRange(u8g2_chart_t *chart);
```

**双缓冲设计**：
- `data`：数据缓冲，实时接收新数据，不受显示帧率影响
- `data_dis`：显示缓冲，同步数据缓冲内容，防止数据刷新过快导致显示闪烁

### 11.2 图表绘制（底层）

```c
// 折线图
void u8g2_drawLineChart(u8g2_t *u8g2, u8g2_chart_t *chart, 
    u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h);

// 散点图
void u8g2_drawPointChart(u8g2_t *u8g2, u8g2_chart_t *chart,
    u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h);

// 柱状图
void u8g2_drawBarChart(u8g2_t *u8g2, u8g2_chart_t *chart,
    u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h);
```

### 11.3 图表菜单项绘制

```c
// 折线图项（h=图表高度，max/min=0时自动计算）
void u8g2_MenuDrawItemLineChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min);

// 散点图项
void u8g2_MenuDrawItemPointChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min);

// 柱状图项
void u8g2_MenuDrawItemBarChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min);

// 组合图表项（绘制多个图表叠加）
void u8g2_MenuDrawItemChart(u8g2_menu_drawChart_t *chart, const size_t chartSize, u8g2_uint_t h);
```

**组合图表示例**：
```c
u8g2_menu_drawChart_t drawChart[] = {
    {u8g2_drawPointChart, &chart_1, 0, 0},
    {u8g2_drawLineChart, &chart_2, 0, 0},
};
u8g2_MenuDrawItemChart(drawChart, sizeof(drawChart)/sizeof(drawChart[0]), 60);
```

### 11.4 相关配置宏

```c
#define U8G2_MENU_MIN_VALUE_DIFF    0.0f    // 图表幅值最小值
#define U8G2_MENU_CHART_SPACE_RATIO 1.1f    // 图表上下留空比例
```

---

## 12. 滑块条 & 进度条 API

### 12.1 滑块条 (Slider Bar)

```c
// 普通滑块条（位置归一化到 0~1）
void u8g2_MenuDrawItemSlider(float position);

// 自定义比例滑块条（position=0~1，proportion=滑块尺寸占比）
void u8g2_MenuDrawItemSliderProportion(float position, float proportion);

// 绑定数值的滑块条（无需归一化，支持 Up/Down 调整）
void u8g2_MenuDrawItemSlider_bind(int *value, int adjValue, int minValue, int maxValue);
```

### 12.2 进度条 (Progress Bar)

```c
// 普通进度条（位置归一化到 0~1）
void u8g2_MenuDrawItemProgressBar(float position);

// 绑定数值的进度条（无需归一化，支持 Up/Down 调整）
void u8g2_MenuDrawItemProgressBar_bind(int *value, int adjValue, int minValue, int maxValue);
```

### 12.3 底层绘制函数

```c
// 水平滑块条
void u8g2_DrawHSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, 
    u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion);

// 垂直滑块条
void u8g2_DrawVSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y,
    u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion);

// 水平进度条
void u8g2_DrawHProgressBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y,
    u8g2_uint_t w, u8g2_uint_t h, float schedule);
```

---

## 13. 图片 (XBM) 绘制 API

```c
// 绘制 XBM 位图（位图数据随固件存储在Flash）
void u8g2_MenuDrawItemXBM(u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap);

// 绘制 XBMP 位图（位图数据存储在外部存储器如SD卡/SPI Flash）
void u8g2_MenuDrawItemXBMP(u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap);
```

| 参数 | 说明 |
|------|------|
| `w, h` | 位图宽度/高度（XBM位图，每个字节=8像素） |
| `bitmap` | 位图数据数组指针 |

- 当 X 坐标超出屏幕宽度（如128）时自动横向滚动
- **不支持竖向滚动**

---

## 14. 自定义画板 API

```c
void u8g2_MenuDrawItemBoard(u8g2_MenuDrawBoard_cb u8g2_MenuDrawBoard, 
    u8g2_uint_t width, u8g2_uint_t height);
```

| 参数 | 说明 |
|------|------|
| `u8g2_MenuDrawBoard` | 自定义绘制回调函数 |
| `width, height` | 画板尺寸（不能超过屏幕尺寸） |

**回调函数编写规范**：
1. 仅能使用 U8g2 原始 API（如 `u8g2_DrawLine`, `u8g2_DrawTriangle` 等）
2. 仅能使用参数传入的 `u8g2` 实例（不能使用全局 `u8g2`）

```c
// 示例：自定义画板
void oled_displayBoard(u8g2_t *u8g2) {
    u8g2_DrawLine(u8g2, 10, 3, 5, 32);
    u8g2_DrawTriangle(u8g2, 20, 5, 27, 50, 5, 32);
    u8g2_SetFont(u8g2, u8g2_font_unifont_t_symbols);
    u8g2_DrawUTF8(u8g2, 5, 20, "Snowman: ☃");
}
```

---

## 15. 记录 (Record) API

### 15.1 启用配置

```c
#define U8G2_MENU_RECORD      1           // 启用记录功能
#define U8G2_MENU_RECORD_SIZE 256         // 记录缓冲区大小（字节）
```

### 15.2 API 函数

```c
// 清除记录缓冲区
void u8g2_MenuRecordClear(u8g2_menu_t *u8g2_menu);

// 向记录缓冲区添加字符串
void u8g2_MenuRecordAdd(u8g2_menu_t *u8g2_menu, const char *text);

// 获取记录缓冲区内容（返回字符串指针）
const char* u8g2_MenuRecord(u8g2_menu_t *u8g2_menu);
```

> **注意**：启用记录功能后，菜单绘制内容会自动写入记录缓冲区。可通过 u8g2_MenuRecord() 获取缓冲区字符串（如通过串口输出）。

---

## 16. 事件系统 API

### 16.1 事件数据结构

```c
#define U8G2_MENU_EVENT_Capacity 30  // 事件队列最大容量

struct u8g2_menu_event_item_struct {
    uint8_t nextLoopRequired : 1;  // 下次循环处理
    void* value;                   // 事件值
    menuEventHandle_cb menuEventHandle;  // 事件处理回调
};

struct u8g2_menu_event_struct {
    uint8_t lock;
    size_t quantity;
    size_t itemsWrite;
    size_t itemsRead;
    struct u8g2_menu_event_item_struct items[U8G2_MENU_EVENT_Capacity];
};
```

### 16.2 API 函数

```c
// 添加一个事件到队列
uint8_t u8g2_MenuEventRecord(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem);

// 处理事件队列中的事件
void u8g2_MenuEventProcess(u8g2_menu_t *u8g2_menu);

// 获取当前事件暂存数
size_t u8g2_MenuEvent_getQuantity(u8g2_menu_t *u8g2_menu);
```

---

## 17. 动画 & 效果 API

### 17.1 效果结构体

```c
struct u8g2_menu_effect_struct {
    u8g2_int_t (*u8g2_menuEffect_init)(u8g2_menu_t *u8g2_menu);  // 初始化回调
    u8g2_int_t (*u8g2_menuEffect_run)(u8g2_menu_t *u8g2_menu);   // 运行回调
    u8g2_int_t _position;     // 当前实时位置
    float _rowHeight;         // 当前实时行高比例
};
```

### 17.2 API 函数

```c
// 绑定菜单效果实例
void u8g2_MenuEffectBind(u8g2_menu_t *u8g2_menu, u8g2_menu_effect_t *u8g2_menu_effect);

// 获取效果当前位置
u8g2_int_t u8g2_MenuEffectGetPos(u8g2_menu_t *u8g2_menu);

// 获取效果当前行高
float u8g2_MenuEffectGetRowHeight(u8g2_menu_t *u8g2_menu);

// 调用效果初始化回调
u8g2_int_t u8g2_menuEffect_init_call(u8g2_menu_t *u8g2_menu);

// 调用效果运行回调
u8g2_int_t u8g2_menuEffect_run_call(u8g2_menu_t *u8g2_menu);
```

### 17.3 动画配置宏

```c
#define U8G2_MENU_DELAY        100    // 动画帧间隔(ms)
#define ROW_HEIGHT_INCREMENT   0.2f   // 选中行高度增量
#define MAX_ROW_HEIGHT         1.0f   // 选中行最大高度
#define SPE_ADJUSTMENT         2.0f   // 滚动速度调节量
```

### 17.4 图层系统

```c
// 获取图层缓存缓冲区指针
uint8_t *u8g2_MenuGetLayerBuff(void);

// 开始菜单图层绘制（返回新的 u8g2 实例用于图层绘制）
u8g2_t *u8g2_MenuStartLayer(u8g2_t *u8g2);

// 结束图层绘制并与主层合并显示
void u8g2_MenuEndLayer(Layer_t layer);
```

图层合并模式：`LayerAND`（与）、`LayerOR`（或）、`LayerXOR`（异或）、`LayerXNOR`（同或）

---

## 18. 弱定义回调函数 (可重写)

以下函数以 `__weak` 修饰定义在 `u8g2_meun_weak.c` 中，用户在应用程序中定义同名函数即可覆盖。

### 18.1 菜单项事件

```c
// 选中某项时调用
void u8g2_menuItemEnter_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item);
// 离开某项时调用
void u8g2_menuItemLeave_weak(u8g2_menu_t *u8g2_menu, u8g2_uint_t item);
```

### 18.2 数值变化事件

```c
// 值增加
void u8g2_menuValueAdd_weak(void *p);
// 值减小
void u8g2_menuValueSub_weak(void *p);
// 值变化（增或减均会调用）
void u8g2_menuValueChange_weak(void *p);
```

`p` 为变化值的地址，需强制类型转换为对应类型使用。

### 18.3 按键/字符事件

```c
// 按键输入（可修改按键映射）
void u8g2_menuKeyEvent_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue);
// 字符输入（可过滤字符）
void u8g2_menuCharEvent_weak(u8g2_menu_t *u8g2_menu, char *c);
```

### 18.4 事件过滤器

```c
// 事件过滤器（返回1=拦截事件，0=放行）
uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem);
// 用户按键按下
void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue);
// 任意按键按下
uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue);
// 按键预处理
void menuEventKeyPre_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue);
```

---

## 19. 宏定义 & 配置参数

### 19.1 版本与调试

```c
#define U8G2_MENU_VERSION   "2.0.0"    // 版本信息
#define U8G2_MENU_DEBUG     0          // 设置为1启用调试模式
```

### 19.2 按键功能键

```c
#define U8G2_MENUKeyValue_Back    '*'  // 删除一个字符
#define U8G2_MENUKeyValue_Clear   '#'  // 清除整个输入
```

### 19.3 动画参数

```c
#define U8G2_MENU_DELAY        100    // 动画帧间隔(ms)
#define ROW_HEIGHT_INCREMENT   0.2f   // 选中行高度增量
#define MAX_ROW_HEIGHT         1.0f   // 选中行最大高度
#define SPE_ADJUSTMENT         2.0f   // 滚动速度调节量
```

### 19.4 按键消抖参数

```c
#define MenuKey_holdTime       800    // 长按触发时间(ms)
#define MenuKey_repeatTime     200    // 长按重复触发间隔(ms)
#define MenuKey_debouncePeriod 20     // 消抖稳定检测周期(ms)
#define MenuKey_triggerHigh    18     // 触发高电平阈值
#define MenuKey_triggerLow     2      // 释放低电平阈值
```

### 19.5 追踪与记录

```c
#define U8G2_MENU_TRACE_MAX_DEPTH  16     // 菜单父子项最大追溯长度
#define U8G2_MENU_RECORD           1      // 启用记录功能
#define U8G2_MENU_RECORD_SIZE      256    // 记录缓冲区大小
```

### 19.6 消息框

```c
#define U8G2_MENU_MESSAGEBOX          1              // 启用消息框
#define U8G2_MENU_INFINITE_TIMEOUT    UINT32_MAX     // 无限显示
```

### 19.7 事件系统

```c
#define U8G2_MENU_EVENT_Capacity  30    // 事件队列最大容量
```

### 19.8 图表

```c
#define U8G2_MENU_MIN_VALUE_DIFF     0.0f    // 图表幅值最小值
#define U8G2_MENU_CHART_SPACE_RATIO  1.1f    // 图表上下留空比例
```

### 19.9 辅助宏

```c
#define ABS(s)        ((s) < 0 ? -(s) : (s))
#define map(v,min1,max1,min2,max2)  (((v)-(min1))*((max2)-(min2))/((max1)-(min1))+(min2))
#define limit(d,min,max) ((d)<(min)?(min):(d)>(max)?(max):(d))
#define LEN(s)        (sizeof(s)/sizeof(s[0]))
#define nonNegative(d) ((d) < 0 ? 0 : (d))
```

---

## 20. 完整示例速查

仓库提供12个由浅入深的示例，位于 `example/` 目录：

| 示例 | 路径 | 核心演示内容 |
|------|------|-------------|
| **示例1** | `1.menu_demo_create` | 最小化菜单创建 + 一行 Hello 显示 |
| **示例2** | `2.menu_demo_string` | 字符串绘制全功能：Str/UTF8/格式化/密码 |
| **示例3** | `3.menu_demo_variable` | 变量编辑：uint32/float/switch + 按键消抖 |
| **示例4** | `4.menu_demo_nav` | 多菜单跳转：menu/menu_enter/menu_back |
| **示例5** | `5.menu_demo_attach` | 按钮回调 + 字符串输入 + 自定义按键 |
| **示例6** | `6.menu_demo_record` | 菜单记录功能 + 串口输出 |
| **示例7** | `7.menu_demo_image` | XBM位图显示 + 超长位图横向滚动 |
| **示例8** | `8.menu_demo_msgbox` | 字符串弹窗/图片弹窗/弹窗关闭 |
| **示例9** | `9.menu_demo_chart` | 折线图/散点图/柱状图 + 双缓冲 + 大数据滚动 |
| **示例10** | `10.menu_demo_widgets` | 自定义画板 + 滑块条/进度条 + 绑定值调整 |
| **示例11** | `11.menu_demo_custom` | 自定义选择器(圆形) + 动态菜单项数量(0~10000) |
| **示例12** | `12.menu_demo_advanced` | 快捷字符跳转 + 弱定义回调重写 + 所有控制API解析 |

### 各示例 main.c 标准结构

```c
// 所有12个示例都遵循同一结构：
int main(void) {
    // 1. 硬件初始化
    delay_init();
    gpio_init();  // 可选（需要按键时）
    
    // 2. OLED + U8g2 初始化
    oled_u8g2_init(&u8g2);
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);
    
    // 3. 菜单创建
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1);
    
    // 4. 定时器初始化（1ms中断，用于按键扫描）
    tim2_init(1000-1, 72-1);  // 72MHz → 1ms
    
    // 5. 主循环
    while(1) {
        u8g2_ClearBuffer(&u8g2);
        u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
        u8g2_SendBuffer(&u8g2);
    }
}
```

### 定时器中断标准结构

```c
void tim2_IRQ(void) {
    keyScann(1);                          // 按键扫描（所有需要按键的示例）
    u8g2_MenuTime_ISR(&u8g2_menu, 1);    // 菜单时间接口（消息框/动画依赖）
}
```

### 按键扫描标准结构

```c
void keyScann(uint16_t time) {
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up,    !KEY_1, time);
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down,  !KEY_2, time);
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}
```

---

> **更多信息**：请查阅仓库源代码和示例获取最新内容。  
> **许可证**：详见仓库 `LICENSE` 文件。
