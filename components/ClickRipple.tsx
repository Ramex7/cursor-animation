import { useEffect, useState } from "react";
import { motion } from "framer-motion";


//TYPE DEFINITION

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}


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

      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
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
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-16 h-16 border-2 border-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      ))}
    </>
  );
};