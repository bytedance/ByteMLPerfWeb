import { EN_US } from './enUS';

export const ZH_CN: Record<keyof typeof EN_US, string> = {
  generalPerf: '模型推理基准测试',
  llmPerf: '大语言模型推理基准测试',
  microPerf: '微基准测试',
  trainingPerf: '训练基准测试',
  moduleCount: '模型数量',
  guide: '指南',
  quickStart: '快速开始',
  general: '推理标准模型',
  llm: '推理大语言模型',
  micro: '微评估',
  friendLink: '友情链接',
  community: '社区',
  benchmarkTitle: '可靠的基准测试结果',
  benchmarkDesc:
    '强调结果的可复现性，使得评估的结果不仅是准确的，还是可信的，从而确保所有的参与者都能够在一个公平、透明的基础上进行比较。',
  benchmarkDetail: '参见 Benchmark 详情',
  datasetTitle: '准确的芯片数据',
  datasetDesc: '提供准确的芯片数据，供用户参考比较。',
  recruit: '异构硬件团队正在招聘中，欢迎加入👏🏻',
};
