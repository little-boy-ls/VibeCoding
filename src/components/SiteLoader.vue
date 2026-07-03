<script setup lang="ts">
import { siteMeta } from '@/data/portfolio'
import { computed, onMounted, ref } from 'vue'

const pct = ref(0)
const count = ref(3)
const done = ref(false)

const R = 54
const C = 2 * Math.PI * R
const dashoffset = computed(() => C * (1 - pct.value / 100))

function finish() {
  done.value = true
  window.dispatchEvent(new CustomEvent('intro:done'))
}

onMounted(() => {
  // 每次进入都完整播放 3 秒倒计时
  const start = performance.now()
  const dur = 3000

  function tick(t: number) {
    const p = Math.min(1, (t - start) / dur)
    pct.value = Math.round(p * 100)
    count.value = Math.max(1, Math.ceil((1 - p) * 3))
    if (p < 1) requestAnimationFrame(tick)
    else setTimeout(finish, 420)
  }
  requestAnimationFrame(tick)
})
</script>

<template>
  <div class="loader" :class="{ 'loader--done': done }" aria-hidden="true">
    <div class="loader__top">
      <span>{{ siteMeta.brand }} — {{ siteMeta.enTitle }}</span>
      <span>Portfolio · 2026</span>
    </div>

    <div class="loader__center">
      <div class="cd">
        <svg class="cd__ring" viewBox="0 0 120 120">
          <circle class="cd__ring-bg" cx="60" cy="60" :r="R" />
          <circle
            class="cd__ring-fg"
            cx="60"
            cy="60"
            :r="R"
            :stroke-dasharray="C"
            :stroke-dashoffset="dashoffset"
          />
        </svg>
        <div class="cd__num">
          <Transition name="cd" mode="out-in">
            <span :key="count" class="cd__digit">{{ count }}</span>
          </Transition>
        </div>
      </div>
      <p class="loader__word">{{ siteMeta.tagline }}</p>
    </div>

    <div class="loader__bottom">
      <div class="loader__bar">
        <div class="loader__bar-fill" :style="{ transform: `scaleX(${pct / 100})` }" />
      </div>
      <div class="loader__count">
        <span>{{ String(pct).padStart(3, '0') }}</span>
        <span class="loader__pct">%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(180deg, #ffffff 0%, #f2f8ff 60%, #e8f2fb 100%);
  color: var(--ink);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(1.5rem, 4vw, 3rem);
  transition: transform 1.4s var(--ease-io), opacity 0.6s ease 0.6s;
  will-change: transform;
}

.loader--done {
  transform: translateY(-100%);
  pointer-events: none;
}

.loader__top {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-muted);
}

.loader__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  flex: 1;
}

/* 倒计时圆环 */
.cd {
  position: relative;
  width: clamp(140px, 26vw, 210px);
  aspect-ratio: 1;
}

.cd__ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
}

.cd__ring-bg {
  fill: none;
  stroke: var(--line);
  stroke-width: 1.5;
}

.cd__ring-fg {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.2s linear;
}

.cd__num {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cd__digit {
  font-family: var(--font-mono);
  font-size: clamp(56px, 12vw, 96px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

/* 数字翻动：下滑入 + 轻微放大 / 上滑出 */
.cd-enter-active {
  transition: transform 0.5s var(--ease-io), opacity 0.4s var(--ease-io);
}

.cd-leave-active {
  transition: transform 0.4s var(--ease-io), opacity 0.35s var(--ease-io);
}

.cd-enter-from {
  transform: translateY(80%) scale(0.82);
  opacity: 0;
}

.cd-leave-to {
  transform: translateY(-80%) scale(0.82);
  opacity: 0;
}

.loader__word {
  font-size: clamp(16px, 2.6vw, 26px);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--ink);
  animation: word-in 1.1s var(--ease-io) both;
}

@keyframes word-in {
  from {
    opacity: 0;
    transform: translateY(0.6em);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.loader__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.loader__bar {
  flex: 1;
  height: 1px;
  background: var(--line);
  overflow: hidden;
}

.loader__bar-fill {
  height: 100%;
  width: 100%;
  background: var(--accent);
  transform-origin: left;
}

.loader__count {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-weight: 600;
  line-height: 0.85;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.loader__count span:first-child {
  font-size: clamp(40px, 8vw, 88px);
}

.loader__pct {
  font-size: clamp(14px, 2.2vw, 24px);
  color: var(--accent);
}
</style>
