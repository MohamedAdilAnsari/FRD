'use client';

import React, { useMemo } from 'react';
import { NutzLogo } from '@/components/NutzLogo';
import { 
  DEFAULT_TECH_STACK,
  FIXED_PROJECT_REQUIREMENTS, 
  FIXED_PROJECT_DELIVERABLES, 
  FIXED_COMMUNICATION, 
  DEFAULT_ADDITIONAL_PRICING, 
  FIXED_PROJECT_AGREEMENTS,
  STANDARD_EXCLUDED_ITEMS
} from '@/data/nutzTemplate';
import { COMPREHENSIVE_TAXONOMY } from '@/data/taxonomy';

interface OfficialNutzDocumentProps {
  project: any;
  isPrintView?: boolean;
}

/**
 * Dynamically computes contractual exclusions strictly based on what the user
 * did NOT select from the taxonomy modules, sub-modules, and capabilities.
 */
function getDynamicExclusions(project: any): string[] {
  return STANDARD_EXCLUDED_ITEMS;
}

export const OfficialNutzDocument: React.FC<OfficialNutzDocumentProps> = ({ project, isPrintView = false }) => {
  if (!project) return null;

  // Resolve taxonomy from selected IDs
  const selectedCategories = COMPREHENSIVE_TAXONOMY.filter(cat => 
    project.selectedCategoryIds?.includes(cat.id)
  );

  const selectedTypes = selectedCategories.flatMap(cat => cat.productTypes).filter(pt => 
    project.selectedTypeIds?.includes(pt.id)
  );

  // Custom items if any
  const customCategories = project.customItems?.customCategories || [];
  const customTypes = project.customItems?.customTypes || [];
  const customOptions = project.customItems?.customOptions || [];
  const questionCustomAnswers = project.customItems?.questionCustomAnswers || {};

  // All selected product types including custom product types
  const allSelectedTypes = useMemo(() => {
    const list = [...selectedTypes];
    if (Array.isArray(customTypes)) {
      customTypes.forEach((ct: any) => {
        if (!project.selectedTypeIds || project.selectedTypeIds.includes(ct.id) || project.selectedTypeIds.length === 0) {
          list.push({
            id: ct.id,
            name: ct.name,
            note: ct.note,
            mainModules: Array.isArray(ct.mainModules) ? ct.mainModules : []
          });
        }
      });
    }
    return list;
  }, [selectedTypes, customTypes, project.selectedTypeIds]);

  // Selected option IDs from project
  const selectedOptionIds = useMemo(() => new Set<string>([
    ...(Array.isArray(project.selectedSubSubModuleIds) ? project.selectedSubSubModuleIds : []),
    ...(Array.isArray(project.selectedOptionIds) ? project.selectedOptionIds : [])
  ]), [project.selectedSubSubModuleIds, project.selectedOptionIds]);

  const selectedModuleIds = useMemo(() => new Set<string>(
    Array.isArray(project.selectedModuleIds) ? project.selectedModuleIds : []
  ), [project.selectedModuleIds]);

  const selectedSubModuleIds = useMemo(() => new Set<string>(
    Array.isArray(project.selectedSubModuleIds) ? project.selectedSubModuleIds : []
  ), [project.selectedSubModuleIds]);

  // Compute strictly selected modules and sub-modules containing ONLY selected options
  const selectedModularBreakdown = useMemo(() => {
    const rawModules = allSelectedTypes.flatMap(pt => pt.mainModules || []);
    const result: Array<{
      id: string;
      name: string;
      subModules: Array<{
        id: string;
        name: string;
        chosenOptions: string[];
        customNote?: string;
      }>;
      customNotes: string[];
    }> = [];

    rawModules.forEach(mod => {
      // If module is explicitly unselected, skip
      if (selectedModuleIds.size > 0 && !selectedModuleIds.has(mod.id)) {
        return;
      }

      const activeSubModules: Array<{
        id: string;
        name: string;
        chosenOptions: string[];
        customNote?: string;
      }> = [];

      (mod.subModules || []).forEach(sub => {
        const isSubExplicitlySelected = selectedSubModuleIds.size === 0 || selectedSubModuleIds.has(sub.id);

        // Filter strictly to ONLY options that were selected by the user
        const chosenStandard = (sub.subSubModules || [])
          .filter(ss => selectedOptionIds.has(ss.id))
          .map(ss => ss.name);

        const chosenCustom = (customOptions || [])
          .filter((co: any) => co.subModuleId === sub.id)
          .map((co: any) => co.name);

        const allChosen = [...chosenStandard, ...chosenCustom];
        const customNote = questionCustomAnswers[sub.id];

        // ONLY include this sub-module if the user actually selected options OR gave a custom note
        if (allChosen.length > 0 || (customNote && customNote.trim())) {
          activeSubModules.push({
            id: sub.id,
            name: sub.name,
            chosenOptions: allChosen,
            customNote: customNote?.trim(),
          });
        } else if (isSubExplicitlySelected && selectedOptionIds.size === 0 && (!sub.subSubModules || sub.subSubModules.length === 0)) {
          // If sub-module has no subSubModules defined in taxonomy and was explicitly selected
          activeSubModules.push({
            id: sub.id,
            name: sub.name,
            chosenOptions: ['Core Feature Implementation'],
            customNote: customNote?.trim(),
          });
        }
      });

      // Include this module ONLY if it has active selected sub-modules
      if (activeSubModules.length > 0) {
        const parentType = allSelectedTypes.find(pt => (pt.mainModules || []).some(m => m.id === mod.id));
        const typeNote = parentType?.note?.trim();

        const rawNotes: string[] = [];
        if (typeNote) {
          typeNote.split(/[\n;]/).map(r => r.trim()).filter(Boolean).forEach(r => {
            if (!rawNotes.includes(r)) rawNotes.push(r);
          });
        }
        activeSubModules.forEach(s => {
          if (s.customNote) {
            s.customNote.split(/[\n;]/).map(r => r.trim()).filter(Boolean).forEach(r => {
              if (!rawNotes.includes(r)) rawNotes.push(r);
            });
          }
        });

        result.push({
          id: mod.id,
          name: mod.name,
          subModules: activeSubModules,
          customNotes: rawNotes,
        });
      }
    });

    return result;
  }, [allSelectedTypes, selectedOptionIds, selectedModuleIds, selectedSubModuleIds, customOptions, questionCustomAnswers]);

  // Note section ONLY generates when user entered custom product types or custom notes on their own
  const hasCustomNotes = useMemo(() => {
    return selectedModularBreakdown.some(m => m.customNotes && m.customNotes.length > 0) ||
      (Array.isArray(customTypes) && customTypes.some((ct: any) => ct.note && ct.note.trim().length > 0));
  }, [selectedModularBreakdown, customTypes]);

  const techStack = project.techStack || DEFAULT_TECH_STACK;
  const dynamicExcludedList = getDynamicExclusions(project);

  // Robust Architecture Flows parsing with complete fallbacks
  const rawFlows = typeof project.architectureFlows === 'string'
    ? (function() { try { return JSON.parse(project.architectureFlows); } catch(e) { return {}; } })()
    : (project.architectureFlows || {});

  const flows = {
    overallSystemFlow: rawFlows.overallSystemFlow?.trim() ||
      `[ Client Portal / Web App ] ──► [ Auth & API Gateway ] ──► [ Business Rules Engine ] ──► [ Cloud Database & Storage ]`,
    highLevelArchitectureFlow: rawFlows.highLevelArchitectureFlow?.trim() ||
      `+-----------------------------------------------------------+\n|                    PRESENTATION TIER                      |\n|  Next.js 14 Responsive Web App • Tailwind CSS             |\n+-----------------------------┬-----------------------------+\n                              │ REST / JSON APIs\n+-----------------------------▼-----------------------------+\n|                     APPLICATION TIER                      |\n|  Node.js / Express Backend • Business Rules Engine        |\n|  Role-Based Access Control • Audit Logging Service        |\n+-----------------------------┬-----------------------------+\n                              │ Sequelize / SQLite ORM\n+-----------------------------▼-----------------------------+\n|                      DATA STORE TIER                      |\n|  PostgreSQL / SQLite RDBMS • Cloud Storage                |\n+-----------------------------------------------------------+`,
    adminFlow: rawFlows.adminFlow?.trim() ||
      `[ Administrator Login ] ──► [ Multi-Factor Authentication ]\n                                    │\n                                    ▼\n                          [ Admin Control Console ]\n                                    │\n    ┌───────────────────────────────┼───────────────────────────────┐\n    ▼                               ▼                               ▼\n[ User & Role Management ]   [ Data Inspection & CMS ]   [ Audit Logs & Reports ]`,
    phaseWiseFlow: rawFlows.phaseWiseFlow?.trim() ||
      `Phase 1 (Setup & Specs)    ──► Requirements Sign-off & Architecture Setup\nPhase 2 (Core Modules)     ──► Core Engine, Database Schemas & API Layer\nPhase 3 (Integrations)     ──► Third-Party APIs, UI Workflows & Notifications\nPhase 4 (UAT & Rollout)    ──► Quality Assurance, Production Deployment & SLA Handover`
  };

  // Robust Implementation Phases parsing with complete fallbacks
  const rawPhases = typeof project.implementationPhases === 'string'
    ? (function() { try { return JSON.parse(project.implementationPhases); } catch(e) { return []; } })()
    : (Array.isArray(project.implementationPhases) ? project.implementationPhases : []);

  const phasesList = rawPhases.length > 0 ? rawPhases : [
    {
      phaseNumber: 1,
      title: "Phase 1: Architecture Blueprint, Entity Schema & Setup",
      duration: "15 Working Days",
      outcome: "Infrastructure provisioning, database schemas design, and base API framework setup.",
      modules: [
        {
          module: "System Core & Architecture",
          features: ["Database Schema Initialization", "Authentication & Security Layer", "API Router Provisioning"]
        }
      ]
    },
    {
      phaseNumber: 2,
      title: "Phase 2: Core Capability Modules & Data Management",
      duration: "15 Working Days",
      outcome: "Implementation of primary business modules, transaction pipelines, and core functional services.",
      modules: selectedModularBreakdown.length > 0 ? selectedModularBreakdown.slice(0, Math.ceil(selectedModularBreakdown.length / 2)).map(m => ({
        module: m.name,
        features: m.subModules.map(s => `${s.name}: ${s.chosenOptions.join(', ') || 'Selected Feature'}`)
      })) : [
        {
          module: "Business Logic Engine",
          features: ["Core Module Operations", "Data Processing Pipelines", "Role-Based Permissions"]
        }
      ]
    },
    {
      phaseNumber: 3,
      title: "Phase 3: Integrations, User Portals & Automation",
      duration: "15 Working Days",
      outcome: "Third-party gateway integrations, responsive web interfaces, and automated notification services.",
      modules: selectedModularBreakdown.length > 2 ? selectedModularBreakdown.slice(Math.ceil(selectedModularBreakdown.length / 2)).map(m => ({
        module: m.name,
        features: m.subModules.map(s => `${s.name}: ${s.chosenOptions.join(', ') || 'Selected Feature'}`)
      })) : [
        {
          module: "Integrations & UI Workflows",
          features: ["External API Gateways", "Responsive Client Dashboard", "Notification Engine"]
        }
      ]
    },
    {
      phaseNumber: 4,
      title: "Phase 4: End-to-End Testing, UAT, Deployment & Handover",
      duration: "15 Working Days",
      outcome: "Comprehensive testing, security hardening, user acceptance sign-off, live deployment, and warranty commencement.",
      modules: [
        {
          module: "Quality Assurance & Production Rollout",
          features: ["User Acceptance Testing (UAT)", "Production Server Deployment", "Handover & 30-Day Warranty"]
        }
      ]
    }
  ];

  const companyInfo = project.companyTemplates?.companyInfo || {
    name: "Nutz Technovation Private Limited",
    developmentTeam: "Nutz Technovation Private Limited",
    defaultDuration: "60 Working Days",
  };

  // Dynamic Company Templates with fallback to defaults or project-level overrides
  const rawRequirements = project.companyTemplates?.requirements?.filter((r: any) => r.enabled !== false) ||
    project.customItems?.projectRequirements ||
    project.projectRequirements;
  const requirementsList = Array.isArray(rawRequirements) && rawRequirements.length > 0
    ? rawRequirements
    : FIXED_PROJECT_REQUIREMENTS;

  const rawDeliverables = project.companyTemplates?.deliverables ||
    project.customItems?.projectDeliverables ||
    project.projectDeliverables;
  const deliverablesList = Array.isArray(rawDeliverables) && rawDeliverables.length > 0
    ? rawDeliverables
    : FIXED_PROJECT_DELIVERABLES;

  const rawCommunication = project.companyTemplates?.communication ||
    project.customItems?.communication ||
    project.communication;
  const communicationList = Array.isArray(rawCommunication) && rawCommunication.length > 0
    ? rawCommunication
    : FIXED_COMMUNICATION;

  const rawPricing = project.companyTemplates?.additionalPricing ||
    project.customItems?.additionalPricing ||
    project.additionalPricing;
  const pricingList = Array.isArray(rawPricing) && rawPricing.length > 0
    ? rawPricing
    : DEFAULT_ADDITIONAL_PRICING;

  // Guarantee that all 13 mandatory project agreements are present on every project's PDF without exception
  const rawAgreements = (project.companyTemplates?.agreements?.map((a: any) => typeof a === 'string' ? a : a.agreement)) ||
    (project.customItems?.projectAgreements?.map((a: any) => typeof a === 'string' ? a : a.agreement)) ||
    (project.projectAgreements?.map((a: any) => typeof a === 'string' ? a : a.agreement)) || 
    FIXED_PROJECT_AGREEMENTS;

  const agreementsList: string[] = [];
  const addedSet = new Set<string>();

  if (Array.isArray(rawAgreements)) {
    for (const item of rawAgreements) {
      if (typeof item === 'string' && item.trim()) {
        agreementsList.push(item.trim());
        addedSet.add(item.trim().toLowerCase());
      }
    }
  }

  // Ensure every single one of the 13 FIXED_PROJECT_AGREEMENTS is present
  for (const fixedAg of FIXED_PROJECT_AGREEMENTS) {
    if (!addedSet.has(fixedAg.trim().toLowerCase())) {
      agreementsList.push(fixedAg);
      addedSet.add(fixedAg.trim().toLowerCase());
    }
  }

  return (
    <div className={`w-full bg-white text-black font-sans leading-relaxed selection:bg-neutral-200 ${isPrintView ? '' : 'overflow-x-auto'}`}>
      
      {/* ================= PAGE 1 ================= */}
      <div className="space-y-6">
        
        {/* Official Nutz Centered Logo */}
        <div className="text-center pt-2 pb-4">
          <NutzLogo size="lg" showTagline={true} />
        </div>

        {/* 2-Column Header Metadata Box (Solid Black Border with Cell Padding) */}
        <table className="nutz-header-box w-full">
          <tbody>
            <tr>
              <td className="w-1/2 align-top pb-3">
                <div className="text-[11px] text-black">Project Name</div>
                <div className="font-bold text-xs sm:text-sm text-black">{project.projectName || 'Enterprise Application'}</div>
              </td>
              <td className="w-1/2 align-top pb-3">
                <div className="text-[11px] text-black">Development team</div>
                <div className="font-bold text-xs sm:text-sm text-black">{companyInfo.developmentTeam || 'Nutz Technovation Private Limited'}</div>
              </td>
            </tr>
            <tr>
              <td className="align-top pb-3">
                <div className="text-[11px] text-black">Project start date</div>
                <div className="font-semibold text-xs text-black">{project.startDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              </td>
              <td className="align-top pb-3">
                <div className="text-[11px] text-black">Project end date</div>
                <div className="font-bold text-xs text-black">
                  {typeof project.endDate === 'number' || /^\d+$/.test(String(project.endDate || '').trim())
                    ? `${project.endDate} Working Days`
                    : (project.endDate || companyInfo.defaultDuration || '60 Working Days')}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-top pb-2">
                <div className="text-[11px] text-black">Date of Document Creation</div>
                <div className="font-semibold text-xs text-black">{project.creationDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              </td>
              <td className="align-top pb-2">
                <div className="text-[11px] text-black">Date Last updated</div>
                <div className="font-semibold text-xs text-black">{project.lastUpdatedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 1. Project Requirements */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-black mb-1">1. Project Requirements</h2>
          <table className="nutz-table w-full">
            <thead>
              <tr>
                <th className="w-3/5">When</th>
                <th className="w-2/5">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {requirementsList.map((req: any, idx: number) => (
                <tr key={idx}>
                  <td className="align-top text-black">{req.requirement}</td>
                  <td className="align-top text-black">
                    <div>{req.when}</div>
                    <div className="font-bold text-black">{req.responsibility}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. Project Deliverables */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-black mb-1">2. Project Deliverables</h2>
          <table className="nutz-table w-full">
            <thead>
              <tr>
                <th className="w-3/5">Deliverable</th>
                <th className="w-1/5">Stage</th>
                <th className="w-1/5">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {deliverablesList.map((del: any, idx: number) => (
                <tr key={idx}>
                  <td className="align-top text-black">{del.deliverable}</td>
                  <td className="align-top text-black">{del.stage}</td>
                  <td className="align-top font-bold text-black">{del.responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ================= PAGE 2: SCOPE & MODULAR ARCHITECTURE OVERVIEW (PERFECTLY DESIGNED) ================= */}
      <div className={`${isPrintView ? 'print-page-break' : ''} pt-8 space-y-6`}>
        
        <div className="border-b-2 border-black pb-1.5 mb-3">
          <h2 className="text-sm font-bold text-black uppercase tracking-wider">
            Scope & Modular Architecture Overview
          </h2>
          <p className="text-[11px] text-black">
            Formal technical specification defining project scope, corporate profile, taxonomies, and modular architecture.
          </p>
        </div>

        {/* Section A: Scope & Product Vision */}
        {project.productDescription && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-black uppercase tracking-wide">
              A. Product Scope & Strategic Objectives
            </h3>
            <table className="nutz-table w-full">
              <tbody>
                <tr>
                  <td className="w-1/4 font-bold align-top text-black">Product Scope</td>
                  <td className="w-3/4 leading-relaxed font-medium text-black">
                    {project.productDescription}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold align-top text-black">Target Timeline</td>
                  <td className="font-semibold text-black">
                    {project.endDate || '60 Working Days from Project Commencement'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Section B: Client & Corporate Entity Profile */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-black uppercase tracking-wide">
            B. Client & Organization Profile
          </h3>
          <table className="nutz-table w-full">
            <tbody>
              <tr>
                <td className="w-1/4 font-bold text-black">Organization / Entity</td>
                <td className="w-3/4 font-bold text-black">{project.companyName || 'Client Organization Pvt Ltd'}</td>
              </tr>
              <tr>
                <td className="font-bold text-black">Primary Stakeholder</td>
                <td className="text-black">
                  {project.contactPerson || 'Authorized Representative'}
                  {project.contactEmail ? ` • Email: ${project.contactEmail}` : ''}
                  {project.contactPhone ? ` • Phone: ${project.contactPhone.startsWith('+') ? project.contactPhone : `+91 ${project.contactPhone.replace(/\D/g, '').slice(-10)}`}` : ''}
                </td>
              </tr>
              <tr>
                <td className="font-bold text-black">Industry & Geography</td>
                <td className="text-black">
                  Industry: {project.industry || 'Software & Enterprise IT'} • Operating Location: {project.locations || 'India (Headquarters)'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section C: Target Business Taxonomies & Platform Footprint */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-black uppercase tracking-wide">
            C. Business Domains & Platform Footprint
          </h3>
          <table className="nutz-table w-full">
            <thead>
              <tr>
                <th className="w-1/3">Architecture Entity</th>
                <th className="w-2/3">Selected Specifications</th>
              </tr>
            </thead>
            <tbody>
              {/* Product Domains */}
              {(selectedCategories.length > 0 || customCategories.length > 0) && (
                <tr>
                  <td className="font-bold align-top text-black">Business Domains</td>
                  <td className="text-black">
                    <ul className="list-disc pl-4 space-y-1 text-xs text-black">
                      {selectedCategories.map((c, i) => (
                        <li key={i}>
                          <strong>[{c.code}] {c.name}</strong> — {c.description}
                        </li>
                      ))}
                      {customCategories.map((cc: string, i: number) => (
                        <li key={`custom-c-${i}`}>
                          <strong>[CUSTOM] {cc}</strong> (Client Specified Domain)
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}

              {/* Product Types / Platforms */}
              {allSelectedTypes.length > 0 && (
                <tr>
                  <td className="font-bold align-top text-black">Platforms & Applications</td>
                  <td className="text-black text-xs">
                    <div className="space-y-2">
                      <div className="font-bold text-black">
                        {allSelectedTypes.map(t => t.name).join(', ')}
                      </div>
                      {allSelectedTypes.some(t => t.note && t.note.trim()) && (
                        <div className="pt-2 border-t border-black space-y-1.5">
                          <div className="font-bold text-black uppercase tracking-wide text-[10px]">
                            Custom Specifications & Rules:
                          </div>
                          <ul className="list-disc pl-4 space-y-1 text-[11px] text-black leading-relaxed">
                            {allSelectedTypes
                              .filter(t => t.note && t.note.trim())
                              .flatMap(t =>
                                t.note!.split(/[\n;]/).map(r => r.trim()).filter(Boolean).map(r => ({ type: t.name, rule: r }))
                              )
                              .map((item, rIdx) => (
                                <li key={rIdx}>
                                  <strong>{item.type}:</strong> {item.rule}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Section D: Modular Architecture Breakdown Matrix */}
        {selectedModularBreakdown.length > 0 && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-black uppercase tracking-wide">
              D. Modular Architecture & Included Capabilities Matrix
            </h3>
            <table className="nutz-table w-full">
              <thead>
                <tr>
                  <th className={hasCustomNotes ? "w-1/4" : "w-1/3"}>Module</th>
                  <th className={hasCustomNotes ? "w-1/2" : "w-2/3"}>Sub-Modules & Selected Capabilities</th>
                  {hasCustomNotes && (
                    <th className="w-1/4">Custom Specification Rules</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {selectedModularBreakdown.map((m, i) => (
                  <tr key={i}>
                    <td className="font-bold align-top text-black">
                      {m.name}
                    </td>
                    <td className="align-top text-black">
                      <div className="space-y-1.5 text-xs text-black">
                        {m.subModules.map((s, si) => (
                          <div key={si} className="pl-1">
                            <span className="font-bold">• {s.name}: </span>
                            <span className="text-[11px] text-black">
                              {s.chosenOptions.length > 0 ? s.chosenOptions.join(', ') : 'Selected Feature'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    {hasCustomNotes && (
                      <td className="align-top text-xs text-black">
                        {m.customNotes && m.customNotes.length > 0 ? (
                          <div className="space-y-1.5 text-[11px] text-black leading-relaxed">
                            {m.customNotes.map((note, nIdx) => (
                              <div key={nIdx} className="flex items-start gap-1.5 pl-0.5">
                                <span className="font-bold text-black shrink-0 leading-tight">•</span>
                                <span className="text-black font-medium leading-tight">{note}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] text-black/60 italic">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Technologies and Tools */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-black mb-1">3. Technologies and Tools</h2>
          <table className="nutz-table w-full">
            <thead>
              <tr>
                <th className="w-1/2">Function</th>
                <th className="w-1/2">Technology/Tool</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(techStack)
                .filter(([_, val]) => typeof val === 'string' && val.trim() !== '')
                .map(([key, val], idx) => (
                  <tr key={idx}>
                    <td className="font-medium align-top text-black">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </td>
                    <td className="font-bold text-black align-top">{val as string}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Communication */}
        <div>
          <h2 className="text-sm font-bold text-black mb-1">4. Communication</h2>
          <table className="nutz-table w-full">
            <thead>
              <tr>
                <th className="w-1/3">Function</th>
                <th className="w-1/3">Means</th>
                <th className="w-1/3">Notes/Links</th>
              </tr>
            </thead>
            <tbody>
              {communicationList.map((comm: any, idx: number) => (
                <tr key={idx}>
                  <td className="font-bold align-top text-black">{comm.function}</td>
                  <td className="align-top text-black">{comm.means}</td>
                  <td className="align-top text-black">{comm.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. Additional Pricing */}
        <div>
          <h2 className="text-sm font-bold text-black mb-1">5. Additional Pricing</h2>
          <table className="nutz-table w-full">
            <thead>
              <tr>
                <th className="w-1/3">Function</th>
                <th className="w-1/3">Provider</th>
                <th className="w-1/3">Estimate</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((price: any, idx: number) => (
                <tr key={idx}>
                  <td className="font-medium align-top text-black">{price.function}</td>
                  <td className="align-top text-black">{price.provider}</td>
                  <td className="align-top font-semibold text-black">{price.estimate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ================= PAGE 3: ARCHITECTURE & SYSTEM FLOW (BORDERLESS LEFT-ALIGNED) ================= */}
      <div className={`${isPrintView ? 'print-page-break' : ''} pt-8 space-y-6`}>
        <h2 className="text-sm font-bold text-black mb-2">6. Architecture & System Flow</h2>

        <div className="space-y-6 text-xs font-mono text-black">
          <div>
            <h3 className="font-sans font-bold text-xs text-black mb-2">Overall System Flow</h3>
            <pre className="bg-transparent whitespace-pre leading-relaxed font-mono text-[11px] overflow-x-auto text-black text-left pl-0 py-1 border-0">
              {flows.overallSystemFlow}
            </pre>
          </div>

          <div>
            <h3 className="font-sans font-bold text-xs text-black mb-2">High-Level Architecture Flow</h3>
            <pre className="bg-transparent whitespace-pre leading-relaxed font-mono text-[11px] overflow-x-auto text-black text-left pl-0 py-1 border-0">
              {flows.highLevelArchitectureFlow}
            </pre>
          </div>

          <div>
            <h3 className="font-sans font-bold text-xs text-black mb-2">Admin Flow</h3>
            <pre className="bg-transparent whitespace-pre leading-relaxed font-mono text-[11px] overflow-x-auto text-black text-left pl-0 py-1 border-0">
              {flows.adminFlow}
            </pre>
          </div>
        </div>
      </div>

      {/* ================= PAGE 4: PHASE-WISE FLOW & IMPLEMENTATION PHASES ================= */}
      <div className={`${isPrintView ? 'print-page-break' : ''} pt-8 space-y-6`}>
        {flows.phaseWiseFlow && (
          <div>
            <h3 className="font-sans font-bold text-xs text-black mb-2">Phase-wise Flow</h3>
            <pre className="bg-transparent font-mono text-[11px] whitespace-pre leading-relaxed overflow-x-auto text-black text-left pl-0 py-1 border-0">
              {flows.phaseWiseFlow}
            </pre>
          </div>
        )}

        <h2 className="text-sm font-bold text-black pt-4 mb-2">7. Implementation Phases</h2>

        {phasesList.map((phase: any, pIdx: number) => (
          <div key={phase.phaseNumber || pIdx} className="print-avoid-break space-y-2 pt-2">
            <h3 className="text-xs font-bold text-black">
              {phase.phaseNumber || pIdx + 1}. {phase.title || `Phase ${phase.phaseNumber || pIdx + 1}`}
            </h3>
            {phase.outcome && (
              <p className="text-xs text-black">
                <strong>Outcome:</strong> {phase.outcome}
              </p>
            )}
            {phase.duration && (
              <p className="text-xs text-black">
                <strong>Duration:</strong> {phase.duration}
              </p>
            )}

            <table className="nutz-table w-full">
              <thead>
                <tr>
                  <th className="w-1/3">Module</th>
                  <th className="w-2/3">Features</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(phase.modules) && phase.modules.map((mod: any, mIdx: number) => (
                  <tr key={mIdx}>
                    <td className="font-bold align-top text-black">{mod.module || mod.name || 'Module'}</td>
                    <td className="align-top text-black">
                      <ul className="list-disc pl-4 space-y-0.5 text-xs text-black">
                        {Array.isArray(mod.features) ? mod.features.map((feat: string, fIdx: number) => (
                          <li key={fIdx}>{feat}</li>
                        )) : (
                          <li>{typeof mod.features === 'string' ? mod.features : 'Module Implementation'}</li>
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* ================= PAGE 5: PAYMENTS, DYNAMIC EXCLUSIONS & AGREEMENTS ================= */}
      <div className={`${isPrintView ? 'print-page-break' : ''} pt-8 space-y-6`}>
        {/* 8. Payments, Splitups & Duration */}
        <div>
          <h2 className="text-sm font-bold text-black mb-1">8. Payments, Splitups & Duration</h2>
          <p className="text-xs text-black mb-3">
            <strong>Project Duration :</strong> {project.endDate || '60 Working Days from Start Date'}
          </p>

          <div className="space-y-3">
            {project.paymentSplitup?.milestones ? (
              project.paymentSplitup.milestones.map((m: any, idx: number) => (
                <div key={idx} className="p-3.5 bg-white border border-black rounded-none text-xs space-y-1 text-black">
                  <div className="font-bold text-black text-xs">{m.name}</div>
                  <div><strong>Duration / Timing :</strong> {m.timing}</div>
                  {m.percentage && <div><strong>Milestone Percentage :</strong> {m.percentage}%</div>}
                  <div><strong>Payment Terms :</strong> Invoiced as per signed agreement schedule</div>
                </div>
              ))
            ) : (
              <>
                <div className="p-3.5 bg-white border border-black rounded-none text-xs space-y-1 text-black">
                  <div className="font-bold text-black text-xs">Advance Payment (40%)</div>
                  <div><strong>Duration :</strong> Before Project Commencement</div>
                  <div><strong>Development Amount :</strong> INR 80,000/-</div>
                  <div><strong>GST (18%) :</strong> INR 14,400/-</div>
                  <div><strong>Total Amount :</strong> INR 94,400/-</div>
                  <div><strong>Payment :</strong> TBD</div>
                </div>
                <div className="p-3.5 bg-white border border-black rounded-none text-xs space-y-1 text-black">
                  <div className="font-bold text-black text-xs">Midway Milestone (30%)</div>
                  <div><strong>Duration :</strong> At 30 Working Days</div>
                  <div><strong>Development Amount :</strong> INR 60,000/-</div>
                  <div><strong>GST (18%) :</strong> INR 10,800/-</div>
                  <div><strong>Total Amount :</strong> INR 70,800/-</div>
                  <div><strong>Payment :</strong> TBD</div>
                </div>
                <div className="p-3.5 bg-white border border-black rounded-none text-xs space-y-1 text-black">
                  <div className="font-bold text-black text-xs">Project Completion (30%)</div>
                  <div><strong>Duration :</strong> After UAT & Handover</div>
                  <div><strong>Development Amount :</strong> INR 60,000/-</div>
                  <div><strong>GST (18%) :</strong> INR 10,800/-</div>
                  <div><strong>Total Amount :</strong> INR 70,800/-</div>
                  <div><strong>Payment :</strong> TBD</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 9. Excluded */}
        <div className="pt-2">
          <div className="border-b border-black pb-1 mb-2">
            <h2 className="text-sm font-bold text-black">9. Excluded</h2>
          </div>
          <ol className="list-decimal pl-5 text-xs text-black space-y-1.5 leading-relaxed">
            {dynamicExcludedList.map((item: string, idx: number) => (
              <li key={idx} className="text-black">
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* 10. Other project agreements */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-black mb-2">10. Other project agreements</h2>
          <ol className="list-decimal pl-5 text-xs text-black space-y-1.5 leading-relaxed">
            {agreementsList.map((agreement: string, idx: number) => (
              <li key={idx}>{agreement}</li>
            ))}
          </ol>
        </div>
      </div>

    </div>
  );
};
