import { Company, Department, CostCenter, CompanyContactPerson, CompanyAddress } from '@/types/company';
import { Currency } from '@/types/foundation';

export function formatCompanyDisplayName(company: Company): string {
  return company.displayName || company.legalName;
}

export function getContactTypeLabel(contactType: string): string {
  const labels: Record<string, string> = {
    legal_representative: 'Legal Representative',
    declaration_preparer: 'Declaration Preparer',
    payroll_contact: 'Payroll Contact',
    nssf_contact: 'NSSF Contact',
    tax_contact: 'Tax Contact',
    notification_recipient: 'Notification Recipient',
    other: 'Other',
  };
  return labels[contactType] || contactType;
}

export function getAddressTypeLabel(addressType: string): string {
  const labels: Record<string, string> = {
    registered: 'Registered Address',
    notification: 'Notification Address',
    mailing: 'Mailing Address',
    office: 'Office Address',
    warehouse: 'Warehouse Address',
    other: 'Other Address',
  };
  return labels[addressType] || addressType;
}

export function findDepartmentName(departmentId: string | undefined, departments: Department[]): string {
  if (!departmentId) return '-';
  const dept = departments.find(d => d.id === departmentId);
  return dept ? dept.name : '-';
}

export function findCostCenterName(costCenterId: string | undefined, costCenters: CostCenter[]): string {
  if (!costCenterId) return '-';
  const cc = costCenters.find(c => c.id === costCenterId);
  return cc ? cc.name : '-';
}

export function findCurrencySymbol(currencyId: string | undefined, currencies: Currency[]): string {
  if (!currencyId) return '';
  const currency = currencies.find(c => c.id === currencyId);
  return currency ? currency.symbol : '';
}

export function filterCompanyContacts(
  contacts: CompanyContactPerson[],
  companyId: string
): CompanyContactPerson[] {
  return contacts.filter(c => c.companyId === companyId);
}

export function filterCompanyAddresses(
  addresses: CompanyAddress[],
  companyId: string
): CompanyAddress[] {
  return addresses.filter(a => a.companyId === companyId);
}

export function filterDepartments(
  departments: Department[],
  companyId: string
): Department[] {
  return departments.filter(d => d.companyId === companyId);
}

export function filterCostCenters(
  costCenters: CostCenter[],
  companyId: string
): CostCenter[] {
  return costCenters.filter(cc => cc.companyId === companyId);
}

export function getDepartmentHierarchyLabel(
  departmentId: string,
  departments: Department[]
): string {
  const dept = departments.find(d => d.id === departmentId);
  if (!dept) return '-';

  const parts = [dept.name];
  let current = dept;

  while (current.parentDepartmentId) {
    const parent = departments.find(d => d.id === current.parentDepartmentId);
    if (parent) {
      parts.unshift(parent.name);
      current = parent;
    } else {
      break;
    }
  }

  return parts.join(' / ');
}

export function getCostCenterHierarchyLabel(
  costCenterId: string,
  costCenters: CostCenter[]
): string {
  const cc = costCenters.find(c => c.id === costCenterId);
  if (!cc) return '-';

  const parts = [cc.name];
  let current = cc;

  while (current.parentCostCenterId) {
    const parent = costCenters.find(c => c.id === current.parentCostCenterId);
    if (parent) {
      parts.unshift(parent.name);
      current = parent;
    } else {
      break;
    }
  }

  return parts.join(' / ');
}

export function getActiveDepartments(departments: Department[], companyId: string): Department[] {
  return filterDepartments(departments, companyId).filter(d => d.isActive);
}

export function getActiveCostCenters(costCenters: CostCenter[], companyId: string): CostCenter[] {
  return filterCostCenters(costCenters, companyId).filter(cc => cc.isActive);
}

export function countActiveDepartments(departments: Department[], companyId: string): number {
  return getActiveDepartments(departments, companyId).length;
}

export function countActiveCostCenters(costCenters: CostCenter[], companyId: string): number {
  return getActiveCostCenters(costCenters, companyId).length;
}

export function countActiveContacts(contacts: CompanyContactPerson[], companyId: string): number {
  return filterCompanyContacts(contacts, companyId).filter(c => c.isActive).length;
}

export function countActiveAddresses(addresses: CompanyAddress[], companyId: string): number {
  return filterCompanyAddresses(addresses, companyId).filter(a => a.isActive).length;
}

export function getAvailableParentDepartments(
  departments: Department[],
  currentDeptId: string | undefined,
  companyId: string
): Department[] {
  return filterDepartments(departments, companyId).filter(
    d => d.id !== currentDeptId && d.isActive
  );
}

export function getAvailableParentCostCenters(
  costCenters: CostCenter[],
  currentCcId: string | undefined,
  companyId: string
): CostCenter[] {
  return filterCostCenters(costCenters, companyId).filter(
    cc => cc.id !== currentCcId && cc.isActive
  );
}

export function getPrimaryAddress(addresses: CompanyAddress[], companyId: string): CompanyAddress | undefined {
  return filterCompanyAddresses(addresses, companyId).find(a => a.isPrimary && a.isActive);
}

export function getPrimaryContact(contacts: CompanyContactPerson[], companyId: string): CompanyContactPerson | undefined {
  return filterCompanyContacts(contacts, companyId).find(c => c.isPrimary && c.isActive);
}
