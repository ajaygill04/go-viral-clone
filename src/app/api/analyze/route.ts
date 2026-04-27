import { getMockAnalysis } from "@/lib/mock";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const caption = formData.get("caption") as string;
    const platform = formData.get("platform") as string;
    const contentType = formData.get("contentType") as string;

    let analysis;

    try {
      // Try Gemini AI first
      const { analyzeContentWithGemini } = await import("@/lib/gemini");

      let imageBase64: string | null = null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        imageBase64 = buffer.toString("base64");
      }

      // Try up to 2 times
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          analysis = await analyzeContentWithGemini(
            imageBase64,
            caption,
            platform,
            contentType
          );
          break; // Success, exit loop
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.log(`Gemini attempt ${attempt} failed: ${errorMsg}`);
          if (attempt === 2) throw err;
          // Wait 2 seconds before retry
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    } catch (aiError) {
      // If Gemini fails, use mock data as fallback
      console.log("AI unavailable, using mock analysis");
      await new Promise((r) => setTimeout(r, 2000));
      analysis = getMockAnalysis(caption, platform);
    }

    const result = {
      id: uuidv4(),
      contentId: uuidv4(),
      ...analysis,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}