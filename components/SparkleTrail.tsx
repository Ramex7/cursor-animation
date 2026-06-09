'use client';
import { useRef, useCallback } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface SparkleTrailProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Sparkle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; size: number;
  color: string;
}

const COLORS = ['#fbbf24', '#f472b6', '#22d3ee', '#a78bfa', '#34d399', '#fb923c'];

export const SparkleTrail: React.FC<SparkleTrailProps> = ({ containerRef }) => {
  const particlesRef = useRef<Sparkle[]>([]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, { x, y }: { x: number; y: number }) => {
    const particles = particlesRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      life: 1,
      size: Math.random() * 3 + 1.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.025;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = p.life * 0.8;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, []);

  useCanvasCursor(draw as any, { containerRef });
  return null;
};
