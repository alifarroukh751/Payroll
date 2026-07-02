'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { CompanyContactPerson, ValidationErrors } from '@/types/company';
import { validateCompanyContactPerson, ValidationErrors as CompanyValidationErrors } from '@/lib/company/companyValidation';
import { getContactTypeLabel } from '@/lib/company/companyUtils';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Modal from '@/components/common/Modal';
import FormField from '@/components/common/FormField';
import StatusBadge from '@/components/common/StatusBadge';
import SearchInput from '@/components/common/SearchInput';

export interface CompanyContactsTableProps {
  companyId: string;
  contacts: CompanyContactPerson[];
  onAddContact: (contact: CompanyContactPerson) => void;
  onUpdateContact: (contact: CompanyContactPerson) => void;
  onDeactivateContact: (contactId: string) => void;
}

const contactTypeOptions = [
  { value: 'legal_representative', label: 'Legal Representative' },
  { value: 'declaration_preparer', label: 'Declaration Preparer' },
  { value: 'payroll_contact', label: 'Payroll Contact' },
  { value: 'nssf_contact', label: 'NSSF Contact' },
  { value: 'tax_contact', label: 'Tax Contact' },
  { value: 'notification_recipient', label: 'Notification Recipient' },
  { value: 'other', label: 'Other' },
];

export default function CompanyContactsTable({
  companyId,
  contacts,
  onAddContact,
  onUpdateContact,
  onDeactivateContact,
}: CompanyContactsTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingContact, setEditingContact] = useState<CompanyContactPerson | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<CompanyContactPerson>>({});

  const companyContacts = contacts.filter(
    (c) => c.companyId === companyId &&
           (c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openAddModal = () => {
    setEditingContact(null);
    setFormData({
      companyId,
      fullName: '',
      title: '',
      email: '',
      phone: '',
      mobile: '',
      contactType: 'other',
      nationalIdNumber: '',
      isPrimary: false,
      isActive: true,
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (contact: CompanyContactPerson) => {
    setEditingContact(contact);
    setFormData(contact);
    setErrors({});
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const contactData = {
      ...formData,
      companyId,
    } as Partial<CompanyContactPerson>;

    const validationErrors = validateCompanyContactPerson(contactData, contacts);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingContact) {
      onUpdateContact({
        ...editingContact,
        ...contactData,
        updatedAt: new Date().toISOString(),
      } as CompanyContactPerson);
    } else {
      onAddContact({
        id: `contact-${Date.now()}`,
        ...contactData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as CompanyContactPerson);
    }

    setShowModal(false);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Contact Persons</h3>
          <Button onClick={openAddModal} variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>

        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name or email..."
          className="mb-6"
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Primary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyContacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-slate-500 text-sm">
                    No contact persons found.
                  </td>
                </tr>
              ) : (
                companyContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{contact.fullName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contact.title || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{getContactTypeLabel(contact.contactType)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contact.email || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contact.phone || contact.mobile || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`text-xs font-medium ${contact.isPrimary ? 'text-green-700' : 'text-slate-500'}`}>
                        {contact.isPrimary ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={contact.isActive ? 'active' : 'inactive'} />
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex">
                      <button
                        onClick={() => openEditModal(contact)}
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {contact.isActive && (
                        <button
                          onClick={() => onDeactivateContact(contact.id)}
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingContact ? 'Edit Contact' : 'Add Contact'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            id="fullName"
            type="text"
            value={formData.fullName || ''}
            onChange={handleChange}
            error={errors.fullName}
            required
          />

          <FormField
            label="Title (Optional)"
            id="title"
            type="text"
            value={formData.title || ''}
            onChange={handleChange}
          />

          <FormField
            label="Contact Type"
            id="contactType"
            type="select"
            value={formData.contactType || 'other'}
            onChange={handleChange}
            error={errors.contactType}
            required
          >
            {contactTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormField>

          <FormField
            label="Email (Optional)"
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            error={errors.email}
          />

          <FormField
            label="Phone (Optional)"
            id="phone"
            type="tel"
            value={formData.phone || ''}
            onChange={handleChange}
            error={errors.phone}
          />

          <FormField
            label="Mobile (Optional)"
            id="mobile"
            type="tel"
            value={formData.mobile || ''}
            onChange={handleChange}
            error={errors.mobile}
          />

          <FormField
            label="National ID Number (Optional)"
            id="nationalIdNumber"
            type="text"
            value={formData.nationalIdNumber || ''}
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
              <span className="text-sm font-medium text-slate-700">Primary Contact</span>
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
              {editingContact ? 'Update' : 'Add'}
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
