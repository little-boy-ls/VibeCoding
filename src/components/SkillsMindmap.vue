<script setup lang="ts">
import {
  buildSkillTreeData,
  findCategory,
  resolveCategoryId,
  skillCategories,
  skillTotal,
} from '@/data/skills'
import type { SkillTreeNode } from '@/data/skills'
import { useReveal } from '@/composables/useReveal'
import { TreeChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import type { ECElementEvent, EChartsOption } from 'echarts'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

echarts.use([TreeChart, TooltipComponent, CanvasRenderer])

const activeId = ref(skillCategories[0].id)
const active = computed(() => findCategory(activeId.value))
const chartLive = ref(false)
const tourOn = ref(false)

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null
let ro: ResizeObserver | null = null
let entranceTimers: number[] = []
let tourTimer: ReturnType<typeof setInterval> | null = null
let tourIdx = 0

const ACCENT = '#0070cc'
const INK = '#0a1826'
const LINE = '#dce8f2'
const MUTED = '#5a6b7a'
const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function buildOption(expandedCatIds: string[] | 'all' = 'all', allowCollapse = false): EChartsOption {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: LINE,
      borderWidth: 1,
      textStyle: { color: INK, fontSize: 12 },
      extraCssText: 'box-shadow:0 8px 24px rgb(10 24 38 / 8%); border-radius:2px;',
    },
    series: [
      {
        type: 'tree',
        data: [buildSkillTreeData({ expandedCatIds })],
        top: '8%',
        left: '6%',
        bottom: '8%',
        right: '6%',
        layout: 'radial',
        roam: true,
        scaleLimit: { min: 0.55, max: 2.4 },
        nodeScaleRatio: 1.12,
        symbol: 'circle',
        symbolSize: (_val, params) => {
          const d = params.data as SkillTreeNode
          if (d.id === 'root') return 18
          if (d.children?.length) return 12
          return 5
        },
        edgeShape: 'curve',
        edgeForkPosition: '63%',
        initialTreeDepth: -1,
        expandAndCollapse: allowCollapse,
        animation: true,
        animationDuration: reducedMotion ? 0 : 820,
        animationDurationUpdate: reducedMotion ? 0 : 640,
        animationEasing: 'cubicOut',
        animationEasingUpdate: 'cubicInOut',
        animationDelay: (idx: number) => (reducedMotion ? 0 : idx * 16),
        animationDelayUpdate: (idx: number) => (reducedMotion ? 0 : idx * 10),
        lineStyle: {
          color: LINE,
          width: 1.2,
          curveness: 0.45,
        },
        itemStyle: {
          color: '#ffffff',
          borderColor: ACCENT,
          borderWidth: 1,
        },
        label: {
          position: 'top',
          verticalAlign: 'middle',
          align: 'center',
          fontSize: 11,
          color: INK,
          distance: 7,
          formatter: (p) => {
            const d = p.data as SkillTreeNode
            if (d.id === 'root') return '{root|全栈}'
            if (d.children?.length) return `{cat|${d.name}}`
            return `{leaf|${d.name}}`
          },
          rich: {
            root: {
              fontSize: 14,
              fontWeight: 600,
              color: INK,
            },
            cat: {
              fontSize: 11,
              fontWeight: 500,
              color: INK,
            },
            leaf: {
              fontSize: 10,
              color: MUTED,
            },
          },
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            distance: 5,
          },
          itemStyle: {
            color: ACCENT,
            borderWidth: 0,
            opacity: 0.9,
          },
        },
        emphasis: {
          focus: 'descendant',
          blurScope: 'coordinateSystem',
          scale: true,
          itemStyle: {
            borderColor: ACCENT,
            borderWidth: 2,
            shadowBlur: 12,
            shadowColor: 'rgba(0, 112, 204, 0.18)',
          },
          lineStyle: {
            color: ACCENT,
            width: 1.8,
          },
          label: {
            color: INK,
            fontWeight: 600,
          },
        },
        blur: {
          itemStyle: { opacity: 0.12 },
          lineStyle: { opacity: 0.08 },
          label: { opacity: 0.15 },
        },
      },
    ],
  }
}

function clearEntranceTimers() {
  entranceTimers.forEach(t => clearTimeout(t))
  entranceTimers = []
}

function stopTour() {
  tourOn.value = false
  if (tourTimer) {
    clearInterval(tourTimer)
    tourTimer = null
  }
}

function setChartExpanded(expandedCatIds: string[] | 'all', animate = true, allowCollapse = false) {
  if (!chart) return
  chart.setOption(buildOption(expandedCatIds, allowCollapse), {
    notMerge: false,
    lazyUpdate: !animate,
  })
}

function syncFromChartEvent(params: ECElementEvent) {
  const catId = resolveCategoryId(params.data as SkillTreeNode, String(params.name ?? ''))
  if (!catId) return
  stopTour()
  activeId.value = catId
}

function highlightCategory(catId: string) {
  if (!chart) return
  const cat = findCategory(catId)
  chart.dispatchAction({ type: 'downplay', seriesIndex: 0 })
  // 用分类 label 定位节点，避免展开后 dataIndex 错位
  chart.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    name: cat.label,
  })
}

