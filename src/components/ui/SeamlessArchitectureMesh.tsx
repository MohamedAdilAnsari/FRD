'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const SeamlessArchitectureMesh: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 1. Scene & Perspective Camera ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.8, 8.2);
    camera.lookAt(0, 0, 0);

    // Renderer with ACES Filmic Tone Mapping and Antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // --- 2. Studio Lighting (Pure White Grounding) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xaa94ff, 3.8);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    fillLight.position.set(6, -6, 5);
    scene.add(fillLight);

    // Hub Core Point Light
    const hubLight = new THREE.PointLight(0x6366f1, 6.0, 10);
    hubLight.position.set(0, 0, 0);
    scene.add(hubLight);

    // --- 3. Master Cluster Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 4. Central Architecture Core (Prismatic Optical Glass Hub) ---
    const hubGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const hubMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.08,
      roughness: 0.04,
      transmission: 0.95,
      ior: 1.58,
      thickness: 1.8,
      transparent: true,
      opacity: 0.94,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    masterGroup.add(hubMesh);

    // Beveled Wireframe Edges on Core
    const hubEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(hubGeo),
      new THREE.LineBasicMaterial({
        color: 0xaa94ff,
        transparent: true,
        opacity: 0.85,
        linewidth: 1.5,
      })
    );
    hubMesh.add(hubEdges);

    // Inner Obsidian Seed
    const seedGeo = new THREE.OctahedronGeometry(0.38, 0);
    const seedMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x6366f1,
      emissiveIntensity: 0.6,
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    hubMesh.add(seedMesh);

    // --- 5. Distributed Microservice Architecture Nodes ---
    const nodeCoords = [
      new THREE.Vector3(1.9, 0.7, 0.4),
      new THREE.Vector3(-1.8, 0.9, -0.5),
      new THREE.Vector3(0.8, 1.6, -0.7),
      new THREE.Vector3(-0.7, -1.4, 0.8),
      new THREE.Vector3(1.5, -1.0, -0.7),
      new THREE.Vector3(-1.9, -0.5, -0.3),
      new THREE.Vector3(0.4, -1.7, -0.5),
      new THREE.Vector3(-0.5, 1.7, 0.6),
    ];

    const nodeColors = [
      0x3b82f6, 0x6366f1, 0x8b5cf6, 0x10b981, 
      0x38bdf8, 0xaa94ff, 0x06b6d4, 0x6366f1
    ];

    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.16, 24, 24);

    nodeCoords.forEach((coord, i) => {
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.9,
        ior: 1.5,
        transparent: true,
        opacity: 0.95,
        clearcoat: 1.0,
      });

      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(coord);
      masterGroup.add(node);
      nodeMeshes.push(node);

      // Inner glowing core sphere inside each node
      const innerCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshBasicMaterial({ color: nodeColors[i] })
      );
      node.add(innerCore);

      // Delicate equatorial ring around each node
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.24, 0.008, 16, 32),
        new THREE.MeshBasicMaterial({
          color: nodeColors[i],
          transparent: true,
          opacity: 0.7,
        })
      );
      ring.rotation.x = Math.PI / 2;
      node.add(ring);
    });

    // --- 6. Curved 3D Spline Conduits (System Highways) ---
    const curves: THREE.QuadraticBezierCurve3[] = [];

    // Connect Central Hub to all satellite nodes
    nodeCoords.forEach((coord) => {
      const midPoint = new THREE.Vector3()
        .addVectors(new THREE.Vector3(0, 0, 0), coord)
        .multiplyScalar(0.5);
      // Offset midpoint slightly for elegant curvature
      midPoint.y += 0.25;
      midPoint.z += 0.2;

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        midPoint,
        coord
      );
      curves.push(curve);

      const points = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xaa94ff,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      masterGroup.add(line);
    });

    // Cross-connect neighboring microservice nodes
    for (let i = 0; i < nodeCoords.length; i++) {
      const nextIdx = (i + 1) % nodeCoords.length;
      const p1 = nodeCoords[i];
      const p2 = nodeCoords[nextIdx];
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      midPoint.multiplyScalar(1.15); // Slight outward arc

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
      curves.push(curve);

      const points = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      masterGroup.add(line);
    }

    // --- 7. Flowing Photons / Data Packets along Architecture Conduits ---
    const photonCount = 28;
    const photonGeo = new THREE.SphereGeometry(0.038, 16, 16);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const photons: {
      mesh: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      progress: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < photonCount; i++) {
      const mesh = new THREE.Mesh(photonGeo, photonMat);
      const curve = curves[i % curves.length];
      const progress = Math.random();
      const speed = 0.004 + Math.random() * 0.005;

      masterGroup.add(mesh);
      photons.push({ mesh, curve, progress, speed });
    }

    // --- 8. Floating Ambient Particle Field ---
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * 1.5;

      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xaa94ff,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // --- Precision Outer Orbital Rings ---
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.55, 0.01, 16, 140),
      new THREE.MeshBasicMaterial({ color: 0xaa94ff, transparent: true, opacity: 0.45 })
    );
    orbitRing1.rotation.x = Math.PI / 2.6;
    masterGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.85, 0.008, 16, 140),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })
    );
    orbitRing2.rotation.y = Math.PI / 3.2;
    masterGroup.add(orbitRing2);

    // --- 9. Realistic Ground Contact Shadow ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const gradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 115);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.22)');
    gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.07)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(4.8, 4.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.4;
    scene.add(shadowMesh);

    // --- 10. GSAP Continuous Multi-Axis Levitation ---
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.22,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.86,
      y: 0.86,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 11. Interactive Mouse Tracking & GSAP Momentum ---
    let targetRotY = 0.35;
    let targetRotX = 0.15;
    let spinSpeed = 0.004;
    let isDragging = false;
    let prevX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (!isDragging) {
        targetRotY = 0.35 + nx * 1.2;
        targetRotX = 0.15 + ny * 0.7;
      } else {
        const delta = e.clientX - prevX;
        spinSpeed = delta * 0.007;
        targetRotY += spinSpeed;
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

    // Click excitation: pulses energy from hub to nodes
    const onClick = () => {
      gsap.to(hubMesh.scale, {
        x: 1.15,
        y: 1.15,
        z: 1.15,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(hubLight, {
        intensity: 9.5,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });

      // Ripple node scale
      nodeMeshes.forEach((node, idx) => {
        gsap.to(node.scale, {
          x: 1.3,
          y: 1.3,
          z: 1.3,
          delay: 0.1 + idx * 0.03,
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        });
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('click', onClick);
    window.addEventListener('mouseup', onMouseUp);

    // --- 12. Responsive Canvas Resize ---
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // --- 13. 60 FPS Render Loop ---
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Damped rotation towards cursor
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;

      // Inertia decay if dragged
      if (!isDragging && Math.abs(spinSpeed) > 0.0001) {
        targetRotY += spinSpeed;
        spinSpeed *= 0.96;
      }

      // Autonomous gentle organic rotations
      hubMesh.rotation.y += 0.004;
      hubMesh.rotation.z += 0.002;
      seedMesh.rotation.y -= 0.008;

      particles.rotation.y -= 0.0015;
      orbitRing1.rotation.z += 0.0012;
      orbitRing2.rotation.z -= 0.001;

      // Update data photon positions along 3D splines
      photons.forEach((photon) => {
        photon.progress += photon.speed;
        if (photon.progress > 1) {
          photon.progress = 0;
        }
        const pt = photon.curve.getPointAt(photon.progress);
        photon.mesh.position.copy(pt);
      });

      // Respiration of central point light
      hubLight.intensity = 5.0 + Math.sin(time * 2.8) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
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
      className="relative w-full aspect-square max-w-xl flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Soft Ambient Depth Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/35 via-indigo-50/25 to-violet-100/35 rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />

      {/* Pure 3D WebGL Canvas — Seamless, Borderless, Zero Text */}
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
