'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Building, 
  Save, 
  Sparkles, 
  Plus,
  Loader2, 
  Check, 
  ExternalLink, 
  Settings, 
  ZoomIn,
  ZoomOut,
  Cpu,
  Layers,
  Calendar,
  DollarSign,
  ChevronDown,
  ShieldAlert,
  Archive,
  ArrowRight,
  Briefcase,
  Eye,
  Edit3,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
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
import { OfficialNutzDocument } from '@/components/OfficialNutzDocument';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { GsapLoadingScreen } from '@/components/GsapLoadingScreen';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [templateCount, setTemplateCount] = useState<number>(2);
  const [loading, setLoading] = useState(true);

  // Search & Filter for Dashboard
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected Project State (null = Main Dashboard Screen, string = Selected Project View)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // 2-Option Toggle on Selected Project Page: 'edit' or 'preview'
  const [projectMode, setProjectMode] = useState<'edit' | 'preview'>('edit');

  // 5 Sub-Tabs inside Form Editor
  const [activeEditorTab, setActiveEditorTab] = useState<'details' | 'scope' | 'architecture' | 'milestones' | 'notes'>('details');

  const [pdfZoom, setPdfZoom] = useState<number>(90);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isRegeneratingAI, setIsRegeneratingAI] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initial Load: Fetch Projects & Templates in parallel
  const loadData = async () => {
    try {
      const [authRes, projRes, tplRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/projects'),
        fetch('/api/admin/templates'),
      ]);

      const authData = await authRes.json();
      if (!authRes.ok || !authData.user || authData.user.role !== 'admin') {
        router.push('/login?redirect=/admin');
        return;
      }
      setCurrentUser(authData.user);
      try {
        sessionStorage.setItem('frdg_user', JSON.stringify(authData.user));
      } catch (e) {}

      // Fetch Projects
      const projData = await projRes.json();
      if (projData.success) {
        const list = projData.projects || [];
        setProjects(list);
      }

      // Fetch Templates count
      const tplData = await tplRes.json();
      if (tplData.success && tplData.store) {
        setTemplateCount(tplData.store.templates.length || 2);
      }
    } catch (err) {
      console.error('Error loading admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('frdg_user');
      if (cached) setCurrentUser(JSON.parse(cached));
    } catch (e) {}
    loadData();
  }, [router]);

  // Fetch Full Single Project Details for Editor & PDF Preview
  const fetchSingleProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (data.project) {
        setEditingProject(data.project);
      }
    } catch (err) {
      console.error('Failed to load project details:', err);
    }
  };

  // Open Project Workspace
  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setProjectMode('edit');
    setActiveEditorTab('details');
    fetchSingleProject(id);
  };

  // Save Project Edits
  const handleSaveProject = async () => {
    if (!editingProject) return;
    setIsSavingProject(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save changes');
      }

      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...p, ...data.project } : p))
      );
      setEditingProject(data.project);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error('Save error:', err);
      alert(err.message || 'Failed to save changes');
    } finally {
      setIsSavingProject(false);
    }
  };

  // AI Auto-Refine Description
  const handleAIRefine = async () => {
    if (!editingProject) return;
    setIsRegeneratingAI(true);
    try {
      const res = await fetch('/api/ai/refine-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: editingProject.projectName,
          industry: editingProject.industry,
          currentDescription: editingProject.productDescription,
        }),
      });
      const data = await res.json();
      if (data.refinedDescription) {
        setEditingProject({
          ...editingProject,
          productDescription: data.refinedDescription,
        });
      }
    } catch (err) {
      console.error('AI refinement error:', err);
    } finally {
      setIsRegeneratingAI(false);
    }
  };

  const [isGeneratingAIFlows, setIsGeneratingAIFlows] = useState(false);

  const handleGenerateAIFlows = async () => {
    if (!editingProject) return;
    setIsGeneratingAIFlows(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: editingProject.projectName,
          companyName: editingProject.companyName,
          productDescription: editingProject.productDescription,
          selectedCategories: editingProject.selectedCategoryIds || [],
          selectedTypes: editingProject.selectedTypeIds || [],
          selectedModules: editingProject.selectedModuleIds || [],
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.architectureFlows) {
        setEditingProject((prev: any) => ({
          ...prev,
          architectureFlows: data.data.architectureFlows,
          implementationPhases: (data.data.implementationPhases && data.data.implementationPhases.length > 0)
            ? data.data.implementationPhases
            : prev.implementationPhases,
        }));
      } else {
        throw new Error(data.error || 'Failed to generate AI architecture flows');
      }
    } catch (err: any) {
      console.error('AI Architecture generation error:', err);
      alert('Failed to generate AI flows: ' + err.message);
    } finally {
      setIsGeneratingAIFlows(false);
    }
  };

  // Delete Project Confirmation
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/projects/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete blueprint');

      const updated = projects.filter((p) => p.id !== deleteTarget.id);
      setProjects(updated);
      if (selectedProjectId === deleteTarget.id) {
        setSelectedProjectId(null);
        setEditingProject(null);
      }
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete blueprint');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered projects list
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      (p.projectName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.companyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.contactPerson || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && p.status === statusFilter;
  });

  const approvedCount = projects.filter(p => p.status === 'approved').length;
  const inReviewCount = projects.filter(p => p.status === 'in_review' || p.status === 'draft').length;

  if (loading) {
    return <GsapLoadingScreen message="Loading Executive Dashboard..." subtitle="Retrieving client specifications & active workspace..." />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pt-20 sm:pt-28 pb-24 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        
        {/* ========================================================================= */}
        {/* SCREEN 1: MAIN ADMIN DASHBOARD (Show Required Details & Created Projects) */}
        {/* ========================================================================= */}
        {!selectedProjectId && (
          <div className="space-y-8">
            
            {/* Header Title & New FRD Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-neutral-500 mb-1">
                  <span>Admin Hub</span>
                  <span>/</span>
                  <span className="font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                    Dashboard Overview
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
                  Admin Dashboard & Specification Studio
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                  Overview of required specification metrics and created client FRD projects.
                </p>
              </div>

              <Link
                href="/wizard?new=true"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6b47ff] to-[#5833e6] hover:from-[#5833e6] hover:to-[#4622cf] active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </Link>
            </div>

            {/* Required Details / Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">CREATED PROJECTS</span>
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">{projects.length}</div>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    Total Specifications
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-2">Active FRD client documents</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">APPROVED SPECS</span>
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">{approvedCount}</div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Dev-Ready
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-2">Signed & ready for build</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">IN REVIEW</span>
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">{inReviewCount}</div>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                    Pending Edits
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-2">Pending client feedback</div>
              </div>

              <Link 
                href="/admin/templates"
                className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">MASTER BLUEPRINTS</span>
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:rotate-45 transition-transform">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">{templateCount}</div>
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 flex items-center gap-1">
                    Manage <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-2">Company template presets</div>
              </Link>
            </div>

            {/* Search & Status Filter Toolbar */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search created projects by name, company, or contact..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-neutral-50/50 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-mono text-neutral-400 font-semibold uppercase shrink-0 mr-1">Status:</span>
                {['all', 'draft', 'in_review', 'approved', 'archived'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                      statusFilter === status
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100/80 text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Created Projects Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2 font-display">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <span>Created Projects ({filteredProjects.length})</span>
                </h2>
                <span className="text-xs text-neutral-400 font-mono">Click a project to view or edit</span>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200/80 space-y-3">
                  <FileText className="w-10 h-10 text-neutral-300 mx-auto" />
                  <div className="text-sm font-bold text-neutral-800">No Specifications Found</div>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    No created projects match your query. Click below to create a new one.
                  </p>
                  <Link
                    href="/wizard?new=true"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New FRD</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {filteredProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProject(p.id)}
                      className="bg-white rounded-2xl border border-neutral-200/90 hover:border-purple-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${
                            p.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : p.status === 'in_review'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                          }`}>
                            {p.status ? p.status.replace('_', ' ') : 'Draft'}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-neutral-900 group-hover:text-purple-600 transition-colors truncate">
                            {p.projectName}
                          </h3>
                          <p className="text-xs font-semibold text-neutral-500 truncate mt-0.5">
                            {p.companyName || 'Client Company'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
                        <span className="text-[11px] truncate max-w-[140px]">
                          {p.contactPerson || p.clientName || 'Client Rep'}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget({ id: p.id, name: p.projectName });
                            }}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center gap-1 text-purple-600 font-bold group-hover:translate-x-0.5 transition-transform">
                            <span>Open</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2: SELECTED PROJECT WORKSPACE (With 2-Option Toggle: Edit vs Preview) */}
        {/* ========================================================================= */}
        {selectedProjectId && editingProject && (
          <div className="space-y-6">

            {/* Back to Dashboard Navigation Bar */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="p-2.5 sm:px-3.5 sm:py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 transition-all text-xs font-semibold shadow-2xs flex items-center gap-2 shrink-0 group cursor-pointer"
                  title="Back to Dashboard Overview"
                >
                  <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to Dashboard</span>
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase flex-wrap">
                    <span>ID: #{editingProject.id.slice(0, 8)}</span>
                    <span>•</span>
                    <span className="text-purple-700 font-bold">
                      {editingProject.companyName || editingProject.clientName || 'Client Workspace'}
                    </span>
                  </div>
                  <h1 className="text-base sm:text-xl font-extrabold text-neutral-900 truncate">
                    {editingProject.projectName}
                  </h1>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleAIRefine}
                  disabled={isRegeneratingAI}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-purple-900 text-xs font-semibold shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                  title="Refine description using AI Engine"
                >
                  {isRegeneratingAI ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  )}
                  <span>AI Refine</span>
                </button>

                <button
                  onClick={handleSaveProject}
                  disabled={isSavingProject}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#6b47ff] to-[#5833e6] hover:from-[#5833e6] hover:to-[#4622cf] text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingProject ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  ) : saveSuccess ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>{saveSuccess ? 'Saved & Synced!' : 'Save & Sync'}</span>
                </button>
              </div>
            </div>

            {/* 2-OPTION TOGGLE SWITCH: EDIT vs PREVIEW */}
            <div className="flex items-center justify-center">
              <div className="inline-flex p-1.5 rounded-2xl bg-neutral-200/80 border border-neutral-300/80 shadow-inner gap-1 max-w-md w-full">
                <button
                  onClick={() => setProjectMode('edit')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    projectMode === 'edit'
                      ? 'bg-white text-neutral-900 shadow-md border border-neutral-200'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Edit3 className="w-4 h-4 text-purple-600" />
                  <span>Edit FRD</span>
                </button>

                <button
                  onClick={() => setProjectMode('preview')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    projectMode === 'preview'
                      ? 'bg-white text-neutral-900 shadow-md border border-neutral-200'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span>Preview FRD</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </button>
              </div>
            </div>

            {/* OPTION 1: EDIT MODE (Renders Form Editor with 5 Tabs) */}
            {projectMode === 'edit' && (
              <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden flex flex-col">
                
                {/* 5 Sub-Tabs Row */}
                <div className="flex items-center space-x-1 border-b border-neutral-200/90 px-4 pt-2 bg-neutral-50/40 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveEditorTab('details')}
                    className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                      activeEditorTab === 'details'
                        ? 'border-purple-600 text-purple-950 font-bold'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5 text-purple-600" />
                    <span>Client Details</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('scope')}
                    className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                      activeEditorTab === 'scope'
                        ? 'border-purple-600 text-purple-950 font-bold'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    <span>Scope & Tech</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('architecture')}
                    className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                      activeEditorTab === 'architecture'
                        ? 'border-purple-600 text-purple-950 font-bold'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 text-purple-600" />
                    <span>Architecture (AI Flow)</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('milestones')}
                    className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                      activeEditorTab === 'milestones'
                        ? 'border-purple-600 text-purple-950 font-bold'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>Milestones & Budget</span>
                  </button>

                  <button
                    onClick={() => setActiveEditorTab('notes')}
                    className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 ${
                      activeEditorTab === 'notes'
                        ? 'border-purple-600 text-purple-950 font-bold'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Notes & Export</span>
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-5 max-h-[760px] overflow-y-auto">
                  
                  {/* Tab 1: Client Details */}
                  {activeEditorTab === 'details' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Project Name *
                          </label>
                          <input
                            type="text"
                            value={editingProject.projectName}
                            onChange={(e) => setEditingProject({ ...editingProject, projectName: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Approval Status
                          </label>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button variant="outline" className="w-full justify-between h-10 text-xs font-semibold capitalize bg-white border-neutral-200 rounded-xl">
                                  <div className="flex items-center gap-2">
                                    {editingProject.status === 'approved' ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    ) : editingProject.status === 'in_review' ? (
                                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                                    ) : editingProject.status === 'archived' ? (
                                      <Archive className="w-3.5 h-3.5 text-neutral-400" />
                                    ) : (
                                      <FileText className="w-3.5 h-3.5 text-neutral-400" />
                                    )}
                                    <span>
                                      {editingProject.status === 'approved'
                                        ? 'Approved & Dev-Ready'
                                        : editingProject.status === 'in_review'
                                        ? 'In Review & Feedback'
                                        : editingProject.status === 'archived'
                                        ? 'Archived'
                                        : 'Draft Specification'}
                                    </span>
                                  </div>
                                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                                </Button>
                              }
                            />
                            <DropdownMenuContent className="min-w-64" align="start">
                              <DropdownMenuGroup>
                                <DropdownMenuLabel>Change Project Status</DropdownMenuLabel>
                                <DropdownMenuRadioGroup
                                  value={editingProject.status}
                                  onValueChange={(val) => setEditingProject({ ...editingProject, status: val })}
                                >
                                  <DropdownMenuRadioItem value="draft">
                                    <FileText className="w-4 h-4 text-neutral-400" />
                                    Draft Specification
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="in_review">
                                    <Clock className="w-4 h-4 text-amber-500" />
                                    In Review & Feedback
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="approved">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    Approved & Dev-Ready
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="archived">
                                    <Archive className="w-4 h-4 text-neutral-400" />
                                    Archived
                                  </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Client Company Name
                          </label>
                          <input
                            type="text"
                            value={editingProject.companyName}
                            onChange={(e) => setEditingProject({ ...editingProject, companyName: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Industry / Domain
                          </label>
                          <input
                            type="text"
                            value={editingProject.industry}
                            onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Contact Person
                          </label>
                          <input
                            type="text"
                            value={editingProject.contactPerson}
                            onChange={(e) => setEditingProject({ ...editingProject, contactPerson: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            value={editingProject.contactEmail}
                            onChange={(e) => setEditingProject({ ...editingProject, contactEmail: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Contact Phone
                          </label>
                          <div className="relative flex rounded-xl border border-neutral-200 overflow-hidden focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-500/10 bg-white">
                            <span className="inline-flex items-center px-3 bg-neutral-100 text-neutral-600 text-xs font-mono font-semibold border-r border-neutral-200 select-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              maxLength={10}
                              inputMode="numeric"
                              value={editingProject.contactPhone ? String(editingProject.contactPhone).replace(/\D/g, '').slice(-10) : ''}
                              onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '');
                                if (val.startsWith('91') && val.length > 10) val = val.slice(2);
                                setEditingProject({ ...editingProject, contactPhone: val.slice(0, 10) });
                              }}
                              placeholder="9876543210"
                              className="w-full px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none font-mono tracking-wider"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Operating Locations
                          </label>
                          <input
                            type="text"
                            value={editingProject.locations || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, locations: e.target.value })}
                            placeholder="e.g. Coimbatore, Chennai, Bangalore"
                            className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                          Executive Summary / Primary Objectives
                        </label>
                        <textarea
                          value={editingProject.productDescription || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, productDescription: e.target.value })}
                          rows={4}
                          className="w-full p-3.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white leading-relaxed resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Scope & Tech */}
                  {activeEditorTab === 'scope' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                          Core Functional Scope Items
                        </label>
                        <div className="p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
                          {editingProject.customRequirements && editingProject.customRequirements.length > 0 ? (
                            editingProject.customRequirements.map((req: any, index: number) => (
                              <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                                <span className="text-xs font-mono font-bold text-purple-600 shrink-0 mt-1">#{index + 1}</span>
                                <input
                                  type="text"
                                  value={req.description || req}
                                  onChange={(e) => {
                                    const updated = [...editingProject.customRequirements];
                                    if (typeof updated[index] === 'object') {
                                      updated[index] = { ...updated[index], description: e.target.value };
                                    } else {
                                      updated[index] = e.target.value;
                                    }
                                    setEditingProject({ ...editingProject, customRequirements: updated });
                                  }}
                                  className="w-full text-xs font-medium text-neutral-900 border-b border-transparent focus:border-purple-600 focus:outline-none bg-transparent"
                                />
                                <button
                                  onClick={() => {
                                    const updated = editingProject.customRequirements.filter((_: any, i: number) => i !== index);
                                    setEditingProject({ ...editingProject, customRequirements: updated });
                                  }}
                                  className="p-1 rounded text-neutral-400 hover:text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-neutral-400 text-center py-2">No custom scope items specified.</div>
                          )}

                          <button
                            onClick={() => {
                              const updated = [...(editingProject.customRequirements || []), { description: 'New custom scope feature item' }];
                              setEditingProject({ ...editingProject, customRequirements: updated });
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-purple-600" />
                            <span>Add Scope Feature Item</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-3">
                        <div className="text-[11px] font-mono font-bold text-neutral-700 uppercase">
                          Active Technology Stack Configuration
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          {Object.entries(editingProject.techStack || {}).map(([key, val]) => (
                            <div key={key} className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                              <span className="text-[10px] font-mono text-purple-600 block uppercase font-bold">{key}</span>
                              <span className="font-semibold text-neutral-900 text-xs mt-0.5 block">{val as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: System Architecture */}
                  {activeEditorTab === 'architecture' && (
                    <div className="space-y-5">
                      <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                            <Cpu className="w-5 h-5 shrink-0" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-purple-950">AI-Composed Architecture Flows</div>
                            <div className="text-[11px] text-purple-800">Customized automatically by AI engine for this blueprint.</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={handleGenerateAIFlows}
                            disabled={isGeneratingAIFlows}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                          >
                            {isGeneratingAIFlows ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Generating AI Flows...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Auto-Generate AI Flows</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-mono uppercase">
                              1. Overall System Topology Flow
                            </label>
                            <span className="text-[10px] font-mono text-neutral-400">ASCII Monospace</span>
                          </div>
                          <textarea
                            value={editingProject.architectureFlows?.overallSystemFlow || ''}
                            onChange={(e) => setEditingProject({
                              ...editingProject,
                              architectureFlows: {
                                ...(editingProject.architectureFlows || {}),
                                overallSystemFlow: e.target.value
                              }
                            })}
                            rows={6}
                            className="w-full p-3.5 text-xs font-mono bg-neutral-900 text-emerald-400 rounded-xl border border-neutral-800 focus:outline-none resize-y leading-relaxed"
                          />
                        </div>

                        <div className="p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-mono uppercase">
                              2. High-Level Multi-Tier Architecture
                            </label>
                            <span className="text-[10px] font-mono text-neutral-400">ASCII Monospace</span>
                          </div>
                          <textarea
                            value={editingProject.architectureFlows?.highLevelArchitectureFlow || ''}
                            onChange={(e) => setEditingProject({
                              ...editingProject,
                              architectureFlows: {
                                ...(editingProject.architectureFlows || {}),
                                highLevelArchitectureFlow: e.target.value
                              }
                            })}
                            rows={6}
                            className="w-full p-3.5 text-xs font-mono bg-neutral-900 text-emerald-400 rounded-xl border border-neutral-800 focus:outline-none resize-y leading-relaxed"
                          />
                        </div>

                        <div className="p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-neutral-800 font-mono uppercase">
                              3. Administration & Security Flow
                            </label>
                            <span className="text-[10px] font-mono text-neutral-400">ASCII Monospace</span>
                          </div>
                          <textarea
                            value={editingProject.architectureFlows?.adminFlow || ''}
                            onChange={(e) => setEditingProject({
                              ...editingProject,
                              architectureFlows: {
                                ...(editingProject.architectureFlows || {}),
                                adminFlow: e.target.value
                              }
                            })}
                            rows={6}
                            className="w-full p-3.5 text-xs font-mono bg-neutral-900 text-emerald-400 rounded-xl border border-neutral-800 focus:outline-none resize-y leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Milestones & Budget */}
                  {activeEditorTab === 'milestones' && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Target Kickoff Date
                          </label>
                          <input
                            type="text"
                            value={editingProject.startDate || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none font-mono bg-white"
                            placeholder="e.g. 15 Oct 2026"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                            Target Handover Date
                          </label>
                          <input
                            type="text"
                            value={editingProject.endDate || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, endDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 text-xs border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none font-mono bg-white"
                            placeholder="e.g. 30 Jan 2027"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
                        <div className="text-[11px] font-mono font-bold text-neutral-700 uppercase">
                          Commercial Payment Tranches (Nutz 40% - 30% - 30% Standard)
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                            <span className="text-[10px] font-mono text-purple-600 block font-bold">TRANCHE 1</span>
                            <span className="text-base font-extrabold text-neutral-900 mt-0.5 block">40%</span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5">Kickoff Advance</span>
                          </div>
                          <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                            <span className="text-[10px] font-mono text-purple-600 block font-bold">TRANCHE 2</span>
                            <span className="text-base font-extrabold text-neutral-900 mt-0.5 block">30%</span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5">Midway Prototype</span>
                          </div>
                          <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                            <span className="text-[10px] font-mono text-purple-600 block font-bold">TRANCHE 3</span>
                            <span className="text-base font-extrabold text-neutral-900 mt-0.5 block">30%</span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5">UAT Handover</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 5: Notes & Export */}
                  {activeEditorTab === 'notes' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-[11px] font-mono font-semibold text-neutral-600 uppercase mb-1.5">
                          Export PDF File Name
                        </label>
                        <input
                          type="text"
                          value={editingProject.pdfFileName || `${editingProject.projectName.replace(/\s+/g, '_')}_FRD.pdf`}
                          onChange={(e) => setEditingProject({ ...editingProject, pdfFileName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs font-mono border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-white"
                        />
                        <span className="text-[10px] text-neutral-400 mt-1 block">The download filename received by client upon export.</span>
                      </div>

                      <div className="pt-3 flex items-center justify-between border-t border-neutral-200">
                        <button
                          onClick={() => setDeleteTarget({ id: editingProject.id, name: editingProject.projectName })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Specification</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/projects/${editingProject.id}/pdf`}
                            target="_blank"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Full PDF View</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Step Navigation Bar */}
                <div className="p-3 px-6 bg-neutral-100/90 border-t border-neutral-200/90 flex items-center justify-between gap-3">
                  <button
                    disabled={activeEditorTab === 'details'}
                    onClick={() => {
                      const tabs: ('details' | 'scope' | 'architecture' | 'milestones' | 'notes')[] = ['details', 'scope', 'architecture', 'milestones', 'notes'];
                      const idx = tabs.indexOf(activeEditorTab);
                      if (idx > 0) setActiveEditorTab(tabs[idx - 1]);
                    }}
                    className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                      Step {['details', 'scope', 'architecture', 'milestones', 'notes'].indexOf(activeEditorTab) + 1} of 5
                    </span>

                    <button
                      onClick={() => {
                        const tabs: ('details' | 'scope' | 'architecture' | 'milestones' | 'notes')[] = ['details', 'scope', 'architecture', 'milestones', 'notes'];
                        const idx = tabs.indexOf(activeEditorTab);
                        if (idx < tabs.length - 1) {
                          setActiveEditorTab(tabs[idx + 1]);
                        } else {
                          setProjectMode('preview');
                        }
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-[0.98] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>
                        {activeEditorTab === 'details' ? 'Next: Scope & Tech' :
                         activeEditorTab === 'scope' ? 'Next: Architecture' :
                         activeEditorTab === 'architecture' ? 'Next: Milestones' :
                         activeEditorTab === 'milestones' ? 'Next: Notes & Export' : 'Switch to Preview FRD'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Bottom Quick Status Footer */}
                <div className="p-4 px-6 bg-neutral-50/90 border-t border-neutral-200/90 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono text-[11px]">
                    Last Sync: {editingProject.lastUpdatedDate || 'Real-time'}
                  </span>
                  <span className="font-semibold text-neutral-800 text-[11px] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Synced to Client
                  </span>
                </div>

              </div>
            )}

            {/* OPTION 2: PREVIEW MODE (Renders Full Live Contract PDF) */}
            {projectMode === 'preview' && (
              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
                <div className="p-4 px-5 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold truncate max-w-[250px]">
                      {editingProject.pdfFileName || `${editingProject.projectName.replace(/\s+/g, '_')}_FRD.pdf`}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0 hidden sm:inline">
                      Live Preview
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-800/90 rounded-xl p-1 border border-slate-700">
                      <button
                        onClick={() => setPdfZoom(prev => Math.max(prev - 10, 60))}
                        className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono px-1.5 font-bold text-slate-200">{pdfZoom}%</span>
                      <button
                        onClick={() => setPdfZoom(prev => Math.min(prev + 10, 130))}
                        className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Link
                      href={`/projects/${editingProject.id}/pdf`}
                      target="_blank"
                      className="p-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      title="Open Fullscreen Document"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/projects/${editingProject.id}/pdf`}
                      target="_blank"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </Link>
                  </div>
                </div>

                <div className="p-4 sm:p-8 overflow-x-auto overflow-y-auto max-h-[850px] flex justify-center bg-slate-900/60">
                  <div
                    style={{
                      transform: `scale(${pdfZoom / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.15s ease-out',
                    }}
                    className="bg-white rounded-xl shadow-2xl shadow-black/50 overflow-hidden pointer-events-auto shrink-0 w-full max-w-[850px]"
                  >
                    <OfficialNutzDocument project={editingProject} isPrintView={false} />
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Blueprint"
        projectName={deleteTarget?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
}
