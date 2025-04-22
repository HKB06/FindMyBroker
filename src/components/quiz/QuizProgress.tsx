import React from 'react';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export default function QuizProgress({ currentStep, totalSteps, progress }: QuizProgressProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentStep} sur {totalSteps}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-dark to-green-light h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}