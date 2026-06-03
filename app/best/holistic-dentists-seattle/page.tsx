import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Seattle, WA | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Seattle. Verified IAOMT and SMART-certified practitioners for mercury removal, ozone therapy, and biocompatible dental care in the Pacific Northwest.',
  openGraph: {
    title: 'Best Holistic Dentists in Seattle | HolisticDentalFinder',
    description: 'Verified biological and mercury-safe dentists in Seattle, Washington.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Seattle, WA',
  description: 'Verified biological, holistic, and mercury-safe dentists in Seattle, Washington.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-seattle',
}

export default async function BestHolisticDentistsSeattlePage() {
  const listings = await getListingsByCity('Seattle', 'WA', 12)
  const bellevueListings = await getListingsByCity('Bellevue', 'WA', 6)
  const featuredListings = listings.filter((l) => l.listing_tier === 'featured').slice(0, 6)
  const verifiedListings = listings.filter((l) => l.listing_tier === 'verified').slice(0, 6)
  const displayListings = [...featuredListings, ...verifiedListings].slice(0, 9)
  const showListings = displayListings.length > 0 ? displayListings : listings.slice(0, 9)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/dentists/seattle-wa" className="hover:text-forest transition-colors">Holistic Dentists in Seattle</Link>
          {' / '}
          <span className="text-gray-600">Best of Seattle</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Seattle, WA
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Seattle&apos;s health-conscious culture and proximity to the Pacific Northwest&apos;s natural health community has cultivated one of the stronger biological dentistry markets in the West. Below are verified practitioners across the Seattle metro offering mercury-safe dental care, SMART protocol amalgam removal, ozone therapy, and biocompatible materials.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from HDA public member data, IAOMT member search, IABDM directory, and DataForSEO Google Maps data for the Seattle metro area. Featured and Verified dentists appear first. All listed practitioners actively market as biological, holistic, or mercury-safe dentists.
          </p>
        </div>

        {showListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {showListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-ivory-dark mb-10">
            <p className="text-gray-500 mb-4">Listings loading — check back soon.</p>
          </div>
        )}

        <div className="text-center mb-12">
          <Link
            href="/dentists/seattle-wa"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Seattle →
          </Link>
        </div>

        {/* Bellevue nearby */}
        {bellevueListings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Also in Bellevue, WA</h2>
            <p className="text-gray-500 text-sm mb-5">Bellevue and the Eastside have their own cluster of biological dental practices serving the greater Seattle metro area.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bellevueListings.slice(0, 3).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dentists/seattle-wa" className="text-forest hover:text-forest-light font-medium text-sm">
                Browse all Washington holistic dentists →
              </Link>
            </div>
          </div>
        )}

        {/* Local context */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-forest mb-6">Seattle&apos;s biological dentistry landscape</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Pacific Northwest natural health culture',
                body: 'Seattle patients are more likely than most to arrive informed — having already researched IAOMT, SMART protocol, and biocompatible materials. Biological dentists here are accustomed to this and often provide thorough consultations before any work begins.',
              },
              {
                title: 'Mercury removal demand',
                body: 'Seattle has a strong demand for SMART protocol amalgam removal. Several practices in the metro area specialize specifically in mercury-safe removal, drawing patients from across Washington and occasionally from Oregon.',
              },
              {
                title: 'Fluoride-free pediatric options',
                body: 'Seattle\'s parents — many of whom are research-oriented and skeptical of conventional dental defaults — have driven demand for holistic pediatric dentists offering fluoride-free care for children. Several Seattle-area practices cater specifically to this need.',
              },
              {
                title: 'Integration with functional medicine',
                body: 'Seattle has a robust integrative health community. Many biological dental practices coordinate with naturopathic doctors, functional medicine practitioners, and integrative health providers — offering more complete care coordination than conventional dental offices.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white border border-ivory-dark rounded-2xl p-5">
                <h3 className="font-bold text-forest mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in Seattle?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Your practice may already be listed. Claim your free profile to show credentials, specialties, and contact information — and be visible when Seattle patients search for biological dental care.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="bg-gold hover:bg-gold-light text-forest font-bold px-6 py-3 rounded-xl transition-colors">
              Find Your Listing
            </Link>
            <Link href="/submit" className="border-2 border-gold text-gold hover:bg-gold/10 font-bold px-6 py-3 rounded-xl transition-colors">
              Add Your Practice Free
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
