/*
 * editor_shim.c — u8g2-menu-editor 的 WASM 预览引擎
 *
 * 设计原则：预览不走"模拟渲染"，而是把编辑器的声明式条目表转换为对
 * u8g2_menu 真实 API 的调用，与代码生成器产出的 C 代码走完全相同的库函数路径，
 * 保证预览 = 真机行为（像素级一致）。
 *
 * 条目模型（与编辑器一致）：绘制类型 + 可选附加值（绑定）
 *   绘制：文本/滑块条/进度条/图表/位图/文本区/自绘板
 *   附加值：无/数值/开关/按钮/子页面/返回（绘制前附加，可与任意绘制组合）
 *
 * JS 侧通过 emscripten ccall 调用以下导出：
 *   em_init(w, h)                       初始化 u8g2 + menu（当前固定 ssd1306 128x64 驱动）
 *   em_set_style(font, sel, l, t, sp, spe, header)
 *   em_var_define(slot, type, init, step, min, max)   定义变量（值池按变量共享）
 *   em_page_begin(page)                 开始设置某页
 *   em_page_item(page, idx, kind, scale, area_h, xbm_w, xbm_h, dispSlot, poolSlot)
 *   em_page_bind(page, idx, bindType, varType, swOpen, buttonId, target, poolSlot)
 *   em_item_text(page, idx, text)       条目文本/格式串
 *   em_item_bits(page, idx, ptr, len)   XBM 位图数据（ptr 指向 JS 已写入的 scratch）
 *   em_buf_define(slot, len, sample)    定义图表数据源缓冲区（示例填充）
 *   em_item_chart_add(page, idx, bufSlot, kind, fixed, fmax, fmin)  图表叠加数据源
 *   em_page_end(page, count)            结束某页
 *   em_pages_commit(count)              提交全部页面并保持当前预览页
 *   em_nav(page)                        预览跳转到指定页
 *   em_reset_dynamic()                  重置值池/资源池游标（结构变化时调用）
 *   em_frame(ms) -> ptr                 一帧：Clear + DrawMenu + Send + Time_ISR，返回显存
 *   em_key(key)                         注入按键 (u8g2_MenuKeys)
 *   em_font_h() / em_font_w()           当前字体度量
 *   em_get_ipool(slot) / em_get_fpool(slot) / em_get_upool(slot)   读取实时编辑值
 *   em_get_current_page()               当前页（子页面跳转后同步 UI）
 *   em_get_btn_count() / em_get_btn_last()  按钮回调触发计数/最近 ID
 */
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdarg.h>

#include "u8g2.h"
#include "u8g2_menu.h"

#define EM_MAX_PAGES 32
#define EM_MAX_ITEMS 64
#define EM_SLOTS     (EM_MAX_PAGES * EM_MAX_ITEMS)

/* ===================== 条目表 ===================== */

/* 绘制类型（与编辑器 DrawKind 一致） */
typedef enum {
    EM_Text = 0, EM_Slider, EM_Progress, EM_Chart, EM_XBM, EM_TextArea, EM_Board
} em_kind_t;

/* 附加值类型（与编辑器 Bind 一致） */
typedef enum {
    EM_BindNone = 0, EM_BindValue, EM_BindSwitch, EM_BindButton, EM_BindSubmenu, EM_BindBack
} em_bind_t;

typedef struct {
    uint8_t  kind;
    uint8_t  scale;        /* 1|2 */
    uint8_t  bindType;     /* em_bind_t */
    uint8_t  varType;      /* MENU_V_type_t（value 附加值用） */
    uint8_t  swOpen;
    uint8_t  buttonId;
    int16_t  target;       /* submenu 目标页 */
    int16_t  poolSlot;     /* 值池槽位（绑定变量共享；-1 = 按条目独立） */
    int16_t  dispSlot;     /* 文本只读显示变量槽位（-1 = 无） */
    int16_t  position;     /* 无绑定滑条/进度条的静态位置 0~100 */
    uint16_t xbm_w;        /* xbm 宽 / board 宽 */
    uint16_t xbm_h;        /* xbm 高 / board 高 */
    uint16_t area_h;       /* textarea/chart 高度 */
    uint8_t  bindScroll;   /* textarea */
    char     text[257];      /* 与导出端不限长文本对齐（256 + NUL） */
    char     onText[33];
    char     offText[33];
} em_item_t;

static em_item_t em_pages[EM_MAX_PAGES][EM_MAX_ITEMS];
static uint16_t  em_page_len[EM_MAX_PAGES];
static uint8_t   em_page_count = 0;
static uint8_t   em_current_page = 0;

