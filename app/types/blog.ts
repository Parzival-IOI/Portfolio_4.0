/** Every NestBackend response is wrapped in this envelope (ResponseSuccess<T>). */
export interface ApiEnvelope<T> {
  statusCode: number
  message: string
  data: T
}

/** Paginated payload produced by QueryTable.wrap on the backend. */
export interface ApiPage<T> {
  items: T[]
  page: number
  total: number
}

/** Row shape returned by GET /blog/findAll (list projection). */
export interface BlogListItem {
  id: number
  uuid: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  published: boolean
  datetime: string
}

/** Row shape returned by GET /blog/findBySlug/:slug (public detail projection). */
export interface BlogPostDetail {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  description: string
  createdAt: string
  updatedAt: string
}

export type OrderBy = 'ASC' | 'DESC'
export type SortBy = 'ID' | 'TITLE' | 'CREATED_AT' | 'UPDATED_AT'
