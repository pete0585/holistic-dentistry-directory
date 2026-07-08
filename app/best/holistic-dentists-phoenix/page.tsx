import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Phoenix, AZ | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Phoenix and Scottsdale, AZ. IAOMT and IABDM-verified practitioners in Scottsdale, Paradise Valley, and the Valley of the Sun.',
  openGraph: {
    title: 'Best Holistic Dentists in Phoenix, AZ | HolisticDentalFinder',
    description: 'Find the best biological, holistic, and mercury-safe dentists in Phoenix and Scottsdale, AZ. IAOMT and IABDM-verified practitioners in Scottsdale, Paradise Valley, and the Valley of the Sun.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/best/holistic-dentists-phoenix' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Phoenix, AZ',
  description: 'Verified biological, holistic, and mercury-safe dentists in Phoenix, AZ.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-phoenix',
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Scottsdale better than Phoenix for holistic dental care?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scottsdale has a higher density of biological and holistic dental practices than central Phoenix, driven by its wellness tourism industry and affluent resident demographic. Old Town Scottsdale and North Scottsdale have multiple IAOMT-credentialed biological dentists. Central Phoenix and the East Valley also have biological dental options — use this directory to filter by location for the most convenient practices.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does SMART amalgam removal cost in Phoenix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SMART amalgam removal in Phoenix typically runs $300–$700 per tooth, somewhat lower than coastal markets. The Valley\'s competitive dental market and lower cost of living mean biological dentistry is more accessible here than in LA or NYC. Comprehensive SMART removal of a full mouth (multiple amalgam fillings) often runs $2,000–$6,000 depending on the number and size of fillings. Most Phoenix biological dentists offer payment plans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are Arizona snowbirds able to get amalgam removal in Phoenix during winter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — and it\'s common. Many Phoenix and Scottsdale biological dental practices have a seasonal patient population from colder states who schedule major dental work (amalgam removal, implants, crowns) during winter stays. If you\'re a snowbird, book several weeks in advance for the November–March period, as practice schedules fill quickly. Some practices offer multi-visit SMART removal packages specifically designed for patients with a defined stay duration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do Phoenix biological dentists offer ceramic (zirconia) implants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — zirconia implants are increasingly common in Phoenix\'s biological dentistry community as an alternative to titanium. Zirconia is promoted in biological dentistry circles as a metal-free, biocompatible implant material. Phoenix biological dentists experienced in zirconia implants are available, though fewer practices place zirconia vs titanium. Ask specifically about zirconia implant experience and outcomes data before selecting a practitioner.',
      },
    },
  ],
}

export const revalidate = 86400

export default async function BestHolisticDentistsPhoenixPage() {
  const listings = await getListingsByCity('Phoenix', 'AZ', 12).catch(() => [])
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
          <Link href="/dentists/phoenix-az" className="hover:text-forest transition-colors">Holistic Dentists in Phoenix</Link>
          {' / '}
          <span className="text-gray-600">Best of Phoenix</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Phoenix, AZ
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Phoenix and Scottsdale have one of the most developed biological and holistic dental markets in the Southwest. The Valley's large retiree population, wellness tourism industry, and health-conscious permanent residents have driven strong demand for mercury-safe and biocompatible dentistry. Scottsdale's wellness corridor and North Phoenix are the primary hubs for biological dental practices.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from IAOMT member search, IABDM directory, HDA public member data, and DataForSEO Google Maps. Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent practitioners actively marketing as biological or holistic dentists in the Phoenix-Scottsdale metro.
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
            href="/dentists/phoenix-az"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Phoenix &#x2192;
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
