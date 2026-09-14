import { defineStore } from 'pinia'
import type { FleetingEntity } from '../entities/FleetingEntity'
import { fleetingRepository } from '../repositories/FleetingRepository'

export const useFleetingStore = defineStore('fleeting', {
  state: () => ({
    items: [] as FleetingEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await fleetingRepository.findAll(spaceId)
    },
    async create(item: FleetingEntity) {
      await fleetingRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<FleetingEntity>) {
      await fleetingRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await fleetingRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
