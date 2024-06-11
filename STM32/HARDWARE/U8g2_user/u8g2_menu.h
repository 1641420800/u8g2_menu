#ifndef U8G2_MENU_H
#define U8G2_MENU_H

#include "u8g2.h"
#include <stdarg.h>
#include <string.h>
#include <stdio.h>

typedef struct u8g2_menu_struct u8g2_menu_t;
typedef union u8g2_menu_value_uniom u8g2_menu_value_t;

typedef enum
{
	MENU_Fix = 0,
	MENU_Writable,
	MENU_WritableSelect
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
	MENU_butten
} MENU_V_type_t;
typedef enum
{
	MENU_Key_None = 0, // 无按键
	MENU_Key_Add,	   // 加
	MENU_Key_Sub,	   // 减
	MENU_Key_Confirm   // 确认
} u8g2_menuKeyValue_t;

typedef void (*menuItem_t)(void);
typedef void (*menuSelector_t)(u8g2_menu_t *u8g2_menu);
typedef void (*u8g2_MenuDraw_t)(char *str);
typedef void (*u8g2_MenuButton_t)(uint8_t ID, u8g2_menuKeyValue_t key);

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
struct u8g2_menu_button_struct
{
	u8g2_MenuButton_t but;
	uint8_t ID;
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
	struct u8g2_menu_button_struct button;
};

struct u8g2_menu_struct
{
	u8g2_t *u8g2; // 简化参数用的

	menuItem_t menuItem;		 // 绘制表项的实际函数
	menuSelector_t menuSelector; // 绘制选择展示器的实际函数

	MENU_V_type_t u8g2_menuValueType;
	u8g2_menu_value_t u8g2_menuValue;

	u8g2_int_t currentSetValue;
	u8g2_int_t currentItem; // 当前选中的项

	u8g2_uint_t currentDrawItem; // 当前绘制的项


	u8g2_int_t currentItemLog; // 记录的当前选中的项
	u8g2_int_t positionOffset;	// 位置偏移
	u8g2_int_t _positionOffset;	// 位置偏移


	// 当前的位置信息
	u8g2_uint_t currentX;
	u8g2_uint_t currentY;
	u8g2_uint_t currentWidth;
	u8g2_uint_t currentHeight;
	u8g2_uint_t currentItemWidth;
	u8g2_uint_t currentItemHeight;
	u8g2_uint_t currentDrawItemHeight;

	u8g2_uint_t currentContentWidth;

	MENU_Attribute_t currentAttribute; // 当前可调属性

	u8g2_uint_t leftMarginSelector;	 // 菜单左边距
	u8g2_uint_t topMarginSelector;	 // 菜单顶边距
	u8g2_uint_t lineSpacingSelector; // 菜单行间距

	u8g2_uint_t leftMargin;	 // 菜单左边距
	u8g2_uint_t lineSpacing; // 菜单行间距
	u8g2_uint_t totalLength; // 菜单总长度

	u8g2_int_t _position; // 当前实时位置
	float _rowHeight;	  // 当前实时行高比例
	u8g2_int_t spe;		  // 移动速度
};

/**
 * @todo:
 * 	1. 添加菜单风格
 * 	2. 显示方向
 *  3. 图片显示
 *  4. 无选择器选项
 *  5. 调整动画选项
 *  6. 合并绑定附加值
 *  7. 添加选定后调整的开关附加值
 *  8. 添加离开某项 和 进入某项的回调函数
 * 
 */
 
// 创建菜单 自定义选择展示器
void u8g2_CreateMenu_Selector(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_t menuItem, menuSelector_t menuSelector);

// 创建菜单 用默认选择展示器
void u8g2_CreateMenu(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_t menuItem);

// 切换表项
void u8g2_MenuReplaceItem(u8g2_menu_t *u8g2_menu, menuItem_t menuItem);

// 切换选择器
void u8g2_MenuReplaceSelector(u8g2_menu_t *u8g2_menu, menuSelector_t menuSelector);

// 默认的选择展示器
void u8g2_MenuSelector(u8g2_menu_t *u8g2_menu);

// 滑块条
void u8g2_DrawVSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion);

// 绘制菜单
void u8g2_DrawMenu(u8g2_menu_t *u8g2_menu, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h);

// 上移 i 项
void u8g2_MenuItemUpS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);

// 上移 1 项
void u8g2_MenuItemUp(u8g2_menu_t *u8g2_menu);

// 下移 i 项
void u8g2_MenuItemDownS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i);

// 下移 1 项
void u8g2_MenuItemDown(u8g2_menu_t *u8g2_menu);

// 附加值加
void u8g2_MenuItemAddS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k);

// 附加值加
void u8g2_MenuItemAdd(u8g2_menu_t *u8g2_menu);

// 附加值减
void u8g2_MenuItemSubS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k);

// 附加值减
void u8g2_MenuItemSub(u8g2_menu_t *u8g2_menu);

// 选中
void u8g2_MenuItemSelect(u8g2_menu_t *u8g2_menu);

// 取消选中
void u8g2_MenuItemDeSelect(u8g2_menu_t *u8g2_menu);

// 获取选中状态
u8g2_int_t u8g2_MenuGetItemSelect(u8g2_menu_t *u8g2_menu);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

void u8g2_MenuKeys(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// 菜单显示字符串
void u8g2_MenuDrawStr(char *str);

// 菜单显示字符串 二倍大
void u8g2_MenuDrawStrX2(char *str);

// 菜单显示UTF-8字符集
void u8g2_MenuDrawUTF8(char *str);

// 菜单显示UTF-8字符集 二倍大
void u8g2_MenuDrawUTF8X2(char *str);

// 菜单格式化输出
void u8g2_MenuPrintf(u8g2_MenuDraw_t u8g2_MenuDraw, const char *fmt, ...);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// 追加附加值
void u8g2_MenuItemValue(MENU_V_type_t V_type,...);
void u8g2_MenuItemValue_uint8(uint8_t *value, int8_t adjValue, uint8_t minValue, uint8_t maxValue);
void u8g2_MenuItemValue_uint16(uint16_t *value, int16_t adjValue, uint16_t minValue, uint16_t maxValue);
void u8g2_MenuItemValue_uint32(uint32_t *value, int32_t adjValue, uint32_t minValue, uint32_t maxValue);
void u8g2_MenuItemValue_int8(int8_t *value, int8_t adjValue, int8_t minValue, int8_t maxValue);
void u8g2_MenuItemValue_int16(int16_t *value, int16_t adjValue, int16_t minValue, int16_t maxValue);
void u8g2_MenuItemValue_int32(int32_t *value, int32_t adjValue, int32_t minValue, int32_t maxValue);

void u8g2_MenuItemValue_int(int *value, int adjValue, int minValue, int maxValue);
void u8g2_MenuItemValue_float(float *value, float adjValue, float minValue, float maxValue);
void u8g2_MenuItemValue_double(double *value, double adjValue, double minValue, double maxValue);

void u8g2_MenuItem_button(u8g2_MenuButton_t but, uint8_t ID);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// 获取当前选中项
u8g2_uint_t u8g2_MenuGetCurrentSelection(u8g2_menu_t *u8g2_menu);

// 获取当前绘制的菜单
u8g2_menu_t *u8g2_MenuGetCurrentMenu(void);

#endif
