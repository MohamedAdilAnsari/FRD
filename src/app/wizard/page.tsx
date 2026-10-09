'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { COMPREHENSIVE_TAXONOMY } from '@/data/taxonomy';
import { 
  DEFAULT_TECH_STACK, 
  DEFAULT_PAYMENT_SPLITUPS, 
  FIXED_PROJECT_REQUIREMENTS,
  FIXED_PROJECT_DELIVERABLES,
  DEFAULT_ADDITIONAL_PRICING, 
  FIXED_PROJECT_AGREEMENTS,
  STANDARD_EXCLUDED_ITEMS
} from '@/data/nutzTemplate';
import { 
  ImplementationPhase, 
  ArchitectureFlows, 
  PaymentSplitup, 
  TechStackConfig,
  ProductType
} from '@/types';
import { 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Search, 
  FileText, 
  Check, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  ReceiptText,
  Layers,
  Cpu,
  Workflow,
  Printer,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OfficialNutzDocument } from '@/components/OfficialNutzDocument';
import { GsapLoadingScreen } from '@/components/GsapLoadingScreen';

const STEP_NAMES = [
  'Client & Organization',
  'Project Information',
  'Scope & Goals',
  'Solution Categories',
  'Product Platforms',
  'Module Capabilities',
  'Technology & Hosting',
  'Commercial Splitup',
  'Architecture & Schedule',
  'Review & Export'
];

interface SubModuleQuestionItem {
  id: string; // unique key
  subModuleId: string;
  subModuleName: string;
  moduleId: string;
  moduleName: string;
  productTypeId: string;
  productTypeName: string;
  options: { id: string; name: string; note?: string }[];
}

// Converts a sub-module name into a proper interview-style question
function toQuestion(subModuleName: string, moduleName: string): string {
  const name = subModuleName.trim();
  const lower = name.toLowerCase();

  // Direct question mappings for common sub-module names
  const directMap: Record<string, string> = {
    'login methods': 'Which login methods should your system support?',
    'user roles & permissions': 'What user roles and permission levels are required?',
    'user roles': 'What user roles should the system define?',
    'permissions': 'What permission levels should be configured?',
    'authentication': 'How should users authenticate into the system?',
    'authorization': 'What authorization rules should govern access?',
    'password management': 'How should password policies and resets be handled?',
    'session management': 'How should user sessions be managed?',
    'audit logs': 'What events should be tracked in the audit log?',
    'notifications': 'What notification channels should the system use?',
    'email notifications': 'Which events should trigger email notifications?',
    'sms notifications': 'Which events should trigger SMS notifications?',
    'push notifications': 'Which events should trigger push notifications?',
    'dashboard': 'What key metrics and widgets should appear on the dashboard?',
    'reports': 'What types of reports does the system need to generate?',
    'analytics': 'What analytics and insights should the system provide?',
    'data export': 'In what formats should data be exported?',
    'data import': 'What file formats should be supported for data import?',
    'search & filters': 'What search and filtering capabilities are needed?',
    'file uploads': 'What file types and upload constraints are required?',
    'payment gateway': 'Which payment gateways should be integrated?',
    'payment methods': 'What payment methods should customers be able to use?',
    'invoicing': 'What invoicing and billing features are required?',
    'inventory management': 'How should inventory tracking and alerts be managed?',
    'order management': 'What order lifecycle stages need to be tracked?',
    'customer management': 'What customer data and interactions need to be managed?',
    'product management': 'What product catalog features are needed?',
    'scheduling': 'What scheduling or calendar features are required?',
    'workflow automation': 'Which business processes should be automated?',
    'integrations': 'Which third-party systems need to be integrated?',
    'api access': 'What API access and endpoints need to be exposed?',
    'mobile support': 'What mobile platform support is required?',
    'multi-language': 'Which languages should the system support?',
    'multi-currency': 'Which currencies should the system handle?',
    'multi-tenant': 'How should multi-tenancy be structured?',
    'backup & recovery': 'What backup frequency and recovery options are needed?',
    'security features': 'What security measures should be built into the system?',
    'encryption': 'What data should be encrypted and at what level?',
    'compliance': 'Which compliance standards must the system meet?',
    'gdpr': 'What GDPR or data privacy requirements apply?',
    'sso': 'Which SSO providers should the system support?',
    'two-factor authentication': 'Should two-factor authentication be mandatory or optional?',
    '2fa': 'Should two-factor authentication be mandatory or optional?',
    'chat': 'What chat or messaging features are required?',
    'helpdesk': 'What support ticket and helpdesk workflows are needed?',
    'feedback': 'How should user feedback be collected and managed?',
    'subscription management': 'What subscription plans and billing cycles are needed?',
    'core capabilities': `What core capabilities are required for ${moduleName}?`,
  };

  if (directMap[lower]) return directMap[lower];

  // Pattern-based transformations
  if (lower.startsWith('manage') || lower.endsWith('management')) {
    const subject = name.replace(/^manage\s+/i, '').replace(/\s+management$/i, '');
    return `How should ${subject.toLowerCase()} be managed in the system?`;
  }
  if (lower.includes('type') || lower.includes('method') || lower.includes('mode')) {
    return `Which ${name.toLowerCase()} does the system need to support?`;
  }
  if (lower.includes('setting') || lower.includes('configuration') || lower.includes('config')) {
    return `What ${name.toLowerCase()} options should be configurable?`;
  }
  if (lower.includes('track') || lower.includes('monitor') || lower.includes('log')) {
    return `What should the system track and monitor for ${name.toLowerCase()}?`;
  }
  if (lower.includes('feature') || lower.includes('module')) {
    return `Which ${name.toLowerCase()} capabilities are required?`;
  }

  // Generic fallback
  return `Which ${name.toLowerCase()} options does your project require?`;
}

const EMPTY_TECH_STACK: TechStackConfig = {
  frontendFramework: '',
  backendRuntime: '',
  backendFramework: '',
  database: '',
  orm: '',
  programmingLanguage: '',
  uiFramework: '',
  uiComponents: '',
  hosting: '',
  versionControl: '',
  ciCd: ''
};

function WizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryProjectId = searchParams?.get('id') || searchParams?.get('projectId') || null;

  // Step State (1: Company, 2: Project, 3: Description, 4: Categories, 5: Types, 6: Individual Sub-Module Question Pages, 7: Tech Stack, 8: Payments, 9: AI Gen, 10: Assembly)
  const [currentStep, setCurrentStep] = useState(1);

  // Draft persistence state
  const [draftProjectId, setDraftProjectId] = useState<string | null>(queryProjectId);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [hasLoadedInitialDraft, setHasLoadedInitialDraft] = useState(false);

  const handleStartFresh = async () => {
    if (confirm('Save your current progress to the dashboard and start a new specification?')) {
      try {
        await saveDraft(currentStep, currentQuestionIndex);
      } catch (e) {}
      window.location.href = '/wizard?new=true';
    }
  };

  // Step 1: Company Profile (strictly unfilled with zero test data)
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [locations, setLocations] = useState('');

  // In-app validation errors state
  const [stepErrors, setStepErrors] = useState<{ [field: string]: string }>({});

  const clearFieldError = (field: string) => {
    if (stepErrors[field]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const errs: { [field: string]: string } = {};
    if (!companyName.trim()) {
      errs.companyName = 'Company Name is required.';
    }
    if (!contactPerson.trim()) {
      errs.contactPerson = 'Contact Person is required.';
    }
    if (!contactEmail.trim()) {
      errs.contactEmail = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      errs.contactEmail = 'Please enter a valid email address.';
    }
    const cleanPhone = contactPhone.replace(/\D/g, '');
    if (!contactPhone.trim()) {
      errs.contactPhone = 'Phone number is required.';
    } else if (cleanPhone.length !== 10) {
      errs.contactPhone = 'Phone number must be exactly 10 digits.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.contactPhone = 'Please enter a valid 10-digit Indian mobile number.';
    }
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [field: string]: string } = {};
    if (!projectName.trim()) {
      errs.projectName = 'Project Name is required.';
    }
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2: Project Information (strictly unfilled)
  const [projectName, setProjectName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [expectedDuration, setExpectedDuration] = useState('');

  // Step 3: Product Description
  const [productDescription, setProductDescription] = useState('');

  // Step 4: Categories Selection
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  // Step 5: Product Types
  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([]);
  const [customTypes, setCustomTypes] = useState<Array<{ 
    id: string; 
    categoryId: string; 
    name: string; 
    note?: string;
    mainModules?: Array<{
      id: string;
      name: string;
      subModules: Array<{
        id: string;
        name: string;
        subSubModules?: Array<{ id: string; name: string }>;
      }>;
    }>;
  }>>([]);
  const [newCustomTypeName, setNewCustomTypeName] = useState('');
  const [newCustomTypeNote, setNewCustomTypeNote] = useState('');
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [customTypeModules, setCustomTypeModules] = useState<Array<{ name: string; subModules: string[] }>>([]);
  const [newModuleName, setNewModuleName] = useState('');
  const [newSubModulesText, setNewSubModulesText] = useState('');

  // Step 6: INDIVIDUAL SUB-MODULE QUESTION PAGES
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Selected Option IDs (Sub-Sub-Modules / Capability Options)
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);

  // Per-Question Custom Written Answers / Requirements
  const [questionCustomAnswers, setQuestionCustomAnswers] = useState<{ [subModuleId: string]: string }>({});

  // Dynamically added custom options for any sub-module question
  const [customOptions, setCustomOptions] = useState<{ id: string; subModuleId: string; name: string; note?: string }[]>([]);
  const [newCustomOptionName, setNewCustomOptionName] = useState('');
  const [newCustomOptionNote, setNewCustomOptionNote] = useState('');
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);
  const [questionWarning, setQuestionWarning] = useState<string | null>(null);

  // Step 7: Tech Stack Preferences (Unfilled empty stack by default)
  const [techStack, setTechStack] = useState<TechStackConfig>(EMPTY_TECH_STACK);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  const handleLoadRecommendations = async () => {
    setIsLoadingRecommendations(true);
    try {
      const categoryNames = selectedCategoriesList.map(c => c.name).concat(customCategories);
      const typeNames = availableProductTypes.filter(t => selectedTypeIds.includes(t.id)).map(t => t.name);
      const moduleNames = activeMainModules.map(m => m.name);

      const res = await fetch('/api/ai/tech-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          companyName,
          productDescription,
          selectedCategories: categoryNames,
          selectedTypes: typeNames,
          selectedModules: moduleNames,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.techStack) {
          setTechStack(data.techStack);
          return;
        }
      }
      setTechStack(DEFAULT_TECH_STACK);
    } catch (err) {
      console.warn('Failed to load tech recommendations:', err);
      setTechStack(DEFAULT_TECH_STACK);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Step 8: Payment Splitups
  const [splitupType, setSplitupType] = useState<'40-30-30' | '50-50' | '40-20-20-20' | '100'>('40-30-30');

  // Step 9 & 10: NVIDIA AI Generation State & Results (Exclusions strictly from unselected options)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [architectureFlows, setArchitectureFlows] = useState<ArchitectureFlows | null>(null);
  const [implementationPhases, setImplementationPhases] = useState<ImplementationPhase[]>([]);
  const [excludedItems, setExcludedItems] = useState<string[]>([]);
  const [customPdfName, setCustomPdfName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isRefiningAI, setIsRefiningAI] = useState(false);
  const [masterTemplate, setMasterTemplate] = useState<any>(null);

  // Restore Draft Specification: Start fresh if navigating from Dashboard (/wizard?new=true),
  // and resume from stopped inputs when user clicks Continue (/wizard?id=...)
  useEffect(() => {
    // 1. If user explicitly requested new (?new=true):
    // Always start fresh from Step 1 with blank inputs!
    const isExplicitNew = searchParams?.get('new') === 'true';
    if (isExplicitNew) {
      try {
        localStorage.removeItem('frdg_active_draft_id');
        localStorage.removeItem('frdg_wizard_snapshot');
      } catch (e) {}

      setDraftProjectId(null);
      latestStateRef.current.draftProjectId = null;
      setCompanyName('');
      setContactPerson('');
      setContactEmail('');
      setContactPhone('');
      setIndustry('');
      setLocations('');
      setProjectName('');
      setTargetAudience('');
      setExpectedDuration('60');
      setProductDescription('');
      setSelectedCategoryIds([]);
      setSelectedTypeIds([]);
      setSelectedOptionIds([]);
      setCustomCategories([]);
      setCustomTypes([]);
      setCustomOptions([]);
      setQuestionCustomAnswers({});
      setTechStack(EMPTY_TECH_STACK);
      setSplitupType('40-30-30');
      setArchitectureFlows(null);
      setImplementationPhases([]);
      setExcludedItems([]);
      setCustomPdfName('');
      setCurrentStep(1);
      setCurrentQuestionIndex(0);
      setHasLoadedInitialDraft(true);
      return;
    }

    const applyProjectData = (p: any) => {
      setDraftProjectId(String(p.id));
      latestStateRef.current.draftProjectId = String(p.id);
      try {
        localStorage.setItem('frdg_active_draft_id', String(p.id));
      } catch (e) {}

      if (p.companyName) setCompanyName(p.companyName);
      if (p.contactPerson) setContactPerson(p.contactPerson);
      if (p.contactEmail) setContactEmail(p.contactEmail);
      if (p.contactPhone) {
        let clean = String(p.contactPhone).replace(/\D/g, '');
        if (clean.startsWith('91') && clean.length > 10) clean = clean.slice(2);
        setContactPhone(clean.slice(0, 10));
      }
      if (p.industry) setIndustry(p.industry);
      if (p.locations) setLocations(p.locations);
      if (p.projectName && p.projectName !== 'Draft Specification' && p.projectName !== 'Enterprise Platform Spec') {
        setProjectName(p.projectName);
      }
      if (p.targetAudience) setTargetAudience(p.targetAudience);
      if (p.endDate) setExpectedDuration(p.endDate);
      if (p.productDescription && p.productDescription !== 'Draft specification in progress') {
        setProductDescription(p.productDescription);
      }
      if (Array.isArray(p.selectedCategoryIds)) setSelectedCategoryIds(p.selectedCategoryIds);
      if (Array.isArray(p.selectedTypeIds)) setSelectedTypeIds(p.selectedTypeIds);
      if (Array.isArray(p.selectedSubSubModuleIds)) setSelectedOptionIds(p.selectedSubSubModuleIds);

      // Determine where the user left off
      let restoredStep: number | null = null;
      let restoredQIdx = 0;

      if (p.customItems) {
        if (Array.isArray(p.customItems.customCategories)) setCustomCategories(p.customItems.customCategories);
        if (Array.isArray(p.customItems.customTypes)) setCustomTypes(p.customItems.customTypes);
        if (Array.isArray(p.customItems.customOptions)) setCustomOptions(p.customItems.customOptions);
        if (p.customItems.questionCustomAnswers) setQuestionCustomAnswers(p.customItems.questionCustomAnswers);
        if (p.customItems.splitupType) setSplitupType(p.customItems.splitupType);

        if (typeof p.customItems.currentStep === 'number' && p.customItems.currentStep >= 1 && p.customItems.currentStep <= 10) {
          restoredStep = p.customItems.currentStep;
        }
        if (typeof p.customItems.currentQuestionIndex === 'number' && p.customItems.currentQuestionIndex >= 0) {
          restoredQIdx = p.customItems.currentQuestionIndex;
        }
      }

      // If step wasn't explicitly saved in customItems (e.g. legacy/imported projects), deduce step strictly from user content
      if (restoredStep === null) {
        if (Array.isArray(p.implementationPhases) && p.implementationPhases.length > 0) {
          restoredStep = 10;
        } else if (Array.isArray(p.selectedSubSubModuleIds) && p.selectedSubSubModuleIds.length > 0) {
          restoredStep = 6;
        } else if (Array.isArray(p.selectedTypeIds) && p.selectedTypeIds.length > 0) {
          restoredStep = 5;
        } else if (Array.isArray(p.selectedCategoryIds) && p.selectedCategoryIds.length > 0) {
          restoredStep = 4;
        } else if (p.productDescription && p.productDescription.trim() && p.productDescription !== 'Draft specification in progress') {
          restoredStep = 3;
        } else if (p.projectName && p.projectName.trim() && p.projectName !== 'Draft Specification' && p.projectName !== 'Enterprise Platform Spec') {
          restoredStep = 2;
        } else {
          restoredStep = 1;
        }
      }

      if (p.techStack && Object.keys(p.techStack).length > 0) setTechStack(p.techStack);
      if (p.architectureFlows && Object.keys(p.architectureFlows).length > 0) setArchitectureFlows(p.architectureFlows);
      if (Array.isArray(p.implementationPhases) && p.implementationPhases.length > 0) setImplementationPhases(p.implementationPhases);
      if (Array.isArray(p.excludedItems) && p.excludedItems.length > 0) setExcludedItems(p.excludedItems);
      if (p.pdfFileName) setCustomPdfName(p.pdfFileName);

      // Jump directly to where the user left off
      setCurrentStep(restoredStep);
      setCurrentQuestionIndex(restoredQIdx);
    };

    // 2. ONLY when queryProjectId is present (user clicked "Continue" on an in-progress project):
    if (queryProjectId) {
      // First, restore synchronously from local snapshot if available to avoid any visual flicker
      try {
        const raw = localStorage.getItem('frdg_wizard_snapshot');
        if (raw) {
          const snap = JSON.parse(raw);
          if (snap && String(snap.draftProjectId) === String(queryProjectId)) {
            if (snap.companyName) setCompanyName(snap.companyName);
            if (snap.contactPerson) setContactPerson(snap.contactPerson);
            if (snap.contactEmail) setContactEmail(snap.contactEmail);
            if (snap.contactPhone) setContactPhone(snap.contactPhone);
            if (snap.industry) setIndustry(snap.industry);
            if (snap.locations) setLocations(snap.locations);
            if (snap.projectName) setProjectName(snap.projectName);
            if (snap.targetAudience) setTargetAudience(snap.targetAudience);
            if (snap.expectedDuration) setExpectedDuration(snap.expectedDuration);
            if (snap.productDescription) setProductDescription(snap.productDescription);
            if (Array.isArray(snap.selectedCategoryIds)) setSelectedCategoryIds(snap.selectedCategoryIds);
            if (Array.isArray(snap.selectedTypeIds)) setSelectedTypeIds(snap.selectedTypeIds);
            if (Array.isArray(snap.selectedOptionIds)) setSelectedOptionIds(snap.selectedOptionIds);
            if (Array.isArray(snap.customCategories)) setCustomCategories(snap.customCategories);
            if (Array.isArray(snap.customTypes)) setCustomTypes(snap.customTypes);
            if (Array.isArray(snap.customOptions)) setCustomOptions(snap.customOptions);
            if (snap.questionCustomAnswers) setQuestionCustomAnswers(snap.questionCustomAnswers);
            if (snap.techStack) setTechStack(snap.techStack);
            if (snap.splitupType) setSplitupType(snap.splitupType);
            if (snap.architectureFlows) setArchitectureFlows(snap.architectureFlows);
            if (Array.isArray(snap.implementationPhases)) setImplementationPhases(snap.implementationPhases);
            if (Array.isArray(snap.excludedItems)) setExcludedItems(snap.excludedItems);
            if (snap.customPdfName) setCustomPdfName(snap.customPdfName);

            if (typeof snap.currentStep === 'number' && snap.currentStep >= 1 && snap.currentStep <= 10) {
              setCurrentStep(snap.currentStep);
            }
            if (typeof snap.currentQuestionIndex === 'number' && snap.currentQuestionIndex >= 0) {
              setCurrentQuestionIndex(snap.currentQuestionIndex);
            }
          }
        }
      } catch (e) {}

      fetch(`/api/projects/${queryProjectId}`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data.project) {
            applyProjectData(data.project);
          }
        })
        .catch(err => {
          console.error('Failed to load project to resume:', err);
        })
        .finally(() => setHasLoadedInitialDraft(true));
      return;
    }

    // 3. Fallback if opened without query params (e.g. reload of an active draft)
    const activeDraftId = typeof window !== 'undefined' ? localStorage.getItem('frdg_active_draft_id') : null;
    if (activeDraftId) {
      fetch(`/api/projects/${activeDraftId}`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data.project) {
            applyProjectData(data.project);
          } else {
            setHasLoadedInitialDraft(true);
          }
        })
        .catch(() => setHasLoadedInitialDraft(true));
    } else {
      setHasLoadedInitialDraft(true);
    }
  }, [queryProjectId, searchParams]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          router.push('/login?redirect=/projects');
        }
      })
      .catch(() => {
        router.push('/login?redirect=/projects');
      });

    // Load active Master Template configured by Admin (store template metadata without overriding client inputs)
    fetch('/api/admin/templates')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.store) {
          const active = data.store.templates.find((t: any) => t.id === data.store.activeTemplateId) || data.store.templates[0];
          if (active) {
            setMasterTemplate(active);
          }
        }
      })
      .catch(err => console.error('Error loading master template in wizard:', err));
  }, [router]);

  useEffect(() => {
    if (projectName) {
      setCustomPdfName(`${projectName.replace(/[^a-zA-Z0-9_-]/g, '_')}_FRD.pdf`);
    } else {
      setCustomPdfName('Functional_Requirement_Document.pdf');
    }
  }, [projectName]);

  // Derived taxonomy lists
  const filteredCategories = COMPREHENSIVE_TAXONOMY.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
    cat.code.includes(categorySearch) ||
    cat.description?.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const selectedCategoriesList = COMPREHENSIVE_TAXONOMY.filter(c => selectedCategoryIds.includes(c.id));

  const availableProductTypes: ProductType[] = (selectedCategoriesList.flatMap(c => c.productTypes) as any[]).concat(
    customTypes.map(ct => ({
      id: ct.id,
      name: ct.name,
      note: ct.note,
      mainModules: (Array.isArray(ct.mainModules) ? ct.mainModules : []).map((m: any) => ({
        id: m.id,
        name: m.name,
        subModules: (Array.isArray(m.subModules) ? m.subModules : []).map((s: any) => ({
          id: s.id,
          name: s.name,
          subSubModules: Array.isArray(s.subSubModules) ? s.subSubModules : []
        }))
      }))
    }))
  );

  // Active Compulsory Main Modules from selected product types
  const activeMainModules = availableProductTypes
    .filter(pt => selectedTypeIds.includes(pt.id))
    .flatMap(pt => pt.mainModules);

  // Generate the sequential list of individual Sub-Module Question Pages
  const subModuleQuestions: SubModuleQuestionItem[] = useMemo(() => {
    const list: SubModuleQuestionItem[] = [];

    availableProductTypes
      .filter(pt => selectedTypeIds.includes(pt.id))
      .forEach(pt => {
        (pt.mainModules || []).forEach((mod: any) => {
          if (mod.subModules && mod.subModules.length > 0) {
            mod.subModules.forEach((sub: any) => {
              const standardOptions = (sub.subSubModules || []).map((ss: any) => ({
                id: ss.id,
                name: ss.name,
              }));
              const extraCustomOptions = customOptions
                .filter(co => co.subModuleId === sub.id)
                .map(co => ({ id: co.id, name: co.name, note: co.note }));

              list.push({
                id: `${mod.id}-${sub.id}`,
                subModuleId: sub.id,
                subModuleName: sub.name,
                moduleId: mod.id,
                moduleName: mod.name,
                productTypeId: pt.id,
                productTypeName: pt.name,
                options: [...standardOptions, ...extraCustomOptions],
              });
            });
          } else {
            // Fallback for modules with no sub-modules
            list.push({
              id: `${mod.id}-general`,
              subModuleId: `${mod.id}-general`,
              subModuleName: 'Core Capabilities',
              moduleId: mod.id,
              moduleName: mod.name,
              productTypeId: pt.id,
              productTypeName: pt.name,
              options: [],
            });
          }
        });
      });

    return list;
  }, [availableProductTypes, selectedTypeIds, customOptions]);

  const currentQuestion = subModuleQuestions[currentQuestionIndex] || subModuleQuestions[0];

  const toggleCategory = (catId: string) => {
    setSelectedCategoryIds(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
    clearFieldError('categories');
  };

  const toggleProductType = (typeId: string) => {
    setSelectedTypeIds(prev => 
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    );
    clearFieldError('productTypes');
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptionIds(prev => 
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
    setQuestionWarning(null);
  };


  const handleAddModuleToCustomType = () => {
    if (!newModuleName.trim()) return;
    const trimmedModName = newModuleName.trim();
    const subs = newSubModulesText
      .split(/[,;\n]/)
      .map(s => s.trim())
      .filter(Boolean);

    setCustomTypeModules(prev => [
      ...prev,
      {
        name: trimmedModName,
        subModules: subs.length > 0 ? subs : ['Core Capabilities'],
      }
    ]);
    setNewModuleName('');
    setNewSubModulesText('');
  };

  const handleRemoveModuleFromCustomType = (idxToRemove: number) => {
    setCustomTypeModules(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleAddCustomType = () => {
    if (!newCustomTypeName.trim()) return;
    const newId = `custom-type-${Date.now()}`;
    const trimmedName = newCustomTypeName.trim();
    const trimmedNote = newCustomTypeNote.trim();

    // Include any in-progress module currently typed into the inputs
    const activeModules = [...customTypeModules];
    if (newModuleName.trim()) {
      const subs = newSubModulesText
        .split(/[,;\n]/)
        .map(s => s.trim())
        .filter(Boolean);
      activeModules.push({
        name: newModuleName.trim(),
        subModules: subs.length > 0 ? subs : ['Core Capabilities'],
      });
    }

    if (activeModules.length === 0) {
      activeModules.push({
        name: `${trimmedName} Core Capabilities`,
        subModules: ['Primary Workflows', 'Management & Control'],
      });
    }

    // Build structured mainModules with capability options
    const builtModules = activeModules.map((m, mIdx) => {
      const modId = `custom-mod-${Date.now()}-${mIdx + 1}`;
      const builtSubs = m.subModules.map((sName, sIdx) => {
        const subId = `custom-sub-${Date.now()}-${mIdx + 1}-${sIdx + 1}`;
        return {
          id: subId,
          name: sName,
          subSubModules: [
            { id: `custom-opt-${Date.now()}-${mIdx + 1}-${sIdx + 1}-1`, name: `${sName} Implementation` },
            { id: `custom-opt-${Date.now()}-${mIdx + 1}-${sIdx + 1}-2`, name: `Workflow Automation & Tracking` },
            { id: `custom-opt-${Date.now()}-${mIdx + 1}-${sIdx + 1}-3`, name: `Reporting & Data Analytics` },
          ]
        };
      });

      return {
        id: modId,
        name: m.name,
        subModules: builtSubs,
      };
    });

    setCustomTypes(prev => [
      ...prev,
      {
        id: newId,
        categoryId: selectedCategoryIds[0] || 'custom',
        name: trimmedName,
        note: trimmedNote || undefined,
        mainModules: builtModules,
      }
    ]);

    setSelectedTypeIds(prev => [...prev, newId]);

    // Pre-select the capability options for the custom sub-modules
    const newOptIds = builtModules.flatMap(m => m.subModules.flatMap(s => s.subSubModules.map(opt => opt.id)));
    setSelectedOptionIds(prev => [...prev, ...newOptIds]);

    // Reset inputs
    setNewCustomTypeName('');
    setNewCustomTypeNote('');
    setCustomTypeModules([]);
    setNewModuleName('');
    setNewSubModulesText('');
    setShowAddTypeModal(false);
  };

  const handleAddCustomOption = () => {
    if (!newCustomOptionName.trim() || !currentQuestion) return;
    const newId = `custom-opt-${Date.now()}`;
    const trimmedName = newCustomOptionName.trim();
    const trimmedNote = newCustomOptionNote.trim();

    setCustomOptions(prev => [
      ...prev,
      {
        id: newId,
        subModuleId: currentQuestion.subModuleId,
        name: trimmedName,
        note: trimmedNote || undefined
      }
    ]);
    setSelectedOptionIds(prev => [...prev, newId]);

    if (trimmedNote) {
      setQuestionCustomAnswers(prev => {
        const existing = prev[currentQuestion.subModuleId];
        return {
          ...prev,
          [currentQuestion.subModuleId]: existing
            ? `${existing}\n${trimmedName}: ${trimmedNote}`
            : `${trimmedName}: ${trimmedNote}`
        };
      });
    }

    setNewCustomOptionName('');
    setNewCustomOptionNote('');
    setShowAddOptionModal(false);
    setQuestionWarning(null);
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    const hasSelectedOption = currentQuestion.options.some(opt => selectedOptionIds.includes(opt.id));

    if (!hasSelectedOption && currentQuestion.options.length > 0) {
      setQuestionWarning('Please select at least one option to continue, or click "Skip" if your system does not require this feature.');
      return;
    }

    setQuestionWarning(null);
    if (currentQuestionIndex < subModuleQuestions.length - 1) {
      navigateToStep(6, currentQuestionIndex + 1);
    } else {
      navigateToStep(7);
    }
  };

  const handleSkipQuestion = () => {
    setQuestionWarning(null);
    if (currentQuestion) {
      const currentOptIds = new Set(currentQuestion.options.map(o => o.id));
      setSelectedOptionIds(prev => prev.filter(id => !currentOptIds.has(id)));
    }
    if (currentQuestionIndex < subModuleQuestions.length - 1) {
      navigateToStep(6, currentQuestionIndex + 1);
    } else {
      navigateToStep(7);
    }
  };

  const handleRefineWithAI = async () => {
    if (isRefiningAI) return; // Prevent spamming / multiple calls
    if (!productDescription.trim()) {
      setStepErrors({ productDescription: 'Please enter your rough thoughts, notes, or keywords first, then click Redefine with AI.' });
      return;
    }
    setIsRefiningAI(true);
    try {
      const res = await fetch('/api/ai/refine-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughInput: productDescription,
          projectName,
          companyName,
          industry,
        }),
      });
      const data = await res.json();
      if (data.success && data.refinedDescription) {
        setProductDescription(data.refinedDescription);
        clearFieldError('productDescription');
      } else {
        setStepErrors({ productDescription: data.error || 'Failed to refine description with AI' });
      }
    } catch (err: any) {
      console.error('Error refining with AI:', err);
      setStepErrors({ productDescription: 'Failed to connect to AI refinement service' });
    } finally {
      setIsRefiningAI(false);
    }
  };

  const handleTriggerAIGeneration = async () => {
    if (isGeneratingAI) return; // Prevent concurrent AI generations
    setIsGeneratingAI(true);
    setCurrentStep(9);

    const categoryNames = selectedCategoriesList.map(c => c.name).concat(customCategories);
    const typeNames = availableProductTypes.filter(t => selectedTypeIds.includes(t.id)).map(t => t.name);
    const moduleNames = activeMainModules.map(m => m.name);
    
    // Group all chosen options & custom answers by sub-module
    const subModuleNames = subModuleQuestions.map(q => {
      const chosenOpts = q.options.filter(o => selectedOptionIds.includes(o.id)).map(o => o.name);
      const customAns = questionCustomAnswers[q.subModuleId];
      let summary = `${q.moduleName} - ${q.subModuleName}: `;
      if (chosenOpts.length > 0) {
        summary += chosenOpts.join(', ');
      }
      if (customAns && customAns.trim()) {
        summary += ` (Custom: ${customAns.trim()})`;
      }
      return summary;
    });

    const subSubModuleNames = subModuleQuestions
      .flatMap(q => q.options)
      .filter(o => selectedOptionIds.includes(o.id))
      .map(o => o.name);

    // Compute contractual exclusions strictly based on what the client did NOT select
    const unselectedScope: string[] = [];

    // 1. Unselected capability options under sub-module interview questions
    subModuleQuestions.forEach(q => {
      const unchosen = q.options.filter(o => !selectedOptionIds.includes(o.id)).map(o => o.name);
      if (unchosen.length > 0) {
        unselectedScope.push(`${q.moduleName} — ${q.subModuleName}: ${unchosen.join(', ')} (Excluded from initial scope)`);
      }
    });

    // 2. Unselected main modules from user's chosen product types
    const chosenTypesList = availableProductTypes.filter(t => selectedTypeIds.includes(t.id));
    chosenTypesList.forEach(pt => {
      (pt.mainModules || []).forEach((mod: any) => {
        const isModActive = activeMainModules.some(m => m.id === mod.id);
        if (!isModActive) {
          unselectedScope.push(`Module: "${mod.name}" (Excluded from ${pt.name} scope)`);
        }
      });
    });

    // 3. Major domain platform checks if not selected
    const lowerTypes = typeNames.map(t => t.toLowerCase()).join(' ');
    const lowerCats = categoryNames.map(c => c.toLowerCase()).join(' ');
    if (!lowerTypes.includes('mobile') && !lowerTypes.includes('ios') && !lowerTypes.includes('android')) {
      unselectedScope.push('Native iOS & Android Mobile Apps (Scope is restricted to Responsive Web Portal)');
    }
    if (!lowerTypes.includes('payment') && !lowerTypes.includes('pos') && !lowerCats.includes('financial') && !lowerCats.includes('fintech')) {
      unselectedScope.push('Payment Gateway Direct Merchant Settlement & Card Processing Infrastructure');
    }
    if (!lowerCats.includes('iot') && !lowerCats.includes('hardware') && !lowerTypes.includes('iot') && !lowerTypes.includes('pos')) {
      unselectedScope.push('Third-Party Hardware Integration, POS Thermal Printers & Physical Sensor Devices');
    }
    if (!lowerCats.includes('artificial intelligence') && !lowerCats.includes('data science') && !lowerTypes.includes('custom model')) {
      unselectedScope.push('Custom Machine Learning Training & Dedicated GPU Cluster Infrastructure');
    }
    if (!lowerTypes.includes('saas') && !lowerTypes.includes('multi-tenant')) {
      unselectedScope.push('Multi-Tenant Enterprise White-Labeling & Automated Tenant Database Sharding');
    }

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          companyName,
          productDescription,
          selectedCategories: categoryNames,
          selectedTypes: typeNames,
          selectedModules: moduleNames,
          selectedSubModules: subModuleNames,
          selectedSubSubModules: subSubModuleNames,
          unselectedItems: unselectedScope,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setArchitectureFlows(data.data.architectureFlows);
        setImplementationPhases(data.data.implementationPhases);
        setExcludedItems(
          Array.isArray(data.data.excludedItems) && data.data.excludedItems.length > 0
            ? data.data.excludedItems
            : unselectedScope
        );
      } else {
        setExcludedItems(unselectedScope);
      }
    } catch (err) {
      console.error('AI Generation call error:', err);
      setExcludedItems(unselectedScope);
    } finally {
      setIsGeneratingAI(false);
      await navigateToStep(10);
    }
  };

  // Reference of freshest state to prevent stale closures during autosave & navigation
  const latestStateRef = useRef<any>({});
  useEffect(() => {
    latestStateRef.current = {
      currentStep,
      currentQuestionIndex,
      companyName,
      contactPerson,
      contactEmail,
      contactPhone,
      industry,
      locations,
      projectName,
      targetAudience,
      expectedDuration,
      productDescription,
      selectedCategoryIds,
      selectedTypeIds,
      selectedOptionIds,
      customCategories,
      customTypes,
      customOptions,
      questionCustomAnswers,
      techStack,
      splitupType,
      architectureFlows,
      implementationPhases,
      excludedItems,
      customPdfName,
      masterTemplate,
      draftProjectId,
      activeMainModules,
      subModuleQuestions,
    };
  });

  const getComputedActiveModuleAndSubModuleIds = (
    activeMods: any[],
    optionIds: string[],
    customOpts: any[],
    customAnswers: Record<string, string>
  ) => {
    if (!optionIds || optionIds.length === 0) {
      return {
        moduleIds: (activeMods || []).map(m => m.id),
        subModuleIds: (activeMods || []).flatMap(m => (m.subModules || []).map((s: any) => s.id)),
      };
    }
    const optSet = new Set(optionIds);
    const activeSubIds = new Set<string>();
    const activeModIds = new Set<string>();

    (activeMods || []).forEach(m => {
      (m.subModules || []).forEach((sub: any) => {
        const hasChosenStandard = (sub.subSubModules || []).some((ss: any) => optSet.has(ss.id));
        const hasChosenCustom = (customOpts || []).some((co: any) => co.subModuleId === sub.id);
        const hasCustomNote = !!customAnswers[sub.id]?.trim();

        if (hasChosenStandard || hasChosenCustom || hasCustomNote) {
          activeSubIds.add(sub.id);
          activeModIds.add(m.id);
        }
      });
    });

    return {
      moduleIds: activeModIds.size > 0 ? Array.from(activeModIds) : (activeMods || []).map(m => m.id),
      subModuleIds: activeSubIds.size > 0 ? Array.from(activeSubIds) : [],
    };
  };

  const saveDraft = useCallback(async (stepToSave?: number, qIdxToSave?: number, overrideStatus: string = 'draft') => {
    const s = latestStateRef.current;
    const targetStep = typeof stepToSave === 'number' ? stepToSave : s.currentStep;
    const targetQIdx = typeof qIdxToSave === 'number' ? qIdxToSave : s.currentQuestionIndex;
    const selectedPaymentSplit = DEFAULT_PAYMENT_SPLITUPS[s.splitupType as '40-30-30' | '50-50' | '40-20-20-20' | '100'] || DEFAULT_PAYMENT_SPLITUPS['40-30-30'];

    // 0. Synchronous instant local snapshot backup (prevents any loss on immediate tab close or refresh)
    try {
      localStorage.setItem('frdg_wizard_snapshot', JSON.stringify({
        draftProjectId: s.draftProjectId,
        currentStep: targetStep,
        currentQuestionIndex: targetQIdx,
        companyName: s.companyName,
        contactPerson: s.contactPerson,
        contactEmail: s.contactEmail,
        contactPhone: s.contactPhone,
        industry: s.industry,
        locations: s.locations,
        projectName: s.projectName,
        targetAudience: s.targetAudience,
        expectedDuration: s.expectedDuration,
        productDescription: s.productDescription,
        selectedCategoryIds: s.selectedCategoryIds,
        selectedTypeIds: s.selectedTypeIds,
        selectedOptionIds: s.selectedOptionIds,
        customCategories: s.customCategories,
        customTypes: s.customTypes,
        customOptions: s.customOptions,
        questionCustomAnswers: s.questionCustomAnswers,
        techStack: s.techStack,
        splitupType: s.splitupType,
        architectureFlows: s.architectureFlows,
        implementationPhases: s.implementationPhases,
        excludedItems: s.excludedItems,
        customPdfName: s.customPdfName,
        timestamp: Date.now(),
      }));
    } catch (e) {}

    // Check if user has entered any data or progressed beyond Step 1
    const hasAnyContent = Boolean(
      s.companyName?.trim() ||
      s.contactPerson?.trim() ||
      s.contactEmail?.trim() ||
      s.contactPhone?.trim() ||
      s.industry?.trim() ||
      s.locations?.trim() ||
      s.projectName?.trim() ||
      s.targetAudience?.trim() ||
      s.productDescription?.trim() ||
      (s.selectedCategoryIds && s.selectedCategoryIds.length > 0) ||
      (s.selectedTypeIds && s.selectedTypeIds.length > 0) ||
      (s.selectedOptionIds && s.selectedOptionIds.length > 0) ||
      targetStep > 1 ||
      s.draftProjectId
    );

    if (!hasAnyContent) return null;

    setIsAutoSaving(true);

    const resolvedProjectName = s.projectName?.trim() ||
      (s.companyName?.trim() ? `${s.companyName.trim()} Specification` : 'Draft Specification');

    const { moduleIds: computedModIds, subModuleIds: computedSubIds } = getComputedActiveModuleAndSubModuleIds(
      s.activeMainModules || [],
      s.selectedOptionIds || [],
      s.customOptions || [],
      s.questionCustomAnswers || {}
    );

    const payload = {
      projectName: resolvedProjectName,
      companyName: s.companyName?.trim() || '',
      contactPerson: s.contactPerson?.trim() || '',
      contactEmail: s.contactEmail?.trim() || '',
      contactPhone: s.contactPhone?.trim() || '',
      industry: s.industry?.trim() || '',
      locations: s.locations?.trim() || '',
      targetAudience: s.targetAudience?.trim() || '',
      productDescription: s.productDescription?.trim() || '',
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      endDate: s.expectedDuration || '',
      selectedCategoryIds: s.selectedCategoryIds || [],
      selectedTypeIds: s.selectedTypeIds || [],
      selectedModuleIds: computedModIds,
      selectedSubModuleIds: computedSubIds,
      selectedSubSubModuleIds: s.selectedOptionIds || [],
      customItems: {
        currentStep: targetStep,
        currentQuestionIndex: targetQIdx,
        splitupType: s.splitupType,
        customCategories: s.customCategories || [],
        customTypes: s.customTypes || [],
        customOptions: s.customOptions || [],
        questionCustomAnswers: s.questionCustomAnswers || {},
        projectRequirements: s.masterTemplate?.requirements,
        projectDeliverables: s.masterTemplate?.deliverables,
        communication: s.masterTemplate?.communication,
        additionalPricing: s.masterTemplate?.additionalPricing,
        projectAgreements: s.masterTemplate?.agreements,
      },
      companyTemplates: s.masterTemplate,
      techStack: s.techStack,
      architectureFlows: s.architectureFlows,
      implementationPhases: s.implementationPhases,
      paymentSplitup: selectedPaymentSplit,
      excludedItems: s.excludedItems,
      status: overrideStatus || 'draft',
      pdfFileName: s.customPdfName || 'Functional_Requirement_Document.pdf',
    };

    try {
      let savedId = s.draftProjectId;
      if (savedId) {
        await fetch(`/api/projects/${savedId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
        try {
          localStorage.setItem('frdg_active_draft_id', savedId);
        } catch (e) {}
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
        const data = await res.json();
        if (data.success && data.project?.id) {
          savedId = String(data.project.id);
          setDraftProjectId(savedId);
          latestStateRef.current.draftProjectId = savedId;
          try {
            window.history.replaceState(null, '', `?id=${savedId}`);
            localStorage.setItem('frdg_active_draft_id', savedId);
          } catch (e) {}
        }
      }

      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      return savedId;
    } catch (err) {
      console.error('Draft auto-save error:', err);
      return null;
    } finally {
      setIsAutoSaving(false);
    }
  }, []);

  const navigateToStep = async (newStep: number, newQIdx: number = 0) => {
    setQuestionWarning(null);
    setCurrentStep(newStep);
    if (newStep === 6) {
      setCurrentQuestionIndex(newQIdx);
    }
    latestStateRef.current.currentStep = newStep;
    latestStateRef.current.currentQuestionIndex = newQIdx;

    // Immediately persist updated step to local snapshot
    try {
      const raw = localStorage.getItem('frdg_wizard_snapshot');
      const prev = raw ? JSON.parse(raw) : {};
      localStorage.setItem('frdg_wizard_snapshot', JSON.stringify({
        ...prev,
        currentStep: newStep,
        currentQuestionIndex: newQIdx,
        timestamp: Date.now(),
      }));
    } catch (e) {}

    const savedId = await saveDraft(newStep, newQIdx);
    const activeId = savedId || draftProjectId;
    try {
      if (activeId) {
        window.history.pushState(
          { step: newStep, qIdx: newQIdx },
          '',
          `?id=${activeId}`
        );
        localStorage.setItem('frdg_active_draft_id', activeId);
      } else {
        window.history.pushState(
          { step: newStep, qIdx: newQIdx },
          '',
          ''
        );
      }
    } catch (e) {}
  };

  const handleBackToDashboard = async () => {
    setIsAutoSaving(true);
    try {
      await saveDraft(currentStep, currentQuestionIndex);
    } catch (e) {
      console.error('Error saving before returning to dashboard:', e);
    }
    router.push('/projects');
    router.refresh();
  };

  // Synchronize browser history and tab exit
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.step === 'number') {
        const targetStep = event.state.step;
        const targetQIdx = typeof event.state.qIdx === 'number' ? event.state.qIdx : 0;
        setCurrentStep(targetStep);
        if (targetStep === 6) {
          setCurrentQuestionIndex(targetQIdx);
        }
        saveDraft(targetStep, targetQIdx);
      } else {
        saveDraft(currentStep, currentQuestionIndex);
      }
    };

    const handleBeforeUnload = () => {
      saveDraft(currentStep, currentQuestionIndex);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveDraft, currentStep, currentQuestionIndex]);

  // Debounced auto-save on input typing and option selecting
  useEffect(() => {
    if (!hasLoadedInitialDraft) return;

    const hasAnyContent = Boolean(
      companyName.trim() ||
      contactPerson.trim() ||
      contactEmail.trim() ||
      contactPhone.trim() ||
      industry.trim() ||
      locations.trim() ||
      projectName.trim() ||
      productDescription.trim() ||
      selectedCategoryIds.length > 0 ||
      selectedTypeIds.length > 0 ||
      selectedOptionIds.length > 0 ||
      currentStep > 1 ||
      draftProjectId
    );

    if (!hasAnyContent && currentStep === 1) return;

    const timer = setTimeout(() => {
      saveDraft(currentStep, currentQuestionIndex);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    companyName,
    contactPerson,
    contactEmail,
    contactPhone,
    industry,
    locations,
    projectName,
    targetAudience,
    expectedDuration,
    productDescription,
    selectedCategoryIds,
    selectedTypeIds,
    selectedOptionIds,
    customCategories,
    customTypes,
    customOptions,
    questionCustomAnswers,
    techStack,
    splitupType,
    customPdfName,
    currentStep,
    currentQuestionIndex,
    hasLoadedInitialDraft,
    saveDraft,
  ]);

  const handleSaveProject = async () => {
    if (isSaving) return; // Prevent double submit
    setIsSaving(true);
    try {
      const selectedPaymentSplit = DEFAULT_PAYMENT_SPLITUPS[splitupType];

      const payload = {
        projectName: projectName.trim() || '',
        companyName: companyName.trim() || '',
        contactPerson: contactPerson.trim() || '',
        contactEmail: contactEmail || '',
        contactPhone: contactPhone || '',
        industry: industry || '',
        locations: locations || '',
        targetAudience: targetAudience || '',
        productDescription: productDescription || '',
        startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        endDate: expectedDuration,
        selectedCategoryIds,
        selectedTypeIds,
        selectedModuleIds: getComputedActiveModuleAndSubModuleIds(
          activeMainModules,
          selectedOptionIds,
          customOptions,
          questionCustomAnswers
        ).moduleIds,
        selectedSubModuleIds: getComputedActiveModuleAndSubModuleIds(
          activeMainModules,
          selectedOptionIds,
          customOptions,
          questionCustomAnswers
        ).subModuleIds,
        selectedSubSubModuleIds: selectedOptionIds,
        customItems: {
          currentStep: 10,
          currentQuestionIndex: 0,
          splitupType,
          customCategories,
          customTypes,
          customOptions,
          questionCustomAnswers,
          projectRequirements: masterTemplate?.requirements,
          projectDeliverables: masterTemplate?.deliverables,
          communication: masterTemplate?.communication,
          additionalPricing: masterTemplate?.additionalPricing,
          projectAgreements: masterTemplate?.agreements,
        },
        companyTemplates: masterTemplate,
        techStack,
        architectureFlows,
        implementationPhases,
        paymentSplitup: selectedPaymentSplit,
        excludedItems,
        status: 'submitted',
        pdfFileName: customPdfName,
      };

      let finalId = draftProjectId;
      if (finalId) {
        await fetch(`/api/projects/${finalId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success && data.project?.id) {
          finalId = data.project.id;
        }
      }

      try {
        localStorage.removeItem('frdg_active_draft_id');
        localStorage.removeItem('frdg_wizard_snapshot');
      } catch (e) {}

      if (finalId) {
        router.push(`/projects/${finalId}`);
      } else {
        router.push('/projects');
      }
    } catch (err: any) {
      console.error('Error saving project:', err);
      setSaveError('Failed to save project. Please check database connection and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const previewProject = useMemo(() => {
    const selectedPaymentSplit = DEFAULT_PAYMENT_SPLITUPS[splitupType];
    const { moduleIds: computedModIds, subModuleIds: computedSubIds } = getComputedActiveModuleAndSubModuleIds(
      activeMainModules,
      selectedOptionIds,
      customOptions,
      questionCustomAnswers
    );
    return {
      id: 'preview',
      projectName: projectName.trim() || '',
      companyName: companyName || '',
      contactPerson: contactPerson || '',
      contactEmail: contactEmail || '',
      contactPhone: contactPhone || '',
      industry: industry || '',
      locations: locations || '',
      targetAudience: targetAudience || '',
      productDescription: productDescription || '',
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      endDate: expectedDuration || '',
      selectedCategoryIds,
      selectedTypeIds,
      selectedModuleIds: computedModIds,
      selectedSubModuleIds: computedSubIds,
      selectedSubSubModuleIds: selectedOptionIds,
      customItems: {
        customCategories,
        customTypes,
        customOptions,
        questionCustomAnswers,
        projectRequirements: masterTemplate?.requirements,
        projectDeliverables: masterTemplate?.deliverables,
        communication: masterTemplate?.communication,
        additionalPricing: masterTemplate?.additionalPricing,
        projectAgreements: masterTemplate?.agreements,
      },
      companyTemplates: masterTemplate,
      techStack,
      architectureFlows,
      implementationPhases,
      paymentSplitup: selectedPaymentSplit,
      excludedItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }, [
    projectName, companyName, contactPerson, contactEmail, contactPhone,
    industry, locations, targetAudience, productDescription, expectedDuration,
    selectedCategoryIds, selectedTypeIds, activeMainModules, subModuleQuestions,
    selectedOptionIds, customCategories, customTypes, questionCustomAnswers,
    masterTemplate, techStack, architectureFlows, implementationPhases,
    splitupType, excludedItems
  ]);

  // Progress Calculation
  const totalSubQuestions = subModuleQuestions.length || 1;
  const currentTotalSteps = 5 + totalSubQuestions + 3;
  const currentProgressStep = currentStep <= 5 
    ? currentStep 
    : currentStep === 6 
    ? 5 + currentQuestionIndex + 1 
    : currentStep === 7 
    ? 5 + totalSubQuestions + 1 
    : currentStep === 8 
    ? 5 + totalSubQuestions + 2 
    : currentTotalSteps;
    
  const progressPercent = Math.min(100, Math.round((currentProgressStep / currentTotalSteps) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-blue-50/40 text-slate-900 font-sans pt-6 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambient Color Glow Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[30rem] h-[30rem] bg-sky-400/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15 -z-10">
        <div className="absolute h-px bg-blue-200" style={{ top: '15%', left: 0, right: 0 }}></div>
        <div className="absolute h-px bg-blue-200" style={{ top: '50%', left: 0, right: 0 }}></div>
        <div className="absolute h-px bg-blue-200" style={{ top: '85%', left: 0, right: 0 }}></div>

        <div className="absolute w-px bg-blue-200" style={{ left: '10%', top: 0, bottom: 0 }}></div>
        <div className="absolute w-px bg-blue-200" style={{ left: '50%', top: 0, bottom: 0 }}></div>
        <div className="absolute w-px bg-blue-200" style={{ left: '90%', top: 0, bottom: 0 }}></div>
      </div>

      <div className="w-full max-w-2xl mx-auto space-y-4 px-3 sm:px-4">

        {/* Top bar — Back to Dashboard placed where Nutz logo was */}
        <div className="flex items-center justify-between px-1 mb-2">
          <button
            type="button"
            onClick={handleBackToDashboard}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-blue-700 bg-white/90 hover:bg-blue-600 hover:text-white rounded-full border border-blue-100 shadow-xs transition-all cursor-pointer group"
            title="Save selected options and return to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>
          {draftProjectId && (
            <button
              type="button"
              onClick={handleStartFresh}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-100/70 hover:bg-blue-200/80 px-3 py-1 rounded-full border border-blue-200/80 transition-all cursor-pointer"
            >
              Start new specification
            </button>
          )}
        </div>

        {/* Unified Seamless Wizard Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-blue-100 shadow-2xl shadow-blue-500/10 overflow-hidden flex flex-col justify-between relative">
          
          {/* Blue Top Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500" />

          {/* Integrated Top Progress Meter */}
          <div className="px-5 sm:px-8 pt-5 pb-4 border-b border-blue-100/60 bg-gradient-to-r from-blue-50/80 via-sky-50/50 to-blue-50/60 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-blue-600 text-white shadow-xs">
                {currentStep === 6 
                  ? `QUESTION ${currentQuestionIndex + 1} OF ${subModuleQuestions.length}`
                  : `STEP ${currentStep} OF 10`}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-700 border border-blue-200/60">
                {progressPercent}% Completed
              </span>
            </div>
            <div className="w-full bg-blue-100/70 h-2 rounded-full overflow-hidden p-0.5 border border-blue-200/40">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-sky-500 h-full rounded-full shadow-xs"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>


          {/* Step Form Content */}
          <div className="px-4 pt-5 pb-6 sm:px-8 sm:pt-7 sm:pb-8 min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* ================= STEP 1: COMPANY PROFILE ================= */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 bg-clip-text text-transparent">
                        Client & Organization
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-slate-500">
                        Basic information for the official specification.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      Company Name <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        clearFieldError('companyName');
                      }}
                      placeholder="e.g. Acme Corp"
                      className={`w-full px-4 py-2.5 text-xs bg-slate-50/70 border rounded-xl focus:bg-white focus:outline-none transition-all font-medium ${
                        stepErrors.companyName
                          ? 'border-rose-400 focus:border-rose-600 ring-4 ring-rose-500/10 bg-rose-50/30'
                          : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15'
                      }`}
                    />
                    {stepErrors.companyName && (
                      <p className="text-[11px] text-rose-600 mt-1.5 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                        {stepErrors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      Contact Person <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => {
                        setContactPerson(e.target.value);
                        clearFieldError('contactPerson');
                      }}
                      placeholder="e.g. Rajesh Kumar"
                      className={`w-full px-4 py-2.5 text-xs bg-slate-50/70 border rounded-xl focus:bg-white focus:outline-none transition-all font-medium ${
                        stepErrors.contactPerson
                          ? 'border-rose-400 focus:border-rose-600 ring-4 ring-rose-500/10 bg-rose-50/30'
                          : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15'
                      }`}
                    />
                    {stepErrors.contactPerson && (
                      <p className="text-[11px] text-rose-600 mt-1.5 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                        {stepErrors.contactPerson}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      Email <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                        clearFieldError('contactEmail');
                      }}
                      placeholder="rajesh@acmecorp.com"
                      className={`w-full px-4 py-2.5 text-xs bg-slate-50/70 border rounded-xl focus:bg-white focus:outline-none transition-all font-medium ${
                        stepErrors.contactEmail
                          ? 'border-rose-400 focus:border-rose-600 ring-4 ring-rose-500/10 bg-rose-50/30'
                          : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15'
                      }`}
                    />
                    {stepErrors.contactEmail && (
                      <p className="text-[11px] text-rose-600 mt-1.5 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                        {stepErrors.contactEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      Phone <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-bold text-blue-700 bg-blue-100/90 border border-blue-200/80 px-2 py-0.5 rounded-md select-none pointer-events-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={contactPhone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.startsWith('91') && val.length > 10) {
                            val = val.slice(2);
                          }
                          val = val.slice(0, 10);
                          setContactPhone(val);
                          clearFieldError('contactPhone');
                        }}
                        placeholder="9876543210"
                        className={`w-full pl-14 pr-4 py-2.5 text-xs bg-slate-50/70 border rounded-xl focus:bg-white focus:outline-none transition-all font-medium ${
                          stepErrors.contactPhone
                            ? 'border-rose-400 focus:border-rose-600 ring-4 ring-rose-500/10 bg-rose-50/30'
                            : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15'
                        }`}
                      />
                    </div>
                    {stepErrors.contactPhone && (
                      <p className="text-[11px] text-rose-600 mt-1.5 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                        {stepErrors.contactPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!validateStep1()) return;
                      setStepErrors({});
                      navigateToStep(2);
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2: PROJECT VISION ================= */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 bg-clip-text text-transparent">
                        Project Information
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-slate-500">
                        Define the project identity and operational parameters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      Project Name <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => {
                        setProjectName(e.target.value);
                        clearFieldError('projectName');
                      }}
                      placeholder="e.g. Enterprise Logistic ERP"
                      className={`w-full px-4 py-2.5 text-xs bg-slate-50/70 border rounded-xl focus:bg-white focus:outline-none transition-all font-medium ${
                        stepErrors.projectName
                          ? 'border-rose-400 focus:border-rose-600 ring-4 ring-rose-500/10 bg-rose-50/30'
                          : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15'
                      }`}
                    />
                    {stepErrors.projectName && (
                      <p className="text-[11px] text-rose-600 mt-1.5 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                        {stepErrors.projectName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience & User Base</label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="e.g. Operations Managers, Dispatch Drivers, Enterprise Admins"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 focus:outline-none transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Duration</label>
                    <input
                      type="text"
                      value={expectedDuration}
                      onChange={(e) => setExpectedDuration(e.target.value)}
                      placeholder="e.g. 60 Working Days"
                      className="w-full px-4 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStepErrors({});
                      navigateToStep(1);
                    }}
                    className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!validateStep2()) return;
                      setStepErrors({});
                      navigateToStep(3);
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3: PRODUCT DESCRIPTION (SINGLE-LINE AI) ================= */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                          Product Scope & Goals
                        </h2>
                        <p className="text-xs sm:text-sm font-medium text-slate-500">
                          Briefly describe what this platform should accomplish in one line.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Redefine with AI Button */}
                  <button
                    type="button"
                    disabled={isRefiningAI}
                    onClick={handleRefineWithAI}
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all shrink-0 cursor-pointer"
                  >
                    {isRefiningAI ? (
                      <>
                        <div className="loader loader-xs loader-white mr-1.5 shrink-0" />
                        <span>Redefining with AI...</span>
                      </>
                    ) : (
                      <span>Redefine with AI</span>
                    )}
                  </button>
                </div>
                <div className="space-y-2 pt-1">
                  <textarea
                    rows={3}
                    value={productDescription}
                    onChange={(e) => {
                      setProductDescription(e.target.value);
                      clearFieldError('productDescription');
                    }}
                    placeholder="e.g. ERP portal for manufacturing factory with raw material inventory, batch production tracking, quality inspection, and GST invoicing"
                    className={`w-full p-4 text-xs bg-slate-50/70 border rounded-2xl focus:bg-white focus:outline-none transition-all leading-relaxed font-medium ${
                      stepErrors.productDescription
                        ? 'border-rose-400 focus:border-rose-600 ring-4 ring-rose-500/10 bg-rose-50/30'
                        : 'border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15'
                    }`}
                  />
                  {stepErrors.productDescription && (
                    <p className="text-[11px] text-rose-600 mt-1.5 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                      {stepErrors.productDescription}
                    </p>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStepErrors({});
                      navigateToStep(2);
                    }}
                    className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!productDescription.trim()) {
                        setStepErrors({ productDescription: 'Please provide a brief product description before continuing.' });
                        return;
                      }
                      setStepErrors({});
                      navigateToStep(4);
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 4: DOMAINS (VIBRANT COLOR SELECTION) ================= */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 bg-clip-text text-transparent">
                        Select Industry Domains
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-slate-500">
                        Choose one or more domains matching your product.
                      </p>
                    </div>
                  </div>
                </div>

                {/* In-app error message section for Step 4 */}
                {stepErrors.categories && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{stepErrors.categories}</span>
                  </motion.div>
                )}

                <div className="relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-blue-500" />
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search 38+ enterprise domains..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 focus:outline-none transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {filteredCategories.map((cat) => {
                    const isSelected = selectedCategoryIds.includes(cat.id);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between select-none ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50/80 border-2 border-blue-600 text-blue-950 font-bold shadow-md shadow-blue-500/10 scale-[1.01]'
                            : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20 text-slate-800 font-medium hover:scale-[1.005]'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 ml-2 shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStepErrors({});
                      navigateToStep(3);
                    }}
                    className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedCategoryIds.length === 0) {
                        setStepErrors({ categories: 'Please select at least one enterprise domain to proceed.' });
                        return;
                      }
                      setStepErrors({});
                      navigateToStep(5);
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 5: PRODUCT TYPES (VIBRANT COLOR SELECTION) ================= */}
            {currentStep === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                        <Cpu className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 bg-clip-text text-transparent">
                          Product Platforms & Types
                        </h2>
                        <p className="text-xs sm:text-sm font-medium text-slate-500">
                          Select all applications to be developed.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddTypeModal(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl cursor-pointer transition-all shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                    <span>Custom</span>
                  </button>
                </div>

                {/* In-app error message section for Step 5 */}
                {stepErrors.productTypes && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{stepErrors.productTypes}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                  {availableProductTypes.map((pt) => {
                    const isSelected = selectedTypeIds.includes(pt.id);
                    return (
                      <div
                        key={pt.id}
                        onClick={() => toggleProductType(pt.id)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between select-none ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50/80 border-2 border-blue-600 text-blue-950 font-bold shadow-md shadow-blue-500/10 scale-[1.01]'
                            : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20 text-slate-800 font-medium hover:scale-[1.005]'
                        }`}
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="truncate">{pt.name}</span>
                          {pt.note && (
                            <span className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                              Note: {pt.note}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 ml-2 shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStepErrors({});
                      navigateToStep(4);
                    }}
                    className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedTypeIds.length === 0) {
                        setStepErrors({ productTypes: 'Please select at least one product type to proceed.' });
                        return;
                      }
                      setStepErrors({});
                      navigateToStep(6, 0);
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Start Questions ({subModuleQuestions.length})</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>

                {showAddTypeModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-blue-100 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between border-b border-blue-50 pb-3">
                        <h4 className="text-base font-extrabold text-slate-900 bg-gradient-to-r from-blue-900 to-sky-900 bg-clip-text text-transparent">Add Custom Product Type & Modules</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddTypeModal(false);
                            setNewCustomTypeName('');
                            setNewCustomTypeNote('');
                            setNewModuleName('');
                            setNewSubModulesText('');
                            setCustomTypeModules([]);
                          }}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 text-xs font-bold flex items-center justify-center transition-colors"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Product Type Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Product Type / Platform Name *
                        </label>
                        <input
                          type="text"
                          autoFocus
                          value={newCustomTypeName}
                          onChange={(e) => setNewCustomTypeName(e.target.value)}
                          placeholder="e.g. Telemedicine Web App, Fleet Management Portal"
                          className="w-full px-4 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 focus:outline-none transition-all font-medium"
                        />
                      </div>

                      {/* Main Modules & Sub-Modules Builder */}
                      <div className="space-y-2.5 pt-2 border-t border-blue-50">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700">
                            Product Main Modules & Sub-Modules
                          </label>
                          <span className="text-[10px] font-medium text-slate-400">Specify modules & sub-modules</span>
                        </div>

                        <div className="p-3.5 bg-blue-50/40 rounded-2xl border border-blue-100/80 space-y-2.5">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-blue-900">
                              Main Module Name
                            </label>
                            <input
                              type="text"
                              value={newModuleName}
                              onChange={(e) => setNewModuleName(e.target.value)}
                              placeholder="e.g. Patient Consultation & EHR"
                              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-blue-900">
                              Sub-Modules / Core Features (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={newSubModulesText}
                              onChange={(e) => setNewSubModulesText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddModuleToCustomType();
                                }
                              }}
                              placeholder="e.g. Video Consultation, Digital Prescriptions, Chat History"
                              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                            />
                          </div>
                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={handleAddModuleToCustomType}
                              disabled={!newModuleName.trim()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Module</span>
                            </button>
                          </div>
                        </div>

                        {/* List of Added Modules */}
                        {customTypeModules.length > 0 ? (
                          <div className="space-y-2 max-h-36 overflow-y-auto">
                            {customTypeModules.map((m, idx) => (
                              <div
                                key={idx}
                                className="flex items-start justify-between p-2.5 rounded-xl bg-white border border-blue-100 text-xs shadow-2xs"
                              >
                                <div className="space-y-1 min-w-0 pr-2">
                                  <div className="font-bold text-blue-950">{m.name}</div>
                                  <div className="flex flex-wrap gap-1">
                                    {m.subModules.map((s, sIdx) => (
                                      <span
                                        key={sIdx}
                                        className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded-md text-[10px]"
                                      >
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveModuleFromCustomType(idx)}
                                  className="text-slate-400 hover:text-rose-600 p-1 text-xs shrink-0"
                                  title="Remove module"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-500 italic">
                            No custom modules added yet. (If none added, a default Core Capabilities module will be created).
                          </p>
                        )}
                      </div>

                      {/* Note / Custom Specification */}
                      <div className="space-y-2 pt-3 border-t border-slate-100">
                        <div className="space-y-0.5">
                          <label className="block text-xs font-semibold text-slate-800">
                            Custom Specifications & Rules (Optional)
                          </label>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            Enter any custom architecture rules, regulatory compliance specs, or technical constraints. Separate multiple rules with new lines.
                          </p>
                        </div>
                        <textarea
                          rows={3}
                          value={newCustomTypeNote}
                          onChange={(e) => setNewCustomTypeNote(e.target.value)}
                          placeholder="e.g.&#10;• HIPAA & SOC2 Compliant Cloud Storage&#10;• Live WebRTC Media Streaming with Low Latency&#10;• Automated Audit Logs for all prescription changes"
                          className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none resize-none leading-relaxed font-sans"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddTypeModal(false);
                            setNewCustomTypeName('');
                            setNewCustomTypeNote('');
                            setNewModuleName('');
                            setNewSubModulesText('');
                            setCustomTypeModules([]);
                          }}
                          className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddCustomType}
                          disabled={!newCustomTypeName.trim() && customTypeModules.length === 0 && !newModuleName.trim()}
                          className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl hover:from-blue-700 hover:to-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-md"
                        >
                          Save Product Type & Modules
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= STEP 6: INDIVIDUAL SUB-MODULE QUESTION PAGE (1 SUB-MODULE PER PAGE) ================= */}
            {currentStep === 6 && currentQuestion && (
              <motion.div
                key={`submodule-question-${currentQuestion.id}-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex-1 flex flex-col justify-between min-h-[360px]"
              >
                <div className="space-y-4">
                  {/* Header & Question */}
                  <div className="space-y-3.5">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md tracking-wider uppercase">
                        {currentQuestion.productTypeName}
                      </span>
                      <span className="text-[10px] text-slate-300">›</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-100 text-sky-800 rounded-md tracking-wider uppercase">
                        {currentQuestion.moduleName}
                      </span>
                      <span className="text-[10px] text-slate-300">›</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md tracking-wider uppercase">
                        {currentQuestion.subModuleName}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug pt-1">
                      {toQuestion(currentQuestion.subModuleName, currentQuestion.moduleName)}
                    </h2>
                  </div>

                  {/* Options Section */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddOptionModal(true)}
                        className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1 text-blue-600" />
                        Add custom option
                      </button>
                    </div>

                    {/* Options grid */}
                    {currentQuestion.options.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
                        {currentQuestion.options.map((opt) => {
                          const isSelected = selectedOptionIds.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => toggleOption(opt.id)}
                              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between select-none ${
                                isSelected
                                  ? 'bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50/80 border-2 border-blue-600 text-blue-950 font-bold shadow-md shadow-blue-500/10 scale-[1.01]'
                                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20 text-slate-800 font-medium hover:scale-[1.005]'
                              }`}
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="truncate">
                                  {opt.name}
                                </span>
                                {opt.note && (
                                  <span className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 font-normal">
                                    Note: {opt.note}
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 ml-2 shadow-xs">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                        No predefined options. Click &ldquo;Add custom option&rdquo; to add one.
                      </div>
                    )}

                    {/* Optional Custom Specification Rule for this Sub-Module */}
                    <div className="pt-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-semibold text-slate-700">
                          Custom Specification Rule / Requirement (Optional)
                        </label>
                        <span className="text-[10px] font-medium text-slate-400">Generates on PDF</span>
                      </div>
                      <input
                        type="text"
                        value={questionCustomAnswers[currentQuestion.subModuleId] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setQuestionCustomAnswers(prev => ({
                            ...prev,
                            [currentQuestion.subModuleId]: val,
                          }));
                        }}
                        placeholder="e.g. Must support automated failover and 256-bit AES data encryption..."
                        className="w-full px-3.5 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 focus:outline-none placeholder:text-slate-400 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-auto pt-4">
                  {/* Warning message if user clicks Next without selecting any option */}
                  {questionWarning && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{questionWarning}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setQuestionWarning(null)}
                        className="text-amber-700 hover:text-amber-950 text-xs font-bold underline shrink-0 cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setQuestionWarning(null);
                        if (currentQuestionIndex > 0) {
                          navigateToStep(6, currentQuestionIndex - 1);
                        } else {
                          navigateToStep(5);
                        }
                      }}
                      className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1.5" />
                      <span>Back</span>
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleSkipQuestion}
                        className="inline-flex items-center px-3.5 py-2 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer font-semibold"
                      >
                        <span>Skip</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span>
                          {currentQuestionIndex < subModuleQuestions.length - 1
                            ? 'Next Question'
                            : 'Continue to Tech Stack'}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {showAddOptionModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-blue-100 space-y-4 shadow-2xl">
                      <h4 className="text-base font-extrabold text-slate-900 bg-gradient-to-r from-blue-900 to-sky-900 bg-clip-text text-transparent">Add Custom Option</h4>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Option Name
                        </label>
                        <input
                          type="text"
                          autoFocus
                          value={newCustomOptionName}
                          onChange={(e) => setNewCustomOptionName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomOption();
                            }
                          }}
                          placeholder="Option name"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Note / Custom Specification
                        </label>
                        <textarea
                          rows={3}
                          value={newCustomOptionNote}
                          onChange={(e) => setNewCustomOptionNote(e.target.value)}
                          placeholder={`e.g. specific requirements for ${currentQuestion?.subModuleName || 'this option'}...`}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none resize-none font-medium"
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddOptionModal(false);
                            setNewCustomOptionName('');
                            setNewCustomOptionNote('');
                          }}
                          className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddCustomOption}
                          className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl hover:from-blue-700 hover:to-sky-700 transition-colors shadow-md"
                        >
                          Add Option
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= STEP 7: TECH STACK PREFERENCES ================= */}
            {currentStep === 7 && (
              <motion.div
                key="step-7"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                        <Cpu className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 bg-clip-text text-transparent">
                          Technology & Hosting
                        </h2>
                        <p className="text-xs sm:text-sm font-medium text-slate-500">
                          Specify your technical requirements or leave blank for recommendation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => setTechStack(EMPTY_TECH_STACK)}
                      className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                    >
                      <span>Clear all</span>
                    </button>
                    <button
                      type="button"
                      disabled={isLoadingRecommendations}
                      onClick={handleLoadRecommendations}
                      className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all whitespace-nowrap cursor-pointer"
                    >
                      {isLoadingRecommendations ? (
                        <>
                          <div className="loader loader-xs loader-white mr-2 shrink-0" />
                          <span>Loading recommendations...</span>
                        </>
                      ) : (
                        <span>Load recommendations</span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {Object.entries(techStack).map(([key, val]) => (
                    <div key={key} className="p-3.5 bg-slate-50/80 border border-blue-100/70 rounded-2xl hover:border-blue-300 transition-all">
                      <label className="block text-[10px] uppercase font-extrabold tracking-wider text-blue-700 mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="text"
                        value={val}
                        placeholder="Leave blank or specify..."
                        onChange={(e) => setTechStack(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full text-xs font-bold bg-transparent border-0 p-0 focus:outline-none text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      navigateToStep(6, subModuleQuestions.length > 0 ? subModuleQuestions.length - 1 : 0);
                    }}
                    className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back</span>
                  </button>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => navigateToStep(8)}
                      className="inline-flex items-center px-3.5 py-2 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer font-semibold"
                    >
                      <span>Skip</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToStep(8)}
                      className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 8: PAYMENT SPLITUPS (VIBRANT COLOR SELECTION) ================= */}
            {currentStep === 8 && (
              <motion.div
                key="step-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/25 shrink-0">
                      <ReceiptText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 bg-clip-text text-transparent">
                        Commercial Splitup
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-slate-500">
                        Select your milestone percentage release schedule.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div
                    onClick={() => setSplitupType('40-30-30')}
                    className={`p-4.5 rounded-2xl border cursor-pointer transition-all space-y-2 select-none ${
                      splitupType === '40-30-30'
                        ? 'bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50/80 border-2 border-blue-600 text-blue-950 font-bold shadow-lg shadow-blue-500/15 scale-[1.01]'
                        : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold text-blue-950">40 - 30 - 30 Split</div>
                      {splitupType === '40-30-30' && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] leading-relaxed text-slate-600 font-medium">
                      40% Advance • 30% Midway (30 days) • 30% Post-UAT
                    </div>
                  </div>

                  <div
                    onClick={() => setSplitupType('50-50')}
                    className={`p-4.5 rounded-2xl border cursor-pointer transition-all space-y-2 select-none ${
                      splitupType === '50-50'
                        ? 'bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50/80 border-2 border-blue-600 text-blue-950 font-bold shadow-lg shadow-blue-500/15 scale-[1.01]'
                        : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold text-blue-950">50 - 50 Split</div>
                      {splitupType === '50-50' && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] leading-relaxed text-slate-600 font-medium">
                      50% Advance • 50% Post-UAT & Handover
                    </div>
                  </div>

                  <div
                    onClick={() => setSplitupType('40-20-20-20')}
                    className={`p-4.5 rounded-2xl border cursor-pointer transition-all space-y-2 select-none ${
                      splitupType === '40-20-20-20'
                        ? 'bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50/80 border-2 border-blue-600 text-blue-950 font-bold shadow-lg shadow-blue-500/15 scale-[1.01]'
                        : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold text-blue-950">4-Phase Split</div>
                      {splitupType === '40-20-20-20' && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] leading-relaxed text-slate-600 font-medium">
                      40% Phase 1 • 20% Phase 2 • 20% Phase 3 • 20% Phase 4
                    </div>
                  </div>

                  <div
                    onClick={() => setSplitupType('100')}
                    className={`p-4.5 rounded-2xl border cursor-pointer transition-all space-y-2 select-none ${
                      splitupType === '100'
                        ? 'bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50/80 border-2 border-blue-600 text-blue-950 font-bold shadow-lg shadow-blue-500/15 scale-[1.01]'
                        : 'bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold text-blue-950">Full Complete Payment</div>
                      {splitupType === '100' && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] leading-relaxed text-slate-600 font-medium">
                      100% Upfront • Single Complete Payment
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => navigateToStep(7)}
                    className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleTriggerAIGeneration}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-extrabold rounded-xl shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Synthesize with AI</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 9: NVIDIA AI GENERATION ================= */}
            {currentStep === 9 && (
              <motion.div
                key="step-9"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-4"
              >
                <GsapLoadingScreen
                  fullScreen={false}
                  message="Synthesizing Enterprise Specification..."
                  subtitle="NVIDIA NIM AI is assembling 10-section flows and schedules..."
                />
              </motion.div>
            )}

            {/* ================= STEP 10: DOCUMENT REVIEW ================= */}
            {currentStep === 10 && (
              <motion.div
                key="step-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4.5 bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 text-white rounded-2xl shadow-lg gap-3 border border-blue-500/20">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-xs font-extrabold text-white">Enterprise Specification Ready</span>
                  </div>

                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleSaveProject}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {isSaving ? <div className="loader loader-xs loader-white mr-1.5 shrink-0" /> : <FileText className="w-3.5 h-3.5 mr-1.5" />}
                    <span>Save & View PDF</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs gap-2">
                  <span className="text-slate-600 font-bold shrink-0">Filename:</span>
                  <input
                    type="text"
                    value={customPdfName}
                    onChange={(e) => setCustomPdfName(e.target.value)}
                    className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono w-full sm:w-64 text-left sm:text-right focus:border-blue-600 focus:outline-none font-semibold text-slate-800"
                  />
                </div>

                {/* Official 10-Section Document Preview (1:1 Exact Parity with Downloaded PDF) */}
                <div className="border border-slate-200 rounded-2xl p-2 sm:p-6 lg:p-8 bg-white shadow-sm overflow-x-auto">
                  <div className="min-w-[580px] sm:min-w-0">
                    <OfficialNutzDocument project={previewProject} isPrintView={false} />
                  </div>
                </div>

                {/* In-app error banner for saving project */}
                {saveError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 mt-4"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{saveError}</span>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToStep(8)}
                    className="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Back to Payment Splits</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveProject}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      {isSaving ? <div className="loader loader-xs loader-white mr-1.5 shrink-0" /> : <Check className="w-4 h-4 mr-2" />}
                      <span>Save Project & Export PDF</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense fallback={<GsapLoadingScreen fullScreen={true} message="Loading Scoping Wizard..." />}>
      <WizardContent />
    </Suspense>
  );
}
