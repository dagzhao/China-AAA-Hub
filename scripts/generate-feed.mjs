/**
 * Generate RSS 2.0 feeds for en, zh, and ja news articles.
 *
 * Output targets:
 *  - public/feed.xml (English)
 *  - public/zh/feed.xml (Chinese)
 *  - public/ja/feed.xml (Japanese)
 *  - .vitepress/dist/* if dist exists or when called with outDir
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const SITE_URL = 'https://china3agames.com'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const FEED_CONFIGS = [
  {
    locale: 'en',
    newsDir: 'news',
    routePrefix: '/news',
    feedPath: 'feed.xml',
    title: 'China AAA Games - Latest News & In-Depth Reporting',
    link: `${SITE_URL}/news/`,
    selfUrl: `${SITE_URL}/feed.xml`,
    description:
      'Decoding the new era of Chinese AAA games. Breaking news, milestone reports, and in-depth analysis on Black Myth: Wukong, Zhong Kui, Phantom Blade Zero, and upcoming titles.',
    language: 'en-US'
  },
  {
    locale: 'zh',
    newsDir: 'zh/news',
    routePrefix: '/zh/news',
    feedPath: 'zh/feed.xml',
    title: 'China AAA Games - 深度资讯与独家报道',
    link: `${SITE_URL}/zh/news/`,
    selfUrl: `${SITE_URL}/zh/feed.xml`,
    description:
      '解码中国 3A 游戏新纪元。聚焦《黑神话：悟空》《黑神话：钟馗》《影之刃零》《燕云十六声》等前沿资讯、发售日历、销量里程碑与独家深度拆解。',
    language: 'zh-CN'
  },
  {
    locale: 'ja',
    newsDir: 'ja/news',
    routePrefix: '/ja/news',
    feedPath: 'ja/feed.xml',
    title: 'China AAA Games - 最新ニュース＆深層解説',
    link: `${SITE_URL}/ja/news/`,
    selfUrl: `${SITE_URL}/ja/feed.xml`,
    description:
      '中国発AAAゲームの新時代を読み解く。『黒神話：悟空』『黒神話：鍾馗』『ファントムブレイド ゼロ』などの最新動向、発売カレンダー、開発者インタビューを速報。',
    language: 'ja-JP'
  }
]

function parseFrontmatter(content) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(content)
  if (!match) return {}
  const yaml = match[1]
  const data = {}
  let currentKey = null
  let inArray = false

  for (const line of yaml.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const arrayItemMatch = /^-\s+(.*)$/.exec(trimmed)
    if (arrayItemMatch && currentKey && inArray) {
      let val = arrayItemMatch[1].trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      data[currentKey].push(val)
      continue
    }

    const kvMatch = /^([a-zA-Z0-9_-]+):\s*(.*)$/.exec(trimmed)
    if (kvMatch) {
      currentKey = kvMatch[1]
      let val = kvMatch[2].trim()
      if (!val) {
        data[currentKey] = []
        inArray = true
      } else {
        inArray = false
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1)
        }
        data[currentKey] = val
      }
    }
  }
  return data
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Make a string safe to embed in a CDATA section by escaping the end marker. */
function safeCdata(str) {
  return String(str || '').replace(/]]>/g, ']]]]><![CDATA[>')
}

function getMimeType(imagePath) {
  if (/\.png$/i.test(imagePath)) return 'image/png'
  if (/\.webp$/i.test(imagePath)) return 'image/webp'
  if (/\.gif$/i.test(imagePath)) return 'image/gif'
  return 'image/jpeg'
}

export function generateFeedXml(config, rootDir = ROOT) {
  const newsDirPath = path.join(rootDir, config.newsDir)
  if (!fs.existsSync(newsDirPath)) {
    return ''
  }

  const files = fs
    .readdirSync(newsDirPath)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')

  const items = []

  for (const file of files) {
    const filePath = path.join(newsDirPath, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const fm = parseFrontmatter(content)
    const slug = file.replace(/\.md$/, '')
    const url = `${SITE_URL}${config.routePrefix}/${slug}`

    let pubDate = new Date()
    if (fm.date) {
      const parsed = new Date(fm.date)
      if (!Number.isNaN(parsed.getTime())) {
        pubDate = parsed
      }
    }

    items.push({
      title: fm.title || slug,
      url,
      description: fm.description || '',
      date: pubDate,
      image: fm.image ? `${SITE_URL}${fm.image}` : null,
      mimeType: fm.image ? getMimeType(fm.image) : null,
      keywords: Array.isArray(fm.keywords) ? fm.keywords : []
    })
  }

  items.sort((a, b) => b.date.getTime() - a.date.getTime())

  const lastBuildDate = new Date().toUTCString()

  const xmlItems = items
    .map((item) => {
      const categoriesXml = item.keywords
        .map((k) => `      <category><![CDATA[${safeCdata(k)}]]></category>`)
        .join('\n')

      const enclosureXml = item.image
        ? `      <enclosure url="${escapeXml(item.image)}" length="0" type="${item.mimeType}" />`
        : ''

      return `    <item>
      <title><![CDATA[${safeCdata(item.title)}]]></title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description><![CDATA[${safeCdata(item.description)}]]></description>
${categoriesXml ? categoriesXml + '\n' : ''}${enclosureXml ? enclosureXml + '\n' : ''}    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${safeCdata(config.title)}]]></title>
    <link>${escapeXml(config.link)}</link>
    <description><![CDATA[${safeCdata(config.description)}]]></description>
    <language>${config.language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(config.selfUrl)}" rel="self" type="application/rss+xml"/>
${xmlItems}
  </channel>
</rss>
`
}

export function writeFeeds(targetDir, rootDir = ROOT) {
  for (const config of FEED_CONFIGS) {
    const xml = generateFeedXml(config, rootDir)
    if (!xml) continue

    const outPath = path.join(targetDir, config.feedPath)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, xml, 'utf8')
    console.log(`✓ Generated RSS Feed: ${outPath}`)
  }
}

export function runAll(rootDir = ROOT) {
  // Always write to public/
  const publicDir = path.join(rootDir, 'public')
  writeFeeds(publicDir, rootDir)

  // If .vitepress/dist exists, also write directly to dist
  const distDir = path.join(rootDir, '.vitepress', 'dist')
  if (fs.existsSync(distDir)) {
    writeFeeds(distDir, rootDir)
  }
}

if (process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url)) {
  const customTarget = process.argv[2]
  if (customTarget) {
    writeFeeds(path.resolve(customTarget))
  } else {
    runAll()
  }
}
