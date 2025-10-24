import type { QuestionOption } from '../types/content';

export const calculateScore = (
  answers: Record<string, string>,
  questions: Array<{ id: string; options: QuestionOption[] }>,
  initialScores: { RT: number; IS: number }
): { RT: number; IS: number } => {
  let RT = initialScores.RT;
  let IS = initialScores.IS;

  questions.forEach((question) => {
    const selectedOptionId = answers[question.id];
    if (selectedOptionId) {
      const option = question.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        RT += option.delta.RT || 0;
        IS += option.delta.IS || 0;
      }
    }
  });

  return { RT, IS };
};

export const determineQuadrant = (RT: number, IS: number): "HR_INT" | "HR_STR" | "LR_STR" | "LR_INT" => {
  if (RT > 0 && IS <= 0) return "HR_INT";
  if (RT > 0 && IS > 0) return "HR_STR";
  if (RT <= 0 && IS > 0) return "LR_STR";
  return "LR_INT";
};

export const normalizeToChart = (
  value: number,
  min: number,
  max: number,
  chartSize: number
): number => {
  const range = max - min;
  const normalized = ((value - min) / range) * chartSize;
  return Math.max(0, Math.min(chartSize, normalized));
};

