export interface TodoEntity {
  id: string
  spaceId: string
  title: string
  completed: boolean
  dueDate?: string
  createdAt: string
}