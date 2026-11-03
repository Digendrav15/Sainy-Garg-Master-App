export const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-001',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@gmail.com',
    city: 'New Delhi',
    address: 'B-14 South Extension Part II, New Delhi 110049',
    ordersCount: 3,
    category: 'VIP Bridal',
    notes: 'Prefers pastel tones (blush pink, ivory) with fine hand zardozi and pearl work.'
  },
  {
    id: 'CUST-002',
    name: 'Ananya Verma',
    phone: '+91 98111 22334',
    email: 'ananya.verma@outlook.com',
    city: 'Gurugram',
    address: 'Tower 4, The Magnolias, DLF Phase 5, Golf Course Rd, Gurugram 122009',
    ordersCount: 2,
    category: 'Couture Trousseau',
    notes: 'High neck bespoke blouse cuts, strictly organic pure chanderi linings.'
  },
  {
    id: 'CUST-003',
    name: 'Kavita Singhania',
    phone: '+91 98222 33445',
    email: 'kavita.singhania@heritage.com',
    city: 'Mumbai',
    address: 'Silver Arch, Altamount Road, Cumballa Hill, Mumbai 400026',
    ordersCount: 4,
    category: 'High Net Bespoke',
    notes: 'Royal emerald green velvet and heavy cancan flair preferences.'
  },
  {
    id: 'CUST-004',
    name: 'Radhika Kapoor',
    phone: '+91 98450 11223',
    email: 'radhika.kapoor@gmail.com',
    city: 'Chandigarh',
    address: 'House No. 42, Sector 9-B, Chandigarh 160009',
    ordersCount: 1,
    category: 'Wedding Guest Luxury',
    notes: 'Pre-draped saree gown styles, modern silhouette.'
  },
  {
    id: 'CUST-005',
    name: 'Meera Rajput',
    phone: '+91 98990 44556',
    email: 'meera.rajput@gmail.com',
    city: 'Jaipur',
    address: 'Civil Lines, Near Raj Bhawan, Jaipur 302006',
    ordersCount: 2,
    category: 'Royal Heritage',
    notes: 'Gota patti and dabka embroidery lover, traditional Rajasthani hues.'
  },
  {
    id: 'CUST-006',
    name: 'Sneha Malhotra',
    phone: '+91 98102 77889',
    email: 'sneha.m@malhotragroup.in',
    city: 'Noida',
    address: 'Sector 15A, Noida 201301',
    ordersCount: 1,
    category: 'Cocktail & Evening',
    notes: 'Metallic sequins, plunge neckline, organza trails.'
  },
  {
    id: 'CUST-007',
    name: 'Tanvi Agarwal',
    phone: '+91 98790 33441',
    email: 'tanvi.agarwal@textilesurat.com',
    city: 'Surat',
    address: 'City Light Road, Surat 395007',
    ordersCount: 2,
    category: 'Festive Pret',
    notes: 'Tissue silk anarkalis with delicate hand marodi borders.'
  },
  {
    id: 'CUST-008',
    name: 'Ishita Sen',
    phone: '+91 98300 55667',
    email: 'ishita.sen@heritagebengal.org',
    city: 'Kolkata',
    address: 'Ballygunge Circular Road, Kolkata 700019',
    ordersCount: 1,
    category: 'Contemporary Heritage',
    notes: 'Handspun katan silk dupattas with antique gold zari work.'
  }
];

