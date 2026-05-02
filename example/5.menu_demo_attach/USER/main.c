/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库按键附加+字符串输入功能示例
  * @author         : 自定义
  * @date           : 2026-03-16
  * @note           : 演示按钮回调绑定、自定义字符串输入、特殊功能键（删除/清除）
  *                   矩阵按键支持字符输入到缓冲区
  *                   适配128x64 OLED屏
  ******************************************************************************
  */

// 硬件驱动层头文件（定时器/延时/矩阵按键驱动）
#include "tim.h"         // 定时器驱动（1ms中断，用于按键扫描+字符输入）
#include "delay.h"       // 延时函数（保障OLED/IIC通信时序）
#include "gpio.h"        // GPIO驱动（初始化按键/外设的GPIO引脚）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（u8g2初始化）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（必须包含）
#include "matrixKey.h"   // 矩阵按键驱动

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，管理OLED绘图上下文
 *        u8g2_menu: U8g2菜单库实例，管理菜单状态/按键回调/字符输入
 *        buff: 字符串输入缓冲区，存储用户输入的字符（初始化为空）
 */
u8g2_t u8g2;                  // U8g2图形库实例
u8g2_menu_t u8g2_menu;        // U8g2菜单库实例
char buff[64] = "";           // 字符串输入缓冲区（64字节，足够存储常规输入）
uint16_t num = 0;

/**
 * @brief  菜单按钮回调函数
 * @note   所有绑定u8g2_MenuItem_button的菜单项，按下按键后都会触发此函数
 *         可通过ID区分不同按钮，通过key区分按键类型（Enter/Up/Down等）
 * @param  u8g2_menu: 菜单实例指针（用于调用取消选中API）
 * @param  ID: 按钮唯一标识（与u8g2_MenuItem_button的第二个参数对应）
 * @param  key: 触发回调的按键类型（菜单库定义的枚举值）
 * @retval 无
 */
void u8g2_MenuButton(u8g2_menu_t *u8g2_menu, uint8_t ID, u8g2_menuKeyValue_t key)
{
    /* 菜单库支持的按键类型枚举（注释仅作参考）
    MENU_Key_Up,       // 上键（导航）
    MENU_Key_Down,     // 下键（导航）
    MENU_Key_Enter,    // 确认键（触发按钮回调核心逻辑）
    MENU_Key_Return,   // 返回键（退出编辑/返回上一级）
    MENU_Key_Add,      // 加键（数值编辑）
    MENU_Key_Sub,      // 减键（数值编辑）
    MENU_Key_USER_1,   // 自定义按键1
    MENU_Key_USER_2,   // 自定义按键2
    MENU_Key_USER_3,   // 自定义按键3
    MENU_Key_USER_4,   // 自定义按键4
    MENU_Key_USER_5,   // 自定义按键5
    MENU_Key_USER_6,   // 自定义按键6
    */
    // 仅响应确认键（Enter）的按钮触发事件
    if(key == MENU_Key_Enter)
    {
        // 取消当前菜单项的选中状态（视觉反馈，避免持续高亮）
        u8g2_MenuItemDeSelect(u8g2_menu); 
        
        // 根据按钮ID区分不同按钮的逻辑（可在此处扩展业务代码）
        switch(ID)
        {
            case 0: // 对应"str"按钮
                // 可添加自定义逻辑：如清空输入缓冲区、打印日志等
                break;
            case 1: // 对应"xbm"按钮
                // 可添加自定义逻辑：如显示图片、切换页面等
                break;
            case 2: // 对应"close"按钮
                // 可添加自定义逻辑：如退出输入模式、复位菜单等
                break;
        }
    }
}

