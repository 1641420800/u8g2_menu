#include "u8g2_menu.h"

/* ----------- | 默认效果 | ----------- */
// 推理展开动画
u8g2_int_t u8g2_MenuExpand(u8g2_menu_t *u8g2_menu)
{

}

// 推理收缩动画
u8g2_int_t u8g2_MenuShrink(u8g2_menu_t *u8g2_menu)
{

}

// 推理表项移动动画
u8g2_int_t u8g2_MenuMoveItem(u8g2_menu_t *u8g2_menu)
{

}

// 推理选择器移动动画
u8g2_int_t u8g2_MenuMoveSelector(u8g2_menu_t *u8g2_menu)
{

}

// 绑定效果
void u8g2_MenuBindEffect(u8g2_menu_t *u8g2_menu)
{
    u8g2_menu->menuEffect.u8g2_menuEffectExpandc = u8g2_MenuExpand;
    u8g2_menu->menuEffect.u8g2_menuEffectShrink = u8g2_MenuShrink;
    u8g2_menu->menuEffect.u8g2_menuEffectMoveItem = u8g2_MenuMoveItem;
    u8g2_menu->menuEffect.u8g2_menuEffectMoveSelector = u8g2_MenuMoveSelector;
}

/* ----------- | 默认效果 | ----------- */