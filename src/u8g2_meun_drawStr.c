#include "u8g2_menu.h"

/**
 * @brief 初始化文本区域结构体
 * @details 初始化文本区域所有字段，设置默认行间距，重置滚动状态到顶部
 * @param[in,out] text 待初始化的文本区域结构体指针
 * @param[in] textData 初始文本内容（支持const char*字符串字面量）
 * @note 默认行间距为2像素，滚动位置初始化为0
 */
void u8g2_textArea_init(u8g2_menu_textArea_t *text, const char * textData)
{
    if (!text)
        return;
    
    text->text = textData;
    text->targetLocation = 0;
    text->currentLocation = 0.0f;
    text->totalNumberOfLines = 0;
    text->lineSpacing = U8G2_TEXTAREA_LINE_SPACE;
}

/**
 * @brief 设置文本区域目标滚动位置
 * @details 设置滚动目标位置，实际绘制时会自动限制在有效范围[0, 总行数-1]
 * @param[in,out] text 文本区域结构体指针
 * @param[in] targetLocation 目标滚动行号（0为顶部）
 */
void u8g2_textArea_setTargetLocation(u8g2_menu_textArea_t *text, const int16_t targetLocation)
{
    if (!text)
        return;
    
    text->targetLocation = targetLocation;
}

/**
 * @brief 获取文本区域目标滚动位置
 * @param[in] text 文本区域结构体指针
 * @return 当前目标滚动行号，无效指针返回0
 */
int16_t u8g2_textArea_getTargetLocation(u8g2_menu_textArea_t *text)
{
    if (!text)
        return 0;
    
    return text->targetLocation;
}

/**
 * @brief 获取文本区域当前平滑滚动位置
 * @param[in] text 文本区域结构体指针
 * @return 当前平滑滚动位置（浮点型），无效指针返回0.0f
 */
float u8g2_textArea_getCurrentLocation(u8g2_menu_textArea_t *text)
{
    if (!text)
        return 0.0f;
    
    return text->currentLocation;
}

/**
 * @brief 获取文本总行数
 * @param[in] text 文本区域结构体指针
 * @return 自动计算的文本总行数，无效指针返回0
 * @note 总行数会在每次绘制时自动更新
 */
uint16_t u8g2_textArea_getTotalNumberOfLines(u8g2_menu_textArea_t *text)
{
    if (!text)
        return 0;
    
    return text->totalNumberOfLines;
}

/**
 * @brief 设置文本行间距
 * @param[in,out] text 文本区域结构体指针
 * @param[in] lineSpacing 行间距（单位：像素）
 */
void u8g2_textArea_setLineSpacing(u8g2_menu_textArea_t *text, const uint16_t lineSpacing)
{
    if (!text)
        return;
    
    text->lineSpacing = lineSpacing;
}

/**
 * @brief 获取当前文本行间距
 * @param[in] text 文本区域结构体指针
 * @return 当前行间距（单位：像素），无效指针返回0
 */
uint16_t u8g2_textArea_getLineSpacing(u8g2_menu_textArea_t *text)
{
    if (!text)
        return 0;
    
    return text->lineSpacing;
}

/**
 * @brief 更新文本区域内容
 * @details 设置新的文本内容，自动重置滚动位置到顶部，下次绘制时重新计算总行数
 * @param[in,out] text 文本区域结构体指针
 * @param[in] textData 新的文本内容（支持const char*字符串字面量）
 * @note 调用后会自动将targetLocation和currentLocation重置为0
 */
void u8g2_textArea_setText(u8g2_menu_textArea_t *text, const char * textData)
{
    if (!text)
        return;
    
    text->text = textData;
    text->targetLocation = 0;
    text->totalNumberOfLines = 0;
}

/**
 * @brief 获取当前文本内容
 * @param[in] text 文本区域结构体指针
 * @return 当前文本内容指针，无效指针返回NULL
 */
