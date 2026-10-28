import React from 'react';
import { UploadZone } from '../components/UploadZone';
import { ResultsView } from '../components/ResultsView';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ResumeAnalysisResult } from '../utils/types';
import { 
  ShieldCheck, 
  Cpu, 
  Target, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Lock 
} from 'lucide-react';

interface HomePageProps {
  result: ResumeAnalysisResult | null;
  isAnalyzing: boolean;
  uploadProgress: number;
  errorMessage: string | null;
  onAnalyze: (file: File, jobDescription: string) => Promise<void>;
  onLoadDemo: () => void;
  onReset: () => void;
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  result,
  isAnalyzing,
  uploadProgress,
  errorMessage,
  onAnalyze,
  onLoadDemo,
  onReset,
  navigate
}) => {
  return (
    <div className="space-y-16 py-8">
      {/* If there's an active result, display the report */}
      {result ? (
        <section className="px-4 sm:px-6 lg:px-8">
          <ResultsView
            result={result}
            onReset={onReset}
            onNavigateToTemplates={() => navigate('/resume-templates')}
          />
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-4 pt-4">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#111111] bg-[#f4f4f4] px-3 py-1 rounded-full border border-[#e5e5e5]">
              <Lock className="w-3.5 h-3.5" />
              <span>Free, Instant &amp; Privacy-First ATS Analysis</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Test Your Resume Against Real ATS Heuristics
            </h1>

            <p className="text-base sm:text-lg text-[#606060] max-w-2xl mx-auto leading-relaxed">
              Get an explainable 0–100 score, discover missing job keywords, fix formatting traps, and rewrite weak bullet points with quantifiable metric formulas.
            </p>

            {/* Upload Zone Card */}
            <div className="pt-6">
              <UploadZone
                onAnalyze={onAnalyze}
                onLoadDemo={onLoadDemo}
                isAnalyzing={isAnalyzing}
                uploadProgress={uploadProgress}
                errorMessage={errorMessage}
              />
            </div>
          </section>

          {/* AdSense Placement (Compliant Placeholder) */}
          <div className="max-w-4xl mx-auto px-4">
            <AdPlaceholder slotId="home-leaderboard" format="leaderboard" />
          </div>

          {/* Key Value Propositions Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-[#111111]">
                Engineered for Clarity and Actionable Improvement
              </h2>
              <p className="text-xs text-[#606060] mt-1.5">
                No black-box guesses. We evaluate your resume across the 5 pillars modern applicant tracking software indexes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border border-[#e5e5e5] bg-white hover:border-[#111111] transition-all space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#f4f4f4] flex items-center justify-center text-[#111111]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#111111]">
                  Section &amp; Parse Safety
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed">
                  Verifies that Workday, Greenhouse, and Lever can extract your work history, education, and contact data without misaligning columns or missing sections.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-[#e5e5e5] bg-white hover:border-[#111111] transition-all space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#f4f4f4] flex items-center justify-center text-[#111111]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#111111]">
                  Job Description Alignment
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed">
                  Paste the job posting to see exact matched technical skills, missing critical requirements, and frequency metrics recruiters prioritize.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-[#e5e5e5] bg-white hover:border-[#111111] transition-all space-y-3">
                <div className="w-10 h-10 rounded-md bg-[#f4f4f4] flex items-center justify-center text-[#111111]">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#111111]">
                  Metric &amp; Bullet Rewrites
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed">
                  Transforms passive "Responsible for X" bullet points into high-impact accomplishments using the Google XYZ accomplishment framework.
                </p>
              </div>
            </div>
          </section>

          {/* 3 Step Process */}
          <section className="bg-[#fafafa] border-y border-[#e5e5e5] py-14">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl font-bold text-[#111111] text-center mb-8">
                How ResumeCheck Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#909090]">Step 01</div>
                  <h3 className="text-sm font-bold text-[#111111]">Upload PDF or DOCX</h3>
                  <p className="text-xs text-[#606060] leading-relaxed">
                    Upload your document. Our server extracts the raw text stream in volatile memory, mirroring how enterprise ATS parsers process candidate files.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#909090]">Step 02</div>
                  <h3 className="text-sm font-bold text-[#111111]">Algorithmic Scoring</h3>
                  <p className="text-xs text-[#606060] leading-relaxed">
                    We evaluate action verbs, metric density, section semantics, character encoding, and keyword frequency using transparent heuristics.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#909090]">Step 03</div>
                  <h3 className="text-sm font-bold text-[#111111]">Prioritized Fixes</h3>
                  <p className="text-xs text-[#606060] leading-relaxed">
                    Review specific evidence-based recommendations, copy rewritten bullet examples, and adopt ATS-safe templates before applying.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#111111] hover:underline"
                >
                  <span>Read our complete technical parsing methodology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-[#111111] text-center mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-md border border-[#e5e5e5] bg-white space-y-1.5">
                <h3 className="text-xs font-bold text-[#111111]">
                  What is an Applicant Tracking System (ATS)?
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed">
                  An ATS (like Workday, Taleo, Greenhouse, or Lever) is software used by employers to collect, parse, organize, and search job applications. It converts resumes into plain text fields, allowing recruiters to filter candidates by skills, past job titles, and keyword relevance.
                </p>
              </div>

              <div className="p-4 rounded-md border border-[#e5e5e5] bg-white space-y-1.5">
                <h3 className="text-xs font-bold text-[#111111]">
                  Is a PDF or DOCX better for ATS scanning?
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed">
                  Modern ATS systems parse standard text-based PDFs reliably. However, DOCX has the lowest risk of text layer fragmentation. Avoid PDFs created by exporting from Canva or Photoshop where text is converted into flat images or complex SVG paths.
                </p>
              </div>

              <div className="p-4 rounded-md border border-[#e5e5e5] bg-white space-y-1.5">
                <h3 className="text-xs font-bold text-[#111111]">
                  Does ResumeCheck store my resume or personal details?
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed">
                  No. We operate under a strict zero-retention privacy policy. Resumes are parsed in temporary memory and completely cleared immediately after analysis. We do not sell data, build recruitment databases, or store your contact information.
                </p>
              </div>

              <div className="p-4 rounded-md border border-[#e5e5e5] bg-white space-y-1.5">
                <h3 className="text-xs font-bold text-[#111111]">
                  Can any tool guarantee an interview or 100% score?
                </h3>
                <p className="text-xs text-[#606060] leading-relaxed">
                  No ethical tool can guarantee an interview. Different employers configure their ATS differently, and human hiring managers ultimately make the final interview decisions. ResumeCheck optimizes your technical formatting and keyword alignment so your qualifications aren't filtered out by automated screening.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
