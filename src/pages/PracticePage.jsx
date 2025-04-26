import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Quiz from '../components/practice/Quiz';
import Scenario from '../components/practice/Scenario';
import Reflection from '../components/practice/Reflection';
import PracticeComplete from '../components/practice/PracticeComplete';

const PracticePage = ({ skills, updateProgress }) => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  
  const [practiceType, setPracticeType] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  const skill = skills.find(s => s.id === skillId);
  
  useEffect(() => {
    if (!skill) {
      navigate('/');
      return;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [skillId, skill, navigate]);
  
  if (!skill) return null;
  
  const handleSelectPracticeType = (type) => {
    setPracticeType(type);
  };
  
  const handleCompleteActivity = (activityScore) => {
    setScore(activityScore);
    setIsComplete(true);
    
    // Update progress (max of current and new score)
    const currentProgress = localStorage.getItem(`progress_${skillId}`) || 0;
    updateProgress(skillId, Math.max(currentProgress, activityScore));
  };
  
  const handleRetry = () => {
    setIsComplete(false);
    setPracticeType(null);
  };
  
  const practiceData = skill.practice || {};
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const renderPracticeContent = () => {
    if (isComplete) {
      return (
        <PracticeComplete 
          score={score} 
          skillId={skillId} 
          onRetry={handleRetry} 
        />
      );
    }
    
    if (!practiceType) {
      return (
        <motion.div 
          className="card"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">Pilih Jenis Latihan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {practiceData.quiz && (
              <button 
                onClick={() => handleSelectPracticeType('quiz')}
                className="bg-white border border-indigo-200 rounded-lg p-4 text-left hover:border-indigo-400 transition-colors cursor-pointer shadow-sm"
              >
                <h3 className="font-medium text-indigo-800 mb-2">Kuis</h3>
                <p className="text-sm text-gray-600 mb-2">Uji pemahaman Anda melalui pertanyaan pilihan ganda</p>
                <div className="text-xs text-indigo-600">{practiceData.quiz.questions.length} pertanyaan</div>
              </button>
            )}
            
            {practiceData.scenario && (
              <button 
                onClick={() => handleSelectPracticeType('scenario')}
                className="bg-white border border-indigo-200 rounded-lg p-4 text-left hover:border-indigo-400 transition-colors cursor-pointer shadow-sm"
              >
                <h3 className="font-medium text-indigo-800 mb-2">Skenario</h3>
                <p className="text-sm text-gray-600 mb-2">Latih kemampuan Anda dalam situasi nyata</p>
                <div className="text-xs text-indigo-600">{practiceData.scenario.steps.length} langkah</div>
              </button>
            )}
            
            {practiceData.reflection && (
              <button 
                onClick={() => handleSelectPracticeType('reflection')}
                className="bg-white border border-indigo-200 rounded-lg p-4 text-left hover:border-indigo-400 transition-colors cursor-pointer shadow-sm"
              >
                <h3 className="font-medium text-indigo-800 mb-2">Refleksi</h3>
                <p className="text-sm text-gray-600 mb-2">Renungkan pengalaman dan rencana penerapan Anda</p>
                <div className="text-xs text-indigo-600">{practiceData.reflection.prompts.length} pertanyaan</div>
              </button>
            )}
          </div>
        </motion.div>
      );
    }
    
    switch(practiceType) {
      case 'quiz':
        return (
          <Quiz 
            questions={practiceData.quiz.questions} 
            onComplete={handleCompleteActivity}
          />
        );
      case 'scenario':
        return (
          <Scenario 
            scenario={practiceData.scenario} 
            onComplete={handleCompleteActivity}
          />
        );
      case 'reflection':
        return (
          <Reflection 
            prompts={practiceData.reflection.prompts} 
            onComplete={handleCompleteActivity}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mb-6">
        <Link 
          to={`/skill/${skillId}`} 
          className="text-indigo-600 hover:text-indigo-800 flex items-center mb-2"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">Kembali ke Materi</span>
        </Link>
        
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">
          Latihan: {skill.title}
        </h1>
      </div>
      
      {renderPracticeContent()}
    </motion.div>
  );
};

export default PracticePage;