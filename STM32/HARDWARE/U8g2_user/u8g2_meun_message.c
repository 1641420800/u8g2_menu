#include "u8g2_menu.h"

typedef struct
{
    uint8_t line;
    const char *text[];
} MessageBox_drawStr_t;
typedef struct
{
    u8g2_uint_t w;
    u8g2_uint_t h;
    const uint8_t *bitmap;
} MessageBox_drawXbm_t;

/**
 * @brief 消息框时间基准 已包含在菜单时间接口中 无需重复调用
 *
 * @param u8g2 u8g2对象
 * @param ms 已过时间
 *
 * @return void
 */
void u8g2_MenuMessageBoxTime_ISR(u8g2_menu_t *u8g2_menu, uint16_t ms)
{
    if(!u8g2_menu || !ms) return;
    
#if U8G2_MENU_MESSAGEBOX
    if(ms < u8g2_menu->drawMessageBoxTimerLeft)
    {
        if(u8g2_menu->drawMessageBoxTimer != U8G2_MENU_INFINITE_TIMEOUT)
        {
            u8g2_menu->drawMessageBoxTimerLeft -= ms;
        }
    }
    else
    {
        u8g2_menu->drawMessageBoxTimerLeft = 0;
    }
#endif
}

/**
 * @brief 消息框绘制主函数 负责处理消息框的渲染和超时逻辑
 *
 * @param u8g2_menu u8g2菜单对象指针
 *
 * @return void 
 */
void u8g2_menuMessageBoxCall(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return;
#if U8G2_MENU_MESSAGEBOX
    if(!u8g2_menu->drawMessageBoxTimerLeft)
    {
        if(u8g2_menu->message)
        {
            free(u8g2_menu->message);
            u8g2_menu->message = NULL;
        }
        u8g2_menu->drawMessageBoxTimer = 0;
        return;
    }
    
    u8g2_t *u8g2 = u8g2_menu->u8g2;
    
    if(u8g2_menu->drawMessageBox)
    {
        int16_t x = (u8g2_GetDisplayWidth(u8g2) - u8g2_menu->messageBoxWidth) / 2;
        int16_t y = (u8g2_GetDisplayHeight(u8g2) - u8g2_menu->messageBoxHeight) / 2;
        
        u8g2_SetDrawColor(u8g2,0);
        u8g2_DrawRBox(u8g2, x, y, u8g2_menu->messageBoxWidth, u8g2_menu->messageBoxHeight, 3);
        u8g2_SetDrawColor(u8g2,1);
        
        u8g2_menu->drawMessageBox(u8g2_menu->u8g2, u8g2_menu->messageBoxWidth, u8g2_menu->messageBoxHeight, u8g2_menu->message);
        
        u8g2_DrawRFrame(u8g2, x, y, u8g2_menu->messageBoxWidth, u8g2_menu->messageBoxHeight, 3);
        if(u8g2_menu->drawMessageBoxTimer != U8G2_MENU_INFINITE_TIMEOUT)
        {
            u8g2_SetDrawColor(u8g2,0);
            u8g2_DrawBox(u8g2,x,y + u8g2_menu->messageBoxHeight,u8g2_menu->messageBoxWidth,6);
            u8g2_SetDrawColor(u8g2,1);
            u8g2_DrawHProgressBar(u8g2,x,y + u8g2_menu->messageBoxHeight + 1,u8g2_menu->messageBoxWidth,6,(float)u8g2_menu->drawMessageBoxTimerLeft/u8g2_menu->drawMessageBoxTimer);
        }
    }
#endif
}

/**
 * @brief 设置消息框参数 用于配置消息框的绘制属性
 *
 * @param u8g2_menu u8g2菜单对象指针
 * @param drawMessageBox 消息框绘制回调函数
 * @param message 消息内容指针（需连续内存,将自动释放）
 * @param messageBoxWidth 消息框宽度
 * @param messageBoxHeight 消息框高度
 * @param drawMessageBoxTimer 消息框显示时长（单位：毫秒）
 *
 * @return void
 */
