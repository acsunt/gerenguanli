import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { TodoEntity } from '../entities/TodoEntity'

export class TodoRepository extends SqliteRepository<TodoEntity> {
  protected tableName = 'todos'
}

export const todoRepository = new TodoRepository()
