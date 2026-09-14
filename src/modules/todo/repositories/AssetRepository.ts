import { SqliteRepository } from '../../../database/repositories/SqliteRepository'
import type { AssetEntity } from '../entities/AssetEntity'

export class AssetRepository extends SqliteRepository<AssetEntity> {
  protected tableName = 'assets'
}

export const assetRepository = new AssetRepository()
