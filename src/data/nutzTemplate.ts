export const NUTZ_COMPANY_INFO = {
  name: "Nutz Technovation Private Limited",
  tagline: "making sense",
  logoText: "nutz",
  registered: "®",
  defaultProjectDurationDays: 60,
};

export const FIXED_PROJECT_REQUIREMENTS = [
  { requirement: "Functional Requirement Document (FRD)", when: "Before project commencement", responsibility: "Client" },
  { requirement: "User Stories & Business Workflows", when: "Before project commencement", responsibility: "Client" },
  { requirement: "UI/UX Design Approval", when: "Before project commencement", responsibility: "Client" },
  { requirement: "Brand Assets (Logo, Images, Icons & Content)", when: "Before project commencement", responsibility: "Client" },
  { requirement: "Domain & DNS Access", when: "Before deployment", responsibility: "Client" },
  { requirement: "Server / VPS Access", when: "Before deployment", responsibility: "Client" },
  { requirement: "WhatsApp Business API", when: "Before integration", responsibility: "Client" },
  { requirement: "SMS Gateway Credentials", when: "Before integration", responsibility: "Client" },
  { requirement: "Payment Gateway Credentials", when: "Before integration", responsibility: "Client" },
];

export const FIXED_PROJECT_DELIVERABLES = [
  { deliverable: "Complete Source Code", stage: "Maintenance", responsibility: "Nutz" },
  { deliverable: "Deployment & Production Rollout", stage: "Maintenance", responsibility: "Nutz" },
  { deliverable: "Knowledge Transfer", stage: "Maintenance", responsibility: "Nutz" },
  { deliverable: "30 Days Support & Maintenance", stage: "Maintenance", responsibility: "Nutz" },
  { deliverable: "Server Credentials, User Manuals, Configuration Documents & Deployment Guides", stage: "Maintenance", responsibility: "Nutz" },
  { deliverable: "Architecture Documents, API Documentation, Database Design, UI/UX Assets & Technical Guides", stage: "Maintenance", responsibility: "Nutz" },
];

export const DEFAULT_TECH_STACK = {
  frontendFramework: "Next.js / React.js / Angular",
  backendRuntime: "Node.js / Python / Go",
  backendFramework: "Express.js / NestJS / FastAPI",
  database: "PostgreSQL / MySQL / MongoDB",
  orm: "Prisma / Drizzle ORM / Sequelize",
  programmingLanguage: "TypeScript / JavaScript / Python",
  uiFramework: "Tailwind CSS / CSS Modules / Bootstrap",
  uiComponents: "Shadcn/UI / Radix UI / Ant Design",
  hosting: "AWS / Vercel / Cloud VPS",
  versionControl: "GitHub / GitLab / Bitbucket",
  ciCd: "GitHub Actions / GitLab CI / Docker",
};

export const FIXED_COMMUNICATION = [
  {
    function: "Development Sync & Updates",
    means: "GitHub, Google Meet, In Person",
    notes: "Sprint planning, development tracking and technical discussions"
  },
  {
    function: "Project Updates",
    means: "WhatsApp, Email, Phone Calls",
    notes: "Official communication, approvals and project status updates"
  }
];

export const DEFAULT_ADDITIONAL_PRICING = [
  { function: "Domain Registration", provider: "Third Party", estimate: "Need to be Purchased" },
  { function: "Hosting / VPS", provider: "AWS / DigitalOcean / Cloud Provider", estimate: "Need to be Purchased" },
  { function: "SMS Gateway", provider: "Third Party", estimate: "Based on Usage" },
  { function: "WhatsApp Business API", provider: "Meta / BSP", estimate: "Based on Conversation Charges" },
];

export const STANDARD_EXCLUDED_ITEMS = [
  "Domain Registration Charges",
  "Hosting & Cloud Server Charges",
  "Third-party API Charges",
  "SMS Credits",
  "WhatsApp Conversation Charges",
  "Payment Gateway Transaction Charges",
  "Government Registration Fees",
  "Additional Modules",
  "Change Requests Beyond Approved Scope"
];

export const FIXED_PROJECT_AGREEMENTS = [
  "Phase 1 payment must be completed before project commencement.",
  "Advance payment for each phase is non-refundable once development has commenced.",
  "The project timeline begins only after receipt of all required assets, approvals and Phase 1 payment.",
  "Each subsequent phase will commence only after successful completion, client approval and payment of the previous phase.",
  "Any additional requirements beyond the approved Functional Requirement Document (FRD) shall be treated as Change Requests and quoted separately.",
  "Additional UI/UX revisions beyond the approved scope may incur extra charges.",
  "The client shall provide all required content, branding assets, credentials and third-party service access.",
  "Project timelines may extend due to delays in client approvals, feedback or pending deliverables.",
  "Source code ownership will be transferred only after full payment of the project.",
  "Production deployment will be performed after successful User Acceptance Testing (UAT).",
  "Support and services will be provided at no cost for a period of 30 days after the project rollout.",
  "Annual Maintenance Contract (AMC) and extended support will be provided under a separate agreement.",
  "This quotation is valid for 30 days from the issue date."
];

export const DEFAULT_PAYMENT_SPLITUPS = {
  '40-30-30': {
    type: '40-30-30' as const,
    totalDurationDays: 60,
    milestones: [
      { name: "Advance Payment (40%)", percentage: 40, timing: "Before Project Commencement" },
      { name: "Midway Milestone (30%)", percentage: 30, timing: "At 30 Working Days" },
      { name: "Project Completion (30%)", percentage: 30, timing: "After UAT & Handover" },
    ]
  },
  '50-50': {
    type: '50-50' as const,
    totalDurationDays: 60,
    milestones: [
      { name: "Advance Payment (50%)", percentage: 50, timing: "Before Project Commencement" },
      { name: "Project Completion (50%)", percentage: 50, timing: "After UAT & Handover" },
    ]
  },
  '40-20-20-20': {
    type: '40-20-20-20' as const,
    totalDurationDays: 60,
    milestones: [
      { name: "Phase 1 Advance (40%)", percentage: 40, timing: "Before Phase 1 Commencement" },
      { name: "Phase 2 Milestone (20%)", percentage: 20, timing: "Upon Phase 1 Delivery & Phase 2 Start" },
      { name: "Phase 3 Milestone (20%)", percentage: 20, timing: "Upon Phase 2 Delivery & Phase 3 Start" },
      { name: "Final Release & Handover (20%)", percentage: 20, timing: "After UAT, Handover & Deployment" },
    ]
  },
  '100': {
    type: '100' as const,
    totalDurationDays: 60,
    milestones: [
      { name: "Full Complete Payment (100%)", percentage: 100, timing: "Before Project Commencement / Upfront" },
    ]
  }
};
