import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-xl p-6 md:p-8 mb-8 shadow-md"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-3 text-white"
        variants={itemVariants}
      >
        Skill With People
      </motion.h1>
      
      <motion.p 
        className="text-indigo-100 mb-6 max-w-2xl text-lg"
        variants={itemVariants}
      >
        Keterampilan berhubungan dengan orang lain adalah kunci kesuksesan dalam pekerjaan, bisnis, dan kehidupan sosial. Pelajari dan latih keterampilan interpersonal yang akan mengubah cara Anda berinteraksi dengan orang lain.
      </motion.p>
      
      <motion.div 
        className="bg-white/10 p-4 rounded-lg mb-6 backdrop-blur-sm"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-2">Mengapa Penting?</h2>
        <p className="text-indigo-100">
          66% hingga 90% kegagalan dalam pekerjaan atau bisnis disebabkan oleh masalah dalam hubungan antarmanusia. Memperbaiki keterampilan ini akan membuka banyak peluang dan meningkatkan kualitas relasi Anda.
        </p>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap gap-3"
        variants={itemVariants}
      >
        <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          Komunikasi Efektif
        </div>
        <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          Empati
        </div>
        <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          Negosiasi
        </div>
        <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          Mempengaruhi
        </div>
        <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
          Mendengarkan Aktif
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;