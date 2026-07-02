'use client';

import React, { useState, useEffect } from 'react';
import { Currency, ValidationErrors } from '@/types/foundation';
import { validateCurrency } from '@/lib/foundation/foundationValidation';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';

export interface CurrencyFormModalProps {
  isOpen: boolean;
  currency?: Currency;
  onClose: () => void;
  onSave: (currency: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>) => void;
  allCurrencies: Currency[];
  isLoading?: boolean;
}

export default function CurrencyFormModal({
  isOpen,
  currency,
  onClose,
  onSave,
  allCurrencies,
  isLoading = false,
}: CurrencyFormModalProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    symbol: '',
    decimalPrecision: 2,
    isActive: true,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (currency) {
      setFormData({
        code: currency.code,
        name: currency.name,
        symbol: currency.symbol,
        decimalPrecision: currency.decimalPrecision,
        isActive: currency.isActive,
      });
    } else {
      setFormData({
        code: '',
        name: '',
        symbol: '',
        decimalPrecision: 2,
        isActive: true,
      });
    }
    setErrors({});
  }, [currency, isOpen]);

  const handleSubmit = () => {
    const validationErrors = validateCurrency(formData, allCurrencies);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={currency ? 'Edit Currency' : 'Add Currency'}
      onClose={onClose}
      onSave={handleSubmit}
      isLoading={isLoading}
      size="md"
    >
      <div className="space-y-4">
        <FormField
          label="Code"
          error={errors.code}
          required
        >
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="e.g., USD"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={3}
          />
        </FormField>

        <FormField
          label="Name"
          error={errors.name}
          required
        >
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., US Dollar"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Symbol"
          error={errors.symbol}
          required
        >
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
            placeholder="e.g., $"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Decimal Precision"
          error={errors.decimalPrecision}
          required
        >
          <input
            type="number"
            value={formData.decimalPrecision}
            onChange={(e) => setFormData({ ...formData, decimalPrecision: parseInt(e.target.value) })}
            min="0"
            max="4"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField label="Status">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-slate-700">Active</span>
          </label>
        </FormField>
      </div>
    </Modal>
  );
}
