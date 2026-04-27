# 🤖 AI Development Logs — GoViral AI

## Project: Go Viral Clone — AI Content Virality Analyzer
## Developer: Akriti Thakur
## Date: April 27, 2026
## AI Tool Used: Claude (Anthropic) via Model Playground on Outlier

---

## 📋 Development Timeline

### Session Overview
- **Total Development Time:** ~4 hours
- **AI Interactions:** 30+ prompts across architecture, coding, debugging, and deployment
- **Approach:** Step-by-step guided development with AI assistance
- **Key Decisions Made With AI:** Tech stack, architecture, API choice, error handling strategy

---

## 🏗️ Phase 1: Project Architecture & Setup

### Prompt 1: Initial Project Scoping
**Me:** Build a Go Viral Clone — AI Content Virality Analyzer. Upload your video or post and let AI score its viral potential, explain what works, and suggest edits to maximize reach.

**AI Response:** Provided complete project architecture including:
- Tech stack recommendation (Next.js 14 + TypeScript + Tailwind CSS)
- Full folder structure with separation of concerns
- Component hierarchy planning
- API route design
- Type-first development approach

**Decision Made:** Adopted Next.js App Router with TypeScript for type safety across the entire AI response pipeline.

---

### Prompt 2: Step-by-Step Guidance Request
**Me:** Let's start building this project stepwise and tell me what we are doing and why.

**AI Response:** Broke down the entire build into 13 sequential steps with explanations:
1. Project initialization
2. Dependency installation
3. Folder structure creation
4. TypeScript type definitions
5. Environment configuration
6. Global styles
7. AI analysis engine
8. API routes
9. Custom hooks
10. Upload components
11. Analysis result components
12. Main page assembly
13. Polish and edge cases

**Why This Mattered:** Understanding the "why" behind each step helped me make informed decisions rather than blindly copying code.

---

## 📐 Phase 2: Type-First Development

### Prompt 3: Defining Data Contracts
**AI guided me to create types FIRST before any logic.**

Key types defined:
- `ViralityAnalysis` — Complete analysis result (13 properties)
- `ScoreBreakdown` — 8 scoring metrics (hook, caption, visual, trend, engagement, pacing, emotion, shareability)
- `HookAnalysis` — First 3 seconds deep dive
- `CaptionAnalysis` — Caption scoring and AI optimization
- `AnalysisState` — UI state machine (idle → uploading → analyzing → complete → error)

**Learning:** Defining types first meant the AI engine, API route, and frontend components all shared a single source of truth. Zero data shape mismatches.

---

## 🧠 Phase 3: AI Integration

### Prompt 4: AI Provider Selection
**Me:** Can I use Google AI Studio (Gemini), Groq, or OpenRouter instead of OpenAI?

**AI Response:** Recommended Google Gemini because:
- Free API tier with generous rate limits
- Vision capability (can analyze images)
- Fast response times
- Easy SDK integration

**Decision Made:** Switched from OpenAI GPT-4o to Google Gemini 2.5 Flash.

---

### Prompt 5: Gemini Integration
**AI provided the complete Gemini integration including:**
- SDK setup with `@google/generative-ai`
- System prompt engineering for viral content analysis
- JSON response schema enforcement
- Image analysis via `inlineData` with base64 encoding
- Response cleaning (stripping markdown code blocks)

**Key Prompt Engineering Insight:**
The AI suggested including "Rate honestly — most content scores between 40-70. Only truly exceptional content scores above 85." This prevents the AI from giving inflated scores, making the tool more credible.

---

## 🐛 Phase 4: Debugging & Problem Solving

### Bug 1: Missing Default Files
**Problem:** `src/app/` was missing `layout.tsx`, `page.tsx`, and `globals.css`
**Discovery Method:** AI suggested running `ls src/app/` to diagnose
**Root Cause:** A duplicate `app/` folder existed in the project root
**Fix:** `rm -rf app` removed the conflicting folder
**Learning:** Next.js can have ambiguous routing when duplicate folders exist

---

