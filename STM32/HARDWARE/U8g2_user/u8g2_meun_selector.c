#include "u8g2_menu.h"

#define nonNegative(d) ((d) < 0 ? 0 : (d))

// 默认的选择展示器
void u8g2_MenuSelector(u8g2_menu_t *u8g2_menu)
{
    u8g2_MenuSelectorRotundity(u8g2_menu);
}

// 选择展示器 圆形
void u8g2_MenuSelectorRotundity(u8g2_menu_t *u8g2_menu)
{
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(u8g2_menu); // 获取当前菜单的u8g2对象
    u8g2_int_t x,y,h;

    // 设置菜单项位置 u8g2_menu,左边距,顶边据,行间距  设置后菜单项位置会改变
    u8g2_MenuSetPosition(u8g2_menu,16,0,0);

    // 获取菜单项坐标 需要先设置位置
    x = u8g2_MenuGetX(u8g2_menu);
    y = u8g2_MenuGetY(u8g2_menu);
    h = u8g2_MenuGetH(u8g2_menu);

    switch (u8g2_MenuGetAttribute(u8g2_menu))
    {
    case MENU_None: // 未选中
        break;
    case MENU_Fix: // 不可调
        u8g2_DrawCircle(u8g2, x - 10, y + h / 2, 5, U8G2_DRAW_ALL);
        break;
    case MENU_Writable: // 可调
        u8g2_DrawCircle(u8g2, x - 10, y + h / 2, 2, U8G2_DRAW_ALL);
        u8g2_DrawCircle(u8g2, x - 10, y + h / 2, 5, U8G2_DRAW_ALL);
        break;
    case MENU_WritableSelect: // 可调并选中
        u8g2_DrawDisc(u8g2, x - 10, y + h / 2, 5, U8G2_DRAW_ALL);
        break;
    }
}

// 选择展示器 方形
void u8g2_MenuSelectorSquare(u8g2_menu_t *u8g2_menu)
{
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(u8g2_menu); // 获取当前菜单的u8g2对象
    u8g2_int_t x,y,h;

    // 设置菜单项位置 u8g2_menu,左边距,顶边据,行间距  设置后菜单项位置会改变
    u8g2_MenuSetPosition(u8g2_menu,16,0,0);

    // 获取菜单项坐标 需要先设置位置
    x = u8g2_MenuGetX(u8g2_menu);
    y = u8g2_MenuGetY(u8g2_menu);
    h = u8g2_MenuGetH(u8g2_menu);

    switch (u8g2_MenuGetAttribute(u8g2_menu))
    {
    case MENU_None: // 未选中
        break;
    case MENU_Fix: // 不可调
        u8g2_DrawFrame(u8g2,x - 14, y + h / 2 - 6, 12, 12);
        u8g2_DrawLine(u8g2,nonNegative(x - 14), nonNegative(y + h / 2 - 6), nonNegative(x - 3), nonNegative(y + h / 2 + 5));
        u8g2_DrawLine(u8g2,nonNegative(x - 14), nonNegative(y + h / 2 + 5), nonNegative(x - 3), nonNegative(y + h / 2 - 6));
        break;
    case MENU_Writable: // 可调
        u8g2_DrawFrame(u8g2,x - 14, y + h / 2 - 6, 12, 12);
        break;
    case MENU_WritableSelect: // 可调并选中
        u8g2_DrawFrame(u8g2,x - 14, y + h / 2 - 6, 12, 12);
        u8g2_DrawBox(u8g2,x - 12, y + h / 2 - 4, 8, 8);
        break;
    }
}
