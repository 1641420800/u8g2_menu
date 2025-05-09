#ifndef U8G2_MENU_H
#define U8G2_MENU_H

#include "u8g2.h"
#include <stdlib.h>
#include <stdarg.h>
#include <string.h>
#include <stdio.h>
#include <ctype.h>

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @file u8g2_menu.h
 * @brief 这是一个基于U8g2构建的菜单库，用于管理和渲染多个菜单。
 * 
 * 库包含以下几个模块：
 * - 核心菜单模块：处理菜单系统的核心功能。
 * - 选择器模块：管理菜单内的选择。
 * - 动画模块：为菜单过渡提供动画效果。
 * - 项目绘制模块：绘制各种类型的菜单项，包括图表、字符串、进度条和图片等。
 * - 附加值模块：向菜单项添加额外功能，可通过菜单操作按键来触发。
 * - 按键模块：与物理按键交互以供用户操作。
 * - 消息模块：提供向用户弹出消息的功能。
 * 
 * 用户界面：
 * - 与按键相关的功能，用于菜单导航。
 * - 可选的字符输入功能，用于文本交互。
 * - 可选的时间相关功能，用于优化动画基准。
 * 
 * 附加记录功能：
 * - 启用记录功能，允许用户记录菜单本次绘制的内容。
 * - 记录功能可用于以文本形式展示菜单内容。
 */

// 版本信息
#define U8G2_MENU_VERSION "1.2.5-beta"
#define U8G2_MENU_DEBUG 0                       // 设置为1启用调试模式

// 功能按键相关
#define U8G2_MENUKeyValue_Back '*'              // 删除一个字符
#define U8G2_MENUKeyValue_Clear '#'             // 清除整个输入

// 菜单刷新间隔
#define U8G2_MENU_DELAY 100                     // 推理动画之间的延迟，以毫秒为单位

// 图表功能相关
#define U8G2_MENU_MIN_VALUE_DIFF 0.0f           // 图表幅值的最小值
#define U8G2_MENU_CHART_SPACE_RATIO 1.1f        // 图表上下留空的比例

// 菜单按键相关
#define MenuKey_holdTime 800                    // 菜单按键的长按触发时间
#define MenuKey_repeatTime 200                  // 菜单按键的长按重复触发时间
#define MenuKey_debouncePeriod 20     					// 按键消抖稳定检测周期(单位:ms)
#define MenuKey_triggerHigh 18                  // 按键触发高电平阈值
#define MenuKey_triggerLow 2                    // 按键释放低电平阈值

// 动画相关相关
#define ROW_HEIGHT_INCREMENT 0.2f               // 定义行高度增加量
#define MAX_ROW_HEIGHT 1.0f                     // 定义最大行高度
#define SPE_ADJUSTMENT 2.0f                     // 定义SPE调整量

// 记录功能相关
#define U8G2_MENU_RECORD 1                      // 启用记录功能
#define U8G2_MENU_RECORD_SIZE 256               // 记录缓冲区大小

// 消息功能相关
#define U8G2_MENU_MESSAGEBOX 1                  // 启用消息框
#define U8G2_MENU_INFINITE_TIMEOUT UINT32_MAX   // 不自动收回

// 事件功能相关
#define U8G2_MENU_EVENT_Capacity 30

#ifndef ABS
#define ABS(s) ((s) < 0 ? -(s) : (s))
#endif
#ifndef map
#define map(v, min1, max1, min2, max2) (((v) - (min1)) * ((max2) - (min2)) / ((max1) - (min1)) + (min2))
#endif
#ifndef limit
#define limit(d, min, max) ((d) < (min) ? (min) : (d) > (max) ? (max) : (d))
#endif
#ifndef LEN
#define LEN(s) (sizeof(s) / sizeof(s[0]))
#endif
#ifndef nonNegative
#define nonNegative(d) ((d) < 0 ? 0 : (d))
#endif
#ifdef __CC_ARM /* ARM Compiler */
#define WEAK __weak
#elif defined(__IAR_SYSTEMS_ICC__) /* for IAR Compiler */
#define WEAK __weak
#elif defined(__GNUC__) /* GNU GCC Compiler */
#define WEAK __attribute__((weak))
#elif defined(__ADSPBLACKFIN__) /* for VisualDSP++ Compiler */
#define WEAK __attribute__((weak))
#elif defined(_MSC_VER)
#define WEAK
#elif defined(__TI_COMPILER_VERSION__)
#define WEAK
#else
#error not supported tool chain
#endif

