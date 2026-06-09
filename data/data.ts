import { smoothFollowerCode, clickRippleCode, textMorphCode, trailSnakeCode, fairyDustCode, rainbowCode, bubbleCode, characterCode, spotlightCode, springyCode, snowflakeCode, canvasTrailCode } from '@/components/codes';
import { SmoothFollower } from '@/components/SmoothFollower';
import { ClickRipple } from '@/components/ClickRipple';
import { TextMorph } from '@/components/TextMorph';
import { TrailSnake } from '@/components/TrailSnake';
import { FairyDustCursor } from '@/components/FairyDustCursor';
import { RainbowCursor } from '@/components/RainbowCursor';
import { BubbleCursor } from '@/components/BubbleCursor';
import { CharacterCursor } from '@/components/CharacterCursor';
import { SpotlightCursor } from '@/components/SpotlightCursor';
import { SpringyCursor } from '@/components/SpringyCursor';
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
    description: 'A glowing dot with pulsing rings that follows your cursor with smooth spring physics',
    category: 'basic',
    CursorComponent: SmoothFollower,
    code: smoothFollowerCode,
  },
  {
    id: 'trail-snake',
    title: 'Trail Snake',
    description: 'A colorful multi-dot trail with shadow glow that follows your mouse path',
    category: 'trails',
    CursorComponent: TrailSnake,
    code: trailSnakeCode,
  },
  {
    id: 'click-ripple',
    title: 'Click Ripple',
    description: 'Emits expanding colorful rings on every click with smooth fade animation',
    category: 'interactive',
    CursorComponent: ClickRipple,
    code: clickRippleCode,
  },
  {
    id: 'text-morph',
    title: 'Text Morph',
    description: 'Expands into a gradient bubble revealing text when hovering over magnetic elements',
    category: 'interactive',
    CursorComponent: TextMorph,
    code: textMorphCode,
  },
  {
    id: 'fairy-dust',
    title: 'Fairy Dust',
    description: 'Magical sparkle emoji particles trailing your cursor with gravity and fade effects',
    category: 'canvas',
    CursorComponent: FairyDustCursor,
    code: fairyDustCode,
  },
  {
    id: 'rainbow',
    title: 'Rainbow Trail',
    description: 'A vibrant multi-color segmented trail with continuous color cycling',
    category: 'trails',
    CursorComponent: RainbowCursor,
    code: rainbowCode,
  },
  {
    id: 'bubble',
    title: 'Bubble Cursor',
    description: 'Floating translucent bubbles that drift upward from your cursor path',
    category: 'canvas',
    CursorComponent: BubbleCursor,
    code: bubbleCode,
  },
  {
    id: 'character',
    title: 'Character Cursor',
    description: 'Radiating letters and symbols with rotation, scaling, and color effects',
    category: 'effects',
    CursorComponent: CharacterCursor,
    code: characterCode,
  },
  {
    id: 'spotlight',
    title: 'Spotlight',
    description: 'Dark overlay with a bright smooth-following spotlight and purple glow',
    category: 'effects',
    CursorComponent: SpotlightCursor,
    code: spotlightCode,
  },
  {
    id: 'springy',
    title: 'Springy Cursor',
    description: 'Physics-based chain of bouncing dots with spring gravity and collision',
    category: 'canvas',
    CursorComponent: SpringyCursor,
    code: springyCode,
  },
  {
    id: 'snowflake',
    title: 'Snowflake Cursor',
    description: 'Gentle snowflakes falling from your cursor with drift and fade',
    category: 'effects',
    CursorComponent: SnowflakeCursor,
    code: snowflakeCode,
  },
  {
    id: 'canvas-trail',
    title: 'Canvas Trail',
    description: 'Smooth fluid bezier curve trail with dynamic hue cycling',
    category: 'trails',
    CursorComponent: CanvasTrailCursor,
    code: canvasTrailCode,
  },
];
