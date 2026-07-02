'use client';

import React, { useState, useEffect } from 'react';
import { ThirdPartyPaymentProvider, ProviderType, ValidationErrors } from '@/types/foundation';
import { validatePaymentProvider } from '@/lib/foundation/foundationValidation';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';

export interface PaymentProviderFormModalProps {
  isOpen: boolean;
  provider?: ThirdPartyPaymentProvider;
  onClose: () => void;
  onSave: (provider: Omit<ThirdPartyPaymentProvider, 'id' | 'createdAt' | 'updatedAt'>) => void;
  allProviders: ThirdPartyPaymentProvider[];
  isLoading?: boolean;
}

const providerTypes: { value: ProviderType; label: string }[] = [
  { value: 'money_transfer', label: 'Money Transfer' },
  { value: 'wallet', label: 'Wallet' },
  { value: 'cash', label: 'Cash' },
  { value: 'other', label: 'Other' },
];

export default function PaymentProviderFormModal({
  isOpen,
  provider,
  onClose,
  onSave,
  allProviders,
  isLoading = false,
}: PaymentProviderFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    providerType: 'money_transfer' as ProviderType,
    supportsBulkPayment: false,
    requiresPhoneNumber: false,
    requiresNationalId: false,
    isActive: true,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (provider) {
      setFormData({
        name: provider.name,
        code: provider.code,
        providerType: provider.providerType,
        supportsBulkPayment: provider.supportsBulkPayment,
        requiresPhoneNumber: provider.requiresPhoneNumber,
        requiresNationalId: provider.requiresNationalId,
        isActive: provider.isActive,
      });
    } else {
      setFormData({
        name: '',
        code: '',
        providerType: 'money_transfer',
        supportsBulkPayment: false,
        requiresPhoneNumber: false,
        requiresNationalId: false,
        isActive: true,
      });
    }
    setErrors({});
  }, [provider, isOpen]);

  const handleSubmit = () => {
    const validationErrors = validatePaymentProvider(formData, allProviders);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={provider ? 'Edit Payment Provider' : 'Add Payment Provider'}
      onClose={onClose}
      onSave={handleSubmit}
      isLoading={isLoading}
      size="md"
    >
      <div className="space-y-4">
        <FormField
          label="Provider Name"
          error={errors.name}
          required
        >
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., OMT"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Provider Code"
          error={errors.code}
          required
        >
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="e.g., OMT"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Provider Type"
          error={errors.providerType}
          required
        >
          <select
            value={formData.providerType}
            onChange={(e) => setFormData({ ...formData, providerType: e.target.value as ProviderType })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {providerTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Supports Bulk Payment">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.supportsBulkPayment}
              onChange={(e) => setFormData({ ...formData, supportsBulkPayment: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-slate-700">Yes, supports bulk payments</span>
          </label>
        </FormField>

        <FormField label="Requires Phone Number">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.requiresPhoneNumber}
              onChange={(e) => setFormData({ ...formData, requiresPhoneNumber: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-slate-700">Yes, requires phone number</span>
          </label>
        </FormField>

        <FormField label="Requires National ID">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.requiresNationalId}
              onChange={(e) => setFormData({ ...formData, requiresNationalId: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-slate-700">Yes, requires national ID</span>
          </label>
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
