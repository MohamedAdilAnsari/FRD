'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const ArchitecturalCore3D: React.FC = () => {
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
    camera.position.set(0, 0.8, 8.2);
    camera.lookAt(0, 0, 0);

    // Renderer with tone mapping and soft shadows
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

    // --- 2. Studio Lighting (Clean, Crisp, Pure White Integration) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    mainKeyLight.position.set(6, 10, 8);
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0xaa94ff, 2.8);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const softFillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    softFillLight.position.set(4, -6, 2);
    scene.add(softFillLight);

    const pointGlow = new THREE.PointLight(0x6b47ff, 3, 10);
    pointGlow.position.set(0, 0, 0);
    scene.add(pointGlow);

    // --- 3. Master Floating Artifact Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 4. Outer Physical Crystal Monolith (High Refraction Optical Glass) ---
    const crystalGeo = new THREE.BoxGeometry(2.4, 3.2, 2.4);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.04,
      transmission: 0.92, // Real glass transmission
      ior: 1.52,
      thickness: 1.8,
      transparent: true,
      opacity: 0.96,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    masterGroup.add(crystalMesh);

    // Elegant Beveled Edge Lines (Subtle Silver & Lavender)
    const edgesGeo = new THREE.EdgesGeometry(crystalGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xaa94ff,
      transparent: true,
      opacity: 0.6,
      linewidth: 1.5,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    crystalMesh.add(edgesMesh);

    // --- 5. Inner Core: Architectural Polyhedral Matrix ---
    const innerGroup = new THREE.Group();
    masterGroup.add(innerGroup);

    // Geometric Nested Octahedron (The Core Engine)
    const octaGeo = new THREE.OctahedronGeometry(0.9, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x6b47ff,
      emissiveIntensity: 0.35,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    innerGroup.add(octaMesh);

    // Inner Glowing Wireframe
    const octaWireMat = new THREE.LineBasicMaterial({
      color: 0xaa94ff,
      transparent: true,
      opacity: 0.8,
    });
    const octaWire = new THREE.LineSegments(new THREE.WireframeGeometry(octaGeo), octaWireMat);
    octaMesh.add(octaWire);

    // Dynamic Singularity Node in the exact center
    const singularityGeo = new THREE.SphereGeometry(0.2, 24, 24);
    const singularityMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const singularity = new THREE.Mesh(singularityGeo, singularityMat);
    octaMesh.add(singularity);

    // --- 6. Precision Architectural Orbital Rings ---
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x1c1917, transparent: true, opacity: 0.45 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xaa94ff, transparent: true, opacity: 0.65 });
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.015, 16, 100), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.015, 16, 100), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.015, 16, 100), ringMat3);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.x = -Math.PI / 4;

    innerGroup.add(ring1);
    innerGroup.add(ring2);
    innerGroup.add(ring3);

    // --- 7. Floating Spec Node Constellation ---
    const nodeCount = 14;
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xaa94ff,
      emissive: 0x6b47ff,
      emissiveIntensity: 0.8,
    });

    const nodes: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; y: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.35 + (i % 3) * 0.25;
      const y = ((i % 5) - 2) * 0.45;
      innerGroup.add(mesh);
      nodes.push({ mesh, angle, radius, speed: (i % 2 === 0 ? 1 : -1) * (0.008 + i * 0.001), y });
    }

    // --- 8. Soft Ground Ambient Drop Shadow (Canvas Generated) ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const gradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 110);
    gradient.addColorStop(0, 'rgba(28, 25, 23, 0.18)');
    gradient.addColorStop(0.5, 'rgba(28, 25, 23, 0.06)');
    gradient.addColorStop(1, 'rgba(28, 25, 23, 0)');
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.6;
    scene.add(shadowMesh);

    // --- 9. GSAP Smooth Levitation & Breathing Timelines ---
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.22,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.88,
      y: 0.88,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 10. Mouse Interaction with Silky Spring Damping ---
    let targetRotY = 0.4;
    let targetRotX = 0.2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotY = 0.4 + nx * 0.6;
      targetRotX = 0.2 + ny * 0.4;
    };

    container.addEventListener('mousemove', onMouseMove);

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

      // Silky damped rotation toward cursor
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      // Inner architectural core autonomous motion
      octaMesh.rotation.y -= 0.008;
      octaMesh.rotation.z += 0.004;

      ring1.rotation.z += 0.007;
      ring2.rotation.z -= 0.005;
      ring3.rotation.z += 0.004;

      // Orbiting spec node calculation
      nodes.forEach((n, idx) => {
        n.angle += n.speed;
        n.mesh.position.x = Math.cos(n.angle) * n.radius;
        n.mesh.position.z = Math.sin(n.angle) * n.radius;
        n.mesh.position.y = n.y + Math.sin(time * 2 + idx) * 0.08;
      });

      // Subtle singularity light breathing
      pointGlow.intensity = 2.5 + Math.sin(time * 3) * 0.8;

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

      crystalGeo.dispose();
      crystalMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      octaWireMat.dispose();
      singularityGeo.dispose();
      singularityMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center select-none"
    >
      {/* 3D WebGL Canvas — Completely Clean, Frameless, & Centered */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
