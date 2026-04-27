"use client";

import { ScoreBreakdown as ScoreBreakdownType } from "@/types";
import {
    Eye,
    Heart,
    MessageCircle,
    Share2,
    Timer,
    TrendingUp,
    Type,
    Zap,
} from "lucide-react";

interface Props {
  breakdown: ScoreBreakdownType;
}

const categories = [
  { key: "hookStrength", label: "Hook Strength", icon: Zap, desc: "First 3 seconds impact" },
  { key: "captionQuality", label: "Caption Quality", icon: Type, desc: "Copy effectiveness" },
  { key: "visualAppeal", label: "Visual Appeal", icon: Eye, desc: "Aesthetic & composition" },
  { key: "trendAlignment", label: "Trend Alignment", icon: TrendingUp, desc: "Cultural relevance" },
  { key: "engagementPotential", label: "Engagement", icon: MessageCircle, desc: "Comment & save potential" },
  { key: "pacing", label: "Pacing", icon: Timer, desc: "Rhythm & flow" },
  { key: "emotionalImpact", label: "Emotional Impact", icon: Heart, desc: "Feeling evoked" },
  { key: "shareability", label: "Shareability", icon: Share2, desc: "Will people share this?" },
];

export default function ScoreBreakdown({ breakdown }: Props) {
  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-6">Score Breakdown</h3>
      <div className="space-y-4">
        {categories.map(({ key, label, icon: Icon, desc }, index) => {
          const score = breakdown[key as keyof ScoreBreakdownType];
          return (
            <div key={key} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">{label}</span>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">{score}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(score)} transition-all duration-1000 ease-out`}
                  style={{
                    width: `${score}%`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}