/* ===================== 变量与值池（槽位 = 变量在池中的下标） ===================== */

typedef struct {
    uint8_t type;          /* MENU_V_type_t */
    int32_t step;
    int32_t min;
    int32_t max;
    uint8_t defined;
} em_var_meta_t;

static em_var_meta_t em_vars[EM_SLOTS];
static int32_t em_ipool[EM_SLOTS];
static float   em_fpool[EM_SLOTS];
static double  em_dpool[EM_SLOTS];
static uint8_t em_upool[EM_SLOTS];

/* ===================== 资源池 ===================== */

/* 图表结构池（每个条目-数据源对一个，dis 缓冲从 float 池分配） */
#define EM_CHART_STRUCTS 128
static u8g2_chart_t em_chart_structs[EM_CHART_STRUCTS];
static uint32_t em_chart_structs_used = 0;

#define EM_CHART_POOL_FLOATS 32768
static float    em_chart_pool[EM_CHART_POOL_FLOATS];
static uint32_t em_chart_used = 0;

/* 数据源缓冲区（手动创建，多图表可共用） */
#define EM_MAX_BUFS        32
#define EM_BUF_POOL_FLOATS 32768
#define EM_BUF_MAX_LEN     512
typedef struct {
    float   *data;
    uint16_t len;
    uint8_t  alloc;
} em_buf_t;
static em_buf_t  em_bufs[EM_MAX_BUFS];
static float     em_buf_pool[EM_BUF_POOL_FLOATS];
static uint32_t  em_buf_used = 0;

/* 图表叠加层：一个条目最多 4 个数据源，同区域依次绘制 */
#define EM_MAX_CHART_SRC 4
typedef struct {
    u8g2_menu_drawChart_t src[EM_MAX_CHART_SRC];
    uint8_t n;
} em_chart_layers_t;
static em_chart_layers_t em_chart_layers[EM_MAX_PAGES][EM_MAX_ITEMS];

#define EM_BITS_POOL_BYTES 65536
static uint8_t  em_bits_pool[EM_BITS_POOL_BYTES];
static uint32_t em_bits_used = 0;

#define EM_TA_POOL_BYTES 32768
static char em_ta_pool[EM_TA_POOL_BYTES];
static uint32_t em_ta_used = 0;
static u8g2_menu_textArea_t em_tas[EM_MAX_PAGES][EM_MAX_ITEMS];

/* ===================== 核心实例 ===================== */

static u8g2_t      em_u8g2;
static u8g2_menu_t em_menu;
static uint8_t     em_menu_ready = 0;

/* 按钮回调事件记录 */
static uint32_t em_btn_count = 0;
static uint8_t  em_btn_last = 0;

static void em_button_cb(u8g2_menu_t *menu, uint8_t ID, u8g2_menuKeyValue_t key)
{
    (void)menu;
    if (key != MENU_Key_Enter) return;
    em_btn_count++;
    em_btn_last = ID;
}

/* ===================== 页面桩 ===================== */

static void em_dispatch(uint8_t page);

#define EM_PAGE_STUB(n) \
    static void em_page_##n(void) { em_current_page = (n); em_dispatch(n); }

EM_PAGE_STUB(0)  EM_PAGE_STUB(1)  EM_PAGE_STUB(2)  EM_PAGE_STUB(3)
EM_PAGE_STUB(4)  EM_PAGE_STUB(5)  EM_PAGE_STUB(6)  EM_PAGE_STUB(7)
EM_PAGE_STUB(8)  EM_PAGE_STUB(9)  EM_PAGE_STUB(10) EM_PAGE_STUB(11)
EM_PAGE_STUB(12) EM_PAGE_STUB(13) EM_PAGE_STUB(14) EM_PAGE_STUB(15)
EM_PAGE_STUB(16) EM_PAGE_STUB(17) EM_PAGE_STUB(18) EM_PAGE_STUB(19)
EM_PAGE_STUB(20) EM_PAGE_STUB(21) EM_PAGE_STUB(22) EM_PAGE_STUB(23)
EM_PAGE_STUB(24) EM_PAGE_STUB(25) EM_PAGE_STUB(26) EM_PAGE_STUB(27)
EM_PAGE_STUB(28) EM_PAGE_STUB(29) EM_PAGE_STUB(30) EM_PAGE_STUB(31)

