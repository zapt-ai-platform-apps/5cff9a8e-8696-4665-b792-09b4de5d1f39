import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const SkillCard = ({ skill, progress = 0 }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-indigo-800">{skill.title}</h3>
        
        <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full">
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>
      
      <div className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs mb-3">
        {skill.category}
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{skill.description}</p>
      
      <div className="bg-gray-100 h-1.5 rounded-full mb-4">
        <div 
          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <Link 
          to={`/skill/${skill.id}`}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center cursor-pointer"
        >
          Pelajari
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Link>
        
        <Link 
          to={`/practice/${skill.id}`}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer"
        >
          Latih
        </Link>
      </div>
    </div>
  );
};

export default SkillCard;