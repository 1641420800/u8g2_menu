#include "u8g2_menu.h"

/**
 * @brief 选中当前选中的表项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemSelect(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu)
        return;
    u8g2_menu->currentSetValue = u8g2_menu->currentItem;
    if (u8g2_menu->u8g2_menuValueType == MENU_button)
    {
        u8g2_menu->u8g2_menuValue.button.but(u8g2_menu, u8g2_menu->u8g2_menuValue.button.ID, MENU_Key_Enter);
    }
}

/**
 * @brief 取消选中当前选中的表项
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemDeSelect(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu)
        return;
    u8g2_menu->currentSetValue = -1;
    if (u8g2_menu->u8g2_menuValueType == MENU_button)
    {
        u8g2_menu->u8g2_menuValue.button.but(u8g2_menu, u8g2_menu->u8g2_menuValue.button.ID, MENU_Key_Return);
    }
}

/**
 * @brief 获取当前表项的选中状态
 *
 * @param u8g2_menu 菜单对象
 *
 * @return u8g2_int_t 选中状态
 */
u8g2_int_t u8g2_MenuGetItemSelect(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu)
        return -1;
    return u8g2_menu->currentSetValue;
}

/**
 * @brief 整型附加值边界处理 内部实现
 * @note mode为MENU_WRAP时在区间内绕回 否则停在边界 计算提升到64位防止溢出与下溢
 *
 * @param next 计算后的新值
 * @param minValue 最小值
 * @param maxValue 最大值
 * @param mode 边界模式
 *
 * @return int64_t 处理后的值
 */
static int64_t u8g2_menu_limit_int(int64_t next, int64_t minValue, int64_t maxValue, MENU_LimitMode_t mode)
{
    int64_t span;

    if (mode == MENU_WRAP && maxValue > minValue)
    {
        span = maxValue - minValue + 1;
        next = minValue + ((next - minValue) % span + span) % span;
        return next;
    }
    if (next < minValue)
        next = minValue;
    if (next > maxValue)
        next = maxValue;
    return next;
}

/**
 * @brief 浮点附加值边界处理 内部实现
 * @note mode为MENU_WRAP时在区间内绕回 否则停在边界
 *
 * @param next 计算后的新值
 * @param minValue 最小值
 * @param maxValue 最大值
 * @param mode 边界模式
 *
 * @return double 处理后的值
 */
static double u8g2_menu_limit_float(double next, double minValue, double maxValue, MENU_LimitMode_t mode)
{
    double span;

    if (mode == MENU_WRAP && maxValue > minValue)
    {
        span = maxValue - minValue;
        next = minValue + fmod(fmod(next - minValue, span) + span, span);
        return next;
    }
    if (next < minValue)
        next = minValue;
    if (next > maxValue)
        next = maxValue;
    return next;
}

// 整型附加值加减与边界处理宏 isAdd:1加 0减
#define MenuADDSUB(s, k, isAdd)\
    do {\
        int64_t _next = (int64_t)(*(u8g2_menu->u8g2_menuValue.s.value));\
        if (isAdd)\
            _next += (int64_t)(u8g2_menu->u8g2_menuValue.s.adjValue) * (int64_t)(k);\
        else\
            _next -= (int64_t)(u8g2_menu->u8g2_menuValue.s.adjValue) * (int64_t)(k);\
        *(u8g2_menu->u8g2_menuValue.s.value) = u8g2_menu_limit_int(_next,\
            (int64_t)(u8g2_menu->u8g2_menuValue.s.minValue),\
            (int64_t)(u8g2_menu->u8g2_menuValue.s.maxValue),\
            u8g2_menu->u8g2_menuValueLimitMode);\
    } while (0)

// 浮点附加值加减与边界处理宏 isAdd:1加 0减
#define MenuADDSUBF(s, k, isAdd)\
    do {\
        double _next = (double)(*(u8g2_menu->u8g2_menuValue.s.value));\
        if (isAdd)\
            _next += (u8g2_menu->u8g2_menuValue.s.adjValue) * (double)(k);\
        else\
            _next -= (u8g2_menu->u8g2_menuValue.s.adjValue) * (double)(k);\
        *(u8g2_menu->u8g2_menuValue.s.value) = u8g2_menu_limit_float(_next,\
            (u8g2_menu->u8g2_menuValue.s.minValue),\
            (u8g2_menu->u8g2_menuValue.s.maxValue),\
            u8g2_menu->u8g2_menuValueLimitMode);\
    } while (0)

/**
 * @brief 尝试增加当前选中的表项的附加值
 *
 * @param u8g2_menu 菜单对象
 * @param k 增加的步长
 *
 * @return void
 */
