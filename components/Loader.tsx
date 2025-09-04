
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
        <p className="mt-4 text-text-secondary">Analyzing your resume, please wait...</p>
    </div>
  );
};

export default Loader;
