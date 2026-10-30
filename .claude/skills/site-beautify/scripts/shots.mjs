#!/usr/bin/env node
/**
 * 精确视口 + 整页截图（零依赖，只用 Node 内置 WebSocket 与 Chrome 的 CDP）。
 *
 * 为什么不用 `chrome --screenshot --window-size=N`：
 *   1. Windows 上无头窗口有最小宽度钳制：--window-size=390 实际视口是 500px，
 *      PNG 只是被裁成 390 宽 —— 看起来"右边被切掉"是假象，不是真的横向溢出。
 *   2. window-size 与真实视口不等：--window-size=1440,900 的真实视口是 1424x805。
 *   3. CLI 只能截视口，长页面截不全。
 *   CDP 的 Emulation.setDeviceMetricsOverride + Page.captureScreenshot(captureBeyondViewport)
 *   把这三个问题一次解决。
 *
 * 用法:
 *   node shots.mjs <base-url> <out-dir> <path> [<path> ...]
 *   node shots.mjs http://localhost:5199 _shots/beautify / /zh/ /quiz
 *
 * 每个路径产出 <slug>.desktop.png（1440 视口整页）和 <slug>.mobile.png（390 视口整页）。
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { tmpdir } from 'node:os'

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
  mobile: { width: 390, height: 844, deviceScaleFactor: 1, mobile: true },
}
const SETTLE_MS = 1200 // 等字体、过渡动画、异步组件稳定
const MAX_PIXELS = 10_000_000 // 单张整页截图的像素上限，超了就截断并告警

const BROWSERS = [
  process.env.CHROME_BIN,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean)

const [base, outDir, ...paths] = process.argv.slice(2)
if (!base || !outDir || paths.length === 0) {
  console.error('用法: node shots.mjs <base-url> <out-dir> <path> [<path> ...]')
  process.exit(1)
}

const browserPath = BROWSERS.find((p) => existsSync(p))
if (!browserPath) {
  console.error('找不到 Chrome 或 Edge，无法截图')
  process.exit(1)
}

const profile = join(tmpdir(), `site-beautify-cdp-${Date.now()}`)
// 端口用 0：让 Chrome 自己挑一个空闲端口，把实际端口写进 profile/DevToolsActivePort。
// 千万别改回固定端口 —— 上一次运行的残留 Chrome 会一直占着它，
// 之后每一次运行都会在等 endpoint 的循环里白白卡满超时。
const chrome = spawn(
  browserPath,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function endpoint() {
  const portFile = join(profile, 'DevToolsActivePort')
  let lastErr = ''
  for (let i = 0; i < 80; i++) {
    try {
      const [port] = readFileSync(portFile, 'utf8').split('\n')
      if (port && port.trim()) {
        // 必须给 fetch 超时：Node 的 fetch 默认不超时，端点接了连接却不回话就会永久挂住
        const r = await fetch(`http://127.0.0.1:${port.trim()}/json/version`, {
          signal: AbortSignal.timeout(5000),
        })
        if (r.ok) return (await r.json()).webSocketDebuggerUrl
        lastErr = `/json/version 返回 HTTP ${r.status}`
      } else {
        lastErr = 'DevToolsActivePort 内容为空'
      }
    } catch (e) {
      lastErr = e.message
    }
    await sleep(250)
  }
  throw new Error(`Chrome 的 CDP 端口没起来：${lastErr}`)
}

/** 极简 CDP 客户端：按 id 配对响应，支持 flatten 会话 */
function connect(wsUrl) {
  const ws = new WebSocket(wsUrl)
  const pending = new Map()
  const waiters = []
  let nextId = 1

  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve: res, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(`${msg.error.message} (${msg.error.code})`)) : res(msg.result)
    } else if (msg.method) {
      for (let i = waiters.length - 1; i >= 0; i--) {
        if (waiters[i].method === msg.method) waiters.splice(i, 1)[0].resolve(msg.params)
      }
    }
  })

  // 也要给 open 加超时：连不上时 addEventListener('error') 不一定会触发
  const ready = new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('CDP WebSocket 连接超时（15s）')), 15000)
    ws.addEventListener('open', () => {
      clearTimeout(t)
      res()
    })
    ws.addEventListener('error', () => {
      clearTimeout(t)
      rej(new Error('CDP WebSocket 连接失败'))
    })
  })

  return {
    ready,
    send(method, params = {}, sessionId, timeoutMs = 20000) {
      const id = nextId++
      const payload = { id, method, params }
      if (sessionId) payload.sessionId = sessionId
      return new Promise((res, rej) => {
        // 同样要超时，否则某个命令不回话就会把整轮跑挂住、还不报错
        const t = setTimeout(() => {
          pending.delete(id)
          rej(new Error(`CDP 命令 ${method} 超时（${timeoutMs / 1000}s）`))
        }, timeoutMs)
        pending.set(id, {
          resolve: (v) => {
            clearTimeout(t)
            res(v)
          },
          reject: (e) => {
            clearTimeout(t)
            rej(e)
          },
        })
        ws.send(JSON.stringify(payload))
      })
    },
    once(method, timeoutMs = 30000) {
      return new Promise((res, rej) => {
        const t = setTimeout(() => rej(new Error(`等待 ${method} 超时`)), timeoutMs)
        waiters.push({
          method,
          resolve: (p) => {
            clearTimeout(t)
            res(p)
          },
        })
      })
    },
    close: () => ws.close(),
  }
}

