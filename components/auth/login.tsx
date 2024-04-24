import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Text } from "react-native-paper"
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import { LOGIN_MUTATION } from '../../src/api/mutation'
import { Button } from '../common/Buttons';
import TextField from '../common/TextField';
import { logInSchema } from '../../utils/validation';
import { Context } from '../../src/context/authContext';
import styles from './Styles.Auth'
import { moderateScale } from 'react-native-size-matters';

type LoginFormData = {
  username: string;
  password: string;
};

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const { setIsLogged } = useContext(Context);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: yupResolver(logInSchema),
    defaultValues: { username: '', password: '' },
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async (data) => {
      try {
        const { login } = data;
        if (login.__typename === "CurrentUser") {
          setIsLogged(true);
          navigation.navigate('Profile')
        } else {
          Alert.alert("Erro", "Utilizador ou senha inválidos.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Ocorreu um erro ao fazer login. Por favor, tente novamente.");
      }
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { username, password } = data;

      if (isConnected !== null && isConnected) {
        await login({
          variables: { username, password },
        });
      } else {
        Alert.alert("Erro", "Sem conexão à Internet. Por favor, verifique sua conexão e tente novamente.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao fazer login. Por favor, tente novamente.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.scroolViewContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: moderateScale(50)}}>
          <Text variant="titleLarge" style={styles.title}>Vendure App</Text>
        </View>
        <View style={styles.formContainer}>
          <Text variant="titleMedium" style={styles.title}>Sign in</Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.username?.message}
              placeholder="Email"
              name="username"
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
            <TouchableOpacity
              style={styles.TouchableOpacitybtn}
              onPress={() => {
                navigation.setOptions({
                  name: 'Register',
                  params: { navigation },
                });
                navigation.navigate('Register');
              }}>
              <Text style={styles.TouchableOpacitybtnText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
