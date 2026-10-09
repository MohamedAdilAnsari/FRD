'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Layers, Cpu, Database, Network, ChevronRight } from 'lucide-react';

interface TierData {
  name: string;
  code: string;
  desc: string;
  icon: typeof Layers;
  color: string;
}

const TIERS: TierData[] = [
  {
    name: 'Presentation & Client Layer',
    code: 'TIER 01 / CLIENT',
    desc: 'React • Multi-tenant SDKs • WebGL',
    icon: Layers,
    color: '#3b82f6',
  },
  {
    name: 'Autonomous FRD Engine',
    code: 'TIER 02 / SPEC CORE',
    desc: 'IEEE 830 • DoD-STD • Zero-Ambiguity SLA',
    icon: Cpu,
    color: '#6366f1',
  },
  {
    name: 'Microservices & Orchestration',
    code: 'TIER 03 / SERVICES',
    desc: 'Event Bus • gRPC • Dynamic Schema Router',
    icon: Network,
    color: '#8b5cf6',
  },
  {
    name: 'Distributed Data Persistence',
    code: 'TIER 04 / DATASTORE',
    desc: 'Multi-Region Shards • ACID Compliance',
    icon: Database,
    color: '#10b981',
  },
];

export const EnterpriseArchitecture3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [isExploded, setIsExploded] = useState(false);

  // References to keep GSAP targets accessible
  const tierGroupsRef = useRef<THREE.Group[]>([]);
  const masterGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef({ x: 0.32, y: 0.55 });
  const baseRotationRef = useRef({ x: 0.32, y: 0.55 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 1. Three.js Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5.2, 4.2, 7.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- 2. Clean Studio Lighting (Pure White Palette) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(7, 12, 9);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 2.4);
    rimLight.position.set(2, -6, 5);
    scene.add(rimLight);

    // --- 3. Master Floating Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    masterGroupRef.current = masterGroup;

    // --- 4. Architectural Materials ---
    // Physical Frosted Optical Glass Slabs
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.06,
      transmission: 0.9,
      ior: 1.52,
      thickness: 1.4,
      transparent: true,
      opacity: 0.94,
      reflectivity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    const tierPlateGeo = new THREE.BoxGeometry(3.2, 0.12, 3.2);

    // 4 Architectural Tiers
    const neutralY = [1.15, 0.38, -0.38, -1.15];
    const tierGroups: THREE.Group[] = [];

    // Colors for edge highlights and tier accents
    const tierAccentColors = [0x3b82f6, 0x6366f1, 0x8b5cf6, 0x10b981];

    for (let i = 0; i < 4; i++) {
      const tierGroup = new THREE.Group();
      tierGroup.position.y = neutralY[i];

      // Glass Plate
      const plate = new THREE.Mesh(tierPlateGeo, glassMaterial);
      plate.castShadow = true;
      tierGroup.add(plate);

      // Beveled Hairline Edge Outlines
      const edgesGeo = new THREE.EdgesGeometry(tierPlateGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: tierAccentColors[i],
        transparent: true,
        opacity: 0.65,
        linewidth: 1.5,
      });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      plate.add(edges);

      // Tier-Specific Architectural Elements
      if (i === 0) {
        // --- Tier 1: Client / UI Endpoints ---
        const nodeGeo = new THREE.BoxGeometry(0.24, 0.16, 0.24);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.4,
        });

        const positions = [
          [-0.9, 0.14, -0.9],
          [0.9, 0.14, -0.9],
          [-0.9, 0.14, 0.9],
          [0.9, 0.14, 0.9],
          [0, 0.14, 0],
        ];

        positions.forEach(([x, y, z]) => {
          const node = new THREE.Mesh(nodeGeo, nodeMat);
          node.position.set(x, y, z);
          tierGroup.add(node);
        });

        // Interconnecting Thin Bus Lines
        const busLineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.9, 0.14, -0.9),
          new THREE.Vector3(0, 0.14, 0),
          new THREE.Vector3(0.9, 0.14, -0.9),
          new THREE.Vector3(0, 0.14, 0),
          new THREE.Vector3(-0.9, 0.14, 0.9),
          new THREE.Vector3(0, 0.14, 0),
          new THREE.Vector3(0.9, 0.14, 0.9),
        ]);
        const busLineMat = new THREE.LineBasicMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.6,
        });
        const busLine = new THREE.Line(busLineGeo, busLineMat);
        tierGroup.add(busLine);
      } else if (i === 1) {
        // --- Tier 2: FRD Specification Core Engine ---
        // Central Rotating Gyroscopic Spec Rings
        const coreRing1 = new THREE.Mesh(
          new THREE.TorusGeometry(0.8, 0.02, 16, 64),
          new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.7 })
        );
        coreRing1.rotation.x = Math.PI / 2;
        tierGroup.add(coreRing1);

        const coreRing2 = new THREE.Mesh(
          new THREE.TorusGeometry(0.55, 0.02, 16, 64),
          new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.8 })
        );
        coreRing2.rotation.x = Math.PI / 2;
        tierGroup.add(coreRing2);

        // Core Singularity Crystal in center
        const coreOcta = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.28, 0),
          new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x6366f1,
            emissiveIntensity: 0.8,
          })
        );
        coreOcta.position.y = 0.18;
        tierGroup.add(coreOcta);
      } else if (i === 2) {
        // --- Tier 3: Microservices Grid ---
        const serviceGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 6);
        const serviceMat = new THREE.MeshStandardMaterial({
          color: 0x1e1b4b,
          metalness: 0.85,
          roughness: 0.2,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.5,
        });

        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
          const svc = new THREE.Mesh(serviceGeo, serviceMat);
          svc.position.set(Math.cos(angle) * 0.9, 0.14, Math.sin(angle) * 0.9);
          tierGroup.add(svc);
        }
      } else if (i === 3) {
        // --- Tier 4: Enterprise Distributed Data Shards ---
        const dbGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.32, 24);
        const dbMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.9,
          roughness: 0.15,
          emissive: 0x10b981,
          emissiveIntensity: 0.4,
        });

        const dbCoords = [
          [-0.85, 0.2, -0.85],
          [0.85, 0.2, -0.85],
          [-0.85, 0.2, 0.85],
          [0.85, 0.2, 0.85],
        ];

        dbCoords.forEach(([x, y, z]) => {
          const dbMesh = new THREE.Mesh(dbGeo, dbMat);
          dbMesh.position.set(x, y, z);
          tierGroup.add(dbMesh);

          // Glowing status ring around database shard
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.26, 0.015, 16, 32),
            new THREE.MeshBasicMaterial({ color: 0x10b981 })
          );
          ring.rotation.x = Math.PI / 2;
          ring.position.set(x, y + 0.12, z);
          tierGroup.add(ring);
        });
      }

      masterGroup.add(tierGroup);
      tierGroups.push(tierGroup);
    }

    tierGroupsRef.current = tierGroups;

    // --- 5. Four Vertical Interconnect Laser Pillars ---
    const pillarGeo = new THREE.CylinderGeometry(0.025, 0.025, 3.2, 16);
    const pillarMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
    });

    const pillarCoords = [
      [-1.4, 0, -1.4],
      [1.4, 0, -1.4],
      [-1.4, 0, 1.4],
      [1.4, 0, 1.4],
    ];

    pillarCoords.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, y, z);
      masterGroup.add(pillar);
    });

    // --- 6. Traveling Data Packets (Vertical Synapse Pulses) ---
    const packetGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });

    const packets: { mesh: THREE.Mesh; pillarIdx: number; speed: number; y: number }[] = [];
    for (let p = 0; p < 8; p++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      const pillarIdx = p % 4;
      const coord = pillarCoords[pillarIdx];
      pMesh.position.set(coord[0], (Math.random() - 0.5) * 2.6, coord[2]);
      masterGroup.add(pMesh);
      packets.push({
        mesh: pMesh,
        pillarIdx,
        speed: 0.018 + Math.random() * 0.012,
        y: pMesh.position.y,
      });
    }

    // --- 7. Ground Ambient Contact Shadow ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const gradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 115);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.18)');
    gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.06)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 4.4),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
      })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.3;
    scene.add(shadowMesh);

    // --- 8. GSAP Continuous Levitation Animation ---
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.18,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.88,
      y: 0.88,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 9. Mouse Tracking & Parallax Inertia ---
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotationRef.current.y = baseRotationRef.current.y + nx * 0.7;
      targetRotationRef.current.x = baseRotationRef.current.x + ny * 0.45;
    };

    container.addEventListener('mousemove', onMouseMove);

    // --- 10. Responsive Canvas Resize ---
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // --- 11. 60 FPS Render Loop ---
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Silky smooth rotational damping
      masterGroup.rotation.y +=
        (targetRotationRef.current.y - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x +=
        (targetRotationRef.current.x - masterGroup.rotation.x) * 0.045;

      // Autonomous tier rotation
      tierGroups.forEach((tg, idx) => {
        const factor = idx % 2 === 0 ? 1 : -1;
        tg.rotation.y += 0.0015 * factor;
      });

      // Data packet vertical motion
      packets.forEach((pkt) => {
        pkt.y += pkt.speed;
        if (pkt.y > 1.5) {
          pkt.y = -1.5;
        }
        const coord = pillarCoords[pkt.pillarIdx];
        pkt.mesh.position.set(coord[0], pkt.y, coord[2]);
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      levitationTween.kill();
      shadowTween.kill();
      renderer.dispose();
    };
  }, []);

  // --- GSAP Exploded View Trigger ---
  const handleMouseEnter = () => {
    setIsExploded(true);
    const explodedY = [1.85, 0.65, -0.65, -1.85];

    tierGroupsRef.current.forEach((group, i) => {
      gsap.to(group.position, {
        y: explodedY[i],
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.to(group.scale, {
        x: 1.04,
        z: 1.04,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  };

  const handleMouseLeave = () => {
    setIsExploded(false);
    setHoveredTier(null);
    const neutralY = [1.15, 0.38, -0.38, -1.15];

    tierGroupsRef.current.forEach((group, i) => {
      gsap.to(group.position, {
        y: neutralY[i],
        duration: 0.9,
        ease: 'elastic.out(1, 0.75)',
      });
      gsap.to(group.scale, {
        x: 1.0,
        z: 1.0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none group cursor-grab active:cursor-grabbing"
    >
      {/* Soft Ambient Depth Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-indigo-50/30 to-violet-50/40 rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />

      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Interactive Status Pill (Top Center) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm px-3.5 py-1.5 rounded-full flex items-center gap-2 pointer-events-none transition-all duration-300 group-hover:shadow-md group-hover:border-indigo-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
        </span>
        <span className="text-[11px] font-semibold text-slate-800 tracking-tight">
          {isExploded ? 'Exploded Architectural View' : 'Autonomous 3D System Architecture'}
        </span>
      </div>

      {/* Floating Exploded View Tier Navigator (Appears gently on right when hovered) */}
      <div
        className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-500 ${
          isExploded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        {TIERS.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.code}
              onMouseEnter={() => setHoveredTier(idx)}
              onMouseLeave={() => setHoveredTier(null)}
              className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md p-2 rounded-xl flex items-center gap-2.5 transition-all duration-200 hover:scale-105 hover:border-indigo-400 cursor-pointer"
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: tier.color }}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="text-left pr-2">
                <div className="text-[10px] font-bold text-slate-800 leading-none">
                  {tier.code}
                </div>
                <div className="text-[9px] text-slate-500 font-mono mt-0.5 leading-none">
                  {tier.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint Badge (Bottom Center) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-400 pointer-events-none flex items-center gap-1.5 transition-opacity duration-300 group-hover:opacity-75">
        <span>Hover to explode architecture • Move cursor to inspect</span>
      </div>
    </div>
  );
};
