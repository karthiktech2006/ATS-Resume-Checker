import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowLeft,
  Download,
  Printer,
  FileText,
  Sparkles,
  Layers,
  TrendingUp,
  Hash,
  Type,
  Mail,
  Info,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { ResumeAnalysisResult, DetectedIssue, BulletRewrite } from '../utils/types';

interface ResultsViewProps {
  result: ResumeAnalysisResult;
  onReset: () => void;
  onNavigateToTemplates: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onReset,
  onNavigateToTemplates
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredIssues = result.issues.filter(issue => {
    if (filterSeverity === 'all') return true;
    return issue.severity === filterSeverity;
  });

  const handleCopyRewrite = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 85) return 'text-[#0f766e] bg-[#f0fdfa] border-[#ccfbf1]';
    if (score >= 70) return 'text-[#15803d] bg-[#f0fdf4] border-[#dcfce7]';
    if (score >= 55) return 'text-[#b45309] bg-[#fffbeb] border-[#fef3c7]';
    return 'text-[#b91c1c] bg-[#fef2f2] border-[#fee2e2]';
  };

  const getSeverityBadge = (severity: DetectedIssue['severity']) => {
    switch (severity) {
      case 'high':
        return <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#fee2e2] text-[#991b1b] px-2 py-0.5 rounded">High Priority</span>;
      case 'medium':
        return <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded">Medium Priority</span>;
      case 'low':
        return <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#f4f4f4] text-[#555555] px-2 py-0.5 rounded">Suggestion</span>;
    }
  };

  const getSubscoreIcon = (category: string) => {
    switch (category) {
      case 'structure': return <Layers className="w-4 h-4 text-[#111111]" />;
      case 'impact': return <TrendingUp className="w-4 h-4 text-[#111111]" />;
      case 'skills': return <Hash className="w-4 h-4 text-[#111111]" />;
      case 'formatting': return <Type className="w-4 h-4 text-[#111111]" />;
      case 'contact': return <Mail className="w-4 h-4 text-[#111111]" />;
      default: return <FileText className="w-4 h-4 text-[#111111]" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 print-page">
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e5e5] no-print">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#606060] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Scan another resume</span>
        </button>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {result.isDemo && (
            <span className="text-xs font-semibold bg-[#111111] text-white px-2.5 py-1 rounded">
              Demo Sample Report
            </span>
          )}
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 text-xs font-medium border border-[#d0d0d0] hover:border-[#111111] px-3 py-1.5 rounded-md text-[#111111] bg-white hover:bg-[#fafafa] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Scorecard Overview */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Big Score Gauge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-[#fbfbfb] rounded-lg border border-[#e5e5e5]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#606060] mb-2">
              Overall ATS Score
            </span>
            <div className="text-6xl font-extrabold text-[#111111] tracking-tight">
              {result.overallScore}
              <span className="text-xl font-normal text-[#909090]">/100</span>
            </div>
            <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getScoreColorClass(result.overallScore)}`}>
              {result.ratingTier}
            </div>
            <p className="text-[11px] text-[#909090] mt-3">
              Standard 100-Point Heuristic Rubric
            </p>
          </div>

          {/* Report Details & Metadata */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#606060]">
                <span>Document: <strong className="text-[#111111]">{result.fileName}</strong></span>
                <span>â€¢</span>
                <span>Word Count: <strong className="text-[#111111]">{result.wordCount}</strong></span>
                <span>â€¢</span>
                <span>Read Time: <strong className="text-[#111111]">~{result.readingTimeMinutes} min</strong></span>
              </div>
              <h2 className="text-xl font-bold text-[#111111] mt-1">
                ATS Compatibility Assessment
              </h2>
            </div>

            <p className="text-sm text-[#404040] leading-relaxed">
              {result.summary}
            </p>

            {/* General Quality vs Job Match clarification */}
            <div className="p-3.5 bg-[#f7f7f7] rounded-md border border-[#e5e5e5] text-xs text-[#606060] flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-[#111111]">
                  {result.keywordMatch.jobDescriptionProvided
                    ? `Job-Specific Target Active: ${result.keywordMatch.matchPercentage}% keyword match`
                    : 'General ATS Baseline Audit'}
                </span>
                <p className="text-[11px] leading-relaxed">
                  {result.keywordMatch.jobDescriptionProvided
                    ? 'Scored against both universal formatting rules and specific keyword density requirements from your targeted job posting.'
                    : 'Scored against universal applicant tracking criteria (section taxonomy, action verbs, quantified metrics, contact indexing, and parse safety).'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Sub-Scores Breakdown Grid */}
        <div className="mt-8 pt-8 border-t border-[#e5e5e5]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111111] mb-4">
            Sub-score Criteria Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {result.subscores.map((sub) => (
              <div
                key={sub.category}
                className="p-4 rounded-md border border-[#e5e5e5] bg-[#fafafa] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 bg-white rounded border border-[#e5e5e5]">
                      {getSubscoreIcon(sub.category)}
                    </div>
                    <span className="text-xs font-bold text-[#111111]">
                      {sub.score}/{sub.maxScore}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#111111]">{sub.name}</h4>
                  <p className="text-[11px] text-[#606060] mt-1 line-clamp-2 leading-relaxed">
                    {sub.summary}
                  </p>
                </div>

                <div className="w-full bg-[#e5e5e5] h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-[#111111] h-full"
                    style={{ width: `${(sub.score / sub.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyword Matching Section */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#111111]">
              {result.keywordMatch.jobDescriptionProvided
                ? 'Job Description Keyword Alignment'
                : 'Detected Technical & Domain Skills'}
            </h3>
            <p className="text-xs text-[#606060] mt-0.5">
              {result.keywordMatch.jobDescriptionProvided
                ? 'Applicant tracking systems filter candidates by comparing detected terms against recruiter job descriptions.'
                : 'Key hard skills and proficiencies parsed from your resume.'}
            </p>
          </div>

          {result.keywordMatch.jobDescriptionProvided && (
            <div className="text-xs font-semibold bg-[#f4f4f4] text-[#111111] px-3 py-1 rounded border border-[#e5e5e5]">
              {result.keywordMatch.matchedKeywords.length} Matched Keywords
            </div>
          )}
        </div>

        {/* Matched Keywords */}
        <div>
          <span className="text-xs font-semibold text-[#111111] block mb-2">
            Identified In Resume ({result.keywordMatch.matchedKeywords.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {result.keywordMatch.matchedKeywords.length > 0 ? (
              result.keywordMatch.matchedKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 text-xs bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] px-2.5 py-1 rounded"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{kw}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-[#909090]">No hard skills detected in text.</span>
            )}
          </div>
        </div>

        {/* Missing Keywords (if JD was provided) */}
        {result.keywordMatch.jobDescriptionProvided && (
          <div className="space-y-4 pt-4 border-t border-[#e5e5e5]">
            {result.keywordMatch.missingKeywords.critical.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-[#991b1b] flex items-center space-x-1 mb-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Missing High-Frequency Job Posting Keywords ({result.keywordMatch.missingKeywords.critical.length})</span>
                </span>
                <p className="text-[11px] text-[#606060] mb-2">
                  These terms appear prominently in the job posting but are absent from your resume text. Add them naturally if you possess relevant experience:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywordMatch.missingKeywords.critical.map((kw, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] px-2.5 py-1 rounded font-medium"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.keywordMatch.missingKeywords.recommended.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-[#606060] block mb-1.5">
                  Secondary Recommended Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywordMatch.missingKeywords.recommended.map((kw, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#fafafa] text-[#555555] border border-[#e5e5e5] px-2 py-0.5 rounded"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actionable Bullet Point Rewrites */}
      {result.bulletRewrites.length > 0 && (
        <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#111111]" />
            <div>
              <h3 className="text-base font-bold text-[#111111]">
                ATS Bullet-Point Rewrites &amp; Metric Formulas
              </h3>
              <p className="text-xs text-[#606060]">
                Upgrading passive responsibility statements to the Google XYZ framework ("Accomplished [X] measured by [Y] by doing [Z]").
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {result.bulletRewrites.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md border border-[#e5e5e5] bg-[#fafafa] space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] text-[#606060]">
                  <span className="font-semibold uppercase tracking-wider text-[#111111]">
                    {item.category}
                  </span>
                  <span className="text-[#909090]">{item.improvementReason}</span>
                </div>

                {/* Original weak bullet */}
                <div className="text-xs text-[#606060] bg-white p-3 rounded border border-[#e5e5e5]">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#991b1b] block mb-1">
                    Detected Weak Bullet:
                  </span>
                  <p className="italic">"{item.original}"</p>
                </div>

                {/* Optimized rewrite */}
                <div className="text-xs text-[#111111] bg-[#f0fdf4] p-3 rounded border border-[#bbf7d0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#166534]">
                      Recommended High-Impact Revision:
                    </span>
                    <button
                      onClick={() => handleCopyRewrite(item.suggested, idx)}
                      className="inline-flex items-center space-x-1 text-[11px] text-[#166534] hover:text-[#14532d] font-medium"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy bullet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-medium leading-relaxed">
                    â€¢ {item.suggested}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prioritized Actionable Recommendations */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#111111]">
              Prioritized Optimization Checklist ({result.issues.length} Identified)
            </h3>
            <p className="text-xs text-[#606060]">
              Concrete fixes ranked by impact on recruiter readability and ATS compliance.
            </p>
          </div>

          {/* Severity filter buttons */}
          <div className="flex items-center space-x-1 bg-[#f4f4f4] p-1 rounded-md text-xs no-print">
            {(['all', 'high', 'medium', 'low'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  filterSeverity === sev
                    ? 'bg-white text-[#111111] shadow-2xs'
                    : 'text-[#606060] hover:text-[#111111]'
                }`}
              >
                {sev === 'all' ? 'All Issues' : sev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-4 rounded-md border border-[#e5e5e5] bg-[#fafafa] space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-[#111111] flex items-center space-x-2">
                    <span>{issue.title}</span>
                  </h4>
                  {getSeverityBadge(issue.severity)}
                </div>

                <p className="text-xs text-[#606060] leading-relaxed">
                  {issue.explanation}
                </p>

                <div className="text-xs text-[#111111] bg-white p-2.5 rounded border border-[#e5e5e5] font-medium leading-relaxed">
                  <strong className="text-[#111111]">Action:</strong> {issue.recommendation}
                </div>

                {issue.evidence && (
                  <p className="text-[11px] text-[#909090] italic">
                    Evidence: {issue.evidence}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-[#606060]">
              No {filterSeverity !== 'all' ? filterSeverity : ''} priority issues found. Great job!
            </div>
          )}
        </div>
      </div>

      {/* Recommended ATS Resume Templates */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 sm:p-8 space-y-4 no-print">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#111111]">
              Recommended ATS-Safe Templates
            </h3>
            <p className="text-xs text-[#606060]">
              Single-column, tabular-free layouts guaranteed to parse cleanly in 100% of applicant tracking systems.
            </p>
          </div>
          <button
            onClick={onNavigateToTemplates}
            className="text-xs font-semibold text-[#111111] hover:underline flex items-center space-x-1"
          >
            <span>View all templates</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {result.recommendedTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={onNavigateToTemplates}
              className="p-4 rounded-md border border-[#e5e5e5] hover:border-[#111111] bg-[#fafafa] hover:bg-white cursor-pointer transition-all space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#606060] bg-[#f0f0f0] px-2 py-0.5 rounded">
                  {tmpl.bestFor}
                </span>
                <h4 className="text-xs font-bold text-[#111111] mt-2">{tmpl.name}</h4>
                <p className="text-xs text-[#606060] mt-1 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>
              <div className="text-xs font-medium text-[#111111] flex items-center space-x-1 pt-2">
                <span>Use this layout</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
