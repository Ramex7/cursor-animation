import { useEffect, useState } from "react";
import { motion } from "framer-motion";

//TYPE DEFINITION

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface TrailPoint {
  x: number;
  y: number;
}

export const TrailSnake: React.FC<CursorComponentProps> = ({ containerRef }) => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isInside, setIsInside] = useState(false);
  const trailLength = 12;

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleEnter = () => setIsInside(true);
    const handleLeave = () => {
      setIsInside(false);
      setTrail([]);
    };

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
      {trail.map((point, index) => (
        <motion.div
          key={index}
          className="absolute bg-violet-400 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            left: point.x,
            top: point.y,
            width: 8 - (index * 0.5),
            height: 8 - (index * 0.5),
            opacity: 1 - (index / trailLength),
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      ))}
    </div>
  );
};