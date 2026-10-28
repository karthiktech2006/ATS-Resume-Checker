import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, ChevronDown, ChevronUp, Lock } from 'lucide-react';

interface UploadZoneProps {
  onAnalyze: (file: File, jobDescription: string) => Promise<void>;
  onLoadDemo: () => void;
  isAnalyzing: boolean;
  uploadProgress: number;
  errorMessage: string | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onAnalyze,
  onLoadDemo,
  isAnalyzing,
  uploadProgress,
  errorMessage
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [showJobDescField, setShowJobDescField] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
  const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc'];

  const validateAndSetFile = (file: File) => {
    setValidationError(null);
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setValidationError('Please upload a PDF (.pdf) or Microsoft Word (.docx) document.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setValidationError('File size exceeds the 10MB limit. Please upload a smaller document.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setValidationError('Please select or drop a resume file first.');
      return;
    }
    onAnalyze(selectedFile, jobDescription);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg border border-[#e5e5e5] p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Drag & Drop File Box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-8 sm:p-10 text-center cursor-pointer transition-all duration-150 ${
            dragActive
              ? 'border-[#111111] bg-[#f7f7f7]'
              : 'border-[#d0d0d0] hover:border-[#111111] bg-[#fbfbfb] hover:bg-white'
          }`}
          role="button"
          tabIndex={0}
          aria-label="Upload resume file dropzone"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleChange}
            className="hidden"
            aria-label="Choose resume file input"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#111111]">
              <UploadCloud className="w-6 h-6 stroke-[1.5]" />
            </div>

            <div>
              <p className="text-base font-semibold text-[#111111]">
                Drop your resume here, or <span className="underline underline-offset-2">browse files</span>
              </p>
              <p className="text-xs text-[#606060] mt-1">
                Supports PDF and DOCX (up to 10MB). Text-based resumes only.
              </p>
            </div>
          </div>
        </div>

        {/* Selected File Badge */}
        {selectedFile && (
          <div className="flex items-center justify-between p-3.5 bg-[#f7f7f7] rounded-md border border-[#e5e5e5]">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2 bg-white rounded border border-[#e5e5e5]">
                <FileText className="w-5 h-5 text-[#111111]" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-[#111111] truncate">{selectedFile.name}</p>
                <p className="text-xs text-[#606060]">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="text-xs text-[#606060] hover:text-[#111111] font-medium px-2 py-1 rounded hover:bg-[#e5e5e5] transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        {/* Validation or Server Error */}
        {(validationError || errorMessage) && (
          <div className="flex items-start space-x-2.5 p-3.5 bg-[#fff8f8] border border-[#ffd2d2] rounded-md text-xs text-[#b30000]">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{validationError || errorMessage}</p>
          </div>
        )}

        {/* Optional Job Description Expander */}
        <div className="border border-[#e5e5e5] rounded-md overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setShowJobDescField(!showJobDescField)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#fdfdfd] hover:bg-[#f7f7f7] text-left transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-[#111111]">
                Target Job Description (Optional)
              </span>
              <span className="text-[11px] text-[#606060] bg-[#f0f0f0] px-2 py-0.5 rounded">
                Unlocks keyword matching
              </span>
            </div>
            {showJobDescField ? (
              <ChevronUp className="w-4 h-4 text-[#606060]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#606060]" />
            )}
          </button>

          {showJobDescField && (
            <div className="p-4 border-t border-[#e5e5e5] space-y-2">
              <label htmlFor="job-description-input" className="block text-xs text-[#606060]">
                Paste the job requirements or full posting below to check keyword coverage and missing critical skills.
              </label>
              <textarea
                id="job-description-input"
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="e.g. Seeking a Full Stack Engineer with 3+ years experience in React, TypeScript, PostgreSQL, and AWS..."
                className="w-full p-3 text-xs border border-[#d0d0d0] rounded-md focus:outline-none focus:border-[#111111] text-[#111111] bg-white placeholder-[#909090]"
              />
              <div className="flex justify-between items-center text-[11px] text-[#909090]">
                <span>Leave blank for general ATS formatting and impact audit</span>
                <span>{jobDescription.length} characters</span>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress Bar if Analyzing */}
        {isAnalyzing && (
          <div className="space-y-2 py-2">
            <div className="flex justify-between text-xs text-[#606060]">
              <span className="font-medium text-[#111111]">Extracting text & calculating ATS score...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-[#f0f0f0] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#111111] h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isAnalyzing || !selectedFile}
            className={`w-full sm:flex-1 py-3 px-6 rounded-md font-medium text-sm transition-colors text-center ${
              isAnalyzing || !selectedFile
                ? 'bg-[#e5e5e5] text-[#909090] cursor-not-allowed'
                : 'bg-[#111111] text-white hover:bg-[#282828] cursor-pointer'
            }`}
          >
            {isAnalyzing ? 'Analyzing Resume...' : 'Analyze Resume Free'}
          </button>

          <button
            type="button"
            onClick={onLoadDemo}
            disabled={isAnalyzing}
            className="w-full sm:w-auto py-3 px-5 border border-[#d0d0d0] hover:border-[#111111] bg-white hover:bg-[#fafafa] rounded-md font-medium text-xs text-[#111111] transition-colors flex items-center justify-center space-x-1.5"
            aria-label="View demo analysis sample"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>View Sample Demo Report</span>
          </button>
        </div>

        {/* Privacy & Guarantee note */}
        <div className="flex items-center justify-center space-x-2 text-xs text-[#606060] pt-2">
          <Lock className="w-3.5 h-3.5 text-[#111111]" />
          <span>Strict privacy: Resumes are processed in volatile memory only and never saved or indexed.</span>
        </div>
      </form>
    </div>
  );
};
