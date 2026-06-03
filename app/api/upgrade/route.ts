import { NextRequest, NextResponse } from 'next/server'
import { stripe, VERIFIED_PRICE_ID, FEATURED_PRICE_ID } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: { listing_id: string; tier: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listing_id, tier } = body

  if (!listing_id || !tier) {
    return NextResponse.json({ error: 'Missing listing_id or tier' }, { status: 400 })
  }

  if (tier !== 'verified' && tier !== 'featured') {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  const supabase = await createServiceClient()
  const { data: listing, error } = await supabase
    .from('holistic_dentist_listings')
    .select('id, full_name, email')
    .eq('id', listing_id)
    .single()

  if (error || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const priceId = tier === 'featured' ? FEATURED_PRICE_ID : VERIFIED_PRICE_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://holisticdentalfinder.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: listing.email ?? undefined,
    allow_promotion_codes: true,
    metadata: {
      listing_id,
      tier,
      dentist_name: listing.full_name,
    },
    subscription_data: {
      metadata: { listing_id, tier },
    },
    success_url: `${siteUrl}/claim/${listing_id}?verified=true`,
    cancel_url: `${siteUrl}/claim/${listing_id}`,
  })

  return NextResponse.json({ url: session.url })
}
