export type AxisLabels = {
  yTop: string;   // "High Risk Tolerance"
  yBottom: string;// "Low Risk Tolerance"
  xLeft: string;  // "Intuition"
  xRight: string; // "Strategy"
};

export type IntroCopy = {
  title: string;
  paragraphs: string[];
  cta: string;
};

export type QuestionOption = {
  id: string;
  label: string;
  delta: { RT?: number; IS?: number }; // e.g., { RT: +2, IS: -1 }
};

export type Question = {
  id: string;
  heading: string;       // static heading above all questions
  image: string;         // path to illustration
  prompt: string;        // the situation text
  options: QuestionOption[];
};

export type ResultQuadrant = {
  id: "HR_INT" | "HR_STR" | "LR_STR" | "LR_INT";
  name: string;
  description: string;
  strengths: string[];
  cautions: string[];
  tip: string;
  image: string; // illustration for this style
};

export type CopyBundle = {
  intro: IntroCopy;
  axes: AxisLabels;
  universalResultIntro: string[]; // multiple paragraphs
  share: { title: string; btnShare: string; btnDownload: string };
  designNotes?: string[];
};

export type ScoringConfig = {
  initial: { RT: number; IS: number };
  chart: { min: number; max: number; gridStep: number; pointRadius: number };
};

export type QuizState = {
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  scores: { RT: number; IS: number };
};

