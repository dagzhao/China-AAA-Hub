import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

export const SITE_URL = 'https://china3agames.com'

export const LOCALES = [
  { code: 'en', prefix: '', ogLocale: 'en_US' },
  { code: 'zh-CN', prefix: '/zh', ogLocale: 'zh_CN' },
  { code: 'ja', prefix: '/ja', ogLocale: 'ja_JP' }
]

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.claude',
  '.vitepress',
  '_shots',
  'public'
])

export const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)

const DEFAULT_OG = {
  '': '/og-default.jpg',
  '/zh': '/og-default-zh.jpg',
  '/ja': '/og-default-ja.jpg'
}

const COLLECTION_ROUTES = new Set([
  '/projects',
  '/news',
  '/culture'
])

export const GAME_METADATA = {
  '/projects/wukong': {
    name: {
      '': 'Black Myth: Wukong',
      '/zh': '黑神话：悟空',
      '/ja': '黒神話：悟空'
    },
    alternateNames: [
      'Black Myth: Wukong',
      '黑神话：悟空',
      '黒神話：悟空',
      'Heishenhua: Wukong'
    ],
    developer: 'Game Science',
    developerZh: '游戏科学',
    publisher: 'Game Science',
    genre: ['Action RPG', 'Soulslike', 'Dark Fantasy'],
    genreZh: ['动作角色扮演', '类魂', '暗黑奇幻'],
    genreJa: ['アクションRPG', 'ソウルライク', 'ダークファンタジー'],
    gamePlatform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    operatingSystem: ['Windows 10/11']
  },
  '/projects/zhong-kui': {
    name: {
      '': 'Black Myth: Zhong Kui',
      '/zh': '黑神话：钟馗',
      '/ja': '黒神話：鍾馗'
    },
    alternateNames: [
      'Black Myth: Zhong Kui',
      '黑神话：钟馗',
      '黒神話：鍾馗',
      'Zhong Kui'
    ],
    developer: 'Game Science',
    developerZh: '游戏科学',
    publisher: 'Game Science',
    genre: ['Action RPG', 'Dark Fantasy', 'Chinese Mythology'],
    genreZh: ['动作角色扮演', '暗黑奇幻', '中式神话'],
    genreJa: ['アクションRPG', 'ダークファンタジー', '中国神話'],
    gamePlatform: ['PC', 'PlayStation 5'],
    operatingSystem: ['Windows']
  },
  '/projects/phantom-blade': {
    name: {
      '': 'Phantom Blade Zero',
      '/zh': '影之刃零',
      '/ja': 'ファントムブレイド ゼロ'
    },
    alternateNames: [
      'Phantom Blade Zero',
      '影之刃零',
      'ファントムブレイド ゼロ',
      'Phantom Blade 0'
    ],
    developer: 'S-GAME',
    developerZh: '灵游坊',
    publisher: 'S-GAME',
    genre: ['Action RPG', 'Kungfupunk', 'Wuxia'],
    genreZh: ['动作角色扮演', '功夫朋克', '武侠'],
    genreJa: ['アクションRPG', 'カンフーパンク', '武侠'],
    gamePlatform: ['PC', 'PlayStation 5', 'PlayStation 5 Pro'],
    operatingSystem: ['Windows 10/11']
  },
  '/projects/wuchang': {
    name: {
      '': 'WUCHANG: Fallen Feathers',
      '/zh': '明末：渊虚之羽',
      '/ja': '明末：ウツロノハネ（淵虚の羽）'
    },
    alternateNames: [
      'WUCHANG: Fallen Feathers',
      '明末：渊虚之羽',
      '明末：ウツロノハネ',
      'Wuchang'
    ],
    developer: 'Leenzee Games',
    developerZh: '灵泽科技',
    publisher: '505 Games',
    genre: ['Action RPG', 'Soulslike', 'Dark Fantasy'],
    genreZh: ['动作角色扮演', '类魂', '暗黑奇幻'],
    genreJa: ['アクションRPG', 'ソウルライク', 'ダークファンタジー'],
    gamePlatform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    operatingSystem: ['Windows 10/11']
  },
  '/projects/yanyun': {
    name: {
      '': 'Where Winds Meet',
      '/zh': '燕云十六声',
      '/ja': '風燕伝（燕雲十六声）'
    },
    alternateNames: [
      'Where Winds Meet',
      '燕云十六声',
      '風燕伝',
      'Yanyun Shiliu Sheng'
    ],
    developer: 'Everstone Studio',
    developerZh: 'Everstone 工作室',
    publisher: 'NetEase Games',
    genre: ['Open World', 'Action RPG', 'Wuxia'],
    genreZh: ['开放世界', '动作角色扮演', '武侠'],
    genreJa: ['オープンワールド', 'アクションRPG', '武侠'],
    gamePlatform: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'iOS', 'Android'],
    operatingSystem: ['Windows 10/11', 'iOS', 'Android']
  },
  '/projects/tides-of-annihilation': {
    name: {
      '': 'Tides of Annihilation',
      '/zh': '湮灭之潮',
      '/ja': 'Tides of Annihilation'
    },
    alternateNames: ['Tides of Annihilation', '湮灭之潮'],
    developer: 'Eclipse Glow Games',
    developerZh: '日蚀微光',
    publisher: 'Eclipse Glow Games',
    genre: ['Action RPG', 'Dark Fantasy', 'Arthurian Legend'],
    genreZh: ['动作角色扮演', '暗黑奇幻', '亚瑟王传奇'],
    genreJa: ['アクションRPG', 'ダークファンタジー', 'アーサー王伝説'],
    gamePlatform: ['PC', 'PlayStation 5', 'PlayStation 5 Pro', 'Xbox Series X/S'],
    operatingSystem: ['Windows']
  }
}

