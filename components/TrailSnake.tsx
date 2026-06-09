'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface TrailPoint {
  x: number;
  y: number;
}

const COLORS = ['#a78bfa', '#818cf8', '#6366f1', '#8b5cf6', '#7c3aed'];

export const TrailSnake: React.FC<CursorComponentProps> = ({ containerRef }) => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isInside, setIsInside] = useState(false);
  const trailLength = 16;

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    const handleEnter = () => setIsInside(true);
    const handleLeave = () => { setIsInside(false); setTrail([]); };
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!isInside) return;
    const handleMouseMove = (e: MouseEvent) => {
      setTrail((prev) => {
        const newTrail = [{ x: e.clientX, y: e.clientY }, ...prev];
        return newTrail.slice(0, trailLength);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInside]);

  if (!isInside) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => {
        const color = COLORS[index % COLORS.length];
        const size = Math.max(10 - index * 0.6, 2);
        return (
          <motion.div
            key={index}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              background: color,
              opacity: 1 - (index / trailLength),
              boxShadow: `0 0 ${size}px ${color}60`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          />
        );
      })}
    </div>
  );
};
