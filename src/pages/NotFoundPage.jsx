import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto text-center py-12"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-6xl font-bold text-indigo-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      
      <Link 
        to="/"
        className="btn-primary inline-flex items-center"
      >
        <HomeIcon className="h-5 w-5 mr-2" />
        Kembali ke Beranda
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;