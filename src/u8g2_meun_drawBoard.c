#include "u8g2_menu.h"
#include <stdlib.h> 

/**
 * @brief 菜单项绘制画板
 *
 * @param u8g2_MenuDrawBoard 画板函数
 * @param width 画板宽度 不支持大于屏幕
 * @param height 画板高度 不支持大于屏幕
 *
 * @return void
 */
void u8g2_MenuDrawItemBoard(u8g2_MenuDrawBoard_cb u8g2_MenuDrawBoard, u8g2_uint_t width, u8g2_uint_t height)
{
    if (!u8g2_MenuDrawBoard)
        return;
    u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
    if (!menu)
        return;
    
    
    uint8_t *_layerBuff = u8g2_MenuGetLayerBuff();
    if (!_layerBuff)
    {
        // todo: error
        return;
    }
    
    u8g2_MenuDrawItemSetSize(menu, width, height);
    u8g2_MenuSelectorCall(menu);
    
    uint8_t *layerBuff = u8g2_GetBufferPtr(u8g2);
    u8g2_GetBufferPtr(u8g2) = _layerBuff;
    u8g2_ClearBuffer(u8g2);
    
    u8g2_SetClipWindow(u8g2,0,0,width,height);
    u8g2_MenuDrawBoard(u8g2);
    
    u8g2_int_t x = u8g2_MenuGetX(menu);
    u8g2_int_t y = u8g2_MenuGetY(menu);

    
    for (int _h = y < 0 ? -y : 0; _h < height; ++_h)
    {
        for (int _w = x < 0 ? -x : 0; _w < width; ++_w)
        {
#define GET_PIXEL(_X, _Y) ((uint8_t(*)[128])_layerBuff)[(_Y) / 8][(_X)] & (1 << (_Y) % 8)
#define SET_PIXEL(_X, _Y) ((uint8_t(*)[128])layerBuff)[(_Y) / 8][(_X)] |= (1 << ((_Y) % 8))
#define CLR_PIXEL(_X, _Y) ((uint8_t(*)[128])layerBuff)[(_Y) / 8][(_X)] &= (~(1 << (_Y) % 8))
            if (GET_PIXEL(_w, _h))
            {
                SET_PIXEL(_w + x, _h + y);
            }
            else
            {
                CLR_PIXEL(_w + x, _h + y);
            }
        }
    }
    u8g2_GetBufferPtr(u8g2) = layerBuff;
    u8g2_MenuDrawItemEnd(menu);
    u8g2_MenuRecordAdd(menu, "Board");
}
