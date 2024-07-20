#include "matrixKey.h"
#include <stdlib.h>     /* malloc , calloc , free */
#include "delay.h"      /* delay_us */

/*
接线说明:
    默认接 : PA0 ~ PA7

注意:
   键值默认为:
        '1','2','3','A',
        '4','5','6','B',
        '7','8','9','C',
        '*','0','#','D',
    如果和实际的不一样可以改 这个是常用的那个键盘

使用说明:

#include "matrixKey.h"


uint8_t keys = 0;
 
	matrixKey_init_def();   							// 矩阵键盘初始化
    
   
		keys = check_key_pressed(&matrixKey);           // 检测是否有按键按下，有按键按下返回1，没有返回0

		keys = is_pressed(&matrixKey, (uint8_t)'A');    // 返回某个键值的按键是否按下，按下返回1，没有返回0，里面的A可以替换成 0123456789ABCD*# 就是下边那个和硬件上的应该是一一对应的表里的
        
		keys = get_current_key_value(&matrixKey);       // 返回当前按键键值，范围 0123456789ABCD*# 就是下边那个和硬件上的应该是一一对应的表里的

*/

matrixKey_t matrixKey;

static const uint8_t keyList_def[] = 
{   // 和硬件上的应该是一一对应的
    '1','2','3','A',
    '4','5','6','B',
    '7','8','9','C',
    '*','0','#','D',
};
void hardware_init_func_def(void)
{
    GPIO_InitTypeDef GPIO_InitStructure;
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);   // 使能GPIOA时钟

	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    
    // 配置行引脚GPIO输出模式为开漏输出
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_4 | GPIO_Pin_5 | GPIO_Pin_6 | GPIO_Pin_7;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_OD;    // 开漏输出
	GPIO_Init(GPIOA, &GPIO_InitStructure);
    
    // 配置列引脚GPIO输入模式为上拉输入
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0 | GPIO_Pin_1 | GPIO_Pin_10 | GPIO_Pin_11;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;       // 上拉输入
	GPIO_Init(GPIOB, &GPIO_InitStructure);
}

void matrixKey_delay_us(u32 nTimer)
{
	u32 i=0;
	for(i=0;i<nTimer;i++){
		__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();
		__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();
		__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();
		__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();
		__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();__NOP();
	}
}

void ctrl_read_func_def(uint8_t * outPin, uint8_t * inPin)
{
    // 将 outPin 数组的元素分别写入相应的引脚，设置输出状态
    GPIO_WriteBit(GPIOA,GPIO_Pin_4,(BitAction)outPin[0]);
    GPIO_WriteBit(GPIOA,GPIO_Pin_5,(BitAction)outPin[1]);
    GPIO_WriteBit(GPIOA,GPIO_Pin_6,(BitAction)outPin[2]);
    GPIO_WriteBit(GPIOA,GPIO_Pin_7,(BitAction)outPin[3]);
    
    // 短暂延迟，以确保数据稳定 实测没有延时会导致读取出错
    matrixKey_delay_us(1);
    
    // 读取输入引脚，将结果存储在 inPin 数组中
    inPin[0] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_0);
    inPin[1] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_1);
    inPin[2] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_10);
    inPin[3] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_11);
}
/* ------------------------------------------------------------------------------------------ */

