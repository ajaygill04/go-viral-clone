"use client";

import { AnalysisState, ContentType, Platform } from "@/types";
import { useCallback, useState } from "react";

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    status: "idle",
    progress: 0,
    currentStep: "",
  });

  const analyze = useCallback(
    async (
      file: File | null,
      caption: string,
      platform: Platform,
      contentType: ContentType
    ) => {
      setState({
        status: "uploading",
        progress: 10,
        currentStep: "Uploading content...",
      });

      try {
        // Build form data to send to our API
        const formData = new FormData();
        if (file) formData.append("file", file);
        formData.append("caption", caption);
        formData.append("platform", platform);
        formData.append("contentType", contentType);

        // Simulate progress while waiting for AI response
        const progressSteps = [
          { p: 20, s: "Processing content..." },
          { p: 35, s: "Analyzing hook strength..." },
          { p: 50, s: "Evaluating visual appeal..." },
          { p: 65, s: "Optimizing caption..." },
          { p: 75, s: "Comparing with trends..." },
          { p: 85, s: "Generating recommendations..." },
        ];

        let stepIndex = 0;
        const progressInterval = setInterval(() => {
          if (stepIndex < progressSteps.length) {
            const step = progressSteps[stepIndex];
            setState((prev) => ({
              ...prev,
              status: "analyzing",
              progress: step.p,
              currentStep: step.s,
            }));
            stepIndex++;
          } else {
            clearInterval(progressInterval);
          }
        }, 1500);

        // Call our API route
        const response = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          throw new Error("Analysis failed");
        }

        const { data } = await response.json();

        // Done!
        setState({
          status: "complete",
          progress: 100,
          currentStep: "Analysis complete!",
          result: data,
        });

        return data;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        setState({
          status: "error",
          progress: 0,
          currentStep: "",
          error: message,
        });
        throw error;
      }
    },
    []
  );

  // Reset everything for a new analysis
  const reset = useCallback(() => {
    setState({ status: "idle", progress: 0, currentStep: "" });
  }, []);

  return { state, analyze, reset };
}