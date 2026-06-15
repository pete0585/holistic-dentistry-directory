export interface Listing {
  id: string
  slug: string
  full_name: string
  practice_name: string | null
  bio: string | null
  photo_url: string | null
  phone: string | null
  email: string | null
  website: string | null
  address_line1: string | null
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  credentials: string[]
  specialties: string[]
  no_amalgam: boolean
  no_fluoride: boolean
  accepts_insurance: boolean | null
  offering_ozone: boolean
  smart_certified: boolean
  ceramic_implants: boolean
  biocompat_testing: boolean
  holistic_pediatric: boolean
  accepting_new_patients: boolean
  listing_tier: 'unclaimed' | 'free' | 'verified' | 'featured'
  is_active: boolean
  is_approved: boolean
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_expires_at: string | null
  claimed_at: string | null
  claimed_by: string | null
  source: string | null
  do_not_email: boolean
  email_source: string | null
  outreach_step: number
  outreach_sent_at: string | null
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at: string | null
  expires_at: string
  status: string
  nudge_sent_at: string | null
  created_at: string
}

export interface Payment {
  id: string
  listing_id: string
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  amount: number | null
  tier: string | null
  status: string | null
  created_at: string
}

export interface Lead {
  id: string
  patient_name: string | null
  patient_email: string | null
  patient_phone: string | null
  concern_notes: string | null
  state: string | null
  specialty_sought: string | null
  preferred_dentist_id: string | null
  status: string
  created_at: string
}

export interface SearchFilters {
  q?: string
  state?: string
  specialty?: string
  credential?: string
  tier?: string
  no_amalgam?: boolean
  smart_certified?: boolean
  holistic_pediatric?: boolean
  page?: number
}
