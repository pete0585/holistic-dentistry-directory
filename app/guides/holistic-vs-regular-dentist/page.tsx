import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Holistic Dentist vs. Regular Dentist: What\'s the Difference? | HolisticDentalFinder',
  description: 'Holistic and conventional dentists both treat teeth, but their approaches to materials, toxins, and systemic health are fundamentally different. Here\'s what to know.',
  openGraph: {
    title: 'Holistic Dentist vs. Regular Dentist | HolisticDentalFinder',
    description: 'Holistic and conventional dentists treat teeth differently. Here\'s what sets biological dentists apart.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the main difference between a holistic dentist and a regular dentist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The core difference is philosophy. Conventional dentists treat oral health as a local, isolated system. Holistic/biological dentists treat the mouth as part of the whole body — considering how dental materials affect systemic health, how oral bacteria relate to cardiovascular and metabolic disease, and how dental procedures can minimize toxic exposure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do holistic dentists have the same training as regular dentists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Holistic and biological dentists complete the same dental school training (DDS or DMD degree) as conventional dentists. The difference is postgraduate training and philosophy: biological dentists pursue additional training through organizations like IAOMT and IABDM and make clinical decisions that prioritize biocompatible materials and systemic health considerations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are holistic dentists more expensive than regular dentists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sometimes, yes — particularly for specific procedures like SMART amalgam removal, ceramic implants (vs. titanium), or biocompatibility testing that aren\'t covered by insurance. Routine exams and cleanings at a holistic dental practice are usually priced comparably to conventional dentistry. Many biological dentists are fee-for-service practices.',
      },
    },
    {
      '@type': 'Question',
      name: 'What materials do holistic dentists use instead of mercury amalgam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BPA-free composite resins for fillings, ceramic (zirconia) for crowns and implants, glass ionomer cement in some situations, and ozone therapy to treat early cavities without drilling. For implants, zirconia is the primary mercury-free alternative to titanium — it\'s metal-free and biocompatible for patients with metal sensitivities.',
      },
    },
  ],
}

const COMPARISON_ROWS = [
  {
    aspect: 'Fillings',
    conventional: 'Mercury amalgam (50% mercury by weight) is still placed in some practices',
    holistic: 'Composite, ceramic, or glass ionomer only — never mercury amalgam',
  },
  {
    aspect: 'Amalgam removal',
    conventional: 'Standard drilling — no specific mercury precautions',
    holistic: 'SMART protocol: rubber dam, sectioning, high-volume evacuation, protective coverings',
  },
  {
    aspect: 'Fluoride',
    conventional: 'Standard fluoride treatments and fluoridated water viewed as safe and beneficial',
    holistic: 'Fluoride-free options offered; many practitioners use remineralization alternatives',
  },
  {
    aspect: 'Implants',
    conventional: 'Titanium implants as the standard',
    holistic: 'Ceramic/zirconia implants offered as a metal-free biocompatible alternative',
  },
  {
    aspect: 'Root canals',
    conventional: 'Standard procedure to save infected teeth',
    holistic: 'Concerns about residual bacteria and anaerobic infection; extraction + implant sometimes preferred; cavitation evaluation offered',
  },
  {
    aspect: 'Materials testing',
    conventional: 'Not offered',
    holistic: 'Biocompatibility testing (Clifford or Biocomp Labs) before selecting materials for sensitive patients',
  },
  {
    aspect: 'Systemic view',
    conventional: 'Oral health treated as a local, isolated system',
    holistic: 'Oral health viewed as connected to cardiovascular, metabolic, immune, and neurological health',
  },
  {
    aspect: 'Cavity treatment',
    conventional: 'Drill and fill at standard decay thresholds',
    holistic: 'Ozone therapy for early cavities; minimally invasive; remineralization protocols before drilling',
  },
  {
    aspect: 'X-rays',
    conventional: 'Standard dental X-rays (bitewings, panoramic)',
    holistic: 'CBCT (3D imaging) used for cavitation diagnosis; some practices use digital X-rays to minimize radiation',
  },
]