static const menuItem_cb em_page_stubs[EM_MAX_PAGES] = {
    em_page_0,  em_page_1,  em_page_2,  em_page_3,
    em_page_4,  em_page_5,  em_page_6,  em_page_7,
    em_page_8,  em_page_9,  em_page_10, em_page_11,
    em_page_12, em_page_13, em_page_14, em_page_15,
    em_page_16, em_page_17, em_page_18, em_page_19,
    em_page_20, em_page_21, em_page_22, em_page_23,
    em_page_24, em_page_25, em_page_26, em_page_27,
    em_page_28, em_page_29, em_page_30, em_page_31,
};

/* 字体表由 genfonts.c 提供 */
extern const uint8_t * const em_fonts[];
extern const char * const em_font_names[];
extern const int em_font_lens[];
extern const int em_font_count;

/* 自定义字体槽（现场取模：JS 写入子集字体字节后切换） */
static uint8_t em_custom_font[16384];
static uint16_t em_custom_font_len = 0;

/* ===================== u8g2 传输桩 ===================== */

static uint8_t em_byte_cb(u8x8_t *u8x8, uint8_t msg, uint8_t arg_int, void *arg_ptr)
{
    (void)u8x8; (void)msg; (void)arg_int; (void)arg_ptr;
    return 1; /* 帧缓冲模式下传输无实际意义 */
}

static uint8_t em_gpio_cb(u8x8_t *u8x8, uint8_t msg, uint8_t arg_int, void *arg_ptr)
{
    (void)u8x8; (void)msg; (void)arg_int; (void)arg_ptr;
    return 1;
}

/* ===================== 绘制辅助 ===================== */

static void em_draw_text_buf(em_item_t *it, char *buf)
{
    if (it->scale == 2)
        u8g2_MenuDrawUTF8X2(buf);
    else
        u8g2_MenuDrawUTF8(buf);
}

/* 附加值附着（绘制前调用；与生成代码的绑定行同路径） */
static void em_apply_bind(const em_item_t *it, uint32_t slot)
{
    switch (it->bindType) {
    case EM_BindValue:
        switch (em_vars[slot].type) {
        case MENU_V_float:
            u8g2_MenuItemValue_float(&em_fpool[slot], (float)em_vars[slot].step,
                                     (float)em_vars[slot].min, (float)em_vars[slot].max);
            break;
        case MENU_V_double:
            u8g2_MenuItemValue_double(&em_dpool[slot], (double)em_vars[slot].step,
                                      (double)em_vars[slot].min, (double)em_vars[slot].max);
            break;
        default: /* 整数族统一用 int32 路径，视觉行为一致 */
            u8g2_MenuItemValue_int32(&em_ipool[slot], em_vars[slot].step,
                                     em_vars[slot].min, em_vars[slot].max);
            break;
        }
        break;
    case EM_BindSwitch:
        u8g2_MenuItemValue_switch(&em_upool[slot], it->swOpen);
        break;
    case EM_BindButton:
        u8g2_MenuItem_button(em_button_cb, it->buttonId);
        break;
    case EM_BindSubmenu:
        if (it->target >= 0 && it->target < EM_MAX_PAGES && em_page_len[it->target] > 0)
            u8g2_MenuItem_menu_enter(em_page_stubs[it->target]);
        break;
    case EM_BindBack:
        u8g2_MenuItem_menu_back();
        break;
    default:
        break;
    }
}

/* 文本行的实际显示内容：附加值/显示变量决定 printf 参数 */
static void em_format_text(const em_item_t *it, uint32_t slot, char *buf, size_t bufsize)
{
    if (it->bindType == EM_BindValue) {
        switch (em_vars[slot].type) {
        case MENU_V_float:  snprintf(buf, bufsize, it->text, (double)em_fpool[slot]); return;
        case MENU_V_double: snprintf(buf, bufsize, it->text, em_dpool[slot]); return;
        default:            snprintf(buf, bufsize, it->text, (int)em_ipool[slot]); return;
        }
    }
    if (it->bindType == EM_BindSwitch) {
        snprintf(buf, bufsize, it->text,
                 em_upool[slot] == it->swOpen ? it->onText : it->offText);
        return;
    }
    if (it->bindType == EM_BindNone && it->dispSlot >= 0 && it->dispSlot < EM_SLOTS
        && em_vars[it->dispSlot].defined) {
        /* 只读显示变量 */
        switch (em_vars[it->dispSlot].type) {
        case MENU_V_float:  snprintf(buf, bufsize, it->text, (double)em_fpool[it->dispSlot]); return;
        case MENU_V_double: snprintf(buf, bufsize, it->text, em_dpool[it->dispSlot]); return;
        default:            snprintf(buf, bufsize, it->text, (int)em_ipool[it->dispSlot]); return;
        }
    }
    snprintf(buf, bufsize, "%s", it->text);
}

