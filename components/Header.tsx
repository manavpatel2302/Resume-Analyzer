
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 md:p-10 border-b border-background-light">
      <h1 className="text-4xl md:text-5xl font-bold text-brand-primary">
        AI Resume Analyzer
      </h1>
      <p className="mt-3 text-lg text-text-secondary max-w-2xl mx-auto">
        Upload your resume and paste a job description to get an instant analysis of your ATS score and areas for improvement.
      </p>
    </header>
  );
};

export default Header;
