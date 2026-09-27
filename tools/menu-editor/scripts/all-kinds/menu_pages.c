/**
 * 由 u8g2-menu-editor 自动生成，工程: 我的菜单
 * 重新生成时，USER CODE 区域内的手写内容会被保留。
 *
 * main.c 里使用以下符号时，直接 extern（或复制下面声明）：
 *   u8g2_SetFont(&u8g2, u8g2_font_wqy12_t_gb2312);
 *   void page_main(void);   [页面: 主页]
 *   void page_1(void);   [页面: 设置]
 *   extern uint8_t register_;
 *   extern int16_t var_int;
 *   extern float var_f;
 *   extern int32_t page_0;
 *   extern int32_t var_only_display;
 *   extern int var_pos;
 *   void register__2(u8g2_menu_t *menu, uint8_t ID, u8g2_menuKeyValue_t key);
 *   void struct_(u8g2_t *u8g2);
 */
#include "u8g2_menu.h"
#include <math.h>

/* USER CODE BEGIN includes *//* USER CODE END includes */

void page_main(void);
void page_1(void);

/* ======================== 变量定义 ======================== */
/* USER CODE BEGIN variables *//* USER CODE END variables */
uint8_t register_ = 1;
int16_t var_int = -5;
float var_f = 1.5f;
int32_t page_0 = 0;
int32_t var_only_display = 42;
int var_pos = 30;

/* ======================== 页面资源 ======================== */
#define BUF_A_LEN 16
static float buf_a[BUF_A_LEN];
static uint8_t buf_a_filled = 0;
static void buf_a_fill(void)
{
    /* USER CODE BEGIN fill_buf_a */    /* USER CODE END fill_buf_a */
    for (uint16_t i = 0; i < BUF_A_LEN; ++i) { buf_a[i] = 50.0f + 40.0f * sinf(i * 0.5f); }
}
#define BUF_B_LEN 12
static float buf_b[BUF_B_LEN];
static uint8_t buf_b_filled = 0;
static void buf_b_fill(void)
{
    /* USER CODE BEGIN fill_buf_b */    /* USER CODE END fill_buf_b */
    for (uint16_t i = 0; i < BUF_B_LEN; ++i) { buf_b[i] = (float)i; }
}
#define VAR_INT_2_LEN 8
static float var_int_2[VAR_INT_2_LEN];
static uint8_t var_int_2_filled = 0;
static void var_int_2_fill(void)
{
    /* USER CODE BEGIN fill_var_int_2 */    /* USER CODE END fill_var_int_2 */
}
static float chart0_dis[BUF_A_LEN];
static u8g2_chart_t chart0;
static uint8_t chart0_inited = 0;
static float chart1_dis[BUF_A_LEN];
static u8g2_chart_t chart1;
static float chart2_dis[BUF_B_LEN];
static u8g2_chart_t chart2;
static u8g2_menu_drawChart_t chart_layers_0[2];
static uint8_t chart_layers_0_inited = 0;
static char ta0_text[] = "多行文本\n第二行";
static u8g2_menu_textArea_t ta0;
static uint8_t ta0_inited = 0;
static const uint8_t menu_xbm_icon_x[8] = { 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa, 0xaa };

/* ======================== 回调函数 ======================== */
/* USER CODE BEGIN callbacks *//* USER CODE END callbacks */
void register__2(u8g2_menu_t *menu, uint8_t ID, u8g2_menuKeyValue_t key)
{
    /* USER CODE BEGIN cb_register__2 */    /* USER CODE END cb_register__2 */
}

void struct_(u8g2_t *u8g2)
{
    /* USER CODE BEGIN cb_struct_ */    /* USER CODE END cb_struct_ */
}

/* ==================== 弱定义函数重写 ==================== */
/* 以下函数与库 u8g2_menu_weak.c 中的弱定义同名，
 * 链接时将自动替换库的默认行为；取消勾选即可恢复默认。 */
/* USER CODE BEGIN weak *//* USER CODE END weak */

/* 数值变化（推荐）: 值被加或减之后都会触发（p = 变量地址）。想把改动实时写入硬件（DAC/PWM/音量）用这个即可。 */
void u8g2_menuValueChange_weak(void *p)
{
    /* USER CODE BEGIN weak_u8g2_menuValueChange_weak */    /* USER CODE END weak_u8g2_menuValueChange_weak */
    (void)p;
}

