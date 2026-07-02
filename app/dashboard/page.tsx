'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import Topbar from '@/components/layout/Topbar';
import Card from '@/components/common/Card';
import StatusBadge from '@/components/common/StatusBadge';
import { useCompany } from '@/components/company/CompanyContext';

interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  status: 'active' | 'coming_soon';
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Foundation Settings',
    description: 'Manage currencies, banks, payment providers, and treaty countries',
    icon: '⚙️',
    href: '/settings/foundation',
    status: 'active',
  },
  {
    title: 'Company & Organization',
    description: 'Manage company profile, contacts, addresses, departments, and cost centers',
    icon: '🏢',
    href: '/settings/company',
    status: 'active',
  },
  {
    title: 'Employees',
    description: 'Employee master data, positions, and organizational assignments',
    icon: '👥',
    href: '#',
    status: 'coming_soon',
  },
];

export default function DashboardPage() {
  const { selectedCompany } = useCompany();

  return (
    <AppShell>
      <Topbar
        title="Dashboard"
        subtitle={`Admin control panel for ${selectedCompany?.displayName || 'Payroll and Accounting'}`}
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Welcome to the Lebanese Payroll Platform
              </h2>
              <p className="text-slate-600 mb-4">
                This is the admin portal for managing payroll, accounting foundations, and system configuration. The Foundation & Reference Settings and Company & Organization modules are fully functional. Other modules are under development.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/settings/foundation">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                    Go to Foundation Settings
                  </button>
                </Link>
                <Link href="/settings/company">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                    Go to Company & Organization
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors duration-200 font-medium">
                    Back to Homepage
                  </button>
                </Link>
              </div>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-6">Modules</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card) => (
              <Link
                key={card.href}
                href={card.status === 'active' ? card.href : '#'}
              >
                <Card className={`${card.status === 'active' ? 'cursor-pointer hover:shadow-lg' : 'cursor-not-allowed opacity-60'} h-full transition-shadow`}>
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {card.description}
                  </p>
                  <StatusBadge status={card.status === 'coming_soon' ? 'warning' : 'active'} />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
