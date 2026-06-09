'use client';
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiSearch, FiCopy, FiCheck, FiCode, FiEye } from "react-icons/fi";

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

interface CopyButtonProps {
  code: string;
}

interface CodeBlockProps {
  code: string;
  visible: boolean;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('theme') !== 'light'
  );
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    const isDark = localStorage.getItem('theme') !== 'light';
    document.documentElement.classList.toggle('dark', isDark);
    queueMicrotask(() => setDark(isDark));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors border border-zinc-700"
      aria-label="Toggle theme"
    >
      {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
      <input
        type="text"
        placeholder="Search components..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/80 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors text-sm"
      />
    </div>
  );
}

const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
    >
      {copied ? <><FiCheck size={14} /> Copied</> : <><FiCopy size={14} /> Copy</>}
    </button>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs mt-3">
            <code className="text-zinc-300 font-mono leading-relaxed">{code}</code>
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const categoryColors: Record<string, string> = {
  basic: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  interactive: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  trails: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  canvas: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  effects: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, description, category, CursorComponent, code }) => {
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-zinc-700/80 transition-all duration-300"
    >
      <div
        ref={containerRef}
        className="relative h-64 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800/80 flex items-center justify-center overflow-hidden"
      >
        <CursorComponent containerRef={containerRef} />
        <div className="text-center z-10">
          <div className="text-zinc-600 text-xs mb-3 font-mono tracking-wider uppercase">hover to activate</div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-3.5 bg-zinc-800/80 rounded-xl border border-zinc-700/50 cursor-pointer backdrop-blur-sm"
            data-magnetic
          >
            <span className="text-zinc-200 font-medium text-sm">Interactive Zone</span>
          </motion.div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryColors[category] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
            {category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-zinc-100 mb-1">{title}</h3>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex gap-2">
          <CopyButton code={code} />
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
          >
            {showCode ? <><FiEye size={14} /> Hide</> : <><FiCode size={14} /> Code</>}
          </button>
        </div>

        <CodeBlock code={code} visible={showCode} />
      </div>
    </motion.div>
  );
};
