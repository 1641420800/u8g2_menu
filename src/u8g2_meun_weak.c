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

/**
 * @brief 用户自定义按键按下。
 *
 * @param u8g2_menu 菜单对象
 * @param u8g2_menuKeyValue 需处理的按键
 *
 * @return void
 */
WEAK void menuEventUserKey(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)
{
    /* 空函数 */
}

/**
 * @brief 任意按键按下。
 *
 * @param u8g2_menu 菜单对象
 * @param u8g2_menuKeyValue 需处理的按键
 *
 * @return uint8_t 事件是否已经处理 返回1将不进行继续处理 返回0将进行继续处理
 */
WEAK uint8_t menuEventKey(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)
{
    return 0;
}

/**
 * @brief 按键预处理事件（按键值修改/映射）。
 * @note 弱定义函数，可在外部重写，用于在按键事件分发前修改按键值
 *
 * @param u8g2_menu 菜单对象
 * @param u8g2_menuKeyValue 输入原始按键值，输出修改后的按键值（指针可修改）
 *
 * @return void 无返回值，直接通过指针修改按键值
 */
WEAK void menuEventKeyPre(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)
{
    if (!u8g2_menu || !u8g2_menuKeyValue) return;
    if (u8g2_MenuGetItemSelect(u8g2_menu) != -1)
    {
        if (*u8g2_menuKeyValue == MENU_Key_Up)
        {
            *u8g2_menuKeyValue = MENU_Key_Add;
        }
        if (*u8g2_menuKeyValue == MENU_Key_Down)
        {
            *u8g2_menuKeyValue = MENU_Key_Sub;
        }
        if (*u8g2_menuKeyValue == MENU_Key_Enter)
        {
            *u8g2_menuKeyValue = MENU_Key_Return;
        }
    }
}
