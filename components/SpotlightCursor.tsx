'use client';
import { useRef, useCallback } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface SpotlightCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const SpotlightCursor: React.FC<SpotlightCursorProps> = ({ containerRef }) => {
  const smoothRef = useRef({ x: -500, y: -500 });

  const draw = useCallback((ctx: CanvasRenderingContext2D, { x, y, width, height }: { x: number; y: number; width: number; height: number }) => {
    const smooth = smoothRef.current;
    smooth.x += (x - smooth.x) * 0.12;
    smooth.y += (y - smooth.y) * 0.12;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'destination-out';
    const gradient = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 250);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(smooth.x, smooth.y, 250, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
    const glow = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 300);
    glow.addColorStop(0, 'rgba(147, 51, 234, 0.1)');
    glow.addColorStop(0.5, 'rgba(147, 51, 234, 0.04)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(smooth.x, smooth.y, 300, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  useCanvasCursor(draw as any, { containerRef });
  return null;
};
