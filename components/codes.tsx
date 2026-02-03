// CODE SNIPPETS

export const smoothFollowerCode = `const SmoothFollower = () => {
  const { smoothX, smoothY } = useMouse({ 
    damping: 20, 
    stiffness: 200 
  });

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className="fixed pointer-events-none"
    >
      <motion.div
        className="w-8 h-8 border-2 border-amber-400 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
      />
      <div className="w-2 h-2 bg-amber-400 rounded-full" />
    </motion.div>
  );
};`;

export const clickRippleCode = `const ClickRipple = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const ripple = { 
        id: Date.now(), 
        x: e.clientX, 
        y: e.clientY 
      };
      setRipples(prev => [...prev, ripple]);
      
      setTimeout(() => {
        setRipples(prev => 
          prev.filter(r => r.id !== ripple.id)
        );
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return ripples.map(ripple => (
    <motion.div
      key={ripple.id}
      style={{ left: ripple.x, top: ripple.y }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed pointer-events-none"
    >
      <div className="w-16 h-16 border-2 border-cyan-400 rounded-full" />
    </motion.div>
  ));
};`;

export const textMorphCode = `const TextMorph = () => {
  const { smoothX, smoothY } = useMouse({ 
    damping: 25, 
    stiffness: 250 
  });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className="fixed pointer-events-none"
      animate={{ scale: isHovering ? 2 : 1 }}
    >
      <motion.div
        className="bg-emerald-500 rounded-full"
        animate={{
          width: isHovering ? 80 : 12,
          height: isHovering ? 80 : 12,
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              CLICK
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};`;

export const trailSnakeCode = `const TrailSnake = () => {
  const [trail, setTrail] = useState([]);
  const trailLength = 12;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTrail(prev => {
        const newTrail = [
          { x: e.clientX, y: e.clientY }, 
          ...prev
        ];
        return newTrail.slice(0, trailLength);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return trail.map((point, index) => (
    <motion.div
      key={index}
      className="fixed bg-violet-400 rounded-full pointer-events-none"
      style={{
        left: point.x,
        top: point.y,
        width: 8 - (index * 0.5),
        height: 8 - (index * 0.5),
        opacity: 1 - (index / trailLength),
      }}
    />
  ));
};`;