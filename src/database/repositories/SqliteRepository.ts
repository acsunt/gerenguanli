import { databaseManager } from '../sqlite/DatabaseManager'

export interface RepositoryEntity {
  id: string
  spaceId?: string
}

export abstract class SqliteRepository<T extends RepositoryEntity> {
  protected abstract tableName: string

  protected toColumn(key: string): string {
    return key
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
  }

  protected toRow(entity: Record<string, any>): Record<string, any> {
    const row: Record<string, any> = {}
    Object.entries(entity).forEach(([key, value]) => {
      row[this.toColumn(key)] = typeof value === 'boolean' ? Number(value) : value
    })
    return row
  }

  protected fromRow(row: Record<string, any>): T {
    const entity: Record<string, any> = {}

    Object.entries(row).forEach(([key, value]) => {
      const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
      entity[camel] = value
    })

    return entity as T
  }

  async findAll(spaceId?: string): Promise<T[]> {
    const sql = spaceId
      ? `SELECT * FROM ${this.tableName} WHERE space_id = ?`
      : `SELECT * FROM ${this.tableName}`

    const result = await databaseManager.query(sql, spaceId ? [spaceId] : [])
    return (result?.values ?? []).map(row => this.fromRow(row as Record<string, any>))
  }

  async findById(id: string): Promise<T | null> {
    const result = await databaseManager.query(
      `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`,
      [id]
    )

    const row = (result?.values ?? [])[0]
    return row ? this.fromRow(row as Record<string, any>) : null
  }

  async create(entity: T): Promise<void> {
    const row = this.toRow(entity as Record<string, any>)
    const keys = Object.keys(row)
    const values = Object.values(row)

    await databaseManager.run(
      `INSERT INTO ${this.tableName}(${keys.join(',')}) VALUES(${keys.map(() => '?').join(',')})`,
      values
    )
  }

  async update(id: string, patch: Partial<T>): Promise<void> {
    const row = this.toRow(patch as Record<string, any>)
    const keys = Object.keys(row)

    await databaseManager.run(
      `UPDATE ${this.tableName} SET ${keys.map(k => `${k}=?`).join(',')} WHERE id=?`,
      [...Object.values(row), id]
    )
  }

  async delete(id: string): Promise<void> {
    await databaseManager.run(
      `DELETE FROM ${this.tableName} WHERE id=?`,
      [id]
    )
  }
}
