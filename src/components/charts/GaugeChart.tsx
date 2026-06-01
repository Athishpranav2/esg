'use client';

import React from 'react';
import { getScoreColor } from '@/lib/types';

interface GaugeChartProps {
  score: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export default function GaugeChart({ score, label, size = 140, strokeWidth = 10 }: GaugeChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;
  const color = getScoreColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(30, 41, 59, 0.5)"
            strokeWidth={strokeWidth}
          />
          {/* Score ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-ring"
            style={{
              '--circumference': circumference,
              '--target-offset': offset,
              filter: `drop-shadow(0 0 6px ${color}40)`,
            } as React.CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>
            {score.toFixed(1)}
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
            / 100
          </span>
        </div>
      </div>
      <span className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</span>
    </div>
  );
}
