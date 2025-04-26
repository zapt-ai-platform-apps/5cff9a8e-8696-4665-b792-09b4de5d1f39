import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import ZaptBadge from './components/common/ZaptBadge';

// Page components
import HomePage from './pages/HomePage';
import SkillPage from './pages/SkillPage';
import PracticePage from './pages/PracticePage';
import NotFoundPage from './pages/NotFoundPage';

// Skills data
import { skills } from './data/skills';

export default function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(() => {
    const savedProgress = localStorage.getItem('skillProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('skillProgress', JSON.stringify(currentProgress));
  }, [currentProgress]);

  // Update progress for a skill
  const updateProgress = (skillId, value) => {
    setCurrentProgress(prev => ({
      ...prev,
      [skillId]: value
    }));
  };

  // Calculate overall progress
  const overallProgress = Object.keys(currentProgress).length > 0
    ? Math.round(Object.values(currentProgress).reduce((acc, val) => acc + val, 0) / skills.length)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        progress={overallProgress}
      />
      
      <div className="flex flex-grow">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          skills={skills}
          progress={currentProgress}
        />
        
        <main className="flex-grow p-4 md:p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage skills={skills} progress={currentProgress} />} />
              <Route path="/skill/:skillId" element={<SkillPage skills={skills} updateProgress={updateProgress} />} />
              <Route path="/practice/:skillId" element={<PracticePage skills={skills} updateProgress={updateProgress} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      
      <Footer />
      <ZaptBadge />
    </div>
  );
}