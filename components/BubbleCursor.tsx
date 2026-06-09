'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface BubbleCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Bubble {
  x: number; y: number;
  vx: number; vy: number;
  life: number; size: number;
}

export const BubbleCursor: React.FC<BubbleCursorProps> = ({ containerRef }) => {
  const bubblesRef = useRef<Bubble[]>([]);

  useCanvasCursor((ctx, { x, y }) => {
    const bubbles = bubblesRef.current;
    bubbles.push({
      x, y,
      vx: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.3,
      vy: -(Math.random() * 0.8 + 0.2),
      life: 1,
      size: Math.random() * 6 + 4,
    });

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx += (Math.random() < 0.5 ? -1 : 1) * 0.02;
      b.vy -= 0.002;
      b.life -= 0.008;
      if (b.life <= 0) { bubbles.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = b.life * 0.6;
      ctx.strokeStyle = '#3a92c5';
      ctx.fillStyle = '#e6f1f7';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size * (0.3 + (1 - b.life) * 0.7), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }, { containerRef });

  return null;
};
