/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : U8g2菜单库快捷字符跳转+菜单控制API功能示例
  * @author         : Yxg
  * @date           : 2026-03-16
  * @note           : 演示快捷字符绑定跳转、菜单核心控制API解析、弱定义事件回调函数重写
  *                   快捷字符支持一键跳转并可选自动选中，适配128x64 OLED屏，STM32 72MHz时钟
  *                   定时器2 1ms中断（按键扫描+菜单精确计时）
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
#include "delay.h"       // 延时函数（保障OLED/IIC通信时序）
#include "gpio.h"        // GPIO驱动（按键引脚初始化，低电平有效）

// OLED及菜单库头文件
#include "IIC_OLED.h"    // OLED硬件驱动（u8g2初始化、IIC通信封装）
#include "u8g2_menu.h"   // U8g2菜单库核心头文件（快捷跳转/控制API/弱函数声明）

/**
 * @brief 全局变量定义
 * @note  核心变量说明：
 *         1. u8g2：U8g2图形库实例，负责OLED底层绘图
 *         2. u8g2_menu：U8g2菜单库实例，管理菜单状态、快捷字符、菜单项索引
 */
u8g2_t u8g2;                  // U8g2图形库实例（OLED绘图核心）
u8g2_menu_t u8g2_menu;        // U8g2菜单库实例（菜单控制/快捷跳转核心）

/**
 * @brief  菜单页面1 - 快捷字符绑定核心逻辑
 * @note   功能说明：
 *         1. u8g2_MenuItemBindChar：绑定快捷跳转字符，支持一键定位到指定菜单项，此功能与附加值功能不冲突绑定时不分先后
 *            参数1：跳转字符（如'1'/'2'/'3'）；参数2：selected（1=跳转后自动选中，0=仅跳转不选中）
 *            → selected=1等价于：跳转后延迟1帧模拟按下Enter键，自动触发选中状态
 *         2. U8G2_MENU_VERSION：菜单库版本号宏，直接打印即可显示当前库版本
 *         3. 菜单项结构：
 *            - 绑定'1' → 显示版本号（自动选中）
 *            - 显示"str" → 绑定'2'（仅跳转不选中）
 *            - 显示"xbm" → 绑定'3'（仅跳转不选中）
 *            - 显示"close"
 * @param  无
 * @retval 无
 */
void menuItem_1()
{
    /* 快捷跳转字符绑定API说明：
    void u8g2_MenuItemBindChar(char c, uint8_t selected); 
    - c：触发跳转的字符（如数字、字母）
    - selected：跳转后是否自动选中（1=是，0=否）
      → 自动选中：模拟按下Enter键，触发u8g2_menuItemEnter回调
    */
    // 绑定字符'1'，跳转后自动选中对应菜单项（版本号行）
    u8g2_MenuItemBindChar('1', 1);
    // 显示菜单库版本号（此行为'1'绑定的目标菜单项）
    u8g2_MenuUTF8Printf(U8G2_MENU_VERSION);
    
    // 显示"str"（此行为'2'绑定的目标菜单项）
    u8g2_MenuUTF8Printf("str");
    // 绑定字符'2'，跳转后仅定位不选中
    u8g2_MenuItemBindChar('2', 0);
    
    // 显示"xbm"（此行为'3'绑定的目标菜单项）
    u8g2_MenuUTF8Printf("xbm");
    // 绑定字符'3'，跳转后仅定位不选中
    u8g2_MenuItemBindChar('3', 0);
    
    // 显示"close"（无快捷字符绑定）
    u8g2_MenuUTF8Printf("close");
}

/**
 * @brief  OLED显示封装函数
 * @note   统一绘制菜单，快捷字符跳转后的菜单项定位、选中状态均在此自动渲染
 * @param  u8g2: U8g2图形库实例指针（全局u8g2传入）
 * @retval 无
 */
void oled_display(u8g2_t * u8g2)
{
    // 绘制菜单：起始坐标(0,0)，尺寸128x64（匹配OLED屏幕）
    // 内部自动处理快捷跳转后的菜单项定位、选中标识渲染
    u8g2_DrawMenu(&u8g2_menu, 0, 0, 128, 64);
}

