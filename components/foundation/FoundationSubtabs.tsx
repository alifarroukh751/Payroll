'use client';

import React from 'react';

export type SubtabType = 'currencies' | 'banks' | 'providers';

export interface FoundationSubtabsProps {
  activeSubtab: SubtabType;
  onSubtabChange: (tab: SubtabType) => void;
}

const subtabs: {
  id: SubtabType;
  label: string;
}[] = [
  { id: 'currencies', label: 'Currencies' },
  { id: 'banks', label: 'Banks' },
  { id: 'providers', label: 'Payment Providers' },
];

export default function FoundationSubtabs({
  activeSubtab,
  onSubtabChange,
}: FoundationSubtabsProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Select Module
      </label>
      <select
        value={activeSubtab}
        onChange={(e) => onSubtabChange(e.target.value as SubtabType)}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        {subtabs.map((tab) => (
          <option key={tab.id} value={tab.id}>
            {tab.label}
          </option>
        ))}
      </select>
    </div>
  );
}
