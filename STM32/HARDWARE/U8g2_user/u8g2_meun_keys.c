#include "u8g2_menu.h"

/**
 * @brief 菜单按键扫描
 *
 * @param u8g2_menu 菜单对象
 * @param u8g2_menuKeyValue 按键值
 * @param key 按键状态
 * @param time 执行周期
 *
 * @return void
 */
void u8g2_MenuKeyScann(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue, uint8_t key, uint16_t time)
{
	if(u8g2_menuKeyValue >= MENU_Key_Num) return;

	u8g2_menu->keyTim[u8g2_menuKeyValue] += time;
	if(u8g2_menu->keyTim[u8g2_menuKeyValue] > MenuKey_holdTime && u8g2_menu->keyTim[u8g2_menuKeyValue] < MenuKey_holdTime + MenuKey_repeatTime && key != 0)
	{
		u8g2_menu->keyTim[u8g2_menuKeyValue] = MenuKey_holdTime + MenuKey_repeatTime;
		u8g2_MenuKeys(u8g2_menu,u8g2_menuKeyValue);
	}
	else if(u8g2_menu->keyTim[u8g2_menuKeyValue] > MenuKey_holdTime + MenuKey_repeatTime * 2 && key != 0)
	{
		u8g2_menu->keyTim[u8g2_menuKeyValue] = MenuKey_holdTime + MenuKey_repeatTime;
		u8g2_MenuKeys(u8g2_menu,u8g2_menuKeyValue);
	}

	if(key == 0 && u8g2_menu->keyLog[u8g2_menuKeyValue] != 0)
	{
		u8g2_menu->keyTim[u8g2_menuKeyValue] = 0;
	}
	if(key != 0 && u8g2_menu->keyLog[u8g2_menuKeyValue] == 0)
	{
		if(u8g2_menu->keyTim[u8g2_menuKeyValue] <= MenuKey_holdTime)
		{
			u8g2_MenuKeys(u8g2_menu,u8g2_menuKeyValue);
		}
	}
	
	u8g2_menu->keyLog[u8g2_menuKeyValue] = key;
}
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
    
    u8g2_menuKeyEvent(u8g2_menu, &u8g2_menuKeyValue);
    
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
	default:
		break;
	}
	if (u8g2_menu->u8g2_menuValueType == MENU_button)
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
