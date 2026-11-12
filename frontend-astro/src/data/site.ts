/**
 * Single source of truth for business details used in the header, footer,
 * sticky contact bar, lead forms and structured data.
 *
 * Contact is by WhatsApp and email only (no public calling number).
 * Name and address must match Google Business Profile, Justdial,
 * IndiaMART and LinkedIn exactly. Fill in `address` with the registered
 * office in Bangalore: the footer address block and LocalBusiness schema
 * switch on automatically once `streetAddress` (and `postalCode`) are set.
 */
export const site = {
  name: 'Tyrus Technologies Pvt Ltd',
  shortName: 'Tyrus Technologies',
  url: 'https://www.tyrustech.com',
  email: 'corporatesales@tyrustech.com',
  whatsapp: '919742065852',
  whatsappDisplay: '+91 97420 65852',
  whatsappMessage: 'Hi Tyrus, I need a quote for document scanning.',
  foundingYear: '2009',
  openingHours: 'Mo-Sa 09:30-18:30',
  openingHoursDisplay: 'Mon–Sat, 9:30 am – 6:30 pm',
  address: {
    streetAddress: '',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '',
    addressCountry: 'IN'
  },
  sameAs: [
    'https://www.facebook.com/Tyrustech'
  ]
} as const;

export const hasAddress = Boolean(site.address.streetAddress && site.address.addressLocality);

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
export const mailLink = `mailto:${site.email}?subject=${encodeURIComponent('Document scanning quote request')}`;

/** Indicative per-page pricing, shared by the calculator, proposal PDF and price tables. */
export const pricingTiers = [
  { label: 'Under 10,000 pages', min: 0, max: 9999, pricePerPage: 2.0, baseDays: 5, example: 5000 },
  { label: '10,000 – 50,000 pages', min: 10000, max: 49999, pricePerPage: 1.6, baseDays: 10, example: 25000 },
  { label: 'Over 50,000 pages', min: 50000, max: Infinity, pricePerPage: 1.2, baseDays: 15, example: 100000 }
] as const;
