#include "u8g2_menu.h"

#ifndef ABS
#define ABS(s) ((s) < 0 ? -(s) : (s))
#endif
#ifndef limitingAmplitude
#define limitingAmplitude(d, min, max) ((d) < (min) ? (min) : (d) > (max) ? (max) \
																		  : (d))
#endif

// 当前正在绘制的菜单
u8g2_menu_t *currentMenu = NULL;

// 创建菜单 自定义选择展示器
void u8g2_CreateMenu_Selector(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_t menuItem, menuSelector_t menuSelector)
{
	if (!u8g2)
		return;
	if (!u8g2_menu)
		return;
	if (!menuItem)
		return;
	if (!menuSelector)
		return;

	memset(u8g2_menu, 0, sizeof(u8g2_menu_t));

	u8g2_menu->u8g2 = u8g2;
	u8g2_menu->menuItem = menuItem;
	u8g2_menu->menuSelector = menuSelector;
	u8g2_menu->currentSetValue = -1;
}

// 创建菜单 用默认选择展示器
void u8g2_CreateMenu(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_t menuItem)
{
	u8g2_CreateMenu_Selector(u8g2, u8g2_menu, menuItem, u8g2_MenuSelector);
}

// 切换表项
void u8g2_MenuReplaceItem(u8g2_menu_t *u8g2_menu, menuItem_t menuItem)
{
	u8g2_menu->menuItem = menuItem;
	u8g2_menu->currentItem = 0;
	u8g2_menu->_rowHeight = 0;
}

// 切换选择器
void u8g2_MenuReplaceSelector(u8g2_menu_t *u8g2_menu, menuSelector_t menuSelector)
{
	u8g2_menu->menuSelector = menuSelector;
}

