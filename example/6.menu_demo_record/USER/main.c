/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库记录字符串功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示多行菜单显示、按键导航、菜单绘制内容自动记录
  *                   启用U8G2_MENU_RECORD后，菜单绘制内容会存入缓冲区，通过串口1输出
  *                   适配128x64 OLED屏，STM32 72MHz时钟，串口1波特率9600
  ******************************************************************************
  */

// 标准C库头文件（字符串/数学运算/内存操作）
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

// 硬件驱动层头文件（定时器/串口/延时/GPIO）
#include "tim.h"         // 定时器驱动（1ms中断，按键扫描）
#include "usart.h"       // 串口驱动（USART1初始化、数据发送）
#include "delay.h"       // 延时函数（保障OLED/IIC通信时序）
#include "gpio.h"        // GPIO驱动（按键引脚初始化）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（u8g2初始化、IIC通信）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（含记录功能宏定义）

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，管理OLED绘图上下文
 *        u8g2_menu: U8g2菜单库实例，管理菜单状态/记录缓冲区/按键交互
 */
u8g2_t u8g2;                  // U8g2图形库实例
u8g2_Menu_t u8g2_menu;        // U8g2菜单库实例（含记录功能缓冲区）

/**
 * @brief  菜单页面1 - 多行字符串显示（测试记录功能）
 * @note   循环创建10行"Hello"菜单项，超过屏幕显示范围时自动支持上下滚动
 *         菜单绘制的每一行内容都会被记录到u8g2_menu的记录缓冲区
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    // 循环创建10行相同的菜单项（测试多行菜单的记录功能）
    for(int i = 0; i < 10; ++i)
    {
        // 绘制UTF8字符串，每行内容都会被记录功能捕获
        u8g2_MenuUTF8Printf("Hello");
    }
}

/**
 * @brief  OLED显示封装函数
 * @note   统一绘制菜单，菜单绘制的所有内容会自动写入记录缓冲区（启用记录功能后）
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单：起始坐标(0,0)，尺寸128x64（匹配OLED屏幕分辨率）
    // 绘制过程中，菜单库会自动将显示内容写入记录缓冲区
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   处理菜单导航按键（Up/Down/Enter），支持多行菜单的上下滚动
 * @param  time: 扫描间隔（单位：ms，与定时器中断周期一致）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键扫描：KEY_1低电平有效，控制菜单向上滚动
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    // 下键扫描：KEY_2低电平有效，控制菜单向下滚动
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    // 确认键扫描：KEY_3低电平有效（本示例无确认逻辑，仅保留接口）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数（1ms中断）
 * @note   核心功能：调用按键扫描函数，保障按键消抖和菜单导航响应
 * @param  无
 * @retval 无
 */
void tim2_IRQ(void)
{
    // 调用按键扫描函数，传入1ms扫描间隔
    keyScann(1);
}

/**
 * @brief  主函数（程序入口）
 * @note   初始化流程：底层硬件 → 串口 → OLED → 菜单 → 定时器 → 主循环
 *         核心功能：多行菜单显示 + 菜单内容记录 + 串口输出记录内容
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 1. 底层硬件初始化
    delay_init();       // 初始化延时函数（保障IIC/OLED通信时序）
    gpio_init();        // 初始化GPIO（按键/外设引脚配置）
    uart1_init(9600);   // 初始化串口1（波特率9600，用于输出记录内容）
	
    // 2. OLED及菜单初始化
    oled_u8g2_init(&u8g2);                    // 初始化OLED硬件
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);  // 设置菜单显示字体（10x20像素）
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1); // 创建菜单，默认显示menuItem_1
    
    // 3. 定时器初始化（1ms中断）
    tim2_init(1000-1, 72-1);                  // 72MHz时钟 → 1ms中断（预分频72-1，自动重装1000-1）
    
    // 主循环（持续刷新屏幕 + 串口输出菜单记录内容）
    while(1)
    {
        u8g2_ClearBuffer(&u8g2);  // 清空显存缓冲区（避免帧残留）
        oled_display(&u8g2);      // 绘制菜单（自动写入记录缓冲区）
        u8g2_SendBuffer(&u8g2);   // 发送显存数据到OLED屏幕
        
        /* 菜单记录功能核心说明（u8g2_menu.h中宏定义）：
           #define U8G2_MENU_RECORD 1          // 启用记录功能（默认1，置0关闭）
           #define U8G2_MENU_RECORD_SIZE 256   // 记录缓冲区大小（256字节）
	         功能：菜单绘制的所有内容会自动存入缓冲区，超过256字节的内容会被截断，此时自行增大缓冲区大小即可
           接口：u8g2_MenuRecord(&u8g2_menu) → 获取记录缓冲区的字符串指针
        */
        // 获取菜单记录的字符串，并通过串口1发送（长度由strlen计算）
        // 注：可优化为先缓存指针，避免重复调用u8g2_MenuRecord
        USART_sendBuf(USART1, u8g2_MenuRecord(&u8g2_menu), strlen(u8g2_MenuRecord(&u8g2_menu)));
    }
}