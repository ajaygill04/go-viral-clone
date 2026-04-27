"use client";

import { TrendingData } from "@/types";
import { ArrowUpRight, Hash, Layout, Music, TrendingUp } from "lucide-react";

interface Props {
  data: TrendingData;
}

export default function TrendingRecommendations({ data }: Props) {
  const sections = [
    { key: "hashtags", label: "Trending Hashtags", icon: Hash, items: data.hashtags, color: "blue" },
    { key: "audio", label: "Trending Audio", icon: Music, items: data.audio, color: "pink" },
    { key: "formats", label: "Trending Formats", icon: Layout, items: data.formats, color: "green" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    pink: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    green: "bg-green-500/15 text-green-400 border-green-500/30",
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-xl">
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Trending Now</h3>
          <p className="text-sm text-gray-400">Recommendations for your niche</p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map(({ key, label, icon: Icon, items, color }) => (
          <div key={key}>
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Icon className="w-4 h-4" /> {label}
            </h4>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-xl border ${colorMap[color]}`}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {item.growth > 0 ? "+" : ""}
                      {item.growth}%
                    </span>
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-current"
                        style={{ width: `${item.relevance}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}