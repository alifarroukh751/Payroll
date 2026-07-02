'use client';

import React, { useState, useEffect } from 'react';
import { TreatyCountry, ValidationErrors } from '@/types/foundation';
import { validateTreatyCountry } from '@/lib/foundation/foundationValidation';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';

export interface TreatyCountryFormModalProps {
  isOpen: boolean;
  country?: TreatyCountry;
  onClose: () => void;
  onSave: (country: Omit<TreatyCountry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  allCountries: TreatyCountry[];
  isLoading?: boolean;
}

export default function TreatyCountryFormModal({
  isOpen,
  country,
  onClose,
  onSave,
  allCountries,
  isLoading = false,
}: TreatyCountryFormModalProps) {
  const [formData, setFormData] = useState({
    countryName: '',
    isoCode: '',
    hasTaxTreaty: false,
    hasNssfReciprocity: false,
    specialTreatmentType: '',
    effectiveFrom: '',
    effectiveTo: '',
    notes: '',
    isActive: true,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (country) {
      setFormData({
        countryName: country.countryName,
        isoCode: country.isoCode,
        hasTaxTreaty: country.hasTaxTreaty,
        hasNssfReciprocity: country.hasNssfReciprocity,
        specialTreatmentType: country.specialTreatmentType || '',
        effectiveFrom: country.effectiveFrom || '',
        effectiveTo: country.effectiveTo || '',
        notes: country.notes || '',
        isActive: country.isActive,
      });
    } else {
      setFormData({
        countryName: '',
        isoCode: '',
        hasTaxTreaty: false,
        hasNssfReciprocity: false,
        specialTreatmentType: '',
        effectiveFrom: '',
        effectiveTo: '',
        notes: '',
        isActive: true,
      });
    }
    setErrors({});
  }, [country, isOpen]);

  const handleSubmit = () => {
    const validationErrors = validateTreatyCountry(formData, allCountries);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitData = {
      ...formData,
      specialTreatmentType: formData.specialTreatmentType || undefined,
      effectiveFrom: formData.effectiveFrom || undefined,
      effectiveTo: formData.effectiveTo || null,
      notes: formData.notes || undefined,
    };

    onSave(submitData);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={country ? 'Edit Treaty Country' : 'Add Treaty Country'}
      onClose={onClose}
      onSave={handleSubmit}
      isLoading={isLoading}
      size="lg"
    >
      <div className="space-y-4">
        <FormField
          label="Country Name"
          error={errors.countryName}
          required
        >
          <input
            type="text"
            value={formData.countryName}
            onChange={(e) => setFormData({ ...formData, countryName: e.target.value })}
            placeholder="e.g., France"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="ISO Code"
          error={errors.isoCode}
          required
        >
          <input
            type="text"
            value={formData.isoCode}
            onChange={(e) => setFormData({ ...formData, isoCode: e.target.value.toUpperCase() })}
            placeholder="e.g., FR"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={2}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Tax Treaty">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasTaxTreaty}
                onChange={(e) => setFormData({ ...formData, hasTaxTreaty: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-slate-700">Has tax treaty</span>
            </label>
          </FormField>

          <FormField label="NSSF Reciprocity">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasNssfReciprocity}
                onChange={(e) => setFormData({ ...formData, hasNssfReciprocity: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-slate-700">Has NSSF reciprocity</span>
            </label>
          </FormField>
        </div>

        <FormField label="Special Treatment Type">
          <input
            type="text"
            value={formData.specialTreatmentType}
            onChange={(e) => setFormData({ ...formData, specialTreatmentType: e.target.value })}
            placeholder="e.g., EU Member"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Effective From">
            <input
              type="date"
              value={formData.effectiveFrom}
              onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField
            label="Effective To"
            error={errors.effectiveTo}
          >
            <input
              type="date"
              value={formData.effectiveTo}
              onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <FormField label="Notes">
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes..."
            rows={3}
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
