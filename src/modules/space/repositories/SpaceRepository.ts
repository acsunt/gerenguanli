import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import { databaseManager } from '../../../database/sqlite/DatabaseManager'
import type { SpaceEntity } from '../entities/SpaceEntity'

export class SpaceRepository extends SqliteRepository<SpaceEntity> {
  protected tableName = 'spaces'

  async delete(id: string): Promise<void> {
    const tables = [
      'fleetings',
      'ideas',
      'diaries',
      'directions',
      'todos',
      'assets',
      'events',
      'quotes',
      'daily_collections'
    ]

    for (const table of tables) {
      await databaseManager.run(
        `DELETE FROM ${table} WHERE space_id=?`,
        [id]
      )
    }

    await super.delete(id)
  }
}

export const spaceRepository = new SpaceRepository()