/* ===================== 条目分发（与生成代码同路径） ===================== */

static void em_dispatch(uint8_t page)
{
    if (page >= em_page_count) return;
    em_item_t *items = em_pages[page];
    uint16_t n = em_page_len[page];
    char buf[320];

    for (uint16_t i = 0; i < n; i++) {
        em_item_t *it = &items[i];
        uint32_t slot = (it->poolSlot >= 0)
            ? (uint32_t)it->poolSlot
            : (uint32_t)page * EM_MAX_ITEMS + i;

        switch (it->kind) {
        case EM_Text:
            em_apply_bind(it, slot);
            em_format_text(it, slot, buf, sizeof(buf));
            em_draw_text_buf(it, buf);
            break;

        case EM_Slider:
            em_apply_bind(it, slot);
            if (it->bindType == EM_BindValue) {
                if (em_vars[slot].type == MENU_V_float || em_vars[slot].type == MENU_V_double) break;
                u8g2_MenuDrawItemSlider_bind((int *)&em_ipool[slot], (int)em_vars[slot].step,
                                             (int)em_vars[slot].min, (int)em_vars[slot].max);
            } else {
                u8g2_MenuDrawItemSlider((float)it->position / 100.0f);
            }
            break;

        case EM_Progress:
            em_apply_bind(it, slot);
            if (it->bindType == EM_BindValue) {
                if (em_vars[slot].type == MENU_V_float || em_vars[slot].type == MENU_V_double) break;
                u8g2_MenuDrawItemProgressBar_bind((int *)&em_ipool[slot], (int)em_vars[slot].step,
                                                  (int)em_vars[slot].min, (int)em_vars[slot].max);
            } else {
                u8g2_MenuDrawItemProgressBar((float)it->position / 100.0f);
            }
            break;

        case EM_Chart: {
            em_chart_layers_t *L = &em_chart_layers[page][i];
            if (L->n == 0) break;
            em_apply_bind(it, slot);
            u8g2_MenuDrawItemChart(L->src, L->n, it->area_h);
            break;
        }

        case EM_XBM:
            em_apply_bind(it, slot);
            if (it->xbm_w && it->xbm_h && it->target >= 0)
                u8g2_MenuDrawItemXBMP(it->xbm_w, it->xbm_h, (const uint8_t *)(uintptr_t)it->target);
            break;

        case EM_TextArea: {
            em_apply_bind(it, slot);
            u8g2_menu_textArea_t *ta = &em_tas[page][i];
            if (!ta->text) break;
            if (it->bindScroll)
                u8g2_MenuDrawTextArea_bind(ta, it->area_h);
            else
                u8g2_MenuDrawTextArea(ta, it->area_h);
            break;
        }

        case EM_Board: {
            /* 用户代码无法在预览中执行，按 board 的绘制协议画占位框 */
            u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
            u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
            if (!menu || !u8g2) break;
            u8g2_MenuDrawItemSetSize(menu, it->xbm_w, it->xbm_h);
            u8g2_MenuSelectorCall(menu);
            u8g2_DrawFrame(u8g2, u8g2_MenuGetX(menu), u8g2_MenuGetY(menu),
                           u8g2_MenuGetW(menu), u8g2_MenuGetH(menu));
            u8g2_DrawStr(u8g2, u8g2_MenuGetX(menu) + 2,
                         u8g2_MenuGetY(menu) + u8g2_MenuGetH(menu) - 2, "USR");
            u8g2_MenuDrawItemEnd(menu);
            break;
        }
        }
    }
}

/* ===================== 导出 API ===================== */

int em_init(int width, int height)
{
    uint8_t tile_buf_height;
    uint8_t *buf;
    (void)width; (void)height; /* 预览固定 128x64（ssd1306 驱动），其他尺寸由前端缩放/居中 */

    u8g2_SetupDisplay(&em_u8g2, u8x8_d_ssd1306_128x64_noname, u8x8_cad_ssd13xx_fast_i2c,
                      em_byte_cb, em_gpio_cb);
    buf = u8g2_m_16_8_f(&tile_buf_height);
    u8g2_SetupBuffer(&em_u8g2, buf, tile_buf_height, u8g2_ll_hvline_vertical_top_lsb, U8G2_R0);
    u8g2_InitDisplay(&em_u8g2);
    u8g2_SetPowerSave(&em_u8g2, 0);

    u8g2_CreateMenu_Selector(&em_u8g2, &em_menu, em_page_0, u8g2_MenuSelectorRotundity);
    em_menu_ready = 1;
    em_current_page = 0;
    return 0;
}

