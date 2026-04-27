"use client";

import { Eye, Share2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ViralityScoreProps {
  score: number;
}

export default function ViralityScore({ score }: ViralityScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s >= 80) return { ring: "#22c55e", bg: "rgba(34,197,94,0.1)", label: "Viral Potential! 🔥", sub: "Your content has strong viral characteristics" };
    if (s >= 60) return { ring: "#eab308", bg: "rgba(234,179,8,0.1)", label: "Good Potential ⚡", sub: "A few tweaks could push this viral" };
    if (s >= 40) return { ring: "#f97316", bg: "rgba(249,115,22,0.1)", label: "Needs Work 💪", sub: "Follow the suggestions below to improve" };
    return { ring: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Low Potential 📈", sub: "Major changes recommended — see details below" };
  };

  const { ring, bg, label, sub } = getColor(score);
  const size = 240;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - displayScore) / 100) * circumference;

  return (
    <div className={`flex flex-col items-center gap-6 transition-all duration-1000 ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}>
      {/* Score Circle */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer glow */}
        <div
          className="absolute inset-[-20px] rounded-full blur-3xl opacity-30 transition-all duration-1000"
          style={{ backgroundColor: ring }}
        />

        {/* SVG Ring */}
        <svg width={size} height={size} className="transform -rotate-90 relative z-10">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={ring}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            className="transition-all duration-[2s] ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${ring})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="text-6xl font-black text-white tracking-tight">
            {displayScore}
          </span>
          <span className="text-xs text-gray-500 font-medium tracking-widest uppercase mt-1">
            Virality Score
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-xl font-bold mb-1" style={{ color: ring }}>{label}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>

      {/* Quick stats */}
      <div className="flex gap-4">
        {[
          { icon: Eye, label: "Reach", value: score >= 60 ? "High" : "Medium" },
          { icon: TrendingUp, label: "Growth", value: score >= 70 ? "Strong" : "Moderate" },
          { icon: Share2, label: "Shares", value: score >= 65 ? "Likely" : "Unlikely" },
        ].map(({ icon: Icon, label: l, value }) => (
          <div key={l} className="flex items-center gap-2 px-4 py-2 glass-card">
            <Icon className="w-4 h-4 text-purple-400" />
            <div>
              <p className="text-xs text-gray-500">{l}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}