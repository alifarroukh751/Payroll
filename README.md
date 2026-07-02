# Lebanese Accounting & Payroll SaaS - Frontend

A production-ready Next.js frontend for a Lebanese accounting and payroll system. This is the admin portal built with modern TypeScript, React components, and Tailwind CSS.

## 🎯 Project Overview

This is **Phase 1: Foundation & Reference Model** - a complete, functional CRUD interface for managing:

- **Currencies** - Exchange rates, decimal precision, and currency codes
- **Banks** - Bank master data with SWIFT codes and country codes
- **Payment Providers** - Third-party payout channels (money transfer, wallet, cash, etc.)
- **Treaty Countries** - Country configurations for tax and NSSF reciprocity

## 🏗 Architecture

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **State Management**: Local React state (no external libraries)
- **Data**: Mock data (no backend integration yet)
- **Future Backend**: Laravel REST API

## 📁 Project Structure

```
app/
├── page.tsx                      # Homepage
├── layout.tsx                    # Root layout
├── globals.css                   # Global styles
├── dashboard/
│   └── page.tsx                  # Dashboard page
└── settings/
    └── foundation/
        └── page.tsx              # Foundation Settings (main CRUD page)

components/
├── layout/
│   ├── AppShell.tsx             # Main layout wrapper with sidebar
│   ├── Sidebar.tsx              # Navigation sidebar
│   └── Topbar.tsx               # Page header bar
├── home/
│   ├── HomeHero.tsx             # Hero section
│   ├── HomeFeatureCards.tsx      # Feature cards grid
│   └── HomeRoadmap.tsx           # System roadmap
├── foundation/
│   ├── FoundationSummaryCards.tsx    # Summary stats
│   ├── FoundationTabs.tsx             # Tab selector
│   ├── CurrenciesTable.tsx            # Currencies data table
│   ├── CurrencyFormModal.tsx          # Currency create/edit form
│   ├── BanksTable.tsx                 # Banks data table
│   ├── BankFormModal.tsx              # Bank create/edit form
│   ├── PaymentProvidersTable.tsx      # Providers data table
│   ├── PaymentProviderFormModal.tsx   # Provider create/edit form
│   ├── TreatyCountriesTable.tsx       # Countries data table
│   └── TreatyCountryFormModal.tsx     # Country create/edit form
└── common/
    ├── Button.tsx               # Reusable button with variants
    ├── Card.tsx                 # Card container component
    ├── StatusBadge.tsx          # Status display badge
    ├── SearchInput.tsx          # Search field
    ├── EmptyState.tsx           # Empty state placeholder
    ├── Modal.tsx                # Modal dialog wrapper
    ├── ConfirmDialog.tsx        # Confirmation dialog
    └── FormField.tsx            # Form field wrapper

lib/
├── mock-data/
│   └── foundationMockData.ts    # Mock currencies, banks, providers, countries
├── foundation/
│   ├── foundationUtils.ts       # Utility functions (formatting, helpers)
│   ├── foundationValidation.ts  # Form validation logic
│   └── foundationApi.ts         # API placeholder functions

types/
└── foundation.ts                # TypeScript types for data models
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ with npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Homepage: http://localhost:3000
# Dashboard: http://localhost:3000/dashboard
# Foundation Settings: http://localhost:3000/settings/foundation
```

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## 📋 Features

### Homepage (`/`)

- Professional hero section with CTA buttons
- Feature cards showcasing platform capabilities
- System roadmap showing planned modules
- Responsive design

### Dashboard (`/dashboard`)

- Welcome message and system overview
- Module cards linking to available features
- Coming Soon indicators for future modules
- Quick access to Foundation Settings

### Foundation Settings (`/settings/foundation`)

Complete CRUD interface with:

- **Summary cards** showing counts of active items
- **Tab interface** for switching between data types
- **Search functionality** across all tables
- **Data tables** with status badges and timestamps
- **Add/Edit modals** with form validation
- **Status toggling** (activate/deactivate)
- **Confirmation dialogs** for destructive actions
- **Success messages** for user feedback

