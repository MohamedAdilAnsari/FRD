'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
  Terminal,
  RotateCw,
  Check,
  Award,
} from 'lucide-react';

interface PromptPreset {
  id: string;
  chipLabel: string;
  prompt: string;
  title: string;
  docId: string;
  taxonomy: string;
  scopeLimit: string;
  compliance: string[];
  clauses: string[];
}

const PRESETS: PromptPreset[] = [
  {
    id: 'fintech',
    chipLabel: 'FinTech Ledger',
    prompt: 'Multi-currency settlement engine with sub-second ACID settlement and PCI-DSS Level 1 compliance.',
    title: 'Autonomous Payment Gateway & Core Banking Ledger',
    docId: 'FRD-FIN-2026-X9',
    taxonomy: 'Banking & High-Frequency Settlement',
    scopeLimit: '0.00% Drift • Strict Bounds',
    compliance: ['IEEE 830', 'PCI-DSS v4.0', 'SOC 2 Type II'],
    clauses: [
      '§ 1.0 Real-time double-entry ledger reconciliation',
      '§ 2.4 Sub-50ms deterministic settlement pipeline',
      '§ 3.1 Immutable WORM cryptographic audit trail',
    ],
  },
  {
    id: 'health',
    chipLabel: 'HealthTech AI',
    prompt: 'HIPAA-compliant diagnostic intake pipeline supporting HL7/FHIR v4.0 with automated de-identification.',
    title: 'Clinical Diagnostic Intake & FHIR Interoperability Suite',
    docId: 'FRD-MED-2026-C4',
    taxonomy: 'Healthcare & Clinical Telemetry',
    scopeLimit: '100% PHI Scrubbed • Zero Leakage',
    compliance: ['HIPAA Omnibus', 'HL7 FHIR v4.0', 'FDA SaMD'],
    clauses: [
      '§ 1.2 Automated biometric & PHI redaction gate',
      '§ 2.0 Bi-directional EHR synchronizer with mTLS',
      '§ 4.1 Clinician dual-sign-off verification protocol',
    ],
  },
  {
    id: 'saas',
    chipLabel: 'Enterprise SaaS',
    prompt: 'Multi-tenant organization workspace with SAML/SCIM SSO, RBAC hierarchy, and audit webhooks.',
    title: 'Multi-Tenant Governance & Dynamic RBAC Platform',
    docId: 'FRD-ENT-2026-A1',
    taxonomy: 'Cloud Infrastructure & IAM',
    scopeLimit: 'Zero Scope Creep SLA Bound',
    compliance: ['ISO/IEC 27001', 'GDPR', 'DoD-STD-498'],
    clauses: [
      '§ 1.1 Strict row-level tenant boundary isolation',
      '§ 3.2 Automated SCIM 2.0 provisioning pipeline',
      '§ 5.0 Cryptographically stamped sign-off matrix',
    ],
  },
];