typedef struct u8g2_menu_effect_struct u8g2_menu_effect_t;
typedef struct u8g2_menu_struct u8g2_menu_t;
typedef union u8g2_menu_value_uniom u8g2_menu_value_t;
typedef struct u8g2_chart_struct u8g2_chart_t;
typedef struct u8g2_menu_event_item_struct u8g2_menu_event_item_t;
typedef struct u8g2_menu_event_struct u8g2_menu_event_t;
typedef enum
{
	MENU_None = 0,		// 未选中
	MENU_Fix,			// 固定
	MENU_Writable,		// 可编辑
	MENU_WritableSelect // 可编辑+选择
} MENU_Attribute_t;
typedef enum
{
	MENU_V_uint8 = 0,
	MENU_V_uint16,
	MENU_V_uint32,
	MENU_V_int8,
	MENU_V_int16,
	MENU_V_int32,
	MENU_V_int,
	MENU_V_float,
	MENU_V_double,
	MENU_V_switch,
	MENU_button,
	MENU_menu,
	MENU_str,
	MENU_NC
} MENU_V_type_t;
typedef enum
{
	MENU_Key_None = 0, // 无按键
	MENU_Key_Up,	   // 上
	MENU_Key_Down,	   // 下
	MENU_Key_Enter,	   // 确认
	MENU_Key_Return,   // 返回
	MENU_Key_Add,	   // 加
	MENU_Key_Sub,	   // 减
	MENU_Key_Num,	   // 按键数量
} u8g2_menuKeyValue_t;
typedef enum {LayerAND, LayerOR, LayerXOR, LayerXNOR} Layer_t;

typedef void (*menuItem_cb)(void);
typedef void (*menuSelector_cb)(u8g2_menu_t *u8g2_menu);
typedef void (*u8g2_MenuDraw_cb)(char *str);
typedef void (*u8g2_MenuButton_cb)(u8g2_menu_t *u8g2_menu, uint8_t ID, u8g2_menuKeyValue_t key);
typedef void (*u8g2_MenuDrawBoard_cb)(u8g2_t *u8g2);
typedef void (*u8g2_MenuDrawMessageBox_cb)(u8g2_t *u8g2, u8g2_uint_t width, u8g2_uint_t height, void *message);
typedef void (*menuEventHandle_cb)(u8g2_menu_t *u8g2_menu, void* value);
struct u8g2_menu_uint8_struct
{
	uint8_t *value;
	int8_t adjValue;
	uint8_t minValue;
	uint8_t maxValue;
};
struct u8g2_menu_uint16_struct
{
	uint16_t *value;
	int16_t adjValue;
	uint16_t minValue;
	uint16_t maxValue;
};
struct u8g2_menu_uint32_struct
{
	uint32_t *value;
	int32_t adjValue;
	uint32_t minValue;
	uint32_t maxValue;
};
struct u8g2_menu_int8_struct
{
	int8_t *value;
	int8_t adjValue;
	int8_t minValue;
	int8_t maxValue;
};
struct u8g2_menu_int16_struct
{
	int16_t *value;
	int16_t adjValue;
	int16_t minValue;
	int16_t maxValue;
};
struct u8g2_menu_int32_struct
{
	int32_t *value;
	int32_t adjValue;
	int32_t minValue;
	int32_t maxValue;
};
struct u8g2_menu_int_struct
{
	int *value;
	int adjValue;
	int minValue;
	int maxValue;
};
struct u8g2_menu_float_struct
{
	float *value;
	float adjValue;
	float minValue;
	float maxValue;
};
struct u8g2_menu_double_struct
{
	double *value;
	double adjValue;
	double minValue;
	double maxValue;
};
struct u8g2_menu_switch_struct
{
	uint8_t *value;
	uint8_t openValue;
};
struct u8g2_menu_button_struct
{
	u8g2_MenuButton_cb but;
	uint8_t ID;
};
struct u8g2_menu_menu_struct
{
	menuItem_cb menuItem;
};
struct u8g2_menu_str_struct
{
	char *s;
	uint16_t s_len;
};

