import React, { useState } from 'react';
import { FileText, Menu, X, Shield, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Resume Checker', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'ATS Templates', path: '/resume-templates' },
    { label: 'Formatting Guide', path: '/guides/ats-resume-guide' },
    { label: 'ATS Keywords', path: '/guides/ats-keywords' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('/')}>
            <div className="w-8 h-8 rounded-md bg-[#111111] flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-[#111111] tracking-tight">ResumeCheck</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#f2f2f2] text-[#555555] px-2 py-0.5 rounded">
                Free ATS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-[#111111] bg-[#f4f4f4]'
                      : 'text-[#606060] hover:text-[#111111] hover:bg-[#f9f9f9]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Privacy Badge */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-xs text-[#606060] bg-[#f9f9f9] px-2.5 py-1.5 rounded border border-[#e5e5e5]">
              <Shield className="w-3.5 h-3.5 text-[#111111]" />
              <span>Zero-Storage Privacy</span>
            </div>

            <button
              onClick={() => handleNav('/')}
              className="bg-[#111111] text-white hover:bg-[#272727] text-sm font-medium px-4 py-2 rounded-md transition-colors shadow-xs"
            >
              Scan Your Resume
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#606060] hover:text-[#111111] hover:bg-[#f4f4f4] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e5e5e5] bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-[#111111] bg-[#f4f4f4]'
                    : 'text-[#606060] hover:text-[#111111] hover:bg-[#f9f9f9]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleNav('/')}
              className="w-full bg-[#111111] text-white text-sm font-medium px-4 py-2.5 rounded-md text-center"
            >
              Start Free Resume Scan
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
