'use client';

import React, { useEffect, useRef } from 'react';

interface HeroProofWrapperProps {
  children: React.ReactNode;
}

export const HeroProofWrapper: React.FC<HeroProofWrapperProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqHover = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (mqMotion.matches || !mqHover.matches) {
      return;
    }

    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    // Center glow initially
    const rect = container.getBoundingClientRect();
    targetPos.current = { x: rect.width / 2, y: rect.height / 3 };
    currentPos.current = { x: rect.width / 2, y: rect.height / 3 };

    const handlePointerMove = (e: PointerEvent) => {
      const cRect = container.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - cRect.left,
        y: e.clientY - cRect.top,
      };
    };

    // 120ms easing loop
    const animate = () => {
      const easing = 0.08; // ~120ms settling
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * easing;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * easing;

      glow.style.transform = `translate3d(${currentPos.current.x - 300}px, ${currentPos.current.y - 300}px, 0)`;
      rafId.current = requestAnimationFrame(animate);
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-tone="ink"
      className="relative bg-[#16161D] bg-ink-grid overflow-hidden"
    >
      {/* Soft coral radial glow (opacity .18, 600px) that follows pointer */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-18 blur-3xl hidden md:block"
        style={{
          background: 'radial-gradient(circle 300px at center, #FF5A36, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
