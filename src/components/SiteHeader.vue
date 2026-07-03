<script setup lang="ts">
import { siteMeta } from '@/data/portfolio'
</script>

<template>
  <header class="nav">
    <div class="nav__inner">
      <RouterLink to="/" class="nav__brand">
        <img :src="siteMeta.logo" alt="" width="32" height="32" class="logo-round" />
        <span>{{ siteMeta.brand }}</span>
      </RouterLink>
      <nav class="nav__links">
        <RouterLink to="/#works">作品</RouterLink>
        <RouterLink to="/#code-verse">界面</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid var(--line);
}

.nav__inner {
  width: min(var(--wide), 92vw);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.nav__brand img {
  box-shadow: 0 0 0 1px rgb(0 112 204 / 0.1);
}

.nav__links {
  display: flex;
  gap: 1.5rem;
}

.nav__links a {
  font-size: 13px;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.nav__links a:hover {
  color: var(--accent);
}
</style>
