'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { STATE_NAMES } from '@/lib/utils'

const schema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  practice_name: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State is required'),
  zip: z.string().optional(),
  address_line1: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Valid email required'),
  website: z.string().url('Valid URL required (include https://)').optional().or(z.literal('')),
  bio: z.string().max(1000, 'Bio must be under 1000 characters').optional(),
})

type FormData = z.infer<typeof schema>

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error ?? 'Submission failed')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-forest mb-2">Listing submitted!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Your listing is under review and will be approved within 24 hours. You&apos;ll receive a confirmation email once live.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('full_name')}
            placeholder="Dr. Jane Smith"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Practice Name</label>
          <input
            {...register('practice_name')}
            placeholder="Green Leaf Dental"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            City <span className="text-red-500">*</span>
          </label>
          <input
            {...register('city')}
            placeholder="Austin"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            State <span className="text-red-500">*</span>
          </label>
          <select
            {...register('state')}
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm bg-white"
          >
            <option value="">Select state</option>
            {Object.entries(STATE_NAMES).sort(([,a],[,b]) => a.localeCompare(b)).map(([abbr, name]) => (
              <option key={abbr} value={abbr}>{name}</option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
          <input
            {...register('address_line1')}
            placeholder="123 Main Street, Suite 100"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">ZIP Code</label>
          <input
            {...register('zip')}
            placeholder="78701"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="(512) 555-0100"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="doctor@practice.com"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website</label>
          <input
            {...register('website')}
            type="url"
            placeholder="https://www.yourpractice.com"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
          {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio (optional)</label>
          <textarea
            {...register('bio')}
            rows={4}
            placeholder="Tell patients about your philosophy, training, and approach to holistic dentistry..."
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm resize-none"
          />
          {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forest hover:bg-forest-light text-gold font-bold py-4 rounded-xl transition-colors text-base disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Submit Free Listing'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Free listings are reviewed and approved within 24 hours. Upgrade to Verified ($149/yr) for full profile visibility.
      </p>
    </form>
  )
}
