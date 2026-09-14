import { defineStore } from 'pinia'
import type { AssetEntity } from '../entities/AssetEntity'
import { assetRepository } from '../repositories/AssetRepository'

export const useAssetStore = defineStore('asset', {
  state: () => ({
    items: [] as AssetEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await assetRepository.findAll(spaceId)
    },
    async create(item: AssetEntity) {
      await assetRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<AssetEntity>) {
      await assetRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await assetRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
