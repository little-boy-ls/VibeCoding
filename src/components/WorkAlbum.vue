<script setup lang="ts">
import type { CaptureSlide, ClientKey } from '@/data/portfolio'
import { useReveal } from '@/composables/useReveal'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  workId: string
  workIndex: string
  captures: CaptureSlide[]
  workTitle: string
  workSummary?: string
  clients?: { key: ClientKey; label?: string }[]
  albumTitle?: string
}>()

const AUTOPLAY_MS = 5200

const defaultClientLabels: Record<ClientKey, string> = {
  app: '移动端 · UniApp',
  user: 'PC 用户站',
  admin: '管理后台 · Vben',
  workflow: '工作流编排',
  bot: 'Bot 配置',
}

function clientLabel(key: ClientKey) {
  return props.clients?.find(c => c.key === key)?.label ?? defaultClientLabels[key]
}

const clientTypes = computed(() => new Set(props.captures.map(c => c.client)))
const showTabs = computed(() => clientTypes.value.size > 1)

const tabs: { key: ClientKey | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'app', label: '移动端' },
  { key: 'user', label: 'PC 站' },
  { key: 'admin', label: '管理端' },
  { key: 'workflow', label: '工作流' },
  { key: 'bot', label: 'Bot' },
]

const visibleTabs = computed(() =>
  tabs.filter(t => t.key === 'all' || clientTypes.value.has(t.key as ClientKey)),
)

const activeTab = ref<ClientKey | 'all'>('all')
const current = ref(0)
const paused = ref(false)
const barKey = ref(0)

const filtered = computed(() =>
  activeTab.value === 'all'
    ? props.captures
    : props.captures.filter(c => c.client === activeTab.value),
)

const slide = computed(() => filtered.value[current.value] ?? filtered.value[0])
const total = computed(() => filtered.value.length)

let timer: ReturnType<typeof setInterval> | null = null

function startTimer() {
  stopTimer()
  if (total.value <= 1) return
  timer = setInterval(() => {
    if (!paused.value) advance()
  }, AUTOPLAY_MS)
}

function stopTimer() {
  if (timer) clearInterval(timer)
  timer = null
}

function advance() {
  if (total.value <= 1) return
  barKey.value += 1
  current.value = (current.value + 1) % total.value
}

function goTo(i: number) {
  current.value = i
  barKey.value += 1
}

function prev() {
  if (total.value <= 1) return
  barKey.value += 1
  current.value = (current.value - 1 + total.value) % total.value
}

function onKey(e: KeyboardEvent) {
  const el = document.getElementById(props.workId)
  if (!el) return
  const r = el.getBoundingClientRect()
  if (r.bottom < 80 || r.top > window.innerHeight - 80) return
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    advance()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prev()
  }
}

function setTab(key: ClientKey | 'all') {
  activeTab.value = key
}

watch(activeTab, () => {
  current.value = 0
  barKey.value += 1
  mediaRotateX.value = 0
  mediaRotateY.value = 0
  startTimer()
})

watch(current, () => {
  mediaRotateX.value = 0
  mediaRotateY.value = 0
})

watch(total, () => {
  if (current.value >= total.value) current.value = 0
})

const { el: introEl, visible: introVisible } = useReveal()

const mediaRef = ref<HTMLElement | null>(null)
const mediaRotateX = ref(0)
const mediaRotateY = ref(0)

function onMediaMove(e: MouseEvent) {
  const el = mediaRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  mediaRotateX.value = py * -2.5
  mediaRotateY.value = px * 3.5
}

function onMediaLeave() {
  mediaRotateX.value = 0
  mediaRotateY.value = 0
}

