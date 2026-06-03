import type { Metadata } from 'next'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Add Your Practice — Free Listing',
  description: 'List your holistic, biological, or mercury-safe dental practice on HolisticDentalFinder. Free to list. Upgrade to Verified for $149/year.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-3">Add Your Practice</h1>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
          List your holistic or biological dental practice for free. Upgrade to{' '}
          <strong className="text-forest">Verified ($149/yr)</strong> or{' '}
          <strong className="text-gold-dark">Featured ($299/yr)</strong> for full profile visibility and priority placement.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6 sm:p-8">
        <SubmitForm />
      </div>

      <div className="mt-8 bg-forest/5 border border-forest/20 rounded-2xl p-6">
        <h2 className="font-bold text-forest text-lg mb-3">Why list on HolisticDentalFinder?</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            'The only directory aggregating IAOMT, IABDM, and HDA members plus non-affiliated dentists',
            'Patients searching "holistic dentist near me" (22,200/mo) find you through city-level SEO pages',
            'A single new patient is worth $2,000–$15,000 — free listings are worth claiming',
            'Credential badges (SMART certified, IAOMT Fellow, IABDM Certified) build instant trust',
            'Contact form routes appointment requests directly to your practice',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-forest font-bold mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
