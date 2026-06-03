import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Denver, CO | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Denver. Verified IAOMT-trained and SMART-certified practitioners for mercury removal, ozone therapy, and whole-body dental care.',
  openGraph: {
    title: 'Best Holistic Dentists in Denver | HolisticDentalFinder',
    description: 'Verified biological and mercury-safe dentists in Denver, Colorado.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Denver, CO',
  description: 'Verified biological, holistic, and mercury-safe dentists in Denver, Colorado.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-denver',
}

export default async function BestHolisticDentistsDenverPage() {
  const listings = await getListingsByCity('Denver', 'CO', 12)
  const boulderListings = await getListingsByCity('Boulder', 'CO', 6)
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
          <Link href="/dentists/denver-co" className="hover:text-forest transition-colors">Holistic Dentists in Denver</Link>
          {' / '}
          <span className="text-gray-600">Best of Denver</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Denver, CO
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Denver&apos;s health-first culture — outdoor athletes, biohackers, functional medicine patients — has made the city one of the strongest markets for biological dentistry in the Mountain West. Below are verified practitioners offering mercury amalgam removal with SMART protocol, ceramic implants, ozone therapy, and biocompatible care for Denver&apos;s demanding, health-literate patients.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from HDA public member data, IAOMT member search, IABDM directory, and DataForSEO Google Maps. Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent practitioners actively marketing as biological or holistic dentists in the Denver metro area.
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
            href="/dentists/denver-co"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Denver →
          </Link>
        </div>

        {/* Boulder nearby */}
        {boulderListings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Also in nearby Boulder, CO</h2>
            <p className="text-gray-500 text-sm mb-5">Boulder has a strong concentration of biological dentists — worth including if you&apos;re in the Front Range corridor.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {boulderListings.slice(0, 3).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dentists/boulder-co" className="text-forest hover:text-forest-light font-medium text-sm">
                See all holistic dentists in Boulder →
              </Link>
            </div>
          </div>
        )}

        {/* What makes Denver unique */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-forest mb-6">Denver&apos;s biological dentistry landscape</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Strong athletic & biohacker clientele',
                body: 'Denver\'s population skews younger and more health-oriented than most major metros. Biological dentists here are accustomed to working with patients who do their research — expect straightforward answers about SMART protocol, ozone, and biocompatible materials.',
              },
              {
                title: 'Mercury removal specialists',
                body: 'Several Denver-area practices specialize specifically in SMART protocol amalgam removal, drawing patients from across Colorado. If mercury removal is your primary concern, Denver has qualified practitioners.',
              },
              {
                title: 'Integrative care coordination',
                body: 'Denver has a robust functional medicine community. Many biological dental practices in the area actively coordinate with integrative health practitioners — making it easier to get a whole-body picture around your dental work.',
              },
              {
                title: 'Front Range coverage',
                body: 'Patients in Boulder, Colorado Springs, Fort Collins, and surrounding communities frequently travel to Denver for specialized biological dental care, including SMART removal and ceramic implants.',
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
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in Denver?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Your listing may already be on HolisticDentalFinder. Claim your free profile to add credentials, specialties, and a contact form — and appear in front of Denver patients actively searching for biological dental care.
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