union u8g2_menu_value_uniom
{
	struct u8g2_menu_uint8_struct v_uint8;
	struct u8g2_menu_uint16_struct v_uint16;
	struct u8g2_menu_uint32_struct v_uint32;
	struct u8g2_menu_int8_struct v_int8;
	struct u8g2_menu_int16_struct v_int16;
	struct u8g2_menu_int32_struct v_int32;
	struct u8g2_menu_int_struct v_int;
	struct u8g2_menu_float_struct v_float;
	struct u8g2_menu_double_struct v_double;
	struct u8g2_menu_switch_struct v_switch;
	struct u8g2_menu_button_struct button;
	struct u8g2_menu_menu_struct menu;
	struct u8g2_menu_str_struct str;
};

struct u8g2_menu_effect_struct
{
	u8g2_int_t (*u8g2_menuEffect_init)(u8g2_menu_t *u8g2_menu);
	u8g2_int_t (*u8g2_menuEffect_run)(u8g2_menu_t *u8g2_menu);

	u8g2_int_t _position; // 当前实时位置
	float _rowHeight;	  // 当前实时行高比例
};
struct u8g2_menu_event_item_struct
{
    uint8_t nextLoopRequired : 1; // 下次循环处理
    // <todo : 待定>
    void* value;  // 事件值
    menuEventHandle_cb menuEventHandle;
};
struct u8g2_menu_event_struct
{
    uint8_t lock;
    size_t quantity; 
    size_t itemsWrite;
    size_t itemsRead;
    struct u8g2_menu_event_item_struct items[U8G2_MENU_EVENT_Capacity];
};
struct u8g2_menu_struct
{
	u8g2_t *u8g2;					   // u8g2实例
	menuItem_cb menuItem;			   // 绘制表项的实际函数
	menuSelector_cb menuSelector;	   // 绘制选择展示器的实际函数
	u8g2_menu_effect_t menuEffect;	   // 绘制效果
	MENU_V_type_t u8g2_menuValueType;  // 菜单附加值类型
	MENU_V_type_t _u8g2_menuValueType; // 菜单附加值类型
	u8g2_menu_value_t u8g2_menuValue;  // 菜单附加值
	u8g2_int_t currentSetValue;		   // 当前选中状态 -1 表示未选中
	u8g2_int_t currentItem;			   // 当前选中的项
	u8g2_uint_t currentDrawItem;	   // 当前绘制的项
	u8g2_int_t currentItemLog;		   // 记录的当前选中的项
	float positionOffset;			   // 目标位置偏移
	float _positionOffset;			   // 实际位置偏移
	float positionOffset_spe;		   // 目标位置偏移速度
	float positionOffset_strHeaderLen; // 字符串偏移的头宽度(字符)
	u8g2_int_t currentX;			   // 当前绘制的X
	u8g2_int_t currentY;			   // 当前绘制的Y
	u8g2_int_t currentWidth;		   // 当前菜单的宽度
	u8g2_int_t currentHeight;		   // 当前菜单的高度
	u8g2_int_t currentItemWidth;	   // 当前项的宽度
	u8g2_int_t currentItemHeight;	   // 当前项的高度
	u8g2_int_t currentContentWidth;	   // 当前菜单内容宽度
	MENU_Attribute_t currentAttribute; // 当前可调属性
	u8g2_int_t pickItemY;			   // 选中项的位置
	u8g2_int_t pickItemHeight;		   // 选中项的高度
	u8g2_int_t leftMarginSelector;	   // 菜单左边距
	u8g2_int_t topMarginSelector;	   // 菜单顶边距
	u8g2_int_t lineSpacingSelector;	   // 菜单行间距
	u8g2_int_t totalLength;			   // 菜单总长度
	uint16_t timer;					   // 菜单计时器
	uint8_t timer_effective;		   // 菜单计时器是否有效
	uint8_t keyLog[MENU_Key_Num];      // 按键状态记录
	uint16_t keyTim[MENU_Key_Num];     // 按键状态计时
	uint16_t key_shakeFree[MENU_Key_Num];
	uint16_t key_state[MENU_Key_Num];
	char bindChar;
	char _bindChar;
    u8g2_menu_event_t event;
#if U8G2_MENU_RECORD                   // 菜单记录
    uint16_t u8g2_menuRecordLen;
    char u8g2_menuRecord[U8G2_MENU_RECORD_SIZE];
#endif
#if U8G2_MENU_MESSAGEBOX                  // 消息框
    u8g2_MenuDrawMessageBox_cb drawMessageBox;
    void *message;
    uint32_t drawMessageBoxTimer;
    uint32_t drawMessageBoxTimerLeft;
    u8g2_uint_t messageBoxWidth;
    u8g2_uint_t messageBoxHeight;
#endif
};

