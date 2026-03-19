#ifndef _USART_H_
#define _USART_H_

#include <stdint.h>
#include "stm32f10x_usart.h"

#ifndef WEAK
#	ifdef __CC_ARM
#		define WEAK __weak
#	elif defined(__IAR_SYSTEMS_ICC__)
#		define WEAK __weak
#	elif defined(__GNUC__)
#		define WEAK __attribute__((weak))
#	elif defined(__ADSPBLACKFIN__)
#		define WEAK __attribute__((weak))
#	elif defined(_MSC_VER)
#		define WEAK
#	elif defined(__TI_COMPILER_VERSION__)
#		define WEAK
#	else
#		error not supported tool chain
#	endif
#endif

#define USART1_enable	1
#define USART2_enable	1
#define USART3_enable	1
#define BUF_LEN			64

#if USART1_enable
void uart1_init(uint32_t bound);
#define USART1_sendBuf(buf,len) USART_sendBuf(USART1,buf,len)
#endif
#if USART2_enable
void uart2_init(uint32_t bound);
#define USART2_sendBuf(buf,len) USART_sendBuf(USART2,buf,len)
#endif
#if USART3_enable
void uart3_init(uint32_t bound);
#define USART3_sendBuf(buf,len) USART_sendBuf(USART3,buf,len)
#endif

void usart1_Rx_IRQ(uint8_t c);
void usart2_Rx_IRQ(uint8_t c);
void usart3_Rx_IRQ(uint8_t c);

void USART_sendBuf(USART_TypeDef * USARTx, uint8_t * buf, uint16_t bufLen);
int USART_printf(USART_TypeDef * USARTx,char *fmt,...);

#endif