## 🎨 Design Language

- **Professional SaaS aesthetic**: Clean, minimal design
- **Color palette**: Navy/dark gray headings, white cards, light gray background
- **Status colors**: Green (active), Gray/Red (inactive), Amber (coming soon)
- **Responsive layout**: Mobile-first, works on all screen sizes
- **Accessibility**: Proper labels, ARIA attributes, keyboard navigation

## 🔄 Data Model

### Currency

```typescript
{
  id: string;
  code: string;          // USD, LBP, EUR (3 chars, uppercase)
  name: string;          // Full name
  symbol: string;        // $, L.L., €
  decimalPrecision: number; // 0-4
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Bank

```typescript
{
  id: string;
  name: string;
  code?: string;         // Internal bank code
  swiftCode?: string;    // International SWIFT code
  countryCode: string;   // ISO country code (2 chars)
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Payment Provider

```typescript
{
  id: string;
  name: string;
  code: string;          // Uppercase identifier
  providerType: 'money_transfer' | 'wallet' | 'cash' | 'other';
  supportsBulkPayment: boolean;
  requiresPhoneNumber: boolean;
  requiresNationalId: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Treaty Country

```typescript
{
  id: string;
  countryName: string;
  isoCode: string;       // 2-char ISO code
  hasTaxTreaty: boolean;
  hasNssfReciprocity: boolean;
  specialTreatmentType?: string;
  effectiveFrom?: string; // ISO date
  effectiveTo?: string | null;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 📝 Form Validation

All forms include client-side validation:

- **Currency**: Code uniqueness, length, uppercase, decimal precision
- **Bank**: Bank name required, country code required, unique codes
- **Provider**: Name, code, type required, unique codes
- **Country**: Country name, ISO code required, date logic validation

## 💾 State Management

- **Local React state** using `useState` hook
- **Mock data** from `foundationMockData.ts`
- **No external state libraries** (Redux, Zustand, etc.)
- **Easy to integrate** with backend later

## 🔌 Future API Integration

The project includes placeholder API functions in `lib/foundation/foundationApi.ts`:

```typescript
// Future Laravel endpoints
GET /api/currencies
POST /api/currencies
PATCH /api/currencies/{id}

GET /api/banks
POST /api/banks
PATCH /api/banks/{id}

GET /api/payment-providers
POST /api/payment-providers
PATCH /api/payment-providers/{id}

GET /api/treaty-countries
POST /api/treaty-countries
PATCH /api/treaty-countries/{id}
```

To integrate with Laravel:

1. Update functions in `lib/foundation/foundationApi.ts` to make real HTTP calls
2. Replace mock data initialization with API calls
3. Add error handling and loading states
4. Implement authentication headers

## 🎯 Next Steps (Phase 2)

1. **Company & Organization Module** - Company setup, structure, divisions
2. **Employee Master Data Module** - Employee information, classifications
3. **Compensation Setup Module** - Salary structures, allowances, deductions
4. **Rule Engine Module** - Calculation rules, conditions, automations
5. **Laravel Backend** - Authentication, database, API endpoints

## 🛠 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State and side effects management
- **No external UI library** - Custom components using Tailwind

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "next": "^14.0.0"
}
```

Dev dependencies: TypeScript, Tailwind CSS, ESLint, Autoprefixer

## 🔒 Code Quality

- ✅ Strict TypeScript mode
- ✅ No `any` types (unless unavoidable)
- ✅ Clean component structure
- ✅ Separated concerns (validation, utilities, components)
- ✅ Consistent naming conventions
- ✅ Responsive design

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

Private - Lebanese Payroll SaaS Project

## 📞 Support

For questions or issues, refer to the inline documentation in component files.

---

**Version**: 0.1.0  
**Status**: Foundation & Reference Module Complete  
**Phase**: 1 of 5
