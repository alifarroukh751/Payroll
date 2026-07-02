import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function HomeHero() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 sm:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Lebanese Accounting & Payroll Platform
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
          Manage company payroll, statutory rules, currencies, banks, payment providers, and compliance workflows from one structured system.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              Open Dashboard
            </Button>
          </Link>
          <Link href="/settings/foundation">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              View Foundation Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