void u8g2_MenuItemAddS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k)
{
    if(!u8g2_menu)
        return;
    switch (u8g2_menu->u8g2_menuValueType)
    {
    case MENU_V_uint8:
        MenuADDSUB(v_uint8, k, 1);
        break;
    case MENU_V_uint16:
        MenuADDSUB(v_uint16, k, 1);
        break;
    case MENU_V_uint32:
        MenuADDSUB(v_uint32, k, 1);
        break;
    case MENU_V_int8:
        MenuADDSUB(v_int8, k, 1);
        break;
    case MENU_V_int16:
        MenuADDSUB(v_int16, k, 1);
        break;
    case MENU_V_int32:
        MenuADDSUB(v_int32, k, 1);
        break;
    case MENU_V_int:
        MenuADDSUB(v_int, k, 1);
        break;
    case MENU_V_float:
        MenuADDSUBF(v_float, k, 1);
        break;
    case MENU_V_double:
        MenuADDSUBF(v_double, k, 1);
        break;
    case MENU_V_switch:
        *(u8g2_menu->u8g2_menuValue.v_switch.value) = u8g2_menu->u8g2_menuValue.v_switch.openValue;
        break;
    case MENU_button:
    case MENU_menu:
    case MENU_menu_enter:
    case MENU_menu_back:
    case MENU_NC:
    default:
        return;
    }
    u8g2_menuValueAdd_weak(u8g2_menu->u8g2_menuValue.v_uint8.value);
    u8g2_menuValueChange_weak(u8g2_menu->u8g2_menuValue.v_uint8.value);
}

/**
 * @brief 尝试增加当前选中的表项的附加值 只增加1
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemAdd(u8g2_menu_t *u8g2_menu)
{
    u8g2_MenuItemAddS(u8g2_menu, 1);
}

/**
 * @brief 尝试减少当前选中的表项的附加值
 *
 * @param u8g2_menu 菜单对象
 * @param k 减少的步长
 *
 * @return void
 */
void u8g2_MenuItemSubS(u8g2_menu_t *u8g2_menu, u8g2_uint_t k)
{
    if(!u8g2_menu)
        return;
    switch (u8g2_menu->u8g2_menuValueType)
    {
    case MENU_V_uint8:
        MenuADDSUB(v_uint8, k, 0);
        break;
    case MENU_V_uint16:
        MenuADDSUB(v_uint16, k, 0);
        break;
    case MENU_V_uint32:
        MenuADDSUB(v_uint32, k, 0);
        break;
    case MENU_V_int8:
        MenuADDSUB(v_int8, k, 0);
        break;
    case MENU_V_int16:
        MenuADDSUB(v_int16, k, 0);
        break;
    case MENU_V_int32:
        MenuADDSUB(v_int32, k, 0);
        break;
    case MENU_V_int:
        MenuADDSUB(v_int, k, 0);
        break;
    case MENU_V_float:
        MenuADDSUBF(v_float, k, 0);
        break;
    case MENU_V_double:
        MenuADDSUBF(v_double, k, 0);
        break;
    case MENU_V_switch:
        *(u8g2_menu->u8g2_menuValue.v_switch.value) = !u8g2_menu->u8g2_menuValue.v_switch.openValue;
        break;
    case MENU_button:
    case MENU_menu:
    case MENU_menu_enter:
    case MENU_menu_back:
    case MENU_NC:
    default:
        return;
    }
    u8g2_menuValueSub_weak(u8g2_menu->u8g2_menuValue.v_uint8.value);
    u8g2_menuValueChange_weak(u8g2_menu->u8g2_menuValue.v_uint8.value);
#undef MenuADDSUB
#undef MenuADDSUBF
}

/**
 * @brief 尝试减少当前选中的表项的附加值 只减少1
 *
 * @param u8g2_menu 菜单对象
 *
 * @return void
 */
void u8g2_MenuItemSub(u8g2_menu_t *u8g2_menu)
{
    u8g2_MenuItemSubS(u8g2_menu, 1);
}

/**
 * @brief 设置菜单项值属性
 *
 * @param value 值
 * @param adjValue 步进值
 * @param minValue 最小值
 * @param maxValue 最大值
 * @param mode 边界模式(到边界停住/绕回)
 *
 * @return void
 */
