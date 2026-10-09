'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const EnterpriseArchitectureEngine3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 1. Three.js Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(4.8, 3.8, 6.2);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // --- 2. Clean Studio Lighting (Pure White Grounding) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xaa94ff, 3.8);
    rimLight.position.set(-8, -2, -6);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.6);
    fillLight.position.set(6, -6, 5);
    scene.add(fillLight);

    // --- 3. Master Engine Assembly Group ---
    const engineGroup = new THREE.Group();
    scene.add(engineGroup);

    // =========================================================================
    // TIER 1: BASE DATACENTER & STORAGE CHASSIS (y = 0)
    // =========================================================================
    const chassisGeo = new THREE.BoxGeometry(3.2, 0.22, 3.2);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.y = 0;
    engineGroup.add(chassisMesh);

    // Chamfered Hairline Outline
    const chassisEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(chassisGeo),
      new THREE.LineBasicMaterial({ color: 0xaa94ff, transparent: true, opacity: 0.55 })
    );
    chassisMesh.add(chassisEdges);

    // 4 Enterprise Database Shard Cylinders on Base
    const dbGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.38, 24);
    const dbMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.92,
      roughness: 0.15,
      emissive: 0x10b981,
      emissiveIntensity: 0.35,
    });

    const dbCoords = [
      [-0.95, 0.3, -0.95],
      [0.95, 0.3, -0.95],
      [-0.95, 0.3, 0.95],
      [0.95, 0.3, 0.95],
    ];

    dbCoords.forEach(([x, y, z]) => {
      const db = new THREE.Mesh(dbGeo, dbMat);
      db.position.set(x, y, z);
      engineGroup.add(db);

      // Glowing Emerald Integrity Status Ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.31, 0.016, 16, 32),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, y + 0.12, z);
      engineGroup.add(ring);
    });

    // =========================================================================
    // 4 VERTICAL CORNER BUS PILLARS (Connecting all 3 tiers)
    // =========================================================================
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.0, 16);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.95,
      roughness: 0.12,
    });

    const pillarCoords = [
      [-1.4, 1.0, -1.4],
      [1.4, 1.0, -1.4],
      [-1.4, 1.0, 1.4],
      [1.4, 1.0, 1.4],
    ];

    pillarCoords.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, y, z);
      engineGroup.add(pillar);

      // Glowing Conduit Liner inside each pillar
      const liner = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, 0.1, z),
          new THREE.Vector3(x, 1.9, z),
        ]),
        new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.7 })
      );
      engineGroup.add(liner);
    });

    // =========================================================================
    // TIER 2: MIDDLE COMPUTE & MICROSERVICE ENGINE (y = 0.95)
    // =========================================================================
    const substrateGeo = new THREE.BoxGeometry(2.8, 0.08, 2.8);
    const substrateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.04,
      transmission: 0.92,
      ior: 1.54,
      thickness: 1.2,
      transparent: true,
      opacity: 0.94,
      clearcoat: 1.0,
    });
    const substrateMesh = new THREE.Mesh(substrateGeo, substrateMat);
    substrateMesh.position.y = 0.95;
    engineGroup.add(substrateMesh);

    const substrateEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(substrateGeo),
      new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.6 })
    );
    substrateMesh.add(substrateEdges);

    // Central Autonomous AI Core Die (The Spec Engine CPU)
    const cpuDieGeo = new THREE.BoxGeometry(0.95, 0.12, 0.95);
    const cpuDieMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.96,
      roughness: 0.1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.7,
    });
    const cpuDie = new THREE.Mesh(cpuDieGeo, cpuDieMat);
    cpuDie.position.set(0, 1.05, 0);
    engineGroup.add(cpuDie);

    // Core Die Point Light (Beats rhythmically)
    const cpuLight = new THREE.PointLight(0x6366f1, 5.5, 7);
    cpuLight.position.set(0, 1.15, 0);
    engineGroup.add(cpuLight);

    // Gold Circuit Frame on CPU
    const cpuTrim = new THREE.Mesh(
      new THREE.BoxGeometry(1.02, 0.04, 1.02),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.15 })
    );
    cpuTrim.position.set(0, 1.01, 0);
    engineGroup.add(cpuTrim);

    // 4 Modular Microservice Accelerator Blocks surrounding the CPU
    const accelGeo = new THREE.BoxGeometry(0.42, 0.1, 0.42);
    const accelMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xaa94ff,
      emissiveIntensity: 0.4,
    });

    const accelCoords = [
      [0.9, 1.04, 0],
      [-0.9, 1.04, 0],
      [0, 1.04, 0.9],
      [0, 1.04, -0.9],
    ];

    const accelMeshes: THREE.Mesh[] = [];
    accelCoords.forEach(([x, y, z]) => {
      const accel = new THREE.Mesh(accelGeo, accelMat);
      accel.position.set(x, y, z);
      engineGroup.add(accel);
      accelMeshes.push(accel);

      // Cyan LED indicator on each microservice block
      const led = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      led.position.set(x, y + 0.07, z);
      engineGroup.add(led);
    });

    // =========================================================================
    // TIER 3: TOP INGRESS & HOLOGRAPHIC GATEWAY (y = 1.8)
    // =========================================================================
    const topPlateGeo = new THREE.BoxGeometry(2.4, 0.06, 2.4);
    const topPlateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.03,
      transmission: 0.95,
      ior: 1.62,
      thickness: 1.6,
      transparent: true,
      opacity: 0.94,
      clearcoat: 1.0,
      specularColor: new THREE.Color(0xaa94ff),
    });
    const topPlate = new THREE.Mesh(topPlateGeo, topPlateMat);
    topPlate.position.y = 1.8;
    engineGroup.add(topPlate);

    const topEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(topPlateGeo),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 })
    );
    topPlate.add(topEdges);

    // Holographic Spec Singularity Beacon (Floating above top plate)
    const beaconGeo = new THREE.OctahedronGeometry(0.24, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xaa94ff,
      emissiveIntensity: 0.8,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 2.15, 0);
    engineGroup.add(beacon);

    // Orbiting Precision Antenna Needles around the Beacon
    const needleRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.008, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xaa94ff, transparent: true, opacity: 0.7 })
    );
    needleRing1.rotation.x = Math.PI / 2.5;
    needleRing1.position.set(0, 2.15, 0);
    engineGroup.add(needleRing1);

    const needleRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.006, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
    );
    needleRing2.rotation.y = Math.PI / 3;
    needleRing2.position.set(0, 2.15, 0);
    engineGroup.add(needleRing2);

    // =========================================================================
    // FLOWING PHOTONS / DATA TELEMETRY PACKETS
    // =========================================================================
    const photonCount = 16;
    const photonGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const photons: { mesh: THREE.Mesh; pillarIdx: number; y: number; speed: number }[] = [];
    for (let p = 0; p < photonCount; p++) {
      const pMesh = new THREE.Mesh(photonGeo, photonMat);
      const pillarIdx = p % 4;
      const coord = pillarCoords[pillarIdx];
      const y = 0.2 + Math.random() * 1.6;
      pMesh.position.set(coord[0], y, coord[2]);
      engineGroup.add(pMesh);
      photons.push({
        mesh: pMesh,
        pillarIdx,
        y,
        speed: 0.015 + Math.random() * 0.012,
      });
    }

    // =========================================================================
    // REALISTIC GROUND CONTACT SHADOW
    // =========================================================================
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const gradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 115);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.26)');
    gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.08)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(5.0, 5.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.5;
    scene.add(shadowMesh);

    // Center engine vertically
    engineGroup.position.y = -0.3;

    // =========================================================================
    // GSAP CONTINUOUS LEVITATION & RESPIRATION
    // =========================================================================
    const levitationTween = gsap.to(engineGroup.position, {
      y: -0.1,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.85,
      y: 0.85,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // =========================================================================
    // INTERACTIVE MOUSE TRACKING & GSAP MOMENTUM
    // =========================================================================
    let targetRotY = 0.55;
    let targetRotX = 0.32;
    let spinVelocity = 0;
    let isDragging = false;
    let prevX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (!isDragging) {
        targetRotY = 0.55 + nx * 0.9;
        targetRotX = 0.32 + ny * 0.5;
      } else {
        const delta = e.clientX - prevX;
        spinVelocity = delta * 0.006;
        targetRotY += spinVelocity;
        prevX = e.clientX;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Click excitation: pulses the CPU die light and flares beacon
    const onClick = () => {
      gsap.to(cpuDie.scale, {
        x: 1.12,
        y: 1.12,
        z: 1.12,
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(cpuLight, {
        intensity: 9.5,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(beacon.scale, {
        x: 1.4,
        y: 1.4,
        z: 1.4,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('click', onClick);
    window.addEventListener('mouseup', onMouseUp);

    // =========================================================================
    // RESPONSIVE CANVAS RESIZE
    // =========================================================================
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // =========================================================================
    // 60 FPS RENDER LOOP
    // =========================================================================
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Silky rotational damping toward cursor
      engineGroup.rotation.y += (targetRotY - engineGroup.rotation.y) * 0.045;
      engineGroup.rotation.x += (targetRotX - engineGroup.rotation.x) * 0.045;

      // Inertia decay if spun by drag
      if (!isDragging && Math.abs(spinVelocity) > 0.0001) {
        targetRotY += spinVelocity;
        spinVelocity *= 0.96;
      }

      // Autonomous gentle micro-rotations
      beacon.rotation.y += 0.015;
      beacon.rotation.x += 0.008;

      needleRing1.rotation.z += 0.008;
      needleRing2.rotation.z -= 0.006;

      // Update vertical data photon positions
      photons.forEach((photon) => {
        photon.y += photon.speed;
        if (photon.y > 1.85) {
          photon.y = 0.15;
        }
        const coord = pillarCoords[photon.pillarIdx];
        photon.mesh.position.set(coord[0], photon.y, coord[2]);
      });

      // Subtle breath of the central CPU die light
      cpuLight.intensity = 5.5 + Math.sin(time * 3.0) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('click', onClick);
      window.removeEventListener('mouseup', onMouseUp);
      levitationTween.kill();
      shadowTween.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-lg flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Soft Ambient Depth Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/35 via-indigo-50/20 to-violet-100/35 rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />

      {/* Pure 3D WebGL Canvas — Zero Text, Only the Architectural Engine */}
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
