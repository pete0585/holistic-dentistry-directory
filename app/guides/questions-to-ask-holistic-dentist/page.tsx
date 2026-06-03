import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '12 Questions to Ask a Holistic Dentist Before Your First Visit | HolisticDentalFinder',
  description: 'Before booking your first appointment with a biological or holistic dentist, ask these questions to verify their credentials, protocols, and approach to non-toxic dental care.',
  openGraph: {
    title: '12 Questions to Ask a Holistic Dentist | HolisticDentalFinder',
    description: 'Verify credentials and protocols before booking your first appointment with a biological dentist.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What questions should I ask a holistic dentist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key questions: Are you IAOMT or IABDM credentialed? Do you use SMART protocol for amalgam removal? What filling materials do you use? Do you offer fluoride-free care? Do you offer ceramic/zirconia implants? Do you perform biocompatibility testing? How do you handle root canals? Do you evaluate for cavitations? What is your approach to ozone therapy? These questions reveal whether a dentist who calls themselves "holistic" is actually trained in biological dentistry protocols.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if a holistic dentist is legitimate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Look for verifiable credentials: IAOMT Member/Accredited/Fellow/Master, IABDM Certified, or HDA Member. These are real organizations with real training requirements. A dentist who uses the word "holistic" without any of these credentials may simply be marketing to health-conscious patients without the specific training in mercury toxicology, biocompatible materials, or SMART protocol.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I bring to my first holistic dentist appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bring: your full health history (including supplements, medications, and chronic conditions), a list of any previous dental work (especially amalgam fillings, root canals, or implants), any previous X-rays if transferring from another practice, and specific questions about your concerns. If you\'re considering amalgam removal, come prepared to discuss the SMART protocol and a removal schedule.',
      },
    },
  ],
}

const QUESTIONS = [
  {
    number: '01',
    question: 'Are you IAOMT or IABDM credentialed?',
    why: 'This is the single most important question. IAOMT and IABDM credentials represent verifiable training in mercury toxicology, biocompatible materials, and biological dentistry protocols — not just a marketing label. Ask specifically: are you an IAOMT Member, Accredited, Fellow, or Master? IABDM Certified? HDA Member?',
  },
  {
    number: '02',
    question: 'Do you use SMART protocol for amalgam removal?',
    why: 'Any dentist offering amalgam removal should be using SMART protocol or a comparable mercury-safe removal technique. Ask specifically: do you use a rubber dam? Do you section the filling into chunks rather than grinding? Do you use high-volume evacuation? Vague answers are a red flag.',
  },
  {
    number: '03',
    question: 'What filling materials do you use?',
    why: 'Holistic dentists should use BPA-free composite resins, not mercury amalgam. Ask whether the composite resins they use are BPA-free — some "tooth-colored" fillings still contain BPA.',
  },
  {
    number: '04',
    question: 'Do you offer fluoride-free care?',
    why: 'If you want to avoid fluoride, confirm that the practice will accommodate this without pressure to use fluoride treatments. Some practices use remineralization alternatives like hydroxyapatite toothpaste or ozone therapy.',
  },
  {
    number: '05',
    question: 'Do you offer ceramic or zirconia implants?',
    why: 'If you\'re considering implants, zirconia is the metal-free, biocompatible alternative to titanium. Not all holistic dentists offer zirconia implants — some refer to specialists. Confirm before booking if implants are part of your treatment plan.',
  },
  {
    number: '06',
    question: 'Do you offer biocompatibility testing?',
    why: 'Biocompatibility testing (Clifford Materials Reactivity Testing or Biocomp Labs) screens your immune reactivity to specific dental materials before they\'re placed. This is especially relevant for patients with multiple chemical sensitivities, autoimmune conditions, or prior reactions to dental materials.',
  },
  {
    number: '07',
    question: 'How do you approach root canals?',
    why: 'Biological dentists vary in their positions. Some perform root canals with specific biocompatible sealers; others prefer extraction with socket grafting and a ceramic implant. There is no single right answer — understanding the practice\'s philosophy helps you make an informed decision.',
  },
  {
    number: '08',
    question: 'Do you evaluate for cavitations?',
    why: 'Cavitations (jaw osteonecrosis or ischemic osteonecrosis) are areas of poorly healed bone, often at old extraction sites, that some practitioners believe contribute to chronic illness. Not all biological dentists evaluate for cavitations, but it\'s worth asking if you have unexplained chronic symptoms and a history of extractions or root canals.',
  },
  {
    number: '09',
    question: 'What ozone therapy do you offer, and for what conditions?',
    why: 'Ozone therapy can treat early cavities without drilling, reduce bacteria in gum disease, and support post-surgical healing. Ask what the practice uses it for and how it\'s applied — some practices use gaseous ozone, others use ozonated water or ozonated oil.',
  },
  {
    number: '10',
    question: 'Do you take an oral-systemic approach to care?',
    why: 'Ask whether they consider connections between oral health and systemic conditions — periodontal disease and cardiovascular risk, airway issues and sleep apnea, jaw alignment and postural problems. A biological dentist who takes a whole-body view will engage this question seriously.',
  },
  {
    number: '11',
    question: 'What is your experience with [your specific concern]?',
    why: 'Whether it\'s heavy metal detox support, pediatric holistic care, treatment for sensitive patients, or a specific dental condition — ask directly about experience. Volume matters: a dentist who does 10 SMART removals per month has different expertise than one who does 2 per year.',
  },
  {
    number: '12',
    question: 'Do you accept insurance, and what does coverage look like for biological-specific treatments?',
    why: 'Standard dental procedures are often covered even at holistic practices. Biological-specific procedures like SMART removal protocols, biocompatibility testing, ozone therapy, and ceramic implants are typically not. Get clarity upfront to avoid billing surprises.',
  },
]

