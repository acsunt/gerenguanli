import { defineStore } from 'pinia'
import type { EventEntity } from '../entities/EventEntity'
import { eventRepository } from '../repositories/EventRepository'

export const useEventStore = defineStore('event', {
  state: () => ({
    items: [] as EventEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await eventRepository.findAll(spaceId)
    },
    async create(item: EventEntity) {
      await eventRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<EventEntity>) {
      await eventRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await eventRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
