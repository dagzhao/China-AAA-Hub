<script setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { CATEGORIES, ENTRIES, UI } from '../../data/glossary.js'

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

const t = computed(() => UI[locale.value])

const query = ref('')
const activeCategory = ref('all')

const categoryLabel = (category) => category[locale.value]

// 数据里的拼音带声调（húlu / Mèng Pó / táomù jiàn），用户只会打无调的字母；多音节词还带空格。
// 两边都去声调、去空格再比，"hulu"、"meng po"、"taomu" 才搜得到。
// 两侧同时去掉空格，所以 "mountain god" 这类多词英文查询照样能命中。
const flatten = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase()

const visible = computed(() => {
  const needle = flatten(query.value)
  return ENTRIES.filter((entry) => {
    if (activeCategory.value !== 'all' && entry.category !== activeCategory.value) {
      return false
    }
    if (!needle) return true
    // 任意语言的名称与释义、外加汉字与拼音，都参与检索
    const haystack = flatten(
      [
        entry.hanzi,
        entry.pinyin,
        entry.en.term,
        entry.en.def,
        entry.zh.term,
        entry.zh.def,
        entry.ja.term,
        entry.ja.def
      ].join(' ')
    )
    return haystack.includes(needle)
  })
})

const counts = computed(() => {
  const map = { all: ENTRIES.length }
  for (const category of CATEGORIES) {
    map[category.id] = ENTRIES.filter((entry) => entry.category === category.id).length
  }
  return map
})

function clear() {
  query.value = ''
  activeCategory.value = 'all'
}
</script>

