import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMouse } from "@/hooks/useMouseHook";


//TYPE DEFINITION

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const SmoothFollower: React.FC<CursorComponentProps> = ({ containerRef }) => {
  const { smoothX, smoothY } = useMouse({ damping: 20, stiffness: 200 });
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

  if (!isInside) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Outer ring */}
          <motion.div
            className="absolute w-8 h-8 border-2 border-amber-400/60 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>
    </div>
  );
};