/* 按键拦截: 任意按键的"最前哨"。返回 1 = 事件已被你处理（可做全局快捷键）；返回 0 = 继续交给库分发。 */
uint8_t menuEventKey_weak(u8g2_menu_t *u8g2_menu, u8g2_menuKeyValue_t u8g2_menuKeyValue)
{
    /* USER CODE BEGIN weak_menuEventKey_weak */    /* USER CODE END weak_menuEventKey_weak */
    (void)u8g2_menu;
        (void)u8g2_menuKeyValue;
    return 0;
}

/* 事件过滤器: 事件队列分发前调用。返回 1 = 该事件由你处理，库不再处理；返回 0 = 交给库。 */
uint8_t menuEventUserHandle_weak(u8g2_menu_t *u8g2_menu, u8g2_menu_event_item_t *eventItem)
{
    /* USER CODE BEGIN weak_menuEventUserHandle_weak */    /* USER CODE END weak_menuEventUserHandle_weak */
    (void)u8g2_menu;
        (void)eventItem;
    return 0;
}

/* ======================== 页面函数 ======================== */

/* 页面: 主页 */
void page_main(void)
{
    /* USER CODE BEGIN page_page_main_pre */    /* USER CODE END page_page_main_pre */
    u8g2_MenuUTF8Printf("TEXT %d", var_only_display);
    u8g2_MenuItemValue_float(&var_f, 0.5f, 0.0f, 10.0f);
    u8g2_MenuUTF8Printf("数值:%d", var_f);
    u8g2_MenuItemValue_switch(&register_, 1);
    u8g2_MenuUTF8Printf("开关:%s", register_ ? "ON" : "OFF");
    u8g2_MenuItem_menu_enter(page_1);
    u8g2_MenuUTF8Printf("进入");
    u8g2_MenuItem_button(register__2, 3);
    u8g2_MenuUTF8Printf("按钮");
    u8g2_MenuItemValue_int(&var_pos, 5, 0, 100);
    u8g2_MenuDrawItemSlider_bind(&var_pos, 5, 0, 100);
    u8g2_MenuDrawItemProgressBar(0.60f);
    if (!chart0_inited) {
        chart0_inited = 1;
        u8g2_chart_init(&chart0, buf_a, chart0_dis, BUF_A_LEN);
        if (!buf_a_filled) { buf_a_filled = 1; buf_a_fill(); }
    }
    u8g2_MenuDrawItemLineChart(&chart0, 20, 0, 0);
    if (!chart_layers_0_inited) {
        chart_layers_0_inited = 1;
        u8g2_chart_init(&chart1, buf_a, chart1_dis, BUF_A_LEN);
        if (!buf_a_filled) { buf_a_filled = 1; buf_a_fill(); }
        chart_layers_0[0].drawChart = u8g2_drawPointChart;
        chart_layers_0[0].chart = &chart1;
        chart_layers_0[0].max = 100.0f;
        chart_layers_0[0].min = 0.0f;
        u8g2_chart_init(&chart2, buf_b, chart2_dis, BUF_B_LEN);
        if (!buf_b_filled) { buf_b_filled = 1; buf_b_fill(); }
        chart_layers_0[1].drawChart = u8g2_drawBarChart;
        chart_layers_0[1].chart = &chart2;
        chart_layers_0[1].max = 0;
        chart_layers_0[1].min = 0;
    }
    u8g2_MenuDrawItemChart(chart_layers_0, 2, 18);
    u8g2_MenuDrawItemXBMP(8, 8, menu_xbm_icon_x);
    if (!ta0_inited) {
        ta0_inited = 1;
        u8g2_textArea_init(&ta0, ta0_text);
        u8g2_textArea_setLineSpacing(&ta0, 1);
    }
    u8g2_MenuDrawTextArea(&ta0, 24);
    u8g2_MenuDrawItemBoard(struct_, 32, 16);
}

/* 页面: 设置 */
void page_1(void)
{
    /* USER CODE BEGIN page_page_1_pre */    /* USER CODE END page_page_1_pre */
    u8g2_MenuUTF8Printf("设置页");
    u8g2_MenuItem_menu_back();
    u8g2_MenuUTF8Printf("返回");
    u8g2_MenuItemValue_int32(&page_0, 1, 0, 9);
    u8g2_MenuDrawItemSlider(0.50f);
}

