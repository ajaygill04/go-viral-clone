"use client";

import { ViralityAnalysis } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface HistoryItem {
  id: string;
  analysis: ViralityAnalysis;
  caption: string;
  platform: string;
  fileName: string;
  createdAt: string;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("goviral-history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore errors
    }
  }, []);

  // Save a new analysis
  const saveAnalysis = useCallback(
    (
      analysis: ViralityAnalysis,
      caption: string,
      platform: string,
      fileName: string
    ) => {
      const item: HistoryItem = {
        id: analysis.id,
        analysis,
        caption,
        platform,
        fileName,
        createdAt: new Date().toISOString(),
      };

      setHistory((prev) => {
        const updated = [item, ...prev].slice(0, 20); // Keep last 20
        localStorage.setItem("goviral-history", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  // Delete one item
  const deleteItem = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("goviral-history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear all
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("goviral-history");
  }, []);

  return { history, saveAnalysis, deleteItem, clearHistory };
}