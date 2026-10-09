'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { QuantumArchitectureSculpture3D } from '@/components/ui/QuantumArchitectureSculpture3D';
import { UserSession } from '@/types';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Target,
  Workflow,
  ShieldCheck,
  ReceiptText,
  Code2,
  FileSignature,
  SlidersHorizontal,
  Cpu,
  FileText,
  Check,
  Boxes,
  ListChecks,
  PackageCheck,
  MessageSquare,
  Calendar,
  ShieldAlert,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, []);

  // Six Core Enterprise Pillars (Client-Centric, 1-Sentence High Impact)
  const capabilities = [
    {
      id: 'scope-control',
      number: '01',
      tag: 'Scope Control',
      color: '#6b47ff',
      bgColor: '#f5f3ff',
      icon: Target,
      title: 'Zero Scope Creep',
      summary: 'Every module and feature is cataloged and priced upfront so you never face surprise costs or delayed launches.',
      badge: 'No Hidden Costs',
    },
    {
      id: 'system-architecture',
      number: '02',
      tag: 'Architecture',
      color: '#d97706',
      bgColor: '#fffbeb',
      icon: Workflow,
      title: 'Real-Time Architecture',
      summary: 'Automated topology diagrams and data schemas mapped directly from your project functional requirements.',
      badge: 'Interactive Topologies',
    },
    {
      id: 'compliance',
      number: '03',
      tag: 'Security & Legal',
      color: '#059669',
      bgColor: '#ecfdf5',
      icon: ShieldCheck,
      title: 'Enterprise SLAs',
      summary: 'Strict data privacy, HIPAA / SOC2 alignment, and contractual guarantee clauses drafted directly into the spec.',
      badge: 'Audit & Compliance',
    },
    {
      id: 'commercial-terms',
      number: '04',
      tag: 'Commercials',
      color: '#0284c7',
      bgColor: '#f0f9ff',
      icon: ReceiptText,
      title: 'Phased Milestone Billing',
      summary: 'Automated 40-30-30 payment tranches tied directly to deliverables, acceptance criteria, and sign-offs.',
      badge: 'Milestone Protected',
    },
    {
      id: 'intellectual-property',
      number: '05',
      tag: 'IP Protection',
      color: '#7c3aed',
      bgColor: '#faf5ff',
      icon: Code2,
      title: 'Source Code Ownership',
      summary: 'Comprehensive legal clauses ensuring full client intellectual property ownership upon final milestone delivery.',
      badge: '100% IP Transfer',
    },
    {
      id: 'deliverables-matrix',
      number: '06',
      tag: 'Standard Format',
      color: '#dc2626',
      bgColor: '#fef2f2',
      icon: FileSignature,
      title: 'Dual-Signature Blueprint',
      summary: 'One unified 10-section executive PDF ready for corporate procurement, legal review, and engineering kickoff.',
      badge: 'Legal & Engineering Standard',
    },
  ];

  // Minimalist 3-Step Process (Straightforward, Client Clear)
  const processSteps = [
    {
      step: '01',
      tag: 'Phase 1: Input',
      title: 'Describe Your Product',
      summary: 'Answer guided questions about target users, core features, integrations, and expected scalability.',
      color: '#6b47ff',
      bgColor: '#f5f3ff',
      badge: '10–15 Minutes',
      phaseNumber: 'Interactive Wizard',
      icon: SlidersHorizontal,
    },
    {
      step: '02',
      tag: 'Phase 2: Synthesis',
      title: 'AI Synthesizes the Spec',
      summary: 'NVIDIA NIM decomposes features into 38 taxonomies, technical architecture topologies, and milestones.',
      color: '#d97706',
      bgColor: '#fffbeb',
      badge: 'Instant Generation',
      phaseNumber: 'Automated Reasoning',
      icon: Cpu,
    },
    {
      step: '03',
      tag: 'Phase 3: Agreement',
      title: 'Export & Dual-Sign',
      summary: 'Review the generated 10-section blueprint, fine-tune pricing, and export an audit-ready PDF for signing.',
      color: '#059669',
      bgColor: '#ecfdf5',
      badge: 'Print-Ready PDF',
      phaseNumber: 'Executive Contract',
      icon: FileSignature,
    },
  ];

  const faqs = [
    {
      q: 'What is a Functional Requirements Document (FRD)?',
      a: 'An FRD is a formal engineering contract that translates business goals into granular technical specifications, acceptance criteria, data flows, and project boundaries. It ensures both client stakeholders and engineering teams share exact expectations before any code is written.',
    },
    {
      q: 'How does Nutz FRDG prevent scope creep?',
      a: 'Nutz FRDG enforces a strict 10-section blueprint. Section 9 explicitly enumerates "Excluded Scope" alongside standard Change Order rates, legally protecting your budget and engineering schedule against unbilled work.',
    },
    {
      q: 'Can I export the specification for legal and executive sign-off?',
      a: 'Yes. Every generated blueprint includes formal signature blocks, milestone tranches (40-30-30), SLA terms, and compliance declarations that can be exported immediately to audit-ready PDF and shared with enterprise legal teams.',
    },
    {
      q: 'How is the technical architecture diagram generated?',
      a: 'Our engine uses NVIDIA NIM AI synthesis trained on enterprise cloud architectures (AWS, GCP, Azure, Hybrid) to generate interactive system topology diagrams and data flow maps tailored to your exact tech stack.',
    },
    {
      q: 'Who owns the intellectual property of generated documents?',
      a: 'You do. 100% of generated requirements, system flows, and technical documentation belong to your organization with full commercial usage rights.',
    },
  ];

  return (
    <div className="w-full bg-white text-[#1c1917] overflow-x-hidden selection:bg-[#aa94ff]/30">
      
      {/* Ambient Radial Background Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-500/12 via-indigo-500/8 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[200px] right-[-100px] w-[500px] h-[500px] bg-amber-500/8 blur-[140px] pointer-events-none rounded-full" />

      {/* =========================================================================
          1. HERO SECTION: Clean Left-Aligned 2-Column Grid with Kinetic 3D Sculpture
         ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Perfectly Left-Aligned Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            


            {/* Main Title with Sacramento script accent */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-[-0.04em] text-[#1c1917] leading-[1.06]"
            >
              Enterprise Functional Requirements Specifications,{' '}
              <span className="block sm:inline font-script text-5xl min-[400px]:text-6xl sm:text-7xl lg:text-8xl font-normal text-gradient-purple tracking-normal -mt-1 sm:mt-0">
                Automated.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl text-stone-600 max-w-xl leading-relaxed font-normal"
            >
              Transform complex software ideas into audit-ready Functional Requirements Documents (FRD) in minutes. Generate verified system architectures, milestone tranches, and dual-signed engineering contracts instantly.
            </motion.p>

            {/* Action Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/wizard"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#6b47ff] via-[#7c3aed] to-[#5833e6] hover:from-[#5833e6] hover:to-[#4a24db] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_10px_25px_-5px_rgba(107,71,255,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(107,71,255,0.6)] transition-all group cursor-pointer"
                >
                  <span>Launch Scoping Wizard</span>
                  <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {user ? (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/projects'}
                    className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-stone-50 text-[#1c1917] font-semibold text-sm sm:text-base border border-stone-200 flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:border-stone-300"
                  >
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>{user.role === 'admin' ? 'Admin Studio' : 'My Blueprints'}</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    href="#capabilities"
                    className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm sm:text-base border border-stone-200 shadow-2xs hover:border-stone-300 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Compass className="w-4 h-4 text-stone-600 group-hover:text-purple-600 transition-colors" />
                    <span>Explore Architecture</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              )}
            </motion.div>


          </div>

          {/* Kinetic Architectural Core with Ambient Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex items-center justify-center relative pointer-events-auto"
          >
            {/* Background Ambient Glow Disc */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-indigo-500/10 to-amber-500/10 rounded-full blur-3xl -z-10 transform scale-90" />

            {/* 3D Kinetic Canvas */}
            <QuantumArchitectureSculpture3D />




          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          2. ENTERPRISE CAPABILITIES: Six Core Pillars (Minimalist, Client-Clear & Fluid Motion)
         ========================================================================= */}
      <section id="capabilities" className="py-10 sm:py-14 bg-white border-y border-stone-200/80 scroll-mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#1c1917]">
              Six Pillars in Every Blueprint.
            </h2>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              One binding specification that keeps your clients aligned, engineering on schedule, and budget protected.
            </p>
          </motion.div>

          {/* Minimalist, Clean Cards: 1 Clear Client Takeaway Per Pillar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {capabilities.map((srv) => {
              const IconComp = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                  className="relative p-6 sm:p-7 rounded-[24px] bg-white border border-stone-200/90 hover:border-stone-400/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_35px_-15px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between space-y-5 group overflow-hidden cursor-default"
                >
                  {/* Subtle top ambient accent line on hover */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${srv.color}, transparent)` }}
                  />

                  <div className="space-y-3.5">
                    {/* Header Row: Icon + Monospace Sequence Tag */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xs"
                        style={{ backgroundColor: srv.bgColor, color: srv.color }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-stone-400 bg-stone-100/90 px-2.5 py-1 rounded-full border border-stone-200/60 tracking-wider">
                        {srv.tag}
                      </span>
                    </div>

                    {/* Bold, Direct Title */}
                    <h3 className="text-lg sm:text-xl font-bold font-display text-stone-900 tracking-tight group-hover:text-black transition-colors pt-0.5">
                      {srv.title}
                    </h3>

                    {/* Single Crisp Client-Friendly Sentence */}
                    <p className="text-stone-600 text-sm leading-relaxed font-normal">
                      {srv.summary}
                    </p>
                  </div>

                  {/* Clean Bottom Highlight Chip + Interactive Micro-Arrow */}
                  <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200/80">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: srv.color }} />
                      <span>{srv.badge}</span>
                    </span>
                    <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-[#6b47ff] flex items-center justify-center transition-all duration-200 border border-stone-200/90 group-hover:border-[#6b47ff]">
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          3. SCOPING PROCESS: 3-Step Minimalist Timeline (Simpler, Impressive & Clear)
         ========================================================================= */}
      <section id="process" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#1c1917]">
            Simple Process. Serious Technical Results.
          </h2>
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            Transform conversational product requirements into audit-ready functional blueprints in under 15 minutes.
          </p>
        </motion.div>

        {/* Minimalist 3-Step Journey Cards with Desktop Connector Rail */}
        <div className="relative">
          {/* Subtle horizontal connecting rail on desktop */}
          <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-[2px] bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 z-0 pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 relative z-10"
          >
            {processSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                  className="relative p-6 sm:p-7 rounded-[24px] bg-white border border-stone-200/90 hover:border-stone-400/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_35px_-15px_rgba(0,0,0,0.07)] transition-all duration-300 flex flex-col justify-between space-y-5 group overflow-hidden cursor-default"
                >
                  {/* Subtle top ambient accent line on hover */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                  />

                  <div className="space-y-3.5">
                    {/* Step Marker Disc & Stage Tag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-2xs transition-transform duration-300 group-hover:scale-105 border"
                          style={{ backgroundColor: step.bgColor, color: step.color, borderColor: `${step.color}25` }}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-stone-400">
                          {step.step}
                        </span>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border"
                        style={{ backgroundColor: step.bgColor, color: step.color, borderColor: `${step.color}25` }}
                      >
                        {step.tag}
                      </span>
                    </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-display text-stone-900 tracking-tight group-hover:text-black transition-colors pt-0.5">
                    {step.title}
                  </h3>

                  {/* One Clear Client-Friendly Sentence */}
                  <p className="text-stone-600 text-sm leading-relaxed font-normal">
                    {step.summary}
                  </p>
                </div>

                {/* Bottom Highlight Chip */}
                <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200/80">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                    <span>{step.badge}</span>
                  </span>
                  <span className="text-stone-400 group-hover:text-stone-700 transition-colors text-xs font-mono">
                    {step.phaseNumber}
                  </span>
                </div>
              </motion.div>
            );
          })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          4. SAMPLE FRD BLUEPRINT VIEWER: Official 10-Section Standard (Light Theme)
         ========================================================================= */}
      <section id="sample-frd" className="py-10 sm:py-14 bg-white border-y border-stone-200/80 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-xl"
          >
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 font-display leading-tight">
              Strict Executive Standard.{' '}
              <span className="font-script text-4xl sm:text-6xl text-[#aa94ff] font-normal block sm:inline">
                Zero Ambiguity.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Preview the print-optimized, dual-signed standard trusted by CTOs, legal advisors, and delivery squads across enterprise organizations.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/wizard"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Launch Scoping Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#aa94ff]" />
                </Link>
              </motion.div>

              {user && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/projects'}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors border border-stone-300 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#6b47ff]" />
                    <span>{user.role === 'admin' ? 'Admin Dashboard' : 'View Blueprints'}</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Blueprint Document Card in Light Theme with Bold Typography */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg bg-white border border-stone-200/90 rounded-[24px] sm:rounded-[28px] p-4 sm:p-7 shadow-xl shadow-stone-200/50 space-y-3 font-sans text-xs text-stone-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-1.5 text-stone-600 border-b border-stone-100 pb-2.5 font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-stone-800">
                  DOC REF: NUTZ-FRD-2026-X
                </span>
              </div>
              <span className="text-emerald-700 font-bold text-[10px] sm:text-[11px]">READY FOR SIGN-OFF</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              {[
                { icon: ListChecks, title: '1. Project Requirements', sec: 'Section 1', color: 'text-stone-500 font-bold' },
                { icon: PackageCheck, title: '2. Project Deliverables', sec: 'Section 2', color: 'text-stone-500 font-bold' },
                { icon: Code2, title: '3. Scope Breakdown & Technologies Table', sec: 'Section 3', color: 'text-[#6b47ff] font-bold' },
                { icon: MessageSquare, title: '4. Communication Plan & Additional Pricing', sec: 'Section 4-5', color: 'text-stone-500 font-bold' },
                { icon: Workflow, title: '5. Architecture & System Flow Diagrams', sec: 'Section 6', color: 'text-amber-600 font-bold' },
                { icon: Calendar, title: '6. 4-Phase Implementation Schedule', sec: 'Section 7', color: 'text-emerald-600 font-bold' },
                { icon: ReceiptText, title: '7. Payments & Duration', sec: 'Section 8', color: 'text-stone-500 font-bold' },
                { icon: ShieldAlert, title: '8. Excluded Scope List & 13 Standard Agreements', sec: 'Section 9-10', color: 'text-stone-500 font-bold' },
              ].map((item, idx) => {
                const RowIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded-xl bg-white border border-stone-200/80 flex items-center justify-between shadow-2xs cursor-default gap-2"
                  >
                    <div className="flex items-center gap-2 text-stone-900 font-bold min-w-0 flex-1">
                      <RowIcon className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                      <span className="truncate sm:whitespace-normal">{item.title}</span>
                    </div>
                    <span className={`shrink-0 text-[10px] sm:text-[11px] ml-1 sm:ml-2 ${item.color}`}>{item.sec}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-stone-100 flex flex-col min-[450px]:flex-row gap-1 min-[450px]:gap-0 items-start min-[450px]:items-center justify-between text-[10px] sm:text-[11px] font-bold text-stone-600">
              <span className="font-bold">Dual-Signature Sealed Standard</span>
              <span className="text-stone-950 font-bold">Nutz Technovation Standard</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          5. FREQUENTLY ASKED QUESTIONS (Light Theme)
         ========================================================================= */}
      <section id="faq" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2 mb-6 sm:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#1c1917]">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Quick answers about Functional Requirements Document generation, AI architecture, and contractual sign-off standards.
          </p>
        </motion.div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs"
              >
                <motion.button
                  whileTap={{ scale: 0.995 }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold font-display text-stone-900">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isOpen ? 'bg-[#6b47ff] text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          6. PRE-FOOTER GRAND CALL TO ACTION: Pure White Architectural Card
         ========================================================================= */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[36px] bg-white p-6 sm:p-10 text-center text-stone-900 overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] border border-stone-200"
        >
          {/* Subtle Ambient Blueprint Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-stone-900 leading-tight">
              Eliminate Scope Creep. Launch With Certainty.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Generate your official 10-section enterprise functional requirements document in minutes with AI architecture and contractual safeguards.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/wizard"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6b47ff] hover:bg-[#5833e6] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Launch Scoping Wizard</span>
                  <ArrowRight className="w-4 h-4 text-white/90" />
                </Link>
              </motion.div>

              {user && (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/projects'}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-stone-100 text-stone-800 font-semibold text-sm sm:text-base border border-stone-300 shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-stone-600" />
                    <span>{user.role === 'admin' ? 'Admin Dashboard' : 'View Blueprints'}</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
