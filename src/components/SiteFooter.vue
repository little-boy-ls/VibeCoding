<script setup lang="ts">
import { siteMeta } from '@/data/portfolio'
</script>

<template>
  <footer class="foot">
    <div class="foot__inner">
      <div class="foot__brand">
        <img :src="siteMeta.logo" alt="" width="40" height="40" class="foot__logo logo-round" />
        <div>
          <p class="foot__name">{{ siteMeta.brand }}</p>
          <p class="foot__tag">{{ siteMeta.tagline }}</p>
        </div>
      </div>

      <div class="foot__col">
        <p class="foot__label">导航</p>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/#works">作品目录</RouterLink>
        <RouterLink to="/#agents">Agent 开发</RouterLink>
        <RouterLink to="/#skills">专业技能</RouterLink>
        <RouterLink to="/#code-verse">界面实录</RouterLink>
      </div>

      <div class="foot__col">
        <p class="foot__label">Agent</p>
        <span>Coze 工作流</span>
        <span>Bot 配置</span>
        <span>GPT Image 2</span>
      </div>

      <div class="foot__col">
        <p class="foot__label">技术栈</p>
        <span v-for="s in siteMeta.stack" :key="s">{{ s }}</span>
      </div>
    </div>

    <div class="foot__bottom">
      <p>界面素材来自本地联调 · public/assets/captures</p>
      <p>© {{ new Date().getFullYear() }} {{ siteMeta.brand }} · lingyue-ai-share</p>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  background: var(--footer-bg);
  color: rgba(255, 255, 255, 0.88);
  padding: 3rem 0 1.5rem;
}

.foot__inner {
  width: min(var(--wide), 92vw);
  margin: 0 auto 2.5rem;
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 2rem;
}

.foot__logo {
  box-shadow: 0 0 0 2px rgb(255 255 255 / 0.12);
}

.foot__brand {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.foot__name {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.foot__tag {
  font-size: 13px;
  opacity: 0.65;
  margin-top: 0.25rem;
}

.foot__label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.45;
  margin-bottom: 0.85rem;
}

.foot__col {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 13px;
}

.foot__col a {
  color: inherit;
  opacity: 0.78;
  transition: opacity 0.2s;
}

.foot__col a:hover {
  opacity: 1;
  color: var(--accent);
}

.foot__col span {
  opacity: 0.72;
}

.foot__bottom {
  width: min(var(--wide), 92vw);
  margin-inline: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 12px;
  opacity: 0.45;
}

@media (max-width: 768px) {
  .foot__inner {
    grid-template-columns: 1fr 1fr;
  }

  .foot__brand {
    grid-column: 1 / -1;
  }
}
</style>
