/* app/(frontend)/quiz/page.tsx */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import QuizProgress from "@/components/quiz/QuizProgress";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizNavigation from "@/components/quiz/QuizNavigation";
import GridLines from "@/components/graphics/GridLines";
import { ScanSearch } from "lucide-react";

interface Choice {
  id: string;
  answerText: string;
}
interface Question {
  id: string;
  question: string;
  choices: Choice[];
}
type Answers = Record<string, string>;

export default function QuizPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.docs;
        setQuestions(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

 
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })
      );

      fetch("/api/quiz/initial-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: formattedAnswers }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "quizResults",
            JSON.stringify({ ...data, answers: formattedAnswers })
          );
          router.push("/quiz/results");
        })
        .catch((err) => console.error("Error submitting answers:", err));
    }
  };

  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-light"></div>
      </div>
    );
  }

  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="h-max w-screen flex flex-col items-center pt-24 md:pt-36 pb-16">
      <GridLines cols={12} rows={7} />

      <div className="flex justify-center w-10/12 z-10 bg-white dark:bg-[#1F2937] py-12 md:py-16 border rounded-lg border-gray-300 dark:border-gray-700">
        <div className="flex flex-col gap-8 w-10/12">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl md:text-2xl text-black dark:text-white">
            <ScanSearch size={28} className="text-green-dark" />
            <span className="bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text">
              FindMyBroker<span className="font-bold">.io</span>
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-2xl md:text-3xl font-semibold dark:text-white">
            Trouvez le broker qui vous correspond
          </h1>

          {/* Barre de progression */}
          <QuizProgress
            currentStep={currentQuestionIndex + 1}
            totalSteps={questions.length}
            progress={progress}
          />

          {/* Question courante */}
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion.question}
              choices={currentQuestion.choices}
              selectedAnswer={answers[currentQuestion.id]}
              onSelectAnswer={(answerId) =>
                handleAnswer(currentQuestion.id, answerId)
              }
            />
          )}

          {/* Navigation */}
          <QuizNavigation
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoBack={currentQuestionIndex > 0}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </div>
      </div>
    </div>
  );
}
