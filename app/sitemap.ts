import type { MetadataRoute } from 'next'
import { getAllSlugs, getStateCounts } from '@/lib/data'
import { SPECIALTY_SLUGS } from '@/lib/utils'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://holisticdentalfinder.com'
  const [slugs, stateCounts] = await Promise.all([getAllSlugs(), getStateCounts()])

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const categoryPages: MetadataRoute.Sitemap = Object.keys(SPECIALTY_SLUGS).map((slug) => ({
    url: `${base}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const statePages: MetadataRoute.Sitemap = Object.keys(stateCounts).map((abbr) => ({
    url: `${base}/listings?state=${abbr}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const listingPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...statePages, ...listingPages]
}