### Bug 2: Tailwind CSS v4 Incompatibility
**Problem:** `Cannot apply unknown utility class 'text-white'`
**Error Context:**
@layer base {
body {
@apply bg-[#0a0a0f] text-white antialiased; // ← FAILED
}
}
**Root Cause:** Tailwind v4 changed how `@apply` works inside `@layer` blocks
**Fix:** Replaced all `@apply` directives with plain CSS properties
**AI's Role:** Identified this as a Tailwind v4 breaking change and rewrote the entire CSS file

---

### Bug 3: TypeScript Path Aliases Not Working
**Problem:** `Cannot find module '@/lib/openai'`
**Root Cause:** `tsconfig.json` had `"@/*": ["./*"]` but code was in `src/`
**Fix:** Changed to `"@/*": ["./src/*"]`
**AI's Role:** Asked me to run `cat tsconfig.json` to diagnose, immediately spotted the path mismatch

---

### Bug 4: Gemini Model Deprecated
**Problem:** `models/gemini-1.5-flash is not found for API version v1beta`
**Root Cause:** Google deprecated `gemini-1.5-flash`
**Fix:** Updated to `gemini-2.5-flash`
**AI's Role:** Researched the current model names and provided the correct replacement

---

### Bug 5: CSS Import Ordering
**Problem:** `@import rules must precede all rules aside from @charset and @layer statements`
**Root Cause:** Google Fonts `@import` was placed after `@import "tailwindcss"`
**Fix:** Removed Google Fonts CSS import entirely, used system fonts instead
**Learning:** Tailwind v4 expands `@import "tailwindcss"` into multiple rules, so no other `@import` can come after it

---

### Bug 6: Gemini 503 Rate Limiting
**Problem:** `503 Service Unavailable - This model is currently experiencing high demand`
**Fix:** Implemented three-layer resilience:
1. Auto-retry with 2-second delay
2. Fallback to mock data if all retries fail
3. Clear error messaging to users
**AI's Role:** Designed the retry + fallback pattern in the API route

---

### Bug 7: Lucide Icon Name Change
**Problem:** `Module '"lucide-react"' has no exported member 'Github'`
**Root Cause:** Icon was renamed in newer lucide-react version
**Fix:** Replaced `Github` with `ExternalLink`

---

## 🎨 Phase 5: UI/UX Enhancement

### Prompt 6: UI Modernization
**Me:** Make it advance by adding visual and many more things so people attract to this and my project also gets selected.

**AI Response:** Complete UI overhaul including:
- Animated floating orbs background (`AnimatedBackground.tsx`)
- Glassmorphism card design system
- Gradient text and border effects
- Enhanced header with logo glow effect
- Professional footer with branding
- Upgraded upload zone with hover animations
- Multi-step loading animation with stage indicators
- Enhanced score circle with glow and quick stats
- Color-coded priority system for recommendations

**Components Created:**
1. `AnimatedBackground.tsx` — Floating orbs + grid pattern + radial gradient
2. `Header.tsx` — Logo with glow, navigation, reset button
3. `Footer.tsx` — Branding, tech stack credit
4. `ExportReport.tsx` — Download as image + share to clipboard

---

## 📊 Phase 6: Feature Development

### Features Built With AI Assistance:

| Feature | AI Contribution | My Contribution |
|---------|----------------|-----------------|
| File Upload (drag & drop) | Provided react-dropzone integration | Tested with various file types |
| Virality Score (0-100) | Designed animated SVG circle | Tuned animation timing |
| 8-Metric Breakdown | Created scoring categories | Validated metric relevance |
| Hook Analysis | Engineered the prompt for first-3-second analysis | Refined prompt wording |
| Caption Optimizer | Built before/after comparison UI | Added copy-to-clipboard |
| Trending Recommendations | Structured the data display | Chose color coding scheme |
| Competitor Comparison | Designed the comparison layout | Added score difference calc |
| Analysis History | Built localStorage persistence | Defined 20-item limit |
| Export as Image | Integrated html-to-image library | Positioned the export buttons |
| Mock Data Fallback | Created realistic mock responses | Ensured data shape matched types |

---

## 🔑 Key AI-Assisted Decisions

### 1. Type-First Development
AI recommended defining all TypeScript interfaces before writing any logic. This meant:
- The Gemini prompt could request exact JSON structure
- Components had autocomplete from day one
- Zero runtime type errors

### 2. Progressive Enhancement
Built the app in layers:
- First: Static UI that works
- Then: AI integration
- Then: Error handling & fallbacks
- Finally: Polish & animations

### 3. Resilient API Design
AI designed a three-tier reliability system:
Gemini AI (primary) → Retry once → Mock Data (fallback)

The app NEVER shows a broken state to users.

### 4. Honest Scoring
The AI prompt includes calibration instructions so scores are realistic (40-70 range for most content), building user trust.

---

## 📈 Iteration Quality

### Prompt Refinement Examples:

**Version 1 (Generic):** "Analyze this content"
**Version 2 (Specific):** "Analyze this video content for TikTok viral potential. Rate honestly — most content scores between 40-70."
**Version 3 (Structured):** Added exact JSON schema with 8 breakdown metrics, hook analysis, caption optimization, trending data, and competitor comparison.

Each iteration produced more actionable, structured, and useful results.

---

## 🛠️ Technical Architecture Summary
User Upload → Next.js API Route → Gemini 2.5 Flash (Vision)
↓
JSON Analysis
↓
React Components Render
↓
Score + Breakdown + Suggestions + Trends

**Error Flow:**
Gemini API → 503? → Retry (2s delay) → Still failing? → Mock Data → Always show results


---

## 💡 What I Learned From AI-Assisted Development

1. **Ask for explanations, not just code** — Understanding "why" made debugging faster
2. **Type-first saves time** — Defining interfaces upfront prevented cascading errors
3. **Build incrementally** — Test each piece before adding the next
4. **Always have fallbacks** — APIs fail; the user experience shouldn't
5. **Read error messages carefully** — AI helped me understand what each error actually meant
6. **Version compatibility matters** — Tailwind v4 and newer Gemini models required adaptation
7. **Dark UI with glassmorphism** — Modern design patterns that make apps feel premium

---

## 📁 Final File Structure
go-viral-clone/
├── src/
│ ├── app/
│ │ ├── api/analyze/route.ts ← Server endpoint
│ │ ├── history/page.tsx ← History page
│ │ ├── globals.css ← Global styles
│ │ ├── layout.tsx ← Root layout
│ │ └── page.tsx ← Main page
│ ├── components/
│ │ ├── analysis/
│ │ │ ├── ViralityScore.tsx ← Animated score circle
│ │ │ ├── ScoreBreakdown.tsx ← 8-metric bars
│ │ │ ├── HookAnalysis.tsx ← First 3 seconds
│ │ │ ├── CaptionOptimizer.tsx ← Before/after caption
│ │ │ ├── Recommendations.tsx ← Action items
│ │ │ ├── TrendingRecommendations.tsx
│ │ │ ├── CompetitorComparison.tsx
│ │ │ └── ExportReport.tsx ← Download & share
│ │ ├── layout/
│ │ │ ├── Header.tsx
│ │ │ └── Footer.tsx
│ │ ├── ui/
│ │ │ ├── AnimatedBackground.tsx
│ │ │ └── LoadingAnalysis.tsx
│ │ └── upload/
│ │ └── UploadZone.tsx
│ ├── hooks/
│ │ ├── useAnalysis.ts ← Analysis state management
│ │ └── useHistory.ts ← LocalStorage persistence
│ ├── lib/
│ │ ├── gemini.ts ← Gemini AI integration
│ │ ├── mock.ts ← Fallback mock data
│ │ └── openai.ts ← OpenAI integration (backup)
│ └── types/
│ └── index.ts ← All TypeScript interfaces
├── .env.local ← API keys (not committed)
├── AI_LOGS.md ← This file
├── REFLECTION.md ← Project reflection
└── package.json


---

## 🏆 Final Stats

- **Components Built:** 15
- **TypeScript Interfaces:** 16
- **API Integrations:** 2 (Gemini + OpenAI backup)
- **Bugs Fixed:** 7
- **Lines of Code:** ~2,500+
- **Deployment:** Vercel (auto-deploy from GitHub)
- **Live URL:** https://go-viral-clone.vercel.app/