function playEntrance() {
  clearEntranceTimers()
  stopTour()
  if (!chart) return

  if (reducedMotion) {
    setChartExpanded('all')
    chartLive.value = true
    return
  }

  // 1. 仅中心 + 五分支（叶子折叠）
  setChartExpanded([])
  chartLive.value = true

  entranceTimers.push(
    window.setTimeout(() => {
      // 2. 逐分支展开
      skillCategories.forEach((cat, i) => {
        entranceTimers.push(
          window.setTimeout(() => {
            activeId.value = cat.id
            setChartExpanded(skillCategories.slice(0, i + 1).map(c => c.id))
          }, i * 420),
        )
      })

      // 3. 全部展开 + 启动慢速巡览
      entranceTimers.push(
        window.setTimeout(() => {
          setChartExpanded('all', true, false)
          startTour()
        }, skillCategories.length * 420 + 520),
      )
    }, 480),
  )
}

function startTour() {
  stopTour()
  if (reducedMotion) return
  tourOn.value = true
  tourIdx = 0
  activeId.value = skillCategories[0].id

  tourTimer = setInterval(() => {
    tourIdx = (tourIdx + 1) % skillCategories.length
    activeId.value = skillCategories[tourIdx].id
    highlightCategory(activeId.value)
  }, 2800)
}

function onNodeClick(params: ECElementEvent) {
  syncFromChartEvent(params)
}

function onNodeOver(params: ECElementEvent) {
  syncFromChartEvent(params)
}

function initChart() {
  if (!chartRef.value) return
  chart?.dispose()
  chart = echarts.init(chartRef.value, undefined, { renderer: 'canvas' })
  chart.setOption(buildOption([], false))
  chart.on('click', onNodeClick)
  chart.on('mouseover', onNodeOver)
  playEntrance()
}

function resizeChart() {
  chart?.resize()
}

watch(activeId, id => {
  highlightCategory(id)
})

const { el: headEl, visible: headVisible } = useReveal()
const { el: bodyEl, visible: bodyVisible } = useReveal(0.06)

watch(bodyVisible, async v => {
  if (v) {
    await nextTick()
    initChart()
    resizeChart()
  }
})

onMounted(() => {
  ro = new ResizeObserver(resizeChart)
  if (chartRef.value) ro.observe(chartRef.value)
})

onUnmounted(() => {
  clearEntranceTimers()
  stopTour()
  ro?.disconnect()
  chart?.dispose()
  chart = null
})
</script>

<template>
  <section id="skills" class="mind">
    <div ref="headEl" class="mind__head" :class="{ 'is-visible': headVisible }">
      <p class="eyebrow">Capabilities Map</p>
      <h2 class="mind__title">专业技能</h2>
      <p class="mind__count">
        {{ String(skillCategories.length).padStart(2, '0') }} 分支 ·
        {{ String(skillTotal).padStart(2, '0') }} 节点
      </p>
    </div>

    <div ref="bodyEl" class="mind__stage" :class="{ 'is-visible': bodyVisible }">
      <div class="mind__chart-wrap">
        <div class="mind__orbit mind__orbit--a" aria-hidden="true" />
        <div class="mind__orbit mind__orbit--b" aria-hidden="true" />
        <div class="mind__orbit mind__orbit--c" aria-hidden="true" />
        <div class="mind__pulse" aria-hidden="true" />
        <div class="mind__scan" aria-hidden="true" />

        <div
          ref="chartRef"
          class="mind__chart"
          :class="{ 'mind__chart--live': chartLive }"
          role="img"
          aria-label="ECharts 专业技能思维导图"
        />

        <p class="mind__hint">
          <span v-if="tourOn" class="mind__hint-dot" />
          {{ tourOn ? '分支巡览中 · 点击节点接管' : '点击分支 · 滚轮缩放 · 拖拽平移' }}
        </p>
      </div>

      <aside class="mind__panel">
        <Transition name="panel" mode="out-in">
          <div :key="active.id" class="mind__panel-inner">
            <p class="mind__panel-idx">{{ active.index }}</p>
            <h3 class="mind__panel-title">{{ active.label }}</h3>
            <p class="mind__panel-en">{{ active.en }}</p>
            <p class="mind__panel-note">{{ active.note }}</p>
            <ul class="mind__panel-list">
              <li
                v-for="(item, i) in active.items"
                :key="item"
                class="mind__panel-row"
                :style="{ '--ri': i }"
              >
                <span class="mind__panel-num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="mind__panel-text">{{ item }}</span>
                <span class="mind__panel-line" aria-hidden="true" />
              </li>
            </ul>
          </div>
        </Transition>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.mind {
  padding: clamp(5rem, 11vw, 9rem) 0;
  background: linear-gradient(180deg, #f8fbfe 0%, #ffffff 48%, #f3f8fc 100%);
  border-top: 1px solid var(--line);
}

.mind__head {
  width: min(var(--wide), 92vw);
  margin: 0 auto clamp(2rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 1rem;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out);
}

.mind__head.is-visible {
  opacity: 1;
  transform: none;
}

.mind__title {
  grid-column: 1;
  font-size: clamp(40px, 7vw, 92px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-top: 0.6rem;
  color: var(--ink);
}

.mind__count {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  text-align: right;
}

.mind__stage {
  width: min(var(--wide), 92vw);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(240px, 0.52fr);
  gap: 0;
  align-items: stretch;
  border: 1px solid var(--line);
  background: #fff;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.9s var(--ease-out) 0.08s, transform 0.9s var(--ease-out) 0.08s;
}

.mind__stage.is-visible {
  opacity: 1;
  transform: none;
}

.mind__chart-wrap {
  position: relative;
  border-right: 1px solid var(--line);
  min-height: 540px;
  overflow: hidden;
  background:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 28px 28px;
  background-color: #fcfdfe;
  animation: grid-drift 48s linear infinite;
}

@keyframes grid-drift {
  from {
    background-position: 0 0, 0 0;
  }
  to {
    background-position: 28px 28px, 28px 28px;
  }
}

.mind__orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px dashed rgb(0 112 204 / 0.16);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.mind__orbit--a {
  width: 180px;
  height: 180px;
  animation: orbit-spin 72s linear infinite;
}

.mind__orbit--b {
  width: 280px;
  height: 280px;
  border-style: solid;
  border-color: rgb(0 112 204 / 0.08);
  animation: orbit-spin 96s linear infinite reverse;
}

.mind__orbit--c {
  width: 380px;
  height: 380px;
  border-color: rgb(10 24 38 / 0.06);
  animation: orbit-spin 120s linear infinite;
}

@keyframes orbit-spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.mind__pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border: 1px solid rgb(0 112 204 / 0.35);
  border-radius: 50%;
  pointer-events: none;
  animation: core-pulse 3.2s var(--ease-io) infinite;
}

@keyframes core-pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  70% {
    transform: scale(2.8);
    opacity: 0;
  }
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}