export const INITIAL_VENDORS = [
  {
    id: 'VND-001',
    name: 'Banaras Pure Weaves',
    category: 'Pure Silk & Chanderi Fabrics',
    contactPerson: 'Rajesh Shah',
    phone: '+91 98210 11223',
    city: 'Varanasi',
    address: 'Chowk Katan Market, Varanasi 221001',
    gstNo: '09AAACB1234F1Z5',
    rating: '⭐⭐⭐⭐⭐ Top Tier',
    terms: '15 Days Credit'
  },
  {
    id: 'VND-002',
    name: 'Royal Organza & Pure Silks',
    category: 'Organza, Tissue & Santoon Lining',
    contactPerson: 'Amit Gupta',
    phone: '+91 98104 55667',
    city: 'Surat',
    address: 'Ring Road Textile Market, Surat 395002',
    gstNo: '24BBBCD5678H1Z8',
    rating: '⭐⭐⭐⭐⭐ Top Tier',
    terms: '30 Days Net'
  },
  {
    id: 'VND-003',
    name: 'Badla & Antique Zari Emporium',
    category: 'Pure Gold & Silver Zari, Resham Threads',
    contactPerson: 'Haji Farooq',
    phone: '+91 98711 22334',
    city: 'Old Delhi',
    address: 'Kinari Bazaar, Chandni Chowk, Delhi 110006',
    gstNo: '07CCCCE9012J1Z2',
    rating: '⭐⭐⭐⭐⭐ Master Supplier',
    terms: 'Immediate / Cash'
  },
  {
    id: 'VND-004',
    name: 'Jaipur Natural Dyeing & Wash House',
    category: 'Organic Dyeing & Custom Shade Matching',
    contactPerson: 'Kailash Sharma',
    phone: '+91 98290 88990',
    city: 'Jaipur',
    address: 'Industrial Dyeing Estate, Sanganer, Jaipur 302029',
    gstNo: '08DDDDF3456K1Z1',
    rating: '⭐⭐⭐⭐ Reliable Partner',
    terms: '7 Days Rolling'
  },
  {
    id: 'VND-005',
    name: 'Luxe Trims, Latkans & Cancan Studio',
    category: 'Couture Cancan, Latkans, YKK Zippers & Cups',
    contactPerson: 'Vikram Mehta',
    phone: '+91 98118 77665',
    city: 'New Delhi',
    address: 'Ajmal Khan Road, Karol Bagh, Delhi 110005',
    gstNo: '07EEEEF7890L1Z4',
    rating: '⭐⭐⭐⭐ Reliable Partner',
    terms: '15 Days Credit'
  },
  {
    id: 'VND-006',
    name: 'French Cut Sequins & Pearl Importers',
    category: 'Micro Cut Sequins, Seed Beads & Swarovskis',
    contactPerson: 'Suresh Jain',
    phone: '+91 98100 44332',
    city: 'Mumbai',
    address: 'Mangaldas Market, Kalbadevi, Mumbai 400002',
    gstNo: '27FFFFG1234M1Z9',
    rating: '⭐⭐⭐⭐⭐ Certified Luxury',
    terms: 'Advance Deposit'
  }
];

export const INITIAL_TRANSPORTERS = [
  {
    id: 'TRN-001',
    name: 'BlueDart Apex Express Cargo',
    serviceType: 'Priority Air Courier (Express 24-48h)',
    contactPerson: 'Ramesh Nair (Key Account Manager)',
    phone: '+91 98200 44556',
    hubCity: 'Delhi-NCR Hub',
    operatingRoutes: 'Domestic Metros, Mumbai, Bangalore, Kolkata, Hyderabad',
    trackingUrl: 'https://www.bluedart.com',
    avgTransitTime: '24-36 Hours'
  },
  {
    id: 'TRN-002',
    name: 'Delhivery Luxury Freight & Courier',
    serviceType: 'Protected Couture Box Transit',
    contactPerson: 'Sanjay Verma',
    phone: '+91 98105 66778',
    hubCity: 'Gurugram Central Hub',
    operatingRoutes: 'Tier 1 & Tier 2 All-India Pin Codes',
    trackingUrl: 'https://www.delhivery.com',
    avgTransitTime: '2-3 Days'
  },
  {
    id: 'TRN-003',
    name: 'Sainy Atelier VIP Chauffeur Van',
    serviceType: 'White-Glove Local Delivery & Home Trial',
    contactPerson: 'Harish Kumar (Atelier Delivery Pilot)',
    phone: '+91 98712 33445',
    hubCity: 'Central Atelier (Delhi)',
    operatingRoutes: 'Delhi, South Ex, Vasant Vihar, Gurugram, Noida',
    trackingUrl: 'Internal GPS Fleet',
    avgTransitTime: 'Same Day (2-4 Hours)'
  },
  {
    id: 'TRN-004',
    name: 'DHL Express Worldwide Luxury',
    serviceType: 'International NRI Express Doorstep Delivery',
    contactPerson: 'Sunita Rao (Global Cargo Desk)',
    phone: '+91 98188 99001',
    hubCity: 'IGI Airport Air Cargo Complex',
    operatingRoutes: 'USA, UK, Canada, UAE, Singapore, Australia',
    trackingUrl: 'https://www.dhl.com',
    avgTransitTime: '3-5 Business Days'
  },
  {
    id: 'TRN-005',
    name: 'DTDC Secure Garment Express',
    serviceType: 'Secured Waterproof Heavy Garment Trunk',
    contactPerson: 'Pradeep Singh',
    phone: '+91 98300 77889',
    hubCity: 'Okhla Industrial Area, Delhi',
    operatingRoutes: 'Punjab, Haryana, Rajasthan, Uttar Pradesh',
    trackingUrl: 'https://www.dtdc.in',
    avgTransitTime: '48 Hours'
  }
];