void em_reset_dynamic(void)
{
    em_chart_structs_used = 0;
    em_chart_used = 0;
    em_bits_used = 0;
    em_ta_used = 0;
    em_buf_used = 0;
    memset(em_tas, 0, sizeof(em_tas));
    memset(em_chart_layers, 0, sizeof(em_chart_layers));
    memset(em_bufs, 0, sizeof(em_bufs));
    memset(em_page_len, 0, sizeof(em_page_len));
    memset(em_vars, 0, sizeof(em_vars));
    em_btn_count = 0;
    em_btn_last = 0;
    /* 值池填哨兵值：让变量定义的范围检查必然失败，从而回种初始值
       （清零会让初值 0~min 之间的合法值看起来"已初始化"） */
    memset(em_ipool, 0x7F, sizeof(em_ipool));        /* INT32_MAX */
    memset(em_fpool, 0x7F, sizeof(em_fpool));        /* 巨型 float */
    memset(em_dpool, 0x7F, sizeof(em_dpool));
    memset(em_upool, 0xFF, sizeof(em_upool));        /* switch 未初始化标记 */
}

void em_set_style(int font_idx, int selector, int left, int top, int spacing,
                  float spe, float header)
{
    if (!em_menu_ready) return;
    if (font_idx >= 0 && font_idx < em_font_count)
        u8g2_SetFont(&em_u8g2, em_fonts[font_idx]);

    menuSelector_cb sel = u8g2_MenuSelectorRotundity;
    if (selector == 0)      sel = u8g2_MenuSelector;
    else if (selector == 2) sel = u8g2_MenuSelectorSquare;
    u8g2_MenuReplaceSelector(&em_menu, sel);
    u8g2_MenuSetPosition(&em_menu, (u8g2_uint_t)left, (u8g2_uint_t)top, (u8g2_uint_t)spacing);
    u8g2_MenuSetPositionOffsetSpe(&em_menu, spe);
    u8g2_MenuSetPositionOffsetStrHeaderLen(&em_menu, header);
}

/* 定义变量（值池槽位 = slot；初值仅在哨兵状态下回种，保留预览中的编辑值） */
void em_var_define(int slot, int type, int initial, int step, int min, int max)
{
    if (slot < 0 || slot >= EM_SLOTS) return;
    em_var_meta_t *m = &em_vars[slot];
    m->type = (uint8_t)type;
    m->step = step;
    m->min = min;
    m->max = max;
    m->defined = 1;
    if (type == MENU_V_float) {
        if (em_fpool[slot] < (float)min || em_fpool[slot] > (float)max)
            em_fpool[slot] = (float)initial;
    } else if (type == MENU_V_double) {
        if (em_dpool[slot] < (double)min || em_dpool[slot] > (double)max)
            em_dpool[slot] = (double)initial;
    } else {
        if (em_ipool[slot] < min || em_ipool[slot] > max)
            em_ipool[slot] = initial;
    }
}

void em_page_begin(int page)
{
    if (page < 0 || page >= EM_MAX_PAGES) return;
    /* 重新设置该页时丢弃旧文本区资源指针（由 em_page_item 重建） */
    memset(&em_tas[page], 0, sizeof(em_tas[page]));
    em_page_len[page] = 0;
}

/* 设置条目绘制参数（附加值由 em_page_bind 单独设置） */
void em_page_item(int page, int idx, int kind, int scale,
                  int area_h, int xbm_w, int xbm_h, int dispSlot, int poolSlot)
{
    if (page < 0 || page >= EM_MAX_PAGES || idx < 0 || idx >= EM_MAX_ITEMS) return;
    em_item_t *it = &em_pages[page][idx];
    memset(it, 0, sizeof(*it));
    it->kind = (uint8_t)kind;
    it->scale = (uint8_t)scale;
    it->area_h = (uint16_t)area_h;
    it->xbm_w = (uint16_t)xbm_w;
    it->xbm_h = (uint16_t)xbm_h;
    it->dispSlot = (int16_t)dispSlot;
    it->poolSlot = (int16_t)poolSlot;
    it->bindType = EM_BindNone;
    it->target = -1;
}

