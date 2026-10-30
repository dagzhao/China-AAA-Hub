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
  '/culture',
  '/projects/zhong-kui'
])

const SCHEMA_TYPES = {
  home: 'WebSite',
  collection: 'CollectionPage',
  tool: 'WebPage',
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
      '@type': SCHEMA_TYPES[kind],
      url,
      description: pageDescription,
      image: [image.url],
      inLanguage: currentLocale.code
    }

    if (kind === 'article') {
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

    const graph = [node]
    if (!isHome) {
      const breadcrumbs = [
        {
          '@type': 'ListItem',
          position: 1,
          name: HOME_LABELS[prefix] || 'Home',
          item: `${SITE_URL}${prefix || ''}/`
        }
      ]
      if (kind === 'article' && base.startsWith('/news/')) {
        breadcrumbs.push({
          '@type': 'ListItem',
          position: 2,
          name: NEWS_LABELS[prefix] || 'News',
          item: `${SITE_URL}${prefix || ''}/news/`
        })
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
