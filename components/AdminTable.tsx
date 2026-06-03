'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import type { Listing } from '@/lib/types'

interface AdminTableProps {
  listings: Listing[]
}

export default function AdminTable({ listings }: AdminTableProps) {
  const [items, setItems] = useState(listings)
  const [loading, setLoading] = useState<string | null>(null)

  const handleApprove = async (id: string, approved: boolean) => {
    setLoading(id)
    try {
      await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: id, approved }),
      })
      setItems((prev) => prev.map((l) => l.id === id ? { ...l, is_approved: approved } : l))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-ivory-dark shadow-sm">
      <table className="w-full text-sm bg-white">
        <thead>
          <tr className="bg-forest text-gold">
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Location</th>
            <th className="px-4 py-3 text-left font-semibold">Tier</th>
            <th className="px-4 py-3 text-left font-semibold">Source</th>
            <th className="px-4 py-3 text-left font-semibold">Status</th>
            <th className="px-4 py-3 text-left font-semibold">Claimed</th>
            <th className="px-4 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-dark">
          {items.map((listing) => (
            <tr key={listing.id} className={`hover:bg-ivory transition-colors ${!listing.is_approved ? 'bg-amber-50' : ''}`}>
              <td className="px-4 py-3">
                <div className="font-medium text-forest">{listing.full_name}</div>
                {listing.practice_name && <div className="text-gray-400 text-xs">{listing.practice_name}</div>}
              </td>
              <td className="px-4 py-3 text-gray-600">{listing.city}, {listing.state}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  listing.listing_tier === 'featured' ? 'bg-gold text-forest-dark' :
                  listing.listing_tier === 'verified' ? 'bg-forest text-gold' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {listing.listing_tier}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500 capitalize">{listing.source ?? '—'}</td>
              <td className="px-4 py-3">
                {listing.is_approved ? (
                  <span className="text-emerald-600 flex items-center gap-1 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> Approved
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-1 text-xs font-medium">
                    <XCircle className="w-3.5 h-3.5" aria-hidden="true" /> Pending
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {listing.claimed_at ? new Date(listing.claimed_at).toLocaleDateString() : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`/listings/${listing.slug}`}
                    target="_blank"
                    className="text-forest hover:text-forest-light"
                    aria-label="View listing"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  {!listing.is_approved ? (
                    <button
                      onClick={() => handleApprove(listing.id, true)}
                      disabled={loading === listing.id}
                      className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-2.5 py-1 rounded-lg transition-colors disabled:opacity-60"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(listing.id, false)}
                      disabled={loading === listing.id}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2.5 py-1 rounded-lg transition-colors disabled:opacity-60"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-400">No listings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
