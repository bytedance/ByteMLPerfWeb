import os
import json

def combine_json_files(root_dir, output_file):
    combined_data = {}

    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(subdir, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        key = os.path.splitext(os.path.basename(file))[0]
                        combined_data[key] = data
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, ensure_ascii=False, indent=4)

# 调整路径以匹配你的项目结构
root_dir = '/opt/ByteMLPerf/vendor_zoo'
output_file = 'combinedData.json'

combine_json_files(root_dir, output_file)

print(f"Combined JSON data has been written to {output_file}")
