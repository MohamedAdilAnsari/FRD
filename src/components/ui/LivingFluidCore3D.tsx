'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Classical 3D Simplex Noise in GLSL (Ashima Arts / Stefan Gustavson)
const simplexNoiseGLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}
`;

export const LivingFluidCore3D: React.FC = () => {
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
    camera.position.set(0, 0.4, 7.8);
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

    // --- 2. Studio Lighting (Pure White Palette) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.8);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xaa94ff, 4.2);
    rimLight.position.set(-8, -3, -7);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    fillLight.position.set(6, -6, 5);
    scene.add(fillLight);

    // Inner Glowing Core Point Light
    const corePointLight = new THREE.PointLight(0x6366f1, 6.0, 10);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // --- 3. Master Assembly Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 4. The Centerpiece: Metamorphic Fluid Pearl/Glass Orb ---
    const sphereGeo = new THREE.SphereGeometry(1.5, 96, 96);

    const fluidMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.12,
      roughness: 0.04,
      transmission: 0.94,
      ior: 1.56,
      thickness: 2.2,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      iridescence: 0.85,
      iridescenceIOR: 1.5,
      specularColor: new THREE.Color(0xaa94ff),
    });

    // Custom Simplex Noise Shader Injection via onBeforeCompile
    const uniforms = {
      uTime: { value: 0 },
      uNoiseDensity: { value: 1.4 },
      uNoiseStrength: { value: 0.22 },
    };

    fluidMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uNoiseDensity = uniforms.uNoiseDensity;
      shader.uniforms.uNoiseStrength = uniforms.uNoiseStrength;

      shader.vertexShader = `
        uniform float uTime;
        uniform float uNoiseDensity;
        uniform float uNoiseStrength;
        ${simplexNoiseGLSL}
        ${shader.vertexShader}
      `;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float noiseVal = snoise(vec3(position * uNoiseDensity + uTime * 0.45));
        transformed += normal * noiseVal * uNoiseStrength;
        `
      );
    };

    const fluidMesh = new THREE.Mesh(sphereGeo, fluidMat);
    masterGroup.add(fluidMesh);

    // --- 5. Inner Radiant Core (Singularity Beacon) ---
    const innerGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x6366f1,
      emissiveIntensity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // Inner wireframe lattice inside the core
    const wireGeo = new THREE.WireframeGeometry(new THREE.OctahedronGeometry(0.65, 1));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    innerMesh.add(wireMesh);

    // --- 6. Ambient Constellation Dust Field ---
    const particleCount = 64;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.9 + Math.random() * 1.2;

      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xaa94ff,
      size: 0.042,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // --- 7. Realistic Ground Contact Shadow ---
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
    const shadowGeo = new THREE.PlaneGeometry(4.6, 4.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.35;
    scene.add(shadowMesh);

    // --- 8. GSAP Continuous Levitation & Respiration ---
    const levitationTween = gsap.to(masterGroup.position, {
      y: 0.24,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const shadowTween = gsap.to(shadowMesh.scale, {
      x: 0.85,
      y: 0.85,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // --- 9. Interactive Mouse Tracking & GSAP Momentum ---
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

    // Click excitation: ripples the liquid surface and pulses light
    const onClick = () => {
      gsap.to(uniforms.uNoiseStrength, {
        value: 0.45,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(corePointLight, {
        intensity: 9.5,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      gsap.to(fluidMesh.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
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

    // --- 11. 60 FPS Render Loop with GSAP ---
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Advance shader noise time uniform
      uniforms.uTime.value = time;

      // Silky rotational damping toward cursor
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;

      // Inertia decay if dragged
      if (!isDragging && Math.abs(spinVelocity) > 0.0001) {
        targetRotY += spinVelocity;
        spinVelocity *= 0.96;
      }

      // Autonomous gentle organic rotation
      fluidMesh.rotation.y += 0.003;
      innerMesh.rotation.y -= 0.006;
      particles.rotation.y -= 0.0012;

      // Subtle breath of the internal point light
      corePointLight.intensity = 5.0 + Math.sin(time * 2.8) * 1.5;

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

      {/* Pure 3D WebGL Canvas — Zero Text, Fluid Organic Luxury Sculpture */}
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
