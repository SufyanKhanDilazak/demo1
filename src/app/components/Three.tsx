"use client";

import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 5000;
const PARTICLE_SIZE = 0.02;

const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const rotationSpeed = useRef({ x: 0.0005, y: 0.001 });

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      color.setHSL(Math.random(), 0.7, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  const updateParticles = useCallback(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += rotationSpeed.current.x;
      pointsRef.current.rotation.y += rotationSpeed.current.y;
    }
  }, []);

  useFrame(updateParticles);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={PARTICLE_SIZE}
        vertexColors
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface NebulaSceneProps {
  height?: string; 
}

const NebulaScene: React.FC<NebulaSceneProps> = ({ height = '100vh' }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height, zIndex: -1 }}>
      <Canvas
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, #1b2735 0%, #090a0f 100%)'
        }}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default NebulaScene;
