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
    <div className="mt-1 text-sm text-red-500">
      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}:
        <input
          className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
      {touched && error && <p>{error}</p>}
    </div>
  );
}
