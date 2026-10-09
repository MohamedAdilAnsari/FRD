'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Trash2, 
  Mail, 
  Phone, 
  Building, 
  Search, 
  Loader2, 
  Lock,
  UserCheck,
  ShieldAlert,
  KeyRound,
  ChevronDown,
  X,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Filter
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
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { GsapLoadingScreen } from '@/components/GsapLoadingScreen';

export default function AdminAccountsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [internalUsers, setInternalUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'client'>('all');

  // Create User Modal
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    companyName: '',
    phone: '',
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [userModalError, setUserModalError] = useState('');

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Instant session hydration from storage for zero-delay screen paint
    try {
      const cached = sessionStorage.getItem('frdg_user');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.role === 'admin') {
          setCurrentUser(parsed);
        }
      }
    } catch (e) {}

    const init = async () => {
      try {
        // Parallelized network calls to eliminate roundtrip latency
        const [authRes, usersRes] = await Promise.all([
          fetch('/api/auth/me', { cache: 'no-store' }),
          fetch('/api/admin/users', { cache: 'no-store' }),
        ]);

        const authData = await authRes.json();
        if (!authRes.ok || !authData.user || authData.user.role !== 'admin') {
          router.push('/login?redirect=/admin/accounts');
          return;
        }
        setCurrentUser(authData.user);
        try {
          sessionStorage.setItem('frdg_user', JSON.stringify(authData.user));
        } catch (e) {}

        const usersData = await usersRes.json();
        if (usersData.success) {
          setInternalUsers(usersData.users || []);
        }
      } catch (err) {
        console.error('Error loading accounts:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserModalError('');
    if (newUserData.phone.trim()) {
      const clean = newUserData.phone.replace(/\D/g, '');
      if (clean.length !== 10) {
        setUserModalError('Phone number must be exactly 10 digits.');
        return;
      }
      if (!/^[6-9]\d{9}$/.test(clean)) {
        setUserModalError('Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).');
        return;
      }
    }
    setIsCreatingUser(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newUserData,
          phone: newUserData.phone.replace(/\D/g, '').slice(0, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create user');
      }

      setInternalUsers([data.user, ...internalUsers]);
      setIsNewUserModalOpen(false);
      setNewUserData({
        name: '',
        email: '',
        password: '',
        role: 'client',
        companyName: '',
        phone: '',
      });
    } catch (err: any) {
      setUserModalError(err.message);
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users?id=${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInternalUsers(internalUsers.filter(u => u.id !== deleteTarget.id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filteredUsers = internalUsers.filter(u => {
    const matchesSearch = 
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.companyName || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (roleFilter === 'all') return matchesSearch;
    return matchesSearch && u.role === roleFilter;
  });

  const adminCount = internalUsers.filter(u => u.role === 'admin').length;
  const clientCount = internalUsers.filter(u => u.role === 'client').length;

  if (loading) {
    return <GsapLoadingScreen message="Loading Accounts Directory..." subtitle="Compiling verified client & admin credentials..." />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pt-20 sm:pt-28 pb-24 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        
        {/* ================= HERO HEADER BANNER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-purple-900/40">
          {/* Ambient Glow Orbs */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -top-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all shrink-0 flex items-center gap-1.5 text-xs font-semibold backdrop-blur-md group"
                  title="Back to Admin Dashboard"
                >
                  <ArrowLeft className="w-4 h-4 text-purple-300 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden sm:inline">Back</span>
                </Link>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Enterprise Access Directory
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
                Internal Accounts & Access Directory
              </h1>
              <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
                Manage verified administrator credentials, client access roles, and system security privileges.
              </p>
            </div>

            <button
              onClick={() => setIsNewUserModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 active:scale-[0.98] text-white text-xs font-bold shadow-lg shadow-purple-500/30 transition-all cursor-pointer shrink-0 border border-purple-400/30"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create User Account</span>
            </button>
          </div>
        </div>

        {/* ================= COMPACT METRICS RECTANGLES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Total Users */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">TOTAL ACCOUNTS</span>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">{internalUsers.length}</div>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                Verified Users
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-2">Active system accounts</div>
          </div>

          {/* Administrators */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">ADMINISTRATORS</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">{adminCount}</div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Full Privileges
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-2">System admins with full access</div>
          </div>

          {/* Clients */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">CLIENT ACCOUNTS</span>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-neutral-900 tracking-tight font-display">{clientCount}</div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Client Access
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-2">External client portal users</div>
          </div>

          {/* Auth Engine */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-neutral-400">AUTH ENGINE</span>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                <KeyRound className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-xs font-bold text-neutral-900 font-mono tracking-wider">PBKDF2 SHA-512</div>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                256-Bit Encrypted
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-2">Enterprise password hashing</div>
          </div>
        </div>

        {/* ================= SEARCH & ROLE FILTER TOOLBAR ================= */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by user name, email address, or company..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none bg-neutral-50/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-mono text-neutral-400 font-semibold uppercase shrink-0 mr-1">Filter Role:</span>
            <div className="inline-flex rounded-xl border border-neutral-200 p-1 bg-neutral-100/80 shadow-2xs">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  roleFilter === 'all'
                    ? 'bg-white text-neutral-900 font-bold shadow-xs border border-neutral-200/90'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All ({internalUsers.length})
              </button>
              <button
                onClick={() => setRoleFilter('admin')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  roleFilter === 'admin'
                    ? 'bg-white text-purple-700 font-bold shadow-xs border border-neutral-200/90'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Admins ({adminCount})
              </button>
              <button
                onClick={() => setRoleFilter('client')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  roleFilter === 'client'
                    ? 'bg-white text-emerald-700 font-bold shadow-xs border border-neutral-200/90'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Clients ({clientCount})
              </button>
            </div>
          </div>
        </div>

        {/* ================= USERS DATA TABLE CARD ================= */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-md overflow-hidden">
          <div className="p-4 px-6 bg-neutral-50/80 border-b border-neutral-200/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <h2 className="text-sm font-bold text-neutral-900 font-display">User Accounts Registry</h2>
            </div>
            <span className="text-xs text-neutral-500 font-mono">Showing {filteredUsers.length} accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/40 text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="px-6 py-4">User Identity</th>
                  <th className="px-6 py-4">Access Role</th>
                  <th className="px-6 py-4">Company & Organization</th>
                  <th className="px-6 py-4">Contact Phone</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-400">
                      No user accounts found matching your search query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-purple-50/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="min-w-0">
                          <div className="font-bold text-neutral-900 group-hover:text-purple-700 transition-colors truncate">{user.name}</div>
                          <div className="text-[11px] text-neutral-500 truncate flex items-center gap-1.5 font-mono mt-0.5">
                            <Mail className="w-3 h-3 text-neutral-400" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {user.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Administrator</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Client Account</span>
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-neutral-700 font-semibold">
                        {user.companyName ? (
                          <div className="flex items-center gap-2">
                            <Building className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span className="truncate">{user.companyName}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-400 font-mono text-[11px]">N/A</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-neutral-600 font-mono text-[11px]">
                        {user.phone ? (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-neutral-400" />
                            <span>+91 {user.phone}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-400">N/A</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-neutral-500 font-mono text-[11px]">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : 'Direct'}
                      </td>

                      <td className="px-6 py-4 text-right">
                        {user.id !== currentUser?.id && (
                          <button
                            onClick={() => setDeleteTarget({ id: user.id, name: user.name })}
                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                            title="Delete user account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Create User Modal */}
      {isNewUserModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-display">Create User Account</h3>
                  <p className="text-xs text-neutral-500">Add a new admin or client to the portal.</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewUserModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {userModalError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {userModalError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  placeholder="e.g. Anand Kumar"
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-neutral-300 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Work Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  placeholder="e.g. anand@nutz.in"
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-neutral-300 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Account Password *</label>
                <input
                  type="password"
                  required
                  value={newUserData.password}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-neutral-300 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">System Role</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" className="w-full justify-between px-3 text-xs font-medium h-10 border-neutral-300 rounded-xl">
                          <div className="flex items-center gap-2">
                            {newUserData.role === 'admin' ? (
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Building className="w-4 h-4 text-purple-600" />
                            )}
                            <span>{newUserData.role === 'admin' ? 'Administrator' : 'Client Account'}</span>
                          </div>
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="min-w-56" align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Select System Role</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                          value={newUserData.role}
                          onValueChange={(val) => setNewUserData({ ...newUserData, role: val })}
                        >
                          <DropdownMenuRadioItem value="client">
                            <Building className="w-4 h-4 text-blue-500" />
                            Client Account
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="admin">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            Administrator
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Phone
                  </label>
                  <div className="relative flex rounded-xl border border-neutral-300 overflow-hidden focus-within:border-purple-600 shadow-2xs">
                    <span className="inline-flex items-center px-2.5 bg-neutral-100 text-neutral-600 text-xs font-mono font-semibold select-none border-r border-neutral-300">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      inputMode="numeric"
                      value={newUserData.phone ? newUserData.phone.replace(/\D/g, '').slice(-10) : ''}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.startsWith('91') && val.length > 10) val = val.slice(2);
                        setNewUserData({ ...newUserData, phone: val.slice(0, 10) });
                      }}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 text-xs border-0 focus:outline-none font-mono tracking-wider"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Company / Organization</label>
                <input
                  type="text"
                  value={newUserData.companyName}
                  onChange={(e) => setNewUserData({ ...newUserData, companyName: e.target.value })}
                  placeholder="e.g. Nutz Technovation"
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-neutral-300 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsNewUserModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingUser}
                  className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isCreatingUser ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          isOpen={true}
          title="Delete User Account"
          projectName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteUser}
          isDeleting={isDeleting}
        />
      )}

    </div>
  );
}
