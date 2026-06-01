'use client';

import React from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend
} from 'recharts';

interface ESGRadarChartProps {
  data: { parameter: string; score: number; benchmark: number }[];
  sectorName?: string;
  height?: number;
}

export default function ESGRadarChart({ data, sectorName = 'Sector', height = 350 }: ESGRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="rgba(30, 41, 59, 0.6)" />
        <PolarAngleAxis
          dataKey="parameter"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
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
          wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
        />
        <Radar
          name={sectorName}
          dataKey="score"
          stroke="#00d4aa"
          fill="#00d4aa"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Radar
          name="National Average"
          dataKey="benchmark"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.1}
          strokeWidth={2}
          strokeDasharray="4 4"
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
