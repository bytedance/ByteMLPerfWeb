---
title: "后端开发"
date: 2023-08-22
weight: 1
keywords: ["keywords"]
description: 在ByteMLPerf的系统架构设计中，框架和后端是隔离的，供应商可以自行实现后端，并作为ByteMLPerf的后端参与评估测试。
---

## 创建后端

- 在backends/文件夹下创建一个以后端名称命名的新文件夹。所有所需的文件都需要存储在此目录中，例如GRAPHCORE后端，其目录名称为GRAPHCORE（有关具体命名规则，请参阅下面的命名规则）。

- 添加compile_backend_xxx.py/runtime_backend_xxx.py，其中xxx是后端名称，例如GRAPHCORE后端。您需要创建一个名为compile_backend_graphcore.py的入口文件，该文件需要内部继承CompileBackend类；

- 添加xxx.json，用于与用户互动。如果不需要与用户互动，您可以直接在backend_xxx.py的get_interact_profile处提供一个空文件并直接返回None；

- 添加requirements.txt，用于所需的环境依赖项，框架会为每个后端创建一个新的venv，并为其安装在requirements中声明的pkg；


我们使用Graphcore作为例子。后端应该包含以下文件：

```bash
byte_mlperf/backends/GRAPHCORE/
├── compile_backend_graphcore.py
├── runtime_backend_graphcore.py
├── GRAPHCORE.json
└── requirements.txt
```

## 实现 CompileBackend API

关于CompileBackend基类，请参考下面的Compile Backend部分。

在当前版本中，需要实现的APIs如下：
- **pre_optimize()**
模型预优化接口。在编译前预先优化模型，如模型排序、Input Shape等。允许更改模型结构，但后端需要在格式更改后保存模型，以确保仍然可以加载和运行原始模型。
如果不需要，此接口可以不实现。

- **compile()**
模型编译接口。对于需要进行编译的供应商，可以在此执行模型转换和编译。这里可以更改模型格式，并且编译后的产品可以由运行时后端加载和运行，或者可以由QS Runtime加载和运行。
此外，除了返回编译后的产品外，compile还需要返回编译后的编译精度、子图分割信息以及模型IO信息（如果不是全图编译且运行时支持异构操作）。

```python
result = {
    "model": "ResNet50",
    "framework": "Tensorflow",
    "compile_precision": "int16_mix",
    "optimizations": {},
    "instance_count": 1, // The number of total machines was used
    "device_count": 128, // The number of total cards was used
    "input_type": ["INT16"], //List of String, Upper case only
    "max_batch_size": 64, //Max Batch Size allowed to use
    "compile_status": "success", //Only if all subgraph was compiled successfully
    "sg_percent": 100,
    "segments": [{
        "sg_idx": 0,
        "is_fallback" : false,
        "input_tensor_map" : {"input:0":[-1,3,255,255]},
        "output_tensor_map" : {"pred:0":[-1,1024]},
        "compiled_model" : [{
            "compiled_bs" : 1,         
            "compiled_obj" : "xxx.obj",
        },],
    },]
}
```

如上例所示，如果编译时生成了多个子图，需要返回多个段；如果编译了多个批处理大小，需要在compiled_model中列出所有批处理大小。

需要注意的是，is_fallback字段表示当前子图是否会回退到CPU上运行。如果为true，通常意味着当前子图没有放置在加速卡上，而是回退到CPU上执行。

注意：如果需要在compile()中使用数据加载器，可以参考上面的ModelZoo＆Dataset部分。

- **get_interact_profile()**
加载交互式配置接口。如果供应商需要用户提供一些额外的信息，例如编译配置，精度配置，您可以在此处加载添加的json文件，并返回一个字典列表。Framework会向用户显示配置文件的内容，并负责收集有关配置文件的反馈。如果用户不需要提供额外的信息，则此处返回None。

```json
[
    {
        "name": "omp",
        "note": "Using OMP？",
        "dialog_type": "Yes/No Dialog",
        "type": "bool",
        "default": false,
        "depends": null
    },
    {
        "name": "precision",
        "note": "Precision to compile the model (Example Only)",
        "dialog_type": "Radiolist Dialog",
        "options": ["FP8", "FP16"],
        "type": "str",
        "default": "FP16",
        "depends": null
    },
    {
        "name": "batch",
        "note": "Batch Size",
        "dialog_type": "Input Dialog",
        "type": "str",
        "default": "4",
        "depends": null
    }
]
```

get_interact_profile可以获取任务Config信息和模型信息，供应商还可以在此API下生成json之外的一些选项。

- **get_best_batch_size()**
选择具有最佳批处理大小配置的接口。对于某些加速卡，可能有最佳的批处理大小使用。此接口可用于对模型进行初步分析并返回一个最佳bs列表。框架将评估此接口返回的列表。

## 实现 RuntimeBackend API
在当前版本中，需要实现的APIs如下：
```python
class RuntimeBackend(object):
    def __init__(self):
        self.hardware_type = 'UnKnown'
        self.need_reload = False
        self.need_quant = False

    def version(self) -> str:
        """
        Return runtime backend version details
        """
        raise NotImplementedError("RuntimeBackend:version")

    def load(self, batch_size) -> str:
        """
        Return runtime backend version details
        """
        raise NotImplementedError("RuntimeBackend:load")

    def get_loaded_batch_size(self) -> int:
        """
        Get Currect batch size
        """
        raise NotImplementedError("RuntimeBackend:get_loaded_batch_size")

    def predict(self, data):
        """
        Run the compiled model and return the model output corresponding to the data.
        """
        raise NotImplementedError("RuntimeBackend:predict")

    def is_qs_mode_supported(self) -> bool:
        """
        Used to check whether QSv2 Runtime is enabled
        """
        return False

    def generate_qs_config(self) -> Dict[str, Any]:
        """
        Used only when is_qs_ported return True. Generate QS Config
        File for QSv2 Runtime
        """
        return None

    def benchmark(self, dataloader):
        """
        Performance Testing when qs mode is not enabled.
        """
        raise NotImplementedError("RuntimeBackend:benchmark")
```

- **load()**
加载对应Batch Size的模型。编译结果框架将传递给运行时后端，确保输入bs与compile返回的后端匹配。

- **predict()**
为单个预测调用编译后的产品。

- **is_qs_mode_supported()**
是否已连接到qs，如果已连接，则可以通过qs执行性能测试。

- **generate_qs_config()**
如果已支持qs，框架将调用此接口生成相应的qs配置。

- **benchmark()**
在QuickSilver准备好之前，框架用于调用此接口，并将基准传递给Runtime后端，运行时后端在接口中加载编译后的产品进行性能测试。
需要返回一个字典，其中可以包含如BS、QPS、AVG Latency、P99 Latency等信息，如下所示。
```python
"Performance": 
[
  {
      "BS": 1,
      "QPS": 2,
      "AVG_Latency": 1.2,
      "P99_Latency": 15,
  },
  {
      "BS": 1,
      "QPS": 2,
      "AVG_Latency": 1.2,
      "P99_Latency": 15,
  },
],
```