struct u8g2_chart_struct
{
	float *data;
	float *data_dis;
	float data_max;
	float data_min;
	uint16_t data_len;
};

/* =============================== | u8g2_meun_weak.c | =============================== */
// 选中某项
void u8g2_menuItemEnter(u8g2_menu_t *u8g2_menu, u8g2_uint_t item);

// 离开某项
void u8g2_menuItemLeave(u8g2_menu_t *u8g2_menu, u8g2_uint_t item);

// 某值增加
void u8g2_menuValueAdd(void * p);

// 某值减小
void u8g2_menuValueSub(void * p);

// 某值变化
void u8g2_menuValueChange(void * p);

// 按键输入
void u8g2_menuKeyEvent(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue);

// 字符输入
void u8g2_menuCharEvent(u8g2_menu_t *u8g2_menu, char *c);

// 事件过滤器
uint8_t menuEventUserHandle(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t * eventItem);
/* =============================== | u8g2_meun.c | =============================== */
// 创建菜单 自定义选择展示器
void u8g2_CreateMenu_Selector(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_cb menuItem, menuSelector_cb menuSelector);

// 创建菜单 用默认选择展示器
void u8g2_CreateMenu(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_cb menuItem);

// 切换表项
void u8g2_MenuReplaceItem(u8g2_menu_t *u8g2_menu, menuItem_cb menuItem);

// 获取表项
menuItem_cb u8g2_MenuGetItem(u8g2_menu_t *u8g2_menu);

// 获取水平偏移量
u8g2_int_t u8g2_MenuGetHorizontalOffset(u8g2_menu_t *u8g2_menu);

// 设置平移速度
void u8g2_MenuSetPositionOffsetSpe(u8g2_menu_t *u8g2_menu, float spe);

// 获取平移速度
#define u8g2_MenuGetPositionOffsetSpe(u8g2_menu) ((u8g2_menu)->positionOffset_spe)
// float u8g2_MenuGetPositionOffsetSpe(u8g2_menu_t *u8g2_menu);

// 设置平移头长度
void u8g2_MenuSetPositionOffsetStrHeaderLen(u8g2_menu_t *u8g2_menu, float strHeaderLen);

// 获取平移头长度
#define u8g2_MenuGetPositionOffsetStrHeaderLen(u8g2_menu) ((u8g2_menu)->positionOffset_strHeaderLen)
// float u8g2_MenuGetPositionOffsetStrHeaderLen(u8g2_menu_t *u8g2_menu);

// 调用选择展示器
void u8g2_MenuSelectorCall(u8g2_menu_t *u8g2_menu);

// 滑块条
void u8g2_DrawVSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion);

// 绘制菜单
void u8g2_DrawMenu(u8g2_menu_t *u8g2_menu, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h);

