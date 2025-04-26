import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Scenario = ({ scenario, onComplete }) => {
  const [step, setStep] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackShown, setFeedbackShown] = useState(false);
  
  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  
  const handleSubmitResponse = () => {
    if (selectedOption === null) return;
    
    const currentScenarioStep = scenario.steps[step];
    const selectedOptionData = currentScenarioStep.options[selectedOption];
    
    // Record user's response
    setUserResponses([...userResponses, {
      step,
      optionIndex: selectedOption,
      quality: selectedOptionData.quality
    }]);
    
    setFeedbackShown(true);
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setFeedbackShown(false);
    
    if (step < scenario.steps.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate score based on quality of responses
      const score = userResponses.reduce((total, response) => {
        if (response.quality === 'high') return total + 100;
        if (response.quality === 'medium') return total + 50;
        return total;
      }, 0) / scenario.steps.length;
      
      onComplete(Math.round(score));
    }
  };
  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const currentScenarioStep = scenario.steps[step];
  const selectedOptionData = selectedOption !== null 
    ? currentScenarioStep.options[selectedOption] 
    : null;
  
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
          Skenario: {scenario.title}
        </h3>
        <span className="text-sm text-gray-500">
          {Math.round((step / scenario.steps.length) * 100)}% selesai
        </span>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-md mb-6">
        <div className="flex items-start mb-2">
          <div className="bg-indigo-200 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0 mt-1">
            <span className="font-medium">{step + 1}</span>
          </div>
          <div>
            <p className="font-medium text-indigo-900">{currentScenarioStep.situation}</p>
          </div>
        </div>
        {currentScenarioStep.context && (
          <p className="text-sm text-indigo-700 mt-2">{currentScenarioStep.context}</p>
        )}
      </div>
      
      {!feedbackShown ? (
        <>
          <h4 className="text-md font-medium mb-3">Bagaimana sebaiknya Anda merespon?</h4>
          <div className="space-y-3 mb-6">
            {currentScenarioStep.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                className={`w-full text-left p-3 rounded-md border transition-colors cursor-pointer 
                  ${selectedOption === index 
                    ? 'bg-indigo-100 border-indigo-400' 
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {option.text}
              </button>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmitResponse}
              disabled={selectedOption === null}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedOption === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              Pilih Respon
            </button>
          </div>
        </>
      ) : (
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Respon Anda:</h4>
          <div className={`p-4 rounded-md mb-4 border ${
            selectedOptionData.quality === 'high' 
              ? 'bg-green-50 border-green-300' 
              : selectedOptionData.quality === 'medium'
                ? 'bg-yellow-50 border-yellow-300'
                : 'bg-red-50 border-red-300'
          }`}>
            <p>{selectedOptionData.text}</p>
          </div>
          
          <h4 className="text-md font-medium mb-2">Umpan Balik:</h4>
          <div className="p-4 bg-indigo-50 rounded-md">
            <p className="font-medium text-indigo-900 mb-1">
              {selectedOptionData.quality === 'high' 
                ? 'Pilihan Sangat Baik!' 
                : selectedOptionData.quality === 'medium'
                  ? 'Pilihan Cukup Baik'
                  : 'Perlu Ditingkatkan'
              }
            </p>
            <p>{selectedOptionData.feedback}</p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              {step < scenario.steps.length - 1 ? 'Lanjutkan' : 'Selesai'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Scenario;