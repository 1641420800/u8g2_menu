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

void menuItem_1()
{
	for(int i = 0; i < 1000; i++)
		u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello World! %d", i);
}

void oled_display(u8g2_t * u8g2)
{
	u8g2_DrawMenu(&u8g2_menu,0,0,128,64);
}

void keyScann(void)
{
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Up,!KEY_1,1);
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Down,!KEY_2,1);
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Enter,!KEY_3,1);
}


float k = 0;
void tim2_IRQ(void)
{
	char keys = get_current_key_value(&matrixKey);
	u8g2_MenuInChar(&u8g2_menu, keys);
	keyScann();
	u8g2_MenuTime_ISR(&u8g2_menu,1);
}

int main(void)
{
	delay_init();
	gpio_init();
	
	oled_u8g2_init(&u8g2);
	u8g2_CreateMenu(&u8g2,&u8g2_menu,menuItem_1);
	u8g2_SetFont(&u8g2,u8g2_font_10x20_tf);
	// u8g2_SetFont(&u8g2,u8g2_font_8x13_mf);
	
	matrixKey_init_def();   							// 矩阵键盘初始化
	tim2_init(1000-1,72-1);
	while(1)
	{
		u8g2_ClearBuffer(&u8g2);
		oled_display(&u8g2);
		u8g2_SendBuffer(&u8g2);
	}
}
