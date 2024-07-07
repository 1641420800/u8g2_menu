#include "u8g2_menu.h"

/* 宏定义 */
#ifndef ABS
#define ABS(s) ((s) < 0 ? -(s) : (s))
#endif
#ifndef limitingAmplitude
#define limitingAmplitude(d, min, max) ((d) < (min) ? (min) : (d) > (max) ? (max) \
																		  : (d))
#endif

// 当前正在绘制的菜单
u8g2_menu_t *currentMenu = NULL;

/**
 * @brief 创建一个菜单
 *
 * @param u8g2 u8g2对象
 * @param u8g2_menu 菜单对象
 * @param menuItem 菜单项
 * @param menuSelector 选择器
 *
 * @return void
 */
void u8g2_CreateMenu_Selector(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_t menuItem, menuSelector_t menuSelector)
{
	if (!u8g2 || !u8g2_menu || !menuItem || !menuSelector)
		return;

	memset(u8g2_menu, 0, sizeof(u8g2_menu_t));
	u8g2_menu->u8g2 = u8g2;
	u8g2_menu->menuItem = menuItem;
	u8g2_menu->menuSelector = menuSelector;
	u8g2_menu->currentSetValue = -1;
	u8g2_menu->positionOffset_spe = 0.1;
	u8g2_menu->positionOffset_strHeaderLen = 5;
	u8g2_MenuEffectBind(u8g2_menu, &u8g2_MenuEffect);
}

/**
 * @brief 使用默认选择器创建一个菜单
 *
 * @param u8g2 u8g2对象
 * @param u8g2_menu 菜单对象
 * @param menuItem 菜单项函数
 *
 * @return void
 */
void u8g2_CreateMenu(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_t menuItem)
{
	u8g2_CreateMenu_Selector(u8g2, u8g2_menu, menuItem, u8g2_MenuSelector);
}

/**
 * @brief 更新菜单项函数
 *
 * @param u8g2_menu 菜单对象
 * @param menuItem 菜单项函数
 *
 * @return void
 */
void u8g2_MenuReplaceItem(u8g2_menu_t *u8g2_menu, menuItem_t menuItem)
{
	u8g2_menu->menuItem = menuItem;
	u8g2_menu->currentItem = 0;
	u8g2_menuEffectShrink_call(u8g2_menu);
}

/**
 * @brief 更新选择器函数
 *
 * @param u8g2_menu 菜单对象
 * @param menuSelector 选择器函数
 *
 * @return void
 */
void u8g2_MenuReplaceSelector(u8g2_menu_t *u8g2_menu, menuSelector_t menuSelector)
{
	u8g2_menu->menuSelector = menuSelector;
}

/**
 * @brief 获取当前菜单项的属性
 *
 * @param u8g2_menu 菜单对象
 *
 * @return MENU_Attribute_t 菜单项属性
 */
MENU_Attribute_t u8g2_MenuGetAttribute(u8g2_menu_t *u8g2_menu)
{
	if (u8g2_menu->currentDrawItem == u8g2_menu->currentItem)
	{
		return u8g2_menu->currentAttribute;
	}
	return MENU_None;
}

/**
 * @brief 设置菜单项的相对位置
 * @note 本函式是预留给选择器使用的 选择器函数可调用本函数来控制具体的绘制位置
 *
 * @param u8g2_menu 菜单对象
 * @param leftMarginSelector 选择器左边距
 * @param topMarginSelector 选择器上边距
 * @param lineSpacingSelector 选择器行间距
 *
 * @return void
 *
 */
void u8g2_MenuSetPosition(u8g2_menu_t *u8g2_menu, u8g2_uint_t leftMarginSelector, u8g2_uint_t topMarginSelector, u8g2_uint_t lineSpacingSelector)
{
	u8g2_menu->leftMarginSelector = leftMarginSelector;
	u8g2_menu->topMarginSelector = topMarginSelector;
	u8g2_menu->lineSpacingSelector = lineSpacingSelector;

	u8g2_menu->totalLength += u8g2_menu->topMarginSelector;
}

/**
 * @brief 获取当前菜单项的X坐标
 * @note 菜单绘制过程中调用有效 一般在选择器函数中调用
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_int_t 菜单项的X坐标
 */
u8g2_int_t u8g2_MenuGetX(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentX + u8g2_menu->leftMarginSelector;
}

/**
 * @brief 获取当前菜单项的Y坐标
 * @note 菜单绘制过程中调用有效 一般在选择器函数中调用
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_int_t 菜单项的Y坐标
 */
u8g2_int_t u8g2_MenuGetY(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->totalLength - u8g2_menu->currentItemHeight + u8g2_menu->topMarginSelector;
}

