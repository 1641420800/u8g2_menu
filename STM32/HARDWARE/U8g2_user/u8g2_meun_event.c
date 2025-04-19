#include "u8g2_menu.h"

/**
 * @brief 添加一个事件
 *
 * @param u8g2_menu 菜单对象
 * @param eventItem 被添加的事件
 *
 * @return uint8_t 返回 0 表示添加成功
 */
uint8_t u8g2_MenuEventRecord(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t * eventItem)
{
    if(!u8g2_menu || !eventItem) return 1;
    if(u8g2_menu->event.quantity >= U8G2_MENU_EVENT_Capacity) return 1;
    if(u8g2_menu->event.lock) return 1;
    
    u8g2_menu->event.lock = 1;
    size_t itemsWrite = u8g2_menu->event.itemsWrite;
    u8g2_menu->event.itemsWrite = (u8g2_menu->event.itemsWrite + 1) % U8G2_MENU_EVENT_Capacity;

    memcpy(&u8g2_menu->event.items[itemsWrite], eventItem, sizeof(u8g2_menu_event_item_t));
    
    u8g2_menu->event.quantity++;
    u8g2_menu->event.lock = 0;
    return 0;
}

/**
 * @brief 处理事件
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuEventProcess(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return;

    while(u8g2_menu->event.quantity)
    {
        u8g2_menu_event_item_t * item = &u8g2_menu->event.items[u8g2_menu->event.itemsRead];
        
        if(item->nextLoopRequired)
        {
            item->nextLoopRequired = 0;
            break;
        }
        
        u8g2_menu->event.itemsRead = (u8g2_menu->event.itemsRead + 1) % U8G2_MENU_EVENT_Capacity;

        if(menuEventUserHandle(u8g2_menu, item) == 0)
        {
            if(item->menuEventHandle) item->menuEventHandle(u8g2_menu, item->value);
        }
        --u8g2_menu->event.quantity;
        
    }
}

/**
 * @brief 获取当前事件暂存数
 *
 * @param u8g2_menu 菜单对象
 *
 * @return size_t 暂存的事件数量
 */
size_t u8g2_MenuEvent_getQuantity(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return 0;
    return u8g2_menu->event.quantity;
}
