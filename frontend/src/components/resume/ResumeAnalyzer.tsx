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
      {/* Step Stepper Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setStep(0)}
            className={`flex items-center space-x-2 text-sm font-medium transition-all ${
              step === 0 ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
              step === 0 ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold' : 'border-slate-300 text-slate-400'
            }`}>1</span>
            <span>Resume Document</span>
          </button>
          <div className="h-px w-8 bg-slate-200" />
          <button
            onClick={() => {
              if (cvText.trim()) setStep(1);
            }}
            disabled={!cvText.trim()}
            className={`flex items-center space-x-2 text-sm font-medium transition-all ${
              step === 1 ? 'text-blue-600' : 'text-slate-400 disabled:opacity-50 hover:enabled:text-slate-600'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
              step === 1 ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold' : 'border-slate-300 text-slate-400'
            }`}>2</span>
            <span>Target JDs ({jds.length}/5)</span>
          </button>
          <div className="h-px w-8 bg-slate-200" />
          <button
            onClick={() => {
              if (analysis) setStep(2);
            }}
            disabled={!analysis}
            className={`flex items-center space-x-2 text-sm font-medium transition-all ${
              step === 2 ? 'text-blue-600' : 'text-slate-400 disabled:opacity-50 hover:enabled:text-slate-600'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
              step === 2 ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold' : 'border-slate-300 text-slate-400'
            }`}>3</span>
            <span>ATS Audit Report</span>
          </button>
        </div>

        {step === 2 && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-50/50 transition-all font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Analysis</span>
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
