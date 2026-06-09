'use client';
import { useRef, useCallback } from 'react';
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

  const draw = useCallback((ctx: CanvasRenderingContext2D, { x, y, height }: { x: number; y: number; height: number }) => {
    const flakes = flakesRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    flakes.push({
      x, y,
      vx: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.4,
      vy: Math.random() * 0.6 + 0.2,
      life: 1,
      size: Math.random() * 3 + 2,
    });

    for (let i = flakes.length - 1; i >= 0; i--) {
      const f = flakes[i];
      f.x += f.vx + Math.sin(f.y * 0.02) * 0.3;
      f.y += f.vy;
      f.vy += 0.004;
      f.life -= 0.006;
      if (f.life <= 0 || f.y > height + 10) { flakes.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = f.life * 0.85;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(255,255,255,0.3)';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size * (0.3 + f.life * 0.7), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, []);

  useCanvasCursor(draw as any, { containerRef });
  return null;
};
