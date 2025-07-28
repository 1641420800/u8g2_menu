# u8g2_menu

基于U8G2库的菜单程序，提供简洁易用的菜单管理和渲染功能，支持文本显示、数值调整、动画效果及交互操作。


## 功能特点

- **多类型菜单项**：支持文本（含长文本自动滚动）、数值调整（整数/浮点数/开关）、按钮、图表、图片等。
- **交互操作**：通过按键实现菜单导航（上下选择）、数值调整（增减）、确认/返回等操作。
- **动画效果**：菜单项切换时的平滑过渡动画，提升用户体验。
- **消息框功能**：支持显示文本或图片消息，并可设置自动关闭时间。
- **记录功能**：可记录菜单绘制内容，便于调试或日志输出。
- **灵活配置**：支持自定义菜单位置、选择器样式、动画参数等。


## 快速开始

### 1. 初始化菜单

```c
#include "u8g2.h"
#include "u8g2_menu.h"

u8g2_t u8g2;
u8g2_menu_t u8g2_menu;

// 定义菜单内容回调函数
void main_menu() {
    // 在这里添加菜单项
}

int main() {
    // 初始化U8G2
    oled_u8g2_init(&u8g2);
    
    // 创建菜单（使用默认选择器）
    u8g2_CreateMenu(&u8g2, &u8g2_menu, main_menu);
    
    // 设置字体
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);
    
    while (1) {
        u8g2_ClearBuffer(&u8g2);
        u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64); // 绘制菜单
        u8g2_SendBuffer(&u8g2);
    }
}
```


### 2. 常用菜单项示例

#### 文本显示

```c
void text_menu() {
    // 普通文本
    u8g2_MenuDrawUTF8("System Status");
    
    // 格式化文本
    u8g2_MenuUTF8Printf("Battery: %d%%", 75);
    
    // 长文本（自动滚动）
    u8g2_MenuDrawUTF8("This is a long text that will scroll automatically when it exceeds the screen width");
}
```

#### 数值调整

```c
// 定义全局变量
static uint8_t volume = 50;         // 音量（0-100）
static float temperature = 23.5f;   // 温度（10.0-30.0℃）
static uint16_t timer = 60;         // 定时器（10-300秒）
static uint8_t wifi_enabled = 1;    // WiFi开关（0=关，1=开）

void value_menu() {
    // 调整音量（uint8_t类型，步长5）
    u8g2_MenuItemValue_uint8(&volume, 5, 0, 100);
    u8g2_MenuUTF8Printf("Volume: %d%%", volume);
    
    // 调整温度（float类型，步长0.5）
    u8g2_MenuItemValue_float(&temperature, 0.5f, 10.0f, 30.0f);
    u8g2_MenuUTF8Printf("Temp: %.1fC", temperature);
    
    // 调整定时器（uint16_t类型，步长10）
    u8g2_MenuItemValue_uint16(&timer, 10, 10, 300);
    u8g2_MenuUTF8Printf("Timer: %ds", timer);
    
    // 开关切换（WiFi）
    u8g2_MenuItemValue_switch(&wifi_enabled, 1);
    u8g2_MenuUTF8Printf("WiFi: %s", wifi_enabled ? "On" : "Off");
}
```

#### 按钮与消息框

```c
// 按钮回调函数
void menu_button_callback(u8g2_menu_t *menu, uint8_t id, u8g2_menuKeyValue_t key) {
    if (id == 0 && key == MENU_Key_Enter) {
        // 显示消息框（6秒后自动关闭）
        u8g2_MenuDrawMessageBox_str(menu, "Settings Saved", 6000);
    }
}

void button_menu() {
    // 添加按钮（绑定回调函数）
    u8g2_MenuItem_button(menu_button_callback, 0);
    u8g2_MenuDrawUTF8("Save Settings");
}
```


### 3. 按键处理

```c
// 按键扫描（放在定时器中断或主循环中）
void key_scan(uint16_t time) {
    // 假设KEY_1为上键，KEY_2为下键，KEY_3为确认键
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}
```


## 核心API说明

| 函数 | 功能描述 |
|------|----------|
| `u8g2_CreateMenu()` | 创建菜单实例，绑定U8G2和菜单回调函数 |
| `u8g2_DrawMenu()` | 绘制菜单到屏幕 |
| `u8g2_MenuDrawUTF8()` | 显示UTF-8文本 |
| `u8g2_MenuUTF8Printf()` | 格式化显示UTF-8文本 |
| `u8g2_MenuItemValue_xxx()` | 绑定数值变量，支持调整（xxx为类型，如uint8、float等） |
| `u8g2_MenuItem_button()` | 添加按钮并绑定回调函数 |
| `u8g2_MenuDrawMessageBox_str()` | 显示文本消息框 |
| `u8g2_MenuKeyScannDebounce()` | 带消抖的按键扫描 |


## 版本信息

当前版本：`1.2.5-beta`

支持通过`U8G2_MENU_VERSION`宏获取版本号。


## 注意事项

- 长文本会自动启用水平滚动，无需额外配置。
- 数值调整项需绑定全局变量，调整范围和步长可自定义。
- 按键消抖参数（`MenuKey_debouncePeriod`）可根据硬件调整。
- 消息框自动关闭时间单位为毫秒，`U8G2_MENU_INFINITE_TIMEOUT`表示永不关闭。