/* 设置条目附加值 */
void em_page_bind(int page, int idx, int bindType, int varType, int swOpen,
                  int buttonId, int target, int poolSlot)
{
    if (page < 0 || page >= EM_MAX_PAGES || idx < 0 || idx >= EM_MAX_ITEMS) return;
    em_item_t *it = &em_pages[page][idx];
    it->bindType = (uint8_t)bindType;
    it->varType = (uint8_t)varType;
    it->swOpen = (uint8_t)swOpen;
    it->buttonId = (uint8_t)buttonId;
    it->target = (int16_t)target;
    if (poolSlot >= 0 && poolSlot < EM_SLOTS) it->poolSlot = (int16_t)poolSlot;

    switch (bindType) {
    case EM_BindSwitch:
        if (em_upool[it->poolSlot] == 0xFF)
            em_upool[it->poolSlot] = it->swOpen ? 1 : 0;
        break;
    default:
        break;
    }
}

void em_item_text(int page, int idx, const char *text)
{
    if (page < 0 || page >= EM_MAX_PAGES || idx < 0 || idx >= EM_MAX_ITEMS || !text) return;
    em_item_t *it = &em_pages[page][idx];
    snprintf(it->text, sizeof(it->text), "%s", text);

    /* 文本区内容写入池缓冲 */
    if (it->kind == EM_TextArea && em_tas[page][idx].text) {
        char *p = (char *)(uintptr_t)em_tas[page][idx].text;
        snprintf(p, 256, "%s", text);
        u8g2_textArea_setText(&em_tas[page][idx], p);
    }
}

/* 开关附加值的开/关文案（em_page_bind 不携带文本，单独设置） */
void em_item_switch_text(int page, int idx, const char *on, const char *off)
{
    if (page < 0 || page >= EM_MAX_PAGES || idx < 0 || idx >= EM_MAX_ITEMS) return;
    em_item_t *it = &em_pages[page][idx];
    snprintf(it->onText, sizeof(it->onText), "%s", on ? on : "");
    snprintf(it->offText, sizeof(it->offText), "%s", off ? off : "");
}

void em_item_bits(int page, int idx, const uint8_t *ptr, int len)
{
    if (page < 0 || page >= EM_MAX_PAGES || idx < 0 || idx >= EM_MAX_ITEMS) return;
    if (!ptr || len <= 0 || (uint32_t)len > EM_BITS_POOL_BYTES) return;
    if (em_bits_used + (uint32_t)len > EM_BITS_POOL_BYTES) return;
    em_item_t *it = &em_pages[page][idx];
    uint8_t *dst = &em_bits_pool[em_bits_used];
    memcpy(dst, ptr, (size_t)len);
    em_bits_used += (uint32_t)len;
    it->target = (int16_t)(uintptr_t)dst;
}

void em_page_end(int page, int count)
{
    if (page < 0 || page >= EM_MAX_PAGES) return;
    em_page_len[page] = (uint16_t)(count > EM_MAX_ITEMS ? EM_MAX_ITEMS : count);
}

void em_pages_commit(int count)
{
    em_page_count = (uint8_t)(count > EM_MAX_PAGES ? EM_MAX_PAGES : count);
    if (em_page_count == 0) return;
    if (em_current_page >= em_page_count) em_current_page = 0;
    /* 仅当菜单回调与当前页不一致时才重对齐：
       保持预览中的导航状态（子页面/选中行）不被编辑操作打断 */
    menuItem_cb target = em_page_stubs[em_current_page];
    if (em_menu_ready && em_menu.menuItem != target)
        u8g2_MenuReplaceItem(&em_menu, target);
}

/* 预览跳转到指定页（编辑器「预览页」下拉用） */
void em_nav(int page)
{
    if (!em_menu_ready) return;
    if (page < 0 || page >= EM_MAX_PAGES || page >= em_page_count) return;
    if (em_page_len[page] == 0) return;
    em_current_page = (uint8_t)page;
    if (em_menu.menuItem != em_page_stubs[page])
        u8g2_MenuReplaceItem(&em_menu, em_page_stubs[page]);
}

/* ===================== 图表数据源缓冲区 ===================== */