/**
 * @brief 获取当前菜单项的高度
 * @note 菜单绘制过程中调用有效 一般在选择器函数中调用
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_int_t 菜单项的高度
 */
u8g2_int_t u8g2_MenuGetH(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentItemHeight - u8g2_menu->topMarginSelector;
}

/**
 * @brief 获取当前菜单项的宽度
 * @note 菜单绘制过程中调用有效 一般在选择器函数中调用
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_int_t 菜单项的宽度
 */
u8g2_int_t u8g2_MenuGetW(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentWidth - u8g2_menu->leftMarginSelector;
}

/**
 * @brief 获取当前菜单项的水平偏移
 * @note 菜单绘制过程中调用有效
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_int_t 菜单项的水平偏移
 */
u8g2_int_t u8g2_MenuGetHorizontalOffset(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentX + u8g2_menu->leftMarginSelector + u8g2_menu->_positionOffset * u8g2_GetMaxCharWidth(u8g2_menu->u8g2);
}

/**
 * @brief 设置水平移动的速度
 *
 * @param u8g2_menu 菜单对象
 * @param spe 移动的速度 含义为每次刷新移动多少字符
 *
 * @return void
 */
void u8g2_MenuSetPositionOffsetSpe(u8g2_menu_t *u8g2_menu, float spe)
{
	if(spe > 0) spe = -spe;
	if(spe == 0) spe = -0.01;
	u8g2_menu->positionOffset_spe = spe;
}

/**
 * @brief 设置水平移动的头停留长度
 *
 * @param u8g2_menu 菜单对象
 * @param spe 移动的头停留长度
 *
 * @return void
 */
void u8g2_MenuSetPositionOffsetStrHeaderLen(u8g2_menu_t *u8g2_menu, float strHeaderLen)
{
	u8g2_menu->positionOffset_strHeaderLen = strHeaderLen;
}

/**
 * @brief 调用选择器函数
 * @note 本函数负责调用选择器函数及前后的处理
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuSelectorCall(u8g2_menu_t *u8g2_menu)
{
	u8g2_int_t x, y, w, h;

	// 是否处于选中状态
	if (u8g2_menu->currentSetValue != -1 && u8g2_menu->currentDrawItem == u8g2_menu->currentItem && u8g2_menu->currentItem == u8g2_menu->currentSetValue)
	{
		// 当前菜单项处于可写状态则选中 否则恢复
		if (u8g2_menu->currentAttribute == MENU_Writable)
		{
			u8g2_menu->currentAttribute = MENU_WritableSelect;
		}
		else if (u8g2_menu->currentAttribute == MENU_Fix)
		{
			u8g2_menu->currentSetValue = -1;
		}
	}

	// 调用选择器函数
	if (u8g2_menu->menuSelector)
		u8g2_menu->menuSelector(u8g2_menu);

	// 计算剪裁窗口
	x = u8g2_menu->currentX + u8g2_menu->leftMarginSelector;
	y = u8g2_menu->totalLength - u8g2_menu->currentItemHeight;
	w = u8g2_menu->currentWidth - u8g2_menu->leftMarginSelector;
	h = u8g2_menu->currentItemHeight + u8g2_menu->topMarginSelector;

	// 限制剪裁窗口
	x = limitingAmplitude(x, u8g2_menu->currentX, u8g2_menu->currentX + u8g2_menu->currentWidth);
	y = limitingAmplitude(y, u8g2_menu->currentY, u8g2_menu->currentY + u8g2_menu->currentHeight);
	w = limitingAmplitude(x + w, u8g2_menu->currentX, u8g2_menu->currentX + u8g2_menu->currentWidth);
	h = limitingAmplitude(y + h, u8g2_menu->currentY, u8g2_menu->currentY + u8g2_menu->currentHeight);

	// 设置剪裁窗口
	u8g2_SetClipWindow(u8g2_menu->u8g2, x, y, w, h);

	// 水平滚动
	if (u8g2_menu->currentItemLog != u8g2_menu->currentItem)
	{
		u8g2_menu->positionOffset = u8g2_menu->positionOffset_strHeaderLen;
		u8g2_menu->currentItemLog = u8g2_menu->currentItem;
	}
	u8g2_menu->_positionOffset = 0;

	// 判断绘制到选中的项
	if (u8g2_menu->currentDrawItem == u8g2_menu->currentItem)
	{
		// 移动到选中的项
		u8g2_menuEffectMoveItem_call(u8g2_menu);

		// 判断选中的项是否宽度超过屏幕
		if (u8g2_menu->currentItemWidth > w)
		{
			// 起点坐标向左偏移
			u8g2_menu->positionOffset -= u8g2_menu->positionOffset_spe;
			// 判断移动完成
			if (u8g2_menu->positionOffset * u8g2_GetMaxCharWidth(u8g2_menu->u8g2) + u8g2_menu->currentItemWidth <= 0)
			{
				u8g2_menu->positionOffset = u8g2_menu->positionOffset_strHeaderLen;
			}

			// 判断偏移量
			if (u8g2_menu->positionOffset > 0)
				u8g2_menu->_positionOffset = 0;
			else if (u8g2_menu->positionOffset * u8g2_GetMaxCharWidth(u8g2_menu->u8g2) + u8g2_menu->currentItemWidth <= w * 0.5)
				u8g2_menu->_positionOffset = (w * 0.5 - u8g2_menu->currentItemWidth) / u8g2_GetMaxCharWidth(u8g2_menu->u8g2);
			else
				u8g2_menu->_positionOffset = u8g2_menu->positionOffset;
		}
	}
}

/**
 * @brief 绘制滑块条
 *
 * @param u8g2_menu 菜单对象
 * @param x 滑块条X坐标
 * @param y 滑块条Y坐标
 * @param w 滑块条宽度
 * @param h 滑块条高度
 * @param schedule 滑块条进度
 * @param proportion 滑块条比例
 *
 * @return void
 */
