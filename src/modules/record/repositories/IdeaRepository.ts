import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { IdeaEntity } from '../entities/IdeaEntity'

export class IdeaRepository extends SqliteRepository<IdeaEntity> {
  protected tableName = 'ideas'
}

export const ideaRepository = new IdeaRepository()
