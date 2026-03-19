#ifndef _MATRIXKER_H_
#define _MATRIXKER_H_

#include <stdint.h>
#include <stdlib.h>     /* malloc , calloc , free */
#include "stm32f10x_gpio.h"

#define matrixKey_init_def() matrixKey_init(&matrixKey,4,4,NULL)

typedef void (*hardware_init_func_t)(void);
typedef void (*ctrl_read_func_t)(uint8_t * outPin, uint8_t * inPin);

typedef struct
{
    /* 基本信息 */
    uint8_t row_count,col_count;                // 键盘的行列数
    const uint8_t * key_values_ptr;                   // 键盘的键值 为空则调用 malloc 并赋默认值
    
    // 不主动初始化 为空则使用默认接口
    hardware_init_func_t hardware_init_func;    // 硬件接口 初始化对应硬件
    ctrl_read_func_t ctrl_read_func;            // 硬件接口 输出行信号 输入列信号
    
    /* 中间变量 */
    uint8_t * outPin, * inPin;                // 行列状态缓存 初始化时按行列数分配空间
    uint8_t * keyValueTable;
} matrixKey_t;

extern matrixKey_t matrixKey;

/* 初始化矩阵按键库 */
uint8_t  matrixKey_init(matrixKey_t * matrixKey,uint8_t col_count,uint8_t row_count,const uint8_t * key_values_ptr);
/* 检查是否有按键按下 */
uint8_t  check_key_pressed(matrixKey_t * matrixKey);
/* 查看对应键值的按键是否按下 - 传入位置 */
uint8_t  is_pressed_position(matrixKey_t * matrixKey,uint8_t key_col,uint8_t key_row);
/* 查看对应键值的按键是否按下 - 传入键值 */
uint8_t  is_pressed(matrixKey_t * matrixKey,uint8_t key_value);
/* 依次检查所有按键 支持同时按下多个 */
uint8_t* get_pressed_keys(matrixKey_t * matrixKey,uint8_t * num_keys);
/* 检查所有按键 不支持同时按下多个 假定只按下单个按键 */
uint8_t  get_current_key_value(matrixKey_t * matrixKey);

#endif
