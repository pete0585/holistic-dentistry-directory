'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Filter, X } from 'lucide-react'
import { STATE_NAMES } from '@/lib/utils'

const SPECIALTY_OPTIONS = [
  { value: 'mercury_removal', label: 'Mercury Amalgam Removal' },
  { value: 'smart_protocol', label: 'SMART Protocol' },
  { value: 'ozone_therapy', label: 'Ozone Therapy' },
  { value: 'ceramic_implants', label: 'Ceramic Implants' },
  { value: 'fluoride_free', label: 'Fluoride-Free' },
  { value: 'holistic_pediatric', label: 'Holistic Pediatric' },
  { value: 'biocompatibility_testing', label: 'Biocompatibility Testing' },
]

const CREDENTIAL_OPTIONS = [
  { value: 'iaomt_member', label: 'IAOMT Member' },
  { value: 'iaomt_accredited', label: 'IAOMT Accredited' },
  { value: 'iaomt_fellow', label: 'IAOMT Fellow' },
  { value: 'smart_certified', label: 'SMART Certified' },
  { value: 'iabdm_certified', label: 'IABDM Certified' },
  { value: 'hda_member', label: 'HDA Member' },
]

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentState = searchParams.get('state') ?? ''
  const currentSpecialty = searchParams.get('specialty') ?? ''
  const currentCredential = searchParams.get('credential') ?? ''
  const currentQ = searchParams.get('q') ?? ''

  const hasFilters = currentState || currentSpecialty || currentCredential

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/listings?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = useCallback(() => {
    const params = new URLSearchParams()
    if (currentQ) params.set('q', currentQ)
    router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }, [router, currentQ])

  return (
    <aside className="w-full">
      <div className="bg-white rounded-2xl border border-ivory-dark p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-forest flex items-center gap-2">
            <Filter className="w-4 h-4" aria-hidden="true" />
            Filter Results
          </h2>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-forest flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
            <select
              value={currentState}
              onChange={(e) => updateFilter('state', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-ivory-dark bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest"
            >
              <option value="">All States</option>
              {Object.entries(STATE_NAMES).sort(([,a],[,b]) => a.localeCompare(b)).map(([abbr, name]) => (
                <option key={abbr} value={abbr}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
            <div className="space-y-2">
              {SPECIALTY_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="specialty"
                    value={opt.value}
                    checked={currentSpecialty === opt.value}
                    onChange={(e) => updateFilter('specialty', e.target.checked ? opt.value : '')}
                    className="w-4 h-4 text-forest focus:ring-forest border-gray-300"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-forest transition-colors">
                    {opt.label}
                  </span>
                </label>
              ))}
              {currentSpecialty && (
                <button
                  onClick={() => updateFilter('specialty', '')}
                  className="text-xs text-gold-dark hover:text-gold mt-1"
                >
                  Clear specialty
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Credential / Association</label>
            <div className="space-y-2">
              {CREDENTIAL_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="credential"
                    value={opt.value}
                    checked={currentCredential === opt.value}
                    onChange={(e) => updateFilter('credential', e.target.checked ? opt.value : '')}
                    className="w-4 h-4 text-forest focus:ring-forest border-gray-300"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-forest transition-colors">
                    {opt.label}
                  </span>
                </label>
              ))}
              {currentCredential && (
                <button
                  onClick={() => updateFilter('credential', '')}
                  className="text-xs text-gold-dark hover:text-gold mt-1"
                >
                  Clear credential
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Type</label>
            <select
              value={searchParams.get('tier') ?? ''}
              onChange={(e) => updateFilter('tier', e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-ivory-dark bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest"
            >
              <option value="">All Listings</option>
              <option value="featured">Featured</option>
              <option value="verified">Verified</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  )
}
