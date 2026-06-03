import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByState } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Holistic Dentists in Florida | Find Biological & Mercury-Safe Dentists in FL',
  description: 'Find biological, holistic, and mercury-safe dentists across Florida. Browse verified practitioners in Miami, Tampa, Orlando, Jacksonville, and beyond.',
  openGraph: {
    title: 'Holistic Dentists in Florida | HolisticDentalFinder',
    description: 'Browse verified holistic and biological dentists across Florida — Miami, Tampa, and more.',
  },
}

const FL_CITIES = [
  { name: 'Miami', slug: 'miami-fl' },
  { name: 'Tampa', slug: 'tampa-fl' },
  { name: 'Fort Lauderdale', slug: 'fort-lauderdale-fl' },
  { name: 'Orlando', slug: 'orlando-fl' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Holistic Dentists in Florida',
  description: 'Directory of biological, holistic, and mercury-safe dentists in Florida.',
  url: 'https://holisticdentalfinder.com/states/florida',
}

export default async function FloridaStatePage() {
  const listings = await getListingsByState('FL', 12)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">Florida</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Holistic Dentists in Florida
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Florida has one of the largest concentrations of biological and holistic dental practices on the East Coast, with 100+ practitioners listed across the state. Miami&apos;s health-forward culture, Tampa&apos;s growing wellness community, and Florida&apos;s large population of health-conscious retirees and patients with chronic health concerns have made the state a significant market for mercury-safe, biocompatible dental care.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-forest mb-4">Browse by city in Florida</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FL_CITIES.map(({ name, slug }) => (
              <Link
                key={slug}
                href={`/dentists/${slug}`}
                className="bg-white border border-ivory-dark rounded-xl p-3 text-center hover:border-forest/30 hover:shadow-sm transition-all group"
              >
                <div className="font-semibold text-forest text-sm group-hover:text-forest-light transition-colors">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5">FL</div>
              </Link>
            ))}
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Featured Florida holistic dentists</h2>
            <p className="text-gray-500 text-sm mb-5">Verified biological and mercury-safe dentists across Florida</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/listings?state=FL"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Browse all Florida holistic dentists →
              </Link>
            </div>
          </div>
        )}

        <div className="bg-ivory-dark/40 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-forest mb-5">Biological dentistry in Florida: what to know</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Florida has no separate licensing category for biological or holistic dentists — all practitioners are licensed by the Florida Board of Dentistry. What distinguishes biological practitioners is their postgraduate training through IAOMT, IABDM, or HDA and their clinical commitment to non-toxic, biocompatible dental care.
            </p>
            <p>
              Miami-Dade and Broward counties have the highest density of holistic dental practices in Florida, serving a health-conscious patient base that includes a large Latin American community with strong interest in natural and non-toxic health approaches. Tampa Bay has a growing cluster of biological dentists, consistent with the region&apos;s expanding wellness community.
            </p>
            <p>
              Florida is also notable for its large population of older adults who may have significant amalgam fillings from past decades — creating strong demand for SMART protocol mercury amalgam removal across the state.
            </p>
          </div>
        </div>

        <div className="bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in Florida?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Your listing may already be here. Claim it free to add credentials, specialties, and a patient contact form.
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
