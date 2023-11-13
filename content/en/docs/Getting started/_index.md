---
title: "Getting Started"
linkTitle: "Getting Started"
weight: 2
keywords: ["ByteMLPerf", "Python", "Getting Started", "Guidelines"]
description: "This document covers the preparation of the development environment, quick start and basic tutorials of ByteMLPerf."
---

## Quick Start

This chapter will get you started with ByteMLPerf using a simple executable example.

### Usage
The user uses launch.py as the entry point. When using byte mlperf to evaluate the model, you only need to pass in two parameters ``--task`` and ``--hardware_type``, as shown below:
```bash
python3 launch.py --task xxx --hardware_type xxx
```

1. **``--task``**: parameter is the name of the incoming workload. You need to specify the workload. For example, if you would like to evaluate the workload: ``bert-tf-fp16.json``, you need to specify ``--task bert-tf-fp16``.
Note: All workloads are defined under ``byte_mlperf/workloads``, and the name needs to be aligned with the file name when passing parameters. The current format is model-framework-precision.

2. **``--hardware_type``**: parameter is the incoming hardware_type name, there is no default value, it must be specified by the user. Example: To evaluate Habana Goya, specify --hardware_type GOYA .
Note: All hardware types are defined under byte_mlperf/backends, and the name needs to be aligned with the folder name when passing parameters.

3. **``--compile_only``**: parameter will make task stoped once compilation is finished

4. **``--show_task_list``**: parameter will print all task name

5. **``--show_hardware_list``**: parameter will print all hardware backend

### Workload Description
A workload definition needs to contain the following fields:
```javascript
{
    "model": "bert-torch-fp32",   //The name of the model to be evaluated, which needs to be aligned with the model_zoo name
    "test_perf": true,            //Evaluate model performance
    "test_accuracy": true,        //Evaluate model accuracy
    "test_numeric": true,         //Accuracy：Evaluate model numeric
    "clients": 3,                 //Performance：Client threads that submit data
    "iterations": 100,            //Performance：How many iterations are submitted by each thread
    "batch_sizes":[1,4,8,16,32],  //Performance：The batch size when each thread submits data
    "data_percent": 50,           //Accuracy：Ratio of data to assess accuracy, [1-100]
    "compile_only": false,           //Compile the model only
}
```