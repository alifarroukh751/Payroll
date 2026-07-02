import {
  Company,
  CompanyContactPerson,
  CompanyAddress,
  Department,
  CostCenter,
  EmployeeOrgAssignment,
} from '@/types/company';

// API Endpoint references for future Laravel integration:
// GET /api/companies
// GET /api/companies/{id}
// PATCH /api/companies/{id}
// GET /api/companies/{companyId}/contacts
// POST /api/companies/{companyId}/contacts
// PATCH /api/company-contacts/{id}
// GET /api/companies/{companyId}/addresses
// POST /api/companies/{companyId}/addresses
// PATCH /api/company-addresses/{id}
// GET /api/companies/{companyId}/departments
// POST /api/companies/{companyId}/departments
// PATCH /api/departments/{id}
// GET /api/companies/{companyId}/cost-centers
// POST /api/companies/{companyId}/cost-centers
// PATCH /api/cost-centers/{id}
// GET /api/employees/{employeeId}/org-assignments

export async function fetchCompanies(): Promise<Company[]> {
  // TODO: Implement with real API call
  // const response = await fetch('/api/companies');
  // return response.json();
  return [];
}

export async function fetchCompanyById(companyId: string): Promise<Company | null> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${companyId}`);
  // return response.json();
  return null;
}

export async function updateCompany(company: Company): Promise<Company> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${company.id}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(company),
  // });
  // return response.json();
  return company;
}

export async function createCompanyContact(contact: CompanyContactPerson): Promise<CompanyContactPerson> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${contact.companyId}/contacts`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(contact),
  // });
  // return response.json();
  return contact;
}

export async function updateCompanyContact(contact: CompanyContactPerson): Promise<CompanyContactPerson> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/company-contacts/${contact.id}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(contact),
  // });
  // return response.json();
  return contact;
}

export async function fetchCompanyContacts(companyId: string): Promise<CompanyContactPerson[]> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${companyId}/contacts`);
  // return response.json();
  return [];
}

export async function createCompanyAddress(address: CompanyAddress): Promise<CompanyAddress> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${address.companyId}/addresses`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(address),
  // });
  // return response.json();
  return address;
}

export async function updateCompanyAddress(address: CompanyAddress): Promise<CompanyAddress> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/company-addresses/${address.id}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(address),
  // });
  // return response.json();
  return address;
}

export async function fetchCompanyAddresses(companyId: string): Promise<CompanyAddress[]> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${companyId}/addresses`);
  // return response.json();
  return [];
}

export async function createDepartment(department: Department): Promise<Department> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${department.companyId}/departments`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(department),
  // });
  // return response.json();
  return department;
}

export async function updateDepartment(department: Department): Promise<Department> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/departments/${department.id}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(department),
  // });
  // return response.json();
  return department;
}

export async function fetchDepartments(companyId: string): Promise<Department[]> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${companyId}/departments`);
  // return response.json();
  return [];
}

export async function createCostCenter(costCenter: CostCenter): Promise<CostCenter> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${costCenter.companyId}/cost-centers`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(costCenter),
  // });
  // return response.json();
  return costCenter;
}

export async function updateCostCenter(costCenter: CostCenter): Promise<CostCenter> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/cost-centers/${costCenter.id}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(costCenter),
  // });
  // return response.json();
  return costCenter;
}

export async function fetchCostCenters(companyId: string): Promise<CostCenter[]> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/companies/${companyId}/cost-centers`);
  // return response.json();
  return [];
}

export async function fetchEmployeeOrgAssignments(employeeId: string): Promise<EmployeeOrgAssignment[]> {
  // TODO: Implement with real API call
  // const response = await fetch(`/api/employees/${employeeId}/org-assignments`);
  // return response.json();
  return [];
}
