'use client';

import React from 'react';

export type TabType = 'currencies' | 'banks' | 'providers' | 'countries';

export interface FoundationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: string }[] = [
  { id: 'currencies', label: 'Currencies', icon: '💱' },
  { id: 'banks', label: 'Banks', icon: '🏦' },
  { id: 'providers', label: 'Payment Providers', icon: '💳' },
  { id: 'countries', label: 'Treaty Countries', icon: '🌍' },
];

const iconPaths: Record<TabType, string> = {
  currencies: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  banks: 'M12 21v-2m0-4v-2m0-4V5m9 16h-9m-9 0H3m9 0v-2m0-4v-2m0-4V5M3 21h18a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z',
  providers: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  countries: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
};

export default function FoundationTabs({ activeTab, onTabChange }: FoundationTabsProps) {
  return (
    <div className="border-b border-slate-200 bg-white rounded-t-lg">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 sm:px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[tab.id]} />
            </svg>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
