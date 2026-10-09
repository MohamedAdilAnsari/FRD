import { ArchitectureFlows, ImplementationPhase, TechStackConfig } from '@/types';

interface GenerateOptions {
  projectName: string;
  companyName: string;
  productDescription: string;
  selectedCategories: string[];
  selectedTypes: string[];
  selectedModules: string[];
  selectedSubModules: string[];
  selectedSubSubModules: string[];
  unselectedItems?: string[];
}

function normalizeFlowText(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    return val
      .map(item => {
        if (typeof item === 'string') return item;
        if (item.step) return `${item.step}: ${item.description || ''}`;
        if (item.name) return `${item.name}: ${item.description || ''}`;
        return JSON.stringify(item);
      })
      .join('\n | \n v \n');
  }
  if (typeof val === 'object') {
    if (Array.isArray(val.steps)) {
      return val.steps
        .map((s: any) => `${s.step || s.name || 'Step'}: ${s.description || ''}`)
        .join('\n | \n v \n');
    }
    return Object.entries(val)
      .map(([k, v]) => `${k}:\n${typeof v === 'string' ? v : JSON.stringify(v, null, 2)}`)
      .join('\n\n');
  }
  return String(val);
}

function getAIConfig() {
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.NVIDIA_API_KEY || process.env.AI_API_KEY;
  const rawBase = process.env.DEEPSEEK_BASE_URL || process.env.NVIDIA_BASE_URL || process.env.AI_BASE_URL || 'https://api.deepseek.com/v1';
  const baseURL = rawBase.replace(/\/+$/, '');
  const model = process.env.DEEPSEEK_MODEL || process.env.NVIDIA_MODEL || process.env.AI_MODEL || 'deepseek-v4-flash';
  return { apiKey, baseURL, model };
}

export async function generateFRDWithNvidia(options: GenerateOptions): Promise<{
  architectureFlows: ArchitectureFlows;
  implementationPhases: ImplementationPhase[];
  excludedItems: string[];
  techRecommendations?: Record<string, string>;
}> {
  const { apiKey, baseURL, model } = getAIConfig();

  if (!apiKey) {
    console.warn('AI API Key not configured in backend environment. Using intelligent dynamic generator.');
    return generateFallbackFRD(options);
  }

  const systemPrompt = `You are a Principal Software Architect at Nutz Technovation.
Generate an authentic, highly specific Functional Requirements Document (FRD) architecture breakdown based SOLELY on the user's chosen product, description, and selected modules.
DO NOT use generic marketing or boilerplate steps if they are not relevant to the user's input.
The 4 implementation phases must directly schedule the user's selected modules across the phases.

Strict output format requirement:
Respond ONLY with valid JSON in this exact structure without markdown fences or extraneous text:
{
  "architectureFlows": {
    "overallSystemFlow": "ASCII arrow diagram reflecting user inputs e.g.: Step 1 -> Step 2 \\n | \\n v \\n Step 3 ...",
    "highLevelArchitectureFlow": "ASCII arrow diagram for tech layer flow",
    "adminFlow": "ASCII tree diagram e.g.: Admin Console \\n | \\n +-- User Selected Module 1 \\n +-- User Selected Module 2 ...",
    "phaseWiseFlow": "ASCII timeline breakdown for Phase 1 to 4"
  },
  "implementationPhases": [
    {
      "phaseNumber": 1,
      "title": "Phase 1 - Title",
      "outcome": "Specific outcome for the selected modules",
      "duration": "30 Working Days",
      "modules": [
        {
          "module": "Selected Module Name",
          "features": ["Specific feature 1", "Specific feature 2"]
        }
      ]
    },
    {
      "phaseNumber": 2,
      "title": "Phase 2 - Title",
      "outcome": "Outcome statement",
      "duration": "25 Working Days",
      "modules": [
        {
          "module": "Selected Module Name",
          "features": ["Specific feature 1", "Specific feature 2"]
        }
      ]
    },
    {
      "phaseNumber": 3,
      "title": "Phase 3 - Title",
      "outcome": "Outcome statement",
      "duration": "20 Working Days",
      "modules": [
        {
          "module": "Selected Module Name",
          "features": ["Specific feature 1", "Specific feature 2"]
        }
      ]
    },
    {
      "phaseNumber": 4,
      "title": "Phase 4 - Title",
      "outcome": "Outcome statement",
      "duration": "15 Working Days",
      "modules": [
        {
          "module": "Selected Module Name",
          "features": ["Specific feature 1", "Specific feature 2"]
        }
      ]
    }
  ],
  "excludedItems": [
    "Unselected capability 1",
    "Unselected capability 2"
  ]
}`;

  const userPrompt = `Generate the architecture flows, 4-phase implementation plan, and excluded scope tailored specifically for this project:
- Project Name: ${options.projectName}
- Company: ${options.companyName}
- Product Scope: ${options.productDescription}
- Business Domain: ${options.selectedCategories.join(', ') || 'Enterprise Solution'}
- Platforms: ${options.selectedTypes.join(', ') || 'Web Portal'}
- Chosen Modules: ${options.selectedModules.join(', ') || 'Core System Modules'}
- Chosen Sub-Modules & Capabilities: ${options.selectedSubModules.join('; ') || 'Standard Capabilities'}
- Options & Modules Not Selected by Client: ${options.unselectedItems?.join('; ') || 'None'}

Ensure the architecture flows and implementation phases directly reference the user's chosen modules and scope.
Ensure excludedItems is strictly populated with the capabilities and modules NOT selected by the client.`;

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 3000,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      if (parsed.architectureFlows && parsed.implementationPhases) {
        return {
          architectureFlows: {
            overallSystemFlow: normalizeFlowText(parsed.architectureFlows.overallSystemFlow),
            highLevelArchitectureFlow: normalizeFlowText(parsed.architectureFlows.highLevelArchitectureFlow),
            adminFlow: normalizeFlowText(parsed.architectureFlows.adminFlow),
            phaseWiseFlow: normalizeFlowText(parsed.architectureFlows.phaseWiseFlow),
          },
          implementationPhases: parsed.implementationPhases,
          excludedItems: Array.isArray(parsed.excludedItems) && parsed.excludedItems.length > 0 
            ? parsed.excludedItems 
            : (options.unselectedItems && options.unselectedItems.length > 0 ? options.unselectedItems : []),
        };
      }
    }
  } catch (error) {
    console.warn("NVIDIA API call completed with fallback to intelligent local generator:", error);
  }

  // Dynamic generator based on user inputs
  return generateFallbackFRD(options);
}

