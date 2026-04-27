export type ContentType = 'video' | 'image' | 'text';
export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'twitter';

export interface UploadedContent {
  id: string;
  type: ContentType;
  url: string;
  caption?: string;
  platform: Platform;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: Date;
}

export interface ScoreBreakdown {
  hookStrength: number;
  captionQuality: number;
  visualAppeal: number;
  trendAlignment: number;
  engagementPotential: number;
  pacing: number;
  emotionalImpact: number;
  shareability: number;
}

export interface HookAnalysis {
  score: number;
  firstThreeSeconds: string;
  attentionGrabbers: string[];
  improvements: string[];
  hookType: string;
  retentionPrediction: number;
}

export interface CaptionAnalysis {
  score: number;
  currentCaption: string;
  optimizedCaption: string;
  hashtagSuggestions: string[];
  ctaStrength: number;
  readability: number;
  improvements: string[];
}

export interface ThumbnailAnalysis {
  score: number;
  composition: string;
  colorImpact: string;
  textOverlay: string;
  facePresence: boolean;
  improvements: string[];
}

export interface PacingSegment {
  timestamp: number;
  energy: number;
  label: string;
}

export interface PacingAnalysis {
  score: number;
  avgSceneDuration: number;
  transitionQuality: string;
  energyProgression: string;
  recommendations: string[];
  timeline: PacingSegment[];
}

export interface Recommendation {
  category: string;
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  expectedImpact: string;
}

export interface TrendingItem {
  name: string;
  growth: number;
  relevance: number;
}

export interface TrendingData {
  hashtags: TrendingItem[];
  audio: TrendingItem[];
  formats: TrendingItem[];
}

export interface CompetitorContent {
  title: string;
  score: number;
  views: string;
  keyStrength: string;
}

export interface CompetitorComparison {
  averageScore: number;
  topPerformers: CompetitorContent[];
  gaps: string[];
  advantages: string[];
}

export interface ViralityAnalysis {
  id: string;
  contentId: string;
  overallScore: number;
  breakdown: ScoreBreakdown;
  hookAnalysis: HookAnalysis;
  captionAnalysis: CaptionAnalysis;
  thumbnailAnalysis: ThumbnailAnalysis;
  pacingAnalysis: PacingAnalysis;
  recommendations: Recommendation[];
  trendingData: TrendingData;
  competitorComparison: CompetitorComparison;
  createdAt: Date;
}

export interface AnalysisState {
  status: 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';
  progress: number;
  currentStep: string;
  result?: ViralityAnalysis;
  error?: string;
}