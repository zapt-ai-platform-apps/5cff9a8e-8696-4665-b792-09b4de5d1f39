import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Reflection = ({ prompts, onComplete }) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [responses, setResponses] = useState(Array(prompts.length).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleResponseChange = (e) => {
    const newResponses = [...responses];
    newResponses[currentPrompt] = e.target.value;
    setResponses(newResponses);
  };
  
  const handleNext = () => {
    if (currentPrompt < prompts.length - 1) {
      setCurrentPrompt(currentPrompt + 1);
    } else {
      setIsSubmitting(true);
      
      // Calculate progress based on completion
      const filledResponses = responses.filter(r => r.trim().length > 0);
      const progress = Math.round((filledResponses.length / prompts.length) * 100);
      
      // Simulate saving responses
      setTimeout(() => {
        setIsSubmitting(false);
        onComplete(progress);
      }, 1000);
    }
  };
  
  const isResponseValid = responses[currentPrompt].trim().length >= 20;
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div 
      className="card"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Refleksi Diri
        </h3>
        <span className="text-sm text-gray-500">
          {Math.round((currentPrompt / prompts.length) * 100)}% selesai
        </span>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-md mb-6">
        <p className="font-medium">{prompts[currentPrompt].question}</p>
        {prompts[currentPrompt].hint && (
          <p className="text-sm text-indigo-700 mt-2">
            <span className="font-medium">Petunjuk:</span> {prompts[currentPrompt].hint}
          </p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="reflection" className="block text-sm font-medium text-gray-700 mb-2">
          Jawaban Anda:
        </label>
        <textarea
          id="reflection"
          rows="6"
          value={responses[currentPrompt]}
          onChange={handleResponseChange}
          className="input-field"
          placeholder="Tuliskan refleksi Anda di sini..."
        ></textarea>
        {responses[currentPrompt].trim().length > 0 && responses[currentPrompt].trim().length < 20 && (
          <p className="text-sm text-red-600 mt-1">
            Mohon berikan jawaban yang lebih lengkap (minimal 20 karakter).
          </p>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isResponseValid || isSubmitting}
          className={`px-4 py-2 rounded-md font-medium ${
            !isResponseValid || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {isSubmitting 
            ? 'Menyimpan...'
            : currentPrompt < prompts.length - 1 
              ? 'Lanjutkan' 
              : 'Selesai'
          }
        </button>
      </div>
    </motion.div>
  );
};

export default Reflection;