char * u8g2_textArea_getText(u8g2_menu_textArea_t *text)
{
    if (!text)
        return NULL;
    
    return (char *)text->text;
}

/**
 * @brief 获取UTF-8字符的字节长度
 * @param c UTF-8字符的首字节
 * @return 字符占用的字节数(1-4)，无效UTF-8返回1
 */
static inline uint8_t u8g2_utf8_char_len(const char c)
{
    if ((c & 0x80) == 0x00) return 1;    // 0xxxxxxx: 单字节(ASCII)
    if ((c & 0xE0) == 0xC0) return 2;    // 110xxxxx: 双字节
    if ((c & 0xF0) == 0xE0) return 3;    // 1110xxxx: 三字节(中文)
    if ((c & 0xF8) == 0xF0) return 4;    // 11110xxx: 四字节(emoji)
    return 1; // 无效UTF-8，当作单字节处理
}

/**
 * @brief 从start位置开始，复制一行UTF-8文本到缓冲区，不超过max_width像素宽度
 * @param u8g2 U8g2句柄
 * @param start 文本起始指针
 * @param buf 输出缓冲区
 * @param buf_size 缓冲区大小
 * @param max_width 最大允许像素宽度
 * @return 该行实际占用的字节数(不含'\0')，返回0表示到达文本末尾
 */
static u8g2_uint_t u8g2_copy_utf8_line(u8g2_t *u8g2, const char *start, char *buf, u8g2_uint_t buf_size, u8g2_uint_t max_width)
{
    if (!start || !buf || buf_size < 2 || *start == '\0')
        return 0;

    const char *p = start;
    char *buf_p = buf;
    u8g2_uint_t buf_used = 0;

    while (*p != '\0' && buf_used < buf_size - 1)
    {
        if (*p == '\n' || *p == '\r')
            break;
        uint8_t char_len = u8g2_utf8_char_len(*p);
        if (buf_used + char_len >= buf_size - 1)
            break;

        memcpy(buf_p, p, char_len);
        buf_p += char_len;
        buf_used += char_len;
        *buf_p = '\0'; // 临时终止字符串计算宽度

        if (u8g2_GetUTF8Width(u8g2, buf) > max_width)
        {
            // 超宽，回滚最后一个字符
            buf_p -= char_len;
            buf_used -= char_len;
            *buf_p = '\0';
            break;
        }
        p += char_len;
    }

    return buf_used;
}

/**
 * @brief 带自动换行、平滑滚动和进度条的UTF-8文本区域绘制
 * @details 绘制一个带边框的文本区域，支持UTF-8中文自动换行、平滑滚动、底部进度条
 *          自动识别\n换行，完全忽略\r，水平方向永不截断字符，垂直方向允许显示不全
 * @param[in] u8g2 U8g2库句柄
 * @param[in,out] text 文本区域结构体指针，包含文本内容、滚动状态和配置参数
 * @param[in] x 文本区域左上角X坐标
 * @param[in] y 文本区域左上角Y坐标
 * @param[in] h 文本区域总高度
 * @param[in] w 文本区域总宽度
 * @note 支持const char*字符串字面量，单行最大字节数由U8G2_TEXTAREA_MAX_LINE_BYTES定义
 * @note 滚动逻辑：外部设置targetLocation，currentLocation自动平滑跟随
 * @note 底部进度条仅在总行数>1时显示，进度与滚动位置成正比
 */