onMounted(() => {
  startTimer()
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  stopTimer()
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <section :id="workId" class="album">
    <span class="album__watermark" aria-hidden="true">{{ workIndex }}</span>

    <div
      ref="introEl"
      class="album__intro"
      :class="{ 'is-visible': introVisible }"
    >
      <p class="eyebrow">{{ workIndex }} — {{ workTitle }}</p>
      <h2 class="album__title">{{ albumTitle ?? '界面与功能设计' }}</h2>
      <p v-if="workSummary" class="album__lead">{{ workSummary }}</p>
    </div>

    <div
      class="album__stage"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <div class="album__bar">
        <nav v-if="showTabs" class="album__tabs" aria-label="端切换">
          <button
            v-for="t in visibleTabs"
            :key="t.key"
            type="button"
            class="album__tab"
            :class="{ 'album__tab--on': activeTab === t.key }"
            @click="setTab(t.key)"
          >
            {{ t.label }}
          </button>
        </nav>
        <span class="album__index">
          <span class="album__index-cur">{{ String(current + 1).padStart(2, '0') }}</span>
          <span class="album__index-sep">/</span>
          <span class="album__index-total">{{ String(total).padStart(2, '0') }}</span>
        </span>
      </div>

      <div class="album__panel">
        <Transition name="album" mode="out-in">
          <div v-if="slide" :key="`${activeTab}-${current}`" class="album__row">
            <div
              ref="mediaRef"
              class="album__media-scene"
              :class="{ 'album__media-scene--phone': slide.client === 'app' }"
              @mousemove="onMediaMove"
              @mouseleave="onMediaLeave"
            >
              <div
                class="album__media"
                :style="{
                  transform: `rotateX(${1 + mediaRotateX}deg) rotateY(${-2 + mediaRotateY}deg)`,
                }"
              >
                <img :src="slide.image" :alt="slide.title" />
              </div>
            </div>

            <div class="album__copy">
              <p class="eyebrow album__anim">{{ clientLabel(slide.client) }}</p>
              <h3 class="album__anim">{{ slide.title }}</h3>
              <p class="album__summary album__anim">{{ slide.caption }}</p>
              <p class="album__detail album__anim">{{ slide.detail }}</p>
              <ul v-if="slide.highlights?.length" class="album__list">
                <li
                  v-for="(h, hi) in slide.highlights"
                  :key="h"
                  class="album__anim"
                  :style="{ '--i': hi }"
                >
                  {{ h }}
                </li>
              </ul>
            </div>
          </div>
        </Transition>

        <div v-if="filtered.length > 1" class="album__film">
          <button
            v-for="(item, i) in filtered"
            :key="`${item.image}-${i}`"
            type="button"
            class="album__thumb"
            :class="{ 'album__thumb--on': i === current }"
            :aria-label="item.title"
            @click="goTo(i)"
          >
            <img :src="item.image" alt="" loading="lazy" />
            <span class="album__thumb-num">{{ String(i + 1).padStart(2, '0') }}</span>
          </button>
        </div>

        <div class="album__foot">
          <div class="album__progress">
            <div
              :key="barKey"
              class="album__progress-fill"
              :class="{ 'album__progress-fill--paused': paused }"
              :style="{ animationDuration: `${AUTOPLAY_MS}ms` }"
            />
          </div>
          <div class="album__controls">
            <div class="album__nav">
              <button type="button" class="album__nav-btn" aria-label="上一屏" @click="prev">
                ←
              </button>
              <span class="album__title-cur">{{ slide?.title }}</span>
              <button type="button" class="album__nav-btn" aria-label="下一屏" @click="advance">
                →
              </button>
            </div>
            <div class="album__dots">
              <button
                v-for="(_, i) in filtered"
                :key="i"
                type="button"
                class="album__dot"
                :class="{ 'album__dot--on': i === current }"
                :aria-label="`第 ${i + 1} 屏`"
                @click="goTo(i)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.album {
  position: relative;
  padding: clamp(4.5rem, 10vw, 7rem) 0;
  background: linear-gradient(180deg, #ffffff 0%, #f5faff 100%);
  border-top: 1px solid var(--line);
  overflow: hidden;
}

.album__watermark {
  position: absolute;
  top: clamp(1rem, 3vw, 2.5rem);
  right: clamp(-1rem, 2vw, 2rem);
  font-family: var(--font-mono);
  font-size: clamp(140px, 26vw, 340px);
  font-weight: 700;
  line-height: 0.8;
  color: var(--accent);
  opacity: 0.05;
  pointer-events: none;
  user-select: none;
}

.album__intro {
  position: relative;
  width: min(var(--wide), 92vw);
  margin: 0 auto 2.75rem;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
}

.album__intro.is-visible {
  opacity: 1;
  transform: none;
}

.album__title {
  font-size: clamp(34px, 6vw, 68px);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1;
  margin: 0.75rem 0 1rem;
  color: var(--ink);
}

.album__lead {
  max-width: 42rem;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.7;
}

.album__stage {
  position: relative;
  width: min(var(--wide), 92vw);
  margin-inline: auto;
}

.album__bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--ink);
  margin-bottom: 1.75rem;
}

.album__tabs {
  display: flex;
  gap: 1.75rem;
}

.album__tab {
  font-size: 13px;
  color: var(--text-secondary);
  padding-bottom: 0.7rem;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.25s, border-color 0.25s;
}

