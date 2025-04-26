import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import ProgressIndicator from '../common/ProgressIndicator';

const Header = ({ onMenuToggle, progress }) => {
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={onMenuToggle} 
            className="p-1 rounded-md text-indigo-100 hover:bg-indigo-600 focus:outline-none cursor-pointer sm:block md:hidden"
            aria-label="Menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <Link to="/" className="text-xl font-bold flex items-center">
            Skill With People
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <ProgressIndicator progress={progress} />
          </div>
          <Link 
            to="/" 
            className="px-3 py-1.5 bg-white text-indigo-700 rounded-md font-medium text-sm hover:bg-indigo-50 cursor-pointer"
          >
            Beranda
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;