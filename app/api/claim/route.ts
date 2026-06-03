import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  let body: { listing_id: string; email: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listing_id, email } = body

  if (!listing_id || !email) {
    return NextResponse.json({ error: 'Missing listing_id or email' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: listing, error: listingError } = await supabase
    .from('holistic_dentist_listings')
    .select('id, full_name, practice_name, city, state')
    .eq('id', listing_id)
    .single()

  if (listingError || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

  const { error: claimError } = await supabase.from('holistic_dentist_claims').insert({
    listing_id,
    email,
    token,
    expires_at: expiresAt,
    status: 'pending',
  })

  if (claimError) {
    return NextResponse.json({ error: 'Failed to create claim' }, { status: 500 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://holisticdentalfinder.com'
  const verifyUrl = `${siteUrl}/claim/${listing_id}?token=${token}`

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'hello@mail.holisticdentalfinder.com',
    to: email,
    subject: `Verify your claim for ${listing.full_name} — HolisticDentalFinder`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FAF7F0;">
        <div style="background: #1A3D2B; padding: 24px; border-radius: 8px; text-align: center; margin-bottom: 32px;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 22px;">HolisticDentalFinder.com</h1>
        </div>
        <h2 style="color: #1A3D2B; font-size: 20px;">Verify your listing claim</h2>
        <p style="color: #444; line-height: 1.6;">
          You requested to claim the listing for <strong>${listing.full_name}</strong> in ${listing.city}, ${listing.state}.
        </p>
        <p style="color: #444; line-height: 1.6;">
          Click the button below to verify your email and activate your profile. This link expires in 72 hours.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${verifyUrl}" style="background: #1A3D2B; color: #C9A84C; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Verify & Claim My Listing</a>
        </div>
        <p style="color: #888; font-size: 14px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
