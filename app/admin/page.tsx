import type { Metadata } from 'next'
import { getAdminListings } from '@/lib/data'
import AdminTable from '@/components/AdminTable'

export const metadata: Metadata = {
  title: 'Admin — HolisticDentalFinder',
}

export default async function AdminPage() {
  const listings = await getAdminListings()
  const pending = listings.filter((l) => !l.is_approved).length
  const featured = listings.filter((l) => l.listing_tier === 'featured').length
  const verified = listings.filter((l) => l.listing_tier === 'verified').length
  const claimed = listings.filter((l) => l.claimed_at).length

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-forest mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Listings', value: listings.length },
          { label: 'Pending Approval', value: pending, highlight: pending > 0 },
          { label: 'Paying (Feat + Ver)', value: featured + verified },
          { label: 'Claimed', value: claimed },
        ].map(({ label, value, highlight }) => (
          <div key={label} className={`bg-white rounded-2xl border p-4 shadow-sm ${highlight ? 'border-amber-300' : 'border-ivory-dark'}`}>
            <div className={`text-3xl font-bold ${highlight ? 'text-amber-600' : 'text-forest'}`}>{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <AdminTable listings={listings} />
    </div>
  )
}
