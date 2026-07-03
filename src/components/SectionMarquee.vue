<script setup lang="ts">
defineProps<{ text?: string }>()
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span v-for="n in 2" :key="n" class="marquee__line">{{ text }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--ink);
  background: var(--ink);
  color: rgba(255, 255, 255, 0.88);
  padding: 0.85rem 0;
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: roll 28s linear infinite;
}

.marquee__line {
  flex-shrink: 0;
  padding-right: 3rem;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
}

@keyframes roll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
