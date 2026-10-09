export interface SubSubModule {
  id: string;
  name: string;
}

export interface SubModule {
  id: string;
  name: string;
  subSubModules: SubSubModule[];
}

export interface MainModule {
  id: string;
  name: string;
  subModules: SubModule[];
}

export interface ProductType {
  id: string;
  name: string;
  code?: string;
  mainModules: MainModule[];
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  code: string;
  description?: string;
  icon?: string;
  productTypes: ProductType[];
}

export interface TechStackConfig {
  frontendFramework: string;
  backendRuntime: string;
  backendFramework: string;
  database: string;
  orm: string;
  programmingLanguage: string;
  uiFramework: string;
  uiComponents: string;
  hosting: string;
  versionControl: string;
  ciCd: string;
}

export interface ArchitectureFlows {
  overallSystemFlow: string;
  highLevelArchitectureFlow: string;
  adminFlow: string;
  phaseWiseFlow: string;
}

export interface PhaseFeatureItem {
  module: string;
  features: string[];
}

export interface ImplementationPhase {
  phaseNumber?: number;
  phase?: number;
  title: string;
  outcome?: string;
  description?: string;
  duration: string; // e.g. "35 Working Days"
  modules: any[];
}

export interface PaymentSplitup {
  type: '40-30-30' | '50-50' | '40-20-20-20' | '100' | 'custom';
  totalDurationDays: number;
  milestones: {
    name: string;
    percentage: number;
    timing: string;
  }[];
}

export interface FRDProjectData {
  id?: string;
  projectName: string;
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  industry?: string;
  locations?: string;
  targetAudience?: string;
  productDescription: string;
  startDate?: string;
  endDate?: string;
  creationDate?: string;
  lastUpdatedDate?: string;
  
  // Selections
  selectedCategoryIds: string[];
  selectedTypeIds: string[];
  selectedModuleIds: string[];
  selectedSubModuleIds: string[];
  selectedSubSubModuleIds: string[];
  
  // Custom additions
  customCategories?: string[];
  customProductTypes?: { categoryId: string; name: string }[];
  customMainModules?: { typeId: string; name: string }[];
  customSubModules?: { moduleId: string; name: string }[];
  customSubSubModules?: { subModuleId: string; name: string }[];
  
  // Generated Content
  techStack: TechStackConfig;
  architectureFlows: ArchitectureFlows;
  implementationPhases: ImplementationPhase[];
  paymentSplitup: PaymentSplitup;
  excludedItems: string[];
  
  // Status
  status: 'draft' | 'submitted' | 'reviewed' | 'approved';
  clientId?: string;
  pdfFileName?: string;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  companyName?: string;
}