/**
 * @brief  按键扫描函数（带消抖）
 * @note   菜单交互核心：
 *         1. KEY_1(Up)：菜单项上移 | KEY_2(Down)：菜单项下移
 *         2. KEY_3(Enter)：选中当前菜单项（触发u8g2_menuItemEnter回调）
 *         3. 快捷字符触发：需在u8g2_menuCharEvent中处理字符输入
 * @param  time: 扫描间隔（固定1ms，与定时器中断周期一致）
 * @retval 无
 */
void keyScann(uint16_t time)
{
    // 上键：KEY_1低电平有效 → 菜单项上移
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Up, !KEY_1, time);
    // 下键：KEY_2低电平有效 → 菜单项下移
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Down, !KEY_2, time);
    // 确认键：KEY_3低电平有效 → 选中当前菜单项
    u8g2_MenuKeyScannDebounce(&u8g2_menu, MENU_Key_Enter, !KEY_3, time);
}

/**
 * @brief  定时器2中断服务函数（1ms中断）
 * @note   必须实现的核心接口：
 *         1. keyScann(1)：1ms间隔扫描按键，保障消抖和实时响应
 *         2. u8g2_MenuTime_ISR：菜单库精确计时
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
 * @brief  主函数（程序入口）
 * @note   核心逻辑：
 *         1. 硬件初始化 → OLED/菜单初始化 → 定时器初始化 → 主循环刷新
 *         2. 注释区解析所有菜单控制核心API，包含功能、参数、使用场景
 *         3. 弱定义函数可在本文件重写，实现自定义交互逻辑
 * @param  无
 * @retval 无
 */
