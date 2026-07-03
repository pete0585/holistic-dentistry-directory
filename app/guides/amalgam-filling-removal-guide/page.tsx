import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Amalgam Filling Removal: The SMART Protocol Explained | HolisticDentalFinder.com',
  description:
    'SMART amalgam removal minimizes mercury vapor exposure during filling removal. Here is what the protocol involves, why it matters, and how to find a SMART-certified dentist.',
  openGraph: {
    title: 'Amalgam Filling Removal: The SMART Protocol Explained',
    description:
      'Mercury amalgam removal without SMART protocol exposes patients to mercury vapor. Here is what SMART involves and how to find a certified provider.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Is amalgam filling removal dangerous?',
    a: 'The act of removing an amalgam filling — drilling, cutting, and grinding — releases mercury vapor and amalgam particles. In a standard removal without protective protocols, the patient can be exposed to elevated mercury vapor for the duration of the procedure. For most people with intact amalgam fillings, the daily mercury vapor release is low. The highest exposure window is during removal. This is why protocols like SMART exist: to minimize that exposure window and protect the patient, dentist, and dental staff.',
  },
  {
    q: 'What does SMART stand for and what does the protocol include?',
    a: 'SMART stands for Safe Mercury Amalgam Removal Technique, developed and standardized by the International Academy of Oral Medicine and Toxicology (IAOMT). The SMART protocol includes: a non-latex rubber dam to isolate the filling from the rest of the mouth, high-volume evacuation (suction) directly at the tooth, sectioning the filling into chunks rather than grinding (reducing vaporization), a "Clean Up" SMART procedure checklist, an air filtration system in the operatory, nasal oxygen for the patient, and protective draping for the patient and provider. IAOMT-certified SMART dentists complete training and demonstrate the protocol to receive certification.',
  },
  {
    q: 'Should I remove my amalgam fillings even if they are not causing problems?',
    a: 'This is a genuinely debated question with no clear consensus. Intact amalgam fillings release low levels of mercury vapor over time — within what regulatory bodies consider acceptable limits. However, some patients and holistic practitioners prefer to have them removed as a precautionary measure, particularly for people with suspected heavy metal sensitivity, autoimmune conditions, or who are planning pregnancy. If removal is chosen for elective reasons (not because the filling is cracked or failing), doing so with a SMART-certified dentist minimizes the incremental exposure from the removal procedure itself.',
  },
  {
    q: 'What is the difference between SMART-certified and just mercury-free?',
    a: 'Mercury-free means the dentist does not place new amalgam fillings — they use composite, ceramic, or other tooth-colored materials. Mercury-safe (or SMART-certified) means the dentist has specific training and protocols for removing existing amalgam fillings safely. These are different credentials. A mercury-free dentist who has not done SMART training may remove amalgam fillings without protective protocols — which is better than placing new ones but does not address the exposure risk during removal. When having amalgam removed, specifically look for a SMART-certified provider.',
  },
  {
    q: 'What should I do after amalgam removal?',
    a: "Many holistic dentists recommend a post-removal detox protocol to support the body's clearance of any mercury released during the procedure. Common recommendations include: chlorella (algae that binds heavy metals in the gut), vitamin C (antioxidant support), cilantro, and in some cases DMSA chelation under medical supervision for documented heavy metal toxicity. The evidence for specific detox protocols after SMART removal is limited — these are largely practitioner-experience-based recommendations rather than controlled trial outcomes. Work with your holistic dentist and/or integrative medicine provider on a plan appropriate for your situation.",
  },
]

const SMART_STEPS = [
  { step: '1', title: 'Rubber Dam Placement', detail: 'A non-latex rubber dam seals the tooth from the rest of the mouth, preventing amalgam particles and fragments from being swallowed.' },
  { step: '2', title: 'High-Volume Evacuation', detail: 'A large-diameter suction tip is placed directly at the tooth throughout the procedure to capture mercury vapor and particles immediately at the source.' },
  { step: '3', title: 'Sectioning — Not Grinding', detail: 'The filling is cut into chunks with a small carbide bur and lifted out in pieces, rather than ground down. Grinding vaporizes more mercury — sectioning minimizes it.' },
  { step: '4', title: 'Operatory Air Filtration', detail: 'A high-efficiency air filtration unit (HEPA + activated carbon) runs in the operatory to capture any ambient mercury vapor not collected by suction.' },
  { step: '5', title: 'Patient Oxygen and Protection', detail: 'Nasal oxygen is provided so the patient breathes filtered air, not room air. A patient barrier covers the patient from neck to toe. Provider team wears respirators or powered air-purifying respirators (PAPR).' },
  { step: '6', title: 'Immediate Cleanup', detail: 'Amalgam particles are collected in a mercury-safe amalgam separator. The rubber dam and patient draping are removed carefully to avoid dislodging captured particles.' },
]

export default function AmalgamRemovalGuidePage() {
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
          <span>Amalgam Removal Guide</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Amalgam Filling Removal: The SMART Protocol Explained
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Removing mercury amalgam fillings releases mercury vapor. The SMART protocol minimizes that exposure
            with specific equipment and technique. Here is what it involves and what to look for in a provider.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">The SMART Protocol — Step by Step</h2>
            <div className="space-y-4">
              {SMART_STEPS.map((item) => (
                <div key={item.step} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5">
                  <div className="bg-forest text-white font-bold text-lg w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions to Ask Before Amalgam Removal</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <ul className="space-y-2">
                {[
                  'Are you IAOMT SMART-certified? (Can I see your certificate?)',
                  'Do you use a rubber dam for every amalgam removal?',
                  'Do you section the filling or grind it?',
                  'What evacuation system do you use during removal?',
                  'Do you have an air filtration unit running in the operatory?',
                  'Do you provide nasal oxygen to patients during the procedure?',
                  'What do you replace amalgam with? (composite, ceramic, gold?)',
                ].map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-forest font-bold mt-0.5">→</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
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
            <h2 className="text-2xl font-bold mb-3">Find a SMART-Certified Dentist</h2>
            <p className="text-white/80 mb-6 text-sm">
              Search our directory for IAOMT SMART-certified dentists who follow the full safe mercury removal protocol.
            </p>
            <Link
              href="/listings"
              className="inline-block bg-gold hover:bg-gold-light text-forest font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Find a SMART-Certified Dentist <ArrowRight className="inline h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/smart-certified-dentist-mercury-removal" className="text-sm text-forest hover:underline font-medium">SMART Certification Guide →</Link>
              <Link href="/guides/holistic-vs-regular-dentist" className="text-sm text-forest hover:underline font-medium">Holistic vs. Regular Dentist →</Link>
              <Link href="/guides/holistic-dentist-cost" className="text-sm text-forest hover:underline font-medium">How Much Does It Cost? →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
