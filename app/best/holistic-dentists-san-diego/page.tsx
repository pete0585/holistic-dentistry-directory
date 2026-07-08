import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in San Diego, CA | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in San Diego, CA. IAOMT and IABDM-verified practitioners in La Jolla, Encinitas, and across San Diego County.',
  openGraph: {
    title: 'Best Holistic Dentists in San Diego, CA | HolisticDentalFinder',
    description: 'Find the best biological, holistic, and mercury-safe dentists in San Diego, CA. IAOMT and IABDM-verified practitioners in La Jolla, Encinitas, and across San Diego County.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/best/holistic-dentists-san-diego' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in San Diego, CA',
  description: 'Verified biological, holistic, and mercury-safe dentists in San Diego, CA.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-san-diego',
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between a holistic dentist and a biological dentist in San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The terms are used interchangeably by many San Diego practitioners. Strictly, biological dentistry refers to a clinical philosophy emphasizing biocompatible materials, systemic health connections, and avoidance of toxic substances — the IAOMT and IABDM are its primary credentialing bodies. Holistic dentistry is a broader term that also encompasses mind-body approaches, nutritional counseling, and integrative health perspectives. The credential to verify is IAOMT membership (FIAOMT is the fellowship level) or IABDM Diplomate status.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there mercury-safe dentists near Camp Pendleton or military bases in San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. San Diego\'s large military community has driven some dentists in the Oceanside, Vista, and Carlsbad areas to offer mercury-safe dentistry. Military families with TRICARE coverage should note that TRICARE does not typically cover amalgam removal for non-emergency reasons, and biological dental practices that are out of network with TRICARE will require cash payment. Use this directory to find mercury-safe dentists in North County San Diego near Camp Pendleton.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do San Diego holistic dentists charge for a zirconia crown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zirconia crowns in San Diego typically run $1,400–$2,500 per crown, in line with the greater LA market. The key variables are the specific practice, whether they mill in-house (same-day zirconia is more expensive upfront but may save a second appointment), and whether you\'re paying cash or using out-of-network dental insurance with a superbill. Some San Diego biological dentists offer package pricing for multiple crowns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a difference between Encinitas and La Jolla for biological dentistry in San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both areas have established biological dental practices, but they serve different demographics. Encinitas (and North County generally) has a more natural health-oriented community with competitive pricing and a strong local IAOMT dentist presence. La Jolla tends toward more premium, concierge-style practices with higher fees reflecting the neighborhood\'s affluence. Both are excellent areas to find credentialed biological dentists — the best choice depends on your location in San Diego County.',
      },
    },
  ],
}

export const revalidate = 86400

export default async function BestHolisticDentistsSanDiegoPage() {
  const listings = await getListingsByCity('San Diego', 'CA', 12).catch(() => [])
  const featuredListings = listings.filter((l) => l.listing_tier === 'featured').slice(0, 6)
  const verifiedListings = listings.filter((l) => l.listing_tier === 'verified').slice(0, 6)
  const displayListings = [...featuredListings, ...verifiedListings].slice(0, 9)
  const showListings = displayListings.length > 0 ? displayListings : listings.slice(0, 9)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/dentists/san-diego-ca" className="hover:text-forest transition-colors">Holistic Dentists in San Diego</Link>
          {' / '}
          <span className="text-gray-600">Best of San Diego</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in San Diego, CA
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            San Diego's combination of military families, health-conscious professionals, and a large natural health community has made it one of Southern California's strongest markets for biological and holistic dentistry. Encinitas, La Jolla, and North County San Diego have notable concentrations of biological dental practices, reflecting the region's wellness orientation. The San Diego IAOMT chapter is active, making it easier to find credentialed biological dentists than in many comparably-sized markets.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from IAOMT member search, IABDM directory, HDA public member data, and DataForSEO Google Maps. Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent practitioners actively marketing as biological or holistic dentists in San Diego County.
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
            href="/dentists/san-diego-ca"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in San Diego &#x2192;
          </Link>
        </div>

        <section className="space-y-5 mb-12">
          <h2 className="text-2xl font-bold text-forest mb-2">Frequently Asked Questions</h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-ivory-dark p-6">
              <h3 className="font-bold text-forest mb-3">{faq.name}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="pt-8 border-t border-ivory-dark">
          <h3 className="text-lg font-semibold text-forest mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/what-is-biological-dentistry" className="text-sm text-forest hover:opacity-80 font-medium">What Is Biological Dentistry? &#x2192;</Link>
            <Link href="/guides/smart-amalgam-removal" className="text-sm text-forest hover:opacity-80 font-medium">SMART Amalgam Removal Guide &#x2192;</Link>
            <Link href="/guides/zirconia-vs-titanium-implants" className="text-sm text-forest hover:opacity-80 font-medium">Zirconia vs Titanium Implants &#x2192;</Link>
            <Link href="/submit" className="text-sm text-forest hover:opacity-80 font-medium">Add Your Practice &#x2192;</Link>
          </div>
        </div>
      </div>
    </>
  )
}
