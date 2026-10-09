'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Terminal, Activity } from 'lucide-react';

export const KineticBlueprintGSAP: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<SVGCircleElement>(null);
  const radarRef = useRef<SVGLineElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const ring1Ref = useRef<SVGGElement>(null);
  const ring2Ref = useRef<SVGGElement>(null);
  const ring3Ref = useRef<SVGGElement>(null);
  const crosshairRef = useRef<SVGGElement>(null);

  const [activeNode, setActiveNode] = useState<number | null>(null);

  // 6 Core Architectural Blueprint Nodes
  const nodes = [
    { label: 'INGRESS', code: '01', x: 250, y: 70, angle: 270, color: '#3b82f6' },
    { label: 'SPEC_CORE', code: '02', x: 405, y: 160, angle: 330, color: '#aa94ff' },
    { label: 'TAXONOMY', code: '03', x: 405, y: 340, angle: 30, color: '#8b5cf6' },
    { label: 'PERSISTENCE', code: '04', x: 250, y: 430, angle: 90, color: '#10b981' },
    { label: 'SECURITY', code: '05', x: 95, y: 340, angle: 150, color: '#6366f1' },
    { label: 'SLA_GATE', code: '06', x: 95, y: 160, angle: 210, color: '#ec4899' },
  ];

  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Continuous Floating Levitation of the entire card
      gsap.to(cardRef.current, {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Continuous Ring Rotations at Decoupled Speeds
      if (ring1Ref.current) {
        gsap.to(ring1Ref.current, {
          rotation: 360,
          transformOrigin: '250px 250px',
          duration: 75,
          repeat: -1,
          ease: 'none',
        });
      }

      if (ring2Ref.current) {
        gsap.to(ring2Ref.current, {
          rotation: -360,
          transformOrigin: '250px 250px',
          duration: 45,
          repeat: -1,
          ease: 'none',
        });
      }

      if (ring3Ref.current) {
        gsap.to(ring3Ref.current, {
          rotation: 360,
          transformOrigin: '250px 250px',
          duration: 30,
          repeat: -1,
          ease: 'none',
        });
      }

      // 3. Central Reticle Rotation
      if (crosshairRef.current) {
        gsap.to(crosshairRef.current, {
          rotation: -360,
          transformOrigin: '250px 250px',
          duration: 22,
          repeat: -1,
          ease: 'none',
        });
      }

      // 4. Radar Sweep Line Rotation
      if (radarRef.current) {
        gsap.to(radarRef.current, {
          rotation: 360,
          transformOrigin: '250px 250px',
          duration: 7,
          repeat: -1,
          ease: 'none',
        });
      }

      // 5. Breathing Core Glow Pulse
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          scale: 1.12,
          transformOrigin: '250px 250px',
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 6. Traveling Circuit Data Packets
      gsap.to('.circuit-packet', {
        strokeDashoffset: -120,
        duration: 2.2,
        repeat: -1,
        ease: 'none',
        stagger: 0.35,
      });

      // 7. Node Beacon Pulsing
      gsap.to('.node-beacon', {
        r: 6,
        opacity: 0.2,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.25,
      });
    }, containerRef);

    // --- Interactive Mouse Parallax via GSAP ---
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(cardRef.current, {
        rotationY: nx * 18,
        rotationX: -ny * 18,
        transformPerspective: 1000,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      gsap.to(cardRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      setActiveNode(null);
    };

    const containerEl = containerRef.current;
    containerEl.addEventListener('mousemove', handleMouseMove);
    containerEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      containerEl.removeEventListener('mousemove', handleMouseMove);
      containerEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // --- Click to Trigger Energetic GSAP Pulse Shockwave ---
  const handleClick = (e: React.MouseEvent) => {
    if (!shockwaveRef.current) return;

    gsap.fromTo(
      shockwaveRef.current,
      {
        r: 10,
        opacity: 0.9,
        strokeWidth: 4,
      },
      {
        r: 230,
        opacity: 0,
        strokeWidth: 0.5,
        duration: 1.1,
        ease: 'power3.out',
      }
    );

    // Flash core momentarily
    if (coreRef.current) {
      gsap.fromTo(
        coreRef.current,
        { scale: 1.35 },
        { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Soft Ambient Depth Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-violet-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Interactive Blueprint Surface */}
      <div
        ref={cardRef}
        onClick={handleClick}
        className="relative w-full h-full bg-white rounded-3xl border border-stone-200/90 shadow-[0_20px_60px_-15px_rgba(28,25,23,0.07)] p-4 sm:p-6 overflow-hidden cursor-crosshair transition-shadow duration-500 hover:shadow-[0_28px_70px_-15px_rgba(28,25,23,0.12)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Hairline Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-60" />

        {/* Minimal Corner Technical Marks */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-stone-400 flex items-center gap-1.5 pointer-events-none">
          <Terminal className="w-3 h-3 text-indigo-500" />
          <span>SYS_CORE // IEEE-830</span>
        </div>
        <div className="absolute top-4 right-4 font-mono text-[9px] text-stone-400 flex items-center gap-1 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-700 font-medium">REALTIME</span>
        </div>

        {/* The Master SVG Kinetic Blueprint */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full block"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Radial Core Glow Gradient */}
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#aa94ff" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Radar Gradient */}
            <linearGradient id="radarBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="100%" stopColor="#aa94ff" stopOpacity="0.7" />
            </linearGradient>

            {/* Pulsing Light Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── 1. Coordinate Crosshairs (Subtle Hairlines) ── */}
          <line x1="250" y1="30" x2="250" y2="470" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="30" y1="250" x2="470" y2="250" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

          {/* ── 2. Click-Triggered Shockwave Ring ── */}
          <circle
            ref={shockwaveRef}
            cx="250"
            cy="250"
            r="0"
            fill="none"
            stroke="#aa94ff"
            strokeWidth="0"
            className="pointer-events-none"
          />

          {/* ── 3. Outer Astronomical Compass Ring (60s rotation) ── */}
          <g ref={ring1Ref}>
            <circle cx="250" cy="250" r="215" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="250" cy="250" r="222" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 12" />
            
            {/* Degree Tick Marks */}
            {Array.from({ length: 24 }).map((_, i) => {
              const deg = i * 15;
              const rad = (deg * Math.PI) / 180;
              const x1 = 250 + Math.cos(rad) * 210;
              const y1 = 250 + Math.sin(rad) * 210;
              const x2 = 250 + Math.cos(rad) * 218;
              const y2 = 250 + Math.sin(rad) * 218;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={i % 6 === 0 ? '#94a3b8' : '#e2e8f0'}
                  strokeWidth={i % 6 === 0 ? '1.5' : '1'}
                />
              );
            })}
          </g>

          {/* ── 4. Middle Circuit Ring with Dynamic Dashoffset (45s counter-rotation) ── */}
          <g ref={ring2Ref}>
            <circle
              cx="250"
              cy="250"
              r="165"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeDasharray="20 40 60 40"
              opacity="0.3"
            />
            <circle
              cx="250"
              cy="250"
              r="170"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            {/* Mini Orbital Markers */}
            <circle cx="415" cy="250" r="3" fill="#6366f1" />
            <circle cx="85" cy="250" r="3" fill="#aa94ff" />
          </g>

          {/* ── 5. Inner Calibration Ring (30s rotation) ── */}
          <g ref={ring3Ref}>
            <circle
              cx="250"
              cy="250"
              r="115"
              fill="none"
              stroke="#aa94ff"
              strokeWidth="1.2"
              strokeDasharray="8 6"
              opacity="0.5"
            />
            <circle cx="250" cy="135" r="2.5" fill="#3b82f6" />
            <circle cx="250" cy="365" r="2.5" fill="#10b981" />
          </g>

          {/* ── 6. Rotating Radar Sweep Ray ── */}
          <line
            ref={radarRef}
            x1="250"
            y1="250"
            x2="250"
            y2="38"
            stroke="url(#radarBeam)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="pointer-events-none"
          />

          {/* ── 7. Interconnecting Architectural Circuit Paths & Data Packets ── */}
          {nodes.map((node, i) => (
            <g key={node.label}>
              {/* Circuit Trunk Line */}
              <line
                x1="250"
                y1="250"
                x2={node.x}
                y2={node.y}
                stroke="#e2e8f0"
                strokeWidth="1.2"
              />

              {/* Traveling Light Pulse Packet along circuit */}
              <line
                x1="250"
                y1="250"
                x2={node.x}
                y2={node.y}
                stroke={node.color}
                strokeWidth="2.5"
                strokeDasharray="8 120"
                strokeDashoffset="0"
                className="circuit-packet"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            </g>
          ))}

          {/* ── 8. Six Architectural Nodes with Micro-Labels ── */}
          {nodes.map((node, idx) => {
            const isHoveredNode = activeNode === idx;
            return (
              <g
                key={node.code}
                onMouseEnter={() => setActiveNode(idx)}
                onMouseLeave={() => setActiveNode(null)}
                className="cursor-pointer transition-transform duration-200"
                transform={`translate(${node.x}, ${node.y})`}
              >
                {/* Outer Breathing Beacon */}
                <circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1.5"
                  className="node-beacon"
                />

                {/* Solid Node Core */}
                <circle
                  cx="0"
                  cy="0"
                  r={isHoveredNode ? 6 : 4.5}
                  fill={isHoveredNode ? node.color : '#ffffff'}
                  stroke={node.color}
                  strokeWidth="2"
                  filter="url(#glow)"
                />

                {/* Monospace Code Pill */}
                <rect
                  x="-16"
                  y="9"
                  width="32"
                  height="13"
                  rx="3"
                  fill="#ffffff"
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                />
                <text
                  x="0"
                  y="18.5"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontSize="7.5"
                  fontWeight="600"
                  fill={isHoveredNode ? node.color : '#64748b'}
                >
                  {node.code}
                </text>

                {/* Node Technical Label */}
                <text
                  x="0"
                  y="30"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontSize="8.5"
                  fontWeight="700"
                  fill={isHoveredNode ? node.color : '#1e293b'}
                  letterSpacing="0.5"
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* ── 9. Center Architectural Core Reticle & Singularity ── */}
          {/* Ambient Glow Disk */}
          <circle cx="250" cy="250" r="65" fill="url(#coreGlow)" />

          {/* Rotating Reticle Crosshairs */}
          <g ref={crosshairRef}>
            <circle cx="250" cy="250" r="42" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="6 8" opacity="0.6" />
            <line x1="250" y1="202" x2="250" y2="214" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="250" y1="286" x2="250" y2="298" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="202" y1="250" x2="214" y2="250" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="286" y1="250" x2="298" y2="250" stroke="#6366f1" strokeWidth="1.5" />
          </g>

          {/* Pulsing Central Hub Geometry */}
          <g ref={coreRef}>
            {/* Hexagonal Core Shield */}
            <polygon
              points="250,228 269,239 269,261 250,272 231,261 231,239"
              fill="#1e1b4b"
              stroke="#aa94ff"
              strokeWidth="1.5"
              filter="url(#glow)"
            />

            {/* Inner Glowing Singularity */}
            <circle cx="250" cy="250" r="5" fill="#ffffff" filter="url(#glow)" />
            <circle cx="250" cy="250" r="2" fill="#aa94ff" />
          </g>
        </svg>

        {/* Bottom Interactive Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-stone-400 flex items-center gap-1.5 pointer-events-none">
          <span>Interactive GSAP Matrix • Click to Pulse</span>
        </div>
      </div>
    </div>
  );
};
