import { defineStore } from 'pinia'
import type { DailyCollectionEntity } from '../entities/DailyCollectionEntity'
import { dailyCollectionRepository } from '../repositories/DailyCollectionRepository'

export const useDailyCollectionStore = defineStore('dailyCollection', {
  state: () => ({
    items: [] as DailyCollectionEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await dailyCollectionRepository.findAll(spaceId)
    },
    async create(item: DailyCollectionEntity) {
      await dailyCollectionRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<DailyCollectionEntity>) {
      await dailyCollectionRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await dailyCollectionRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
