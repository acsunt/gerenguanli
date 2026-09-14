import { defineStore } from 'pinia'
import type { SpaceEntity } from '../entities/SpaceEntity'
import { spaceRepository } from '../repositories/SpaceRepository'

const STORAGE_KEY = 'current-space-id'

export const useSpaceStore = defineStore('space', {
  state: () => ({
    currentSpaceId: localStorage.getItem(STORAGE_KEY) ?? '',
    spaces: [] as SpaceEntity[]
  }),
  actions: {
    async load() {
      this.spaces = await spaceRepository.findAll()

      if (!this.currentSpaceId && this.spaces.length > 0) {
        this.switchSpace(this.spaces[0].id)
      }
    },
    async create(space: SpaceEntity) {
      await spaceRepository.create(space)
      await this.load()
    },
    async update(id: string, patch: Partial<SpaceEntity>) {
      await spaceRepository.update(id, patch)
      await this.load()
    },
    async remove(id: string) {
      const removingCurrent = this.currentSpaceId === id

      await spaceRepository.delete(id)
      await this.load()

      if (!removingCurrent) {
        return
      }

      const nextSpace = this.spaces[0]

      if (nextSpace) {
        this.switchSpace(nextSpace.id)
      } else {
        this.currentSpaceId = ''
        localStorage.removeItem(STORAGE_KEY)
      }
    },
    switchSpace(id: string) {
      this.currentSpaceId = id
      localStorage.setItem(STORAGE_KEY, id)
    }
  }
})