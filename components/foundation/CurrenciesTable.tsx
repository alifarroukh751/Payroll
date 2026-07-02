'use client';

import React from 'react';
import { Currency } from '@/types/foundation';
import { formatDate, getStatusColor, getStatusLabel } from '@/lib/foundation/foundationUtils';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import StatusBadge from '@/components/common/StatusBadge';

export interface CurrenciesTableProps {
  currencies: Currency[];
  isLoading?: boolean;
  onEdit: (currency: Currency) => void;
  onToggleStatus: (currency: Currency) => void;
  onAdd: () => void;
}

export default function CurrenciesTable({
  currencies,
  isLoading = false,
  onEdit,
  onToggleStatus,
  onAdd,
}: CurrenciesTableProps) {
  if (currencies.length === 0) {
    return (
      <EmptyState
        title="No currencies found"
        description="Create your first currency to get started"
        action={{ label: 'Add Currency', onClick: onAdd }}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Code</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Name</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Symbol</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Decimals</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Updated</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {currencies.map((currency) => (
            <tr
              key={currency.id}
              className={`hover:bg-slate-50 transition-colors duration-200 ${
                !currency.isActive ? 'opacity-60' : ''
              }`}
            >
              <td className="px-6 py-4 font-medium text-slate-900">{currency.code}</td>
              <td className="px-6 py-4 text-slate-600">{currency.name}</td>
              <td className="px-6 py-4 text-slate-600">{currency.symbol}</td>
              <td className="px-6 py-4 text-slate-600">{currency.decimalPrecision}</td>
              <td className="px-6 py-4">
                <StatusBadge
                  status={currency.isActive ? 'active' : 'inactive'}
                />
              </td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {formatDate(currency.updatedAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(currency)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={currency.isActive ? 'danger' : 'secondary'}
                    size="sm"
                    onClick={() => onToggleStatus(currency)}
                  >
                    {currency.isActive ? 'Deactivate' : 'Activate'}
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
