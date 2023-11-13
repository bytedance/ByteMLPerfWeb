---
title: "Vendor Integration Test"
date: 2023-08-22
weight: 4
keywords: ["test"]
description: How to test in vendor side.
---

Vendors can run the following code to test their own backend after completing Backend access, where xxx is the newly added backend name. For details, refer to Naming Specification.

```bash
pip install -r requirements.txt
./run.sh --task resnet50-torch-fp32 --hardware_type xxx
```