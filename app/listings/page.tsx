import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FilterSidebar from '@/components/FilterSidebar'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/SearchBar'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find Holistic & Biological Dentists',
  description: 'Browse all holistic, biological, and mercury-safe dentists. Filter by specialty, credential, and location.',
}

interface PageProps {
  searchParams: Promise<{
    q?: string
    state?: string
    specialty?: string
    credential?: string
    tier?: string
    page?: string
  }>
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1', 10)

  const { listings, total } = await getListings({
    q: params.q,
    state: params.state,
    specialty: params.specialty,
    credential: params.credential,
    tier: params.tier,
    page,
  })

  const pageSize = 24
  const totalPages = Math.ceil(total / pageSize)

  const buildPageUrl = (p: number) => {
    const ps = new URLSearchParams()
    if (params.q) ps.set('q', params.q)
    if (params.state) ps.set('state', params.state)
    if (params.specialty) ps.set('specialty', params.specialty)
    if (params.credential) ps.set('credential', params.credential)
    if (params.tier) ps.set('tier', params.tier)
    ps.set('page', String(p))
    return `/listings?${ps.toString()}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-forest mb-4">
          {params.state ? `Holistic Dentists in ${params.state}` :
           params.q ? `Results for "${params.q}"` :
           'Find a Holistic or Biological Dentist'}
        </h1>
        <Suspense fallback={null}>
          <SearchBar showStateFilter={false} />
        </Suspense>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 flex-shrink-0">
          <Suspense fallback={null}>
            <FilterSidebar />
          </Suspense>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm">
              {total.toLocaleString()} dentist{total !== 1 ? 's' : ''} found
            </p>
            {totalPages > 1 && (
              <p className="text-gray-400 text-sm">Page {page} of {totalPages}</p>
            )}
          </div>

          {listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-ivory-dark">
              <p className="text-gray-500 mb-4">No dentists found matching your criteria.</p>
              <Link href="/listings" className="text-forest hover:text-forest-light font-medium transition-colors">
                Clear filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              {page > 1 && (
                <Link href={buildPageUrl(page - 1)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-ivory-dark bg-white hover:border-forest/30 text-sm font-medium text-forest transition-colors">
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous
                </Link>
              )}
              <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
              {page < totalPages && (
                <Link href={buildPageUrl(page + 1)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-ivory-dark bg-white hover:border-forest/30 text-sm font-medium text-forest transition-colors">
                  Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
