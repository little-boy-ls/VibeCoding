<script setup lang="ts">
import WorkAlbum from '@/components/WorkAlbum.vue'
import { getPublishedWorks, portfolioWorks, siteMeta } from '@/data/portfolio'
import { useReveal } from '@/composables/useReveal'

const publishedWorks = getPublishedWorks()

const { el: heroEl, visible: heroVisible } = useReveal(0.2)
const { el: shelfEl, visible: shelfVisible } = useReveal()

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
          :src="siteMeta.heroVideo"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        />
      </div>
      <div ref="heroEl" class="hero__inner reveal" :class="{ 'is-visible': heroVisible }">
        <img :src="siteMeta.logo" alt="" class="hero__logo logo-round" width="64" height="64" />
        <p class="label">{{ siteMeta.enTitle }}</p>
        <h1>{{ siteMeta.brand }}</h1>
        <p class="hero__sub">{{ siteMeta.tagline }}</p>
        <p v-if="siteMeta.description" class="hero__desc">{{ siteMeta.description }}</p>
        <a href="#works" class="hero__link">浏览作品</a>
      </div>
      <div class="hero__line" aria-hidden="true" />
    </section>

    <section id="works" class="shelf">
      <div ref="shelfEl" class="shelf__head reveal" :class="{ 'is-visible': shelfVisible }">
        <p class="label">Collection</p>
        <h2>作品目录</h2>
      </div>
      <div class="shelf__list">
        <article
          v-for="work in portfolioWorks"
          :key="work.id"
          class="shelf__item"
          :class="{ 'shelf__item--off': work.status === 'draft' }"
          @click="work.status === 'published' && scrollToWork(work.id)"
        >
          <div class="shelf__cover">
            <img :src="work.cover" :alt="work.title" loading="lazy" />
          </div>
          <div class="shelf__meta">
            <span class="shelf__idx">{{ work.index }}</span>
            <h3>{{ work.title }}</h3>
            <p class="shelf__sub">{{ work.subtitle }}</p>
            <p v-if="work.status === 'published'" class="shelf__sum">{{ work.tagline }}</p>
            <span v-if="work.status === 'published'" class="shelf__count">
              {{ work.captures.length }} 屏实机截图
            </span>
            <span v-else class="shelf__count shelf__count--muted">筹备中</span>
          </div>
        </article>
      </div>
    </section>

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
  </div>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 48px);
  min-height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem 3rem;
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
}

.hero__inner {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 32rem;
  text-shadow:
    0 0 24px rgb(255 255 255 / 0.95),
    0 1px 2px rgb(255 255 255 / 0.8);
}

.hero__inner.is-visible .hero__logo {
  animation: hero-in 0.9s var(--ease-out) both;
}

.hero__inner.is-visible .label {
  animation: hero-in 0.9s var(--ease-out) 0.08s both;
}

.hero__inner.is-visible h1 {
  animation: hero-in 1s var(--ease-out) 0.14s both;
}

.hero__inner.is-visible .hero__sub {
  animation: hero-in 1s var(--ease-out) 0.22s both;
}

.hero__inner.is-visible .hero__desc {
  animation: hero-in 1s var(--ease-out) 0.3s both;
}

.hero__inner.is-visible .hero__link {
  animation: hero-in 1s var(--ease-out) 0.38s both;
}

.hero__logo {
  margin: 0 auto 1.5rem;
  opacity: 0;
  box-shadow:
    0 0 0 3px rgb(255 255 255 / 0.95),
    0 0 0 4px rgb(0 112 204 / 0.12),
    0 8px 24px rgb(0 112 204 / 0.1);
}

.hero__inner h1 {
  font-size: clamp(44px, 9vw, 72px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 0.65rem;
  opacity: 0;
}

.hero__sub {
  font-size: clamp(20px, 3.5vw, 26px);
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.75rem;
  opacity: 0;
}

.hero__desc {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 1.75rem;
  opacity: 0;
}

.hero__link {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  padding-bottom: 2px;
  border-bottom: 1px solid var(--accent);
  opacity: 0;
  transition: color 0.25s, border-color 0.25s;
}

.hero__link:hover {
  color: var(--accent-hover);
  border-bottom-color: var(--accent-hover);
}

.hero__line {
  position: absolute;
  bottom: 3rem;
  width: 1px;
  height: 48px;
  background: var(--accent);
  opacity: 0.35;
  transform-origin: top;
  animation: hero-line 2.4s var(--ease-out) infinite;
  z-index: 1;
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-line {
  0%,
  100% {
    transform: scaleY(0.35);
    opacity: 0.35;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

.shelf {
  padding: clamp(4rem, 9vw, 6rem) 0;
  background: linear-gradient(180deg, #eef6ff 0%, #f7fbff 50%, #ffffff 100%);
  border-top: 1px solid var(--line);
}

.shelf__head {
  width: min(var(--max), 88vw);
  margin: 0 auto 2.5rem;
}

.shelf__head h2 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 0.4rem;
}

.shelf__list {
  width: min(var(--wide), 92vw);
  margin-inline: auto;
  display: grid;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.shelf__item {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2rem;
  align-items: center;
  padding: 1.75rem 2rem;
  background: var(--white);
  cursor: pointer;
  transition: background 0.4s var(--ease-out);
}

.shelf__item:hover:not(.shelf__item--off) {
  background: var(--accent-light);
}

.shelf__item--off {
  cursor: default;
  opacity: 0.55;
}

.shelf__cover {
  aspect-ratio: 9 / 14;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--bg);
}

.shelf__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 1s var(--ease-out);
}

.shelf__item:hover:not(.shelf__item--off) .shelf__cover img {
  transform: scale(1.02);
}

.shelf__idx {
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--accent-muted);
}

.shelf__meta h3 {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0.2rem 0 0.25rem;
}

.shelf__sub {
  font-size: 14px;
  color: var(--text-secondary);
}

.shelf__sum {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 0.5rem;
  line-height: 1.55;
}

.shelf__count {
  display: inline-block;
  margin-top: 0.65rem;
  font-size: 12px;
  color: var(--accent);
}

.shelf__count--muted {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .shelf__item {
    grid-template-columns: 96px 1fr;
    padding: 1.25rem;
    gap: 1rem;
  }
}
</style>