void u8g2_DrawTextArea(u8g2_t *u8g2, u8g2_menu_textArea_t *text, u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h)
{
    if (!u8g2 || !text || !text->text || h < 10 || w < 10)
        return;

    const u8g2_uint_t margin = U8G2_TEXTAREA_BORDER_SIZE;
    const u8g2_uint_t progress_h = U8G2_TEXTAREA_PROGRESS_HEIGHT;
    const float scroll_speed = U8G2_TEXTAREA_TRACK_SPEED;

    u8g2_int_t draw_x = x + margin;
    u8g2_int_t draw_y = y + margin;
    u8g2_uint_t draw_w = w - 2 * margin;
    u8g2_uint_t draw_h = h - 2 * margin;

    u8g2_uint_t font_h = u8g2_GetMaxCharHeight(u8g2);
    u8g2_uint_t line_h = font_h + text->lineSpacing;

    // 目标值限制在 0 ~ totalNumberOfLines-1
    if (text->totalNumberOfLines > 0 && text->targetLocation >= text->totalNumberOfLines)
        text->targetLocation = text->totalNumberOfLines - 1;
    text->currentLocation += (text->targetLocation - text->currentLocation) * scroll_speed;
    if (ABS(text->targetLocation - text->currentLocation) < 0.01f)
        text->currentLocation = text->targetLocation;

    u8g2_DrawFrame(u8g2, x, y, w, h);
    u8g2->draw_color = !u8g2->draw_color;
    u8g2_DrawBox(u8g2, x+1, y+1, w-2, h-2);
    u8g2->draw_color = !u8g2->draw_color;

    text->totalNumberOfLines = 0;
    const char *p = text->text;
    char line_buf[U8G2_TEXTAREA_MAX_LINE_BYTES];

    while (*p != '\0')
    {
        while (*p == '\r')
            p++;
        
        if (*p == '\0')
            break;

        u8g2_uint_t line_len = u8g2_copy_utf8_line(u8g2, p, line_buf, sizeof(line_buf), draw_w);
        
        if (line_len == 0)
        {
            text->totalNumberOfLines++;
            p++;
            continue;
        }
        text->totalNumberOfLines++;
        p += line_len;
        while (*p == '\n' || *p == '\r')
        {
            if (*p == '\n')
            {
                if (*(p+1) != '\0' && *(p+1) != '\r' && *(p+1) != '\n')
                    text->totalNumberOfLines++;
            }
            p++;
        }
    }

    float scroll_offset = text->currentLocation * line_h;
    u8g2_uint_t draw_line_y = draw_y + font_h - (u8g2_uint_t)scroll_offset;
    p = text->text;
    u8g2_SetClipWindow(u8g2, nonNegative(draw_x), nonNegative(draw_y), nonNegative(draw_x + draw_w), nonNegative(draw_y + draw_h));
    while (*p != '\0')
    {
        while (*p == '\r')
            p++;
        if (*p == '\0')
            break;

        u8g2_uint_t line_len = u8g2_copy_utf8_line(u8g2, p, line_buf, sizeof(line_buf), draw_w);
        
        if (line_len == 0)
        {
            draw_line_y += line_h;
            p++;
            continue;
        }

        if (draw_line_y >= draw_y && draw_line_y < draw_y + draw_h + line_h)
        {
            u8g2_DrawUTF8(u8g2, draw_x, draw_line_y, line_buf);
        }

        draw_line_y += line_h;
        p += line_len;
        while (*p == '\n' || *p == '\r')
        {
            if (*p == '\n')
            {
                if (*(p+1) != '\0' && *(p+1) != '\r' && *(p+1) != '\n')
                {
                    draw_line_y += line_h;
                }
            }
            p++;
        }
    }

    u8g2_uint_t bar_x = x + margin;
    u8g2_uint_t bar_y = y + h - margin - progress_h;
    u8g2_uint_t bar_w = w - 2 * margin;

    float progress = 0.0f;
    if (text->totalNumberOfLines > 1)
    {
        progress = text->currentLocation / (text->totalNumberOfLines - 1);
    }
    if (progress > 1.0f) progress = 1.0f;
    if (progress < 0.0f) progress = 0.0f;

    u8g2_DrawHProgressBar(u8g2, bar_x, bar_y, bar_w, progress_h, progress);
}

