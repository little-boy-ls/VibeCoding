<script setup lang="ts">
import WorkAlbum from '@/components/WorkAlbum.vue'
import SectionMarquee from '@/components/SectionMarquee.vue'
import SkillsMindmap from '@/components/SkillsMindmap.vue'
import { getPublishedAgents, agentModules } from '@/data/agents'
import type { AgentModule } from '@/data/agents'
import { getPublishedWorks, portfolioWorks, siteMeta } from '@/data/portfolio'
import type { PortfolioWork } from '@/data/portfolio'
import { useReveal } from '@/composables/useReveal'
import { useScrollPastHero } from '@/composables/useScrollPastHero'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const publishedWorks = getPublishedWorks()
const publishedAgents = getPublishedAgents()

const ready = ref(false)
const heroScrollIntro = ref(true)
function onIntroDone() {
  ready.value = true
}
onMounted(() => {
  window.addEventListener('intro:done', onIntroDone)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  window.setTimeout(() => (ready.value = true), 4200)
})
onUnmounted(() => {
  window.removeEventListener('intro:done', onIntroDone)
  window.removeEventListener('scroll', onScroll)
})

const { el: shelfEl, visible: shelfVisible } = useReveal()
const { el: agentShelfEl, visible: agentShelfVisible } = useReveal()
const { pastHero } = useScrollPastHero()

watch(pastHero, v => {
  if (v) heroScrollIntro.value = false
})

const heroStats = [
  { k: 'Projects', v: String(publishedWorks.length).padStart(2, '0') },
  { k: 'Year', v: '2026' },
  { k: 'Scope', v: '全栈 · 三端' },
]

const hoverWork = ref<PortfolioWork | AgentModule | null>(null)
const mx = ref(0)
const my = ref(0)
const panX = ref(0)
const panY = ref(0)
const heroScale = ref(1)

function onScroll() {
  const y = window.scrollY
  heroScale.value = 1 + Math.min(y * 0.00012, 0.06)
}

function onRowEnter(w: PortfolioWork | AgentModule) {
  if (w.status === 'published') hoverWork.value = w
}
function onRowLeave() {
  hoverWork.value = null
  panX.value = 0
  panY.value = 0
}
function onListMove(e: MouseEvent) {
  mx.value = e.clientX
  my.value = e.clientY
  if (!hoverWork.value) return
  panX.value = (e.clientX - window.innerWidth / 2) * 0.018
  panY.value = (e.clientY - window.innerHeight / 2) * 0.018
}

