import { Currency, Bank, ThirdPartyPaymentProvider, TreatyCountry } from '@/types/foundation';
import { mockCurrencies, mockBanks, mockPaymentProviders, mockTreatyCountries } from '@/lib/mock-data/foundationMockData';

/**
 * Currencies API
 * TODO: Future Laravel integration
 * GET /api/currencies
 * POST /api/currencies
 * PATCH /api/currencies/{id}
 */

export async function fetchCurrencies(): Promise<Currency[]> {
  // For now, return mock data
  // Later: return await fetch('/api/currencies').then(r => r.json());
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockCurrencies]), 100);
  });
}

export async function createCurrency(currency: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>): Promise<Currency> {
  // For now, return mock data with generated ID
  // Later: return await fetch('/api/currencies', { method: 'POST', body: JSON.stringify(currency) }).then(r => r.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCurrency: Currency = {
        ...currency,
        id: `cur-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      resolve(newCurrency);
    }, 100);
  });
}

export async function updateCurrency(id: string, updates: Partial<Currency>): Promise<Currency> {
  // For now, return updated mock data
  // Later: return await fetch(`/api/currencies/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }).then(r => r.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated: Currency = {
        ...mockCurrencies[0],
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      resolve(updated);
    }, 100);
  });
}

/**
 * Banks API
 * TODO: Future Laravel integration
 * GET /api/banks
 * POST /api/banks
 * PATCH /api/banks/{id}
 */

export async function fetchBanks(): Promise<Bank[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockBanks]), 100);
  });
}

export async function createBank(bank: Omit<Bank, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bank> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBank: Bank = {
        ...bank,
        id: `bank-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      resolve(newBank);
    }, 100);
  });
}

export async function updateBank(id: string, updates: Partial<Bank>): Promise<Bank> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated: Bank = {
        ...mockBanks[0],
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      resolve(updated);
    }, 100);
  });
}

/**
 * Payment Providers API
 * TODO: Future Laravel integration
 * GET /api/payment-providers
 * POST /api/payment-providers
 * PATCH /api/payment-providers/{id}
 */

export async function fetchPaymentProviders(): Promise<ThirdPartyPaymentProvider[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockPaymentProviders]), 100);
  });
}

export async function createPaymentProvider(
  provider: Omit<ThirdPartyPaymentProvider, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ThirdPartyPaymentProvider> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProvider: ThirdPartyPaymentProvider = {
        ...provider,
        id: `prov-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      resolve(newProvider);
    }, 100);
  });
}

export async function updatePaymentProvider(
  id: string,
  updates: Partial<ThirdPartyPaymentProvider>
): Promise<ThirdPartyPaymentProvider> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated: ThirdPartyPaymentProvider = {
        ...mockPaymentProviders[0],
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      resolve(updated);
    }, 100);
  });
}

/**
 * Treaty Countries API
 * TODO: Future Laravel integration
 * GET /api/treaty-countries
 * POST /api/treaty-countries
 * PATCH /api/treaty-countries/{id}
 */

export async function fetchTreatyCountries(): Promise<TreatyCountry[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockTreatyCountries]), 100);
  });
}

export async function createTreatyCountry(
  country: Omit<TreatyCountry, 'id' | 'createdAt' | 'updatedAt'>
): Promise<TreatyCountry> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCountry: TreatyCountry = {
        ...country,
        id: `country-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      resolve(newCountry);
    }, 100);
  });
}

export async function updateTreatyCountry(
  id: string,
  updates: Partial<TreatyCountry>
): Promise<TreatyCountry> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updated: TreatyCountry = {
        ...mockTreatyCountries[0],
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      resolve(updated);
    }, 100);
  });
}
