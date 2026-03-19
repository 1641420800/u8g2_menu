/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库多菜单跳转功能示例
  * @author         : 自定义
  * @date           : 2026-03-16
  * @note           : 演示3个菜单页面的循环跳转，通过Enter键确认跳转、Up/Down键选择菜单项
  *                   适配128x64 OLED屏，按键（KEY1/2/3）分别对应Up/Down/Enter
  ******************************************************************************
  */

// 硬件驱动层头文件（定时器/延时/矩阵按键驱动）
#include "tim.h"         // 定时器驱动（用于1ms按键扫描中断）
#include "delay.h"       // 延时函数（保障OLED/IIC通信时序）
#include "gpio.h"        // GPIO驱动（初始化按键/外设的GPIO引脚）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（u8g2初始化）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（必须包含）

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，管理OLED绘图上下文
 *        u8g2_menu: U8g2菜单库实例，管理菜单状态/页面跳转/交互
 */
u8g2_t u8g2;                  // U8g2图形库实例
u8g2_menu_t u8g2_menu;        // U8g2菜单库实例

/**
 * @brief  菜单页面函数前置声明
 * @note   解决菜单页面之间相互调用的编译依赖问题
 *         menuItem_1/2/3 分别对应3个独立的菜单页面
 */
void menuItem_1(void);
void menuItem_2(void);
void menuItem_3(void);

/**
 * @brief  菜单页面1 - 主菜单
 * @note   包含跳转到menuItem_2和menuItem_3的入口项
 *         核心规则：u8g2_MenuItem_menu() 必须写在显示函数上方，绑定跳转功能到该行
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    // ==================== 跳转到菜单2的入口 ====================
    // u8g2_MenuItem_menu: 绑定子菜单跳转功能
    // 参数：目标菜单页面的回调函数名（menuItem_2）
    // 作用：选中该行后按Enter键，菜单将切换到menuItem_2页面
    u8g2_MenuItem_menu(menuItem_2);
    // 显示菜单项文字（跳转功能的载体，必须调用）
    u8g2_MenuUTF8Printf("menu 2");
	
    // ==================== 跳转到菜单3的入口 ====================
    // 绑定到menuItem_3页面，按Enter键跳转
    u8g2_MenuItem_menu(menuItem_3);
    // 显示菜单项文字
    u8g2_MenuUTF8Printf("menu 3");
}

/**
 * @brief  菜单页面2
 * @note   包含跳转到menuItem_1和menuItem_3的入口项，支持循环跳转
 * @param  无
 * @retval 无
 */
void menuItem_2()
{
    // 绑定到menuItem_1页面（返回主菜单）
    u8g2_MenuItem_menu(menuItem_1);
    u8g2_MenuUTF8Printf("menu 1");
	
    // 绑定到menuItem_3页面
    u8g2_MenuItem_menu(menuItem_3);
    u8g2_MenuUTF8Printf("menu 3");
}

/**
 * @brief  菜单页面3
 * @note   包含跳转到menuItem_1和menuItem_2的入口项，完成3菜单循环跳转
 * @param  无
 * @retval 无
 */
void menuItem_3()
{
    // 绑定到menuItem_1页面（返回主菜单）
    u8g2_MenuItem_menu(menuItem_1);
    u8g2_MenuUTF8Printf("menu 1");
	
    // 绑定到menuItem_2页面
    u8g2_MenuItem_menu(menuItem_2);
    u8g2_MenuUTF8Printf("menu 2");
}

/**
 * @brief  OLED显示封装函数
 * @note   统一管理菜单绘制逻辑，所有菜单页面均通过此函数绘制
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制当前激活的菜单页面
    // 参数：菜单实例 | 绘制起始X/Y | 菜单宽度/高度（适配128x64屏）
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   由定时器1ms中断调用，扫描矩阵按键并上报给菜单库
 *         KEY_1=Up（上选）、KEY_2=Down（下选）、KEY_3=Enter（确认跳转）
 * @param  time: 扫描间隔（单位：ms，此处固定为1ms）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键扫描：MENU_Key_Up对应硬件KEY_1（!表示低电平有效，需匹配硬件电路）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    // 下键扫描：MENU_Key_Down对应硬件KEY_2
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    // 确认键扫描：MENU_Key_Enter对应硬件KEY_3（触发菜单跳转）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数
 * @note   1ms中断一次，驱动按键扫描，实现消抖和长按检测
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
 * @note   初始化流程：延时 → OLED → 菜单 → 定时器 → 主循环刷新显示
 *         默认启动菜单页面为menuItem_1（主菜单）
 * @param  无
 * @retval 无
 */
int main(void)
{
    delay_init();				// 初始化延时函数（保障IIC/OLED通信时序稳定）
	  gpio_init();        // 初始化GPIO（矩阵按键/外设引脚配置）
	
    // 初始化OLED硬件并绑定u8g2实例（底层IIC初始化、屏幕复位）
    oled_u8g2_init(&u8g2);
    
    // 设置菜单默认字体（10x20像素无衬线字体，适配菜单显示）
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);
    
    // 创建菜单（核心初始化）
    // 参数：U8g2实例 | 菜单实例 | 默认显示的菜单页面（menuItem_1为主菜单）
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1);
    
    // 初始化定时器2（1ms中断）：72MHz时钟，预分频72-1，自动重装1000-1 → 1ms中断
    tim2_init(1000-1, 72-1);
    
    // 主循环（持续刷新屏幕，响应菜单跳转）
    while(1)
    {
        // 清空U8g2显存缓冲区（避免上一帧内容残留）
        u8g2_ClearBuffer(&u8g2);
        
        // 绘制当前激活的菜单页面
        oled_display(&u8g2);
        
        // 将显存数据发送到OLED屏幕（完成一帧显示）
        u8g2_SendBuffer(&u8g2);
    }
}