/*
描述：初始化指定键盘尺寸和按键键值。
语法：
    uint8_t matrixKey_init(matrixKey_t * matrixKey, uint8_t col_count, uint8_t row_count, const uint8_t * key_values_ptr);
参数：
    matrixKey：指向matrixKey_t结构体的指针，用于存储矩阵按键的信息。
    col_count：键盘的列数。
    row_count：键盘的行数。
    key_values_ptr：键盘的按键键值数组指针。如果为NULL，则使用默认值。
返回值：
    返回初始化结果。如果初始化成功，返回0；否则返回非零值。
简易用法:
    matrixKey_init_def()
*/
uint8_t matrixKey_init(matrixKey_t * matrixKey,uint8_t col_count,uint8_t row_count,const uint8_t * key_values_ptr)
{
    // 检查 matrixKey 是否为空指针
    if(!matrixKey) return 1;
    
    // 初始化 matrixKey 的行和列数
    matrixKey->row_count = row_count;
    matrixKey->col_count = col_count;
    
    if(key_values_ptr)
    {
         // 如果给定了 key_values_ptr，则将 matrixKey 的 key_values_ptr 指向给定的指针
        matrixKey->key_values_ptr = key_values_ptr;
    }
    else
    {
        // 如果没有给定 key_values_ptr，则将 matrixKey 的 key_values_ptr 指向默认值
        matrixKey->key_values_ptr = keyList_def;
    }
    
    // 为 matrixKey 的 outPin、inPin 和 keyValueTable 分配内存
    matrixKey->outPin = (uint8_t *)calloc(col_count,sizeof(uint8_t));
    if(!matrixKey->outPin) goto ERROR;
    matrixKey->inPin  = (uint8_t *)calloc(row_count,sizeof(uint8_t));
    if(!matrixKey->inPin) goto ERROR;
    matrixKey->keyValueTable = (uint8_t *)calloc(row_count * col_count,sizeof(uint8_t));
    if(!matrixKey->keyValueTable) goto ERROR;
    
    // 如果硬件初始化函数和控制读取函数为空，则将其初始化为默认函数
    if(!matrixKey->hardware_init_func) matrixKey->hardware_init_func = hardware_init_func_def;
    if(!matrixKey->ctrl_read_func) matrixKey->ctrl_read_func = ctrl_read_func_def;
    
    // 执行硬件初始化函数
    matrixKey->hardware_init_func();
    
    return 0;
ERROR:
    // 发生错误时，释放分配的内存，并将指针设为NULL
    free(matrixKey->outPin);
    free(matrixKey->inPin);
    free(matrixKey->keyValueTable);
    
    matrixKey->outPin = NULL;
    matrixKey->inPin = NULL;
    matrixKey->keyValueTable = NULL;
    
    return 2;
}

/*
描述：检查是否有按键按下。
语法：
    uint8_t check_key_pressed(matrixKey_t * matrixKey);
参数：
    matrixKey：指向matrixKey_t结构体的指针，用于存储矩阵按键的信息。
返回值：
    如果存在按键按下，返回1；否则返回0。
*/
uint8_t check_key_pressed(matrixKey_t * matrixKey)
{
    uint8_t loopVariable;
    
    // 将 outPin 数组的所有元素设置为 Bit_RESET，表示将所有行引脚置低
    for(loopVariable = 0; loopVariable < matrixKey->row_count; ++loopVariable)
    {
        matrixKey->outPin[loopVariable] = Bit_RESET;
    }
    
    // 调用 ctrl_read_func 函数，读取输入引脚的状态，并将结果存储在 inPin 数组中
    matrixKey->ctrl_read_func(matrixKey->outPin,matrixKey->inPin);
    
    // 检查是否有按键按下
    // 在列引脚中只要有一个引脚为低电平（Bit_RESET），则表示有按键按下
    for(loopVariable = 0; loopVariable < matrixKey->col_count; ++loopVariable)
    {
        if(matrixKey->inPin[loopVariable] == Bit_RESET) return 1; // 返回1表示有按键按下
    }
    
    return 0; // 返回0表示没有按键按下
}

/*
描述：查看指定位置的按键是否按下。
语法：
    uint8_t is_pressed_position(matrixKey_t * matrixKey, uint8_t key_col, uint8_t key_row);
参数：
    matrixKey：指向matrixKey_t结构体的指针，用于存储矩阵按键的信息。
    key_col：按键的列位置。
    key_row：按键的行位置。
返回值：
    如果指定位置的按键按下，返回1；否则返回0。
*/
uint8_t  is_pressed_position(matrixKey_t * matrixKey,uint8_t key_col,uint8_t key_row)
{
    uint8_t loopVariable;
    
    // 检查给定的按键行和列是否超出范围
    if(key_row >= matrixKey->row_count) return 0; // 返回0表示位置超出范围
    if(key_col >= matrixKey->col_count) return 0; // 返回0表示位置超出范围
    
    // 将 outPin 数组的所有行引脚置高（Bit_SET）
    for(loopVariable = 0; loopVariable < matrixKey->row_count; ++loopVariable)
    {
        matrixKey->outPin[loopVariable] = Bit_SET;
    }
    
    // 将指定按键的行引脚置低（Bit_RESET）
    matrixKey->outPin[key_row] = Bit_RESET;
    
    // 调用 ctrl_read_func 函数，读取输入引脚的状态，并将结果存储在 inPin 数组中
    matrixKey->ctrl_read_func(matrixKey->outPin,matrixKey->inPin);
    
    // 检查按键指定位置的列引脚状态是否为低电平（Bit_RESET）
    // 如果是低电平，则表示给定位置的按键被按下
    return (matrixKey->inPin[key_col] == Bit_RESET);
}

