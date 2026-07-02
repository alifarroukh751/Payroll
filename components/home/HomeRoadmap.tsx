import React from 'react';
import Card from '@/components/common/Card';
import StatusBadge from '@/components/common/StatusBadge';

const roadmapItems = [
  { order: 1, title: 'Foundation & Reference', status: 'active' as const },
  { order: 2, title: 'Company & Organization', status: 'coming-soon' as const },
  { order: 3, title: 'Employee Master Data', status: 'coming-soon' as const },
  { order: 4, title: 'Compensation Setup', status: 'coming-soon' as const },
  { order: 5, title: 'Rule Engine', status: 'coming-soon' as const },
  { order: 6, title: 'Payroll Periods & Runs', status: 'coming-soon' as const },
  { order: 7, title: 'Payroll Inputs', status: 'coming-soon' as const },
  { order: 8, title: 'Payroll Results', status: 'coming-soon' as const },
  { order: 9, title: 'Payments & Disbursement', status: 'coming-soon' as const },
  { order: 10, title: 'Compliance & Reports', status: 'coming-soon' as const },
];

export default function HomeRoadmap() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            System Roadmap
          </h2>
          <p className="text-lg text-slate-600">
            Build order and planned modules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {roadmapItems.map((item) => (
            <Card key={item.order} className="flex flex-col items-center text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold mb-3">
                {item.order}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <StatusBadge status={item.status} />
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 max-w-2xl mx-auto">
            Only Foundation & Reference is fully functional in this version. All other modules are under development.
          </p>
        </div>
      </div>
    </section>
  );
}
