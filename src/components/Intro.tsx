import React from 'react';
import type { IntroCopy } from '../types/content';
import { Button } from './Button';

interface IntroProps {
  copy: IntroCopy;
  onStart: () => void;
}

export const Intro: React.FC<IntroProps> = ({ copy, onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-dark-text mb-8">
          {copy.title}
        </h1>
        
        <div className="space-y-6 text-lg text-dark-text-secondary leading-relaxed">
          {copy.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-8">
          <Button onClick={onStart}>
            {copy.cta}
          </Button>
        </div>
      </div>
    </div>
  );
};

