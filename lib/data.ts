import { createClient, createStaticClient } from '@/lib/supabase/server'
import type { Listing, SearchFilters } from '@/lib/types'

const PAGE_SIZE = 24

export async function getListings(filters: SearchFilters = {}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createClient()
  const { q, state, specialty, credential, tier, no_amalgam, smart_certified, holistic_pediatric, page = 1 } = filters
  const offset = (page - 1) * PAGE_SIZE

  let query = supabase
    .from('holistic_dentist_listings')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier', { ascending: false })
    .order('full_name', { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1)

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,practice_name.ilike.%${q}%,city.ilike.%${q}%`)
  }
  if (state) {
    query = query.eq('state', state.toUpperCase())
  }
  if (specialty) {
    query = query.contains('specialties', [specialty])
  }
  if (credential) {
    query = query.contains('credentials', [credential])
  }
  if (tier) {
    query = query.eq('listing_tier', tier)
  }
  if (no_amalgam) {
    query = query.eq('no_amalgam', true)
  }
  if (smart_certified) {
    query = query.eq('smart_certified', true)
  }
  if (holistic_pediatric) {
    query = query.eq('holistic_pediatric', true)
  }

  const { data, count, error } = await query
  if (error) throw error

  return { listings: (data as Listing[]) ?? [], total: count ?? 0 }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('holistic_dentist_listings')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data as Listing
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('holistic_dentist_listings')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data as Listing
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('holistic_dentist_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .in('listing_tier', ['featured', 'verified'])
    .order('listing_tier', { ascending: false })
    .limit(limit)

  return (data as Listing[]) ?? []
}

export async function getListingsByState(state: string, limit = 24): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('holistic_dentist_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .eq('state', state.toUpperCase())
    .order('listing_tier', { ascending: false })
    .order('full_name', { ascending: true })
    .limit(limit)

  return (data as Listing[]) ?? []
}

export async function getStateCounts(): Promise<Record<string, number>> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('holistic_dentist_listings')
    .select('state')
    .eq('is_active', true)
    .eq('is_approved', true)

  if (!data) return {}

  return data.reduce((acc: Record<string, number>, row: { state: string }) => {
    acc[row.state] = (acc[row.state] ?? 0) + 1
    return acc
  }, {})
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('holistic_dentist_listings')
    .select('slug')
    .eq('is_active', true)
    .eq('is_approved', true)

  return (data ?? []).map((d: { slug: string }) => d.slug)
}

export async function getTotalListingCount(): Promise<number> {
  const supabase = createStaticClient()
  const { count } = await supabase
    .from('holistic_dentist_listings')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)
  return count ?? 0
}

export async function getAdminListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('holistic_dentist_listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  return (data as Listing[]) ?? []
}
export async function getListingsByCity(city: string, state: string, limit = 24): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('holistic_dentist_listings')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .ilike('city', city)
    .eq('state', state.toUpperCase())
    .order('listing_tier', { ascending: false })
    .order('full_name', { ascending: true })
    .limit(limit)

  return (data as Listing[]) ?? []
}