void u8g2_MenuDrawMessageBox(u8g2_menu_t *u8g2_menu, u8g2_MenuDrawMessageBox_cb drawMessageBox, void *message, u8g2_uint_t messageBoxWidth, u8g2_uint_t messageBoxHeight, uint32_t drawMessageBoxTimer)
{
    if(!u8g2_menu || !drawMessageBox) return;
#if U8G2_MENU_MESSAGEBOX
    
    if(u8g2_menu->message)
    {
        free(u8g2_menu->message);
        u8g2_menu->message = NULL;
    }
    if(drawMessageBoxTimer == 0) drawMessageBoxTimer = U8G2_MENU_INFINITE_TIMEOUT;
    u8g2_menu->drawMessageBox = drawMessageBox;
    u8g2_menu->message = message;
    u8g2_menu->messageBoxWidth = messageBoxWidth;
    u8g2_menu->messageBoxHeight = messageBoxHeight;
    u8g2_menu->drawMessageBoxTimer = drawMessageBoxTimer;
    u8g2_menu->drawMessageBoxTimerLeft = drawMessageBoxTimer;
#endif
}

/**
 * @brief 关闭消息框 立即清除当前显示的消息框
 *
 * @param u8g2_menu u8g2菜单对象指针
 *
 * @return void
 */
void u8g2_MenuDrawMessageBoxClose(u8g2_menu_t *u8g2_menu)
{
    u8g2_MenuDrawMessageBox(u8g2_menu, NULL, NULL, 0, 0, 0);
}

/**
 * @brief 获取当前总显示时间
 *
 * @param u8g2_menu u8g2菜单对象指针
 *
 * @return void
 */
uint32_t u8g2_MenuGetMessageBoxTimer(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return 0;
#if U8G2_MENU_MESSAGEBOX
    return u8g2_menu->drawMessageBoxTimer;
#else
    return 0;
#endif  
}

/**
 * @brief 获取剩余显示时间
 *
 * @param u8g2_menu u8g2菜单对象指针
 *
 * @return void
 */
uint32_t u8g2_MenuGetMessageBoxTimerLeft(u8g2_menu_t *u8g2_menu)
{
    if(!u8g2_menu) return 0;
#if U8G2_MENU_MESSAGEBOX
    return u8g2_menu->drawMessageBoxTimerLeft;
#else
    return 0;
#endif  
}

/**
 * @brief 字符串消息框绘制函数 内部实现多行文本绘制
 *
 * @param u8g2 u8g2对象指针
 * @param width 消息框宽度
 * @param height 消息框高度
 * @param message 消息结构体指针（MessageBox_drawStr_t类型）
 *
 * @return void
 */
void u8g2_MenuDrawMessageBox_drawStr(u8g2_t *u8g2, u8g2_uint_t width, u8g2_uint_t height, void *message)
{
    if (!message) return;
#if U8G2_MENU_MESSAGEBOX
    MessageBox_drawStr_t *p = message;
    u8g2_uint_t x = (u8g2_GetDisplayWidth(u8g2) - width) / 2 + 2;
    u8g2_uint_t y = (u8g2_GetDisplayHeight(u8g2) - height) / 2 + 4;
    u8g2_uint_t h = u8g2_GetMaxCharHeight(u8g2);
    u8g2_uint_t ascent = u8g2_GetAscent(u8g2);
    for(int i = 0; i < p->line; ++i)
    {
        u8g2_DrawUTF8(u8g2, x, y + i * h + ascent, p->text[i]);
    }
#endif
}

/**
 * @brief 显示字符串消息框 自动处理换行符和布局
 *
 * @param u8g2_menu u8g2菜单对象指针
 * @param str 要显示的UTF8字符串（支持换行符）
 * @param drawMessageBoxTimer 消息框显示时长（0表示无限）
 *
 * @return void
 */