// 默认的选择展示器
void u8g2_MenuSelector(u8g2_menu_t *u8g2_menu)
{
	if (u8g2_menu->currentDrawItem == u8g2_menu->currentItem)
	{
		// 选中项
		switch (u8g2_menu->currentAttribute)
		{
		case MENU_Fix: // 不可调
			u8g2_menu->leftMarginSelector = 16;
			u8g2_menu->topMarginSelector = 0;
			u8g2_menu->lineSpacingSelector = 0;

			u8g2_menu->currentDrawItemHeight += u8g2_menu->topMarginSelector;

			u8g2_DrawCircle(u8g2_menu->u8g2, u8g2_menu->currentX + 6, u8g2_menu->currentDrawItemHeight - u8g2_menu->currentItemHeight / 2 - u8g2_menu->topMarginSelector / 2, 5, U8G2_DRAW_ALL);
			break;
		case MENU_Writable: // 可调
			u8g2_menu->leftMarginSelector = 16;
			u8g2_menu->topMarginSelector = 0;
			u8g2_menu->lineSpacingSelector = 0;

			u8g2_menu->currentDrawItemHeight += u8g2_menu->topMarginSelector;

			u8g2_DrawCircle(u8g2_menu->u8g2, u8g2_menu->currentX + 6, u8g2_menu->currentDrawItemHeight - u8g2_menu->currentItemHeight / 2 - u8g2_menu->topMarginSelector / 2, 2, U8G2_DRAW_ALL);
			u8g2_DrawCircle(u8g2_menu->u8g2, u8g2_menu->currentX + 6, u8g2_menu->currentDrawItemHeight - u8g2_menu->currentItemHeight / 2 - u8g2_menu->topMarginSelector / 2, 5, U8G2_DRAW_ALL);
			break;
		case MENU_WritableSelect: // 可调并选中
			u8g2_menu->leftMarginSelector = 16;
			u8g2_menu->topMarginSelector = 0;
			u8g2_menu->lineSpacingSelector = 0;

			u8g2_menu->currentDrawItemHeight += u8g2_menu->topMarginSelector;

			u8g2_DrawDisc(u8g2_menu->u8g2, u8g2_menu->currentX + 6, u8g2_menu->currentDrawItemHeight - u8g2_menu->currentItemHeight / 2 - u8g2_menu->topMarginSelector / 2, 5, U8G2_DRAW_ALL);
			break;
		}
	}
	else
	{
		// 未选中项
		u8g2_menu->leftMarginSelector = 16;
		u8g2_menu->topMarginSelector = 0;
		u8g2_menu->lineSpacingSelector = 0;
	}
}
void u8g2_MenuSelectorCall(u8g2_menu_t *u8g2_menu)
{
	u8g2_int_t x, y, w, h;
	if (u8g2_menu->currentSetValue != -1 && u8g2_menu->currentDrawItem == u8g2_menu->currentItem && u8g2_menu->currentItem == u8g2_menu->currentSetValue)
	{
		if (u8g2_menu->currentAttribute == MENU_Writable)
		{
			u8g2_menu->currentAttribute = MENU_WritableSelect;
		}
		else if (u8g2_menu->currentAttribute == MENU_Fix)
		{
			u8g2_menu->currentSetValue = -1;
		}
	}

	if (u8g2_menu->menuSelector)
		u8g2_menu->menuSelector(u8g2_menu);

	x = u8g2_menu->currentX + u8g2_menu->leftMarginSelector;
	y = u8g2_menu->currentDrawItemHeight - u8g2_menu->currentItemHeight;
	w = u8g2_menu->currentWidth - u8g2_menu->leftMarginSelector;
	h = u8g2_menu->currentItemHeight + u8g2_menu->topMarginSelector;
	// u8g2_DrawFrame(u8g2_menu->u8g2, x,y,w,h);
	u8g2_SetClipWindow(u8g2_menu->u8g2, x < 0 ? 0 : x, y < 0 ? 0 : y, x + w, y + h);

	if (u8g2_menu->currentItemLog != u8g2_menu->currentItem)
	{
		u8g2_menu->positionOffset = u8g2_GetMaxCharWidth(u8g2_menu->u8g2) * 5;
		u8g2_menu->currentItemLog = u8g2_menu->currentItem;
	}
	u8g2_menu->_positionOffset = 0;

	if (u8g2_menu->currentDrawItem == u8g2_menu->currentItem)
	{
		// 判断显示是否完整 是否需要移动
		if (u8g2_menu->currentDrawItemHeight + u8g2_menu->lineSpacingSelector >= u8g2_menu->currentHeight + u8g2_menu->currentY)
		{
			u8g2_menu->spe = u8g2_menu->currentDrawItemHeight + u8g2_menu->lineSpacingSelector - u8g2_menu->currentHeight - u8g2_menu->currentY;
			u8g2_menu->spe = u8g2_menu->spe / 2 + 1;
		}
		if (u8g2_menu->currentDrawItemHeight - u8g2_menu->currentItemHeight <= u8g2_menu->currentY)
		{
			u8g2_menu->spe = u8g2_menu->currentDrawItemHeight - u8g2_menu->currentItemHeight - u8g2_menu->currentY;
			u8g2_menu->spe = u8g2_menu->spe / 2 - 1;
		}
		if (u8g2_menu->currentContentWidth > w)
		{
			u8g2_menu->positionOffset -= 1 + u8g2_GetMaxCharWidth(u8g2_menu->u8g2) / 10;
			if (u8g2_menu->positionOffset + u8g2_menu->currentContentWidth + u8g2_GetMaxCharWidth(u8g2_menu->u8g2) * 5 <= w)
			{
				u8g2_menu->positionOffset = u8g2_GetMaxCharWidth(u8g2_menu->u8g2) * 5;
			}
			if (u8g2_menu->positionOffset > 0)
				u8g2_menu->_positionOffset = 0;
			else if (u8g2_menu->positionOffset + u8g2_menu->currentContentWidth - w <= 0)
				u8g2_menu->_positionOffset = w - u8g2_menu->currentContentWidth;
			else
				u8g2_menu->_positionOffset = u8g2_menu->positionOffset;
		}
	}
}

// 滑块条
void u8g2_DrawVSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion)
{
	if (schedule > 1)
		schedule = 1;
	if (schedule < 0)
		schedule = 0;
	if (proportion > 1)
		proportion = 1;
	if (proportion < 0)
		proportion = 0;
	u8g2_DrawVLine(u8g2, x + w / 2, y, h);
	u8g2_DrawBox(u8g2, x, y + h * (1 - proportion) * schedule, w, h * proportion);
}

