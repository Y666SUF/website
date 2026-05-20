// Scene3D — written without JSX to bypass visual-edits babel plugin
// adding extraneous "line-number" props to Three.js primitives (which crashes R3F).
import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float, Icosahedron, Torus, MeshDistortMaterial } from "@react-three/drei";

const h = React.createElement;

function CosmicOrb({ position = [0, 0, 0], color = "#00F0FF", scale = 1.2, speed = 0.2 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x += delta * speed * 0.4;
    }
  });
  return h(
    Float,
    { speed: 1.2, rotationIntensity: 0.6, floatIntensity: 1.4 },
    h(
      Icosahedron,
      { ref, args: [1, 3], position, scale },
      h(MeshDistortMaterial, {
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        distort: 0.45,
        speed: 1.8,
        roughness: 0.2,
        metalness: 0.6,
      })
    )
  );
}

function WireOrb({ position, color = "#FF003C", scale = 0.9 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.25;
      ref.current.rotation.z += delta * 0.1;
    }
  });
  return h(
    Float,
    { speed: 0.9, rotationIntensity: 0.4, floatIntensity: 1.0 },
    h(
      Icosahedron,
      { ref, args: [1, 1], position, scale },
      h("meshBasicMaterial", { color, wireframe: true, transparent: true, opacity: 0.55 })
    )
  );
}

function RingSystem({ position = [0, 0, 0] }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.08;
    }
  });
  return h(
    "group",
    { ref, position, rotation: [Math.PI / 3, 0, 0] },
    h(Torus, { args: [2.4, 0.012, 16, 200] }, h("meshBasicMaterial", { color: "#00F0FF", transparent: true, opacity: 0.55 })),
    h(Torus, { args: [2.8, 0.008, 16, 200] }, h("meshBasicMaterial", { color: "#FF003C", transparent: true, opacity: 0.4 })),
    h(Torus, { args: [3.2, 0.006, 16, 200] }, h("meshBasicMaterial", { color: "#8A2BE2", transparent: true, opacity: 0.3 }))
  );
}

function Asteroids({ count = 28 }) {
  const group = useRef();
  const items = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        pos: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 12 - 4,
        ],
        scale: 0.05 + Math.random() * 0.18,
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      })),
    [count]
  );
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.02;
  });
  return h(
    "group",
    { ref: group },
    items.map((it, i) =>
      h(
        "mesh",
        { key: i, position: it.pos, rotation: it.rot, scale: it.scale },
        h("dodecahedronGeometry", { args: [1, 0] }),
        h("meshStandardMaterial", {
          color: "#5a5a7a",
          emissive: "#00F0FF",
          emissiveIntensity: 0.18,
          roughness: 0.9,
        })
      )
    )
  );
}

function SceneContents({ isHero }) {
  return h(
    Suspense,
    { fallback: null },
    h(Stars, { radius: 80, depth: 50, count: isHero ? 4500 : 2200, factor: 4, fade: true, speed: 0.6 }),
    h(Sparkles, { count: isHero ? 120 : 60, scale: [14, 8, 8], size: 2.2, speed: 0.4, color: "#00F0FF" }),
    h(Sparkles, { count: isHero ? 60 : 30, scale: [14, 8, 8], size: 1.6, speed: 0.3, color: "#FF003C" }),
    isHero && h(CosmicOrb, { position: [2.4, 0.2, -0.5], color: "#00F0FF", scale: 1.4 }),
    isHero && h(WireOrb, { position: [-3.0, -0.6, 0.5], color: "#FF003C", scale: 1.1 }),
    isHero && h(RingSystem, { position: [2.4, 0.2, -0.5] }),
    h(Asteroids, { count: isHero ? 32 : 16 })
  );
}

export default function Scene3D({ intensity = "hero" }) {
  const isHero = intensity === "hero";
  return h(
    Canvas,
    {
      dpr: [1, 1.6],
      camera: { position: [0, 0, 6], fov: 55 },
      gl: { antialias: true, alpha: true, powerPreference: "high-performance" },
      style: { position: "absolute", inset: 0 },
    },
    h("color", { attach: "background", args: ["#05050A"] }),
    h("fog", { attach: "fog", args: ["#05050A", 8, 22] }),
    h("ambientLight", { intensity: 0.25 }),
    h("pointLight", { position: [5, 5, 5], intensity: 1.4, color: "#00F0FF" }),
    h("pointLight", { position: [-6, -3, -2], intensity: 1.1, color: "#FF003C" }),
    h("pointLight", { position: [0, 4, -4], intensity: 0.6, color: "#8A2BE2" }),
    h(SceneContents, { isHero })
  );
}
