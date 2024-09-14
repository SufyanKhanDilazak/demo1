'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const galaxyVertexShader = `
// Keep shaders simple for performance
attribute float size;
attribute vec3 customColor;
varying vec3 vColor;
uniform float time;

void main() {
  vColor = customColor;
  vec3 pos = position;
  
  // Simplified calculation for performance
  float angle = atan(pos.x, pos.z) + time * 0.1;
  float radius = length(pos.xz);
  pos.x = cos(angle) * radius;
  pos.z = sin(angle) * radius;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * (300.0 / -mvPosition.z);
}
`;

const galaxyFragmentShader = `
// Simplified for performance
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float distToCenter = length(uv - 0.5);
  float strength = 1.0 - smoothstep(0.0, 0.5, distToCenter);
  gl_FragColor = vec4(vColor, strength * strength);
}
`;

const GalaxyParticles: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const parameters = useMemo(() => ({
    count: 5000,
    size: 0.45,
    radius: 15,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6a00',
    outsideColor: '#1b3984',
  }), []);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const sizes = new Float32Array(parameters.count);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone().lerp(colorOutside, radius / parameters.radius);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      sizes[i] = parameters.size;
    }

    return [positions, colors, sizes];
  }, [parameters]);

  const material = useMemo(() => (
    new THREE.ShaderMaterial({
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { time: { value: 0 } },
    })
  ), []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-customColor" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <primitive object={material} ref={materialRef} />
    </points>
  );
};

const Galaxy: React.FC = () => (
  <div style={{ width: '100%', height: '100vh' }}>
    <Canvas camera={{ position: [0, 20, 35], fov: 60 }}>
      <GalaxyParticles />
      <EffectComposer>
        <Bloom intensity={1.0} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  </div>
);

export default Galaxy;
