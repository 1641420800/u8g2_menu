#include "u8g2_menu.h"


/* ----------- | 默认效果 | ----------- */
// 效果类型 效果器自定义
// 设置效果类型 公共函数
// 初始化效果器
// 推理效果 尽量放到定时器里 需要包含表项的移动和选择器的移动

// 推理展开效果 - 初始化
u8g2_int_t u8g2_MenuExpand(u8g2_menu_t *u8g2_menu)
{

	// 通过 _rowHeight 实现菜单展开动画
	if (u8g2_menu->menuEffect._rowHeight < 1)
		u8g2_menu->menuEffect._rowHeight += 0.2;
	else
		u8g2_menu->menuEffect._rowHeight = 1;
    return 0;
}

// 推理收缩效果 - 反初始化
u8g2_int_t u8g2_MenuShrink(u8g2_menu_t *u8g2_menu)
{
	u8g2_menu->menuEffect._rowHeight = 0;
    return 0;
}

// 推理表项移动效果
u8g2_int_t u8g2_MenuMoveItem(u8g2_menu_t *u8g2_menu)
{
    // 判断显示是否完整 是否需要移动
    if (u8g2_menu->totalLength + u8g2_menu->lineSpacingSelector >= u8g2_menu->currentHeight + u8g2_menu->currentY)
    {
        u8g2_menu->menuEffect.spe = u8g2_menu->totalLength + u8g2_menu->lineSpacingSelector - u8g2_menu->currentHeight - u8g2_menu->currentY;
        u8g2_menu->menuEffect.spe = u8g2_menu->menuEffect.spe / 2 + 1;
    }
    if (u8g2_menu->totalLength - u8g2_menu->currentItemHeight <= u8g2_menu->currentY)
    {
        u8g2_menu->menuEffect.spe = u8g2_menu->totalLength - u8g2_menu->currentItemHeight - u8g2_menu->currentY;
        u8g2_menu->menuEffect.spe = u8g2_menu->menuEffect.spe / 2 - 1;
    }

	u8g2_menu->menuEffect._position += u8g2_menu->menuEffect.spe;
    u8g2_menu->menuEffect.spe = 0;
    return 0;
}

// 推理选择器移动效果
u8g2_int_t u8g2_MenuMoveSelector(u8g2_menu_t *u8g2_menu)
{
    return 0;
}

u8g2_menu_effect_t u8g2_MenuEffect = {u8g2_MenuExpand, u8g2_MenuShrink, u8g2_MenuMoveItem, u8g2_MenuMoveSelector};
/* ----------- | 默认效果 | ----------- */

// 绑定效果
void u8g2_MenuEffectBind(u8g2_menu_t *u8g2_menu, u8g2_menu_effect_t *u8g2_menu_effect)
{
    u8g2_menu->menuEffect = *u8g2_menu_effect;
}

// 获取当前位置
u8g2_int_t u8g2_MenuEffectGetPos(u8g2_menu_t *u8g2_menu)
{
    return u8g2_menu->menuEffect._position;
}
// 获取当前行行高比
float u8g2_MenuEffectGetRowHeight(u8g2_menu_t *u8g2_menu)
{
    return u8g2_menu->menuEffect._rowHeight;
}

u8g2_int_t u8g2_menuEffectExpandc_call(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return -1;
    if(!u8g2_menu->menuEffect.u8g2_menuEffectExpandc) return -1;
    return u8g2_menu->menuEffect.u8g2_menuEffectExpandc(u8g2_menu);
}
u8g2_int_t u8g2_menuEffectShrink_call(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return -1;
    if(!u8g2_menu->menuEffect.u8g2_menuEffectShrink) return -1;
    return u8g2_menu->menuEffect.u8g2_menuEffectShrink(u8g2_menu);
}
u8g2_int_t u8g2_menuEffectMoveItem_call(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return -1;
    if(!u8g2_menu->menuEffect.u8g2_menuEffectMoveItem) return -1;
    return u8g2_menu->menuEffect.u8g2_menuEffectMoveItem(u8g2_menu);
}
u8g2_int_t u8g2_menuEffectMoveSelector_call(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return -1;
    if(!u8g2_menu->menuEffect.u8g2_menuEffectMoveSelector) return -1;
    return u8g2_menu->menuEffect.u8g2_menuEffectMoveSelector(u8g2_menu);
}

