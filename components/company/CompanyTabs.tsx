'use client';

import React, { useState } from 'react';
import { Company, CompanyContactPerson, CompanyAddress, Department, CostCenter } from '@/types/company';
import { Currency } from '@/types/foundation';
import CompanyProfileForm from './CompanyProfileForm';
import CompanyContactsTable from './CompanyContactsTable';
import CompanyAddressesTable from './CompanyAddressesTable';
import DepartmentsTable from './DepartmentsTable';
import CostCentersTable from './CostCentersTable';
import EmployeeOrgAssignmentsPreview from './EmployeeOrgAssignmentsPreview';

export interface CompanyTabsProps {
  company: Company | undefined;
  onUpdateCompany: (company: Company) => void;
  currencies: Currency[];
  contacts: CompanyContactPerson[];
  onAddContact: (contact: CompanyContactPerson) => void;
  onUpdateContact: (contact: CompanyContactPerson) => void;
  onDeactivateContact: (contactId: string) => void;
  addresses: CompanyAddress[];
  onAddAddress: (address: CompanyAddress) => void;
  onUpdateAddress: (address: CompanyAddress) => void;
  onDeactivateAddress: (addressId: string) => void;
  departments: Department[];
  onAddDepartment: (department: Department) => void;
  onUpdateDepartment: (department: Department) => void;
  onDeactivateDepartment: (departmentId: string) => void;
  costCenters: CostCenter[];
  onAddCostCenter: (costCenter: CostCenter) => void;
  onUpdateCostCenter: (costCenter: CostCenter) => void;
  onDeactivateCostCenter: (costCenterId: string) => void;
}

const tabs = [
  { id: 'profile', label: 'Company Profile' },
  { id: 'contacts', label: 'Contact Persons' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'departments', label: 'Departments' },
  { id: 'cost-centers', label: 'Cost Centers' },
  { id: 'org-assignments', label: 'Employee Org Assignments' },
];

export default function CompanyTabs({
  company,
  onUpdateCompany,
  currencies,
  contacts,
  onAddContact,
  onUpdateContact,
  onDeactivateContact,
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeactivateAddress,
  departments,
  onAddDepartment,
  onUpdateDepartment,
  onDeactivateDepartment,
  costCenters,
  onAddCostCenter,
  onUpdateCostCenter,
  onDeactivateCostCenter,
}: CompanyTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('profile');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'profile' && company && (
          <CompanyProfileForm company={company} onUpdateCompany={onUpdateCompany} currencies={currencies} />
        )}

        {activeTab === 'contacts' && company && (
          <CompanyContactsTable
            companyId={company.id}
            contacts={contacts}
            onAddContact={onAddContact}
            onUpdateContact={onUpdateContact}
            onDeactivateContact={onDeactivateContact}
          />
        )}

        {activeTab === 'addresses' && company && (
          <CompanyAddressesTable
            companyId={company.id}
            addresses={addresses}
            onAddAddress={onAddAddress}
            onUpdateAddress={onUpdateAddress}
            onDeactivateAddress={onDeactivateAddress}
          />
        )}

        {activeTab === 'departments' && company && (
          <DepartmentsTable
            companyId={company.id}
            departments={departments}
            onAddDepartment={onAddDepartment}
            onUpdateDepartment={onUpdateDepartment}
            onDeactivateDepartment={onDeactivateDepartment}
          />
        )}

        {activeTab === 'cost-centers' && company && (
          <CostCentersTable
            companyId={company.id}
            costCenters={costCenters}
            onAddCostCenter={onAddCostCenter}
            onUpdateCostCenter={onUpdateCostCenter}
            onDeactivateCostCenter={onDeactivateCostCenter}
          />
        )}

        {activeTab === 'org-assignments' && company && (
          <EmployeeOrgAssignmentsPreview companyId={company.id} departments={departments} costCenters={costCenters} />
        )}
      </div>
    </div>
  );
}
