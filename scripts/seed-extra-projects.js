const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'frdg.sqlite');
const db = new sqlite3.Database(dbPath);

const sampleProjects = [
  {
    id: '13',
    projectName: 'AuraHealth - AI Telemedicine & Wellness Portal',
    companyName: 'Aura Health Solutions Inc.',
    contactPerson: 'Dr. Sarah Lin',
    contactEmail: 'sarah.lin@aurahealth.io',
    contactPhone: '9876543210',
    industry: 'Healthcare & Telehealth',
    locations: 'India, USA, UAE',
    targetAudience: 'Patients, Licensed Doctors, Caregivers, Insurance Providers',
    productDescription: 'Comprehensive HIPAA-compliant web & mobile healthcare platform providing real-time AI vitals analysis, video consultations, prescription management, and automated appointment scheduling.',
    startDate: '01 Nov 2026',
    endDate: '30 Mar 2027',
    creationDate: '06 Oct 2026',
    lastUpdatedDate: '06 Oct 2026',
    selectedCategoryIds: JSON.stringify(['cat_health', 'cat_ai']),
    selectedTypeIds: JSON.stringify(['type_web', 'type_mobile']),
    selectedModuleIds: JSON.stringify(['mod_patient_portal', 'mod_doctor_dashboard', 'mod_teleconsult', 'mod_e_prescriptions', 'mod_billing']),
    selectedSubModuleIds: JSON.stringify([]),
    selectedSubSubModuleIds: JSON.stringify([]),
    customItems: JSON.stringify({}),
    techStack: JSON.stringify({ frontend: 'Next.js 14, Tailwind CSS', backend: 'Node.js, PostgreSQL', ai: 'NVIDIA DeepSeek, WebRTC', cloud: 'AWS ECS, S3' }),
    architectureFlows: JSON.stringify({}),
    implementationPhases: JSON.stringify([
      { phase: 'Phase 1', title: 'Architecture & HIPAA Compliance Setup', duration: '4 Weeks' },
      { phase: 'Phase 2', title: 'Teleconsultation Engine & Video Call Integration', duration: '6 Weeks' },
      { phase: 'Phase 3', title: 'AI Diagnostics & Prescription Module', duration: '6 Weeks' },
      { phase: 'Phase 4', title: 'UAT, Security Audit & Launch', duration: '4 Weeks' }
    ]),
    paymentSplitup: JSON.stringify({ milestone1: '25%', milestone2: '35%', milestone3: '25%', milestone4: '15%' }),
    excludedItems: JSON.stringify(['Hardware sensor provisioning', 'Third-party medical device manufacturing']),
    companyTemplates: JSON.stringify({}),
    adminNotes: 'High priority client requiring HIPAA verification and WebRTC encrypted video gateway.',
    estimatedBudget: '$45,000 - $60,000',
    status: 'submitted',
    clientId: '3',
    clientName: 'Demo Client',
    clientEmail: 'adil@nutz.com',
    pdfFileName: 'AuraHealth_FRD_Specification.pdf',
    pdfContent: '',
    pdfData: ''
  },
  {
    id: '14',
    projectName: 'SwiftLogistics - Autonomous Fleet & Dispatch Suite',
    companyName: 'Swift Cargo Logistics',
    contactPerson: 'Marcus Vance',
    contactEmail: 'm.vance@swiftcargo.com',
    contactPhone: '9812345678',
    industry: 'Logistics & Supply Chain',
    locations: 'India, Singapore, Germany',
    targetAudience: 'Fleet Managers, Drivers, Warehouse Coordinators, Enterprise Clients',
    productDescription: 'End-to-end fleet tracking and AI-driven route optimization platform featuring real-time GPS telemetry, automated proof of delivery, fuel usage analytics, and ERP integration.',
    startDate: '15 Nov 2026',
    endDate: '15 Apr 2027',
    creationDate: '06 Oct 2026',
    lastUpdatedDate: '06 Oct 2026',
    selectedCategoryIds: JSON.stringify(['cat_logistics']),
    selectedTypeIds: JSON.stringify(['type_web', 'type_mobile_driver']),
    selectedModuleIds: JSON.stringify(['mod_fleet_tracking', 'mod_route_opt', 'mod_driver_app', 'mod_analytics_hub']),
    selectedSubModuleIds: JSON.stringify([]),
    selectedSubSubModuleIds: JSON.stringify([]),
    customItems: JSON.stringify({}),
    techStack: JSON.stringify({ frontend: 'React Native, Next.js', backend: 'Go, PostgreSQL, Redis', maps: 'Mapbox GL API' }),
    architectureFlows: JSON.stringify({}),
    implementationPhases: JSON.stringify([
      { phase: 'Phase 1', title: 'GPS Telemetry & Driver App Core', duration: '5 Weeks' },
      { phase: 'Phase 2', title: 'Route Optimization Algorithm & Dispatcher Dashboard', duration: '6 Weeks' },
      { phase: 'Phase 3', title: 'ERP & Fuel Sensor Integrations', duration: '5 Weeks' }
    ]),
    paymentSplitup: JSON.stringify({ deposit: '30%', progress: '50%', launch: '20%' }),
    excludedItems: JSON.stringify(['OBD-II hardware installation']),
    companyTemplates: JSON.stringify({}),
    adminNotes: 'Integration with Mapbox and custom IoT telemetry protocols required.',
    estimatedBudget: '$55,000 - $75,000',
    status: 'under_review',
    clientId: '3',
    clientName: 'Demo Client',
    clientEmail: 'adil@nutz.com',
    pdfFileName: 'SwiftLogistics_FRD_Specification.pdf',
    pdfContent: '',
    pdfData: ''
  },
  {
    id: '15',
    projectName: 'FinPulse - NeoBank & Digital Wealth Management',
    companyName: 'FinPulse Capital Technologies',
    contactPerson: 'Vikramaditya Mehta',
    contactEmail: 'vikram@finpulse.net',
    contactPhone: '9765432109',
    industry: 'Fintech & WealthTech',
    locations: 'India, UK',
    targetAudience: 'Retail Investors, High-Net-Worth Individuals, Financial Advisors',
    productDescription: 'Next-generation digital banking and robo-advisory platform enabling automated micro-investing, multi-currency wallets, instant KYC validation, and personalized portfolio rebalancing.',
    startDate: '10 Dec 2026',
    endDate: '30 May 2027',
    creationDate: '06 Oct 2026',
    lastUpdatedDate: '06 Oct 2026',
    selectedCategoryIds: JSON.stringify(['cat_fintech']),
    selectedTypeIds: JSON.stringify(['type_mobile_ios', 'type_mobile_android', 'type_web_portal']),
    selectedModuleIds: JSON.stringify(['mod_kyc_verification', 'mod_digital_wallet', 'mod_robo_advisor', 'mod_transaction_ledger']),
    selectedSubModuleIds: JSON.stringify([]),
    selectedSubSubModuleIds: JSON.stringify([]),
    customItems: JSON.stringify({}),
    techStack: JSON.stringify({ frontend: 'Flutter, Tailwind CSS', backend: 'Java Spring Boot, PostgreSQL', security: 'Plaid API, AES-256 Encryption' }),
    architectureFlows: JSON.stringify({}),
    implementationPhases: JSON.stringify([
      { phase: 'Phase 1', title: 'Banking Security & Multi-Currency Engine', duration: '6 Weeks' },
      { phase: 'Phase 2', title: 'Robo-Advisory AI & Portfolio Management', duration: '7 Weeks' },
      { phase: 'Phase 3', title: 'Mobile Apps & Instant KYC Verification', duration: '5 Weeks' }
    ]),
    paymentSplitup: JSON.stringify({ milestone1: '30%', milestone2: '40%', milestone3: '30%' }),
    excludedItems: JSON.stringify(['Financial license applications', 'Physical credit card issuance']),
    companyTemplates: JSON.stringify({}),
    adminNotes: 'SOC2 & PCI-DSS compliance audits necessary prior to public release.',
    estimatedBudget: '$80,000 - $110,000',
    status: 'approved',
    clientId: '2',
    clientName: 'Demo Client',
    clientEmail: 'client@example.com',
    pdfFileName: 'FinPulse_FRD_Specification.pdf',
    pdfContent: '',
    pdfData: ''
  },
  {
    id: '16',
    projectName: 'EduSpark - Interactive VR Learning & Campus Portal',
    companyName: 'EduSpark Learning Labs',
    contactPerson: 'Dr. Anita Desai',
    contactEmail: 'anita@eduspark.org',
    contactPhone: '9823456712',
    industry: 'EdTech & E-Learning',
    locations: 'Global',
    targetAudience: 'Students, Educators, School Administrators, Parents',
    productDescription: 'Gamified multi-tenant learning management system with live interactive virtual classrooms, automated grading, parent progress tracking, and AI-driven personalized tutoring modules.',
    startDate: '01 Jan 2027',
    endDate: '30 Jun 2027',
    creationDate: '06 Oct 2026',
    lastUpdatedDate: '06 Oct 2026',
    selectedCategoryIds: JSON.stringify(['cat_edtech']),
    selectedTypeIds: JSON.stringify(['type_web', 'type_pwa']),
    selectedModuleIds: JSON.stringify(['mod_virtual_classroom', 'mod_course_builder', 'mod_assessment_engine', 'mod_student_analytics']),
    selectedSubModuleIds: JSON.stringify([]),
    selectedSubSubModuleIds: JSON.stringify([]),
    customItems: JSON.stringify({}),
    techStack: JSON.stringify({ frontend: 'Next.js 14, Three.js', backend: 'Node.js, MongoDB', streaming: 'Agora RTC SDK' }),
    architectureFlows: JSON.stringify({}),
    implementationPhases: JSON.stringify([
      { phase: 'Phase 1', title: 'LMS Platform & Multi-Tenant Architecture', duration: '4 Weeks' },
      { phase: 'Phase 2', title: 'Interactive VR & Live Video Classrooms', duration: '6 Weeks' },
      { phase: 'Phase 3', title: 'AI Automated Grading & Parent Portal', duration: '5 Weeks' }
    ]),
    paymentSplitup: JSON.stringify({ initial: '25%', beta: '50%', launch: '25%' }),
    excludedItems: JSON.stringify(['Curriculum content creation']),
    companyTemplates: JSON.stringify({}),
    adminNotes: 'Multi-tenant white-label branding engine included.',
    estimatedBudget: '$35,000 - $50,000',
    status: 'draft',
    clientId: '1',
    clientName: 'Nutz Admin',
    clientEmail: 'admin@nutz.in',
    pdfFileName: 'EduSpark_FRD_Specification.pdf',
    pdfContent: '',
    pdfData: ''
  },
  {
    id: '17',
    projectName: 'OmniRetail - AI Hyperlocal E-Commerce Platform',
    companyName: 'OmniRetail Global Pte',
    contactPerson: 'Siddharth Rao',
    contactEmail: 'siddharth@omniretail.io',
    contactPhone: '9912345670',
    industry: 'Retail & E-Commerce',
    locations: 'India, Southeast Asia',
    targetAudience: 'Local Merchants, Shoppers, Delivery Partners',
    productDescription: 'Multi-vendor quick-commerce marketplace connecting neighborhood stores with consumers. Features dynamic inventory sync, 30-minute delivery dispatch, unified payment gateway, and merchant analytics.',
    startDate: '20 Jan 2027',
    endDate: '30 Jul 2027',
    creationDate: '06 Oct 2026',
    lastUpdatedDate: '06 Oct 2026',
    selectedCategoryIds: JSON.stringify(['cat_ecommerce']),
    selectedTypeIds: JSON.stringify(['type_web', 'type_mobile']),
    selectedModuleIds: JSON.stringify(['mod_vendor_portal', 'mod_customer_app', 'mod_order_fulfillment', 'mod_payment_gateway']),
    selectedSubModuleIds: JSON.stringify([]),
    selectedSubSubModuleIds: JSON.stringify([]),
    customItems: JSON.stringify({}),
    techStack: JSON.stringify({ frontend: 'Next.js 14, React Native', backend: 'Node.js, Express, PostgreSQL', payments: 'Stripe, Razorpay' }),
    architectureFlows: JSON.stringify({}),
    implementationPhases: JSON.stringify([
      { phase: 'Phase 1', title: 'Multi-Vendor Architecture & Catalog Engine', duration: '5 Weeks' },
      { phase: 'Phase 2', title: 'Hyperlocal Dispatch & Delivery App', duration: '6 Weeks' },
      { phase: 'Phase 3', title: 'Payment Gateways & Merchant Analytics', duration: '4 Weeks' }
    ]),
    paymentSplitup: JSON.stringify({ upfront: '35%', milestone: '45%', completion: '20%' }),
    excludedItems: JSON.stringify(['Physical warehouse acquisition']),
    companyTemplates: JSON.stringify({}),
    adminNotes: 'High-density concurrency testing needed for peak flash sale events.',
    estimatedBudget: '$60,000 - $85,000',
    status: 'submitted',
    clientId: '3',
    clientName: 'Demo Client',
    clientEmail: 'adil@nutz.com',
    pdfFileName: 'OmniRetail_FRD_Specification.pdf',
    pdfContent: '',
    pdfData: ''
  }
];

