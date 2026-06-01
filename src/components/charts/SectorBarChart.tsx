'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { getScoreColor } from '@/lib/types';

interface SectorBarChartProps {
  data: { name: string; score: number; slug?: string }[];
  height?: number;
  layout?: 'horizontal' | 'vertical';
  barColor?: string;
  showLabels?: boolean;
}

export default function SectorBarChart({
  data,
  height = 400,
  layout = 'vertical',
  barColor,
  showLabels = true,
}: SectorBarChartProps) {
  if (layout === 'vertical') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 40, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 41, 59, 0.4)" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
          <YAxis
            dataKey="name"
            type="category"
            width={180}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#161622',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
            cursor={{ fill: 'rgba(30, 41, 59, 0.3)' }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} maxBarSize={24}>
            {data.map((entry, index) => (
              <Cell key={index} fill={barColor || getScoreColor(entry.score)} />
            ))}
            {showLabels && (
              <LabelList dataKey="score" position="right" style={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} formatter={(v: any) => typeof v === 'number' ? v.toFixed(1) : v} />
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 41, 59, 0.4)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          axisLine={{ stroke: '#1e293b' }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
        <Tooltip
          contentStyle={{
            background: '#161622',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            fontSize: '12px',
          }}
          labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
          cursor={{ fill: 'rgba(30, 41, 59, 0.3)' }}
        />
        <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={32}>
          {data.map((entry, index) => (
            <Cell key={index} fill={barColor || getScoreColor(entry.score)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
