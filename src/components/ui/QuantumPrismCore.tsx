'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const QuantumPrismCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 1. Three.js Scene & Perspective Camera ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      34,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.4, 8.2);
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
    renderer.toneMappingExposure = 1.35;

    // --- 2. Studio Lighting (Pure White Grounding) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xaa94ff, 4.0);
    rimLight.position.set(-8, -3, -7);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    fillLight.position.set(6, -6, 5);
    scene.add(fillLight);

    // Inner Glowing Core Point Light
    const corePointLight = new THREE.PointLight(0x6366f1, 6.5, 10);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // --- 3. Master Artifact Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 4. The Centerpiece: Prismatic Optical Crystal Monolith ---
    // Scaled Octahedron forms an elongated, majestic diamond crystal
    const crystalGeo = new THREE.OctahedronGeometry(1.45, 0);
    crystalGeo.scale(1.0, 1.45, 1.0);

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.03,
      transmission: 0.96, // Brilliant optical glass transmission
      ior: 1.68, // High diamond-grade refraction index
      thickness: 2.4,
      transparent: true,
      opacity: 0.94,
      reflectivity: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xaa94ff),
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    masterGroup.add(crystalMesh);

    // Razor-Sharp Luminous Beveled Edge Lines
    const edgesGeo = new THREE.EdgesGeometry(crystalGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xaa94ff,
      transparent: true,
      opacity: 0.85,
      linewidth: 1.5,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    crystalMesh.add(edgesMesh);

    // --- 5. Inner Core: Obsidian Quantum Seed ---
    const seedGeo = new THREE.OctahedronGeometry(0.72, 0);
    seedGeo.scale(1.0, 1.4, 1.0);

    const seedMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.96,
      roughness: 0.12,
      emissive: 0x6366f1,
      emissiveIntensity: 0.7,
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    crystalMesh.add(seedMesh);

    // Glowing Cyan Inner Wireframe Lattice
    const seedWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(seedGeo),
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.95,
      })
    );
    seedMesh.add(seedWire);

    // Center Quantum Singularity Beacon
    const singularity = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    crystalMesh.add(singularity);

    // --- 6. Precision Architectural Horizon Gimbal Rings ---
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xaa94ff,
      emissiveIntensity: 0.25,
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x2e1065,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x6366f1,
      emissiveIntensity: 0.35,
    });

    // Thin, delicate coordinate rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.014, 24, 160), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.011, 24, 160), ringMat2);

    ring1.rotation.x = Math.PI / 2.8;
    ring2.rotation.y = Math.PI / 3.2;

    masterGroup.add(ring1);
    masterGroup.add(ring2);

    // Orbiting Satellites on Ring 1 & Ring 2
    const satGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const satellites: { mesh: THREE.Mesh; ring: THREE.Mesh; angle: number; speed: number; radius: number }[] = [
      { mesh: new THREE.Mesh(satGeo, satMat), ring: ring1, angle: 0, speed: 0.016, radius: 2.05 },
      { mesh: new THREE.Mesh(satGeo, satMat), ring: ring1, angle: Math.PI, speed: 0.016, radius: 2.05 },
      { mesh: new THREE.Mesh(satGeo, satMat), ring: ring2, angle: Math.PI / 2, speed: -0.012, radius: 2.35 },
    ];

    satellites.forEach((sat) => {
      masterGroup.add(sat.mesh);
    });

    // --- 7. Ambient Celestial Dust Particles ---
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + Math.random() * 1.4;

      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.2;
      particlePos[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xaa94ff,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // --- 8. Realistic Ground Contact Shadow ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const gradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 115);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.22)');
    gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.08)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(4.4, 4.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.35;
    scene.add(shadowMesh);

    // --- 9. GSAP Continuous Levitation & Respiration ---
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.24,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.86,
      y: 0.86,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 10. Interactive Mouse Tracking & GSAP Momentum ---
    let targetRotY = 0.35;
    let targetRotX = 0.15;
    let spinVelocity = 0;
    let isDragging = false;
    let prevX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (!isDragging) {
        targetRotY = 0.35 + nx * 1.1;
        targetRotX = 0.15 + ny * 0.65;
      } else {
        const delta = e.clientX - prevX;
        spinVelocity = delta * 0.007;
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

    // Click excitation: pulses the core light and scale
    const onClick = () => {
      gsap.to(crystalMesh.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(corePointLight, {
        intensity: 9.5,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('click', onClick);
    window.addEventListener('mouseup', onMouseUp);

    // --- 11. Responsive Canvas Resize ---
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // --- 12. 60 FPS Render Loop ---
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Silky smooth rotational damping
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;

      // Inertia decay if spun by drag
      if (!isDragging && Math.abs(spinVelocity) > 0.0001) {
        targetRotY += spinVelocity;
        spinVelocity *= 0.96;
      }

      // Continuous harmonic rotations
      crystalMesh.rotation.y += 0.005;
      seedMesh.rotation.y -= 0.008;

      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.005;

      particles.rotation.y -= 0.0012;

      // Update orbiting satellites along tilted ring planes
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;

        const p = new THREE.Vector3(x, 0, z);
        p.applyEuler(sat.ring.rotation);
        sat.mesh.position.copy(p);
      });

      // Subtle breath of the internal point light
      corePointLight.intensity = 5.5 + Math.sin(time * 2.8) * 1.5;

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
      className="relative w-full aspect-square max-w-lg flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Soft Ambient Depth Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-indigo-50/20 to-violet-100/30 rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />

      {/* Pure 3D WebGL Canvas — Zero Text, Only the Sculptural Object */}
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