/*
描述：查看指定键值的按键是否按下。
语法：
    uint8_t is_pressed(matrixKey_t * matrixKey, uint8_t key_value);
参数：
    matrixKey：指向matrixKey_t结构体的指针，用于存储矩阵按键的信息。
    key_value：按键的键值。
返回值：
    如果指定键值的按键按下，返回1；否则返回0。
*/
uint8_t is_pressed(matrixKey_t * matrixKey,uint8_t key_value)
{
    uint8_t loopVariable;
    
    // 检查 key_values_ptr 是否为NULL
    if(!matrixKey->key_values_ptr) return 0; // 返回0表示 key_values_ptr 为NULL
    
    // 遍历 key_values_ptr 数组，查找与给定的 key_value 相匹配的值
    for(loopVariable = 0; loopVariable < matrixKey->row_count * matrixKey->col_count; ++loopVariable)
    {
        if(matrixKey->key_values_ptr[loopVariable] == key_value)
        {
            // 如果找到匹配的值，则调用 is_pressed_position 函数，判断对应位置的按键是否被按下
            return is_pressed_position(matrixKey,loopVariable%(matrixKey->row_count),loopVariable/(matrixKey->row_count));
        }
    }
    return 0; // 返回0表示未找到匹配的值或者 key_values_ptr 为NULL
}

/*
描述：返回所有按下的按键键值列表。
语法：
    uint8_t* get_pressed_keys(matrixKey_t * matrixKey, uint8_t * num_keys);
参数：
    matrixKey：指向matrixKey_t结构体的指针，用于存储矩阵按键的信息。
    num_keys：按下的按键数量。
返回值：
    按下的按键键值列表的指针。
*/
uint8_t* get_pressed_keys(matrixKey_t * matrixKey,uint8_t * num_keys)
{
    uint8_t loopVariable;
    uint8_t loopVariable_row;
    uint8_t loopVariable_col;
    uint8_t _num_keys = 0;
    
    // 遍历列引脚，逐个置低并读取输入引脚状态，确定被按下的按键
    for(loopVariable_col = 0; loopVariable_col < matrixKey->col_count; ++loopVariable_col)
    {
        // 将 outPin 数组的所有行引脚置高（Bit_SET）
        for(loopVariable = 0; loopVariable < matrixKey->row_count; ++loopVariable)
        {
            matrixKey->outPin[loopVariable] = Bit_SET;
        }
        
        // 将当前列引脚置低（Bit_RESET）
        matrixKey->outPin[loopVariable_col] = Bit_RESET;
        
        // 调用 ctrl_read_func 函数，读取输入引脚的状态，并将结果存储在 inPin 数组中
        matrixKey->ctrl_read_func(matrixKey->outPin,matrixKey->inPin);
        
        // 遍历行引脚，检查是否有按键被按下
        for(loopVariable_row = 0; loopVariable_row < matrixKey->row_count; ++loopVariable_row)
        {
            if(matrixKey->inPin[loopVariable_row] == Bit_RESET)
            {
                // 如果检测到按键被按下，则将该按键的值存储在 keyValueTable 数组中
                matrixKey->keyValueTable[_num_keys++] = matrixKey->key_values_ptr[loopVariable_col * 4 + loopVariable_row];
            }
        }
    }
    
    // 将检测到的按键数量存储在 num_keys 变量中
    *num_keys = _num_keys;
    // 返回 keyValueTable 数组的指针
    return matrixKey->keyValueTable;
}

/*
描述：返回当前按下的按键键值。
语法：
    uint8_t get_current_key_value(matrixKey_t * matrixKey);
参数：
    matrixKey：指向matrixKey_t结构体的指针，用于存储矩阵按键的信息。
返回值：
    当前按下的按键键值(按键靠前优先级高)。
    
使用示例:下面是一些使用函数库中函数的示例代码。
*/
uint8_t get_current_key_value(matrixKey_t * matrixKey)
{
    uint8_t num_keys;
    static uint8_t keyValueLog = 0;
    
    // 获取当前被按下的按键值，并存储在 keyValueTable 数组中
    get_pressed_keys(matrixKey,&num_keys);
    if(num_keys)
    {
        // 如果有按键被按下
        if(keyValueLog != matrixKey->keyValueTable[0])
        {
            // 如果当前按键的值与之前记录的按键值不同
            keyValueLog = matrixKey->keyValueTable[0];
            return matrixKey->keyValueTable[0]; // 返回当前按键的值
        }
        else
        {
            // 如果当前按键的值与之前记录的按键值相同
            return 0; // 返回0表示当前没有新的按键值
        }
    }
    else
    {
        // 如果没有按键被按下
        keyValueLog = 0;
        return 0; // 返回0表示当前没有按键被按下
    }
}
