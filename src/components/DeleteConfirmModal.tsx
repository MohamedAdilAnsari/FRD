'use client';

import React from 'react';
import { Trash2, X, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  projectName?: string;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Specification',
  projectName,
  isDeleting = false,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) return null;

  const hasCustomName =
    projectName &&
    projectName.trim() !== '' &&
    projectName !== 'this specification' &&
    projectName !== 'this document' &&
    projectName !== 'Untitled Specification';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/45 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => {
        if (!isDeleting) onClose();
      }}
    >
      {/* Modal Card */}
      <div
        className="bg-white border border-stone-200/90 rounded-2xl p-5 max-w-[420px] w-full shadow-2xl relative animate-in zoom-in-95 duration-150 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Aligned Header: Icon + Title & Concise Message */}
        <div className="flex items-start gap-3.5 pr-6">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
            <Trash2 className="w-5 h-5" />
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              {title}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {hasCustomName ? (
                <>
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-stone-800">“{projectName}”</span>?
                  This action cannot be undone.
                </>
              ) : (
                <>
                  Are you sure you want to delete this specification? This action cannot be undone.
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
            disabled={isDeleting}
            className="px-3.5 py-1.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200/80 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer group disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-0.5 text-white" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5 mr-0.5 transition-transform group-hover:scale-110" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
