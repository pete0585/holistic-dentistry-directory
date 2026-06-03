import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Find a SMART-Certified Dentist for Mercury Amalgam Removal | HolisticDentalFinder',
  description: 'SMART protocol is the safest way to remove mercury amalgam fillings. Learn what SMART certification means, why it matters, and how to find a certified dentist near you.',
  openGraph: {
    title: 'How to Find a SMART-Certified Dentist | HolisticDentalFinder',
    description: 'SMART protocol is the safest way to remove mercury amalgam fillings. Find a certified dentist near you.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SMART protocol for mercury amalgam removal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SMART stands for Safe Mercury Amalgam Removal Technique. It\'s a protocol developed by the International Academy of Oral Medicine and Toxicology (IAOMT) that uses a specific sequence of protective measures — rubber dam, sectioning the amalgam into large chunks rather than grinding it, high-volume evacuation, protective coverings, and supplemental oxygen or air filtration — to minimize mercury vapor exposure during amalgam removal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SMART protocol really necessary for amalgam removal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if you\'re concerned about mercury exposure. Conventional drilling of amalgam fillings generates very high levels of mercury vapor and fine particulate — the most dangerous way to remove them. SMART protocol can reduce mercury exposure by up to 95% compared to conventional removal. For patients with existing health conditions, sensitivities, or those undergoing heavy metal detox, SMART protocol is the responsible standard of care.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does SMART amalgam removal cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SMART amalgam removal typically costs $200–$500 per tooth, depending on the size of the filling and your location. Most insurance plans do not cover SMART-specific removal protocols. Total cost for a full-mouth removal (6–8 fillings) typically ranges from $1,200 to $4,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I do a detox protocol before or after SMART amalgam removal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This is a question for your biological dentist and ideally a functional medicine practitioner working alongside them. Common approaches include chlorella supplementation before removal (binds circulating mercury), avoiding chelation agents immediately before removal (can mobilize stored mercury), and post-removal support with chlorella, NAC, alpha lipoic acid, or other detox protocols. Consult a qualified practitioner — not all detox protocols are appropriate for all patients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I have all my amalgam fillings removed at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most biological dentists recommend removing amalgam fillings in quadrants — one section of the mouth at a time — rather than all at once. This reduces total mercury exposure in any single session and gives your body time to process between appointments. Your dentist will recommend an appropriate schedule based on your number of fillings and health status.',
      },
    },
  ],
}

