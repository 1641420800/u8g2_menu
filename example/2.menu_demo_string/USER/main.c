/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库字符串显示全功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示所有字符串相关API：基础字符串/UTF8/格式化输出/密码显示
  *                   适配128x64分辨率OLED屏，字符串超长时选中项自动滚动
  ******************************************************************************
  */

// 硬件驱动层头文件
#include "delay.h"   // 延时函数
#include "gpio.h"
#include "tim.h"

// OLED及菜单库头文件
#include "IIC_OLED.h"       // OLED硬件驱动（u8g2初始化）
#include "u8g2_menu.h"      // U8g2菜单库核心头文件（必须包含）

/**
 * @brief 全局变量定义
 * @note  u8g2: U8g2图形库核心实例，管理OLED绘图上下文
 *        u8g2_menu: U8g2菜单库实例，管理菜单状态/绘制/交互
 */
u8g2_t u8g2;          // U8g2图形库实例
u8g2_menu_t u8g2_menu;// U8g2菜单库实例

u8g2_menu_textArea_t textArea;
const char * text = 
"OLED is Organic Light-Emitting Diode.\n"
"It is a high-performance display technology.\n"
"Each pixel emits light independently,\n"
"no backlight needed like traditional LCD.\n"
"OLED owns pure black, high contrast,\n"
"vivid color and fast response speed.\n"
"It is thin, energy-saving and flexible,\n"
"widely used in embedded devices,\n"
"smart watches and electronic screens.";

/**
 * @brief  菜单页面1绘制回调函数 - 字符串功能全演示
 * @note   该函数由菜单库自动调用，按从上到下顺序绘制菜单项
 *         不同字符串API的使用场景、效率、功能差异均在本函数中体现
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    // ==================== 基础字符串绘制（无格式化，效率高） ====================
    // 仅支持ASCII英文字符，无格式化，绘制效率最高
    u8g2_MenuDrawStr("Str");            
    // 二倍尺寸显示ASCII字符串（视觉放大，占用更多屏幕空间）
    u8g2_MenuDrawStrX2("StrX2");    
    // 支持UTF8编码字符串（可显示中文/特殊字符），无格式化
    u8g2_MenuDrawUTF8("UTF8");        
    // 二倍尺寸显示UTF8字符串（适合需要醒目显示的场景）
    u8g2_MenuDrawUTF8X2("UTF8X2");
    
    // ==================== 格式化字符串输出（灵活，适配多类型数据） ====================
    // 通用格式化封装：第一个参数指定绘制函数，后续为printf风格格式化参数
    // 此处使用u8g2_MenuDrawStr作为绘制函数，仅显示ASCII格式化字符串
    u8g2_MenuPrintf(u8g2_MenuDrawStr,"printf %d", 123);
    
    // ==================== 常用UTF8格式化封装（推荐优先使用） ====================
    // 等价于 u8g2_MenuPrintf(u8g2_MenuDrawUTF8, ...)，简化UTF8格式化调用
    u8g2_MenuUTF8Printf("Hello");                          // 纯字符串
    u8g2_MenuUTF8Printf("int:%d",100);                     // 整数格式化
    u8g2_MenuUTF8Printf("float:%.1f",16.5f);               // 浮点数格式化（保留1位小数）
    u8g2_MenuUTF8Printf("str:%s","test");                  // 字符串拼接
    // 多类型混合格式化（菜单库自动处理超长字符串，选中时自动左右滚动）
    u8g2_MenuUTF8Printf("int:%d / float:%.1f / str:%s",100,16.5f,"test");
    
    // ==================== 密码样式显示（隐私数据遮挡） ====================
    // 显示指定长度的掩码字符（此处为'*'），原字符串不可见
    u8g2_MenuDrawPassword("123456789",'*');
    // 二倍尺寸显示密码掩码（适合大字体场景）
    u8g2_MenuDrawPasswordX2("123456789",'*');
    
    // ==================== 多行文本框显示 ====================
    u8g2_MenuDrawTextArea_bind(&textArea,60);
    // u8g2_MenuDrawTextArea_bind(&textArea,60); // 相同控制块显示内容一致
}

/**
 * @brief  OLED显示封装函数
 * @note   统一管理菜单绘制逻辑，便于后续扩展（如添加背景、图标等）
 * @param  u8g2: U8g2图形库实例指针（传入全局u8g2）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单核心函数
    // 参数：菜单实例 | 绘制起始X坐标 | 绘制起始Y坐标 | 菜单宽度 | 菜单高度
    u8g2_DrawMenu(&u8g2_menu,0,0,128,64);
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
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_3, time);
    // 下键扫描：KEY_2低电平有效（滑块/进度条数值-步长）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_1, time);
    // 确认键扫描：KEY_3低电平有效（选中/取消选中）
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_2, time);
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
 * @note   初始化流程：底层硬件 → OLED → 菜单 → 主循环刷新显示
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 初始化延时函数（为IIC/OLED通信提供稳定时序）
    delay_init();
    gpio_init();
    
    // 初始化OLED硬件并绑定u8g2实例（底层IIC初始化、屏幕复位）
    oled_u8g2_init(&u8g2);
    
    // 设置菜单默认字体（10x20像素无衬线字体，适配多数字符串显示场景）
    u8g2_SetFont(&u8g2,u8g2_font_10x20_tf);
    
    // 创建菜单（核心初始化）
    // 参数：U8g2实例 | 菜单实例 | 默认显示的菜单页面回调函数
    u8g2_CreateMenu(&u8g2,&u8g2_menu,menuItem_1);
    
    // 初始化多行文本控制块
    u8g2_textArea_init(&textArea,text);
    
    // 参数：自动重装值(1000-1)，预分频值(72-1) → 72MHz时钟 → 1ms中断
    tim2_init(1000-1, 72-1);
    // 主循环（程序常驻，持续刷新屏幕）
    while(1)
    {
        // 清空U8g2显存缓冲区（避免上一帧内容残留，保证显示纯净）
        u8g2_ClearBuffer(&u8g2);
        
        // 调用封装函数绘制菜单（所有字符串逻辑在menuItem_1中实现）
        oled_display(&u8g2);
        
        // 将显存缓冲区数据发送到OLED屏幕（完成一帧显示）
        u8g2_SendBuffer(&u8g2);
    }
}
