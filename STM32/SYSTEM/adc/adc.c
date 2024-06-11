#include "adc.h"
#include "stm32f10x_adc.h"
#include "stm32f10x_gpio.h"

/*---------AD转换--------
说明：c8t6共有10个外部AD转换 PA0-PA7 PB0、PB1 分别对应通道0-通道9  本程序为PA0、PA1、PB0、PB1
		需要首先在本文件内文件内修改需要使用的通道 CLOSE（关闭） 或 OPEN（打开）
		
通道说明：	//其他	GET_ADC_PA3、GET_ADC_PA4、GET_ADC_PA5、GET_ADC_PA6、GET_ADC_PA7、
			GET_ADC_PA8、GET_ADC_PA9、GET_ADC_PA5、GET_ADC_PB0、GET_ADC_PB1
调用：
	#include "adc.h"
	
	int adcx1,adcx2,adcx3,adcx4;  			//AD转换的结果
	float adc1,adc2,adc3,adc4;
//--------------------------------ADC初始化默认开启PA0和PA1的通道，如需要其他通道在下方进行开启----

	Adc_Init();							//ADC转换初始化
//--------------------------------ADC获取数据并OLED进行显示--------------------------------------
	adcx1=GET_ADC_PA0;						//获取PA0的ADC值
	adcx2=GET_ADC_PA1;						//获取PA1的ADC值
	adcx3=GET_ADC_PA2;						//获取PA2的ADC值			默认未开启，需在下方开启
	adcx4=GET_ADC_PA3;						//获取PA3的ADC值			默认未开启，需在下方开启
	adc1 = 100-(adcx1/40);  				//控制变化范围在0-100
	adc2 = 100-(adcx2/40);					//控制变化范围在0-100
	adc3 = 100-(adcx3/40);					//控制变化范围在0-100
	adc4 = 100-(adcx4/40);					//控制变化范围在0-100
	OLED_ShowString(0,0,"adc1:",16);   	    //显示标题 
	OLED_ShowNum(55,0,adc1,3,16);           //显示屏显示adc1 
	OLED_ShowString(0,2,"adc2:",16);   	    //显示标题 
	OLED_ShowNum(55,2,adc2,3,16);           //显示屏显示adc2
	OLED_ShowString(0,4,"adc3:",16);   	    //显示标题  
	OLED_ShowNum(55,4,adc3,3,16);           //显示屏显示adc3 
	OLED_ShowString(0,6,"adc4:",16);   	    //显示屏标题 
	OLED_ShowNum(55,6,adc4,3,16);           //显示屏显示adc4 	

*/
#define CLOSE 0
#define OPEN  1

#define ADC1_CH0_PA0_CHOOSE	OPEN
#define ADC1_CH1_PA1_CHOOSE	OPEN
#define ADC1_CH2_PA2_CHOOSE	CLOSE
#define ADC1_CH3_PA3_CHOOSE	CLOSE
#define ADC1_CH4_PA4_CHOOSE	CLOSE
#define ADC1_CH5_PA5_CHOOSE	CLOSE
#define ADC1_CH6_PA6_CHOOSE	CLOSE
#define ADC1_CH7_PA7_CHOOSE	CLOSE
#define ADC1_CH8_PB0_CHOOSE	CLOSE
#define ADC1_CH9_PB1_CHOOSE	CLOSE

#define ADC1_DMA CLOSE

#if ADC1_DMA
#include "stm32f10x_dma.h"
void ADC_DMA_Init(uint32_t * data, uint16_t dataSize)
{
	DMA_InitTypeDef DMA_InitStructure;
	RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE); 				//使能MDA1时钟
	/* DMA channel1 configuration */
	DMA_DeInit(DMA1_Channel1); 										//指定DMA通道
	DMA_InitStructure.DMA_PeripheralBaseAddr = (uint32_t)&(ADC1->DR);		//ADC1地址---代表ADC1保存转换值的寄存器
	DMA_InitStructure.DMA_MemoryBaseAddr = (uint32_t)&data;	//设置DMA内存地址，ADC转换结果直接放入该地址
	DMA_InitStructure.DMA_DIR = DMA_DIR_PeripheralSRC; 				//外设为设置为数据传输的来源
	DMA_InitStructure.DMA_BufferSize = dataSize;						//传输总数据---2通道需要传输2个数据
	DMA_InitStructure.DMA_PeripheralInc = DMA_PeripheralInc_Disable; 	//外设地址固定
	DMA_InitStructure.DMA_MemoryInc = DMA_MemoryInc_Enable;			//内存地址自增---总体表示始终从外设ADC1地址处取值---依次保存到连续的两个内存变量中---
	DMA_InitStructure.DMA_PeripheralDataSize = DMA_PeripheralDataSize_HalfWord; //内存传输数据单元---半字16位
	DMA_InitStructure.DMA_MemoryDataSize = DMA_MemoryDataSize_HalfWord;
	DMA_InitStructure.DMA_Mode = DMA_Mode_Circular;					//循环模式---2个数据依次循环接收从外设ADC1传输过来的ADC值---
	DMA_InitStructure.DMA_Priority = DMA_Priority_High;
	DMA_InitStructure.DMA_M2M = DMA_M2M_Disable;
	DMA_Init(DMA1_Channel1, &DMA_InitStructure);

	/* Enable DMA channel1 */
	DMA_Cmd(DMA1_Channel1, ENABLE); 									//使能DMA通道
	
	Adc_Init();
	
}
#endif

