import { defineStore } from 'pinia'
import type { DirectionEntity } from '../entities/DirectionEntity'
import { directionRepository } from '../repositories/DirectionRepository'

export const useDirectionStore = defineStore('direction', {
  state: () => ({
    items: [] as DirectionEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await directionRepository.findAll(spaceId)
    },
    async create(item: DirectionEntity) {
      await directionRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<DirectionEntity>) {
      await directionRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await directionRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
