'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NutzLogo } from './NutzLogo';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Do not render footer on print/PDF views, wizard, login, or client/admin dashboards
  if (
    pathname.includes('/pdf') ||
    pathname === '/wizard' ||
    pathname === '/login' ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/projects')
  ) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-stone-200 text-stone-600 font-sans py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Row: Logo, Brief Mission & Clean Essential Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
          <div className="space-y-2">
            <Link href="/" className="inline-block focus:outline-none">
              <NutzLogo fill="#000000" size="header" />
            </Link>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              Enterprise Functional Requirements Document Generator. Automated system topologies, scoping taxonomy, and dual-signature executive blueprints.
            </p>
          </div>

          {/* Simple, Clean Essential Actions */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-medium text-stone-600">
            <Link href="/#capabilities" className="hover:text-stone-900 transition-colors">
              Capabilities
            </Link>
            <Link href="/#process" className="hover:text-stone-900 transition-colors">
              Process
            </Link>
            <Link href="/#faq" className="hover:text-stone-900 transition-colors">
              FAQ
            </Link>
            <Link href="/login" className="hover:text-stone-900 transition-colors">
              Sign In
            </Link>
            <Link
              href="/wizard"
              className="px-4 py-2 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5 shadow-2xs hover:shadow-xs"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Minimal Bottom Bar: Copyright & Compliance */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Nutz Technovation Private Limited. All rights reserved.</p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-stone-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium text-stone-600">ISO 9001 & SOC-2 Aligned</span>
            </span>
            <span className="text-stone-300">•</span>
            <a
              href="mailto:contact@nutz.in"
              className="text-stone-500 hover:text-stone-900 transition-colors font-medium"
            >
              contact@nutz.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
