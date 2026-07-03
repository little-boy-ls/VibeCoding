<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const x = ref(-100)
const y = ref(-100)
const ringX = ref(-100)
const ringY = ref(-100)
const visible = ref(false)
const pressing = ref(false)

let raf = 0
let tx = -100
let ty = -100

function tick() {
  ringX.value += (tx - ringX.value) * 0.14
  ringY.value += (ty - ringY.value) * 0.14
  raf = requestAnimationFrame(tick)
}

function onMove(e: MouseEvent) {
  if (!visible.value) {
    visible.value = true
    document.documentElement.classList.add('has-cursor')
  }
  x.value = e.clientX
  y.value = e.clientY
  tx = e.clientX
  ty = e.clientY
}

function onDown() {
  pressing.value = true
}
function onUp() {
  pressing.value = false
}
function onLeave() {
  visible.value = false
  document.documentElement.classList.remove('has-cursor')
}

onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  document.documentElement.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(tick)
})
onUnmounted(() => {
  document.documentElement.classList.remove('has-cursor')
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup', onUp)
  document.documentElement.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div
    class="cur"
    :class="{ 'cur--on': visible, 'cur--press': pressing }"
    aria-hidden="true"
  >
    <div class="cur__dot" :style="{ transform: `translate(${x}px, ${y}px)` }" />
    <div class="cur__ring" :style="{ transform: `translate(${ringX}px, ${ringY}px)` }" />
  </div>
</template>

<style scoped>
.cur {
  position: fixed;
  inset: 0;
  z-index: 10001;
  pointer-events: none;
}

.cur__dot,
.cur__ring {
  position: fixed;
  top: 0;
  left: 0;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.35s, width 0.25s, height 0.25s, margin 0.25s;
  will-change: transform;
}

.cur--on .cur__dot,
.cur--on .cur__ring {
  opacity: 1;
}

.cur__dot {
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  background: var(--accent);
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.85);
}

.cur__ring {
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border: 1px solid rgb(0 112 204 / 0.55);
  background: rgb(255 255 255 / 0.12);
}

.cur--press .cur__ring {
  width: 28px;
  height: 28px;
  margin: -14px 0 0 -14px;
  border-color: var(--accent);
}
</style>
