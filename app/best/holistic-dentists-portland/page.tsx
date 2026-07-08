import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Portland, OR | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Portland, OR. IAOMT and IABDM-verified practitioners in Southeast Portland, Lake Oswego, and across the greater Portland metro.',
  openGraph: {
    title: 'Best Holistic Dentists in Portland, OR | HolisticDentalFinder',
    description: 'Find the best biological, holistic, and mercury-safe dentists in Portland, OR. IAOMT and IABDM-verified practitioners in Southeast Portland, Lake Oswego, and across the greater Portland metro.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/best/holistic-dentists-portland' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Portland, OR',
  description: 'Verified biological, holistic, and mercury-safe dentists in Portland, OR.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-portland',
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is Portland particularly well-known for holistic dentistry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Portland\'s natural health culture, long history of environmental awareness, and status as an unfluoridated water city have made biological dentistry more mainstream here than in most US markets. Portland residents have historically been more willing to seek out mercury-free, biocompatible dental care than average, and the local dental community has responded — there are proportionally more IAOMT-credentialed dentists in Portland than in comparable-sized cities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do Portland holistic dentists use ozone therapy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — ozone therapy is well-established in Portland\'s biological dental community. Multiple Portland biological dentists offer ozone for cavity prevention, treatment of early decay, gum disease management, and infection control. Portland\'s natural health orientation means ozone is more mainstream here than in most US markets. Ask any prospective Portland biological dentist whether they offer ozone and for what applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Oregon Medicaid cover biological dentistry for low-income patients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oregon Health Plan (OHP, Oregon\'s Medicaid) covers dental services for adults, which is relatively rare among state Medicaid programs. OHP covers basic preventive and restorative care. However, OHP is unlikely to cover premium biological materials (zirconia over composite, or composite specifically requested over amalgam). If you\'re on OHP and want mercury-free dentistry, ask which biological dentists in Portland accept OHP — some do, for basic care.',
      },
    },
    {
      '@type': 'Question',
      name: 'What neighborhoods in Portland have holistic dental practices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Southeast Portland (Division Street, Hawthorne, and Sellwood neighborhoods) has a concentration of holistic and biological dental practices reflecting SE Portland\'s natural health culture. Northeast Portland (Alberta Arts District, Irvington) also has established biological dentists. Lake Oswego and West Linn serve the affluent south suburbs. Vancouver, WA (directly across the Columbia) also has biological dental options accessible to North Portland residents.',
      },
    },
  ],
}

export const revalidate = 86400

export default async function BestHolisticDentistsPortlandPage() {
  const listings = await getListingsByCity('Portland', 'OR', 12).catch(() => [])
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
          <Link href="/dentists/portland-or" className="hover:text-forest transition-colors">Holistic Dentists in Portland</Link>
          {' / '}
          <span className="text-gray-600">Best of Portland</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Portland, OR
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Portland is one of the Pacific Northwest's most established markets for biological and holistic dentistry. The city's strong natural health culture, active IAOMT community, and fluoride controversy history (Portland famously rejected water fluoridation multiple times) have made biological dentistry a mainstream option here in a way it isn't in most US cities. Southeast Portland, Northeast Portland, and Lake Oswego have concentrations of biological dental practices.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from IAOMT member search, IABDM directory, HDA public member data, and DataForSEO Google Maps. Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent practitioners actively marketing as biological or holistic dentists in the Portland metro.
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
            href="/dentists/portland-or"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Portland &#x2192;
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
