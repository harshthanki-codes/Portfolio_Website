import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';

export default function LiquidMetalHero() {
  return (
    <div className="relative w-full h-[100vh] bg-[#08090c] overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Sphere args={[1, 100, 100]} scale={1.2}>
              <MeshDistortMaterial
                color="#ffffff"
                attach="material"
                distort={0.4}
                speed={2}
                metalness={1}
                roughness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </Sphere>
            <Environment preset="city" />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={1.5} far={1.5} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Fluid Design Excellence
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          Experience the future of web interfaces with liquid metal aesthetics that adapt, flow, and captivate. Built for modern applications that demand both beauty and performance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <a href="#" className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            Start Building
          </a>
          <a href="#" className="px-8 py-3 rounded-full bg-black/50 backdrop-blur-md text-white font-semibold border border-gray-600 hover:bg-black/80 transition-colors">
            View Examples
          </a>
        </div>
      </div>

      {/* Feature bottom bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-4 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center text-sm md:text-base text-gray-300 gap-4 shadow-xl">
          <div className="font-medium text-white">Seamless Animations</div>
          <div className="hidden sm:block text-gray-600">•</div>
          <div className="font-medium text-white">Responsive Excellence</div>
          <div className="hidden sm:block text-gray-600">•</div>
          <div className="font-medium text-white">Modern Architecture</div>
        </div>
      </div>

    </div>
  );
}
