#ifndef _TEM_H_
#define _TEM_H_

#include <stdint.h>
#include "stm32f10x_tim.h"

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

#define ServiceTimer 3

#define TIM1_enable	1
#define TIM2_enable	1
#define TIM3_enable	1
#define TIM4_enable	1

#if TIM1_enable || ServiceTimer == 1
void tim1_init(uint16_t Pre,uint16_t Psc);
#endif
#if TIM2_enable || ServiceTimer == 2
void tim2_init(uint16_t Pre,uint16_t Psc);
#endif
#if TIM3_enable || ServiceTimer == 3
void tim3_init(uint16_t Pre,uint16_t Psc);
#endif
#if TIM4_enable || ServiceTimer == 4
void tim4_init(uint16_t Pre,uint16_t Psc);
#endif

#if ServiceTimer != 0
typedef struct _ServiceTimer ServiceTimer_t;
typedef void(*timerCallback_t)(ServiceTimer_t * serviceTimer);
struct _ServiceTimer
{
	uint32_t timeInterval;
	uint32_t lastTime;
	timerCallback_t timerCallback;
	struct _ServiceTimer * next;
};
extern uint32_t currentTime;
ServiceTimer_t * registerTimer(uint32_t timeInterval,timerCallback_t timerCallback);
uint16_t get_CNT_value(void);
#endif

void tim1_IRQ(void);
void tim2_IRQ(void);
void tim3_IRQ(void);
void tim4_IRQ(void);

#endif
