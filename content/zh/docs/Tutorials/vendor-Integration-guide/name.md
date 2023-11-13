---
title: "命名原则"
date: 2023-08-22
weight: 3
keywords: ["keywords"]
description: 从用户的使用方法开始，解释命名原则。
---

```bash
python3 lanuch.py --task xxx --hardware_type xxx
```

## Workload命名原则

```--task```
工作负载描述文件由参数 ``--task`` 指示，并且该参数是工作负载描述文件的前缀。例如，要评估 ``bert-tf-fp32.json``，参数应为 ``--task bert-tf-fp32``。

## 后端命名原则
```--hardware_type```
1. 新文件夹将以 ``--hardware_type`` 参数命名。命名规则为大写，例如，GRAPHCORE。
2. 在这个新文件夹中，应添加一个后端入口文件：``runtime_backend_xxx.py/compile_backend_xxx.py``。注意，这里的命名是小写的。例如，对于GRAPHCORE，名称将是：``runtime_backend_graphcore.py/compile_backend_graphcore.py``。
3. 在后端入口文件中，后端的主类名称应该遵循：``CompileBackendXXX()``, 例如，对于GRAPHCORE，名称应该是： ``RuntimeBackendGRAPHCORE/CompileBackendGRAPHCORE``；

## 模型配置命名原则

```workload：model```
任何新添加的模型描述文件都应与工作负载描述文件中的模型字段一致。例如，对于在 ``bert-torch-fp32.json`` 工作负载中定义的模型，相应的模型描述文件是：``model_zoo/bert-torch-fp32.json``。具体细节可以根据字段要求进行调整。

```json
{
    "model": "bert-torch-fp32",    // 要评估的模型名称，必须与 model_zoo 名称匹配
    "test_perf": true,             // 是否应评估模型性能
    "test_accuracy": true,         // 是否应评估模型准确性
    "test_numeric": true,          // 是否应评估数值误差
    "clients": 3,                  // 将提交数据的客户端线程的数量
    "iterations": 100,             // 指定每个线程提交的迭代次数
    "batchsizes":[1,4,8,16,32,64], // 性能：每个线程提交数据时的批处理大小
    "data_percent": 50,            // 准确性：用于评估准确性的数据集的百分比，范围[1-100]
    "compile_only":false           // 是否只编译模型
}

```

## 数据集命名原则

```model_info: dataset_name```
如下所示的 model_info 内容中，“dataset_name”: "squad"，squad 是 datasets 文件夹下的文件夹名称。因此，数据集的名称需要与模型信息的描述保持一致。

```json
{
    "name": "bert-tf-fp16",                    // 模型名称，通常与json文件一致
    "model_path": "model_zoo/bert/bert_fp16",  // 与model_zoo相对的模型路径
    "framework": "Tensorflow",                 // 训练框架
    "framework_version": "2.4.0",              // 训练框架版本
    "model_format": "saved_model",             // 模型格式
    "model_precision": "FP32",                 // 模型精度
    "inputs": "input_ids:0,",                  // 模型输入名称
    "outputs": "logits:0",                     // 模型输出名称
    "input_shape": {                           // 输入形状
        "input_ids:0": [1, 384], 
    },  
    "input_type": "FLOAT32",                   // 数据数据类型
    "dataset_name": "squad",                   // 指定的数据集，应与数据集命名保持一致
    "max_batch_size": 64,                      // 模型的最大批次大小  
}
```