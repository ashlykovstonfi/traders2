import React from 'react';
import type { ResultQuadrant, CopyBundle, ScoringConfig } from '../types/content';
import { ChartQuadrant } from './ChartQuadrant';
import { Button } from './Button';
import { shareViaWebShare } from '../lib/share';

interface ResultProps {
  quadrant: ResultQuadrant;
  RT: number;
  IS: number;
  copy: CopyBundle;
  config: ScoringConfig;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({
  quadrant,
  RT,
  IS,
  copy,
  config,
  onReset,
}) => {
  const handleShare = async () => {
    const url = window.location.href;
    const text = `I'm a ${quadrant.name}! Find out your trading style:`;
    const shared = await shareViaWebShare(copy.share.title, text, url);
    
    if (!shared) {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${text} ${url}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
        {/* Universal intro */}
        <div className="text-center space-y-6">
          {copy.universalResultIntro.map((paragraph, index) => {
            if (index === 0) {
              return (
                <h1 key={index} className="text-4xl font-bold text-dark-text mb-4">
                  {paragraph}
                </h1>
              );
            }
            return (
              <p key={index} className="text-lg text-dark-text-secondary leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Chart */}
        <div className="flex justify-center">
          <ChartQuadrant RT={RT} IS={IS} axes={copy.axes} config={config} />
        </div>

        {/* Quadrant details */}
        <div className="bg-dark-bg-secondary rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-dark-text mb-2">{quadrant.name}</h2>
            <img
              src={quadrant.image}
              alt={quadrant.name}
              className="w-32 h-32 mx-auto rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <p className="text-lg text-dark-text-secondary leading-relaxed">
            {quadrant.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-dark-text mb-3">Strengths</h3>
              <ul className="space-y-2">
                {quadrant.strengths.map((strength, index) => (
                  <li key={index} className="text-dark-text-secondary flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-dark-text mb-3">Cautions</h3>
              <ul className="space-y-2">
                {quadrant.cautions.map((caution, index) => (
                  <li key={index} className="text-dark-text-secondary flex items-start">
                    <span className="text-yellow-400 mr-2">!</span>
                    {caution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-dark-bg rounded-xl p-6 border border-dark-border">
            <p className="text-dark-text">
              <span className="font-semibold">Tip:</span> {quadrant.tip}
            </p>
          </div>
        </div>

        {/* Share section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-dark-text text-center">
            {copy.share.title}
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleShare} variant="secondary">
              {copy.share.btnShare}
            </Button>
            <Button onClick={onReset} variant="secondary">
              Take Quiz Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

