import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { DirectionEntity } from '../entities/DirectionEntity'

export class DirectionRepository extends SqliteRepository<DirectionEntity> {
  protected tableName = 'directions'
}

export const directionRepository = new DirectionRepository()
