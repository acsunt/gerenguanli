import { defineStore } from 'pinia'
import type { DiaryEntity } from '../entities/DiaryEntity'
import { diaryRepository } from '../repositories/DiaryRepository'

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    items: [] as DiaryEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await diaryRepository.findAll(spaceId)
    },
    async create(item: DiaryEntity) {
      await diaryRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<DiaryEntity>) {
      await diaryRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await diaryRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
