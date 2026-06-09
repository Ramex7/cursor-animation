'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

const COLORS = ['#22d3ee', '#818cf8', '#c084fc', '#f472b6', '#34d399'];

export const ClickRipple: React.FC<CursorComponentProps> = ({ containerRef }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    const handleEnter = () => setIsInside(true);
    const handleLeave = () => setIsInside(false);
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!isInside) return;
    const handleClick = (e: MouseEvent) => {
      const container = containerRef?.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const newRipple = { id: Date.now() + Math.random(), x, y, color };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };
    const container = containerRef?.current;
    container?.addEventListener('click', handleClick);
    return () => container?.removeEventListener('click', handleClick);
  }, [isInside, containerRef]);

  return (
    <>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div
            className="w-20 h-20 rounded-full -translate-x-1/2 -translate-y-1/2 border-2"
            style={{ borderColor: ripple.color, boxShadow: `0 0 12px ${ripple.color}40` }}
          />
        </motion.div>
      ))}
    </>
  );
};
