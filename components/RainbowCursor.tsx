'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface RainbowCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const COLORS = ['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC'];

function lerpColor(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

export const RainbowCursor: React.FC<RainbowCursorProps> = ({ containerRef }) => {
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useCanvasCursor((ctx, { x, y, time }) => {
    const trail = trailRef.current;
    trail.push({ x, y });
    if (trail.length > 30) trail.shift();

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);
    if (trail.length < 2) return;

    const colorOffset = (time * 0.001) % 1;

    for (let i = 0; i < COLORS.length; i++) {
      const nextIdx = (i + 1) % COLORS.length;
      const t = (i + colorOffset) / COLORS.length;
      ctx.strokeStyle = lerpColor(COLORS[i], COLORS[nextIdx], t);
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y + i * 2);
      for (let j = 1; j < trail.length; j++) {
        ctx.lineTo(trail[j].x, trail[j].y + i * 2);
      }
      ctx.stroke();
    }
  }, { containerRef });

  return null;
};
