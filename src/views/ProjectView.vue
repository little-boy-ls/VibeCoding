<script setup lang="ts">
import { useProjectStore } from '@/stores/project'
import { storeToRefs } from 'pinia'

const store = useProjectStore()
const { repos, activeRepo } = storeToRefs(store)
</script>

<template>
  <div class="project-page">
    <section class="section">
      <div class="container">
        <p class="eyebrow">Repositories</p>
        <h1 class="page-title">工程拆解</h1>
        <p class="page-lead">
          点击切换仓库，查看目录职责、技术栈与本地启动命令。所有子项目位于同一 monorepo 根目录下。
        </p>

        <div class="repo-tabs">
          <button
            v-for="repo in repos"
            :key="repo.id"
            type="button"
            class="repo-tab"
            :class="{ 'repo-tab--on': activeRepo.id === repo.id }"
            @click="store.setRepo(repo.id)"
          >
            {{ repo.name }}
            <span v-if="repo.port" class="repo-tab__port">{{ repo.port }}</span>
          </button>
        </div>

        <article class="repo-panel">
          <header class="repo-panel__head">
            <div>
              <h2>{{ activeRepo.name }}</h2>
              <p class="repo-panel__folder">./{{ activeRepo.folder }}/</p>
            </div>
            <code class="repo-panel__cmd">{{ activeRepo.command }}</code>
          </header>
          <p class="repo-panel__summary">{{ activeRepo.summary }}</p>

          <div class="repo-panel__grid">
            <div>
              <h3>技术栈</h3>
              <ul class="repo-list">
                <li v-for="s in activeRepo.stack" :key="s">{{ s }}</li>
              </ul>
            </div>
            <div>
              <h3>要点</h3>
              <ul class="repo-list repo-list--bullets">
                <li v-for="h in activeRepo.highlights" :key="h">{{ h }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section section--paper">
      <div class="container">
        <h2 class="section__title">目录对照</h2>
        <div class="dir-table">
          <div class="dir-row dir-row--head">
            <span>仓库</span>
            <span>关键路径</span>
            <span>说明</span>
          </div>
          <div class="dir-row">
            <span>boot</span>
            <code>yudao-module-cverse/src/main/java/.../cverse/</code>
            <span>DO / Service / Controller</span>
          </div>
          <div class="dir-row">
            <span>boot</span>
            <code>sql/2026-07-02/</code>
            <span>DDL、菜单、模拟数据</span>
          </div>
          <div class="dir-row">
            <span>uniapp</span>
            <code>src/pages/ + src/pages-cverse/</code>
            <span>Tab 页 + 业务分包</span>
          </div>
          <div class="dir-row">
            <span>uniapp</span>
            <code>src/api/cverse/index.ts</code>
            <span>app-api / admin-api 封装</span>
          </div>
          <div class="dir-row">
            <span>admin-vben</span>
            <code>apps/web-antd/src/views/cverse/</code>
            <span>19 个运营模块页面</span>
          </div>
          <div class="dir-row">
            <span>user</span>
            <code>src/views/</code>
            <span>PC 端工作台与各业务页</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <h2 class="section__title section__title--light">本地联调</h2>
        <ol class="run-steps">
          <li>
            <strong>MySQL + Redis</strong> 就绪，执行 <code>code-verse-boot/sql/2026-07-02/</code> 脚本
          </li>
          <li>
            <strong>后端</strong> <code>yudao-server</code> → http://localhost:48080
          </li>
          <li>
            <strong>管理端</strong> <code>pnpm dev:antd</code> → http://localhost:5666
          </li>
          <li>
            <strong>PC 用户站</strong> <code>pnpm dev</code> → http://localhost:5667
          </li>
          <li>
            <strong>移动端 H5</strong> <code>pnpm dev:h5</code> → Vite 开发端口
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 0.35rem 0 0.75rem;
}

.page-lead {
  max-width: 36rem;
  color: var(--ink-soft);
  margin-bottom: 2rem;
}

.repo-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.repo-tab {
  font-family: var(--mono);
  font-size: 0.78rem;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--line);
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.repo-tab--on {
  background: var(--ink);
  color: var(--paper-bright);
  border-color: var(--ink);
}

.repo-tab__port {
  opacity: 0.6;
  font-size: 0.7rem;
}

.repo-panel {
  padding: 1.75rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--paper-bright);
}

.repo-panel__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.repo-panel__head h2 {
  font-size: 1.35rem;
}

.repo-panel__folder {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--accent);
  margin-top: 0.25rem;
}

.repo-panel__cmd {
  font-family: var(--mono);
  font-size: 0.75rem;
  padding: 0.45rem 0.7rem;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 2px;
}

.repo-panel__summary {
  color: var(--ink-soft);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.repo-panel__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 2rem;
}

.repo-panel__grid h3 {
  font-size: 0.85rem;
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.65rem;
  color: var(--ink-soft);
}

.repo-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.repo-list li {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  background: var(--paper);
  border-radius: 2px;
}

.repo-list--bullets {
  flex-direction: column;
  gap: 0.5rem;
}

.repo-list--bullets li {
  background: none;
  padding: 0;
  padding-left: 1rem;
  position: relative;
}

.repo-list--bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--rust);
}

.dir-table {
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  font-size: 0.88rem;
}

.dir-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--line);
  align-items: center;
}

.dir-row--head {
  background: var(--ink);
  color: var(--paper-bright);
  border-top: none;
  font-family: var(--mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.dir-row code {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--accent);
  word-break: break-all;
}

.run-steps {
  margin-top: 1.25rem;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.85rem;
  max-width: 40rem;
  line-height: 1.6;
}

.run-steps code {
  font-family: var(--mono);
  font-size: 0.82rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.35rem;
  border-radius: 2px;
}

@media (max-width: 720px) {
  .repo-panel__grid,
  .dir-row {
    grid-template-columns: 1fr;
  }
}
</style>
