import React from 'react';
import { NavLink } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, onClose, skills, progress }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar for mobile (conditionally rendered) */}
      <motion.aside
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-bold text-indigo-700">Daftar Keterampilan</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <nav className="p-4">
          <SidebarLinks skills={skills} progress={progress} onClose={onClose} />
        </nav>
      </motion.aside>
      
      {/* Sidebar for desktop (always visible) */}
      <aside className="hidden md:block w-64 bg-white shadow-md overflow-y-auto shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-indigo-700">Daftar Keterampilan</h2>
        </div>
        
        <nav className="p-4">
          <SidebarLinks skills={skills} progress={progress} />
        </nav>
      </aside>
    </>
  );
};

const SidebarLinks = ({ skills, progress, onClose }) => {
  return (
    <ul className="space-y-2">
      {skills.map((skill) => {
        const currentProgress = progress[skill.id] || 0;
        
        return (
          <li key={skill.id}>
            <NavLink
              to={`/skill/${skill.id}`}
              onClick={onClose}
              className={({ isActive }) => 
                `block p-2 rounded-md transition-colors duration-200 flex items-center ${
                  isActive 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <div className="flex-1">
                {skill.title}
              </div>
              <div className="ml-2 w-6 h-6 flex items-center justify-center text-xs bg-indigo-100 text-indigo-800 rounded-full">
                {currentProgress}%
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;