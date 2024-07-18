#include "u8g2_menu.h"

/**
 * @brief 选中当前选中的表项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemSelect(u8g2_menu_t *u8g2_menu)
{
	u8g2_menu->currentSetValue = u8g2_menu->currentItem;
	if (u8g2_menu->u8g2_menuValueType == MENU_menu)
	{
		u8g2_MenuReplaceItem(u8g2_menu,u8g2_menu->u8g2_menuValue.menu.menuItem);
	}
}

/**
 * @brief 取消选中当前选中的表项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemDeSelect(u8g2_menu_t *u8g2_menu)
{
	u8g2_menu->currentSetValue = -1;
}

/**
 * @brief 获取当前表项的选中状态
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_int_t 选中状态
 */
u8g2_int_t u8g2_MenuGetItemSelect(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentSetValue;
}

/**
 * @brief 尝试增加当前选中的表项的附加值
 *
 * @param u8g2_menu 菜单对象
 * @param k 增加的步长
 *
 * @return void
 */
void u8g2_MenuItemAddS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k)
{
#define MenuADDK(v, a, m, k)                                                                                   \
	if (*(u8g2_menu->u8g2_menuValue.v) + (u8g2_menu->u8g2_menuValue.a) * (k) <= (u8g2_menu->u8g2_menuValue.m)) \
	*(u8g2_menu->u8g2_menuValue.v) += (u8g2_menu->u8g2_menuValue.a) * (k)

	switch (u8g2_menu->u8g2_menuValueType)
	{
	case MENU_V_uint8:
		MenuADDK(v_uint8.value, v_uint8.adjValue, v_uint8.maxValue, k);
		break;
	case MENU_V_uint16:
		MenuADDK(v_uint16.value, v_uint16.adjValue, v_uint16.maxValue, k);
		break;
	case MENU_V_uint32:
		MenuADDK(v_uint32.value, v_uint32.adjValue, v_uint32.maxValue, k);
		break;
	case MENU_V_int8:
		MenuADDK(v_int8.value, v_int8.adjValue, v_int8.maxValue, k);
		break;
	case MENU_V_int16:
		MenuADDK(v_int16.value, v_int16.adjValue, v_int16.maxValue, k);
		break;
	case MENU_V_int32:
		MenuADDK(v_int32.value, v_int32.adjValue, v_int32.maxValue, k);
		break;
	case MENU_V_int:
		MenuADDK(v_int.value, v_int.adjValue, v_int.maxValue, k);
		break;
	case MENU_V_float:
		MenuADDK(v_float.value, v_float.adjValue, v_float.maxValue, k);
		break;
	case MENU_V_double:
		MenuADDK(v_double.value, v_double.adjValue, v_double.maxValue, k);
		break;
	case MENU_V_switch:
		*(u8g2_menu->u8g2_menuValue.v_switch.value) = u8g2_menu->u8g2_menuValue.v_switch.openValue;
		break;
	case MENU_butten:
		break;
	case MENU_menu:
		break;
	case MENU_NC:
		break;
	}

#undef MenuADDK
}

/**
 * @brief 尝试增加当前选中的表项的附加值 只增加1
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemAdd(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemAddS(u8g2_menu, 1);
}

/**
 * @brief 尝试减少当前选中的表项的附加值
 *
 * @param u8g2_menu 菜单对象
 * @param k 减少的步长
 *
 * @return void
 */
void u8g2_MenuItemSubS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k)
{
#define MenuSUBK(v, a, m, k)                                                                                   \
	if (*(u8g2_menu->u8g2_menuValue.v) - (u8g2_menu->u8g2_menuValue.a) * (k) >= (u8g2_menu->u8g2_menuValue.m)) \
	*(u8g2_menu->u8g2_menuValue.v) -= (u8g2_menu->u8g2_menuValue.a) * (k)

	switch (u8g2_menu->u8g2_menuValueType)
	{
	case MENU_V_uint8:
		MenuSUBK(v_uint8.value, v_uint8.adjValue, v_uint8.minValue, k);
		break;
	case MENU_V_uint16:
		MenuSUBK(v_uint16.value, v_uint16.adjValue, v_uint16.minValue, k);
		break;
	case MENU_V_uint32:
		MenuSUBK(v_uint32.value, v_uint32.adjValue, v_uint32.minValue, k);
		break;
	case MENU_V_int8:
		MenuSUBK(v_int8.value, v_int8.adjValue, v_int8.minValue, k);
		break;
	case MENU_V_int16:
		MenuSUBK(v_int16.value, v_int16.adjValue, v_int16.minValue, k);
		break;
	case MENU_V_int32:
		MenuSUBK(v_int32.value, v_int32.adjValue, v_int32.minValue, k);
		break;
	case MENU_V_int:
		MenuSUBK(v_int.value, v_int.adjValue, v_int.minValue, k);
		break;
	case MENU_V_float:
		MenuSUBK(v_float.value, v_float.adjValue, v_float.minValue, k);
		break;
	case MENU_V_double:
		MenuSUBK(v_double.value, v_double.adjValue, v_double.minValue, k);
		break;
	case MENU_V_switch:
		*(u8g2_menu->u8g2_menuValue.v_switch.value) = !u8g2_menu->u8g2_menuValue.v_switch.openValue;
		break;
	case MENU_butten:
		break;
	case MENU_menu:
		break;
	case MENU_NC:
		break;
	}

#undef MenuSUBK
}

/**
 * @brief 尝试减少当前选中的表项的附加值 只减少1
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemSub(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemSubS(u8g2_menu, 1);
}

/**
 * @brief 设置菜单项值属性
 *
 * @param value 值
 * @param adjValue 步进值
 * @param minValue 最小值
 * @param maxValue 最大值
 *
 * @return void
 */
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
void u8g2_MenuItemValue_switch(uint8_t *value, uint8_t openValue)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_V_switch;
	menu->u8g2_menuValue.v_switch.value = value;
	menu->u8g2_menuValue.v_switch.openValue = openValue;
}
void u8g2_MenuItem_button(u8g2_MenuButton_cb but, uint8_t ID)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_butten;
	menu->u8g2_menuValue.button.but = but;
	menu->u8g2_menuValue.button.ID = ID;
}
void u8g2_MenuItem_menu(menuItem_cb menuItem)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_menu;
	menu->u8g2_menuValue.menu.menuItem = menuItem;
}
void u8g2_MenuItem_str(char *str, uint16_t len)
{
	u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
	if (!menu)
		return;
	menu->u8g2_menuValueType = MENU_str;
	menu->u8g2_menuValue.str.s = str;
	menu->u8g2_menuValue.str.s_len = len;
}
