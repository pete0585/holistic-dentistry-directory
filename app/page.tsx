import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Shield, Award, Leaf, ArrowRight, CheckCircle, Search } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getStateCounts, getTotalCount } from '@/lib/data'

export const metadata: Metadata = {
  title: 'HolisticDentalFinder — Find a Dentist Who Actually Gets It',
  description: 'Find biological, holistic, and mercury-safe dentists from IAOMT, IABDM, HDA, and beyond. The only aggregated directory for whole-body dental care.',
}

const SPECIALTY_CARDS = [
  { slug: 'mercury-removal', label: 'Mercury Amalgam Removal', icon: Shield, description: 'SMART-certified dentists trained in safe mercury amalgam removal' },
  { slug: 'ozone-therapy', label: 'Ozone Therapy', icon: Leaf, description: 'Non-invasive ozone treatment for cavities and gum disease' },
  { slug: 'ceramic-implants', label: 'Ceramic Implants', icon: Award, description: 'Metal-free zirconia implants for biocompatible tooth replacement' },
  { slug: 'fluoride-free', label: 'Fluoride-Free Dentistry', icon: CheckCircle, description: 'Natural remineralization without fluoride treatments' },
  { slug: 'smart-protocol', label: 'SMART Protocol', icon: Shield, description: 'IAOMT SMART protocol for the safest amalgam removal available' },
  { slug: 'holistic-pediatric', label: 'Holistic Pediatric', icon: Leaf, description: 'Mercury-safe, fluoride-free dental care for children' },
]

const TOP_STATES = ['CA', 'TX', 'NY', 'FL', 'CO', 'WA', 'OR', 'AZ', 'NC', 'GA', 'TN', 'PA']
const STATE_NAMES: Record<string, string> = {
  CA: 'California', TX: 'Texas', NY: 'New York', FL: 'Florida', CO: 'Colorado',
  WA: 'Washington', OR: 'Oregon', AZ: 'Arizona', NC: 'North Carolina', GA: 'Georgia',
  TN: 'Tennessee', PA: 'Pennsylvania',
}

export default async function HomePage() {
  const [featuredListings, stateCounts, totalCount] = await Promise.all([
    getFeaturedListings(6),
    getStateCounts(),
    getTotalCount(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest via-forest to-forest-light text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" aria-hidden="true" />
            IAOMT · IABDM · HDA + Non-Affiliated Dentists
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Find a dentist who{' '}
            <span className="text-gold">actually understands</span>{' '}
            whole-body health
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The only directory covering all IAOMT, IABDM, and HDA members plus non-affiliated biological and holistic dentists nationwide. Stop guessing — find a verified practitioner who shares your values.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto">
            <Suspense fallback={<div className="h-14 bg-white/5 rounded-xl animate-pulse" />}>
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" aria-hidden="true" />
              {totalCount.toLocaleString()}+ dentists listed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" aria-hidden="true" />
              Mercury-safe & SMART certified
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" aria-hidden="true" />
              All 50 states
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" aria-hidden="true" />
              Free to search
            </span>
          </div>
        </div>
      </section>

      {/* Browse by specialty */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-forest">Browse by Specialty</h2>
            <p className="text-gray-500 mt-1">Find dentists trained in the specific treatments you need</p>
          </div>
          <Link href="/listings" className="hidden sm:flex items-center gap-1.5 text-forest hover:text-forest-light font-medium text-sm transition-colors">
            All dentists <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECIALTY_CARDS.map(({ slug, label, icon: Icon, description }) => (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              className="bg-white border border-ivory-dark rounded-2xl p-5 hover:border-forest/30 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-3 group-hover:bg-forest/15 transition-colors">
                <Icon className="w-5 h-5 text-forest" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-forest mb-1 group-hover:text-forest-light transition-colors">{label}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              <span className="inline-flex items-center gap-1 text-gold-dark text-xs font-medium mt-3">
                Find dentists <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      {featuredListings.length > 0 && (
        <section className="py-12 px-4 bg-ivory-dark/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-forest">Featured Dentists</h2>
                <p className="text-gray-500 mt-1">Verified biological and holistic dentists with full profiles</p>
              </div>
              <Link href="/listings?tier=featured" className="hidden sm:flex items-center gap-1.5 text-forest hover:text-forest-light font-medium text-sm transition-colors">
                View all featured <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by state */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-forest mb-2">Browse by State</h2>
        <p className="text-gray-500 mb-8">Holistic and biological dentists in every state</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {TOP_STATES.map((abbr) => (
            <Link
              key={abbr}
              href={`/listings?state=${abbr}`}
              className="bg-white border border-ivory-dark rounded-xl p-3 text-center hover:border-forest/30 hover:shadow-sm transition-all group"
            >
              <div className="text-xl font-bold text-forest group-hover:text-forest-light transition-colors">{abbr}</div>
              <div className="text-xs text-gray-500 mt-0.5">{STATE_NAMES[abbr]}</div>
              {stateCounts[abbr] && (
                <div className="text-xs text-gold-dark font-medium mt-1">{stateCounts[abbr]} dentists</div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/listings" className="inline-flex items-center gap-2 text-forest hover:text-forest-light font-medium transition-colors">
            <Search className="w-4 h-4" aria-hidden="true" />
            Search all 50 states
          </Link>
        </div>
      </section>

      {/* Why different */}
      <section className="py-16 px-4 bg-forest text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gold text-center mb-3">Why HolisticDentalFinder?</h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
            Every other directory only shows their own members. We aggregate all three associations plus non-affiliated dentists — so you see every option in your city.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'All three associations',
                body: 'IAOMT, IABDM, and HDA members in one place — plus thousands of non-affiliated biological dentists. No membership paywall to appear here.',
              },
              {
                title: 'Credential filters that matter',
                body: 'Filter by SMART certified, IAOMT Fellow, IABDM Certified, mercury-free, ozone therapy, ceramic implants. Find exactly who you need.',
              },
              {
                title: 'City-level search',
                body: 'Every major US city has a dedicated page. "Holistic dentist in Denver" returns real results, not a national list you have to sort through yourself.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-gold text-lg mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for dentists */}
      <section className="py-16 px-4 bg-ivory-dark/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-forest mb-3">Are you a holistic or biological dentist?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your listing may already be here — claim it free to add your full profile. A single new patient is worth $2,000–$15,000. A Verified listing at $149/year is a 13–100x ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-forest hover:bg-forest-light text-gold font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Add Your Practice Free
            </Link>
            <Link
              href="/listings"
              className="border-2 border-forest text-forest hover:bg-forest hover:text-gold font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Find Your Listing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