void u8g2_MenuItemValue_uint8(uint8_t *value, int8_t adjValue, uint8_t minValue, uint8_t maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_uint8;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_uint8.value = value;
    menu->u8g2_menuValue.v_uint8.adjValue = adjValue;
    menu->u8g2_menuValue.v_uint8.minValue = minValue;
    menu->u8g2_menuValue.v_uint8.maxValue = maxValue;
}
void u8g2_MenuItemValue_uint16(uint16_t *value, int16_t adjValue, uint16_t minValue, uint16_t maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_uint16;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_uint16.value = value;
    menu->u8g2_menuValue.v_uint16.adjValue = adjValue;
    menu->u8g2_menuValue.v_uint16.minValue = minValue;
    menu->u8g2_menuValue.v_uint16.maxValue = maxValue;
}
void u8g2_MenuItemValue_uint32(uint32_t *value, int32_t adjValue, uint32_t minValue, uint32_t maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_uint32;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_uint32.value = value;
    menu->u8g2_menuValue.v_uint32.adjValue = adjValue;
    menu->u8g2_menuValue.v_uint32.minValue = minValue;
    menu->u8g2_menuValue.v_uint32.maxValue = maxValue;
}
void u8g2_MenuItemValue_int8(int8_t *value, int8_t adjValue, int8_t minValue, int8_t maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_int8;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_int8.value = value;
    menu->u8g2_menuValue.v_int8.adjValue = adjValue;
    menu->u8g2_menuValue.v_int8.minValue = minValue;
    menu->u8g2_menuValue.v_int8.maxValue = maxValue;
}
void u8g2_MenuItemValue_int16(int16_t *value, int16_t adjValue, int16_t minValue, int16_t maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_int16;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_int16.value = value;
    menu->u8g2_menuValue.v_int16.adjValue = adjValue;
    menu->u8g2_menuValue.v_int16.minValue = minValue;
    menu->u8g2_menuValue.v_int16.maxValue = maxValue;
}
void u8g2_MenuItemValue_int32(int32_t *value, int32_t adjValue, int32_t minValue, int32_t maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_int32;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_int32.value = value;
    menu->u8g2_menuValue.v_int32.adjValue = adjValue;
    menu->u8g2_menuValue.v_int32.minValue = minValue;
    menu->u8g2_menuValue.v_int32.maxValue = maxValue;
}
void u8g2_MenuItemValue_int(int *value, int adjValue, int minValue, int maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_int;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_int.value = value;
    menu->u8g2_menuValue.v_int.adjValue = adjValue;
    menu->u8g2_menuValue.v_int.minValue = minValue;
    menu->u8g2_menuValue.v_int.maxValue = maxValue;
}
void u8g2_MenuItemValue_float(float *value, float adjValue, float minValue, float maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_float;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_float.value = value;
    menu->u8g2_menuValue.v_float.adjValue = adjValue;
    menu->u8g2_menuValue.v_float.minValue = minValue;
    menu->u8g2_menuValue.v_float.maxValue = maxValue;
}
void u8g2_MenuItemValue_double(double *value, double adjValue, double minValue, double maxValue, MENU_LimitMode_t mode)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_double;
    menu->_u8g2_menuValueLimitMode = mode;
    menu->u8g2_menuValue.v_double.value = value;
    menu->u8g2_menuValue.v_double.adjValue = adjValue;
    menu->u8g2_menuValue.v_double.minValue = minValue;
    menu->u8g2_menuValue.v_double.maxValue = maxValue;
}
void u8g2_MenuItemValue_switch(uint8_t *value, uint8_t openValue)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_V_switch;
    menu->u8g2_menuValue.v_switch.value = value;
    menu->u8g2_menuValue.v_switch.openValue = openValue;
}
void u8g2_MenuItem_button(u8g2_MenuButton_cb but, uint8_t ID)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_button;
    menu->u8g2_menuValue.button.but = but;
    menu->u8g2_menuValue.button.ID = ID;
}
void u8g2_MenuItem_menu(menuItem_cb menuItem)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_menu;
    menu->u8g2_menuValue.menu.menuItem = menuItem;
}
void u8g2_MenuItem_menu_enter(menuItem_cb menuItem)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_menu_enter;
    menu->u8g2_menuValue.menu.menuItem = menuItem;
}
void u8g2_MenuItem_menu_back(void)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu)
        return;
    menu->_u8g2_menuValueType = MENU_menu_back;
}
void u8g2_MenuItem_str(char *str, uint16_t len)
{
    u8g2_menu_t *menu = u8g2_getMenuItemValue(MENU_Writable);
    if (!menu || !str)
        return;
    menu->_u8g2_menuValueType = MENU_str;
    menu->u8g2_menuValue.str.s = str;
    menu->u8g2_menuValue.str.s_len = len;
}
