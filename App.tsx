
import React, { useState, useCallback } from 'react';
import { AnalysisResultType } from './types';
import { analyzeResume } from './services/geminiService';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisResult from './components/AnalysisResult';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setResumeFile(file);
    setAnalysisResult(null);
    setError(null);
  };

  const handleJobDescriptionChange = (text: string) => {
    setJobDescription(text);
    setAnalysisResult(null);
    setError(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!resumeFile || !jobDescription) {
      setError("Please upload a resume and provide a job description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64String = await fileToBase64(resumeFile);
      const result = await analyzeResume(base64String, resumeFile.type, jobDescription);
      setAnalysisResult(result);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis.";
      setError(`Analysis failed. ${errorMessage}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [resumeFile, jobDescription]);
  
  const isButtonDisabled = !resumeFile || !jobDescription.trim() || isLoading;

  return (
    <div className="min-h-screen bg-background-dark text-text-primary font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-background-light rounded-2xl shadow-2xl p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileUpload onFileChange={handleFileChange} />
            <JobDescriptionInput value={jobDescription} onChange={handleJobDescriptionChange} />
          </div>
          <div className="text-center">
            <button
              onClick={handleAnalyzeClick}
              disabled={isButtonDisabled}
              className="px-8 py-3 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-secondary disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
            >
              {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
          </div>
        </div>

        {isLoading && <Loader />}
        
        {error && (
          <div className="mt-8 bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {analysisResult && !isLoading && (
          <div className="mt-8">
            <AnalysisResult result={analysisResult} />
          </div>
        )}
      </main>
      <footer className="text-center p-4 text-text-secondary text-sm">
        <p>Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;
