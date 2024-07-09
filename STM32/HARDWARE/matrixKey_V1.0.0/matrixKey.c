#include "matrixKey.h"
#include <stdlib.h>     /* malloc , calloc , free */
#include "delay.h"      /* delay_us */

/*
����˵��:
    Ĭ�Ͻ� : PA0 ~ PA7

ע��:
   ��ֵĬ��Ϊ:
        '1','2','3','A',
        '4','5','6','B',
        '7','8','9','C',
        '*','0','#','D',
    �����ʵ�ʵĲ�һ�����Ը� ����ǳ��õ��Ǹ�����

ʹ��˵��:

#include "matrixKey.h"


uint8_t keys = 0;
 
	matrixKey_init_def();   							// ������̳�ʼ��
    
   
		keys = check_key_pressed(&matrixKey);           // ����Ƿ��а������£��а������·���1��û�з���0

		keys = is_pressed(&matrixKey, (uint8_t)'A');    // ����ĳ����ֵ�İ����Ƿ��£����·���1��û�з���0�������A�����滻�� 0123456789ABCD*# �����±��Ǹ���Ӳ���ϵ�Ӧ����һһ��Ӧ�ı����
        
		keys = get_current_key_value(&matrixKey);       // ���ص�ǰ������ֵ����Χ 0123456789ABCD*# �����±��Ǹ���Ӳ���ϵ�Ӧ����һһ��Ӧ�ı����

*/

matrixKey_t matrixKey;

static const uint8_t keyList_def[] = 
{   // ��Ӳ���ϵ�Ӧ����һһ��Ӧ��
    '1','2','3','A',
    '4','5','6','B',
    '7','8','9','C',
    '*','0','#','D',
};
void hardware_init_func_def(void)
{
    GPIO_InitTypeDef GPIO_InitStructure;
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);   // ʹ��GPIOAʱ��

	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    
    // ����������GPIO���ģʽΪ��©���
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_4 | GPIO_Pin_5 | GPIO_Pin_6 | GPIO_Pin_7;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_OD;    // ��©���
	GPIO_Init(GPIOA, &GPIO_InitStructure);
    
    // ����������GPIO����ģʽΪ��������
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0 | GPIO_Pin_1 | GPIO_Pin_10 | GPIO_Pin_11;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;       // ��������
	GPIO_Init(GPIOB, &GPIO_InitStructure);
}
void ctrl_read_func_def(uint8_t * outPin, uint8_t * inPin)
{
    // �� outPin �����Ԫ�طֱ�д����Ӧ�����ţ��������״̬
    GPIO_WriteBit(GPIOA,GPIO_Pin_4,(BitAction)outPin[0]);
    GPIO_WriteBit(GPIOA,GPIO_Pin_5,(BitAction)outPin[1]);
    GPIO_WriteBit(GPIOA,GPIO_Pin_6,(BitAction)outPin[2]);
    GPIO_WriteBit(GPIOA,GPIO_Pin_7,(BitAction)outPin[3]);
    
    // �����ӳ٣���ȷ�������ȶ� ʵ��û����ʱ�ᵼ�¶�ȡ����
    delay_us(1);
    
    // ��ȡ�������ţ�������洢�� inPin ������
    inPin[0] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_0);
    inPin[1] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_1);
    inPin[2] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_10);
    inPin[3] = (uint8_t)GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_11);
}
/* ------------------------------------------------------------------------------------------ */

