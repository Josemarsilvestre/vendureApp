import React from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from "react-native-paper"
import { router, Stack } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../components/common/Buttons';
import TextField from '../../components/common/TextField';
import { logInSchema } from '../../utils';
import StylesText from './Styles.Auth'

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data); // Faça o que quiser com os dados do formulário
  };

  const handleJumpLogin = () => {
    router.push('/register');
  };

  return (
    <ScrollView>
      <View style={StylesText.SpacebetweenWalls_Login}>
        <Stack.Screen
          options={{
            title: 'Login',
            headerBackTitleVisible: false,
          }}
        />
        <View style={styles.formContainer}>
          <Text variant="titleLarge"
            style={StylesText.title_login}>Iniciar Sessão</Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.email?.message}
              placeholder="Email"
              name="email"
              control={control as any}
            />

            <TextField
              errors={errors.password?.message}
              type="password"
              placeholder="Password"
              name="password"
              control={control as any}
            />
            <Button onPress={handleSubmit(onSubmit)}>
              Login
            </Button>
             
            <Button onPress={handleJumpLogin}>
                Registe-se
            </Button>   
          </View> 
        </View>
      </View>
    </ScrollView>
  );
}

/**<View style={StylesText.linkContainer}>
            <Link replace href="/register" style={StylesText.link}>
              Registe-se
            </Link>
          </View> */

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldsContainer: {
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 5,
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
