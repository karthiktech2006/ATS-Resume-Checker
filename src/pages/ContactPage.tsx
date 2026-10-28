import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Feedback',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setSuccessMessage(data.message || 'Thank you! Your message has been received.');
      setFormData({
        name: '',
        email: '',
        subject: 'General Feedback',
        message: ''
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#606060] bg-[#f4f4f4] px-2.5 py-1 rounded">
          Contact &amp; Feedback
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Get in Touch With Us
        </h1>
        <p className="text-xs sm:text-sm text-[#606060] max-w-lg mx-auto leading-relaxed">
          Have an inquiry, found a parser bug, or want to suggest an ATS feature? We respond to every user message.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg border border-[#e5e5e5] p-6 sm:p-8 shadow-xs">
        {successMessage ? (
          <div className="p-6 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#166534] mx-auto" />
            <h3 className="text-sm font-bold text-[#166534]">Message Dispatched</h3>
            <p className="text-xs text-[#166534] max-w-md mx-auto">{successMessage}</p>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-xs font-semibold text-[#166534] underline underline-offset-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="flex items-center space-x-2 p-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#111111]">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-3 py-2 text-xs border border-[#d0d0d0] rounded-md focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#111111]">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jordan@example.com"
                  className="w-full px-3 py-2 text-xs border border-[#d0d0d0] rounded-md focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#111111]">
                Subject
              </label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#d0d0d0] rounded-md focus:outline-none focus:border-[#111111] bg-white text-[#111111]"
              >
                <option value="General Feedback">General Feedback</option>
                <option value="Parser Bug Report">Parser Bug Report</option>
                <option value="Feature Suggestion">Feature Suggestion</option>
                <option value="Privacy Question">Privacy Question</option>
                <option value="Partnership / Sponsorship">Partnership / Sponsorship</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#111111]">
                Message *
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help make ResumeCheck better?"
                className="w-full p-3 text-xs border border-[#d0d0d0] rounded-md focus:outline-none focus:border-[#111111] text-[#111111] placeholder-[#909090]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 px-4 rounded-md font-medium text-xs text-white transition-colors flex items-center justify-center space-x-2 ${
                isSubmitting ? 'bg-[#909090] cursor-not-allowed' : 'bg-[#111111] hover:bg-[#282828] cursor-pointer'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
