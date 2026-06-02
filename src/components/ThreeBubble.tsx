"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  useTexture,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function Dog() {
  // Carrega a imagem do cachorro como uma textura 3D
  const texture = useTexture("/images/premium_dog_hero.png");
  
  return (
    // Posicionamos o cachorro atrás da bolha para a luz e o vidro distorcerem ele como uma lente
    <mesh position={[0, 0, -1]} scale={[2.8, 2.8, 2.8]}>
      {/* circleGeometry mascara automaticamente a imagem quadrada num círculo perfeito! */}
      <circleGeometry args={[0.5, 64]} />
      <meshBasicMaterial map={texture} transparent opacity={1} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Bubble(props: any) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <MeshDistortMaterial
        distort={0.25}
        transmission={1.05}
        thickness={-0.5}
        roughness={0}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1200]}
        clearcoat={1}
        clearcoatRoughness={0}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

export default function ThreeBubble() {
  return (
    <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 65 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Suspense fallback={null}>
          <Float floatIntensity={2} speed={1.5} rotationIntensity={0.5}>
            {/* O cachorro flutua JUNTO com a bolha para ficarem sempre sincronizados */}
            <group>
              <Dog />
              <Bubble />
            </group>
          </Float>
          
          {/* Ambiente iridescente (Apartment gera bons reflexos de janelas/luzes) */}
          <Environment preset="apartment" />
        </Suspense>

        {/* Sombra realista projetada no chão invisível */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
