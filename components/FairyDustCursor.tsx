'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface FairyDustCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  char: string; color: string;
  life: number; size: number;
}

const CHARS = ['✨', '⭐', '🌟', '★', '*'];
const COLORS = ['#D61C59', '#E7D84B', '#1B8798', '#FF6B6B', '#4ECDC4'];

export const FairyDustCursor: React.FC<FairyDustCursorProps> = ({ containerRef }) => {
  const particlesRef = useRef<Particle[]>([]);

  useCanvasCursor((ctx, { x, y }) => {
    const particles = particlesRef.current;
    particles.push({
      x, y,
      vx: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.5 + 0.3),
      vy: -(Math.random() * 2 + 0.5),
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
      size: Math.random() * 16 + 14,
    });

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life -= 0.015;
      p.vx *= 0.99;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.font = `${p.size * p.life}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, p.x, p.y);
      ctx.restore();
    }
  }, { containerRef });
  return null;
};
