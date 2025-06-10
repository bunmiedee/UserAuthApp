import React, { ChangeEvent } from 'react';

interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  error?: string;
}

export default function FormInput({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error
}: FormInputProps): JSX.Element {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}