/*
��������ʼ��ָ�����̳ߴ�Ͱ�����ֵ��
�﷨��
    uint8_t matrixKey_init(matrixKey_t * matrixKey, uint8_t col_count, uint8_t row_count, const uint8_t * key_values_ptr);
������
    matrixKey��ָ��matrixKey_t�ṹ���ָ�룬���ڴ洢���󰴼�����Ϣ��
    col_count�����̵�������
    row_count�����̵�������
    key_values_ptr�����̵İ�����ֵ����ָ�롣���ΪNULL����ʹ��Ĭ��ֵ��
����ֵ��
    ���س�ʼ������������ʼ���ɹ�������0�����򷵻ط���ֵ��
�����÷�:
    matrixKey_init_def()
*/
uint8_t matrixKey_init(matrixKey_t * matrixKey,uint8_t col_count,uint8_t row_count,const uint8_t * key_values_ptr)
{
    // ��� matrixKey �Ƿ�Ϊ��ָ��
    if(!matrixKey) return 1;
    
    // ��ʼ�� matrixKey ���к�����
    matrixKey->row_count = row_count;
    matrixKey->col_count = col_count;
    
    if(key_values_ptr)
    {
         // ��������� key_values_ptr���� matrixKey �� key_values_ptr ָ�������ָ��
        matrixKey->key_values_ptr = key_values_ptr;
    }
    else
    {
        // ���û�и��� key_values_ptr���� matrixKey �� key_values_ptr ָ��Ĭ��ֵ
        matrixKey->key_values_ptr = keyList_def;
    }
    
    // Ϊ matrixKey �� outPin��inPin �� keyValueTable �����ڴ�
    matrixKey->outPin = (uint8_t *)calloc(col_count,sizeof(uint8_t));
    if(!matrixKey->outPin) goto ERROR;
    matrixKey->inPin  = (uint8_t *)calloc(row_count,sizeof(uint8_t));
    if(!matrixKey->inPin) goto ERROR;
    matrixKey->keyValueTable = (uint8_t *)calloc(row_count * col_count,sizeof(uint8_t));
    if(!matrixKey->keyValueTable) goto ERROR;
    
    // ���Ӳ����ʼ�������Ϳ��ƶ�ȡ����Ϊ�գ������ʼ��ΪĬ�Ϻ���
    if(!matrixKey->hardware_init_func) matrixKey->hardware_init_func = hardware_init_func_def;
    if(!matrixKey->ctrl_read_func) matrixKey->ctrl_read_func = ctrl_read_func_def;
    
    // ִ��Ӳ����ʼ������
    matrixKey->hardware_init_func();
    
    return 0;
ERROR:
    // ��������ʱ���ͷŷ�����ڴ棬����ָ����ΪNULL
    free(matrixKey->outPin);
    free(matrixKey->inPin);
    free(matrixKey->keyValueTable);
    
    matrixKey->outPin = NULL;
    matrixKey->inPin = NULL;
    matrixKey->keyValueTable = NULL;
    
    return 2;
}

/*
����������Ƿ��а������¡�
�﷨��
    uint8_t check_key_pressed(matrixKey_t * matrixKey);
������
    matrixKey��ָ��matrixKey_t�ṹ���ָ�룬���ڴ洢���󰴼�����Ϣ��
����ֵ��
    ������ڰ������£�����1�����򷵻�0��
*/
uint8_t check_key_pressed(matrixKey_t * matrixKey)
{
    uint8_t loopVariable;
    
    // �� outPin ���������Ԫ������Ϊ Bit_RESET����ʾ�������������õ�
    for(loopVariable = 0; loopVariable < matrixKey->row_count; ++loopVariable)
    {
        matrixKey->outPin[loopVariable] = Bit_RESET;
    }
    
    // ���� ctrl_read_func ��������ȡ�������ŵ�״̬����������洢�� inPin ������
    matrixKey->ctrl_read_func(matrixKey->outPin,matrixKey->inPin);
    
    // ����Ƿ��а�������
    // ����������ֻҪ��һ������Ϊ�͵�ƽ��Bit_RESET�������ʾ�а�������
    for(loopVariable = 0; loopVariable < matrixKey->col_count; ++loopVariable)
    {
        if(matrixKey->inPin[loopVariable] == Bit_RESET) return 1; // ����1��ʾ�а�������
    }
    
    return 0; // ����0��ʾû�а�������
}

/*
�������鿴ָ��λ�õİ����Ƿ��¡�
�﷨��
    uint8_t is_pressed_position(matrixKey_t * matrixKey, uint8_t key_col, uint8_t key_row);
������
    matrixKey��ָ��matrixKey_t�ṹ���ָ�룬���ڴ洢���󰴼�����Ϣ��
    key_col����������λ�á�
    key_row����������λ�á�
����ֵ��
    ���ָ��λ�õİ������£�����1�����򷵻�0��
*/
uint8_t  is_pressed_position(matrixKey_t * matrixKey,uint8_t key_col,uint8_t key_row)
{
    uint8_t loopVariable;
    
    // �������İ����к����Ƿ񳬳���Χ
    if(key_row >= matrixKey->row_count) return 0; // ����0��ʾλ�ó�����Χ
    if(key_col >= matrixKey->col_count) return 0; // ����0��ʾλ�ó�����Χ
    
    // �� outPin ����������������øߣ�Bit_SET��
    for(loopVariable = 0; loopVariable < matrixKey->row_count; ++loopVariable)
    {
        matrixKey->outPin[loopVariable] = Bit_SET;
    }
    
    // ��ָ���������������õͣ�Bit_RESET��
    matrixKey->outPin[key_row] = Bit_RESET;
    
    // ���� ctrl_read_func ��������ȡ�������ŵ�״̬����������洢�� inPin ������
    matrixKey->ctrl_read_func(matrixKey->outPin,matrixKey->inPin);
    
    // ��鰴��ָ��λ�õ�������״̬�Ƿ�Ϊ�͵�ƽ��Bit_RESET��
    // ����ǵ͵�ƽ�����ʾ����λ�õİ���������
    return (matrixKey->inPin[key_col] == Bit_RESET);
}

