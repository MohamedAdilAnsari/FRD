'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Database,
  Lock,
  GitBranch,
  Terminal,
  Activity,
  FileCheck2,
} from 'lucide-react';

interface ProjectTemplate {
  id: string;
  category: string;
  name: string;
  inputPrompt: string;
  architecture: {
    gateway: string;
    services: string;
    datastore: string;
    compliance: string;
  };
  clauses: {
    code: string;
    title: string;
    sla: string;
    status: string;
  }[];
  checksum: string;
  confidence: string;
}

const TEMPLATES: ProjectTemplate[] = [
  {
    id: 'fintech',
    category: 'FinTech & Banking',
    name: 'Distributed Ledger & Payment Gateway',
    inputPrompt: 'Global multi-currency ledger with sub-second ACID settlement and PCI-DSS Level 1 compliance.',
    architecture: {
      gateway: 'Kong Envoy (mTLS 1.3)',
      services: 'Event-Sourced Ledger Engine (gRPC)',
      datastore: 'CockroachDB Multi-Region + Redis 7',
      compliance: 'PCI-DSS • SOC 2 Type II • ISO 27001',
    },
    clauses: [
      {
        code: '§ 1.1',
        title: 'Zero-Discrepancy Double-Entry Accounting',
        sla: '100% Deterministic',
        status: 'Verified',
      },
      {
        code: '§ 2.4',
        title: 'Sub-50ms Settlement Pipeline',
        sla: '< 42ms p99',
        status: 'Guaranteed',
      },
      {
        code: '§ 3.8',
        title: 'Cryptographic Audit Trail (Non-repudiation)',
        sla: 'WORM Immutable',
        status: 'Locked',
      },
    ],
    checksum: '0x8f2a...c4e1',
    confidence: '99.94%',
  },
  {
    id: 'healthtech',
    category: 'HealthTech AI',
    name: 'Clinical Diagnostics & FHIR Integration',
    inputPrompt: 'HIPAA-compliant diagnostic intake pipeline supporting HL7/FHIR v4.0 with automated de-identification.',
    architecture: {
      gateway: 'Zero-Trust Ingress (Mutual TLS)',
      services: 'Clinical Inference Pipeline (Python 3.12)',
      datastore: 'Encrypted PostgreSQL + Object Storage',
      compliance: 'HIPAA • HL7 FHIR • FDA SaMD Class II',
    },
    clauses: [
      {
        code: '§ 1.3',
        title: 'Automated PHI De-identification Engine',
        sla: '100% Scrubbed',
        status: 'Verified',
      },
      {
        code: '§ 2.1',
        title: 'Interoperable FHIR Resource Mappings',
        sla: 'HL7 Core Compliant',
        status: 'Guaranteed',
      },
      {
        code: '§ 4.2',
        title: 'Clinician Dual-Review Sign-off Gate',
        sla: 'Strict Hierarchy',
        status: 'Locked',
      },
    ],
    checksum: '0x3d91...7b0f',
    confidence: '99.89%',
  },
  {
    id: 'cloud-saas',
    category: 'Enterprise SaaS',
    name: 'Multi-Tenant Auth & Workflow Engine',
    inputPrompt: 'Enterprise multi-tenant workspace with SAML/SCIM SSO, RBAC hierarchy, and webhooks.',
    architecture: {
      gateway: 'Cloudflare Edge (WAF + Rate Limiter)',
      services: 'Distributed Workflow Dispatcher (BullMQ)',
      datastore: 'Postgres 16 Multi-Tenant + Redis Cluster',
      compliance: 'GDPR • CCPA • IEEE 830-1998',
    },
    clauses: [
      {
        code: '§ 1.2',
        title: 'Tenant Isolation & Schema Segregation',
        sla: 'Row-Level Security',
        status: 'Verified',
      },
      {
        code: '§ 3.1',
        title: 'SCIM 2.0 User Provisioning Pipeline',
        sla: 'Instant Sync',
        status: 'Guaranteed',
      },
      {
        code: '§ 5.4',
        title: 'Zero Scope-Creep Boundary Matrix',
        sla: 'SLA Bound Contract',
        status: 'Locked',
      },
    ],
    checksum: '0x7e44...9a22',
    confidence: '99.98%',
  },
];

