/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库变量编辑功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示整型/浮点型/开关量的菜单编辑功能，配套按键消抖+定时器驱动
  *                   支持Uint32/Float/Switch三种变量类型的实时修改，适配128x64 OLED屏
  ******************************************************************************
  */

// 硬件驱动层头文件（STM32定时器/延时/矩阵按键驱动）
#include "tim.h"     // 定时器驱动（用于按键扫描定时）
#include "delay.h"   // 延时函数（保障OLED/IIC通信时序）
#include "gpio.h"        // GPIO驱动（初始化按键/外设的GPIO引脚）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（含IIC通信、u8g2初始化）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（必须包含）

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，管理OLED绘图上下文
 *        u8g2_menu: U8g2菜单库实例，管理菜单状态/绘制/交互
 *        variable_xxx: 待在菜单中编辑的测试变量
 */
u8g2_t u8g2;                  // U8g2图形库实例
u8g2_menu_t u8g2_menu;        // U8g2菜单库实例
uint32_t variable_uint32 = 0; // 待编辑的32位无符号整型变量（初始值0）
float variable_float = 0.0f;  // 待编辑的浮点型变量（初始值0.0）
uint8_t variable_sw = 0;      // 待编辑的开关量变量（0=关，1=开）

/**
 * @brief  菜单页面1绘制回调函数 - 变量编辑功能演示
 * @note   核心规则：变量绑定API必须写在对应显示函数的**上方**，才能将编辑功能绑定到该行
 *         每行仅能绑定一个API，若有多个API最近的将生效
 *         显示函数仅作为"功能载体"，即使不显示变量值，编辑功能依然生效
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    /* 以下是菜单库支持的所有数值绑定API（注释仅作参考，实际使用时按需调用）
    void u8g2_MenuItemValue_uint8(uint8_t *value, int8_t adjValue, uint8_t minValue, uint8_t maxValue);
    void u8g2_MenuItemValue_uint16(uint16_t *value, int16_t adjValue, uint16_t minValue, uint16_t maxValue);
    void u8g2_MenuItemValue_uint32(uint32_t *value, int32_t adjValue, uint32_t minValue, uint32_t maxValue);
    void u8g2_MenuItemValue_int8(int8_t *value, int8_t adjValue, int8_t minValue, int8_t maxValue);
    void u8g2_MenuItemValue_int16(int16_t *value, int16_t adjValue, int16_t minValue, int16_t maxValue);
    void u8g2_MenuItemValue_int32(int32_t *value, int32_t adjValue, int32_t minValue, int32_t maxValue);
    void u8g2_MenuItemValue_int(int *value, int adjValue, int minValue, int maxValue);
    void u8g2_MenuItemValue_float(float *value, float adjValue, float minValue, float maxValue);
    void u8g2_MenuItemValue_double(double *value, double adjValue, double minValue, double maxValue);
    void u8g2_MenuItemValue_switch(uint8_t *value, uint8_t openValue);
    */

    // ==================== 32位无符号整型变量绑定示例 ====================
    // 参数说明：
    // &variable_uint32: 待编辑的变量指针
    // 2: 每次加减的步长（按Up/Sub键时变量变化量）
    // 0: 变量最小值限制
    // 100: 变量最大值限制
    u8g2_MenuItemValue_uint32(&variable_uint32, 2, 0, 100);    
    // 显示变量值（功能绑定的载体，必须调用；即使不显示数值，编辑功能仍生效）
    u8g2_MenuUTF8Printf("v:%d", variable_uint32);    

    // ==================== 浮点型变量绑定示例 ====================
    // 参数说明：
    // &variable_float: 待编辑的浮点变量指针
    // 0.1: 每次加减的步长（浮点型步长）
    // 0: 变量最小值限制
    // 100: 变量最大值限制
    u8g2_MenuItemValue_float(&variable_float, 0.1f, 0.0f, 100.0f);    
    // 显示浮点变量（保留1位小数，作为功能绑定载体）
    u8g2_MenuUTF8Printf("f:%.1f", variable_float);    

    // ==================== 开关量变量绑定示例 ====================
    // 参数说明：
    // &variable_sw: 待编辑的开关变量指针
    // 1: 开关"打开"时的取值（按下Enter键切换0/1）
    u8g2_MenuItemValue_switch(&variable_sw, 1);    
    // 显示开关状态（0=off，1=on），作为功能绑定载体
    u8g2_MenuUTF8Printf("s:%s", variable_sw ? "on" : "off");    
}

/**
 * @brief  OLED显示封装函数
 * @note   统一管理菜单绘制逻辑，便于后续扩展
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单核心函数
    // 参数：菜单实例 | 绘制起始X坐标 | 绘制起始Y坐标 | 菜单宽度 | 菜单高度
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   由定时器中断调用，定时扫描矩阵按键并上报给菜单库
 * @param  time: 扫描间隔（单位：ms，此处由定时器1ms中断传入）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 按键消抖扫描API调用说明：
    // &u8g2_menu: 菜单实例指针
    // MENU_Key_Up: 菜单库定义的按键类型（上键）
    // !KEY_1: 硬件按键状态（!表示低电平有效，需根据硬件电路调整）
    // time: 扫描时间间隔（ms）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数
 * @note   1ms中断一次，调用按键扫描函数，实现按键消抖和长按检测
 * @param  无
 * @retval 无
 */
void tim2_IRQ(void)
{
    // 调用按键扫描函数，传入1ms的扫描间隔
    keyScann(1);
}

/**
 * @brief  主函数（程序入口）
 * @note   初始化流程：延时 → OLED → 菜单 → 定时器 → 主循环刷新显示
 * @param  无
 * @retval 无
 */
int main(void)
{
    delay_init();       // 初始化延时函数（保障IIC/OLED通信时序稳定）
    gpio_init();        // 初始化GPIO（矩阵按键/外设引脚配置）
    
    // 初始化OLED硬件并绑定u8g2实例（底层IIC初始化、屏幕复位）
    oled_u8g2_init(&u8g2);
    
    // 设置菜单默认字体（10x20像素无衬线字体，适配变量显示）
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);
    
    // 创建菜单（核心初始化）
    // 参数：U8g2实例 | 菜单实例 | 默认显示的菜单页面回调函数
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1);
    
    // 初始化定时器2（定时1ms中断）
    // 参数说明：1000-1: 自动重装值，72-1: 预分频值（72MHz时钟→1ms中断）
    tim2_init(1000-1, 72-1);
  
    // 主循环（程序常驻，持续刷新屏幕）
    while(1)
    {
        // 清空U8g2显存缓冲区（避免上一帧内容残留）
        u8g2_ClearBuffer(&u8g2);
        
        // 调用封装函数绘制菜单（变量编辑逻辑在menuItem_1中实现）
        oled_display(&u8g2);
        
        // 将显存缓冲区数据发送到OLED屏幕（完成一帧显示）
        u8g2_SendBuffer(&u8g2);
    }
}
