export interface AnalysisSubscore {
  category: 'structure' | 'impact' | 'skills' | 'formatting' | 'contact';
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  summary: string;
}

export interface DetectedIssue {
  id: string;
  category: 'structure' | 'impact' | 'skills' | 'formatting' | 'contact';
  severity: 'high' | 'medium' | 'low';
  title: string;
  explanation: string;
  recommendation: string;
  evidence?: string;
}

export interface BulletRewrite {
  original: string;
  suggested: string;
  category: string;
  improvementReason: string;
}

export interface KeywordMatchResult {
  jobDescriptionProvided: boolean;
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: {
    critical: string[];
    recommended: string[];
  };
  topResumeKeywords: string[];
}

export interface ResumeAnalysisResult {
  id: string;
  timestamp: string;
  fileName: string;
  fileSizeBytes: number;
  isDemo: boolean;
  wordCount: number;
  readingTimeMinutes: number;
  overallScore: number; // 0 - 100
  ratingTier: 'Exceptional' | 'Strong' | 'Competitive' | 'Needs Improvement';
  summary: string;
  subscores: AnalysisSubscore[];
  issues: DetectedIssue[];
  keywordMatch: KeywordMatchResult;
  bulletRewrites: BulletRewrite[];
  detectedSections: string[];
  missingSections: string[];
  recommendedTemplates: {
    id: string;
    name: string;
    description: string;
    bestFor: string;
  }[];
  extractedMetadata: {
    detectedEmail?: string;
    detectedPhone?: string;
    detectedLinkedIn?: string;
    detectedGitHub?: string;
    detectedLocation?: string;
    pageCountEstimate: number;
  };
}

export interface AdminAnalytics {
  totalScans: number;
  todayScans: number;
  averageScore: number;
  pdfScans: number;
  docxScans: number;
  scansWithJobDesc: number;
  recentScans: {
    id: string;
    timestamp: string;
    fileName: string;
    fileType: string;
    score: number;
    wordCount: number;
    hasJobDesc: boolean;
    processingTimeMs: number;
  }[];
  systemSettings: {
    maxUploadSizeBytes: number;
    rateLimitPerHour: number;
    allowDocx: boolean;
    allowPdf: boolean;
    enableAdSenseSlots: boolean;
    geminiEnhancedParsing: boolean;
  };
}
