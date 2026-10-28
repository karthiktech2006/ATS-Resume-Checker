import React from 'react';
import { Hash, Target, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface AtsKeywordsPageProps {
  navigate: (path: string) => void;
}

export const AtsKeywordsPage: React.FC<AtsKeywordsPageProps> = ({ navigate }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#606060]">
          <span>Keyword Optimization</span>
          <span>•</span>
          <span>8 Min Read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          ATS Keywords &amp; Semantic Matching: Hard vs. Soft Skills
        </h1>
        <p className="text-base text-[#606060] leading-relaxed">
          How modern recruitment algorithms extract, weigh, and correlate keywords from job postings to candidate resumes—and why keyword stuffing backfires.
        </p>
      </div>

      {/* Myth-Busting Box */}
      <div className="p-5 rounded-lg border border-[#e5e5e5] bg-[#fffbf0] text-xs space-y-2">
        <h2 className="font-bold text-sm text-[#111111] flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-[#d97706]" />
          <span>The "White Font" Myth &amp; Keyword Stuffing Penalties</span>
        </h2>
        <p className="leading-relaxed text-[#713f12]">
          A viral internet myth suggests pasting the entire job description in 1pt white font in the footer to achieve a 100% ATS match. <strong>Do not do this.</strong> Modern ATS parsers strip all color formatting into plain monochrome text streams before indexing. The recruiter will immediately see multiple paragraphs of white text exposed as an obvious fraud attempt, resulting in instant disqualification.
        </p>
      </div>

      {/* Hard vs Soft Skills */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#111111]">
          Hard Skills vs. Soft Skills in ATS Ingestion
        </h2>
        <p className="text-xs text-[#606060] leading-relaxed">
          Recruiters use hard search filters when querying candidate databases. While both skill categories matter, they are indexed very differently:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#e5e5e5] rounded-lg p-5 bg-white space-y-3">
            <h3 className="text-sm font-bold text-[#111111] flex items-center space-x-2">
              <Hash className="w-4 h-4 text-[#111111]" />
              <span>Hard Skills (Direct Search Filters)</span>
            </h3>
            <p className="text-xs text-[#606060] leading-relaxed">
              These are specific, verifiable technical competencies, programming languages, software suites, and certifications.
            </p>
            <div className="p-3 bg-[#fafafa] rounded text-xs space-y-1">
              <span className="font-semibold text-[#111111] block">Examples:</span>
              <p className="text-[#606060]">Python, React, PostgreSQL, Docker, AWS Lambda, Google Analytics, Excel Pivot Tables, Financial Modeling.</p>
            </div>
            <p className="text-[11px] text-[#15803d] font-medium">
              ✓ Priority: High. Ensure exact terminology used in the job description is present in your skills and experience.
            </p>
          </div>

          <div className="border border-[#e5e5e5] rounded-lg p-5 bg-white space-y-3">
            <h3 className="text-sm font-bold text-[#111111] flex items-center space-x-2">
              <Target className="w-4 h-4 text-[#111111]" />
              <span>Soft Skills (Contextual Demonstration)</span>
            </h3>
            <p className="text-xs text-[#606060] leading-relaxed">
              Interpersonal attributes and work methodologies. Recruiters rarely search for these in filters because everyone claims them.
            </p>
            <div className="p-3 bg-[#fafafa] rounded text-xs space-y-1">
              <span className="font-semibold text-[#111111] block">Examples:</span>
              <p className="text-[#606060]">Problem solving, leadership, communication, team player, critical thinking, adaptability.</p>
            </div>
            <p className="text-[11px] text-[#606060]">
              💡 Strategy: Never write a bullet saying "Great communication skills". Instead prove it: "Led weekly sprint demos across 3 cross-functional teams."
            </p>
          </div>
        </div>
      </div>

      {/* Ad slot */}
      <AdPlaceholder slotId="keywords-mid-slot" format="leaderboard" />

      {/* Keyword Matching Strategy */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#111111]">
          How to Tailor Your Resume to a Job Description
        </h2>

        <div className="space-y-4 text-xs text-[#404040]">
          <div className="p-4 bg-white border border-[#e5e5e5] rounded-lg space-y-2">
            <h3 className="font-bold text-xs text-[#111111]">1. Identify High-Frequency Requirements</h3>
            <p>
              Read the target job description and note skills mentioned 2 or more times. If a posting mentions "Kubernetes" 4 times across responsibilities and requirements, that term is an essential filter criterion.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#e5e5e5] rounded-lg space-y-2">
            <h3 className="font-bold text-xs text-[#111111]">2. Provide Both Acronym and Spelled-Out Name</h3>
            <p>
              Different recruiters query differently. Some search "GCP" while others query "Google Cloud Platform". Write: <em>"Google Cloud Platform (GCP)"</em> or <em>"Search Engine Optimization (SEO)"</em> to guarantee a 100% match regardless of query syntax.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#e5e5e5] rounded-lg space-y-2">
            <h3 className="font-bold text-xs text-[#111111]">3. Incorporate Keywords in Context</h3>
            <p>
              Don't just list keywords in an unorganized wall of text at the bottom. Repeat key skills naturally in your work experience bullet points: e.g. "Engineered scalable REST APIs using <strong>Node.js</strong> and <strong>PostgreSQL</strong>."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-lg bg-[#fafafa] border border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#111111]">Test Your Job Description Keyword Match</h3>
          <p className="text-xs text-[#606060] mt-1">
            Paste any job posting alongside your resume to reveal missing critical keywords in seconds.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-[#111111] text-white hover:bg-[#282828] text-xs font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center space-x-1.5 flex-shrink-0"
        >
          <span>Check Keyword Match Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
