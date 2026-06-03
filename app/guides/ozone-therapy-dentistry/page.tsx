import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ozone Therapy in Dentistry: What It Is, What to Expect | HolisticDentalFinder',
  description: 'Ozone therapy treats cavities, gum disease, and post-surgical sites without drugs or harsh chemicals. Learn how it works and what to expect at a holistic dental office.',
  openGraph: {
    title: 'Ozone Therapy in Dentistry | HolisticDentalFinder',
    description: 'Ozone therapy treats cavities and gum disease without drugs or harsh chemicals. Learn what to expect.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ozone therapy in dentistry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ozone therapy uses medical-grade ozone (O3) — a supercharged form of oxygen with powerful antibacterial, antiviral, and antifungal properties — to treat oral conditions. In dentistry it\'s used to treat early cavities without drilling, disinfect gum pockets in periodontal disease, accelerate healing after extractions and implant surgeries, and reduce bacterial load before and during restorative procedures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can ozone therapy really treat cavities without drilling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For early-stage cavities (small lesions in enamel or the dentin-enamel junction that have not progressed to significant structural loss), yes. Ozone penetrates tooth structure and kills the bacteria causing decay, arresting progression. The tooth can then remineralize. For cavities that have progressed significantly or reached the pulp, ozone therapy can be an adjunct but drilling and restoration are still required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ozone therapy safe for dental use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, when applied by a trained practitioner using proper equipment and technique. Ozone is not inhaled by the patient — it\'s applied directly to the tooth surface, gum tissue, or gum pocket using a special delivery tip or ozonated water. The ozone concentration used is medical-grade, precisely dosed, and applied locally. No systemic exposure occurs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does ozone therapy cost at a dental office?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ozone therapy at a dental office typically costs $50–$150 per session, depending on the application and location. It\'s usually not covered by dental insurance as a stand-alone procedure, though the restorative work done alongside it may be covered. Some practices include ozone as part of their standard periodontal or preventive care at no additional charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions can ozone treat in dentistry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dental ozone therapy is used for: early cavity treatment (arresting decay without drilling), periodontal disease (disinfecting gum pockets), tooth sensitivity, root canal disinfection, post-extraction socket disinfection, implant site preparation, cold sores and aphthous ulcers, and pre-procedural oral disinfection to reduce bacterial load during restorative work.',
      },
    },
  ],
}

