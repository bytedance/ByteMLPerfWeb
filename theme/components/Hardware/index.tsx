import React, { useEffect, useRef, useState } from 'react';
import BENCHMARK_DATA from '../../../static/benchmark/combinedData.json';
import styles from './index.module.scss';
import { useI18n } from '../../i18n';

export function Hardware() {
  // 用于触发重新渲染的状态
  const t = useI18n();
  const [data, setData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // 当组件挂载时，处理数据
  useEffect(() => {
    // 假设BENCHMARK_DATA就是你想要展示的数据
    setData(BENCHMARK_DATA);
  }, []);

  const handleImageClick = (imageSrc: string) => {
    const fullPath = `/${imageSrc}`;
    setSelectedImage(fullPath);
    setIsModalOpen(true);
  };
  return (
    <div className="relative max-w-6xl mx-auto py-10 my-15">
      <div className="flex flex-center flex-col">
        <h2 className={`${styles.title} font-bold text-2xl sm:text-4xl`}>
          {t('datasetTitle')}
        </h2>
        <p className="mt-6 mx-6 text-center sm:text-lg text-gray-600 max-w-3xl">
          {t('datasetDesc')}
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg  h-96  mt-8">
        <table className="table-auto border">
          <thead className={styles['table-title']}>
            <tr>
              <th className="whitespace-nowrap" colSpan={4}>
                SKU
              </th>
              <th className="whitespace-nowrap" colSpan={4}>
                Board Design
              </th>
              <th className="whitespace-nowrap" colSpan={10}>
                Memory Specifications
              </th>
              <th className="whitespace-nowrap" colSpan={16}>
                Computing Performance Specifications
              </th>
              <th className="whitespace-nowrap" colSpan={5}>
                Networking Parameters
              </th>
            </tr>
            <tr>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                Vendor
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                Name
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                Purpose
              </th>
              <th className="whitespace-nowrap  px-4" rowSpan={2}>
                Picture
              </th>
              <th className="whitespace-nowrap  px-4" rowSpan={2}>
                Process Size(NM)
              </th>
              <th className="whitespace-nowrap  px-4" rowSpan={2}>
                Board Size
              </th>
              <th className="whitespace-nowrap  px-4" rowSpan={2}>
                Bus Interface
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                TDP(W)
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                Memory Hierarchy Graph
              </th>
              <th className="whitespace-nowrap px-4" colSpan={3} rowSpan={1}>
                Memory
              </th>
              <th className="whitespace-nowrap px-4" colSpan={3} rowSpan={1}>
                一级缓存
              </th>
              <th className="whitespace-nowrap px-4" colSpan={3} rowSpan={1}>
                二级缓存
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                PE层次架构图
              </th>
              <th className="whitespace-nowrap px-4" colSpan={3} rowSpan={1}>
                PE
              </th>
              <th className="whitespace-nowrap px-4" colSpan={4} rowSpan={1}>
                Scalar Parameters
              </th>
              <th className="whitespace-nowrap px-4" colSpan={4} rowSpan={1}>
                Vector Parameters
              </th>
              <th className="whitespace-nowrap px-4" colSpan={4} rowSpan={1}>
                Tensor Parameters
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                通信方式
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                端口数量
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                RDMA协议
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                下行带宽
              </th>
              <th className="whitespace-nowrap px-4" rowSpan={2}>
                上行带宽
              </th>
            </tr>
            <tr>
              <th className="whitespace-nowrap px-4">Memory Type</th>
              <th className="whitespace-nowrap px-4">Memroy Size(GB)</th>
              <th className="whitespace-nowrap px-4">Memory Bandwidth(GB/s)</th>
              <th className="whitespace-nowrap px-4">缓存类型</th>
              <th className="whitespace-nowrap px-4">缓存容量</th>
              <th className="whitespace-nowrap px-4">缓存带宽</th>
              <th className="whitespace-nowrap px-4">缓存类型</th>
              <th className="whitespace-nowrap px-4">缓存容量</th>
              <th className="whitespace-nowrap px-4">缓存带宽</th>
              <th className="whitespace-nowrap px-4">算力架构</th>
              <th className="whitespace-nowrap px-4">Parallelism Mode</th>
              <th className="whitespace-nowrap px-4">通信带宽</th>
              <th className="whitespace-nowrap px-4">Scalar Precision</th>
              <th className="whitespace-nowrap px-4">INT8向量算力</th>
              <th className="whitespace-nowrap px-4">FP16向量算力</th>
              <th className="whitespace-nowrap px-4">FP32向量算力</th>
              <th className="whitespace-nowrap px-4">Vector Precision</th>
              <th className="whitespace-nowrap px-4">INT8向量算力</th>
              <th className="whitespace-nowrap px-4">FP16向量算力</th>
              <th className="whitespace-nowrap px-4">FP32向量算力</th>
              <th className="whitespace-nowrap px-4">Tensor Precision</th>
              <th className="whitespace-nowrap px-4">INT8向量算力</th>
              <th className="whitespace-nowrap px-4">FP16向量算力</th>
              <th className="whitespace-nowrap px-4">FP32向量算力</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {/* 动态填充表格行 */}
            {Object.entries(data).map(([key, device], index) => (
              <tr
                key={key}
                className={`${styles['table-content']} hover:bg-slate-300`}
              >
                {/* 根据你的数据结构，填充单元格 */}
                <td className="whitespace-nowrap px-4">
                  {device['SKU参数']['厂商']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['SKU参数']['型号']}
                </td>
                <td className="whitespace-nowrap">
                  {device['SKU参数']['用途']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['SKU参数']['照片'] &&
                  device['SKU参数']['照片'] !== 'None' ? (
                    <img
                      src={`/${device['SKU参数']['照片']}`}
                      alt="Device"
                      style={{
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        handleImageClick(device['SKU参数']['照片'])
                      }
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['硬件参数']['制程(NM)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['硬件参数']['尺寸']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['硬件参数']['接口']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['硬件参数']['功耗(W/TDP)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['内存层次架构图'] &&
                  device['内存参数']['内存层次架构图'] !== 'None' ? (
                    <img
                      src={`/${device['内存参数']['内存层次架构图']}`}
                      alt="Memory Hierarchy"
                      style={{
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        handleImageClick(device['内存参数']['内存层次架构图'])
                      }
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['内存']['内存类型']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['内存']['内存容量(GB)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['内存']['内存带宽(GB/s)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['一级缓存']['缓存类型']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['一级缓存']['缓存容量(MB)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['一级缓存']['缓存带宽(TB/s)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['二级缓存']['缓存类型']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['二级缓存']['缓存容量(MB)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['内存参数']['二级缓存']['缓存带宽(TB/s)']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['算力参数']['PE层次架构图'] &&
                  device['算力参数']['PE层次架构图'] !== 'None' ? (
                    <img
                      src={`/${device['算力参数']['PE层次架构图']}`}
                      alt="Memory Hierarchy"
                      style={{
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        handleImageClick(device['算力参数']['PE层次架构图'])
                      }
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['算力参数']['PE参数']['算力架构']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['算力参数']['PE参数']['并行方式']}
                </td>
                <td className="whitespace-nowrap px-4">
                  {device['算力参数']['PE参数']['通信带宽(GB/s)']}
                </td>
                {/* 更多td根据需要添加 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <img
                src={selectedImage}
                alt="Zoomed"
                style={{ maxWidth: '100%', maxHeight: '80vh' }}
              />
              <div className="mt-2">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
