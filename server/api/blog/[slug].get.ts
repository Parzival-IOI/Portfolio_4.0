import type { BlogPostDetail } from '../../../app/types/blog'

/**
 * The editor bakes each inline image's absolute API URL into the saved HTML
 * (e.g. http://localhost:4000/v1/api/assets/abc.png). Rewrite those to our own
 * same-origin /api/assets/ route so the browser never sees the API address and
 * old posts keep working if the API moves.
 */
const BAKED_ASSET_URL = /(\bsrc=["'])https?:\/\/[^"'\s]*?\/assets\/([^"'\s/?#]+)/gi

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''

  // Slugs are lowercase words joined by hyphens (dashboard slugify) - anything
  // else can't exist, so don't bother the backend with it.
  if (!/^[\w-]{1,120}$/.test(slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  const post = await nestGet<BlogPostDetail>(event, `/blog/findBySlug/${slug}`)
  return { ...post, description: post.description.replace(BAKED_ASSET_URL, '$1/api/assets/$2') }
})
