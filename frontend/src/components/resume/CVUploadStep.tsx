import { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { parseCV } from '../../services/resumeService';

interface CVUploadStepProps {
  cvText: string;
  onCVTextChange: (text: string) => void;
  onComplete: () => void;
}

export default function CVUploadStep({ cvText, onCVTextChange, onComplete }: CVUploadStepProps) {
  const [uploadMode, setUploadMode] = useState<'upload' | 'paste'>('upload');
  const [dragging, setDragging] = useState<boolean>(false);
  const [parseLoading, setParseLoading] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const allowed = ['.pdf', '.docx', '.txt'];
    if (!allowed.includes(ext)) {
      setParseError('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    setParseLoading(true);
    setParseError('');
    try {
      const res = await parseCV(file);
      onCVTextChange(res.text);
    } catch (e: any) {
      setParseError(e.response?.data?.error || 'Failed to parse file. Please try pasting the text instead.');
    } finally {
      setParseLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto py-4 font-sans">
      
      {/* Step Header */}
      <div className="text-center space-y-1">
        <h2 className="font-extrabold text-2xl tracking-tight text-[#121212]">Upload your résumé</h2>
        <p className="text-[13.5px] text-[#5B5B5B]">PDF, DOCX or TXT · up to 5 MB. We'll parse it in seconds.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-[#F3F3F3] p-0.5 rounded-full max-w-[240px] mx-auto">
        <button
          onClick={() => setUploadMode('upload')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
            uploadMode === 'upload' ? 'bg-white text-[#121212] shadow-sm' : 'text-[#5B5B5B] hover:text-[#121212]'
          }`}
        >
          Document File
        </button>
        <button
          onClick={() => setUploadMode('paste')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
            uploadMode === 'paste' ? 'bg-white text-[#121212] shadow-sm' : 'text-[#5B5B5B] hover:text-[#121212]'
          }`}
        >
          Paste Text
        </button>
      </div>

      {parseError && (
        <div className="flex items-center space-x-2 p-3.5 bg-danger/10 border border-danger/20 text-[#E22134] rounded-xl text-xs font-bold animate-fadeIn text-left">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{parseError}</span>
        </div>
      )}

      {cvText ? (
        <div className="bg-white border border-[#1DB954]/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[240px] shadow-sm relative overflow-hidden select-none animate-fadeIn">
          {/* Green brand decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1DB954]" />
          
          <div className="w-[56px] h-[56px] rounded-full bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] mb-4">
            <CheckCircle className="w-7 h-7" />
          </div>
          
          <div className="space-y-1 mb-6">
            <p className="text-[16px] font-black text-[#121212]">Your CV is uploaded</p>
            <p className="text-xs text-[#8A8A8A] font-semibold">Successfully parsed &amp; loaded ({cvText.length.toLocaleString()} characters detected)</p>
          </div>

          <button
            type="button"
            onClick={() => onCVTextChange('')}
            className="px-5 py-2 border border-[#CFCFCF] hover:border-[#121212] rounded-full text-xs font-bold text-[#5B5B5B] hover:text-[#121212] active:scale-95 transition-all shadow-sm"
          >
            Change CV / Re-upload
          </button>
        </div>
      ) : (
        uploadMode === 'upload' ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[240px] ${
              dragging
                ? 'border-[#1DB954] bg-[#1DB954]/5'
                : 'border-[#D6D6D6] bg-[#FAFAFA] hover:border-[#1DB954] hover:bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
            {parseLoading ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-[34px] h-[34px] border-[3px] border-[#1DB954] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-bold text-[#5B5B5B]">Extracting resume content...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-[60px] h-[60px] rounded-xl bg-[#1DB954]/12 flex items-center justify-center mx-auto text-[#1DB954]">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-[#121212]">Drop your résumé here</p>
                  <p className="text-xs text-[#8A8A8A]">or</p>
                </div>
                <button 
                  type="button" 
                  className="inline-flex font-bold text-xs uppercase tracking-wider text-white bg-[#121212] px-5 py-2.5 rounded-full hover:bg-[#121212]/90 shadow-sm transition-all duration-150"
                >
                  Choose file
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2 text-left">
            <textarea
              value={cvText}
              onChange={(e) => onCVTextChange(e.target.value)}
              placeholder="Paste the plain text transcript of your CV here..."
              rows={12}
              className="w-full rounded-2xl border border-[#EBEBEB] bg-white text-[#121212] p-4 text-xs font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 transition-all resize-none placeholder:text-[#8A8A8A]"
            />
            <p className="text-right text-[10px] font-bold text-[#8A8A8A]">{cvText.length.toLocaleString()} characters</p>
          </div>
        )
      )}

      {/* Success File parsed representation */}
      {cvText && !parseLoading && (
        <div className="flex items-center gap-3.5 bg-white border border-[#E6E6E6] rounded-xl p-3.5 text-left animate-fadeIn">
          <div className="w-[34px] h-10 rounded bg-[#FBEAEA] flex items-center justify-center text-[8px] font-extrabold text-[#E22134] uppercase shrink-0">
            PDF
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-extrabold text-[#121212] truncate">resume_extracted.pdf</div>
            <div className="text-[10px] text-[#5B5B5B] mt-0.5">Parsed Successfully ✓ {cvText.length.toLocaleString()} characters loaded</div>
          </div>
          <CheckCircle className="w-5 h-5 text-[#1DB954] shrink-0" />
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onComplete}
          disabled={!cvText.trim() || parseLoading}
          className="border-none cursor-pointer w-full h-[50px] rounded-full bg-[#1DB954] hover:bg-[#1aa34a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle"
        >
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
}
