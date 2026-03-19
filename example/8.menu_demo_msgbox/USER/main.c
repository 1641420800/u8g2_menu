/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库弹窗+图片显示功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示字符串弹窗、XBM图片弹窗、弹窗关闭功能
  *                   必须实现u8g2_MenuTime_ISR时间接口，否则弹窗超时失效
  *                   适配128x64 OLED屏，STM32 72MHz时钟，定时器2 1ms中断
  ******************************************************************************
  */

// 标准C库头文件（基础功能）
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 硬件驱动层头文件（系统/定时器/串口/延时/GPIO）
#include "sys.h"         // 系统核心配置（时钟/中断向量）
#include "tim.h"         // 定时器驱动（1ms中断，按键扫描+时间接口）
#include "usart.h"       // 串口驱动（可选，用于调试）
#include "delay.h"       // 延时函数（保障OLED/IIC通信时序）
#include "gpio.h"        // GPIO驱动（按键引脚初始化）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（u8g2初始化、IIC通信）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（含消息框/时间接口API）

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，管理OLED绘图上下文
 *        u8g2_menu: U8g2菜单库实例，管理菜单/消息框状态、时间计数
 *        bmp: XBM格式位图数据（自定义图片，适配OLED显示）
 */
u8g2_t u8g2;                  // U8g2图形库实例
u8g2_menu_t u8g2_menu;        // U8g2菜单库实例（含消息框超时计数）
const uint8_t bmp[];          // XBM位图数据前置声明（解决编译依赖）

/**
 * @brief  菜单按钮回调函数（消息框控制核心）
 * @note   按下Enter键触发，通过ID区分不同弹窗操作：字符串弹窗/图片弹窗/关闭弹窗
 *         消息框功能依赖u8g2_MenuTime_ISR时间接口，否则超时不生效
 * @param  u8g2_menu: 菜单实例指针（用于取消选中/调用消息框API）
 * @param  ID: 按钮唯一标识（0=字符串弹窗，1=图片弹窗，2=关闭弹窗）
 * @param  key: 触发回调的按键类型（仅响应MENU_Key_Enter）
 * @retval 无
 */
void u8g2_MenuButton(u8g2_menu_t *u8g2_menu, uint8_t ID, u8g2_menuKeyValue_t key)
{
    /* 消息框功能宏定义（u8g2_menu.h中配置）
    #define U8G2_MENU_MESSAGEBOX 1                  // 启用消息框功能（默认1）
    #define U8G2_MENU_INFINITE_TIMEOUT UINT32_MAX   // 消息框无限显示（不自动关闭）
    */
    // 仅响应确认键（Enter）触发弹窗操作
    if(key == MENU_Key_Enter)
    {
        // 取消当前菜单项选中状态（视觉反馈，避免持续高亮）
        u8g2_MenuItemDeSelect(u8g2_menu);
        
        // 按按钮ID分支处理弹窗逻辑
        switch(ID)
        {
            case 0: // 字符串弹窗（ID=0，对应"str"菜单项）
                // 显示字符串消息框：内容"Hello\nU8g2"，6000ms后自动关闭
                // 参数：菜单实例 | 显示文本（\n换行） | 超时时间（ms）
                u8g2_MenuDrawMessageBox_str(u8g2_menu, "Hello\nU8g2", 6000);
                break;
            case 1: // 图片弹窗（ID=1，对应"xbm"菜单项）
                // 显示XBM图片消息框：坐标(32,32)，显示bmp图片，无限显示（需手动关闭）
                // 参数：菜单实例 | X坐标 | Y坐标 | XBM图片数据 | 超时时间（无限）
                u8g2_MenuDrawMessageBox_xbm(u8g2_menu, 32, 32, bmp, U8G2_MENU_INFINITE_TIMEOUT);
                break;
            case 2: // 关闭弹窗（ID=2，对应"close"菜单项）
                // 强制关闭当前显示的消息框（无论是否超时）
                u8g2_MenuDrawMessageBoxClose(u8g2_menu);
                break;
        }
    }
}

