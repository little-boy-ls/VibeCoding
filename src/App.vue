<script setup lang="ts">
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteLoader from '@/components/SiteLoader.vue'
import ScrollRail from '@/components/ScrollRail.vue'
import SiteGrain from '@/components/SiteGrain.vue'
import SiteCursor from '@/components/SiteCursor.vue'
</script>

<template>
  <SiteLoader />
  <SiteGrain />
  <SiteCursor />
  <ScrollRail />
  <div class="app-shell">
    <SiteHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
