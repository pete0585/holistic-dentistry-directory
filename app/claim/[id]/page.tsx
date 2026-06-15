'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Shield, Award } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string; verified?: string }>
}

export default function ClaimPage({ params, searchParams }: PageProps) {
  const { id } = use(params)
  const { token, verified: verifiedParam } = use(searchParams)

  const [state, setState] = useState<'idle' | 'loading' | 'email_sent' | 'verifying' | 'verified' | 'error' | 'already_verified'>('idle')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [upgrading, setUpgrading] = useState(false)
  const [monthlyViews, setMonthlyViews] = useState(0)

  useEffect(() => {
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      .from('listing_views').select('*', { count: 'exact', head: true })
      .eq('directory_slug', 'holistic-dentistry').eq('listing_id', id)
      .gte('viewed_at', monthStart)
      .then(({ count }) => setMonthlyViews(count ?? 0))
  }, [id])

  useEffect(() => {
    if (verifiedParam === 'true') {
      setState('already_verified')
      return
    }
    if (token) {
      setState('verifying')
      fetch('/api/claim/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, listing_id: id }),
      }).then((res) => {
        if (res.ok) {
          setState('verified')
        } else {
          setState('error')
          setErrorMsg('This verification link has expired or is invalid. Please request a new one.')
        }
      }).catch(() => {
        setState('error')
        setErrorMsg('Something went wrong. Please try again.')
      })
    }
  }, [token, verifiedParam, id])

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState('loading')
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: id, email }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Failed to send verification')
      }
      setState('email_sent')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const handleUpgrade = async (tier: 'verified' | 'featured') => {
    setUpgrading(true)
    try {
      const res = await fetch('/api/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: id, tier }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setUpgrading(false)
    }
  }

  if (state === 'verifying') {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Verifying your claim...</p>
      </div>
    )
  }

  if (state === 'verified' || state === 'already_verified') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-8 text-center mb-8">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-forest mb-2">
            {state === 'verified' ? 'Listing claimed!' : 'Your listing is verified'}
          </h1>
          <p className="text-gray-500 mb-2">
            {state === 'verified'
              ? 'Your listing has been verified and claimed. Upgrade to show your full profile to patients.'
              : 'Your payment was successful. Your listing has been upgraded.'}
          </p>
        </div>

        <div className='text-center mb-6'>
          <div className='text-5xl font-bold text-gray-900'>{monthlyViews ?? 0}</div>
          <div className='text-gray-500 mt-1'>people viewed your profile this month</div>
          <div className='mt-3 text-red-600 font-semibold'>0 could contact you — your phone and website are hidden</div>
        </div>
        <div className='space-y-3 mb-6 text-left'>
          {[['Your phone number visible to searchers','They can call you directly'],['Your website linked','Drive traffic to your practice site'],['Your full bio displayed','Build trust before they reach out'],['Verified badge','Stand out from unclaimed profiles']].map(([title, sub]) => (
            <div key={title} className='flex items-start gap-3'>
              <span className='text-green-500 text-lg'>✓</span>
              <div><div className='font-medium'>{title}</div><div className='text-sm text-gray-500'>{sub}</div></div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold text-forest text-center mb-6">Upgrade your listing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-forest/30 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-forest" aria-hidden="true" />
              <h3 className="font-bold text-forest text-lg">Verified</h3>
            </div>
            <div className="text-3xl font-bold text-forest mb-1">$149<span className="text-sm font-normal text-gray-400">/year</span></div>
            <ul className="space-y-2 text-sm text-gray-600 mt-4 mb-6">
              {['Full profile (photo, bio, credentials)', 'Credential badges (SMART, IAOMT, IABDM)', 'All specialties displayed', 'Contact form for appointment requests', 'Priority placement above free listings', '"Verified" badge'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade('verified')}
              disabled={upgrading}
              className="w-full bg-forest hover:bg-forest-light text-gold font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {upgrading ? 'Loading...' : 'Upgrade to Verified'}
            </button>
          </div>

          <div className="bg-gradient-to-br from-forest to-forest-light rounded-2xl border border-gold/30 shadow-md p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-gold" aria-hidden="true" />
              <h3 className="font-bold text-gold text-lg">Featured</h3>
            </div>
            <div className="text-3xl font-bold text-gold mb-1">$299<span className="text-sm font-normal text-gold/60">/year</span></div>
            <ul className="space-y-2 text-sm text-white/80 mt-4 mb-6">
              {['Everything in Verified', 'First position in city/state results', '"Featured" badge in search results', 'Monthly inquiry report (views & clicks)', 'Dedicated SEO-optimized page content', 'Metro category sponsorship slot'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade('featured')}
              disabled={upgrading}
              className="w-full bg-gold hover:bg-gold-light text-forest-dark font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {upgrading ? 'Loading...' : 'Upgrade to Featured'}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Use code <strong>HOLISTIC20</strong> for 20% off your first year
        </p>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-forest mb-2">Verification failed</h1>
        <p className="text-gray-500 mb-6">{errorMsg}</p>
        <button
          onClick={() => setState('idle')}
          className="bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  if (state === 'email_sent') {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-forest mb-2">Check your email</h1>
        <p className="text-gray-500">
          We sent a verification link to <strong>{email}</strong>. Click the link to claim your listing. Link expires in 72 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-8">
        <h1 className="text-2xl font-bold text-forest mb-2">Claim Your Listing</h1>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          Enter your practice email to verify ownership. We&apos;ll send you a confirmation link — the entire process takes 2 minutes.
        </p>

        <form onSubmit={handleClaim} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Practice Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@yourpractice.com"
              className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={state === 'loading'}
            className="w-full bg-forest hover:bg-forest-light text-gold font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60"
          >
            {state === 'loading' ? 'Sending...' : 'Send Verification Link'}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Claiming is free. Upgrade to Verified ($149/yr) after verification to unlock your full profile.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/listings" className="text-forest hover:text-forest-light text-sm font-medium transition-colors">
          ← Back to directory
        </Link>
      </div>
    </div>
  )
}
