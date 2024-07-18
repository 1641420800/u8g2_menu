#include "u8g2_menu.h"

/**
 * @brief 绘制滑块条
 *
 * @param u8g2 u8g2对象
 * @param x x坐标
 * @param y y坐标
 * @param w 宽度
 * @param h 高度
 * @param schedule 滑块条位置
 * @param proportion 滑块条比例
 *
 * @return void
 */
void u8g2_DrawHSliderBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule, float proportion)
{
    schedule = limit(schedule, 0, 1);
    proportion = limit(proportion, 0, 1);
    u8g2_DrawHLine(u8g2, x, y + h / 2, w);
    u8g2_DrawBox(u8g2, x + w * (1 - proportion) * schedule, y, w * proportion + 1, h);
}

/**
 * @brief 绘制进度条
 *
 * @param u8g2 u8g2对象
 * @param x x坐标
 * @param y y坐标
 * @param w 宽度
 * @param h 高度
 * @param schedule 进度条位置
 *
 * @return void
 */
void u8g2_DrawHProgressBar(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, float schedule)
{
    schedule = limit(schedule, 0, 1);
    u8g2_DrawFrame(u8g2, x, y, w, h);
    u8g2_DrawBox(u8g2, x + 2, y + 2, (w - 4) * schedule, h - 4);
}

/**
 * @brief 菜单项绘制滑块条
 *
 * @param position 滑块条位置
 * @param proportion 滑块条比例
 *
 * @return void
 */
void u8g2_MenuDrawItemSliderProportion(float position, float proportion)
{
    u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
    if (!menu)
        return;
    u8g2_MenuDrawItemSetSize(menu, u8g2_MenuGetW(menu), u8g2_GetMaxCharHeight(u8g2));
    u8g2_MenuSelectorCall(menu);

    u8g2_int_t x = u8g2_MenuGetX(menu);
    u8g2_int_t y = u8g2_MenuGetY(menu);
    u8g2_int_t w = u8g2_MenuGetW(menu);
    u8g2_int_t h = u8g2_MenuGetH(menu);
    u8g2_DrawHSliderBar(u8g2, x, y + 2, w, h - 4, position, proportion);

    u8g2_MenuDrawItemEnd(menu);
}

/**
 * @brief 菜单项绘制滑块条
 *
 * @param position 滑块条位置
 *
 * @return void
 */
void u8g2_MenuDrawItemSlider(float position)
{
    u8g2_MenuDrawItemSliderProportion(position, 0.1);
}

/**
 * @brief 菜单项绘制滑块条 绑定附加值
 *
 * @param value 值
 * @param adjValue 步进值
 * @param minValue 最小值
 * @param maxValue 最大值
 *
 * @return void
 */
void u8g2_MenuDrawItemSlider_bind(int *value, int adjValue, int minValue, int maxValue)
{
    u8g2_MenuItemValue_int(value, adjValue, minValue, maxValue);
    u8g2_MenuDrawItemSliderProportion((float)(*value - minValue) / (maxValue - minValue), 0.1);
}

/**
 * @brief 菜单项绘制进度条
 *
 * @param position 进度条位置
 *
 * @return void
 */
void u8g2_MenuDrawItemProgressBar(float position)
{
    u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
    if (!menu)
        return;
    u8g2_MenuDrawItemSetSize(menu, u8g2_MenuGetW(menu), u8g2_GetMaxCharHeight(u8g2));
    u8g2_MenuSelectorCall(menu);

    u8g2_int_t x = u8g2_MenuGetX(menu);
    u8g2_int_t y = u8g2_MenuGetY(menu);
    u8g2_int_t w = u8g2_MenuGetW(menu);
    u8g2_int_t h = u8g2_MenuGetH(menu);
    u8g2_DrawHProgressBar(u8g2, x, y + 2, w, h - 4, position);

    u8g2_MenuDrawItemEnd(menu);
}

/**
 * @brief 菜单项绘制进度条 绑定附加值
 *
 * @param value 值
 * @param adjValue 步进值
 * @param minValue 最小值
 * @param maxValue 最大值
 *
 * @return void
 */
void u8g2_MenuDrawItemProgressBar_bind(int *value, int adjValue, int minValue, int maxValue)
{
    u8g2_MenuItemValue_int(value, adjValue, minValue, maxValue);
    u8g2_MenuDrawItemProgressBar((float)(*value - minValue) / (maxValue - minValue));
}