/**
 * @brief 菜单项形式绘制多行文本区域
 * @details 在菜单系统中绘制完整的多行文本区域菜单项，自动继承菜单坐标与宽度
 *          内部调用u8g2_DrawTextArea实现全部文本功能，支持UTF-8、自动换行与进度条
 * @param[in] text 文本区域结构体指针
 * @param[in] h 菜单项总高度
 * @note 自动处理菜单绘制生命周期，会将文本内容记录到菜单历史
 */
void u8g2_MenuDrawTextArea(u8g2_menu_textArea_t *text, u8g2_uint_t h)
{
    if (!text)
        return;
    u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
    if (!menu || !u8g2)
        return;
    u8g2_MenuDrawItemSetSize(menu,u8g2_MenuGetW(menu), h);
    u8g2_MenuSelectorCall(menu);

    u8g2_int_t X = u8g2_MenuGetX(menu);
    u8g2_int_t Y = u8g2_MenuGetY(menu);
    u8g2_int_t W = u8g2_MenuGetW(menu);
    u8g2_int_t H = u8g2_MenuGetH(menu);
    u8g2_DrawTextArea(u8g2,text,X,Y,W,H);
    
    u8g2_MenuDrawItemEnd(menu);
    u8g2_MenuRecordAdd(menu, text->text);
}

/**
 * @brief 带滚动绑定的多行文本区域快捷绘制
 * @details 自动绑定菜单滚动控制的文本区域，无需手动处理滚动逻辑
 *          内部创建int16值项关联targetLocation，滚动范围自动设为0~文本总行数
 * @param[in] text 文本区域结构体指针
 * @param[in] h 菜单项总高度
 * @note 通过菜单上下键即可直接控制文本滚动，无需额外编写按键处理
 * @note 文本总行数会由u8g2_DrawTextArea自动计算并更新到结构体
 */
void u8g2_MenuDrawTextArea_bind(u8g2_menu_textArea_t *text, u8g2_uint_t h)
{
    if (!text)
        return;
    u8g2_MenuItemValue_int16(&text->targetLocation,-1,0,text->totalNumberOfLines);
    u8g2_MenuDrawTextArea(text,h);
}

/**
 * @brief 菜单项绘制字符串
 *
 * @param u8g2_Draw 绘制函数
 * @param str 字符串
 * @param multiple 放大倍数
 *
 * @return void
 */
void u8g2_MenuDrawItemStr(u8g2_uint_t (*u8g2_Draw)(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, const char *str), const char *str, u8g2_uint_t multiple)
{
    if (!u8g2_Draw || !multiple)
        return;
    u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
    if (!menu)
        return;
    u8g2_MenuDrawItemSetSize(menu,u8g2_GetUTF8Width(u8g2, str) * multiple, u8g2_GetMaxCharHeight(u8g2) * multiple);
    u8g2_MenuSelectorCall(menu);

    u8g2_int_t YH = u8g2_MenuGetY(menu) + u8g2_MenuGetH(menu);
    u8g2_Draw(u8g2, u8g2_MenuGetHorizontalOffset(menu), YH + u8g2_GetDescent(u8g2), str);
    
    u8g2_MenuDrawItemEnd(menu);
    u8g2_MenuRecordAdd(menu, str);
}

