import React from 'react';
import type { Question as QuestionType } from '../types/content';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuestionProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onNext: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
}) => {
  const heading = question.heading.replace('{X}', (currentIndex + 1).toString());

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8 animate-fade-in">
        <ProgressBar current={currentIndex} total={totalQuestions} />
        
        <div className="space-y-6">
          <h2 className="text-xl text-dark-text-secondary text-center">
            {heading}
          </h2>

          <div className="flex justify-center">
            <img
              src={question.image}
              alt="Question illustration"
              className="w-full max-w-md h-auto rounded-lg"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold text-dark-text text-center">
            {question.prompt}
          </h3>

          <div className="space-y-4 mt-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelectAnswer(question.id, option.id)}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg ${
                  selectedAnswer === option.id
                    ? 'bg-white text-dark-bg border-white'
                    : 'bg-dark-bg-secondary text-dark-text border-dark-border hover:border-white/30'
                }`}
              >
                <span className="text-lg font-medium">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <Button onClick={onNext} disabled={!selectedAnswer}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

