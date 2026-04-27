import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeContentWithGemini(
  imageBase64: string | null,
  caption: string,
  platform: string,
  contentType: string
) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `You are an elite social media content analyst and viral content strategist.
You have deep expertise in what makes content go viral on ${platform}.

Analyze this ${contentType} content for ${platform} viral potential.

Caption: "${caption || "No caption provided"}"

Rate honestly — most content scores between 40-70. Only truly exceptional content scores above 85.

Respond ONLY with valid JSON (no markdown, no code blocks) with this exact structure:
{
  "overallScore": <number 0-100>,
  "breakdown": {
    "hookStrength": <number 0-100>,
    "captionQuality": <number 0-100>,
    "visualAppeal": <number 0-100>,
    "trendAlignment": <number 0-100>,
    "engagementPotential": <number 0-100>,
    "pacing": <number 0-100>,
    "emotionalImpact": <number 0-100>,
    "shareability": <number 0-100>
  },
  "hookAnalysis": {
    "score": <number 0-100>,
    "firstThreeSeconds": "<description of what happens in opening>",
    "attentionGrabbers": ["<specific element 1>", "<specific element 2>", "<specific element 3>"],
    "improvements": ["<specific suggestion 1>", "<specific suggestion 2>", "<specific suggestion 3>"],
    "hookType": "<curiosity|shock|emotion|question|visual>",
    "retentionPrediction": <number 0-100>
  },
  "captionAnalysis": {
    "score": <number 0-100>,
    "currentCaption": "${caption || "No caption provided"}",
    "optimizedCaption": "<improved version of the caption>",
    "hashtagSuggestions": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
    "ctaStrength": <number 0-100>,
    "readability": <number 0-100>,
    "improvements": ["<specific suggestion 1>", "<specific suggestion 2>"]
  },
  "thumbnailAnalysis": {
    "score": <number 0-100>,
    "composition": "<composition analysis>",
    "colorImpact": "<color analysis>",
    "textOverlay": "<text overlay suggestion>",
    "facePresence": true,
    "improvements": ["<suggestion 1>", "<suggestion 2>"]
  },
  "pacingAnalysis": {
    "score": <number 0-100>,
    "avgSceneDuration": 2.5,
    "transitionQuality": "<transition analysis>",
    "energyProgression": "<energy flow analysis>",
    "recommendations": ["<suggestion 1>", "<suggestion 2>"],
    "timeline": [
      {"timestamp": 0, "energy": 75, "label": "Opening"},
      {"timestamp": 3, "energy": 65, "label": "Build up"},
      {"timestamp": 6, "energy": 80, "label": "Peak"},
      {"timestamp": 9, "energy": 85, "label": "Climax"},
      {"timestamp": 12, "energy": 60, "label": "Closing"}
    ]
  },
  "recommendations": [
    {
      "category": "hook",
      "priority": "high",
      "suggestion": "<specific actionable suggestion>",
      "expectedImpact": "<expected improvement>"
    },
    {
      "category": "caption",
      "priority": "high",
      "suggestion": "<specific actionable suggestion>",
      "expectedImpact": "<expected improvement>"
    },
    {
      "category": "trending",
      "priority": "medium",
      "suggestion": "<specific actionable suggestion>",
      "expectedImpact": "<expected improvement>"
    },
    {
      "category": "visual",
      "priority": "medium",
      "suggestion": "<specific actionable suggestion>",
      "expectedImpact": "<expected improvement>"
    },
    {
      "category": "pacing",
      "priority": "low",
      "suggestion": "<specific actionable suggestion>",
      "expectedImpact": "<expected improvement>"
    }
  ],
  "trendingData": {
    "hashtags": [
      {"name": "#hashtag1", "growth": 45, "relevance": 90},
      {"name": "#hashtag2", "growth": 67, "relevance": 78},
      {"name": "#hashtag3", "growth": 89, "relevance": 72}
    ],
    "audio": [
      {"name": "Trending Sound 1", "growth": 120, "relevance": 65},
      {"name": "Trending Sound 2", "growth": 45, "relevance": 80}
    ],
    "formats": [
      {"name": "Format 1", "growth": 55, "relevance": 85},
      {"name": "Format 2", "growth": 78, "relevance": 70}
    ]
  },
  "competitorComparison": {
    "averageScore": 65,
    "topPerformers": [
      {"title": "Top content 1", "score": 89, "views": "2.4M", "keyStrength": "What makes it work"},
      {"title": "Top content 2", "score": 82, "views": "1.1M", "keyStrength": "What makes it work"}
    ],
    "gaps": ["Gap 1", "Gap 2"],
    "advantages": ["Advantage 1", "Advantage 2"]
  }
}

Be brutally honest but constructive. Every suggestion must be specific and actionable.`;

  let result;

  if (imageBase64) {
    // Analyze with image
    result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg",
        },
      },
    ]);
  } else {
    // Text-only analysis
    result = await model.generateContent(prompt);
  }

  const responseText = result.response.text();

  // Clean the response — remove markdown code blocks if present
  const cleanedText = responseText
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return JSON.parse(cleanedText);
}