#!/usr/bin/env node
/**
 * Structural checks for the three-language content tree.
 *
 * Errors (exit 1):
 *  - an English page without /zh or /ja counterparts
 *  - a broken internal link
 *  - a missing image/video under /public
 *
 * Warnings (exit 0):
 *  - an orphan translation
 *  - heading / image / video count drift between locales
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import enLocale from '../.vitepress/i18n/en.mjs'
import zhLocale from '../.vitepress/i18n/zh.mjs'
import jaLocale from '../.vitepress/i18n/ja.mjs'
import { newsItems } from '../.vitepress/navigation.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.claude',
  '.vitepress',
  '_shots',
  'public'
])
const LOCALES = [
  { name: 'en', prefix: '' },
  { name: 'zh', prefix: '/zh' },
  { name: 'ja', prefix: '/ja' }
]

const errors = []
const warnings = []

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

function toPosix(value) {
  return value.replace(/\\/g, '/')
}

function routeOf(file) {
  const rel = toPosix(path.relative(ROOT, file)).replace(/\.md$/, '')
  let route = `/${rel}`
  if (route.endsWith('/index')) route = route.slice(0, -'index'.length)
  if (route === '/index') route = '/'
  return route
}

function baseOf(route) {
  for (const locale of LOCALES) {
    if (!locale.prefix) continue
    if (route === locale.prefix) return '/'
    if (route.startsWith(`${locale.prefix}/`)) {
      return route.slice(locale.prefix.length) || '/'
    }
  }
  return route
}

function localize(base, prefix) {
  if (!prefix) return base
  return base === '/' ? `${prefix}/` : `${prefix}${base}`
}

function stripCode(markdown) {
  return markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
}

function collectTargets(markdown) {
  const text = stripCode(markdown)
  const targets = []
  const markdownLink = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g
  const htmlAttr = /\b(?:href|src)=["']([^"']+)["']/g
  let match
  while ((match = markdownLink.exec(text))) targets.push(match[1])
  while ((match = htmlAttr.exec(text))) targets.push(match[1])
  return targets
}

function isExternal(target) {
  return (
    /^(?:https?:)?\/\//i.test(target) ||
    /^(?:mailto|tel|data|javascript):/i.test(target)
  )
}

function isFile(file) {
  try {
    return fs.statSync(file).isFile()
  } catch {
    return false
  }
}

function checkTarget(target, fromFile, pages) {
  if (!target || isExternal(target)) return

  let clean = target.split('#')[0].split('?')[0].trim()
  if (!clean) return

  try {
    clean = decodeURI(clean)
  } catch {
    // Keep the raw value; a malformed escape will fail the lookup below.
  }

  if (clean.startsWith('/')) {
    const publicFile = path.join(ROOT, 'public', clean.slice(1))
    if (isFile(publicFile)) return

    const route = clean.replace(/\.html$/, '').replace(/\/$/, '') || '/'
    if (
      pages.has(route) ||
      pages.has(`${route}/`) ||
      pages.has(route === '/' ? '/' : route)
    ) {
      return
    }

    errors.push(
      `${toPosix(path.relative(ROOT, fromFile))}: broken internal link "${target}"`
    )
    return
  }

  const resolved = path.resolve(path.dirname(fromFile), clean)
  const candidates = [
    resolved,
    `${resolved}.md`,
    path.join(resolved, 'index.md')
  ]
  if (candidates.some(isFile)) return

  errors.push(
    `${toPosix(path.relative(ROOT, fromFile))}: broken relative link "${target}"`
  )
}

function headingCounts(markdown) {
  const lines = markdown.split(/\r?\n/)
  return {
    h2: lines.filter((line) => /^##\s/.test(line)).length,
    h3: lines.filter((line) => /^###\s/.test(line)).length,
    images:
      (markdown.match(/!\[[^\]]*\]\(/g) || []).length +
      (markdown.match(/<img\b/gi) || []).length,
    videos: (markdown.match(/<video\b/gi) || []).length
  }
}

const files = walk(ROOT).filter((file) => file.endsWith('.md'))
const pages = new Map(files.map((file) => [routeOf(file), file]))
const markdownByRoute = new Map(
  files.map((file) => [routeOf(file), fs.readFileSync(file, 'utf8')])
)

console.log(`i18n check: ${files.length} markdown files\n`)

const englishRoutes = [...pages.keys()].filter(
  (route) =>
    route === '/' ||
    (route !== '/zh' &&
      route !== '/ja' &&
      !route.startsWith('/zh/') &&
      !route.startsWith('/ja/'))
)

for (const route of englishRoutes) {
  if (!route) continue
  for (const locale of LOCALES.slice(1)) {
    const counterpart = localize(route, locale.prefix)
    if (!pages.has(counterpart)) {
      errors.push(
        `missing ${locale.name} counterpart for "${route}" -> "${counterpart}"`
      )
    }
  }
}

for (const route of pages.keys()) {
  const base = baseOf(route)
  if (base === route) continue
  if (!pages.has(base)) {
    warnings.push(`orphan translation "${route}" (no English page "${base}")`)
  }
}

for (const [route, file] of pages) {
  const markdown = markdownByRoute.get(route)
  for (const target of collectTargets(markdown)) {
    checkTarget(target, file, pages)
  }
}

for (const route of englishRoutes) {
  const en = markdownByRoute.get(route)
  if (!en) continue
  const baseline = headingCounts(en)
  for (const locale of LOCALES.slice(1)) {
    const counterpart = localize(route, locale.prefix)
    const translated = markdownByRoute.get(counterpart)
    if (!translated) continue
    const counts = headingCounts(translated)
    for (const key of ['h2', 'h3', 'images', 'videos']) {
      if (counts[key] !== baseline[key]) {
        warnings.push(
          `structure drift "${counterpart}": ${key} ${counts[key]} vs en ${baseline[key]}`
        )
      }
    }
  }
}

// --- 导航一致性校验 (Navigation Consistency Checks) ---
const registeredNewsPaths = new Set(newsItems.map((item) => item.path))

// 1. 检查 news/*.md 是否均已注册到 navigation.mjs
const newsFiles = fs
  .readdirSync(path.join(ROOT, 'news'))
  .filter((f) => f.endsWith('.md') && f !== 'index.md')

for (const f of newsFiles) {
  const expectedPath = `/news/${f.replace(/\.md$/, '')}`
  if (!registeredNewsPaths.has(expectedPath)) {
    errors.push(
      `news/${f} is not registered in .vitepress/navigation.mjs newsItems (expected path: "${expectedPath}")`
    )
  }
}

// 2. 检查 newsItems 中的条目是否真实存在对应 markdown 文件
for (const item of newsItems) {
  const relPath = `${item.path.slice(1)}.md`
  const absPath = path.join(ROOT, relPath)
  if (!isFile(absPath)) {
    errors.push(
      `navigation.mjs newsItem "${item.key}" references non-existent file "${relPath}"`
    )
  }
}

// 3. 检查三语 locales 中 sidebar 对应 key 的 label 是否齐全
const localesWithData = [
  { name: 'en', data: enLocale },
  { name: 'zh', data: zhLocale },
  { name: 'ja', data: jaLocale }
]

for (const item of newsItems) {
  for (const { name, data } of localesWithData) {
    if (!data.labels?.sidebar?.[item.key]) {
      errors.push(
        `missing sidebar label for newsItem "${item.key}" in .vitepress/i18n/${name}.mjs`
      )
    }
  }
}

for (const warning of warnings) console.warn(`WARN  ${warning}`)
for (const error of errors) console.error(`ERROR ${error}`)

console.log(
  `\n${errors.length} error(s), ${warnings.length} warning(s)`
)

if (errors.length > 0) process.exit(1)
