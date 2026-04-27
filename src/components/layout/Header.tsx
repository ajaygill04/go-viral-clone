"use client";

import { ExternalLink, RotateCcw, Sparkles } from "lucide-react";
interface HeaderProps {
  showReset: boolean;
  onReset: () => void;
}

export default function Header({ showReset, onReset }: HeaderProps) {
  return (
    <header className="relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 rounded-xl blur-lg opacity-50" />
            <div className="relative p-2.5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold gradient-text">GoViral AI</span>
            <span className="hidden sm:inline text-xs text-gray-500 ml-2 font-medium">
              Content Virality Analyzer
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {showReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              New Analysis
            </button>
          )}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>
    </header>
  );
}