export const MinimalistSpecMatrix: React.FC = () => {
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'architecture' | 'contract'>('blueprint');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const current = TEMPLATES[activeTemplateIndex];

  const handleSelectTemplate = (index: number) => {
    if (index === activeTemplateIndex) return;
    setIsSynthesizing(true);
    setTimeout(() => {
      setActiveTemplateIndex(index);
      setIsSynthesizing(false);
    }, 280);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* Soft Ambient Depth Glow (Delicate warm stone aura) */}
      <div className="absolute -inset-2 bg-gradient-to-br from-stone-100/80 via-slate-100/40 to-stone-50/80 rounded-[2.5rem] blur-2xl -z-10" />

      {/* Main Spec Sheet Container */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-[0_20px_50px_-15px_rgba(28,25,23,0.06)] overflow-hidden transition-all duration-300">
        
        {/* ── 1. Minimal Header Bar ── */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-500">
              <span className="font-semibold text-stone-800">DOC_ID:</span>
              <span className="text-stone-600 tracking-wider">FRD-2026.09</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-stone-400 tracking-wider uppercase">
            <span className="hidden sm:inline">IEEE 830-1998</span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60">
              Audit-Ready
            </span>
          </div>
        </div>

        {/* ── 2. Interactive Template Switcher (Pill Navigation) ── */}
        <div className="px-5 sm:px-6 pt-4 pb-3 border-b border-stone-100 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest flex-shrink-0">
            Live Specimen:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {TEMPLATES.map((tpl, idx) => {
              const isSelected = activeTemplateIndex === idx;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(idx)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100/80 hover:bg-stone-200/70 text-stone-600'
                  }`}
                >
                  {tpl.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. Content Viewport with Smooth Transition ── */}
        <div className="p-5 sm:p-6 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isSynthesizing ? 0.4 : 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Natural Language Input Prompt Block */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 relative">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1 text-stone-500 font-medium">
                    <Terminal className="w-3 h-3 text-stone-400" />
                    Input Prompt Specification
                  </span>
                  <span className="text-indigo-600 font-semibold">{current.confidence} Accuracy</span>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-800 font-normal leading-relaxed italic">
                  "{current.inputPrompt}"
                </p>
              </div>

              {/* Specification View Selector */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100/70 rounded-xl text-xs font-medium border border-stone-200/50">
                {[
                  { id: 'blueprint' as const, label: '01 Requirements', icon: FileCheck2 },
                  { id: 'architecture' as const, label: '02 Architecture', icon: GitBranch },
                  { id: 'contract' as const, label: '03 Legal SLA', icon: Shield },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative py-1.5 px-2 flex items-center justify-center gap-1.5 rounded-lg transition-colors cursor-pointer ${
                        isActive ? 'text-stone-900 font-semibold shadow-2xs bg-white' : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="text-[11px] tracking-tight">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* View 1: Clauses Breakdown */}
              {activeTab === 'blueprint' && (
                <div className="space-y-2">
                  {current.clauses.map((clause, idx) => (
                    <div
                      key={clause.code}
                      className="group p-2.5 sm:p-3 rounded-xl border border-stone-200/80 bg-white hover:border-stone-300 hover:bg-stone-50/50 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono text-[10px] font-semibold text-stone-400 group-hover:text-stone-600 flex-shrink-0">
                          {clause.code}
                        </span>
                        <p className="text-xs font-medium text-stone-800 truncate">
                          {clause.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[10px]">
                        <span className="text-stone-500 hidden sm:inline">{clause.sla}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/50 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {clause.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View 2: Architecture Topology */}
              {activeTab === 'architecture' && (
                <div className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 text-[10px] text-stone-400 uppercase tracking-wider">
                    <span>Subsystem</span>
                    <span>Technology & Standard</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Layers className="w-3 h-3 text-stone-400" /> Ingress Gateway
                    </span>
                    <span className="text-stone-900 font-semibold">{current.architecture.gateway}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Cpu className="w-3 h-3 text-stone-400" /> Core Engine
                    </span>
                    <span className="text-stone-900 font-semibold">{current.architecture.services}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Database className="w-3 h-3 text-stone-400" /> Persistence Tier
                    </span>
                    <span className="text-stone-900 font-semibold">{current.architecture.datastore}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-700">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Shield className="w-3 h-3 text-stone-400" /> Compliance Framework
                    </span>
                    <span className="text-indigo-600 font-semibold">{current.architecture.compliance}</span>
                  </div>
                </div>
              )}

              {/* View 3: Legal SLA & Sign-Off Matrix */}
              {activeTab === 'contract' && (
                <div className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                        Contractual Guarantee
                      </div>
                      <div className="text-xs font-semibold text-stone-900">
                        Zero Scope Creep Protection SLA
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-mono text-[10px] font-bold">
                      Strict Liability
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Any modification outside this formal specification requires bilateral approval through the Automated Change-Request Gate with automated impact analysis.
                  </p>
                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] font-mono text-stone-500">
                    <span>ENGINEERING STAMP: VERIFIED</span>
                    <span className="text-stone-700 font-semibold">DUAL-SIGNATURE CERTIFIED</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 4. Minimal Footer Bar with Realtime Checksum ── */}
        <div className="px-5 sm:px-6 py-3 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-[10px] font-mono text-stone-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-stone-600 font-medium">SYNTHESIS: 1.8s</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-400 font-mono">HASH: {current.checksum}</span>
          </div>

          <div className="text-stone-500 font-medium flex items-center gap-1">
            <span>10/10 SECTIONS COMPILED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
