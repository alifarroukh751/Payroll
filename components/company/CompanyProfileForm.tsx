'use client';

import React, { useState } from 'react';
import { Company } from '@/types/company';
import { Currency } from '@/types/foundation';
import { validateCompany } from '@/lib/company/companyValidation';
import Button from '@/components/common/Button';
import FormField from '@/components/common/FormField';
import Card from '@/components/common/Card';

export interface CompanyProfileFormProps {
  company: Company;
  onUpdateCompany: (company: Company) => void;
  currencies: Currency[];
}

export default function CompanyProfileForm({
  company,
  onUpdateCompany,
  currencies,
}: CompanyProfileFormProps) {
  const [formData, setFormData] = useState<Partial<Company>>(company);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    const validationErrors = validateCompany(formData, []);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedCompany: Company = {
      ...company,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    onUpdateCompany(updatedCompany);
    setSuccessMessage('Company profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Company Profile</h3>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Code */}
            <FormField
              label="Company Code"
              id="companyCode"
              type="text"
              value={formData.companyCode || ''}
              onChange={handleChange}
              error={errors.companyCode}
              required
            />

            {/* Country Code */}
            <FormField
              label="Country Code"
              id="countryCode"
              type="text"
              value={formData.countryCode || ''}
              onChange={handleChange}
              error={errors.countryCode}
              required
              maxLength={2}
            />

            {/* Legal Name */}
            <div className="md:col-span-2">
              <FormField
                label="Legal Name"
                id="legalName"
                type="text"
                value={formData.legalName || ''}
                onChange={handleChange}
                error={errors.legalName}
                required
              />
            </div>

            {/* Display Name */}
            <div className="md:col-span-2">
              <FormField
                label="Display Name (Optional)"
                id="displayName"
                type="text"
                value={formData.displayName || ''}
                onChange={handleChange}
              />
            </div>

            {/* Default Currency */}
            <FormField
              label="Default Currency (Optional)"
              id="defaultCurrencyId"
              type="select"
              value={formData.defaultCurrencyId || ''}
              onChange={handleChange}
            >
              <option value="">Select a currency</option>
              {currencies.map((curr) => (
                <option key={curr.id} value={curr.id}>
                  {curr.code} - {curr.name}
                </option>
              ))}
            </FormField>

            {/* Tax Registration Number */}
            <FormField
              label="Tax Registration Number (Optional)"
              id="taxRegistrationNumber"
              type="text"
              value={formData.taxRegistrationNumber || ''}
              onChange={handleChange}
            />

            {/* NSSF Registration Number */}
            <FormField
              label="NSSF Registration Number (Optional)"
              id="nssfRegistrationNumber"
              type="text"
              value={formData.nssfRegistrationNumber || ''}
              onChange={handleChange}
            />

            {/* Commercial Register Number */}
            <FormField
              label="Commercial Register Number (Optional)"
              id="commercialRegisterNumber"
              type="text"
              value={formData.commercialRegisterNumber || ''}
              onChange={handleChange}
            />

            {/* Commercial Register Place */}
            <FormField
              label="Commercial Register Place (Optional)"
              id="commercialRegisterPlace"
              type="text"
              value={formData.commercialRegisterPlace || ''}
              onChange={handleChange}
            />
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Responsible Person</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Name (Optional)"
                id="responsiblePersonName"
                type="text"
                value={formData.responsiblePersonName || ''}
                onChange={handleChange}
              />

              <FormField
                label="Title (Optional)"
                id="responsiblePersonTitle"
                type="text"
                value={formData.responsiblePersonTitle || ''}
                onChange={handleChange}
              />

              <FormField
                label="Phone (Optional)"
                id="responsiblePersonPhone"
                type="tel"
                value={formData.responsiblePersonPhone || ''}
                onChange={handleChange}
                error={errors.responsiblePersonPhone}
              />

              <FormField
                label="Email (Optional)"
                id="responsiblePersonEmail"
                type="email"
                value={formData.responsiblePersonEmail || ''}
                onChange={handleChange}
                error={errors.responsiblePersonEmail}
              />
            </div>
          </div>

          <hr className="border-slate-200" />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive ?? true}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300"
              />
              <span className="text-sm font-medium text-slate-700">Active</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
