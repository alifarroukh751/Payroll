import { Currency, Bank, ThirdPartyPaymentProvider, TreatyCountry, ValidationErrors } from '@/types/foundation';

export function validateCurrency(
  currency: Partial<Currency>,
  existingCurrencies: Currency[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!currency.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!currency.code || currency.code.trim() === '') {
    errors.code = 'Code is required';
  } else if (currency.code !== currency.code.toUpperCase()) {
    errors.code = 'Code should be uppercase';
  } else if (currency.code.length !== 3) {
    errors.code = 'Code should typically be 3 characters (e.g., USD, EUR)';
  }

  if (!currency.name || currency.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!currency.symbol || currency.symbol.trim() === '') {
    errors.symbol = 'Symbol is required';
  }

  if (currency.decimalPrecision === undefined || currency.decimalPrecision === null) {
    errors.decimalPrecision = 'Decimal precision is required';
  } else if (currency.decimalPrecision < 0) {
    errors.decimalPrecision = 'Decimal precision cannot be negative';
  } else if (currency.decimalPrecision > 4) {
    errors.decimalPrecision = 'Decimal precision should be between 0 and 4';
  }

  // Check for unique code per company (excluding the current currency if editing)
  const isDuplicate = existingCurrencies.some(
    (c) => c.code === currency.code && c.companyId === currency.companyId && c.id !== currency.id
  );
  if (isDuplicate) {
    errors.code = 'Currency code must be unique per company';
  }

  return errors;
}

export function validateBank(
  bank: Partial<Bank>,
  existingBanks: Bank[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!bank.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!bank.name || bank.name.trim() === '') {
    errors.name = 'Bank name is required';
  }

  if (!bank.countryCode || bank.countryCode.trim() === '') {
    errors.countryCode = 'Country code is required';
  } else if (bank.countryCode !== bank.countryCode.toUpperCase()) {
    errors.countryCode = 'Country code should be uppercase';
  }

  // Check for unique bank code per company
  if (bank.code && bank.code.trim() !== '') {
    const isDuplicate = existingBanks.some(
      (b) => b.code === bank.code && b.companyId === bank.companyId && b.id !== bank.id
    );
    if (isDuplicate) {
      errors.code = 'Bank code must be unique per company';
    }
  }

  // Check for unique SWIFT code per company
  if (bank.swiftCode && bank.swiftCode.trim() !== '') {
    const isDuplicate = existingBanks.some(
      (b) => b.swiftCode === bank.swiftCode && b.companyId === bank.companyId && b.id !== bank.id
    );
    if (isDuplicate) {
      errors.swiftCode = 'SWIFT code must be unique per company';
    }
  }

  return errors;
}

export function validatePaymentProvider(
  provider: Partial<ThirdPartyPaymentProvider>,
  existingProviders: ThirdPartyPaymentProvider[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!provider.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!provider.name || provider.name.trim() === '') {
    errors.name = 'Provider name is required';
  }

  if (!provider.code || provider.code.trim() === '') {
    errors.code = 'Provider code is required';
  } else if (provider.code !== provider.code.toUpperCase()) {
    errors.code = 'Provider code should be uppercase';
  }

  if (!provider.providerType) {
    errors.providerType = 'Provider type is required';
  }

  // Check for unique provider code per company
  const isDuplicate = existingProviders.some(
    (p) => p.code === provider.code && p.companyId === provider.companyId && p.id !== provider.id
  );
  if (isDuplicate) {
    errors.code = 'Provider code must be unique per company';
  }

  return errors;
}

export function validateTreatyCountry(
  country: Partial<TreatyCountry>,
  existingCountries: TreatyCountry[] = []
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!country.companyId) {
    errors.companyId = 'Company is required';
  }

  if (!country.countryName || country.countryName.trim() === '') {
    errors.countryName = 'Country name is required';
  }

  if (!country.isoCode || country.isoCode.trim() === '') {
    errors.isoCode = 'ISO code is required';
  } else if (country.isoCode !== country.isoCode.toUpperCase()) {
    errors.isoCode = 'ISO code should be uppercase';
  }

  // Check for unique ISO code per company
  const isDuplicate = existingCountries.some(
    (c) => c.isoCode === country.isoCode && c.companyId === country.companyId && c.id !== country.id
  );
  if (isDuplicate) {
    errors.isoCode = 'ISO code must be unique per company';
  }

  // Validate date logic
  if (country.effectiveFrom && country.effectiveTo) {
    if (country.effectiveTo < country.effectiveFrom) {
      errors.effectiveTo = 'Effective To must be after Effective From';
    }
  }

  return errors;
}
