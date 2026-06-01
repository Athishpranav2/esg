import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function InfoCard({ title, description, icon }: InfoCardProps) {
  return (
    <div className="p-5 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] hover:border-[#00d4aa]/40 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">{title}</h4>
      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
