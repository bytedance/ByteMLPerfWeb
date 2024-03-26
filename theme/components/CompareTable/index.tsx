import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import BENCHMARK_DATA from '../../../static/benchmark/combinedData.json';
import styles from './index.module.scss';
import { useI18n } from '../../i18n';

const sizeMap = {
  Inference: 1,
  'Training/Inference': 2,
  'HHHL, Single Slot Card': 1,
  'FHFL, Single Slot Card': 2,
  'FHFL, Dual Slot Card': 3,
  GDDR6: 1,
  HBM2e: 2,
  HBM3: 4,
  'PCIe 3.0x16': 1,
  'PCIe 4.0x16': 2,
  'PCIe 5.0x16': 3,
};

export function GPUComparisonECharts() {
  const t = useI18n();
  const chartRef = useRef(null);
  const [selectedGPU1, setSelectedGPU1] = useState('A100-SXM4');
  const [selectedGPU2, setSelectedGPU2] = useState('Gaudi2');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (selectedGPU1 && selectedGPU2 && chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const gpu1Data = BENCHMARK_DATA[selectedGPU1];
      const gpu2Data = BENCHMARK_DATA[selectedGPU2];
      const comparisonData = []; // Temporary array to hold table data

      const sizeMap = {
        Inference: 1,
        'Training/Inference': 2,
        'HHHL, Single Slot Card': 1,
        'FHFL, Single Slot Card': 2,
        'FHFL, Dual Slot Card': 3,
        GDDR6: 1,
        HBM2e: 2,
        HBM3: 4,
        'PCIe 3.0x16': 1,
        'PCIe 4.0x16': 2,
        'PCIe 5.0x16': 3,
      };

      // Function to compare and append data
      const recursiveAppendToTable = (obj1, obj2, parentKey = '') => {
        Object.keys(obj1).forEach((key) => {
          let highlightedClass1 = '';
          let highlightedClass2 = '';
          const fullKey = parentKey ? `${parentKey}.${key}` : key; // Create a nested key string
          if (
            key.includes('量参数') ||
            key.includes('照片') ||
            key.includes('功耗') ||
            key.includes('架构图') ||
            key.includes('内存容量') ||
            key.includes('内存带宽')
          ) {
          } else {
            if (
              typeof obj1[key] === 'object' &&
              obj1[key] !== null &&
              !Array.isArray(obj1[key])
            ) {
              recursiveAppendToTable(obj1[key], obj2[key] || {}, fullKey);
            } else {
              if (key === '制程(NM)' || key === '功耗(W/TDP)') {
                if (parseFloat(obj1[key]) < parseFloat(obj2[key])) {
                  highlightedClass1 = 'bg-blue-100';
                } else if (parseFloat(obj2[key]) < parseFloat(obj1[key])) {
                  highlightedClass2 = 'bg-blue-100';
                }
              } else if (!isNaN(obj1[key])) {
                if (parseFloat(obj1[key]) > parseFloat(obj2[key])) {
                  highlightedClass1 = 'bg-blue-100';
                } else if (parseFloat(obj2[key]) > parseFloat(obj1[key])) {
                  highlightedClass2 = 'bg-blue-100';
                }
              } else {
                if (
                  sizeMap.hasOwnProperty(obj1[key]) &&
                  sizeMap.hasOwnProperty(obj2[key])
                ) {
                  if (sizeMap[obj1[key]] > sizeMap[obj2[key]]) {
                    highlightedClass1 = 'bg-blue-100';
                  } else if (sizeMap[obj1[key]] < sizeMap[obj2[key]]) {
                    highlightedClass2 = 'bg-blue-100';
                  }
                }
              }
              if (obj1[key] !== null && obj2[key] !== null) {
                comparisonData.push({
                  key: key,
                  data1: obj1[key] || 'N/A',
                  data2: obj2[key] || 'N/A',
                  highlight1: highlightedClass1,
                  highlight2: highlightedClass2,
                });
              }
            }
          }
        });
      };
      recursiveAppendToTable(gpu1Data, gpu2Data);
      setTableData(comparisonData);

      let dataA = [
        -gpu1Data['硬件参数']['功耗(W/TDP)'],
        -gpu1Data['内存参数']['内存']['内存容量(GB)'],
        -gpu1Data['内存参数']['内存']['内存带宽(GB/s)'],
        -gpu1Data['算力参数']['张量参数']['INT8张量算力(TFLOPS)'],
        -gpu1Data['算力参数']['张量参数']['FP16张量算力(TFLOPS)'],
        -gpu1Data['算力参数']['张量参数']['FP32张量算力(TFLOPS)'],
      ]; // 这些数据应该是动态生成的

      let dataB = [
        gpu2Data['硬件参数']['功耗(W/TDP)'],
        gpu2Data['内存参数']['内存']['内存容量(GB)'],
        gpu2Data['内存参数']['内存']['内存带宽(GB/s)'],
        gpu2Data['算力参数']['张量参数']['INT8张量算力(TFLOPS)'],
        gpu2Data['算力参数']['张量参数']['FP16张量算力(TFLOPS)'],
        gpu2Data['算力参数']['张量参数']['FP32张量算力(TFLOPS)'],
      ]; // 这些数据也应该是动态生成的

      let minVal = Math.min(...dataA);
      let maxVal = Math.max(...dataB);
      const maxAbs = Math.max(Math.abs(minVal), Math.abs(maxVal));

      var option = {
        title: {
          text: 'Compute Capability Comparison',
          x: 'center',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            return params
              .map(function (param) {
                return `${param.seriesName}: ${Math.abs(param.data)}`;
              })
              .join('<br>');
          },
        },
        toolbox: {
          show: true,
          showTitle: true,
        },
        legend: {
          top: '7%',
          data: [
            gpu1Data['SKU参数']['厂商'] + ' ' + gpu1Data['SKU参数']['型号'],
            gpu2Data['SKU参数']['厂商'] + ' ' + gpu2Data['SKU参数']['型号'],
          ],
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              return Math.abs(value);
            },
          },
          min: -maxAbs,
          max: maxAbs,
        },
        yAxis: {
          data: [
            '功耗(W/TDP)',
            '内存容量(GB)',
            '内存带宽(TB/s)',
            'INT8/FP8张量算力\n(TFLOPS)',
            'FP16/BF16张量算力\n(TFLOPS)',
            'FP32张量算力\n(TFLOPS)',
          ],
        },
        series: [
          {
            name:
              gpu1Data['SKU参数']['厂商'] + ' ' + gpu1Data['SKU参数']['型号'],
            type: 'bar',
            stack: 'Total',
            data: dataA, // 这些数据应该是动态生成的
            label: {
              show: true,
              formatter: function (params) {
                return Math.abs(params.data);
              },
            },
          },
          {
            name:
              gpu2Data['SKU参数']['厂商'] + ' ' + gpu2Data['SKU参数']['型号'],
            type: 'bar',
            stack: 'Total',
            data: dataB, // 这些数据也应该是动态生成的
            label: {
              show: true,

              formatter: function (params) {
                return Math.abs(params.data);
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      return () => myChart.dispose();
    }
  }, [selectedGPU1, selectedGPU2]);

  return (
    <div className="flex flex-col items-center my-4">
      <div className="flex flex-center flex-col">
        <h2 className={`${styles.title} font-bold text-2xl sm:text-4xl`}>
          {t('chipcompareTitle')}
        </h2>
        <p className="mt-6 mx-6 text-center sm:text-lg text-gray-600 max-w-3xl">
          {t('chipcompareDesc')}
        </p>
      </div>
      <div className="mt-8">
        <select
          onChange={(e) => setSelectedGPU1(e.target.value)}
          value={selectedGPU1}
          className="mr-4 py-2 px-4 bg-white border border-gray-300 rounded shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select GPU 1</option>
          {Object.entries(BENCHMARK_DATA).map(([key, val]) => (
            <option key={key} value={key}>
              {val['SKU参数']['型号']}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedGPU2(e.target.value)}
          value={selectedGPU2}
          className="py-2 px-4 bg-white border border-gray-300 rounded shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select GPU 2</option>
          {Object.entries(BENCHMARK_DATA).map(([key, val]) => (
            <option key={key} value={key}>
              {val['SKU参数']['型号']}
            </option>
          ))}
        </select>
      </div>

      <div
        className="flex flex-row items-start justify-center gap-8"
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '20px',
        }}
      >
        <div style={{ width: '50%' }}>
          <table
            className={`table-auto border ${styles.tableCenter}`}
            style={{ width: '100%' }}
          >
            <thead className={styles['table-title']}>
              <tr>
                <th className="whitespace-nowrap">Feature</th>
                <th className="whitespace-nowrap">{selectedGPU1}</th>
                <th className="whitespace-nowrap">{selectedGPU2}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map(
                ({ key, data1, data2, highlight1, highlight2 }) => (
                  <tr key={key} className={`${styles['table-content']}`}>
                    <td className="whitespace-nowrap">{key}</td>
                    <td className={`${highlight1} whitespace-nowrap`}>
                      {data1}
                    </td>
                    <td className={`${highlight2} whitespace-nowrap`}>
                      {data2}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div ref={chartRef} style={{ width: '50%', height: '400px' }}></div>
      </div>
    </div>
  );
}
