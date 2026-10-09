'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const KineticArchitecturalCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 1. Scene & Perspective Camera ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.6, 7.8);
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
    renderer.toneMappingExposure = 1.25;

    // --- 2. Studio Lighting (Clean Pure White Integration) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xaa94ff, 3.2);
    rimLight.position.set(-6, -3, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(4, -6, 4);
    scene.add(fillLight);

    // Inner Glowing Core Point Light
    const innerLight = new THREE.PointLight(0x6366f1, 4.5, 8);
    innerLight.position.set(0, 0, 0);
    scene.add(innerLight);

    // --- 3. Master Artifact Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 4. Outer Physical Crystal Polyhedron (Refractive Optical Glass) ---
    const crystalGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.08,
      roughness: 0.05,
      transmission: 0.94,
      ior: 1.54,
      thickness: 1.8,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    masterGroup.add(crystalMesh);

    // Delicate Glowing Beveled Edges
    const edgesGeo = new THREE.EdgesGeometry(crystalGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xaa94ff,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    crystalMesh.add(edgesMesh);

    // --- 5. Inner Core: Obsidian Polyhedral Seed ---
    const innerGroup = new THREE.Group();
    masterGroup.add(innerGroup);

    const seedGeo = new THREE.OctahedronGeometry(0.55, 0);
    const seedMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x6366f1,
      emissiveIntensity: 0.45,
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    innerGroup.add(seedMesh);

    const seedWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(seedGeo),
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
      })
    );
    seedMesh.add(seedWire);

    // Center Quantum Singularity (Radiant point)
    const singularity = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    innerGroup.add(singularity);

    // --- 6. Triple Gyroscopic Precision Architectural Rings ---
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xaa94ff,
      emissiveIntensity: 0.2,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.6,
    });
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.016, 16, 120), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.014, 16, 120), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.012, 16, 120), ringMat3);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.x = -Math.PI / 4;

    masterGroup.add(ring1);
    masterGroup.add(ring2);
    masterGroup.add(ring3);

    // --- 7. Orbiting Spec Nodes (Satellites traveling on rings) ---
    const satelliteGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const satelliteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const satellites: { mesh: THREE.Mesh; ring: THREE.Mesh; angle: number; speed: number; radius: number }[] = [
      { mesh: new THREE.Mesh(satelliteGeo, satelliteMat), ring: ring1, angle: 0, speed: 0.018, radius: 1.8 },
      { mesh: new THREE.Mesh(satelliteGeo, satelliteMat), ring: ring1, angle: Math.PI, speed: 0.018, radius: 1.8 },
      { mesh: new THREE.Mesh(satelliteGeo, satelliteMat), ring: ring2, angle: Math.PI / 2, speed: -0.014, radius: 2.1 },
      { mesh: new THREE.Mesh(satelliteGeo, satelliteMat), ring: ring3, angle: Math.PI / 3, speed: 0.012, radius: 2.4 },
    ];

    satellites.forEach((sat) => {
      masterGroup.add(sat.mesh);
    });

    // --- 8. Floating Ambient Particle Constellation ---
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.6 + Math.random() * 1.4;

      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xaa94ff,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // --- 9. Realistic Ambient Ground Contact Shadow ---
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
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.2;
    scene.add(shadowMesh);

    // --- 10. GSAP Continuous Levitation Animation ---
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.22,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.88,
      y: 0.88,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 11. Interactive Mouse Tracking with Inertia Damping ---
    let targetRotY = 0.35;
    let targetRotX = 0.15;
    let mouseVelocity = 0;
    let isDragging = false;
    let prevMouseX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (!isDragging) {
        targetRotY = 0.35 + nx * 0.9;
        targetRotX = 0.15 + ny * 0.55;
      } else {
        const delta = e.clientX - prevMouseX;
        targetRotY += delta * 0.01;
        prevMouseX = e.clientX;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
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

      // Silky smooth rotational damping
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;

      // Autonomous kinetic rotations at varied harmonic rates
      crystalMesh.rotation.y += 0.003;
      crystalMesh.rotation.z += 0.001;

      seedMesh.rotation.y -= 0.008;
      seedMesh.rotation.x += 0.005;

      ring1.rotation.z += 0.006;
      ring2.rotation.x -= 0.005;
      ring3.rotation.z += 0.004;

      particles.rotation.y -= 0.001;

      // Update orbiting satellites along ring planes
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;

        // Apply ring tilt transform to position
        const p = new THREE.Vector3(x, 0, z);
        p.applyEuler(sat.ring.rotation);
        sat.mesh.position.copy(p);
      });

      // Pulse inner light slightly
      innerLight.intensity = 3.5 + Math.sin(time * 2.5) * 1.0;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      levitationTween.kill();
      shadowTween.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Soft Ambient Depth Aura (Multi-hued pure white studio back-glow) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-indigo-50/25 to-violet-100/30 rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />

      {/* Pure 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
