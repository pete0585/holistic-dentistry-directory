# HolisticDentalFinder

Directory of biological, holistic, and mercury-safe dentists — aggregating IAOMT, IABDM, HDA, and non-affiliated practitioners.

**Domain:** holisticdentalfinder.com  
**Stack:** Next.js 15 · Tailwind CSS · Supabase · Stripe · Vercel

---

## Local Development

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with credentials from agents/directory-bootstrap/output/holistic-dentistry/holistic-dentistry.env.vercel
npm run dev
```

Open http://localhost:3000

---

## Supabase Setup

The bootstrap agent already created the tables (`holistic_dentist_listings`, `holistic_dentist_claims`, `holistic_dentist_payments`, `holistic_dentist_leads`) in the shared Directories project (`fbuqrnzofktepkzyfmhy`).

Apply the migration to add indexes and search triggers:

```bash
# Via Supabase MCP (already applied by builder)
# Or manually via Supabase Dashboard > SQL Editor:
# Paste: supabase/migrations/001_initial_schema.sql
```

---

## Seed Data

Run the seed script to load initial listings:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://fbuqrnzofktepkzyfmhy.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your_key \
npx tsx scripts/seed.ts
```

For the full initial seed (800–1,200 listings), run the data-seeder agent with sources:
- HDA: https://holisticdental.org/find-a-holistic-dentist (373 US members, fully public)
- IABDM: https://iabdm.org/location (state browse, ~300-500 US members)
- IAOMT: https://iaomt.org/for-patients/search (zip search by city)
- DataForSEO: "holistic dentist" + "biological dentist" in top 100 US cities

---

## Vercel Deployment

All env vars are already set in the Vercel project by the bootstrap agent.  
The GitHub repo is linked — push to `main` and Vercel auto-deploys.

**Vercel Project ID:** prj_785daLaC7lNldbPFHHHQQL6AXXQE

```bash
git push origin main
```

---

## Stripe Products

- **Verified Listing:** $149/year (price_1TeDf4GzK9Siblue5qAyGc3t) — NOTE: Stripe products were created by bootstrap; verify prices match SPEC if needed
- **Featured Listing:** $299/year (price_1TeDf4GzK9SibluecujKBbpx)

Stripe webhook registered at: `https://www.holisticdentalfinder.com/api/webhooks/stripe`

---

## Resend Email

Sending subdomain: `mail.holisticdentalfinder.com`  
From address: `hello@mail.holisticdentalfinder.com`  
Resend Domain ID: See `agents/directory-bootstrap/output/holistic-dentistry/holistic-dentistry-resend-domain-id.txt`

---

## Key URLs

- `/` — Homepage with search
- `/listings` — Browse all dentists (filter by state, specialty, credential)
- `/listings/[slug]` — Individual dentist profile
- `/categories/[slug]` — Specialty landing pages (mercury-removal, ozone-therapy, etc.)
- `/submit` — Submit new listing (free)
- `/claim/[id]` — Claim and verify listing
- `/admin` — Admin panel (requires Supabase auth + admin_users table entry)

---

## Revenue Model

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | Name, city, phone, website, claim CTA |
| Verified | $149/yr | Full profile, credentials, contact form, priority placement |
| Featured | $299/yr | Everything + first position, monthly inquiry report |

Use discount code `HOLISTIC20` for 20% off first year.
