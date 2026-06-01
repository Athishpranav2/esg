'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { InsightItem } from '@/lib/types';

interface InsightCardProps {
  insight: InsightItem;
}

const severityConfig = {
  critical: { icon: AlertCircle, color: '#ff4757', bg: 'rgba(255, 71, 87, 0.1)', border: 'rgba(255, 71, 87, 0.2)', label: 'Critical' },
  warning: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', label: 'Warning' },
  notable: { icon: Info, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', label: 'Notable' },
  positive: { icon: CheckCircle, color: '#00d4aa', bg: 'rgba(0, 212, 170, 0.1)', border: 'rgba(0, 212, 170, 0.2)', label: 'Positive' },
};

const pillarColors = {
  environmental: '#22c55e',
  social: '#3b82f6',
  governance: '#a855f7',
  overall: '#f59e0b',
};

export default function InsightCard({ insight }: InsightCardProps) {
  const config = severityConfig[insight.severity];
  const Icon = config.icon;

  return (
    <div className="glass-card p-4 hover:border-[var(--color-border-hover)] transition-all group">
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: config.bg, border: `1px solid ${config.border}` }}
        >
          <Icon className="w-4 h-4" style={{ color: config.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded"
              style={{ color: config.color, backgroundColor: config.bg }}
            >
              {config.label}
            </span>
            <span
              className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded"
              style={{ color: pillarColors[insight.pillar], backgroundColor: `${pillarColors[insight.pillar]}15` }}
            >
              {insight.pillar}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 leading-snug">
            {insight.title}
          </h4>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
            {insight.description}
          </p>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-2">
            Source: {insight.source}
          </p>
        </div>
      </div>
    </div>
  );
}
