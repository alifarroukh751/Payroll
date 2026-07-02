'use client';

import React from 'react';
import { TreatyCountry } from '@/types/foundation';
import { formatDate, formatBooleanLabel } from '@/lib/foundation/foundationUtils';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import StatusBadge from '@/components/common/StatusBadge';

export interface TreatyCountriesTableProps {
  countries: TreatyCountry[];
  isLoading?: boolean;
  onEdit: (country: TreatyCountry) => void;
  onToggleStatus: (country: TreatyCountry) => void;
  onAdd: () => void;
}

export default function TreatyCountriesTable({
  countries,
  isLoading = false,
  onEdit,
  onToggleStatus,
  onAdd,
}: TreatyCountriesTableProps) {
  if (countries.length === 0) {
    return (
      <EmptyState
        title="No treaty countries found"
        description="Create your first treaty country to get started"
        action={{ label: 'Add Country', onClick: onAdd }}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Country</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">ISO Code</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Tax Treaty</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">NSSF Reciprocity</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Effective Period</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Updated</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {countries.map((country) => (
            <tr
              key={country.id}
              className={`hover:bg-slate-50 transition-colors duration-200 ${
                !country.isActive ? 'opacity-60' : ''
              }`}
            >
              <td className="px-6 py-4 font-medium text-slate-900">{country.countryName}</td>
              <td className="px-6 py-4 text-slate-600">{country.isoCode}</td>
              <td className="px-6 py-4 text-slate-600">
                {formatBooleanLabel(country.hasTaxTreaty)}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {formatBooleanLabel(country.hasNssfReciprocity)}
              </td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {country.effectiveFrom && country.effectiveTo
                  ? `${country.effectiveFrom} to ${country.effectiveTo}`
                  : country.effectiveFrom
                  ? `From ${country.effectiveFrom}`
                  : '-'}
              </td>
              <td className="px-6 py-4">
                <StatusBadge
                  status={country.isActive ? 'active' : 'inactive'}
                />
              </td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {formatDate(country.updatedAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(country)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={country.isActive ? 'danger' : 'secondary'}
                    size="sm"
                    onClick={() => onToggleStatus(country)}
                  >
                    {country.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
