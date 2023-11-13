---
title: "快速开始"
linkTitle: "快速开始"
weight: 2
keywords: ["ByteMLPerf", "Python", "快速上手", "基础教程"]
description: "开发环境准备、快速上手与基础教程。"
---

## 快速上手

本章节将通过一个简单的可执行示例帮助你快速上手 

### 使用方法
用户使用launch.py作为入口脚本。当使用byte mlperf评估模型时，您只需要传入两个参数：``--task`` 和 ``--hardware_type``，如下所示:
```bash
python3 launch.py --task xxx --hardware_type xxx
```

1. **``--task``**: 此参数是传入的任务名称。您需要指定任务。例如，如果您想评估任务: ``bert-tf-fp16.json``，您需要指定 ``--task bert-tf-fp16``。
注意：所有的任务配置都定义在``byte_mlperf/workloads``下，传递参数时名称需要与文件名对齐。当前的格式是模型-框架-精度。

2. **``--hardware_type``**: 此参数是传入的硬件类型名称，没有默认值，用户必须指定。例如：要评估Habana Goya，请指定 ``--hardware_type GOYA``。
注意：所有的硬件类型都定义在``byte_mlperf/backends``下，并且传递参数时名称需要与文件夹名称对齐。

3. **``--compile_only``**: 此参数将在任务编译完成后停止。

4. **``--show_task_list``**: 此参数将打印所有任务列表。

5. **``--show_hardware_list``**: 此参数将打印所有支持的硬件列表。


### 任务Config配置
定义和一个任务的Config文件需要包含以下字段:
```javascript
{
    "model": "bert-torch-fp32",   //需要评估的模型名称，需要与model_zoo名称对齐
    "test_perf": true,            //评估模型性能
    "test_accuracy": true,        //评估模型准确度
    "test_numeric": true,         //准确度：评估模型数字
    "clients": 3,                 //性能：提交数据的客户端线程
    "iterations": 100,            //性能：每个线程提交的迭代次数
    "batch_sizes":[1,4,8,16,32],  //性能：每个线程提交数据时的批次大小
    "data_percent": 50,           //准确度：评估准确度的数据比例，[1-100]
    "compile_only": false,        //仅编译模型
}
```

