'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

interface SearchBarProps {
  className?: string
  placeholder?: string
  showStateFilter?: boolean
}

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

export default function SearchBar({ className = '', placeholder = 'Search by name, city, or practice...', showStateFilter = true }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [state, setState] = useState(searchParams.get('state') ?? '')

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (state) params.set('state', state)
    router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }, [query, state, router])

  return (
    <form onSubmit={handleSearch} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/50 w-5 h-5" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-ivory-dark bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent text-base shadow-sm"
        />
      </div>
      {showStateFilter && (
        <div className="relative sm:w-44">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/50 w-5 h-5" aria-hidden="true" />
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-ivory-dark bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent text-base shadow-sm appearance-none cursor-pointer"
          >
            <option value="">Any State</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
      <button
        type="submit"
        className="bg-forest hover:bg-forest-light text-gold font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-sm whitespace-nowrap"
      >
        Find Dentists
      </button>
    </form>
  )
}
