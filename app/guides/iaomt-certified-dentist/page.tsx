import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is an IAOMT Dentist and How to Find One | HolisticDentalFinder',
  description: 'IAOMT dentists are trained in mercury-safe SMART protocol and oral toxicology. Learn what IAOMT membership means, how SMART certification works, and how to verify a dentist\'s status.',
  openGraph: {
    title: 'What Is an IAOMT Dentist and How to Find One | HolisticDentalFinder',
    description: 'IAOMT training, SMART protocol, and how to verify a dentist\'s credentials before mercury amalgam removal.',
  },
  alternates: { canonical: 'https://holisticdentalfinder.com/guides/iaomt-certified-dentist' },
}

const FAQ = [
  {
    q: 'What does IAOMT stand for?',
    a: 'IAOMT stands for the International Academy of Oral Medicine and Toxicology. Founded in 1984, it is a nonprofit scientific organization that conducts and reviews peer-reviewed research on the biocompatibility of dental materials, the biological impact of mercury from dental amalgam fillings, and related oral medicine and toxicology issues. IAOMT is headquartered in the United States and has members internationally.',
  },
  {
    q: 'What is the SMART protocol for mercury removal?',
    a: 'SMART stands for Safe Mercury Amalgam Removal Technique. It is a specific clinical protocol developed by IAOMT to minimize the release of mercury vapor and particulate during the removal of amalgam fillings. Key SMART elements include: high-volume evacuation (HVE) to capture mercury vapor at the source; the use of a rubber dam to prevent swallowing of amalgam particles; sectioning the amalgam into chunks rather than grinding it (which generates more vapor); nitrogen oxygen supplementation for the patient; use of a HEPA air filtration system in the operatory; and full protective covering for the patient and clinical team. SMART-certified dentists have completed IAOMT\'s specific training in this protocol.',
  },
  {
    q: "How do I verify a dentist's IAOMT membership or SMART certification?",
    a: 'Go directly to iaomt.org/find-a-dentist and search by name, city, or state. The directory shows current members and their level of involvement. Be aware that any dentist can call themselves "IAOMT-trained" or "mercury-safe" — the only way to verify active IAOMT membership and SMART certification is through the official IAOMT member directory. If a dentist does not appear in that directory, they have not completed or maintained IAOMT training requirements.',
  },
  {
    q: 'Is an IAOMT dentist the same as a "holistic dentist" or "biological dentist"?',
    a: 'Not exactly, though there is significant overlap. IAOMT membership specifically certifies training in mercury toxicology, SMART amalgam removal protocol, and biocompatible materials science. "Holistic dentist" and "biological dentist" are broader terms with no regulatory definition — any dentist can use them. An IAOMT-trained dentist has a verifiable credential. A dentist who markets as "holistic" without IAOMT, IABDM, or similar membership has a marketing claim, not a certified credential. Look for the actual organization membership, not just the label.',
  },
]

export const revalidate = 86400

