import { defineStore } from 'pinia'
import type { TodoEntity } from '../entities/TodoEntity'
import { todoRepository } from '../repositories/TodoRepository'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    items: [] as TodoEntity[],
  }),
  actions: {
    async load(spaceId?: string) {
      this.items = await todoRepository.findAll(spaceId)
    },
    async create(item: TodoEntity) {
      await todoRepository.create(item)
      await this.load(item.spaceId)
    },
    async update(id: string, patch: Partial<TodoEntity>) {
      await todoRepository.update(id, patch)
    },
    async remove(id: string, spaceId?: string) {
      await todoRepository.delete(id)
      await this.load(spaceId)
    }
  }
})