/*
�������鿴ָ����ֵ�İ����Ƿ��¡�
�﷨��
    uint8_t is_pressed(matrixKey_t * matrixKey, uint8_t key_value);
������
    matrixKey��ָ��matrixKey_t�ṹ���ָ�룬���ڴ洢���󰴼�����Ϣ��
    key_value�������ļ�ֵ��
����ֵ��
    ���ָ����ֵ�İ������£�����1�����򷵻�0��
*/
uint8_t is_pressed(matrixKey_t * matrixKey,uint8_t key_value)
{
    uint8_t loopVariable;
    
    // ��� key_values_ptr �Ƿ�ΪNULL
    if(!matrixKey->key_values_ptr) return 0; // ����0��ʾ key_values_ptr ΪNULL
    
    // ���� key_values_ptr ���飬����������� key_value ��ƥ���ֵ
    for(loopVariable = 0; loopVariable < matrixKey->row_count * matrixKey->col_count; ++loopVariable)
    {
        if(matrixKey->key_values_ptr[loopVariable] == key_value)
        {
            // ����ҵ�ƥ���ֵ������� is_pressed_position �������ж϶�Ӧλ�õİ����Ƿ񱻰���
            return is_pressed_position(matrixKey,loopVariable%(matrixKey->row_count),loopVariable/(matrixKey->row_count));
        }
    }
    return 0; // ����0��ʾδ�ҵ�ƥ���ֵ���� key_values_ptr ΪNULL
}

/*
�������������а��µİ�����ֵ�б�
�﷨��
    uint8_t* get_pressed_keys(matrixKey_t * matrixKey, uint8_t * num_keys);
������
    matrixKey��ָ��matrixKey_t�ṹ���ָ�룬���ڴ洢���󰴼�����Ϣ��
    num_keys�����µİ���������
����ֵ��
    ���µİ�����ֵ�б��ָ�롣
*/
uint8_t* get_pressed_keys(matrixKey_t * matrixKey,uint8_t * num_keys)
{
    uint8_t loopVariable;
    uint8_t loopVariable_row;
    uint8_t loopVariable_col;
    uint8_t _num_keys = 0;
    
    // ���������ţ�����õͲ���ȡ��������״̬��ȷ�������µİ���
    for(loopVariable_col = 0; loopVariable_col < matrixKey->col_count; ++loopVariable_col)
    {
        // �� outPin ����������������øߣ�Bit_SET��
        for(loopVariable = 0; loopVariable < matrixKey->row_count; ++loopVariable)
        {
            matrixKey->outPin[loopVariable] = Bit_SET;
        }
        
        // ����ǰ�������õͣ�Bit_RESET��
        matrixKey->outPin[loopVariable_col] = Bit_RESET;
        
        // ���� ctrl_read_func ��������ȡ�������ŵ�״̬����������洢�� inPin ������
        matrixKey->ctrl_read_func(matrixKey->outPin,matrixKey->inPin);
        
        // ���������ţ�����Ƿ��а���������
        for(loopVariable_row = 0; loopVariable_row < matrixKey->row_count; ++loopVariable_row)
        {
            if(matrixKey->inPin[loopVariable_row] == Bit_RESET)
            {
                // �����⵽���������£��򽫸ð�����ֵ�洢�� keyValueTable ������
                matrixKey->keyValueTable[_num_keys++] = matrixKey->key_values_ptr[loopVariable_col * 4 + loopVariable_row];
            }
        }
    }
    
    // ����⵽�İ��������洢�� num_keys ������
    *num_keys = _num_keys;
    // ���� keyValueTable �����ָ��
    return matrixKey->keyValueTable;
}

/*
���������ص�ǰ���µİ�����ֵ��
�﷨��
    uint8_t get_current_key_value(matrixKey_t * matrixKey);
������
    matrixKey��ָ��matrixKey_t�ṹ���ָ�룬���ڴ洢���󰴼�����Ϣ��
����ֵ��
    ��ǰ���µİ�����ֵ(������ǰ���ȼ���)��
    
ʹ��ʾ��:������һЩʹ�ú������к�����ʾ�����롣
*/
uint8_t get_current_key_value(matrixKey_t * matrixKey)
{
    uint8_t num_keys;
    static uint8_t keyValueLog = 0;
    
    // ��ȡ��ǰ�����µİ���ֵ�����洢�� keyValueTable ������
    get_pressed_keys(matrixKey,&num_keys);
    if(num_keys)
    {
        // ����а���������
        if(keyValueLog != matrixKey->keyValueTable[0])
        {
            // �����ǰ������ֵ��֮ǰ��¼�İ���ֵ��ͬ
            keyValueLog = matrixKey->keyValueTable[0];
            return matrixKey->keyValueTable[0]; // ���ص�ǰ������ֵ
        }
        else
        {
            // �����ǰ������ֵ��֮ǰ��¼�İ���ֵ��ͬ
            return 0; // ����0��ʾ��ǰû���µİ���ֵ
        }
    }
    else
    {
        // ���û�а���������
        keyValueLog = 0;
        return 0; // ����0��ʾ��ǰû�а���������
    }
}
