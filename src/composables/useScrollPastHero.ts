import { onMounted, onUnmounted, ref } from 'vue'

/** 滚过首屏约 8% 后切换 Hero Scroll ↔ ScrollRail */
const THRESHOLD_RATIO = 0.08

const pastHero = ref(false)
let subscribers = 0

function updatePastHero() {
  pastHero.value = window.scrollY > window.innerHeight * THRESHOLD_RATIO
}

export function useScrollPastHero() {
  onMounted(() => {
    if (subscribers === 0) {
      updatePastHero()
      window.addEventListener('scroll', updatePastHero, { passive: true })
      window.addEventListener('resize', updatePastHero)
    }
    subscribers++
  })

  onUnmounted(() => {
    subscribers--
    if (subscribers === 0) {
      window.removeEventListener('scroll', updatePastHero)
      window.removeEventListener('resize', updatePastHero)
    }
  })

  return { pastHero }
}
