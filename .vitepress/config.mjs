import { defineConfig } from 'vitepress'
import en from './i18n/en.mjs'
import zh from './i18n/zh.mjs'
import ja from './i18n/ja.mjs'
import { createLocaleTheme } from './navigation.mjs'
import { createPageIndex, createSeoTransform } from './seo.mjs'

const pageIndex = createPageIndex()

function localeConfig(locale) {
  return {
    label: locale.label,
    lang: locale.lang,
    ...(locale.link ? { link: locale.link } : {}),
    themeConfig: createLocaleTheme(locale)
  }
}

export default defineConfig({
  cleanUrls: true, // 核心配置：开启后，VitePress 会生成不带后缀的链接
  appearance: 'dark',
  title: "China AAA Games",
  description: "Decoding the new era of Chinese AAA games",

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // Open Graph / Twitter 标签由 transformHead 按页面动态生成
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // --- Google Analytics 脚本开始 ---
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-SLFCYVTHZH' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SLFCYVTHZH');`
    ]
    // --- Google Analytics 脚本结束 ---
  ],

  locales: {
    root: localeConfig(en),
    zh: localeConfig(zh),
    ja: localeConfig(ja)
  },

  transformHead: createSeoTransform(pageIndex),

  lastUpdated: true, // 开启最后更新时间
  // 重点：直接添加这个内置选项
  sitemap: {
    hostname: 'https://china3agames.com' //
  },
  themeConfig: {
    logo: '/logo.png',
    outline: { label: 'On this page' },
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dagzhao/China-AAA-Hub' }
    ]
  }
})