/**
 * @brief 字符串项显示函数
 * @note 在菜单项绘制函数中调用本函数来显示字符串
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawStr(char *str)
{
    char *token;
    token = strtok(str, "\n");
    while (token != NULL)
    {
        u8g2_MenuDrawItemStr(u8g2_DrawStr, token, 1);
        token = strtok(NULL, "\n");
    }
}

/**
 * @brief 字符串项显示函数 2倍大
 * @note 在菜单项绘制函数中调用本函数来显示字符串 2倍大
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawStrX2(char *str)
{
    char *token;
    token = strtok(str, "\n");
    while (token != NULL)
    {
        u8g2_MenuDrawItemStr(u8g2_DrawStrX2, token, 2);
        token = strtok(NULL, "\n");
    }
}

/**
 * @brief 字符串项显示函数 UTF-8
 * @note 在菜单项绘制函数中调用本函数来显示字符串 UTF-8
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawUTF8(char *str)
{
    char *token;
    token = strtok(str, "\n");
    while (token != NULL)
    {
        u8g2_MenuDrawItemStr(u8g2_DrawUTF8, token, 1);
        token = strtok(NULL, "\n");
    }
}

/**
 * @brief 字符串项显示函数 2倍大 UTF-8
 * @note 在菜单项绘制函数中调用本函数来显示字符串 2倍大 UTF-8
 *
 * @param str 要显示的字符串
 *
 * @return void
 */
void u8g2_MenuDrawUTF8X2(char *str)
{
    char *token;
    token = strtok(str, "\n");
    while (token != NULL)
    {
        u8g2_MenuDrawItemStr(u8g2_DrawUTF8X2, token, 2);
        token = strtok(NULL, "\n");
    }
}

/**
 * @brief 菜单项绘制密码
 *
 * @param u8g2_Draw 绘制函数
 * @param str 密码
 * @param mask 掩码
 * @param multiple 放大倍数
 *
 * @return void
 */
void u8g2_MenuDrawItemPassword(u8g2_uint_t (*u8g2_Draw)(u8g2_t *u8g2, u8g2_uint_t x, u8g2_uint_t y, const char *str), char *str, char mask, u8g2_uint_t multiple)
{
    char token[32];
    uint16_t len;
    len = strlen(str);
    if(len > 32 - 1) len = 32 - 1;
    token[len] = '\0';
    while (len--) token[len] = mask;
    u8g2_MenuDrawItemStr(u8g2_Draw, token, multiple);
}

/**
 * @brief 密码项显示函数
 * @note 在菜单项绘制函数中调用本函数来显示密码
 *
 * @param str 要显示的密码
 * @param mask 掩码
 *
 * @return void
 */
void u8g2_MenuDrawPassword(char *str, char mask)
{
    u8g2_MenuDrawItemPassword(u8g2_DrawStr,str,mask,1);
}

/**
 * @brief 密码项显示函数 2倍大
 * @note 在菜单项绘制函数中调用本函数来显示密码
 *
 * @param str 要显示的密码
 * @param mask 掩码
 *
 * @return void
 */
void u8g2_MenuDrawPasswordX2(char *str, char mask)
{
    u8g2_MenuDrawItemPassword(u8g2_DrawStrX2,str,mask,2);
}

/**
 * @brief 字符串项格式化显示函数
 * @note 在菜单项绘制函数中调用本函数来显示字符串
 *
 * @param u8g2_MenuDraw 绘制函数
 * @param fmt 格式化字符串
 * @param ... 参数
 *
 * @return void
 */
void u8g2_MenuPrintf(u8g2_MenuDraw_cb u8g2_MenuDraw, const char *fmt, ...)
{
    char buffer[256];
    va_list arg_ptr;
    va_start(arg_ptr, fmt);
    vsnprintf(buffer, 256, fmt, arg_ptr);
    va_end(arg_ptr);
    u8g2_MenuDraw(buffer);
}

/**
 * @brief 字符串项格式化显示函数 - 快捷函数 固定调用 u8g2_MenuDrawUTF8
 * @note 在菜单项绘制函数中调用本函数来显示字符串
 *
 * @param fmt 格式化字符串
 * @param ... 参数
 *
 * @return void
 */
void u8g2_MenuUTF8Printf(const char *fmt, ...)
{
    char buffer[256];
    va_list arg_ptr;
    va_start(arg_ptr, fmt);
    vsnprintf(buffer, 256, fmt, arg_ptr);
    va_end(arg_ptr);
    u8g2_MenuDrawUTF8(buffer);
}