export async function refineDescriptionWithNvidia(params: {
  roughInput: string;
  projectName?: string;
  companyName?: string;
  industry?: string;
}): Promise<string> {
  const { apiKey, baseURL, model } = getAIConfig();

  if (!apiKey) {
    return params.roughInput;
  }

  const systemPrompt = `You are a Senior Solutions Architect at Nutz Technovation.
Based on the client's keywords or input, write EXACTLY ONE SINGLE CONCISE, ELEGANT LINE describing the Product Scope & Goal.
Strict Rules:
- Output ONLY ONE SINGLE SENTENCE (1 line) stating clearly what is being built.
- Do NOT write paragraphs, bullet points, headers, or quotes.
- Focus directly on the core product and features mentioned in the input.`;

  const userPrompt = `Project Title: ${params.projectName || 'Enterprise Application'}
Keywords / Draft: "${params.roughInput.trim()}"

Write a single-line Product Scope & Goal:`;

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 150,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.replace(/^["']|["']$/g, '').trim();
      if (content) {
        return content.split('\n')[0].trim();
      }
    }
  } catch (err) {
    console.warn('NVIDIA API refine error:', err);
  }

  const cleanInput = params.roughInput.trim().replace(/\s+/g, ' ');
  const items = cleanInput
    .split(/[,;\n•-]+|\band\b/i)
    .map(s => s.trim())
    .filter(Boolean);

  let formatted = cleanInput;
  if (items.length > 1) {
    formatted = items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
  }

  const baseName = params.projectName || 'digital platform';
  return `A unified ${baseName} engineered to manage and streamline ${formatted}.`;
}