export const INITIAL_KARIGARS = [
  {
    id: 'KRG-001',
    name: 'Master Salim',
    specialization: 'Senior Stitching Master (Blouses & Bodice Fitting)',
    unit: 'Central Atelier - Tailoring Floor 1',
    phone: '+91 98102 33445',
    skillGrade: 'Grade A+ (Master Tailor)',
    status: 'Active (On Duty)',
    dailyCapacity: '2 Blouses or 1 Fitted Gown / Day'
  },
  {
    id: 'KRG-002',
    name: 'Master Aslam',
    specialization: 'Adda Zardozi, Marodi & Antique Dabka Ustad',
    unit: 'Embroidery Karkhana Unit A (Shahpur Jat)',
    phone: '+91 98710 55667',
    skillGrade: 'Ustad Karigar (30 Yrs Exp)',
    status: 'Active (On Adda Frame)',
    dailyCapacity: 'Full Bridal Lehenga Adda Work'
  },
  {
    id: 'KRG-003',
    name: 'Master Rajesh',
    specialization: 'Women Master 1 (Lehenga Panel Flare & Cancan Tailoring)',
    unit: 'Central Atelier - Tailoring Floor 2',
    phone: '+91 98114 66778',
    skillGrade: 'Grade A (Master Flare Specialist)',
    status: 'Active (On Duty)',
    dailyCapacity: '1 Heavy Kalidar Lehenga / Day'
  },
  {
    id: 'KRG-004',
    name: 'Master Rashid',
    specialization: 'Precision Khaka Tracing & Base Fabric Master Cutter',
    unit: 'Cutting & Marking Bay 1',
    phone: '+91 98290 33441',
    skillGrade: 'Grade A+ (Senior Cutter)',
    status: 'Active (Cutting Table)',
    dailyCapacity: '4 Outfits Precision Cut / Day'
  },
  {
    id: 'KRG-005',
    name: 'Quality Lead Sunita',
    specialization: 'First QC Tape Inspector & Dart Correction Specialist',
    unit: 'Quality & Inspection Studio',
    phone: '+91 98180 22334',
    skillGrade: 'Senior QC Inspector',
    status: 'Active (Inspecting)',
    dailyCapacity: '10 Garments 100% Verified / Day'
  },
  {
    id: 'KRG-006',
    name: 'Master Imran',
    specialization: 'Steam Pressing, Hooks, Dori Latkans & Final Packaging',
    unit: 'Finishing & Garment Bag Packing Bay',
    phone: '+91 98760 11223',
    skillGrade: 'Senior Finishing Artisan',
    status: 'Active (Finishing Bay)',
    dailyCapacity: '8 Luxury Outfits Finished / Day'
  }
];

