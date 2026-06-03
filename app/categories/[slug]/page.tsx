import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'
import { SPECIALTY_SLUGS, SPECIALTY_LABELS, SPECIALTY_DESCRIPTIONS } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_TITLES: Record<string, string> = {
  'mercury-removal': 'Mercury Amalgam Removal',
  'smart-protocol': 'SMART Protocol Dentists',
  'ozone-therapy': 'Ozone Therapy Dentists',
  'ceramic-implants': 'Ceramic Implant Dentists',
  'fluoride-free': 'Fluoride-Free Dentists',
  'biocompatibility-testing': 'Biocompatibility Testing',
  'holistic-pediatric': 'Holistic Pediatric Dentists',
  'tmj-treatment': 'TMJ Treatment Dentists',
  'sleep-dentistry': 'Sleep Dentistry',
  'cavitation': 'Cavitation Treatment Dentists',
  'oral-systemic': 'Oral-Systemic Health',
  'natural-whitening': 'Natural Whitening',
}

export async function generateStaticParams() {
  return Object.keys(SPECIALTY_SLUGS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const specialtyKey = SPECIALTY_SLUGS[slug]
  if (!specialtyKey) return {}

  const title = CATEGORY_TITLES[slug] ?? SPECIALTY_LABELS[specialtyKey]
  const description = SPECIALTY_DESCRIPTIONS[specialtyKey] ?? `Find holistic dentists specializing in ${title.toLowerCase()} near you.`

  return {
    title: `${title} — Find Holistic Dentists`,
    description,
    openGraph: { title: `${title} | HolisticDentalFinder`, description },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const specialtyKey = SPECIALTY_SLUGS[slug]
  if (!specialtyKey) notFound()

  const { listings, total } = await getListings({ specialty: specialtyKey, page: 1 })

  const title = CATEGORY_TITLES[slug] ?? SPECIALTY_LABELS[specialtyKey]
  const description = SPECIALTY_DESCRIPTIONS[specialtyKey] ?? ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${title} — HolisticDentalFinder`,
    description,
    url: `https://holisticdentalfinder.com/categories/${slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="text-sm text-gray-400 mb-2">
            <Link href="/" className="hover:text-forest transition-colors">Home</Link>
            {' / '}
            <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
            {' / '}
            <span className="text-gray-600">{title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-3">{title}</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">{description}</p>
          <p className="text-sm text-gray-400 mt-2">{total.toLocaleString()} dentists specializing in this treatment</p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-ivory-dark">
            <p className="text-gray-500 mb-4">No dentists found for this specialty yet.</p>
            <Link href="/listings" className="text-forest hover:text-forest-light font-medium">
              Browse all dentists
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {total > 24 && (
          <div className="mt-8 text-center">
            <Link
              href={`/listings?specialty=${specialtyKey}`}
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-gold font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              View all {total.toLocaleString()} dentists
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
