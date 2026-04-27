"use client";

import CaptionOptimizer from "@/components/analysis/CaptionOptimizer";
import CompetitorComparison from "@/components/analysis/CompetitorComparison";
import HookAnalysis from "@/components/analysis/HookAnalysis";
import Recommendations from "@/components/analysis/Recommendations";
import ScoreBreakdown from "@/components/analysis/ScoreBreakdown";
import TrendingRecommendations from "@/components/analysis/TrendingRecommendations";
import ViralityScore from "@/components/analysis/ViralityScore";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import LoadingAnalysis from "@/components/ui/LoadingAnalysis";
import UploadZone from "@/components/upload/UploadZone";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useHistory } from "@/hooks/useHistory";
import { ContentType, Platform } from "@/types";
import {
    ArrowRight,
    BarChart3,
    Clock,
    Sparkles,
    Star,
    TrendingUp,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [contentType, setContentType] = useState<ContentType>("video");
  const [caption, setCaption] = useState("");
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const { state, analyze, reset } = useAnalysis();
  const { history, saveAnalysis } = useHistory();

  const platforms: { value: Platform; label: string; emoji: string }[] = [
    { value: "tiktok", label: "TikTok", emoji: "🎵" },
    { value: "instagram", label: "Instagram", emoji: "📸" },
    { value: "youtube", label: "YouTube", emoji: "▶️" },
    { value: "twitter", label: "X / Twitter", emoji: "𝕏" },
  ];

  const handleAnalyze = async () => {
    if (!file && !caption) return;
    const result = await analyze(file, caption, platform, contentType);
    if (result) {
      saveAnalysis(result, caption, platform, file?.name || "");
    }
  };

  const handleReset = () => {
    setFile(null);
    setCaption("");
    reset();
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white relative">
      <AnimatedBackground />
      <Header showReset={state.status === "complete"} onReset={handleReset} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* ============ UPLOAD STATE ============ */}
        {state.status === "idle" && (
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-14 pt-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm text-gray-400 mb-6">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span>AI-Powered Content Analysis</span>
                <span className="text-purple-400 font-semibold">Free</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-5 leading-[1.1] tracking-tight">
                Will your content
                <br />
                <span className="gradient-text">go viral?</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                Upload your content and get an AI-powered virality score with
                actionable feedback to maximize your reach.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  { icon: Zap, label: "Hook Analysis", desc: "First 3 seconds", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
                  { icon: BarChart3, label: "8 Metrics", desc: "Scored 0-100", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                  { icon: TrendingUp, label: "Trend Match", desc: "Real-time", color: "text-green-400 bg-green-500/10 border-green-500/20" },
                ].map(({ icon: Icon, label, desc, color }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm ${color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <div className="text-left">
                      <p className="font-semibold">{label}</p>
                      <p className="text-xs opacity-60">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* History Link */}
            {history.length > 0 && (
              <Link
                href="/history"
                className="flex items-center justify-between p-4 glass-card mb-6 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      View Past Analyses
                    </p>
                    <p className="text-xs text-gray-500">
                      {history.length} previous {history.length === 1 ? "analysis" : "analyses"}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition" />
              </Link>
            )}

            {/* Platform Selector */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-300 mb-3 block tracking-wide">
                🎯 Target Platform
              </label>
              <div className="flex gap-2 flex-wrap">
                {platforms.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => setPlatform(value)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                      platform === value
                        ? "bg-purple-500/20 border-purple-500/40 text-purple-300 glow-purple"
                        : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:bg-white/[0.06] hover:border-white/10"
                    }`}
                  >
                    <span className="text-lg">{emoji}</span> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Zone */}
            <UploadZone
              onFileSelect={(f, type) => {
                setFile(f);
                setContentType(type);
              }}
              selectedFile={file}
              onClear={() => setFile(null)}
            />

            {/* Caption Input */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-300 mb-2 block tracking-wide">
                ✍️ Caption / Post Text
              </label>
              <div className="glass-card overflow-hidden">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Paste your caption here... (optional if uploading media)"
                  className="w-full h-32 bg-transparent p-5 text-white placeholder-gray-600 resize-none focus:outline-none text-sm leading-relaxed"
                />
                <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {caption.length} characters
                  </span>
                  <span className="text-xs text-gray-600">
                    {caption.length > 0 ? "✓ Caption added" : "Optional"}
                  </span>
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!file && !caption}
              className={`w-full mt-8 py-5 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all duration-500 ${
                file || caption
                  ? "btn-primary text-white cursor-pointer"
                  : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Analyze Virality
              {(file || caption) && <ArrowRight className="w-5 h-5" />}
            </button>

            <p className="text-center text-xs text-gray-600 mt-4">
              🔒 Your content is analyzed securely and never stored
            </p>
          </div>
        )}

        {/* ============ LOADING STATE ============ */}
        {(state.status === "uploading" || state.status === "analyzing") && (
          <LoadingAnalysis
            progress={state.progress}
            currentStep={state.currentStep}
          />
        )}

        {/* ============ ERROR STATE ============ */}
        {state.status === "error" && (
          <div className="max-w-md mx-auto text-center py-24">
            <div className="glass-card p-10">
              <p className="text-4xl mb-4">😵</p>
              <p className="text-red-400 text-lg font-semibold mb-2">
                Analysis Failed
              </p>
              <p className="text-gray-500 text-sm mb-6">{state.error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 btn-primary text-white rounded-xl font-semibold"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ============ RESULTS STATE ============ */}
        {state.status === "complete" && state.result && (
          <div>
            <div className="text-center mb-14 pt-4">
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest font-medium">
                Analysis Complete
              </p>
              <h2 className="text-3xl font-bold text-white mb-10">
                Your Virality Report
              </h2>
              <ViralityScore score={state.result.overallScore} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ScoreBreakdown breakdown={state.result.breakdown} />
                <HookAnalysis analysis={state.result.hookAnalysis} />
              </div>
              <div className="space-y-6">
                <CaptionOptimizer analysis={state.result.captionAnalysis} />
                <Recommendations
                  recommendations={state.result.recommendations}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <TrendingRecommendations data={state.result.trendingData} />
              <CompetitorComparison
                comparison={state.result.competitorComparison}
                userScore={state.result.overallScore}
              />
            </div>

            {/* Analyze Again Button */}
            <div className="text-center mt-12">
              <button
                onClick={handleReset}
                className="px-8 py-4 btn-primary text-white rounded-xl font-bold text-lg inline-flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Analyze Another
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}