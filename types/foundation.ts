export type Currency = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  symbol: string;
  decimalPrecision: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Bank = {
  id: string;
  companyId: string;
  name: string;
  code?: string;
  swiftCode?: string;
  countryCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ThirdPartyPaymentProvider = {
  id: string;
  companyId: string;
  name: string;
  code: string;
  providerType: 'money_transfer' | 'wallet' | 'cash' | 'other';
  supportsBulkPayment: boolean;
  requiresPhoneNumber: boolean;
  requiresNationalId: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TreatyCountry = {
  id: string;
  companyId: string;
  countryName: string;
  isoCode: string;
  hasTaxTreaty: boolean;
  hasNssfReciprocity: boolean;
  specialTreatmentType?: string;
  effectiveFrom?: string;
  effectiveTo?: string | null;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProviderType = 'money_transfer' | 'wallet' | 'cash' | 'other';

export type ValidationErrors = Record<string, string>;
