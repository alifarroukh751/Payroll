import { ProviderType } from '@/types/foundation';

export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatBooleanLabel(value: boolean | undefined): string {
  if (value === undefined || value === null) return 'No';
  return value ? 'Yes' : 'No';
}

export function getStatusLabel(isActive: boolean): string {
  return isActive ? 'Active' : 'Inactive';
}

export function getStatusColor(isActive: boolean): string {
  return isActive ? 'text-green-600 bg-green-50' : 'text-slate-600 bg-slate-100';
}

export function getProviderTypeLabel(type: ProviderType): string {
  const labels: Record<ProviderType, string> = {
    money_transfer: 'Money Transfer',
    wallet: 'Wallet',
    cash: 'Cash',
    other: 'Other',
  };
  return labels[type] || type;
}

export function generateMockId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getCurrentIsoDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function getCurrentIsoDateTime(): string {
  return new Date().toISOString();
}
