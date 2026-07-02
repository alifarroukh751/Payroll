import type { Metadata } from 'next';
import './globals.css';
import { CompanyProvider } from '@/components/company/CompanyContext';

export const metadata: Metadata = {
  title: 'Lebanese Accounting & Payroll Platform',
  description: 'Manage company payroll, statutory rules, currencies, banks, payment providers, and compliance workflows from one structured system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <CompanyProvider>
          {children}
        </CompanyProvider>
      </body>
    </html>
  );
}
