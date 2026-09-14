import { Capacitor } from '@capacitor/core'
import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite'

export interface DatabaseStatus {
  initialized: boolean
  driver: string
}

export class DatabaseManager {
  private sqlite = new SQLiteConnection(CapacitorSQLite)
  private db: SQLiteDBConnection | null = null
  private schemaVersion = 2
  private readonly dbName = 'personal_manager'

  private status: DatabaseStatus = {
    initialized: false,
    driver: '@capacitor-community/sqlite'
  }

  async initialize(): Promise<void> {
    if (this.status.initialized) return

    const platform = Capacitor.getPlatform()

    if (platform === 'web') {
      try {
        await this.sqlite.initWebStore()
      } catch {
        // Web 环境下重复初始化时忽略
      }
    }

    const consistency = await this.sqlite.checkConnectionsConsistency()

    const hasConnection = consistency.result
      ? await this.sqlite.isConnection(this.dbName, false)
      : { result: false }

    if (hasConnection.result) {
      this.db = await this.sqlite.retrieveConnection(this.dbName, false)
    } else {
      this.db = await this.sqlite.createConnection(
        this.dbName,
        false,
        'no-encryption',
        this.schemaVersion,
        false
      )
    }

    await this.db.open()
    await this.runMigrations()

    this.status.initialized = true
  }

  private async runMigrations() {
    await this.execute('CREATE TABLE IF NOT EXISTS schema_version(version INTEGER PRIMARY KEY);')
    const result = await this.query('SELECT version FROM schema_version ORDER BY version DESC LIMIT 1')
    const currentVersion = result?.values?.[0]?.version ?? 0

    if (currentVersion < 1) {
      const migrations = [
        'CREATE TABLE IF NOT EXISTS spaces(id TEXT PRIMARY KEY,name TEXT NOT NULL,description TEXT,is_default INTEGER DEFAULT 0,created_at TEXT NOT NULL,updated_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS fleetings(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,content TEXT NOT NULL,created_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS ideas(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,content TEXT NOT NULL,created_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS diaries(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,title TEXT NOT NULL,content TEXT NOT NULL,created_at TEXT NOT NULL,updated_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS directions(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,title TEXT NOT NULL,category TEXT NOT NULL,created_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS todos(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,title TEXT NOT NULL,completed INTEGER NOT NULL,due_date TEXT,created_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS assets(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,name TEXT NOT NULL,expire_date TEXT,created_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS events(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,title TEXT NOT NULL,event_date TEXT NOT NULL,created_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS quotes(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,content TEXT NOT NULL,source TEXT,created_at TEXT NOT NULL);',
        'CREATE TABLE IF NOT EXISTS daily_collections(id TEXT PRIMARY KEY,space_id TEXT NOT NULL,title TEXT NOT NULL,content TEXT NOT NULL,created_at TEXT NOT NULL);'
      ]

      for (const sql of migrations) {
        await this.execute(sql)
      }

      await this.run('INSERT INTO schema_version(version) VALUES(1)')
    }

    if (currentVersion < 2) {
      await this.execute('CREATE INDEX IF NOT EXISTS idx_diaries_space_id ON diaries(space_id);')
      await this.execute('CREATE INDEX IF NOT EXISTS idx_todos_space_id ON todos(space_id);')
      await this.execute('CREATE INDEX IF NOT EXISTS idx_assets_space_id ON assets(space_id);')
      await this.run('INSERT INTO schema_version(version) VALUES(2)')
    }
  }

  async execute(sql: string): Promise<void> {
    await this.db?.execute(sql)
  }

  async run(sql: string, values: any[] = []): Promise<void> {
    await this.db?.run(sql, values)
  }

  async transaction(actions: (() => Promise<void>)[]): Promise<void> {
    if (!this.db) return

    try {
      await this.db.execute('BEGIN TRANSACTION')

      for (const action of actions) {
        await action()
      }

      await this.db.execute('COMMIT')
    } catch (error) {
      await this.db.execute('ROLLBACK')
      throw error
    }
  }

  async query(sql: string, values: any[] = []) {
    return this.db?.query(sql, values)
  }

  async close(): Promise<void> {
    if (!this.db) return

    await this.db.close()
    await this.sqlite.closeConnection(this.dbName, false)

    this.db = null
    this.status.initialized = false
  }
}

export const databaseManager = new DatabaseManager()
