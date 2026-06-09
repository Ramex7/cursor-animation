'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface CanvasTrailCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const CanvasTrailCursor: React.FC<CanvasTrailCursorProps> = ({ containerRef }) => {
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const hueRef = useRef(200);

  useCanvasCursor((ctx, { x, y }) => {
    const points = pointsRef.current;
    points.push({ x, y });
    if (points.length > 40) points.shift();

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    if (points.length < 3) return;

    hueRef.current = (hueRef.current + 0.5) % 360;
    const hue = hueRef.current;

    ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.3)`;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.stroke();

    ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.15)`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.stroke();
  }, { containerRef });

  return null;
};
