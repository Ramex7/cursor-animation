export const smoothFollowerCode = `'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function SmoothFollower({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 300 });
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    el.addEventListener('mouseenter', () => setIsInside(true));
    el.addEventListener('mouseleave', () => setIsInside(false));
    return () => { el.removeEventListener('mouseenter', () => setIsInside(true));
      el.removeEventListener('mouseleave', () => setIsInside(false)); };
  }, [containerRef]);

  useEffect(() => {
    const handler = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  if (!isInside) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="absolute -top-5 -left-5 w-10 h-10 border-2 border-amber-400/30 rounded-full"
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-3 -left-3 w-6 h-6 border border-amber-400/50 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.7)]" />
      </motion.div>
    </div>
  );
}`;

export const clickRippleCode = `'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#f472b6', '#34d399'];

export function ClickRipple({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    el.addEventListener('mouseenter', () => setIsInside(true));
    el.addEventListener('mouseleave', () => setIsInside(false));
    return () => { el.removeEventListener('mouseenter', () => setIsInside(true));
      el.removeEventListener('mouseleave', () => setIsInside(false)); };
  }, [containerRef]);

  const addRipple = useCallback((e: MouseEvent) => {
    const el = containerRef?.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(prev => [...prev, {
      id, x: e.clientX - rect.left, y: e.clientY - rect.top,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000);
  }, [containerRef]);

  useEffect(() => {
    if (!isInside) return;
    containerRef?.current?.addEventListener('click', addRipple);
    return () => containerRef?.current?.removeEventListener('click', addRipple);
  }, [isInside, containerRef, addRipple]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div key={r.id} className="absolute" style={{ left: r.x, top: r.y }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: \`radial-gradient(circle, \${r.color}40 0%, \${r.color}20 40%, transparent 70%)\`,
                border: \`2px solid \${r.color}\`,
                boxShadow: \`0 0 20px \${r.color}60\`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`;

export const textMorphCode = `'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LABELS = ['CLICK', 'HOVER', '✨', '👆', '★'];

export function TextMorph({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState(LABELS[0]);
  const [isInside, setIsInside] = useState(false);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    el.addEventListener('mouseenter', () => setIsInside(true));
    el.addEventListener('mouseleave', () => { setIsInside(false); setIsHovering(false); });
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      setIsHovering(!!target);
      if (target) setLabel(LABELS[Math.floor(Math.random() * LABELS.length)]);
    });
    return () => { cancelAnimationFrame(rafRef.current); };
  }, [containerRef]);

  useEffect(() => {
    const loop = () => { setPos({ ...mouseRef.current }); rafRef.current = requestAnimationFrame(loop); };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!isInside) return null;

  return (
    <motion.div className="absolute pointer-events-none"
      style={{ left: pos.x, top: pos.y, zIndex: 9999, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div className="flex items-center justify-center rounded-full"
        animate={{
          width: isHovering ? 96 : 14,
          height: isHovering ? 96 : 14,
          background: isHovering ? 'linear-gradient(135deg, #10b981, #3b82f6)' : '#10b981',
        }}
        transition={{ type: "spring", damping: 18, stiffness: 260, mass: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {isHovering && (
            <motion.span key={label}
              initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 20 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-bold text-white select-none"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}`;

export const trailSnakeCode = `'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#a78bfa', '#818cf8', '#6366f1', '#8b5cf6', '#7c3aed'];

export function TrailSnake({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isInside, setIsInside] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    el.addEventListener('mouseenter', () => setIsInside(true));
    el.addEventListener('mouseleave', () => { setIsInside(false); setTrail([]); trailRef.current = []; });
    return () => { el.removeEventListener('mouseenter', () => setIsInside(true));
      el.removeEventListener('mouseleave', () => setIsInside(false)); };
  }, [containerRef]);

  useEffect(() => {
    if (!isInside) return;
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdateRef.current < 16) {
        trailRef.current = [{ x: e.clientX, y: e.clientY }, ...trailRef.current].slice(0, 16);
        return;
      }
      lastUpdateRef.current = now;
      const next = [{ x: e.clientX, y: e.clientY }, ...trailRef.current].slice(0, 16);
      trailRef.current = next;
      setTrail(next);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [isInside]);

  if (!isInside) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {trail.map((p, i) => {
        const size = Math.max(10 - i * 0.6, 2);
        return (
          <motion.div key={i}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: p.x, top: p.y, width: size, height: size,
              background: COLORS[i % COLORS.length],
              opacity: 1 - i / 16,
              boxShadow: \`0 0 \${size * 1.5}px \${COLORS[i % COLORS.length]}60\`,
            }}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.12 }}
          />
        );
      })}
    </div>
  );
}`;

