#include "u8g2_menu.h"
#include <stdlib.h>

uint8_t *layerBuff = NULL;
u8g2_t *layerU8g2 = NULL;
u8g2_t *u8g2_MenuStartLayer()
{
    u8g2_menu_t *u8g2_menu = u8g2_MenuGetCurrentMenu();
    layerU8g2 = u8g2_MenuGetU8g2(u8g2_menu);
    if (!layerU8g2)
        return NULL;
    uint8_t *_layerBuff = (uint8_t *)malloc(layerU8g2->tile_buf_height * 128);
    if (!_layerBuff)
    {
        layerU8g2 = NULL;
        return NULL;
    }
    layerBuff = u8g2_GetBufferPtr(layerU8g2);
    u8g2_GetBufferPtr(layerU8g2) = _layerBuff;
    u8g2_ClearBuffer(layerU8g2);
    return layerU8g2;
}

void u8g2_MenuEndLayer(Layer_t layer)
{
    uint8_t *_layerBuff = u8g2_GetBufferPtr(layerU8g2);

    switch (layer)
    {
    case LayerAND:
        for (int i = 0; i < layerU8g2->tile_buf_height * 128; ++i)
        {
            layerBuff[i] &= _layerBuff[i];
        }
        break;
    case LayerOR:
        for (int i = 0; i < layerU8g2->tile_buf_height * 128; ++i)
        {
            layerBuff[i] |= _layerBuff[i];
        }
        break;
    case LayerXOR:
        for (int i = 0; i < layerU8g2->tile_buf_height * 128; ++i)
        {
            layerBuff[i] ^= _layerBuff[i];
        }
        break;
    case LayerXNOR:
        for (int i = 0; i < layerU8g2->tile_buf_height * 128; ++i)
        {
            layerBuff[i] = (layerBuff[i] & _layerBuff[i]) | (~layerBuff[i] & ~_layerBuff[i]);
        }
        break;
    }
    u8g2_GetBufferPtr(layerU8g2) = layerBuff;
    free(_layerBuff);
    layerBuff = NULL;
    layerU8g2 = NULL;
}
