const EDIT_LINK_PATTERN =
  'https://github.com/dagzhao/China-AAA-Hub/edit/main/:path'

const projectItems = [
  { key: 'newYear', path: '/projects/zhong-kui/new-year-special' },
  { key: 'wukong', path: '/projects/wukong' },
  { key: 'zhongkui', path: '/projects/zhong-kui/lore' },
  { key: 'wuchang', path: '/projects/wuchang' },
  { key: 'yanyun', path: '/projects/yanyun' },
  { key: 'phantomBlade', path: '/projects/phantom-blade' },
  { key: 'tides', path: '/projects/tides-of-annihilation' }
]

const cultureItems = [
  { key: 'basics', path: '/culture/basics' },
  { key: 'taoism', path: '/culture/taoism' },
  { key: 'threeRealms', path: '/culture/three-realms' },
  { key: 'karma', path: '/culture/karma' },
  { key: 'beasts', path: '/culture/beasts' }
]

const toolItems = [
  { key: 'quiz', path: '/quiz' },
  { key: 'glossary', path: '/glossary' }
]

const newsItems = [
  {
    key: 'phantomLaunchDay',
    path: '/news/phantom-blade-zero-launch-day'
  },
  {
    key: 'phantomEve',
    path: '/news/phantom-blade-zero-launch-eve'
  },
  {
    key: 'tidesNews',
    path: '/news/tides-of-annihilation-gamescom-2026-story-trailer'
  },
  {
    key: 'phantomLaunch',
    path: '/news/phantom-blade-zero-october-29-launch'
  },
  {
    key: 'zhongkuiGameplay',
    path: '/news/black-myth-zhong-kui-15-minute-gameplay'
  },
  {
    key: 'wukongDlc',
    path: '/news/black-myth-wukong-dlc-status'
  },
  {
    key: 'wuchangSequel',
    path: '/news/wuchang-sequel-bai-wuchang'
  },
  {
    key: 'yanyunQingzhou',
    path: '/news/where-winds-meet-2-3-qingzhou'
  }
]

function localize(prefix, path) {
  return `${prefix}${path}`
}

/**
 * Build the themeConfig for one locale from the shared navigation structure.
 * @param {typeof import('./i18n/en.mjs').default} locale
 */
export function createLocaleTheme(locale) {
  const { prefix, labels } = locale
  const homeLink = prefix === '' ? '/' : `${prefix}/`

  return {
    logo: '/logo.png',
    nav: [
      { text: labels.nav.home, link: homeLink },
      {
        text: labels.nav.games,
        items: projectItems.map((item) => ({
          text: labels.games[item.key],
          link: localize(prefix, item.path)
        }))
      },
      {
        text: labels.nav.news,
        link: localize(prefix, '/news/')
      },
      {
        text: labels.nav.culture,
        items: cultureItems.map((item) => ({
          text: labels.culture[item.key],
          link: localize(prefix, item.path)
        }))
      },
      {
        text: labels.nav.tools,
        items: toolItems.map((item) => ({
          text: labels.tools[item.key],
          link: localize(prefix, item.path)
        }))
      }
    ],
    sidebar: {
      [`${prefix}/projects/`]: [
        {
          text: labels.sidebar.chronicles,
          items: projectItems.map((item) => ({
            text: labels.sidebar[item.key],
            link: localize(prefix, item.path)
          }))
        }
      ],
      [`${prefix}/news/`]: [
        {
          text: labels.sidebar.news,
          items: newsItems.map((item) => ({
            text: labels.sidebar[item.key],
            link: localize(prefix, item.path)
          }))
        }
      ],
      [`${prefix}/culture/`]: [
        {
          text: labels.sidebar.culture,
          items: cultureItems.map((item) => ({
            text: labels.culture[item.key],
            link: localize(prefix, item.path)
          }))
        }
      ]
    },
    footer: {
      message: labels.footer.message,
      copyright: labels.footer.copyright
    },
    editLink: {
      pattern: EDIT_LINK_PATTERN,
      text: labels.editLink
    },
    lastUpdatedText: labels.lastUpdated,
    outline: { label: labels.outline }
  }
}

export { projectItems, cultureItems, toolItems }
