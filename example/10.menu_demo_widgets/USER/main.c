/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库自定义画板+滑块/进度条功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示自定义画板绘制图形/特殊字符、滑块条（普通/自定义比例/绑定值）、进度条（普通/绑定值）
  *                   适配128x64 OLED屏，滑块/进度条支持通过Up/Down键调整绑定数值
  *                   STM32 72MHz时钟，定时器2 1ms中断（按键扫描）
  ******************************************************************************
  */

// 标准C库头文件（基础功能/数学运算）
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 硬件驱动层头文件（系统/定时器/串口/延时/GPIO）
#include "sys.h"         // 系统核心配置（时钟/中断向量）
#include "tim.h"         // 定时器驱动（1ms中断，按键扫描）
#include "usart.h"       // 串口驱动（可选，用于调试）
#include "delay.h"       // 延时函数（保障OLED/IIC通信时序）
#include "gpio.h"        // GPIO驱动（按键引脚初始化）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（u8g2初始化、IIC通信）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（含画板/滑块/进度条API）

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，管理OLED绘图上下文
 *        u8g2_menu: U8g2菜单库实例，管理菜单/滑块/进度条状态
 *        slider_1/2: 绑定滑块/进度条的数值变量（支持Up/Down键调整）
 */
u8g2_t u8g2;                  // U8g2图形库实例
u8g2_menu_t u8g2_menu;        // U8g2菜单库实例
int slider_1 = 0;             // 绑定滑块条的数值（范围：0~100，步长1）
int slider_2 = 0;             // 绑定进度条的数值（范围：-100~100，步长1）

/**
 * @brief  自定义画板绘制函数（核心限制需严格遵守）
 * @note   【重要规则】：
 *         1. 仅能使用U8g2 API
 *         2. 仅能使用参数传入的u8g2实例（不能用全局u8g2）
 *         3. 绘制内容会作为菜单的一个菜单项显示，尺寸受后续绑定的宽高限制
 * @param  u8g2: U8g2图形库实例指针（必须使用此实例绘制）
 * @retval 无
 */
void oled_displayBoard(u8g2_t * u8g2)
{	
    // 绘制直线：起点(10,3)，终点(5,32)
    u8g2_DrawLine(u8g2, 10, 3, 5, 32);
    // 绘制三角形：顶点1(20,5)、顶点2(27,50)、顶点3(5,32)
    u8g2_DrawTriangle(u8g2, 20, 5, 27, 50, 5, 32);
    
    // 切换字体（显示特殊字符）：符号字体（支持雪人等特殊符号）
    u8g2_SetFont(u8g2, u8g2_font_unifont_t_symbols);
    // 绘制UTF8字符串：位置(5,20)，内容"Snowman: ☃"（雪人特殊字符）
    u8g2_DrawUTF8(u8g2, 5, 20, "Snowman: ☃");
    
    // 切换回常规字体（10x20像素，适配菜单显示）
    u8g2_SetFont(u8g2, u8g2_font_10x20_tf);
}

