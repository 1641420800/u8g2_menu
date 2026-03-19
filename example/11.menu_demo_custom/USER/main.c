/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库自定义选择器（展示器）功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示内置/自定义选择器切换、动态数量菜单项（0~10000可调）、100行菜单项滚动导航
  *                   自定义选择器根据菜单项4种状态绘制差异化标识，适配128x64 OLED屏
  *                   STM32 72MHz时钟，定时器2 1ms中断（按键扫描+菜单精确计时）
  *                   按键操作：Up/Down调整数值/滚动菜单，Enter确认选中/切换状态
  ******************************************************************************
  */

// 标准C库头文件（基础功能/数学运算）
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 硬件驱动层头文件（系统/定时器/串口/延时/GPIO）
#include "sys.h"         // 系统核心配置（时钟/中断向量）
#include "tim.h"         // 定时器驱动（1ms中断，按键扫描+时间接口）
#include "usart.h"       // 串口驱动（可选，用于调试输出）
#include "delay.h"       // 延时函数（保障OLED/IIC通信时序稳定）
#include "gpio.h"        // GPIO驱动（按键引脚初始化，低电平有效）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（u8g2初始化、IIC通信封装）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（选择器/状态枚举/动画宏）

/**
 * @brief 全局变量定义
 * @note  核心变量说明：
 *         1. u8g2/u8g2_menu：菜单库核心实例，管理显示/交互/状态
 *         2. quantity：动态菜单项数量（绑定到可调整数值项，范围0~10000，步长10）
 *            → 调整该值可实时改变循环创建的菜单项行数（测试大量项滚动）
 */
u8g2_t u8g2;                  // U8g2图形库实例（OLED绘图核心）
u8g2_menu_t u8g2_menu;        // U8g2菜单库实例（管理菜单状态/选择器/坐标）
uint16_t quantity = 100;      // 动态菜单项数量（初始100行，支持按键调整）

/* 
 * @file u8g2_menu.h 核心宏定义解析（选择器/动画相关）
 * #define U8G2_MENU_DELAY 100                     // 动画帧间隔（ms），仅u8g2_MenuTime_ISR生效
 * #define ROW_HEIGHT_INCREMENT 0.2f               // 选中行高度增量（动画平滑放大）
 * #define MAX_ROW_HEIGHT 1.0f                     // 选中行最大高度（1.0=原始高度，>1放大）
 * #define SPE_ADJUSTMENT 2.0f                     // 滚动速度调整系数（越接近1滚动越快）
 */

/**
 * @brief  菜单页面1 - 动态数量菜单项演示（核心逻辑）
 * @note   功能拆解：
 *         1. 绑定可调整数值项：quantity（步长10，范围0~10000，Up/Down键调整）
 *         2. 显示当前菜单项数量：quantity %d
 *         3. 循环创建quantity行菜单项（测试大量项滚动+选择器状态切换）
 *         → 当quantity=0时无循环项，仅显示数量文本；quantity>0时创建对应行数
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    // 绑定可调整数值项：关联quantity变量，步长10，最小值0，最大值10000
    // Up键：quantity+10 | Down键：quantity-10 | 自动限制在0~10000范围内
    u8g2_MenuItemValue_uint16(&quantity, 10, 0, 10000);
    
    // 显示当前菜单项数量（实时更新，直观看到quantity变化）
    u8g2_MenuUTF8Printf("quantity %d", quantity);
    
    // 循环创建quantity行菜单项（每行显示"hello 0"~"hello N-1"）
    // 当quantity=0时，此循环不执行，仅显示数量文本
    for(int i = 0; i < quantity; ++i)
    {
        u8g2_MenuUTF8Printf("hello %d", i);
    }
}

/**
 * @brief  OLED显示封装函数
 * @note   统一入口绘制菜单，菜单库会自动调用绑定的选择器函数：
 *         → 使用内置选择器则渲染方形标识，使用自定义选择器则渲染圆形标识
 *         所有菜单项和选择器标识均在u8g2_DrawMenu中自动绘制
 * @param  u8g2: U8g2图形库实例指针（全局u8g2传入）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单：起始坐标(0,0)，尺寸128x64（匹配OLED屏幕分辨率）
    // 内部逻辑：先绘制所有菜单项，再调用选择器函数绘制选中标识
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   菜单交互核心：按键事件绑定（低电平有效）
 *         1. KEY_1(Up)：菜单项上滚 / 可调整数值+步长
 *         2. KEY_2(Down)：菜单项下滚 / 可调整数值-步长
 *         3. KEY_3(Enter)：切换菜单项选中状态（Writable ↔ WritableSelect）
 *         → 消抖由u8g2_MenuKeyScannDebounce内置实现，无需手动处理
 * @param  time: 扫描间隔（固定1ms，与定时器中断周期一致）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键：KEY_1低电平有效 → 菜单上滚 / 数值+步长
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    // 下键：KEY_2低电平有效 → 菜单下滚 / 数值-步长
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    // 确认键：KEY_3低电平有效 → 切换菜单项选中状态
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数（1ms中断）
 * @note   必须实现的核心接口：
 *         1. keyScann(1)：1ms间隔扫描按键，保障消抖和实时响应
 *         2. u8g2_MenuTime_ISR：菜单库精确计时（动画/延时/超时功能依赖）
 *         → 无此接口则选择器动画、消息框超时等功能失效
 * @param  无
 * @retval 无
 */
void tim2_IRQ(void)
{
    // 1. 按键扫描（1ms间隔，消抖）
    keyScann(1);
    // 2. 菜单时间接口（传递1ms增量，用于动画/延时计算）
    u8g2_MenuTime_ISR(&u8g2_menu, 1);
}

