import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouse } from "@/hooks/useMouseHook";


//TYPE DEFINITION

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}



export const TextMorph: React.FC<CursorComponentProps> = ({ containerRef }) => {
  const { smoothX, smoothY } = useMouse({ damping: 25, stiffness: 250 });
  const [isHovering, setIsHovering] = useState(false);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleEnter = () => setIsInside(true);
    const handleLeave = () => {
      setIsInside(false);
      setIsHovering(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const magnetic = (e.target as HTMLElement).closest('[data-magnetic]');
      setIsHovering(!!magnetic);
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
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute"
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex items-center justify-center bg-emerald-500 rounded-full"
            animate={{
              width: isHovering ? 80 : 12,
              height: isHovering ? 80 : 12,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <AnimatePresence>
              {isHovering && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-xs font-bold text-zinc-900"
                >
                  CLICK
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
