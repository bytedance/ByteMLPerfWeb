---
title: "厂商接入测试"
date: 2023-08-22
weight: 4
keywords: ["test"]
description: 厂商如何进行测试.
---

供应商在完成后端接入后，可以运行以下代码来测试他们自己的后端，其中xxx是新添加的后端名称。详情请参考命名规范。

```bash
pip install -r requirements.txt
./run.sh --task resnet50-torch-fp32 --hardware_type xxx
```