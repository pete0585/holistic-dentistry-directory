import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByState } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Holistic Dentists in Texas | Find Biological & Mercury-Safe Dentists in TX',
  description: 'Find biological, holistic, and mercury-safe dentists across Texas. Browse verified practitioners in Austin, Dallas, Houston, and beyond.',
  openGraph: {
    title: 'Holistic Dentists in Texas | HolisticDentalFinder',
    description: 'Browse verified holistic and biological dentists across Texas — Austin, Dallas, Houston covered.',
  },
}

const TX_CITIES = [
  { name: 'Austin', slug: 'austin-tx' },
  { name: 'Dallas', slug: 'dallas-tx' },
  { name: 'Houston', slug: 'houston-tx' },
  { name: 'San Antonio', slug: 'san-antonio-tx' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Holistic Dentists in Texas',
  description: 'Directory of biological, holistic, and mercury-safe dentists in Texas.',
  url: 'https://holisticdentalfinder.com/states/texas',
}

export default async function TexasStatePage() {
  const listings = await getListingsByState('TX', 12)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">Texas</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Holistic Dentists in Texas
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Texas has a rapidly growing community of biological and holistic dental practitioners, driven by strong demand in Austin&apos;s biohacker community and functional medicine culture, Dallas&apos;s health-conscious metroplex, and Houston&apos;s diverse patient population. With 96+ practitioners listed across the state, Texas offers real options for patients seeking mercury-safe, fluoride-free, and biocompatible dental care.
          </p>
        </div>

        {/* Cities */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-forest mb-4">Browse by city in Texas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TX_CITIES.map(({ name, slug }) => (
              <Link
                key={slug}
                href={`/dentists/${slug}`}
                className="bg-white border border-ivory-dark rounded-xl p-3 text-center hover:border-forest/30 hover:shadow-sm transition-all group"
              >
                <div className="font-semibold text-forest text-sm group-hover:text-forest-light transition-colors">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5">TX</div>
              </Link>
            ))}
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-forest mb-2">Featured Texas holistic dentists</h2>
            <p className="text-gray-500 text-sm mb-5">Verified biological and mercury-safe dentists across Texas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/listings?state=TX"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Browse all Texas holistic dentists →
              </Link>
            </div>
          </div>
        )}

        <div className="bg-ivory-dark/40 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-forest mb-5">Biological dentistry in Texas: what to know</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Texas has no separate licensing category for biological or holistic dentists. All practitioners hold a Texas DDS or DMD license from the Texas State Board of Dental Examiners. What distinguishes biological dentists is their postgraduate training (IAOMT, IABDM, HDA) and their clinical choices: refusing to place mercury amalgam, using SMART protocol for safe removal, offering ozone therapy, and choosing biocompatible materials.
            </p>
            <p>
              Austin has the highest concentration of biological dental practices in Texas, consistent with the city&apos;s biohacking, functional medicine, and natural health community. Several Austin practices draw patients from across the state for SMART amalgam removal and ceramic implants.
            </p>
            <p>
              Dallas and Houston offer a solid selection of mercury-safe practitioners serving the state&apos;s two largest metro areas. Both cities have IAOMT-affiliated dentists with training in the full biological dentistry protocol set.
            </p>
          </div>
        </div>

        <div className="bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in Texas?</h2>
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
