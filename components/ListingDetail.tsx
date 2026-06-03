'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Globe, Mail, CheckCircle, Star, Leaf, ArrowLeft, Award, Shield } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { CREDENTIAL_LABELS, SPECIALTY_LABELS, formatPhone } from '@/lib/utils'

interface ListingDetailProps {
  listing: Listing
}

export default function ListingDetail({ listing }: ListingDetailProps) {
  const [leadSent, setLeadSent] = useState(false)
  const [leadLoading, setLeadLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' })

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadLoading(true)
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preferred_dentist_id: listing.id,
          state: listing.state,
        }),
      })
      setLeadSent(true)
    } catch {
      // ignore
    } finally {
      setLeadLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/listings" className="inline-flex items-center gap-2 text-forest hover:text-forest-light text-sm font-medium mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6">
            <div className="flex items-start gap-5">
              {listing.photo_url ? (
                <Image
                  src={listing.photo_url}
                  alt={listing.full_name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-2 border-ivory-dark"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0 text-forest text-2xl font-bold border-2 border-forest/20">
                  {listing.full_name.charAt(0)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h1 className="text-2xl font-bold text-forest leading-tight">{listing.full_name}</h1>
                    {listing.practice_name && (
                      <p className="text-gray-600 mt-1">{listing.practice_name}</p>
                    )}
                  </div>
                  {listing.listing_tier === 'featured' && (
                    <span className="flex items-center gap-1 bg-gold text-forest-dark px-3 py-1 rounded-full text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" /> Featured
                    </span>
                  )}
                  {listing.listing_tier === 'verified' && (
                    <span className="flex items-center gap-1 bg-forest text-gold px-3 py-1 rounded-full text-xs font-bold">
                      <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-forest/60" aria-hidden="true" />
                  <span>{listing.address_line1 ? `${listing.address_line1}, ` : ''}{listing.city}, {listing.state}{listing.zip ? ` ${listing.zip}` : ''}</span>
                </div>

                <div className="flex flex-wrap gap-3 mt-3">
                  {listing.phone && (
                    <a href={`tel:${listing.phone}`} className="flex items-center gap-1.5 text-forest hover:text-forest-light text-sm font-medium transition-colors">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      {formatPhone(listing.phone)}
                    </a>
                  )}
                  {listing.website && (
                    <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-forest hover:text-forest-light text-sm font-medium transition-colors">
                      <Globe className="w-4 h-4" aria-hidden="true" />
                      Visit Website
                    </a>
                  )}
                  {listing.email && listing.listing_tier !== 'free' && (
                    <a href={`mailto:${listing.email}`} className="flex items-center gap-1.5 text-forest hover:text-forest-light text-sm font-medium transition-colors">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      Email
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {listing.no_amalgam && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> Mercury-Free
                    </span>
                  )}
                  {listing.no_fluoride && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> Fluoride-Free
                    </span>
                  )}
                  {listing.smart_certified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/10 text-gold-dark text-xs font-medium rounded-full border border-gold/20">
                      <Award className="w-3.5 h-3.5" aria-hidden="true" /> SMART Certified
                    </span>
                  )}
                  {listing.accepting_new_patients && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-forest/10 text-forest text-xs font-medium rounded-full border border-forest/20">
                      <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> Accepting New Patients
                    </span>
                  )}
                  {listing.accepts_insurance === true && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-medium rounded-full border border-blue-200">
                      <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> Accepts Insurance
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {listing.bio && (
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6">
              <h2 className="font-bold text-forest text-lg mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{listing.bio}</p>
            </div>
          )}

          {/* Credentials */}
          {listing.credentials.length > 0 && (
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6">
              <h2 className="font-bold text-forest text-lg mb-4">Credentials & Associations</h2>
              <div className="flex flex-wrap gap-2">
                {listing.credentials.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest/5 text-forest text-sm font-medium rounded-xl border border-forest/15">
                    <Award className="w-4 h-4 text-gold" aria-hidden="true" />
                    {CREDENTIAL_LABELS[c] ?? c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Specialties */}
          {listing.specialties.length > 0 && (
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6">
              <h2 className="font-bold text-forest text-lg mb-4">Treatment Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {listing.specialties.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold-dark text-sm font-medium rounded-xl border border-gold/20">
                    <Leaf className="w-4 h-4" aria-hidden="true" />
                    {SPECIALTY_LABELS[s] ?? s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Unclaimed CTA */}
          {!listing.claimed_at && (
            <div className="bg-forest/5 border border-forest/20 rounded-2xl p-5">
              <p className="text-sm text-forest font-medium">
                Is this your practice?{' '}
                <Link href={`/claim/${listing.id}`} className="text-gold-dark hover:text-gold underline transition-colors">
                  Claim your free listing
                </Link>{' '}
                to add your photo, bio, specialties, and credentials.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Contact form (verified/featured only) */}
          {listing.listing_tier !== 'free' ? (
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-5">
              <h3 className="font-bold text-forest text-base mb-4">Request an Appointment</h3>
              {leadSent ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-forest font-medium">Message sent!</p>
                  <p className="text-gray-500 text-sm mt-1">The practice will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-ivory-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-ivory-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-ivory-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                  <textarea
                    placeholder="What brings you in? (e.g., SMART amalgam removal, new patient consultation)"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-ivory-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none"
                  />
                  <button
                    type="submit"
                    disabled={leadLoading}
                    className="w-full bg-forest hover:bg-forest-light text-gold font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
                  >
                    {leadLoading ? 'Sending...' : 'Request Appointment'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-forest/5 border border-forest/20 rounded-2xl p-5">
              <p className="text-sm text-forest font-medium mb-3">Contact information available after claiming.</p>
              <Link
                href={`/claim/${listing.id}`}
                className="block text-center bg-forest text-gold font-semibold py-3 rounded-xl text-sm hover:bg-forest-light transition-colors"
              >
                Claim This Listing
              </Link>
            </div>
          )}

          {/* Practice details card */}
          <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-5">
            <h3 className="font-bold text-forest text-base mb-3">Practice Details</h3>
            <dl className="space-y-2.5 text-sm">
              {listing.no_amalgam !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Mercury amalgam</dt>
                  <dd className={listing.no_amalgam ? 'text-emerald-600 font-medium' : 'text-gray-600'}>
                    {listing.no_amalgam ? 'Not used' : 'Not specified'}
                  </dd>
                </div>
              )}
              {listing.no_fluoride !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Fluoride</dt>
                  <dd className={listing.no_fluoride ? 'text-emerald-600 font-medium' : 'text-gray-600'}>
                    {listing.no_fluoride ? 'Not used' : 'Not specified'}
                  </dd>
                </div>
              )}
              {listing.offering_ozone && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ozone therapy</dt>
                  <dd className="text-emerald-600 font-medium">Available</dd>
                </div>
              )}
              {listing.ceramic_implants && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ceramic implants</dt>
                  <dd className="text-emerald-600 font-medium">Available</dd>
                </div>
              )}
              {listing.holistic_pediatric && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pediatric</dt>
                  <dd className="text-emerald-600 font-medium">Available</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">New patients</dt>
                <dd className={listing.accepting_new_patients ? 'text-emerald-600 font-medium' : 'text-gray-400'}>
                  {listing.accepting_new_patients ? 'Accepting' : 'Not accepting'}
                </dd>
              </div>
              {listing.accepts_insurance !== null && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Insurance</dt>
                  <dd className={listing.accepts_insurance ? 'text-emerald-600 font-medium' : 'text-gray-600'}>
                    {listing.accepts_insurance ? 'Accepted' : 'Not accepted'}
                  </dd>
                </div>
              )}
              {listing.source && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Source</dt>
                  <dd className="text-gray-600 capitalize">{listing.source}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Upgrade CTA */}
          {listing.listing_tier === 'free' && listing.claimed_at && (
            <div className="bg-gradient-to-br from-forest to-forest-light rounded-2xl p-5 text-white">
              <h3 className="font-bold text-gold text-base mb-2">Upgrade Your Listing</h3>
              <p className="text-white/80 text-sm mb-4">
                Get your photo, bio, credentials, and contact form in front of patients actively searching for a biological dentist.
              </p>
              <Link
                href={`/claim/${listing.id}`}
                className="block text-center bg-gold hover:bg-gold-light text-forest-dark font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                Upgrade to Verified — $149/yr
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
