import React from 'react';
import { FileText, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Bookmark } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface AtsGuidePageProps {
  navigate: (path: string) => void;
}

export const AtsGuidePage: React.FC<AtsGuidePageProps> = ({ navigate }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#606060]">
          <span>Career Engineering Guide</span>
          <span>•</span>
          <span>10 Min Read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          The Definitive ATS Resume Guide: Formatting, Parsers &amp; Strategy
        </h1>
        <p className="text-base text-[#606060] leading-relaxed">
          How to construct a modern resume that easily passes applicant tracking system parsers and compels human hiring managers to invite you for an interview.
        </p>
      </div>

      {/* Intro Key takeaways */}
      <div className="p-6 rounded-lg border border-[#e5e5e5] bg-[#fafafa] space-y-3">
        <h2 className="text-sm font-bold text-[#111111] flex items-center space-x-2">
          <Bookmark className="w-4 h-4 text-[#111111]" />
          <span>Core ATS Principles at a Glance</span>
        </h2>
        <ul className="space-y-2 text-xs text-[#606060]">
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
            <span><strong>Single-column layout:</strong> Multi-column tables often cause text streams to interleave, making job titles and dates unreadable.</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
            <span><strong>Standard section headings:</strong> Use universally parsed names: "Work Experience", "Education", "Technical Skills".</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
            <span><strong>Quantified achievements:</strong> Replace passive duty lists with Google's XYZ formula: Accomplished [X] measured by [Y] by doing [Z].</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
            <span><strong>Clean typography:</strong> Stick to standard web-safe fonts (Arial, Calibri, Helvetica, Garamond) between 10pt and 12pt body text.</span>
          </li>
        </ul>
      </div>

      {/* Main Guide Content */}
      <div className="space-y-8 text-xs leading-relaxed text-[#404040]">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111]">
            1. Resume Headers &amp; Contact Information
          </h2>
          <p>
            Your header must sit at the top of the body text. <strong>Never place contact details inside Microsoft Word's header or footer zones</strong>. Many enterprise ATS parsers (specifically older versions of Taleo and Workday) are configured to ignore document header and footer margins to skip repetitive page numbers. If your phone and email reside there, the parser may register a blank candidate profile.
          </p>
          <div className="p-4 bg-white border border-[#e5e5e5] rounded-md font-mono text-[11px] text-[#111111]">
            Alex Morgan<br />
            San Francisco, CA • (555) 019-2834 • alex.morgan@email.com • linkedin.com/in/alexmorgan • github.com/alexmorgan
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111]">
            2. The Do's and Don'ts of ATS Formatting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md border border-[#bbf7d0] bg-[#f0fdf4] space-y-2">
              <h3 className="text-xs font-bold text-[#166534] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>What to Do</span>
              </h3>
              <ul className="space-y-1.5 text-[11px] text-[#166534]">
                <li>• Use standard bullet characters (• or -)</li>
                <li>• Save as text-based PDF or .docx</li>
                <li>• Use standard date formats (Month Year or MM/YYYY)</li>
                <li>• Keep file size under 5MB</li>
                <li>• Spell out acronyms alongside abbreviations (e.g. "Amazon Web Services (AWS)")</li>
              </ul>
            </div>

            <div className="p-4 rounded-md border border-[#fecaca] bg-[#fef2f2] space-y-2">
              <h3 className="text-xs font-bold text-[#991b1b] flex items-center space-x-1.5">
                <XCircle className="w-4 h-4" />
                <span>What to Avoid</span>
              </h3>
              <ul className="space-y-1.5 text-[11px] text-[#991b1b]">
                <li>• Two-column magazine layouts or text boxes</li>
                <li>• Skill rating bars (e.g., 85% or 4/5 circles)</li>
                <li>• Headshots or personal profile pictures (US/UK)</li>
                <li>• White font keyword stuffing (ATS flags this as fraud)</li>
                <li>• Canva flat image exports (unselectable text)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mid-content Ad */}
        <AdPlaceholder slotId="guide-incontent-1" format="leaderboard" />

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111]">
            3. Writing Bullet Points That Pass ATS &amp; Impress Recruiters
          </h2>
          <p>
            An ATS extracts text, but a human recruiter decides whether to advance you to a phone screen. Weak bullet points that start with "Responsible for" or "Handled daily support" convey passivity and zero verifiable business impact.
          </p>
          <p>
            Always use active verbs paired with measurable metrics:
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-[#fdfdfd] border-l-2 border-[#b91c1c] border-y border-r border-[#e5e5e5] rounded-r-md">
              <p className="text-[#991b1b] font-medium">❌ Weak Duty Bullet:</p>
              <p className="text-[#606060] italic">"Responsible for managing backend APIs and writing unit tests."</p>
            </div>
            <div className="p-3 bg-[#fdfdfd] border-l-2 border-[#15803d] border-y border-r border-[#e5e5e5] rounded-r-md">
              <p className="text-[#166534] font-medium">✅ High-Impact ATS Bullet:</p>
              <p className="text-[#111111] font-medium">"Architected and deployed 14 Node.js REST APIs serving 1.5M daily active users, improving response latency by 35% and increasing unit test coverage from 62% to 92%."</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#111111]">
            4. Ideal Word Count and Length
          </h2>
          <p>
            For early-career candidates (0–5 years experience), a <strong>tight, one-page resume between 450 and 700 words</strong> is optimal. Candidates with 7+ years of relevant experience or deep technical publications may extend to two pages (800–1,100 words).
          </p>
          <p>
            Resumes shorter than 300 words typically lack sufficient keyword density, while resumes exceeding 1,300 words risk keyword dilution and recruiter fatigue.
          </p>
        </section>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-lg bg-[#fafafa] border border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#111111]">Check Your Resume Formatting Now</h3>
          <p className="text-xs text-[#606060] mt-1">
            Free instant scan. We analyze your section titles, metric density, and bullet syntax.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-[#111111] text-white hover:bg-[#282828] text-xs font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center space-x-1.5 flex-shrink-0"
        >
          <span>Run Resume Scanner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
