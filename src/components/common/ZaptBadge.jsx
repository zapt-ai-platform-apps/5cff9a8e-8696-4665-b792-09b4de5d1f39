import React from 'react';

const ZaptBadge = () => {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center bg-white px-2 py-1 rounded-md shadow-md border border-gray-200 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Made on ZAPT
      </a>
    </div>
  );
};

export default ZaptBadge;