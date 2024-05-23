import React from 'react';
import { useController, Control, FieldValues } from 'react-hook-form';
import { TextInput, View, KeyboardTypeOptions } from 'react-native';
import { Text } from 'react-native-paper';
import DisplayError from './DisplayError';
import StylesText from '../auth/style/styles.auth';

interface TextFieldProps {
  label?: string;
  errors: string | undefined;
  name: keyof FieldValues;
  type?: 'text' | 'number' | 'email' | 'password';
  control: Control<any>;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  username?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  errors,
  name,
  type = 'text',
  control,
  placeholder,
  keyboardType,
  autoCapitalize, 
  username,
  value,
  onChange
}) => {
  const { field } = useController({ name, control });

  const onChangeHandler = (value: string) => {
    const inputValue = value;

    if (type === 'number' && inputValue.length !== 0) {
      field.onChange(parseInt(inputValue, 10));
    } else {
      field.onChange(inputValue);
    }

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View>
      {label && <Text style={StylesText.label}>{label}</Text>}
      <TextInput
        style={StylesText.SpaceInput}
        keyboardType={keyboardType || (type === 'email' ? 'email-address' : 'default')}
        autoCapitalize={autoCapitalize || (type === 'password' ? 'none' : 'sentences')}
        secureTextEntry={type === 'password'}
        value={value !== undefined ? value : field?.value?.toString()}
        onBlur={field.onBlur}
        onChangeText={onChangeHandler}
        ref={field.ref}
        placeholder={placeholder}
        defaultValue={username}
      />
      <DisplayError errors={errors} />
    </View>
  );
};


export default TextField;
