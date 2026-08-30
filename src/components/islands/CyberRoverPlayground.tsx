import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  CheckCircle2,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  tag: string;
  x: number;
  z: number;
  radius: number;
  color: number;
  description: string;
  metric: string;
  visited: boolean;
}

export const CyberRoverPlayground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);
  const [tokenRate, setTokenRate] = useState<number>(0);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [visitedCount, setVisitedCount] = useState<number>(0);
  const [cameraMode, setCameraMode] = useState<'chase' | 'iso' | 'top'>('chase');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const engineOscRef = useRef<OscillatorNode | null>(null);
  const engineGainRef = useRef<GainNode | null>(null);

  // State refs for animation loop
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const roverPosRef = useRef<{ x: number; z: number; angle: number; speed: number }>({
    x: 0,
    z: 0,
    angle: 0,
    speed: 0
  });

  const zonesRef = useRef<Zone[]>([
    { id: 'z1', name: 'LLM Fine-Tuning Foundry', tag: 'On-Premises AI', x: -28, z: -28, radius: 10, color: 0xff5500, description: 'Fine-tuned DeepSeek 6.7B, Qwen 2.5 on Odoo 19 dataset.', metric: '8.7/10 vs Claude Sonnet 5', visited: false },
    { id: 'z2', name: '7-Tier Failover DAG', tag: 'Resilience Mesh', x: 28, z: -28, radius: 10, color: 0xffaa00, description: 'Zero-drop failover architecture spanning Gemini, NIM & Groq.', metric: '0% Transaction Drop SLA', visited: false },
    { id: 'z3', name: 'Odoo 19 ERP Engine', tag: 'Enterprise Backend', x: 28, z: 28, radius: 10, color: 0x00bb77, description: 'Multi-currency computed ledger rollups & asynchronous workers.', metric: '<50ms Query Execution', visited: false },
    { id: 'z4', name: 'Security Firewall Bastion', tag: 'Network Defense', x: -28, z: 28, radius: 10, color: 0x3b82f6, description: 'Tamper-proof Windows DNS proxy watchdog on 35+ workstations.', metric: 'Fails-Closed Architecture', visited: false },
    { id: 'z5', name: 'Speech Synthesis Lab', tag: 'Voice AI Studio', x: 0, z: 35, radius: 10, color: 0xec4899, description: 'IndicF5 & VibeVoice zero-shot multilingual speech synthesis.', metric: '60s Voice Reference Clones', visited: false }
  ]);

  // Play Procedural Sound using Web Audio API
  const playSound = (type: 'beep' | 'bump' | 'honk' | 'fanfare') => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'bump') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'honk') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'fanfare') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.type = 'sine';
          noteOsc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
          noteGain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
          noteOsc.start(ctx.currentTime + i * 0.1);
          noteOsc.stop(ctx.currentTime + i * 0.1 + 0.3);
        });
      }
    } catch {
      // Audio context fallback
    }
  };

  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0b10);
    scene.fog = new THREE.FogExp2(0x0a0b10, 0.015);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 30, 45);

    // 3. Renderer Setup with Shadows & AA
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    dirLight.position.set(40, 60, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -60;
    dirLight.shadow.camera.right = 60;
    dirLight.shadow.camera.top = 60;
    dirLight.shadow.camera.bottom = -60;
    scene.add(dirLight);

    // 5. High-Tech Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(160, 80, 0xff5500, 0x1f2430);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(180, 180);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0e1118,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 6. Construct 3D Cyber Rover (Vehicle)
    const roverGroup = new THREE.Group();
    
    // Chassis
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.8, 3.8);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x181a24,
      roughness: 0.3,
      metalness: 0.8
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.7;
    chassis.castShadow = true;
    roverGroup.add(chassis);

    // Roof & Solar Panels
    const roofGeo = new THREE.BoxGeometry(1.8, 0.5, 2.2);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      roughness: 0.2,
      metalness: 0.5
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 1.25, -0.2);
    roof.castShadow = true;
    roverGroup.add(roof);

    // Neon Headlights
    const headlightGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffa044 });
    
    const leftLight = new THREE.Mesh(headlightGeo, headlightMat);
    leftLight.position.set(-0.9, 0.7, -1.9);
    roverGroup.add(leftLight);

    const rightLight = new THREE.Mesh(headlightGeo, headlightMat);
    rightLight.position.set(0.9, 0.7, -1.9);
    roverGroup.add(rightLight);

    // Spotlight Cone
    const spotLight = new THREE.SpotLight(0xff8800, 4, 30, Math.PI / 6, 0.5);
    spotLight.position.set(0, 1.2, -1.8);
    spotLight.target.position.set(0, 0, -15);
    roverGroup.add(spotLight);
    roverGroup.add(spotLight.target);

    // Wheels (4-Wheel Drive)
    const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.9 });
    const wheelPositions = [
      [-1.3, 0.5, -1.2],
      [1.3, 0.5, -1.2],
      [-1.3, 0.5, 1.2],
      [1.3, 0.5, 1.2]
    ];
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;
      roverGroup.add(wheel);
    });

    scene.add(roverGroup);

    // 7. Interactive Physics Obstacles (Knockable Benchmark Pillars & Cubes)
    interface PhysicsBox {
      mesh: THREE.Mesh;
      vx: number;
      vz: number;
      rotV: number;
    }
    const physicsBoxes: PhysicsBox[] = [];

    const createObstacles = () => {
      const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const boxMaterials = [
        new THREE.MeshStandardMaterial({ color: 0xff5500, roughness: 0.3, metalness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.3, metalness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3, metalness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.6 })
      ];

      // Spawn clusters of knockable blocks around the arena
      const clusterCenters = [
        { x: -14, z: -14 },
        { x: 14, z: -14 },
        { x: 14, z: 14 },
        { x: -14, z: 14 },
        { x: 0, z: -18 }
      ];

      clusterCenters.forEach((center, cIdx) => {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const box = new THREE.Mesh(boxGeo, boxMaterials[(cIdx + i + j) % boxMaterials.length]);
            box.position.set(center.x + (i - 1) * 2, 0.8 + (i === 1 && j === 1 ? 1.6 : 0), center.z + (j - 1) * 2);
            box.castShadow = true;
            box.receiveShadow = true;
            scene.add(box);
            physicsBoxes.push({ mesh: box, vx: 0, vz: 0, rotV: 0 });
          }
        }
      });
    };
    createObstacles();

    // 8. 3D Architectural Zone Monuments
    zonesRef.current.forEach(zone => {
      // Glow Base Ring
      const ringGeo = new THREE.RingGeometry(zone.radius - 0.4, zone.radius, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: zone.color, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(zone.x, 0.05, zone.z);
      scene.add(ring);

      // Central Holographic Tower
      const towerGeo = new THREE.CylinderGeometry(1.2, 1.8, 6, 8);
      const towerMat = new THREE.MeshStandardMaterial({
        color: zone.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: zone.color,
        emissiveIntensity: 0.3
      });
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(zone.x, 3, zone.z);
      tower.castShadow = true;
      scene.add(tower);

      // Floating Orb
      const orbGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({ color: zone.color });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(zone.x, 7.5, zone.z);
      scene.add(orb);
    });

    // 9. Controls Event Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key.toLowerCase() === 'h') {
        playSound('honk');
      }
      if (e.key.toLowerCase() === 'r') {
        // Reset rover to origin
        roverPosRef.current = { x: 0, z: 0, angle: 0, speed: 0 };
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 10. Main Animation & Physics Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const keys = keysRef.current;
      const rover = roverPosRef.current;

      // Acceleration / Braking
      const accel = 35.0;
      const maxSpeed = 22.0;
      const friction = 0.94;
      const turnSpeed = 2.8;

      const isForward = keys['arrowup'] || keys['w'];
      const isBackward = keys['arrowdown'] || keys['s'];
      const isLeft = keys['arrowleft'] || keys['a'];
      const isRight = keys['arrowright'] || keys['d'];

      if (isForward) {
        rover.speed -= accel * delta;
      } else if (isBackward) {
        rover.speed += accel * delta;
      } else {
        rover.speed *= friction;
      }

      rover.speed = Math.max(-maxSpeed, Math.min(maxSpeed, rover.speed));

      if (Math.abs(rover.speed) > 0.1) {
        const directionFactor = rover.speed < 0 ? 1 : -1;
        if (isLeft) rover.angle += turnSpeed * delta * directionFactor;
        if (isRight) rover.angle -= turnSpeed * delta * directionFactor;
      }

      // Update Rover Position
      rover.x += Math.sin(rover.angle) * rover.speed * delta;
      rover.z += Math.cos(rover.angle) * rover.speed * delta;

      // Arena Boundaries Clamp (-75 to 75)
      rover.x = Math.max(-75, Math.min(75, rover.x));
      rover.z = Math.max(-75, Math.min(75, rover.z));

      // Update 3D Object
      roverGroup.position.set(rover.x, 0, rover.z);
      roverGroup.rotation.y = rover.angle;

      // Update HUD metrics
      const currentSpeed = Math.round(Math.abs(rover.speed) * 4.5);
      setSpeed(currentSpeed);
      setTokenRate(Math.round(currentSpeed * 18.5));

      // 11. Physics Collisions with Knockable Boxes
      physicsBoxes.forEach(pBox => {
        const dist = Math.hypot(rover.x - pBox.mesh.position.x, rover.z - pBox.mesh.position.z);
        if (dist < 2.5) {
          // Collision detected!
          const angle = Math.atan2(pBox.mesh.position.z - rover.z, pBox.mesh.position.x - rover.x);
          pBox.vx = Math.cos(angle) * (Math.abs(rover.speed) + 5);
          pBox.vz = Math.sin(angle) * (Math.abs(rover.speed) + 5);
          pBox.rotV = (Math.random() - 0.5) * 5;
          playSound('bump');
          rover.speed *= 0.6; // Transfer momentum
        }

        // Apply box velocity & damping
        pBox.mesh.position.x += pBox.vx * delta;
        pBox.mesh.position.z += pBox.vz * delta;
        pBox.mesh.rotation.y += pBox.rotV * delta;
        pBox.mesh.rotation.x += pBox.rotV * delta * 0.5;

        pBox.vx *= 0.92;
        pBox.vz *= 0.92;
        pBox.rotV *= 0.92;
      });

      // 12. Check Zone Triggers
      let currentlyInside: Zone | null = null;
      let newlyVisited = false;

      zonesRef.current.forEach(zone => {
        const dist = Math.hypot(rover.x - zone.x, rover.z - zone.z);
        if (dist < zone.radius) {
          currentlyInside = zone;
          if (!zone.visited) {
            zone.visited = true;
            newlyVisited = true;
            playSound('fanfare');
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 }
            });
          }
        }
      });

      setActiveZone(currentlyInside);
      if (newlyVisited) {
        const count = zonesRef.current.filter(z => z.visited).length;
        setVisitedCount(count);
      }

      // 13. Camera Follow Modes
      if (cameraMode === 'chase') {
        const targetCamX = rover.x - Math.sin(rover.angle) * -18;
        const targetCamZ = rover.z - Math.cos(rover.angle) * -18;
        const targetCamY = 12;

        camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.08);
        camera.lookAt(rover.x, 1.5, rover.z);
      } else if (cameraMode === 'iso') {
        camera.position.lerp(new THREE.Vector3(rover.x + 30, 35, rover.z + 30), 0.05);
        camera.lookAt(rover.x, 0, rover.z);
      } else if (cameraMode === 'top') {
        camera.position.lerp(new THREE.Vector3(rover.x, 60, rover.z + 0.1), 0.08);
        camera.lookAt(rover.x, 0, rover.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Responsive Resize Listener
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, cameraMode, isMuted]);

  return (
    <>
      {/* 🚀 Main Launch Floating Button in Hero & Navbar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="touch-target px-4 py-2.5 rounded-full bg-[var(--accent-gradient)] text-[var(--accent-text)] font-mono text-[var(--text-xs)] font-bold shadow-[0_0_24px_var(--accent-glow)] hover:shadow-[0_0_36px_var(--accent-glow)] transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95 z-30"
        aria-label="Launch 3D Physics AI Rover Sandbox"
      >
        <Gamepad2 className="w-4 h-4 animate-bounce" />
        <span>Drive 3D AI Rover &middot; Bruno Simon Mode</span>
      </button>

      {/* 🎮 3D Physics Fullscreen Interactive Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#07080c] flex flex-col overflow-hidden animate-in fade-in duration-300">
          
          {/* Top HUD Bar */}
          <div className="h-14 border-b border-white/10 bg-black/60 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 font-mono text-xs text-white shrink-0 z-20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-ping"></div>
              <span className="font-bold tracking-wider uppercase text-[var(--accent)] hidden sm:inline">
                HARSH.AI // 3D NEURAL ROVER SIMULATOR
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px]">
                WASD / Arrow Keys to Drive &middot; H for Horn
              </span>
            </div>

            {/* Middle Telemetry Gauges */}
            <div className="flex items-center gap-4 text-[11px]">
              <div className="px-3 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{speed} km/h</span>
              </div>

              <div className="px-3 py-1 rounded bg-white/5 border border-white/10 hidden md:flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-green-400" />
                <span>{tokenRate} tok/s</span>
              </div>

              <div className="px-3 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Zones: {visitedCount} / 5</span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCameraMode(prev => prev === 'chase' ? 'iso' : prev === 'iso' ? 'top' : 'chase')}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Toggle Camera Angle"
              >
                Cam: {cameraMode.toUpperCase()}
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(prev => !prev)}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isMuted ? "Unmute Engine Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent)]" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors ml-2"
                title="Exit 3D Playground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D WebGL Canvas Container */}
          <div ref={mountRef} className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
            
            {/* Active Zone Billboard Card Overlay */}
            {activeZone && (
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 border border-[var(--accent-border)] backdrop-blur-xl p-5 rounded-xl max-w-md w-[90%] text-white shadow-2xl z-30 animate-in slide-in-from-top duration-300">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-[var(--accent)] text-black font-bold">
                    {activeZone.tag}
                  </span>
                  <span className="font-mono text-xs text-green-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    DISCOVERED
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  {activeZone.name}
                </h3>
                <p className="text-xs text-white/70 mt-1 font-sans leading-relaxed">
                  {activeZone.description}
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/10 font-mono text-xs text-[var(--accent)] font-bold">
                  &rarr; {activeZone.metric}
                </div>
              </div>
            )}

            {/* Mobile Virtual On-Screen Joystick */}
            <div className="absolute bottom-6 left-6 grid grid-cols-3 gap-2 sm:hidden z-30 opacity-80">
              <div></div>
              <button
                type="button"
                onTouchStart={() => { keysRef.current['w'] = true; }}
                onTouchEnd={() => { keysRef.current['w'] = false; }}
                className="w-12 h-12 rounded-xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-lg flex items-center justify-center backdrop-blur-md"
              >
                ▲
              </button>
              <div></div>
              <button
                type="button"
                onTouchStart={() => { keysRef.current['a'] = true; }}
                onTouchEnd={() => { keysRef.current['a'] = false; }}
                className="w-12 h-12 rounded-xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-lg flex items-center justify-center backdrop-blur-md"
              >
                ◀
              </button>
              <button
                type="button"
                onTouchStart={() => { keysRef.current['s'] = true; }}
                onTouchEnd={() => { keysRef.current['s'] = false; }}
                className="w-12 h-12 rounded-xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-lg flex items-center justify-center backdrop-blur-md"
              >
                ▼
              </button>
              <button
                type="button"
                onTouchStart={() => { keysRef.current['d'] = true; }}
                onTouchEnd={() => { keysRef.current['d'] = false; }}
                className="w-12 h-12 rounded-xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-lg flex items-center justify-center backdrop-blur-md"
              >
                ▶
              </button>
            </div>

            {/* Instructions Floating Tag */}
            <div className="absolute bottom-6 right-6 font-mono text-[11px] text-white/60 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 pointer-events-none hidden sm:block">
              ⌨️ <span className="text-white font-semibold">W/A/S/D or Arrows</span> to Drive &middot; <span className="text-white font-semibold">H</span> to Honk &middot; <span className="text-white font-semibold">R</span> to Reset
            </div>

          </div>

        </div>
      )}
    </>
  );
};
