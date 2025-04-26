import React from 'react';

const ProgressIndicator = ({ progress }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-white rounded-full w-40 h-4 overflow-hidden">
        <div 
          className="bg-green-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-medium text-white">{progress}%</span>
    </div>
  );
};

export default ProgressIndicator;