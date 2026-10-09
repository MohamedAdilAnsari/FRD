'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ArchitectureCanvasProps {
  className?: string;
}

export const ArchitectureCanvas: React.FC<ArchitectureCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Architectural Nodes
    const nodeCount = 38; // Representing 38 enterprise domains
    const nodeGeometry = new THREE.SphereGeometry(0.75, 16, 16);
    
    const palette = [0xaa94ff, 0x19b4ff, 0xffa952, 0x9ef483];
    const materials = palette.map(color => new THREE.MeshBasicMaterial({ color }));

    const nodes: { mesh: THREE.Mesh; velocity: THREE.Vector3; basePos: THREE.Vector3 }[] = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    for (let i = 0; i < nodeCount; i++) {
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(nodeGeometry, mat);
      
      const x = (Math.random() - 0.5) * 110;
      const y = (Math.random() - 0.5) * 55;
      const z = (Math.random() - 0.5) * 40;
      mesh.position.set(x, y, z);

      nodes.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.02
        ),
      });

      nodeGroup.add(mesh);
    }

    // 3. Dynamic Connection Lines
    const maxDistance = 24;
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodeGroup.add(linesMesh);

    // 4. Mouse Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.15;
      targetRotationX = -y * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera / group rotation
      nodeGroup.rotation.y += (targetRotationY - nodeGroup.rotation.y) * 0.05;
      nodeGroup.rotation.x += (targetRotationX - nodeGroup.rotation.x) * 0.05;

      // Subtle ambient continuous drift
      nodeGroup.rotation.y += 0.0008;

      // Update nodes positions with soft boundary bounce
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.mesh.position.add(node.velocity);

        if (Math.abs(node.mesh.position.x - node.basePos.x) > 6) node.velocity.x *= -1;
        if (Math.abs(node.mesh.position.y - node.basePos.y) > 5) node.velocity.y *= -1;
        if (Math.abs(node.mesh.position.z - node.basePos.z) > 4) node.velocity.z *= -1;
      }

      // Recompute connections
      let connectionIndex = 0;
      const positions = lineGeometry.attributes.position.array as Float32Array;
      const colors = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
          if (dist < maxDistance && connectionIndex < maxConnections) {
            const p1 = nodes[i].mesh.position;
            const p2 = nodes[j].mesh.position;

            const idx = connectionIndex * 6;
            positions[idx] = p1.x;
            positions[idx + 1] = p1.y;
            positions[idx + 2] = p1.z;
            positions[idx + 3] = p2.x;
            positions[idx + 4] = p2.y;
            positions[idx + 5] = p2.z;

            // Gradient line color between purple and cyan
            const alpha = 1 - dist / maxDistance;
            colors[idx] = 0.67 * alpha;
            colors[idx + 1] = 0.58 * alpha;
            colors[idx + 2] = 1.0 * alpha;
            colors[idx + 3] = 0.1 * alpha;
            colors[idx + 4] = 0.7 * alpha;
            colors[idx + 5] = 1.0 * alpha;

            connectionIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, connectionIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nodeGeometry.dispose();
      materials.forEach(m => m.dispose());
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
