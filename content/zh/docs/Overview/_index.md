---
title: "概览"
linkTitle: "概览"
weight: 1
keywords: ["新硬件","架构设计"]
description: "架构设计、框架特点、框架性能。"
---

## 项目

ByteMLPerf是一个AI加速器基准测试工具，专注于从实际生产的角度评估AI加速器，包括软件和硬件的易用性及多功能性。ByteMLPerf具有以下特点：
1. 模型和运行时环境与实际业务用例更紧密地对齐。
2. 对于ASIC硬件评估，除了评估性能和准确性外，它还检查像编译器的易用性和覆盖率这样的指标。对于ASIC硬件评估，除了评估性能和准确性外，它还检查像编译器的易用性和覆盖率这样的指标。
3. 在开放的Model Zoo上进行的测试所得到的性能和准确性结果作为评估ASIC硬件集成的参考指标。

## 整体结构
<div align="center">
  <img src="/img/about/bytemlperf-framework.jpeg">
</div>

## 模型库列表
Model Zoo&Dataset
ByteMLPerf支持的模型都收集在模型库(Model Zoo)中。从访问权限的角度看，它们目前分为内部模型和公开模型。与ByteMLPerf一起发布的是相应版本中包含的公开模型。

公开模型的收集原则：
- 基本模型：包括Resnet50、Bert和WnD；
- 流行模型：包括目前在行业中广泛使用的模型；
- SOTA: 包括与业务领域对应的SOTA模型；

除完整模型结构外，ByteMLPerf还将添加一些典型的模型子结构子图或OPs（前提是公开模型中找不到包含此类经典子结构的合适模型），例如具有不同序列长度的transformer编码器/解码器，各种常见的卷积操作，如组卷积、深度卷积、点对点卷积，以及常见的rnn结构，如gru/lstm等。

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

ByteIR项目是字节跳动的模型编译解决方案。ByteIR包括编译器、运行时和前端，并提供端到端的模型编译解决方案。 尽管所有的ByteIR组件（编译器/runtime/前端）一起提供端到端的解决方案，并且都在同一个代码库下，但每个组件在技术上都可以独立运行。

更多信息请查看[ByteIR](https://github.com/bytedance/byteir)

ByteIR 编译支持的模型列表:
| Model | Domain | Purpose | Framework | Dataset | Precision |
| ---- | ---- | ---- | ---- | ---- | ---- |
| resnet50-v1.5 | cv | regular | [mhlo](https://lf-bytemlperf.17mh.cn/obj/bytemlperf-zoo/resnet50_mhlo.tar) | imagenet2012 | fp32 |
| bert-base | nlp | regular | [mhlo](https://lf-bytemlperf.17mh.cn/obj/bytemlperf-zoo/bert_mhlo.tar) | squad-1.1 | fp32 |

## 支持的厂商列表
ByteMLPerf目前支持的厂商后端列表如下所示：

| Vendor |  SKU | Key Parameters | Supplement |
| :---- | :----| :---- | :---- |
| Intel | Xeon | - | - |
| Stream Computing | STC P920 | <li>Computation Power:128 TFLOPS@FP16 <li> Last Level Buffer: 8MB, 256GB/s <li>Level 1 Buffer: 1.25MB, 512GB/s   <li> Memory: 16GB, 119.4GB/S <li> Host Interface：PCIe 4, 16x, 32GB/s <li> TDP: 160W | [STC Introduction](https://github.com/bytedance/ByteMLPerf/blob/main/byte_mlperf/backends/STC/README.md) |
| Graphcore | Graphcore® C600 | <li>Compute: 280 TFLOPS@FP16, 560 TFLOPS@FP8 <li> In Processor Memory: 900 MB, 52 TB/s <li> Host Interface: Dual PCIe Gen4 8-lane interfaces, 32GB/s <li> TDP: 185W | [IPU Introduction](https://github.com/bytedance/ByteMLPerf/blob/main/byte_mlperf/backends/IPU/README.md) |
| Moffett-AI | Moffett-AI S30 | <li>Compute: 1440 (32x-Sparse) TFLOPS@BF16, 2880 (32x-Sparse) TOPS@INT8, <li> Memory: 60 GB,  <li> Host Interface: Dual PCIe Gen4 8-lane interfaces, 32GB/s <li> TDP: 250W                           | [SPU Introduction](https://github.com/bytedance/ByteMLPerf/blob/main/byte_mlperf/backends/SPU/README.md) |

