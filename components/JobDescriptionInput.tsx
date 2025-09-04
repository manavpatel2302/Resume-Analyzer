
import React from 'react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="job-description" className="text-lg font-semibold text-text-primary">
        Job Description
      </label>
      <textarea
        id="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the full job description here..."
        className="w-full h-48 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-text-secondary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors duration-300 resize-none"
      />
    </div>
  );
};

export default JobDescriptionInput;