export const fairyDustCode = `'use client';
import { useRef, useEffect } from 'react';

const CHARS = ['✨', '⭐', '🌟', '★', '*'];
const COLORS = ['#D61C59', '#E7D84B', '#1B8798', '#FF6B6B', '#4ECDC4'];

export function FairyDustCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);
    canvasRef.current = canvas;

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const resize = () => {
      const w2 = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
      const h2 = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
      canvas.width = w2 * dpr; canvas.height = h2 * dpr;
      canvas.style.width = w2 + 'px'; canvas.style.height = h2 + 'px';
      ctx.scale(dpr, dpr);
    };

    let raf: number;
    const loop = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const pos = posRef.current;

      particles.push({
        x: pos.x, y: pos.y,
        vx: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.5 + 0.3),
        vy: -(Math.random() * 2 + 0.5),
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1, size: Math.random() * 12 + 14,
      });

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 0.018;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.font = \`\${p.size * p.life * 0.8 + 4}px serif\`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else {
        posRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      window.removeEventListener('resize', resize);
      canvas.remove();
    };
  }, [containerRef]);

  return null;
}`;

export const rainbowCode = `'use client';
import { useRef, useEffect } from 'react';

const COLORS = ['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC'];

function lerpColor(c1: string, c2: string, t: number) {
  const r1 = parseInt(c1.slice(1,3),16), g1 = parseInt(c1.slice(3,5),16), b1 = parseInt(c1.slice(5,7),16);
  const r2 = parseInt(c2.slice(1,3),16), g2 = parseInt(c2.slice(3,5),16), b2 = parseInt(c2.slice(5,7),16);
  return \`rgb(\${Math.round(r1+(r2-r1)*t)},\${Math.round(g1+(g2-g1)*t)},\${Math.round(b1+(b2-b1)*t)})\`;
}

export function RainbowCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const trailRef = useRef<{x:number;y:number}[]>([]);

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let raf: number;
    let pos = { x: 0, y: 0 };

    const loop = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const trail = trailRef.current;
      trail.push({ x: pos.x, y: pos.y });
      if (trail.length > 30) trail.shift();
      if (trail.length < 2) { raf = requestAnimationFrame(loop); return; }

      const colorOffset = (time * 0.0008) % 1;
      for (let i = 0; i < COLORS.length; i++) {
        ctx.strokeStyle = lerpColor(COLORS[i], COLORS[(i+1)%COLORS.length], (i+colorOffset)/COLORS.length);
        ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y + (i - COLORS.length/2) * 2.5);
        for (let j = 1; j < trail.length; j++)
          ctx.lineTo(trail[j].x, trail[j].y + (i - COLORS.length/2) * 2.5);
        ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;

export const bubbleCode = `'use client';
import { useRef, useEffect } from 'react';

