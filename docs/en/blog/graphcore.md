---
title: "Graphcore now supports ByteMLPerf, providing performance benchmark references for AI production deployment"
date: 2023-08-04
weight: 2
keywords: ["ByteMLPerf", "GraphCore", "C600"]
---
# Graphcore now supports ByteMLPerf, providing performance benchmark references for AI production deployment

Date: 2023-08-04

Translate From: https://www.graphcore.cn/graphcore-now-supports-byte-mlperf/

From proof of concept and pilot projects to scaled production, Graphcore aims to provide efficient AI computation for innovators at every stage of their AI journey. As AI deployment increasingly comes into focus and the work in AI shifts toward practical implementation, we are closer than ever to realizing AI's potential in daily life.

ByteMLPerf (Inference) is an open-source AI accelerator benchmark suite released by ByteDance, designed to measure the speed at which inference systems run models in various deployment scenarios. As a popular evaluation platform, Byte MLPerf provides business decision-makers with valuable references for hardware selection. Compared to MLPerf, Byte MLPerf's models and runtime environments are closer to real-world business use cases.

Today, we are excited to announce that Graphcore is now one of the earliest hardware vendors to support Byte MLPerf (Inference).

### ByteMLPerf (Inference) Benchmark Suite

The ByteMLPerf (Inference) benchmark suite primarily evaluates AI accelerators from a practical production standpoint, considering the ease of use and versatility of both software and hardware.

For ASIC hardware, in addition to evaluating performance and accuracy, Byte MLPerf also assesses the ease of use in graph compilation, coverage metrics, and more. Byte MLPerf also uses the performance and accuracy metrics obtained from open model libraries as references for introducing ASIC hardware.

### Expanding Model Support
As one of the earliest hardware vendors to support Byte MLPerf, Graphcore now supports most of the models in the Byte MLPerf model library, spanning multiple domains including natural language processing, speech, computer vision, recommendation systems, and multimodal applications. These can be employed in various scenarios like search, voice recognition, recommendations, content detection, and AI generation.

Moving forward, Graphcore will expand IPU support for Byte MLPerf to include even more model categories.

### From Experimentation to Production: Driving Momentum
Graphcore's support for Byte MLPerf is built on our recently launched high-end inference and training accelerator card, the C600.

The C600 excels in inference and is also capable of training, supporting a wide range of mainstream AI applications. It provides low latency and high throughput without sacrificing accuracy, helping developers to overcome the challenge of balancing speed and precision. Built upon Graphcore's classic Wafer-on-Wafer MK2 IPU architecture, the C600 introduces FP8 for low and mixed-precision AI, equipping it with a powerful computational engine.

As an ideal choice for AI inference deployment, the C600 meets various needs for rapid prototyping and speed throughout the entire development process, while significantly lowering the Total Cost of Ownership (TCO). Offering robust computational power, ease of use, and flexibility, the C600 also achieves low latency and low power consumption, cutting operational costs for data center operators.

The C600 was a highlight at the recent 2023 World Artificial Intelligence Conference and was also shortlisted for the 2023 SAIL Top 30 Awards.

### Easy Integration, Flexible Optimization

Built upon the C600, Graphcore's support for Byte MLPerf also leverages PopRT.

PopRT is a high-performance inference SDK released alongside the C600, helping developers to deploy trained models with zero-code inference, while offering low latency and high throughput. PopRT deeply compiles and optimizes exported models for inference, generating executable PopEF programs that can run on IPUs, and provides a flexible runtime to support low-latency, high-throughput inference.

Graphcore remains committed to lowering the barriers to IPU usage and supports a wide range of mainstream machine learning frameworks, enabling developers to work in an environment they are familiar with and focus on innovation.

PopRT offers easy-to-integrate Python and C++ APIs. Byte MLPerf models are optimized, compiled, and run on IPUs through the PopRT Python API.

If you would like to obtain performance data for Byte MLPerf models running on the C600, you can use container images provided by Graphcore. For replication methods, please refer to our tutorials.

You can also apply to test the C600.