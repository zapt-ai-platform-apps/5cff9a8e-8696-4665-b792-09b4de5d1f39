import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, ArrowPathIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const PracticeComplete = ({ score, skillId, onRetry }) => {
  let message = '';
  let color = '';
  
  if (score >= 80) {
    message = 'Luar Biasa! Anda telah menguasai keterampilan ini dengan baik.';
    color = 'text-green-600';
  } else if (score >= 50) {
    message = 'Bagus! Anda sudah memahami dasar-dasar keterampilan ini.';
    color = 'text-yellow-600';
  } else {
    message = 'Terus berlatih! Anda masih perlu meningkatkan keterampilan ini.';
    color = 'text-red-600';
  }

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="card text-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex justify-center mb-4">
        <CheckCircleIcon className="h-16 w-16 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Latihan Selesai!</h2>
      
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 mb-4">
          <span className="text-3xl font-bold text-indigo-700">{score}%</span>
        </div>
        <p className={`text-lg font-medium ${color}`}>{message}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-2">
        <button 
          onClick={onRetry}
          className="btn-secondary flex items-center justify-center"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Coba Lagi
        </button>
        
        <Link 
          to={`/skill/${skillId}`}
          className="btn-primary flex items-center justify-center"
        >
          <BookOpenIcon className="h-5 w-5 mr-2" />
          Kembali ke Materi
        </Link>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Terus berlatih untuk meningkatkan keterampilan Anda dalam berhubungan dengan orang lain.
      </p>
    </motion.div>
  );
};

export default PracticeComplete;