int main(void)
{
    // 1. 底层硬件初始化
    delay_init();       // 初始化延时函数（OLED IIC通信时序依赖）
    gpio_init();        // 初始化GPIO（按键引脚配置为输入）
	
    // 2. OLED及菜单初始化
    oled_u8g2_init(&u8g2);                    // 初始化OLED硬件
    u8g2_SetFont(&u8g2, u8g2_font_10x20_tf);  // 设置菜单默认字体（10x20像素）
    u8g2_CreateMenu(&u8g2, &u8g2_menu, menuItem_1); // 创建菜单，绑定默认菜单项函数
    
    /* ==================== 菜单控制核心API全解析 ====================
     * 【菜单项切换/管理】
     * 1. void u8g2_MenuReplaceItem(u8g2_menu_t *menu, menuItem_cb cb);
     *    - 功能：切换菜单项绘制函数，触发展开动画（如从menuItem_1切到menuItem_2）
     *    - 参数：menu=菜单实例，cb=新的菜单项绘制函数
     * 
     * 2. menuItem_cb u8g2_MenuGetItem(u8g2_menu_t *menu);
     *    - 功能：获取当前绑定的菜单项绘制函数（用于判断当前菜单页面）
     * 
     * 【平移/滚动控制（适配超长文本）】
     * 3. u8g2_int_t u8g2_MenuGetHorizontalOffset(u8g2_menu_t *menu);
     *    - 功能：获取当前水平偏移量（超长文本滚动的位置）
     * 
     * 4. void u8g2_MenuSetPositionOffsetSpe(u8g2_menu_t *menu, float spe);
     *    - 功能：设置文本平移速度（值越大滚动越快）
     * 
     * 5. float u8g2_MenuGetPositionOffsetSpe(u8g2_menu_t *menu);
     *    - 功能：获取当前文本平移速度
     * 
     * 6. void u8g2_MenuSetPositionOffsetStrHeaderLen(u8g2_menu_t *menu, float len);
     *    - 功能：设置平移头长度（核心概念见下方说明）
     * 
     * 【平移头概念】：
     * - 解决问题：超长文本直接滚动会导致前几个字符可视时间短，固定延时适配性差
     * - 实现逻辑：虚拟"平移头"跟随文本滚动，根据字体宽度动态调整延时，保证每个字符可视时间均匀
     * 
     * 【菜单项定位】
     * 7. void u8g2_MenuItemUpS(u8g2_menu_t *menu, u8g2_uint_t i); → 上移i项
     * 8. void u8g2_MenuItemUp(u8g2_menu_t *menu); → 上移1项（简化版）
     * 9. void u8g2_MenuItemDownS(u8g2_menu_t *menu, u8g2_uint_t i); → 下移i项
     * 10. void u8g2_MenuItemDown(u8g2_menu_t *menu); → 下移1项（简化版）
     * 11. void u8g2_MenuItemMove(u8g2_menu_t *menu, u8g2_uint_t i); → 直接移动到第i项（索引从0开始）
     * 
     * 【选中状态/附加值控制】
     * 12. u8g2_uint_t u8g2_MenuGetCurrentSelection(u8g2_menu_t *menu); → 获取当前选中项索引
     * 13. void u8g2_MenuItemSelect(u8g2_menu_t *menu); → 选中当前项（触发enter回调）
     * 14. void u8g2_MenuItemDeSelect(u8g2_menu_t *menu); → 取消选中当前项
     * 15. u8g2_int_t u8g2_MenuGetItemSelect(u8g2_menu_t *menu); → 获取选中状态（1=选中，0=未选中）
     * 
     * 【附加值调整（绑定数值项）】
     * 16. void u8g2_MenuItemAddS(u8g2_menu_t *menu, u8g2_uint_t k); → 附加值加k
     * 17. void u8g2_MenuItemAdd(u8g2_menu_t *menu); → 附加值加1（简化版）
     * 18. void u8g2_MenuItemSubS(u8g2_menu_t *menu, u8g2_uint_t k); → 附加值减k
     * 19. void u8g2_MenuItemSub(u8g2_menu_t *menu); → 附加值减1（简化版）
     * 
     * 【全局/实例获取】
     * 20. u8g2_menu_t *u8g2_MenuGetCurrentMenu(void); → 获取当前激活的菜单实例
     * 21. u8g2_t *u8g2_MenuGetU8g2(u8g2_menu_t *menu); → 获取菜单绑定的U8g2实例
     */
	
    // 3. 定时器初始化（1ms中断）
    // 参数：自动重装值(1000-1)，预分频值(72-1) → 72MHz/72=1MHz → 1MHz/1000=1kHz（1ms中断）
    tim2_init(1000-1, 72-1);
    
    // 主循环（持续刷新屏幕，响应快捷字符/按键操作）
    while(1)
    {
        u8g2_ClearBuffer(&u8g2);  // 清空显存缓冲区（避免帧残留）
        oled_display(&u8g2);      // 绘制菜单（自动处理快捷跳转/选中状态）
        u8g2_SendBuffer(&u8g2);   // 发送显存数据到OLED屏幕
    }
}

/* ==================== 弱定义事件回调函数（可重写实现自定义逻辑） ====================
 * 说明：以下函数在u8g2_meun_weak.c中以__weak修饰，用户可在此重写，覆盖默认空实现，会在合适的时机被执行
 */

/**
 * @brief  选中菜单项时的回调函数
 * @note   重写场景：菜单项被选中（Enter键/快捷字符自动选中）时执行自定义逻辑
 *         示例：选中"close"项时关闭菜单、选中"xbm"项时显示图片弹窗
 * @param  u8g2_menu: 菜单实例指针
 * @param  item: 选中的菜单项索引（从0开始计数）
 * @return void
 */
void u8g2_menuItemEnter(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
    // 示例逻辑：根据选中项索引执行不同操作
    switch(item)
    {
        case 0: // 版本号项被选中
            // 可添加：串口打印版本号、显示版本详情弹窗等
            break;
        case 1: // "str"项被选中
            // 可添加：显示字符串弹窗等
            break;
        case 2: // "xbm"项被选中
            // 可添加：显示XBM图片等
            break;
        case 3: // "close"项被选中
            // 可添加：退出菜单、返回主界面等
            break;
    }
}

