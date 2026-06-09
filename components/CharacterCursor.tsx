'use client';
import { useRef, useCallback } from 'react';
import { useCanvasCursor } from '@/hooks/useCanvasCursor';

interface CharacterCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface CharParticle {
  x: number; y: number;
  vx: number; vy: number;
  char: string; color: string;
  life: number; rotation: number;
}

const CHARS = ['h', 'e', 'l', 'o', '✧', '✦', '·', '•', '♦'];
const COLORS = ['#6622CC', '#A755C2', '#B07C9E', '#B59194', '#D2A1B8'];

export const CharacterCursor: React.FC<CharacterCursorProps> = ({ containerRef }) => {
  const particlesRef = useRef<CharParticle[]>([]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, { x, y }: { x: number; y: number }) => {
    const particles = particlesRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

    const count = 2;
    for (let i = 0; i < count; i++) {
      particles.push({
        x, y,
        vx: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 3 + 1),
        vy: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 3 + 1),
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
        rotation: 0,
      });
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.015;
      p.rotation -= 0.05;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * p.life);
      ctx.globalAlpha = p.life * 0.9;
      ctx.font = '14px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = p.color;
      const scale = 0.3 + p.life * 1.2;
      ctx.scale(scale, scale);
      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    }
  }, []);

  useCanvasCursor(draw as any, { containerRef });
  return null;
};
