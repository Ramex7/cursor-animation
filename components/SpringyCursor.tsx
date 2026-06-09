'use client';
import { useRef } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface SpringyCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface SpringPoint {
  x: number; y: number;
  vx: number; vy: number;
}

const N_DOTS = 7;
const SEGLEN = 12;
const SPRINGK = 12;
const MASS = 1;
const GRAVITY = 60;
const RESISTANCE = 12;
const STOP_VEL = 0.1;
const BOUNCE = 0.7;

export const SpringyCursor: React.FC<SpringyCursorProps> = ({ containerRef }) => {
  const dotsRef = useRef<SpringPoint[]>([]);

  useCanvasCursor((ctx, { x, y, width, height }) => {
    const dots = dotsRef.current;
    if (dots.length === 0) {
      for (let i = 0; i < N_DOTS; i++) dots.push({ x, y, vx: 0, vy: 0 });
    }

    dots[0].x = x;
    dots[0].y = y;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    for (let i = 1; i < N_DOTS; i++) {
      const dot = dots[i];
      const prev = dots[i - 1];
      const next = dots[i + 1];

      let fx = 0, fy = 0;
      const dx1 = prev.x - dot.x, dy1 = prev.y - dot.y;
      const len1 = Math.hypot(dx1, dy1);
      if (len1 > SEGLEN) {
        const f = SPRINGK * (len1 - SEGLEN);
        fx += (dx1 / len1) * f;
        fy += (dy1 / len1) * f;
      }

      if (next) {
        const dx2 = next.x - dot.x, dy2 = next.y - dot.y;
        const len2 = Math.hypot(dx2, dy2);
        if (len2 > SEGLEN) {
          const f = SPRINGK * (len2 - SEGLEN);
          fx += (dx2 / len2) * f;
          fy += (dy2 / len2) * f;
        }
      }

      const ax = (fx - dot.vx * RESISTANCE) / MASS;
      const ay = (fy - dot.vy * RESISTANCE) / MASS + GRAVITY;

      dot.vx += 0.01 * ax;
      dot.vy += 0.01 * ay;

      if (Math.abs(dot.vx) < STOP_VEL && Math.abs(dot.vy) < STOP_VEL && Math.abs(ax) < 0.1 && Math.abs(ay) < 0.1) {
        dot.vx = 0; dot.vy = 0;
      }

      dot.x += dot.vx;
      dot.y += dot.vy;

      if (dot.y >= height - 11) { dot.vy *= -BOUNCE; dot.y = height - 11; }
      if (dot.x >= width - 11) { dot.vx *= -BOUNCE; dot.x = width - 11; }
      if (dot.x < 0) { dot.vx *= -BOUNCE; dot.x = 0; }

      const alpha = 1 - i / N_DOTS;
      const size = 10 - i * 1.2;

      ctx.save();
      ctx.globalAlpha = alpha * 0.8;
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = alpha * 0.4;
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(dot.x, dot.y);
      ctx.stroke();
      ctx.restore();
    }
  }, { containerRef });

  return null;
};
