import React from 'react';
import { useController, Control, FieldValues } from 'react-hook-form';
import { TextInput, View, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Text } from 'react-native-paper';
import DisplayError from './DisplayError';
import StylesText from '../../app/(auth)/Styles.Auth';

interface TextFieldProps {
  label?: string;
  errors: string | undefined;
  name: keyof FieldValues;
  type?: 'text' | 'number' | 'email' | 'password';
  control: Control<any>;
  placeholder?: string;
  direction?: 'rtl' | 'ltr';
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  username?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, errors, name, type = 'text', control, placeholder, direction, keyboardType, autoCapitalize, username }) => {
  const { field } = useController({ name, control });

  const onChangeHandler = (value: string) => {
    const inputValue = value;

    if (type === 'number' && inputValue.length !== 0) {
      field.onChange(parseInt(inputValue, 10));
    } else {
      field.onChange(inputValue);
    }
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={StylesText.SpaceInput}
        keyboardType={keyboardType || (type === 'email' ? 'email-address' : 'default')}
        autoCapitalize={autoCapitalize || (type === 'password' ? 'none' : 'sentences')}
        secureTextEntry={type === 'password'}
        value={field?.value?.toString()}
        onBlur={field.onBlur}
        onChangeText={onChangeHandler}
        ref={field.ref}
        placeholder={placeholder}
        defaultValue={username} // Definindo o valor padrão com a propriedade username
      />
      <DisplayError errors={errors} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 5,
  }
});

export default TextField;
