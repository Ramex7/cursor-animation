'use client';
import { useEffect, useRef, useCallback } from 'react';

interface CanvasCursorOptions {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  zIndex?: number;
  className?: string;
}

interface CanvasCursorReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function useCanvasCursor(
  draw: (ctx: CanvasRenderingContext2D, state: { x: number; y: number; time: number; width: number; height: number }) => void,
  options: CanvasCursorOptions = {}
): CanvasCursorReturn {
  const { containerRef, zIndex = 9999, className = '' } = options;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawRef = useRef(draw);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrapper = containerRef?.current;
    const dpr = window.devicePixelRatio || 1;
    const w = wrapper ? wrapper.clientWidth : window.innerWidth;
    const h = wrapper ? wrapper.clientHeight : window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
    }
  }, [containerRef]);

  useEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const wrapper = containerRef?.current;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = wrapper ? 'absolute' : 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = String(zIndex);
    if (className) canvas.className = className;

    const target = wrapper || document.body;
    target.appendChild(canvas);
    canvasRef.current = canvas;
    resize();

    const onMove = (e: MouseEvent | Touch) => {
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        posRef.current.x = e.clientX - rect.left;
        posRef.current.y = e.clientY - rect.top;
      } else {
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
    };

    const onMouseMove = (e: MouseEvent) => onMove(e);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) onMove(e.touches[0]);
    };

    const animate = (time: number) => {
      const ctx = ctxRef.current;
      const cvs = canvasRef.current;
      if (!ctx || !cvs) return;
      const wr = containerRef?.current;
      const w = wr ? wr.clientWidth : window.innerWidth;
      const h = wr ? wr.clientHeight : window.innerHeight;
      drawRef.current(ctx, { x: posRef.current.x, y: posRef.current.y, time, width: w, height: h });
      rafRef.current = requestAnimationFrame(animate);
    };

    target.addEventListener('mousemove', onMouseMove);
    target.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      target.removeEventListener('mousemove', onMouseMove);
      target.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', resize);
      canvas.remove();
    };
  }, [containerRef, zIndex, className, resize]);

  return { canvasRef };
}
