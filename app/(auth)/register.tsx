import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { router, Stack } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import { Button } from '../../components/common/Buttons';
import TextField from '../../components/common/TextField';
import { registerSchema } from '../../utils';
import StylesText from './Styles.Auth'

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data); // Faça o que quiser com os dados do formulário
  };

  const handleJumpLogin = () => {
    router.push('/login');
  };

  return (
    <ScrollView>
      <View style={StylesText.SpacebetweenWalls_Login}>
      <Stack.Screen
        options={{
          title: 'Resgiste-se',
          headerBackTitleVisible: false,
        }}
      />
      
          <Text style={styles.title}>Registar</Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.name?.message}
              placeholder="Nome de utilizador"
              name="name"
              control={control}
            />
            <TextField
              errors={errors.email?.message}
              placeholder="E-mail"
              name="email"
              keyboardType="email-address"
              autoCapitalize="none"
              control={control}
            />
            <TextField
              errors={errors.password?.message}
              type="password"
              placeholder="Palavra-passe"
              name="password"
              control={control}
            />
            <TextField
              control={control}
              errors={errors.confirmPassword?.message}
              type="password"
              placeholder="Confirme a palavra-passe"
              name="confirmPassword"
            />
            <Button onPress={handleSubmit(onSubmit)}>
              Criar conta
            </Button>
          </View>
          <Button onPress={handleJumpLogin}>
              Iniciar Sessão
          </Button> 
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  title: {
    marginTop: 56,
    fontSize: 20,
    fontWeight: 'bold',
  },
  fieldsContainer: {
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  linkText: {
    marginRight: 2,
    color: '#333',
    fontSize: 12,
  },
  link: {
    color: 'blue',
    fontSize: 12,
  },
});
