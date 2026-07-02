'use client';

import React, { useState } from 'react';
import { Company, CompanyContactPerson, CompanyAddress, Department, CostCenter, EmployeeOrgAssignment } from '@/types/company';
import { Currency } from '@/types/foundation';
import { useCompany } from '@/components/company/CompanyContext';
import { mockCompanies } from '@/lib/mock-data/companyMockData';
import {
  mockCompanyContacts,
  mockCompanyAddresses,
  mockDepartments,
  mockCostCenters,
  mockEmployeeOrgAssignments,
} from '@/lib/mock-data/companyMockData';
import { mockCurrencies } from '@/lib/mock-data/foundationMockData';
import CompanySummaryCards from '@/components/company/CompanySummaryCards';
import CompanyTabs from '@/components/company/CompanyTabs';
import Topbar from '@/components/layout/Topbar';
import Button from '@/components/common/Button';

export default function CompanySettingsPage() {
  const { selectedCompanyId, selectedCompany } = useCompany();

  // Local state for all company-related data
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [contacts, setContacts] = useState<CompanyContactPerson[]>(mockCompanyContacts);
  const [addresses, setAddresses] = useState<CompanyAddress[]>(mockCompanyAddresses);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [costCenters, setCostCenters] = useState<CostCenter[]>(mockCostCenters);
  const [assignements, setAssignments] = useState<EmployeeOrgAssignment[]>(mockEmployeeOrgAssignments);

  // Get company-specific currencies
  const companyCurrencies = mockCurrencies.filter((c) => c.companyId === selectedCompanyId);

  // Handlers
  const handleUpdateCompany = (company: Company) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === company.id ? company : c))
    );
  };

  const handleAddContact = (contact: CompanyContactPerson) => {
    setContacts((prev) => [...prev, contact]);
  };

  const handleUpdateContact = (contact: CompanyContactPerson) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? contact : c))
    );
  };

  const handleDeactivateContact = (contactId: string) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contactId ? { ...c, isActive: false } : c
      )
    );
  };

  const handleAddAddress = (address: CompanyAddress) => {
    setAddresses((prev) => [...prev, address]);
  };

  const handleUpdateAddress = (address: CompanyAddress) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === address.id ? address : a))
    );
  };

  const handleDeactivateAddress = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((a) =>
        a.id === addressId ? { ...a, isActive: false } : a
      )
    );
  };

  const handleAddDepartment = (department: Department) => {
    setDepartments((prev) => [...prev, department]);
  };

  const handleUpdateDepartment = (department: Department) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === department.id ? department : d))
    );
  };

  const handleDeactivateDepartment = (departmentId: string) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === departmentId ? { ...d, isActive: false } : d
      )
    );
  };

  const handleAddCostCenter = (costCenter: CostCenter) => {
    setCostCenters((prev) => [...prev, costCenter]);
  };

  const handleUpdateCostCenter = (costCenter: CostCenter) => {
    setCostCenters((prev) =>
      prev.map((cc) => (cc.id === costCenter.id ? costCenter : cc))
    );
  };

  const handleDeactivateCostCenter = (costCenterId: string) => {
    setCostCenters((prev) =>
      prev.map((cc) =>
        cc.id === costCenterId ? { ...cc, isActive: false } : cc
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Topbar
        title="Company & Organization Settings"
        subtitle="Manage employer identity, statutory contacts, addresses, departments, cost centers, and organizational assignments."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Summary Cards */}
        <CompanySummaryCards
          company={selectedCompany}
          contacts={contacts}
          addresses={addresses}
          departments={departments}
          costCenters={costCenters}
        />

        {/* Tabs and Forms */}
        {selectedCompany && (
          <CompanyTabs
            company={selectedCompany}
            onUpdateCompany={handleUpdateCompany}
            currencies={companyCurrencies}
            contacts={contacts}
            onAddContact={handleAddContact}
            onUpdateContact={handleUpdateContact}
            onDeactivateContact={handleDeactivateContact}
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeactivateAddress={handleDeactivateAddress}
            departments={departments}
            onAddDepartment={handleAddDepartment}
            onUpdateDepartment={handleUpdateDepartment}
            onDeactivateDepartment={handleDeactivateDepartment}
            costCenters={costCenters}
            onAddCostCenter={handleAddCostCenter}
            onUpdateCostCenter={handleUpdateCostCenter}
            onDeactivateCostCenter={handleDeactivateCostCenter}
          />
        )}
      </div>
    </div>
  );
}
