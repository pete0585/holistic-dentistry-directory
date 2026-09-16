import {articles as editorialArticles} from '@/lib/editorial-blog'
import type { MetadataRoute } from 'next'
import { getCityPageSlugs } from '@/lib/city-pages'
import { getAllSlugs, getStateCounts } from '@/lib/data'
import { getSiteUrl } from '@/lib/site'
import { SPECIALTY_SLUGS } from '@/lib/utils'

export const revalidate = 86400

async function originalSitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
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

  const cityPages: MetadataRoute.Sitemap = getCityPageSlugs().map((slug) => ({
    url: `${base}/best/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...statePages, ...listingPages, ...cityPages]
}

export default async function editorialSitemap():Promise<MetadataRoute.Sitemap>{const existing=await originalSitemap();const site="https://holisticdentalfinder.com";return [...existing,{url:site+'/blog',changeFrequency:'weekly'},...editorialArticles().map(p=>({url:site+'/blog/'+p.slug,lastModified:new Date(p.date),changeFrequency:'monthly' as const}))]}