function scrollToWork(workId: string) {
  document.getElementById(workId)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero__media" aria-hidden="true">
        <video
          class="hero__video"
          :style="{ transform: `scale(${heroScale})` }"
          :src="siteMeta.heroVideo"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        />
        <div class="hero__scrim" />
      </div>

      <div class="hero__inner" :class="{ 'is-ready': ready }">
        <p class="eyebrow hero__eyebrow">{{ siteMeta.enTitle }} — Portfolio</p>
        <h1 class="hero__title">
          <span class="hero__mask"><span class="hero__line-a">{{ siteMeta.brand }}</span></span>
          <span class="hero__mask"><span class="hero__line-b">{{ siteMeta.tagline }}</span></span>
        </h1>

        <div class="hero__meta">
          <div v-for="s in heroStats" :key="s.k" class="hero__stat">
            <span class="hero__stat-k">{{ s.k }}</span>
            <span class="hero__stat-v">{{ s.v }}</span>
          </div>
        </div>
      </div>

      <a
        href="#works"
        class="hero__scroll"
        :class="{
          'is-ready': ready,
          'is-away': pastHero,
          'is-intro': heroScrollIntro,
        }"
        aria-label="向下浏览"
      >
        <span>Scroll</span>
        <span class="hero__scroll-line" />
      </a>
    </section>

    <section id="works" class="shelf">
      <div ref="shelfEl" class="shelf__head" :class="{ 'is-visible': shelfVisible }">
        <p class="eyebrow">Selected Work</p>
        <h2 class="shelf__title">作品目录</h2>
        <p class="shelf__count-total">{{ String(portfolioWorks.length).padStart(2, '0') }} 个项目</p>
      </div>

      <div
        class="shelf__list"
        :class="{ 'is-hovering': hoverWork, 'is-visible': shelfVisible }"
        @mousemove="onListMove"
      >
        <article
          v-for="(work, ri) in portfolioWorks"
          :key="work.id"
          class="row"
          :style="{ '--ri': ri }"
          :class="{
            'row--off': work.status === 'draft',
            'row--dim': hoverWork && hoverWork.id !== work.id,
          }"
          @mouseenter="onRowEnter(work)"
          @mouseleave="onRowLeave"
          @click="work.status === 'published' && scrollToWork(work.id)"
        >
          <span class="row__idx">{{ work.index }}</span>

          <div class="row__main">
            <h3 class="row__title">{{ work.title }}</h3>
            <p class="row__sub">{{ work.subtitle }}</p>
          </div>

          <div class="row__tags">
            <template v-if="work.status === 'published'">
              <span v-for="c in work.clients" :key="c.key" class="row__tag">
                {{ c.desc }}
              </span>
            </template>
            <span v-else class="row__tag row__tag--muted">筹备中</span>
          </div>

          <div class="row__end">
            <span class="row__year">{{ work.year }}</span>
            <span class="row__arrow" aria-hidden="true">
              {{ work.status === 'published' ? '→' : '·' }}
            </span>
          </div>

          <!-- 移动端行内缩略图 -->
          <div v-if="work.status === 'published'" class="row__thumb">
            <img :src="work.cover" :alt="work.title" loading="lazy" />
          </div>
        </article>
      </div>
    </section>

    <SectionMarquee
      text="VibeCoding · Full Stack · Code-Verse · Void Expedition · Stack High · Tick Off · Interface Design · 2026 · "
    />

    <WorkAlbum
      v-for="work in publishedWorks"
      :key="work.id"
      :work-id="work.id"
      :work-index="work.index"
      :captures="work.captures"
      :work-title="work.title"
      :work-summary="work.summary"
      :clients="work.clients"
    />

    <SectionMarquee
      text="Agent Dev · Coze Workflow · Bot Config · GPT Image 2 · VibeCoding · 2026 · "
    />

    <section id="agents" class="shelf shelf--agents">
      <div ref="agentShelfEl" class="shelf__head" :class="{ 'is-visible': agentShelfVisible }">
        <p class="eyebrow">Agent Development</p>
        <h2 class="shelf__title">Agent 开发</h2>
        <p class="shelf__count-total">{{ String(agentModules.length).padStart(2, '0') }} 个平台</p>
      </div>

      <div
        class="shelf__list"
        :class="{ 'is-hovering': hoverWork, 'is-visible': agentShelfVisible }"
        @mousemove="onListMove"
      >
        <article
          v-for="(agent, ri) in agentModules"
          :key="agent.id"
          class="row"
          :style="{ '--ri': ri }"
          :class="{
            'row--off': agent.status === 'draft',
            'row--dim': hoverWork && hoverWork.id !== agent.id,
          }"
          @mouseenter="onRowEnter(agent)"
          @mouseleave="onRowLeave"
          @click="agent.status === 'published' && scrollToWork(agent.id)"
        >
          <span class="row__idx">{{ agent.index }}</span>

          <div class="row__main">
            <h3 class="row__title">{{ agent.title }}</h3>
            <p class="row__sub">{{ agent.subtitle }}</p>
          </div>

          <div class="row__tags">
            <template v-if="agent.status === 'published'">
              <span v-for="c in agent.clients" :key="c.key" class="row__tag">
                {{ c.desc }}
              </span>
            </template>
            <span v-else class="row__tag row__tag--muted">筹备中</span>
          </div>

          <div class="row__end">
            <span class="row__year">{{ agent.year }}</span>
            <span class="row__arrow" aria-hidden="true">
              {{ agent.status === 'published' ? '→' : '·' }}
            </span>
          </div>

          <div v-if="agent.status === 'published'" class="row__thumb">
            <img :src="agent.cover" :alt="agent.title" loading="lazy" />
          </div>
        </article>
      </div>
    </section>

    <WorkAlbum
      v-for="agent in publishedAgents"
      :key="agent.id"
      :work-id="agent.id"
      :work-index="agent.index"
      :captures="agent.captures"
      :work-title="agent.title"
      :work-summary="agent.summary"
      :clients="agent.clients"
      album-title="工作流与 Bot 配置"
    />

    <SkillsMindmap />

    <!-- 光标跟随封面预览（桌面） -->
    <div
      class="preview"
      :class="{ 'preview--on': hoverWork }"
      :style="{ transform: `translate3d(${mx}px, ${my}px, 0)` }"
      aria-hidden="true"
    >
      <div class="preview__frame">
        <img
          v-if="hoverWork"
          :src="hoverWork.cover"
          :alt="hoverWork.title"
          :style="{ transform: `translate(${panX}px, ${panY}px) scale(1.08)` }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.shelf--agents {
  background: linear-gradient(180deg, #f5faff 0%, #ffffff 100%);
}

