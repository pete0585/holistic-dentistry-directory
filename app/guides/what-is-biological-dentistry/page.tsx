import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What Is Biological Dentistry? A Patient\'s Guide | HolisticDentalFinder',
  description: 'Biological dentistry treats your mouth as part of your whole body. Learn what sets biological dentists apart, what credentials to look for, and how to find one near you.',
  openGraph: {
    title: 'What Is Biological Dentistry? | HolisticDentalFinder',
    description: 'Biological dentistry treats your mouth as part of your whole body. Learn what sets biological dentists apart and how to find one near you.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is biological dentistry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Biological dentistry is an approach to oral healthcare that treats the mouth as part of the whole body. Biological dentists avoid materials known to be toxic (like mercury amalgam and BPA-containing composites), focus on biocompatible materials, and consider the relationship between oral health and systemic health conditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a holistic dentist and a biological dentist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The terms overlap significantly. "Biological dentist" often refers specifically to practitioners trained through IAOMT or IABDM, with a strong focus on biocompatible materials and mercury-safe protocols. "Holistic dentist" is broader and may include practitioners who emphasize natural approaches, whole-body wellness, and minimizing toxic exposures without a specific association credential.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credentials should a biological dentist have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key credentials: IAOMT Member/Accredited/Fellow/Master (International Academy of Oral Medicine and Toxicology), IABDM Certified (International Academy of Biological Dentistry and Medicine), HDA Member (Holistic Dental Association), and SMART Certified (Safe Mercury Amalgam Removal Technique). IAOMT Fellowship and Mastership represent the highest level of training.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is biological dentistry covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard dental procedures at a biological dental office (exams, cleanings, fillings) are typically covered by insurance if the practice accepts it. However, specific biological treatments like SMART amalgam removal, ozone therapy, or biocompatibility testing may not be covered. Many biological dentists are fee-for-service practices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do biological dentists avoid mercury amalgam fillings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mercury is a potent neurotoxin. Amalgam fillings are approximately 50% mercury by weight, and they release mercury vapor — especially during chewing, grinding, and hot beverages. While regulatory bodies have different positions on the safety threshold, biological dentists take a precautionary approach: no safe level of mercury exposure has been established, so they use composite, ceramic, or other biocompatible alternatives instead.',
      },
    },
  ],
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is Biological Dentistry? A Patient\'s Guide',
  description: 'Biological dentistry treats your mouth as part of your whole body. Learn what sets biological dentists apart, what credentials to look for, and how to find one.',
  url: 'https://holisticdentalfinder.com/guides/what-is-biological-dentistry',
  publisher: {
    '@type': 'Organization',
    name: 'HolisticDentalFinder',
    url: 'https://holisticdentalfinder.com',
  },
}

export default function WhatIsBiologicalDentistryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          {' / '}
          <span className="text-gray-600">What Is Biological Dentistry?</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-forest mb-4 leading-tight">
          What Is Biological Dentistry? A Patient&apos;s Guide
        </h1>
        <p className="text-gray-500 text-sm mb-8">A guide for patients seeking non-toxic, whole-body dental care</p>

        <div className="prose-guide">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Biological dentistry starts with a premise conventional dentistry rarely considers: your mouth is not a separate system. It&apos;s connected to everything else. The bacteria in your gums affect your heart. The mercury in your fillings circulates in your body. The way your jaw sits affects your spine. Biological dentists act on this connection — and it changes how they work.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">What makes a dentist &ldquo;biological&rdquo;?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The defining markers of a biological or holistic dentist aren&apos;t about soft lighting and essential oils. They&apos;re about specific clinical choices:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'They don\'t place new mercury amalgam fillings — and when removing old ones, they follow SMART protocol to prevent mercury vapor exposure.',
              'They use biocompatible materials: composite resins without BPA, ceramic or zirconia for crowns and implants, and biocompatibility testing before recommending materials for patients with sensitivities.',
              'They avoid or offer alternatives to fluoride treatments, especially for patients who request them.',
              'They consider your full health picture — medications, immune status, nutritional status — before recommending procedures.',
              'They may offer ozone therapy as an antibacterial alternative to conventional cavity treatment.',
              'They take a minimally invasive approach: only treating what needs treatment, not drilling healthy tooth structure prophylactically.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">The three main credentials to know</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Not all dentists who call themselves &ldquo;holistic&rdquo; have formal training. The three associations below represent verifiable credentials:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-ivory-dark/50 rounded-xl p-5">
              <h3 className="font-bold text-forest mb-1">IAOMT — International Academy of Oral Medicine and Toxicology</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The most rigorous biological dentistry credential. Members complete training in mercury toxicology, SMART protocol, biocompatible materials, and oral-systemic connections. Levels: Member → Accredited → Fellow → Master. IAOMT Fellows and Masters represent the highest standard of training in the field.
              </p>
            </div>
            <div className="bg-ivory-dark/50 rounded-xl p-5">
              <h3 className="font-bold text-forest mb-1">IABDM — International Academy of Biological Dentistry and Medicine</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Focused on integrating dental and medical care. IABDM-certified dentists have completed coursework in biocompatibility, detoxification, nutritional approaches, and the relationship between oral health and systemic disease.
              </p>
            </div>
            <div className="bg-ivory-dark/50 rounded-xl p-5">
              <h3 className="font-bold text-forest mb-1">HDA — Holistic Dental Association</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The oldest holistic dental organization in the US (founded 1978). HDA members are committed to a philosophy of whole-body dentistry. Many HDA members openly document their positions on amalgam and fluoride, making them easy to evaluate before booking.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">The oral-systemic connection</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Decades of research have established that oral health affects — and is affected by — systemic health. Gum disease (periodontal disease) is linked to cardiovascular disease, diabetes, Alzheimer&apos;s disease, adverse pregnancy outcomes, and rheumatoid arthritis. The pathway is inflammation: chronic bacterial infection in the gums generates systemic inflammatory mediators that travel through the bloodstream.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Biological dentists take this seriously. They&apos;re more likely to coordinate with your primary care physician or functional medicine doctor, flag systemic health implications of what they see in your mouth, and recommend interventions (nutritional, microbial, structural) that address root causes rather than just treating the symptom.
          </p>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Who should seek a biological dentist?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You don&apos;t have to be sick to want a biological dentist. But these are the situations where it matters most:
          </p>
          <ul className="space-y-2 mb-6 text-gray-700">
            {[
              'You have old mercury amalgam fillings and want them safely removed',
              'You\'re planning dental implants and want ceramic/zirconia instead of titanium',
              'You have chronic illness, autoimmune conditions, or unexplained symptoms and want to rule out dental contributions',
              'You\'re pregnant or planning to become pregnant and want to minimize toxic exposures',
              'You want fluoride-free care for yourself or your children',
              'You\'re a biohacker or functional medicine patient and want your dental care aligned with your health philosophy',
              'You have metal sensitivities and need biocompatibility testing before any restorative work',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-forest mt-10 mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'What is the difference between a holistic dentist and a biological dentist?',
                a: 'The terms overlap. "Biological dentist" often implies formal training through IAOMT or IABDM, with a specific focus on biocompatible materials and mercury-safe protocols. "Holistic dentist" is broader and includes practitioners who emphasize natural approaches and whole-body wellness with or without specific association credentials.',
              },
              {
                q: 'Is biological dentistry covered by insurance?',
                a: 'Standard procedures at a biological dental office are typically covered if the practice accepts your insurance. Specific biological treatments like SMART amalgam removal, ozone therapy, or biocompatibility testing may not be covered. Many biological dentists are fee-for-service practices — call ahead to verify.',
              },
              {
                q: 'Why do biological dentists avoid mercury amalgam fillings?',
                a: 'Mercury is a potent neurotoxin. Amalgam fillings are ~50% mercury by weight and release mercury vapor during normal use. Biological dentists take a precautionary approach: since no safe level of mercury exposure has been established, they use composite, ceramic, or other biocompatible alternatives.',
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
          <h2 className="text-xl font-bold text-gold mb-2">Find a biological dentist near you</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Browse 1,300+ verified holistic, biological, and mercury-safe dentists across all 50 states. Filter by credential, specialty, and location.
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
