'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NutzLogo } from '@/components/NutzLogo';
import { UserSession } from '@/types';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SignOutConfirmModal } from '@/components/SignOutConfirmModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshUser = () => {
      fetch('/api/auth/me')
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
          else setUser(null);
        })
        .catch(() => setUser(null));
    };

    refreshUser();
    window.addEventListener('auth-change', refreshUser);
    return () => window.removeEventListener('auth-change', refreshUser);
  }, [pathname]);

  // Click outside listener for user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Transparent dynamic scroll detection with backdrop blur & dark/light section awareness
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 15;
          setIsScrolled(scrolled);

          // Measure element directly under the navbar (center, y: 45px)
          if (typeof document !== 'undefined') {
            const el = document.elementFromPoint(window.innerWidth / 2, 45);
            if (el) {
              const isDark = !!(
                el.closest('[data-theme="dark"]') ||
                el.closest('.bg-\\[\\#1c1917\\]') ||
                el.closest('.bg-black')
              );
              setIsDarkSection(isDark);
            } else {
              setIsDarkSection(false);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleConfirmLogout = async () => {
    setIsSigningOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setUserMenuOpen(false);
      setShowSignOutConfirm(false);
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);

    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  // Do not render navbar on raw print / PDF pages, wizard, or login
  if (pathname.includes('/pdf') || pathname === '/wizard' || pathname === '/login') return null;

  // Header appearance state:
  // - Top of page (!isScrolled): completely transparent
  // - Scrolled over Dark section: transparent dark frosted glass with white text/logo
  // - Scrolled over Light section: transparent light frosted glass with dark text/logo
  const headerBgClass = !isScrolled
    ? 'bg-transparent border-none'
    : isDarkSection
    ? 'bg-[#1c1917]/70 backdrop-blur-md border-none text-white shadow-xs'
    : 'bg-white/80 backdrop-blur-md border-b border-stone-100 text-[#1c1917] shadow-xs';

  const logoFill = isScrolled && isDarkSection ? '#ffffff' : '#000000';
  const navTextColor = isScrolled && isDarkSection
    ? 'text-stone-200 hover:text-white'
    : 'text-[#1c1917] hover:text-stone-600';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-none ${headerBgClass}`}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left Side: High-Resolution Nutz Company Logo (smoothly transitions between black/white) */}
        <Link href="/" className="group flex items-center focus:outline-none shrink-0 py-1">
          <NutzLogo
            size="header"
            fill={logoFill}
            className="transition-all duration-300 group-hover:opacity-90"
          />
        </Link>

        {/* Right Side: Navigation Links & Black Pill CTA Button with Purple Text */}
        <div className="flex items-center gap-2 sm:gap-6 lg:gap-8">
          {/* Desktop Navigation Links: Only essential, required sections */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium transition-colors duration-300">
            <Link
              href="/#capabilities"
              onClick={(e) => handleNavClick(e, 'capabilities')}
              className={`transition-colors duration-300 ${navTextColor}`}
            >
              Capabilities
            </Link>

            <Link
              href="/#process"
              onClick={(e) => handleNavClick(e, 'process')}
              className={`transition-colors duration-300 ${navTextColor}`}
            >
              Process
            </Link>

            {/* Projects displays ONLY after client or admin is logged in */}
            {user && (
              <Link
                href={user.role === 'admin' ? '/admin' : '/projects'}
                className={`transition-colors duration-300 font-semibold ${navTextColor}`}
              >
                Projects
              </Link>
            )}
          </nav>

          {/* User Session Avatar Dropdown (if logged in) */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 py-1.5 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-2xs ${
                  isScrolled && isDarkSection
                    ? 'text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20'
                    : 'text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 border border-stone-200/80'
                }`}
              >
                <span className="max-w-[120px] min-[400px]:max-w-[160px] sm:max-w-[190px] truncate">{user.name || user.email}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''} ${isScrolled && isDarkSection ? 'text-stone-300' : 'text-stone-500'}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 mt-2 w-64 bg-white border border-stone-200/90 rounded-2xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] p-1.5 z-50 text-xs text-stone-800"
                  >
                    {/* User info banner */}
                    <div className="px-3 py-2.5 space-y-0.5 border-b border-stone-100">
                      <p className="font-bold text-stone-900 truncate text-[13px] leading-snug">
                        {user.name || user.email?.split('@')[0] || 'Account'}
                      </p>
                      <p className="text-stone-500 text-[11px] truncate leading-snug">
                        {user.email}
                      </p>
                    </div>

                    {/* Sign Out Action */}
                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          setShowSignOutConfirm(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-medium transition-colors cursor-pointer text-left"
                      >
                        <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                          <LogOut className="w-3.5 h-3.5" />
                        </div>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className={`hidden sm:inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-2xs ${
                isScrolled && isDarkSection
                  ? 'bg-white hover:bg-stone-100 text-stone-900 border border-white/30'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              Sign In
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isScrolled && isDarkSection
                ? 'text-white hover:bg-white/10'
                : 'text-stone-800 hover:bg-stone-200/60'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden px-6 py-5 shadow-xl overflow-hidden border-none backdrop-blur-lg ${
              isScrolled && isDarkSection
                ? 'bg-[#1c1917]/95 text-white'
                : 'bg-white/95 text-[#1c1917] border-b border-stone-100'
            }`}
          >
            <div className="flex flex-col space-y-4 text-sm font-semibold">
              <Link
                href="/#capabilities"
                onClick={(e) => handleNavClick(e, 'capabilities')}
                className="py-1 hover:opacity-80 transition-opacity"
              >
                Capabilities
              </Link>

              <Link
                href="/#process"
                onClick={(e) => handleNavClick(e, 'process')}
                className="py-1 hover:opacity-80 transition-opacity"
              >
                Process
              </Link>

              {user && (
                <>
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/projects'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 hover:opacity-80 transition-opacity font-bold text-[#aa94ff]"
                  >
                    Projects
                  </Link>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowSignOutConfirm(true);
                    }}
                    className="flex items-center gap-2 py-1 text-rose-600 hover:text-rose-700 font-semibold cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}

              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:opacity-80 transition-opacity"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign Out Confirmation Modal for Client & Admin */}
      <SignOutConfirmModal
        isOpen={showSignOutConfirm}
        onClose={() => setShowSignOutConfirm(false)}
        onConfirm={handleConfirmLogout}
        userRole={user?.role as 'admin' | 'client' | undefined}
        userName={user?.name || user?.email}
        isSigningOut={isSigningOut}
      />
    </header>
  );
};
