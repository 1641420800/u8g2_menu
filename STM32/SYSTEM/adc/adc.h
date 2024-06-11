#ifndef __ADC_H
#define __ADC_H

#include <stdint.h>
/***************************
通道	ADC1				ADC2		
通道0	PA0					PA0			
通道1	PA1					PA1			
通道2	PA2					PA2			
通道3	PA3					PA3			
通道4	PA4					PA4			
通道5	PA5					PA5			
通道6	PA6					PA6			
通道7	PA7					PA7			
通道8	PB0					PB0			
通道9	PB1					PB1				
*******************************/

#define GET_ADC_PA0 Get_Adc(ADC_Channel_0)
#define GET_ADC_PA1 Get_Adc(ADC_Channel_1)
#define GET_ADC_PA2 Get_Adc(ADC_Channel_2)
#define GET_ADC_PA3 Get_Adc(ADC_Channel_3)
#define GET_ADC_PA4 Get_Adc(ADC_Channel_4)
#define GET_ADC_PA5 Get_Adc(ADC_Channel_5)
#define GET_ADC_PA6 Get_Adc(ADC_Channel_6)
#define GET_ADC_PA7 Get_Adc(ADC_Channel_7)
#define GET_ADC_PB0 Get_Adc(ADC_Channel_8)
#define GET_ADC_PB1 Get_Adc(ADC_Channel_9)

void Adc_Init(void);
uint16_t Get_Adc(uint8_t ch);
uint16_t Get_Adc_Average(uint8_t ch,uint8_t times);

#endif