const SCHEMA_TYPES = {
  home: 'WebSite',
  collection: 'CollectionPage',
  tool: 'WebPage',
  game: 'ItemPage',
  article: 'Article'
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(path.join(dir, entry.name), out)
    } else {
      out.push(path.join(dir, entry.name))
    }
  }
  return out
}

export function routeFromRel(rel) {
  const clean = rel.replace(/\\/g, '/').replace(/\.md$/, '')
  let route = `/${clean}`
  if (route.endsWith('/index')) route = route.slice(0, -'index'.length)
  if (route === '/index') route = '/'
  return route
}

export function splitLocale(route) {
  if (route === '/zh' || route.startsWith('/zh/')) {
    return { prefix: '/zh', base: route.slice(3) || '/' }
  }
  if (route === '/ja' || route.startsWith('/ja/')) {
    return { prefix: '/ja', base: route.slice(3) || '/' }
  }
  return { prefix: '', base: route }
}

export function withPrefix(base, prefix) {
  if (prefix === '') return base
  return base === '/' ? `${prefix}/` : `${prefix}${base}`
}

export function createPageIndex(root = PROJECT_ROOT) {
  const routes = new Set()
  for (const file of walk(root)) {
    if (!file.endsWith('.md')) continue
    routes.add(routeFromRel(path.relative(root, file)))
  }
  return routes
}

/** 统一去掉末尾斜杠，便于把页面路由映射回源文件。 */
export function normalizeRoute(route) {
  if (route === '/') return '/'
  return route.replace(/\/+$/, '') || '/'
}

/** 路由 -> 仓库内相对路径（如 /zh/projects -> zh/projects.md）。 */
export function createRouteFileMap(root = PROJECT_ROOT) {
  const map = new Map()
  for (const file of walk(root)) {
    if (!file.endsWith('.md')) continue
    const rel = path.relative(root, file).replace(/\\/g, '/')
    map.set(normalizeRoute(routeFromRel(rel)), rel)
  }
  return map
}

function pageKind(route) {
  const { base } = splitLocale(route)
  const normalized = normalizeRoute(base)
  if (normalized === '/') return 'home'
  if (normalized === '/glossary' || normalized === '/quiz') return 'tool'
  if (GAME_METADATA[normalized]) return 'game'
  if (COLLECTION_ROUTES.has(normalized)) return 'collection'
  return 'article'
}

let gitLastDatesCache

function runGitLog(args) {
  try {
    return execFileSync('git', args, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024
    })
  } catch {
    return ''
  }
}

/**
 * 一次 git log 拿到每个文件的最后提交时间。
 * 拿不到 git 历史时返回空 Map，调用方会省略 lastmod 而不是写构建时间。
 */
export function getGitLastDates() {
  if (gitLastDatesCache) return gitLastDatesCache

  const dates = new Map()
  let date = ''
  for (const raw of runGitLog([
    'log',
    '--format=@@%cI',
    '--name-only',
    '--',
    '.'
  ]).split(/\r?\n/)) {
    const line = raw.trim()
    if (line.startsWith('@@')) {
      date = line.slice(2)
    } else if (line && date && !dates.has(line)) {
      dates.set(line, date)
    }
  }

  gitLastDatesCache = dates
  return dates
}

export function gitLastDate(relativePath) {
  return getGitLastDates().get(relativePath.replace(/\\/g, '/'))
}

function resolveOgImage(pageData, prefix) {
  const raw = pageData.frontmatter?.image
  if (raw) {
    const match = /^\/images\/(.+)$/.exec(raw)
    if (match) {
      const ogPath = `/images/og/${match[1]}`
      if (fs.existsSync(path.join(PROJECT_ROOT, 'public', ogPath.slice(1)))) {
        return { url: `${SITE_URL}${ogPath}`, width: 1200, height: 630 }
      }
    }
    return { url: new URL(raw, SITE_URL).href }
  }
  return {
    url: `${SITE_URL}${DEFAULT_OG[prefix] || DEFAULT_OG['']}`,
    width: 1200,
    height: 630
  }
}

