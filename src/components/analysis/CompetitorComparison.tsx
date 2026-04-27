"use client";

import { CompetitorComparison as CompetitorComparisonType } from "@/types";
import { TrendingDown, TrendingUp, Trophy, Users } from "lucide-react";

interface Props {
  comparison: CompetitorComparisonType;
  userScore: number;
}

export default function CompetitorComparison({ comparison, userScore }: Props) {
  const scoreDiff = userScore - comparison.averageScore;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-xl">
          <Users className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Competitor Analysis</h3>
          <p className="text-sm text-gray-400">How you stack up</p>
        </div>
      </div>

      {/* Score Comparison */}
      <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-400">{userScore}</p>
          <p className="text-xs text-gray-400">Your Score</p>
        </div>
        <div className="text-center">
          <span
            className={`text-lg font-bold ${
              scoreDiff >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {scoreDiff >= 0 ? "+" : ""}
            {scoreDiff}
          </span>
          <p className="text-xs text-gray-400">vs Average</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-400">
            {comparison.averageScore}
          </p>
          <p className="text-xs text-gray-400">Avg Score</p>
        </div>
      </div>

      {/* Top Performers */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" /> Top Performers in Niche
        </h4>
        <div className="space-y-2">
          {comparison.topPerformers.map((comp, i) => (
            <div
              key={i}
              className="p-3 bg-white/[0.03] rounded-xl flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{comp.title}</p>
                <p className="text-xs text-gray-400">{comp.keyStrength}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-lg font-bold text-white">{comp.score}</p>
                <p className="text-xs text-gray-500">{comp.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gaps & Advantages */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> Gaps
          </h4>
          <ul className="space-y-1.5">
            {comparison.gaps.map((gap, i) => (
              <li key={i} className="text-xs text-gray-400">
                • {gap}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Strengths
          </h4>
          <ul className="space-y-1.5">
            {comparison.advantages.map((adv, i) => (
              <li key={i} className="text-xs text-gray-400">
                • {adv}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}