export default function IAOMTCertifiedDentistPage() {
  const jsonLd = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <Link href="/listings" className="hover:text-forest transition-colors">Directory</Link>
          {' / '}
          <span className="text-gray-600">Guides</span>
          {' / '}
          <span className="text-gray-600">IAOMT Certified Dentist</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            What Is an IAOMT Dentist and How to Find One
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            The IAOMT credential is the most specific and verifiable standard in biological dentistry. Here&apos;s what
            membership means, what SMART certification involves, and how to confirm a dentist&apos;s status before
            scheduling mercury amalgam removal.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-forest mb-3">What is the IAOMT?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The International Academy of Oral Medicine and Toxicology (IAOMT) was founded in 1984 by a group of
                dentists and physicians concerned about the health and environmental implications of mercury dental
                amalgam. Unlike marketing organizations, IAOMT produces and reviews peer-reviewed scientific research —
                it has published position papers on amalgam, fluoride, biocompatible materials, and oral-systemic
                connections that are cited in academic literature.
              </p>
              <p className="text-gray-700 leading-relaxed">
                IAOMT membership requires dentists to complete continuing education courses in oral toxicology, mercury
                amalgam science, and biocompatible materials. The organization&apos;s SMART protocol for amalgam removal
                is the evidence-based standard that responsible biological dentists follow — and the benchmark patients
                should use when evaluating any dentist who claims to do &ldquo;safe&rdquo; mercury removal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-forest mb-3">IAOMT membership levels</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                IAOMT has distinct levels of member engagement:
              </p>
              <div className="space-y-4">
                <div className="bg-ivory-dark/40 rounded-xl p-5">
                  <h3 className="font-bold text-forest mb-1">Associate Member</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Entry-level membership. The dentist has joined IAOMT and has access to educational resources and training. This alone does not indicate specific clinical proficiency — it indicates interest and basic education.</p>
                </div>
                <div className="bg-ivory-dark/40 rounded-xl p-5">
                  <h3 className="font-bold text-forest mb-1">Fellow (FIAOMT)</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Fellowship requires completing IAOMT&apos;s specified courses and passing written examinations. A Fellow has demonstrated completion of meaningful continuing education in IAOMT&apos;s curriculum areas.</p>
                </div>
                <div className="bg-ivory-dark/40 rounded-xl p-5">
                  <h3 className="font-bold text-forest mb-1">Accredited Member (SMART Protocol Certified)</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Accreditation is the highest IAOMT designation. It requires completing the Fellowship curriculum, passing examinations, submitting a case review, and demonstrating clinical competency in SMART protocol. An Accredited IAOMT member has the most rigorously verified training in mercury-safe amalgam removal. If you need amalgam removal specifically, this is the credential to prioritize.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-forest mb-3">What the SMART protocol actually involves</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                SMART — Safe Mercury Amalgam Removal Technique — is not just a precaution. It exists because
                improper amalgam removal exposes patients, staff, and the operatory environment to significantly
                elevated mercury vapor levels. Cutting and grinding amalgam fillings without protective protocols
                can generate mercury vapor concentrations 10-100x baseline ambient levels for the duration of
                the procedure.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The SMART protocol addresses this through a specific set of clinical procedures:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3"><span className="text-forest font-bold mt-0.5">→</span><span><strong>Rubber dam isolation</strong> — prevents amalgam particles from being swallowed or entering the airway during removal.</span></li>
                <li className="flex gap-3"><span className="text-forest font-bold mt-0.5">→</span><span><strong>High-volume evacuation (HVE)</strong> — a large-bore suction tip positioned at the mercury source during drilling captures vapor and particulate before it can disperse.</span></li>
                <li className="flex gap-3"><span className="text-forest font-bold mt-0.5">→</span><span><strong>Chunking technique</strong> — sectioning the amalgam into large pieces with minimal drilling, rather than grinding it into powder, dramatically reduces vapor generation.</span></li>
                <li className="flex gap-3"><span className="text-forest font-bold mt-0.5">→</span><span><strong>Nasal oxygen or nitrogen supplementation</strong> — the patient breathes through a nasal cannula during removal so they are not inhaling operatory air at peak mercury vapor concentrations.</span></li>
                <li className="flex gap-3"><span className="text-forest font-bold mt-0.5">→</span><span><strong>Full patient and staff protection</strong> — protective drapes, eye protection, and disposal of materials in EPA-compliant amalgam containers.</span></li>
                <li className="flex gap-3"><span className="text-forest font-bold mt-0.5">→</span><span><strong>HEPA/activated-carbon air filtration</strong> — operatory air filtration to capture mercury vapor before it recirculates.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-forest mb-3">How to verify a dentist&apos;s IAOMT status</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                There is one reliable verification method: the IAOMT member directory at <strong>iaomt.org/find-a-dentist</strong>.
                Search by the dentist&apos;s name or location and confirm their current membership status and level.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Do not rely solely on a dentist&apos;s own website to verify IAOMT status. &ldquo;IAOMT-trained&rdquo; language without
                a current directory listing may mean the dentist attended a single seminar years ago without maintaining
                membership. IAOMT membership requires renewal and ongoing continuing education — current directory
                listing = current membership. No listing = unknown or lapsed status.
              </p>
              <p className="text-gray-700 leading-relaxed">
                At your consultation, ask specifically: &ldquo;What is your current IAOMT membership level?&rdquo; and &ldquo;What specific
                elements of the SMART protocol do you use for amalgam removal?&rdquo; A trained SMART practitioner can answer
                both questions in detail. Vague or evasive answers to specific protocol questions are a signal to look elsewhere.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-forest mb-3">What to ask at your consultation</h2>
              <ul className="space-y-2 text-gray-700">
                <li>✓ What is your current IAOMT membership level? (Associate, Fellow, or Accredited)</li>
                <li>✓ Do you use a rubber dam during amalgam removal?</li>
                <li>✓ What evacuation equipment do you use, and where is the HVE tip positioned?</li>
                <li>✓ Do you use the chunking technique or grinding for removal?</li>
                <li>✓ What air filtration system do you have in your operatory?</li>
                <li>✓ Do you provide nasal oxygen or air during the procedure?</li>
                <li>✓ How do you dispose of amalgam waste?</li>
              </ul>
            </section>
          </div>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-forest mb-8">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl border border-ivory-dark p-6">
                  <h3 className="font-bold text-forest mb-3">{q}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 rounded-2xl bg-forest p-8 text-center">
            <h2 className="text-xl font-bold text-gold mb-3">Find an IAOMT-affiliated dentist near you</h2>
            <p className="text-white/70 mb-6 text-sm">
              Browse our directory to find biological dentists with verified credentials in your area.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold hover:bg-gold-light px-8 py-3 text-sm font-bold text-forest transition-colors"
            >
              Browse the Directory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
