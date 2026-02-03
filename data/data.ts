import { smoothFollowerCode, clickRippleCode, textMorphCode, trailSnakeCode } from '@/components/codes';
import { SmoothFollower } from '@/components/SmoothFollower';
import { ClickRipple } from '@/components/ClickRipple';
import { TextMorph } from '@/components/TextMorph';
import { TrailSnake } from '@/components/TrailSnake';

//TYPE DEFINITION

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
      description: 'A dot with a trailing ring using spring physics and smooth interpolation',
      category: 'basic',
      CursorComponent: SmoothFollower,
      code: smoothFollowerCode,
    },
    {
      id: 'click-ripple',
      title: 'Click Ripple',
      description: 'Emits an expanding ring effect on every click with fade animation',
      category: 'interactive',
      CursorComponent: ClickRipple,
      code: clickRippleCode,
    },
    {
      id: 'text-morph',
      title: 'Text Morph',
      description: 'Expands and reveals text when hovering over magnetic elements',
      category: 'interactive',
      CursorComponent: TextMorph,
      code: textMorphCode,
    },
    {
      id: 'trail-snake',
      title: 'Trail Snake',
      description: 'Multi-dot trail that follows the mouse path with smooth delay',
      category: 'trails',
      CursorComponent: TrailSnake,
      code: trailSnakeCode,
    },
  ];
