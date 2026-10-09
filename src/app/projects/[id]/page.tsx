'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Download, 
  Printer, 
  ArrowLeft, 
  Edit3, 
  Loader2,
  Save,
  Trash2,
  X,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { OfficialNutzDocument } from '@/components/OfficialNutzDocument';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { GsapLoadingScreen } from '@/components/GsapLoadingScreen';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingFileName, setEditingFileName] = useState(false);
  const [newPdfName, setNewPdfName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);

  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [activeTab, setActiveTab] = useState('executive');
  const [formData, setFormData] = useState<any>({});
  const [isSavingDoc, setIsSavingDoc] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load document');
        return res.json();
      })
      .then(data => {
        if (data.project) {
          setProject(data.project);
          setFormData(data.project);
          setNewPdfName(data.project.pdfFileName || '');
        } else if (data.error) {
          setErrorMsg(data.error);
        }
      })
      .catch(err => setErrorMsg(err.message || 'Error loading project'))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleUpdatePdfName = async () => {
    if (isSavingName) return;
    setIsSavingName(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfFileName: newPdfName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update PDF name');
      setProject((prev: any) => ({ ...prev, pdfFileName: newPdfName }));
      setEditingFileName(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update PDF name');
    } finally {
      setIsSavingName(false);
    }
  };

  const handleSaveDocumentEdits = async () => {
    if (isSavingDoc) return;
    setIsSavingDoc(true);
    if (formData.contactPhone) {
      const cleanPhone = String(formData.contactPhone).replace(/\D/g, '');
      if (cleanPhone.length > 0 && cleanPhone.length !== 10) {
        setErrorMsg('Contact Phone must be exactly 10 digits.');
        setIsSavingDoc(false);
        return;
      }
    }
    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update document');
      
      setProject({ ...formData });
      setIsEditingDoc(false);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save changes');
    } finally {
      setIsSavingDoc(false);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeletingDoc, setIsDeletingDoc] = useState(false);

  const handleDeleteDocument = async () => {
    setIsDeletingDoc(true);
    try {
      const res = await fetch(`/api/projects/${params.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to permanently delete specification');
      }
      router.push('/projects');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete specification');
      setIsDeletingDoc(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <GsapLoadingScreen message="Loading FRD Document Blueprint..." subtitle="Rendering 10-section modular breakdown..." />;
  }

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 bg-neutral-50 px-4 text-center">
        <p className="text-xs text-red-600 font-semibold mb-2">{errorMsg || 'Specification not found or access denied.'}</p>
        <p className="text-[11px] text-neutral-500 mb-4">You may not have permission to view or edit this document.</p>
        <Link href="/projects" className="px-4 py-2 text-xs font-semibold bg-neutral-800 text-white rounded-lg hover:bg-neutral-700">
          Back to Projects Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 pt-20 sm:pt-28 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Top bar — Back to Dashboard placed on the left */}
        <div className="flex items-center justify-start px-1 mb-1">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            title="Return to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Admin Approval Notice Banner */}
        {project.status === 'approved' && (
          <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/70 to-teal-50 border border-emerald-300/90 rounded-2xl p-4 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950 font-display flex items-center gap-2">
                <span>🎉 Approved by Admin</span>
              </h4>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                This Functional Requirements Document (FRD) has been officially reviewed and approved by the Nutz Technovation admin team. It is verified and ready for engineering execution.
              </p>
            </div>
          </div>
        )}

        {/* Top Navigation & Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center space-x-3">
            <Link
              href="/projects"
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold text-neutral-900 truncate">{project.projectName}</h1>
                {(() => {
                  const st = (project.status || '').toLowerCase();
                  if (st === 'approved') {
                    return (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-300 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Approved by Admin</span>
                      </span>
                    );
                  }
                  if (st === 'in_review' || st === 'reviewed') {
                    return (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100/90 text-amber-800 border border-amber-300 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                        <span>Under Admin Review</span>
                      </span>
                    );
                  }
                  if (st === 'submitted') {
                    return (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100/90 text-purple-800 border border-purple-300 shrink-0">
                        <span>Submitted to Admin</span>
                      </span>
                    );
                  }
                  return (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-100 text-neutral-800 border border-neutral-200 shrink-0">
                      {project.status || 'Draft'}
                    </span>
                  );
                })()}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5 truncate">
                Company: <span className="font-semibold text-neutral-800">{project.companyName}</span> • Created: {project.creationDate}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsEditingDoc(!isEditingDoc)}
              className={`inline-flex items-center px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                isEditingDoc
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200 shadow-2xs'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
              <span>{isEditingDoc ? 'Close Editor' : 'Edit Specification'}</span>
            </button>

            <Link
              href={`/projects/${project.id}/pdf`}
              target="_blank"
              className="inline-flex items-center px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Download PDF</span>
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center px-3.5 py-2 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 text-xs font-semibold rounded-xl border border-rose-200/80 shadow-2xs transition-all cursor-pointer"
              title="Delete Specification Permanently"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
            <span>Specification updated and persisted to database successfully!</span>
          </div>
        )}

        {/* Comprehensive Multi-Section Interactive Document Editor */}
        {isEditingDoc && (
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-lg space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-neutral-900">Comprehensive Specification Editor</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-100 text-neutral-800 border border-neutral-200">
                    All 10 Sections
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Directly edit all executive details, tech stack, architecture flows, implementation phases, payment terms, and out-of-scope exclusions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/wizard?id=${project.id}`}
                  className="inline-flex items-center px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg transition-colors border border-neutral-200"
                  title="Open in step-by-step visual questionnaire wizard"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5 text-neutral-600" />
                  <span>Open 10-Step Wizard</span>
                </Link>

                <button
                  onClick={() => setIsEditingDoc(false)}
                  className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 rounded-lg inline-flex items-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  <span>Cancel</span>
                </button>

                <button
                  onClick={handleSaveDocumentEdits}
                  disabled={isSavingDoc}
                  className="inline-flex items-center px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingDoc ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
                  <span>Save to Database</span>
                </button>
              </div>
            </div>

            {/* Tabbed Section Navigation */}
            <div className="flex flex-wrap gap-1.5 border-b border-neutral-200 pb-2">
              {[
                { id: 'executive', label: '1. Executive & Profile' },
                { id: 'scope', label: '2. Product Scope' },
                { id: 'tech', label: '3. Technologies' },
                { id: 'flows', label: '4. Architecture Flows' },
                { id: 'phases', label: '5. Implementation Phases' },
                { id: 'commercials', label: '6. Commercials' },
                { id: 'exclusions', label: '7. Out of Scope' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: EXECUTIVE & COMPANY DETAILS */}
            {activeTab === 'executive' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={formData.projectName || ''}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Company / Organization Name</label>
                    <input
                      type="text"
                      value={formData.companyName || ''}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      value={formData.contactPerson || ''}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={formData.contactEmail || ''}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Contact Phone
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-semibold text-neutral-500 select-none pointer-events-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.contactPhone ? String(formData.contactPhone).replace(/\D/g, '').slice(-10) : ''}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.startsWith('91') && val.length > 10) val = val.slice(2);
                          setFormData({ ...formData, contactPhone: val.slice(0, 10) });
                        }}
                        placeholder="9876543210"
                        className="w-full pl-11 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Industry</label>
                    <input
                      type="text"
                      value={formData.industry || ''}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                      placeholder="e.g. Enterprise IT & SaaS"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Operating Locations</label>
                    <input
                      type="text"
                      value={formData.locations || ''}
                      onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                      placeholder="e.g. India & Global"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Delivery Timeline</label>
                    <input
                      type="text"
                      value={formData.endDate || ''}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                      placeholder="e.g. 60 Working Days"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Target Audience</label>
                    <input
                      type="text"
                      value={formData.targetAudience || ''}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Estimated Commercial Budget</label>
                    <input
                      type="text"
                      value={formData.estimatedBudget || ''}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                      placeholder="e.g. Standard Commercial Retainer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCT SCOPE & DESCRIPTION */}
            {activeTab === 'scope' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Executive Scope & Product Objectives
                  </label>
                  <textarea
                    rows={6}
                    value={formData.productDescription || ''}
                    onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white leading-relaxed font-sans"
                    placeholder="Describe the high-level functional scope, target goals, and business requirements..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                    Administrative Notes & Internal Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.adminNotes || ''}
                    onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white leading-relaxed font-sans"
                    placeholder="Internal client notes or commercial considerations..."
                  />
                </div>
              </div>
            )}

            {/* TAB 3: TECHNOLOGY STACK */}
            {activeTab === 'tech' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">
                  Configure the designated tools, frameworks, and cloud infrastructure specified in Section 3 of the agreement.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(formData.techStack || {}).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input
                        type="text"
                        value={(value as string) || ''}
                        onChange={(e) => {
                          const updated = { ...(formData.techStack || {}) };
                          updated[key] = e.target.value;
                          setFormData({ ...formData, techStack: updated });
                        }}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: ARCHITECTURE & SYSTEM FLOWS */}
            {activeTab === 'flows' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">
                  Update the ASCII system flows, sequence pathways, and administrative trees rendered in Section 6.
                </p>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Overall System Flow</label>
                  <textarea
                    rows={6}
                    value={formData.architectureFlows?.overallSystemFlow || ''}
                    onChange={(e) => {
                      const updated = { ...(formData.architectureFlows || {}) };
                      updated.overallSystemFlow = e.target.value;
                      setFormData({ ...formData, architectureFlows: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">High-Level Architecture Flow</label>
                  <textarea
                    rows={6}
                    value={formData.architectureFlows?.highLevelArchitectureFlow || ''}
                    onChange={(e) => {
                      const updated = { ...(formData.architectureFlows || {}) };
                      updated.highLevelArchitectureFlow = e.target.value;
                      setFormData({ ...formData, architectureFlows: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Admin Flow</label>
                  <textarea
                    rows={6}
                    value={formData.architectureFlows?.adminFlow || ''}
                    onChange={(e) => {
                      const updated = { ...(formData.architectureFlows || {}) };
                      updated.adminFlow = e.target.value;
                      setFormData({ ...formData, architectureFlows: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Phase-wise Flow</label>
                  <textarea
                    rows={6}
                    value={formData.architectureFlows?.phaseWiseFlow || ''}
                    onChange={(e) => {
                      const updated = { ...(formData.architectureFlows || {}) };
                      updated.phaseWiseFlow = e.target.value;
                      setFormData({ ...formData, architectureFlows: updated });
                    }}
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-neutral-50"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: IMPLEMENTATION PHASES */}
            {activeTab === 'phases' && (
              <div className="space-y-6">
                <p className="text-xs text-neutral-500">
                  Edit the four delivery milestones, targets, durations, and scheduled features in Section 7.
                </p>

                {Array.isArray(formData.implementationPhases) && formData.implementationPhases.map((phase: any, pIdx: number) => (
                  <div key={pIdx} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-neutral-600 mb-1">Phase Title</label>
                        <input
                          type="text"
                          value={phase.title || ''}
                          onChange={(e) => {
                            const phases = [...(formData.implementationPhases || [])];
                            phases[pIdx] = { ...phases[pIdx], title: e.target.value };
                            setFormData({ ...formData, implementationPhases: phases });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs font-bold border border-neutral-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-600 mb-1">Duration</label>
                        <input
                          type="text"
                          value={phase.duration || ''}
                          onChange={(e) => {
                            const phases = [...(formData.implementationPhases || [])];
                            phases[pIdx] = { ...phases[pIdx], duration: e.target.value };
                            setFormData({ ...formData, implementationPhases: phases });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-600 mb-1">Target Outcome</label>
                      <input
                        type="text"
                        value={phase.outcome || ''}
                        onChange={(e) => {
                          const phases = [...(formData.implementationPhases || [])];
                          phases[pIdx] = { ...phases[pIdx], outcome: e.target.value };
                          setFormData({ ...formData, implementationPhases: phases });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 6: COMMERCIAL MILESTONES */}
            {activeTab === 'commercials' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">
                  Update payment splitup percentages, timing, and contract milestones in Section 8.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-2">
                    <span className="text-xs font-bold text-neutral-900 block">Advance Milestone</span>
                    <input
                      type="text"
                      value={formData.paymentSplitup?.advance || '40%'}
                      onChange={(e) => {
                        const split = { ...(formData.paymentSplitup || {}) };
                        split.advance = e.target.value;
                        setFormData({ ...formData, paymentSplitup: split });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg"
                      placeholder="e.g. 40%"
                    />
                    <span className="text-[10px] text-neutral-500 block">Due prior to project commencement</span>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-2">
                    <span className="text-xs font-bold text-neutral-900 block">Midway Milestone</span>
                    <input
                      type="text"
                      value={formData.paymentSplitup?.midway || '30%'}
                      onChange={(e) => {
                        const split = { ...(formData.paymentSplitup || {}) };
                        split.midway = e.target.value;
                        setFormData({ ...formData, paymentSplitup: split });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg"
                      placeholder="e.g. 30%"
                    />
                    <span className="text-[10px] text-neutral-500 block">Due at mid-point UAT review</span>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-2">
                    <span className="text-xs font-bold text-neutral-900 block">Completion Milestone</span>
                    <input
                      type="text"
                      value={formData.paymentSplitup?.completion || '30%'}
                      onChange={(e) => {
                        const split = { ...(formData.paymentSplitup || {}) };
                        split.completion = e.target.value;
                        setFormData({ ...formData, paymentSplitup: split });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg"
                      placeholder="e.g. 30%"
                    />
                    <span className="text-[10px] text-neutral-500 block">Due after final UAT and sign-off</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: EXCLUSIONS & OUT OF SCOPE */}
            {activeTab === 'exclusions' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">
                  Contractual exclusions generated from unselected options. You can add or remove custom items below.
                </p>

                <div className="space-y-2">
                  {(Array.isArray(formData.excludedItems) ? formData.excludedItems : []).map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                      <span className="text-xs text-neutral-800 flex-1">{item}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.excludedItems.filter((_: any, i: number) => i !== idx);
                          setFormData({ ...formData, excludedItems: updated });
                        }}
                        className="text-neutral-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Remove Exclusion"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    id="new-exclusion-input"
                    placeholder="Add custom contractual exclusion..."
                    className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          const current = Array.isArray(formData.excludedItems) ? formData.excludedItems : [];
                          setFormData({ ...formData, excludedItems: [...current, val] });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('new-exclusion-input') as HTMLInputElement;
                      if (input && input.value.trim()) {
                        const current = Array.isArray(formData.excludedItems) ? formData.excludedItems : [];
                        setFormData({ ...formData, excludedItems: [...current, input.value.trim()] });
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* PDF File Renamer Card */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-neutral-600 shrink-0" />
            <span className="text-xs font-bold text-neutral-700">PDF Output Filename:</span>
            {editingFileName ? (
              <input
                type="text"
                value={newPdfName}
                onChange={(e) => setNewPdfName(e.target.value)}
                className="px-2.5 py-1 text-xs font-mono bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-800"
              />
            ) : (
              <span className="text-xs font-mono font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
                {project.pdfFileName || `${project.projectName.replace(/\s+/g, '_')}_FRD.pdf`}
              </span>
            )}
          </div>

          <div>
            {editingFileName ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingFileName(false)}
                  className="px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-100 rounded-lg inline-flex items-center"
                >
                  <X className="w-3 h-3 mr-1" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleUpdatePdfName}
                  disabled={isSavingName}
                  className="px-3 py-1 text-xs font-bold bg-[#6b47ff] hover:bg-[#5833e6] text-white rounded-lg flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                >
                  {isSavingName ? <div className="loader loader-xs loader-white mr-1.5 shrink-0" /> : <Save className="w-3 h-3" />}
                  <span>Save Name</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingFileName(true)}
                className="inline-flex items-center px-3 py-1 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                <span>Rename PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* 100% 1:1 Unified Official Nutz Document Preview Container */}
        <div className="pdf-container bg-white p-3 sm:p-8 md:p-12 shadow-sm rounded-xl border border-neutral-200 text-black font-sans leading-relaxed overflow-x-auto">
          <div className="min-w-[580px] sm:min-w-0">
            <OfficialNutzDocument project={project} isPrintView={false} />
          </div>
        </div>

        {/* Delete Document Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteDocument}
          projectName={project.projectName}
          isDeleting={isDeletingDoc}
        />

      </div>
    </div>
  );
}
