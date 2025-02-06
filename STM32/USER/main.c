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

uint32_t deBug;
void menuItem_1()
{
	u8g2_MenuItemValue_uint32(&deBug,2,0,100); 
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello World! %d", deBug);
}

void oled_display(u8g2_t * u8g2)
{
	u8g2_DrawMenu(&u8g2_menu,0,0,128,64);
}

void keyScann(uint16_t time)
{
	static uint16_t key_shakeFree[3] = {0};
	static uint16_t key_state[3] = {0};

	if(key_shakeFree[0] < 10 && KEY_1) key_shakeFree[0]++;
	if(key_shakeFree[1] < 10 && KEY_2) key_shakeFree[1]++;
	if(key_shakeFree[2] < 10 && KEY_3) key_shakeFree[2]++;
	if(key_shakeFree[0] > 0 && !KEY_1) key_shakeFree[0]--;
	if(key_shakeFree[1] > 0 && !KEY_2) key_shakeFree[1]--;
	if(key_shakeFree[2] > 0 && !KEY_3) key_shakeFree[2]--;

	for(int i = 0; i < 3; i++)
	{
		if(key_shakeFree[i] < 2 && key_state[i] == 0)
		{
			key_state[i] = 1;
		}
		if(key_shakeFree[i] > 8 && key_state[i] == 1)
		{
			key_state[i] = 0;
		}
	}
	
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Up,key_state[0],time);
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Down,key_state[1],time);
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Enter,key_state[2],time);

	/*
	// 无消抖写法
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Up,!KEY_1,time);
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Down,!KEY_2,time);
	u8g2_MenuKeyScann(&u8g2_menu,MENU_Key_Enter,!KEY_3,time);
	*/
}


float k = 0;
void tim2_IRQ(void)
{
	char keys = get_current_key_value(&matrixKey);
	u8g2_MenuInChar(&u8g2_menu, keys);
	keyScann(/*time = */1);
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
