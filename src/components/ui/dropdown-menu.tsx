'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement>;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const DropdownContext = React.createContext<DropdownContextType | null>(null);

function useDropdown() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownMenu components must be used within a DropdownMenu');
  }
  return context;
}

interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({ children, open, onOpenChange }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement>(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = React.useCallback(
    (value: React.SetStateAction<boolean>) => {
      const nextOpen = typeof value === 'function' ? value(isOpen) : value;
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, isOpen, onOpenChange]
  );

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  render?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function DropdownMenuTrigger({ children, render, className, ...props }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onClick?.(e);
    setIsOpen(!isOpen);
  };

  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<any>, {
      ref: triggerRef as any,
      onClick: handleClick,
      'aria-expanded': isOpen,
      'data-state': isOpen ? 'open' : 'closed',
      className: cn(render.props.className, className),
    });
  }

  return (
    <button
      ref={triggerRef as any}
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold focus:outline-none cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  sideOffset?: number;
  usePortal?: boolean;
}

export function DropdownMenuContent({
  children,
  className,
  align = 'start',
  side = 'bottom',
  sideOffset = 6,
  usePortal = true,
  ...props
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen, triggerRef } = useDropdown();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [coords, setCoords] = React.useState<React.CSSProperties>({
    position: 'fixed',
    zIndex: 9999,
    visibility: 'hidden',
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const docWidth = document.documentElement.clientWidth;
    const docHeight = document.documentElement.clientHeight;

    const style: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
      visibility: 'visible',
    };

    if (side === 'top') {
      style.bottom = `${Math.max(8, docHeight - rect.top + sideOffset)}px`;
    } else {
      style.top = `${Math.max(8, rect.bottom + sideOffset)}px`;
    }

    if (align === 'end') {
      // Exactly align the right edge of dropdown with the right edge of the button
      style.right = `${Math.max(8, docWidth - rect.right)}px`;
      style.left = 'auto';
    } else if (align === 'center') {
      style.left = `${Math.max(8, rect.left + rect.width / 2)}px`;
      style.transform = 'translateX(-50%)';
    } else {
      style.left = `${Math.max(8, rect.left)}px`;
      style.right = 'auto';
    }

    setCoords(style);
  }, [triggerRef, side, sideOffset, align]);

  React.useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, updatePosition]);

  React.useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen, triggerRef, updatePosition]);

  if (!isOpen) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, scale: 0.96, y: side === 'top' ? 4 : -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: side === 'top' ? 4 : -4 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={usePortal ? coords : { marginTop: sideOffset }}
          className={cn(
            usePortal ? "" : "absolute z-50",
            "min-w-[9.5rem] overflow-hidden rounded-xl border border-stone-200/90 bg-white p-1 text-stone-900 shadow-xl shadow-stone-900/10",
            className
          )}
          {...(props as any)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (usePortal && mounted && typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
}

export function DropdownMenuGroup({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-0.5", className)} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2.5 py-1.5 text-[11px] font-mono font-bold tracking-wider text-stone-400 uppercase",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface DropdownSubContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const DropdownSubContext = React.createContext<DropdownSubContextType | null>(null);

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  return (
    <DropdownSubContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative" ref={triggerRef}>
        {children}
      </div>
    </DropdownSubContext.Provider>
  );
}

export function DropdownMenuSubTrigger({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownSubContext);
  return (
    <div
      onClick={() => context?.setIsOpen(!context.isOpen)}
      onMouseEnter={() => context?.setIsOpen(true)}
      className={cn(
        "relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-700 outline-none transition-colors hover:bg-stone-100 hover:text-stone-900",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">{children}</span>
      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
    </div>
  );
}

export function DropdownMenuSubContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownSubContext);
  if (!context?.isOpen) return null;
  return (
    <div
      className={cn(
        "absolute left-full top-0 ml-1 min-w-[10rem] overflow-hidden rounded-xl border border-stone-200/90 bg-white p-1 text-stone-900 shadow-xl z-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("ml-auto text-[10px] tracking-widest text-stone-400 font-mono", className)}
      {...props}
    />
  );
}

interface DropdownMenuRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

export function DropdownMenuRadioGroup({ value, onValueChange, children }: DropdownMenuRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className="space-y-0.5">{children}</div>
    </RadioGroupContext.Provider>
  );
}

interface DropdownMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function DropdownMenuRadioItem({
  value,
  children,
  className,
  disabled = false,
  ...props
}: DropdownMenuRadioItemProps) {
  const { onValueChange, value: selectedValue } = React.useContext(RadioGroupContext);
  const { setIsOpen } = useDropdown();
  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (disabled) return;
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      role="menuitemradio"
      aria-checked={isSelected}
      data-state={isSelected ? 'checked' : 'unchecked'}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium outline-none transition-colors",
        isSelected
          ? "bg-stone-900 text-white font-semibold shadow-2xs"
          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0">
        {children}
      </div>

      {isSelected && (
        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1.5" />
      )}
    </div>
  );
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export function DropdownMenuItem({ children, className, disabled = false, onClick, ...props }: DropdownMenuItemProps) {
  const { setIsOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(e);
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      role="menuitem"
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-700 outline-none transition-colors hover:bg-stone-100/90 hover:text-stone-900 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:shrink-0",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-stone-100", className)} {...props} />;
}
