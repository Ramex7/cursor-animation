'use client'
import {useEffect} from 'react';
import { useSpring, useMotionValue, MotionValue } from 'framer-motion';

//TYPE DEFINITIONS
interface MouseOptions {
  damping?: number;
  stiffness?: number;
  mass?: number;
}

interface MouseReturn {
  x: MotionValue<number>;
  y: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

export const useMouse = (options: MouseOptions = {}): MouseReturn => {
  const { damping = 0.15, stiffness = 150, mass = 0.5 } = options;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping, stiffness, mass };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { x: mouseX, y: mouseY, smoothX, smoothY };
};