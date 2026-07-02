'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Department } from '@/types/company';
import { validateDepartment, hasCircularDepartmentParent } from '@/lib/company/companyValidation';
import { getAvailableParentDepartments, getDepartmentHierarchyLabel } from '@/lib/company/companyUtils';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';
import StatusBadge from '@/components/common/StatusBadge';
import SearchInput from '@/components/common/SearchInput';

export interface DepartmentsTableProps {
  companyId: string;
  departments: Department[];
  onAddDepartment: (department: Department) => void;
  onUpdateDepartment: (department: Department) => void;
  onDeactivateDepartment: (departmentId: string) => void;
}

export default function DepartmentsTable({
  companyId,
  departments,
  onAddDepartment,
  onUpdateDepartment,
  onDeactivateDepartment,
}: DepartmentsTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<Department>>({});

  const companyDepartments = departments.filter(
    (d) => d.companyId === companyId &&
           (d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.departmentCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openAddModal = () => {
    setEditingDepartment(null);
    setFormData({
      companyId,
      departmentCode: '',
      name: '',
      description: '',
      parentDepartmentId: undefined,
      managerEmployeeId: undefined,
      isActive: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (department: Department) => {
    setEditingDepartment(department);
    setFormData(department);
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

    const deptData = {
      ...formData,
      companyId,
    } as Partial<Department>;

    let validationErrors = validateDepartment(deptData, departments, companyId);

    // Check for circular parent
    if (deptData.parentDepartmentId && hasCircularDepartmentParent(deptData, departments)) {
      validationErrors.parentDepartmentId = 'This would create a circular hierarchy';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingDepartment) {
      onUpdateDepartment({
        ...editingDepartment,
        ...deptData,
        updatedAt: new Date().toISOString(),
      } as Department);
    } else {
      onAddDepartment({
        id: `dept-${Date.now()}`,
        ...deptData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Department);
    }

    setShowModal(false);
  };

  const parentOptions = getAvailableParentDepartments(
    departments,
    editingDepartment?.id,
    companyId
  );

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Departments</h3>
          <Button onClick={openAddModal} variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Department
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
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Parent Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyDepartments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-slate-500 text-sm">
                    No departments found.
                  </td>
                </tr>
              ) : (
                companyDepartments.map((dept) => (
                  <tr key={dept.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{dept.departmentCode}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{dept.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {dept.parentDepartmentId
                        ? getDepartmentHierarchyLabel(dept.parentDepartmentId, departments)
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{dept.description || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={dept.isActive ? 'active' : 'inactive'} />
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <button
                        onClick={() => openEditModal(dept)}
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {dept.isActive && (
                        <button
                          onClick={() => onDeactivateDepartment(dept.id)}
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingDepartment ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Department Code"
            id="departmentCode"
            type="text"
            value={formData.departmentCode || ''}
            onChange={handleChange}
            error={errors.departmentCode}
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
            label="Parent Department (Optional)"
            id="parentDepartmentId"
            type="select"
            value={formData.parentDepartmentId || ''}
            onChange={handleChange}
            error={errors.parentDepartmentId}
          >
            <option value="">None</option>
            {parentOptions.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
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
              {editingDepartment ? 'Update' : 'Add'}
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
