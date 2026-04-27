import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ============================================================
// MAIN FUNCTION — Sends content to GPT-4o for analysis
// ============================================================
export async function analyzeContentWithAI(
  imageBase64: string | null,
  caption: string,
  platform: string,
  contentType: string
) {
  // Build the messages array for the API call
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: getSystemPrompt(platform),
    },
  ];

  // If we have an image, use GPT-4o's vision capability
  if (imageBase64) {
    messages.push({
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${imageBase64}`,
            detail: "high",
          },
        },
        {
          type: "text",
          text: getAnalysisPrompt(caption, platform, contentType),
        },
      ],
    });
  } else {
    // Text-only analysis (just caption)
    messages.push({
      role: "user",
      content: getAnalysisPrompt(caption, platform, contentType),
    });
  }

  // Call the OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    max_tokens: 4000,
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  // Parse and return the JSON response
  return JSON.parse(response.choices[0].message.content || "{}");
}

// ============================================================
// SYSTEM PROMPT — Makes GPT-4o act as a viral content expert
// ============================================================
function getSystemPrompt(platform: string): string {
  return `You are an elite social media content analyst and viral content strategist.
You have deep expertise in what makes content go viral on ${platform}.

Your analysis is data-driven, specific, and actionable. You understand:
- Hook psychology and the first-3-second rule
- Algorithm optimization for each platform
- Visual composition and thumbnail psychology
- Caption copywriting for maximum engagement
- Trending patterns and cultural relevance
- Pacing and retention optimization

Always respond with specific, actionable feedback — never vague generalities.
Rate honestly — most content scores between 40-70. Only truly exceptional content scores above 85.

Respond in valid JSON format matching the requested schema exactly.`;
}

// ============================================================
// ANALYSIS PROMPT — Tells GPT-4o exactly what to analyze
// ============================================================
function getAnalysisPrompt(
  caption: string,
  platform: string,
  contentType: string
): string {
  return `Analyze this ${contentType} content for ${platform} viral potential.

Caption: "${caption || "No caption provided"}"

Provide a comprehensive JSON analysis with this exact structure:
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
    "attentionGrabbers": ["<specific element>"],
    "improvements": ["<specific suggestion>"],
    "hookType": "<curiosity|shock|emotion|question|visual>",
    "retentionPrediction": <number 0-100>
  },
  "captionAnalysis": {
    "score": <number 0-100>,
    "currentCaption": "${caption || "No caption provided"}",
    "optimizedCaption": "<improved version>",
    "hashtagSuggestions": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
    "ctaStrength": <number 0-100>,
    "readability": <number 0-100>,
    "improvements": ["<specific suggestion>"]
  },
  "thumbnailAnalysis": {
    "score": <number 0-100>,
    "composition": "<analysis>",
    "colorImpact": "<analysis>",
    "textOverlay": "<suggestion>",
    "facePresence": <boolean>,
    "improvements": ["<suggestion>"]
  },
  "pacingAnalysis": {
    "score": <number 0-100>,
    "avgSceneDuration": <seconds>,
    "transitionQuality": "<analysis>",
    "energyProgression": "<analysis>",
    "recommendations": ["<suggestion>"],
    "timeline": [
      {"timestamp": 0, "energy": <0-100>, "label": "<description>"},
      {"timestamp": 3, "energy": <0-100>, "label": "<description>"},
      {"timestamp": 6, "energy": <0-100>, "label": "<description>"}
    ]
  },
  "recommendations": [
    {
      "category": "<hook|caption|visual|audio|pacing|trending>",
      "priority": "<high|medium|low>",
      "suggestion": "<specific actionable suggestion>",
      "expectedImpact": "<expected improvement description>"
    }
  ],
  "trendingData": {
    "hashtags": [
      {"name": "#hashtag", "growth": <percentage>, "relevance": <0-100>}
    ],
    "audio": [
      {"name": "<trending sound>", "growth": <percentage>, "relevance": <0-100>}
    ],
    "formats": [
      {"name": "<format type>", "growth": <percentage>, "relevance": <0-100>}
    ]
  },
  "competitorComparison": {
    "averageScore": <number>,
    "topPerformers": [
      {"title": "<content description>", "score": <number>, "views": "<view count>", "keyStrength": "<what makes it work>"}
    ],
    "gaps": ["<what competitors do better>"],
    "advantages": ["<what this content does well>"]
  }
}

Be brutally honest but constructive. Every suggestion must be specific and immediately actionable.`;
}

export { openai };
