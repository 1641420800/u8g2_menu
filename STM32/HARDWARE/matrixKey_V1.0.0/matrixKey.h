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
    /* ������Ϣ */
    uint8_t row_count,col_count;                // ���̵�������
    const uint8_t * key_values_ptr;                   // ���̵ļ�ֵ Ϊ������� malloc ����Ĭ��ֵ
    
    // ��������ʼ�� Ϊ����ʹ��Ĭ�Ͻӿ�
    hardware_init_func_t hardware_init_func;    // Ӳ���ӿ� ��ʼ����ӦӲ��
    ctrl_read_func_t ctrl_read_func;            // Ӳ���ӿ� ������ź� �������ź�
    
    /* �м���� */
    uint8_t * outPin, * inPin;                // ����״̬���� ��ʼ��ʱ������������ռ�
    uint8_t * keyValueTable;
} matrixKey_t;

extern matrixKey_t matrixKey;

/* ��ʼ�����󰴼��� */
uint8_t  matrixKey_init(matrixKey_t * matrixKey,uint8_t col_count,uint8_t row_count,const uint8_t * key_values_ptr);
/* ����Ƿ��а������� */
uint8_t  check_key_pressed(matrixKey_t * matrixKey);
/* �鿴��Ӧ��ֵ�İ����Ƿ��� - ����λ�� */
uint8_t  is_pressed_position(matrixKey_t * matrixKey,uint8_t key_col,uint8_t key_row);
/* �鿴��Ӧ��ֵ�İ����Ƿ��� - �����ֵ */
uint8_t  is_pressed(matrixKey_t * matrixKey,uint8_t key_value);
/* ���μ�����а��� ֧��ͬʱ���¶�� */
uint8_t* get_pressed_keys(matrixKey_t * matrixKey,uint8_t * num_keys);
/* ������а��� ��֧��ͬʱ���¶�� �ٶ�ֻ���µ������� */
uint8_t  get_current_key_value(matrixKey_t * matrixKey);

#endif
