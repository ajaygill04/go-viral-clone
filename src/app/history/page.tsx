"use client";

import { ViralityAnalysis } from "@/types";
import {
    ArrowLeft,
    BarChart3,
    Clock,
    Sparkles,
    Trash2,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HistoryItem {
  id: string;
  analysis: ViralityAnalysis;
  caption: string;
  platform: string;
  fileName: string;
  createdAt: string;
}

const platformEmoji: Record<string, string> = {
  tiktok: "🎵",
  instagram: "📸",
  youtube: "▶️",
  twitter: "𝕏",
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("goviral-history");
      if (saved) setHistory(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const deleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("goviral-history", JSON.stringify(updated));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem("goviral-history");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Analysis History</h1>
                <p className="text-xs text-gray-500">
                  {history.length} past analyses
                </p>
              </div>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-3 py-2 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition"
            >
              <Trash2 className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {history.length === 0 ? (
          <div className="text-center py-24">
            <BarChart3 className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-400 mb-2">
              No analyses yet
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Your past analyses will appear here
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white rounded-xl font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              Analyze Content
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 flex items-center gap-5 group"
              >
                {/* Score */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/5 flex flex-col items-center justify-center">
                  <span
                    className={`text-2xl font-black ${getScoreColor(
                      item.analysis.overallScore
                    )}`}
                  >
                    {item.analysis.overallScore}
                  </span>
                  <span className="text-[10px] text-gray-600">score</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">
                      {platformEmoji[item.platform] || "📱"}
                    </span>
                    <span className="text-sm font-semibold text-white capitalize">
                      {item.platform}
                    </span>
                    {item.fileName && (
                      <span className="text-xs text-gray-600">
                        • {item.fileName}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {item.caption || "No caption"}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <TrendingUp className="w-3 h-3" />
                      Hook: {item.analysis.breakdown.hookStrength}
                    </span>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}