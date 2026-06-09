# Nice Cursor

A collection of interactive cursor animations and effects built with **React**, **Next.js**, **Framer Motion**, **TypeScript**, and **Tailwind CSS**. 12 unique cursor components with live preview, code viewing, and dark/light theme support.

## Features

- **12 Cursor Components** – Smooth followers, trails, ripples, canvas effects, and more
- **Live Demo** – Try any cursor on the actual page before copying the code
- **Search & Filter** – Find components by name, description, or category
- **Code Viewer** – Inline code snippets with copy-to-clipboard
- **Dark/Light Theme** – Full theme support with persistent preference
- **Canvas Effects** – 5 performant canvas-based cursors (fairy dust, bubble, springy, etc.)
- **Responsive** – Works on all screen sizes

## Components

| Component | Category | Type |
|-----------|----------|------|
| Smooth Follower | Basic | Framer Motion |
| Click Ripple | Interactive | Framer Motion |
| Text Morph | Interactive | Framer Motion |
| Trail Snake | Trails | Framer Motion |
| Fairy Dust | Canvas | Canvas API |
| Rainbow Trail | Trails | Canvas API |
| Bubble Cursor | Canvas | Canvas API |
| Character Cursor | Effects | Canvas API |
| Spotlight | Effects | Canvas API |
| Springy Cursor | Canvas | Canvas API (physics) |
| Snowflake Cursor | Effects | Canvas API |
| Canvas Trail | Trails | Canvas API |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the gallery.

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Framer Motion 12](https://motion.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Usage

Each cursor component accepts a `containerRef` prop. To use one in your project:

```tsx
'use client';
import { useRef } from 'react';
import { SmoothFollower } from '@/components/SmoothFollower';

export default function Page() {
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <SmoothFollower containerRef={ref} />
      {/* your content */}
    </div>
  );
}
```

## Credits

Inspired by [Cursify](https://cursify.ui-layouts.com/) by Durgesh and Naymur.
