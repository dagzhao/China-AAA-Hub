<script setup>
import { computed, onMounted, ref } from 'vue'
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

const total = computed(() => questions.value.length)
const progress = computed(() => {
  if (stage.value === 'intro') return 0
  if (stage.value === 'result') return 100
  return Math.round((current.value / total.value) * 100)
})

function start() {
  stage.value = 'playing'
  current.value = 0
  answers.value = []
}

function choose(optionIndex) {
  answers.value[current.value] = optionIndex
  if (current.value < total.value - 1) {
    current.value += 1
  } else {
    stage.value = 'result'
  }
}

function back() {
  if (current.value > 0) {
    current.value -= 1
  } else {
    stage.value = 'intro'
  }
}

function restart() {
  stage.value = 'intro'
  current.value = 0
  answers.value = []
  copied.value = false
  forcedId.value = null
  if (typeof window !== 'undefined' && window.history?.replaceState) {
    window.history.replaceState({}, '', window.location.pathname)
  }
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

// 印章是固定方框，三字原型（炼气士／无名者／天命人）需要缩字号才不会折行
const isLongName = computed(() => (result.value?.hanzi?.length ?? 2) > 2)

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
</script>

<template>
  <div class="quiz-shell">
    <div class="quiz-progress" aria-hidden="true">
      <span class="quiz-progress-bar" :style="{ width: progress + '%' }"></span>
    </div>

    <!-- 封面 -->
    <section v-if="stage === 'intro'" class="quiz-intro">
      <p class="quiz-kicker">{{ t.kicker }}</p>
      <h1 class="quiz-title">{{ t.title }}</h1>
      <p class="quiz-lead">{{ t.intro }}</p>
      <p class="quiz-meta">{{ t.meta }}</p>
      <button class="quiz-btn-primary" type="button" @click="start">{{ t.start }}</button>
    </section>

    <!-- 答题 -->
    <section v-else-if="stage === 'playing'" class="quiz-body">
      <p class="quiz-counter">
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
    <section v-else class="quiz-result" :style="{ '--accent': result.accent }">
      <p class="quiz-kicker">{{ t.resultKicker }}</p>

      <div
        class="quiz-seal"
        :class="{ 'is-hero': result.name === result.hanzi, 'is-long': isLongName }"
      >
        <span class="quiz-seal-hanzi">{{ result.hanzi }}</span>
      </div>

      <!-- 中文/日文下 name 与印章汉字相同，就不再重复一遍，改由印章承担标题 -->
      <h1 v-if="result.name !== result.hanzi" class="quiz-title">{{ result.name }}</h1>
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
</template>

<style scoped>
.quiz-shell {
  --quiz-brand: #a30000;
  --quiz-brand-light: #ff4d4d;
  max-width: 780px;
  margin: 8px auto 48px;
}

.quiz-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 28px;
}

.quiz-progress-bar {
  display: block;
  height: 100%;
  background: linear-gradient(to right, var(--quiz-brand), var(--quiz-brand-light));
  transition: width 0.35s ease;
}

.quiz-kicker {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--quiz-brand-light);
  margin: 0 0 12px;
}

.quiz-title {
  font-size: 2rem;
  line-height: 1.25;
  margin: 0 0 16px;
  color: #fff;
}

.quiz-lead {
  color: var(--vp-c-text-2, #aaa);
  line-height: 1.85;
  margin: 0 0 16px;
}

.quiz-meta {
  font-size: 0.85rem;
  color: var(--vp-c-text-2, #888);
  margin: 0 0 28px;
}

.quiz-btn-primary {
  display: inline-block;
  padding: 11px 26px;
  background: var(--quiz-brand);
  color: #fff !important;
  border: 1px solid var(--quiz-brand);
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none !important;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.quiz-btn-primary:hover {
  background: var(--quiz-brand-light);
  border-color: var(--quiz-brand-light);
  transform: translateY(-2px);
}

.quiz-btn-ghost {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--vp-c-text-2, #aaa);
  border-radius: 24px;
  padding: 10px 20px;
  font-size: 0.88rem;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.quiz-btn-ghost:hover {
  border-color: var(--quiz-brand-light);
  color: var(--quiz-brand-light);
}

.quiz-counter {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--quiz-brand-light);
  margin: 0 0 12px;
}

.quiz-question {
  font-size: 1.35rem;
  line-height: 1.55;
  margin: 0 0 26px;
  color: #fff;
}

.quiz-options {
  list-style: none;
  padding: 0;
  margin: 0 0 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  gap: 14px;
  text-align: left;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft, #1a1a1a);
  border: 1px solid rgba(163, 0, 0, 0.2);
  border-radius: 10px;
  color: var(--vp-c-text-1, #e0e0e0);
  font-size: 0.98rem;
  line-height: 1.6;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.quiz-option:hover {
  border-color: var(--quiz-brand);
  background: rgba(163, 0, 0, 0.08);
  transform: translateX(4px);
}

.quiz-option.is-picked {
  border-color: var(--quiz-brand);
  background: rgba(163, 0, 0, 0.14);
}

.quiz-option-mark {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(163, 0, 0, 0.5);
  color: var(--quiz-brand-light);
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
  margin: 4px auto 22px;
  display: grid;
  place-items: center;
  border: 2px solid var(--accent, var(--quiz-brand));
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  box-shadow: 0 0 30px -8px var(--accent, var(--quiz-brand));
}

.quiz-seal.is-hero {
  width: 148px;
  height: 148px;
}

.quiz-seal-hanzi {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent, #fff);
  line-height: 1.1;
  text-align: center;
  padding: 0 8px;
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
  color: var(--vp-c-text-2, #888);
  margin: 0 0 20px;
}

.quiz-epithet {
  font-size: 1.1rem;
  color: var(--quiz-brand-light);
  margin: 0 0 22px;
  line-height: 1.7;
}

.quiz-desc {
  color: var(--vp-c-text-2, #aaa);
  line-height: 1.9;
  text-align: left;
  margin: 0 0 26px;
}

.quiz-traits-label {
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--vp-c-text-2, #888);
  margin: 0 0 12px;
}

.quiz-traits {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.quiz-traits li {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid var(--accent, var(--quiz-brand));
  color: var(--accent, #fff);
  background: rgba(255, 255, 255, 0.03);
}

.quiz-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 22px;
}

.quiz-note {
  font-size: 0.78rem;
  color: var(--vp-c-text-2, #777);
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
    padding: 14px 16px;
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
