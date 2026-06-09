'use client';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const LABELS = ['CLICK', 'HOVER', '✨', '👆', '★', '●', '◆'];

export const TextMorph: React.FC<CursorComponentProps> = ({ containerRef }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState(LABELS[0]);
  const [isInside, setIsInside] = useState(false);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    const handleEnter = () => { setIsInside(true); };
    const handleLeave = () => { setIsInside(false); setIsHovering(false); };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const el = (e.target as HTMLElement).closest('[data-magnetic]');
      setIsHovering(!!el);
      if (el) setLabel(LABELS[Math.floor(Math.random() * LABELS.length)]);
    };
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);
    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  useEffect(() => {
    const update = () => {
      setPos({ ...mouseRef.current });
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!isInside) return null;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        animate={{
          width: isHovering ? 96 : 14,
          height: isHovering ? 96 : 14,
          background: isHovering
            ? 'linear-gradient(135deg, #10b981, #3b82f6)'
            : '#10b981',
        }}
        transition={{ type: "spring", damping: 18, stiffness: 260, mass: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {isHovering && (
            <motion.span
              key={label}
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
};
