import React from "react";

interface Choice {
  id: string;          
  answerText: string;  
}

interface QuestionCardProps {
  question: string;
  choices: Choice[];
  selectedAnswer?: string;                 
  onSelectAnswer: (answerText: string) => void;
}

export default function QuestionCard({
  question,
  choices,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="w-full mb-8">
      <h2 className="text-xl font-medium mb-6 dark:text-white">{question}</h2>

      <div className="space-y-3">
        {choices.map(({ id, answerText }) => {
          const selected = selectedAnswer === answerText;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectAnswer(answerText)}
              className={`w-full text-left border rounded-lg p-4 cursor-pointer transition-all focus-visible:outline-green-light
                ${
                  selected
                    ? "border-green-light bg-green-50 dark:bg-green-900/20 shadow-md"
                    : "border-gray-200 dark:border-gray-700 hover:border-green-light/50"
                }`}
            >
              <span
                className={`w-5 h-5 mr-3 inline-flex items-center justify-center rounded-full border
                  ${
                    selected
                      ? "border-green-light"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
              >
                {selected && (
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-green-dark to-green-light" />
                )}
              </span>

              <span className="dark:text-white">{answerText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
