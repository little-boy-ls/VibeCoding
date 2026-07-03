import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { features, moduleShots, projectMeta, repos, techStack } from '@/data/codeverse'

export const useProjectStore = defineStore('project', () => {
  const activeRepoId = ref(repos[0].id)
  const activeShotId = ref(moduleShots[0].id)
  const filterClient = ref<'all' | 'uniapp' | 'user' | 'admin' | 'boot'>('all')

  const activeRepo = computed(() => repos.find(r => r.id === activeRepoId.value) ?? repos[0])
  const activeShot = computed(() => moduleShots.find(s => s.id === activeShotId.value) ?? moduleShots[0])

  const filteredShots = computed(() => {
    if (filterClient.value === 'all') return moduleShots
    return moduleShots.filter(s => s.client === filterClient.value)
  })

  function setRepo(id: string) {
    activeRepoId.value = id
  }

  function setShot(id: string) {
    activeShotId.value = id
  }

  function setFilter(client: typeof filterClient.value) {
    filterClient.value = client
  }

  return {
    meta: projectMeta,
    repos,
    features,
    moduleShots,
    techStack,
    activeRepoId,
    activeShotId,
    filterClient,
    activeRepo,
    activeShot,
    filteredShots,
    setRepo,
    setShot,
    setFilter,
  }
})
