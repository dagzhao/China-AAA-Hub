import fs from 'node:fs'
import path from 'node:path'
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

const HOME_LABELS = {
  '': 'Home',
  '/zh': '首页',
  '/ja': 'ホーム'
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
    const image = pageData.frontmatter?.image
      ? new URL(pageData.frontmatter.image, SITE_URL).href
      : `${SITE_URL}/logo.png`

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
      { property: 'og:type', content: isHome ? 'website' : 'article' }
    ])
    head.push(['meta', { property: 'og:url', content: url }])
    head.push(['meta', { property: 'og:image', content: image }])
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
    head.push(['meta', { name: 'twitter:image', content: image }])
    head.push([
      'meta',
      {
        name: 'robots',
        content:
          'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      }
    ])

    const article = {
      '@context': 'https://schema.org',
      '@type': isHome ? 'WebSite' : 'Article',
      name: isHome ? 'China AAA Games' : undefined,
      headline: isHome ? undefined : pageTitle,
      url,
      description: pageDescription,
      image: [image],
      inLanguage: currentLocale.code,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      author: { '@type': 'Organization', name: 'China AAA Games', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'China AAA Games',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
      }
    }
    if (isHome) {
      delete article.headline
      delete article.mainEntityOfPage
      delete article.author
      delete article.publisher
    } else {
      delete article.name
    }
    if (pageData.frontmatter?.date) {
      article.datePublished = new Date(
        pageData.frontmatter.date
      ).toISOString()
    }
    if (pageData.lastUpdated) {
      article.dateModified = new Date(pageData.lastUpdated).toISOString()
    }

    const graph = [article]
    if (!isHome) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: HOME_LABELS[prefix] || 'Home',
            item: `${SITE_URL}${prefix || ''}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageTitle,
            item: url
          }
        ]
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
