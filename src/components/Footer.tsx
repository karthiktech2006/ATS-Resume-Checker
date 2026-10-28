import React from 'react';
import { FileText, Shield, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#fafafa] border-t border-[#e5e5e5] text-[#111111] pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-[#111111] flex items-center justify-center text-white">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-[#111111]">ResumeCheck</span>
            </div>
            <p className="text-xs leading-relaxed text-[#606060]">
              A free, open ATS resume checker designed for job seekers, fresh graduates, and career changers. Built with strict zero-storage privacy standards.
            </p>
            <div className="inline-flex items-center space-x-1.5 text-[11px] text-[#606060] bg-white px-2 py-1 rounded border border-[#e5e5e5]">
              <Lock className="w-3 h-3 text-[#111111]" />
              <span>In-memory parsing only</span>
            </div>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-4">
              ATS Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-[#606060]">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  Free ATS Resume Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  How ATS Parsers Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/resume-templates')}
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  100% ATS-Friendly Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/guides/ats-resume-guide')}
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  Comprehensive ATS Resume Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/guides/ats-keywords')}
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  ATS Keyword Matching & Traps
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-4">
              Privacy & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-[#606060]">
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-[#111111] transition-colors text-left flex items-center space-x-1"
                >
                  <span>Zero-Retention Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  Terms of Service & Disclaimers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#111111] transition-colors text-left"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin-panel')}
                  className="hover:text-[#111111] text-[#909090] transition-colors text-left"
                >
                  Admin System Panel
                </button>
              </li>
            </ul>
          </div>

          {/* ATS Transparency Notice */}
          <div className="bg-white p-4 rounded-md border border-[#e5e5e5] space-y-2">
            <h4 className="text-xs font-semibold text-[#111111] flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-[#111111]" />
              <span>Algorithmic Disclaimer</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-[#606060]">
              ResumeCheck provides objective structural, formatting, and keyword assessments based on standard applicant tracking heuristics (Greenhouse, Workday, Lever, Taleo). We do not claim to predict proprietary vendor scores or guarantee interviews.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#909090] gap-4">
          <p>© {new Date().getFullYear()} ResumeCheck. Open educational software for job seekers.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-[#111111]">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-[#111111]">Terms</button>
            <button onClick={() => navigate('/contact')} className="hover:text-[#111111]">Contact</button>
            <button onClick={() => navigate('/admin-panel')} className="hover:text-[#111111]">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
