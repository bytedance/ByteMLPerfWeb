---
title: "Naming Conventions"
date: 2023-08-22
weight: 3
keywords: ["keywords"]
description: Starting from the user's usage method, explain the naming convention.
---

```bash
python3 lanuch.py --task xxx --hardware_type xxx
```

## Workload naming Convention

```--task```
The workload description file is the parameter specified by --task, and the parameter is the prefix of the workload description file. For example, to evaluate bert-tf-fp32.json, the parameter is task bert-tf-fp32.


## Backend naming convention
```--hardware_type```
1. The new folder is named ```--hardware_type``` parameter, naming convention: uppercase, such as GRAPHCORE;
2. Under the new folder, add a backend entry file, runtime_backend_xxx.py/compile_backend_xxx.py, which is lowercase at this time: for example, GRAPHCORE, the name is: runtime_backend_graphcore.py/compile_backend_graphcore.py;
3. In the backend entry file, the backend main class name must comply with: CompileBackendXXX(), such as GRAPHCORE, the name is: RuntimeBackendGRAPHCORE/CompileBackendGRAPHCORE；

## Model naming convention

```workload：model```
The newly added model description file needs to be consistent with the model field in the workload description file. For example, for the model defined by the bert-torch-fp32.json workload, the corresponding model description file is: model_zoo/bert-torch-fp32.json. The specific details can be adjusted according to the needs of the field.

```json
{
    "model": "bert-torch-fp32",   // Name of the model to be evaluated, needs to align with the model_zoo name
    "test_perf": true,            // Whether to evaluate model performance
    "test_accuracy": true,        // Whether to evaluate model accuracy
    "test_numeric": true,         // Accuracy: Whether to evaluate numerical errors
    "clients": 3,                 // Performance: Number of client threads submitting data
    "iterations": 100,            // Performance: How many iterations each thread submits
    "batchsizes":[1,4,8,16,32,64],// Performance: Batch size when each thread submits data
    "data_percent": 50,           // Accuracy: Percentage of dataset used to evaluate accuracy, [1-100]
    "compile_only":false          // Whether to only compile the model
}

```

## Dataset naming convention

```model_info: dataset_name```
As shown in the following model_info content, "dataset_name": "squad", squad is the name of the folder under datasets. Therefore, the name of the dataset needs to be aligned with the description of the model info

```json
{
    "name": "bert-tf-fp16",                    // Model name, usually consistent with the json file
    "model_path": "model_zoo/bert/bert_fp16",  // Model path relative to model_zoo
    "framework": "Tensorflow",                 // Training framework
    "framework_version": "2.4.0",              // Training framework version
    "model_format": "saved_model",             // Model format
    "model_precision": "FP32",                 // Model precision
    "inputs": "input_ids:0,input_mask:0,segment_ids:0",  // Model Inputs Name
    "outputs": "logits:0",                     // Model Outputs Name
    "input_shape": {                           // Input shape
        "input_ids:0": [1, 384], 
        "input_mask:0": [1, 384], 
        "segment_ids:0": [1, 384]
    },  
    "input_type": "FLOAT32",                   // Data data type
    "dataset_name": "squad",                   // Designated dataset, should align with dataset naming
    "max_batch_size": 64,                      // Maximum batch size for the model  
}
```