// 绘制菜单
void u8g2_DrawMenu(u8g2_menu_t *u8g2_menu, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h)
{
	if (!u8g2_menu)
		return;
	if (w < 6)
		return;

	// 设置当前绘制的菜单
	currentMenu = u8g2_menu;

	u8g2_menu->currentX = x;
	u8g2_menu->currentY = y;
	u8g2_menu->currentWidth = w - 6;
	u8g2_menu->currentHeight = h;

	u8g2_menu->_position += u8g2_menu->spe;
	// 绘制表项

	u8g2_menu->spe = 0;
	u8g2_menu->currentDrawItem = 0;
	u8g2_menu->totalLength = 0;

	if (u8g2_menu->menuItem)
		u8g2_menu->menuItem();

	if (u8g2_menu->currentDrawItem == 0)
	{
		// 清除当前绘制的菜单
		currentMenu = NULL;
		return;
	}

	// 移动是否超出最后一项
	if (u8g2_menu->currentDrawItem <= u8g2_menu->currentItem)
	{
		u8g2_menu->currentItem = u8g2_menu->currentDrawItem - 1;
	}
	// 移动是否超出第一项
	if (u8g2_menu->currentItem < 0)
	{
		u8g2_menu->currentItem = 0;
	}

	// 解除限制绘制区域
	u8g2_SetMaxClipWindow(u8g2_menu->u8g2);

	// 绘制滑块条
	if (u8g2_menu->totalLength > h)
	{
		u8g2_DrawVSliderBar(
			u8g2_menu->u8g2,
			x + w - 5, y, 5, h,
			(float)u8g2_menu->_position / (u8g2_menu->totalLength - h),
			limitingAmplitude((float)h / u8g2_menu->totalLength, 0.2, 1));
	}

	// 通过 _rowHeight 实现菜单展开动画
	if (u8g2_menu->_rowHeight < 1)
		u8g2_menu->_rowHeight += 0.2;
	else
		u8g2_menu->_rowHeight = 1;

	// 清除当前绘制的菜单
	currentMenu = NULL;
}

// 上移 i 项
void u8g2_MenuItemUpS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i)
{
	u8g2_menu->currentItem -= i;
}

// 上移 1 项
void u8g2_MenuItemUp(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemUpS(u8g2_menu, 1);
}

// 下移 i 项
void u8g2_MenuItemDownS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i)
{
	u8g2_menu->currentItem += i;
}

// 下移 1 项
void u8g2_MenuItemDown(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemDownS(u8g2_menu, 1);
}

// 附加值加
void u8g2_MenuItemAddS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k)
{
#define MenuADDK(v, a, m, k)     \
	if (*(v) + (a) * (k) <= (m)) \
	*(v) += (a) * (k)

	switch (u8g2_menu->u8g2_menuValueType)
	{
	case MENU_V_uint8:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_uint8.value, u8g2_menu->u8g2_menuValue.v_uint8.adjValue, u8g2_menu->u8g2_menuValue.v_uint8.maxValue, k);
		break;
	case MENU_V_uint16:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_uint16.value, u8g2_menu->u8g2_menuValue.v_uint16.adjValue, u8g2_menu->u8g2_menuValue.v_uint16.maxValue, k);
		break;
	case MENU_V_uint32:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_uint32.value, u8g2_menu->u8g2_menuValue.v_uint32.adjValue, u8g2_menu->u8g2_menuValue.v_uint32.maxValue, k);
		break;
	case MENU_V_int8:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_int8.value, u8g2_menu->u8g2_menuValue.v_int8.adjValue, u8g2_menu->u8g2_menuValue.v_int8.maxValue, k);
		break;
	case MENU_V_int16:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_int16.value, u8g2_menu->u8g2_menuValue.v_int16.adjValue, u8g2_menu->u8g2_menuValue.v_int16.maxValue, k);
		break;
	case MENU_V_int32:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_int32.value, u8g2_menu->u8g2_menuValue.v_int32.adjValue, u8g2_menu->u8g2_menuValue.v_int32.maxValue, k);
		break;
	case MENU_V_int:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_int.value, u8g2_menu->u8g2_menuValue.v_int.adjValue, u8g2_menu->u8g2_menuValue.v_int.maxValue, k);
		break;
	case MENU_V_float:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_float.value, u8g2_menu->u8g2_menuValue.v_float.adjValue, u8g2_menu->u8g2_menuValue.v_float.maxValue, k);
		break;
	case MENU_V_double:
		MenuADDK(u8g2_menu->u8g2_menuValue.v_double.value, u8g2_menu->u8g2_menuValue.v_double.adjValue, u8g2_menu->u8g2_menuValue.v_double.maxValue, k);
		break;
	case MENU_butten:
		break;
	}

