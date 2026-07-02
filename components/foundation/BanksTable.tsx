'use client';

import React from 'react';
import { Bank } from '@/types/foundation';
import { formatDate } from '@/lib/foundation/foundationUtils';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import StatusBadge from '@/components/common/StatusBadge';

export interface BanksTableProps {
  banks: Bank[];
  isLoading?: boolean;
  onEdit: (bank: Bank) => void;
  onToggleStatus: (bank: Bank) => void;
  onAdd: () => void;
}

export default function BanksTable({
  banks,
  isLoading = false,
  onEdit,
  onToggleStatus,
  onAdd,
}: BanksTableProps) {
  if (banks.length === 0) {
    return (
      <EmptyState
        title="No banks found"
        description="Create your first bank to get started"
        action={{ label: 'Add Bank', onClick: onAdd }}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Bank Name</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Code</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">SWIFT Code</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Country</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Updated</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {banks.map((bank) => (
            <tr
              key={bank.id}
              className={`hover:bg-slate-50 transition-colors duration-200 ${
                !bank.isActive ? 'opacity-60' : ''
              }`}
            >
              <td className="px-6 py-4 font-medium text-slate-900">{bank.name}</td>
              <td className="px-6 py-4 text-slate-600">{bank.code || '-'}</td>
              <td className="px-6 py-4 text-slate-600">{bank.swiftCode || '-'}</td>
              <td className="px-6 py-4 text-slate-600">{bank.countryCode}</td>
              <td className="px-6 py-4">
                <StatusBadge
                  status={bank.isActive ? 'active' : 'inactive'}
                />
              </td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {formatDate(bank.updatedAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(bank)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={bank.isActive ? 'danger' : 'secondary'}
                    size="sm"
                    onClick={() => onToggleStatus(bank)}
                  >
                    {bank.isActive ? 'Deactivate' : 'Activate'}
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
