'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

interface TrendLineChartProps {
  data: Record<string, string | number>[];
  lines: { dataKey: string; name: string; color: string; strokeDasharray?: string }[];
  height?: number;
  xAxisKey?: string;
}

export default function TrendLineChart({
  data,
  lines,
  height = 300,
  xAxisKey = 'year',
}: TrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 41, 59, 0.4)" />
        <XAxis
          dataKey={xAxisKey}
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={{ stroke: '#1e293b' }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={{ stroke: '#1e293b' }}
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
          itemStyle={{ color: '#94a3b8' }}
        />
        <Legend
          wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
        />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            strokeWidth={2}
            strokeDasharray={line.strokeDasharray}
            dot={{ fill: line.color, r: 4, strokeWidth: 2, stroke: '#161622' }}
            activeDot={{ r: 6, strokeWidth: 2, stroke: '#161622' }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
