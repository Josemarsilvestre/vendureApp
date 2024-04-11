import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Text } from "react-native-paper"
import { Stack, useRouter } from 'expo-router'
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import { LOGIN_MUTATION } from '../../src/api/mutation'
import { Button } from '../../components/common/Buttons';
import TextField from '../../components/common/TextField';
import { logInSchema } from '../../utils/validation';
import { Context } from "../../src/context/authContext";
import styles from './Styles.Auth'

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const { setIsLogged } = useContext(Context);

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

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: yupResolver(logInSchema),
    defaultValues: { username: '', password: '' },
  });

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      Alert.alert("Erro", error.message);
    },
    onCompleted: async (data) => {
      try {
        const { login } = data;
        if (login.__typename === "CurrentUser") {
          setIsLogged(true);
          router.push('/profile');
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

  const handleJumpLogin = () => {
    router.push('/register');
  };

  return (
    <ScrollView>
      <View style={styles.scroolViewContainer}>
        <Stack.Screen
          options={{
            title: 'Conta',
            headerBackTitleVisible: false,
          }}
        />
        <View style={styles.View_img}>
          <Image
            style={styles.img}
            source={require("../../assets/sign_in.png")}
            resizeMode="cover"
          />
        </View>

        <View style={styles.formContainer}>
          <Text variant="titleLarge" style={styles.title}>Iniciar Sessão</Text>
          <View style={styles.fieldsContainer}>
            <TextField
              errors={errors.username?.message}
              placeholder="Username"
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
            <TouchableOpacity style={styles.TouchableOpacitybtn} onPress={handleJumpLogin}>
              <Text style={styles.TouchableOpacitybtnText}>Registe-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
