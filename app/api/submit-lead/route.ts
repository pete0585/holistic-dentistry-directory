import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: Record<string, string>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, phone, notes, preferred_dentist_id, state } = body

  const supabase = await createServiceClient()

  await supabase.from('holistic_dentist_leads').insert({
    patient_name: name || null,
    patient_email: email || null,
    patient_phone: phone || null,
    concern_notes: notes || null,
    preferred_dentist_id: preferred_dentist_id || null,
    state: state || null,
    status: 'new',
  })

  return NextResponse.json({ success: true })
}
