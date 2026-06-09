'use client'
import React, { useState, useRef, useMemo } from 'react';
import { Header, SearchBar, ComponentCard } from '@/components/Ui';
import { components } from '@/data/data';
import { categories } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiLayers, FiMousePointer, FiDroplet,
  FiArrowDown, FiGithub, FiStar,
} from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const galleryRef = useRef<HTMLElement>(null);

  const filteredComponents = useMemo(() => {
    return components.filter((c) => {
      const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchSearch = !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const stats = useMemo(() => ({
    total: components.length,
    categories: categories.length - 1,
    canvas: components.filter((c) => c.category === 'canvas').length,
    interactive: components.filter((c) => c.category === 'interactive' || c.category === 'basic').length,
  }), []);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.05)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.03)_0%,_transparent_50%)]" />
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <Header />

      <main className="relative pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400/90 text-sm font-medium mb-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FiMousePointer size={14} />
                </motion.div>
                <span>{components.length} Reusable Components &middot; Copy-Paste Ready</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-[1.1]">
                <span className="text-zinc-100">Cursor</span>{' '}
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-pulse-glow">
                  Animations
                </span>
                <br />
                <span className="text-zinc-400">for React &amp; Next.js</span>
              </h1>

              <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                A production-ready collection of {components.length} cursor effects — smooth followers, trails,
                canvas particles, ripples, and more. Built with Framer Motion &amp; TypeScript.
              </p>

              <div className="flex items-center justify-center gap-4 flex-wrap">
                <motion.button
                  onClick={scrollToGallery}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                >
                  Browse Components
                </motion.button>
                <motion.a
                  href="https://github.com/Ramex7/cursor-animation.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 font-medium rounded-xl transition-all border border-zinc-700/50 hover:border-zinc-600 flex items-center gap-2"
                >
                  <FiStar size={16} />
                  Star on GitHub
                </motion.a>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: FiGrid, label: 'Components', value: stats.total },
                  { icon: FiLayers, label: 'Categories', value: stats.categories },
                  { icon: FiDroplet, label: 'Canvas FX', value: stats.canvas },
                  { icon: FiMousePointer, label: 'Interactive', value: stats.interactive },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={statVariants}
                    whileHover={{ y: -4, borderColor: 'rgba(251,191,36,0.2)' }}
                    className="text-center p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 transition-colors"
                  >
                    <stat.icon className="mx-auto mb-1.5 text-zinc-600" size={16} />
                    <div className="text-xl font-bold text-zinc-100">{stat.value}</div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center mt-12"
            >
              <motion.button
                onClick={scrollToGallery}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                <FiArrowDown size={20} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" ref={galleryRef} className="max-w-7xl mx-auto px-6 py-12 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
          >
            <div>
              <h2 className="text-2xl font-bold">All Components</h2>
              <p className="text-zinc-500 text-sm mt-1">
                {filteredComponents.length} of {components.length} components
              </p>
            </div>
            <div className="w-full md:w-64">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                    : 'bg-zinc-800/20 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {filteredComponents.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 lg:grid-cols-2 gap-5"
              >
                {filteredComponents.map((component) => (
                  <motion.div key={component.id} variants={itemVariants}>
                    <ComponentCard
                      title={component.title}
                      description={component.description}
                      category={component.category}
                      CursorComponent={component.CursorComponent}
                      code={component.code}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-zinc-600 text-lg">No components found</p>
                <p className="text-zinc-700 text-sm mt-1">Try a different search or category</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-zinc-800/50 mt-8"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-zinc-900 font-bold text-[10px]">CL</span>
              </div>
              <p className="text-sm text-zinc-600">
                Built with Next.js, Framer Motion &amp; TypeScript
              </p>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/Ramex7/cursor-animation.git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                <FiGithub size={14} /> GitHub
              </motion.a>
              <span className="text-zinc-700 text-sm">
                &copy; {new Date().getFullYear()} Cursor Lab
              </span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Page;
