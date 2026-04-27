export function getMockAnalysis(caption: string, platform: string) {
    return {
      overallScore: 72,
      breakdown: {
        hookStrength: 78,
        captionQuality: 65,
        visualAppeal: 80,
        trendAlignment: 70,
        engagementPotential: 68,
        pacing: 75,
        emotionalImpact: 62,
        shareability: 74,
      },
      hookAnalysis: {
        score: 78,
        firstThreeSeconds:
          "The opening creates immediate curiosity with a relatable scenario. The viewer is drawn in by the promise of a transformation or reveal.",
        attentionGrabbers: [
          "Strong emotional trigger in the opening",
          "Relatable POV format that audiences love",
          "Visual contrast creates curiosity",
        ],
        improvements: [
          "Add text overlay in the first second to hook scrollers",
          "Start with the most dramatic moment then rewind",
          "Use a question to create an open loop",
        ],
        hookType: "curiosity",
        retentionPrediction: 68,
      },
      captionAnalysis: {
        score: 65,
        currentCaption: caption || "No caption provided",
        optimizedCaption: `Stop scrolling — this changed my entire ${
          platform === "tiktok" ? "FYP" : "feed"
        } 🤯\n\nHere's what nobody tells you about going viral (save this for later) 👇\n\n${
          caption || "Your content here"
        }\n\nFollow for more content that actually helps 🚀`,
        hashtagSuggestions: [
          "#viral",
          "#fyp",
          "#trending",
          "#contentcreator",
          "#socialmediatips",
          `#${platform}growth`,
          "#creatortips",
          "#algorithm",
        ],
        ctaStrength: 72,
        readability: 85,
        improvements: [
          "Add a strong CTA — ask a question to drive comments",
          "Use line breaks for better readability on mobile",
          "Lead with a bold claim or surprising stat",
          "Add Save this to boost algorithm signals",
        ],
      },
      thumbnailAnalysis: {
        score: 70,
        composition:
          "Good use of the rule of thirds. The main subject is well-positioned but could benefit from more contrast.",
        colorImpact:
          "Colors are warm and inviting. Consider adding a pop of contrasting color to stand out in the feed.",
        textOverlay:
          "Add bold short text with 3-5 words max that creates curiosity. Use a contrasting color.",
        facePresence: true,
        improvements: [
          "Add expressive face close-up — faces increase CTR by 30%",
          "Use brighter more saturated colors",
          "Add a bold text overlay with 3-5 words max",
          "Create more contrast between subject and background",
        ],
      },
      pacingAnalysis: {
        score: 75,
        avgSceneDuration: 2.5,
        transitionQuality:
          "Transitions are smooth but could be more dynamic. Consider using quick cuts every 2-3 seconds.",
        energyProgression:
          "Energy starts medium and builds slightly but lacks a strong peak moment. Add a clear climax at the 60-70% mark.",
        recommendations: [
          "Cut scenes every 2-3 seconds maximum",
          "Add a pattern interrupt at the halfway point",
          "End with your strongest moment not your weakest",
          "Use speed ramping for transitions",
        ],
        timeline: [
          { timestamp: 0, energy: 75, label: "Opening hook" },
          { timestamp: 3, energy: 65, label: "Context setup" },
          { timestamp: 6, energy: 70, label: "Building interest" },
          { timestamp: 9, energy: 80, label: "Key moment" },
          { timestamp: 12, energy: 85, label: "Climax" },
          { timestamp: 15, energy: 60, label: "Resolution" },
        ],
      },
      recommendations: [
        {
          category: "hook",
          priority: "high" as const,
          suggestion:
            "Add text overlay in the first frame — 80% of viewers watch without sound",
          expectedImpact: "Could increase 3-second retention by 25-40%",
        },
        {
          category: "caption",
          priority: "high" as const,
          suggestion:
            "Start caption with a pattern interrupt like Stop scrolling or Nobody talks about this",
          expectedImpact: "Increases read-through rate by 30%",
        },
        {
          category: "trending",
          priority: "medium" as const,
          suggestion:
            "Use a trending audio — even at low volume it boosts algorithm distribution",
          expectedImpact: "Algorithm boost of 20-50% more initial impressions",
        },
        {
          category: "visual",
          priority: "medium" as const,
          suggestion:
            "Increase color saturation by 15-20% for better feed standout",
          expectedImpact: "Higher click-through rate from browse and explore",
        },
        {
          category: "pacing",
          priority: "low" as const,
          suggestion:
            "Add captions and subtitles throughout — improves watch time significantly",
          expectedImpact: "Watch time increase of 15-25%",
        },
      ],
      trendingData: {
        hashtags: [
          { name: "#viral", growth: 45, relevance: 90 },
          { name: "#fyp", growth: 12, relevance: 85 },
          { name: "#contentcreator", growth: 67, relevance: 78 },
          { name: "#growthhacks", growth: 89, relevance: 72 },
        ],
        audio: [
          { name: "Original Audio — Trending Beat", growth: 120, relevance: 65 },
          { name: "Aesthetic Vibes — Lofi", growth: 45, relevance: 80 },
          { name: "Dramatic Reveal Sound", growth: 200, relevance: 70 },
        ],
        formats: [
          { name: "POV / Story Format", growth: 55, relevance: 85 },
          { name: "Before & After", growth: 78, relevance: 70 },
          { name: "Tutorial / How-to", growth: 34, relevance: 75 },
        ],
      },
      competitorComparison: {
        averageScore: 65,
        topPerformers: [
          {
            title: "Morning routine transformation",
            score: 89,
            views: "2.4M",
            keyStrength: "Perfect hook + trending audio combo",
          },
          {
            title: "Day in my life vlog",
            score: 82,
            views: "1.1M",
            keyStrength: "Authentic storytelling + strong pacing",
          },
          {
            title: "Quick tips compilation",
            score: 78,
            views: "890K",
            keyStrength: "High value density + great captions",
          },
        ],
        gaps: [
          "Top creators use trending audio more effectively",
          "Competitors have stronger opening hooks",
          "Higher posting frequency of 2-3x daily",
        ],
        advantages: [
          "Your visual quality is above average",
          "Caption style is engaging and personal",
          "Good niche positioning",
        ],
      },
    };
  }