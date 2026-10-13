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

const visible = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return ENTRIES.filter((entry) => {
    if (activeCategory.value !== 'all' && entry.category !== activeCategory.value) {
      return false
    }
    if (!needle) return true
    // 任意语言的名称与释义、外加汉字与拼音，都参与检索
    const haystack = [
      entry.hanzi,
      entry.pinyin,
      entry.en.term,
      entry.en.def,
      entry.zh.term,
      entry.zh.def,
      entry.ja.term,
      entry.ja.def
    ]
      .join(' ')
      .toLowerCase()
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

      <div class="glossary-filters" role="group">
        <button
          class="glossary-chip"
          :class="{ 'is-active': activeCategory === 'all' }"
          type="button"
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
          @click="activeCategory = category.id"
        >
          <span aria-hidden="true">{{ category.icon }}</span>
          {{ categoryLabel(category) }}
          <span class="glossary-chip-count">{{ counts[category.id] }}</span>
        </button>
      </div>

      <p class="glossary-count">{{ t.count(visible.length) }}</p>
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
.glossary {
  --glossary-brand: #a30000;
  --glossary-brand-light: #ff4d4d;
}

.glossary-kicker {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--glossary-brand-light);
  margin: 0 0 12px;
}

.glossary-title {
  font-size: 2rem;
  margin: 0 0 16px;
  color: #fff;
}

.glossary-lead {
  color: var(--vp-c-text-2, #aaa);
  line-height: 1.85;
  margin: 0 0 30px;
  max-width: 60ch;
}

.glossary-controls {
  position: sticky;
  top: var(--vp-nav-height, 64px);
  z-index: 5;
  background: var(--vp-c-bg, #0d0d0d);
  padding: 12px 0 14px;
  margin-bottom: 22px;
  border-bottom: 1px solid rgba(163, 0, 0, 0.2);
}

.glossary-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--vp-c-bg-soft, #1a1a1a);
  border: 1px solid rgba(163, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0 14px;
  transition: border-color 0.2s ease;
}

.glossary-search:focus-within {
  border-color: var(--glossary-brand-light);
}

.glossary-search-icon {
  font-size: 0.9rem;
  opacity: 0.6;
}

.glossary-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--vp-c-text-1, #e0e0e0);
  font-size: 0.95rem;
  padding: 13px 0;
  font-family: inherit;
}

.glossary-input::placeholder {
  color: var(--vp-c-text-2, #777);
}

.glossary-clear {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--vp-c-text-2, #aaa);
  border-radius: 14px;
  font-size: 0.75rem;
  padding: 3px 10px;
  cursor: pointer;
  white-space: nowrap;
}

.glossary-clear:hover {
  border-color: var(--glossary-brand-light);
  color: var(--glossary-brand-light);
}

.glossary-clear-block {
  margin-top: 14px;
  padding: 8px 20px;
  font-size: 0.85rem;
  border-radius: 20px;
}

.glossary-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.glossary-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--vp-c-text-2, #aaa);
  border-radius: 18px;
  padding: 6px 14px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.glossary-chip:hover {
  border-color: var(--glossary-brand);
  color: var(--vp-c-text-1, #e0e0e0);
}

.glossary-chip.is-active {
  background: rgba(163, 0, 0, 0.18);
  border-color: var(--glossary-brand);
  color: #fff;
}

.glossary-chip-count {
  font-size: 0.7rem;
  opacity: 0.6;
}

.glossary-count {
  font-size: 0.78rem;
  color: var(--vp-c-text-2, #777);
  margin: 14px 0 0;
}

.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.glossary-card {
  background: var(--vp-c-bg-soft, #1a1a1a);
  border: 1px solid rgba(163, 0, 0, 0.18);
  border-radius: 12px;
  padding: 22px;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.glossary-card:hover {
  border-color: var(--glossary-brand);
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.glossary-card-cat {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--glossary-brand-light);
  margin: 0 0 10px;
  opacity: 0.85;
}

.glossary-card-term {
  font-size: 1.3rem;
  margin: 0 0 6px;
  color: #fff;
  line-height: 1.35;
}

.glossary-card-hanzi {
  font-size: 0.95rem;
  color: var(--vp-c-text-1, #e0e0e0);
  margin: 0 0 14px;
  letter-spacing: 0.04em;
}

.glossary-card-pinyin {
  font-size: 0.82rem;
  color: var(--vp-c-text-2, #888);
  letter-spacing: 0.06em;
}

.glossary-card-def {
  color: var(--vp-c-text-2, #aaa);
  line-height: 1.85;
  font-size: 0.92rem;
  margin: 0;
}

.glossary-card-link {
  display: inline-block;
  margin-top: 16px;
  font-size: 0.82rem;
  color: var(--glossary-brand-light);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.glossary-card-link:hover {
  border-bottom-color: var(--glossary-brand-light);
}

.glossary-empty {
  text-align: center;
  padding: 60px 20px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 12px;
}

.glossary-empty-title {
  font-size: 1.05rem;
  color: var(--vp-c-text-1, #e0e0e0);
  margin: 0 0 8px;
}

.glossary-empty-hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-2, #888);
  margin: 0;
}

@media (max-width: 640px) {
  .glossary-title {
    font-size: 1.5rem;
  }
  .glossary-grid {
    grid-template-columns: 1fr;
  }
  .glossary-controls {
    position: static;
  }
}
</style>
