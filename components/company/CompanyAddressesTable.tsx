'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { CompanyAddress } from '@/types/company';
import { validateCompanyAddress } from '@/lib/company/companyValidation';
import { getAddressTypeLabel } from '@/lib/company/companyUtils';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';
import StatusBadge from '@/components/common/StatusBadge';
import SearchInput from '@/components/common/SearchInput';

export interface CompanyAddressesTableProps {
  companyId: string;
  addresses: CompanyAddress[];
  onAddAddress: (address: CompanyAddress) => void;
  onUpdateAddress: (address: CompanyAddress) => void;
  onDeactivateAddress: (addressId: string) => void;
}

const addressTypeOptions = [
  { value: 'registered', label: 'Registered Address' },
  { value: 'notification', label: 'Notification Address' },
  { value: 'mailing', label: 'Mailing Address' },
  { value: 'office', label: 'Office Address' },
  { value: 'warehouse', label: 'Warehouse Address' },
  { value: 'other', label: 'Other Address' },
];

export default function CompanyAddressesTable({
  companyId,
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeactivateAddress,
}: CompanyAddressesTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<CompanyAddress | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<CompanyAddress>>({});

  const companyAddresses = addresses.filter(
    (a) => a.companyId === companyId &&
           (a.town?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.street?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.fullAddress?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openAddModal = () => {
    setEditingAddress(null);
    setFormData({
      companyId,
      addressType: 'registered',
      countryCode: 'LB',
      governorate: '',
      district: '',
      town: '',
      neighborhood: '',
      street: '',
      building: '',
      propertyNumber: '',
      floor: '',
      postalCode: '',
      fullAddress: '',
      isPrimary: false,
      isActive: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (address: CompanyAddress) => {
    setEditingAddress(address);
    setFormData(address);
    setErrors({});
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    const addressData = {
      ...formData,
      companyId,
    } as Partial<CompanyAddress>;

    const validationErrors = validateCompanyAddress(addressData, addresses);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingAddress) {
      onUpdateAddress({
        ...editingAddress,
        ...addressData,
        updatedAt: new Date().toISOString(),
      } as CompanyAddress);
    } else {
      onAddAddress({
        id: `addr-${Date.now()}`,
        ...addressData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as CompanyAddress);
    }

    setShowModal(false);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Addresses</h3>
          <Button onClick={openAddModal} variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
        </div>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by town, street, or address..."
          className="mb-6"
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Governorate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">District</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Town</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Building</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Full Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Primary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyAddresses.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-slate-500 text-sm">
                    No addresses found.
                  </td>
                </tr>
              ) : (
                companyAddresses.map((address) => (
                  <tr key={address.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{getAddressTypeLabel(address.addressType)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{address.governorate || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{address.district || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{address.town || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{address.building || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 truncate" title={address.fullAddress}>
                      {address.fullAddress || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`text-xs font-medium ${address.isPrimary ? 'text-green-700' : 'text-slate-500'}`}>
                        {address.isPrimary ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={address.isActive ? 'active' : 'inactive'} />
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <button
                        onClick={() => openEditModal(address)}
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {address.isActive && (
                        <button
                          onClick={() => onDeactivateAddress(address.id)}
                          className="text-red-600 hover:text-red-900 transition"
                          title="Deactivate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingAddress ? 'Edit Address' : 'Add Address'}>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
          <FormField
            label="Address Type"
            id="addressType"
            type="select"
            value={formData.addressType || 'registered'}
            onChange={handleChange}
            error={errors.addressType}
            required
          >
            {addressTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormField>

          <FormField
            label="Country Code"
            id="countryCode"
            type="text"
            value={formData.countryCode || 'LB'}
            onChange={handleChange}
            error={errors.countryCode}
            required
            maxLength={2}
          />

          <FormField
            label="Governorate (Optional)"
            id="governorate"
            type="text"
            value={formData.governorate || ''}
            onChange={handleChange}
          />

          <FormField
            label="District (Optional)"
            id="district"
            type="text"
            value={formData.district || ''}
            onChange={handleChange}
          />

          <FormField
            label="Town (Optional)"
            id="town"
            type="text"
            value={formData.town || ''}
            onChange={handleChange}
          />

          <FormField
            label="Neighborhood (Optional)"
            id="neighborhood"
            type="text"
            value={formData.neighborhood || ''}
            onChange={handleChange}
          />

          <FormField
            label="Street (Optional)"
            id="street"
            type="text"
            value={formData.street || ''}
            onChange={handleChange}
          />

          <FormField
            label="Building (Optional)"
            id="building"
            type="text"
            value={formData.building || ''}
            onChange={handleChange}
          />

          <FormField
            label="Property Number (Optional)"
            id="propertyNumber"
            type="text"
            value={formData.propertyNumber || ''}
            onChange={handleChange}
          />

          <FormField
            label="Floor (Optional)"
            id="floor"
            type="text"
            value={formData.floor || ''}
            onChange={handleChange}
          />

          <FormField
            label="Postal Code (Optional)"
            id="postalCode"
            type="text"
            value={formData.postalCode || ''}
            onChange={handleChange}
          />

          <FormField
            label="Full Address (Optional)"
            id="fullAddress"
            type="textarea"
            value={formData.fullAddress || ''}
            onChange={handleChange}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPrimary"
                checked={formData.isPrimary ?? false}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300"
              />
              <span className="text-sm font-medium text-slate-700">Primary Address</span>
            </label>

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
              {editingAddress ? 'Update' : 'Add'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
