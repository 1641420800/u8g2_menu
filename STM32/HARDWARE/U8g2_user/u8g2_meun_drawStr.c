#include "u8g2_menu.h"

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
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
    if (!menu)
        return;
    u8g2_MenuDrawItemSetSize(menu,u8g2_GetStrWidth(u8g2, str) * multiple, u8g2_GetMaxCharHeight(u8g2) * multiple);
    u8g2_MenuSelectorCall(menu);

    u8g2_int_t YH = u8g2_MenuGetY(menu) + u8g2_MenuGetH(menu);
    u8g2_Draw(u8g2, u8g2_MenuGetHorizontalOffset(menu), YH + u8g2_GetDescent(u8g2), str);
    
    u8g2_MenuDrawItemEnd(menu);
}

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
