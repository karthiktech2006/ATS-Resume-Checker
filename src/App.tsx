import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AtsGuidePage } from './pages/AtsGuidePage';
import { AtsKeywordsPage } from './pages/AtsKeywordsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { ResumeAnalysisResult } from './utils/types';
import { getSampleDemoReport } from './utils/scorer';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync route and metadata
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Dynamic page title & SEO meta description
    const pageTitles: Record<string, { title: string; desc: string }> = {
      '/': {
        title: 'ResumeCheck - Free ATS Resume Checker & Optimizer',
        desc: 'Fast, privacy-first ATS resume scanner, scoring engine, keyword matcher, and actionable bullet-point optimizer for job seekers.'
      },
      '/how-it-works': {
        title: 'How ATS Parsers Work & 100-Point Scoring Rubric | ResumeCheck',
        desc: 'Explore the technical inner workings of applicant tracking systems, text extraction, semantic parsing, and our explainable 100-point rubric.'
      },
      '/resume-templates': {
        title: '100% ATS-Friendly Resume Templates (Free Download) | ResumeCheck',
        desc: 'Single-column, zero-table resume templates guaranteed to parse cleanly across Workday, Greenhouse, Lever, and Taleo.'
      },
      '/guides/ats-resume-guide': {
        title: 'The Definitive ATS Resume Formatting Guide | ResumeCheck',
        desc: 'Learn the exact rules for margins, headings, bullet point formulas, and fonts to ensure your resume passes automated filters.'
      },
      '/guides/ats-keywords': {
        title: 'ATS Keywords & Semantic Matching Guide | ResumeCheck',
        desc: 'Master hard vs soft skills in applicant tracking systems, discover high-frequency job keywords, and avoid keyword stuffing penalties.'
      },
      '/privacy': {
        title: 'Zero-Retention Privacy Commitment | ResumeCheck',
        desc: 'We operate with strict ephemeral in-memory parsing. Resumes are never stored on disk, sold, or shared.'
      },
      '/terms': {
        title: 'Terms of Service & Disclaimers | ResumeCheck',
        desc: 'Independent educational software terms, fair use policy, and clear algorithmic scoring disclaimers.'
      },
      '/contact': {
        title: 'Contact & Support | ResumeCheck',
        desc: 'Get in touch with the ResumeCheck team for feedback, questions, or parser improvements.'
      },
      '/admin-panel': {
        title: 'Admin Console | ResumeCheck',
        desc: 'System health, aggregate audit metrics, and runtime settings.'
      }
    };

    const currentMeta = pageTitles[currentPath] || pageTitles['/'];
    document.title = currentMeta.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentMeta.desc);
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = async (file: File, jobDescription: string) => {
    setIsAnalyzing(true);
    setUploadProgress(15);
    setErrorMessage(null);

    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + 15;
      });
    }, 250);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      if (jobDescription.trim()) {
        formData.append('jobDescription', jobDescription.trim());
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      clearInterval(progressTimer);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze resume.');
      }

      setUploadProgress(100);
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
        setUploadProgress(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      clearInterval(progressTimer);
      setIsAnalyzing(false);
      setUploadProgress(0);
      setErrorMessage(err.message || 'An error occurred during resume analysis.');
    }
  };

  const handleLoadDemo = () => {
    setErrorMessage(null);
    setIsAnalyzing(true);
    setUploadProgress(40);

    setTimeout(() => {
      setUploadProgress(100);
      const demo = getSampleDemoReport();
      setResult(demo);
      setIsAnalyzing(false);
      setUploadProgress(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] antialiased">
      <Navbar currentPath={currentPath} navigate={navigate} />

      <main className="flex-grow">
        {currentPath === '/' && (
          <HomePage
            result={result}
            isAnalyzing={isAnalyzing}
            uploadProgress={uploadProgress}
            errorMessage={errorMessage}
            onAnalyze={handleAnalyze}
            onLoadDemo={handleLoadDemo}
            onReset={handleReset}
            navigate={navigate}
          />
        )}
        {currentPath === '/how-it-works' && <HowItWorksPage navigate={navigate} />}
        {currentPath === '/resume-templates' && <TemplatesPage navigate={navigate} />}
        {currentPath === '/guides/ats-resume-guide' && <AtsGuidePage navigate={navigate} />}
        {currentPath === '/guides/ats-keywords' && <AtsKeywordsPage navigate={navigate} />}
        {currentPath === '/privacy' && <PrivacyPage />}
        {currentPath === '/terms' && <TermsPage />}
        {currentPath === '/contact' && <ContactPage />}
        {currentPath === '/admin-panel' && <AdminPanelPage />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}
