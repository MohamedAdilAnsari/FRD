'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  User,
  Building2,
  Phone,
  Mail,
  Lock,
  LogIn,
  UserPlus,
} from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect') || null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Prefetch dashboard routes for instant client/admin transitions
  useEffect(() => {
    router.prefetch('/admin');
    router.prefetch('/projects');
    router.prefetch('/wizard');
  }, [router]);

  // Auto-redirect if already authenticated
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.role === 'admin') {
          router.replace('/admin');
        } else if (data.user) {
          // Client always moves to dashboard (/projects), never to create project section (/wizard)
          const destination = redirectTo && redirectTo.startsWith('/projects/') ? redirectTo : '/projects';
          router.replace(destination);
        }
      })
      .catch(() => {});
  }, [router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (mode === 'register' && phone.trim()) {
        const clean = phone.replace(/\D/g, '');
        if (clean.length !== 10) {
          setError('Phone number must be exactly 10 digits.');
          setLoading(false);
          return;
        }
        if (!/^[6-9]\d{9}$/.test(clean)) {
          setError('Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).');
          setLoading(false);
          return;
        }
      }

      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      // Register is strictly locked to 'client' role. Admin accounts can only be provisioned by main admin.
      const payload =
        mode === 'register'
          ? { email, password, name, role: 'client', companyName, phone: phone.replace(/\D/g, '').slice(0, 10) }
          : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Client always moves to dashboard (/projects), not create project section (/wizard)
      const targetUrl =
        data.user?.role === 'admin'
          ? '/admin'
          : (redirectTo && redirectTo.startsWith('/projects/') ? redirectTo : '/projects');

      if (typeof window !== 'undefined' && data.user) {
        try {
          sessionStorage.setItem('frdg_user', JSON.stringify(data.user));
        } catch (e) {}
      }
      window.dispatchEvent(new Event('auth-change'));

      if (mode === 'register') {
        setSuccessMessage('Account created successfully! Redirecting...');
      }

      // Immediate browser navigation bypassing RSC client holding delay
      window.location.assign(targetUrl);
    } catch (err: any) {
      setError(err.message || 'Authentication error. Please check your credentials.');
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-stone-50 via-purple-50/30 to-indigo-50/40 text-[#1c1917] font-sans antialiased relative overflow-hidden">
      {/* Background Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-purple-500/15 via-indigo-500/10 to-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-400/10 blur-[120px] pointer-events-none rounded-full" />

      {/* ── Fixed Width Centered Container ── */}
      <div className="w-full max-w-[440px] flex flex-col items-center space-y-4 relative z-10">
        
        {/* Top Header Row: Home button on the left side */}
        <div className="w-full flex items-center justify-between px-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/80 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
            <span>Back to Home</span>
          </Link>
          <span className="text-[11px] font-mono text-purple-700 bg-purple-100/80 px-2.5 py-1 rounded-full border border-purple-200/60 font-semibold">
            Nutz FRDG Studio
          </span>
        </div>

        {/* ── Fixed Glass Card Container ── */}
        <div className="w-full bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),0_4px_16px_rgba(107,71,255,0.05)]">
          {/* Card Title & Subtitle */}
          <div className="mb-6 text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <h1 className="text-2xl font-bold font-display tracking-tight text-stone-900">
                  {mode === 'login' ? 'Sign in to FRDG' : 'Create an Account'}
                </h1>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                  {mode === 'login'
                    ? 'Enter your credentials to access your functional requirements workspace.'
                    : 'Create an account to draft and sign enterprise specifications.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Segmented Mode Switcher */}
          <div className="relative grid grid-cols-2 p-1.5 bg-stone-100/80 rounded-2xl text-xs font-medium mb-6 border border-stone-200/80 shadow-inner select-none">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setSuccessMessage('');
              }}
              className={`relative z-10 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 font-medium ${
                mode === 'login' ? 'text-stone-950 font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {mode === 'login' && (
                <motion.div
                  layoutId="activeAuthToggleTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_1px_4px_-1px_rgba(0,0,0,0.06)] border border-stone-200/90"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
              <LogIn className={`w-4 h-4 relative z-10 ${mode === 'login' ? 'text-purple-600' : 'text-stone-400'}`} />
              <span className="relative z-10">Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
                setSuccessMessage('');
              }}
              className={`relative z-10 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 font-medium ${
                mode === 'register' ? 'text-stone-950 font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {mode === 'register' && (
                <motion.div
                  layoutId="activeAuthToggleTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_1px_4px_-1px_rgba(0,0,0,0.06)] border border-stone-200/90"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
              <UserPlus className={`w-4 h-4 relative z-10 ${mode === 'register' ? 'text-purple-600' : 'text-stone-400'}`} />
              <span className="relative z-10 font-semibold">Register</span>
            </button>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <AnimatePresence initial={false}>
              {mode === 'register' && (
                <motion.div
                  key="register-extra-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden space-y-3.5"
                >
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Company / Organization
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Enterprises"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Phone Number <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative flex rounded-lg shadow-xs">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-stone-300 bg-stone-100 text-stone-600 text-xs font-semibold font-mono select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.startsWith('91') && val.length > 10) {
                            val = val.slice(2);
                          }
                          setPhone(val.slice(0, 10));
                        }}
                        placeholder="9876543210"
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-r-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors font-mono tracking-wider"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-stone-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors font-mono"
                />
              </div>
            </div>

            <AnimatePresence initial={false}>
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6b47ff] shrink-0" />
                    <span>
                      Administrator accounts are provisioned exclusively by the main administrator.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 px-4 rounded-xl bg-gradient-to-r from-[#6b47ff] via-[#7c3aed] to-[#5833e6] hover:from-[#5833e6] hover:to-[#4a24db] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-[0_10px_25px_-5px_rgba(107,71,255,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(107,71,255,0.6)]"
            >
              {loading ? (
                <>
                  <div className="loader loader-xs loader-white shrink-0" />
                  <span>Please wait...</span>
                </>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-2.5"
                  >
                    {mode === 'login' ? (
                      <>
                        <LogIn className="w-[19px] h-[19px] text-white shrink-0" strokeWidth={2.2} />
                        <span>Sign in to Workspace</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-[19px] h-[19px] text-white shrink-0" strokeWidth={2.2} />
                        <span>Create Account</span>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </button>
          </form>

          {/* Bottom Switch Link */}
          <div className="mt-4 text-center text-xs text-stone-500">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mode === 'login' ? (
                  <span>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register');
                        setError('');
                        setSuccessMessage('');
                      }}
                      className="font-medium text-stone-900 underline hover:text-black cursor-pointer"
                    >
                      Register
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError('');
                        setSuccessMessage('');
                      }}
                      className="font-medium text-stone-900 underline hover:text-black cursor-pointer"
                    >
                      Sign in
                    </button>
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Static Minimal Footer */}
        <p className="text-center text-[11px] text-stone-400 pt-1">
          © {new Date().getFullYear()} Nutz Technovation Private Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-white text-[#1c1917] font-sans antialiased">
          <div className="w-full max-w-[420px] flex flex-col items-center space-y-4">
            <div className="w-full h-8" />
            <div className="w-full bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] min-h-[380px] flex items-center justify-center">
              <div className="loader loader-sm loader-black" />
            </div>
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
