import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // CRT barrel distortion
    vec2 c = uv - 0.5;
    float r2 = dot(c, c);
    uv = 0.5 + c * (1.0 + 0.22 * r2);

    float t = uTime;

    // row-based analog static
    float rows = 210.0;
    float row = floor(uv.y * rows);
    float rowSeed = hash(vec2(row, floor(t * 20.0)));
    float jitter = (rowSeed - 0.5) * 0.018 * uIntensity;

    // occasional violent horizontal tear
    float tear = step(0.994, hash(vec2(row, floor(t * 6.0)))) ;
    uv.x += jitter + tear * (hash(vec2(row, 1.7)) - 0.5) * 0.28;

    float n = hash(uv * vec2(680.0, rows) + t * 57.0);
    float lineLum = pow(rowSeed, 3.0);
    float lum = n * 0.20 + lineLum * n * 1.35;

    // phosphor green base with RGB split
    vec3 col = vec3(0.62, 0.20, 0.95) * lum;
    float shift = 0.004 + tear * 0.02;
    float nR = hash((uv + vec2(shift, 0.0)) * vec2(680.0, rows) + t * 57.0);
    float nB = hash((uv - vec2(shift, 0.0)) * vec2(680.0, rows) + t * 57.0);
    col.r += nR * lineLum * 0.55;
    col.b += nB * lineLum * 0.75;

    // slow roaming bright band
    float band = exp(-pow((uv.y - fract(t * 0.06)) * 26.0, 2.0));
    col += vec3(0.95, 0.30, 0.85) * band * 0.13;

    // scanlines
    col *= 0.72 + 0.28 * sin(uv.y * rows * 6.28318);

    // vignette
    float vig = smoothstep(0.85, 0.22, length(c));
    col *= vig;

    // outside curved tube -> black
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) col = vec3(0.0);

    gl_FragColor = vec4(col * uIntensity, 1.0);
  }
`

function ScreenQuad({ intensity }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uIntensity.value += (intensity - uniforms.uIntensity.value) * 0.04
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function StaticScene({ intensity = 0.75 }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      frameloop="always"
    >
      <ScreenQuad intensity={intensity} />
    </Canvas>
  )
}
