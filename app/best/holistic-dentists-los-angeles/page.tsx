import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Los Angeles, CA | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Los Angeles. Browse verified IAOMT and SMART-certified practitioners for mercury removal, ozone therapy, and biocompatible dental care.',
  openGraph: {
    title: 'Best Holistic Dentists in Los Angeles | HolisticDentalFinder',
    description: 'Verified biological and holistic dentists in Los Angeles. SMART certified, ozone therapy, ceramic implants.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Los Angeles, CA',
  description: 'Verified biological, holistic, and mercury-safe dentists in Los Angeles, California.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-los-angeles',
  itemListElement: [],
}

export default async function BestHolisticDentistsLAPage() {
  const listings = await getListingsByCity('Los Angeles', 'CA', 12)
  const featuredListings = listings.filter((l) => l.listing_tier === 'featured').slice(0, 6)
  const verifiedListings = listings.filter((l) => l.listing_tier === 'verified').slice(0, 6)
  const displayListings = [...featuredListings, ...verifiedListings].slice(0, 9)
  const showListings = displayListings.length > 0 ? displayListings : listings.slice(0, 9)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/dentists/los-angeles-ca" className="hover:text-forest transition-colors">Holistic Dentists in Los Angeles</Link>
          {' / '}
          <span className="text-gray-600">Best of LA</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Los Angeles, CA
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Los Angeles has one of the highest concentrations of biological and holistic dental practices in the United States. Below are verified practitioners offering mercury amalgam removal with SMART protocol, ceramic zirconia implants, ozone therapy, and fluoride-free care — representing the full spectrum of biological dentistry available in LA.
          </p>
        </div>

        {/* What makes this list */}
        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are drawn from HolisticDentalFinder&apos;s verified database of biological and holistic dentists, sourced from the Holistic Dental Association (HDA), IAOMT public member search, IABDM directory, and DataForSEO Google Maps data. Featured and Verified dentists — those who have claimed their profiles and provided full credentials and specialty information — appear first.
          </p>
        </div>

        {/* Listings */}
        {showListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {showListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-ivory-dark mb-10">
            <p className="text-gray-500 mb-4">Verified listings are loading — check back soon.</p>
          </div>
        )}

        <div className="text-center mb-12">
          <Link
            href="/dentists/los-angeles-ca"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Los Angeles →
          </Link>
        </div>

        {/* What to look for */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-forest mb-6">What to look for in a Los Angeles holistic dentist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: 'SMART Protocol for Amalgam Removal',
                body: 'Los Angeles has some of the most credential-focused holistic dental practices in the country. If you need mercury amalgam removed, look for IAOMT-accredited or SMART-certified dentists specifically — not just practices that market as "mercury-free."',
              },
              {
                title: 'Ceramic & Zirconia Implants',
                body: 'LA\'s health-conscious patient base has driven strong demand for ceramic implants. Multiple practices in the metro offer zirconia implants as a metal-free alternative to titanium, with specialists in Beverly Hills, West Hollywood, Santa Monica, and surrounding areas.',
              },
              {
                title: 'Ozone Therapy Availability',
                body: 'Several LA-area biological dental practices use ozone therapy for cavity treatment, periodontal disease, and post-surgical healing. This is worth asking about specifically — not all holistic dentists have invested in ozone equipment.',
              },
              {
                title: 'Biocompatibility Testing',
                body: 'For patients with chemical sensitivities, autoimmune conditions, or planned major restorative work, biocompatibility testing (Clifford or Biocomp Labs) before material selection is the standard of care at top LA biological dental practices.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white border border-ivory-dark rounded-2xl p-5">
                <h3 className="font-bold text-forest mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in Los Angeles?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Your listing may already be here. Claim your free profile to add credentials, specialties, bio, and contact form — and appear where LA patients are actively searching.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/listings"
              className="bg-gold hover:bg-gold-light text-forest font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Find Your Listing
            </Link>
            <Link
              href="/submit"
              className="border-2 border-gold text-gold hover:bg-gold/10 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Add Your Practice Free
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
