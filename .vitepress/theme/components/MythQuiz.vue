<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { ARCHETYPE_META, QUIZ, SCORES, TIE_ORDER } from '../../data/quiz.js'

const { lang } = useData()

const locale = computed(() => {
  if (lang.value === 'zh-CN') return 'zh'
  if (lang.value === 'ja') return 'ja'
  return 'en'
})

const localePrefix = computed(() => {
  if (lang.value === 'zh-CN') return '/zh'
  if (lang.value === 'ja') return '/ja'
  return ''
})

const t = computed(() => QUIZ[locale.value])
const questions = computed(() => QUIZ.questions[locale.value])

// 'intro' | 'playing' | 'result'
const stage = ref('intro')
const current = ref(0)
const answers = ref([])
const copied = ref(false)
// 通过 ?r=<archetype> 直接落地到某个结果时使用，优先于计分
const forcedId = ref(null)
// 当前挂载的阶段容器：切阶段后把焦点送进去，键盘用户不必从页首重新 Tab
const stageEl = ref(null)

const total = computed(() => questions.value.length)
// 进度条只在答题阶段渲染；从第 1 题起就是 1/total，不会出现"0% 看起来没进展"的观感
const progress = computed(() => Math.round(((current.value + 1) / total.value) * 100))

async function focusStage() {
  await nextTick()
  stageEl.value?.focus()
}

// 选项按下后先停留一小会儿再翻页。移动端没有 hover，翻得太快等于没有"我选了 B"的反馈。
const PICK_DELAY = 180
let pickTimer = null

function cancelPick() {
  if (pickTimer !== null) {
    clearTimeout(pickTimer)
    pickTimer = null
  }
}

function start() {
  stage.value = 'playing'
  current.value = 0
  answers.value = []
  focusStage()
}

function choose(optionIndex) {
  const qIndex = current.value
  answers.value[qIndex] = optionIndex
  // 连点只认最后一次：重开计时器，保证翻页只发生一次
  cancelPick()
  pickTimer = setTimeout(() => {
    pickTimer = null
    // 等待期间用户点了「上一题」或「再测一次」，这次翻页作废
    if (current.value !== qIndex) return
    if (qIndex < total.value - 1) {
      current.value = qIndex + 1
    } else {
      stage.value = 'result'
    }
    focusStage()
  }, PICK_DELAY)
}

function back() {
  cancelPick()
  if (current.value > 0) {
    current.value -= 1
  } else {
    stage.value = 'intro'
  }
  focusStage()
}

function restart() {
  cancelPick()
  stage.value = 'intro'
  current.value = 0
  answers.value = []
  copied.value = false
  forcedId.value = null
  if (typeof window !== 'undefined' && window.history?.replaceState) {
    window.history.replaceState({}, '', window.location.pathname)
  }
  focusStage()
}

const resultId = computed(() => {
  if (forcedId.value) return forcedId.value
  if (stage.value !== 'result') return null
  const tally = {}
  answers.value.forEach((optionIndex, qIndex) => {
    const bucket = SCORES[qIndex]?.[optionIndex]
    if (!bucket) return
    for (const key in bucket) {
      tally[key] = (tally[key] || 0) + bucket[key]
    }
  })
  let winner = TIE_ORDER[0]
  let best = -1
  // 按固定顺序遍历，分值相同则顺序靠前者胜出，保证结果稳定可复现
  for (const key of TIE_ORDER) {
    const score = tally[key] || 0
    if (score > best) {
      best = score
      winner = key
    }
  }
  return winner
})

const result = computed(() => {
  if (!resultId.value) return null
  const meta = ARCHETYPE_META[resultId.value]
  const text = QUIZ.results[locale.value][resultId.value]
  return {
    id: resultId.value,
    ...meta,
    ...text,
    href: localePrefix.value + meta.link
  }
})

// 印章字形：日文页面用日文字形（鍾馗／煉気士／無名者），否则同一页上下会出现简繁两种写法
const sealHanzi = computed(() => {
  if (!result.value) return ''
  if (locale.value === 'ja') return result.value.hanziJa || result.value.hanzi
  return result.value.hanzi
})

// 要不要另起一行 h1：英文下 name 是译名，与印章汉字必然不同，需要标题；
// 中/日下 name 就是印章上的字，由印章自己承担一级标题，不再重复一遍。
// 按 locale 判断，不用「name 是否等于 hanzi」——那会把「天命人／影刃」这种字形相同的漏掉。
const showTitle = computed(() => locale.value === 'en')