void u8g2_DrawVSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion)
{
	schedule = limitingAmplitude(schedule, 0, 1);
	proportion = limitingAmplitude(proportion, 0, 1);
	u8g2_DrawVLine(u8g2, x + w / 2, y, h);
	u8g2_DrawBox(u8g2, x, y + h * (1 - proportion) * schedule, w, h * proportion);
}

/**
 * @brief 绘制菜单
 *
 * @param u8g2_menu 菜单对象
 * @param x 菜单X坐标
 * @param y 菜单Y坐标
 * @param w 菜单宽度
 * @param h 菜单高度
 *
 * @return void
 */
void u8g2_DrawMenu(u8g2_menu_t *u8g2_menu, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h)
{
	if (!u8g2_menu || w < 6)
		return;
	// 设置当前绘制的菜单
	currentMenu = u8g2_menu;
	u8g2_menu->currentX = x;
	u8g2_menu->currentY = y;
	u8g2_menu->currentWidth = w - 6;
	u8g2_menu->currentHeight = h;
	// 绘制表项
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
			(float)(u8g2_MenuEffectGetPos(u8g2_menu) + y) / (u8g2_menu->totalLength - h),
			limitingAmplitude((float)h / u8g2_menu->totalLength, 0.2, 1));
	}
	u8g2_menuEffectExpandc_call(u8g2_menu);
	// 清除当前绘制的菜单
	currentMenu = NULL;
}

/**
 * @brief 尝试上移当前选中的表项
 *
 * @param u8g2_menu 菜单对象
 * @param i 移动的步长
 *
 * @return void
 */
void u8g2_MenuItemUpS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i)
{
	u8g2_menu->currentItem -= i;
}

/**
 * @brief 尝试上移当前选中的表项 只移动1项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemUp(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemUpS(u8g2_menu, 1);
}

/**
 * @brief 尝试下移当前选中的表项
 *
 * @param u8g2_menu 菜单对象
 * @param i 移动的步长
 *
 * @return void
 */
void u8g2_MenuItemDownS(u8g2_menu_t *u8g2_menu, u8g2_uint_t i)
{
	u8g2_menu->currentItem += i;
}

/**
 * @brief 尝试下移当前选中的表项 只移动1项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemDown(u8g2_menu_t *u8g2_menu)
{
	u8g2_MenuItemDownS(u8g2_menu, 1);
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
	case MENU_butten:
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
	case MENU_butten:
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
 * @brief 选中当前选中的表项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemSelect(u8g2_menu_t *u8g2_menu)
{
	u8g2_menu->currentSetValue = u8g2_menu->currentItem;
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
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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

/**
 * @brief 菜单项绘制开始
 * @note 菜单项绘制开始前，获取当前菜单对象，并设置剪裁窗口
 *
 * @return u8g2_menu_t* 菜单对象
 */
u8g2_menu_t *u8g2_MenuDrawItemStart(void)
{
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return NULL;
	menu->totalLength = menu->totalLength - u8g2_MenuEffectGetPos(menu);
	u8g2_SetClipWindow(menu->u8g2, menu->currentX, menu->currentY, menu->currentX + menu->currentWidth, menu->currentY + menu->currentHeight);
	return menu;
}

/**
 * @brief 菜单项绘制结束
 * @note 菜单项绘制结束后，恢复剪裁窗口
 *
 * @return void
 */
