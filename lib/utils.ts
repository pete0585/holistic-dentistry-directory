export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return phone
}

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'Washington D.C.',
}

export const CREDENTIAL_LABELS: Record<string, string> = {
  iaomt_member: 'IAOMT Member',
  iaomt_accredited: 'IAOMT Accredited',
  iaomt_fellow: 'IAOMT Fellow',
  iaomt_master: 'IAOMT Master',
  smart_certified: 'SMART Certified',
  iabdm_certified: 'IABDM Certified',
  hda_member: 'HDA Member',
  biological_dentist_certified: 'Biological Dentist Certified',
}

export const SPECIALTY_LABELS: Record<string, string> = {
  mercury_removal: 'Mercury Amalgam Removal',
  smart_protocol: 'SMART Protocol',
  ozone_therapy: 'Ozone Therapy',
  ceramic_implants: 'Ceramic Implants',
  fluoride_free: 'Fluoride-Free',
  biocompatibility_testing: 'Biocompatibility Testing',
  holistic_pediatric: 'Holistic Pediatric Dentistry',
  tmj_treatment: 'TMJ Treatment',
  sleep_dentistry: 'Sleep Dentistry',
  cavitation: 'Cavitation Treatment',
  oral_systemic: 'Oral-Systemic Health',
  natural_whitening: 'Natural Whitening',
}

export const SPECIALTY_SLUGS: Record<string, string> = {
  'mercury-removal': 'mercury_removal',
  'smart-protocol': 'smart_protocol',
  'ozone-therapy': 'ozone_therapy',
  'ceramic-implants': 'ceramic_implants',
  'fluoride-free': 'fluoride_free',
  'biocompatibility-testing': 'biocompatibility_testing',
  'holistic-pediatric': 'holistic_pediatric',
  'tmj-treatment': 'tmj_treatment',
  'sleep-dentistry': 'sleep_dentistry',
  'cavitation': 'cavitation',
  'oral-systemic': 'oral_systemic',
  'natural-whitening': 'natural_whitening',
}

export const SPECIALTY_DESCRIPTIONS: Record<string, string> = {
  mercury_removal: 'Safe removal of mercury amalgam fillings using SMART protocol by IAOMT-trained dentists.',
  smart_protocol: 'SMART (Safe Mercury Amalgam Removal Technique) protocol for mercury-safe dentistry.',
  ozone_therapy: 'Ozone therapy for cavity prevention, gum disease, and non-invasive dental treatment.',
  ceramic_implants: 'Zirconia and ceramic implants as a metal-free alternative to titanium implants.',
  fluoride_free: 'Dentistry without fluoride — using natural remineralization and biocompatible approaches.',
  biocompatibility_testing: 'Testing dental materials for individual biocompatibility before use.',
  holistic_pediatric: 'Mercury-safe, fluoride-free dental care for children.',
  tmj_treatment: 'Treatment for temporomandibular joint disorders using holistic approaches.',
  sleep_dentistry: 'Oral appliance therapy for sleep apnea and snoring.',
  cavitation: 'Diagnosis and treatment of cavitation lesions in jawbone.',
  oral_systemic: 'Addressing the connection between oral health and whole-body wellness.',
  natural_whitening: 'Natural and non-toxic teeth whitening approaches.',
}
