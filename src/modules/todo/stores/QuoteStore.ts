import { defineStore } from 'pinia'
import type { QuoteEntity } from '../entities/QuoteEntity'
import { quoteRepository } from '../repositories/QuoteRepository'

export const useQuoteStore = defineStore('quote', {
  state: () => ({
    items: [] as QuoteEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await quoteRepository.findAll(spaceId)
    },
    async create(item: QuoteEntity) {
      await quoteRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<QuoteEntity>) {
      await quoteRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await quoteRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
