'use client';

import React from 'react';
import { Building2, Users, MapPin, GitBranch, Zap, User2 } from 'lucide-react';
import {
  countActiveContacts,
  countActiveAddresses,
  countActiveDepartments,
  countActiveCostCenters,
} from '@/lib/company/companyUtils';
import {
  Company,
  CompanyContactPerson,
  CompanyAddress,
  Department,
  CostCenter,
} from '@/types/company';

export interface CompanySummaryCardsProps {
  company: Company | undefined;
  contacts: CompanyContactPerson[];
  addresses: CompanyAddress[];
  departments: Department[];
  costCenters: CostCenter[];
}

export default function CompanySummaryCards({
  company,
  contacts,
  addresses,
  departments,
  costCenters,
}: CompanySummaryCardsProps) {
  const companyId = company?.id || '';

  const summaryData = [
    {
      label: 'Active Company',
      value: company ? (company.displayName || company.legalName) : '-',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Contact Persons',
      value: countActiveContacts(contacts, companyId),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Addresses',
      value: countActiveAddresses(addresses, companyId),
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Departments',
      value: countActiveDepartments(departments, companyId),
      icon: GitBranch,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Cost Centers',
      value: countActiveCostCenters(costCenters, companyId),
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {summaryData.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">{item.label}</p>
              <div className={`${item.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
