'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Cpu,
  Layers,
  ShieldCheck,
  Check,
  Zap,
  Sparkles,
  Server,
  Globe,
  Database,
  ArrowUpRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const HeroWorkstationMockup: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'topology' | 'milestones'>('blueprint');
  const [selectedService, setSelectedService] = useState<string>('gateway');

  const services = {
    client: {
      name: 'Client Application Tier',
      tech: 'Next.js 14 App Router • TailwindCSS • React Query',
      protocol: 'HTTPS / WSS (TLS 1.3)',
      latency: '< 12ms Edge SSR',
      role: 'Client portal, interactive scoping wizards, live revision tracking, vector PDF render engine.',
    },
    gateway: {
      name: 'Kong Enterprise API Gateway',
      tech: 'Kong Gateway • Envoy Proxy • Redis Token Bucket',
      protocol: 'mTLS • OAuth 2.0 / SAML SSO',
      latency: '< 2.4ms Ingress',
      role: 'Global rate-limiting, JWT RBAC verification, API payload validation, telemetry & audit triggers.',
    },
    microservices: {
      name: 'Core Synthesis & Business Squad',
      tech: 'FastAPI Microservices • BullMQ • Python 3.12 Engine',
      protocol: 'gRPC Internal • Kafka Event Bus',
      latency: '< 18ms Async Dispatch',
      role: 'AI taxonomy decomposition across 38 domains, 4-phase WBS scheduling, and clause compliance scoring.',
    },
    database: {
      name: 'PostgreSQL ACID Cluster & Redis',
      tech: 'PostgreSQL 16 (Primary + Sync Replica) • Redis 7 Streams',
      protocol: 'Encrypted at rest (AES-256) • SSL In-Transit',
      latency: '< 1.1ms Query Avg',
      role: 'Relational project specifications, revision history logs, immutable sign-off records, and session cache.',
    },
  };

  return (
    <div className={`relative select-none w-full ${className}`}>
      {/* Outer Studio Frame (Light Theme Porcelain) */}
      <div className="relative w-full rounded-[24px] sm:rounded-[32px] bg-white border border-stone-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden text-left">
        
        {/* ── Studio Header Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md gap-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="h-4 w-px bg-stone-300 hidden sm:block" />
            <div className="flex items-center space-x-2 font-mono text-[11px] sm:text-xs">
              <span className="text-[#6b47ff] font-bold">SPEC-ID: NUTZ-FRD-2026-X</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-700 font-semibold">FINTECH & MULTI-TENANT SAAS</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] sm:text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>DUAL-SIGNATURE CERTIFIED</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium border border-stone-200">
              10/10 SECTIONS
            </span>
          </div>
        </div>

        {/* ── Interactive View Switcher with Motion LayoutId Pill ── */}
        <div className="relative grid grid-cols-3 border-b border-stone-200/80 bg-stone-100/70 p-1.5 gap-1.5 text-xs font-medium">
          {[
            { id: 'blueprint' as const, label: '01. Blueprint Spec', icon: FileText, color: '#6b47ff' },
            { id: 'topology' as const, label: '02. System Topologies', icon: Cpu, color: '#d97706' },
            { id: 'milestones' as const, label: '03. 40-30-30 Milestones', icon: Layers, color: '#16a34a' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 py-2.5 sm:py-3 px-3 flex items-center justify-center gap-2 rounded-xl transition-colors cursor-pointer text-center ${
                  isActive ? 'text-stone-950 font-bold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeWorkstationTabPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-stone-200/80 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon
                  className="w-3.5 h-3.5 transition-colors"
                  style={{ color: isActive ? tab.color : 'currentColor' }}
                />
                <span className="text-[11px] sm:text-xs tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Viewport Stage (Light Theme) ── */}
        <div className="p-5 sm:p-7 min-h-[380px] sm:min-h-[440px] bg-white relative overflow-hidden flex flex-col justify-center">
          
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {/* TAB 1: EXECUTIVE BLUEPRINT SPEC SHEET */}
            {activeTab === 'blueprint' && (
              <motion.div
                key="blueprint"
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 relative z-10 w-full"
              >
                {/* Document Header Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#6b47ff]">
                      <Sparkles className="w-3 h-3" />
                      <span>Nutz Corporate 10-Section Standard</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-display text-stone-900 tracking-tight">
                      Clause 3. Modular Taxonomy & Feature Decomposition
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-white text-stone-600 font-mono text-[11px] border border-stone-200 shadow-2xs">
                      Domain: Core FinTech
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-2.5 py-1 rounded-full bg-[#6b47ff]/10 text-[#6b47ff] font-mono text-[11px] font-bold border border-[#6b47ff]/20 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6b47ff] animate-ping" />
                      <span>99.4% Scoped</span>
                    </motion.span>
                  </div>
                </div>

                {/* Interactive Specification Breakdown Table */}
                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-stone-50 text-stone-500 text-[10px] uppercase tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold">Module / Scope Item</th>
                        <th className="py-2.5 px-4 font-semibold hidden sm:table-cell">Sub-Module Hierarchy</th>
                        <th className="py-2.5 px-4 font-semibold">SLA / Complexity</th>
                        <th className="py-2.5 px-4 font-semibold text-right">Compliance Gate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-[11px] sm:text-xs">
                      {[
                        {
                          name: 'Core Ledger Engine',
                          color: 'bg-[#6b47ff]',
                          sub: 'Double-Entry • Real-time Balances • Currency Math',
                          sla: 'Tier 1 (High)',
                          slaBg: 'bg-purple-50 text-purple-700 border-purple-200',
                          status: 'Approved',
                        },
                        {
                          name: 'Zero-Trust RBAC & Auth',
                          color: 'bg-amber-500',
                          sub: 'MFA • Token Revocation • Role Permission Matrix',
                          sla: 'Tier 1 (High)',
                          slaBg: 'bg-amber-50 text-amber-700 border-amber-200',
                          status: 'Approved',
                        },
                        {
                          name: 'Payment & Invoicing Gateway',
                          color: 'bg-sky-500',
                          sub: 'Stripe & Razorpay POS • Webhook Signature Audit',
                          sla: 'Tier 2 (Standard)',
                          slaBg: 'bg-sky-50 text-sky-700 border-sky-200',
                          status: 'Approved',
                        },
                      ].map((row, i) => (
                        <motion.tr
                          key={i}
                          whileHover={{ backgroundColor: '#fafaf9', x: 2 }}
                          transition={{ duration: 0.15 }}
                          className="transition-colors cursor-default"
                        >
                          <td className="py-3 px-4 font-semibold text-stone-900 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${row.color}`} />
                            <span>{row.name}</span>
                          </td>
                          <td className="py-3 px-4 text-stone-600 hidden sm:table-cell">
                            {row.sub}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded border font-medium text-[10px] ${row.slaBg}`}>
                              {row.sla}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-emerald-700 font-semibold flex items-center justify-end gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{row.status}</span>
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Dual-Signature Verification Footer Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Party A (Service Provider)</span>
                      <span className="text-stone-900 font-bold">Nutz Technovation Pvt Ltd</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                      SEALED & SIGNED
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Party B (Client Organization)</span>
                      <span className="text-stone-900 font-bold">Acme Enterprise Client</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#6b47ff]/10 text-[#6b47ff] font-semibold border border-[#6b47ff]/20">
                      READY FOR COUNTER-SIGN
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: INTERACTIVE SYSTEM ARCHITECTURE TOPOLOGY */}
            {activeTab === 'topology' && (
              <motion.div
                key="topology"
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 relative z-10 w-full"
              >
                {/* Architecture Topology Map with Micro Interactive Motion */}
                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                    {[
                      { key: 'client', icon: Globe, label: 'Client App Tier', badge: 'EDGE', desc: 'Next.js 14 App Router', color: '#6b47ff' },
                      { key: 'gateway', icon: Server, label: 'API Gateway', badge: 'INGRESS', desc: 'Kong • JWT Auth Shield', color: '#d97706' },
                      { key: 'microservices', icon: Cpu, label: 'Synthesis Engine', badge: 'COMPUTE', desc: 'FastAPI • BullMQ Queue', color: '#0284c7' },
                      { key: 'database', icon: Database, label: 'PostgreSQL Cluster', badge: 'STORAGE', desc: 'ACID Replica + Redis', color: '#16a34a' },
                    ].map((node) => {
                      const NodeIcon = node.icon;
                      const isSelected = selectedService === node.key;
                      return (
                        <motion.button
                          key={node.key}
                          type="button"
                          onClick={() => setSelectedService(node.key)}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                            isSelected
                              ? 'bg-stone-50/90 shadow-md ring-2'
                              : 'bg-white border-stone-200/90 hover:border-stone-300 shadow-2xs'
                          }`}
                          style={{
                            borderColor: isSelected ? node.color : undefined,
                            boxShadow: isSelected ? `0 4px 18px ${node.color}20` : undefined,
                          }}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeTopologyOutline"
                              className="absolute inset-0 rounded-2xl border-2 pointer-events-none -z-0"
                              style={{ borderColor: node.color }}
                              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                            />
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <NodeIcon className="w-5 h-5" style={{ color: node.color }} />
                            <span className="text-[10px] font-mono text-stone-400 font-semibold">{node.badge}</span>
                          </div>
                          <div className="font-bold text-stone-900 text-xs sm:text-sm font-display">{node.label}</div>
                          <div className="text-[10px] font-mono text-stone-500 mt-1">{node.desc}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Service Inspector Detail Card with Motion crossfade */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-mono space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-stone-900 font-bold text-sm">
                          {services[selectedService as keyof typeof services].name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-stone-500">
                        <span className="px-2 py-0.5 rounded bg-white text-[#6b47ff] font-semibold border border-stone-200 shadow-2xs">
                          {services[selectedService as keyof typeof services].protocol}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          {services[selectedService as keyof typeof services].latency}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-stone-700 text-[11px] sm:text-xs">
                      <div className="text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
                        Infrastructure Stack:
                      </div>
                      <div className="text-stone-900 font-semibold">
                        {services[selectedService as keyof typeof services].tech}
                      </div>
                      <p className="text-stone-600 mt-1 leading-relaxed">
                        {services[selectedService as keyof typeof services].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* TAB 3: 40-30-30 COMMERCIAL MILESTONES & CLAUSE 9.2 SLA */}
            {activeTab === 'milestones' && (
              <motion.div
                key="milestones"
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 relative z-10 w-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-200 gap-2">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-stone-900 font-display">
                      Nutz Verified Delivery Schedule (40-30-30 Split)
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      Zero dispute phased gates • Escrow released only upon verified acceptance
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-bold self-start sm:self-auto">
                    Clause 9.2 Scope Protected
                  </span>
                </div>

                {/* 4-Phase Grid with Motion Progress Springs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { phase: 'PHASE 01', pct: '40%', widthPct: 40, title: 'Architecture & Setup', days: '30 Working Days', check: 'Staging DB Sign-Off', color: '#6b47ff', bg: 'bg-[#6b47ff]' },
                    { phase: 'PHASE 02', pct: '30%', widthPct: 30, title: 'Core Business Logic', days: '25 Working Days', check: 'Transaction Tests Pass', color: '#d97706', bg: 'bg-amber-500' },
                    { phase: 'PHASE 03', pct: '15%', widthPct: 15, title: 'APIs & Integrations', days: '20 Working Days', check: 'Gateway Webhooks Live', color: '#0284c7', bg: 'bg-sky-500' },
                    { phase: 'PHASE 04', pct: '15%', widthPct: 15, title: 'UAT & Final Deploy', days: '15 Working Days', check: 'Production Handover', color: '#16a34a', bg: 'bg-emerald-500' },
                  ].map((p, i) => (
                    <motion.div
                      key={p.phase}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono" style={{ color: p.color }}>{p.phase}</span>
                        <span className="text-[11px] font-mono font-bold text-stone-900 bg-white border border-stone-200 px-2 py-0.5 rounded shadow-2xs">
                          {p.pct}
                        </span>
                      </div>

                      {/* Animated Progress Track */}
                      <div className="h-1.5 w-full bg-stone-200/80 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.widthPct * 2}%` }}
                          transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full ${p.bg} rounded-full`}
                        />
                      </div>

                      <div className="font-bold text-stone-900 text-xs font-display">{p.title}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{p.days}</div>
                      <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 pt-1 border-t border-stone-200 font-medium">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{p.check}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bug Turnaround SLA Matrix */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-stone-900 font-bold block">Contractual Bug Turnaround SLAs:</span>
                      <span className="text-stone-600 text-[11px]">Sev-1: &lt; 4 Hours • Sev-2: &lt; 24 Hours • Sev-3: Next Sprint</span>
                    </div>
                  </div>
                  <span className="text-[#6b47ff] text-[11px] font-bold">100% Bound by Clause 9</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ── Studio Footer Status Bar ── */}
        <div className="px-5 sm:px-6 py-3 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-stone-500 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-stone-700 font-medium">10/10 EXECUTIVE SECTIONS PRE-VALIDATED</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-stone-400">ISO 9001 / SOC-2 ALIGNED</span>
            <span className="text-[#6b47ff] font-semibold">EXPORT: VECTOR PDF READY</span>
          </div>
        </div>

      </div>
    </div>
  );
};
