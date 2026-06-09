'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface SpotlightCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const SpotlightCursor: React.FC<SpotlightCursorProps> = ({ containerRef }) => {
  const smoothRef = useRef({ x: 0, y: 0 });

  useCanvasCursor((ctx, { x, y, width, height }) => {
    const smooth = smoothRef.current;
    smooth.x += (x - smooth.x) * 0.08;
    smooth.y += (y - smooth.y) * 0.08;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 250);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(smooth.x, smooth.y, 250, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
    const glow = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 300);
    glow.addColorStop(0, 'rgba(147, 51, 234, 0.08)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(smooth.x, smooth.y, 300, 0, Math.PI * 2);
    ctx.fill();
  }, { containerRef });

  return null;
};
