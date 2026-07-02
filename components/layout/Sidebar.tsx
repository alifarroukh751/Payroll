'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import StatusBadge from '@/components/common/StatusBadge';

const sidebarLinks = [
  { href: '/', label: 'Home', iconPath: 'M3 12a9 9 0 1118 0 9 9 0 01-18 0z M9 9h6v6H9z' },
  { href: '/dashboard', label: 'Dashboard', iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
];

const foundationSubItems = [
  { 
    href: '/settings/foundation?tab=currencies', 
    label: 'Currencies',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'
  },
  { 
    href: '/settings/foundation?tab=banks', 
    label: 'Banks',
    iconPath: 'M11 21h-7v-2h7v2zm6.56-7.26L10 5.44 2.44 13.74h2.56v7h10v-7h2.56zM9 13h2v7h-2v-7z'
  },
  { 
    href: '/settings/foundation?tab=providers', 
    label: 'Payment Providers',
    iconPath: 'M20 8H4V6h16m1-2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H3V6h18v12zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.23-.29-.62-.29-.85 0l-2.96 3.83c-.3.38-.03.97.39.97h14.31c.41 0 .69-.54.39-.97L15.04 6.3c-.23-.29-.62-.29-.85 0z'
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    foundation: false,
  });

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen overflow-y-auto border-r border-slate-800">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">Payroll SaaS</h1>
        <p className="text-xs text-slate-400 mt-1">Lebanese Accounting</p>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <div key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.iconPath} />
                </svg>
                <span className="flex-1">{link.label}</span>
              </Link>
            </div>
          );
        })}

        {/* Foundation Settings with Sub-items */}
        <div>
          <button
            onClick={() => toggleExpanded('foundation')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              pathname.includes('/settings/foundation')
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            <span className="flex-1 text-left">Foundation Settings</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedItems.foundation ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
            </svg>
          </button>

          {/* Sub-items */}
          {expandedItems.foundation && (
            <div className="mt-1 space-y-1">
              {foundationSubItems.map((subItem) => {
                const tab = subItem.href.split('?tab=')[1];
                const currentTab = searchParams.get('tab');
                const isActive = pathname.includes('/settings/foundation') && currentTab === tab;

                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={subItem.iconPath} />
                    </svg>
                    <span>{subItem.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Company & Organization Settings */}
        <Link
          href="/settings/company"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
            pathname.includes('/settings/company')
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8M7 3v5h8" />
          </svg>
          <span className="flex-1">Company & Organization</span>
        </Link>

        {/* Coming Soon Section */}
        <div className="mt-8 pt-4 border-t border-slate-700">
          <p className="px-3 text-xs uppercase font-semibold text-slate-500 mb-3">Coming Soon</p>
          <div className="space-y-1">
            {['Employees', 'Compensation', 'Rule Engine', 'Payroll', 'Reports'].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 opacity-50 cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-slate-700 rounded"></div>
                <span className="flex-1 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-slate-800 bg-slate-800/50">
        <p className="text-xs text-slate-400">v0.1.0</p>
        <p className="text-xs text-slate-500 mt-2">Foundation & Reference only</p>
      </div>
    </aside>
  );
}
