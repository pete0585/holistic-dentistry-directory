import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { absoluteUrl } from '@/lib/site'

const BEST_DIR = join(process.cwd(), 'app', 'best')

export function getCityPageSlugs(): string[] {
  if (!existsSync(BEST_DIR)) return []

  return readdirSync(BEST_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(BEST_DIR, name, 'page.tsx')))
    .sort()
}

export function cityPageCanonical(slug: string): string {
  return absoluteUrl(`/best/${slug}`)
}
