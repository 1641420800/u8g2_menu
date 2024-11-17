#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "sys.h"
#include "tim.h"
#include "usart.h"
#include "delay.h"
#include "gpio.h"

#include "IIC_OLED.h"
#include "matrixKey.h"


u8g2_t u8g2;
u8g2_menu_t u8g2_menu;
u8g2_chart_t chart;

float data[100];
float data_dis[LEN(data)];

u8g2_chart_t chart2;

float data2[100];
float data_dis2[LEN(data2)];

u8g2_chart_t chart3;

float data3[100];
float data_dis3[LEN(data2)];

uint16_t i;
int jd = 255;
uint8_t keys = 0;

char inStr[64];

uint16_t a,b;

void menuItem_2(void);
void menuItem_1()
{
	u8g2_MenuItem_menu(menuItem_2);
	u8g2_MenuDrawItemLineChart(&chart,50,0,0);
	u8g2_MenuDrawItemPointChart(&chart2,40,1,-1);
	u8g2_MenuDrawItemPointChart(&chart3,40,1,-1);
	
	u8g2_MenuItem_str(inStr,sizeof(inStr));
	u8g2_MenuDrawPassword(inStr,'*');
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"s:%s",inStr);
	
	u8g2_MenuDrawItemProgressBar_bind(&jd,25,5,255);
	u8g2_SetContrast(&u8g2,jd);



	u8g2_MenuPrintf(u8g2_MenuDrawStr,"123456789123456789123456789");
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"%d",sizeof(u8g2_menu));
	
	u8g2_MenuItemValue_uint16(&i,1,0,100);
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"%d",i);

	
    u8g2_t * u8g2 = u8g2_MenuStartLayer();
	if(u8g2)
	{
		u8g2_SetMaxClipWindow(u8g2);
		u8g2_DrawBox(u8g2,3, 7, 25, 15);
		u8g2_MenuEndLayer(LayerXOR);
	}
}
uint8_t sw = 1;
void menuItem_2()
{
	u8g2_MenuItem_menu(menuItem_1);
	u8g2_MenuPrintf(u8g2_MenuDrawStr,U8G2_MENU_VERSION);

	u8g2_MenuItemValue_switch(&sw,0);
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello %d",sw);
	u8g2_MenuPrintf(u8g2_MenuDrawStrX2,"Hello2");
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello2 %d - %d",a,b);
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello2");
}


void oled_display(u8g2_t * u8g2)
{
	u8g2_DrawMenu(&u8g2_menu,0,0,128,64);
}

void keyScann(void)
{
	static uint8_t	keyLog[4]	= {0};
	uint8_t	key[4];
	
	key[0] = KEY_1;
	key[1] = KEY_2;
	key[2] = KEY_3;
	
	if(key[0] == 0 && keyLog[0] != 0)
	{
		u8g2_MenuKeys(&u8g2_menu,MENU_Key_Up);
	}
	if(key[1] == 0 && keyLog[1] != 0)
	{
		u8g2_MenuKeys(&u8g2_menu,MENU_Key_Down);
	}
	if(key[2] == 0 && keyLog[2] != 0)
	{
		u8g2_MenuKeys(&u8g2_menu,MENU_Key_Enter);
	}
	
	keyLog[0] = key[0];
	keyLog[1] = key[1];
	keyLog[2] = key[2];
}


float k = 0;
void tim2_IRQ(void)
{
	keys = get_current_key_value(&matrixKey);
	u8g2_MenuInChar(&u8g2_menu, keys);

	keyScann();

	u8g2_MenuTime_ISR(&u8g2_menu,1);
	
	LED = sw;
}
void u8g2_menuItemEnter(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
	a = item;
}
void u8g2_menuItemLeave(u8g2_menu_t *u8g2_menu, u8g2_uint_t item)
{
	b = item;
}

int main(void)
{
	delay_init();
	gpio_init();
	
	oled_u8g2_init(&u8g2);
	u8g2_CreateMenu(&u8g2,&u8g2_menu,menuItem_1);
	u8g2_chart_init(&chart,data,data_dis,LEN(data));
	u8g2_chart_init(&chart2,data2,data_dis2,LEN(data2));
	u8g2_chart_init(&chart3,data3,data_dis3,LEN(data3));
	u8g2_SetFont(&u8g2,u8g2_font_10x20_tf);
	// u8g2_SetFont(&u8g2,u8g2_font_8x13_mf);
	
	matrixKey_init_def();   							// 矩阵键盘初始化
	tim2_init(1000-1,72-1);
	while(1)
	{
		u8g2_chart_addData(&chart,rand());
		u8g2_chart_addData(&chart2,cos(k));
		u8g2_chart_addData(&chart3,tan(k));
		k += 0.06;
		u8g2_ClearBuffer(&u8g2);
		oled_display(&u8g2);
		u8g2_SendBuffer(&u8g2);
		// LED;

		delay_ms(60);
	}
}
