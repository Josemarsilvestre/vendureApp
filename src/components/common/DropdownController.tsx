import React from 'react';
import { Controller, Control, FieldValues, useFormState, FieldError } from 'react-hook-form';
import Dropdown, { Option } from './Dropdown';

interface DropdownControllerProps {
  name: keyof FieldValues;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
}

const DropdownController: React.FC<DropdownControllerProps> = ({
  name,
  control,
  options,
  placeholder,
}) => {
  const { errors } = useFormState({ control });

  // Transform errors into string
  const error = errors[name];
  const errorMessage = error ? (error.message as string) : undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Dropdown
          name={name}
          control={control}
          options={options}
          value={typeof field.value === 'string' ? field.value : ''}
          onChange={(value: string) => field.onChange(value)}
          placeholder={placeholder || 'Select...'}
          errors={errorMessage}
        />
      )}
    />
  );
};

export default DropdownController;
