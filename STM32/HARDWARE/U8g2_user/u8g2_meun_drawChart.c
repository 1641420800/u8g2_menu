#include "u8g2_menu.h"


// 初始图表数据
void u8g2_chart_init(u8g2_chart_t *chart, float *data, float *data_dis, uint16_t data_len)
{
	chart->data = data;
	chart->data_dis = data_dis;
	chart->data_max = 0;
	chart->data_min = 0;
	chart->data_len = data_len;
}
// 添加一个数据并把所有数据向前移动
void u8g2_chart_addData(u8g2_chart_t *chart, float d)
{
	for (int i = 0; i < chart->data_len - 1; i++)
	{
		chart->data[i] = chart->data[i + 1];
	}
	chart->data[chart->data_len - 1] = d;
}
// 更新要显示的数据
void u8g2_chart_update(u8g2_chart_t *chart)
{
	memcpy(chart->data_dis, chart->data, sizeof(float) * chart->data_len);
}
// 手动设置最大值最小值
void u8g2_chart_setRange(u8g2_chart_t *chart, float max, float min)
{
	chart->data_max = max;
	chart->data_min = min;
}
// 自动计算最大值最小值
void u8g2_chart_autoRange(u8g2_chart_t *chart)
{
	chart->data_max = chart->data_dis[0];
	chart->data_min = chart->data_dis[0];

	for (int i = 1; i < chart->data_len; i++)
	{
		if (chart->data_dis[i] > chart->data_max)
		{
			chart->data_max = chart->data_dis[i];
		}
		if (chart->data_dis[i] < chart->data_min)
		{
			chart->data_min = chart->data_dis[i];
		}
	}
	chart->data_max += chart->data_max * 0.1;
	chart->data_min -= chart->data_min * 0.1;
}

void u8g2_drawLineChart(u8g2_t *u8g2, u8g2_chart_t *chart, u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h)
{
	int x1, y1, x2, y2;
	
	u8g2_DrawFrame(u8g2,x,y,w,h);
	
	x = x + 1;
	w = w - 2; 
	x1 = x;
	y1 = y + h - map(chart->data_dis[0], chart->data_min, chart->data_max, 0, h - 1);
	y1 = limitingAmplitude(y1, y, y + h - 1);
	for (int i = 1; i < chart->data_len; i++)
	{
		x2 = x + i * w / chart->data_len;
		y2 = y + h - map(chart->data_dis[i], chart->data_min, chart->data_max, 0, h - 1);
		y2 = limitingAmplitude(y2, y, y + h - 1);
		
		if(x1 >= 0 && y1 >= 0 && x2 >= 0 && y2 >= 0)
		{
			u8g2_DrawLine(u8g2, x1, y1, x2, y2);
		}
		x1 = x2;
		y1 = y2;
	}
}

void u8g2_drawPointChart(u8g2_t *u8g2, u8g2_chart_t *chart, u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h)
{
	int X, Y;
	
	u8g2_DrawFrame(u8g2,x,y,w,h);
	
	x = x + 1;
	w = w - 2;
	for (int i = 0; i < chart->data_len; i++)
	{
		X = x + i * w / chart->data_len;
		Y = y + h - map(chart->data_dis[i], chart->data_min, chart->data_max, 0, h - 1);
		Y = limitingAmplitude(Y, y, y + h - 1);
		u8g2_DrawPixel(u8g2, X, Y);
	}
}

void u8g2_MenuDrawItemChart(u8g2_chart_t *chart, void(*drawChart)(u8g2_t *u8g2, u8g2_chart_t *chart, u8g2_int_t x, u8g2_int_t y, u8g2_uint_t w, u8g2_uint_t h), u8g2_uint_t h, float max, float min)
{
    u8g2_menu_t *menu = u8g2_MenuDrawItemStart();
    u8g2_t *u8g2 = u8g2_MenuGetU8g2(menu);
    if (!menu)
        return;
    u8g2_MenuDrawItemSetSize(menu, u8g2_MenuGetW(menu), h);
    u8g2_MenuSelectorCall(menu);

    u8g2_int_t X = u8g2_MenuGetX(menu);
    u8g2_int_t Y = u8g2_MenuGetY(menu);
    u8g2_int_t W = u8g2_MenuGetW(menu);
    u8g2_int_t H = u8g2_MenuGetH(menu);
	
	u8g2_chart_update(chart);
	if(min == 0 && max == 0)
	{
		u8g2_chart_autoRange(chart);
	}
	else
	{
		u8g2_chart_setRange(chart,max,min);
	}
	drawChart(u8g2,chart,X,Y,W,H);
	
    u8g2_MenuDrawItemEnd(menu);
}

/**
 * @brief 菜单项绘制折线图
 *
 * @return void
 */
void u8g2_MenuDrawItemLineChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min)
{
    u8g2_MenuDrawItemChart(chart,u8g2_drawLineChart,h,max,min);
}

/**
 * @brief 菜单项绘制散点图
 *
 * @return void
 */
void u8g2_MenuDrawItemPointChart(u8g2_chart_t *chart, u8g2_uint_t h, float max, float min)
{
    u8g2_MenuDrawItemChart(chart,u8g2_drawPointChart,h,max,min);
}
