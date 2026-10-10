import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';

export default function LiquidMetalHero() {
  return (
    <div className="relative w-full min-h-screen bg-[#08090c] overflow-hidden flex flex-col font-sans pt-20">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Sphere args={[1, 100, 100]} scale={1.1}>
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
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pointer-events-none pb-32">
        
        {/* Availability Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-gray-300 tracking-wide uppercase">Available for Scoping</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600 font-serif italic">custom AI systems</span> &amp; pipelines.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          I build <strong className="text-white font-semibold">custom LLM automation pipelines</strong>, mission-critical ERP &amp; CRM architectures, and resilient Python backend systems. Engineered for founders and tier-1 teams requiring measurable ROI, zero data-leakage, and airgapped reliability.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto mt-4">
          <a href="#solutions" className="px-8 py-3.5 rounded-full bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,100,0,0.3)]">
            Explore Solutions &rarr;
          </a>
          <a href="#scoper" className="px-8 py-3.5 rounded-full bg-black/40 backdrop-blur-md text-white font-semibold border border-white/20 hover:bg-black/60 hover:border-white/40 transition-colors">
            Scope Project
          </a>
        </div>
      </div>

      {/* Feature bottom bar */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-8 pointer-events-none mt-auto">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center text-sm md:text-base text-gray-300 gap-4 shadow-2xl">
          <div className="font-medium text-white flex items-center gap-2">
             <span className="text-orange-500">⚡</span> Live 7-Tier Fallback
          </div>
          <div className="hidden sm:block text-gray-600">•</div>
          <div className="font-medium text-white flex items-center gap-2">
             <span className="text-orange-500">🔒</span> Zero Data Leakage
          </div>
          <div className="hidden sm:block text-gray-600">•</div>
          <div className="font-medium text-white flex items-center gap-2">
             <span className="text-orange-500">📈</span> Measurable ROI
          </div>
        </div>
      </div>

    </div>
  );
}
