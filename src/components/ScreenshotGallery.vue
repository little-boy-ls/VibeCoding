<script setup lang="ts">
import { useProjectStore } from '@/stores/project'
import { storeToRefs } from 'pinia'

const store = useProjectStore()
const { filteredShots, activeShot, filterClient } = storeToRefs(store)

const filters = [
  { key: 'all' as const, label: '全部' },
  { key: 'uniapp' as const, label: 'UniApp' },
]
</script>

<template>
  <div class="gallery">
    <div class="gallery__filters">
      <button
        v-for="f in filters"
        :key="f.key"
        class="gallery__filter"
        :class="{ 'gallery__filter--on': filterClient === f.key }"
        type="button"
        @click="store.setFilter(f.key)"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="gallery__layout">
      <div class="gallery__thumbs">
        <button
          v-for="shot in filteredShots"
          :key="shot.id"
          type="button"
          class="gallery__thumb"
          :class="{ 'gallery__thumb--on': activeShot.id === shot.id }"
          @click="store.setShot(shot.id)"
        >
          <div class="gallery__phone">
            <img :src="shot.image" :alt="shot.title" loading="lazy" />
          </div>
          <span>{{ shot.title }}</span>
        </button>
      </div>

      <article class="gallery__detail">
        <div class="gallery__preview">
          <div class="gallery__phone gallery__phone--lg">
            <img :src="activeShot.image" :alt="activeShot.title" />
          </div>
        </div>
        <div class="gallery__info">
          <p class="eyebrow">{{ activeShot.client }}</p>
          <h3>{{ activeShot.title }}</h3>
          <p class="gallery__caption">{{ activeShot.caption }}</p>
          <ul class="gallery__features">
            <li v-for="f in activeShot.features" :key="f">{{ f }}</li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.gallery__filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.gallery__filter {
  font-family: var(--mono);
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 2px;
  color: var(--ink-soft);
}

.gallery__filter--on {
  background: var(--ink);
  color: var(--paper-bright);
  border-color: var(--ink);
}

.gallery__layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  align-items: start;
}

.gallery__thumbs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gallery__thumb {
  text-align: left;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: border-color 0.15s, background 0.15s;
}

.gallery__thumb:hover,
.gallery__thumb--on {
  border-color: var(--line);
  background: var(--paper-bright);
}

.gallery__thumb span {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.gallery__phone {
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--ink);
  background: var(--accent-light);
  box-shadow: 4px 4px 0 var(--ink);
}

.gallery__phone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.gallery__detail {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
}

.gallery__phone--lg {
  max-width: 220px;
}

.gallery__info h3 {
  font-size: 1.5rem;
  margin: 0.35rem 0 0.75rem;
}

.gallery__caption {
  color: var(--ink-soft);
  margin-bottom: 1rem;
}

.gallery__features {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.gallery__features li {
  font-family: var(--mono);
  font-size: 0.72rem;
  padding: 0.3rem 0.55rem;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 2px;
}

@media (max-width: 800px) {
  .gallery__layout,
  .gallery__detail {
    grid-template-columns: 1fr;
  }

  .gallery__thumbs {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .gallery__thumb {
    min-width: 100px;
  }
}
</style>