/* 定义数据源缓冲区（bufSlot = 缓冲区在池中的下标；sample: 0 sine 1 ramp 2 noise 3 none） */
void em_buf_define(int bufSlot, int len, int sample)
{
    if (bufSlot < 0 || bufSlot >= EM_MAX_BUFS) return;
    if (len < 2) len = 2;
    if (len > EM_BUF_MAX_LEN) len = EM_BUF_MAX_LEN;
    em_buf_t *b = &em_bufs[bufSlot];
    if (b->alloc && b->len == (uint16_t)len) {
        /* 复用已分配缓冲，仅刷新示例数据 */
    } else {
        if (em_buf_used + (uint32_t)len > EM_BUF_POOL_FLOATS) return;
        b->data = &em_buf_pool[em_buf_used];
        em_buf_used += (uint32_t)len;
        b->len = (uint16_t)len;
        b->alloc = 1;
    }
    for (int j = 0; j < len; j++) {
        switch (sample) {
        case 1: b->data[j] = (float)j; break;
        case 2: b->data[j] = (float)((j * 37) % len); break;
        case 3: b->data[j] = 0.0f; break;
        default: b->data[j] = 50.0f + 40.0f * sinf((float)j * 0.5f); break;
        }
    }
}

/* 为图表条目追加一个叠加数据源（kind: 0 line 1 point 2 bar；fixed 时用 fmax/fmin，否则自动量程） */
void em_item_chart_add(int page, int idx, int bufSlot, int kind, int fixed, float fmax, float fmin)
{
    if (page < 0 || page >= EM_MAX_PAGES || idx < 0 || idx >= EM_MAX_ITEMS) return;
    if (bufSlot < 0 || bufSlot >= EM_MAX_BUFS) return;
    em_buf_t *b = &em_bufs[bufSlot];
    if (!b->alloc || !b->data) return;
    em_chart_layers_t *L = &em_chart_layers[page][idx];
    if (L->n >= EM_MAX_CHART_SRC) return;
    if (em_chart_structs_used >= EM_CHART_STRUCTS) return;
    if (em_chart_used + (uint32_t)b->len * 2 > EM_CHART_POOL_FLOATS) return;

    /* chart 结构 + dis 缓冲自动生成（每个条目-数据源对独立） */
    u8g2_chart_t *ch = &em_chart_structs[em_chart_structs_used++];
    float *dis = &em_chart_pool[em_chart_used];
    em_chart_used += (uint32_t)b->len;
    u8g2_chart_init(ch, b->data, dis, b->len);

    L->src[L->n].drawChart = (kind == 1) ? u8g2_drawPointChart
                           : (kind == 2) ? u8g2_drawBarChart
                           : u8g2_drawLineChart;
    L->src[L->n].chart = ch;
    L->src[L->n].max = fixed ? fmax : 0;
    L->src[L->n].min = fixed ? fmin : 0;
    L->n++;
}

uint8_t *em_frame(uint16_t ms)
{
    if (!em_menu_ready) return NULL;
    u8g2_ClearBuffer(&em_u8g2);
    u8g2_DrawMenu(&em_menu, 0, 0,
                  u8g2_GetDisplayWidth(&em_u8g2), u8g2_GetDisplayHeight(&em_u8g2));
    u8g2_SendBuffer(&em_u8g2);
    u8g2_MenuTime_ISR(&em_menu, ms);
    return u8g2_GetBufferPtr(&em_u8g2);
}

void em_key(int key)
{
    if (!em_menu_ready) return;
    if (key <= MENU_Key_None || key >= MENU_Key_Num) return;
    u8g2_MenuKeys(&em_menu, (u8g2_menuKeyValue_t)key);
}

int em_font_h(void) { return em_menu_ready ? (int)u8g2_GetMaxCharHeight(&em_u8g2) : 8; }
int em_font_w(void) { return em_menu_ready ? (int)u8g2_GetMaxCharWidth(&em_u8g2) : 5; }
int em_font_utf8_w(const char *s) { return em_menu_ready && s ? (int)u8g2_GetUTF8Width(&em_u8g2, s) : 0; }
int em_get_current_page(void) { return em_current_page; }
uint32_t em_get_btn_count(void) { return em_btn_count; }
uint8_t em_get_btn_last(void) { return em_btn_last; }

int32_t em_get_ipool(int slot) { return (slot >= 0 && slot < EM_SLOTS) ? em_ipool[slot] : 0; }
int em_get_fpool(int slot, float *out) { if (slot >= 0 && slot < EM_SLOTS && out) { *out = em_fpool[slot]; return 1; } return 0; }
int em_get_upool(int slot) { return (slot >= 0 && slot < EM_SLOTS) ? em_upool[slot] : 0; }
int em_get_dpool(int slot, double *out) { if (slot >= 0 && slot < EM_SLOTS && out) { *out = em_dpool[slot]; return 1; } return 0; }

