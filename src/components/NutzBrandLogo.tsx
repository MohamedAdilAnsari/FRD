import React from 'react';
import { NutzLogo } from '@/components/NutzLogo';

interface NutzBrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const NutzBrandLogo: React.FC<NutzBrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5', star: 'w-3.5 h-3.5', gap: 'gap-2' },
    md: { text: 'text-xl sm:text-2xl', badge: 'text-[10px] px-2 py-0.5', star: 'w-4 h-4', gap: 'gap-2.5' },
    lg: { text: 'text-2xl sm:text-3xl', badge: 'text-xs px-2.5 py-1', star: 'w-5 h-5', gap: 'gap-3' },
    xl: { text: 'text-3xl sm:text-4xl', badge: 'text-xs px-3 py-1', star: 'w-6 h-6', gap: 'gap-3.5' },
  }[size];

  const textColor = {
    dark: 'text-[#1c1917]',
    light: 'text-white',
    auto: 'text-current',
  }[variant];

  return (
    <div className={`inline-flex items-center select-none font-bold tracking-tight ${sizeMap.gap} ${textColor} ${className}`}>
      {/* 4-point faceted star glyph in Hypecraft signature style */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className={`${sizeMap.star} fill-[#aa94ff] text-[#aa94ff] transition-transform duration-300 group-hover:rotate-45`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        <span className={`font-display font-black tracking-[-0.04em] ${sizeMap.text} leading-none`}>
          Nutz
        </span>
        <span className={`font-mono font-bold uppercase tracking-wider rounded-md bg-[#aa94ff] text-[#1c1917] ${sizeMap.badge}`}>
          FRDG
        </span>
      </div>
    </div>
  );
};
