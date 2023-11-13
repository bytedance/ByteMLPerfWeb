---
title: "Overview"
linkTitle: "Overview"
weight: 1
keywords: ["ASIC", "Python", "ByteMLPerf", "Architecture Design"]
description: "This doc covers architecture design, features and performance of ByteMLPerf"
---

## Project

Byte MLPerf is an AI Accelerator Benchmark that focuses on evaluating AI Accelerators from practical production perspective, including the ease of use and versatility of software and hardware. Byte MLPerf has the following characteristics:
1. Models and runtime environments are more closely aligned with practical business use cases.
2. For ASIC hardware evaluation, besides assessing performance and accuracy, it also examines indices like compiler usability and coverage.
3. Performance and accuracy results obtained from testing on the open Model Zoo serve as reference metrics for evaluating ASIC hardware integration.

## Architecture
<div align="center">
  <img src="/img/about/bytemlperf-framework.jpeg">
</div>

## Model Zoo List
Model Zoo&Dataset
The models supported by ByteMLPerf are collected under the Model Zoo. From the perspective of access rights, they are currently divided into internal models and open models. Released with ByteMLPerf is the open model included in the corresponding version.

Open model collection principles:
- Basic Model: including Resnet50, Bert and WnD;
- Popular Model：Includes models currently widely used in the industry;
- SOTA: including SOTA models corresponding to business domains;

In addition to the complete model structure, ByteMLPerf will also add some typical model substructure subgraphs or OPs (provided that the open model cannot find a suitable model containing such classic substructures), such as transformer encoder/decoder with different sequence lengths , all kinds of common conv ops, such as group conv, depwise-conv, point-wise conv, and rnn common structures, such as gru/lstm, etc.

| Model | Domain | Purpose | Framework | Dataset | Precision |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resnet50-v1.5 | cv | regular | tensorflow, pytorch | imagenet2012 | fp32 |
| bert-base | nlp | regular | tensorflow, pytorch | squad-1.1 | fp32 |
| wide&deep | rec | regular | tensorflow | criteo | fp32 |
| videobert | mm  |popular | onnx | cifar100 | fp32 |
| albert | nlp | popular | pytorch | squad-1.1 | fp32 |
| conformer | nlp | popular | onnx | none | fp32 |
| roformer | nlp | popular | tensorflow | cail2019 | fp32 |
| yolov5 | cv | popular | onnx | none | fp32 |
| roberta | nlp | popular | pytorch | squad-1.1 | fp32 |
| deberta | nlp | popular | pytorch | squad-1.1 | fp32 |
| swin-transformer | cv | popular | pytorch | imagenet2012 | fp32 |
| gpt2 | nlp | sota | pytorch | none | fp32 |
| stable diffusion | cv | sota | onnx | none | fp32 |
| LlaMa2 7B | nlp | sota | torch | none | fp16 |
| chatGLM2 6B | nlp | sota | torch | none | fp16 |

### ByteIR

The ByteIR Project is a ByteDance model compilation solution. ByteIR includes compiler, runtime, and frontends, and provides an end-to-end model compilation solution.

Although all ByteIR components (compiler/runtime/frontends) are together to provide an end-to-end solution, and all under the same umbrella of this repository, each component technically can perform independently.

For More Information, please refer to [ByteIR](https://github.com/bytedance/byteir)

Models Supported By ByteIR:
| Model | Domain | Purpose | Framework | Dataset | Precision |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resnet50-v1.5 | cv | regular | [mhlo](https://lf-bytemlperf.17mh.cn/obj/bytemlperf-zoo/resnet50_mhlo.tar) | imagenet2012 | fp32 |
| bert-base | nlp | regular | [mhlo](https://lf-bytemlperf.17mh.cn/obj/bytemlperf-zoo/bert_mhlo.tar) | squad-1.1 | fp32 |

## Vendor List
ByteMLPerf Vendor Backend List will be shown below

| Vendor |  SKU | Key Parameters | Supplement |
| :---- | :----| :---- | :---- |
| Intel | Xeon | - | - |
| Stream Computing | STC P920 | <li>Computation Power:128 TFLOPS@FP16 <li> Last Level Buffer: 8MB, 256GB/s <li>Level 1 Buffer: 1.25MB, 512GB/s   <li> Memory: 16GB, 119.4GB/S <li> Host Interface：PCIe 4, 16x, 32GB/s <li> TDP: 160W | [STC Introduction](https://github.com/bytedance/ByteMLPerf/blob/main/byte_mlperf/backends/STC/README.md) |
| Graphcore | Graphcore® C600 | <li>Compute: 280 TFLOPS@FP16, 560 TFLOPS@FP8 <li> In Processor Memory: 900 MB, 52 TB/s <li> Host Interface: Dual PCIe Gen4 8-lane interfaces, 32GB/s <li> TDP: 185W | [IPU Introduction](https://github.com/bytedance/ByteMLPerf/blob/main/byte_mlperf/backends/IPU/README.md) |
| Moffett-AI | Moffett-AI S30 | <li>Compute: 1440 (32x-Sparse) TFLOPS@BF16, 2880 (32x-Sparse) TOPS@INT8, <li> Memory: 60 GB,  <li> Host Interface: Dual PCIe Gen4 8-lane interfaces, 32GB/s <li> TDP: 250W                           | [SPU Introduction](https://github.com/bytedance/ByteMLPerf/blob/main/byte_mlperf/backends/SPU/README.md) |