function generateFallbackFRD(options: GenerateOptions) {
  const pName = options.projectName || 'Enterprise System';
  const typeNames = options.selectedTypes.length > 0 ? options.selectedTypes.join(', ') : 'Application Platform';
  const modules = options.selectedModules.length > 0 
    ? options.selectedModules 
    : ['User & Role Management', 'Primary Operations Engine', 'Reports & Intelligence'];

  // Dynamically map sub-modules to features if available
  const subModules = options.selectedSubModules.length > 0 ? options.selectedSubModules : [];

  // Group user's actual selected modules into 4 phases
  const total = modules.length;
  const p1Count = Math.max(1, Math.ceil(total * 0.25));
  const p2Count = Math.max(1, Math.ceil(total * 0.35));
  const p3Count = Math.max(1, Math.ceil(total * 0.25));

  const phase1Mods = modules.slice(0, p1Count);
  const phase2Mods = modules.slice(p1Count, p1Count + p2Count);
  const phase3Mods = modules.slice(p1Count + p2Count, p1Count + p2Count + p3Count);
  const phase4Mods = modules.slice(p1Count + p2Count + p3Count);

  const createModuleFeatures = (modList: string[]) => {
    return modList.map(mod => {
      // Find any sub-modules matching this module name
      const matchingSubs = subModules
        .filter(s => s.toLowerCase().includes(mod.toLowerCase()))
        .map(s => s.replace(/^.*:\s*/, ''));

      return {
        module: mod,
        features: matchingSubs.length > 0
          ? matchingSubs.slice(0, 5)
          : [
              `${mod} Core Setup & Configuration`,
              `Role-based Permissions & Access Control`,
              `CRUD Operations & Data Validation`,
              `Audit Logs & Activity Tracking`,
              `API Endpoint Integration & Data Export`
            ]
      };
    });
  };

  const phases: ImplementationPhase[] = [
    {
      phaseNumber: 1,
      title: `Phase 1 - Foundational Architecture & ${phase1Mods[0] || 'Core'}`,
      outcome: `Deliver fundamental security, data schemas, role management, and initial implementation of ${phase1Mods.join(', ') || 'core services'}.`,
      duration: "30 Working Days",
      modules: createModuleFeatures(phase1Mods.length > 0 ? phase1Mods : ['Authentication & System Setup'])
    },
    {
      phaseNumber: 2,
      title: `Phase 2 - Core Operations (${phase2Mods.join(', ') || 'Workflows'})`,
      outcome: `Implement primary operational business logic, transactional records, and data flows for ${pName}.`,
      duration: "25 Working Days",
      modules: createModuleFeatures(phase2Mods.length > 0 ? phase2Mods : ['Business Operations & Workflow Engine'])
    },
    {
      phaseNumber: 3,
      title: `Phase 3 - Extended Sub-systems & Integrations`,
      outcome: `Build supplementary subsystems (${phase3Mods.join(', ') || 'specialized services'}), third-party bridges, and automated communication triggers.`,
      duration: "20 Working Days",
      modules: createModuleFeatures(phase3Mods.length > 0 ? phase3Mods : ['Integration & Automation Services'])
    },
    {
      phaseNumber: 4,
      title: `Phase 4 - Analytics, UAT & Production Deployment`,
      outcome: `Finalize executive reporting, audit trails, User Acceptance Testing (UAT), security audits, and production handover for ${options.companyName}.`,
      duration: "15 Working Days",
      modules: [
        ...(phase4Mods.length > 0 ? createModuleFeatures(phase4Mods) : []),
        {
          module: "Analytics, Reporting & Auditing",
          features: [
            `${pName} Executive Performance Dashboard`,
            "Custom Query Filter & Data Export (PDF/Excel)",
            "System-wide Audit Logging & User Activity Logs",
            "UAT Bug Fixes, Final Security Sign-off & Production Go-Live"
          ]
        }
      ]
    }
  ];

  // Tailored flow diagrams matching the user's specific inputs
  const overallSystemFlow = `User / Client Entry -> Authentication & Access Control (RBAC)
 |
 v
${pName} Core Interface (${typeNames})
 |
 v
${modules.slice(0, 3).join(' -> ') || 'Transactional Processing Engine'}
 |
 v
Automated Database Persistence & Validation Layer
 |
 v
Executive Analytics & Operational Reports (${options.companyName})`;

  const highLevelArchitectureFlow = `Frontend Client Interface (${typeNames})
 |
 v
API Gateway & Authentication Service (JWT / Session Tokens)
 |
 v
${pName} Business Logic Engine (${modules.slice(0, 2).join(', ')})
 |
 v
Persistent Relational Data Store (PostgreSQL / Relational Models)
 |
 v
Asynchronous Background Workers & Notification Engine`;

  const adminFlow = `Administrator Secure Authentication
 |
 v
${options.companyName} Administrative Command Center
 |
${modules.map(m => ` +-- ${m} Management & Settings`).join('\n') || ' +-- Core System Configuration'}
 +-- System Audit Logs & Operational Analytics`;

  const phaseWiseFlow = `Phase 1: Architecture & Foundation (${phase1Mods.join(', ') || 'Core'})
------------------------------------------------------------
System Schema Setup -> Authentication -> ${phase1Mods.join(' -> ') || 'Base Models'}

Phase 2: Business Logic & Primary Workflows
------------------------------------------------------------
${phase2Mods.join(' -> ') || 'Core Workflow Engine -> Transactional Records'}

Phase 3: Extended Sub-systems & Integrations
------------------------------------------------------------
${phase3Mods.join(' -> ') || 'External Services -> Notifications -> Advanced Rules'}

Phase 4: Analytics, UAT & Production Sign-off
------------------------------------------------------------
Executive Reports -> User Acceptance Testing (UAT) -> Production Rollout`;

  return {
    architectureFlows: {
      overallSystemFlow,
      highLevelArchitectureFlow,
      adminFlow,
      phaseWiseFlow
    },
    implementationPhases: phases,
    excludedItems: options.unselectedItems && options.unselectedItems.length > 0 ? options.unselectedItems : []
  };
}

