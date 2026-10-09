'use client';

import React from 'react';
import { LogOut, X, Loader2 } from 'lucide-react';

interface SignOutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userRole?: 'admin' | 'client';
  userName?: string;
  isSigningOut?: boolean;
}

export const SignOutConfirmModal: React.FC<SignOutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userRole = 'client',
  userName,
  isSigningOut = false,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSigningOut) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSigningOut, onClose]);

  if (!isOpen) return null;

  const isAdmin = userRole === 'admin';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/45 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => {
        if (!isSigningOut) onClose();
      }}
    >
      {/* Modal Dialog */}
      <div
        className="bg-white border border-stone-200/90 rounded-2xl p-5 max-w-[420px] w-full shadow-2xl relative animate-in zoom-in-95 duration-150 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          disabled={isSigningOut}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Aligned Header: Icon + Title & Concise Message */}
        <div className="flex items-start gap-3.5 pr-6">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
              isAdmin
                ? 'bg-purple-50 border-purple-100 text-purple-600'
                : 'bg-rose-50 border-rose-100 text-rose-600'
            }`}
          >
            <LogOut className="w-5 h-5" />
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              {isAdmin ? 'Sign Out of Admin Studio' : 'Sign Out'}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {isAdmin ? (
                <>
                  Are you sure you want to sign out of your administrator session? You will need to log in again to access the studio.
                </>
              ) : (
                <>
                  Are you sure you want to sign out? Your saved specifications and drafts remain securely saved in your account.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isSigningOut}
            className="px-3.5 py-1.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200/80 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSigningOut}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer group disabled:opacity-50"
          >
            {isSigningOut ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-0.5 text-white" />
                <span>Signing out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-3.5 h-3.5 mr-0.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