const HOME_LABELS = {
  '': 'Home',
  '/zh': '首页',
  '/ja': 'ホーム'
}

const NEWS_LABELS = {
  '': 'News',
  '/zh': '资讯',
  '/ja': 'ニュース'
}

const PROJECTS_LABELS = {
  '': 'Projects',
  '/zh': '游戏项目',
  '/ja': 'プロジェクト'
}

/**
 * Adds hreflang alternates, canonical URL, social metadata and JSON-LD.
 * URLs themselves are untouched.
 */
export function createSeoTransform(pageIndex) {
  return ({ pageData, title, description, siteConfig }) => {
    const route = routeFromRel(pageData.relativePath)
    const { base, prefix } = splitLocale(route)
    const currentLocale =
      LOCALES.find((locale) => locale.prefix === prefix) || LOCALES[0]
    const url = `${SITE_URL}${route}`
    const isHome = route === '/' || route === '/zh/' || route === '/ja/'
    const pageTitle = pageData.title || title
    const pageDescription =
      pageData.frontmatter?.description ||
      description ||
      siteConfig.description
    const kind = pageKind(route)
    // 首页用带站点品牌与本地化副标题的通用图，其余页面优先用文章图。
    const image =
      kind === 'home'
        ? {
            url: `${SITE_URL}${DEFAULT_OG[prefix] || DEFAULT_OG['']}`,
            width: 1200,
            height: 630
          }
        : resolveOgImage(pageData, prefix)

    const alternates = LOCALES.map((locale) => ({
      ...locale,
      route: withPrefix(base, locale.prefix)
    })).filter((locale) => pageIndex.has(locale.route))

    const head = []
    for (const locale of alternates) {
      head.push([
        'link',
        {
          rel: 'alternate',
          hreflang: locale.code,
          href: `${SITE_URL}${locale.route}`
        }
      ])
    }

    const defaultRoute =
      alternates.find((locale) => locale.code === 'en')?.route || route
    head.push([
      'link',
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${SITE_URL}${defaultRoute}`
      }
    ])
    head.push(['link', { rel: 'canonical', href: url }])

    // Localized RSS feed
    const rssTitle =
      prefix === '/zh'
        ? 'China AAA Games 资讯 RSS 订阅'
        : prefix === '/ja'
          ? 'China AAA Games ニュース RSS フィード'
          : 'China AAA Games RSS Feed'
    const rssHref =
      prefix === '/zh'
        ? `${SITE_URL}/zh/feed.xml`
        : prefix === '/ja'
          ? `${SITE_URL}/ja/feed.xml`
          : `${SITE_URL}/feed.xml`

    head.push([
      'link',
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: rssTitle,
        href: rssHref
      }
    ])

    if (isHome && prefix === '') {
      head.push([
        'link',
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'China AAA Games 资讯 RSS 订阅 (中文)',
          href: `${SITE_URL}/zh/feed.xml`
        }
      ])
      head.push([
        'link',
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'China AAA Games ニュース RSS フィード (日本語)',
          href: `${SITE_URL}/ja/feed.xml`
        }
      ])
    }

    const pageKeywords = pageData.frontmatter?.keywords
    if (Array.isArray(pageKeywords) && pageKeywords.length > 0) {
      head.push(['meta', { name: 'keywords', content: pageKeywords.join(', ') }])
    } else if (typeof pageKeywords === 'string' && pageKeywords.trim()) {
      head.push(['meta', { name: 'keywords', content: pageKeywords.trim() }])
    }

    head.push(['meta', { property: 'og:title', content: title }])
    head.push([
      'meta',
      { property: 'og:description', content: pageDescription }
    ])
    head.push([
      'meta',
      {
        property: 'og:type',
        content: kind === 'article' ? 'article' : 'website'
      }
    ])
    head.push(['meta', { property: 'og:url', content: url }])
    head.push(['meta', { property: 'og:image', content: image.url }])
    if (image.width) {
      head.push([
        'meta',
        { property: 'og:image:width', content: String(image.width) }
      ])
    }
    if (image.height) {
      head.push([
        'meta',
        { property: 'og:image:height', content: String(image.height) }
      ])
    }
    head.push([
      'meta',
      { property: 'og:image:alt', content: pageTitle }
    ])
    head.push([
      'meta',
      { property: 'og:site_name', content: 'China AAA Games' }
    ])
    head.push([
      'meta',
      { property: 'og:locale', content: currentLocale.ogLocale }
    ])
    for (const locale of alternates) {
      if (locale.code === currentLocale.code) continue
      head.push([
        'meta',
        { property: 'og:locale:alternate', content: locale.ogLocale }
      ])
    }
    head.push(['meta', { name: 'twitter:title', content: title }])
    head.push([
      'meta',
      { name: 'twitter:description', content: pageDescription }
    ])
    head.push(['meta', { name: 'twitter:image', content: image.url }])
    head.push([
      'meta',
      { name: 'twitter:image:alt', content: pageTitle }
    ])
    head.push([
      'meta',
      {
        name: 'robots',
        content:
          'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      }
    ])

    const node = {
      '@context': 'https://schema.org',
      '@type': SCHEMA_TYPES[kind] || 'WebPage',
      url,
      description: pageDescription,
      image: [image.url],
      inLanguage: currentLocale.code
    }

    const graph = [node]

    if (kind === 'game') {
      const normalizedBase = normalizeRoute(base)
      const gameMeta = GAME_METADATA[normalizedBase]
      node.name = pageTitle
      if (gameMeta) {
        node.mainEntity = { '@id': `${url}#game` }

        const localizedGameName =
          gameMeta.name[prefix] || gameMeta.name['']
        const localizedDeveloper =
          prefix === '/zh' ? gameMeta.developerZh : gameMeta.developer
        const localizedGenre =
          prefix === '/zh'
            ? gameMeta.genreZh
            : prefix === '/ja'
              ? gameMeta.genreJa
              : gameMeta.genre

        const gameEntity = {
          '@context': 'https://schema.org',
          '@type': 'VideoGame',
          '@id': `${url}#game`,
          name: localizedGameName,
          alternateName: gameMeta.alternateNames,
          description: pageDescription,
          url,
          image: image.url,
          genre: localizedGenre,
          gamePlatform: gameMeta.gamePlatform,
          operatingSystem: gameMeta.operatingSystem,
          applicationCategory: 'Game',
          author: {
            '@type': 'Organization',
            name: localizedDeveloper
          },
          publisher: {
            '@type': 'Organization',
            name: gameMeta.publisher
          },
          inLanguage: currentLocale.code
        }
        graph.push(gameEntity)
      }
    } else if (kind === 'article') {
      node.headline = pageTitle
      node.mainEntityOfPage = { '@type': 'WebPage', '@id': url }
      node.author = {
        '@type': 'Organization',
        name: 'China AAA Games',
        url: SITE_URL
      }
      node.publisher = {
        '@type': 'Organization',
        name: 'China AAA Games',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
      }
      const publishedDate = pageData.frontmatter?.date
        ? new Date(pageData.frontmatter.date)
        : null
      if (publishedDate && !Number.isNaN(publishedDate.getTime())) {
        node.datePublished = publishedDate.toISOString()
        head.push([
          'meta',
          {
            property: 'article:published_time',
            content: publishedDate.toISOString()
          }
        ])
      }
    } else {
      node.name = kind === 'home' ? 'China AAA Games' : pageTitle
    }

    if (pageData.lastUpdated) {
      const modified = new Date(pageData.lastUpdated)
      if (!Number.isNaN(modified.getTime())) {
        node.dateModified = modified.toISOString()
        if (kind === 'article') {
          head.push([
            'meta',
            {
              property: 'article:modified_time',
              content: modified.toISOString()
            }
          ])
        }
      }
    }

    if (!isHome) {
      const breadcrumbs = [
        {
          '@type': 'ListItem',
          position: 1,
          name: HOME_LABELS[prefix] || 'Home',
          item: `${SITE_URL}${prefix || ''}/`
        }
      ]
      const normalizedBase = normalizeRoute(base)
      if (kind === 'article' && base.startsWith('/news/')) {
        breadcrumbs.push({
          '@type': 'ListItem',
          position: 2,
          name: NEWS_LABELS[prefix] || 'News',
          item: `${SITE_URL}${prefix || ''}/news/`
        })
      } else if (
        (kind === 'game' || base.startsWith('/projects/')) &&
        normalizedBase !== '/projects'
      ) {
        breadcrumbs.push({
          '@type': 'ListItem',
          position: 2,
          name: PROJECTS_LABELS[prefix] || 'Projects',
          item: `${SITE_URL}${prefix || ''}/projects`
        })
        if (
          base.startsWith('/projects/zhong-kui/') &&
          normalizedBase !== '/projects/zhong-kui'
        ) {
          const zkName =
            GAME_METADATA['/projects/zhong-kui']?.name[prefix] ||
            'Black Myth: Zhong Kui'
          breadcrumbs.push({
            '@type': 'ListItem',
            position: 3,
            name: zkName,
            item: `${SITE_URL}${prefix || ''}/projects/zhong-kui`
          })
        }
      }
      breadcrumbs.push({
        '@type': 'ListItem',
        position: breadcrumbs.length + 1,
        name: pageTitle,
        item: url
      })
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs
      })
    }

    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    ])

    return head
  }
}
