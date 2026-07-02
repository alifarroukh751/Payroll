'use client';

import React, { useState, useEffect } from 'react';
import { Bank, ValidationErrors } from '@/types/foundation';
import { validateBank } from '@/lib/foundation/foundationValidation';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';

export interface BankFormModalProps {
  isOpen: boolean;
  bank?: Bank;
  onClose: () => void;
  onSave: (bank: Omit<Bank, 'id' | 'createdAt' | 'updatedAt'>) => void;
  allBanks: Bank[];
  isLoading?: boolean;
}

export default function BankFormModal({
  isOpen,
  bank,
  onClose,
  onSave,
  allBanks,
  isLoading = false,
}: BankFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    swiftCode: '',
    countryCode: '',
    isActive: true,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (bank) {
      setFormData({
        name: bank.name,
        code: bank.code || '',
        swiftCode: bank.swiftCode || '',
        countryCode: bank.countryCode,
        isActive: bank.isActive,
      });
    } else {
      setFormData({
        name: '',
        code: '',
        swiftCode: '',
        countryCode: '',
        isActive: true,
      });
    }
    setErrors({});
  }, [bank, isOpen]);

  const handleSubmit = () => {
    const validationErrors = validateBank(formData, allBanks);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={bank ? 'Edit Bank' : 'Add Bank'}
      onClose={onClose}
      onSave={handleSubmit}
      isLoading={isLoading}
      size="md"
    >
      <div className="space-y-4">
        <FormField
          label="Bank Name"
          error={errors.name}
          required
        >
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Bank Audi"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Internal Code"
          error={errors.code}
        >
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="e.g., AUDI"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="SWIFT Code"
          error={errors.swiftCode}
        >
          <input
            type="text"
            value={formData.swiftCode}
            onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
            placeholder="e.g., AUDBLBBX"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Country Code"
          error={errors.countryCode}
          required
        >
          <input
            type="text"
            value={formData.countryCode}
            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value.toUpperCase() })}
            placeholder="e.g., LB"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={2}
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