// 菜单时间接口
void u8g2_MenuTime_ISR(u8g2_menu_t *u8g2_menu, uint16_t ms);

// 上移 i 项
void u8g2_MenuItemUpS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);

// 上移 1 项
void u8g2_MenuItemUp(u8g2_menu_t *u8g2_menu);

// 下移 i 项
void u8g2_MenuItemDownS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);

// 下移 1 项
void u8g2_MenuItemDown(u8g2_menu_t *u8g2_menu);

// 移动到某项
void u8g2_MenuItemMove(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);

// 绑定快捷跳转字符
void u8g2_MenuItemBindChar(char c, uint8_t selected);

// 清除记录
void u8g2_MenuRecordClear(u8g2_menu_t *u8g2_menu);

// 添加记录字符串
void u8g2_MenuRecordAdd(u8g2_menu_t *u8g2_menu, const char * text);

// 获取记录字符串
const char* u8g2_MenuRecord(u8g2_menu_t *u8g2_menu);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// 切换选择器
void u8g2_MenuReplaceSelector(u8g2_menu_t *u8g2_menu, menuSelector_cb menuSelector);

// 获取当前属性
MENU_Attribute_t u8g2_MenuGetAttribute(u8g2_menu_t *u8g2_menu);

// 设置菜单项位置
void u8g2_MenuSetPosition(u8g2_menu_t *u8g2_menu, u8g2_uint_t leftMarginSelector, u8g2_uint_t topMarginSelector, u8g2_uint_t lineSpacingSelector);

// 获取菜单项位置
u8g2_int_t u8g2_MenuGetX(u8g2_menu_t *u8g2_menu);
u8g2_int_t u8g2_MenuGetY(u8g2_menu_t *u8g2_menu);
u8g2_int_t u8g2_MenuGetH(u8g2_menu_t *u8g2_menu);
u8g2_int_t u8g2_MenuGetW(u8g2_menu_t *u8g2_menu);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// 菜单项绘制开始
u8g2_menu_t *u8g2_MenuDrawItemStart(void);

// 菜单项绘制开始
void u8g2_MenuDrawItemSetSize(u8g2_menu_t *menu, u8g2_uint_t width, u8g2_uint_t height);

// 菜单项绘制结束
void u8g2_MenuDrawItemEnd(u8g2_menu_t *menu);

// 设置附加值属性并返回菜单对象
u8g2_menu_t *u8g2_getMenuItemValue(MENU_Attribute_t MENU_Attribute);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// 获取当前选中项
u8g2_uint_t u8g2_MenuGetCurrentSelection(u8g2_menu_t *u8g2_menu);

// 获取当前绘制的菜单
u8g2_menu_t *u8g2_MenuGetCurrentMenu(void);

// 获取菜单对应的 u8g2_t
u8g2_t *u8g2_MenuGetU8g2(u8g2_menu_t *u8g2_menu);

/* =============================== | u8g2_meun_event.c | =============================== */
// 添加一个事件
uint8_t u8g2_MenuEventRecord(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t * eventItem);

// 处理事件
void u8g2_MenuEventProcess(u8g2_menu_t *u8g2_menu);

// 获取当前事件暂存数
size_t u8g2_MenuEvent_getQuantity(u8g2_menu_t *u8g2_menu);

/* =============================== | u8g2_meun_keys.c | =============================== */
// 菜单按键扫描(消抖)
void u8g2_MenuKeyScannDebounce(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue, uint8_t key, uint16_t time);

// 菜单按键扫描
void u8g2_MenuKeyScann(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue, uint8_t key, uint16_t time);

// 菜单按键
void u8g2_MenuKeys(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue);

// 菜单输入字符
void u8g2_MenuInChar(u8g2_menu_t *u8g2_menu, char c);
/* =============================== | u8g2_meun_message.c | =============================== */
// 菜单消息框时间接口
void u8g2_MenuMessageBoxTime_ISR(u8g2_menu_t *u8g2_menu, uint16_t ms);

