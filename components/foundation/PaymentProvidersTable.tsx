'use client';

import React from 'react';
import { ThirdPartyPaymentProvider } from '@/types/foundation';
import { formatDate, formatBooleanLabel, getProviderTypeLabel } from '@/lib/foundation/foundationUtils';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import StatusBadge from '@/components/common/StatusBadge';

export interface PaymentProvidersTableProps {
  providers: ThirdPartyPaymentProvider[];
  isLoading?: boolean;
  onEdit: (provider: ThirdPartyPaymentProvider) => void;
  onToggleStatus: (provider: ThirdPartyPaymentProvider) => void;
  onAdd: () => void;
}

export default function PaymentProvidersTable({
  providers,
  isLoading = false,
  onEdit,
  onToggleStatus,
  onAdd,
}: PaymentProvidersTableProps) {
  if (providers.length === 0) {
    return (
      <EmptyState
        title="No payment providers found"
        description="Create your first payment provider to get started"
        action={{ label: 'Add Provider', onClick: onAdd }}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Name</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Code</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Type</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Bulk</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Required Info</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Updated</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {providers.map((provider) => (
            <tr
              key={provider.id}
              className={`hover:bg-slate-50 transition-colors duration-200 ${
                !provider.isActive ? 'opacity-60' : ''
              }`}
            >
              <td className="px-6 py-4 font-medium text-slate-900">{provider.name}</td>
              <td className="px-6 py-4 text-slate-600">{provider.code}</td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {getProviderTypeLabel(provider.providerType)}
              </td>
              <td className="px-6 py-4 text-slate-600">
                {formatBooleanLabel(provider.supportsBulkPayment)}
              </td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {provider.requiresPhoneNumber && 'Phone '}
                {provider.requiresNationalId && 'ID'}
              </td>
              <td className="px-6 py-4">
                <StatusBadge
                  status={provider.isActive ? 'active' : 'inactive'}
                />
              </td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {formatDate(provider.updatedAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(provider)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={provider.isActive ? 'danger' : 'secondary'}
                    size="sm"
                    onClick={() => onToggleStatus(provider)}
                  >
                    {provider.isActive ? 'Deactivate' : 'Activate'}
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
