'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building, 
  CheckSquare, 
  Package, 
  Layers, 
  MessageSquare, 
  DollarSign, 
  ShieldAlert, 
  Calendar, 
  FileText, 
  Save, 
  RotateCcw, 
  History, 
  Plus, 
  Trash2, 
  Check, 
  Loader2,
  Sliders,
  ChevronDown,
  X,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  CompanyTemplatePreset, 
  CompanyTemplateStore,
  RequirementItem,
  DeliverableItem,
  CommunicationItem,
  AdditionalPricingItem
} from '@/lib/templates';
import { 
  FIXED_PROJECT_REQUIREMENTS, 
  FIXED_PROJECT_DELIVERABLES, 
  FIXED_COMMUNICATION, 
  DEFAULT_ADDITIONAL_PRICING, 
  FIXED_PROJECT_AGREEMENTS,
  DEFAULT_TECH_STACK 
} from '@/data/nutzTemplate';
import { GsapLoadingScreen } from '@/components/GsapLoadingScreen';

export default function AdminTemplatesPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Template Store & Active Preset
  const [templateStore, setTemplateStore] = useState<CompanyTemplateStore | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<CompanyTemplatePreset | null>(null);
  const [activeSection, setActiveSection] = useState<
    'company' | 'requirements' | 'deliverables' | 'techstack' | 'communication' | 'pricing' | 'scope' | 'phases' | 'exclusions' | 'agreements'
  >('company');

  // Action States
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Modals
  const [isNewPresetModalOpen, setIsNewPresetModalOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetDesc, setNewPresetDesc] = useState('');
  const [cloneFromPresetId, setCloneFromPresetId] = useState('');

  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [newVersionNotes, setNewVersionNotes] = useState('');

  useEffect(() => {
    // Instant session hydration from storage for zero-delay initial paint
    try {
      const cached = sessionStorage.getItem('frdg_user');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.role === 'admin') setCurrentUser(parsed);
      }
    } catch (e) {}

    const init = async () => {
      try {
        // Parallelized network requests
        const [authRes, res] = await Promise.all([
          fetch('/api/auth/me', { cache: 'no-store' }),
          fetch('/api/admin/templates', { cache: 'no-store' }),
        ]);

        const authData = await authRes.json();
        if (!authRes.ok || !authData.user || authData.user.role !== 'admin') {
          router.push('/login?redirect=/admin/templates');
          return;
        }
        setCurrentUser(authData.user);
        try {
          sessionStorage.setItem('frdg_user', JSON.stringify(authData.user));
        } catch (e) {}

        const data = await res.json();
        if (data.success && data.store) {
          setTemplateStore(data.store);
          setActiveTemplate(data.activeTemplate || data.store.templates[0]);
        }
      } catch (err: any) {
        setErrorMessage(err.message || 'Failed to load template data');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleSelectPreset = (presetId: string) => {
    if (!templateStore) return;
    const found = templateStore.templates.find(t => t.id === presetId);
    if (found) {
      setActiveTemplate(JSON.parse(JSON.stringify(found)));
    }
  };

  const handleSaveTemplate = async () => {
    if (!activeTemplate || !templateStore) return;
    setIsSaving(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_template',
          templateData: activeTemplate,
          versionNotes: newVersionNotes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save template');
      }
      setTemplateStore(data.store);
      setActiveTemplate(data.activeTemplate);
      setNewVersionNotes('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while saving template');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreatePreset = async () => {
    if (!newPresetName.trim()) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_template',
          name: newPresetName.trim(),
          description: newPresetDesc.trim(),
          cloneFromId: cloneFromPresetId || activeTemplate?.id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTemplateStore(data.store);
        setActiveTemplate(data.activeTemplate);
        setIsNewPresetModalOpen(false);
        setNewPresetName('');
        setNewPresetDesc('');
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToFactory = () => {
    if (!activeTemplate) return;
    if (!confirm('Are you sure you want to reset this preset to Nutz factory defaults?')) return;
    
    setActiveTemplate({
      ...activeTemplate,
      requirements: JSON.parse(JSON.stringify(FIXED_PROJECT_REQUIREMENTS)),
      deliverables: JSON.parse(JSON.stringify(FIXED_PROJECT_DELIVERABLES)),
      techStack: JSON.parse(JSON.stringify(DEFAULT_TECH_STACK)),
      communication: JSON.parse(JSON.stringify(FIXED_COMMUNICATION)),
      additionalPricing: JSON.parse(JSON.stringify(DEFAULT_ADDITIONAL_PRICING)),
      agreements: FIXED_PROJECT_AGREEMENTS.map((a, idx) => ({
        id: `agr-${idx + 1}`,
        agreement: a,
        order: idx + 1,
      })),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  if (loading) {
    return <GsapLoadingScreen message="Loading Blueprint Studio..." subtitle="Loading enterprise master specifications & templates..." />;
  }

  // System Architecture is built dynamically by AI and managed per-client document,
  // so it is removed from the static template preset manager as requested.
  const sections = [
    { id: 'company', label: 'Company & Brand', icon: Building },
    { id: 'requirements', label: 'Core Requirements', icon: CheckSquare },
    { id: 'deliverables', label: 'Deliverables Matrix', icon: Package },
    { id: 'techstack', label: 'Default Tech Stack', icon: Layers },
    { id: 'communication', label: 'Communication SLA', icon: MessageSquare },
    { id: 'pricing', label: 'Milestone & Addon Rates', icon: DollarSign },
    { id: 'scope', label: 'Scope & Objectives', icon: Sliders },
    { id: 'phases', label: 'Project Phases', icon: Calendar },
    { id: 'exclusions', label: 'Contract Exclusions', icon: ShieldAlert },
    { id: 'agreements', label: '10. Project Agreements', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pt-20 sm:pt-28 pb-24 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
        
        {/* ================= REDESIGNED PRODUCTION BLUEPRINT HEADER & TOOLBAR ================= */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:px-7 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left: Professional Brand & Active Template Indicator */}
          <div className="flex items-center gap-3.5 min-w-0">
            <Link
              href="/admin"
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 transition-all shrink-0 flex items-center gap-1.5 text-xs font-semibold shadow-2xs group"
              title="Back to Admin Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-purple-600 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-900 via-indigo-900 to-slate-900 text-white flex items-center justify-center shadow-md shadow-purple-950/20 shrink-0">
              <Sliders className="w-5 h-5 text-purple-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-extrabold text-neutral-900 tracking-tight font-display truncate">
                  Company Blueprint Manager
                </h1>
                {activeTemplate?.isDefault ? (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase shrink-0">
                    Default Active
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 font-semibold uppercase shrink-0">
                    Custom Preset
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 font-medium truncate mt-0.5">
                Active Preset: <span className="text-purple-700 font-bold">{activeTemplate?.name}</span>
              </p>
            </div>
          </div>

          {/* Right: Consolidated Action Toolbar */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 shrink-0">
            
            {/* Minimalist Unique Preset Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="sm" className="gap-2 bg-neutral-50/80 border-neutral-200 h-8 rounded-xl font-medium">
                    <span className="text-neutral-400 font-normal">Preset:</span>
                    <span className="max-w-[150px] truncate font-semibold text-neutral-800">
                      {activeTemplate?.name || 'Select Preset'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 ml-0.5" />
                  </Button>
                }
              />
              <DropdownMenuContent className="min-w-64" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Master Blueprint Presets</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={activeTemplate?.id || ''}
                    onValueChange={(val) => handleSelectPreset(val)}
                  >
                    {templateStore?.templates.map((tpl) => (
                      <DropdownMenuRadioItem key={tpl.id} value={tpl.id}>
                        <Layers className="w-4 h-4 text-neutral-500" />
                        <div className="flex flex-col text-left">
                          <span className="font-semibold text-xs leading-tight">{tpl.name}</span>
                          {tpl.isDefault && (
                            <span className="text-[10px] text-emerald-600 font-mono">Default Active</span>
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Version History Button */}
            <button
              onClick={() => setIsVersionHistoryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
              title="View preset version history"
            >
              <History className="w-3.5 h-3.5 text-neutral-500" />
              <span>Versions ({activeTemplate?.versionHistory?.length || 1})</span>
            </button>

            {/* New Preset Button */}
            <button
              onClick={() => setIsNewPresetModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-neutral-500" />
              <span>New Preset</span>
            </button>

            {/* Reset Defaults Button */}
            <button
              onClick={handleResetToFactory}
              className="p-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-500 hover:text-neutral-900 shadow-2xs transition-colors cursor-pointer"
              title="Reset preset to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Primary Save Action */}
            <button
              onClick={handleSaveTemplate}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6b47ff] hover:bg-[#5833e6] active:scale-[0.98] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <div className="loader loader-xs loader-white shrink-0" />
              ) : saveSuccess ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{saveSuccess ? 'Changes Saved' : 'Save Changes'}</span>
            </button>
          </div>

        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage('')} className="p-1 rounded-md hover:bg-red-100 text-red-600 transition-colors ml-2">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {saveSuccess && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Master blueprint updated! Changes will automatically reflect in new client discovery wizards and generated documents.</span>
          </div>
        )}

        {/* ================= 2-COLUMN BALANCED LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR: RESPONSIVE - HORIZONTAL CHIPS ON MOBILE/TABLET, STICKY SIDEBAR ON DESKTOP */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 self-start w-full">
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-2 sm:p-2.5 shadow-2xs flex lg:flex-col overflow-x-auto no-scrollbar gap-1.5 lg:space-y-1">
              <div className="hidden lg:block px-3 py-2 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Blueprint Sections
              </div>
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id as any)}
                    className={`shrink-0 lg:w-full flex items-center gap-2 lg:gap-3 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 bg-neutral-50/50 lg:bg-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT CANVAS: SECTION CONTENT */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Section 1: Company & Brand */}
            {activeSection === 'company' && activeTemplate && (
              <div className="space-y-6">
                
                {/* Header Card */}
                <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-neutral-900">Company & Global Document Metadata</h2>
                      <p className="text-xs text-neutral-500">Official company credentials and service standards applied across generated contracts.</p>
                    </div>
                  </div>
                </div>

                {/* Form Card 1: Organization Identity */}
                <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                  <div className="border-b border-neutral-100 pb-3">
                    <h3 className="text-sm font-bold text-neutral-900">Organization Identity</h3>
                    <p className="text-xs text-neutral-500">Legal entity information printed on the cover page and signature block.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Registered Legal Company Name
                      </label>
                      <input
                        type="text"
                        value={activeTemplate.companyInfo.name}
                        onChange={(e) => setActiveTemplate({
                          ...activeTemplate,
                          companyInfo: { ...activeTemplate.companyInfo, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:outline-none bg-white transition-all font-medium text-neutral-900"
                      />
                      <span className="text-[11px] text-neutral-400 mt-1 block">Full legal name for contractual agreements</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Development Team Name
                      </label>
                      <input
                        type="text"
                        value={activeTemplate.companyInfo.developmentTeam}
                        onChange={(e) => setActiveTemplate({
                          ...activeTemplate,
                          companyInfo: { ...activeTemplate.companyInfo, developmentTeam: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:outline-none bg-white transition-all font-medium text-neutral-900"
                      />
                      <span className="text-[11px] text-neutral-400 mt-1 block">Engineering department or brand label</span>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Brand Tagline
                      </label>
                      <input
                        type="text"
                        value={activeTemplate.companyInfo.tagline}
                        onChange={(e) => setActiveTemplate({
                          ...activeTemplate,
                          companyInfo: { ...activeTemplate.companyInfo, tagline: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:outline-none bg-white transition-all font-medium text-neutral-900"
                      />
                      <span className="text-[11px] text-neutral-400 mt-1 block">Displayed beneath the brand logo in the document header</span>
                    </div>
                  </div>
                </div>

                {/* Form Card 2: Delivery & SLA Defaults */}
                <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                  <div className="border-b border-neutral-100 pb-3">
                    <h3 className="text-sm font-bold text-neutral-900">Default Delivery & Warranty Benchmarks</h3>
                    <p className="text-xs text-neutral-500">Default duration and warranty values populated when client projects are created.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Default Project Duration Standard
                      </label>
                      <input
                        type="text"
                        value={activeTemplate.companyInfo.defaultDuration}
                        onChange={(e) => setActiveTemplate({
                          ...activeTemplate,
                          companyInfo: { ...activeTemplate.companyInfo, defaultDuration: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:outline-none bg-white transition-all font-medium text-neutral-900"
                      />
                      <span className="text-[11px] text-neutral-400 mt-1 block">e.g. 60 Working Days (Standard Enterprise SLA)</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Free Post-Delivery Support (Days)
                      </label>
                      <input
                        type="number"
                        value={activeTemplate.companyInfo.supportDays}
                        onChange={(e) => setActiveTemplate({
                          ...activeTemplate,
                          companyInfo: { ...activeTemplate.companyInfo, supportDays: parseInt(e.target.value) || 30 }
                        })}
                        className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 focus:outline-none bg-white transition-all font-medium text-neutral-900"
                      />
                      <span className="text-[11px] text-neutral-400 mt-1 block">Included complimentary bug-fixing and deployment support</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Section 2: Core Requirements */}
            {activeSection === 'requirements' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">Mandatory Project Requirements</h2>
                    <p className="text-xs text-neutral-500">Standard non-functional and quality benchmarks included in every specification.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newReq: RequirementItem = {
                        id: `req-${Date.now()}`,
                        requirement: 'New Quality Standard Requirement',
                        when: 'Pre-Deployment & Handover',
                        responsibility: 'Both',
                        enabled: true,
                        order: activeTemplate.requirements.length + 1,
                      };
                      setActiveTemplate({
                        ...activeTemplate,
                        requirements: [...activeTemplate.requirements, newReq],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium cursor-pointer shadow-2xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Requirement</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {activeTemplate.requirements.map((req, idx) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/40 hover:bg-white hover:border-neutral-300 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">Standard #{idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-neutral-500">Party:</span>
                          <select
                            value={req.responsibility}
                            onChange={(e) => {
                              const updated = [...activeTemplate.requirements];
                              updated[idx].responsibility = e.target.value as any;
                              setActiveTemplate({ ...activeTemplate, requirements: updated });
                            }}
                            className="px-2 py-1 text-xs border border-neutral-200 rounded-md bg-white font-medium"
                          >
                            <option value="Nutz">Nutz</option>
                            <option value="Client">Client</option>
                            <option value="Both">Both</option>
                          </select>
                          <button
                            onClick={() => {
                              const updated = activeTemplate.requirements.filter((_, i) => i !== idx);
                              setActiveTemplate({ ...activeTemplate, requirements: updated });
                            }}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        value={req.requirement}
                        onChange={(e) => {
                          const updated = [...activeTemplate.requirements];
                          updated[idx].requirement = e.target.value;
                          setActiveTemplate({ ...activeTemplate, requirements: updated });
                        }}
                        rows={2}
                        className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none bg-white resize-none"
                      />

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-500 font-medium">Timing / Phase:</span>
                        <input
                          type="text"
                          value={req.when}
                          onChange={(e) => {
                            const updated = [...activeTemplate.requirements];
                            updated[idx].when = e.target.value;
                            setActiveTemplate({ ...activeTemplate, requirements: updated });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs border border-neutral-200 rounded-md bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Deliverables Matrix */}
            {activeSection === 'deliverables' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">Project Deliverables Matrix</h2>
                    <p className="text-xs text-neutral-500">Contractual software assets, source code repositories, and documentation handovers.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newDel: DeliverableItem = {
                        id: `del-${Date.now()}`,
                        deliverable: 'New Contractual Deliverable Package',
                        stage: 'Final Deployment',
                        responsibility: 'Nutz',
                        order: activeTemplate.deliverables.length + 1,
                      };
                      setActiveTemplate({
                        ...activeTemplate,
                        deliverables: [...activeTemplate.deliverables, newDel],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium cursor-pointer shadow-2xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Deliverable</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {activeTemplate.deliverables.map((del, idx) => (
                    <div
                      key={del.id}
                      className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/40 hover:bg-white hover:border-neutral-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">Deliverable #{idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={del.responsibility}
                            onChange={(e) => {
                              const updated = [...activeTemplate.deliverables];
                              updated[idx].responsibility = e.target.value as any;
                              setActiveTemplate({ ...activeTemplate, deliverables: updated });
                            }}
                            className="px-2 py-1 text-xs border border-neutral-200 rounded-md bg-white font-medium"
                          >
                            <option value="Nutz">Nutz</option>
                            <option value="Client">Client</option>
                            <option value="Both">Both</option>
                          </select>
                          <button
                            onClick={() => {
                              const updated = activeTemplate.deliverables.filter((_, i) => i !== idx);
                              setActiveTemplate({ ...activeTemplate, deliverables: updated });
                            }}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={del.deliverable}
                        onChange={(e) => {
                          const updated = [...activeTemplate.deliverables];
                          updated[idx].deliverable = e.target.value;
                          setActiveTemplate({ ...activeTemplate, deliverables: updated });
                        }}
                        className="w-full px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white"
                      />

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-neutral-500 font-medium">Handover Stage:</span>
                        <input
                          type="text"
                          value={del.stage}
                          onChange={(e) => {
                            const updated = [...activeTemplate.deliverables];
                            updated[idx].stage = e.target.value;
                            setActiveTemplate({ ...activeTemplate, deliverables: updated });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs border border-neutral-200 rounded-md bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Default Tech Stack */}
            {activeSection === 'techstack' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="border-b border-neutral-100 pb-4">
                  <h2 className="text-base font-bold text-neutral-900">Default Technology Stack Architecture</h2>
                  <p className="text-xs text-neutral-500">Preset architectural components applied across project proposals.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(activeTemplate.techStack || {}).map(([layer, value]) => (
                    <div key={layer} className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/40">
                      <label className="block text-xs font-semibold text-neutral-700 capitalize mb-1">
                        {layer} Layer
                      </label>
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => setActiveTemplate({
                          ...activeTemplate,
                          techStack: { ...activeTemplate.techStack, [layer]: e.target.value }
                        })}
                        className="w-full px-3 py-2 text-xs font-medium border border-neutral-200 rounded-md bg-white focus:border-neutral-900 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Communication Channels */}
            {activeSection === 'communication' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">Communication Protocols & Cadence</h2>
                    <p className="text-xs text-neutral-500">Official channels and reporting rhythms established in the contract.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newComm: CommunicationItem = {
                        id: `comm-${Date.now()}`,
                        function: 'Weekly Sprint Demo & Review',
                        means: 'Google Meet Video & Notion Dashboard',
                        notes: 'Formal milestone signoffs and sprint review',
                        order: activeTemplate.communication.length + 1,
                      };
                      setActiveTemplate({
                        ...activeTemplate,
                        communication: [...activeTemplate.communication, newComm],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium cursor-pointer shadow-2xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Protocol</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {activeTemplate.communication.map((comm, idx) => (
                    <div
                      key={comm.id}
                      className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/40 hover:bg-white hover:border-neutral-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">Channel #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = activeTemplate.communication.filter((_, i) => i !== idx);
                            setActiveTemplate({ ...activeTemplate, communication: updated });
                          }}
                          className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">Purpose / Function</label>
                          <input
                            type="text"
                            value={comm.function}
                            onChange={(e) => {
                              const updated = [...activeTemplate.communication];
                              updated[idx].function = e.target.value;
                              setActiveTemplate({ ...activeTemplate, communication: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-neutral-200 rounded-md bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">Means / Platform</label>
                          <input
                            type="text"
                            value={comm.means}
                            onChange={(e) => {
                              const updated = [...activeTemplate.communication];
                              updated[idx].means = e.target.value;
                              setActiveTemplate({ ...activeTemplate, communication: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-neutral-200 rounded-md bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-neutral-600 mb-1">Guidelines & Scope</label>
                        <input
                          type="text"
                          value={comm.notes}
                          onChange={(e) => {
                            const updated = [...activeTemplate.communication];
                            updated[idx].notes = e.target.value;
                            setActiveTemplate({ ...activeTemplate, communication: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-200 rounded-md bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 6: Milestone & Addon Rates */}
            {activeSection === 'pricing' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">Additional Services & Commercial Rates</h2>
                    <p className="text-xs text-neutral-500">Hourly consulting benchmarks and third-party fee estimates.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newPrice: AdditionalPricingItem = {
                        id: `price-${Date.now()}`,
                        function: 'Senior Cloud Solutions Architect',
                        provider: 'Nutz Lead',
                        estimate: '₹4,500 / Hr',
                        notes: 'Billed monthly on hours logged',
                        order: activeTemplate.additionalPricing.length + 1,
                      };
                      setActiveTemplate({
                        ...activeTemplate,
                        additionalPricing: [...activeTemplate.additionalPricing, newPrice],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium cursor-pointer shadow-2xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Rate Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {activeTemplate.additionalPricing.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/40 hover:bg-white hover:border-neutral-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">Rate Entry #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = activeTemplate.additionalPricing.filter((_, i) => i !== idx);
                            setActiveTemplate({ ...activeTemplate, additionalPricing: updated });
                          }}
                          className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">Service Function</label>
                          <input
                            type="text"
                            value={item.function}
                            onChange={(e) => {
                              const updated = [...activeTemplate.additionalPricing];
                              updated[idx].function = e.target.value;
                              setActiveTemplate({ ...activeTemplate, additionalPricing: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-neutral-200 rounded-md bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">Provider / Role</label>
                          <input
                            type="text"
                            value={item.provider}
                            onChange={(e) => {
                              const updated = [...activeTemplate.additionalPricing];
                              updated[idx].provider = e.target.value;
                              setActiveTemplate({ ...activeTemplate, additionalPricing: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs border border-neutral-200 rounded-md bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-neutral-600 mb-1">Estimate</label>
                          <input
                            type="text"
                            value={item.estimate}
                            onChange={(e) => {
                              const updated = [...activeTemplate.additionalPricing];
                              updated[idx].estimate = e.target.value;
                              setActiveTemplate({ ...activeTemplate, additionalPricing: updated });
                            }}
                            className="w-full px-2.5 py-1.5 text-xs font-semibold text-emerald-700 border border-neutral-200 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 7: Scope & Objectives */}
            {activeSection === 'scope' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="border-b border-neutral-100 pb-4">
                  <h2 className="text-base font-bold text-neutral-900">Default Scope & Objectives Narratives</h2>
                  <p className="text-xs text-neutral-500">Standard strategic context clauses populated into section 1 and 2 of new projects.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Strategic Objectives Overview
                    </label>
                    <textarea
                      value={activeTemplate.scopeDefaults?.strategicObjectives || ''}
                      onChange={(e) => setActiveTemplate({
                        ...activeTemplate,
                        scopeDefaults: { ...activeTemplate.scopeDefaults, strategicObjectives: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none bg-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Corporate Profile & Capabilities Overview
                    </label>
                    <textarea
                      value={activeTemplate.scopeDefaults?.corporateProfile || ''}
                      onChange={(e) => setActiveTemplate({
                        ...activeTemplate,
                        scopeDefaults: { ...activeTemplate.scopeDefaults, corporateProfile: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none bg-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Domains & Regional Footprint Standard
                    </label>
                    <textarea
                      value={activeTemplate.scopeDefaults?.domainsFootprint || ''}
                      onChange={(e) => setActiveTemplate({
                        ...activeTemplate,
                        scopeDefaults: { ...activeTemplate.scopeDefaults, domainsFootprint: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none bg-white resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 8: Project Phases */}
            {activeSection === 'phases' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="border-b border-neutral-100 pb-4">
                  <h2 className="text-base font-bold text-neutral-900">Implementation Roadmap Phases ({activeTemplate.implementationPhases?.length || 4})</h2>
                  <p className="text-xs text-neutral-500">Sprint stages and milestone commitments for client delivery.</p>
                </div>

                <div className="space-y-3">
                  {(activeTemplate.implementationPhases || []).map((ph, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-neutral-200 bg-neutral-50/40 space-y-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-neutral-900">
                          Phase {ph.phase}: {ph.title}
                        </span>
                        <input
                          type="text"
                          value={ph.duration}
                          onChange={(e) => {
                            const updated = [...activeTemplate.implementationPhases];
                            updated[idx].duration = e.target.value;
                            setActiveTemplate({ ...activeTemplate, implementationPhases: updated });
                          }}
                          className="px-2.5 py-1 text-xs border border-neutral-200 rounded-md bg-white font-mono"
                        />
                      </div>
                      <textarea
                        value={ph.description}
                        onChange={(e) => {
                          const updated = [...activeTemplate.implementationPhases];
                          updated[idx].description = e.target.value;
                          setActiveTemplate({ ...activeTemplate, implementationPhases: updated });
                        }}
                        rows={2}
                        className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg bg-white resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 9: Contract Exclusions */}
            {activeSection === 'exclusions' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="border-b border-neutral-100 pb-4">
                  <h2 className="text-base font-bold text-neutral-900">Standard Scope Exclusions</h2>
                  <p className="text-xs text-neutral-500">Items explicitly excluded to protect project timelines and scope boundaries.</p>
                </div>

                <div className="space-y-2.5">
                  {(activeTemplate.standardExclusions || []).map((exc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 bg-neutral-50/50">
                      <span className="text-xs font-mono text-neutral-400 font-bold px-2">#{idx + 1}</span>
                      <input
                        type="text"
                        value={exc}
                        onChange={(e) => {
                          const updated = [...(activeTemplate.standardExclusions || [])];
                          updated[idx] = e.target.value;
                          setActiveTemplate({ ...activeTemplate, standardExclusions: updated });
                        }}
                        className="flex-1 px-2 py-1 text-xs border-0 bg-transparent focus:outline-none font-medium text-neutral-800"
                      />
                      <button
                        onClick={() => {
                          const updated = (activeTemplate.standardExclusions || []).filter((_, i) => i !== idx);
                          setActiveTemplate({ ...activeTemplate, standardExclusions: updated });
                        }}
                        className="p-1 text-neutral-400 hover:text-red-600 mr-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setActiveTemplate({
                        ...activeTemplate,
                        standardExclusions: [...(activeTemplate.standardExclusions || []), 'New scope exclusion clause'],
                      });
                    }}
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950 py-2 px-3 rounded-lg border border-dashed border-neutral-300 hover:border-neutral-800 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Exclusion Item</span>
                  </button>
                </div>
              </div>
            )}

            {/* Section 10: Other Project Agreements */}
            {activeSection === 'agreements' && activeTemplate && (
              <div className="bg-white rounded-xl border border-neutral-200/90 p-6 shadow-2xs space-y-5">
                <div className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">10. Other Project Agreements</h2>
                    <p className="text-xs text-neutral-500">13 mandatory binding legal clauses included on every project PDF.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const standardList = FIXED_PROJECT_AGREEMENTS.map((a, idx) => ({
                          id: `agr-${idx + 1}`,
                          agreement: a,
                          order: idx + 1,
                        }));
                        setActiveTemplate({ ...activeTemplate, agreements: standardList });
                      }}
                      className="inline-flex items-center px-2.5 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Reset to 13 Standard Agreements
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const currentAgreements = activeTemplate.agreements || [];
                        const nextId = `agr-${currentAgreements.length + 1}`;
                        const updated = [
                          ...currentAgreements,
                          { id: nextId, agreement: '', order: currentAgreements.length + 1 }
                        ];
                        setActiveTemplate({ ...activeTemplate, agreements: updated });
                      }}
                      className="inline-flex items-center px-2.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Add Agreement Clause</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeTemplate.agreements?.map((agr: any, idx: number) => {
                    const agreementText = typeof agr === 'string' ? agr : (agr.agreement || '');
                    return (
                      <div key={agr.id || `agr-${idx}`} className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/40 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                          <span>Clause {idx + 1}</span>
                          {idx >= 13 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = activeTemplate.agreements.filter((_: any, i: number) => i !== idx);
                                setActiveTemplate({ ...activeTemplate, agreements: updated });
                              }}
                              className="text-red-500 hover:text-red-700 text-[11px] font-medium"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <textarea
                          value={agreementText}
                          onChange={(e) => {
                            const updated = [...activeTemplate.agreements];
                            if (typeof updated[idx] === 'string') {
                              updated[idx] = { id: `agr-${idx + 1}`, agreement: e.target.value, order: idx + 1 };
                            } else {
                              updated[idx] = { ...updated[idx], agreement: e.target.value };
                            }
                            setActiveTemplate({ ...activeTemplate, agreements: updated });
                          }}
                          rows={2}
                          className="w-full p-2.5 text-xs border border-neutral-200 rounded-md bg-white focus:outline-none resize-none font-sans leading-relaxed"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* New Preset Modal */}
      {isNewPresetModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-neutral-900">Create New Specification Preset</h3>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Preset Name</label>
              <input
                type="text"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="e.g. Enterprise Microservices Blueprint"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Description</label>
              <input
                type="text"
                value={newPresetDesc}
                onChange={(e) => setNewPresetDesc(e.target.value)}
                placeholder="Brief summary of what this blueprint covers"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsNewPresetModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePreset}
                disabled={!newPresetName.trim() || isSaving}
                className="px-4 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg shadow-xs cursor-pointer disabled:opacity-50"
              >
                Create Preset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {isVersionHistoryOpen && activeTemplate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">Preset Version History</h3>
              <button onClick={() => setIsVersionHistoryOpen(false)} className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {(activeTemplate.versionHistory || []).map((ver) => (
                <div key={ver.versionId} className="p-3 rounded-xl border border-neutral-200 bg-neutral-50/60 text-xs">
                  <div className="flex items-center justify-between font-bold text-neutral-800">
                    <span>Version {ver.versionNumber}.0</span>
                    <span className="text-[10px] font-mono text-neutral-400">{ver.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-neutral-600 mt-1">{ver.notes || 'Preset configuration update'}</div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1">Author: {ver.author}</div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Version Change Note for Next Save</label>
              <input
                type="text"
                value={newVersionNotes}
                onChange={(e) => setNewVersionNotes(e.target.value)}
                placeholder="e.g. Updated warranty SLA and added Kubernetes layer"
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsVersionHistoryOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-lg shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
