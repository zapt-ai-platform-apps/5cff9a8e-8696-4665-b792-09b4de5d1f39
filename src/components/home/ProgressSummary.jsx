import React from 'react';
import { BookOpenIcon, AcademicCapIcon, TrophyIcon } from '@heroicons/react/24/outline';

const ProgressSummary = ({ skills, progress }) => {
  // Calculate stats
  const totalSkills = skills.length;
  const startedSkills = Object.keys(progress).length;
  
  const completedSkills = Object.values(progress).filter(p => p >= 80).length;
  
  const overallProgress = startedSkills > 0
    ? Math.round(Object.values(progress).reduce((sum, p) => sum + p, 0) / totalSkills)
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <BookOpenIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{startedSkills} dari {totalSkills}</h3>
          <p className="text-sm text-gray-600">Keterampilan Dipelajari</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
        <div className="bg-green-100 p-3 rounded-lg mr-4">
          <AcademicCapIcon className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{overallProgress}%</h3>
          <p className="text-sm text-gray-600">Kemajuan Keseluruhan</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center">
        <div className="bg-yellow-100 p-3 rounded-lg mr-4">
          <TrophyIcon className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{completedSkills}</h3>
          <p className="text-sm text-gray-600">Keterampilan Dikuasai</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;