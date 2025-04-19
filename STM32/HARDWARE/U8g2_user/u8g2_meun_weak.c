#include "u8g2_menu.h"


/**
 * @brief 选中菜单项时的处理函数。
 *
 * 用户应重写以实现自定义逻辑。默认为空操作。
 * 在非特权模式下执行，不支持需特权访问的代码。
 *
 * @param u8g2_menu 菜单对象
 * @param item 选中的菜单项索引
 *
 * @return void
 */
WEAK void u8g2_menuItemEnter(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
    /* 空函数 */
}

/**
 * @brief 离开菜单项时的处理函数。
 *
 * 用户应重写以实现自定义逻辑。默认为空操作。
 * 在非特权模式下执行，不支持需特权访问的代码。
 *
 * @param u8g2_menu 菜单对象
 * @param item 离开的菜单项索引
 *
 * @return void
 */
WEAK void u8g2_menuItemLeave(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
    /* 空函数 */
}

/**
 * @brief 托管给菜单的值增加了。
 *
 * @param p 变化值的地址
 *
 * @return void
 */
WEAK void u8g2_menuValueAdd(void * p)
{
    /* 空函数 */
}

/**
 * @brief 托管给菜单的值减少了。
 *
 * @param p 变化值的地址
 *
 * @return void
 */
WEAK void u8g2_menuValueSub(void * p)
{
    /* 空函数 */
}

/**
 * @brief 托管给菜单的值变化了。
 *
 * @param p 变化值的地址
 *
 * @return void
 */
WEAK void u8g2_menuValueChange(void * p)
{
    /* 空函数 */
}

/**
 * @brief 按键输入事件。
 *
 * @param u8g2_menu 菜单对象
 * @param u8g2_menuKeyValue 事件按键 - 可在此修改
 *
 * @return void
 */
WEAK void u8g2_menuKeyEvent(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)
{
    /* 空函数 */
}

/**
 * @brief 字符输入事件。
 *
 * @param u8g2_menu 菜单对象
 * @param c 输入的字符 - 可在此修改
 *
 * @return void
 */
WEAK void u8g2_menuCharEvent(u8g2_menu_t *u8g2_menu, char *c)
{
    /* 空函数 */
}

/**
 * @brief 事件过滤器。
 *
 * @param u8g2_menu 菜单对象
 * @param eventItem 需处理的事件
 *
 * @return uint8_t 返回 0 表示事件需进一步处理
 */
WEAK uint8_t menuEventUserHandle(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t * eventItem)
{
    /* 空函数 */
    return 0;
}
