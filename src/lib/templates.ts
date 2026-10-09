import fs from 'fs';
import path from 'path';
import {
  NUTZ_COMPANY_INFO,
  FIXED_PROJECT_REQUIREMENTS,
  FIXED_PROJECT_DELIVERABLES,
  DEFAULT_TECH_STACK,
  FIXED_COMMUNICATION,
  DEFAULT_ADDITIONAL_PRICING,
  FIXED_PROJECT_AGREEMENTS,
  STANDARD_EXCLUDED_ITEMS,
  DEFAULT_PAYMENT_SPLITUPS
} from '@/data/nutzTemplate';
import { TechStackConfig, ImplementationPhase, ArchitectureFlows } from '@/types';

export interface RequirementItem {
  id: string;
  requirement: string;
  when: string;
  responsibility: 'Client' | 'Nutz' | 'Both';
  enabled: boolean;
  order: number;
}

export interface DeliverableItem {
  id: string;
  deliverable: string;
  stage: string;
  responsibility: 'Nutz' | 'Client' | 'Both';
  order: number;
}

export interface CommunicationItem {
  id: string;
  function: string;
  means: string;
  notes: string;
  order: number;
}

export interface AdditionalPricingItem {
  id: string;
  function: string;
  provider: string;
  estimate: string;
  notes?: string;
  order: number;
}

export interface AgreementItem {
  id: string;
  agreement: string;
  order: number;
}

export interface TemplateVersion {
  versionId: string;
  versionNumber: number;
  timestamp: string;
  author: string;
  notes: string;
  snapshot: any;
}

export interface CompanyTemplatePreset {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  companyInfo: {
    name: string;
    developmentTeam: string;
    defaultDuration: string;
    tagline: string;
    supportDays: number;
  };
  requirements: RequirementItem[];
  deliverables: DeliverableItem[];
  techStack: TechStackConfig;
  communication: CommunicationItem[];
  additionalPricing: AdditionalPricingItem[];
  architectureFlows: {
    overallSystemFlow: string;
    highLevelArchitectureFlow: string;
    adminFlow: string;
    phaseWiseFlow?: string;
  };
  scopeDefaults: {
    strategicObjectives: string;
    corporateProfile: string;
    domainsFootprint: string;
  };
  implementationPhases: ImplementationPhase[];
  paymentSplitups: typeof DEFAULT_PAYMENT_SPLITUPS;
  standardExclusions: string[];
  agreements: AgreementItem[];
  versionHistory: TemplateVersion[];
}

export interface CompanyTemplateStore {
  activeTemplateId: string;
  templates: CompanyTemplatePreset[];
}

const dataDir = path.join(process.cwd(), 'data');
const templatesFilePath = path.join(dataDir, 'companyTemplates.json');

const DEFAULT_OVERALL_SYSTEM_FLOW = `[ Client Devices / Browsers ]
       │  (HTTPS / REST / WebSocket)
       ▼
[ Cloud Edge / CDN & API Gateway ]
       │  (JWT Auth & Rate Limiting)
       ▼
[ Core Application Services Engine ]
       │  (Microservices & Business Logic)
       ├──► [ Primary SQL Database (PostgreSQL) ]
       ├──► [ Memory Cache & Queue (Redis) ]
       └──► [ Third-Party Integrations (SMS/Email/Payments) ]`;

const DEFAULT_HIGH_LEVEL_ARCH_FLOW = `+-----------------------------------------------------------+
|                    PRESENTATION TIER                      |
|  Next.js 14 Responsive Web App • Shadcn/UI • Tailwind     |
+-----------------------------┬-----------------------------+
                              │ REST / JSON APIs
+-----------------------------▼-----------------------------+
|                     APPLICATION TIER                      |
|  Node.js / Express Backend • Business Rules Engine        |
|  Role-Based Access Control • Audit Logging Service        |
+-----------------------------┬-----------------------------+
                              │ Prisma / Sequelize ORM
+-----------------------------▼-----------------------------+
|                      DATA STORE TIER                      |
|  PostgreSQL RDBMS • Cloud Storage • Third-Party Gateways  |
+-----------------------------------------------------------+`;

const DEFAULT_ADMIN_FLOW = `[ Administrator Login ] ──► [ Multi-Factor Authentication ]
                                    │
                                    ▼
                          [ Admin Control Console ]
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
[ User & Role Management ]   [ Data Inspection & CMS ]   [ Audit Logs & Reports ]`;

const DEFAULT_PHASE_WISE_FLOW = `Phase 1 (Setup & Specs)    ──► Requirements Sign-off & Architecture Setup
Phase 2 (Core Modules)     ──► Core Engine, Database Schemas & API Layer
Phase 3 (Integrations)     ──► Third-Party APIs, UI Workflows & Notifications
Phase 4 (UAT & Rollout)    ──► Quality Assurance, Production Deployment & SLA Handover`;

