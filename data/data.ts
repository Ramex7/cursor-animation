import {
  smoothFollowerCode, clickRippleCode, textMorphCode, trailSnakeCode,
  fairyDustCode, rainbowCode, bubbleCode, characterCode, spotlightCode,
  glowCursorCode, sparkleTrailCode, snowflakeCode, canvasTrailCode,
} from '@/components/codes';
import { SmoothFollower } from '@/components/SmoothFollower';
import { ClickRipple } from '@/components/ClickRipple';
import { TextMorph } from '@/components/TextMorph';
import { TrailSnake } from '@/components/TrailSnake';
import { FairyDustCursor } from '@/components/FairyDustCursor';
import { RainbowCursor } from '@/components/RainbowCursor';
import { BubbleCursor } from '@/components/BubbleCursor';
import { CharacterCursor } from '@/components/CharacterCursor';
import { SpotlightCursor } from '@/components/SpotlightCursor';
import { GlowCursor } from '@/components/GlowCursor';
import { SparkleTrail } from '@/components/SparkleTrail';
import { SnowflakeCursor } from '@/components/SnowflakeCursor';
import { CanvasTrailCursor } from '@/components/CanvasTrailCursor';

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface ComponentData {
  id: string;
  title: string;
  description: string;
  category: string;
  CursorComponent: React.ComponentType<CursorComponentProps>;
  code: string;
}

export const components: ComponentData[] = [
  {
    id: 'smooth-follower',
    title: 'Smooth Follower',
    description: 'A glowing amber dot with pulsing rings that follows your cursor using spring physics. Smooth, responsive, and lightweight.',
    category: 'basic',
    CursorComponent: SmoothFollower,
    code: smoothFollowerCode,
  },
  {
    id: 'sparkle-trail',
    title: 'Sparkle Trail',
    description: 'Tiny colorful glowing dots that trail behind your cursor like magical sparkles. Each sparkle fades with a soft glow.',
    category: 'trails',
    CursorComponent: SparkleTrail,
    code: sparkleTrailCode,
  },
  {
    id: 'trail-snake',
    title: 'Trail Snake',
    description: 'A colorful multi-dot trail with glow effects that follows your mouse path. Each dot fades in size and opacity.',
    category: 'trails',
    CursorComponent: TrailSnake,
    code: trailSnakeCode,
  },
  {
    id: 'click-ripple',
    title: 'Click Ripple',
    description: 'Emits expanding colorful rings on every click. Each ripple has a random vibrant color with a soft glow effect.',
    category: 'interactive',
    CursorComponent: ClickRipple,
    code: clickRippleCode,
  },
  {
    id: 'text-morph',
    title: 'Text Morph',
    description: 'A small dot that expands into a gradient bubble with text when hovering over magnetic elements. Includes animated entrance and exit.',
    category: 'interactive',
    CursorComponent: TextMorph,
    code: textMorphCode,
  },
  {
    id: 'fairy-dust',
    title: 'Fairy Dust',
    description: 'Magical sparkle particles trailing your cursor with emoji characters, gravity, and fade effects. Canvas-based.',
    category: 'canvas',
    CursorComponent: FairyDustCursor,
    code: fairyDustCode,
  },
  {
    id: 'rainbow',
    title: 'Rainbow Trail',
    description: 'A vibrant multi-color segmented trail with continuous color cycling across the spectrum. Six parallel offset lines.',
    category: 'trails',
    CursorComponent: RainbowCursor,
    code: rainbowCode,
  },
  {
    id: 'bubble',
    title: 'Bubble Cursor',
    description: 'Floating translucent blue bubbles that drift upward from your cursor with a subtle wobble. Includes bubble highlights.',
    category: 'canvas',
    CursorComponent: BubbleCursor,
    code: bubbleCode,
  },
  {
    id: 'character',
    title: 'Character Cursor',
    description: 'Radiating letters, symbols, and decorative characters with rotation, scaling, and color effects. Canvas-based particle system.',
    category: 'effects',
    CursorComponent: CharacterCursor,
    code: characterCode,
  },
  {
    id: 'glow-cursor',
    title: 'Glow Cursor',
    description: 'A large soft ambient glow that follows your cursor with a smooth, slowly shifting hue. Elegant, minimal, and mesmerizing.',
    category: 'effects',
    CursorComponent: GlowCursor,
    code: glowCursorCode,
  },
  {
    id: 'spotlight',
    title: 'Spotlight',
    description: 'A dark overlay with a smooth-following spotlight that reveals content beneath. Includes a purple glow effect.',
    category: 'effects',
    CursorComponent: SpotlightCursor,
    code: spotlightCode,
  },
  {
    id: 'snowflake',
    title: 'Snowflake Cursor',
    description: 'Gentle snowflakes falling from your cursor with horizontal drift, sinusoidal sway, and fade-out. White glowing particles.',
    category: 'effects',
    CursorComponent: SnowflakeCursor,
    code: snowflakeCode,
  },
  {
    id: 'canvas-trail',
    title: 'Canvas Trail',
    description: 'A smooth fluid bezier curve trail with dynamic hue cycling. Dual-layer rendering for depth with glow effects.',
    category: 'trails',
    CursorComponent: CanvasTrailCursor,
    code: canvasTrailCode,
  },
];
