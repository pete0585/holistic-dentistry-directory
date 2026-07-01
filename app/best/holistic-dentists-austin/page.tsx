import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Austin, TX | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Austin, TX. IAOMT-verified practitioners in South Austin, Mueller, and across the metro for amalgam removal and biocompatible care.',
  openGraph: {
    title: 'Best Holistic Dentists in Austin, TX | HolisticDentalFinder',
    description: 'Verified biological and mercury-safe dentists in Austin, Texas.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/best/holistic-dentists-austin' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Austin, TX',
  description: 'Verified biological, holistic, and mercury-safe dentists in Austin, Texas.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-austin',
}

export const revalidate = 86400

export default async function BestHolisticDentistsAustinPage() {
  const listings = await getListingsByCity('Austin', 'TX', 12).catch(() => [])
  const roundRockListings = await getListingsByCity('Round Rock', 'TX', 6).catch(() => [])
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
          <Link href="/dentists/austin-tx" className="hover:text-forest transition-colors">Holistic Dentists in Austin</Link>
          {' / '}
          <span className="text-gray-600">Best of Austin</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Austin, TX
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Austin is one of the most wellness-forward cities in Texas — and its rapid growth has brought an influx
            of West Coast transplants accustomed to biological dental care. South Austin, East Austin, and the Mueller
            neighborhood have notable clusters of holistic dental practices. The credential that matters here is
            IAOMT or IABDM membership — Texas does not regulate the &ldquo;biological dentist&rdquo; claim, so any dentist
            can use that language without specific training.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from IAOMT member search, IABDM directory, HDA public member data, and DataForSEO Google Maps.
            Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent
            practitioners actively marketing as biological or holistic dentists in the Austin metro area.
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
            href="/dentists/austin-tx"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Austin →
          </Link>
        </div>

        {/* Round Rock nearby */}
        {roundRockListings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Also in nearby Round Rock, TX</h2>
            <p className="text-gray-500 text-sm mb-5">Round Rock and the Cedar Park/Georgetown corridor have holistic dental practices serving the north Austin suburbs.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {roundRockListings.slice(0, 3).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dentists/round-rock-tx" className="text-forest hover:text-forest-light font-medium text-sm">
                See all holistic dentists near Round Rock →
              </Link>
            </div>
          </div>
        )}

        {/* What makes Austin unique */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-forest mb-5">What makes Austin&apos;s holistic dental market different</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">Credential verification is essential in Texas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Texas does not regulate or define &ldquo;biological dentist,&rdquo; &ldquo;holistic dentist,&rdquo; or &ldquo;mercury-free dentist&rdquo; as
                official categories. Any Texas dentist can use these terms in marketing. The credential to verify is
                IAOMT membership (for mercury-safe care) or IABDM membership — these require actual training and
                adherence to specific protocols. Check iaomt.org/find-a-dentist directly.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">West Coast transplant expectations</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Austin&apos;s tech industry growth has brought a large population of California transplants accustomed
                to the density and quality of biological dental care in LA and the Bay Area. This has elevated
                patient expectations and driven practices to compete on credentials, not just marketing language.
                Austin&apos;s better biological dentists know the SMART protocol specifics and can discuss material
                biocompatibility in detail.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">South Austin and Mueller neighborhood clusters</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                South Austin&apos;s independent, health-conscious culture has historically supported the highest
                concentration of alternative health practitioners in the city, including biological dentists.
                The Mueller neighborhood — an urban redevelopment with a health-forward residential demographic —
                has also attracted holistic dental practices. These areas are worth prioritizing in your search.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">Austin is still a developing market</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unlike Los Angeles or Seattle, Austin&apos;s biological dentistry market is still maturing. There are
                fewer IAOMT-accredited dentists (the highest SMART certification level) relative to the city&apos;s
                size. If you need SMART-certified mercury removal specifically, confirm accreditation on the IAOMT
                website — not just membership status — before booking.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-forest mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I verify an Austin dentist is actually IAOMT-trained?',
                a: 'Go directly to iaomt.org/find-a-dentist and search by Texas or Austin. IAOMT membership requires completing specific training courses and committing to the SMART protocol for amalgam removal. IAOMT accreditation (the highest level) requires additional clinical requirements. A dentist who describes themselves as "holistic" or "biological" without appearing in the IAOMT or IABDM directory has completed no verifiable training in these protocols.',
              },
              {
                q: 'Does Austin water fluoridation affect my child\'s dental care at a biological dentist?',
                a: 'Austin fluoridates its municipal water supply at the recommended 0.7 ppm. Biological dentists in Austin typically offer fluoride-free treatment options — fluoride-free sealants, fluoride-free cleanings, and alternative remineralization products (hydroxyapatite-based). Discuss your preferences with the dentist during your first consultation.',
              },
              {
                q: 'What does SMART mercury removal cost in Austin?',
                a: 'SMART-protocol mercury amalgam removal in Austin generally runs $250-500 per tooth, lower than coastal markets. Practices vary on whether an initial consultation fee applies. Request a full treatment plan and cost estimate before committing — some patients schedule all removal in one comprehensive visit to consolidate costs and recovery.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-ivory-dark p-6">
                <h3 className="font-bold text-forest mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in Austin?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Your listing may already be here. Claim your free profile to add credentials, specialties, bio, and patient contact form.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="bg-gold hover:bg-gold-light text-forest font-bold px-6 py-3 rounded-xl transition-colors">
              Find Your Listing
            </Link>
            <Link href="/submit" className="border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Submit New Listing
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