/**
 * @brief  自定义选择器函数声明（前置声明）
 * @note   自定义选择器必须遵循：
 *         1. 参数为u8g2_menu_t*（仅能通过此指针获取u8g2实例/坐标/状态）
 *         2. 返回值void（仅负责绘制，无返回）
 *         3. 内部仅使用U8g2原始API绘制标识
 * @param  u8g2_menu: 菜单实例指针（获取绘制所需的所有信息）
 * @retval 无
 */
void u8g2_MenuSelector_User(u8g2_menu_t *u8g2_menu);

/**
 * @brief  主函数（程序入口）
 * @note   初始化流程：硬件 → OLED → 菜单（绑定选择器） → 定时器 → 主循环
 *         选择器切换说明：
 *         1. 内置选择器：u8g2_MenuSelectorSquare（方形标识）
 *         2. 自定义选择器：u8g2_MenuSelector_User（圆形标识）
 *         → 注释/取消注释对应行即可切换
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 1. 底层硬件初始化（必须先执行，保障外设可用）
    delay_init();       // 初始化延时函数（OLED IIC通信时序依赖）
    gpio_init();        // 初始化GPIO（按键引脚配置为输入，上拉/下拉）
	
    // 2. OLED初始化（显示核心）
    oled_u8g2_init(&u8g2);                    // 初始化OLED硬件（IIC通信/屏幕复位）
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);  // 设置菜单默认字体（10x20像素，清晰易读）

    /* 菜单创建API对比：
    // 方式1：使用内置方形选择器（注释下方自定义选择器，启用此行）
    // u8g2_CreateMenu_Selector(&u8g2,&u8g2_menu,menuItem_1,u8g2_MenuSelectorSquare);
    
    // 方式2：使用自定义圆形选择器（核心演示）
    */
    u8g2_CreateMenu_Selector(&u8g2,&u8g2_menu,menuItem_1,u8g2_MenuSelector_User);
    
    // 3. 定时器初始化（1ms中断）
    // 参数：自动重装值(1000-1)，预分频值(72-1) → 72MHz/72=1MHz → 1MHz/1000=1kHz（1ms中断）
    tim2_init(1000-1, 72-1);
    
    // 主循环（持续刷新屏幕，响应按键+更新选择器/菜单项）
    while(1)
    {
        u8g2_ClearBuffer(&u8g2);  // 清空显存缓冲区（避免上一帧残留）
        oled_display(&u8g2);      // 绘制菜单+选择器（自动处理状态变化）
        u8g2_SendBuffer(&u8g2);   // 将显存数据发送到OLED屏幕（实时刷新）
    }
}

/**
 * @brief  自定义选择器实现（圆形标识，核心重点）
 * @note   编写步骤（必须严格遵循）：
 *         1. 获取u8g2实例：通过u8g2_MenuGetU8g2（禁止直接用全局u8g2）
 *         2. 设置菜单项位置：u8g2_MenuSetPosition（GetX/Y前必须执行）
 *         3. 获取坐标/高度：GetX/Y/H（计算标识绘制位置）
 *         4. 判断状态：GetAttribute（根据状态绘制不同标识）
 *         5. 绘制标识：使用U8g2原始API（DrawCircle/DrawDisc）
 * @param  u8g2_menu: 菜单实例指针（唯一数据源）
 * @retval 无
 */
void u8g2_MenuSelector_User(u8g2_menu_t *u8g2_menu)
{
    // 1. 获取当前菜单绑定的u8g2实例（绘制必须用此实例）
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(u8g2_menu);
    // 2. 定义坐标/高度变量（存储菜单项的实时位置信息）
    u8g2_int_t x, y, h;

    // 3. 设置菜单项位置（关键！GetX/Y依赖此步骤，否则坐标异常）
    // 参数：菜单实例 | 左边距(16) | 顶边距(0) | 行间距(0)
    // → 左边距16：为选择器标识预留绘制空间（避免遮挡菜单项文本）
    u8g2_MenuSetPosition(u8g2_menu, 16, 0, 0);

    // 4. 获取菜单项实时坐标/高度（计算标识绘制位置）
    x = u8g2_MenuGetX(u8g2_menu);  // 菜单项横坐标（文本起始位置）
    y = u8g2_MenuGetY(u8g2_menu);  // 菜单项纵坐标（文本顶部位置）
    h = u8g2_MenuGetH(u8g2_menu);  // 菜单项高度（匹配字体高度）
    // w = u8g2_MenuGetW(u8g2_menu); // 获取菜单项宽度（本示例未使用）

    // 5. 根据菜单项状态，绘制差异化标识（核心逻辑）
    switch (u8g2_MenuGetAttribute(u8g2_menu))
    {
    case MENU_None: // 状态1：未选中 → 不绘制任何标识（无交互）
        break;
    case MENU_Fix: // 状态2：不可调（只读） → 绘制空心圆（半径5）
        // 位置：x-10（文本左侧10像素），y+h/2（菜单项垂直居中）
        u8g2_DrawCircle(u8g2, x - 10, y + h / 2, 5, U8G2_DRAW_ALL);
        break;
    case MENU_Writable: // 状态3：可调但未选中 → 绘制双圈（内小外大）
        u8g2_DrawCircle(u8g2, x - 10, y + h / 2, 2, U8G2_DRAW_ALL); // 内圈（半径2）
        u8g2_DrawCircle(u8g2, x - 10, y + h / 2, 5, U8G2_DRAW_ALL); // 外圈（半径5）
        break;
    case MENU_WritableSelect: // 状态4：可调且选中 → 绘制实心圆（半径5）
        u8g2_DrawDisc(u8g2, x - 10, y + h / 2, 5, U8G2_DRAW_ALL);
        break;
    }
}