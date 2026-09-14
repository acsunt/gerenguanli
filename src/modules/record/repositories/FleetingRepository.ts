import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { FleetingEntity } from '../entities/FleetingEntity'

export class FleetingRepository extends SqliteRepository<FleetingEntity> {
  protected tableName = 'fleetings'
}

export const fleetingRepository = new FleetingRepository()
