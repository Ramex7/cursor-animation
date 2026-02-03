import { useState, useRef } from "react";
import { motion, MotionValue, AnimatePresence } from "framer-motion";


//TYPE DEFINITION

interface MouseOptions {
  damping?: number;
  stiffness?: number;
  mass?: number;
}

interface MouseReturn {
  x: MotionValue<number>;
  y: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

interface CursorComponentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface ComponentCardProps {
  title: string;
  description: string;
  CursorComponent: React.ComponentType<CursorComponentProps>;
  code: string;
}

interface CopyButtonProps {
  code: string;
}

interface CodeBlockProps {
  code: string;
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
      className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors border border-zinc-700"
    >
      {copied ? '✓ Copied' : 'Copy Code'}
    </button>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="relative">
      <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs">
        <code className="text-zinc-300 font-mono">{code}</code>
      </pre>
    </div>
  );
};

export const ComponentCard: React.FC<ComponentCardProps> = ({ title, description, CursorComponent, code }) => {
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef(null);

  return (
    <div className="group relative border border-zinc-800 bg-zinc-900/50 rounded-xl overflow-hidden hover:border-zinc-700 transition-all">
      {/* Playground Area */}
      <div
        ref={containerRef}
        className="relative h-64 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 flex items-center justify-center overflow-hidden"
      >
        <CursorComponent containerRef={containerRef} />
        <div className="text-center z-10">
          <div className="text-zinc-500 text-sm mb-2">Hover to activate</div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block px-6 py-3 bg-zinc-800 rounded-lg cursor-pointer"
            data-magnetic
          >
            <span className="text-zinc-200 font-medium">Interactive Zone</span>
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-zinc-100 mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm mb-4">{description}</p>

        <div className="flex gap-2">
          <CopyButton code={code} />
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors border border-zinc-700"
          >
            {showCode ? 'Hide Code' : 'View Code'}
          </button>
        </div>

        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              <CodeBlock code={code} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
