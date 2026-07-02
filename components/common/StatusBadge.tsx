import React from 'react';

export interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'coming-soon';
  label?: string;
  className?: string;
}

export default function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const statusStyles = {
    active: 'bg-green-50 text-green-700 border border-green-200',
    inactive: 'bg-slate-100 text-slate-600 border border-slate-200',
    'coming-soon': 'bg-amber-50 text-amber-700 border border-amber-200',
  };

  const displayLabel = label || {
    active: 'Active',
    inactive: 'Inactive',
    'coming-soon': 'Coming Soon',
  }[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      {displayLabel}
    </span>
  );
}
