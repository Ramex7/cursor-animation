# Cursor Lab

A production-ready collection of 13 interactive cursor animations and effects built with **React**, **Next.js**, **Framer Motion**, **TypeScript**, and **Tailwind CSS**.

Each component is self-contained, copy-paste ready, and includes complete source code.

## Features

- **13 Cursor Components** — Smooth Followers, Trails, Ripples, Canvas Particles, Glows, and more
- **Copy-Paste Ready** — Full working source code for every component
- **Search & Filter** — Find cursors by name, category, or description
- **Canvas & Framer Motion** — Both hardware-accelerated canvas effects and spring-based motion components
- **Responsive** — Works on all screen sizes
- **TypeScript** — Fully typed components and hooks

## Components

| # | Component | Category | Type |
|---|-----------|----------|------|
| 1 | **Smooth Follower** | Basic | Framer Motion |
| 2 | **Sparkle Trail** | Trails | Canvas |
| 3 | **Trail Snake** | Trails | Framer Motion |
| 4 | **Click Ripple** | Interactive | Framer Motion |
| 5 | **Text Morph** | Interactive | Framer Motion |
| 6 | **Fairy Dust** | Canvas | Canvas |
| 7 | **Rainbow Trail** | Trails | Canvas |
| 8 | **Bubble Cursor** | Canvas | Canvas |
| 9 | **Character Cursor** | Effects | Canvas |
| 10 | **Glow Cursor** | Effects | Canvas |
| 11 | **Spotlight** | Effects | Canvas |
| 12 | **Snowflake Cursor** | Effects | Canvas |
| 13 | **Canvas Trail** | Trails | Canvas |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Usage

Each cursor component accepts a `containerRef` prop of type `React.RefObject<HTMLDivElement | null>`. The cursor activates on hover and deactivates on leave.

```tsx
import { useRef } from 'react';
import { SmoothFollower } from './SmoothFollower';

export function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ position: 'relative', width: 400, height: 300 }}>
      <SmoothFollower containerRef={ref} />
      <h1>Hover over this area</h1>
    </div>
  );
}
```

For canvas-based cursors, the component creates its own `<canvas>` element inside the container.

## Tech Stack

- **Next.js 16** — React framework
- **React 19** — UI library
- **Framer Motion 12** — Animation library
- **Tailwind CSS 4** — Styling
- **TypeScript** — Type safety
- **React Icons** — Icon set

## Project Structure

```
├── app/              # Next.js App Router (layout, pages, globals.css)
├── components/       # Cursor components + UI components
├── data/             # Component registry & categories
├── hooks/            # useCanvasCursor, useMouse
├── lib/              # Utilities (cn)
└── public/           # Static assets
```

## Credits

Inspired by [Cursify](https://cursify.ui-layouts.com/).
