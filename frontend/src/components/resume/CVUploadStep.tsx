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
    <div className="space-y-6 max-w-3xl mx-auto py-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-800">Submit Your Resume</h2>
        <p className="text-sm text-slate-500">Provide your CV text by dragging a document file or pasting the text copy.</p>
      </div>

      <div className="flex space-x-1 bg-slate-100 p-0.5 rounded-xl max-w-xs">
        <button
          onClick={() => setUploadMode('upload')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
            uploadMode === 'upload' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Document File
        </button>
        <button
          onClick={() => setUploadMode('paste')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
            uploadMode === 'paste' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Paste Text
        </button>
      </div>

      {parseError && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-fadeIn">
          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{parseError}</span>
        </div>
      )}

      {uploadMode === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[250px] ${
            dragging
              ? 'border-blue-500 bg-blue-50/30'
              : 'border-slate-200 hover:border-blue-500 hover:bg-slate-50/50'
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
              <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-600">Extracting resume content...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto text-blue-600">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800">Drag and drop your CV file here</p>
                <p className="text-xs text-slate-400">PDF, DOCX, or TXT formats supported (Max 10MB)</p>
              </div>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
                Browse File
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={cvText}
            onChange={(e) => onCVTextChange(e.target.value)}
            placeholder="Paste the plain text transcript of your CV here..."
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-white text-slate-700 p-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          />
          <p className="text-right text-xs text-slate-400">{cvText.length.toLocaleString()} characters pasted</p>
        </div>
      )}

      {cvText && !parseLoading && (
        <div className="flex items-center space-x-2 p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-sm">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Resume parsed and saved successfully ({cvText.length.toLocaleString()} characters loaded)</span>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          onClick={onComplete}
          disabled={!cvText.trim() || parseLoading}
          className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>Continue to Target JDs</span>
        </button>
      </div>
    </div>
  );
}
