export const smoothFollowerCode = `const { smoothX, smoothY } = useMouse({ damping: 20, stiffness: 200 });

return (
  <motion.div style={{ x: smoothX, y: smoothY }}>
    <motion.div
      className="w-10 h-10 border-2 border-amber-400/40 rounded-full"
      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.3, 0.6] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
  </motion.div>
);`;

export const clickRippleCode = `const [ripples, setRipples] = useState([]);

const handleClick = (e) => {
  const ripple = { id: Date.now(), x: e.clientX, y: e.clientY, color: randomColor() };
  setRipples(prev => [...prev, ripple]);
  setTimeout(() => setRipples(prev => prev.filter(r => r.id !== ripple.id)), 1000);
};

return ripples.map(ripple => (
  <motion.div
    key={ripple.id}
    style={{ left: ripple.x, top: ripple.y }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 4, opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <div className="w-20 h-20 rounded-full border-2" style={{ borderColor: ripple.color }} />
  </motion.div>
));`;

export const textMorphCode = `const { smoothX, smoothY } = useMouse({ damping: 25, stiffness: 250 });
const [isHovering, setIsHovering] = useState(false);

return (
  <motion.div style={{ x: smoothX, y: smoothY }}>
    <motion.div
      className="flex items-center justify-center rounded-full"
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
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
          >
            CLICK
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.div>
);`;

export const trailSnakeCode = `const [trail, setTrail] = useState([]);
const trailLength = 16;

useEffect(() => {
  const handleMouseMove = (e) => {
    setTrail(prev => {
      const newTrail = [{ x: e.clientX, y: e.clientY }, ...prev];
      return newTrail.slice(0, trailLength);
    });
  };
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

return trail.map((point, index) => (
  <motion.div
    key={index}
    className="absolute rounded-full"
    style={{
      left: point.x, top: point.y,
      width: Math.max(10 - index * 0.6, 2),
      height: Math.max(10 - index * 0.6, 2),
      background: colors[index % colors.length],
      opacity: 1 - (index / trailLength),
    }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
  />
));`;

export const fairyDustCode = `<FairyDustCursor
  colors={['#D61C59', '#E7D84B', '#1B8798']}
  characterSet={['✨', '⭐', '🌟']}
  particleSize={24}
  particleCount={2}
  gravity={0.015}
  fadeSpeed={0.97}
/>`;

export const rainbowCode = `<RainbowCursor
  colors={['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC']}
  length={30}
  size={4}
  trailSpeed={0.4}
  colorCycleSpeed={0.002}
/>`;

export const bubbleCode = `<BubbleCursor
  colors={['#3a92c5', '#e6f1f7']}
  particleSize={6}
  gravity={0.02}
/>`;

export const characterCode = `<CharacterCursor
  characters={['h', 'e', 'l', 'o', '✧', '✦']}
  colors={['#6622CC', '#A755C2', '#B07C9E']}
  font="16px serif"
/>`;

export const spotlightCode = `<SpotlightCursor
  radius={250}
  brightness={0.15}
  color="#9333ea"
  smoothing={0.08}
/>`;

export const springyCode = `<SpringyCursor
  emoji="⚽"
  dots={7}
  segmentLength={12}
  springK={12}
  gravity={60}
/>`;

export const snowflakeCode = `<SnowflakeCursor
  character="❄️"
  particleSize={4}
  gravity={0.003}
  fadeSpeed={0.005}
/>`;

export const canvasTrailCode = `<CanvasTrailCursor
  trailLength={40}
  lineWidth={2}
  hue={200}
  saturation={70}
/>`;