/* ============ HERO ============ */
.hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 6rem clamp(1.25rem, 4vw, 3rem) clamp(2.5rem, 6vw, 4rem);
  position: relative;
  overflow: hidden;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform-origin: center center;
  transition: transform 0.15s linear;
  will-change: transform;
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.1) 0%, rgb(255 255 255 / 0) 30%),
    linear-gradient(0deg, rgb(255 255 255 / 0.72) 0%, rgb(255 255 255 / 0) 46%);
}

.hero__inner {
  position: relative;
  z-index: 1;
  width: min(var(--wide), 92vw);
  margin-inline: auto;
}

.hero__eyebrow {
  margin-bottom: 1.25rem;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}

.hero__inner.is-ready .hero__eyebrow {
  opacity: 1;
  transform: none;
  transition-delay: 0.05s;
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: 0.28em;
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--ink);
}

/* 遮罩逐行揭示 */
.hero__mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.16em;
  margin-bottom: -0.16em;
}

.hero__line-a,
.hero__line-b {
  display: block;
  line-height: 1.08;
  transform: translateY(115%);
  transition: transform 1.05s var(--ease-io);
}

.hero__inner.is-ready .hero__line-a {
  transform: none;
  transition-delay: 0.12s;
}

.hero__inner.is-ready .hero__line-b {
  transform: none;
  transition-delay: 0.24s;
}

.hero__line-a {
  font-size: clamp(52px, 9vw, 108px);
}

.hero__line-b {
  font-size: clamp(18px, 2.6vw, 32px);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--accent);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(2rem, 5vw, 4rem);
  margin-top: clamp(2rem, 4vw, 3rem);
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
}

