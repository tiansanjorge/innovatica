import { ChangeEvent, FocusEvent } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number | undefined;
  error?: string;
  touched?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export function FormField({
  label,
  name,
  type,
  value,
  error,
  touched,
  onChange,
  onBlur,
}: FormFieldProps) {
  return (
    <div className="w-3/4 mb-3 text-sm text-red-800">
      <label
        className="block mb-1 text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        <p className="mb-1">{label}:</p>
        <input
          className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      {touched && error && <p>{error}*</p>}
    </div>
  );
}
