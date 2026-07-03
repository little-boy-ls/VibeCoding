import { portfolioWorks, siteMeta } from '@/data/portfolio'
import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', () => ({
  works: portfolioWorks,
  siteMeta,
}))
