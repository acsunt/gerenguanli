import { defineStore } from 'pinia'
import type { IdeaEntity } from '../entities/IdeaEntity'
import { ideaRepository } from '../repositories/IdeaRepository'

export const useIdeaStore = defineStore('idea', {
  state: () => ({
    items: [] as IdeaEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await ideaRepository.findAll(spaceId)
    },
    async create(item: IdeaEntity) {
      await ideaRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<IdeaEntity>) {
      await ideaRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await ideaRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
