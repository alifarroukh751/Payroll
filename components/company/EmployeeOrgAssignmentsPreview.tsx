'use client';

import React from 'react';
import { Department, CostCenter, EmployeeOrgAssignment } from '@/types/company';
import { mockEmployeeOrgAssignments } from '@/lib/mock-data/companyMockData';
import { findDepartmentName, findCostCenterName } from '@/lib/company/companyUtils';
import Card from '@/components/common/Card';
import { AlertCircle } from 'lucide-react';

export interface EmployeeOrgAssignmentsPreviewProps {
  companyId: string;
  departments: Department[];
  costCenters: CostCenter[];
}

export default function EmployeeOrgAssignmentsPreview({
  companyId,
  departments,
  costCenters,
}: EmployeeOrgAssignmentsPreviewProps) {
  const assignments = mockEmployeeOrgAssignments.filter((a) => a.companyId === companyId);

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Employee Organization Assignments</h3>

        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <p className="font-medium mb-1">Coming Soon</p>
            <p>
              Employee organization assignments will be fully enabled after the Employee module is created. This table shows a preview of how effective-dated department and cost center assignments will work.
            </p>
            <p className="mt-2 text-xs text-amber-800">
              <strong>Important:</strong> Payroll must use the department and cost center assignment active during the payroll period, not only the employee's current department.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Cost Center</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Position Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Effective From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Effective To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Primary</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-slate-500 text-sm">
                    No organization assignments yet. Assignments will appear after the Employee module is created.
                  </td>
                </tr>
              ) : (
                assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {/* Mock employee name - will be linked to real employees later */}
                      Mock Employee {assignment.employeeId}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {findDepartmentName(assignment.departmentId, departments)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {assignment.costCenterId ? findCostCenterName(assignment.costCenterId, costCenters) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{assignment.positionTitle || '-'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(assignment.effectiveFrom).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {assignment.effectiveTo
                        ? new Date(assignment.effectiveTo).toLocaleDateString()
                        : 'Current'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`text-xs font-medium ${assignment.isPrimary ? 'text-green-700' : 'text-slate-500'}`}>
                        {assignment.isPrimary ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
          <p className="font-medium mb-2">Future Functionality:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Full CRUD operations for employee assignments</li>
            <li>Effective-dated tracking of department and cost center changes</li>
            <li>Multiple organizational assignments per employee</li>
            <li>Integration with Employee module and Payroll processing</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
