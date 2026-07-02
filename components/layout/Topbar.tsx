'use client';

import React from 'react';
import { useCompany } from '@/components/company/CompanyContext';
import { ChevronDown } from 'lucide-react';

export interface TopbarProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showCompanySelector?: boolean;
}

export default function Topbar({ title, subtitle, actions, showCompanySelector = true }: TopbarProps) {
  const { companies, selectedCompanyId, selectedCompany, setSelectedCompanyId } = useCompany();
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = React.useState(false);

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            {title && <h1 className="text-2xl font-bold text-slate-900">{title}</h1>}
            {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {showCompanySelector && (
              <div className="relative">
                <button
                  onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
                >
                  <span className="truncate max-w-xs">{selectedCompany?.displayName || selectedCompany?.legalName || 'Select Company'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isCompanyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                    <div className="py-2 max-h-96 overflow-y-auto">
                      {companies.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => {
                            setSelectedCompanyId(company.id);
                            setIsCompanyDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            selectedCompanyId === company.id
                              ? 'bg-blue-50 text-blue-900 font-medium'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-medium">{company.displayName || company.legalName}</div>
                          <div className="text-xs text-slate-500">{company.companyCode}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
