import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Leaf, Menu } from 'lucide-react'

export const metadata: Metadata = {
  metadataBase: new URL('https://holisticdentalfinder.com'),
  title: {
    default: 'HolisticDentalFinder — Find Biological & Mercury-Safe Dentists Near You',
    template: '%s | HolisticDentalFinder',
  },
  description: 'The only directory covering ALL IAOMT, IABDM, and HDA dentists plus non-affiliated biological and holistic dentists. Find mercury-safe, fluoride-free, SMART-certified dental care near you.',
  keywords: ['holistic dentist', 'biological dentist', 'mercury safe dentist', 'SMART certified dentist', 'fluoride free dentist', 'holistic dentist near me'],
  openGraph: {
    type: 'website',
    siteName: 'HolisticDentalFinder',
    url: 'https://holisticdentalfinder.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-forest sticky top-0 z-50 shadow-md">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-gold" aria-hidden="true" />
              </div>
              <span className="text-gold font-bold text-lg leading-none">
                HolisticDental<span className="text-white">Finder</span>
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-6">
              <Link href="/listings" className="text-white/80 hover:text-gold text-sm font-medium transition-colors">
                Find a Dentist
              </Link>
              <Link href="/categories/mercury-removal" className="text-white/80 hover:text-gold text-sm font-medium transition-colors">
                Mercury Removal
              </Link>
              <Link href="/categories/ozone-therapy" className="text-white/80 hover:text-gold text-sm font-medium transition-colors">
                Ozone Therapy
              </Link>
              <Link href="/submit" className="bg-gold hover:bg-gold-light text-forest-dark font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Add Your Practice
              </Link>
            </div>

            <div className="sm:hidden">
              <Menu className="w-6 h-6 text-gold" aria-label="Open menu" />
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-forest-dark text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-gold" aria-hidden="true" />
                  <span className="text-gold font-bold">HolisticDentalFinder</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  The only aggregated directory covering IAOMT, IABDM, HDA, and non-affiliated biological dentists nationwide.
                </p>
              </div>

              <div>
                <h3 className="text-gold font-semibold text-sm uppercase tracking-wide mb-4">Find By Specialty</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    ['Mercury Amalgam Removal', '/categories/mercury-removal'],
                    ['SMART Protocol', '/categories/smart-protocol'],
                    ['Ozone Therapy', '/categories/ozone-therapy'],
                    ['Ceramic Implants', '/categories/ceramic-implants'],
                    ['Fluoride-Free', '/categories/fluoride-free'],
                    ['Holistic Pediatric', '/categories/holistic-pediatric'],
                  ].map(([label, href]) => (
                    <li key={href}><Link href={href} className="text-white/60 hover:text-gold transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-gold font-semibold text-sm uppercase tracking-wide mb-4">Top Cities</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    ['Los Angeles, CA', '/listings?state=CA&q=los+angeles'],
                    ['Denver, CO', '/listings?state=CO&q=denver'],
                    ['Austin, TX', '/listings?state=TX&q=austin'],
                    ['Portland, OR', '/listings?state=OR&q=portland'],
                    ['Seattle, WA', '/listings?state=WA&q=seattle'],
                    ['Chicago, IL', '/listings?state=IL&q=chicago'],
                  ].map(([label, href]) => (
                    <li key={href}><Link href={href} className="text-white/60 hover:text-gold transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-gold font-semibold text-sm uppercase tracking-wide mb-4">For Dentists</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    ['Add Your Practice', '/submit'],
                    ['Claim Your Listing', '/listings'],
                    ['Verified Listing — $149/yr', '/submit'],
                    ['Featured Listing — $299/yr', '/submit'],
                  ].map(([label, href]) => (
                    <li key={label}><Link href={href} className="text-white/60 hover:text-gold transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
              © {new Date().getFullYear()} HolisticDentalFinder.com — All rights reserved.
              Not affiliated with IAOMT, IABDM, or HDA.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
