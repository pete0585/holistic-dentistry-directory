import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { full_name, practice_name, city, state, phone, email, website } = body as Record<string, string>

  if (!full_name || !city || !state) {
    return NextResponse.json({ error: 'full_name, city, and state are required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const baseSlug = slugify(`${full_name}-${city}-${state}`)
  const { data: existing } = await supabase
    .from('holistic_dentist_listings')
    .select('slug')
    .ilike('slug', `${baseSlug}%`)

  const suffix = existing && existing.length > 0 ? `-${existing.length}` : ''
  const slug = `${baseSlug}${suffix}`

  const { data, error } = await supabase
    .from('holistic_dentist_listings')
    .insert({
      slug,
      full_name,
      practice_name: practice_name || null,
      city,
      state: state.toUpperCase(),
      phone: phone || null,
      email: email || null,
      website: website || null,
      listing_tier: 'free',
      is_active: true,
      is_approved: false,
      source: 'self_submit',
    })
    .select('id, slug')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id, slug: data.slug })
}