void u8g2_MenuDrawItemEnd(u8g2_menu_t *menu)
{
	if (!menu)
		return;
#if U8G2_MENU_DEBUG
	u8g2_int_t x = u8g2_MenuGetX(menu);
	u8g2_int_t y = u8g2_MenuGetY(menu);
	u8g2_int_t w = u8g2_MenuGetW(menu);
	u8g2_int_t h = u8g2_MenuGetH(menu);
	u8g2_DrawFrame(menu->u8g2, x, y, w, h);
#endif
	++menu->currentDrawItem;
	menu->currentAttribute = MENU_Fix;
	menu->totalLength = (menu->totalLength + u8g2_MenuEffectGetPos(menu)) * u8g2_MenuEffectGetRowHeight(menu);
	u8g2_SetClipWindow(menu->u8g2, menu->currentX, menu->currentY, menu->currentX + menu->currentWidth, menu->currentY + menu->currentHeight);
	return;
}

/**
 * @brief 菜单项绘制字符串
 *
 * @param u8g2_Draw 绘制函数
 * @param str 字符串
 * @param multiple 放大倍数
 *
 * @return void
 */
void u8g2_MenuDrawItemStr(u8g2_uint_t (*u8g2_Draw)(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, const char *str), const char *str, u8g2_uint_t multiple)
{
	if (!u8g2_Draw || !multiple)
		return;
	u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
	if (!menu)
		return;
	u8g2_uint_t descent = u8g2_GetDescent(menu->u8g2) * multiple;
	menu->currentItemWidth = u8g2_GetStrWidth(menu->u8g2, str) * multiple;
	menu->currentItemHeight = u8g2_GetMaxCharHeight(menu->u8g2) * multiple;
	menu->totalLength += menu->currentItemHeight;
	u8g2_MenuSelectorCall(menu);
	u8g2_Draw(menu->u8g2, u8g2_MenuGetHorizontalOffset(menu), menu->totalLength + descent, str);
	menu->totalLength += menu->lineSpacingSelector;
	u8g2_MenuDrawItemEnd(menu);
}

/**
 * @brief 设置附加值属性并返回菜单对象
 * @note 设置附加值之前需调用本函数来获取菜单对象并设置附加值属性 禁止直接获取菜单对象
 *
 * @param MENU_Attribute 属性
 *
 * @return u8g2_menu_t* 菜单对象
 */
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

/**
 * @brief 字符串项显示函数
 * @note 在菜单项绘制函数中调用本函数来显示字符串
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawStr(char *str)
{
	char *token;
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	token = strtok(str, "\n");
	while (token != NULL)
	{
		u8g2_MenuDrawItemStr(u8g2_DrawStr, token, 1);
		token = strtok(NULL, "\n");
	}
}

/**
 * @brief 字符串项显示函数 2倍大
 * @note 在菜单项绘制函数中调用本函数来显示字符串 2倍大
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawStrX2(char *str)
{
	char *token;
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	token = strtok(str, "\n");
	while (token != NULL)
	{
		u8g2_MenuDrawItemStr(u8g2_DrawStrX2, token, 2);
		token = strtok(NULL, "\n");
	}
}

/**
 * @brief 字符串项显示函数 UTF-8
 * @note 在菜单项绘制函数中调用本函数来显示字符串 UTF-8
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawUTF8(char *str)
{
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	u8g2_MenuDrawItemStr(u8g2_DrawUTF8, str, 1);
}

/**
 * @brief 字符串项显示函数 2倍大 UTF-8
 * @note 在菜单项绘制函数中调用本函数来显示字符串 2倍大 UTF-8
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawUTF8X2(char *str)
{
	u8g2_menu_t *menu = u8g2_MenuGetCurrentMenu();
	if (!menu)
		return;
	u8g2_MenuDrawItemStr(u8g2_DrawUTF8X2, str, 2);
}

/**
 * @brief 字符串项格式化显示函数
 * @note 在菜单项绘制函数中调用本函数来显示字符串
 *
 * @param u8g2_MenuDraw 绘制函数
 * @param fmt 格式化字符串
 * @param ... 参数
 *
 * @return void
 */
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

/**
 * @brief 获取当前选中的菜单项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_uint_t 选中的菜单项
 */
u8g2_uint_t u8g2_MenuGetCurrentSelection(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->currentItem;
}

/**
 * @brief 获取当前绘制的菜单对象
 *
 * @return u8g2_menu_t* 菜单对象
 */
u8g2_menu_t *u8g2_MenuGetCurrentMenu(void)
{
	return currentMenu;
}

/**
 * @brief 获取菜单对象对应的u8g2对象
 *
 * @return u8g2_t* u8g2对象
 */
u8g2_t *u8g2_MenuGetU8g2(u8g2_menu_t *u8g2_menu)
{
	return u8g2_menu->u8g2;
}
