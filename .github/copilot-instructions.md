<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Lebanese Payroll SaaS - Development Guidelines

## Project Context

This is a **production-ready Next.js frontend** for a Lebanese accounting and payroll system. It's currently in **Phase 1: Foundation & Reference Model** with complete CRUD operations for currencies, banks, payment providers, and treaty countries.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **State**: Local React state only (no Redux/Zustand)
- **Data**: Mock data (future: Laravel REST API)

## Architecture Principles

1. **Component-First**: Reusable, composable components with clear props
2. **Type-Safe**: Strict TypeScript, avoid `any` types
3. **Separation of Concerns**: 
   - Components in `components/`
   - Business logic in `lib/`
   - Validation in `lib/foundation/foundationValidation.ts`
   - Mock data in `lib/mock-data/`
4. **Clean Naming**: Descriptive names following React conventions
5. **Mock Data First**: All data is mock until backend is ready

## Folder Structure

```
app/               # Next.js App Router pages
components/        # React components (layout, home, foundation, common)
lib/               # Utilities, validation, mock data, API placeholders
types/             # TypeScript type definitions
```

## Guidelines for Development

### When Adding Components

1. **Location**: Place in appropriate `components/` subfolder
2. **Props Interface**: Always define explicit props interface
3. **Accessibility**: Include proper ARIA labels and semantic HTML
4. **Responsive**: Use Tailwind's responsive classes (mobile-first)
5. **Documentation**: Add JSDoc comments for complex components

### When Adding Pages

1. **Location**: Create in `app/` with appropriate nested route
2. **Client/Server**: Use `'use client'` for interactive pages
3. **Layout**: Wrap with `AppShell` for dashboard pages
4. **Types**: Use TypeScript strictly, no `any`

### When Adding Data Models

1. **Types**: Define in `types/foundation.ts`
2. **Mock Data**: Add to `lib/mock-data/foundationMockData.ts`
3. **Validation**: Add function to `lib/foundation/foundationValidation.ts`
4. **Utilities**: Add helpers to `lib/foundation/foundationUtils.ts`

### When Adding Styles

1. **Use Tailwind CSS**: No CSS-in-JS or external stylesheets
2. **Color Palette**: Navy/slate for headings, white for cards, green/red/amber for status
3. **Spacing**: Use Tailwind's spacing scale consistently
4. **Responsive**: Always test on mobile, tablet, desktop

### Form Validation

1. **Client-side**: Always validate before submission
2. **Error Messages**: Clear, helpful messages in user language
3. **Validation Rules**: Centralized in `foundationValidation.ts`
4. **Unique Constraints**: Check against existing data in state

### State Management

- Use `useState` for component state
- Pass callbacks as props to child components
- No context API or external state libraries yet
- Keep state in the top-level component (FoundationSettingsPage)

## Future Integration Points

### Laravel Backend

When backend is ready, update:

1. **API Calls**: `lib/foundation/foundationApi.ts`
   - Replace mock data with real HTTP calls
   - Add error handling and retry logic
   - Include proper headers (auth tokens, etc.)

2. **Authentication**
   - Add login page and auth context
   - Secure routes based on permissions
   - Store auth tokens

3. **Error Handling**
   - Network errors
   - Validation errors from server
   - Permission denied scenarios

### Environment Variables

Will need:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_APP_ENV` - Development/staging/production

## Code Review Checklist

Before committing code, ensure:

- [ ] TypeScript compiles without errors
- [ ] No TypeScript warnings
- [ ] No `any` types (unless documented)
- [ ] Components have proper prop types
- [ ] Forms have validation
- [ ] Responsive design tested
- [ ] Component is reusable or clearly documented
- [ ] Error states handled
- [ ] Loading states implemented where needed
- [ ] Accessibility considered (labels, ARIA, keyboard)

## Testing (Future)

When adding tests:

1. Use Jest for unit tests
2. Use React Testing Library for component tests
3. Test user interactions, not implementation details
4. Keep tests simple and focused

## Performance Notes

1. **Images**: Use next/image for optimization
2. **Lazy Loading**: Consider code splitting for large pages
3. **Memoization**: Use React.memo for list items if needed
4. **Animations**: Keep fade-in animations subtle

## Common Patterns

### Form with Validation

```typescript
const [formData, setFormData] = useState({ /* ... */ });
const [errors, setErrors] = useState<ValidationErrors>({});

const handleSubmit = () => {
  const errors = validateCurrency(formData, allItems);
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  // Save logic
};
```

### CRUD Operations

1. Create: Generate new ID, add to state array
2. Read: Filter/search from state
3. Update: Map over state, update matching item
4. Deactivate: Set isActive flag (don't delete)

### Success Messages

```typescript
setSuccessMessage({ type: 'create', entity: 'Currency' });
// Auto-clear after 3 seconds
```

## Naming Conventions

- **Components**: PascalCase (CurrencyTable.tsx)
- **Functions**: camelCase (handleSaveCurrency)
- **Variables**: camelCase (selectedCurrency)
- **Constants**: UPPER_SNAKE_CASE (API_ENDPOINTS)
- **Types**: PascalCase (Currency, Bank)

## Documentation

- Keep component props documented with JSDoc
- Add comments for complex logic
- Keep README updated with new features
- Document API integration points with TODO comments

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated**: 2026-07-01  
**Phase**: 1 - Foundation & Reference Model  
**Status**: Complete and Production-Ready
