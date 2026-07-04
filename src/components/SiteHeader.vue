<script setup lang="ts">
import { siteMeta, getPublishedWorks } from '@/data/portfolio'
import { getPublishedAgents } from '@/data/agents'
import { onMounted, onUnmounted, ref } from 'vue'

const works = getPublishedWorks()
const agents = getPublishedAgents()
const scrolled = ref(false)
const active = ref<'works' | 'album' | 'agents' | 'skills' | ''>('')

const links = [
  { to: '/#works', label: '作品', idx: '01', zone: 'works' as const },
  { to: `/#${works[0]?.id ?? 'works'}`, label: '实录', idx: '02', zone: 'album' as const },
  { to: '/#agents', label: 'Agent', idx: '03', zone: 'agents' as const },
  { to: '/#skills', label: '技能', idx: '04', zone: 'skills' as const },
]

function onScroll() {
  scrolled.value = window.scrollY > 40

  let inAlbum = false
  for (const w of works) {
    const el = document.getElementById(w.id)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= window.innerHeight * 0.55 && r.bottom > 100) inAlbum = true
  }

  let inAgents = false
  for (const a of agents) {
    const el = document.getElementById(a.id)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= window.innerHeight * 0.55 && r.bottom > 100) inAgents = true
  }

  const agentsEl = document.getElementById('agents')
  const skillsEl = document.getElementById('skills')
  const worksEl = document.getElementById('works')

  if (inAgents) {
    active.value = 'agents'
  } else if (inAlbum) {
    active.value = 'album'
  } else if (skillsEl) {
    const sr = skillsEl.getBoundingClientRect()
    if (sr.top <= window.innerHeight * 0.55 && sr.bottom > 100) {
      active.value = 'skills'
    } else if (agentsEl) {
      const ar = agentsEl.getBoundingClientRect()
      if (ar.top <= window.innerHeight * 0.55 && ar.bottom > 100) active.value = 'agents'
      else if (worksEl) {
        const wr = worksEl.getBoundingClientRect()
        if (wr.top <= window.innerHeight * 0.55 && wr.bottom > 100) active.value = 'works'
        else active.value = ''
      } else {
        active.value = ''
      }
    } else if (worksEl) {
      const wr = worksEl.getBoundingClientRect()
      if (wr.top <= window.innerHeight * 0.55 && wr.bottom > 100) active.value = 'works'
      else active.value = ''
    } else {
      active.value = ''
    }
  } else if (worksEl) {
    const r = worksEl.getBoundingClientRect()
    if (r.top <= window.innerHeight * 0.55 && r.bottom > 100) active.value = 'works'
    else active.value = ''
  } else {
    active.value = ''
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--solid': scrolled }">
    <div class="nav__inner">
      <RouterLink to="/" class="nav__brand">
        <img :src="siteMeta.logo" alt="" width="30" height="30" class="logo-round" />
        <span class="nav__name">{{ siteMeta.brand }}</span>
        <span class="nav__slash">/</span>
        <span class="nav__en">{{ siteMeta.enTitle }}</span>
      </RouterLink>

      <nav class="nav__links">
        <RouterLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="nav__link"
          :class="{ 'nav__link--active': active === l.zone }"
        >
          <span class="nav__link-idx">{{ l.idx }}</span>
          <span class="nav__link-text">{{ l.label }}</span>
        </RouterLink>
        <a
          href="https://github.com/little-boy-ls/VibeCoding"
          target="_blank"
          rel="noreferrer"
          class="nav__link nav__link--ext"
        >
          <span class="nav__link-text">GitHub</span>
          <span class="nav__arrow" aria-hidden="true">↗</span>
        </a>
      </nav>

      <div class="nav__status" aria-hidden="true">
        <span class="nav__dot" />
        <span class="nav__status-text">Online · 2026</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 200;
  height: var(--nav-h);
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.4s var(--ease-out), border-color 0.4s var(--ease-out),
    backdrop-filter 0.4s;
}

.nav--solid {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(150%) blur(12px);
  border-bottom-color: var(--line);
}

.nav__inner {
  width: min(var(--wide), 92vw);
  margin-inline: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 14px;
}

.nav__brand img {
  box-shadow: 0 0 0 1px rgb(10 37 64 / 0.12);
}

.nav__name {
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.nav__slash {
  color: var(--text-muted);
}

.nav__en {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: auto;
}

.nav__link {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 13px;
  color: var(--ink);
}

.nav__link-idx {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--accent);
  opacity: 0.7;
}

.nav__link-text {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1.4;
}

.nav__link-text::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s var(--ease-io);
}

.nav__link:hover .nav__link-text::after,
.nav__link--active .nav__link-text::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav__link:hover .nav__link-text,
.nav__link--active .nav__link-text {
  color: var(--accent);
}

.nav__arrow {
  font-size: 12px;
  color: var(--accent);
  transition: transform 0.35s var(--ease-out);
}

.nav__link--ext:hover .nav__arrow {
  transform: translate(2px, -2px);
}

.nav__status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding-left: 1.5rem;
  border-left: 1px solid var(--line);
}

.nav__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2ea043;
  box-shadow: 0 0 0 0 rgb(46 160 67 / 0.5);
  animation: pulse 2.4s ease-out infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgb(46 160 67 / 0.5);
  }
  70% {
    box-shadow: 0 0 0 6px rgb(46 160 67 / 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgb(46 160 67 / 0);
  }
}

@media (max-width: 860px) {
  .nav__status {
    display: none;
  }
}

@media (max-width: 560px) {
  .nav__en,
  .nav__slash {
    display: none;
  }

  .nav__links {
    gap: 1.25rem;
  }

  .nav__link-idx {
    display: none;
  }
}
</style>