export function BubbleCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const bubblesRef = useRef<{x:number;y:number;vx:number;vy:number;life:number;size:number}[]>([]);

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let pos = { x: 0, y: 0 };
    let raf: number;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const bubbles = bubblesRef.current;
      bubbles.push({
        x: pos.x, y: pos.y,
        vx: (Math.random()<0.5?-1:1)*Math.random()*0.5,
        vy: -(Math.random()*1+0.3),
        life: 1, size: Math.random()*6+3,
      });

      for (let i = bubbles.length-1; i >= 0; i--) {
        const b = bubbles[i];
        b.x += b.vx + Math.sin(b.life*10)*0.2;
        b.y += b.vy; b.vy -= 0.003; b.life -= 0.01;
        if (b.life <= 0) { bubbles.splice(i,1); continue; }
        ctx.save();
        ctx.globalAlpha = b.life * 0.5;
        ctx.strokeStyle = '#60a5fa'; ctx.fillStyle = '#e6f1f7'; ctx.lineWidth = 1;
        const r = b.size * (0.3 + (1-b.life)*0.7);
        ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(b.x-r*0.3, b.y-r*0.3, r*0.2, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX-rect.left, y: e.clientY-rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;

export const characterCode = `'use client';
import { useRef, useEffect } from 'react';

const CHARS = ['h','e','l','o','✧','✦','·','•','♦'];
const COLORS = ['#6622CC','#A755C2','#B07C9E','#B59194','#D2A1B8'];

export function CharacterCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const particlesRef = useRef<{x:number;y:number;vx:number;vy:number;char:string;color:string;life:number;rotation:number}[]>([]);

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let pos = { x: 0, y: 0 };
    let raf: number;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      for (let k = 0; k < 2; k++) particles.push({
        x: pos.x, y: pos.y,
        vx: (Math.random()<0.5?-1:1)*(Math.random()*3+1),
        vy: (Math.random()<0.5?-1:1)*(Math.random()*3+1),
        char: CHARS[Math.floor(Math.random()*CHARS.length)],
        color: COLORS[Math.floor(Math.random()*COLORS.length)],
        life: 1, rotation: 0,
      });

      for (let i = particles.length-1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= 0.015; p.rotation -= 0.05;
        if (p.life <= 0) { particles.splice(i,1); continue; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * p.life);
        ctx.globalAlpha = p.life * 0.9;
        ctx.font = '14px serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = p.color;
        ctx.scale(0.3+p.life*1.2, 0.3+p.life*1.2);
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX-rect.left, y: e.clientY-rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;

export const spotlightCode = `'use client';
import { useRef, useEffect } from 'react';

export function SpotlightCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const smoothRef = useRef({ x: -500, y: -500 });

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let pos = { x: 0, y: 0 };
    let raf: number;

    const loop = () => {
      const sm = smoothRef.current;
      sm.x += (pos.x - sm.x) * 0.12;
      sm.y += (pos.y - sm.y) * 0.12;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'destination-out';
      const g = ctx.createRadialGradient(sm.x, sm.y, 0, sm.x, sm.y, 250);
      g.addColorStop(0, 'rgba(255,255,255,0.2)');
      g.addColorStop(0.4, 'rgba(255,255,255,0.08)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(sm.x, sm.y, 250, 0, Math.PI*2); ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
      const glow = ctx.createRadialGradient(sm.x, sm.y, 0, sm.x, sm.y, 300);
      glow.addColorStop(0, 'rgba(147,51,234,0.1)');
      glow.addColorStop(0.5, 'rgba(147,51,234,0.04)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(sm.x, sm.y, 300, 0, Math.PI*2); ctx.fill();

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX-rect.left, y: e.clientY-rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;

export const glowCursorCode = `'use client';
import { useRef, useEffect } from 'react';

export function GlowCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const hueRef = useRef(0);

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let pos = { x: -200, y: -200 };
    let raf: number;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      hueRef.current = (hueRef.current + 0.3) % 360;
      const hue = hueRef.current;

      const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 140);
      g.addColorStop(0, \`hsla(\${hue},80%,70%,0.12)\`);
      g.addColorStop(0.3, \`hsla(\${(hue+40)%360},80%,60%,0.06)\`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 140, 0, Math.PI*2); ctx.fill();

      const inner = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 50);
      inner.addColorStop(0, \`hsla(\${hue},80%,80%,0.06)\`);
      inner.addColorStop(1, 'transparent');
      ctx.fillStyle = inner;
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 50, 0, Math.PI*2); ctx.fill();

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX-rect.left, y: e.clientY-rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;

export const sparkleTrailCode = `'use client';
import { useRef, useEffect } from 'react';

const COLORS = ['#fbbf24','#f472b6','#22d3ee','#a78bfa','#34d399','#fb923c'];

export function SparkleTrail({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const particlesRef = useRef<{x:number;y:number;vx:number;vy:number;life:number;size:number;color:string}[]>([]);

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let pos = { x: 0, y: 0 };
    let raf: number;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      particles.push({
        x: pos.x, y: pos.y,
        vx: (Math.random()-0.5)*0.6, vy: (Math.random()-0.5)*0.6,
        life: 1, size: Math.random()*3+1.5,
        color: COLORS[Math.floor(Math.random()*COLORS.length)],
      });

      for (let i = particles.length-1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= 0.025;
        if (p.life <= 0) { particles.splice(i,1); continue; }
        ctx.save();
        ctx.globalAlpha = p.life*0.8;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size*p.life, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX-rect.left, y: e.clientY-rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;

export const snowflakeCode = `'use client';
import { useRef, useEffect } from 'react';

export function SnowflakeCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const flakesRef = useRef<{x:number;y:number;vx:number;vy:number;life:number;size:number}[]>([]);

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let pos = { x: 0, y: 0 };
    let raf: number;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const flakes = flakesRef.current;
      flakes.push({
        x: pos.x, y: pos.y,
        vx: (Math.random()<0.5?-1:1)*Math.random()*0.4,
        vy: Math.random()*0.6+0.2, life: 1, size: Math.random()*3+2,
      });

      for (let i = flakes.length-1; i >= 0; i--) {
        const f = flakes[i];
        f.x += f.vx + Math.sin(f.y*0.02)*0.3;
        f.y += f.vy; f.vy += 0.004; f.life -= 0.006;
        if (f.life <= 0 || f.y > h+10) { flakes.splice(i,1); continue; }
        ctx.save();
        ctx.globalAlpha = f.life*0.85;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(255,255,255,0.3)'; ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size*(0.3+f.life*0.7), 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX-rect.left, y: e.clientY-rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;

export const canvasTrailCode = `'use client';
import { useRef, useEffect } from 'react';

export function CanvasTrailCursor({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const pointsRef = useRef<{x:number;y:number}[]>([]);
  const hueRef = useRef(200);

  useEffect(() => {
    const el = containerRef?.current || document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = containerRef?.current ? 'absolute' : 'fixed';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
    el.appendChild(canvas);

    const dpr = window.devicePixelRatio || 1;
    const w = containerRef?.current ? containerRef.current.clientWidth : window.innerWidth;
    const h = containerRef?.current ? containerRef.current.clientHeight : window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    let pos = { x: 0, y: 0 };
    let raf: number;

    const loop = () => {
      const points = pointsRef.current;
      points.push({ x: pos.x, y: pos.y });
      if (points.length > 40) points.shift();
      ctx.clearRect(0, 0, w, h);

      if (points.length >= 3) {
        hueRef.current = (hueRef.current + 0.5) % 360;
        const hue = hueRef.current;
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';

        ctx.strokeStyle = \`hsla(\${hue},80%,60%,0.25)\`;
        ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length-1; i++)
          ctx.quadraticCurveTo(points[i].x, points[i].y, (points[i].x+points[i+1].x)/2, (points[i].y+points[i+1].y)/2);
        ctx.stroke();

        ctx.strokeStyle = \`hsla(\${(hue+30)%360},80%,70%,0.5)\`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length-1; i++)
          ctx.quadraticCurveTo(points[i].x, points[i].y, (points[i].x+points[i+1].x)/2, (points[i].y+points[i+1].y)/2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMouse = (e: MouseEvent | Touch) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pos = { x: e.clientX-rect.left, y: e.clientY-rect.top };
      } else pos = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMouse(e.touches[0]); };
    el.addEventListener('mousemove', onMouse as any);
    el.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMouse as any);
      el.removeEventListener('touchmove', onTouch);
      canvas.remove();
    };
  }, [containerRef]);
  return null;
}`;
