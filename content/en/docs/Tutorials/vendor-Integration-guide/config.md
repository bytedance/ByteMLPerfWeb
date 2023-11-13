---
title: "Config"
date: 2023-08-22
weight: 2
keywords: ["config"]
description: The config passed to compile backend.
---

The config passed to compile contains three parts, and the layout in configs is as follows:
```json
configs = {
    "workload" : {...},
    "model_info" : {...},
    "interact_info" : {...},
}
```

## Workload:
Basic workload we got from model_framework_precision.json
```json
{
    "model": "bert-torch-fp32",   //The name of the model to be evaluated, which needs to be aligned with the model_zoo name
    "test_perf": true,            //Whether to evaluate model performance
    "test_accuracy": true,        //Whether to evaluate model accuracy
    "test_numeric": true,         //precision: whether to evaluate numerical error
    "clients": 3,                 //Performance: client threads that submit data
    "iterations": 100,            //Performance: how many iterations are submitted by each thread
    "batch_sizes":[1,4,16],       //Performance: bs when each thread submits data
    "fake_data": false,           //Performance: Submit data using fake data
    "data_percent": 50,           //Accuracy: What percentage of the data set is used to evaluate the accuracy, [1-100]
}
```

## Model Info
Information about the model itself. Examples are as follows:
```json
{
    "name": "bert-tf-fp16",        //Model name, generally consistent with the json file
    "model_path": "model_zoo/bert/bert_fp16",    //Model relative model_zoo path
    "framework": "Tensorflow",     //training framework
    "framework_version": "2.4.0",       //Training framework version
    "model_format": "saved_model", 
    "model_precision": "FP32",     
    "inputs": "input_ids:0,input_mask:0,segment_ids:0", 
    "outputs": "logits:0",  
    "input_shape": {"input_ids:0": [1, 384], "input_mask:0": [1, 384], "segment_ids:0": [1, 384]}, 
    "input_type": "FLOAT32",    
    "dataset_name": "squad",   
    "max_batch_size": 64,  
}
```

## Interact Info
The information that the vendor wants to collect. Examples are as follows:
```json
{
    "max_seq_len": 512,
    "try_dfs": true,
    "internal_quant_bits_int16": 12
}
```

When you use this file as interact file
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