void u8g2_MenuDrawMessageBox_str(u8g2_menu_t *u8g2_menu, const char * str, uint32_t drawMessageBoxTimer)
{
    if (!str || !u8g2_menu) return;
#if U8G2_MENU_MESSAGEBOX

    // 保存原始指针，避免后续操作修改它
    const char *original_str = str;

    // 1. 计算行数
    uint8_t num_lines = 1;
    while (*str) {
        if (*str == '\n') {
            num_lines++;
        }
        str++;
    }

    // 2. 计算内存分配大小
    size_t str_len = strlen(original_str); // 使用原始指针计算长度
    size_t total_size = sizeof(MessageBox_drawStr_t) + num_lines * sizeof(char*) + str_len + 1;

    // 3. 分配内存
    MessageBox_drawStr_t *p = (MessageBox_drawStr_t*)malloc(total_size);
    if (!p) return;

    // 4. 初始化字符串存储位置
    char *pr = (char*)p + sizeof(MessageBox_drawStr_t) + num_lines * sizeof(char*);
    str = original_str; // 重置指针到字符串开头

    // 5. 分割字符串并填充text数组
    p->line = num_lines;
    for (int i = 0; i < num_lines; ++i) {
        p->text[i] = pr;
        while (*str && *str != '\n') {
            *pr = *str;
            pr++;
            str++;
        }
        *pr = '\0'; // 添加终止符
        pr++;
        if (*str == '\n') str++; // 跳过换行符
    }
    
    // 6.计算最大宽度
    u8g2_uint_t width = 0;
    for (int i = 0; i < num_lines; ++i) {
        u8g2_uint_t _width = u8g2_GetUTF8Width(u8g2_menu->u8g2, p->text[i]);
        if(width < _width) width = _width;
    }
    
    u8g2_MenuDrawMessageBox(u8g2_menu, u8g2_MenuDrawMessageBox_drawStr, (void*)p, width + 4, u8g2_GetMaxCharHeight(u8g2_menu->u8g2) * num_lines + 4, drawMessageBoxTimer);
#endif
}

/**
 * @brief 图片消息框绘制函数
 *
 * @param u8g2 u8g2对象指针
 * @param width 消息框宽度
 * @param height 消息框高度
 * @param message 消息结构体指针（MessageBox_drawXbm_t类型）
 *
 * @return void
 */
void u8g2_MenuDrawMessageBox_drawXbm(u8g2_t *u8g2, u8g2_uint_t width, u8g2_uint_t height, void *message)
{
    if (!message) return;
#if U8G2_MENU_MESSAGEBOX
    MessageBox_drawXbm_t *p = message;
    u8g2_uint_t x = (u8g2_GetDisplayWidth(u8g2) - width) / 2 + 1;
    u8g2_uint_t y = (u8g2_GetDisplayHeight(u8g2) - height) / 2 + 1;
    
    u8g2_DrawXBMP(u8g2,x,y,p->w,p->h,p->bitmap);
#endif
}

/**
 * @brief 显示图片消息框
 *
 * @param u8g2_menu u8g2菜单对象指针
 * @param w 图片宽度
 * @param h 图片高度
 * @param bitmap 图片数据
 * @param drawMessageBoxTimer 消息框显示时长（0表示无限）
 *
 * @return void
 */
void u8g2_MenuDrawMessageBox_xbm(u8g2_menu_t *u8g2_menu, u8g2_uint_t w, u8g2_uint_t h, const uint8_t *bitmap, uint32_t drawMessageBoxTimer)
{
    if (!bitmap || !u8g2_menu) return;
#if U8G2_MENU_MESSAGEBOX
    MessageBox_drawXbm_t *p = (MessageBox_drawXbm_t*)malloc(sizeof(MessageBox_drawXbm_t));
    p->w = w;
    p->h = h;
    p->bitmap = bitmap;
    
    u8g2_MenuDrawMessageBox(u8g2_menu, u8g2_MenuDrawMessageBox_drawXbm, (void*)p, w + 2, h + 2, drawMessageBoxTimer);
#endif
}
