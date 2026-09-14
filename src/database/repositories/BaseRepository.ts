export abstract class BaseRepository<T> {
  abstract findAll(): Promise<T[]>
  abstract findById(id: string): Promise<T | null>
  abstract create(data: T): Promise<void>
  abstract update(id: string, data: Partial<T>): Promise<void>
  abstract delete(id: string): Promise<void>
}
