'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface CharacterCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface CharParticle {
  x: number; y: number;
  vx: number; vy: number;
  char: string; color: string;
  life: number; rotation: number;
}

const CHARS = ['h', 'e', 'l', 'o', '✧', '✦', '·'];
const COLORS = ['#6622CC', '#A755C2', '#B07C9E', '#B59194', '#D2A1B8'];

export const CharacterCursor: React.FC<CharacterCursorProps> = ({ containerRef }) => {
  const particlesRef = useRef<CharParticle[]>([]);

  useCanvasCursor((ctx, { x, y }) => {
    const particles = particlesRef.current;
    particles.push({
      x, y,
      vx: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 4,
      vy: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 4,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
      rotation: 0,
    });

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx += (Math.random() < 0.5 ? -1 : 1) * 0.03;
      p.vy += (Math.random() < 0.5 ? -1 : 1) * 0.06;
      p.life -= 0.01;
      p.rotation -= 0.05;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * p.life);
      ctx.globalAlpha = p.life;
      ctx.font = '16px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = p.color;
      const scale = 0.5 + p.life * 1.5;
      ctx.scale(scale, scale);
      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    }
  }, { containerRef });

  return null;
};