function getDefaultStore(): CompanyTemplateStore {
  const initialRequirements: RequirementItem[] = FIXED_PROJECT_REQUIREMENTS.map((r, idx) => ({
    id: `req-${idx + 1}`,
    requirement: r.requirement,
    when: r.when,
    responsibility: (r.responsibility as any) || 'Client',
    enabled: true,
    order: idx + 1,
  }));

  const initialDeliverables: DeliverableItem[] = FIXED_PROJECT_DELIVERABLES.map((d, idx) => ({
    id: `del-${idx + 1}`,
    deliverable: d.deliverable,
    stage: d.stage,
    responsibility: (d.responsibility as any) || 'Nutz',
    order: idx + 1,
  }));

  const initialCommunication: CommunicationItem[] = FIXED_COMMUNICATION.map((c, idx) => ({
    id: `comm-${idx + 1}`,
    function: c.function,
    means: c.means,
    notes: c.notes,
    order: idx + 1,
  }));

  const initialPricing: AdditionalPricingItem[] = DEFAULT_ADDITIONAL_PRICING.map((p, idx) => ({
    id: `price-${idx + 1}`,
    function: p.function,
    provider: p.provider,
    estimate: p.estimate,
    notes: 'Standard commercial third-party rate',
    order: idx + 1,
  }));

  const initialAgreements: AgreementItem[] = FIXED_PROJECT_AGREEMENTS.map((a, idx) => ({
    id: `agr-${idx + 1}`,
    agreement: a,
    order: idx + 1,
  }));

  const initialPhases: ImplementationPhase[] = [
    {
      phase: 1,
      title: "Phase 1: Architecture Blueprint, Entity Schema & Setup",
      duration: "15 Working Days",
      modules: ["Infrastructure Provisioning", "Database Schemas", "Authentication & Security"],
      description: "Project kick-off, environment configuration, database structure design, and base API frameworks."
    },
    {
      phase: 2,
      title: "Phase 2: Core Capability Modules & Data Management",
      duration: "15 Working Days",
      modules: ["Domain Operations", "Business Workflows", "API Endpoints"],
      description: "Implementation of primary business modules, transaction pipelines, and core functional services."
    },
    {
      phase: 3,
      title: "Phase 3: Integrations, User Portals & Automation",
      duration: "15 Working Days",
      modules: ["External Gateways", "User Portals", "Notification Services"],
      description: "Third-party gateway integrations, responsive web interfaces, and automated notification services."
    },
    {
      phase: 4,
      title: "Phase 4: End-to-End Testing, UAT, Deployment & Handover",
      duration: "15 Working Days",
      modules: ["Quality Assurance", "Production Rollout", "30-Day Support Initiation"],
      description: "Comprehensive testing, security hardening, user acceptance sign-off, live deployment, and warranty commencement."
    }
  ];

  const defaultPreset: CompanyTemplatePreset = {
    id: 'tpl-default-enterprise',
    name: 'Official Enterprise Specification Standard',
    description: 'Nutz Technovation standard master template for enterprise applications and digital transformations.',
    isDefault: true,
    companyInfo: {
      name: NUTZ_COMPANY_INFO.name,
      developmentTeam: "Nutz Technovation Private Limited",
      defaultDuration: "60 Working Days",
      tagline: NUTZ_COMPANY_INFO.tagline,
      supportDays: 30
    },
    requirements: initialRequirements,
    deliverables: initialDeliverables,
    techStack: { ...DEFAULT_TECH_STACK },
    communication: initialCommunication,
    additionalPricing: initialPricing,
    architectureFlows: {
      overallSystemFlow: DEFAULT_OVERALL_SYSTEM_FLOW,
      highLevelArchitectureFlow: DEFAULT_HIGH_LEVEL_ARCH_FLOW,
      adminFlow: DEFAULT_ADMIN_FLOW,
      phaseWiseFlow: DEFAULT_PHASE_WISE_FLOW
    },
    scopeDefaults: {
      strategicObjectives: "Deliver a robust, scalable, enterprise-grade digital platform engineered for high performance, modular maintainability, and seamless stakeholder workflows.",
      corporateProfile: "Enterprise Corporate Entity Profile and Business Transformation Footprint.",
      domainsFootprint: "Comprehensive Modular Web and Cloud Platform Footprint."
    },
    implementationPhases: initialPhases,
    paymentSplitups: DEFAULT_PAYMENT_SPLITUPS,
    standardExclusions: [
      ...STANDARD_EXCLUDED_ITEMS,
      "Native iOS & Android Mobile Applications and App Store / Play Store Submissions (Scope is restricted to Responsive Web Application).",
      "Payment Gateway Direct Merchant Settlement, Automated Recurring Subscriptions, and PCI-DSS Financial Banking Compliance.",
      "Third-Party Hardware Devices, POS Thermal Receipt Printers, Biometric Terminals, and IoT Sensor Firmware.",
      "Custom Machine Learning Model Fine-Tuning and Dedicated GPU Training Cluster Maintenance.",
      "Multi-Tenant Enterprise White-Labeling and Wildcard Sub-Domain DNS Automation.",
      "Mass WhatsApp Marketing Broadcasting API Infrastructure and Cold Email Warmup Services.",
      "Manual Data Entry, Legacy Database Cleansing, and Historical Paper Document OCR Scanning."
    ],
    agreements: initialAgreements,
    versionHistory: [
      {
        versionId: 'v-1.0',
        versionNumber: 1,
        timestamp: new Date().toISOString(),
        author: 'System Administrator',
        notes: 'Master company template initialization covering all 10 PDF sections.',
        snapshot: null,
      },
    ],
  };

  return {
    activeTemplateId: 'tpl-default-enterprise',
    templates: [defaultPreset],
  };
}

