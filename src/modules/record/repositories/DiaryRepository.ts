import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { DiaryEntity } from '../entities/DiaryEntity'

export class DiaryRepository extends SqliteRepository<DiaryEntity> {
  protected tableName = 'diaries'
}

export const diaryRepository = new DiaryRepository()
