#ifndef __GPIO_H
#define __GPIO_H	 
#include "sys.h"

#define LED PCout(13) = !PCin(13)

#define KEY_1 PAin(0)
#define KEY_2 PAin(1)
#define KEY_3 PAin(2)

void gpio_init(void);//≥ı ºªØ

				    
#endif
