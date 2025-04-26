import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import SkillCard from '../components/home/SkillCard';
import ProgressSummary from '../components/home/ProgressSummary';

const HomePage = ({ skills, progress }) => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const skillCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  // Group skills by category
  const categorizedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      
      <ProgressSummary 
        skills={skills}
        progress={progress}
      />
      
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Keterampilan</h2>
      
      {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">{category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorySkills.map(skill => (
              <motion.div 
                key={skill.id}
                variants={skillCardVariants}
              >
                <SkillCard 
                  skill={skill} 
                  progress={progress[skill.id] || 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default HomePage;