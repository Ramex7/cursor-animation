'use client'
import React, { useState } from 'react';
import { ComponentCard } from '@/components/Ui';
import { components } from '@/data/data';
import { categories } from '@/data/categories';
import { TbMenuOrder } from "react-icons/tb";

const page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredComponents = selectedCategory === 'all'
    ? components
    : components.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Nice <span className="text-zinc-500">cursor</span>
              </h1>
            </div>
            <a
              href="https://github.com/Ramex7/cursor-animation.git"
              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden sm:block w-20 lg:w-fit">
            <div className="sticky top-32">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
                <span className='lg:hidden'><TbMenuOrder /></span>
                <span className='hidden lg:block'>Categories</span>
              </h2>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-zinc-800 text-zinc-100'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Component Gallery</h2>
              <p className="text-zinc-400">
                Hover over each card to see the cursor animation in action
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  title={component.title}
                  description={component.description}
                  CursorComponent={component.CursorComponent}
                  code={component.code}
                />
              ))}
            </div>

            {filteredComponents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-zinc-500">No components in this category</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-zinc-500">
              Built with Next.js, TypeScript, and Framer Motion
            </p>
            <p className="text-sm text-zinc-500">
              © 2026 Nice Cursor. Inspired by Cursify.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;