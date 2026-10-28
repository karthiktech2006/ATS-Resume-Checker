import React from 'react';
import { AlertCircle, Scale, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#606060] bg-[#f4f4f4] px-2.5 py-1 rounded">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Terms of Service &amp; Scoring Disclaimer
        </h1>
        <p className="text-sm text-[#606060] leading-relaxed">
          Please review these terms carefully before utilizing the ResumeCheck website and automated scoring engine.
        </p>
      </div>

      {/* Prominent Disclaimer Notice */}
      <div className="p-6 rounded-lg border border-[#e5e5e5] bg-[#fffbf0] text-xs text-[#713f12] space-y-3">
        <h2 className="text-sm font-bold text-[#111111] flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-[#d97706]" />
          <span>Crucial Algorithmic &amp; Interview Disclaimers</span>
        </h2>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>No Guarantee of Interviews:</strong> ResumeCheck provides educational formatting analysis and keyword alignment feedback. We do not and cannot guarantee employment, job interviews, or job offers.</li>
          <li><strong>No Affiliation with Proprietary ATS Vendors:</strong> ResumeCheck is an independent tool. Workday, Greenhouse, Taleo, and Lever are registered trademarks of their respective owners. We do not claim to duplicate or predict their proprietary internal algorithms.</li>
          <li><strong>User Responsibility for Truthfulness:</strong> You are solely responsible for ensuring that all accomplishments, skills, and qualifications listed on your resume are accurate and truthful. Never misrepresent qualifications.</li>
        </ul>
      </div>

      {/* Terms Body */}
      <div className="space-y-6 text-xs text-[#404040] leading-relaxed border-t border-[#e5e5e5] pt-8">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111111]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ResumeCheck, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, do not use the application.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111111]">2. Acceptable Use Policy</h2>
          <p>
            You agree to use this service only for lawful personal career optimization purposes. You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Attempt to upload malicious files, malware, or corrupted binary files.</li>
            <li>Launch automated Denial of Service (DoS) attacks or scrape the API endpoints beyond standard rate limits.</li>
            <li>Reverse engineer or compromise administrative infrastructure.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#111111]">3. Limitation of Liability</h2>
          <p>
            In no event shall ResumeCheck, its developers, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this service, or from employment decisions made by prospective employers.
          </p>
        </section>
      </div>
    </div>
  );
};
