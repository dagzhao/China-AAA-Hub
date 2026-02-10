import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: 'dark',
  title: "China AAA Games",
  description: "Decoding the new era of Chinese AAA games",

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // 增加以下标签，让分享时的缩略图更好看
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'China AAA Games | Black Myth Lore Hub' }],
    ['meta', { property: 'og:image', content: 'https://china3agames.com/logo.png' }], 
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
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        logo: '/logo.png',
        nav: [
          { text: 'Home', link: '/' },
          {
            text: 'Games',
            items: [
              { text: 'Black Myth: 2026 New Year', link: '/projects/zhong-kui/new-year-special' },
              { text: 'Black Myth: Wukong', link: '/projects/wukong' },
              { text: 'Black Myth: Zhong Kui', link: '/projects/zhong-kui/lore' },
              { text: 'WUCHANG: Fallen Feathers', link: '/projects/wuchang' },
              { text: 'Where Winds Meet', link: '/projects/yanyun' },
              { text: 'Phantom Blade Zero', link: '/projects/phantom-blade' }
            ]
          }
        ],
        sidebar: {
          '/projects/': [
            {
              text: 'AAA Game Chronicles',
              items: [
                { text: 'Black Myth: 2026 New Year', link: '/projects/zhong-kui/new-year-special' },
                { text: 'Wukong: Lore', link: '/projects/wukong' },
                { text: 'Zhong Kui: Lore', link: '/projects/zhong-kui/lore' },
                { text: 'Wuchang: Lore', link: '/projects/wuchang' },
                { text: 'Yanyun: Lore', link: '/projects/yanyun' },
                { text: 'Phantom Blade: Lore', link: '/projects/phantom-blade' }
              ]
            }
          ]
        },
      editLink: {
        pattern: 'https://github.com/dagzhao/China-AAA-Hub/edit/main/:path',
        text: 'Edit this page on GitHub'
      },
      lastUpdatedText: 'Last updated'
         }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        logo: '/logo.png',
        nav: [
          { text: '首页', link: '/zh/' },
          {
            text: '游戏项目',
            items: [
              { text: '黑神话：2026春节寄语', link: '/zh/projects/zhong-kui/new-year-special' },
              { text: '黑神话：悟空', link: '/zh/projects/wukong' },
              { text: '黑神话：钟馗', link: '/zh/projects/zhong-kui/lore' },
              { text: '明末：渊虚之羽', link: '/zh/projects/wuchang' },
              { text: '燕云十六声', link: '/zh/projects/yanyun' },
              { text: '影之刃零', link: '/zh/projects/phantom-blade' }
            ]
          }
        ],
        sidebar: {
          '/zh/projects/': [
            {
              text: 'AAA游戏',
              items: [
                { text: '黑神话：2026春节寄语', link: '/zh/projects/zhong-kui/new-year-special' },
                { text: '黑神话：悟空', link: '/zh/projects/wukong' },
                { text: '黑神话：钟馗', link: '/zh/projects/zhong-kui/lore' },
                { text: '明末：渊虚之羽', link: '/zh/projects/wuchang' },
                { text: '燕云十六声', link: '/zh/projects/yanyun' },
                { text: '影之刃零', link: '/zh/projects/phantom-blade' }
              ]
            }
          ]
        },
        editLink: {
        pattern: 'https://github.com/dagzhao/China-AAA-Hub/edit/main/:path',
        text: '在 GitHub 上编辑此页'
      },
      lastUpdatedText: '最后更新时间'
      }
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/',
      themeConfig: {
        logo: '/logo.png',
        nav: [
          { text: 'ホーム', link: '/ja/' },
          {
            text: 'プロジェクト',
            items: [
              { text: '黒神話：2026新春特別企画', link: '/ja/projects/zhong-kui/new-year-special' },
              { text: '黒神話：悟空', link: '/ja/projects/wukong' },
              { text: '黒神話：鍾馗', link: '/ja/projects/zhong-kui/lore' },
              { text: '明末：淵虚之羽', link: '/ja/projects/wuchang' },
              { text: '燕雲十六声', link: '/ja/projects/yanyun' },
              { text: '影之刃零', link: '/ja/projects/phantom-blade' }
            ]
          }
        ],
        sidebar: {
          '/ja/projects/': [
            {
              text: '主要プロジェクト',
              items: [
                { text: '黒神話：2026新春特別企画', link: '/ja/projects/zhong-kui/new-year-special' },
                { text: '黒神話：悟空', link: '/ja/projects/wukong' },
                { text: '黒神話：鍾馗', link: '/ja/projects/zhong-kui/lore' },
                { text: '明末：淵虚之羽', link: '/ja/projects/wuchang' },
                { text: '燕雲十六声', link: '/ja/projects/yanyun' },
                { text: '影之刃零', link: '/ja/projects/phantom-blade' }
              ]
            }
          ]
        },

        editLink: {
        pattern: 'https://github.com/dagzhao/China-AAA-Hub/edit/main/:path',
        text: 'GitHub でこのページを編集'
      },
      lastUpdatedText: '最終更新日'

      }
    }
  },

  lastUpdated: true, // 开启最后更新时间
  // 重点：直接添加这个内置选项
  sitemap: {
    hostname: 'https://china3agames.com' // 
  },
  themeConfig: {
    // 1. 配置“编辑此页”按钮
    editLink: {
      pattern: 'https://github.com/dagzhao/China-AAA-Hub/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    logo: '/logo.png',
    outline: { label: 'On this page' },
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: '' }
    ]
  }
})