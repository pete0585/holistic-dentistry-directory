import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByState } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Holistic Dentists in California | Find Biological & Mercury-Safe Dentists in CA',
  description: 'Find biological, holistic, and mercury-safe dentists across California. Browse verified practitioners in Los Angeles, San Diego, San Francisco, Sacramento, and beyond.',
  openGraph: {
    title: 'Holistic Dentists in California | HolisticDentalFinder',
    description: 'Browse verified holistic and biological dentists across California — all major cities covered.',
  },
}

const CA_CITIES = [
  { name: 'Los Angeles', slug: 'los-angeles-ca' },
  { name: 'San Diego', slug: 'san-diego-ca' },
  { name: 'San Francisco', slug: 'san-francisco-ca' },
  { name: 'Sacramento', slug: 'sacramento-ca' },
  { name: 'San Jose', slug: 'san-jose-ca' },
  { name: 'Oakland', slug: 'oakland-ca' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Holistic Dentists in California',
  description: 'Directory of biological, holistic, and mercury-safe dentists in California.',
  url: 'https://holisticdentalfinder.com/states/california',
}

export default async function CaliforniaStatePage() {
  const listings = await getListingsByState('CA', 12)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">California</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Holistic Dentists in California
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            California has the largest concentration of biological and holistic dental practices in the United States. The state&apos;s health-conscious culture — spanning coastal wellness communities in Los Angeles, San Diego, and the Bay Area to functional medicine hotbeds in Sacramento and the Central Valley — has created strong demand for mercury-free, biocompatible, and whole-body dental care. California is home to some of the most credentialed IAOMT and IABDM practitioners in the country.
          </p>
        </div>

        {/* City breakdown */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-forest mb-4">Browse by city in California</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CA_CITIES.map(({ name, slug }) => (
              <Link
                key={slug}
                href={`/dentists/${slug}`}
                className="bg-white border border-ivory-dark rounded-xl p-3 text-center hover:border-forest/30 hover:shadow-sm transition-all group"
              >
                <div className="font-semibold text-forest text-sm group-hover:text-forest-light transition-colors">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5">CA</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured listings from CA */}
        {listings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Featured California holistic dentists</h2>
            <p className="text-gray-500 text-sm mb-5">Verified biological dentists with full profiles across California</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/listings?state=CA"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Browse all California holistic dentists →
              </Link>
            </div>
          </div>
        )}

        {/* What to know in CA */}
        <div className="bg-ivory-dark/40 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-forest mb-5">Biological dentistry in California: what to know</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              California has no specific licensing category for &ldquo;biological dentist&rdquo; or &ldquo;holistic dentist&rdquo; — all practicing dentists hold a California DDS or DMD license from the Dental Board of California. What differentiates biological practitioners is postgraduate training through IAOMT, IABDM, or HDA, plus their clinical choices around materials, protocols, and whole-body health considerations.
            </p>
            <p>
              California was one of the first states to see significant adoption of mercury-free dentistry, and it has been home to IAOMT chapter activity for decades. Several California dental practices have been at the forefront of SMART protocol development and biocompatible materials research.
            </p>
            <p>
              For patients seeking SMART mercury amalgam removal, California offers the broadest selection of credentialed practitioners of any state. Los Angeles, San Diego, and the Bay Area each have multiple IAOMT-accredited dentists — the highest standard of training for amalgam removal.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in California?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Your listing may already be here. Claim your free profile to add credentials, specialties, bio, and patient contact form.
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
