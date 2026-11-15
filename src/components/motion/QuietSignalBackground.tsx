'use client';

import React, { useEffect, useRef } from 'react';

export const QuietSignalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    let width = 0;
    let height = 0;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup viewport sizing with capped DPR (max 1.5)
    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle flow-field definition
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 36 : 80;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      speed: number;
      seed: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      length: 12 + Math.random() * 24,
      speed: 0.35 + Math.random() * 0.45,
      seed: Math.random() * 100,
    }));

    // Mouse tracking for subtle field distortion
    const mouse = { x: -9999, y: -9999 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Update cursor spotlight variable on desktop
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Draw static frame for reduced motion
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(255, 122, 61, 0.08)';
      ctx.lineWidth = 1;

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length * 0.7, p.y + p.length * 0.3);
        ctx.stroke();
      });
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouseMove);
      };
    }

    // Animation Loop
    let time = 0;
    const render = () => {
      if (!isRunning) return;

      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Check current theme
      const isDark = document.documentElement.classList.contains('dark') || 
                     document.documentElement.getAttribute('data-theme') === 'dark';
      
      const strokeColor = isDark 
        ? 'rgba(255, 122, 61, 0.12)' 
        : 'rgba(217, 83, 26, 0.09)';

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base flow direction (drift left-to-right and slightly down)
        const angle = Math.sin(time + p.seed) * 0.4 + 0.2;
        p.vx = Math.cos(angle) * p.speed;
        p.vy = Math.sin(angle) * p.speed;

        // Bending gently toward mouse if within influence radius
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 260) {
          const force = (1 - dist / 260) * 0.35;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport boundaries
        if (p.x > width + 40) p.x = -40;
        if (p.x < -40) p.x = width + 40;
        if (p.y > height + 40) p.y = -40;
        if (p.y < -40) p.y = height + 40;

        // Draw streamline
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * p.length, p.y - p.vy * p.length);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when tab hidden
    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial render call after paint
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Ambient Soft Warm Radial Glows */}
      <div className="absolute inset-0 bg-ambient-glows opacity-90 transition-opacity duration-700" />

      {/* 2. Hero Flow-Field Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 3. Desktop Cursor Spotlight Mask */}
      <div
        className="hidden md:block absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(340px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 122, 61, 0.04), transparent 80%)`,
        }}
      />

      {/* 4. Tactile 4% Film Grain Texture */}
      <div className="absolute inset-0 bg-film-grain opacity-100 mix-blend-overlay" />
    </div>
  );
};
