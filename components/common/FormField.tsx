import React from 'react';

export interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'date';
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode; // <option> elements when type="select"
}

const baseInputClasses =
  'w-full px-3 py-2 border rounded-md text-sm text-slate-900 placeholder-slate-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ' +
  'disabled:bg-slate-100 disabled:cursor-not-allowed';

export default function FormField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  maxLength,
  placeholder,
  disabled,
  className = '',
  children,
}: FormFieldProps) {
  const borderClasses = error ? 'border-red-500' : 'border-slate-300';
  const inputClasses = `${baseInputClasses} ${borderClasses}`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-900 mb-1">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={id}
          name={id}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={inputClasses}
        >
          {children}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}