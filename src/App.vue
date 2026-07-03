<script setup lang="ts">
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteLoader from '@/components/SiteLoader.vue'
import ScrollRail from '@/components/ScrollRail.vue'
</script>

<template>
  <SiteLoader />
  <ScrollRail />
  <div class="app-shell">
    <SiteHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
