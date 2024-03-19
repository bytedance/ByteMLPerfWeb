---
title: "GRAPHCORE支持BYTE MLPERF，为AI生产部署提供性能基准参考"
date: 2023-08-04
weight: 2
keywords: ["ByteMLPerf", "GraphCore", "C600"]
description: "Graphcore现已支持Byte MLPerf（推理），成为最早支持该基准套件的硬件厂商之一"
---
# GRAPHCORE支持BYTE MLPERF，为AI生产部署提供性能基准参考

日期: 2023-08-04

原文地址： https://www.graphcore.cn/graphcore-now-supports-byte-mlperf/

从概念验证和试点项目到规模化生产，Graphcore（拟未）在AI旅程的每个阶段为创新者提供高效AI计算。在AI到现实生活的距离从未如此之近的今天，AI部署吸引了众多目光，AI工作的重心向落地转移。

Byte MLPerf（推理）是字节跳动开源的AI加速器基准套件，用于测量推理系统在各种部署场景中运行模型的速度。作为广受欢迎的评估平台，Byte MLPerf为商业公司的决策者提供了硬件选择上的参考和依据。相比MLPerf，Byte MLPerf的模型和运行环境会更贴近真实业务。

今天，我们很高兴地宣布，Graphcore现已支持Byte MLPerf（推理），成为最早支持该基准套件的硬件厂商之一。

### Byte MLPerf（推理）基准套件

Byte MLPerf（推理）基准套件主要从实际生产角度对人工智能加速器进行评估，包括软件和硬件的易用性以及通用性。

对于新硬件，Byte MLPerf除了评估性能和精度之外，也会同时评估图编译的易用性、覆盖率等指标，Byte MLPerf还会将在开放模型库上测试所得的性能和精度作为新硬件引入评估的参考。

### 不断扩展的模型支持
作为最早支持Byte MLPerf的硬件厂商之一，Graphcore现已支持Byte MLPerf 模型库中的大部分模型，涵盖自然语言处理、语音、计算机视觉、推荐、多模态等多个领域，可以用于搜索、语音识别、推荐、内容检测、人工智能生成等多个场景。

在未来，Graphcore会将IPU对Byte MLPerf的支持扩展到更多模型类别中。

### 从试验到投产，加速“推”动
Graphcore对于Byte MLPerf的支持建立在我们最新推出的高端推训一体加速卡C600之上。

C600主打推理，兼做训练，可以支持各种主流的AI应用。它在提供低延时、高吞吐量的同时不损失精度，帮助AI开发人员解决“精度与速度难两全”的痛点。在Graphcore经典的Wafer-on-Wafer MK2 IPU的基础上，C600增加了用于低精度和混合精度AI的FP8，为C600带来强大的算力引擎。

作为AI应用推理部署的理想选择，C600可满足用户从试验到投产整个过程中对快速跟踪IPU原型和速度的各种要求，同时大幅降低TCO（总体拥有成本）。在提供强大的算力、易用性和灵活性的同时，C600还实现了低时延和低功耗，在运行典型工作负载时的散热设计功耗仅为185瓦，可为运维人员大大减少数据中心运营开支。

在刚刚过去的2023世界人工智能大会中，C600入选大会“镇馆之宝”，并入围2023 SAIL奖TOP30榜单。

### 轻松集成，灵活优化

在C600的基础上，Graphcore对Byte MLPerf的支持还使用了PopRT。

PopRT是Graphcore搭配C600推出的高性能推理SDK，可以帮助开发者实现零代码推理部署已经训练好的模型，同时带来低时延和高吞吐量，克服AI应用部署的时延痛点。

PopRT可以把训练完导出的模型针对推理进行深度编译优化，生成能在IPU上运行的可执行程序PopEF，并提供灵活的运行时，使其能够支持对PopEF进行低延时、高吞吐的推理。

Graphcore始终坚持降低IPU的使用门槛，广泛支持各类主流的机器学习框架，让开发者能够在自己熟悉的环境中工作，专注创新。

PopRT提供了易于集成的Python和C++ API。Byte MLPerf模型在IPU上的运行就是通过PopRT Python API进行的模型优化、编译和运行。

若您想要获取Byte MLPerf中模型在C600上的性能数据，可以利用Graphcore提供的容器镜像，复现方法请参阅我们的教程。

您也可以申请试用C600进行测试。