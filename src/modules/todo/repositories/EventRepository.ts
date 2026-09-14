import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { EventEntity } from '../entities/EventEntity'

export class EventRepository extends SqliteRepository<EventEntity> {
  protected tableName = 'events'
}

export const eventRepository = new EventRepository()