// 处理消息框显示相关
void u8g2_menuMessageBoxCall(u8g2_menu_t *u8g2_menu);

// 设置弹窗信息
void u8g2_MenuDrawMessageBox(u8g2_menu_t *u8g2_menu, u8g2_MenuDrawMessageBox_cb drawMessageBox, void *message, u8g2_uint_t messageBoxWidth, u8g2_uint_t messageBoxHeight, uint32_t drawMessageBoxTimer);

// 清除弹窗信息
void u8g2_MenuDrawMessageBoxClose(u8g2_menu_t *u8g2_menu);

// 显示字符串消息
void u8g2_MenuDrawMessageBox_str(u8g2_menu_t *u8g2_menu, const char * str, uint32_t drawMessageBoxTimer);

// 显示图片消息
void u8g2_MenuDrawMessageBox_xbm(u8g2_menu_t *u8g2_menu, u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap, uint32_t drawMessageBoxTimer);

/* =============================== | u8g2_meun_drawBoard.c | =============================== */
// 菜单显示画板
void u8g2_MenuDrawItemBoard(u8g2_MenuDrawBoard_cb u8g2_MenuDrawBoard, u8g2_uint_t width, u8g2_uint_t height);

/* =============================== | u8g2_meun_drawStr.c | =============================== */
// 菜单显示字符串
void u8g2_MenuDrawStr(char *str);

// 菜单显示字符串 二倍大
void u8g2_MenuDrawStrX2(char *str);

// 菜单显示UTF-8字符集
void u8g2_MenuDrawUTF8(char *str);

// 菜单显示UTF-8字符集 二倍大
void u8g2_MenuDrawUTF8X2(char *str);

// 菜单显示密码
void u8g2_MenuDrawPassword(char *str, char mask);

// 菜单显示密码 二倍大
void u8g2_MenuDrawPasswordX2(char *str, char mask);

// 菜单格式化输出
void u8g2_MenuPrintf(u8g2_MenuDraw_cb u8g2_MenuDraw, const char *fmt, ...);

// 菜单格式化输出 - 快捷函数 固定调用 u8g2_MenuDrawUTF8
void u8g2_MenuUTF8Printf(const char *fmt, ...);

/* =============================== | u8g2_meun_drawValueBar.c | =============================== */
// 绘制滑块条
void u8g2_DrawHSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion);

// 绘制进度条
void u8g2_DrawHProgressBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule);

// 菜单显示滑块条
void u8g2_MenuDrawItemSlider(float position);

// 菜单显示滑块条 自定义比例
void u8g2_MenuDrawItemSliderProportion(float position, float proportion);

// 菜单显示滑块条 绑定附加值
void u8g2_MenuDrawItemSlider_bind(int *value, int adjValue, int minValue, int maxValue);

// 菜单显示进度条
void u8g2_MenuDrawItemProgressBar(float position);

// 菜单显示进度条 绑定附加值
void u8g2_MenuDrawItemProgressBar_bind(int *value, int adjValue, int minValue, int maxValue);

/* =============================== | u8g2_meun_drawChart.c | =============================== */
// 图表数据初始化
void u8g2_chart_init(u8g2_chart_t *chart, float *data, float *data_dis, uint16_t data_len);

// 图表数据添加
void u8g2_chart_addData(u8g2_chart_t *chart, float d);

// 图表数据更新
void u8g2_chart_update(u8g2_chart_t *chart);

// 图表数据范围设置
void u8g2_chart_setRange(u8g2_chart_t *chart, float max, float min);

// 图表数据自动范围设置
void u8g2_chart_autoRange(u8g2_chart_t *chart);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// 绘制折线图
void u8g2_drawLineChart(u8g2_t *u8g2, u8g2_chart_t *chart, u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h);

// 绘制散点图
void u8g2_drawPointChart(u8g2_t *u8g2, u8g2_chart_t *chart, u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// 绘制折线图项
void u8g2_MenuDrawItemLineChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min);

