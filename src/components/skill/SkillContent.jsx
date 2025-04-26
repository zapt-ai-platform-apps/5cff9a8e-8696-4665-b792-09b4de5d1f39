import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SkillContent = ({ skill }) => {
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="card"
      variants={contentVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h2 
        className="text-xl font-semibold text-indigo-800 mb-4"
        variants={itemVariants}
      >
        {skill.title}
      </motion.h2>
      
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium text-indigo-700 mb-2">Mengapa Penting:</h3>
        <p className="mb-4">{skill.whyImportant}</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium text-indigo-700 mb-2">Prinsip Utama:</h3>
        <ul className="list-disc pl-5 mb-4">
          {skill.principles.map((principle, index) => (
            <li key={index} className="mb-2">{principle}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium text-indigo-700 mb-2">Cara Menerapkan:</h3>
        <p className="mb-2">{skill.howToApply}</p>
        
        <ul className="list-disc pl-5 mb-4">
          {skill.applicationSteps.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium text-indigo-700 mb-2">Contoh Situasi:</h3>
        <div className="bg-indigo-50 p-4 rounded-md mb-4">
          <p className="font-medium mb-2">Situasi:</p>
          <p>{skill.examples.situation}</p>
          
          <p className="font-medium mt-3 mb-2">Tanpa Keterampilan:</p>
          <p className="text-red-700">{skill.examples.withoutSkill}</p>
          
          <p className="font-medium mt-3 mb-2">Dengan Keterampilan:</p>
          <p className="text-green-700">{skill.examples.withSkill}</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <Link 
          to={`/practice/${skill.id}`}
          className="btn-primary inline-block"
        >
          Latih Keterampilan Ini
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default SkillContent;