/**
 * @brief  菜单页面1 - 自定义画板+滑块/进度条核心演示
 * @note   核心规则：
 *         1. 画板宽高不能超过OLED屏幕实际尺寸（128x64）
 *         2. 滑块/进度条普通版本需将位置归一化为0~1，绑定版本直接使用实际数值范围
 *         3. 绑定版本的滑块/进度条可通过Up/Down键调整绑定的数值变量
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    /* 自定义画板API说明：
    void u8g2_MenuDrawItemBoard(u8g2_MenuDrawBoard_cb u8g2_MenuDrawBoard, u8g2_uint_t width, u8g2_uint_t height);
    参数：画板绘制函数指针 | 画板宽度 | 画板高度（≤屏幕尺寸128x64）
    */
    // 绘制自定义画板：绑定oled_displayBoard函数，宽度120，高度60（≤128x64）
    u8g2_MenuDrawItemBoard(oled_displayBoard, 120, 60);

    /* 滑块/进度条API说明（核心区别：绑定版本无需归一化数值）
    // 普通滑块条（位置0~1）
    void u8g2_MenuDrawItemSlider(float position);
    // 自定义比例滑块条（position0~1，proportion滑块尺寸）
    void u8g2_MenuDrawItemSliderProportion(float position, float proportion);
    // 绑定数值的滑块条（快捷版本，无需归一化）
    void u8g2_MenuDrawItemSlider_bind(int *value, int adjValue, int minValue, int maxValue);
    // 普通进度条（位置0~1）
    void u8g2_MenuDrawItemProgressBar(float position);
    // 绑定数值的进度条（快捷版本，无需归一化）
    void u8g2_MenuDrawItemProgressBar_bind(int *value, int adjValue, int minValue, int maxValue);
    绑定版本参数：
    value: 绑定的数值变量指针 | adjValue: 每次调整的步长 | minValue: 最小值 | maxValue: 最大值
    */

    // ==================== 滑块条演示 ====================
    // 普通滑块条：位置0.3（30%）
    u8g2_MenuDrawItemSlider(0.3);
    // 自定义比例滑块条：位置30%，滑块尺寸占50%
    u8g2_MenuDrawItemSliderProportion(0.3, 0.5);
    // 绑定数值的滑块条：绑定slider_1，步长1，范围0~100（Up/Down键调整）
    u8g2_MenuDrawItemSlider_bind(&slider_1, 1, 0, 100);

    // ==================== 进度条演示 ====================
    // 普通进度条：位置0.8（80%）
    u8g2_MenuDrawItemProgressBar(0.8);
    // 绑定数值的进度条：绑定slider_2，步长1，范围-100~100（Up/Down键调整）
    u8g2_MenuDrawItemProgressBar_bind(&slider_2, 1, -100, 100);
}

/**
 * @brief  OLED显示封装函数
 * @note   统一绘制菜单+自定义画板+滑块/进度条，所有元素自动适配菜单区域
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单（包含自定义画板、滑块条、进度条）
    // 参数：菜单实例 | 起始X/Y | 菜单宽度/高度（128x64适配OLED）
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   处理菜单导航按键，绑定版本的滑块/进度条通过Up/Down键调整数值
 * @param  time: 扫描间隔（单位：ms，固定1ms）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键扫描：KEY_1低电平有效（滑块/进度条数值+步长）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    // 下键扫描：KEY_2低电平有效（滑块/进度条数值-步长）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    // 确认键扫描：KEY_3低电平有效（选中/取消选中）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数（1ms中断）
 * @note   核心功能：调用按键扫描函数，保障滑块/进度条数值调整的响应性
 * @param  无
 * @retval 无
 */
void tim2_IRQ(void)
{
    // 调用按键扫描函数，传入1ms扫描间隔（消抖）
    keyScann(1);
}

/**
 * @brief  主函数（程序入口）
 * @note   初始化流程：底层硬件 → OLED → 菜单 → 定时器 → 主循环刷新
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 1. 底层硬件初始化
    delay_init();       // 初始化延时函数（保障IIC/OLED通信时序）
    gpio_init();        // 初始化GPIO（按键/外设引脚）
	
    // 2. OLED及菜单初始化
    oled_u8g2_init(&u8g2);                    // 初始化OLED硬件
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);  // 设置菜单默认字体
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1); // 创建菜单，默认显示画板+滑块/进度条页面
    
    // 3. 定时器初始化（1ms中断）
    // 参数：自动重装值(1000-1)，预分频值(72-1) → 72MHz时钟 → 1ms中断
    tim2_init(1000-1, 72-1);
    
    // 主循环（持续刷新屏幕，响应按键调整滑块/进度条数值）
    while(1)
    {
        u8g2_ClearBuffer(&u8g2);  // 清空显存缓冲区（避免帧残留）
        oled_display(&u8g2);      // 绘制菜单+画板+滑块/进度条
        u8g2_SendBuffer(&u8g2);   // 发送显存数据到OLED屏幕（实时刷新）
    }
}