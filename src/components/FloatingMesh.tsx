import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const meshVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  // Simplex noise for displacement
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    float noise = snoise(position * 1.5 + uTime * 0.3);
    float displacement = noise * (0.15 + uHover * 0.1);
    vDisplacement = displacement;

    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const meshFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uHover;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Fresnel-based iridescence
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

    // Iridescent color shift
    float t = uTime * 0.2;
    vec3 col1 = vec3(0.4, 0.4, 1.0);   // indigo
    vec3 col2 = vec3(0.7, 0.3, 0.9);   // purple
    vec3 col3 = vec3(0.95, 0.3, 0.6);  // pink
    vec3 col4 = vec3(0.3, 0.8, 0.9);   // cyan

    float shift = vDisplacement * 3.0 + t;
    vec3 iriColor = mix(col1, col2, sin(shift) * 0.5 + 0.5);
    iriColor = mix(iriColor, col3, sin(shift * 1.3 + 1.0) * 0.5 + 0.5);
    iriColor = mix(iriColor, col4, sin(shift * 0.7 + 2.0) * 0.3 + 0.3);

    // Combine fresnel edge glow with interior
    vec3 interior = iriColor * 0.15;
    vec3 edge = iriColor * fresnel;

    vec3 color = interior + edge;

    // Subtle wireframe-like highlights on edges
    float edgeHighlight = pow(fresnel, 4.0) * (0.6 + uHover * 0.4);
    color += vec3(0.6, 0.5, 1.0) * edgeHighlight;

    float alpha = 0.25 + fresnel * 0.6 + uHover * 0.1;

    gl_FragColor = vec4(color, alpha);
  }
`;

function IridescenMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const hoverRef = useRef(0);
  const targetHover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.uTime.value = clock.getElapsedTime();

    // Smooth hover transition
    hoverRef.current += (targetHover.current - hoverRef.current) * 0.05;
    mat.uniforms.uHover.value = hoverRef.current;

    // Slow rotation + subtle mouse tilt
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.15 + pointer.x * 0.3;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2 + pointer.y * 0.2;
    meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.08) * 0.1;

    // Gentle float
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => { targetHover.current = 1; }}
      onPointerLeave={() => { targetHover.current = 0; }}
    >
      <icosahedronGeometry args={[1.6, 16]} />
      <shaderMaterial
        vertexShader={meshVertexShader}
        fragmentShader={meshFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Orbiting particles
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#7c7cf0"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function FloatingMesh() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        }}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'auto' }}
      >
        <IridescenMesh />
        <Particles />
      </Canvas>
    </div>
  );
}