export default function SmartProtocolGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">SMART Protocol & Mercury Amalgam Removal</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4 leading-tight">
          How to Find a SMART-Certified Dentist for Mercury Amalgam Removal
        </h1>
        <p className="text-gray-500 text-sm mb-8">What SMART certification means, why it matters, and how to find a certified dentist</p>

        <div className="prose-guide">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            If you have old silver (amalgam) fillings and you want them out, the way they&apos;re removed matters more than most people realize. Drilling into amalgam without protective protocols releases a surge of mercury vapor — exactly what you&apos;re trying to avoid. SMART protocol exists to change that.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">What SMART protocol actually involves</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SMART stands for Safe Mercury Amalgam Removal Technique. It was developed and is maintained by the International Academy of Oral Medicine and Toxicology (IAOMT) — the leading science-based biological dentistry organization in the world.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The protocol is not a marketing term. It&apos;s a specific, documented set of protective measures that dentists must complete training to use correctly:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'Rubber dam isolation to prevent amalgam particles from entering the throat',
              'Sectioning the filling into large chunks rather than grinding (grinding creates fine mercury vapor; chunking keeps it intact)',
              'High-volume evacuation system immediately adjacent to the working area',
              'Protective coverings for the patient\'s face, hair, and clothing',
              'Supplemental oxygen or air filtration to prevent inhalation of mercury vapor',
              'Use of a separate saliva ejector under the rubber dam',
              'Immediate cleanup of all amalgam particles after removal',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            IAOMT research shows SMART protocol can reduce mercury vapor exposure by up to 95% compared to conventional amalgam removal. For context: conventional drilling of amalgam produces mercury vapor levels that far exceed OSHA&apos;s permissible exposure limit for occupational settings.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Why it&apos;s worth finding a SMART-certified dentist specifically</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Many dentists will tell you they&apos;re &ldquo;mercury-free&rdquo; or that they can remove your amalgam fillings safely. Those claims may be sincere — but without SMART-specific training, a dentist may use only some protective measures, not the full protocol. Partial protection still exposes you to significant mercury vapor.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A dentist who is IAOMT-accredited, a Fellow, or a Master has completed specific coursework and demonstrated clinical competency in SMART removal. These credentials are the highest standard in the field.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you&apos;re searching for a dentist for amalgam removal, the credentials to prioritize:
          </p>
          <div className="space-y-3 mb-8">
            {[
              { label: 'IAOMT Accredited / Fellow / Master', desc: 'Has completed formal SMART training and demonstrated clinical competency. This is the gold standard.' },
              { label: 'IAOMT Member', desc: 'Has joined IAOMT and is exposed to SMART protocols but may not have completed formal accreditation training yet.' },
              { label: 'SMART Certified', desc: 'Has completed the IAOMT SMART-specific certification course — a good indicator for practitioners who focus on amalgam removal.' },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-ivory-dark/50 rounded-xl p-4">
                <span className="font-bold text-forest">{label}:</span>{' '}
                <span className="text-gray-600 text-sm">{desc}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Questions to ask before booking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Before scheduling mercury amalgam removal, ask the dental office directly:
          </p>
          <ul className="space-y-2 mb-6 text-gray-700">
            {[
              '"Do you follow SMART protocol for amalgam removal, or a similar mercury-safe protocol?"',
              '"Are you IAOMT-accredited or a Fellow/Master?"',
              '"Do you use a rubber dam and high-volume evacuation during removal?"',
              '"Do you section the amalgam into large chunks or drill it out?"',
              '"Do you provide supplemental oxygen or use an air purification system during the procedure?"',
              '"How many amalgam removal procedures do you complete per month?"',
            ].map((q, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span className="italic">{q}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            A dentist experienced with SMART removal will answer these questions confidently and specifically. Vague answers like &ldquo;we take precautions&rdquo; without specifics are a red flag.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">What to do before and after removal</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Biological dentists often recommend pre- and post-removal support protocols. These are not universal — what&apos;s appropriate depends on your health status. Common recommendations:
          </p>
          <ul className="space-y-2 mb-6 text-gray-700">
            {[
              'Chlorella before removal (some practitioners recommend it to bind circulating mercury)',
              'Avoiding aggressive chelation immediately before removal (can mobilize stored mercury)',
              'Post-removal: NAC, alpha lipoic acid, chlorella, or practitioner-directed detox support',
              'Eating high-fiber, antioxidant-rich foods in the days around removal',
              'Avoiding high-heat beverages and activities that increase mercury vapor release in the days before',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ideally, work with both a SMART-trained dentist and a functional medicine practitioner who can guide the full process. Don&apos;t rely solely on online protocols — individual health status matters significantly.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Is SMART protocol really necessary for amalgam removal?',
                a: 'Yes, if you\'re concerned about mercury exposure. Conventional drilling generates very high mercury vapor levels. SMART protocol reduces exposure by up to 95%. For patients with health conditions or those undergoing heavy metal detox, SMART is the responsible standard of care.',
              },
              {
                q: 'How much does SMART amalgam removal cost?',
                a: 'Typically $200–$500 per tooth, depending on filling size and location. Full-mouth removal (6–8 fillings) ranges from $1,200 to $4,000. Most insurance plans do not cover SMART-specific protocols.',
              },
              {
                q: 'Can I have all my amalgam fillings removed at once?',
                a: 'Most biological dentists recommend removing by quadrant — one section at a time — to reduce total mercury exposure per session and give your body time to process between appointments.',
              },
              {
                q: 'Should I do a detox protocol before or after SMART removal?',
                a: 'Consult your biological dentist and a functional medicine practitioner. Common approaches include chlorella before removal and NAC/ALA/chlorella post-removal, but what\'s appropriate depends on your individual health status.',
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
          <h2 className="text-xl font-bold text-gold mb-2">Find a SMART-certified dentist near you</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Browse verified IAOMT-trained and SMART-certified dentists across all 50 states. Filter by credential level to find the highest-qualified practitioners in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/categories/smart-protocol"
              className="bg-gold hover:bg-gold-light text-forest font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Find SMART Protocol Dentists
            </Link>
            <Link
              href="/listings"
              className="border-2 border-gold text-gold hover:bg-gold/10 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Browse All Dentists
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
