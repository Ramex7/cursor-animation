'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouse } from "@/hooks/useMouseHook";

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const LABELS = ['CLICK', 'HOVER', '✨', '👆', '★'];

export const TextMorph: React.FC<CursorComponentProps> = ({ containerRef }) => {
  const { smoothX, smoothY } = useMouse({ damping: 25, stiffness: 250 });
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState(LABELS[0]);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    const handleEnter = () => setIsInside(true);
    const handleLeave = () => { setIsInside(false); setIsHovering(false); };
    const handleMouseMove = (e: MouseEvent) => {
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
    };
  }, [containerRef]);

  if (!isInside) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div style={{ x: smoothX, y: smoothY }} className="absolute">
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex items-center justify-center rounded-full overflow-hidden"
            animate={{
              width: isHovering ? 96 : 14,
              height: isHovering ? 96 : 14,
              background: isHovering
                ? 'linear-gradient(135deg, #10b981, #3b82f6)'
                : '#10b981',
            }}
            transition={{ type: "spring", damping: 18, stiffness: 260 }}
          >
            <AnimatePresence mode="wait">
              {isHovering && (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.3, rotate: 20 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-bold text-white select-none"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
