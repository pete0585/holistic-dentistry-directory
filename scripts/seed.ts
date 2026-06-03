/**
 * Seed script for HolisticDentalFinder
 *
 * Priority sources:
 * 1. HDA (holisticdental.org/find-a-holistic-dentist) — 373 US members, fully public
 * 2. IABDM (iabdm.org/location) — state-by-state browse, ~300-500 US members
 * 3. IAOMT (iaomt.org/for-patients/search) — names + cities by zip
 * 4. DataForSEO "holistic dentist" + "biological dentist" in top 100 US cities
 *
 * Run: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

interface RawListing {
  full_name: string
  practice_name?: string
  city: string
  state: string
  zip?: string
  address_line1?: string
  phone?: string
  email?: string
  website?: string
  credentials?: string[]
  specialties?: string[]
  no_amalgam?: boolean
  no_fluoride?: boolean
  accepts_insurance?: boolean
  source: 'hda' | 'iabdm' | 'iaomt' | 'dataforseo' | 'npi' | 'self_submit'
}

// Sample seed data — replace with real scraped data from HDA, IABDM, IAOMT
const SAMPLE_LISTINGS: RawListing[] = [
  {
    full_name: 'Dr. Susan Green',
    practice_name: 'Whole Health Dental',
    city: 'Denver',
    state: 'CO',
    zip: '80203',
    phone: '(303) 555-0101',
    website: 'https://wholehealthdental.com',
    credentials: ['iaomt_fellow', 'smart_certified'],
    specialties: ['mercury_removal', 'smart_protocol', 'ozone_therapy'],
    no_amalgam: true,
    no_fluoride: true,
    source: 'iaomt',
  },
  {
    full_name: 'Dr. Michael Chen',
    practice_name: 'Biological Dental Center',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    phone: '(512) 555-0202',
    credentials: ['iabdm_certified'],
    specialties: ['ceramic_implants', 'biocompatibility_testing'],
    no_amalgam: true,
    source: 'iabdm',
  },
  {
    full_name: 'Dr. Patricia White',
    practice_name: 'Natural Smiles',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    phone: '(503) 555-0303',
    credentials: ['hda_member', 'smart_certified'],
    specialties: ['fluoride_free', 'holistic_pediatric', 'mercury_removal'],
    no_amalgam: true,
    no_fluoride: true,
    accepts_insurance: false,
    source: 'hda',
  },
]

async function seed() {
  console.log(`Seeding ${SAMPLE_LISTINGS.length} listings...`)
  let inserted = 0
  let skipped = 0

  for (const raw of SAMPLE_LISTINGS) {
    const baseSlug = slugify(`${raw.full_name}-${raw.city}-${raw.state}`)
    const { data: existing } = await supabase
      .from('holistic_dentist_listings')
      .select('slug')
      .ilike('slug', `${baseSlug}%`)

    const suffix = existing && existing.length > 0 ? `-${existing.length}` : ''
    const slug = `${baseSlug}${suffix}`

    const { error } = await supabase.from('holistic_dentist_listings').insert({
      slug,
      full_name: raw.full_name,
      practice_name: raw.practice_name ?? null,
      city: raw.city,
      state: raw.state,
      zip: raw.zip ?? null,
      address_line1: raw.address_line1 ?? null,
      phone: raw.phone ?? null,
      email: raw.email ?? null,
      website: raw.website ?? null,
      credentials: raw.credentials ?? [],
      specialties: raw.specialties ?? [],
      no_amalgam: raw.no_amalgam ?? false,
      no_fluoride: raw.no_fluoride ?? false,
      accepts_insurance: raw.accepts_insurance ?? null,
      offering_ozone: raw.specialties?.includes('ozone_therapy') ?? false,
      smart_certified: raw.credentials?.includes('smart_certified') ?? false,
      ceramic_implants: raw.specialties?.includes('ceramic_implants') ?? false,
      biocompat_testing: raw.specialties?.includes('biocompatibility_testing') ?? false,
      holistic_pediatric: raw.specialties?.includes('holistic_pediatric') ?? false,
      listing_tier: 'free',
      is_active: true,
      is_approved: true,
      source: raw.source,
      outreach_step: 0,
    })

    if (error) {
      console.error(`Failed to insert ${raw.full_name}:`, error.message)
      skipped++
    } else {
      inserted++
    }
  }

  console.log(`Done. Inserted: ${inserted}, Skipped: ${skipped}`)
}

seed().catch(console.error)
