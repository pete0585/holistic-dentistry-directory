import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: { listing_id: string; approved: boolean }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { listing_id, approved } = body

  if (!listing_id) {
    return NextResponse.json({ error: 'Missing listing_id' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  await supabase
    .from('holistic_dentist_listings')
    .update({ is_approved: approved, updated_at: new Date().toISOString() })
    .eq('id', listing_id)

  return NextResponse.json({ success: true })
}
