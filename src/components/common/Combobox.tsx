import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, useController } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

interface ComboboxProps {
  list: { name: string; code: string }[];
  name: string;
  control: Control;
  placeholder: string;
}

const Combobox: React.FC<ComboboxProps> = ({ list, name, control, placeholder }) => {
  const { field } = useController({ name, control });

  const filteredList = list.map((item) => ({ ...item, label: item.name, value: item.code }));

  const onChangeHandler = (value: string) => {
    field.onChange(filteredList.find((item) => item.value === value));
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onChangeHandler}
        items={filteredList}
        value={field.value?.code ?? ''}
        placeholder={{
          label: placeholder,
          value: '',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 3,
    paddingVertical: 2.5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'rgba(245, 245, 245, 0.3)',
    marginBottom: 10,
  },
});

export default Combobox;