export const LiveFRDSynthesizer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSteps, setGeneratedSteps] = useState(10);
  const [stampVerified, setStampVerified] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const current = PRESETS[selectedIdx];

  const handleSelectPreset = (idx: number) => {
    if (idx === selectedIdx || isGenerating) return;
    setIsGenerating(true);
    setStampVerified(false);
    setGeneratedSteps(3);

    // Simulate real-time progressive specification synthesis
    const stepInterval = setInterval(() => {
      setGeneratedSteps((prev) => {
        if (prev >= 10) {
          clearInterval(stepInterval);
          setIsGenerating(false);
          return 10;
        }
        return prev + 1;
      });
    }, 120);

    setSelectedIdx(idx);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-xl mx-auto select-none"
    >
      {/* Delicate Ambient Glow */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-stone-200/50 via-indigo-50/40 to-stone-100/50 rounded-[2.5rem] blur-2xl -z-10 pointer-events-none" />

      {/* Main Synthesizer Capsule */}
      <div className="relative bg-white rounded-3xl border border-stone-200/90 shadow-[0_20px_60px_-15px_rgba(28,25,23,0.06)] overflow-hidden transition-all duration-300">
        
        {/* ── Header: Terminal-Minimalist Status Strip ── */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-stone-100 bg-stone-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isGenerating ? 'bg-indigo-400' : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isGenerating ? 'bg-indigo-600' : 'bg-emerald-600'
                }`}
              />
            </span>
            <span className="font-mono text-[11px] font-semibold text-stone-700 tracking-tight">
              {isGenerating ? 'SYNTHESIZING FRD SPECIFICATION...' : 'LIVE SPECIFICATION ENGINE'}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="text-stone-400 hidden sm:inline">PROGRESS:</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-200/60 text-stone-700 font-bold">
              {generatedSteps}/10 SECTIONS
            </span>
          </div>
        </div>

        {/* ── Interactive Input Prompt Section ── */}
        <div className="p-5 sm:p-6 border-b border-stone-100 space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-stone-500 font-mono">
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              <span>Enter Vision or Select Domain:</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
              Instant Generation
            </span>
          </div>

          {/* Quick-Select Domain Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {PRESETS.map((preset, idx) => {
              const isActive = selectedIdx === idx;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600'
                  <span>{preset.chipLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Live Prompt Display */}
          <div className="relative p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70">
            <p className="text-xs sm:text-[13px] text-stone-800 font-serif italic leading-relaxed">
              "{current.prompt}"
            </p>
            {isGenerating && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent rounded-xl"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        </div>

        {/* ── Generated Formal Document Sheet (The Living Artifact) ── */}
        <div className="p-5 sm:p-6 bg-white space-y-4 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Document Identity Block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    Target Document Standard
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-stone-900 font-display">
                    {current.title}
                  </h4>
                </div>
                <div className="flex sm:flex-col items-end gap-1 font-mono text-[10px] sm:text-right">
                  <span className="text-indigo-600 font-bold">{current.docId}</span>
                  <span className="text-stone-400">{current.taxonomy}</span>
                </div>
              </div>

              {/* Verified Scope & Legal Compliance Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-mono text-[10px] font-medium border border-stone-200/60">
                  {current.scopeLimit}
                </span>
                {current.compliance.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-md bg-stone-50 text-stone-600 font-mono text-[10px] border border-stone-200/60"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Formal Clauses List */}
              <div className="space-y-2 pt-1">
                {current.clauses.map((clause, i) => (
                  <motion.div
                    key={clause}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="p-2.5 rounded-xl bg-stone-50/70 border border-stone-200/60 flex items-center justify-between gap-2 text-xs font-mono text-stone-700"
                  >
                    <span className="truncate">{clause}</span>
                    <span className="flex items-center gap-1 text-emerald-600 text-[10px] flex-shrink-0 font-medium">
                      <Check className="w-3 h-3" />
                      Audited
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Holographic Foil Stamp Seal */}
              <div className="pt-2 flex items-center justify-between">
                <div className="space-y-0.5 text-stone-500 text-[11px]">
                  <div className="font-mono text-[10px] text-stone-400 uppercase">
                    Zero Scope-Creep Guarantee
                  </div>
                  <div className="font-semibold text-stone-800">
                    Dual Engineering & Legal Sign-Off
                  </div>
                </div>

                {/* Holographic Interactive Stamp */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStampVerified(!stampVerified)}
                  className="relative group cursor-pointer"
                  title="Click to toggle formal engineering verification"
                >
                  <div
                    className="relative px-3.5 py-2 rounded-xl border border-stone-300/80 shadow-xs flex items-center gap-2 overflow-hidden transition-all duration-300 group-hover:border-indigo-400"
                    style={{
                      background: `radial-gradient(circle at ${mousePos.x * 100}% ${
                        mousePos.y * 100
                      }%, rgba(245, 243, 255, 0.9), rgba(255, 255, 255, 0.95))`,
                    }}
                  >
                    <Award
                      className={`w-4 h-4 transition-colors ${
                        stampVerified ? 'text-emerald-600' : 'text-indigo-600'
                      }`}
                    />
                    <div className="text-left font-mono text-[10px] leading-tight">
                      <div className="font-bold text-stone-900">
                        {stampVerified ? 'CERTIFIED APPROVED' : 'IEEE 830 STAMP'}
                      </div>
                      <div className="text-stone-400 text-[9px]">
                        {stampVerified ? 'Verified by Nutz' : 'Click to Verify'}
                      </div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer Strip: Action Gateway ── */}
        <div className="px-5 sm:px-6 py-3.5 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ready for Legal Binding & Development</span>
          </div>

          <Link
            href="/wizard"
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-indigo-600 transition-colors cursor-pointer group"
          >
            <span>Launch Wizard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
