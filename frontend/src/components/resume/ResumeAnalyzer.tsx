import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import CVUploadStep from './CVUploadStep';
import JDListStep from './JDListStep';
import AuditReportStep from './AuditReportStep';
import { analyzeCV } from '../../services/resumeService';
import type { JobDescription, ResumeAnalysisResult } from '../../services/resumeService';

interface ResumeAnalyzerProps {
  onAnalysisUpdated: (analysis: ResumeAnalysisResult | null) => void;
}

export default function ResumeAnalyzer({ onAnalysisUpdated }: ResumeAnalyzerProps) {
  // Stepper state: 0 = upload CV, 1 = JDs, 2 = analysis
  const [step, setStep] = useState<number>(0);
  const [cvText, setCvText] = useState<string>('');
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  
  // Loading & error states for running the final analysis
  const [analysisLoading, setAnalysisLoading] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string>('');

  // Sync state from sessionStorage upon mounting
  useEffect(() => {
    const cachedText = sessionStorage.getItem('careerlens_cv_text');
    const cachedAnalysis = sessionStorage.getItem('careerlens_cv_analysis');
    const cachedJds = sessionStorage.getItem('careerlens_cv_jds');

    if (cachedText) setCvText(cachedText);
    if (cachedJds) {
      try {
        setJds(JSON.parse(cachedJds));
      } catch (e) {}
    }
    if (cachedAnalysis) {
      try {
        const parsed = JSON.parse(cachedAnalysis);
        setAnalysis(parsed);
        setStep(2);
      } catch (e) {}
    }
  }, []);

  const handleCVTextChange = (text: string) => {
    setCvText(text);
    sessionStorage.setItem('careerlens_cv_text', text);
    // Clear pichli JDs aur analysis results taake naye CV par fresh fetch aur assessment ho
    setJds([]);
    setAnalysis(null);
    sessionStorage.removeItem('careerlens_cv_jds');
    sessionStorage.removeItem('careerlens_cv_analysis');
    onAnalysisUpdated(null);
  };

  const handleJdsChange = (updatedJds: JobDescription[]) => {
    setJds(updatedJds);
    sessionStorage.setItem('careerlens_cv_jds', JSON.stringify(updatedJds));
  };

  const handleRunAnalysis = async () => {
    if (!cvText.trim()) {
      setAnalysisError('Please provide a CV to analyze.');
      setStep(0);
      return;
    }
    if (jds.length < 5) {
      setAnalysisError('At least 5 job descriptions are required to assess average alignment.');
      setStep(1);
      return;
    }

    setAnalysisLoading(true);
    setAnalysisError('');
    try {
      const res = await analyzeCV(cvText, jds);
      setAnalysis(res.analysis);
      sessionStorage.setItem('careerlens_cv_analysis', JSON.stringify(res.analysis));
      onAnalysisUpdated(res.analysis);
      setStep(2);
    } catch (e: any) {
      setAnalysisError(e.response?.data?.error || 'CV analysis failed. Please try again.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleReset = () => {
    setCvText('');
    setJds([]);
    setAnalysis(null);
    sessionStorage.removeItem('careerlens_cv_text');
    sessionStorage.removeItem('careerlens_cv_analysis');
    sessionStorage.removeItem('careerlens_cv_jds');
    onAnalysisUpdated(null);
    setStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Connect UIUX Stepper Header */}
      <div className="py-5 border-b border-[#F0F0F0] flex items-center justify-between gap-0 font-sans">
        <div className="flex items-center flex-1 justify-start">
          {/* Step 1: Upload CV */}
          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-3 text-left focus:outline-none"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold transition-all duration-200 ${
              step >= 0 ? 'bg-[#1DB954] text-white' : 'bg-[#F3F3F3] text-[#8A8A8A]'
            }`}>1</div>
            <span className={`text-[13.5px] font-bold transition-all duration-200 ${
              step === 0 ? 'text-[#121212]' : 'text-[#8A8A8A]'
            }`}>Upload CV</span>
          </button>
          
          <div className={`flex-1 h-[2px] mx-4 transition-all duration-200 ${
            step >= 1 ? 'bg-[#1DB954]' : 'bg-[#F0F0F0]'
          }`} />

          {/* Step 2: Target JDs */}
          <button
            onClick={() => {
              if (cvText.trim()) setStep(1);
            }}
            disabled={!cvText.trim()}
            className="flex items-center gap-3 text-left focus:outline-none disabled:opacity-60"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold transition-all duration-200 ${
              step >= 1 ? 'bg-[#1DB954] text-white' : 'bg-[#F3F3F3] text-[#8A8A8A]'
            }`}>2</div>
            <span className={`text-[13.5px] font-bold transition-all duration-200 ${
              step === 1 ? 'text-[#121212]' : 'text-[#8A8A8A]'
            }`}>Target JDs ({jds.length})</span>
          </button>

          <div className={`flex-1 h-[2px] mx-4 transition-all duration-200 ${
            step >= 2 ? 'bg-[#1DB954]' : 'bg-[#F0F0F0]'
          }`} />

          {/* Step 3: ATS Audit */}
          <button
            onClick={() => {
              if (analysis) setStep(2);
            }}
            disabled={!analysis}
            className="flex items-center gap-3 text-left focus:outline-none disabled:opacity-60"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold transition-all duration-200 ${
              step >= 2 ? 'bg-[#1DB954] text-white' : 'bg-[#F3F3F3] text-[#8A8A8A]'
            }`}>3</div>
            <span className={`text-[13.5px] font-bold transition-all duration-200 ${
              step === 2 ? 'text-[#121212]' : 'text-[#8A8A8A]'
            }`}>ATS Audit Report</span>
          </button>
        </div>

        {step === 2 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#CFCFCF] text-xs font-bold text-[#121212] hover:bg-[#F3F3F3] hover:border-[#121212] active:scale-95 transition-all shrink-0 ml-4"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {analysisError && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm animate-fadeIn">
          <span>{analysisError}</span>
        </div>
      )}

      {/* Render Steps */}
      {step === 0 && (
        <CVUploadStep
          cvText={cvText}
          onCVTextChange={handleCVTextChange}
          onComplete={() => setStep(1)}
        />
      )}

      {step === 1 && (
        <JDListStep
          jds={jds}
          onJdsChange={handleJdsChange}
          onBack={() => setStep(0)}
          onAnalyze={handleRunAnalysis}
          analysisLoading={analysisLoading}
        />
      )}

      {step === 2 && analysis && (
        <AuditReportStep
          analysis={analysis}
          cvText={cvText}
          jds={jds}
        />
      )}
    </div>
  );
}
