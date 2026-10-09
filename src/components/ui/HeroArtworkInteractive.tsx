'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function HeroArtworkInteractive() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates: -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for luxury damping
  const springConfig = { stiffness: 200, damping: 25, mass: 0.6 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3D Card Tilt transforms (subtle, elegant, maximum ~6.5 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6.5, -6.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6.5, 6.5]);

  // Parallax translation for the master artwork itself
  const imageX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  // Specular sheen light gradient translation across glass
  const sheenLeft = useTransform(springX, [-0.5, 0.5], ['-20%', '120%']);
  const sheenTop = useTransform(springY, [-0.5, 0.5], ['-20%', '120%']);

  // Dynamic parallax for floating badges (different depth planes)
  const badge1X = useTransform(springX, [-0.5, 0.5], [14, -14]);
  const badge1Y = useTransform(springY, [-0.5, 0.5], [14, -14]);

  const badge2X = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const badge2Y = useTransform(springY, [-0.5, 0.5], [-16, 16]);

  const badge3X = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const badge3Y = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative w-full max-w-lg flex flex-col items-center">
      {/* Outer Floating Levitation Wrapper (gentle organic sine-wave hover) */}
      <motion.div
        animate={{
          y: isHovered ? -4 : [0, -7, 0],
        }}
        transition={{
          y: {
            duration: 5.5,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
          },
        }}
        className="relative w-full"
        style={{ perspective: 1200 }}
      >
        {/* Soft Ambient Depth Aura (Multi-color low-opacity glow behind card) */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.85 : 0.55,
            scale: isHovered ? 1.04 : 1.0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute -inset-3 bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-violet-100/40 rounded-[2.5rem] blur-2xl -z-10 pointer-events-none"
        />

        {/* 3D Interactive Card Container with Spring Physics */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] overflow-hidden cursor-crosshair transition-shadow duration-500 hover:shadow-[0_28px_70px_-18px_rgba(15,23,42,0.14)]"
        >
          {/* Internal Artwork Image with Parallax Depth */}
          <motion.div
            style={{
              x: imageX,
              y: imageY,
              scale: isHovered ? 1.03 : 1.01,
            }}
            transition={{ scale: { duration: 0.4, ease: 'easeOut' } }}
            className="relative w-full aspect-square overflow-hidden bg-slate-50"
          >
            <Image
              src="/images/enterprise-frd-blueprint.jpg"
              alt="Enterprise Functional Requirements Document Architectural Blueprint"
              width={800}
              height={800}
              priority
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Subtle Periodic Architectural Radar / Scan Beam */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent pointer-events-none z-10"
              animate={{
                top: ['-5%', '105%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut',
              }}
            />
            {/* Luminous trail behind scan beam */}
            <motion.div
              className="absolute left-0 right-0 h-14 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none z-10"
              animate={{
                top: ['-5%', '105%'],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut',
              }}
            />

            {/* Dynamic Glass Specular Reflection Highlight (tracking cursor) */}
            <motion.div
              style={{
                left: sheenLeft,
                top: sheenTop,
                opacity: isHovered ? 0.35 : 0,
              }}
              transition={{ opacity: { duration: 0.3 } }}
              className="absolute w-72 h-72 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/90 via-white/30 to-transparent rounded-full blur-2xl pointer-events-none mix-blend-overlay z-20"
            />

            {/* Crisp Corner Hairline Accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-slate-300/80 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-slate-300/80 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-slate-300/80 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-slate-300/80 pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* ===================================================================
            Floating Layered Optical Badges (True 3D Depth Planes)
            =================================================================== */}

        {/* Badge 1: Top Right - Enterprise Spec Engine */}
        <motion.div
          style={{
            x: badge1X,
            y: badge1Y,
            translateZ: 40,
          }}
          className="absolute -top-3.5 -right-3.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_20px_rgba(15,23,42,0.06)] px-3.5 py-2 rounded-xl hidden sm:flex items-center gap-2.5 z-30 transition-transform duration-200 hover:scale-105"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
          </span>
          <div className="text-left">
            <div className="text-[11px] font-semibold text-slate-800 tracking-tight leading-none">
              Enterprise Spec Engine
            </div>
            <div className="text-[9.5px] text-slate-400 font-mono mt-0.5 leading-none">
              v4.2 • Autonomous Matrix
            </div>
          </div>
        </motion.div>

        {/* Badge 2: Bottom Left - Standards Verification */}
        <motion.div
          style={{
            x: badge2X,
            y: badge2Y,
            translateZ: 50,
          }}
          className="absolute -bottom-3.5 -left-3.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_8px_20px_rgba(15,23,42,0.06)] px-3.5 py-2.5 rounded-xl hidden sm:flex items-center gap-2.5 z-30 transition-transform duration-200 hover:scale-105"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-semibold text-slate-800 tracking-tight leading-none">
              IEEE 830 • DoD-STD Verified
            </div>
            <div className="text-[9.5px] text-emerald-600 font-mono mt-0.5 leading-none">
              Zero Ambiguity SLA
            </div>
          </div>
        </motion.div>

        {/* Badge 3: Center-Right Micro Chip - Accuracy Metric */}
        <motion.div
          style={{
            x: badge3X,
            y: badge3Y,
            translateZ: 30,
          }}
          className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-[0_6px_16px_rgba(15,23,42,0.05)] px-2.5 py-1.5 rounded-lg hidden lg:flex items-center gap-1.5 z-30"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] font-mono font-medium text-slate-700">99.8% Precision</span>
        </motion.div>
      </motion.div>

      {/* Floating Ground Ambient Shadow (dynamically breathes with levitation) */}
      <motion.div
        animate={{
          scaleX: isHovered ? 0.92 : [0.95, 0.88, 0.95],
          opacity: isHovered ? 0.22 : [0.25, 0.16, 0.25],
        }}
        transition={{
          duration: 5.5,
          repeat: isHovered ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="w-4/5 h-4 bg-slate-900/40 rounded-full blur-xl -mt-2 -z-20 pointer-events-none"
      />
    </div>
  );
}
