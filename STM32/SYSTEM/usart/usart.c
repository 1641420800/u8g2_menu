#include "usart.h"

/*
	uart1_init(9600);		// 串口初始化
	uart2_init(9600);		// 串口初始化
	uart3_init(9600);		// 串口初始化
*/

WEAK	// 预定义的中断回调函数
void usart1_Rx_IRQ(uint8_t c)
{
	switch(c)
	{
	default:
		break;
	}
}

WEAK	// 预定义的中断回调函数
void usart2_Rx_IRQ(uint8_t c)
{
	switch(c)
	{
	default:
		break;
	}
}

WEAK	// 预定义的中断回调函数
void usart3_Rx_IRQ(uint8_t c)
{
	switch(c)
	{
	default:
		break;
	}
}
  
#if 1
#include <stdio.h>
#pragma import(__use_no_semihosting)
struct __FILE 
{ 
	int handle;
}; 

FILE __stdout;       

void _sys_exit(int x) 
{ 
	x = x; 
}
void _ttywrch(int ch)
{
	ch = ch;
}

int fputc(int ch, FILE *f)
{      
	while((USART1->SR&0X40)==0){}
    USART1->DR = (uint8_t)ch;      
	return ch;
}
#endif 

#if USART1_enable
void uart1_init(uint32_t bound)
{
	// GPIO端口设置
	GPIO_InitTypeDef GPIO_InitStructure;
	USART_InitTypeDef USART_InitStructure;
	NVIC_InitTypeDef NVIC_InitStructure;

	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);		// 使能时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1, ENABLE);		// 使能时钟

	// USART_TX
	GPIO_InitStructure.GPIO_Pin		= GPIO_Pin_9;
	GPIO_InitStructure.GPIO_Speed	= GPIO_Speed_50MHz;
	GPIO_InitStructure.GPIO_Mode	= GPIO_Mode_AF_PP;			// 复用推挽输出
	GPIO_Init(GPIOA, &GPIO_InitStructure);						// 初始化GPIO

	// USART_RX
	GPIO_InitStructure.GPIO_Pin		= GPIO_Pin_10;
	GPIO_InitStructure.GPIO_Mode	= GPIO_Mode_IN_FLOATING;	// 浮空输入
	GPIO_Init(GPIOA, &GPIO_InitStructure);						// 初始化GPIO

	// Usart NVIC 配置
	NVIC_InitStructure.NVIC_IRQChannel						= USART1_IRQn;
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority	= 3;		// 抢占优先级
	NVIC_InitStructure.NVIC_IRQChannelSubPriority			= 3;		// 响应优先级
	NVIC_InitStructure.NVIC_IRQChannelCmd					= ENABLE;	// IRQ通道使能
	NVIC_Init(&NVIC_InitStructure);

	// USART 初始化设置
	USART_InitStructure.USART_BaudRate				= bound;							// 串口波特率
	USART_InitStructure.USART_WordLength			= USART_WordLength_8b;				// 字长为8位数据格式
	USART_InitStructure.USART_StopBits				= USART_StopBits_1;					// 一个停止位
	USART_InitStructure.USART_Parity				= USART_Parity_No;					// 无奇偶校验位
	USART_InitStructure.USART_HardwareFlowControl	= USART_HardwareFlowControl_None;	// 无硬件数据流控制
	USART_InitStructure.USART_Mode					= USART_Mode_Rx | USART_Mode_Tx;	// 收发模式

	USART_Init(USART1, &USART_InitStructure);		// 初始化串口
	USART_ITConfig(USART1, USART_IT_RXNE, ENABLE);	// 开启串口接受中断
	USART_Cmd(USART1, ENABLE);						// 使能串口
}

void USART1_IRQHandler(void)                	//串口1中断服务程序
{
	if(USART_GetITStatus(USART1, USART_IT_RXNE) != RESET)  //接收中断(接收到的数据必须是0x0d 0x0a结尾)
	{
		usart1_Rx_IRQ(USART_ReceiveData(USART1));	//读取接收到的数据
	}
} 
#endif
#if USART2_enable
void uart2_init(uint32_t bound)
{
	// GPIO端口设置
	GPIO_InitTypeDef GPIO_InitStructure;
	USART_InitTypeDef USART_InitStructure;
	NVIC_InitTypeDef NVIC_InitStructure;

	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);		// 使能时钟
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_USART2, ENABLE);		// 使能时钟

	// USART_TX
	GPIO_InitStructure.GPIO_Pin		= GPIO_Pin_2;
	GPIO_InitStructure.GPIO_Speed	= GPIO_Speed_50MHz;
	GPIO_InitStructure.GPIO_Mode	= GPIO_Mode_AF_PP;			// 复用推挽输出
	GPIO_Init(GPIOA, &GPIO_InitStructure);						// 初始化GPIO

	// USART_RX
	GPIO_InitStructure.GPIO_Pin		= GPIO_Pin_3;
	GPIO_InitStructure.GPIO_Mode	= GPIO_Mode_IN_FLOATING;	// 浮空输入
	GPIO_Init(GPIOA, &GPIO_InitStructure);						// 初始化GPIO

	// Usart NVIC 配置
	NVIC_InitStructure.NVIC_IRQChannel						= USART2_IRQn;
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority	= 3;		// 抢占优先级
	NVIC_InitStructure.NVIC_IRQChannelSubPriority			= 3;		// 响应优先级
	NVIC_InitStructure.NVIC_IRQChannelCmd					= ENABLE;	// IRQ通道使能
	NVIC_Init(&NVIC_InitStructure);

	// USART 初始化设置
	USART_InitStructure.USART_BaudRate				= bound;							// 串口波特率
	USART_InitStructure.USART_WordLength			= USART_WordLength_8b;				// 字长为8位数据格式
	USART_InitStructure.USART_StopBits				= USART_StopBits_1;					// 一个停止位
	USART_InitStructure.USART_Parity				= USART_Parity_No;					// 无奇偶校验位
	USART_InitStructure.USART_HardwareFlowControl	= USART_HardwareFlowControl_None;	// 无硬件数据流控制
	USART_InitStructure.USART_Mode					= USART_Mode_Rx | USART_Mode_Tx;	// 收发模式

	USART_Init(USART2, &USART_InitStructure);		// 初始化串口
	USART_ITConfig(USART2, USART_IT_RXNE, ENABLE);	// 开启串口接受中断
	USART_Cmd(USART2, ENABLE);						// 使能串口
}

