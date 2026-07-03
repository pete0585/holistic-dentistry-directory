import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does a Holistic Dentist Cost? | HolisticDentalFinder.com',
  description:
    'Holistic dentistry typically costs 20–40% more than conventional dentistry. Here is a breakdown of costs by procedure, why the price difference exists, and how to reduce your out-of-pocket costs.',
  openGraph: {
    title: 'How Much Does a Holistic Dentist Cost?',
    description:
      'Holistic dentistry costs more than conventional dentistry — but not always by as much as patients expect. Here is the breakdown.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Why do holistic dentists charge more than conventional dentists?',
    a: 'Holistic dentists typically charge more for several reasons: biocompatible materials (composite resins, ceramic implants, zirconia crowns) cost more than their conventional counterparts (amalgam fillings, titanium implants); SMART-certified mercury removal protocols require specialized equipment, additional chair time, and safety supplies; many holistic dentists have additional training certifications (IAOMT, IABDM, biological dentistry programs); and many holistic practices run smaller volumes by design, not accepting PPO insurance contracts. The premium varies — some holistic dentists charge 15–20% more; others 40–60% more.',
  },
  {
    q: 'Does dental insurance cover holistic dentistry?',
    a: 'Standard dental insurance covers the procedure, not the philosophy. A composite (tooth-colored) filling is covered at the same rate as an amalgam filling for posterior teeth — some plans pay the difference; others require you to pay the upgrade cost. Ceramic implants may be covered at the same rate as titanium implants, or not covered because they are considered "alternative." Ozone therapy and other holistic-specific treatments are typically not covered. Many holistic dentists operate on a fee-for-service basis without insurance contracts — you pay upfront and submit for out-of-network reimbursement.',
  },
  {
    q: 'Can I use my HSA or FSA for holistic dental work?',
    a: 'Yes — dental procedures are eligible HSA/FSA expenses. This includes holistic procedures when they serve a dental treatment purpose (fillings, crowns, implants, root canal alternatives). Cosmetic procedures (teeth whitening for purely aesthetic reasons) are generally not eligible. If you are considering SMART mercury removal, ceramic implants, or ozone therapy for a real dental condition, these can typically be paid with your HSA or FSA. Use pre-tax dollars to offset the cost premium of biocompatible materials.',
  },
  {
    q: 'What is a SMART removal and how much does it cost?',
    a: 'SMART (Safe Mercury Amalgam Removal Technique) is the IAOMT-developed protocol for removing mercury amalgam fillings with maximum protection — rubber dam, sectioning (not drilling whole), high-volume evacuation, air filtration, and post-removal supplement support. SMART removal typically costs $200–$500 per filling (vs. $150–$250 for a standard filling replacement). A mouth with 6–8 amalgam fillings could run $1,200–$4,000 total for SMART removal. Not every holistic dentist charges the same rate — it varies significantly by location and practice.',
  },
  {
    q: 'Are ceramic implants more expensive than titanium?',
    a: 'Yes — ceramic (zirconia) implants typically cost 15–30% more than comparable titanium implants. A single titanium implant (implant + abutment + crown) costs $3,000–$5,000 in most US markets. A ceramic zirconia implant runs $3,500–$6,500. The higher cost reflects the material cost and fewer manufacturers of zirconia implants compared to titanium. Some patients find the higher cost worthwhile for metal-free biocompatibility or because they are metal-reactive; others choose titanium for its longer track record and lower cost.',
  },
]

COST_ROWS = [
  { proc: 'Composite filling (1 surface)', conventional: '$150–$250', holistic: '$175–$350' },
  { proc: 'SMART amalgam removal', conventional: 'N/A (standard removal $150–$250)', holistic: '$200–$500 per filling' },
  { proc: 'Zirconia crown', conventional: 'PFM crown $1,200–$1,800', holistic: '$1,500–$2,500' },
  { proc: 'Titanium implant (full)', conventional: '$3,000–$5,000', holistic: '$3,500–$5,500' },
  { proc: 'Ceramic (zirconia) implant', conventional: 'N/A at most conventional offices', holistic: '$3,500–$6,500' },
  { proc: 'Ozone therapy', conventional: 'Not offered', holistic: '$50–$150 per session' },
  { proc: 'Initial consultation', conventional: '$75–$200', holistic: '$100–$350 (often longer, more comprehensive)' },
]

export default function HolisticDentistCostPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          <span>/</span>
          <span>Holistic Dentist Cost</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            How Much Does a Holistic Dentist Cost?
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Holistic dentistry typically costs 20–40% more than conventional dentistry.
            Here is a breakdown of costs by procedure and how to manage the premium.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Cost Comparison: Holistic vs. Conventional</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest text-white">
                    <th className="text-left p-3 font-semibold">Procedure</th>
                    <th className="text-left p-3 font-semibold">Conventional</th>
                    <th className="text-left p-3 font-semibold">Holistic / Biological</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_ROWS.map((row, i) => (
                    <tr key={row.proc} className={i % 2 === 0 ? 'bg-white' : 'bg-ivory-dark/30'}>
                      <td className="p-3 font-medium text-gray-800">{row.proc}</td>
                      <td className="p-3 text-gray-600">{row.conventional}</td>
                      <td className="p-3 text-gray-600">{row.holistic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ways to Reduce Your Cost</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { tip: 'Use your HSA or FSA', detail: 'All dental procedures are eligible for HSA/FSA spending. Use pre-tax dollars to offset the holistic premium.' },
                { tip: 'Prioritize your treatment plan', detail: 'Not everything needs to be done at once. Work with your holistic dentist to identify what is urgent vs. what can wait.' },
                { tip: 'Check out-of-network benefits', detail: 'If you have dental insurance, submit claims for out-of-network reimbursement. Many plans pay 50–80% of the allowed amount.' },
                { tip: 'Ask about payment plans', detail: 'Many holistic dental offices offer CareCredit, Sunbit, or in-house payment plans for larger treatment plans.' },
              ].map((item) => (
                <div key={item.tip} className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="font-bold text-gray-800 mb-2">{item.tip}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            {FAQ.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </section>

          <div className="mt-12 bg-forest text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Find a Holistic Dentist Near You</h2>
            <p className="text-white/80 mb-6 text-sm">
              Browse IAOMT-certified and biological dentists by location. Filter for SMART-certified providers, ceramic implants, and mercury-free practices.
            </p>
            <Link
              href="/listings"
              className="inline-block bg-gold hover:bg-gold-light text-forest font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Find a Holistic Dentist <ArrowRight className="inline h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-biological-dentistry" className="text-sm text-forest hover:underline font-medium">What Is Biological Dentistry? →</Link>
              <Link href="/guides/iaomt-certified-dentist" className="text-sm text-forest hover:underline font-medium">IAOMT Certified Dentists →</Link>
              <Link href="/guides/ceramic-implants-vs-titanium" className="text-sm text-forest hover:underline font-medium">Ceramic vs. Titanium Implants →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