// 印章是固定方框，三字原型（炼气士／无名者／天命人）需要缩字号才不会折行
const isLongName = computed(() => sealHanzi.value.length > 2)

async function share() {
  if (typeof window === 'undefined' || !resultId.value) return
  const url = `${window.location.origin}${window.location.pathname}?r=${resultId.value}`
  try {
    await navigator.clipboard.writeText(url)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // 剪贴板不可用时退回手动选择，避免静默失败
    window.prompt(url, url)
  }
}

onMounted(() => {
  // 支持通过 ?r=<archetype> 直接落地到别人的结果
  const id = new URLSearchParams(window.location.search).get('r')
  if (id && ARCHETYPE_META[id]) {
    answers.value = []
    stage.value = 'result'
    forcedId.value = id
  }
})

onBeforeUnmount(cancelPick)
</script>

<template>
  <div class="quiz-shell">
    <!-- 只在答题阶段显示进度条：封面阶段 0% 是条空轨道，结果阶段 100% 是条满宽亮红线，
         两者都没有轨道作参照，看起来更像一条多余的分隔线。 -->
    <div v-if="stage === 'playing'" class="quiz-progress" aria-hidden="true">
      <span class="quiz-progress-bar" :style="{ width: progress + '%' }"></span>
    </div>

    <!-- 只给读屏用的状态区：常驻节点，内容变了才播报一句短信息（不用 aria-live 整段播报
         结果正文，也不和 focusStage() 抢同一段文字 —— 正文由焦点送进阶段容器）。
         进度计数与结果 kicker 在视觉上各有一份，那两份标了 aria-hidden，避免读两遍。 -->
    <p class="quiz-status" role="status">
      <template v-if="stage === 'playing'">
        {{ t.questionLabel }} {{ current + 1 }} {{ t.ofLabel }} {{ total }}
      </template>
      <template v-else-if="stage === 'result'">{{ t.resultKicker }}</template>
    </p>

    <!-- 阶段容器：焦点跟着阶段走，内容本身交给 focusStage() -->
    <div class="quiz-stage">
      <!-- 封面 -->
      <section v-if="stage === 'intro'" ref="stageEl" class="quiz-intro" tabindex="-1">
        <p class="quiz-kicker">{{ t.kicker }}</p>
        <h1 class="quiz-title">{{ t.title }}</h1>
        <p class="quiz-lead">{{ t.intro }}</p>
        <p class="quiz-meta">{{ t.meta }}</p>
        <button class="quiz-btn-primary" type="button" @click="start">{{ t.start }}</button>
      </section>

      <!-- 答题 -->
      <section v-else-if="stage === 'playing'" ref="stageEl" class="quiz-body" tabindex="-1">
        <p class="quiz-counter" aria-hidden="true">
          {{ t.questionLabel }} {{ current + 1 }} {{ t.ofLabel }} {{ total }}
        </p>
        <h2 class="quiz-question">{{ questions[current].q }}</h2>

        <ul class="quiz-options">
          <li v-for="(option, i) in questions[current].options" :key="i">
            <button
              class="quiz-option"
              :class="{ 'is-picked': answers[current] === i }"
              type="button"
              @click="choose(i)"
            >
              <span class="quiz-option-mark">{{ String.fromCharCode(65 + i) }}</span>
              <span class="quiz-option-text">{{ option }}</span>
            </button>
          </li>
        </ul>

        <button class="quiz-btn-ghost" type="button" @click="back">← {{ t.back }}</button>
      </section>

      <!-- 结果 -->
      <section v-else ref="stageEl" class="quiz-result" tabindex="-1" :style="{ '--archetype': result.accent }">
        <p class="quiz-kicker" aria-hidden="true">{{ t.resultKicker }}</p>

        <!-- 中/日文下没有单独的 h1，印章自己就是一级标题 -->
        <div
          class="quiz-seal"
          :class="{ 'is-hero': !showTitle, 'is-long': isLongName }"
          :role="showTitle ? undefined : 'heading'"
          :aria-level="showTitle ? undefined : 1"
        >
          <span class="quiz-seal-hanzi">{{ sealHanzi }}</span>
        </div>

        <h1 v-if="showTitle" class="quiz-title">{{ result.name }}</h1>
        <p class="quiz-pinyin">{{ result.pinyin }}</p>
        <p class="quiz-epithet">「{{ result.epithet }}」</p>
        <p class="quiz-desc">{{ result.desc }}</p>

        <p class="quiz-traits-label">{{ t.traitsLabel }}</p>
        <ul class="quiz-traits">
          <li v-for="trait in result.traits" :key="trait">{{ trait }}</li>
        </ul>

        <div class="quiz-actions">
          <a class="quiz-btn-primary" :href="result.href">{{ result.cta }} →</a>
          <button class="quiz-btn-ghost" type="button" @click="share">
            {{ copied ? t.copied : t.share }}
          </button>
          <button class="quiz-btn-ghost" type="button" @click="restart">{{ t.restart }}</button>
        </div>

        <p class="quiz-note">{{ t.disclaimer }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 颜色一律取 custom.css 的设计令牌（带兜底值，单看组件也不会失色）：
   朱砂系只做边框/底色/色条，文字只走 --accent。
   --archetype 是当前原型的颜色，只上边框和辉光 —— 朱砂 #a30000 当文字色只有 2.37:1。 */
.quiz-shell {
  max-width: 780px;
  margin: var(--sp-2, 8px) auto var(--sp-7, 48px);
}

.quiz-progress {
  height: 3px;
  background: var(--ink-500, #242424);
  border-radius: var(--radius-pill, 999px);
  overflow: hidden;
  margin-bottom: var(--sp-5, 24px);
}

.quiz-progress-bar {
  display: block;
  height: 100%;
  background: linear-gradient(to right, var(--cinnabar, #a30000), var(--accent, #ff4d4d));
  transition: width 0.35s ease;
}

/* 阶段切换时靠程序化聚焦把键盘/读屏焦点带过来，不是给指针用户看的，所以不画焦点环 */
.quiz-intro,
.quiz-body,
.quiz-result {
  outline: none;
}

/* 视觉上藏起来的状态区（只读给读屏听），不打乱布局也不影响视觉节奏 */
.quiz-status {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.quiz-kicker {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent, #ff4d4d);
  margin: 0 0 var(--sp-3, 12px);
}

.quiz-title {
  font-size: 2rem;
  line-height: 1.25;
  margin: 0 0 var(--sp-4, 16px);
  color: var(--paper, #e8e6e3);
}

.quiz-lead {
  color: var(--paper-dim, #a8a29b);
  line-height: 1.85;
  margin: 0 0 var(--sp-4, 16px);
}

.quiz-meta {
  font-size: 0.85rem;
  color: var(--paper-faint, #807a74);
  margin: 0 0 var(--sp-5, 24px);
}

.quiz-btn-primary {
  display: inline-block;
  padding: 11px 26px;
  background: var(--cinnabar, #a30000);
  color: var(--paper, #e8e6e3) !important;
  border: 1px solid var(--cinnabar, #a30000);
  border-radius: var(--radius-pill, 999px);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none !important;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

/* 悬停压深一档而不是提亮：亮红底 (#ff4d4d) 上的纸白只有 3.3:1 */
.quiz-btn-primary:hover {
  background: var(--cinnabar-deep, #7a0000);
  border-color: var(--cinnabar-deep, #7a0000);
  transform: translateY(-2px);
}

.quiz-btn-ghost {
  background: transparent;
  border: 1px solid var(--ink-400, #2e2e32);
  color: var(--paper-dim, #a8a29b);
  border-radius: var(--radius-pill, 999px);
  padding: 10px 20px;
  font-size: 0.88rem;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.quiz-btn-ghost:hover {
  border-color: var(--accent, #ff4d4d);
  color: var(--accent, #ff4d4d);
}

/* 焦点环统一走 --ring，与 custom.css 里其它可点组件保持一致 */
.quiz-btn-primary:focus-visible,
.quiz-btn-ghost:focus-visible,
.quiz-option:focus-visible {
  outline: none;
  box-shadow: var(--ring, 0 0 0 3px rgba(255, 77, 77, 0.45));
}

.quiz-counter {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent, #ff4d4d);
  margin: 0 0 var(--sp-3, 12px);
}

.quiz-question {
  font-size: 1.35rem;
  line-height: 1.55;
  margin: 0 0 var(--sp-5, 24px);
  color: var(--paper, #e8e6e3);
}

.quiz-options {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--sp-5, 24px);
  display: flex;
  flex-direction: column;
  gap: var(--sp-3, 12px);
}

/* VitePress 正文样式里的 `.vp-doc li + li { margin-top: 8px }` 会漏进组件，
   把除第一项以外的列表项往下顶。这里显式清零。 */
.quiz-options li,
.quiz-traits li {
  margin: 0;
}

.quiz-option {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3, 12px);
  text-align: left;
  padding: var(--sp-4, 16px) 20px;
  background: var(--ink-600, #1a1a1a);
  border: 1px solid var(--cinnabar-line, rgba(163, 0, 0, 0.28));
  border-radius: var(--radius, 12px);
  color: var(--paper, #e8e6e3);
  font-size: 0.98rem;
  line-height: 1.6;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.quiz-option:hover {
  border-color: var(--cinnabar, #a30000);
  background: var(--cinnabar-soft, rgba(163, 0, 0, 0.16));
  transform: translateX(var(--sp-1, 4px));
}

/* 选中态：边框提到 --accent、圆标填朱砂底，翻页前的 180ms 里要一眼看出选了哪项 */
.quiz-option.is-picked {
  border-color: var(--accent, #ff4d4d);
  background: var(--cinnabar-soft, rgba(163, 0, 0, 0.16));
}

.quiz-option.is-picked .quiz-option-mark {
  background: var(--cinnabar, #a30000);
  border-color: var(--cinnabar, #a30000);
  color: var(--paper, #e8e6e3);
}

.quiz-option-mark {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--cinnabar-line, rgba(163, 0, 0, 0.28));
  color: var(--accent, #ff4d4d);
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 1px;
}

.quiz-option-text {
  flex: 1;
}

.quiz-result {
  text-align: center;
}

.quiz-seal {
  width: 108px;
  height: 108px;
  margin: var(--sp-1, 4px) auto var(--sp-5, 24px);
  display: grid;
  place-items: center;
  border: 2px solid var(--archetype, var(--cinnabar, #a30000));
  border-radius: var(--radius, 12px);
  background: var(--cinnabar-soft, rgba(163, 0, 0, 0.16));
  box-shadow: 0 0 30px -8px var(--archetype, var(--cinnabar, #a30000));
}

.quiz-seal.is-hero {
  width: 148px;
  height: 148px;
}

.quiz-seal-hanzi {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent, #ff4d4d);
  line-height: 1.1;
  text-align: center;
  padding: 0 var(--sp-2, 8px);
  white-space: nowrap;
}

.quiz-seal.is-hero .quiz-seal-hanzi {
  font-size: 2.7rem;
}

/* 三字原型（炼气士／无名者／天命人）要缩字号，否则会在方框里折行 */
.quiz-seal.is-long .quiz-seal-hanzi {
  font-size: 1.32rem;
  letter-spacing: 0.02em;
}

.quiz-seal.is-hero.is-long .quiz-seal-hanzi {
  font-size: 1.95rem;
}

.quiz-pinyin {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--paper-dim, #a8a29b);
  margin: 0 0 var(--sp-5, 24px);
}

.quiz-epithet {
  font-size: 1.1rem;
  color: var(--accent, #ff4d4d);
  margin: 0 0 var(--sp-5, 24px);
  line-height: 1.7;
}

.quiz-desc {
  color: var(--paper-dim, #a8a29b);
  line-height: 1.9;
  text-align: left;
  margin: 0 0 var(--sp-5, 24px);
}

.quiz-traits-label {
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--paper-faint, #807a74);
  margin: 0 0 var(--sp-3, 12px);
}

.quiz-traits {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--sp-6, 32px);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.quiz-traits li {
  padding: var(--sp-1, 4px) var(--sp-3, 12px);
  border-radius: var(--radius-pill, 999px);
  font-size: 0.85rem;
  border: 1px solid var(--archetype, var(--cinnabar, #a30000));
  color: var(--accent, #ff4d4d);
  background: var(--cinnabar-soft, rgba(163, 0, 0, 0.16));
}

.quiz-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-3, 12px);
  justify-content: center;
  margin-bottom: var(--sp-5, 24px);
}

.quiz-note {
  font-size: 0.78rem;
  color: var(--paper-faint, #807a74);
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 640px) {
  .quiz-title {
    font-size: 1.5rem;
  }
  .quiz-question {
    font-size: 1.15rem;
  }
  .quiz-option {
    padding: var(--sp-4, 16px);
    font-size: 0.92rem;
  }
  .quiz-actions {
    flex-direction: column;
  }
  .quiz-actions > * {
    width: 100%;
    text-align: center;
  }
}
</style>
