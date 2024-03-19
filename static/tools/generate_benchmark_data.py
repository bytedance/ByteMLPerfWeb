import os
import json

def extract_data(root_dir):
    vendors = []
    modelData = {}

    # 遍历vendors
    for vendor in os.listdir(root_dir):
        vendor_path = os.path.join(root_dir, vendor)
        if os.path.isdir(vendor_path):
            vendors.append(vendor)
            # 遍历models
            for model_dir in os.listdir(vendor_path):
                model_path = os.path.join(vendor_path, model_dir)
                for file in os.listdir(model_path):
                    if file.endswith(".json"):
                        file_path = os.path.join(model_path, file)
                        with open(file_path, 'r') as json_file:
                            data = json.load(json_file)
                            model_name = data['Model'].lower().replace('-', ' ')
                            qps_values = [performance['QPS'] for performance in data['Performance']]
                            max_qps = max(qps_values, default=0)

                            if model_name not in modelData:
                                modelData[model_name] = {}
                            modelData[model_name][vendor] = max_qps

    return vendors, modelData

def save_data(vendors, modelData, output_file):
    data = {
        "vendors": vendors,
        "modelData": modelData
    }
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

root_dir = '/opt/rspack-website/static/benchmark/reports'
output_file = 'benchmarkData.json'
vendors, modelData = extract_data(root_dir)
save_data(vendors, modelData, output_file)
print("Data extraction complete. Output saved to", output_file)
