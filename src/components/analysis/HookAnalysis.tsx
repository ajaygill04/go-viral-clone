"use client";

import { HookAnalysis as HookAnalysisType } from "@/types";
import { CheckCircle, Lightbulb, Zap } from "lucide-react";

interface Props {
  analysis: HookAnalysisType;
}

export default function HookAnalysis({ analysis }: Props) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-xl">
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Hook Analysis</h3>
            <p className="text-sm text-gray-400">First 3 seconds breakdown</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">{analysis.score}</p>
          <p className="text-xs text-gray-400">/ 100</p>
        </div>
      </div>

      {/* Hook Type */}
      <div className="mb-4">
        <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium capitalize">
          {analysis.hookType} Hook
        </span>
      </div>

      {/* Description */}
      <div className="mb-5 p-4 bg-gray-800/50 rounded-xl">
        <p className="text-sm text-gray-300 leading-relaxed">
          {analysis.firstThreeSeconds}
        </p>
      </div>

      {/* Retention Prediction */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Predicted Retention</span>
          <span className="text-sm font-bold text-white">
            {analysis.retentionPrediction}%
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
            style={{ width: `${analysis.retentionPrediction}%` }}
          />
        </div>
      </div>

      {/* What Works */}
      {analysis.attentionGrabbers.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> What Works
          </h4>
          <ul className="space-y-2">
            {analysis.attentionGrabbers.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {analysis.improvements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Suggestions
          </h4>
          <ul className="space-y-2">
            {analysis.improvements.map((item, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}