'use client'
import React, { useState, useRef, useMemo } from 'react';
import { ThemeToggle, SearchBar, ComponentCard } from '@/components/Ui';
import { components } from '@/data/data';
import { categories } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiStar, FiGrid, FiLayers, FiMousePointer, FiDroplet } from 'react-icons/fi';

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCursor, setActiveCursor] = useState<string | null>(null);
  const liveDemoRef = useRef<HTMLDivElement>(null);

  const filteredComponents = useMemo(() => {
    return components.filter((c) => {
      const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchSearch = !searchQuery || 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeComponent = useMemo(
    () => components.find((c) => c.id === activeCursor),
    [activeCursor]
  );

  const stats = useMemo(() => ({
    total: components.length,
    categories: categories.length - 1,
    canvas: components.filter((c) => c.category === 'canvas').length,
    interactive: components.filter((c) => c.category === 'interactive').length,
  }), []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.06)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.04)_0%,_transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-zinc-900 font-bold text-sm">NC</span>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  Nice <span className="text-amber-400">Cursor</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Ramex7/cursor-animation.git"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
              >
                <FiGithub size={16} />
                <span>GitHub</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }} 
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                <FiMousePointer size={14} />
                <span>{components.length} Interactive Cursors</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                The{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Ultimate
                </span>{' '}
                <br className="sm:hidden" />
                Cursor Animation Library
              </h1>
              <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
                A beautiful collection of interactive cursor effects built with React,
                Framer Motion, and TypeScript. Hover, click, and explore.
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="#gallery"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold rounded-xl transition-colors"
                >
                  Browse Components
                </a>
                <a
                  href="https://github.com/Ramex7/cursor-animation.git"
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-colors border border-zinc-700 flex items-center gap-2"
                >
                  <FiStar size={16} />
                  Star on GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: FiGrid, label: 'Components', value: stats.total },
                { icon: FiLayers, label: 'Categories', value: stats.categories },
                { icon: FiDroplet, label: 'Canvas Effects', value: stats.canvas },
                { icon: FiMousePointer, label: 'Interactive', value: stats.interactive },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="mx-auto mb-2 text-zinc-500" size={20} />
                  <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Cursor Demo */}
        <section className="border-b border-zinc-800 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">Try It Live</h2>
                <p className="text-sm text-zinc-500">Click a cursor to apply it on this section</p>
              </div>
              {activeCursor && (
                <button
                  onClick={() => setActiveCursor(null)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <div
              ref={liveDemoRef}
              className="relative h-48 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-800 overflow-hidden flex items-center justify-center"
            >
              {activeComponent && (
                <activeComponent.CursorComponent containerRef={liveDemoRef} />
              )}
              <div className="text-center z-10">
                <p className="text-zinc-500 text-sm mb-2">
                  {activeCursor ? `✨ ${activeComponent?.title} active` : 'Select a cursor below'}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-8 py-4 bg-zinc-800/80 rounded-xl border border-zinc-700/50 cursor-pointer backdrop-blur-sm"
                  data-magnetic
                >
                  <span className="text-zinc-200 font-medium">Interactive Zone</span>
                </motion.div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
              {components.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCursor(c.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    activeCursor === c.id
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold">Component Gallery</h2>
              <p className="text-zinc-500 text-sm mt-1">
                {filteredComponents.length} of {components.length} components
              </p>
            </div>
            <div className="w-full md:w-72">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-zinc-800/30 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Component Grid */}
          <AnimatePresence mode="wait">
            {filteredComponents.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {filteredComponents.map((component) => (
                  <ComponentCard
                    key={component.id}
                    title={component.title}
                    description={component.description}
                    category={component.category}
                    CursorComponent={component.CursorComponent}
                    code={component.code}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-zinc-500 text-lg">No components found</p>
                <p className="text-zinc-600 text-sm mt-1">Try a different search or category</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-zinc-900 font-bold text-[10px]">NC</span>
              </div>
              <p className="text-sm text-zinc-500">
                Built with Next.js, TypeScript, and Framer Motion
              </p>
            </div>
            <p className="text-sm text-zinc-600">
              &copy; {new Date().getFullYear()} Nice Cursor. Inspired by{' '}
              <a
                href="https://cursify.ui-layouts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2"
              >
                Cursify
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
