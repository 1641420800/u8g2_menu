#ifndef __GPIO_H
#define __GPIO_H
#include "sys.h"

#define LED PCout(13)

#define KEY_1 PBin(12)
#define KEY_2 PBin(13)
#define KEY_3 PBin(14)

void gpio_init(void);

#endif
