#include <stdio.h>
#include <stdlib.h>

#include "sys.h"
#include "tim.h"
#include "usart.h"
#include "delay.h"
#include "gpio.h"

#include "IIC_OLED.h"

u8g2_menu_t u8g2_menu; 

uint16_t i;

void u8g2_MenuButton(uint8_t ID, u8g2_menuKeyValue_t key);

void menuItem_1()
{
	u8g2_MenuItem_button(u8g2_MenuButton,0);
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello1");
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello1");
	
	u8g2_MenuItemValue_uint16(&i,1,0,100);
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"%d",i);

}
void menuItem_2()
{
	u8g2_MenuItem_button(u8g2_MenuButton,1);
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello2");
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello2");
	u8g2_MenuPrintf(u8g2_MenuDrawStr,"Hello2");

}

void u8g2_MenuButton(uint8_t ID, u8g2_menuKeyValue_t key)
{
	if(key == MENU_Key_Enter)
	{
		if(ID == 1) u8g2_MenuReplaceItem(&u8g2_menu,menuItem_1);
		if(ID == 0) u8g2_MenuReplaceItem(&u8g2_menu,menuItem_2);
	}
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

void tim2_IRQ(void)
{
	keyScann();
}

int main(void)
{
	u8g2_t u8g2;
	delay_init();	   		// ��ʱ������ʼ��	  
	gpio_init();		  		// ��ʼ�����������ӵ�Ӳ���ӿ�
	
	oled_u8g2_init(&u8g2);	// ��ʼ��OLED
	u8g2_CreateMenu(&u8g2,&u8g2_menu,menuItem_1);
	u8g2_SetFont(&u8g2,u8g2_font_10x20_mf);
	// u8g2_SetFont(&u8g2,u8g2_font_8x13_mf);
	
	tim2_init(1000-1,72-1);
	while(1)
	{
		delay_ms(100); // 模拟其他任务
		u8g2_ClearBuffer(&u8g2);
		oled_display(&u8g2);
		u8g2_SendBuffer(&u8g2);
		// LED;
	}
}
