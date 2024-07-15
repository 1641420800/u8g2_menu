#include "u8g2_menu.h"

/**
 * @brief 菜单按键处理
 *
 * @param u8g2_menu 菜单对象
 * @param u8g2_menuKeyValue 按键值
 *
 * @return void
 */
void u8g2_MenuKeys(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)
{
	// 根据是否选中进行按键映射
	if (u8g2_MenuGetItemSelect(u8g2_menu) != -1)
	{
		if (u8g2_menuKeyValue == MENU_Key_Up)
		{
			u8g2_MenuKeys(u8g2_menu, MENU_Key_Add);
			return;
		}
		if (u8g2_menuKeyValue == MENU_Key_Down)
		{
			u8g2_MenuKeys(u8g2_menu, MENU_Key_Sub);
			return;
		}
		if (u8g2_menuKeyValue == MENU_Key_Enter)
		{
			u8g2_MenuKeys(u8g2_menu, MENU_Key_Return);
			return;
		}
	}
	switch (u8g2_menuKeyValue)
	{
	case MENU_Key_None:
		break;
	case MENU_Key_Up:
		u8g2_MenuItemUp(u8g2_menu);
		break;
	case MENU_Key_Down:
		u8g2_MenuItemDown(u8g2_menu);
		break;
	case MENU_Key_Enter:
		u8g2_MenuItemSelect(u8g2_menu);
		break;
	case MENU_Key_Return:
		u8g2_MenuItemDeSelect(u8g2_menu);
		break;
	case MENU_Key_Add:
		u8g2_MenuItemAdd(u8g2_menu);
		break;
	case MENU_Key_Sub:
		u8g2_MenuItemSub(u8g2_menu);
		break;
	}
	if (u8g2_menu->u8g2_menuValueType == MENU_butten)
	{
		u8g2_menu->u8g2_menuValue.button.but(u8g2_menu->u8g2_menuValue.button.ID, u8g2_menuKeyValue);
	}
}

/**
 * @brief 菜单输入字符
 *
 * @param u8g2_menu 菜单对象
 * @param c 输入的字符
 *
 * @return void
 */
void u8g2_MenuInChar(u8g2_menu_t *u8g2_menu, char c)
{
	uint16_t len;
	if (u8g2_menu->u8g2_menuValueType == MENU_str && u8g2_MenuGetItemSelect(u8g2_menu) != -1)
	{
		len = strlen(u8g2_menu->u8g2_menuValue.str.s);
		if (U8G2_MENUKeyValue_Back == c)
		{
			if (len > 0)
				u8g2_menu->u8g2_menuValue.str.s[len - 1] = '\0';
		}
		else if (U8G2_MENUKeyValue_Clear == c)
		{
			u8g2_menu->u8g2_menuValue.str.s[0] = '\0';
		}
		else if (len + 1 < u8g2_menu->u8g2_menuValue.str.s_len && isprint(c))
		{
			u8g2_menu->u8g2_menuValue.str.s[len] = c;
			u8g2_menu->u8g2_menuValue.str.s[len + 1] = '\0';
		}
	}
}
