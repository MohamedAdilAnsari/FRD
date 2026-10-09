'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";
    
    const variantStyles = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs active:scale-[0.98]",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-xs active:scale-[0.98]",
      outline: "border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:text-neutral-900 text-neutral-800 shadow-2xs",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200/80 active:scale-[0.98]",
      ghost: "text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900",
      link: "text-neutral-900 underline-offset-4 hover:underline",
    }[variant];

    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-[11px]",
      lg: "h-10 rounded-xl px-5 text-sm",
      icon: "h-9 w-9 p-0",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
