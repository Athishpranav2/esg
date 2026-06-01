'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  delta?: number;
  deltaLabel?: string;
  icon: LucideIcon;
  accentColor?: string;
  format?: 'number' | 'decimal' | 'percent' | 'raw';
  delay?: number;
}

export default function KPICard({
  title,
  value,
  suffix = '',
  prefix = '',
  delta,
  deltaLabel,
  icon: Icon,
  accentColor = '#00d4aa',
  format = 'number',
  delay = 0,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible || typeof value !== 'number') return;
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, value]);

  const formatValue = (v: number) => {
    switch (format) {
      case 'decimal': return v.toFixed(1);
      case 'percent': return v.toFixed(1) + '%';
      case 'number': return Math.round(v).toLocaleString();
      default: return String(v);
    }
  };

  const getDeltaIcon = () => {
    if (!delta) return <Minus className="w-3 h-3" />;
    return delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const getDeltaColor = () => {
    if (!delta) return 'text-[var(--color-text-muted)]';
    return delta > 0 ? 'text-[#00d4aa]' : 'text-[#ff4757]';
  };

  return (
    <div
      className={`glass-card p-5 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        borderTop: `2px solid ${accentColor}30`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}15` }}>
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        {delta !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${getDeltaColor()}`}>
            {getDeltaIcon()}
            <span>{delta > 0 ? '+' : ''}{delta.toFixed(1)}%</span>
          </div>
        )}
      </div>
      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{title}</p>
      <p className="text-2xl font-bold text-[var(--color-text-primary)]">
        {prefix}{typeof value === 'number' ? formatValue(displayValue) : value}{suffix}
      </p>
      {deltaLabel && (
        <p className="text-xs text-[var(--color-text-muted)] mt-1">{deltaLabel}</p>
      )}
    </div>
  );
}
