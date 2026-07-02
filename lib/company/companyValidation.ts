import {
  Company,
  CompanyContactPerson,
  CompanyAddress,
  Department,
  CostCenter,
  EmployeeOrgAssignment,
  ValidationErrors,
} from '@/types/company';

export function validateCompany(
  company: Partial<Company>,
  existingCompanies: Company[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!company.companyCode || company.companyCode.trim() === '') {
    errors.companyCode = 'Company code is required';
  } else {
    const isDuplicate = existingCompanies.some(
      (c) => c.companyCode === company.companyCode && c.id !== company.id
    );
    if (isDuplicate) {
      errors.companyCode = 'Company code must be unique';
    }
  }

  if (!company.legalName || company.legalName.trim() === '') {
    errors.legalName = 'Legal name is required';
  }

  if (!company.countryCode || company.countryCode.trim() === '') {
    errors.countryCode = 'Country code is required';
  }

  if (company.responsiblePersonEmail && company.responsiblePersonEmail.trim() !== '') {
    if (!isValidEmail(company.responsiblePersonEmail)) {
      errors.responsiblePersonEmail = 'Email is not valid';
    }
  }

  if (company.responsiblePersonPhone && company.responsiblePersonPhone.trim() !== '') {
    if (!isValidPhone(company.responsiblePersonPhone)) {
      errors.responsiblePersonPhone = 'Phone number is not valid';
    }
  }

  return errors;
}

export function validateCompanyContactPerson(
  contact: Partial<CompanyContactPerson>,
  existingContacts: CompanyContactPerson[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!contact.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!contact.fullName || contact.fullName.trim() === '') {
    errors.fullName = 'Full name is required';
  }

  if (!contact.contactType) {
    errors.contactType = 'Contact type is required';
  }

  if (contact.email && contact.email.trim() !== '') {
    if (!isValidEmail(contact.email)) {
      errors.email = 'Email is not valid';
    }
  }

  if (contact.phone && contact.phone.trim() !== '') {
    if (!isValidPhone(contact.phone)) {
      errors.phone = 'Phone number is not valid';
    }
  }

  if (contact.mobile && contact.mobile.trim() !== '') {
    if (!isValidPhone(contact.mobile)) {
      errors.mobile = 'Mobile number is not valid';
    }
  }

  return errors;
}

export function validateCompanyAddress(
  address: Partial<CompanyAddress>,
  existingAddresses: CompanyAddress[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!address.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!address.addressType) {
    errors.addressType = 'Address type is required';
  }

  if (!address.countryCode || address.countryCode.trim() === '') {
    errors.countryCode = 'Country code is required';
  }

  return errors;
}

export function validateDepartment(
  department: Partial<Department>,
  existingDepartments: Department[] = [],
  companyId?: string
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!department.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!department.departmentCode || department.departmentCode.trim() === '') {
    errors.departmentCode = 'Department code is required';
  } else {
    // Check for unique code per company
    const isDuplicate = existingDepartments.some(
      (d) => d.departmentCode === department.departmentCode &&
             d.companyId === department.companyId &&
             d.id !== department.id
    );
    if (isDuplicate) {
      errors.departmentCode = 'Department code must be unique per company';
    }
  }

  if (!department.name || department.name.trim() === '') {
    errors.name = 'Department name is required';
  }

  // Validate parent department
  if (department.parentDepartmentId) {
    if (department.parentDepartmentId === department.id) {
      errors.parentDepartmentId = 'Department cannot be its own parent';
    }

    // Check if parent department belongs to the same company
    const parentDept = existingDepartments.find(d => d.id === department.parentDepartmentId);
    if (parentDept && parentDept.companyId !== department.companyId) {
      errors.parentDepartmentId = 'Parent department must belong to the same company';
    }
  }

  return errors;
}

export function validateCostCenter(
  costCenter: Partial<CostCenter>,
  existingCostCenters: CostCenter[] = [],
  companyId?: string
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!costCenter.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!costCenter.costCenterCode || costCenter.costCenterCode.trim() === '') {
    errors.costCenterCode = 'Cost center code is required';
  } else {
    // Check for unique code per company
    const isDuplicate = existingCostCenters.some(
      (cc) => cc.costCenterCode === costCenter.costCenterCode &&
              cc.companyId === costCenter.companyId &&
              cc.id !== costCenter.id
    );
    if (isDuplicate) {
      errors.costCenterCode = 'Cost center code must be unique per company';
    }
  }

  if (!costCenter.name || costCenter.name.trim() === '') {
    errors.name = 'Cost center name is required';
  }

  // Validate parent cost center
  if (costCenter.parentCostCenterId) {
    if (costCenter.parentCostCenterId === costCenter.id) {
      errors.parentCostCenterId = 'Cost center cannot be its own parent';
    }

    // Check if parent cost center belongs to the same company
    const parentCC = existingCostCenters.find(cc => cc.id === costCenter.parentCostCenterId);
    if (parentCC && parentCC.companyId !== costCenter.companyId) {
      errors.parentCostCenterId = 'Parent cost center must belong to the same company';
    }
  }

  return errors;
}

export function validateEmployeeOrgAssignment(
  assignment: Partial<EmployeeOrgAssignment>,
  existingAssignments: EmployeeOrgAssignment[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!assignment.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!assignment.employeeId || assignment.employeeId.trim() === '') {
    errors.employeeId = 'Employee is required';
  }

  if (!assignment.departmentId || assignment.departmentId.trim() === '') {
    errors.departmentId = 'Department is required';
  }

  if (!assignment.effectiveFrom || assignment.effectiveFrom.trim() === '') {
    errors.effectiveFrom = 'Effective From date is required';
  }

  // Validate date logic
  if (assignment.effectiveFrom && assignment.effectiveTo) {
    if (assignment.effectiveTo < assignment.effectiveFrom) {
      errors.effectiveTo = 'Effective To must be after or equal to Effective From';
    }
  }

  return errors;
}

// Helper functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  // Basic phone validation: allow +, digits, hyphens, spaces, and parentheses
  const phoneRegex = /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Hierarchy validation utilities
export function hasCircularDepartmentParent(
  department: Partial<Department>,
  allDepartments: Department[]
): boolean {
  if (!department.parentDepartmentId) return false;

  let current = department.parentDepartmentId;
  const visited = new Set<string>();

  while (current) {
    if (visited.has(current)) {
      return true; // Circular reference detected
    }
    visited.add(current);

    const parent = allDepartments.find(d => d.id === current);
    current = parent?.parentDepartmentId || undefined;
  }

  // Check if department is in its own parent chain
  if (visited.has(department.id || '')) {
    return true;
  }

  return false;
}

export function hasCircularCostCenterParent(
  costCenter: Partial<CostCenter>,
  allCostCenters: CostCenter[]
): boolean {
  if (!costCenter.parentCostCenterId) return false;

  let current = costCenter.parentCostCenterId;
  const visited = new Set<string>();

  while (current) {
    if (visited.has(current)) {
      return true; // Circular reference detected
    }
    visited.add(current);

    const parent = allCostCenters.find(cc => cc.id === current);
    current = parent?.parentCostCenterId || undefined;
  }

  // Check if cost center is in its own parent chain
  if (visited.has(costCenter.id || '')) {
    return true;
  }

  return false;
}