void Adc_Init(void)
{
	int order = 0;
	GPIO_InitTypeDef GPIO_InitStructure;
	ADC_InitTypeDef ADC_InitStructure;
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1 ,ENABLE);
#if ADC1_CH0_PA0_CHOOSE || ADC1_CH1_PA1_CHOOSE || ADC1_CH2_PA2_CHOOSE || ADC1_CH3_PA3_CHOOSE || ADC1_CH4_PA4_CHOOSE || ADC1_CH5_PA5_CHOOSE || ADC1_CH6_PA6_CHOOSE || ADC1_CH7_PA7_CHOOSE
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA,ENABLE);
#endif	
	
#if ADC1_CH8_PB0_CHOOSE||ADC1_CH9_PB1_CHOOSE
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB|RCC_APB2Periph_ADC1,ENABLE);
#endif
	
	RCC_ADCCLKConfig(RCC_PCLK2_Div6);	//设置ADC为6分频 72M/6=12M  ADC最大时间 <= 14M	
	GPIO_InitStructure.GPIO_Mode=GPIO_Mode_AIN;
#if ADC1_CH0_PA0_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_0;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH1_PA1_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_1;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH2_PA2_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_2;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH3_PA3_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_3;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH4_PA4_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_4;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH5_PA5_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_5;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH6_PA6_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_6;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH7_PA7_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_7;
	GPIO_Init(GPIOA,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH8_PB0_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_0;
	GPIO_Init(GPIOB,&GPIO_InitStructure);
	++order;
#endif
#if ADC1_CH9_PB1_CHOOSE 
	GPIO_InitStructure.GPIO_Pin=GPIO_Pin_1;
	GPIO_Init(GPIOB,&GPIO_InitStructure);
	++order;
#endif
	
	ADC_DeInit(ADC1);
	
	ADC_InitStructure.ADC_Mode					= ADC_Mode_Independent;			// ADC工作模式:ADC1和ADC2工作在独立模式

#if ADC1_DMA
	ADC_InitStructure.ADC_ScanConvMode			= ENABLE;						// 模数转换工作在扫描模式
	ADC_InitStructure.ADC_ContinuousConvMode	= ENABLE;						// 模数转换工作在连续转换
#else
	ADC_InitStructure.ADC_ScanConvMode			= DISABLE;						// 模数转换工作在单通道模式
	ADC_InitStructure.ADC_ContinuousConvMode	= DISABLE;						// 模数转换工作在单次转换
#endif
	ADC_InitStructure.ADC_ExternalTrigConv		= ADC_ExternalTrigConv_None;	// 转换由软件而不是外部触发启动
	ADC_InitStructure.ADC_DataAlign				= ADC_DataAlign_Right;			// ADC数据右对齐
	ADC_InitStructure.ADC_NbrOfChannel			= order;						// 顺序进行规则转换的ADC通道的数目
	ADC_Init(ADC1, &ADC_InitStructure);											// 初始化 ADC 
	
	order = 0;
#if ADC1_CH0_PA0_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_0, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH1_PA1_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_1, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH2_PA2_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_2, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH3_PA3_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_3, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH4_PA4_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_4, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH5_PA5_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_5, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH6_PA6_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_6, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH7_PA7_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_7, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH8_PB0_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_8, ++order, ADC_SampleTime_1Cycles5);
#endif
#if ADC1_CH9_PB1_CHOOSE 
	ADC_RegularChannelConfig (ADC1, ADC_Channel_9, ++order, ADC_SampleTime_1Cycles5);
#endif	 

#if ADC1_DMA
	ADC_DMACmd ( ADC1, ENABLE ); //使能ADC DMA传输
#endif

	ADC_Cmd(ADC1,ENABLE);
	ADC_ResetCalibration(ADC1);
	while(ADC_GetResetCalibrationStatus(ADC1));
	ADC_StartCalibration(ADC1);
	while(ADC_GetCalibrationStatus(ADC1));
}

uint16_t Get_Adc(uint8_t ch)						
{
	switch(ch)
	{
#if ADC1_CH0_PA0_CHOOSE 
		case ADC_Channel_0: break;
#endif
#if ADC1_CH1_PA1_CHOOSE 
		case ADC_Channel_1: break;
#endif
#if ADC1_CH2_PA2_CHOOSE 
		case ADC_Channel_2: break;
#endif
#if ADC1_CH3_PA3_CHOOSE 
		case ADC_Channel_3: break;
#endif
#if ADC1_CH4_PA4_CHOOSE 
		case ADC_Channel_4: break;
#endif
#if ADC1_CH5_PA5_CHOOSE 
		case ADC_Channel_5: break;
#endif
#if ADC1_CH6_PA6_CHOOSE 
		case ADC_Channel_6: break;
#endif
#if ADC1_CH7_PA7_CHOOSE 
		case ADC_Channel_7: break;
#endif
#if ADC1_CH8_PB0_CHOOSE 
		case ADC_Channel_8: break;
#endif
#if ADC1_CH9_PB1_CHOOSE 
		case ADC_Channel_9: break;
#endif
		default : return 0;
	}
 	ADC_RegularChannelConfig (ADC1, ch, 1, ADC_SampleTime_1Cycles5);
	
	ADC_SoftwareStartConvCmd(ADC1,ENABLE);
	while(!ADC_GetFlagStatus(ADC1,ADC_FLAG_EOC));
	return ADC_GetConversionValue(ADC1);
}

#include "delay.h"
uint16_t Get_Adc_Average(uint8_t ch,uint8_t times)	
{
	uint32_t temp_val=0;
	uint8_t t;
	for(t=0;t<times;t++)
	{
		temp_val+=Get_Adc(ch);
		delay_ms(5);
	}
	return temp_val/times;
}
