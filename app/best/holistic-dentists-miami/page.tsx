import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Miami, FL | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Miami, FL. IAOMT and IABDM-verified practitioners in Brickell, Coral Gables, and South Florida.',
  openGraph: {
    title: 'Best Holistic Dentists in Miami, FL | HolisticDentalFinder',
    description: 'Find the best biological, holistic, and mercury-safe dentists in Miami, FL. IAOMT and IABDM-verified practitioners in Brickell, Coral Gables, and South Florida.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/best/holistic-dentists-miami' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Miami, FL',
  description: 'Verified biological, holistic, and mercury-safe dentists in Miami, FL.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-miami',
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is biological dentistry more common in Miami than other US cities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Miami has higher-than-average awareness of biological dentistry partly due to its large Latin American and European immigrant population, where holistic dentistry has been more mainstream for longer. Some Miami biological dentists have international training credentials from Germany, Switzerland, or Latin American institutions where mercury-free and biocompatible dentistry is standard practice, not a specialty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do Miami holistic dentists offer ozone therapy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — ozone therapy is more common in Miami\'s holistic dental community than in most US cities. Ozone (O3) is used in biological dentistry for cavity treatment, gum disease management, and infection control, as it kills bacteria without antibiotics or chemicals. Miami\'s growing biological dentistry community has adopted ozone as a standard tool. Ask prospective Miami biological dentists whether they offer ozone therapy and for what conditions they apply it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost of holistic dental care in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Miami biological dental practices vary from affordable to premium pricing. Initial comprehensive exams typically run $200–$500 at biological dentistry practices. SMART amalgam removal is $300–$800 per tooth depending on size and complexity. Zirconia crowns run $1,200–$2,500 each. Miami\'s competitive dental market and large cash-pay international patient population mean pricing is often negotiable — ask about payment plans or package pricing for multiple restorations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do Miami holistic dentists accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some do, particularly for routine preventive care. Many Miami biological dentists operate as fee-for-service practices providing superbills for out-of-network reimbursement. Delta Dental, Cigna, and Aetna are the dominant Florida dental insurers — coverage for composite (vs amalgam) restorations depends on your specific plan. Florida Medicaid provides dental coverage for children and limited adult coverage, primarily for emergencies and extractions, not comprehensive biological dentistry.',
      },
    },
  ],
}

export const revalidate = 86400

export default async function BestHolisticDentistsMiamiPage() {
  const listings = await getListingsByCity('Miami', 'FL', 12).catch(() => [])
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
          <Link href="/dentists/miami-fl" className="hover:text-forest transition-colors">Holistic Dentists in Miami</Link>
          {' / '}
          <span className="text-gray-600">Best of Miami</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Miami, FL
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Miami's health-conscious, internationally-influenced culture has created strong demand for biological and holistic dentistry. Brickell, Coral Gables, and Aventura have concentrations of biological dental practices serving Miami's wellness-oriented population. The city's large Latin American immigrant community also drives demand for biocompatible, mercury-free dentistry, as biological dentistry has a longer history in some Latin American markets than in the US.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from IAOMT member search, IABDM directory, HDA public member data, and DataForSEO Google Maps. Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent practitioners actively marketing as biological or holistic dentists in the Miami metro.
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
            href="/dentists/miami-fl"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Miami &#x2192;
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