#undef MenuADDK
}

// 附加值加
void u8g2_MenuItemAdd(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemAddS(u8g2_menu, 1);
}

// 附加值减
void u8g2_MenuItemSubS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k)
{
#define MenuSUBK(v, a, m, k)     \
	if (*(v) - (a) * (k) >= (m)) \
	*(v) -= (a) * (k)

	switch (u8g2_menu->u8g2_menuValueType)
	{
	case MENU_V_uint8:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_uint8.value, u8g2_menu->u8g2_menuValue.v_uint8.adjValue, u8g2_menu->u8g2_menuValue.v_uint8.minValue, k);
		break;
	case MENU_V_uint16:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_uint16.value, u8g2_menu->u8g2_menuValue.v_uint16.adjValue, u8g2_menu->u8g2_menuValue.v_uint16.minValue, k);
		break;
	case MENU_V_uint32:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_uint32.value, u8g2_menu->u8g2_menuValue.v_uint32.adjValue, u8g2_menu->u8g2_menuValue.v_uint32.minValue, k);
		break;
	case MENU_V_int8:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_int8.value, u8g2_menu->u8g2_menuValue.v_int8.adjValue, u8g2_menu->u8g2_menuValue.v_int8.minValue, k);
		break;
	case MENU_V_int16:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_int16.value, u8g2_menu->u8g2_menuValue.v_int16.adjValue, u8g2_menu->u8g2_menuValue.v_int16.minValue, k);
		break;
	case MENU_V_int32:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_int32.value, u8g2_menu->u8g2_menuValue.v_int32.adjValue, u8g2_menu->u8g2_menuValue.v_int32.minValue, k);
		break;
	case MENU_V_int:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_int.value, u8g2_menu->u8g2_menuValue.v_int.adjValue, u8g2_menu->u8g2_menuValue.v_int.minValue, k);
		break;
	case MENU_V_float:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_float.value, u8g2_menu->u8g2_menuValue.v_float.adjValue, u8g2_menu->u8g2_menuValue.v_float.minValue, k);
		break;
	case MENU_V_double:
		MenuSUBK(u8g2_menu->u8g2_menuValue.v_double.value, u8g2_menu->u8g2_menuValue.v_double.adjValue, u8g2_menu->u8g2_menuValue.v_double.minValue, k);
		break;
	case MENU_butten:
		break;
	}

#undef MenuSUBK
}

// 附加值减
void u8g2_MenuItemSub(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemSubS(u8g2_menu, 1);
}

// 选中
void u8g2_MenuItemSelect(u8g2_menu_t *u8g2_menu)
{
	u8g2_menu->currentSetValue = u8g2_menu->currentItem;
}

// 取消选中
void u8g2_MenuItemDeSelect(u8g2_menu_t *u8g2_menu)
{
	u8g2_menu->currentSetValue = -1;
}

