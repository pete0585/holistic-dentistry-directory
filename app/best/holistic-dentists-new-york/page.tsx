import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in New York, NY | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in New York City. Verified IAOMT-certified and SMART-trained practitioners in Manhattan, Brooklyn, and the Upper West Side.',
  openGraph: {
    title: 'Best Holistic Dentists in New York, NY | HolisticDentalFinder',
    description: 'Verified biological and mercury-safe dentists in New York City — Manhattan, Brooklyn, and beyond.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/best/holistic-dentists-new-york' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in New York, NY',
  description: 'Verified biological, holistic, and mercury-safe dentists in New York City.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-new-york',
}

export const revalidate = 86400

export default async function BestHolisticDentistsNewYorkPage() {
  const listings = await getListingsByCity('New York', 'NY', 12).catch(() => [])
  const brooklynListings = await getListingsByCity('Brooklyn', 'NY', 6).catch(() => [])
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
          <Link href="/dentists/new-york-ny" className="hover:text-forest transition-colors">Holistic Dentists in New York</Link>
          {' / '}
          <span className="text-gray-600">Best of New York</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in New York, NY
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            New York City has one of the most educated and health-conscious patient populations in the country — and
            one of the highest concentrations of IAOMT-certified, mercury-free dental practices outside of California.
            Manhattan, Brooklyn, and the Upper West Side have strong clusters of biological dentists serving a
            population that demands high credentials and genuine biocompatible practice, not just marketing language.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from IAOMT member search, IABDM directory, HDA public member data, and DataForSEO Google Maps.
            Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent
            practitioners actively marketing as biological or holistic dentists in the New York City metro area.
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
            href="/dentists/new-york-ny"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in New York City →
          </Link>
        </div>

        {/* Brooklyn nearby */}
        {brooklynListings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Also in Brooklyn, NY</h2>
            <p className="text-gray-500 text-sm mb-5">Brooklyn has a growing cluster of biological dental practices — particularly in Park Slope, Cobble Hill, and Williamsburg — serving a health-forward residential population.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brooklynListings.slice(0, 3).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dentists/brooklyn-ny" className="text-forest hover:text-forest-light font-medium text-sm">
                See all holistic dentists in Brooklyn →
              </Link>
            </div>
          </div>
        )}

        {/* What makes NYC unique */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-forest mb-5">What makes the NYC holistic dental market different</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">Highly credentialed patient expectations</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                New York City patients asking for biological dental care tend to be highly researched. They know the
                difference between IAOMT membership and IAOMT accreditation. They ask about SMART protocol specifics
                and material biocompatibility testing. Practitioners in this market are accustomed to sophisticated questions —
                and the good ones welcome them.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">International patient travel</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Several top NYC biological dentists see international patients — particularly from Europe, where access
                to SMART-certified mercury removal is limited. If you&apos;re traveling to New York for amalgam removal,
                verify the dentist&apos;s SMART accreditation on iaomt.org before booking and confirm they accommodate
                out-of-town patients with compressed appointment schedules.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">Fluoride-free demand in a fluoridated city</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                New York City fluoridates its municipal water supply. Patients seeking biological dental care here
                frequently want fluoride-free cleanings, sealants, and treatments — and may want guidance on water
                filtration as part of their whole-body health approach. Holistic dentists in NYC are well-versed in
                this conversation.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-2">IABDM membership concentration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The International Academy of Biological Dentistry and Medicine (IABDM) has several member practitioners
                in the New York metro area, particularly in Manhattan and the Upper West Side. IABDM membership indicates
                a practitioner trained in whole-body systemic connections to oral health — beyond materials alone.
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
                q: 'What should I look for in a holistic dentist in NYC?',
                a: 'Verify IAOMT membership (iaomt.org/find-a-dentist) for mercury amalgam removal — the SMART certification is the standard. For general biological dentistry, look for mercury-free materials, biocompatibility testing options, and fluoride-free treatment options. Ask directly about their medical director, training, and specific protocols for any procedure you need.',
              },
              {
                q: 'Do New York State dentists need a special license to call themselves "biological dentists"?',
                a: 'No. In New York State, any licensed dentist can use the term "holistic," "biological," or "mercury-free." The credential that actually verifies training is IAOMT membership or accreditation, or IABDM membership. A dentist who uses the term without any verifiable training credentials is a marketing claim, not a clinical credential.',
              },
              {
                q: 'How much does mercury amalgam removal cost in New York City?',
                a: 'SMART-protocol amalgam removal in NYC typically runs $300-700 per tooth, depending on the complexity and the dentist\'s practice level. Manhattan practices tend to run at the higher end of this range. Many patients schedule all amalgam removal in one or two visits to minimize disruption; some prefer a staged approach. Ask your dentist for a full treatment plan and cost estimate before starting.',
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
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in New York?</h2>
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
