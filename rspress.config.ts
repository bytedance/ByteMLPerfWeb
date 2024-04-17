import path from 'path';
import { defineConfig } from 'rspress/config';
import { NavItem, Sidebar } from '@rspress/shared';
import { pluginShiki } from '@rspress/plugin-shiki';
import { pluginRss, PluginRssOption } from './rspress/plugin-rss';
import { toArray } from './rspress/plugin-rss/utils';

const PUBLISH_URL = 'https://bytemlperf.ai';
const COPYRIGHT = '© 2024 Bytedance Inc. All Rights Reserved.';

function getMeta(name: string, value: string) {
  return {
    [name]: {
      property: name,
      content: value,
    },
  };
}

function getI18nHelper(lang: 'zh' | 'en') {
  const isZh = lang === 'zh';
  const prefix = isZh ? '/zh' : '';
  const getLink = (str: string) => `${prefix}${str}`;
  const getText = (zhText: string, enText: string) => (isZh ? zhText : enText);
  return { getText, getLink };
}

function getNavConfig(lang: 'zh' | 'en'): NavItem[] {
  const { getText, getLink } = getI18nHelper(lang);
  return [
    {
      text: getText('指南', 'Guide'),
      link: getLink('/guide/introduction'),
      activeMatch: '/guide/',
    },
    {
      text: getText('博客', 'Blog'),
      link: getLink('/blog/kubecon'),
      activeMatch: '/blog',
    },
    {
      text: getText('关于', 'About'),
      items: [
        {
          text: getText('加入我们', 'Join Us'),
          link: getLink('/misc/join-us'),
        },
        {
          text: getText('贡献指南', 'Contributing Guide'),
          link: 'https://github.com/bytedance/ByteMLPerf/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ];
}

function getSidebarConfig(lang: 'zh' | 'en'): Sidebar {
  const { getText, getLink } = getI18nHelper(lang);

  return {
    [getLink('/guide/')]: [
      {
        collapsible: false,
        text: getText('开始', 'Getting started'),
        items: [
          {
            link: getLink('/guide/introduction'),
            text: getText('介绍', 'Introduction'),
          },
          {
            link: getLink('/guide/quick-start'),
            text: getText('快速开始', 'Quick Start'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('Inference General Perf', 'Inference General Perf'),
        items: [
          {
            link: getLink('/guide/inference_general_overview'),
            text: getText('概览', 'Overview'),
          },
          {
            link: getLink('/guide/inference_general_vendor'),
            text: getText('厂商接入指南', 'Vendor Intergration Guide'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('Inference LLM Perf', 'Inference LLM Perf'),
        items: [
          {
            link: getLink('/guide/inference_llm_overview'),
            text: getText('概览', 'Overview'),
          },
          {
            link: getLink('/guide/inference_llm_vendor'),
            text: getText('厂商接入指南', 'Vendor Intergration Guide'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('Micro Perf', 'Micro Perf'),
        items: [
          {
            link: getLink('/guide/micro_overview'),
            text: getText('概览', 'Overview'),
          },
          {
            link: getLink('/guide/micro_vendor'),
            text: getText('厂商接入指南', 'Vendor Intergration Guide'),
          },
        ],
      },
      {
        collapsible: false,
        text: getText('Training Perf', 'Training Perf'),
        items: [
          {
            link: getLink('/guide/training_overview'),
            text: getText('概览', 'Overview'),
          },
        ],
      },
    ],
    [getLink('/blog/')]: [
      {
        text: getText(
          'AI ASIC 的基准测试、优化和生态系统协作的整合',
          'Integration of Benchmark Testing, Optimization, and Ecosystem Collaboration for AI ASICs'
        ),
        link: getLink('/blog/kubecon'),
      },
      {
        text: getText(
          'ByteMLPerf将参加Open Source Summit',
          'ByteMLPerf will be participating in the upcoming Open Source Summit in Shanghai'
        ),
        link: getLink('/blog/summit'),
      },
      {
        text: getText(
          'GRAPHCORE现已支持BYTEMLPERF',
          'Graphcore now supports ByteMLPerf'
        ),
        link: getLink('/blog/graphcore'),
      },
    ],
  };
}

const toFeedItem: PluginRssOption['toFeedItem'] = (page) => {
  const fm = page.frontmatter as Record<string, any>;
  const { date } = fm;
  if (!date) return false;

  const categories = toArray(fm['categories'], fm['category']);

  const isBlog = /blog/.test(page.routePath) || categories.includes('blog');
  // we only include the blogs at the moment
  if (!isBlog) return false;

  const feed = `blog-${page.lang}`;

  return {
    title: fm.title || page.title || '',
    id: fm.rssId || page.id || '',
    link: fm.permalink || page.routePath || '',
    description: fm.rssDescription || fm.description || '',
    content: fm.rssContent || fm.summary || page.content || '',
    date,
    category: categories,
    feed,
  };
};

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'ByteMLPerf',
  description: 'AI Accelerator Benchmark focuses on evaluating AI Accelerators',
  logo: {
    light: '/bytemlperf-logo-light.png',
    dark: '/bytemlperf-logo-dark.png',
  },
  icon: '/icon.png',
  lang: 'en',
  globalStyles: path.join(__dirname, 'theme', 'index.css'),
  markdown: {
    checkDeadLinks: true,
  },
  plugins: [
    pluginShiki(),
    pluginRss({
      routePublicPath: PUBLISH_URL,
      feedOptions: { copyright: COPYRIGHT, link: PUBLISH_URL },
      feedOptionsByName: {
        'blog-en': { title: 'ByteMLPerf Blog', link: `${PUBLISH_URL}/blog` },
        'blog-zh': { title: 'ByteMLPerf 博客', link: `${PUBLISH_URL}/zh/blog` },
      },
      toFeedItem,
    }),
  ],
  themeConfig: {
    footer: {
      message: '© 2024 Bytedance Inc. All Rights Reserved.',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/bytedance/ByteMLPerf',
      },
      {
        icon: 'twitter',
        mode: 'link',
        content: 'https://twitter.com/bytemlperf',
      },
      {
        icon: 'lark',
        mode: 'link',
        content:
          'https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=edcvd6ab-cb20-4210-a828-5e40be0c768l',
      },
    ],
    locales: [
      {
        lang: 'en',
        title: 'ByteMLPerf',
        description:
          'AI Accelerator Benchmark focuses on evaluating AI Accelerators',
        nav: getNavConfig('en'),
        sidebar: getSidebarConfig('en'),
        label: 'English',
      },
      {
        lang: 'zh',
        title: 'ByteMLPerf',
        description: '专注于AI芯片基准测试',
        nav: getNavConfig('zh'),
        sidebar: getSidebarConfig('zh'),
        label: '简体中文',
      },
    ],
  },
  builderConfig: {
    source: {
      alias: {
        '@builtIns': path.join(__dirname, 'components', 'builtIns'),
        '@components': path.join(__dirname, 'components'),
        '@hooks': path.join(__dirname, 'hooks'),
      },
    },
    dev: {
      startUrl: false,
    },
    tools: {
      postcss: (config, { addPlugins }) => {
        addPlugins([require('tailwindcss/nesting'), require('tailwindcss')]);
      },
    },
    html: {
      meta: {
        ...getMeta('og:title', 'ByteMLPerf'),
        ...getMeta('og:type', 'website'),
        ...getMeta('og:url', PUBLISH_URL),
        ...getMeta(
          'og:description',
          'AI Accelerator Benchmark focuses on evaluating AI Accelerators'
        ),
        ...getMeta('twitter:site', '@bytemlperf'),
        ...getMeta('twitter:card', 'summary_large_image'),
      },
      tags: [
        // Configure Google Analytics
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-XKKCNZZNJD',
          },
        },
        {
          tag: 'script',
          children: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XKKCNZZNJD');`,
        },
      ],
    },
    output: {
      copy: {
        patterns: [
          {
            from: path.join(__dirname, 'docs', 'public', '_redirects'),
          },
          {
            from: path.join(__dirname, 'docs', 'public', '_headers'),
          },
        ],
      },
    },
  },
});
