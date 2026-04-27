"use client";

import { Check, Download, Share2 } from "lucide-react";
import { useState } from "react";

interface Props {
  score: number;
  platform: string;
}

export default function ExportReport({ score, platform }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const element = document.getElementById("results-container");
      if (!element) return;

      const dataUrl = await toPng(element, {
        backgroundColor: "#050507",
        quality: 0.95,
      });

      const link = document.createElement("a");
      link.download = `goviral-report-${score}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
    setDownloading(false);
  };

  const handleShare = async () => {
    const text = `🚀 My content scored ${score}/100 on GoViral AI!\n\nAnalyzed for ${platform} virality.\n\nCheck yours: ${window.location.origin}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-3 justify-center">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2 px-5 py-3 glass-card hover:bg-white/10 transition font-semibold text-sm"
      >
        <Download className="w-4 h-4 text-purple-400" />
        {downloading ? "Exporting..." : "Download Report"}
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-5 py-3 glass-card hover:bg-white/10 transition font-semibold text-sm"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-400" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-pink-400" />
            Share Score
          </>
        )}
      </button>
    </div>
  );
}