export async function generateTechStackWithNvidia(options: {
  projectName?: string;
  companyName?: string;
  productDescription?: string;
  selectedCategories?: string[];
  selectedTypes?: string[];
  selectedModules?: string[];
}): Promise<TechStackConfig> {
  const { apiKey, baseURL, model } = getAIConfig();

  const typesStr = options.selectedTypes?.join(', ') || '';
  const isMobile = /mobile|app|ios|android|react native|flutter/i.test(typesStr);
  const isAI = /ai|machine learning|nlp|data|llm|intelligence/i.test(
    `${options.productDescription || ''} ${options.projectName || ''}`
  );

  // Fallback intelligent stack tailored to the project with 2-3 options separated by slash
  const fallbackStack: TechStackConfig = {
    frontendFramework: isMobile
      ? "React Native / Flutter / Next.js"
      : "Next.js / React.js / Angular",
    backendRuntime: isAI
      ? "Python / Node.js / Go"
      : "Node.js / Python / Go",
    backendFramework: isAI
      ? "FastAPI / NestJS / Express.js"
      : "Express.js / NestJS / FastAPI",
    database: isAI
      ? "PostgreSQL / Redis / MongoDB"
      : "PostgreSQL / MySQL / MongoDB",
    orm: isAI
      ? "SQLAlchemy / Prisma / Drizzle ORM"
      : "Prisma / Drizzle ORM / Sequelize",
    programmingLanguage: isAI
      ? "Python / TypeScript / JavaScript"
      : "TypeScript / JavaScript / Python",
    uiFramework: isMobile
      ? "Tailwind CSS / React Native Paper / Flutter Widgets"
      : "Tailwind CSS / CSS Modules / Bootstrap",
    uiComponents: isMobile
      ? "Lucide Icons / React Native Paper / Radix UI"
      : "Shadcn/UI / Radix UI / Ant Design",
    hosting: isMobile
      ? "AWS / Cloud VPS / Vercel"
      : "AWS / Vercel / Cloud VPS",
    versionControl: "GitHub / GitLab / Bitbucket",
    ciCd: "GitHub Actions / GitLab CI / Docker",
  };

  if (!apiKey) {
    return fallbackStack;
  }

  const systemPrompt = `You are a Principal Solutions Architect at Nutz Technovation.
Generate tech stack recommendations tailored to the project description and platform requirements.
CRITICAL REQUIREMENT: For EVERY field in the JSON, provide EXACTLY 2 to 3 major industry-standard recommendations separated by a slash (e.g. "Next.js / React.js / Angular").
Return ONLY a valid JSON object matching this schema:
{
  "frontendFramework": "...",
  "backendRuntime": "...",
  "backendFramework": "...",
  "database": "...",
  "orm": "...",
  "programmingLanguage": "...",
  "uiFramework": "...",
  "uiComponents": "...",
  "hosting": "...",
  "versionControl": "...",
  "ciCd": "..."
}`;

  const userPrompt = `Project: ${options.projectName || 'Enterprise Application'}
Company: ${options.companyName || 'Organization'}
Scope: ${options.productDescription || 'Scalable application'}
Platforms: ${options.selectedTypes?.join(', ') || 'Web & Cloud'}
Categories: ${options.selectedCategories?.join(', ') || 'Business Solution'}
Modules: ${options.selectedModules?.join(', ') || 'Standard Modules'}

Recommend 2-3 slash-separated options for each field:`;

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(9000),
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 600,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      if (parsed.frontendFramework && parsed.backendRuntime && parsed.database) {
        return {
          frontendFramework: parsed.frontendFramework || fallbackStack.frontendFramework,
          backendRuntime: parsed.backendRuntime || fallbackStack.backendRuntime,
          backendFramework: parsed.backendFramework || fallbackStack.backendFramework,
          database: parsed.database || fallbackStack.database,
          orm: parsed.orm || fallbackStack.orm,
          programmingLanguage: parsed.programmingLanguage || fallbackStack.programmingLanguage,
          uiFramework: parsed.uiFramework || fallbackStack.uiFramework,
          uiComponents: parsed.uiComponents || fallbackStack.uiComponents,
          hosting: parsed.hosting || fallbackStack.hosting,
          versionControl: parsed.versionControl || fallbackStack.versionControl,
          ciCd: parsed.ciCd || fallbackStack.ciCd,
        };
      }
    }
  } catch (err) {
    console.warn('NVIDIA tech stack generation error, using fallback:', err);
  }

  return fallbackStack;
}

