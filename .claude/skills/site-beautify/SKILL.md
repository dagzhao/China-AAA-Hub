---
name: site-beautify
description: 对这个 VitePress 三语站点（China AAA Games / mythos-china）做视觉美化与 UI 打磨。当用户说"美化一下"、"美化这个站点"、"页面不好看"、"改改样式"、"polish the UI"、"beautify the site"、"视觉上优化一下"、"样式统一一下" 等说法时使用。流程固定为：起服务 → 无头截图 → 审查 → 改动 → 再截图对比 → 跑 build 验收。强调"并行找问题、串行做决定"，因为审美必须一只手做决定。
---

# 站点美化（China AAA Games）

给本站做视觉层改造。**核心纪律：样式可以大改，文案一个字都不许动。**

## 触发条件

用户说"美化一下"、"美化这个站点"、"页面不好看"、"样式统一一下"、"polish the UI" 之类
即触发。用户没明说力度时，**先问**是"保守打磨"（修可见缺陷、统一细节）还是"大胆改造"
（重做 hero / 卡片体系 / 排版层级）——两者的改动面差一个数量级。

## 前置检查

1. **开发服务器**。没有就起一个（换端口避免撞车）：
   ```bash
   npm run dev -- --port 5199 > /tmp/vpdev.log 2>&1 &
   curl -s -o /dev/null -w "%{http_code}" http://localhost:5199/   # 要 200
   ```
2. **截图能力**。本机 Chrome / Edge 就够，**不需要装 Playwright**。

## 截图

```bash
sh "${CLAUDE_SKILL_DIR}/scripts/shots.sh" http://localhost:5199 _shots/beautify \
   / /zh/ /ja/ /projects /culture/basics /culture/taoism /quiz /glossary
```

每个路径出两张**整页**截图：`*.desktop.png`（真实 1440 视口）和 `*.mobile.png`（真实 390 视口）。
`_shots/` 已在 `.gitignore` 里，随便写。看完记得删掉不再需要的图，别让它无限膨胀。

实现在 `shots.mjs`，走 Chrome DevTools Protocol。**不要退回 `chrome --screenshot --window-size=N`**，
那条路在 Windows 上有三个硬伤（2026-10 实测确认）：

1. **无头窗口有最小宽度钳制**：`--window-size=390` 的真实视口是 **500px**，PNG 只是被裁成 390 宽。
   截出来的"右边被切掉"是假象——会导出完全错误的响应式结论。
2. **视口 ≠ window-size**：`--window-size=1440,900` 的真实视口是 **1424x805**。
3. **只能截视口**，长页面（本站首页 4600px+）截不全。

`shots.sh` 里设了 `MSYS_NO_PATHCONV=1`。**少了它，Git Bash 会把参数里的 `/` 改写
成 `C:/Program Files/Git`**，URL 和输出文件名全乱。

脚本会自己量 `documentElement.scrollWidth`，溢出时打印 `!! <slug>.<视口> 横向溢出: …`。

**判断"有没有横向溢出"只能靠那行 `!!`，不能靠看图。** 视口宽度是被 CDP 锁死的，
真有溢出会被**裁掉**而不是把图撑宽——所以"图正好 390 宽"证明不了任何事。
（这条是审查 agent 指出来的，我第一次写脚本时确实漏了。）

### 整页截图有像素上限（`MAX_PIXELS`，默认 1000 万）

超过就截断并打印 `!! <slug> 页面过长（Npx），只截到 Mpx`。

**这个上限不能调高。** 开销是超线性的（大画布的图片解码），实测同一个 lore 页：
600 万像素 5.8 秒完成，**1500 万像素跑满 120 秒还超时**。10M 是实测下来的平衡点——
首页（4671px）、文化长文（6630px）都能完整截到，只有超过 11000px 的页会截断。

**看到截断告警时不要以为页面就是这样**，下半部分要单独看：把上限临时调小分段截，
或直接看 `_shots/` 里已有的 1:1 切片（审查 agent 用过这招，因为整页 PNG 被 Read
缩放后根本读不出字）。

### 脚本被强杀会留下无头 Chrome

`finally` 里的 `chrome.kill()` 来不及执行，残留实例会一直占着资源，让之后**每一次**
运行都在等待循环里空转。表现是"莫名其妙每次都卡满超时、还不报错"。清法：

```bash
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='chrome.exe'\" |
  Where-Object { \$_.CommandLine -like '*site-beautify-cdp*' } |
  ForEach-Object { Stop-Process -Id \$_.ProcessId -Force }"
```

（只杀带 `site-beautify-cdp` 那个专用 user-data-dir 的，不会碰用户自己开的浏览器。）

## 流程

| 步 | 做什么 | 并行度 |
| --- | --- | --- |
| 1 盘点 | 截当前状态；盘清自定义 class、内联 `<style>`、组件 | 可并行 |
| 2 审查 | 按下面的清单逐维度找问题，**产出结构化清单** | **并行**（多 agent） |
| 3 定方案 | 合并清单、砍掉噪音、定设计语言（色/字/间距/组件规格） | **串行，一个人拍板** |
| 4 实现 | 改 `custom.css` + 组件；合并重复的内联样式 | **串行** |
| 5 验收 | 重新截图逐页比对；跑 `npm run build`；查对比度数值 | 可并行 |

**为什么 3、4 必须串行**：让多个 agent 各改各的 CSS，出来的东西一定是四不像
（同一个按钮三种圆角）。并行只用在该用的地方——**找问题**和**验结果**。

用 agent 做第 2 步时，按页面组切分（首页 / 文化页 / 游戏页 / 工具页），每个 agent
拿到：截图命令、它负责的路径清单、下面这份审查清单，返回**带具体元素和截图坐标**的问题列表。