const slugOf = (p) =>
  p.replace(/^\/|\/$/g, '').replace(/\//g, '_').replace(/[^\w-]/g, '') || 'index'

let client
try {
  client = connect(await endpoint())
  await client.ready

  const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true })
  await client.send('Page.enable', {}, sessionId)
  await client.send('Runtime.enable', {}, sessionId)

  const dest = resolve(outDir)
  mkdirSync(dest, { recursive: true })

  for (const p of paths) {
    const url = `${base.replace(/\/$/, '')}/${p.replace(/^\//, '')}`
    const slug = slugOf(p)
    for (const [name, vp] of Object.entries(VIEWPORTS)) {
      await client.send(
        'Emulation.setDeviceMetricsOverride',
        { ...vp, screenOrientation: { angle: 0, type: 'portraitPrimary' } },
        sessionId
      )
      const loaded = client.once('Page.loadEventFired')
      await client.send('Page.navigate', { url }, sessionId)
      await loaded
      await sleep(SETTLE_MS)

      // 横向溢出自查。别只看 PNG 宽度：视口宽是被 setDeviceMetricsOverride 锁死的，
      // 真有溢出会被裁掉而不是把图撑宽，所以"图正好 390 宽"证明不了没有溢出。
      // 唯一的硬证据是直接量 scrollWidth。
      const probe = await client.send(
        'Runtime.evaluate',
        {
          expression:
            'JSON.stringify({vw:innerWidth,sw:document.documentElement.scrollWidth,bw:document.body.scrollWidth})',
          returnByValue: true,
        },
        sessionId
      )
      const m = JSON.parse(probe.result.value)
      const widest = Math.max(m.sw, m.bw, m.vw)
      if (widest > m.vw) {
        console.log(`  !! ${slug}.${name} 横向溢出: scrollWidth=${widest} > 视口 ${m.vw}`)
      }

      // 整页截图：先量内容真实高度，再按该高度重新布局，最后截图。
      // 只加 captureBeyondViewport 不够 —— 视口高度被 setDeviceMetricsOverride 钉死了，
      // 那样截出来永远只有一屏。
      const metrics = await client.send('Page.getLayoutMetrics', {}, sessionId)
      const content = metrics.cssContentSize || metrics.contentSize
      const wantHeight = Math.ceil(content.height)
      // 按「总像素」封顶，不是按高度：桌面 1440 宽下 2 万像素就是 2880 万像素，
      // 合成会跑到几百秒还超时；同样高度的移动端（390 宽）只有 1/4 像素，没问题。
      const fullHeight = Math.min(wantHeight, Math.floor(MAX_PIXELS / vp.width))
      if (fullHeight < wantHeight) {
        console.log(
          `  !! ${slug}.${name} 页面过长（${wantHeight}px），只截到 ${fullHeight}px ` +
            `——下半部分需要单独切片看`
        )
      }
      await client.send(
        'Emulation.setDeviceMetricsOverride',
        { ...vp, height: fullHeight, screenOrientation: { angle: 0, type: 'portraitPrimary' } },
        sessionId
      )
      await sleep(400)
      // 长页（本站 lore 页上万像素、配图多）整页合成要几十秒，默认 20s 不够
      const { data } = await client.send(
        'Page.captureScreenshot',
        { format: 'png' },
        sessionId,
        120000
      )
      const file = join(dest, `${slug}.${name}.png`)
      writeFileSync(file, Buffer.from(data, 'base64'))
      console.log(`  ok  ${file}`)
    }
  }
} catch (e) {
  console.error(`截图失败: ${e.message}`)
  process.exitCode = 1
} finally {
  client?.close()
  chrome.kill()
  await sleep(400)
  try {
    unlinkSync(join(profile, 'SingletonLock'))
  } catch {
    /* 无所谓 */
  }
}
