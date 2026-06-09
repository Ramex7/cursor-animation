'use client';
import { useRef, useCallback } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface GlowCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const GlowCursor: React.FC<GlowCursorProps> = ({ containerRef }) => {
  const hueRef = useRef(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D, { x, y }: { x: number; y: number }) => {
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    hueRef.current = (hueRef.current + 0.3) % 360;
    const hue = hueRef.current;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 140);
    gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, 0.12)`);
    gradient.addColorStop(0.3, `hsla(${(hue + 40) % 360}, 80%, 60%, 0.06)`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 140, 0, Math.PI * 2);
    ctx.fill();

    const inner = ctx.createRadialGradient(x, y, 0, x, y, 50);
    inner.addColorStop(0, `hsla(${hue}, 80%, 80%, 0.06)`);
    inner.addColorStop(1, 'transparent');
    ctx.fillStyle = inner;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  useCanvasCursor(draw as any, { containerRef });
  return null;
};
