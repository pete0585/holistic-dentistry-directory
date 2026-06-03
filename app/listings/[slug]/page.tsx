import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ListingDetail from '@/components/ListingDetail'
import { getListingBySlug, getAllSlugs } from '@/lib/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.slice(0, 200).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return {}

  const title = listing.practice_name
    ? `${listing.full_name} — ${listing.practice_name} | ${listing.city}, ${listing.state}`
    : `${listing.full_name} | Holistic Dentist in ${listing.city}, ${listing.state}`

  const description = listing.bio
    ? listing.bio.slice(0, 160)
    : `${listing.full_name} is a ${listing.listing_tier !== 'free' ? 'verified ' : ''}holistic and biological dentist in ${listing.city}, ${listing.state}. ${listing.smart_certified ? 'SMART certified. ' : ''}${listing.no_amalgam ? 'Mercury-free. ' : ''}${listing.accepting_new_patients ? 'Accepting new patients.' : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness', 'MedicalBusiness'],
    name: listing.practice_name ?? listing.full_name,
    description: listing.bio ?? undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip ?? undefined,
      streetAddress: listing.address_line1 ?? undefined,
    },
    telephone: listing.phone ?? undefined,
    url: listing.website ?? undefined,
    ...(listing.latitude && listing.longitude ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.latitude,
        longitude: listing.longitude,
      }
    } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetail listing={listing} />
    </>
  )
}
