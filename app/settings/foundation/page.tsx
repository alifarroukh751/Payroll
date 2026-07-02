'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import Topbar from '@/components/layout/Topbar';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import SearchInput from '@/components/common/SearchInput';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useCompany } from '@/components/company/CompanyContext';

import FoundationSummaryCards from '@/components/foundation/FoundationSummaryCards';

import CurrenciesTable from '@/components/foundation/CurrenciesTable';
import CurrencyFormModal from '@/components/foundation/CurrencyFormModal';

import BanksTable from '@/components/foundation/BanksTable';
import BankFormModal from '@/components/foundation/BankFormModal';

import PaymentProvidersTable from '@/components/foundation/PaymentProvidersTable';
import PaymentProviderFormModal from '@/components/foundation/PaymentProviderFormModal';

import TreatyCountriesTable from '@/components/foundation/TreatyCountriesTable';
import TreatyCountryFormModal from '@/components/foundation/TreatyCountryFormModal';

import { Currency, Bank, ThirdPartyPaymentProvider, TreatyCountry } from '@/types/foundation';
import { mockCurrencies, mockBanks, mockPaymentProviders, mockTreatyCountries } from '@/lib/mock-data/foundationMockData';
import { generateMockId, getCurrentIsoDateTime } from '@/lib/foundation/foundationUtils';

type SubtabType = 'currencies' | 'banks' | 'providers' | 'treaty_countries';

interface SuccessMessage {
  type: 'create' | 'update' | 'status_change';
  entity: string;
}

