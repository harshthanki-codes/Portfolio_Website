import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { PROJECTS_DATA, type ProjectData } from '../../data/projects';
import { 
  Compass, 
  Zap, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Cpu, 
  Server, 
  ShieldCheck, 
  Mail, 
  ExternalLink,
  Radio,
  Sparkles
} from 'lucide-react';

interface ZoneMonument {
  id: string;
  name: string;
  category: string;
  x: number;
  z: number;
  radius: number;
  color: number;
  icon: string;
  title: string;
  tagline: string;
  visited: boolean;
}

export const BrunoWorld3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [tokenRate, setTokenRate] = useState<number>(0);
  const [activeZone, setActiveZone] = useState<ZoneMonument | null>(null);
  const [visitedCount, setVisitedCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [cameraView, setCameraView] = useState<'chase' | 'iso' | 'top'>('chase');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [activeSectionTab, setActiveSectionTab] = useState<string>('projects');

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Physics & Animation state refs
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const roverPosRef = useRef<{ x: number; z: number; angle: number; speed: number }>({
    x: 0,
    z: 0,
    angle: 0,
    speed: 0
  });

  const zonesRef = useRef<ZoneMonument[]>([
    {
      id: 'projects',
      name: '01 // SYSTEMS FOUNDRY',
      category: '7 Technical Case Studies',
      x: -35,
      z: -35,
      radius: 14,
      color: 0xff5500,
      icon: 'Cpu',
      title: 'Production AI Systems & Deep Architectures',
      tagline: 'Explore 7 end-to-end case studies: QLoRA fine-tuning, 7-tier failovers & ERP engines.',
      visited: false
    },
    {
      id: 'telemetry',
      name: '02 // TELEMETRY HUB',
      category: 'Live Microservice',
      x: 35,
      z: -35,
      radius: 14,
      color: 0xffaa00,
      icon: 'Server',
      title: 'Live REST API Mesh & MongoDB Cluster',
      tagline: 'Real-time telemetry engine running Node/Express and MongoDB Atlas connection pool.',
      visited: false
    },
    {
      id: 'skills',
      name: '03 // STACK MATRIX',
      category: '4-Pillar Engineering',
      x: 35,
      z: 35,
      radius: 14,
      color: 0x10b981,
      icon: 'Layers',
      title: 'Core Technical Capabilities & Infrastructure',
      tagline: 'QLoRA, Transformers, FastAPI, Odoo ORM, PostgreSQL, and fails-closed security daemons.',
      visited: false
    },
    {
      id: 'experience',
      name: '04 // TIMELINE TRACK',
      category: 'Verified Record',
      x: -35,
      z: 35,
      radius: 14,
      color: 0x3b82f6,
      icon: 'ShieldCheck',
      title: 'Delivered Production Engagements & Capstones',
      tagline: 'From on-premise AI model pipelines to IIT Mandi AI/ML credentials.',
      visited: false
    },
    {
      id: 'contact',
      name: '05 // DISPATCH DEPOT',
      category: 'Direct Communications',
      x: 0,
      z: 46,
      radius: 14,
      color: 0xff5500,
      icon: 'Mail',
      title: 'Initiate Technical Collaboration',
      tagline: 'Direct email, GitHub repositories, LinkedIn, and contract engagements.',
      visited: false
    }
  ]);

  // Procedural Web Audio Synthesizer
  const playSound = (type: 'bump' | 'honk' | 'zone' | 'whoosh') => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'bump') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'honk') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.setValueAtTime(450, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'zone') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.type = 'sine';
          noteOsc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
          noteGain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.25);
          noteOsc.start(ctx.currentTime + i * 0.08);
          noteOsc.stop(ctx.currentTime + i * 0.08 + 0.25);
        });
      } else if (type === 'whoosh') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // Audio context fallback
    }
  };

  // Teleport / Glide Rover to Specific Zone
  const teleportToZone = (zoneId: string) => {
    const target = zonesRef.current.find(z => z.id === zoneId);
    if (!target) return;

    playSound('whoosh');
    roverPosRef.current.x = target.x;
    roverPosRef.current.z = target.z + 5;
    roverPosRef.current.speed = 0;
    roverPosRef.current.angle = Math.PI;
    setActiveSectionTab(zoneId);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08090d);
    scene.fog = new THREE.FogExp2(0x08090d, 0.012);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 32, 45);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff0dd, 2.2);
    dirLight.position.set(50, 70, 40);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -80;
    dirLight.shadow.camera.right = 80;
    dirLight.shadow.camera.top = 80;
    dirLight.shadow.camera.bottom = -80;
    scene.add(dirLight);

    // Subtle Amber Rim Light
    const rimLight = new THREE.PointLight(0xff5500, 3, 100);
    rimLight.position.set(-40, 30, -40);
    scene.add(rimLight);

    // 5. Stylized Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(200, 100, 0xff5500, 0x181c26);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(240, 240);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e14,
      roughness: 0.85,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 6. Construct Cyber Rover
    const roverGroup = new THREE.Group();

    // Chassis
    const chassisGeo = new THREE.BoxGeometry(2.6, 0.9, 4.0);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x151821, roughness: 0.3, metalness: 0.8 });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.75;
    chassis.castShadow = true;
    roverGroup.add(chassis);

    // Cabin / Solar Roof
    const roofGeo = new THREE.BoxGeometry(1.9, 0.6, 2.4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xff5500, roughness: 0.2, metalness: 0.5 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 1.35, -0.2);
    roof.castShadow = true;
    roverGroup.add(roof);

    // Headlights
    const lightGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffa044 });
    const lLight = new THREE.Mesh(lightGeo, lightMat);
    lLight.position.set(-1.0, 0.75, -2.0);
    roverGroup.add(lLight);

    const rLight = new THREE.Mesh(lightGeo, lightMat);
    rLight.position.set(1.0, 0.75, -2.0);
    roverGroup.add(rLight);

    // Spotlight
    const spotLight = new THREE.SpotLight(0xff7700, 5, 35, Math.PI / 6, 0.5);
    spotLight.position.set(0, 1.2, -2.0);
    spotLight.target.position.set(0, 0, -18);
    roverGroup.add(spotLight);
    roverGroup.add(spotLight.target);

    // 4 Heavy-Duty Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.45, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.9 });
    const wheelPositions = [
      [-1.45, 0.55, -1.3],
      [1.45, 0.55, -1.3],
      [-1.45, 0.55, 1.3],
      [1.45, 0.55, 1.3]
    ];
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;
      roverGroup.add(wheel);
    });

    scene.add(roverGroup);

    // 7. Interactive Physics Obstacles (Knockable Dominoes & GPU Blocks)
    interface PhysicsBox {
      mesh: THREE.Mesh;
      vx: number;
      vz: number;
      rotV: number;
    }
    const physicsBoxes: PhysicsBox[] = [];

    const createObstacles = () => {
      const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
      const boxMaterials = [
        new THREE.MeshStandardMaterial({ color: 0xff5500, roughness: 0.3, metalness: 0.7 }),
        new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.3, metalness: 0.7 }),
        new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.7 }),
        new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.7 })
      ];

      const obstacleClusters = [
        { x: -16, z: -16 },
        { x: 16, z: -16 },
        { x: 16, z: 16 },
        { x: -16, z: 16 },
        { x: 0, z: -20 },
        { x: 0, z: 20 }
      ];

      obstacleClusters.forEach((cluster, cIdx) => {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const box = new THREE.Mesh(boxGeo, boxMaterials[(cIdx + i + j) % boxMaterials.length]);
            box.position.set(cluster.x + (i - 1) * 2.4, 0.9 + (i === 1 && j === 1 ? 1.8 : 0), cluster.z + (j - 1) * 2.4);
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
      // Glow Ring
      const ringGeo = new THREE.RingGeometry(zone.radius - 0.5, zone.radius, 40);
      const ringMat = new THREE.MeshBasicMaterial({ color: zone.color, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(zone.x, 0.05, zone.z);
      scene.add(ring);

      // Central Hologram Tower
      const towerGeo = new THREE.CylinderGeometry(1.5, 2.2, 7, 8);
      const towerMat = new THREE.MeshStandardMaterial({
        color: zone.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: zone.color,
        emissiveIntensity: 0.35
      });
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(zone.x, 3.5, zone.z);
      tower.castShadow = true;
      scene.add(tower);

      // Floating Orb
      const orbGeo = new THREE.SphereGeometry(1.0, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({ color: zone.color });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(zone.x, 9.0, zone.z);
      scene.add(orb);
    });

    // 9. Keyboard Event Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key.toLowerCase() === 'h') playSound('honk');
      if (e.key.toLowerCase() === 'r') {
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
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const keys = keysRef.current;
      const rover = roverPosRef.current;

      const accel = 38.0;
      const maxSpeed = 24.0;
      const friction = 0.93;
      const turnSpeed = 2.9;

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
        const dir = rover.speed < 0 ? 1 : -1;
        if (isLeft) rover.angle += turnSpeed * delta * dir;
        if (isRight) rover.angle -= turnSpeed * delta * dir;
      }

      // Update position
      rover.x += Math.sin(rover.angle) * rover.speed * delta;
      rover.z += Math.cos(rover.angle) * rover.speed * delta;

      // Arena boundary limits
      rover.x = Math.max(-85, Math.min(85, rover.x));
      rover.z = Math.max(-85, Math.min(85, rover.z));

      // Sync 3D Mesh
      roverGroup.position.set(rover.x, 0, rover.z);
      roverGroup.rotation.y = rover.angle;

      // Telemetry metrics
      const currentSpeed = Math.round(Math.abs(rover.speed) * 4.6);
      setSpeed(currentSpeed);
      setTokenRate(Math.round(currentSpeed * 19.2));

      // Physics box collisions
      physicsBoxes.forEach(pBox => {
        const dist = Math.hypot(rover.x - pBox.mesh.position.x, rover.z - pBox.mesh.position.z);
        if (dist < 2.8) {
          const angle = Math.atan2(pBox.mesh.position.z - rover.z, pBox.mesh.position.x - rover.x);
          pBox.vx = Math.cos(angle) * (Math.abs(rover.speed) + 6);
          pBox.vz = Math.sin(angle) * (Math.abs(rover.speed) + 6);
          pBox.rotV = (Math.random() - 0.5) * 6;
          playSound('bump');
          rover.speed *= 0.65;
        }

        pBox.mesh.position.x += pBox.vx * delta;
        pBox.mesh.position.z += pBox.vz * delta;
        pBox.mesh.rotation.y += pBox.rotV * delta;
        pBox.mesh.rotation.x += pBox.rotV * delta * 0.5;

        pBox.vx *= 0.92;
        pBox.vz *= 0.92;
        pBox.rotV *= 0.92;
      });

      // Check Zone Triggers
      let inside: ZoneMonument | null = null;
      let newlyVisited = false;

      zonesRef.current.forEach(zone => {
        const dist = Math.hypot(rover.x - zone.x, rover.z - zone.z);
        if (dist < zone.radius) {
          inside = zone;
          if (!zone.visited) {
            zone.visited = true;
            newlyVisited = true;
            playSound('zone');
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.5 }
            });
          }
        }
      });

      setActiveZone(inside);
      if (newlyVisited) {
        setVisitedCount(zonesRef.current.filter(z => z.visited).length);
      }

      // Camera follow spring
      if (cameraView === 'chase') {
        const targetCamX = rover.x - Math.sin(rover.angle) * -20;
        const targetCamZ = rover.z - Math.cos(rover.angle) * -20;
        const targetCamY = 14;

        camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.08);
        camera.lookAt(rover.x, 1.8, rover.z);
      } else if (cameraView === 'iso') {
        camera.position.lerp(new THREE.Vector3(rover.x + 35, 40, rover.z + 35), 0.05);
        camera.lookAt(rover.x, 0, rover.z);
      } else if (cameraView === 'top') {
        camera.position.lerp(new THREE.Vector3(rover.x, 70, rover.z + 0.1), 0.08);
        camera.lookAt(rover.x, 0, rover.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
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
  }, [cameraView, isMuted]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#08090d] select-none font-mono">
      
      {/* 🚀 TOP HUD NAVIGATION BAR (Instant Zone Teleporters) */}
      <header className="absolute top-0 left-0 right-0 z-30 h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between gap-4 text-white">
        
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-ping"></div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              <span>HARSH THANKI</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)] text-black font-extrabold uppercase">
                AI &middot; MERN
              </span>
            </div>
            <div className="text-[10px] text-white/50 tracking-wider">
              3D NEURAL SYSTEMS WORLD
            </div>
          </div>
        </div>

        {/* Desktop Quick-Glide Zone Navigators */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full text-xs" aria-label="Zone Navigation">
          <button
            type="button"
            onClick={() => teleportToZone('projects')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'projects' 
                ? 'bg-[var(--accent)] text-black font-bold shadow-xs' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            01 // Systems
          </button>

          <button
            type="button"
            onClick={() => teleportToZone('telemetry')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'telemetry' 
                ? 'bg-[var(--accent)] text-black font-bold shadow-xs' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            02 // Telemetry
          </button>

          <button
            type="button"
            onClick={() => teleportToZone('skills')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'skills' 
                ? 'bg-[var(--accent)] text-black font-bold shadow-xs' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            03 // Stack
          </button>

          <button
            type="button"
            onClick={() => teleportToZone('experience')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'experience' 
                ? 'bg-[var(--accent)] text-black font-bold shadow-xs' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            04 // Timeline
          </button>

          <button
            type="button"
            onClick={() => teleportToZone('contact')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'contact' 
                ? 'bg-[var(--accent)] text-black font-bold shadow-xs' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            05 // Dispatch
          </button>
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowDrawer(true)}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white flex items-center gap-1.5 transition-all"
            title="Open Structured Engineering Dossier"
          >
            <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="hidden sm:inline">Dossier / List</span>
          </button>

          <button
            type="button"
            onClick={() => setCameraView(prev => prev === 'chase' ? 'iso' : prev === 'iso' ? 'top' : 'chase')}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all hidden md:inline-block"
            title="Switch Camera Perspective"
          >
            Cam: {cameraView.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={() => setIsMuted(prev => !prev)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            title={isMuted ? "Unmute Synthesizer Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[var(--accent)]" />}
          </button>
        </div>

      </header>

      {/* 🎮 FULLSCREEN 3D WEBGL CANVAS */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 🧭 BOTTOM-LEFT MINI-MAP RADAR & SPEEDOMETER */}
      <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3 pointer-events-none">
        
        {/* Radar Blip Box */}
        <div className="p-3 bg-black/70 border border-white/10 backdrop-blur-xl rounded-xl w-36 h-36 relative overflow-hidden flex items-center justify-center pointer-events-auto">
          {/* Radar Scanner Sweep */}
          <div className="absolute inset-0 rounded-full border border-white/15"></div>
          <div className="absolute w-24 h-24 rounded-full border border-white/10"></div>
          <div className="absolute w-12 h-12 rounded-full border border-white/10"></div>
          
          {/* Center Rover Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] z-10 shadow-[0_0_8px_var(--accent)]"></div>

          {/* Radar Blips */}
          {zonesRef.current.map(z => {
            const relX = (z.x / 100) * 50;
            const relZ = (z.z / 100) * 50;
            return (
              <div
                key={z.id}
                style={{ transform: `translate(${relX}px, ${relZ}px)` }}
                className={`absolute w-2 h-2 rounded-full ${z.visited ? 'bg-green-400' : 'bg-orange-400'} animate-pulse`}
                title={z.name}
              />
            );
          })}

          <div className="absolute bottom-1 left-2 text-[9px] text-white/40 uppercase font-mono">
            GPS Radar &middot; 5 Zones
          </div>
        </div>

        {/* Live Speed & Token Velocity */}
        <div className="p-3 bg-black/70 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-between gap-4 text-xs text-white">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-bold">{speed} km/h</span>
          </div>
          <div className="text-white/40">|</div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-green-400" />
            <span className="font-bold">{tokenRate} tok/s</span>
          </div>
        </div>

      </div>

      {/* 📍 ACTIVE ZONE FLOATING BILLBOARD (Discovered on Drive) */}
      {activeZone && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/85 border border-[var(--accent-border)] backdrop-blur-2xl p-6 rounded-2xl max-w-lg w-[92%] text-white shadow-2xl z-30 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase px-3 py-1 rounded-full bg-[var(--accent)] text-black font-extrabold tracking-wider">
              {activeZone.category}
            </span>
            <span className="text-xs text-green-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              ZONE CONNECTED
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
            {activeZone.title}
          </h2>

          <p className="text-xs text-white/70 mt-1.5 font-sans leading-relaxed">
            {activeZone.tagline}
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setShowDrawer(true);
                setActiveSectionTab(activeZone.id);
              }}
              className="px-4 py-2 rounded-lg bg-[var(--accent-gradient)] text-black font-bold text-xs flex items-center gap-1.5 hover:shadow-[0_0_16px_var(--accent-glow)] transition-all"
            >
              <span>Explore Section Dossier</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-[10px] text-white/40 font-mono">
              Press R to Reset Rover
            </span>
          </div>
        </div>
      )}

      {/* 📱 MOBILE TOUCH CONTROLS */}
      <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-2.5 sm:hidden z-20">
        <div></div>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['w'] = true; }}
          onTouchEnd={() => { keysRef.current['w'] = false; }}
          className="w-14 h-14 rounded-2xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20"
          aria-label="Drive Forward"
        >
          ▲
        </button>
        <div></div>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['a'] = true; }}
          onTouchEnd={() => { keysRef.current['a'] = false; }}
          className="w-14 h-14 rounded-2xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20"
          aria-label="Turn Left"
        >
          ◀
        </button>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['s'] = true; }}
          onTouchEnd={() => { keysRef.current['s'] = false; }}
          className="w-14 h-14 rounded-2xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20"
          aria-label="Drive Backward"
        >
          ▼
        </button>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['d'] = true; }}
          onTouchEnd={() => { keysRef.current['d'] = false; }}
          className="w-14 h-14 rounded-2xl bg-white/20 active:bg-[var(--accent)] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20"
          aria-label="Turn Right"
        >
          ▶
        </button>
      </div>

      {/* 📖 FULL STRUCTURED ENGINEERING DOSSIER DRAWER */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0e1117] border-l border-white/15 h-full overflow-y-auto p-6 sm:p-8 space-y-6 text-white animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--accent)] text-black font-bold">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase">Harsh Thanki &middot; Engineering Dossier</h3>
                  <span className="text-xs text-white/50">Applied AI &middot; MERN Architecture</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowDrawer(false);
                  setSelectedProject(null);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
                aria-label="Close Dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Tabs */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
              {['projects', 'telemetry', 'skills', 'experience', 'contact'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveSectionTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all uppercase ${
                    activeSectionTab === tab
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-black font-bold'
                      : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: 7 Case Studies */}
            {activeSectionTab === 'projects' && (
              <div className="space-y-5">
                <div className="text-xs text-white/60">
                  Select any production system to inspect empirical benchmarks, constraints, and failover DAGs:
                </div>

                <div className="space-y-3">
                  {PROJECTS_DATA.map((proj, idx) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="p-4 border border-white/10 bg-white/5 hover:border-[var(--accent)] rounded-xl cursor-pointer transition-all hover:bg-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-[var(--accent)] font-bold uppercase">
                          [0{idx + 1}] &middot; {proj.statusDetail}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">Deep Dive &rarr;</span>
                      </div>
                      <div className="font-serif font-bold text-white text-base">{proj.title}</div>
                      <p className="text-xs text-white/70 font-sans line-clamp-2">{proj.tagline}</p>
                    </div>
                  ))}
                </div>

                {/* Detailed Selected Project Modal */}
                {selectedProject && (
                  <div className="p-6 border border-[var(--accent)] bg-black/90 rounded-xl space-y-5 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-[var(--accent)] uppercase">{selectedProject.statusDetail}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="text-xs text-white/50 hover:text-white"
                      >
                        Close [X]
                      </button>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white">{selectedProject.title}</h4>

                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-white/5 rounded border border-white/10">
                        <div className="text-[10px] text-red-400 uppercase font-bold mb-1">01 // The Problem</div>
                        <p className="text-white/80 font-sans">{selectedProject.problem}</p>
                      </div>

                      <div className="p-3 bg-white/5 rounded border border-white/10">
                        <div className="text-[10px] text-amber-400 uppercase font-bold mb-1">02 // Technical Constraint</div>
                        <p className="text-white/80 font-sans">{selectedProject.constraint}</p>
                      </div>

                      <div className="p-3 bg-white/5 rounded border border-white/10">
                        <div className="text-[10px] text-[var(--accent)] uppercase font-bold mb-1">03 // Architecture</div>
                        <p className="text-white/80 font-sans">{selectedProject.architecture.description}</p>
                      </div>

                      <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                        <div className="text-[10px] text-green-400 uppercase font-bold mb-1">04 // Verified Outcomes</div>
                        <div className="grid grid-cols-2 gap-2 my-2">
                          {selectedProject.result.metrics.map(m => (
                            <div key={m.label} className="p-2 bg-black/50 rounded text-center">
                              <div className="font-bold text-white text-sm">{m.value}</div>
                              <div className="text-[9px] text-white/50 uppercase">{m.label}</div>
                            </div>
                          ))}
                        </div>
                        <p className="text-white/80 font-sans">{selectedProject.result.summary}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Telemetry */}
            {activeSectionTab === 'telemetry' && (
              <div className="p-5 border border-white/10 bg-white/5 rounded-xl space-y-4 text-xs font-mono">
                <div className="text-[var(--accent)] font-bold text-sm">// LIVE MERN TELEMETRY ENGINE</div>
                <p className="text-white/70 font-sans">
                  Communicating with deployed Node.js/Express API cluster and MongoDB Atlas connection pools.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-black/50 border border-white/10 rounded">
                    <div className="text-white/50 text-[10px]">API CLUSTER</div>
                    <div className="text-white font-bold text-sm mt-1">aws-ap-south-1</div>
                  </div>
                  <div className="p-3 bg-black/50 border border-white/10 rounded">
                    <div className="text-white/50 text-[10px]">DRIVER STATE</div>
                    <div className="text-green-400 font-bold text-sm mt-1">Connected (M0)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Skills */}
            {activeSectionTab === 'skills' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 border border-white/10 bg-white/5 rounded-xl space-y-2">
                  <div className="text-[var(--accent)] font-bold">01 // APPLIED AI & LLM SYSTEMS</div>
                  <p className="text-white/70 font-sans">QLoRA / PEFT 4-bit quant, Ollama Airgapped Runtime, Speech Synthesis (IndicF5/VibeVoice), Transformers.</p>
                </div>
                <div className="p-4 border border-white/10 bg-white/5 rounded-xl space-y-2">
                  <div className="text-amber-400 font-bold">02 // BACKEND & ERP ARCHITECTURE</div>
                  <p className="text-white/70 font-sans">Python (FastAPI/Flask), Node.js/Express, Odoo 19 ORM, Asynchronous Job Queues, Multi-currency rollups.</p>
                </div>
                <div className="p-4 border border-white/10 bg-white/5 rounded-xl space-y-2">
                  <div className="text-green-400 font-bold">03 // DATA & PERSISTENCE</div>
                  <p className="text-white/70 font-sans">PostgreSQL compound indexing & N+1 fixes, MongoDB Atlas, In-memory state buffers.</p>
                </div>
                <div className="p-4 border border-white/10 bg-white/5 rounded-xl space-y-2">
                  <div className="text-blue-400 font-bold">04 // SYSTEMS & SECURITY</div>
                  <p className="text-white/70 font-sans">Windows Services watchdogs, Custom DNS proxies, Manifest V3 extensions, Docker.</p>
                </div>
              </div>
            )}

            {/* Tab 4: Experience */}
            {activeSectionTab === 'experience' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="p-4 border border-[var(--accent-border)] bg-[var(--accent-subtle)] rounded-xl space-y-1.5">
                  <div className="font-mono text-[10px] text-[var(--accent)] font-bold uppercase">Current Engagement &middot; 2025 – Present</div>
                  <div className="font-serif font-bold text-white text-base">Applied AI &amp; Systems Engineer</div>
                  <p className="text-white/80">Architecting on-premise QLoRA pipelines, 7-tier multimodal failover DAGs, and enterprise DNS proxies across 35+ workstations.</p>
                </div>
                <div className="p-4 border border-white/10 bg-white/5 rounded-xl space-y-1.5">
                  <div className="font-mono text-[10px] text-white/50 font-bold uppercase">2024 – 2026</div>
                  <div className="font-serif font-bold text-white text-base">Minor in Data Science &amp; AI/ML &middot; IIT Mandi</div>
                  <p className="text-white/70">Rigorous foundation in gradient optimization, transformer architectures, and model evaluation.</p>
                </div>
              </div>
            )}

            {/* Tab 5: Contact */}
            {activeSectionTab === 'contact' && (
              <div className="space-y-3 text-xs font-mono">
                <a
                  href="mailto:harshthanki203@gmail.com"
                  className="p-4 border border-[var(--accent-border)] bg-[var(--accent-subtle)] rounded-xl flex items-center justify-between text-white hover:bg-[var(--accent)] hover:text-black transition-all"
                >
                  <div>
                    <div className="font-bold">harshthanki203@gmail.com</div>
                    <div className="text-[10px] opacity-80 mt-0.5">&lt;24h response SLA &rarr;</div>
                  </div>
                  <Mail className="w-5 h-5" />
                </a>

                <a
                  href="https://github.com/harshthanki-codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-white/10 bg-white/5 rounded-xl flex items-center justify-between text-white hover:border-[var(--accent)] transition-all"
                >
                  <div>
                    <div className="font-bold">github.com/harshthanki-codes</div>
                    <div className="text-[10px] text-white/50 mt-0.5">Code repositories &amp; evals</div>
                  </div>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/harshthanki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-white/10 bg-white/5 rounded-xl flex items-center justify-between text-white hover:border-[var(--accent)] transition-all"
                >
                  <div>
                    <div className="font-bold">linkedin.com/in/harshthanki</div>
                    <div className="text-[10px] text-white/50 mt-0.5">Professional Network</div>
                  </div>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Instructions Banner */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 font-mono text-[11px] text-white/60 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none hidden md:block">
        ⌨️ <span className="text-white font-semibold">WASD / Arrow Keys</span> to Drive &middot; <span className="text-white font-semibold">H</span> to Honk &middot; <span className="text-white font-semibold">R</span> to Reset &middot; Click Top Nav to Glide
      </div>

    </div>
  );
};
