'use client';

import React from 'react';

interface GsapLoadingScreenProps {
  message?: string;
  subtitle?: string;
  fullScreen?: boolean;
  compact?: boolean;
  color?: 'black' | 'purple' | 'white';
}

export const GsapLoadingScreen: React.FC<GsapLoadingScreenProps> = ({
  fullScreen = true,
  compact = false,
  color = 'black',
}) => {
  const colorClass = color === 'purple' ? 'loader-purple' : color === 'white' ? 'loader-white' : 'loader-black';

  if (compact) {
    return (
      <div className="inline-flex items-center justify-center p-2">
        <div className={`loader loader-sm ${colorClass} shrink-0`} />
      </div>
    );
  }

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white'
    : 'min-h-[280px] w-full flex items-center justify-center bg-transparent';

  return (
    <div className={containerClasses}>
      {/* Exact user-provided loading animation bar in black, with no separate section or text */}
      <div className={`loader ${colorClass}`} />
    </div>
  );
};
