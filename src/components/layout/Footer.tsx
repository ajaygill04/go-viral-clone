"use client";

import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold gradient-text">GoViral AI</span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-xs text-gray-500">AI-Powered Content Analysis</span>
          </div>

          {/* Middle */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>using Next.js + Gemini AI</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">
              © 2026 GoViral AI. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}