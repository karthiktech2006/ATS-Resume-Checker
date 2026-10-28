import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  Clock, 
  FileText,
  Sliders
} from 'lucide-react';
import { AdminAnalytics } from '../utils/types';

export const AdminPanelPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('rc_admin_token'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [stats, setStats] = useState<AdminAnalytics | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);

  // Editable settings
  const [maxUploadSizeMB, setMaxUploadSizeMB] = useState(10);
  const [rateLimitPerHour, setRateLimitPerHour] = useState(20);
  const [allowDocx, setAllowDocx] = useState(true);
  const [allowPdf, setAllowPdf] = useState(true);
  const [enableAdSenseSlots, setEnableAdSenseSlots] = useState(false);
  const [geminiEnhancedParsing, setGeminiEnhancedParsing] = useState(true);

  const fetchStats = async (adminToken: string) => {
    setIsLoadingStats(true);
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }
      const data: AdminAnalytics = await res.json();
      setStats(data);
      if (data.systemSettings) {
        setMaxUploadSizeMB(Math.round(data.systemSettings.maxUploadSizeBytes / (1024 * 1024)));
        setRateLimitPerHour(data.systemSettings.rateLimitPerHour);
        setAllowDocx(data.systemSettings.allowDocx);
        setAllowPdf(data.systemSettings.allowPdf);
        setEnableAdSenseSlots(data.systemSettings.enableAdSenseSlots);
        setGeminiEnhancedParsing(data.systemSettings.geminiEnhancedParsing);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      sessionStorage.setItem('rc_admin_token', data.token);
      setToken(data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid administrator password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        // Ignore
      }
    }
    sessionStorage.removeItem('rc_admin_token');
    setToken(null);
    setStats(null);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSettingsSuccess(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          maxUploadSizeBytes: maxUploadSizeMB * 1024 * 1024,
          rateLimitPerHour,
          allowDocx,
          allowPdf,
          enableAdSenseSlots,
          geminiEnhancedParsing
        })
      });

      if (!res.ok) throw new Error('Failed to update system settings.');
      setSettingsSuccess('System configurations updated successfully.');
      setTimeout(() => setSettingsSuccess(null), 3000);
      fetchStats(token);
    } catch (err: any) {
      alert(err.message || 'Error updating settings');
    }
  };

  // If not logged in, show clean server-verified login form
  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-md bg-[#111111] flex items-center justify-center text-white mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-[#111111]">
            Administrator Authentication
          </h1>
          <p className="text-xs text-[#606060]">
            Enter the authorized admin master password to access system metrics and runtime settings.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 shadow-xs">
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="admin-pass" className="block text-xs font-semibold text-[#111111]">
                Master Password
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="w-full px-3 py-2 text-xs border border-[#d0d0d0] rounded-md focus:outline-none focus:border-[#111111]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-2.5 px-4 rounded-md font-semibold text-xs text-white transition-colors flex items-center justify-center space-x-2 ${
                isLoggingIn ? 'bg-[#909090]' : 'bg-[#111111] hover:bg-[#282828]'
              }`}
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign In to Panel'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#e5e5e5] gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-md bg-[#111111] flex items-center justify-center text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#111111]">ResumeCheck Admin Console</h1>
            <p className="text-xs text-[#606060]">Server-verified telemetry and runtime configuration</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => token && fetchStats(token)}
            disabled={isLoadingStats}
            className="inline-flex items-center space-x-1.5 text-xs border border-[#d0d0d0] px-3 py-1.5 rounded-md hover:bg-[#f7f7f7] text-[#111111]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStats ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 text-xs text-[#991b1b] hover:bg-[#fee2e2] px-3 py-1.5 rounded-md border border-[#fecaca] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Aggregate Metrics Grid */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-lg border border-[#e5e5e5] bg-white">
            <span className="text-[11px] font-semibold text-[#606060] uppercase tracking-wider block">
              Total Scans
            </span>
            <span className="text-2xl font-bold text-[#111111] mt-1 block">
              {stats.totalScans}
            </span>
            <span className="text-[11px] text-[#15803d]">All-time aggregate</span>
          </div>

          <div className="p-4 rounded-lg border border-[#e5e5e5] bg-white">
            <span className="text-[11px] font-semibold text-[#606060] uppercase tracking-wider block">
              Scans Today
            </span>
            <span className="text-2xl font-bold text-[#111111] mt-1 block">
              {stats.todayScans}
            </span>
            <span className="text-[11px] text-[#606060]">Past 24 hours</span>
          </div>

          <div className="p-4 rounded-lg border border-[#e5e5e5] bg-white">
            <span className="text-[11px] font-semibold text-[#606060] uppercase tracking-wider block">
              Average Score
            </span>
            <span className="text-2xl font-bold text-[#111111] mt-1 block">
              {stats.averageScore}
              <span className="text-xs font-normal text-[#909090]">/100</span>
            </span>
            <span className="text-[11px] text-[#606060]">Candidate benchmark</span>
          </div>

          <div className="p-4 rounded-lg border border-[#e5e5e5] bg-white">
            <span className="text-[11px] font-semibold text-[#606060] uppercase tracking-wider block">
              PDF Scans
            </span>
            <span className="text-2xl font-bold text-[#111111] mt-1 block">
              {stats.pdfScans}
            </span>
            <span className="text-[11px] text-[#606060]">
              {Math.round((stats.pdfScans / Math.max(1, stats.totalScans)) * 100)}% share
            </span>
          </div>

          <div className="p-4 rounded-lg border border-[#e5e5e5] bg-white">
            <span className="text-[11px] font-semibold text-[#606060] uppercase tracking-wider block">
              DOCX Scans
            </span>
            <span className="text-2xl font-bold text-[#111111] mt-1 block">
              {stats.docxScans}
            </span>
            <span className="text-[11px] text-[#606060]">
              {Math.round((stats.docxScans / Math.max(1, stats.totalScans)) * 100)}% share
            </span>
          </div>

          <div className="p-4 rounded-lg border border-[#e5e5e5] bg-white">
            <span className="text-[11px] font-semibold text-[#606060] uppercase tracking-wider block">
              With Job Desc
            </span>
            <span className="text-2xl font-bold text-[#111111] mt-1 block">
              {stats.scansWithJobDesc}
            </span>
            <span className="text-[11px] text-[#606060]">Targeted scans</span>
          </div>
        </div>
      )}

      {/* Settings Form & Recent Audit Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Runtime Settings Editor */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#e5e5e5] p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-[#111111]" />
            <h2 className="text-sm font-bold text-[#111111]">
              Runtime Configurations
            </h2>
          </div>

          {settingsSuccess && (
            <div className="p-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-md text-xs text-[#166534] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{settingsSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label htmlFor="setting-max-size" className="font-semibold text-[#111111]">
                Max Upload Size: {maxUploadSizeMB} MB
              </label>
              <input
                id="setting-max-size"
                type="range"
                min="2"
                max="25"
                value={maxUploadSizeMB}
                onChange={(e) => setMaxUploadSizeMB(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="setting-rate-limit" className="font-semibold text-[#111111]">
                Hourly Rate Limit per IP
              </label>
              <input
                id="setting-rate-limit"
                type="number"
                min="5"
                max="100"
                value={rateLimitPerHour}
                onChange={(e) => setRateLimitPerHour(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-[#d0d0d0] rounded-md text-xs"
              />
            </div>

            <div className="pt-2 space-y-2.5">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowPdf}
                  onChange={(e) => setAllowPdf(e.target.checked)}
                  className="rounded text-[#111111]"
                />
                <span className="font-medium text-[#111111]">Allow PDF Uploads</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDocx}
                  onChange={(e) => setAllowDocx(e.target.checked)}
                  className="rounded text-[#111111]"
                />
                <span className="font-medium text-[#111111]">Allow DOCX Uploads</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableAdSenseSlots}
                  onChange={(e) => setEnableAdSenseSlots(e.target.checked)}
                  className="rounded text-[#111111]"
                />
                <span className="font-medium text-[#111111]">Enable AdSense Slots (Placeholders)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={geminiEnhancedParsing}
                  onChange={(e) => setGeminiEnhancedParsing(e.target.checked)}
                  className="rounded text-[#111111]"
                />
                <span className="font-medium text-[#111111]">Gemini AI Rephrasing Assistant</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#111111] hover:bg-[#282828] text-white rounded-md font-semibold transition-colors mt-4"
            >
              Apply System Changes
            </button>
          </form>
        </div>

        {/* Recent Anonymized Audit Log */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#e5e5e5] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#111111]">
              Recent Aggregate Processing Audit
            </h2>
            <span className="text-[11px] text-[#606060] bg-[#f4f4f4] px-2 py-0.5 rounded">
              Zero PII Retained
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f7f7f7] border-y border-[#e5e5e5] text-[#606060]">
                <tr>
                  <th className="py-2 px-3 font-semibold">Time</th>
                  <th className="py-2 px-3 font-semibold">Format</th>
                  <th className="py-2 px-3 font-semibold">Score</th>
                  <th className="py-2 px-3 font-semibold">Words</th>
                  <th className="py-2 px-3 font-semibold">Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {stats && stats.recentScans.length > 0 ? (
                  stats.recentScans.map((scan) => (
                    <tr key={scan.id} className="hover:bg-[#fafafa]">
                      <td className="py-2 px-3 text-[#606060]">
                        {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2 px-3 font-medium text-[#111111]">
                        {scan.fileType.includes('pdf') ? 'PDF' : 'DOCX'}
                      </td>
                      <td className="py-2 px-3 font-bold text-[#111111]">
                        {scan.score}/100
                      </td>
                      <td className="py-2 px-3 text-[#606060]">
                        {scan.wordCount}
                      </td>
                      <td className="py-2 px-3 text-[#606060]">
                        {scan.processingTimeMs} ms
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-[#909090]">
                      No audit scans recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
