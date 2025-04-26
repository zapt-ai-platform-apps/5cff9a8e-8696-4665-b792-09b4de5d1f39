import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkillHeader from '../components/skill/SkillHeader';
import SkillContent from '../components/skill/SkillContent';

const SkillPage = ({ skills, updateProgress }) => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  
  const skill = skills.find(s => s.id === skillId);
  
  useEffect(() => {
    if (!skill) {
      navigate('/');
      return;
    }
    
    // Mark as started (20% progress) if not already started
    updateProgress(skillId, Math.max(20, localStorage.getItem(`progress_${skillId}`) || 0));
    
    // Track page view
    console.log(`Viewing skill: ${skill?.title}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [skillId, skill, navigate, updateProgress]);
  
  if (!skill) return null;
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SkillHeader 
        skill={skill} 
        progress={localStorage.getItem(`progress_${skillId}`) || 0}
      />
      
      <SkillContent skill={skill} />
    </motion.div>
  );
};

export default SkillPage;