import React, { useEffect, useRef } from 'react';

export interface PredictiveArcProps {
  speed?: number;
  spacing?: number;
  dotSize?: number;
  archHeight?: number;
  thickness?: number;
  brightness?: number;
  hue?: number;
  saturation?: number;
  mode?: 'dark' | 'light';
  className?: string;
  interactive?: boolean;
}

/**
 * Predictive Arc — Interactive Background
 * Based on ThreeUI's authentic animated pixel arch algorithm.
 * Features an animated violet halftone pixel arch with a luminous core.
 */
export default function PredictiveArcBackground({
  speed = 1.0,
  spacing = 5,
  dotSize = 5.5,
  archHeight = 0.65,
  thickness = 1.05,
  brightness = 1.0,
  hue = 0,
  saturation = 1.0,
  mode = 'dark',
  className = '',
  interactive = true,
}: PredictiveArcProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep latest props in a ref so animation loop has zero closure lag
  const optionsRef = useRef({
    speed,
    spacing,
    dotSize,
    archHeight,
    thickness,
    brightness,
    hue,
    saturation,
    mode,
    interactive,
  });

  useEffect(() => {
    optionsRef.current = {
      speed,
      spacing,
      dotSize,
      archHeight,
      thickness,
      brightness,
      hue,
      saturation,
      mode,
      interactive,
    };
  }, [speed, spacing, dotSize, archHeight, thickness, brightness, hue, saturation, mode, interactive]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 1;
    let height = 1;
    let frame = 0;
    let animId = 0;
    let isVisible = true;

    // Mouse tracking for subtle interactive reactivity
    let targetMouseX = 0.5;
    let currentMouseX = 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      if (!optionsRef.current.interactive) return;
      targetMouseX = e.clientX / Math.max(1, window.innerWidth);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const opt = optionsRef.current;
      const isLight = opt.mode === 'light';

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;

      // Dark obsidian background matching portfolio palette
      ctx.fillStyle = isLight ? '#eef1f6' : '#030304';
      ctx.fillRect(0, 0, width, height);

      frame += 0.015 * opt.speed;

      // Center and apex calculations
      // Interactive mouse offset gently shifts the arc apex
      const mouseOffset = opt.interactive ? (currentMouseX - 0.5) * (width * 0.15) : 0;
      const centerX = width / 2 + mouseOffset;
      const apexY = height * 0.32; // arch apex 32% from top
      const spreadX = width * 1.45;
      const curveR = height * opt.archHeight;

      ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';

      const s = Math.max(3, opt.spacing);
      const dot = opt.dotSize;

      for (let x = 0; x < width; x += s) {
        const normX = (x - centerX) / (spreadX / 2);
        const targetY = apexY + normX * normX * curveR;

        for (let y = 0; y < height; y += s) {
          const distY = Math.abs(y - targetY);
          const bandWidth = (140 + (1 - Math.min(1, Math.abs(normX))) * 80) * opt.thickness;

          if (distY >= bandWidth) continue;

          let intensity = 1 - distY / bandWidth;

          // Interference wave formulas from ThreeUI
          const wave1 = Math.sin(x * 0.015 + frame);
          const wave2 = Math.cos(y * 0.02 + frame);
          intensity = intensity * 0.7 + wave1 * wave2 * 0.3 * intensity;

          // Smooth edge falloff
          intensity *= Math.max(0, 1 - Math.pow(Math.abs(normX), 2.5));

          if (intensity <= 0.02) continue;

          let r: number, g: number, b: number;

          if (isLight) {
            r = Math.min(255, 48 * intensity + 70 * Math.pow(intensity, 3));
            g = Math.min(255, 28 * intensity + 45 * Math.pow(intensity, 4));
            b = Math.min(255, 120 * intensity + 110 * Math.pow(intensity, 2));

            if (intensity > 0.7) {
              const core = (intensity - 0.7) * 3.3;
              r = Math.min(255, r + 90 * core);
              g = Math.min(255, g + 70 * core);
              b = Math.min(255, b + 110 * core);
            }
          } else {
            // Authentic violet / ultraviolet spectrum with luminous white-violet core
            r = Math.min(255, 60 * intensity + 100 * Math.pow(intensity, 3));
            g = Math.min(255, 20 * intensity + 60 * Math.pow(intensity, 4));
            b = Math.min(255, 120 * intensity + 135 * Math.pow(intensity, 2));

            // Luminous glowing core
            if (intensity > 0.7) {
              const core = (intensity - 0.7) * 3.3;
              r = Math.min(255, r + 150 * core);
              g = Math.min(255, g + 150 * core);
              b = Math.min(255, b + 150 * core);
            }
          }

          const br = opt.brightness;
          ctx.fillStyle = `rgb(${Math.floor(r * br)}, ${Math.floor(g * br)}, ${Math.floor(b * br)})`;
          ctx.fillRect(x, y, dot * intensity, dot * intensity);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = () => {
      if (isVisible && !document.hidden) {
        render();
        animId = requestAnimationFrame(loop);
      } else {
        animId = 0;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
      render();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(loop);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    });
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden && animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      } else if (!document.hidden && isVisible && !animId) {
        animId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    handleResize();
    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        filter: hue || saturation !== 1 ? `hue-rotate(${hue}deg) saturate(${saturation})` : undefined,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
