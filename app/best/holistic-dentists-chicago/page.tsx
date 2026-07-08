import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Holistic Dentists in Chicago, IL | HolisticDentalFinder',
  description: 'Find the best biological, holistic, and mercury-safe dentists in Chicago, IL. IAOMT and IABDM-verified practitioners in Lincoln Park, Wicker Park, and across the Chicagoland metro.',
  openGraph: {
    title: 'Best Holistic Dentists in Chicago, IL | HolisticDentalFinder',
    description: 'Find the best biological, holistic, and mercury-safe dentists in Chicago, IL. IAOMT and IABDM-verified practitioners in Lincoln Park, Wicker Park, and across the Chicagoland metro.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/best/holistic-dentists-chicago' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Holistic Dentists in Chicago, IL',
  description: 'Verified biological, holistic, and mercury-safe dentists in Chicago, IL.',
  url: 'https://holisticdentalfinder.com/best/holistic-dentists-chicago',
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is IAOMT certification and why does it matter for Chicago biological dentists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IAOMT (International Academy of Oral Medicine and Toxicology) is the primary credentialing body for biological and mercury-safe dentistry. IAOMT members have completed specific training in safe amalgam removal protocols (SMART protocol), biocompatibility testing, and avoidance of toxic materials. In Chicago — where any dentist can market as \'holistic\' without specific training — IAOMT membership is the most verifiable marker of genuine biological dentistry training.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is SMART amalgam removal and which Chicago dentists offer it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SMART (Safe Mercury Amalgam Removal Technique) is the IAOMT protocol for removing mercury amalgam fillings without exposing patients or practitioners to elevated mercury vapor. It involves specific protective equipment, rubber dams, high-volume evacuation, and sectioning the amalgam rather than drilling it away whole. Biological dentists in Chicago who are IAOMT members perform SMART removal. Search this directory for Chicago dentists with the IAOMT or mercury-safe designation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do Chicago holistic dentists accept dental insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some do. The key variable is whether the practice is in-network with Delta Dental, Cigna Dental, Aetna, or other major Illinois insurers. Many biological dentists in Chicago operate as fee-for-service (cash-pay) practices, providing a superbill for out-of-network reimbursement. Routine preventive care — exams and cleanings — is the most consistently covered service. Ask the practice directly about their insurance relationship before scheduling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What materials do Chicago biological dentists use instead of amalgam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chicago biological dentists use composite resin (tooth-colored), ceramic (porcelain or zirconia), or glass ionomer fillings instead of mercury amalgam. Zirconia is used for crowns as an alternative to metal-ceramic or gold. Biocompatible implant surfaces (zirconia implants) are offered as alternatives to titanium. Some practices also test individual biocompatibility using serum reactivity testing (Clifford Materials Reactivity Testing) to select the most compatible materials for specific patients.',
      },
    },
  ],
}

export const revalidate = 86400

export default async function BestHolisticDentistsChicagoPage() {
  const listings = await getListingsByCity('Chicago', 'IL', 12).catch(() => [])
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
          <Link href="/dentists/chicago-il" className="hover:text-forest transition-colors">Holistic Dentists in Chicago</Link>
          {' / '}
          <span className="text-gray-600">Best of Chicago</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Best Holistic Dentists in Chicago, IL
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">
            Chicago's holistic dentistry market reflects the city's blend of conventional academic medicine and a growing integrative health community. Lincoln Park, Wicker Park, and the North Shore suburbs have clusters of biological and mercury-safe dental practices. Illinois does not separately regulate the 'holistic' or 'biological' dentist claim, so IAOMT or IABDM membership is the credential that matters when evaluating any Chicago practice.
          </p>
        </div>

        <div className="bg-ivory-dark/40 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-forest mb-3">How this list is compiled</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Listings are sourced from IAOMT member search, IABDM directory, HDA public member data, and DataForSEO Google Maps. Featured and Verified dentists — those who have claimed their profiles — appear first. All listings represent practitioners actively marketing as biological or holistic dentists in the Chicago metro area.
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
            href="/dentists/chicago-il"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            See all holistic dentists in Chicago &#x2192;
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
