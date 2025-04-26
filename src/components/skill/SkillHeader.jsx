import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProgressIndicator from '../common/ProgressIndicator';

const SkillHeader = ({ skill, progress }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-800 flex items-center mr-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">Kembali</span>
        </Link>
        
        <div className="hidden sm:block ml-auto">
          <ProgressIndicator progress={progress || 0} />
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">{skill.title}</h1>
      
      <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm mb-4">
        {skill.category}
      </div>
      
      <p className="text-gray-700 leading-relaxed">{skill.description}</p>
    </div>
  );
};

export default SkillHeader;