/**
 * @brief  离开菜单项时的回调函数
 * @note   重写场景：从当前菜单项切换到其他项时执行清理逻辑
 *         示例：离开"xbm"项时关闭图片弹窗、释放资源
 * @param  u8g2_menu: 菜单实例指针
 * @param  item: 离开的菜单项索引
 * @return void
 */
void u8g2_menuItemLeave(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
    // 示例：离开"xbm"项（索引2）时关闭图片弹窗
    if(item == 2)
    {
        // u8g2_MenuDrawMessageBoxClose(u8g2_menu);
    }
}

/**
 * @brief  托管值增加时的回调函数
 * @note   重写场景：绑定的数值项（如quantity）增加时执行逻辑
 *         示例：数值增加后同步到串口输出、更新硬件参数、也可以用来监视某已知地址的数值是否变化
 * @param  p: 变化值的地址（需强制类型转换为对应类型，如uint16_t*）
 * @return void
 */
void u8g2_menuValueAdd(void * p)
{
    // 示例：打印增加后的数值（假设p是uint16_t类型）
    // printf("Value add: %d\n", *(uint16_t*)p);
}

/**
 * @brief  托管值减少时的回调函数
 * @note   重写场景：绑定的数值项减少时执行逻辑
 * @param  p: 变化值的地址
 * @return void
 */
void u8g2_menuValueSub(void * p)
{
    // 示例：打印减少后的数值
    // printf("Value sub: %d\n", *(uint16_t*)p);
}

/**
 * @brief  托管值变化时的回调函数
 * @note   重写场景：绑定的数值项（增/减）变化时统一执行逻辑
 * @param  p: 变化值的地址
 * @return void
 */
void u8g2_menuValueChange(void * p)
{
    // 示例：数值变化后更新硬件（如PWM占空比）
    // set_pwm_duty(*(uint16_t*)p);
}

/**
 * @brief  按键输入事件回调函数
 * @note   重写场景：自定义按键逻辑、修改按键映射（如将KEY_1映射为快捷字符'1'）
 * @param  u8g2_menu: 菜单实例指针
 * @param  u8g2_menuKeyValue: 按键事件（可修改此值改变默认按键行为）
 * @return void
 */
void u8g2_menuKeyEvent(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t *u8g2_menuKeyValue)
{
    // 示例：将KEY_Enter映射为快捷字符'1'的触发
    // if(*u8g2_menuKeyValue == MENU_Key_Enter)
    // {
    //     char c = '1';
    //     u8g2_menuCharEvent(u8g2_menu, &c); // 触发字符'1'的快捷跳转
    // }
}

/**
 * @brief  字符输入事件回调函数
 * @note   重写场景：处理快捷字符输入、过滤非法字符、扩展字符跳转逻辑
 * @param  u8g2_menu: 菜单实例指针
 * @param  c: 输入的字符（可修改此值过滤/替换字符）
 * @return void
 */
void u8g2_menuCharEvent(u8g2_menu_t *u8g2_menu, char *c)
{
    // 示例：过滤非数字字符（仅允许'1'/'2'/'3'触发跳转）
    if(*c < '1' || *c > '3')
    {
        *c = 0; // 清空非法字符，不触发跳转
    }
}

/**
 * @brief  全局事件过滤器
 * @note   重写场景：统一过滤/拦截所有菜单事件（按键、字符、选中、值变化等）
 * @param  u8g2_menu: 菜单实例指针
 * @param  eventItem: 待处理的事件结构体（包含事件类型、参数）
 * @return uint8_t: 0=事件需继续处理，1=事件已处理（拦截）
 */
uint8_t menuEventUserHandle(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t * eventItem)
{
    // 示例：拦截"close"项的选中事件（索引3）
    // if(eventItem->type == MENU_EVENT_ENTER && eventItem->item == 3)
    // {
    //     return 1; // 拦截事件，不执行默认选中逻辑
    // }
    return 0; // 放行所有事件
}