export default function HolisticVsRegularDentistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">Holistic vs. Regular Dentist</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4 leading-tight">
          Holistic Dentist vs. Regular Dentist: What&apos;s the Difference?
        </h1>
        <p className="text-gray-500 text-sm mb-8">A practical breakdown of how biological and conventional dentistry differ in materials, approach, and philosophy</p>

        <div className="prose-guide">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Both types of dentists went to dental school. Both can clean your teeth, fill a cavity, and fit a crown. The difference is what they&apos;ll fill it with, how they remove old fillings, what they think fluoride does, and whether they consider that what they put in your mouth ends up in the rest of your body.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-6">Side-by-side comparison</h2>

          <div className="overflow-x-auto -mx-4 sm:mx-0 mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-forest text-white">
                  <th className="text-left p-3 font-semibold rounded-tl-lg">Aspect</th>
                  <th className="text-left p-3 font-semibold">Conventional Dentist</th>
                  <th className="text-left p-3 font-semibold rounded-tr-lg">Holistic / Biological Dentist</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? 'bg-ivory-dark/40' : 'bg-white'}>
                    <td className="p-3 font-semibold text-forest align-top">{row.aspect}</td>
                    <td className="p-3 text-gray-600 align-top">{row.conventional}</td>
                    <td className="p-3 text-gray-700 align-top">{row.holistic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Do holistic dentists have the same training?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Yes — biological and holistic dentists complete the same DDS or DMD dental school training as any other dentist. They pass the same licensing exams and are held to the same standard of care by state dental boards.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The difference is postgraduate philosophy and continuing education. Dentists who pursue IAOMT, IABDM, or HDA credentials complete additional coursework in mercury toxicology, biocompatible materials, oral-systemic medicine, and clinical protocols like SMART. This isn&apos;t alternative medicine — it&apos;s applying current science to clinical decision-making.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">When does it matter which type you see?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a routine cleaning from a healthy mouth, the distinction matters less. For these situations, a biological dentist is specifically worth seeking:
          </p>
          <ul className="space-y-2 mb-6 text-gray-700">
            {[
              'You have mercury amalgam fillings and want them removed — unsafe removal creates significant mercury exposure',
              'You\'re getting implants and want to avoid titanium for biocompatibility or sensitivity reasons',
              'You have chronic illness, autoimmune conditions, or unexplained symptoms linked to dental work',
              'You\'re pregnant or planning to become pregnant and want to minimize toxic dental exposures',
              'You want fluoride-free care for yourself or your children',
              'You\'re planning major restorative work (multiple crowns, full mouth reconstruction) and want biocompatible materials throughout',
              'You suspect cavitations or other structural dental issues contributing to health problems',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Are holistic dentists more expensive?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Routine exams and cleanings are usually priced comparably to conventional dentistry. Specific biological procedures cost more because they involve additional materials, time, and equipment:
          </p>
          <ul className="space-y-2 mb-6 text-gray-700">
            {[
              'SMART amalgam removal: $200–$500/tooth vs. ~$50–$150 for conventional removal',
              'Ceramic/zirconia implants: $3,000–$6,000 per implant vs. $1,500–$3,000 for titanium',
              'Ozone therapy: $50–$150/session (often not covered by insurance)',
              'Biocompatibility testing: $200–$400 (Clifford or Biocomp Labs test)',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Many biological dentists are fee-for-service practices. Insurance may still cover standard procedures (fillings, cleanings, X-rays) even at a holistic office — call to verify coverage before booking.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Do holistic dentists vaccinate or recommend fluoride to children?',
                a: 'Holistic dentists vary in their positions. Most will provide fluoride-free care on request and won\'t apply fluoride treatments without your consent. Some strongly advise against fluoride; others take a nuanced position. Ask the specific practice about their policy on fluoride for pediatric patients before booking.',
              },
              {
                q: 'What materials do holistic dentists use instead of mercury amalgam?',
                a: 'BPA-free composite resins for fillings, ceramic (zirconia) for crowns and implants, and ozone therapy to treat early cavities without drilling. For implants, zirconia is the primary mercury-free alternative — it\'s metal-free and highly biocompatible.',
              },
              {
                q: 'Can I find a holistic dentist who takes my insurance?',
                a: 'Some do, some don\'t. Many biological dental practices are fee-for-service. Search the directory and filter by your area — then call the practices that appear to ask about insurance acceptance.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-t border-ivory-dark pt-5">
                <h3 className="font-semibold text-forest mb-2">{q}</h3>
                <p className="text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Ready to find a holistic dentist?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Browse 1,300+ verified biological and holistic dentists across all 50 states. Filter by SMART certified, ozone therapy, ceramic implants, and more.
          </p>
          <Link
            href="/listings"
            className="inline-block bg-gold hover:bg-gold-light text-forest font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Find a Holistic Dentist
          </Link>
        </div>
      </div>
    </>
  )
}
