"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { cn } from "@/lib/cn";

export interface DarkVeilProps extends React.ComponentProps<"div"> {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  resolutionScale?: number;
}

const vertex = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// CPPN (Compositional Pattern Producing Network) fragment shader.
// Neural network weights (matrices) are fixed — do not alter.
const fragment = `precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform float uHueShift;
uniform float uNoiseIntensity;
uniform float uScanlineIntensity;
uniform float uScanlineFrequency;
uniform float uWarpAmount;

varying vec2 vUv;

// Neural network weight matrices — do not modify
const mat4 W1 = mat4(
   0.8, -0.5,  0.3,  0.7,
  -0.4,  0.9,  0.6, -0.2,
   0.5, -0.7,  0.8,  0.1,
  -0.3,  0.4, -0.6,  0.9
);
const mat4 W2 = mat4(
   0.6,  0.3, -0.8,  0.4,
  -0.7,  0.5,  0.2, -0.9,
   0.4, -0.6,  0.7,  0.3,
  -0.2,  0.8, -0.4,  0.6
);
const mat4 W3 = mat4(
   0.5, -0.4,  0.9, -0.3,
   0.7,  0.2, -0.6,  0.8,
  -0.8,  0.6,  0.3, -0.5,
   0.2, -0.9,  0.4,  0.7
);
const vec4 b1 = vec4(0.1, -0.2, 0.3, -0.1);
const vec4 b2 = vec4(-0.3, 0.4, -0.1, 0.2);
const vec4 b3 = vec4(0.2, -0.1, 0.4, -0.3);

vec4 cppnActivate(vec4 x) {
  return tanh(x);
}

vec3 cppnForward(vec2 p, float t) {
  vec4 x = vec4(p.x, p.y, sin(t * 0.5), cos(t * 0.3));
  x = cppnActivate(W1 * x + b1);
  x = cppnActivate(W2 * x + b2);
  x = cppnActivate(W3 * x + b3);
  return x.rgb * 0.5 + 0.5;
}

vec3 hueShiftColor(vec3 color, float shift) {
  float angle = radians(shift);
  float s = sin(angle);
  float c = cos(angle);
  vec3 k = vec3(0.57735);
  return color * c + cross(k, color) * s + k * dot(k, color) * (1.0 - c);
}

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;

  // Domain warp
  if (uWarpAmount > 0.0) {
    float wx = sin(uv.y * 6.2831 + uTime * 0.4) * uWarpAmount * 0.05;
    float wy = cos(uv.x * 6.2831 + uTime * 0.3) * uWarpAmount * 0.05;
    uv += vec2(wx, wy);
  }

  // Normalize coords to [-1,1] with aspect correction for CPPN
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;

  vec3 color = cppnForward(p, uTime);

  // Hue shift
  if (uHueShift != 0.0) {
    color = hueShiftColor(color, uHueShift);
  }

  // Scanlines
  if (uScanlineIntensity > 0.0) {
    float scanline = sin(uv.y * uScanlineFrequency * 3.14159) * 0.5 + 0.5;
    color = mix(color, color * scanline, uScanlineIntensity);
  }

  // Noise
  if (uNoiseIntensity > 0.0) {
    float n = rand(uv + fract(uTime * 0.1));
    color += (n - 0.5) * uNoiseIntensity;
  }

  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}`;

function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0,
  warpAmount = 0,
  resolutionScale = 1,
  className,
  ...props
}: DarkVeilProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const renderer = new Renderer({
      dpr:
        Math.min(window.devicePixelRatio, 2) * Math.max(resolutionScale, 0.25),
      alpha: false,
      antialias: false,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([1, 1]) },
        uHueShift: { value: hueShift },
        uNoiseIntensity: { value: noiseIntensity },
        uScanlineIntensity: { value: scanlineIntensity },
        uScanlineFrequency: { value: scanlineFrequency },
        uWarpAmount: { value: warpAmount },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      const res = (program.uniforms.uResolution as { value: Float32Array })
        .value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const t0 = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      (program.uniforms.uTime as { value: number }).value =
        (t - t0) * 0.001 * speed;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      try {
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
        container.removeChild(canvas);
      } catch {
        // ignore cleanup errors
      }
    };
  }, [
    hueShift,
    noiseIntensity,
    scanlineIntensity,
    speed,
    scanlineFrequency,
    warpAmount,
    resolutionScale,
  ]);

  return (
    <div
      ref={containerRef}
      data-slot="dark-veil"
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    />
  );
}

export { DarkVeil };