const insertSql = `
  INSERT INTO projects (
    id, projectName, companyName, contactPerson, contactEmail, contactPhone,
    industry, locations, targetAudience, productDescription, startDate, endDate,
    creationDate, lastUpdatedDate, selectedCategoryIds, selectedTypeIds,
    selectedModuleIds, selectedSubModuleIds, selectedSubSubModuleIds,
    customItems, techStack, architectureFlows, implementationPhases,
    paymentSplitup, excludedItems, companyTemplates, adminNotes,
    estimatedBudget, status, clientId, clientName, clientEmail,
    pdfFileName, pdfContent, pdfData, createdAt, updatedAt
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
  )
`;

db.serialize(() => {
  const stmt = db.prepare(insertSql);
  sampleProjects.forEach((p) => {
    stmt.run(
      p.id, p.projectName, p.companyName, p.contactPerson, p.contactEmail, p.contactPhone,
      p.industry, p.locations, p.targetAudience, p.productDescription, p.startDate, p.endDate,
      p.creationDate, p.lastUpdatedDate, p.selectedCategoryIds, p.selectedTypeIds,
      p.selectedModuleIds, p.selectedSubModuleIds, p.selectedSubSubModuleIds,
      p.customItems, p.techStack, p.architectureFlows, p.implementationPhases,
      p.paymentSplitup, p.excludedItems, p.companyTemplates, p.adminNotes,
      p.estimatedBudget, p.status, p.clientId, p.clientName, p.clientEmail,
      p.pdfFileName, p.pdfContent, p.pdfData,
      (err) => {
        if (err) {
          console.error(`Error inserting project ${p.id}:`, err.message);
        } else {
          console.log(`Successfully created project ${p.id}: ${p.projectName}`);
        }
      }
    );
  });
  stmt.finalize();
});

db.close(() => {
  console.log('Database connection closed.');
});
