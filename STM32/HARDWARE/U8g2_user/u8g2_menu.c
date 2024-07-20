#include "u8g2_menu.h"

// 当前正在绘制的菜单
u8g2_menu_t *currentMenu = NULL;

/**
 * @brief 选中菜单项时的处理函数。
 *
 * 用户应重写以实现自定义逻辑。默认为空操作。
 * 在非特权模式下执行，不支持需特权访问的代码。
 *
 * @param u8g2_menu 菜单对象
 * @param item 选中的菜单项索引
 *
 * @return void
 */
WEAK void u8g2_menuItemEnter(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
	/* 空函数 */
}

/**
 * @brief 离开菜单项时的处理函数。
 *
 * 用户应重写以实现自定义逻辑。默认为空操作。
 * 在非特权模式下执行，不支持需特权访问的代码。
 *
 * @param u8g2_menu 菜单对象
 * @param item 离开的菜单项索引
 *
 * @return void
 */
WEAK void u8g2_menuItemLeave(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
	/* 空函数 */
}

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
void u8g2_CreateMenu_Selector(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_cb menuItem, menuSelector_cb menuSelector)
{
	if (!u8g2 || !u8g2_menu || !menuItem || !menuSelector)
		return;

	memset(u8g2_menu, 0, sizeof(u8g2_menu_t));
	u8g2_menu->u8g2 = u8g2;
	u8g2_menu->menuItem = menuItem;
	u8g2_menu->menuSelector = menuSelector;
	u8g2_menu->currentSetValue = -1;
	u8g2_menu->positionOffset_spe = 0.2;
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
void u8g2_CreateMenu(u8g2_t *u8g2, u8g2_menu_t *u8g2_menu, menuItem_cb menuItem)
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
void u8g2_MenuReplaceItem(u8g2_menu_t *u8g2_menu, menuItem_cb menuItem)
{
	u8g2_menu->menuItem = menuItem;
	u8g2_menu->currentItem = 0;
	u8g2_menu->currentSetValue = -1;
	u8g2_menuEffect_init_call(u8g2_menu);
}

/**
 * @brief 更新选择器函数
 *
 * @param u8g2_menu 菜单对象
 * @param menuSelector 选择器函数
 *
 * @return void
 */
void u8g2_MenuReplaceSelector(u8g2_menu_t *u8g2_menu, menuSelector_cb menuSelector)
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
	if (spe > 0)
		spe = -spe;
	if (spe == 0)
		spe = -0.01;
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
	u8g2_int_t x = 0, y = 0, w = 0, h = 0;

	if (!u8g2_menu)
		return;
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
	u8g2_SetClipWindow(u8g2_menu->u8g2, u8g2_menu->currentX, u8g2_menu->currentY, u8g2_menu->currentX + u8g2_menu->currentWidth, u8g2_menu->currentY + u8g2_menu->currentHeight);
	// 调用选择器函数
	if (u8g2_menu->menuSelector)
		u8g2_menu->menuSelector(u8g2_menu);

	// 计算剪裁窗口
	x = u8g2_menu->currentX + u8g2_menu->leftMarginSelector;
	y = u8g2_menu->totalLength - u8g2_menu->currentItemHeight;
	w = u8g2_menu->currentWidth - u8g2_menu->leftMarginSelector;
	h = u8g2_menu->currentItemHeight + u8g2_menu->topMarginSelector;

	// 限制剪裁窗口
	x = limit(x, u8g2_menu->currentX, u8g2_menu->currentX + u8g2_menu->currentWidth);
	y = limit(y, u8g2_menu->currentY, u8g2_menu->currentY + u8g2_menu->currentHeight);
	w = limit(x + w, u8g2_menu->currentX, u8g2_menu->currentX + u8g2_menu->currentWidth) - x;
	h = limit(y + h, u8g2_menu->currentY, u8g2_menu->currentY + u8g2_menu->currentHeight) - y;

	// 设置剪裁窗口
	u8g2_SetClipWindow(u8g2_menu->u8g2, x, y, x + w, y + h);

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
		u8g2_menu->pickItemY = u8g2_menu->totalLength;
		u8g2_menu->pickItemHeight = u8g2_menu->currentItemHeight;

		// 判断选中的项是否宽度超过屏幕
		if (u8g2_menu->currentItemWidth > w)
		{
			// 起点坐标向左偏移
			u8g2_menu->positionOffset -= u8g2_menu->positionOffset_spe;
			// 判断移动完成
			if (u8g2_menu->positionOffset * u8g2_GetMaxCharWidth(u8g2_menu->u8g2) + u8g2_menu->currentItemWidth <= u8g2_menu->positionOffset_strHeaderLen)
			{
				u8g2_menu->positionOffset = u8g2_menu->positionOffset_strHeaderLen;
			}

			// 判断偏移量
			if (u8g2_menu->positionOffset > 0)
				u8g2_menu->_positionOffset = 0;
			else if (u8g2_menu->positionOffset * u8g2_GetMaxCharWidth(u8g2_menu->u8g2) + u8g2_menu->currentItemWidth <= w)
				u8g2_menu->_positionOffset = (float)(w - u8g2_menu->currentItemWidth) / u8g2_GetMaxCharWidth(u8g2_menu->u8g2);
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
	schedule = limit(schedule, 0, 1);
	proportion = limit(proportion, 0, 1);
	u8g2_DrawVLine(u8g2, x + w / 2, y, h);
	u8g2_DrawBox(u8g2, x, y + h * (1 - proportion) * schedule, w, h * proportion + 1);
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
	u8g2_menu->u8g2_menuValueType = MENU_NC;

	if (u8g2_menu->currentItemLog != u8g2_menu->currentItem)
	{
		u8g2_menuItemLeave(u8g2_menu, u8g2_menu->currentItemLog);
		u8g2_menuItemEnter(u8g2_menu, u8g2_menu->currentItem);
	}

	if (u8g2_menu->menuItem)
		u8g2_menu->menuItem();

	if(!u8g2_menu->timer_effective) u8g2_menuEffect_run_call(u8g2_menu);
	while(u8g2_menu->timer_effective && u8g2_menu->timer > U8G2_MENU_DELAY)
	{
		u8g2_menu->timer -= U8G2_MENU_DELAY;
		u8g2_menuEffect_run_call(u8g2_menu);
	}

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
			limit((float)h / u8g2_menu->totalLength, 0.2, 1));
	}
	// 清除当前绘制的菜单
	currentMenu = NULL;
}

/**
 * @brief 菜单定时器接口
 * 
 * @param u8g2_menu 菜单对象
 * @param ms 所过的毫秒数
 * 
 * @return void
 */
void u8g2_MenuTime_ISR(u8g2_menu_t *u8g2_menu, uint16_t ms)
{
	if(!u8g2_menu || !ms)
		return;
	u8g2_menu->timer += ms;
	u8g2_menu->timer_effective = 1;
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
	return menu;
}

// 设置绘制尺寸
void u8g2_MenuDrawItemSetSize(u8g2_menu_t *menu, u8g2_uint_t width, u8g2_uint_t height)
{
	if (!menu)
		return;
	menu->currentItemWidth = width;
	menu->currentItemHeight = height;
	menu->totalLength += menu->currentItemHeight;
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
	menu->totalLength += menu->lineSpacingSelector;
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
	if (menu->currentItem != menu->currentDrawItem)
		return NULL;
	menu->currentAttribute = MENU_Attribute;
	if (menu->currentItem != menu->currentDrawItem)
		return NULL;
	return menu;
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
	if (!u8g2_menu)
		return 0;
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
	if (!u8g2_menu)
		return NULL;
	return u8g2_menu->u8g2;
}
