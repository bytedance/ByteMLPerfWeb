import { Tabs, Tab } from 'rspress/theme';
import { NoSSR } from 'rspress/runtime';
import { MenuGroup } from '../MenuGroup/index';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '../../i18n';
import styles from './index.module.scss';
import * as echarts from 'echarts';

import BENCHMARK_DATA from '../../../static/benchmark/graph.json';

const MODULE_COUNT_MAP = {
  generalPerf: '11',
  llmPerf: '3',
  microPerf: '10',
  trainingPerf: '0',
};

export function Benchmark() {
  const t = useI18n();
  const SCENE = ['generalPerf'];
  const [activeScene, setActiveScene] =
    useState<keyof typeof BENCHMARK_DATA>('generalPerf');
  const { ref, inView } = useInView({});
  const variants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const performanceInfoList = BENCHMARK_DATA[activeScene];

  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current && inView) {
      const myChart = echarts.init(chartRef.current);

      const currentData = performanceInfoList;
      const { vendors, modelData } = currentData;

      // 确定所有的模型名称
      const models = Object.keys(modelData);

      // 准备每个vendor的数据
      const series = vendors.map(vendor => ({
        name: vendor,
        type: 'bar',
        data: models.map(model => modelData[model][vendor] || 0), // 如果没有数据则为0
        emphasis: { focus: 'series' }
      }));

      const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: {},
        toolbox: {
          show: true,
          showTitle: true,
          feature: {
              dataView: { show: true, readOnly: false },
              saveAsImage: { show: true }
          }
        },
        xAxis: { 
          type: 'category', 
          data: models, 
          axisLabel: {
            interval: 0,  // 显示所有标签
            rotate: 20    // 如果标签过多导致重叠，可以设置此属性让标签斜着显示
          }
        },
        yAxis: { type: 'log', name: 'QPS' , logBase: 250000000,
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series
      };

      myChart.setOption(option);

      return () => myChart.dispose(); // 清理资源
    }
  }, [activeScene, inView]); // 依赖项列表包括 inView，以便于视图变化时重新渲染图表


  return (
    <NoSSR>
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 1 }}
      className={styles['benchmark-bar']}
      
    >
      {(
        <>
          <div className="flex flex-center flex-col">
            <h2 className={`${styles.title} font-bold text-2xl sm:text-4xl`}>
              {t('benchmarkTitle')}
            </h2>
            <p className="mt-6 mx-6 text-center sm:text-lg text-gray-600 max-w-3xl">
              {t('benchmarkDesc')}
            </p>
          </div>
          <div className="flex flex-col items-center my-4 z-1">
            <Tabs
              values={SCENE.map((item) => ({
                label: t(item as keyof typeof BENCHMARK_DATA),
              }))}
              onChange={(index) =>
                setActiveScene(SCENE[index] as keyof typeof BENCHMARK_DATA)
              }
            >
              {SCENE.map((scene) => (
                <Tab key={scene}>
                  <div ref={chartRef} style={{ width: '800px', height: '400px' }} 
                       className="flex flex-center justify-start m-4 flex-col sm:flex-row"></div>
                </Tab>
              ))}
            </Tabs>
            <div>
              <p className="font-medium my-2 text-center text-lg text-gray-500">
                <span className=" font-normal">{t('moduleCount')}:</span>{' '}
                {MODULE_COUNT_MAP[activeScene]}
              </p>
              <a
                href="https://github.com/bytedance/ByteMLPerf"
                className="hover:text-brand transition-colors duration-300 text-14px font-medium text-gray-500 p-3"
              >
                👉 {t('benchmarkDetail')}
              </a>
            </div>
          </div>
        </>
      )}
    </motion.div>
    </NoSSR>
  );
}
