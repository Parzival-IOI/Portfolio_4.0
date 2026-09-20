import type { ApiPage, BlogListItem } from '../../../app/types/blog'

function clampInt(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(String(value), 10)
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, min), max) : fallback
}

/** Published posts, newest first. Only `page` and `size` come from the client -
 * sort order is fixed here so the browser can't steer what gets asked of Nest. */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = clampInt(query.page, 1, 1, 10_000)
  const size = clampInt(query.size, 9, 1, 50)

  return nestGet<ApiPage<BlogListItem>>(event, '/blog/findAll', {
    orderBy: 'DESC',
    sortBy: 'CREATED_AT',
    page: page - 1, // Nest's page param is 0-based
    size
  })
})
