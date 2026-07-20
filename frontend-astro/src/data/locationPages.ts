export const locationPages = [
  {
    slug: 'bangalore',
    city: 'Bangalore',
    region: 'Karnataka',
    nearby: 'Bengaluru, Whitefield, Electronic City, Manyata Tech Park, Peenya, Yeshwanthpur and surrounding business hubs',
    industries: ['Hospitals and MRD departments', 'Banks and NBFCs', 'IT and enterprise offices', 'Legal and compliance teams', 'Education institutions'],
    intro: 'Tyrus supports Bangalore organizations with document scanning, document digitization, bulk archive conversion, onsite document scanning, OCR indexing and DMS-ready digital records.'
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    region: 'Maharashtra',
    nearby: 'Mumbai, Navi Mumbai, Thane, Andheri, BKC, Lower Parel and nearby corporate locations',
    industries: ['Banks and financial services', 'Insurance operations', 'Hospitals', 'Legal firms', 'Corporate record rooms'],
    intro: 'Tyrus helps Mumbai teams convert paper-heavy archives into searchable digital records for audit, compliance, retrieval and long-term storage.'
  },
  {
    slug: 'delhi-ncr',
    city: 'Delhi NCR',
    region: 'Delhi NCR',
    nearby: 'Delhi, Noida, Gurugram, Faridabad, Ghaziabad and NCR business districts',
    industries: ['Government departments', 'Corporate offices', 'Hospitals', 'Legal teams', 'Education and public-sector archives'],
    intro: 'Tyrus provides Delhi NCR document scanning and digitization services for confidential files, government archives, legal records, KYC documents and bulk backlogs.'
  },
  {
    slug: 'chennai',
    city: 'Chennai',
    region: 'Tamil Nadu',
    nearby: 'Chennai, Ambattur, Guindy, T Nagar, OMR, Sriperumbudur and nearby industrial corridors',
    industries: ['Manufacturing units', 'Healthcare groups', 'Banks and NBFCs', 'Education institutions', 'Corporate record rooms'],
    intro: 'Tyrus supports Chennai organizations with secure document scanning, OCR indexing, bulk scanning and DMS-ready archives for operational and compliance records.'
  },
  {
    slug: 'hyderabad',
    city: 'Hyderabad',
    region: 'Telangana',
    nearby: 'Hyderabad, HITEC City, Gachibowli, Secunderabad, Kukatpally and surrounding office locations',
    industries: ['IT and enterprise teams', 'Hospitals', 'Banks and NBFCs', 'Government archives', 'Legal and HR teams'],
    intro: 'Tyrus provides Hyderabad document digitization services for paper files, medical records, HR records, KYC archives and searchable digital repositories.'
  },
  {
    slug: 'pune',
    city: 'Pune',
    region: 'Maharashtra',
    nearby: 'Pune, Hinjewadi, Pimpri-Chinchwad, Baner, Kharadi and industrial office locations',
    industries: ['Manufacturing and automotive teams', 'IT companies', 'Hospitals', 'Education institutions', 'Finance and HR teams'],
    intro: 'Tyrus helps Pune organizations scan, index and digitize bulk records with onsite or offsite project models and structured digital handover.'
  },
  {
    slug: 'kochi',
    city: 'Kochi',
    region: 'Kerala',
    nearby: 'Kochi, Ernakulam, Kakkanad, Infopark, Kalamassery and nearby business locations',
    industries: ['Hospitals', 'Education institutions', 'Corporate offices', 'Finance teams', 'Legal and government records'],
    intro: 'Tyrus supports Kochi and Kerala teams with document scanning, OCR indexing, medical record digitization and secure archive conversion.'
  },
  {
    slug: 'coimbatore',
    city: 'Coimbatore',
    region: 'Tamil Nadu',
    nearby: 'Coimbatore, Peelamedu, Gandhipuram, RS Puram, Tiruppur and nearby industrial areas',
    industries: ['Manufacturing and textile businesses', 'Hospitals', 'Education institutions', 'Finance teams', 'Corporate record rooms'],
    intro: 'Tyrus helps Coimbatore businesses convert paper records into searchable digital archives with bulk scanning, onsite scanning and indexing workflows.'
  }
];

export const locationServices = [
  'Document scanning services',
  'Document digitization services',
  'Bulk document scanning services',
  'Onsite document scanning services',
  'OCR indexing services',
  'Medical record digitization',
  'Banking KYC document scanning',
  'Government record digitization',
  'Legal document scanning',
  'HR document digitization'
];

const priorityLocationSlugs = ['bangalore', 'mumbai', 'delhi-ncr', 'chennai', 'hyderabad', 'pune'];

export const serviceLocationTypes = [
  {
    slug: 'document-scanning-services',
    label: 'Document scanning services',
    titlePrefix: 'Document Scanning Services',
    keyword: 'document scanning services',
    serviceIntro:
      'secure scanning, OCR indexing, metadata capture, searchable PDF delivery and DMS-ready handover',
    primaryNeed:
      'turn physical files, forms, records and archive boxes into searchable digital files'
  },
  {
    slug: 'document-digitization-company',
    label: 'Document digitization company',
    titlePrefix: 'Document Digitization Company',
    keyword: 'document digitization company',
    serviceIntro:
      'end-to-end paper-to-digital conversion, scanning, OCR, indexing, data capture and digital archive planning',
    primaryNeed:
      'choose a reliable digitization partner for long-term paper-to-digital records conversion'
  },
  {
    slug: 'bulk-document-scanning',
    label: 'Bulk document scanning',
    titlePrefix: 'Bulk Document Scanning',
    keyword: 'bulk document scanning',
    serviceIntro:
      'high-volume scanning for cartons, branch archives, record rooms, legacy files and multi-location backlogs',
    primaryNeed:
      'clear large record-room backlogs with batching, file tracking, image quality checks and index reports'
  }
];

export const serviceLocationPages = priorityLocationSlugs.flatMap((locationSlug) => {
  const location = locationPages.find((item) => item.slug === locationSlug);
  if (!location) return [];

  return serviceLocationTypes.map((service) => ({
    citySlug: location.slug,
    serviceSlug: service.slug,
    location,
    service
  }));
});
