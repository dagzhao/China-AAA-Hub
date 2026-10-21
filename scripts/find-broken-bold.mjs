#!/usr/bin/env node
/**
 * Finds Markdown lines where a bold span does not render because the closing
 * `**` is preceded by punctuation and followed by a letter (CJK), e.g.
 * `**沈括（1031–1095）**は`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMarkdownRenderer } from 'vitepress'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const FENCE = /^\s*(?:```|~~~)/

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.vitepress') continue
      walk(path.join(dir, entry.name), out)
    } else if (entry.name.endsWith('.md')) {
      out.push(path.join(dir, entry.name))
    }
  }
  return out
}

const md = await createMarkdownRenderer(ROOT, {}, '/')
const targetDir = process.argv[2] || 'ja'
let files = 0
let linesFound = 0

for (const file of walk(path.join(ROOT, targetDir))) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  let inFence = false
  const bad = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (FENCE.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence || !line.includes('**')) continue
    if (md.render(line).includes('**')) bad.push([index + 1, line])
  }
  if (bad.length) {
    files += 1
    linesFound += bad.length
    console.log(`=== ${path.relative(ROOT, file)} (${bad.length})`)
    for (const [lineNumber, line] of bad) {
      console.log(`${lineNumber}: ${line.slice(0, 200)}`)
    }
  }
}

console.log(`\n${files} file(s), ${linesFound} broken line(s)`)

if (linesFound > 0) process.exit(1)
