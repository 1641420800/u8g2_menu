#include "u8g2_menu.h"
#include <stdlib.h>

uint8_t *layerBuff = NULL;
u8g2_t *layerU8g2 = NULL;


uint8_t *u8g2_MenuGetLayerBuff(void)
{
    static uint8_t buf[1024];
    return buf;
}

u8g2_t *u8g2_MenuStartLayer(u8g2_t *u8g2)
{
    if (!u8g2)
        return NULL;
    uint8_t *_layerBuff = u8g2_MenuGetLayerBuff();
    if (!_layerBuff)
    {
        layerU8g2 = NULL;
        return NULL;
    }
    layerBuff = u8g2_GetBufferPtr(u8g2);
    u8g2_GetBufferPtr(u8g2) = _layerBuff;
    u8g2_ClearBuffer(u8g2);
    return u8g2;
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
    layerBuff = NULL;
    layerU8g2 = NULL;
}