.hero__inner.is-ready .hero__meta {
  opacity: 1;
  transform: none;
  transition-delay: 0.42s;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.hero__stat-k {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.hero__stat-v {
  font-size: 17px;
  font-weight: 600;
  color: var(--ink);
}

.hero__scroll {
  position: absolute;
  right: clamp(1.25rem, 4vw, 3rem);
  bottom: clamp(2.5rem, 6vw, 4rem);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  writing-mode: vertical-rl;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s var(--ease-out);
}

.hero__scroll.is-ready:not(.is-away) {
  opacity: 1;
  pointer-events: auto;
}

.hero__scroll.is-intro.is-ready:not(.is-away) {
  transition-delay: 0.6s;
}

.hero__scroll.is-away {
  transition-delay: 0s;
}

.hero__scroll-line {
  width: 1px;
  height: 46px;
  background: var(--accent);
  transform-origin: top;
  animation: scroll-drop 2.2s var(--ease-io) infinite;
}

@keyframes scroll-drop {
  0% {
    transform: scaleY(0);
    transform-origin: top;
  }
  40% {
    transform: scaleY(1);
    transform-origin: top;
  }
  60% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
  100% {
    transform: scaleY(0);
    transform-origin: bottom;
  }
}

@media (max-width: 640px) {
  .hero__scroll {
    display: none;
  }
}

/* ============ SHELF (作品目录) ============ */
.shelf {
  padding: clamp(4.5rem, 10vw, 8rem) 0;
  background: linear-gradient(180deg, #ffffff 0%, #f5faff 100%);
  border-top: 1px solid var(--line);
}

.shelf__head {
  width: min(var(--wide), 92vw);
  margin: 0 auto clamp(2.5rem, 5vw, 4rem);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 1rem;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
}

.shelf__head.is-visible {
  opacity: 1;
  transform: none;
}

.shelf__title {
  grid-column: 1;
  font-size: clamp(40px, 7vw, 92px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-top: 0.6rem;
  color: var(--ink);
}

.shelf__count-total {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}

.shelf__list {
  width: min(var(--wide), 92vw);
  margin-inline: auto;
  border-top: 1px solid var(--ink);
}

/* editorial row */
.row {
  position: relative;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding: clamp(1.5rem, 3vw, 2.4rem) 0.5rem;
  border-bottom: 1px solid var(--grid-line);
  cursor: pointer;
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out),
    background 0.4s var(--ease-out);
}

.shelf__list.is-visible .row {
  opacity: 1;
  transform: none;
  transition-delay: calc(var(--ri, 0) * 0.09s);
}

.row--off {
  cursor: default;
}

.shelf__list.is-visible.is-hovering .row {
  transition-delay: 0s;
}

.shelf__list.is-hovering .row--dim {
  opacity: 0.32;
}

.row__idx {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 0.05em;
}

.row__title {
  font-size: clamp(28px, 5vw, 58px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.02;
  color: var(--ink);
  transition: transform 0.5s var(--ease-io), color 0.3s;
}

.row:not(.row--off):hover .row__title {
  transform: translateX(18px);
  color: var(--accent);
}

.row__sub {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  transition: transform 0.5s var(--ease-io);
}

.row:not(.row--off):hover .row__sub {
  transform: translateX(18px);
}

.row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-end;
  max-width: 240px;
}

.row__tag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  padding: 0.28rem 0.55rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  white-space: nowrap;
}

.row__tag--muted {
  color: var(--text-muted);
}

.row__end {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.row__year {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-secondary);
}

.row__arrow {
  font-size: 20px;
  color: var(--accent);
  transition: transform 0.45s var(--ease-io);
}

.row:not(.row--off):hover .row__arrow {
  transform: translateX(8px);
}

.row::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.55s var(--ease-io);
}

.row:not(.row--off):hover::after {
  transform: scaleX(1);
}

.row__thumb {
  display: none;
}

/* ============ 光标跟随预览 ============ */
.preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  pointer-events: none;
  will-change: transform;
}

.preview__frame {
  width: 240px;
  height: 320px;
  margin: -160px 0 0 -120px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--bg);
  box-shadow: 0 24px 60px rgb(10 37 64 / 0.22);
  opacity: 0;
  transform: scale(0.9) rotate(-3deg);
  transition: opacity 0.4s var(--ease-out), transform 0.5s var(--ease-io);
}

.preview--on .preview__frame {
  opacity: 1;
  transform: scale(1) rotate(-2deg);
}

.preview__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s var(--ease-io);
  will-change: transform;
}

@media (hover: none) {
  .preview {
    display: none;
  }
}

/* ============ 响应式 ============ */
@media (max-width: 860px) {
  .row {
    grid-template-columns: 48px 1fr auto;
  }

  .row__tags {
    display: none;
  }
}

@media (max-width: 640px) {
  .shelf__head {
    grid-template-columns: 1fr;
  }

  .shelf__count-total {
    grid-column: 1;
  }

  .row {
    grid-template-columns: 40px 1fr;
    gap: 1rem;
    align-items: start;
  }

  .row__end {
    display: none;
  }

  .row__thumb {
    display: block;
    grid-column: 2;
    margin-top: 1rem;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border: 1px solid var(--line);
  }

  .row__thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .row:not(.row--off):hover .row__title,
  .row:not(.row--off):hover .row__sub {
    transform: none;
  }
}
</style>
