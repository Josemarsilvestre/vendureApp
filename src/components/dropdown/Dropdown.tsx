import React from 'react';
import { useController, Control, FieldValues } from 'react-hook-form';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import DisplayError from '../common/DisplayError';

export interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  errors?: string;
  name: keyof FieldValues;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  style?: any;
  value?: string | null;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  errors,
  name,
  control,
  options,
  placeholder,
  style,
  value,
  onChange,
}) => {
  const { field } = useController({ name, control });

  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelectOption = (option: Option) => {
    field.onChange(option.value);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const selectedOption = options.find(option => option.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <View>
      <TouchableOpacity
        style={[styles.dropdownButton, style]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text>{displayLabel}</Text>
      </TouchableOpacity>
      {isOpen && (
        <FlashList
          data={options}
          renderItem={({ item }: { item: Option }) => (
            <TouchableOpacity
              key={item.value}
              style={styles.option}
              onPress={() => handleSelectOption(item)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
          estimatedItemSize={41}
        />
      )}
      {errors && <DisplayError errors={errors} />}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dropdown;