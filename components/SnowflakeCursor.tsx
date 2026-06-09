'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface SnowflakeCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Flake {
  x: number; y: number;
  vx: number; vy: number;
  life: number; size: number;
}

export const SnowflakeCursor: React.FC<SnowflakeCursorProps> = ({ containerRef }) => {
  const flakesRef = useRef<Flake[]>([]);

  useCanvasCursor((ctx, { x, y, height }) => {
    const flakes = flakesRef.current;
    flakes.push({
      x, y,
      vx: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.5,
      vy: Math.random() * 0.8 + 0.3,
      life: 1,
      size: Math.random() * 4 + 3,
    });

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    for (let i = flakes.length - 1; i >= 0; i--) {
      const f = flakes[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.003;
      f.vx += (Math.random() < 0.5 ? -1 : 1) * 0.02;
      f.life -= 0.005;
      if (f.life <= 0 || f.y > height) { flakes.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = f.life * 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size * f.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, { containerRef });

  return null;
};
