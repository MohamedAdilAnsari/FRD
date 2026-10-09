'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const SculpturalTorusCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    camera.position.set(0, 0.4, 7.6);
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

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.6);
    fillLight.position.set(6, -6, 5);
    scene.add(fillLight);

    // Inner Glowing Core Light
    const corePointLight = new THREE.PointLight(0x6366f1, 6.0, 10);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // Secondary Accent Point Light
    const accentPointLight = new THREE.PointLight(0x38bdf8, 4.0, 8);
    accentPointLight.position.set(0, 1.2, 0);
    scene.add(accentPointLight);

    // --- 3. Master Artifact Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 4. The Centerpiece: Prismatic Optical Glass Torus Knot ---
    // Smooth, continuous mathematical topology (p=2, q=3)
    const knotGeo = new THREE.TorusKnotGeometry(1.35, 0.38, 300, 64, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.03,
      transmission: 0.96, // Optical glass transmission
      ior: 1.62, // High prismatic refraction
      thickness: 2.6,
      transparent: true,
      opacity: 0.94,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xaa94ff),
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    masterGroup.add(knotMesh);

    // --- 5. Inner Fiber-Optic Laser Spine ---
    const spineGeo = new THREE.TorusKnotGeometry(1.35, 0.11, 200, 20, 2, 3);
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x6366f1,
      emissiveIntensity: 0.85,
    });
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    knotMesh.add(spineMesh);

    // Delicate Glowing Wireframe Lattice along the Spine
    const wireGeo = new THREE.WireframeGeometry(spineGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    spineMesh.add(wireMesh);

    // --- 6. Flowing Constellation Particles around the Topology ---
    const particleCount = 72;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = (i / particleCount) * Math.PI * 2 * 3;
      const p = 2;
      const q = 3;
      const r = 1.35 + (Math.random() - 0.5) * 0.5;
      const tubeR = 0.38 + 0.15 + Math.random() * 0.25;

      const x = (r + tubeR * Math.cos(q * u)) * Math.cos(p * u);
      const y = (r + tubeR * Math.cos(q * u)) * Math.sin(p * u);
      const z = tubeR * Math.sin(q * u);

      particlePos[i * 3] = x;
      particlePos[i * 3 + 1] = y;
      particlePos[i * 3 + 2] = z;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xaa94ff,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // --- 7. Realistic Ambient Floor Contact Shadow ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const gradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 115);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.24)');
    gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.08)');
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

    // --- 8. GSAP Continuous Multi-Axis Levitation & Respiration ---
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.25,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.84,
      y: 0.84,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 9. Interactive Mouse Tracking & GSAP Momentum ---
    let targetRotY = 0.4;
    let targetRotX = 0.2;
    let spinSpeed = 0.005;
    let isDragging = false;
    let prevX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (!isDragging) {
        targetRotY = 0.4 + nx * 1.2;
        targetRotX = 0.2 + ny * 0.7;
      } else {
        const delta = e.clientX - prevX;
        spinSpeed = delta * 0.006;
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

    // Click excitation: accelerates spin and intensifies internal laser core
    const onClick = () => {
      gsap.to(knotMesh.scale, {
        x: 1.08,
        y: 1.08,
        z: 1.08,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(spineMat, {
        emissiveIntensity: 2.2,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(corePointLight, {
        intensity: 9.0,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('click', onClick);
    window.addEventListener('mouseup', onMouseUp);

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

    // --- 11. 60 FPS Render Loop with GSAP Dampening ---
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Silky smooth rotational damping
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;

      // Inertia decay if spun by drag
      if (!isDragging && Math.abs(spinSpeed) > 0.0001) {
        targetRotY += spinSpeed;
        spinSpeed *= 0.96;
      }

      // Continuous topological rotation (fluid and hypnotic)
      knotMesh.rotation.x += 0.004;
      knotMesh.rotation.y += 0.006;
      knotMesh.rotation.z += 0.002;

      // Counter-rotation of particles
      particles.rotation.y -= 0.003;
      particles.rotation.x += 0.001;

      // Respiration of the inner light
      corePointLight.intensity = 5.2 + Math.sin(time * 2.6) * 1.4;
      accentPointLight.intensity = 3.5 + Math.cos(time * 2.2) * 1.0;

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
      className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Soft Ambient Depth Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/35 via-indigo-50/25 to-violet-100/35 rounded-full blur-3xl -z-10 pointer-events-none opacity-80" />

      {/* Pure 3D WebGL Canvas — Zero Text, Only the Sculptural Object */}
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
