
import React from 'react';
import { AnalysisResultType } from '../types';
import ScoreCircle from './ScoreCircle';
import { XIcon } from './icons/XIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const ResultCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
  <div className="bg-background-light p-6 rounded-xl shadow-lg">
    <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    <ul className="space-y-3 text-text-secondary">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-brand-primary mr-3 mt-1">&#8227;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-background-light p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-center text-center md:text-left md:justify-between">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-text-primary">Your Results Are In!</h2>
          <p className="mt-2 text-text-secondary">
            Here's a breakdown of how your resume stacks up against the job description. Use these insights to tailor your resume and boost your chances.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <ScoreCircle score={result.atsScore} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResultCard title="Areas for Improvement" items={result.whatIsWrong} icon={<XIcon />} />
        <ResultCard title="Missing Keywords & Skills" items={result.whatIsMissing} icon={<LightbulbIcon />} />
      </div>
    </div>
  );
};

export default AnalysisResult;
