import { useState, useEffect } from 'react';
import type { QuizState, Question, ScoringConfig } from '../types/content';
import { loadState, saveState, clearState } from '../lib/storage';
import { calculateScore, determineQuadrant } from '../lib/scoring';

type QuizPhase = 'intro' | 'question' | 'result';

export const useQuiz = (
  questions: Question[],
  config: ScoringConfig
) => {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [state, setState] = useState<QuizState>(() => {
    const saved = loadState();
    return saved || {
      currentQuestionIndex: 0,
      answers: {},
      scores: config.initial,
    };
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const selectAnswer = (questionId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: optionId,
      },
    }));
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    } else {
      // Calculate final scores
      const finalScores = calculateScore(state.answers, questions, config.initial);
      setState((prev) => ({
        ...prev,
        scores: finalScores,
      }));
      setPhase('result');
    }
  };

  const startQuiz = () => {
    setPhase('question');
  };

  const resetQuiz = () => {
    clearState();
    setState({
      currentQuestionIndex: 0,
      answers: {},
      scores: config.initial,
    });
    setPhase('intro');
  };

  const currentQuestion = questions[state.currentQuestionIndex];
  const currentAnswer = currentQuestion ? state.answers[currentQuestion.id] : null;
  const canProceed = !!currentAnswer;
  const quadrant = determineQuadrant(state.scores.RT, state.scores.IS);

  return {
    phase,
    state,
    currentQuestion,
    currentAnswer,
    canProceed,
    quadrant,
    selectAnswer,
    nextQuestion,
    startQuiz,
    resetQuiz,
  };
};

