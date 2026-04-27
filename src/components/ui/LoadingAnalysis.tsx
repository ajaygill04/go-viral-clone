"use client";

import {
    BarChart3,
    Eye,
    Sparkles,
    TrendingUp,
    Type,
    Zap,
} from "lucide-react";

interface Props {
  progress: number;
  currentStep: string;
}

const steps = [
  { icon: Zap, label: "Analyzing hook", color: "text-yellow-400" },
  { icon: Eye, label: "Checking visuals", color: "text-blue-400" },
  { icon: Type, label: "Optimizing caption", color: "text-green-400" },
  { icon: TrendingUp, label: "Comparing trends", color: "text-pink-400" },
  { icon: BarChart3, label: "Scoring content", color: "text-purple-400" },
];

export default function LoadingAnalysis({ progress, currentStep }: Props) {
  const activeStep = Math.min(Math.floor(progress / 20), steps.length - 1);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-8">
      {/* Animated spinner */}
      <div className="relative mb-12">
        {/* Outer ring */}
        <div className="w-32 h-32 rounded-full border-2 border-white/5 flex items-center justify-center">
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(168,85,247,0.5), transparent)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))",
            }}
          />
          {/* Center icon */}
          <div className="relative p-4 bg-purple-500/20 rounded-full">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-2xl" />
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map(({ icon: Icon, label, color }, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all duration-500 ${
              i <= activeStep
                ? `bg-white/10 ${color}`
                : "bg-white/5 text-gray-600"
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 h-0.5 rounded transition-all duration-500 ${
                i < activeStep ? "bg-purple-500" : "bg-white/5"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-6">
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-600">{progress}%</span>
          <span className="text-xs text-gray-600">100%</span>
        </div>
      </div>

      {/* Current step text */}
      <p className="text-lg font-semibold text-white mb-1">{currentStep}</p>
      <p className="text-sm text-gray-500">This usually takes 5-10 seconds</p>
    </div>
  );
}