import React from 'react';
import type { AxisLabels, ScoringConfig } from '../types/content';
import { normalizeToChart } from '../lib/scoring';

interface ChartQuadrantProps {
  RT: number;
  IS: number;
  axes: AxisLabels;
  config: ScoringConfig;
}

export const ChartQuadrant: React.FC<ChartQuadrantProps> = ({ RT, IS, axes, config }) => {
  const size = 400;
  const padding = 60;
  const chartSize = size - padding * 2;
  const center = size / 2;

  const x = padding + normalizeToChart(IS, config.chart.min, config.chart.max, chartSize);
  const y = padding + normalizeToChart(config.chart.max - RT, config.chart.min, config.chart.max, chartSize);


  const gridLines = [];
  for (let i = config.chart.min; i <= config.chart.max; i += config.chart.gridStep) {
    const pos = padding + normalizeToChart(i, config.chart.min, config.chart.max, chartSize);
    gridLines.push(
      <line
        key={`v-${i}`}
        x1={pos}
        y1={padding}
        x2={pos}
        y2={size - padding}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="1"
      />
    );
    gridLines.push(
      <line
        key={`h-${i}`}
        x1={padding}
        y1={pos}
        x2={size - padding}
        y2={pos}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="1"
      />
    );
  }

  const labelPadding = 20;

  return (
    <div className="flex flex-col items-center space-y-6">
      <svg width={size + labelPadding * 2} height={size + labelPadding * 2} className="w-full max-w-md">
        {/* Group for all chart elements */}
        <g transform={`translate(${labelPadding}, ${labelPadding})`}>
          {/* Grid lines */}
          {gridLines}

          {/* Quadrant backgrounds */}
          <rect
            x={padding}
            y={padding}
            width={chartSize / 2}
            height={chartSize / 2}
            fill="rgba(59, 130, 246, 0.05)"
          />
          <rect
            x={center}
            y={padding}
            width={chartSize / 2}
            height={chartSize / 2}
            fill="rgba(16, 185, 129, 0.05)"
          />
          <rect
            x={center}
            y={center}
            width={chartSize / 2}
            height={chartSize / 2}
            fill="rgba(168, 85, 247, 0.05)"
          />
          <rect
            x={padding}
            y={center}
            width={chartSize / 2}
            height={chartSize / 2}
            fill="rgba(236, 72, 153, 0.05)"
          />

          {/* Axes */}
          <line
            x1={padding}
            y1={center}
            x2={size - padding}
            y2={center}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          <line
            x1={center}
            y1={padding}
            x2={center}
            y2={size - padding}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />

          {/* Center point circle */}
          <circle
            cx={center}
            cy={center}
            r={4}
            fill="rgba(255, 255, 255, 0.3)"
          />

          {/* User point */}
          <circle
            cx={x}
            cy={y}
            r={config.chart.pointRadius}
            fill="white"
          >
            <animate
              attributeName="opacity"
              values="1;0.7;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={x}
            cy={y}
            r={config.chart.pointRadius + 4}
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity="0"
          >
            <animate
              attributeName="r"
              values={`${config.chart.pointRadius + 4};${config.chart.pointRadius + 20}`}
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Axis labels positioned around the chart */}
        {/* Top label (High Risk Tolerance) */}
        <text
          x={size / 2 + labelPadding}
          y={labelPadding / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#9ca3af"
        >
          {axes.yTop}
        </text>

        {/* Bottom label (Low Risk Tolerance) */}
        <text
          x={size / 2 + labelPadding}
          y={size + labelPadding * 1.5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#9ca3af"
        >
          {axes.yBottom}
        </text>

        {/* Left label (Intuition) */}
        <text
          x={labelPadding / 2}
          y={size / 2 + labelPadding}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#9ca3af"
        >
          {axes.xLeft}
        </text>

        {/* Right label (Strategy) */}
        <text
          x={size + labelPadding * 1.5}
          y={size / 2 + labelPadding}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#9ca3af"
        >
          {axes.xRight}
        </text>
      </svg>
    </div>
  );
};

