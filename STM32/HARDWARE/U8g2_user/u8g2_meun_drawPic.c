#include "u8g2_menu.h"


/**
 * @brief 菜单项绘制图片
 * 
 * @param drawXBM 绘制函数
 * @param w 宽度
 * @param h 高度
 * @param bitmap 图片
 * 
 * @return void
 */
void u8g2_MenuDrawItemPic(void (*drawXBM)(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap), u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap)
{
	if(!drawXBM)
		return;
	u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
	u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
	if (!menu)
		return;
	u8g2_MenuDrawItemSetSize(menu, w, h);
	u8g2_MenuSelectorCall(menu);

	u8g2_int_t X = u8g2_MenuGetX(menu);
	u8g2_int_t Y = u8g2_MenuGetY(menu);
	u8g2_int_t W = u8g2_MenuGetW(menu);
	u8g2_int_t H = u8g2_MenuGetH(menu);

	u8g2_SetClipWindow(u8g2, nonNegative(X), nonNegative(Y), nonNegative(X + W), nonNegative(Y + H));
	drawXBM(u8g2, u8g2_MenuGetHorizontalOffset(menu), Y, w, h, bitmap);

	u8g2_MenuDrawItemEnd(menu);
}

/**
 * @brief 菜单项绘制XBM
 * 
 * @param w 宽度
 * @param h 高度
 * @param bitmap 图片
 * 
 * @return void
 */
void u8g2_MenuDrawItemXBM(u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap)
{
	u8g2_MenuDrawItemPic(u8g2_DrawXBM, w, h, bitmap);
}

/**
 * @brief 菜单项绘制XBMP
 * 
 * @param w 宽度
 * @param h 高度
 * @param bitmap 图片
 * 
 * @return void
 */
void u8g2_MenuDrawItemXBMP(u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap)
{
	u8g2_MenuDrawItemPic(u8g2_DrawXBMP, w, h, bitmap);
}
