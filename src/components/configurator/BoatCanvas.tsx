"use client";

import { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

interface BoatCanvasProps {
  color: string;
  activeAccessoryIds: Set<string>;
}

const HULL_STRIPE_MATERIALS = new Set([
  "21_-_Default",
  "wwewe",
  "21_-_DefaultWWWE",
  "08_-_DefaultSSD",
]);

const ACCESSORY_MODELS: Record<
  string,
  { path: string; position: [number, number, number]; scale: number; rotation: [number, number, number] }
> = {
  "acc-vhf": {
    path: "/models/vhf.glb",
    position: [0.6, -0.15, -0.15],
    scale: 0.004,
    rotation: [0, Math.PI * 0.7, 0],
  },
};

function AccessoryModel({
  path, position, scale, rotation,
}: {
  path: string;
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  boatScale: number;
  boatOffset: THREE.Vector3;
}) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);
    return clone;
  }, [scene]);

  return <primitive object={cloned} position={position} scale={scale} rotation={rotation} />;
}

function BoatModel({ color, activeAccessoryIds }: { color: string; activeAccessoryIds: Set<string> }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/bowrider.glb");

  const { clonedScene, scale, offset } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 5 / maxDim;
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
            mat.needsUpdate = true;
          }
        });
      }
    });
    return { clonedScene: clone, scale: targetScale, offset: center.multiplyScalar(-targetScale) };
  }, [scene]);

  useEffect(() => {
    if (!clonedScene) return;
    const targetColor = new THREE.Color(color);
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((mat) => {
        if (HULL_STRIPE_MATERIALS.has(mat.name)) {
          mat.color = targetColor.clone();
          mat.needsUpdate = true;
        }
      });
    });
  }, [clonedScene, color]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = offset.y + Math.sin(Date.now() * 0.0008) * 0.02;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.0006) * 0.004;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005 + 1) * 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[offset.x, offset.y, offset.z]}>
      <primitive object={clonedScene} scale={scale} rotation={[0, Math.PI * 0.7, 0]} />
      {Object.entries(ACCESSORY_MODELS).map(([accId, config]) =>
        activeAccessoryIds.has(accId) ? (
          <AccessoryModel
            key={accId}
            path={config.path}
            position={config.position}
            scale={config.scale}
            rotation={config.rotation}
            boatScale={scale}
            boatOffset={offset}
          />
        ) : null
      )}
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-2 border-brand-500/30 border-t-brand-500 animate-spin" />
        <p className="text-sm text-dark-400 font-medium">Cargando modelo 3D...</p>
      </div>
    </Html>
  );
}

function Water() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshPhysicalMaterial color="#0a1520" metalness={0.85} roughness={0.15} transparent opacity={0.85} />
    </mesh>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

export default function BoatCanvas({ color, activeAccessoryIds }: BoatCanvasProps) {
  return (
    <Canvas
      camera={{ position: [8, 5, 8], fov: 40 }}
      className="w-full h-full"
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      shadows
    >
      <color attach="background" args={["#080a0f"]} />
      <fog attach="fog" args={["#080a0f", 12, 30]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 12, 8]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[-5, 5, -4]} intensity={0.6} color="#c0392b" />
      <pointLight position={[5, 3, 5]} intensity={0.4} color="#5599dd" />
      <spotLight position={[0, 8, 0]} angle={0.5} penumbra={0.8} intensity={0.5} color="#ffffff" />

      <CameraSetup />

      <Suspense fallback={<LoadingFallback />}>
        <BoatModel color={color} activeAccessoryIds={activeAccessoryIds} />
      </Suspense>

      <Water />

      <ContactShadows position={[0, -0.79, 0]} opacity={0.4} scale={15} blur={2.5} far={5} />

      <Environment preset="night" />
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={18}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.48}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/bowrider.glb");
