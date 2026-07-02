'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { CostCenter } from '@/types/company';
import { validateCostCenter, hasCircularCostCenterParent } from '@/lib/company/companyValidation';
import { getAvailableParentCostCenters, getCostCenterHierarchyLabel } from '@/lib/company/companyUtils';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';
import StatusBadge from '@/components/common/StatusBadge';
import SearchInput from '@/components/common/SearchInput';

export interface CostCentersTableProps {
  companyId: string;
  costCenters: CostCenter[];
  onAddCostCenter: (costCenter: CostCenter) => void;
  onUpdateCostCenter: (costCenter: CostCenter) => void;
  onDeactivateCostCenter: (costCenterId: string) => void;
}

export default function CostCentersTable({
  companyId,
  costCenters,
  onAddCostCenter,
  onUpdateCostCenter,
  onDeactivateCostCenter,
}: CostCentersTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingCostCenter, setEditingCostCenter] = useState<CostCenter | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<CostCenter>>({});

  const companyCostCenters = costCenters.filter(
    (cc) => cc.companyId === companyId &&
            (cc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             cc.costCenterCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openAddModal = () => {
    setEditingCostCenter(null);
    setFormData({
      companyId,
      costCenterCode: '',
      name: '',
      description: '',
      parentCostCenterId: undefined,
      isActive: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (costCenter: CostCenter) => {
    setEditingCostCenter(costCenter);
    setFormData(costCenter);
    setErrors({});
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value || undefined;
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

    const ccData = {
      ...formData,
      companyId,
    } as Partial<CostCenter>;

    let validationErrors = validateCostCenter(ccData, costCenters, companyId);

    // Check for circular parent
    if (ccData.parentCostCenterId && hasCircularCostCenterParent(ccData, costCenters)) {
      validationErrors.parentCostCenterId = 'This would create a circular hierarchy';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingCostCenter) {
      onUpdateCostCenter({
        ...editingCostCenter,
        ...ccData,
        updatedAt: new Date().toISOString(),
      } as CostCenter);
    } else {
      onAddCostCenter({
        id: `cc-${Date.now()}`,
        ...ccData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as CostCenter);
    }

    setShowModal(false);
  };

  const parentOptions = getAvailableParentCostCenters(
    costCenters,
    editingCostCenter?.id,
    companyId
  );

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Cost Centers</h3>
          <Button onClick={openAddModal} variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Cost Center
          </Button>
        </div>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name or code..."
          className="mb-6"
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Parent Cost Center</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyCostCenters.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-slate-500 text-sm">
                    No cost centers found.
                  </td>
                </tr>
              ) : (
                companyCostCenters.map((cc) => (
                  <tr key={cc.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{cc.costCenterCode}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{cc.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cc.parentCostCenterId
                        ? getCostCenterHierarchyLabel(cc.parentCostCenterId, costCenters)
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{cc.description || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={cc.isActive ? 'active' : 'inactive'} />
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <button
                        onClick={() => openEditModal(cc)}
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {cc.isActive && (
                        <button
                          onClick={() => onDeactivateCostCenter(cc.id)}
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingCostCenter ? 'Edit Cost Center' : 'Add Cost Center'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Cost Center Code"
            id="costCenterCode"
            type="text"
            value={formData.costCenterCode || ''}
            onChange={handleChange}
            error={errors.costCenterCode}
            required
          />

          <FormField
            label="Name"
            id="name"
            type="text"
            value={formData.name || ''}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormField
            label="Parent Cost Center (Optional)"
            id="parentCostCenterId"
            type="select"
            value={formData.parentCostCenterId || ''}
            onChange={handleChange}
            error={errors.parentCostCenterId}
          >
            <option value="">None</option>
            {parentOptions.map((cc) => (
              <option key={cc.id} value={cc.id}>
                {cc.name}
              </option>
            ))}
          </FormField>

          <FormField
            label="Description (Optional)"
            id="description"
            type="textarea"
            value={formData.description || ''}
            onChange={handleChange}
          />

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

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary">
              {editingCostCenter ? 'Update' : 'Add'}
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