<template>
  <div class="glossary">
    <p class="glossary-kicker">{{ t.kicker }}</p>
    <h1 class="glossary-title">{{ t.title }}</h1>
    <p class="glossary-lead">{{ t.lead }}</p>

    <div class="glossary-controls">
      <div class="glossary-search">
        <span class="glossary-search-icon" aria-hidden="true">🔍</span>
        <input
          v-model="query"
          class="glossary-input"
          type="search"
          :placeholder="t.search"
          :aria-label="t.search"
        />
        <button v-if="query" class="glossary-clear" type="button" @click="query = ''">
          {{ t.clear }}
        </button>
      </div>

      <div class="glossary-filters" role="group" :aria-label="t.filtersLabel">
        <button
          class="glossary-chip"
          :class="{ 'is-active': activeCategory === 'all' }"
          type="button"
          :aria-pressed="activeCategory === 'all'"
          @click="activeCategory = 'all'"
        >
          {{ t.all }}
          <span class="glossary-chip-count">{{ counts.all }}</span>
        </button>
        <button
          v-for="category in CATEGORIES"
          :key="category.id"
          class="glossary-chip"
          :class="{ 'is-active': activeCategory === category.id }"
          type="button"
          :aria-pressed="activeCategory === category.id"
          @click="activeCategory = category.id"
        >
          <span class="glossary-chip-icon" aria-hidden="true">{{ category.icon }}</span>
          {{ categoryLabel(category) }}
          <span class="glossary-chip-count">{{ counts[category.id] }}</span>
        </button>
      </div>

      <p class="glossary-count" role="status">{{ t.count(visible.length) }}</p>
    </div>

    <div v-if="visible.length" class="glossary-grid">
      <article v-for="entry in visible" :id="entry.id" :key="entry.id" class="glossary-card">
        <p class="glossary-card-cat">
          {{ categoryLabel(CATEGORIES.find((c) => c.id === entry.category)) }}
        </p>

        <h2 class="glossary-card-term">{{ entry[locale].term }}</h2>

        <p v-if="entry[locale].term !== entry.hanzi" class="glossary-card-hanzi">
          {{ entry.hanzi }} <span class="glossary-card-pinyin">{{ entry.pinyin }}</span>
        </p>
        <p v-else class="glossary-card-hanzi">
          <span class="glossary-card-pinyin">{{ entry.pinyin }}</span>
        </p>

        <p class="glossary-card-def">{{ entry[locale].def }}</p>

        <a v-if="entry.link" class="glossary-card-link" :href="localePrefix + entry.link">
          {{ t.related }} →
        </a>
      </article>
    </div>

    <div v-else class="glossary-empty">
      <p class="glossary-empty-title">{{ t.empty }}</p>
      <p class="glossary-empty-hint">{{ t.emptyHint }}</p>
      <button class="glossary-clear glossary-clear-block" type="button" @click="clear">
        {{ t.clear }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 颜色一律取 custom.css 的设计令牌（带兜底值）：朱砂系只做边框/底色/色条，文字只走 --accent */
.glossary-kicker {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent, #ff4d4d);
  margin: 0 0 var(--sp-3, 12px);
}

.glossary-title {
  font-size: 2rem;
  margin: 0 0 var(--sp-4, 16px);
  color: var(--paper, #e8e6e3);
}

.glossary-lead {
  color: var(--paper-dim, #a8a29b);
  line-height: 1.85;
  margin: 0 0 var(--sp-6, 32px);
  max-width: 60ch;
}

.glossary-controls {
  position: sticky;
  top: var(--vp-nav-height, 64px);
  z-index: 5;
  background: var(--vp-c-bg, var(--ink-800, #0d0d0d));
  padding: var(--sp-3, 12px) 0 14px;
  margin-bottom: var(--sp-5, 24px);
  border-bottom: 1px solid var(--cinnabar-line, rgba(163, 0, 0, 0.28));
}

.glossary-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--ink-600, #1a1a1a);
  border: 1px solid var(--cinnabar-line, rgba(163, 0, 0, 0.28));
  border-radius: var(--radius, 12px);
  padding: 0 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* 整个字段是一体的：焦点在输入框上时，环画在 wrapper 上 */
.glossary-search:focus-within {
  border-color: var(--accent, #ff4d4d);
  box-shadow: var(--ring, 0 0 0 3px rgba(255, 77, 77, 0.45));
}

.glossary-search-icon {
  font-size: 0.9rem;
  opacity: 0.6;
}

/* 输入框自己不再画环，否则字段里会再套一圈 —— 见上面的 :focus-within */
.glossary-input:focus-visible {
  outline: none;
}

.glossary-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--paper, #e8e6e3);
  font-size: 0.95rem;
  padding: 13px 0;
  font-family: inherit;
}

/* 占位符压到 --paper-faint 在卡片底上只有 4.1:1，所以用 --paper-dim（6.9:1） */
.glossary-input::placeholder {
  color: var(--paper-dim, #a8a29b);
}

.glossary-clear {
  background: transparent;
  border: 1px solid var(--ink-400, #2e2e32);
  color: var(--paper-dim, #a8a29b);
  border-radius: var(--radius-pill, 999px);
  font-size: 0.75rem;
  padding: 3px 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.glossary-clear:hover {
  border-color: var(--accent, #ff4d4d);
  color: var(--accent, #ff4d4d);
}

/* 清空按钮就在 wrapper 里面，聚焦它同样会点亮 wrapper 的环，分不清焦点在哪；
   所以它自己再画一环。 */
.glossary-clear:focus-visible {
  outline: none;
  box-shadow: var(--ring, 0 0 0 3px rgba(255, 77, 77, 0.45));
}

.glossary-clear-block {
  margin-top: 14px;
  padding: var(--sp-2, 8px) 20px;
  font-size: 0.85rem;
  border-radius: var(--radius-pill, 999px);
}

.glossary-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2, 8px);
  margin-top: var(--sp-3, 12px);
}

.glossary-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid var(--ink-400, #2e2e32);
  color: var(--paper-dim, #a8a29b);
  border-radius: var(--radius-pill, 999px);
  padding: 6px 14px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.glossary-chip:hover {
  border-color: var(--cinnabar, #a30000);
  color: var(--paper, #e8e6e3);
}

/* 选中态：边框提到 --accent，和 hover 的朱砂区分开 */
.glossary-chip.is-active {
  background: var(--cinnabar-soft, rgba(163, 0, 0, 0.16));
  border-color: var(--accent, #ff4d4d);
  color: var(--paper, #e8e6e3);
}

.glossary-chip:focus-visible {
  outline: none;
  box-shadow: var(--ring, 0 0 0 3px rgba(255, 77, 77, 0.45));
}

/* 分类图标是单字，跟着文字色走；比正文暗一档，不喧宾夺主 */
.glossary-chip-icon {
  color: var(--paper-faint, #807a74);
  line-height: 1;
}

.glossary-chip.is-active .glossary-chip-icon {
  color: var(--paper-dim, #a8a29b);
}

.glossary-chip-count {
  font-size: 0.7rem;
  color: var(--paper-dim, #a8a29b);
}

.glossary-chip.is-active .glossary-chip-count {
  color: var(--paper, #e8e6e3);
}

.glossary-count {
  font-size: 0.78rem;
  color: var(--paper-dim, #a8a29b);
  margin: 14px 0 0;
}

.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.glossary-card {
  display: flex;
  flex-direction: column;
  background: var(--ink-600, #1a1a1a);
  border: 1px solid var(--cinnabar-line, rgba(163, 0, 0, 0.28));
  border-radius: var(--radius, 12px);
  padding: 22px;
  transition: border-color 0.25s ease;
}

/* 整卡不可点（只有底部 Related 链接可点），所以不做位移和投影，只留边框反馈 */
.glossary-card:hover {
  border-color: var(--cinnabar, #a30000);
}

.glossary-card-cat {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent, #ff4d4d);
  margin: 0 0 10px;
}

.glossary-card-term {
  font-size: 1.3rem;
  margin: 0 0 6px;
  color: var(--paper, #e8e6e3);
  line-height: 1.35;
}

.glossary-card-hanzi {
  font-size: 0.95rem;
  color: var(--paper, #e8e6e3);
  margin: 0 0 14px;
  letter-spacing: 0.04em;
}

.glossary-card-pinyin {
  font-size: 0.82rem;
  color: var(--paper-dim, #a8a29b);
  letter-spacing: 0.06em;
}

/* 卡片被同行的最高卡片撑高时，Related 链接靠 margin-top:auto 沉到底部，
   而不是悬在半空；有链接时才留出与释义之间的最小间距。 */
.glossary-card-def {
  color: var(--paper-dim, #a8a29b);
  line-height: 1.85;
  font-size: 0.92rem;
  margin: 0;
}

.glossary-card-def:not(:last-child) {
  margin-bottom: var(--sp-4, 16px);
}

.glossary-card-link {
  align-self: flex-start;
  margin-top: auto;
  font-size: 0.82rem;
  color: var(--accent, #ff4d4d);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.glossary-card-link:hover {
  border-bottom-color: var(--accent, #ff4d4d);
}

.glossary-card-link:focus-visible {
  outline: 2px solid var(--accent, #ff4d4d);
  outline-offset: 2px;
}

.glossary-empty {
  text-align: center;
  padding: 60px 20px;
  border: 1px dashed var(--cinnabar-line, rgba(163, 0, 0, 0.28));
  border-radius: var(--radius, 12px);
}

.glossary-empty-title {
  font-size: 1.05rem;
  color: var(--paper, #e8e6e3);
  margin: 0 0 var(--sp-2, 8px);
}

.glossary-empty-hint {
  font-size: 0.85rem;
  color: var(--paper-dim, #a8a29b);
  margin: 0;
}

@media (max-width: 640px) {
  .glossary-title {
    font-size: 1.5rem;
  }

  /* 390×844 下首屏要能露出第一个词条：导语截到两行，筛选项改成单行横滑（省约 110px） */
  .glossary-lead {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: var(--sp-5, 24px);
  }

  .glossary-grid {
    grid-template-columns: 1fr;
  }

  .glossary-controls {
    position: static;
  }

  .glossary-filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    /* 上下留出空间，否则聚焦环和 chip 的边框会被 overflow 裁掉 */
    padding: var(--sp-1, 4px) 0;
    scrollbar-width: none;
  }

  .glossary-filters::-webkit-scrollbar {
    display: none;
  }

  .glossary-chip {
    flex: 0 0 auto;
    padding: 10px 14px;
    min-height: 44px;
  }
}
</style>