export default function QuestionsToAskPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">Questions to Ask a Holistic Dentist</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4 leading-tight">
          12 Questions to Ask a Holistic Dentist Before Your First Visit
        </h1>
        <p className="text-gray-500 text-sm mb-8">Verify credentials and protocols before booking — these questions separate trained biological dentists from marketing language</p>

        <div className="prose-guide">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            &ldquo;Holistic dentist&rdquo; is not a protected term. Any practice can use it. The questions below help you cut through the marketing and identify dentists with actual training in biological dentistry protocols — the ones who can safely remove amalgam, test biocompatibility, and take a genuinely whole-body approach to your oral health.
          </p>

          <div className="space-y-6 mb-10">
            {QUESTIONS.map(({ number, question, why }) => (
              <div key={number} className="bg-white border border-ivory-dark rounded-2xl p-6">
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-gold/60 shrink-0 leading-none mt-0.5">{number}</span>
                  <div>
                    <h3 className="font-bold text-forest text-lg mb-2">&ldquo;{question}&rdquo;</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Red flags to watch for</h2>
          <ul className="space-y-3 mb-8">
            {[
              'Using the word "holistic" or "natural" without any IAOMT, IABDM, or HDA credentials',
              'Vague answers to SMART protocol questions ("we take precautions" without specifics)',
              'No clear policy on amalgam removal safety — will remove "the normal way"',
              'Dismissing your concerns about mercury, fluoride, or biocompatible materials',
              'No experience with the specific procedure you\'re seeking',
              'Hard sell on expensive treatments before completing a full examination',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">What to bring to your first appointment</h2>
          <ul className="space-y-2 mb-8 text-gray-700">
            {[
              'Your full health history — including supplements, medications, chronic conditions, and autoimmune diagnoses',
              'A list of all previous dental work — especially amalgam fillings, root canals, and implants',
              'Previous X-rays if transferring from another practice',
              'A list of specific concerns or symptoms you want to discuss',
              'For amalgam removal patients: a starting estimate of how many fillings you have and their approximate age',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-ivory-dark/50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-forest mb-3">How HolisticDentalFinder helps</h2>
            <p className="text-gray-600 leading-relaxed">
              Every listing on HolisticDentalFinder shows the dentist&apos;s credentials (IAOMT, IABDM, HDA, SMART certified), specialties, and practice approach. You can filter by credential level and specialty before you ever pick up the phone — which means you&apos;re starting from a more informed position than walking in blind.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-forest text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gold mb-2">Find a verified holistic dentist near you</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Browse 1,300+ biological and holistic dentists with credential filters. Find SMART-certified, IAOMT-trained, and HDA-member dentists in your city.
          </p>
          <Link
            href="/listings"
            className="inline-block bg-gold hover:bg-gold-light text-forest font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Browse the Directory
          </Link>
        </div>
      </div>
    </>
  )
}