/**
 * @brief  菜单页面1 - 按键附加+字符串输入演示
 * @note   核心规则：
 *         1. u8g2_MenuItem_button必须写在显示函数上方，绑定按钮回调到该行
 *         2. u8g2_MenuItem_str绑定字符串输入功能，选中该行后可输入字符
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    // ==================== 按钮附加示例 ====================
    // 绑定按钮回调（ID=0），对应"str"菜单项，按Enter触发u8g2_MenuButton
    u8g2_MenuItem_button(u8g2_MenuButton, 0);
    u8g2_MenuUTF8Printf("str"); // 显示菜单项文字（按钮功能载体）
    
    // 绑定按钮回调（ID=1），对应"xbm"菜单项
    u8g2_MenuItem_button(u8g2_MenuButton, 1);
    u8g2_MenuUTF8Printf("xbm"); // 显示菜单项文字
    
    // 绑定按钮回调（ID=2），对应"close"菜单项
    u8g2_MenuItem_button(u8g2_MenuButton, 2);
    u8g2_MenuUTF8Printf("close"); // 显示菜单项文字
    
    // ==================== 字符串输入示例 ====================
    /* 菜单库预定义的特殊功能字符（在u8g2_menu.h中定义）：
       #define U8G2_MENUKeyValue_Back '*'    // 输入'*'删除缓冲区最后一个字符
       #define U8G2_MENUKeyValue_Clear '#'   // 输入'#'清空整个缓冲区
    */
    // 绑定字符串输入功能到该行
    // 参数：输入缓冲区指针 | 缓冲区大小（防止越界）
    u8g2_MenuItem_str(buff, sizeof(buff));
    // 显示当前输入的字符串（输入过程中实时刷新）
    u8g2_MenuUTF8Printf("in:%s", buff);
    
    u8g2_MenuUTF8Printf("num:%d", num);
}

/**
 * @brief  OLED显示封装函数
 * @note   统一管理菜单绘制逻辑，所有菜单页面/输入状态均通过此函数绘制
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制当前菜单页面（包含按钮项、字符串输入项）
    // 参数：菜单实例 | 绘制起始X/Y | 菜单宽度/高度（适配128x64屏）
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

void menuEventUserKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)
{
    if(u8g2_menuKeyValue == MENU_Key_USER_1)
    {
        // 可使用 menuEventUserKey 函数捕获自定义按键按下
        num++;
    }
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   处理菜单导航按键（Up/Down/Enter），保障菜单基础交互
 * @param  time: 扫描间隔（单位：ms，此处固定为1ms）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键扫描：MENU_Key_Up对应硬件KEY_1（!表示低电平有效，匹配硬件电路）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_1, time);
    // 下键扫描：MENU_Key_Down对应硬件KEY_2
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_2, time);
    // 确认键扫描：MENU_Key_Enter对应硬件KEY_3（触发按钮回调）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_3, time);
    
    // 确认键扫描：MENU_Key_Enter对应硬件KEY_3（触发按钮回调）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_USER_1, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数
 * @note   1ms中断一次，核心功能：
 *         1. 获取矩阵按键的字符值，输入到菜单字符串缓冲区
 *         2. 调用按键扫描函数，处理菜单导航
 * @param  无
 * @retval 无
 */
void tim2_IRQ(void)
{
    // 获取当前矩阵按键的字符值（如数字/字母/*/#等）
    char keys = get_current_key_value(&matrixKey);
    // 将字符输入到菜单的字符串输入缓冲区（支持串口/其他数据源替换）
    u8g2_MenuInChar(&u8g2_menu, keys);    
    // 调用按键扫描函数，处理菜单导航按键（Up/Down/Enter）
    keyScann(1);
}

/**
 * @brief  主函数（程序入口）
 * @note   初始化流程：延时 → OLED → 菜单 → 矩阵按键 → 定时器 → 主循环刷新
 * @param  无
 * @retval 无
 */
int main(void)
{
    delay_init();                // 初始化延时函数（保障IIC/OLED通信时序稳定）
    gpio_init();                 // 初始化GPIO（矩阵按键/外设引脚配置）
    
    // 初始化OLED硬件并绑定u8g2实例（底层IIC初始化、屏幕复位）
    oled_u8g2_init(&u8g2);
    
    // 设置菜单默认字体（10x20像素无衬线字体，适配菜单/输入字符串显示）
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);
    
    // 创建菜单（核心初始化）
    // 参数：U8g2实例 | 菜单实例 | 默认显示的菜单页面（menuItem_1）
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1);
    
    // 初始化矩阵按键（默认配置，需matrixKey驱动实现）
    matrixKey_init_def();
    
    // 初始化定时器2（1ms中断）：72MHz时钟，预分频72-1，自动重装1000-1 → 1ms中断
    tim2_init(1000-1, 72-1);
    
    // 主循环（持续刷新屏幕，响应按键/字符输入）
    while(1)
    {
        // 清空U8g2显存缓冲区（避免上一帧内容残留）
        u8g2_ClearBuffer(&u8g2);
        
        // 绘制当前菜单页面（包含按钮项、字符串输入项）
        oled_display(&u8g2);
        
        // 将显存数据发送到OLED屏幕（完成一帧显示，实时刷新输入内容）
        u8g2_SendBuffer(&u8g2);
    }
}
