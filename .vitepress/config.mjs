import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: 'dark',
  title: "China AAA Games",
  description: "Decoding the new era of Chinese AAA games",

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
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
                { text: 'Wukong: Lore', link: '/projects/wukong' },
                { text: 'Zhong Kui: Lore', link: '/projects/zhong-kui/lore' },
                { text: 'Wuchang: Lore', link: '/projects/wuchang' },
                { text: 'Yanyun: Lore', link: '/projects/yanyun' },
                { text: 'Phantom Blade: Lore', link: '/projects/phantom-blade' }
              ]
            }
          ]
        }
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
                { text: '黑神话：悟空', link: '/zh/projects/wukong' },
                { text: '黑神话：钟馗', link: '/zh/projects/zhong-kui/lore' },
                { text: '明末：渊虚之羽', link: '/zh/projects/wuchang' },
                { text: '燕云十六声', link: '/zh/projects/yanyun' },
                { text: '影之刃零', link: '/zh/projects/phantom-blade' }
              ]
            }
          ]
        }
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
                { text: '黒神話：悟空', link: '/ja/projects/wukong' },
                { text: '黒神話：鍾馗', link: '/ja/projects/zhong-kui/lore' },
                { text: '明末：淵虚之羽', link: '/ja/projects/wuchang' },
                { text: '燕雲十六声', link: '/ja/projects/yanyun' },
                { text: '影之刃零', link: '/ja/projects/phantom-blade' }
              ]
            }
          ]
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.png',
    outline: { label: 'On this page' },
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: '' }
    ]
  }
})