import { useState, useEffect } from 'react';
import type { CopyBundle, Question, ResultQuadrant, ScoringConfig } from './types/content';
import { useQuiz } from './hooks/useQuiz';
import { Intro } from './components/Intro';
import { Question as QuestionComponent } from './components/Question';
import { Result } from './components/Result';

function App() {
  const [loading, setLoading] = useState(true);
  const [copy, setCopy] = useState<CopyBundle | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<ResultQuadrant[]>([]);
  const [config, setConfig] = useState<ScoringConfig | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [copyData, questionsData, resultsData, scoringData] = await Promise.all([
          fetch('/content/copy.en.json').then((r) => r.json()),
          fetch('/content/questions.en.json').then((r) => r.json()),
          fetch('/content/results.en.json').then((r) => r.json()),
          fetch('/content/scoring.json').then((r) => r.json()),
        ]);

        setCopy(copyData);
        setQuestions(questionsData);
        setResults(resultsData);
        setConfig(scoringData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const {
    phase,
    state,
    currentQuestion,
    currentAnswer,
    quadrant,
    selectAnswer,
    nextQuestion,
    startQuiz,
    resetQuiz,
  } = useQuiz(questions, config || { initial: { RT: 0, IS: 0 }, chart: { min: -6, max: 6, gridStep: 2, pointRadius: 6 } });

  if (loading || !copy || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-dark-text-secondary">Loading...</div>
      </div>
    );
  }

  const currentResult = results.find((r) => r.id === quadrant);

  return (
    <div className="min-h-screen bg-dark-bg">
      {phase === 'intro' && <Intro copy={copy.intro} onStart={startQuiz} />}
      
      {phase === 'question' && currentQuestion && (
        <QuestionComponent
          question={currentQuestion}
          currentIndex={currentQuestion ? questions.indexOf(currentQuestion) : 0}
          totalQuestions={questions.length}
          selectedAnswer={currentAnswer}
          onSelectAnswer={selectAnswer}
          onNext={nextQuestion}
        />
      )}
      
      {phase === 'result' && currentResult && (
        <Result
          quadrant={currentResult}
          RT={state.scores.RT}
          IS={state.scores.IS}
          copy={copy}
          config={config}
          onReset={resetQuiz}
        />
      )}
    </div>
  );
}

export default App;