void USART2_IRQHandler(void)                	//串口1中断服务程序
{
	if(USART_GetITStatus(USART2, USART_IT_RXNE) != RESET)  //接收中断(接收到的数据必须是0x0d 0x0a结尾)
	{
		usart2_Rx_IRQ(USART_ReceiveData(USART2));	//读取接收到的数据
	}
}
#endif
#if USART3_enable
void uart3_init(uint32_t bound)
{
	// GPIO端口设置
	GPIO_InitTypeDef GPIO_InitStructure;
	USART_InitTypeDef USART_InitStructure;
	NVIC_InitTypeDef NVIC_InitStructure;

	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);		// 使能时钟
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_USART3, ENABLE);		// 使能时钟

	// USART_TX
	GPIO_InitStructure.GPIO_Pin		= GPIO_Pin_10;
	GPIO_InitStructure.GPIO_Speed	= GPIO_Speed_50MHz;
	GPIO_InitStructure.GPIO_Mode	= GPIO_Mode_AF_PP;			// 复用推挽输出
	GPIO_Init(GPIOB, &GPIO_InitStructure);						// 初始化GPIO

	// USART_RX
	GPIO_InitStructure.GPIO_Pin		= GPIO_Pin_11;
	GPIO_InitStructure.GPIO_Mode	= GPIO_Mode_IN_FLOATING;	// 浮空输入
	GPIO_Init(GPIOB, &GPIO_InitStructure);						// 初始化GPIO

	// Usart NVIC 配置
	NVIC_InitStructure.NVIC_IRQChannel						= USART3_IRQn;
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority	= 3;		// 抢占优先级
	NVIC_InitStructure.NVIC_IRQChannelSubPriority			= 3;		// 响应优先级
	NVIC_InitStructure.NVIC_IRQChannelCmd					= ENABLE;	// IRQ通道使能
	NVIC_Init(&NVIC_InitStructure);

	// USART 初始化设置
	USART_InitStructure.USART_BaudRate				= bound;							// 串口波特率
	USART_InitStructure.USART_WordLength			= USART_WordLength_8b;				// 字长为8位数据格式
	USART_InitStructure.USART_StopBits				= USART_StopBits_1;					// 一个停止位
	USART_InitStructure.USART_Parity				= USART_Parity_No;					// 无奇偶校验位
	USART_InitStructure.USART_HardwareFlowControl	= USART_HardwareFlowControl_None;	// 无硬件数据流控制
	USART_InitStructure.USART_Mode					= USART_Mode_Rx | USART_Mode_Tx;	// 收发模式

	USART_Init(USART3, &USART_InitStructure);		// 初始化串口
	USART_ITConfig(USART3, USART_IT_RXNE, ENABLE);	// 开启串口接受中断
	USART_Cmd(USART3, ENABLE);						// 使能串口
}

void USART3_IRQHandler(void)                	//串口1中断服务程序
{
	if(USART_GetITStatus(USART3, USART_IT_RXNE) != RESET)  //接收中断(接收到的数据必须是0x0d 0x0a结尾)
	{
		usart3_Rx_IRQ(USART_ReceiveData(USART3));	//读取接收到的数据
	}
}
#endif

void USART_sendBuf(USART_TypeDef * USARTx, uint8_t * buf, uint16_t bufLen)
{
	while(bufLen--)
	{
		while((USARTx->SR&0X40)==0){}
		USARTx->DR = *buf;
		++buf;
	}
}

#include <stdarg.h>
int USART_printf(USART_TypeDef * USARTx,char *fmt,...)
{
	char buffer[BUF_LEN];
	int  ret;
	va_list arg_ptr;
	va_start(arg_ptr,fmt);
	ret = vsnprintf(buffer,BUF_LEN,fmt,arg_ptr);
	va_end(arg_ptr);
	
	USART_sendBuf(USARTx,(uint8_t*)buffer,ret);
	
	return ret;
}
