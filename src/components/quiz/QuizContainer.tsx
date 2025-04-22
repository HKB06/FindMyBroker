import React, { ReactNode } from 'react';

interface QuizContainerProps {
  children: ReactNode;
}

export default function QuizContainer({ children }: QuizContainerProps) {
  return (
    <div className="flex justify-center h-max w-10/12 items-center z-10 bg-white dark:bg-[#1F2937] py-12 md:py-16 border rounded-lg border-gray-300 dark:border-gray-700">
      <div className="flex flex-col gap-8 w-10/12 h-full">
        {children}
      </div>
    </div>
  );
}