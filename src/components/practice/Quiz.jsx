import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    
    const currentQuestionData = questions[currentQuestion];
    const correct = optionIndex === currentQuestionData.correctIndex;
    
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers, { 
      questionIndex: currentQuestion, 
      selectedOption, 
      correct: isCorrect 
    }];
    
    setAnswers(newAnswers);
    setShowFeedback(false);
    setSelectedOption(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter(answer => answer.correct).length;
      const score = Math.round((correctAnswers / questions.length) * 100);
      
      // Complete quiz
      onComplete(score);
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const currentQuestionData = questions[currentQuestion];

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
          Pertanyaan {currentQuestion + 1} dari {questions.length}
        </h3>
        <span className="text-sm text-gray-500">
          {Math.round(((currentQuestion) / questions.length) * 100)}% selesai
        </span>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-md mb-6">
        <p className="font-medium text-lg">{currentQuestionData.question}</p>
      </div>
      
      <div className="space-y-3 mb-6">
        {currentQuestionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && handleAnswer(index)}
            disabled={showFeedback}
            className={`w-full text-left p-3 rounded-md border transition-colors cursor-pointer
              ${selectedOption === index 
                ? (showFeedback 
                  ? (isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400') 
                  : 'bg-indigo-100 border-indigo-400') 
                : 'border-gray-300 hover:bg-gray-50'
              }
              ${showFeedback && index === currentQuestionData.correctIndex && 'bg-green-100 border-green-400'}
            `}
          >
            <div className="flex items-center">
              <div className="flex-1">{option}</div>
              {showFeedback && selectedOption === index && (
                isCorrect 
                  ? <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  : <XCircleIcon className="h-5 w-5 text-red-600" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`p-4 rounded-md mb-6 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <p className="font-medium">
            {isCorrect ? 'Benar!' : 'Kurang tepat!'}
          </p>
          <p>{currentQuestionData.feedback[isCorrect ? 'correct' : 'incorrect']}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        {showFeedback && (
          <button
            onClick={handleNextQuestion}
            className="btn-primary"
          >
            {currentQuestion < questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Selesai'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Quiz;