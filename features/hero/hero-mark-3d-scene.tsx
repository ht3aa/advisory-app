"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

/**
 * Real WebGL 3D rendition of the Advisory Office mark — an extruded hexagon
 * frame with the central "/" slash — rendered as polished metal, lit on an
 * emerald spotlight stage and slowly spinning on its Y axis with a bloom
 * "shine". Client-only; mounted via a dynamic (ssr:false) wrapper.
 */
const EMERALD = "#18c07a";
const METAL = "#eafff4";

// Mark geometry lives in the brand's 64×64 space, recentred on the origin.
const HEX_PATH_RADIUS = 28.5; // centre → vertex of the stroke path
const FRAME_HALF_WIDTH = 3; // chunkier than the 2px SVG stroke for 3D presence
const SLASH_DX = 14; // (39→25) horizontal run
const SLASH_DY = 24; // (20→44) vertical run

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 9,
  bevelEnabled: true,
  bevelThickness: 1.6,
  bevelSize: 1.2,
  bevelSegments: 5,
  curveSegments: 24,
};

function hexPoints(radius: number, reverse = false) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 3; // vertex at top, 60° steps
    pts.push(new THREE.Vector2(radius * Math.cos(a), radius * Math.sin(a)));
  }
  if (reverse) pts.reverse();
  return pts;
}

function useMarkGeometry() {
  return useMemo(() => {
    // Hexagonal frame — outer hexagon with an inner hexagonal hole.
    const shape = new THREE.Shape(hexPoints(HEX_PATH_RADIUS + FRAME_HALF_WIDTH));
    shape.holes.push(
      new THREE.Path(hexPoints(HEX_PATH_RADIUS - FRAME_HALF_WIDTH, true))
    );
    const hex = new THREE.ExtrudeGeometry(shape, EXTRUDE);
    hex.center();

    // Central slash — a stadium (rounded bar) rotated to the brand's 60° angle.
    const length = Math.hypot(SLASH_DX, SLASH_DY);
    const r = 2.8;
    const w = length / 2 - r;
    const bar = new THREE.Shape();
    bar.moveTo(-w, -r);
    bar.lineTo(w, -r);
    bar.absarc(w, 0, r, -Math.PI / 2, Math.PI / 2, false);
    bar.lineTo(-w, r);
    bar.absarc(-w, 0, r, Math.PI / 2, (3 * Math.PI) / 2, false);
    const slash = new THREE.ExtrudeGeometry(bar, EXTRUDE);
    slash.center();
    slash.rotateZ(Math.atan2(-SLASH_DY, -SLASH_DX));

    return { hex, slash };
  }, []);
}

function Mark3D() {
  const { hex, slash } = useMarkGeometry();
  const spin = useRef<THREE.Group>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const on = () => (reduced.current = mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useFrame((_, delta) => {
    if (spin.current && !reduced.current) {
      spin.current.rotation.y += delta * 0.6;
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(METAL),
        metalness: 1,
        roughness: 0.2,
        envMapIntensity: 1.1,
        emissive: new THREE.Color(EMERALD),
        emissiveIntensity: 0.07,
      }),
    []
  );

  return (
    <group rotation={[0.2, 0, 0]} scale={0.055}>
      <group ref={spin}>
        <mesh geometry={hex} material={material} castShadow />
        <mesh geometry={slash} material={material} castShadow />
      </group>
    </group>
  );
}

export default function HeroMark3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <spotLight
        position={[0, 7, 5]}
        angle={0.6}
        penumbra={1}
        intensity={110}
        decay={0}
        color="#ffffff"
      />
      <pointLight position={[-5, 1, -4]} intensity={22} decay={0} color={EMERALD} />
      <pointLight position={[5, -2, 3]} intensity={10} decay={0} color={EMERALD} />

      <Mark3D />

      <ContactShadows
        position={[0, -2.25, 0]}
        opacity={0.45}
        scale={11}
        blur={2.8}
        far={4.5}
        color="#02120b"
      />

      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.6}
          position={[0, 2.5, 3]}
          scale={[7, 3, 1]}
          color={EMERALD}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[-4, 0, 2]}
          scale={[3, 5, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="circle"
          intensity={2.2}
          position={[3, 3, -2]}
          scale={3}
          color={EMERALD}
        />
      </Environment>
    </Canvas>
  );
}
