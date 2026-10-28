import React, { useState } from 'react';
import { Copy, Check, Download, AlertTriangle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface TemplatesPageProps {
  navigate: (path: string) => void;
}

interface TemplateData {
  id: string;
  title: string;
  targetRole: string;
  description: string;
  plainText: string;
}

const TEMPLATES: TemplateData[] = [
  {
    id: 'single-column-tech',
    title: 'Standard Single-Column (Tech & Engineering)',
    targetRole: 'Software Engineers, DevOps, Data Scientists, Product Managers',
    description: 'The universally recognized single-column layout. Guaranteed 100% parsing fidelity across Workday, Greenhouse, Lever, and Taleo.',
    plainText: `FIRST LAST NAME
City, State • (555) 000-0000 • email@example.com • linkedin.com/in/username • github.com/username

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 4+ years of experience designing and scaling distributed web applications and cloud infrastructure. Proficient in TypeScript, React, Node.js, and AWS architecture. Proven track record of improving system uptime and reducing API response latency.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL
Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS
Databases & Cloud: PostgreSQL, Redis, MongoDB, AWS (EC2, S3, Lambda), Docker, Git, CI/CD

WORK EXPERIENCE
Senior Software Engineer | Acme Cloud Systems | New York, NY
June 2022 – Present
• Architected and migrated monolithic REST API to microservices using Node.js and TypeScript, decreasing average latency by 42% across 2M daily requests.
• Spearheaded automated CI/CD pipeline via GitHub Actions, reducing deployment cycle times from 40 minutes to under 7 minutes.
• Mentored 5 junior and mid-level developers in unit testing and system design, increasing test coverage from 60% to 91%.

Software Engineer | FinTech Innovations | Boston, MA
August 2020 – May 2022
• Developed real-time transaction processing interface using React, increasing customer conversion rates by 22%.
• Optimized complex SQL database queries and implemented Redis caching, saving $18,000 in annual AWS cloud infrastructure costs.
• Collaborated cross-functionally with product managers and UX designers to launch three major enterprise features on schedule.

EDUCATION
Bachelor of Science in Computer Science | University of Technology
Graduated May 2020 • GPA: 3.8/4.0
`
  },
  {
    id: 'executive-minimalist',
    title: 'Modern Executive (Minimalist)',
    targetRole: 'Senior Directors, Project Managers, Management Consultants, Finance',
    description: 'Streamlined corporate structure emphasizing strategic initiatives, P&L management, and revenue growth in plain text.',
    plainText: `FIRST LAST NAME
Chicago, IL • (555) 111-2222 • first.last@business.com • linkedin.com/in/executivename

EXECUTIVE SUMMARY
Senior Operations Director with 10+ years of cross-functional leadership in high-growth enterprise environments. Proven expertise in scaling operations, leading 40+ person teams, and driving operational margins through process automation and cost containment.

CORE COMPETENCIES
Strategic Planning • P&L Management • Cross-Functional Leadership • Vendor Negotiations • Risk Management • Agile Operations • Process Optimization

PROFESSIONAL EXPERIENCE
Director of Global Operations | Vertex Enterprise Solutions | Chicago, IL
January 2021 – Present
• Directed 45-person multidisciplinary operations department across 3 geographic regions, managing a $14M annual operating budget.
• Overhauled international vendor procurement pipeline, negotiating enterprise master services agreements that reduced supply costs by 19% ($2.4M saved).
• Championed company-wide ERP migration, cutting quarterly close cycle from 14 business days to 5 days with zero data discrepancy.

Senior Operations Manager | Apex Logistics Corp | Chicago, IL
March 2017 – December 2020
• Scaled regional distribution hub from 85k monthly units to 240k monthly units while maintaining 99.4% on-time delivery rate.
• Designed and launched standardized performance dashboards, increasing employee retention rate by 31% over two fiscal years.

EDUCATION & CERTIFICATIONS
Master of Business Administration (MBA) | Northwestern Kellogg School of Management
Bachelor of Arts in Economics | University of Michigan
Certifications: Project Management Professional (PMP) • Lean Six Sigma Black Belt
`
  },
  {
    id: 'early-career-fresher',
    title: 'Early Career & Fresh Graduate',
    targetRole: 'College Graduates, Interns, Career Changers, Junior Developers',
    description: 'Designed specifically to emphasize academic coursework, capstone projects, and technical skills before professional history.',
    plainText: `FIRST LAST NAME
Austin, TX • (555) 333-4444 • student.name@university.edu • linkedin.com/in/student • github.com/student

EDUCATION
Bachelor of Science in Computer Information Systems
University of Texas at Austin | Graduated May 2024
Relevant Coursework: Data Structures & Algorithms, Database Systems, Web Application Development, Object-Oriented Programming

TECHNICAL SKILLS
Languages: Python, JavaScript, Java, HTML, CSS, SQL
Tools & Frameworks: React, Git/GitHub, VS Code, PostgreSQL, REST APIs

ACADEMIC & CAPSTONE PROJECTS
Peer Tutoring Web Application | Full Stack Project (React, Node.js, PostgreSQL)
January 2024 – May 2024
• Built full-stack responsive web application connecting 350+ university students with volunteer tutors.
• Implemented JWT user authentication and PostgreSQL relational database schemas with zero security vulnerabilities reported during audit.
• Deployed application via modern cloud hosting with automated GitHub Actions CI/CD.

Campus Event Finder | Mobile-First Web App (JavaScript, HTML5, CSS3)
September 2023 – December 2023
• Developed interactive campus events directory with real-time category filtering and geolocation search.
• Optimized asset delivery and DOM performance, achieving a 98/100 Google Lighthouse performance score.

CAMPUS LEADERSHIP & ACTIVITIES
Vice President | Association for Computing Machinery (ACM) Student Chapter | 2023 – 2024
• Organized weekly technical workshops and bi-annual hackathons with over 180 student participants.
`
  }
];

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ navigate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#606060] bg-[#f4f4f4] px-2.5 py-1 rounded">
          ATS-Safe Layouts
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          100% ATS-Friendly Resume Templates
        </h1>
        <p className="text-base text-[#606060] leading-relaxed">
          Clean, single-column templates designed to guarantee 100% text parsing accuracy across Workday, Greenhouse, Lever, and Taleo.
        </p>
      </div>

      {/* Warning Box: Why fancy templates fail */}
      <div className="p-5 rounded-lg border border-[#e5e5e5] bg-[#fffbf0] text-xs text-[#854d0e] space-y-2">
        <h3 className="font-bold text-sm text-[#111111] flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-[#d97706]" />
          <span>Why Graphic Resume Templates Get Rejected</span>
        </h3>
        <p className="leading-relaxed text-[#713f12]">
          Resumes built in Canva, Photoshop, or two-column Word tables often fail when parsed by ATS robots. Multi-column text frequently merges horizontally (e.g., reading line 1 of column 1 then line 1 of column 2 together), turning job titles into gibberish. Graphical skill bars (e.g., "Python: 4/5 stars") are completely invisible to text scanners.
        </p>
      </div>

      {/* Templates List */}
      <div className="space-y-10">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="border border-[#e5e5e5] rounded-lg overflow-hidden bg-white shadow-xs"
          >
            {/* Template Header */}
            <div className="p-6 border-b border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fafafa]">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#606060] bg-white px-2 py-0.5 rounded border border-[#e5e5e5]">
                  {tmpl.targetRole}
                </span>
                <h2 className="text-base font-bold text-[#111111]">{tmpl.title}</h2>
                <p className="text-xs text-[#606060]">{tmpl.description}</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleCopy(tmpl.plainText, tmpl.id)}
                  className="inline-flex items-center space-x-1.5 text-xs font-medium px-3.5 py-2 rounded-md border border-[#d0d0d0] hover:border-[#111111] bg-white hover:bg-[#fafafa] text-[#111111] transition-colors"
                >
                  {copiedId === tmpl.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#15803d]" />
                      <span className="text-[#15803d]">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Plain Text</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownload(tmpl.plainText, tmpl.id)}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-md bg-[#111111] text-white hover:bg-[#282828] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            {/* Template Preview Code Block */}
            <div className="p-6 bg-white overflow-x-auto">
              <pre className="text-xs font-mono text-[#333333] whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto p-4 bg-[#fbfbfb] rounded border border-[#e5e5e5]">
                {tmpl.plainText}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Ad slot */}
      <AdPlaceholder slotId="templates-bottom-unit" format="leaderboard" />

      {/* Bottom CTA */}
      <div className="p-8 rounded-lg bg-[#fafafa] border border-[#e5e5e5] text-center space-y-3">
        <h3 className="text-base font-bold text-[#111111]">
          Already formatted your resume?
        </h3>
        <p className="text-xs text-[#606060] max-w-lg mx-auto">
          Test it with our free ATS checker to verify that all sections, metrics, and technical keywords are parsed flawlessly.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-1.5 bg-[#111111] text-white hover:bg-[#282828] text-xs font-semibold px-5 py-2.5 rounded-md transition-colors"
        >
          <span>Run Free ATS Check</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