export default function OzoneTherapyDentistryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/categories/ozone-therapy" className="hover:text-forest transition-colors">Ozone Therapy Dentists</Link>
          {' / '}
          <span className="text-gray-600">What Is Ozone Therapy in Dentistry?</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4 leading-tight">
          Ozone Therapy in Dentistry: What It Is, What to Expect
        </h1>
        <p className="text-gray-500 text-sm mb-8">A guide to dental ozone therapy — applications, safety, and what the research shows</p>

        <div className="prose-guide">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Ozone therapy has been used in medicine for over 150 years. In dentistry, it&apos;s become one of the most clinically significant tools available to biological and holistic dentists — offering a non-toxic, drug-free approach to treating cavities, gum disease, and post-surgical sites that conventional dentistry can&apos;t match with antibiotics or drilling alone.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">How dental ozone therapy works</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ozone (O3) is a molecule made of three oxygen atoms. It&apos;s highly reactive — it oxidizes and destroys the cell membranes of bacteria, viruses, and fungi on contact. Because of this, it works as a powerful, broad-spectrum antimicrobial without antibiotics, without side effects, and without creating antibiotic resistance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In the dental office, ozone is delivered in three forms:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              { label: 'Gaseous ozone', desc: 'Delivered directly to a tooth surface or gum pocket through a small tip. Used for cavity treatment, tooth sensitivity, and gum disease.' },
              { label: 'Ozonated water', desc: 'Water infused with ozone used for rinsing, irrigation of gum pockets, and disinfecting the oral environment during procedures.' },
              { label: 'Ozonated oil', desc: 'Ozonated olive or coconut oil used topically for mucosal conditions, aphthous ulcers, and soft tissue healing.' },
            ].map(({ label, desc }) => (
              <li key={label} className="flex gap-3 text-gray-700">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <div><span className="font-semibold">{label}:</span> {desc}</div>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            The ozone is not inhaled by the patient — it&apos;s applied precisely with specialized equipment and immediately vacuumed or neutralized. Exposure is local, controlled, and brief.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">What conditions can ozone therapy treat?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { condition: 'Early cavities', desc: 'Ozone kills decay-causing bacteria and allows the tooth to remineralize — no drilling required for truly early lesions.' },
              { condition: 'Periodontal disease', desc: 'Delivered into gum pockets, ozone disinfects below the gumline where conventional instruments can\'t reach as effectively.' },
              { condition: 'Tooth sensitivity', desc: 'Ozone seals dentinal tubules and reduces sensitivity without harsh chemicals.' },
              { condition: 'Root canal disinfection', desc: 'Ozone gas penetrates the complex anatomy of root canal systems to kill residual bacteria where instruments miss.' },
              { condition: 'Post-extraction sites', desc: 'Ozonated water or gas disinfects the socket immediately after extraction, reducing dry socket risk and supporting healing.' },
              { condition: 'Cold sores and ulcers', desc: 'Ozonated oil applied topically reduces healing time for aphthous ulcers and oral herpes lesions.' },
              { condition: 'Pre-procedural rinse', desc: 'Ozonated water as a pre-treatment rinse reduces the overall bacterial load in the mouth before any restorative work.' },
              { condition: 'Implant preparation', desc: 'Disinfects the implant site before placement to reduce bacterial contamination and support osseointegration.' },
            ].map(({ condition, desc }) => (
              <div key={condition} className="bg-ivory-dark/50 rounded-xl p-4">
                <h3 className="font-semibold text-forest text-sm mb-1">{condition}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Can ozone therapy really treat cavities without drilling?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This is the most common question — and the most nuanced answer.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For early-stage cavities — lesions that are still in enamel or have just crossed into dentin without significant structural loss — ozone can arrest decay progression. It kills the bacteria causing the cavity, and with proper remineralization support (mineral varnishes, dietary changes, improved oral hygiene), the tooth can recover. Multiple peer-reviewed studies, including RCTs, have validated this for early pit-and-fissure and smooth-surface lesions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For cavities that have progressed significantly into dentin, reached the pulp, or caused structural damage, ozone is an adjunct — not a replacement for restorative work. The decay that&apos;s already there doesn&apos;t reverse; ozone prevents further progression and disinfects before restoration.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The practical implication: if you want to avoid drilling wherever possible, see a biological dentist who uses ozone as part of their diagnostic and preventive care. Caught early enough, cavities that would require drilling at a conventional practice may be manageable without it at a biological dental office.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">What to expect at an ozone therapy appointment</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ozone therapy in the dental office is painless and takes minutes. For cavity treatment:
          </p>
          <ol className="space-y-2 mb-6 text-gray-700 list-none">
            {[
              'The dentist identifies the lesion and confirms it\'s an appropriate candidate for ozone treatment (not too advanced)',
              'A small ozone delivery tip is placed over the lesion — this may feel slightly cool',
              'Medical-grade ozone gas is applied for 10–60 seconds depending on the lesion',
              'The area is suctioned to remove any residual ozone',
              'A remineralization agent (like fluoride-free hydroxyapatite or a mineral varnish) may be applied',
              'Follow-up appointment scheduled in 3–6 months to monitor remineralization',
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold font-bold shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Is ozone therapy safe for dental use?',
                a: 'Yes, when applied by a trained practitioner using proper equipment. The ozone is applied locally with specialized delivery tips and immediately evacuated — patients don\'t inhale it. No systemic exposure occurs.',
              },
              {
                q: 'How much does dental ozone therapy cost?',
                a: 'Typically $50–$150 per session. Usually not covered by dental insurance as a stand-alone procedure. Some practices include it as part of standard preventive or periodontal care.',
              },
              {
                q: 'Does every holistic dentist offer ozone therapy?',
                a: 'No. Ozone therapy requires specific equipment and training. Not all biological or holistic dentists have invested in ozone delivery systems. Use the filter on HolisticDentalFinder to find dentists who specifically list ozone therapy as a specialty.',
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
          <h2 className="text-xl font-bold text-gold mb-2">Find a dentist who offers ozone therapy</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Browse verified ozone therapy dentists across all 50 states. Filter by specialty to find practitioners who use ozone for cavities, periodontal disease, and more.
          </p>
          <Link
            href="/categories/ozone-therapy"
            className="inline-block bg-gold hover:bg-gold-light text-forest font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Find Ozone Therapy Dentists
          </Link>
        </div>
      </div>
    </>
  )
}
