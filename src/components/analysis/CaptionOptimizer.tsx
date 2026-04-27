"use client";

import { CaptionAnalysis } from "@/types";
import { ArrowDown, Check, Copy, Hash, Type } from "lucide-react";
import { useState } from "react";

interface Props {
  analysis: CaptionAnalysis;
}

export default function CaptionOptimizer({ analysis }: Props) {
  const [copied, setCopied] = useState(false);

  const copyCaption = async () => {
    await navigator.clipboard.writeText(analysis.optimizedCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <Type className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Caption Optimizer</h3>
            <p className="text-sm text-gray-400">AI-optimized for engagement</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">{analysis.score}</p>
          <p className="text-xs text-gray-400">/ 100</p>
        </div>
      </div>

      {/* Original Caption */}
      <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 mb-3">
        <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">
          Original
        </p>
        <p className="text-sm text-gray-400 italic">
          {analysis.currentCaption || "No caption provided"}
        </p>
      </div>

      <div className="flex justify-center mb-3">
        <ArrowDown className="w-5 h-5 text-purple-400" />
      </div>

      {/* Optimized Caption */}
      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30 relative mb-6">
        <p className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wide">
          ✨ Optimized
        </p>
        <p className="text-sm text-white leading-relaxed pr-8">
          {analysis.optimizedCaption}
        </p>
        <button
          onClick={copyCaption}
          className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 bg-gray-800/50 rounded-xl text-center">
          <p className="text-2xl font-bold text-white">{analysis.ctaStrength}</p>
          <p className="text-xs text-gray-400">CTA Strength</p>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-xl text-center">
          <p className="text-2xl font-bold text-white">{analysis.readability}</p>
          <p className="text-xs text-gray-400">Readability</p>
        </div>
      </div>

      {/* Hashtags */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Hash className="w-4 h-4 text-blue-400" /> Suggested Hashtags
        </h4>
        <div className="flex flex-wrap gap-2">
          {analysis.hashtagSuggestions.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-blue-500/15 text-blue-300 rounded-full text-xs font-medium hover:bg-blue-500/25 cursor-pointer transition"
              onClick={() => navigator.clipboard.writeText(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tips */}
      {analysis.improvements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-amber-400 mb-2">
            💡 Caption Tips
          </h4>
          <ul className="space-y-1.5">
            {analysis.improvements.map((tip, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-amber-400">→</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}