/**
 * @brief  菜单页面1 - 弹窗控制入口
 * @note   绑定3个按钮分别对应：字符串弹窗、图片弹窗、关闭弹窗
 *         核心规则：u8g2_MenuItem_button必须写在显示函数上方
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    // 绑定ID=0的按钮（字符串弹窗），对应"str"菜单项
    u8g2_MenuItem_button(u8g2_MenuButton, 0);
    u8g2_MenuUTF8Printf("str"); // 显示菜单项文本（功能载体）
    
    // 绑定ID=1的按钮（图片弹窗），对应"xbm"菜单项
    u8g2_MenuItem_button(u8g2_MenuButton, 1);
    u8g2_MenuUTF8Printf("xbm"); // 显示菜单项文本
    
    // 绑定ID=2的按钮（关闭弹窗），对应"close"菜单项
    u8g2_MenuItem_button(u8g2_MenuButton, 2);
    u8g2_MenuUTF8Printf("close"); // 显示菜单项文本
}

/**
 * @brief  OLED显示封装函数
 * @note   统一绘制菜单+消息框，消息框会自动叠加在菜单上层显示
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单（含消息框，消息框优先级高于菜单）
    // 参数：菜单实例 | 绘制起始X/Y | 菜单宽度/高度（128x64适配OLED）
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   处理菜单导航按键（Up/Down/Enter），支持菜单项选择
 * @param  time: 扫描间隔（单位：ms，固定1ms）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键扫描：KEY_1低电平有效，控制菜单项上选
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    // 下键扫描：KEY_2低电平有效，控制菜单项下选
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    // 确认键扫描：KEY_3低电平有效，触发按钮回调（弹窗操作）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数（1ms中断）
 * @note   核心功能：
 *         1. 调用按键扫描函数，处理菜单导航
 *         2. 调用u8g2_MenuTime_ISR时间接口，实现消息框精确计时/超时
 *         3. 单片机性能不足时，可通过此接口跳过超时的动画帧（优化卡顿）
 * @param  无
 * @retval 无
 */
void tim2_IRQ(void)
{
    // 1. 按键扫描（1ms间隔，消抖）
    keyScann(1);
    
    // 2. 菜单时间接口（必须实现！否则消息框超时失效）
    // 参数：菜单实例 | 时间增量（1ms）
    u8g2_MenuTime_ISR(&u8g2_menu, 1);
}

/**
 * @brief  主函数（程序入口）
 * @note   初始化流程：底层硬件 → OLED → 菜单 → 定时器 → 主循环刷新
 *         核心功能：菜单控制弹窗（字符串/图片）+ 弹窗关闭 + 精确计时
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 1. 底层硬件初始化
    delay_init();       // 初始化延时函数（保障IIC/OLED通信时序）
    gpio_init();        // 初始化GPIO（按键/外设引脚配置）
	
    // 2. OLED及菜单初始化
    oled_u8g2_init(&u8g2);                    // 初始化OLED硬件
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);  // 设置菜单显示字体（10x20像素）
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1); // 创建菜单，默认显示menuItem_1
    
    // 3. 定时器初始化（1ms中断）
    // 参数：自动重装值(1000-1)，预分频值(72-1) → 72MHz时钟 → 1ms中断
    tim2_init(1000-1, 72-1);
    
    // 主循环（持续刷新屏幕，显示菜单+消息框）
    while(1)
    {
        u8g2_ClearBuffer(&u8g2);  // 清空显存缓冲区（避免帧残留）
        oled_display(&u8g2);      // 绘制菜单+消息框（自动叠加）
        u8g2_SendBuffer(&u8g2);   // 发送显存数据到OLED屏幕
    }
}

/**
 * @brief  XBM格式位图数据（自定义图片）
 * @note   数据由位图转换工具生成，适配OLED单色显示
 *         尺寸需匹配消息框显示坐标(32,32)，避免显示异常
 */
const uint8_t bmp[] = {
0x80,0x03,0xC0,0x01,0xF0,0x1F,0xF8,0x0F,0xF8,0x3F,0xFC,0x1F,0xFC,0x7F,0xFE,0x3F,0xFC,0xFF,0xFF,0x3F,0xFE,0xFC,0x3F,0x7F,0x3E,0xF8,0x1F,0x7C,0x3E,0xF0,0x0F,0xFC,
0x1F,0xE0,0x07,0xF8,0x1F,0xE0,0x07,0xF8,0x1F,0xC0,0x03,0xF8,0x1F,0xC0,0x03,0xF8,0x1F,0x00,0x00,0xF8,0x3F,0x00,0x00,0xF8,0x3E,0x00,0x00,0xFC,0x3E,0x00,0x00,0x7C,
0x7E,0x00,0x00,0x7C,0x7C,0x00,0x00,0x7E,0xFC,0x00,0x00,0x3E,0xFC,0x00,0x00,0x3F,0xF8,0x01,0x80,0x1F,0xF0,0x03,0xC0,0x0F,0xF0,0x07,0xE0,0x0F,0xE0,0x0F,0xF0,0x07,
0xC0,0x1F,0xF8,0x03,0x80,0x3F,0xFC,0x01,0x00,0xFF,0xFF,0x00,0x00,0xFE,0x7F,0x00,0x00,0xFC,0x3F,0x00,0x00,0xF8,0x1F,0x00,0x00,0xE0,0x07,0x00,0x00,0xC0,0x03,0x00,/*"无标题.bmp",0*/
};