/* 供 JS 写入 XBM 数据的临时缓冲 */
static uint8_t em_scratch_buf[2048];
uint8_t *em_scratch(int len)
{
    if (len <= 0 || len > (int)sizeof(em_scratch_buf)) return NULL;
    return em_scratch_buf;
}

int em_font_count_export(void) { return em_font_count; }
const char *em_font_name(int idx)
{
    if (idx < 0 || idx >= em_font_count) return "";
    return em_font_names[idx];
}

/* 读取内置字体原始字节（现场取模的源数据） */
int em_font_data(int idx)
{
    if (idx < 0 || idx >= em_font_count) return 0;
    return (int)(uintptr_t)em_fonts[idx];
}
int em_font_data_len(int idx)
{
    if (idx < 0 || idx >= em_font_count) return 0;
    return em_font_lens[idx];
}

/* 切换到自定义字体（JS 已把子集字节写入 em_custom_font） */
void em_set_custom_font(int len)
{
    if (!em_menu_ready) return;
    if (len <= 0 || len > (int)sizeof(em_custom_font)) return;
    em_custom_font_len = (uint16_t)len;
    u8g2_SetFont(&em_u8g2, em_custom_font);
}

/* 切回内置字体（em_set_style 每次同步都会调用，取模模式在其后覆盖） */
int em_custom_font_ptr(void) { return (int)(uintptr_t)em_custom_font; }
int em_custom_font_max(void) { return (int)sizeof(em_custom_font); }

/* 用真库的 get_glyph_data 从内置字体中取字形原始条目（子集器数据源）。
 * 先临时 SetFont 到目标字体，读出条目后恢复。返回长度；0 = 无此字形。 */
int em_font_glyph(int fontIdx, int encoding, int outMax, void *out)
{
    if (fontIdx < 0 || fontIdx >= em_font_count) return 0;
    if (!out || outMax <= 0) return 0;
    const uint8_t *saved = em_u8g2.font;
    u8g2_SetFont(&em_u8g2, em_fonts[fontIdx]);
    /* u8g2_font_get_glyph_data 未导出，但结构可从 u8g2->font 复算：
       这里直接用库同款走查（逻辑与 u8g2_font.c 一致） */
    const uint8_t *font = em_u8g2.font + 23; /* U8G2_FONT_DATA_STRUCT_SIZE */
    const u8g2_font_info_t *fi = &em_u8g2.font_info;
    int len = 0;
    if (encoding <= 255) {
        const uint8_t *p = font;
        if (encoding >= 'a') p += fi->start_pos_lower_a;
        else if (encoding >= 'A') p += fi->start_pos_upper_A;
        for (;;) {
            if (p[1] == 0) break;
            if (p[0] == encoding) { len = p[1]; break; }
            p += p[1];
        }
        if (len == 0) { /* 加速指针失效时全段线性 */
            p = font;
            for (;;) {
                if (p[1] == 0) break;
                if (p[0] == encoding) { len = p[1]; break; }
                p += p[1];
            }
        }
        if (len && len <= outMax) {
            memcpy(out, p, (size_t)len);
            u8g2_SetFont(&em_u8g2, saved);
            return len;
        }
    } else {
        const uint8_t *p = font + fi->start_pos_unicode;
        const uint8_t *table = p;
        uint16_t e;
        do {
            p += (uint16_t)((table[0] << 8) | table[1]);
            e = (uint16_t)((table[2] << 8) | table[3]);
            table += 4;
        } while (e < encoding && e != 0xffff);
        for (;;) {
            e = (uint16_t)((p[0] << 8) | p[1]);
            if (e == 0) break;
            if (e == (uint16_t)encoding) {
                len = p[2]; /* 条目总长（含 [unicode:2][size:1] 头），与走查步进一致 */
                if (len <= outMax) {
                    memcpy(out, p, (size_t)len);
                    u8g2_SetFont(&em_u8g2, saved);
                    return len;
                }
                break;
            }
            p += p[2];
        }
    }
    u8g2_SetFont(&em_u8g2, saved);
    return 0;
}

/* ---- 调试探针（预览引擎联调用） ---- */
int em_dbg_current_item(void) { return em_menu.currentItem; }
int em_dbg_set_value(void) { return em_menu.currentSetValue; }
int em_dbg_value_type(void) { return (int)em_menu.u8g2_menuValueType; }
int em_dbg_draw_item(void) { return (int)em_menu.currentDrawItem; }
int em_dbg_page_len(int page) { return (page >= 0 && page < EM_MAX_PAGES) ? em_page_len[page] : -1; }
