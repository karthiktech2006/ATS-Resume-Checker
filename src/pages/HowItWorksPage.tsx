import React from 'react';
import { Layers, FileSearch, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface HowItWorksPageProps {
  navigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#606060] bg-[#f4f4f4] px-2.5 py-1 rounded">
          Behind the Screen
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          How Applicant Tracking Systems Parse Resumes
        </h1>
        <p className="text-base text-[#606060] leading-relaxed">
          Demystifying the algorithmic screening process used by Fortune 500 companies, startups, and university hiring portals.
        </p>
      </div>

      {/* Overview Card */}
      <div className="p-6 rounded-lg border border-[#e5e5e5] bg-[#fafafa] space-y-3">
        <h2 className="text-sm font-bold text-[#111111] flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#111111]" />
          <span>The Truth About ATS "Black Box" Algorithms</span>
        </h2>
        <p className="text-xs text-[#606060] leading-relaxed">
          Contrary to common myths, ATS software does not automatically toss 75% of resumes into a digital trash bin based on arbitrary AI whims. Rather, an ATS acts like a specialized search engine and database. It extracts your resume text into structured fields: candidate name, contact data, chronological jobs, degrees, and skills. When recruiters filter for "React" or "5+ years backend", resumes that fail to parse or lack those terms simply drop off the top search results.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-[#111111]">
          The 4 Stages of ATS Resume Processing
        </h2>

        {/* Stage 1 */}
        <div className="border border-[#e5e5e5] rounded-lg p-6 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">
              1. Document Ingestion &amp; Text Extraction
            </h3>
            <span className="text-[11px] font-semibold text-[#606060] bg-[#f4f4f4] px-2 py-0.5 rounded">
              Stage 1
            </span>
          </div>
          <p className="text-xs text-[#606060] leading-relaxed">
            The ATS opens the raw PDF or DOCX file and reads its text layer. If the file is a graphic scan (common with Canva or Photoshop exports), or contains nested tables, side-by-side text boxes, or header/footer overlays, the parser may read text out of order or fail to extract it entirely.
          </p>
          <div className="p-3 bg-[#f7f7f7] rounded border border-[#e5e5e5] text-xs text-[#111111]">
            <strong>ATS Rule #1:</strong> Use standard, single-column documents. Never put crucial contact information inside Word header/footer zones or background images.
          </div>
        </div>

        {/* Stage 2 */}
        <div className="border border-[#e5e5e5] rounded-lg p-6 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">
              2. Semantic Section Segmentation
            </h3>
            <span className="text-[11px] font-semibold text-[#606060] bg-[#f4f4f4] px-2 py-0.5 rounded">
              Stage 2
            </span>
          </div>
          <p className="text-xs text-[#606060] leading-relaxed">
            The system scans for recognized structural headings: "Work Experience", "Education", "Skills", "Certifications". It segments all content following that heading into the corresponding database record. If you use non-standard titles like "My Journey" or "Accredited Knowledge", the parser may dump the entire block into an unclassified notes field.
          </p>
        </div>

        {/* Stage 3 */}
        <div className="border border-[#e5e5e5] rounded-lg p-6 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">
              3. Entity &amp; Skill Extraction (Taxonomy Matching)
            </h3>
            <span className="text-[11px] font-semibold text-[#606060] bg-[#f4f4f4] px-2 py-0.5 rounded">
              Stage 3
            </span>
          </div>
          <p className="text-xs text-[#606060] leading-relaxed">
            Parsers compare extracted words against comprehensive industry skill ontologies. For instance, "PostgreSQL", "React", "Docker", "Budget Forecasting". Modern systems also look for context: did you use Python in a 3-year Senior Engineer role, or is it merely listed once under hobby projects?
          </p>
        </div>

        {/* Stage 4 */}
        <div className="border border-[#e5e5e5] rounded-lg p-6 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">
              4. Recruiter Query Ranking &amp; Filtering
            </h3>
            <span className="text-[11px] font-semibold text-[#606060] bg-[#f4f4f4] px-2 py-0.5 rounded">
              Stage 4
            </span>
          </div>
          <p className="text-xs text-[#606060] leading-relaxed">
            A corporate recruiter reviewing 250 applicants for a single role doesn't read every resume linearly. They filter the applicant pool by required skills, minimum education, and proximity. Candidates whose resumes clearly present matching keywords with measurable achievements rank at the top of the recruiter's queue.
          </p>
        </div>
      </div>

      {/* Ad slot */}
      <AdPlaceholder slotId="how-it-works-incontent" format="leaderboard" />

      {/* Rubric Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#111111]">
          ResumeCheck 100-Point Scoring Rubric
        </h2>
        <p className="text-xs text-[#606060]">
          We evaluate your resume across five documented criteria designed to mirror modern ATS ingestion:
        </p>

        <div className="border border-[#e5e5e5] rounded-lg overflow-hidden bg-white text-xs">
          <div className="grid grid-cols-12 bg-[#f4f4f4] p-3 font-semibold text-[#111111] border-b border-[#e5e5e5]">
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Max Points</div>
            <div className="col-span-7">Evaluation Focus</div>
          </div>
          <div className="divide-y divide-[#e5e5e5]">
            <div className="grid grid-cols-12 p-3">
              <div className="col-span-3 font-medium text-[#111111]">Section Structure</div>
              <div className="col-span-2 font-bold text-[#111111]">20 pts</div>
              <div className="col-span-7 text-[#606060]">Recognizable standard headings (Experience, Education, Skills, Summary).</div>
            </div>
            <div className="grid grid-cols-12 p-3">
              <div className="col-span-3 font-medium text-[#111111]">Impact &amp; Metrics</div>
              <div className="col-span-2 font-bold text-[#111111]">25 pts</div>
              <div className="col-span-7 text-[#606060]">Action verbs, percentage improvements, dollar amounts, team scale, and absence of passive duty phrases.</div>
            </div>
            <div className="grid grid-cols-12 p-3">
              <div className="col-span-3 font-medium text-[#111111]">Skills &amp; Keywords</div>
              <div className="col-span-2 font-bold text-[#111111]">25 pts</div>
              <div className="col-span-7 text-[#606060]">Hard domain proficiencies, technical vocabulary, and job description alignment when provided.</div>
            </div>
            <div className="grid grid-cols-12 p-3">
              <div className="col-span-3 font-medium text-[#111111]">Formatting &amp; Readability</div>
              <div className="col-span-2 font-bold text-[#111111]">20 pts</div>
              <div className="col-span-7 text-[#606060]">Word count bounds (450-1,000 words), bullet length, clean Unicode encoding without corrupt glyphs.</div>
            </div>
            <div className="grid grid-cols-12 p-3">
              <div className="col-span-3 font-medium text-[#111111]">Contact &amp; Essentials</div>
              <div className="col-span-2 font-bold text-[#111111]">10 pts</div>
              <div className="col-span-7 text-[#606060]">Valid email address, parsed telephone number, city/location, and verified professional links.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-lg bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Ready to test your resume?</h3>
          <p className="text-xs text-[#a0a0a0] mt-1">
            Free instant scan. No account or credit card required.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-white text-[#111111] hover:bg-[#f0f0f0] text-xs font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center space-x-1.5"
        >
          <span>Scan Your Resume Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