// 获取选中状态
u8g2_int_t u8g2_MenuGetItemSelect(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentSetValue;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

void u8g2_MenuKeys(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)
{
	switch (u8g2_menuKeyValue)
	{
	case MENU_Key_None:
		break;
	case MENU_Key_Add:
		if (u8g2_MenuGetItemSelect(u8g2_menu) != -1)
		{
			u8g2_MenuItemAdd(u8g2_menu);
		}
		else
		{
			u8g2_MenuItemUp(u8g2_menu);
		}
		break;
	case MENU_Key_Sub:
		if (u8g2_MenuGetItemSelect(u8g2_menu) != -1)
		{
			u8g2_MenuItemSub(u8g2_menu);
		}
		else
		{
			u8g2_MenuItemDown(u8g2_menu);
		}
		break;
	case MENU_Key_Confirm:
		if (u8g2_MenuGetItemSelect(u8g2_menu) != -1)
		{
			u8g2_MenuItemDeSelect(u8g2_menu);
		}
		else
		{
			u8g2_MenuItemSelect(u8g2_menu);
		}
		break;
	}

	if (u8g2_menu->u8g2_menuValueType == MENU_butten)
	{
		u8g2_menu->u8g2_menuValue.button.but(u8g2_menu->u8g2_menuValue.button.ID, u8g2_menuKeyValue);
	}
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// 推理表项
u8g2_menu_t *u8g2_MenuDrawItemStart(void)
{
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return NULL;
	menu->currentDrawItemHeight = menu->totalLength - menu->_position;

	// 解除限制绘制区域
	u8g2_SetMaxClipWindow(menu->u8g2);
	return menu;
}

void u8g2_MenuDrawItemEnd(u8g2_menu_t *menu)
{
	if (!menu)
		return;
	++menu->currentDrawItem;
	menu->currentAttribute = MENU_Fix;
	menu->totalLength = (menu->currentDrawItemHeight + menu->_position) * menu->_rowHeight;

	// 解除限制绘制区域
	u8g2_SetMaxClipWindow(menu->u8g2);
	return;
}

void u8g2_MenuDrawItemStr(u8g2_uint_t (*u8g2_Draw)(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, const char *str), const char *str, u8g2_uint_t multiple)
{
	if (!u8g2_Draw)
		return;
	if (!multiple)
		return;
	u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
	if (!menu)
		return;

	u8g2_uint_t descent = u8g2_GetDescent(menu->u8g2) * multiple;

	menu->currentItemWidth = u8g2_GetStrWidth(menu->u8g2, str) * multiple;
	menu->currentItemHeight = u8g2_GetMaxCharHeight(menu->u8g2) * multiple;
	menu->currentDrawItemHeight += menu->currentItemHeight;

	u8g2_MenuSelectorCall(menu);

	u8g2_Draw(menu->u8g2, menu->currentX + menu->leftMargin + menu->leftMarginSelector + menu->_positionOffset, menu->currentDrawItemHeight + descent, str);

	menu->currentDrawItemHeight += menu->lineSpacingSelector;
	menu->currentDrawItemHeight += menu->lineSpacing;

	u8g2_MenuDrawItemEnd(menu);
}

u8g2_menu_t *u8g2_getMenuItemValue(MENU_Attribute_t MENU_Attribute)
{
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return NULL;
	menu->currentAttribute = MENU_Attribute;
	if (menu->currentItem != menu->currentDrawItem)
		return NULL;
	return menu;
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// 菜单显示字符串
void u8g2_MenuDrawStr(char *str)
{
	char *token;
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	token = strtok(str, "\n");
	while (token != NULL)
	{
		menu->currentContentWidth = u8g2_GetStrWidth(menu->u8g2, token);
		u8g2_MenuDrawItemStr(u8g2_DrawStr, token, 1);
		token = strtok(NULL, "\n");
	}
}

// 菜单显示字符串 二倍大
void u8g2_MenuDrawStrX2(char *str)
{
	char *token;
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	token = strtok(str, "\n");
	while (token != NULL)
	{
		menu->currentContentWidth = u8g2_GetStrWidth(menu->u8g2, token) * 2;
		u8g2_MenuDrawItemStr(u8g2_DrawStrX2, token, 2);
		token = strtok(NULL, "\n");
	}
}

// 菜单显示UTF-8字符集
void u8g2_MenuDrawUTF8(char *str)
{
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	menu->currentContentWidth = u8g2_GetUTF8Width(menu->u8g2, str);
	u8g2_MenuDrawItemStr(u8g2_DrawUTF8, str, 1);
}

// 菜单显示UTF-8字符集 二倍大
void u8g2_MenuDrawUTF8X2(char *str)
{
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	menu->currentContentWidth = u8g2_GetUTF8Width(menu->u8g2, str) * 2;
	u8g2_MenuDrawItemStr(u8g2_DrawUTF8X2, str, 2);
}

// 菜单格式化输出
void u8g2_MenuPrintf(u8g2_MenuDraw_t u8g2_MenuDraw, const char *fmt, ...)
{
	char buffer[64];
	va_list arg_ptr;
	va_start(arg_ptr, fmt);
	vsnprintf(buffer, 64, fmt, arg_ptr);
	va_end(arg_ptr);
	u8g2_MenuDraw(buffer);
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// 追加附加值

#include <stdarg.h>

void u8g2_MenuItemValue_uint8_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_uint8) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	uint8_t* value = va_arg(arg_ptr, uint8_t*);
	int8_t adjValue = va_arg(arg_ptr, int);
	uint8_t minValue = va_arg(arg_ptr, int);
	uint8_t maxValue = va_arg(arg_ptr, int);
	u8g2_MenuItemValue_uint8(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_int8_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_int8) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	int8_t* value = va_arg(arg_ptr, int8_t*);
	int8_t adjValue = va_arg(arg_ptr, int);
	int8_t minValue = va_arg(arg_ptr, int);
	int8_t maxValue = va_arg(arg_ptr, int);
	u8g2_MenuItemValue_int8(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_uint16_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_uint16) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	uint16_t* value = va_arg(arg_ptr, uint16_t*);
	int16_t adjValue = va_arg(arg_ptr, int);
	uint16_t minValue = va_arg(arg_ptr, int);
	uint16_t maxValue = va_arg(arg_ptr, int);
	u8g2_MenuItemValue_uint16(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_int16_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_int16) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	int16_t* value = va_arg(arg_ptr, int16_t*);
	int16_t adjValue = va_arg(arg_ptr, int);
	int16_t minValue = va_arg(arg_ptr, int);
	int16_t maxValue = va_arg(arg_ptr, int);
	u8g2_MenuItemValue_int16(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_uint32_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_uint32) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	uint32_t* value = va_arg(arg_ptr, uint32_t*);
	int32_t adjValue = va_arg(arg_ptr, int32_t);
	uint32_t minValue = va_arg(arg_ptr, uint32_t);
	uint32_t maxValue = va_arg(arg_ptr, uint32_t);
	u8g2_MenuItemValue_uint32(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_int32_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_int32) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	int32_t* value = va_arg(arg_ptr, int32_t*);
	int32_t adjValue = va_arg(arg_ptr, int32_t);
	int32_t minValue = va_arg(arg_ptr, int32_t);
	int32_t maxValue = va_arg(arg_ptr, int32_t);
	u8g2_MenuItemValue_int32(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_int_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_int) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	int* value = va_arg(arg_ptr, int*);
	int adjValue = va_arg(arg_ptr, int);
	int minValue = va_arg(arg_ptr, int);
	int maxValue = va_arg(arg_ptr, int);
	u8g2_MenuItemValue_int(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_float_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_float) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	float* value = va_arg(arg_ptr, float*);
	float adjValue = va_arg(arg_ptr, double);
	float minValue = va_arg(arg_ptr, double);
	float maxValue = va_arg(arg_ptr, double);
	u8g2_MenuItemValue_float(value, adjValue, minValue, maxValue);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue_double_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_V_double) return;
	
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	double* value = va_arg(arg_ptr, double*);
	double adjValue = va_arg(arg_ptr, double);
	double minValue = va_arg(arg_ptr, double);
	double maxValue = va_arg(arg_ptr, double);
	u8g2_MenuItemValue_double(value, adjValue, minValue, maxValue);
	
	va_end(arg_ptr);
}
void u8g2_MenuItem_button_arg(MENU_V_type_t V_type, ...)
{
	if(V_type != MENU_butten) return;

	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	u8g2_MenuButton_t but = va_arg(arg_ptr, u8g2_MenuButton_t);
	uint8_t ID = va_arg(arg_ptr, int);
	u8g2_MenuItem_button(but, ID);

	va_end(arg_ptr);
}
void u8g2_MenuItemValue(MENU_V_type_t V_type, ...)
{
	va_list arg_ptr;
	va_start(arg_ptr, V_type);

	u8g2_MenuItemValue_uint8_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_int8_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_uint16_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_int16_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_uint32_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_int32_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_int_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_float_arg(V_type, arg_ptr);
	u8g2_MenuItemValue_double_arg(V_type, arg_ptr);
	u8g2_MenuItem_button_arg(V_type, arg_ptr);

	va_end(arg_ptr);
}

void u8g2_MenuItemValue_uint8(uint8_t *value, int8_t adjValue, uint8_t minValue, uint8_t maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_uint8;
	menu->u8g2_menuValue.v_uint8.value = value;
	menu->u8g2_menuValue.v_uint8.adjValue = adjValue;
	menu->u8g2_menuValue.v_uint8.minValue = minValue;
	menu->u8g2_menuValue.v_uint8.maxValue = maxValue;
}
void u8g2_MenuItemValue_uint16(uint16_t *value, int16_t adjValue, uint16_t minValue, uint16_t maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_uint16;
	menu->u8g2_menuValue.v_uint16.value = value;
	menu->u8g2_menuValue.v_uint16.adjValue = adjValue;
	menu->u8g2_menuValue.v_uint16.minValue = minValue;
	menu->u8g2_menuValue.v_uint16.maxValue = maxValue;
}
void u8g2_MenuItemValue_uint32(uint32_t *value, int32_t adjValue, uint32_t minValue, uint32_t maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_uint32;
	menu->u8g2_menuValue.v_uint32.value = value;
	menu->u8g2_menuValue.v_uint32.adjValue = adjValue;
	menu->u8g2_menuValue.v_uint32.minValue = minValue;
	menu->u8g2_menuValue.v_uint32.maxValue = maxValue;
}
void u8g2_MenuItemValue_int8(int8_t *value, int8_t adjValue, int8_t minValue, int8_t maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_int8;
	menu->u8g2_menuValue.v_int8.value = value;
	menu->u8g2_menuValue.v_int8.adjValue = adjValue;
	menu->u8g2_menuValue.v_int8.minValue = minValue;
	menu->u8g2_menuValue.v_int8.maxValue = maxValue;
}
void u8g2_MenuItemValue_int16(int16_t *value, int16_t adjValue, int16_t minValue, int16_t maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_int16;
	menu->u8g2_menuValue.v_int16.value = value;
	menu->u8g2_menuValue.v_int16.adjValue = adjValue;
	menu->u8g2_menuValue.v_int16.minValue = minValue;
	menu->u8g2_menuValue.v_int16.maxValue = maxValue;
}
void u8g2_MenuItemValue_int32(int32_t *value, int32_t adjValue, int32_t minValue, int32_t maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_int32;
	menu->u8g2_menuValue.v_int32.value = value;
	menu->u8g2_menuValue.v_int32.adjValue = adjValue;
	menu->u8g2_menuValue.v_int32.minValue = minValue;
	menu->u8g2_menuValue.v_int32.maxValue = maxValue;
}

void u8g2_MenuItemValue_int(int *value, int adjValue, int minValue, int maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_int;
	menu->u8g2_menuValue.v_int.value = value;
	menu->u8g2_menuValue.v_int.adjValue = adjValue;
	menu->u8g2_menuValue.v_int.minValue = minValue;
	menu->u8g2_menuValue.v_int.maxValue = maxValue;
}
void u8g2_MenuItemValue_float(float *value, float adjValue, float minValue, float maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_float;
	menu->u8g2_menuValue.v_float.value = value;
	menu->u8g2_menuValue.v_float.adjValue = adjValue;
	menu->u8g2_menuValue.v_float.minValue = minValue;
	menu->u8g2_menuValue.v_float.maxValue = maxValue;
}
void u8g2_MenuItemValue_double(double *value, double adjValue, double minValue, double maxValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_double;
	menu->u8g2_menuValue.v_double.value = value;
	menu->u8g2_menuValue.v_double.adjValue = adjValue;
	menu->u8g2_menuValue.v_double.minValue = minValue;
	menu->u8g2_menuValue.v_double.maxValue = maxValue;
}

void u8g2_MenuItem_button(u8g2_MenuButton_t but, uint8_t ID)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Fix);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_butten;
	menu->u8g2_menuValue.button.but = but;
	menu->u8g2_menuValue.button.ID = ID;
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// 获取当前选中项
u8g2_uint_t u8g2_MenuGetCurrentSelection(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentItem;
}

// 获取当前绘制的菜单
u8g2_menu_t *u8g2_MenuGetCurrentMenu(void)
{
	return currentMenu;
}
