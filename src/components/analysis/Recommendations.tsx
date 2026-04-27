"use client";

import { Recommendation } from "@/types";
import { ArrowDown, ArrowUp, Lightbulb, Minus } from "lucide-react";

interface Props {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: Props) {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          bg: "bg-red-500/15",
          border: "border-red-500/30",
          text: "text-red-400",
          icon: <ArrowUp className="w-3 h-3" />,
        };
      case "medium":
        return {
          bg: "bg-yellow-500/15",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
          icon: <Minus className="w-3 h-3" />,
        };
      default:
        return {
          bg: "bg-green-500/15",
          border: "border-green-500/30",
          text: "text-green-400",
          icon: <ArrowDown className="w-3 h-3" />,
        };
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/20 rounded-xl">
          <Lightbulb className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Action Items</h3>
          <p className="text-sm text-gray-400">Prioritized recommendations</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const styles = getPriorityStyles(rec.priority);
          return (
            <div
              key={i}
              className={`p-4 rounded-xl border ${styles.bg} ${styles.border}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${styles.text} ${styles.bg}`}
                  >
                    {styles.icon}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    {rec.category}
                  </span>
                </div>
                <span className={`text-xs font-medium capitalize ${styles.text}`}>
                  {rec.priority} priority
                </span>
              </div>
              <p className="text-sm text-white font-medium mb-1">
                {rec.suggestion}
              </p>
              <p className="text-xs text-gray-400">
                Expected impact: {rec.expectedImpact}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}