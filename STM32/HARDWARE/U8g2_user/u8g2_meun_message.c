#include "u8g2_menu.h"


void u8g2_MenuMessageBoxTime_ISR(u8g2_menu_t *u8g2_menu, uint16_t ms)
{
    if(!u8g2_menu || !ms) return;
    
#if U8G2_MENU_MESSAGEBOX
    if(ms < u8g2_menu->drawMessageBoxTim)
    {
        u8g2_menu->drawMessageBoxTim -= ms;
    }
    else
    {
        u8g2_menu->drawMessageBoxTim = 0;
    }
#endif
}

void u8g2_menuMessageBoxCall(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return;
    if(!u8g2_menu->drawMessageBoxTim)
    {
        if(u8g2_menu->message)
        {
            free(u8g2_menu->message);
            u8g2_menu->message = NULL;
        }
        return;
    }
    
    u8g2_t *u8g2 = u8g2_menu->u8g2;
    
    if(u8g2_menu->drawMessageBox)
    {
        u8g2_SetDrawColor(u8g2,0);
        u8g2_DrawRBox(u8g2, (u8g2_GetDisplayWidth(u8g2) - u8g2_menu->messageBoxWidth) / 2, (u8g2_GetDisplayHeight(u8g2) - u8g2_menu->messageBoxHeight) / 2, u8g2_menu->messageBoxWidth, u8g2_menu->messageBoxHeight, 3);
        u8g2_SetDrawColor(u8g2,1);
        
        u8g2_menu->drawMessageBox(u8g2_menu->u8g2, u8g2_menu->messageBoxWidth, u8g2_menu->messageBoxHeight, u8g2_menu->message);
        
        u8g2_DrawRFrame(u8g2, (u8g2_GetDisplayWidth(u8g2) - u8g2_menu->messageBoxWidth) / 2, (u8g2_GetDisplayHeight(u8g2) - u8g2_menu->messageBoxHeight) / 2, u8g2_menu->messageBoxWidth, u8g2_menu->messageBoxHeight, 3);
    }
}

void u8g2_MenuDrawMessageBox(u8g2_menu_t *u8g2_menu, u8g2_MenuDrawMessageBox_cb drawMessageBox, void *message, u8g2_uint_t messageBoxWidth, u8g2_uint_t messageBoxHeight, uint32_t drawMessageBoxTim)
{
    if(!u8g2_menu || !drawMessageBox) return;
#if U8G2_MENU_MESSAGEBOX
    
    if(u8g2_menu->message)
    {
        free(u8g2_menu->message);
        u8g2_menu->message = NULL;
    }
    
    u8g2_menu->drawMessageBox = drawMessageBox;
    u8g2_menu->message = message;
    u8g2_menu->messageBoxWidth = messageBoxWidth;
    u8g2_menu->messageBoxHeight = messageBoxHeight;
    u8g2_menu->drawMessageBoxTim = drawMessageBoxTim;
#endif
}

// Çå³ýµ¯´°ÐÅÏ¢
void u8g2_MenuDrawMessageBoxClose(u8g2_menu_t *u8g2_menu)
{
    u8g2_MenuDrawMessageBox(u8g2_menu, NULL, NULL, 0, 0, 0);
}


void u8g2_MenuDrawMessageBox_drawStr(u8g2_t *u8g2, u8g2_uint_t width, u8g2_uint_t height, void *message)
{
    u8g2_DrawUTF8(u8g2, (u8g2_GetDisplayWidth(u8g2) - width) / 2 + 1, (u8g2_GetDisplayHeight(u8g2) - height) / 2 + u8g2_GetMaxCharHeight(u8g2) - 1, (const char*)message);
}

void u8g2_MenuDrawMessageBox_str(u8g2_menu_t *u8g2_menu, const char * str, uint32_t drawMessageBoxTim)
{
    char * p = (char*)malloc(strlen(str) + 1);
    strcpy(p, str);
    u8g2_MenuDrawMessageBox(u8g2_menu, u8g2_MenuDrawMessageBox_drawStr, (void*)p, u8g2_GetUTF8Width(u8g2_menu->u8g2, str) + 2, u8g2_GetMaxCharHeight(u8g2_menu->u8g2) + 2, drawMessageBoxTim);
}
