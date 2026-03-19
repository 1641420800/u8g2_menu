#include "u8g2_menu.h"


/* ----------- | 默认效果 | ----------- */
// 效果类型 效果器自定义
// 设置效果类型 公共函数
// 初始化效果器
// 推理效果 尽量放到定时器里 需要包含表项的移动和选择器的移动

// 推理展开效果 - 初始化
u8g2_int_t u8g2_Menu_init(u8g2_menu_t *u8g2_menu)
{
	u8g2_menu->menuEffect._rowHeight = ROW_HEIGHT_INCREMENT;
    return 0;
}

// 推理表项移动效果
u8g2_int_t u8g2_Menu_run(u8g2_menu_t *u8g2_menu)
{
    if (u8g2_menu == NULL) {
        return -1; // 错误处理，返回一个错误码
    }

    // 通过 _rowHeight 实现菜单展开动画
    if (u8g2_menu->menuEffect._rowHeight < MAX_ROW_HEIGHT) {
        u8g2_menu->menuEffect._rowHeight += ROW_HEIGHT_INCREMENT;
    } else {
        u8g2_menu->menuEffect._rowHeight = MAX_ROW_HEIGHT;
    }

    // 计算并调整spe
    float spe_adj = (u8g2_menu->pickItemY + u8g2_menu->lineSpacingSelector >= u8g2_menu->currentHeight + u8g2_menu->currentY) ?
                    (u8g2_menu->pickItemY + u8g2_menu->lineSpacingSelector - u8g2_menu->currentHeight - u8g2_menu->currentY) / SPE_ADJUSTMENT + 1 :
                    (u8g2_menu->pickItemY - u8g2_menu->pickItemHeight <= u8g2_menu->currentY) ?
                    (u8g2_menu->pickItemY - u8g2_menu->pickItemHeight - u8g2_menu->currentY) / SPE_ADJUSTMENT - 1 : 0;

    // 应用spe调整值
    u8g2_menu->menuEffect._position += spe_adj;
    u8g2_menu->pickItemY += spe_adj;
    return 0;
}


u8g2_menu_effect_t u8g2_MenuEffect = {u8g2_Menu_init, u8g2_Menu_run};
/* ----------- | 默认效果 | ----------- */

// 绑定效果
void u8g2_MenuEffectBind(u8g2_menu_t *u8g2_menu, u8g2_menu_effect_t *u8g2_menu_effect)
{
    u8g2_menu->menuEffect = *u8g2_menu_effect;
    u8g2_menu->menuEffect.u8g2_menuEffect_init(u8g2_menu);
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

u8g2_int_t u8g2_menuEffect_init_call(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return -1;
    if(!u8g2_menu->menuEffect.u8g2_menuEffect_init) return -1;
    return u8g2_menu->menuEffect.u8g2_menuEffect_init(u8g2_menu);
}
u8g2_int_t u8g2_menuEffect_run_call(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return -1;
    if(!u8g2_menu->menuEffect.u8g2_menuEffect_run) return -1;
    return u8g2_menu->menuEffect.u8g2_menuEffect_run(u8g2_menu);
}
