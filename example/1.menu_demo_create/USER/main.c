/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库基础示例 - 最小化菜单创建与字符串显示
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 基于U8g2图形库实现最简单的菜单显示，仅展示一行"Hello"字符串
  ******************************************************************************
  */

// 引入延时函数库（提供delay_init等延时初始化/操作函数）
#include "delay.h"

// 引入OLED硬件驱动库（包含u8g2初始化、IIC通信等底层操作）
#include "IIC_OLED.h"

// 引入U8g2菜单库核心头文件（必须包含，否则菜单相关API无法使用）
#include "u8g2_menu.h"

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，用于管理OLED显示的所有绘图操作
 *        u8g2_menu: U8g2菜单库核心实例，用于管理菜单的状态、绘制、交互等
 */
u8g2_t u8g2;          // U8g2图形库实例
u8g2_menu_t u8g2_menu;// U8g2菜单库实例

/**
 * @brief  菜单页面1绘制回调函数
 * @note   该函数由菜单库自动调用，用于定义当前菜单页面的显示内容
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    // 在当前菜单位置绘制UTF-8编码的字符串"Hello"
    // 注：该函数会自动处理菜单项的行位置、字体等，无需手动指定坐标
    u8g2_MenuUTF8Printf("Hello");
}

/**
 * @brief  OLED显示封装函数
 * @note   统一管理菜单的绘制逻辑，便于后续扩展
 * @param  u8g2: U8g2图形库实例指针（传入全局的u8g2即可）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单核心函数
    // 参数说明：
    // &u8g2_menu: 要绘制的菜单实例
    // 0, 0: 菜单绘制区域左上角坐标（X=0, Y=0）
    // 128, 64: 菜单绘制区域的宽度和高度（适配128x64分辨率的OLED屏）
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  主函数（程序入口）
 * @note   程序初始化流程：延时 -> OLED硬件初始化 -> 菜单初始化 -> 主循环刷新显示
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 初始化系统延时函数（为OLED/IIC通信提供稳定的时序保障）
    delay_init();
    
    // 初始化OLED硬件并绑定u8g2实例（底层IIC通信、屏幕复位等操作）
    oled_u8g2_init(&u8g2);
    
    // 设置U8g2默认字体（10x20像素的无衬线字体，适合菜单显示）
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);
    
    // 创建菜单（核心初始化）
    // 参数说明：
    // &u8g2: 绑定的U8g2图形库实例
    // &u8g2_menu: 要初始化的菜单实例
    // menuItem_1: 默认显示的菜单页面绘制回调函数
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1);
  
    // 主循环（程序常驻）
    while(1)
    {
        // 清空U8g2显存缓冲区（避免上一帧内容残留）
        u8g2_ClearBuffer(&u8g2);
        
        // 调用封装函数绘制菜单
        oled_display(&u8g2);
        
        // 将显存缓冲区的数据发送到OLED屏幕显示
        u8g2_SendBuffer(&u8g2);
    }
}