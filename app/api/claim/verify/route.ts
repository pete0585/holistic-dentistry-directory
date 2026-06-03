import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: { token: string; listing_id: string }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { token, listing_id } = body

  if (!token || !listing_id) {
    return NextResponse.json({ error: 'Missing token or listing_id' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: claim, error: claimError } = await supabase
    .from('holistic_dentist_claims')
    .select('*')
    .eq('token', token)
    .eq('listing_id', listing_id)
    .eq('verified', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (claimError || !claim) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  const now = new Date().toISOString()

  await supabase
    .from('holistic_dentist_claims')
    .update({ verified: true, verified_at: now })
    .eq('id', claim.id)

  await supabase
    .from('holistic_dentist_listings')
    .update({ claimed_at: now, claimed_by: claim.email, updated_at: now })
    .eq('id', listing_id)

  return NextResponse.json({ success: true })
}
