import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { QuoteEntity } from '../entities/QuoteEntity'

export class QuoteRepository extends SqliteRepository<QuoteEntity> {
  protected tableName = 'quotes'
}

export const quoteRepository = new QuoteRepository()
