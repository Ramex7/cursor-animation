'use client';
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const addRipple = useCallback((e: MouseEvent) => {
    const container = containerRef?.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y, color }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
  }, [containerRef]);

  useEffect(() => {
    if (!isInside) return;
    const container = containerRef?.current;
    if (!container) return;
    container.addEventListener('click', addRipple);
    return () => container.removeEventListener('click', addRipple);
  }, [isInside, containerRef, addRipple]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              className="w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: `radial-gradient(circle, ${ripple.color}40 0%, ${ripple.color}20 40%, transparent 70%)`,
                border: `2px solid ${ripple.color}`,
                boxShadow: `0 0 20px ${ripple.color}60`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
