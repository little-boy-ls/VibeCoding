<script setup lang="ts">
import { getPublishedWorks } from '@/data/portfolio'
import { onMounted, onUnmounted, ref } from 'vue'

const works = getPublishedWorks()

const sections = [
  { id: 'works', label: '作品目录' },
  ...works.map(w => ({ id: w.id, label: w.title })),
]

const progress = ref(0)
const active = ref(0)
const started = ref(false)

function onScroll() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0
  started.value = doc.scrollTop > 40

  let idx = 0
  for (let i = 0; i < sections.length; i++) {
    const el = document.getElementById(sections[i].id)
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) idx = i
  }
  active.value = idx
}

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <aside class="rail" :class="{ 'rail--on': started }" aria-hidden="true">
    <div class="rail__pct">
      <span class="rail__pct-num">{{ String(Math.round(progress * 100)).padStart(2, '0') }}</span>
      <span class="rail__pct-sign">%</span>
    </div>

    <ol class="rail__list">
      <li
        v-for="(s, i) in sections"
        :key="s.id"
        class="rail__item"
        :class="{ 'rail__item--on': i === active }"
        @click="go(s.id)"
      >
        <span class="rail__label">{{ s.label }}</span>
        <span class="rail__num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="rail__tick" />
      </li>
    </ol>

    <div class="rail__track">
      <div class="rail__fill" :style="{ transform: `scaleY(${progress})` }" />
    </div>
  </aside>
</template>

<style scoped>
.rail {
  position: fixed;
  top: 50%;
  right: clamp(0.75rem, 2vw, 1.75rem);
  transform: translateY(-50%);
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.6s var(--ease-out);
  pointer-events: none;
}

.rail--on {
  opacity: 1;
  pointer-events: auto;
}

.rail__pct {
  display: flex;
  align-items: baseline;
  gap: 0.1rem;
  font-family: var(--font-mono);
  color: var(--ink);
}

.rail__pct-num {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.rail__pct-sign {
  font-size: 10px;
  color: var(--accent);
}

.rail__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
}

.rail__item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
  cursor: pointer;
  color: var(--text-muted);
  transition: color 0.3s;
}

.rail__item:hover {
  color: var(--accent);
}

.rail__label {
  font-size: 11px;
  letter-spacing: 0.01em;
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(6px);
  transition: max-width 0.45s var(--ease-io), opacity 0.35s, transform 0.45s var(--ease-io);
}

.rail__item--on .rail__label,
.rail__item:hover .rail__label {
  max-width: 140px;
  opacity: 1;
  transform: none;
}

.rail__num {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  transition: color 0.3s;
}

.rail__item--on {
  color: var(--ink);
}

.rail__item--on .rail__num {
  color: var(--accent);
}

.rail__tick {
  width: 14px;
  height: 1px;
  background: currentColor;
  opacity: 0.5;
  transition: width 0.4s var(--ease-io), opacity 0.3s;
}

.rail__item--on .rail__tick {
  width: 26px;
  opacity: 1;
  background: var(--accent);
}

.rail__track {
  width: 1px;
  height: 84px;
  background: var(--line);
  overflow: hidden;
  margin-right: 6px;
}

.rail__fill {
  width: 100%;
  height: 100%;
  background: var(--accent);
  transform-origin: top;
}

@media (max-width: 900px) {
  .rail {
    display: none;
  }
}
</style>
