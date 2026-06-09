'use client';
import { useRef, useCallback } from 'react';
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

  const draw = useCallback((ctx: CanvasRenderingContext2D, { x, y }: { x: number; y: number }) => {
    const bubbles = bubblesRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    bubbles.push({
      x, y,
      vx: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.5,
      vy: -(Math.random() * 1 + 0.3),
      life: 1,
      size: Math.random() * 6 + 3,
    });

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.x += b.vx + Math.sin(b.life * 10) * 0.2;
      b.y += b.vy;
      b.vy -= 0.003;
      b.life -= 0.01;
      if (b.life <= 0) { bubbles.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = b.life * 0.5;
      ctx.strokeStyle = '#60a5fa';
      ctx.fillStyle = '#e6f1f7';
      ctx.lineWidth = 1;
      const r = b.size * (0.3 + (1 - b.life) * 0.7);
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(b.x - r * 0.3, b.y - r * 0.3, r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fill();
      ctx.restore();
    }
  }, []);

  useCanvasCursor(draw as any, { containerRef });
  return null;
};
