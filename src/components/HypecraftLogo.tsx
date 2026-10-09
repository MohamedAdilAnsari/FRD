import React from 'react';

interface HypecraftLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSparkle?: boolean;
}

export const HypecraftLogo: React.FC<HypecraftLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSparkle = true,
}) => {
  const sizeMap = {
    sm: { text: 'text-lg', star: 'w-4 h-4', gap: 'gap-2' },
    md: { text: 'text-xl sm:text-2xl', star: 'w-5 h-5', gap: 'gap-2.5' },
    lg: { text: 'text-2xl sm:text-3xl', star: 'w-6 h-6', gap: 'gap-3' },
    xl: { text: 'text-3xl sm:text-4xl', star: 'w-8 h-8', gap: 'gap-3.5' },
  }[size];

  const textColor = {
    dark: 'text-[#1c1917]',
    light: 'text-white',
    auto: 'text-current',
  }[variant];

  const starColor = {
    dark: 'fill-[#1c1917] text-[#1c1917]',
    light: 'fill-[#aa94ff] text-[#aa94ff]',
    auto: 'fill-current text-current',
  }[variant];

  return (
    <div className={`inline-flex items-center select-none font-bold tracking-tight ${sizeMap.gap} ${textColor} ${className}`}>
      {showSparkle && (
        <div className="relative shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className={`${sizeMap.star} ${starColor} transition-transform duration-300 group-hover:rotate-45`}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 4-point faceted starburst glyph */}
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      )}
      <span className={`font-display font-extrabold tracking-[-0.04em] ${sizeMap.text} leading-none`}>
        Hype<span className="text-[#aa94ff]">craft</span>
      </span>
    </div>
  );
};
