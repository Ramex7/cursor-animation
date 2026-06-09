'use client';
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCopy, FiCheck, FiCode, FiGithub } from "react-icons/fi";

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface ComponentCardProps {
  title: string;
  description: string;
  category: string;
  CursorComponent: React.ComponentType<CursorComponentProps>;
  code: string;
}

const categoryColors: Record<string, string> = {
  basic: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  interactive: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  trails: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  canvas: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  effects: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
      <input
        type="text"
        placeholder="Search components..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500/80 transition-colors text-sm"
      />
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-zinc-200 rounded-lg transition-all border border-zinc-700/50 hover:border-zinc-600"
    >
      {copied ? <><FiCheck size={12} /> Copied</> : <><FiCopy size={12} /> Copy</>}
    </button>
  );
}

function CodeBlock({ code, visible }: { code: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs mt-3 max-h-96 overflow-y-auto">
            <code className="text-zinc-300 font-mono leading-relaxed whitespace-pre">{code}</code>
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, description, category, CursorComponent, code }) => {
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-zinc-700/60 transition-all duration-300"
    >
      <div
        ref={containerRef}
        className="relative h-56 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] flex items-center justify-center overflow-hidden cursor-default"
      >
        <CursorComponent containerRef={containerRef} />
        <div className="text-center z-10 select-none pointer-events-none">
          <div className="text-zinc-600 text-[10px] mb-2 font-mono tracking-[0.2em] uppercase">hover to activate</div>
          <div className="inline-block px-8 py-3.5 bg-zinc-800/60 rounded-xl border border-zinc-700/40 backdrop-blur-sm">
            <span className="text-zinc-400 font-medium text-sm select-none">Interactive Zone</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${categoryColors[category] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
            {category}
          </span>
        </div>
        <h3 className="text-base font-bold text-zinc-100 mb-1">{title}</h3>
        <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex gap-2">
          <CopyButton code={code} />
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
              showCode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-zinc-200 border-zinc-700/50 hover:border-zinc-600'
            }`}
          >
            {showCode ? <FiCopy size={12} /> : <FiCode size={12} />}
            {showCode ? 'Hide' : 'Code'}
          </button>
        </div>

        <CodeBlock code={code} visible={showCode} />
      </div>
    </motion.div>
  );
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-zinc-900 font-bold text-xs">CL</span>
          </div>
          <span className="font-bold text-base">Cursor <span className="text-amber-400">Lab</span></span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#gallery"
            className="hidden sm:block text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Components
          </a>
          <a
            href="https://github.com/Ramex7/cursor-animation.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 rounded-xl text-sm font-medium transition-all border border-zinc-700/50 hover:border-zinc-600"
          >
            <FiGithub size={15} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
