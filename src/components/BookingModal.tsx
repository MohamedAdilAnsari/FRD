'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, Calendar, Clock, Video, ShieldCheck, Mail, User, Building, Send } from 'lucide-react';
import { HypecraftLogo } from './HypecraftLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPlan,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    platforms: ['Instagram', 'TikTok'],
    monthlyBudget: '$4,000 - $8,000',
    selectedPlan: initialPlan || 'Growth ($4,890/mo)',
    primaryGoal: 'Scale viral reach & customer acquisition',
    notes: '',
  });

  const availablePlatforms = ['Instagram', 'TikTok', 'YouTube Shorts', 'LinkedIn', 'Facebook', 'X'];

  const togglePlatform = (p: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(p)
        ? prev.platforms.filter((x) => x !== p)
        : [...prev.platforms, p],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#1c1917] text-white rounded-[32px] p-6 sm:p-10 shadow-2xl border border-white/10 overflow-hidden z-10 my-8"
          >
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#aa94ff]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#19b4ff]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={resetModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-[#aa94ff] mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Free 30-Min Growth Strategy Session</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
                    Let's Build an Audience That Actually Buys.
                  </h3>
                  <p className="text-sm text-stone-400 mt-2">
                    Get a custom roadmap, content hooks, and competitive breakdown tailored to your brand.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 ? (
                    <div className="space-y-5">
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                            Your Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Alex Morgan"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-500 focus:outline-none focus:border-[#aa94ff] focus:ring-1 focus:ring-[#aa94ff] text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                            Work Email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="alex@brand.com"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-500 focus:outline-none focus:border-[#aa94ff] focus:ring-1 focus:ring-[#aa94ff] text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Brand Name & Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                            Brand / Company Name *
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                            <input
                              type="text"
                              required
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder="Acme Studio"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-500 focus:outline-none focus:border-[#aa94ff] focus:ring-1 focus:ring-[#aa94ff] text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                            Monthly Marketing Budget
                          </label>
                          <select
                            value={formData.monthlyBudget}
                            onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                            className="w-full px-4 py-3 bg-stone-900 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#aa94ff] text-sm cursor-pointer"
                          >
                            <option value="$2,000 - $4,000">$2,000 - $4,000 / month</option>
                            <option value="$4,000 - $8,000">$4,000 - $8,000 / month (Recommended)</option>
                            <option value="$8,000 - $15,000">$8,000 - $15,000 / month</option>
                            <option value="$15,000+">$15,000+ / month (Enterprise)</option>
                          </select>
                        </div>
                      </div>

                      {/* Platform Selection */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                          Focus Platforms (Select all that apply)
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {availablePlatforms.map((p) => {
                            const isSelected = formData.platforms.includes(p);
                            return (
                              <button
                                type="button"
                                key={p}
                                onClick={() => togglePlatform(p)}
                                className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-center ${
                                  isSelected
                                    ? 'bg-[#aa94ff] text-[#1c1917] border-[#aa94ff] font-semibold'
                                    : 'bg-white/5 border-white/10 text-stone-300 hover:border-white/20'
                                }`}
                              >
                                {p}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!formData.name || !formData.email || !formData.company) {
                              alert('Please fill in your name, email, and brand name.');
                              return;
                            }
                            setStep(2);
                          }}
                          className="w-full py-3.5 px-6 rounded-2xl bg-[#aa94ff] hover:bg-[#b8a5ff] text-[#1c1917] font-semibold flex items-center justify-center gap-2 text-sm transition-all hover:shadow-lg hover:shadow-[#aa94ff]/25"
                        >
                          <span>Continue to Goals & Call Time</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {/* Primary Growth Goal */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                          Primary Growth Objective
                        </label>
                        <select
                          value={formData.primaryGoal}
                          onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                          className="w-full px-4 py-3 bg-stone-900 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#aa94ff] text-sm"
                        >
                          <option value="Scale viral reach & customer acquisition">Scale viral reach & customer acquisition</option>
                          <option value="Produce high-volume short-form video (TikTok/Reels)">Produce high-volume short-form video (TikTok/Reels)</option>
                          <option value="Paid ads amplification & ROAS optimization">Paid ads amplification & ROAS optimization</option>
                          <option value="Influencer and UGC creator activation">Influencer and UGC creator activation</option>
                          <option value="Full brand repositioning and social domination">Full brand repositioning and social domination</option>
                        </select>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                          Your Social Handles or Specific Goals (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="e.g. @brand on Instagram, current bottlenecks, target launches..."
                          className="w-full p-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-stone-500 focus:outline-none focus:border-[#aa94ff] focus:ring-1 focus:ring-[#aa94ff] text-sm resize-none"
                        />
                      </div>

                      {/* Benefits recap */}
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-stone-300">
                        <div className="flex items-center gap-2 text-emerald-400 font-medium">
                          <Check className="w-4 h-4" />
                          <span>No lock-in contracts — 100% Rolling monthly flexibility</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#aa94ff]" />
                          <span>Complete brand audit & 3 bespoke creative hooks included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#aa94ff]" />
                          <span>Direct session with a senior Growth Strategist</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3.5 px-6 rounded-2xl bg-[#aa94ff] hover:bg-[#b8a5ff] text-[#1c1917] font-semibold flex items-center justify-center gap-2 text-sm transition-all hover:shadow-lg hover:shadow-[#aa94ff]/25 disabled:opacity-50"
                        >
                          {loading ? (
                            <span>Reserving Your Call...</span>
                          ) : (
                            <>
                              <span>Confirm & Schedule Call</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              /* Success confirmation state */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#aa94ff]/20 text-[#aa94ff] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-display tracking-tight text-white mb-2">
                    You're On the Fast Track to Growth!
                  </h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto">
                    We've received your brand details for <span className="text-white font-semibold">{formData.company}</span>. A calendar invitation has been sent to <span className="text-[#aa94ff]">{formData.email}</span>.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2 text-stone-300">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Duration:</span>
                    <span className="font-semibold text-white">30 Minutes (Google Meet)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Host:</span>
                    <span className="font-semibold text-white">Hypecraft Lead Strategist</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">What to Bring:</span>
                    <span className="font-semibold text-white">Your recent social metrics & goals</span>
                  </div>
                </div>

                <button
                  onClick={resetModal}
                  className="py-3 px-8 rounded-2xl bg-[#aa94ff] hover:bg-[#b8a5ff] text-[#1c1917] font-semibold text-sm transition-all"
                >
                  Done & Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