export function getCompanyTemplateStore(): CompanyTemplateStore {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    if (!fs.existsSync(templatesFilePath)) {
      const defaultStore = getDefaultStore();
      fs.writeFileSync(templatesFilePath, JSON.stringify(defaultStore, null, 2), 'utf-8');
      return defaultStore;
    }

    const fileData = fs.readFileSync(templatesFilePath, 'utf-8');
    const store = JSON.parse(fileData);

    // Ensure all 10 section fields exist in existing templates
    store.templates = store.templates.map((tpl: any) => {
      const def = getDefaultStore().templates[0];

      // Ensure all 13 standard project agreements are always present
      let agreements = Array.isArray(tpl.agreements) && tpl.agreements.length > 0 ? tpl.agreements : def.agreements;
      if (agreements.length < FIXED_PROJECT_AGREEMENTS.length) {
        const existingTexts = new Set(agreements.map((a: any) => (typeof a === 'string' ? a : a.agreement).trim().toLowerCase()));
        const missing = FIXED_PROJECT_AGREEMENTS.filter(a => !existingTexts.has(a.trim().toLowerCase())).map((a, idx) => ({
          id: `agr-${agreements.length + idx + 1}`,
          agreement: a,
          order: agreements.length + idx + 1,
        }));
        agreements = [...agreements, ...missing];
      }

      return {
        ...def,
        ...tpl,
        companyInfo: { ...def.companyInfo, ...(tpl.companyInfo || {}) },
        architectureFlows: { ...def.architectureFlows, ...(tpl.architectureFlows || {}) },
        scopeDefaults: { ...def.scopeDefaults, ...(tpl.scopeDefaults || {}) },
        techStack: { ...def.techStack, ...(tpl.techStack || {}) },
        paymentSplitups: { ...def.paymentSplitups, ...(tpl.paymentSplitups || {}) },
        standardExclusions: tpl.standardExclusions || def.standardExclusions,
        agreements,
      };
    });

    return store;
  } catch (err) {
    console.error('Error reading company templates store:', err);
    return getDefaultStore();
  }
}

export function saveCompanyTemplateStore(store: CompanyTemplateStore): boolean {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(templatesFilePath, JSON.stringify(store, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving company templates store:', err);
    return false;
  }
}

export async function getCompanyTemplateStoreAsync(): Promise<CompanyTemplateStore> {
  try {
    const { initDb, CompanyTemplateStoreModel } = await import('@/lib/db');
    await initDb();
    const record = await CompanyTemplateStoreModel.findByPk('current_store');
    if (record && record.payload) {
      const store: CompanyTemplateStore = JSON.parse(record.payload);
      if (Array.isArray(store.templates)) {
        store.templates = store.templates.map((tpl: any) => {
          let agreements = Array.isArray(tpl.agreements) && tpl.agreements.length > 0 ? tpl.agreements : [];
          if (agreements.length < FIXED_PROJECT_AGREEMENTS.length) {
            const existingTexts = new Set(agreements.map((a: any) => (typeof a === 'string' ? a : a.agreement).trim().toLowerCase()));
            const missing = FIXED_PROJECT_AGREEMENTS.filter(a => !existingTexts.has(a.trim().toLowerCase())).map((a, idx) => ({
              id: `agr-${agreements.length + idx + 1}`,
              agreement: a,
              order: agreements.length + idx + 1,
            }));
            agreements = [...agreements, ...missing];
          }
          return { ...tpl, agreements };
        });
      }
      return store;
    }
  } catch (err) {
    console.error('SQLite template store read error:', err);
  }
  const store = getCompanyTemplateStore();
  try {
    const { CompanyTemplateStoreModel } = await import('@/lib/db');
    await CompanyTemplateStoreModel.upsert({
      id: 'current_store',
      payload: JSON.stringify(store),
    });
  } catch (e) { }
  return store;
}

export async function saveCompanyTemplateStoreAsync(store: CompanyTemplateStore): Promise<boolean> {
  saveCompanyTemplateStore(store);
  try {
    const { initDb, CompanyTemplateStoreModel } = await import('@/lib/db');
    await initDb();
    await CompanyTemplateStoreModel.upsert({
      id: 'current_store',
      payload: JSON.stringify(store),
    });
    return true;
  } catch (err) {
    console.error('SQLite template store save error:', err);
    return false;
  }
}

export function getActiveTemplate(): CompanyTemplatePreset {
  const store = getCompanyTemplateStore();
  const active = store.templates.find((t) => t.id === store.activeTemplateId);
  return active || store.templates[0] || getDefaultStore().templates[0];
}
