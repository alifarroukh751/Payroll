'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Company } from '@/types/company';
import { mockCompanies } from '@/lib/mock-data/companyMockData';

interface CompanyContextType {
  companies: Company[];
  selectedCompanyId: string;
  selectedCompany: Company | undefined;
  setSelectedCompanyId: (companyId: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(mockCompanies[0]?.id || '');

  const selectedCompany = mockCompanies.find(c => c.id === selectedCompanyId);

  return (
    <CompanyContext.Provider
      value={{
        companies: mockCompanies,
        selectedCompanyId,
        selectedCompany,
        setSelectedCompanyId,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
