export type Company = {
  id: string;
  companyCode: string;
  legalName: string;
  displayName?: string;
  countryCode: string;
  defaultCurrencyId?: string;
  taxRegistrationNumber?: string;
  nssfRegistrationNumber?: string;
  commercialRegisterNumber?: string;
  commercialRegisterPlace?: string;
  responsiblePersonName?: string;
  responsiblePersonTitle?: string;
  responsiblePersonPhone?: string;
  responsiblePersonEmail?: string;
  isActive: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CompanyContactPerson = {
  id: string;
  companyId: string;
  fullName: string;
  title?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  contactType:
    | 'legal_representative'
    | 'declaration_preparer'
    | 'payroll_contact'
    | 'nssf_contact'
    | 'tax_contact'
    | 'notification_recipient'
    | 'other';
  nationalIdNumber?: string;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CompanyAddress = {
  id: string;
  companyId: string;
  addressType:
    | 'registered'
    | 'notification'
    | 'mailing'
    | 'office'
    | 'warehouse'
    | 'other';
  countryCode: string;
  governorate?: string;
  district?: string;
  town?: string;
  neighborhood?: string;
  street?: string;
  building?: string;
  propertyNumber?: string;
  floor?: string;
  postalCode?: string;
  fullAddress?: string;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Department = {
  id: string;
  companyId: string;
  parentDepartmentId?: string | null;
  departmentCode: string;
  name: string;
  description?: string;
  managerEmployeeId?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CostCenter = {
  id: string;
  companyId: string;
  parentCostCenterId?: string | null;
  costCenterCode: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeOrgAssignment = {
  id: string;
  companyId: string;
  employeeId: string;
  departmentId: string;
  costCenterId?: string | null;
  positionTitle?: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  isPrimary: boolean;
  assignmentReason?: string;
  createdAt: string;
  updatedAt: string;
};

export type ValidationErrors = Record<string, string>;
