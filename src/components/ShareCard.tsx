import React from 'react';
import type { ResultQuadrant, AxisLabels, ScoringConfig } from '../types/content';
import { ChartQuadrant } from './ChartQuadrant';

interface ShareCardProps {
  quadrant: ResultQuadrant;
  RT: number;
  IS: number;
  axes: AxisLabels;
  config: ScoringConfig;
}

export const ShareCard: React.FC<ShareCardProps> = ({ quadrant, RT, IS, axes, config }) => {
  return (
    <div
      id="share-card"
      className="bg-dark-bg p-8 rounded-2xl max-w-2xl mx-auto"
      style={{ aspectRatio: '1.91 / 1' }}
    >
      <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
        <h3 className="text-3xl font-bold text-dark-text">Trading Style Quiz</h3>
        
        <div className="w-64">
          <ChartQuadrant RT={RT} IS={IS} axes={axes} config={config} />
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white mb-2">{quadrant.name}</h4>
          <p className="text-dark-text-secondary">{quadrant.description.substring(0, 120)}...</p>
        </div>

        <div className="text-sm text-dark-text-secondary">
          Take the quiz at your-domain.com
        </div>
      </div>
    </div>
  );
};

