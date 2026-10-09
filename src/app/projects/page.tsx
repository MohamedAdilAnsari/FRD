'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  FileText,
  Calendar,
  Building2,
  Loader2,
  Trash2,
  Eye,
  Download,
  LayoutGrid,
  List,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  KeyRound,
  EyeOff,
  X,
  AlertCircle,
  UserCheck,
  Search,
  ArrowUpRight,
  ArrowRight,
  MoreVertical,
  User,
  Check,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { GsapLoadingScreen } from '@/components/GsapLoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ready' | 'review' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Remember the view mode style chosen by user (horizontal grid vs vertical table)
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('nutz_projects_view_mode');
      if (savedMode === 'grid' || savedMode === 'table') {
        setViewMode(savedMode);
      }
    } catch {}
  }, []);

  const handleSetViewMode = (mode: 'grid' | 'table') => {
    setViewMode(mode);
    try {
      localStorage.setItem('nutz_projects_view_mode', mode);
    } catch {}
  };

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Security & Account Settings Modal State
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    if (!clientName.trim()) {
      setSettingsError('Please enter a valid client name.');
      return;
    }

    if (isChangingPass && newPassword) {
      if (!currentPassword) {
        setSettingsError('Current password is required to change password.');
        return;
      }
      if (newPassword.length < 8) {
        setSettingsError('New password must be at least 8 characters long.');
        return;
      }
    }

    setSettingsLoading(true);
    try {
      const payload: any = { name: clientName.trim() };
      if (isChangingPass && newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update account settings');
      }

      if (data.user) {
        setUser((prev: any) => ({ ...prev, ...data.user }));
        window.dispatchEvent(new Event('auth-change'));
      }

      setSettingsSuccess(data.message || 'Settings updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setIsChangingPass(false);
      setTimeout(() => {
        setIsSecurityModalOpen(false);
        setSettingsSuccess('');
      }, 1200);
    } catch (err: any) {
      setSettingsError(err.message || 'Error updating settings');
    } finally {
      setSettingsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      // Single optimized roundtrip: /api/projects returns both client projects and verified user
      const res = await fetch('/api/projects', { cache: 'no-store' });
      if (res.status === 401) {
        router.push('/login?redirect=/projects');
        return;
      }
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        try {
          sessionStorage.setItem('frdg_user', JSON.stringify(data.user));
        } catch (e) {}
      }
      if (data.projects) setProjects(data.projects);
    } catch (err) {
      router.push('/login?redirect=/projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('frdg_user');
      if (cached) {
        setUser(JSON.parse(cached));
      }
    } catch (e) {}
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete specification');
      }
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
      await fetchData();
    } catch (err) {
      console.error('Failed to delete blueprint:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Determine if a project is still in progress (draft or missing product info)
  const isProjectInProgress = (p: any) => {
    const status = (p.status || '').toLowerCase();
    const desc = (p.productDescription || '').trim();
    return (
      status.includes('draft') ||
      status.includes('progress') ||
      !desc ||
      desc === 'Draft specification in progress' ||
      desc === 'Comprehensive functional requirements blueprint.'
    );
  };

  // Filtered projects based on search query and status filter
  const filteredProjects = projects.filter((p) => {
    const name = (p.projectName || p.name || '').toLowerCase();
    const company = (p.companyName || '').toLowerCase();
    const desc = (p.productDescription || p.description || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = !query || name.includes(query) || company.includes(query) || desc.includes(query);

    if (!matchesSearch) return false;

    if (selectedFilter === 'ready') {
      return !isProjectInProgress(p);
    }
    if (selectedFilter === 'draft') {
      return isProjectInProgress(p);
    }
    return true;
  });

  const FILTERS = [
    { id: 'all' as const, label: 'All', icon: Layers, color: 'text-stone-900' },
    { id: 'draft' as const, label: 'In Progress', icon: Clock, color: 'text-amber-600' },
    { id: 'ready' as const, label: 'Completed', icon: CheckCircle2, color: 'text-emerald-600' },
  ];

  const approvedProjects = projects.filter(p => (p.status || '').toLowerCase() === 'approved');

  return (
    <div className="min-h-screen bg-white text-[#1c1917] font-sans pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">

        {/* ── Client Details & Workspace Header (Minimalist) ── */}
        <div className="bg-white py-4 px-5 sm:px-6 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <h1 suppressHydrationWarning className="text-base sm:text-lg font-bold font-display tracking-tight text-stone-900 truncate">
              Welcome, {user?.name || user?.email?.split('@')[0] || 'User'}
            </h1>
          </div>

          {/* Top Primary Actions (Crisp White Buttons with Stone Borders) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              onClick={() => {
                setClientName(user?.name || '');
                setCurrentPassword('');
                setNewPassword('');
                setIsChangingPass(false);
                setSettingsError('');
                setSettingsSuccess('');
                setIsSecurityModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-full bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-stone-200 hover:border-stone-300 shadow-2xs transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-violet-600" />
              <span>Account & Security</span>
            </button>

            <Link
              href="/wizard?new=true"
              className="px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-stone-900 font-semibold text-xs flex items-center justify-center gap-2 border border-stone-300 hover:border-stone-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Create Specification</span>
              <Plus className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-90 group-hover:text-stone-800 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Admin Approval Notification Banner (Client Only) ── */}
        {user?.role !== 'admin' && approvedProjects.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/70 to-teal-50 border border-emerald-200/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 font-display flex items-center gap-2">
                  <span>🎉 Admin Approval Notice</span>
                </h4>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">
                  {approvedProjects.length === 1
                    ? `Your project specification "${approvedProjects[0].projectName || 'Blueprint'}" has been officially Approved by the Admin team!`
                    : `${approvedProjects.length} of your project specifications have been officially Approved by the Admin team!`
                  }
                </p>
              </div>
            </div>
            <Link
              href={`/projects/${approvedProjects[0].id}`}
              className="px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
            >
              <span>View Approved Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* ── Interactive Search, Filters & View Toggle Strip (Pure White Background) ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specifications by title or domain..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-stone-200 rounded-full text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 shadow-2xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills & View Switcher (Pure White with Framer Motion layoutId Gliders) */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto overflow-x-auto max-w-full pb-1 sm:pb-0 no-scrollbar">
            {/* Filter Pills with Motion Glider */}
            <div className="inline-flex items-center p-1 bg-white border border-stone-200/90 rounded-full shadow-2xs relative">
              {FILTERS.map((filter) => {
                const isActive = selectedFilter === filter.id;
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs transition-colors duration-200 cursor-pointer flex items-center gap-1.5 z-10 select-none ${
                      isActive ? 'text-stone-950 font-bold' : 'text-stone-500 hover:text-stone-800 font-medium'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 bg-stone-100/90 rounded-full border border-stone-300/80 shadow-xs -z-10"
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'scale-110 ' + filter.color : 'text-stone-400'}`} />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Grid vs Table View Mode Switcher with Motion Glider */}
            <div className="inline-flex items-center p-1 bg-white border border-stone-200/90 rounded-full shadow-2xs relative">
              <button
                onClick={() => handleSetViewMode('grid')}
                className={`relative p-1.5 rounded-full transition-colors duration-200 cursor-pointer z-10 ${
                  viewMode === 'grid' ? 'text-stone-950' : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Horizontal Grid View"
              >
                {viewMode === 'grid' && (
                  <motion.div
                    layoutId="activeViewPill"
                    className="absolute inset-0 bg-stone-100/90 rounded-full border border-stone-300/80 shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                )}
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleSetViewMode('table')}
                className={`relative p-1.5 rounded-full transition-colors duration-200 cursor-pointer z-10 ${
                  viewMode === 'table' ? 'text-stone-950' : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Vertical List / Table View"
              >
                {viewMode === 'table' && (
                  <motion.div
                    layoutId="activeViewPill"
                    className="absolute inset-0 bg-stone-100/90 rounded-full border border-stone-300/80 shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                )}
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Specification Views (Animated Option Switching) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedFilter}-${viewMode}`}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {loading && projects.length === 0 ? (
              /* High-speed skeleton cards on initial load */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-4 animate-pulse"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-stone-200 rounded w-24" />
                      <div className="h-4 bg-stone-100 rounded-full w-20" />
                    </div>
                    <div className="h-5 bg-stone-200 rounded w-3/4" />
                    <div className="h-3 bg-stone-100 rounded w-full" />
                    <div className="h-3 bg-stone-100 rounded w-2/3" />
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div className="h-4 bg-stone-100 rounded w-20" />
                      <div className="h-8 bg-stone-100 rounded-full w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              /* Empty State Card */
              <div className="bg-white rounded-2xl border border-stone-200/90 p-8 sm:p-12 text-center space-y-3.5 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-violet-600" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold font-display text-stone-900">
                    {searchQuery ? 'No Matching Specifications Found' : 'No Specifications Generated Yet'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                    {searchQuery
                      ? `No requirements blueprints matched "${searchQuery}". Clear your search query to view all documents.`
                      : 'Start by describing your product in our guided Scoping Wizard to generate a complete 10-section engineering specification.'}
                  </p>
                </div>

                <div className="pt-2">
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 rounded-full bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold border border-stone-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      Clear Search Filter
                    </button>
                  ) : (
                    <Link
                      href="/wizard?new=true"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold border border-stone-300 hover:border-stone-400 shadow-2xs transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                      <span>Launch Scoping Wizard</span>
                    </Link>
                  )}
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              /* ── GRID VIEW ── */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredProjects.map((p) => {
                  const isInProgress = isProjectInProgress(p);

                  return (
                    <motion.div
                      key={p.id}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-2xl border border-stone-200/90 hover:border-stone-300 shadow-2xs hover:shadow-sm transition-all p-5 flex flex-col justify-between min-h-[220px] group"
                    >
                      <div className="space-y-3">
                        {/* Status & Date (No Step Count) */}
                        <div className="flex items-center justify-between text-xs">
                          {(() => {
                            const status = (p.status || '').toLowerCase();
                            if (status === 'approved') {
                              return (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-[11px] shadow-2xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>APPROVED</span>
                                </span>
                              );
                            }
                            if (status === 'in_review' || status === 'reviewed') {
                              return (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-extrabold text-[11px] shadow-2xs">
                                  <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0 animate-pulse" />
                                  <span>IN REVIEW</span>
                                </span>
                              );
                            }
                            if (status === 'submitted') {
                              return (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 font-extrabold text-[11px] shadow-2xs">
                                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                  <span>SUBMITTED</span>
                                </span>
                              );
                            }
                            if (status === 'archived') {
                              return (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 font-extrabold text-[11px] shadow-2xs">
                                  <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                  <span>ARCHIVED</span>
                                </span>
                              );
                            }
                            return (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[11px] shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                                <span>DRAFT</span>
                              </span>
                            );
                          })()}

                          <span className="text-[11px] text-stone-400 font-medium">
                            {p.creationDate || (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '')}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold font-display text-stone-900 leading-snug">
                          {p.projectName || p.name || 'Untitled Specification'}
                        </h3>

                        {/* Company / Industry Subtitle */}
                        {(p.companyName || p.industry) && (
                          <p className="text-xs text-stone-500 font-medium truncate">
                            {p.companyName}{p.companyName && p.industry ? ' • ' : ''}{p.industry}
                          </p>
                        )}

                        {/* Content Area (Clean, no gradient, no yellow box) */}
                        {isInProgress ? (
                          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-semibold text-stone-700">Specification in progress</span>
                              <span className="text-[11px] font-medium text-amber-600">Draft</span>
                            </div>
                            <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                              {p.productDescription && p.productDescription !== 'Draft specification in progress' && !p.productDescription.startsWith('Comprehensive functional')
                                ? p.productDescription
                                : 'Complete the scoping interview to generate your architecture and official blueprint.'}
                            </p>
                          </div>
                        ) : (
                          p.productDescription &&
                          p.productDescription !== 'Draft specification in progress' &&
                          !p.productDescription.startsWith('Comprehensive functional') && (
                            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                              {p.productDescription}
                            </p>
                          )
                        )}
                      </div>

                      {/* Bottom Action Strip: Continue on left, Lucide View + Delete on right */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
                        <div>
                          {isInProgress ? (
                            <Link
                              href={`/wizard?id=${p.id}`}
                              className="px-4 py-1.5 rounded-full bg-[#6b47ff] hover:bg-[#5833e6] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs hover:shadow-sm transition-all cursor-pointer"
                            >
                              <span>Continue</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <Link
                              href={`/projects/${p.id}`}
                              className="px-4 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                              title="Preview & Download Specification"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </Link>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <Link
                            href={`/projects/${p.id}`}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors flex items-center justify-center cursor-pointer"
                            title="View Specification"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setDeleteTarget({ id: p.id, name: p.projectName || p.name || 'this specification' })}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center cursor-pointer"
                            title="Delete Specification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* ── TABLE / LIST VIEW ── */
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse table-fixed">
                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-50/70 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                        <th className="py-3 px-6 text-left align-middle w-[26%]">Specification Blueprint</th>
                        <th className="py-3 px-4 text-center align-middle w-[18%]">Domain & Industry</th>
                        <th className="py-3 px-4 text-center align-middle w-[15%]">Status</th>
                        <th className="py-3 px-4 text-center align-middle w-[16%]">Date Created</th>
                        <th className="py-3 px-4 text-center align-middle w-[14%]">Continue</th>
                        <th className="py-3 px-4 text-center align-middle w-[11%]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-xs">
                      {filteredProjects.map((p) => {
                        const isInProgress = isProjectInProgress(p);

                        return (
                          <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                            <td className="py-3.5 px-6 align-middle text-left">
                              <div className="space-y-0.5">
                                <Link
                                  href={isInProgress ? `/wizard?id=${p.id}` : `/projects/${p.id}`}
                                  className="font-bold text-stone-900 hover:text-violet-600 transition-colors"
                                >
                                  {p.projectName || p.name || 'Untitled Specification'}
                                </Link>
                                {p.productDescription &&
                                  p.productDescription !== 'Draft specification in progress' &&
                                  !p.productDescription.startsWith('Comprehensive functional') &&
                                  p.productDescription !== '10-section legal blueprint' && (
                                    <p className="text-[11px] text-stone-500 line-clamp-1">
                                      {p.productDescription}
                                    </p>
                                  )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center align-middle text-stone-600 font-medium">
                              <div className="text-center">{p.companyName || p.industry || '—'}</div>
                            </td>
                            <td className="py-3.5 px-4 text-center align-middle">
                              <div className="flex items-center justify-center">
                                {(() => {
                                  const status = (p.status || '').toLowerCase();
                                  if (status === 'approved') {
                                    return (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-300/90 font-bold text-xs shadow-2xs">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        <span>Approved by Admin</span>
                                      </span>
                                    );
                                  }
                                  if (status === 'in_review' || status === 'reviewed') {
                                    return (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-800 border border-amber-300/90 font-semibold text-xs">
                                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 animate-pulse" />
                                        <span>Under Admin Review</span>
                                      </span>
                                    );
                                  }
                                  if (status === 'submitted') {
                                    return (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100/90 text-purple-800 border border-purple-300/90 font-semibold text-xs">
                                        <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                                        <span>Submitted to Admin</span>
                                      </span>
                                    );
                                  }
                                  if (isInProgress) {
                                    return (
                                      <span className="inline-flex items-center gap-1.5 text-amber-600 font-semibold text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                        <span>In Progress</span>
                                      </span>
                                    );
                                  }
                                  return (
                                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                      <span>Completed</span>
                                    </span>
                                  );
                                })()}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center align-middle text-stone-500 text-xs font-medium whitespace-nowrap">
                              <div className="text-center">
                                {p.creationDate || (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—')}
                              </div>
                            </td>
                            {/* Separate Continue Section between Date Created and Actions */}
                            <td className="py-3.5 px-4 text-center align-middle">
                              <div className="flex items-center justify-center">
                                {isInProgress ? (
                                  <Link
                                    href={`/wizard?id=${p.id}`}
                                    className="px-3.5 py-1 rounded-full bg-[#6b47ff] hover:bg-[#5833e6] text-white font-semibold text-xs inline-flex items-center gap-1 transition-colors shadow-2xs"
                                  >
                                    <span>Continue</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>
                                ) : (
                                  <span className="text-stone-300 font-medium">—</span>
                                )}
                              </div>
                            </td>
                            {/* Actions Column: Centered Three-Dot Dropdown Menu */}
                            <td className="py-3.5 px-4 text-center align-middle">
                              <div className="flex items-center justify-center">
                                <DropdownMenu>
                                  <DropdownMenuTrigger
                                    className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                                    title="Project Options"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuPortal>
                                    <DropdownMenuContent
                                      side="bottom"
                                      align="center"
                                      className="min-w-36 bg-white border border-stone-200/90 rounded-xl shadow-xl shadow-stone-900/10 p-1 z-50"
                                    >
                                      <DropdownMenuItem
                                        onClick={() => router.push(`/projects/${p.id}`)}
                                        className="gap-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 cursor-pointer"
                                      >
                                        <Eye className="w-3.5 h-3.5 text-stone-600" />
                                        <span>View</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => setDeleteTarget({ id: p.id, name: p.projectName || p.name || 'this specification' })}
                                        className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                        <span>Delete</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenuPortal>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Minimalist Account & Security Modal ── */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-stone-200 shadow-xl overflow-hidden p-5 space-y-4 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 leading-tight">
                    Account Settings
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSecurityModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error & Success Feedback */}
            {settingsError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                <span>{settingsError}</span>
              </div>
            )}
            {settingsSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs flex items-center gap-2">
                <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>{settingsSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-3">
              {/* Display Name Option */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Client Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 shadow-2xs transition-colors"
                  />
                </div>
              </div>

              {/* Minimalist Password Section (Optional) */}
              <div className="pt-1 border-t border-stone-100 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPass(!isChangingPass)}
                  className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1.5 cursor-pointer select-none"
                >
                  <KeyRound className="w-3.5 h-3.5 text-stone-400" />
                  <span>{isChangingPass ? 'Hide password settings' : 'Change password (optional)'}</span>
                </button>

                {isChangingPass && (
                  <div className="space-y-2.5 pt-1">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-medium text-stone-600">Current Password</label>
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="text-[10px] text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
                        >
                          {showCurrentPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          <span>{showCurrentPass ? 'Hide' : 'Show'}</span>
                        </button>
                      </div>
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password"
                        className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 shadow-2xs"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-medium text-stone-600">New Password</label>
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="text-[10px] text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
                        >
                          {showNewPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          <span>{showNewPass ? 'Hide' : 'Show'}</span>
                        </button>
                      </div>
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 shadow-2xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsSecurityModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={settingsLoading}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-stone-50 text-stone-900 text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 border border-stone-300 hover:border-stone-400 shadow-2xs cursor-pointer"
                >
                  {settingsLoading ? (
                    <div className="loader loader-xs loader-black shrink-0" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  <span>{settingsLoading ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          projectName={deleteTarget.name}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