// 绘制散点图项
void u8g2_MenuDrawItemPointChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min);

/* =============================== | u8g2_meun_drawPic.c | =============================== */
// 绘制XBM
void u8g2_MenuDrawItemXBM(u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap);

// 绘制XBMP
void u8g2_MenuDrawItemXBMP(u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap);

/* =============================== | u8g2_meun_itemValue.c | =============================== */
// 选中
void u8g2_MenuItemSelect(u8g2_menu_t *u8g2_menu);

// 取消选中
void u8g2_MenuItemDeSelect(u8g2_menu_t *u8g2_menu);

// 获取选中状态
u8g2_int_t u8g2_MenuGetItemSelect(u8g2_menu_t *u8g2_menu);

// 附加值加
void u8g2_MenuItemAddS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k);

// 附加值加
void u8g2_MenuItemAdd(u8g2_menu_t *u8g2_menu);

// 附加值减
void u8g2_MenuItemSubS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k);

// 附加值减
void u8g2_MenuItemSub(u8g2_menu_t *u8g2_menu);

// 追加附加值
void u8g2_MenuItemValue_uint8(uint8_t *value, int8_t adjValue, uint8_t minValue, uint8_t maxValue);
void u8g2_MenuItemValue_uint16(uint16_t *value, int16_t adjValue, uint16_t minValue, uint16_t maxValue);
void u8g2_MenuItemValue_uint32(uint32_t *value, int32_t adjValue, uint32_t minValue, uint32_t maxValue);
void u8g2_MenuItemValue_int8(int8_t *value, int8_t adjValue, int8_t minValue, int8_t maxValue);
void u8g2_MenuItemValue_int16(int16_t *value, int16_t adjValue, int16_t minValue, int16_t maxValue);
void u8g2_MenuItemValue_int32(int32_t *value, int32_t adjValue, int32_t minValue, int32_t maxValue);

void u8g2_MenuItemValue_int(int *value, int adjValue, int minValue, int maxValue);
void u8g2_MenuItemValue_float(float *value, float adjValue, float minValue, float maxValue);
void u8g2_MenuItemValue_double(double *value, double adjValue, double minValue, double maxValue);

void u8g2_MenuItemValue_switch(uint8_t *value, uint8_t openValue);

void u8g2_MenuItem_button(u8g2_MenuButton_cb but, uint8_t ID);
void u8g2_MenuItem_menu(menuItem_cb menuItem);
void u8g2_MenuItem_str(char *str, uint16_t len);

/* =============================== | u8g2_meun_effect.c | =============================== */

extern u8g2_menu_effect_t u8g2_MenuEffect;

void u8g2_MenuEffectBind(u8g2_menu_t *u8g2_menu, u8g2_menu_effect_t *u8g2_menu_effect);
u8g2_int_t u8g2_MenuEffectGetPos(u8g2_menu_t *u8g2_menu);
float u8g2_MenuEffectGetRowHeight(u8g2_menu_t *u8g2_menu);

u8g2_int_t u8g2_menuEffect_init_call(u8g2_menu_t *u8g2_menu);
u8g2_int_t u8g2_menuEffect_run_call(u8g2_menu_t *u8g2_menu);

/* =============================== | u8g2_meun_selector.c | =============================== */

// 选择器记录
void u8g2_MenuSelector_Record(u8g2_menu_t *u8g2_menu);

// 默认的选择展示器
void u8g2_MenuSelector(u8g2_menu_t *u8g2_menu);

// 选择展示器 圆形
void u8g2_MenuSelectorRotundity(u8g2_menu_t *u8g2_menu);

// 选择展示器 方形
void u8g2_MenuSelectorSquare(u8g2_menu_t *u8g2_menu);
/* =============================== | u8g2_meun_layer.c | =============================== */
uint8_t *u8g2_MenuGetLayerBuff(void);
u8g2_t *u8g2_MenuStartLayer(u8g2_t *u8g2);
void u8g2_MenuEndLayer(Layer_t layer);

#ifdef __cplusplus
}
#endif

#endif
