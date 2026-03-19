/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库图表显示功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示折线图/散点图绘制、双缓冲（数据/显示）设计、大数据量图表滚动
  *                   适配128x64 OLED屏，支持自动/手动指定图表极值，防止数据刷新过快导致显示异常
  *                   STM32 72MHz时钟，定时器2 1ms中断（按键扫描+时间接口）
  ******************************************************************************
  */

// 标准C库头文件（基础功能/随机数/数学运算）
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
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（含图表功能API/宏定义）

/**
 * @brief 全局变量定义（图表功能核心）
 * @note  双缓冲设计（数据缓冲+显示缓冲）：
 *         1. 数据缓冲：实时接收新数据，不受显示帧率影响
 *         2. 显示缓冲：同步数据缓冲的内容，防止数据刷新过快导致显示闪烁/异常
 *         chart_x: 图表实例，管理缓冲、数据长度、显示状态
 */
u8g2_t u8g2;                          // U8g2图形库实例
u8g2_menu_t u8g2_menu;                // U8g2菜单库实例

// 图表1（小数据量：10个点）
float chart_1_buff[10];               // 图表1数据缓冲（实时存储原始数据）
float chart_1_buff_dis[10];           // 图表1显示缓冲（用于绘制，避免数据突变）
u8g2_chart_t chart_1;                 // 图表1实例（关联双缓冲、数据长度）

// 图表2（大数据量：500个点，远超屏幕宽度，支持横向滚动）
float chart_2_buff[500];              // 图表2数据缓冲（实时存储原始数据）
float chart_2_buff_dis[500];          // 图表2显示缓冲（用于绘制）
u8g2_chart_t chart_2;                 // 图表2实例

/**
 * @brief  菜单页面1 - 图表显示核心逻辑
 * @note   核心规则：
 *         1. 图表高度不能超过OLED屏幕高度（64像素），宽度自动适配菜单可用宽度
 *         2. max/min=0时自动计算数据极值，手动指定时固定显示范围
 *         3. 同一图表数据可复用为折线图/散点图等不同样式
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    /* 图表功能宏定义（u8g2_menu.h中配置）
    #define U8G2_MENU_MIN_VALUE_DIFF 0.0f           // 图表幅值最小值（防止极值相同导致显示异常）
    #define U8G2_MENU_CHART_SPACE_RATIO 1.1f        // 图表上下留空比例（1.1=上下各留10%空间）
    */

    /* 图表绘制API说明：
    // 绘制折线图项
    void u8g2_MenuDrawItemLineChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min);
    // 绘制散点图项
    void u8g2_MenuDrawItemPointChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min);
    参数说明：
    chart: 图表实例指针 | h: 图表高度（≤屏幕高度64） | max: 显示最大值（0=自动计算） | min: 显示最小值（0=自动计算）
    */

    // ==================== 图表1：小数据量演示 ====================
    // 绘制图表1折线图：高度60，自动计算max/min（适配数据实际范围）
    u8g2_MenuDrawItemLineChart(&chart_1, 60, 0, 0);	
    // 绘制图表1散点图：高度60，手动指定范围(-1~1)（固定显示尺度）
    u8g2_MenuDrawItemPointChart(&chart_1, 60, -1, 1);

    // ==================== 图表2：大数据量演示 ====================
    // 绘制图表2折线图：高度60，自动计算max/min，支持横向滚动显示500个点
    u8g2_MenuDrawItemLineChart(&chart_2, 60, 0, 0);
}

/**
 * @brief  OLED显示封装函数
 * @note   统一绘制菜单+图表，图表会自动适配菜单区域尺寸
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单（含图表，图表自动填充菜单可用区域）
    // 参数：菜单实例 | 起始X/Y | 菜单宽度/高度（128x64适配OLED）
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   处理菜单导航按键（Up/Down/Enter），支持图表区域的滚动
 * @param  time: 扫描间隔（单位：ms，固定1ms）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键扫描：KEY_1低电平有效（图表/菜单上滚）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    // 下键扫描：KEY_2低电平有效（图表/菜单下滚）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    // 确认键扫描：KEY_3低电平有效
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数（1ms中断）
 * @note   核心功能：
 *         1. 按键扫描：保障菜单/图表导航响应
 *         2. 时间接口：菜单库精确计时，图表/消息框功能依赖
 * @param  无
 * @retval 无
 */
void tim2_IRQ(void)
{
    // 1. 按键扫描（1ms间隔，消抖）
    keyScann(1);
}

/**
 * @brief  主函数（程序入口）
 * @note   初始化流程：底层硬件 → OLED → 菜单 → 图表 → 定时器 → 主循环（加数据+刷新显示）
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 1. 底层硬件初始化
    delay_init();       // 初始化延时函数（保障IIC/OLED时序）
    gpio_init();        // 初始化GPIO（按键/外设引脚）
	
    // 2. OLED及菜单初始化
    oled_u8g2_init(&u8g2);                    // 初始化OLED硬件
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);  // 设置菜单字体（图表不依赖此字体）
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1); // 创建菜单，默认显示图表页面
    
    // 3. 图表初始化（关联双缓冲+数据长度）
    // 参数：图表实例 | 数据缓冲 | 显示缓冲 | 数据长度（缓冲数组大小）
    u8g2_chart_init(&chart_1, chart_1_buff, chart_1_buff_dis, sizeof(chart_1_buff)/sizeof(chart_1_buff[0]));
    u8g2_chart_init(&chart_2, chart_2_buff, chart_2_buff_dis, sizeof(chart_2_buff)/sizeof(chart_2_buff[0]));
    
    // 4. 定时器初始化（1ms中断）
    // 参数：自动重装值(1000-1)，预分频值(72-1) → 72MHz时钟 → 1ms中断
    tim2_init(1000-1, 72-1);
    
    // 主循环（持续添加随机数据 + 刷新图表显示）
    while(1)
    {
        // ==================== 向图表添加测试数据 ====================
        // 方式1：调用API添加（推荐，自动处理缓冲循环）
        // 图表1：添加-1~1之间的随机数（匹配散点图手动指定的范围）
        u8g2_chart_addData(&chart_1, (float)(rand()%2000)/1000.0f - 1);
        // 图表2：添加0~RAND_MAX之间的随机数（自动计算极值）
        u8g2_chart_addData(&chart_2, (float)rand());
        
        // 方式2：直接操作数据缓冲（效率更高，需手动管理索引）
        // chart_1_buff[当前索引] = 新数据;
        // 注：API方式已封装索引循环逻辑，新手优先使用
        
        // ==================== 刷新OLED显示 ====================
        u8g2_ClearBuffer(&u8g2);  // 清空显存缓冲区（避免帧残留）
        oled_display(&u8g2);      // 绘制菜单+图表（自动同步显示缓冲）
        u8g2_SendBuffer(&u8g2);   // 发送显存数据到OLED屏幕
    }
}