.mind__scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgb(0 112 204 / 0.04) 48%,
    rgb(0 112 204 / 0.08) 50%,
    rgb(0 112 204 / 0.04) 52%,
    transparent 100%
  );
  background-size: 100% 220%;
  background-position: 0 -120%;
  pointer-events: none;
  animation: scan-once 2.4s var(--ease-out) 0.3s 1 both;
}

@keyframes scan-once {
  to {
    background-position: 0 120%;
  }
}

.mind__chart {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 540px;
  opacity: 0;
  transform: scale(0.97);
  transition:
    opacity 0.8s var(--ease-out),
    transform 1s var(--ease-io);
}

.mind__chart--live {
  opacity: 1;
  transform: scale(1);
}

.mind__hint {
  position: absolute;
  left: 1rem;
  bottom: 0.85rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  pointer-events: none;
}

.mind__hint-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: hint-blink 1.4s ease-in-out infinite;
}

@keyframes hint-blink {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

.mind__panel {
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  min-height: 540px;
}

.mind__panel-idx {
  font-family: var(--font-mono);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600;
  color: var(--accent);
  opacity: 0.35;
  line-height: 1;
  margin-bottom: 0.75rem;
}

.mind__panel-title {
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.mind__panel-en {
  margin-top: 0.35rem;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.mind__panel-note {
  margin-top: 0.65rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
  color: var(--text-secondary);
}

.mind__panel-list {
  list-style: none;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 340px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.mind__panel-row {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  padding: 0.55rem 0;
  font-size: 13px;
  letter-spacing: -0.01em;
  color: var(--ink);
  opacity: 0;
  transform: translateX(-10px);
  animation: row-in 0.55s var(--ease-out) forwards;
  animation-delay: calc(var(--ri) * 45ms + 80ms);
}

@keyframes row-in {
  to {
    opacity: 1;
    transform: none;
  }
}

.mind__panel-line {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  animation: line-wipe 0.5s var(--ease-io) forwards;
  animation-delay: calc(var(--ri) * 45ms + 180ms);
}

@keyframes line-wipe {
  to {
    transform: scaleX(1);
    opacity: 0.25;
  }
}

.mind__panel-num {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
}

.mind__panel-text {
  flex: 1;
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out);
}

.panel-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.panel-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .mind__chart-wrap,
  .mind__orbit,
  .mind__pulse,
  .mind__scan,
  .mind__panel-row,
  .mind__panel-line {
    animation: none !important;
  }

  .mind__chart {
    opacity: 1;
    transform: none;
  }

  .mind__panel-row {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 900px) {
  .mind__stage {
    grid-template-columns: 1fr;
  }

  .mind__chart-wrap {
    border-right: none;
    border-bottom: 1px solid var(--line);
    min-height: 420px;
  }

  .mind__chart {
    height: 420px;
  }

  .mind__orbit--c {
    width: 300px;
    height: 300px;
  }

  .mind__panel {
    min-height: 0;
  }

  .mind__panel-list {
    max-height: none;
  }
}
</style>
