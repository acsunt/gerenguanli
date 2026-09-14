import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { DailyCollectionEntity } from '../entities/DailyCollectionEntity'

export class DailyCollectionRepository extends SqliteRepository<DailyCollectionEntity> {
  protected tableName = 'daily_collections'
}

export const dailyCollectionRepository = new DailyCollectionRepository()
