import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { PROJECTS_DATA, type ProjectData } from '../../data/projects';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Mail, 
  ExternalLink,
  Compass,
  Zap,
  Cpu,
  Terminal,
  Sun,
  Moon
} from 'lucide-react';

interface ZoneItem {
  id: string;
  name: string;
  category: string;
  x: number;
  z: number;
  radius: number;
  color: string;
  title: string;
  tagline: string;
  visited: boolean;
}

export const BrunoWorld3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [activeZone, setActiveZone] = useState<ZoneItem | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showDossier, setShowDossier] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('projects');
  const [themeMode, setThemeMode] = useState<'day' | 'night'>('day');

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Physics state refs
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const roverPosRef = useRef<{ x: number; z: number; angle: number; speed: number }>({
    x: 0,
    z: 0,
    angle: 0,
    speed: 0
  });

  const zonesRef = useRef<ZoneItem[]>([
    {
      id: 'projects',
      name: 'PROJECTS',
      category: '7 Technical Systems',
      x: -36,
      z: -36,
      radius: 16,
      color: '#ff5500',
      title: 'Production AI Systems & Deep Architectures',
      tagline: 'Fine-tuned LLMs (QLoRA), 7-tier failover DAGs, Odoo 19 ERP engines, and DNS proxy watchdogs.',
      visited: false
    },
    {
      id: 'skills',
      name: 'SKILLS PLAYGROUND',
      category: 'Interactive Dominoes',
      x: 36,
      z: -36,
      radius: 16,
      color: '#10b981',
      title: 'Engineering Stack & Domino Bowling',
      tagline: 'Ram the car into the skill pins & domino blocks to knock down tech capabilities!',
      visited: false
    },
    {
      id: 'experience',
      name: 'EXPERIENCE',
      category: 'Track Record',
      x: -36,
      z: 36,
      radius: 16,
      color: '#3b82f6',
      title: 'Production Timeline & IIT Mandi AI/ML',
      tagline: 'Verified track record across on-premise AI deployments and distributed backend systems.',
      visited: false
    },
    {
      id: 'telemetry',
      name: 'TELEMETRY HUB',
      category: 'Live Microservice',
      x: 36,
      z: 36,
      radius: 16,
      color: '#f59e0b',
      title: 'Live REST API Mesh & MongoDB Cluster',
      tagline: 'Real-time Node/Express API with live connection pool and telemetry streaming.',
      visited: false
    },
    {
      id: 'contact',
      name: 'CONTACT DEPOT',
      category: 'Direct Dispatch',
      x: 0,
      z: 48,
      radius: 16,
      color: '#ec4899',
      title: 'Initiate Technical Collaboration',
      tagline: 'Direct mail (harshthanki203@gmail.com), GitHub repositories, and LinkedIn.',
      visited: false
    }
  ]);

  // Web Audio Synthesizer (Engine, Bump, Honk, Fanfare)
  const playSound = (type: 'engine' | 'bump' | 'honk' | 'zone' | 'whoosh') => {
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
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'honk') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(460, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
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
          noteOsc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
          noteGain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.07);
          noteGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.07 + 0.25);
          noteOsc.start(ctx.currentTime + i * 0.07);
          noteOsc.stop(ctx.currentTime + i * 0.07 + 0.25);
        });
      } else if (type === 'whoosh') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      }
    } catch {
      // Audio fallback
    }
  };

  // Glide Rover & Camera to Zone
  const teleportTo = (zoneId: string) => {
    const target = zonesRef.current.find(z => z.id === zoneId);
    if (!target) return;
    playSound('whoosh');
    roverPosRef.current.x = target.x;
    roverPosRef.current.z = target.z + 6;
    roverPosRef.current.speed = 0;
    roverPosRef.current.angle = Math.PI;
    setActiveTab(zoneId);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Bruno Simon Stylized Warm Scene
    const scene = new THREE.Scene();
    const isDay = themeMode === 'day';
    
    // Warm sand clay ground vs Obsidian Night
    const bgCol = isDay ? 0xf5eedc : 0x0f1118;
    const floorCol = isDay ? 0xfbf6ea : 0x141822;
    const roadCol = isDay ? 0xede4ce : 0x1c2130;

    scene.background = new THREE.Color(bgCol);
    scene.fog = new THREE.FogExp2(bgCol, 0.009);

    // 2. Isometric Perspective Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 38, 48);

    // 3. High-Quality WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDay ? 1.05 : 1.2;
    container.appendChild(renderer.domElement);

    // 4. Warm Sun Lighting (Bruno Simon signature soft shadows)
    const ambientLight = new THREE.AmbientLight(isDay ? 0xfffaed : 0xffffff, isDay ? 0.95 : 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(isDay ? 0xffeed0 : 0xffdcb5, isDay ? 1.8 : 1.4);
    sunLight.position.set(55, 80, 45);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 250;
    sunLight.shadow.camera.left = -90;
    sunLight.shadow.camera.right = 90;
    sunLight.shadow.camera.top = 90;
    sunLight.shadow.camera.bottom = -90;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Soft sky hemisphere light
    const hemiLight = new THREE.HemisphereLight(isDay ? 0xffffff : 0x3b82f6, isDay ? 0xf0e0c0 : 0x050508, 0.6);
    scene.add(hemiLight);

    // 5. Stylized Playground Ground with Painted Roads & Crossings
    const floorGeo = new THREE.PlaneGeometry(280, 280);
    const floorMat = new THREE.MeshStandardMaterial({
      color: floorCol,
      roughness: 0.9,
      metalness: 0.05
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Central Playground Compass Circle
    const centerRingGeo = new THREE.RingGeometry(8, 8.5, 64);
    const centerRingMat = new THREE.MeshBasicMaterial({ color: isDay ? 0xe2d6ba : 0x2a3248, side: THREE.DoubleSide });
    const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
    centerRing.rotation.x = -Math.PI / 2;
    centerRing.position.y = 0.02;
    scene.add(centerRing);

    // Painted Roads Connecting Sectors
    const roadMat = new THREE.MeshBasicMaterial({ color: roadCol, side: THREE.DoubleSide });
    const hRoad = new THREE.Mesh(new THREE.PlaneGeometry(200, 14), roadMat);
    hRoad.rotation.x = -Math.PI / 2;
    hRoad.position.y = 0.01;
    scene.add(hRoad);

    const vRoad = new THREE.Mesh(new THREE.PlaneGeometry(14, 200), roadMat);
    vRoad.rotation.x = -Math.PI / 2;
    vRoad.position.y = 0.01;
    scene.add(vRoad);

    // Dashed Road Centerlines
    for (let i = -90; i <= 90; i += 8) {
      if (Math.abs(i) < 12) continue;
      const stripeGeo = new THREE.PlaneGeometry(4, 0.6);
      const stripeMat = new THREE.MeshBasicMaterial({ color: isDay ? 0xffffff : 0xff5500, side: THREE.DoubleSide });
      
      const hStripe = new THREE.Mesh(stripeGeo, stripeMat);
      hStripe.rotation.x = -Math.PI / 2;
      hStripe.position.set(i, 0.02, 0);
      scene.add(hStripe);

      const vStripe = new THREE.Mesh(stripeGeo, stripeMat);
      vStripe.rotation.x = -Math.PI / 2;
      vStripe.rotation.z = Math.PI / 2;
      vStripe.position.set(0, 0.02, i);
      scene.add(vStripe);
    }

    // 6. Construct Adorable Red Bruno RC Truck
    const carGroup = new THREE.Group();

    // Red Body Chassis
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.9, 4.2);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      roughness: 0.2,
      metalness: 0.1
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.85;
    chassis.castShadow = true;
    carGroup.add(chassis);

    // White Roof / Cabin
    const cabinGeo = new THREE.BoxGeometry(2.0, 0.85, 2.2);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.05
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 1.6, -0.2);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Tinted Glass Windshield
    const windshieldGeo = new THREE.BoxGeometry(1.9, 0.6, 0.2);
    const windshieldMat = new THREE.MeshStandardMaterial({ color: 0x112233, roughness: 0.1 });
    const windshield = new THREE.Mesh(windshieldGeo, windshieldMat);
    windshield.position.set(0, 1.55, -1.32);
    carGroup.add(windshield);

    // Yellow Headlights
    const lightGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.1, 16);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffea00 });
    
    const lLight = new THREE.Mesh(lightGeo, lightMat);
    lLight.rotation.x = Math.PI / 2;
    lLight.position.set(-0.8, 0.85, -2.12);
    carGroup.add(lLight);

    const rLight = new THREE.Mesh(lightGeo, lightMat);
    rLight.rotation.x = Math.PI / 2;
    rLight.position.set(0.8, 0.85, -2.12);
    carGroup.add(rLight);

    // Yellow Headlight Cones
    const spotL = new THREE.SpotLight(0xfff088, 4, 30, Math.PI / 6, 0.5);
    spotL.position.set(0, 1.0, -2.0);
    spotL.target.position.set(0, 0, -18);
    carGroup.add(spotL);
    carGroup.add(spotL.target);

    // 4 Stylized Chunky Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    const hubMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2 });

    const wheels: THREE.Mesh[] = [];
    const wheelPositions = [
      [-1.35, 0.6, -1.3],
      [1.35, 0.6, -1.3],
      [-1.35, 0.6, 1.3],
      [1.35, 0.6, 1.3]
    ];

    wheelPositions.forEach((pos, idx) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.52, 16), hubMat);
      wheel.add(hub);

      wheels.push(wheel);
      carGroup.add(wheel);
    });

    scene.add(carGroup);

    // 7. Interactive Physics Obstacles (Bowling Pins & Domino Crates)
    interface PhysicsItem {
      mesh: THREE.Mesh | THREE.Group;
      vx: number;
      vz: number;
      rotV: number;
      isPin?: boolean;
    }
    const physicsItems: PhysicsItem[] = [];

    // Create 3D Bowling Pins in the Skills Zone
    const createBowlingPins = () => {
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0xff3300, roughness: 0.3 });

      const pinGeo = new THREE.CylinderGeometry(0.35, 0.6, 2.2, 16);
      const topGeo = new THREE.SphereGeometry(0.4, 16, 16);

      const rows = 4;
      let count = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c <= r; c++) {
          const pinGroup = new THREE.Group();
          const body = new THREE.Mesh(pinGeo, pinMat);
          body.position.y = 1.1;
          body.castShadow = true;
          pinGroup.add(body);

          const head = new THREE.Mesh(topGeo, stripeMat);
          head.position.y = 2.3;
          head.castShadow = true;
          pinGroup.add(head);

          const px = 32 + (c - r * 0.5) * 2.2;
          const pz = -38 + r * 2.2;

          pinGroup.position.set(px, 0, pz);
          scene.add(pinGroup);
          physicsItems.push({ mesh: pinGroup, vx: 0, vz: 0, rotV: 0, isPin: true });
          count++;
        }
      }
    };
    createBowlingPins();

    // Create Wooden Domino Crates across the map
    const createWoodenCrates = () => {
      const crateGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
      const crateColors = [0xe5a65d, 0xd48b3b, 0x5fa8d3, 0x62b6cb, 0xf4a261];

      const crateClusters = [
        { x: -16, z: -16 },
        { x: 16, z: -16 },
        { x: 16, z: 16 },
        { x: -16, z: 16 }
      ];

      crateClusters.forEach((cluster, cIdx) => {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const mat = new THREE.MeshStandardMaterial({
              color: crateColors[(cIdx + i + j) % crateColors.length],
              roughness: 0.7
            });
            const crate = new THREE.Mesh(crateGeo, mat);
            crate.position.set(cluster.x + (i - 1) * 2.2, 0.9 + (i === 1 && j === 1 ? 1.8 : 0), cluster.z + (j - 1) * 2.2);
            crate.castShadow = true;
            crate.receiveShadow = true;
            scene.add(crate);
            physicsItems.push({ mesh: crate, vx: 0, vz: 0, rotV: 0 });
          }
        }
      });
    };
    createWoodenCrates();

    // 8. Construct 3D Architectural Sector Monuments & Billboards
    zonesRef.current.forEach(zone => {
      // Sector Floor Ring
      const ringGeo = new THREE.RingGeometry(zone.radius - 0.6, zone.radius, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: zone.color, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(zone.x, 0.03, zone.z);
      scene.add(ring);

      // Central Pillar Monument
      const pillarGeo = new THREE.CylinderGeometry(1.6, 2.2, 6.5, 8);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: zone.color,
        roughness: 0.3,
        metalness: 0.4
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(zone.x, 3.25, zone.z);
      pillar.castShadow = true;
      scene.add(pillar);

      // Floating 3D Geometric Emblem
      const emblemGeo = new THREE.OctahedronGeometry(1.4, 0);
      const emblemMat = new THREE.MeshStandardMaterial({
        color: isDay ? 0xffffff : 0xffeedd,
        roughness: 0.1,
        metalness: 0.8
      });
      const emblem = new THREE.Mesh(emblemGeo, emblemMat);
      emblem.position.set(zone.x, 8.5, zone.z);
      emblem.castShadow = true;
      scene.add(emblem);
    });

    // 9. Controls Event Listeners
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

      const accel = 42.0;
      const maxSpeed = 26.0;
      const friction = 0.94;
      const turnSpeed = 3.2;

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

      // Steering with drift effect
      if (Math.abs(rover.speed) > 0.15) {
        const dir = rover.speed < 0 ? 1 : -1;
        if (isLeft) rover.angle += turnSpeed * delta * dir;
        if (isRight) rover.angle -= turnSpeed * delta * dir;
      }

      // Update position
      rover.x += Math.sin(rover.angle) * rover.speed * delta;
      rover.z += Math.cos(rover.angle) * rover.speed * delta;

      // Arena boundary limits (-95 to 95)
      rover.x = Math.max(-95, Math.min(95, rover.x));
      rover.z = Math.max(-95, Math.min(95, rover.z));

      // Sync 3D Car Mesh
      carGroup.position.set(rover.x, 0, rover.z);
      carGroup.rotation.y = rover.angle;

      // Wheel spinning animation
      wheels.forEach(w => {
        w.rotation.x += rover.speed * delta * 2.5;
      });

      // Update Speedometer
      const currentSpeed = Math.round(Math.abs(rover.speed) * 4.8);
      setSpeed(currentSpeed);

      // Physics box & bowling pin collisions
      physicsItems.forEach(item => {
        const dist = Math.hypot(rover.x - item.mesh.position.x, rover.z - item.mesh.position.z);
        if (dist < 3.0) {
          const angle = Math.atan2(item.mesh.position.z - rover.z, item.mesh.position.x - rover.x);
          item.vx = Math.cos(angle) * (Math.abs(rover.speed) + 7);
          item.vz = Math.sin(angle) * (Math.abs(rover.speed) + 7);
          item.rotV = (Math.random() - 0.5) * 7;
          playSound('bump');
          rover.speed *= 0.65;
        }

        item.mesh.position.x += item.vx * delta;
        item.mesh.position.z += item.vz * delta;
        item.mesh.rotation.y += item.rotV * delta;
        item.mesh.rotation.z += item.rotV * delta * 0.6;

        item.vx *= 0.93;
        item.vz *= 0.93;
        item.rotV *= 0.93;
      });

      // Check Zone Triggers
      let inside: ZoneItem | null = null;
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
              particleCount: 70,
              spread: 80,
              origin: { y: 0.5 }
            });
          }
        }
      });

      setActiveZone(inside);

      // Smooth Isometric Follow Camera
      const targetCamX = rover.x - Math.sin(rover.angle) * -22;
      const targetCamZ = rover.z - Math.cos(rover.angle) * -22;
      const targetCamY = 16;

      camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.08);
      camera.lookAt(rover.x, 1.6, rover.z);

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
  }, [themeMode, isMuted]);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none font-mono">
      
      {/* 🌟 BRUNO SIMON VINTAGE ARCADE HEADER (Single Cohesive Navigation Bar) */}
      <header className="absolute top-0 left-0 right-0 z-30 h-16 bg-black/75 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4 text-white">
        
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5500] animate-ping"></div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              <span>HARSH THANKI</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff5500] text-black font-extrabold uppercase">
                AI &middot; MERN
              </span>
            </div>
            <div className="text-[10px] text-white/50 tracking-wider">
              APPLIED AI SYSTEMS ENGINEER
            </div>
          </div>
        </div>

        {/* Desktop Quick-Glide Zone Navigators */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-white/10 border border-white/15 rounded-full text-xs" aria-label="Sector Navigation">
          <button
            type="button"
            onClick={() => teleportTo('projects')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'projects' 
                ? 'bg-[#ff5500] text-black font-bold shadow-md' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            01 // Projects
          </button>

          <button
            type="button"
            onClick={() => teleportTo('skills')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'skills' 
                ? 'bg-[#ff5500] text-black font-bold shadow-md' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            02 // Skills
          </button>

          <button
            type="button"
            onClick={() => teleportTo('experience')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'experience' 
                ? 'bg-[#ff5500] text-black font-bold shadow-md' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            03 // Timeline
          </button>

          <button
            type="button"
            onClick={() => teleportTo('telemetry')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'telemetry' 
                ? 'bg-[#ff5500] text-black font-bold shadow-md' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            04 // Telemetry
          </button>

          <button
            type="button"
            onClick={() => teleportTo('contact')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeZone?.id === 'contact' 
                ? 'bg-[#ff5500] text-black font-bold shadow-md' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            05 // Contact
          </button>
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowDossier(true)}
            className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs text-white flex items-center gap-1.5 transition-all shadow-xs"
            title="Open Structured Engineering Dossier"
          >
            <Layers className="w-3.5 h-3.5 text-[#ff5500]" />
            <span className="hidden sm:inline">Dossier / List</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeMode(prev => prev === 'day' ? 'night' : 'day')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            title="Toggle Day / Night Mode"
          >
            {themeMode === 'day' ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMuted(prev => !prev)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            title={isMuted ? "Unmute Engine Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#ff5500]" />}
          </button>
        </div>

      </header>

      {/* 🎮 FULLSCREEN 3D WEBGL PLAYGROUND */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 🧭 BOTTOM-LEFT MINI-MAP RADAR & SPEEDOMETER */}
      <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3 pointer-events-none">
        
        {/* Radar Blip Box */}
        <div className="p-3 bg-black/75 border border-white/15 backdrop-blur-xl rounded-2xl w-36 h-36 relative overflow-hidden flex items-center justify-center pointer-events-auto shadow-2xl">
          <div className="absolute inset-0 rounded-full border border-white/15"></div>
          <div className="absolute w-24 h-24 rounded-full border border-white/10"></div>
          <div className="absolute w-12 h-12 rounded-full border border-white/10"></div>
          
          {/* Center Red Car Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 z-10 shadow-[0_0_8px_red]"></div>

          {/* Sector Radar Blips */}
          {zonesRef.current.map(z => {
            const relX = (z.x / 100) * 50;
            const relZ = (z.z / 100) * 50;
            return (
              <div
                key={z.id}
                style={{ transform: `translate(${relX}px, ${relZ}px)` }}
                className={`absolute w-2.5 h-2.5 rounded-full ${z.visited ? 'bg-green-400' : 'bg-orange-400'} animate-pulse`}
                title={z.name}
              />
            );
          })}

          <div className="absolute bottom-1.5 left-2.5 text-[9px] text-white/50 uppercase font-mono">
            GPS Radar &middot; 5 Sectors
          </div>
        </div>

        {/* Speedometer */}
        <div className="p-3 bg-black/75 border border-white/15 backdrop-blur-xl rounded-xl flex items-center justify-between gap-4 text-xs text-white shadow-xl">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff5500]" />
            <span className="font-bold">{speed} km/h</span>
          </div>
          <div className="text-white/40">|</div>
          <div className="text-[10px] text-white/60">Bruno Mode</div>
        </div>

      </div>

      {/* 📍 ACTIVE SECTOR FLOATING BILLBOARD (Discovered on Drive) */}
      {activeZone && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/90 border border-white/20 backdrop-blur-2xl p-6 rounded-2xl max-w-lg w-[92%] text-white shadow-2xl z-30 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase px-3 py-1 rounded-full bg-[#ff5500] text-black font-extrabold tracking-wider">
              {activeZone.category}
            </span>
            <span className="text-xs text-green-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              SECTOR ARRIVAL
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
                setShowDossier(true);
                setActiveTab(activeZone.id);
              }}
              className="px-4 py-2 rounded-lg bg-[#ff5500] text-black font-bold text-xs flex items-center gap-1.5 hover:shadow-lg transition-all"
            >
              <span>Inspect Sector Data</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-[10px] text-white/40 font-mono">
              Press R to Reset Car
            </span>
          </div>
        </div>
      )}

      {/* 📱 MOBILE TOUCH JOYSTICK */}
      <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-2.5 sm:hidden z-20">
        <div></div>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['w'] = true; }}
          onTouchEnd={() => { keysRef.current['w'] = false; }}
          className="w-14 h-14 rounded-2xl bg-black/60 active:bg-[#ff5500] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
          aria-label="Drive Forward"
        >
          ▲
        </button>
        <div></div>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['a'] = true; }}
          onTouchEnd={() => { keysRef.current['a'] = false; }}
          className="w-14 h-14 rounded-2xl bg-black/60 active:bg-[#ff5500] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
          aria-label="Turn Left"
        >
          ◀
        </button>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['s'] = true; }}
          onTouchEnd={() => { keysRef.current['s'] = false; }}
          className="w-14 h-14 rounded-2xl bg-black/60 active:bg-[#ff5500] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
          aria-label="Drive Backward"
        >
          ▼
        </button>
        <button
          type="button"
          onTouchStart={() => { keysRef.current['d'] = true; }}
          onTouchEnd={() => { keysRef.current['d'] = false; }}
          className="w-14 h-14 rounded-2xl bg-black/60 active:bg-[#ff5500] text-white font-bold text-xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
          aria-label="Turn Right"
        >
          ▶
        </button>
      </div>

      {/* 📖 FULL STRUCTURED ENGINEERING DOSSIER DRAWER */}
      {showDossier && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0e1117] border-l border-white/15 h-full overflow-y-auto p-6 sm:p-8 space-y-6 text-white animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff5500] text-black font-bold">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white uppercase">Harsh Thanki &middot; Technical Dossier</h3>
                  <span className="text-xs text-white/50">Applied AI &middot; MERN Systems Architect</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowDossier(false);
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
              {['projects', 'skills', 'experience', 'telemetry', 'contact'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all uppercase ${
                    activeTab === tab
                      ? 'border-[#ff5500] bg-[#ff5500] text-black font-bold'
                      : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: 7 Case Studies */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="text-xs text-white/60">
                  Select any production system to inspect empirical benchmarks, constraints, and architecture DAGs:
                </div>

                <div className="space-y-3">
                  {PROJECTS_DATA.map((proj, idx) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProject(proj)}
                      className="p-4 border border-white/10 bg-white/5 hover:border-[#ff5500] rounded-xl cursor-pointer transition-all hover:bg-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-[#ff5500] font-bold uppercase">
                          [0{idx + 1}] &middot; {proj.statusDetail}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">Deep Dive &rarr;</span>
                      </div>
                      <div className="font-serif font-bold text-white text-base">{proj.title}</div>
                      <p className="text-xs text-white/70 font-sans line-clamp-2">{proj.tagline}</p>
                    </div>
                  ))}
                </div>

                {/* Selected Project Breakdown */}
                {selectedProject && (
                  <div className="p-6 border border-[#ff5500] bg-black/90 rounded-xl space-y-5 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-[#ff5500] uppercase">{selectedProject.statusDetail}</span>
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
                        <div className="text-[10px] text-[#ff5500] uppercase font-bold mb-1">03 // Architecture</div>
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

            {/* Tab 2: Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 border border-white/10 bg-white/5 rounded-xl space-y-2">
                  <div className="text-[#ff5500] font-bold">01 // APPLIED AI & LLM SYSTEMS</div>
                  <p className="text-white/70 font-sans">QLoRA / PEFT 4-bit quantization, Ollama Airgapped Runtime, Speech Synthesis (IndicF5/VibeVoice), HuggingFace Transformers.</p>
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

            {/* Tab 3: Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="p-4 border border-[#ff5500] bg-[#ff5500]/10 rounded-xl space-y-1.5">
                  <div className="font-mono text-[10px] text-[#ff5500] font-bold uppercase">Current Engagement &middot; 2025 – Present</div>
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

            {/* Tab 4: Telemetry */}
            {activeTab === 'telemetry' && (
              <div className="p-5 border border-white/10 bg-white/5 rounded-xl space-y-4 text-xs font-mono">
                <div className="text-[#ff5500] font-bold text-sm">// LIVE MERN TELEMETRY ENGINE</div>
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

            {/* Tab 5: Contact */}
            {activeTab === 'contact' && (
              <div className="space-y-3 text-xs font-mono">
                <a
                  href="mailto:harshthanki203@gmail.com"
                  className="p-4 border border-[#ff5500] bg-[#ff5500]/10 rounded-xl flex items-center justify-between text-white hover:bg-[#ff5500] hover:text-black transition-all"
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
                  className="p-4 border border-white/10 bg-white/5 rounded-xl flex items-center justify-between text-white hover:border-[#ff5500] transition-all"
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
                  className="p-4 border border-white/10 bg-white/5 rounded-xl flex items-center justify-between text-white hover:border-[#ff5500] transition-all"
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
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 font-mono text-[11px] text-white/70 bg-black/75 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15 shadow-2xl pointer-events-none hidden md:block">
        ⌨️ <span className="text-white font-bold">WASD / Arrow Keys</span> to Drive &middot; <span className="text-white font-bold">H</span> to Honk &middot; <span className="text-white font-bold">R</span> to Reset &middot; Click Top Nav to Glide
      </div>

    </div>
  );
};
