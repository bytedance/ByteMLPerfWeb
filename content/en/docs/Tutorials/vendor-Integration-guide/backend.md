---
title: "Backend"
date: 2023-08-22
weight: 1
keywords: ["keywords"]
description: In ByteMLPerf system architecture design, the framework and Backend are isolated, and vendors can implement Backend by themselves and participate in the evaluation test as the ByteMLPerf backend.
---

## Create Backend

- Create a new folder named after the backend name under the backends/ folder. All the required dependencies need to be stored in this directory, such as GRAPHCORE backend, and the directory name is GRAPHCORE (for specific naming rules, refer to the naming rules below;

- Add compile_backend_xxx.py/runtime_backend_xxx.py, where xxx is the backend name, such as GRAPHCORE backend. You need to create an entry file named compile_backend_graphcore.py, which needs to inherit the class CompileBackend internally;

- Add xxx.json, which is used to interact with the user. If there is no need to interact with the user, you can provide an empty file and return None directly at get_interact_profile in backend_xxx.py;

- Add requirements.txt, for the required environment dependencies, the framework will create a new venv for each backend, and install the pkg declared in the requirements for it;


We use Graphcore as an example. The backend should contain the following files：

```bash
byte_mlperf/backends/GRAPHCORE/
├── compile_backend_graphcore.py
├── runtime_backend_graphcore.py
├── GRAPHCORE.json
└── requirements.txt
```

## Implement CompileBackend API

For the CompileBackend base class, refer to the Compile Backend section above.

In the current version, the APIs that need to be implemented are as follows:
- **pre_optimize()**
Model pre-optimization interface. Pre-optimize the model before compiling, such as model sorting, shape fix, etc. It is allowed to change the model structure, but the Backend needs to cache the model after the format change to ensure that the original model can still be loaded and run.
If not required, this interface may not be implemented.

- **compile()**
Model compilation interface. For Vendor that needs to be compiled, model conversion and compilation can be performed here. The model format can be changed here, and the compiled product can be loaded and run by the runtime backend, or it can be loaded and run by QS Runtime.
In addition, in addition to returning the compiled product, compile also needs to return compile also needs to return the compilation accuracy, sub-graph segmentation information, and model IO information after compilation (if not full-image compilation and runtime supports heterogeneous operation);

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

As shown in the above example, if multiple subgraphs are generated by compilation, multiple segments need to be returned; if multiple batch sizes are compiled, all of them need to be listed in compiled_model.

It should be noted that the is_fallback field indicates whether the current subgraph will fallback to run on the CPU. If it is true, it usually means that the current subgraph is not placed on the accelerator card, but fallsback to the CPU for execution.
Note:  If you need to use dataloader during compile(), you can refer to the ModelZoo&Dataset section above.

- **get_interact_profile()**
Load the interactive configuration interface. If the vendor needs the user to provide some additional information, such as compilation configuration, you can load the json file you added here and return a list of dict. Framework will display the content of the profile to the user and is responsible for collecting feedback about the profile. If the user does not need to provide additional information, return None here.

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

get_interact_profile can get some workload info and model info, and the vendor can also generate some options other than json under this API.

- **get_best_batch_size()**
Select the interface with the best batch size configuration. For some accelerator cards, there may be optimal batch size usage. This interface can be used to conduct a preliminary analysis of the model and return an optimal bs list. The framework will evaluate the list returned by this interface.

## Implement RuntimeBackend API
In the current version, the APIs that need to be implemented are as follows:
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
Load the model corresponding to the Batch Size. The compiled result framework will be passed to the runtime backend, ensuring the input bs matches the backend returned by compile.

- **predict()**
Call the compiled product for a single prediction.

- **is_qs_mode_supported()**
Whether it has been connected to qs, and if it has been connected, the performance test can be performed through qs.

- **generate_qs_config()**
If qs has been supported, the framework will call this interface to generate the corresponding qs configuration.

- **benchmark()**
It is used to call this interface by the framework before QuickSilver is ready, and transfer the benchmark to the Runtime backend, and the runtime backend loads the compiled product in the interface for performance testing.
A dictionary needs to be returned, which can contain information such as BS, QPS, AVG Latency, P99 Latency, as shown below.
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