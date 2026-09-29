'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ParticleData {
  x: number;
  y: number;
  posX: number;
  posY: number;
  randX: number;
  randY: number;
  rotate: number;
  scale: number;
  delay: number;
  blur: number;
}

interface ParticleCardProps {
  name?: string;
  role?: string;
  bio?: string;
  img?: string;
  tags?: string[];
  cols?: number;
  rows?: number;
}

const Particle = ({
  p,
  active,
  img,
  cols,
  rows,
}: {
  p: ParticleData;
  active: boolean;
  img: string;
  cols: number;
  rows: number;
}) => {
  const backgroundStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: `${cols * 100}% ${rows * 100}%`,
    backgroundPosition: `${p.posX}% ${p.posY}%`,
    backgroundRepeat: 'no-repeat',
  };

  const finalTransform = `translate3d(${p.randX * 1.5}px, ${p.randY * 1.5}px, 0) rotate(${p.rotate * 2}deg) scale(${p.scale * 0.8})`;

  const style: React.CSSProperties = {
    ...backgroundStyle,
    transition: `transform 5400ms cubic-bezier(.2,.8,.2,1) ${p.delay}ms, opacity 5400ms ease-in ${p.delay + 500}ms`,
    transform: active ? finalTransform : 'translate3d(0,0,0) rotate(0deg) scale(1)',
    opacity: active ? 0 : 1,
    boxShadow: active ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    borderRadius: active ? 4 : 0,
    width: '100.5%',
    height: '100.5%',
    willChange: 'transform, opacity',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  return (
    <div
      style={{
        width: `${100 / cols}%`,
        height: `${100 / rows}%`,
        position: 'absolute',
        left: `${(p.x / cols) * 100}%`,
        top: `${(p.y / rows) * 100}%`,
      }}
    >
      <div style={style} />
    </div>
  );
};

export default function ParticleCard({
  name = 'Harsh Thanki',
  role = 'AI Architect & Solutions Engineer',
  bio = 'Verified production systems operator. Open for technical discussions, high-impact consulting, and strategic engineering contracts.',
  img = '/Portfolio_Website/images/harsh-thanki.png',
  tags = ['Python', 'FastAPI', 'PyTorch', 'Distributed Systems'],
  cols = 20,
  rows = 24,
}: ParticleCardProps) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particles = useMemo(() => {
    const arr: ParticleData[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = (x / (cols - 1)) * 100;
        const posY = (y / (rows - 1)) * 100;
        const centerX = cols / 2;
        const centerY = rows / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const spread = 150 + Math.random() * 300;
        const randX = Math.cos(angle) * spread * (1 + Math.random() * 0.5);
        const randY = Math.sin(angle) * spread * (1 + Math.random() * 0.5);
        const rotate = (Math.random() * 2 - 1) * 180;
        const scale = 0.5 + Math.random() * 0.5;
        const delay = distance * 20 + Math.random() * 150;
        const blur = Math.random() * 2;
        arr.push({ x, y, posX, posY, randX, randY, rotate, scale, delay, blur });
      }
    }
    return arr;
  }, [cols, rows]);

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <motion.div
        className={cn(
          'relative h-[450px] w-[320px] cursor-pointer overflow-hidden rounded-2xl shadow-2xl',
          'border border-white/10',
          'group select-none'
        )}
        style={{ background: '#0e0f14' }}
        initial={false}
        animate={active ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onHoverStart={() => !isMobile && setActive(true)}
        onHoverEnd={() => !isMobile && setActive(false)}
        onClick={() => isMobile && setActive((v) => !v)}
      >
        {/* --- Background Content (Revealed on Hover) --- */}
        <div
          className="absolute inset-0 z-0 flex flex-col p-6 pt-5 pb-6"
          style={{ background: 'linear-gradient(135deg, #111318 0%, #0a0b0f 100%)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex h-full flex-col gap-4"
          >
            <div>
              <h3 className="m-0 text-2xl font-bold text-white">{name}</h3>
              <p className="m-0 mt-1 text-sm font-mono font-semibold" style={{ color: '#f97316' }}>
                {role}
              </p>
            </div>

            <p className="m-0 flex-1 text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
              {bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-md border px-3 py-1 text-xs font-mono font-semibold text-white transition-colors duration-300"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#scoper"
              className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}
            >
              Scope a Project
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* --- Foreground Image / Particles (Vanish on Hover) --- */}
        <div className="absolute inset-0 z-10 h-full w-full">
          {/* Static Image */}
          <img
            src={img}
            alt={name}
            className={cn(
              'pointer-events-none absolute top-0 left-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-out',
              active ? 'opacity-0' : 'opacity-100'
            )}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.onerror = null;
              t.src = img.replace('.png', '.webp');
            }}
          />

          {/* Overlay Gradient */}
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              active ? 'opacity-0' : 'opacity-100'
            )}
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
          />

          {/* Name + Role Overlay */}
          <div
            className={cn(
              'absolute right-0 bottom-0 left-0 transform p-6 transition-all duration-500',
              active ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
            )}
          >
            <h2 className="mb-1 text-2xl font-bold text-white">{name}</h2>
            <p className="font-mono text-sm font-semibold" style={{ color: '#fb923c' }}>{role}</p>
          </div>

          {/* Particle Grid */}
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            {particles.map((p, i) => (
              <Particle key={i} p={p} active={active} img={img} cols={cols} rows={rows} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
