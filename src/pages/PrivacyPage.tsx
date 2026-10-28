import React from 'react';
import { ShieldCheck, Lock, Trash2, EyeOff, Server } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#606060] bg-[#f4f4f4] px-2.5 py-1 rounded">
          Privacy Policy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Zero-Retention Privacy Commitment
        </h1>
        <p className="text-sm text-[#606060] leading-relaxed">
          Last updated: October 2026. ResumeCheck was engineered from day one to protect job seekers' most sensitive career and personal information.
        </p>
      </div>

      {/* Key Guarantees Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-lg border border-[#e5e5e5] bg-[#fafafa] space-y-2">
          <Lock className="w-5 h-5 text-[#111111]" />
          <h3 className="text-xs font-bold text-[#111111]">In-Memory Processing Only</h3>
          <p className="text-xs text-[#606060] leading-relaxed">
            Uploaded resumes are loaded into server memory for extraction and instantly released. Resumes are never stored on hard drives or permanent file buckets.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-[#e5e5e5] bg-[#fafafa] space-y-2">
          <EyeOff className="w-5 h-5 text-[#111111]" />
          <h3 className="text-xs font-bold text-[#111111]">No Data Monetization</h3>
          <p className="text-xs text-[#606060] leading-relaxed">
            We never sell, rent, or distribute your email, phone number, work history, or contact details to third-party recruiters or advertisers.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-[#e5e5e5] bg-[#fafafa] space-y-2">
          <Trash2 className="w-5 h-5 text-[#111111]" />
          <h3 className="text-xs font-bold text-[#111111]">Instant Destruction</h3>
          <p className="text-xs text-[#606060] leading-relaxed">
            Once analysis completes and the JSON response is delivered to your browser session, the server-side text stream is wiped clean.
          </p>
        </div>
      </div>

      {/* Detailed sections */}
      <div className="space-y-6 text-xs text-[#404040] leading-relaxed border-t border-[#e5e5e5] pt-8">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111111]">1. Information We Process</h2>
          <p>
            When you use ResumeCheck, you upload a PDF or DOCX file and optionally paste a job description. This text is processed ephemerally solely to calculate readability metrics, identify missing keywords, evaluate bullet points, and return your results report.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111111]">2. Aggregate Anonymized Telemetry</h2>
          <p>
            To prevent server abuse and manage system load, we maintain aggregate counters (e.g., total scans completed today, rolling average score, error frequencies). These aggregate records contain zero candidate names, email addresses, or document text.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111111]">3. Optional AI Augmentation</h2>
          <p>
            When enhanced analysis is enabled, anonymized excerpts of your resume text may be analyzed via the server-side Gemini API strictly to generate tailored bullet point rephrasing suggestions. No personal data is used to train public machine learning models.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111111]">4. Your Rights</h2>
          <p>
            Because we do not persist user accounts, resume files, or contact databases, there is no candidate record stored to delete or export. Once you close your browser tab, your analysis session ends.
          </p>
        </section>
      </div>
    </div>
  );
};