### 派 agent 审查时，brief 里的第一句纪律

**先证明你的工具可信，再下结论。**

2026-10 那轮的真实教训：四个审查 agent 里有三个独立发现「移动端截图是假象」，
但处理方式决定了结论质量——

| 做法 | 结果 |
| --- | --- |
| 动手量（CDP 读 `scrollWidth`、逐行比对折行位置） | 清单一条都不用撤回 |
| 只发现假象、顺手提个未经实测的绕法 | 那个绕法实测不成立，差点被写进工具 |
| 没量就把推断写成结论（"表格没有 tabindex"） | 后来自己撤回 |

所以 brief 里要明确要求：**报告里区分「实测」和「推断」，没量过的数字不要写成结论**；
每条问题尽量附上验证方式。发现工具本身有问题时，**先修工具再继续审**，
否则那一轮所有相关结论都是废的。

同理，收到 agent 的关键结论后，**自己复现一遍再往上建**——最高价值的那条
（品牌变量失效）我是读了 VitePress 默认主题源码确认之后才动手改的。

## 审查清单

- **层级与排版**：h1→h4 的字号/字重/行高是否成体系；正文行长是否在 45–75 字符；
  三语（中/日/英）的字距与行高是否分别合适（中文别套英文的 letter-spacing）
- **对比度**：正文、次要文字、按钮文字、边框对背景都要过 WCAG AA
  （正文 4.5:1，大字 3:1）。暗色主题下最容易翻车的是"深红文字配近黑背景"
- **间距节奏**：同级元素的间距是否一致；有没有 4/8 的倍数规律；卡片内边距是否统一
- **组件一致性**：卡片/按钮/标签/链接的圆角、边框、hover 行为是否统一
- **状态**：hover / focus-visible / active / 空态 是否都有；focus 环不能删
- **响应式**：≤768px 的断点表现；有没有横向溢出；触控目标 ≥44px
- **信息架构**：首屏是否一眼看懂这是什么站；CTA 是否突出；长页面是否有节奏
- **i18n**：三语共用一套样式，注意日文假名在中文/英文字体下的回退

## 本仓库的现状速查

**样式散落在三处，改造时应当合并进 `custom.css`：**

| 位置 | 内容 |
| --- | --- |
| `.vitepress/theme/custom.css` | 全局主题（唯一正确的位置） |
| `index.md` / `zh/index.md` / `ja/index.md` 内联 `<style>` | 三份**重复**的 `.special-sections` / `.highlight-card` / `.action-btn` |
| `projects/zhong-kui/new-year-special.md`（×3 语言） | `lcp-container` / `lcp-image` / `video-link` / `play-button` / `info-card` / `card-box` |

**必须支持的既有 class**（改样式别把它们弄丢）：
`special-sections`、`project-card-custom`、`card-content`、`card-btn`、
`badge-upcoming`、`image-row`、`tool-grid`、`tool-card{,icon,meta,cta}`、
`highlight-card`、`taoism`、`icon`、`action-btn`、`info-card`、`card-box`、
`lcp-container`、`lcp-image`、`video-link`、`play-button`、`play-icon`

**组件**：`.vitepress/theme/components/MythQuiz.vue`、`GlossaryTool.vue`（各自带 scoped 样式）。

**已知坑**（都是真踩过的）：

- **`.md` 文件是混合行尾**（多数 CRLF，个别行是裸 LF）。`sed -i` 会把整个文件重写并
  改掉行尾，产出整文件 diff。改这些文件**一律用 Edit 工具**；确实要按行操作时用
  `head -n N` / `tail -n +N`（逐字节保留，只做截断），改完**必须** `git diff --stat`
  确认改动是有界的（插入/删除数对得上），而不是整个文件被重写。
- **卡片里的 `h3` 会继承 `.vp-doc h3` 的朱砂色条。** 首页是 `home` 布局、卡片不在
  `.vp-doc` 里，所以看不出来；`/projects` 这类 `doc` 布局就会露馅。新增卡片样式时
  记得一并 `content: none` 掉。
- **`<main>` 后面必须空一行。** 紧跟 Markdown 会被判进 HTML 块，页面上**真的显示 `##`**。
- **标题不要用「渐变铺满整行 + `-webkit-text-fill-color: transparent`」。** 渐变按容器
  宽度铺，文字铺满时行尾必挂（英文卡片标题 @390 只有 2.1:1，中日文命中率更高）；
  而且那个属性**可继承**，会连锁毁掉内联徽章（文字变全透明，实测 1.05:1）、emoji
  （被抹成单色剪影），并让 `text-shadow` 画到填充上层（纯白端被染成红雾）。
  本主题已改成暖白实色 + 朱砂色条。
- **`--vp-c-brand` 是废弃别名，设了不生效**，要覆盖 `--vp-c-brand-1/-2/-3/-soft`。
  而且 `--vp-c-brand-1` 会被当**链接文字色**用，**不能填朱砂 `#a30000`（2.4:1）**——
  「品牌色」和「文字色」是两个角色，文字用的红一律走 `--accent`（5.9:1）。
- **日文没有 `:lang(ja)` 的字体覆盖**（VitePress 只给了 `:lang(zh)`），Windows 上
  标题和正文都会落到中文 UI 字体，日文汉字是中文字形。

## 硬约束

1. **不动文案**。任何语言的正文、标题、导航文字都不改（除非用户单独要求）。
2. **三语对齐**。改样式要在 `/`、`/zh/`、`/ja/` 都验证，别只顾英文。
3. **必须能构建**。改完跑 `npm run build`，构建失败等于没做完。
4. **前后对比**。收尾必须给出"改前 / 改后"的对照截图，不能只说"改好了"。
5. **提交信息不加 Co-Authored-By**（用户全局规则）。