.album__tab--on {
  color: var(--ink);
  border-bottom-color: var(--accent);
}

.album__index {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  padding-bottom: 0.7rem;
  color: var(--text-muted);
}

.album__index-cur {
  color: var(--accent);
  font-weight: 600;
}

.album__index-sep {
  margin: 0 0.3rem;
}

.album__panel {
  position: relative;
  background: var(--white);
  border: 1px solid var(--line);
}

.album__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  padding: clamp(1.5rem, 3vw, 2.5rem);
  align-items: start;
}

.album__media-scene {
  perspective: 1400px;
  perspective-origin: 50% 50%;
}

.album__media-scene--phone {
  max-width: 280px;
  margin-inline: auto;
  width: 100%;
}

.album__media {
  border: 1px solid var(--line);
  background: var(--bg);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.6s var(--ease-out);
  box-shadow: 0 12px 28px rgb(0 112 204 / 0.08);
  will-change: transform;
}

.album__media img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
  display: block;
}

.album__anim {
  animation: copy-in 0.75s var(--ease-out) both;
}

.album__copy .label.album__anim {
  animation-delay: 0.05s;
}

.album__copy h3.album__anim {
  animation-delay: 0.1s;
}

.album__copy .album__summary.album__anim {
  animation-delay: 0.16s;
}

.album__copy .album__detail.album__anim {
  animation-delay: 0.22s;
}

.album__list li.album__anim {
  animation-delay: calc(0.28s + var(--i, 0) * 0.06s);
}

@keyframes copy-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.album__copy h3 {
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0.35rem 0 0.75rem;
  line-height: 1.15;
}

.album__summary {
  font-size: 15px;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.85rem;
}

.album__detail {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.album__list {
  list-style: none;
  display: grid;
  gap: 0.45rem;
}

.album__list li {
  font-size: 13px;
  color: var(--text);
  padding-left: 0.85rem;
  position: relative;
  line-height: 1.5;
}

.album__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
}

.album__foot {
  border-top: 1px solid var(--line);
  padding: 0.85rem 1.5rem 1.25rem;
}

/* 胶片缩略条 */
.album__film {
  display: flex;
  gap: 0.65rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--line);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}

.album__thumb {
  flex-shrink: 0;
  position: relative;
  width: 72px;
  aspect-ratio: 9 / 14;
  overflow: hidden;
  border: 1px solid var(--line);
  opacity: 0.45;
  scroll-snap-align: start;
  transition: opacity 0.35s, border-color 0.35s, transform 0.35s var(--ease-io);
}

.album__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.album__thumb-num {
  position: absolute;
  bottom: 4px;
  left: 4px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.06em;
  color: #fff;
  text-shadow: 0 1px 4px rgb(0 0 0 / 0.5);
}

.album__thumb--on,
.album__thumb:hover {
  opacity: 1;
  border-color: var(--accent);
  transform: translateY(-3px);
}

.album__nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.album__nav-btn {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  transition: border-color 0.25s, color 0.25s, background 0.25s;
}

.album__nav-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}

.album__progress {
  height: 2px;
  background: var(--line);
  margin-bottom: 0.85rem;
  overflow: hidden;
}

.album__progress-fill {
  height: 100%;
  width: 100%;
  background: var(--accent);
  transform-origin: left;
  animation: bar-fill linear forwards;
}

.album__progress-fill--paused {
  animation-play-state: paused;
}

.album__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.album__title-cur {
  font-size: 12px;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  text-align: center;
}

.album__dots {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.album__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--line);
  padding: 0;
  transition: background 0.25s, transform 0.25s;
}

.album__dot--on {
  background: var(--accent);
  transform: scale(1.25);
}

.album-enter-active,
.album-leave-active {
  transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out);
}

.album-enter-active .album__media img {
  animation: media-in 0.85s var(--ease-out) both;
}

.album-leave-active .album__media img {
  transition: opacity 0.4s, transform 0.4s var(--ease-out);
}

.album-enter-from {
  opacity: 0;
}

.album-leave-to {
  opacity: 0;
}

.album-enter-from .album__media img {
  opacity: 0;
  transform: scale(1.015);
}

.album-leave-to .album__media img {
  opacity: 0;
  transform: scale(0.985);
}

@keyframes media-in {
  from {
    opacity: 0;
    transform: scale(1.01);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .album__row {
    grid-template-columns: 1fr;
  }

  .album__media-scene--phone {
    max-width: 220px;
  }
}
</style>
