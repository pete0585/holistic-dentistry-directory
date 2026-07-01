import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByState } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Holistic Dentists in Washington State | Find Biological & Mercury-Safe Dentists in WA',
  description: 'Find biological, holistic, and mercury-safe dentists across Washington State. Browse verified practitioners in Seattle, Bellevue, Spokane, Tacoma, and Bellingham.',
  openGraph: {
    title: 'Holistic Dentists in Washington State | HolisticDentalFinder',
    description: 'Browse verified holistic and biological dentists across Washington State — Seattle, Bellevue, Spokane, Tacoma, and beyond.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/states/washington' },
}

const WA_CITIES = [
  { name: 'Seattle', slug: 'seattle-wa' },
  { name: 'Bellevue', slug: 'bellevue-wa' },
  { name: 'Spokane', slug: 'spokane-wa' },
  { name: 'Tacoma', slug: 'tacoma-wa' },
  { name: 'Bellingham', slug: 'bellingham-wa' },
  { name: 'Olympia', slug: 'olympia-wa' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Holistic Dentists in Washington State',
  description: 'Directory of biological, holistic, and mercury-safe dentists in Washington State.',
  url: 'https://holisticdentalfinder.com/states/washington',
}

export const revalidate = 86400

export default async function WashingtonStatePage() {
  const listings = await getListingsByState('WA', 12).catch(() => [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">Washington State</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Holistic Dentists in Washington State
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Washington State has a higher-than-average density of holistic dental practices relative to its population —
            particularly in King County (Seattle and Bellevue) and Whatcom County (Bellingham, close to the British Columbia
            border). The state&apos;s strong naturopathic medicine community and Pacific Northwest health culture have driven
            significant patient demand for mercury-free, fluoride-free, and biocompatible dental care.
          </p>
        </div>

        {/* City breakdown */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-forest mb-4">Browse by city in Washington State</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {WA_CITIES.map(({ name, slug }) => (
              <Link
                key={slug}
                href={`/dentists/${slug}`}
                className="bg-white border border-ivory-dark rounded-xl p-3 text-center hover:border-forest/30 hover:shadow-sm transition-all group"
              >
                <div className="font-semibold text-forest text-sm group-hover:text-forest-light transition-colors">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5">WA</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured listings from WA */}
        {listings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Featured Washington State holistic dentists</h2>
            <p className="text-gray-500 text-sm mb-5">Verified biological dentists with full profiles across Washington State</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/listings?state=WA"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Browse all Washington State holistic dentists →
              </Link>
            </div>
          </div>
        )}

        {/* What to know in WA */}
        <div className="bg-ivory-dark/40 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-forest mb-5">Biological dentistry in Washington State: what to know</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Washington State has no specific licensing category for &ldquo;biological dentist&rdquo; or &ldquo;holistic dentist&rdquo; —
              all practicing dentists hold a Washington State dental license from the Washington State Dental Quality
              Assurance Commission. What differentiates biological practitioners is postgraduate training through IAOMT,
              IABDM, or HDA, plus their clinical choices around materials and protocols.
            </p>
            <p>
              The Seattle metropolitan area has the strongest concentration of IAOMT-affiliated practitioners in
              the Pacific Northwest. The naturopathic medicine community in Washington is legally empowered to
              practice a broader scope than in most states — Washington NDs hold prescriptive authority — and
              the cross-referral network between NDs and biological dentists is more developed here than in
              most markets.
            </p>
            <p>
              Bellingham deserves special mention: its proximity to Vancouver, BC (where access to SMART-protocol
              mercury removal is more limited and more expensive) has created a market for Canadian patients crossing
              the border for biological dental care. Several Bellingham practices are accustomed to serving patients
              who have traveled specifically for amalgam removal.
            </p>
            <p>
              Washington fluoridates water in many of its larger municipalities, including Seattle and Tacoma. Patients
              seeking fluoride-free care will find Washington&apos;s biological dentists well-prepared to offer non-fluoride
              alternatives including hydroxyapatite remineralization protocols.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-forest mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I find an IAOMT-certified dentist in Washington State?',
                a: 'Visit iaomt.org/find-a-dentist and filter by Washington State. IAOMT membership requires specific training in mercury-safe protocols. IAOMT accreditation (the highest level) requires additional clinical competency requirements. Seattle and the Eastside (Bellevue, Kirkland, Redmond) have the highest density of IAOMT-affiliated practitioners in the state.',
              },
              {
                q: 'Do Washington State naturopathic doctors provide dental care?',
                a: 'Washington NDs do not provide dental care directly — dental practice requires a dental license, regardless of ND training. However, Washington NDs may work alongside biological dentists in integrated health practices and can provide complementary health support before and after dental procedures. The ND-biological dentist collaboration model is more developed in Washington than in most states.',
              },
              {
                q: 'Are there holistic dentists near the Canadian border in Washington?',
                a: 'Yes — Bellingham has holistic dental practices that specifically serve both local patients and patients from the Vancouver, BC area. If you are traveling from Canada for SMART mercury amalgam removal, confirm the dentist\'s IAOMT SMART certification directly on the IAOMT website before booking and discuss multi-visit scheduling if you need multiple teeth removed.',
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
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in Washington State?</h2>
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
