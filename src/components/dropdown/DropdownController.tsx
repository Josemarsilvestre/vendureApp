import React from 'react';
import { Controller, Control, FieldValues, useFormState } from 'react-hook-form';
import Dropdown, { Option } from './Dropdown';

interface DropdownControllerProps {
  name: keyof FieldValues;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const DropdownController: React.FC<DropdownControllerProps> = ({
  name,
  control,
  options,
  placeholder,
  value,
  onChange,
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
          label={name.toString()}
          name={name}
          control={control}
          options={options}
          value={value !== undefined ? value : field.value}
          onChange={(value: string) => {
            field.onChange(value);
            if (onChange) {
              onChange(value);
            }
          }}
          placeholder={placeholder || 'Select...'}
          errors={errorMessage}
        />
      )}
    />
  );
};

export default DropdownController;