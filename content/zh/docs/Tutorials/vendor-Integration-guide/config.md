---
title: "配置信息说明"
date: 2023-08-22
weight: 2
keywords: ["配置信息说明"]
description: 介绍传入后端的配置信息。
---

传递给compile的配置包含三个部分，其在configs中的布局如下：
```json
configs = {
    "workload" : {...},
    "model_info" : {...},
    "interact_info" : {...},
}
```

## 任务信息:
我们从model_framework_precision.json获得的基本Config文件
```json
{
    "model": "bert-torch-fp32",   //待评估的模型名称，需要与model_zoo名称对齐
    "test_perf": true,            //是否评估模型性能
    "test_accuracy": true,        //是否评估模型精度
    "test_numeric": true,         //精度：是否评估数字误差
    "clients": 3,                 //性能：提交数据的客户端线程数
    "iterations": 100,            //性能：每个线程提交的迭代次数
    "batch_sizes":[1,4,16],       //性能：每个线程提交数据时的批处理大小
    "fake_data": false,           //性能：使用虚假数据提交数据
    "data_percent": 50,           //精度：用于评估精度的数据集的百分比，[1-100]
}
```

## 模型信息
关于模型本身的信息。示例如下：
```json
{
    "name": "bert-tf-fp16",                      //模型名称，通常与json文件保持一致
    "model_path": "model_zoo/bert/bert_fp16",    //模型在model_zoo中的相对路径
    "framework": "Tensorflow",                   //训练框架
    "framework_version": "2.4.0",                //训练框架的版本
    "model_format": "saved_model",               //模型格式
    "model_precision": "FP32",                   //模型精度
    "inputs": "input_ids:0",                     //模型输入
    "outputs": "logits:0",                       //模型输出
    "input_shape": {                             //输入形状
        "input_ids:0": [1, 384], 
    }, 
    "input_type": "FLOAT32",                     //输入类型
    "dataset_name": "squad",                     //数据集名称
    "max_batch_size": 64                         //最大批处理大小
}
```

## 交互信息
供应商希望收集的信息。示例如下：
```json
{
    "max_seq_len": 512,
    "try_dfs": true,
    "internal_quant_bits_int16": 12
}
```

交互配置信息如下
```json
{
    "name": "max_seq_len",
    "note" : "模型Padding后的最长序列长度？",
    "dialog_type": "Input Dialog",
    "type": "int",
    "depends": "is_bert",
},
{
    "name": "try_dfs",
    "note": "是否存在多分支共享输入的Layer？",
    "dialog_type": "Yes/No Dialog",
    "type": "bool",
    "depends": null,
},
{
    "name" : "internal_quant_bits_int16",
    "note" : "int16时内部量化的位数，可以是12，13或14",
    "dialog_type": "Radiolist Dialog",
    "type" : "int",
    "default": "12",
    "options":["12", "13", "14"],
    "depends" : "accuracy_mode"
}
```