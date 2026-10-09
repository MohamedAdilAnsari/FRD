'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const QuantumArchitectureSculpture3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- 1. Scene & Camera ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 8.2);
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
    renderer.toneMappingExposure = 1.35;

    // --- 2. Studio Lighting (Tailored for Pure White Aesthetic) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLightViolet = new THREE.DirectionalLight(0xaa94ff, 4.0);
    rimLightViolet.position.set(-8, -4, -6);
    scene.add(rimLightViolet);

    const fillLightCyan = new THREE.DirectionalLight(0x38bdf8, 3.2);
    fillLightCyan.position.set(7, -5, 6);
    scene.add(fillLightCyan);

    const coreLight = new THREE.PointLight(0x818cf8, 4.0, 10);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // --- 3. Master Assembly Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 4. Central Prismatic Faceted Crystal (The Architectural Singularity) ---
    const crystalGeo = new THREE.IcosahedronGeometry(1.2, 0); // Faceted gem cut
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.92,
      ior: 1.62,
      thickness: 2.4,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      iridescence: 0.9,
      iridescenceIOR: 1.45,
      specularColor: new THREE.Color(0xaa94ff),
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    masterGroup.add(crystalMesh);

    // Faceted Wireframe Cage for the Crystal
    const wireGeo = new THREE.WireframeGeometry(crystalGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
      linewidth: 1.5,
    });
    const crystalWire = new THREE.LineSegments(wireGeo, wireMat);
    crystalMesh.add(crystalWire);

    // Inner Glowing Core Node
    const innerCoreGeo = new THREE.OctahedronGeometry(0.48, 0);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x6366f1,
      emissiveIntensity: 1.2,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    masterGroup.add(innerCoreMesh);

    // --- 5. Precision Gyroscopic Gimbal Rings ---
    // Outer Titanium Slotted Ring
    const ring1Geo = new THREE.TorusGeometry(2.15, 0.032, 24, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.92,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    masterGroup.add(ring1);

    // Middle Anodized Champagne / Violet Ring
    const ring2Geo = new THREE.TorusGeometry(1.82, 0.026, 24, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x6b47ff,
      metalness: 0.88,
      roughness: 0.18,
      emissive: 0x6b47ff,
      emissiveIntensity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    masterGroup.add(ring2);

    // Inner Iridescent Optical Ring
    const ring3Geo = new THREE.TorusGeometry(1.5, 0.02, 24, 100);
    const ring3Mat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.6,
      roughness: 0.1,
      clearcoat: 1.0,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.25,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    masterGroup.add(ring3);

    // --- 6. Orbiting Architectural Satellite Nodes & Tension Lines ---
    const satelliteCount = 10;
    const satellitesGroup = new THREE.Group();
    masterGroup.add(satellitesGroup);

    const satelliteMeshes: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.11, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xaa94ff,
      emissiveIntensity: 0.6,
    });

    for (let i = 0; i < satelliteCount; i++) {
      const mesh = new THREE.Mesh(satGeo, satMat);
      satellitesGroup.add(mesh);
      satelliteMeshes.push(mesh);
    }

    // Dynamic Tension Rays connecting nodes to core
    const tensionLinesGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(satelliteCount * 2 * 3);
    tensionLinesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const tensionLinesMat = new THREE.LineBasicMaterial({
      color: 0xaa94ff,
      transparent: true,
      opacity: 0.35,
    });
    const tensionLines = new THREE.LineSegments(tensionLinesGeo, tensionLinesMat);
    masterGroup.add(tensionLines);

    // --- 7. Flowing Quantum Particle Stream (Double Helix / Lissajous Cloud) ---
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 4;
      const r = 2.0 + Math.sin(t * 3) * 0.4;
      particlePositions[i * 3] = Math.cos(t) * r;
      particlePositions[i * 3 + 1] = ((i - particleCount / 2) / particleCount) * 3.6;
      particlePositions[i * 3 + 2] = Math.sin(t) * r;
      particleScales[i] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // --- 8. GSAP Animations & Interactions ---
    // Smooth levitation tween
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.16,
      duration: 3.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Breathing scale expansion on the crystal
    const breathingTween = gsap.to(crystalMesh.scale, {
      x: 1.08,
      y: 1.08,
      z: 1.08,
      duration: 4.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Interaction states
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
        dragVelocityX = deltaX * 0.008;
        dragVelocityY = deltaY * 0.008;
        masterGroup.rotation.y += dragVelocityX;
        masterGroup.rotation.x += dragVelocityY;
      } else {
        mouseX = nx;
        mouseY = ny;
        targetRotY = mouseX * 0.45;
        targetRotX = -mouseY * 0.35;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Click trigger: Quantum Pulse Shockwave
    const onClick = () => {
      // Rapid ring expansion and spring rebound
      gsap.to(ring1.scale, {
        x: 1.22,
        y: 1.22,
        z: 1.22,
        duration: 0.35,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });

      gsap.to(ring2.scale, {
        x: 1.18,
        y: 1.18,
        z: 1.18,
        duration: 0.4,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });

      gsap.to(innerCoreMat, {
        emissiveIntensity: 3.5,
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

    // Responsive resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // --- 10. Viewport Visibility Throttled Animation Loop ---
    let animFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // GSAP smooth inertia damping for mouse tilt
      if (!isDragging) {
        masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
        masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;
      } else {
        dragVelocityX *= 0.92;
        dragVelocityY *= 0.92;
        masterGroup.rotation.y += dragVelocityX;
        masterGroup.rotation.x += dragVelocityY;
      }

      // Continuous Gyroscopic Ring Counter-Rotations
      ring1.rotation.z += 0.005;
      ring2.rotation.x += 0.007;
      ring2.rotation.y += 0.004;
      ring3.rotation.y -= 0.009;
      ring3.rotation.z -= 0.006;

      // Crystal multi-axis rotation
      crystalMesh.rotation.y = elapsedTime * 0.18;
      crystalMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;

      // Inner Core rotation
      innerCoreMesh.rotation.y = -elapsedTime * 0.4;
      innerCoreMesh.rotation.z = Math.cos(elapsedTime * 0.35) * 0.2;

      // Particles dynamic orbit
      particles.rotation.y = elapsedTime * 0.08;

      // Orbiting Satellites on Spherical Lissajous Curves
      const posArray = tensionLinesGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < satelliteCount; i++) {
        const mesh = satelliteMeshes[i];
        const angleOffset = (i / satelliteCount) * Math.PI * 2;
        const speed = 0.45;
        const u = elapsedTime * speed + angleOffset;

        const orbitR = 2.1 + Math.sin(u * 2 + i) * 0.25;
        const sx = Math.cos(u) * orbitR;
        const sy = Math.sin(u * 1.5) * 0.95;
        const sz = Math.sin(u) * orbitR;

        mesh.position.set(sx, sy, sz);
        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.03;

        // Update tension line positions from core to satellite
        const lineIdx = i * 6;
        posArray[lineIdx] = 0;
        posArray[lineIdx + 1] = 0;
        posArray[lineIdx + 2] = 0;

        posArray[lineIdx + 3] = sx;
        posArray[lineIdx + 4] = sy;
        posArray[lineIdx + 5] = sz;
      }
      tensionLinesGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            animate();
          }
        } else {
          isVisible = false;
          if (animFrameId) cancelAnimationFrame(animFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    animate();

    // Cleanup
    return () => {
      observer.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('click', onClick);
      window.removeEventListener('mouseup', onMouseUp);
      levitationTween.kill();
      breathingTween.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Pure 3D WebGL Canvas — Zero Text, Architectural Kinetic Masterwork */}
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
