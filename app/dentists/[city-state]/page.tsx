import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'
import { STATE_NAMES } from '@/lib/utils'

interface PageProps {
  params: Promise<{ 'city-state': string }>
}

const CITY_DATA: Record<string, { city: string; state: string; intro: string }> = {
  'los-angeles-ca': {
    city: 'Los Angeles',
    state: 'CA',
    intro: 'Los Angeles has one of the highest concentrations of biological and holistic dentists in the country, driven by the city\'s health-conscious culture and strong demand for mercury-free and fluoride-free dental care.',
  },
  'san-diego-ca': {
    city: 'San Diego',
    state: 'CA',
    intro: 'San Diego\'s wellness-forward community has made it a hub for biological dentistry, with a strong cluster of practitioners offering SMART protocol mercury removal, ozone therapy, and biocompatible materials.',
  },
  'san-francisco-ca': {
    city: 'San Francisco',
    state: 'CA',
    intro: 'San Francisco is home to a growing number of biological and holistic dental practices, reflecting the Bay Area\'s longstanding interest in integrative health and non-toxic living.',
  },
  'denver-co': {
    city: 'Denver',
    state: 'CO',
    intro: 'Denver\'s active, health-first population supports a robust community of holistic dentists — many offering mercury-safe amalgam removal, ceramic implants, and ozone therapy to patients who treat oral health as part of their whole-body wellness.',
  },
  'austin-tx': {
    city: 'Austin',
    state: 'TX',
    intro: 'Austin\'s biohacking and functional medicine culture has attracted a strong cohort of biological dentists offering mercury amalgam removal using SMART protocol, ceramic implants, and fluoride-free care.',
  },
  'seattle-wa': {
    city: 'Seattle',
    state: 'WA',
    intro: 'Seattle\'s health-conscious residents have made it one of the top Pacific Northwest cities for biological dentistry, with practices across the metro offering mercury-free fillings, ozone therapy, and biocompatibility testing.',
  },
  'portland-or': {
    city: 'Portland',
    state: 'OR',
    intro: 'Portland has a well-established community of holistic and biological dentists, consistent with the city\'s broader natural health ethos — including practices specializing in safe mercury amalgam removal and fluoride-free care for adults and children.',
  },
  'chicago-il': {
    city: 'Chicago',
    state: 'IL',
    intro: 'Chicago\'s large metro area includes a growing number of biological dentists offering the full spectrum of non-toxic dental care, from SMART protocol mercury removal to zirconia ceramic implants.',
  },
  'new-york-ny': {
    city: 'New York',
    state: 'NY',
    intro: 'New York City has a select group of top-rated biological and holistic dentists serving patients who want mercury-free, fluoride-free, and biocompatible dental care in one of the world\'s most competitive health markets.',
  },
  'miami-fl': {
    city: 'Miami',
    state: 'FL',
    intro: 'Miami\'s health-oriented population supports an active holistic dentistry community, with practitioners offering non-toxic dental care, ceramic implants, and ozone therapy across the metro area.',
  },
  'atlanta-ga': {
    city: 'Atlanta',
    state: 'GA',
    intro: 'Atlanta has a growing cluster of biological and holistic dental practices, with IAOMT and HDA-affiliated dentists offering mercury-safe care to a health-conscious patient base across the metro region.',
  },
  'charlotte-nc': {
    city: 'Charlotte',
    state: 'NC',
    intro: 'Charlotte\'s expanding healthcare community includes holistic dentists focused on biocompatible materials, mercury removal, and whole-body dental wellness for patients seeking an alternative to conventional dentistry.',
  },
  'asheville-nc': {
    city: 'Asheville',
    state: 'NC',
    intro: 'Asheville\'s strong wellness culture has made it one of the most concentrated markets for holistic dentistry in the Southeast, with practices offering fluoride-free care, ozone therapy, and SMART protocol amalgam removal.',
  },
  'nashville-tn': {
    city: 'Nashville',
    state: 'TN',
    intro: 'Nashville\'s growing health-conscious community supports holistic dental practices offering mercury-safe care, ceramic implants, and biological dentistry for patients who want whole-body alignment in their dental care.',
  },
  'minneapolis-mn': {
    city: 'Minneapolis',
    state: 'MN',
    intro: 'Minneapolis has a solid community of biological dentists drawing from the Twin Cities\' health-forward population, offering mercury amalgam removal, ozone dentistry, and biocompatible treatment approaches.',
  },
  'philadelphia-pa': {
    city: 'Philadelphia',
    state: 'PA',
    intro: 'Philadelphia offers access to a number of biological and holistic dental practices serving patients who want mercury-free, fluoride-free, and integrative dental care in the greater Pennsylvania region.',
  },
  'phoenix-az': {
    city: 'Phoenix',
    state: 'AZ',
    intro: 'Phoenix and the greater Scottsdale metro area have become a significant hub for holistic dentistry in the Southwest, with practices across the Valley offering mercury-safe removal, ceramic implants, and ozone therapy.',
  },
  'dallas-tx': {
    city: 'Dallas',
    state: 'TX',
    intro: 'Dallas has a growing number of biological dentists serving the DFW metroplex, offering mercury amalgam removal, fluoride-free care, and biocompatible treatment options for health-conscious patients.',
  },
  'salt-lake-city-ut': {
    city: 'Salt Lake City',
    state: 'UT',
    intro: 'Salt Lake City\'s health-oriented population supports a solid community of biological and holistic dentists offering mercury-safe care, ozone therapy, and natural dental approaches.',
  },
  'boston-ma': {
    city: 'Boston',
    state: 'MA',
    intro: 'Boston\'s medically sophisticated patient base includes a growing demand for biological dentistry, with practitioners offering SMART protocol amalgam removal, biocompatibility testing, and ceramic implants.',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'city-state': cityState } = await params
  const data = CITY_DATA[cityState]
  if (!data) return {}

  const stateName = STATE_NAMES[data.state] ?? data.state
  return {
    title: `Holistic Dentists in ${data.city}, ${stateName} | Find Biological & Mercury-Safe Dentists`,
    description: `Find verified holistic, biological, and mercury-safe dentists in ${data.city}, ${stateName}. Filter by SMART certified, IAOMT member, ozone therapy, ceramic implants, and more.`,
    openGraph: {
      title: `Holistic Dentists in ${data.city}, ${stateName} | HolisticDentalFinder`,
      description: `Find biological and mercury-safe dentists in ${data.city}, ${stateName}.`,
    },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { 'city-state': cityState } = await params
  const cityData = CITY_DATA[cityState]
  if (!cityData) notFound()

  const { city, state, intro } = cityData
  const stateName = STATE_NAMES[state] ?? state
  const listings = await getListingsByCity(city, state)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many holistic dentists are in ${city}, ${stateName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `HolisticDentalFinder currently lists ${listings.length}+ verified holistic, biological, and mercury-safe dentists in ${city}, ${stateName}. New listings are added regularly as more practitioners join the directory.`,
        },
      },
      {
        '@type': 'Question',
        name: `What should I look for in a holistic dentist in ${city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Look for dentists who are IAOMT members, IABDM certified, or HDA members. Key indicators: they don\'t place new amalgam fillings, offer SMART protocol for safe mercury removal, use ozone therapy, discuss biocompatible materials, and take an oral-systemic approach to your overall health.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do holistic dentists take insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many holistic and biological dentists accept insurance for standard procedures, though some are fee-for-service practices. Always call ahead to verify coverage. Many patients find the long-term health benefits worth paying out of pocket for specific procedures like SMART amalgam removal.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a holistic dentist and a biological dentist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The terms are often used interchangeably, but "biological dentist" typically refers to practitioners trained through IAOMT or IABDM who focus on biocompatible materials and the oral-systemic health connection. "Holistic dentist" is a broader term that may include these practitioners plus those who emphasize natural approaches without formal association credentials.',
        },
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://holisticdentalfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Find a Dentist', item: 'https://holisticdentalfinder.com/listings' },
      { '@type': 'ListItem', position: 3, name: `${city}, ${stateName}`, item: `https://holisticdentalfinder.com/dentists/${cityState}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Find a Dentist</Link>
          {' / '}
          <span className="text-gray-600">{city}, {stateName}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-3">
            Holistic Dentists in {city}, {stateName}
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">{intro}</p>
          {listings.length > 0 && (
            <p className="text-sm text-gold-dark font-medium mt-3">
              {listings.length}+ biological and mercury-safe dentists found in {city}
            </p>
          )}
        </div>

        {/* Listings */}
        {listings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-ivory-dark">
            <p className="text-gray-500 mb-2">No verified listings in {city} yet.</p>
            <p className="text-sm text-gray-400 mb-6">New dentists are added daily — check back soon or browse nearby cities.</p>
            <Link href="/listings" className="text-forest hover:text-forest-light font-medium">
              Browse all dentists →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {listings.length > 0 && (
          <div className="text-center mb-12">
            <Link
              href={`/listings?state=${state}&q=${encodeURIComponent(city)}`}
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              See all holistic dentists in {city}
            </Link>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-ivory-dark/40 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-forest mb-6">
            Frequently Asked Questions — Holistic Dentists in {city}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-forest mb-2">
                How many holistic dentists are in {city}, {stateName}?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                HolisticDentalFinder currently lists {listings.length}+ verified holistic, biological, and mercury-safe dentists in {city}, {stateName}. New listings are added regularly as more practitioners join the directory.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-forest mb-2">
                What should I look for in a holistic dentist in {city}?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Look for dentists who are IAOMT members, IABDM certified, or HDA members. Key indicators: they don&apos;t place new amalgam fillings, offer SMART protocol for safe mercury removal, use ozone therapy, discuss biocompatible materials, and take an oral-systemic approach to your overall health.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-forest mb-2">
                Do holistic dentists in {city} take insurance?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Many holistic and biological dentists accept insurance for standard procedures, though some are fee-for-service practices. Always call ahead to verify coverage. Many patients find the long-term health benefits worth paying out of pocket for specific procedures like SMART amalgam removal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-forest mb-2">
                What is the difference between a holistic dentist and a biological dentist?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The terms are often used interchangeably, but &ldquo;biological dentist&rdquo; typically refers to practitioners trained through IAOMT or IABDM who focus on biocompatible materials and the oral-systemic health connection. &ldquo;Holistic dentist&rdquo; is a broader term that may include these practitioners plus those who emphasize natural approaches without formal association credentials.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Are you a holistic dentist in {city}?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Your practice may already be listed. Claim your free profile to add your credentials, specialties, bio, and contact form — and start appearing where patients in {city} are searching.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/listings"
              className="bg-gold hover:bg-gold-light text-forest font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Find Your Listing
            </Link>
            <Link
              href="/submit"
              className="border-2 border-gold text-gold hover:bg-gold/10 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Add Your Practice Free
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