export default function FoundationSettingsPage() {
  const searchParams = useSearchParams();
  const { selectedCompanyId, selectedCompany } = useCompany();
  
  // State for data
  const [currencies, setCurrencies] = useState<Currency[]>(mockCurrencies);
  const [banks, setBanks] = useState<Bank[]>(mockBanks);
  const [providers, setProviders] = useState<ThirdPartyPaymentProvider[]>(mockPaymentProviders);
  const [treatyCountries, setTreatyCountries] = useState<TreatyCountry[]>(mockTreatyCountries);

  // State for UI
  const [activeSubtab, setActiveSubtab] = useState<SubtabType>('currencies');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState<SuccessMessage | null>(null);

  // Update activeSubtab from query parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'currencies' || tab === 'banks' || tab === 'providers' || tab === 'treaty_countries') {
      setActiveSubtab(tab);
    }
  }, [searchParams]);

  // State for modals
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | undefined>();

  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>();

  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ThirdPartyPaymentProvider | undefined>();

  const [isTreatyCountryModalOpen, setIsTreatyCountryModalOpen] = useState(false);
  const [selectedTreatyCountry, setSelectedTreatyCountry] = useState<TreatyCountry | undefined>();

  // State for confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    entityType: string;
    entity: any;
  }>({
    isOpen: false,
    entityType: '',
    entity: null,
  });

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Currency handlers
  const handleSaveCurrency = (currencyData: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedCurrency) {
      setCurrencies((prev) =>
        prev.map((c) =>
          c.id === selectedCurrency.id
            ? {
                ...c,
                ...currencyData,
                updatedAt: getCurrentIsoDateTime(),
              }
            : c
        )
      );
      setSuccessMessage({ type: 'update', entity: 'Currency' });
    } else {
      const newCurrency: Currency = {
        ...currencyData,
        companyId: selectedCompanyId,
        id: generateMockId(),
        createdAt: getCurrentIsoDateTime(),
        updatedAt: getCurrentIsoDateTime(),
      };
      setCurrencies((prev) => [newCurrency, ...prev]);
      setSuccessMessage({ type: 'create', entity: 'Currency' });
    }
    setIsCurrencyModalOpen(false);
    setSelectedCurrency(undefined);
  };

  // Bank handlers
  const handleSaveBank = (bankData: Omit<Bank, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedBank) {
      setBanks((prev) =>
        prev.map((b) =>
          b.id === selectedBank.id
            ? {
                ...b,
                ...bankData,
                updatedAt: getCurrentIsoDateTime(),
              }
            : b
        )
      );
      setSuccessMessage({ type: 'update', entity: 'Bank' });
    } else {
      const newBank: Bank = {
        ...bankData,
        companyId: selectedCompanyId,
        id: generateMockId(),
        createdAt: getCurrentIsoDateTime(),
        updatedAt: getCurrentIsoDateTime(),
      };
      setBanks((prev) => [newBank, ...prev]);
      setSuccessMessage({ type: 'create', entity: 'Bank' });
    }
    setIsBankModalOpen(false);
    setSelectedBank(undefined);
  };

  // Provider handlers
  const handleSaveProvider = (providerData: Omit<ThirdPartyPaymentProvider, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedProvider) {
      setProviders((prev) =>
        prev.map((p) =>
          p.id === selectedProvider.id
            ? {
                ...p,
                ...providerData,
                updatedAt: getCurrentIsoDateTime(),
              }
            : p
        )
      );
      setSuccessMessage({ type: 'update', entity: 'Payment Provider' });
    } else {
      const newProvider: ThirdPartyPaymentProvider = {
        ...providerData,
        companyId: selectedCompanyId,
        id: generateMockId(),
        createdAt: getCurrentIsoDateTime(),
        updatedAt: getCurrentIsoDateTime(),
      };
      setProviders((prev) => [newProvider, ...prev]);
      setSuccessMessage({ type: 'create', entity: 'Payment Provider' });
    }
    setIsProviderModalOpen(false);
    setSelectedProvider(undefined);
  };

  // Treaty Country handlers
  const handleSaveTreatyCountry = (countryData: Omit<TreatyCountry, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedTreatyCountry) {
      setTreatyCountries((prev) =>
        prev.map((c) =>
          c.id === selectedTreatyCountry.id
            ? {
                ...c,
                ...countryData,
                updatedAt: getCurrentIsoDateTime(),
              }
            : c
        )
      );
      setSuccessMessage({ type: 'update', entity: 'Treaty Country' });
    } else {
      const newCountry: TreatyCountry = {
        ...countryData,
        companyId: selectedCompanyId,
        id: generateMockId(),
        createdAt: getCurrentIsoDateTime(),
        updatedAt: getCurrentIsoDateTime(),
      };
      setTreatyCountries((prev) => [newCountry, ...prev]);
      setSuccessMessage({ type: 'create', entity: 'Treaty Country' });
    }
    setIsTreatyCountryModalOpen(false);
    setSelectedTreatyCountry(undefined);
  };

  // Toggle status handlers
  const handleToggleCurrencyStatus = (currency: Currency) => {
    setConfirmDialog({
      isOpen: true,
      entityType: 'currency',
      entity: currency,
    });
  };

  const handleConfirmStatusChange = () => {
    const { entityType, entity } = confirmDialog;

    if (entityType === 'currency') {
      setCurrencies((prev) =>
        prev.map((c) =>
          c.id === entity.id
            ? { ...c, isActive: !c.isActive, updatedAt: getCurrentIsoDateTime() }
            : c
        )
      );
    } else if (entityType === 'bank') {
      setBanks((prev) =>
        prev.map((b) =>
          b.id === entity.id
            ? { ...b, isActive: !b.isActive, updatedAt: getCurrentIsoDateTime() }
            : b
        )
      );
    } else if (entityType === 'provider') {
      setProviders((prev) =>
        prev.map((p) =>
          p.id === entity.id
            ? { ...p, isActive: !p.isActive, updatedAt: getCurrentIsoDateTime() }
            : p
        )
      );
    } else if (entityType === 'treaty_country') {
      setTreatyCountries((prev) =>
        prev.map((c) =>
          c.id === entity.id
            ? { ...c, isActive: !c.isActive, updatedAt: getCurrentIsoDateTime() }
            : c
        )
      );
    }

    setSuccessMessage({ type: 'status_change', entity: 'Item' });
    setConfirmDialog({ isOpen: false, entityType: '', entity: null });
  };

  // Filter functions
  const filterBySearch = (query: string, items: any[]): any[] => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();

    return items.filter((item) => {
      if ('code' in item) {
        return (
          item.code?.toLowerCase().includes(lowerQuery) ||
          item.name?.toLowerCase().includes(lowerQuery) ||
          item.symbol?.toLowerCase().includes(lowerQuery)
        );
      }
      if ('countryName' in item) {
        return (
          item.countryName?.toLowerCase().includes(lowerQuery) ||
          item.isoCode?.toLowerCase().includes(lowerQuery)
        );
      }
      return false;
    });
  };

  // Filter by company and search
  const companyCurrencies = currencies.filter(c => c.companyId === selectedCompanyId);
  const companyBanks = banks.filter(b => b.companyId === selectedCompanyId);
  const companyProviders = providers.filter(p => p.companyId === selectedCompanyId);
  const companyTreatyCountries = treatyCountries.filter(c => c.companyId === selectedCompanyId);

  const filteredCurrencies = filterBySearch(searchQuery, companyCurrencies);
  const filteredBanks = filterBySearch(searchQuery, companyBanks);
  const filteredProviders = filterBySearch(searchQuery, companyProviders);
  const filteredTreatyCountries = filterBySearch(searchQuery, companyTreatyCountries);

  return (
    <AppShell>
      <Topbar
        title="Foundation & Reference Settings"
        subtitle="Manage currencies, banks, payout providers, and treaty countries used across payroll and accounting"
      />

      <div className="flex-1 overflow-auto bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm animate-fade-in">
              ✓ {successMessage.entity} {successMessage.type === 'create' ? 'created' : successMessage.type === 'update' ? 'updated' : 'status changed'} successfully!
            </div>
          )}

          {/* Summary Cards */}
          <div className="mb-8">
            <FoundationSummaryCards
              activeCurrencies={companyCurrencies.filter((c) => c.isActive).length}
              activeBanks={companyBanks.filter((b) => b.isActive).length}
              paymentProviders={companyProviders.length}
              treatyCountries={companyTreatyCountries.length}
            />
          </div>

          {/* Subtabs Dropdown and Content Card */}
          <Card className="overflow-hidden">
            {/* Tab Navigation */}
            <div className="px-6 py-0 border-b border-slate-200 bg-white flex gap-0">
              <button
                onClick={() => setActiveSubtab('currencies')}
                className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeSubtab === 'currencies'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Currencies
              </button>
              <button
                onClick={() => setActiveSubtab('banks')}
                className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeSubtab === 'banks'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Banks
              </button>
              <button
                onClick={() => setActiveSubtab('providers')}
                className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeSubtab === 'providers'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Payment Providers
              </button>
              <button
                onClick={() => setActiveSubtab('treaty_countries')}
                className={`px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeSubtab === 'treaty_countries'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Treaty Countries
              </button>
            </div>

            {/* Search and Actions */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeSubtab}...`}
                className="flex-1"
              />
              <Button
                onClick={() => {
                  if (activeSubtab === 'currencies') {
                    setSelectedCurrency(undefined);
                    setIsCurrencyModalOpen(true);
                  } else if (activeSubtab === 'banks') {
                    setSelectedBank(undefined);
                    setIsBankModalOpen(true);
                  } else if (activeSubtab === 'providers') {
                    setSelectedProvider(undefined);
                    setIsProviderModalOpen(true);
                  } else if (activeSubtab === 'treaty_countries') {
                    setSelectedTreatyCountry(undefined);
                    setIsTreatyCountryModalOpen(true);
                  }
                }}
              >
                + Add
              </Button>
            </div>

            {/* Tables */}
            <div className="bg-white">
              {activeSubtab === 'currencies' && (
                <CurrenciesTable
                  currencies={filteredCurrencies}
                  onEdit={(currency) => {
                    setSelectedCurrency(currency);
                    setIsCurrencyModalOpen(true);
                  }}
                  onToggleStatus={handleToggleCurrencyStatus}
                  onAdd={() => {
                    setSelectedCurrency(undefined);
                    setIsCurrencyModalOpen(true);
                  }}
                />
              )}

              {activeSubtab === 'banks' && (
                <BanksTable
                  banks={filteredBanks}
                  onEdit={(bank) => {
                    setSelectedBank(bank);
                    setIsBankModalOpen(true);
                  }}
                  onToggleStatus={(bank) => {
                    setConfirmDialog({
                      isOpen: true,
                      entityType: 'bank',
                      entity: bank,
                    });
                  }}
                  onAdd={() => {
                    setSelectedBank(undefined);
                    setIsBankModalOpen(true);
                  }}
                />
              )}

              {activeSubtab === 'providers' && (
                <PaymentProvidersTable
                  providers={filteredProviders}
                  onEdit={(provider) => {
                    setSelectedProvider(provider);
                    setIsProviderModalOpen(true);
                  }}
                  onToggleStatus={(provider) => {
                    setConfirmDialog({
                      isOpen: true,
                      entityType: 'provider',
                      entity: provider,
                    });
                  }}
                  onAdd={() => {
                    setSelectedProvider(undefined);
                    setIsProviderModalOpen(true);
                  }}
                />
              )}

              {activeSubtab === 'treaty_countries' && (
                <TreatyCountriesTable
                  countries={filteredTreatyCountries}
                  onEdit={(country) => {
                    setSelectedTreatyCountry(country);
                    setIsTreatyCountryModalOpen(true);
                  }}
                  onToggleStatus={(country) => {
                    setConfirmDialog({
                      isOpen: true,
                      entityType: 'treaty_country',
                      entity: country,
                    });
                  }}
                  onAdd={() => {
                    setSelectedTreatyCountry(undefined);
                    setIsTreatyCountryModalOpen(true);
                  }}
                />
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CurrencyFormModal
        isOpen={isCurrencyModalOpen}
        currency={selectedCurrency}
        onClose={() => {
          setIsCurrencyModalOpen(false);
          setSelectedCurrency(undefined);
        }}
        onSave={handleSaveCurrency}
        allCurrencies={companyCurrencies}
      />

      <BankFormModal
        isOpen={isBankModalOpen}
        bank={selectedBank}
        onClose={() => {
          setIsBankModalOpen(false);
          setSelectedBank(undefined);
        }}
        onSave={handleSaveBank}
        allBanks={companyBanks}
      />

      <PaymentProviderFormModal
        isOpen={isProviderModalOpen}
        provider={selectedProvider}
        onClose={() => {
          setIsProviderModalOpen(false);
          setSelectedProvider(undefined);
        }}
        onSave={handleSaveProvider}
        allProviders={companyProviders}
      />

      <TreatyCountryFormModal
        isOpen={isTreatyCountryModalOpen}
        country={selectedTreatyCountry}
        onClose={() => {
          setIsTreatyCountryModalOpen(false);
          setSelectedTreatyCountry(undefined);
        }}
        onSave={handleSaveTreatyCountry}
        allCountries={companyTreatyCountries}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Confirm Status Change"
        message={`Are you sure you want to ${
          confirmDialog.entity?.isActive ? 'deactivate' : 'activate'
        } this item?`}
        onConfirm={handleConfirmStatusChange}
        onCancel={() => setConfirmDialog({ isOpen: false, entityType: '', entity: null })}
        confirmText={confirmDialog.entity?.isActive ? 'Deactivate' : 'Activate'}
        isDangerous={confirmDialog.entity?.isActive}
      />
    </AppShell>
  );
}
