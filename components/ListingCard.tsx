import Link from 'next/link'
import { MapPin, Phone, Globe, CheckCircle, Star, Leaf } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { CREDENTIAL_LABELS, SPECIALTY_LABELS } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
}

const TIER_BADGE: Record<string, { label: string; className: string }> = {
  featured: { label: 'Featured', className: 'bg-gold text-forest-dark font-semibold' },
  verified: { label: 'Verified', className: 'bg-forest text-gold font-medium' },
  free: { label: '', className: '' },
}

export default function ListingCard({ listing }: ListingCardProps) {
  const tierBadge = TIER_BADGE[listing.listing_tier]
  const topCredentials = listing.credentials.slice(0, 2)
  const topSpecialties = listing.specialties.slice(0, 3)

  return (
    <Link href={`/listings/${listing.slug}`} className="block group">
      <div className={`
        bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden
        ${listing.listing_tier === 'featured' ? 'border-gold/40 ring-1 ring-gold/20' : 'border-ivory-dark'}
      `}>
        {listing.listing_tier === 'featured' && (
          <div className="bg-gold/10 border-b border-gold/20 px-5 py-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-gold fill-gold" aria-hidden="true" />
            <span className="text-xs font-semibold text-gold-dark uppercase tracking-wide">Featured Listing</span>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-forest text-lg leading-snug group-hover:text-forest-light transition-colors truncate">
                {listing.full_name}
              </h3>
              {listing.practice_name && (
                <p className="text-gray-500 text-sm truncate mt-0.5">{listing.practice_name}</p>
              )}
            </div>
            {tierBadge.label && (
              <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs ${tierBadge.className}`}>
                {tierBadge.label}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0 text-forest/60" aria-hidden="true" />
            <span>{listing.city}, {listing.state}</span>
          </div>

          {topCredentials.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {topCredentials.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 bg-forest/5 text-forest text-xs rounded-full border border-forest/10">
                  <CheckCircle className="w-3 h-3" aria-hidden="true" />
                  {CREDENTIAL_LABELS[c] ?? c}
                </span>
              ))}
            </div>
          )}

          {topSpecialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {topSpecialties.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold/10 text-gold-dark text-xs rounded-full border border-gold/20">
                  <Leaf className="w-3 h-3" aria-hidden="true" />
                  {SPECIALTY_LABELS[s] ?? s}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-ivory-dark">
            {listing.no_amalgam && (
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> Mercury-Free
              </span>
            )}
            {listing.smart_certified && (
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> SMART Certified
              </span>
            )}
            {listing.accepting_new_patients && (
              <span className="text-xs text-forest font-medium ml-auto">Accepting Patients</span>
            )}
          </div>

          {(listing.phone || listing.website) && (
            <div className="flex gap-3 mt-3">
              {listing.phone && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  {listing.phone}
                </span>
              )}
              {listing.website && (
                <span className="flex items-center gap-1 text-xs text-forest">
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  Website
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
