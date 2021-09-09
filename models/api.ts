export interface ResponseRoot<T> {
  contents: Array<T>
  totalCount: number
  offset: number
  limit: number
}

export interface ResContent {
  id: string
  createdAt: Date
  publishedAt: Date
  updatedAt: Date
  revisedAt: Date
}
